"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SECTION 2: Role-Based Roadmap Visual Preview
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * A visual roadmap showcasing real learning relationships between technologies:
 * - Numbered stages with topic chips
 * - Branching between frameworks (Express vs NestJS) and databases (Postgres, Mongo, Redis)
 * - Subtle connector lines and directional flow
 * - Highlighted active/available stages (NestJS, Next.js, TanStack Query)
 * - Responsive layout: wide branching on desktop, clean vertical timeline on mobile
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState } from "react";
import Link from "next/link";
import { TechIcon, RoleIcon } from "@/components/roadmap/TechIcon";

type RoleType = "backend" | "frontend" | "fullstack";

interface StageData {
  number: string;
  title: string;
  subtitle: string;
  category: string;
  desc: string;
  isBranching?: boolean;
  branches?: {
    name: string;
    tag: string;
    desc: string;
    isAvailable: boolean;
    lessons?: number;
    slug?: string;
    topics: string[];
  }[];
  singleNode?: {
    name: string;
    tag: string;
    isAvailable: boolean;
    lessons?: number;
    slug?: string;
    topics: string[];
    isFeatured?: boolean;
  };
  topics?: string[];
  coveredIn?: string;
}

const backendStages: StageData[] = [
  {
    number: "01",
    title: "Web & Programming Fundamentals",
    subtitle: "Core Foundations",
    category: "Prerequisite",
    desc: "Understand execution contexts, networking protocols, asynchronous runtime primitives, and version control.",
    singleNode: {
      name: "Language & Protocol Primitives",
      tag: "Foundation",
      isAvailable: false,
      topics: ["JavaScript (ES2022+)", "TypeScript Strict Mode", "HTTP/1.1 & HTTP/2", "Git Workflows"],
    },
  },
  {
    number: "02",
    title: "Backend Runtime Internals",
    subtitle: "Server Execution Engine",
    category: "Runtime",
    desc: "Master asynchronous non-blocking I/O, the Libuv event loop, streams, and low-level Node.js memory buffers.",
    singleNode: {
      name: "Node.js Core Runtime",
      tag: "Coming Soon",
      isAvailable: false,
      topics: ["Event Loop & Microtasks", "Readable/Writable Streams", "Worker Threads", "Buffer & Crypto"],
    },
  },
  {
    number: "03",
    title: "Backend Frameworks",
    subtitle: "Framework Selection & Architecture",
    category: "Framework Architecture",
    desc: "Choose between minimalist unopinionated middleware pipelines or enterprise Inversion-of-Control architecture.",
    isBranching: true,
    branches: [
      {
        name: "Express.js",
        tag: "Minimalist Pipeline",
        desc: "Lightweight routing, custom middleware stacks, and bare-metal HTTP handling.",
        isAvailable: false,
        topics: ["Middleware Chains", "Router Segments", "Error Handlers"],
      },
      {
        name: "NestJS Elite",
        tag: "Enterprise Architecture",
        desc: "Modular architecture, Dependency Injection, Guards, Interceptors, and microservices.",
        isAvailable: true,
        lessons: 32,
        slug: "nestjs",
        topics: ["Inversion of Control (DI)", "Guards & JWT", "Microservice Transports", "TypeORM & Repositories"],
      },
    ],
  },
  {
    number: "04",
    title: "Databases & Data Persistence",
    subtitle: "Storage Engines & Modeling",
    category: "Persistence",
    desc: "Data modeling, schema design, ACID transactions, relational indexing, and in-memory key-value caching.",
    isBranching: true,
    branches: [
      {
        name: "PostgreSQL",
        tag: "Relational SQL",
        desc: "ACID transactions, complex JOINs, foreign keys, and B-Tree indexing.",
        isAvailable: false,
        topics: ["Relational Schema", "EXPLAIN ANALYZE", "Transactions"],
      },
      {
        name: "MongoDB",
        tag: "Document Store",
        desc: "Flexible schema design, aggregation pipelines, and document embedding.",
        isAvailable: false,
        topics: ["Aggregation", "Document Modeling", "Replica Sets"],
      },
      {
        name: "Redis",
        tag: "In-Memory Cache",
        desc: "High-speed key-value cache, TTL expiration, Pub/Sub channels, and rate limiting.",
        isAvailable: false,
        topics: ["TTL & Eviction", "Pub/Sub Messaging", "Distributed Locks"],
      },
    ],
  },
  {
    number: "05",
    title: "Authentication & API Security",
    subtitle: "Defense & Authorization",
    category: "Security",
    desc: "Stateless JWT verification, refresh token rotation, password hashing, and role-based permissions.",
    singleNode: {
      name: "Auth, Token Systems & RBAC",
      tag: "Covered in NestJS Stage 3",
      isAvailable: true,
      lessons: 32,
      slug: "nestjs",
      topics: ["JWT & Refresh Tokens", "Argon2 / bcrypt Hashing", "Role-Based Guards", "CORS & Helmet Defense"],
      isFeatured: true,
    },
    coveredIn: "NestJS Stage 3 • Security & Auth",
  },
  {
    number: "06",
    title: "Backend Systems Engineering",
    subtitle: "High-Throughput Services",
    category: "Systems",
    desc: "Asynchronous task queues, background workers, bidirectional WebSockets, and distributed caching.",
    singleNode: {
      name: "Queues, Real-Time & Caching",
      tag: "Advanced Engineering",
      isAvailable: false,
      topics: ["BullMQ & Redis Queues", "WebSocket Gateways", "Cache Invalidation", "Jest Unit & E2E Testing"],
    },
  },
  {
    number: "07",
    title: "Distributed Microservices & Scale",
    subtitle: "Enterprise Microservice Patterns",
    category: "Microservices",
    desc: "Decoupled microservice architectures with TCP, Redis, and message broker message transports.",
    singleNode: {
      name: "NestJS Microservice Transports",
      tag: "Covered in NestJS Stage 4",
      isAvailable: true,
      lessons: 32,
      slug: "nestjs",
      topics: ["TCP & Redis Transports", "Event-Driven Messaging", "API Gateway Routing", "Circuit Breakers"],
      isFeatured: true,
    },
    coveredIn: "NestJS Stage 4 • Microservices",
  },
  {
    number: "08",
    title: "Production Deployment & DevOps",
    subtitle: "Containers & CI/CD",
    category: "Production",
    desc: "Multi-stage Docker builds, container networking, health checks, structured logging, and cloud hosting.",
    singleNode: {
      name: "Docker, Compose & Observability",
      tag: "Coming Soon",
      isAvailable: false,
      topics: ["Multi-Stage Dockerfiles", "Docker Compose", "Health Check Endpoints", "Structured JSON Logging"],
    },
  },
  {
    number: "09",
    title: "System Design & Interview Prep",
    subtitle: "Senior Engineering Scenarios",
    category: "Career Capstone",
    desc: "Architectural trade-offs, capacity estimation, concurrency bugs, and senior backend interview problems.",
    singleNode: {
      name: "System Design & Architecture Interviews",
      tag: "Career Capstone",
      isAvailable: false,
      topics: ["Horizontal vs Vertical Scale", "Database Sharding", "Eventual Consistency", "Rate Limiter Design"],
    },
  },
];

const frontendStages: StageData[] = [
  {
    number: "01",
    title: "Web & Protocol Fundamentals",
    subtitle: "Core Foundations",
    category: "Prerequisite",
    desc: "HTML5 semantics, modern CSS layout engines, JavaScript execution, DOM tree, and browser networking.",
    singleNode: {
      name: "Browser & Language Primitives",
      tag: "Foundation",
      isAvailable: false,
      topics: ["HTML5 & Semantics", "CSS Grid & Flexbox", "ES Modules & Async", "DOM Reconciliation"],
    },
  },
  {
    number: "02",
    title: "Strict Static Typing",
    subtitle: "TypeScript for UI",
    category: "Language",
    desc: "TypeScript typing for component props, polymorphic hooks, generics, union discriminating types, and strict mode.",
    singleNode: {
      name: "TypeScript for Modern Frontends",
      tag: "Coming Soon",
      isAvailable: false,
      topics: ["Generics & Constraints", "Discriminated Unions", "React Component Types", "Utility Types"],
    },
  },
  {
    number: "03",
    title: "Component Engine Internals",
    subtitle: "React Fundamentals",
    category: "Core Library",
    desc: "Virtual DOM diffing, component lifecycle, custom hooks, state colocation, and avoiding unnecessary re-renders.",
    singleNode: {
      name: "React Architecture",
      tag: "Coming Soon",
      isAvailable: false,
      topics: ["Custom Hooks", "State Colocation", "useMemo & useCallback", "Context Boundaries"],
    },
  },
  {
    number: "04",
    title: "Full-Stack Web Framework",
    subtitle: "Server Components & Streaming",
    category: "Production Framework",
    desc: "App Router, React Server Components (RSC), granular caching, streaming with Suspense, and edge middleware.",
    singleNode: {
      name: "Next.js 15+ Mastery",
      tag: "Available Now • 20 Lessons",
      isAvailable: true,
      lessons: 20,
      slug: "nextjs",
      topics: ["App Router Segments", "Server Components vs Client", "Streaming & Suspense", "Granular ISR & Revalidation"],
      isFeatured: true,
    },
  },
  {
    number: "05",
    title: "Asynchronous Server State",
    subtitle: "Data Fetching & Caching Engine",
    category: "State Management",
    desc: "Eliminate race conditions with deterministic query keys, mutation rollback handlers, and server state hydration.",
    singleNode: {
      name: "TanStack Query v5",
      tag: "Available Now • 22 Lessons",
      isAvailable: true,
      lessons: 22,
      slug: "tanstack",
      topics: ["Query Keys & Caching", "Optimistic Mutations", "Infinite Pagination", "SSR Hydration"],
      isFeatured: true,
    },
  },
  {
    number: "06",
    title: "Performance, Web Vitals & Edge",
    subtitle: "Production Optimization",
    category: "Production",
    desc: "Core Web Vitals (LCP, CLS, INP), dynamic font & image optimization, bundle analysis, and edge deployment.",
    singleNode: {
      name: "Performance & Edge Optimization",
      tag: "Coming Soon",
      isAvailable: false,
      topics: ["Core Web Vitals", "Dynamic Image Optimization", "Bundle Splitting", "Edge Middleware"],
    },
  },
];

const fullstackStages: StageData[] = [
  {
    number: "01",
    title: "Full-Stack Web Foundations",
    subtitle: "Client & Server Models",
    category: "Prerequisite",
    desc: "Client vs Server execution boundaries, strict TypeScript shared types, HTTP protocols, and Git workflows.",
    singleNode: {
      name: "Universal Web Architecture",
      tag: "Foundation",
      isAvailable: false,
      topics: ["Client vs Server Runtime", "Shared TypeScript Schemas", "HTTP & REST Standards", "Git & CI"],
    },
  },
  {
    number: "02",
    title: "Frontend Layer & Server Components",
    subtitle: "Full-Stack Next.js 15+",
    category: "Frontend & Full-Stack",
    desc: "App Router, React Server Components, Server Actions, granular caching, and streaming interfaces.",
    singleNode: {
      name: "Next.js 15+ App Router",
      tag: "Available Now • 20 Lessons",
      isAvailable: true,
      lessons: 20,
      slug: "nextjs",
      topics: ["Server Actions", "Server Component Boundaries", "Streaming UI", "Edge Middleware"],
      isFeatured: true,
    },
  },
  {
    number: "03",
    title: "Client-Server State Synchronization",
    subtitle: "Asynchronous State Engine",
    category: "State Sync",
    desc: "Deterministic query caching, optimistic UI updates, mutation rollbacks, and server state hydration.",
    singleNode: {
      name: "TanStack Query v5",
      tag: "Available Now • 22 Lessons",
      isAvailable: true,
      lessons: 22,
      slug: "tanstack",
      topics: ["Optimistic UI Updates", "Query Invalidation", "SSR Dehydration", "Infinite Lists"],
      isFeatured: true,
    },
  },
  {
    number: "04",
    title: "Enterprise Backend Architecture",
    subtitle: "Modular Services & APIs",
    category: "Backend Engine",
    desc: "Modular NestJS backend with Dependency Injection, Guards, JWT security, and TypeORM persistence.",
    singleNode: {
      name: "NestJS Elite Architecture",
      tag: "Available Now • 32 Lessons",
      isAvailable: true,
      lessons: 32,
      slug: "nestjs",
      topics: ["Inversion of Control (DI)", "TypeORM & PostgreSQL", "Auth Guards & JWT", "Microservices"],
      isFeatured: true,
    },
  },
  {
    number: "05",
    title: "Databases, Caching & Containerization",
    subtitle: "Production Infrastructure",
    category: "DevOps & Persistence",
    desc: "Relational PostgreSQL database modeling, in-memory Redis caching, and Docker Compose orchestration.",
    singleNode: {
      name: "PostgreSQL, Redis & Docker",
      tag: "Coming Soon",
      isAvailable: false,
      topics: ["Relational Migrations", "Redis Pub/Sub & Cache", "Docker Compose", "Production Health Checks"],
    },
  },
];

export function Roadmap() {
  const [selectedRole, setSelectedRole] = useState<RoleType>("backend");

  const stages =
    selectedRole === "backend"
      ? backendStages
      : selectedRole === "frontend"
      ? frontendStages
      : fullstackStages;

  const roleMeta = {
    backend: {
      title: "Backend Engineering Roadmap",
      subtitle: "Structured roadmap from fundamentals to enterprise microservices.",
      roleSlug: "backend",
      icon: "⚙️",
    },
    frontend: {
      title: "Frontend Engineering Roadmap",
      subtitle: "Modern roadmap from JavaScript to Next.js App Router and TanStack Query.",
      roleSlug: "frontend",
      icon: "🎨",
    },
    fullstack: {
      title: "Full-Stack Engineering Roadmap",
      subtitle: "End-to-end architecture uniting React Server Components, state sync, and backend microservices.",
      roleSlug: "fullstack",
      icon: "🚀",
    },
  }[selectedRole];

  return (
    <section id="roadmap-preview" className="pt-2 pb-16 lg:pt-4 lg:pb-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Visual Roadmap Preview
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {roleMeta.title}
          </h2>

          <p className="text-base sm:text-lg text-gray-400 mt-2 leading-relaxed max-w-2xl mx-auto">
            {roleMeta.subtitle} Inspect learning relationships, framework branches, and available content.
          </p>

          {/* Role Switcher Tabs */}
          <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-xl bg-white/[0.03] border border-white/10 mt-6 gap-1">
            <button
              onClick={() => setSelectedRole("backend")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                selectedRole === "backend"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <RoleIcon role="backend" className="w-4 h-4 text-purple-300" />
              <span>Backend Roadmap</span>
            </button>

            <button
              onClick={() => setSelectedRole("frontend")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                selectedRole === "frontend"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <RoleIcon role="frontend" className="w-4 h-4 text-purple-300" />
              <span>Frontend Roadmap</span>
            </button>

            <button
              onClick={() => setSelectedRole("fullstack")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                selectedRole === "fullstack"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <RoleIcon role="fullstack" className="w-4 h-4 text-purple-300" />
              <span>Full-Stack Roadmap</span>
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            VISUAL ROADMAP FLOWCHART (Nodes, Connectors & Branches)
           ═══════════════════════════════════════════════════════════════ */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {stages.map((stage, idx) => {
              const isLast = idx === stages.length - 1;

              return (
                <div key={stage.number} className="relative">
                  {/* Stage Card Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center text-xs font-black text-purple-400">
                      {stage.number}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base sm:text-lg font-black text-white tracking-tight">
                        {stage.title}
                      </h4>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.05] text-gray-400">
                        {stage.category}
                      </span>
                    </div>
                  </div>

                  {/* Stage Node Container */}
                  {stage.isBranching && stage.branches ? (
                    /* Branching Nodes (Side-by-side on desktop, stacked on mobile) */
                    <div>
                      <div className="text-xs text-gray-400 mb-3 leading-relaxed">
                        {stage.desc}
                      </div>

                      <div className={`grid grid-cols-1 ${stage.branches.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"} gap-4`}>
                        {stage.branches.map((branch) => (
                          <div
                            key={branch.name}
                            className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                              branch.isAvailable
                                ? "bg-purple-500/[0.03] border-purple-500/40 shadow-md shadow-purple-500/5 hover:border-purple-500/60"
                                : "bg-white/[0.02] border-white/10"
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                  {branch.tag}
                                </span>

                                {branch.isAvailable ? (
                                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <span>Available • {branch.lessons} Lessons</span>
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-semibold text-gray-400 px-2 py-0.5 rounded bg-white/[0.05]">
                                    Coming Soon
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2.5 mb-2">
                                <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center p-1 shrink-0">
                                  <TechIcon slug={branch.slug || branch.name} className="w-4 h-4" />
                                </div>
                                <h5 className="text-lg font-bold text-white">
                                  {branch.name}
                                </h5>
                              </div>

                              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                                {branch.desc}
                              </p>

                              {/* Topics - borderless clean chips */}
                              <div className="flex flex-wrap gap-1 mb-4">
                                {branch.topics.map((t) => (
                                  <span
                                    key={t}
                                    className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                                      branch.isAvailable
                                        ? "bg-purple-500/15 text-purple-200 font-semibold"
                                        : "bg-white/[0.05] text-gray-300"
                                    }`}
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Link for available branch */}
                            {branch.isAvailable && branch.slug && (
                              <Link
                                href={`/roadmaps/${branch.slug}`}
                                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-sm"
                              >
                                <span>Explore {branch.name} Roadmap</span>
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : stage.singleNode ? (
                    /* Single Node (Full width) */
                    <div
                      className={`p-6 rounded-2xl border transition-all duration-300 ${
                        stage.singleNode.isAvailable
                          ? "bg-purple-500/[0.03] border-purple-500/40 shadow-md shadow-purple-500/5 hover:border-purple-500/60"
                          : "bg-white/[0.02] border-white/10"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center p-1.5 shrink-0">
                              <TechIcon slug={stage.singleNode.slug || stage.singleNode.name} className="w-5 h-5" />
                            </div>
                            <h5 className="text-base sm:text-lg font-bold text-white">
                              {stage.singleNode.name}
                            </h5>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {stage.desc}
                          </p>
                        </div>

                        {/* Availability Tag */}
                        <div className="self-start sm:self-auto flex items-center gap-2">
                          {stage.singleNode.isAvailable ? (
                            <>
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span>Available • {stage.singleNode.lessons} Lessons</span>
                              </span>

                              {stage.singleNode.slug && (
                                <Link
                                  href={`/roadmaps/${stage.singleNode.slug}`}
                                  className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-purple-500/15 hover:bg-purple-600 text-purple-300 hover:text-white text-xs font-bold transition-colors"
                                >
                                  <span>View Roadmap</span>
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                  </svg>
                                </Link>
                              )}
                            </>
                          ) : (
                            <span className="text-[11px] font-semibold text-gray-400 px-2.5 py-1 rounded-full bg-white/[0.05]">
                              {stage.singleNode.tag}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Topic Chips - borderless clean chips */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/10">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mr-1">
                          Topics:
                        </span>
                        {stage.singleNode.topics.map((topic) => (
                          <span
                            key={topic}
                            className={`px-2.5 py-0.5 rounded text-[11px] font-medium ${
                              stage.singleNode?.isAvailable
                                ? "bg-purple-500/15 text-purple-200 font-semibold"
                                : "bg-white/[0.05] text-gray-300"
                            }`}
                          >
                            {topic}
                          </span>
                        ))}

                        {stage.singleNode.isAvailable && stage.singleNode.slug && (
                          <Link
                            href={`/roadmaps/${stage.singleNode.slug}`}
                            className="sm:hidden text-xs font-bold text-purple-400 ml-auto"
                          >
                            View Roadmap →
                          </Link>
                        )}
                      </div>
                    </div>
                  ) : null}

                  {/* Connecting Arrow between Stages */}
                  {!isLast && (
                    <div className="flex justify-center py-2 relative z-0">
                      <div className="flex flex-col items-center">
                        <div className="w-0.5 h-4 bg-white/10" />
                        <svg
                          className="w-4 h-4 text-purple-400/60 -mt-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Roadmap Action Box */}
          <div className="mt-14 p-8 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
            <h4 className="text-xl font-black text-white mb-2">
              Ready to follow the {roleMeta.title}?
            </h4>
            <p className="text-sm text-gray-400 max-w-lg mx-auto mb-6">
              Track your progress, run code exercises, and follow structured stage milestones on LearnCraft.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href={`/roadmaps/role/${roleMeta.roleSlug}`}
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm transition-all hover:scale-105 shadow-md shadow-purple-600/20 flex items-center gap-2"
              >
                <span>Open Full {selectedRole === "backend" ? "Backend" : selectedRole === "frontend" ? "Frontend" : "Full-Stack"} Flowchart</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                href="/roadmaps"
                className="px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-gray-300 font-bold text-xs sm:text-sm transition-colors border border-white/10"
              >
                Browse All 12+ Roadmaps
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


