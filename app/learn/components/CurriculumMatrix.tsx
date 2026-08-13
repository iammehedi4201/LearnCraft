"use client";

import { useState } from "react";
import Link from "next/link";

interface ModuleTopic {
  id: string;
  num: string;
  title: string;
  tag: string;
  level: "Foundational" | "Advanced" | "Architecture";
  desc: string;
  href: string;
}

const nextjsModules: ModuleTopic[] = [
  {
    id: "nx01",
    num: "01",
    title: "App Router & File System Conventions",
    tag: "Core Routing",
    level: "Foundational",
    desc: "Understand app folder directory hierarchies, nested routes, page, layout, template, and error boundaries.",
    href: "/learn/nextjs/nx01-app-router",
  },
  {
    id: "nx03",
    num: "03",
    title: "Server vs Client Component Boundaries",
    tag: "Rendering",
    level: "Architecture",
    desc: "Master the RSC graph, serialization rules, client hooks interop, and minimizing client bundle footprint.",
    href: "/learn/nextjs/nx03-server-client",
  },
  {
    id: "nx06",
    num: "06",
    title: "Server-Side Fetching & Parallel Requests",
    tag: "Data Fetching",
    level: "Architecture",
    desc: "Zero-waterfall server requests, request deduping, suspense streaming, and error handling.",
    href: "/learn/nextjs/nx06-server-fetch",
  },
  {
    id: "nx10",
    num: "10",
    title: "Route Handlers & REST Endpoints",
    tag: "API Design",
    level: "Foundational",
    desc: "Build type-safe backend API endpoints directly in Next.js using NextResponse and streaming helpers.",
    href: "/learn/nextjs/nx10-route-handlers",
  },
  {
    id: "nx11",
    num: "11",
    title: "Edge Middleware & Request Interception",
    tag: "Edge Runtime",
    level: "Advanced",
    desc: "Implement geo-routing, header rewriting, cookie validation, and auth guards at the Vercel Edge.",
    href: "/learn/nextjs/nx11-middleware",
  },
  {
    id: "nx18",
    num: "18",
    title: "Caching Layers & Revalidation (ISR)",
    tag: "Performance",
    level: "Architecture",
    desc: "Deep dive into Request Memoization, Data Cache, Full Route Cache, and Router Cache invalidation.",
    href: "/learn/nextjs/nx18-caching",
  },
];

const tanstackModules: ModuleTopic[] = [
  {
    id: "tq02",
    num: "02",
    title: "The useQuery Hook & Lifecycle",
    tag: "Core Query",
    level: "Foundational",
    desc: "Understand the status states (pending, error, success), fetchStatus, and background refetch triggers.",
    href: "/learn/tanstack/tq02-use-query",
  },
  {
    id: "tq04",
    num: "04",
    title: "staleTime vs gcTime Synchronization",
    tag: "Cache Rules",
    level: "Architecture",
    desc: "Eliminate unwanted background network spikes with deterministic cache timing strategies.",
    href: "/learn/tanstack/tq04-staletime-gctime",
  },
  {
    id: "tq07",
    num: "07",
    title: "Mutations & Server State Sync",
    tag: "Mutations",
    level: "Foundational",
    desc: "Execute POST/PUT/DELETE requests with side-effects, cache updates, and rollback handlers.",
    href: "/learn/tanstack/tq07-mutation-basics",
  },
  {
    id: "tq08",
    num: "08",
    title: "Optimistic UI Updates",
    tag: "UX Engineering",
    level: "Advanced",
    desc: "Instant interface feedback with onMutate cache snapshots and automatic onError rollbacks.",
    href: "/learn/tanstack/tq08-optimistic",
  },
  {
    id: "tq09",
    num: "09",
    title: "Deterministic Query Invalidation",
    tag: "Cache Engine",
    level: "Architecture",
    desc: "Targeted queryKey filtering, exact matching, refetchType controls, and multi-query batching.",
    href: "/learn/tanstack/tq09-invalidation",
  },
  {
    id: "tq12",
    num: "12",
    title: "Infinite Queries & Virtualized Lists",
    tag: "Pagination",
    level: "Advanced",
    desc: "Build seamless infinite scroll feeds using useInfiniteQuery with getNextPageParam and windowing.",
    href: "/learn/tanstack/tq12-infinite",
  },
];

const nestjsModules: ModuleTopic[] = [
  {
    id: "nj02",
    num: "02",
    title: "OOP Foundations & Design Patterns",
    tag: "Foundations",
    level: "Foundational",
    desc: "Encapsulation, inheritance, polymorphism, and composition patterns tailored for TypeScript backends.",
    href: "/learn/nestjs/nj02-oop-foundations",
  },
  {
    id: "nj06",
    num: "06",
    title: "Modular Domain Architecture",
    tag: "Architecture",
    level: "Architecture",
    desc: "Feature modules, shared providers, global modules, and dynamic module configuration.",
    href: "/learn/nestjs/nj06-modules",
  },
  {
    id: "nj09",
    num: "09",
    title: "Inversion of Control & Dependency Injection",
    tag: "Core DI",
    level: "Architecture",
    desc: "Understand constructor injection, custom providers (useValue, useClass, useFactory), and scope.",
    href: "/learn/nestjs/nj09-dependency-injection",
  },
  {
    id: "nj12",
    num: "12",
    title: "Guards & Role-Based Access Control",
    tag: "Security",
    level: "Advanced",
    desc: "Execute route authorization with ExecutionContext, Reflector metadata, and JWT bearer strategies.",
    href: "/learn/nestjs/nj12-guards",
  },
  {
    id: "nj13",
    num: "13",
    title: "Interceptors & Response Transformation",
    tag: "AOP",
    level: "Advanced",
    desc: "Aspect-Oriented Programming (AOP), request logging, caching, and RxJS operator pipelines.",
    href: "/learn/nestjs/nj13-interceptors",
  },
  {
    id: "nj21",
    num: "21",
    title: "Microservices & Message Brokers",
    tag: "Distributed",
    level: "Architecture",
    desc: "Scale beyond monolithic APIs using Redis, RabbitMQ, Kafka, and gRPC transport layers.",
    href: "/learn/nestjs/nj21-microservices",
  },
];

export function CurriculumMatrix() {
  const [selectedTrack, setSelectedTrack] = useState<"nextjs" | "tanstack" | "nestjs">("nextjs");

  const getActiveModules = () => {
    switch (selectedTrack) {
      case "nextjs":
        return {
          title: "Next.js 15+ Curriculum Preview",
          total: "20 In-Depth Modules",
          trackHref: "/learn/nextjs",
          badgeColor: "bg-ds-feature-lighter text-ds-feature-dark",
          modules: nextjsModules,
        };
      case "tanstack":
        return {
          title: "TanStack Query v5 Curriculum Preview",
          total: "22 In-Depth Modules",
          trackHref: "/learn/tanstack",
          badgeColor: "bg-ds-info-lighter text-ds-info-dark",
          modules: tanstackModules,
        };
      case "nestjs":
        return {
          title: "NestJS Elite Backend Curriculum Preview",
          total: "27 In-Depth Modules",
          trackHref: "/learn/nestjs",
          badgeColor: "bg-ds-error-lighter text-ds-error-dark",
          modules: nestjsModules,
        };
    }
  };

  const activeData = getActiveModules();

  return (
    <section className="py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-ds-feature-lighter text-ds-feature-dark">
              Module Matrix
            </span>
            <span className="text-xs text-ds-text-soft font-semibold">
              Explore Topics by Framework
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-ds-text-strong font-display">
            Sample Key Modules & Lesson Topics
          </h2>
          <p className="text-sm sm:text-base text-ds-text-sub mt-2">
            Every module includes concise mental models, visual diagrams, code snippets, and in-browser interactive exercises.
          </p>
        </div>

        {/* Track Filter Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm">
          {[
            { id: "nextjs" as const, label: "Next.js 15" },
            { id: "tanstack" as const, label: "TanStack Query" },
            { id: "nestjs" as const, label: "NestJS Elite" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTrack(tab.id)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                selectedTrack === tab.id
                  ? "bg-ds-feature-base text-ds-static-white shadow-sm"
                  : "text-ds-text-sub hover:text-ds-text-strong"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeData.modules.map((mod) => (
          <Link
            key={mod.id}
            href={mod.href}
            className="p-6 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft hover:border-ds-feature-base/40 shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="font-mono text-xs font-bold text-ds-feature-base">
                  Module #{mod.num}
                </span>
                <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                  mod.level === "Architecture"
                    ? "bg-ds-feature-lighter text-ds-feature-dark"
                    : mod.level === "Advanced"
                    ? "bg-ds-info-lighter text-ds-info-dark"
                    : "bg-ds-bg-weak text-ds-text-sub"
                }`}>
                  {mod.level}
                </span>
              </div>

              <h3 className="text-base font-bold text-ds-text-strong group-hover:text-ds-feature-base transition-colors mb-2">
                {mod.title}
              </h3>

              <p className="text-xs text-ds-text-sub leading-relaxed mb-6">
                {mod.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-ds-stroke-soft flex items-center justify-between">
              <span className="text-[11px] font-bold text-ds-text-soft">
                Tag: {mod.tag}
              </span>
              <span className="text-xs font-bold text-ds-feature-base group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                Open Lesson →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Track Jump Link */}
      <div className="mt-8 p-6 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-ds-text-strong">
            {activeData.title}
          </h4>
          <p className="text-xs text-ds-text-sub mt-0.5">
            Explore the complete sequence of all {activeData.total} in this track.
          </p>
        </div>
        <Link
          href={activeData.trackHref}
          className="px-5 py-2.5 bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95 whitespace-nowrap"
        >
          View Full Curriculum Track
        </Link>
      </div>
    </section>
  );
}
