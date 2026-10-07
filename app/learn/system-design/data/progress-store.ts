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

export function getProgress(): { completedLessons: string[]; lastVisitedLesson: string } {
  const state = getProgressState();
  return {
    completedLessons: state.completedLessons,
    lastVisitedLesson: state.currentLessonSlug || "sys01-what-is-system-design",
  };
}

export function isLessonComplete(slugOrCode: string): boolean {
  const state = getProgressState();
  const slugLower = slugOrCode.toLowerCase();
  const lesson = ALL_SYSTEM_DESIGN_LESSONS.find(
    (l) => l.slug.toLowerCase() === slugLower || l.code.toLowerCase() === slugLower
  );
  if (!lesson) return state.completedLessons.some((c) => c.toLowerCase() === slugLower);
  return (
    state.completedLessons.some((c) => c.toLowerCase() === lesson.slug.toLowerCase()) ||
    state.completedLessons.some((c) => c.toLowerCase() === lesson.code.toLowerCase())
  );
}

export function markLessonComplete(slugOrCode: string): void {
  const state = getProgressState();
  const lesson = ALL_SYSTEM_DESIGN_LESSONS.find(
    (l) => l.slug.toLowerCase() === slugOrCode.toLowerCase() || l.code.toLowerCase() === slugOrCode.toLowerCase()
  );
  const targetKey = lesson ? lesson.slug : slugOrCode;
  const codeKey = lesson ? lesson.code : "";
  const updated = Array.from(new Set([...state.completedLessons, targetKey, codeKey].filter(Boolean)));
  state.completedLessons = updated;
  state.lastActiveTimestamp = Date.now();
  saveProgressState(state);
  syncProgressToDB(targetKey, true);
}

export function unmarkLessonComplete(slugOrCode: string): void {
  const state = getProgressState();
  const lesson = ALL_SYSTEM_DESIGN_LESSONS.find(
    (l) => l.slug.toLowerCase() === slugOrCode.toLowerCase() || l.code.toLowerCase() === slugOrCode.toLowerCase()
  );
  const targetKey = lesson ? lesson.slug.toLowerCase() : slugOrCode.toLowerCase();
  const codeKey = lesson ? lesson.code.toLowerCase() : "";
  state.completedLessons = state.completedLessons.filter(
    (s) => s.toLowerCase() !== targetKey && s.toLowerCase() !== codeKey
  );
  state.lastActiveTimestamp = Date.now();
  saveProgressState(state);
  syncProgressToDB(lesson?.slug || slugOrCode, false);
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

export function getActiveLesson(): LessonMeta | null {
  if (!isClient()) return ALL_SYSTEM_DESIGN_LESSONS[0];
  try {
    const saved = localStorage.getItem("learncraft_system_design_current_lesson_v1") || getProgressState().currentLessonSlug;
    if (saved) {
      const match = ALL_SYSTEM_DESIGN_LESSONS.find(
        (l) => l.slug.toLowerCase() === saved.toLowerCase() || l.code.toLowerCase() === saved.toLowerCase()
      );
      if (match) return match;
    }
  } catch {}
  return getNextRecommendedLesson() || ALL_SYSTEM_DESIGN_LESSONS[0];
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
    const serverCodes: string[] = Array.isArray(data.completedLessonCodes)
      ? data.completedLessonCodes
      : Array.isArray(data.completedLessonIds)
      ? data.completedLessonIds
      : Array.isArray(data.completedLessons)
      ? data.completedLessons
      : [];
    if (serverCodes.length > 0) {
      const state = getProgressState();
      // Union of local and remote completed lessons
      const merged = Array.from(new Set([...state.completedLessons, ...serverCodes.map((s: string) => s.toLowerCase())]));
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
