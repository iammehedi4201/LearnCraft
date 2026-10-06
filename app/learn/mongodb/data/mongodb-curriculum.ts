/**
 * MongoDB Curriculum Data Layer — LearnCraft
 * 10 Phases, 26 In-Depth Lessons, and 1 Comprehensive Capstone Project.
 *
 * Strict Topic Boundary: Pure MongoDB database only.
 * Focuses on document data model, BSON types, CRUD operations, query operators,
 * array/nested manipulation, data modeling (embedding vs referencing),
 * schema validation, the aggregation pipeline, indexes, explain plans,
 * transactions, and query debugging.
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

export const MONGODB_PROGRESSION_PHASES: PhaseMeta[] = [
  {
    id: "fundamentals",
    phaseNumber: 1,
    name: "MongoDB Fundamentals & Document Model",
    label: "Phase 01: MongoDB Fundamentals & Document Model",
    desc: "Understand why MongoDB exists, how the document model differs from rows/tables, BSON data types, mongosh, and Compass GUI.",
    scope: "Document Model · Databases & Collections · BSON Types · Tools",
    lessonCodes: ["MDB-01", "MDB-02", "MDB-03"],
  },
  {
    id: "crud-operations",
    phaseNumber: 2,
    name: "Core CRUD Operations",
    label: "Phase 02: Core CRUD Operations",
    desc: "Master creating, reading, updating, and deleting documents using insertOne, find, updateOne, and delete operations.",
    scope: "insertOne / insertMany · find / findOne · updateOne · deleteOne",
    lessonCodes: ["MDB-04", "MDB-05", "MDB-06", "MDB-07"],
  },
  {
    id: "query-operators",
    phaseNumber: 3,
    name: "Deep Querying & Filtering Operators",
    label: "Phase 03: Deep Querying & Filtering Operators",
    desc: "Filter documents with precision using comparison, logical, element, and regex operators alongside sorting and pagination.",
    scope: "Comparison ($gt, $lte) · Logical ($and, $or) · $in · Pagination",
    lessonCodes: ["MDB-08", "MDB-09", "MDB-10"],
  },
  {
    id: "arrays-nested",
    phaseNumber: 4,
    name: "Arrays & Nested Document Manipulation",
    label: "Phase 04: Arrays & Nested Document Manipulation",
    desc: "Query sub-documents with dot notation and manipulate array fields cleanly using $push, $pull, $addToSet, and positional operators.",
    scope: "Dot Notation · Array Queries · $push & $pull · Positional $",
    lessonCodes: ["MDB-11", "MDB-12"],
  },
  {
    id: "data-modeling",
    phaseNumber: 5,
    name: "Data Modeling & Schema Design",
    label: "Phase 05: Data Modeling & Schema Design",
    desc: "Model real-world relationships by understanding when to embed vs when to reference based on access patterns and document size limits.",
    scope: "Embedding vs Referencing · 1-to-N Relationships · Unbounded Growth",
    lessonCodes: ["MDB-13", "MDB-14", "MDB-15"],
  },
  {
    id: "schema-validation",
    phaseNumber: 6,
    name: "Schema Validation & Data Integrity",
    label: "Phase 06: Schema Validation & Data Integrity",
    desc: "Harness flexible schemas safely by enforcing collection-level rules with $jsonSchema, required fields, and validation actions.",
    scope: "$jsonSchema Validation · Required Keys · Validation Action",
    lessonCodes: ["MDB-16", "MDB-17"],
  },
  {
    id: "aggregation",
    phaseNumber: 7,
    name: "The Aggregation Pipeline",
    label: "Phase 07: The Aggregation Pipeline",
    desc: "Transform, group, unwind, and join collections using multi-stage aggregation pipelines for rich analytical queries.",
    scope: "$match & $project · $group & Metrics · $unwind · $lookup Joins",
    lessonCodes: ["MDB-18", "MDB-19", "MDB-20", "MDB-21"],
  },
  {
    id: "indexes-performance",
    phaseNumber: 8,
    name: "Indexes & Query Performance",
    label: "Phase 08: Indexes & Query Performance",
    desc: "Accelerate reads and prevent full collection scans using single-field, compound, and unique indexes guided by the ESR rule.",
    scope: "B-Tree Indexes · Compound Indexes · explain() · The ESR Rule",
    lessonCodes: ["MDB-22", "MDB-23"],
  },
  {
    id: "transactions",
    phaseNumber: 9,
    name: "Transactions & Consistency",
    label: "Phase 09: Transactions & Consistency",
    desc: "Understand single-document atomicity guarantees, multi-document ACID transactions with sessions, and consistency trade-offs.",
    scope: "Document Atomicity · Client Sessions · Multi-Doc ACID Transactions",
    lessonCodes: ["MDB-24"],
  },
  {
    id: "debugging-mastery",
    phaseNumber: 10,
    name: "Performance, Debugging & Best Practices",
    label: "Phase 10: Performance, Debugging & Best Practices",
    desc: "Diagnose slow queries, avoid common antipatterns like massive arrays, and apply production security and sizing checklists.",
    scope: "Slow Query Diagnosis · Anti-Patterns · Production Best Practices",
    lessonCodes: ["MDB-25", "MDB-26"],
  },
];

export const MONGODB_LESSONS: LessonMeta[] = [
  // Phase 1: Fundamentals & Document Model
  {
    code: "MDB-01",
    slug: "mdb01-what-is-mongodb",
    name: "What Is MongoDB & Why Documents?",
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
    slug: "mdb02-databases-collections-bson",
    name: "Databases, Collections & BSON Data Types",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 2,
    desc: "Understand MongoDB database hierarchy, collections, ObjectId generation, and how binary JSON (BSON) supports rich types.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "MDB-01",
    path: "/learn/mongodb/mdb02-databases-collections-bson",
    color: "emerald",
  },
  {
    code: "MDB-03",
    slug: "mdb03-mongosh-and-compass",
    name: "Working with the Mongo Shell (mongosh) & Compass",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 3,
    desc: "Learn practical commands in mongosh (use, show dbs, show collections) and visually inspect documents with MongoDB Compass.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "MDB-02",
    path: "/learn/mongodb/mdb03-mongosh-and-compass",
    color: "emerald",
  },

  // Phase 2: Core CRUD Operations
  {
    code: "MDB-04",
    slug: "mdb04-create-insert",
    name: "Inserting Documents (insertOne & insertMany)",
    phaseId: "crud-operations",
    phaseNumber: 2,
    stepNumber: 4,
    desc: "Insert single and batch documents into collections, examine the write acknowledgement response, and handle auto-generated _id keys.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "MDB-03",
    path: "/learn/mongodb/mdb04-create-insert",
    color: "emerald",
  },
  {
    code: "MDB-05",
    slug: "mdb05-read-find-projections",
    name: "Reading Documents (find, findOne & Projections)",
    phaseId: "crud-operations",
    phaseNumber: 2,
    stepNumber: 5,
    desc: "Retrieve documents matching criteria and shape network payloads with projection to return only requested fields.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "MDB-04",
    path: "/learn/mongodb/mdb05-read-find-projections",
    color: "emerald",
  },
  {
    code: "MDB-06",
    slug: "mdb06-update-operators",
    name: "Updating Documents ($set, $inc, $unset & updateOne)",
    phaseId: "crud-operations",
    phaseNumber: 2,
    stepNumber: 6,
    desc: "Perform atomic in-place updates using $set, modify counters with $inc, remove fields with $unset, and avoid full document replacement.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "MDB-05",
    path: "/learn/mongodb/mdb06-update-operators",
    color: "emerald",
  },
  {
    code: "MDB-07",
    slug: "mdb07-delete-documents",
    name: "Deleting Documents (deleteOne & deleteMany)",
    phaseId: "crud-operations",
    phaseNumber: 2,
    stepNumber: 7,
    desc: "Remove specific documents or multiple records safely using query filters, inspect deletedCount, and implement soft delete flags.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "MDB-06",
    path: "/learn/mongodb/mdb07-delete-documents",
    color: "emerald",
  },

  // Phase 3: Querying MongoDB
  {
    code: "MDB-08",
    slug: "mdb08-comparison-logical-operators",
    name: "Comparison ($gt, $lte, $in) & Logical ($and, $or) Operators",
    phaseId: "query-operators",
    phaseNumber: 3,
    stepNumber: 8,
    desc: "Build expressive query filters matching ranges, lists of allowable values with $in, and composite boolean logic with $and and $or.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "MDB-07",
    path: "/learn/mongodb/mdb08-comparison-logical-operators",
    color: "emerald",
  },
  {
    code: "MDB-09",
    slug: "mdb09-element-evaluation-operators",
    name: "Element & Evaluation Operators ($exists, $type, $regex)",
    phaseId: "query-operators",
    phaseNumber: 3,
    stepNumber: 9,
    desc: "Check for optional field presence with $exists, verify BSON types with $type, and perform case-insensitive text matching with $regex.",
    estimatedMinutes: 20,
    xpReward: 60,
    prerequisite: "MDB-08",
    path: "/learn/mongodb/mdb09-element-evaluation-operators",
    color: "emerald",
  },
  {
    code: "MDB-10",
    slug: "mdb10-sort-limit-pagination",
    name: "Cursor Methods: Sorting, Limiting & Pagination",
    phaseId: "query-operators",
    phaseNumber: 3,
    stepNumber: 10,
    desc: "Order query results with sort(), restrict batch sizes with limit(), and contrast skip() offset pagination with fast range-based cursor pagination.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "MDB-09",
    path: "/learn/mongodb/mdb10-sort-limit-pagination",
    color: "emerald",
  },

  // Phase 4: Arrays & Embedded Documents
  {
    code: "MDB-11",
    slug: "mdb11-querying-arrays-nested",
    name: "Querying Arrays & Nested Objects with Dot Notation",
    phaseId: "arrays-nested",
    phaseNumber: 4,
    stepNumber: 11,
    desc: "Inspect nested document keys using dot notation and query arrays containing primitives or objects using $elemMatch.",
    estimatedMinutes: 25,
    xpReward: 70,
    prerequisite: "MDB-10",
    path: "/learn/mongodb/mdb11-querying-arrays-nested",
    color: "emerald",
  },
  {
    code: "MDB-12",
    slug: "mdb12-updating-arrays-operators",
    name: "Updating Arrays ($push, $pull, $addToSet & Positional $)",
    phaseId: "arrays-nested",
    phaseNumber: 4,
    stepNumber: 12,
    desc: "Append elements with $push, ensure uniqueness with $addToSet, remove items with $pull, and update matching array items with positional $ operator.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "MDB-11",
    path: "/learn/mongodb/mdb12-updating-arrays-operators",
    color: "emerald",
  },

  // Phase 5: Data Modeling
  {
    code: "MDB-13",
    slug: "mdb13-embedding-vs-referencing",
    name: "Embedding vs Referencing: The Core Design Decision",
    phaseId: "data-modeling",
    phaseNumber: 5,
    stepNumber: 13,
    desc: "Evaluate application read/write access patterns to choose between embedded sub-documents for fast atomic reads vs references for shared data.",
    estimatedMinutes: 30,
    xpReward: 80,
    prerequisite: "MDB-12",
    path: "/learn/mongodb/mdb13-embedding-vs-referencing",
    color: "emerald",
  },
  {
    code: "MDB-14",
    slug: "mdb14-modeling-relationships",
    name: "Modeling 1-to-1, 1-to-Many & Many-to-Many Relationships",
    phaseId: "data-modeling",
    phaseNumber: 5,
    stepNumber: 14,
    desc: "Design real-world schemas: 1-to-few embedded, 1-to-many referenced, 1-to-squillions parent references, and 2-way reference arrays.",
    estimatedMinutes: 30,
    xpReward: 80,
    prerequisite: "MDB-13",
    path: "/learn/mongodb/mdb14-modeling-relationships",
    color: "emerald",
  },
  {
    code: "MDB-15",
    slug: "mdb15-denormalization-unbounded-growth",
    name: "Denormalization Strategies & Preventing Unbounded Growth",
    phaseId: "data-modeling",
    phaseNumber: 5,
    stepNumber: 15,
    desc: "Avoid the 16MB document size ceiling, prevent array performance degradation, and duplicate critical snapshot data safely.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "MDB-14",
    path: "/learn/mongodb/mdb15-denormalization-unbounded-growth",
    color: "emerald",
  },

  // Phase 6: Schema Validation
  {
    code: "MDB-16",
    slug: "mdb16-schema-validation-rules",
    name: "JSON Schema Validation Rules with $jsonSchema",
    phaseId: "schema-validation",
    phaseNumber: 6,
    stepNumber: 16,
    desc: "Define collection validators with $jsonSchema to guarantee required fields, document structure, and mathematical range constraints.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "MDB-15",
    path: "/learn/mongodb/mdb16-schema-validation-rules",
    color: "emerald",
  },
  {
    code: "MDB-17",
    slug: "mdb17-enforcing-validation-actions",
    name: "Enforcing Validation Actions & Modifying Existing Schemas",
    phaseId: "schema-validation",
    phaseNumber: 6,
    stepNumber: 17,
    desc: "Configure validationAction (error vs warn), validationLevel (strict vs moderate), inspect write failures, and update rules with collMod.",
    estimatedMinutes: 20,
    xpReward: 70,
    prerequisite: "MDB-16",
    path: "/learn/mongodb/mdb17-enforcing-validation-actions",
    color: "emerald",
  },

  // Phase 7: Aggregation Pipeline
  {
    code: "MDB-18",
    slug: "mdb18-aggregation-pipeline-model",
    name: "The Aggregation Pipeline: $match & $project",
    phaseId: "aggregation",
    phaseNumber: 7,
    stepNumber: 18,
    desc: "Build a solid mental model of aggregation pipelines as multi-stage data factories, filtering early with $match and reshaping with $project.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "MDB-17",
    path: "/learn/mongodb/mdb18-aggregation-pipeline-model",
    color: "emerald",
  },
  {
    code: "MDB-19",
    slug: "mdb19-group-metrics-accumulation",
    name: "Grouping & Computing Metrics ($group, $sum, $avg)",
    phaseId: "aggregation",
    phaseNumber: 7,
    stepNumber: 19,
    desc: "Aggregate document groups by key, calculate sums, averages, min/max values, and collect sub-lists with $push accumulator expressions.",
    estimatedMinutes: 30,
    xpReward: 90,
    prerequisite: "MDB-18",
    path: "/learn/mongodb/mdb19-group-metrics-accumulation",
    color: "emerald",
  },
  {
    code: "MDB-20",
    slug: "mdb20-unwind-array-processing",
    name: "Array Deconstruction ($unwind) & Count Stages",
    phaseId: "aggregation",
    phaseNumber: 7,
    stepNumber: 20,
    desc: "Deconstruct array fields into separate stream documents with $unwind to calculate per-tag or per-item statistics and count records with $count.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "MDB-19",
    path: "/learn/mongodb/mdb20-unwind-array-processing",
    color: "emerald",
  },
  {
    code: "MDB-21",
    slug: "mdb21-lookup-collection-joins",
    name: "Joining Collections with $lookup (Left Outer Joins)",
    phaseId: "aggregation",
    phaseNumber: 7,
    stepNumber: 21,
    desc: "Perform cross-collection joins with $lookup, merge related referenced data into sub-arrays, and filter joined datasets efficiently.",
    estimatedMinutes: 30,
    xpReward: 90,
    prerequisite: "MDB-20",
    path: "/learn/mongodb/mdb21-lookup-collection-joins",
    color: "emerald",
  },

  // Phase 8: Indexes & Query Performance
  {
    code: "MDB-22",
    slug: "mdb22-indexes-fundamentals",
    name: "How Indexes Work: Single-Field, Compound & Unique",
    phaseId: "indexes-performance",
    phaseNumber: 8,
    stepNumber: 22,
    desc: "Understand B-Tree index structures, create single and compound indexes with createIndex, enforce uniqueness, and evaluate index storage costs.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "MDB-21",
    path: "/learn/mongodb/mdb22-indexes-fundamentals",
    color: "emerald",
  },
  {
    code: "MDB-23",
    slug: "mdb23-explain-plan-esr-rule",
    name: "Analyzing Queries with explain() & The ESR Rule",
    phaseId: "indexes-performance",
    phaseNumber: 8,
    stepNumber: 23,
    desc: "Interpret winningPlan (COLLSCAN vs IXSCAN), check totalDocsExamined vs nReturned, and apply the Equality, Sort, Range (ESR) rule.",
    estimatedMinutes: 30,
    xpReward: 90,
    prerequisite: "MDB-22",
    path: "/learn/mongodb/mdb23-explain-plan-esr-rule",
    color: "emerald",
  },

  // Phase 9: Transactions & Consistency
  {
    code: "MDB-24",
    slug: "mdb24-atomicity-multi-doc-transactions",
    name: "Document Atomicity vs Multi-Document ACID Transactions",
    phaseId: "transactions",
    phaseNumber: 9,
    stepNumber: 24,
    desc: "Leverage single-document atomic writes and execute multi-document ACID transactions with ClientSession, commitTransaction, and abortTransaction.",
    estimatedMinutes: 30,
    xpReward: 90,
    prerequisite: "MDB-23",
    path: "/learn/mongodb/mdb24-atomicity-multi-doc-transactions",
    color: "emerald",
  },

  // Phase 10: Performance, Debugging & Best Practices
  {
    code: "MDB-25",
    slug: "mdb25-debugging-anti-patterns",
    name: "Debugging Slow Queries & Common Schema Anti-Patterns",
    phaseId: "debugging-mastery",
    phaseNumber: 10,
    stepNumber: 25,
    desc: "Diagnose and fix the top MongoDB issues: unindexed regex, massive growing arrays, premature referencing, and missing projections.",
    estimatedMinutes: 25,
    xpReward: 80,
    prerequisite: "MDB-24",
    path: "/learn/mongodb/mdb25-debugging-anti-patterns",
    color: "emerald",
  },
  {
    code: "MDB-26",
    slug: "mdb26-production-best-practices",
    name: "Production Best Practices, Sizing & Security Checklist",
    phaseId: "debugging-mastery",
    phaseNumber: 10,
    stepNumber: 26,
    desc: "Review the final production checklist: connection pooling concepts, working set sizing (RAM fitting), index audits, and principle of least privilege.",
    estimatedMinutes: 25,
    xpReward: 100,
    prerequisite: "MDB-25",
    path: "/learn/mongodb/mdb26-production-best-practices",
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
  stageNumber: 11,
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
  capstone: phase.phaseNumber === 10 ? MONGODB_CAPSTONE : undefined,
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
  return MONGODB_LESSONS.find(
    (l) => l.slug.toLowerCase() === slug.toLowerCase() || l.code.toLowerCase() === slug.toLowerCase()
  );
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
  const idx = MONGODB_LESSONS.findIndex(
    (l) => l.slug.toLowerCase() === currentSlug.toLowerCase() || l.code.toLowerCase() === currentSlug.toLowerCase()
  );
  if (idx === -1 || idx === MONGODB_LESSONS.length - 1) return null;
  return MONGODB_LESSONS[idx + 1];
}

export function getPrevLesson(currentSlug: string): LessonMeta | null {
  const idx = MONGODB_LESSONS.findIndex(
    (l) => l.slug.toLowerCase() === currentSlug.toLowerCase() || l.code.toLowerCase() === currentSlug.toLowerCase()
  );
  if (idx <= 0) return null;
  return MONGODB_LESSONS[idx - 1];
}
