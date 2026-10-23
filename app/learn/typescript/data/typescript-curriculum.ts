/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TYPESCRIPT CURRICULUM — AUTHORITATIVE DATA LAYER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Clean 4-Part pedagogical progression based on LearnCraft's authoritative
 * TypeScript curriculum:
 * Part 1: TypeScript Basics (Lessons 1-4)
 * Part 2: Describe Your Data (Lessons 5-9)
 * Part 3: Work With Types Safely (Lessons 10-15)
 * Part 4: Understand TypeScript in Real Projects (Lessons 16-18)
 *
 * Core Philosophy: "TypeScript teaches TypeScript."
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import type { Course } from "@/components/curriculum/types";

export type ContentTag = "CORE" | "BUILD" | "PROFESSIONAL" | "REFERENCE";

export interface LessonMeta {
  code: string;
  slug: string;
  name: string;
  desc: string;
  path: string;
  tag: ContentTag;
  difficulty: "Easy" | "Moderate" | "Difficult";
  estimatedMinutes: number;
  prerequisite?: string;
  stepNumber: number;
}

export interface CapstoneProjectMeta {
  id: string;
  stageNumber: number;
  slug: string;
  title: string;
  subtitle: string;
  desc: string;
  path: string;
  badge: string;
  xpReward: number;
  estimatedMinutes: number;
  prerequisites: string[];
  skillsTaught: string[];
  stepsCount: number;
}

export interface StageMeta {
  id: string;
  stageNumber: number;
  name: string;
  subtitle: string;
  milestone: string;
  description: string;
  theme: {
    badge: string;
    dot: string;
    border: string;
    bgSubtle: string;
    textAccent: string;
  };
  lessons: LessonMeta[];
  capstone?: CapstoneProjectMeta;
}

export interface ProgressionPhaseMeta {
  id: string;
  phaseNumber: number;
  label: string;
  tag: string;
  desc: string;
  scope: string;
  icon: "zap" | "server" | "shield" | "layers";
  lessonCodes: string[];
}

export interface PrerequisiteTopicMeta {
  id: string;
  title: string;
  desc: string;
  tag: string;
  badge: string;
  path: string;
  level?: string;
}

export interface RelatedTopicMeta {
  id: string;
  title: string;
  desc: string;
  badge: string;
  path: string;
}

// ─────────────────────────────────────────────────────────────
// Prerequisites & Related Topics (External Context)
// ─────────────────────────────────────────────────────────────

export const TYPESCRIPT_PREREQUISITES: PrerequisiteTopicMeta[] = [
  {
    id: "prereq-js",
    title: "JavaScript Fundamentals",
    desc: "Variables, functions, objects, arrays, truthiness, ES6 syntax, and asynchronous Promises.",
    tag: "Required Foundation",
    badge: "JS",
    path: "/roadmaps?category=language#skill-roadmaps",
    level: "Beginner → Intermediate",
  },
];

export const TYPESCRIPT_RELATED_TOPICS: RelatedTopicMeta[] = [
  {
    id: "rel-node",
    title: "Node.js",
    desc: "Modern backend runtime, asynchronous event loop, APIs, and microservices.",
    badge: "Backend",
    path: "/learn/nodejs",
  },
  {
    id: "rel-nestjs",
    title: "NestJS",
    desc: "Enterprise Node.js framework powered by TypeScript decorators and dependency injection.",
    badge: "Backend",
    path: "/learn/nestjs",
  },
  {
    id: "rel-nextjs",
    title: "Next.js",
    desc: "Full-stack React framework with end-to-end type safety and Server Components.",
    badge: "Full-Stack",
    path: "/learn/nextjs",
  },
];

// ─────────────────────────────────────────────────────────────
// Final Capstone Project (Pure TypeScript)
// ─────────────────────────────────────────────────────────────

export const TYPESCRIPT_CAPSTONE: CapstoneProjectMeta = {
  id: "capstone-ts-engine",
  stageNumber: 4,
  slug: "type-safe-data-store",
  title: "Type-Safe In-Memory Query Engine",
  subtitle: "Final Capstone Project",
  desc: "Architect a production-grade, zero-dependency in-memory query and validation engine with generic stores, schema inference, discriminated union events, and type-safe query builders.",
  path: "/learn/typescript/projects/type-safe-data-store",
  badge: "🛠️ Capstone",
  xpReward: 300,
  estimatedMinutes: 90,
  prerequisites: ["TS-04", "TS-07", "TS-09", "TS-12", "TS-15", "TS-17"],
  skillsTaught: [
    "Generic Entity Store Abstractions (<T extends { id: string }>) ",
    "Type-Safe Schema Validation with Discriminated Unions",
    "Deep Readonly & Immutable Transformation Types",
    "Conditional Filter Builders with keyof & Indexed Access",
    "Exhaustive Error Handling with never Guarding",
    "Strict tsconfig Compilation with Zero Unsafe 'any'",
  ],
  stepsCount: 6,
};

// ─────────────────────────────────────────────────────────────
// 4 Authoritative Curriculum Stages (All 18 Lessons)
// ─────────────────────────────────────────────────────────────

export const TYPESCRIPT_STAGES: StageMeta[] = [
  // ── PART 1: TypeScript Basics ──
  {
    id: "stage-1",
    stageNumber: 1,
    name: "TypeScript Basics",
    subtitle: "Types, Annotations, Primitives & Functions",
    milestone: "Understand what TypeScript does, primitive types, and function contracts.",
    description: "Learn why TypeScript exists, how types catch mistakes early, explicit annotations vs inference, arrays, and function parameter and return types.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "TS-01",
        stepNumber: 1,
        slug: "ts01-what-typescript-does",
        name: "What TypeScript Does",
        desc: "TypeScript adds a type system to JavaScript to catch mistakes before code runs.",
        path: "/learn/typescript/ts01-what-typescript-does",
        tag: "CORE",
        difficulty: "Easy",
        estimatedMinutes: 10,
        prerequisite: "JavaScript Basics",
      },
      {
        code: "TS-02",
        stepNumber: 2,
        slug: "ts02-type-annotations-inference",
        name: "Type Annotations and Type Inference",
        desc: "Tell TypeScript the type you want or let inference deduce it from values automatically.",
        path: "/learn/typescript/ts02-type-annotations-inference",
        tag: "CORE",
        difficulty: "Easy",
        estimatedMinutes: 10,
        prerequisite: "TS-01 (What TypeScript Does)",
      },
      {
        code: "TS-03",
        stepNumber: 3,
        slug: "ts03-basic-types-arrays",
        name: "Basic Types and Arrays",
        desc: "Common primitive types (string, number, boolean) and typed collection arrays (T[]).",
        path: "/learn/typescript/ts03-basic-types-arrays",
        tag: "CORE",
        difficulty: "Easy",
        estimatedMinutes: 10,
        prerequisite: "TS-02 (Type Annotations)",
      },
      {
        code: "TS-04",
        stepNumber: 4,
        slug: "ts04-function-parameters-return-types",
        name: "Function Parameters and Return Types",
        desc: "Describe function input requirements, return types, and non-returning void actions.",
        path: "/learn/typescript/ts04-function-parameters-return-types",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 15,
        prerequisite: "TS-03 (Basic Types)",
      },
    ],
  },

  // ── PART 2: Describe Your Data ──
  {
    id: "stage-2",
    stageNumber: 2,
    name: "Describe Your Data",
    subtitle: "Objects, Interfaces, Unions & Narrowing",
    milestone: "Model application data structures and narrow multi-type values safely.",
    description: "Define object shapes, compare type aliases and interfaces, enforce allowed literal states, handle null/undefined, and apply type narrowing.",
    theme: {
      badge: "bg-blue-500/10 text-blue-300 border-blue-500/20",
      dot: "bg-blue-400",
      border: "border-blue-500/30",
      bgSubtle: "bg-blue-500/[0.03]",
      textAccent: "text-blue-400",
    },
    lessons: [
      {
        code: "TS-05",
        stepNumber: 1,
        slug: "ts05-object-types",
        name: "Object Types",
        desc: "Describe required fields and optional properties with the ? modifier.",
        path: "/learn/typescript/ts05-object-types",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 15,
        prerequisite: "TS-04 (Function Types)",
      },
      {
        code: "TS-06",
        stepNumber: 2,
        slug: "ts06-type-and-interface",
        name: "type and interface",
        desc: "Compare type aliases and interfaces for defining object contracts and unions.",
        path: "/learn/typescript/ts06-type-and-interface",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 15,
        prerequisite: "TS-05 (Object Types)",
      },
      {
        code: "TS-07",
        stepNumber: 3,
        slug: "ts07-union-and-literal-types",
        name: "Union Types and Literal Types",
        desc: "Combine allowed types with | and enforce exact allowed literal values.",
        path: "/learn/typescript/ts07-union-and-literal-types",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 15,
        prerequisite: "TS-06 (type & interface)",
      },
      {
        code: "TS-08",
        stepNumber: 4,
        slug: "ts08-optional-values-null-undefined",
        name: "Optional Values, null, and undefined",
        desc: "Make missing data visible and prevent runtime null reference errors.",
        path: "/learn/typescript/ts08-optional-values-null-undefined",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 15,
        prerequisite: "TS-07 (Unions)",
      },
      {
        code: "TS-09",
        stepNumber: 5,
        slug: "ts09-type-narrowing",
        name: "Type Narrowing",
        desc: "Use runtime type guards (typeof, Array.isArray) to refine multi-type values safely.",
        path: "/learn/typescript/ts09-type-narrowing",
        tag: "BUILD",
        difficulty: "Difficult",
        estimatedMinutes: 20,
        prerequisite: "TS-08 (Optional Values)",
      },
    ],
  },

  // ── PART 3: Work With Types Safely ──
  {
    id: "stage-3",
    stageNumber: 3,
    name: "Work With Types Safely",
    subtitle: "Safety Hierarchy, Generics, Utilities & Modules",
    milestone: "Master unknown safety, type assertions, generic functions, and modules.",
    description: "Understand any vs unknown, type assertions, reusable generics, common utility types, classes with implements, and module type imports.",
    theme: {
      badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
      dot: "bg-emerald-400",
      border: "border-emerald-500/30",
      bgSubtle: "bg-emerald-500/[0.03]",
      textAccent: "text-emerald-400",
    },
    lessons: [
      {
        code: "TS-10",
        stepNumber: 1,
        slug: "ts10-any-vs-unknown",
        name: "any vs. unknown",
        desc: "Differentiate turning off checks with any from safe uncertain handling with unknown.",
        path: "/learn/typescript/ts10-any-vs-unknown",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 15,
        prerequisite: "TS-09 (Type Narrowing)",
      },
      {
        code: "TS-11",
        stepNumber: 2,
        slug: "ts11-type-assertions",
        name: "Type Assertions",
        desc: "When `as Type` informs the compiler and why it does not validate runtime data.",
        path: "/learn/typescript/ts11-type-assertions",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 15,
        prerequisite: "TS-10 (any vs unknown)",
      },
      {
        code: "TS-12",
        stepNumber: 3,
        slug: "ts12-generics",
        name: "Generics",
        desc: "Write reusable functions and abstractions that preserve exact input and output types.",
        path: "/learn/typescript/ts12-generics",
        tag: "BUILD",
        difficulty: "Difficult",
        estimatedMinutes: 20,
        prerequisite: "TS-11 (Type Assertions)",
      },
      {
        code: "TS-13",
        stepNumber: 4,
        slug: "ts13-common-utility-types",
        name: "Common Utility Types",
        desc: "Transform existing types using Pick, Partial, Omit, and Record without duplication.",
        path: "/learn/typescript/ts13-common-utility-types",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 15,
        prerequisite: "TS-12 (Generics)",
      },
      {
        code: "TS-14",
        stepNumber: 5,
        slug: "ts14-classes-and-implements",
        name: "Classes and implements",
        desc: "Group state and methods together while verifying interface contracts with implements.",
        path: "/learn/typescript/ts14-classes-and-implements",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 15,
        prerequisite: "TS-13 (Utility Types)",
      },
      {
        code: "TS-15",
        stepNumber: 6,
        slug: "ts15-modules-and-type-imports",
        name: "Modules and Type Imports",
        desc: "Organize code across files and use import type for zero-runtime type imports.",
        path: "/learn/typescript/ts15-modules-and-type-imports",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 15,
        prerequisite: "TS-14 (Classes)",
      },
    ],
  },

  // ── PART 4: Understand TypeScript in Real Projects ──
  {
    id: "stage-4",
    stageNumber: 4,
    name: "Understand TypeScript in Real Projects",
    subtitle: "Async Promises, Runtime API Validation & Debugging",
    milestone: "Handle async data flows, validate external API responses, and resolve errors cleanly.",
    description: "Model asynchronous values with Promise<T>, validate incoming server data at runtime, and read compiler diagnostics to fix type errors.",
    theme: {
      badge: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      dot: "bg-amber-400",
      border: "border-amber-500/30",
      bgSubtle: "bg-amber-500/[0.03]",
      textAccent: "text-amber-400",
    },
    lessons: [
      {
        code: "TS-16",
        stepNumber: 1,
        slug: "ts16-promises-and-async-functions",
        name: "Promises and async Functions",
        desc: "Model asynchronous values with Promise<T> and async/await syntax.",
        path: "/learn/typescript/ts16-promises-and-async-functions",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 15,
        prerequisite: "TS-15 (Modules)",
      },
      {
        code: "TS-17",
        stepNumber: 2,
        slug: "ts17-check-api-data",
        name: "Check API Data Before Trusting It",
        desc: "Validate untrusted API data at runtime instead of assuming types validate live traffic.",
        path: "/learn/typescript/ts17-check-api-data",
        tag: "BUILD",
        difficulty: "Difficult",
        estimatedMinutes: 20,
        prerequisite: "TS-16 (Promises)",
      },
      {
        code: "TS-18",
        stepNumber: 3,
        slug: "ts18-find-and-fix-type-errors",
        name: "Find and Fix Type Errors",
        desc: "Read compiler diagnostics to identify mismatches and fix root causes without as any.",
        path: "/learn/typescript/ts18-find-and-fix-type-errors",
        tag: "PROFESSIONAL",
        difficulty: "Moderate",
        estimatedMinutes: 15,
        prerequisite: "TS-17 (API Data)",
      },
    ],
    capstone: TYPESCRIPT_CAPSTONE,
  },
];

// ─────────────────────────────────────────────────────────────
// 4 Progression Phases
// ─────────────────────────────────────────────────────────────

export const TYPESCRIPT_PROGRESSION_PHASES: ProgressionPhaseMeta[] = [
  {
    id: "basics",
    phaseNumber: 1,
    label: "TypeScript Basics",
    tag: "Phase 01",
    desc: "Type system mental model, annotations vs inference, basic types, and function contracts",
    scope: "Foundational Syntax",
    icon: "zap",
    lessonCodes: ["TS-01", "TS-02", "TS-03", "TS-04"],
  },
  {
    id: "describe-data",
    phaseNumber: 2,
    label: "Describe Your Data",
    tag: "Phase 02",
    desc: "Object types, type vs interface, union & literal types, nullability, and narrowing",
    scope: "Data Modeling",
    icon: "server",
    lessonCodes: ["TS-05", "TS-06", "TS-07", "TS-08", "TS-09"],
  },
  {
    id: "safe-types",
    phaseNumber: 3,
    label: "Work With Types Safely",
    tag: "Phase 03",
    desc: "any vs unknown, type assertions, generics, utility types, classes, and type imports",
    scope: "Safe Abstractions",
    icon: "shield",
    lessonCodes: ["TS-10", "TS-11", "TS-12", "TS-13", "TS-14", "TS-15"],
  },
  {
    id: "real-projects",
    phaseNumber: 4,
    label: "Understand TypeScript in Real Projects",
    tag: "Phase 04",
    desc: "Promises, async/await, runtime API validation, and debugging compiler diagnostics",
    scope: "Production Architecture",
    icon: "layers",
    lessonCodes: ["TS-16", "TS-17", "TS-18"],
  },
];

// ─────────────────────────────────────────────────────────────
// Backward Compatibility: Legacy Slug & Code Aliases
// ─────────────────────────────────────────────────────────────

export const TYPESCRIPT_LEGACY_SLUG_MAP: Record<string, string> = {
  "ts01-mental-model": "ts01-what-typescript-does",
  "ts02-primitives-inference": "ts02-type-annotations-inference",
  "ts03-arrays-tuples": "ts03-basic-types-arrays",
  "ts04-object-types": "ts05-object-types",
  "ts05-special-types": "ts10-any-vs-unknown",
  "ts06-function-types": "ts04-function-parameters-return-types",
  "ts07-function-overloads": "ts04-function-parameters-return-types",
  "ts08-unions-intersections": "ts07-union-and-literal-types",
  "ts09-type-vs-interface": "ts06-type-and-interface",
  "ts10-control-flow-guards": "ts09-type-narrowing",
  "ts11-custom-type-predicates": "ts09-type-narrowing",
  "ts12-discriminated-unions": "ts07-union-and-literal-types",
  "ts13-exhaustive-checking": "ts09-type-narrowing",
  "ts14-generic-functions": "ts12-generics",
  "ts15-generic-interfaces": "ts12-generics",
  "ts16-generic-constraints": "ts12-generics",
  "ts17-generics-keyof": "ts12-generics",
  "ts18-class-access-modifiers": "ts14-classes-and-implements",
  "ts19-parameter-properties": "ts14-classes-and-implements",
  "ts20-abstract-classes": "ts14-classes-and-implements",
  "ts21-indexed-access-typeof": "ts13-common-utility-types",
  "ts22-conditional-types-infer": "ts12-generics",
  "ts23-mapped-template-types": "ts13-common-utility-types",
  "ts24-utility-types": "ts13-common-utility-types",
  "ts25-modules-type-imports": "ts15-modules-and-type-imports",
  "ts26-tsconfig-strict-mode": "ts18-find-and-fix-type-errors",
  "ts27-declarations-type-erasure": "ts01-what-typescript-does",
  "ts28-assertions-vs-satisfies": "ts11-type-assertions",
  "ts29-safe-error-handling": "ts10-any-vs-unknown",
  "ts30-api-contracts-immutability": "ts17-check-api-data",
  "ts31-debugging-compiler-errors": "ts18-find-and-fix-type-errors",
  "ts32-type-architecture-smells": "ts18-find-and-fix-type-errors",
};

// ─────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────

export function getAllLessons(): LessonMeta[] {
  return TYPESCRIPT_STAGES.flatMap((stage) => stage.lessons);
}

export function getStages(): StageMeta[] {
  return TYPESCRIPT_STAGES;
}

export function getLessonBySlug(slug: string): LessonMeta | undefined {
  if (!slug) return undefined;
  const norm = slug.toLowerCase().trim();

  // 1. Check legacy slug map first to preserve bookmarks, notes, and quiz redirects
  if (TYPESCRIPT_LEGACY_SLUG_MAP[norm]) {
    const targetSlug = TYPESCRIPT_LEGACY_SLUG_MAP[norm];
    const target = getAllLessons().find((l) => l.slug.toLowerCase() === targetSlug.toLowerCase());
    if (target) return target;
  }

  // 2. Direct match on slug, path suffix, or substring
  const directMatch = getAllLessons().find(
    (l) =>
      l.slug.toLowerCase() === norm ||
      l.path.endsWith(`/${norm}`) ||
      l.path.toLowerCase().includes(norm),
  );
  if (directMatch) return directMatch;

  // 3. Match by normalized code (e.g. "ts01", "ts-01", "TS-01") or prefix
  const cleanNorm = norm.replace(/[^a-z0-9]/g, "");
  return getAllLessons().find((l) => {
    const lSlugNorm = l.slug.toLowerCase().replace(/[^a-z0-9]/g, "");
    const lCodeNorm = l.code.toLowerCase().replace(/[^a-z0-9]/g, "");
    return (
      lCodeNorm === cleanNorm ||
      lSlugNorm.startsWith(cleanNorm) ||
      cleanNorm.startsWith(lCodeNorm)
    );
  });
}

export function getLessonByCode(code: string): LessonMeta | undefined {
  return getAllLessons().find(
    (l) => l.code.toUpperCase() === code.toUpperCase(),
  );
}

export function getStageByLessonSlug(slug: string): StageMeta | undefined {
  const lesson = getLessonBySlug(slug);
  if (!lesson) return undefined;
  return TYPESCRIPT_STAGES.find((stage) =>
    stage.lessons.some((l) => l.slug === lesson.slug),
  );
}

export function getNextLesson(currentSlug: string): LessonMeta | null {
  const all = getAllLessons();
  const current = getLessonBySlug(currentSlug);
  if (!current) return null;
  const index = all.findIndex((l) => l.slug === current.slug);
  if (index >= 0 && index < all.length - 1) {
    return all[index + 1];
  }
  return null;
}

export function getPrevLesson(currentSlug: string): LessonMeta | null {
  const all = getAllLessons();
  const current = getLessonBySlug(currentSlug);
  if (!current) return null;
  const index = all.findIndex((l) => l.slug === current.slug);
  if (index > 0) {
    return all[index - 1];
  }
  return null;
}

export function getLessonsByPhaseId(phaseId: string): LessonMeta[] {
  const phase =
    TYPESCRIPT_PROGRESSION_PHASES.find((p) => p.id === phaseId) ||
    TYPESCRIPT_PROGRESSION_PHASES[0];
  const all = getAllLessons();
  return phase.lessonCodes
    .map((code) => all.find((l) => l.code === code))
    .filter((l): l is LessonMeta => l !== undefined);
}

export function getTypeScriptCourse(): Course {
  const allLessons = getAllLessons();
  return {
    id: "typescript",
    title: "Learn TypeScript",
    prerequisites: {
      items: [
        "Variables, functions, and arrays in JavaScript",
        "Objects, arrow functions, and destructuring",
        "Running a script with Node.js or the browser console",
      ],
      refresherHref: "/roadmaps?category=language#skill-roadmaps",
      refresherLabel: "Not sure? Open the JavaScript refresher",
    },
    capstone: {
      title: TYPESCRIPT_CAPSTONE.title,
      description:
        "Your finish line: build a production-grade query and validation engine using everything you learn.",
      href: TYPESCRIPT_CAPSTONE.path,
    },
    phases: TYPESCRIPT_PROGRESSION_PHASES.map((phase) => ({
      id: phase.id,
      name: phase.label,
      summary: phase.desc,
      lessons: phase.lessonCodes
        .map((code) => allLessons.find((l) => l.code === code))
        .filter((l): l is LessonMeta => l !== undefined)
        .map((l) => ({
          id: l.slug,
          code: l.code,
          title: l.name,
          description: l.desc,
          minutes: l.estimatedMinutes,
          requires: l.prerequisite,
          href: l.path,
          aliases: Object.entries(TYPESCRIPT_LEGACY_SLUG_MAP)
            .filter(([_, target]) => target === l.slug)
            .map(([legacy]) => legacy),
        })),
    })),
  };
}
