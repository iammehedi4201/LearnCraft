import { getAllLessons, NESTJS_STAGES, LessonMeta, StageMeta } from "./nestjs-curriculum";

export interface NestJSProgress {
  completedLessons: string[];
  currentLessonSlug: string | null;
  selectedGoal: string | null;
  lastVisitedAt: number;
}

const STORAGE_KEY = "learncraft_nestjs_global_progress";

const DEFAULT_PROGRESS: NestJSProgress = {
  completedLessons: [],
  currentLessonSlug: null,
  selectedGoal: "build-api",
  lastVisitedAt: Date.now(),
};

export function getProgress(): NestJSProgress {
  if (typeof window === "undefined") {
    return DEFAULT_PROGRESS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      currentLessonSlug: parsed.currentLessonSlug || null,
      selectedGoal: parsed.selectedGoal || "build-api",
      lastVisitedAt: parsed.lastVisitedAt || Date.now(),
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: Partial<NestJSProgress>): NestJSProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const current = getProgress();
    const updated: NestJSProgress = {
      ...current,
      ...progress,
      lastVisitedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("learncraft-progress-updated", { detail: updated }));
    return updated;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function isLessonComplete(slugOrCode: string): boolean {
  const { completedLessons } = getProgress();
  return completedLessons.some(
    (item) =>
      item === slugOrCode ||
      item.toLowerCase() === slugOrCode.toLowerCase() ||
      item.endsWith(`/${slugOrCode}`)
  );
}

export function markLessonComplete(slugOrCode: string): boolean {
  const progress = getProgress();
  if (isLessonComplete(slugOrCode)) return false;

  const next = [...progress.completedLessons, slugOrCode];
  saveProgress({ completedLessons: next });
  return true;
}

export function unmarkLessonComplete(slugOrCode: string): void {
  const progress = getProgress();
  const next = progress.completedLessons.filter(
    (item) =>
      item !== slugOrCode &&
      item.toLowerCase() !== slugOrCode.toLowerCase() &&
      !item.endsWith(`/${slugOrCode}`)
  );
  saveProgress({ completedLessons: next });
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
  saveProgress({ currentLessonSlug: slug });
}

export function setGoal(goal: string): void {
  saveProgress({ selectedGoal: goal });
}

export function getGoal(): string | null {
  return getProgress().selectedGoal;
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
