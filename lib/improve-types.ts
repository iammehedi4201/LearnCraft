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

export interface BlockSelection {
  type: string;    // e.g. "topic-header", "why-box", "paragraph", "code-block"
  label: string;   // Human readable label for the UI
  index: number;   // 0-based position among blocks in the same section
}

export interface PickerSelection {
  section: SectionFileInfo;
  block: BlockSelection | null;
}

export interface BlockSourceRange {
  blockSource: string;   // The extracted JSX block text
  startLine: number;     // 1-based start line in the file
  endLine: number;       // 1-based end line in the file
}

export interface BlockSelectionWithSource extends BlockSelection {
  id: string; // Unique ID for selection tracking
  filePath: string;
  sourceRange: BlockSourceRange | null;  // null = not yet extracted
  currentBlockContent: string;           // pre-filled in editor
  improvedBlockContent: string;          // user-edited content
}

export interface MultiBlockSelection {
  topicId: string;
  lessonSlug: string;
  section: SectionFileInfo;
  blocks: BlockSelectionWithSource[];    // ordered, non-overlapping
}
