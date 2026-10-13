"use client";

import Link from "next/link";
import { OverallInterviewStats } from "@/types/interview";

interface InterviewReadinessWidgetProps {
  stats: OverallInterviewStats;
}

export function InterviewReadinessWidget({ stats }: InterviewReadinessWidgetProps) {
  // Retention health score: ratio of mastered to reviewed
  const healthScore = stats.questionsReviewed > 0
    ? Math.round((stats.masteredCount / stats.questionsReviewed) * 100)
    : 100;

  return (
    <div className="rounded-2xl bg-[#0E121B] border border-white/[0.08] p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base">🧠</span>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Spaced Repetition & Interview Readiness
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            SuperMemo SM-2 memory retention engine & technical interview preparedness
          </p>
        </div>

        <Link
          href="/interview"
          className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
        >
          <span>Practice</span>
          <span>→</span>
        </Link>
      </div>

      {/* 4 Key Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <span className="text-[10px] text-neutral-400 block mb-0.5 uppercase tracking-wider font-mono">
            Cards Due Today
          </span>
          <span className="text-xl font-bold font-mono text-amber-400">
            {stats.dueForReview}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <span className="text-[10px] text-neutral-400 block mb-0.5 uppercase tracking-wider font-mono">
            Mastered (SM-2)
          </span>
          <span className="text-xl font-bold font-mono text-emerald-400">
            {stats.masteredCount}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <span className="text-[10px] text-neutral-400 block mb-0.5 uppercase tracking-wider font-mono">
            Total Questions
          </span>
          <span className="text-xl font-bold font-mono text-white">
            {stats.totalQuestions}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <span className="text-[10px] text-neutral-400 block mb-0.5 uppercase tracking-wider font-mono">
            Retention Health
          </span>
          <span className="text-xl font-bold font-mono text-purple-400">
            {healthScore}%
          </span>
        </div>
      </div>

      {/* Flashcard Practice Prompt */}
      {stats.dueForReview > 0 ? (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs text-amber-200 font-medium">
              You have {stats.dueForReview} questions scheduled for active recall review.
            </span>
          </div>
          <Link
            href="/interview/react"
            className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all text-center"
          >
            Review Flashcards
          </Link>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300">
          <span>✨ All scheduled cards reviewed! Your memory retention curves are locked in.</span>
          <Link href="/interview/mock" className="font-bold underline hover:text-white">
            Try a Mock Interview
          </Link>
        </div>
      )}
    </div>
  );
}
