/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * CURRICULUM LEARNING PATH — DATA MODEL & TYPES
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Reusable, topic-agnostic data models for any LearnCraft curriculum.
 * Strictly driven by data; no hardcoded course or phase names.
 */

export type Lesson = {
  id: string;
  code?: string;
  title: string;
  description?: string;
  minutes?: number;
  requires?: string;
  href?: string;
};

export type Phase = {
  id: string;
  name: string;
  summary?: string;
  lessons: Lesson[]; // order = array order
};

export type Capstone = {
  title: string;
  description?: string;
  href?: string;
};

export type CoursePrerequisites = {
  items: string[];
  refresherHref?: string;
  refresherLabel?: string;
};

export type Course = {
  id: string;
  title: string;
  phases: Phase[];
  prerequisites?: CoursePrerequisites;
  capstone?: Capstone;
};

export type Progress = {
  completedLessonIds: string[];
  prereqConfirmed: boolean;
};

export type LessonStatus = "completed" | "current" | "next" | "locked";
export type PhaseStatus = "completed" | "current" | "locked";

export interface ComputedLesson extends Lesson {
  status: LessonStatus;
  phaseId: string;
  phaseNumber: number; // 1-indexed, derived from array index
  stepNumber: number;  // 1-indexed within the phase
  globalStepNumber: number; // 1-indexed across all valid lessons in the course
  computedHref: string;
}

export interface ComputedPhase extends Phase {
  phaseNumber: number; // 1-indexed
  status: PhaseStatus;
  doneSteps: number;
  totalSteps: number;
  lessons: ComputedLesson[];
}

export interface CurriculumState {
  phases: ComputedPhase[];
  currentPhase: ComputedPhase | null;
  currentLesson: ComputedLesson | null;
  nextLesson: ComputedLesson | null;
  completedPhases: ComputedPhase[];
  remainingPhases: ComputedPhase[];
  totalLessonsCount: number;
  completedLessonsCount: number;
  progressPercent: number;
  isCourseComplete: boolean;
  currentStepChip: string;
  showPrerequisitesCard: boolean;
  showPrerequisitesConfirmed: boolean;
  hasRemainingPhases: boolean;
  isCapstoneUnlocked: boolean;
  showCourseCompleteRow: boolean;
}

export interface CurriculumPathProps {
  course: Course;
  progress: Progress;
  onProgressChange?: (newProgress: Progress) => void;
  onNavigate?: (href: string, lessonId?: string) => void;
  onStartCapstone?: () => void;
  className?: string;
}
