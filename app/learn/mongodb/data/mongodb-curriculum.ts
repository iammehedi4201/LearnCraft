/**
 * MongoDB Curriculum Data Layer — LearnCraft
 * 5 Parts/Phases, 20 Authoritative Lessons, and 1 Comprehensive Capstone Project.
 * Mapped directly from the official curriculum specification.
 *
 * Strict Topic Boundary: Pure MongoDB database only.
 * Focuses on document data model, BSON types, CRUD operations, query operators,
 * array/nested manipulation, data modeling (embedding vs referencing),
 * schema validation, indexes, explain plans, pagination, aggregation pipeline,
 * $lookup joins, atomic updates, transactions, database security, backups,
 * replication, and scaling.
 */

import type { Course } from "@/components/curriculum/types";
import { MONGODB_LEGACY_SLUG_MAP } from "../content";

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

export const MONGODB_PROGRESSION_PHASES: PhaseMeta[] = [
  {
    id: "fundamentals",
    phaseNumber: 1,
    name: "Understand MongoDB",
    label: "Phase 01: Understand MongoDB",
    desc: "Understand document databases, why documents feel natural for applications, database hierarchy, BSON types, and navigating with mongosh.",
    scope: "What Is MongoDB · Databases, Collections & BSON · Working with mongosh",
    lessonCodes: ["MDB-01", "MDB-02", "MDB-03"],
  },
  {
    id: "crud-operations",
    phaseNumber: 2,
    name: "Create, Find, Change, and Delete Data",
    label: "Phase 02: Create, Find, Change, and Delete Data",
    desc: "Master creating, reading, updating, and deleting documents using insertOne, find, query operators, projections, update operators, and safe deletion.",
    scope: "Insert Documents · Find Documents · Query Operators · Projections & Sorting · Update Documents · Delete Safely",
    lessonCodes: ["MDB-04", "MDB-05", "MDB-06", "MDB-07", "MDB-08", "MDB-09"],
  },
  {
    id: "organize-data",
    phaseNumber: 3,
    name: "Organize Data the Right Way",
    label: "Phase 03: Organize Data the Right Way",
    desc: "Model data effectively using arrays, embedded documents with dot notation, embedding vs referencing trade-offs, and schema validation with $jsonSchema.",
    scope: "Arrays & Embedded Docs · Embedding vs Referencing · Schema Validation",
    lessonCodes: ["MDB-10", "MDB-11", "MDB-12"],
  },
  {
    id: "efficient-queries",
    phaseNumber: 4,
    name: "Find and Work with Data Efficiently",
    label: "Phase 04: Find and Work with Data Efficiently",
    desc: "Accelerate query performance with indexes, inspect query plans using explain(), paginate large collections, and build multi-stage aggregation pipelines with $lookup.",
    scope: "Indexes · explain() Profiling · Pagination · Aggregation Pipeline · $lookup Joins",
    lessonCodes: ["MDB-13", "MDB-14", "MDB-15", "MDB-16", "MDB-17"],
  },
  {
    id: "data-safety",
    phaseNumber: 5,
    name: "Keep Data Correct and Safe",
    label: "Phase 05: Keep Data Correct and Safe",
    desc: "Safeguard production databases with single-document atomicity, multi-document transactions, security basics, environment variables, backups, replication, and sharding.",
    scope: "Atomic Updates & Transactions · Security Basics · Backups, Replication & Scaling",
    lessonCodes: ["MDB-18", "MDB-19", "MDB-20"],
  },
];

export const MONGODB_LESSONS: LessonMeta[] = [
  // Phase 1: Understand MongoDB
  {
    code: "MDB-01",
    slug: "mdb01-what-is-mongodb",
    name: "What Is MongoDB?",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 1,
    desc: "Discover why MongoDB was created, the core document model concept, and how keeping related data together improves speed and clarity.",
    estimatedMinutes: 15,
    xpReward: 50,
    path: "/learn/mongodb/mdb01-what-is-mongodb",
    color: "emerald",
  },
  {
    code: "MDB-02",
    slug: "mdb02-databases-collections-documents-and-bson",
    name: "Databases, Collections, Documents, and BSON",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 2,
    desc: "Understand MongoDB database hierarchy, collections, ObjectId generation, and how binary JSON (BSON) supports rich types.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "MDB-01",
    path: "/learn/mongodb/mdb02-databases-collections-documents-and-bson",
    color: "emerald",
  },
  {
    code: "MDB-03",
    slug: "mdb03-working-with-mongodb-using-mongosh",
    name: "Working with MongoDB Using mongosh",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 3,
    desc: "Learn practical commands in mongosh (use, show dbs, show collections) and visually inspect documents with MongoDB Compass.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "MDB-02",
    path: "/learn/mongodb/mdb03-working-with-mongodb-using-mongosh",
    color: "emerald",
  },

  // Phase 2: Create, Find, Change, and Delete Data
  {
    code: "MDB-04",
    slug: "mdb04-insert-documents",
    name: "Insert Documents",
    phaseId: "crud-operations",
    phaseNumber: 2,
    stepNumber: 4,
    desc: "Insert single and batch documents into collections, examine the write acknowledgement response, and handle auto-generated _id keys.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "MDB-03",
    path: "/learn/mongodb/mdb04-insert-documents",
    color: "emerald",
  },
  {
    code: "MDB-05",
    slug: "mdb05-find-documents",
    name: "Find Documents",
    phaseId: "crud-operations",
    phaseNumber: 2,
    stepNumber: 5,
    desc: "Retrieve documents matching criteria and shape network payloads with projection to return only requested fields.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "MDB-04",
    path: "/learn/mongodb/mdb05-find-documents",
    color: "emerald",
  },
  {
    code: "MDB-06",
    slug: "mdb06-filter-documents-with-query-operators",
    name: "Filter Documents with Query Operators",
    phaseId: "crud-operations",
    phaseNumber: 2,
    stepNumber: 6,
    desc: "Filter documents with precision using comparison, logical, element, and regex operators alongside sorting and pagination.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "MDB-05",
    path: "/learn/mongodb/mdb06-filter-documents-with-query-operators",
    color: "emerald",
  },
  {
    code: "MDB-07",
    slug: "mdb07-choose-fields-sort-results-and-limit-results",
    name: "Choose Fields, Sort Results, and Limit Results",
    phaseId: "crud-operations",
    phaseNumber: 2,
    stepNumber: 7,
    desc: "Shape query results with field projections (inclusion and exclusion), ascending and descending sorts, and result limits.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "MDB-06",
    path: "/learn/mongodb/mdb07-choose-fields-sort-results-and-limit-results",
    color: "emerald",
  },
  {
    code: "MDB-08",
    slug: "mdb08-update-documents",
    name: "Update Documents",
    phaseId: "crud-operations",
    phaseNumber: 2,
    stepNumber: 8,
    desc: "Perform atomic in-place updates using $set, modify counters with $inc, remove fields with $unset, and avoid full document replacement.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "MDB-07",
    path: "/learn/mongodb/mdb08-update-documents",
    color: "emerald",
  },
  {
    code: "MDB-09",
    slug: "mdb09-delete-documents-safely",
    name: "Delete Documents Safely",
    phaseId: "crud-operations",
    phaseNumber: 2,
    stepNumber: 9,
    desc: "Remove specific documents or multiple records safely using query filters, inspect deletedCount, and implement soft delete flags.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "MDB-08",
    path: "/learn/mongodb/mdb09-delete-documents-safely",
    color: "emerald",
  },

  // Phase 3: Organize Data the Right Way
  {
    code: "MDB-10",
    slug: "mdb10-arrays-and-embedded-documents",
    name: "Arrays and Embedded Documents",
    phaseId: "organize-data",
    phaseNumber: 3,
    stepNumber: 10,
    desc: "Query sub-documents with dot notation and manipulate array fields cleanly using $push, $pull, $addToSet, and positional operators.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "MDB-09",
    path: "/learn/mongodb/mdb10-arrays-and-embedded-documents",
    color: "emerald",
  },
  {
    code: "MDB-11",
    slug: "mdb11-embedding-vs-referencing-related-data",
    name: "Embedding vs. Referencing Related Data",
    phaseId: "organize-data",
    phaseNumber: 3,
    stepNumber: 11,
    desc: "Model real-world relationships by understanding when to embed vs when to reference based on access patterns and document size limits.",
    estimatedMinutes: 30,
    xpReward: 80,
    prerequisite: "MDB-10",
    path: "/learn/mongodb/mdb11-embedding-vs-referencing-related-data",
    color: "emerald",
  },
  {
    code: "MDB-12",
    slug: "mdb12-schema-validation",
    name: "Schema Validation",
    phaseId: "organize-data",
    phaseNumber: 3,
    stepNumber: 12,
    desc: "Harness flexible schemas safely by enforcing collection-level rules with $jsonSchema, required fields, and validation actions.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "MDB-11",
    path: "/learn/mongodb/mdb12-schema-validation",
    color: "emerald",
  },

  // Phase 4: Find and Work with Data Efficiently
  {
    code: "MDB-13",
    slug: "mdb13-indexes",
    name: "Indexes",
    phaseId: "efficient-queries",
    phaseNumber: 4,
    stepNumber: 13,
    desc: "Accelerate reads and prevent full collection scans using single-field, compound, and unique indexes guided by query patterns.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "MDB-12",
    path: "/learn/mongodb/mdb13-indexes",
    color: "emerald",
  },
  {
    code: "MDB-14",
    slug: "mdb14-check-a-query-with-explain",
    name: "Check a Query with explain()",
    phaseId: "efficient-queries",
    phaseNumber: 4,
    stepNumber: 14,
    desc: "Profile queries with explain('executionStats'), compare COLLSCAN vs IXSCAN, and verify winning plans.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "MDB-13",
    path: "/learn/mongodb/mdb14-check-a-query-with-explain",
    color: "emerald",
  },
  {
    code: "MDB-15",
    slug: "mdb15-pagination",
    name: "Pagination",
    phaseId: "efficient-queries",
    phaseNumber: 4,
    stepNumber: 15,
    desc: "Implement reliable pagination using skip() and limit(), and scale large datasets using range-based keyset queries.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "MDB-14",
    path: "/learn/mongodb/mdb15-pagination",
    color: "emerald",
  },
  {
    code: "MDB-16",
    slug: "mdb16-aggregation-pipeline",
    name: "Aggregation Pipeline",
    phaseId: "efficient-queries",
    phaseNumber: 4,
    stepNumber: 16,
    desc: "Transform, group, unwind, and aggregate collections using multi-stage pipelines ($match, $group, $sort, $project).",
    estimatedMinutes: 30,
    xpReward: 80,
    prerequisite: "MDB-15",
    path: "/learn/mongodb/mdb16-aggregation-pipeline",
    color: "emerald",
  },
  {
    code: "MDB-17",
    slug: "mdb17-combine-data-with-lookup",
    name: "Combine Data with $lookup",
    phaseId: "efficient-queries",
    phaseNumber: 4,
    stepNumber: 17,
    desc: "Join documents across separate collections within aggregation pipelines using indexed $lookup stages.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "MDB-16",
    path: "/learn/mongodb/mdb17-combine-data-with-lookup",
    color: "emerald",
  },

  // Phase 5: Keep Data Correct and Safe
  {
    code: "MDB-18",
    slug: "mdb18-atomic-updates-and-transactions",
    name: "Atomic Updates and Transactions",
    phaseId: "data-safety",
    phaseNumber: 5,
    stepNumber: 18,
    desc: "Understand single-document atomicity guarantees, multi-document ACID transactions with sessions, and consistency trade-offs.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "MDB-17",
    path: "/learn/mongodb/mdb18-atomic-updates-and-transactions",
    color: "emerald",
  },
  {
    code: "MDB-19",
    slug: "mdb19-database-security-basics",
    name: "Database Security Basics",
    phaseId: "data-safety",
    phaseNumber: 5,
    stepNumber: 19,
    desc: "Protect sensitive data with authentication, least-privilege RBAC, environment variables, and network encryption.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "MDB-18",
    path: "/learn/mongodb/mdb19-database-security-basics",
    color: "emerald",
  },
  {
    code: "MDB-20",
    slug: "mdb20-backups-replication-and-scaling",
    name: "Backups, Replication, and Scaling — The Basic Idea",
    phaseId: "data-safety",
    phaseNumber: 5,
    stepNumber: 20,
    desc: "Understand the differences between disaster recovery backups, replica set high availability, and sharding for horizontal scale.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "MDB-19",
    path: "/learn/mongodb/mdb20-backups-replication-and-scaling",
    color: "emerald",
  },
];

// ─────────────────────────────────────────────────────────────
// Prerequisites Definition
// ─────────────────────────────────────────────────────────────

export const MONGODB_PREREQUISITES = {
  title: "Required & Foundational Knowledge",
  description:
    "MongoDB is an independent document database. Learners should have basic programming familiarity, understand data structures, and know basic JSON object syntax.",
  items: [
    {
      name: "JSON & Data Structures",
      topicSlug: "json-basics",
      desc: "Key-value pairs, nested objects, primitive arrays, arrays of objects, and data types.",
      required: true,
    },
    {
      name: "Basic Programming Concepts",
      topicSlug: "programming-basics",
      desc: "Variables, boolean logic (AND/OR), equality comparisons, and functions.",
      required: true,
    },
    {
      name: "Basic Command-Line Usage",
      topicSlug: "cli-basics",
      desc: "Running commands in terminal shells and working with text output.",
      required: false,
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Final Capstone Project
// ─────────────────────────────────────────────────────────────

export const MONGODB_CAPSTONE: CapstoneProjectMeta = {
  id: "capstone-ecommerce-database",
  stageNumber: 6,
  slug: "ecommerce-database",
  title: "ShopSphere — E-Commerce Database Architecture & Analytics Engine",
  subtitle: "Final MongoDB Capstone Project",
  desc: "Architect a production-grade MongoDB database for a high-volume multi-vendor e-commerce platform. Design collections with $jsonSchema validation, balance embedded order items with referenced customer accounts, construct an ESR compound index suite verified via explain(), build sales reporting aggregation pipelines, and execute an atomic checkout inventory transaction.",
  path: "/learn/mongodb/projects/ecommerce-database",
  badge: "🍃 Capstone",
  xpReward: 400,
  estimatedMinutes: 90,
  keyFeatures: [
    "Production schema design for users, products, orders, and review collections",
    "JSON Schema validation rules with $jsonSchema enforcing required fields and price ranges",
    "Balanced modeling: embedded order snapshot items + referenced customer and category IDs",
    "Compound index architecture adhering strictly to the ESR rule verified via explain()",
    "Multi-stage analytics aggregation pipeline computing monthly revenue, top categories, and average ratings",
    "ACID transaction script executing order creation and inventory deduction atomically",
  ],
};

// ─────────────────────────────────────────────────────────────
// Stages & Full Curriculum Breakdown
// ─────────────────────────────────────────────────────────────

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

export const MONGODB_STAGES: StageMeta[] = MONGODB_PROGRESSION_PHASES.map((phase) => ({
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
  lessons: MONGODB_LESSONS.filter((l) => l.phaseId === phase.id),
  capstone: phase.phaseNumber === 5 ? MONGODB_CAPSTONE : undefined,
}));

// ─────────────────────────────────────────────────────────────
// Related / Next Topics
// ─────────────────────────────────────────────────────────────

export const MONGODB_RELATED_TOPICS = [
  {
    id: "rel-nodejs",
    title: "Node.js",
    desc: "Connect your backend server directly to MongoDB using the official MongoDB driver.",
    badge: "Runtime",
    path: "/learn/nodejs",
  },
  {
    id: "rel-express",
    title: "Express.js",
    desc: "Build lightweight REST API endpoints that perform MongoDB queries and return JSON responses.",
    badge: "Framework",
    path: "/learn/express",
  },
  {
    id: "rel-nestjs",
    title: "NestJS",
    desc: "Architect enterprise microservices with dependency injection and modular database providers.",
    badge: "Framework",
    path: "/learn/nestjs",
  },
  {
    id: "rel-postgresql",
    title: "PostgreSQL",
    desc: "Contrast document databases with relational 3NF tables, ACID transactions, and SQL joins.",
    badge: "Database",
    path: "/learn/postgresql",
  },
];

// ─────────────────────────────────────────────────────────────
// Helper Query Functions
// ─────────────────────────────────────────────────────────────

export function getAllLessons(): LessonMeta[] {
  return MONGODB_LESSONS;
}

export function getLessonBySlug(slug: string): LessonMeta | undefined {
  if (!slug) return MONGODB_LESSONS[0];
  const normalized = slug.toLowerCase().trim();

  // 1. Direct match on slug or code
  const directMatch = MONGODB_LESSONS.find(
    (l) => l.slug.toLowerCase() === normalized || l.code.toLowerCase() === normalized
  );
  if (directMatch) return directMatch;

  // 2. Check legacy alias map
  const mappedSlug = MONGODB_LEGACY_SLUG_MAP[normalized];
  if (mappedSlug) {
    const aliasMatch = MONGODB_LESSONS.find(
      (l) => l.slug.toLowerCase() === mappedSlug.toLowerCase() || l.code.toLowerCase() === mappedSlug.toLowerCase()
    );
    if (aliasMatch) return aliasMatch;
  }

  return undefined;
}

export function getLessonsByPhaseId(phaseId: string): LessonMeta[] {
  return MONGODB_LESSONS.filter((l) => l.phaseId === phaseId);
}

export function getStageByLessonSlug(slug: string): PhaseMeta | undefined {
  const lesson = getLessonBySlug(slug);
  if (!lesson) return undefined;
  return MONGODB_PROGRESSION_PHASES.find((p) => p.id === lesson.phaseId);
}

export function getNextLesson(currentSlug: string): LessonMeta | null {
  const current = getLessonBySlug(currentSlug);
  if (!current) return null;
  const idx = MONGODB_LESSONS.findIndex((l) => l.slug === current.slug);
  if (idx === -1 || idx === MONGODB_LESSONS.length - 1) return null;
  return MONGODB_LESSONS[idx + 1];
}

export function getPrevLesson(currentSlug: string): LessonMeta | null {
  const current = getLessonBySlug(currentSlug);
  if (!current) return null;
  const idx = MONGODB_LESSONS.findIndex((l) => l.slug === current.slug);
  if (idx <= 0) return null;
  return MONGODB_LESSONS[idx - 1];
}

export const PROGRESSION_PHASES = MONGODB_PROGRESSION_PHASES;

export function getMongoDBCourse(): Course {
  const allLessons = getAllLessons();
  return {
    id: "mongodb",
    title: "Learn MongoDB",
    prerequisites: {
      items: [
        "JSON data structures: key-value pairs, nested objects, and arrays",
        "Basic understanding of backend databases and persistent storage",
        "Familiarity with command-line terminal basics",
      ],
      refresherHref: "/learn/javascript",
      refresherLabel: "Need a refresher? Open the JavaScript curriculum",
    },
    capstone: {
      title: MONGODB_CAPSTONE.title,
      description:
        "Your finish line: architect and optimize a complete, production-grade MongoDB database featuring schema validation, compound indexes with ESR, analytics aggregation pipelines, and ACID transactions.",
      href: MONGODB_CAPSTONE.path,
    },
    phases: MONGODB_PROGRESSION_PHASES.map((phase) => ({
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
