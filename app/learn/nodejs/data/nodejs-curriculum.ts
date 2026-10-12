/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NODE.JS CURRICULUM DATA LAYER — LEARNCRAFT
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Authoritative curriculum metadata for Node.js:
 * 8 Phases, 24 Lessons, Capstone Project & Pedagogical Metadata.
 * 
 * Strict Topic Boundary: Pure Node.js runtime only.
 * Teaches runtime architecture, V8 + libuv, Event Loop, non-blocking I/O,
 * CommonJS & ESM, core modules (fs, path, os, process), EventEmitter, Buffers,
 * Streams, native HTTP server, async I/O, error handling, debugging & testing.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import type { Course } from "@/components/curriculum/types";

export interface LessonMeta {
  code: string;
  stepNumber: number;
  slug: string;
  name: string;
  desc: string;
  path: string;
  tag: "CORE" | "RUNTIME" | "STREAMS" | "HTTP" | "PATTERNS" | "CAPSTONE";
  estimatedMinutes: number;
  prerequisite?: string;
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

export const NODEJS_PREREQUISITES: PrerequisiteTopicMeta[] = [
  {
    id: "prereq-js",
    title: "JavaScript Fundamentals",
    desc: "Functions, arrow syntax, objects, arrays, Promises, async/await, closures, and ES modules.",
    tag: "Required Foundation",
    badge: "Core JS",
    path: "/learn/javascript",
    level: "Intermediate",
  },
];

export const NODEJS_RELATED_TOPICS: RelatedTopicMeta[] = [
  {
    id: "rel-express",
    title: "Express.js",
    desc: "Lightweight web layer, middleware pipeline, and production REST API development on Node.js.",
    badge: "Web Layer",
    path: "/learn/express",
  },
  {
    id: "rel-nestjs",
    title: "NestJS",
    desc: "Enterprise backend architecture, microservices, and dependency injection on Node.js.",
    badge: "Framework",
    path: "/learn/nestjs",
  },
  {
    id: "rel-ts",
    title: "TypeScript",
    desc: "Add strict static typing, interfaces, and compile-time guarantees to Node.js backends.",
    badge: "Language",
    path: "/learn/typescript",
  },
];

// ─────────────────────────────────────────────────────────────
// Final Capstone Project (Pure Node.js Core Server)
// ─────────────────────────────────────────────────────────────

export const NODEJS_CAPSTONE: CapstoneProjectMeta = {
  id: "capstone-task-server",
  stageNumber: 8,
  slug: "file-and-task-server",
  title: "File & Task Management Server",
  subtitle: "Final Node.js Capstone Project",
  desc: "Architect a complete, production-grade backend server strictly using Node.js core modules: HTTP request routing, streaming file storage, EventEmitter audit logging, and graceful process signals.",
  path: "/learn/nodejs/projects/task-server",
  badge: "🟢 Capstone",
  xpReward: 300,
  estimatedMinutes: 60,
  prerequisites: ["NODE-07", "NODE-09", "NODE-11", "NODE-14", "NODE-18"],
  skillsTaught: [
    "Native HTTP request parsing and URL routing without external frameworks",
    "Streaming file uploads and downloads with backpressure and memory efficiency",
    "Custom EventEmitter pub/sub for audit logs and lifecycle notifications",
    "Environment configuration and robust async error handling",
    "Process signal listeners (SIGTERM/SIGINT) for zero-downtime graceful shutdown",
    "Automated unit testing with the built-in node:test runner",
  ],
  stepsCount: 5,
};

// ─────────────────────────────────────────────────────────────
// Stages & All 24 Node.js Lessons
// ─────────────────────────────────────────────────────────────

export const NODEJS_STAGES: StageMeta[] = [
  {
    id: "stage-1",
    stageNumber: 1,
    name: "Node.js Fundamentals & Runtime Model",
    subtitle: "V8 Engine, Globals & The Event Loop",
    milestone: "Understand what Node.js is, how it executes outside the browser, and the non-blocking event-driven model.",
    description: "Learn why Node.js was created, the V8 execution engine, globals like process, and how the call stack and event loop coordinate async I/O.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "NODE-01",
        stepNumber: 1,
        slug: "node01-what-is-nodejs",
        name: "What Is Node.js? The JavaScript Server Runtime & V8 Engine",
        desc: "Why Node.js exists, running JavaScript outside the browser, the V8 engine, and libuv.",
        path: "/learn/nodejs/node01-what-is-nodejs",
        tag: "CORE",
        estimatedMinutes: 15,
        prerequisite: "None",
      },
      {
        code: "NODE-02",
        stepNumber: 2,
        slug: "node02-nodejs-vs-browser",
        name: "Node.js vs Browser: Globals, process & The Runtime Environment",
        desc: "Key differences from browser JS: no window/document, globalThis, process, and operating system access.",
        path: "/learn/nodejs/node02-nodejs-vs-browser",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "NODE-01",
      },
      {
        code: "NODE-03",
        stepNumber: 3,
        slug: "node03-event-loop-and-async-io",
        name: "The Event Loop & Non-Blocking I/O: Call Stack, Libuv & Queues",
        desc: "How Node.js executes code: Call Stack, Libuv Thread Pool, Event Loop phases, and Microtask queues.",
        path: "/learn/nodejs/node03-event-loop-and-async-io",
        tag: "RUNTIME",
        estimatedMinutes: 25,
        prerequisite: "NODE-02",
      },
    ],
  },
  {
    id: "stage-2",
    stageNumber: 2,
    name: "Modules & Package Management",
    subtitle: "CommonJS, ES Modules & npm",
    milestone: "Master code organization across files using require/import and manage external dependencies with npm.",
    description: "Learn CommonJS vs ES Modules, module caching, package.json scripts, SemVer versioning, and package-lock.json.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "NODE-04",
        stepNumber: 4,
        slug: "node04-commonjs-vs-esm",
        name: "CommonJS vs ES Modules: require vs import & Module Boundaries",
        desc: "require and module.exports vs import and export, module caching, and setting 'type': 'module'.",
        path: "/learn/nodejs/node04-commonjs-vs-esm",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "NODE-03",
      },
      {
        code: "NODE-05",
        stepNumber: 5,
        slug: "node05-npm-and-package-json",
        name: "npm, package.json & Dependencies: Scripts, SemVer & Lockfiles",
        desc: "Managing dependencies, devDependencies, package scripts, semantic versioning (^ vs ~), and lockfiles.",
        path: "/learn/nodejs/node05-npm-and-package-json",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "NODE-04",
      },
    ],
  },
  {
    id: "stage-3",
    stageNumber: 3,
    name: "Core APIs: File System & Paths",
    subtitle: "path, fs & Modern fs/promises",
    milestone: "Read, write, and manipulate files and directories safely across different operating systems.",
    description: "Learn path.join and path.resolve, sync vs async file operations, directory traversal, and modern fs/promises with async/await.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "NODE-06",
        stepNumber: 6,
        slug: "node06-path-module-and-filenames",
        name: "The Path Module: path.join, resolve & Cross-Platform Paths",
        desc: "Handle file paths safely across Windows and POSIX using path.join, path.resolve, and __dirname.",
        path: "/learn/nodejs/node06-path-module-and-filenames",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "NODE-05",
      },
      {
        code: "NODE-07",
        stepNumber: 7,
        slug: "node07-fs-module-reading-writing",
        name: "The File System (fs): Async Reading, Writing & Directories",
        desc: "Read files, write outputs, append logs, create directories, and inspect file stats with fs.",
        path: "/learn/nodejs/node07-fs-module-reading-writing",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "NODE-06",
      },
      {
        code: "NODE-08",
        stepNumber: 8,
        slug: "node08-fs-promises-safe-operations",
        name: "fs/promises & Safe File Operations: Modern async/await I/O",
        desc: "Use fs/promises for clean async/await file manipulation with robust error handling.",
        path: "/learn/nodejs/node08-fs-promises-safe-operations",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "NODE-07",
      },
    ],
  },
  {
    id: "stage-4",
    stageNumber: 4,
    name: "Events, Buffers & Binary Data",
    subtitle: "EventEmitter & Raw Memory Management",
    milestone: "Harness event-driven pub/sub architecture and handle binary chunks and raw byte buffers.",
    description: "Learn the EventEmitter class, event listening/emitting, Buffer allocation, encodings (utf-8, hex, base64), and binary safety.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "NODE-09",
        stepNumber: 9,
        slug: "node09-event-emitter-pattern",
        name: "The EventEmitter: Custom Events, Listeners & Observers",
        desc: "Create pub/sub event systems with EventEmitter, register on/once listeners, and prevent memory leaks.",
        path: "/learn/nodejs/node09-event-emitter-pattern",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "NODE-08",
      },
      {
        code: "NODE-10",
        stepNumber: 10,
        slug: "node10-buffers-and-binary-data",
        name: "Buffers & Binary Data: Raw Memory, Hex & Encodings",
        desc: "Allocate fixed-size raw memory chunks, convert encodings (utf8, hex, base64), and manipulate bytes.",
        path: "/learn/nodejs/node10-buffers-and-binary-data",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "NODE-09",
      },
    ],
  },
  {
    id: "stage-5",
    stageNumber: 5,
    name: "Streams & High-Performance I/O",
    subtitle: "Readable, Writable, Pipes & Backpressure",
    milestone: "Stream gigabytes of data chunk-by-chunk with minimal memory consumption and backpressure handling.",
    description: "Learn Readable and Writable streams, stream piping with pipeline(), Transform streams for compression, and managing backpressure.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "NODE-11",
        stepNumber: 11,
        slug: "node11-streams-readable-writable",
        name: "Streams Fundamentals: Readable, Writable & Memory Efficiency",
        desc: "Process large files chunk by chunk without blowing memory: createReadStream and createWriteStream.",
        path: "/learn/nodejs/node11-streams-readable-writable",
        tag: "STREAMS",
        estimatedMinutes: 25,
        prerequisite: "NODE-10",
      },
      {
        code: "NODE-12",
        stepNumber: 12,
        slug: "node12-piping-and-backpressure",
        name: "Piping Streams & Backpressure: pipeline() & Transform Streams",
        desc: "Connect data pipes safely with stream.pipeline(), handle backpressure, and transform chunks on the fly.",
        path: "/learn/nodejs/node12-piping-and-backpressure",
        tag: "STREAMS",
        estimatedMinutes: 25,
        prerequisite: "NODE-11",
      },
    ],
  },
  {
    id: "stage-6",
    stageNumber: 6,
    name: "HTTP with Node.js Core",
    subtitle: "http Server, Routing & Request Bodies",
    milestone: "Build a raw HTTP web server from scratch without external frameworks to understand how web backends work.",
    description: "Learn http.createServer, parsing method and url, status codes, headers, streaming request JSON payloads, and basic router logic.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "NODE-13",
        stepNumber: 13,
        slug: "node13-http-module-server-basics",
        name: "The http Module: Creating a Server & The Request/Response Cycle",
        desc: "Create an HTTP server with http.createServer, inspect incoming requests, and send responses.",
        path: "/learn/nodejs/node13-http-module-server-basics",
        tag: "HTTP",
        estimatedMinutes: 25,
        prerequisite: "NODE-12",
      },
      {
        code: "NODE-14",
        stepNumber: 14,
        slug: "node14-http-routing-and-json",
        name: "Routing & Headers: Methods, URLs & Sending JSON Responses",
        desc: "Route GET/POST/DELETE requests manually, set Content-Type headers, and serialize JSON responses.",
        path: "/learn/nodejs/node14-http-routing-and-json",
        tag: "HTTP",
        estimatedMinutes: 25,
        prerequisite: "NODE-13",
      },
      {
        code: "NODE-15",
        stepNumber: 15,
        slug: "node15-parsing-http-request-bodies",
        name: "Parsing Request Bodies: Streaming Payloads & Content-Types",
        desc: "Collect streaming request chunks (req.on('data')), concatenate buffers, and safely parse JSON payloads.",
        path: "/learn/nodejs/node15-parsing-http-request-bodies",
        tag: "HTTP",
        estimatedMinutes: 25,
        prerequisite: "NODE-14",
      },
    ],
  },
  {
    id: "stage-7",
    stageNumber: 7,
    name: "Architecture, Error Handling & Process Management",
    subtitle: "process.env, Error Traps & Graceful Shutdown",
    milestone: "Architect resilient Node.js applications with environment configs, error hierarchies, and signal handling.",
    description: "Learn process.env, unhandledRejection, uncaughtException, SIGTERM/SIGINT listeners, graceful cleanup, and modular layered design.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "NODE-16",
        stepNumber: 16,
        slug: "node16-process-env-and-configuration",
        name: "Process Object, Environment Variables & Configuration",
        desc: "Load and validate environment variables with process.env, manage configuration files, and avoid hardcoding secrets.",
        path: "/learn/nodejs/node16-process-env-and-configuration",
        tag: "PATTERNS",
        estimatedMinutes: 20,
        prerequisite: "NODE-15",
      },
      {
        code: "NODE-17",
        stepNumber: 17,
        slug: "node17-error-handling-and-exit-codes",
        name: "Error Handling: try/catch, unhandledRejection & Exit Codes",
        desc: "Catch sync and async errors, handle unhandledRejection/uncaughtException, and exit cleanly with process.exit().",
        path: "/learn/nodejs/node17-error-handling-and-exit-codes",
        tag: "PATTERNS",
        estimatedMinutes: 25,
        prerequisite: "NODE-16",
      },
      {
        code: "NODE-18",
        stepNumber: 18,
        slug: "node18-graceful-shutdown-signals",
        name: "Graceful Shutdown: Handling SIGTERM, SIGINT & Connection Teardown",
        desc: "Intercept termination signals (SIGTERM/SIGINT), close active HTTP connections, and exit cleanly.",
        path: "/learn/nodejs/node18-graceful-shutdown-signals",
        tag: "PATTERNS",
        estimatedMinutes: 20,
        prerequisite: "NODE-17",
      },
      {
        code: "NODE-19",
        stepNumber: 19,
        slug: "node19-application-architecture-clean-design",
        name: "Node.js Application Architecture: Modular Organization Without Frameworks",
        desc: "Organize clean directories (controllers, services, repositories, utils) and maintain clear boundaries.",
        path: "/learn/nodejs/node19-application-architecture-clean-design",
        tag: "PATTERNS",
        estimatedMinutes: 25,
        prerequisite: "NODE-18",
      },
    ],
  },
  {
    id: "stage-8",
    stageNumber: 8,
    name: "Debugging, Testing & Capstone",
    subtitle: "node:test Runner, Debugging & Capstone Project",
    milestone: "Debug server crashes with Node Inspector, write automated tests with node:test, and build the final Capstone.",
    description: "Learn Node Inspector debugging, the built-in node:test test runner, core interview questions, and build the File & Task Management Server.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    capstone: NODEJS_CAPSTONE,
    lessons: [
      {
        code: "NODE-20",
        stepNumber: 20,
        slug: "node20-debugging-node-inspector",
        name: "Debugging Node.js: Stack Traces, Inspector & Profiling",
        desc: "Diagnose bugs with node --inspect, connect Chrome DevTools, set breakpoints, and read complex stack traces.",
        path: "/learn/nodejs/node20-debugging-node-inspector",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "NODE-19",
      },
      {
        code: "NODE-21",
        stepNumber: 21,
        slug: "node21-testing-with-node-test-runner",
        name: "Testing with Node.js Built-in Test Runner & Assertions (node:test)",
        desc: "Write unit and integration tests with node:test and node:assert without third-party test libraries.",
        path: "/learn/nodejs/node21-testing-with-node-test-runner",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "NODE-20",
      },
      {
        code: "NODE-22",
        stepNumber: 22,
        slug: "node22-best-practices-and-anti-patterns",
        name: "Node.js Best Practices & Common Anti-Patterns",
        desc: "Avoid blocking the event loop with synchronous calls, prevent unhandled promise rejections, and secure configurations.",
        path: "/learn/nodejs/node22-best-practices-and-anti-patterns",
        tag: "PATTERNS",
        estimatedMinutes: 25,
        prerequisite: "NODE-21",
      },
      {
        code: "NODE-23",
        stepNumber: 23,
        slug: "node23-core-interview-concepts",
        name: "Node.js Core Interview Concepts & Behavioral Scenarios",
        desc: "Master classic Node.js interview questions: Event Loop phases, process.nextTick vs setImmediate, and stream backpressure.",
        path: "/learn/nodejs/node23-core-interview-concepts",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "NODE-22",
      },
      {
        code: "NODE-24",
        stepNumber: 24,
        slug: "node24-nodejs-capstone-project",
        name: "Node.js Capstone: File & Task Management Server",
        desc: "Build a complete, modular backend server from scratch using pure Node.js core modules.",
        path: "/learn/nodejs/node24-nodejs-capstone-project",
        tag: "CAPSTONE",
        estimatedMinutes: 60,
        prerequisite: "NODE-23",
      },
    ],
  },
];

export const NODEJS_PROGRESSION_PHASES: ProgressionPhaseMeta[] = [
  {
    id: "fundamentals",
    phaseNumber: 1,
    label: "Fundamentals & Runtime",
    tag: "Phase 01",
    desc: "What is Node.js, V8 engine, runtime differences from browser & the Event Loop",
    scope: "Runtime & Event Loop",
    icon: "layers",
    lessonCodes: ["NODE-01", "NODE-02", "NODE-03"],
  },
  {
    id: "modules-packages",
    phaseNumber: 2,
    label: "Modules & npm",
    tag: "Phase 02",
    desc: "CommonJS vs ES Modules, module caching, package.json scripts & SemVer dependencies",
    scope: "Modules & Packages",
    icon: "server",
    lessonCodes: ["NODE-04", "NODE-05"],
  },
  {
    id: "core-fs-paths",
    phaseNumber: 3,
    label: "File System & Paths",
    tag: "Phase 03",
    desc: "Cross-platform path handling, fs reading/writing & modern fs/promises async I/O",
    scope: "File System & Path",
    icon: "zap",
    lessonCodes: ["NODE-06", "NODE-07", "NODE-08"],
  },
  {
    id: "events-buffers",
    phaseNumber: 4,
    label: "Events & Buffers",
    tag: "Phase 04",
    desc: "EventEmitter pub/sub pattern, raw memory Buffers & byte encodings",
    scope: "Events & Binary Data",
    icon: "shield",
    lessonCodes: ["NODE-09", "NODE-10"],
  },
  {
    id: "streams-io",
    phaseNumber: 5,
    label: "Streams & High-Perf I/O",
    tag: "Phase 05",
    desc: "Readable, Writable, Transform streams, stream.pipeline() & backpressure management",
    scope: "Streaming I/O",
    icon: "zap",
    lessonCodes: ["NODE-11", "NODE-12"],
  },
  {
    id: "http-core",
    phaseNumber: 6,
    label: "HTTP with Node.js Core",
    tag: "Phase 06",
    desc: "http.createServer, manual URL routing, JSON responses & streaming request body parsing",
    scope: "Native HTTP Server",
    icon: "server",
    lessonCodes: ["NODE-13", "NODE-14", "NODE-15"],
  },
  {
    id: "arch-error-shutdown",
    phaseNumber: 7,
    label: "Architecture & Process",
    tag: "Phase 07",
    desc: "Environment configuration, error hierarchies, SIGTERM graceful shutdown & modular architecture",
    scope: "Process & Architecture",
    icon: "shield",
    lessonCodes: ["NODE-16", "NODE-17", "NODE-18", "NODE-19"],
  },
  {
    id: "debugging-capstone",
    phaseNumber: 8,
    label: "Debugging, Testing & Capstone",
    tag: "Phase 08",
    desc: "Node Inspector debugging, node:test runner, interview scenarios & final Capstone Server",
    scope: "Testing & Capstone",
    icon: "layers",
    lessonCodes: ["NODE-20", "NODE-21", "NODE-22", "NODE-23", "NODE-24"],
  },
];

// ─────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────

export function getAllLessons(): LessonMeta[] {
  return NODEJS_STAGES.flatMap((stage) => stage.lessons);
}

export function getStages(): StageMeta[] {
  return NODEJS_STAGES;
}

export function getLessonBySlug(slug: string): LessonMeta | undefined {
  return getAllLessons().find(
    (l) =>
      l.slug === slug || l.path.endsWith(`/${slug}`) || l.path.includes(slug)
  );
}

export function getLessonByCode(code: string): LessonMeta | undefined {
  return getAllLessons().find(
    (l) => l.code.toUpperCase() === code.toUpperCase()
  );
}

export function getStageByLessonSlug(slug: string): StageMeta | undefined {
  return NODEJS_STAGES.find((stage) =>
    stage.lessons.some(
      (l) =>
        l.slug === slug || l.path.endsWith(`/${slug}`) || l.path.includes(slug)
    )
  );
}

export function getNextLesson(currentSlug: string): LessonMeta | null {
  const all = getAllLessons();
  const index = all.findIndex(
    (l) =>
      l.slug === currentSlug ||
      l.path.endsWith(`/${currentSlug}`) ||
      l.path.includes(currentSlug)
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
      l.path.includes(currentSlug)
  );
  if (index > 0) {
    return all[index - 1];
  }
  return null;
}

export function getLessonsByPhaseId(phaseId: string): LessonMeta[] {
  const phase =
    NODEJS_PROGRESSION_PHASES.find((p) => p.id === phaseId) ||
    NODEJS_PROGRESSION_PHASES[0];
  const all = getAllLessons();
  return phase.lessonCodes
    .map((code) => all.find((l) => l.code === code))
    .filter((l): l is LessonMeta => l !== undefined);
}

export const PROGRESSION_PHASES = NODEJS_PROGRESSION_PHASES;

export function getNodejsCourse(): Course {
  const allLessons = getAllLessons();
  return {
    id: "nodejs",
    title: "Learn Node.js",
    prerequisites: {
      items: [
        "JavaScript syntax: arrow functions, destructuring, and spread operators",
        "Asynchronous programming: Promises, async/await, and the microtask queue",
        "ES Modules (import/export) and foundational modular programming",
      ],
      refresherHref: "/learn/javascript",
      refresherLabel: "Need a refresher? Open the JavaScript curriculum",
    },
    capstone: {
      title: NODEJS_CAPSTONE.title,
      description:
        "Your finish line: architect a production-grade backend server strictly using Node.js core modules—native HTTP routing, streaming file storage, EventEmitter audit logging, and graceful process signals.",
      href: NODEJS_CAPSTONE.path,
    },
    phases: NODEJS_PROGRESSION_PHASES.map((phase) => ({
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

