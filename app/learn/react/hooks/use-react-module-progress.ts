"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { markLessonComplete, isLessonComplete } from "../data/progress-store";

export interface ReactSectionItem {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  [key: string]: any;
}

interface UseReactModuleProgressProps {
  lessonSlug: string;
  sections: ReactSectionItem[];
}

export function useReactModuleProgress({
  lessonSlug,
  sections,
}: UseReactModuleProgressProps) {
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

  const [activeSection, setActiveSection] = useState<string>(() => {
    const resolvedFromUrl = resolveId(sectionParam);
    if (resolvedFromUrl) return resolvedFromUrl;
    return sections[0]?.id || "part1";
  });

  const [completedSections, setCompletedSections] = useState<Set<string>>(
    new Set()
  );
  const [isLessonCompleted, setIsLessonCompleted] = useState<boolean>(false);
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

  useEffect(() => {
    if (status === "loading") return;

    if (!isAuthenticated) {
      setCompletedSections(new Set());
      setIsLessonCompleted(false);
      setIsLoaded(true);
      return;
    }

    let isMounted = true;

    async function loadProgressFromDatabase() {
      try {
        const res = await fetch("/api/progress", { cache: "no-store" });
        if (!isMounted) return;

        if (res.ok) {
          const json = await res.json();
          if (!isMounted) return;

          if (json.success && Array.isArray(json.data)) {
            const record = json.data.find(
              (d: any) =>
                d.module === lessonSlug ||
                d.module.toLowerCase() === lessonSlug.toLowerCase()
            );

            if (record) {
              let validCompleted = (record.completedModules || [])
                .map((id: string) => resolveId(id))
                .filter((id: string | null): id is string => Boolean(id));

              if (record.completed && validCompleted.length === 0) {
                validCompleted = sections.map((s) => s.id);
              }

              const completedSet = new Set<string>(validCompleted);
              if (isMounted) setCompletedSections(completedSet);

              const resolvedActive = resolveId(record.activeModule);
              if (!sectionParam && resolvedActive && isMounted) {
                setActiveSection(resolvedActive);
              }

              if (
                record.completed ||
                (sections.length > 0 && completedSet.size >= sections.length)
              ) {
                if (isMounted) setIsLessonCompleted(true);
              }
            } else {
              if (isLessonComplete(lessonSlug) && isMounted) {
                setIsLessonCompleted(true);
                setCompletedSections(new Set(sections.map((s) => s.id)));
              }
            }
          }
        }
      } catch (err) {
        console.error("[useReactModuleProgress] Error loading progress:", err);
      } finally {
        if (isMounted) setIsLoaded(true);
      }
    }

    loadProgressFromDatabase();

    return () => {
      isMounted = false;
    };
  }, [lessonSlug, isAuthenticated, status, resolveId, sections, sectionParam]);

  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const safeCurrentIndex = currentIndex === -1 ? 0 : currentIndex;
  const completedSectionsCount = completedSections.size;
  const progressPercent =
    sections.length > 0
      ? Math.round((completedSectionsCount / sections.length) * 100)
      : 0;

  const persistProgress = useCallback(
    async (nextCompleted: Set<string>, nextActiveId: string) => {
      if (!isAuthenticated) return;

      const completedArray = Array.from(nextCompleted);
      const isComplete =
        sections.length > 0 && completedArray.length >= sections.length;

      try {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            module: lessonSlug,
            activeModule: nextActiveId,
            completedModules: completedArray,
            completed: isComplete,
            score: isComplete ? 100 : Math.round((completedArray.length / sections.length) * 100),
          }),
        });

        if (isComplete && isMountedRef.current) {
          await markLessonComplete(lessonSlug);
          if (isMountedRef.current) {
            setIsLessonCompleted(true);
          }
        }
      } catch (err) {
        console.error("[useReactModuleProgress] Error persisting progress:", err);
      }
    },
    [isAuthenticated, lessonSlug, sections.length]
  );

  const handleSectionChange = useCallback(
    (targetSectionId: string) => {
      const resolved = resolveId(targetSectionId);
      if (!resolved) return;

      const currentIdx = sections.findIndex((s) => s.id === activeSectionRef.current);

      const nextCompleted = new Set(completedSections);
      if (currentIdx !== -1 && activeSectionRef.current) {
        nextCompleted.add(activeSectionRef.current);
      }

      setCompletedSections(nextCompleted);
      setActiveSection(resolved);

      persistProgress(nextCompleted, resolved);

      try {
        const url = new URL(window.location.href);
        url.searchParams.set("section", resolved);
        window.history.replaceState({}, "", url.toString());
      } catch {}
    },
    [resolveId, sections, completedSections, persistProgress]
  );

  const handleNext = useCallback(() => {
    if (safeCurrentIndex < sections.length - 1) {
      const nextId = sections[safeCurrentIndex + 1].id;
      handleSectionChange(nextId);
    } else {
      const nextCompleted = new Set(completedSections);
      if (activeSectionRef.current) {
        nextCompleted.add(activeSectionRef.current);
      }
      setCompletedSections(nextCompleted);
      setIsLessonCompleted(true);
      persistProgress(nextCompleted, activeSectionRef.current);
    }
  }, [safeCurrentIndex, sections, completedSections, handleSectionChange, persistProgress]);

  const handlePrev = useCallback(() => {
    if (safeCurrentIndex > 0) {
      const prevId = sections[safeCurrentIndex - 1].id;
      handleSectionChange(prevId);
    }
  }, [safeCurrentIndex, sections, handleSectionChange]);

  const getStepState = useCallback(
    (index: number): "done" | "active" | "todo" => {
      const section = sections[index];
      if (!section) return "todo";

      if (section.id === activeSection) {
        return "active";
      }

      if (completedSections.has(section.id)) {
        return "done";
      }

      return "todo";
    },
    [sections, activeSection, completedSections]
  );

  return {
    activeSection,
    currentIndex: safeCurrentIndex,
    progressPercent,
    completedSectionsCount,
    isLessonCompleted,
    isLoaded,
    handleSectionChange,
    handlePrev,
    handleNext,
    getStepState,
  };
}
