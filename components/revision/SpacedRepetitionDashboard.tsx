"use client";

import { useMemo } from "react";
import { AnnotationItem } from "@/types/revision";
import {
  computeSpacedRepetitionStats,
  generateMemoryDecayCurveData,
  getDueQueue,
} from "@/lib/spaced-repetition";

interface SpacedRepetitionDashboardProps {
  annotations: AnnotationItem[];
  onStartSession: (queue?: AnnotationItem[]) => void;
}

export function SpacedRepetitionDashboard({
  annotations,
  onStartSession,
}: SpacedRepetitionDashboardProps) {
  const stats = useMemo(() => computeSpacedRepetitionStats(annotations), [annotations]);
  const dueQueue = useMemo(() => getDueQueue(annotations), [annotations]);
  const curveData = useMemo(() => generateMemoryDecayCurveData(annotations), [annotations]);

  const hasDueCards = dueQueue.length > 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner: Queue Call-to-Action & Retention Gauge */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121727] via-[#0E121D] to-[#0A0D14] border border-white/[0.08] p-6 sm:p-8 shadow-2xl shadow-purple-900/10">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              SuperMemo SM-2 Algorithmic Memory Engine
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
              {hasDueCards
                ? `${dueQueue.length} Card${dueQueue.length > 1 ? "s" : ""} Due for Review Today`
                : "✨ All Caught Up for Today!"}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {hasDueCards
                ? "Review your notes using active recall spaced repetition. The algorithm schedules each card just before you are about to forget it to lock knowledge into long-term memory."
                : "Great job! Your memory stability is high. You can review cards ahead of time or add new highlights and notes while studying."}
            </p>
          </div>

          {/* Action Trigger Button & Retention Gauge */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 w-full lg:w-auto">
            {/* Memory Retention Dial */}
            <div className="flex items-center gap-3.5 bg-white/[0.03] border border-white/[0.08] px-4 py-3 rounded-2xl">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 -rotate-90 transform" viewBox="0 0 36 36">
                  <path
                    className="text-white/10"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-purple-400 transition-all duration-1000 ease-out"
                    strokeDasharray={`${stats.averageRetentionRate}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-black text-white font-mono">
                  {stats.averageRetentionRate}%
                </span>
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                  Retention Index
                </span>
                <span className="text-xs font-bold text-white">
                  {stats.averageRetentionRate >= 85
                    ? "🔥 Excellent"
                    : stats.averageRetentionRate >= 65
                    ? "👍 Good Retention"
                    : "⚠️ Refresh Due"}
                </span>
              </div>
            </div>

            {/* Launch Review Button */}
            <button
              onClick={() => onStartSession(hasDueCards ? dueQueue : annotations)}
              disabled={annotations.length === 0}
              className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:from-purple-700 active:to-indigo-700 text-white font-bold text-sm shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{hasDueCards ? "Start Daily Review" : "Practice All Cards"}</span>
              <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-xs font-mono">
                {hasDueCards ? dueQueue.length : annotations.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Due Today */}
        <div className="p-5 rounded-2xl bg-[#0E121B] border border-white/[0.06] flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-xl font-bold">
            📅
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Due for Review
            </span>
            <span className="text-xl font-black text-white font-mono">
              {stats.dueTodayCount}
            </span>
          </div>
        </div>

        {/* Learning */}
        <div className="p-5 rounded-2xl bg-[#0E121B] border border-white/[0.06] flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-xl font-bold">
            ⚡
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              In Learning Phase
            </span>
            <span className="text-xl font-black text-white font-mono">
              {stats.learningCount}
            </span>
          </div>
        </div>

        {/* Mastered */}
        <div className="p-5 rounded-2xl bg-[#0E121B] border border-white/[0.06] flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-bold">
            🏆
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Long-Term Mastered
            </span>
            <span className="text-xl font-black text-white font-mono">
              {stats.masteredCount}
            </span>
          </div>
        </div>

        {/* Study Streak */}
        <div className="p-5 rounded-2xl bg-[#0E121B] border border-white/[0.06] flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-xl font-bold">
            🔥
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Study Streak
            </span>
            <span className="text-xl font-black text-white font-mono">
              {stats.streakDays} Day{stats.streakDays === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Analytics: Ebbinghaus Forgetting Curve Graph */}
      <div className="p-6 rounded-3xl bg-[#0E121B] border border-white/[0.06] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/[0.06]">
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <span>📈</span>
              <span>Ebbinghaus Memory Retention Curve</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparison between typical un-reviewed memory decay vs SM-2 Spaced Repetition reinforcement.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-purple-400 rounded-full" />
              <span className="text-purple-300">With Spaced Repetition</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-slate-600 rounded-full border-b border-dashed" />
              <span className="text-slate-400">Without Review (Decay)</span>
            </div>
          </div>
        </div>

        {/* SVG Chart */}
        <div className="relative h-44 w-full pt-4">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid horizontal lines */}
            <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
            <line x1="0" y1="60" x2="500" y2="60" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
            <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

            {/* Without Review (Ebbinghaus decay curve) */}
            <path
              d={curveData
                .map((pt, idx) => {
                  const x = (pt.day / 30) * 500;
                  const y = 110 - (pt.decayPercent / 100) * 90;
                  return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                })
                .join(" ")}
              fill="none"
              stroke="#64748B"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* With Spaced Repetition (Boosted Curve) Fill */}
            <path
              d={`${curveData
                .map((pt, idx) => {
                  const x = (pt.day / 30) * 500;
                  const y = 110 - (pt.recalledPercent / 100) * 90;
                  return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                })
                .join(" ")} L 500 110 L 0 110 Z`}
              fill="url(#curveGradient)"
            />

            {/* With Spaced Repetition (Boosted Curve) Stroke */}
            <path
              d={curveData
                .map((pt, idx) => {
                  const x = (pt.day / 30) * 500;
                  const y = 110 - (pt.recalledPercent / 100) * 90;
                  return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                })
                .join(" ")}
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="3"
            />

            {/* Interval check markers */}
            {curveData.slice(1, 8).map((pt, idx) => {
              const x = (pt.day / 30) * 500;
              const y = 110 - (pt.recalledPercent / 100) * 90;
              return (
                <circle
                  key={idx}
                  cx={x}
                  cy={y}
                  r="3.5"
                  className="fill-[#0E121B] stroke-purple-400 stroke-2"
                />
              );
            })}
          </svg>

          {/* X Axis Labels */}
          <div className="flex justify-between text-[10px] text-slate-400 pt-1 font-mono">
            <span>Day 0 (Initial Learn)</span>
            <span>Day 7</span>
            <span>Day 14 (Reinforced)</span>
            <span>Day 21</span>
            <span>Day 30 (Permanent Mastery)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
