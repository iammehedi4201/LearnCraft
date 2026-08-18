"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";

interface Lesson {
  code: string;
  name: string;
  path: string;
  desc: string;
  phaseId: string;
  phaseName: string;
}

interface PhaseConfig {
  id: string;
  phaseNumber: string;
  title: string;
  codeRange: string;
  description: string;
  theme: {
    badge: string;
    hoverBorder: string;
    hoverText: string;
    hoverShadow: string;
    dot: string;
    gradient: string;
    iconBg: string;
    iconText: string;
  };
  lessons: Lesson[];
}

const PHASES: PhaseConfig[] = [
  {
    id: "prerequisites",
    phaseNumber: "PHASE 01",
    title: "TypeScript & OOP Prerequisites",
    codeRange: "NJ-01 to NJ-04",
    description: "Master the type system, interfaces, decorators, and OOP fundamentals that empower NestJS architecture.",
    theme: {
      badge: "bg-ds-away-lighter text-ds-away-dark border border-ds-away-light",
      hoverBorder: "hover:border-ds-away-base",
      hoverText: "group-hover:text-ds-away-base",
      hoverShadow: "hover:shadow-ds-away-base/5",
      dot: "bg-ds-away-base",
      gradient: "from-ds-away-base/30 to-transparent",
      iconBg: "bg-ds-away-lighter",
      iconText: "text-ds-away-dark",
    },
    lessons: [
      {
        code: "NJ-01",
        name: "TypeScript Essentials",
        path: "/learn/nestjs/nj01-typescript-essentials",
        desc: "Types, interfaces, enums, generics, and type narrowing — the core TS skills NestJS demands.",
        phaseId: "prerequisites",
        phaseName: "Prerequisites",
      },
      {
        code: "NJ-02",
        name: "OOP Foundations",
        path: "/learn/nestjs/nj02-oop-foundations",
        desc: "Classes, inheritance, encapsulation, polymorphism, and abstraction with real backend examples.",
        phaseId: "prerequisites",
        phaseName: "Prerequisites",
      },
      {
        code: "NJ-03",
        name: "Decorators Deep Dive",
        path: "/learn/nestjs/nj03-decorators",
        desc: "Class, method, property, and parameter decorators — understand the syntactic backbone of NestJS.",
        phaseId: "prerequisites",
        phaseName: "Prerequisites",
      },
      {
        code: "NJ-04",
        name: "SOLID Principles",
        path: "/learn/nestjs/nj04-solid",
        desc: "Single Responsibility, Open/Closed, Liskov, Interface Segregation, and Dependency Inversion.",
        phaseId: "prerequisites",
        phaseName: "Prerequisites",
      },
    ],
  },
  {
    id: "foundations",
    phaseNumber: "PHASE 02",
    title: "NestJS Core Architecture",
    codeRange: "NJ-05 to NJ-10",
    description: "Understand the foundational primitives: modules, controllers, injectable services, dependency injection, and DTOs.",
    theme: {
      badge: "bg-ds-error-lighter text-ds-error-dark border border-ds-error-light",
      hoverBorder: "hover:border-ds-error-base",
      hoverText: "group-hover:text-ds-error-base",
      hoverShadow: "hover:shadow-ds-error-base/5",
      dot: "bg-ds-error-base",
      gradient: "from-ds-error-base/30 to-transparent",
      iconBg: "bg-ds-error-lighter",
      iconText: "text-ds-error-dark",
    },
    lessons: [
      {
        code: "NJ-05",
        name: "Project Setup & Architecture",
        path: "/learn/nestjs/nj05-setup",
        desc: "Install NestJS CLI, generate scaffolding, and understand clean modular folder organization vs Express.",
        phaseId: "foundations",
        phaseName: "Foundations",
      },
      {
        code: "NJ-06",
        name: "Modules",
        path: "/learn/nestjs/nj06-modules",
        desc: "Organize features into cohesive modules — the bedrock of scalable NestJS application structure.",
        phaseId: "foundations",
        phaseName: "Foundations",
      },
      {
        code: "NJ-07",
        name: "Controllers & Routing",
        path: "/learn/nestjs/nj07-controllers",
        desc: "Handle HTTP requests cleanly with method decorators like @Get, @Post, @Param, and @Body.",
        phaseId: "foundations",
        phaseName: "Foundations",
      },
      {
        code: "NJ-08",
        name: "Providers & Services",
        path: "/learn/nestjs/nj08-services",
        desc: "Encapsulate business logic layer with @Injectable providers — the heart of robust NestJS architecture.",
        phaseId: "foundations",
        phaseName: "Foundations",
      },
      {
        code: "NJ-09",
        name: "Dependency Injection",
        path: "/learn/nestjs/nj09-dependency-injection",
        desc: "How NestJS IoC container resolves dependencies automatically — constructor injection and custom tokens.",
        phaseId: "foundations",
        phaseName: "Foundations",
      },
      {
        code: "NJ-10",
        name: "DTOs & Validation",
        path: "/learn/nestjs/nj10-dto-validation",
        desc: "Data Transfer Objects paired with class-validator and class-transformer for resilient request contracts.",
        phaseId: "foundations",
        phaseName: "Foundations",
      },
    ],
  },
  {
    id: "request-pipeline",
    phaseNumber: "PHASE 03",
    title: "Request Pipeline & Execution Lifecycle",
    codeRange: "NJ-11 to NJ-16",
    description: "Master the complete request execution flow: Middleware, Guards, Interceptors, Pipes, and Exception Filters.",
    theme: {
      badge: "bg-ds-feature-lighter text-ds-feature-dark border border-ds-feature-light",
      hoverBorder: "hover:border-ds-feature-base",
      hoverText: "group-hover:text-ds-feature-base",
      hoverShadow: "hover:shadow-ds-feature-base/5",
      dot: "bg-ds-feature-base",
      gradient: "from-ds-feature-base/30 to-transparent",
      iconBg: "bg-ds-feature-lighter",
      iconText: "text-ds-feature-dark",
    },
    lessons: [
      {
        code: "NJ-11",
        name: "Request Lifecycle Overview",
        path: "/learn/nestjs/nj11-request-lifecycle",
        desc: "The complete journey of an HTTP request: Middleware → Guards → Interceptors → Pipes → Controller → Filters.",
        phaseId: "request-pipeline",
        phaseName: "Request Pipeline",
      },
      {
        code: "NJ-12",
        name: "Pipes & Transformation",
        path: "/learn/nestjs/nj12-pipes",
        desc: "Built-in and custom pipes for runtime validation, parsing primitives, and sanitizing inbound payloads.",
        phaseId: "request-pipeline",
        phaseName: "Request Pipeline",
      },
      {
        code: "NJ-13",
        name: "Guards & Authorization",
        path: "/learn/nestjs/nj13-guards",
        desc: "Protect sensitive endpoints with role-based and permission-based execution guards with CanActivate.",
        phaseId: "request-pipeline",
        phaseName: "Request Pipeline",
      },
      {
        code: "NJ-14",
        name: "Interceptors & RxJS",
        path: "/learn/nestjs/nj14-interceptors",
        desc: "Transform responses, log execution metrics, handle response caching, and bind RxJS stream operators.",
        phaseId: "request-pipeline",
        phaseName: "Request Pipeline",
      },
      {
        code: "NJ-15",
        name: "Exception Filters",
        path: "/learn/nestjs/nj15-exception-filters",
        desc: "Centralized error handling with custom exception filters and predictable structured error responses.",
        phaseId: "request-pipeline",
        phaseName: "Request Pipeline",
      },
      {
        code: "NJ-16",
        name: "Middleware",
        path: "/learn/nestjs/nj16-middleware",
        desc: "Request/response middleware pipeline — logging, CORS headers, rate limiting, and Express compatibility.",
        phaseId: "request-pipeline",
        phaseName: "Request Pipeline",
      },
    ],
  },
  {
    id: "auth-security",
    phaseNumber: "PHASE 04",
    title: "Authentication & Security Hardening",
    codeRange: "NJ-17 to NJ-20",
    description: "Build production-grade authentication with Passport, JWT tokens, RBAC roles, custom decorators, and rate limiting.",
    theme: {
      badge: "bg-ds-warning-lighter text-ds-warning-dark border border-ds-warning-light",
      hoverBorder: "hover:border-ds-warning-base",
      hoverText: "group-hover:text-ds-warning-base",
      hoverShadow: "hover:shadow-ds-warning-base/5",
      dot: "bg-ds-warning-base",
      gradient: "from-ds-warning-base/30 to-transparent",
      iconBg: "bg-ds-warning-lighter",
      iconText: "text-ds-warning-dark",
    },
    lessons: [
      {
        code: "NJ-17",
        name: "Custom Decorators",
        path: "/learn/nestjs/nj17-custom-decorators",
        desc: "Build custom param and method decorators like @CurrentUser(), @Public(), and @Roles() with createParamDecorator.",
        phaseId: "auth-security",
        phaseName: "Auth & Security",
      },
      {
        code: "NJ-18",
        name: "Authentication (JWT & Passport)",
        path: "/learn/nestjs/nj18-auth-jwt",
        desc: "Passport.js integration with JWT strategy — credential verification, token refresh, and protected routes.",
        phaseId: "auth-security",
        phaseName: "Auth & Security",
      },
      {
        code: "NJ-19",
        name: "RBAC & Role-Based Authorization",
        path: "/learn/nestjs/nj19-rbac",
        desc: "Enforce granular permissions with Reflector, metadata reflection, custom @Roles() decorators, and hierarchical RBAC.",
        phaseId: "auth-security",
        phaseName: "Auth & Security",
      },
      {
        code: "NJ-20",
        name: "Security Hardening (Helmet, CORS, Throttler)",
        path: "/learn/nestjs/nj20-security",
        desc: "Harden your API with Helmet security headers, fine-grained CORS, and @nestjs/throttler rate limiting.",
        phaseId: "auth-security",
        phaseName: "Auth & Security",
      },
    ],
  },
  {
    id: "database-prisma",
    phaseNumber: "PHASE 05",
    title: "Database Layer (Prisma & PostgreSQL)",
    codeRange: "NJ-21 to NJ-25",
    description: "Modern database management with Prisma ORM: schema modeling, relations, migrations, pagination, and serialization.",
    theme: {
      badge: "bg-ds-success-lighter text-ds-success-dark border border-ds-success-light",
      hoverBorder: "hover:border-ds-success-base",
      hoverText: "group-hover:text-ds-success-base",
      hoverShadow: "hover:shadow-ds-success-base/5",
      dot: "bg-ds-success-base",
      gradient: "from-ds-success-base/30 to-transparent",
      iconBg: "bg-ds-success-lighter",
      iconText: "text-ds-success-dark",
    },
    lessons: [
      {
        code: "NJ-21",
        name: "Database Setup (Prisma + PostgreSQL)",
        path: "/learn/nestjs/nj21-database-prisma",
        desc: "Integrate Prisma ORM with NestJS services using PrismaService and PrismaClient lifecycle hooks.",
        phaseId: "database-prisma",
        phaseName: "Database & Prisma",
      },
      {
        code: "NJ-22",
        name: "Entities, Relations & Repositories",
        path: "/learn/nestjs/nj22-entities-relations",
        desc: "Model 1-to-1, 1-to-many, and many-to-many relationships, cascade deletes, and clean repository patterns.",
        phaseId: "database-prisma",
        phaseName: "Database & Prisma",
      },
      {
        code: "NJ-23",
        name: "Migrations & Database Seeding",
        path: "/learn/nestjs/nj23-migrations-seeding",
        desc: "Manage production schema migrations with Prisma Migrate, seed development data, and handle rollback safety.",
        phaseId: "database-prisma",
        phaseName: "Database & Prisma",
      },
      {
        code: "NJ-24",
        name: "Pagination, Filtering & Sorting",
        path: "/learn/nestjs/nj24-pagination-filtering",
        desc: "Build scalable offset and cursor-based pagination, dynamic query filtering, and sorting helper utilities.",
        phaseId: "database-prisma",
        phaseName: "Database & Prisma",
      },
      {
        code: "NJ-25",
        name: "Serialization & Response Shaping",
        path: "/learn/nestjs/nj25-serialization",
        desc: "Exclude sensitive fields (passwords) and shape output payloads with ClassSerializerInterceptor and @Exclude().",
        phaseId: "database-prisma",
        phaseName: "Database & Prisma",
      },
    ],
  },
  {
    id: "production-engineering",
    phaseNumber: "PHASE 06",
    title: "Production Engineering & DevOps",
    codeRange: "NJ-26 to NJ-32",
    description: "Equip your API with typed configuration, structured Pino logging, automated testing, Swagger, Redis caching, and Docker.",
    theme: {
      badge: "bg-ds-info-lighter text-ds-info-dark border border-ds-info-light",
      hoverBorder: "hover:border-ds-info-base",
      hoverText: "group-hover:text-ds-info-base",
      hoverShadow: "hover:shadow-ds-info-base/5",
      dot: "bg-ds-info-base",
      gradient: "from-ds-info-base/30 to-transparent",
      iconBg: "bg-ds-info-lighter",
      iconText: "text-ds-info-dark",
    },
    lessons: [
      {
        code: "NJ-26",
        name: "Configuration & Environment",
        path: "/learn/nestjs/nj26-config",
        desc: "ConfigModule, environment variables, Joi schema validation, and strictly typed configuration objects.",
        phaseId: "production-engineering",
        phaseName: "Production Engineering",
      },
      {
        code: "NJ-27",
        name: "Structured Logging & Observability",
        path: "/learn/nestjs/nj27-logging",
        desc: "Production JSON logging with nestjs-pino, AsyncLocalStorage request IDs, and performance tracing.",
        phaseId: "production-engineering",
        phaseName: "Production Engineering",
      },
      {
        code: "NJ-28",
        name: "Testing Strategies (Unit, Integration, E2E)",
        path: "/learn/nestjs/nj28-testing",
        desc: "Unit tests with Jest mocks, integration testing with Test.createTestingModule, and E2E with Supertest.",
        phaseId: "production-engineering",
        phaseName: "Production Engineering",
      },
      {
        code: "NJ-29",
        name: "API Documentation (Swagger/OpenAPI)",
        path: "/learn/nestjs/nj29-swagger",
        desc: "Automated OpenAPI generation with @nestjs/swagger, schema decorators, and interactive Swagger UI.",
        phaseId: "production-engineering",
        phaseName: "Production Engineering",
      },
      {
        code: "NJ-30",
        name: "File Uploads & Static Assets",
        path: "/learn/nestjs/nj30-file-uploads",
        desc: "Streamlined multi-part file handling using Multer interceptors and secured static asset hosting.",
        phaseId: "production-engineering",
        phaseName: "Production Engineering",
      },
      {
        code: "NJ-31",
        name: "Caching & Redis",
        path: "/learn/nestjs/nj31-caching",
        desc: "High-speed caching layer with CacheModule and Redis store integration to accelerate response times.",
        phaseId: "production-engineering",
        phaseName: "Production Engineering",
      },
      {
        code: "NJ-32",
        name: "Production Deployment & Docker",
        path: "/learn/nestjs/nj32-deployment",
        desc: "Docker multi-stage builds, Terminus health checks, graceful process shutdown, and CI/CD pipelines.",
        phaseId: "production-engineering",
        phaseName: "Production Engineering",
      },
    ],
  },
];

export default function NestJSHub(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhase, setSelectedPhase] = useState<string>("all");

  const totalLessons = useMemo(() => {
    return PHASES.reduce((acc, phase) => acc + phase.lessons.length, 0);
  }, []);

  const filteredPhases = useMemo(() => {
    return PHASES.map((phase) => {
      if (selectedPhase !== "all" && phase.id !== selectedPhase) {
        return null;
      }

      const matchingLessons = phase.lessons.filter((lesson) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
          lesson.code.toLowerCase().includes(query) ||
          lesson.name.toLowerCase().includes(query) ||
          lesson.desc.toLowerCase().includes(query)
        );
      });

      if (matchingLessons.length === 0) {
        return null;
      }

      return {
        ...phase,
        lessons: matchingLessons,
      };
    }).filter(Boolean) as PhaseConfig[];
  }, [searchQuery, selectedPhase]);

  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-ds-text-strong font-sans selection:bg-ds-error-light/20 overflow-x-hidden transition-colors duration-300">
      <Nav />

      <main className="max-w-7xl mx-auto px-6 pt-10 sm:pt-14 pb-20">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm text-xs font-bold text-ds-text-sub hover:text-ds-error-base hover:border-ds-error-base transition-all group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="m15 18-6-6 6-6" />
            </svg>
            <span>Back to Learning Paths</span>
          </Link>
        </div>

        {/* Hero Header Block */}
        <section className="p-8 sm:p-12 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm relative overflow-hidden mb-12">
          {/* Subtle Ambient Mesh Accents */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-ds-error-base/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-ds-away-base/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-3xl">
              {/* Badges / Header Pills */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 text-[10px] font-black tracking-widest uppercase bg-ds-error-lighter text-ds-error-dark border border-ds-error-light rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ds-error-base opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-ds-error-base" />
                  </span>
                  Zero to Production Mastery
                </span>
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ds-text-soft bg-ds-bg-weak border border-ds-stroke-soft rounded-full">
                  NestJS v10+ &amp; Prisma Architecture
                </span>
              </div>

              {/* Title & Tagline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-ds-text-strong font-display mb-4 leading-[1.1]">
                NestJS <span className="text-ds-error-base">Production</span> Roadmap
              </h1>
              <p className="text-base sm:text-lg text-ds-text-sub leading-relaxed max-w-2xl">
                32 progressive lessons designed to take you from foundational OOP concepts to deploying production-grade,
                interview-ready enterprise backend applications with Prisma, JWT security, and Docker.
              </p>
            </div>

            {/* Quick Status / Protocol Card */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 bg-ds-bg-weak p-5 rounded-2xl border border-ds-stroke-soft shrink-0 sm:min-w-[260px]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-ds-text-soft">
                  Curriculum Progress
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-ds-error-lighter text-ds-error-dark border border-ds-error-light">
                  10 / {totalLessons} Ready
                </span>
              </div>

              <div className="w-full bg-ds-bg-soft h-2 rounded-full overflow-hidden">
                <div className="bg-ds-error-base h-full w-[31%] rounded-full" />
              </div>

              <div className="pt-2 border-t border-ds-stroke-soft/60 flex items-center justify-between text-xs text-ds-text-sub">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-ds-success-base" />
                  32 Interactive Modules
                </span>
                <span className="font-mono font-bold text-ds-text-strong">6 Phases</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-ds-stroke-soft">
            <div className="p-3.5 bg-ds-bg-weak rounded-xl border border-ds-stroke-soft">
              <span className="block text-[10px] font-black uppercase tracking-wider text-ds-text-soft">Curriculum</span>
              <span className="text-xl font-bold text-ds-text-strong font-display mt-0.5 block">32 Lessons</span>
              <span className="text-[11px] text-ds-text-sub mt-0.5 block">Basic to Advanced Mastery</span>
            </div>
            <div className="p-3.5 bg-ds-bg-weak rounded-xl border border-ds-stroke-soft">
              <span className="block text-[10px] font-black uppercase tracking-wider text-ds-text-soft">Phases</span>
              <span className="text-xl font-bold text-ds-text-strong font-display mt-0.5 block">6 Phases</span>
              <span className="text-[11px] text-ds-text-sub mt-0.5 block">TS, Core, Pipeline, Auth, DB, Prod</span>
            </div>
            <div className="p-3.5 bg-ds-bg-weak rounded-xl border border-ds-stroke-soft">
              <span className="block text-[10px] font-black uppercase tracking-wider text-ds-text-soft">Database</span>
              <span className="text-xl font-bold text-ds-text-strong font-display mt-0.5 block">Prisma ORM</span>
              <span className="text-[11px] text-ds-text-sub mt-0.5 block">PostgreSQL schema &amp; migrations</span>
            </div>
            <div className="p-3.5 bg-ds-bg-weak rounded-xl border border-ds-stroke-soft">
              <span className="block text-[10px] font-black uppercase tracking-wider text-ds-text-soft">Preparation</span>
              <span className="text-xl font-bold text-ds-text-strong font-display mt-0.5 block">Interview Ready</span>
              <span className="text-[11px] text-ds-text-sub mt-0.5 block">Deep conceptual breakdown</span>
            </div>
          </div>
        </section>

        {/* Interactive Search & Phase Filter Bar */}
        <section className="mb-12 p-4 bg-ds-bg-white border border-ds-stroke-soft rounded-2xl shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ds-text-soft">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by lesson, decorator, topic..."
                className="w-full pl-10 pr-4 py-2 bg-ds-bg-weak border border-ds-stroke-soft rounded-xl text-xs sm:text-sm text-ds-text-strong placeholder:text-ds-text-soft focus:outline-none focus:border-ds-error-base transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-ds-text-soft hover:text-ds-text-strong"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => setSelectedPhase("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedPhase === "all"
                    ? "bg-ds-error-base text-ds-static-white shadow-sm"
                    : "bg-ds-bg-weak text-ds-text-sub hover:text-ds-text-strong border border-ds-stroke-soft"
                }`}
              >
                All ({totalLessons})
              </button>
              {PHASES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPhase(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    selectedPhase === p.id
                      ? "bg-ds-error-base text-ds-static-white shadow-sm"
                      : "bg-ds-bg-weak text-ds-text-sub hover:text-ds-text-strong border border-ds-stroke-soft"
                  }`}
                >
                  {p.phaseNumber} ({p.lessons.length})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Empty Search Result State */}
        {filteredPhases.length === 0 && (
          <div className="p-12 text-center bg-ds-bg-white border border-ds-stroke-soft rounded-3xl mb-16">
            <div className="inline-flex p-4 rounded-2xl bg-ds-error-lighter text-ds-error-dark mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-ds-text-strong mb-1">No matching lessons found</h3>
            <p className="text-xs sm:text-sm text-ds-text-sub mb-6 max-w-sm mx-auto">
              No lessons match &ldquo;{searchQuery}&rdquo;. Try another keyword or clear your filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedPhase("all");
              }}
              className="px-5 py-2 rounded-xl bg-ds-error-base hover:bg-ds-error-dark text-ds-static-white font-bold text-xs transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Curriculum Phases */}
        <div className="space-y-16">
          {filteredPhases.map((phase) => (
            <section key={phase.id} className="relative">
              {/* Section Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-8 border-b border-ds-stroke-soft">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 text-[10px] font-black tracking-widest uppercase rounded-md ${phase.theme.badge}`}>
                    {phase.phaseNumber}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-ds-text-strong font-display">
                    {phase.title}
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-ds-text-soft">
                    {phase.codeRange}
                  </span>
                  <span className="text-xs text-ds-text-disabled">({phase.lessons.length} Modules)</span>
                </div>
              </div>

              {/* Lesson Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {phase.lessons.map((lesson) => (
                  <Link
                    key={lesson.code}
                    href={lesson.path}
                    className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft ${phase.theme.hoverBorder} ${phase.theme.hoverShadow} hover:-translate-y-1 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden`}
                  >
                    <div>
                      {/* Top Code Badge & Dot */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${phase.theme.badge}`}>
                          {lesson.code}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-ds-text-soft">
                          <span className={`h-1.5 w-1.5 rounded-full ${phase.theme.dot}`} />
                          <span>Module Ready</span>
                        </div>
                      </div>

                      {/* Lesson Title */}
                      <h3 className={`font-bold text-base text-ds-text-strong ${phase.theme.hoverText} transition-colors leading-snug mb-2`}>
                        {lesson.name}
                      </h3>

                      {/* Lesson Description */}
                      <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed">
                        {lesson.desc}
                      </p>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-4 mt-6 border-t border-ds-stroke-soft/60 flex items-center justify-between text-xs font-bold text-ds-text-soft">
                      <span className={`${phase.theme.hoverText} transition-colors`}>Explore Lesson</span>
                      <div className={`p-1.5 rounded-lg bg-ds-bg-weak text-ds-text-sub ${phase.theme.hoverText} transition-transform group-hover:translate-x-1`}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Express vs NestJS Architecture Spotlight Section */}
        <section className="mt-20 p-8 sm:p-10 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ds-feature-lighter text-ds-feature-dark border border-ds-feature-light text-[10px] font-black uppercase tracking-widest">
                Architecture Paradigm
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-ds-text-strong font-display">
                Why learn NestJS with Express comparisons?
              </h3>
              <p className="text-ds-text-sub text-sm sm:text-base leading-relaxed">
                Most developers struggle transitioning from unopinionated Node.js scripts to enterprise DI containers.
                Every lesson in this curriculum shows you how the exact same feature is written in vanilla Express.js,
                why it breaks at scale, and how NestJS solves it elegantly with structured modules and TypeScript decorators.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-ds-warning-base shrink-0" />
                    <span className="text-sm font-bold text-ds-text-strong">Express.js (Implicit)</span>
                  </div>
                  <p className="text-xs text-ds-text-sub leading-relaxed">
                    Ad-hoc router files, manual DI wiring, runtime payload errors, and unstandardized structure across teams.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-ds-stroke-soft/60">
                  <span className="text-[10px] font-bold text-ds-warning-dark bg-ds-warning-lighter px-2.5 py-1 rounded-md border border-ds-warning-light inline-block">
                    Fragile at Scale
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-ds-error-base shrink-0" />
                    <span className="text-sm font-bold text-ds-text-strong">NestJS (Explicit)</span>
                  </div>
                  <p className="text-xs text-ds-text-sub leading-relaxed">
                    Built-in IoC container, typed DTO validation pipes, declarative guards, interceptors, and modular boundaries.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-ds-stroke-soft/60">
                  <span className="text-[10px] font-bold text-ds-error-dark bg-ds-error-lighter px-2.5 py-1 rounded-md border border-ds-error-light inline-block">
                    Enterprise Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Studio Banner & Protocol Action */}
        <section className="mt-12 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft p-8 sm:p-12 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-ds-error-base/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded bg-ds-error-lighter text-ds-error-dark border border-ds-error-light">
                  Ready to Start
                </span>
                <span className="text-xs font-mono text-ds-text-soft">Phase 01 &rarr; Phase 06</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-ds-text-strong font-display mb-3">
                Begin with TypeScript Essentials (NJ-01)
              </h3>
              <p className="text-ds-text-sub text-sm sm:text-base leading-relaxed mb-6">
                Start building your production-grade API today. Progress through hands-on challenges,
                real-world code implementations, and clean architectural patterns.
              </p>

              {/* Protocol Step Checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  "1. TS Prerequisites",
                  "2. Core Modules",
                  "3. Request Pipeline",
                  "4. Auth & Security",
                ].map((step, idx) => (
                  <div
                    key={step}
                    className="p-2.5 bg-ds-bg-weak border border-ds-stroke-soft rounded-xl flex items-center gap-2"
                  >
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-ds-error-base text-ds-static-white flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-[11px] font-bold text-ds-text-strong truncate">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/learn/nestjs/nj01-typescript-essentials"
                className="px-6 py-3.5 bg-ds-error-base hover:bg-ds-error-dark text-ds-static-white font-bold rounded-xl text-center text-sm transition-all duration-200 active:scale-95 shadow-md shadow-ds-error-base/20 hover:shadow-lg hover:shadow-ds-error-base/30"
              >
                Start Lesson NJ-01
              </Link>
              <Link
                href="/learn"
                className="px-6 py-3.5 bg-ds-bg-weak hover:bg-ds-bg-soft border border-ds-stroke-soft text-ds-text-strong font-bold rounded-xl text-center text-sm transition-all duration-200"
              >
                Explore Other Tracks
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </InteractiveGrid>
  );
}
