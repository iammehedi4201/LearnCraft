/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * JAVASCRIPT CURRICULUM — AUTHORITATIVE DATA LAYER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * The complete, foundational JavaScript curriculum for LearnCraft based on
 * the authoritative curriculum:
 * Part 1: JavaScript Foundations (Lessons 1-8: JS-01 through JS-08)
 * Part 2: Working with Data (Lessons 9-13: JS-09 through JS-13)
 * Part 3: Functions and Behavior (Lessons 14-17: JS-14 through JS-17)
 * Part 4: Async JavaScript & Real Applications (Lessons 18-22: JS-18 through JS-22)
 *
 * Core Philosophy: "JavaScript teaches JavaScript — only the main things."
 * Prepares learners for TypeScript, OOP, React, Node.js, and NestJS.
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

export const JS_PREREQUISITES: PrerequisiteTopicMeta[] = [
  {
    id: "prereq-web-basics",
    title: "Basic Web Concepts",
    desc: "Understanding what websites are, how browsers load pages, and basic computer navigation.",
    tag: "Recommended Foundation",
    badge: "Basics",
    path: "/roadmaps?category=language#skill-roadmaps",
    level: "Absolute Beginner",
  },
];

export const JS_RELATED_TOPICS: RelatedTopicMeta[] = [
  {
    id: "rel-ts",
    title: "TypeScript",
    desc: "Add static type safety, interfaces, and compiler diagnostics to your JavaScript skills.",
    badge: "Language",
    path: "/learn/typescript",
  },
  {
    id: "rel-oop",
    title: "Object-Oriented Programming (OOP)",
    desc: "Master classes, encapsulation, inheritance, interfaces, polymorphism, and dependency injection in TypeScript.",
    badge: "Architecture",
    path: "/learn/typescript",
  },
  {
    id: "rel-react",
    title: "React",
    desc: "Build dynamic, declarative user interfaces with components, hooks, and modern state management.",
    badge: "Frontend",
    path: "/learn/react",
  },
  {
    id: "rel-nestjs",
    title: "NestJS",
    desc: "Enterprise backend architecture powered by dependency injection and modular design.",
    badge: "Backend",
    path: "/learn/nestjs",
  },
];

// ─────────────────────────────────────────────────────────────
// Final Capstone Project (Pure Vanilla JS App)
// ─────────────────────────────────────────────────────────────

export const JS_CAPSTONE: CapstoneProjectMeta = {
  id: "capstone-task-manager",
  stageNumber: 4,
  slug: "task-workflow-manager",
  title: "Interactive Task & Workflow Manager",
  subtitle: "Final JavaScript Capstone Project",
  desc: "Build a complete, modular Task & Workflow Management application demonstrating ES modules, array methods, event delegation, async API calls, and persistent browser storage.",
  path: "/learn/javascript/projects/task-manager",
  badge: "🛠️ Capstone",
  xpReward: 300,
  estimatedMinutes: 60,
  prerequisites: ["JS-09", "JS-10", "JS-14", "JS-18", "JS-21", "JS-22"],
  skillsTaught: [
    "State management using Arrays & Objects",
    "DOM manipulation and dynamic UI rendering",
    "Event delegation for dynamic interactive lists",
    "Asynchronous data sync with simulated REST APIs",
    "Persistent data storage with LocalStorage & JSON",
    "Modular architecture with ES import/export",
  ],
  stepsCount: 5,
};

// ─────────────────────────────────────────────────────────────
// 4 Stages (All 22 Authoritative JavaScript Lessons)
// ─────────────────────────────────────────────────────────────

export const JS_STAGES: StageMeta[] = [
  {
    id: "stage-1",
    stageNumber: 1,
    name: "JavaScript Foundations",
    subtitle: "Runtimes, Variables, Types, Operators, Logic & Functions",
    milestone: "Master JavaScript fundamentals: how code executes, variables, basic types, comparisons, conditionals, loops, functions, and block scope.",
    description: "Learn where JavaScript runs, store information safely using const and let, compare values reliably with strict equality (===), control flow with conditionals and loops, package reusable functions, and master block scope.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "JS-01",
        stepNumber: 1,
        slug: "js01-what-javascript-does",
        name: "What JavaScript Does",
        desc: "Understand where JavaScript runs (browser vs Node.js) and what it is responsible for in modern web applications.",
        path: "/learn/javascript/js01-what-javascript-does",
        tag: "CORE",
        difficulty: "Easy",
        estimatedMinutes: 15,
        prerequisite: "None",
      },
      {
        code: "JS-02",
        stepNumber: 2,
        slug: "js02-variables-const-and-let",
        name: "Variables: const and let",
        desc: "Learn how to store values in memory using const and let, and why var is avoided in modern code.",
        path: "/learn/javascript/js02-variables-const-and-let",
        tag: "CORE",
        difficulty: "Easy",
        estimatedMinutes: 15,
        prerequisite: "JS-01",
      },
      {
        code: "JS-03",
        stepNumber: 3,
        slug: "js03-basic-values-and-types",
        name: "Basic Values and Types",
        desc: "Master the primary JavaScript data types: string, number, boolean, null, undefined, and object.",
        path: "/learn/javascript/js03-basic-values-and-types",
        tag: "CORE",
        difficulty: "Easy",
        estimatedMinutes: 15,
        prerequisite: "JS-02",
      },
      {
        code: "JS-04",
        stepNumber: 4,
        slug: "js04-comparisons-and-strict-equality",
        name: "Comparisons and Strict Equality (=== vs ==)",
        desc: "Compare values reliably with strict equality (===) and avoid silent type coercion bugs caused by loose equality (==).",
        path: "/learn/javascript/js04-comparisons-and-strict-equality",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "JS-03",
      },
      {
        code: "JS-05",
        stepNumber: 5,
        slug: "js05-conditions-and-truthy-falsy",
        name: "Conditions and Truthy/Falsy Values",
        desc: "Make decisions with if/else statements and understand how JavaScript treats values in boolean contexts.",
        path: "/learn/javascript/js05-conditions-and-truthy-falsy",
        tag: "CORE",
        difficulty: "Easy",
        estimatedMinutes: 20,
        prerequisite: "JS-04",
      },
      {
        code: "JS-06",
        stepNumber: 6,
        slug: "js06-loops",
        name: "Loops (for, while, for...of)",
        desc: "Repeat actions safely and iterate over arrays and collections without creating infinite loops.",
        path: "/learn/javascript/js06-loops",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "JS-05",
      },
      {
        code: "JS-07",
        stepNumber: 7,
        slug: "js07-functions-and-return-values",
        name: "Functions and Return Values",
        desc: "Package reusable logic into functions, accept parameters, and return calculated results.",
        path: "/learn/javascript/js07-functions-and-return-values",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "JS-06",
      },
      {
        code: "JS-08",
        stepNumber: 8,
        slug: "js08-scope-and-block-scope",
        name: "Global, Function, and Block Scope",
        desc: "Understand where variables live across global, function, and block scope, and why var is avoided in modern code.",
        path: "/learn/javascript/js08-scope-and-block-scope",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "JS-07",
      },
    ],
  },
  {
    id: "stage-2",
    stageNumber: 2,
    name: "Working with Data",
    subtitle: "Arrays, Objects, References, Nullish Operators & Spread/Rest",
    milestone: "Organize, manipulate, and transform collections safely using arrays, objects, reference awareness, and modern syntax.",
    description: "Store lists and transform them with array methods, model real-world entities with objects, understand primitive values vs object memory references, read nested fields safely with optional chaining, and master spread vs rest.",
    theme: {
      badge: "bg-blue-500/10 text-blue-300 border-blue-500/20",
      dot: "bg-blue-400",
      border: "border-blue-500/30",
      bgSubtle: "bg-blue-500/[0.03]",
      textAccent: "text-blue-400",
    },
    lessons: [
      {
        code: "JS-09",
        stepNumber: 1,
        slug: "js09-arrays-and-common-methods",
        name: "Arrays and Common Methods",
        desc: "Store ordered lists of data and transform them with map, filter, find, and forEach.",
        path: "/learn/javascript/js09-arrays-and-common-methods",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 25,
        prerequisite: "JS-08",
      },
      {
        code: "JS-10",
        stepNumber: 2,
        slug: "js10-objects-destructuring-and-spread",
        name: "Objects, Destructuring, and Spread",
        desc: "Model real-world entities with key-value pairs, unpack fields cleanly, and copy objects immutably.",
        path: "/learn/javascript/js10-objects-destructuring-and-spread",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 25,
        prerequisite: "JS-09",
      },
      {
        code: "JS-11",
        stepNumber: 3,
        slug: "js11-primitive-values-vs-object-references",
        name: "Primitive Values vs. Object References",
        desc: "Understand how JavaScript stores numbers/strings by value while objects and arrays share memory references.",
        path: "/learn/javascript/js11-primitive-values-vs-object-references",
        tag: "CORE",
        difficulty: "Difficult",
        estimatedMinutes: 20,
        prerequisite: "JS-10",
      },
      {
        code: "JS-12",
        stepNumber: 4,
        slug: "js12-optional-chaining-and-nullish-coalescing",
        name: "Optional Chaining (?.) and Nullish Coalescing (??)",
        desc: "Read nested properties safely without crashing and set reliable fallback defaults for null or undefined.",
        path: "/learn/javascript/js12-optional-chaining-and-nullish-coalescing",
        tag: "CORE",
        difficulty: "Easy",
        estimatedMinutes: 15,
        prerequisite: "JS-11",
      },
      {
        code: "JS-13",
        stepNumber: 5,
        slug: "js13-spread-vs-rest",
        name: "Spread vs. Rest",
        desc: "Know when the three dots (...) unpack values into collections vs collect multiple items into a single array.",
        path: "/learn/javascript/js13-spread-vs-rest",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "JS-12",
      },
    ],
  },
  {
    id: "stage-3",
    stageNumber: 3,
    name: "Functions and Behavior",
    subtitle: "Callbacks, Closures, Scoping, the this Keyword & Debugging",
    milestone: "Deepen your function mastery with higher-order callbacks, persistent closures, execution contexts, and robust error handling.",
    description: "Pass functions as arguments to build dynamic behaviors, understand how closures preserve variables across time, demystify what this points to, and catch exceptions safely with try/catch.",
    theme: {
      badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
      dot: "bg-emerald-400",
      border: "border-emerald-500/30",
      bgSubtle: "bg-emerald-500/[0.03]",
      textAccent: "text-emerald-400",
    },
    lessons: [
      {
        code: "JS-14",
        stepNumber: 1,
        slug: "js14-callbacks-and-higher-order-functions",
        name: "Callbacks and Higher-Order Functions",
        desc: "Pass functions as arguments to other functions to create dynamic, reusable behaviors and workflows.",
        path: "/learn/javascript/js14-callbacks-and-higher-order-functions",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 25,
        prerequisite: "JS-13",
      },
      {
        code: "JS-15",
        stepNumber: 2,
        slug: "js15-closures",
        name: "Closures",
        desc: "Learn how functions remember their outer variables even after the outer function has finished executing.",
        path: "/learn/javascript/js15-closures",
        tag: "CORE",
        difficulty: "Difficult",
        estimatedMinutes: 25,
        prerequisite: "JS-14",
      },
      {
        code: "JS-16",
        stepNumber: 3,
        slug: "js16-the-this-keyword",
        name: "The this Keyword (Practical Rules)",
        desc: "Master the practical rules of what this points to: object methods vs arrow functions.",
        path: "/learn/javascript/js16-the-this-keyword",
        tag: "CORE",
        difficulty: "Difficult",
        estimatedMinutes: 25,
        prerequisite: "JS-15",
      },
      {
        code: "JS-17",
        stepNumber: 4,
        slug: "js17-errors-and-debugging",
        name: "Errors and Basic Debugging",
        desc: "Handle exceptions safely with try...catch, inspect stack traces, and debug issues with console tools.",
        path: "/learn/javascript/js17-errors-and-debugging",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "JS-16",
      },
    ],
  },
  {
    id: "stage-4",
    stageNumber: 4,
    name: "Async JavaScript and Real Applications",
    subtitle: "Promises, Async/Await, Event Loop, DOM Events, APIs & Modules",
    milestone: "Connect JavaScript to the real world: asynchronous flow, browser events, network requests, and modular project architecture.",
    description: "Write clean async code with Promises and async/await, understand the event loop and single-threaded execution, listen to browser DOM events, fetch external API JSON data, and modularize code with ES import/export.",
    theme: {
      badge: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      dot: "bg-amber-400",
      border: "border-amber-500/30",
      bgSubtle: "bg-amber-500/[0.03]",
      textAccent: "text-amber-400",
    },
    capstone: JS_CAPSTONE,
    lessons: [
      {
        code: "JS-18",
        stepNumber: 1,
        slug: "js18-promises-and-async-await",
        name: "Promises and async / await",
        desc: "Manage asynchronous operations cleanly without callback hell using Promises and async/await.",
        path: "/learn/javascript/js18-promises-and-async-await",
        tag: "CORE",
        difficulty: "Difficult",
        estimatedMinutes: 25,
        prerequisite: "JS-17",
      },
      {
        code: "JS-19",
        stepNumber: 2,
        slug: "js19-the-event-loop-a-basic-view",
        name: "The Event Loop (A Basic View)",
        desc: "Understand the single-threaded call stack, task queues, and how JavaScript stays responsive while waiting.",
        path: "/learn/javascript/js19-the-event-loop-a-basic-view",
        tag: "CORE",
        difficulty: "Difficult",
        estimatedMinutes: 25,
        prerequisite: "JS-18",
      },
      {
        code: "JS-20",
        stepNumber: 3,
        slug: "js20-dom-events",
        name: "Connecting JS to the Browser: DOM Events",
        desc: "Listen to user interactions like clicks and input changes to make web pages interactive.",
        path: "/learn/javascript/js20-dom-events",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "JS-19",
      },
      {
        code: "JS-21",
        stepNumber: 4,
        slug: "js21-json-fetch-and-api-responses",
        name: "Working with JSON, fetch, and API Responses",
        desc: "Communicate with web servers: fetch external JSON data, parse responses, and handle HTTP errors.",
        path: "/learn/javascript/js21-json-fetch-and-api-responses",
        tag: "CORE",
        difficulty: "Difficult",
        estimatedMinutes: 25,
        prerequisite: "JS-20",
      },
      {
        code: "JS-22",
        stepNumber: 5,
        slug: "js22-javascript-modules",
        name: "JavaScript Modules (import / export)",
        desc: "Organize code into clean, maintainable files with export and import declarations.",
        path: "/learn/javascript/js22-javascript-modules",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "JS-21",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// 4 Progression Phases (Authoritative Curriculum Roadmap)
// ─────────────────────────────────────────────────────────────

export const JS_PROGRESSION_PHASES: ProgressionPhaseMeta[] = [
  {
    id: "phase-1-foundations",
    phaseNumber: 1,
    label: "JavaScript Foundations",
    tag: "Phase 01",
    desc: "Runtimes, variables, types, comparisons, conditionals, loops, functions & block scope",
    scope: "Core Syntax & Logic",
    icon: "zap",
    lessonCodes: [
      "JS-01",
      "JS-02",
      "JS-03",
      "JS-04",
      "JS-05",
      "JS-06",
      "JS-07",
      "JS-08",
    ],
  },
  {
    id: "phase-2-working-with-data",
    phaseNumber: 2,
    label: "Working with Data",
    tag: "Phase 02",
    desc: "Arrays, array methods, objects, references vs values, optional chaining, nullish coalescing & spread/rest",
    scope: "Data Structures & Immutability",
    icon: "layers",
    lessonCodes: [
      "JS-09",
      "JS-10",
      "JS-11",
      "JS-12",
      "JS-13",
    ],
  },
  {
    id: "phase-3-functions-and-behavior",
    phaseNumber: 3,
    label: "Functions and Behavior",
    tag: "Phase 03",
    desc: "Callbacks, higher-order functions, closures, the this keyword & error handling",
    scope: "Execution Context & Memory",
    icon: "shield",
    lessonCodes: [
      "JS-14",
      "JS-15",
      "JS-16",
      "JS-17",
    ],
  },
  {
    id: "phase-4-async-and-applications",
    phaseNumber: 4,
    label: "Async JavaScript & Real Applications",
    tag: "Phase 04",
    desc: "Promises, async/await, event loop, DOM events, fetch/JSON & ES modules",
    scope: "Modern Application Architecture",
    icon: "server",
    lessonCodes: [
      "JS-18",
      "JS-19",
      "JS-20",
      "JS-21",
      "JS-22",
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Backward Compatibility: Legacy Slug & Code Aliases
// Preserves all existing bookmarks, notes, quiz records, and progress
// ─────────────────────────────────────────────────────────────

export const JAVASCRIPT_LEGACY_SLUG_MAP: Record<string, string> = {
  "js01-how-javascript-runs": "js01-what-javascript-does",
  "js02-variables-and-data-types": "js02-variables-const-and-let",
  "js03-operators-and-equality": "js04-comparisons-and-strict-equality",
  "js04-conditional-logic": "js05-conditions-and-truthy-falsy",
  "js05-loops-and-iteration": "js06-loops",
  "js06-functions-and-arrow-syntax": "js07-functions-and-return-values",
  "js07-scope-global-function-block": "js08-scope-and-block-scope",
  "js08-closures": "js15-closures",
  "js09-callbacks-and-higher-order-functions": "js14-callbacks-and-higher-order-functions",
  "js10-arrays-and-indexing": "js09-arrays-and-common-methods",
  "js11-essential-array-methods": "js09-arrays-and-common-methods",
  "js12-objects-and-methods": "js10-objects-destructuring-and-spread",
  "js13-object-references-and-copying": "js11-primitive-values-vs-object-references",
  "js14-destructuring": "js10-objects-destructuring-and-spread",
  "js15-spread-and-rest-operators": "js13-spread-vs-rest",
  "js16-optional-chaining-and-nullish-coalescing": "js12-optional-chaining-and-nullish-coalescing",
  "js17-the-this-keyword": "js16-the-this-keyword",
  "js18-prototypes-and-prototype-chain": "js16-the-this-keyword",
  "js19-classes-extends-and-super": "js16-the-this-keyword",
  "js20-synchronous-vs-asynchronous": "js18-promises-and-async-await",
  "js21-promises-and-chaining": "js18-promises-and-async-await",
  "js22-async-await": "js18-promises-and-async-await",
  "js23-the-event-loop": "js19-the-event-loop-a-basic-view",
  "js24-error-handling": "js17-errors-and-debugging",
  "js25-es-modules": "js22-javascript-modules",
  "js26-working-with-json": "js21-json-fetch-and-api-responses",
  "js27-the-fetch-api": "js21-json-fetch-and-api-responses",
  "js28-dom-essentials": "js20-dom-events",
  "js29-events-and-delegation": "js20-dom-events",
  "js30-browser-storage-and-debugging": "js17-errors-and-debugging",
};

// ─────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────

export function getAllLessons(): LessonMeta[] {
  return JS_STAGES.flatMap((stage) => stage.lessons);
}

export function getStages(): StageMeta[] {
  return JS_STAGES;
}

export function getLessonBySlug(slug: string): LessonMeta | undefined {
  if (!slug) return undefined;
  const norm = slug.toLowerCase().trim();

  // 1. Check legacy slug map first to preserve bookmarks, notes, and quiz redirects
  if (JAVASCRIPT_LEGACY_SLUG_MAP[norm]) {
    const targetSlug = JAVASCRIPT_LEGACY_SLUG_MAP[norm];
    const target = getAllLessons().find(
      (l) => l.slug.toLowerCase() === targetSlug.toLowerCase()
    );
    if (target) return target;
  }

  // 2. Direct match on slug, path suffix, or substring
  const directMatch = getAllLessons().find(
    (l) =>
      l.slug.toLowerCase() === norm ||
      l.path.endsWith(`/${norm}`) ||
      l.path.toLowerCase().includes(norm)
  );
  if (directMatch) return directMatch;

  // 3. Match by normalized code (e.g. "js01", "js-01", "JS-01") or prefix
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
    (l) => l.code.toUpperCase() === code.toUpperCase()
  );
}

export function getStageByLessonSlug(slug: string): StageMeta | undefined {
  const lesson = getLessonBySlug(slug);
  if (!lesson) return undefined;
  return JS_STAGES.find((stage) =>
    stage.lessons.some((l) => l.slug === lesson.slug)
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
    JS_PROGRESSION_PHASES.find((p) => p.id === phaseId) ||
    JS_PROGRESSION_PHASES[0];
  const all = getAllLessons();
  return phase.lessonCodes
    .map((code) => all.find((l) => l.code === code))
    .filter((l): l is LessonMeta => l !== undefined);
}

export function getJavaScriptCourse(): Course {
  const allLessons = getAllLessons();
  return {
    id: "javascript",
    title: "Learn JavaScript",
    prerequisites: {
      items: [
        "Basic computer literacy and browsing the web",
        "Writing basic HTML tags and structure",
        "Opening the browser Developer Tools console (F12)",
      ],
      refresherHref: "/roadmaps?category=language#skill-roadmaps",
      refresherLabel: "New to web development? Open the Web Basics guide",
    },
    capstone: {
      title: JS_CAPSTONE.title,
      description:
        "Your finish line: build a complete, modular Task & Workflow Management application using everything you learn.",
      href: JS_CAPSTONE.path,
    },
    phases: JS_PROGRESSION_PHASES.map((phase) => ({
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
          aliases: Object.entries(JAVASCRIPT_LEGACY_SLUG_MAP)
            .filter(([_, target]) => target === l.slug)
            .map(([legacy]) => legacy),
        })),
    })),
  };
}
