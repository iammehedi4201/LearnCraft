import { getAllLessons, NESTJS_STAGES, LessonMeta, StageMeta } from "./nestjs-curriculum";

export interface NestJSProgress {
  completedLessons: string[];
  currentLessonSlug: string | null;
  selectedGoal: string | null;
  lastVisitedAt: number;
}

// In-memory cache for instant synchronous component rendering
let inMemoryProgress: NestJSProgress = {
  completedLessons: [],
  currentLessonSlug: null,
  selectedGoal: "build-api",
  lastVisitedAt: Date.now(),
};

let isDbHydrated = false;

export function isProgressHydrated(): boolean {
  return isDbHydrated;
}
let ongoingDbFetch: Promise<NestJSProgress> | null = null;

/**
 * Fetch authoritative user progress directly from PostgreSQL database via /api/progress
 */
export async function fetchProgressFromDB(): Promise<NestJSProgress> {
  if (typeof window === "undefined") return inMemoryProgress;

  if (ongoingDbFetch) return ongoingDbFetch;

  ongoingDbFetch = (async () => {
    try {
      const res = await fetch("/api/progress", { cache: "no-store" });
      if (res.status === 401) {
        // User is not signed in: reset completed lessons to empty
        inMemoryProgress = {
          completedLessons: [],
          currentLessonSlug: null,
          selectedGoal: "build-api",
          lastVisitedAt: Date.now(),
        };
        isDbHydrated = true;

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

          // Find the most recently updated lesson that was started
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

          // Notify all subscribers of updated database truth
          window.dispatchEvent(
            new CustomEvent("learncraft-progress-updated", {
              detail: inMemoryProgress,
            })
          );
        }
      }
    } catch (err) {
      console.warn("[ProgressStore] Failed to fetch progress from DB:", err);
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

export function getProgress(): NestJSProgress {
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

    // Save directly to Neon PostgreSQL: lesson is started (completed: false)
    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ module: slug, completed: false }),
    }).catch((err) => console.warn("[ProgressStore] Failed to record lesson start:", err));
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

    // Save directly to Neon PostgreSQL: lesson is completed (completed: true, score: 100)
    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ module: slugOrCode, completed: true, score: 100 }),
    }).catch((err) => console.warn("[ProgressStore] Failed to mark complete in DB:", err));
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

    // Force unmark in Neon PostgreSQL
    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ module: slugOrCode, completed: false, force: true, score: 0 }),
    }).catch((err) => console.warn("[ProgressStore] Failed to unmark in DB:", err));
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

export function setGoal(goal: string): void {
  inMemoryProgress = { ...inMemoryProgress, selectedGoal: goal };
}

export function getGoal(): string | null {
  return inMemoryProgress.selectedGoal;
}

export function getCompletionByStage(stageId: string): {
  completed: number;
  total: number;
  percent: number;
  isCompleted: boolean;
} {
  const stage = NESTJS_STAGES.find((s) => s.id === stageId);
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
  const all = getAllLessons();
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
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return { completedCount, totalCount, percent };
}

export function getActiveLesson(): LessonMeta | null {
  const all = getAllLessons();
  const { currentLessonSlug } = getProgress();

  if (!currentLessonSlug) return null;

  const found = all.find(
    (l) => l.slug === currentLessonSlug || l.code === currentLessonSlug
  );
  return found || null;
}

export function getNextRecommendedLesson(): LessonMeta {
  const all = getAllLessons();
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

export function getCurrentActiveStage(): StageMeta {
  const nextLesson = getNextRecommendedLesson();
  const stage = NESTJS_STAGES.find((s) =>
    s.lessons.some((l) => l.slug === nextLesson.slug || l.code === nextLesson.code)
  );
  return stage || NESTJS_STAGES[0];
}
