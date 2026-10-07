/**
 * MongoDB Progress Store — LearnCraft
 * LocalStorage caching with PostgreSQL /api/progress persistence sync.
 */

import { MONGODB_LESSONS, LessonMeta } from "./mongodb-curriculum";

const STORAGE_KEY = "learncraft_mongodb_progress_v1";
const GOAL_KEY = "learncraft_mongodb_goal_v1";
const CURRENT_KEY = "learncraft_mongodb_current_lesson_v1";

export interface ProgressState {
  completedLessons: string[];
  lastVisitedLesson: string;
}

function getStoredState(): ProgressState {
  if (typeof window === "undefined") {
    return { completedLessons: [], lastVisitedLesson: MONGODB_LESSONS[0].slug };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completedLessons: [], lastVisitedLesson: MONGODB_LESSONS[0].slug };
    return JSON.parse(raw);
  } catch {
    return { completedLessons: [], lastVisitedLesson: MONGODB_LESSONS[0].slug };
  }
}

function saveState(state: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("learncraft-mongodb-progress-updated", { detail: state }));
    window.dispatchEvent(new CustomEvent("learncraft-progress-updated", { detail: state }));
  } catch {}
}

export function isLessonComplete(slugOrCode: string): boolean {
  const state = getStoredState();
  const slugLower = slugOrCode.toLowerCase();
  const lesson = MONGODB_LESSONS.find(
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
  const lesson = MONGODB_LESSONS.find(
    (l) => l.slug.toLowerCase() === slugOrCode.toLowerCase() || l.code.toLowerCase() === slugOrCode.toLowerCase()
  );
  const targetKey = lesson ? lesson.slug.toLowerCase() : slugOrCode.toLowerCase();
  const codeKey = lesson ? lesson.code.toLowerCase() : "";

  const isCompleted = state.completedLessons.includes(targetKey) || (codeKey && state.completedLessons.includes(codeKey));
  let updatedList: string[];

  if (isCompleted) {
    updatedList = state.completedLessons.filter((k) => k !== targetKey && k !== codeKey);
  } else {
    updatedList = [...state.completedLessons, targetKey];
    if (codeKey) updatedList.push(codeKey);
  }

  const newState: ProgressState = {
    ...state,
    completedLessons: Array.from(new Set(updatedList)),
  };
  saveState(newState);

  // Sync to database if online
  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topicId: "mongodb",
        lessonCode: lesson?.code || slugOrCode,
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
  const lesson = MONGODB_LESSONS.find(
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
        topicId: "mongodb",
        lessonCode: lesson?.code || slugOrCode,
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

export function getOverallProgress(): { completedCount: number; totalCount: number; percent: number } {
  const state = getStoredState();
  const completedSet = new Set<string>();

  MONGODB_LESSONS.forEach((lesson) => {
    if (
      state.completedLessons.includes(lesson.slug.toLowerCase()) ||
      state.completedLessons.includes(lesson.code.toLowerCase())
    ) {
      completedSet.add(lesson.slug);
    }
  });

  const completedCount = completedSet.size;
  const totalCount = MONGODB_LESSONS.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return { completedCount, totalCount, percent };
}

export function getNextRecommendedLesson(): LessonMeta | null {
  const state = getStoredState();
  for (const lesson of MONGODB_LESSONS) {
    const isDone =
      state.completedLessons.includes(lesson.slug.toLowerCase()) ||
      state.completedLessons.includes(lesson.code.toLowerCase());
    if (!isDone) return lesson;
  }
  return null;
}

export function setCurrentLesson(slug: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CURRENT_KEY, slug);
  } catch {}
}

export function getActiveLesson(): LessonMeta | null {
  if (typeof window === "undefined") return MONGODB_LESSONS[0];
  try {
    const saved = localStorage.getItem(CURRENT_KEY);
    if (saved) {
      const match = MONGODB_LESSONS.find((l) => l.slug.toLowerCase() === saved.toLowerCase());
      if (match) return match;
    }
  } catch {}
  return getNextRecommendedLesson() || MONGODB_LESSONS[0];
}

export function setGoal(phaseId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GOAL_KEY, phaseId);
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

export async function fetchProgressFromDB(): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const res = await fetch("/api/progress?topicId=mongodb");
    if (!res.ok) return;
    const data = await res.json();
    if (Array.isArray(data.completedLessonCodes)) {
      const state = getStoredState();
      const combined = Array.from(new Set([...state.completedLessons, ...data.completedLessonCodes.map((c: string) => c.toLowerCase())]));
      saveState({ ...state, completedLessons: combined });
    }
  } catch {}
}
