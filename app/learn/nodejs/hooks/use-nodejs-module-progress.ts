"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { markLessonComplete, isLessonComplete } from "../data/progress-store";

export interface NodeSectionItem {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  [key: string]: any;
}

interface UseNodeModuleProgressProps {
  lessonSlug: string;
  sections: NodeSectionItem[];
}

export function useNodeModuleProgress({
  lessonSlug,
  sections,
}: UseNodeModuleProgressProps) {
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

  const storageKey = `learncraft_node_sections_${lessonSlug}`;

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
        if (isLessonComplete(lessonSlug)) {
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
    return isLessonComplete(lessonSlug);
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

  useEffect(() => {
    if (status === "loading") return;

    let isMounted = true;

    // Check localStorage hydration first
    try {
      if (isLessonComplete(lessonSlug)) {
        setIsLessonCompleted(true);
        setCompletedSections(new Set(sections.map((s) => s.id)));
      } else {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed.completedSections)) {
            const valid = parsed.completedSections.filter((id: string) =>
              sections.some((s) => s.id === id)
            );
            setCompletedSections(new Set(valid));
          }
        }
      }
    } catch {}

    if (!isAuthenticated) {
      setIsLoaded(true);
      return;
    }

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
        console.error("[useNodeModuleProgress] Error loading progress:", err);
      } finally {
        if (isMounted) setIsLoaded(true);
      }
    }

    loadProgressFromDatabase();

    return () => {
      isMounted = false;
    };
  }, [lessonSlug, isAuthenticated, status, resolveId, sections, sectionParam, storageKey]);

  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const safeCurrentIndex = currentIndex === -1 ? 0 : currentIndex;
  const completedSectionsCount = completedSections.size;
  const progressPercent =
    sections.length > 0
      ? Math.round((completedSectionsCount / sections.length) * 100)
      : 0;

  const persistProgress = useCallback(
    async (nextCompleted: Set<string>, nextActiveId: string) => {
      const completedArray = Array.from(nextCompleted);
      const isComplete =
        sections.length > 0 && completedArray.length >= sections.length;

      // Always persist to localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            storageKey,
            JSON.stringify({
              completedSections: completedArray,
              activeSection: nextActiveId,
              isCompleted: isComplete,
              lastUpdated: Date.now(),
            })
          );
        } catch {}
      }

      if (isComplete && isMountedRef.current) {
        await markLessonComplete(lessonSlug);
        if (isMountedRef.current) {
          setIsLessonCompleted(true);
        }
      }

      if (!isAuthenticated) return;

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
      } catch (err) {
        console.error("[useNodeModuleProgress] Error persisting progress:", err);
      }
    },
    [isAuthenticated, lessonSlug, sections.length, storageKey]
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
