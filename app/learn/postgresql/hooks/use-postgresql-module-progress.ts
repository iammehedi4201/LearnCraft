/**
 * PostgreSQL Module Progress Hook — LearnCraft
 * Tracks active section progression within a lesson, auto-marks completion,
 * hydrates offline/guest state from localStorage, and maintains clean mounted safety checks.
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

  const storageKey = `learncraft_postgresql_sections_${lessonSlug}`;

  const [activeSection, setActiveSection] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.activeSection && sections.some((s) => s.id === parsed.activeSection)) {
            return parsed.activeSection;
          }
        }
      } catch {}
    }
    return sections[0]?.id || "part1";
  });

  const [completedSections, setCompletedSections] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      try {
        if (isLessonComplete(lessonSlug)) {
          return new Set(sections.map((s) => s.id));
        }
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed.completedSections)) {
            return new Set(parsed.completedSections);
          }
        }
      } catch {}
    }
    return new Set();
  });

  const [isLessonCompleted, setIsLessonCompleted] = useState<boolean>(() => {
    return isLessonComplete(lessonSlug);
  });

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

  const completedSectionsCount = completedSections.size;
  const progressPercent =
    sections.length > 0
      ? Math.round((completedSectionsCount / sections.length) * 100)
      : 0;

  const handleSectionChange = useCallback(
    (sectionId: string) => {
      setActiveSection(sectionId);
      setCompletedSections((prev) => {
        const next = new Set([...prev, sectionId]);
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(
              storageKey,
              JSON.stringify({
                activeSection: sectionId,
                completedSections: Array.from(next),
              })
            );
          } catch {}
        }
        return next;
      });
    },
    [storageKey]
  );

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      handleSectionChange(sections[currentIndex - 1].id);
    }
  }, [currentIndex, sections, handleSectionChange]);

  const handleNext = useCallback(async () => {
    if (currentIndex < sections.length - 1) {
      handleSectionChange(sections[currentIndex + 1].id);
    } else {
      // Completed the entire module
      await markLessonComplete(lessonSlug);
      setIsLessonCompleted(true);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            storageKey,
            JSON.stringify({
              activeSection: sections[sections.length - 1]?.id,
              completedSections: sections.map((s) => s.id),
            })
          );
        } catch {}
      }
    }
  }, [currentIndex, sections, lessonSlug, handleSectionChange, storageKey]);

  const getStepState = useCallback(
    (index: number): "done" | "active" | "todo" => {
      if (index === currentIndex) return "active";
      if (completedSections.has(sections[index]?.id) || index < currentIndex) {
        return "done";
      }
      return "todo";
    },
    [currentIndex, completedSections, sections]
  );

  return {
    isAuthenticated,
    activeSection,
    currentIndex,
    progressPercent,
    completedSectionsCount,
    isLessonCompleted,
    handleSectionChange,
    handlePrev,
    handleNext,
    getStepState,
  };
}
