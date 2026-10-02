"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { markLessonComplete } from "../data/progress-store";
import { getAllAnnotations } from "@/lib/revision-storage";

export interface SectionItem {
  id: string;
  label: string;
  icon?: string;
  [key: string]: any;
}

interface UseModuleProgressProps {
  lessonSlug: string;
  sections: SectionItem[];
  legacyMap?: Record<string, string>;
}

export function useModuleProgress({
  lessonSlug,
  sections,
  legacyMap,
}: UseModuleProgressProps) {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && Boolean(session?.user);

  const searchParams = useSearchParams();
  const sectionParam = searchParams?.get("section");
  const highlightId = searchParams?.get("highlightId");

  const resolveId = useCallback(
    (id?: string | null): string | null => {
      if (!id) return null;
      if (sections.some((s) => s.id === id)) return id;
      if (legacyMap && legacyMap[id]) {
        const mapped = legacyMap[id];
        if (sections.some((s) => s.id === mapped)) return mapped;
      }
      return null;
    },
    [legacyMap, sections]
  );

  // Initialize active section from URL query, highlight annotation, or first section
  const [activeSection, setActiveSection] = useState<string>(() => {
    const resolvedFromUrl = resolveId(sectionParam);
    if (resolvedFromUrl) return resolvedFromUrl;
    return sections[0]?.id || "part1";
  });

  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [isLessonCompleted, setIsLessonCompleted] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;

  // Handle highlight lookup
  useEffect(() => {
    if (highlightId) {
      try {
        const all = getAllAnnotations();
        const target = all.find(
          (a) =>
            a.id === highlightId ||
            a.id === `rev_${highlightId}` ||
            `rev-highlight-${a.id}` === highlightId
        );
        const resolvedTarget = resolveId(target?.sectionId);
        if (resolvedTarget) {
          setActiveSection(resolvedTarget);
          if (typeof window !== "undefined") {
            const url = new URL(window.location.href);
            url.searchParams.delete("highlightId");
            url.searchParams.set("section", resolvedTarget);
            window.history.replaceState(null, "", url.toString());
          }
        }
      } catch {}
    }
  }, [highlightId, resolveId]);

  // 1. Database Hydration (ONLY when authenticated)
  useEffect(() => {
    if (status === "loading") return;

    if (!isAuthenticated) {
      // Unauthenticated users must NEVER have completed modules or saved progress
      setCompletedSections(new Set());
      setIsLessonCompleted(false);
      setIsLoaded(true);
      return;
    }

    let isMounted = true;

    async function loadProgressFromDatabase() {
      try {
        const res = await fetch("/api/progress", { cache: "no-store" });
        if (res.ok && isMounted) {
          const json = await res.json();
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

              // If lesson is marked completed in DB, ensure all sections in this lesson are marked completed
              if (record.completed && validCompleted.length === 0) {
                validCompleted = sections.map((s) => s.id);
              }

              const completedSet = new Set<string>(validCompleted);
              setCompletedSections(completedSet);

              // Restore active section from database if not specified in URL
              const resolvedActive = resolveId(record.activeModule);
              if (!sectionParam && resolvedActive) {
                setActiveSection(resolvedActive);
              }

              if (record.completed || (sections.length > 0 && completedSet.size >= sections.length)) {
                setIsLessonCompleted(true);
              }
            } else {
              // First time starting this lesson: record started in DB
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
        console.warn("[useModuleProgress] Failed to load module progress from DB:", err);
      } finally {
        if (isMounted) setIsLoaded(true);
      }
    }

    loadProgressFromDatabase();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, lessonSlug, resolveId, sectionParam, sections, status]);

  // 2. Handle module progression & save to database
  const handleSectionChange = useCallback(
    (newSectionId: string) => {
      const resolvedTarget = resolveId(newSectionId) || newSectionId;
      const currentActive = activeSectionRef.current;
      setActiveSection(resolvedTarget);

      // Smooth scroll to top of lesson content
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Update URL search param
        const url = new URL(window.location.href);
        url.searchParams.delete("highlightId");
        url.searchParams.set("section", resolvedTarget);
        window.history.replaceState(null, "", url.toString());
      }

      // If user is NOT signed in, DO NOT save progress to database
      if (!isAuthenticated) {
        return;
      }

      // Build updated completed set
      setCompletedSections((prev) => {
        const next = new Set(prev);
        if (currentActive) {
          next.add(currentActive);
        }

        const completedArray = Array.from(next);
        const allCompleted = sections.length > 0 && completedArray.length >= sections.length;

        if (allCompleted) {
          setIsLessonCompleted(true);
        }

        // Save progress to PostgreSQL database
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
          .catch((err) => console.warn("[useModuleProgress] DB save error:", err));

        return next;
      });
    },
    [isAuthenticated, lessonSlug, resolveId, sections.length]
  );

  // 3. Mark current module complete
  const markCurrentModuleComplete = useCallback(
    (moduleId?: string) => {
      if (!isAuthenticated) return;

      const targetId = moduleId || activeSectionRef.current;
      if (!targetId) return;

      setCompletedSections((prev) => {
        const next = new Set(prev);
        next.add(targetId);

        const completedArray = Array.from(next);
        const allCompleted = sections.length > 0 && completedArray.length >= sections.length;

        if (allCompleted) {
          setIsLessonCompleted(true);
        }

        fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            module: lessonSlug,
            activeModule: activeSectionRef.current,
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
          .catch((err) => console.warn("[useModuleProgress] DB mark error:", err));

        return next;
      });
    },
    [isAuthenticated, lessonSlug, sections.length]
  );

  // 4. Mark all modules and complete the lesson
  const completeLesson = useCallback(() => {
    if (!isAuthenticated) return;

    const allModuleIds = sections.map((s) => s.id);
    setCompletedSections(new Set(allModuleIds));
    setIsLessonCompleted(true);

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
      .catch((err) => console.warn("[useModuleProgress] DB complete error:", err));
  }, [isAuthenticated, lessonSlug, sections]);

  // 5. Compute sidebar step state
  const getStepState = useCallback(
    (index: number): "done" | "active" | "todo" => {
      const section = sections[index];
      if (!section) return "todo";

      if (section.id === activeSection) return "active";

      // If user is not authenticated, DO NOT show any completed state!
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
    isLessonCompleted,
    isLoaded,
    currentIndex,
    progressPercent,
    handleSectionChange,
    markCurrentModuleComplete,
    completeLesson,
    getStepState,
  };
}
