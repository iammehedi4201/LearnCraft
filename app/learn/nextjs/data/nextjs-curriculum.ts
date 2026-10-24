/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NEXT.JS CURRICULUM — AUTHORITATIVE DATA LAYER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Clean 5-Stage pedagogical progression covering the Next.js App Router,
 * Server and Client Components, Server Actions, Route Handlers,
 * Caching, Security, and Debugging.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import type { Course } from "@/components/curriculum/types";

export type ContentTag = "CORE" | "BUILD" | "PROFESSIONAL" | "REFERENCE";

export interface NextjsLessonMeta {
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

export interface NextjsCapstoneProjectMeta {
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

export interface NextjsStageMeta {
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
  lessons: NextjsLessonMeta[];
  capstone?: NextjsCapstoneProjectMeta;
}

export interface NextjsProgressionPhaseMeta {
  id: string;
  phaseNumber: number;
  label: string;
  tag: string;
  desc: string;
  scope: string;
  icon: "layers" | "server" | "zap" | "database" | "shield";
  lessonCodes: string[];
}

// ─────────────────────────────────────────────────────────────
// STAGE CAPSTONES
// ─────────────────────────────────────────────────────────────

export const NEXTJS_STAGE_1_CAPSTONE: NextjsCapstoneProjectMeta = {
  id: "nextjs-capstone-stage-1",
  stageNumber: 1,
  slug: "stage-1-portfolio-docs",
  title: "Developer Portfolio & Docs Hub",
  subtitle: "Stage 1 Capstone Project",
  desc: "Build a responsive, multi-page Developer Portfolio and Documentation Engine combining App Router folders, nested layouts, client navigation, and dynamic route segments.",
  path: "/learn/nextjs/projects/stage-1-portfolio-docs",
  badge: "🛠️ Capstone",
  xpReward: 100,
  estimatedMinutes: 30,
  prerequisites: ["NX-01", "NX-02", "NX-03", "NX-04", "NX-05"],
  skillsTaught: [
    "App Router Folder Hierarchy",
    "Nested & Persistent Layouts",
    "Client Navigation with <Link>",
    "Dynamic Slugs & Route Segments",
    "Root Layout Architecture",
  ],
  stepsCount: 3,
};

export const NEXTJS_STAGE_2_CAPSTONE: NextjsCapstoneProjectMeta = {
  id: "nextjs-capstone-stage-2",
  stageNumber: 2,
  slug: "stage-2-interactive-catalog",
  title: "Interactive Course Catalog",
  subtitle: "Stage 2 Capstone Project",
  desc: "Build a course catalog isolating Server Components for data display and Client Components for interactive favoriting and toggles.",
  path: "/learn/nextjs/projects/stage-2-interactive-catalog",
  badge: "🛠️ Capstone",
  xpReward: 120,
  estimatedMinutes: 35,
  prerequisites: ["NX-06", "NX-07"],
  skillsTaught: [
    "Server vs Client Boundaries",
    "Isolating 'use client' Leaves",
    "Interactive State & Event Handling",
    "Zero-Bundle-Size Server Data Preparation",
  ],
  stepsCount: 3,
};

export const NEXTJS_STAGE_3_CAPSTONE: NextjsCapstoneProjectMeta = {
  id: "nextjs-capstone-stage-3",
  stageNumber: 3,
  slug: "stage-3-streaming-blog",
  title: "Streaming Content Hub with Search & Skeletons",
  subtitle: "Stage 3 Capstone Project",
  desc: "Construct a dynamic content platform with async server data fetching, query searchParams filtering, loading skeletons, and custom 404 boundaries.",
  path: "/learn/nextjs/projects/stage-3-streaming-blog",
  badge: "🛠️ Capstone",
  xpReward: 150,
  estimatedMinutes: 40,
  prerequisites: ["NX-08", "NX-09", "NX-10", "NX-11"],
  skillsTaught: [
    "Async Server Data Fetching",
    "Bookmarkable searchParams Filtering",
    "Streaming UI with loading.tsx",
    "Segment-level 404s with notFound() and error.tsx",
  ],
  stepsCount: 3,
};

export const NEXTJS_STAGE_4_CAPSTONE: NextjsCapstoneProjectMeta = {
  id: "nextjs-capstone-stage-4",
  stageNumber: 4,
  slug: "stage-4-fullstack-mutations",
  title: "Full-Stack Task Board with Server Actions & API",
  subtitle: "Stage 4 Capstone Project",
  desc: "Engineer a full-stack mutation engine leveraging Server Actions, REST route handlers, and on-demand cache revalidation.",
  path: "/learn/nextjs/projects/stage-4-fullstack-mutations",
  badge: "🛠️ Capstone",
  xpReward: 150,
  estimatedMinutes: 40,
  prerequisites: ["NX-12", "NX-13", "NX-14"],
  skillsTaught: [
    "Server Actions ('use server')",
    "Form Mutation & Permission Checks",
    "REST Route Handlers in route.ts",
    "On-Demand Cache Purging with revalidatePath",
  ],
  stepsCount: 3,
};

export const NEXTJS_STAGE_5_CAPSTONE: NextjsCapstoneProjectMeta = {
  id: "nextjs-capstone-stage-5",
  stageNumber: 5,
  slug: "stage-5-enterprise-saas",
  title: "Production Next.js Application Architecture",
  subtitle: "Stage 5 Capstone Project",
  desc: "Architect a secure, production-grade Next.js application with SEO metadata, optimized media, server secrets isolation, authorization guards, input validation, and debugging resilience.",
  path: "/learn/nextjs/projects/stage-5-enterprise-saas",
  badge: "🏆 Master Capstone",
  xpReward: 250,
  estimatedMinutes: 50,
  prerequisites: ["NX-15", "NX-16", "NX-17", "NX-18", "NX-19", "NX-20", "NX-21"],
  skillsTaught: [
    "Page Metadata & SEO Cards",
    "next/image Media Optimization",
    "Environment Secrets & NEXT_PUBLIC_ Safety",
    "Authentication vs Authorization Enforcement",
    "Server-Side Input Validation",
    "App Router Debugging Checklist",
    "Website Performance Optimization & Core Web Vitals",
  ],
  stepsCount: 4,
};

// ─────────────────────────────────────────────────────────────
// 5 PROGRESSIVE CURRICULUM STAGES (20 AUTHORITATIVE LESSONS)
// ─────────────────────────────────────────────────────────────

export const NEXTJS_STAGES: NextjsStageMeta[] = [
  {
    id: "stage-1",
    stageNumber: 1,
    name: "The Next.js Basics",
    subtitle: "Framework Foundations, Routes, Layouts & Links",
    milestone: "Master the App Router filesystem, layout inheritance, and client-side navigation.",
    description: "Understand the core primitives: how Next.js extends React, how folders become URLs, how layouts persist UI, and how to navigate with Link.",
    theme: {
      badge: "bg-ds-success-lighter text-ds-success-dark border-ds-stroke-soft",
      dot: "bg-ds-success-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-success-dark",
    },
    capstone: NEXTJS_STAGE_1_CAPSTONE,
    lessons: [
      {
        code: "NX-01",
        stepNumber: 1,
        slug: "nx01-what-is-nextjs",
        name: "What Is Next.js?",
        desc: "Next.js is a full-stack React framework that adds routing, server rendering, and data loading.",
        path: "/learn/nextjs/nx01-what-is-nextjs",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 15,
        prerequisite: "React Basics",
      },
      {
        code: "NX-02",
        stepNumber: 2,
        slug: "nx02-app-folder-and-routes",
        name: "The app Folder and Routes",
        desc: "In the App Router, folders inside app help define URLs, and page.tsx makes that route a page.",
        path: "/learn/nextjs/nx02-app-folder-and-routes",
        tag: "CORE",
        difficulty: "Easy",
        estimatedMinutes: 15,
        prerequisite: "NX-01 (What Is Next.js?)",
      },
      {
        code: "NX-03",
        stepNumber: 3,
        slug: "nx03-pages-and-layouts",
        name: "Pages and Layouts",
        desc: "Layouts share persistent navigation, headers, and footers across multiple pages without re-rendering.",
        path: "/learn/nextjs/nx03-pages-and-layouts",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NX-02 (The app Folder and Routes)",
      },
      {
        code: "NX-04",
        stepNumber: 4,
        slug: "nx04-moving-between-pages-with-link",
        name: "Moving Between Pages with Link",
        desc: "Use Next.js Link for instant client-side transitions and background route prefetching.",
        path: "/learn/nextjs/nx04-moving-between-pages-with-link",
        tag: "CORE",
        difficulty: "Easy",
        estimatedMinutes: 15,
        prerequisite: "NX-03 (Pages and Layouts)",
      },
      {
        code: "NX-05",
        stepNumber: 5,
        slug: "nx05-dynamic-routes",
        name: "Dynamic Routes",
        desc: "Dynamic segments like [courseId] let one page show different content based on URL parameters.",
        path: "/learn/nextjs/nx05-dynamic-routes",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NX-04 (Moving Between Pages with Link)",
      },
    ],
  },
  {
    id: "stage-2",
    stageNumber: 2,
    name: "Server and Client Components",
    subtitle: "The RSC Paradigm, 'use client' & Interactive State",
    milestone: "Understand the boundary between server data preparation and client interactivity.",
    description: "Learn when to run components on the server vs the browser, how to isolate interactive islands, and how React state drives client events.",
    theme: {
      badge: "bg-ds-info-lighter text-ds-info-dark border-ds-stroke-soft",
      dot: "bg-ds-info-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-info-dark",
    },
    capstone: NEXTJS_STAGE_2_CAPSTONE,
    lessons: [
      {
        code: "NX-06",
        stepNumber: 1,
        slug: "nx06-server-and-client-components",
        name: "Server Components and Client Components",
        desc: "Server Components prepare content on the server; Client Components handle interactive user gestures.",
        path: "/learn/nextjs/nx06-server-and-client-components",
        tag: "CORE",
        difficulty: "Difficult",
        estimatedMinutes: 25,
        prerequisite: "Stage 1 (The Next.js Basics)",
      },
      {
        code: "NX-07",
        stepNumber: 2,
        slug: "nx07-client-side-interaction",
        name: "Client-Side Interaction with State and Events",
        desc: "Use Client Components with React useState and event handlers to build responsive user interfaces.",
        path: "/learn/nextjs/nx07-client-side-interaction",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NX-06 (Server and Client Components)",
      },
    ],
  },
  {
    id: "stage-3",
    stageNumber: 3,
    name: "Loading and Showing Data",
    subtitle: "Async Data Fetching, URL Parameters, Loading UI & Error Handling",
    milestone: "Fetch data on the server and build resilient loading and error boundaries.",
    description: "Master async server fetch, extract searchParams from URLs, stream loading skeletons with loading.tsx, and handle missing pages with notFound().",
    theme: {
      badge: "bg-ds-feature-lighter text-ds-feature-dark border-ds-stroke-soft",
      dot: "bg-ds-feature-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-feature-dark",
    },
    capstone: NEXTJS_STAGE_3_CAPSTONE,
    lessons: [
      {
        code: "NX-08",
        stepNumber: 1,
        slug: "nx08-fetching-data-server-component",
        name: "Fetching Data in a Server Component",
        desc: "Async Server Components can await fetch requests directly without hooks or waterfalls.",
        path: "/learn/nextjs/nx08-fetching-data-server-component",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "Stage 2 (Server and Client Components)",
      },
      {
        code: "NX-09",
        stepNumber: 2,
        slug: "nx09-url-and-search-parameters",
        name: "URL Parameters and Search Parameters",
        desc: "Extract query parameters from searchParams to drive filters, sorting, and bookmarkable URLs.",
        path: "/learn/nextjs/nx09-url-and-search-parameters",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NX-08 (Fetching Data in a Server Component)",
      },
      {
        code: "NX-10",
        stepNumber: 3,
        slug: "nx10-loading-ui",
        name: "Loading UI",
        desc: "Use loading.tsx and React Suspense boundaries to stream instant visual feedback while pages load.",
        path: "/learn/nextjs/nx10-loading-ui",
        tag: "BUILD",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NX-08 (Fetching Data in a Server Component)",
      },
      {
        code: "NX-11",
        stepNumber: 4,
        slug: "nx11-missing-pages-and-errors",
        name: "Handling Missing Pages and Errors",
        desc: "Respond to missing records with notFound() and catch runtime crashes with error.tsx boundaries.",
        path: "/learn/nextjs/nx11-missing-pages-and-errors",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NX-08 (Fetching Data in a Server Component)",
      },
    ],
  },
  {
    id: "stage-4",
    stageNumber: 4,
    name: "Changing Data and Building Endpoints",
    subtitle: "Forms, Server Actions, Route Handlers & Cache Revalidation",
    milestone: "Execute secure server mutations, expose HTTP endpoints, and revalidate cached data.",
    description: "Process form mutations with Server Actions, build custom REST APIs with route.ts, and refresh stale pages on-demand using revalidatePath.",
    theme: {
      badge: "bg-ds-away-lighter text-ds-away-dark border-ds-stroke-soft",
      dot: "bg-ds-away-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-away-dark",
    },
    capstone: NEXTJS_STAGE_4_CAPSTONE,
    lessons: [
      {
        code: "NX-12",
        stepNumber: 1,
        slug: "nx12-forms-and-server-actions",
        name: "Forms and Server Actions",
        desc: "Process form submissions directly on the server with 'use server' actions and permission checks.",
        path: "/learn/nextjs/nx12-forms-and-server-actions",
        tag: "CORE",
        difficulty: "Difficult",
        estimatedMinutes: 25,
        prerequisite: "Stage 3 (Loading and Showing Data)",
      },
      {
        code: "NX-13",
        stepNumber: 2,
        slug: "nx13-route-handlers",
        name: "Route Handlers",
        desc: "Define custom HTTP REST API endpoints in route.ts for external webhooks and mobile clients.",
        path: "/learn/nextjs/nx13-route-handlers",
        tag: "BUILD",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NX-12 (Forms and Server Actions)",
      },
      {
        code: "NX-14",
        stepNumber: 3,
        slug: "nx14-revalidating-data",
        name: "Caching and Revalidating Data",
        desc: "Cache public server data with 'use cache' and purge stale copies on demand with revalidatePath, revalidateTag, and updateTag.",
        path: "/learn/nextjs/nx14-revalidating-data",
        tag: "BUILD",
        difficulty: "Difficult",
        estimatedMinutes: 25,
        prerequisite: "NX-12 (Forms and Server Actions)",
      },
    ],
  },
  {
    id: "stage-5",
    stageNumber: 5,
    name: "Performance Optimization and Safety",
    subtitle: "Performance, Metadata, Media Optimization, Security, Validation & Debugging",
    milestone: "Optimize performance metrics, secure configuration, enforce authorization permissions, and debug App Router problems.",
    description: "Diagnose Core Web Vitals, optimize media, set SEO metadata, isolate server secrets, distinguish authentication from authorization, validate user inputs, and resolve runtime errors.",
    theme: {
      badge: "bg-ds-highlighted-lighter text-ds-highlighted-dark border-ds-stroke-soft",
      dot: "bg-ds-highlighted-base",
      border: "border-ds-stroke-soft",
      bgSubtle: "bg-ds-bg-weak",
      textAccent: "text-ds-highlighted-dark",
    },
    capstone: NEXTJS_STAGE_5_CAPSTONE,
    lessons: [
      {
        code: "NX-15",
        stepNumber: 1,
        slug: "nx15-page-titles-and-metadata",
        name: "Page Titles and Metadata",
        desc: "Configure browser tab titles, descriptions, and SEO preview tags with static and dynamic metadata.",
        path: "/learn/nextjs/nx15-page-titles-and-metadata",
        tag: "BUILD",
        difficulty: "Easy",
        estimatedMinutes: 15,
        prerequisite: "Stage 1 (The Next.js Basics)",
      },
      {
        code: "NX-16",
        stepNumber: 2,
        slug: "nx16-images-and-static-files",
        name: "Images and Static Files",
        desc: "Serve static assets from the public folder and optimize visuals using the next/image component.",
        path: "/learn/nextjs/nx16-images-and-static-files",
        tag: "BUILD",
        difficulty: "Easy",
        estimatedMinutes: 15,
        prerequisite: "Stage 1 (The Next.js Basics)",
      },
      {
        code: "NX-17",
        stepNumber: 3,
        slug: "nx17-environment-variables-and-secrets",
        name: "Environment Variables and Secrets",
        desc: "Manage private API keys on the server and understand the NEXT_PUBLIC_ client exposure prefix.",
        path: "/learn/nextjs/nx17-environment-variables-and-secrets",
        tag: "CORE",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "Stage 1 (The Next.js Basics)",
      },
      {
        code: "NX-18",
        stepNumber: 4,
        slug: "nx18-authentication-and-authorization",
        name: "Authentication and Authorization",
        desc: "Understand the vital security distinction between identifying a user and verifying their permissions.",
        path: "/learn/nextjs/nx18-authentication-and-authorization",
        tag: "PROFESSIONAL",
        difficulty: "Difficult",
        estimatedMinutes: 25,
        prerequisite: "NX-12 (Forms and Server Actions)",
      },
      {
        code: "NX-19",
        stepNumber: 5,
        slug: "nx19-validating-user-input",
        name: "Validating User Input",
        desc: "Validate all form data on the server before mutating databases to prevent corrupted state and exploits.",
        path: "/learn/nextjs/nx19-validating-user-input",
        tag: "PROFESSIONAL",
        difficulty: "Moderate",
        estimatedMinutes: 20,
        prerequisite: "NX-12 (Forms and Server Actions)",
      },
      {
        code: "NX-20",
        stepNumber: 6,
        slug: "nx20-debugging-nextjs-problems",
        name: "Debugging Next.js Problems",
        desc: "Systematically isolate, diagnose, and resolve common Next.js App Router errors with a practical checklist.",
        path: "/learn/nextjs/nx20-debugging-nextjs-problems",
        tag: "PROFESSIONAL",
        difficulty: "Moderate",
        estimatedMinutes: 25,
        prerequisite: "Stages 1 through 5",
      },
      {
        code: "NX-21",
        stepNumber: 7,
        slug: "nx21-website-performance-optimization",
        name: "Website Performance Optimization",
        desc: "Diagnose Core Web Vitals, eliminate waterfalls, optimize media with next/image, and enforce server-side database pagination.",
        path: "/learn/nextjs/nx21-website-performance-optimization",
        tag: "PROFESSIONAL",
        difficulty: "Difficult",
        estimatedMinutes: 25,
        prerequisite: "NX-16 (Images and Static Files) & NX-20 (Debugging Next.js Problems)",
      },
    ],
  },
];

export const NEXTJS_PROGRESSION_PHASES: NextjsProgressionPhaseMeta[] = [
  {
    id: "foundations",
    phaseNumber: 1,
    label: "The Next.js Basics",
    tag: "PHASE 01",
    desc: "Master filesystem routing, layouts, Link navigation, and dynamic segments.",
    scope: "Lessons NX-01 → NX-05 + Stage 1 Capstone",
    icon: "layers",
    lessonCodes: ["NX-01", "NX-02", "NX-03", "NX-04", "NX-05"],
  },
  {
    id: "server-client",
    phaseNumber: 2,
    label: "Server and Client Components",
    tag: "PHASE 02",
    desc: "Understand the RSC paradigm, 'use client' boundaries, and interactive state.",
    scope: "Lessons NX-06 → NX-07 + Stage 2 Capstone",
    icon: "server",
    lessonCodes: ["NX-06", "NX-07"],
  },
  {
    id: "loading-data",
    phaseNumber: 3,
    label: "Loading and Showing Data",
    tag: "PHASE 03",
    desc: "Build async data fetching, URL parameters, loading skeletons, and error boundaries.",
    scope: "Lessons NX-08 → NX-11 + Stage 3 Capstone",
    icon: "zap",
    lessonCodes: ["NX-08", "NX-09", "NX-10", "NX-11"],
  },
  {
    id: "mutations-endpoints",
    phaseNumber: 4,
    label: "Changing Data & Endpoints",
    tag: "PHASE 04",
    desc: "Execute Server Actions, expose REST route handlers, and revalidate cached pages.",
    scope: "Lessons NX-12 → NX-14 + Stage 4 Capstone",
    icon: "database",
    lessonCodes: ["NX-12", "NX-13", "NX-14"],
  },
  {
    id: "details-safety",
    phaseNumber: 5,
    label: "Performance Optimization",
    tag: "PHASE 05",
    desc: "Configure metadata, optimize media, isolate secrets, enforce authorization, validate inputs, debug errors, and optimize website performance.",
    scope: "Lessons NX-15 → NX-21 + Master Capstone",
    icon: "shield",
    lessonCodes: ["NX-15", "NX-16", "NX-17", "NX-18", "NX-19", "NX-20", "NX-21"],
  },
];

// ─────────────────────────────────────────────────────────────
// BACKWARD-COMPATIBLE LEGACY SLUG MAP
// ─────────────────────────────────────────────────────────────

export const NEXTJS_LEGACY_SLUG_MAP: Record<string, string> = {
  "nx21-performance-optimization": "nx21-website-performance-optimization",
  "nx01-app-router": "nx01-what-is-nextjs",
  "nx02-navigation": "nx04-moving-between-pages-with-link",
  "nx02-routing": "nx02-app-folder-and-routes",
  "nx03-layouts": "nx03-pages-and-layouts",
  "nx03-server-client": "nx06-server-and-client-components",
  "nx04-dynamic-routes": "nx05-dynamic-routes",
  "nx04-layouts": "nx03-pages-and-layouts",
  "nx05-dynamic": "nx05-dynamic-routes",
  "nx05-images-fonts": "nx16-images-and-static-files",
  "nx06-server-client-components": "nx06-server-and-client-components",
  "nx06-server-fetch": "nx08-fetching-data-server-component",
  "nx07-server-data-fetching": "nx08-fetching-data-server-component",
  "nx07-client-fetch": "nx07-client-side-interaction",
  "nx08-streaming-suspense": "nx10-loading-ui",
  "nx08-errors": "nx11-missing-pages-and-errors",
  "nx09-error-handling": "nx11-missing-pages-and-errors",
  "nx09-loading": "nx10-loading-ui",
  "nx10-server-actions": "nx12-forms-and-server-actions",
  "nx10-route-handlers": "nx13-route-handlers",
  "nx11-form-state": "nx12-forms-and-server-actions",
  "nx11-middleware": "nx18-authentication-and-authorization",
  "nx12-optimistic-updates": "nx12-forms-and-server-actions",
  "nx12-metadata": "nx15-page-titles-and-metadata",
  "nx13-zod-validation": "nx19-validating-user-input",
  "nx13-images": "nx16-images-and-static-files",
  "nx14-static-dynamic-rendering": "nx06-server-and-client-components",
  "nx14-fonts": "nx16-images-and-static-files",
  "nx15-caching-layers": "nx14-revalidating-data",
  "nx15-scripts": "nx16-images-and-static-files",
  "nx16-revalidation": "nx14-revalidating-data",
  "nx16-ssg": "nx14-revalidating-data",
  "nx17-metadata-seo": "nx15-page-titles-and-metadata",
  "nx17-isr": "nx14-revalidating-data",
  "nx18-route-handlers": "nx13-route-handlers",
  "nx18-caching": "nx14-revalidating-data",
  "nx19-authentication-sessions": "nx18-authentication-and-authorization",
  "nx19-env": "nx17-environment-variables-and-secrets",
  "nx20-edge-middleware": "nx18-authentication-and-authorization",
  "nx20-deployment": "nx20-debugging-nextjs-problems",
  "nx21-env-security": "nx17-environment-variables-and-secrets",
  "nx22-production-docker": "nx20-debugging-nextjs-problems",
};

// ─────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────

export function getAllNextjsLessons(): NextjsLessonMeta[] {
  return NEXTJS_STAGES.flatMap((stage) => stage.lessons);
}

export function getNextjsStages(): NextjsStageMeta[] {
  return NEXTJS_STAGES;
}

export function getNextjsLessonBySlug(slug: string): NextjsLessonMeta | undefined {
  if (!slug) return undefined;
  const raw = slug.toLowerCase().trim();
  const resolvedSlug = NEXTJS_LEGACY_SLUG_MAP[raw] || raw;

  return getAllNextjsLessons().find(
    (l) =>
      l.slug.toLowerCase() === resolvedSlug ||
      l.slug.toLowerCase() === raw ||
      l.code.toLowerCase() === raw ||
      l.code.toLowerCase().replace("-", "") === raw ||
      l.path.endsWith(`/${resolvedSlug}`) ||
      l.path.endsWith(`/${raw}`),
  );
}

export function getNextjsLessonByCode(code: string): NextjsLessonMeta | undefined {
  return getAllNextjsLessons().find(
    (l) => l.code.toUpperCase() === code.toUpperCase(),
  );
}

export function getNextjsStageByLessonSlug(slug: string): NextjsStageMeta | undefined {
  const lesson = getNextjsLessonBySlug(slug);
  if (!lesson) return undefined;
  return NEXTJS_STAGES.find((stage) =>
    stage.lessons.some((l) => l.slug === lesson.slug),
  );
}

export function getNextNextjsLesson(currentSlug: string): NextjsLessonMeta | null {
  const all = getAllNextjsLessons();
  const current = getNextjsLessonBySlug(currentSlug);
  if (!current) return null;
  const index = all.findIndex((l) => l.slug === current.slug);
  if (index >= 0 && index < all.length - 1) {
    return all[index + 1];
  }
  return null;
}

export function getPrevNextjsLesson(currentSlug: string): NextjsLessonMeta | null {
  const all = getAllNextjsLessons();
  const current = getNextjsLessonBySlug(currentSlug);
  if (!current) return null;
  const index = all.findIndex((l) => l.slug === current.slug);
  if (index > 0) {
    return all[index - 1];
  }
  return null;
}

export function getNextjsLessonsByPhaseId(phaseId: string): NextjsLessonMeta[] {
  const phase =
    NEXTJS_PROGRESSION_PHASES.find((p) => p.id === phaseId) ||
    NEXTJS_PROGRESSION_PHASES[0];
  const all = getAllNextjsLessons();
  return phase.lessonCodes
    .map((code) => all.find((l) => l.code === code))
    .filter((l): l is NextjsLessonMeta => l !== undefined);
}

export interface NextjsPrerequisiteTopicMeta {
  id: string;
  title: string;
  desc: string;
  tag: string;
  badge: string;
  path: string;
  level?: string;
}

export interface NextjsRelatedTopicMeta {
  id: string;
  title: string;
  desc: string;
  badge: string;
  path: string;
}

export const NEXTJS_PREREQUISITES: NextjsPrerequisiteTopicMeta[] = [
  {
    id: "prereq-react",
    title: "React Fundamentals & JSX",
    desc: "Components, props, useState, useEffect, JSX syntax, and standard DOM event handling.",
    tag: "Required Foundation",
    badge: "React",
    path: "/roadmaps?category=framework#skill-roadmaps",
    level: "Beginner → Intermediate",
  },
  {
    id: "prereq-ts",
    title: "TypeScript Essentials",
    desc: "Basic types, interfaces, generics, and type annotations for React components and props.",
    tag: "Recommended",
    badge: "TS",
    path: "/learn/typescript",
    level: "Beginner",
  },
];

export const NEXTJS_CAPSTONE: NextjsCapstoneProjectMeta = NEXTJS_STAGE_5_CAPSTONE;

export const NEXTJS_RELATED_TOPICS: NextjsRelatedTopicMeta[] = [
  {
    id: "rel-ts",
    title: "TypeScript",
    desc: "Static typing mental models, generics, and compiler configuration.",
    badge: "Language",
    path: "/learn/typescript",
  },
  {
    id: "rel-tanstack",
    title: "TanStack Query",
    desc: "Asynchronous server state management and optimistic caching.",
    badge: "Frontend",
    path: "/learn/tanstack",
  },
  {
    id: "rel-nestjs",
    title: "NestJS",
    desc: "Enterprise Node.js backend with dependency injection and modules.",
    badge: "Backend",
    path: "/learn/nestjs",
  },
  {
    id: "rel-oop",
    title: "TypeScript OOP",
    desc: "Object-oriented architecture and design patterns in TypeScript.",
    badge: "Architecture",
    path: "/learn/typescript",
  },
];

export function getNextjsCourse(): Course {
  const allLessons = getAllNextjsLessons();
  return {
    id: "nextjs",
    title: "Learn Next.js",
    prerequisites: {
      items: [
        "React fundamentals: components, JSX, props, and useState",
        "Modern JavaScript: async/await, ES modules, and destructuring",
        "Basic TypeScript types and component props typing",
      ],
      refresherHref: "/roadmaps?category=framework#skill-roadmaps",
      refresherLabel: "Need a refresher? Open the React Fundamentals guide",
    },
    capstone: {
      title: NEXTJS_CAPSTONE.title,
      description:
        "Your finish line: architect a production-grade application with SEO metadata, optimized media, server secrets isolation, authorization guards, and input validation.",
      href: NEXTJS_CAPSTONE.path,
    },
    phases: NEXTJS_PROGRESSION_PHASES.map((phase) => ({
      id: phase.id,
      name: phase.label,
      summary: phase.desc,
      lessons: phase.lessonCodes
        .map((code) => allLessons.find((l) => l.code === code))
        .filter((l): l is NextjsLessonMeta => l !== undefined)
        .map((l) => ({
          id: l.slug,
          code: l.code,
          title: l.name,
          description: l.desc,
          minutes: l.estimatedMinutes,
          requires: l.prerequisite,
          href: l.path,
          aliases: Object.entries(NEXTJS_LEGACY_SLUG_MAP)
            .filter(([_, canonical]) => canonical === l.slug)
            .map(([legacy]) => legacy),
        })),
    })),
  };
}
