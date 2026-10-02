/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * QUICK REVISION & SPACED REPETITION — TYPE DEFINITIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Universal data models for text highlights, personal notes, topic metadata,
 * and SuperMemo SM-2 algorithmic memory scheduling across LearnCraft.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export type HighlightColor = "feature" | "away" | "highlighted" | "success" | "info";

export type SM2Grade = "again" | "hard" | "good" | "easy";

export interface SM2ReviewLog {
  timestamp: string;
  grade: SM2Grade;
  numericGrade: number;     // 1 = again, 3 = hard, 4 = good, 5 = easy
  interval: number;         // Resulting interval in days
  easinessFactor: number;   // Resulting EF
}

export interface AnnotationItem {
  id: string;                      // Unique ID, e.g. "rev_172365..."
  userId: string;                  // User ID (default: "user_default")
  topicId: string;                 // Topic identifier (e.g. "nestjs", "nextjs", "tanstack", "oop", "typescript")
  topicTitle: string;              // Human-readable topic name (e.g. "NestJS", "Next.js", "TanStack Query", "OOP")
  lessonId: string;                // Lesson identifier (e.g. "nj02-oop-foundations")
  lessonTitle: string;             // Human-readable lesson name (e.g. "OOP Foundations")
  lessonPath: string;              // URL route to lesson (e.g. "/learn/nestjs/nj02-oop-foundations")
  sectionId?: string;              // Sub-section ID if available (e.g. "part2")
  selectedText: string;            // Exact text snippet highlighted
  contextBefore?: string;          // Surrounding text before selection (for disambiguation)
  contextAfter?: string;           // Surrounding text after selection
  question?: string;               // Optional recall question (e.g. for flashcards / active recall)
  note?: string;                   // User's personal explanation or reminder
  color: HighlightColor;           // Design-system semantic color
  createdAt: string;               // ISO 8601 creation timestamp
  updatedAt: string;               // ISO 8601 update timestamp
  isFavorite?: boolean;            // Quick star / favorite
  mastered?: boolean;              // Fast revision mastered flag

  // ─── SM-2 Spaced Repetition Parameters ─────────────────────────────────────
  repetition?: number;             // Number of consecutive successful reviews (n >= 0)
  interval?: number;               // Current interval in days until next review (I >= 1)
  easinessFactor?: number;         // SuperMemo easiness factor (EF >= 1.3, default 2.5)
  nextReviewDate?: string;         // ISO 8601 scheduled review due timestamp
  lastReviewedAt?: string;         // ISO 8601 timestamp of last review session
  reviewHistory?: SM2ReviewLog[];  // Chronological log of past review performances
}

export interface TopicMetadata {
  id: string;
  title: string;
  category: string;
  badgeClass: string;
  icon?: string;
}

export type RevisionViewTab = "all" | "highlights" | "notes" | "flashcards" | "spaced";

export type RevisionSortOption = "newest" | "oldest" | "topic" | "lesson" | "urgency" | "retention";

export interface RevisionStats {
  total: number;
  highlightsCount: number;
  notesCount: number;
  topicsCount: number;
  topicBreakdown: Record<string, { topicTitle: string; count: number; notesCount: number }>;
}

export interface SpacedRepetitionStats {
  totalCards: number;
  dueTodayCount: number;
  learningCount: number;        // In progress (repetition > 0 but interval < 21)
  masteredCount: number;        // Mastered (repetition >= 3 and interval >= 21)
  newCardsCount: number;        // Never reviewed yet
  averageRetentionRate: number; // Overall predicted memory retention percentage (0 - 100%)
  totalReviewsCompleted: number;// Lifetime reviews conducted
  streakDays: number;           // Consecutive days with at least 1 review
}

export interface MemoryRetentionCurvePoint {
  day: number;
  decayPercent: number;
  recalledPercent: number;
}

export interface SM2IntervalPreview {
  grade: SM2Grade;
  label: string;
  intervalDays: number;
  badge: string;
  description: string;
}

export interface TextSelectionRangeData {
  text: string;
  rect: {
    top: number;
    left: number;
    bottom: number;
    right: number;
    width: number;
    height: number;
  };
  contextBefore: string;
  contextAfter: string;
  sectionId?: string;
}
