export type ContentTag = "CORE" | "BUILD" | "PROFESSIONAL" | "REFERENCE";

export interface LessonMeta {
  code: string;
  slug: string;
  name: string;
  outcomeName?: string;
  desc: string;
  path: string;
  tag: ContentTag;
  estimatedMinutes: number;
  prerequisites?: string[];
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

export const NESTJS_STAGES: StageMeta[] = [
  {
    id: "stage-1",
    stageNumber: 1,
    name: "Build Your Foundation",
    subtitle: "TypeScript, OOP, Decorators & SOLID",
    milestone: "You can now read and write the core TypeScript and OOP patterns that NestJS uses.",
    description: "Master the type system, interfaces, decorators, and OOP fundamentals that empower NestJS architecture.",
    theme: {
      badge: "bg-ds-success-lighter text-ds-success-dark border-ds-success-light/30",
      dot: "bg-ds-success-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-success-dark",
    },
    lessons: [
      {
        code: "NJ-01",
        slug: "nj01-typescript-essentials",
        name: "TypeScript Essentials",
        outcomeName: "Types, Interfaces & Generics for NestJS",
        desc: "Types, interfaces, enums, generics, and type narrowing — the core TypeScript skills NestJS demands.",
        path: "/learn/nestjs/nj01-typescript-essentials",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisites: ["Basic JavaScript"],
      },
      {
        code: "NJ-02",
        slug: "nj02-oop-foundations",
        name: "OOP Foundations",
        outcomeName: "Classes, Inheritance & Polymorphism",
        desc: "Classes, inheritance, encapsulation, polymorphism, and abstraction with real backend examples.",
        path: "/learn/nestjs/nj02-oop-foundations",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisites: ["TypeScript Types"],
      },
      {
        code: "NJ-03",
        slug: "nj03-decorators",
        name: "Decorators Deep Dive",
        outcomeName: "Mastering TypeScript Decorators & Metadata",
        desc: "Class, method, property, and parameter decorators — understand the syntactic backbone of NestJS.",
        path: "/learn/nestjs/nj03-decorators",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisites: ["TypeScript Classes"],
      },
      {
        code: "NJ-04",
        slug: "nj04-solid",
        name: "SOLID Principles",
        outcomeName: "Clean Architecture Principles in TypeScript",
        desc: "Single Responsibility, Open/Closed, Liskov, Interface Segregation, and Dependency Inversion in backend design.",
        path: "/learn/nestjs/nj04-solid",
        tag: "BUILD",
        estimatedMinutes: 30,
        prerequisites: ["OOP Foundations"],
      },
    ],
  },
  {
    id: "stage-2",
    stageNumber: 2,
    name: "Build Your First API",
    subtitle: "NestJS Core Architecture",
    milestone: "You can now build and organize a working NestJS REST API with clean architecture.",
    description: "Understand the foundational primitives: modules, controllers, injectable services, dependency injection, and DTOs.",
    theme: {
      badge: "bg-ds-info-lighter text-ds-info-dark border-ds-info-light/30",
      dot: "bg-ds-info-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-info-dark",
    },
    lessons: [
      {
        code: "NJ-05",
        slug: "nj05-setup",
        name: "Project Setup & Architecture",
        outcomeName: "CLI Scaffolding & Modular Directory Layout",
        desc: "Install NestJS CLI, generate scaffolding, and understand clean modular folder organization vs Express.",
        path: "/learn/nestjs/nj05-setup",
        tag: "CORE",
        estimatedMinutes: 15,
        prerequisites: ["Node.js & npm"],
      },
      {
        code: "NJ-06",
        slug: "nj06-modules",
        name: "Modules",
        outcomeName: "Feature Encapsulation & Reusable Modules",
        desc: "Organize features into cohesive modules — the bedrock of scalable NestJS application structure.",
        path: "/learn/nestjs/nj06-modules",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisites: ["Project Setup"],
      },
      {
        code: "NJ-07",
        slug: "nj07-controllers",
        name: "Controllers & Routing",
        outcomeName: "HTTP Endpoints & Request Routing",
        desc: "Handle HTTP requests cleanly with method decorators like @Get, @Post, @Param, and @Body.",
        path: "/learn/nestjs/nj07-controllers",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisites: ["Modules"],
      },
      {
        code: "NJ-08",
        slug: "nj08-services",
        name: "Providers & Services",
        outcomeName: "Business Logic Encapsulation",
        desc: "Encapsulate business logic layer with @Injectable providers — the heart of robust NestJS architecture.",
        path: "/learn/nestjs/nj08-services",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisites: ["Controllers"],
      },
      {
        code: "NJ-09",
        slug: "nj09-dependency-injection",
        name: "Dependency Injection",
        outcomeName: "Inversion of Control & DI Container",
        desc: "How NestJS IoC container resolves dependencies automatically — constructor injection and custom tokens.",
        path: "/learn/nestjs/nj09-dependency-injection",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisites: ["Providers & Services"],
      },
      {
        code: "NJ-10",
        slug: "nj10-dto-validation",
        name: "DTOs & Validation",
        outcomeName: "Request Contracts & Runtime Validation",
        desc: "Data Transfer Objects paired with class-validator and class-transformer for resilient request contracts.",
        path: "/learn/nestjs/nj10-dto-validation",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisites: ["Controllers & Services"],
      },
    ],
  },
  {
    id: "stage-3",
    stageNumber: 3,
    name: "Control How Requests Work",
    subtitle: "Request Pipeline & Execution Lifecycle",
    milestone: "You can now add validation, authorization guards, filters, and interceptors to any endpoint.",
    description: "Master the complete request execution flow: Middleware, Guards, Interceptors, Pipes, and Exception Filters.",
    theme: {
      badge: "bg-ds-feature-lighter text-ds-feature-dark border-ds-feature-light/30",
      dot: "bg-ds-feature-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-feature-dark",
    },
    lessons: [
      {
        code: "NJ-11",
        slug: "nj11-request-lifecycle",
        name: "Request Lifecycle Overview",
        outcomeName: "The Step-by-Step Request Flow",
        desc: "The complete journey of an HTTP request: Middleware → Guards → Interceptors → Pipes → Controller → Filters.",
        path: "/learn/nestjs/nj11-request-lifecycle",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisites: ["Core Architecture"],
      },
      {
        code: "NJ-12",
        slug: "nj12-pipes",
        name: "Pipes & Transformation",
        outcomeName: "Input Parsing & Sanitization",
        desc: "Built-in and custom pipes for runtime validation, parsing primitives, and sanitizing inbound payloads.",
        path: "/learn/nestjs/nj12-pipes",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisites: ["DTO Validation"],
      },
      {
        code: "NJ-13",
        slug: "nj13-guards",
        name: "Guards & Authorization",
        outcomeName: "Route Protection with CanActivate",
        desc: "Protect sensitive endpoints with role-based and permission-based execution guards with CanActivate.",
        path: "/learn/nestjs/nj13-guards",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisites: ["Request Lifecycle"],
      },
      {
        code: "NJ-14",
        slug: "nj14-interceptors",
        name: "Interceptors & RxJS",
        outcomeName: "Response Mutation & Aspect-Oriented Logic",
        desc: "Transform responses, log execution metrics, handle response caching, and bind RxJS stream operators.",
        path: "/learn/nestjs/nj14-interceptors",
        tag: "BUILD",
        estimatedMinutes: 30,
        prerequisites: ["Request Lifecycle"],
      },
      {
        code: "NJ-15",
        slug: "nj15-exception-filters",
        name: "Exception Filters",
        outcomeName: "Centralized Global Error Handling",
        desc: "Centralized error handling with custom exception filters and predictable structured error responses.",
        path: "/learn/nestjs/nj15-exception-filters",
        tag: "BUILD",
        estimatedMinutes: 20,
        prerequisites: ["Controllers & Services"],
      },
      {
        code: "NJ-16",
        slug: "nj16-middleware",
        name: "Middleware",
        outcomeName: "Low-Level Express Integration & Logging",
        desc: "Request/response middleware pipeline — logging, CORS headers, rate limiting, and Express compatibility.",
        path: "/learn/nestjs/nj16-middleware",
        tag: "PROFESSIONAL",
        estimatedMinutes: 20,
        prerequisites: ["Request Lifecycle"],
      },
    ],
  },
  {
    id: "stage-4",
    stageNumber: 4,
    name: "Secure Your Application",
    subtitle: "Authentication & Security Hardening",
    milestone: "You can now implement secure JWT login, role-based access control, and attack defense.",
    description: "Build production-grade authentication with Passport, JWT tokens, RBAC roles, custom decorators, and rate limiting.",
    theme: {
      badge: "bg-ds-warning-lighter text-ds-warning-dark border-ds-warning-light/30",
      dot: "bg-ds-warning-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-warning-dark",
    },
    lessons: [
      {
        code: "NJ-17",
        slug: "nj17-custom-decorators",
        name: "Custom Decorators",
        outcomeName: "@CurrentUser() & Custom Param Extractors",
        desc: "Build custom param and method decorators like @CurrentUser(), @Public(), and @Roles() with createParamDecorator.",
        path: "/learn/nestjs/nj17-custom-decorators",
        tag: "BUILD",
        estimatedMinutes: 20,
        prerequisites: ["Decorators Deep Dive", "Guards"],
      },
      {
        code: "NJ-18",
        slug: "nj18-auth-jwt",
        name: "Authentication (JWT & Passport)",
        outcomeName: "Stateless Authentication & Tokens",
        desc: "Passport.js integration with JWT strategy — credential verification, token refresh, and protected routes.",
        path: "/learn/nestjs/nj18-auth-jwt",
        tag: "BUILD",
        estimatedMinutes: 35,
        prerequisites: ["Guards", "Custom Decorators"],
      },
      {
        code: "NJ-19",
        slug: "nj19-rbac",
        name: "RBAC & Role-Based Authorization",
        outcomeName: "Permission Gates with Reflection",
        desc: "Enforce granular permissions with Reflector, metadata reflection, custom @Roles() decorators, and hierarchical RBAC.",
        path: "/learn/nestjs/nj19-rbac",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisites: ["Authentication (JWT)", "Guards"],
      },
      {
        code: "NJ-20",
        slug: "nj20-security",
        name: "Security Hardening",
        outcomeName: "Helmet, CORS & Throttling",
        desc: "Harden your API with Helmet security headers, fine-grained CORS, and @nestjs/throttler rate limiting.",
        path: "/learn/nestjs/nj20-security",
        tag: "PROFESSIONAL",
        estimatedMinutes: 25,
        prerequisites: ["Middleware", "Authentication"],
      },
    ],
  },
  {
    id: "stage-5",
    stageNumber: 5,
    name: "Add a Real Database",
    subtitle: "Database Layer (Prisma & PostgreSQL)",
    milestone: "You can now model schemas, run migrations, and execute clean queries with Prisma ORM.",
    description: "Modern database management with Prisma ORM: schema modeling, relations, migrations, pagination, and serialization.",
    theme: {
      badge: "bg-ds-stable-lighter text-ds-stable-dark border-ds-stable-light/30",
      dot: "bg-ds-stable-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-stable-dark",
    },
    lessons: [
      {
        code: "NJ-21",
        slug: "nj21-database-prisma",
        name: "Database Setup (Prisma + PostgreSQL)",
        outcomeName: "Connecting Prisma Client & Lifecycle Hooks",
        desc: "Integrate Prisma ORM with NestJS services using PrismaService and PrismaClient lifecycle hooks.",
        path: "/learn/nestjs/nj21-database-prisma",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisites: ["Core Architecture"],
      },
      {
        code: "NJ-22",
        slug: "nj22-entities-relations",
        name: "Entities, Relations & Repositories",
        outcomeName: "Relational Modeling (1:1, 1:N, M:N)",
        desc: "Model 1-to-1, 1-to-many, and many-to-many relationships, cascade deletes, and clean repository patterns.",
        path: "/learn/nestjs/nj22-entities-relations",
        tag: "BUILD",
        estimatedMinutes: 30,
        prerequisites: ["Database Setup"],
      },
      {
        code: "NJ-23",
        slug: "nj23-migrations-seeding",
        name: "Migrations & Database Seeding",
        outcomeName: "Schema Evolution & Test Data Seeding",
        desc: "Manage production schema migrations with Prisma Migrate, seed development data, and handle rollback safety.",
        path: "/learn/nestjs/nj23-migrations-seeding",
        tag: "BUILD",
        estimatedMinutes: 20,
        prerequisites: ["Entities & Relations"],
      },
      {
        code: "NJ-24",
        slug: "nj24-pagination-filtering",
        name: "Pagination, Filtering & Sorting",
        outcomeName: "Cursor/Offset Paging & Search Queries",
        desc: "Build scalable offset and cursor-based pagination, dynamic query filtering, and sorting helper utilities.",
        path: "/learn/nestjs/nj24-pagination-filtering",
        tag: "PROFESSIONAL",
        estimatedMinutes: 25,
        prerequisites: ["Entities & Relations"],
      },
      {
        code: "NJ-25",
        slug: "nj25-serialization",
        name: "Serialization & Response Shaping",
        outcomeName: "Safe Payload Exclusion with @Exclude()",
        desc: "Exclude sensitive fields (passwords) and shape output payloads with ClassSerializerInterceptor and @Exclude().",
        path: "/learn/nestjs/nj25-serialization",
        tag: "PROFESSIONAL",
        estimatedMinutes: 20,
        prerequisites: ["DTOs & Validation", "Entities"],
      },
    ],
  },
  {
    id: "stage-6",
    stageNumber: 6,
    name: "Ship Your Application",
    subtitle: "Production Engineering & DevOps",
    milestone: "You can now build, test, document, dockerize, and deploy production-ready NestJS backends.",
    description: "Equip your API with typed configuration, structured Pino logging, automated testing, Swagger, Redis caching, and Docker.",
    theme: {
      badge: "bg-ds-highlighted-lighter text-ds-highlighted-dark border-ds-highlighted-light/30",
      dot: "bg-ds-highlighted-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-highlighted-dark",
    },
    lessons: [
      {
        code: "NJ-26",
        slug: "nj26-config",
        name: "Configuration & Environment",
        outcomeName: "Typed Env Variables & Joi Validation",
        desc: "ConfigModule, environment variables, Joi schema validation, and strictly typed configuration objects.",
        path: "/learn/nestjs/nj26-config",
        tag: "PROFESSIONAL",
        estimatedMinutes: 20,
        prerequisites: ["Core Architecture"],
      },
      {
        code: "NJ-27",
        slug: "nj27-logging",
        name: "Structured Logging & Observability",
        outcomeName: "Pino JSON Logging & Tracing",
        desc: "Production JSON logging with nestjs-pino, AsyncLocalStorage request IDs, and performance tracing.",
        path: "/learn/nestjs/nj27-logging",
        tag: "PROFESSIONAL",
        estimatedMinutes: 25,
        prerequisites: ["Middleware", "Interceptors"],
      },
      {
        code: "NJ-28",
        slug: "nj28-testing",
        name: "Testing Strategies (Unit, E2E)",
        outcomeName: "Unit, Integration & Supertest E2E",
        desc: "Unit tests with Jest mocks, integration testing with Test.createTestingModule, and E2E with Supertest.",
        path: "/learn/nestjs/nj28-testing",
        tag: "PROFESSIONAL",
        estimatedMinutes: 35,
        prerequisites: ["Core Architecture", "Database Setup"],
      },
      {
        code: "NJ-29",
        slug: "nj29-swagger",
        name: "API Documentation (Swagger/OpenAPI)",
        outcomeName: "Interactive Swagger UI & Specs",
        desc: "Automated OpenAPI generation with @nestjs/swagger, schema decorators, and interactive Swagger UI.",
        path: "/learn/nestjs/nj29-swagger",
        tag: "BUILD",
        estimatedMinutes: 20,
        prerequisites: ["DTOs & Validation", "Controllers"],
      },
      {
        code: "NJ-30",
        slug: "nj30-file-uploads",
        name: "File Uploads & Static Assets",
        outcomeName: "Multer Multi-Part File Handling",
        desc: "Streamlined multi-part file handling using Multer interceptors and secured static asset hosting.",
        path: "/learn/nestjs/nj30-file-uploads",
        tag: "REFERENCE",
        estimatedMinutes: 20,
        prerequisites: ["Interceptors"],
      },
      {
        code: "NJ-31",
        slug: "nj31-caching",
        name: "Caching & Redis",
        outcomeName: "In-Memory Cache & Redis Store",
        desc: "High-speed caching layer with CacheModule and Redis store integration to accelerate response times.",
        path: "/learn/nestjs/nj31-caching",
        tag: "PROFESSIONAL",
        estimatedMinutes: 25,
        prerequisites: ["Interceptors"],
      },
      {
        code: "NJ-32",
        slug: "nj32-deployment",
        name: "Production Deployment & Docker",
        outcomeName: "Docker Multi-Stage & Health Checks",
        desc: "Docker multi-stage builds, Terminus health checks, graceful process shutdown, and CI/CD pipelines.",
        path: "/learn/nestjs/nj32-deployment",
        tag: "PROFESSIONAL",
        estimatedMinutes: 30,
        prerequisites: ["Testing", "Configuration"],
      },
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
    (l) => l.slug === slug || l.path.endsWith(`/${slug}`) || l.path.includes(slug)
  );
}

export function getLessonByCode(code: string): LessonMeta | undefined {
  return getAllLessons().find(
    (l) => l.code.toUpperCase() === code.toUpperCase()
  );
}

export function getStageByLessonSlug(slug: string): StageMeta | undefined {
  return NESTJS_STAGES.find((stage) =>
    stage.lessons.some(
      (l) => l.slug === slug || l.path.endsWith(`/${slug}`) || l.path.includes(slug)
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
