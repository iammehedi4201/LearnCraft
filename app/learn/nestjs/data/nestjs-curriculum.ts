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
}

export const NESTJS_PREREQUISITES: PrerequisiteTopicMeta[] = [
  {
    id: "prereq-ts",
    title: "TypeScript Fundamentals",
    desc: "Types, interfaces, generics, access modifiers, type narrowing, and async/await Promises.",
    tag: "Required Foundation",
    badge: "TS",
    path: "/learn/typescript",
  },
  {
    id: "prereq-oop",
    title: "OOP Fundamentals",
    desc: "Classes, constructors, parameter properties, inheritance, encapsulation & abstract classes.",
    tag: "Required Foundation",
    badge: "OOP",
    path: "/learn/oop",
  },
];

export interface RelatedTopicMeta {
  id: string;
  title: string;
  desc: string;
  badge: string;
  path: string;
}

export const NESTJS_RELATED_TOPICS: RelatedTopicMeta[] = [
  {
    id: "rel-pg",
    title: "PostgreSQL",
    desc: "Relational schema design, indexes, transactions, and query optimization.",
    badge: "Database",
    path: "/learn/postgresql",
  },
  {
    id: "rel-prisma",
    title: "Prisma ORM",
    desc: "Type-safe database client, automated migrations, and relational modeling.",
    badge: "ORM",
    path: "/learn/prisma",
  },
  {
    id: "rel-docker",
    title: "Docker & Containers",
    desc: "Containerizing backend services, multi-stage builds, and Docker Compose.",
    badge: "DevOps",
    path: "/learn/docker",
  },
  {
    id: "rel-redis",
    title: "Redis & Caching",
    desc: "In-memory caching layer, distributed key-value storage, and pub/sub.",
    badge: "Caching",
    path: "/learn/redis",
  },
];

export const NESTJS_CAPSTONE: CapstoneProjectMeta = {
  id: "capstone-nestjs-api",
  stageNumber: 8,
  slug: "nestjs-rest-api",
  title: "Modular NestJS REST API",
  subtitle: "Final Capstone Project",
  desc: "Architect a production-grade NestJS REST API demonstrating modular feature boundaries, dependency injection, DTO validation, request lifecycle layers, authentication, and automated tests.",
  path: "/learn/nestjs/projects/nestjs-rest-api",
  badge: "🛠️ Capstone",
  xpReward: 250,
  estimatedMinutes: 60,
  prerequisites: ["NJ-05", "NJ-06", "NJ-07", "NJ-08", "NJ-09", "NJ-10", "NJ-16", "NJ-20", "NJ-23", "NJ-29"],
  skillsTaught: [
    "Encapsulated Feature Module Architecture",
    "Thin Controllers & Injectable Business Services",
    "DTOs, Class-Validator & ValidationPipe",
    "Request Lifecycle: Middleware, Guards, Interceptors & Filters",
    "Passport Bearer AuthGuard & RBAC",
    "Automated Testing with @nestjs/testing & Supertest",
  ],
  stepsCount: 5,
};

export const STAGE_1_CAPSTONE: CapstoneProjectMeta = {
  id: "capstone-stage-1",
  stageNumber: 1,
  slug: "stage-1-task-manager",
  title: "CLI Task Manager & Engine",
  subtitle: "Stage 1 Capstone Project",
  desc: "Build an interactive, object-oriented Command-Line Task Management System combining Types, Classes, Generics, and SOLID principles.",
  path: "/learn/nestjs/projects/stage-1-task-manager",
  badge: "🛠️ Capstone",
  xpReward: 100,
  estimatedMinutes: 25,
  prerequisites: ["NJ-01", "NJ-02", "NJ-03", "NJ-04"],
  skillsTaught: [
    "Object-Oriented Domain Modeling",
    "Generic Repositories & Collections",
    "Decorators & Metadata Reflection",
    "SOLID Architecture & Invariants"
  ],
  stepsCount: 3,
};

export const NESTJS_STAGES: StageMeta[] = [
  {
    id: "stage-1",
    stageNumber: 1,
    name: "Build Your Foundation",
    subtitle: "TypeScript & OOP Foundations",
    milestone: "Master the TypeScript and OOP primitives that NestJS uses under the hood.",
    description: "Master the type system, interfaces, class mechanics, decorators, and SOLID principles that empower NestJS architecture.",
    theme: {
      badge: "bg-ds-success-lighter text-ds-success-dark border-ds-stroke-soft",
      dot: "bg-ds-success-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-success-dark",
    },
    capstone: STAGE_1_CAPSTONE,
    lessons: [
      {
        code: "NJ-01",
        stepNumber: 1,
        slug: "nj01-typescript-essentials",
        name: "TypeScript Essentials",
        desc: "Types, interfaces, enums, generics, and type narrowing for NestJS.",
        path: "/learn/nestjs/nj01-typescript-essentials",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "Basic JavaScript",
      },
      {
        code: "NJ-02",
        stepNumber: 2,
        slug: "nj02-oop-foundations",
        name: "OOP Foundations",
        desc: "Classes, constructors, parameter properties, inheritance, and encapsulation.",
        path: "/learn/nestjs/nj02-oop-foundations",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "NJ-01 (TypeScript Essentials)",
      },
      {
        code: "NJ-03",
        stepNumber: 3,
        slug: "nj03-decorators",
        name: "Decorators Deep Dive",
        desc: "How @ attaches metadata to classes, methods, and parameters.",
        path: "/learn/nestjs/nj03-decorators",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "NJ-02 (OOP Foundations)",
      },
      {
        code: "NJ-04",
        stepNumber: 4,
        slug: "nj04-solid",
        name: "SOLID & Clean Architecture",
        desc: "Decouple services, controllers, and repositories with SOLID principles.",
        path: "/learn/nestjs/nj04-solid",
        tag: "CORE",
        estimatedMinutes: 30,
        prerequisite: "NJ-02 (OOP Foundations) & NJ-03 (Decorators)",
      },
    ],
  },
  {
    id: "stage-2",
    stageNumber: 2,
    name: "Build Your First API",
    subtitle: "NestJS Core Architecture",
    milestone: "Build and organize your first working NestJS REST API.",
    description: "Understand the foundational primitives: setup, routing controllers, business services, dependency injection, feature modules, and DTO validation.",
    theme: {
      badge: "bg-ds-info-lighter text-ds-info-dark border-ds-stroke-soft",
      dot: "bg-ds-info-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-info-dark",
    },
    lessons: [
      {
        code: "NJ-05",
        stepNumber: 1,
        slug: "nj05-setup",
        name: "Project Setup & Scaffolding",
        desc: "NestJS CLI generation, modular folder layout, and main.ts bootstrap.",
        path: "/learn/nestjs/nj05-setup",
        tag: "CORE",
        estimatedMinutes: 15,
        prerequisite: "NJ-03 (Decorators) & NJ-04 (SOLID)",
      },
      {
        code: "NJ-06",
        stepNumber: 2,
        slug: "nj07-controllers",
        name: "Controllers & HTTP Routing",
        desc: "HTTP endpoints with @Get, @Post, @Param, @Query, and @Body.",
        path: "/learn/nestjs/nj07-controllers",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "NJ-05 (Project Setup)",
      },
      {
        code: "NJ-07",
        stepNumber: 3,
        slug: "nj08-services",
        name: "Providers & Services",
        desc: "Business logic layer encapsulation with @Injectable providers.",
        path: "/learn/nestjs/nj08-services",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "NJ-06 (Controllers & Routing)",
      },
      {
        code: "NJ-08",
        stepNumber: 4,
        slug: "nj09-dependency-injection",
        name: "Dependency Injection",
        desc: "IoC container, constructor injection, and provider lifecycle.",
        path: "/learn/nestjs/nj09-dependency-injection",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "NJ-07 (Providers & Services)",
      },
      {
        code: "NJ-09",
        stepNumber: 5,
        slug: "nj06-modules",
        name: "Modules & Architecture",
        desc: "Feature encapsulation, module imports, and service exports.",
        path: "/learn/nestjs/nj06-modules",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "NJ-08 (Dependency Injection)",
      },
      {
        code: "NJ-10",
        stepNumber: 6,
        slug: "nj10-dto-validation",
        name: "DTOs & Validation",
        desc: "Data Transfer Objects, class-validator, and request contracts.",
        path: "/learn/nestjs/nj10-dto-validation",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "NJ-06 (Controllers) & NJ-09 (Modules)",
      },
    ],
  },
  {
    id: "stage-3",
    stageNumber: 3,
    name: "Add a Real Database",
    subtitle: "Prisma ORM & PostgreSQL Persistence",
    milestone: "Model schemas, run migrations, and execute type-safe queries with Prisma.",
    description: "Connect your backend to PostgreSQL: manage environment variables, define schemas, run migrations, and implement pagination.",
    theme: {
      badge: "bg-ds-stable-lighter text-ds-stable-dark border-ds-stroke-soft",
      dot: "bg-ds-stable-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-stable-dark",
    },
    lessons: [
      {
        code: "NJ-11",
        stepNumber: 1,
        slug: "nj26-config",
        name: "Configuration & Environment",
        desc: "ConfigModule, .env loading, and type-safe environment schemas.",
        path: "/learn/nestjs/nj26-config",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "NJ-09 (Modules & Architecture)",
      },
      {
        code: "NJ-12",
        stepNumber: 2,
        slug: "nj21-database-prisma",
        name: "Repository Pattern & State",
        desc: "In-memory state management, generic repository pattern, and service decoupling in NestJS.",
        path: "/learn/nestjs/nj21-database-prisma",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "NJ-11 (Configuration & Environment)",
      },
      {
        code: "NJ-13",
        stepNumber: 3,
        slug: "nj22-entities-relations",
        name: "Domain Entities & Modeling",
        desc: "Domain entities, relationship modeling (1:1, 1:N, M:N), encapsulation, and entity methods in NestJS.",
        path: "/learn/nestjs/nj22-entities-relations",
        tag: "BUILD",
        estimatedMinutes: 30,
        prerequisite: "NJ-12 (Repository Pattern & State)",
      },
      {
        code: "NJ-14",
        stepNumber: 4,
        slug: "nj23-migrations-seeding",
        name: "State Seeding & Lifecycle Hooks",
        desc: "Application bootstrap data initialization, OnModuleInit lifecycle hooks, and standalone seed scripts.",
        path: "/learn/nestjs/nj23-migrations-seeding",
        tag: "BUILD",
        estimatedMinutes: 20,
        prerequisite: "NJ-13 (Domain Entities & Modeling)",
      },
      {
        code: "NJ-15",
        stepNumber: 5,
        slug: "nj24-pagination-filtering",
        name: "Pagination & Filtering",
        desc: "Offset/cursor pagination, dynamic query filtering, and sorting.",
        path: "/learn/nestjs/nj24-pagination-filtering",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "NJ-13 (Entities & Relations)",
      },
    ],
  },
  {
    id: "stage-4",
    stageNumber: 4,
    name: "Control How Requests Work",
    subtitle: "Request Pipeline & Execution Flow",
    milestone: "Transform data, catch exceptions, and master the full request execution lifecycle.",
    description: "Master input parsing with pipes, structured error responses with exception filters, execution order, and middleware.",
    theme: {
      badge: "bg-ds-feature-lighter text-ds-feature-dark border-ds-stroke-soft",
      dot: "bg-ds-feature-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-feature-dark",
    },
    lessons: [
      {
        code: "NJ-16",
        stepNumber: 1,
        slug: "nj12-pipes",
        name: "Pipes & Data Transformation",
        desc: "Runtime input parsing with ParseIntPipe, ParseUUIDPipe, and custom pipes.",
        path: "/learn/nestjs/nj12-pipes",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "NJ-10 (DTOs & Validation)",
      },
      {
        code: "NJ-17",
        stepNumber: 2,
        slug: "nj15-exception-filters",
        name: "Exception Filters & Errors",
        desc: "Centralized error handling with HttpException and custom filters.",
        path: "/learn/nestjs/nj15-exception-filters",
        tag: "BUILD",
        estimatedMinutes: 20,
        prerequisite: "NJ-16 (Pipes & Data Transformation)",
      },
      {
        code: "NJ-18",
        stepNumber: 3,
        slug: "nj11-request-lifecycle",
        name: "Request Lifecycle",
        desc: "Full execution flow: Middleware → Guards → Interceptors → Pipes → Filters.",
        path: "/learn/nestjs/nj11-request-lifecycle",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "NJ-16 (Pipes) & NJ-17 (Filters)",
      },
      {
        code: "NJ-19",
        stepNumber: 4,
        slug: "nj16-middleware",
        name: "Middleware Pipeline",
        desc: "Express-style middleware, CORS headers, logging, and rate limits.",
        path: "/learn/nestjs/nj16-middleware",
        tag: "PROFESSIONAL",
        estimatedMinutes: 20,
        prerequisite: "NJ-18 (Request Lifecycle)",
      },
      {
        code: "NJ-20",
        stepNumber: 5,
        slug: "nj13-guards",
        name: "Guards & Route Gates",
        desc: "Route protection and execution gates with CanActivate.",
        path: "/learn/nestjs/nj13-guards",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "NJ-18 (Request Lifecycle)",
      },
    ],
  },
  {
    id: "stage-5",
    stageNumber: 5,
    name: "Secure Your Application",
    subtitle: "Authentication & Security Hardening",
    milestone: "Implement secure JWT login, role-based access control, and attack defense.",
    description: "Build production-grade authentication with Passport, JWT tokens, RBAC roles, response serialization, and security headers.",
    theme: {
      badge: "bg-ds-warning-lighter text-ds-warning-dark border-ds-stroke-soft",
      dot: "bg-ds-warning-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-warning-dark",
    },
    lessons: [
      {
        code: "NJ-21",
        stepNumber: 1,
        slug: "nj17-custom-decorators",
        name: "Custom Route Decorators",
        desc: "Custom param and method decorators like @CurrentUser() and @Public().",
        path: "/learn/nestjs/nj17-custom-decorators",
        tag: "BUILD",
        estimatedMinutes: 20,
        prerequisite: "NJ-03 (Decorators Deep Dive)",
      },
      {
        code: "NJ-22",
        stepNumber: 2,
        slug: "nj18-auth-jwt",
        name: "JWT Authentication",
        desc: "Password hashing with bcrypt, Passport strategies, and JWT tokens.",
        path: "/learn/nestjs/nj18-auth-jwt",
        tag: "BUILD",
        estimatedMinutes: 35,
        prerequisite: "NJ-12 (Prisma Database) & NJ-20 (Guards)",
      },
      {
        code: "NJ-23",
        stepNumber: 3,
        slug: "nj19-rbac",
        name: "RBAC & Authorization",
        desc: "Role-based permission gates with Reflector and metadata reflection.",
        path: "/learn/nestjs/nj19-rbac",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "NJ-22 (JWT Authentication)",
      },
      {
        code: "NJ-24",
        stepNumber: 4,
        slug: "nj25-serialization",
        name: "Response Serialization",
        desc: "Safe payload exclusion (stripping password hashes) with @Exclude().",
        path: "/learn/nestjs/nj25-serialization",
        tag: "PROFESSIONAL",
        estimatedMinutes: 20,
        prerequisite: "NJ-22 (JWT Authentication)",
      },
      {
        code: "NJ-25",
        stepNumber: 5,
        slug: "nj20-security",
        name: "Security Hardening",
        desc: "Helmet security headers, CORS policies, and rate limiting.",
        path: "/learn/nestjs/nj20-security",
        tag: "PROFESSIONAL",
        estimatedMinutes: 25,
        prerequisite: "NJ-19 (Middleware) & NJ-22 (JWT Auth)",
      },
    ],
  },
  {
    id: "stage-6",
    stageNumber: 6,
    name: "Production Engineering & Performance",
    subtitle: "Observability, Documentation & Caching",
    milestone: "Optimize, document, log, and cache your backend for high performance.",
    description: "Equip your API with RxJS interceptors, Swagger documentation, high-performance Pino logging, Redis caching, and file uploads.",
    theme: {
      badge: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-ds-stroke-soft",
      dot: "bg-purple-500",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-purple-600 dark:text-purple-400",
    },
    lessons: [
      {
        code: "NJ-26",
        stepNumber: 1,
        slug: "nj14-interceptors",
        name: "Interceptors & RxJS",
        desc: "Response mutation, execution metrics, and RxJS stream operators.",
        path: "/learn/nestjs/nj14-interceptors",
        tag: "BUILD",
        estimatedMinutes: 30,
        prerequisite: "NJ-18 (Request Lifecycle)",
      },
      {
        code: "NJ-27",
        stepNumber: 2,
        slug: "nj29-swagger",
        name: "Swagger / OpenAPI",
        desc: "Automated OpenAPI generation and interactive Swagger UI.",
        path: "/learn/nestjs/nj29-swagger",
        tag: "BUILD",
        estimatedMinutes: 20,
        prerequisite: "NJ-10 (DTOs & Validation)",
      },
      {
        code: "NJ-28",
        stepNumber: 3,
        slug: "nj27-logging",
        name: "Structured Logging",
        desc: "High-performance production JSON logging with nestjs-pino.",
        path: "/learn/nestjs/nj27-logging",
        tag: "PROFESSIONAL",
        estimatedMinutes: 25,
        prerequisite: "NJ-19 (Middleware Pipeline)",
      },
      {
        code: "NJ-29",
        stepNumber: 4,
        slug: "nj31-caching",
        name: "Caching & Redis",
        desc: "In-memory caching layer with Redis store integration.",
        path: "/learn/nestjs/nj31-caching",
        tag: "PROFESSIONAL",
        estimatedMinutes: 25,
        prerequisite: "NJ-26 (Interceptors & RxJS)",
      },
      {
        code: "NJ-30",
        stepNumber: 5,
        slug: "nj30-file-uploads",
        name: "File Uploads",
        desc: "Multi-part file handling using Multer and secure static assets.",
        path: "/learn/nestjs/nj30-file-uploads",
        tag: "REFERENCE",
        estimatedMinutes: 20,
        prerequisite: "NJ-26 (Interceptors)",
      },
    ],
  },
  {
    id: "stage-7",
    stageNumber: 7,
    name: "Ship Your Application",
    subtitle: "Automated Testing & Production Readiness",
    milestone: "Test your API with unit/E2E suites and prepare for production execution.",
    description: "Master the testing pyramid with Jest mocks, Supertest E2E, compile with nest build, and monitor with @nestjs/terminus.",
    theme: {
      badge: "bg-ds-highlighted-lighter text-ds-highlighted-dark border-ds-stroke-soft",
      dot: "bg-ds-highlighted-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-highlighted-dark",
    },
    lessons: [
      {
        code: "NJ-31",
        stepNumber: 1,
        slug: "nj28-testing",
        name: "Automated Testing",
        desc: "Unit tests with Jest mocks, controller testing, and Supertest E2E.",
        path: "/learn/nestjs/nj28-testing",
        tag: "PROFESSIONAL",
        estimatedMinutes: 35,
        prerequisite: "NJ-07 (Providers & Services) & NJ-12 (Repository Pattern)",
      },
      {
        code: "NJ-32",
        stepNumber: 2,
        slug: "nj32-deployment",
        name: "Production Build & Health Checks",
        desc: "Compiling with nest build, node dist/main.js, @nestjs/terminus health checks, and graceful shutdown.",
        path: "/learn/nestjs/nj32-deployment",
        tag: "PROFESSIONAL",
        estimatedMinutes: 30,
        prerequisite: "NJ-31 (Automated Testing)",
      },
    ],
  },
];

export const NESTJS_PROGRESSION_PHASES: ProgressionPhaseMeta[] = [
  {
    id: "fundamentals-arch",
    phaseNumber: 1,
    label: "Fundamentals & Core Architecture",
    tag: "Phase 01",
    desc: "What NestJS is, CLI scaffolding, main.ts bootstrap, controllers, providers, DI container & feature modules",
    scope: "Core Scaffolding & Architecture",
    icon: "layers",
    lessonCodes: ["NJ-05", "NJ-06", "NJ-07", "NJ-08", "NJ-09"],
  },
  {
    id: "dtos-validation-config",
    phaseNumber: 2,
    label: "DTOs, Validation & Configuration",
    tag: "Phase 02",
    desc: "Data Transfer Objects, ValidationPipe, ConfigModule environment loading & repository state decoupling",
    scope: "Request Contracts & Config",
    icon: "server",
    lessonCodes: ["NJ-10", "NJ-11", "NJ-12"],
  },
  {
    id: "domain-lifecycle",
    phaseNumber: 3,
    label: "Domain Modeling & Lifecycle Hooks",
    tag: "Phase 03",
    desc: "Domain entities, OnModuleInit lifecycle hooks, bootstrap seeding & query pagination with filtering",
    scope: "Domain Modeling & Lifecycle",
    icon: "server",
    lessonCodes: ["NJ-13", "NJ-14", "NJ-15"],
  },
  {
    id: "request-pipeline",
    phaseNumber: 4,
    label: "Request Pipeline, Pipes & Filters",
    tag: "Phase 04",
    desc: "Pipes, custom exception filters, request execution lifecycle, middleware pipeline & route guards",
    scope: "Pipeline & Execution Flow",
    icon: "shield",
    lessonCodes: ["NJ-16", "NJ-17", "NJ-18", "NJ-19", "NJ-20"],
  },
  {
    id: "auth-security",
    phaseNumber: 5,
    label: "Authentication & Security Hardening",
    tag: "Phase 05",
    desc: "Custom route decorators, Passport JWT authentication, RBAC authorization, serialization & security",
    scope: "Auth & Access Control",
    icon: "shield",
    lessonCodes: ["NJ-21", "NJ-22", "NJ-23", "NJ-24", "NJ-25"],
  },
  {
    id: "performance-observability",
    phaseNumber: 6,
    label: "Interceptors, Observability & Performance",
    tag: "Phase 06",
    desc: "RxJS interceptors, OpenAPI Swagger documentation, structured Pino logging, Redis caching & file uploads",
    scope: "Observability & Performance",
    icon: "zap",
    lessonCodes: ["NJ-26", "NJ-27", "NJ-28", "NJ-29", "NJ-30"],
  },
  {
    id: "testing-deployment",
    phaseNumber: 7,
    label: "Automated Testing & Production Readiness",
    tag: "Phase 07",
    desc: "Unit testing, Jest mocks, Supertest E2E, nest build compilation, Terminus health checks & Capstone",
    scope: "Testing & Production Ship",
    icon: "layers",
    lessonCodes: ["NJ-31", "NJ-32"],
  },
];

export const PROGRESSION_PHASES = NESTJS_PROGRESSION_PHASES;

// Helper Functions
export function getAllLessons(): LessonMeta[] {
  return NESTJS_STAGES.flatMap((stage) => stage.lessons);
}

export function getCourseLessons(): LessonMeta[] {
  const all = getAllLessons();
  return NESTJS_PROGRESSION_PHASES.flatMap((phase) =>
    phase.lessonCodes.map((code) => all.find((l) => l.code === code)).filter((l): l is LessonMeta => l !== undefined)
  );
}

export function getStages(): StageMeta[] {
  return NESTJS_STAGES;
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
  return NESTJS_STAGES.find((stage) =>
    stage.lessons.some(
      (l) =>
        l.slug === slug || l.path.endsWith(`/${slug}`) || l.path.includes(slug),
    ),
  );
}

export function getNextLesson(currentSlug: string): LessonMeta | null {
  const courseLessons = getCourseLessons();
  const index = courseLessons.findIndex(
    (l) =>
      l.slug === currentSlug ||
      l.path.endsWith(`/${currentSlug}`) ||
      l.path.includes(currentSlug),
  );
  if (index >= 0 && index < courseLessons.length - 1) {
    return courseLessons[index + 1];
  }
  if (index >= 0) {
    return null; // Reached end of course -> Capstone
  }

  // Fallback for foundation lessons
  const all = getAllLessons();
  const allIndex = all.findIndex(
    (l) =>
      l.slug === currentSlug ||
      l.path.endsWith(`/${currentSlug}`) ||
      l.path.includes(currentSlug),
  );
  if (allIndex >= 0 && allIndex < all.length - 1) {
    return all[allIndex + 1];
  }
  return null;
}

export function getPrevLesson(currentSlug: string): LessonMeta | null {
  const courseLessons = getCourseLessons();
  const index = courseLessons.findIndex(
    (l) =>
      l.slug === currentSlug ||
      l.path.endsWith(`/${currentSlug}`) ||
      l.path.includes(currentSlug),
  );
  if (index > 0) {
    return courseLessons[index - 1];
  }
  if (index === 0) {
    return null; // First lesson of course -> NestJS Hub
  }

  // Fallback for foundation lessons
  const all = getAllLessons();
  const allIndex = all.findIndex(
    (l) =>
      l.slug === currentSlug ||
      l.path.endsWith(`/${currentSlug}`) ||
      l.path.includes(currentSlug),
  );
  if (allIndex > 0) {
    return all[allIndex - 1];
  }
  return null;
}

export function getLessonsByPhaseId(phaseId: string): LessonMeta[] {
  const phase = PROGRESSION_PHASES.find((p) => p.id === phaseId) || PROGRESSION_PHASES[0];
  const all = getAllLessons();
  return phase.lessonCodes
    .map((code) => all.find((l) => l.code === code))
    .filter((l): l is LessonMeta => l !== undefined);
}

export function getNestjsCourse(): Course {
  const allLessons = getAllLessons();
  return {
    id: "nestjs",
    title: "Learn NestJS",
    prerequisites: {
      items: [
        "TypeScript static typing mental models, generics, and class decorators",
        "Object-oriented programming: classes, encapsulation, inheritance, and SOLID principles",
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
