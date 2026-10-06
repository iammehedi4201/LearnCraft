"use client";

import React from "react";
import type { ComputedLesson } from "./types";

export interface CurrentStepCardProps {
  lesson: ComputedLesson;
  chipText: string;
  onSelect?: (lesson: ComputedLesson) => void;
  className?: string;
}

export const CurrentStepCard: React.FC<CurrentStepCardProps> = ({
  lesson,
  chipText,
  onSelect,
  className = "",
}) => {
  // Label for primary CTA button
  const isFirstStepOfNewPhase =
    lesson.stepNumber === 1 && lesson.phaseNumber > 1;

  const buttonLabel = isFirstStepOfNewPhase
    ? `Start Phase ${lesson.phaseNumber} →`
    : `Start Step ${lesson.stepNumber} →`;

  return (
    <section
      aria-label="Current Recommended Step"
      className={`w-full rounded-[16px] bg-[#171428] border border-[#7c3aed]/40 p-6 sm:p-7 shadow-2xl shadow-purple-950/20 relative overflow-hidden transition-all duration-200 motion-reduce:transition-none ${className}`}
    >
      {/* Subtle purple gradient background highlight */}
      <div
        className="absolute top-0 right-0 w-80 h-80 bg-[#7c3aed]/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"
        aria-hidden="true"
      />

      <div className="relative z-10 space-y-4">
        {/* Top Meta Line: Chip & Minutes */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#2e2160] border border-[#7c3aed]/40 text-[#ddd6fe] text-xs font-mono font-bold tracking-[0.08em] uppercase">
            {chipText}
          </span>

          {lesson.minutes && (
            <span className="text-xs font-mono text-[#9a9ab5]">
              {lesson.minutes} min
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#ececf4] tracking-tight leading-snug">
          {lesson.title}
        </h2>

        {/* Description */}
        {lesson.description && (
          <p className="text-sm sm:text-base text-[#b4b4cc] leading-relaxed max-w-4xl">
            {lesson.description}
          </p>
        )}

        {/* Primary Action Button & Requirements */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
          <a
            href={lesson.computedHref}
            onClick={(e) => {
              if (onSelect) {
                e.preventDefault();
                onSelect(lesson);
              }
            }}
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-sm transition-all duration-150 shadow-lg shadow-purple-950/40 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <span>{buttonLabel}</span>
          </a>

          {lesson.requires && (
            <span className="text-xs font-mono text-[#b4b4cc] flex items-center gap-1.5">
              <span>Requires:</span>
              <span className="text-[#ececf4] font-medium">{lesson.requires}</span>
            </span>
          )}
        </div>
      </div>
    </section>
  );
};
