/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * LOCAL-FIRST QUIZ STORAGE & SYNC ENGINE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Preserves quiz history locally with zero latency while keeping
 * PostgreSQL cloud backup synchronized for authenticated sessions.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { QuizAttemptRecord } from "./quiz-types";

const QUIZ_STORAGE_KEY = "learncraft_quiz_attempts_v1";
export const QUIZ_SYNC_EVENT = "learncraft:quiz-sync";

/**
 * Retrieve all local quiz attempt records from localStorage, newest first.
 */
export function getLocalQuizAttempts(): QuizAttemptRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!raw) return [];
    const parsed: QuizAttemptRecord[] = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Sort newest first
    return parsed.sort(
      (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
  } catch (err) {
    console.error("[QuizStorage] Failed to read attempts:", err);
    return [];
  }
}

/**
 * Save a new quiz attempt record to localStorage and emit cross-tab event.
 */
export function saveLocalQuizAttempt(attempt: QuizAttemptRecord): void {
  if (typeof window === "undefined") return;

  try {
    const existing = getLocalQuizAttempts();
    const updated = [attempt, ...existing.filter((a) => a.id !== attempt.id)];
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(updated));

    window.dispatchEvent(new CustomEvent(QUIZ_SYNC_EVENT));
  } catch (err) {
    console.error("[QuizStorage] Failed to save attempt:", err);
  }
}

/**
 * Retrieve user's previous highest score for a specific quizId.
 */
export function getBestScoreForQuiz(quizId: string): number | null {
  const attempts = getLocalQuizAttempts().filter((a) => a.quizId === quizId);
  if (attempts.length === 0) return null;
  return Math.max(...attempts.map((a) => a.score));
}

/**
 * Retrieve all attempts for a specific lesson slug.
 */
export function getQuizAttemptsBySlug(lessonSlug: string): QuizAttemptRecord[] {
  return getLocalQuizAttempts().filter((a) => a.lessonSlug === lessonSlug);
}

/**
 * Synchronize local attempts with server endpoint `/api/quiz/history`.
 */
export async function syncQuizAttemptsWithCloud(): Promise<QuizAttemptRecord[]> {
  const localAttempts = getLocalQuizAttempts();
  if (typeof window === "undefined") return localAttempts;

  try {
    const res = await fetch("/api/quiz/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attempts: localAttempts }),
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.attempts)) {
        // Merge server and local attempts
        const map = new Map<string, QuizAttemptRecord>();
        for (const item of [...data.attempts, ...localAttempts]) {
          if (item?.id) map.set(item.id, item);
        }
        const merged = Array.from(map.values()).sort(
          (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        );

        localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(merged));
        window.dispatchEvent(new CustomEvent(QUIZ_SYNC_EVENT));
        return merged;
      }
    }
  } catch (err) {
    console.warn("[QuizStorage] Cloud history sync failed (offline mode):", err);
  }

  return localAttempts;
}
