import type {
  Course,
  Progress,
  CurriculumState,
  ComputedPhase,
  ComputedLesson,
  LessonStatus,
  PhaseStatus,
} from "./types";

/**
 * Pure progression engine for LearnCraft curriculums.
 * Single source of truth: progress.completedLessonIds
 *
 * Fully data-driven: derives all statuses, counts, percentages,
 * step chips, and block visibilities without any hardcoded topic logic.
 */
export function getCurriculumState(
  course: Course,
  progress: Progress,
): CurriculumState {
  const completedIds = Array.isArray(progress?.completedLessonIds)
    ? progress.completedLessonIds
    : [];
  const prereqConfirmed = Boolean(progress?.prereqConfirmed);

  // 1. Filter out phases with 0 lessons as required by edge case spec
  const validPhases = (course?.phases || []).filter(
    (p) => Array.isArray(p.lessons) && p.lessons.length > 0,
  );

  // 2. Flatten all valid lessons in chronological order
  const flattenedLessons: {
    lesson: (typeof validPhases)[0]["lessons"][0];
    phaseId: string;
    phaseIndex: number;
    lessonIndexInPhase: number;
  }[] = [];

  validPhases.forEach((phase, pIdx) => {
    phase.lessons.forEach((lesson, lIdx) => {
      flattenedLessons.push({
        lesson,
        phaseId: phase.id,
        phaseIndex: pIdx,
        lessonIndexInPhase: lIdx,
      });
    });
  });

  // 3. Helper to match a progressId with a lesson by id, code, or href slug (case-insensitively)
  const isLessonMatch = (
    lesson: (typeof validPhases)[0]["lessons"][0],
    progressId: string,
  ): boolean => {
    if (!progressId || typeof progressId !== "string") return false;
    const cleanProgressId = progressId.trim().toLowerCase();
    const cleanId = lesson.id?.trim().toLowerCase();
    if (cleanId && cleanId === cleanProgressId) return true;

    const cleanCode = lesson.code?.trim().toLowerCase();
    if (cleanCode && cleanCode === cleanProgressId) return true;

    if (lesson.href) {
      const slug = lesson.href.split("/").filter(Boolean).pop()?.toLowerCase();
      if (slug && slug === cleanProgressId) return true;
    }

    return false;
  };

  // Find set of canonical lesson.ids that are completed, ignoring any stale/unrecognized IDs
  const validCompletedSet = new Set<string>();
  flattenedLessons.forEach((item) => {
    if (completedIds.some((pId) => isLessonMatch(item.lesson, pId))) {
      validCompletedSet.add(item.lesson.id);
    }
  });

  const totalLessonsCount = flattenedLessons.length;
  const completedLessonsCount = validCompletedSet.size;
  const progressPercent =
    totalLessonsCount > 0
      ? Math.round((completedLessonsCount / totalLessonsCount) * 100)
      : 0;

  // 4. Determine current and next lessons
  // Lessons unlock strictly in order across the whole course:
  // Current = the first incomplete lesson.
  // Next = the lesson immediately after it.
  let currentFlattenedIdx = -1;
  let nextFlattenedIdx = -1;

  for (let i = 0; i < flattenedLessons.length; i++) {
    const lId = flattenedLessons[i].lesson.id;
    if (!validCompletedSet.has(lId)) {
      currentFlattenedIdx = i;
      if (i + 1 < flattenedLessons.length) {
        nextFlattenedIdx = i + 1;
      }
      break;
    }
  }

  const isCourseComplete =
    totalLessonsCount > 0 && currentFlattenedIdx === -1;

  // 5. Build Computed Phases & Lessons
  const computedPhases: ComputedPhase[] = validPhases.map((phase, pIdx) => {
    const phaseNumber = pIdx + 1;
    let doneSteps = 0;

    const computedLessons: ComputedLesson[] = phase.lessons.map(
      (lesson, lIdx) => {
        const stepNumber = lIdx + 1;
        const globalStepNumber =
          flattenedLessons.findIndex((item) => item.lesson.id === lesson.id) + 1;
        const isDone = validCompletedSet.has(lesson.id);

        if (isDone) {
          doneSteps++;
        }

        let status: LessonStatus = "locked";
        const globalIdx = globalStepNumber - 1;

        if (isDone) {
          status = "completed";
        } else if (globalIdx === currentFlattenedIdx) {
          status = "current";
        } else if (globalIdx === nextFlattenedIdx) {
          status = "next";
        } else {
          status = "locked";
        }

        const computedHref =
          lesson.href ||
          `/learn/${encodeURIComponent(course.id)}/${encodeURIComponent(lesson.id)}`;

        const computedLesson: ComputedLesson = {
          ...lesson,
          status,
          phaseId: phase.id,
          phaseNumber,
          stepNumber,
          globalStepNumber,
          computedHref,
        };

        return computedLesson;
      },
    );

    const totalSteps = phase.lessons.length;
    let phaseStatus: PhaseStatus = "locked";

    if (totalSteps > 0 && doneSteps === totalSteps) {
      phaseStatus = "completed";
    } else if (computedLessons.some((l) => l.status === "current")) {
      phaseStatus = "current";
    } else {
      phaseStatus = "locked";
    }

    return {
      ...phase,
      phaseNumber,
      status: phaseStatus,
      doneSteps,
      totalSteps,
      lessons: computedLessons,
    };
  });

  // Extract current and next lessons cleanly from computed phases
  const allComputedLessons = computedPhases.flatMap((p) => p.lessons);
  const currentComputedLesson =
    allComputedLessons.find((l) => l.status === "current") || null;
  const nextComputedLesson =
    allComputedLessons.find((l) => l.status === "next") || null;

  // Re-verify current phase reference
  const currentPhase =
    computedPhases.find((p) => p.status === "current") || null;
  const completedPhases = computedPhases.filter(
    (p) => p.status === "completed",
  );
  const remainingPhases = computedPhases.filter(
    (p) => p.status === "locked",
  );

  // 6. Dynamic Chip Wording for Current Step Hero / Row:
  // "START HERE · STEP {n} OF {total}" for brand-new user (0 completed lessons in course)
  // "PHASE {p} UNLOCKED · STEP 1 OF {total}" for first lesson of a phase user just reached
  // "YOUR NEXT STEP · STEP {n} OF {total}" while in progress
  let currentStepChip = "";
  if (currentComputedLesson && currentPhase) {
    const isBrandNew = completedLessonsCount === 0;
    const isFirstStepOfNewPhase =
      currentComputedLesson.stepNumber === 1 &&
      currentComputedLesson.phaseNumber > 1;

    if (isBrandNew) {
      currentStepChip = `START HERE · STEP ${currentComputedLesson.stepNumber} OF ${currentPhase.totalSteps}`;
    } else if (isFirstStepOfNewPhase) {
      currentStepChip = `PHASE ${currentComputedLesson.phaseNumber} UNLOCKED · STEP 1 OF ${currentPhase.totalSteps}`;
    } else {
      currentStepChip = `YOUR NEXT STEP · STEP ${currentComputedLesson.stepNumber} OF ${currentPhase.totalSteps}`;
    }
  }

  // 7. Visibilities
  // Prerequisites:
  // Show only if course.prerequisites exists AND user has zero progress
  // If prereqConfirmed === false: show card.
  // If prereqConfirmed === true: show collapsed confirmed row.
  // Once user completes >= 1 lesson: neither renders.
  const hasPrereqs = Boolean(
    course?.prerequisites?.items && course.prerequisites.items.length > 0,
  );
  const showPrerequisitesCard =
    hasPrereqs && completedLessonsCount === 0 && !prereqConfirmed;
  const showPrerequisitesConfirmed =
    hasPrereqs && completedLessonsCount === 0 && prereqConfirmed;

  // Roadmap toggle:
  // Render only if later phases exist (remainingPhases.length > 0)
  const hasRemainingPhases = remainingPhases.length > 0;

  // Capstone & Course Complete:
  const isCapstoneUnlocked = isCourseComplete && Boolean(course?.capstone);
  const showCourseCompleteRow = isCourseComplete && !course?.capstone;

  return {
    phases: computedPhases,
    currentPhase,
    currentLesson: currentComputedLesson,
    nextLesson: nextComputedLesson,
    completedPhases,
    remainingPhases,
    totalLessonsCount,
    completedLessonsCount,
    progressPercent,
    isCourseComplete,
    currentStepChip,
    showPrerequisitesCard,
    showPrerequisitesConfirmed,
    hasRemainingPhases,
    isCapstoneUnlocked,
    showCourseCompleteRow,
  };
}
