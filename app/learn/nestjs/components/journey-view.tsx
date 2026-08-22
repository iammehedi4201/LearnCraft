"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  Clock,
  Sparkles,
  ChevronRight,
} from "./icons";
import {
  StageMeta,
  NESTJS_STAGES,
} from "../data/nestjs-curriculum";
import {
  isLessonComplete,
  getCompletionByStage,
  getNextRecommendedLesson,
} from "../data/progress-store";
import { ContentTagBadge } from "./content-tag-badge";

interface JourneyViewProps {
  currentStage: StageMeta;
  onSelectStage?: (stageId: string) => void;
  onViewFullRoadmap?: () => void;
}

export function JourneyView({
  currentStage,
  onSelectStage,
  onViewFullRoadmap,
}: JourneyViewProps) {
  const nextRecommended = getNextRecommendedLesson();
  const stageStats = getCompletionByStage(currentStage.id);

  // Find next stage for peek preview
  const currentStageIndex = NESTJS_STAGES.findIndex(
    (s) => s.id === currentStage.id
  );
  const nextStage =
    currentStageIndex >= 0 && currentStageIndex < NESTJS_STAGES.length - 1
      ? NESTJS_STAGES[currentStageIndex + 1]
      : null;

  return (
    <div className="space-y-6">
      {/* Current Stage Main Container Card */}
      <div className="rounded-3xl bg-ds-bg-white p-6 sm:p-8 md:p-10 shadow-sm border border-ds-stroke-soft">
        {/* Stage Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-ds-stroke-soft">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-ds-feature-dark uppercase tracking-wider bg-ds-feature-lighter border border-ds-feature-base px-2.5 py-0.5 rounded-full">
                Stage {currentStage.stageNumber} of {NESTJS_STAGES.length}
              </span>
              <span className="text-xs text-ds-text-sub font-medium">
                {currentStage.subtitle}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-ds-text-strong tracking-tight">
              {currentStage.name}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-bold text-ds-text-strong">
                {stageStats.completed} of {stageStats.total} completed
              </div>
              <div className="w-36 h-2 bg-ds-bg-soft rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-ds-feature-base transition-all duration-300 rounded-full"
                  style={{ width: `${stageStats.percent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Goal Statement */}
        <div className="my-6 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex items-start gap-3.5">
          <Sparkles className="w-4 h-4 text-ds-feature-base shrink-0 mt-0.5" />
          <div className="text-xs md:text-sm">
            <span className="text-ds-text-sub font-semibold">Stage Milestone: </span>
            <span className="text-ds-text-strong font-bold">
              {currentStage.milestone}
            </span>
          </div>
        </div>

        {/* Card-Based Grid following Design System interactive card pattern */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {currentStage.lessons.map((lesson) => {
            const isDone = isLessonComplete(lesson.slug) || isLessonComplete(lesson.code);
            const isTarget =
              nextRecommended.slug === lesson.slug ||
              nextRecommended.code === lesson.code;

            return (
              <Link
                key={lesson.slug}
                href={lesson.path}
                className={`group flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-ds-bg-weak border transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${
                  isTarget
                    ? "border-ds-feature-base"
                    : "border-ds-stroke-soft hover:border-ds-feature-base"
                }`}
              >
                <div>
                  {/* Topic Card Top Row: Code, Status & Tag */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-ds-text-sub bg-ds-bg-soft px-2.5 py-1 rounded-md">
                        {lesson.code}
                      </span>
                      {isDone ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-ds-success-dark bg-ds-success-lighter px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5 text-ds-success-base" />
                          Done
                        </span>
                      ) : isTarget ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-ds-feature-dark bg-ds-feature-lighter px-2.5 py-0.5 rounded-full border border-ds-feature-base">
                          <span className="w-2 h-2 rounded-full bg-ds-feature-base animate-pulse" />
                          You are here
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ds-text-soft">
                          <Circle className="w-3 h-3 text-ds-icon-sub" />
                          Upcoming
                        </span>
                      )}
                    </div>

                    <ContentTagBadge tag={lesson.tag} size="sm" />
                  </div>

                  {/* Topic Title */}
                  <h3 className="text-lg font-bold text-ds-text-strong group-hover:text-ds-feature-base transition-colors">
                    {lesson.name}
                  </h3>

                  {/* Outcome Subtitle */}
                  {lesson.outcomeName && (
                    <p className="text-xs font-semibold text-ds-feature-base mt-1">
                      {lesson.outcomeName}
                    </p>
                  )}

                  {/* Topic Description */}
                  <p className="text-xs sm:text-sm text-ds-text-sub line-clamp-2 mt-2.5 leading-relaxed">
                    {lesson.desc}
                  </p>
                </div>

                {/* Topic Card Bottom Footer */}
                <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-ds-stroke-soft text-xs">
                  <div className="flex items-center gap-1.5 text-ds-text-soft">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{lesson.estimatedMinutes} mins</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-ds-text-sub group-hover:text-ds-feature-base group-hover:translate-x-1 transition-all">
                    <span>{isDone ? "Review Lesson" : isTarget ? "Continue Step" : "Start Lesson"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Next Stage Preview Card */}
      {nextStage && (
        <div className="rounded-2xl bg-ds-bg-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm border border-ds-stroke-soft hover:border-ds-feature-base transition-all">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-ds-bg-weak flex items-center justify-center text-ds-text-strong text-xs font-mono font-bold border border-ds-stroke-soft">
              S{nextStage.stageNumber}
            </div>
            <div>
              <div className="text-xs text-ds-text-soft font-medium">Next Stage Up:</div>
              <div className="text-sm sm:text-base font-bold text-ds-text-strong">
                {nextStage.name} — <span className="text-xs sm:text-sm font-normal text-ds-text-sub">{nextStage.subtitle}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectStage && onSelectStage(nextStage.id)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-ds-feature-base hover:text-ds-feature-dark transition-colors"
          >
            <span>Preview Stage {nextStage.stageNumber}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Stage Selector Navigation Pills */}
      <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          {NESTJS_STAGES.map((stg) => {
            const isCurrent = stg.id === currentStage.id;
            const stgStat = getCompletionByStage(stg.id);
            return (
              <button
                key={stg.id}
                onClick={() => onSelectStage && onSelectStage(stg.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isCurrent
                    ? "bg-ds-bg-strong text-ds-text-white shadow-sm"
                    : "bg-ds-bg-white text-ds-text-sub hover:text-ds-text-strong hover:bg-ds-bg-weak border border-ds-stroke-soft hover:border-ds-feature-base"
                }`}
              >
                <span>Stage {stg.stageNumber}</span>
                {stgStat.isCompleted && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-ds-success-base" />
                )}
              </button>
            );
          })}
        </div>

        {onViewFullRoadmap && (
          <button
            onClick={onViewFullRoadmap}
            className="text-xs sm:text-sm text-ds-feature-base hover:text-ds-feature-dark font-bold transition-colors"
          >
            View all 32 lessons →
          </button>
        )}
      </div>
    </div>
  );
}
