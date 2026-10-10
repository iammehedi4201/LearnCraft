"use client";

import { useLessonProgress } from "@/components/curriculum/use-lesson-progress";
import { LessonSectionItem } from "@/components/curriculum/lesson-content-types";

export type OOPSectionItem = LessonSectionItem;

export interface UseOOPModuleProgressProps {
  lessonSlug: string;
  sections: LessonSectionItem[];
  onLessonCompleted?: (lessonSlug: string) => void;
  isLessonInitiallyComplete?: boolean;
}

export function useOOPModuleProgress({
  lessonSlug,
  sections,
  onLessonCompleted,
  isLessonInitiallyComplete,
}: UseOOPModuleProgressProps) {
  return useLessonProgress({
    trackKey: "oop",
    lessonSlug,
    sections,
    onLessonCompleted,
    isLessonInitiallyComplete,
  });
}
