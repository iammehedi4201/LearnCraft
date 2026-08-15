"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * MY REVISION HUB — Dedicated Revision & Spaced Memory Dashboard
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Clean, high-impact revision center for LearnCraft. Organizes all saved
 * highlights and personal notes by topic and lesson, provides instant
 * deep-linking back to original lessons, and offers an interactive flashcard
 * mode for rapid concept refresh.
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
  RevisionViewTab,
  RevisionSortOption,
} from "@/types/revision";
import { TOPICS_META } from "@/lib/topic-registry";
import {
  exportAnnotationsAsMarkdown,
  exportAnnotationsAsJson,
  importAnnotationsFromJson,
  clearAllAnnotations,
} from "@/lib/revision-storage";

export default function MyRevisionPage(): JSX.Element {
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

  const [activeTab, setActiveTab] = useState<RevisionViewTab>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<RevisionSortOption>("newest");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Flashcard mode state
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  // Filter & search annotations
  const filteredAnnotations = useMemo(() => {
    let list = [...annotations];

    // Tab filter
    if (activeTab === "highlights") {
      list = list.filter(
        (item) =>
          (!item.note || item.note.trim().length === 0) &&
          (!item.question || item.question.trim().length === 0)
      );
    } else if (activeTab === "notes") {
      list = list.filter(
        (item) =>
          Boolean(item.note && item.note.trim().length > 0) ||
          Boolean(item.question && item.question.trim().length > 0)
      );
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
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sortBy === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
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

  // Group filtered items by topic for structured hierarchical view
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

  // Download export handlers
  const handleExportMarkdown = () => {
    const md = exportAnnotationsAsMarkdown();
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `LearnCraft-Revisions-${new Date().toISOString().split("T")[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJson = () => {
    const json = exportAnnotationsAsJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `LearnCraft-Revisions-Backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Navigate to lesson with deep link
  const handleGoToLesson = (item: AnnotationItem) => {
    const sectionQuery = item.sectionId ? `&section=${encodeURIComponent(item.sectionId)}` : "";
    router.push(`${item.lessonPath}?highlightId=${encodeURIComponent(item.id)}${sectionQuery}`);
  };

  // Flashcard controls
  const currentFlashcard = filteredAnnotations[flashcardIndex] || null;

  const nextFlashcard = () => {
    setIsCardFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % filteredAnnotations.length);
  };

  const prevFlashcard = () => {
    setIsCardFlipped(false);
    setFlashcardIndex((prev) =>
      prev === 0 ? filteredAnnotations.length - 1 : prev - 1,
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

  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-ds-text-strong font-sans selection:bg-ds-feature-light/20 pb-24">
      {/* Global Navigation */}
      <Nav />

      <main className="max-w-[95rem] mx-auto px-6 lg:px-8 pt-8 pb-16">
        {/* Header Hero Banner */}
        <section className="relative overflow-hidden p-8 lg:p-10 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="px-3 py-1 text-[10px] font-black tracking-widest uppercase bg-ds-feature-lighter text-ds-feature-dark rounded-full border border-ds-feature-light/40">
                  ⚡ Fast Memory Refresh
                </span>
                <span className="text-xs text-ds-text-soft">
                  {stats.total} total items saved
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-ds-text-strong font-display">
                My Revision Hub
              </h1>
              <p className="text-ds-text-sub text-sm sm:text-base mt-3 leading-relaxed">
                Review your highlights, memory hooks, and personal notes at a
                glance. Revisit critical mental models before coding or jump
                directly to original lessons.
              </p>
              {importStatus && (
                <div className="mt-3 p-2.5 rounded-xl bg-ds-success-lighter border border-ds-success-base text-xs font-bold text-ds-success-dark">
                  {importStatus}
                </div>
              )}
            </div>

            {/* Quick Export / Actions Bar */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 rounded-xl bg-ds-bg-weak hover:bg-ds-bg-soft text-ds-text-strong border border-ds-stroke-soft font-bold text-xs transition-all active:scale-95 flex items-center gap-2"
                title="Import JSON backup"
              >
                <span>📥</span>
                <span>Import Backup</span>
              </button>
              <button
                onClick={handleExportMarkdown}
                className="px-4 py-2.5 rounded-xl bg-ds-bg-weak hover:bg-ds-bg-soft text-ds-text-strong border border-ds-stroke-soft font-bold text-xs transition-all active:scale-95 flex items-center gap-2"
                title="Export as Markdown notes"
              >
                <span>📄</span>
                <span>Export Markdown</span>
              </button>
              <button
                onClick={handleExportJson}
                className="px-4 py-2.5 rounded-xl bg-ds-bg-weak hover:bg-ds-bg-soft text-ds-text-strong border border-ds-stroke-soft font-bold text-xs transition-all active:scale-95 flex items-center gap-2"
                title="Backup as JSON"
              >
                <span>💾</span>
                <span>JSON Backup</span>
              </button>
              <button
                onClick={() => {
                  if (confirm("Reset and load sample revision notes?")) {
                    clearAllAnnotations(true);
                  }
                }}
                className="px-3 py-2.5 rounded-xl text-ds-text-soft hover:text-ds-text-strong hover:bg-ds-bg-weak text-xs font-bold transition-all"
                title="Load sample items"
              >
                Restore Samples
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-ds-stroke-soft">
            <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
              <span className="text-[10px] font-black uppercase tracking-wider text-ds-text-soft block mb-1">
                Total Saved
              </span>
              <p className="text-2xl sm:text-3xl font-black text-ds-text-strong">
                {stats.total}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
              <span className="text-[10px] font-black uppercase tracking-wider text-ds-feature-dark block mb-1">
                Personal Notes
              </span>
              <p className="text-2xl sm:text-3xl font-black text-ds-feature-base">
                {stats.notesCount}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
              <span className="text-[10px] font-black uppercase tracking-wider text-ds-away-dark block mb-1">
                Text Highlights
              </span>
              <p className="text-2xl sm:text-3xl font-black text-ds-away-base">
                {stats.highlightsCount}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
              <span className="text-[10px] font-black uppercase tracking-wider text-ds-success-dark block mb-1">
                Topics Covered
              </span>
              <p className="text-2xl sm:text-3xl font-black text-ds-success-base">
                {stats.topicsCount}
              </p>
            </div>
          </div>
        </section>

        {/* View Tabs & Control Center */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-ds-stroke-soft">
            {/* Primary Category Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-ds-bg-white border border-ds-stroke-soft rounded-2xl shadow-sm self-start">
              {[
                {
                  key: "all",
                  label: "All Items",
                  icon: "📚",
                  count: stats.total,
                },
                {
                  key: "notes",
                  label: "Notes Only",
                  icon: "📝",
                  count: stats.notesCount,
                },
                {
                  key: "highlights",
                  label: "Highlights",
                  icon: "🖍️",
                  count: stats.highlightsCount,
                },
                { key: "flashcards", label: "⚡ Flashcard Mode", icon: "🃏" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key as RevisionViewTab);
                    setIsCardFlipped(false);
                    setFlashcardIndex(0);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === tab.key
                      ? "bg-ds-feature-base text-ds-static-white shadow-sm"
                      : "text-ds-text-sub hover:text-ds-text-strong hover:bg-ds-bg-weak"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
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

            {/* Search & Sort Controls */}
            <div className="flex items-center gap-3">
              {/* Search input */}
              <div className="relative min-w-[240px] sm:min-w-[300px]">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ds-text-soft text-sm">
                  🔍
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search highlights, notes, lessons..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-ds-bg-white border border-ds-stroke-soft text-xs text-ds-text-strong placeholder:text-ds-text-disabled focus:border-ds-feature-base focus:ring-1 focus:ring-ds-feature-base/20 outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ds-text-soft hover:text-ds-text-strong"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as RevisionSortOption)
                }
                className="px-3 py-2 rounded-xl bg-ds-bg-white border border-ds-stroke-soft text-xs font-bold text-ds-text-sub focus:text-ds-text-strong outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="topic">By Topic</option>
                <option value="lesson">By Lesson</option>
              </select>
            </div>
          </div>

          {/* Topic Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
            <button
              onClick={() => setSelectedTopic("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all border ${
                selectedTopic === "all"
                  ? "bg-ds-bg-strong text-ds-text-white border-ds-bg-strong shadow-sm"
                  : "bg-ds-bg-white text-ds-text-sub hover:text-ds-text-strong border-ds-stroke-soft"
              }`}
            >
              All Topics ({stats.total})
            </button>
            {availableTopics.map((topic) => {
              const meta = TOPICS_META[topic.id];
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all border flex items-center gap-1.5 ${
                    selectedTopic === topic.id
                      ? "bg-ds-feature-base text-ds-static-white border-ds-feature-base shadow-sm"
                      : "bg-ds-bg-white text-ds-text-sub hover:text-ds-text-strong border-ds-stroke-soft"
                  }`}
                >
                  <span>{meta?.icon || "📌"}</span>
                  <span>{topic.title}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      selectedTopic === topic.id
                        ? "bg-ds-static-white/20 text-ds-static-white"
                        : "bg-ds-bg-weak text-ds-text-soft"
                    }`}
                  >
                    {topic.count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── FLASHCARD MODE VIEW ── */}
        {activeTab === "flashcards" ? (
          <section className="max-w-3xl mx-auto py-8">
            {filteredAnnotations.length === 0 ? (
              <div className="p-12 text-center bg-ds-bg-white rounded-3xl border border-ds-stroke-soft">
                <p className="text-4xl mb-3">📭</p>
                <h3 className="text-lg font-bold text-ds-text-strong">
                  No cards to review
                </h3>
                <p className="text-xs text-ds-text-sub mt-1">
                  Adjust your search or topic filter to load cards.
                </p>
              </div>
            ) : currentFlashcard ? (
              <div className="flex flex-col gap-6">
                {/* Progress bar */}
                <div className="flex items-center justify-between text-xs font-bold text-ds-text-sub">
                  <span>
                    Card {flashcardIndex + 1} of {filteredAnnotations.length}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-ds-feature-lighter text-ds-feature-dark text-[10px] uppercase tracking-wider font-black">
                      {currentFlashcard.topicTitle}
                    </span>
                    <span>{currentFlashcard.lessonTitle}</span>
                  </span>
                </div>

                {/* Flip Card */}
                <div
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                  className="min-h-[340px] p-8 sm:p-10 rounded-3xl bg-ds-bg-white border-2 border-ds-stroke-soft hover:border-ds-feature-base/50 shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
                >
                  <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-ds-text-soft">
                    <span>
                      {isCardFlipped
                        ? "💡 Explanation & Answer"
                        : currentFlashcard.question
                          ? "❓ Active Recall Question"
                          : "📖 Highlighted Concept"}
                    </span>
                    <span className="text-ds-feature-base group-hover:underline">
                      Click to{" "}
                      {isCardFlipped ? "see question/concept" : "reveal answer"}{" "}
                      ↻
                    </span>
                  </div>

                  <div className="py-6 my-auto">
                    {isCardFlipped ? (
                      <div className="space-y-4">
                        {currentFlashcard.note ? (
                          <div className="p-5 rounded-2xl bg-ds-feature-lighter/40 border border-ds-feature-light">
                            <span className="text-xs font-bold text-ds-feature-dark uppercase tracking-wider block mb-1.5">
                              💡 Your Memory Note & Answer:
                            </span>
                            <p className="text-base sm:text-lg font-bold text-ds-text-strong leading-relaxed">
                              {currentFlashcard.note}
                            </p>
                          </div>
                        ) : null}
                        <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
                          <span className="text-[10px] font-black text-ds-text-soft uppercase tracking-wider block mb-1">
                            📖 Lesson Reference:
                          </span>
                          <blockquote className="text-xs sm:text-sm text-ds-text-sub italic leading-relaxed">
                            "{currentFlashcard.selectedText}"
                          </blockquote>
                        </div>
                      </div>
                    ) : currentFlashcard.question ? (
                      <div className="space-y-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ds-feature-lighter text-ds-feature-dark font-black text-xs uppercase tracking-wider border border-ds-feature-light">
                          ❓ Question
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-ds-text-strong font-display leading-snug">
                          {currentFlashcard.question}
                        </h3>
                      </div>
                    ) : (
                      <blockquote className="text-xl sm:text-2xl font-bold text-ds-text-strong leading-snug font-display">
                        "{currentFlashcard.selectedText}"
                      </blockquote>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-ds-stroke-soft text-xs text-ds-text-sub">
                    <span className="text-[11px]">
                      Saved{" "}
                      {new Date(
                        currentFlashcard.createdAt,
                      ).toLocaleDateString()}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGoToLesson(currentFlashcard);
                      }}
                      className="text-ds-feature-base font-bold hover:underline flex items-center gap-1"
                    >
                      Open in Lesson →
                    </button>
                  </div>
                </div>

                {/* Flashcard Nav Buttons */}
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={prevFlashcard}
                    className="flex-1 py-3 rounded-2xl bg-ds-bg-white hover:bg-ds-bg-weak border border-ds-stroke-soft text-ds-text-strong font-bold text-sm transition-all active:scale-95 shadow-sm"
                  >
                    ← Previous Card
                  </button>

                  <button
                    onClick={() => openNoteDialog(currentFlashcard)}
                    className="px-5 py-3 rounded-2xl bg-ds-bg-weak hover:bg-ds-bg-soft border border-ds-stroke-soft text-ds-text-strong font-bold text-sm transition-all"
                    title="Edit Note"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={nextFlashcard}
                    className="flex-1 py-3 rounded-2xl bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white font-bold text-sm transition-all active:scale-95 shadow-md shadow-ds-feature-base/20"
                  >
                    Next Card →
                  </button>
                </div>
              </div>
            ) : null}
          </section>
        ) : (
          /* ── STRUCTURED HIERARCHICAL / CARD GRID VIEW ── */
          <section className="space-y-12">
            {groupedByTopic.length === 0 ? (
              <div className="p-16 text-center bg-ds-bg-white rounded-3xl border border-ds-stroke-soft shadow-sm max-w-xl mx-auto my-10">
                <div className="w-16 h-16 rounded-2xl bg-ds-feature-lighter text-ds-feature-dark flex items-center justify-center text-3xl mx-auto mb-4">
                  📝
                </div>
                <h3 className="text-xl font-bold text-ds-text-strong font-display">
                  No revisions found
                </h3>
                <p className="text-sm text-ds-text-sub mt-2 leading-relaxed">
                  {searchQuery
                    ? `No saved highlights or notes match "${searchQuery}".`
                    : "Select any text in a lesson to highlight or add a personal note!"}
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <Link
                    href="/learn/nestjs/nj02-oop-foundations"
                    className="px-5 py-2.5 rounded-xl bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white text-xs font-bold transition-all shadow-md shadow-ds-feature-base/15"
                  >
                    Go to Lesson & Start Highlighting
                  </Link>
                </div>
              </div>
            ) : (
              groupedByTopic.map((group) => {
                const meta = TOPICS_META[group.topicId];
                return (
                  <div key={group.topicId} className="space-y-6">
                    {/* Topic Header Banner */}
                    <div className="flex items-center justify-between pb-3 border-b border-ds-stroke-soft">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{meta?.icon || "📌"}</span>
                        <div>
                          <h2 className="text-2xl font-black text-ds-text-strong font-display tracking-tight flex items-center gap-2">
                            {group.topicTitle}
                            <span className="text-xs font-bold text-ds-text-soft font-mono px-2 py-0.5 rounded-full bg-ds-bg-white border border-ds-stroke-soft">
                              {group.items.length}{" "}
                              {group.items.length === 1 ? "item" : "items"}
                            </span>
                          </h2>
                        </div>
                      </div>
                    </div>

                    {/* Cards Grid for this topic */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {group.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col justify-between p-6 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft hover:border-ds-feature-base/40 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
                        >
                          {/* Top: Lesson Info & Tag */}
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <span className="text-[11px] font-bold text-ds-text-sub truncate">
                                📖 {item.lessonTitle}
                              </span>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  onClick={() => toggleFavorite(item.id)}
                                  className={`text-xs p-1 rounded-lg transition-transform active:scale-90 ${
                                    item.isFavorite
                                      ? "text-amber-500 scale-110"
                                      : "text-ds-text-disabled hover:text-amber-500"
                                  }`}
                                  title={
                                    item.isFavorite
                                      ? "Starred item"
                                      : "Star item"
                                  }
                                >
                                  {item.isFavorite ? "⭐" : "☆"}
                                </button>
                                <button
                                  onClick={() => toggleMastered(item.id)}
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                                    item.mastered
                                      ? "bg-ds-success-lighter text-ds-success-dark border-ds-success-base"
                                      : "bg-ds-bg-weak text-ds-text-soft border-ds-stroke-soft hover:border-ds-success-base"
                                  }`}
                                  title={
                                    item.mastered
                                      ? "Marked as Mastered"
                                      : "Mark as Mastered"
                                  }
                                >
                                  {item.mastered ? "✓ Mastered" : "Review"}
                                </button>
                              </div>
                            </div>

                            {/* Recall Question if present */}
                            {item.question && (
                              <div className="p-3.5 rounded-2xl bg-ds-feature-lighter/40 border border-ds-feature-light mb-3">
                                <div className="flex items-center gap-1.5 mb-1 text-[10px] font-black uppercase tracking-wider text-ds-feature-dark">
                                  <span>❓</span>
                                  <span>Question</span>
                                </div>
                                <p className="text-xs text-ds-text-strong font-bold leading-relaxed">
                                  {item.question}
                                </p>
                              </div>
                            )}

                            {/* Highlighted Quote Block */}
                            <div className="bg-ds-bg-weak border-l-4 border-ds-feature-base rounded-r-2xl p-4 mb-4">
                              <p className="text-xs sm:text-sm text-ds-text-strong font-medium leading-relaxed italic">
                                "{item.selectedText}"
                              </p>
                            </div>

                            {/* Attached Personal Note Block */}
                            {item.note && (
                              <div className="p-3.5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft mb-4">
                                <div className="flex items-center gap-1.5 mb-1 text-[10px] font-black uppercase tracking-wider text-ds-feature-dark">
                                  <span>💡</span>
                                  <span>Personal Note</span>
                                </div>
                                <p className="text-xs text-ds-text-strong font-medium leading-relaxed">
                                  {item.note}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Card Footer Actions */}
                          <div className="pt-4 mt-2 border-t border-ds-stroke-soft flex items-center justify-between gap-2">
                            {/* Go to Lesson button */}
                            <button
                              onClick={() => handleGoToLesson(item)}
                              className="px-3.5 py-2 rounded-xl bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white text-xs font-bold transition-all active:scale-95 shadow-sm flex items-center gap-1.5"
                            >
                              <span>Go to Lesson</span>
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
                            </button>

                            {/* Secondary Actions */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() =>
                                  handleCopySnippet(item.selectedText, item.id)
                                }
                                className="p-2 rounded-xl text-ds-text-soft hover:text-ds-text-strong hover:bg-ds-bg-weak transition-colors"
                                title="Copy snippet"
                              >
                                {copiedId === item.id ? "✓" : "📋"}
                              </button>

                              <button
                                onClick={() => openNoteDialog(item)}
                                className="p-2 rounded-xl text-ds-text-soft hover:text-ds-text-strong hover:bg-ds-bg-weak transition-colors"
                                title="Edit note"
                              >
                                ✏️
                              </button>

                              <button
                                onClick={() => {
                                  if (confirm("Delete this highlight?")) {
                                    deleteAnnotation(item.id);
                                  }
                                }}
                                className="p-2 rounded-xl text-ds-text-soft hover:text-ds-error-base hover:bg-ds-error-lighter transition-colors"
                                title="Delete highlight"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </InteractiveGrid>
  );
}
