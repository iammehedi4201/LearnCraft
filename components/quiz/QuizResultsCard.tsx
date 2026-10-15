"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { QuizEvaluationResult } from "@/lib/quiz/quiz-types";
import { QuizReviewModal } from "./QuizReviewModal";

interface QuizResultsCardProps {
  result: QuizEvaluationResult;
  onRetry: () => void;
  trackHref: string;
}

export function QuizResultsCard({ result, onRetry, trackHref }: QuizResultsCardProps) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const isPassed = result.passed;
  const incorrectCount = result.totalQuestions - result.correctAnswers;
  const badgeCode = result.lessonCode.replace("-", "");
  const accuracyRate = Math.round((result.correctAnswers / result.totalQuestions) * 100);

  // Keyboard shortcut: 'R' to retry, 'Space' to review
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isReviewOpen) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        onRetry();
      } else if (e.key === " " && !e.repeat) {
        e.preventDefault();
        setIsReviewOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isReviewOpen, onRetry]);

  const handleOpenReview = (idx: number) => {
    setSelectedQuestionIndex(idx);
    setIsReviewOpen(true);
  };

  return (
    <>
      {/* ──────────────── Edge-to-Edge Full-Screen ──────────────── */}
      <div className="w-full h-screen max-h-screen flex flex-col md:flex-row bg-[#080B14] text-slate-100 font-sans selection:bg-purple-500/30 selection:text-purple-200 overflow-hidden">
        
        {/* ──────────────── Left Column / Sidebar (Full Screen Height) ──────────────── */}
        <aside className="w-full md:w-[320px] lg:w-[360px] xl:w-[400px] shrink-0 border-b md:border-b-0 md:border-r border-white/[0.08] p-6 lg:p-8 flex flex-col justify-between bg-[#080B14] overflow-y-auto custom-scrollbar h-full min-h-0">
          <div>
            {/* Top Badge */}
            <div className="text-center">
              <span className="inline-block px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider">
                {badgeCode} • {result.trackTitle.toUpperCase()}
              </span>
            </div>

            {/* Title (2 lines) */}
            <h1 className="text-3xl lg:text-4xl font-black text-white text-center mt-6 leading-tight tracking-tight">
              {isPassed ? (
                <>
                  Mastery
                  <br />
                  Achieved
                </>
              ) : (
                <>
                  Needs More
                  <br />
                  Practice
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-xs text-slate-400 text-center mt-3 leading-relaxed max-w-xs mx-auto">
              {isPassed
                ? `Great job! You achieved ${result.score}%, passing the 70% threshold. You demonstrated solid understanding of ${result.lessonTitle}.`
                : `You scored below the passing threshold of 70%. Review the architectural explanations and try again!`}
            </p>

            {/* HUD Circular Gauge (Bracket/Notch styled) */}
            <div className="flex flex-col items-center justify-center my-8 lg:my-10">
              <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                  {/* Base Track with side notches */}
                  <circle
                    cx="70"
                    cy="70"
                    r="54"
                    fill="none"
                    stroke={isPassed ? "#0D3327" : "#3B1822"}
                    strokeWidth="6"
                    strokeDasharray="155 15 155 15"
                    strokeLinecap="round"
                  />

                  {/* Active Progress Arc */}
                  <circle
                    cx="70"
                    cy="70"
                    r="54"
                    fill="none"
                    stroke={isPassed ? "#10B981" : "#8B303F"}
                    strokeWidth="6"
                    strokeDasharray="339.29"
                    strokeDashoffset={
                      339.29 - (339.29 * Math.min(100, Math.max(0, result.score))) / 100
                    }
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
                  <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                    {result.score}%
                  </span>
                  <span
                    className={`text-[11px] font-mono font-bold tracking-widest uppercase mt-1 ${
                      isPassed ? "text-emerald-400" : "text-[#FF5C77]"
                    }`}
                  >
                    {isPassed ? "PASSED" : "RETAKE"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Threshold Bar */}
          <div className="mt-auto pt-5 pb-1 border-t border-white/[0.06]">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
              <span>Your score</span>
              <span>Passing: 70%</span>
            </div>

            <div className="relative w-full h-[4px] bg-slate-800 rounded-full flex items-center">
              {/* Score bar fill */}
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isPassed ? "bg-emerald-500" : "bg-purple-500"
                }`}
                style={{ width: `${Math.min(100, Math.max(0, result.score))}%` }}
              />

              {/* Score Thumb Handle */}
              <div
                className="absolute w-3.5 h-3.5 rounded-full bg-slate-200 border-2 border-slate-900 shadow-md -translate-x-1/2 transition-all duration-700"
                style={{ left: `${Math.min(100, Math.max(0, result.score))}%` }}
              />

              {/* 70% Vertical Marker Line */}
              <div
                className="absolute left-[70%] w-[2px] h-3.5 bg-purple-400 rounded-full -translate-x-1/2"
                title="Passing threshold 70%"
              />
            </div>
          </div>
        </aside>

        {/* ──────────────── Right Column / Results Dashboard (Full Width) ──────────────── */}
        <main className="flex-1 h-full flex flex-col justify-between p-6 lg:p-8 xl:p-10 overflow-y-auto custom-scrollbar bg-[#080B14] min-h-0">
          <div className="w-full flex flex-col justify-between h-full gap-5 lg:gap-6 my-auto">
            
            {/* Top 3 Metric Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6 w-full">
              {/* Total Questions */}
              <div className="p-5 lg:p-6 rounded-2xl bg-[#090C14] border border-white/[0.08] flex flex-col justify-between shadow-xl min-h-[125px]">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
                  <span>📋</span> TOTAL QUESTIONS
                </span>
                <span className="text-4xl lg:text-5xl font-black text-white mt-2 font-mono">
                  {result.totalQuestions}
                </span>
                <span className="text-xs text-slate-500 font-mono mt-1">
                  Evaluated for {result.lessonCode}
                </span>
              </div>

              {/* Correct Answers */}
              <div className="p-5 lg:p-6 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 flex flex-col justify-between shadow-xl min-h-[125px]">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
                  <span>✅</span> CORRECT ANSWERS
                </span>
                <span className="text-4xl lg:text-5xl font-black text-emerald-400 mt-2 font-mono">
                  {result.correctAnswers}
                </span>
                <span className="text-xs text-emerald-400/70 font-mono mt-1">
                  {accuracyRate}% accuracy rate
                </span>
              </div>

              {/* Incorrect Answers */}
              <div className="p-5 lg:p-6 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 flex flex-col justify-between shadow-xl min-h-[125px]">
                <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-2">
                  <span>❌</span> INCORRECT ANSWERS
                </span>
                <span className="text-4xl lg:text-5xl font-black text-rose-400 mt-2 font-mono">
                  {incorrectCount}
                </span>
                <span className="text-xs text-rose-400/70 font-mono mt-1">
                  {incorrectCount === 0 ? "Flawless mastery!" : `${incorrectCount} concepts to review`}
                </span>
              </div>
            </div>

            {/* Middle Row: 2 Cards (Question Summary 7 cols + XP Breakdown 5 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 w-full flex-1">
              {/* Question Summary (7 cols) */}
              <div className="lg:col-span-7 p-6 lg:p-7 rounded-2xl bg-[#090C14] border border-white/[0.08] flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                      <span>📑</span> QUESTION SUMMARY
                    </span>
                    <span className="text-xs font-mono text-purple-300 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30">
                      {result.correctAnswers} of {result.totalQuestions} Passed
                    </span>
                  </div>

                  <div className="space-y-3">
                    {result.evaluations.map((evalItem, idx) => (
                      <div
                        key={evalItem.questionId}
                        onClick={() => handleOpenReview(idx)}
                        className="flex items-center justify-between text-xs sm:text-sm font-mono p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-white/[0.06] text-slate-300 text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-white font-medium">
                            Question {idx + 1}
                          </span>
                        </div>

                        <span
                          className={`font-bold px-2.5 py-0.5 rounded-md text-xs ${
                            evalItem.isCorrect
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                          }`}
                        >
                          {evalItem.isCorrect ? "✓ Correct" : "✕ Incorrect"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* XP Breakdown & Balance (5 cols) */}
              <div className="lg:col-span-5 p-6 lg:p-7 rounded-2xl bg-[#090C14] border border-white/[0.08] flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">⚡</span>
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        XP REWARD & BREAKDOWN
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold">
                      +{result.netXpEarned} XP
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-xs text-slate-400 block mb-1 font-mono">
                        Base Reward
                      </span>
                      <span className="text-lg font-black font-mono text-white">
                        +{result.baseXpEarned} XP
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-xs text-slate-400 block mb-1 font-mono">
                        Hints Cost
                      </span>
                      <span
                        className={`text-lg font-black font-mono ${
                          result.xpSpentOnHints > 0 ? "text-amber-400" : "text-slate-400"
                        }`}
                      >
                        -{result.xpSpentOnHints} XP
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 p-3.5 rounded-xl bg-purple-500/5 border border-purple-500/15">
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {isPassed
                        ? "🎉 Mastery benchmark achieved! This module is marked complete and XP has been credited to your profile."
                        : "💡 Score 70% or higher to unlock the next milestone. Review the explanations below to reinforce your mental model."}
                    </p>
                  </div>
                </div>

                {/* Net XP Earned bottom row */}
                <div className="pt-4 mt-3 border-t border-white/[0.06] flex items-center justify-between font-mono">
                  <span className="text-xs text-white font-bold">Net XP Earned</span>
                  <span className="text-xl font-black text-white">
                    +{result.netXpEarned} XP
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="w-full pt-1">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => setIsReviewOpen(true)}
                  className="flex-1 py-4 px-6 rounded-xl border border-white/[0.1] bg-[#090C14] hover:bg-white/[0.06] text-white font-bold font-mono text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer w-full sm:w-auto shadow-md active:scale-[0.99]"
                >
                  <span>🔍</span>
                  <span>Review Answers & Explanations</span>
                </button>

                <button
                  onClick={onRetry}
                  className="flex-1 py-4 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold font-mono text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(168,85,247,0.45)] cursor-pointer w-full sm:w-auto active:scale-[0.99]"
                >
                  <span>🔄</span>
                  <span>Retry Quiz</span>
                </button>
              </div>

              {/* Bottom Footer Links */}
              <div className="flex items-center justify-between pt-4 mt-3 border-t border-white/[0.06] text-xs font-mono pr-14 sm:pr-16">
                <Link
                  href={trackHref}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  ← Back to Curriculum
                </Link>

                <Link
                  href="/dashboard"
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  View Dashboard History →
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Review Modal */}
      <QuizReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        lessonTitle={result.lessonTitle}
        lessonCode={result.lessonCode}
        score={result.score}
        evaluations={result.evaluations}
        initialQuestionIndex={selectedQuestionIndex}
      />
    </>
  );
}
