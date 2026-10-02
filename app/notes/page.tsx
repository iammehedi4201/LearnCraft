"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * MY STUDY NOTES — Dedicated Notes & Highlights Workspace
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Clean, distraction-free knowledge management center for LearnCraft.
 * Organize, search, filter, edit, and export all personal notes and
 * lesson highlights taken during your learning journey.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";
import { useRevision } from "@/context/revision-context";
import {
  AnnotationItem,
  RevisionSortOption,
} from "@/types/revision";
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

const IcFolder = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const IcBook = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const IcNoteEdit = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IcBolt = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
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
  if (!raw) raw = item.selectedText || "Note";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<RevisionSortOption>("newest");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const favoritesCount = useMemo(() => {
    return annotations.filter((a) => Boolean(a.isFavorite)).length;
  }, [annotations]);

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

  // Group filtered items by topic
  const groupedByTopic = useMemo(() => {
    const map = new Map<
      string,
      { topicTitle: string; topicId: string; items: AnnotationItem[] }
    >();

    filteredAnnotations.forEach((item) => {
      if (!map.has(item.topicId)) {
        map.set(item.topicId, {
          topicId: item.topicId,
          topicTitle: item.topicTitle,
          items: [],
        });
      }
      map.get(item.topicId)!.items.push(item);
    });

    return Array.from(map.values());
  }, [filteredAnnotations]);

  // Available topics for filter chips
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
    const json = exportAnnotationsAsJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `LearnCraft-Notes-Backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
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

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const COLOR_BORDER: Record<string, string> = {
    feature: "bg-ds-feature-base",
    away: "bg-ds-away-base",
    success: "bg-ds-success-base",
    info: "bg-ds-info-base",
    highlighted: "bg-amber-400",
  };

  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-ds-text-strong font-sans selection:bg-ds-feature-light/20">
      <Nav />

      <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {/* Import status banner */}
        {importStatus && (
          <div className="mb-4 px-4 py-2.5 rounded-xl bg-ds-success-lighter border border-ds-success-base text-xs font-bold text-ds-success-dark flex items-center gap-2">
            <IcCheck /> {importStatus}
          </div>
        )}

        {/* PAGE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-ds-text-strong font-display">
              My Study Notes & Highlights
            </h1>

            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1.5">
              <span className="text-xs text-ds-text-sub font-medium">
                {stats.total} items saved
              </span>
              <span className="text-ds-stroke-soft">&middot;</span>
              <span className="text-xs text-ds-feature-dark font-bold">
                {stats.notesCount} notes
              </span>
              <span className="text-ds-stroke-soft">&middot;</span>
              <span className="text-xs text-ds-away-dark font-bold">
                {stats.highlightsCount} highlights
              </span>
              <span className="text-ds-stroke-soft">&middot;</span>
              <span className="text-xs text-amber-400 font-bold">
                {favoritesCount} starred
              </span>
              <span className="text-ds-stroke-soft">&middot;</span>
              <span className="text-xs text-ds-success-dark font-bold">
                {stats.topicsCount} topics
              </span>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <Link
              href="/revision"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <IcBolt />
              <span>Go to Quick Revision</span>
            </Link>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl bg-ds-bg-white hover:bg-ds-bg-soft text-ds-text-strong font-bold text-xs transition-all active:scale-95 shadow-sm flex items-center gap-1.5 cursor-pointer"
              title="Import JSON backup"
            >
              <IcImport /> Import
            </button>
            <button
              onClick={handleExportMarkdown}
              className="px-3.5 py-2 rounded-xl bg-ds-bg-white hover:bg-ds-bg-soft text-ds-text-strong font-bold text-xs transition-all active:scale-95 shadow-sm flex items-center gap-1.5 cursor-pointer"
              title="Export as Markdown"
            >
              <IcDocument /> Markdown
            </button>
            <button
              onClick={handleExportJson}
              className="px-3.5 py-2 rounded-xl bg-ds-bg-white hover:bg-ds-bg-soft text-ds-text-strong font-bold text-xs transition-all active:scale-95 shadow-sm flex items-center gap-1.5 cursor-pointer"
              title="JSON backup"
            >
              <IcSave /> JSON
            </button>
            <button
              onClick={() => {
                if (confirm("Reset and load sample revision notes?"))
                  clearAllAnnotations(true);
              }}
              className="px-3 py-2 rounded-xl text-ds-text-soft hover:text-ds-text-strong text-xs font-bold transition-all hover:bg-ds-bg-weak cursor-pointer"
            >
              Restore Samples
            </button>
          </div>
        </div>

        {/* NAVIGATION & FILTER BAR */}
        <div className="flex items-center gap-2 p-1.5 bg-ds-bg-white rounded-2xl shadow-sm mb-6 flex-wrap">
          <div className="flex items-center gap-1">
            {[
              {
                key: "all",
                icon: <IcGrid />,
                label: "All Items",
                count: stats.total,
              },
              {
                key: "notes",
                icon: <IcNote />,
                label: "Notes",
                count: stats.notesCount,
              },
              {
                key: "highlights",
                icon: <IcHighlight />,
                label: "Highlights",
                count: stats.highlightsCount,
              },
              {
                key: "favorites",
                icon: <IcStar filled={true} />,
                label: "Starred",
                count: favoritesCount,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as NotesFilterTab)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? "bg-ds-feature-base text-ds-static-white shadow-sm"
                    : "text-ds-text-sub hover:text-ds-text-strong hover:bg-ds-bg-weak"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 rounded-full font-mono ${
                      activeTab === tab.key
                        ? "bg-ds-static-white/20 text-ds-static-white"
                        : "bg-ds-bg-soft text-ds-text-sub"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-ds-stroke-soft mx-1 hidden sm:block" />

          {/* Search Input */}
          <div className="relative flex-1 min-w-[180px]">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ds-text-soft pointer-events-none">
              <IcSearch />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes, code snippets, lessons..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-ds-bg-weak text-xs text-ds-text-strong placeholder:text-ds-text-disabled focus:ring-2 focus:ring-ds-feature-base/20 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ds-text-soft hover:text-ds-text-strong font-bold text-sm leading-none"
              >
                &times;
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as RevisionSortOption)}
            className="px-3 py-2 rounded-xl bg-ds-bg-weak text-xs font-bold text-ds-text-sub outline-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="topic">By Topic</option>
            <option value="lesson">By Lesson</option>
          </select>
        </div>

        {/* MAIN NOTES CONTENT AREA */}
        <div className="flex gap-6 items-start">
          {/* Left Sidebar (Topics list) */}
          <aside className="w-52 shrink-0 hidden lg:flex flex-col gap-1 sticky top-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-ds-text-soft px-2.5 mb-1">
              Topics
            </h3>
            <button
              onClick={() => setSelectedTopic("all")}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                selectedTopic === "all"
                  ? "bg-ds-feature-base text-ds-static-white shadow-sm"
                  : "text-ds-text-strong hover:bg-ds-bg-white hover:shadow-sm"
              }`}
            >
              <IcFolder />
              <span className="flex-1">All Topics</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  selectedTopic === "all"
                    ? "bg-ds-static-white/20 text-ds-static-white"
                    : "bg-ds-bg-soft text-ds-text-soft"
                }`}
              >
                {stats.total}
              </span>
            </button>
            {availableTopics.map((topic) => {
              const isActive = selectedTopic === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    isActive
                      ? "bg-ds-feature-base text-ds-static-white shadow-sm"
                      : "text-ds-text-strong hover:bg-ds-bg-white hover:shadow-sm"
                  }`}
                >
                  <IcFolder />
                  <span className="flex-1 truncate">{topic.title}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full shrink-0 ${
                      isActive
                        ? "bg-ds-static-white/20 text-ds-static-white"
                        : "bg-ds-bg-soft text-ds-text-soft"
                    }`}
                  >
                    {topic.count}
                  </span>
                </button>
              );
            })}
          </aside>

          {/* Notes Grid */}
          <div className="flex-1 min-w-0">
            {/* Mobile topic chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-5 lg:hidden scrollbar-none">
              <button
                onClick={() => setSelectedTopic("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 border transition-all ${
                  selectedTopic === "all"
                    ? "bg-ds-feature-base text-ds-static-white border-ds-feature-base"
                    : "bg-ds-bg-white text-ds-text-sub border-white/[0.08]"
                }`}
              >
                All ({stats.total})
              </button>
              {availableTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 border transition-all ${
                    selectedTopic === topic.id
                      ? "bg-ds-feature-base text-ds-static-white border-ds-feature-base"
                      : "bg-ds-bg-white text-ds-text-sub border-white/[0.08]"
                  }`}
                >
                  {topic.title}{" "}
                  <span className="text-[10px] font-mono opacity-70 ml-1">
                    {topic.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Empty state */}
            {groupedByTopic.length === 0 ? (
              <div className="py-20 text-center bg-ds-bg-white rounded-3xl border border-white/[0.08]">
                <div className="w-16 h-16 rounded-2xl bg-ds-feature-lighter text-ds-feature-dark flex items-center justify-center mx-auto mb-4">
                  <IcNoteEdit />
                </div>
                <h3 className="text-lg font-bold text-ds-text-strong font-display">
                  {searchQuery ? "No matching notes found" : "No notes saved yet"}
                </h3>
                <p className="text-sm text-ds-text-sub mt-2 max-w-xs mx-auto leading-relaxed">
                  {searchQuery
                    ? `No notes or highlights match "${searchQuery}".`
                    : "Select any text in a lesson to save a highlight or add a personal note."}
                </p>
                {!searchQuery && (
                  <div className="mt-6">
                    <Link
                      href="/learn/nestjs/nj02-oop-foundations"
                      className="inline-flex px-5 py-2.5 rounded-xl bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white text-xs font-bold transition-all shadow-md"
                    >
                      Browse Lessons
                      <svg
                        className="w-3 h-3 ml-1.5 mt-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-10">
                {groupedByTopic.map((group) => (
                  <div key={group.topicId}>
                    {/* Topic heading */}
                    <div className="flex items-center gap-3 pb-3 mb-4">
                      <div className="w-8 h-8 rounded-xl bg-ds-feature-lighter/80 flex items-center justify-center text-ds-feature-dark shrink-0">
                        <IcFolder />
                      </div>
                      <h2 className="text-lg font-black text-ds-text-strong font-display tracking-tight">
                        {group.topicTitle}
                      </h2>
                      <span className="text-[11px] font-bold text-ds-text-soft font-mono px-2.5 py-0.5 rounded-full bg-ds-bg-weak">
                        {group.items.length}{" "}
                        {group.items.length === 1 ? "item" : "items"}
                      </span>
                    </div>

                    {/* Cards grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {group.items.map((item) => {
                        const colorKey = item.color || "feature";
                        const questionTitle = extractQuestion(item);

                        return (
                          <div
                            key={item.id}
                            className="flex flex-col rounded-2xl bg-ds-bg-white shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group border border-white/[0.06]"
                          >
                            {/* Accent stripe */}
                            <div
                              className={`h-1 w-full ${COLOR_BORDER[colorKey] || "bg-ds-feature-base"}`}
                            />

                            <div className="p-4 flex flex-col gap-3 flex-1">
                              {/* Card header */}
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="text-[10px] font-bold text-ds-text-soft uppercase tracking-wider truncate">
                                    {item.topicTitle}
                                  </p>
                                  <div className="flex items-center gap-1.5 text-xs font-semibold text-ds-text-strong truncate mt-0.5">
                                    <IcBook />
                                    <span className="truncate">
                                      {item.lessonTitle}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    onClick={() => toggleFavorite(item.id)}
                                    className={`p-1.5 rounded-lg transition-all active:scale-90 cursor-pointer ${
                                      item.isFavorite
                                        ? "text-amber-500"
                                        : "text-ds-text-disabled hover:text-amber-400"
                                    }`}
                                    title={
                                      item.isFavorite
                                        ? "Starred"
                                        : "Star this note"
                                    }
                                  >
                                    <IcStar filled={item.isFavorite ?? false} />
                                  </button>
                                  <button
                                    onClick={() => toggleMastered(item.id)}
                                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                                      item.mastered
                                        ? "bg-ds-success-lighter text-ds-success-dark"
                                        : "bg-ds-bg-weak text-ds-text-soft hover:text-ds-text-strong"
                                    }`}
                                    title={
                                      item.mastered
                                        ? "Mastered"
                                        : "Mark as mastered"
                                    }
                                  >
                                    {item.mastered ? "Mastered" : "Review"}
                                  </button>
                                </div>
                              </div>

                              {/* Clickable Note Body / Question */}
                              <div
                                onClick={() => openNoteDialog(item)}
                                className="cursor-pointer group/q py-2 flex-1 flex flex-col justify-between gap-2.5 rounded-xl hover:bg-ds-bg-weak/40 p-2.5 -mx-2.5 transition-colors"
                                title="Click to view full note in side panel"
                              >
                                <div>
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ds-feature-lighter/70 text-ds-feature-dark font-bold text-[10px] uppercase tracking-wider mb-2">
                                    {item.note ? "Note" : "Highlight"}
                                  </span>
                                  <h3 className="text-base font-bold text-ds-text-strong group-hover/q:text-ds-feature-base transition-colors leading-snug font-display">
                                    {questionTitle}
                                  </h3>
                                </div>

                                {item.note ? (
                                  <div className="text-xs text-ds-text-sub line-clamp-3 leading-relaxed">
                                    <MarkdownRenderer content={item.note} />
                                  </div>
                                ) : (
                                  <blockquote className="text-xs text-ds-text-sub italic line-clamp-2">
                                    &ldquo;{item.selectedText}&rdquo;
                                  </blockquote>
                                )}

                                <div className="flex items-center gap-1 text-xs font-semibold text-ds-feature-base group-hover/q:translate-x-0.5 transition-transform pt-1">
                                  <span>View full note</span>
                                  <svg
                                    className="w-3.5 h-3.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                  >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                  </svg>
                                </div>
                              </div>

                              {/* Saved Date */}
                              <div className="flex items-center justify-between text-[10px] text-ds-text-disabled pt-1">
                                <span>
                                  Saved {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            {/* Card footer */}
                            <div className="px-4 py-3 bg-ds-bg-weak/30 flex items-center justify-between gap-2">
                              <button
                                onClick={() => handleGoToLesson(item)}
                                className="px-3.5 py-1.5 rounded-xl bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white text-xs font-bold transition-all active:scale-95 shadow-sm flex items-center gap-1.5 cursor-pointer"
                              >
                                Lesson
                                <svg
                                  className="w-3 h-3"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                >
                                  <path d="M5 12h14" />
                                  <path d="m12 5 7 7-7 7" />
                                </svg>
                              </button>

                              <div className="flex items-center gap-0.5">
                                <button
                                  onClick={() =>
                                    handleCopySnippet(
                                      item.note || item.selectedText || questionTitle,
                                      item.id,
                                    )
                                  }
                                  className="p-2 rounded-xl text-ds-text-soft hover:text-ds-text-strong hover:bg-ds-bg-soft transition-colors cursor-pointer"
                                  title="Copy text"
                                >
                                  {copiedId === item.id ? (
                                    <IcCheck />
                                  ) : (
                                    <IcCopy />
                                  )}
                                </button>
                                <button
                                  onClick={() => openNoteDialog(item)}
                                  className="p-2 rounded-xl text-ds-text-soft hover:text-ds-text-strong hover:bg-ds-bg-soft transition-colors cursor-pointer"
                                  title="Open note in side panel"
                                >
                                  <IcEdit />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm("Delete this item?"))
                                      deleteAnnotation(item.id);
                                  }}
                                  className="p-2 rounded-xl text-ds-text-soft hover:text-ds-error-base hover:bg-ds-error-lighter transition-colors cursor-pointer"
                                  title="Delete"
                                >
                                  <IcTrash />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
