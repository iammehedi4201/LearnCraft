/**
 * PostgreSQL Progress Store — LearnCraft
 * LocalStorage caching with PostgreSQL /api/progress persistence sync.
 */

import { POSTGRESQL_LESSONS, LessonMeta } from "./postgresql-curriculum";

const STORAGE_KEY = "learncraft_postgresql_progress_v1";
const GOAL_KEY = "learncraft_postgresql_goal_v1";
const CURRENT_KEY = "learncraft_postgresql_current_lesson_v1";

export interface ProgressState {
  completedLessons: string[];
  lastVisitedLesson: string;
}

function getStoredState(): ProgressState {
  if (typeof window === "undefined") {
    return { completedLessons: [], lastVisitedLesson: POSTGRESQL_LESSONS[0].slug };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completedLessons: [], lastVisitedLesson: POSTGRESQL_LESSONS[0].slug };
    return JSON.parse(raw);
  } catch {
    return { completedLessons: [], lastVisitedLesson: POSTGRESQL_LESSONS[0].slug };
  }
}

function saveState(state: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("learncraft-postgresql-progress-updated", { detail: state }));
    window.dispatchEvent(new CustomEvent("learncraft-progress-updated", { detail: state }));
  } catch {}
}

export function isLessonComplete(slugOrCode: string): boolean {
  const state = getStoredState();
  const slugLower = slugOrCode.toLowerCase();
  const lesson = POSTGRESQL_LESSONS.find(
    (l) => l.slug.toLowerCase() === slugLower || l.code.toLowerCase() === slugLower
  );
  if (!lesson) return state.completedLessons.includes(slugLower);
  return (
    state.completedLessons.includes(lesson.slug.toLowerCase()) ||
    state.completedLessons.includes(lesson.code.toLowerCase())
  );
}

export async function toggleLessonComplete(slugOrCode: string): Promise<boolean> {
  const state = getStoredState();
  const lesson = POSTGRESQL_LESSONS.find(
    (l) => l.slug.toLowerCase() === slugOrCode.toLowerCase() || l.code.toLowerCase() === slugOrCode.toLowerCase()
  );
  const targetKey = lesson ? lesson.slug.toLowerCase() : slugOrCode.toLowerCase();
  const codeKey = lesson ? lesson.code.toLowerCase() : "";

  const isCompleted = state.completedLessons.includes(targetKey) || (codeKey && state.completedLessons.includes(codeKey));
  let updatedList: string[];

  if (isCompleted) {
    updatedList = state.completedLessons.filter((k) => k !== targetKey && k !== codeKey);
  } else {
    updatedList = Array.from(new Set([...state.completedLessons, targetKey, codeKey].filter(Boolean)));
  }

  const newState: ProgressState = {
    ...state,
    completedLessons: updatedList,
    lastVisitedLesson: targetKey,
  };
  saveState(newState);

  // Sync to database
  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topicId: "postgresql",
        lessonCode: lesson?.code || slugOrCode,
        lessonId: targetKey,
        isCompleted: !isCompleted,
        completed: !isCompleted,
      }),
    });
  } catch {}

  return !isCompleted;
}

export function getProgress(): ProgressState {
  return getStoredState();
}

export async function unmarkLessonComplete(slugOrCode: string): Promise<void> {
  const state = getStoredState();
  const lesson = POSTGRESQL_LESSONS.find(
    (l) => l.slug.toLowerCase() === slugOrCode.toLowerCase() || l.code.toLowerCase() === slugOrCode.toLowerCase()
  );
  const targetKey = lesson ? lesson.slug.toLowerCase() : slugOrCode.toLowerCase();
  const codeKey = lesson ? lesson.code.toLowerCase() : "";

  const updatedList = state.completedLessons.filter((k) => k !== targetKey && k !== codeKey);
  const newState: ProgressState = {
    ...state,
    completedLessons: updatedList,
  };
  saveState(newState);

  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topicId: "postgresql",
        lessonCode: lesson?.code || slugOrCode,
        lessonId: targetKey,
        isCompleted: false,
        completed: false,
      }),
    });
  } catch {}
}

export async function markLessonComplete(slugOrCode: string): Promise<void> {
  if (!isLessonComplete(slugOrCode)) {
    await toggleLessonComplete(slugOrCode);
  }
}

export function getOverallProgress(): {
  completedCount: number;
  totalCount: number;
  percent: number;
} {
  const state = getStoredState();
  const total = POSTGRESQL_LESSONS.length;
  const completed = POSTGRESQL_LESSONS.filter((l) =>
    state.completedLessons.includes(l.slug.toLowerCase()) ||
    state.completedLessons.includes(l.code.toLowerCase())
  ).length;

  return {
    completedCount: completed,
    totalCount: total,
    percent: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

export function setGoal(goalId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GOAL_KEY, goalId);
    window.dispatchEvent(new CustomEvent("learncraft-postgresql-goal-updated", { detail: goalId }));
  } catch {}
}

export function getGoal(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(GOAL_KEY);
  } catch {
    return null;
  }
}

export function setCurrentLesson(slug: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CURRENT_KEY, slug);
  } catch {}
}

export function getCurrentLesson(): string {
  if (typeof window === "undefined") return POSTGRESQL_LESSONS[0].slug;
  try {
    return localStorage.getItem(CURRENT_KEY) || POSTGRESQL_LESSONS[0].slug;
  } catch {
    return POSTGRESQL_LESSONS[0].slug;
  }
}

export function getActiveLesson(): LessonMeta | null {
  if (typeof window === "undefined") return POSTGRESQL_LESSONS[0];
  try {
    const saved = localStorage.getItem(CURRENT_KEY);
    if (saved) {
      const match = POSTGRESQL_LESSONS.find((l) => l.slug.toLowerCase() === saved.toLowerCase());
      if (match) return match;
    }
  } catch {}
  return getNextRecommendedLesson() || POSTGRESQL_LESSONS[0];
}

export function getNextRecommendedLesson(): LessonMeta {
  for (const lesson of POSTGRESQL_LESSONS) {
    if (!isLessonComplete(lesson.slug)) {
      return lesson;
    }
  }
  return POSTGRESQL_LESSONS[POSTGRESQL_LESSONS.length - 1];
}

export async function fetchProgressFromDB(): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const res = await fetch("/api/progress?topicId=postgresql");
    if (!res.ok) return;
    const data = await res.json();
    const serverCodes: string[] = Array.isArray(data.completedLessonCodes)
      ? data.completedLessonCodes
      : Array.isArray(data.completedLessonIds)
      ? data.completedLessonIds
      : [];
    if (serverCodes.length > 0) {
      const state = getStoredState();
      const merged = Array.from(
        new Set([...state.completedLessons, ...serverCodes.map((s: string) => s.toLowerCase())])
      );
      saveState({
        ...state,
        completedLessons: merged,
      });
    }
  } catch {}
}
