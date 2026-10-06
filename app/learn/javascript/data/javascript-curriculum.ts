/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * JAVASCRIPT CURRICULUM — AUTHORITATIVE DATA LAYER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * The complete, foundational JavaScript curriculum for LearnCraft.
 *
 * Core Philosophy: "JavaScript teaches JavaScript — only the main things."
 * Prepares learners for TypeScript, OOP, React, Node.js, and NestJS.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

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
    desc: "Master the 4 pillars, SOLID principles, design patterns, and enterprise system design.",
    badge: "Architecture",
    path: "/learn/oop",
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
  stageNumber: 8,
  slug: "task-workflow-manager",
  title: "Interactive Task & Workflow Manager",
  subtitle: "Final JavaScript Capstone Project",
  desc: "Build a complete, modular Task & Workflow Management application demonstrating ES modules, array methods, event delegation, async API calls, and persistent browser storage.",
  path: "/learn/javascript/projects/task-manager",
  badge: "🛠️ Capstone",
  xpReward: 300,
  estimatedMinutes: 60,
  prerequisites: ["JS-11", "JS-16", "JS-22", "JS-27", "JS-30"],
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
// 8 Stages (All 30 Comprehensive JavaScript Lessons)
// ─────────────────────────────────────────────────────────────

export const JS_STAGES: StageMeta[] = [
  {
    id: "stage-1",
    stageNumber: 1,
    name: "Foundations & Basics",
    subtitle: "Runtimes, Variables, Types, Operators & Control Flow",
    milestone: "Write your first JavaScript programs, store data safely, and control execution with logic.",
    description: "Learn how JavaScript executes code, store information using let/const, avoid type coercion traps, and make decisions with if/else and loops.",
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
        slug: "js01-how-javascript-runs",
        name: "How JavaScript Runs: The Runtime, Console & Statements",
        desc: "How the browser executes JavaScript line-by-line, using console.log, statements, and expressions.",
        path: "/learn/javascript/js01-how-javascript-runs",
        tag: "CORE",
        estimatedMinutes: 15,
        prerequisite: "None",
      },
      {
        code: "JS-02",
        stepNumber: 2,
        slug: "js02-variables-and-data-types",
        name: "Variables & Data Types: Storing Data with let & const",
        desc: "Store numbers, strings, and booleans safely; why const and let replace legacy var.",
        path: "/learn/javascript/js02-variables-and-data-types",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "JS-01",
      },
      {
        code: "JS-03",
        stepNumber: 3,
        slug: "js03-operators-and-equality",
        name: "Operators, Equality & Type Coercion: The === Rule",
        desc: "Arithmetic, logic, truthy/falsy values, and why strict equality (===) protects you from bugs.",
        path: "/learn/javascript/js03-operators-and-equality",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "JS-02",
      },
      {
        code: "JS-04",
        stepNumber: 4,
        slug: "js04-conditional-logic",
        name: "Conditional Logic: Decision Making with if/else & switch",
        desc: "Make decisions in code using if, else, ternary operators, and switch blocks with break.",
        path: "/learn/javascript/js04-conditional-logic",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "JS-03",
      },
      {
        code: "JS-05",
        stepNumber: 5,
        slug: "js05-loops-and-iteration",
        name: "Loops & Iteration: Repeating Work Without Repeating Code",
        desc: "Repeat tasks efficiently using for, while, and for...of loops without creating infinite loops.",
        path: "/learn/javascript/js05-loops-and-iteration",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "JS-04",
      },
    ],
  },
  {
    id: "stage-2",
    stageNumber: 2,
    name: "Functions, Scope & Closures",
    subtitle: "Reusable Blocks, Lexical Scope, Closures & Callbacks",
    milestone: "Package reusable logic into functions, master scope boundaries, and harness closures.",
    description: "Master parameters, return values, arrow functions, global vs block scope, closures with private memory, and higher-order callbacks.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "JS-06",
        stepNumber: 6,
        slug: "js06-functions-and-arrow-syntax",
        name: "Functions: Parameters, Return Values & Arrow Syntax",
        desc: "Write reusable functions, pass parameters, return values, and write concise arrow functions.",
        path: "/learn/javascript/js06-functions-and-arrow-syntax",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "JS-05",
      },
      {
        code: "JS-07",
        stepNumber: 7,
        slug: "js07-scope-global-function-block",
        name: "Scope: Global, Function, and Block Scope",
        desc: "Understand where variables live, one-way scope boundaries, and block scoping with let/const.",
        path: "/learn/javascript/js07-scope-global-function-block",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "JS-06",
      },
      {
        code: "JS-08",
        stepNumber: 8,
        slug: "js08-closures",
        name: "Closures: How Functions Remember Their Birthplace",
        desc: "How functions carry a backpack of variables from their outer scope even after the outer function ends.",
        path: "/learn/javascript/js08-closures",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "JS-07",
      },
      {
        code: "JS-09",
        stepNumber: 9,
        slug: "js09-callbacks-and-higher-order-functions",
        name: "Callbacks & Higher-Order Functions: Functions as Data",
        desc: "Treat functions like variables: pass callbacks to other functions and return customized functions.",
        path: "/learn/javascript/js09-callbacks-and-higher-order-functions",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "JS-08",
      },
    ],
  },
  {
    id: "stage-3",
    stageNumber: 3,
    name: "Collections: Arrays & Objects",
    subtitle: "Ordered Lists, Key-Value Pairs, Array Methods & References",
    milestone: "Manage complex data with arrays, objects, and powerful methods like map, filter, and reduce.",
    description: "Learn how to store lists of items, manipulate objects, use declarative array methods, and understand reference copying.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "JS-10",
        stepNumber: 10,
        slug: "js10-arrays-and-indexing",
        name: "Arrays & Indexing: Managing Ordered Lists",
        desc: "Create lists, access elements by zero-based index, and use essential push/pop/slice tools.",
        path: "/learn/javascript/js10-arrays-and-indexing",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "JS-09",
      },
      {
        code: "JS-11",
        stepNumber: 11,
        slug: "js11-essential-array-methods",
        name: "Essential Array Methods: map, filter, find & reduce",
        desc: "Transform arrays with map, filter items with criteria, search with find, and calculate totals with reduce.",
        path: "/learn/javascript/js11-essential-array-methods",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "JS-10",
      },
      {
        code: "JS-12",
        stepNumber: 12,
        slug: "js12-objects-and-methods",
        name: "Objects: Key-Value Pairs, Methods & Property Access",
        desc: "Model real-world entities with properties and methods using dot and bracket notation.",
        path: "/learn/javascript/js12-objects-and-methods",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "JS-11",
      },
      {
        code: "JS-13",
        stepNumber: 13,
        slug: "js13-object-references-and-copying",
        name: "Object References & Immutability: Shallow vs Deep Copy",
        desc: "Understand memory references: why modifying a copied object can accidentally change the original.",
        path: "/learn/javascript/js13-object-references-and-copying",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "JS-12",
      },
    ],
  },
  {
    id: "stage-4",
    stageNumber: 4,
    name: "Modern JavaScript Syntax (ES6+)",
    subtitle: "Destructuring, Spread/Rest, Optional Chaining & Nullish Coalescing",
    milestone: "Write concise, modern JavaScript using ES6+ syntax used across all modern frameworks.",
    description: "Unpack data with destructuring, merge collections with spread/rest, and safely navigate objects with optional chaining.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "JS-14",
        stepNumber: 14,
        slug: "js14-destructuring",
        name: "Destructuring: Unpacking Objects & Arrays with Ease",
        desc: "Extract properties directly into named variables with fallback defaults and key renaming.",
        path: "/learn/javascript/js14-destructuring",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "JS-13",
      },
      {
        code: "JS-15",
        stepNumber: 15,
        slug: "js15-spread-and-rest-operators",
        name: "Spread & Rest Operators: Combining and Gathering (...)",
        desc: "Expand arrays/objects with spread, and gather variable function arguments with rest.",
        path: "/learn/javascript/js15-spread-and-rest-operators",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "JS-14",
      },
      {
        code: "JS-16",
        stepNumber: 16,
        slug: "js16-optional-chaining-and-nullish-coalescing",
        name: "Optional Chaining (?.) & Nullish Coalescing (??)",
        desc: "Prevent 'cannot read property of undefined' crashes with safe chaining and smart defaults.",
        path: "/learn/javascript/js16-optional-chaining-and-nullish-coalescing",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "JS-15",
      },
    ],
  },
  {
    id: "stage-5",
    stageNumber: 5,
    name: "Object-Oriented JS & Prototypes",
    subtitle: "The 'this' Keyword, Prototype Chain, Classes, extends & super",
    milestone: "Understand how JavaScript implements object-oriented behavior under the hood.",
    description: "Learn what 'this' points to, how prototype property lookup works, and write clean modern classes with extends and super.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "JS-17",
        stepNumber: 17,
        slug: "js17-the-this-keyword",
        name: "The this Keyword: Who Called Me?",
        desc: "How this dynamically changes based on how a function is called, and lexical this in arrow functions.",
        path: "/learn/javascript/js17-the-this-keyword",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "JS-16",
      },
      {
        code: "JS-18",
        stepNumber: 18,
        slug: "js18-prototypes-and-prototype-chain",
        name: "Prototypes & The Prototype Chain: JavaScript's Inheritance",
        desc: "How objects share methods via prototypes and search up the prototype chain for properties.",
        path: "/learn/javascript/js18-prototypes-and-prototype-chain",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "JS-17",
      },
      {
        code: "JS-19",
        stepNumber: 19,
        slug: "js19-classes-extends-and-super",
        name: "Classes, Constructors, extends & super",
        desc: "Modern class syntax, constructor functions, inheritance with extends, and calling super().",
        path: "/learn/javascript/js19-classes-extends-and-super",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "JS-18",
      },
    ],
  },
  {
    id: "stage-6",
    stageNumber: 6,
    name: "Asynchronous JavaScript & Event Loop",
    subtitle: "Promises, Async/Await, Non-blocking I/O & The Event Loop",
    milestone: "Master asynchronous code execution, handle future values with Promises, and write async/await.",
    description: "Understand why JS never freezes, work with Promises (.then/.catch), write linear async/await workflows, and understand the Event Loop.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "JS-20",
        stepNumber: 20,
        slug: "js20-synchronous-vs-asynchronous",
        name: "Synchronous vs Asynchronous: Why JavaScript Never Freezes",
        desc: "Single-threaded non-blocking execution, timers with setTimeout, and why async code is necessary.",
        path: "/learn/javascript/js20-synchronous-vs-asynchronous",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "JS-19",
      },
      {
        code: "JS-21",
        stepNumber: 21,
        slug: "js21-promises-and-chaining",
        name: "Promises: Managing Future Values with .then() & .catch()",
        desc: "Promise states (pending, fulfilled, rejected), resolving values, catching errors, and chaining.",
        path: "/learn/javascript/js21-promises-and-chaining",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "JS-20",
      },
      {
        code: "JS-22",
        stepNumber: 22,
        slug: "js22-async-await",
        name: "Async/Await: Clean Asynchronous Workflows",
        desc: "Write asynchronous code that reads like synchronous code, using async, await, and try/catch.",
        path: "/learn/javascript/js22-async-await",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "JS-21",
      },
      {
        code: "JS-23",
        stepNumber: 23,
        slug: "js23-the-event-loop",
        name: "The Event Loop & Concurrency: Call Stack & Task Queues",
        desc: "The Call Stack, Web APIs, Microtasks (Promises), and Macrotasks (Timers) execution order.",
        path: "/learn/javascript/js23-the-event-loop",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "JS-22",
      },
    ],
  },
  {
    id: "stage-7",
    stageNumber: 7,
    name: "Errors, Modules & APIs",
    subtitle: "Error Handling, ES Modules, JSON & The Fetch API",
    milestone: "Catch errors gracefully, organize code with ES modules, and communicate with real REST APIs.",
    description: "Use try/catch/finally for resilient apps, organize files with import/export, parse JSON data, and fetch data from HTTP APIs.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "JS-24",
        stepNumber: 24,
        slug: "js24-error-handling",
        name: "Error Handling: try, catch, finally & throw",
        desc: "Prevent crashes using try/catch/finally, throw custom errors, and inspect error messages.",
        path: "/learn/javascript/js24-error-handling",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "JS-23",
      },
      {
        code: "JS-25",
        stepNumber: 25,
        slug: "js25-es-modules",
        name: "ES Modules: Organizing Code with import & export",
        desc: "Split code into clean reusable files using named exports, default exports, and import statements.",
        path: "/learn/javascript/js25-es-modules",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "JS-24",
      },
      {
        code: "JS-26",
        stepNumber: 26,
        slug: "js26-working-with-json",
        name: "Working with JSON: Parsing and Serializing Data",
        desc: "Convert JavaScript objects to JSON text (stringify) and parse JSON text back to objects (parse).",
        path: "/learn/javascript/js26-working-with-json",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "JS-25",
      },
      {
        code: "JS-27",
        stepNumber: 27,
        slug: "js27-the-fetch-api",
        name: "The Fetch API: Communicating with REST APIs",
        desc: "Make GET and POST requests, send JSON payloads, check response.ok, and handle API errors.",
        path: "/learn/javascript/js27-the-fetch-api",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "JS-26",
      },
    ],
  },
  {
    id: "stage-8",
    stageNumber: 8,
    name: "Browser Essentials, Debugging & Capstone",
    subtitle: "DOM, Events, Event Delegation, LocalStorage & Final Project",
    milestone: "Interact with the browser page, handle user events efficiently, and complete the Capstone App.",
    description: "Learn DOM manipulation, event bubbling & delegation, persistent localStorage, DevTools debugging, and build the Capstone Project.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    capstone: JS_CAPSTONE,
    lessons: [
      {
        code: "JS-28",
        stepNumber: 28,
        slug: "js28-dom-essentials",
        name: "Browser DOM Essentials: Selecting & Modifying Elements",
        desc: "Select HTML elements with querySelector, update textContent, and toggle CSS classes dynamically.",
        path: "/learn/javascript/js28-dom-essentials",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "JS-27",
      },
      {
        code: "JS-29",
        stepNumber: 29,
        slug: "js29-events-and-delegation",
        name: "Events, Event Listeners & Event Delegation",
        desc: "Listen for clicks and inputs, manage event bubbling, and use event delegation for dynamic lists.",
        path: "/learn/javascript/js29-events-and-delegation",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "JS-28",
      },
      {
        code: "JS-30",
        stepNumber: 30,
        slug: "js30-browser-storage-and-debugging",
        name: "Browser Storage (localStorage) & DevTools Debugging",
        desc: "Persist user data across browser refreshes with localStorage, and debug code with browser DevTools.",
        path: "/learn/javascript/js30-browser-storage-and-debugging",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "JS-29",
      },
    ],
  },
];

export const JS_PROGRESSION_PHASES: ProgressionPhaseMeta[] = [
  {
    id: "foundations",
    phaseNumber: 1,
    label: "Foundations & Basics",
    tag: "Phase 01",
    desc: "Runtime, variables, let/const, types, operators, conditionals & loops",
    scope: "Core Syntax & Logic",
    icon: "layers",
    lessonCodes: ["JS-01", "JS-02", "JS-03", "JS-04", "JS-05"],
  },
  {
    id: "functions-scope",
    phaseNumber: 2,
    label: "Functions, Scope & Closures",
    tag: "Phase 02",
    desc: "Parameters, return values, arrow functions, block scope, closures & callbacks",
    scope: "Execution & Memory",
    icon: "zap",
    lessonCodes: ["JS-06", "JS-07", "JS-08", "JS-09"],
  },
  {
    id: "collections",
    phaseNumber: 3,
    label: "Arrays & Objects",
    tag: "Phase 03",
    desc: "Array indexing, map/filter/reduce, object properties, methods & reference copying",
    scope: "Data Collections",
    icon: "server",
    lessonCodes: ["JS-10", "JS-11", "JS-12", "JS-13"],
  },
  {
    id: "modern-syntax",
    phaseNumber: 4,
    label: "Modern ES6+ Syntax",
    tag: "Phase 04",
    desc: "Destructuring, spread/rest (...), optional chaining (?.) & nullish coalescing (??)",
    scope: "Modern Productivity",
    icon: "zap",
    lessonCodes: ["JS-14", "JS-15", "JS-16"],
  },
  {
    id: "oop-prototypes",
    phaseNumber: 5,
    label: "Objects & Prototypes",
    tag: "Phase 05",
    desc: "The this keyword, prototype chain, classes, constructors, extends & super",
    scope: "Object Model",
    icon: "shield",
    lessonCodes: ["JS-17", "JS-18", "JS-19"],
  },
  {
    id: "async-event-loop",
    phaseNumber: 6,
    label: "Async JS & Event Loop",
    tag: "Phase 06",
    desc: "Non-blocking I/O, Promises, async/await, call stack, microtasks & event loop",
    scope: "Asynchronous Flow",
    icon: "zap",
    lessonCodes: ["JS-20", "JS-21", "JS-22", "JS-23"],
  },
  {
    id: "errors-modules-apis",
    phaseNumber: 7,
    label: "Errors, Modules & APIs",
    tag: "Phase 07",
    desc: "Try/catch error handling, ES modules (import/export), JSON & the Fetch API",
    scope: "Network & Modular Code",
    icon: "server",
    lessonCodes: ["JS-24", "JS-25", "JS-26", "JS-27"],
  },
  {
    id: "browser-capstone",
    phaseNumber: 8,
    label: "Browser, Debugging & Capstone",
    tag: "Phase 08",
    desc: "DOM manipulation, event delegation, localStorage, DevTools & final project",
    scope: "Mastery & Capstone",
    icon: "layers",
    lessonCodes: ["JS-28", "JS-29", "JS-30"],
  },
];

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
  return JS_STAGES.find((stage) =>
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
    JS_PROGRESSION_PHASES.find((p) => p.id === phaseId) ||
    JS_PROGRESSION_PHASES[0];
  const all = getAllLessons();
  return phase.lessonCodes
    .map((code) => all.find((l) => l.code === code))
    .filter((l): l is LessonMeta => l !== undefined);
}
