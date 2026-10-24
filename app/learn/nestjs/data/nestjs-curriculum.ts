/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NESTJS CURRICULUM — AUTHORITATIVE DATA LAYER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Clean 5-Stage pedagogical progression covering the NestJS framework,
 * Modules, Controllers, Services, Dependency Injection, Validation Pipes,
 * Middleware, Guards, Interceptors, Lifecycle, and Unit Testing.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import type { Course } from "@/components/curriculum/types";

export type ContentTag = "CORE" | "BUILD" | "PROFESSIONAL" | "REFERENCE";

export interface NestjsLessonMeta {
  code: string;
  slug: string;
  name: string;
  desc: string;
  path: string;
  tag: ContentTag;
  difficulty?: "Easy" | "Moderate" | "Difficult" | string;
  estimatedMinutes: number;
  prerequisite?: string;
  stepNumber: number;
}

// Backward-compatible alias
export type LessonMeta = NestjsLessonMeta;

export interface NestjsCapstoneProjectMeta {
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

// Backward-compatible alias
export type CapstoneProjectMeta = NestjsCapstoneProjectMeta;

export interface NestjsStageMeta {
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
  lessons: NestjsLessonMeta[];
  capstone?: NestjsCapstoneProjectMeta;
}

// Backward-compatible alias
export type StageMeta = NestjsStageMeta;

export interface NestjsProgressionPhaseMeta {
  id: string;
  phaseNumber: number;
  label: string;
  tag: string;
  desc: string;
  scope: string;
  icon: "layers" | "server" | "zap" | "database" | "shield";
  lessonCodes: string[];
}

// Backward-compatible alias
export type ProgressionPhaseMeta = NestjsProgressionPhaseMeta;

// ─────────────────────────────────────────────────────────────
// STAGE CAPSTONES
// ─────────────────────────────────────────────────────────────

export const NESTJS_STAGE_1_CAPSTONE: NestjsCapstoneProjectMeta = {
  id: "nestjs-capstone-stage-1",
  stageNumber: 1,
  slug: "stage-1-task-manager",
  title: "Modular Service Starter",
  subtitle: "Stage 1 Capstone Project",
  desc: "Build a structured backend foundation combining NestFactory, AppModule, and domain feature modules.",
  path: "/learn/nestjs/projects/stage-1-task-manager",
  badge: "🛠️ Capstone",
  xpReward: 100,
  estimatedMinutes: 30,
  prerequisites: ["NJ-01", "NJ-03", "NJ-04"],
  skillsTaught: [
    "NestJS Application Bootstrap",
    "main.ts Server Configuration",
    "AppModule Root Tree",
    "Feature Module Encapsulation",
  ],
  stepsCount: 3,
};

// Backward-compatible alias
export const STAGE_1_CAPSTONE = NESTJS_STAGE_1_CAPSTONE;

export const NESTJS_CAPSTONE: NestjsCapstoneProjectMeta = {
  id: "nestjs-capstone-stage-5",
  stageNumber: 5,
  slug: "nestjs-rest-api",
  title: "Enterprise REST API Architecture",
  subtitle: "Stage 5 Final Capstone Project",
  desc: "Architect a production-grade NestJS REST API with modular boundaries, dependency injection, DTO validation pipes, guards, and unit tests.",
  path: "/learn/nestjs/projects/nestjs-rest-api",
  badge: "🛠️ Capstone",
  xpReward: 150,
  estimatedMinutes: 45,
  prerequisites: ["NJ-01", "NJ-04", "NJ-05", "NJ-08", "NJ-09", "NJ-11", "NJ-12", "NJ-19"],
  skillsTaught: [
    "Modular Feature Architecture",
    "Dependency Injection Containers",
    "DTO Validation Pipes",
    "Guards & Error Exceptions",
    "Service Unit Testing with Test.createTestingModule",
  ],
  stepsCount: 4,
};

// ─────────────────────────────────────────────────────────────
// AUTHORITATIVE 5 STAGES (19 LESSONS)
// ─────────────────────────────────────────────────────────────

export const NESTJS_STAGES: NestjsStageMeta[] = [
  // ── Stage 1: Understand the NestJS Structure ──
  {
    id: "stage-1-structure",
    stageNumber: 1,
    name: "Stage 1: Understand the NestJS Structure",
    subtitle: "Core Architecture & Startup",
    milestone: "Master the structure of NestJS, main.ts bootstrap, and modules.",
    description: "Learn how NestJS organizes server-side code using modules, controllers, and providers. Master main.ts bootstrap and architectural patterns.",
    theme: {
      badge: "border-purple-500/30 text-purple-400 bg-purple-500/10",
      dot: "bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]",
      border: "border-purple-500/20 hover:border-purple-500/40",
      bgSubtle: "bg-purple-950/20",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "NJ-01",
        slug: "nj01-what-is-nestjs",
        name: "What Is NestJS?",
        desc: "Framework overview, Node.js server architecture, controllers, and modules.",
        path: "/learn/nestjs/nj01-what-is-nestjs",
        tag: "CORE",
        difficulty: "Easy",
        estimatedMinutes: 15,
        stepNumber: 1,
      },
      {
        code: "NJ-03",
        slug: "nj03-project-structure-and-main",
        name: "Project Structure and main.ts",
        desc: "Application bootstrap, NestFactory, AppModule root, and server port configuration.",
        path: "/learn/nestjs/nj03-project-structure-and-main",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NJ-01",
        stepNumber: 2,
      },
      {
        code: "NJ-04",
        slug: "nj04-modules",
        name: "Modules",
        desc: "Organizing controllers and services into clean feature domains with @Module.",
        path: "/learn/nestjs/nj04-modules",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NJ-03",
        stepNumber: 3,
      },
    ],
    capstone: NESTJS_STAGE_1_CAPSTONE,
  },

  // ── Stage 2: Handle Requests and Organize Logic ──
  {
    id: "stage-2-requests-logic",
    stageNumber: 2,
    name: "Stage 2: Handle Requests and Organize Logic",
    subtitle: "Controllers, Services & Dependency Injection",
    milestone: "Handle HTTP methods, parse route and query params, inject services, and use decorators.",
    description: "Build robust REST endpoints using controllers, route parameters, injectable services, and constructor dependency injection.",
    theme: {
      badge: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
      dot: "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]",
      border: "border-cyan-500/20 hover:border-cyan-500/40",
      bgSubtle: "bg-cyan-950/20",
      textAccent: "text-cyan-400",
    },
    lessons: [
      {
        code: "NJ-05",
        slug: "nj05-controllers",
        name: "Controllers",
        desc: "Receiving HTTP requests, routing to methods, and returning responses.",
        path: "/learn/nestjs/nj05-controllers",
        tag: "CORE",
        difficulty: "Easy",
        estimatedMinutes: 15,
        prerequisite: "NJ-04",
        stepNumber: 4,
      },
      {
        code: "NJ-06",
        slug: "nj06-routes-and-http-methods",
        name: "Routes and HTTP Methods",
        desc: "Connecting GET, POST, PUT, and DELETE methods to RESTful operations.",
        path: "/learn/nestjs/nj06-routes-and-http-methods",
        tag: "CORE",
        difficulty: "Easy",
        estimatedMinutes: 15,
        prerequisite: "NJ-05",
        stepNumber: 5,
      },
      {
        code: "NJ-07",
        slug: "nj07-parameters-and-request-bodies",
        name: "Route Parameters, Query Parameters, and Request Bodies",
        desc: "Extracting inputs using @Param, @Query, and @Body decorators.",
        path: "/learn/nestjs/nj07-parameters-and-request-bodies",
        tag: "BUILD",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NJ-06",
        stepNumber: 6,
      },
      {
        code: "NJ-08",
        slug: "nj08-providers-and-services",
        name: "Providers and Services",
        desc: "Encapsulating business logic and data operations in @Injectable providers.",
        path: "/learn/nestjs/nj08-providers-and-services",
        tag: "CORE",
        difficulty: "Easy",
        estimatedMinutes: 15,
        prerequisite: "NJ-07",
        stepNumber: 7,
      },
      {
        code: "NJ-09",
        slug: "nj09-dependency-injection",
        name: "Dependency Injection",
        desc: "How NestJS provides dependencies via constructor parameter type annotations.",
        path: "/learn/nestjs/nj09-dependency-injection",
        tag: "PROFESSIONAL",
        difficulty: "Difficult",
        estimatedMinutes: 25,
        prerequisite: "NJ-08",
        stepNumber: 8,
      },
      {
        code: "NJ-10",
        slug: "nj10-decorators",
        name: "Decorators",
        desc: "Understanding class, method, and parameter decorators for declarative metadata.",
        path: "/learn/nestjs/nj10-decorators",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NJ-09",
        stepNumber: 9,
      },
    ],
  },

  // ── Stage 3: Check Inputs and Handle Errors ──
  {
    id: "stage-3-validation-errors",
    stageNumber: 3,
    name: "Stage 3: Check Inputs and Handle Errors",
    subtitle: "DTOs, Validation Pipes & Exceptions",
    milestone: "Validate inputs with DTOs and ValidationPipe, and throw semantic HTTP exceptions.",
    description: "Guard endpoints against invalid data using class-validator DTOs, and handle errors predictably using NestJS built-in HTTP exceptions.",
    theme: {
      badge: "border-amber-500/30 text-amber-400 bg-amber-500/10",
      dot: "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]",
      border: "border-amber-500/20 hover:border-amber-500/40",
      bgSubtle: "bg-amber-950/20",
      textAccent: "text-amber-400",
    },
    lessons: [
      {
        code: "NJ-11",
        slug: "nj11-dtos-data-transfer-objects",
        name: "DTOs (Data Transfer Objects)",
        desc: "Defining explicit input shapes and schemas using TypeScript classes.",
        path: "/learn/nestjs/nj11-dtos-data-transfer-objects",
        tag: "BUILD",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NJ-10",
        stepNumber: 10,
      },
      {
        code: "NJ-12",
        slug: "nj12-validation-and-pipes",
        name: "Validation and Pipes",
        desc: "Input validation and sanitization using ValidationPipe and class-validator.",
        path: "/learn/nestjs/nj12-validation-and-pipes",
        tag: "PROFESSIONAL",
        difficulty: "Difficult",
        estimatedMinutes: 25,
        prerequisite: "NJ-11",
        stepNumber: 11,
      },
      {
        code: "NJ-13",
        slug: "nj13-handling-errors",
        name: "Handling Errors",
        desc: "Throwing built-in HTTP exceptions like NotFoundException and BadRequestException.",
        path: "/learn/nestjs/nj13-handling-errors",
        tag: "BUILD",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NJ-12",
        stepNumber: 12,
      },
    ],
  },

  // ── Stage 4: Control the Request Process ──
  {
    id: "stage-4-request-lifecycle",
    stageNumber: 4,
    name: "Stage 4: Control the Request Process",
    subtitle: "Middleware, Guards, Interceptors & Lifecycle",
    milestone: "Master the full NestJS request execution lifecycle and boundary controls.",
    description: "Control incoming traffic with middleware, guard routes with boolean permission checks, transform responses with interceptors, and understand the request lifecycle.",
    theme: {
      badge: "border-rose-500/30 text-rose-400 bg-rose-500/10",
      dot: "bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.6)]",
      border: "border-rose-500/20 hover:border-rose-500/40",
      bgSubtle: "bg-rose-950/20",
      textAccent: "text-rose-400",
    },
    lessons: [
      {
        code: "NJ-14",
        slug: "nj14-middleware",
        name: "Middleware",
        desc: "Running early code before controller handlers for logging and header inspection.",
        path: "/learn/nestjs/nj14-middleware",
        tag: "BUILD",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NJ-13",
        stepNumber: 13,
      },
      {
        code: "NJ-15",
        slug: "nj15-guards-and-route-protection",
        name: "Guards and Route Protection",
        desc: "Protecting endpoints with CanActivate permission checks and @UseGuards().",
        path: "/learn/nestjs/nj15-guards-and-route-protection",
        tag: "PROFESSIONAL",
        difficulty: "Difficult",
        estimatedMinutes: 25,
        prerequisite: "NJ-14",
        stepNumber: 14,
      },
      {
        code: "NJ-16",
        slug: "nj16-interceptors",
        name: "Interceptors",
        desc: "Executing code before and after handler execution with RxJS operators.",
        path: "/learn/nestjs/nj16-interceptors",
        tag: "BUILD",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NJ-15",
        stepNumber: 15,
      },
      {
        code: "NJ-17",
        slug: "nj17-the-request-lifecycle",
        name: "The Request Lifecycle",
        desc: "The exact execution order of Middleware, Guards, Interceptors, Pipes, and Handlers.",
        path: "/learn/nestjs/nj17-the-request-lifecycle",
        tag: "PROFESSIONAL",
        difficulty: "Difficult",
        estimatedMinutes: 25,
        prerequisite: "NJ-16",
        stepNumber: 16,
      },
    ],
  },

  // ── Stage 5: Authentication, Testing, and Good Structure ──
  {
    id: "stage-5-auth-testing",
    stageNumber: 5,
    name: "Stage 5: Authentication, Testing, and Good Structure",
    subtitle: "Auth vs AuthZ, Unit Tests & Clean Architecture",
    milestone: "Architect secure features, write fast service tests, and debug dependency graphs.",
    description: "Understand the clear difference between authentication and authorization, write isolated unit tests with Test.createTestingModule, and organize scalable feature modules.",
    theme: {
      badge: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
      dot: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]",
      border: "border-emerald-500/20 hover:border-emerald-500/40",
      bgSubtle: "bg-emerald-950/20",
      textAccent: "text-emerald-400",
    },
    lessons: [
      {
        code: "NJ-18",
        slug: "nj18-authentication-vs-authorization",
        name: "Authentication vs. Authorization",
        desc: "Separating identity verification (who you are) from permission validation (what you can do).",
        path: "/learn/nestjs/nj18-authentication-vs-authorization",
        tag: "PROFESSIONAL",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NJ-17",
        stepNumber: 17,
      },
      {
        code: "NJ-19",
        slug: "nj19-testing-a-nestjs-service",
        name: "Testing a NestJS Service",
        desc: "Writing fast, isolated unit tests using Test.createTestingModule and mocked providers.",
        path: "/learn/nestjs/nj19-testing-a-nestjs-service",
        tag: "BUILD",
        difficulty: "Moderate",
        estimatedMinutes: 25,
        prerequisite: "NJ-18",
        stepNumber: 18,
      },
      {
        code: "NJ-20",
        slug: "nj20-organize-a-feature-and-debug",
        name: "Organize a Feature and Debug Common Problems",
        desc: "Structuring feature folders, resolving missing providers, and fixing circular dependencies.",
        path: "/learn/nestjs/nj20-organize-a-feature-and-debug",
        tag: "PROFESSIONAL",
        difficulty: "Moderate",
        estimatedMinutes: 25,
        prerequisite: "NJ-19",
        stepNumber: 19,
      },
    ],
    capstone: NESTJS_CAPSTONE,
  },
];

// ─────────────────────────────────────────────────────────────
// PROGRESSION PHASES (FOR ROADMAP & DASHBOARD VIEWS)
// ─────────────────────────────────────────────────────────────

export const NESTJS_PROGRESSION_PHASES: NestjsProgressionPhaseMeta[] = [
  {
    id: "phase-1",
    phaseNumber: 1,
    label: "NestJS Foundations & Modules",
    tag: "Stage 1",
    desc: "Understand NestJS architecture, main.ts entry point, and modules.",
    scope: "NJ-01, NJ-03, NJ-04",
    icon: "layers",
    lessonCodes: ["NJ-01", "NJ-03", "NJ-04"],
  },
  {
    id: "phase-2",
    phaseNumber: 2,
    label: "Controllers, Services & Dependency Injection",
    tag: "Stage 2",
    desc: "Build REST endpoints, extract parameters, encapsulate business logic in services, and inject dependencies.",
    scope: "NJ-05 to NJ-10",
    icon: "server",
    lessonCodes: ["NJ-05", "NJ-06", "NJ-07", "NJ-08", "NJ-09", "NJ-10"],
  },
  {
    id: "phase-3",
    phaseNumber: 3,
    label: "DTOs, Validation & Error Handling",
    tag: "Stage 3",
    desc: "Enforce input schemas with class-based DTOs, ValidationPipe, and built-in HTTP error exceptions.",
    scope: "NJ-11 to NJ-13",
    icon: "shield",
    lessonCodes: ["NJ-11", "NJ-12", "NJ-13"],
  },
  {
    id: "phase-4",
    phaseNumber: 4,
    label: "Middleware, Guards, Interceptors & Lifecycle",
    tag: "Stage 4",
    desc: "Control request execution with middleware, guards, interceptors, and master the full request lifecycle.",
    scope: "NJ-14 to NJ-17",
    icon: "zap",
    lessonCodes: ["NJ-14", "NJ-15", "NJ-16", "NJ-17"],
  },
  {
    id: "phase-5",
    phaseNumber: 5,
    label: "Authentication, Testing & Architecture",
    tag: "Stage 5",
    desc: "Differentiate AuthN from AuthZ, write isolated service unit tests, and structure maintainable features.",
    scope: "NJ-18 to NJ-20",
    icon: "shield",
    lessonCodes: ["NJ-18", "NJ-19", "NJ-20"],
  },
];

// Backward-compatible alias
export const PROGRESSION_PHASES = NESTJS_PROGRESSION_PHASES;

// ─────────────────────────────────────────────────────────────
// BACKWARD-COMPATIBLE LEGACY SLUG MAP
// ─────────────────────────────────────────────────────────────

export const NESTJS_LEGACY_SLUG_MAP: Record<string, string> = {
  "nj01-typescript-essentials": "nj01-what-is-nestjs",
  "nj02-oop-foundations": "nj03-project-structure-and-main",
  "nj02-typescript-basics": "nj03-project-structure-and-main",
  "nj03-decorators": "nj10-decorators",
  "nj04-solid": "nj08-providers-and-services",
  "nj05-setup": "nj03-project-structure-and-main",
  "nj06-modules": "nj04-modules",
  "nj07-controllers": "nj05-controllers",
  "nj08-services": "nj08-providers-and-services",
  "nj09-dependency-injection": "nj09-dependency-injection",
  "nj10-dto-validation": "nj11-dtos-data-transfer-objects",
  "nj11-request-lifecycle": "nj17-the-request-lifecycle",
  "nj12-pipes": "nj12-validation-and-pipes",
  "nj13-guards": "nj15-guards-and-route-protection",
  "nj14-interceptors": "nj16-interceptors",
  "nj15-exception-filters": "nj13-handling-errors",
  "nj16-middleware": "nj14-middleware",
  "nj17-custom-decorators": "nj10-decorators",
  "nj18-auth-jwt": "nj18-authentication-vs-authorization",
  "nj19-rbac": "nj18-authentication-vs-authorization",
  "nj20-security": "nj18-authentication-vs-authorization",
  "nj21-database-prisma": "nj20-organize-a-feature-and-debug",
  "nj22-entities-relations": "nj20-organize-a-feature-and-debug",
  "nj23-migrations-seeding": "nj20-organize-a-feature-and-debug",
  "nj24-pagination-filtering": "nj07-parameters-and-request-bodies",
  "nj25-serialization": "nj16-interceptors",
  "nj26-config": "nj03-project-structure-and-main",
  "nj27-logging": "nj14-middleware",
  "nj28-testing": "nj19-testing-a-nestjs-service",
  "nj29-swagger": "nj11-dtos-data-transfer-objects",
  "nj30-file-uploads": "nj07-parameters-and-request-bodies",
  "nj31-caching": "nj16-interceptors",
  "nj32-deployment": "nj20-organize-a-feature-and-debug",
};

// ─────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────

export function getAllNestjsLessons(): NestjsLessonMeta[] {
  return NESTJS_STAGES.flatMap((stage) => stage.lessons);
}

// Backward-compatible alias
export function getAllLessons(): NestjsLessonMeta[] {
  return getAllNestjsLessons();
}

// Backward-compatible alias
export function getCourseLessons(): NestjsLessonMeta[] {
  return getAllNestjsLessons();
}

export function getNestjsStages(): NestjsStageMeta[] {
  return NESTJS_STAGES;
}

export function getNestjsLessonBySlug(slug: string): NestjsLessonMeta | undefined {
  if (!slug) return undefined;
  const raw = slug.toLowerCase().trim();
  const resolvedSlug = NESTJS_LEGACY_SLUG_MAP[raw] || raw;

  return getAllNestjsLessons().find(
    (l) =>
      l.slug.toLowerCase() === resolvedSlug ||
      l.slug.toLowerCase() === raw ||
      l.code.toLowerCase() === raw ||
      l.code.toLowerCase().replace("-", "") === raw ||
      l.path.endsWith(`/${resolvedSlug}`) ||
      l.path.endsWith(`/${raw}`),
  );
}

// Backward-compatible alias
export function getLessonBySlug(slug: string): NestjsLessonMeta | undefined {
  return getNestjsLessonBySlug(slug);
}

export function getNestjsLessonByCode(code: string): NestjsLessonMeta | undefined {
  return getAllNestjsLessons().find(
    (l) => l.code.toUpperCase() === code.toUpperCase(),
  );
}

export function getNestjsStageByLessonSlug(slug: string): NestjsStageMeta | undefined {
  const lesson = getNestjsLessonBySlug(slug);
  if (!lesson) return undefined;
  return NESTJS_STAGES.find((stage) =>
    stage.lessons.some((l) => l.slug === lesson.slug),
  );
}

// Backward-compatible alias
export function getStageByLessonSlug(slug: string): NestjsStageMeta | undefined {
  return getNestjsStageByLessonSlug(slug);
}

export function getNextNestjsLesson(currentSlug: string): NestjsLessonMeta | null {
  const all = getAllNestjsLessons();
  const current = getNestjsLessonBySlug(currentSlug);
  if (!current) return null;
  const index = all.findIndex((l) => l.slug === current.slug);
  if (index >= 0 && index < all.length - 1) {
    return all[index + 1];
  }
  return null;
}

// Backward-compatible alias
export function getNextLesson(currentSlug: string): NestjsLessonMeta | null {
  return getNextNestjsLesson(currentSlug);
}

export function getPrevNestjsLesson(currentSlug: string): NestjsLessonMeta | null {
  const all = getAllNestjsLessons();
  const current = getNestjsLessonBySlug(currentSlug);
  if (!current) return null;
  const index = all.findIndex((l) => l.slug === current.slug);
  if (index > 0) {
    return all[index - 1];
  }
  return null;
}

// Backward-compatible alias
export function getPrevLesson(currentSlug: string): NestjsLessonMeta | null {
  return getPrevNestjsLesson(currentSlug);
}

export function getNestjsLessonsByPhaseId(phaseId: string): NestjsLessonMeta[] {
  const phase =
    NESTJS_PROGRESSION_PHASES.find((p) => p.id === phaseId) ||
    NESTJS_PROGRESSION_PHASES[0];
  const all = getAllNestjsLessons();
  return phase.lessonCodes
    .map((code) => all.find((l) => l.code === code))
    .filter((l): l is NestjsLessonMeta => l !== undefined);
}

// Backward-compatible alias
export function getLessonsByPhaseId(phaseId: string): NestjsLessonMeta[] {
  return getNestjsLessonsByPhaseId(phaseId);
}

export interface NestjsPrerequisiteTopicMeta {
  id: string;
  title: string;
  desc: string;
  tag: string;
  badge: string;
  path: string;
  level?: string;
}

// Backward-compatible alias
export type PrerequisiteTopicMeta = NestjsPrerequisiteTopicMeta;

export const NESTJS_PREREQUISITES: NestjsPrerequisiteTopicMeta[] = [
  {
    id: "prereq-ts",
    title: "TypeScript Essentials",
    desc: "Classes, parameter properties, type annotations, and decorators.",
    tag: "Required Foundation",
    badge: "TS",
    path: "/learn/typescript",
    level: "Beginner",
  },
  {
    id: "prereq-node",
    title: "Node.js Fundamentals",
    desc: "Event loop, HTTP modules, asynchronous streams, and backend runtime basics.",
    tag: "Required Foundation",
    badge: "Node",
    path: "/learn/nodejs",
    level: "Beginner → Intermediate",
  },
];

export interface NestjsRelatedTopicMeta {
  id: string;
  title: string;
  desc: string;
  badge: string;
  path: string;
}

// Backward-compatible alias
export type RelatedTopicMeta = NestjsRelatedTopicMeta;

export const NESTJS_RELATED_TOPICS: NestjsRelatedTopicMeta[] = [
  {
    id: "rel-ts",
    title: "TypeScript",
    desc: "Static typing mental models, generics, and compiler configuration.",
    badge: "Language",
    path: "/learn/typescript",
  },
  {
    id: "rel-nextjs",
    title: "Next.js",
    desc: "Modern React full-stack framework with App Router.",
    badge: "Framework",
    path: "/learn/nextjs",
  },
  {
    id: "rel-express",
    title: "Express.js",
    desc: "Minimalist web framework for Node.js powering NestJS under the hood.",
    badge: "Backend",
    path: "/learn/express",
  },
];

export function getNestjsCourse(): Course {
  const allLessons = getAllNestjsLessons();
  return {
    id: "nestjs",
    title: "Learn NestJS",
    prerequisites: {
      items: [
        "TypeScript static typing mental models, classes, and decorators",
        "Object-oriented programming: classes, encapsulation, and single responsibility",
        "Basic familiarity with HTTP protocols, REST endpoints, and status codes",
      ],
      refresherHref: "/learn/typescript",
      refresherLabel: "Need a refresher? Open the TypeScript curriculum",
    },
    capstone: {
      title: NESTJS_CAPSTONE.title,
      description:
        "Your finish line: architect a production-grade NestJS REST API demonstrating modular feature boundaries, dependency injection, DTO validation, and automated tests.",
      href: NESTJS_CAPSTONE.path,
    },
    phases: NESTJS_PROGRESSION_PHASES.map((phase) => ({
      id: phase.id,
      name: phase.label,
      summary: phase.desc,
      lessons: phase.lessonCodes
        .map((code) => allLessons.find((l) => l.code === code))
        .filter((l): l is NestjsLessonMeta => l !== undefined)
        .map((l) => ({
          id: l.slug,
          code: l.code,
          title: l.name,
          description: l.desc,
          minutes: l.estimatedMinutes,
          requires: l.prerequisite,
          href: l.path,
          aliases: Object.entries(NESTJS_LEGACY_SLUG_MAP)
            .filter(([_, canonical]) => canonical === l.slug)
            .map(([legacy]) => legacy),
        })),
    })),
  };
}
