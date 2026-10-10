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

export interface StandardLessonContent {
  slug: string;
  code: string;
  title: string;
  subtitle?: string;
  sections: LessonSectionItem[];
  part1: {
    title?: string;
    bigPicture: string;
    breakdownTitle: string;
    breakdownItems: { title: string; desc: string }[];
  };
  part2: {
    title: string;
    intro: string;
    cards: LessonContentCard[];
    rule: { title: string; content: string };
  };
  part3: {
    title: string;
    intro: string;
    points: LessonMentalModelPoint[];
  };
  part4: {
    title: string;
    bad: LessonCodeComparison;
    good: LessonCodeComparison;
  };
  part5: {
    title: string;
    intro: string;
    starterCode: string;
  };
  part6: {
    title: string;
    quiz: LessonQuizData;
  };
  part7: {
    title?: string;
    takeaways: LessonTakeaway[];
    nextLessonPreview?: { title: string; desc: string };
  };
}
