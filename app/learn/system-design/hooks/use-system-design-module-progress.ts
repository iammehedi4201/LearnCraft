"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  isLessonComplete,
  markLessonComplete,
} from "../data/progress-store";

export interface SystemDesignSectionItem {
  id: string;
  title: string;
  badge?: string;
}

interface UseSystemDesignModuleProgressProps {
  lessonSlug: string;
  sections: SystemDesignSectionItem[];
}

export function useSystemDesignModuleProgress({
  lessonSlug,
  sections,
}: UseSystemDesignModuleProgressProps) {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || "part1"
  );
  const [visitedSections, setVisitedSections] = useState<Set<string>>(
    () => new Set([sections[0]?.id || "part1"])
  );
  const [isCompleted, setIsCompleted] = useState<boolean>(() =>
    isLessonComplete(lessonSlug)
  );

  useEffect(() => {
    const initial = sections[0]?.id || "part1";
    setActiveSection(initial);
    setVisitedSections(new Set([initial]));
    setIsCompleted(isLessonComplete(lessonSlug));
  }, [lessonSlug, sections]);

  useEffect(() => {
    const handleProgressUpdated = () => {
      setIsCompleted(isLessonComplete(lessonSlug));
    };

    window.addEventListener(
      "learncraft-system-design-progress-updated",
      handleProgressUpdated
    );
    window.addEventListener(
      "learncraft-progress-updated",
      handleProgressUpdated
    );

    return () => {
      window.removeEventListener(
        "learncraft-system-design-progress-updated",
        handleProgressUpdated
      );
      window.removeEventListener(
        "learncraft-progress-updated",
        handleProgressUpdated
      );
    };
  }, [lessonSlug]);

  const currentIndex = useMemo(() => {
    const idx = sections.findIndex((s) => s.id === activeSection);
    return idx >= 0 ? idx : 0;
  }, [sections, activeSection]);

  const completedSectionsCount = useMemo(() => {
    return visitedSections.size;
  }, [visitedSections]);

  const progressPercent = useMemo(() => {
    if (sections.length === 0) return 0;
    return Math.round((completedSectionsCount / sections.length) * 100);
  }, [completedSectionsCount, sections.length]);

  const handleSectionChange = useCallback(
    (sectionId: string) => {
      setActiveSection(sectionId);
      setVisitedSections((prev) => {
        const next = new Set(prev);
        next.add(sectionId);
        if (next.size === sections.length) {
          markLessonComplete(lessonSlug);
          setIsCompleted(true);
        }
        return next;
      });
    },
    [lessonSlug, sections.length]
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
      const section = sections[index];
      if (!section) return "todo";
      if (section.id === activeSection) return "active";
      if (visitedSections.has(section.id)) return "done";
      return "todo";
    },
    [activeSection, visitedSections, sections]
  );

  return {
    activeSection,
    currentIndex,
    progressPercent,
    completedSectionsCount,
    isLessonCompleted: isCompleted,
    handleSectionChange,
    handlePrev,
    handleNext,
    getStepState,
  };
}
