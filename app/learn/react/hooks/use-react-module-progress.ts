"use client";

import { useLessonProgress } from "@/components/curriculum/use-lesson-progress";
import { LessonSectionItem } from "@/components/curriculum/lesson-content-types";

export type ReactSectionItem = LessonSectionItem;

export interface UseReactModuleProgressProps {
  lessonSlug: string;
  sections: LessonSectionItem[];
  onLessonCompleted?: (lessonSlug: string) => void;
  isLessonInitiallyComplete?: boolean;
}

export function useReactModuleProgress({
  lessonSlug,
  sections,
  onLessonCompleted,
  isLessonInitiallyComplete,
}: UseReactModuleProgressProps) {
  return useLessonProgress({
    trackKey: "react",
    lessonSlug,
    sections,
    onLessonCompleted,
    isLessonInitiallyComplete,
  });
}
