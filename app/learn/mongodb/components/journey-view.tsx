"use client";

import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Clock,
} from "./icons";
import {
  MONGODB_PROGRESSION_PHASES,
  getLessonsByPhaseId,
} from "../data/mongodb-curriculum";
import {
  isLessonComplete,
  getActiveLesson,
} from "../data/progress-store";

interface JourneyViewProps {
  phaseId: string;
  onSelectPhase?: (phaseId: string) => void;
}

export function JourneyView({
  phaseId,
  onSelectPhase: _onSelectPhase,
}: JourneyViewProps) {
  const phase =
    MONGODB_PROGRESSION_PHASES.find((p) => p.id === phaseId) ||
    MONGODB_PROGRESSION_PHASES[0];

  const lessons = getLessonsByPhaseId(phase.id);
  const activeLesson = getActiveLesson();

  const completedCount = lessons.filter(
    (l) => isLessonComplete(l.slug) || isLessonComplete(l.code),
  ).length;
  const isPhaseAllDone = completedCount === lessons.length && lessons.length > 0;

  return (
    <div className="space-y-5">
      {/* Unified Phase Context Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-ds-feature-dark bg-ds-feature-lighter border border-ds-feature-base/30 px-2.5 py-0.5 rounded-lg">
              Phase {phase.phaseNumber.toString().padStart(2, "0")} of {MONGODB_PROGRESSION_PHASES.length.toString().padStart(2, "0")}
            </span>
            <span className="text-ds-text-soft hidden sm:inline">·</span>
            <span className="text-xs font-mono text-ds-text-sub font-medium">
              {phase.scope}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-ds-text-strong tracking-tight">
            {phase.label}
          </h3>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed max-w-3xl">
            {phase.desc}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <span
            className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-full border transition-colors ${
              isPhaseAllDone
                ? "bg-ds-success-lighter text-ds-success-dark border-ds-success-base/30"
                : "bg-ds-bg-weak text-ds-text-strong border-ds-stroke-soft"
            }`}
          >
            {isPhaseAllDone
              ? "✓ Phase Completed"
              : `${completedCount} of ${lessons.length} Completed`}
          </span>
        </div>
      </div>

      {/* Sequential Ordered Lesson Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {lessons.map((lesson, idx) => {
          const isDone = isLessonComplete(lesson.slug) || isLessonComplete(lesson.code);
          const isTarget = Boolean(
            activeLesson &&
              (activeLesson.slug === lesson.slug ||
                activeLesson.code === lesson.code),
          );
          const stepNumber = lesson.stepNumber || idx + 1;

          return (
            <div
              key={lesson.slug}
              className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-ds-bg-white border transition-all duration-300 ease-out shadow-sm hover:shadow-lg hover:-translate-y-1 overflow-hidden ${
                isTarget
                  ? "border-ds-feature-base ring-2 ring-ds-feature-base/20 bg-ds-feature-lighter/10"
                  : isDone
                  ? "border-ds-success-base/40 bg-ds-success-lighter/10 hover:border-ds-success-base/60"
                  : "border-ds-stroke-soft hover:border-ds-feature-base/50"
              }`}
            >
              {/* Card Header: Step number, Code badge, Status */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-ds-bg-weak border border-ds-stroke-soft text-[11px] font-mono font-bold text-ds-text-soft flex items-center justify-center">
                      {stepNumber.toString().padStart(2, "0")}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold text-ds-feature-dark bg-ds-feature-lighter border border-ds-feature-base/20">
                      {lesson.code}
                    </span>
                  </div>

                  {isDone ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-ds-success-dark bg-ds-success-lighter border border-ds-success-base/30 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-ds-success-base" />
                      Completed
                    </span>
                  ) : isTarget ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-ds-feature-dark bg-ds-feature-lighter border border-ds-feature-base/30 px-2 py-0.5 rounded-full animate-pulse">
                      Next Up
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-ds-text-soft">
                      {lesson.estimatedMinutes}m
                    </span>
                  )}
                </div>

                {/* Lesson Title & Description */}
                <h4 className="text-base font-bold text-ds-text-strong group-hover:text-ds-feature-dark transition-colors mb-2 line-clamp-2">
                  {lesson.name}
                </h4>
                <p className="text-xs text-ds-text-sub leading-relaxed line-clamp-3 mb-4">
                  {lesson.desc}
                </p>
              </div>

              {/* Card Footer: Metadata badges & Action Link */}
              <div className="pt-4 border-t border-ds-stroke-soft flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-ds-text-soft font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {lesson.estimatedMinutes}m
                  </span>
                  <span>·</span>
                  <span className="text-ds-success-dark font-bold">+{lesson.xpReward} XP</span>
                </div>

                <Link
                  href={lesson.path}
                  className="inline-flex items-center gap-1 text-xs font-bold text-ds-feature-dark group-hover:text-ds-feature-base group-hover:translate-x-0.5 transition-all"
                >
                  <span>{isDone ? "Review" : "Start"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
