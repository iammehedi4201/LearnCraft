/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TYPESCRIPT CURRICULUM — AUTHORITATIVE DATA LAYER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Clean 9-Phase pedagogical progression from static typing foundations
 * to advanced type system mastery, generics, conditional types,
 * compiler configuration, and production type architecture.
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
    id: "rel-oop",
    title: "OOP Fundamentals",
    desc: "Design patterns, encapsulation, inheritance, SOLID, and domain modeling.",
    badge: "Architecture",
    path: "/learn/oop",
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
  /*
  {
    id: "rel-tanstack",
    title: "TanStack Query",
    desc: "Type-safe asynchronous server state management, caching, and optimistic mutations.",
    badge: "Frontend",
    path: "/learn/tanstack",
  },
  */
];

// ─────────────────────────────────────────────────────────────
// Final Capstone Project (Pure TypeScript)
// ─────────────────────────────────────────────────────────────

export const TYPESCRIPT_CAPSTONE: CapstoneProjectMeta = {
  id: "capstone-ts-engine",
  stageNumber: 9,
  slug: "type-safe-data-store",
  title: "Type-Safe In-Memory Query Engine",
  subtitle: "Final Capstone Project",
  desc: "Architect a production-grade, zero-dependency in-memory query and validation engine with generic stores, schema inference, discriminated union events, and type-safe query builders.",
  path: "/learn/typescript/projects/type-safe-data-store",
  badge: "🛠️ Capstone",
  xpReward: 300,
  estimatedMinutes: 90,
  prerequisites: ["TS-05", "TS-09", "TS-13", "TS-17", "TS-24", "TS-28"],
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
// 9 Pedagogy Stages (All 32 Lessons)
// ─────────────────────────────────────────────────────────────

export const TYPESCRIPT_STAGES: StageMeta[] = [
  {
    id: "stage-1",
    stageNumber: 1,
    name: "TypeScript Fundamentals",
    subtitle: "Mental Model, Primitives & Special Types",
    milestone: "Build a rock-solid mental model of static typing, annotations, and inference.",
    description: "Understand why TypeScript exists, how the compiler analyzes code, primitive type annotations, tuples, and special types like unknown and never.",
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
        slug: "ts01-mental-model",
        name: "Mental Model & Static Typing",
        desc: "Why TypeScript exists, compile-time vs runtime, static analysis, and the compilation pipeline.",
        path: "/learn/typescript/ts01-mental-model",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "JavaScript Basics",
      },
      {
        code: "TS-02",
        stepNumber: 2,
        slug: "ts02-primitives-inference",
        name: "Type Annotations & Inference",
        desc: "Explicit annotations vs implicit inference for string, number, boolean, symbol, and bigint.",
        path: "/learn/typescript/ts02-primitives-inference",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "TS-01 (Mental Model)",
      },
      {
        code: "TS-03",
        stepNumber: 3,
        slug: "ts03-arrays-tuples",
        name: "Arrays, Tuples & Readonly",
        desc: "Typed arrays, fixed-length heterogeneous tuples, and the readonly modifier.",
        path: "/learn/typescript/ts03-arrays-tuples",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "TS-02 (Type Annotations)",
      },
      {
        code: "TS-04",
        stepNumber: 4,
        slug: "ts04-object-types",
        name: "Object Types & Properties",
        desc: "Shape typing, optional properties (?), readonly fields, and dynamic index signatures.",
        path: "/learn/typescript/ts04-object-types",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "TS-03 (Arrays & Tuples)",
      },
      {
        code: "TS-05",
        stepNumber: 5,
        slug: "ts05-special-types",
        name: "Special Types: any, unknown, void & never",
        desc: "The type hierarchy: Top types (any, unknown), bottom types (never), and void/null/undefined.",
        path: "/learn/typescript/ts05-special-types",
        tag: "CORE",
        estimatedMinutes: 30,
        prerequisite: "TS-04 (Object Types)",
      },
    ],
  },
  {
    id: "stage-2",
    stageNumber: 2,
    name: "Functions & Type Composition",
    subtitle: "Signatures, Unions, Intersections & Aliases",
    milestone: "Write bulletproof function contracts and compose flexible data shapes.",
    description: "Master function parameter typing, return inference, overloading, union types, intersection types, and the distinction between type and interface.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "TS-06",
        stepNumber: 1,
        slug: "ts06-function-types",
        name: "Function Signatures & Parameters",
        desc: "Typing parameters, return types, optional params, defaults, and rest parameter arrays.",
        path: "/learn/typescript/ts06-function-types",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "TS-05 (Special Types)",
      },
      {
        code: "TS-07",
        stepNumber: 2,
        slug: "ts07-function-overloads",
        name: "Function Overloading",
        desc: "Declaring multiple function call signatures with a single unified implementation.",
        path: "/learn/typescript/ts07-function-overloads",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "TS-06 (Function Types)",
      },
      {
        code: "TS-08",
        stepNumber: 3,
        slug: "ts08-unions-intersections",
        name: "Union & Intersection Types",
        desc: "Composing types with union (|) and intersection (&), plus literal value types.",
        path: "/learn/typescript/ts08-unions-intersections",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "TS-06 (Function Types)",
      },
      {
        code: "TS-09",
        stepNumber: 4,
        slug: "ts09-type-vs-interface",
        name: "Type Aliases vs Interfaces",
        desc: "Declaration merging, extends vs &, and decision rules for when to use each.",
        path: "/learn/typescript/ts09-type-vs-interface",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "TS-08 (Unions & Intersections)",
      },
    ],
  },
  {
    id: "stage-3",
    stageNumber: 3,
    name: "Type Narrowing & Control Flow",
    subtitle: "Guards, Predicates & Discriminated Unions",
    milestone: "Master how TypeScript tracks types across branches of execution.",
    description: "Learn control flow analysis, typeof, instanceof, custom user-defined type guards (is), discriminated unions, and exhaustiveness checking.",
    theme: {
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      dot: "bg-emerald-400",
      border: "border-emerald-500/30",
      bgSubtle: "bg-emerald-500/[0.03]",
      textAccent: "text-emerald-400",
    },
    lessons: [
      {
        code: "TS-10",
        stepNumber: 1,
        slug: "ts10-control-flow-guards",
        name: "Control Flow Analysis & Basic Guards",
        desc: "How TypeScript narrows broad types using typeof, instanceof, equality, and truthiness.",
        path: "/learn/typescript/ts10-control-flow-guards",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "TS-08 (Unions & Intersections)",
      },
      {
        code: "TS-11",
        stepNumber: 2,
        slug: "ts11-custom-type-predicates",
        name: "Custom Type Predicates",
        desc: "Creating reusable type narrowing functions with 'value is Type' and asserts signatures.",
        path: "/learn/typescript/ts11-custom-type-predicates",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "TS-10 (Control Flow Guards)",
      },
      {
        code: "TS-12",
        stepNumber: 3,
        slug: "ts12-discriminated-unions",
        name: "Discriminated Unions",
        desc: "The single most powerful pattern: tagged unions with literal discriminant properties.",
        path: "/learn/typescript/ts12-discriminated-unions",
        tag: "BUILD",
        estimatedMinutes: 30,
        prerequisite: "TS-10 (Control Flow Guards)",
      },
      {
        code: "TS-13",
        stepNumber: 4,
        slug: "ts13-exhaustive-checking",
        name: "Exhaustive Checking with never",
        desc: "Compile-time enforcement ensuring every union branch is handled in switch statements.",
        path: "/learn/typescript/ts13-exhaustive-checking",
        tag: "BUILD",
        estimatedMinutes: 20,
        prerequisite: "TS-12 (Discriminated Unions)",
      },
    ],
  },
  {
    id: "stage-4",
    stageNumber: 4,
    name: "Generics & Type Abstraction",
    subtitle: "Reusable Types, Constraints & keyof",
    milestone: "Write flexible, type-safe functions and data structures without losing type fidelity.",
    description: "Understand the core problem generics solve, generic functions, generic interfaces, generic constraints (extends), and keyof property lookups.",
    theme: {
      badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      dot: "bg-cyan-400",
      border: "border-cyan-500/30",
      bgSubtle: "bg-cyan-500/[0.03]",
      textAccent: "text-cyan-400",
    },
    lessons: [
      {
        code: "TS-14",
        stepNumber: 1,
        slug: "ts14-generic-functions",
        name: "Generic Functions & Type Parameters",
        desc: "The problem generics solve: Capturing and preserving relationship types with <T>.",
        path: "/learn/typescript/ts14-generic-functions",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "TS-09 (Type vs Interface)",
      },
      {
        code: "TS-15",
        stepNumber: 2,
        slug: "ts15-generic-interfaces",
        name: "Generic Interfaces & Containers",
        desc: "Building reusable generic structures like ApiResponse<T>, PaginatedList<T>, and Result<T, E>.",
        path: "/learn/typescript/ts15-generic-interfaces",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "TS-14 (Generic Functions)",
      },
      {
        code: "TS-16",
        stepNumber: 3,
        slug: "ts16-generic-constraints",
        name: "Generic Constraints (extends)",
        desc: "Restricting type parameters to guarantee properties with <T extends HasId>.",
        path: "/learn/typescript/ts16-generic-constraints",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "TS-14 (Generic Functions)",
      },
      {
        code: "TS-17",
        stepNumber: 4,
        slug: "ts17-generics-keyof",
        name: "Generics with keyof & Property Lookup",
        desc: "Combining K extends keyof T with T[K] for 100% type-safe object property access.",
        path: "/learn/typescript/ts17-generics-keyof",
        tag: "BUILD",
        estimatedMinutes: 30,
        prerequisite: "TS-16 (Generic Constraints)",
      },
    ],
  },
  {
    id: "stage-5",
    stageNumber: 5,
    name: "Classes & Object-Oriented TypeScript",
    subtitle: "Class Typing, Parameter Properties & Abstract Classes",
    milestone: "Master TypeScript-specific class mechanics and type contracts.",
    description: "Learn how TypeScript enhances classes with access modifiers, parameter properties, readonly fields, abstract classes, and interface implementation.",
    theme: {
      badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      dot: "bg-indigo-400",
      border: "border-indigo-500/30",
      bgSubtle: "bg-indigo-500/[0.03]",
      textAccent: "text-indigo-400",
    },
    lessons: [
      {
        code: "TS-18",
        stepNumber: 1,
        slug: "ts18-class-access-modifiers",
        name: "Class Fields & Access Modifiers",
        desc: "public, private, protected, readonly, and the difference between TS private and JS #private.",
        path: "/learn/typescript/ts18-class-access-modifiers",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "TS-04 (Object Types)",
      },
      {
        code: "TS-19",
        stepNumber: 2,
        slug: "ts19-parameter-properties",
        name: "Parameter Properties & Getters/Setters",
        desc: "Constructor parameter property shorthand and type-safe getter/setter accessors.",
        path: "/learn/typescript/ts19-parameter-properties",
        tag: "BUILD",
        estimatedMinutes: 20,
        prerequisite: "TS-18 (Class Access Modifiers)",
      },
      {
        code: "TS-20",
        stepNumber: 3,
        slug: "ts20-abstract-classes",
        name: "Abstract Classes & Interface Implementation",
        desc: "abstract class vs interface: Base blueprint enforcement and polymorphism in TypeScript.",
        path: "/learn/typescript/ts20-abstract-classes",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "TS-18 (Class Access Modifiers)",
      },
    ],
  },
  {
    id: "stage-6",
    stageNumber: 6,
    name: "Advanced Type System",
    subtitle: "Conditional Types, infer, Mapped Types & Utilities",
    milestone: "Unlock the full expressive power of TypeScript's meta-programming type level.",
    description: "Understand indexed access types, conditional types, infer keyword, mapped types, template literal types, and built-in utility types.",
    theme: {
      badge: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      dot: "bg-amber-400",
      border: "border-amber-500/30",
      bgSubtle: "bg-amber-500/[0.03]",
      textAccent: "text-amber-400",
    },
    lessons: [
      {
        code: "TS-21",
        stepNumber: 1,
        slug: "ts21-indexed-access-typeof",
        name: "Indexed Access & typeof Types",
        desc: "Lookup types (T[K]) and extracting types from existing runtime values using typeof.",
        path: "/learn/typescript/ts21-indexed-access-typeof",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "TS-17 (Generics with keyof)",
      },
      {
        code: "TS-22",
        stepNumber: 2,
        slug: "ts22-conditional-types-infer",
        name: "Conditional Types & infer",
        desc: "Type-level ternary expressions (T extends U ? X : Y) and pattern matching with infer R.",
        path: "/learn/typescript/ts22-conditional-types-infer",
        tag: "PROFESSIONAL",
        estimatedMinutes: 35,
        prerequisite: "TS-21 (Indexed Access & typeof)",
      },
      {
        code: "TS-23",
        stepNumber: 3,
        slug: "ts23-mapped-template-types",
        name: "Mapped Types & Template Literals",
        desc: "Transforming object keys with [K in keyof T] and string pattern types with `${A}_${B}`.",
        path: "/learn/typescript/ts23-mapped-template-types",
        tag: "PROFESSIONAL",
        estimatedMinutes: 30,
        prerequisite: "TS-21 (Indexed Access & typeof)",
      },
      {
        code: "TS-24",
        stepNumber: 4,
        slug: "ts24-utility-types",
        name: "Built-in Utility Types",
        desc: "Deep dive into Partial, Required, Readonly, Record, Pick, Omit, Exclude, and ReturnType.",
        path: "/learn/typescript/ts24-utility-types",
        tag: "CORE",
        estimatedMinutes: 30,
        prerequisite: "TS-21 (Indexed Access & typeof)",
      },
    ],
  },
  {
    id: "stage-7",
    stageNumber: 7,
    name: "Modules, Configuration & Compilation",
    subtitle: "tsconfig.json, Strict Mode & Type Erasure",
    milestone: "Understand how the TypeScript compiler builds and validates real projects.",
    description: "Master ES modules, import type, tsconfig.json compiler flags, strict mode benefits, declaration files (.d.ts), and the runtime erasure rule.",
    theme: {
      badge: "bg-teal-500/10 text-teal-300 border-teal-500/20",
      dot: "bg-teal-400",
      border: "border-teal-500/30",
      bgSubtle: "bg-teal-500/[0.03]",
      textAccent: "text-teal-400",
    },
    lessons: [
      {
        code: "TS-25",
        stepNumber: 1,
        slug: "ts25-modules-type-imports",
        name: "ES Modules & Type-Only Imports",
        desc: "Importing and exporting types cleanly with 'import type' and 'export type'.",
        path: "/learn/typescript/ts25-modules-type-imports",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "TS-09 (Type vs Interface)",
      },
      {
        code: "TS-26",
        stepNumber: 2,
        slug: "ts26-tsconfig-strict-mode",
        name: "tsconfig.json & Strict Flags",
        desc: "Essential compiler options: target, module, strict, noImplicitAny, and strictNullChecks.",
        path: "/learn/typescript/ts26-tsconfig-strict-mode",
        tag: "PROFESSIONAL",
        estimatedMinutes: 25,
        prerequisite: "TS-25 (ES Modules)",
      },
      {
        code: "TS-27",
        stepNumber: 3,
        slug: "ts27-declarations-type-erasure",
        name: "Declaration Files & Type Erasure",
        desc: "Ambient declarations (.d.ts), @types packages, and understanding that types disappear at runtime.",
        path: "/learn/typescript/ts27-declarations-type-erasure",
        tag: "PROFESSIONAL",
        estimatedMinutes: 25,
        prerequisite: "TS-26 (tsconfig.json)",
      },
    ],
  },
  {
    id: "stage-8",
    stageNumber: 8,
    name: "Practical TypeScript Patterns",
    subtitle: "Real-World Typing, satisfies & Error Handling",
    milestone: "Apply TypeScript to real application workflows without turning to unsafe escape hatches.",
    description: "Learn type assertions vs the satisfies operator, safe catch error handling with unknown, typing API payloads, and immutability with as const.",
    theme: {
      badge: "bg-rose-500/10 text-rose-300 border-rose-500/20",
      dot: "bg-rose-400",
      border: "border-rose-500/30",
      bgSubtle: "bg-rose-500/[0.03]",
      textAccent: "text-rose-400",
    },
    lessons: [
      {
        code: "TS-28",
        stepNumber: 1,
        slug: "ts28-assertions-vs-satisfies",
        name: "Type Assertions vs satisfies",
        desc: "Why 'as Type' can lie to the compiler and how the 'satisfies' operator provides safe validation.",
        path: "/learn/typescript/ts28-assertions-vs-satisfies",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "TS-24 (Utility Types)",
      },
      {
        code: "TS-29",
        stepNumber: 2,
        slug: "ts29-safe-error-handling",
        name: "Safe Error Handling with unknown",
        desc: "Why catch errors are typed as unknown and how to write custom error narrowing guards.",
        path: "/learn/typescript/ts29-safe-error-handling",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "TS-11 (Custom Type Predicates)",
      },
      {
        code: "TS-30",
        stepNumber: 3,
        slug: "ts30-api-contracts-immutability",
        name: "Type-Safe API Contracts & Immutability",
        desc: "Modeling external network boundaries, deep readonly types, and 'as const' literal narrowing.",
        path: "/learn/typescript/ts30-api-contracts-immutability",
        tag: "BUILD",
        estimatedMinutes: 30,
        prerequisite: "TS-28 (Assertions vs satisfies)",
      },
    ],
  },
  {
    id: "stage-9",
    stageNumber: 9,
    name: "Debugging & Best Practices",
    subtitle: "Error Diagnostics, Code Smells & Interview Prep",
    milestone: "Read complex error messages with ease and write clean, idiomatic, maintainable types.",
    description: "Learn how to dissect compiler error traces, avoid over-engineering types, adhere to production type design principles, and prepare for interviews.",
    theme: {
      badge: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    capstone: TYPESCRIPT_CAPSTONE,
    lessons: [
      {
        code: "TS-31",
        stepNumber: 1,
        slug: "ts31-debugging-compiler-errors",
        name: "Deciphering Complex Compiler Errors",
        desc: "How to read and dissect deep compiler error messages, type mismatches, and excess property checks.",
        path: "/learn/typescript/ts31-debugging-compiler-errors",
        tag: "PROFESSIONAL",
        estimatedMinutes: 25,
        prerequisite: "TS-26 (tsconfig.json)",
      },
      {
        code: "TS-32",
        stepNumber: 2,
        slug: "ts32-type-architecture-smells",
        name: "Clean Type Architecture & Smells",
        desc: "Avoiding over-complicated types, self-documenting type design, interview questions, and capstone prep.",
        path: "/learn/typescript/ts32-type-architecture-smells",
        tag: "PROFESSIONAL",
        estimatedMinutes: 30,
        prerequisite: "TS-31 (Debugging Compiler Errors)",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// 9 Sequential Progression Phases (Matching UI Stepper)
// ─────────────────────────────────────────────────────────────

export const TYPESCRIPT_PROGRESSION_PHASES: ProgressionPhaseMeta[] = [
  {
    id: "fundamentals",
    phaseNumber: 1,
    label: "Fundamentals & Primitives",
    tag: "Phase 01",
    desc: "Static typing mental model, primitive types, arrays, tuples, objects & special types",
    scope: "Language Basics & Types",
    icon: "zap",
    lessonCodes: ["TS-01", "TS-02", "TS-03", "TS-04", "TS-05"],
  },
  {
    id: "functions-composition",
    phaseNumber: 2,
    label: "Functions & Composition",
    tag: "Phase 02",
    desc: "Function types, overloads, unions, intersections, and type vs interface",
    scope: "Contracts & Signatures",
    icon: "server",
    lessonCodes: ["TS-06", "TS-07", "TS-08", "TS-09"],
  },
  {
    id: "narrowing",
    phaseNumber: 3,
    label: "Narrowing & Control Flow",
    tag: "Phase 03",
    desc: "Type guards, user predicates, discriminated unions & exhaustiveness checking",
    scope: "Control Flow Analysis",
    icon: "shield",
    lessonCodes: ["TS-10", "TS-11", "TS-12", "TS-13"],
  },
  {
    id: "generics",
    phaseNumber: 4,
    label: "Generics & Abstraction",
    tag: "Phase 04",
    desc: "Generic functions, generic interfaces, constraints (extends) & keyof",
    scope: "Parametric Polymorphism",
    icon: "layers",
    lessonCodes: ["TS-14", "TS-15", "TS-16", "TS-17"],
  },
  {
    id: "classes",
    phaseNumber: 5,
    label: "Classes & OO TypeScript",
    tag: "Phase 05",
    desc: "Class typing, access modifiers, parameter properties & abstract classes",
    scope: "Class-Based Contracts",
    icon: "server",
    lessonCodes: ["TS-18", "TS-19", "TS-20"],
  },
  {
    id: "advanced-types",
    phaseNumber: 6,
    label: "Advanced Type System",
    tag: "Phase 06",
    desc: "Indexed access, conditional types, infer, mapped types & utility types",
    scope: "Type-Level Metaprogramming",
    icon: "zap",
    lessonCodes: ["TS-21", "TS-22", "TS-23", "TS-24"],
  },
  {
    id: "compilation",
    phaseNumber: 7,
    label: "Modules & Compilation",
    tag: "Phase 07",
    desc: "ES modules, type-only imports, tsconfig.json, strict mode & declaration files",
    scope: "Compiler & Project Setup",
    icon: "layers",
    lessonCodes: ["TS-25", "TS-26", "TS-27"],
  },
  {
    id: "practical-patterns",
    phaseNumber: 8,
    label: "Practical Patterns",
    tag: "Phase 08",
    desc: "Assertions vs satisfies, safe error handling with unknown & API contracts",
    scope: "Production Workflows",
    icon: "shield",
    lessonCodes: ["TS-28", "TS-29", "TS-30"],
  },
  {
    id: "debugging-best-practices",
    phaseNumber: 9,
    label: "Debugging & Mastery",
    tag: "Phase 09",
    desc: "Deciphering compiler errors, clean type architecture, interview prep & Capstone",
    scope: "Professional Polish & Capstone",
    icon: "layers",
    lessonCodes: ["TS-31", "TS-32"],
  },
];

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
  return getAllLessons().find(
    (l) =>
      l.slug === slug || l.path.endsWith(`/${slug}`) || l.path.includes(slug),
  );
}

export function getLessonByCode(code: string): LessonMeta | undefined {
  return getAllLessons().find(
    (l) => l.code.toUpperCase() === code.toUpperCase(),
  );
}

export function getStageByLessonSlug(slug: string): StageMeta | undefined {
  return TYPESCRIPT_STAGES.find((stage) =>
    stage.lessons.some(
      (l) =>
        l.slug === slug || l.path.endsWith(`/${slug}`) || l.path.includes(slug),
    ),
  );
}

export function getNextLesson(currentSlug: string): LessonMeta | null {
  const all = getAllLessons();
  const index = all.findIndex(
    (l) =>
      l.slug === currentSlug ||
      l.path.endsWith(`/${currentSlug}`) ||
      l.path.includes(currentSlug),
  );
  if (index >= 0 && index < all.length - 1) {
    return all[index + 1];
  }
  return null;
}

export function getPrevLesson(currentSlug: string): LessonMeta | null {
  const all = getAllLessons();
  const index = all.findIndex(
    (l) =>
      l.slug === currentSlug ||
      l.path.endsWith(`/${currentSlug}`) ||
      l.path.includes(currentSlug),
  );
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
        })),
    })),
  };
}
