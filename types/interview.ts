/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * INTERVIEW PREPARATION SYSTEM — TYPE DEFINITIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Types for topic-based interview questions, spaced repetition (SM-2)
 * tracking, flashcard practice sessions, and mock interview simulations.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export type QuestionType =
  | "conceptual"
  | "coding"
  | "system-design"
  | "practical"
  | "architecture"
  | "internals"
  | "scenario"
  | "security"
  | "trade-offs";

export type LegacyDifficulty = "easy" | "medium" | "hard";
export type StandardDifficulty = "beginner" | "intermediate" | "advanced";
export type Difficulty = LegacyDifficulty | StandardDifficulty;

export type StandardCategory =
  | "conceptual"
  | "practical"
  | "coding"
  | "debugging"
  | "scenario"
  | "internals"
  | "performance"
  | "best-practices";

export type QuestionSource = "curated" | "ai" | "community";
export type QuestionStatus = "draft" | "approved" | "rejected";
export type InterviewGrade = "again" | "hard" | "good" | "easy";

export interface InterviewQuestion {
  id: string; // e.g. "react-q01"
  trackKey: string; // e.g. "react", "javascript", "system-design"
  topic?: string; // Semantic alias for trackKey (e.g. "React", "JavaScript")
  subtopic?: string; // Sub-domain e.g. "Event Loop", "Closures", "Custom Hooks"
  category: string; // e.g. "Hooks", "conceptual", "debugging"
  type: QuestionType;
  difficulty: Difficulty;
  question: string; // The interview question prompt (Markdown)
  answer: string; // Comprehensive model answer (Markdown + code)
  explanation?: string; // Clear conceptual explanation in plain English
  example?: string; // Practical code example or scenario walk-through
  codeSnippet?: string; // Optional code snippet to examine
  expectedOutput?: string; // For "What does this code output?" questions
  followUps: string[]; // Common follow-up questions interviewers ask
  keyPoints: string[]; // Checkpoints the candidate's answer must include
  tags: string[]; // Searchable tags e.g. ["hooks", "memoization"]
  source?: QuestionSource; // "curated" | "ai" | "community" (defaults to "curated")
  status?: QuestionStatus; // "draft" | "approved" | "rejected"
  relatedLessonSlug?: string; // Curriculum link e.g. "/learn/react/r12-usememo-usecallback"
  relatedLessonName?: string; // Human readable title e.g. "R-12: useMemo & useCallback"
}

export interface QuestionReviewLog {
  date: string;
  grade: InterviewGrade;
  interval: number;
  easinessFactor: number;
}

export interface QuestionProgress {
  questionId: string;
  repetition: number;
  interval: number; // In days
  easinessFactor: number;
  nextReviewDate: string; // ISO date string
  lastReviewedAt: string; // ISO timestamp
  timesReviewed: number;
  consecutiveGood: number; // Count of consecutive 'good' or 'easy' grades
  lastGrade: InterviewGrade;
  isMastered: boolean; // True if mastered (consecutiveGood >= 3 or interval >= 14)
  history: QuestionReviewLog[];
}

export interface TrackInterviewStats {
  trackKey: string;
  totalQuestions: number;
  questionsReviewed: number;
  masteredCount: number;
  dueForReview: number;
  unreviewedCount: number;
  percentMastered: number;
  averageEasiness: number;
}

export interface OverallInterviewStats {
  totalQuestions: number;
  questionsReviewed: number;
  masteredCount: number;
  dueForReview: number;
  overallPercentMastered: number;
  totalTracks: number;
}

export interface MockInterviewConfig {
  selectedTracks: string[];
  questionCount: number; // e.g. 5, 10, 15
  timePerQuestionSeconds: number; // 0 = untimed, 45, 60, 90, 120
  difficultyFilter?: "all" | Difficulty;
}

export interface MockInterviewResult {
  id: string;
  timestamp: string;
  trackKeys: string[];
  totalQuestions: number;
  scorePercent: number;
  timeSpentSeconds: number;
  xpEarned: number;
  grades: Record<string, InterviewGrade>;
  answersSummary: {
    questionId: string;
    grade: InterviewGrade;
    category: string;
    trackKey: string;
    questionText: string;
  }[];
}
