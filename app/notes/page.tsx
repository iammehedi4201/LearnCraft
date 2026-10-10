"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { InteractiveGrid } from "@/components/interactive-grid";
import {
  getLocalNotes,
  upsertNote,
  deleteNote,
  getLocalBookmarks,
  deleteBookmark,
  syncNotesWithCloud,
  syncBookmarksWithCloud,
} from "@/lib/notes-bookmarks";
import type { UserNote, CodeBookmark } from "@/types/notes-bookmarks";
import { MarkdownRenderer } from "@/components/revision/MarkdownRenderer";

const BASE_TRACKS = [
  { key: "all", label: "All Tracks" },
  { key: "react", label: "React" },
  { key: "nodejs", label: "Node.js" },
  { key: "typescript", label: "TypeScript" },
  { key: "nestjs", label: "NestJS" },
  { key: "nextjs", label: "Next.js" },
  { key: "tanstack", label: "TanStack Query" },
  { key: "postgresql", label: "PostgreSQL" },
  { key: "prisma", label: "Prisma" },
  { key: "redux", label: "Redux" },
  { key: "mongodb", label: "MongoDB" },
  { key: "system-design", label: "System Design" },
  { key: "oop", label: "OOP" },
  { key: "express", label: "Express" },
  { key: "javascript", label: "JavaScript" },
];

export default function NotesPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState<"notes" | "bookmarks">("notes");
  const [selectedTrack, setSelectedTrack] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [bookmarks, setBookmarks] = useState<CodeBookmark[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Edit note dialog state
  const [editingNote, setEditingNote] = useState<UserNote | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");

  useEffect(() => {
    // Initial local read (automatically bridges any legacy annotations from learncraft_revisions_v1)
    setNotes(getLocalNotes());
    setBookmarks(getLocalBookmarks());

    // Cloud reconciliation if session exists
    syncNotesWithCloud().then(setNotes);
    syncBookmarksWithCloud().then(setBookmarks);

    const handleNotesUpdate = () => setNotes(getLocalNotes());
    const handleBmUpdate = () => setBookmarks(getLocalBookmarks());
    const handleRevSync = () => setNotes(getLocalNotes());

    window.addEventListener("learncraft-notes-updated", handleNotesUpdate);
    window.addEventListener("learncraft-bookmarks-updated", handleBmUpdate);
    window.addEventListener("learncraft:revision-sync", handleRevSync);

    return () => {
      window.removeEventListener("learncraft-notes-updated", handleNotesUpdate);
      window.removeEventListener("learncraft-bookmarks-updated", handleBmUpdate);
      window.removeEventListener("learncraft:revision-sync", handleRevSync);
    };
  }, []);

  const handleDeleteNote = (id: string) => {
    if (confirm("Are you sure you want to delete this study note?")) {
      deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    }
  };

  const handleDeleteBookmark = (id: string) => {
    if (confirm("Are you sure you want to remove this bookmark?")) {
      deleteBookmark(id);
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const handleCopyText = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  const handleOpenEdit = (note: UserNote) => {
    setEditingNote(note);
    setEditTitle(note.title || "");
    setEditContent(note.content);
  };

  const handleSaveEdit = () => {
    if (!editingNote) return;
    const updated = upsertNote({
      ...editingNote,
      title: editTitle.trim(),
      content: editContent.trim(),
    });
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
    setEditingNote(null);
  };

  // Dynamic track filter pills
  const availableTracks = useMemo(() => {
    const existingKeys = new Set(BASE_TRACKS.map((t) => t.key.toLowerCase()));
    const dynamicTracks = [...BASE_TRACKS];

    notes.forEach((n) => {
      const key = (n.trackKey || "").toLowerCase();
      if (key && !existingKeys.has(key)) {
        existingKeys.add(key);
        dynamicTracks.push({
          key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
        });
      }
    });

    return dynamicTracks;
  }, [notes]);

  // Filter notes
  const filteredNotes = notes.filter((n) => {
    const noteTrack = (n.trackKey || "").toLowerCase();
    const matchesTrack = selectedTrack === "all" || noteTrack === selectedTrack.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      query === "" ||
      (n.content && n.content.toLowerCase().includes(query)) ||
      (n.lessonSlug && n.lessonSlug.toLowerCase().includes(query)) ||
      (n.title && n.title.toLowerCase().includes(query));
    return matchesTrack && matchesQuery;
  });

  // Filter bookmarks
  const filteredBookmarks = bookmarks.filter((b) => {
    const bmTrack = (b.trackKey || "").toLowerCase();
    const matchesTrack = selectedTrack === "all" || bmTrack === selectedTrack.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      query === "" ||
      (b.title && b.title.toLowerCase().includes(query)) ||
      (b.code && b.code.toLowerCase().includes(query)) ||
      (b.lessonSlug && b.lessonSlug.toLowerCase().includes(query));
    return matchesTrack && matchesQuery;
  });

  return (
    <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-200 relative selection:bg-purple-500/30 selection:text-white">
      <Nav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 space-y-8">
        {/* Hero Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Developer Knowledge Hub
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Study Notes & Code Bookmarks
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Your centralized interview revision notebook. All your personal notes, architectural principles, highlights, and bookmarked code patterns across all learning tracks.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-xl border border-purple-500/20 font-bold">
              📝 {notes.length} Study Notes
            </span>
            <span className="text-xs font-mono text-amber-300 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20 font-bold">
              ⭐ {bookmarks.length} Bookmarks
            </span>
          </div>
        </div>

        {/* Search & Track Filters */}
        <div className="p-6 rounded-3xl bg-[#0E121B] border border-white/[0.08] space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, highlights, concepts, code snippets..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#07090E] border border-white/[0.08] focus:border-purple-500 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none transition-colors"
              />
              <span className="absolute left-3.5 top-3 text-slate-500 text-sm">
                🔍
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("notes")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "notes"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : "bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]"
                }`}
              >
                📝 Notes ({filteredNotes.length})
              </button>
              <button
                onClick={() => setActiveTab("bookmarks")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "bookmarks"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : "bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]"
                }`}
              >
                ⭐ Bookmarks ({filteredBookmarks.length})
              </button>
            </div>
          </div>

          {/* Track Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {availableTracks.map((t) => (
              <button
                key={t.key}
                onClick={() => setSelectedTrack(t.key)}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono transition-all whitespace-nowrap cursor-pointer ${
                  selectedTrack.toLowerCase() === t.key.toLowerCase()
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold"
                    : "bg-white/[0.02] text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] border border-white/[0.05]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Display */}
        {activeTab === "notes" ? (
          <div className="space-y-4">
            {filteredNotes.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-[#0E121B] border border-white/[0.08] space-y-3">
                <span className="text-4xl block">📝</span>
                <h3 className="text-base font-bold text-white">No Study Notes Found</h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                  {searchQuery || selectedTrack !== "all"
                    ? "No notes matched your current search filters. Try clearing your filters or search query."
                    : "You haven't written any notes yet! Open any lesson across React, Node.js, TypeScript, etc., and click 'Take Notes' or press Ctrl+J to write your study notes."}
                </p>
                <div className="pt-2">
                  <Link
                    href="/learn/react"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    Browse Lessons
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredNotes.map((note) => {
                  const lessonHref =
                    note.lessonPath ||
                    (note.lessonSlug?.startsWith("/")
                      ? note.lessonSlug
                      : `/learn/${note.trackKey}/${note.lessonSlug}`);

                  return (
                    <div
                      key={note.id}
                      className="p-5 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-3 flex flex-col justify-between hover:border-purple-500/40 transition-all shadow-md group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono uppercase font-bold text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
                              {note.trackKey}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {new Date(note.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleCopyText(note.id, note.content)}
                              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/[0.06] text-xs transition-colors cursor-pointer"
                              title="Copy Note Text"
                            >
                              {copiedId === note.id ? "✓" : "📋"}
                            </button>
                            <button
                              onClick={() => handleOpenEdit(note)}
                              className="p-1 rounded text-slate-400 hover:text-purple-300 hover:bg-white/[0.06] text-xs transition-colors cursor-pointer"
                              title="Edit Note"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDeleteNote(note.id)}
                              className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 text-xs transition-colors cursor-pointer"
                              title="Delete Note"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                          {note.title || `Lesson: ${note.lessonSlug}`}
                        </h4>

                        <div className="text-xs text-slate-300 leading-relaxed font-sans max-h-48 overflow-y-auto pr-1">
                          <MarkdownRenderer content={note.content} />
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs mt-2">
                        <Link
                          href={lessonHref}
                          className="text-purple-400 hover:text-purple-300 font-mono text-[11px] font-bold flex items-center gap-1 transition-colors"
                        >
                          <span>Open Lesson</span>
                          <span>&rarr;</span>
                        </Link>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {note.content.split(/\s+/).filter(Boolean).length} words
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookmarks.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-[#0E121B] border border-white/[0.08] space-y-3">
                <span className="text-4xl block">⭐</span>
                <h3 className="text-base font-bold text-white">No Bookmarks Found</h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                  {searchQuery || selectedTrack !== "all"
                    ? "No code bookmarks match your current search filters."
                    : "You haven't bookmarked any code snippets yet! Open any lesson and click the ⭐ Bookmark button on code examples to collect interview patterns here."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBookmarks.map((bm) => (
                  <div
                    key={bm.id}
                    className="p-5 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-3 flex flex-col justify-between hover:border-purple-500/40 transition-all shadow-md"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono uppercase font-bold text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
                          {bm.trackKey}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyText(bm.id, bm.code)}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 transition-colors cursor-pointer"
                          >
                            {copiedId === bm.id ? "✓ Copied" : "Copy"}
                          </button>
                          <button
                            onClick={() => handleDeleteBookmark(bm.id)}
                            className="text-slate-500 hover:text-rose-400 text-xs transition-colors cursor-pointer"
                            title="Remove Bookmark"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-white">
                        {bm.title}
                      </h4>

                      <pre className="p-3 rounded-xl bg-[#07090E] border border-white/[0.06] text-xs font-mono text-purple-200 overflow-x-auto max-h-48 leading-relaxed">
                        {bm.code}
                      </pre>
                    </div>

                    <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between text-xs">
                      <Link
                        href={`/learn/${bm.trackKey}/${bm.lessonSlug}`}
                        className="text-purple-400 hover:text-purple-300 font-mono text-[11px] font-bold flex items-center gap-1 transition-colors"
                      >
                        <span>Open Lesson</span>
                        <span>&rarr;</span>
                      </Link>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {bm.language || "typescript"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Edit Note Modal */}
      {editingNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-[#0E121B] border border-white/[0.1] rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>✏️</span> Edit Study Note
              </h3>
              <button
                onClick={() => setEditingNote(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1">
                  Note Title / Concept
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="e.g. Encapsulation & Private Fields"
                  className="w-full px-3 py-2 rounded-xl bg-[#07090E] border border-white/[0.08] focus:border-purple-500 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1">
                  Note Content (Markdown supported)
                </label>
                <textarea
                  rows={6}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#07090E] border border-white/[0.08] focus:border-purple-500 text-xs sm:text-sm text-slate-200 outline-none resize-none font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.08]">
              <button
                onClick={() => setEditingNote(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-white/[0.03] border border-white/[0.06] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all shadow-md cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </InteractiveGrid>
  );
}
