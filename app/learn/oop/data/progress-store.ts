import { getAllLessons, LessonMeta } from "./oop-curriculum";

export interface OOPProgress {
  completedLessons: string[];
  currentLessonSlug: string | null;
  selectedGoal: string | null;
  lastVisitedAt: number;
}

// In-memory cache for instant synchronous component rendering
let inMemoryProgress: OOPProgress = {
  completedLessons: [],
  currentLessonSlug: null,
  selectedGoal: "foundations",
  lastVisitedAt: Date.now(),
};

let isDbHydrated = false;

export function isProgressHydrated(): boolean {
  return isDbHydrated;
}
let ongoingDbFetch: Promise<OOPProgress> | null = null;

/**
 * Fetch authoritative user progress directly from PostgreSQL database via /api/progress
 */
export async function fetchProgressFromDB(): Promise<OOPProgress> {
  if (typeof window === "undefined") return inMemoryProgress;

  if (ongoingDbFetch) return ongoingDbFetch;

  ongoingDbFetch = (async () => {
    try {
      const res = await fetch("/api/progress", { cache: "no-store" });
      if (res.status === 401) {
        inMemoryProgress = {
          completedLessons: [],
          currentLessonSlug: null,
          selectedGoal: "foundations",
          lastVisitedAt: Date.now(),
        };
        isDbHydrated = true;

        window.dispatchEvent(
          new CustomEvent("learncraft-oop-progress-updated", {
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
            new CustomEvent("learncraft-oop-progress-updated", {
              detail: inMemoryProgress,
            })
          );
        }
      }
    } catch (err) {
      console.error("[OOPProgressStore] Error fetching from DB:", err);
    } finally {
      ongoingDbFetch = null;
    }

    return inMemoryProgress;
  })();

  return ongoingDbFetch;
}

export function getProgress(): OOPProgress {
  if (typeof window === "undefined") return inMemoryProgress;

  try {
    const raw = localStorage.getItem("learncraft_oop_progress");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (isDbHydrated) {
        return inMemoryProgress;
      }
      return {
        completedLessons: parsed.completedLessons || [],
        currentLessonSlug: parsed.currentLessonSlug || null,
        selectedGoal: parsed.selectedGoal || "foundations",
        lastVisitedAt: parsed.lastVisitedAt || Date.now(),
      };
    }
  } catch {
    // Fall back to inMemory
  }

  return inMemoryProgress;
}

export function isLessonComplete(slugOrCode: string): boolean {
  const p = getProgress();
  return (
    p.completedLessons.includes(slugOrCode) ||
    p.completedLessons.some((item) => item.toLowerCase() === slugOrCode.toLowerCase())
  );
}

export async function toggleLessonComplete(slug: string): Promise<boolean> {
  const p = getProgress();
  const alreadyDone = p.completedLessons.includes(slug);
  const nextCompleted = alreadyDone
    ? p.completedLessons.filter((s) => s !== slug)
    : [...p.completedLessons, slug];

  inMemoryProgress = {
    ...p,
    completedLessons: nextCompleted,
    lastVisitedAt: Date.now(),
  };

  try {
    localStorage.setItem(
      "learncraft_oop_progress",
      JSON.stringify(inMemoryProgress)
    );
  } catch {
    // ignore
  }

  window.dispatchEvent(
    new CustomEvent("learncraft-oop-progress-updated", {
      detail: inMemoryProgress,
    })
  );

  // Sync to database
  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        module: slug,
        completed: !alreadyDone,
        score: !alreadyDone ? 100 : 0,
      }),
    });
  } catch {
    // silent failure for offline/guest
  }

  return !alreadyDone;
}

export async function markLessonComplete(slug: string): Promise<void> {
  const p = getProgress();
  if (p.completedLessons.includes(slug)) return;

  const nextCompleted = [...p.completedLessons, slug];
  inMemoryProgress = {
    ...p,
    completedLessons: nextCompleted,
    lastVisitedAt: Date.now(),
  };

  try {
    localStorage.setItem(
      "learncraft_oop_progress",
      JSON.stringify(inMemoryProgress)
    );
  } catch {
    // ignore
  }

  window.dispatchEvent(
    new CustomEvent("learncraft-oop-progress-updated", {
      detail: inMemoryProgress,
    })
  );

  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        module: slug,
        completed: true,
        score: 100,
      }),
    });
  } catch {
    // ignore
  }
}

export function getActiveLesson(): LessonMeta | null {
  const all = getAllLessons();
  const p = getProgress();

  if (p.currentLessonSlug) {
    const found = all.find((l) => l.slug === p.currentLessonSlug);
    if (found) return found;
  }

  const firstUnfinished = all.find(
    (l) => !p.completedLessons.includes(l.slug) && !p.completedLessons.includes(l.code)
  );

  return firstUnfinished || all[0] || null;
}

export function getNextRecommendedLesson(): LessonMeta | null {
  return getActiveLesson();
}

export function getOverallProgress(): {
  completedCount: number;
  totalCount: number;
  percent: number;
} {
  const all = getAllLessons();
  const p = getProgress();

  const completed = all.filter(
    (l) => p.completedLessons.includes(l.slug) || p.completedLessons.includes(l.code)
  ).length;

  return {
    completedCount: completed,
    totalCount: all.length,
    percent: all.length > 0 ? Math.round((completed / all.length) * 100) : 0,
  };
}

export function getGoal(): string | null {
  return getProgress().selectedGoal;
}

export function setGoal(goalId: string): void {
  const p = getProgress();
  inMemoryProgress = {
    ...p,
    selectedGoal: goalId,
    lastVisitedAt: Date.now(),
  };

  try {
    localStorage.setItem(
      "learncraft_oop_progress",
      JSON.stringify(inMemoryProgress)
    );
  } catch {
    // ignore
  }

  window.dispatchEvent(
    new CustomEvent("learncraft-oop-progress-updated", {
      detail: inMemoryProgress,
    })
  );
}

export function setCurrentLesson(slug: string): void {
  const p = getProgress();
  inMemoryProgress = {
    ...p,
    currentLessonSlug: slug,
    lastVisitedAt: Date.now(),
  };

  try {
    localStorage.setItem(
      "learncraft_oop_progress",
      JSON.stringify(inMemoryProgress)
    );
  } catch {
    // ignore
  }

  window.dispatchEvent(
    new CustomEvent("learncraft-oop-progress-updated", {
      detail: inMemoryProgress,
    })
  );
}
