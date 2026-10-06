"use client";

import React from "react";
import type { ComputedLesson, LessonStatus } from "./types";

export interface LessonRowProps {
  lesson: ComputedLesson;
  status: LessonStatus;
  stepNumber: number;
  onSelect?: (lesson: ComputedLesson) => void;
  className?: string;
}

export const LessonRow: React.FC<LessonRowProps> = ({
  lesson,
  status,
  stepNumber,
  onSelect,
  className = "",
}) => {
  const isLocked = status === "locked";
  const isCurrent = status === "current";
  const isCompleted = status === "completed";
  const isNext = status === "next";

  // Build meta string skipping missing pieces
  const metaParts = [
    lesson.code,
    lesson.minutes ? `${lesson.minutes} min` : null,
  ].filter(Boolean);
  const metaString = metaParts.join(" · ");

  const handleClick = (e: React.MouseEvent) => {
    if (isLocked) {
      e.preventDefault();
      return;
    }
    if (onSelect) {
      e.preventDefault();
      onSelect(lesson);
    }
  };

  // Outer row styling depending on status
  const getRowStyle = () => {
    switch (status) {
      case "completed":
        return "bg-[#0f1a17] border-[#1f3a31] hover:border-[#34d399]/40 cursor-pointer text-[#ececf4]";
      case "current":
        return "bg-[#171428] border-[#7c3aed]/50 shadow-md shadow-purple-950/20 hover:border-[#7c3aed] cursor-pointer text-white";
      case "next":
        return "bg-[#12121b] border-[#23233a] hover:border-[#2a2a44] cursor-pointer text-[#ececf4]";
      case "locked":
      default:
        return "bg-[#0e0e16] border-[#1b1b2b] opacity-60 cursor-not-allowed text-[#808098]";
    }
  };

  const content = (
    <div
      className={`w-full min-h-[56px] rounded-[12px] border p-4 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors duration-150 motion-reduce:transition-none ${getRowStyle()} ${className}`}
      aria-current={isCurrent ? "step" : undefined}
      aria-disabled={isLocked ? true : undefined}
    >
      {/* Left side: Circle + Title & Meta */}
      <div className="flex items-start sm:items-center gap-3.5 min-w-0">
        {/* Step Number Circle / Icon */}
        <div className="shrink-0 pt-0.5 sm:pt-0">
          {isCompleted ? (
            <span
              className="w-7 h-7 rounded-full bg-[#142921] border border-[#1f3a31] text-[#34d399] flex items-center justify-center text-xs font-bold"
              aria-hidden="true"
            >
              ✓
            </span>
          ) : isCurrent ? (
            <span
              className="w-7 h-7 rounded-full bg-[#7c3aed] text-white flex items-center justify-center text-xs font-mono font-bold shadow-sm shadow-purple-900"
              aria-hidden="true"
            >
              {stepNumber}
            </span>
          ) : isNext ? (
            <span
              className="w-7 h-7 rounded-full bg-[#23233a] text-[#b4b4cc] flex items-center justify-center text-xs font-mono font-medium"
              aria-hidden="true"
            >
              {stepNumber}
            </span>
          ) : (
            <span
              className="w-7 h-7 rounded-full bg-[#181822] text-[#6b6b80] flex items-center justify-center text-xs font-mono font-medium"
              aria-hidden="true"
            >
              {stepNumber}
            </span>
          )}
        </div>

        {/* Title, Meta and Details */}
        <div className="min-w-0 space-y-0.5">
          <h3
            className={`text-sm sm:text-base font-semibold leading-snug break-words ${
              isCurrent
                ? "text-white font-bold"
                : isCompleted
                ? "text-[#ececf4]"
                : isNext
                ? "text-[#ececf4]"
                : "text-[#808098]"
            }`}
          >
            {lesson.title}
          </h3>

          {metaString && (
            <p
              className={`text-xs font-mono tracking-[0.08em] ${
                isCurrent
                  ? "text-[#a78bfa]"
                  : isCompleted
                  ? "text-[#34d399]/80"
                  : isNext
                  ? "text-[#9a9ab5]"
                  : "text-[#6b6b80]"
              }`}
            >
              {metaString}
            </p>
          )}

          {/* If current and description/requires present, display when spotlight card isn't used */}
          {isCurrent && lesson.requires && (
            <p className="text-xs font-mono text-[#b4b4cc] pt-0.5 sm:hidden">
              Requires: {lesson.requires}
            </p>
          )}
        </div>
      </div>

      {/* Right side: State Label / Pill */}
      <div className="shrink-0 self-end sm:self-auto flex items-center">
        {isCompleted && (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#34d399] min-h-[44px] px-2">
            <span aria-hidden="true">✓</span>
            <span>Completed</span>
          </span>
        )}

        {isCurrent && (
          <span className="min-h-[44px] px-4 py-2 rounded-full bg-[#7c3aed] text-white text-xs font-bold tracking-wider uppercase shadow-md shadow-purple-950/40 flex items-center justify-center">
            Start here
          </span>
        )}

        {isNext && (
          <span className="inline-flex items-center text-xs font-medium text-[#b4b4cc] min-h-[44px] px-2">
            Up next
          </span>
        )}

        {isLocked && (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#6b6b80] min-h-[44px] px-2 select-none">
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
          </span>
        )}
      </div>
    </div>
  );

  if (isLocked) {
    return <div className="w-full">{content}</div>;
  }

  return (
    <a
      href={lesson.computedHref}
      onClick={handleClick}
      className="block w-full focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:outline-none rounded-[12px]"
      tabIndex={0}
      aria-label={`${lesson.title} - ${status}`}
    >
      {content}
    </a>
  );
};
