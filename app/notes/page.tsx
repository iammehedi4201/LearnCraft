"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import {
  getLocalNotes,
  upsertNote,
  deleteNote,
  syncNotesWithCloud,
} from "@/lib/notes-bookmarks";
import type { UserNote } from "@/types/notes-bookmarks";
import { MarkdownRenderer } from "@/components/revision/MarkdownRenderer";

// ─── Track Configurations & Aesthetics ───────────────────────────────────────
interface TrackMeta {
  key: string;
  label: string;
  color: string;
  dotColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
}

const TRACK_CONFIG: Record<string, TrackMeta> = {
  react: {
    key: "react",
    label: "React",
    color: "#06B6D4",
    dotColor: "#06B6D4",
    badgeBg: "bg-[#082a36]",
    badgeText: "text-[#38bdf8]",
    badgeBorder: "border-[#38bdf8]/25",
  },
  nodejs: {
    key: "nodejs",
    label: "Node.js",
    color: "#22C55E",
    dotColor: "#22C55E",
    badgeBg: "bg-[#0d2a1f]",
    badgeText: "text-[#34d399]",
    badgeBorder: "border-[#34d399]/25",
  },
  typescript: {
    key: "typescript",
    label: "TypeScript",
    color: "#3B82F6",
    dotColor: "#3B82F6",
    badgeBg: "bg-[#0f2442]",
    badgeText: "text-[#60a5fa]",
    badgeBorder: "border-[#60a5fa]/25",
  },
  nestjs: {
    key: "nestjs",
    label: "NestJS",
    color: "#F43F5E",
    dotColor: "#FF6384",
    badgeBg: "bg-[#301522]",
    badgeText: "text-[#ff6384]",
    badgeBorder: "border-[#ff6384]/25",
  },
  nextjs: {
    key: "nextjs",
    label: "Next.js",
    color: "#94A3B8",
    dotColor: "#CBD5E1",
    badgeBg: "bg-[#1e2430]",
    badgeText: "text-slate-200",
    badgeBorder: "border-slate-500/25",
  },
  oop: {
    key: "oop",
    label: "OOP",
    color: "#A855F7",
    dotColor: "#C084FC",
    badgeBg: "bg-[#25163b]",
    badgeText: "text-[#c084fc]",
    badgeBorder: "border-[#c084fc]/25",
  },
  "system-design": {
    key: "system-design",
    label: "System Design",
    color: "#F59E0B",
    dotColor: "#FBBF24",
    badgeBg: "bg-[#2d210b]",
    badgeText: "text-[#fbbf24]",
    badgeBorder: "border-[#fbbf24]/25",
  },
  javascript: {
    key: "javascript",
    label: "JavaScript",
    color: "#EAB308",
    dotColor: "#FDE047",
    badgeBg: "bg-[#2e270b]",
    badgeText: "text-[#fde047]",
    badgeBorder: "border-[#fde047]/25",
  },
  express: {
    key: "express",
    label: "Express",
    color: "#64748B",
    dotColor: "#94A3B8",
    badgeBg: "bg-[#1c222c]",
    badgeText: "text-[#94a3b8]",
    badgeBorder: "border-[#94a3b8]/25",
  },
  postgresql: {
    key: "postgresql",
    label: "PostgreSQL",
    color: "#38BDF8",
    dotColor: "#38BDF8",
    badgeBg: "bg-[#0c2338]",
    badgeText: "text-[#38bdf8]",
    badgeBorder: "border-[#38bdf8]/25",
  },
  mongodb: {
    key: "mongodb",
    label: "MongoDB",
    color: "#22C55E",
    dotColor: "#4ADE80",
    badgeBg: "bg-[#0b291d]",
    badgeText: "text-[#4ade80]",
    badgeBorder: "border-[#4ade80]/25",
  },
  prisma: {
    key: "prisma",
    label: "Prisma",
    color: "#14B8A6",
    dotColor: "#2DD4BF",
    badgeBg: "bg-[#0b2927]",
    badgeText: "text-[#2dd4bf]",
    badgeBorder: "border-[#2dd4bf]/25",
  },
  redux: {
    key: "redux",
    label: "Redux",
    color: "#A855F7",
    dotColor: "#C084FC",
    badgeBg: "bg-[#271838]",
    badgeText: "text-[#c084fc]",
    badgeBorder: "border-[#c084fc]/25",
  },
  tanstack: {
    key: "tanstack",
    label: "TanStack",
    color: "#F97316",
    dotColor: "#FB923C",
    badgeBg: "bg-[#2d1b0f]",
    badgeText: "text-[#fb923c]",
    badgeBorder: "border-[#fb923c]/25",
  },
};

const DEFAULT_TRACK_META: TrackMeta = {
  key: "general",
  label: "General",
  color: "#A855F7",
  dotColor: "#C084FC",
  badgeBg: "bg-[#25163b]",
  badgeText: "text-purple-300",
  badgeBorder: "border-purple-500/25",
};

function getTrackMeta(trackKey?: string): TrackMeta {
  if (!trackKey) return DEFAULT_TRACK_META;
  const normalized = trackKey.toLowerCase();
  return (
    TRACK_CONFIG[normalized] || {
      key: normalized,
      label: normalized.charAt(0).toUpperCase() + normalized.slice(1),
      color: "#818CF8",
      dotColor: "#818CF8",
      badgeBg: "bg-indigo-500/15",
      badgeText: "text-indigo-300",
      badgeBorder: "border-indigo-500/25",
    }
  );
}

const PRIMARY_CHIP_KEYS = ["react", "nodejs", "typescript", "nestjs"];
const MORE_TRACK_KEYS = [
  "nextjs",
  "oop",
  "system-design",
  "javascript",
  "express",
  "postgresql",
  "mongodb",
  "prisma",
  "redux",
  "tanstack",
];

// Helper to format date like "Sep 27, 2026"
function formatDate(timestamp?: number): string {
  if (!timestamp) return "Recently";
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
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

function IconMoreHorizontal({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="5" cy="12" r="1.75" />
      <circle cx="12" cy="12" r="1.75" />
      <circle cx="19" cy="12" r="1.75" />
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

function IconCopy({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconCheck({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconEdit({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function IconTrash({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function IconExternalLink({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ─── Default Sample Note for Fresh States ────────────────────────────────────
const SEED_DEMO_NOTE: UserNote = {
  id: "demo-encapsulation-oop",
  trackKey: "nestjs",
  lessonSlug: "what-is-encapsulation",
  lessonPath: "/learn/nestjs",
  title: "What is Encapsulation in Object-Oriented Programming?",
  content: "Private fields (# or private) plus controlled getter/setter methods. Encapsulation protects an object's internal state from unauthorized external manipulation while exposing clean public interfaces.",
  createdAt: 1790467200000,
  updatedAt: 1790467200000,
};

// ─── Main Component ──────────────────────────────────────────────────────────
export default function NotesPage(): JSX.Element {
  const [selectedTrack, setSelectedTrack] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dropdown states
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState<boolean>(false);
  const [moreSearchQuery, setMoreSearchQuery] = useState<string>("");
  const [showAllChipsInline, setShowAllChipsInline] = useState<boolean>(false);

  // Full Reading Modal
  const [readingNote, setReadingNote] = useState<UserNote | null>(null);

  // Create / Edit Modal State
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [activeEditingId, setActiveEditingId] = useState<string | null>(null);
  const [noteTrack, setNoteTrack] = useState<string>("nestjs");
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");
  const [noteSlug, setNoteSlug] = useState<string>("");
  const [modalTab, setModalTab] = useState<"edit" | "preview">("edit");

  // Custom Delete Confirmation Modal
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const moreDropdownRef = useRef<HTMLDivElement | null>(null);

  // Load notes
  useEffect(() => {
    let currentNotes = getLocalNotes();

    // If completely brand new, seed the demo note to match the preview mockup
    if (currentNotes.length === 0) {
      upsertNote(SEED_DEMO_NOTE);
      currentNotes = [SEED_DEMO_NOTE];
    }

    setNotes(currentNotes);

    syncNotesWithCloud().then((clNotes) => {
      if (clNotes.length > 0) setNotes(clNotes);
    });

    const handleNotesUpdate = () => setNotes(getLocalNotes());

    window.addEventListener("learncraft-notes-updated", handleNotesUpdate);

    return () => {
      window.removeEventListener("learncraft-notes-updated", handleNotesUpdate);
    };
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-note-menu]")) {
        setActiveMenuId(null);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(target)) {
        setMoreDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  // Keyboard shortcut '/' to search
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
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  const handleOpenCreateNote = () => {
    setDialogMode("create");
    setActiveEditingId(null);
    setNoteTrack(selectedTrack !== "all" ? selectedTrack : "nestjs");
    setNoteTitle("");
    setNoteContent("");
    setNoteSlug("");
    setModalTab("edit");
    setDialogOpen(true);
    setActiveMenuId(null);
  };

  const handleOpenEditNote = (note: UserNote) => {
    setDialogMode("edit");
    setActiveEditingId(note.id);
    setNoteTrack(note.trackKey || "nestjs");
    setNoteTitle(note.title || "");
    setNoteContent(note.content || "");
    setNoteSlug(note.lessonSlug || "");
    setModalTab("edit");
    setDialogOpen(true);
    setActiveMenuId(null);
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
        if (readingNote?.id === updated.id) {
          setReadingNote(updated);
        }
      }
    } else {
      const newNote = upsertNote({
        trackKey: noteTrack,
        lessonSlug: noteSlug.trim() || "study-note",
        lessonPath: `/learn/${noteTrack}`,
        title: noteTitle.trim() || undefined,
        content: noteContent.trim(),
      });
      setNotes((prev) => [newNote, ...prev.filter((n) => n.id !== newNote.id)]);
    }

    setDialogOpen(false);
  };

  const executeDelete = () => {
    if (!deleteConfirmation) return;
    const { id } = deleteConfirmation;

    deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (readingNote?.id === id) setReadingNote(null);
    setDeleteConfirmation(null);
  };

  // Filtered Notes
  const filteredNotes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return notes.filter((n) => {
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
  }, [notes, selectedTrack, searchQuery]);

  // Count of items per track for badges in dropdown
  const trackItemCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    notes.forEach((item) => {
      const key = (item.trackKey || "").toLowerCase();
      if (key) {
        counts[key] = (counts[key] || 0) + 1;
      }
    });
    return counts;
  }, [notes]);

  // All extra tracks (default MORE_TRACK_KEYS + any dynamic tracks in notes)
  const allAvailableMoreTracks = useMemo(() => {
    const keys = new Set(MORE_TRACK_KEYS);
    notes.forEach((n) => {
      const k = (n.trackKey || "").toLowerCase();
      if (k && !PRIMARY_CHIP_KEYS.includes(k)) keys.add(k);
    });
    return Array.from(keys);
  }, [notes]);

  // Filtered tracks in the More popover search
  const filteredMoreTracks = useMemo(() => {
    if (!moreSearchQuery.trim()) return allAvailableMoreTracks;
    const q = moreSearchQuery.toLowerCase().trim();
    return allAvailableMoreTracks.filter((k) => {
      const meta = TRACK_CONFIG[k] || getTrackMeta(k);
      return meta.label.toLowerCase().includes(q) || meta.key.toLowerCase().includes(q);
    });
  }, [allAvailableMoreTracks, moreSearchQuery]);

  const isMoreSelected = allAvailableMoreTracks.includes(selectedTrack.toLowerCase());

  return (
    <div
      className="min-h-screen bg-ds-bg-weak text-slate-100 relative selection:bg-purple-500/30 selection:text-white pb-24"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }}
    >
      <Nav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ─── Top Header ─────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-10 sm:pt-14 pb-2">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Study Notes
            </h1>
            <p className="text-sm text-slate-400 mt-2 font-normal">
              {`${notes.length} ${notes.length === 1 ? "note" : "notes"} · everything you're learning, in one place`}
            </p>
          </div>

          <button
            onClick={handleOpenCreateNote}
            className="self-start sm:self-center inline-flex items-center gap-1.5 px-6 py-2.5 rounded-2xl bg-[#a78bfa] hover:bg-[#b89dfe] text-slate-950 font-bold text-sm shadow-[0_4px_25px_rgba(167,139,250,0.35)] hover:shadow-[0_4px_30px_rgba(167,139,250,0.5)] transition-all cursor-pointer"
          >
            <span className="text-base leading-none font-extrabold">+</span>
            <span>New note</span>
          </button>
        </div>

        {/* ─── Row 2: Search Bar & Count ───────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-8">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <IconSearch className="w-4 h-4" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes, topics, code... (Press '/' to focus)"
              className="w-full bg-[#0e121d] border border-white/[0.08] focus:border-purple-500/50 focus:outline-none rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                title="Clear search"
              >
                <IconClose className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0e121d] border border-white/[0.08] text-xs text-slate-400 shrink-0 font-medium">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>
              {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"}{" "}
              {selectedTrack !== "all" || searchQuery ? "found" : "total"}
            </span>
          </div>
        </div>

        {/* ─── Row 3: Filter Chips ─────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2 py-2 mt-5 relative z-30">
          {/* All Chip */}
          <button
            onClick={() => setSelectedTrack("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors shrink-0 ${
              selectedTrack === "all"
                ? "bg-[#231b3b] border border-purple-500/60 text-white shadow-sm shadow-purple-900/30"
                : "bg-[#0e121d] border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20"
            }`}
          >
            All
          </button>

          {/* If inline mode is enabled, show ALL tracks directly */}
          {showAllChipsInline ? (
            <>
              {/* Primary Tracks */}
              {PRIMARY_CHIP_KEYS.map((key) => {
                const meta = TRACK_CONFIG[key] || getTrackMeta(key);
                const isSelected = selectedTrack === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedTrack(key)}
                    className={`px-4 py-1.5 rounded-full text-xs flex items-center gap-2 transition-colors shrink-0 ${
                      isSelected
                        ? "bg-[#231b3b] border border-purple-500/60 text-white font-medium shadow-sm shadow-purple-900/30"
                        : "bg-[#0e121d] border border-white/[0.08] text-slate-300 hover:text-white hover:border-white/20"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: meta.dotColor }}
                    />
                    <span>{meta.label}</span>
                  </button>
                );
              })}

              {/* All Additional Tracks */}
              {allAvailableMoreTracks.map((key) => {
                const meta = TRACK_CONFIG[key] || getTrackMeta(key);
                const isSelected = selectedTrack === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedTrack(key)}
                    className={`px-4 py-1.5 rounded-full text-xs flex items-center gap-2 transition-colors shrink-0 ${
                      isSelected
                        ? "bg-[#231b3b] border border-purple-500/60 text-white font-medium shadow-sm shadow-purple-900/30"
                        : "bg-[#0e121d] border border-white/[0.08] text-slate-300 hover:text-white hover:border-white/20"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: meta.dotColor }}
                    />
                    <span>{meta.label}</span>
                  </button>
                );
              })}

              {/* Collapse Button */}
              <button
                onClick={() => setShowAllChipsInline(false)}
                className="px-3.5 py-1.5 rounded-full text-xs flex items-center gap-1.5 text-purple-300 bg-purple-500/10 border border-purple-500/25 hover:bg-purple-500/20 transition-colors shrink-0 font-medium"
              >
                <span>Show less</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </button>
            </>
          ) : (
            <>
              {/* Primary Track Chips */}
              {PRIMARY_CHIP_KEYS.map((key) => {
                const meta = TRACK_CONFIG[key] || getTrackMeta(key);
                const isSelected = selectedTrack === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedTrack(key)}
                    className={`px-4 py-1.5 rounded-full text-xs flex items-center gap-2 transition-colors shrink-0 ${
                      isSelected
                        ? "bg-[#231b3b] border border-purple-500/60 text-white font-medium shadow-sm shadow-purple-900/30"
                        : "bg-[#0e121d] border border-white/[0.08] text-slate-300 hover:text-white hover:border-white/20"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: meta.dotColor }}
                    />
                    <span>{meta.label}</span>
                  </button>
                );
              })}

              {/* Active Chip from More (if selected) */}
              {isMoreSelected && (
                <button
                  onClick={() => setSelectedTrack("all")}
                  className="px-4 py-1.5 rounded-full text-xs flex items-center gap-2 bg-[#231b3b] border border-purple-500/60 text-white font-medium shadow-sm shadow-purple-900/30 shrink-0"
                  title="Click to remove filter"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: (TRACK_CONFIG[selectedTrack] || getTrackMeta(selectedTrack)).dotColor }}
                  />
                  <span>{(TRACK_CONFIG[selectedTrack] || getTrackMeta(selectedTrack)).label}</span>
                  <span className="text-slate-400 hover:text-white ml-0.5 font-bold">×</span>
                </button>
              )}

              {/* More ▾ Dropdown Trigger & Popover */}
              <div className="relative shrink-0" ref={moreDropdownRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMoreDropdownOpen(!moreDropdownOpen);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                    moreDropdownOpen || isMoreSelected
                      ? "bg-[#231b3b] border border-purple-500/60 text-white font-medium"
                      : "bg-[#0e121d] border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  <span>More</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`w-3 h-3 transition-transform ${moreDropdownOpen ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Floating Popover (NOT clipped because parent is overflow-visible) */}
                {moreDropdownOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute left-0 mt-2 w-72 bg-[#0d111c] border border-white/[0.12] rounded-2xl shadow-2xl p-2.5 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-white/[0.06]">
                      <div>
                        <span className="text-xs font-semibold text-white">More Topics</span>
                        <span className="block text-[10px] text-slate-400">
                          Filter study notes
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setShowAllChipsInline(true);
                          setMoreDropdownOpen(false);
                        }}
                        className="text-[10px] text-purple-400 hover:text-purple-300 font-medium px-2 py-1 rounded-md hover:bg-purple-500/10 transition-colors"
                      >
                        Expand all ↗
                      </button>
                    </div>

                    {/* Search inside More */}
                    <div className="relative my-2 px-1">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
                        <IconSearch className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="text"
                        value={moreSearchQuery}
                        onChange={(e) => setMoreSearchQuery(e.target.value)}
                        placeholder="Search topics..."
                        className="w-full bg-[#131826] border border-white/[0.08] focus:border-purple-500/50 focus:outline-none rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500"
                        autoFocus
                      />
                      {moreSearchQuery && (
                        <button
                          onClick={() => setMoreSearchQuery("")}
                          className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-white"
                        >
                          <IconClose className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Topic List */}
                    <div className="max-h-60 overflow-y-auto space-y-0.5 pr-1">
                      {filteredMoreTracks.map((key) => {
                        const meta = TRACK_CONFIG[key] || getTrackMeta(key);
                        const isSelected = selectedTrack === key;
                        const count = trackItemCounts[key] || 0;
                        return (
                          <button
                            key={key}
                            onClick={() => {
                              setSelectedTrack(isSelected ? "all" : key);
                              setMoreDropdownOpen(false);
                            }}
                            className={`w-full px-2.5 py-2 rounded-xl text-left text-xs flex items-center justify-between gap-2 transition-all ${
                              isSelected
                                ? "bg-purple-500/20 text-purple-200 border border-purple-500/30 font-medium"
                                : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: meta.dotColor }}
                              />
                              <span>{meta.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {count > 0 && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.08] text-slate-400 font-mono">
                                  {count}
                                </span>
                              )}
                              {isSelected && <IconCheck className="w-3.5 h-3.5 text-purple-400" />}
                            </div>
                          </button>
                        );
                      })}

                      {filteredMoreTracks.length === 0 && (
                        <div className="py-4 text-center text-xs text-slate-500">
                          No topics found matching &ldquo;{moreSearchQuery}&rdquo;
                        </div>
                      )}
                    </div>

                    {/* Reset Button (if a More track is active) */}
                    {isMoreSelected && (
                      <div className="pt-2 mt-1 border-t border-white/[0.06] px-1">
                        <button
                          onClick={() => {
                            setSelectedTrack("all");
                            setMoreDropdownOpen(false);
                          }}
                          className="w-full py-1 text-center text-[11px] text-slate-400 hover:text-rose-400 transition-colors"
                        >
                          Reset to All Topics
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* ─── Row 4: Notes Grid Layout ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 items-stretch">
            {/* Note Cards */}
            {filteredNotes.map((note) => {
              const meta = getTrackMeta(note.trackKey);
              const isMenuOpen = activeMenuId === note.id;

              return (
                <div
                  key={note.id}
                  className="bg-[#0c101a] border border-white/[0.08] hover:border-white/15 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 relative group min-h-[280px]"
                >
                  {/* Card Header: Track Badge & Actions */}
                  <div>
                    <div className="flex items-center justify-between gap-2 relative">
                      {/* Track Badge with colored dot & Content Type */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase border ${meta.badgeBg} ${meta.badgeText} ${meta.badgeBorder}`}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: meta.dotColor }}
                          />
                          {meta.key.toUpperCase()}
                        </span>

                        {note.blocks && note.blocks.length > 0 ? (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                            📓 {note.blocks.length} {note.blocks.length === 1 ? "BLOCK" : "BLOCKS"}
                          </span>
                        ) : note.noteType === "qa" ? (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                            ❓ Q&A
                          </span>
                        ) : note.noteType === "code" ? (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            💻 {note.codeData?.language?.toUpperCase() || "CODE"}
                          </span>
                        ) : null}
                      </div>

                      {/* Three dots menu */}
                      <div className="relative" data-note-menu>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(isMenuOpen ? null : note.id);
                          }}
                          className="text-slate-500 hover:text-white p-1 rounded-md hover:bg-white/[0.05] transition-colors"
                          title="Options"
                        >
                          <IconMoreHorizontal className="w-5 h-5" />
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                          <div className="absolute right-0 mt-1 w-40 bg-[#0e121d] border border-white/[0.1] rounded-xl shadow-2xl py-1 z-30">
                            <button
                              onClick={() => handleOpenEditNote(note)}
                              className="w-full px-3 py-2 text-left text-xs text-slate-300 hover:text-white hover:bg-white/[0.06] flex items-center gap-2 transition-colors"
                            >
                              <IconEdit className="w-3.5 h-3.5" />
                              <span>Edit note</span>
                            </button>
                            <button
                              onClick={() => handleCopyText(note.id, `${note.title || ""}\n\n${note.content}`)}
                              className="w-full px-3 py-2 text-left text-xs text-slate-300 hover:text-white hover:bg-white/[0.06] flex items-center gap-2 transition-colors"
                            >
                              {copiedId === note.id ? (
                                <>
                                  <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <IconCopy className="w-3.5 h-3.5" />
                                  <span>Copy note</span>
                                </>
                              )}
                            </button>
                            {note.lessonPath && (
                              <Link
                                href={note.lessonPath}
                                className="w-full px-3 py-2 text-left text-xs text-slate-300 hover:text-white hover:bg-white/[0.06] flex items-center gap-2 transition-colors"
                              >
                                <IconExternalLink className="w-3.5 h-3.5" />
                                <span>Go to lesson</span>
                              </Link>
                            )}
                            <div className="my-1 border-t border-white/[0.06]" />
                            <button
                              onClick={() =>
                                setDeleteConfirmation({
                                 id: note.id,
                                 title: note.title || "Untitled Note",
                               })
                              }
                              className="w-full px-3 py-2 text-left text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center gap-2 transition-colors"
                            >
                              <IconTrash className="w-3.5 h-3.5" />
                              <span>Delete note</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Note Title (Serif editorial font as in image) */}
                    <h3
                      onClick={() => setReadingNote(note)}
                      className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug my-4 group-hover:text-purple-100 transition-colors cursor-pointer"
                    >
                      {note.title || "Untitled Note"}
                    </h3>

                    {/* Snippet / Content Preview */}
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {note.content}
                    </p>
                  </div>

                  {/* Card Footer: Date & Read Link */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                    <span className="text-xs text-slate-500 font-medium">
                      {formatDate(note.updatedAt || note.createdAt)}
                    </span>
                    <button
                      onClick={() => setReadingNote(note)}
                      className="text-[#a78bfa] hover:text-[#c4b5fd] text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Read</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              );
            })}

            {/* "Add a note" Dashed Card (directly in grid as in mockup) */}
            <div
              onClick={handleOpenCreateNote}
              className="rounded-2xl border border-dashed border-white/[0.12] hover:border-purple-500/50 bg-white/[0.01] hover:bg-purple-500/[0.02] flex flex-col items-center justify-center min-h-[280px] p-6 text-center cursor-pointer transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#241c3a] group-hover:bg-[#322352] text-[#c084fc] flex items-center justify-center mb-3 transition-colors shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="w-5 h-5"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                Add a note
              </span>
            </div>
          </div>
      </main>

      {/* ─── Reading / Detail Modal ────────────────────────────────────────── */}
      {readingNote && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e121d] border border-white/[0.1] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase border ${getTrackMeta(readingNote.trackKey).badgeBg} ${getTrackMeta(readingNote.trackKey).badgeText} ${getTrackMeta(readingNote.trackKey).badgeBorder}`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: getTrackMeta(readingNote.trackKey).dotColor }}
                  />
                  {getTrackMeta(readingNote.trackKey).key.toUpperCase()}
                </span>

                {readingNote.blocks && readingNote.blocks.length > 0 ? (
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    📓 Notebook ({readingNote.blocks.length} {readingNote.blocks.length === 1 ? "block" : "blocks"})
                  </span>
                ) : readingNote.noteType === "qa" ? (
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    ❓ Q&A Notes
                  </span>
                ) : readingNote.noteType === "code" ? (
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    💻 Code Snippet ({readingNote.codeData?.language?.toUpperCase() || "CODE"})
                  </span>
                ) : null}
              </div>

              <button
                onClick={() => setReadingNote(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/[0.08] transition-colors"
              >
                <IconClose className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                {readingNote.title || "Untitled Note"}
              </h2>
              <p className="text-xs text-slate-500 mt-2 font-medium">
                Last updated {formatDate(readingNote.updatedAt || readingNote.createdAt)}
              </p>
            </div>

            <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed border-t border-white/[0.08] pt-4">
              <MarkdownRenderer content={readingNote.content} />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyText(readingNote.id, `${readingNote.title || ""}\n\n${readingNote.content}`)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === readingNote.id ? (
                    <>
                      <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <IconCopy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    handleOpenEditNote(readingNote);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <IconEdit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>

              {readingNote.lessonPath && (
                <Link
                  href={readingNote.lessonPath}
                  className="text-xs text-[#a78bfa] hover:text-[#c4b5fd] font-semibold flex items-center gap-1"
                >
                  <span>Go to Lesson</span>
                  <span>→</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── Create / Edit Note Modal ──────────────────────────────────────── */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e121d] border border-white/[0.1] rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-white">
                {dialogMode === "create" ? "Add Study Note" : "Edit Study Note"}
              </h2>
              <button
                onClick={() => setDialogOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/[0.08]"
              >
                <IconClose className="w-5 h-5" />
              </button>
            </div>

            {/* Track Select */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Topic / Tech Track
              </label>
              <select
                value={noteTrack}
                onChange={(e) => setNoteTrack(e.target.value)}
                className="w-full bg-[#131826] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50"
              >
                {Object.keys(TRACK_CONFIG).map((k) => (
                  <option key={k} value={k}>
                    {TRACK_CONFIG[k].label}
                  </option>
                ))}
              </select>
            </div>

            {/* Title Input */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Note Title
              </label>
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="e.g. What is Encapsulation in Object-Oriented Programming?"
                className="w-full bg-[#131826] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            {/* Write / Preview Tab switcher */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-400">
                  Note Content (Markdown supported)
                </label>
                <div className="flex items-center gap-1 bg-[#131826] p-0.5 rounded-lg border border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setModalTab("edit")}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                      modalTab === "edit" ? "bg-purple-500/20 text-purple-300" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalTab("preview")}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                      modalTab === "preview" ? "bg-purple-500/20 text-purple-300" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Preview
                  </button>
                </div>
              </div>

              {modalTab === "edit" ? (
                <>
                  <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        const prefix = noteContent.trim() ? "\n\n" : "";
                        setNoteContent(
                          noteContent +
                            prefix +
                            "### ❓ Question: [Write your question here]\n> **Answer:** [Write your answer here]"
                        );
                      }}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 transition-colors cursor-pointer"
                    >
                      + Q&A Block
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const prefix = noteContent.trim() ? "\n\n" : "";
                        setNoteContent(
                          noteContent +
                            prefix +
                            "```typescript\n// Code snippet\nconst example = true;\n```"
                        );
                      }}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition-colors cursor-pointer"
                    >
                      + Code Snippet
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const prefix = noteContent.trim() ? "\n\n" : "";
                        setNoteContent(noteContent + prefix + "- Point 1\n- Point 2\n- Point 3");
                      }}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] text-slate-300 border border-white/[0.08] hover:bg-white/[0.08] transition-colors cursor-pointer"
                    >
                      + List
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const prefix = noteContent.trim() ? "\n\n" : "";
                        setNoteContent(
                          noteContent + prefix + "> 💡 **Key Takeaway:** [Core insight here...]"
                        );
                      }}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-amber-600/20 text-amber-300 border border-amber-500/30 hover:bg-amber-600/30 transition-colors cursor-pointer"
                    >
                      + Key Insight
                    </button>
                  </div>
                  <textarea
                    rows={6}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Write your note here or use the quick buttons above to insert Q&A, Code, or Lists..."
                    className="w-full bg-[#131826] border border-white/[0.08] rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 resize-y leading-relaxed"
                  />
                </>
              ) : (
                <div className="w-full bg-[#131826] border border-white/[0.08] rounded-xl p-3 min-h-[120px] text-sm text-slate-300 max-h-48 overflow-y-auto">
                  {noteContent.trim() ? (
                    <MarkdownRenderer content={noteContent} />
                  ) : (
                    <span className="text-slate-500 italic">No content to preview</span>
                  )}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNoteDialog}
                disabled={!noteContent.trim()}
                className="px-5 py-2 rounded-xl bg-[#a78bfa] hover:bg-[#b89dfe] disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors shadow-sm"
              >
                {dialogMode === "create" ? "Create Note" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Delete Confirmation Modal ─────────────────────────────────────── */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e121d] border border-white/[0.1] rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-serif text-xl font-bold text-white">Delete Note?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Are you sure you want to delete &ldquo;{deleteConfirmation.title}&rdquo;? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="px-4 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
