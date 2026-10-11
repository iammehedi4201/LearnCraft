/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * INTERACTIVE NOTES & BOOKMARKS TYPE DEFINITIONS — LearnCraft
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export type NoteContentType = "text" | "qa" | "code";

export interface QAEntry {
  id: string;
  question: string;
  answer: string;
  explanation?: string;
}

export interface CodeNoteData {
  title?: string;
  code: string;
  language: string;
  explanation?: string;
}

export type NoteBlockType = "text" | "qa" | "code";

export interface BaseNoteBlock {
  id: string;
  type: NoteBlockType;
  order: number;
  createdAt: number;
  updatedAt: number;
}

export interface TextNoteBlock extends BaseNoteBlock {
  type: "text";
  content: string;
}

export interface QABlock extends BaseNoteBlock {
  type: "qa";
  question: string;
  answer: string;
  explanation?: string;
}

export interface CodeBlock extends BaseNoteBlock {
  type: "code";
  title?: string;
  language: string;
  code: string;
  explanation?: string;
}

export type LessonNoteBlock = TextNoteBlock | QABlock | CodeBlock;

/**
 * Backward-compatible & type-safe UserNote model.
 * Supports Unified Ordered Notebook Blocks ("blocks") while preserving legacy `content: string`
 * and legacy content types.
 */
export interface UserNote {
  id: string;
  trackKey: string;
  lessonSlug: string;
  lessonPath?: string;
  sectionId?: string;
  title?: string;
  /**
   * Always populated Markdown representation.
   * Serialized from ordered blocks for 100% backward compatibility with search, previews, and API.
   */
  content: string;
  /**
   * Ordered collection of mixed content blocks for the Unified Lesson Notebook.
   */
  blocks?: LessonNoteBlock[];
  /**
   * Legacy content type indicator: "text" | "qa" | "code".
   */
  noteType?: NoteContentType;
  /**
   * Legacy structured Q&A entries.
   */
  qaEntries?: QAEntry[];
  /**
   * Legacy structured Code Snippet data.
   */
  codeData?: CodeNoteData;
  /**
   * Legacy stored draft text.
   */
  textDraft?: string;
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
