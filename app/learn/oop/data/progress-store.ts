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
        // Unauthenticated / Guest mode: Hydrate from localStorage instead of wiping
        let localCompleted: string[] = [];
        let localSlug: string | null = null;
        let localGoal: string = "foundations";
        try {
          const raw = localStorage.getItem("learncraft_oop_progress");
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed.completedLessons)) {
              localCompleted = parsed.completedLessons;
            }
            localSlug = parsed.currentLessonSlug || null;
            localGoal = parsed.selectedGoal || "foundations";
          }
        } catch {}

        inMemoryProgress = {
          completedLessons: localCompleted,
          currentLessonSlug: localSlug,
          selectedGoal: localGoal,
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

          // Merge DB completions with local cache
          let localCompleted: string[] = [];
          try {
            const raw = localStorage.getItem("learncraft_oop_progress");
            if (raw) {
              const parsed = JSON.parse(raw);
              if (Array.isArray(parsed.completedLessons)) {
                localCompleted = parsed.completedLessons;
              }
            }
          } catch {}

          const mergedCompleted = Array.from(
            new Set([...completedFromDb, ...localCompleted])
          );

          inMemoryProgress = {
            ...inMemoryProgress,
            completedLessons: mergedCompleted,
            currentLessonSlug: activeSlug || null,
            lastVisitedAt: Date.now(),
          };

          try {
            localStorage.setItem(
              "learncraft_oop_progress",
              JSON.stringify(inMemoryProgress)
            );
          } catch {}

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
      // Fallback: read localStorage
      try {
        const raw = localStorage.getItem("learncraft_oop_progress");
        if (raw) {
          const parsed = JSON.parse(raw);
          inMemoryProgress = {
            completedLessons: parsed.completedLessons || [],
            currentLessonSlug: parsed.currentLessonSlug || null,
            selectedGoal: parsed.selectedGoal || "foundations",
            lastVisitedAt: Date.now(),
          };
          isDbHydrated = true;
          window.dispatchEvent(
            new CustomEvent("learncraft-oop-progress-updated", {
              detail: inMemoryProgress,
            })
          );
        }
      } catch {}
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
          selectedGoal: parsed.selectedGoal || "foundations",
          lastVisitedAt: parsed.lastVisitedAt || Date.now(),
        };
      }
    }
  } catch (err) {
    console.error("[OOPProgressStore] Error reading local storage:", err);
  }

  return inMemoryProgress;
}

export function saveProgress(progress: Partial<OOPProgress>): void {
  if (typeof window === "undefined") return;

  const current = getProgress();
  const updated: OOPProgress = {
    ...current,
    ...progress,
    lastVisitedAt: Date.now(),
  };

  inMemoryProgress = updated;

  try {
    localStorage.setItem("learncraft_oop_progress", JSON.stringify(updated));
  } catch (err) {
    console.error("[OOPProgressStore] Error writing to local storage:", err);
  }

  window.dispatchEvent(
    new CustomEvent("learncraft-oop-progress-updated", {
      detail: updated,
    })
  );
}

export function isLessonComplete(slugOrCode: string): boolean {
  if (!slugOrCode) return false;
  const p = getProgress();
  const all = getAllLessons();
  const matchedLesson = all.find(
    (l) =>
      l.slug === slugOrCode ||
      l.code === slugOrCode ||
      l.slug.toLowerCase() === slugOrCode.toLowerCase() ||
      l.code.toLowerCase() === slugOrCode.toLowerCase()
  );

  return p.completedLessons.some((item) => {
    const norm = item.toLowerCase();
    if (norm === slugOrCode.toLowerCase()) return true;
    if (
      matchedLesson &&
      (norm === matchedLesson.slug.toLowerCase() ||
        norm === matchedLesson.code.toLowerCase())
    ) {
      return true;
    }
    return false;
  });
}

export async function markLessonComplete(slug: string): Promise<void> {
  if (!slug) return;
  const all = getAllLessons();
  const matched = all.find(
    (l) =>
      l.slug === slug ||
      l.code === slug ||
      l.slug.toLowerCase() === slug.toLowerCase() ||
      l.code.toLowerCase() === slug.toLowerCase()
  );
  const canonicalSlug = matched?.slug || slug;

  const p = getProgress();
  if (isLessonComplete(canonicalSlug)) return;

  const updated = Array.from(new Set([...p.completedLessons, canonicalSlug]));
  saveProgress({ completedLessons: updated });

  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        module: canonicalSlug,
        completed: true,
        activeModule: canonicalSlug,
        score: 100,
      }),
    });
  } catch {
    // Offline/guest resilient
  }
}

export async function markLessonIncomplete(slug: string): Promise<void> {
  if (!slug) return;
  const all = getAllLessons();
  const matched = all.find(
    (l) =>
      l.slug === slug ||
      l.code === slug ||
      l.slug.toLowerCase() === slug.toLowerCase() ||
      l.code.toLowerCase() === slug.toLowerCase()
  );
  const canonicalSlug = matched?.slug || slug;

  const p = getProgress();
  const updated = p.completedLessons.filter((s) => {
    const norm = s.toLowerCase();
    if (norm === canonicalSlug.toLowerCase()) return false;
    if (matched && (norm === matched.code.toLowerCase() || norm === matched.slug.toLowerCase())) {
      return false;
    }
    return true;
  });

  saveProgress({ completedLessons: updated });

  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        module: canonicalSlug,
        completed: false,
        score: 0,
      }),
    });
  } catch {
    // Offline/guest resilient
  }
}

export async function toggleLessonComplete(slug: string): Promise<boolean> {
  if (isLessonComplete(slug)) {
    await markLessonIncomplete(slug);
    return false;
  } else {
    await markLessonComplete(slug);
    return true;
  }
}

export function getActiveLesson(): LessonMeta | null {
  const all = getAllLessons();
  const p = getProgress();

  if (p.currentLessonSlug) {
    const found = all.find((l) => l.slug === p.currentLessonSlug);
    if (found) return found;
  }

  const firstUnfinished = all.find((l) => !isLessonComplete(l.slug));
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
  const completed = all.filter((l) => isLessonComplete(l.slug)).length;

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
  saveProgress({ selectedGoal: goalId });
}

export function setCurrentLesson(slug: string): void {
  saveProgress({ currentLessonSlug: slug });
}
