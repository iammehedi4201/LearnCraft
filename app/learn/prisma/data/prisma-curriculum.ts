/**
 * Prisma Curriculum Data Layer — LearnCraft
 * 10 Progressive Phases, 27 In-Depth Lessons, and 1 Comprehensive Capstone Project.
 *
 * Strict Topic Boundary: Pure Prisma ORM & Data-Access Layer only.
 * Focuses on Prisma Schema modeling, Prisma Client CRUD, Relations (1:1, 1:N, M:N),
 * Nested operations, Filtering & Pagination, Migrations & Schema Evolution,
 * Transactions & Concurrency, Error Handling, and Generated Types.
 */

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
    id: "fundamentals",
    phaseNumber: 1,
    name: "Prisma Fundamentals & Architecture",
    label: "Phase 01: Prisma Fundamentals & Architecture",
    desc: "Understand what Prisma is, why ORMs bridge applications to databases, the declarative schema single source of truth, and project setup.",
    scope: "What is Prisma · High-Level Architecture · Prisma CLI & Project Setup",
    lessonCodes: ["PRI-01", "PRI-02", "PRI-03"],
  },
  {
    id: "data-modeling",
    phaseNumber: 2,
    name: "Prisma Schema & Data Modeling",
    label: "Phase 02: Prisma Schema & Data Modeling",
    desc: "Define entity models, scalar field types, primary keys, defaults, constraints, enums, and database column/table mappings.",
    scope: "Models & Fields · Scalar Types · @id, @default & @unique · Enums & @map",
    lessonCodes: ["PRI-04", "PRI-05", "PRI-06"],
  },
  {
    id: "relations",
    phaseNumber: 3,
    name: "Relations & Structural Connections",
    label: "Phase 03: Relations & Structural Connections",
    desc: "Master connections between models: Foreign keys vs virtual relation fields, 1-to-1, 1-to-many, and implicit vs explicit many-to-many.",
    scope: "Relational Mental Model · One-to-One · One-to-Many · Many-to-Many",
    lessonCodes: ["PRI-07", "PRI-08", "PRI-09"],
  },
  {
    id: "client-crud",
    phaseNumber: 4,
    name: "Prisma Client Fundamentals & Core CRUD",
    label: "Phase 04: Prisma Client Fundamentals & Core CRUD",
    desc: "Generate the typed client, instantiate singletons safely, and perform foundational reads and mutations.",
    scope: "Prisma Client Setup · findUnique & findMany · create, update & delete",
    lessonCodes: ["PRI-10", "PRI-11", "PRI-12"],
  },
  {
    id: "relation-queries",
    phaseNumber: 5,
    name: "Querying Relations & Nested Operations",
    label: "Phase 05: Querying Relations & Nested Operations",
    desc: "Eagerly load related data with include and select, execute atomic nested writes, and link existing entities with connect.",
    scope: "include vs select · Nested Creates · connect & connectOrCreate · disconnect",
    lessonCodes: ["PRI-13", "PRI-14", "PRI-15"],
  },
  {
    id: "filtering-pagination",
    phaseNumber: 6,
    name: "Filtering, Sorting & Pagination",
    label: "Phase 06: Filtering, Sorting & Pagination",
    desc: "Express complex application queries with comparison operators, relation filters (some/every/none), and offset vs cursor pagination.",
    scope: "Comparison & Logical Filters · some / every / none · Offset vs Cursor Pagination",
    lessonCodes: ["PRI-16", "PRI-17", "PRI-18"],
  },
  {
    id: "migrations",
    phaseNumber: 7,
    name: "Migrations & Schema Evolution",
    label: "Phase 07: Migrations & Schema Evolution",
    desc: "Translate schema changes into deterministic SQL migrations, manage deployment with migrate deploy, and compare with db push.",
    scope: "How Migrations Work · prisma migrate dev · Migration History · db push",
    lessonCodes: ["PRI-19", "PRI-20", "PRI-21"],
  },
  {
    id: "transactions",
    phaseNumber: 8,
    name: "Transactions & Concurrency Control",
    label: "Phase 08: Transactions & Concurrency Control",
    desc: "Ensure atomic consistency across multiple operations with sequential batch transactions and interactive callback transactions.",
    scope: "Why Transactions · Batch $transaction · Interactive $transaction · Rollbacks",
    lessonCodes: ["PRI-22", "PRI-23", "PRI-24"],
  },
  {
    id: "errors-debugging",
    phaseNumber: 9,
    name: "Error Handling & Diagnostic Debugging",
    label: "Phase 09: Error Handling & Diagnostic Debugging",
    desc: "Identify Prisma error codes (P2002, P2025, P1001), enable query logging, inspect execution plans, and browse data with Prisma Studio.",
    scope: "Prisma Error Codes · KnownRequestError · Query Logging · Prisma Studio",
    lessonCodes: ["PRI-25", "PRI-26"],
  },
  {
    id: "types-production",
    phaseNumber: 10,
    name: "Generated Types & Production Architecture",
    label: "Phase 10: Generated Types & Production Architecture",
    desc: "Leverage generated types and payload helpers, prevent connection exhaustion in serverless/Node, and build clean data access repositories.",
    scope: "Prisma.UserGetPayload · Input Types · Singleton Pattern · Repository Design",
    lessonCodes: ["PRI-27"],
  },
];

export const PRISMA_LESSONS: LessonMeta[] = [
  // Phase 1: Fundamentals & Architecture
  {
    code: "PRI-01",
    slug: "pri01-what-is-prisma",
    name: "What Is Prisma & Where It Fits in Modern Architecture",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 1,
    desc: "Understand what Prisma is, why applications need a typed data-access layer, and how Prisma eliminates raw SQL string headaches.",
    estimatedMinutes: 20,
    xpReward: 80,
    path: "/learn/prisma/pri01-what-is-prisma",
  },
  {
    code: "PRI-02",
    slug: "pri02-prisma-architecture-workflow",
    name: "Prisma Architecture: Schema, Engine & Generation Workflow",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 2,
    desc: "Explore how the Prisma Schema acts as the single source of truth, how prisma generate compiles types, and the query engine role.",
    estimatedMinutes: 25,
    xpReward: 90,
    prerequisite: "PRI-01",
    path: "/learn/prisma/pri02-prisma-architecture-workflow",
  },
  {
    code: "PRI-03",
    slug: "pri03-project-setup-and-cli",
    name: "Project Setup, Prisma CLI & Project Structure",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 3,
    desc: "Initialize Prisma in a modern project with prisma init, configure DATABASE_URL, and explore the schema.prisma directory layout.",
    estimatedMinutes: 25,
    xpReward: 90,
    prerequisite: "PRI-02",
    path: "/learn/prisma/pri03-project-setup-and-cli",
  },

  // Phase 2: Prisma Schema & Data Modeling
  {
    code: "PRI-04",
    slug: "pri04-models-fields-scalar-types",
    name: "Modeling Entities: Models, Fields & Scalar Types",
    phaseId: "data-modeling",
    phaseNumber: 2,
    stepNumber: 4,
    desc: "Declare data models in Prisma schema and choose the right scalar types: String, Int, BigInt, Float, Decimal, DateTime, Boolean, and Json.",
    estimatedMinutes: 25,
    xpReward: 90,
    prerequisite: "PRI-03",
    path: "/learn/prisma/pri04-models-fields-scalar-types",
  },
  {
    code: "PRI-05",
    slug: "pri05-ids-defaults-and-attributes",
    name: "Primary Keys, Defaults & Unique Constraints",
    phaseId: "data-modeling",
    phaseNumber: 2,
    stepNumber: 5,
    desc: "Enforce integrity with @id, @default(autoincrement()), @default(uuid()), @default(now()), and @unique constraint attributes.",
    estimatedMinutes: 25,
    xpReward: 95,
    prerequisite: "PRI-04",
    path: "/learn/prisma/pri05-ids-defaults-and-attributes",
  },
  {
    code: "PRI-06",
    slug: "pri06-enums-mapping-and-indexes",
    name: "Enums, Field Mapping & Table Indexes",
    phaseId: "data-modeling",
    phaseNumber: 2,
    stepNumber: 6,
    desc: "Define strict enum types, map application camelCase names to snake_case database tables with @map and @@map, and declare @@index.",
    estimatedMinutes: 25,
    xpReward: 95,
    prerequisite: "PRI-05",
    path: "/learn/prisma/pri06-enums-mapping-and-indexes",
  },

  // Phase 3: Relations & Structural Connections
  {
    code: "PRI-07",
    slug: "pri07-relations-mental-model",
    name: "Relational Mental Model: Foreign Keys vs Relation Fields",
    phaseId: "relations",
    phaseNumber: 3,
    stepNumber: 7,
    desc: "Understand the core Prisma distinction between physical scalar foreign keys and virtual Prisma relation fields.",
    estimatedMinutes: 25,
    xpReward: 95,
    prerequisite: "PRI-06",
    path: "/learn/prisma/pri07-relations-mental-model",
  },
  {
    code: "PRI-08",
    slug: "pri08-one-to-one-and-one-to-many",
    name: "One-to-One & One-to-Many Relations",
    phaseId: "relations",
    phaseNumber: 3,
    stepNumber: 8,
    desc: "Configure 1:1 user-profile connections and 1:N author-posts relations using @relation(fields: [...], references: [...]) with cascade rules.",
    estimatedMinutes: 30,
    xpReward: 100,
    prerequisite: "PRI-07",
    path: "/learn/prisma/pri08-one-to-one-and-one-to-many",
  },
  {
    code: "PRI-09",
    slug: "pri09-many-to-many-relations",
    name: "Many-to-Many Relations: Implicit vs Explicit Join Models",
    phaseId: "relations",
    phaseNumber: 3,
    stepNumber: 9,
    desc: "Model M:N relationships: Understand when to let Prisma manage implicit join tables vs when to define explicit junction models with custom fields.",
    estimatedMinutes: 30,
    xpReward: 100,
    prerequisite: "PRI-08",
    path: "/learn/prisma/pri09-many-to-many-relations",
  },

  // Phase 4: Prisma Client Core CRUD
  {
    code: "PRI-10",
    slug: "pri10-generating-instantiating-client",
    name: "Generating & Instantiating Prisma Client",
    phaseId: "client-crud",
    phaseNumber: 4,
    stepNumber: 10,
    desc: "Run prisma generate to compile tailored TypeScript bindings, instantiate PrismaClient, and prevent connection pool leaks with singletons.",
    estimatedMinutes: 25,
    xpReward: 90,
    prerequisite: "PRI-09",
    path: "/learn/prisma/pri10-generating-instantiating-client",
  },
  {
    code: "PRI-11",
    slug: "pri11-reading-records-find-queries",
    name: "Reading Records: findUnique, findFirst & findMany",
    phaseId: "client-crud",
    phaseNumber: 4,
    stepNumber: 11,
    desc: "Execute targeted reads with findUnique (enforcing unique criteria), findFirst for conditional searches, and findMany for collections.",
    estimatedMinutes: 25,
    xpReward: 95,
    prerequisite: "PRI-10",
    path: "/learn/prisma/pri11-reading-records-find-queries",
  },
  {
    code: "PRI-12",
    slug: "pri12-writing-records-mutations",
    name: "Writing Records: create, update, upsert & delete",
    phaseId: "client-crud",
    phaseNumber: 4,
    stepNumber: 12,
    desc: "Perform data mutations: create new records, update existing ones, execute idempotent upsert operations, and handle batch createMany.",
    estimatedMinutes: 25,
    xpReward: 95,
    prerequisite: "PRI-11",
    path: "/learn/prisma/pri12-writing-records-mutations",
  },

  // Phase 5: Querying Relations & Nested Operations
  {
    code: "PRI-13",
    slug: "pri13-including-and-selecting-relations",
    name: "Fetching Related Data: include vs select",
    phaseId: "relation-queries",
    phaseNumber: 5,
    stepNumber: 13,
    desc: "Master eager loading with include, shape precise JSON payloads using nested select, and avoid N+1 query performance anti-patterns.",
    estimatedMinutes: 30,
    xpReward: 100,
    prerequisite: "PRI-12",
    path: "/learn/prisma/pri13-including-and-selecting-relations",
  },
  {
    code: "PRI-14",
    slug: "pri14-nested-writes-connect-create",
    name: "Nested Writes: Nested Create, connect & connectOrCreate",
    phaseId: "relation-queries",
    phaseNumber: 5,
    stepNumber: 14,
    desc: "Create parent and children atomically in a single query, link existing records via connect, and handle idempotent connectOrCreate.",
    estimatedMinutes: 30,
    xpReward: 100,
    prerequisite: "PRI-13",
    path: "/learn/prisma/pri14-nested-writes-connect-create",
  },
  {
    code: "PRI-15",
    slug: "pri15-updating-disconnecting-relations",
    name: "Updating & Disconnecting Related Records",
    phaseId: "relation-queries",
    phaseNumber: 5,
    stepNumber: 15,
    desc: "Safely unlink relationships using disconnect, replace connections with set, and clean up dependent children without orphan leaks.",
    estimatedMinutes: 25,
    xpReward: 95,
    prerequisite: "PRI-14",
    path: "/learn/prisma/pri15-updating-disconnecting-relations",
  },

  // Phase 6: Filtering, Sorting & Pagination
  {
    code: "PRI-16",
    slug: "pri16-filtering-comparison-logical",
    name: "Advanced Filtering: Comparisons & Logical Operators",
    phaseId: "filtering-pagination",
    phaseNumber: 6,
    stepNumber: 16,
    desc: "Filter results using comparison operators (equals, lt, gt, in), string filters (contains, startsWith, mode: insensitive), and AND/OR/NOT.",
    estimatedMinutes: 25,
    xpReward: 95,
    prerequisite: "PRI-15",
    path: "/learn/prisma/pri16-filtering-comparison-logical",
  },
  {
    code: "PRI-17",
    slug: "pri17-relation-filters",
    name: "Relation Filters: some, every & none",
    phaseId: "filtering-pagination",
    phaseNumber: 6,
    stepNumber: 17,
    desc: "Query parent models based on criteria in related collections using some (at least one matches), every (all match), and none.",
    estimatedMinutes: 25,
    xpReward: 95,
    prerequisite: "PRI-16",
    path: "/learn/prisma/pri17-relation-filters",
  },
  {
    code: "PRI-18",
    slug: "pri18-sorting-and-pagination",
    name: "Sorting & Pagination: Offset vs Cursor-Based Pagination",
    phaseId: "filtering-pagination",
    phaseNumber: 6,
    stepNumber: 18,
    desc: "Sort with orderBy and implement pagination: Understand the trade-offs between offset pagination (skip/take) and scalable cursor pagination.",
    estimatedMinutes: 30,
    xpReward: 100,
    prerequisite: "PRI-17",
    path: "/learn/prisma/pri18-sorting-and-pagination",
  },

  // Phase 7: Migrations & Schema Evolution
  {
    code: "PRI-19",
    slug: "pri19-migrations-and-development",
    name: "How Migrations Work & Development Workflow (migrate dev)",
    phaseId: "migrations",
    phaseNumber: 7,
    stepNumber: 19,
    desc: "Learn why migrations exist, how prisma migrate dev detects schema changes, generates timestamped SQL, and synchronizes the local database.",
    estimatedMinutes: 30,
    xpReward: 100,
    prerequisite: "PRI-18",
    path: "/learn/prisma/pri19-migrations-and-development",
  },
  {
    code: "PRI-20",
    slug: "pri20-applying-migrations-production",
    name: "Applying Migrations & Production Deployment (migrate deploy)",
    phaseId: "migrations",
    phaseNumber: 7,
    stepNumber: 20,
    desc: "Understand CI/CD migration deployment using prisma migrate deploy, and examine how the _prisma_migrations metadata table tracks execution state.",
    estimatedMinutes: 25,
    xpReward: 95,
    prerequisite: "PRI-19",
    path: "/learn/prisma/pri20-applying-migrations-production",
  },
  {
    code: "PRI-21",
    slug: "pri21-migration-safety-and-db-push",
    name: "Migration Safety, Database Drift & Prototyping (db push)",
    phaseId: "migrations",
    phaseNumber: 7,
    stepNumber: 21,
    desc: "Diagnose database schema drift, learn when to use prisma db push for rapid prototyping without migration history, and handle safe resets.",
    estimatedMinutes: 25,
    xpReward: 95,
    prerequisite: "PRI-20",
    path: "/learn/prisma/pri21-migration-safety-and-db-push",
  },

  // Phase 8: Transactions & Concurrency
  {
    code: "PRI-22",
    slug: "pri22-batch-transactions",
    name: "Transaction Concepts & Sequential Batch Transactions",
    phaseId: "transactions",
    phaseNumber: 8,
    stepNumber: 22,
    desc: "Understand ACID atomicity in application logic and bundle multiple independent operations into a single round-trip with prisma.$transaction([]).",
    estimatedMinutes: 25,
    xpReward: 95,
    prerequisite: "PRI-21",
    path: "/learn/prisma/pri22-batch-transactions",
  },
  {
    code: "PRI-23",
    slug: "pri23-interactive-transactions",
    name: "Interactive Transactions ($transaction async callback)",
    phaseId: "transactions",
    phaseNumber: 8,
    stepNumber: 23,
    desc: "Execute complex dependent transactions where writes depend on sequential reads using prisma.$transaction(async (tx) => ...) with auto-rollback.",
    estimatedMinutes: 30,
    xpReward: 105,
    prerequisite: "PRI-22",
    path: "/learn/prisma/pri23-interactive-transactions",
  },
  {
    code: "PRI-24",
    slug: "pri24-concurrency-and-rollbacks",
    name: "Handling Concurrency & Rollbacks Gracefully",
    phaseId: "transactions",
    phaseNumber: 8,
    stepNumber: 24,
    desc: "Handle concurrent data modifications safely, implement optimistic concurrency control with version fields, and handle rollback exceptions cleanly.",
    estimatedMinutes: 25,
    xpReward: 95,
    prerequisite: "PRI-23",
    path: "/learn/prisma/pri24-concurrency-and-rollbacks",
  },

  // Phase 9: Error Handling & Diagnostic Debugging
  {
    code: "PRI-25",
    slug: "pri25-prisma-error-codes-handling",
    name: "Common Prisma Error Codes (P2002, P2025, P1001) & Handling",
    phaseId: "errors-debugging",
    phaseNumber: 9,
    stepNumber: 25,
    desc: "Catch and differentiate PrismaClientKnownRequestError: Handle P2002 (Unique constraint), P2025 (Record not found), and P1001 (Connection failure).",
    estimatedMinutes: 25,
    xpReward: 95,
    prerequisite: "PRI-24",
    path: "/learn/prisma/pri25-prisma-error-codes-handling",
  },
  {
    code: "PRI-26",
    slug: "pri26-query-logging-and-debugging",
    name: "Query Logging, Diagnostic Inspection & Prisma Studio",
    phaseId: "errors-debugging",
    phaseNumber: 9,
    stepNumber: 26,
    desc: "Configure log levels to inspect executed queries and timing metrics, diagnose slow operations, and inspect raw data visually via Prisma Studio.",
    estimatedMinutes: 25,
    xpReward: 90,
    prerequisite: "PRI-25",
    path: "/learn/prisma/pri26-query-logging-and-debugging",
  },

  // Phase 10: Type Safety & Production Architecture
  {
    code: "PRI-27",
    slug: "pri27-generated-types-production-architecture",
    name: "Generated Types, Payloads & Production Architecture",
    phaseId: "types-production",
    phaseNumber: 10,
    stepNumber: 27,
    desc: "Extract complex return types with Prisma.UserGetPayload, utilize UserCreateInput, and organize Prisma within a robust, framework-neutral repository layer.",
    estimatedMinutes: 30,
    xpReward: 105,
    prerequisite: "PRI-26",
    path: "/learn/prisma/pri27-generated-types-production-architecture",
  },
];

export const PRISMA_PREREQUISITES: PrerequisiteItem[] = [
  {
    id: "basic-programming",
    title: "Basic Programming & Logic",
    badge: "Core",
    category: "required",
    icon: "💻",
    desc: "Variables, functions, async/await promises, and error handling fundamentals.",
    path: "/learn/javascript",
  },
  {
    id: "data-structures",
    title: "JSON & Data Structures",
    badge: "Objects",
    category: "required",
    icon: "📦",
    desc: "Objects, nested keys, arrays of records, and basic data types.",
    path: "/learn/typescript",
  },
  {
    id: "database-concept",
    title: "Basic Database Concept",
    badge: "Tables",
    category: "recommended",
    icon: "🗄️",
    desc: "Understanding that databases store records in tables with relations and primary keys.",
    path: "/learn/postgresql",
  },
];

export const PRISMA_CAPSTONE: CapstoneProjectMeta = {
  id: "capstone-orderflow-engine",
  stageNumber: 11,
  slug: "orderflow-engine",
  title: "OrderFlow — Enterprise Multi-Entity Data Access Engine",
  subtitle: "Production Prisma Schema, Migrations, Nested Writes & Interactive Transactions",
  desc: "Design and implement a complete, production-grade Prisma data-access layer for an enterprise order fulfillment system. Define 4 connected models with 1:1, 1:N, and M:N relations, execute atomic checkout transactions with row-safe inventory updates, implement cursor pagination, handle P2002/P2025 error codes gracefully, and generate type-safe payload queries.",
  path: "/learn/prisma/projects/orderflow-engine",
  badge: "💎 Capstone",
  xpReward: 500,
  estimatedMinutes: 90,
  keyFeatures: [
    "Prisma Schema with User, Profile, Product, Category, and Order models",
    "Configured 1:1, 1:N, and M:N relations with foreign keys and referential actions",
    "Declarative SQL migrations workflow with prisma migrate dev",
    "Nested create and connect queries linking order items and customers atomically",
    "Interactive transaction ($transaction) verifying stock and deducting inventory with rollback protection",
    "Production Prisma Client singleton with connection pooling and query logging",
  ],
};

export interface StageMeta {
  id: string;
  stageNumber: number;
  name: string;
  subtitle: string;
  milestone?: string;
  description: string;
  theme?: {
    badge: string;
    dot: string;
    border: string;
    bgSubtle: string;
    textAccent: string;
  };
  lessons: LessonMeta[];
  capstone?: CapstoneProjectMeta;
}

export const PRISMA_STAGES: StageMeta[] = PRISMA_PROGRESSION_PHASES.map((phase) => ({
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
  lessons: PRISMA_LESSONS.filter((l) => l.phaseId === phase.id),
  capstone: phase.phaseNumber === 10 ? PRISMA_CAPSTONE : undefined,
}));

export const PRISMA_RELATED_TOPICS = [
  {
    id: "rel-postgresql",
    title: "PostgreSQL",
    desc: "Master relational table modeling, indexes, ACID, and SQL joins that underpin relational Prisma schemas.",
    badge: "Database",
    path: "/learn/postgresql",
  },
  {
    id: "rel-mongodb",
    title: "MongoDB",
    desc: "Explore document models, collections, and aggregation to see how Prisma connects to non-relational databases.",
    badge: "Database",
    path: "/learn/mongodb",
  },
  {
    id: "rel-express",
    title: "Express.js",
    desc: "Integrate Prisma Client into lightweight REST API route handlers and middleware pipelines.",
    badge: "Framework",
    path: "/learn/express",
  },
  {
    id: "rel-nestjs",
    title: "NestJS",
    desc: "Inject Prisma Client into modular NestJS services and repository providers across enterprise microservices.",
    badge: "Framework",
    path: "/learn/nestjs",
  },
];

export function getAllLessons(): LessonMeta[] {
  return PRISMA_LESSONS;
}

export function getLessonBySlug(slug: string): LessonMeta | undefined {
  return PRISMA_LESSONS.find(
    (l) => l.slug.toLowerCase() === slug.toLowerCase() || l.code.toLowerCase() === slug.toLowerCase()
  );
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
  const idx = PRISMA_LESSONS.findIndex(
    (l) => l.slug.toLowerCase() === currentSlug.toLowerCase() || l.code.toLowerCase() === currentSlug.toLowerCase()
  );
  if (idx === -1 || idx === PRISMA_LESSONS.length - 1) return null;
  return PRISMA_LESSONS[idx + 1];
}

export function getPrevLesson(currentSlug: string): LessonMeta | null {
  const idx = PRISMA_LESSONS.findIndex(
    (l) => l.slug.toLowerCase() === currentSlug.toLowerCase() || l.code.toLowerCase() === currentSlug.toLowerCase()
  );
  if (idx <= 0) return null;
  return PRISMA_LESSONS[idx - 1];
}
