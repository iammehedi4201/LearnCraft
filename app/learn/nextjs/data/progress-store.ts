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
        // User not signed in
        inMemoryProgress = {
          completedLessons: [],
          currentLessonSlug: null,
          selectedStage: "stage-1",
          lastVisitedAt: Date.now(),
        };
        isDbHydrated = true;

        window.dispatchEvent(
          new CustomEvent("learncraft-progress-updated", {
            detail: inMemoryProgress,
          })
        );
        window.dispatchEvent(
          new CustomEvent("nextjs-progress-updated", {
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

          inMemoryProgress = {
            ...inMemoryProgress,
            completedLessons: Array.from(new Set(completedFromDb)),
            currentLessonSlug: activeSlug || null,
            lastVisitedAt: Date.now(),
          };

          isDbHydrated = true;

          // Notify subscribers of updated database truth
          window.dispatchEvent(
            new CustomEvent("learncraft-progress-updated", {
              detail: inMemoryProgress,
            })
          );
          window.dispatchEvent(
            new CustomEvent("nextjs-progress-updated", {
              detail: inMemoryProgress,
            })
          );
        }
      }
    } catch (err) {
      console.warn("[NextjsProgressStore] Failed to fetch progress from DB:", err);
    } finally {
      ongoingDbFetch = null;
    }
    return inMemoryProgress;
  })();

  return ongoingDbFetch;
}

// Trigger initial DB fetch on client bundle load
if (typeof window !== "undefined") {
  fetchProgressFromDB().catch(() => {});
}

export function getProgress(): NextjsProgress {
  return inMemoryProgress;
}

export function isLessonComplete(slugOrCode: string): boolean {
  return inMemoryProgress.completedLessons.some(
    (item) =>
      item === slugOrCode ||
      item.toLowerCase() === slugOrCode.toLowerCase() ||
      item.endsWith(`/${slugOrCode}`)
  );
}

/**
 * Record lesson started in PostgreSQL database
 */
export function recordLessonStart(slug: string): void {
  inMemoryProgress = {
    ...inMemoryProgress,
    currentLessonSlug: slug,
    lastVisitedAt: Date.now(),
  };

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("learncraft-progress-updated", { detail: inMemoryProgress })
    );
    window.dispatchEvent(
      new CustomEvent("nextjs-progress-updated", { detail: inMemoryProgress })
    );

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
  if (isLessonComplete(slugOrCode)) return false;

  const next = [...inMemoryProgress.completedLessons, slugOrCode];
  inMemoryProgress = {
    ...inMemoryProgress,
    completedLessons: next,
    lastVisitedAt: Date.now(),
  };

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("learncraft-progress-updated", { detail: inMemoryProgress })
    );
    window.dispatchEvent(
      new CustomEvent("nextjs-progress-updated", { detail: inMemoryProgress })
    );

    // Gamification XP Reward & Daily Streak tracking
    try {
      import("@/lib/gamification").then(({ recordActivity }) => {
        recordActivity("lesson_complete", `Completed Next.js lesson: ${slugOrCode}`, {
          lesson: slugOrCode,
          skill: "nextjs",
        });
      });
    } catch {}

    // Save directly to Neon PostgreSQL: lesson is completed (completed: true, score: 100)
    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ module: slugOrCode, completed: true, score: 100 }),
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
  const next = inMemoryProgress.completedLessons.filter(
    (item) =>
      item !== slugOrCode &&
      item.toLowerCase() !== slugOrCode.toLowerCase() &&
      !item.endsWith(`/${slugOrCode}`)
  );

  inMemoryProgress = {
    ...inMemoryProgress,
    completedLessons: next,
    lastVisitedAt: Date.now(),
  };

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("learncraft-progress-updated", { detail: inMemoryProgress })
    );
    window.dispatchEvent(
      new CustomEvent("nextjs-progress-updated", { detail: inMemoryProgress })
    );

    // Force unmark in Neon PostgreSQL
    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        module: slugOrCode,
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
  inMemoryProgress = { ...inMemoryProgress, selectedStage: stageId };
}

export function getStage(): string | null {
  return inMemoryProgress.selectedStage;
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
  const { completedLessons } = getProgress();
  const completedCount = all.filter((l) =>
    completedLessons.some(
      (c) =>
        c === l.slug ||
        c === l.code ||
        c.toLowerCase() === l.slug.toLowerCase() ||
        c.toLowerCase() === l.code.toLowerCase()
    )
  ).length;
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
