/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ROADMAP DATA LAYER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Central data model for the LearnCraft roadmap system.
 * Reuses NestJS curriculum as single source of truth.
 * Defines equivalent structures for Next.js and TanStack inline.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { NESTJS_STAGES } from "@/app/learn/nestjs/data/nestjs-curriculum";
import { NEXTJS_STAGES } from "@/app/learn/nextjs/data/nextjs-curriculum";
import { TYPESCRIPT_STAGES } from "@/app/learn/typescript/data/typescript-curriculum";
import { OOP_STAGES } from "@/app/learn/oop/data/oop-curriculum";
import { JS_STAGES } from "@/app/learn/javascript/data/javascript-curriculum";
import { REACT_STAGES } from "@/app/learn/react/data/react-curriculum";
import { NODEJS_STAGES } from "@/app/learn/nodejs/data/nodejs-curriculum";
import { EXPRESS_STAGES } from "@/app/learn/express/data/express-curriculum";
import { MONGODB_STAGES } from "@/app/learn/mongodb/data/mongodb-curriculum";
import { POSTGRESQL_STAGES } from "@/app/learn/postgresql/data/postgresql-curriculum";



// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export type SkillStatus = "available" | "coming-soon";
export type SkillCategory = "frontend" | "backend" | "database" | "devops" | "architecture" | "language";
export type SkillLevel = "beginner" | "intermediate" | "advanced" | "beginner-advanced";

export interface RoadmapLesson {
  code: string;
  name: string;
  slug: string;
  path: string;
  desc: string;
  estimatedMinutes?: number;
}

export interface RoadmapStage {
  id: string;
  stageNumber: number;
  name: string;
  subtitle: string;
  description: string;
  lessons: RoadmapLesson[];
}

export interface SkillRoadmap {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: SkillCategory;
  level: SkillLevel;
  status: SkillStatus;
  totalLessons: number;
  stages: RoadmapStage[];
  /** The base route for this skill's existing content pages */
  learnPath: string;
  badgeColor: string;
}

export interface RoleRoadmapStep {
  skillSlug: string;
  skillTitle: string;
  required: boolean;
  alternatives?: string[];
}

export interface RoleRoadmap {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  steps: RoleRoadmapStep[];
}

// ─────────────────────────────────────────────────────────────
// NestJS — derived from existing curriculum data
// ─────────────────────────────────────────────────────────────

const nestjsStages: RoadmapStage[] = NESTJS_STAGES.map((stage) => ({
  id: stage.id,
  stageNumber: stage.stageNumber,
  name: stage.name,
  subtitle: stage.subtitle,
  description: stage.description,
  lessons: stage.lessons.map((lesson) => ({
    code: lesson.code,
    name: lesson.name,
    slug: lesson.slug,
    path: lesson.path,
    desc: lesson.desc,
    estimatedMinutes: lesson.estimatedMinutes,
  })),
}));

// ─────────────────────────────────────────────────────────────
// Next.js — derived from nextjs-curriculum
// ─────────────────────────────────────────────────────────────

const nextjsStages: RoadmapStage[] = NEXTJS_STAGES.map((stage) => ({
  id: stage.id,
  stageNumber: stage.stageNumber,
  name: stage.name,
  subtitle: stage.subtitle,
  description: stage.description,
  lessons: stage.lessons.map((lesson) => ({
    code: lesson.code,
    name: lesson.name,
    slug: lesson.slug,
    path: lesson.path,
    desc: lesson.desc,
    estimatedMinutes: lesson.estimatedMinutes,
  })),
}));

// ─────────────────────────────────────────────────────────────
// TypeScript — derived from typescript-curriculum
// ─────────────────────────────────────────────────────────────

const typescriptStages: RoadmapStage[] = TYPESCRIPT_STAGES.map((stage) => ({
  id: stage.id,
  stageNumber: stage.stageNumber,
  name: stage.name,
  subtitle: stage.subtitle,
  description: stage.description,
  lessons: stage.lessons.map((lesson) => ({
    code: lesson.code,
    name: lesson.name,
    slug: lesson.slug,
    path: lesson.path,
    desc: lesson.desc,
    estimatedMinutes: lesson.estimatedMinutes,
  })),
}));

// ─────────────────────────────────────────────────────────────
// OOP — derived from oop-curriculum
// ─────────────────────────────────────────────────────────────

const oopStages: RoadmapStage[] = OOP_STAGES.map((stage) => ({
  id: stage.id,
  stageNumber: stage.stageNumber,
  name: stage.name,
  subtitle: stage.subtitle,
  description: stage.description,
  lessons: stage.lessons.map((lesson) => ({
    code: lesson.code,
    name: lesson.name,
    slug: lesson.slug,
    path: lesson.path,
    desc: lesson.desc,
    estimatedMinutes: lesson.estimatedMinutes,
  })),
}));

// ─────────────────────────────────────────────────────────────
// JavaScript — derived from javascript-curriculum
// ─────────────────────────────────────────────────────────────

const javascriptStages: RoadmapStage[] = JS_STAGES.map((stage) => ({
  id: stage.id,
  stageNumber: stage.stageNumber,
  name: stage.name,
  subtitle: stage.subtitle,
  description: stage.description,
  lessons: stage.lessons.map((lesson) => ({
    code: lesson.code,
    name: lesson.name,
    slug: lesson.slug,
    path: lesson.path,
    desc: lesson.desc,
    estimatedMinutes: lesson.estimatedMinutes,
  })),
}));

// ─────────────────────────────────────────────────────────────
// React — derived from react-curriculum
// ─────────────────────────────────────────────────────────────

const reactStages: RoadmapStage[] = REACT_STAGES.map((stage) => ({
  id: stage.id,
  stageNumber: stage.stageNumber,
  name: stage.name,
  subtitle: stage.subtitle,
  description: stage.description,
  lessons: stage.lessons.map((lesson) => ({
    code: lesson.code,
    name: lesson.name,
    slug: lesson.slug,
    path: lesson.path,
    desc: lesson.desc,
    estimatedMinutes: lesson.estimatedMinutes,
  })),
}));

// ─────────────────────────────────────────────────────────────
// Node.js — derived from nodejs-curriculum
// ─────────────────────────────────────────────────────────────

const nodejsStages: RoadmapStage[] = NODEJS_STAGES.map((stage) => ({
  id: stage.id,
  stageNumber: stage.stageNumber,
  name: stage.name,
  subtitle: stage.subtitle,
  description: stage.description,
  lessons: stage.lessons.map((lesson) => ({
    code: lesson.code,
    name: lesson.name,
    slug: lesson.slug,
    path: lesson.path,
    desc: lesson.desc,
    estimatedMinutes: lesson.estimatedMinutes,
  })),
}));

// ─────────────────────────────────────────────────────────────
// Express.js — derived from express-curriculum
// ─────────────────────────────────────────────────────────────

const expressStages: RoadmapStage[] = EXPRESS_STAGES.map((stage) => ({
  id: stage.id,
  stageNumber: stage.stageNumber,
  name: stage.name,
  subtitle: stage.subtitle,
  description: stage.description,
  lessons: stage.lessons.map((lesson) => ({
    code: lesson.code,
    name: lesson.name,
    slug: lesson.slug,
    path: lesson.path,
    desc: lesson.desc,
    estimatedMinutes: lesson.estimatedMinutes,
  })),
}));

// ─────────────────────────────────────────────────────────────
// MongoDB — derived from mongodb-curriculum
// ─────────────────────────────────────────────────────────────

const mongodbStages: RoadmapStage[] = MONGODB_STAGES.map((stage) => ({
  id: stage.id,
  stageNumber: stage.stageNumber,
  name: stage.name,
  subtitle: stage.subtitle,
  description: stage.description,
  lessons: stage.lessons.map((lesson) => ({
    code: lesson.code,
    name: lesson.name,
    slug: lesson.slug,
    path: lesson.path,
    desc: lesson.desc,
    estimatedMinutes: lesson.estimatedMinutes,
  })),
}));

// ─────────────────────────────────────────────────────────────
// PostgreSQL — derived from postgresql-curriculum
// ─────────────────────────────────────────────────────────────

const postgresqlStages: RoadmapStage[] = POSTGRESQL_STAGES.map((stage) => ({
  id: stage.id,
  stageNumber: stage.stageNumber,
  name: stage.name,
  subtitle: stage.subtitle,
  description: stage.description,
  lessons: stage.lessons.map((lesson) => ({
    code: lesson.code,
    name: lesson.name,
    slug: lesson.slug,
    path: lesson.path,
    desc: lesson.desc,
    estimatedMinutes: lesson.estimatedMinutes,
  })),
}));



// ─────────────────────────────────────────────────────────────
// TanStack Query — defined here
// ─────────────────────────────────────────────────────────────

/*
const tanstackStages: RoadmapStage[] = [
  {
    id: "tanstack-foundations",
    stageNumber: 1,
    name: "Query Foundations",
    subtitle: "Setup, Fetching & Cache Fundamentals",
    description: "Install TanStack Query, learn useQuery basics, query key design, cache timing, and dependent/parallel query patterns.",
    lessons: [
      { code: "TQ-01", name: "Setup & Configuration", slug: "tq01-setup", path: "/learn/tanstack/tq01-setup", desc: "Install TanStack Query, configure QueryClient, add React Query Devtools" },
      { code: "TQ-02", name: "useQuery Basics", slug: "tq02-use-query", path: "/learn/tanstack/tq02-use-query", desc: "Fetch data, handle loading/error/success states" },
      { code: "TQ-03", name: "Query Keys & Caching", slug: "tq03-queries-keys", path: "/learn/tanstack/tq03-queries-keys", desc: "Query key structure, cache organization" },
      { code: "TQ-04", name: "staleTime & gcTime", slug: "tq04-staletime-gctime", path: "/learn/tanstack/tq04-staletime-gctime", desc: "Control when data is considered fresh" },
      { code: "TQ-05", name: "Dependent Queries", slug: "tq05-dependent", path: "/learn/tanstack/tq05-dependent", desc: "Chain queries where one depends on another" },
      { code: "TQ-06", name: "Parallel Queries", slug: "tq06-parallel", path: "/learn/tanstack/tq06-parallel", desc: "Fetch multiple independent resources simultaneously" },
    ],
  },
  {
    id: "tanstack-mutations",
    stageNumber: 2,
    name: "Mutations & Pagination",
    subtitle: "Write Operations & Data Pagination",
    description: "Learn mutation patterns, optimistic updates, smart invalidation, traditional pagination, placeholder data, and infinite scroll.",
    lessons: [
      { code: "TQ-07", name: "useMutation Basics", slug: "tq07-mutation-basics", path: "/learn/tanstack/tq07-mutation-basics", desc: "POST/PUT/DELETE requests with loading/error feedback" },
      { code: "TQ-08", name: "Optimistic Updates", slug: "tq08-optimistic", path: "/learn/tanstack/tq08-optimistic", desc: "Update UI immediately, roll back if server rejects" },
      { code: "TQ-09", name: "Query Invalidation", slug: "tq09-invalidation", path: "/learn/tanstack/tq09-invalidation", desc: "Keep cache in sync after mutations" },
      { code: "TQ-10", name: "Traditional Pagination", slug: "tq10-pagination", path: "/learn/tanstack/tq10-pagination", desc: "useQuery with page parameters" },
      { code: "TQ-11", name: "Placeholder Data", slug: "tq11-placeholder-data", path: "/learn/tanstack/tq11-placeholder-data", desc: "No loading flicker between page transitions" },
      { code: "TQ-12", name: "Infinite Scroll", slug: "tq12-infinite", path: "/learn/tanstack/tq12-infinite", desc: "useInfiniteQuery with automatic pagination" },
    ],
  },
  {
    id: "tanstack-advanced",
    stageNumber: 3,
    name: "Advanced Patterns",
    subtitle: "Prefetching, Suspense & SSR",
    description: "Master prefetching, data transformation, conditional queries, polling, error handling, cancellation, complex mutations, custom hooks, Suspense, and SSR hydration.",
    lessons: [
      { code: "TQ-13", name: "Prefetching", slug: "tq13-prefetching", path: "/learn/tanstack/tq13-prefetching", desc: "Hover prefetching and route warmup" },
      { code: "TQ-14", name: "Data Transformation (select)", slug: "tq14-select", path: "/learn/tanstack/tq14-select", desc: "Transform server data with the select option" },
      { code: "TQ-15", name: "Conditional Queries (enabled)", slug: "tq15-enabled", path: "/learn/tanstack/tq15-enabled", desc: "Control when queries execute" },
      { code: "TQ-16", name: "Polling & Intervals", slug: "tq16-polling", path: "/learn/tanstack/tq16-polling", desc: "Real-time data with refetchInterval" },
      { code: "TQ-17", name: "Error Handling & Retries", slug: "tq17-error-handling", path: "/learn/tanstack/tq17-error-handling", desc: "Global error handling and retry configuration" },
      { code: "TQ-18", name: "Query Cancellation", slug: "tq18-cancellation", path: "/learn/tanstack/tq18-cancellation", desc: "AbortSignal-based query cancellation" },
      { code: "TQ-19", name: "Complex Mutations", slug: "tq19-mutations", path: "/learn/tanstack/tq19-mutations", desc: "Orchestrating multiple dependent mutations" },
      { code: "TQ-20", name: "Custom Query Hooks", slug: "tq20-custom-hooks", path: "/learn/tanstack/tq20-custom-hooks", desc: "Build reusable, typed query abstractions" },
      { code: "TQ-21", name: "React Suspense", slug: "tq21-suspense", path: "/learn/tanstack/tq21-suspense", desc: "useSuspenseQuery and Suspense boundaries" },
      { code: "TQ-22", name: "SSR & Hydration", slug: "tq22-ssr", path: "/learn/tanstack/tq22-ssr", desc: "Server-side dehydration and client hydration" },
    ],
  },
];
*/

// ─────────────────────────────────────────────────────────────
// Skill Roadmaps Registry
// ─────────────────────────────────────────────────────────────

export const SKILL_ROADMAPS: SkillRoadmap[] = [
  {
    id: "nestjs",
    slug: "nestjs",
    title: "NestJS",
    description: "Enterprise Backend Architecture & Microservices",
    icon: "🦁",
    category: "backend",
    level: "beginner-advanced",
    status: "available",
    totalLessons: 32,
    stages: nestjsStages,
    learnPath: "/learn/nestjs",
    badgeColor: "bg-ds-error-lighter text-ds-error-dark border-ds-error-light",
  },
  {
    id: "nextjs",
    slug: "nextjs",
    title: "Next.js",
    description: "Full-Stack App Router, Streaming & Server Components",
    icon: "⚡",
    category: "frontend",
    level: "beginner-advanced",
    status: "available",
    totalLessons: 22,
    stages: nextjsStages,
    learnPath: "/learn/nextjs",
    badgeColor: "bg-ds-feature-lighter text-ds-feature-dark border-ds-feature-light",
  },
  /*
  {
    id: "tanstack",
    slug: "tanstack",
    title: "TanStack Query",
    description: "Asynchronous Server State Management & Caching",
    icon: "🔄",
    category: "frontend",
    level: "intermediate",
    status: "available",
    totalLessons: 22,
    stages: tanstackStages,
    learnPath: "/learn/tanstack",
    badgeColor: "bg-ds-info-lighter text-ds-info-dark border-ds-info-light",
  },
  */
  // Language skills
  {
    id: "javascript",
    slug: "javascript",
    title: "JavaScript",
    description: "Core JS Fundamentals, Event Loop, Closures & Modern ES6+",
    icon: "💛",
    category: "language",
    level: "beginner-advanced",
    status: "available",
    totalLessons: 30,
    stages: javascriptStages,
    learnPath: "/learn/javascript",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  },
  {
    id: "typescript",
    slug: "typescript",
    title: "TypeScript",
    description: "Strict Static Typing, Generics & Utility Types",
    icon: "🔷",
    category: "language",
    level: "beginner-advanced",
    status: "available",
    totalLessons: 32,
    stages: typescriptStages,
    learnPath: "/learn/typescript",
    badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  },
  {
    id: "oop",
    slug: "oop",
    title: "OOP Fundamentals",
    description: "Object-Oriented Architecture, Classes & SOLID Principles",
    icon: "🧩",
    category: "language",
    level: "beginner-advanced",
    status: "available",
    totalLessons: 16,
    stages: oopStages,
    learnPath: "/learn/oop",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  },
  {
    id: "react",
    slug: "react",
    title: "React",
    description: "Component Architecture, Hooks & State Management",
    icon: "⚛️",
    category: "frontend",
    level: "beginner-advanced",
    status: "available",
    totalLessons: 27,
    stages: reactStages,
    learnPath: "/learn/react",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  },
  {
    id: "nodejs",
    slug: "nodejs",
    title: "Node.js",
    description: "Runtime Internals, Streams & Server-Side JavaScript",
    icon: "🟢",
    category: "backend",
    level: "beginner-advanced",
    status: "available",
    totalLessons: 24,
    stages: nodejsStages,
    learnPath: "/learn/nodejs",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  },
  {
    id: "expressjs",
    slug: "expressjs",
    title: "Express.js",
    description: "Minimal & Flexible Web Application Framework",
    icon: "🚂",
    category: "backend",
    level: "beginner-advanced",
    status: "available",
    totalLessons: 28,
    stages: expressStages,
    learnPath: "/learn/express",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  },
  {
    id: "postgresql",
    slug: "postgresql",
    title: "PostgreSQL",
    description: "Relational Database Design, SQL, Joins, ACID & Performance Tuning",
    icon: "🐘",
    category: "database",
    level: "beginner-advanced",
    status: "available",
    totalLessons: 29,
    stages: postgresqlStages,
    learnPath: "/learn/postgresql",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  },
  {
    id: "mongodb",
    slug: "mongodb",
    title: "MongoDB",
    description: "Document Database, Aggregation, Indexes & Data Modeling",
    icon: "🍃",
    category: "database",
    level: "beginner-advanced",
    status: "available",
    totalLessons: 26,
    stages: mongodbStages,
    learnPath: "/learn/mongodb",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  {
    id: "redis",
    slug: "redis",
    title: "Redis",
    description: "In-Memory Caching, Pub/Sub & Data Structures",
    icon: "🔴",
    category: "database",
    level: "intermediate",
    status: "coming-soon",
    totalLessons: 0,
    stages: [],
    learnPath: "",
    badgeColor: "bg-ds-error-lighter text-ds-error-dark border-ds-error-light",
  },
  {
    id: "docker",
    slug: "docker",
    title: "Docker",
    description: "Containerization, Compose & Production Deployment",
    icon: "🐳",
    category: "devops",
    level: "intermediate",
    status: "coming-soon",
    totalLessons: 0,
    stages: [],
    learnPath: "",
    badgeColor: "bg-ds-verified-lighter text-ds-verified-dark border-ds-verified-light",
  },
];

// ─────────────────────────────────────────────────────────────
// Role-Based Roadmaps
// ─────────────────────────────────────────────────────────────

export const ROLE_ROADMAPS: RoleRoadmap[] = [
  {
    id: "frontend",
    slug: "frontend",
    title: "Frontend Developer",
    description: "Build modern, performant user interfaces with React, Next.js, and state management mastery.",
    icon: "🎨",
    steps: [
      { skillSlug: "javascript", skillTitle: "JavaScript", required: true },
      { skillSlug: "typescript", skillTitle: "TypeScript", required: true },
      { skillSlug: "react", skillTitle: "React", required: true },
      { skillSlug: "nextjs", skillTitle: "Next.js", required: true },
      // { skillSlug: "tanstack", skillTitle: "TanStack Query", required: true },
    ],
  },
  {
    id: "backend",
    slug: "backend",
    title: "Backend Developer",
    description: "Architect scalable APIs, manage databases, and deploy production-grade backend services.",
    icon: "⚙️",
    steps: [
      { skillSlug: "javascript", skillTitle: "JavaScript", required: true },
      { skillSlug: "typescript", skillTitle: "TypeScript", required: true },
      { skillSlug: "nodejs", skillTitle: "Node.js", required: true },
      { skillSlug: "expressjs", skillTitle: "Express.js", required: false, alternatives: ["nestjs"] },
      { skillSlug: "nestjs", skillTitle: "NestJS", required: true },
      { skillSlug: "postgresql", skillTitle: "PostgreSQL", required: true, alternatives: ["mongodb"] },
      { skillSlug: "mongodb", skillTitle: "MongoDB", required: false },
      { skillSlug: "redis", skillTitle: "Redis", required: false },
      { skillSlug: "docker", skillTitle: "Docker", required: true },
    ],
  },
  {
    id: "fullstack",
    slug: "fullstack",
    title: "Full-Stack Developer",
    description: "Master both frontend and backend to build complete, production-ready web applications end to end.",
    icon: "🚀",
    steps: [
      { skillSlug: "javascript", skillTitle: "JavaScript", required: true },
      { skillSlug: "typescript", skillTitle: "TypeScript", required: true },
      { skillSlug: "react", skillTitle: "React", required: true },
      { skillSlug: "nextjs", skillTitle: "Next.js", required: true },
      // { skillSlug: "tanstack", skillTitle: "TanStack Query", required: true },
      { skillSlug: "nodejs", skillTitle: "Node.js", required: true },
      { skillSlug: "nestjs", skillTitle: "NestJS", required: true },
      { skillSlug: "postgresql", skillTitle: "PostgreSQL", required: true },
      { skillSlug: "redis", skillTitle: "Redis", required: false },
      { skillSlug: "docker", skillTitle: "Docker", required: true },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Category Metadata
// ─────────────────────────────────────────────────────────────

export const CATEGORY_META: Record<SkillCategory, { label: string; icon: string }> = {
  frontend: { label: "Frontend", icon: "🎨" },
  backend: { label: "Backend", icon: "⚙️" },
  database: { label: "Database", icon: "🗄️" },
  devops: { label: "DevOps", icon: "🐳" },
  architecture: { label: "Architecture", icon: "🏗️" },
  language: { label: "Languages", icon: "📝" },
};

// ─────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────

export function getSkillRoadmap(slug: string): SkillRoadmap | undefined {
  if (slug === "express" || slug === "expressjs") {
    return SKILL_ROADMAPS.find((s) => s.slug === "expressjs" || s.slug === "express");
  }
  if (slug === "mongo" || slug === "mongodb") {
    return SKILL_ROADMAPS.find((s) => s.slug === "mongodb" || s.slug === "mongo");
  }
  if (slug === "postgres" || slug === "postgresql" || slug === "psql") {
    return SKILL_ROADMAPS.find((s) => s.slug === "postgresql" || s.slug === "postgres");
  }
  return SKILL_ROADMAPS.find((s) => s.slug === slug);
}

export function getRoleRoadmap(slug: string): RoleRoadmap | undefined {
  return ROLE_ROADMAPS.find((r) => r.slug === slug);
}

export function getAvailableSkills(): SkillRoadmap[] {
  return SKILL_ROADMAPS.filter((s) => s.status === "available");
}

export function getSkillsByCategory(category?: SkillCategory): SkillRoadmap[] {
  if (!category) return SKILL_ROADMAPS;
  return SKILL_ROADMAPS.filter((s) => s.category === category);
}

export function getSkillStatus(slug: string): SkillStatus {
  const skill = getSkillRoadmap(slug);
  return skill?.status ?? "coming-soon";
}

export function getLevelLabel(level: SkillLevel): string {
  switch (level) {
    case "beginner": return "Beginner";
    case "intermediate": return "Intermediate";
    case "advanced": return "Advanced";
    case "beginner-advanced": return "Beginner → Advanced";
  }
}
