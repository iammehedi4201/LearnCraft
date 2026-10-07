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

{
  // Test 3.2: Flexible matching by lesson code and href slug
  const courseWithSlugsAndCodes: Course = {
    id: "typescript-test",
    title: "TypeScript Flexible Match",
    phases: [
      {
        id: "p1",
        name: "Phase 1",
        lessons: [
          {
            id: "ts01-mental-model",
            code: "TS-01",
            title: "Mental Model",
            href: "/learn/typescript/ts01-mental-model",
          },
          {
            id: "ts02-type-annotations",
            code: "TS-02",
            title: "Type Annotations",
            href: "/learn/typescript/ts02-type-annotations",
          },
        ],
      },
    ],
  };

  // Progress has code "ts-01" (lowercase of TS-01) and slug for second lesson
  const progressMatchByCodeAndSlug: Progress = {
    completedLessonIds: ["ts-01", "ts02-type-annotations"],
    prereqConfirmed: false,
  };
  const state = getCurriculumState(courseWithSlugsAndCodes, progressMatchByCodeAndSlug);

  assert(state.completedLessonsCount === 2, `Both lessons should be matched, got ${state.completedLessonsCount}`);
  assert(state.phases[0].status === "completed", "Phase 1 should be completed");
  assert(state.phases[0].lessons[0].status === "completed", "Lesson 1 should be completed");
  assert(state.phases[0].lessons[1].status === "completed", "Lesson 2 should be completed");
  console.log("  ✓ 3.2 Flexible matching by code, slug, and case-insensitivity passed");
}

// =========================================================================
// TEST SUITE 4: Authoritative TypeScript Curriculum Progression
// =========================================================================
console.log("\nTesting Course 4: Authoritative TypeScript Curriculum Dynamic States...");

import { getTypeScriptCourse, getAllLessons } from "../../../app/learn/typescript/data/typescript-curriculum";

const tsCourse = getTypeScriptCourse();

// 4.1: Brand-new user (0 lessons completed)
{
  const state = getCurriculumState(tsCourse, { completedLessonIds: [], prereqConfirmed: false });
  assert(state.totalLessonsCount === 32, `Total lessons should be 32, got ${state.totalLessonsCount}`);
  assert(state.completedLessonsCount === 0, `Completed count should be 0, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.phases[0].doneSteps === 0, `Phase 1 done steps should be 0, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "current", "Lesson 1 should be current");
  assert(state.currentStepChip === "START HERE · STEP 1 OF 5", `Chip should be 'START HERE · STEP 1 OF 5', got '${state.currentStepChip}'`);
  console.log("  ✓ 4.1 Authoritative TypeScript initial state verified");
}

// 4.2: User completes Lesson 1 by slug
{
  const state = getCurriculumState(tsCourse, { completedLessonIds: ["ts01-mental-model"], prereqConfirmed: true });
  assert(state.completedLessonsCount === 1, `Completed count should be 1, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.phases[0].doneSteps === 1, `Phase 1 done steps should be 1, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "completed", "Lesson 1 should be completed");
  assert(state.phases[0].lessons[1].status === "current", "Lesson 2 should be current");
  assert(state.phases[0].lessons[2].status === "next", "Lesson 3 should be next");
  assert(state.currentStepChip === "YOUR NEXT STEP · STEP 2 OF 5", `Chip should be 'YOUR NEXT STEP · STEP 2 OF 5', got '${state.currentStepChip}'`);
  console.log("  ✓ 4.2 Authoritative TypeScript single lesson completion verified");
}

// 4.3: User completes all 5 lessons of Phase 1 (resolves user's screenshot scenario)
{
  const phase1Slugs = [
    "ts01-mental-model",
    "ts02-primitives-inference",
    "ts03-arrays-tuples",
    "ts04-object-types",
    "ts05-special-types",
  ];
  const state = getCurriculumState(tsCourse, { completedLessonIds: phase1Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 5, `Completed count should be 5, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 1, `Completed phases should be 1, got ${state.completedPhases.length}`);
  assert(state.phases[0].status === "completed", "Phase 1 should be completed");
  assert(state.phases[0].doneSteps === 5, "Phase 1 done steps should be 5");
  assert(state.phases[1].status === "current", "Phase 2 should be unlocked and current");
  assert(state.currentLesson?.code === "TS-06", `Current lesson should be TS-06, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "PHASE 2 UNLOCKED · STEP 1 OF 4", `Chip should be 'PHASE 2 UNLOCKED · STEP 1 OF 4', got '${state.currentStepChip}'`);
  console.log("  ✓ 4.3 Authoritative TypeScript Phase 1 full completion & Phase 2 unlock verified");
}

// 4.4: User completes all 9 phases (all 32 lessons) -> Capstone unlocks!
{
  const all32Slugs = getAllLessons().map((l) => l.slug);

  const state = getCurriculumState(tsCourse, { completedLessonIds: all32Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 32, `Completed count should be 32, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 9, `All 9 phases should be completed, got ${state.completedPhases.length}`);
  assert(state.remainingPhases.length === 0, `Remaining phases should be 0, got ${state.remainingPhases.length}`);
  assert(state.progressPercent === 100, `Progress should be 100%, got ${state.progressPercent}%`);
  assert(state.isCourseComplete === true, "Course should be marked complete");
  assert(state.isCapstoneUnlocked === true, "Capstone project MUST be unlocked after finishing all 9 phases");
  console.log("  ✓ 4.4 All 9 phases finished -> Capstone successfully unlocked verified!");
}

// =========================================================================
// TEST SUITE 5: Authoritative JavaScript Curriculum Progression
// =========================================================================
console.log("\nTesting Course 5: Authoritative JavaScript Curriculum Dynamic States...");

import { getJavaScriptCourse, getAllLessons as getAllJSLessons } from "../../../app/learn/javascript/data/javascript-curriculum";

const jsCourse = getJavaScriptCourse();

// 5.1: Brand-new user (0 lessons completed)
{
  const state = getCurriculumState(jsCourse, { completedLessonIds: [], prereqConfirmed: false });
  assert(state.totalLessonsCount === 30, `Total lessons should be 30, got ${state.totalLessonsCount}`);
  assert(state.phases.length === 8, `Total phases should be 8, got ${state.phases.length}`);
  assert(state.completedLessonsCount === 0, `Completed count should be 0, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.phases[0].doneSteps === 0, `Phase 1 done steps should be 0, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "current", "Lesson 1 should be current");
  assert(state.currentLesson?.code === "JS-01", `Current lesson code should be JS-01, got ${state.currentLesson?.code}`);
  assert(state.showPrerequisitesCard === true, "Prereq card should show on first visit");
  assert(state.currentStepChip === "START HERE · STEP 1 OF 5", `Chip should be 'START HERE · STEP 1 OF 5', got '${state.currentStepChip}'`);
  console.log("  ✓ 5.1 Authoritative JavaScript initial state verified");
}

// 5.2: User completes single lesson by slug
{
  const state = getCurriculumState(jsCourse, { completedLessonIds: ["js01-how-javascript-runs"], prereqConfirmed: true });
  assert(state.completedLessonsCount === 1, `Completed count should be 1, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.showPrerequisitesCard === false, "Prereq card should hide when progress > 0");
  assert(state.phases[0].doneSteps === 1, `Phase 1 done steps should be 1, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "completed", "Lesson 1 should be completed");
  assert(state.phases[0].lessons[1].status === "current", "Lesson 2 should be current");
  assert(state.currentLesson?.code === "JS-02", `Current lesson should be JS-02, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "YOUR NEXT STEP · STEP 2 OF 5", `Chip should be 'YOUR NEXT STEP · STEP 2 OF 5', got '${state.currentStepChip}'`);
  console.log("  ✓ 5.2 Authoritative JavaScript single lesson completion verified");
}

// 5.3: User completes Phase 1 (5 lessons) -> Phase 2 unlocks
{
  const phase1Slugs = [
    "js01-how-javascript-runs",
    "js02-variables-and-data-types",
    "js03-operators-and-equality",
    "js04-conditional-logic",
    "js05-loops-and-iteration",
  ];
  const state = getCurriculumState(jsCourse, { completedLessonIds: phase1Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 5, `Completed count should be 5, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 1, `Completed phases should be 1, got ${state.completedPhases.length}`);
  assert(state.phases[0].status === "completed", "Phase 1 should be completed");
  assert(state.phases[1].status === "current", "Phase 2 should be current");
  assert(state.currentLesson?.code === "JS-06", `Current lesson should be JS-06, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "PHASE 2 UNLOCKED · STEP 1 OF 4", `Chip should be 'PHASE 2 UNLOCKED · STEP 1 OF 4', got '${state.currentStepChip}'`);
  console.log("  ✓ 5.3 Authoritative JavaScript Phase 1 completion and Phase 2 unlock verified");
}

// 5.4: User completes all 8 phases (all 30 lessons) -> Capstone unlocks!
{
  const all30Slugs = getAllJSLessons().map((l) => l.slug);
  assert(all30Slugs.length === 30, `Expected 30 JS lesson slugs, got ${all30Slugs.length}`);

  const state = getCurriculumState(jsCourse, { completedLessonIds: all30Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 30, `Completed count should be 30, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 8, `All 8 phases should be completed, got ${state.completedPhases.length}`);
  assert(state.remainingPhases.length === 0, `Remaining phases should be 0, got ${state.remainingPhases.length}`);
  assert(state.progressPercent === 100, `Progress should be 100%, got ${state.progressPercent}%`);
  assert(state.isCourseComplete === true, "Course should be marked complete");
  assert(state.isCapstoneUnlocked === true, "Capstone project MUST be unlocked after finishing all 8 phases");
  console.log("  ✓ 5.4 All 8 phases finished -> JavaScript Capstone successfully unlocked verified!");
}

// =========================================================================
// TEST SUITE 6: Authoritative OOP Curriculum Progression
// =========================================================================
console.log("\nTesting Course 6: Authoritative OOP Curriculum Dynamic States...");

import { getOOPCourse, getAllLessons as getAllOOPLessons } from "../../../app/learn/oop/data/oop-curriculum";

const oopCourse = getOOPCourse();

// 6.1: Brand-new user (0 lessons completed)
{
  const state = getCurriculumState(oopCourse, { completedLessonIds: [], prereqConfirmed: false });
  assert(state.totalLessonsCount === 16, `Total lessons should be 16, got ${state.totalLessonsCount}`);
  assert(state.phases.length === 4, `Total phases should be 4, got ${state.phases.length}`);
  assert(state.completedLessonsCount === 0, `Completed count should be 0, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.phases[0].doneSteps === 0, `Phase 1 done steps should be 0, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "current", "Lesson 1 should be current");
  assert(state.currentLesson?.code === "OOP-01", `Current lesson code should be OOP-01, got ${state.currentLesson?.code}`);
  assert(state.showPrerequisitesCard === true, "Prereq card should show on first visit");
  assert(state.currentStepChip === "START HERE · STEP 1 OF 5", `Chip should be 'START HERE · STEP 1 OF 5', got '${state.currentStepChip}'`);
  console.log("  ✓ 6.1 Authoritative OOP initial state verified");
}

// 6.2: User completes single lesson by slug
{
  const state = getCurriculumState(oopCourse, { completedLessonIds: ["oop01-why-oop"], prereqConfirmed: true });
  assert(state.completedLessonsCount === 1, `Completed count should be 1, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.showPrerequisitesCard === false, "Prereq card should hide when progress > 0");
  assert(state.phases[0].doneSteps === 1, `Phase 1 done steps should be 1, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "completed", "Lesson 1 should be completed");
  assert(state.phases[0].lessons[1].status === "current", "Lesson 2 should be current");
  assert(state.currentLesson?.code === "OOP-02", `Current lesson should be OOP-02, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "YOUR NEXT STEP · STEP 2 OF 5", `Chip should be 'YOUR NEXT STEP · STEP 2 OF 5', got '${state.currentStepChip}'`);
  console.log("  ✓ 6.2 Authoritative OOP single lesson completion verified");
}

// 6.3: User completes Phase 1 (5 lessons) -> Phase 2 unlocks
{
  const phase1Slugs = [
    "oop01-why-oop",
    "oop02-encapsulation",
    "oop03-abstraction",
    "oop04-inheritance",
    "oop05-polymorphism",
  ];
  const state = getCurriculumState(oopCourse, { completedLessonIds: phase1Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 5, `Completed count should be 5, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 1, `Completed phases should be 1, got ${state.completedPhases.length}`);
  assert(state.phases[0].status === "completed", "Phase 1 should be completed");
  assert(state.phases[1].status === "current", "Phase 2 should be current");
  assert(state.currentLesson?.code === "OOP-06", `Current lesson should be OOP-06, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "PHASE 2 UNLOCKED · STEP 1 OF 3", `Chip should be 'PHASE 2 UNLOCKED · STEP 1 OF 3', got '${state.currentStepChip}'`);
  console.log("  ✓ 6.3 Authoritative OOP Phase 1 completion and Phase 2 unlock verified");
}

// 6.4: User completes all 4 phases (all 16 lessons) -> Capstone unlocks!
{
  const all16Slugs = getAllOOPLessons().map((l) => l.slug);
  assert(all16Slugs.length === 16, `Expected 16 OOP lesson slugs, got ${all16Slugs.length}`);

  const state = getCurriculumState(oopCourse, { completedLessonIds: all16Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 16, `Completed count should be 16, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 4, `All 4 phases should be completed, got ${state.completedPhases.length}`);
  assert(state.remainingPhases.length === 0, `Remaining phases should be 0, got ${state.remainingPhases.length}`);
  assert(state.progressPercent === 100, `Progress should be 100%, got ${state.progressPercent}%`);
  assert(state.isCourseComplete === true, "Course should be marked complete");
  assert(state.isCapstoneUnlocked === true, "Capstone project MUST be unlocked after finishing all 4 phases");
  console.log("  ✓ 6.4 All 4 phases finished -> OOP Capstone successfully unlocked verified!");
}

// =========================================================================
// TEST SUITE 7: Authoritative Next.js Curriculum Progression
// =========================================================================
console.log("\nTesting Course 7: Authoritative Next.js Curriculum Dynamic States...");

import { getNextjsCourse, getAllNextjsLessons } from "../../../app/learn/nextjs/data/nextjs-curriculum";

const nextjsCourse = getNextjsCourse();

// 7.1: Brand-new user (0 lessons completed)
{
  const state = getCurriculumState(nextjsCourse, { completedLessonIds: [], prereqConfirmed: false });
  assert(state.totalLessonsCount === 22, `Total lessons should be 22, got ${state.totalLessonsCount}`);
  assert(state.phases.length === 5, `Total phases should be 5, got ${state.phases.length}`);
  assert(state.completedLessonsCount === 0, `Completed count should be 0, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.phases[0].doneSteps === 0, `Phase 1 done steps should be 0, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "current", "Lesson 1 should be current");
  assert(state.currentLesson?.code === "NX-01", `Current lesson code should be NX-01, got ${state.currentLesson?.code}`);
  assert(state.showPrerequisitesCard === true, "Prereq card should show on first visit");
  assert(state.currentStepChip === "START HERE · STEP 1 OF 5", `Chip should be 'START HERE · STEP 1 OF 5', got '${state.currentStepChip}'`);
  console.log("  ✓ 7.1 Authoritative Next.js initial state verified");
}

// 7.2: User completes single lesson by slug
{
  const state = getCurriculumState(nextjsCourse, { completedLessonIds: ["nx01-app-router"], prereqConfirmed: true });
  assert(state.completedLessonsCount === 1, `Completed count should be 1, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.showPrerequisitesCard === false, "Prereq card should hide when progress > 0");
  assert(state.phases[0].doneSteps === 1, `Phase 1 done steps should be 1, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "completed", "Lesson 1 should be completed");
  assert(state.phases[0].lessons[1].status === "current", "Lesson 2 should be current");
  assert(state.currentLesson?.code === "NX-02", `Current lesson should be NX-02, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "YOUR NEXT STEP · STEP 2 OF 5", `Chip should be 'YOUR NEXT STEP · STEP 2 OF 5', got '${state.currentStepChip}'`);
  console.log("  ✓ 7.2 Authoritative Next.js single lesson completion verified");
}

// 7.3: User completes Phase 1 (5 lessons) -> Phase 2 unlocks
{
  const phase1Slugs = [
    "nx01-app-router",
    "nx02-navigation",
    "nx03-layouts",
    "nx04-dynamic-routes",
    "nx05-images-fonts",
  ];
  const state = getCurriculumState(nextjsCourse, { completedLessonIds: phase1Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 5, `Completed count should be 5, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 1, `Completed phases should be 1, got ${state.completedPhases.length}`);
  assert(state.phases[0].status === "completed", "Phase 1 should be completed");
  assert(state.phases[1].status === "current", "Phase 2 should be current");
  assert(state.currentLesson?.code === "NX-06", `Current lesson should be NX-06, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "PHASE 2 UNLOCKED · STEP 1 OF 4", `Chip should be 'PHASE 2 UNLOCKED · STEP 1 OF 4', got '${state.currentStepChip}'`);
  console.log("  ✓ 7.3 Authoritative Next.js Phase 1 completion and Phase 2 unlock verified");
}

// 7.4: User completes all 5 phases (all 22 lessons) -> Capstone unlocks!
{
  const all22Slugs = getAllNextjsLessons().map((l) => l.slug);
  assert(all22Slugs.length === 22, `Expected 22 Next.js lesson slugs, got ${all22Slugs.length}`);

  const state = getCurriculumState(nextjsCourse, { completedLessonIds: all22Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 22, `Completed count should be 22, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 5, `All 5 phases should be completed, got ${state.completedPhases.length}`);
  assert(state.remainingPhases.length === 0, `Remaining phases should be 0, got ${state.remainingPhases.length}`);
  assert(state.progressPercent === 100, `Progress should be 100%, got ${state.progressPercent}%`);
  assert(state.isCourseComplete === true, "Course should be marked complete");
  assert(state.isCapstoneUnlocked === true, "Capstone project MUST be unlocked after finishing all 5 phases");
  console.log("  ✓ 7.4 All 5 phases finished -> Next.js Capstone successfully unlocked verified!");
}

// =========================================================================
// TEST SUITE 8: Authoritative React.js Curriculum Progression
// =========================================================================
console.log("\nTesting Course 8: Authoritative React.js Curriculum Dynamic States...");

import { getReactCourse, getAllLessons as getAllReactLessons } from "../../../app/learn/react/data/react-curriculum";

const reactCourse = getReactCourse();

// 8.1: Brand-new user (0 lessons completed)
{
  const state = getCurriculumState(reactCourse, { completedLessonIds: [], prereqConfirmed: false });
  assert(state.totalLessonsCount === 27, `Total lessons should be 27, got ${state.totalLessonsCount}`);
  assert(state.phases.length === 9, `Total phases should be 9, got ${state.phases.length}`);
  assert(state.completedLessonsCount === 0, `Completed count should be 0, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.phases[0].doneSteps === 0, `Phase 1 done steps should be 0, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "current", "Lesson 1 should be current");
  assert(state.currentLesson?.code === "REACT-01", `Current lesson code should be REACT-01, got ${state.currentLesson?.code}`);
  assert(state.showPrerequisitesCard === true, "Prereq card should show on first visit");
  assert(state.currentStepChip === "START HERE · STEP 1 OF 3", `Chip should be 'START HERE · STEP 1 OF 3', got '${state.currentStepChip}'`);
  console.log("  ✓ 8.1 Authoritative React.js initial state verified");
}

// 8.2: User completes single lesson by slug
{
  const state = getCurriculumState(reactCourse, { completedLessonIds: ["react01-what-is-react"], prereqConfirmed: true });
  assert(state.completedLessonsCount === 1, `Completed count should be 1, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.showPrerequisitesCard === false, "Prereq card should hide when progress > 0");
  assert(state.phases[0].doneSteps === 1, `Phase 1 done steps should be 1, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "completed", "Lesson 1 should be completed");
  assert(state.phases[0].lessons[1].status === "current", "Lesson 2 should be current");
  assert(state.currentLesson?.code === "REACT-02", `Current lesson should be REACT-02, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "YOUR NEXT STEP · STEP 2 OF 3", `Chip should be 'YOUR NEXT STEP · STEP 2 OF 3', got '${state.currentStepChip}'`);
  console.log("  ✓ 8.2 Authoritative React.js single lesson completion verified");
}

// 8.3: User completes Phase 1 (3 lessons) -> Phase 2 unlocks
{
  const phase1Slugs = [
    "react01-what-is-react",
    "react02-jsx-and-elements",
    "react03-components-and-composition",
  ];
  const state = getCurriculumState(reactCourse, { completedLessonIds: phase1Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 3, `Completed count should be 3, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 1, `Completed phases should be 1, got ${state.completedPhases.length}`);
  assert(state.phases[0].status === "completed", "Phase 1 should be completed");
  assert(state.phases[1].status === "current", "Phase 2 should be current");
  assert(state.currentLesson?.code === "REACT-04", `Current lesson should be REACT-04, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "PHASE 2 UNLOCKED · STEP 1 OF 3", `Chip should be 'PHASE 2 UNLOCKED · STEP 1 OF 3', got '${state.currentStepChip}'`);
  console.log("  ✓ 8.3 Authoritative React.js Phase 1 completion and Phase 2 unlock verified");
}

// 8.4: User completes all 9 phases (all 27 lessons) -> Capstone unlocks!
{
  const all27Slugs = getAllReactLessons().map((l) => l.slug);
  assert(all27Slugs.length === 27, `Expected 27 React lesson slugs, got ${all27Slugs.length}`);

  const state = getCurriculumState(reactCourse, { completedLessonIds: all27Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 27, `Completed count should be 27, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 9, `All 9 phases should be completed, got ${state.completedPhases.length}`);
  assert(state.remainingPhases.length === 0, `Remaining phases should be 0, got ${state.remainingPhases.length}`);
  assert(state.progressPercent === 100, `Progress should be 100%, got ${state.progressPercent}%`);
  assert(state.isCourseComplete === true, "Course should be marked complete");
  assert(state.isCapstoneUnlocked === true, "Capstone project MUST be unlocked after finishing all 9 phases");
  console.log("  ✓ 8.4 All 9 phases finished -> React.js Capstone successfully unlocked verified!");
}

// =========================================================================
// TEST SUITE 9: Authoritative NestJS Curriculum Progression
// =========================================================================
console.log("\nTesting Course 9: Authoritative NestJS Curriculum Dynamic States...");

import { getNestjsCourse, getCourseLessons as getCourseNestjsLessons } from "../../../app/learn/nestjs/data/nestjs-curriculum";

const nestjsCourse = getNestjsCourse();

// 9.1: Brand-new user (0 lessons completed) -> Starts immediately on NJ-05 (Project Setup & Scaffolding)
{
  const state = getCurriculumState(nestjsCourse, { completedLessonIds: [], prereqConfirmed: false });
  assert(state.totalLessonsCount === 28, `Total lessons should be 28, got ${state.totalLessonsCount}`);
  assert(state.phases.length === 7, `Total phases should be 7, got ${state.phases.length}`);
  assert(state.completedLessonsCount === 0, `Completed count should be 0, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.phases[0].doneSteps === 0, `Phase 1 done steps should be 0, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "current", "Lesson 1 (NJ-05) should be current");
  assert(state.currentLesson?.code === "NJ-05", `Current lesson code should be NJ-05, got ${state.currentLesson?.code}`);
  assert(state.showPrerequisitesCard === true, "Prereq card should show on first visit");
  assert(state.currentStepChip === "START HERE · STEP 1 OF 5", `Chip should be 'START HERE · STEP 1 OF 5', got '${state.currentStepChip}'`);
  console.log("  ✓ 9.1 Authoritative NestJS initial state verified (starts on NJ-05)");
}

// 9.2: User completes single lesson by slug (nj05-setup)
{
  const state = getCurriculumState(nestjsCourse, { completedLessonIds: ["nj05-setup"], prereqConfirmed: true });
  assert(state.completedLessonsCount === 1, `Completed count should be 1, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.showPrerequisitesCard === false, "Prereq card should hide when progress > 0");
  assert(state.phases[0].doneSteps === 1, `Phase 1 done steps should be 1, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "completed", "Lesson 1 should be completed");
  assert(state.phases[0].lessons[1].status === "current", "Lesson 2 (NJ-06) should be current");
  assert(state.currentLesson?.code === "NJ-06", `Current lesson should be NJ-06, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "YOUR NEXT STEP · STEP 2 OF 5", `Chip should be 'YOUR NEXT STEP · STEP 2 OF 5', got '${state.currentStepChip}'`);
  console.log("  ✓ 9.2 Authoritative NestJS single lesson completion verified");
}

// 9.3: User completes Phase 1 (5 lessons) -> Phase 2 unlocks (NJ-10 DTOs & Validation)
{
  const phase1Slugs = [
    "nj05-setup",
    "nj07-controllers",
    "nj08-services",
    "nj09-dependency-injection",
    "nj06-modules",
  ];
  const state = getCurriculumState(nestjsCourse, { completedLessonIds: phase1Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 5, `Completed count should be 5, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 1, `Completed phases should be 1, got ${state.completedPhases.length}`);
  assert(state.phases[0].status === "completed", "Phase 1 should be completed");
  assert(state.phases[1].status === "current", "Phase 2 should be current");
  assert(state.currentLesson?.code === "NJ-10", `Current lesson should be NJ-10, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "PHASE 2 UNLOCKED · STEP 1 OF 3", `Chip should be 'PHASE 2 UNLOCKED · STEP 1 OF 3', got '${state.currentStepChip}'`);
  console.log("  ✓ 9.3 Authoritative NestJS Phase 1 completion and Phase 2 unlock verified");
}

// 9.4: User completes all 7 phases (all 28 focused NestJS lessons) -> Capstone unlocks!
{
  const all28Slugs = getCourseNestjsLessons().map((l) => l.slug);
  assert(all28Slugs.length === 28, `Expected 28 NestJS lesson slugs, got ${all28Slugs.length}`);

  const state = getCurriculumState(nestjsCourse, { completedLessonIds: all28Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 28, `Completed count should be 28, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 7, `All 7 phases should be completed, got ${state.completedPhases.length}`);
  assert(state.remainingPhases.length === 0, `Remaining phases should be 0, got ${state.remainingPhases.length}`);
  assert(state.progressPercent === 100, `Progress should be 100%, got ${state.progressPercent}%`);
  assert(state.isCourseComplete === true, "Course should be marked complete");
  assert(state.isCapstoneUnlocked === true, "Capstone project MUST be unlocked after finishing all 7 phases");
  console.log("  ✓ 9.4 All 7 phases finished -> NestJS Capstone successfully unlocked verified!");
}

// =========================================================================
// TEST SUITE 10: Authoritative Node.js Curriculum Progression
// =========================================================================
console.log("\nTesting Course 10: Authoritative Node.js Curriculum Dynamic States...");

import { getNodejsCourse, getAllLessons as getAllNodeLessons } from "../../../app/learn/nodejs/data/nodejs-curriculum";

const nodejsCourse = getNodejsCourse();

// 10.1: Brand-new user (0 lessons completed)
{
  const state = getCurriculumState(nodejsCourse, { completedLessonIds: [], prereqConfirmed: false });
  assert(state.totalLessonsCount === 24, `Total lessons should be 24, got ${state.totalLessonsCount}`);
  assert(state.phases.length === 8, `Total phases should be 8, got ${state.phases.length}`);
  assert(state.completedLessonsCount === 0, `Completed count should be 0, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.phases[0].doneSteps === 0, `Phase 1 done steps should be 0, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "current", "Lesson 1 should be current");
  assert(state.currentLesson?.code === "NODE-01", `Current lesson code should be NODE-01, got ${state.currentLesson?.code}`);
  assert(state.showPrerequisitesCard === true, "Prereq card should show on first visit");
  assert(state.currentStepChip === "START HERE · STEP 1 OF 3", `Chip should be 'START HERE · STEP 1 OF 3', got '${state.currentStepChip}'`);
  console.log("  ✓ 10.1 Authoritative Node.js initial state verified");
}

// 10.2: User completes single lesson by slug (node01-what-is-nodejs)
{
  const state = getCurriculumState(nodejsCourse, { completedLessonIds: ["node01-what-is-nodejs"], prereqConfirmed: true });
  assert(state.completedLessonsCount === 1, `Completed count should be 1, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.showPrerequisitesCard === false, "Prereq card should hide when progress > 0");
  assert(state.phases[0].doneSteps === 1, `Phase 1 done steps should be 1, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "completed", "Lesson 1 should be completed");
  assert(state.phases[0].lessons[1].status === "current", "Lesson 2 should be current");
  assert(state.currentLesson?.code === "NODE-02", `Current lesson should be NODE-02, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "YOUR NEXT STEP · STEP 2 OF 3", `Chip should be 'YOUR NEXT STEP · STEP 2 OF 3', got '${state.currentStepChip}'`);
  console.log("  ✓ 10.2 Authoritative Node.js single lesson completion verified");
}

// 10.3: User completes Phase 1 (3 lessons) -> Phase 2 unlocks (NODE-04)
{
  const phase1Slugs = [
    "node01-what-is-nodejs",
    "node02-nodejs-vs-browser",
    "node03-event-loop-and-async-io",
  ];
  const state = getCurriculumState(nodejsCourse, { completedLessonIds: phase1Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 3, `Completed count should be 3, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 1, `Completed phases should be 1, got ${state.completedPhases.length}`);
  assert(state.phases[0].status === "completed", "Phase 1 should be completed");
  assert(state.phases[1].status === "current", "Phase 2 should be current");
  assert(state.currentLesson?.code === "NODE-04", `Current lesson should be NODE-04, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "PHASE 2 UNLOCKED · STEP 1 OF 2", `Chip should be 'PHASE 2 UNLOCKED · STEP 1 OF 2', got '${state.currentStepChip}'`);
  console.log("  ✓ 10.3 Authoritative Node.js Phase 1 completion and Phase 2 unlock verified");
}

// 10.4: User completes all 8 phases (all 24 lessons) -> Capstone unlocks!
{
  const all24Slugs = getAllNodeLessons().map((l) => l.slug);
  assert(all24Slugs.length === 24, `Expected 24 Node.js lesson slugs, got ${all24Slugs.length}`);

  const state = getCurriculumState(nodejsCourse, { completedLessonIds: all24Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 24, `Completed count should be 24, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 8, `All 8 phases should be completed, got ${state.completedPhases.length}`);
  assert(state.remainingPhases.length === 0, `Remaining phases should be 0, got ${state.remainingPhases.length}`);
  assert(state.progressPercent === 100, `Progress should be 100%, got ${state.progressPercent}%`);
  assert(state.isCourseComplete === true, "Course should be marked complete");
  assert(state.isCapstoneUnlocked === true, "Capstone project MUST be unlocked after finishing all 8 phases");
  console.log("  ✓ 10.4 All 8 phases finished -> Node.js Capstone successfully unlocked verified!");
}

// =========================================================================
// TEST SUITE 11: Authoritative Express.js Curriculum Progression
// =========================================================================
console.log("\nTesting Course 11: Authoritative Express.js Curriculum Dynamic States...");

import { getExpressCourse, getAllLessons as getAllExpressLessons } from "../../../app/learn/express/data/express-curriculum";

const expressCourse = getExpressCourse();

// 11.1: Brand-new user (0 lessons completed)
{
  const state = getCurriculumState(expressCourse, { completedLessonIds: [], prereqConfirmed: false });
  assert(state.totalLessonsCount === 28, `Total lessons should be 28, got ${state.totalLessonsCount}`);
  assert(state.phases.length === 10, `Total phases should be 10, got ${state.phases.length}`);
  assert(state.completedLessonsCount === 0, `Completed count should be 0, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.phases[0].doneSteps === 0, `Phase 1 done steps should be 0, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "current", "Lesson 1 should be current");
  assert(state.currentLesson?.code === "EXP-01", `Current lesson code should be EXP-01, got ${state.currentLesson?.code}`);
  assert(state.showPrerequisitesCard === true, "Prereq card should show on first visit");
  assert(state.currentStepChip === "START HERE · STEP 1 OF 3", `Chip should be 'START HERE · STEP 1 OF 3', got '${state.currentStepChip}'`);
  console.log("  ✓ 11.1 Authoritative Express.js initial state verified");
}

// 11.2: User completes single lesson by slug (exp01-what-is-express)
{
  const state = getCurriculumState(expressCourse, { completedLessonIds: ["exp01-what-is-express"], prereqConfirmed: true });
  assert(state.completedLessonsCount === 1, `Completed count should be 1, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.showPrerequisitesCard === false, "Prereq card should hide when progress > 0");
  assert(state.phases[0].doneSteps === 1, `Phase 1 done steps should be 1, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "completed", "Lesson 1 should be completed");
  assert(state.phases[0].lessons[1].status === "current", "Lesson 2 should be current");
  assert(state.currentLesson?.code === "EXP-02", `Current lesson should be EXP-02, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "YOUR NEXT STEP · STEP 2 OF 3", `Chip should be 'YOUR NEXT STEP · STEP 2 OF 3', got '${state.currentStepChip}'`);
  console.log("  ✓ 11.2 Authoritative Express.js single lesson completion verified");
}

// 11.3: User completes Phase 1 (3 lessons) -> Phase 2 unlocks (EXP-04)
{
  const phase1Slugs = [
    "exp01-what-is-express",
    "exp02-app-object",
    "exp03-req-res-cycle",
  ];
  const state = getCurriculumState(expressCourse, { completedLessonIds: phase1Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 3, `Completed count should be 3, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 1, `Completed phases should be 1, got ${state.completedPhases.length}`);
  assert(state.phases[0].status === "completed", "Phase 1 should be completed");
  assert(state.phases[1].status === "current", "Phase 2 should be current");
  assert(state.currentLesson?.code === "EXP-04", `Current lesson should be EXP-04, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "PHASE 2 UNLOCKED · STEP 1 OF 3", `Chip should be 'PHASE 2 UNLOCKED · STEP 1 OF 3', got '${state.currentStepChip}'`);
  console.log("  ✓ 11.3 Authoritative Express.js Phase 1 completion and Phase 2 unlock verified");
}

// 11.4: User completes all 10 phases (all 28 lessons) -> Capstone unlocks!
{
  const all28Slugs = getAllExpressLessons().map((l) => l.slug);
  assert(all28Slugs.length === 28, `Expected 28 Express.js lesson slugs, got ${all28Slugs.length}`);

  const state = getCurriculumState(expressCourse, { completedLessonIds: all28Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 28, `Completed count should be 28, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 10, `All 10 phases should be completed, got ${state.completedPhases.length}`);
  assert(state.remainingPhases.length === 0, `Remaining phases should be 0, got ${state.remainingPhases.length}`);
  assert(state.progressPercent === 100, `Progress should be 100%, got ${state.progressPercent}%`);
  assert(state.isCourseComplete === true, "Course should be marked complete");
  assert(state.isCapstoneUnlocked === true, "Capstone project MUST be unlocked after finishing all 10 phases");
  console.log("  ✓ 11.4 All 10 phases finished -> Express.js Capstone successfully unlocked verified!");
}

// =========================================================================
// TEST SUITE 12: Authoritative MongoDB Curriculum Progression
// =========================================================================
console.log("\nTesting Course 12: Authoritative MongoDB Curriculum Dynamic States...");

import { getMongoDBCourse, getAllLessons as getAllMongoLessons } from "../../../app/learn/mongodb/data/mongodb-curriculum";

const mongodbCourse = getMongoDBCourse();

// 12.1: Brand-new user (0 lessons completed)
{
  const state = getCurriculumState(mongodbCourse, { completedLessonIds: [], prereqConfirmed: false });
  assert(state.totalLessonsCount === 26, `Total lessons should be 26, got ${state.totalLessonsCount}`);
  assert(state.phases.length === 10, `Total phases should be 10, got ${state.phases.length}`);
  assert(state.completedLessonsCount === 0, `Completed count should be 0, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.phases[0].doneSteps === 0, `Phase 1 done steps should be 0, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "current", "Lesson 1 should be current");
  assert(state.currentLesson?.code === "MDB-01", `Current lesson code should be MDB-01, got ${state.currentLesson?.code}`);
  assert(state.showPrerequisitesCard === true, "Prereq card should show on first visit");
  assert(state.currentStepChip === "START HERE · STEP 1 OF 3", `Chip should be 'START HERE · STEP 1 OF 3', got '${state.currentStepChip}'`);
  console.log("  ✓ 12.1 Authoritative MongoDB initial state verified");
}

// 12.2: User completes single lesson by slug (mdb01-what-is-mongodb)
{
  const state = getCurriculumState(mongodbCourse, { completedLessonIds: ["mdb01-what-is-mongodb"], prereqConfirmed: true });
  assert(state.completedLessonsCount === 1, `Completed count should be 1, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.showPrerequisitesCard === false, "Prereq card should hide when progress > 0");
  assert(state.phases[0].doneSteps === 1, `Phase 1 done steps should be 1, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "completed", "Lesson 1 should be completed");
  assert(state.phases[0].lessons[1].status === "current", "Lesson 2 should be current");
  assert(state.currentLesson?.code === "MDB-02", `Current lesson should be MDB-02, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "YOUR NEXT STEP · STEP 2 OF 3", `Chip should be 'YOUR NEXT STEP · STEP 2 OF 3', got '${state.currentStepChip}'`);
  console.log("  ✓ 12.2 Authoritative MongoDB single lesson completion verified");
}

// 12.3: User completes Phase 1 (3 lessons) -> Phase 2 unlocks (MDB-04)
{
  const phase1Slugs = [
    "mdb01-what-is-mongodb",
    "mdb02-databases-collections-bson",
    "mdb03-mongosh-and-compass",
  ];
  const state = getCurriculumState(mongodbCourse, { completedLessonIds: phase1Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 3, `Completed count should be 3, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 1, `Completed phases should be 1, got ${state.completedPhases.length}`);
  assert(state.phases[0].status === "completed", "Phase 1 should be completed");
  assert(state.phases[1].status === "current", "Phase 2 should be current");
  assert(state.currentLesson?.code === "MDB-04", `Current lesson should be MDB-04, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "PHASE 2 UNLOCKED · STEP 1 OF 4", `Chip should be 'PHASE 2 UNLOCKED · STEP 1 OF 4', got '${state.currentStepChip}'`);
  console.log("  ✓ 12.3 Authoritative MongoDB Phase 1 completion and Phase 2 unlock verified");
}

// 12.4: User completes all 10 phases (all 26 lessons) -> Capstone unlocks!
{
  const all26Slugs = getAllMongoLessons().map((l) => l.slug);
  assert(all26Slugs.length === 26, `Expected 26 MongoDB lesson slugs, got ${all26Slugs.length}`);

  const state = getCurriculumState(mongodbCourse, { completedLessonIds: all26Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 26, `Completed count should be 26, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 10, `All 10 phases should be completed, got ${state.completedPhases.length}`);
  assert(state.remainingPhases.length === 0, `Remaining phases should be 0, got ${state.remainingPhases.length}`);
  assert(state.progressPercent === 100, `Progress should be 100%, got ${state.progressPercent}%`);
  assert(state.isCourseComplete === true, "Course should be marked complete");
  assert(state.isCapstoneUnlocked === true, "Capstone project MUST be unlocked after finishing all 10 phases");
  console.log("  ✓ 12.4 All 10 phases finished -> MongoDB Capstone successfully unlocked verified!");
}

// =========================================================================
// TEST SUITE 13: Authoritative PostgreSQL Curriculum Progression
// =========================================================================
console.log("\nTesting Course 13: Authoritative PostgreSQL Curriculum Dynamic States...");

import { getPostgresqlCourse, getAllLessons as getAllPostgresqlLessons } from "../../../app/learn/postgresql/data/postgresql-curriculum";

const postgresqlCourse = getPostgresqlCourse();

// 13.1: Brand-new user (0 lessons completed)
{
  const state = getCurriculumState(postgresqlCourse, { completedLessonIds: [], prereqConfirmed: false });
  assert(state.totalLessonsCount === 29, `Total lessons should be 29, got ${state.totalLessonsCount}`);
  assert(state.phases.length === 11, `Total phases should be 11, got ${state.phases.length}`);
  assert(state.completedLessonsCount === 0, `Completed count should be 0, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.phases[0].doneSteps === 0, `Phase 1 done steps should be 0, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "current", "Lesson 1 should be current");
  assert(state.currentLesson?.code === "PG-01", `Current lesson code should be PG-01, got ${state.currentLesson?.code}`);
  assert(state.showPrerequisitesCard === true, "Prereq card should show on first visit");
  assert(state.currentStepChip === "START HERE · STEP 1 OF 3", `Chip should be 'START HERE · STEP 1 OF 3', got '${state.currentStepChip}'`);
  console.log("  ✓ 13.1 Authoritative PostgreSQL initial state verified");
}

// 13.2: User completes single lesson by slug (pg01-what-is-postgresql)
{
  const state = getCurriculumState(postgresqlCourse, { completedLessonIds: ["pg01-what-is-postgresql"], prereqConfirmed: true });
  assert(state.completedLessonsCount === 1, `Completed count should be 1, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.showPrerequisitesCard === false, "Prereq card should hide when progress > 0");
  assert(state.phases[0].doneSteps === 1, `Phase 1 done steps should be 1, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "completed", "Lesson 1 should be completed");
  assert(state.phases[0].lessons[1].status === "current", "Lesson 2 should be current");
  assert(state.currentLesson?.code === "PG-02", `Current lesson should be PG-02, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "YOUR NEXT STEP · STEP 2 OF 3", `Chip should be 'YOUR NEXT STEP · STEP 2 OF 3', got '${state.currentStepChip}'`);
  console.log("  ✓ 13.2 Authoritative PostgreSQL single lesson completion verified");
}

// 13.3: User completes Phase 1 (3 lessons) -> Phase 2 unlocks (PG-04)
{
  const phase1Slugs = [
    "pg01-what-is-postgresql",
    "pg02-databases-schemas-tables",
    "pg03-core-data-types",
  ];
  const state = getCurriculumState(postgresqlCourse, { completedLessonIds: phase1Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 3, `Completed count should be 3, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 1, `Completed phases should be 1, got ${state.completedPhases.length}`);
  assert(state.phases[0].status === "completed", "Phase 1 should be completed");
  assert(state.phases[1].status === "current", "Phase 2 should be current");
  assert(state.currentLesson?.code === "PG-04", `Current lesson should be PG-04, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "PHASE 2 UNLOCKED · STEP 1 OF 4", `Chip should be 'PHASE 2 UNLOCKED · STEP 1 OF 4', got '${state.currentStepChip}'`);
  console.log("  ✓ 13.3 Authoritative PostgreSQL Phase 1 completion and Phase 2 unlock verified");
}

// 13.4: User completes all 11 phases (all 29 lessons) -> Capstone unlocks!
{
  const all29Slugs = getAllPostgresqlLessons().map((l) => l.slug);
  assert(all29Slugs.length === 29, `Expected 29 PostgreSQL lesson slugs, got ${all29Slugs.length}`);

  const state = getCurriculumState(postgresqlCourse, { completedLessonIds: all29Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 29, `Completed count should be 29, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 11, `All 11 phases should be completed, got ${state.completedPhases.length}`);
  assert(state.remainingPhases.length === 0, `Remaining phases should be 0, got ${state.remainingPhases.length}`);
  assert(state.progressPercent === 100, `Progress should be 100%, got ${state.progressPercent}%`);
  assert(state.isCourseComplete === true, "Course should be marked complete");
  assert(state.isCapstoneUnlocked === true, "Capstone project MUST be unlocked after finishing all 11 phases");
  console.log("  ✓ 13.4 All 11 phases finished -> PostgreSQL Capstone successfully unlocked verified!");
}

// =========================================================================
// TEST SUITE 14: Authoritative Redux Curriculum Progression
// =========================================================================
console.log("\nTesting Course 14: Authoritative Redux Curriculum Dynamic States...");

import { getReduxCourse, getAllLessons as getAllReduxLessons } from "../../../app/learn/redux/data/redux-curriculum";

const reduxCourse = getReduxCourse();

// 14.1: Brand-new user (0 lessons completed)
{
  const state = getCurriculumState(reduxCourse, { completedLessonIds: [], prereqConfirmed: false });
  assert(state.totalLessonsCount === 26, `Total lessons should be 26, got ${state.totalLessonsCount}`);
  assert(state.phases.length === 10, `Total phases should be 10, got ${state.phases.length}`);
  assert(state.completedLessonsCount === 0, `Completed count should be 0, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.phases[0].doneSteps === 0, `Phase 1 done steps should be 0, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "current", "Lesson 1 should be current");
  assert(state.currentLesson?.code === "RDX-01", `Current lesson code should be RDX-01, got ${state.currentLesson?.code}`);
  assert(state.showPrerequisitesCard === true, "Prereq card should show on first visit");
  assert(state.currentStepChip === "START HERE · STEP 1 OF 3", `Chip should be 'START HERE · STEP 1 OF 3', got '${state.currentStepChip}'`);
  console.log("  ✓ 14.1 Authoritative Redux initial state verified");
}

// 14.2: User completes single lesson by slug (rdx01-what-is-state-and-why-redux)
{
  const state = getCurriculumState(reduxCourse, { completedLessonIds: ["rdx01-what-is-state-and-why-redux"], prereqConfirmed: true });
  assert(state.completedLessonsCount === 1, `Completed count should be 1, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 0, `Completed phases should be 0, got ${state.completedPhases.length}`);
  assert(state.showPrerequisitesCard === false, "Prereq card should hide when progress > 0");
  assert(state.phases[0].doneSteps === 1, `Phase 1 done steps should be 1, got ${state.phases[0].doneSteps}`);
  assert(state.phases[0].lessons[0].status === "completed", "Lesson 1 should be completed");
  assert(state.phases[0].lessons[1].status === "current", "Lesson 2 should be current");
  assert(state.currentLesson?.code === "RDX-02", `Current lesson should be RDX-02, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "YOUR NEXT STEP · STEP 2 OF 3", `Chip should be 'YOUR NEXT STEP · STEP 2 OF 3', got '${state.currentStepChip}'`);
  console.log("  ✓ 14.2 Authoritative Redux single lesson completion verified");
}

// 14.3: User completes Phase 1 (3 lessons) -> Phase 2 unlocks (RDX-04)
{
  const phase1Slugs = [
    "rdx01-what-is-state-and-why-redux",
    "rdx02-the-redux-mental-model",
    "rdx03-when-to-use-and-not-use-redux",
  ];
  const state = getCurriculumState(reduxCourse, { completedLessonIds: phase1Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 3, `Completed count should be 3, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 1, `Completed phases should be 1, got ${state.completedPhases.length}`);
  assert(state.phases[0].status === "completed", "Phase 1 should be completed");
  assert(state.phases[1].status === "current", "Phase 2 should be current");
  assert(state.currentLesson?.code === "RDX-04", `Current lesson should be RDX-04, got ${state.currentLesson?.code}`);
  assert(state.currentStepChip === "PHASE 2 UNLOCKED · STEP 1 OF 3", `Chip should be 'PHASE 2 UNLOCKED · STEP 1 OF 3', got '${state.currentStepChip}'`);
  console.log("  ✓ 14.3 Authoritative Redux Phase 1 completion and Phase 2 unlock verified");
}

// 14.4: User completes all 10 phases (all 26 lessons) -> Capstone unlocks!
{
  const all26Slugs = getAllReduxLessons().map((l) => l.slug);
  assert(all26Slugs.length === 26, `Expected 26 Redux lesson slugs, got ${all26Slugs.length}`);

  const state = getCurriculumState(reduxCourse, { completedLessonIds: all26Slugs, prereqConfirmed: true });
  assert(state.completedLessonsCount === 26, `Completed count should be 26, got ${state.completedLessonsCount}`);
  assert(state.completedPhases.length === 10, `All 10 phases should be completed, got ${state.completedPhases.length}`);
  assert(state.remainingPhases.length === 0, `Remaining phases should be 0, got ${state.remainingPhases.length}`);
  assert(state.progressPercent === 100, `Progress should be 100%, got ${state.progressPercent}%`);
  assert(state.isCourseComplete === true, "Course should be marked complete");
  assert(state.isCapstoneUnlocked === true, "Capstone project MUST be unlocked after finishing all 10 phases");
  console.log("  ✓ 14.4 All 10 phases finished -> Redux Capstone successfully unlocked verified!");
}

console.log("\n🎉 ALL UNIT TESTS PASSED SUCCESSFULLY!\n");
