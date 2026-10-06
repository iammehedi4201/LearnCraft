"use client";

import React, { useState } from "react";
import type { ComputedPhase, ComputedLesson } from "./types";

export interface CompletedPhaseRowProps {
  phase: ComputedPhase;
  onLessonSelect?: (lesson: ComputedLesson) => void;
  className?: string;
}

export const CompletedPhaseRow: React.FC<CompletedPhaseRowProps> = ({
  phase,
  onLessonSelect,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`w-full rounded-[12px] bg-[#0f1a17] border border-[#1f3a31] overflow-hidden transition-all duration-200 motion-reduce:transition-none ${className}`}
    >
      {/* Slim Green Header Bar */}
      <div className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="w-6 h-6 rounded-full bg-[#142921] border border-[#1f3a31] flex items-center justify-center text-[#34d399] shrink-0 text-xs font-bold"
            aria-hidden="true"
          >
            ✓
          </span>

          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="text-sm font-semibold text-[#ececf4] truncate">
              Phase {phase.phaseNumber} · {phase.name}
            </span>

            <span className="text-xs font-mono text-[#34d399] bg-[#142921] px-2 py-0.5 rounded border border-[#1f3a31]">
              {phase.doneSteps} of {phase.totalSteps} steps
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          className="self-end sm:self-auto min-h-[44px] px-3.5 py-2 text-xs font-mono tracking-[0.08em] font-medium text-[#34d399] hover:text-white hover:bg-[#1f3a31]/60 rounded-lg border border-[#1f3a31] hover:border-[#34d399]/40 transition-colors focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:outline-none cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <span>{isExpanded ? "Hide" : "Review"}</span>
          <span
            className={`transition-transform duration-200 motion-reduce:transition-none text-[10px] ${
              isExpanded ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          >
            ▾
          </span>
        </button>
      </div>

      {/* Expanded Lessons Compact Review List */}
      {isExpanded && (
        <div
          className="border-t border-[#1f3a31] bg-[#0c1412] px-5 py-3 space-y-2 animate-fadeIn"
          role="region"
          aria-label={`Lessons in Phase ${phase.phaseNumber}`}
        >
          {phase.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg bg-[#0f1a17]/80 hover:bg-[#142921] border border-[#1f3a31]/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="w-5 h-5 rounded-full bg-[#142921] text-[#34d399] flex items-center justify-center text-xs shrink-0 font-bold"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <div className="min-w-0">
                  <span className="text-sm font-medium text-[#ececf4] hover:text-white block truncate">
                    {lesson.title}
                  </span>
                  {(lesson.code || lesson.minutes) && (
                    <span className="text-xs font-mono text-[#9a9ab5]">
                      {[lesson.code, lesson.minutes ? `${lesson.minutes} min` : null]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  )}
                </div>
              </div>

              <a
                href={lesson.computedHref}
                onClick={(e) => {
                  if (onLessonSelect) {
                    e.preventDefault();
                    onLessonSelect(lesson);
                  }
                }}
                className="min-h-[44px] px-3 py-2 text-xs font-mono text-[#34d399] hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:outline-none rounded-md flex items-center shrink-0 cursor-pointer"
              >
                Review →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
