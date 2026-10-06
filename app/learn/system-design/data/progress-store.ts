/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SYSTEM DESIGN PROGRESS STORE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Local-first client state management for System Design curriculum progress.
 * Synchronizes with user database when authenticated via /api/progress?topicId=system-design.
 * Dispatches `learncraft-system-design-progress-updated` for real-time reactive UI updates.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import {
  ALL_SYSTEM_DESIGN_LESSONS,
  LessonMeta,
} from "./system-design-curriculum";

const STORAGE_KEY = "learncraft_system_design_progress_v1";

export interface SystemDesignProgressState {
  completedLessons: string[]; // List of lesson slugs or codes
  currentLessonSlug: string | null;
  targetGoalPhaseId: string | null;
  lastActiveTimestamp: number;
}

const DEFAULT_STATE: SystemDesignProgressState = {
  completedLessons: [],
  currentLessonSlug: "sys01-what-is-system-design",
  targetGoalPhaseId: "fundamentals",
  lastActiveTimestamp: Date.now(),
};

function isClient(): boolean {
  return typeof window !== "undefined";
}

export function getProgressState(): SystemDesignProgressState {
  if (!isClient()) return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      completedLessons: Array.isArray(parsed.completedLessons)
        ? parsed.completedLessons
        : [],
      currentLessonSlug: parsed.currentLessonSlug || "sys01-what-is-system-design",
      targetGoalPhaseId: parsed.targetGoalPhaseId || "fundamentals",
      lastActiveTimestamp: parsed.lastActiveTimestamp || Date.now(),
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveProgressState(state: SystemDesignProgressState): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("learncraft-system-design-progress-updated"));
    window.dispatchEvent(new CustomEvent("learncraft-progress-updated"));
  } catch {
    // Ignore storage quota errors
  }
}

export function isLessonComplete(slugOrCode: string): boolean {
  const state = getProgressState();
  return state.completedLessons.includes(slugOrCode);
}

export function markLessonComplete(slug: string): void {
  const state = getProgressState();
  if (!state.completedLessons.includes(slug)) {
    state.completedLessons.push(slug);
    state.lastActiveTimestamp = Date.now();
    saveProgressState(state);
    syncProgressToDB(slug, true);
  }
}

export function unmarkLessonComplete(slug: string): void {
  const state = getProgressState();
  if (state.completedLessons.includes(slug)) {
    state.completedLessons = state.completedLessons.filter((s) => s !== slug);
    state.lastActiveTimestamp = Date.now();
    saveProgressState(state);
    syncProgressToDB(slug, false);
  }
}

export function toggleLessonComplete(slug: string): boolean {
  if (isLessonComplete(slug)) {
    unmarkLessonComplete(slug);
    return false;
  } else {
    markLessonComplete(slug);
    return true;
  }
}

export function setCurrentLesson(slug: string): void {
  const state = getProgressState();
  state.currentLessonSlug = slug;
  state.lastActiveTimestamp = Date.now();
  saveProgressState(state);
}

export function getCurrentLesson(): string {
  const state = getProgressState();
  return state.currentLessonSlug || "sys01-what-is-system-design";
}

export function setGoal(phaseId: string): void {
  const state = getProgressState();
  state.targetGoalPhaseId = phaseId;
  saveProgressState(state);
}

export function getGoal(): string | null {
  const state = getProgressState();
  return state.targetGoalPhaseId;
}

export function getNextRecommendedLesson(): LessonMeta | null {
  const state = getProgressState();
  const all = ALL_SYSTEM_DESIGN_LESSONS;

  // Find the first uncompleted lesson in sequential order
  for (const lesson of all) {
    if (!state.completedLessons.includes(lesson.slug) && !state.completedLessons.includes(lesson.code)) {
      return lesson;
    }
  }

  // If all are completed, return the last lesson
  return all[all.length - 1] || null;
}

export function getOverallProgress(): {
  completedCount: number;
  totalCount: number;
  percent: number;
} {
  const state = getProgressState();
  const total = ALL_SYSTEM_DESIGN_LESSONS.length;
  const completed = ALL_SYSTEM_DESIGN_LESSONS.filter(
    (l) => state.completedLessons.includes(l.slug) || state.completedLessons.includes(l.code)
  ).length;

  return {
    completedCount: completed,
    totalCount: total,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

// ─────────────────────────────────────────────────────────────
// Cloud Sync Helpers
// ─────────────────────────────────────────────────────────────

export async function fetchProgressFromDB(): Promise<void> {
  if (!isClient()) return;
  try {
    const res = await fetch("/api/progress?topicId=system-design");
    if (!res.ok) return;
    const data = await res.json();
    if (data && Array.isArray(data.completedLessons)) {
      const state = getProgressState();
      // Union of local and remote completed lessons
      const merged = Array.from(new Set([...state.completedLessons, ...data.completedLessons]));
      state.completedLessons = merged;
      saveProgressState(state);
    }
  } catch {
    // Offline or network error
  }
}

async function syncProgressToDB(lessonSlug: string, isCompleted: boolean): Promise<void> {
  if (!isClient()) return;
  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topicId: "system-design",
        lessonSlug,
        isCompleted,
      }),
    });
  } catch {
    // Graceful offline fallback
  }
}
