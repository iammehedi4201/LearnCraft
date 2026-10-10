"use client";

import { useLessonProgress } from "@/components/curriculum/use-lesson-progress";
import { LessonSectionItem } from "@/components/curriculum/lesson-content-types";

export type ExpressSectionItem = LessonSectionItem;

export interface UseExpressModuleProgressProps {
  lessonSlug: string;
  sections: LessonSectionItem[];
  onLessonCompleted?: (lessonSlug: string) => void;
  isLessonInitiallyComplete?: boolean;
}

export function useExpressModuleProgress({
  lessonSlug,
  sections,
  onLessonCompleted,
  isLessonInitiallyComplete,
}: UseExpressModuleProgressProps) {
  return useLessonProgress({
    trackKey: "express",
    lessonSlug,
    sections,
    onLessonCompleted,
    isLessonInitiallyComplete,
  });
}
