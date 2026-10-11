"use client";

import { useState, useEffect, useMemo, useRef } from "react";
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

// ─── Track Configurations & Aesthetics ───────────────────────────────────────
interface TrackMeta {
  key: string;
  label: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  dotBg: string;
  accentGradient: string;
}

const TRACK_CONFIG: Record<string, TrackMeta> = {
  react: {
    key: "react",
    label: "React",
    color: "#06B6D4",
    badgeBg: "bg-cyan-500/10",
    badgeText: "text-cyan-400",
    badgeBorder: "border-cyan-500/20",
    dotBg: "bg-cyan-400",
    accentGradient: "from-cyan-500/20 via-transparent to-transparent",
  },
  nodejs: {
    key: "nodejs",
    label: "Node.js",
    color: "#10B981",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400",
    badgeBorder: "border-emerald-500/20",
    dotBg: "bg-emerald-400",
    accentGradient: "from-emerald-500/20 via-transparent to-transparent",
  },
  typescript: {
    key: "typescript",
    label: "TypeScript",
    color: "#3B82F6",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-400",
    badgeBorder: "border-blue-500/20",
    dotBg: "bg-blue-400",
    accentGradient: "from-blue-500/20 via-transparent to-transparent",
  },
  nestjs: {
    key: "nestjs",
    label: "NestJS",
    color: "#F43F5E",
    badgeBg: "bg-rose-500/10",
    badgeText: "text-rose-400",
    badgeBorder: "border-rose-500/20",
    dotBg: "bg-rose-400",
    accentGradient: "from-rose-500/20 via-transparent to-transparent",
  },
  nextjs: {
    key: "nextjs",
    label: "Next.js",
    color: "#94A3B8",
    badgeBg: "bg-slate-200/10",
    badgeText: "text-slate-200",
    badgeBorder: "border-slate-200/20",
    dotBg: "bg-slate-300",
    accentGradient: "from-slate-400/20 via-transparent to-transparent",
  },
  tanstack: {
    key: "tanstack",
    label: "TanStack Query",
    color: "#F97316",
    badgeBg: "bg-orange-500/10",
    badgeText: "text-orange-400",
    badgeBorder: "border-orange-500/20",
    dotBg: "bg-orange-400",
    accentGradient: "from-orange-500/20 via-transparent to-transparent",
  },
  postgresql: {
    key: "postgresql",
    label: "PostgreSQL",
    color: "#38BDF8",
    badgeBg: "bg-sky-500/10",
    badgeText: "text-sky-400",
    badgeBorder: "border-sky-500/20",
    dotBg: "bg-sky-400",
    accentGradient: "from-sky-500/20 via-transparent to-transparent",
  },
  prisma: {
    key: "prisma",
    label: "Prisma",
    color: "#14B8A6",
    badgeBg: "bg-teal-500/10",
    badgeText: "text-teal-400",
    badgeBorder: "border-teal-500/20",
    dotBg: "bg-teal-400",
    accentGradient: "from-teal-500/20 via-transparent to-transparent",
  },
  redux: {
    key: "redux",
    label: "Redux",
    color: "#A855F7",
    badgeBg: "bg-purple-500/10",
    badgeText: "text-purple-400",
    badgeBorder: "border-purple-500/20",
    dotBg: "bg-purple-400",
    accentGradient: "from-purple-500/20 via-transparent to-transparent",
  },
  mongodb: {
    key: "mongodb",
    label: "MongoDB",
    color: "#22C55E",
    badgeBg: "bg-green-500/10",
    badgeText: "text-green-400",
    badgeBorder: "border-green-500/20",
    dotBg: "bg-green-400",
    accentGradient: "from-green-500/20 via-transparent to-transparent",
  },
  "system-design": {
    key: "system-design",
    label: "System Design",
    color: "#F59E0B",
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-400",
    badgeBorder: "border-amber-500/20",
    dotBg: "bg-amber-400",
    accentGradient: "from-amber-500/20 via-transparent to-transparent",
  },
  oop: {
    key: "oop",
    label: "OOP",
    color: "#8B5CF6",
    badgeBg: "bg-violet-500/10",
    badgeText: "text-violet-400",
    badgeBorder: "border-violet-500/20",
    dotBg: "bg-violet-400",
    accentGradient: "from-violet-500/20 via-transparent to-transparent",
  },
  express: {
    key: "express",
    label: "Express",
    color: "#64748B",
    badgeBg: "bg-slate-500/10",
    badgeText: "text-slate-300",
    badgeBorder: "border-slate-500/20",
    dotBg: "bg-slate-400",
    accentGradient: "from-slate-500/20 via-transparent to-transparent",
  },
  javascript: {
    key: "javascript",
    label: "JavaScript",
    color: "#EAB308",
    badgeBg: "bg-yellow-500/10",
    badgeText: "text-yellow-300",
    badgeBorder: "border-yellow-500/20",
    dotBg: "bg-yellow-400",
    accentGradient: "from-yellow-500/20 via-transparent to-transparent",
  },
};

const DEFAULT_TRACK_META: TrackMeta = {
  key: "general",
  label: "General",
  color: "#A855F7",
  badgeBg: "bg-purple-500/10",
  badgeText: "text-purple-300",
  badgeBorder: "border-purple-500/20",
  dotBg: "bg-purple-400",
  accentGradient: "from-purple-500/20 via-transparent to-transparent",
};

function getTrackMeta(trackKey?: string): TrackMeta {
  if (!trackKey) return DEFAULT_TRACK_META;
  const normalized = trackKey.toLowerCase();
  return (
    TRACK_CONFIG[normalized] || {
      key: normalized,
      label: normalized.charAt(0).toUpperCase() + normalized.slice(1),
      color: "#818CF8",
      badgeBg: "bg-indigo-500/10",
      badgeText: "text-indigo-300",
      badgeBorder: "border-indigo-500/20",
      dotBg: "bg-indigo-400",
      accentGradient: "from-indigo-500/20 via-transparent to-transparent",
    }
  );
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────
function IconSearch({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconNote({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconBookmark({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconCopy({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconCheck({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconEdit({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function IconTrash({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function IconArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function IconPlus({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function IconGrid({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconList({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function IconClose({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconSparkles({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
    </svg>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function NotesPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState<"notes" | "bookmarks">("notes");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"recent" | "oldest" | "title" | "track">("recent");
  const [selectedTrack, setSelectedTrack] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [bookmarks, setBookmarks] = useState<CodeBookmark[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Expanded notes state (for long card text toggle)
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});

  // Note Dialog State (Create or Edit)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [activeEditingId, setActiveEditingId] = useState<string | null>(null);
  const [noteTrack, setNoteTrack] = useState<string>("react");
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");
  const [noteSlug, setNoteSlug] = useState<string>("");
  const [modalTab, setModalTab] = useState<"edit" | "preview">("edit");

  // Custom Delete Confirmation State
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    id: string;
    type: "note" | "bookmark";
    title: string;
  } | null>(null);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Initial local read (bridges legacy annotations)
    setNotes(getLocalNotes());
    setBookmarks(getLocalBookmarks());

    // Cloud sync
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

  // Shortcut for focusing search (/)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handlers
  const handleCopyText = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2200);
    } catch {}
  };

  const handleOpenCreateNote = () => {
    setDialogMode("create");
    setActiveEditingId(null);
    setNoteTrack(selectedTrack !== "all" ? selectedTrack : "react");
    setNoteTitle("");
    setNoteContent("");
    setNoteSlug("");
    setModalTab("edit");
    setDialogOpen(true);
  };

  const handleOpenEditNote = (note: UserNote) => {
    setDialogMode("edit");
    setActiveEditingId(note.id);
    setNoteTrack(note.trackKey || "react");
    setNoteTitle(note.title || "");
    setNoteContent(note.content || "");
    setNoteSlug(note.lessonSlug || "");
    setModalTab("edit");
    setDialogOpen(true);
  };

  const handleSaveNoteDialog = () => {
    if (!noteContent.trim()) return;

    if (dialogMode === "edit" && activeEditingId) {
      const existing = notes.find((n) => n.id === activeEditingId);
      if (existing) {
        const updated = upsertNote({
          ...existing,
          trackKey: noteTrack,
          title: noteTitle.trim(),
          content: noteContent.trim(),
        });
        setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
      }
    } else {
      const newNote = upsertNote({
        trackKey: noteTrack,
        lessonSlug: noteSlug.trim() || "general-notebook",
        lessonPath: `/learn/${noteTrack}`,
        title: noteTitle.trim() || undefined,
        content: noteContent.trim(),
      });
      setNotes((prev) => [newNote, ...prev.filter((n) => n.id !== newNote.id)]);
    }

    setDialogOpen(false);
  };

  const triggerConfirmDelete = (id: string, type: "note" | "bookmark", title: string) => {
    setDeleteConfirmation({ id, type, title });
  };

  const executeDelete = () => {
    if (!deleteConfirmation) return;
    const { id, type } = deleteConfirmation;

    if (type === "note") {
      deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } else {
      deleteBookmark(id);
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    }

    setDeleteConfirmation(null);
  };

  const toggleExpandNote = (id: string) => {
    setExpandedNotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Available tracks with counts
  const trackCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const items = activeTab === "notes" ? notes : bookmarks;
    items.forEach((item) => {
      const key = (item.trackKey || "general").toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, [activeTab, notes, bookmarks]);

  const availableTracks = useMemo(() => {
    const baseKeys = Object.keys(TRACK_CONFIG);
    const existingKeys = new Set(baseKeys);

    // Add any dynamic tracks from notes
    notes.forEach((n) => {
      const key = (n.trackKey || "").toLowerCase();
      if (key && !existingKeys.has(key)) {
        existingKeys.add(key);
      }
    });

    return Array.from(existingKeys).map((key) => getTrackMeta(key));
  }, [notes]);

  // Filtered & Sorted Notes
  const filteredNotes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let result = notes.filter((n) => {
      const noteTrack = (n.trackKey || "").toLowerCase();
      const matchesTrack = selectedTrack === "all" || noteTrack === selectedTrack.toLowerCase();
      const matchesQuery =
        q === "" ||
        (n.content && n.content.toLowerCase().includes(q)) ||
        (n.title && n.title.toLowerCase().includes(q)) ||
        (n.lessonSlug && n.lessonSlug.toLowerCase().includes(q)) ||
        (n.trackKey && n.trackKey.toLowerCase().includes(q));
      return matchesTrack && matchesQuery;
    });

    return result.sort((a, b) => {
      if (sortBy === "recent") return (b.updatedAt || 0) - (a.updatedAt || 0);
      if (sortBy === "oldest") return (a.updatedAt || 0) - (b.updatedAt || 0);
      if (sortBy === "title") return (a.title || "").localeCompare(b.title || "");
      if (sortBy === "track") return (a.trackKey || "").localeCompare(b.trackKey || "");
      return 0;
    });
  }, [notes, selectedTrack, searchQuery, sortBy]);

  // Filtered & Sorted Bookmarks
  const filteredBookmarks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let result = bookmarks.filter((b) => {
      const bmTrack = (b.trackKey || "").toLowerCase();
      const matchesTrack = selectedTrack === "all" || bmTrack === selectedTrack.toLowerCase();
      const matchesQuery =
        q === "" ||
        (b.title && b.title.toLowerCase().includes(q)) ||
        (b.code && b.code.toLowerCase().includes(q)) ||
        (b.lessonSlug && b.lessonSlug.toLowerCase().includes(q)) ||
        (b.trackKey && b.trackKey.toLowerCase().includes(q));
      return matchesTrack && matchesQuery;
    });

    return result.sort((a, b) => {
      if (sortBy === "recent") return (b.createdAt || 0) - (a.createdAt || 0);
      if (sortBy === "oldest") return (a.createdAt || 0) - (b.createdAt || 0);
      if (sortBy === "title") return (a.title || "").localeCompare(b.title || "");
      if (sortBy === "track") return (a.trackKey || "").localeCompare(b.trackKey || "");
      return 0;
    });
  }, [bookmarks, selectedTrack, searchQuery, sortBy]);

  const uniqueTracksStudied = useMemo(() => {
    const set = new Set<string>();
    notes.forEach((n) => n.trackKey && set.add(n.trackKey.toLowerCase()));
    bookmarks.forEach((b) => b.trackKey && set.add(b.trackKey.toLowerCase()));
    return set.size;
  }, [notes, bookmarks]);

  return (
    <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-100 relative selection:bg-purple-500/30 selection:text-white">
      <Nav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 space-y-6">
        {/* ─── Hero Header & Stats ────────────────────────────────────────── */}
        <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-purple-300 bg-purple-500/15 px-3 py-1 rounded-full border border-purple-500/25">
                <IconSparkles className="w-3 h-3 text-purple-400" />
                <span>Developer Knowledge Hub</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
                Study Notes & Code Bookmarks
              </h1>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Your centralized interview notebook across 14+ technical domains. Review your architectural takeaways,
                annotations, and key code patterns.
              </p>
            </div>

            {/* Quick Stats & Primary Action */}
            <div className="flex flex-col sm:flex-row items-stretch md:items-center gap-3">
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0B0F19]/90 border border-white/[0.08] text-xs font-mono">
                <div className="px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center gap-2">
                  <IconNote className="w-3.5 h-3.5 text-purple-400" />
                  <span className="font-bold">{notes.length}</span>
                  <span className="text-[10px] text-purple-300/80">Notes</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-2">
                  <IconBookmark className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-bold">{bookmarks.length}</span>
                  <span className="text-[10px] text-amber-300/80">Saved</span>
                </div>
                {uniqueTracksStudied > 0 && (
                  <div className="px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hidden sm:flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="font-bold">{uniqueTracksStudied}</span>
                    <span className="text-[10px] text-cyan-300/80">Tracks</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleOpenCreateNote}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <IconPlus className="w-4 h-4 stroke-[2.5]" />
                <span>New Note</span>
              </button>
            </div>
          </div>
        </div>

        {/* ─── Modern Toolbar & Filter Controls ─────────────────────────── */}
        <div className="space-y-3">
          {/* Top Bar: Tabs + View Mode + Sorting */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0B0F19]/80 border border-white/[0.07] p-2.5 rounded-2xl backdrop-blur-md">
            {/* Segmented Tabs */}
            <div className="flex items-center p-1 bg-[#07090E] rounded-xl border border-white/[0.06]">
              <button
                type="button"
                onClick={() => setActiveTab("notes")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === "notes"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <IconNote className="w-3.5 h-3.5" />
                <span>Notes</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    activeTab === "notes"
                      ? "bg-purple-800 text-purple-200"
                      : "bg-white/[0.06] text-slate-400"
                  }`}
                >
                  {filteredNotes.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("bookmarks")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === "bookmarks"
                    ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <IconBookmark className="w-3.5 h-3.5" />
                <span>Bookmarks</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    activeTab === "bookmarks"
                      ? "bg-amber-800 text-amber-200"
                      : "bg-white/[0.06] text-slate-400"
                  }`}
                >
                  {filteredBookmarks.length}
                </span>
              </button>
            </div>

            {/* Right Tools: View Mode Toggle & Sort Dropdown */}
            <div className="flex items-center justify-between sm:justify-end gap-2">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#07090E] border border-white/[0.08] hover:border-white/[0.15] text-slate-300 text-xs rounded-xl px-3 py-2 pr-7 outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="recent">Recently Updated</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Title (A-Z)</option>
                  <option value="track">By Track</option>
                </select>
                <div className="pointer-events-none absolute right-2.5 top-2.5 text-slate-500 text-[10px]">
                  ▼
                </div>
              </div>

              {/* View Switcher (Grid vs List) */}
              <div className="flex items-center p-1 bg-[#07090E] rounded-xl border border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-white/[0.12] text-white"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <IconGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  title="List View"
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "list"
                      ? "bg-white/[0.12] text-white"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <IconList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar Input */}
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, notes, syntax, or tags... (Press / to focus)"
              className="w-full pl-10 pr-10 py-3 rounded-2xl bg-[#0B0F19]/90 border border-white/[0.08] focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none transition-all shadow-lg"
            />
            <span className="absolute left-3.5 top-3.5 text-slate-500">
              <IconSearch className="w-4 h-4" />
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
                title="Clear search"
              >
                <IconClose className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Track Filter Pills Row */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedTrack("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedTrack === "all"
                  ? "bg-purple-500/20 text-purple-200 border border-purple-500/40 font-bold shadow-sm"
                  : "bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] border border-white/[0.06]"
              }`}
            >
              <span>All Tracks</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-white/[0.06] text-slate-400">
                {activeTab === "notes" ? notes.length : bookmarks.length}
              </span>
            </button>

            {availableTracks.map((t) => {
              const isSelected = selectedTrack.toLowerCase() === t.key.toLowerCase();
              const count = trackCounts[t.key] || 0;

              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setSelectedTrack(t.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? `${t.badgeBg} ${t.badgeText} border ${t.badgeBorder} font-bold shadow-sm`
                      : "bg-white/[0.02] text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] border border-white/[0.05]"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${t.dotBg}`} />
                  <span>{t.label}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                        isSelected ? "bg-white/10" : "bg-white/[0.04] text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Filter Summary Bar (if searching or track selected) */}
          {(searchQuery || selectedTrack !== "all") && (
            <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
              <span className="flex items-center gap-1.5">
                <span>Filter applied:</span>
                {selectedTrack !== "all" && (
                  <span className="font-bold uppercase tracking-wider">{selectedTrack}</span>
                )}
                {searchQuery && (
                  <span>
                    matching &ldquo;<span className="text-white font-medium">{searchQuery}</span>&rdquo;
                  </span>
                )}
                <span className="text-purple-400 font-mono">
                  ({activeTab === "notes" ? filteredNotes.length : filteredBookmarks.length} found)
                </span>
              </span>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTrack("all");
                }}
                className="text-[11px] font-bold text-purple-300 hover:text-white underline underline-offset-2 cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* ─── Content Display (Notes vs Bookmarks) ────────────────────────── */}
        {activeTab === "notes" ? (
          <div>
            {filteredNotes.length === 0 ? (
              /* Notes Empty State */
              <div className="p-12 sm:p-16 text-center rounded-3xl bg-[#0B0F19]/80 border border-white/[0.08] space-y-4 max-w-xl mx-auto shadow-xl">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-inner">
                  <IconNote className="w-7 h-7 stroke-[1.8]" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {searchQuery || selectedTrack !== "all" ? "No Matching Notes" : "No Study Notes Yet"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {searchQuery || selectedTrack !== "all"
                      ? "No notes matched your search query or track filter. Try clearing filters to see all notes."
                      : "Capture architectural insights, interview takeaways, and key principles. Write a new note here or press Ctrl+J while browsing lessons."}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-center gap-3">
                  {searchQuery || selectedTrack !== "all" ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedTrack("all");
                      }}
                      className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-bold transition-all border border-white/[0.1] cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={handleOpenCreateNote}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                      >
                        <IconPlus className="w-3.5 h-3.5" />
                        <span>Write First Note</span>
                      </button>
                      <Link
                        href="/learn/react"
                        className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-bold transition-all border border-white/[0.08] cursor-pointer"
                      >
                        Browse Lessons
                      </Link>
                    </>
                  )}
                </div>
              </div>
            ) : viewMode === "grid" ? (
              /* Notes Grid View */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredNotes.map((note) => {
                  const meta = getTrackMeta(note.trackKey);
                  const lessonHref =
                    note.lessonPath ||
                    (note.lessonSlug?.startsWith("/")
                      ? note.lessonSlug
                      : `/learn/${note.trackKey}/${note.lessonSlug}`);
                  const wordCount = note.content.split(/\s+/).filter(Boolean).length;
                  const readTimeMin = Math.max(1, Math.round(wordCount / 120));
                  const isExpanded = expandedNotes[note.id];
                  const isLong = note.content.length > 280;

                  return (
                    <div
                      key={note.id}
                      className="group relative rounded-2xl bg-[#0B0F19]/90 border border-white/[0.07] hover:border-white/[0.18] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/5 p-5 space-y-4"
                    >
                      {/* Top Track Glow Accent */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${meta.accentGradient}`}
                      />

                      <div className="space-y-3">
                        {/* Card Header: Track Badge, Date, Action Cluster */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-lg border flex items-center gap-1.5 ${meta.badgeBg} ${meta.badgeText} ${meta.badgeBorder}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${meta.dotBg}`} />
                              <span>{meta.label}</span>
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">
                              {new Date(note.updatedAt).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>

                          {/* Quick Action Icons */}
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleCopyText(note.id, note.content)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                              title="Copy Note Text"
                            >
                              {copiedId === note.id ? (
                                <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <IconCopy className="w-3.5 h-3.5" />
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleOpenEditNote(note)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-purple-300 hover:bg-purple-500/10 transition-all cursor-pointer"
                              title="Edit Note"
                            >
                              <IconEdit className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                triggerConfirmDelete(
                                  note.id,
                                  "note",
                                  note.title || `Lesson ${note.lessonSlug}`
                                )
                              }
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                              title="Delete Note"
                            >
                              <IconTrash className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors leading-snug">
                          {note.title || `Concept Note: ${note.lessonSlug || "General"}`}
                        </h4>

                        {/* Note Body (Markdown rendered) */}
                        <div
                          className={`text-xs text-slate-300 leading-relaxed font-sans overflow-hidden transition-all duration-300 ${
                            isLong && !isExpanded ? "max-h-40 relative" : ""
                          }`}
                        >
                          <MarkdownRenderer content={note.content} />
                          {isLong && !isExpanded && (
                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0B0F19] to-transparent pointer-events-none" />
                          )}
                        </div>

                        {/* Expand / Collapse toggle for long notes */}
                        {isLong && (
                          <button
                            type="button"
                            onClick={() => toggleExpandNote(note.id)}
                            className="text-[11px] font-mono text-purple-400 hover:text-purple-300 font-medium transition-colors cursor-pointer"
                          >
                            {isExpanded ? "↑ Show less" : "↓ Show full note"}
                          </button>
                        )}
                      </div>

                      {/* Card Footer: Open Lesson & Reading Stats */}
                      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs mt-2">
                        <Link
                          href={lessonHref}
                          className="text-purple-400 hover:text-purple-300 font-mono text-[11px] font-bold inline-flex items-center gap-1.5 group/link transition-colors"
                        >
                          <span>Open Lesson</span>
                          <span className="transform transition-transform group-hover/link:translate-x-1">
                            &rarr;
                          </span>
                        </Link>

                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                          <span>{wordCount} words</span>
                          <span>•</span>
                          <span>{readTimeMin}m read</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Notes Compact List View */
              <div className="space-y-2">
                {filteredNotes.map((note) => {
                  const meta = getTrackMeta(note.trackKey);
                  const lessonHref =
                    note.lessonPath ||
                    (note.lessonSlug?.startsWith("/")
                      ? note.lessonSlug
                      : `/learn/${note.trackKey}/${note.lessonSlug}`);
                  const wordCount = note.content.split(/\s+/).filter(Boolean).length;

                  return (
                    <div
                      key={note.id}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#0B0F19]/80 border border-white/[0.06] hover:border-purple-500/30 hover:bg-[#0E121B] transition-all shadow-sm"
                    >
                      <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                        <span
                          className={`shrink-0 text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${meta.badgeBg} ${meta.badgeText} ${meta.badgeBorder}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${meta.dotBg}`} />
                          <span>{meta.label}</span>
                        </span>

                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-200 truncate">
                            {note.title || `Note: ${note.lessonSlug}`}
                          </h4>
                          <p className="text-[11px] text-slate-400 truncate max-w-xl">
                            {note.content.replace(/[#*`>]/g, "").trim()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-white/[0.05]">
                        <div className="text-[10px] font-mono text-slate-500 flex items-center gap-2">
                          <span>{wordCount} words</span>
                          <span>•</span>
                          <span>
                            {new Date(note.updatedAt).toLocaleDateString(undefined, {
                              month: "numeric",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleCopyText(note.id, note.content)}
                            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                            title="Copy Note"
                          >
                            {copiedId === note.id ? (
                              <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <IconCopy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEditNote(note)}
                            className="p-1 rounded text-slate-400 hover:text-purple-300 hover:bg-purple-500/10 transition-colors cursor-pointer"
                            title="Edit Note"
                          >
                            <IconEdit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              triggerConfirmDelete(
                                note.id,
                                "note",
                                note.title || `Lesson ${note.lessonSlug}`
                              )
                            }
                            className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            title="Delete Note"
                          >
                            <IconTrash className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            href={lessonHref}
                            className="p-1 rounded text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 transition-colors"
                            title="Open Lesson"
                          >
                            <IconArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* ─── Bookmarks Content ───────────────────────────────────────── */
          <div>
            {filteredBookmarks.length === 0 ? (
              /* Bookmarks Empty State */
              <div className="p-12 sm:p-16 text-center rounded-3xl bg-[#0B0F19]/80 border border-white/[0.08] space-y-4 max-w-xl mx-auto shadow-xl">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-inner">
                  <IconBookmark className="w-7 h-7 stroke-[1.8]" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {searchQuery || selectedTrack !== "all"
                      ? "No Matching Bookmarks"
                      : "No Bookmarked Snippets"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {searchQuery || selectedTrack !== "all"
                      ? "No code bookmarks match your current filters. Try resetting search or track."
                      : "Bookmark critical code examples, patterns, and boilerplate from curriculum lessons to review them all in one place before technical interviews."}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/learn/react"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    <span>Browse Lessons & Save Code</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            ) : viewMode === "grid" ? (
              /* Bookmarks Grid View */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBookmarks.map((bm) => {
                  const meta = getTrackMeta(bm.trackKey);

                  return (
                    <div
                      key={bm.id}
                      className="group relative rounded-2xl bg-[#0B0F19]/90 border border-white/[0.07] hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg p-5 space-y-3"
                    >
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-lg border flex items-center gap-1.5 ${meta.badgeBg} ${meta.badgeText} ${meta.badgeBorder}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${meta.dotBg}`} />
                              <span>{meta.label}</span>
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">
                              {bm.language || "typescript"}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleCopyText(bm.id, bm.code)}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
                            >
                              {copiedId === bm.id ? (
                                <>
                                  <IconCheck className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <IconCopy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                triggerConfirmDelete(bm.id, "bookmark", bm.title || "Snippet")
                              }
                              className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                              title="Delete Bookmark"
                            >
                              <IconTrash className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors">
                          {bm.title}
                        </h4>

                        {/* Code Frame with macOS style dots */}
                        <div className="rounded-xl overflow-hidden bg-[#07090E] border border-white/[0.08] shadow-inner">
                          <div className="flex items-center justify-between px-3 py-1.5 bg-[#0D111A] border-b border-white/[0.06] text-[10px] font-mono text-slate-500">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                              <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                              <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                            </div>
                            <span>{bm.language || "code"}</span>
                          </div>
                          <pre className="p-3 text-xs font-mono text-slate-200 overflow-x-auto max-h-48 leading-relaxed scrollbar-thin">
                            {bm.code}
                          </pre>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs mt-2">
                        <Link
                          href={`/learn/${bm.trackKey}/${bm.lessonSlug}`}
                          className="text-amber-400 hover:text-amber-300 font-mono text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors group/link"
                        >
                          <span>Open Lesson</span>
                          <span className="transform transition-transform group-hover/link:translate-x-1">
                            &rarr;
                          </span>
                        </Link>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {bm.code.split("\n").length} lines
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Bookmarks List View */
              <div className="space-y-2">
                {filteredBookmarks.map((bm) => {
                  const meta = getTrackMeta(bm.trackKey);

                  return (
                    <div
                      key={bm.id}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#0B0F19]/80 border border-white/[0.06] hover:border-amber-500/30 hover:bg-[#0E121B] transition-all shadow-sm"
                    >
                      <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                        <span
                          className={`shrink-0 text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${meta.badgeBg} ${meta.badgeText} ${meta.badgeBorder}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${meta.dotBg}`} />
                          <span>{meta.label}</span>
                        </span>

                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-200 truncate">
                            {bm.title}
                          </h4>
                          <p className="text-[11px] font-mono text-slate-400 truncate max-w-xl">
                            {bm.code.split("\n")[0]}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-white/[0.05]">
                        <span className="text-[10px] font-mono text-slate-500">
                          {bm.code.split("\n").length} lines • {bm.language || "ts"}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleCopyText(bm.id, bm.code)}
                            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                            title="Copy Code"
                          >
                            {copiedId === bm.id ? (
                              <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <IconCopy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              triggerConfirmDelete(bm.id, "bookmark", bm.title || "Snippet")
                            }
                            className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            title="Delete Bookmark"
                          >
                            <IconTrash className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            href={`/learn/${bm.trackKey}/${bm.lessonSlug}`}
                            className="p-1 rounded text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                            title="Open Lesson"
                          >
                            <IconArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ─── Create & Edit Study Note Modal ──────────────────────────────── */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#0B0F19] border border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#0E121B]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-400">
                  <IconNote className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {dialogMode === "create" ? "Write Study Note" : "Edit Study Note"}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Supports Markdown, code blocks, lists, and quotes
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              >
                <IconClose className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Track Selection & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
                    Learning Track
                  </label>
                  <select
                    value={noteTrack}
                    onChange={(e) => setNoteTrack(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#07090E] border border-white/[0.08] focus:border-purple-500 text-xs sm:text-sm text-white outline-none cursor-pointer"
                  >
                    {availableTracks.map((t) => (
                      <option key={t.key} value={t.key}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
                    Lesson Tag / Topic Slug (Optional)
                  </label>
                  <input
                    type="text"
                    value={noteSlug}
                    onChange={(e) => setNoteSlug(e.target.value)}
                    placeholder="e.g. encapsulation or closures"
                    className="w-full px-3 py-2 rounded-xl bg-[#07090E] border border-white/[0.08] focus:border-purple-500 text-xs sm:text-sm text-white outline-none font-mono"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
                  Note Title / Concept Question
                </label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="e.g. What is Encapsulation in OOP?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090E] border border-white/[0.08] focus:border-purple-500 text-xs sm:text-sm text-white outline-none"
                />
              </div>

              {/* Content with Editor vs Preview Tabs */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase text-slate-400">
                    Content & Explanation
                  </label>
                  <div className="flex items-center gap-1 bg-[#07090E] p-0.5 rounded-lg border border-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => setModalTab("edit")}
                      className={`px-2.5 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                        modalTab === "edit"
                          ? "bg-purple-600 text-white font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalTab("preview")}
                      className={`px-2.5 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                        modalTab === "preview"
                          ? "bg-purple-600 text-white font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Preview
                    </button>
                  </div>
                </div>

                {modalTab === "edit" ? (
                  <textarea
                    rows={8}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Write your explanation or revision notes here... Markdown formatting like `inline code`, > quotes, or **bold** is supported."
                    className="w-full px-3.5 py-3 rounded-xl bg-[#07090E] border border-white/[0.08] focus:border-purple-500 text-xs sm:text-sm text-slate-200 outline-none resize-none font-mono leading-relaxed"
                  />
                ) : (
                  <div className="p-4 rounded-xl bg-[#07090E] border border-white/[0.08] min-h-[12rem] max-h-64 overflow-y-auto text-xs text-slate-200">
                    {noteContent.trim() ? (
                      <MarkdownRenderer content={noteContent} />
                    ) : (
                      <span className="text-slate-500 italic">No content to preview yet.</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-[#0E121B] border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">
                {noteContent.split(/\s+/).filter(Boolean).length} words
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDialogOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-white/[0.04] border border-white/[0.08] transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!noteContent.trim()}
                  onClick={handleSaveNoteDialog}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-md shadow-purple-600/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {dialogMode === "create" ? "Create Note" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Custom Non-Blocking Delete Confirmation Dialog ───────────────── */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#0E121B] border border-white/[0.1] rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <IconTrash className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Delete {deleteConfirmation.type === "note" ? "Study Note" : "Code Bookmark"}?
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Are you sure you want to delete &ldquo;
                  <span className="text-white font-medium">{deleteConfirmation.title}</span>&rdquo;?
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-white/[0.03] border border-white/[0.06] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeDelete}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors shadow-lg shadow-rose-600/30 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </InteractiveGrid>
  );
}
