import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import {
  CURATED_MODULE_QUIZZES,
  getQuizBySlug,
  getAllQuizzes,
} from "../quiz/quiz-registry";
import { evaluateQuizSubmission } from "../quiz/quiz-evaluator";
import {
  saveLocalQuizAttempt,
  getLocalQuizAttempts,
  getBestScoreForQuiz,
} from "../quiz/quiz-storage";
import { QuizAttemptRecord } from "../quiz/quiz-types";

// In-memory mock for Node test environment
const mockStorage: Record<string, string> = {};
const localStorageMock = {
  getItem: (key: string) => mockStorage[key] ?? null,
  setItem: (key: string, val: string) => {
    mockStorage[key] = String(val);
  },
  removeItem: (key: string) => {
    delete mockStorage[key];
  },
  clear: () => {
    for (const k in mockStorage) delete mockStorage[k];
  },
};

beforeAll(() => {
  (globalThis as any).window = {
    dispatchEvent: () => true,
  };
  (globalThis as any).localStorage = localStorageMock;
});

describe("Quiz Engine — Question Registry & Schema", () => {
  it("contains curated quizzes with both multiple-choice and code output prediction questions", () => {
    const quizzes = getAllQuizzes();
    expect(quizzes.length).toBeGreaterThanOrEqual(4);

    const nx01 = getQuizBySlug("nextjs", "nx01-app-router");
    expect(nx01).toBeDefined();
    expect(nx01?.lessonCode).toBe("NX-01");
    expect(nx01?.questions.length).toBeGreaterThanOrEqual(3);

    const mcq = nx01?.questions.find((q) => q.type === "multiple_choice");
    const codeOutput = nx01?.questions.find((q) => q.type === "code_output");

    expect(mcq).toBeDefined();
    expect(mcq?.options.length).toBeGreaterThan(1);
    expect(mcq?.correctAnswer).toBeGreaterThanOrEqual(0);

    expect(codeOutput).toBeDefined();
    if (codeOutput && codeOutput.type === "code_output") {
      expect(codeOutput.codeSnippet).toBeDefined();
      expect(codeOutput.codeSnippet.length).toBeGreaterThan(10);
      expect(codeOutput.options.length).toBeGreaterThan(1);
    }
  });

  it("dynamically generates a valid fallback assessment for unlisted lessons", () => {
    const fallbackQuiz = getQuizBySlug("express", "exp05-router-subapps");
    expect(fallbackQuiz).toBeDefined();
    expect(fallbackQuiz?.trackKey).toBe("express");
    expect(fallbackQuiz?.questions.length).toBeGreaterThan(1);
    expect(fallbackQuiz?.questions.some((q) => q.type === "code_output")).toBe(true);
  });
});

describe("Quiz Evaluator — Scoring & Answer Validation", () => {
  const sampleQuiz = CURATED_MODULE_QUIZZES[0]; // Next.js NX-01 (4 questions)

  it("calculates 100% perfect score with base XP and perfect score bonus", () => {
    const perfectAnswers: Record<string, number> = {};
    for (const q of sampleQuiz.questions) {
      perfectAnswers[q.id] = q.correctAnswer;
    }

    const result = evaluateQuizSubmission(sampleQuiz, {
      quizId: sampleQuiz.id,
      trackKey: sampleQuiz.trackKey,
      lessonSlug: sampleQuiz.lessonSlug,
      answers: perfectAnswers,
      hintsUsed: [],
    });

    expect(result.score).toBe(100);
    expect(result.correctAnswers).toBe(sampleQuiz.questions.length);
    expect(result.passed).toBe(true);
    expect(result.baseXpEarned).toBe(sampleQuiz.baseXpReward);
    expect(result.perfectBonusXp).toBe(sampleQuiz.perfectScoreBonusXp);
    expect(result.netXpEarned).toBe(
      sampleQuiz.baseXpReward + sampleQuiz.perfectScoreBonusXp
    );
  });

  it("marks score below passing threshold (75%) as failed with 0 XP earned", () => {
    const failedAnswers: Record<string, number> = {};
    // Intentionally answer all wrong
    for (const q of sampleQuiz.questions) {
      failedAnswers[q.id] = (q.correctAnswer + 1) % q.options.length;
    }

    const result = evaluateQuizSubmission(sampleQuiz, {
      quizId: sampleQuiz.id,
      trackKey: sampleQuiz.trackKey,
      lessonSlug: sampleQuiz.lessonSlug,
      answers: failedAnswers,
      hintsUsed: [],
    });

    expect(result.score).toBe(0);
    expect(result.correctAnswers).toBe(0);
    expect(result.passed).toBe(false);
    expect(result.baseXpEarned).toBe(0);
    expect(result.perfectBonusXp).toBe(0);
    expect(result.netXpEarned).toBe(0);
  });
});

describe("Quiz Evaluator — Hint System & XP Deductions", () => {
  const sampleQuiz = CURATED_MODULE_QUIZZES[0];

  it("deducts hint cost from gross XP reward and calculates net XP balance", () => {
    const perfectAnswers: Record<string, number> = {};
    for (const q of sampleQuiz.questions) {
      perfectAnswers[q.id] = q.correctAnswer;
    }

    const hintQId = sampleQuiz.questions[0].id; // 5 XP cost

    const result = evaluateQuizSubmission(sampleQuiz, {
      quizId: sampleQuiz.id,
      trackKey: sampleQuiz.trackKey,
      lessonSlug: sampleQuiz.lessonSlug,
      answers: perfectAnswers,
      hintsUsed: [hintQId],
    });

    expect(result.score).toBe(100);
    expect(result.xpSpentOnHints).toBe(5);
    const grossXP = sampleQuiz.baseXpReward + sampleQuiz.perfectScoreBonusXp;
    expect(result.netXpEarned).toBe(grossXP - 5);
  });

  it("never produces negative net XP if hint deductions exceed gross XP", () => {
    const failedAnswers: Record<string, number> = {};
    for (const q of sampleQuiz.questions) {
      failedAnswers[q.id] = (q.correctAnswer + 1) % q.options.length;
    }

    const result = evaluateQuizSubmission(sampleQuiz, {
      quizId: sampleQuiz.id,
      trackKey: sampleQuiz.trackKey,
      lessonSlug: sampleQuiz.lessonSlug,
      answers: failedAnswers,
      hintsUsed: [sampleQuiz.questions[0].id, sampleQuiz.questions[1].id],
    });

    expect(result.xpSpentOnHints).toBe(10);
    expect(result.netXpEarned).toBe(0);
  });
});

describe("Quiz Evaluator — Anti-Duplicate XP Protection", () => {
  const sampleQuiz = CURATED_MODULE_QUIZZES[0];

  it("awards 0 base XP on repeat attempt if user previously achieved 100%", () => {
    const perfectAnswers: Record<string, number> = {};
    for (const q of sampleQuiz.questions) {
      perfectAnswers[q.id] = q.correctAnswer;
    }

    // Previous best was 100%
    const result = evaluateQuizSubmission(
      sampleQuiz,
      {
        quizId: sampleQuiz.id,
        trackKey: sampleQuiz.trackKey,
        lessonSlug: sampleQuiz.lessonSlug,
        answers: perfectAnswers,
        hintsUsed: [],
      },
      { previousBestScore: 100 }
    );

    expect(result.isRepeat).toBe(true);
    expect(result.score).toBe(100);
    expect(result.baseXpEarned).toBe(0);
    expect(result.perfectBonusXp).toBe(0);
    expect(result.netXpEarned).toBe(0);
  });

  it("awards delta improvement XP if user beats previous passing score", () => {
    const perfectAnswers: Record<string, number> = {};
    for (const q of sampleQuiz.questions) {
      perfectAnswers[q.id] = q.correctAnswer;
    }

    // Previous best was 75%
    const result = evaluateQuizSubmission(
      sampleQuiz,
      {
        quizId: sampleQuiz.id,
        trackKey: sampleQuiz.trackKey,
        lessonSlug: sampleQuiz.lessonSlug,
        answers: perfectAnswers,
        hintsUsed: [],
      },
      { previousBestScore: 75 }
    );

    expect(result.isRepeat).toBe(true);
    expect(result.score).toBe(100);
    // Delta 25% of 30 XP = ~8 XP, plus perfect score bonus = 15 XP
    expect(result.baseXpEarned).toBeGreaterThan(0);
    expect(result.perfectBonusXp).toBe(sampleQuiz.perfectScoreBonusXp);
    expect(result.netXpEarned).toBeGreaterThan(15);
  });
});

describe("Quiz Storage & History", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it("persists quiz attempts and identifies the best score across attempts", () => {
    const attempt1: QuizAttemptRecord = {
      id: "att_1",
      quizId: "quiz-nextjs-nx01",
      trackKey: "nextjs",
      lessonSlug: "nx01-app-router",
      lessonCode: "NX-01",
      lessonTitle: "The App Router Architecture",
      score: 75,
      totalQuestions: 4,
      correctAnswers: 3,
      xpEarned: 30,
      xpSpentOnHints: 0,
      hintsUsed: [],
      completedAt: "2026-10-10T10:00:00Z",
    };

    const attempt2: QuizAttemptRecord = {
      id: "att_2",
      quizId: "quiz-nextjs-nx01",
      trackKey: "nextjs",
      lessonSlug: "nx01-app-router",
      lessonCode: "NX-01",
      lessonTitle: "The App Router Architecture",
      score: 100,
      totalQuestions: 4,
      correctAnswers: 4,
      xpEarned: 15,
      xpSpentOnHints: 0,
      hintsUsed: [],
      completedAt: "2026-10-11T12:00:00Z",
    };

    saveLocalQuizAttempt(attempt1);
    saveLocalQuizAttempt(attempt2);

    const history = getLocalQuizAttempts();
    expect(history.length).toBe(2);
    // Newest attempt first
    expect(history[0].id).toBe("att_2");

    const bestScore = getBestScoreForQuiz("quiz-nextjs-nx01");
    expect(bestScore).toBe(100);
  });
});
