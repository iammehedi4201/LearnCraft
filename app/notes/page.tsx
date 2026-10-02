"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * MY STUDY NOTES — Simple, Clean Personal Notes & Highlights Center
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Distraction-free workspace to search, filter, edit, and organize all
 * personal notes and highlights taken across LearnCraft lessons.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { openAuthModal } from "@/components/auth-modal";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";
import { useRevision } from "@/context/revision-context";
import { AnnotationItem, RevisionSortOption } from "@/types/revision";
import {
  exportAnnotationsAsMarkdown,
  exportAnnotationsAsJson,
  importAnnotationsFromJson,
  clearAllAnnotations,
} from "@/lib/revision-storage";
import { MarkdownRenderer } from "@/components/revision/MarkdownRenderer";

type NotesFilterTab = "all" | "notes" | "highlights" | "favorites";

// ─── Icons ────────────────────────────────────────────────────────────────────
const IcSearch = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const IcImport = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IcDocument = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const IcSave = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const IcGrid = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

const IcNote = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const IcHighlight = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m9 11-6 6v3h9l3-3" />
    <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
  </svg>
);

const IcStar = ({ filled }: { filled: boolean }) => (
  <svg
    className="w-3.5 h-3.5"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IcEdit = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IcTrash = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const IcCopy = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const IcCheck = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="m5 13 4 4L19 7" />
  </svg>
);

const IcBolt = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IcDots = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="19" cy="12" r="1.5" />
    <circle cx="5" cy="12" r="1.5" />
  </svg>
);

// ─── Extract Question / Heading ───────────────────────────────────────────────
function extractQuestion(item: AnnotationItem): string {
  let raw = "";
  if (item.question && item.question.trim()) {
    raw = item.question.trim();
  } else if (item.note) {
    const headingMatch = item.note.match(/^#{1,6}\s*(.*)/m);
    if (headingMatch && headingMatch[1].trim()) {
      return headingMatch[1].trim();
    }
    const firstLine = item.note.split("\n").find((l) => l.trim().length > 0);
    if (firstLine) {
      raw = firstLine;
    }
  }
  if (!raw) raw = item.selectedText || "Study Note";

  return raw
    .replace(/^#{1,6}\s*/, "")
    .replace(/^\*\*/, "")
    .replace(/\*\*$/, "")
    .replace(/^>\s*/, "")
    .replace(/^[-*+]\s*/, "")
    .trim();
}

export default function NotesPage(): JSX.Element {
  const router = useRouter();
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const optionsMenuRef = useRef<HTMLDivElement>(null);

  const {
    annotations,
    stats,
    openNoteDialog,
    deleteAnnotation,
    toggleFavorite,
    toggleMastered,
  } = useRevision();

  const [activeTab, setActiveTab] = useState<NotesFilterTab>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("" );
  const [sortBy, setSortBy] = useState<RevisionSortOption>("newest");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<boolean>(false);

  const favoritesCount = useMemo(() => {
    return annotations.filter((a) => Boolean(a.isFavorite)).length;
  }, [annotations]);

  // Click outside to close options menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        optionsMenuRef.current &&
        !optionsMenuRef.current.contains(e.target as Node)
      ) {
        setIsOptionsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter & search annotations
  const filteredAnnotations = useMemo(() => {
    let list = [...annotations];

    // Tab filter
    if (activeTab === "highlights") {
      list = list.filter(
        (item) =>
          (!item.note || item.note.trim().length === 0) &&
          (!item.question || item.question.trim().length === 0),
      );
    } else if (activeTab === "notes") {
      list = list.filter(
        (item) =>
          Boolean(item.note && item.note.trim().length > 0) ||
          Boolean(item.question && item.question.trim().length > 0),
      );
    } else if (activeTab === "favorites") {
      list = list.filter((item) => Boolean(item.isFavorite));
    }

    // Topic filter
    if (selectedTopic !== "all") {
      list = list.filter((item) => item.topicId === selectedTopic);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.selectedText.toLowerCase().includes(q) ||
          (item.note && item.note.toLowerCase().includes(q)) ||
          item.lessonTitle.toLowerCase().includes(q) ||
          item.topicTitle.toLowerCase().includes(q),
      );
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === "topic") {
        return a.topicTitle.localeCompare(b.topicTitle);
      }
      if (sortBy === "lesson") {
        return a.lessonTitle.localeCompare(b.lessonTitle);
      }
      return 0;
    });

    return list;
  }, [annotations, activeTab, selectedTopic, searchQuery, sortBy]);

  // Available topics for dropdown
  const availableTopics = useMemo(() => {
    const topicCounts: Record<string, { title: string; count: number }> = {};
    annotations.forEach((item) => {
      if (!topicCounts[item.topicId]) {
        topicCounts[item.topicId] = { title: item.topicTitle, count: 0 };
      }
      topicCounts[item.topicId].count++;
    });
    return Object.entries(topicCounts).map(([id, data]) => ({
      id,
      title: data.title,
      count: data.count,
    }));
  }, [annotations]);

  // Copy snippet handler
  const handleCopySnippet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export handlers
  const handleExportMarkdown = () => {
    setIsOptionsMenuOpen(false);
    const md = exportAnnotationsAsMarkdown();
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `LearnCraft-Notes-${new Date().toISOString().split("T")[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJson = () => {
    setIsOptionsMenuOpen(false);
    const json = exportAnnotationsAsJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `LearnCraft-Notes-Backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOptionsMenuOpen(false);
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importAnnotationsFromJson(content);
        if (result.success) {
          setImportStatus(`Successfully imported ${result.count} items!`);
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          alert(`Failed to import: ${result.error || "Invalid file"}`);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Deep-link to lesson
  const handleGoToLesson = (item: AnnotationItem) => {
    const sectionQuery = item.sectionId
      ? `&section=${encodeURIComponent(item.sectionId)}`
      : "";
    router.push(
      `${item.lessonPath}?highlightId=${encodeURIComponent(item.id)}${sectionQuery}`,
    );
  };

  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-ds-text-strong font-sans selection:bg-ds-feature-light/20">
      <Nav />

      <main className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {/* Import status banner */}
        {importStatus && (
          <div className="mb-4 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 flex items-center gap-2">
            <IcCheck /> {importStatus}
          </div>
        )}

        {/* ─── SIMPLE CLEAN HEADER ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
              My Study Notes
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Organize, search, and manage your notes and key takeaways.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/revision"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <IcBolt />
              <span>Quick Revision</span>
            </Link>

            {/* Options Dropdown Menu */}
            <div className="relative" ref={optionsMenuRef}>
              <button
                onClick={() => setIsOptionsMenuOpen((prev) => !prev)}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-center"
                title="Backup & options"
              >
                <IcDots />
              </button>

              {isOptionsMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-2xl p-1.5 z-50 animate-in fade-in duration-150">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleFileImport}
                    className="hidden"
                  />
                  <button
                    onClick={() => {
                      setIsOptionsMenuOpen(false);
                      fileInputRef.current?.click();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.04] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <IcImport />
                    <span>Import Backup (.json)</span>
                  </button>
                  <button
                    onClick={handleExportMarkdown}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.04] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <IcDocument />
                    <span>Export Markdown (.md)</span>
                  </button>
                  <button
                    onClick={handleExportJson}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.04] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <IcSave />
                    <span>Export JSON (.json)</span>
                  </button>
                  <div className="h-px bg-white/[0.06] my-1" />
                  <button
                    onClick={() => {
                      setIsOptionsMenuOpen(false);
                      if (confirm("Reset notes and reload samples?")) {
                        clearAllAnnotations(true);
                      }
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Restore Samples</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── CLOUD SYNC & GUEST STATUS BANNER ─── */}
        {session?.user ? (
          <div className="mb-6 px-4 py-2.5 rounded-xl bg-purple-500/[0.06] border border-purple-500/15 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">☁️</span>
              <span>
                <strong className="text-white">Cloud Sync Active</strong> — Logged in as <span className="text-purple-300 font-mono">@{session.user.name || "user"}</span>. Your notes & highlights are securely backed up.
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md font-bold">Synced</span>
          </div>
        ) : (
          <div className="mb-6 px-4 py-2.5 rounded-xl bg-amber-500/[0.06] border border-amber-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-amber-400">💾</span>
              <span>
                <strong className="text-white">Local Storage Active</strong> — Notes and highlights are saved in this browser. Sign in with GitHub to backup and sync across devices.
              </span>
            </div>
            <button
              onClick={() => openAuthModal()}
              className="px-3 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <span>Sign in with GitHub</span>
              <span className="text-purple-400">→</span>
            </button>
          </div>
        )}

        {/* ─── SIMPLE UNIFIED FILTER BAR ─── */}
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          {/* View / Type Filter Tabs */}
          <div className="flex items-center p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl flex-wrap">
            {[
              { key: "all", label: "All Items", count: annotations.length, icon: <IcGrid /> },
              { key: "notes", label: "Notes", count: stats.notesCount, icon: <IcNote /> },
              { key: "highlights", label: "Highlights", count: stats.highlightsCount, icon: <IcHighlight /> },
              { key: "favorites", label: "Starred", count: favoritesCount, icon: <IcStar filled={true} /> },
            ].map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as NotesFilterTab)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-white/[0.05] text-slate-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar & Dropdown Selectors */}
          <div className="flex items-center gap-2 flex-1 justify-end flex-wrap min-w-[280px]">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xs min-w-[160px]">
              <span className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <IcSearch />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes..."
                className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Topic Filter Dropdown */}
            {availableTopics.length > 1 && (
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-bold text-slate-300 outline-none cursor-pointer"
              >
                <option value="all" className="bg-[#0E121B] text-white">
                  All Topics ({annotations.length})
                </option>
                {availableTopics.map((t) => (
                  <option key={t.id} value={t.id} className="bg-[#0E121B] text-white">
                    {t.title} ({t.count})
                  </option>
                ))}
              </select>
            )}

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as RevisionSortOption)}
              className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-bold text-slate-300 outline-none cursor-pointer"
            >
              <option value="newest" className="bg-[#0E121B] text-white">Newest</option>
              <option value="oldest" className="bg-[#0E121B] text-white">Oldest</option>
              <option value="topic" className="bg-[#0E121B] text-white">By Topic</option>
              <option value="lesson" className="bg-[#0E121B] text-white">By Lesson</option>
            </select>
          </div>
        </div>

        {/* ─── NOTES FULL-WIDTH RESPONSIVE GRID ─── */}
        {filteredAnnotations.length === 0 ? (
          <div className="py-20 text-center bg-white/[0.02] border border-white/[0.06] rounded-3xl">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-3 text-xl">
              📝
            </div>
            <h3 className="text-base font-bold text-white font-display">
              {searchQuery ? "No matching notes found" : "No study notes saved yet"}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
              {searchQuery
                ? `No items match "${searchQuery}". Try a different keyword.`
                : "Highlight or take notes while studying lessons to build your personal knowledge base."}
            </p>
            {!searchQuery && (
              <div className="mt-4">
                <Link
                  href="/learn/nestjs/nj02-oop-foundations"
                  className="inline-flex px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all"
                >
                  Browse Lessons
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAnnotations.map((item) => {
              const questionTitle = extractQuestion(item);

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all flex flex-col justify-between gap-3 group"
                >
                  <div>
                    {/* Header: Topic, Star & Mastered Toggle */}
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2 gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-[10px] font-bold uppercase truncate max-w-[140px]">
                        {item.topicTitle}
                      </span>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => toggleFavorite(item.id)}
                          className={`p-1 rounded-lg transition-all active:scale-90 cursor-pointer ${
                            item.isFavorite
                              ? "text-amber-400"
                              : "text-slate-500 hover:text-amber-400"
                          }`}
                          title={item.isFavorite ? "Starred" : "Star this note"}
                        >
                          <IcStar filled={Boolean(item.isFavorite)} />
                        </button>
                        <button
                          onClick={() => toggleMastered(item.id)}
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                            item.mastered
                              ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20"
                              : "bg-white/[0.04] text-slate-400 hover:text-white"
                          }`}
                          title={item.mastered ? "Mastered" : "Mark as mastered"}
                        >
                          {item.mastered ? "Mastered" : "Review"}
                        </button>
                      </div>
                    </div>

                    {/* Lesson Title */}
                    <p className="text-[11px] text-slate-400 truncate mb-1.5 font-medium">
                      {item.lessonTitle}
                    </p>

                    {/* Question / Note title */}
                    <div
                      onClick={() => openNoteDialog(item)}
                      className="cursor-pointer group/title"
                      title="Click to view & edit full note"
                    >
                      <h4 className="text-sm font-bold text-white group-hover/title:text-purple-300 transition-colors leading-snug font-display">
                        {questionTitle}
                      </h4>

                      {/* Note or Highlight snippet */}
                      <div className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {item.note ? (
                          <MarkdownRenderer content={item.note} />
                        ) : (
                          <blockquote className="italic text-slate-300 border-l-2 border-purple-500/40 pl-2">
                            &ldquo;{item.selectedText}&rdquo;
                          </blockquote>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer: Lesson link & Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.04] text-xs">
                    <button
                      onClick={() => handleGoToLesson(item)}
                      className="text-purple-400 hover:text-purple-300 font-bold hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Lesson</span>
                      <span>→</span>
                    </button>

                    <div className="flex items-center gap-0.5">
                      <button
                        onClick={() =>
                          handleCopySnippet(
                            item.note || item.selectedText || questionTitle,
                            item.id,
                          )
                        }
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                        title="Copy text snippet"
                      >
                        {copiedId === item.id ? <IcCheck /> : <IcCopy />}
                      </button>
                      <button
                        onClick={() => openNoteDialog(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                        title="Edit note"
                      >
                        <IcEdit />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Delete this note?")) {
                            deleteAnnotation(item.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Delete note"
                      >
                        <IcTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
