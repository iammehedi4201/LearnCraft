/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * PRISMA ORM CURRICULUM DATA LAYER — AUTHORITATIVE IMPLEMENTATION
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Authoritative 5 Progressive Phases, 20 Core Lessons, and 1 Comprehensive Capstone.
 * Directly maps to LearnCraft's authoritative Prisma ORM curriculum.
 *
 * Strict Curriculum Boundaries:
 * Pure Prisma ORM data-access layer only (schema modeling, Prisma Client CRUD,
 * relations, migrations, transactions, error handling, performance & connections).
 * No Prisma Accelerate/Pulse commercial upsells, no Docker/deployment tangents.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import type { Course } from "@/components/curriculum/types";
import { PRISMA_LEGACY_SLUG_MAP } from "../content";

export interface LessonMeta {
  code: string;
  slug: string;
  name: string;
  phaseId: string;
  phaseNumber: number;
  stepNumber: number;
  desc: string;
  estimatedMinutes: number;
  xpReward: number;
  prerequisite?: string;
  path: string;
  color?: string;
}

export interface PhaseMeta {
  id: string;
  phaseNumber: number;
  name: string;
  label: string;
  desc: string;
  scope: string;
  lessonCodes: string[];
}

export interface CapstoneProjectMeta {
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
  keyFeatures: string[];
}

export interface PrerequisiteItem {
  id: string;
  title: string;
  badge: string;
  category: "required" | "recommended";
  icon: string;
  desc: string;
  path: string;
}

export const PRISMA_PROGRESSION_PHASES: PhaseMeta[] = [
  {
    id: "understand-prisma-orm",
    phaseNumber: 1,
    name: "Understand Prisma ORM",
    label: "Phase 01: Understand Prisma ORM",
    desc: "Understand what Prisma ORM is, how it connects your application to relational databases, schema configuration, and data modeling.",
    scope: "What is Prisma · Project Setup · Schema & Models · Field Types & Attributes",
    lessonCodes: ["PRI-01", "PRI-02", "PRI-03", "PRI-04"],
  },
  {
    id: "use-prisma-client",
    phaseNumber: 2,
    name: "Use Prisma Client",
    label: "Phase 02: Use Prisma Client",
    desc: "Master Prisma Client generation, CRUD mutations, filtering, sorting, and selective column projection.",
    scope: "Prisma Client Setup · create & read · update & delete · where & orderBy · select",
    lessonCodes: ["PRI-05", "PRI-06", "PRI-07", "PRI-08", "PRI-09"],
  },
  {
    id: "work-with-related-data",
    phaseNumber: 3,
    name: "Work with Related Data",
    label: "Phase 03: Work with Related Data",
    desc: "Connect entities with foreign keys, load related records with include and nested select, and execute atomic nested writes.",
    scope: "Relationships & Foreign Keys · include vs nested select · Nested Writes & connect",
    lessonCodes: ["PRI-10", "PRI-11", "PRI-12"],
  },
  {
    id: "keep-schema-and-data-safe",
    phaseNumber: 4,
    name: "Keep the Schema and Data Safe",
    label: "Phase 04: Keep the Schema and Data Safe",
    desc: "Track schema changes with Prisma Migrate, seed development environments, inspect records visually with Studio, and handle error codes.",
    scope: "Migrations · Prisma Studio & Seeding · Error Handling & P2002/P2025 Codes",
    lessonCodes: ["PRI-13", "PRI-14", "PRI-15"],
  },
  {
    id: "reliability-and-performance",
    phaseNumber: 5,
    name: "Reliability and Performance",
    label: "Phase 05: Reliability and Performance",
    desc: "Ensure ACID transactions, implement high-performance pagination, optimize queries with indexes, manage connection pools, and run safe raw SQL.",
    scope: "Transactions · Pagination · Indexes & Performance · Connection Pooling · Raw SQL",
    lessonCodes: ["PRI-16", "PRI-17", "PRI-18", "PRI-19", "PRI-20"],
  },
];

export const PRISMA_LESSONS: LessonMeta[] = [
  // Phase 1: Understand Prisma ORM (Lessons 1 - 4)
  {
    code: "PRI-01",
    slug: "pri01-what-is-prisma",
    name: "What Is Prisma ORM?",
    phaseId: "understand-prisma-orm",
    phaseNumber: 1,
    stepNumber: 1,
    desc: "Understand what Prisma ORM is, why applications need a typed data-access layer, and how Prisma queries relational databases safely.",
    estimatedMinutes: 15,
    xpReward: 80,
    path: "/learn/prisma/pri01-what-is-prisma",
  },
  {
    code: "PRI-02",
    slug: "pri02-prisma-project-setup-and-main-files",
    name: "Prisma Project Setup and Main Files",
    phaseId: "understand-prisma-orm",
    phaseNumber: 1,
    stepNumber: 2,
    desc: "Explore the main files of a Prisma project: schema.prisma, configuration files, generated Prisma Client, and migrations directory.",
    estimatedMinutes: 20,
    xpReward: 85,
    prerequisite: "PRI-01",
    path: "/learn/prisma/pri02-prisma-project-setup-and-main-files",
  },
  {
    code: "PRI-03",
    slug: "pri03-prisma-schema-and-models",
    name: "Prisma Schema and Models",
    phaseId: "understand-prisma-orm",
    phaseNumber: 1,
    stepNumber: 3,
    desc: "Define application entities, tables, fields, and constraints using declarative Prisma schema models.",
    estimatedMinutes: 20,
    xpReward: 85,
    prerequisite: "PRI-02",
    path: "/learn/prisma/pri03-prisma-schema-and-models",
  },
  {
    code: "PRI-04",
    slug: "pri04-field-types-and-schema-attributes",
    name: "Field Types and Schema Attributes",
    phaseId: "understand-prisma-orm",
    phaseNumber: 1,
    stepNumber: 4,
    desc: "Use scalar types (String, Int, Decimal, DateTime), optional nullable fields, and default value attributes.",
    estimatedMinutes: 20,
    xpReward: 90,
    prerequisite: "PRI-03",
    path: "/learn/prisma/pri04-field-types-and-schema-attributes",
  },

  // Phase 2: Use Prisma Client (Lessons 5 - 9)
  {
    code: "PRI-05",
    slug: "pri05-what-is-prisma-client",
    name: "What Is Prisma Client?",
    phaseId: "use-prisma-client",
    phaseNumber: 2,
    stepNumber: 5,
    desc: "Learn how Prisma Client is generated from the schema and provides typed methods for reading and changing data.",
    estimatedMinutes: 20,
    xpReward: 90,
    prerequisite: "PRI-04",
    path: "/learn/prisma/pri05-what-is-prisma-client",
  },
  {
    code: "PRI-06",
    slug: "pri06-create-and-read-records",
    name: "Create and Read Records",
    phaseId: "use-prisma-client",
    phaseNumber: 2,
    stepNumber: 6,
    desc: "Insert rows with create() and read data with findMany(), findUnique(), and findFirst().",
    estimatedMinutes: 25,
    xpReward: 95,
    prerequisite: "PRI-05",
    path: "/learn/prisma/pri06-create-and-read-records",
  },
  {
    code: "PRI-07",
    slug: "pri07-update-and-delete-records",
    name: "Update and Delete Records",
    phaseId: "use-prisma-client",
    phaseNumber: 2,
    stepNumber: 7,
    desc: "Modify existing records with update() and remove rows safely with delete() and deleteMany().",
    estimatedMinutes: 25,
    xpReward: 95,
    prerequisite: "PRI-06",
    path: "/learn/prisma/pri07-update-and-delete-records",
  },
  {
    code: "PRI-08",
    slug: "pri08-filtering-and-sorting-data",
    name: "Filtering and Sorting Data",
    phaseId: "use-prisma-client",
    phaseNumber: 2,
    stepNumber: 8,
    desc: "Filter results using where conditions and sort records with orderBy in ascending or descending order.",
    estimatedMinutes: 25,
    xpReward: 95,
    prerequisite: "PRI-07",
    path: "/learn/prisma/pri08-filtering-and-sorting-data",
  },
  {
    code: "PRI-09",
    slug: "pri09-select-only-the-fields-you-need",
    name: "Select Only the Fields You Need",
    phaseId: "use-prisma-client",
    phaseNumber: 2,
    stepNumber: 9,
    desc: "Use select to retrieve only the required fields, protecting sensitive data and reducing payload sizes.",
    estimatedMinutes: 20,
    xpReward: 90,
    prerequisite: "PRI-08",
    path: "/learn/prisma/pri09-select-only-the-fields-you-need",
  },

  // Phase 3: Work with Related Data (Lessons 10 - 12)
  {
    code: "PRI-10",
    slug: "pri10-understand-relationships-between-models",
    name: "Understand Relationships Between Models",
    phaseId: "work-with-related-data",
    phaseNumber: 3,
    stepNumber: 10,
    desc: "Connect models using relation scalar fields (foreign keys) and virtual relation fields with @relation.",
    estimatedMinutes: 25,
    xpReward: 100,
    prerequisite: "PRI-09",
    path: "/learn/prisma/pri10-understand-relationships-between-models",
  },
  {
    code: "PRI-11",
    slug: "pri11-read-related-records-with-include-and-nested-select",
    name: "Read Related Records with include and Nested select",
    phaseId: "work-with-related-data",
    phaseNumber: 3,
    stepNumber: 11,
    desc: "Eagerly load related models with include or fetch specific nested subsets with nested select.",
    estimatedMinutes: 25,
    xpReward: 100,
    prerequisite: "PRI-10",
    path: "/learn/prisma/pri11-read-related-records-with-include-and-nested-select",
  },
  {
    code: "PRI-12",
    slug: "pri12-create-related-records-with-nested-writes",
    name: "Create Related Records with Nested Writes",
    phaseId: "work-with-related-data",
    phaseNumber: 3,
    stepNumber: 12,
    desc: "Create and connect parent and child records in a single atomic database operation using nested writes.",
    estimatedMinutes: 25,
    xpReward: 100,
    prerequisite: "PRI-11",
    path: "/learn/prisma/pri12-create-related-records-with-nested-writes",
  },

  // Phase 4: Keep the Schema and Data Safe (Lessons 13 - 15)
  {
    code: "PRI-13",
    slug: "pri13-what-are-prisma-migrations",
    name: "What Are Prisma Migrations?",
    phaseId: "keep-schema-and-data-safe",
    phaseNumber: 4,
    stepNumber: 13,
    desc: "Evolve database schemas deterministically across environments using prisma migrate dev and deploy.",
    estimatedMinutes: 25,
    xpReward: 100,
    prerequisite: "PRI-12",
    path: "/learn/prisma/pri13-what-are-prisma-migrations",
  },
  {
    code: "PRI-14",
    slug: "pri14-prisma-studio-and-seed-data",
    name: "Prisma Studio and Seed Data",
    phaseId: "keep-schema-and-data-safe",
    phaseNumber: 4,
    stepNumber: 14,
    desc: "Visually browse database records with Prisma Studio and populate development environments using seed scripts.",
    estimatedMinutes: 20,
    xpReward: 90,
    prerequisite: "PRI-13",
    path: "/learn/prisma/pri14-prisma-studio-and-seed-data",
  },
  {
    code: "PRI-15",
    slug: "pri15-handle-prisma-errors",
    name: "Handle Prisma Errors",
    phaseId: "keep-schema-and-data-safe",
    phaseNumber: 4,
    stepNumber: 15,
    desc: "Catch and handle PrismaClientKnownRequestError codes (P2002, P2025) to provide helpful user feedback.",
    estimatedMinutes: 20,
    xpReward: 95,
    prerequisite: "PRI-14",
    path: "/learn/prisma/pri15-handle-prisma-errors",
  },

  // Phase 5: Reliability and Performance (Lessons 16 - 20)
  {
    code: "PRI-16",
    slug: "pri16-transactions",
    name: "Transactions",
    phaseId: "reliability-and-performance",
    phaseNumber: 5,
    stepNumber: 16,
    desc: "Ensure all-or-nothing atomicity across multiple operations using batch and interactive $transaction.",
    estimatedMinutes: 25,
    xpReward: 100,
    prerequisite: "PRI-15",
    path: "/learn/prisma/pri16-transactions",
  },
  {
    code: "PRI-17",
    slug: "pri17-pagination",
    name: "Pagination",
    phaseId: "reliability-and-performance",
    phaseNumber: 5,
    stepNumber: 17,
    desc: "Paginate large datasets using offset-based (skip/take) and cursor-based pagination strategies.",
    estimatedMinutes: 20,
    xpReward: 95,
    prerequisite: "PRI-16",
    path: "/learn/prisma/pri17-pagination",
  },
  {
    code: "PRI-18",
    slug: "pri18-indexes-and-query-performance",
    name: "Indexes and Query Performance",
    phaseId: "reliability-and-performance",
    phaseNumber: 5,
    stepNumber: 18,
    desc: "Accelerate query lookups and enforce uniqueness using @@index and @@unique schema attributes.",
    estimatedMinutes: 20,
    xpReward: 95,
    prerequisite: "PRI-17",
    path: "/learn/prisma/pri18-indexes-and-query-performance",
  },
  {
    code: "PRI-19",
    slug: "pri19-reuse-prisma-client-and-manage-connections",
    name: "Reuse Prisma Client and Manage Connections",
    phaseId: "reliability-and-performance",
    phaseNumber: 5,
    stepNumber: 19,
    desc: "Prevent connection exhaustion in Node.js and Next.js applications using global singleton client patterns.",
    estimatedMinutes: 25,
    xpReward: 100,
    prerequisite: "PRI-18",
    path: "/learn/prisma/pri19-reuse-prisma-client-and-manage-connections",
  },
  {
    code: "PRI-20",
    slug: "pri20-use-raw-sql-only-when-needed",
    name: "Use Raw SQL Only When Needed",
    phaseId: "reliability-and-performance",
    phaseNumber: 5,
    stepNumber: 20,
    desc: "Execute safe parameterized raw SQL queries using $queryRaw and $executeRaw without SQL injection risks.",
    estimatedMinutes: 25,
    xpReward: 100,
    prerequisite: "PRI-19",
    path: "/learn/prisma/pri20-use-raw-sql-only-when-needed",
  },
];

export const PRISMA_CAPSTONE: CapstoneProjectMeta = {
  id: "orderflow-engine",
  stageNumber: 5,
  slug: "orderflow-engine",
  title: "OrderFlow: Enterprise Transaction Engine",
  subtitle: "Production Prisma data-access architecture with multi-model relations, migrations, and interactive transactions.",
  desc: "Synthesize all 20 lessons: Design an enterprise ordering schema, write automated SQL migrations, execute atomic nested writes, and run interactive transactions.",
  path: "/learn/prisma/projects/orderflow-engine",
  badge: "Capstone Project",
  xpReward: 500,
  estimatedMinutes: 120,
  keyFeatures: [
    "Declarative multi-model schema with 1:1, 1:N, and M:N relationships",
    "Timestamped SQL migration pipeline with version-controlled evolution",
    "Atomic nested creates and upserts for order items and customer accounts",
    "Interactive $transaction callback managing stock decrement and ledger credits",
    "Safe parameterized $queryRaw reporting with custom TypeScript payload types",
  ],
};

export const PRISMA_PREREQUISITES: PrerequisiteItem[] = [
  {
    id: "ts-types",
    title: "TypeScript Fundamentals",
    badge: "Language",
    category: "required",
    icon: "📘",
    desc: "Understanding static types, interfaces, generics, async/await, and promises in TypeScript.",
    path: "/learn/typescript",
  },
  {
    id: "relational-db",
    title: "Relational Database Concepts",
    badge: "Database",
    category: "required",
    icon: "🗄️",
    desc: "Tables, rows, columns, primary keys, foreign keys, and basic SQL operations.",
    path: "/learn/postgresql",
  },
  {
    id: "nodejs-runtime",
    title: "Node.js Runtime Basics",
    badge: "Runtime",
    category: "recommended",
    icon: "🟢",
    desc: "npm packages, environment variables via .env, and asynchronous event loops.",
    path: "/learn/nodejs",
  },
];

export function getAllLessons(): LessonMeta[] {
  return PRISMA_LESSONS;
}

export function getLessonBySlug(slugOrCode: string): LessonMeta | undefined {
  const normalized = slugOrCode?.toLowerCase();
  const directMatch = PRISMA_LESSONS.find(
    (l) => l.slug.toLowerCase() === normalized || l.code.toLowerCase() === normalized
  );
  if (directMatch) return directMatch;

  const mappedSlug = PRISMA_LEGACY_SLUG_MAP[normalized];
  if (mappedSlug) {
    return PRISMA_LESSONS.find((l) => l.slug.toLowerCase() === mappedSlug.toLowerCase());
  }

  return undefined;
}

export function getLessonsByPhaseId(phaseId: string): LessonMeta[] {
  return PRISMA_LESSONS.filter((l) => l.phaseId === phaseId);
}

export function getStageByLessonSlug(slug: string): PhaseMeta | undefined {
  const lesson = getLessonBySlug(slug);
  if (!lesson) return undefined;
  return PRISMA_PROGRESSION_PHASES.find((p) => p.id === lesson.phaseId);
}

export function getNextLesson(currentSlug: string): LessonMeta | null {
  const current = getLessonBySlug(currentSlug);
  if (!current) return null;
  const idx = PRISMA_LESSONS.findIndex((l) => l.slug === current.slug);
  if (idx === -1 || idx === PRISMA_LESSONS.length - 1) return null;
  return PRISMA_LESSONS[idx + 1];
}

export function getPrevLesson(currentSlug: string): LessonMeta | null {
  const current = getLessonBySlug(currentSlug);
  if (!current) return null;
  const idx = PRISMA_LESSONS.findIndex((l) => l.slug === current.slug);
  if (idx <= 0) return null;
  return PRISMA_LESSONS[idx - 1];
}

export const PROGRESSION_PHASES = PRISMA_PROGRESSION_PHASES;

export interface StageMeta {
  id: string;
  stageNumber: number;
  name: string;
  subtitle: string;
  description: string;
  lessons: LessonMeta[];
}

export const PRISMA_STAGES: StageMeta[] = PRISMA_PROGRESSION_PHASES.map((phase) => ({
  id: phase.id,
  stageNumber: phase.phaseNumber,
  name: phase.name,
  subtitle: phase.scope,
  description: phase.desc,
  lessons: phase.lessonCodes
    .map((code) => PRISMA_LESSONS.find((l) => l.code === code))
    .filter((l): l is LessonMeta => l !== undefined),
}));


export function getPrismaCourse(): Course {
  const allLessons = getAllLessons();
  return {
    id: "prisma",
    title: "Learn Prisma",
    prerequisites: {
      items: [
        "TypeScript fundamentals: types, interfaces, async/await, and promises",
        "Relational database concepts: tables, rows, primary keys, and foreign keys",
        "Familiarity with Node.js runtime and npm packages",
      ],
      refresherHref: "/learn/postgresql",
      refresherLabel: "Need a refresher? Open the PostgreSQL curriculum",
    },
    capstone: {
      title: PRISMA_CAPSTONE.title,
      description:
        "Your finish line: architect and implement OrderFlow, a production-grade Prisma data-access engine featuring multi-entity schemas, declarative SQL migrations, atomic nested writes, and interactive transactions.",
      href: PRISMA_CAPSTONE.path,
    },
    phases: PRISMA_PROGRESSION_PHASES.map((phase) => ({
      id: phase.id,
      name: phase.name,
      summary: phase.desc,
      lessons: phase.lessonCodes
        .map((code) => allLessons.find((l) => l.code === code))
        .filter((l): l is LessonMeta => l !== undefined)
        .map((l) => ({
          id: l.slug,
          code: l.code,
          title: l.name,
          description: l.desc,
          minutes: l.estimatedMinutes,
          requires: l.prerequisite,
          href: l.path,
        })),
    })),
  };
}
