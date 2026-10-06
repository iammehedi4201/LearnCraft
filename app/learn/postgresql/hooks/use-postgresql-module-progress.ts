/**
 * PostgreSQL Module Progress Hook — LearnCraft
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

export interface PostgresqlSectionItem {
  id: string;
  label: string;
  description?: string;
}

interface UsePostgresqlModuleProgressProps {
  lessonSlug: string;
  sections: PostgresqlSectionItem[];
}

export function usePostgresqlModuleProgress({
  lessonSlug,
  sections,
}: UsePostgresqlModuleProgressProps) {
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

  const progressPercent =
    sections.length > 0
      ? Math.round(((currentIndex + 1) / sections.length) * 100)
      : 0;

  const handleSectionChange = useCallback(
    (sectionId: string) => {
      setActiveSection(sectionId);
      setCompletedSections((prev) => {
        const next = new Set(prev);
        // Mark all prior sections as completed
        const targetIndex = sections.findIndex((s) => s.id === sectionId);
        sections.forEach((s, idx) => {
          if (idx <= targetIndex) next.add(s.id);
        });
        return next;
      });

      // If user reaches last section (summary), mark whole lesson as complete
      if (sectionId === sections[sections.length - 1]?.id) {
        markLessonComplete(lessonSlug).then(() => {
          setIsLessonCompleted(true);
        });
      }
    },
    [sections, lessonSlug]
  );

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      handleSectionChange(sections[currentIndex - 1].id);
    }
  }, [currentIndex, sections, handleSectionChange]);

  const handleNext = useCallback(() => {
    if (currentIndex < sections.length - 1) {
      handleSectionChange(sections[currentIndex + 1].id);
    }
  }, [currentIndex, sections, handleSectionChange]);

  const getStepState = useCallback(
    (index: number): "done" | "active" | "todo" => {
      if (index === currentIndex) return "active";
      if (completedSections.has(sections[index]?.id) || index < currentIndex)
        return "done";
      return "todo";
    },
    [currentIndex, completedSections, sections]
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
