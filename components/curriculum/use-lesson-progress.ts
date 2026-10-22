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

/**
 * Ensures completed sections are contiguous and sequential.
 * In a structured curriculum, a learner cannot complete step 6 if step 3, 4, or 5 is uncompleted.
 * Prunes any out-of-order anomalies from old storage or accidental scroll triggers.
 */
export function sanitizeSequentialCompleted(
  completed: Iterable<string> | null | undefined,
  sections: LessonSectionItem[]
): Set<string> {
  if (!completed) return new Set();
  const set = completed instanceof Set ? completed : new Set(completed);
  const result = new Set<string>();
  for (const s of sections) {
    if (set.has(s.id)) {
      result.add(s.id);
    } else {
      break;
    }
  }
  return result;
}

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
      const match = id.match(/^#?part-?(\d+)$/i);
      if (match) {
        const idx = parseInt(match[1], 10) - 1;
        if (sections[idx]) return sections[idx].id;
      }
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
            return sanitizeSequentialCompleted(parsed.completedSections, sections);
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
            localCompleted = sanitizeSequentialCompleted(
              parsed.completedSections,
              sections
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
                    const dbCompleted = sanitizeSequentialCompleted(
                      dbEntry.completedModules,
                      sections
                    );
                    const merged = new Set([...localCompleted, ...dbCompleted]);
                    localCompleted = sanitizeSequentialCompleted(merged, sections);
                  }
                }
              }
            }
          } catch {
            // Offline fallback
          }
        }

        // Synchronize sanitized sequential progress back to localStorage if sanitized removed gaps
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (
              Array.isArray(parsed.completedSections) &&
              parsed.completedSections.length !== localCompleted.size
            ) {
              localStorage.setItem(
                storageKey,
                JSON.stringify({
                  activeSection: localActive,
                  completedSections: Array.from(localCompleted),
                  isCompleted: localIsDone,
                  updatedAt: Date.now(),
                })
              );
            }
          } catch {}
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
      activeSectionRef.current = validId;
      setActiveSection(validId);

      setCompletedSections((prev) => {
        // Only mark previous complete if navigation is sequential forward step-by-step
        // (i.e. moving from index N to N+1 where all prior sections 0..N are done)
        const prevIdx = sections.findIndex((s) => s.id === previousId);
        const nextIdx = sections.findIndex((s) => s.id === validId);

        let next = prev;
        if (previousId && prevIdx >= 0 && nextIdx === prevIdx + 1) {
          const canCompletePrev = sections
            .slice(0, prevIdx)
            .every((s) => prev.has(s.id));
          if (canCompletePrev && !prev.has(previousId)) {
            next = new Set(prev);
            next.add(previousId);
          }
        }

        const allDone = sections.length > 0 && next.size >= sections.length;
        if (allDone && !isLessonCompleted) {
          setIsLessonCompleted(true);
          onLessonCompleted?.(lessonSlug);
          recordActivity("lesson_complete", `Completed lesson: ${lessonSlug}`, {
            lessonSlug,
            trackKey,
          });
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
      sections,
      lessonSlug,
      saveProgressToServer,
      storageKey,
      onLessonCompleted,
      trackKey,
      isLessonCompleted,
    ]
  );

  // 3b. Direct active section update (without auto-marking previous complete)
  const setActiveSectionId = useCallback(
    (newSectionId: string | number) => {
      let validId: string | null = null;
      if (typeof newSectionId === "number") {
        validId = sections[newSectionId]?.id || null;
      } else {
        validId = resolveId(newSectionId);
      }
      if (!validId) return;
      if (validId !== activeSectionRef.current) {
        activeSectionRef.current = validId;
        setActiveSection(validId);
      }
    },
    [resolveId, sections]
  );

  // 3c. Mark single section complete (sequential completion tracking)
  const markSectionComplete = useCallback(
    (targetIdOrIndex: string | number) => {
      let targetId: string | null = null;
      if (typeof targetIdOrIndex === "number") {
        targetId = sections[targetIdOrIndex]?.id || null;
      } else {
        targetId = resolveId(targetIdOrIndex);
      }

      if (!targetId) return;

      const targetIdx = sections.findIndex((s) => s.id === targetId);
      if (targetIdx === -1) return;

      setCompletedSections((prev) => {
        if (prev.has(targetId!)) return prev;

        // Ensure learner has completed all preceding parts sequentially!
        // A learner cannot complete part N if part N-1 is not complete!
        const canComplete = sections
          .slice(0, targetIdx)
          .every((s) => prev.has(s.id));

        if (!canComplete) {
          // Cannot complete out of order
          return prev;
        }

        const next = new Set(prev);
        next.add(targetId!);

        const allDone = sections.length > 0 && next.size >= sections.length;
        if (allDone) {
          setIsLessonCompleted(true);
          onLessonCompleted?.(lessonSlug);
          recordActivity("lesson_complete", `Completed lesson: ${lessonSlug}`, {
            lessonSlug,
            trackKey,
          });
        }

        try {
          localStorage.setItem(
            storageKey,
            JSON.stringify({
              activeSection: activeSectionRef.current,
              completedSections: Array.from(next),
              isCompleted: allDone,
              updatedAt: Date.now(),
            })
          );
        } catch {}

        saveProgressToServer(activeSectionRef.current, Array.from(next), allDone);
        return next;
      });
    },
    [
      resolveId,
      sections,
      lessonSlug,
      onLessonCompleted,
      trackKey,
      storageKey,
      saveProgressToServer,
    ]
  );

  // 3d. Mark all sections up to a specific index complete (smooth continuous scroll progress)
  const markSectionsUpToIndex = useCallback(
    (targetIndex: number) => {
      if (targetIndex < 0 || targetIndex >= sections.length) return;

      setCompletedSections((prev) => {
        let changed = false;
        const next = new Set(prev);

        for (let i = 0; i <= targetIndex; i++) {
          const sec = sections[i];
          if (sec && !next.has(sec.id)) {
            next.add(sec.id);
            changed = true;
          }
        }

        if (!changed) return prev;

        const allDone = sections.length > 0 && next.size >= sections.length;
        if (allDone && !isLessonCompleted) {
          setIsLessonCompleted(true);
          onLessonCompleted?.(lessonSlug);
          recordActivity("lesson_complete", `Completed lesson: ${lessonSlug}`, {
            lessonSlug,
            trackKey,
          });
        }

        try {
          localStorage.setItem(
            storageKey,
            JSON.stringify({
              activeSection: activeSectionRef.current,
              completedSections: Array.from(next),
              isCompleted: allDone,
              updatedAt: Date.now(),
            })
          );
        } catch {}

        saveProgressToServer(activeSectionRef.current, Array.from(next), allDone);
        return next;
      });
    },
    [
      sections,
      isLessonCompleted,
      onLessonCompleted,
      lessonSlug,
      trackKey,
      storageKey,
      saveProgressToServer,
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
    setActiveSectionId,
    markSectionComplete,
    markSectionsUpToIndex,
    completeLesson,
    handlePrev,
    handleNext,
    getStepState,
  };
}
