/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * lib/improve-types.ts — Shared types for the Improvement Manager
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * Kept in lib/ (not app/api/) so both client components and the API route
 * can import without triggering Next.js server-only restrictions.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export interface SectionFileInfo {
  fileName: string;        // "header-section.tsx"
  exportName: string;      // "HeaderSection"
  title: string;           // "Understanding Decorators"
  sectionNumber: number;
  filePath: string;        // "app/learn/nestjs/nj03-decorators/components/header-section.tsx"
}

export interface LessonModule {
  id: string;              // "fundamentals" | "core-concepts" | "part1"
  stage: string;           // "Fundamentals" | "Part 3"
  label: string;           // "Start with the Basics"
  description: string;
  optional: boolean;
  sectionFiles: SectionFileInfo[];
}

export interface LessonStructure {
  topicId: string;
  lessonSlug: string;
  lessonName: string;
  structureType: "module-grouped" | "flat-parts";
  modules: LessonModule[];
}
