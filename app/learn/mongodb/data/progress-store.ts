/**
 * MongoDB Progress Store — LearnCraft
 * LocalStorage caching with PostgreSQL /api/progress persistence sync.
 */

import { MONGODB_LESSONS, LessonMeta, getLessonBySlug } from "./mongodb-curriculum";
import { MONGODB_LEGACY_SLUG_MAP } from "../content";

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
  const slugLower = slugOrCode.toLowerCase().trim();
  const lesson = getLessonBySlug(slugLower);
  if (!lesson) {
    const mapped = MONGODB_LEGACY_SLUG_MAP[slugLower];
    return state.completedLessons.includes(slugLower) || (mapped ? state.completedLessons.includes(mapped) : false);
  }
  return (
    state.completedLessons.includes(lesson.slug.toLowerCase()) ||
    state.completedLessons.includes(lesson.code.toLowerCase()) ||
    Boolean(MONGODB_LEGACY_SLUG_MAP[slugLower] && state.completedLessons.includes(MONGODB_LEGACY_SLUG_MAP[slugLower]))
  );
}

export async function toggleLessonComplete(slugOrCode: string): Promise<boolean> {
  const state = getStoredState();
  const slugLower = slugOrCode.toLowerCase().trim();
  const lesson = getLessonBySlug(slugLower);
  const targetKey = lesson ? lesson.slug.toLowerCase() : slugLower;
  const codeKey = lesson ? lesson.code.toLowerCase() : "";

  const isCompleted = isLessonComplete(slugOrCode);
  let updatedList: string[];

  if (isCompleted) {
    updatedList = state.completedLessons.filter((k) => k !== targetKey && k !== codeKey && k !== slugLower);
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
  const slugLower = slugOrCode.toLowerCase().trim();
  const lesson = getLessonBySlug(slugLower);
  const targetKey = lesson ? lesson.slug.toLowerCase() : slugLower;
  const codeKey = lesson ? lesson.code.toLowerCase() : "";

  const updatedList = state.completedLessons.filter((k) => k !== targetKey && k !== codeKey && k !== slugLower);
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
  const completedSet = new Set<string>();

  MONGODB_LESSONS.forEach((lesson) => {
    if (isLessonComplete(lesson.slug)) {
      completedSet.add(lesson.slug);
    }
  });

  const completedCount = completedSet.size;
  const totalCount = MONGODB_LESSONS.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return { completedCount, totalCount, percent };
}

export function getNextRecommendedLesson(): LessonMeta | null {
  for (const lesson of MONGODB_LESSONS) {
    if (!isLessonComplete(lesson.slug)) return lesson;
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
      const match = getLessonBySlug(saved);
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
