"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { markLessonComplete, isLessonComplete } from "../data/progress-store";
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

  const storageKey = `learncraft_nj_sections_${lessonSlug}`;

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

  const [completedSections, setCompletedSections] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      try {
        if (isLessonComplete(lessonSlug)) {
          return new Set(sections.map((s) => s.id));
        }
        const cached = localStorage.getItem(storageKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed?.completedSections)) {
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

  // 1. Hydrate progress
  useEffect(() => {
    if (status === "loading") return;

    let isMounted = true;

    // Check localStorage hydration first
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
        }
      } catch {}
    };

    hydrateFromLocal();

    if (!isAuthenticated) {
      setIsLoaded(true);
      return;
    }

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

              if (record.completed && validCompleted.length === 0) {
                validCompleted = sections.map((s) => s.id);
              }

              const completedSet = new Set<string>(validCompleted);
              setCompletedSections(completedSet);

              const resolvedActive = resolveId(record.activeModule);
              if (!sectionParam && resolvedActive) {
                setActiveSection(resolvedActive);
              }

              const isDone =
                record.completed ||
                (sections.length > 0 && completedSet.size >= sections.length);
              if (isDone) {
                setIsLessonCompleted(true);
              }

              // Update local cache
              try {
                localStorage.setItem(
                  storageKey,
                  JSON.stringify({
                    completedSections: Array.from(completedSet),
                    activeSection: resolvedActive || activeSectionRef.current,
                    isCompleted: isDone,
                  })
                );
              } catch {}
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
  }, [isAuthenticated, lessonSlug, resolveId, sectionParam, sections, status, storageKey]);

  // 2. Handle module progression
  const handleSectionChange = useCallback(
    (newSectionId: string) => {
      const resolvedTarget = resolveId(newSectionId) || newSectionId;
      const currentActive = activeSectionRef.current;
      setActiveSection(resolvedTarget);

      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });

        const url = new URL(window.location.href);
        url.searchParams.delete("highlightId");
        url.searchParams.set("section", resolvedTarget);
        window.history.replaceState(null, "", url.toString());
      }

      setCompletedSections((prev) => {
        const next = new Set(prev);
        if (currentActive) {
          next.add(currentActive);
        }

        const completedArray = Array.from(next);
        const allCompleted = sections.length > 0 && completedArray.length >= sections.length;

        if (allCompleted) {
          setIsLessonCompleted(true);
          markLessonComplete(lessonSlug);
        }

        // Persist to local storage
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(
              storageKey,
              JSON.stringify({
                completedSections: completedArray,
                activeSection: resolvedTarget,
                isCompleted: allCompleted,
              })
            );
          } catch {}
        }

        // Persist to DB if authenticated
        if (isAuthenticated) {
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
          }).catch((err) => console.warn("[useModuleProgress] DB save error:", err));
        }

        return next;
      });
    },
    [isAuthenticated, lessonSlug, resolveId, sections.length, storageKey]
  );

  // 3. Mark current module complete
  const markCurrentModuleComplete = useCallback(
    (moduleId?: string) => {
      const targetId = moduleId || activeSectionRef.current;
      if (!targetId) return;

      setCompletedSections((prev) => {
        const next = new Set(prev);
        next.add(targetId);

        const completedArray = Array.from(next);
        const allCompleted = sections.length > 0 && completedArray.length >= sections.length;

        if (allCompleted) {
          setIsLessonCompleted(true);
          markLessonComplete(lessonSlug);
        }

        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(
              storageKey,
              JSON.stringify({
                completedSections: completedArray,
                activeSection: activeSectionRef.current,
                isCompleted: allCompleted,
              })
            );
          } catch {}
        }

        if (isAuthenticated) {
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
          }).catch((err) => console.warn("[useModuleProgress] DB mark error:", err));
        }

        return next;
      });
    },
    [isAuthenticated, lessonSlug, sections.length, storageKey]
  );

  // 4. Mark all modules and complete the lesson
  const completeLesson = useCallback(() => {
    const allModuleIds = sections.map((s) => s.id);
    setCompletedSections(new Set(allModuleIds));
    setIsLessonCompleted(true);
    markLessonComplete(lessonSlug);

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            completedSections: allModuleIds,
            activeSection: sections[sections.length - 1]?.id,
            isCompleted: true,
          })
        );
      } catch {}
    }

    if (isAuthenticated) {
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
      }).catch((err) => console.warn("[useModuleProgress] DB complete error:", err));
    }
  }, [isAuthenticated, lessonSlug, sections, storageKey]);

  // 5. Compute sidebar step state
  const getStepState = useCallback(
    (index: number): "done" | "active" | "todo" => {
      const section = sections[index];
      if (!section) return "todo";

      if (section.id === activeSection) return "active";

      if (completedSections.has(section.id)) {
        return "done";
      }

      return "todo";
    },
    [activeSection, completedSections, sections]
  );

  const currentIndex = Math.max(
    0,
    sections.findIndex((s) => s.id === activeSection)
  );

  const completedSectionsCount = completedSections.size;

  const progressPercent =
    sections.length > 0
      ? Math.round((completedSections.size / sections.length) * 100)
      : 0;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      handleSectionChange(sections[currentIndex - 1].id);
    }
  }, [currentIndex, handleSectionChange, sections]);

  const handleNext = useCallback(() => {
    if (currentIndex < sections.length - 1) {
      handleSectionChange(sections[currentIndex + 1].id);
    } else {
      completeLesson();
    }
  }, [completeLesson, currentIndex, handleSectionChange, sections]);

  return {
    isAuthenticated,
    activeSection,
    completedSections,
    completedSectionsCount,
    isLessonCompleted,
    isLoaded,
    currentIndex,
    progressPercent,
    handleSectionChange,
    handlePrev,
    handleNext,
    markCurrentModuleComplete,
    completeLesson,
    getStepState,
  };
}
