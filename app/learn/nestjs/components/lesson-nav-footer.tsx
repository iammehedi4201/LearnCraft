"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, LayoutGrid, Clock } from "./icons";
import {
  getNextLesson,
  getPrevLesson,
  getStageByLessonSlug,
} from "../data/nestjs-curriculum";
import {
  isLessonComplete,
  markLessonComplete,
  toggleLessonComplete,
  getCompletionByStage,
} from "../data/progress-store";
import { ContentTagBadge } from "./content-tag-badge";
import { MilestoneCelebration } from "./milestone-celebration";

interface LessonNavFooterProps {
  currentSlug: string;
  onLessonComplete?: () => void;
}

export function LessonNavFooter({
  currentSlug,
  onLessonComplete,
}: LessonNavFooterProps) {
  const [completed, setCompleted] = useState<boolean>(false);
  const [showMilestone, setShowMilestone] = useState<boolean>(false);

  const prevLesson = getPrevLesson(currentSlug);
  const nextLesson = getNextLesson(currentSlug);
  const currentStage = getStageByLessonSlug(currentSlug);

  useEffect(() => {
    setCompleted(isLessonComplete(currentSlug));

    const handleProgressUpdated = () => {
      setCompleted(isLessonComplete(currentSlug));
    };

    window.addEventListener("learncraft-progress-updated", handleProgressUpdated);
    return () => {
      window.removeEventListener("learncraft-progress-updated", handleProgressUpdated);
    };
  }, [currentSlug]);

  const handleToggleComplete = () => {
    const isNowDone = toggleLessonComplete(currentSlug);
    setCompleted(isNowDone);

    if (isNowDone && currentStage) {
      const stageStats = getCompletionByStage(currentStage.id);
      if (stageStats.isCompleted) {
        setShowMilestone(true);
      }
    }

    if (onLessonComplete) {
      onLessonComplete();
    }
  };

  const handleNextClick = () => {
    if (!completed) {
      markLessonComplete(currentSlug);
    }
  };

  return (
    <div className="mt-14 pt-8 border-t border-ds-stroke-soft space-y-6">
      {/* Milestone alert if the current stage just reached completion */}
      {showMilestone && currentStage && (
        <MilestoneCelebration
          stage={currentStage}
          nextLesson={nextLesson}
          onDismiss={() => setShowMilestone(false)}
        />
      )}

      {/* Completion toggle banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleComplete}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              completed
                ? "bg-ds-success-lighter text-ds-success-dark"
                : "bg-ds-bg-weak text-ds-text-sub border border-ds-stroke-soft hover:bg-ds-bg-soft hover:text-ds-text-strong"
            }`}
          >
            {completed ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-ds-success-base" />
                <span>Lesson Completed</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-ds-icon-sub" />
                <span>Mark Lesson Complete</span>
              </>
            )}
          </button>
          <span className="text-xs text-ds-text-sub">
            {completed
              ? "Great job! Your path progress has been recorded."
              : "Mark complete when you finish the exercises."}
          </span>
        </div>

        <Link
          href="/learn/nestjs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ds-text-sub hover:text-ds-feature-dark transition-colors"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Full Roadmap</span>
        </Link>
      </div>

      {/* Prev / Next navigation cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Previous Lesson */}
        {prevLesson ? (
          <Link
            href={prevLesson.path}
            className="group flex flex-col justify-between p-5 rounded-2xl border border-ds-stroke-soft bg-ds-bg-white hover:border-ds-stroke-sub hover:shadow-md transition-all text-left"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-ds-text-soft group-hover:text-ds-text-strong transition-colors mb-2">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Previous Lesson</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-ds-text-soft bg-ds-bg-weak px-1.5 py-0.5 rounded">
                  {prevLesson.code}
                </span>
                <span className="text-sm font-bold text-ds-text-strong group-hover:text-ds-feature-dark transition-colors">
                  {prevLesson.name}
                </span>
              </div>
              <p className="text-xs text-ds-text-sub line-clamp-1 mt-1">
                {prevLesson.desc}
              </p>
            </div>
          </Link>
        ) : (
          <div className="p-5 rounded-2xl border border-ds-stroke-soft bg-ds-bg-weak text-ds-text-disabled text-xs flex items-center justify-center font-medium">
            You are at the start of the curriculum.
          </div>
        )}

        {/* Next Lesson */}
        {nextLesson ? (
          <Link
            href={nextLesson.path}
            onClick={handleNextClick}
            className="group flex flex-col justify-between p-5 rounded-2xl border border-ds-feature-base bg-ds-feature-lighter text-ds-text-strong hover:bg-ds-feature-light/30 transition-all text-right shadow-sm"
          >
            <div className="flex items-center justify-end gap-2 text-xs text-ds-feature-dark font-bold mb-2">
              <span>Next Lesson</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
            <div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-sm font-black text-ds-text-strong group-hover:text-ds-feature-dark transition-colors">
                  {nextLesson.name}
                </span>
                <span className="font-mono text-xs font-bold text-ds-feature-dark bg-ds-feature-lighter px-2 py-0.5 rounded-md">
                  {nextLesson.code}
                </span>
              </div>
              <div className="flex items-center justify-end gap-3 mt-2">
                <span className="inline-flex items-center gap-1 text-[11px] text-ds-text-soft font-medium">
                  <Clock className="w-3 h-3" />
                  {nextLesson.estimatedMinutes} min
                </span>
                <ContentTagBadge tag={nextLesson.tag} size="sm" />
              </div>
            </div>
          </Link>
        ) : (
          <div className="p-5 rounded-2xl bg-ds-success-lighter text-ds-success-dark text-xs flex items-center justify-center font-bold">
            🎉 You have reached the end of the curriculum!
          </div>
        )}
      </div>
    </div>
  );
}
