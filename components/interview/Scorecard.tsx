"use client";

import Link from "next/link";
import { MockInterviewResult } from "@/types/interview";

interface ScorecardProps {
  result: MockInterviewResult;
  onRestart: () => void;
}

export function Scorecard({ result, onRestart }: ScorecardProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  };

  const getTier = (percent: number) => {
    if (percent >= 85) {
      return {
        badge: "🏆 Staff / Senior Ready",
        color: "text-emerald-400",
        border: "border-emerald-500/30",
        bg: "bg-emerald-500/10",
        message: "Outstanding recall! You demonstrated comprehensive mastery across these topics.",
      };
    } else if (percent >= 65) {
      return {
        badge: "🚀 Strong Candidate",
        color: "text-purple-400",
        border: "border-purple-500/30",
        bg: "bg-purple-500/10",
        message: "Solid performance! A quick review of the flagged questions will prepare you well.",
      };
    } else {
      return {
        badge: "💡 Needs Preparation",
        color: "text-amber-400",
        border: "border-amber-500/30",
        bg: "bg-amber-500/10",
        message: "Great effort! Focus your study sessions on the questions you rated 'Again' and 'Hard'.",
      };
    }
  };

  const tier = getTier(result.scorePercent);

  // Count grades
  const counts = {
    easy: 0,
    good: 0,
    hard: 0,
    again: 0,
  };

  Object.values(result.grades).forEach((g) => {
    if (g in counts) counts[g as keyof typeof counts]++;
  });

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl bg-neutral-900/90 border border-white/[0.08] shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
      {/* Top Banner */}
      <div className="text-center space-y-2">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${tier.bg} ${tier.color} ${tier.border}`}
        >
          {tier.badge}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Mock Interview Completed!
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
          {tier.message}
        </p>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
          <span className="text-[11px] text-neutral-400 block mb-1">Score</span>
          <span className="text-2xl sm:text-3xl font-black text-white font-mono">
            {result.scorePercent}%
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
          <span className="text-[11px] text-neutral-400 block mb-1">XP Earned</span>
          <span className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">
            +{result.xpEarned} XP
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
          <span className="text-[11px] text-neutral-400 block mb-1">Duration</span>
          <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">
            {formatTime(result.timeSpentSeconds)}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
          <span className="text-[11px] text-neutral-400 block mb-1">Questions</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
            {result.totalQuestions}
          </span>
        </div>
      </div>

      {/* Grade Breakdown Pill Bar */}
      <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2">
        <span className="text-xs font-semibold text-neutral-300 block">
          Recall Quality Breakdown
        </span>
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300">
            <span className="block font-bold text-sm">{counts.again}</span>
            <span className="text-[10px] text-rose-400/80">🔴 Again</span>
          </div>
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
            <span className="block font-bold text-sm">{counts.hard}</span>
            <span className="text-[10px] text-amber-400/80">🟠 Hard</span>
          </div>
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
            <span className="block font-bold text-sm">{counts.good}</span>
            <span className="text-[10px] text-emerald-400/80">🟢 Good</span>
          </div>
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
            <span className="block font-bold text-sm">{counts.easy}</span>
            <span className="text-[10px] text-cyan-400/80">💎 Easy</span>
          </div>
        </div>
      </div>

      {/* Question Details List */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-neutral-300 block">
          Questions Reviewed in this Session
        </span>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {result.answersSummary.map((item, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="font-mono text-neutral-400 font-bold">#{i + 1}</span>
                <span className="truncate text-neutral-200 font-medium">
                  {item.questionText}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="px-2 py-0.5 rounded bg-white/[0.05] text-[10px] text-neutral-400 font-mono">
                  {item.trackKey}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.grade === "easy"
                      ? "bg-cyan-500/20 text-cyan-300"
                      : item.grade === "good"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : item.grade === "hard"
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-rose-500/20 text-rose-300"
                  }`}
                >
                  {item.grade.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onRestart}
          className="flex-1 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-purple-600/20 cursor-pointer flex items-center justify-center gap-2 active:scale-95"
        >
          <span>🎲 Start Another Mock Session</span>
        </button>

        <Link
          href="/interview"
          className="py-3 px-5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-neutral-200 font-semibold text-sm transition-all text-center cursor-pointer active:scale-95"
        >
          <span>Return to Hub</span>
        </Link>
      </div>
    </div>
  );
}
