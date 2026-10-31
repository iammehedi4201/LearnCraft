/**
 * PostgreSQL Curriculum Data Layer — LearnCraft
 * 4 Phases, 22 Authoritative Lessons, and 1 Comprehensive Capstone Project.
 *
 * Strict Topic Boundary: Pure PostgreSQL relational database only.
 * Focuses on relational model, databases/tables/rows/columns, core data types,
 * constraints (PRIMARY KEY, NOT NULL, UNIQUE, CHECK, DEFAULT, FOREIGN KEY),
 * CRUD operations, WHERE/ORDER BY/LIMIT/ILIKE, NULL three-valued logic,
 * relationships & foreign keys, joins (INNER, LEFT), aggregates & GROUP BY & HAVING,
 * subqueries & CTEs (WITH), UPDATE with RETURNING, ACID transactions, normalization,
 * B-Tree indexes, EXPLAIN (ANALYZE, BUFFERS), views, JSONB, pagination (LIMIT/OFFSET vs Keyset),
 * SQL injection prevention with parameterized queries, database roles & permissions,
 * and pg_dump / pg_restore backups.
 */

import type { Course } from "@/components/curriculum/types";
import { POSTGRESQL_LEGACY_SLUG_MAP } from "../content";

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

export const POSTGRESQL_PROGRESSION_PHASES: PhaseMeta[] = [
  {
    id: "understand-postgresql-and-tables",
    phaseNumber: 1,
    name: "Understand PostgreSQL and Tables",
    label: "Phase 01: Understand PostgreSQL and Tables",
    desc: "Understand what PostgreSQL is, how data is organized into tables, rows, and columns, master common data types, enforce domain constraints, and execute foundational CRUD operations.",
    scope: "PostgreSQL Architecture · Databases vs Tables · Data Types · Constraints · CRUD Basics",
    lessonCodes: ["PG-01", "PG-02", "PG-03", "PG-04", "PG-05"],
  },
  {
    id: "find-and-combine-data",
    phaseNumber: 2,
    name: "Find and Combine Data",
    label: "Phase 02: Find and Combine Data",
    desc: "Filter, sort, and limit queries, navigate three-valued NULL logic, connect tables with foreign keys, combine data with INNER and LEFT joins, and group metrics with HAVING and CTEs.",
    scope: "WHERE & ILIKE · NULL Logic · Foreign Keys · INNER & LEFT JOIN · Aggregation · CTEs",
    lessonCodes: ["PG-06", "PG-07", "PG-08", "PG-09", "PG-10", "PG-11"],
  },
  {
    id: "keep-data-correct-and-safe",
    phaseNumber: 3,
    name: "Keep Data Correct and Safe",
    label: "Phase 03: Keep Data Correct and Safe",
    desc: "Safely modify rows with RETURNING, protect multi-step workflows with ACID transactions, design normalized schemas, accelerate queries with B-Tree indexes, inspect EXPLAIN plans, encapsulate logic in views, and query JSONB.",
    scope: "RETURNING · ACID Transactions · Normalization · Indexes · EXPLAIN ANALYZE · Views · JSONB",
    lessonCodes: ["PG-12", "PG-13", "PG-14", "PG-15", "PG-16", "PG-17", "PG-18"],
  },
  {
    id: "work-with-data-efficiently-and-safely",
    phaseNumber: 4,
    name: "Work with Data Efficiently and Safely",
    label: "Phase 04: Work with Data Efficiently and Safely",
    desc: "Implement scalable Keyset cursor pagination, eliminate SQL injection vulnerabilities using parameterized queries, enforce least privilege with database roles, and perform regular backup and restore drills.",
    scope: "Keyset Pagination · Parameterized Queries · Database Roles & Permissions · pg_dump & pg_restore",
    lessonCodes: ["PG-19", "PG-20", "PG-21", "PG-22"],
  },
];

export const POSTGRESQL_LESSONS: LessonMeta[] = [
  // Phase 1: Understand PostgreSQL and Tables
  {
    code: "PG-01",
    slug: "pg01-what-is-postgresql",
    name: "What Is PostgreSQL?",
    phaseId: "understand-postgresql-and-tables",
    phaseNumber: 1,
    stepNumber: 1,
    desc: "Understand what PostgreSQL is, why relational databases excel for persistent structured storage, and how applications query tables using SQL.",
    estimatedMinutes: 15,
    xpReward: 50,
    path: "/learn/postgresql/pg01-what-is-postgresql",
    color: "purple",
  },
  {
    code: "PG-02",
    slug: "pg02-database-table-row-column",
    name: "Database, Table, Row, and Column",
    phaseId: "understand-postgresql-and-tables",
    phaseNumber: 1,
    stepNumber: 2,
    desc: "Master relational hierarchy: databases hold tables, tables represent entity types, rows represent records, and columns represent typed fields.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "PG-01",
    path: "/learn/postgresql/pg02-database-table-row-column",
    color: "purple",
  },
  {
    code: "PG-03",
    slug: "pg03-common-data-types",
    name: "Common PostgreSQL Data Types",
    phaseId: "understand-postgresql-and-tables",
    phaseNumber: 1,
    stepNumber: 3,
    desc: "Select the optimal column data types: INTEGER vs BIGINT, TEXT, exact decimals with NUMERIC(10, 2), TIMESTAMPTZ, and UUIDs.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "PG-02",
    path: "/learn/postgresql/pg03-common-data-types",
    color: "purple",
  },
  {
    code: "PG-04",
    slug: "pg04-create-tables-and-constraints",
    name: "Create Tables and Add Constraints",
    phaseId: "understand-postgresql-and-tables",
    phaseNumber: 1,
    stepNumber: 4,
    desc: "Define tables with PRIMARY KEY, NOT NULL, UNIQUE, CHECK, and DEFAULT constraints to enforce data integrity at the database boundary.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "PG-03",
    path: "/learn/postgresql/pg04-create-tables-and-constraints",
    color: "purple",
  },
  {
    code: "PG-05",
    slug: "pg05-crud-operations",
    name: "Insert, Read, Update, and Delete Data (CRUD)",
    phaseId: "understand-postgresql-and-tables",
    phaseNumber: 1,
    stepNumber: 5,
    desc: "Execute the four core CRUD operations and understand why you must always verify the WHERE condition before running UPDATE or DELETE.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "PG-04",
    path: "/learn/postgresql/pg05-crud-operations",
    color: "purple",
  },

  // Phase 2: Find and Combine Data
  {
    code: "PG-06",
    slug: "pg06-filter-sort-limit",
    name: "Filter, Sort, and Limit Results",
    phaseId: "find-and-combine-data",
    phaseNumber: 2,
    stepNumber: 6,
    desc: "Filter rows with WHERE, sort results deterministically with ORDER BY, restrict output volume with LIMIT, and search case-insensitively with ILIKE.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "PG-05",
    path: "/learn/postgresql/pg06-filter-sort-limit",
    color: "purple",
  },
  {
    code: "PG-07",
    slug: "pg07-null-and-missing-values",
    name: "NULL and Missing Values",
    phaseId: "find-and-combine-data",
    phaseNumber: 2,
    stepNumber: 7,
    desc: "Master SQL's three-valued logic (TRUE, FALSE, UNKNOWN) and understand why you must always use IS NULL and IS NOT NULL instead of = NULL.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "PG-06",
    path: "/learn/postgresql/pg07-null-and-missing-values",
    color: "purple",
  },
  {
    code: "PG-08",
    slug: "pg08-relationships-and-foreign-keys",
    name: "Relationships and Foreign Keys",
    phaseId: "find-and-combine-data",
    phaseNumber: 2,
    stepNumber: 8,
    desc: "Model one-to-many relationships by connecting child rows to parent primary keys with REFERENCES foreign key constraints.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "PG-07",
    path: "/learn/postgresql/pg08-relationships-and-foreign-keys",
    color: "purple",
  },
  {
    code: "PG-09",
    slug: "pg09-join-related-tables",
    name: "JOIN — Read Data from Related Tables",
    phaseId: "find-and-combine-data",
    phaseNumber: 2,
    stepNumber: 9,
    desc: "Combine related records across tables using INNER JOIN and preserve unmatched left-table records using inclusive LEFT JOINs.",
    estimatedMinutes: 30,
    xpReward: 80,
    prerequisite: "PG-08",
    path: "/learn/postgresql/pg09-join-related-tables",
    color: "purple",
  },
  {
    code: "PG-10",
    slug: "pg10-aggregate-functions-group-by-having",
    name: "Aggregate Functions, GROUP BY, and HAVING",
    phaseId: "find-and-combine-data",
    phaseNumber: 2,
    stepNumber: 10,
    desc: "Calculate summary metrics with COUNT, SUM, and AVG, segment records with GROUP BY, and filter grouped calculations with HAVING.",
    estimatedMinutes: 30,
    xpReward: 80,
    prerequisite: "PG-09",
    path: "/learn/postgresql/pg10-aggregate-functions-group-by-having",
    color: "purple",
  },
  {
    code: "PG-11",
    slug: "pg11-subqueries-and-ctes",
    name: "Subqueries and Common Table Expressions (CTEs)",
    phaseId: "find-and-combine-data",
    phaseNumber: 2,
    stepNumber: 11,
    desc: "Break complex analytical transformations into clean, readable, modular steps using nested subqueries and named CTEs with the WITH clause.",
    estimatedMinutes: 30,
    xpReward: 80,
    prerequisite: "PG-10",
    path: "/learn/postgresql/pg11-subqueries-and-ctes",
    color: "purple",
  },

  // Phase 3: Keep Data Correct and Safe
  {
    code: "PG-12",
    slug: "pg12-update-and-returning",
    name: "UPDATE Carefully and Use RETURNING",
    phaseId: "keep-data-correct-and-safe",
    phaseNumber: 3,
    stepNumber: 12,
    desc: "Execute targeted updates and eliminate extra SELECT roundtrips by returning mutated or inserted rows directly using PostgreSQL's RETURNING clause.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "PG-11",
    path: "/learn/postgresql/pg12-update-and-returning",
    color: "purple",
  },
  {
    code: "PG-13",
    slug: "pg13-transactions-and-acid",
    name: "Transactions and ACID",
    phaseId: "keep-data-correct-and-safe",
    phaseNumber: 3,
    stepNumber: 13,
    desc: "Guarantee all-or-nothing execution with BEGIN, COMMIT, and ROLLBACK, and master the four ACID guarantees that protect financial data.",
    estimatedMinutes: 30,
    xpReward: 80,
    prerequisite: "PG-12",
    path: "/learn/postgresql/pg13-transactions-and-acid",
    color: "purple",
  },
  {
    code: "PG-14",
    slug: "pg14-database-design-and-normalization",
    name: "Database Design and Normalization",
    phaseId: "keep-data-correct-and-safe",
    phaseNumber: 3,
    stepNumber: 14,
    desc: "Design clean relational schemas to eliminate redundancy, avoid update anomalies, and maintain a strict single source of truth.",
    estimatedMinutes: 30,
    xpReward: 80,
    prerequisite: "PG-13",
    path: "/learn/postgresql/pg14-database-design-and-normalization",
    color: "purple",
  },
  {
    code: "PG-15",
    slug: "pg15-indexes-find-rows-faster",
    name: "Indexes — Find Rows Faster",
    phaseId: "keep-data-correct-and-safe",
    phaseNumber: 3,
    stepNumber: 15,
    desc: "Accelerate query lookups with B-Tree indexes, identify when to index foreign keys, and balance read speed against insert/update overhead.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "PG-14",
    path: "/learn/postgresql/pg15-indexes-find-rows-faster",
    color: "purple",
  },
  {
    code: "PG-16",
    slug: "pg16-query-plan-explain",
    name: "Read a Query Plan with EXPLAIN",
    phaseId: "keep-data-correct-and-safe",
    phaseNumber: 3,
    stepNumber: 16,
    desc: "Dissect optimizer query execution plans, identify sequential table scans vs index scans, and measure actual execution with EXPLAIN (ANALYZE, BUFFERS).",
    estimatedMinutes: 30,
    xpReward: 80,
    prerequisite: "PG-15",
    path: "/learn/postgresql/pg16-query-plan-explain",
    color: "purple",
  },
  {
    code: "PG-17",
    slug: "pg17-views",
    name: "Views",
    phaseId: "keep-data-correct-and-safe",
    phaseNumber: 3,
    stepNumber: 17,
    desc: "Encapsulate reusable, complex queries into virtual tables that simplify application code, centralize business logic, and protect sensitive columns.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "PG-16",
    path: "/learn/postgresql/pg17-views",
    color: "purple",
  },
  {
    code: "PG-18",
    slug: "pg18-jsonb-store-and-read",
    name: "JSONB — Store and Read JSON Data",
    phaseId: "keep-data-correct-and-safe",
    phaseNumber: 3,
    stepNumber: 18,
    desc: "Leverage hybrid relational-document storage in PostgreSQL by storing semi-structured JSON payloads and extracting fields with the ->> operator.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "PG-17",
    path: "/learn/postgresql/pg18-jsonb-store-and-read",
    color: "purple",
  },

  // Phase 4: Work with Data Efficiently and Safely
  {
    code: "PG-19",
    slug: "pg19-pagination-limit-offset-keyset",
    name: "Pagination — Return Data in Small Pages",
    phaseId: "work-with-data-efficiently-and-safely",
    phaseNumber: 4,
    stepNumber: 19,
    desc: "Avoid transferring massive datasets using LIMIT/OFFSET pagination, and master high-performance Keyset cursor pagination for large tables.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "PG-18",
    path: "/learn/postgresql/pg19-pagination-limit-offset-keyset",
    color: "purple",
  },
  {
    code: "PG-20",
    slug: "pg20-safe-queries-and-sql-injection",
    name: "Safe Queries and SQL Injection",
    phaseId: "work-with-data-efficiently-and-safely",
    phaseNumber: 4,
    stepNumber: 20,
    desc: "Protect your database against SQL injection vulnerabilities by separating SQL syntax from user data using parameterized queries ($1, $2).",
    estimatedMinutes: 30,
    xpReward: 80,
    prerequisite: "PG-19",
    path: "/learn/postgresql/pg20-safe-queries-and-sql-injection",
    color: "purple",
  },
  {
    code: "PG-21",
    slug: "pg21-database-roles-and-permissions",
    name: "Database Roles and Permissions",
    phaseId: "work-with-data-efficiently-and-safely",
    phaseNumber: 4,
    stepNumber: 21,
    desc: "Apply the principle of least privilege using PostgreSQL database roles, schemas, and granular GRANT permissions instead of using superusers.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "PG-20",
    path: "/learn/postgresql/pg21-database-roles-and-permissions",
    color: "purple",
  },
  {
    code: "PG-22",
    slug: "pg22-backups-and-restoring-data",
    name: "Backups and Restoring Data",
    phaseId: "work-with-data-efficiently-and-safely",
    phaseNumber: 4,
    stepNumber: 22,
    desc: "Implement reliable disaster recovery using pg_dump custom format archives and verify data safety through regular automated restore drills.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "PG-21",
    path: "/learn/postgresql/pg22-backups-and-restoring-data",
    color: "purple",
  },
];

// ─────────────────────────────────────────────────────────────
// Capstone Project Definition
// ─────────────────────────────────────────────────────────────

export const POSTGRESQL_CAPSTONE: CapstoneProjectMeta = {
  id: "capstone-ecommerce-db",
  stageNumber: 4,
  slug: "ecommerce-database",
  title: "ShopSphere — Relational Database Architecture & Analytics Engine",
  subtitle: "Production Schema Design, Referential Integrity, ACID Checkout & Performance Tuning",
  desc: "Design and implement a complete, highly-scalable relational e-commerce database. Define normalized tables with foreign keys and check constraints, write complex analytical joins and CTEs, execute an atomic inventory-safe checkout transaction, create B-Tree indexes, and verify performance with EXPLAIN ANALYZE.",
  path: "/learn/postgresql/projects/ecommerce-database",
  badge: "Capstone",
  xpReward: 500,
  estimatedMinutes: 90,
  keyFeatures: [
    "Normalized schema: customers, products, orders, order_items, and categories",
    "Integrity constraints: CHECK (price >= 0), UNIQUE (email, sku), and NOT NULL fields",
    "Foreign keys with referential actions (REFERENCES customers(id))",
    "Multi-step ACID checkout transaction with BEGIN, COMMIT, and ROLLBACK",
    "Executive analytical reporting using CTEs (WITH), aggregates, and GROUP BY / HAVING",
    "Query plan optimization with B-Tree indexes and EXPLAIN (ANALYZE, BUFFERS)",
    "Parameterized query integration preventing SQL injection vulnerabilities",
  ],
};

// ─────────────────────────────────────────────────────────────
// Roadmap Stages Mapping
// ─────────────────────────────────────────────────────────────

export interface StageMeta {
  id: string;
  stageNumber: number;
  name: string;
  subtitle: string;
  description: string;
  theme: {
    badge: string;
    dot: string;
    border: string;
    bgSubtle: string;
    textAccent: string;
  };
  lessons: LessonMeta[];
  capstone?: CapstoneProjectMeta;
}

export const POSTGRESQL_STAGES: StageMeta[] = POSTGRESQL_PROGRESSION_PHASES.map((phase) => ({
  id: phase.id,
  stageNumber: phase.phaseNumber,
  name: phase.name,
  subtitle: phase.scope,
  description: phase.desc,
  theme: {
    badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    dot: "bg-purple-400",
    border: "border-purple-500/30",
    bgSubtle: "bg-purple-500/[0.03]",
    textAccent: "text-purple-400",
  },
  lessons: POSTGRESQL_LESSONS.filter((l) => l.phaseId === phase.id),
  capstone: phase.phaseNumber === 4 ? POSTGRESQL_CAPSTONE : undefined,
}));

// ─────────────────────────────────────────────────────────────
// Related / Next Topics
// ─────────────────────────────────────────────────────────────

export const POSTGRESQL_RELATED_TOPICS = [
  {
    id: "rel-nodejs",
    title: "Node.js",
    desc: "Connect your backend runtime directly to PostgreSQL using connection pools and the native pg driver.",
    badge: "Runtime",
    path: "/learn/nodejs",
  },
  {
    id: "rel-express",
    title: "Express.js",
    desc: "Expose relational database data through high-speed, well-structured REST API endpoints.",
    badge: "Framework",
    path: "/learn/express",
  },
  {
    id: "rel-nestjs",
    title: "NestJS",
    desc: "Build enterprise microservices with dependency-injected database modules, repositories, and transaction managers.",
    badge: "Framework",
    path: "/learn/nestjs",
  },
  {
    id: "rel-mongodb",
    title: "MongoDB",
    desc: "Explore the document database paradigm to understand how JSON document models contrast with relational tables.",
    badge: "Database",
    path: "/learn/mongodb",
  },
];

// ─────────────────────────────────────────────────────────────
// Helper Query Functions
// ─────────────────────────────────────────────────────────────

export function getAllLessons(): LessonMeta[] {
  return POSTGRESQL_LESSONS;
}

export function getLessonBySlug(slug: string): LessonMeta | undefined {
  const normalized = slug?.toLowerCase();
  const directMatch = POSTGRESQL_LESSONS.find(
    (l) => l.slug.toLowerCase() === normalized || l.code.toLowerCase() === normalized
  );
  if (directMatch) return directMatch;

  // Fallback to legacy slug alias
  const mappedSlug = POSTGRESQL_LEGACY_SLUG_MAP[normalized];
  if (mappedSlug) {
    return POSTGRESQL_LESSONS.find((l) => l.slug.toLowerCase() === mappedSlug.toLowerCase());
  }

  return undefined;
}

export function getLessonsByPhaseId(phaseId: string): LessonMeta[] {
  return POSTGRESQL_LESSONS.filter((l) => l.phaseId === phaseId);
}

export function getStageByLessonSlug(slug: string): StageMeta | undefined {
  const lesson = getLessonBySlug(slug);
  if (!lesson) return undefined;
  return POSTGRESQL_STAGES.find((s) => s.id === lesson.phaseId);
}

export function getNextLesson(currentSlug: string): LessonMeta | null {
  const lesson = getLessonBySlug(currentSlug);
  if (!lesson) return null;
  const idx = POSTGRESQL_LESSONS.findIndex((l) => l.slug === lesson.slug);
  if (idx === -1 || idx === POSTGRESQL_LESSONS.length - 1) return null;
  return POSTGRESQL_LESSONS[idx + 1];
}

export function getPrevLesson(currentSlug: string): LessonMeta | null {
  const lesson = getLessonBySlug(currentSlug);
  if (!lesson) return null;
  const idx = POSTGRESQL_LESSONS.findIndex((l) => l.slug === lesson.slug);
  if (idx <= 0) return null;
  return POSTGRESQL_LESSONS[idx - 1];
}

export const PROGRESSION_PHASES = POSTGRESQL_PROGRESSION_PHASES;

export function getPostgresqlCourse(): Course {
  const allLessons = getAllLessons();
  return {
    id: "postgresql",
    title: "Learn PostgreSQL",
    prerequisites: {
      items: [
        "Basic SQL concepts: tables, rows, columns, and data types",
        "Fundamental understanding of databases and persistent data storage",
        "Familiarity with terminal commands and client tools",
      ],
      refresherHref: "/learn/nodejs",
      refresherLabel: "Need a refresher? Open the Node.js curriculum",
    },
    capstone: {
      title: POSTGRESQL_CAPSTONE.title,
      description:
        "Your finish line: architect and optimize a complete, production-grade PostgreSQL relational database featuring normalized tables, foreign keys, ACID transactions, and query plan optimization with EXPLAIN ANALYZE.",
      href: POSTGRESQL_CAPSTONE.path,
    },
    phases: POSTGRESQL_PROGRESSION_PHASES.map((phase) => ({
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

export const getPostgreSQLCourse = getPostgresqlCourse;
