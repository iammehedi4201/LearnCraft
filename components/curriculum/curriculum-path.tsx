"use client";

import React, { useCallback, useEffect, useState } from "react";
import type { Progress, ComputedLesson, CurriculumPathProps } from "./types";
import { getCurriculumState } from "./curriculum-state";
import { PrerequisitesCard } from "./prerequisites-card";
import { CompletedPhaseRow } from "./completed-phase-row";
import { CurrentStepCard } from "./current-step-card";
import { PhaseSection } from "./phase-section";
import { RoadmapToggle } from "./roadmap-toggle";
import { CapstoneCard, CourseCompleteRow } from "./capstone-card";

/**
 * CurriculumPath — Reusable, fully data-driven learning path component
 *
 * Implements progressive disclosure:
 * - Only the current phase is expanded.
 * - Finished phases collapse into slim green rows.
 * - Future phases stay hidden until previewed in the roadmap toggle.
 * - Zero hard-coded topic details; all counts, names, and labels come from data.
 */
export const CurriculumPath: React.FC<CurriculumPathProps> = ({
  course,
  progress: initialProgress,
  onProgressChange,
  onNavigate,
  onStartCapstone,
  className = "",
}) => {
  // Local progress state synced with props & localStorage for anonymous persistence
  const [internalProgress, setInternalProgress] = useState<Progress>(() => {
    if (typeof window !== "undefined" && course?.id) {
      try {
        const stored = localStorage.getItem(`learncraft_progress_${course.id}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          return {
            completedLessonIds: Array.from(
              new Set([
                ...(initialProgress?.completedLessonIds || []),
                ...(parsed?.completedLessonIds || []),
              ]),
            ),
            prereqConfirmed:
              Boolean(initialProgress?.prereqConfirmed) ||
              Boolean(parsed?.prereqConfirmed),
          };
        }
      } catch {
        // Fallback to prop
      }
    }
    return (
      initialProgress || {
        completedLessonIds: [],
        prereqConfirmed: false,
      }
    );
  });

  // Sync internal progress if parent prop changes
  useEffect(() => {
    if (initialProgress) {
      setInternalProgress((prev) => {
        const sameLength =
          prev.completedLessonIds.length ===
          initialProgress.completedLessonIds.length;
        const sameConfirmed =
          prev.prereqConfirmed === initialProgress.prereqConfirmed;
        if (sameLength && sameConfirmed) return prev;
        return initialProgress;
      });
    }
  }, [initialProgress]);

  // Persist update handler
  const updateProgress = useCallback(
    (updater: (prev: Progress) => Progress) => {
      setInternalProgress((prev) => {
        const next = updater(prev);
        if (typeof window !== "undefined" && course?.id) {
          try {
            localStorage.setItem(
              `learncraft_progress_${course.id}`,
              JSON.stringify(next),
            );
          } catch {
            // ignore localStorage errors
          }
        }
        if (onProgressChange) {
          onProgressChange(next);
        }
        return next;
      });
    },
    [course?.id, onProgressChange],
  );

  const handleConfirmPrereqs = useCallback(() => {
    updateProgress((prev) => ({
      ...prev,
      prereqConfirmed: true,
    }));
  }, [updateProgress]);

  const handleLessonSelect = useCallback(
    (lesson: ComputedLesson) => {
      if (onNavigate) {
        onNavigate(lesson.computedHref, lesson.id);
      } else if (typeof window !== "undefined" && lesson.computedHref) {
        window.location.href = lesson.computedHref;
      }
    },
    [onNavigate],
  );

  const handleStartCapstone = useCallback(() => {
    if (onStartCapstone) {
      onStartCapstone();
    } else if (course?.capstone?.href && typeof window !== "undefined") {
      window.location.href = course.capstone.href;
    }
  }, [onStartCapstone, course?.capstone?.href]);

  // Derive pure state from course and progress
  const curriculumState = getCurriculumState(course, internalProgress);

  const {
    currentPhase,
    currentLesson,
    completedPhases,
    remainingPhases,
    phases,
    currentStepChip,
    showPrerequisitesCard,
    showPrerequisitesConfirmed,
    hasRemainingPhases,
    isCapstoneUnlocked,
    showCourseCompleteRow,
    totalLessonsCount,
  } = curriculumState;

  return (
    <div
      className={`w-full max-w-[880px] mx-auto px-4 sm:px-0 space-y-[28px] text-[#ececf4] font-sans transition-all duration-200 motion-reduce:transition-none ${className}`}
      data-testid="curriculum-learning-path"
    >
      {/* =========================================================================
          BLOCK 1: PREREQUISITES CARD (or collapsed confirmed row)
         ========================================================================= */}
      {course?.prerequisites &&
        (showPrerequisitesCard || showPrerequisitesConfirmed) && (
          <PrerequisitesCard
            prerequisites={course.prerequisites}
            isConfirmed={internalProgress.prereqConfirmed}
            onConfirm={handleConfirmPrereqs}
            onNavigate={(href) => onNavigate?.(href)}
          />
        )}

      {/* =========================================================================
          BLOCK 2: COMPLETED PHASES (slim green rows, collapsed by default)
         ========================================================================= */}
      {completedPhases.length > 0 && (
        <div className="space-y-3" role="region" aria-label="Completed Phases">
          {completedPhases.map((phase) => (
            <CompletedPhaseRow
              key={phase.id}
              phase={phase}
              onLessonSelect={handleLessonSelect}
            />
          ))}
        </div>
      )}

      {/* =========================================================================
          BLOCK 3A: CURRENT STEP SPOTLIGHT CARD
         ========================================================================= */}
      {currentLesson && (
        <CurrentStepCard
          lesson={currentLesson}
          chipText={currentStepChip}
          onSelect={handleLessonSelect}
        />
      )}

      {/* =========================================================================
          BLOCK 3B: CURRENT PHASE SECTION (the only expanded phase)
         ========================================================================= */}
      {currentPhase && (
        <PhaseSection
          phase={currentPhase}
          phaseCount={phases.length}
          onLessonSelect={handleLessonSelect}
        />
      )}

      {/* =========================================================================
          BLOCK 4: ROADMAP PREVIEW TOGGLE (collapsed by default)
         ========================================================================= */}
      {hasRemainingPhases && (
        <RoadmapToggle remainingPhases={remainingPhases} />
      )}

      {/* =========================================================================
          BLOCK 5: CAPSTONE CARD OR COURSE COMPLETE ROW
         ========================================================================= */}
      {course?.capstone ? (
        <CapstoneCard
          capstone={course.capstone}
          phaseCount={phases.length}
          isUnlocked={isCapstoneUnlocked}
          onStartCapstone={handleStartCapstone}
        />
      ) : showCourseCompleteRow ? (
        <CourseCompleteRow
          totalLessons={totalLessonsCount}
          phaseCount={phases.length}
        />
      ) : null}
    </div>
  );
};
