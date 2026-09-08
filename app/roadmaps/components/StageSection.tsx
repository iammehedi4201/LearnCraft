"use client";

/**
 * StageSection — A collapsible stage/module section containing lesson nodes.
 */

import { useState } from "react";
import { RoadmapNode, NodeStatus } from "./RoadmapNode";
import type { RoadmapLesson } from "@/lib/roadmap-data";

interface StageSectionProps {
  stageNumber: number;
  name: string;
  subtitle: string;
  description: string;
  lessons: RoadmapLesson[];
  /** Function to determine the completion status of a lesson */
  getLessonStatus: (slug: string, code: string) => NodeStatus;
  /** Whether this stage is initially expanded */
  defaultExpanded?: boolean;
  /** Whether this is the last stage */
  isLast?: boolean;
}

const STAGE_COLORS: Record<number, {
  badge: string;
  accent: string;
  line: string;
  number: string;
}> = {
  1: { badge: "bg-ds-success-lighter text-ds-success-dark", accent: "border-ds-success-light", line: "bg-ds-success-light", number: "text-ds-success-dark bg-ds-success-lighter" },
  2: { badge: "bg-ds-info-lighter text-ds-info-dark", accent: "border-ds-info-light", line: "bg-ds-info-light", number: "text-ds-info-dark bg-ds-info-lighter" },
  3: { badge: "bg-ds-feature-lighter text-ds-feature-dark", accent: "border-ds-feature-light", line: "bg-ds-feature-light", number: "text-ds-feature-dark bg-ds-feature-lighter" },
  4: { badge: "bg-ds-warning-lighter text-ds-warning-dark", accent: "border-ds-warning-light", line: "bg-ds-warning-light", number: "text-ds-warning-dark bg-ds-warning-lighter" },
  5: { badge: "bg-ds-stable-lighter text-ds-stable-dark", accent: "border-ds-stable-light", line: "bg-ds-stable-light", number: "text-ds-stable-dark bg-ds-stable-lighter" },
  6: { badge: "bg-ds-highlighted-lighter text-ds-highlighted-dark", accent: "border-ds-highlighted-light", line: "bg-ds-highlighted-light", number: "text-ds-highlighted-dark bg-ds-highlighted-lighter" },
};

function getStageColor(n: number) {
  return STAGE_COLORS[n] || STAGE_COLORS[1];
}

export function StageSection({
  stageNumber,
  name,
  subtitle,
  description,
  lessons,
  getLessonStatus,
  defaultExpanded = false,
  isLast = false,
}: StageSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const colors = getStageColor(stageNumber);

  const completedCount = lessons.filter(
    (l) => getLessonStatus(l.slug, l.code) === "completed"
  ).length;
  const totalCount = lessons.length;
  const allCompleted = completedCount === totalCount && totalCount > 0;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="relative">
      {/* Stage connector line to next stage */}
      {!isLast && (
        <div className="absolute left-6 top-full w-px h-6 bg-ds-stroke-soft z-0" />
      )}

      {/* Stage Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full text-left p-5 sm:p-6 rounded-2xl bg-ds-bg-white border transition-all duration-300 group ${
          expanded
            ? `${colors.accent} shadow-md`
            : "border-ds-stroke-soft hover:border-ds-feature-base/40 shadow-sm hover:shadow-md"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Stage number */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black ${colors.number}`}>
              {allCompleted ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span>{String(stageNumber).padStart(2, "0")}</span>
              )}
            </div>

            {/* Stage info */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base sm:text-lg font-bold text-ds-text-strong group-hover:text-ds-feature-base transition-colors">
                  {name}
                </h3>
              </div>
              <p className="text-xs text-ds-text-sub font-medium">{subtitle}</p>
              {expanded && (
                <p className="text-xs text-ds-text-soft mt-2 leading-relaxed max-w-lg">
                  {description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Progress */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-20 h-1.5 bg-ds-bg-soft rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    allCompleted ? "bg-ds-success-base" : "bg-ds-feature-base"
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] font-bold text-ds-text-soft whitespace-nowrap">
                {completedCount}/{totalCount}
              </span>
            </div>

            {/* Expand/collapse chevron */}
            <svg
              className={`w-5 h-5 text-ds-text-soft transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Lessons List (expandable) */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          expanded ? "max-h-[5000px] opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-4 sm:pl-8 space-y-0">
          {lessons.map((lesson, idx) => (
            <RoadmapNode
              key={lesson.code}
              code={lesson.code}
              name={lesson.name}
              path={lesson.path}
              desc={lesson.desc}
              estimatedMinutes={lesson.estimatedMinutes}
              status={getLessonStatus(lesson.slug, lesson.code)}
              isLast={idx === lessons.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
