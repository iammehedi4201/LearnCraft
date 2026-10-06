import { getCurriculumState } from "../curriculum-state";
import { Course, Progress } from "../types";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
}

console.log("🚀 Running getCurriculumState unit tests...\n");

// =========================================================================
// TEST SUITE 1: 8-Phase Course with Prerequisites & Capstone (TypeScript-like)
// =========================================================================
console.log("Testing Course 1: Multi-phase course with prerequisites & capstone...");

const course8Phases: Course = {
  id: "typescript-mastery",
  title: "TypeScript Mastery",
  prerequisites: {
    items: [
      "Variables, functions, and arrays in JavaScript",
      "Objects, arrow functions, and destructuring",
      "Running a script with Node.js or browser console",
    ],
    refresherHref: "/learn/javascript",
  },
  capstone: {
    title: "Type-Safe In-Memory Query Engine",
    description: "Build a production-grade query and validation engine.",
    href: "/learn/typescript/capstone",
  },
  phases: [
    {
      id: "phase-1",
      name: "Fundamentals & Primitives",
      summary: "Static typing mental model and core primitive types",
      lessons: [
        { id: "ts-01", code: "TS-01", title: "Mental Model", minutes: 20, requires: "Only basic JavaScript" },
        { id: "ts-02", code: "TS-02", title: "Type Annotations", minutes: 20 },
        { id: "ts-03", code: "TS-03", title: "Arrays & Tuples", minutes: 25 },
        { id: "ts-04", code: "TS-04", title: "Object Types", minutes: 25 },
        { id: "ts-05", code: "TS-05", title: "Special Types", minutes: 40 },
      ],
    },
    {
      id: "phase-2",
      name: "Functions & Composition",
      summary: "Signatures, overloads, and functional patterns",
      lessons: [
        { id: "ts-06", code: "TS-06", title: "Function Types", minutes: 25, requires: "Phase 1" },
        { id: "ts-07", code: "TS-07", title: "Optional & Rest", minutes: 20 },
        { id: "ts-08", code: "TS-08", title: "Function Overloads", minutes: 25 },
        { id: "ts-09", code: "TS-09", title: "Callbacks", minutes: 30 },
      ],
    },
    {
      id: "phase-3",
      name: "Narrowing & Control Flow",
      summary: "Discriminated unions and guards",
      lessons: [
        { id: "ts-10", code: "TS-10", title: "Type Guards", minutes: 25 },
        { id: "ts-11", code: "TS-11", title: "Discriminated Unions", minutes: 30 },
      ],
    },
    {
      id: "phase-4",
      name: "Generics & Abstraction",
      summary: "Reusable type parameters and constraints",
      lessons: [
        { id: "ts-12", code: "TS-12", title: "Generic Functions", minutes: 30 },
      ],
    },
  ],
};

// 1.1: Brand-new user (zero progress, prereqs unconfirmed)
{
  const progress: Progress = { completedLessonIds: [], prereqConfirmed: false };
  const state = getCurriculumState(course8Phases, progress);

  assert(state.totalLessonsCount === 12, "Total lessons count should be 12");
  assert(state.completedLessonsCount === 0, "Completed count should be 0");
  assert(state.progressPercent === 0, "Progress percent should be 0");
  assert(state.showPrerequisitesCard === true, "Prerequisites card should show on first visit");
  assert(state.showPrerequisitesConfirmed === false, "Prerequisites confirmed row should not show yet");
  assert(state.currentPhase?.id === "phase-1", "Current phase should be Phase 1");
  assert(state.currentPhase?.status === "current", "Phase 1 status should be 'current'");
  assert(state.currentLesson?.id === "ts-01", "Current lesson should be ts-01");
  assert(state.currentLesson?.status === "current", "ts-01 status should be 'current'");
  assert(state.nextLesson?.id === "ts-02", "Next lesson should be ts-02");
  assert(state.nextLesson?.status === "next", "ts-02 status should be 'next'");
  assert(state.phases[0].lessons[2].status === "locked", "ts-03 status should be 'locked'");
  assert(state.currentStepChip === "START HERE · STEP 1 OF 5", `Chip should be 'START HERE · STEP 1 OF 5', got '${state.currentStepChip}'`);
  assert(state.hasRemainingPhases === true, "Should have remaining phases in roadmap");
  assert(state.remainingPhases.length === 3, `Remaining phases should be 3, got ${state.remainingPhases.length}`);
  assert(state.isCapstoneUnlocked === false, "Capstone should be locked");
  console.log("  ✓ 1.1 Brand-new user initial visit passed");
}

// 1.2: Prereqs confirmed by user, still 0 completed lessons
{
  const progress: Progress = { completedLessonIds: [], prereqConfirmed: true };
  const state = getCurriculumState(course8Phases, progress);

  assert(state.showPrerequisitesCard === false, "Full card should be hidden once confirmed");
  assert(state.showPrerequisitesConfirmed === true, "Collapsed green confirmed row should show");
  assert(state.currentStepChip === "START HERE · STEP 1 OF 5", "Current chip should still be 'START HERE · STEP 1 OF 5'");
  console.log("  ✓ 1.2 Prerequisites confirmed state passed");
}

// 1.3: User in progress within Phase 1 (completed lesson 1 and 2)
{
  const progress: Progress = { completedLessonIds: ["ts-01", "ts-02"], prereqConfirmed: true };
  const state = getCurriculumState(course8Phases, progress);

  assert(state.completedLessonsCount === 2, "Completed lessons should be 2");
  assert(state.showPrerequisitesCard === false, "Prereq card should not show once progress > 0");
  assert(state.showPrerequisitesConfirmed === false, "Prereq confirmed row should not show once progress > 0");
  assert(state.currentPhase?.id === "phase-1", "Current phase should still be Phase 1");
  assert(state.currentLesson?.id === "ts-03", "Current lesson should be ts-03");
  assert(state.nextLesson?.id === "ts-04", "Next lesson should be ts-04");
  assert(state.phases[0].lessons[0].status === "completed", "ts-01 should be completed");
  assert(state.phases[0].lessons[1].status === "completed", "ts-02 should be completed");
  assert(state.phases[0].lessons[2].status === "current", "ts-03 should be current");
  assert(state.phases[0].lessons[3].status === "next", "ts-04 should be next");
  assert(state.phases[0].lessons[4].status === "locked", "ts-05 should be locked");
  assert(state.currentStepChip === "YOUR NEXT STEP · STEP 3 OF 5", `Chip should be 'YOUR NEXT STEP · STEP 3 OF 5', got '${state.currentStepChip}'`);
  console.log("  ✓ 1.3 Mid-phase progress passed");
}

// 1.4: Finished Phase 1 (Transition to Phase 2!)
{
  const progress: Progress = {
    completedLessonIds: ["ts-01", "ts-02", "ts-03", "ts-04", "ts-05"],
    prereqConfirmed: true,
  };
  const state = getCurriculumState(course8Phases, progress);

  assert(state.completedPhases.length === 1, "Completed phases should have 1 item");
  assert(state.completedPhases[0].id === "phase-1", "Completed phase should be Phase 1");
  assert(state.completedPhases[0].status === "completed", "Phase 1 status should be 'completed'");
  assert(state.currentPhase?.id === "phase-2", "Current phase should now be Phase 2");
  assert(state.currentPhase?.status === "current", "Phase 2 status should be 'current'");
  assert(state.currentPhase?.doneSteps === 0, "Phase 2 done steps should be 0");
  assert(state.currentPhase?.totalSteps === 4, "Phase 2 total steps should be 4");
  assert(state.currentLesson?.id === "ts-06", "Current lesson should be ts-06 (Step 1 of Phase 2)");
  assert(state.nextLesson?.id === "ts-07", "Next lesson should be ts-07");
  assert(state.currentStepChip === "PHASE 2 UNLOCKED · STEP 1 OF 4", `Chip should be 'PHASE 2 UNLOCKED · STEP 1 OF 4', got '${state.currentStepChip}'`);
  assert(state.remainingPhases.length === 2, `Remaining phases should drop Phase 2 and have 2 items, got ${state.remainingPhases.length}`);
  assert(state.remainingPhases[0].id === "phase-3", "First remaining phase should be Phase 3");
  assert(state.remainingPhases[1].id === "phase-4", "Second remaining phase should be Phase 4");
  assert(state.showPrerequisitesCard === false, "Prereq card must not render");
  console.log("  ✓ 1.4 Phase 1 completion and Phase 2 unlock transition passed");
}

// 1.5: All phases completed -> Final Capstone Unlocked
{
  const progress: Progress = {
    completedLessonIds: [
      "ts-01", "ts-02", "ts-03", "ts-04", "ts-05",
      "ts-06", "ts-07", "ts-08", "ts-09",
      "ts-10", "ts-11",
      "ts-12"
    ],
    prereqConfirmed: true,
  };
  const state = getCurriculumState(course8Phases, progress);

  assert(state.isCourseComplete === true, "Course should be marked complete");
  assert(state.completedPhases.length === 4, "All 4 phases should be completed");
  assert(state.currentPhase === null, "Current phase should be null when complete");
  assert(state.currentLesson === null, "Current lesson should be null when complete");
  assert(state.remainingPhases.length === 0, "No remaining phases in roadmap");
  assert(state.hasRemainingPhases === false, "Roadmap should not show when all phases done");
  assert(state.isCapstoneUnlocked === true, "Capstone should be unlocked!");
  assert(state.showCourseCompleteRow === false, "Course complete row should not show since capstone exists");
  console.log("  ✓ 1.5 Full course completion & capstone unlock passed");
}

// =========================================================================
// TEST SUITE 2: Single-Phase Course (1 Phase, 1 Lesson, No Prereqs, No Capstone)
// =========================================================================
console.log("\nTesting Course 2: Single-phase course with 1 lesson, no prereqs, no capstone...");

const singlePhaseCourse: Course = {
  id: "mini-course",
  title: "Micro Introduction",
  phases: [
    {
      id: "phase-quick",
      name: "Quick Start",
      lessons: [
        { id: "mini-01", title: "Single Lesson Overview", minutes: 5 },
      ],
    },
  ],
};

{
  // Initial state
  const stateInitial = getCurriculumState(singlePhaseCourse, { completedLessonIds: [], prereqConfirmed: false });
  assert(stateInitial.totalLessonsCount === 1, "Total count should be 1");
  assert(stateInitial.hasRemainingPhases === false, "Single phase course must NEVER have roadmap toggle");
  assert(stateInitial.showPrerequisitesCard === false, "No prerequisites card");
  assert(stateInitial.currentStepChip === "START HERE · STEP 1 OF 1", "Chip should be 'START HERE · STEP 1 OF 1'");
  assert(stateInitial.currentLesson?.id === "mini-01", "Current lesson should be mini-01");
  assert(stateInitial.nextLesson === null, "No next lesson in 1-lesson course");

  // Completed state
  const stateDone = getCurriculumState(singlePhaseCourse, { completedLessonIds: ["mini-01"], prereqConfirmed: false });
  assert(stateDone.isCourseComplete === true, "Course should be complete");
  assert(stateDone.isCapstoneUnlocked === false, "No capstone exists");
  assert(stateDone.showCourseCompleteRow === true, "Should show green 'Course complete' row");
  assert(stateDone.completedPhases.length === 1, "Completed phases should be 1");
  console.log("  ✓ 2.1 Single phase edge case passed");
}

// =========================================================================
// TEST SUITE 3: 3-Phase Course (Unknown IDs, Empty Phase skipped, no prereqs, with capstone)
// =========================================================================
console.log("\nTesting Course 3: Edge cases (empty phases, stale progress IDs, capstone)...");

const courseWithEdgeCases: Course = {
  id: "nextjs-advanced",
  title: "Next.js Advanced Routing",
  capstone: {
    title: "Production LMS Platform",
    description: "Build a production App Router LMS.",
  },
  phases: [
    {
      id: "nx-phase-empty",
      name: "Empty Setup Phase",
      lessons: [], // Empty phase - MUST BE SKIPPED
    },
    {
      id: "nx-phase-1",
      name: "App Router Foundations",
      lessons: [
        { id: "nx-01", title: "Server Components" },
        { id: "nx-02", title: "Client Boundaries" },
      ],
    },
    {
      id: "nx-phase-2",
      name: "Data Fetching & Cache",
      lessons: [
        { id: "nx-03", title: "fetch() Cache Invalidation" },
      ],
    },
  ],
};

{
  // Progress contains stale/removed lesson ID "old-removed-id-99"
  const progress: Progress = {
    completedLessonIds: ["old-removed-id-99", "nx-01"],
    prereqConfirmed: false,
  };
  const state = getCurriculumState(courseWithEdgeCases, progress);

  assert(state.phases.length === 2, `Empty phase must be omitted, got ${state.phases.length} phases`);
  assert(state.phases[0].phaseNumber === 1, "First non-empty phase should be Phase 1");
  assert(state.phases[1].phaseNumber === 2, "Second non-empty phase should be Phase 2");
  assert(state.totalLessonsCount === 3, "Total valid lessons should be 3");
  assert(state.completedLessonsCount === 1, "Stale ID must be ignored, completed count should be 1");
  assert(state.progressPercent === 33, `Percent should be 33, got ${state.progressPercent}`);
  assert(state.currentLesson?.id === "nx-02", "Current lesson should be nx-02");
  assert(state.nextLesson?.id === "nx-03", "Next lesson should be nx-03 in next phase");
  assert(state.remainingPhases.length === 1, "Phase 2 should be in remaining phases");
  assert(state.remainingPhases[0].id === "nx-phase-2", "Remaining phase is Phase 2");

  console.log("  ✓ 3.1 Edge cases (empty phases, stale progress IDs) passed");
}

console.log("\n🎉 ALL UNIT TESTS PASSED SUCCESSFULLY!\n");
