/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * LEARNCRAFT QUIZ ENGINE — TYPES & SCHEMAS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Extensible data model supporting multiple choice, code output prediction,
 * server validation, XP deductions/rewards, and attempt history.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export type QuestionType = "multiple_choice" | "code_output";

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  explanation: string;
  hint?: string;
  hintCostXP?: number; // XP to deduct if user reveals hint (default 5 XP)
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple_choice";
  options: string[];
  correctAnswer: number; // 0-based index of correct option
}

export interface CodeOutputQuestion extends BaseQuestion {
  type: "code_output";
  codeSnippet: string;
  language?: string; // "typescript" | "javascript" | "tsx" | "sql"
  options: string[]; // plausible output options to predict
  correctAnswer: number; // 0-based index of the expected console/return output
}

export type QuizQuestion = MultipleChoiceQuestion | CodeOutputQuestion;

export interface ModuleQuiz {
  id: string; // e.g. "quiz-nextjs-nx01"
  trackKey: string; // e.g. "nextjs"
  trackTitle: string; // e.g. "Next.js"
  lessonSlug: string; // e.g. "nx01-app-router"
  lessonCode: string; // e.g. "NX-01"
  lessonTitle: string; // e.g. "The App Router Architecture"
  description: string;
  passingScore: number; // percentage (e.g. 70)
  baseXpReward: number; // base XP for passing (e.g. 25)
  perfectScoreBonusXp: number; // bonus XP if 100% score (e.g. 15)
  questions: QuizQuestion[];
}

export interface QuestionEvaluation {
  questionId: string;
  questionType: QuestionType;
  prompt: string;
  codeSnippet?: string;
  language?: string;
  options: string[];
  userAnswer: number | null;
  correctAnswer: number;
  isCorrect: boolean;
  hintUsed: boolean;
  explanation: string;
}

export interface QuizEvaluationResult {
  quizId: string;
  trackKey: string;
  trackTitle: string;
  lessonSlug: string;
  lessonCode: string;
  lessonTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number; // percentage (0 - 100)
  passed: boolean;
  baseXpEarned: number;
  perfectBonusXp: number;
  xpSpentOnHints: number;
  netXpEarned: number;
  isRepeat: boolean;
  previousBestScore: number | null;
  evaluations: QuestionEvaluation[];
  completedAt: string;
}

export interface QuizAttemptRecord {
  id: string;
  userId?: string;
  quizId: string;
  trackKey: string;
  lessonSlug: string;
  lessonCode: string;
  lessonTitle: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  xpEarned: number;
  xpSpentOnHints: number;
  hintsUsed: string[];
  evaluations?: QuestionEvaluation[];
  completedAt: string;
  isBestScore?: boolean;
}

export interface QuizSubmissionPayload {
  quizId: string;
  trackKey: string;
  lessonSlug: string;
  answers: Record<string, number>; // questionId -> selectedOptionIndex
  hintsUsed: string[]; // list of questionIds where hint was unlocked
}
