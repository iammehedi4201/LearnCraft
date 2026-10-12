import { getAllLessons, LessonMeta } from "./typescript-curriculum";

export interface TypeScriptProgress {
  completedLessons: string[];
  currentLessonSlug: string | null;
  selectedGoal: string | null;
  lastVisitedAt: number;
}

// In-memory cache for instant synchronous component rendering
let inMemoryProgress: TypeScriptProgress = {
  completedLessons: [],
  currentLessonSlug: null,
  selectedGoal: "fundamentals",
  lastVisitedAt: Date.now(),
};

let isDbHydrated = false;

export function isProgressHydrated(): boolean {
  return isDbHydrated;
}
let ongoingDbFetch: Promise<TypeScriptProgress> | null = null;

/**
 * Fetch authoritative user progress directly from PostgreSQL database via /api/progress
 */
export async function fetchProgressFromDB(): Promise<TypeScriptProgress> {
  if (typeof window === "undefined") return inMemoryProgress;

  if (ongoingDbFetch) return ongoingDbFetch;

  ongoingDbFetch = (async () => {
    try {
      const res = await fetch("/api/progress", { cache: "no-store" });
      if (res.status === 401) {
        // Unauthenticated / Guest mode: Hydrate from localStorage instead of wiping
        let localCompleted: string[] = [];
        let localSlug: string | null = null;
        let localGoal: string = "fundamentals";
        try {
          const raw = localStorage.getItem("learncraft_ts_progress");
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed.completedLessons)) {
              localCompleted = parsed.completedLessons;
            }
            localSlug = parsed.currentLessonSlug || null;
            localGoal = parsed.selectedGoal || "fundamentals";
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
          new CustomEvent("learncraft-ts-progress-updated", {
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
            const raw = localStorage.getItem("learncraft_ts_progress");
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
              "learncraft_ts_progress",
              JSON.stringify(inMemoryProgress)
            );
          } catch {}

          isDbHydrated = true;

          window.dispatchEvent(
            new CustomEvent("learncraft-ts-progress-updated", {
              detail: inMemoryProgress,
            })
          );
        }
      }
    } catch (err) {
      console.error("[TypeScriptProgressStore] Error fetching from DB:", err);
      // Fallback: read localStorage
      try {
        const raw = localStorage.getItem("learncraft_ts_progress");
        if (raw) {
          const parsed = JSON.parse(raw);
          inMemoryProgress = {
            completedLessons: parsed.completedLessons || [],
            currentLessonSlug: parsed.currentLessonSlug || null,
            selectedGoal: parsed.selectedGoal || "fundamentals",
            lastVisitedAt: Date.now(),
          };
          isDbHydrated = true;
          window.dispatchEvent(
            new CustomEvent("learncraft-ts-progress-updated", {
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

export function getProgress(): TypeScriptProgress {
  if (typeof window === "undefined") return inMemoryProgress;

  try {
    const raw = localStorage.getItem("learncraft_ts_progress");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (isDbHydrated) {
        return inMemoryProgress;
      }
      return {
        completedLessons: parsed.completedLessons || [],
        currentLessonSlug: parsed.currentLessonSlug || null,
        selectedGoal: parsed.selectedGoal || "fundamentals",
        lastVisitedAt: parsed.lastVisitedAt || Date.now(),
      };
    }
  } catch {
    // Fall back to inMemory
  }

  return inMemoryProgress;
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

export async function toggleLessonComplete(slug: string): Promise<boolean> {
  if (!slug) return false;
  const all = getAllLessons();
  const matched = all.find(
    (l) =>
      l.slug === slug ||
      l.code === slug ||
      l.slug.toLowerCase() === slug.toLowerCase() ||
      l.code.toLowerCase() === slug.toLowerCase()
  );
  const targetSlug = matched?.slug || slug;
  const targetCode = matched?.code;

  const p = getProgress();
  const alreadyDone = isLessonComplete(targetSlug);
  const nextCompleted = alreadyDone
    ? p.completedLessons.filter((s) => {
        const norm = s.toLowerCase();
        if (norm === targetSlug.toLowerCase()) return false;
        if (targetCode && norm === targetCode.toLowerCase()) return false;
        return true;
      })
    : Array.from(new Set([...p.completedLessons, targetSlug]));

  inMemoryProgress = {
    ...p,
    completedLessons: nextCompleted,
    lastVisitedAt: Date.now(),
  };

  try {
    localStorage.setItem(
      "learncraft_ts_progress",
      JSON.stringify(inMemoryProgress)
    );
  } catch {
    // ignore
  }

  window.dispatchEvent(
    new CustomEvent("learncraft-ts-progress-updated", {
      detail: inMemoryProgress,
    })
  );

  // Sync to database
  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        module: targetSlug,
        completed: !alreadyDone,
        score: !alreadyDone ? 100 : 0,
        force: true,
      }),
    });
  } catch {
    // silent failure for offline/guest
  }

  return !alreadyDone;
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

  if (isLessonComplete(canonicalSlug)) return;

  const p = getProgress();
  const nextCompleted = Array.from(new Set([...p.completedLessons, canonicalSlug]));
  inMemoryProgress = {
    ...p,
    completedLessons: nextCompleted,
    lastVisitedAt: Date.now(),
  };

  try {
    localStorage.setItem(
      "learncraft_ts_progress",
      JSON.stringify(inMemoryProgress)
    );
  } catch {
    // ignore
  }

  window.dispatchEvent(
    new CustomEvent("learncraft-ts-progress-updated", {
      detail: inMemoryProgress,
    })
  );

  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        module: canonicalSlug,
        completed: true,
        score: 100,
        force: true,
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
      "learncraft_ts_progress",
      JSON.stringify(inMemoryProgress)
    );
  } catch {
    // ignore
  }

  window.dispatchEvent(
    new CustomEvent("learncraft-ts-progress-updated", {
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
      "learncraft_ts_progress",
      JSON.stringify(inMemoryProgress)
    );
  } catch {
    // ignore
  }

  window.dispatchEvent(
    new CustomEvent("learncraft-ts-progress-updated", {
      detail: inMemoryProgress,
    })
  );
}

