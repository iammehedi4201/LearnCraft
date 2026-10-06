"use client";

import React, { useState } from "react";
import type { ComputedPhase } from "./types";

export interface RoadmapToggleProps {
  remainingPhases: ComputedPhase[];
  className?: string;
}

export const RoadmapToggle: React.FC<RoadmapToggleProps> = ({
  remainingPhases,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!remainingPhases || remainingPhases.length === 0) {
    return null;
  }

  const phaseCount = remainingPhases.length;
  const toggleLabel = isOpen
    ? "Hide the full roadmap"
    : `Preview the full roadmap (${phaseCount} ${phaseCount === 1 ? "phase" : "phases"})`;

  return (
    <div
      className={`w-full rounded-[16px] bg-[#12121b] border border-[#23233a] overflow-hidden transition-all duration-200 motion-reduce:transition-none ${className}`}
    >
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="roadmap-content"
        className="w-full min-h-[48px] px-5 py-3.5 flex items-center justify-between text-left text-sm font-semibold text-[#ececf4] hover:text-white hover:bg-white/[0.02] transition-colors focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:outline-none cursor-pointer"
      >
        <span className="truncate">{toggleLabel}</span>

        <span
          className={`shrink-0 ml-2 transition-transform duration-200 motion-reduce:transition-none text-xs text-[#9a9ab5] ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {/* Expanded Roadmap Rows */}
      {isOpen && (
        <div
          id="roadmap-content"
          className="border-t border-[#23233a] p-4 sm:p-5 space-y-2.5 animate-fadeIn"
          role="region"
          aria-label="Upcoming locked phases roadmap"
        >
          {remainingPhases.map((phase) => {
            const unlockPhaseNumber = phase.phaseNumber - 1;
            const phaseFormatted = phase.phaseNumber < 10 ? `0${phase.phaseNumber}` : `${phase.phaseNumber}`;

            return (
              <div
                key={phase.id}
                className="w-full rounded-[12px] bg-[#0e0e16] border border-[#1b1b2b] p-3.5 sm:px-4 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3.5 min-w-0">
                  <span className="text-[11px] font-mono tracking-[0.08em] uppercase text-[#9a9ab5] bg-[#171722] px-2 py-0.5 rounded border border-[#23233a] shrink-0 w-fit">
                    PHASE {phaseFormatted}
                  </span>

                  <div className="min-w-0">
                    <span className="text-sm font-medium text-[#ececf4] block truncate">
                      {phase.name}
                    </span>
                    {phase.summary && (
                      <p className="text-xs text-[#9a9ab5] mt-0.5 line-clamp-1">
                        {phase.summary}
                      </p>
                    )}
                  </div>
                </div>

                <div className="shrink-0 self-end sm:self-auto text-xs font-mono text-[#9a9ab5]">
                  Unlocks after Phase {unlockPhaseNumber}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
