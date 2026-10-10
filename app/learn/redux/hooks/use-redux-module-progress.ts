"use client";

import { useLessonProgress } from "@/components/curriculum/use-lesson-progress";
import { LessonSectionItem } from "@/components/curriculum/lesson-content-types";

export type ReduxSectionItem = LessonSectionItem;

export interface UseReduxModuleProgressProps {
  lessonSlug: string;
  sections: LessonSectionItem[];
  onLessonCompleted?: (lessonSlug: string) => void;
  isLessonInitiallyComplete?: boolean;
}

export function useReduxModuleProgress({
  lessonSlug,
  sections,
  onLessonCompleted,
  isLessonInitiallyComplete,
}: UseReduxModuleProgressProps) {
  return useLessonProgress({
    trackKey: "redux",
    lessonSlug,
    sections,
    onLessonCompleted,
    isLessonInitiallyComplete,
  });
}
