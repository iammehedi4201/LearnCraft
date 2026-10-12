"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * UNIFIED LESSON PROGRESS HOOK
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Universal progress engine used across all curriculum learning tracks.
 * Handles section state, local-first caching, PostgreSQL progress sync,
 * step status evaluation, and gamification XP rewards.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { LessonSectionItem } from "./lesson-content-types";
import { recordActivity } from "@/lib/gamification";

export interface UseLessonProgressProps {
  trackKey: string;
  lessonSlug: string;
  sections: LessonSectionItem[];
  onLessonCompleted?: (lessonSlug: string) => void;
  isLessonInitiallyComplete?: boolean;
}

export function useLessonProgress({
  trackKey,
  lessonSlug,
  sections,
  onLessonCompleted,
  isLessonInitiallyComplete = false,
}: UseLessonProgressProps) {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && Boolean(session?.user);

  const searchParams = useSearchParams();
  const sectionParam = searchParams?.get("section");

  const resolveId = useCallback(
    (id?: string | null): string | null => {
      if (!id) return null;
      if (sections.some((s) => s.id === id)) return id;
      return null;
    },
    [sections]
  );

  const storageKey = `learncraft_${trackKey}_sections_${lessonSlug}`;

  const [activeSection, setActiveSection] = useState<string>(() => {
    const resolvedFromUrl = resolveId(sectionParam);
    if (resolvedFromUrl) return resolvedFromUrl;
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          const resolved = resolveId(parsed.activeSection);
          if (resolved) return resolved;
        }
      } catch {}
    }
    return sections[0]?.id || "part1";
  });

  const [completedSections, setCompletedSections] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      try {
        if (isLessonInitiallyComplete) {
          return new Set(sections.map((s) => s.id));
        }
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed.completedSections)) {
            const valid = parsed.completedSections.filter((id: string) =>
              sections.some((s) => s.id === id)
            );
            return new Set(valid);
          }
        }
      } catch {}
    }
    return new Set();
  });

  const [isLessonCompleted, setIsLessonCompleted] = useState<boolean>(() => {
    return isLessonInitiallyComplete;
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;

  // 1. Hydrate progress from server if authenticated
  useEffect(() => {
    if (status === "loading") return;

    let isMounted = true;

    async function hydrate() {
      try {
        // Read local cache first
        let localActive = sections[0]?.id || "part1";
        let localCompleted = new Set<string>();
        let localIsDone = false;

        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          const resolved = resolveId(parsed.activeSection);
          if (resolved) localActive = resolved;
          if (Array.isArray(parsed.completedSections)) {
            localCompleted = new Set(
              parsed.completedSections.filter((id: string) =>
                sections.some((s) => s.id === id)
              )
            );
          }
          localIsDone = Boolean(parsed.isCompleted);
        }

        // If authenticated, reconcile with database
        if (isAuthenticated) {
          try {
            const res = await fetch("/api/progress", { cache: "no-store" });
            if (res.ok) {
              const { data } = await res.json();
              if (Array.isArray(data)) {
                const dbEntry = data.find((d: any) => d.module === lessonSlug);
                if (dbEntry) {
                  if (dbEntry.completed) {
                    localIsDone = true;
                    localCompleted = new Set(sections.map((s) => s.id));
                  } else if (Array.isArray(dbEntry.completedModules)) {
                    dbEntry.completedModules.forEach((m: string) => {
                      if (sections.some((s) => s.id === m)) {
                        localCompleted.add(m);
                      }
                    });
                  }
                }
              }
            }
          } catch {
            // Offline fallback
          }
        }

        if (isMounted) {
          const urlParamResolved = resolveId(sectionParam);
          setActiveSection(urlParamResolved || localActive);
          setCompletedSections(localCompleted);
          setIsLessonCompleted(localIsDone || localCompleted.size >= sections.length);
          setIsLoaded(true);
        }
      } catch {
        if (isMounted) setIsLoaded(true);
      }
    }

    hydrate();

    return () => {
      isMounted = false;
    };
  }, [
    lessonSlug,
    isAuthenticated,
    status,
    resolveId,
    sectionParam,
    sections,
    storageKey,
  ]);

  // 2. Server persistence helper
  const saveProgressToServer = useCallback(
    async (currentSec: string, completedList: string[], lessonFinished: boolean) => {
      if (!isAuthenticated) return;

      try {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            module: lessonSlug,
            activeModule: currentSec,
            completedModules: completedList,
            totalModules: sections.length,
            completed: lessonFinished,
            score: lessonFinished
              ? 100
              : sections.length > 0
              ? Math.round((completedList.length / sections.length) * 100)
              : 0,
            force: true,
          }),
        });

        window.dispatchEvent(
          new CustomEvent(`learncraft-${trackKey}-progress-updated`)
        );
      } catch {
        // Ignore offline network errors
      }
    },
    [lessonSlug, isAuthenticated, sections.length, trackKey]
  );

  // 3. User switches section
  const handleSectionChange = useCallback(
    (newSectionId: string) => {
      const validId = resolveId(newSectionId);
      if (!validId) return;

      const previousId = activeSectionRef.current;
      setActiveSection(validId);

      setCompletedSections((prev) => {
        const next = new Set(prev);
        if (previousId) next.add(previousId);

        const allDone = sections.length > 0 && next.size >= sections.length;
        if (allDone) {
          setIsLessonCompleted(true);
          onLessonCompleted?.(lessonSlug);
          recordActivity("lesson_complete", `Completed lesson: ${lessonSlug}`, { lessonSlug, trackKey });
        }

        try {
          localStorage.setItem(
            storageKey,
            JSON.stringify({
              activeSection: validId,
              completedSections: Array.from(next),
              isCompleted: allDone,
              updatedAt: Date.now(),
            })
          );
        } catch {}

        saveProgressToServer(validId, Array.from(next), allDone);
        return next;
      });
    },
    [
      resolveId,
      sections.length,
      lessonSlug,
      saveProgressToServer,
      storageKey,
      onLessonCompleted,
      trackKey,
    ]
  );

  // 4. Compute index & percentage
  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const safeCurrentIndex = currentIndex === -1 ? 0 : currentIndex;

  const progressPercent =
    sections.length > 0
      ? Math.round((completedSections.size / sections.length) * 100)
      : 0;

  // 5. Compute step states
  const getStepState = useCallback(
    (index: number): "done" | "active" | "todo" => {
      const section = sections[index];
      if (!section) return "todo";

      if (section.id === activeSection) return "active";
      if (completedSections.has(section.id)) return "done";
      return "todo";
    },
    [activeSection, completedSections, sections]
  );

  // 6. Complete whole lesson
  const completeLesson = useCallback(async () => {
    const allIds = sections.map((s) => s.id);
    setCompletedSections(new Set(allIds));
    setIsLessonCompleted(true);
    onLessonCompleted?.(lessonSlug);
    recordActivity("lesson_complete", `Mastered lesson: ${lessonSlug}`, { lessonSlug, trackKey });

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          activeSection: activeSectionRef.current,
          completedSections: allIds,
          isCompleted: true,
          updatedAt: Date.now(),
        })
      );
    } catch {}

    await saveProgressToServer(activeSectionRef.current, allIds, true);
  }, [sections, lessonSlug, saveProgressToServer, storageKey, onLessonCompleted, trackKey]);

  // 7. Step navigation
  const handlePrev = useCallback(() => {
    if (safeCurrentIndex > 0) {
      handleSectionChange(sections[safeCurrentIndex - 1].id);
    }
  }, [safeCurrentIndex, sections, handleSectionChange]);

  const handleNext = useCallback(() => {
    if (safeCurrentIndex < sections.length - 1) {
      handleSectionChange(sections[safeCurrentIndex + 1].id);
    } else {
      completeLesson();
    }
  }, [safeCurrentIndex, sections, handleSectionChange, completeLesson]);

  return {
    isAuthenticated,
    isLoaded,
    activeSection,
    completedSections,
    isLessonCompleted,
    currentIndex: safeCurrentIndex,
    progressPercent,
    completedSectionsCount: completedSections.size,
    handleSectionChange,
    completeLesson,
    handlePrev,
    handleNext,
    getStepState,
  };
}
