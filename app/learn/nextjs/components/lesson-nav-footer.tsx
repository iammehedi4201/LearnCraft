"use client";

import { useEffect, useState } from "react";
import {
  getNextNextjsLesson,
  NEXTJS_CAPSTONE,
} from "../data/nextjs-curriculum";
import { isLessonComplete } from "../data/progress-store";
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
  totalLessons = 1,
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

  const nextLesson = getNextNextjsLesson(currentSlug);

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
      "learncraft-nextjs-progress-updated",
      handleProgressUpdated
    );
    window.addEventListener(
      "nextjs-progress-updated",
      handleProgressUpdated
    );
    window.addEventListener(
      "learncraft-progress-updated",
      handleProgressUpdated
    );
    return () => {
      isMounted = false;
      window.removeEventListener(
        "learncraft-nextjs-progress-updated",
        handleProgressUpdated
      );
      window.removeEventListener(
        "nextjs-progress-updated",
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
  };

  return (
    <UnifiedLessonNavBar
      currentIndex={currentIndex}
      totalLessons={totalLessons}
      onPrevLesson={onPrevLesson}
      onNextLesson={onNextLesson}
      isLessonCompleted={completed}
      onCompleteModule={handleCompleteAction}
      nextModuleHref={nextLesson ? nextLesson.path : NEXTJS_CAPSTONE.path}
      nextModuleCode={nextLesson ? nextLesson.code : "Capstone"}
      nextModuleName={nextLesson ? nextLesson.name : NEXTJS_CAPSTONE.title}
      canCompleteModule={canComplete}
      onDirectToQuiz={onDirectToQuiz}
    />
  );
}

export { LessonNavFooter as NextjsLessonNavFooter };
