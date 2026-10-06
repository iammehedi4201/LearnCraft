"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { markLessonComplete } from "../data/progress-store";

export interface ExpressSectionItem {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  [key: string]: any;
}

interface UseExpressModuleProgressProps {
  lessonSlug: string;
  sections: ExpressSectionItem[];
}

export function useExpressModuleProgress({
  lessonSlug,
  sections,
}: UseExpressModuleProgressProps) {
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
              if (isMounted) {
                setCompletedSections(completedSet);
              }

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
              // Mark lesson started if newly viewed
              fetch("/api/progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  module: lessonSlug,
                  activeModule: activeSectionRef.current,
                  completedModules: [],
                  completed: false,
                  totalModules: sections.length,
                }),
              }).catch(() => {});
            }
          }
        }
      } catch (err) {
        console.warn("[useExpressModuleProgress] DB load error:", err);
      } finally {
        if (isMounted) setIsLoaded(true);
      }
    }

    loadProgressFromDatabase();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, lessonSlug, resolveId, sectionParam, sections, status]);

  const handleSectionChange = useCallback(
    (newSectionId: string) => {
      const resolvedTarget = resolveId(newSectionId) || newSectionId;
      const currentActive = activeSectionRef.current;
      setActiveSection(resolvedTarget);

      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });

        const url = new URL(window.location.href);
        url.searchParams.set("section", resolvedTarget);
        window.history.replaceState(null, "", url.toString());
      }

      if (!isAuthenticated) {
        return;
      }

      setCompletedSections((prev) => {
        const next = new Set(prev);
        if (currentActive) {
          next.add(currentActive);
        }

        const completedArray = Array.from(next);
        const allCompleted =
          sections.length > 0 && completedArray.length >= sections.length;

        if (allCompleted && isMountedRef.current) {
          setIsLessonCompleted(true);
        }

        fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            module: lessonSlug,
            activeModule: resolvedTarget,
            completedModules: completedArray,
            totalModules: sections.length,
            completed: allCompleted,
          }),
        })
          .then(() => {
            if (allCompleted) {
              markLessonComplete(lessonSlug);
            }
          })
          .catch((err) =>
            console.warn("[useExpressModuleProgress] DB save error:", err)
          );

        return next;
      });
    },
    [isAuthenticated, lessonSlug, resolveId, sections.length]
  );

  const handleNext = useCallback(() => {
    const idx = sections.findIndex((s) => s.id === activeSection);
    if (idx !== -1 && idx < sections.length - 1) {
      handleSectionChange(sections[idx + 1].id);
    }
  }, [activeSection, handleSectionChange, sections]);

  const handlePrev = useCallback(() => {
    const idx = sections.findIndex((s) => s.id === activeSection);
    if (idx > 0) {
      handleSectionChange(sections[idx - 1].id);
    }
  }, [activeSection, handleSectionChange, sections]);

  const completeLesson = useCallback(() => {
    if (!isAuthenticated) return;

    const allModuleIds = sections.map((s) => s.id);
    if (isMountedRef.current) {
      setCompletedSections(new Set(allModuleIds));
      setIsLessonCompleted(true);
    }

    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        module: lessonSlug,
        activeModule: sections[sections.length - 1]?.id,
        completedModules: allModuleIds,
        totalModules: sections.length,
        completed: true,
        score: 100,
      }),
    })
      .then(() => {
        markLessonComplete(lessonSlug);
      })
      .catch((err) =>
        console.warn("[useExpressModuleProgress] DB complete error:", err)
      );
  }, [isAuthenticated, lessonSlug, sections]);

  const getStepState = useCallback(
    (index: number): "done" | "active" | "todo" => {
      const section = sections[index];
      if (!section) return "todo";

      if (section.id === activeSection) return "active";

      if (!isAuthenticated) {
        return "todo";
      }

      if (completedSections.has(section.id)) {
        return "done";
      }

      return "todo";
    },
    [activeSection, completedSections, isAuthenticated, sections]
  );

  const currentIndex = Math.max(
    0,
    sections.findIndex((s) => s.id === activeSection)
  );

  const progressPercent =
    isAuthenticated && sections.length > 0
      ? Math.round((completedSections.size / sections.length) * 100)
      : 0;

  return {
    isAuthenticated,
    activeSection,
    completedSections,
    completedSectionsCount: completedSections.size,
    isLessonCompleted,
    isLoaded,
    currentIndex,
    progressPercent,
    handleSectionChange,
    handlePrev,
    handleNext,
    completeLesson,
    getStepState,
  };
}
