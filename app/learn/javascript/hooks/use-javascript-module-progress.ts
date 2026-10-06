"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { markLessonComplete } from "../data/progress-store";

export interface JSSectionItem {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  [key: string]: any;
}

interface UseJSModuleProgressProps {
  lessonSlug: string;
  sections: JSSectionItem[];
}

export function useJSModuleProgress({
  lessonSlug,
  sections,
}: UseJSModuleProgressProps) {
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
              if (isMounted) {
                setCompletedSections(new Set());
                setIsLessonCompleted(false);
              }
            }
          }
        }
      } catch (err) {
        console.error("[useJSModuleProgress] Load error:", err);
      } finally {
        if (isMounted) {
          setIsLoaded(true);
        }
      }
    }

    loadProgressFromDatabase();

    return () => {
      isMounted = false;
    };
  }, [lessonSlug, isAuthenticated, status, sections, resolveId, sectionParam]);

  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const progressPercent =
    sections.length > 0
      ? Math.round((completedSections.size / sections.length) * 100)
      : 0;

  const handleSectionChange = useCallback(
    (newId: string) => {
      const valid = resolveId(newId);
      if (!valid) return;

      setActiveSection(valid);

      const nextCompleted = new Set(completedSections);
      if (activeSectionRef.current) {
        nextCompleted.add(activeSectionRef.current);
      }
      setCompletedSections(nextCompleted);

      const isAllDone =
        sections.length > 0 && nextCompleted.size >= sections.length;
      if (isAllDone) {
        if (isMountedRef.current) setIsLessonCompleted(true);
        markLessonComplete(lessonSlug);
      }

      if (isAuthenticated) {
        fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            module: lessonSlug,
            activeModule: valid,
            completedModules: Array.from(nextCompleted),
            completed: isAllDone,
          }),
        }).catch((err) => {
          console.error("[useJSModuleProgress] Sync error:", err);
        });
      }
    },
    [
      lessonSlug,
      completedSections,
      sections,
      isAuthenticated,
      resolveId,
    ]
  );

  const handlePrev = useCallback(() => {
    if (safeIndex > 0) {
      handleSectionChange(sections[safeIndex - 1].id);
    }
  }, [safeIndex, sections, handleSectionChange]);

  const handleNext = useCallback(() => {
    if (safeIndex < sections.length - 1) {
      handleSectionChange(sections[safeIndex + 1].id);
    } else if (safeIndex === sections.length - 1) {
      const nextCompleted = new Set(completedSections);
      nextCompleted.add(sections[safeIndex].id);
      setCompletedSections(nextCompleted);
      setIsLessonCompleted(true);
      markLessonComplete(lessonSlug);
    }
  }, [safeIndex, sections, completedSections, lessonSlug, handleSectionChange]);

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

  return {
    activeSection,
    currentIndex: safeIndex,
    progressPercent,
    completedSectionsCount: completedSections.size,
    isLessonCompleted,
    isLoaded,
    handleSectionChange,
    handlePrev,
    handleNext,
    getStepState,
  };
}
