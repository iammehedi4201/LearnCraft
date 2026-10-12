"use client";

import Link from "next/link";
import { InterviewTrackInfo } from "@/lib/interview-questions";
import { TrackInterviewStats } from "@/types/interview";
import { TechIcon } from "@/components/roadmap/TechIcon";

interface TopicCardProps {
  track: InterviewTrackInfo;
  stats: TrackInterviewStats;
}

export function TopicCard({ track, stats }: TopicCardProps) {
  return (
    <div className="group relative rounded-2xl bg-neutral-900/70 border border-white/[0.08] hover:border-purple-500/40 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 flex flex-col justify-between backdrop-blur-sm">
      {/* Glow Hover Effect */}
      <div className="absolute -inset-px rounded-2xl bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center p-2 group-hover:scale-110 group-hover:border-purple-500/40 transition-all flex-shrink-0 shadow-sm">
              <TechIcon slug={track.trackKey} className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-purple-300 transition-colors">
                {track.title}
              </h3>
              <span className="text-xs text-neutral-400">
                {track.questionCount} interview questions
              </span>
            </div>
          </div>

          {stats.dueForReview > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold animate-pulse">
              {stats.dueForReview} due
            </span>
          )}
        </div>

        <p className="text-xs text-neutral-400 line-clamp-2 mb-4 leading-relaxed">
          {track.description}
        </p>

        {/* Categories Pill List */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {track.categories.slice(0, 3).map((cat, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] text-neutral-300 font-mono"
            >
              {cat}
            </span>
          ))}
          {track.categories.length > 3 && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] text-neutral-400 font-mono">
              +{track.categories.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Mastery Progress Bar & Actions */}
      <div>
        <div className="mb-4 space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-400">Mastery</span>
            <span className="font-mono font-semibold text-neutral-200">
              {stats.percentMastered}% ({stats.masteredCount}/{stats.totalQuestions})
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full bg-purple-500 transition-all duration-500"
              style={{ width: `${stats.percentMastered}%` }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06]">
          <Link
            href={`/interview/${track.trackKey}`}
            className="w-full py-2 px-3 rounded-xl bg-purple-600/90 hover:bg-purple-600 text-white font-semibold text-xs text-center transition-all flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/20 cursor-pointer active:scale-95"
          >
            <span>🎯 Practice</span>
          </Link>

          <Link
            href={`/interview/${track.trackKey}/browse`}
            className="w-full py-2 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-neutral-300 hover:text-white font-semibold text-xs text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>📖 Browse Q&A</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
