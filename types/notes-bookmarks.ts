/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * INTERACTIVE NOTES & BOOKMARKS TYPE DEFINITIONS — LearnCraft
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export interface UserNote {
  id: string;
  trackKey: string;
  lessonSlug: string;
  sectionId?: string;
  title?: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface CodeBookmark {
  id: string;
  trackKey: string;
  lessonSlug: string;
  sectionId?: string;
  title: string;
  code: string;
  language?: string;
  notes?: string;
  tags?: string[];
  createdAt: number;
}

export interface NotesStoreState {
  notes: Record<string, UserNote>; // keyed by note.id
  bookmarks: Record<string, CodeBookmark>; // keyed by bookmark.id
}
