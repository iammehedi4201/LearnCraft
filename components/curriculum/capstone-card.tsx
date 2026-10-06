"use client";

import React from "react";
import type { Capstone } from "./types";

export interface CapstoneCardProps {
  capstone?: Capstone;
  phaseCount: number;
  isUnlocked: boolean;
  onStartCapstone?: () => void;
  className?: string;
}

export const CapstoneCard: React.FC<CapstoneCardProps> = ({
  capstone,
  phaseCount,
  isUnlocked,
  onStartCapstone,
  className = "",
}) => {
  // If course has no capstone, this component renders nothing (CourseCompleteRow handles the empty capstone case)
  if (!capstone) {
    return null;
  }

  if (isUnlocked) {
    return (
      <section
        aria-label="Unlocked Capstone Project"
        className={`w-full rounded-[16px] bg-[#171428] border-2 border-[#7c3aed] p-6 sm:p-7 shadow-2xl shadow-purple-950/30 transition-all duration-200 motion-reduce:transition-none flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden ${className}`}
      >
        <div className="space-y-2.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-[0.08em] uppercase font-bold text-[#ddd6fe] bg-[#2e2160] px-2.5 py-0.5 rounded border border-[#7c3aed]/40">
              FINAL CAPSTONE · UNLOCKED
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#ececf4] tracking-tight">
            {capstone.title}
          </h3>

          {capstone.description && (
            <p className="text-sm text-[#b4b4cc] leading-relaxed">
              {capstone.description}
            </p>
          )}
        </div>

        <div className="shrink-0">
          <a
            href={capstone.href || "#"}
            onClick={(e) => {
              if (onStartCapstone) {
                e.preventDefault();
                onStartCapstone();
              }
            }}
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-sm transition-all shadow-lg shadow-purple-950/40 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <span>Start Capstone</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    );
  }

  // Locked Capstone State
  return (
    <div
      aria-label="Locked Capstone Project"
      className={`w-full rounded-[16px] bg-[#12121b] border border-dashed border-[#23233a] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${className}`}
    >
      <div className="flex items-start sm:items-center gap-4 min-w-0">
        {/* Capstone Flag Icon */}
        <div
          className="w-10 h-10 rounded-xl bg-[#171724] border border-[#23233a] flex items-center justify-center text-[#9a9ab5] shrink-0"
          aria-hidden="true"
        >
          <svg
            className="w-5 h-5 text-[#9a9ab5]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.75}
              d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
            />
          </svg>
        </div>

        <div className="space-y-1 min-w-0">
          <div className="text-[11px] font-mono tracking-[0.08em] uppercase text-[#9a9ab5]">
            FINAL CAPSTONE · UNLOCKS AFTER PHASE {phaseCount}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-[#ececf4] truncate">
            {capstone.title}
          </h3>

          {capstone.description && (
            <p className="text-xs sm:text-sm text-[#9a9ab5] leading-relaxed">
              {capstone.description}
            </p>
          )}
        </div>
      </div>

      <div className="shrink-0 self-end sm:self-auto flex items-center gap-1.5 text-xs font-mono text-[#9a9ab5] select-none">
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <span>Locked</span>
      </div>
    </div>
  );
};

export interface CourseCompleteRowProps {
  totalLessons: number;
  phaseCount: number;
  className?: string;
}

export const CourseCompleteRow: React.FC<CourseCompleteRowProps> = ({
  totalLessons,
  phaseCount,
  className = "",
}) => {
  return (
    <div
      role="region"
      aria-label="Course Completed"
      className={`w-full rounded-[16px] bg-[#0f1a17] border border-[#1f3a31] p-6 sm:p-7 flex items-center gap-4 ${className}`}
    >
      <span
        className="w-10 h-10 rounded-full bg-[#142921] border border-[#1f3a31] text-[#34d399] flex items-center justify-center shrink-0 text-lg font-bold"
        aria-hidden="true"
      >
        ✓
      </span>
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#ececf4]">
          Course complete
        </h3>
        <p className="text-xs sm:text-sm text-[#34d399] mt-0.5">
          You have finished all {totalLessons} lessons across {phaseCount} phases!
        </p>
      </div>
    </div>
  );
};
