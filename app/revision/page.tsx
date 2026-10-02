"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * QUICK REVISION — Simple, Focused Flashcard & Spaced Recall Center
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { openAuthModal } from "@/components/auth-modal";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";
import { useRevision } from "@/context/revision-context";
import { AnnotationItem, SM2Grade } from "@/types/revision";
import { recordSM2Review } from "@/lib/revision-storage";
import {
  getDueQueue,
  getSM2IntervalPreviews,
} from "@/lib/spaced-repetition";
import { MarkdownRenderer } from "@/components/revision/MarkdownRenderer";
import { SpacedReviewSessionModal } from "@/components/revision/SpacedReviewSessionModal";

type RevisionView = "flashcards" | "cards";

// ─── Icons ────────────────────────────────────────────────────────────────────
const IcBolt = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IcCards = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="6" width="16" height="14" rx="2" />
    <path d="M6 2h14a2 2 0 0 1 2 2v14" />
  </svg>
);

const IcGrid = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

const IcNote = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

// Extract clean question / title
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
  if (!raw) raw = item.selectedText || "Concept";

  return raw
    .replace(/^#{1,6}\s*/, "")
    .replace(/^\*\*/, "")
    .replace(/\*\*$/, "")
    .replace(/^>\s*/, "")
    .replace(/^[-*+]\s*/, "")
    .trim();
}

export default function QuickRevisionPage(): JSX.Element {
  const router = useRouter();
  const { data: session } = useSession();
  const { annotations } = useRevision();

  const [activeView, setActiveView] = useState<RevisionView>("flashcards");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [isSpacedModalOpen, setIsSpacedModalOpen] = useState<boolean>(false);
  const [spacedQueue, setSpacedQueue] = useState<AnnotationItem[]>([]);

  // Flashcard state
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  // Due queue
  const dueQueue = useMemo(() => getDueQueue(annotations), [annotations]);

  // Available topics
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

  // Filter cards by topic
  const cardsList = useMemo(() => {
    let list = dueQueue.length > 0 ? [...dueQueue] : [...annotations];
    if (selectedTopic !== "all") {
      list = list.filter((item) => item.topicId === selectedTopic);
    }
    return list;
  }, [annotations, dueQueue, selectedTopic]);

  const allDisplayCards = useMemo(() => {
    let list = [...annotations];
    if (selectedTopic !== "all") {
      list = list.filter((item) => item.topicId === selectedTopic);
    }
    return list;
  }, [annotations, selectedTopic]);

  // Launch modal review
  const handleStartReviewSession = (queueToUse?: AnnotationItem[]) => {
    const target =
      queueToUse && queueToUse.length > 0
        ? queueToUse
        : dueQueue.length > 0
        ? dueQueue
        : annotations;

    setSpacedQueue(target);
    setIsSpacedModalOpen(true);
  };

  const handleReviewSingleCard = (card: AnnotationItem) => {
    setSpacedQueue([card]);
    setIsSpacedModalOpen(true);
  };

  // Flashcard flip & navigation
  const nextFlashcard = () => {
    setIsCardFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % (cardsList.length || 1));
  };

  const prevFlashcard = () => {
    setIsCardFlipped(false);
    setFlashcardIndex((prev) =>
      prev === 0 ? (cardsList.length || 1) - 1 : prev - 1,
    );
  };

  const handleGradeCard = (grade: SM2Grade) => {
    const currentCard = cardsList[flashcardIndex];
    if (currentCard) {
      recordSM2Review(currentCard.id, grade);
      nextFlashcard();
    }
  };

  const handleGoToLesson = (item: AnnotationItem) => {
    const sectionQuery = item.sectionId
      ? `&section=${encodeURIComponent(item.sectionId)}`
      : "";
    router.push(
      `${item.lessonPath}?highlightId=${encodeURIComponent(item.id)}${sectionQuery}`,
    );
  };

  const currentFlashcard = cardsList[flashcardIndex];
  const intervalPreviews = currentFlashcard
    ? getSM2IntervalPreviews(currentFlashcard)
    : [];

  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-ds-text-strong font-sans selection:bg-ds-feature-light/20">
      <Nav />

      <main className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {/* SIMPLE PAGE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
              Quick Revision
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Practice active recall flashcards to lock concepts into memory.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/notes"
              className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <IcNote />
              <span>Notes ({annotations.length})</span>
            </Link>

            <button
              onClick={() => handleStartReviewSession()}
              disabled={annotations.length === 0}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <IcBolt />
              <span>{dueQueue.length > 0 ? `Start Review (${dueQueue.length})` : "Start Review"}</span>
            </button>
          </div>
        </div>

        {/* ─── CLOUD SYNC & GUEST STATUS BANNER ─── */}
        {session?.user ? (
          <div className="mb-6 px-4 py-2.5 rounded-xl bg-purple-500/[0.06] border border-purple-500/15 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">⚡</span>
              <span>
                <strong className="text-white">Cloud Sync Active</strong> — Spaced repetition schedule & review intervals synced to <span className="text-purple-300 font-mono">@{session.user.name || "user"}</span>.
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md font-bold">SM-2 Synced</span>
          </div>
        ) : (
          <div className="mb-6 px-4 py-2.5 rounded-xl bg-amber-500/[0.06] border border-amber-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-amber-400">💾</span>
              <span>
                <strong className="text-white">Local Practice Active</strong> — Spaced repetition reviews are scheduled in this browser. Sign in with GitHub to persist your mastery and streak.
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

        {/* VIEW SELECTOR & TOPIC FILTER */}
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          {/* View Toggle */}
          <div className="flex items-center p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl">
            <button
              onClick={() => {
                setActiveView("flashcards");
                setIsCardFlipped(false);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeView === "flashcards"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <IcCards />
              <span>Flashcards</span>
            </button>

            <button
              onClick={() => setActiveView("cards")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeView === "cards"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <IcGrid />
              <span>All Cards ({annotations.length})</span>
            </button>
          </div>

          {/* Topic Filter */}
          {availableTopics.length > 1 && (
            <select
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                setFlashcardIndex(0);
                setIsCardFlipped(false);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-bold text-slate-300 outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#0E121B] text-white">All Topics</option>
              {availableTopics.map((t) => (
                <option key={t.id} value={t.id} className="bg-[#0E121B] text-white">
                  {t.title} ({t.count})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* ─── VIEW 1: CLEAN INTERACTIVE FLASHCARD ─── */}
        {activeView === "flashcards" && (
          <div className="w-full">
            {cardsList.length === 0 ? (
              <div className="py-16 text-center bg-white/[0.02] border border-white/[0.06] rounded-3xl">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-3 text-xl">
                  ✨
                </div>
                <h3 className="text-base font-bold text-white">
                  No cards to review
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Take notes or highlights during lessons to automatically generate revision cards.
                </p>
                <div className="mt-4">
                  <Link
                    href="/learn/nestjs/nj02-oop-foundations"
                    className="inline-flex px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all"
                  >
                    Go to Lessons
                  </Link>
                </div>
              </div>
            ) : currentFlashcard ? (
              <div className="space-y-4 w-full">
                {/* Progress bar and counter */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono font-bold text-white">
                    {flashcardIndex + 1} / {cardsList.length}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
                    {currentFlashcard.topicTitle}
                  </span>
                </div>

                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
                    style={{
                      width: `${((flashcardIndex + 1) / cardsList.length) * 100}%`,
                    }}
                  />
                </div>

                {/* The Flashcard */}
                <div
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                  className="min-h-[320px] sm:min-h-[360px] p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-purple-500/30 shadow-2xl transition-all flex flex-col justify-between cursor-pointer group select-none relative overflow-hidden"
                >
                  <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-400">
                    <span className="text-purple-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                      {isCardFlipped ? "Answer / Note" : "Question"}
                    </span>
                    <span className="group-hover:text-purple-300 transition-colors">
                      {isCardFlipped ? "Flip to question" : "Click to reveal answer"} ⟳
                    </span>
                  </div>

                  <div className="py-8 my-auto">
                    {isCardFlipped ? (
                      <div className="space-y-3 max-w-5xl">
                        {currentFlashcard.note ? (
                          <div className="text-base sm:text-lg text-slate-200 leading-relaxed">
                            <MarkdownRenderer content={currentFlashcard.note} />
                          </div>
                        ) : (
                          <blockquote className="text-base sm:text-lg text-slate-300 italic leading-relaxed">
                            &ldquo;{currentFlashcard.selectedText}&rdquo;
                          </blockquote>
                        )}
                      </div>
                    ) : (
                      <div className="max-w-5xl">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug font-display">
                          {extractQuestion(currentFlashcard)}
                        </h3>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-white/[0.06] text-xs text-slate-400">
                    <span className="text-xs truncate max-w-md">
                      {currentFlashcard.lessonTitle}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGoToLesson(currentFlashcard);
                      }}
                      className="text-purple-400 hover:text-purple-300 font-bold hover:underline"
                    >
                      Lesson →
                    </button>
                  </div>
                </div>

                {/* Grading buttons when card is revealed */}
                {isCardFlipped ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 animate-in fade-in duration-150">
                    <button
                      onClick={() => handleGradeCard("again")}
                      className="py-3 px-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-bold text-xs flex flex-col items-center cursor-pointer transition-all active:scale-95"
                    >
                      <span className="font-bold">Again</span>
                      <span className="text-[10px] font-mono text-rose-400">
                        {intervalPreviews.find((p) => p.grade === "again")?.badge || "< 1d"}
                      </span>
                    </button>
                    <button
                      onClick={() => handleGradeCard("hard")}
                      className="py-3 px-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs flex flex-col items-center cursor-pointer transition-all active:scale-95"
                    >
                      <span className="font-bold">Hard</span>
                      <span className="text-[10px] font-mono text-amber-400">
                        {intervalPreviews.find((p) => p.grade === "hard")?.badge || "2d"}
                      </span>
                    </button>
                    <button
                      onClick={() => handleGradeCard("good")}
                      className="py-3 px-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex flex-col items-center cursor-pointer transition-all active:scale-95"
                    >
                      <span className="font-bold">Good</span>
                      <span className="text-[10px] font-mono text-emerald-400">
                        {intervalPreviews.find((p) => p.grade === "good")?.badge || "6d"}
                      </span>
                    </button>
                    <button
                      onClick={() => handleGradeCard("easy")}
                      className="py-3 px-3 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-bold text-xs flex flex-col items-center cursor-pointer transition-all active:scale-95"
                    >
                      <span className="font-bold">Easy</span>
                      <span className="text-[10px] font-mono text-indigo-400">
                        {intervalPreviews.find((p) => p.grade === "easy")?.badge || "14d"}
                      </span>
                    </button>
                  </div>
                ) : null}

                {/* Previous / Next buttons */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={prevFlashcard}
                    className="flex-1 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white font-bold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={nextFlashcard}
                    className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-md shadow-purple-600/20 cursor-pointer"
                  >
                    Next →
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* ─── VIEW 2: SIMPLE CARDS GRID ─── */}
        {activeView === "cards" && (
          <div>
            {allDisplayCards.length === 0 ? (
              <div className="py-16 text-center bg-white/[0.02] border border-white/[0.06] rounded-3xl">
                <p className="text-xs text-slate-400">No cards found in this topic.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {allDisplayCards.map((item) => {
                  const questionTitle = extractQuestion(item);

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all flex flex-col justify-between gap-3 group"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-[10px] font-bold uppercase">
                            {item.topicTitle}
                          </span>
                          <span className="text-[11px] truncate max-w-[160px]">
                            {item.lessonTitle}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                          {questionTitle}
                        </h4>

                        {item.note && (
                          <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                            {item.note}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={() => handleReviewSingleCard(item)}
                          className="px-3 py-1.5 rounded-xl bg-purple-600/15 hover:bg-purple-600/25 text-purple-300 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <IcBolt />
                          <span>Practice</span>
                        </button>

                        <button
                          onClick={() => handleGoToLesson(item)}
                          className="text-xs text-slate-400 hover:text-white font-bold transition-colors"
                        >
                          Lesson →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Full Screen Interactive SM-2 Review Modal */}
      <SpacedReviewSessionModal
        isOpen={isSpacedModalOpen}
        cards={spacedQueue}
        onClose={() => setIsSpacedModalOpen(false)}
      />

      <Footer />
    </InteractiveGrid>
  );
}
