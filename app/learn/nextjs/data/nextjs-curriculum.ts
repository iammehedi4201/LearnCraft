/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NEXT.JS CURRICULUM — AUTHORITATIVE DATA LAYER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Clean 5-Stage pedagogical progression from App Router foundations to
 * production-ready full-stack engineering with Server Actions, Prisma,
 * Edge Middleware, Caching, and Docker deployments.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export type ContentTag = "CORE" | "BUILD" | "PROFESSIONAL" | "REFERENCE";

export interface NextjsLessonMeta {
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
  desc: "Build a responsive, multi-page Developer Portfolio and Documentation Engine combining App Router folders, nested layouts, client navigation, dynamic segments, and optimized media.",
  path: "/learn/nextjs/projects/stage-1-portfolio-docs",
  badge: "🛠️ Capstone",
  xpReward: 100,
  estimatedMinutes: 30,
  prerequisites: ["NX-01", "NX-02", "NX-03", "NX-04", "NX-05"],
  skillsTaught: [
    "App Router Folder Hierarchy",
    "Nested & Persistent Layouts",
    "Client Navigation & Active Links",
    "Dynamic Slugs & Static Params",
    "Next.js Image & Font Optimization"
  ],
  stepsCount: 3,
};

export const NEXTJS_STAGE_2_CAPSTONE: NextjsCapstoneProjectMeta = {
  id: "nextjs-capstone-stage-2",
  stageNumber: 2,
  slug: "stage-2-streaming-blog",
  title: "Streaming Tech Blog & Live Feed",
  subtitle: "Stage 2 Capstone Project",
  desc: "Build a content feed using React Server Components, direct database queries, progressive streaming with Suspense skeletons, and error boundaries.",
  path: "/learn/nextjs/projects/stage-2-streaming-blog",
  badge: "🛠️ Capstone",
  xpReward: 120,
  estimatedMinutes: 35,
  prerequisites: ["NX-06", "NX-07", "NX-08", "NX-09"],
  skillsTaught: [
    "Server vs Client Boundaries",
    "Direct Database Access in RSC",
    "React Suspense & Streaming SSR",
    "Segment-level Error Boundaries & 404s"
  ],
  stepsCount: 3,
};

export const NEXTJS_STAGE_3_CAPSTONE: NextjsCapstoneProjectMeta = {
  id: "nextjs-capstone-stage-3",
  stageNumber: 3,
  slug: "stage-3-fullstack-kanban",
  title: "Full-Stack Task Board with Server Actions",
  subtitle: "Stage 3 Capstone Project",
  desc: "Construct a full-stack Kanban task board featuring Server Actions, form state hooks (useActionState, useFormStatus), optimistic updates (useOptimistic), and Zod validation.",
  path: "/learn/nextjs/projects/stage-3-fullstack-kanban",
  badge: "🛠️ Capstone",
  xpReward: 150,
  estimatedMinutes: 40,
  prerequisites: ["NX-10", "NX-11", "NX-12", "NX-13"],
  skillsTaught: [
    "Server Actions ('use server')",
    "Form State & Pending UI",
    "Optimistic UI Rollbacks",
    "Server-side Zod Schema Validation"
  ],
  stepsCount: 3,
};

export const NEXTJS_STAGE_4_CAPSTONE: NextjsCapstoneProjectMeta = {
  id: "nextjs-capstone-stage-4",
  stageNumber: 4,
  slug: "stage-4-ecommerce-catalog",
  title: "High-Performance E-Commerce Engine",
  subtitle: "Stage 4 Capstone Project",
  desc: "Engineer a blazingly fast product catalog leveraging the 4 caching layers, on-demand revalidation (revalidateTag, revalidatePath), and dynamic OpenGraph SEO tags.",
  path: "/learn/nextjs/projects/stage-4-ecommerce-catalog",
  badge: "🛠️ Capstone",
  xpReward: 150,
  estimatedMinutes: 40,
  prerequisites: ["NX-14", "NX-15", "NX-16", "NX-17"],
  skillsTaught: [
    "Static vs Dynamic Route Detection",
    "The 4 Next.js Caching Layers",
    "On-Demand Tag Purging & ISR",
    "Dynamic OpenGraph & Technical SEO"
  ],
  stepsCount: 3,
};

export const NEXTJS_STAGE_5_CAPSTONE: NextjsCapstoneProjectMeta = {
  id: "nextjs-capstone-stage-5",
  stageNumber: 5,
  slug: "stage-5-enterprise-saas",
  title: "Enterprise Multi-Tenant SaaS Platform",
  subtitle: "Stage 5 Capstone Project",
  desc: "Architect a production-grade multi-tenant SaaS application with cookie authentication, Edge Middleware route protection, Stripe webhook API route handlers, and standalone Docker deployment.",
  path: "/learn/nextjs/projects/stage-5-enterprise-saas",
  badge: "🏆 Master Capstone",
  xpReward: 250,
  estimatedMinutes: 50,
  prerequisites: ["NX-18", "NX-19", "NX-20", "NX-21", "NX-22"],
  skillsTaught: [
    "REST Route Handlers & Webhooks",
    "Session Verification & Cookie Auth",
    "Edge Middleware Route Guarding",
    "Server Secret Poisoning Protection",
    "Standalone Docker Containerization"
  ],
  stepsCount: 4,
};

// ─────────────────────────────────────────────────────────────
// 5 PROGRESSIVE CURRICULUM STAGES
// ─────────────────────────────────────────────────────────────

export const NEXTJS_STAGES: NextjsStageMeta[] = [
  {
    id: "stage-1",
    stageNumber: 1,
    name: "App Router & UI Foundations",
    subtitle: "Routing, Layouts, Navigation & Core Media",
    milestone: "Master the App Router filesystem, layout inheritance, navigation, and core media optimization.",
    description: "Understand the core primitives: how folders become URL routes, how layouts persist state, how <Link> prefetches pages, and how to optimize images and typography.",
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
        slug: "nx01-app-router",
        name: "The App Router Architecture",
        desc: "Anatomy of the /app directory, special files (page, layout), and folder conventions.",
        path: "/learn/nextjs/nx01-app-router",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "Basic React & Modern JavaScript",
      },
      {
        code: "NX-02",
        stepNumber: 2,
        slug: "nx02-navigation",
        name: "Client Navigation & <Link>",
        desc: "Instant client-side transitions, route prefetching, active states with usePathname, and searchParams.",
        path: "/learn/nextjs/nx02-navigation",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "NX-01 (App Router Architecture)",
      },
      {
        code: "NX-03",
        stepNumber: 3,
        slug: "nx03-layouts",
        name: "Layouts, Templates & Route Groups",
        desc: "Persistent layouts, state-resetting templates, and organizing routes with (route-groups).",
        path: "/learn/nextjs/nx03-layouts",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "NX-01 (App Router Architecture)",
      },
      {
        code: "NX-04",
        stepNumber: 4,
        slug: "nx04-dynamic-routes",
        name: "Dynamic Segments & Type-Safe Params",
        desc: "Single dynamic segments [id], catch-all [...slug], optional catch-all, and async params.",
        path: "/learn/nextjs/nx04-dynamic-routes",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "NX-02 (Client Navigation)",
      },
      {
        code: "NX-05",
        stepNumber: 5,
        slug: "nx05-images-fonts",
        name: "Core UI Primitives: Images & Fonts",
        desc: "Zero layout-shift images with next/image and automatic self-hosting fonts with next/font.",
        path: "/learn/nextjs/nx05-images-fonts",
        tag: "BUILD",
        estimatedMinutes: 20,
        prerequisite: "NX-01 (App Router Architecture)",
      },
    ],
  },
  {
    id: "stage-2",
    stageNumber: 2,
    name: "Server Components & Data Architecture",
    subtitle: "RSC, Direct Database Fetching, Streaming & Error Boundaries",
    milestone: "Master the server/client mental model, async data access, and progressive streaming.",
    description: "Learn where code runs, how to query databases directly inside Server Components, stream content with Suspense skeletons, and handle errors gracefully.",
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
        slug: "nx06-server-client-components",
        name: "Server vs. Client Components",
        desc: "The RSC paradigm: server rendering, zero client bundle size, and when to use 'use client'.",
        path: "/learn/nextjs/nx06-server-client-components",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "Stage 1 (App Router & UI)",
      },
      {
        code: "NX-07",
        stepNumber: 2,
        slug: "nx07-server-data-fetching",
        name: "Server Data Fetching & Database Queries",
        desc: "Async Server Components, querying Prisma directly, deduping requests, and waterfall prevention.",
        path: "/learn/nextjs/nx07-server-data-fetching",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "NX-06 (Server vs. Client Components)",
      },
      {
        code: "NX-08",
        stepNumber: 3,
        slug: "nx08-streaming-suspense",
        name: "Streaming UI & Suspense Skeletons",
        desc: "Instant loading feedback with loading.tsx, granular React <Suspense>, and streaming SSR.",
        path: "/learn/nextjs/nx08-streaming-suspense",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "NX-07 (Server Data Fetching)",
      },
      {
        code: "NX-09",
        stepNumber: 4,
        slug: "nx09-error-handling",
        name: "Resilient Error Boundaries & 404s",
        desc: "Segment-level error.tsx, recovery with reset(), and custom 404 pages with not-found.tsx.",
        path: "/learn/nextjs/nx09-error-handling",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "NX-06 (Server vs. Client Components)",
      },
    ],
  },
  {
    id: "stage-3",
    stageNumber: 3,
    name: "Full-Stack Mutations & Server Actions",
    subtitle: "Server Actions, Form State, Optimistic UI & Validation",
    milestone: "Build stateful write operations, form submissions, and instant optimistic interfaces.",
    description: "Say goodbye to boilerplate API routes for internal mutations. Master 'use server', form submission state hooks, instant optimistic UI rollbacks, and Zod validation.",
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
        code: "NX-10",
        stepNumber: 1,
        slug: "nx10-server-actions",
        name: "Server Actions Fundamentals",
        desc: "Direct server-side execution with 'use server', form action bindings, and progressive enhancement.",
        path: "/learn/nextjs/nx10-server-actions",
        tag: "CORE",
        estimatedMinutes: 30,
        prerequisite: "Stage 2 (Server Components & Data)",
      },
      {
        code: "NX-11",
        stepNumber: 2,
        slug: "nx11-form-state",
        name: "Form State & Pending UI",
        desc: "Capturing submission state with useActionState and building pending spinners with useFormStatus.",
        path: "/learn/nextjs/nx11-form-state",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "NX-10 (Server Actions Fundamentals)",
      },
      {
        code: "NX-12",
        stepNumber: 3,
        slug: "nx12-optimistic-updates",
        name: "Instant Optimistic UI Updates",
        desc: "Immediate client-side state transitions with useOptimistic and automatic rollback on rejection.",
        path: "/learn/nextjs/nx12-optimistic-updates",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "NX-11 (Form State & Pending UI)",
      },
      {
        code: "NX-13",
        stepNumber: 4,
        slug: "nx13-zod-validation",
        name: "Type-Safe Validation with Zod",
        desc: "Server-side schema validation, structured field error formatting, and type narrowing.",
        path: "/learn/nextjs/nx13-zod-validation",
        tag: "PROFESSIONAL",
        estimatedMinutes: 25,
        prerequisite: "NX-10 (Server Actions Fundamentals)",
      },
    ],
  },
  {
    id: "stage-4",
    stageNumber: 4,
    name: "Rendering, Caching & Performance",
    subtitle: "Static vs Dynamic, 4 Caching Layers & On-Demand Revalidation",
    milestone: "Master the Next.js caching architecture and build ultra-responsive hybrid web apps.",
    description: "Demystify how Next.js pre-renders static HTML vs dynamic on-demand rendering, leverage the 4 caching layers, and purge caches with revalidateTag.",
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
        code: "NX-14",
        stepNumber: 1,
        slug: "nx14-static-dynamic-rendering",
        name: "Static vs. Dynamic Rendering",
        desc: "Build-time HTML generation vs request-time execution, dynamic functions, and route segment configs.",
        path: "/learn/nextjs/nx14-static-dynamic-rendering",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "Stage 2 & Stage 3",
      },
      {
        code: "NX-15",
        stepNumber: 2,
        slug: "nx15-caching-layers",
        name: "The 4 Caching Layers Explained",
        desc: "Request Memoization, Data Cache, Full Route Cache, and Client Router Cache made simple.",
        path: "/learn/nextjs/nx15-caching-layers",
        tag: "PROFESSIONAL",
        estimatedMinutes: 30,
        prerequisite: "NX-14 (Static vs. Dynamic Rendering)",
      },
      {
        code: "NX-16",
        stepNumber: 3,
        slug: "nx16-revalidation",
        name: "On-Demand Revalidation & ISR",
        desc: "Purging stale content instantly with revalidatePath, revalidateTag, and time-based intervals.",
        path: "/learn/nextjs/nx16-revalidation",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "NX-15 (The 4 Caching Layers Explained)",
      },
      {
        code: "NX-17",
        stepNumber: 4,
        slug: "nx17-metadata-seo",
        name: "Metadata, OpenGraph & Technical SEO",
        desc: "Static and dynamic generateMetadata, social media share cards, sitemap.ts, and robots directives.",
        path: "/learn/nextjs/nx17-metadata-seo",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "Stage 1 (App Router & UI)",
      },
    ],
  },
  {
    id: "stage-5",
    stageNumber: 5,
    name: "Security, Auth & Production Edge",
    subtitle: "Auth.js, Edge Middleware, Route Handlers & Docker",
    milestone: "Build enterprise-grade authentication, protect endpoints, and deploy with Docker containers.",
    description: "Complete your full-stack journey: integrate Auth.js sessions, intercept requests with Edge Middleware, build REST webhooks, and containerize with Docker.",
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
        code: "NX-18",
        stepNumber: 1,
        slug: "nx18-route-handlers",
        name: "REST API Route Handlers",
        desc: "When to use /app/api/route.ts: Stripe webhooks, third-party consumers, and binary downloads.",
        path: "/learn/nextjs/nx18-route-handlers",
        tag: "BUILD",
        estimatedMinutes: 25,
        prerequisite: "Stage 3 (Server Actions)",
      },
      {
        code: "NX-19",
        stepNumber: 2,
        slug: "nx19-authentication-sessions",
        name: "Authentication & Session Architecture",
        desc: "Cookie-based authentication, Auth.js patterns, reading session in Server Components, and sign-out.",
        path: "/learn/nextjs/nx19-authentication-sessions",
        tag: "PROFESSIONAL",
        estimatedMinutes: 35,
        prerequisite: "Stage 2 & Stage 3",
      },
      {
        code: "NX-20",
        stepNumber: 3,
        slug: "nx20-edge-middleware",
        name: "Edge Middleware & Route Protection",
        desc: "Pre-routing security gates, cookie verification, redirects, and request header modification.",
        path: "/learn/nextjs/nx20-edge-middleware",
        tag: "PROFESSIONAL",
        estimatedMinutes: 25,
        prerequisite: "NX-19 (Authentication & Session Architecture)",
      },
      {
        code: "NX-21",
        stepNumber: 4,
        slug: "nx21-env-security",
        name: "Environment Variables & Server Isolation",
        desc: "NEXT_PUBLIC_ safety, runtime secrets, and preventing credential leaks with import 'server-only'.",
        path: "/learn/nextjs/nx21-env-security",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "Stage 1 (App Router & UI)",
      },
      {
        code: "NX-22",
        stepNumber: 5,
        slug: "nx22-production-docker",
        name: "Production Builds & Docker Containerization",
        desc: "Build output analysis, standalone Node.js builds, multi-stage Dockerfiles, and cloud deployment.",
        path: "/learn/nextjs/nx22-production-docker",
        tag: "PROFESSIONAL",
        estimatedMinutes: 30,
        prerequisite: "Stage 1 to Stage 5",
      },
    ],
  },
];

export const NEXTJS_PROGRESSION_PHASES: NextjsProgressionPhaseMeta[] = [
  {
    id: "foundations",
    phaseNumber: 1,
    label: "App Router & UI",
    tag: "PHASE 01",
    desc: "Master filesystem routing, layouts, navigation, and media optimization.",
    scope: "Lessons NX-01 → NX-05 + Stage 1 Capstone",
    icon: "layers",
    lessonCodes: ["NX-01", "NX-02", "NX-03", "NX-04", "NX-05"],
  },
  {
    id: "server-data",
    phaseNumber: 2,
    label: "Server Architecture",
    tag: "PHASE 02",
    desc: "Understand Server vs Client Components, async database fetching, and streaming SSR.",
    scope: "Lessons NX-06 → NX-09 + Stage 2 Capstone",
    icon: "server",
    lessonCodes: ["NX-06", "NX-07", "NX-08", "NX-09"],
  },
  {
    id: "mutations",
    phaseNumber: 3,
    label: "Server Actions & Forms",
    tag: "PHASE 03",
    desc: "Build full-stack write operations, optimistic updates, and schema validation.",
    scope: "Lessons NX-10 → NX-13 + Stage 3 Capstone",
    icon: "database",
    lessonCodes: ["NX-10", "NX-11", "NX-12", "NX-13"],
  },
  {
    id: "caching-performance",
    phaseNumber: 4,
    label: "Caching & Revalidation",
    tag: "PHASE 04",
    desc: "Master the 4 caching layers, on-demand revalidation, and technical SEO.",
    scope: "Lessons NX-14 → NX-17 + Stage 4 Capstone",
    icon: "zap",
    lessonCodes: ["NX-14", "NX-15", "NX-16", "NX-17"],
  },
  {
    id: "production-security",
    phaseNumber: 5,
    label: "Auth, Edge & Docker",
    tag: "PHASE 05",
    desc: "Implement sessions, Edge Middleware, REST webhooks, and containerized deployment.",
    scope: "Lessons NX-18 → NX-22 + Master Capstone",
    icon: "shield",
    lessonCodes: ["NX-18", "NX-19", "NX-20", "NX-21", "NX-22"],
  },
];

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
  return getAllNextjsLessons().find(
    (l) =>
      l.slug === slug ||
      l.path.endsWith(`/${slug}`) ||
      l.path.includes(slug),
  );
}

export function getNextjsLessonByCode(code: string): NextjsLessonMeta | undefined {
  return getAllNextjsLessons().find(
    (l) => l.code.toUpperCase() === code.toUpperCase(),
  );
}

export function getNextjsStageByLessonSlug(slug: string): NextjsStageMeta | undefined {
  return NEXTJS_STAGES.find((stage) =>
    stage.lessons.some(
      (l) =>
        l.slug === slug ||
        l.path.endsWith(`/${slug}`) ||
        l.path.includes(slug),
    ),
  );
}

export function getNextNextjsLesson(currentSlug: string): NextjsLessonMeta | null {
  const all = getAllNextjsLessons();
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

export function getPrevNextjsLesson(currentSlug: string): NextjsLessonMeta | null {
  const all = getAllNextjsLessons();
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

export function getNextjsLessonsByPhaseId(phaseId: string): NextjsLessonMeta[] {
  const phase =
    NEXTJS_PROGRESSION_PHASES.find((p) => p.id === phaseId) ||
    NEXTJS_PROGRESSION_PHASES[0];
  const all = getAllNextjsLessons();
  return phase.lessonCodes
    .map((code) => all.find((l) => l.code === code))
    .filter((l): l is NextjsLessonMeta => l !== undefined);
}
