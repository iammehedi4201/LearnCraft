/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * LOCAL-FIRST NOTES & BOOKMARKS ENGINE — LearnCraft
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Implements 0ms-latency local-first caching with optimistic updates,
 * background cloud synchronization via PostgreSQL, and CRDT-style conflict resolution.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import type {
  UserNote,
  CodeBookmark,
  NoteContentType,
  QAEntry,
  CodeNoteData,
  LessonNoteBlock,
  TextNoteBlock,
  QABlock,
  CodeBlock,
  NoteBlockType,
} from "@/types/notes-bookmarks";

const NOTES_STORAGE_KEY = "learncraft_notes_v1";
const BOOKMARKS_STORAGE_KEY = "learncraft_bookmarks_v1";

// ─── Event Dispatchers ────────────────────────────────────────────────────────

function dispatchNotesUpdate(notes: UserNote[]) {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(
      new CustomEvent("learncraft-notes-updated", { detail: notes })
    );
  } catch {}
}

function dispatchBookmarksUpdate(bookmarks: CodeBookmark[]) {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(
      new CustomEvent("learncraft-bookmarks-updated", { detail: bookmarks })
    );
  } catch {}
}

// ─── Local Storage Primitives ────────────────────────────────────────────────

/**
 * Bridges/imports any legacy annotations or highlights from revision-storage
 * so that existing notes or study highlights automatically appear in the
 * unified study notes notebook.
 */
export function syncLegacyAnnotationsIntoNotes(currentNotes: UserNote[]): {
  merged: UserNote[];
  hasChanges: boolean;
} {
  if (typeof window === "undefined") {
    return { merged: currentNotes, hasChanges: false };
  }

  try {
    const rawRevisions = localStorage.getItem("learncraft_revisions_v1");
    if (!rawRevisions) return { merged: currentNotes, hasChanges: false };

    const revisions = JSON.parse(rawRevisions);
    if (!Array.isArray(revisions) || revisions.length === 0) {
      return { merged: currentNotes, hasChanges: false };
    }

    const existingIds = new Set(currentNotes.map((n) => n.id));
    const newImported: UserNote[] = [];

    for (const item of revisions) {
      if (!item || !item.id || existingIds.has(item.id)) continue;

      let content = "";
      if (item.note && typeof item.note === "string" && item.note.trim()) {
        content = item.note.trim();
        if (item.selectedText && typeof item.selectedText === "string" && item.selectedText.trim()) {
          content += `\n\n> "${item.selectedText.trim()}"`;
        }
      } else if (item.selectedText && typeof item.selectedText === "string" && item.selectedText.trim()) {
        content = `> "${item.selectedText.trim()}"`;
      }

      if (content) {
        newImported.push({
          id: item.id,
          trackKey: item.topicId || "general",
          lessonSlug: item.lessonId || "lesson",
          lessonPath: item.lessonPath,
          sectionId: item.sectionId,
          title: item.question || item.lessonTitle || "Study Note",
          content,
          createdAt: item.createdAt ? new Date(item.createdAt).getTime() : Date.now(),
          updatedAt: item.updatedAt ? new Date(item.updatedAt).getTime() : Date.now(),
        });
        existingIds.add(item.id);
      }
    }

    if (newImported.length > 0) {
      const merged = [...currentNotes, ...newImported];
      return { merged, hasChanges: true };
    }
  } catch (err) {
    console.warn("[NotesBookmarks] Legacy annotations bridge notice:", err);
  }

  return { merged: currentNotes, hasChanges: false };
}

// ─── Note Serialization & Normalization ──────────────────────────────────────

export function serializeQAEntriesToMarkdown(entries: QAEntry[]): string {
  if (!entries || entries.length === 0) return "";
  return entries
    .map((e, idx) => {
      let block = `### ❓ Q${entries.length > 1 ? idx + 1 : ""}: ${e.question.trim()}\n> **Answer:** ${e.answer.trim()}`;
      if (e.explanation && e.explanation.trim()) {
        block += `\n\n> 💡 **Explanation:** ${e.explanation.trim()}`;
      }
      return block;
    })
    .join("\n\n---\n\n");
}

export function serializeCodeNoteToMarkdown(codeData: CodeNoteData): string {
  if (!codeData) return "";
  let out = "";
  if (codeData.title && codeData.title.trim()) {
    out += `### 💻 ${codeData.title.trim()}\n\n`;
  }
  const lang = codeData.language || "typescript";
  const code = codeData.code || "";
  out += `\`\`\`${lang}\n${code}\n\`\`\``;
  if (codeData.explanation && codeData.explanation.trim()) {
    out += `\n\n> 💡 **Notes:** ${codeData.explanation.trim()}`;
  }
  return out;
}

/**
 * Serializes an ordered list of mixed notebook blocks into human-readable Markdown.
 * Guarantees backward compatibility with legacy full-text search, reading views, and previews.
 */
export function serializeNotebookToMarkdown(blocks: LessonNoteBlock[]): string {
  if (!blocks || blocks.length === 0) return "";
  const parts: string[] = [];

  for (const block of blocks) {
    if (!block) continue;
    if (block.type === "text") {
      const text = block.content?.trim();
      if (text) parts.push(text);
    } else if (block.type === "qa") {
      const q = block.question?.trim() || "";
      const a = block.answer?.trim() || "";
      let qaText = `### ❓ Q: ${q}\n> **Answer:** ${a}`;
      if (block.explanation && block.explanation.trim()) {
        qaText += `\n\n> 💡 **Explanation:** ${block.explanation.trim()}`;
      }
      if (q || a) parts.push(qaText);
    } else if (block.type === "code") {
      const lang = block.language || "typescript";
      const code = block.code || "";
      let codeText = "";
      if (block.title && block.title.trim()) {
        codeText += `### 💻 ${block.title.trim()}\n\n`;
      }
      codeText += `\`\`\`${lang}\n${code}\n\`\`\``;
      if (block.explanation && block.explanation.trim()) {
        codeText += `\n\n> 💡 **Notes:** ${block.explanation.trim()}`;
      }
      if (code.trim() || block.title?.trim()) parts.push(codeText);
    }
  }

  return parts.join("\n\n---\n\n");
}

/**
 * Creates default blocks with unique IDs and timestamps
 */
export function createDefaultTextBlock(content: string = "", order: number = 0): TextNoteBlock {
  const now = Date.now();
  return {
    id: `blk_text_${now}_${Math.random().toString(36).slice(2, 7)}`,
    type: "text",
    order,
    content,
    createdAt: now,
    updatedAt: now,
  };
}

export function createDefaultQABlock(
  question: string = "",
  answer: string = "",
  explanation?: string,
  order: number = 0
): QABlock {
  const now = Date.now();
  return {
    id: `blk_qa_${now}_${Math.random().toString(36).slice(2, 7)}`,
    type: "qa",
    order,
    question,
    answer,
    explanation,
    createdAt: now,
    updatedAt: now,
  };
}

export function createDefaultCodeBlock(
  code: string = "",
  language: string = "typescript",
  title?: string,
  explanation?: string,
  order: number = 0
): CodeBlock {
  const now = Date.now();
  return {
    id: `blk_code_${now}_${Math.random().toString(36).slice(2, 7)}`,
    type: "code",
    order,
    title,
    language,
    code,
    explanation,
    createdAt: now,
    updatedAt: now,
  };
}

export function reorderNotebookBlocks(
  blocks: LessonNoteBlock[],
  fromIndex: number,
  toIndex: number
): LessonNoteBlock[] {
  if (fromIndex < 0 || fromIndex >= blocks.length || toIndex < 0 || toIndex >= blocks.length) {
    return blocks;
  }
  const result = [...blocks];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result.map((b, idx) => ({ ...b, order: idx }));
}

export function normalizeUserNote(raw: any): UserNote {
  if (!raw || typeof raw !== "object") {
    return {
      id: `note_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      trackKey: "general",
      lessonSlug: "lesson",
      content: "",
      blocks: [],
      noteType: "text",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  }

  const id = String(raw.id || `note_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`);
  const trackKey = String(raw.trackKey || "general");
  const lessonSlug = String(raw.lessonSlug || "lesson");
  const content = typeof raw.content === "string" ? raw.content : "";
  const createdAt = Number(raw.createdAt) || Date.now();
  const updatedAt = Number(raw.updatedAt) || createdAt;

  let noteType: NoteContentType = "text";
  if (raw.noteType === "qa" || raw.noteType === "code" || raw.noteType === "text") {
    noteType = raw.noteType;
  }

  const normalized: UserNote = {
    id,
    trackKey,
    lessonSlug,
    lessonPath: raw.lessonPath ? String(raw.lessonPath) : undefined,
    sectionId: raw.sectionId ? String(raw.sectionId) : undefined,
    title: raw.title ? String(raw.title) : undefined,
    content,
    noteType,
    textDraft: typeof raw.textDraft === "string" ? raw.textDraft : undefined,
    createdAt,
    updatedAt,
  };

  // 1. If blocks already exist, normalize each block
  if (Array.isArray(raw.blocks) && raw.blocks.length > 0) {
    const blocks: LessonNoteBlock[] = raw.blocks.map((b: any, index: number) => {
      const bId = String(b.id || `blk_${Date.now()}_${index}`);
      const bType: NoteBlockType = (b.type === "qa" || b.type === "code") ? b.type : "text";
      const bOrder = typeof b.order === "number" ? b.order : index;
      const bCreatedAt = Number(b.createdAt) || createdAt;
      const bUpdatedAt = Number(b.updatedAt) || updatedAt;

      if (bType === "qa") {
        return {
          id: bId,
          type: "qa",
          order: bOrder,
          question: String(b.question || ""),
          answer: String(b.answer || ""),
          explanation: b.explanation ? String(b.explanation) : undefined,
          createdAt: bCreatedAt,
          updatedAt: bUpdatedAt,
        };
      }
      if (bType === "code") {
        return {
          id: bId,
          type: "code",
          order: bOrder,
          title: b.title ? String(b.title) : undefined,
          language: String(b.language || "typescript"),
          code: String(b.code || ""),
          explanation: b.explanation ? String(b.explanation) : undefined,
          createdAt: bCreatedAt,
          updatedAt: bUpdatedAt,
        };
      }
      return {
        id: bId,
        type: "text",
        order: bOrder,
        content: String(b.content || ""),
        createdAt: bCreatedAt,
        updatedAt: bUpdatedAt,
      };
    });

    blocks.sort((a, b) => a.order - b.order);
    if (blocks.length === 1 && blocks[0].type === "text" && content && content !== blocks[0].content) {
      blocks[0].content = content;
    }
    normalized.blocks = blocks;
    normalized.content = content || serializeNotebookToMarkdown(blocks);
  } else {
    // 2. Deterministic, idempotent legacy migration:
    const migratedBlocks: LessonNoteBlock[] = [];
    let orderCounter = 0;

    // A. Check for legacy text content (or textDraft)
    const rawText = (typeof raw.textDraft === "string" && raw.textDraft.trim())
      ? raw.textDraft.trim()
      : (typeof raw.content === "string" && raw.noteType !== "qa" && raw.noteType !== "code" && raw.content.trim())
        ? raw.content.trim()
        : "";

    if (rawText) {
      migratedBlocks.push({
        id: `blk_text_migrated_${id}_0`,
        type: "text",
        order: orderCounter++,
        content: rawText,
        createdAt,
        updatedAt,
      });
    }

    // B. Check for legacy Q&A entries
    if (Array.isArray(raw.qaEntries) && raw.qaEntries.length > 0) {
      raw.qaEntries.forEach((e: any, idx: number) => {
        if (e && (e.question || e.answer)) {
          migratedBlocks.push({
            id: String(e.id || `blk_qa_migrated_${id}_${idx}`),
            type: "qa",
            order: orderCounter++,
            question: String(e.question || ""),
            answer: String(e.answer || ""),
            explanation: e.explanation ? String(e.explanation) : undefined,
            createdAt,
            updatedAt,
          });
        }
      });
    }

    // C. Check for legacy Code data
    if (raw.codeData && typeof raw.codeData === "object" && (raw.codeData.code || raw.codeData.title)) {
      migratedBlocks.push({
        id: `blk_code_migrated_${id}_0`,
        type: "code",
        order: orderCounter++,
        title: raw.codeData.title ? String(raw.codeData.title) : undefined,
        language: String(raw.codeData.language || "typescript"),
        code: String(raw.codeData.code || ""),
        explanation: raw.codeData.explanation ? String(raw.codeData.explanation) : undefined,
        createdAt,
        updatedAt,
      });
    }

    // D. If raw has content that wasn't captured yet (e.g. legacy plain text with noteType not specified)
    if (migratedBlocks.length === 0 && content.trim()) {
      migratedBlocks.push({
        id: `blk_text_migrated_${id}_0`,
        type: "text",
        order: orderCounter++,
        content: content.trim(),
        createdAt,
        updatedAt,
      });
    }

    normalized.blocks = migratedBlocks;
    if (migratedBlocks.length > 0) {
      normalized.content = serializeNotebookToMarkdown(migratedBlocks);
    }
  }

  // Preserve legacy fields for backward compatibility
  if (raw.qaEntries && Array.isArray(raw.qaEntries)) {
    normalized.qaEntries = raw.qaEntries;
  }
  if (raw.codeData && typeof raw.codeData === "object") {
    normalized.codeData = raw.codeData;
  }

  return normalized;
}

export function getLocalNotes(): UserNote[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    let parsed: UserNote[] = [];
    if (raw) {
      const data = JSON.parse(raw);
      const list = Array.isArray(data) ? data : Object.values(data);
      parsed = list.map(normalizeUserNote);
    }

    const { merged, hasChanges } = syncLegacyAnnotationsIntoNotes(parsed);
    const normalizedMerged = merged.map(normalizeUserNote);
    if (hasChanges) {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(normalizedMerged));
    }
    return normalizedMerged;
  } catch {
    return [];
  }
}

export function saveLocalNotes(notes: UserNote[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    dispatchNotesUpdate(notes);
  } catch {}
}

export function getLocalBookmarks(): CodeBookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : Object.values(parsed);
  } catch {
    return [];
  }
}

export function saveLocalBookmarks(bookmarks: CodeBookmark[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
    dispatchBookmarksUpdate(bookmarks);
  } catch {}
}

// ─── Notes Helpers ────────────────────────────────────────────────────────────

export function getNoteForLesson(
  trackKey: string,
  lessonSlug: string,
  sectionId?: string
): UserNote | null {
  const notes = getLocalNotes();
  const found = notes.find(
    (n) =>
      n.trackKey === trackKey &&
      n.lessonSlug === lessonSlug &&
      (sectionId ? n.sectionId === sectionId : true)
  );
  return found || null;
}

export function getNotesForLesson(
  trackKey: string,
  lessonSlug: string
): UserNote[] {
  const notes = getLocalNotes();
  return notes.filter(
    (n) => n.trackKey === trackKey && n.lessonSlug === lessonSlug
  );
}

export function upsertNote(
  noteInput: Omit<UserNote, "id" | "createdAt" | "updatedAt"> & {
    id?: string;
    createdAt?: number;
    updatedAt?: number;
  }
): UserNote {
  const notes = getLocalNotes();
  const now = Date.now();
  const id =
    noteInput.id ||
    `note_${noteInput.trackKey}_${noteInput.lessonSlug}_${noteInput.sectionId || "general"}_${Math.random()
      .toString(36)
      .substring(2, 9)}`;

  const existingIndex = notes.findIndex((n) => n.id === id);
  let updatedNote: UserNote;

  // Derive effective content from unified notebook blocks or structured type
  if (noteInput.noteType === "code" && noteInput.codeData) {
    if (Array.isArray(noteInput.blocks) && !noteInput.blocks.some((b) => b.type === "code")) {
      noteInput.blocks = [
        ...noteInput.blocks,
        createDefaultCodeBlock(
          noteInput.codeData.code,
          noteInput.codeData.language,
          noteInput.codeData.title,
          noteInput.codeData.explanation,
          noteInput.blocks.length
        ),
      ];
    }
  }

  let effectiveContent = noteInput.content || "";
  if (Array.isArray(noteInput.blocks) && noteInput.blocks.length > 0) {
    effectiveContent = serializeNotebookToMarkdown(noteInput.blocks);
  } else if (noteInput.noteType === "qa" && Array.isArray(noteInput.qaEntries) && noteInput.qaEntries.length > 0) {
    effectiveContent = serializeQAEntriesToMarkdown(noteInput.qaEntries);
  } else if (noteInput.noteType === "code" && noteInput.codeData) {
    effectiveContent = serializeCodeNoteToMarkdown(noteInput.codeData);
  }

  if (existingIndex >= 0) {
    let resolvedBlocks = noteInput.blocks;
    if (!resolvedBlocks) {
      if (noteInput.noteType === "code" && noteInput.codeData) {
        resolvedBlocks = [
          createDefaultCodeBlock(
            noteInput.codeData.code,
            noteInput.codeData.language,
            noteInput.codeData.title,
            noteInput.codeData.explanation
          ),
        ];
      } else if (noteInput.noteType === "qa" && Array.isArray(noteInput.qaEntries) && noteInput.qaEntries.length > 0) {
        resolvedBlocks = noteInput.qaEntries.map((e, idx) => ({
          id: e.id,
          type: "qa" as const,
          order: idx,
          question: e.question,
          answer: e.answer,
          explanation: e.explanation,
          createdAt: now,
          updatedAt: now,
        }));
      } else if (noteInput.content && (!noteInput.noteType || noteInput.noteType === "text")) {
        resolvedBlocks = [createDefaultTextBlock(noteInput.content, 0)];
      } else {
        resolvedBlocks = notes[existingIndex].blocks;
      }
    }

    updatedNote = normalizeUserNote({
      ...notes[existingIndex],
      ...noteInput,
      blocks: resolvedBlocks,
      content: effectiveContent,
      id,
      updatedAt: now,
    });
    notes[existingIndex] = updatedNote;
  } else {
    updatedNote = normalizeUserNote({
      ...noteInput,
      content: effectiveContent,
      id,
      createdAt: noteInput.createdAt || now,
      updatedAt: now,
    });
    notes.unshift(updatedNote);
  }

  saveLocalNotes(notes);

  // Sync to revision storage if matching record exists
  try {
    if (typeof window !== "undefined") {
      const rawRevisions = localStorage.getItem("learncraft_revisions_v1");
      if (rawRevisions) {
        const revisions = JSON.parse(rawRevisions);
        if (Array.isArray(revisions)) {
          let revChanged = false;
          const updatedRev = revisions.map((r: any) => {
            if (r.id === id) {
              revChanged = true;
              return {
                ...r,
                note: updatedNote.content,
                question: updatedNote.title || r.question,
                updatedAt: new Date(now).toISOString(),
              };
            }
            return r;
          });
          if (revChanged) {
            localStorage.setItem("learncraft_revisions_v1", JSON.stringify(updatedRev));
            window.dispatchEvent(new CustomEvent("learncraft:revision-sync"));
          }
        }
      }
    }
  } catch {}

  // Background cloud push (fire-and-forget with error swallowing)
  pushNoteToCloud(updatedNote).catch(() => {});

  return updatedNote;
}

export function deleteNote(id: string): void {
  const notes = getLocalNotes();
  const filtered = notes.filter((n) => n.id !== id);
  saveLocalNotes(filtered);

  // Also remove from revision storage if present
  try {
    if (typeof window !== "undefined") {
      const rawRevisions = localStorage.getItem("learncraft_revisions_v1");
      if (rawRevisions) {
        const revisions = JSON.parse(rawRevisions);
        if (Array.isArray(revisions)) {
          const remaining = revisions.filter((r: any) => r.id !== id);
          if (remaining.length !== revisions.length) {
            localStorage.setItem("learncraft_revisions_v1", JSON.stringify(remaining));
            window.dispatchEvent(new CustomEvent("learncraft:revision-sync"));
          }
        }
      }
    }
  } catch {}

  // Background server deletion
  fetch(`/api/notes?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  }).catch(() => {});
}

// ─── Bookmarks Helpers ────────────────────────────────────────────────────────

export function isCodeBookmarked(
  trackKey: string,
  lessonSlug: string,
  code: string
): boolean {
  const bookmarks = getLocalBookmarks();
  const cleanCode = code.trim();
  return bookmarks.some(
    (b) =>
      b.trackKey === trackKey &&
      b.lessonSlug === lessonSlug &&
      b.code.trim() === cleanCode
  );
}

export function addBookmark(
  bookmarkInput: Omit<CodeBookmark, "id" | "createdAt"> & {
    id?: string;
    createdAt?: number;
  }
): CodeBookmark {
  const bookmarks = getLocalBookmarks();
  const now = Date.now();
  const id =
    bookmarkInput.id ||
    `bm_${bookmarkInput.trackKey}_${bookmarkInput.lessonSlug}_${Math.random()
      .toString(36)
      .substring(2, 9)}`;

  const newBookmark: CodeBookmark = {
    ...bookmarkInput,
    id,
    createdAt: bookmarkInput.createdAt || now,
  };

  const existingIndex = bookmarks.findIndex((b) => b.id === id);
  if (existingIndex >= 0) {
    bookmarks[existingIndex] = newBookmark;
  } else {
    bookmarks.unshift(newBookmark);
  }

  saveLocalBookmarks(bookmarks);

  // Background cloud push
  pushBookmarkToCloud(newBookmark).catch(() => {});

  return newBookmark;
}

export function deleteBookmark(id: string): void {
  const bookmarks = getLocalBookmarks();
  const filtered = bookmarks.filter((b) => b.id !== id);
  saveLocalBookmarks(filtered);

  fetch(`/api/bookmarks?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  }).catch(() => {});
}

export function toggleBookmark(
  trackKey: string,
  lessonSlug: string,
  title: string,
  code: string,
  language?: string,
  sectionId?: string
): boolean {
  const bookmarks = getLocalBookmarks();
  const cleanCode = code.trim();
  const existing = bookmarks.find(
    (b) =>
      b.trackKey === trackKey &&
      b.lessonSlug === lessonSlug &&
      b.code.trim() === cleanCode
  );

  if (existing) {
    deleteBookmark(existing.id);
    return false;
  } else {
    addBookmark({
      trackKey,
      lessonSlug,
      title,
      code,
      language: language || "typescript",
      sectionId,
    });
    return true;
  }
}

// ─── CRDT Conflict Resolution ────────────────────────────────────────────────

/**
 * Merges local and remote notes using Latest-Write-Wins (LWW) per note ID.
 */
export function mergeNotesStates(
  localNotes: UserNote[],
  remoteNotes: UserNote[]
): UserNote[] {
  const noteMap = new Map<string, UserNote>();

  for (const n of localNotes) {
    noteMap.set(n.id, n);
  }

  for (const remote of remoteNotes) {
    const existing = noteMap.get(remote.id);
    if (!existing) {
      noteMap.set(remote.id, remote);
    } else {
      // Latest-Write-Wins
      if ((remote.updatedAt || 0) >= (existing.updatedAt || 0)) {
        noteMap.set(remote.id, remote);
      }
    }
  }

  return Array.from(noteMap.values()).sort(
    (a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)
  );
}

/**
 * Merges local and remote bookmarks by union of IDs.
 */
export function mergeBookmarksStates(
  localBookmarks: CodeBookmark[],
  remoteBookmarks: CodeBookmark[]
): CodeBookmark[] {
  const bmMap = new Map<string, CodeBookmark>();

  for (const b of localBookmarks) {
    bmMap.set(b.id, b);
  }

  for (const remote of remoteBookmarks) {
    if (!bmMap.has(remote.id)) {
      bmMap.set(remote.id, remote);
    }
  }

  return Array.from(bmMap.values()).sort(
    (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
  );
}

// ─── Cloud Sync Layer ────────────────────────────────────────────────────────

async function pushNoteToCloud(note: UserNote): Promise<void> {
  try {
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note }),
    });
  } catch {}
}

async function pushBookmarkToCloud(bookmark: CodeBookmark): Promise<void> {
  try {
    await fetch("/api/bookmarks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookmark }),
    });
  } catch {}
}

export async function syncNotesWithCloud(): Promise<UserNote[]> {
  try {
    const res = await fetch("/api/notes", { method: "GET" });
    if (!res.ok) return getLocalNotes();

    const data = await res.json();
    if (data.success && Array.isArray(data.notes)) {
      const merged = mergeNotesStates(getLocalNotes(), data.notes);
      saveLocalNotes(merged);

      // Re-push merged state to ensure cloud is up to date
      fetch("/api/notes/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: merged }),
      }).catch(() => {});

      return merged;
    }
  } catch {}
  return getLocalNotes();
}

export async function syncBookmarksWithCloud(): Promise<CodeBookmark[]> {
  try {
    const res = await fetch("/api/bookmarks", { method: "GET" });
    if (!res.ok) return getLocalBookmarks();

    const data = await res.json();
    if (data.success && Array.isArray(data.bookmarks)) {
      const merged = mergeBookmarksStates(getLocalBookmarks(), data.bookmarks);
      saveLocalBookmarks(merged);

      fetch("/api/bookmarks/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookmarks: merged }),
      }).catch(() => {});

      return merged;
    }
  } catch {}
  return getLocalBookmarks();
}
