/**
 * Express.js Curriculum Data Definition for LearnCraft
 * 5 Parts/Phases, 22 Authoritative Lessons, and 1 Comprehensive Capstone Project.
 * Mapped directly from the official curriculum specification.
 */

import type { Course } from "@/components/curriculum/types";
import { EXPRESS_LEGACY_SLUG_MAP } from "../content";

export interface LessonMeta {
  code: string;
  slug: string;
  name: string;
  phaseId: string;
  phaseNumber: number;
  stepNumber: number;
  desc: string;
  estimatedMinutes: number;
  xpReward: number;
  prerequisite?: string;
  path: string;
  color?: string;
}

export interface PhaseMeta {
  id: string;
  phaseNumber: number;
  name: string;
  label: string;
  desc: string;
  scope: string;
  lessonCodes: string[];
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
  keyFeatures: string[];
}

export const EXPRESS_PROGRESSION_PHASES: PhaseMeta[] = [
  {
    id: "fundamentals",
    phaseNumber: 1,
    name: "Understand What Express Is Doing",
    label: "Phase 01: Understand What Express Is Doing",
    desc: "Understand what Express adds on top of Node.js http, project setup, requests and responses, and HTTP methods and status codes.",
    scope: "What Is Express · Project Setup · Requests & Responses · Methods & Status Codes",
    lessonCodes: ["EXP-01", "EXP-02", "EXP-03", "EXP-04"],
  },
  {
    id: "routes-middleware",
    phaseNumber: 2,
    name: "Routes and Middleware",
    label: "Phase 02: Routes and Middleware",
    desc: "Work with route parameters, query strings, request bodies with express.json(), middleware pipelines, and modular routers.",
    scope: "Route Params · Query Params · Reading Body · Middleware · Modular Routers",
    lessonCodes: ["EXP-05", "EXP-06", "EXP-07", "EXP-08", "EXP-09"],
  },
  {
    id: "build-apis",
    phaseNumber: 3,
    name: "Build Useful APIs",
    label: "Phase 03: Build Useful APIs",
    desc: "Send JSON, construct REST-style routes, validate inputs, centralize error handling with Express 5 async flow, and decouple business logic.",
    scope: "Sending JSON · REST Routes · Input Validation · Central Error Handling · Async Handlers · Service Separation",
    lessonCodes: ["EXP-10", "EXP-11", "EXP-12", "EXP-13", "EXP-14", "EXP-15"],
  },
  {
    id: "access-safety",
    phaseNumber: 4,
    name: "Middleware, Access, and Safety",
    label: "Phase 04: Middleware, Access, and Safety",
    desc: "Configure CORS for web browsers, enforce authentication vs authorization basics, implement essential security headers, and read environment variables.",
    scope: "CORS Rules · Auth Basics · Security Best Practices · Environment Variables",
    lessonCodes: ["EXP-16", "EXP-17", "EXP-18", "EXP-19"],
  },
  {
    id: "improve-test",
    phaseNumber: 5,
    name: "Improve and Test an Express API",
    label: "Phase 05: Improve and Test an Express API",
    desc: "Write automated route integration tests with Supertest, add safe request and error logging, and build a complete REST mini-project.",
    scope: "Supertest Integration Tests · Safe Request Logging · Full REST Mini-Project",
    lessonCodes: ["EXP-20", "EXP-21", "EXP-22"],
  },
];

export const EXPRESS_LESSONS: LessonMeta[] = [
  // Phase 1: Understand What Express Is Doing
  {
    code: "EXP-01",
    slug: "exp01-what-is-express",
    name: "What Is Express?",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 1,
    desc: "Express is a fast, unopinionated, minimalist web framework for Node.js that simplifies routing and HTTP request handling.",
    estimatedMinutes: 15,
    xpReward: 50,
    path: "/learn/express/exp01-what-is-express",
    color: "purple",
  },
  {
    code: "EXP-02",
    slug: "exp02-starting-an-express-project",
    name: "Starting an Express Project",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 2,
    desc: "Initialize a project, install Express, create an application instance, and listen on a port.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "EXP-01",
    path: "/learn/express/exp02-starting-an-express-project",
    color: "purple",
  },
  {
    code: "EXP-03",
    slug: "exp03-requests-and-responses",
    name: "Requests and Responses",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 3,
    desc: "Understand the request and response cycle, reading request details and sending client responses.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "EXP-02",
    path: "/learn/express/exp03-requests-and-responses",
    color: "purple",
  },
  {
    code: "EXP-04",
    slug: "exp04-http-methods-and-status-codes",
    name: "HTTP Methods and Status Codes",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 4,
    desc: "Match HTTP methods (GET, POST, etc.) and communicate outcomes accurately using standard HTTP status codes.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "EXP-03",
    path: "/learn/express/exp04-http-methods-and-status-codes",
    color: "purple",
  },

  // Phase 2: Routes and Middleware
  {
    code: "EXP-05",
    slug: "exp05-routes-and-route-parameters",
    name: "Routes and Route Parameters",
    phaseId: "routes-middleware",
    phaseNumber: 2,
    stepNumber: 5,
    desc: "Capture dynamic URL values using route parameters (:id) and read them on req.params.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "EXP-04",
    path: "/learn/express/exp05-routes-and-route-parameters",
    color: "purple",
  },
  {
    code: "EXP-06",
    slug: "exp06-query-parameters",
    name: "Query Parameters",
    phaseId: "routes-middleware",
    phaseNumber: 2,
    stepNumber: 6,
    desc: "Extract URL query strings (?category=books) using req.query for search, filters, and pagination.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "EXP-05",
    path: "/learn/express/exp06-query-parameters",
    color: "purple",
  },
  {
    code: "EXP-07",
    slug: "exp07-reading-a-request-body",
    name: "Reading a Request Body",
    phaseId: "routes-middleware",
    phaseNumber: 2,
    stepNumber: 7,
    desc: "Parse JSON request bodies using express.json() and understand Express 5 req.body undefined behavior.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "EXP-06",
    path: "/learn/express/exp07-reading-a-request-body",
    color: "purple",
  },
  {
    code: "EXP-08",
    slug: "exp08-middleware",
    name: "Middleware",
    phaseId: "routes-middleware",
    phaseNumber: 2,
    stepNumber: 8,
    desc: "Execute shared pipeline functions using req, res, and next() to perform cross-cutting tasks.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "EXP-07",
    path: "/learn/express/exp08-middleware",
    color: "purple",
  },
  {
    code: "EXP-09",
    slug: "exp09-routers-and-organizing-routes",
    name: "Routers and Organizing Routes",
    phaseId: "routes-middleware",
    phaseNumber: 2,
    stepNumber: 9,
    desc: "Split routes into modular mini-applications using express.Router() mounted at base paths.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "EXP-08",
    path: "/learn/express/exp09-routers-and-organizing-routes",
    color: "purple",
  },

  // Phase 3: Build Useful APIs
  {
    code: "EXP-10",
    slug: "exp10-sending-json-and-choosing-a-response",
    name: "Sending JSON and Choosing a Response",
    phaseId: "build-apis",
    phaseNumber: 3,
    stepNumber: 10,
    desc: "Format and send structured JSON data using res.status().json() with proper headers.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "EXP-09",
    path: "/learn/express/exp10-sending-json-and-choosing-a-response",
    color: "purple",
  },
  {
    code: "EXP-11",
    slug: "exp11-build-rest-style-routes",
    name: "Build REST-Style Routes",
    phaseId: "build-apis",
    phaseNumber: 3,
    stepNumber: 11,
    desc: "Design clean resource-oriented endpoints using standard HTTP verbs and nouns.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "EXP-10",
    path: "/learn/express/exp11-build-rest-style-routes",
    color: "purple",
  },
  {
    code: "EXP-12",
    slug: "exp12-validate-user-input",
    name: "Validate User Input",
    phaseId: "build-apis",
    phaseNumber: 3,
    stepNumber: 12,
    desc: "Validate types and sanitize inputs, returning 400 Bad Request early on malformed payloads.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "EXP-11",
    path: "/learn/express/exp12-validate-user-input",
    color: "purple",
  },
  {
    code: "EXP-13",
    slug: "exp13-handling-errors",
    name: "Handling Errors",
    phaseId: "build-apis",
    phaseNumber: 3,
    stepNumber: 13,
    desc: "Centralize unhandled errors using 4-parameter error middleware (err, req, res, next).",
    estimatedMinutes: 30,
    xpReward: 80,
    prerequisite: "EXP-12",
    path: "/learn/express/exp13-handling-errors",
    color: "purple",
  },
  {
    code: "EXP-14",
    slug: "exp14-async-route-handlers",
    name: "Async Route Handlers",
    phaseId: "build-apis",
    phaseNumber: 3,
    stepNumber: 14,
    desc: "Use async/await cleanly, leveraging Express 5 automatic Promise rejection forwarding.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "EXP-13",
    path: "/learn/express/exp14-async-route-handlers",
    color: "purple",
  },
  {
    code: "EXP-15",
    slug: "exp15-separate-route-logic-from-business-logic",
    name: "Separate Route Logic From Business Logic",
    phaseId: "build-apis",
    phaseNumber: 3,
    stepNumber: 15,
    desc: "Decouple HTTP routing mechanics from core application business logic for testability.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "EXP-14",
    path: "/learn/express/exp15-separate-route-logic-from-business-logic",
    color: "purple",
  },

  // Phase 4: Middleware, Access, and Safety
  {
    code: "EXP-16",
    slug: "exp16-cors",
    name: "CORS",
    phaseId: "access-safety",
    phaseNumber: 4,
    stepNumber: 16,
    desc: "Configure Cross-Origin Resource Sharing headers for web browser security boundaries.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "EXP-15",
    path: "/learn/express/exp16-cors",
    color: "purple",
  },
  {
    code: "EXP-17",
    slug: "exp17-authentication-and-authorization-basics",
    name: "Authentication and Authorization Basics",
    phaseId: "access-safety",
    phaseNumber: 4,
    stepNumber: 17,
    desc: "Differentiate identity verification (401) from permission checks (403) and guard routes.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "EXP-16",
    path: "/learn/express/exp17-authentication-and-authorization-basics",
    color: "purple",
  },
  {
    code: "EXP-18",
    slug: "exp18-basic-express-security",
    name: "Basic Express Security",
    phaseId: "access-safety",
    phaseNumber: 4,
    stepNumber: 18,
    desc: "Harden APIs using Helmet headers, secrets hygiene, HTTPS enforcement, and rate limiting.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "EXP-17",
    path: "/learn/express/exp18-basic-express-security",
    color: "purple",
  },
  {
    code: "EXP-19",
    slug: "exp19-environment-variables-and-configuration",
    name: "Environment Variables and Configuration",
    phaseId: "access-safety",
    phaseNumber: 4,
    stepNumber: 19,
    desc: "Read runtime configuration and dynamic ports from process.env safely.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "EXP-18",
    path: "/learn/express/exp19-environment-variables-and-configuration",
    color: "purple",
  },

  // Phase 5: Improve and Test an Express API
  {
    code: "EXP-20",
    slug: "exp20-testing-express-routes",
    name: "Testing Express Routes",
    phaseId: "improve-test",
    phaseNumber: 5,
    stepNumber: 20,
    desc: "Write automated endpoint integration tests using Supertest without live port collisions.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "EXP-19",
    path: "/learn/express/exp20-testing-express-routes",
    color: "purple",
  },
  {
    code: "EXP-21",
    slug: "exp21-logging-and-debugging-requests",
    name: "Logging and Debugging Requests",
    phaseId: "improve-test",
    phaseNumber: 5,
    stepNumber: 21,
    desc: "Add observability to track incoming traffic and errors without logging sensitive user secrets.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "EXP-20",
    path: "/learn/express/exp21-logging-and-debugging-requests",
    color: "purple",
  },
  {
    code: "EXP-22",
    slug: "exp22-build-a-small-rest-api",
    name: "Build a Small REST API",
    phaseId: "improve-test",
    phaseNumber: 5,
    stepNumber: 22,
    desc: "Assemble routes, body parsing, input validation, and HTTP status codes into a functioning API.",
    estimatedMinutes: 30,
    xpReward: 90,
    prerequisite: "EXP-21",
    path: "/learn/express/exp22-build-a-small-rest-api",
    color: "purple",
  },
];

// ─────────────────────────────────────────────────────────────
// Prerequisites Definition
// ─────────────────────────────────────────────────────────────

export const EXPRESS_PREREQUISITES = {
  title: "Required & Foundational Knowledge",
  description:
    "Express.js is a minimal web layer built on top of Node.js. Learners should be comfortable with JavaScript functions, Promises/async-await, and Node.js fundamentals.",
  items: [
    {
      name: "JavaScript Fundamentals",
      topicSlug: "javascript",
      desc: "Functions, callbacks, closures, Promises, async/await, and object destructuring.",
      required: true,
      path: "/learn/javascript",
    },
    {
      name: "Node.js Fundamentals",
      topicSlug: "nodejs",
      desc: "The Node runtime, modules (CommonJS/ESM), npm packages, and basic HTTP concepts.",
      required: true,
      path: "/learn/nodejs",
    },
    {
      name: "Basic HTTP & REST Concepts",
      topicSlug: "http-basics",
      desc: "Client-server model, HTTP methods (GET/POST/PUT/DELETE), status codes, and headers.",
      required: false,
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Final Capstone Project
// ─────────────────────────────────────────────────────────────

export const EXPRESS_CAPSTONE: CapstoneProjectMeta = {
  id: "capstone-task-flow-api",
  stageNumber: 6,
  slug: "task-flow-api",
  title: "TaskFlow — Production-Grade Task & Project Management REST API",
  subtitle: "Final Express.js Capstone Project",
  desc: "Architect and build a complete, production-ready Express.js REST API strictly applying modular express.Router instances, custom logging and timing middleware, input validation, JWT auth guards, layered Controller-Service separation, centralized 4-arg error handling, and automated Supertest integration tests.",
  path: "/learn/express/projects/task-flow-api",
  badge: "🚂 Capstone",
  xpReward: 400,
  estimatedMinutes: 90,
  keyFeatures: [
    "Modular routing split across /api/auth, /api/projects, and /api/tasks routers",
    "Layered architecture strictly separating HTTP controllers from in-memory service state",
    "Reusable input validation middleware returning structured 400 Bad Request error lists",
    "Stateless JWT authentication middleware populating req.user and role-based route guards",
    "Centralized 4-argument error-handling middleware with uniform JSON error formatting",
    "Automated Supertest test suite asserting status codes, headers, and response payloads",
  ],
};

// ─────────────────────────────────────────────────────────────
// Stages & Full Curriculum Breakdown
// ─────────────────────────────────────────────────────────────

export interface StageMeta {
  id: string;
  stageNumber: number;
  name: string;
  subtitle: string;
  milestone?: string;
  description: string;
  theme?: {
    badge: string;
    dot: string;
    border: string;
    bgSubtle: string;
    textAccent: string;
  };
  lessons: LessonMeta[];
  capstone?: CapstoneProjectMeta;
}

export const EXPRESS_STAGES: StageMeta[] = EXPRESS_PROGRESSION_PHASES.map((phase) => ({
  id: phase.id,
  stageNumber: phase.phaseNumber,
  name: phase.name,
  subtitle: phase.scope,
  description: phase.desc,
  theme: {
    badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    dot: "bg-purple-400",
    border: "border-purple-500/30",
    bgSubtle: "bg-purple-500/[0.03]",
    textAccent: "text-purple-400",
  },
  lessons: EXPRESS_LESSONS.filter((l) => l.phaseId === phase.id),
  capstone: phase.phaseNumber === 5 ? EXPRESS_CAPSTONE : undefined,
}));

// ─────────────────────────────────────────────────────────────
// Related / Next Topics
// ─────────────────────────────────────────────────────────────

export const EXPRESS_RELATED_TOPICS = [
  {
    id: "rel-nestjs",
    title: "NestJS",
    desc: "Scale your backend knowledge with enterprise architecture, Dependency Injection, and decorators.",
    badge: "Framework",
    path: "/learn/nestjs",
  },
  {
    id: "rel-typescript",
    title: "TypeScript",
    desc: "Add strict static typing, request/response interfaces, and compile-time guarantees to Express APIs.",
    badge: "Language",
    path: "/learn/typescript",
  },
  {
    id: "rel-nextjs",
    title: "Next.js",
    desc: "Combine backend endpoints with high-performance React Server Components and full-stack web applications.",
    badge: "Full-Stack",
    path: "/learn/nextjs",
  },
];

// ─────────────────────────────────────────────────────────────
// Helper Query Functions
// ─────────────────────────────────────────────────────────────

export function getAllLessons(): LessonMeta[] {
  return EXPRESS_LESSONS;
}

export function getAllExpressLessons(): LessonMeta[] {
  return EXPRESS_LESSONS;
}

export function getLessonBySlug(slug: string): LessonMeta | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();

  // 1. Direct match by slug or code
  const match = EXPRESS_LESSONS.find(
    (l) => l.slug.toLowerCase() === normalized || l.code.toLowerCase() === normalized
  );
  if (match) return match;

  // 2. Legacy alias resolution
  const mappedSlug = EXPRESS_LEGACY_SLUG_MAP[normalized];
  if (mappedSlug) {
    return EXPRESS_LESSONS.find((l) => l.slug.toLowerCase() === mappedSlug.toLowerCase());
  }

  return undefined;
}

export function getLessonsByPhaseId(phaseId: string): LessonMeta[] {
  return EXPRESS_LESSONS.filter((l) => l.phaseId === phaseId);
}

export function getStageByLessonSlug(slug: string): PhaseMeta | undefined {
  const lesson = getLessonBySlug(slug);
  if (!lesson) return undefined;
  return EXPRESS_PROGRESSION_PHASES.find((p) => p.id === lesson.phaseId);
}

export function getNextLesson(currentSlug: string): LessonMeta | null {
  const resolved = getLessonBySlug(currentSlug);
  if (!resolved) return null;
  const idx = EXPRESS_LESSONS.findIndex((l) => l.slug === resolved.slug);
  if (idx === -1 || idx === EXPRESS_LESSONS.length - 1) return null;
  return EXPRESS_LESSONS[idx + 1];
}

export function getPrevLesson(currentSlug: string): LessonMeta | null {
  const resolved = getLessonBySlug(currentSlug);
  if (!resolved) return null;
  const idx = EXPRESS_LESSONS.findIndex((l) => l.slug === resolved.slug);
  if (idx <= 0) return null;
  return EXPRESS_LESSONS[idx - 1];
}

export const PROGRESSION_PHASES = EXPRESS_PROGRESSION_PHASES;

export function getExpressCourse(): Course {
  const allLessons = getAllLessons();
  return {
    id: "express",
    title: "Learn Express.js",
    prerequisites: {
      items: [
        "JavaScript fundamentals: async/await, Promises, arrow functions, and ES Modules",
        "Node.js runtime basics: modules, package.json dependencies, and npm scripts",
        "HTTP essentials: client-server architecture, methods (GET/POST/PUT/DELETE), and status codes",
      ],
      refresherHref: "/learn/nodejs",
      refresherLabel: "Need a refresher? Open the Node.js curriculum",
    },
    capstone: {
      title: EXPRESS_CAPSTONE.title,
      description:
        "Your finish line: architect and test a complete, production-grade Express.js REST API featuring modular routers, input validation, JWT authentication, and centralized error middleware.",
      href: EXPRESS_CAPSTONE.path,
    },
    phases: EXPRESS_PROGRESSION_PHASES.map((phase) => ({
      id: phase.id,
      name: phase.name,
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
