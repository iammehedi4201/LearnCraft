"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NestJSHub(): JSX.Element {
  const prerequisites = [
    {
      code: "NJ-01",
      name: "TypeScript Essentials",
      path: "/learn/nestjs/nj01-typescript-essentials",
      desc: "Types, interfaces, enums, generics, and type narrowing — the TS skills NestJS demands",
      color: "amber",
    },
    {
      code: "NJ-02",
      name: "OOP Foundations",
      path: "/learn/nestjs/nj02-oop-foundations",
      desc: "Classes, inheritance, encapsulation, polymorphism, and abstraction with real examples",
      color: "amber",
    },
    {
      code: "NJ-03",
      name: "Decorators Deep Dive",
      path: "/learn/nestjs/nj03-decorators",
      desc: "Class, method, property, and parameter decorators — the backbone of NestJS",
      color: "amber",
    },
    {
      code: "NJ-04",
      name: "SOLID Principles",
      path: "/learn/nestjs/nj04-solid",
      desc: "Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion",
      color: "amber",
    },
  ];

  const foundations = [
    {
      code: "NJ-05",
      name: "Project Setup & Architecture",
      path: "/learn/nestjs/nj05-setup",
      desc: "Install NestJS CLI, generate a project, understand the folder structure vs Express",
      color: "red",
    },
    {
      code: "NJ-06",
      name: "Modules",
      path: "/learn/nestjs/nj06-modules",
      desc: "Organize features into cohesive modules — NestJS's core organizational pattern",
      color: "red",
    },
    {
      code: "NJ-07",
      name: "Controllers & Routing",
      path: "/learn/nestjs/nj07-controllers",
      desc: "Handle HTTP requests with decorators like @Get, @Post, @Param, @Body",
      color: "red",
    },
    {
      code: "NJ-08",
      name: "Providers & Services",
      path: "/learn/nestjs/nj08-services",
      desc: "Business logic layer with @Injectable — the heart of NestJS architecture",
      color: "red",
    },
    {
      code: "NJ-09",
      name: "Dependency Injection",
      path: "/learn/nestjs/nj09-dependency-injection",
      desc: "How NestJS resolves dependencies automatically — constructor injection, custom providers",
      color: "red",
    },
    {
      code: "NJ-10",
      name: "DTOs & Validation",
      path: "/learn/nestjs/nj10-dto-validation",
      desc: "Data Transfer Objects with class-validator and class-transformer pipes",
      color: "red",
    },
  ];

  const intermediate = [
    {
      code: "NJ-11",
      name: "Pipes & Transformation",
      path: "/learn/nestjs/nj11-pipes",
      desc: "Built-in and custom pipes for validation, parsing, and data transformation",
      color: "purple",
    },
    {
      code: "NJ-12",
      name: "Guards & Authorization",
      path: "/learn/nestjs/nj12-guards",
      desc: "Protect routes with role-based and permission-based guards",
      color: "purple",
    },
    {
      code: "NJ-13",
      name: "Interceptors",
      path: "/learn/nestjs/nj13-interceptors",
      desc: "Transform responses, add logging, handle caching, and measure execution time",
      color: "purple",
    },
    {
      code: "NJ-14",
      name: "Exception Filters",
      path: "/learn/nestjs/nj14-exception-filters",
      desc: "Centralized error handling with custom exception filters and error responses",
      color: "purple",
    },
    {
      code: "NJ-15",
      name: "Middleware",
      path: "/learn/nestjs/nj15-middleware",
      desc: "Request/response middleware — logging, CORS, rate limiting, and Express compatibility",
      color: "purple",
    },
    {
      code: "NJ-16",
      name: "Authentication (JWT)",
      path: "/learn/nestjs/nj16-auth-jwt",
      desc: "Passport.js + JWT strategy — login, token refresh, protected routes",
      color: "purple",
    },
  ];

  const advanced = [
    {
      code: "NJ-17",
      name: "Database Integration",
      path: "/learn/nestjs/nj17-database",
      desc: "TypeORM and Prisma with PostgreSQL — entities, repositories, migrations",
      color: "emerald",
    },
    {
      code: "NJ-18",
      name: "Configuration & Environment",
      path: "/learn/nestjs/nj18-config",
      desc: "ConfigModule, .env files, Joi validation, and typed configurations",
      color: "emerald",
    },
    {
      code: "NJ-19",
      name: "Testing Strategies",
      path: "/learn/nestjs/nj19-testing",
      desc: "Unit tests, integration tests, e2e tests with Jest and supertest",
      color: "emerald",
    },
    {
      code: "NJ-20",
      name: "Scalable Folder Structure",
      path: "/learn/nestjs/nj20-folder-structure",
      desc: "Production-grade project organization — domain-driven, modular, and clean",
      color: "emerald",
    },
    {
      code: "NJ-21",
      name: "Microservices Basics",
      path: "/learn/nestjs/nj21-microservices",
      desc: "Transport layers, message patterns, event-based communication",
      color: "emerald",
    },
    {
      code: "NJ-22",
      name: "Production Deployment",
      path: "/learn/nestjs/nj22-deployment",
      desc: "Docker, CI/CD, health checks, graceful shutdown, and performance tuning",
      color: "emerald",
    },
  ];

  const eliteAddons = [
    {
      code: "NJ-23",
      name: "API Documentation (Swagger)",
      path: "/learn/nestjs/nj23-swagger",
      desc: "Automated API documentation with @nestjs/swagger, DTO integration, and Swagger UI",
      color: "blue",
    },
    {
      code: "NJ-24",
      name: "File Uploads & Static Assets",
      path: "/learn/nestjs/nj24-file-uploads",
      desc: "Handling file uploads with Multer and serving static assets securely",
      color: "blue",
    },
    {
      code: "NJ-25",
      name: "WebSockets (Real-time)",
      path: "/learn/nestjs/nj25-websockets",
      desc: "Bidirectional real-time communication with Gateways and Socket.io",
      color: "blue",
    },
    {
      code: "NJ-26",
      name: "Task Scheduling (Cron)",
      path: "/learn/nestjs/nj26-scheduling",
      desc: "Automate background tasks and recurring jobs with @nestjs/schedule",
      color: "blue",
    },
    {
      code: "NJ-27",
      name: "Caching & Redis",
      path: "/learn/nestjs/nj27-caching",
      desc: "Boost performance with caching layers and Redis integration",
      color: "blue",
    },
  ];

  const FeatureCard = ({
    code,
    name,
    path,
    desc,
    color = "red",
  }: {
    code: string;
    name: string;
    path: string;
    desc: string;
    color?: string;
  }) => (
    <Link
      href={path}
      className="group relative block p-6 glass-card rounded-2xl hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-${color}-500/10 text-${color}-600`}>
            {code}
          </span>
        </div>
        <h3 className="font-display font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>
      <div className={`absolute bottom-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0 translate-x-4`}>
        <svg className={`w-5 h-5 text-${color}-500`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
      </div>
    </Link>
  );

  return (
    <>
      <Nav />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-20">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors mb-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            Back to Learning Paths
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
                NestJS <span className="text-red-600 dark:text-red-400">Elite</span> Mastery
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                27 comprehensive lessons — from TypeScript & OOP foundations to production-grade
                backend APIs. Project-based, with Express.js comparisons at every step.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              Progress: 0 / 27 Complete
            </div>
          </div>
        </div>

        {/* Prerequisites — TypeScript & OOP */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-display text-2xl font-bold text-slate-900 dark:text-white">
              Prerequisites — TypeScript & OOP
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-amber-200 dark:from-amber-900 to-transparent" />
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 px-3 py-1 rounded-full uppercase tracking-widest">NJ-01 to NJ-04</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {prerequisites.map((f) => (
              <FeatureCard key={f.code} {...f} />
            ))}
          </div>
        </section>

        {/* NestJS Foundations */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-display text-2xl font-bold text-slate-900 dark:text-white">
              NestJS Foundations
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-red-200 dark:from-red-900 to-transparent" />
            <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 px-3 py-1 rounded-full uppercase tracking-widest">NJ-05 to NJ-10</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foundations.map((f) => (
              <FeatureCard key={f.code} {...f} />
            ))}
          </div>
        </section>

        {/* Intermediate */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-display text-2xl font-bold text-slate-900 dark:text-white">
              Intermediate Patterns
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-200 dark:from-purple-900 to-transparent" />
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/20 px-3 py-1 rounded-full uppercase tracking-widest">NJ-11 to NJ-16</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intermediate.map((f) => (
              <FeatureCard key={f.code} {...f} />
            ))}
          </div>
        </section>

        {/* Advanced */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-display text-2xl font-bold text-slate-900 dark:text-white">
              Advanced & Production
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-emerald-200 dark:from-emerald-900 to-transparent" />
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1 rounded-full uppercase tracking-widest">NJ-17 to NJ-22</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advanced.map((f) => (
              <FeatureCard key={f.code} {...f} />
            ))}
          </div>
        </section>

        {/* Elite Add-ons */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-display text-2xl font-bold text-slate-900 dark:text-white">
              Elite Add-ons & Scalability
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-200 dark:from-blue-900 to-transparent" />
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 px-3 py-1 rounded-full uppercase tracking-widest">NJ-23 to NJ-27</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eliteAddons.map((f) => (
              <FeatureCard key={f.code} {...f} />
            ))}
          </div>
        </section>

        {/* Bottom Banner */}
        <div className="relative group overflow-hidden rounded-3xl bg-red-900 p-8 sm:p-12 text-white shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h3 className="text-display text-2xl font-bold mb-4">Project-Based Learning Protocol</h3>
              <p className="text-red-100 leading-relaxed mb-8 max-w-xl">
                Every lesson includes real-world code, Express.js comparisons, hands-on mini challenges,
                and common mistakes to avoid. You build a production-ready API from lesson 1 to 27.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-red-900 bg-red-800 flex items-center justify-center text-xs font-bold">
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-red-200 font-medium">4-Phase Architecture Protocol</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-3xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
                <svg className="w-12 h-12 text-red-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
              </div>
            </div>
          </div>
          <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-red-800/20 blur-3xl group-hover:bg-red-800/30 transition-colors duration-500" />
        </div>
      </div>
    </>
  );
}
