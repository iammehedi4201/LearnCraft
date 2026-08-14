/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * QUICK REVISION — TYPE DEFINITIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Universal data models for text highlights, personal notes, topic metadata,
 * and revision statistics across LearnCraft.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export type HighlightColor = "feature" | "away" | "highlighted" | "success" | "info";

export interface AnnotationItem {
  id: string;                      // Unique ID, e.g. "rev_172365..."
  userId: string;                  // User ID (default: "user_default")
  topicId: string;                 // Topic identifier (e.g. "nestjs", "nextjs", "tanstack", "oop", "typescript", "javascript")
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
}

export interface TopicMetadata {
  id: string;
  title: string;
  category: string;
  badgeClass: string;
  icon?: string;
}

export type RevisionViewTab = "all" | "highlights" | "notes" | "flashcards";

export type RevisionSortOption = "newest" | "oldest" | "topic" | "lesson";

export interface RevisionStats {
  total: number;
  highlightsCount: number;
  notesCount: number;
  topicsCount: number;
  topicBreakdown: Record<string, { topicTitle: string; count: number; notesCount: number }>;
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
