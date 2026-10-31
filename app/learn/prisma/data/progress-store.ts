/**
 * Prisma Progress Store — LearnCraft
 * LocalStorage caching with PostgreSQL /api/progress persistence sync.
 */

import { PRISMA_LESSONS, LessonMeta, getLessonBySlug } from "./prisma-curriculum";
import { PRISMA_LEGACY_SLUG_MAP } from "../content";

const STORAGE_KEY = "learncraft_prisma_progress_v1";
const GOAL_KEY = "learncraft_prisma_goal_v1";
const CURRENT_KEY = "learncraft_prisma_current_lesson_v1";

export interface ProgressState {
  completedLessons: string[];
  lastVisitedLesson: string;
}

function getStoredState(): ProgressState {
  if (typeof window === "undefined") {
    return { completedLessons: [], lastVisitedLesson: PRISMA_LESSONS[0].slug };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completedLessons: [], lastVisitedLesson: PRISMA_LESSONS[0].slug };
    return JSON.parse(raw);
  } catch {
    return { completedLessons: [], lastVisitedLesson: PRISMA_LESSONS[0].slug };
  }
}

function saveState(state: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("learncraft-prisma-progress-updated", { detail: state }));
    window.dispatchEvent(new CustomEvent("learncraft-progress-updated", { detail: state }));
  } catch {}
}

export function isLessonComplete(slugOrCode: string): boolean {
  const state = getStoredState();
  const slugLower = slugOrCode.toLowerCase().trim();
  const lesson = getLessonBySlug(slugLower);
  if (!lesson) {
    const mapped = PRISMA_LEGACY_SLUG_MAP[slugLower];
    return state.completedLessons.includes(slugLower) || (mapped ? state.completedLessons.includes(mapped) : false);
  }
  return (
    state.completedLessons.includes(lesson.slug.toLowerCase()) ||
    state.completedLessons.includes(lesson.code.toLowerCase()) ||
    Boolean(PRISMA_LEGACY_SLUG_MAP[slugLower] && state.completedLessons.includes(PRISMA_LEGACY_SLUG_MAP[slugLower]))
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
    updatedList = Array.from(new Set([...state.completedLessons, targetKey, codeKey].filter(Boolean)));
  }

  saveState({
    ...state,
    completedLessons: updatedList,
  });

  // Background server sync
  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topicId: "prisma",
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
  const slugLower = slugOrCode.toLowerCase().trim();
  const lesson = getLessonBySlug(slugLower);
  const targetKey = lesson ? lesson.slug.toLowerCase() : slugLower;
  const codeKey = lesson ? lesson.code.toLowerCase() : "";

  const nextCompleted = state.completedLessons.filter(
    (k) => k !== targetKey && k !== codeKey && k !== slugLower
  );

  saveState({
    ...state,
    completedLessons: nextCompleted,
  });

  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topicId: "prisma",
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

export function getOverallProgress(): { completedCount: number; totalCount: number; percent: number } {
  const state = getStoredState();
  const completedSet = new Set<string>();

  state.completedLessons.forEach((id) => {
    const lesson = getLessonBySlug(id);
    if (lesson) {
      completedSet.add(lesson.slug);
    } else {
      const mapped = PRISMA_LEGACY_SLUG_MAP[id.toLowerCase()];
      if (mapped) {
        completedSet.add(mapped);
      }
    }
  });

  const completedCount = completedSet.size;
  const totalCount = PRISMA_LESSONS.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return { completedCount, totalCount, percent };
}

export function getNextRecommendedLesson(): LessonMeta | null {
  for (const lesson of PRISMA_LESSONS) {
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

export function getCurrentLesson(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(CURRENT_KEY);
  } catch {
    return null;
  }
}

export function getActiveLesson(): LessonMeta {
  const currentSlug = getCurrentLesson();
  if (currentSlug) {
    const lesson = getLessonBySlug(currentSlug);
    if (lesson) return lesson;
  }
  const next = getNextRecommendedLesson();
  return next || PRISMA_LESSONS[0];
}

export function setWeeklyGoal(days: number): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GOAL_KEY, days.toString());
  } catch {}
}

export function getWeeklyGoal(): number {
  if (typeof window === "undefined") return 3;
  try {
    const raw = localStorage.getItem(GOAL_KEY);
    return raw ? parseInt(raw, 10) : 3;
  } catch {
    return 3;
  }
}

export async function fetchProgressFromDB(): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const res = await fetch("/api/progress?topicId=prisma");
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
