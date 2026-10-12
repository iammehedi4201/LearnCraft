/**
 * Express.js Curriculum Data Definition for LearnCraft
 * 10 Phases, 28 In-Depth Lessons, and 1 Comprehensive Capstone Project.
 */

import type { Course } from "@/components/curriculum/types";

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
    name: "Express.js Fundamentals",
    label: "Phase 01: Express.js Fundamentals",
    desc: "Understand what Express.js adds on top of Node.js HTTP servers, the app object, and the core request-response cycle.",
    scope: "Runtime Bridge · App Object · Request-Response Cycle",
    lessonCodes: ["EXP-01", "EXP-02", "EXP-03"],
  },
  {
    id: "routing",
    phaseNumber: 2,
    name: "Routing & URL Parameters",
    label: "Phase 02: Routing & URL Parameters",
    desc: "Master HTTP method routing, route params, query strings, and modular routing with express.Router().",
    scope: "HTTP Methods · Route & Query Params · express.Router",
    lessonCodes: ["EXP-04", "EXP-05", "EXP-06"],
  },
  {
    id: "request-response",
    phaseNumber: 3,
    name: "Request & Response Data Flow",
    label: "Phase 03: Request & Response Data Flow",
    desc: "Inspect incoming headers, parse JSON and urlencoded request bodies, and send typed HTTP responses.",
    scope: "Headers · Body Parsing (express.json) · Status Codes",
    lessonCodes: ["EXP-07", "EXP-08", "EXP-09"],
  },
  {
    id: "middleware",
    phaseNumber: 4,
    name: "The Middleware Pipeline",
    label: "Phase 04: The Middleware Pipeline",
    desc: "Build a solid mental model of middleware: req, res, next(), execution ordering, and stopping request flows.",
    scope: "req / res / next() · App vs Router Scope · Execution Order",
    lessonCodes: ["EXP-10", "EXP-11", "EXP-12"],
  },
  {
    id: "rest-apis",
    phaseNumber: 5,
    name: "Building RESTful APIs",
    label: "Phase 05: Building RESTful APIs",
    desc: "Design clean CRUD endpoints, resource URI conventions, pagination, filtering, and standard response envelopes.",
    scope: "REST Resources · CRUD Operations · Pagination & Filtering",
    lessonCodes: ["EXP-13", "EXP-14", "EXP-15"],
  },
  {
    id: "validation",
    phaseNumber: 6,
    name: "Request Validation & Data Handling",
    label: "Phase 06: Request Validation & Data Handling",
    desc: "Validate incoming payloads, parameters, and query strings while separating validation from business logic.",
    scope: "Payload Validation · Error Formatting · Clean Handlers",
    lessonCodes: ["EXP-16", "EXP-17"],
  },
  {
    id: "error-handling",
    phaseNumber: 7,
    name: "Error Handling & Async Flow",
    label: "Phase 07: Error Handling & Async Flow",
    desc: "Handle synchronous and asynchronous errors with next(err), 4-argument error middleware, and 404 catch-alls.",
    scope: "next(err) · 4-Arg Error Middleware · Express 5 Async Catch",
    lessonCodes: ["EXP-18", "EXP-19", "EXP-20"],
  },
  {
    id: "architecture",
    phaseNumber: 8,
    name: "Application Architecture & Organization",
    label: "Phase 08: Application Architecture & Organization",
    desc: "Structure scalable Express code with Controller-Service separation, route modules, and environment configs.",
    scope: "Controller-Service Pattern · Modularity · Config & Bootstrap",
    lessonCodes: ["EXP-21", "EXP-22"],
  },
  {
    id: "auth",
    phaseNumber: 9,
    name: "Authentication & Route Protection",
    label: "Phase 09: Authentication & Route Protection",
    desc: "Implement token authentication middleware, user context injection (req.user), and role-based route guards.",
    scope: "JWT Verification · req.user Context · Role Guards (RBAC)",
    lessonCodes: ["EXP-23", "EXP-24", "EXP-25"],
  },
  {
    id: "testing-mastery",
    phaseNumber: 10,
    name: "Debugging, Testing & Best Practices",
    label: "Phase 10: Debugging, Testing & Best Practices",
    desc: "Debug hanging requests, test endpoints with Supertest, and apply production reliability and security best practices.",
    scope: "Request Flow Debugging · Supertest API Tests · Best Practices",
    lessonCodes: ["EXP-26", "EXP-27", "EXP-28"],
  },
];

export const EXPRESS_LESSONS: LessonMeta[] = [
  // Phase 1: Express.js Fundamentals
  {
    code: "EXP-01",
    slug: "exp01-what-is-express",
    name: "What Is Express.js & The Node.js Web Layer",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 1,
    desc: "Discover why Express was built, what it adds over Node's native http module, and how it simplifies web server development.",
    estimatedMinutes: 15,
    xpReward: 50,
    path: "/learn/express/exp01-what-is-express",
    color: "purple",
  },
  {
    code: "EXP-02",
    slug: "exp02-app-object",
    name: "Creating the Application & The Express app Object",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 2,
    desc: "Initialize an Express app, understand the core app instance, configure port listening, and organize initial project files.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "EXP-01",
    path: "/learn/express/exp02-app-object",
    color: "purple",
  },
  {
    code: "EXP-03",
    slug: "exp03-req-res-cycle",
    name: "Understanding the Request-Response Cycle",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 3,
    desc: "Follow the complete journey of an HTTP request from arrival, through Express routing, to response dispatch and socket closing.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "EXP-02",
    path: "/learn/express/exp03-req-res-cycle",
    color: "purple",
  },

  // Phase 2: Routing & URL Parameters
  {
    code: "EXP-04",
    slug: "exp04-http-methods-routes",
    name: "HTTP Methods & Basic Route Definition",
    phaseId: "routing",
    phaseNumber: 2,
    stepNumber: 4,
    desc: "Define clean GET, POST, PUT, PATCH, and DELETE endpoints with path patterns and route handler callbacks.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "EXP-03",
    path: "/learn/express/exp04-http-methods-routes",
    color: "purple",
  },
  {
    code: "EXP-05",
    slug: "exp05-route-query-params",
    name: "Route Parameters (req.params) vs Query Strings (req.query)",
    phaseId: "routing",
    phaseNumber: 2,
    stepNumber: 5,
    desc: "Extract dynamic URL segments with req.params and optional filters/pagination flags with req.query safely.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "EXP-04",
    path: "/learn/express/exp05-route-query-params",
    color: "purple",
  },
  {
    code: "EXP-06",
    slug: "exp06-express-router",
    name: "Modular Routing with express.Router()",
    phaseId: "routing",
    phaseNumber: 2,
    stepNumber: 6,
    desc: "Split routes into dedicated mini-applications using express.Router() and mount them cleanly on root prefix paths.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "EXP-05",
    path: "/learn/express/exp06-express-router",
    color: "purple",
  },

  // Phase 3: Request & Response Data Flow
  {
    code: "EXP-07",
    slug: "exp07-headers-status-json",
    name: "Inspecting Headers, HTTP Status Codes & Sending JSON",
    phaseId: "request-response",
    phaseNumber: 3,
    stepNumber: 7,
    desc: "Read request headers, set appropriate HTTP status codes (200, 201, 400, 404, 500), and return serialized JSON payloads with res.json().",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "EXP-06",
    path: "/learn/express/exp07-headers-status-json",
    color: "purple",
  },
  {
    code: "EXP-08",
    slug: "exp08-body-parsing",
    name: "Body Parsing with express.json() & express.urlencoded()",
    phaseId: "request-response",
    phaseNumber: 3,
    stepNumber: 8,
    desc: "Understand how incoming request streams are buffered and parsed into req.body using built-in body parsing middleware.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "EXP-07",
    path: "/learn/express/exp08-body-parsing",
    color: "purple",
  },
  {
    code: "EXP-09",
    slug: "exp09-response-helpers",
    name: "Handling Response Helpers, Content Negotiation & Redirects",
    phaseId: "request-response",
    phaseNumber: 3,
    stepNumber: 9,
    desc: "Use res.status(), res.send(), res.sendFile(), res.redirect(), and avoid common 'Cannot set headers after they are sent' errors.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "EXP-08",
    path: "/learn/express/exp09-response-helpers",
    color: "purple",
  },

  // Phase 4: The Middleware Pipeline
  {
    code: "EXP-10",
    slug: "exp10-middleware-mental-model",
    name: "What Is Middleware? The (req, res, next) Mental Model",
    phaseId: "middleware",
    phaseNumber: 4,
    stepNumber: 10,
    desc: "Build a rock-solid mental model of middleware functions, how next() hands off control, and why order of registration dictates behavior.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "EXP-09",
    path: "/learn/express/exp10-middleware-mental-model",
    color: "purple",
  },
  {
    code: "EXP-11",
    slug: "exp11-middleware-scopes",
    name: "Application-Level vs Router-Level vs Route-Level Middleware",
    phaseId: "middleware",
    phaseNumber: 4,
    stepNumber: 11,
    desc: "Apply middleware globally across the entire app, scoped to specific routers, or attached to individual route handlers.",
    estimatedMinutes: 20,
    xpReward: 70,
    prerequisite: "EXP-10",
    path: "/learn/express/exp11-middleware-scopes",
    color: "purple",
  },
  {
    code: "EXP-12",
    slug: "exp12-custom-middleware-order",
    name: "Writing Custom Middleware, Modifying req & Execution Order",
    phaseId: "middleware",
    phaseNumber: 4,
    stepNumber: 12,
    desc: "Create production-ready request loggers, execution timers, and context enrichers by attaching data to req and understanding short-circuiting.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "EXP-11",
    path: "/learn/express/exp12-custom-middleware-order",
    color: "purple",
  },

  // Phase 5: Building RESTful APIs
  {
    code: "EXP-13",
    slug: "exp13-rest-crud-endpoints",
    name: "REST Resource Architecture & Complete CRUD Endpoints",
    phaseId: "rest-apis",
    phaseNumber: 5,
    stepNumber: 13,
    desc: "Build a complete in-memory resource API supporting GET list, GET by ID, POST creation, PUT full replacement, and DELETE operations.",
    estimatedMinutes: 30,
    xpReward: 90,
    prerequisite: "EXP-12",
    path: "/learn/express/exp13-rest-crud-endpoints",
    color: "purple",
  },
  {
    code: "EXP-14",
    slug: "exp14-pagination-filtering",
    name: "Filtering, Pagination & Sorting Query Parameters",
    phaseId: "rest-apis",
    phaseNumber: 5,
    stepNumber: 14,
    desc: "Implement query-driven search, field filtering, page/limit slicing, and dynamic sorting on REST collection endpoints.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "EXP-13",
    path: "/learn/express/exp14-pagination-filtering",
    color: "purple",
  },
  {
    code: "EXP-15",
    slug: "exp15-api-response-envelopes",
    name: "Standardizing API Response Payloads & Meta Envelopes",
    phaseId: "rest-apis",
    phaseNumber: 5,
    stepNumber: 15,
    desc: "Establish clean, consistent JSON response shapes ({ success, data, meta, error }) across all endpoints in your API.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "EXP-14",
    path: "/learn/express/exp15-api-response-envelopes",
    color: "purple",
  },

  // Phase 6: Request Validation & Data Handling
  {
    code: "EXP-16",
    slug: "exp16-request-validation",
    name: "Why Request Validation Matters & Validating Inputs",
    phaseId: "validation",
    phaseNumber: 6,
    stepNumber: 16,
    desc: "Protect your application against missing fields, invalid types, and malformed inputs before reaching your core business logic.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "EXP-15",
    path: "/learn/express/exp16-request-validation",
    color: "purple",
  },
  {
    code: "EXP-17",
    slug: "exp17-validation-middleware",
    name: "Building Reusable Validation Middleware & 400 Bad Request Payloads",
    phaseId: "validation",
    phaseNumber: 6,
    stepNumber: 17,
    desc: "Construct higher-order validation middleware functions that validate request schemas and return structured 400 validation error lists.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "EXP-16",
    path: "/learn/express/exp17-validation-middleware",
    color: "purple",
  },

  // Phase 7: Error Handling & Express 5 Async Flow
  {
    code: "EXP-18",
    slug: "exp18-sync-async-errors",
    name: "Synchronous vs Asynchronous Errors & next(err)",
    phaseId: "error-handling",
    phaseNumber: 7,
    stepNumber: 18,
    desc: "Understand how errors propagate in Express, passing errors to next(err), and how Express 5 automatically catches unhandled Promise rejections.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "EXP-17",
    path: "/learn/express/exp18-sync-async-errors",
    color: "purple",
  },
  {
    code: "EXP-19",
    slug: "exp19-error-handling-middleware",
    name: "The 4-Argument Error-Handling Middleware (err, req, res, next)",
    phaseId: "error-handling",
    phaseNumber: 7,
    stepNumber: 19,
    desc: "Implement centralized error-handling middleware with the unique 4-parameter signature, distinguish operational vs programmer errors, and sanitize error details.",
    estimatedMinutes: 30,
    xpReward: 90,
    prerequisite: "EXP-18",
    path: "/learn/express/exp19-error-handling-middleware",
    color: "purple",
  },
  {
    code: "EXP-20",
    slug: "exp20-404-global-error-handling",
    name: "404 Not Found Catch-All & Global Resilient Error Flow",
    phaseId: "error-handling",
    phaseNumber: 7,
    stepNumber: 20,
    desc: "Position 404 handler middleware correctly after all active routes and guarantee a reliable, non-leaking JSON error response on all failure cases.",
    estimatedMinutes: 20,
    xpReward: 70,
    prerequisite: "EXP-19",
    path: "/learn/express/exp20-404-global-error-handling",
    color: "purple",
  },

  // Phase 8: Application Architecture & Organization
  {
    code: "EXP-21",
    slug: "exp21-controller-service-separation",
    name: "Layered Architecture: Routes, Controllers & In-Memory Services",
    phaseId: "architecture",
    phaseNumber: 8,
    stepNumber: 21,
    desc: "Refactor messy monolithic route files into clean architectural layers: routing definitions, HTTP controllers, and pure business logic services.",
    estimatedMinutes: 30,
    xpReward: 90,
    prerequisite: "EXP-20",
    path: "/learn/express/exp21-controller-service-separation",
    color: "purple",
  },
  {
    code: "EXP-22",
    slug: "exp22-env-config-bootstrap",
    name: "Environment Configuration with dotenv & Safe Bootstrap (app.js vs server.js)",
    phaseId: "architecture",
    phaseNumber: 8,
    stepNumber: 22,
    desc: "Separate Express app definition from HTTP server listen calls to enable seamless testing and manage environment configuration safely.",
    estimatedMinutes: 20,
    xpReward: 70,
    prerequisite: "EXP-21",
    path: "/learn/express/exp22-env-config-bootstrap",
    color: "purple",
  },

  // Phase 9: Authentication & Route Protection
  {
    code: "EXP-23",
    slug: "exp23-auth-concepts",
    name: "Authentication vs Authorization & Token-Based Flow",
    phaseId: "auth",
    phaseNumber: 9,
    stepNumber: 23,
    desc: "Understand the core difference between who the caller is (Authentication) vs what they are allowed to do (Authorization) in stateless web APIs.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "EXP-22",
    path: "/learn/express/exp23-auth-concepts",
    color: "purple",
  },
  {
    code: "EXP-24",
    slug: "exp24-jwt-auth-middleware",
    name: "Building Token Verification Middleware & Attaching req.user",
    phaseId: "auth",
    phaseNumber: 9,
    stepNumber: 24,
    desc: "Write an authenticateToken middleware that parses Authorization Bearer headers, verifies signatures, and injects authenticated user data onto req.user.",
    estimatedMinutes: 30,
    xpReward: 90,
    prerequisite: "EXP-23",
    path: "/learn/express/exp24-jwt-auth-middleware",
    color: "purple",
  },
  {
    code: "EXP-25",
    slug: "exp25-rbac-guards",
    name: "Role-Based Access Control (RBAC) & Route Permission Guards",
    phaseId: "auth",
    phaseNumber: 9,
    stepNumber: 25,
    desc: "Create flexible authorization middleware (authorizeRoles('admin', 'manager')) to restrict endpoints based on user permissions with 403 Forbidden responses.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "EXP-24",
    path: "/learn/express/exp25-rbac-guards",
    color: "purple",
  },

  // Phase 10: Debugging, Testing & Best Practices
  {
    code: "EXP-26",
    slug: "exp26-debugging-common-mistakes",
    name: "Debugging Request Flow, Hanging Requests & Anti-Patterns",
    phaseId: "testing-mastery",
    phaseNumber: 10,
    stepNumber: 26,
    desc: "Identify and resolve the most common Express bugs: forgotten next(), uncaught async errors, double response sends, and incorrect middleware registration order.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "EXP-25",
    path: "/learn/express/exp26-debugging-common-mistakes",
    color: "purple",
  },
  {
    code: "EXP-27",
    slug: "exp27-testing-express-supertest",
    name: "Integration Testing Express Endpoints with Supertest",
    phaseId: "testing-mastery",
    phaseNumber: 10,
    stepNumber: 27,
    desc: "Write clean, deterministic HTTP endpoint integration tests with Supertest against exported Express apps without starting physical network ports.",
    estimatedMinutes: 30,
    xpReward: 90,
    prerequisite: "EXP-26",
    path: "/learn/express/exp27-testing-express-supertest",
    color: "purple",
  },
  {
    code: "EXP-28",
    slug: "exp28-production-best-practices",
    name: "Express Production Architecture, Security & Graceful Teardown",
    phaseId: "testing-mastery",
    phaseNumber: 10,
    stepNumber: 28,
    desc: "Master the final production checklist: security headers (helmet concepts), request rate limiting, CORS configuration, and graceful SIGTERM shutdown.",
    estimatedMinutes: 25,
    xpReward: 100,
    prerequisite: "EXP-27",
    path: "/learn/express/exp28-production-best-practices",
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
  stageNumber: 11,
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
  capstone: phase.phaseNumber === 10 ? EXPRESS_CAPSTONE : undefined,
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

export function getLessonBySlug(slug: string): LessonMeta | undefined {
  return EXPRESS_LESSONS.find(
    (l) => l.slug.toLowerCase() === slug.toLowerCase() || l.code.toLowerCase() === slug.toLowerCase()
  );
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
  const idx = EXPRESS_LESSONS.findIndex(
    (l) => l.slug.toLowerCase() === currentSlug.toLowerCase() || l.code.toLowerCase() === currentSlug.toLowerCase()
  );
  if (idx === -1 || idx === EXPRESS_LESSONS.length - 1) return null;
  return EXPRESS_LESSONS[idx + 1];
}

export function getPrevLesson(currentSlug: string): LessonMeta | null {
  const idx = EXPRESS_LESSONS.findIndex(
    (l) => l.slug.toLowerCase() === currentSlug.toLowerCase() || l.code.toLowerCase() === currentSlug.toLowerCase()
  );
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

