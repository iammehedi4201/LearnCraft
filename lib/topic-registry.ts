/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TOPIC & LESSON REGISTRY
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Universal metadata registry for LearnCraft curriculums.
 * Automatically resolves topic and lesson names from URLs and supports
 * dynamic detection for any future topics.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export interface LessonInfo {
  code: string;
  name: string;
  topicId: string;
  topicTitle: string;
  path: string;
}

// Known topics metadata
export const TOPICS_META: Record<
  string,
  {
    title: string;
    badgeColor: string;
    icon: string;
    description: string;
  }
> = {
  nestjs: {
    title: "NestJS",
    badgeColor: "bg-ds-error-lighter text-ds-error-dark border-ds-error-light",
    icon: "🦁",
    description: "Enterprise Backend Architecture & Microservices",
  },
  nextjs: {
    title: "Next.js",
    badgeColor: "bg-ds-feature-lighter text-ds-feature-dark border-ds-feature-light",
    icon: "⚡",
    description: "Full-Stack App Router, Streaming & Server Components",
  },
  tanstack: {
    title: "TanStack Query",
    badgeColor: "bg-ds-info-lighter text-ds-info-dark border-ds-info-light",
    icon: "🔄",
    description: "Asynchronous Server State Management & Caching",
  },
  typescript: {
    title: "TypeScript",
    badgeColor: "bg-ds-verified-lighter text-ds-verified-dark border-ds-verified-light",
    icon: "🔷",
    description: "Strict Static Typing, Generics & Utility Types",
  },
  javascript: {
    title: "JavaScript",
    badgeColor: "bg-ds-away-lighter text-ds-away-dark border-ds-away-light",
    icon: "💛",
    description: "Core JS Fundamentals, Event Loop & Async",
  },
  oop: {
    title: "OOP",
    badgeColor: "bg-ds-stable-lighter text-ds-stable-dark border-ds-stable-light",
    icon: "🏛️",
    description: "Object-Oriented Design, SOLID & Architecture",
  },
  foundations: {
    title: "Foundations",
    badgeColor: "bg-ds-feature-lighter text-ds-feature-dark border-ds-feature-light",
    icon: "🚀",
    description: "Core Learning Craft Foundations",
  },
};

// Known lessons database map
export const KNOWN_LESSONS: Record<string, { code: string; name: string; topicId: string }> = {
  // NestJS Lessons
  "/learn/nestjs/nj01-typescript-essentials": { code: "NJ-01", name: "TypeScript Essentials", topicId: "nestjs" },
  "/learn/nestjs/nj02-oop-foundations": { code: "NJ-02", name: "OOP Foundations", topicId: "nestjs" },
  "/learn/nestjs/nj03-decorators": { code: "NJ-03", name: "Decorators Deep Dive", topicId: "nestjs" },
  "/learn/nestjs/nj04-solid": { code: "NJ-04", name: "SOLID Principles", topicId: "nestjs" },
  "/learn/nestjs/nj05-setup": { code: "NJ-05", name: "NestJS Setup & CLI", topicId: "nestjs" },
  "/learn/nestjs/nj06-modules": { code: "NJ-06", name: "Modules & Architecture", topicId: "nestjs" },
  "/learn/nestjs/nj07-controllers": { code: "NJ-07", name: "Controllers & Routing", topicId: "nestjs" },
  "/learn/nestjs/nj08-services": { code: "NJ-08", name: "Services & Business Logic", topicId: "nestjs" },
  "/learn/nestjs/nj09-dependency-injection": { code: "NJ-09", name: "Dependency Injection", topicId: "nestjs" },
  "/learn/nestjs/nj10-dto-validation": { code: "NJ-10", name: "DTOs & Validation", topicId: "nestjs" },
  "/learn/nestjs/nj11-pipes": { code: "NJ-11", name: "Pipes & Transformation", topicId: "nestjs" },
  "/learn/nestjs/nj12-guards": { code: "NJ-12", name: "Guards & Authorization", topicId: "nestjs" },
  "/learn/nestjs/nj13-interceptors": { code: "NJ-13", name: "Interceptors & Logging", topicId: "nestjs" },
  "/learn/nestjs/nj14-exception-filters": { code: "NJ-14", name: "Exception Filters", topicId: "nestjs" },
  "/learn/nestjs/nj15-middleware": { code: "NJ-15", name: "Middleware & Request Pipeline", topicId: "nestjs" },
  "/learn/nestjs/nj16-auth-jwt": { code: "NJ-16", name: "Auth & JWT Strategy", topicId: "nestjs" },
  "/learn/nestjs/nj17-database": { code: "NJ-17", name: "Database & Prisma / TypeORM", topicId: "nestjs" },
  "/learn/nestjs/nj18-config": { code: "NJ-18", name: "Configuration Management", topicId: "nestjs" },
  "/learn/nestjs/nj19-testing": { code: "NJ-19", name: "Testing (Unit & E2E)", topicId: "nestjs" },
  "/learn/nestjs/nj20-folder-structure": { code: "NJ-20", name: "Enterprise Folder Structure", topicId: "nestjs" },
  "/learn/nestjs/nj21-microservices": { code: "NJ-21", name: "Microservices & Message Brokers", topicId: "nestjs" },
  "/learn/nestjs/nj22-deployment": { code: "NJ-22", name: "Production Deployment & Docker", topicId: "nestjs" },
  "/learn/nestjs/nj23-swagger": { code: "NJ-23", name: "Swagger & OpenAPI Docs", topicId: "nestjs" },
  "/learn/nestjs/nj24-file-uploads": { code: "NJ-24", name: "File Uploads & S3 Storage", topicId: "nestjs" },
  "/learn/nestjs/nj25-websockets": { code: "NJ-25", name: "WebSockets & Real-time Events", topicId: "nestjs" },
  "/learn/nestjs/nj26-scheduling": { code: "NJ-26", name: "Task Scheduling & Cron Jobs", topicId: "nestjs" },
  "/learn/nestjs/nj27-caching": { code: "NJ-27", name: "Redis Caching & Performance", topicId: "nestjs" },

  // Next.js Lessons
  "/learn/nextjs/nx01-app-router": { code: "NX-01", name: "App Router Fundamentals", topicId: "nextjs" },
  "/learn/nextjs/nx02-routing": { code: "NX-02", name: "File-Based Routing", topicId: "nextjs" },
  "/learn/nextjs/nx03-server-client": { code: "NX-03", name: "Server vs Client Components", topicId: "nextjs" },
  "/learn/nextjs/nx04-layouts": { code: "NX-04", name: "Layouts & Nested Structures", topicId: "nextjs" },
  "/learn/nextjs/nx05-dynamic": { code: "NX-05", name: "Dynamic Routing & Segments", topicId: "nextjs" },
  "/learn/nextjs/nx06-server-fetch": { code: "NX-06", name: "Server-side Data Fetching", topicId: "nextjs" },
  "/learn/nextjs/nx07-client-fetch": { code: "NX-07", name: "Client-side Data Fetching", topicId: "nextjs" },
  "/learn/nextjs/nx08-errors": { code: "NX-08", name: "Error Boundaries & Handling", topicId: "nextjs" },
  "/learn/nextjs/nx09-loading": { code: "NX-09", name: "Streaming & Loading UI", topicId: "nextjs" },
  "/learn/nextjs/nx10-route-handlers": { code: "NX-10", name: "Route Handlers & REST APIs", topicId: "nextjs" },
  "/learn/nextjs/nx11-middleware": { code: "NX-11", name: "Edge Middleware & Auth", topicId: "nextjs" },
  "/learn/nextjs/nx12-metadata": { code: "NX-12", name: "Dynamic SEO & Metadata", topicId: "nextjs" },
  "/learn/nextjs/nx13-images": { code: "NX-13", name: "Image Optimization & Assets", topicId: "nextjs" },
  "/learn/nextjs/nx14-fonts": { code: "NX-14", name: "Font Optimization", topicId: "nextjs" },
  "/learn/nextjs/nx15-scripts": { code: "NX-15", name: "Script Loading Strategies", topicId: "nextjs" },
  "/learn/nextjs/nx16-ssg": { code: "NX-16", name: "Static Site Generation (SSG)", topicId: "nextjs" },
  "/learn/nextjs/nx17-isr": { code: "NX-17", name: "Incremental Static Regeneration (ISR)", topicId: "nextjs" },
  "/learn/nextjs/nx18-caching": { code: "NX-18", name: "Next.js Caching Architecture", topicId: "nextjs" },
  "/learn/nextjs/nx19-env": { code: "NX-19", name: "Environment Variables & Security", topicId: "nextjs" },
  "/learn/nextjs/nx20-deployment": { code: "NX-20", name: "Vercel & Docker Deployment", topicId: "nextjs" },

  // TanStack Query Lessons
  "/learn/tanstack/tq01-setup": { code: "TQ-01", name: "Setup & QueryClient Configuration", topicId: "tanstack" },
  "/learn/tanstack/tq02-use-query": { code: "TQ-02", name: "useQuery Basics & Lifecycle", topicId: "tanstack" },
  "/learn/tanstack/tq03-queries-keys": { code: "TQ-03", name: "Query Keys & Cache Matching", topicId: "tanstack" },
  "/learn/tanstack/tq04-staletime-gctime": { code: "TQ-04", name: "staleTime vs gcTime Deep Dive", topicId: "tanstack" },
  "/learn/tanstack/tq05-dependent": { code: "TQ-05", name: "Dependent & Serial Queries", topicId: "tanstack" },
  "/learn/tanstack/tq06-parallel": { code: "TQ-06", name: "Parallel Queries & useQueries", topicId: "tanstack" },
  "/learn/tanstack/tq07-mutation-basics": { code: "TQ-07", name: "useMutation Fundamentals", topicId: "tanstack" },
  "/learn/tanstack/tq08-optimistic": { code: "TQ-08", name: "Optimistic UI Updates & Rollbacks", topicId: "tanstack" },
  "/learn/tanstack/tq09-invalidation": { code: "TQ-09", name: "Smart Query Invalidation", topicId: "tanstack" },
  "/learn/tanstack/tq10-pagination": { code: "TQ-10", name: "Paginated Queries & Placeholder", topicId: "tanstack" },
  "/learn/tanstack/tq11-placeholder-data": { code: "TQ-11", name: "Placeholder vs Initial Data", topicId: "tanstack" },
  "/learn/tanstack/tq12-infinite": { code: "TQ-12", name: "Infinite Scroll Queries", topicId: "tanstack" },
  "/learn/tanstack/tq13-prefetching": { code: "TQ-13", name: "Hover Prefetching & Route Warmup", topicId: "tanstack" },
  "/learn/tanstack/tq14-select": { code: "TQ-14", name: "Data Transformation with select", topicId: "tanstack" },
  "/learn/tanstack/tq15-enabled": { code: "TQ-15", name: "Conditional Queries with enabled", topicId: "tanstack" },
  "/learn/tanstack/tq16-polling": { code: "TQ-16", name: "Real-time Polling & Intervals", topicId: "tanstack" },
  "/learn/tanstack/tq17-error-handling": { code: "TQ-17", name: "Global Error Handling & Retries", topicId: "tanstack" },
  "/learn/tanstack/tq18-cancellation": { code: "TQ-18", name: "AbortSignal Query Cancellation", topicId: "tanstack" },
  "/learn/tanstack/tq19-mutations": { code: "TQ-19", name: "Complex Mutation Orchestration", topicId: "tanstack" },
  "/learn/tanstack/tq20-custom-hooks": { code: "TQ-20", name: "Reusable Custom Query Hooks", topicId: "tanstack" },
  "/learn/tanstack/tq21-suspense": { code: "TQ-21", name: "React Suspense & useSuspenseQuery", topicId: "tanstack" },
  "/learn/tanstack/tq22-ssr": { code: "TQ-22", name: "SSR Dehydration & Hydration", topicId: "tanstack" },
};

/**
 * Universal resolver to get topic ID, topic title, lesson code and lesson title
 * from any pathname.
 */
export function resolveLessonInfo(pathname: string): LessonInfo {
  // Normalize path
  const cleanPath = pathname.split("?")[0].split("#")[0].replace(/\/+$/, "");

  // Check known lessons map
  if (KNOWN_LESSONS[cleanPath]) {
    const known = KNOWN_LESSONS[cleanPath];
    const topicTitle = TOPICS_META[known.topicId]?.title || formatTitleCase(known.topicId);
    return {
      code: known.code,
      name: known.name,
      topicId: known.topicId,
      topicTitle,
      path: cleanPath,
    };
  }

  // Dynamic heuristic parsing for future / unfamiliar routes
  const segments = cleanPath.split("/").filter(Boolean);
  
  if (segments.length >= 2 && segments[0] === "learn") {
    const rawTopic = segments[1].replace(/^\(|\)$/g, ""); // strip (foundations) grouping
    const rawLesson = segments[2] || segments[1];

    let topicId = rawTopic.toLowerCase();
    let topicTitle = TOPICS_META[topicId]?.title || formatTitleCase(rawTopic);

    // Format lesson name
    let lessonName = formatTitleCase(rawLesson.replace(/^[a-z0-9]+-/i, ""));
    let lessonCode = (rawLesson.match(/^[a-z0-9]+/i)?.[0] || "LC").toUpperCase();

    // Check if lesson title specifically mentions OOP or TypeScript
    if (rawLesson.includes("oop")) {
      topicId = "oop";
      topicTitle = "OOP";
    } else if (rawLesson.includes("typescript")) {
      topicId = "typescript";
      topicTitle = "TypeScript";
    }

    return {
      code: lessonCode,
      name: lessonName || "Lesson",
      topicId,
      topicTitle,
      path: cleanPath,
    };
  }

  return {
    code: "LC",
    name: "General Lesson",
    topicId: "general",
    topicTitle: "LearnCraft",
    path: cleanPath,
  };
}

function formatTitleCase(str: string): string {
  return str
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
