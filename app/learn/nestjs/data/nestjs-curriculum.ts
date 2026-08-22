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

export const NESTJS_STAGES: StageMeta[] = [
  {
    id: "stage-1",
    stageNumber: 1,
    name: "Build Your Foundation",
    subtitle: "TypeScript & OOP Foundations",
    milestone: "Master the TypeScript and OOP primitives that NestJS uses.",
    description: "Master the type system, interfaces, decorators, and OOP fundamentals that empower NestJS architecture.",
    theme: {
      badge: "bg-ds-success-lighter text-ds-success-dark border-ds-stroke-soft",
      dot: "bg-ds-success-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-success-dark",
    },
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
        desc: "Classes, inheritance, encapsulation, and polymorphism patterns.",
        path: "/learn/nestjs/nj02-oop-foundations",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "NJ-01 (Types & Interfaces)",
      },
      {
        code: "NJ-03",
        stepNumber: 3,
        slug: "nj03-decorators",
        name: "Decorators Deep Dive",
        desc: "Class, method, property, and parameter decorators in TypeScript.",
        path: "/learn/nestjs/nj03-decorators",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "NJ-02 (Classes & Methods)",
      },
    ],
  },
  {
    id: "stage-2",
    stageNumber: 2,
    name: "Build Your First API",
    subtitle: "NestJS Core Architecture",
    milestone: "Build and organize a working NestJS REST API.",
    description: "Understand the foundational primitives: modules, controllers, injectable services, dependency injection, and DTOs.",
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
        desc: "NestJS CLI generation, modular folder layout, and configuration.",
        path: "/learn/nestjs/nj05-setup",
        tag: "CORE",
        estimatedMinutes: 15,
        prerequisite: "NJ-03 (Decorators)",
      },
      {
        code: "NJ-06",
        stepNumber: 2,
        slug: "nj06-modules",
        name: "Modules",
        desc: "Feature encapsulation, module imports, and clean boundaries.",
        path: "/learn/nestjs/nj06-modules",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "NJ-05 (Project Setup)",
      },
      {
        code: "NJ-07",
        stepNumber: 3,
        slug: "nj07-controllers",
        name: "Controllers & Routing",
        desc: "HTTP endpoints with @Get, @Post, @Param, and @Body.",
        path: "/learn/nestjs/nj07-controllers",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "NJ-06 (Modules)",
      },
      {
        code: "NJ-08",
        stepNumber: 4,
        slug: "nj08-services",
        name: "Providers & Services",
        desc: "Business logic layer encapsulation with @Injectable providers.",
        path: "/learn/nestjs/nj08-services",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "NJ-07 (Controllers)",
      },
      {
        code: "NJ-09",
        stepNumber: 5,
        slug: "nj09-dependency-injection",
        name: "Dependency Injection",
        desc: "IoC container, constructor injection, and custom tokens.",
        path: "/learn/nestjs/nj09-dependency-injection",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "NJ-08 (Providers & Services)",
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
        prerequisite: "NJ-07 (Controllers & Routes)",
      },
    ],
  },
  {
    id: "stage-3",
    stageNumber: 3,
    name: "Control How Requests Work",
    subtitle: "Request Pipeline & Execution Flow",
    milestone: "Add validation, authorization guards, filters, and interceptors.",
    description: "Master the complete request execution flow: Middleware, Guards, Interceptors, Pipes, and Exception Filters.",
    theme: {
      badge: "bg-ds-feature-lighter text-ds-feature-dark border-ds-stroke-soft",
      dot: "bg-ds-feature-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-feature-dark",
    },
    lessons: [
      {
        code: "NJ-11",
        stepNumber: 1,
        slug: "nj11-request-lifecycle",
        name: "Request Lifecycle",
        desc: "Full execution flow: Middleware → Guards → Interceptors → Pipes → Filters.",
        path: "/learn/nestjs/nj11-request-lifecycle",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "NJ-07 (Controllers) & NJ-08 (Services)",
      },
      {
        code: "NJ-16",
        stepNumber: 2,
        slug: "nj16-middleware",
        name: "Middleware",
        desc: "Request pipeline, CORS headers, logging, and rate limits.",
        path: "/learn/nestjs/nj16-middleware",
        tag: "PROFESSIONAL",
        estimatedMinutes: 20,
        prerequisite: "NJ-11 (Request Lifecycle)",
      },
      {
        code: "NJ-13",
        stepNumber: 3,
        slug: "nj13-guards",
        name: "Guards & Authorization",
        desc: "Route protection and execution gates with CanActivate.",
        path: "/learn/nestjs/nj13-guards",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "NJ-11 (Request Lifecycle)",
      },
      {
        code: "NJ-14",
        stepNumber: 4,
        slug: "nj14-interceptors",
        name: "Interceptors & RxJS",
        desc: "Response mutation, execution metrics, and RxJS stream operators.",
        path: "/learn/nestjs/nj14-interceptors",
        tag: "BUILD",
        estimatedMinutes: 30,
        prerequisite: "NJ-11 (Request Lifecycle)",
      },
      {
        code: "NJ-12",
        stepNumber: 5,
        slug: "nj12-pipes",
        name: "Pipes & Transformation",
        desc: "Runtime input validation, parsing primitives, and sanitizing payloads.",
        path: "/learn/nestjs/nj12-pipes",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "NJ-10 (DTOs & Validation)",
      },
      {
        code: "NJ-15",
        stepNumber: 6,
        slug: "nj15-exception-filters",
        name: "Exception Filters",
        desc: "Centralized error handling with predictable structured responses.",
        path: "/learn/nestjs/nj15-exception-filters",
        tag: "BUILD",
        estimatedMinutes: 20,
        prerequisite: "NJ-11 (Request Lifecycle)",
      },
    ],
  },
  {
    id: "stage-4",
    stageNumber: 4,
    name: "Secure Your Application",
    subtitle: "Authentication & Security Hardening",
    milestone: "Implement secure JWT login, role-based access control, and attack defense.",
    description: "Build production-grade authentication with Passport, JWT tokens, RBAC roles, custom decorators, and rate limiting.",
    theme: {
      badge: "bg-ds-warning-lighter text-ds-warning-dark border-ds-stroke-soft",
      dot: "bg-ds-warning-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-warning-dark",
    },
    lessons: [
      {
        code: "NJ-17",
        stepNumber: 1,
        slug: "nj17-custom-decorators",
        name: "Custom Decorators",
        desc: "Custom param and method decorators like @CurrentUser() and @Roles().",
        path: "/learn/nestjs/nj17-custom-decorators",
        tag: "BUILD",
        estimatedMinutes: 20,
        prerequisite: "NJ-03 (Decorators Deep Dive)",
      },
      {
        code: "NJ-18",
        stepNumber: 2,
        slug: "nj18-auth-jwt",
        name: "JWT Authentication",
        desc: "Passport.js integration with stateless JWT authentication.",
        path: "/learn/nestjs/nj18-auth-jwt",
        tag: "BUILD",
        estimatedMinutes: 35,
        prerequisite: "NJ-13 (Guards) & NJ-17 (Decorators)",
      },
      {
        code: "NJ-19",
        stepNumber: 3,
        slug: "nj19-rbac",
        name: "RBAC & Authorization",
        desc: "Role-based permission gates with Reflector and metadata reflection.",
        path: "/learn/nestjs/nj19-rbac",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "NJ-18 (JWT Authentication)",
      },
      {
        code: "NJ-20",
        stepNumber: 4,
        slug: "nj20-security",
        name: "Security Hardening",
        desc: "Helmet security headers, CORS policies, and rate limiting.",
        path: "/learn/nestjs/nj20-security",
        tag: "PROFESSIONAL",
        estimatedMinutes: 25,
        prerequisite: "NJ-16 (Middleware Pipeline)",
      },
    ],
  },
  {
    id: "stage-5",
    stageNumber: 5,
    name: "Add a Real Database",
    subtitle: "Prisma ORM, PostgreSQL & Clean Architecture",
    milestone: "Model schemas, run migrations, execute queries, and decouple with SOLID.",
    description: "Modern database management with Prisma ORM: schema modeling, relations, migrations, pagination, and Clean Architecture.",
    theme: {
      badge: "bg-ds-stable-lighter text-ds-stable-dark border-ds-stroke-soft",
      dot: "bg-ds-stable-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-stable-dark",
    },
    lessons: [
      {
        code: "NJ-21",
        stepNumber: 1,
        slug: "nj21-database-prisma",
        name: "Database Setup (Prisma)",
        desc: "Prisma ORM integration with PostgreSQL and lifecycle hooks.",
        path: "/learn/nestjs/nj21-database-prisma",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "NJ-08 (Providers & Services)",
      },
      {
        code: "NJ-22",
        stepNumber: 2,
        slug: "nj22-entities-relations",
        name: "Entities & Relations",
        desc: "Relational data modeling (1:1, 1:N, M:N) and repository patterns.",
        path: "/learn/nestjs/nj22-entities-relations",
        tag: "BUILD",
        estimatedMinutes: 30,
        prerequisite: "NJ-21 (Database Setup)",
      },
      {
        code: "NJ-23",
        stepNumber: 3,
        slug: "nj23-migrations-seeding",
        name: "Migrations & Seeding",
        desc: "Schema migrations with Prisma Migrate and test data seeding.",
        path: "/learn/nestjs/nj23-migrations-seeding",
        tag: "BUILD",
        estimatedMinutes: 20,
        prerequisite: "NJ-22 (Entities & Relations)",
      },
      {
        code: "NJ-24",
        stepNumber: 4,
        slug: "nj24-pagination-filtering",
        name: "Pagination & Filtering",
        desc: "Offset/cursor pagination, dynamic query filtering, and sorting.",
        path: "/learn/nestjs/nj24-pagination-filtering",
        tag: "PROFESSIONAL",
        estimatedMinutes: 25,
        prerequisite: "NJ-22 (Entities & Relations)",
      },
      {
        code: "NJ-25",
        stepNumber: 5,
        slug: "nj25-serialization",
        name: "Response Serialization",
        desc: "Safe payload exclusion (stripping passwords) with @Exclude().",
        path: "/learn/nestjs/nj25-serialization",
        tag: "PROFESSIONAL",
        estimatedMinutes: 20,
        prerequisite: "NJ-10 (DTOs) & NJ-22 (Entities)",
      },
      {
        code: "NJ-04",
        stepNumber: 6,
        slug: "nj04-solid",
        name: "SOLID & Clean Architecture",
        desc: "Decouple services, controllers, and database repositories with SOLID.",
        path: "/learn/nestjs/nj04-solid",
        tag: "BUILD",
        estimatedMinutes: 30,
        prerequisite: "NJ-22 (Entities) & NJ-08 (Services)",
      },
    ],
  },
  {
    id: "stage-6",
    stageNumber: 6,
    name: "Ship Your Application",
    subtitle: "Production Engineering & DevOps",
    milestone: "Build, test, document, dockerize, and deploy production backends.",
    description: "Equip your API with typed configuration, structured Pino logging, automated testing, Swagger, Redis caching, and Docker.",
    theme: {
      badge: "bg-ds-highlighted-lighter text-ds-highlighted-dark border-ds-stroke-soft",
      dot: "bg-ds-highlighted-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-highlighted-dark",
    },
    lessons: [
      {
        code: "NJ-26",
        stepNumber: 1,
        slug: "nj26-config",
        name: "Configuration Management",
        desc: "ConfigModule, environment variables, and Joi schema validation.",
        path: "/learn/nestjs/nj26-config",
        tag: "PROFESSIONAL",
        estimatedMinutes: 20,
        prerequisite: "NJ-05 (Project Setup)",
      },
      {
        code: "NJ-27",
        stepNumber: 2,
        slug: "nj27-logging",
        name: "Structured Logging",
        desc: "High-performance production JSON logging with nestjs-pino.",
        path: "/learn/nestjs/nj27-logging",
        tag: "PROFESSIONAL",
        estimatedMinutes: 25,
        prerequisite: "NJ-16 (Middleware Pipeline)",
      },
      {
        code: "NJ-29",
        stepNumber: 3,
        slug: "nj29-swagger",
        name: "Swagger / OpenAPI",
        desc: "Automated OpenAPI generation and interactive Swagger UI.",
        path: "/learn/nestjs/nj29-swagger",
        tag: "BUILD",
        estimatedMinutes: 20,
        prerequisite: "NJ-10 (DTOs & Validation)",
      },
      {
        code: "NJ-30",
        stepNumber: 4,
        slug: "nj30-file-uploads",
        name: "File Uploads",
        desc: "Multi-part file handling using Multer and secure static assets.",
        path: "/learn/nestjs/nj30-file-uploads",
        tag: "REFERENCE",
        estimatedMinutes: 20,
        prerequisite: "NJ-14 (Interceptors)",
      },
      {
        code: "NJ-31",
        stepNumber: 5,
        slug: "nj31-caching",
        name: "Caching & Redis",
        desc: "In-memory caching layer with Redis store integration.",
        path: "/learn/nestjs/nj31-caching",
        tag: "PROFESSIONAL",
        estimatedMinutes: 25,
        prerequisite: "NJ-14 (Interceptors)",
      },
      {
        code: "NJ-28",
        stepNumber: 6,
        slug: "nj28-testing",
        name: "Automated Testing",
        desc: "Unit tests with Jest mocks, integration tests, and Supertest E2E.",
        path: "/learn/nestjs/nj28-testing",
        tag: "PROFESSIONAL",
        estimatedMinutes: 35,
        prerequisite: "NJ-08 (Services) & NJ-21 (Database)",
      },
      {
        code: "NJ-32",
        stepNumber: 7,
        slug: "nj32-deployment",
        name: "Docker & Deployment",
        desc: "Docker multi-stage builds, health checks, and CI/CD deployment.",
        path: "/learn/nestjs/nj32-deployment",
        tag: "PROFESSIONAL",
        estimatedMinutes: 30,
        prerequisite: "NJ-28 (Automated Testing)",
      },
    ],
  },
];

export const PROGRESSION_PHASES: ProgressionPhaseMeta[] = [
  {
    id: "fundamentals",
    phaseNumber: 1,
    label: "Core Fundamentals",
    tag: "Phase 01",
    desc: "TypeScript, OOP, decorators & building your first API",
    scope: "9 Lessons • Start Here",
    icon: "zap",
    lessonCodes: ["NJ-01", "NJ-02", "NJ-03", "NJ-05", "NJ-06", "NJ-07", "NJ-08", "NJ-09", "NJ-10"],
  },
  {
    id: "intermediate",
    phaseNumber: 2,
    label: "Intermediate, Database & Clean Architecture",
    tag: "Phase 02",
    desc: "Request pipeline, validation, Prisma ORM & SOLID Architecture",
    scope: "12 Lessons • Pipeline & DB",
    icon: "server",
    lessonCodes: [
      "NJ-11", "NJ-16", "NJ-13", "NJ-14", "NJ-12", "NJ-15",
      "NJ-21", "NJ-22", "NJ-23", "NJ-24", "NJ-25", "NJ-04"
    ],
  },
  {
    id: "advanced",
    phaseNumber: 3,
    label: "Advanced & Production Mastery",
    tag: "Phase 03",
    desc: "JWT Auth, RBAC security, Jest tests, Pino logging & Docker",
    scope: "11 Lessons • Enterprise",
    icon: "shield",
    lessonCodes: [
      "NJ-17", "NJ-18", "NJ-19", "NJ-20",
      "NJ-26", "NJ-27", "NJ-29", "NJ-30", "NJ-31", "NJ-28", "NJ-32"
    ],
  },
  {
    id: "reference",
    phaseNumber: 4,
    label: "Reference & Quick Lookup",
    tag: "Phase 04",
    desc: "Search syntax, CLI commands & architecture cheatsheets",
    scope: "Instant Search & Cheatsheets",
    icon: "layers",
    lessonCodes: [
      "NJ-01", "NJ-02", "NJ-03", "NJ-05", "NJ-06", "NJ-07", "NJ-08", "NJ-09", "NJ-10",
      "NJ-11", "NJ-16", "NJ-13", "NJ-14", "NJ-12", "NJ-15", "NJ-21", "NJ-22", "NJ-23", "NJ-24", "NJ-25", "NJ-04",
      "NJ-17", "NJ-18", "NJ-19", "NJ-20", "NJ-26", "NJ-27", "NJ-29", "NJ-30", "NJ-31", "NJ-28", "NJ-32"
    ],
  },
];

// Helper Functions
export function getAllLessons(): LessonMeta[] {
  return NESTJS_STAGES.flatMap((stage) => stage.lessons);
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
  const phase = PROGRESSION_PHASES.find((p) => p.id === phaseId) || PROGRESSION_PHASES[0];
  const all = getAllLessons();
  return phase.lessonCodes
    .map((code) => all.find((l) => l.code === code))
    .filter((l): l is LessonMeta => l !== undefined);
}
