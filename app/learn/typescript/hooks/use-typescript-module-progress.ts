"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { markLessonComplete, isLessonComplete } from "../data/progress-store";

export interface TypeScriptSectionItem {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  [key: string]: any;
}

interface UseTypeScriptModuleProgressProps {
  lessonSlug: string;
  sections: TypeScriptSectionItem[];
}

export function useTypeScriptModuleProgress({
  lessonSlug,
  sections,
}: UseTypeScriptModuleProgressProps) {
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

  const storageKey = `learncraft_ts_sections_${lessonSlug}`;

  const [activeSection, setActiveSection] = useState<string>(() => {
    const resolvedFromUrl = resolveId(sectionParam);
    if (resolvedFromUrl) return resolvedFromUrl;
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(`learncraft_ts_sections_${lessonSlug}`);
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
        const raw = localStorage.getItem(`learncraft_ts_sections_${lessonSlug}`);
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

  // 1. Hydrate progress
  useEffect(() => {
    if (status === "loading") return;

    let isMounted = true;

    // Check localStorage hydration first (works for guests and as offline cache)
    const hydrateFromLocal = () => {
      try {
        const alreadyComplete = isLessonComplete(lessonSlug);
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          const validCompleted = Array.isArray(parsed.completedSections)
            ? parsed.completedSections.filter((id: string) =>
                sections.some((s) => s.id === id)
              )
            : [];

          const isFullyDone =
            alreadyComplete ||
            Boolean(parsed.isCompleted) ||
            (sections.length > 0 && validCompleted.length >= sections.length);

          if (isFullyDone) {
            if (isMounted) {
              setCompletedSections(new Set(sections.map((s) => s.id)));
              setIsLessonCompleted(true);
            }
          } else {
            if (isMounted) {
              setCompletedSections(new Set(validCompleted));
              setIsLessonCompleted(false);
            }
          }

          const resolvedActive = resolveId(parsed.activeSection);
          if (!sectionParam && resolvedActive && isMounted) {
            setActiveSection(resolvedActive);
          }
        } else if (alreadyComplete) {
          if (isMounted) {
            setCompletedSections(new Set(sections.map((s) => s.id)));
            setIsLessonCompleted(true);
          }
        } else {
          if (isMounted) {
            setCompletedSections(new Set());
            setIsLessonCompleted(false);
          }
        }
      } catch {}
    };

    if (!isAuthenticated) {
      hydrateFromLocal();
      if (isMounted) setIsLoaded(true);
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

              const isDone =
                record.completed === true ||
                (sections.length > 0 && validCompleted.length >= sections.length);

              if (isDone) {
                validCompleted = sections.map((s) => s.id);
              }

              const completedSet = new Set<string>(validCompleted);
              if (isMounted) {
                setCompletedSections(completedSet);
                setIsLessonCompleted(isDone);
              }

              const resolvedActive = resolveId(record.activeModule);
              if (!sectionParam && resolvedActive && isMounted) {
                setActiveSection(resolvedActive);
              }

              // Also persist back to localStorage
              try {
                localStorage.setItem(
                  storageKey,
                  JSON.stringify({
                    activeSection: resolvedActive || activeSectionRef.current,
                    completedSections: Array.from(completedSet),
                    isCompleted: isDone,
                    updatedAt: Date.now(),
                  })
                );
              } catch {}
            } else {
              hydrateFromLocal();
            }
          }
        } else {
          hydrateFromLocal();
        }
      } catch {
        hydrateFromLocal();
      } finally {
        if (isMounted) setIsLoaded(true);
      }
    }

    loadProgressFromDatabase();

    return () => {
      isMounted = false;
    };
  }, [lessonSlug, isAuthenticated, status, resolveId, sectionParam, sections, storageKey]);

  // 2. Helper to sync progress to server
  const saveProgressToServer = useCallback(
    async (
      activeModule: string,
      completedList: string[],
      lessonFinished: boolean
    ) => {
      if (!isAuthenticated) return;
      try {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            module: lessonSlug,
            activeModule,
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
          new CustomEvent("learncraft-ts-progress-updated")
        );
      } catch {
        // ignore offline errors
      }
    },
    [lessonSlug, isAuthenticated, sections.length]
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
          markLessonComplete(lessonSlug);
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
    [resolveId, sections.length, lessonSlug, saveProgressToServer, storageKey]
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

    await markLessonComplete(lessonSlug);
    await saveProgressToServer(activeSectionRef.current, allIds, true);
  }, [sections, lessonSlug, saveProgressToServer, storageKey]);

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
