/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NODE.JS CURRICULUM DATA LAYER — LEARNCRAFT
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Authoritative 6-Stage, 20-Lesson curriculum metadata for pure Node.js:
 * 6 Stages, 20 Lessons, Capstone Project & Pedagogical Progression.
 *
 * Strict Topic Boundary: Pure Node.js runtime only.
 * Teaches runtime architecture, V8 + libuv, Event Loop, non-blocking I/O,
 * CommonJS & ESM, core modules (fs, path, process), EventEmitter, Buffers,
 * Streams, native HTTP server, fetch, validation, debugging & testing.
 *
 * Full backward-compatibility with all legacy lesson slugs and aliases.
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
  difficulty?: "Easy" | "Moderate" | "Difficult" | string;
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
    badge: "JS",
    path: "/learn/javascript",
    level: "Beginner",
  },
];

export const NODEJS_RELATED_TOPICS: RelatedTopicMeta[] = [
  {
    id: "rel-express",
    title: "Express.js",
    desc: "Minimal and flexible web application framework built on top of Node.js.",
    badge: "Web Framework",
    path: "/learn/express",
  },
  {
    id: "rel-nestjs",
    title: "NestJS",
    desc: "Enterprise architecture framework with dependency injection and TypeScript.",
    badge: "Enterprise",
    path: "/learn/nestjs",
  },
  {
    id: "rel-postgresql",
    title: "PostgreSQL",
    desc: "Relational database querying, joins, constraints, and ACID transactions.",
    badge: "Database",
    path: "/learn/postgresql",
  },
];

// ─────────────────────────────────────────────────────────────
// Final Capstone Project
// ─────────────────────────────────────────────────────────────

export const NODEJS_CAPSTONE: CapstoneProjectMeta = {
  id: "nodejs-capstone-task-server",
  stageNumber: 6,
  slug: "task-server",
  title: "File & Task Management Server",
  subtitle: "Pure Node.js Core Capstone Project",
  desc: "Architect a production-grade backend server strictly using Node.js core modules—native HTTP routing, streaming file storage, EventEmitter audit logging, and graceful process signals.",
  path: "/learn/nodejs/projects/task-server",
  badge: "🛠️ Final Capstone",
  xpReward: 200,
  estimatedMinutes: 60,
  prerequisites: ["NODE-01", "NODE-04", "NODE-06", "NODE-12", "NODE-13", "NODE-14", "NODE-17", "NODE-19", "NODE-20"],
  skillsTaught: [
    "Native HTTP request routing and JSON response streaming without third-party frameworks",
    "Streaming file uploads and downloads with backpressure and memory efficiency",
    "Custom EventEmitter pub/sub for audit logs and lifecycle notifications",
    "Environment configuration and robust async error handling",
    "Process signal listeners (SIGTERM/SIGINT) for zero-downtime graceful shutdown",
    "Automated unit testing with the built-in node:test runner",
  ],
  stepsCount: 5,
};

// ─────────────────────────────────────────────────────────────
// Stages & All 20 Node.js Lessons
// ─────────────────────────────────────────────────────────────

export const NODEJS_STAGES: StageMeta[] = [
  {
    id: "stage-1",
    stageNumber: 1,
    name: "Understand Node.js and Start a Project",
    subtitle: "Runtime Fundamentals, npm & Modules",
    milestone: "Understand what Node.js is, initialize projects with npm, and import/export code between files.",
    description: "Learn how Node.js runs JavaScript outside the browser, initialize package.json, install packages, and structure modular files.",
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
        name: "What Is Node.js?",
        desc: "Learn why Node.js exists, how it executes JavaScript outside browsers, and where it is useful.",
        path: "/learn/nodejs/node01-what-is-nodejs",
        tag: "CORE",
        difficulty: "Easy",
        estimatedMinutes: 15,
        prerequisite: "None",
      },
      {
        code: "NODE-02",
        stepNumber: 2,
        slug: "node02-start-and-run-a-nodejs-project",
        name: "Start and Run a Node.js Project",
        desc: "Initialize a project folder with npm init, create entrypoint scripts, and configure ES modules.",
        path: "/learn/nodejs/node02-start-and-run-a-nodejs-project",
        tag: "CORE",
        difficulty: "Easy",
        estimatedMinutes: 15,
        prerequisite: "NODE-01",
      },
      {
        code: "NODE-03",
        stepNumber: 3,
        slug: "node03-what-are-npm-and-packages",
        name: "What Are npm and Packages?",
        desc: "Install reusable code packages, manage dependencies, and understand package-lock.json.",
        path: "/learn/nodejs/node03-what-are-npm-and-packages",
        tag: "CORE",
        difficulty: "Easy",
        estimatedMinutes: 15,
        prerequisite: "NODE-02",
      },
      {
        code: "NODE-04",
        stepNumber: 4,
        slug: "node04-import-and-export-code",
        name: "Import and Export Code Between Files",
        desc: "Split code into maintainable modules using modern ES module export and import syntax.",
        path: "/learn/nodejs/node04-import-and-export-code",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NODE-03",
      },
    ],
  },
  {
    id: "stage-2",
    stageNumber: 2,
    name: "Work with Files and Settings",
    subtitle: "Environment Variables, Filesystem & Path Resolution",
    milestone: "Read environment variables safely, manipulate files with promises, and handle cross-platform file paths.",
    description: "Learn safe environment variable access, file reading/writing with node:fs/promises, and OS-safe path resolution.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "NODE-05",
        stepNumber: 5,
        slug: "node05-read-environment-variables-safely",
        name: "Read Environment Variables Safely",
        desc: "Configure runtime settings with process.env, convert types, and keep secrets out of source code.",
        path: "/learn/nodejs/node05-read-environment-variables-safely",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NODE-04",
      },
      {
        code: "NODE-06",
        stepNumber: 6,
        slug: "node06-read-and-write-files",
        name: "Read and Write Files",
        desc: "Read and write disk files asynchronously with node:fs/promises, utf8 encodings, and top-level await.",
        path: "/learn/nodejs/node06-read-and-write-files",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 25,
        prerequisite: "NODE-05",
      },
      {
        code: "NODE-07",
        stepNumber: 7,
        slug: "node07-why-the-path-module-matters",
        name: "Why the path Module Matters",
        desc: "Construct cross-platform file paths across Windows and POSIX systems with path.join().",
        path: "/learn/nodejs/node07-why-the-path-module-matters",
        tag: "CORE",
        difficulty: "Easy",
        estimatedMinutes: 15,
        prerequisite: "NODE-06",
      },
    ],
  },
  {
    id: "stage-3",
    stageNumber: 3,
    name: "Understand Asynchronous JavaScript in Node.js",
    subtitle: "Non-Blocking I/O, async/await, Event Loop & Errors",
    milestone: "Master the non-blocking execution model, async/await control flow, event loop mechanics, and error handling.",
    description: "Learn how Node.js manages concurrency, event loop phases, microtasks vs timers, and try/catch error traps.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "NODE-08",
        stepNumber: 8,
        slug: "node08-synchronous-vs-asynchronous-work",
        name: "Synchronous vs. Asynchronous Work",
        desc: "Understand non-blocking execution and why synchronous file calls stall concurrent request traffic.",
        path: "/learn/nodejs/node08-synchronous-vs-asynchronous-work",
        tag: "RUNTIME",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NODE-07",
      },
      {
        code: "NODE-09",
        stepNumber: 9,
        slug: "node09-use-async-and-await",
        name: "Use async and await",
        desc: "Write clean, sequential-looking asynchronous logic with Promises, async functions, and await.",
        path: "/learn/nodejs/node09-use-async-and-await",
        tag: "RUNTIME",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NODE-08",
      },
      {
        code: "NODE-10",
        stepNumber: 10,
        slug: "node10-understand-the-event-loop",
        name: "Understand the Event Loop",
        desc: "Learn how the event loop coordinates timers, callbacks, and call stacks without blocking.",
        path: "/learn/nodejs/node10-understand-the-event-loop",
        tag: "RUNTIME",
        difficulty: "Difficult",
        estimatedMinutes: 30,
        prerequisite: "NODE-09",
      },
      {
        code: "NODE-11",
        stepNumber: 11,
        slug: "node11-handle-errors-with-try-catch",
        name: "Handle Errors with try...catch",
        desc: "Trap exceptions and Promise rejections cleanly without crashing the Node.js server.",
        path: "/learn/nodejs/node11-handle-errors-with-try-catch",
        tag: "PATTERNS",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NODE-10",
      },
    ],
  },
  {
    id: "stage-4",
    stageNumber: 4,
    name: "Handle Events and Data",
    subtitle: "EventEmitter, Buffers & Streaming I/O",
    milestone: "Harness publisher/subscriber event architecture and stream large files with minimal RAM consumption.",
    description: "Learn EventEmitter pub/sub, binary Buffers, Readable and Writable streams, and pipeline backpressure.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "NODE-12",
        stepNumber: 12,
        slug: "node12-events-and-eventemitter",
        name: "Events and EventEmitter",
        desc: "Decouple application modules using Node.js EventEmitter pub/sub listeners and custom events.",
        path: "/learn/nodejs/node12-events-and-eventemitter",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 25,
        prerequisite: "NODE-11",
      },
      {
        code: "NODE-13",
        stepNumber: 13,
        slug: "node13-buffers-and-streams",
        name: "Buffers and Streams",
        desc: "Store binary bytes in Buffers and stream multi-gigabyte files piece-by-piece with stream.pipeline.",
        path: "/learn/nodejs/node13-buffers-and-streams",
        tag: "STREAMS",
        difficulty: "Difficult",
        estimatedMinutes: 30,
        prerequisite: "NODE-12",
      },
    ],
  },
  {
    id: "stage-5",
    stageNumber: 5,
    name: "Build Basic Server Features",
    subtitle: "Native HTTP Server & Outgoing API Requests",
    milestone: "Build an HTTP web server from scratch with node:http and call third-party APIs using native fetch.",
    description: "Learn http.createServer, status codes, headers, response streaming, and native fetch API requests.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "NODE-14",
        stepNumber: 14,
        slug: "node14-understand-http-requests-and-responses",
        name: "Understand HTTP Requests and Responses",
        desc: "Create an HTTP server with http.createServer, route URLs, set status codes, and send responses.",
        path: "/learn/nodejs/node14-understand-http-requests-and-responses",
        tag: "HTTP",
        difficulty: "Moderate",
        estimatedMinutes: 25,
        prerequisite: "NODE-13",
      },
      {
        code: "NODE-15",
        stepNumber: 15,
        slug: "node15-make-an-http-request-with-fetch",
        name: "Make an HTTP Request with fetch",
        desc: "Request data from external APIs using Node's native fetch and handle HTTP status codes properly.",
        path: "/learn/nodejs/node15-make-an-http-request-with-fetch",
        tag: "HTTP",
        difficulty: "Moderate",
        estimatedMinutes: 25,
        prerequisite: "NODE-14",
      },
    ],
  },
  {
    id: "stage-6",
    stageNumber: 6,
    name: "Protect and Maintain the Application",
    subtitle: "Validation, Exit Codes, Debugging, Testing & Performance",
    milestone: "Validate untrusted inputs, manage process exits, debug with inspector, write automated tests, and keep servers responsive.",
    description: "Learn input validation, process.exitCode, node --inspect debugging, the built-in node:test runner, and capping CPU load.",
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
        code: "NODE-16",
        stepNumber: 16,
        slug: "node16-validate-input-and-avoid-trusting-users",
        name: "Validate Input and Avoid Trusting Users",
        desc: "Sanitize request data, prevent mass-assignment vulnerabilities, and enforce server-side validation.",
        path: "/learn/nodejs/node16-validate-input-and-avoid-trusting-users",
        tag: "PATTERNS",
        difficulty: "Moderate",
        estimatedMinutes: 25,
        prerequisite: "NODE-15",
      },
      {
        code: "NODE-17",
        stepNumber: 17,
        slug: "node17-use-process-and-exit-codes",
        name: "Use process and Exit Codes",
        desc: "Communicate task success or failure to the shell using process.exitCode without premature aborts.",
        path: "/learn/nodejs/node17-use-process-and-exit-codes",
        tag: "CORE",
        difficulty: "Easy",
        estimatedMinutes: 15,
        prerequisite: "NODE-16",
      },
      {
        code: "NODE-18",
        stepNumber: 18,
        slug: "node18-debug-nodejs-code",
        name: "Debug Node.js Code",
        desc: "Diagnose logic errors with node --inspect, connect DevTools, and verify fixes systematically.",
        path: "/learn/nodejs/node18-debug-nodejs-code",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NODE-17",
      },
      {
        code: "NODE-19",
        stepNumber: 19,
        slug: "node19-write-basic-tests",
        name: "Write Basic Tests",
        desc: "Write unit tests using Node's built-in node:test runner and node:assert/strict assertions.",
        path: "/learn/nodejs/node19-write-basic-tests",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 25,
        prerequisite: "NODE-18",
      },
      {
        code: "NODE-20",
        stepNumber: 20,
        slug: "node20-keep-a-nodejs-application-responsive",
        name: "Keep a Node.js Application Responsive",
        desc: "Avoid blocking the single JavaScript thread with synchronous loops and offload heavy CPU tasks.",
        path: "/learn/nodejs/node20-keep-a-nodejs-application-responsive",
        tag: "PATTERNS",
        difficulty: "Moderate",
        estimatedMinutes: 25,
        prerequisite: "NODE-19",
      },
    ],
  },
];

export const NODEJS_PROGRESSION_PHASES: ProgressionPhaseMeta[] = [
  {
    id: "understand-nodejs",
    phaseNumber: 1,
    label: "Understand Node.js & Start a Project",
    tag: "Phase 01",
    desc: "What is Node.js, running scripts, npm package management, and ES modules",
    scope: "Runtime & Modules",
    icon: "layers",
    lessonCodes: ["NODE-01", "NODE-02", "NODE-03", "NODE-04"],
  },
  {
    id: "files-settings",
    phaseNumber: 2,
    label: "Work with Files and Settings",
    tag: "Phase 02",
    desc: "Environment variables with process.env, async file I/O, and cross-platform path resolution",
    scope: "Files & Settings",
    icon: "server",
    lessonCodes: ["NODE-05", "NODE-06", "NODE-07"],
  },
  {
    id: "async-javascript",
    phaseNumber: 3,
    label: "Asynchronous JavaScript & Event Loop",
    tag: "Phase 03",
    desc: "Non-blocking execution model, async/await, event loop mechanics, and try/catch error traps",
    scope: "Async & Event Loop",
    icon: "zap",
    lessonCodes: ["NODE-08", "NODE-09", "NODE-10", "NODE-11"],
  },
  {
    id: "events-data",
    phaseNumber: 4,
    label: "Handle Events and Data",
    tag: "Phase 04",
    desc: "EventEmitter pub/sub patterns, raw binary Buffers, and stream pipeline backpressure",
    scope: "Events & Streaming",
    icon: "shield",
    lessonCodes: ["NODE-12", "NODE-13"],
  },
  {
    id: "server-features",
    phaseNumber: 5,
    label: "Build Basic Server Features",
    tag: "Phase 05",
    desc: "Native HTTP web server, request routing, status codes, and outgoing fetch calls",
    scope: "Native HTTP & Fetch",
    icon: "server",
    lessonCodes: ["NODE-14", "NODE-15"],
  },
  {
    id: "protect-maintain",
    phaseNumber: 6,
    label: "Protect and Maintain Application",
    tag: "Phase 06",
    desc: "Input validation, process exit codes, node --inspect debugging, node:test runner, and responsiveness",
    scope: "Maintenance & Testing",
    icon: "layers",
    lessonCodes: ["NODE-16", "NODE-17", "NODE-18", "NODE-19", "NODE-20"],
  },
];

// ─────────────────────────────────────────────────────────────
// Legacy Slug & Code Mapping (Full Backward-Compatibility)
// ─────────────────────────────────────────────────────────────

export const NODEJS_LEGACY_SLUG_MAP: Record<string, string> = {
  // Direct matches
  "node01-what-is-nodejs": "node01-what-is-nodejs",
  "node02-start-and-run-a-nodejs-project": "node02-start-and-run-a-nodejs-project",
  "node03-what-are-npm-and-packages": "node03-what-are-npm-and-packages",
  "node04-import-and-export-code": "node04-import-and-export-code",
  "node05-read-environment-variables-safely": "node05-read-environment-variables-safely",
  "node06-read-and-write-files": "node06-read-and-write-files",
  "node07-why-the-path-module-matters": "node07-why-the-path-module-matters",
  "node08-synchronous-vs-asynchronous-work": "node08-synchronous-vs-asynchronous-work",
  "node09-use-async-and-await": "node09-use-async-and-await",
  "node10-understand-the-event-loop": "node10-understand-the-event-loop",
  "node11-handle-errors-with-try-catch": "node11-handle-errors-with-try-catch",
  "node12-events-and-eventemitter": "node12-events-and-eventemitter",
  "node13-buffers-and-streams": "node13-buffers-and-streams",
  "node14-understand-http-requests-and-responses": "node14-understand-http-requests-and-responses",
  "node15-make-an-http-request-with-fetch": "node15-make-an-http-request-with-fetch",
  "node16-validate-input-and-avoid-trusting-users": "node16-validate-input-and-avoid-trusting-users",
  "node17-use-process-and-exit-codes": "node17-use-process-and-exit-codes",
  "node18-debug-nodejs-code": "node18-debug-nodejs-code",
  "node19-write-basic-tests": "node19-write-basic-tests",
  "node20-keep-a-nodejs-application-responsive": "node20-keep-a-nodejs-application-responsive",

  // Short slug aliases
  node01: "node01-what-is-nodejs",
  node02: "node02-start-and-run-a-nodejs-project",
  node03: "node03-what-are-npm-and-packages",
  node04: "node04-import-and-export-code",
  node05: "node05-read-environment-variables-safely",
  node06: "node06-read-and-write-files",
  node07: "node07-why-the-path-module-matters",
  node08: "node08-synchronous-vs-asynchronous-work",
  node09: "node09-use-async-and-await",
  node10: "node10-understand-the-event-loop",
  node11: "node11-handle-errors-with-try-catch",
  node12: "node12-events-and-eventemitter",
  node13: "node13-buffers-and-streams",
  node14: "node14-understand-http-requests-and-responses",
  node15: "node15-make-an-http-request-with-fetch",
  node16: "node16-validate-input-and-avoid-trusting-users",
  node17: "node17-use-process-and-exit-codes",
  node18: "node18-debug-nodejs-code",
  node19: "node19-write-basic-tests",
  node20: "node20-keep-a-nodejs-application-responsive",

  // Legacy aliases from previous 24-lesson structure
  "node02-nodejs-vs-browser": "node02-start-and-run-a-nodejs-project",
  "node03-event-loop-and-async-io": "node10-understand-the-event-loop",
  "node04-commonjs-vs-esm": "node04-import-and-export-code",
  "node05-npm-and-package-json": "node03-what-are-npm-and-packages",
  "node06-path-module-and-filenames": "node07-why-the-path-module-matters",
  "node07-fs-module-reading-writing": "node06-read-and-write-files",
  "node08-fs-promises-safe-operations": "node06-read-and-write-files",
  "node09-event-emitter-pattern": "node12-events-and-eventemitter",
  "node10-buffers-and-binary-data": "node13-buffers-and-streams",
  "node11-streams-readable-writable": "node13-buffers-and-streams",
  "node12-piping-and-backpressure": "node13-buffers-and-streams",
  "node13-http-module-server-basics": "node14-understand-http-requests-and-responses",
  "node14-http-routing-and-json": "node14-understand-http-requests-and-responses",
  "node15-parsing-http-request-bodies": "node14-understand-http-requests-and-responses",
  "node16-process-env-and-configuration": "node05-read-environment-variables-safely",
  "node17-error-handling-and-exit-codes": "node11-handle-errors-with-try-catch",
  "node18-graceful-shutdown-signals": "node17-use-process-and-exit-codes",
  "node19-application-architecture-clean-design": "node20-keep-a-nodejs-application-responsive",
  "node20-debugging-node-inspector": "node18-debug-nodejs-code",
  "node21-testing-with-node-test-runner": "node19-write-basic-tests",
  "node22-best-practices-and-anti-patterns": "node20-keep-a-nodejs-application-responsive",
  "node23-core-interview-concepts": "node20-keep-a-nodejs-application-responsive",
  "node24-nodejs-capstone-project": "node20-keep-a-nodejs-application-responsive",

  // Interview Question cross-reference aliases
  "node02-event-loop-libuv": "node10-understand-the-event-loop",
  "node03-modules-cjs-vs-esm": "node04-import-and-export-code",
  "node04-event-emitter-pattern": "node12-events-and-eventemitter",
  "node05-streams-and-buffers": "node13-buffers-and-streams",
  "node06-native-http-server": "node14-understand-http-requests-and-responses",
  "node08-worker-threads-and-cluster": "node20-keep-a-nodejs-application-responsive",
};

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
  if (!slug) return undefined;
  const raw = slug.toLowerCase().trim();
  const resolvedSlug = NODEJS_LEGACY_SLUG_MAP[raw] || raw;

  return getAllLessons().find(
    (l) =>
      l.slug.toLowerCase() === resolvedSlug ||
      l.slug.toLowerCase() === raw ||
      l.code.toLowerCase() === raw ||
      l.code.toLowerCase().replace("-", "") === raw ||
      l.path.endsWith(`/${resolvedSlug}`) ||
      l.path.endsWith(`/${raw}`)
  );
}

export function getLessonByCode(code: string): LessonMeta | undefined {
  if (!code) return undefined;
  const raw = code.toUpperCase().trim();
  return getAllLessons().find(
    (l) => l.code.toUpperCase() === raw || l.code.replace("-", "").toUpperCase() === raw
  );
}

export function getStageByLessonSlug(slug: string): StageMeta | undefined {
  const lesson = getLessonBySlug(slug);
  if (!lesson) return undefined;
  return NODEJS_STAGES.find((stage) =>
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
