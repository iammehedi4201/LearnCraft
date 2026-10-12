/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * INTERVIEW PROGRESS & SPACED REPETITION ENGINE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Manages user recall progress on interview questions using the SuperMemo
 * SM-2 algorithm. Integrates with LearnCraft's local-first storage and
 * gamification reward system.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import {
  QuestionProgress,
  InterviewGrade,
  TrackInterviewStats,
  OverallInterviewStats,
  InterviewQuestion,
  MockInterviewResult,
} from "@/types/interview";
import { recordActivity } from "@/lib/gamification";
import { ALL_INTERVIEW_QUESTIONS, getQuestionsByTrack } from "@/lib/interview-questions";

const PROGRESS_STORAGE_KEY = "learncraft_interview_progress_v1";
const MOCK_RESULTS_STORAGE_KEY = "learncraft_interview_mock_history_v1";
export const INTERVIEW_SYNC_EVENT = "learncraft:interview-sync";

const DEFAULT_EF = 2.5;
const MIN_EF = 1.3;
const MAX_EF = 3.2;

/**
 * Notify listening UI components of interview progress state changes
 */
function notifyInterviewSync(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(INTERVIEW_SYNC_EVENT));
}

/**
 * Retrieve all question progress maps from localStorage
 */
export function getAllQuestionProgress(): Record<string, QuestionProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error("[InterviewProgress] Error reading progress:", err);
    return {};
  }
}

/**
 * Retrieve progress for a single question
 */
export function getQuestionProgress(questionId: string): QuestionProgress | null {
  const all = getAllQuestionProgress();
  return all[questionId] || null;
}

/**
 * Convert semantic grade to numerical score (1 to 5) for SM-2
 */
function gradeToScore(grade: InterviewGrade): number {
  switch (grade) {
    case "again":
      return 1; // Complete blackout / reset
    case "hard":
      return 3; // Significant difficulty
    case "good":
      return 4; // Clear correct recall
    case "easy":
      return 5; // Effortless instant recall
  }
}

/**
 * Record a user's recall rating for an interview question, calculate new
 * SM-2 intervals, persist state, and award gamification XP.
 */
export function recordQuestionGrade(
  questionId: string,
  grade: InterviewGrade,
  reviewDate: Date = new Date()
): QuestionProgress {
  const all = getAllQuestionProgress();
  const existing = all[questionId];

  const currentRep = existing?.repetition ?? 0;
  const currentInterval = existing?.interval ?? 1;
  const currentEF = existing?.easinessFactor ?? DEFAULT_EF;
  const currentConsecutiveGood = existing?.consecutiveGood ?? 0;

  const qScore = gradeToScore(grade);

  // 1. Calculate updated Easiness Factor (EF)
  let newEF = currentEF + (0.1 - (5 - qScore) * (0.08 + (5 - qScore) * 0.02));
  newEF = Math.max(MIN_EF, Math.min(MAX_EF, Number(newEF.toFixed(2))));

  // 2. Calculate updated Repetition and Interval
  let newRepetition = 0;
  let newInterval = 1;
  let newConsecutiveGood = currentConsecutiveGood;

  if (qScore < 3) {
    // Grade: "again"
    newRepetition = 0;
    newInterval = 1; // review tomorrow / same session
    newConsecutiveGood = 0;
  } else {
    // Grade: "hard", "good", or "easy"
    newRepetition = currentRep + 1;
    newConsecutiveGood = grade === "good" || grade === "easy" ? currentConsecutiveGood + 1 : currentConsecutiveGood;

    if (newRepetition === 1) {
      newInterval = grade === "easy" ? 3 : 1;
    } else if (newRepetition === 2) {
      if (grade === "easy") newInterval = 7;
      else if (grade === "hard") newInterval = 2;
      else newInterval = 4;
    } else {
      // Exponential scheduling
      if (grade === "easy") {
        newInterval = Math.round(currentInterval * newEF * 1.3);
      } else if (grade === "hard") {
        newInterval = Math.max(currentInterval + 1, Math.round(currentInterval * 1.2));
      } else {
        newInterval = Math.max(currentInterval + 1, Math.round(currentInterval * newEF));
      }
    }
  }

  newInterval = Math.max(1, newInterval);

  const nextDue = new Date(reviewDate.getTime() + newInterval * 24 * 60 * 60 * 1000);
  const nextReviewDate = nextDue.toISOString().split("T")[0]; // YYYY-MM-DD
  const isMastered = newConsecutiveGood >= 3 || newInterval >= 14;

  const updatedProgress: QuestionProgress = {
    questionId,
    repetition: newRepetition,
    interval: newInterval,
    easinessFactor: newEF,
    nextReviewDate,
    lastReviewedAt: reviewDate.toISOString(),
    timesReviewed: (existing?.timesReviewed ?? 0) + 1,
    consecutiveGood: newConsecutiveGood,
    lastGrade: grade,
    isMastered,
    history: [
      {
        date: reviewDate.toISOString(),
        grade,
        interval: newInterval,
        easinessFactor: newEF,
      },
      ...(existing?.history || []).slice(0, 15),
    ],
  };

  all[questionId] = updatedProgress;

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(all));
    } catch (err) {
      console.error("[InterviewProgress] Failed to save progress:", err);
    }
  }

  // Award gamification XP
  try {
    recordActivity(
      "flashcard_review",
      `Interview Prep: Reviewed question (${grade.toUpperCase()})`,
      { questionId, grade, interval: newInterval }
    );
  } catch (err) {
    console.error("[InterviewProgress] Gamification sync error:", err);
  }

  notifyInterviewSync();
  return updatedProgress;
}

/**
 * Calculate track-level statistics for a given track and its question bank
 */
export function getTrackStats(
  trackKey: string,
  questions: InterviewQuestion[]
): TrackInterviewStats {
  const allProgress = getAllQuestionProgress();
  const today = new Date().toISOString().split("T")[0];

  let reviewed = 0;
  let mastered = 0;
  let due = 0;
  let totalEF = 0;

  questions.forEach((q) => {
    const prog = allProgress[q.id];
    if (prog) {
      reviewed++;
      if (prog.isMastered) mastered++;
      if (prog.nextReviewDate <= today) due++;
      totalEF += prog.easinessFactor;
    } else {
      // Unreviewed questions are also due for their first session
      due++;
    }
  });

  const total = questions.length;
  const unreviewed = Math.max(0, total - reviewed);
  const percentMastered = total > 0 ? Math.round((mastered / total) * 100) : 0;
  const avgEF = reviewed > 0 ? Number((totalEF / reviewed).toFixed(2)) : DEFAULT_EF;

  return {
    trackKey,
    totalQuestions: total,
    questionsReviewed: reviewed,
    masteredCount: mastered,
    dueForReview: due,
    unreviewedCount: unreviewed,
    percentMastered,
    averageEasiness: avgEF,
  };
}

/**
 * Calculate overall summary stats across all interview tracks
 */
export function getOverallInterviewStats(): OverallInterviewStats {
  const allProgress = getAllQuestionProgress();
  const today = new Date().toISOString().split("T")[0];

  let reviewed = 0;
  let mastered = 0;
  let due = 0;

  ALL_INTERVIEW_QUESTIONS.forEach((q) => {
    const prog = allProgress[q.id];
    if (prog) {
      reviewed++;
      if (prog.isMastered) mastered++;
      if (prog.nextReviewDate <= today) due++;
    } else {
      due++;
    }
  });

  const total = ALL_INTERVIEW_QUESTIONS.length;
  const overallPercentMastered = total > 0 ? Math.round((mastered / total) * 100) : 0;

  // Count unique tracks
  const tracks = new Set(ALL_INTERVIEW_QUESTIONS.map((q) => q.trackKey));

  return {
    totalQuestions: total,
    questionsReviewed: reviewed,
    masteredCount: mastered,
    dueForReview: due,
    overallPercentMastered,
    totalTracks: tracks.size,
  };
}

/**
 * Retrieve questions due for review today (ordered by overdue priority)
 */
export function getDueQuestions(trackKey?: string): InterviewQuestion[] {
  const allProgress = getAllQuestionProgress();
  const today = new Date().toISOString().split("T")[0];
  const pool = trackKey ? getQuestionsByTrack(trackKey) : ALL_INTERVIEW_QUESTIONS;

  return pool.filter((q) => {
    const prog = allProgress[q.id];
    if (!prog) return true; // Unreviewed is due!
    return prog.nextReviewDate <= today;
  });
}

/**
 * Store a completed mock interview simulation result
 */
export function saveMockInterviewResult(result: MockInterviewResult): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(MOCK_RESULTS_STORAGE_KEY);
    const history: MockInterviewResult[] = raw ? JSON.parse(raw) : [];
    history.unshift(result);
    localStorage.setItem(MOCK_RESULTS_STORAGE_KEY, JSON.stringify(history.slice(0, 50)));

    // Award bonus XP for completing mock interview
    recordActivity("project_complete", `Completed Mock Interview: ${result.totalQuestions} questions`, {
      scorePercent: result.scorePercent,
      tracks: result.trackKeys,
    });
  } catch (err) {
    console.error("[InterviewProgress] Error saving mock result:", err);
  }
}

/**
 * Retrieve user's past mock interview results
 */
export function getMockInterviewHistory(): MockInterviewResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(MOCK_RESULTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("[InterviewProgress] Error loading mock history:", err);
    return [];
  }
}

/**
 * Reset progress for a specific track (allows starting fresh)
 */
export function resetTrackProgress(trackKey: string): void {
  if (typeof window === "undefined") return;
  try {
    const all = getAllQuestionProgress();
    const trackQuestions = getQuestionsByTrack(trackKey);
    trackQuestions.forEach((q) => {
      delete all[q.id];
    });
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(all));
    notifyInterviewSync();
  } catch (err) {
    console.error("[InterviewProgress] Error resetting track:", err);
  }
}
