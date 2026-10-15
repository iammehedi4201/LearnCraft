"use client";

import { useState } from "react";
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

  const isPassed = result.passed;
  const incorrectCount = result.totalQuestions - result.correctAnswers;
  const badgeCode = result.lessonCode.replace("-", "");

  return (
    <>
      <div className="w-full h-full flex flex-col md:flex-row bg-[#080B14] overflow-hidden animate-in fade-in duration-300">
        {/* ──────────────── Left Column / Sidebar ──────────────── */}
        <aside className="w-full md:w-[320px] lg:w-[360px] xl:w-[400px] shrink-0 border-b md:border-b-0 md:border-r border-white/[0.08] p-6 lg:p-8 flex flex-col justify-between bg-[#080B14] overflow-y-auto custom-scrollbar min-h-0">
          <div>
            {/* Top Badge */}
            <div className="text-center">
              <span className="inline-block px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider">
                {badgeCode} • {result.trackTitle.toUpperCase()}
              </span>
            </div>

            {/* Result Title */}
            <h2 className="text-3xl lg:text-4xl font-black text-white text-center mt-6 leading-tight">
              {isPassed ? "Mastery Achieved!" : "Needs More Practice"}
            </h2>

            {/* Subtitle */}
            <p className="text-xs text-slate-400 text-center mt-3 leading-relaxed max-w-xs mx-auto">
              {isPassed
                ? `Great job! You achieved ${result.score}%, passing the 70% threshold. You demonstrated solid understanding of ${result.lessonTitle}.`
                : `You scored below the passing threshold of 70%. Review the architectural explanations and try again!`}
            </p>

            {/* Circular Donut Gauge */}
            <div className="flex flex-col items-center justify-center my-8">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#13192B"
                    strokeWidth="7"
                  />
                  {/* Progress Arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={isPassed ? "#10B981" : "#A855F7"}
                    strokeWidth="7"
                    strokeDasharray="251.3"
                    strokeDashoffset={
                      251.3 -
                      (251.3 * Math.min(100, Math.max(0, result.score))) / 100
                    }
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black font-mono text-white tracking-tight">
                    {result.score}%
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400 mt-1">
                    {isPassed ? "PASSED" : "RETAKE"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Passing Threshold Bar */}
          <div className="mt-auto pt-6 border-t border-white/[0.06]">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Your score</span>
              <span>Passing: 70%</span>
            </div>

            <div className="relative w-full h-1.5 bg-white/[0.08] rounded-full mt-2">
              {/* Score bar */}
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isPassed ? "bg-emerald-500" : "bg-purple-500"
                }`}
                style={{
                  width: `${Math.min(100, Math.max(0, result.score))}%`,
                }}
              />
              {/* 70% Marker Line */}
              <div className="absolute top-1/2 -translate-y-1/2 left-[70%] w-0.5 h-3 bg-purple-400 rounded-full" />
            </div>
          </div>
        </aside>

        {/* ──────────────── Right Column / Results Dashboard ──────────────── */}
        <main className="flex-1 h-full flex flex-col justify-center px-6 py-6 lg:px-12 xl:px-16 overflow-y-auto custom-scrollbar bg-[#0B0F19] min-h-0">
          <div className="w-full max-w-6xl xl:max-w-7xl mx-auto flex flex-col justify-center gap-6 lg:gap-7 my-auto py-4">
            {/* Top 3 Metric Stat Cards */}
            <div className="grid grid-cols-3 gap-5 lg:gap-6 w-full">
              {/* Questions */}
              <div className="p-6 lg:p-7 rounded-2xl bg-[#090C14] border border-white/[0.08] flex flex-col justify-between shadow-xl min-h-[140px]">
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

              {/* Correct */}
              <div className="p-6 lg:p-7 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 flex flex-col justify-between shadow-xl min-h-[140px]">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
                  <span>✅</span> CORRECT ANSWERS
                </span>
                <span className="text-4xl lg:text-5xl font-black text-emerald-400 mt-2 font-mono">
                  {result.correctAnswers}
                </span>
                <span className="text-xs text-emerald-400/70 font-mono mt-1">
                  {Math.round((result.correctAnswers / result.totalQuestions) * 100)}% accuracy rate
                </span>
              </div>

              {/* Incorrect */}
              <div className="p-6 lg:p-7 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 flex flex-col justify-between shadow-xl min-h-[140px]">
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

            {/* Middle Row: 2 Cards (Question Summary + XP Breakdown) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 w-full">
              {/* Question Summary (7 cols) */}
              <div className="lg:col-span-7 p-6 lg:p-7 rounded-2xl bg-[#090C14] border border-white/[0.08] flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-5">
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
                        className="flex items-center justify-between text-xs sm:text-sm font-mono p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] transition-colors"
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
                  <div className="flex items-center justify-between mb-5">
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
                      <span className="text-xs text-slate-400 block mb-1">
                        Base Reward
                      </span>
                      <span className="text-lg font-black font-mono text-white">
                        +{result.baseXpEarned} XP
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-xs text-slate-400 block mb-1">
                        Hints Cost
                      </span>
                      <span
                        className={`text-lg font-black font-mono ${
                          result.xpSpentOnHints > 0
                            ? "text-amber-400"
                            : "text-slate-400"
                        }`}
                      >
                        -{result.xpSpentOnHints} XP
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 p-3.5 rounded-xl bg-purple-500/5 border border-purple-500/15">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isPassed
                        ? "🎉 Mastery benchmark achieved! This module is marked complete and XP has been credited to your profile."
                        : "💡 Score 70% or higher to unlock the next milestone. Review the explanations below to reinforce your mental model."}
                    </p>
                  </div>

                  {result.isRepeat && (
                    <p className="text-xs text-slate-400 italic mt-3">
                      ℹ️ Practice attempt: Previously achieved {result.previousBestScore}%.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons & Footer Links */}
            <div className="pt-2">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => setIsReviewOpen(true)}
                  className="flex-1 py-4 px-6 rounded-xl border border-white/[0.1] bg-[#090C14] hover:bg-white/[0.06] text-white font-bold font-mono text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer w-full sm:w-auto"
                >
                  <span>🔍</span>
                  <span>Review Answers & Explanations</span>
                </button>

                <button
                  onClick={onRetry}
                  className="flex-1 py-4 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold font-mono text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xl shadow-purple-950/40 cursor-pointer w-full sm:w-auto"
                >
                  <span>🔄</span>
                  <span>Retry Quiz</span>
                </button>
              </div>

              {/* Bottom Footer Links with clearance for floating settings button */}
              <div className="flex items-center justify-between pt-6 mt-4 border-t border-white/[0.06] text-xs font-mono pr-14 sm:pr-16">
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
      />
    </>
  );
}
