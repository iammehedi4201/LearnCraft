"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuestionsByTrack } from "@/lib/interview-questions";
import { TOPICS_META } from "@/lib/topic-registry";
import { getAllQuestionProgress } from "@/lib/interview-progress";
import { InterviewQuestion, QuestionProgress } from "@/types/interview";
import { MarkdownRenderer } from "@/components/revision/MarkdownRenderer";
import { TechIcon } from "@/components/roadmap/TechIcon";
import { InteractiveGrid } from "@/components/interactive-grid";

interface BrowsePageProps {
  params: Promise<{ track: string }>;
}

const DIFFICULTY_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  easy: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  beginner: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  medium: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  intermediate: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  hard: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20" },
  advanced: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20" },
};

export default function TrackBrowsePage({ params }: BrowsePageProps) {
  const resolvedParams = use(params);
  const trackKey = resolvedParams.track;

  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, QuestionProgress>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const qs = getQuestionsByTrack(trackKey);
    setQuestions(qs || []);
    setProgressMap(getAllQuestionProgress());
  }, [trackKey]);

  const meta = TOPICS_META[trackKey];
  if (!meta && questions.length === 0) {
    notFound();
  }

  const title = meta?.title || trackKey.toUpperCase();

  // Categories list
  const categories = ["all", ...Array.from(new Set(questions.map((q) => q.category)))];

  // Filtering
  const filtered = questions.filter((q) => {
    if (selectedCategory !== "all" && q.category !== selectedCategory) return false;
    if (selectedDifficulty !== "all") {
      const isEasy = selectedDifficulty === "easy" && (q.difficulty === "easy" || q.difficulty === "beginner");
      const isMedium = selectedDifficulty === "medium" && (q.difficulty === "medium" || q.difficulty === "intermediate");
      const isHard = selectedDifficulty === "hard" && (q.difficulty === "hard" || q.difficulty === "advanced");
      if (!isEasy && !isMedium && !isHard) return false;
    }
    if (selectedType !== "all" && q.type !== selectedType) return false;

    if (searchQuery.trim()) {
      const qLower = searchQuery.toLowerCase();
      const inQuestion = q.question.toLowerCase().includes(qLower);
      const inAnswer = q.answer.toLowerCase().includes(qLower);
      const inTags = q.tags.some((t) => t.toLowerCase().includes(qLower));
      return inQuestion || inAnswer || inTags;
    }

    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const allExp: Record<string, boolean> = {};
    filtered.forEach((q) => (allExp[q.id] = true));
    setExpandedIds(allExp);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDifficulty("all");
    setSelectedType("all");
  };

  const isFiltered =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedDifficulty !== "all" ||
    selectedType !== "all";

  // Difficulty counts
  const diffCounts = {
    all: questions.length,
    easy: questions.filter((q) => q.difficulty === "easy" || q.difficulty === "beginner").length,
    medium: questions.filter((q) => q.difficulty === "medium" || q.difficulty === "intermediate").length,
    hard: questions.filter((q) => q.difficulty === "hard" || q.difficulty === "advanced").length,
  };

  // User progress metrics for this track
  const masteredCount = questions.filter((q) => progressMap[q.id]?.isMastered).length;
  const reviewedCount = questions.filter((q) => progressMap[q.id]?.timesReviewed).length;

  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-neutral-600">/</span>
            <Link href="/interview" className="hover:text-white transition-colors">
              Interview Prep
            </Link>
            <span className="text-neutral-600">/</span>
            <span className="text-purple-400 font-medium">{title} Library</span>
          </div>

          <Link
            href="/interview"
            className="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>← All Tracks</span>
          </Link>
        </div>

        {/* ─── SECTION 1: HERO HEADER ─── */}
        <div className="relative rounded-3xl bg-[#0E121B] border border-white/[0.08] p-6 sm:p-8 backdrop-blur-xl overflow-hidden shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              {/* Elevated Track Icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center p-3 sm:p-3.5 shadow-lg flex-shrink-0">
                <TechIcon slug={trackKey} className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {title} Interview Library
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
                  Master interview questions with comprehensive model answers, technical execution details, and key interviewer checkpoints.
                </p>

                {/* Quick Stats Badges */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-neutral-300 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>{questions.length} Total Questions</span>
                  </span>

                  {reviewedCount > 0 && (
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span>{reviewedCount} Reviewed</span>
                    </span>
                  )}

                  {masteredCount > 0 && (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-medium flex items-center gap-1.5">
                      <span>💎</span>
                      <span>{masteredCount} Mastered</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex-shrink-0 self-start md:self-center">
              <Link
                href={`/interview/${trackKey}`}
                className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2.5 shadow-xl shadow-purple-600/20 transition-all cursor-pointer active:scale-95"
              >
                <span>🎯 Practice Flashcards</span>
                <span className="text-xs opacity-75">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ─── SECTION 2: SEARCH & FILTER COMMAND BAR ─── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0E121B] border border-white/[0.08] backdrop-blur-xl space-y-4 shadow-xl">
          {/* Top Controls: Search Bar + Category & Type Dropdowns */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions, concepts, or tags..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-neutral-950/90 border border-white/[0.08] focus:border-purple-500/60 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center hover:bg-white/[0.1] transition-colors"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Select Dropdown */}
            <div className="relative min-w-[180px]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-neutral-950/90 border border-white/[0.08] hover:border-white/[0.15] focus:border-purple-500/60 rounded-xl pl-3.5 pr-8 py-2.5 text-xs text-neutral-200 focus:outline-none transition-all cursor-pointer font-medium"
              >
                <option value="all" className="bg-[#0e1017] text-white">
                  All Categories ({categories.length - 1})
                </option>
                {categories
                  .filter((cat) => cat !== "all")
                  .map((cat) => (
                    <option key={cat} value={cat} className="bg-[#0e1017] text-white">
                      {cat}
                    </option>
                  ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-xs">
                ▼
              </div>
            </div>

            {/* Type Select Dropdown */}
            <div className="relative min-w-[150px]">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full appearance-none bg-neutral-950/90 border border-white/[0.08] hover:border-white/[0.15] focus:border-purple-500/60 rounded-xl pl-3.5 pr-8 py-2.5 text-xs text-neutral-200 focus:outline-none transition-all cursor-pointer font-medium"
              >
                <option value="all" className="bg-[#0e1017] text-white">
                  All Types
                </option>
                <option value="conceptual" className="bg-[#0e1017] text-white">
                  💡 Conceptual
                </option>
                <option value="coding" className="bg-[#0e1017] text-white">
                  💻 Coding
                </option>
                <option value="practical" className="bg-[#0e1017] text-white">
                  🛠️ Practical
                </option>
                <option value="architecture" className="bg-[#0e1017] text-white">
                  🏗️ Architecture
                </option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Bottom Bar: Segmented Difficulty Tabs + Results Count + Expand/Collapse */}
          <div className="pt-1 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Difficulty Segmented Buttons */}
            <div className="flex items-center gap-1 bg-neutral-950/70 p-1 rounded-xl border border-white/[0.06]">
              {(
                [
                  { key: "all", label: "All", count: diffCounts.all },
                  { key: "easy", label: "Easy", count: diffCounts.easy },
                  { key: "medium", label: "Medium", count: diffCounts.medium },
                  { key: "hard", label: "Hard", count: diffCounts.hard },
                ] as const
              ).map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setSelectedDifficulty(key)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedDifficulty === key
                      ? "bg-purple-600 text-white font-semibold shadow-sm shadow-purple-600/30"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span>{label}</span>
                  <span
                    className={`text-[10px] px-1 rounded-md ${
                      selectedDifficulty === key
                        ? "bg-purple-800 text-purple-100"
                        : "bg-white/[0.06] text-neutral-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              ))}
            </div>

            {/* Results Info & Accordion Actions */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-neutral-400 font-mono">
                Showing <strong className="text-white">{filtered.length}</strong> of {questions.length}
              </span>

              {isFiltered && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>⟲</span>
                  <span>Reset</span>
                </button>
              )}

              <span className="text-neutral-700">|</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={expandAll}
                  className="px-2 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] text-[11px] text-neutral-300 hover:text-white transition-all cursor-pointer"
                  title="Expand all questions"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="px-2 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] text-[11px] text-neutral-300 hover:text-white transition-all cursor-pointer"
                  title="Collapse all questions"
                >
                  Collapse All
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips (if any filter is engaged) */}
          {isFiltered && (
            <div className="pt-2 border-t border-white/[0.04] flex flex-wrap items-center gap-2 text-xs animate-fadeIn">
              <span className="text-[11px] text-neutral-500 font-medium">Active filters:</span>

              {searchQuery.trim() && (
                <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/25 text-purple-300 flex items-center gap-1.5 text-xs">
                  <span>Search: &ldquo;{searchQuery}&rdquo;</span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                </span>
              )}

              {selectedCategory !== "all" && (
                <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/25 text-purple-300 flex items-center gap-1.5 text-xs">
                  <span>Category: {selectedCategory}</span>
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                </span>
              )}

              {selectedDifficulty !== "all" && (
                <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/25 text-purple-300 flex items-center gap-1.5 text-xs">
                  <span className="capitalize">Difficulty: {selectedDifficulty}</span>
                  <button
                    onClick={() => setSelectedDifficulty("all")}
                    className="hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                </span>
              )}

              {selectedType !== "all" && (
                <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/25 text-purple-300 flex items-center gap-1.5 text-xs">
                  <span className="capitalize">Type: {selectedType}</span>
                  <button
                    onClick={() => setSelectedType("all")}
                    className="hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                </span>
              )}

              <button
                onClick={resetFilters}
                className="text-[11px] text-neutral-400 hover:text-white underline cursor-pointer ml-1"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* ─── SECTION 3: QUESTIONS ACCORDION LIST ─── */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
              <span className="text-3xl block">🔍</span>
              <h3 className="text-base font-bold text-white">No questions matched your search</h3>
              <p className="text-xs text-neutral-400">
                Try loosening your filter criteria or search terms.
              </p>
            </div>
          ) : (
            filtered.map((q, idx) => {
              const isExpanded = !!expandedIds[q.id];
              const prog = progressMap[q.id];
              const diff = DIFFICULTY_STYLES[q.difficulty] || DIFFICULTY_STYLES.medium;

              return (
                <div
                  key={q.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? "bg-[#0E121B] border-purple-500/40 shadow-xl shadow-purple-950/20"
                      : "bg-[#0E121B] border-white/[0.06] hover:border-white/[0.12] hover:bg-[#121622]"
                  }`}
                >
                  {/* Card Collapsed Header */}
                  <button
                    onClick={() => toggleExpand(q.id)}
                    className="w-full p-4 sm:p-5 flex items-start justify-between gap-3 text-left cursor-pointer"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-xs font-mono font-bold text-neutral-400 mt-0.5">
                        {idx + 1}
                      </span>

                      <div className="space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] font-semibold text-neutral-300">
                            {q.category}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${diff.bg} ${diff.text} ${diff.border}`}
                          >
                            {q.difficulty.toUpperCase()}
                          </span>
                          {prog?.isMastered && (
                            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                              💎 Mastered
                            </span>
                          )}
                        </div>

                        <h3 className="font-semibold text-sm sm:text-base text-neutral-100 leading-snug">
                          {q.question}
                        </h3>
                      </div>
                    </div>

                    <div className="flex-shrink-0 ml-2 mt-1 text-neutral-400">
                      <svg
                        className={`w-5 h-5 transform transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-purple-400" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Card Expanded Content */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 pt-0 border-t border-white/[0.06] space-y-5 animate-fadeIn">
                      {/* Code Snippet if applicable */}
                      {q.codeSnippet && (
                        <div className="mt-4 rounded-xl overflow-hidden border border-white/[0.08] bg-black/50 p-4 font-mono text-xs">
                          <MarkdownRenderer
                            content={`\`\`\`javascript\n${q.codeSnippet}\n\`\`\``}
                          />
                        </div>
                      )}

                      {/* Expected output if present */}
                      {q.expectedOutput && (
                        <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs">
                          <span className="font-semibold text-indigo-300 block mb-1">
                            Expected Output:
                          </span>
                          <pre className="font-mono text-indigo-100 bg-black/40 p-2 rounded-lg">
                            {q.expectedOutput}
                          </pre>
                        </div>
                      )}

                      {/* Model Answer */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                          Model Answer:
                        </span>
                        <div className="text-neutral-200 text-xs sm:text-sm leading-relaxed p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                          <MarkdownRenderer content={q.answer} />
                        </div>
                      </div>

                      {/* Key Points */}
                      {q.keyPoints && q.keyPoints.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                            Key Checkpoints to Cover:
                          </span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.keyPoints.map((kp, kIdx) => (
                              <li
                                key={kIdx}
                                className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs text-neutral-300 flex items-start gap-2"
                              >
                                <span className="text-purple-400 font-bold">✓</span>
                                <span>{kp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Follow-ups */}
                      {q.followUps && q.followUps.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                            Interviewer Follow-ups:
                          </span>
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1.5 text-xs text-neutral-300">
                            {q.followUps.map((fu, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-2">
                                <span className="text-indigo-400 font-bold">•</span>
                                <span>{fu}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Footer: Related Lesson link */}
                      {q.relatedLessonSlug && (
                        <div className="pt-2 flex items-center justify-between text-xs text-neutral-400 border-t border-white/[0.04]">
                          <Link
                            href={q.relatedLessonSlug}
                            target="_blank"
                            className="text-purple-300 hover:text-purple-200 hover:underline flex items-center gap-1 font-medium"
                          >
                            <span>Study Lesson: {q.relatedLessonName || q.relatedLessonSlug}</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </InteractiveGrid>
  );
}
