"use client";

import React, { useState } from "react";
import type { CoursePrerequisites } from "./types";

export interface PrerequisitesCardProps {
  prerequisites: CoursePrerequisites;
  isConfirmed: boolean;
  onConfirm: () => void;
  onNavigate?: (href: string) => void;
  className?: string;
}

export const PrerequisitesCard: React.FC<PrerequisitesCardProps> = ({
  prerequisites,
  isConfirmed,
  onConfirm,
  onNavigate,
  className = "",
}) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  if (!prerequisites?.items || prerequisites.items.length === 0) {
    return null;
  }

  // Collapsed state: slim green row
  if (isConfirmed && !isReviewOpen) {
    return (
      <div
        className={`w-full rounded-[12px] bg-[#0f1a17] border border-[#1f3a31] px-5 py-3.5 flex items-center justify-between gap-3 transition-all duration-200 motion-reduce:transition-none ${className}`}
        role="region"
        aria-label="Prerequisites confirmed"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="w-6 h-6 rounded-full bg-[#1f3a31] flex items-center justify-center text-[#34d399] shrink-0 text-sm font-bold"
            aria-hidden="true"
          >
            ✓
          </span>
          <span className="text-sm font-medium text-[#ececf4] truncate">
            Prerequisites confirmed
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsReviewOpen(true)}
          aria-expanded={false}
          className="min-h-[44px] px-3.5 py-2 text-xs font-mono tracking-[0.08em] font-medium text-[#34d399] hover:text-white hover:bg-[#1f3a31]/50 rounded-lg border border-[#1f3a31] hover:border-[#34d399]/40 transition-colors focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:outline-none cursor-pointer flex items-center justify-center"
        >
          Review
        </button>
      </div>
    );
  }

  // Expanded card state
  return (
    <section
      aria-labelledby="prereq-heading"
      className={`w-full rounded-[16px] bg-[#12121b] border border-[#23233a] p-6 sm:p-7 shadow-xl shadow-black/20 transition-all duration-200 motion-reduce:transition-none relative ${className}`}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#2e2160] border border-[#7c3aed]/30 text-[#ddd6fe] text-[11px] font-mono tracking-[0.08em] uppercase font-bold">
          BEFORE YOU START
        </span>

        <span className="text-xs font-mono text-[#9a9ab5] tracking-[0.08em]">
          Quick self-check
        </span>
      </div>

      {/* Heading */}
      <h2
        id="prereq-heading"
        className="text-lg sm:text-xl font-bold text-[#ececf4] tracking-tight"
      >
        Are you comfortable with these?
      </h2>

      {/* Checklist items */}
      <ul className="mt-4 space-y-2.5" role="list">
        {prerequisites.items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-sm text-[#b4b4cc] leading-relaxed"
          >
            <span
              className="w-5 h-5 rounded-md bg-[#171428] border border-[#7c3aed]/30 text-[#a78bfa] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold"
              aria-hidden="true"
            >
              ✓
            </span>
            <span className="text-[#ececf4]">{item}</span>
          </li>
        ))}
      </ul>

      {/* Action Row */}
      <div className="mt-6 pt-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        {isConfirmed ? (
          <button
            type="button"
            onClick={() => setIsReviewOpen(false)}
            aria-expanded={true}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#23233a] hover:bg-[#2a2a44] text-[#ececf4] font-medium text-sm transition-colors border border-[#2a2a44] hover:border-[#7c3aed]/50 focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:outline-none cursor-pointer flex items-center justify-center"
          >
            Hide Review
          </button>
        ) : (
          <button
            type="button"
            onClick={onConfirm}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#23233a] hover:bg-[#2a2a44] text-[#ececf4] hover:text-white font-medium text-sm transition-all border border-[#2a2a44] hover:border-[#7c3aed]/60 shadow-sm focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:outline-none cursor-pointer flex items-center justify-center"
          >
            Yes, I&apos;m ready
          </button>
        )}

        {prerequisites.refresherHref && (
          <a
            href={prerequisites.refresherHref}
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate(prerequisites.refresherHref!);
              }
            }}
            className="min-h-[44px] px-2 py-2 inline-flex items-center text-sm font-medium text-[#a78bfa] hover:text-[#ececf4] underline underline-offset-4 decoration-[#a78bfa]/50 hover:decoration-white transition-colors focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:outline-none rounded-lg"
          >
            {prerequisites.refresherLabel || "Not sure? Open the refresher"}
          </a>
        )}
      </div>
    </section>
  );
};
