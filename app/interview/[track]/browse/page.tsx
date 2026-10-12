"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuestionsByTrack } from "@/lib/interview-questions";
import { TOPICS_META } from "@/lib/topic-registry";
import { getAllQuestionProgress } from "@/lib/interview-progress";
import { InterviewQuestion, QuestionProgress } from "@/types/interview";
import { MarkdownRenderer } from "@/components/revision/MarkdownRenderer";

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
  const icon = meta?.icon || "🎯";

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

  return (
    <div className="min-h-screen bg-[#08090C] text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/interview" className="hover:text-white transition-colors">
              Interview Prep
            </Link>
            <span>/</span>
            <span className="text-purple-400 font-semibold">{title} Q&A Library</span>
          </div>

          <Link
            href={`/interview/${trackKey}`}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-purple-600/20 transition-all cursor-pointer active:scale-95"
          >
            <span>🎯 Practice Flashcards</span>
          </Link>
        </div>

        {/* Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-white/[0.08] backdrop-blur-xl space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl">{icon}</span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {title} Interview Questions Library
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Browse complete model answers, code breakdowns, and follow-up checkpoints.
                </p>
              </div>
            </div>

            <div className="hidden sm:block text-right">
              <span className="text-2xl font-black text-purple-400 font-mono">
                {questions.length}
              </span>
              <span className="block text-[11px] text-neutral-400">Questions Available</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative pt-2">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords, concepts, or tags..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-white/[0.08] focus:border-purple-500/50 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Filters Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-neutral-400 font-medium mr-1">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-purple-600 text-white font-semibold shadow-sm shadow-purple-600/30"
                      : "bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-neutral-400 font-medium mr-1">Difficulty:</span>
              {["all", "easy", "medium", "hard"].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-all cursor-pointer ${
                    selectedDifficulty === diff
                      ? "bg-purple-600 text-white font-semibold shadow-sm shadow-purple-600/30"
                      : "bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-neutral-400 font-medium mr-1">Type:</span>
              {["all", "conceptual", "coding", "practical", "architecture"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-all cursor-pointer ${
                    selectedType === t
                      ? "bg-purple-600 text-white font-semibold shadow-sm shadow-purple-600/30"
                      : "bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Expand / Collapse All */}
            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="text-[11px] text-neutral-400 hover:text-purple-300 transition-colors"
              >
                Expand All
              </button>
              <span className="text-neutral-600">·</span>
              <button
                onClick={collapseAll}
                className="text-[11px] text-neutral-400 hover:text-purple-300 transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* Questions Accordion List */}
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
                      ? "bg-neutral-900/95 border-purple-500/40 shadow-xl shadow-purple-950/20"
                      : "bg-neutral-900/60 border-white/[0.06] hover:border-white/[0.12] hover:bg-neutral-900/80"
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
    </div>
  );
}
