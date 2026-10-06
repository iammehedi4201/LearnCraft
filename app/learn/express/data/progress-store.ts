/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * EXPRESS.JS PROGRESS STORE & PERSISTENCE LAYER — LEARNCRAFT
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Synchronizes completion state, active lesson, and user goals across
 * LocalStorage, in-memory cache, and the Postgres /api/progress endpoint.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { getAllLessons, LessonMeta } from "./express-curriculum";

const STORAGE_KEY = "learncraft_express_progress";

export interface ExpressProgressState {
  completedLessons: string[]; // array of lesson slugs or codes
  activeLessonSlug: string;
  selectedGoal: string; // phaseId
  lastUpdated: number;
}

let inMemoryProgress: ExpressProgressState = {
  completedLessons: [],
  activeLessonSlug: "exp01-what-is-express",
  selectedGoal: "fundamentals",
  lastUpdated: Date.now(),
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getProgress(): ExpressProgressState {
  if (!isBrowser()) return inMemoryProgress;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      inMemoryProgress = {
        completedLessons: Array.isArray(parsed.completedLessons)
          ? parsed.completedLessons
          : [],
        activeLessonSlug: parsed.activeLessonSlug || "exp01-what-is-express",
        selectedGoal: parsed.selectedGoal || "fundamentals",
        lastUpdated: parsed.lastUpdated || Date.now(),
      };
    }
  } catch (e) {
    console.error("[ExpressProgressStore] Failed to parse progress from localStorage:", e);
  }

  return inMemoryProgress;
}

export function saveProgress(partial: Partial<ExpressProgressState>): ExpressProgressState {
  const current = getProgress();
  const updated: ExpressProgressState = {
    ...current,
    ...partial,
    lastUpdated: Date.now(),
  };

  inMemoryProgress = updated;

  if (isBrowser()) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("learncraft-express-progress-updated"));
      window.dispatchEvent(new Event("learncraft-progress-updated"));
    } catch (e) {
      console.error("[ExpressProgressStore] Failed to save progress to localStorage:", e);
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
  } catch (e) {
    console.error("[ExpressProgressStore] Failed to fetch progress from DB:", e);
  }
}

export function isLessonComplete(slugOrCode: string): boolean {
  const { completedLessons } = getProgress();
  const normalized = slugOrCode.toLowerCase();
  return completedLessons.some((item) => item.toLowerCase() === normalized);
}

export async function markLessonComplete(slugOrCode: string): Promise<boolean> {
  const current = getProgress();
  const all = getAllLessons();
  const lesson = all.find(
    (l) =>
      l.slug.toLowerCase() === slugOrCode.toLowerCase() ||
      l.code.toLowerCase() === slugOrCode.toLowerCase()
  );

  const targetSlug = lesson ? lesson.slug : slugOrCode;

  if (!isLessonComplete(targetSlug)) {
    const updated = [...current.completedLessons, targetSlug];
    saveProgress({ completedLessons: updated });

    // Sync to PostgreSQL DB
    if (isBrowser()) {
      try {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            module: targetSlug,
            completed: true,
            activeModule: "part1",
            completedModules: ["part1", "part2", "part3", "part4"],
            totalModules: 4,
            score: 100,
          }),
        });
      } catch (err) {
        console.warn("[ExpressProgressStore] DB sync failed:", err);
      }
    }

    return true;
  }
  return false;
}

export async function toggleLessonComplete(slugOrCode: string): Promise<boolean> {
  const current = getProgress();
  const all = getAllLessons();
  const lesson = all.find(
    (l) =>
      l.slug.toLowerCase() === slugOrCode.toLowerCase() ||
      l.code.toLowerCase() === slugOrCode.toLowerCase()
  );

  const targetSlug = lesson ? lesson.slug : slugOrCode;
  const isDone = isLessonComplete(targetSlug);

  let updated: string[];
  if (isDone) {
    updated = current.completedLessons.filter(
      (s) => s.toLowerCase() !== targetSlug.toLowerCase()
    );
  } else {
    updated = [...current.completedLessons, targetSlug];
  }

  saveProgress({ completedLessons: updated });

  // Sync to PostgreSQL DB
  if (isBrowser()) {
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          module: targetSlug,
          completed: !isDone,
          activeModule: "part1",
          completedModules: !isDone ? ["part1", "part2", "part3", "part4"] : [],
          totalModules: 4,
          score: !isDone ? 100 : 0,
        }),
      });
    } catch (err) {
      console.warn("[ExpressProgressStore] DB sync failed:", err);
    }
  }

  return !isDone;
}

export function setCurrentLesson(slug: string): void {
  saveProgress({ activeLessonSlug: slug });
}

export function getActiveLesson(): LessonMeta {
  const { activeLessonSlug } = getProgress();
  const all = getAllLessons();
  const found = all.find(
    (l) => l.slug.toLowerCase() === activeLessonSlug.toLowerCase()
  );
  return found || all[0];
}

export function setGoal(phaseId: string): void {
  saveProgress({ selectedGoal: phaseId });
}

export function getGoal(): string {
  return getProgress().selectedGoal || "fundamentals";
}

export function getOverallProgress(): {
  completedCount: number;
  totalCount: number;
  percent: number;
} {
  const { completedLessons } = getProgress();
  const all = getAllLessons();
  const totalCount = all.length;

  const validCompleted = all.filter(
    (l) =>
      completedLessons.includes(l.slug) ||
      completedLessons.includes(l.code) ||
      completedLessons.map((s) => s.toLowerCase()).includes(l.slug.toLowerCase())
  );

  const completedCount = validCompleted.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return { completedCount, totalCount, percent };
}

export function getNextRecommendedLesson(): LessonMeta | null {
  const all = getAllLessons();
  const { completedLessons } = getProgress();

  for (const lesson of all) {
    const isDone =
      completedLessons.includes(lesson.slug) ||
      completedLessons.includes(lesson.code) ||
      completedLessons.map((s) => s.toLowerCase()).includes(lesson.slug.toLowerCase());

    if (!isDone) {
      return lesson;
    }
  }

  return all[all.length - 1];
}
