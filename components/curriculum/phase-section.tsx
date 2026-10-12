"use client";

import React from "react";
import type { ComputedPhase, ComputedLesson } from "./types";
import { LessonRow } from "./lesson-row";

export interface PhaseSectionProps {
  phase: ComputedPhase;
  phaseCount: number;
  onLessonSelect?: (lesson: ComputedLesson) => void;
  className?: string;
}

export const PhaseSection: React.FC<PhaseSectionProps> = ({
  phase,
  phaseCount,
  onLessonSelect,
  className = "",
}) => {
  const percentDone =
    phase.totalSteps > 0
      ? Math.round((phase.doneSteps / phase.totalSteps) * 100)
      : 0;

  return (
    <section
      aria-labelledby={`phase-section-title-${phase.id}`}
      className={`w-full space-y-4 ${className}`}
    >
      {/* Phase Section Header */}
      <div className="space-y-2.5">
        <div className="text-xs font-mono tracking-[0.08em] uppercase text-[#a78bfa] font-semibold">
          PHASE {phase.phaseNumber} OF {phaseCount}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h2
            id={`phase-section-title-${phase.id}`}
            className="text-xl sm:text-2xl font-bold text-[#ececf4] tracking-tight"
          >
            {phase.name}
          </h2>

          <div className="text-xs sm:text-sm font-mono text-[#9a9ab5]">
            {phase.doneSteps} of {phase.totalSteps} steps done
          </div>
        </div>

        {/* 6px Progress Bar with Green Fill */}
        <div
          className="w-full h-1.5 rounded-full bg-[#23233a] overflow-hidden"
          role="progressbar"
          aria-valuenow={percentDone}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progress for Phase ${phase.phaseNumber}`}
        >
          <div
            className="h-full bg-[#34d399] transition-all duration-300 ease-out rounded-full"
            style={{ width: `${percentDone}%` }}
          />
        </div>
      </div>

      {/* Lesson List */}
      <div className="space-y-3 pt-1" role="list">
        {phase.lessons.map((lesson) => (
          <LessonRow
            key={lesson.id}
            lesson={lesson}
            status={lesson.status}
            stepNumber={lesson.stepNumber}
            onSelect={onLessonSelect}
          />
        ))}
      </div>
    </section>
  );
};
