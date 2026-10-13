"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getNextLesson,
  getPrevLesson,
  getStageByLessonSlug,
  NESTJS_CAPSTONE,
} from "../data/nestjs-curriculum";
import {
  isLessonComplete,
  getCompletionByStage,
} from "../data/progress-store";
import { MilestoneCelebration } from "./milestone-celebration";
import { UnifiedLessonNavBar } from "@/components/curriculum/UnifiedLessonNavBar";

interface LessonNavFooterProps {
  currentSlug: string;
  currentIndex?: number;
  totalLessons?: number;
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
  isLessonCompleted?: boolean;
  canComplete?: boolean;
  onLessonComplete?: () => void;
  onDirectToQuiz?: () => void;
}

export function LessonNavFooter({
  currentSlug,
  currentIndex = 0,
  totalLessons,
  onPrevLesson = () => {},
  onNextLesson = () => {},
  isLessonCompleted,
  canComplete = true,
  onLessonComplete,
  onDirectToQuiz,
}: LessonNavFooterProps) {
  const [completed, setCompleted] = useState<boolean>(() => {
    if (isLessonCompleted !== undefined) return isLessonCompleted;
    return isLessonComplete(currentSlug);
  });
  const [showMilestone, setShowMilestone] = useState<boolean>(false);

  const prevLesson = getPrevLesson(currentSlug);
  const nextLesson = getNextLesson(currentSlug);
  const currentStage = getStageByLessonSlug(currentSlug);

  useEffect(() => {
    if (isLessonCompleted !== undefined) {
      setCompleted(isLessonCompleted);
    } else {
      setCompleted(isLessonComplete(currentSlug));
    }
  }, [currentSlug, isLessonCompleted]);

  useEffect(() => {
    let isMounted = true;

    const handleProgressUpdated = () => {
      if (isMounted) {
        if (isLessonCompleted !== undefined) {
          setCompleted(isLessonCompleted);
        } else {
          setCompleted(isLessonComplete(currentSlug));
        }
      }
    };

    window.addEventListener(
      "learncraft-nestjs-progress-updated",
      handleProgressUpdated
    );
    window.addEventListener(
      "learncraft-progress-updated",
      handleProgressUpdated
    );
    return () => {
      isMounted = false;
      window.removeEventListener(
        "learncraft-nestjs-progress-updated",
        handleProgressUpdated
      );
      window.removeEventListener(
        "learncraft-progress-updated",
        handleProgressUpdated
      );
    };
  }, [currentSlug, isLessonCompleted]);

  const handleCompleteAction = () => {
    if (onLessonComplete) {
      onLessonComplete();
    }
    if (currentStage) {
      const stageStats = getCompletionByStage(currentStage.id);
      if (stageStats.isCompleted) {
        setShowMilestone(true);
      }
    }
  };

  return (
    <div className="space-y-4 mt-14">
      {/* Milestone alert if the current stage just reached completion */}
      {showMilestone && currentStage && (
        <MilestoneCelebration
          stage={currentStage}
          nextLesson={nextLesson}
          onDismiss={() => setShowMilestone(false)}
        />
      )}

      {totalLessons && totalLessons > 0 ? (
        <UnifiedLessonNavBar
          currentIndex={currentIndex}
          totalLessons={totalLessons}
          onPrevLesson={onPrevLesson}
          onNextLesson={onNextLesson}
          isLessonCompleted={completed}
          onCompleteModule={handleCompleteAction}
          nextModuleHref={nextLesson ? nextLesson.path : NESTJS_CAPSTONE.path}
          nextModuleCode={nextLesson ? nextLesson.code : "Capstone"}
          nextModuleName={nextLesson ? nextLesson.name : NESTJS_CAPSTONE.title}
          canCompleteModule={canComplete}
          onDirectToQuiz={onDirectToQuiz}
        />
      ) : (
        /* Footer Navigation Bar */
        <div className="p-5 rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-xl flex items-center justify-between gap-4">
          {/* Left Side: Previous Lesson */}
          <div>
            {prevLesson ? (
              <Link
                href={prevLesson.path}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border border-white/[0.08] text-slate-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] transition-colors flex items-center gap-2"
              >
                <span>←</span>
                <span>Previous: {prevLesson.code}</span>
              </Link>
            ) : (
              <span className="text-xs font-mono text-slate-500 px-3 py-2">Start of Course</span>
            )}
          </div>

          {/* Right Side: Next Lesson */}
          <div>
            {nextLesson ? (
              <Link
                href={nextLesson.path}
                onClick={handleCompleteAction}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-purple-600/20 hover:bg-purple-600/35 text-purple-200 hover:text-white border border-purple-500/30 hover:border-purple-400 transition-all flex items-center gap-2 font-mono cursor-pointer"
              >
                <span>Next: {nextLesson.code}</span>
                <span>→</span>
              </Link>
            ) : (
              <Link
                href={NESTJS_CAPSTONE.path}
                onClick={handleCompleteAction}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 transition-colors flex items-center gap-1.5 font-mono cursor-pointer"
              >
                <span>Launch Capstone 🎓</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
