import {
  getAllNextjsLessons,
  NEXTJS_STAGES,
  NextjsLessonMeta,
  NextjsStageMeta,
} from "./nextjs-curriculum";

export interface NextjsProgress {
  completedLessons: string[];
  currentLessonSlug: string | null;
  selectedStage: string | null;
  lastVisitedAt: number;
}

// In-memory cache for synchronous component rendering
let inMemoryProgress: NextjsProgress = {
  completedLessons: [],
  currentLessonSlug: null,
  selectedStage: "stage-1",
  lastVisitedAt: Date.now(),
};

let isDbHydrated = false;

export function isProgressHydrated(): boolean {
  return isDbHydrated;
}

let ongoingDbFetch: Promise<NextjsProgress> | null = null;

/**
 * Fetch authoritative user progress directly from PostgreSQL database via /api/progress
 */
export async function fetchProgressFromDB(): Promise<NextjsProgress> {
  if (typeof window === "undefined") return inMemoryProgress;

  if (ongoingDbFetch) return ongoingDbFetch;

  ongoingDbFetch = (async () => {
    try {
      const res = await fetch("/api/progress", { cache: "no-store" });
      if (res.status === 401) {
        // Unauthenticated / Guest mode: Hydrate from localStorage instead of wiping
        let localCompleted: string[] = [];
        let localSlug: string | null = null;
        let localStage: string = "stage-1";
        try {
          const raw = localStorage.getItem("learncraft_nextjs_progress");
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed.completedLessons)) {
              localCompleted = parsed.completedLessons;
            }
            localSlug = parsed.currentLessonSlug || null;
            localStage = parsed.selectedStage || "stage-1";
          }
        } catch {}

        inMemoryProgress = {
          completedLessons: localCompleted,
          currentLessonSlug: localSlug,
          selectedStage: localStage,
          lastVisitedAt: Date.now(),
        };
        isDbHydrated = true;

        window.dispatchEvent(
          new CustomEvent("learncraft-nextjs-progress-updated", {
            detail: inMemoryProgress,
          })
        );
        window.dispatchEvent(
          new CustomEvent("nextjs-progress-updated", {
            detail: inMemoryProgress,
          })
        );
        window.dispatchEvent(
          new CustomEvent("learncraft-progress-updated", {
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
            .sort(
              (a: any, b: any) =>
                new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );

          const activeSlug =
            startedLessons[0]?.module || inMemoryProgress.currentLessonSlug;

          // Merge DB completions with local cache
          let localCompleted: string[] = [];
          try {
            const raw = localStorage.getItem("learncraft_nextjs_progress");
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
              "learncraft_nextjs_progress",
              JSON.stringify(inMemoryProgress)
            );
          } catch {}

          isDbHydrated = true;

          // Notify subscribers of updated database truth
          window.dispatchEvent(
            new CustomEvent("learncraft-nextjs-progress-updated", {
              detail: inMemoryProgress,
            })
          );
          window.dispatchEvent(
            new CustomEvent("nextjs-progress-updated", {
              detail: inMemoryProgress,
            })
          );
          window.dispatchEvent(
            new CustomEvent("learncraft-progress-updated", {
              detail: inMemoryProgress,
            })
          );
        }
      }
    } catch (err) {
      console.warn("[NextjsProgressStore] Failed to fetch progress from DB:", err);
      // Fallback: read localStorage
      try {
        const raw = localStorage.getItem("learncraft_nextjs_progress");
        if (raw) {
          const parsed = JSON.parse(raw);
          inMemoryProgress = {
            completedLessons: parsed.completedLessons || [],
            currentLessonSlug: parsed.currentLessonSlug || null,
            selectedStage: parsed.selectedStage || "stage-1",
            lastVisitedAt: Date.now(),
          };
          isDbHydrated = true;
          window.dispatchEvent(
            new CustomEvent("learncraft-nextjs-progress-updated", {
              detail: inMemoryProgress,
            })
          );
          window.dispatchEvent(
            new CustomEvent("nextjs-progress-updated", {
              detail: inMemoryProgress,
            })
          );
          window.dispatchEvent(
            new CustomEvent("learncraft-progress-updated", {
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

export function getProgress(): NextjsProgress {
  if (typeof window === "undefined") return inMemoryProgress;

  try {
    const raw = localStorage.getItem("learncraft_nextjs_progress");
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
          selectedStage: parsed.selectedStage || "stage-1",
          lastVisitedAt: parsed.lastVisitedAt || Date.now(),
        };
      }
    }
  } catch (err) {
    console.error("[NextjsProgressStore] Error reading local storage:", err);
  }

  return inMemoryProgress;
}

export function saveProgress(progress: Partial<NextjsProgress>): void {
  if (typeof window === "undefined") return;

  const current = getProgress();
  const updated: NextjsProgress = {
    ...current,
    ...progress,
    lastVisitedAt: Date.now(),
  };

  inMemoryProgress = updated;

  try {
    localStorage.setItem("learncraft_nextjs_progress", JSON.stringify(updated));
  } catch (err) {
    console.error("[NextjsProgressStore] Error writing to local storage:", err);
  }

  window.dispatchEvent(
    new CustomEvent("learncraft-nextjs-progress-updated", {
      detail: updated,
    })
  );
  window.dispatchEvent(
    new CustomEvent("nextjs-progress-updated", {
      detail: updated,
    })
  );
  window.dispatchEvent(
    new CustomEvent("learncraft-progress-updated", {
      detail: updated,
    })
  );
}

export function isLessonComplete(slugOrCode: string): boolean {
  if (!slugOrCode) return false;
  const p = getProgress();
  const all = getAllNextjsLessons();
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

/**
 * Record lesson started in PostgreSQL database
 */
export function recordLessonStart(slug: string): void {
  saveProgress({ currentLessonSlug: slug });

  if (typeof window !== "undefined") {
    // Save directly to Neon PostgreSQL: lesson started (completed: false)
    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ module: slug, completed: false }),
    }).catch((err) =>
      console.warn("[NextjsProgressStore] Failed to record lesson start:", err)
    );
  }
}

/**
 * Mark a lesson completed in PostgreSQL database
 */
export function markLessonComplete(slugOrCode: string): boolean {
  if (!slugOrCode) return false;
  const all = getAllNextjsLessons();
  const matched = all.find(
    (l) =>
      l.slug === slugOrCode ||
      l.code === slugOrCode ||
      l.slug.toLowerCase() === slugOrCode.toLowerCase() ||
      l.code.toLowerCase() === slugOrCode.toLowerCase()
  );
  const canonicalSlug = matched?.slug || slugOrCode;

  const p = getProgress();
  if (isLessonComplete(canonicalSlug)) return false;

  const updated = Array.from(new Set([...p.completedLessons, canonicalSlug]));
  saveProgress({ completedLessons: updated });

  if (typeof window !== "undefined") {
    // Gamification XP Reward & Daily Streak tracking
    try {
      import("@/lib/gamification").then(({ recordActivity }) => {
        recordActivity("lesson_complete", `Completed Next.js lesson: ${canonicalSlug}`, {
          lesson: canonicalSlug,
          skill: "nextjs",
        });
      });
    } catch {}

    // Save directly to Neon PostgreSQL
    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ module: canonicalSlug, completed: true, score: 100 }),
    }).catch((err) =>
      console.warn("[NextjsProgressStore] Failed to mark complete in DB:", err)
    );
  }

  return true;
}

/**
 * Unmark a completed lesson in PostgreSQL database
 */
export function unmarkLessonComplete(slugOrCode: string): void {
  if (!slugOrCode) return;
  const all = getAllNextjsLessons();
  const matched = all.find(
    (l) =>
      l.slug === slugOrCode ||
      l.code === slugOrCode ||
      l.slug.toLowerCase() === slugOrCode.toLowerCase() ||
      l.code.toLowerCase() === slugOrCode.toLowerCase()
  );
  const canonicalSlug = matched?.slug || slugOrCode;

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

  if (typeof window !== "undefined") {
    // Force unmark in Neon PostgreSQL
    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        module: canonicalSlug,
        completed: false,
        force: true,
        score: 0,
      }),
    }).catch((err) =>
      console.warn("[NextjsProgressStore] Failed to unmark in DB:", err)
    );
  }
}

export function toggleLessonComplete(slugOrCode: string): boolean {
  if (isLessonComplete(slugOrCode)) {
    unmarkLessonComplete(slugOrCode);
    return false;
  } else {
    markLessonComplete(slugOrCode);
    return true;
  }
}

export function setCurrentLesson(slug: string): void {
  recordLessonStart(slug);
}

export function setStage(stageId: string): void {
  saveProgress({ selectedStage: stageId });
}

export function getStage(): string | null {
  return getProgress().selectedStage;
}

export function getCompletionByStage(stageId: string): {
  completed: number;
  total: number;
  percent: number;
  isCompleted: boolean;
} {
  const stage = NEXTJS_STAGES.find((s) => s.id === stageId);
  if (!stage) return { completed: 0, total: 0, percent: 0, isCompleted: false };

  const { completedLessons } = getProgress();
  const completed = stage.lessons.filter((l) =>
    completedLessons.some(
      (c) =>
        c === l.slug ||
        c === l.code ||
        c.toLowerCase() === l.slug.toLowerCase() ||
        c.toLowerCase() === l.code.toLowerCase()
    )
  ).length;

  const total = stage.lessons.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return {
    completed,
    total,
    percent,
    isCompleted: total > 0 && completed === total,
  };
}

export function getOverallProgress(): {
  completedCount: number;
  totalCount: number;
  percent: number;
} {
  const all = getAllNextjsLessons();
  const completedCount = all.filter((l) => isLessonComplete(l.slug)).length;
  const totalCount = all.length;
  const percent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return { completedCount, totalCount, percent };
}

export function getActiveLesson(): NextjsLessonMeta | null {
  const all = getAllNextjsLessons();
  const { currentLessonSlug } = getProgress();

  if (!currentLessonSlug) return null;

  const found = all.find(
    (l) => l.slug === currentLessonSlug || l.code === currentLessonSlug
  );
  return found || null;
}

export function getNextRecommendedLesson(): NextjsLessonMeta {
  const all = getAllNextjsLessons();
  const active = getActiveLesson();

  if (active) {
    const currentIndex = all.findIndex(
      (l) => l.slug === active.slug || l.code === active.code
    );
    if (currentIndex >= 0) {
      for (let i = currentIndex; i < all.length; i++) {
        const l = all[i];
        if (!isLessonComplete(l.slug) && !isLessonComplete(l.code)) {
          return l;
        }
      }
    }
  }

  for (const l of all) {
    if (!isLessonComplete(l.slug) && !isLessonComplete(l.code)) {
      return l;
    }
  }

  return all[0];
}

export function getCurrentActiveStage(): NextjsStageMeta {
  const nextLesson = getNextRecommendedLesson();
  const stage = NEXTJS_STAGES.find((s) =>
    s.lessons.some(
      (l) => l.slug === nextLesson.slug || l.code === nextLesson.code
    )
  );
  return stage || NEXTJS_STAGES[0];
}
