/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * LOCAL-FIRST NOTES & BOOKMARKS ENGINE — LearnCraft
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Implements 0ms-latency local-first caching with optimistic updates,
 * background cloud synchronization via PostgreSQL, and CRDT-style conflict resolution.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import type { UserNote, CodeBookmark } from "@/types/notes-bookmarks";

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

export function getLocalNotes(): UserNote[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : Object.values(parsed);
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

  if (existingIndex >= 0) {
    updatedNote = {
      ...notes[existingIndex],
      ...noteInput,
      id,
      updatedAt: now,
    };
    notes[existingIndex] = updatedNote;
  } else {
    updatedNote = {
      ...noteInput,
      id,
      createdAt: noteInput.createdAt || now,
      updatedAt: now,
    };
    notes.unshift(updatedNote);
  }

  saveLocalNotes(notes);

  // Background cloud push (fire-and-forget with error swallowing)
  pushNoteToCloud(updatedNote).catch(() => {});

  return updatedNote;
}

export function deleteNote(id: string): void {
  const notes = getLocalNotes();
  const filtered = notes.filter((n) => n.id !== id);
  saveLocalNotes(filtered);

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
