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

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/10 shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
        {/* Header Status */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
            <span>{result.lessonCode || "ASSESSMENT"}</span>
            <span>·</span>
            <span>{result.trackTitle}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isPassed ? "🎉 Module Mastery Passed!" : "Needs More Practice"}
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            {isPassed
              ? `Great job! You demonstrated deep comprehension of ${result.lessonTitle}.`
              : `You scored below the passing threshold of 70%. Review the architectural explanations and try again!`}
          </p>
        </div>

        {/* Circular Score Gauge */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={isPassed ? "#10B981" : "#F43F5E"}
                strokeWidth="10"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * result.score) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black font-mono text-white tracking-tight">
                {result.score}%
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {isPassed ? "Passed" : "Retake"}
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Questions
            </span>
            <span className="text-lg font-black font-mono text-white">
              {result.totalQuestions}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 text-center space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">
              Correct
            </span>
            <span className="text-lg font-black font-mono text-emerald-300">
              {result.correctAnswers}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 text-center space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 block">
              Incorrect
            </span>
            <span className="text-lg font-black font-mono text-rose-300">
              {incorrectCount}
            </span>
          </div>
        </div>

        {/* XP Integration Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                XP Breakdown & Balance
              </h4>
            </div>

            <span className="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 font-mono font-black text-sm">
              +{result.netXpEarned} XP
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-white/[0.06] text-xs">
            <div className="flex items-center justify-between sm:flex-col sm:items-start p-2 rounded-lg bg-black/20">
              <span className="text-slate-400 text-[11px]">Base Reward</span>
              <span className="font-mono font-bold text-slate-200">
                +{result.baseXpEarned} XP
              </span>
            </div>

            {result.perfectBonusXp > 0 && (
              <div className="flex items-center justify-between sm:flex-col sm:items-start p-2 rounded-lg bg-black/20">
                <span className="text-amber-400 text-[11px]">100% Perfect Bonus</span>
                <span className="font-mono font-bold text-amber-300">
                  +{result.perfectBonusXp} XP
                </span>
              </div>
            )}

            <div className="flex items-center justify-between sm:flex-col sm:items-start p-2 rounded-lg bg-black/20">
              <span className="text-slate-400 text-[11px]">Hints Cost</span>
              <span className={`font-mono font-bold ${result.xpSpentOnHints > 0 ? "text-amber-400" : "text-slate-500"}`}>
                -{result.xpSpentOnHints} XP
              </span>
            </div>
          </div>

          {result.isRepeat && (
            <p className="text-[11px] text-slate-400 italic pt-1">
              {result.previousBestScore !== null && result.score > result.previousBestScore
                ? `🌟 Score improved from ${result.previousBestScore}%! Awarded difference.`
                : `ℹ️ Practice attempt: You previously achieved ${result.previousBestScore}%. No duplicate XP awarded.`}
            </p>
          )}
        </div>

        {/* Navigation & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={() => setIsReviewOpen(true)}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            <span>🔍</span>
            <span>Review Answers & Explanations</span>
          </button>

          <button
            onClick={onRetry}
            className="w-full sm:w-auto py-3 px-5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
          >
            <span>🔄</span>
            <span>Retry Quiz</span>
          </button>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-xs">
          <Link
            href={trackHref}
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>&larr;</span> Back to Curriculum
          </Link>
          <Link
            href="/dashboard"
            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
          >
            View Dashboard History <span>&rarr;</span>
          </Link>
        </div>
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
