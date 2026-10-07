"use client";

import { useState, useEffect, useCallback } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";
import { getPrismaCourse } from "./data/prisma-curriculum";
import {
  fetchProgressFromDB,
  getProgress,
} from "./data/progress-store";
import { CurriculumPath, getCurriculumState, type Progress } from "@/components/curriculum";

export default function PrismaPage() {
  const prismaCourse = getPrismaCourse();

  const [courseProgress, setCourseProgress] = useState<Progress>(() => {
    if (typeof window !== "undefined") {
      try {
        const p = getProgress();
        const prereqConfirmed =
          localStorage.getItem("learncraft_prisma_prereq_confirmed") === "true";
        return {
          completedLessonIds: p.completedLessons || [],
          prereqConfirmed,
        };
      } catch {
        // fallback
      }
    }
    return { completedLessonIds: [], prereqConfirmed: false };
  });

  const handleCurriculumProgressChange = useCallback(
    (newProgress: Progress) => {
      setCourseProgress(newProgress);
      if (typeof window !== "undefined") {
        try {
          if (newProgress.prereqConfirmed) {
            localStorage.setItem("learncraft_prisma_prereq_confirmed", "true");
          }
        } catch {
          // ignore
        }
      }
    },
    [],
  );

  // Sync state from database & custom events
  useEffect(() => {
    let isMounted = true;

    const updateLocalState = () => {
      if (!isMounted) return;
      const p = getProgress();
      const prereqConfirmed =
        typeof window !== "undefined" &&
        localStorage.getItem("learncraft_prisma_prereq_confirmed") === "true";
      setCourseProgress({
        completedLessonIds: p.completedLessons || [],
        prereqConfirmed,
      });
    };

    fetchProgressFromDB().then(() => {
      if (isMounted) {
        updateLocalState();
      }
    });

    updateLocalState();

    const handleProgressUpdated = () => {
      if (isMounted) {
        updateLocalState();
      }
    };

    window.addEventListener(
      "learncraft-prisma-progress-updated",
      handleProgressUpdated,
    );
    window.addEventListener(
      "learncraft-progress-updated",
      handleProgressUpdated,
    );
    return () => {
      isMounted = false;
      window.removeEventListener(
        "learncraft-prisma-progress-updated",
        handleProgressUpdated,
      );
      window.removeEventListener(
        "learncraft-progress-updated",
        handleProgressUpdated,
      );
    };
  }, []);

  // Compute metrics from curriculum state (authoritative single source of truth)
  const curriculumState = getCurriculumState(prismaCourse, courseProgress);
  const totalPhases = curriculumState.phases.length;
  const totalLessons = curriculumState.totalLessonsCount;
  const completedCount = curriculumState.completedLessonsCount;
  const completedPhasesCount = curriculumState.completedPhases.length;
  const progressPercent = curriculumState.progressPercent;

  const handleResetForDemo = () => {
    const emptyProgress: Progress = { completedLessonIds: [], prereqConfirmed: false };
    setCourseProgress(emptyProgress);
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("learncraft_prisma_prereq_confirmed");
        localStorage.removeItem(`learncraft_progress_${prismaCourse.id}`);
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (
            key &&
            (key.startsWith("learncraft_prisma_sections_") ||
              key === "learncraft_prisma_progress_v1")
          ) {
            localStorage.removeItem(key);
          }
        }
        localStorage.setItem(
          "learncraft_prisma_progress_v1",
          JSON.stringify({ completedLessons: [], lastVisitedLesson: "pri01-what-is-prisma" }),
        );
        window.dispatchEvent(new CustomEvent("learncraft-prisma-progress-updated"));
      } catch {
        // ignore
      }
    }
  };

  return (
    <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-200 overflow-x-hidden transition-colors duration-300">
      <Nav />

      <main className="flex-1 max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full space-y-[28px]">
        {/* =========================================================================
            1. COURSE HEADER (Matches TypeScript Curriculum Page Layout)
           ========================================================================= */}
        <header className="space-y-2">
          {completedCount === 0 ? (
            <>
              {/* Category Eyebrow */}
              <div className="text-xs font-mono tracking-[0.08em] uppercase text-[#a78bfa] font-semibold">
                PRISMA · NEXT-GENERATION ORM & DATA ACCESS
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#ececf4] tracking-tight">
                Learn Prisma
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg text-[#b4b4cc] font-normal leading-relaxed">
                Follow one step at a time. You only ever need to look at the highlighted step.
              </p>

              {/* Metrics */}
              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs sm:text-sm font-mono text-[#9a9ab5]">
                <span>{totalPhases} phases</span>
                <span>{totalLessons} lessons</span>
                <span>~13 hours</span>
                <span>{completedCount} of {totalLessons} completed</span>
              </div>
            </>
          ) : (
            <>
              {/* In Progress Header View */}
              <div className="flex items-baseline justify-between gap-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#ececf4] tracking-tight">
                  Learn Prisma
                </h1>
                <button
                  type="button"
                  onClick={handleResetForDemo}
                  className="text-xs font-mono text-[#a78bfa] hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Back to the first-visit view
                </button>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[#9a9ab5] pt-1">
                <span>{completedCount} of {totalLessons} lessons completed</span>
                <span>{completedPhasesCount} of {totalPhases} phases done</span>
              </div>

              {/* Progress bar */}
              <div
                className="w-full h-1.5 rounded-full bg-[#23233a] overflow-hidden mt-1.5"
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full bg-[#34d399] transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </>
          )}
        </header>

        {/* =========================================================================
            2. CURRICULUM LEARNING PATH (DATA-DRIVEN, PROGRESSIVE DISCLOSURE)
           ========================================================================= */}
        <section aria-label="Curriculum Learning Path">
          <CurriculumPath
            course={prismaCourse}
            progress={courseProgress}
            onProgressChange={handleCurriculumProgressChange}
          />
        </section>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
