"use client";

import { useLessonProgress } from "@/components/curriculum/use-lesson-progress";
import { LessonSectionItem } from "@/components/curriculum/lesson-content-types";

export type NodejsSectionItem = LessonSectionItem;
export type NodeSectionItem = LessonSectionItem;

export interface UseNodejsModuleProgressProps {
  lessonSlug: string;
  sections: LessonSectionItem[];
  onLessonCompleted?: (lessonSlug: string) => void;
  isLessonInitiallyComplete?: boolean;
}

export function useNodejsModuleProgress({
  lessonSlug,
  sections,
  onLessonCompleted,
  isLessonInitiallyComplete,
}: UseNodejsModuleProgressProps) {
  return useLessonProgress({
    trackKey: "nodejs",
    lessonSlug,
    sections,
    onLessonCompleted,
    isLessonInitiallyComplete,
  });
}
