"use client";

import { useMemo } from "react";
import Link from "next/link";
import { TechIcon } from "@/components/roadmap/TechIcon";

export interface TrackProgressData {
  trackKey: string;
  title: string;
  totalLessons: number;
  completedLessons: number;
  percent: number;
  color: string;
}

interface TrackProgressDonutProps {
  tracks: TrackProgressData[];
  className?: string;
}

export function TrackProgressDonut({ tracks = [], className = "" }: TrackProgressDonutProps) {
  // Aggregate stats
  const { totalCompleted, totalAllLessons, overallPercentage } = useMemo(() => {
    let completed = 0;
    let total = 0;
    for (const t of tracks) {
      completed += t.completedLessons;
      total += t.totalLessons;
    }
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { totalCompleted: completed, totalAllLessons: total, overallPercentage: pct };
  }, [tracks]);

  // Donut geometry in crisp 160x160 viewBox
  const viewBoxSize = 160;
  const strokeWidth = 14;
  const radius = (viewBoxSize - strokeWidth) / 2; // 73px
  const circumference = 2 * Math.PI * radius; // ~458.67

  // Compute strokeDasharray and strokeDashoffset for each track segment
  let accumulatedPercent = 0;
  const segments = tracks
    .filter((t) => t.completedLessons > 0)
    .map((track) => {
      const share = (track.completedLessons / (totalCompleted || 1)) * 100;
      const strokeLength = (share / 100) * circumference;
      const offset = circumference - (accumulatedPercent / 100) * circumference;
      accumulatedPercent += share;

      return {
        ...track,
        strokeLength,
        offset,
      };
    });

  return (
    <div className={`rounded-2xl bg-[#0E121B] border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between h-full space-y-4 ${className}`}>
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-base">🎯</span>
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
            Curriculum Mastery Breakdown
          </h3>
        </div>
        <p className="text-xs text-neutral-400 mt-0.5">
          {totalCompleted} of {totalAllLessons} total lessons mastered across {tracks.length} tracks
        </p>
      </div>

      {/* Centered Donut Visualization */}
      <div className="flex flex-col items-center justify-center py-2">
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
          <svg
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
            className="w-full h-full transform -rotate-90 overflow-visible"
          >
            {/* Background Base Ring */}
            <circle
              cx={viewBoxSize / 2}
              cy={viewBoxSize / 2}
              r={radius}
              stroke="rgba(255, 255, 255, 0.06)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />

            {/* Segment Rings */}
            {segments.length > 0 ? (
              segments.map((s) => (
                <circle
                  key={s.trackKey}
                  cx={viewBoxSize / 2}
                  cy={viewBoxSize / 2}
                  r={radius}
                  stroke={s.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${s.strokeLength} ${circumference}`}
                  strokeDashoffset={s.offset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-500"
                />
              ))
            ) : overallPercentage > 0 ? (
              <circle
                cx={viewBoxSize / 2}
                cy={viewBoxSize / 2}
                r={radius}
                stroke="#8C71F6"
                strokeWidth={strokeWidth}
                strokeDasharray={`${(overallPercentage / 100) * circumference} ${circumference}`}
                strokeDashoffset={0}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-500"
              />
            ) : null}
          </svg>

          {/* Centered Percentage readout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-2xl font-black text-white font-mono tracking-tight">
              {overallPercentage}%
            </span>
            <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
              Mastery
            </span>
          </div>
        </div>
      </div>

      {/* Top Active Tracks List - Full width layout for clean alignment */}
      <div className="space-y-2 flex-1 flex flex-col justify-center">
        {tracks.slice(0, 4).map((track) => (
          <Link
            key={track.trackKey}
            href={`/learn/${track.trackKey}`}
            className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] hover:border-white/[0.08] transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center p-1 shrink-0">
                <TechIcon slug={track.trackKey} className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-neutral-300 group-hover:text-white truncate">
                {track.title}
              </span>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 ml-2">
              <div className="w-20 sm:w-24 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${track.percent}%`, backgroundColor: track.color }}
                />
              </div>
              <span className="text-[11px] font-mono text-neutral-400 w-8 text-right font-medium">
                {track.percent}%
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer link */}
      <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-xs">
        <span className="text-neutral-400 text-[11px]">Structured across {tracks.length} full-stack tracks</span>
        <Link
          href="/learn"
          className="text-purple-400 hover:text-purple-300 font-semibold text-[11px] flex items-center gap-1 transition-colors"
        >
          <span>View all curriculum</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
