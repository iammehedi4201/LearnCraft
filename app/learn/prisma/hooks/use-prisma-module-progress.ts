/**
 * Prisma Module Progress Hook — LearnCraft
 * Tracks active section progression within a lesson, auto-marks completion,
 * and maintains clean mounted safety checks.
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  isLessonComplete,
  markLessonComplete,
  fetchProgressFromDB,
} from "../data/progress-store";

export interface PrismaSectionItem {
  id: string;
  label: string;
  description?: string;
}

interface UsePrismaModuleProgressProps {
  lessonSlug: string;
  sections: PrismaSectionItem[];
}

export function usePrismaModuleProgress({
  lessonSlug,
  sections,
}: UsePrismaModuleProgressProps) {
  const { data: session } = useSession();
  const isAuthenticated = Boolean(session?.user);

  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || "part1"
  );
  const [completedSections, setCompletedSections] = useState<Set<string>>(
    new Set()
  );
  const [isLessonCompleted, setIsLessonCompleted] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    if (isAuthenticated) {
      fetchProgressFromDB().then(() => {
        if (isMounted) {
          setIsLessonCompleted(isLessonComplete(lessonSlug));
        }
      });
    } else {
      setIsLessonCompleted(isLessonComplete(lessonSlug));
    }

    return () => {
      isMounted = false;
    };
  }, [lessonSlug, isAuthenticated]);

  const currentIndex = Math.max(
    0,
    sections.findIndex((s) => s.id === activeSection)
  );

  const handleSectionChange = useCallback(
    (sectionId: string) => {
      setActiveSection(sectionId);
      setCompletedSections((prev) => {
        const next = new Set(prev);
        const targetIndex = sections.findIndex((s) => s.id === sectionId);
        for (let i = 0; i < targetIndex; i++) {
          next.add(sections[i].id);
        }
        return next;
      });
    },
    [sections]
  );

  const handleNext = useCallback(async () => {
    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1];
      setCompletedSections((prev) => new Set([...prev, activeSection]));
      setActiveSection(nextSection.id);
    } else {
      setCompletedSections((prev) => new Set([...prev, activeSection]));
      setIsLessonCompleted(true);
      await markLessonComplete(lessonSlug);
    }
  }, [currentIndex, sections, activeSection, lessonSlug]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  }, [currentIndex, sections]);

  const getStepState = useCallback(
    (index: number): "done" | "active" | "todo" => {
      if (index === currentIndex) return "active";
      if (index < currentIndex || completedSections.has(sections[index]?.id)) {
        return "done";
      }
      return "todo";
    },
    [currentIndex, completedSections, sections]
  );

  const progressPercent = Math.round(
    ((currentIndex + 1) / Math.max(1, sections.length)) * 100
  );

  return {
    activeSection,
    currentIndex,
    progressPercent,
    completedSectionsCount: completedSections.size,
    isLessonCompleted,
    handleSectionChange,
    handlePrev,
    handleNext,
    getStepState,
  };
}
