"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from "./icons";
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
import { MilestoneCelebration } from "./milestone-celebration";

interface LessonNavFooterProps {
  currentSlug: string;
  onLessonComplete?: () => void;
}

export function LessonNavFooter({
  currentSlug,
  onLessonComplete,
}: LessonNavFooterProps) {
  const { data: session } = useSession();
  const isAuthenticated = Boolean(session?.user);

  const [completed, setCompleted] = useState<boolean>(false);
  const [showMilestone, setShowMilestone] = useState<boolean>(false);

  const prevLesson = getPrevLesson(currentSlug);
  const nextLesson = getNextLesson(currentSlug);
  const currentStage = getStageByLessonSlug(currentSlug);

  useEffect(() => {
    let isMounted = true;
    if (!isAuthenticated) {
      setCompleted(false);
      return;
    }

    if (isMounted) {
      setCompleted(isLessonComplete(currentSlug));
    }

    const handleProgressUpdated = () => {
      if (isMounted) {
        setCompleted(isLessonComplete(currentSlug));
      }
    };

    window.addEventListener("learncraft-progress-updated", handleProgressUpdated);
    return () => {
      isMounted = false;
      window.removeEventListener("learncraft-progress-updated", handleProgressUpdated);
    };
  }, [currentSlug, isAuthenticated]);

  const handleToggleComplete = () => {
    if (!isAuthenticated) return;

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
    // Only mark complete if authenticated
    if (isAuthenticated && !completed) {
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

      {/* Primary Navigation Controls (3-Column Layout from Image 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
        {/* Previous Lesson */}
        <div className="flex justify-start">
          {prevLesson ? (
            <Link
              href={prevLesson.path}
              className="group flex items-center gap-3 p-3 rounded-xl bg-ds-bg-white border border-ds-stroke-soft hover:border-ds-feature-base transition-all text-left w-full sm:w-auto shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-ds-bg-weak group-hover:bg-ds-feature-lighter flex items-center justify-center text-ds-text-soft group-hover:text-ds-feature-dark transition-colors">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono text-ds-text-soft block uppercase">
                  Previous ({prevLesson.code})
                </span>
                <span className="text-xs font-bold text-ds-text-strong group-hover:text-ds-feature-dark truncate block max-w-[180px]">
                  {prevLesson.name}
                </span>
              </div>
            </Link>
          ) : (
            <Link
              href="/learn/nestjs"
              className="inline-flex items-center gap-2 text-xs text-ds-text-soft hover:text-ds-text-strong p-3"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>NestJS Hub</span>
            </Link>
          )}
        </div>

        {/* Completion Toggle in Center */}
        <div className="flex justify-center">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleToggleComplete}
              className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer ${
                completed
                  ? "bg-ds-success-lighter text-ds-success-dark border border-ds-success-base/30"
                  : "bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white shadow-ds-feature-base/20"
              }`}
            >
              {completed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-ds-success-base" />
                  <span>Lesson Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-white/60" />
                  <span>Mark as Complete</span>
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(
                    new CustomEvent("learncraft:open-auth-modal")
                  );
                }
              }}
              className="text-xs text-ds-text-soft hover:text-ds-feature-dark font-mono transition-colors cursor-pointer"
            >
              Sign in to save progress
            </button>
          )}
        </div>

        {/* Next Lesson */}
        <div className="flex justify-end">
          {nextLesson ? (
            <Link
              href={nextLesson.path}
              onClick={handleNextClick}
              className="group flex items-center justify-end gap-3 p-3 rounded-xl bg-ds-bg-white border border-ds-stroke-soft hover:border-ds-feature-base transition-all text-right w-full sm:w-auto shadow-sm"
            >
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono text-ds-feature-dark block uppercase">
                  Next ({nextLesson.code})
                </span>
                <span className="text-xs font-bold text-ds-text-strong group-hover:text-ds-feature-dark truncate block max-w-[180px]">
                  {nextLesson.name}
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-ds-feature-lighter group-hover:bg-ds-feature-base flex items-center justify-center text-ds-feature-dark group-hover:text-ds-static-white transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ) : (
            <span className="text-xs text-ds-success-dark font-bold p-3">
              🎉 All Lessons Completed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
