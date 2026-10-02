"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnnotationItem, SM2Grade } from "@/types/revision";
import { recordSM2Review } from "@/lib/revision-storage";
import { getSM2IntervalPreviews } from "@/lib/spaced-repetition";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface SpacedReviewSessionModalProps {
  isOpen: boolean;
  cards: AnnotationItem[];
  onClose: () => void;
  onCardReviewed?: (updatedCard: AnnotationItem) => void;
}

export function SpacedReviewSessionModal({
  isOpen,
  cards,
  onClose,
  onCardReviewed,
}: SpacedReviewSessionModalProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionResults, setSessionResults] = useState<{
    reviewedCount: number;
    againCount: number;
    hardCount: number;
    goodCount: number;
    easyCount: number;
  }>({
    reviewedCount: 0,
    againCount: 0,
    hardCount: 0,
    goodCount: 0,
    easyCount: 0,
  });
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setIsFlipped(false);
      setIsFinished(false);
      setSessionResults({
        reviewedCount: 0,
        againCount: 0,
        hardCount: 0,
        goodCount: 0,
        easyCount: 0,
      });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const currentCard = cards[currentIndex];
  const intervalPreviews = useMemo(() => {
    if (!currentCard) return [];
    return getSM2IntervalPreviews(currentCard);
  }, [currentCard]);

  const handleGrade = useCallback(
    (grade: SM2Grade) => {
      if (!currentCard) return;

      const updated = recordSM2Review(currentCard.id, grade);
      if (updated && onCardReviewed) {
        onCardReviewed(updated);
      }

      setSessionResults((prev) => ({
        ...prev,
        reviewedCount: prev.reviewedCount + 1,
        againCount: prev.againCount + (grade === "again" ? 1 : 0),
        hardCount: prev.hardCount + (grade === "hard" ? 1 : 0),
        goodCount: prev.goodCount + (grade === "good" ? 1 : 0),
        easyCount: prev.easyCount + (grade === "easy" ? 1 : 0),
      }));

      // Next card or finish
      if (currentIndex + 1 < cards.length) {
        setCurrentIndex((prev) => prev + 1);
        setIsFlipped(false);
      } else {
        setIsFinished(true);
      }
    },
    [cards.length, currentCard, currentIndex, onCardReviewed]
  );

  // Keyboard controls: Space/Enter = flip, 1/2/3/4 = grade, Escape = close
  useEffect(() => {
    if (!isOpen || isFinished) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (!isFlipped) {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          setIsFlipped(true);
        }
      } else {
        if (e.key === "1") {
          e.preventDefault();
          handleGrade("again");
        } else if (e.key === "2") {
          e.preventDefault();
          handleGrade("hard");
        } else if (e.key === "3") {
          e.preventDefault();
          handleGrade("good");
        } else if (e.key === "4") {
          e.preventDefault();
          handleGrade("easy");
        } else if (e.key === " " || e.key === "Enter") {
          // Default to "good" if space pressed on back
          e.preventDefault();
          handleGrade("good");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleGrade, isFlipped, isFinished, isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark blur backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Main Study Container */}
      <div className="relative w-full max-w-2xl bg-[#0D111A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-500/15 z-10 animate-in zoom-in-95 duration-200 text-left">
        {!isFinished && currentCard ? (
          <div className="space-y-6">
            {/* Header: Progress Counter & Topic/Lesson Info + Close Button */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
                {/* Left: Card Index, Topic & Lesson */}
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-bold text-white font-mono shrink-0">
                    Card {currentIndex + 1} / {cards.length}
                  </span>
                  <span className="text-slate-600 shrink-0">•</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 text-[10px] font-black uppercase tracking-wider shrink-0">
                    {currentCard.topicTitle}
                  </span>
                  <span className="text-[11px] text-slate-400 truncate hidden sm:inline">
                    {currentCard.lessonTitle}
                  </span>
                </div>

                {/* Right: Integrated Close Cross Button */}
                <button
                  onClick={onClose}
                  className="p-1.5 -mr-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                  aria-label="Close session"
                  title="Close session (Esc)"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Flashcard Area with 3D Flip */}
            <div
              onClick={() => setIsFlipped((prev) => !prev)}
              className="min-h-[320px] p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-purple-500/40 shadow-xl transition-all duration-200 flex flex-col justify-between cursor-pointer group select-none"
            >
              {/* Card Subhead */}
              <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-slate-400">
                <span className="flex items-center gap-1.5 text-purple-400">
                  <span>{isFlipped ? "💡 Verified Concept / Note" : "❓ Active Recall Question"}</span>
                </span>
                <span className="text-slate-400 group-hover:text-purple-300 flex items-center gap-1 text-[10px] font-bold">
                  {isFlipped ? "Flip to Front (Space)" : "Reveal Answer (Space)"} ⟳
                </span>
              </div>

              {/* Card Center Content */}
              <div className="py-6 my-auto">
                {isFlipped ? (
                  <div className="space-y-4">
                    {currentCard.note ? (
                      <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20">
                        <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 block mb-2">
                          Your Explanation & Key Takeaway
                        </span>
                        <MarkdownRenderer content={currentCard.note} className="text-sm text-slate-200 leading-relaxed" />
                      </div>
                    ) : null}

                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                        Source Reference Highlight
                      </span>
                      <blockquote className="text-xs text-slate-300 italic leading-relaxed">
                        &ldquo;{currentCard.selectedText}&rdquo;
                      </blockquote>
                    </div>
                  </div>
                ) : (
                  <div>
                    {currentCard.question ? (
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                        {currentCard.question}
                      </h3>
                    ) : (
                      <blockquote className="text-lg sm:text-xl font-medium text-slate-200 leading-snug">
                        &ldquo;{currentCard.selectedText}&rdquo;
                      </blockquote>
                    )}
                    <p className="mt-4 text-xs text-slate-400 flex items-center gap-1.5">
                      <span>⌨️</span> Tap anywhere or press <strong className="text-white">Space</strong> to reveal the answer.
                    </p>
                  </div>
                )}
              </div>

              {/* Card Footer: Source Link & Current Stability */}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs text-slate-400">
                <span className="text-[11px] font-mono">
                  Stability: {currentCard.interval || 1}d interval
                </span>
                <Link
                  href={currentCard.lessonPath}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="text-purple-400 hover:text-purple-300 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Open Lesson</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>

            {/* Bottom Controls: Anki-style 4 Recall Grading Buttons */}
            {isFlipped ? (
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* [1] Again */}
                  <button
                    onClick={() => handleGrade("again")}
                    className="py-3 px-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:text-rose-200 font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95"
                  >
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-[10px] px-1 py-0.2 rounded bg-rose-500/20 font-mono">1</span>
                      <span>Again</span>
                    </div>
                    <span className="text-[11px] font-mono text-rose-400">
                      {intervalPreviews.find((p) => p.grade === "again")?.badge || "< 1d"}
                    </span>
                  </button>

                  {/* [2] Hard */}
                  <button
                    onClick={() => handleGrade("hard")}
                    className="py-3 px-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:text-amber-200 font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95"
                  >
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-[10px] px-1 py-0.2 rounded bg-amber-500/20 font-mono">2</span>
                      <span>Hard</span>
                    </div>
                    <span className="text-[11px] font-mono text-amber-400">
                      {intervalPreviews.find((p) => p.grade === "hard")?.badge || "2d"}
                    </span>
                  </button>

                  {/* [3] Good */}
                  <button
                    onClick={() => handleGrade("good")}
                    className="py-3 px-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95 shadow-lg shadow-emerald-500/5"
                  >
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-500/20 font-mono">3</span>
                      <span>Good</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400">
                      {intervalPreviews.find((p) => p.grade === "good")?.badge || "6d"}
                    </span>
                  </button>

                  {/* [4] Easy */}
                  <button
                    onClick={() => handleGrade("easy")}
                    className="py-3 px-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 hover:text-indigo-200 font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95 shadow-lg shadow-indigo-500/5"
                  >
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-[10px] px-1 py-0.2 rounded bg-indigo-500/20 font-mono">4</span>
                      <span>Easy</span>
                    </div>
                    <span className="text-[11px] font-mono text-indigo-400">
                      {intervalPreviews.find((p) => p.grade === "easy")?.badge || "14d"}
                    </span>
                  </button>
                </div>

                <p className="text-center text-[10px] text-slate-400">
                  Shortcut keys: Press <kbd className="px-1 py-0.5 rounded bg-white/10 text-white font-mono">1</kbd>, <kbd className="px-1 py-0.5 rounded bg-white/10 text-white font-mono">2</kbd>, <kbd className="px-1 py-0.5 rounded bg-white/10 text-white font-mono">3</kbd>, or <kbd className="px-1 py-0.5 rounded bg-white/10 text-white font-mono">4</kbd> on your keyboard.
                </p>
              </div>
            ) : (
              <button
                onClick={() => setIsFlipped(true)}
                className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold text-sm transition-all shadow-lg shadow-purple-600/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Reveal Answer</span>
                <span className="text-xs text-purple-200 font-mono">[Space]</span>
              </button>
            )}
          </div>
        ) : (
          /* Session Completed Summary Screen */
          <div className="text-center py-4 space-y-6 animate-in zoom-in-95 duration-200 relative">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close session"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-3xl font-bold shadow-xl shadow-emerald-500/20">
              🎉
            </div>

            <div>
              <h3 className="text-2xl font-black text-white tracking-tight font-display mb-1.5">
                Spaced Repetition Session Completed!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                You reviewed <strong className="text-white">{sessionResults.reviewedCount} cards</strong> today. Your next review intervals have been algorithmically recalibrated.
              </p>
            </div>

            {/* Performance breakdown pills */}
            <div className="grid grid-cols-4 gap-2.5 max-w-md mx-auto">
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
                <span className="text-[10px] font-bold text-rose-400 uppercase block">Again</span>
                <span className="text-lg font-black text-white font-mono">{sessionResults.againCount}</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                <span className="text-[10px] font-bold text-amber-400 uppercase block">Hard</span>
                <span className="text-lg font-black text-white font-mono">{sessionResults.hardCount}</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <span className="text-[10px] font-bold text-emerald-400 uppercase block">Good</span>
                <span className="text-lg font-black text-white font-mono">{sessionResults.goodCount}</span>
              </div>
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-center">
                <span className="text-[10px] font-bold text-indigo-400 uppercase block">Easy</span>
                <span className="text-lg font-black text-white font-mono">{sessionResults.easyCount}</span>
              </div>
            </div>

            {/* Close / Done Button */}
            <button
              onClick={onClose}
              className="py-3 px-8 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/25 transition-all cursor-pointer"
            >
              Return to Revision Hub
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
