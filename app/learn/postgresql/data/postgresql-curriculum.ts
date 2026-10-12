/**
 * PostgreSQL Curriculum Data Layer — LearnCraft
 * 11 Phases, 29 In-Depth Lessons, and 1 Comprehensive Capstone Project.
 *
 * Strict Topic Boundary: Pure PostgreSQL relational database only.
 * Focuses on relational model, databases/schemas/tables, data types, DDL/DML,
 * filtering/sorting/pagination, joins (INNER, LEFT, RIGHT, FULL), modeling relationships,
 * aggregation, HAVING, CTEs, window functions, upserts (ON CONFLICT), normalization (1NF-3NF),
 * JSONB, constraints, referential actions, transactions (ACID), isolation levels,
 * B-Tree indexes, EXPLAIN / EXPLAIN ANALYZE, query debugging, and production best practices.
 */

import type { Course } from "@/components/curriculum/types";

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
    id: "fundamentals",
    phaseNumber: 1,
    name: "PostgreSQL Fundamentals & Relational Model",
    label: "Phase 01: PostgreSQL Fundamentals & Relational Model",
    desc: "Understand what PostgreSQL is, why the relational model excels for structured data, the cluster/database/schema hierarchy, and core data types.",
    scope: "Relational Paradigm · Database vs Schema · Data Types · psql Tools",
    lessonCodes: ["PG-01", "PG-02", "PG-03"],
  },
  {
    id: "tables-crud",
    phaseNumber: 2,
    name: "Defining Tables & Core CRUD Operations",
    label: "Phase 02: Defining Tables & Core CRUD Operations",
    desc: "Create tables cleanly with DDL, insert records, project columns, execute safe updates and deletes, and leverage PostgreSQL's RETURNING clause.",
    scope: "CREATE TABLE · INSERT · SELECT · UPDATE · DELETE · RETURNING",
    lessonCodes: ["PG-04", "PG-05", "PG-06", "PG-07"],
  },
  {
    id: "filtering-pagination",
    phaseNumber: 3,
    name: "Filtering, Sorting & Result Control",
    label: "Phase 03: Filtering, Sorting & Result Control",
    desc: "Filter rows with precision using WHERE, master SQL's three-valued NULL logic, and implement performant sorting and pagination.",
    scope: "WHERE Clauses · Three-Valued NULL · ORDER BY · LIMIT & OFFSET · Keyset",
    lessonCodes: ["PG-08", "PG-09", "PG-10"],
  },
  {
    id: "relationships-joins",
    phaseNumber: 4,
    name: "Relationships & Multi-Table Joins",
    label: "Phase 04: Relationships & Multi-Table Joins",
    desc: "Connect data with foreign keys and master INNER, LEFT, RIGHT joins alongside 1-to-1, 1-to-many, and many-to-many junction table designs.",
    scope: "Foreign Keys · INNER JOIN · LEFT JOIN · Junction Tables",
    lessonCodes: ["PG-11", "PG-12", "PG-13", "PG-14"],
  },
  {
    id: "aggregation-ctes",
    phaseNumber: 5,
    name: "Aggregation & Analytical Queries",
    label: "Phase 05: Aggregation & Analytical Queries",
    desc: "Compute summary metrics with aggregate functions, filter groups with HAVING, and construct clean multi-step queries with Common Table Expressions (CTEs).",
    scope: "COUNT/SUM/AVG · GROUP BY · HAVING · Subqueries · CTEs (WITH)",
    lessonCodes: ["PG-15", "PG-16", "PG-17"],
  },
  {
    id: "advanced-features",
    phaseNumber: 6,
    name: "Window Functions & Idempotent Upserts",
    label: "Phase 06: Window Functions & Idempotent Upserts",
    desc: "Calculate running metrics and rankings with window functions (OVER / PARTITION BY) and execute atomic upserts with ON CONFLICT.",
    scope: "Window Functions · ROW_NUMBER & RANK · ON CONFLICT DO UPDATE",
    lessonCodes: ["PG-18", "PG-19"],
  },
  {
    id: "data-modeling",
    phaseNumber: 7,
    name: "Relational Modeling, Normalization & JSONB",
    label: "Phase 07: Relational Modeling, Normalization & JSONB",
    desc: "Structure relational schemas using 1NF, 2NF, and 3NF, identify when to denormalize for read speed, and leverage semi-structured JSONB columns.",
    scope: "1NF, 2NF, 3NF · Normalization vs Denormalization · JSONB Columns",
    lessonCodes: ["PG-20", "PG-21", "PG-22"],
  },
  {
    id: "constraints-integrity",
    phaseNumber: 8,
    name: "Constraints & Data Integrity",
    label: "Phase 08: Constraints & Data Integrity",
    desc: "Enforce strict data validity at the database boundary using CHECK, UNIQUE, and NOT NULL, and manage cascades with ON DELETE referential actions.",
    scope: "CHECK Constraints · UNIQUE & NOT NULL · ON DELETE CASCADE/RESTRICT",
    lessonCodes: ["PG-23", "PG-24"],
  },
  {
    id: "transactions-concurrency",
    phaseNumber: 9,
    name: "Transactions, ACID & Concurrency",
    label: "Phase 09: Transactions, ACID & Concurrency",
    desc: "Guarantee all-or-nothing atomicity with BEGIN, COMMIT, and ROLLBACK, and navigate concurrent reads and writes across transaction isolation levels.",
    scope: "ACID Guarantees · BEGIN/COMMIT/ROLLBACK · Isolation Levels · Row Locks",
    lessonCodes: ["PG-25", "PG-26"],
  },
  {
    id: "indexes-performance",
    phaseNumber: 10,
    name: "Indexes & Query Performance",
    label: "Phase 10: Indexes & Query Performance",
    desc: "Accelerate reads and prevent sequential table scans using B-Tree and compound indexes, and dissect execution plans with EXPLAIN ANALYZE.",
    scope: "B-Tree Indexes · Compound Indexes · EXPLAIN ANALYZE · Seq vs Index Scan",
    lessonCodes: ["PG-27", "PG-28"],
  },
  {
    id: "debugging-mastery",
    phaseNumber: 11,
    name: "Debugging & Production Best Practices",
    label: "Phase 11: Debugging & Production Best Practices",
    desc: "Diagnose common constraint errors and slow queries, avoid anti-patterns, and apply production checklists for connection pooling and schema migrations.",
    scope: "Error Diagnosis · Missing Foreign Key Indexes · Pooling · Production Sizing",
    lessonCodes: ["PG-29"],
  },
];

export const POSTGRESQL_LESSONS: LessonMeta[] = [
  // Phase 1: PostgreSQL Fundamentals & Relational Model
  {
    code: "PG-01",
    slug: "pg01-what-is-postgresql",
    name: "What Is PostgreSQL & The Relational Paradigm",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 1,
    desc: "Understand what PostgreSQL is, why the relational model organizes data into strict tables, and how ACID guarantees protect data integrity.",
    estimatedMinutes: 15,
    xpReward: 50,
    path: "/learn/postgresql/pg01-what-is-postgresql",
    color: "purple",
  },
  {
    code: "PG-02",
    slug: "pg02-databases-schemas-tables",
    name: "PostgreSQL Hierarchy: Databases, Schemas & Tables",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 2,
    desc: "Explore PostgreSQL's multi-tenant architecture: database clusters, logical databases, schemas (public vs tenant), and table relations.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "PG-01",
    path: "/learn/postgresql/pg02-databases-schemas-tables",
    color: "purple",
  },
  {
    code: "PG-03",
    slug: "pg03-core-data-types",
    name: "Core Data Types: Integers, Text, Decimals & Timestamps",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 3,
    desc: "Select the optimal column data types: INT vs BIGINT, VARCHAR vs TEXT, financial accuracy with NUMERIC/DECIMAL, TIMESTAMPTZ, and UUIDs.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "PG-02",
    path: "/learn/postgresql/pg03-core-data-types",
    color: "purple",
  },

  // Phase 2: Defining Tables & Core CRUD Operations
  {
    code: "PG-04",
    slug: "pg04-create-table-ddl",
    name: "Defining Tables: CREATE TABLE & Safe Alterations",
    phaseId: "tables-crud",
    phaseNumber: 2,
    stepNumber: 4,
    desc: "Author clean table schemas with column defaults, auto-incrementing identity keys, and safely add or drop columns with ALTER TABLE.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "PG-03",
    path: "/learn/postgresql/pg04-create-table-ddl",
    color: "purple",
  },
  {
    code: "PG-05",
    slug: "pg05-insert-and-select",
    name: "Inserting & Reading Rows (INSERT INTO & SELECT)",
    phaseId: "tables-crud",
    phaseNumber: 2,
    stepNumber: 5,
    desc: "Insert single and batch rows, understand column projections, avoid the pitfalls of SELECT *, and use column aliases for readable outputs.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "PG-04",
    path: "/learn/postgresql/pg05-insert-and-select",
    color: "purple",
  },
  {
    code: "PG-06",
    slug: "pg06-update-and-delete",
    name: "Modifying & Deleting Data (UPDATE, DELETE & Safety Guards)",
    phaseId: "tables-crud",
    phaseNumber: 2,
    stepNumber: 6,
    desc: "Update specific rows with atomic increments, remove rows safely using WHERE filters, and understand soft deletes vs physical deletes.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "PG-05",
    path: "/learn/postgresql/pg06-update-and-delete",
    color: "purple",
  },
  {
    code: "PG-07",
    slug: "pg07-returning-clause",
    name: "PostgreSQL Superpower: The RETURNING Clause",
    phaseId: "tables-crud",
    phaseNumber: 2,
    stepNumber: 7,
    desc: "Eliminate roundtrip queries by returning generated IDs, mutated timestamps, or deleted snapshots directly from INSERT, UPDATE, and DELETE.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "PG-06",
    path: "/learn/postgresql/pg07-returning-clause",
    color: "purple",
  },

  // Phase 3: Filtering, Sorting & Result Control
  {
    code: "PG-08",
    slug: "pg08-where-filtering-operators",
    name: "Filtering Rows: WHERE, Comparison & Logical Operators",
    phaseId: "filtering-pagination",
    phaseNumber: 3,
    stepNumber: 8,
    desc: "Combine complex filter predicates using =, <>, >, <=, IN, BETWEEN, AND, OR, NOT, and case-insensitive pattern matching with ILIKE.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "PG-07",
    path: "/learn/postgresql/pg08-where-filtering-operators",
    color: "purple",
  },
  {
    code: "PG-09",
    slug: "pg09-null-three-valued-logic",
    name: "The Three-Valued Logic of NULL in SQL",
    phaseId: "filtering-pagination",
    phaseNumber: 3,
    stepNumber: 9,
    desc: "Master SQL's TRUE/FALSE/UNKNOWN logic: why NULL = NULL is never true, how to check IS NULL, and providing safe fallback values with COALESCE.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "PG-08",
    path: "/learn/postgresql/pg09-null-three-valued-logic",
    color: "purple",
  },
  {
    code: "PG-10",
    slug: "pg10-ordering-and-pagination",
    name: "Ordering & Pagination: ORDER BY, LIMIT, OFFSET & Keyset",
    phaseId: "filtering-pagination",
    phaseNumber: 3,
    stepNumber: 10,
    desc: "Order records deterministically, implement UI pagination, and understand why large OFFSET values cause severe performance degradation.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "PG-09",
    path: "/learn/postgresql/pg10-ordering-and-pagination",
    color: "purple",
  },

  // Phase 4: Relationships & Multi-Table Joins
  {
    code: "PG-11",
    slug: "pg11-primary-foreign-keys",
    name: "Primary Keys & Foreign Key References",
    phaseId: "relationships-joins",
    phaseNumber: 4,
    stepNumber: 11,
    desc: "Define entity identities with PRIMARY KEY and establish relational constraints with FOREIGN KEY ... REFERENCES to guarantee referential integrity.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "PG-10",
    path: "/learn/postgresql/pg11-primary-foreign-keys",
    color: "purple",
  },
  {
    code: "PG-12",
    slug: "pg12-inner-join-multi-table",
    name: "Combining Related Tables: INNER JOIN",
    phaseId: "relationships-joins",
    phaseNumber: 4,
    stepNumber: 12,
    desc: "Connect records across tables where foreign keys match, understand table aliases, and query data across three or more joined tables.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "PG-11",
    path: "/learn/postgresql/pg12-inner-join-multi-table",
    color: "purple",
  },
  {
    code: "PG-13",
    slug: "pg13-outer-joins-left-right",
    name: "Preserving Unmatched Data: LEFT JOIN & RIGHT JOIN",
    phaseId: "relationships-joins",
    phaseNumber: 4,
    stepNumber: 13,
    desc: "Include parent records even when related child rows are missing, and locate orphans or inactive records using LEFT JOIN ... WHERE child.id IS NULL.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "PG-12",
    path: "/learn/postgresql/pg13-outer-joins-left-right",
    color: "purple",
  },
  {
    code: "PG-14",
    slug: "pg14-modeling-cardinality",
    name: "Modeling Relationships: 1-to-1, 1-to-N & Junction Tables",
    phaseId: "relationships-joins",
    phaseNumber: 4,
    stepNumber: 14,
    desc: "Design real-world relational models: 1-to-1 with unique foreign keys, 1-to-many child foreign keys, and many-to-many junction bridge tables.",
    estimatedMinutes: 30,
    xpReward: 80,
    prerequisite: "PG-13",
    path: "/learn/postgresql/pg14-modeling-cardinality",
    color: "purple",
  },

  // Phase 5: Aggregation & Analytical Queries
  {
    code: "PG-15",
    slug: "pg15-aggregate-functions-group-by",
    name: "Aggregate Functions & Grouping (COUNT, SUM, AVG, GROUP BY)",
    phaseId: "aggregation-ctes",
    phaseNumber: 5,
    stepNumber: 15,
    desc: "Calculate aggregate statistics over datasets, group rows by category with GROUP BY, and combine counts and sums into executive summary reports.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "PG-14",
    path: "/learn/postgresql/pg15-aggregate-functions-group-by",
    color: "purple",
  },
  {
    code: "PG-16",
    slug: "pg16-having-vs-where",
    name: "Filtering Aggregated Groups: HAVING vs WHERE",
    phaseId: "aggregation-ctes",
    phaseNumber: 5,
    stepNumber: 16,
    desc: "Master SQL's execution order: why WHERE filters rows before aggregation and HAVING filters aggregated group metrics (e.g., HAVING COUNT(*) > 5).",
    estimatedMinutes: 20,
    xpReward: 70,
    prerequisite: "PG-15",
    path: "/learn/postgresql/pg16-having-vs-where",
    color: "purple",
  },
  {
    code: "PG-17",
    slug: "pg17-subqueries-and-ctes",
    name: "Subqueries & Common Table Expressions (CTEs with WITH)",
    phaseId: "aggregation-ctes",
    phaseNumber: 5,
    stepNumber: 17,
    desc: "Transform deeply nested unreadable subqueries into clear, sequential Common Table Expressions using the WITH clause for complex data pipelines.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "PG-16",
    path: "/learn/postgresql/pg17-subqueries-and-ctes",
    color: "purple",
  },

  // Phase 6: Window Functions & Practical Capabilities
  {
    code: "PG-18",
    slug: "pg18-window-functions",
    name: "Window Functions: ROW_NUMBER, RANK & OVER (PARTITION BY)",
    phaseId: "advanced-features",
    phaseNumber: 6,
    stepNumber: 18,
    desc: "Compute running totals, rankings, and moving averages across row partitions without collapsing individual rows like GROUP BY does.",
    estimatedMinutes: 30,
    xpReward: 90,
    prerequisite: "PG-17",
    path: "/learn/postgresql/pg18-window-functions",
    color: "purple",
  },
  {
    code: "PG-19",
    slug: "pg19-upserts-on-conflict",
    name: "Idempotent Inserts: ON CONFLICT DO UPDATE / NOTHING",
    phaseId: "advanced-features",
    phaseNumber: 6,
    stepNumber: 19,
    desc: "Handle duplicate key conflicts gracefully and atomically: update existing rows using the EXCLUDED pseudo-table or ignore conflicts with DO NOTHING.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "PG-18",
    path: "/learn/postgresql/pg19-upserts-on-conflict",
    color: "purple",
  },

  // Phase 7: Relational Data Modeling & Normalization
  {
    code: "PG-20",
    slug: "pg20-normalization-1nf-2nf-3nf",
    name: "Database Normalization: 1NF, 2NF & 3NF Made Simple",
    phaseId: "data-modeling",
    phaseNumber: 7,
    stepNumber: 20,
    desc: "Eliminate update anomalies and duplicate data: atomic columns (1NF), full key dependencies (2NF), and removing transitive dependencies (3NF).",
    estimatedMinutes: 30,
    xpReward: 90,
    prerequisite: "PG-19",
    path: "/learn/postgresql/pg20-normalization-1nf-2nf-3nf",
    color: "purple",
  },
  {
    code: "PG-21",
    slug: "pg21-strategic-denormalization",
    name: "Strategic Denormalization & Read Optimization",
    phaseId: "data-modeling",
    phaseNumber: 7,
    stepNumber: 21,
    desc: "Recognize when strict normalization hurts read performance, store immutable snapshots (historical item pricing), and balance consistency vs speed.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "PG-20",
    path: "/learn/postgresql/pg21-strategic-denormalization",
    color: "purple",
  },
  {
    code: "PG-22",
    slug: "pg22-jsonb-semi-structured-data",
    name: "Working with Semi-Structured Data: PostgreSQL JSONB",
    phaseId: "data-modeling",
    phaseNumber: 7,
    stepNumber: 22,
    desc: "Store dynamic document attributes in binary JSON (JSONB), query nested keys with -> and ->>, index with GIN, and know when relational beats JSONB.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "PG-21",
    path: "/learn/postgresql/pg22-jsonb-semi-structured-data",
    color: "purple",
  },

  // Phase 8: Constraints & Data Integrity
  {
    code: "PG-23",
    slug: "pg23-constraints-integrity",
    name: "Integrity Constraints: UNIQUE, NOT NULL & CHECK",
    phaseId: "constraints-integrity",
    phaseNumber: 8,
    stepNumber: 23,
    desc: "Defend your database at the engine level: enforce valid non-negative quantities with CHECK, guarantee unique emails, and reject invalid states.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "PG-22",
    path: "/learn/postgresql/pg23-constraints-integrity",
    color: "purple",
  },
  {
    code: "PG-24",
    slug: "pg24-foreign-key-referential-actions",
    name: "Referential Actions: ON DELETE CASCADE vs RESTRICT",
    phaseId: "constraints-integrity",
    phaseNumber: 8,
    stepNumber: 24,
    desc: "Control what happens when referenced rows are removed: safely delete child line items with CASCADE or protect critical records with RESTRICT.",
    estimatedMinutes: 20,
    xpReward: 70,
    prerequisite: "PG-23",
    path: "/learn/postgresql/pg24-foreign-key-referential-actions",
    color: "purple",
  },

  // Phase 9: Transactions, ACID & Concurrency
  {
    code: "PG-25",
    slug: "pg25-transactions-acid-foundations",
    name: "ACID Foundations: BEGIN, COMMIT & ROLLBACK",
    phaseId: "transactions-concurrency",
    phaseNumber: 9,
    stepNumber: 25,
    desc: "Guarantee all-or-nothing atomicity for multi-step mutations (e.g., money transfers), handle operational failures with ROLLBACK, and define savepoints.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "PG-24",
    path: "/learn/postgresql/pg25-transactions-acid-foundations",
    color: "purple",
  },
  {
    code: "PG-26",
    slug: "pg26-isolation-levels-concurrency",
    name: "Concurrency & Transaction Isolation Levels",
    phaseId: "transactions-concurrency",
    phaseNumber: 9,
    stepNumber: 26,
    desc: "Navigate concurrent database access: understand dirty reads, non-repeatable reads, READ COMMITTED vs SERIALIZABLE, and row locking with SELECT FOR UPDATE.",
    estimatedMinutes: 30,
    xpReward: 90,
    prerequisite: "PG-25",
    path: "/learn/postgresql/pg26-isolation-levels-concurrency",
    color: "purple",
  },

  // Phase 10: Indexes & Query Performance
  {
    code: "PG-27",
    slug: "pg27-indexes-btree-compound",
    name: "How Indexes Work: B-Tree, Compound & Unique Indexes",
    phaseId: "indexes-performance",
    phaseNumber: 10,
    stepNumber: 27,
    desc: "Understand B-Tree search trees, craft multi-column compound indexes using the leftmost prefix rule, and account for write overhead and index maintenance.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "PG-26",
    path: "/learn/postgresql/pg27-indexes-btree-compound",
    color: "purple",
  },
  {
    code: "PG-28",
    slug: "pg28-explain-analyze-query-plans",
    name: "Dissecting Execution Plans: EXPLAIN & EXPLAIN ANALYZE",
    phaseId: "indexes-performance",
    phaseNumber: 10,
    stepNumber: 28,
    desc: "Read PostgreSQL execution plans: Seq Scan vs Index Scan vs Bitmap Index Scan, estimated startup vs actual execution time, and locating bottlenecks.",
    estimatedMinutes: 30,
    xpReward: 90,
    prerequisite: "PG-27",
    path: "/learn/postgresql/pg28-explain-analyze-query-plans",
    color: "purple",
  },

  // Phase 11: Debugging & Production Best Practices
  {
    code: "PG-29",
    slug: "pg29-debugging-production-best-practices",
    name: "Debugging Common PostgreSQL Errors & Production Best Practices",
    phaseId: "debugging-mastery",
    phaseNumber: 11,
    stepNumber: 29,
    desc: "Decipher constraint violations, index missing foreign keys, understand connection pooling sizing, and follow safe zero-downtime migration checklists.",
    estimatedMinutes: 30,
    xpReward: 90,
    prerequisite: "PG-28",
    path: "/learn/postgresql/pg29-debugging-production-best-practices",
    color: "purple",
  },
];

// ─────────────────────────────────────────────────────────────
// Prerequisites
// ─────────────────────────────────────────────────────────────

export interface PrerequisiteItem {
  id: string;
  title: string;
  desc: string;
  category: "required" | "recommended";
  icon: string;
}

export const POSTGRESQL_PREREQUISITES: PrerequisiteItem[] = [
  {
    id: "req-prog",
    title: "Basic Programming Concepts",
    desc: "Variables, conditions, functions, and understanding how backend software manipulates data.",
    category: "required",
    icon: "💻",
  },
  {
    id: "req-data",
    title: "Understanding of Structured Data",
    desc: "Familiarity with tabular records (rows and columns) and basic primitive types (numbers, text).",
    category: "required",
    icon: "📊",
  },
  {
    id: "rec-cli",
    title: "Command-Line Basics",
    desc: "Running basic commands in a terminal or console shell for tools like psql.",
    category: "recommended",
    icon: "⌨️",
  },
  {
    id: "rec-sql",
    title: "SQL Fundamentals (Optional)",
    desc: "Basic familiarity with SQL syntax helps, though all essential concepts are taught directly.",
    category: "recommended",
    icon: "🐘",
  },
];

// ─────────────────────────────────────────────────────────────
// Capstone Project Specification
// ─────────────────────────────────────────────────────────────

export const POSTGRESQL_CAPSTONE: CapstoneProjectMeta = {
  id: "capstone-ecommerce-db",
  stageNumber: 12,
  slug: "ecommerce-database",
  title: "ShopSphere — Relational Database Architecture & Analytics Engine",
  subtitle: "Production Schema Design, Referential Integrity, ACID Checkout & Performance Tuning",
  desc: "Design and implement a complete, highly-scalable relational e-commerce database. Define 3NF normalized tables with foreign keys and check constraints, write complex analytical joins and CTEs, execute an atomic inventory-safe checkout transaction, create compound B-Tree indexes, and verify performance with EXPLAIN ANALYZE.",
  path: "/learn/postgresql/projects/ecommerce-database",
  badge: "Capstone",
  xpReward: 500,
  estimatedMinutes: 90,
  keyFeatures: [
    "Normalized 3NF schema: users, categories, products, orders, order_items, inventory",
    "Integrity constraints: CHECK (price > 0), UNIQUE (email), NOT NULL and status ENUMs",
    "Foreign keys with referential actions (ON DELETE RESTRICT vs CASCADE)",
    "Idempotent inventory upsert using INSERT INTO ... ON CONFLICT (product_id) DO UPDATE",
    "Multi-step ACID checkout transaction with row locking (SELECT ... FOR UPDATE) and balance transfer",
    "Executive analytical reporting using CTEs, window functions (RANK() OVER), and GROUP BY",
    "Compound index on (status, created_at DESC) and execution plan verification with EXPLAIN ANALYZE",
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
  capstone: phase.phaseNumber === 11 ? POSTGRESQL_CAPSTONE : undefined,
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
  return POSTGRESQL_LESSONS.find(
    (l) => l.slug.toLowerCase() === slug.toLowerCase() || l.code.toLowerCase() === slug.toLowerCase()
  );
}

export function getLessonsByPhaseId(phaseId: string): LessonMeta[] {
  return POSTGRESQL_LESSONS.filter((l) => l.phaseId === phaseId);
}

export function getStageByLessonSlug(slug: string): PhaseMeta | undefined {
  const lesson = getLessonBySlug(slug);
  if (!lesson) return undefined;
  return POSTGRESQL_PROGRESSION_PHASES.find((p) => p.id === lesson.phaseId);
}

export function getNextLesson(currentSlug: string): LessonMeta | null {
  const idx = POSTGRESQL_LESSONS.findIndex(
    (l) => l.slug.toLowerCase() === currentSlug.toLowerCase() || l.code.toLowerCase() === currentSlug.toLowerCase()
  );
  if (idx === -1 || idx === POSTGRESQL_LESSONS.length - 1) return null;
  return POSTGRESQL_LESSONS[idx + 1];
}

export function getPrevLesson(currentSlug: string): LessonMeta | null {
  const idx = POSTGRESQL_LESSONS.findIndex(
    (l) => l.slug.toLowerCase() === currentSlug.toLowerCase() || l.code.toLowerCase() === currentSlug.toLowerCase()
  );
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
        "Your finish line: architect and optimize a complete, production-grade PostgreSQL relational database featuring 3NF normalization, foreign key cascades, ACID transactions with row locks, and window function analytics.",
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
