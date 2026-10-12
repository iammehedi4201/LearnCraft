/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NODE.JS PROGRESS STORE & PERSISTENCE LAYER — LEARNCRAFT
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Synchronizes completion state, active lesson, and user goals across
 * LocalStorage, in-memory cache, and the Postgres /api/progress endpoint.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { getAllLessons, LessonMeta } from "./nodejs-curriculum";

const STORAGE_KEY = "learncraft_nodejs_progress";

export interface NodeProgressState {
  completedLessons: string[]; // array of lesson slugs or codes
  activeLessonSlug: string;
  selectedGoal: string; // phaseId
  lastUpdated: number;
}

let inMemoryProgress: NodeProgressState = {
  completedLessons: [],
  activeLessonSlug: "node01-what-is-nodejs",
  selectedGoal: "fundamentals",
  lastUpdated: Date.now(),
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getProgress(): NodeProgressState {
  if (!isBrowser()) return inMemoryProgress;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      inMemoryProgress = {
        completedLessons: Array.isArray(parsed.completedLessons)
          ? parsed.completedLessons
          : [],
        activeLessonSlug: parsed.activeLessonSlug || "node01-what-is-nodejs",
        selectedGoal: parsed.selectedGoal || "fundamentals",
        lastUpdated: parsed.lastUpdated || Date.now(),
      };
    }
  } catch (e) {
    console.error("[NodeProgressStore] Failed to parse progress from localStorage:", e);
  }

  return inMemoryProgress;
}

export function saveProgress(partial: Partial<NodeProgressState>): NodeProgressState {
  const current = getProgress();
  const updated: NodeProgressState = {
    ...current,
    ...partial,
    lastUpdated: Date.now(),
  };

  inMemoryProgress = updated;

  if (isBrowser()) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("learncraft-nodejs-progress-updated"));
      window.dispatchEvent(new Event("learncraft-progress-updated"));
    } catch (e) {
      console.error("[NodeProgressStore] Failed to save progress to localStorage:", e);
    }
  }

  return updated;
}

export async function fetchProgressFromDB(): Promise<void> {
  if (!isBrowser()) return;

  try {
    const res = await fetch("/api/progress", { cache: "no-store" });
    if (!res.ok) return;

    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      const completedFromDB: string[] = [];
      const all = getAllLessons();

      for (const item of json.data) {
        if (item.completed) {
          const match = all.find(
            (l) =>
              l.slug === item.module ||
              l.code.toLowerCase() === item.module.toLowerCase() ||
              l.slug.toLowerCase() === item.module.toLowerCase()
          );
          if (match) {
            completedFromDB.push(match.slug);
          }
        }
      }

      if (completedFromDB.length > 0) {
        const current = getProgress();
        const merged = Array.from(
          new Set([...current.completedLessons, ...completedFromDB])
        );
        saveProgress({ completedLessons: merged });
      }
    }
  } catch (err) {
    console.error("[NodeProgressStore] Error syncing with database:", err);
  }
}

export async function markLessonComplete(slugOrCode: string): Promise<void> {
  const all = getAllLessons();
  const lesson = all.find(
    (l) =>
      l.slug.toLowerCase() === slugOrCode.toLowerCase() ||
      l.code.toLowerCase() === slugOrCode.toLowerCase()
  );
  const identifier = lesson ? lesson.slug : slugOrCode;

  const current = getProgress();
  const isDone = current.completedLessons.some((id) => {
    const lower = id.toLowerCase();
    return (
      lower === identifier.toLowerCase() ||
      (lesson && lower === lesson.code.toLowerCase())
    );
  });

  if (!isDone) {
    const nextCompleted = [...current.completedLessons, identifier];
    saveProgress({ completedLessons: nextCompleted });

    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          module: identifier,
          completed: true,
          score: 100,
        }),
      });
    } catch (err) {
      console.warn("[NodeProgressStore] DB write failed on markLessonComplete:", err);
    }
  }
}

export async function unmarkLessonComplete(slugOrCode: string): Promise<void> {
  const all = getAllLessons();
  const lesson = all.find(
    (l) =>
      l.slug.toLowerCase() === slugOrCode.toLowerCase() ||
      l.code.toLowerCase() === slugOrCode.toLowerCase()
  );
  const matchSlug = lesson ? lesson.slug.toLowerCase() : slugOrCode.toLowerCase();
  const matchCode = lesson ? lesson.code.toLowerCase() : slugOrCode.toLowerCase();

  const current = getProgress();
  const nextCompleted = current.completedLessons.filter((item) => {
    const lower = item.toLowerCase();
    return lower !== matchSlug && lower !== matchCode && !item.endsWith(`/${slugOrCode}`);
  });

  saveProgress({ completedLessons: nextCompleted });

  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        module: slugOrCode,
        completed: false,
        force: true,
        score: 0,
      }),
    });
  } catch (err) {
    console.warn("[NodeProgressStore] DB write failed on unmarkLessonComplete:", err);
  }
}

export async function toggleLessonComplete(slugOrCode: string): Promise<boolean> {
  const all = getAllLessons();
  const lesson = all.find(
    (l) =>
      l.slug.toLowerCase() === slugOrCode.toLowerCase() ||
      l.code.toLowerCase() === slugOrCode.toLowerCase()
  );
  const identifier = lesson ? lesson.slug : slugOrCode;

  const isCurrentlyDone = isLessonComplete(slugOrCode);
  if (isCurrentlyDone) {
    await unmarkLessonComplete(identifier);
    return false;
  } else {
    await markLessonComplete(identifier);
    return true;
  }
}

export function isLessonComplete(slugOrCode: string): boolean {
  const current = getProgress();
  const all = getAllLessons();
  const lesson = all.find(
    (l) =>
      l.slug.toLowerCase() === slugOrCode.toLowerCase() ||
      l.code.toLowerCase() === slugOrCode.toLowerCase()
  );

  const matchSlug = lesson ? lesson.slug.toLowerCase() : slugOrCode.toLowerCase();
  const matchCode = lesson ? lesson.code.toLowerCase() : slugOrCode.toLowerCase();

  return current.completedLessons.some((item) => {
    const lower = item.toLowerCase();
    return (
      lower === matchSlug ||
      lower === matchCode ||
      item.endsWith(`/${slugOrCode}`)
    );
  });
}

export function setCurrentLesson(slug: string): void {
  saveProgress({ activeLessonSlug: slug });
}

export function getActiveLesson(): LessonMeta | null {
  const slug = getProgress().activeLessonSlug;
  const all = getAllLessons();
  return all.find((l) => l.slug === slug) || all[0] || null;
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
  const totalCount = all.length;
  let completedCount = 0;

  for (const lesson of all) {
    if (isLessonComplete(lesson.slug) || isLessonComplete(lesson.code)) {
      completedCount++;
    }
  }

  const percent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return { completedCount, totalCount, percent };
}
