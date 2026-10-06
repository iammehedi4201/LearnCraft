import { getAllLessons, LessonMeta } from "./react-curriculum";

export interface ReactProgress {
  completedLessons: string[];
  currentLessonSlug: string | null;
  selectedGoal: string | null;
  lastVisitedAt: number;
}

// In-memory cache for instant synchronous component rendering
let inMemoryProgress: ReactProgress = {
  completedLessons: [],
  currentLessonSlug: null,
  selectedGoal: "fundamentals",
  lastVisitedAt: Date.now(),
};

let isDbHydrated = false;

export function isProgressHydrated(): boolean {
  return isDbHydrated;
}

let ongoingDbFetch: Promise<ReactProgress> | null = null;

/**
 * Fetch authoritative user progress directly from PostgreSQL database via /api/progress
 */
export async function fetchProgressFromDB(): Promise<ReactProgress> {
  if (typeof window === "undefined") return inMemoryProgress;

  if (ongoingDbFetch) return ongoingDbFetch;

  ongoingDbFetch = (async () => {
    try {
      const res = await fetch("/api/progress", { cache: "no-store" });
      if (res.status === 401) {
        inMemoryProgress = {
          completedLessons: [],
          currentLessonSlug: null,
          selectedGoal: "fundamentals",
          lastVisitedAt: Date.now(),
        };
        isDbHydrated = true;

        window.dispatchEvent(
          new CustomEvent("learncraft-react-progress-updated", {
            detail: inMemoryProgress,
          })
        );
        return inMemoryProgress;
      }

      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const completedFromDb = json.data
            .filter((d: { completed: boolean }) => d.completed === true)
            .map((d: { module: string }) => d.module);

          const startedLessons = json.data
            .filter((d: { module: string }) => d.module)
            .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

          const activeSlug = startedLessons[0]?.module || inMemoryProgress.currentLessonSlug;

          inMemoryProgress = {
            ...inMemoryProgress,
            completedLessons: Array.from(new Set(completedFromDb)),
            currentLessonSlug: activeSlug || null,
            lastVisitedAt: Date.now(),
          };

          isDbHydrated = true;

          window.dispatchEvent(
            new CustomEvent("learncraft-react-progress-updated", {
              detail: inMemoryProgress,
            })
          );
        }
      }
    } catch (err) {
      console.error("[ReactProgressStore] Error fetching from DB:", err);
    } finally {
      ongoingDbFetch = null;
    }

    return inMemoryProgress;
  })();

  return ongoingDbFetch;
}

export function getProgress(): ReactProgress {
  if (typeof window === "undefined") return inMemoryProgress;

  try {
    const raw = localStorage.getItem("learncraft_react_progress");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (isDbHydrated) {
        const mergedCompleted = Array.from(
          new Set([...inMemoryProgress.completedLessons, ...(parsed.completedLessons || [])])
        );
        inMemoryProgress.completedLessons = mergedCompleted;
        if (!inMemoryProgress.currentLessonSlug && parsed.currentLessonSlug) {
          inMemoryProgress.currentLessonSlug = parsed.currentLessonSlug;
        }
      } else {
        inMemoryProgress = {
          completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
          currentLessonSlug: parsed.currentLessonSlug || null,
          selectedGoal: parsed.selectedGoal || "fundamentals",
          lastVisitedAt: parsed.lastVisitedAt || Date.now(),
        };
      }
    }
  } catch (err) {
    console.error("[ReactProgressStore] Error reading local storage:", err);
  }

  return inMemoryProgress;
}

export function saveProgress(progress: Partial<ReactProgress>): void {
  if (typeof window === "undefined") return;

  const current = getProgress();
  const updated: ReactProgress = {
    ...current,
    ...progress,
    lastVisitedAt: Date.now(),
  };

  inMemoryProgress = updated;

  try {
    localStorage.setItem("learncraft_react_progress", JSON.stringify(updated));
  } catch (err) {
    console.error("[ReactProgressStore] Error writing to local storage:", err);
  }

  window.dispatchEvent(
    new CustomEvent("learncraft-react-progress-updated", {
      detail: updated,
    })
  );
}

export function isLessonComplete(slugOrCode: string): boolean {
  const p = getProgress();
  return p.completedLessons.some(
    (l) =>
      l === slugOrCode ||
      l.toLowerCase() === slugOrCode.toLowerCase() ||
      slugOrCode.endsWith(`/${l}`) ||
      l.endsWith(`/${slugOrCode}`)
  );
}

export async function markLessonComplete(slug: string): Promise<void> {
  const p = getProgress();
  if (!p.completedLessons.includes(slug)) {
    const updated = [...p.completedLessons, slug];
    saveProgress({ completedLessons: updated });

    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          module: slug,
          completed: true,
          activeModule: slug,
        }),
      });
    } catch (err) {
      console.error("[ReactProgressStore] Error syncing with DB:", err);
    }
  }
}

export async function markLessonIncomplete(slug: string): Promise<void> {
  const p = getProgress();
  const updated = p.completedLessons.filter(
    (l) => l !== slug && !slug.endsWith(`/${l}`) && !l.endsWith(`/${slug}`)
  );
  saveProgress({ completedLessons: updated });

  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        module: slug,
        completed: false,
        activeModule: slug,
      }),
    });
  } catch (err) {
    console.error("[ReactProgressStore] Error syncing with DB:", err);
  }
}

export async function toggleLessonComplete(slug: string): Promise<boolean> {
  const currentlyDone = isLessonComplete(slug);
  if (currentlyDone) {
    await markLessonIncomplete(slug);
    return false;
  } else {
    await markLessonComplete(slug);
    return true;
  }
}

export function setCurrentLesson(slug: string): void {
  saveProgress({ currentLessonSlug: slug });
  fetch("/api/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      module: slug,
      activeModule: slug,
    }),
  }).catch(() => {});
}

export function setGoal(goalId: string): void {
  saveProgress({ selectedGoal: goalId });
}

export function getGoal(): string {
  return getProgress().selectedGoal || "fundamentals";
}

export function getNextRecommendedLesson(): LessonMeta | null {
  const all = getAllLessons();

  for (const lesson of all) {
    if (!isLessonComplete(lesson.slug) && !isLessonComplete(lesson.code)) {
      return lesson;
    }
  }

  return all[0] || null;
}

export function getOverallProgress(): {
  completedCount: number;
  totalCount: number;
  percent: number;
} {
  const all = getAllLessons();
  const completed = all.filter((l) => isLessonComplete(l.slug) || isLessonComplete(l.code)).length;
  const total = all.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    completedCount: completed,
    totalCount: total,
    percent,
  };
}

export function getActiveLesson(): LessonMeta | null {
  const p = getProgress();
  const all = getAllLessons();

  if (p.currentLessonSlug) {
    const found = all.find(
      (l) =>
        l.slug === p.currentLessonSlug ||
        l.code === p.currentLessonSlug ||
        l.path.endsWith(`/${p.currentLessonSlug}`)
    );
    if (found) return found;
  }

  return getNextRecommendedLesson();
}
