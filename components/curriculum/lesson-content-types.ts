/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * UNIFIED LESSON ARCHITECTURE — CONTENT TYPE DEFINITIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Canonical schemas for structured, data-driven curriculum tracks.
 * Replaces redundant interfaces across React, Node.js, PostgreSQL, Prisma,
 * Redux, MongoDB, Express, System Design, OOP, etc.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export interface LessonSectionItem {
  id: string;
  label?: string;
  title?: string;
  icon?: string;
  description?: string;
  [key: string]: any;
}

export interface LessonContentCard {
  number: string;
  tag: string;
  title: string;
  description: string;
  codeSnippet?: string;
  color?: "purple" | "emerald" | "amber" | "cyan" | "rose" | "indigo" | "blue" | string;
}

export interface LessonMentalModelPoint {
  title: string;
  content: string;
  codeSnippet?: string;
}

export interface LessonCodeComparison {
  title: string;
  code: string;
  explanation: string;
}

export interface LessonQuizData {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonTakeaway {
  title: string;
  desc: string;
}

export interface LessonConceptItem {
  name: string;
  desc: string;
  codeSnippet?: string;
}

export interface LessonDeepDiveItem {
  heading: string;
  content: string;
  bulletPoints?: string[];
}

export interface LessonScenario {
  question: string;
  answer: string;
}

export interface LessonInterviewQuestion {
  question: string;
  answer: string;
}

export interface StandardLessonContent {
  slug?: string;
  code?: string;
  title?: string;
  subtitle?: string;
  difficulty?: "Easy" | "Moderate" | "Difficult" | string;
  scenario?: LessonScenario;
  interviewQuestion?: LessonInterviewQuestion;
  sections: LessonSectionItem[];
  part1?: {
    title?: string;
    bigPicture?: string;
    breakdownTitle?: string;
    breakdownItems?: { title: string; desc: string }[];
    explanation?: string;
    analogy?: string;
    diagram?: string;
    codeSnippet?: string;
  };
  part2?: {
    title?: string;
    intro?: string;
    cards?: LessonContentCard[];
    rule?: { title: string; content: string };
    concepts?: LessonConceptItem[];
  };
  part3?: {
    title?: string;
    intro?: string;
    points?: LessonMentalModelPoint[];
    deepDives?: LessonDeepDiveItem[];
  };
  part4?: {
    title?: string;
    bad?: LessonCodeComparison;
    good?: LessonCodeComparison;
    problem?: string;
    badApproach?: {
      title: string;
      code: string;
      flaw: string;
    };
    betterApproach?: {
      title: string;
      code: string;
      benefit: string;
    };
    whyItMatters?: string;
  };
  part5?: {
    title?: string;
    intro?: string;
    starterCode?: string;
  };
  part6?: {
    title?: string;
    quiz?: LessonQuizData;
    takeaways?: LessonTakeaway[];
  };
  part7?: {
    title?: string;
    takeaways?: LessonTakeaway[];
    quiz?: LessonQuizData;
    nextLessonPreview?: { title: string; desc: string };
  };
}
