"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  getNoteForLesson,
  upsertNote,
  deleteNote,
  getLocalBookmarks,
  deleteBookmark,
  syncNotesWithCloud,
  syncBookmarksWithCloud,
} from "@/lib/notes-bookmarks";
import type { CodeBookmark } from "@/types/notes-bookmarks";

interface LessonNotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  trackKey: string;
  trackTitle: string;
  lessonSlug: string;
  lessonTitle: string;
  activeSectionId?: string;
  activeSectionLabel?: string;
}

export function LessonNotesDrawer({
  isOpen,
  onClose,
  trackKey,
  trackTitle,
  lessonSlug,
  lessonTitle,
  activeSectionId,
  activeSectionLabel,
}: LessonNotesDrawerProps) {
  const [activeTab, setActiveTab] = useState<"notes" | "bookmarks">("notes");
  const [content, setContent] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<CodeBookmark[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load note and bookmarks on open or lesson change
  useEffect(() => {
    if (!isOpen) return;

    const existingNote = getNoteForLesson(trackKey, lessonSlug);
    if (existingNote) {
      setContent(existingNote.content);
      setCurrentNoteId(existingNote.id);
    } else {
      setContent("");
      setCurrentNoteId(null);
    }
    setSaveStatus("saved");

    const allBm = getLocalBookmarks().filter(
      (b) => b.trackKey === trackKey && b.lessonSlug === lessonSlug
    );
    setBookmarks(allBm);

    // Initial background cloud sync
    syncNotesWithCloud();
    syncBookmarksWithCloud();
  }, [isOpen, trackKey, lessonSlug]);

  // Listen for bookmark updates
  useEffect(() => {
    const handleBmUpdate = () => {
      const allBm = getLocalBookmarks().filter(
        (b) => b.trackKey === trackKey && b.lessonSlug === lessonSlug
      );
      setBookmarks(allBm);
    };

    window.addEventListener("learncraft-bookmarks-updated", handleBmUpdate);
    return () => {
      window.removeEventListener("learncraft-bookmarks-updated", handleBmUpdate);
    };
  }, [trackKey, lessonSlug]);

  // Auto-save logic
  const handleContentChange = (newText: string) => {
    setContent(newText);
    setSaveStatus("saving");

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (newText.trim().length > 0) {
        const saved = upsertNote({
          id: currentNoteId || undefined,
          trackKey,
          lessonSlug,
          sectionId: activeSectionId,
          title: `Notes: ${lessonTitle}`,
          content: newText,
        });
        setCurrentNoteId(saved.id);
      } else if (currentNoteId) {
        deleteNote(currentNoteId);
        setCurrentNoteId(null);
      }
      setSaveStatus("saved");
    }, 500);
  };

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyCode = async (bmId: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(bmId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  const handleDeleteBookmark = (bmId: string) => {
    deleteBookmark(bmId);
    setBookmarks((prev) => prev.filter((b) => b.id !== bmId));
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-Over Drawer */}
      <div className="relative w-full max-w-xl bg-[#090C14] border-l border-white/[0.1] shadow-2xl flex flex-col h-full z-10 text-slate-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between gap-3 bg-[#0E121B]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                {trackTitle}
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-xs text-slate-400 font-mono truncate max-w-[200px]">
                {lessonSlug}
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5 truncate max-w-sm">
              {lessonTitle}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/notes"
              target="_blank"
              title="Open Full Notes Hub"
              className="p-2 rounded-xl text-xs font-bold bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <span>📂</span>
              <span className="hidden sm:inline">All Notes</span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 pt-3 pb-2 border-b border-white/[0.06] flex items-center justify-between bg-[#0B0F19]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("notes")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "notes"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              📝 Lesson Notes
            </button>
            <button
              onClick={() => setActiveTab("bookmarks")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "bookmarks"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <span>⭐ Bookmarks</span>
              {bookmarks.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono">
                  {bookmarks.length}
                </span>
              )}
            </button>
          </div>

          {activeTab === "notes" && (
            <div className="text-[11px] font-mono flex items-center gap-1.5">
              {saveStatus === "saving" ? (
                <span className="text-amber-400 animate-pulse">✍️ Saving...</span>
              ) : (
                <span className="text-emerald-400 flex items-center gap-1">
                  <span>✓</span> Saved
                </span>
              )}
            </div>
          )}
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === "notes" ? (
            <div className="space-y-3 h-full flex flex-col">
              {activeSectionLabel && (
                <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-slate-400 flex items-center justify-between">
                  <span>Active Section:</span>
                  <span className="text-purple-300 font-mono font-medium">
                    {activeSectionLabel}
                  </span>
                </div>
              )}

              <textarea
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Type private notes, architecture summaries, or interview cheat-sheets here... (Auto-saved in real-time)"
                className="flex-1 w-full min-h-[350px] p-4 rounded-2xl bg-[#06080F] border border-white/[0.08] focus:border-purple-500 focus:outline-none text-sm font-sans leading-relaxed text-slate-200 placeholder:text-slate-600 resize-none transition-colors"
              />

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
                <span>{wordCount} words · {content.length} characters</span>
                <span>Supports Markdown formatting</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {bookmarks.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <span className="text-3xl block">⭐</span>
                  <h4 className="text-sm font-bold text-white">No Bookmarks Saved Yet</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                    Click the ⭐ Bookmark button next to any code snippet or playground sandbox in this lesson to save it here for fast revision.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookmarks.map((bm) => (
                    <div
                      key={bm.id}
                      className="p-4 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-2 hover:border-purple-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white truncate">
                          {bm.title}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopyCode(bm.id, bm.code)}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 transition-colors cursor-pointer"
                          >
                            {copiedId === bm.id ? "✓ Copied" : "Copy"}
                          </button>
                          <button
                            onClick={() => handleDeleteBookmark(bm.id)}
                            className="px-2 py-0.5 rounded text-[10px] font-mono text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <pre className="p-3 rounded-xl bg-black/60 border border-white/[0.05] text-xs font-mono text-purple-200 overflow-x-auto max-h-48 leading-relaxed">
                        {bm.code}
                      </pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-[#0E121B] flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono">Press Esc to close</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-md cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
