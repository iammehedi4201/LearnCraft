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
  express: {
    title: "Express.js",
    badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    icon: "🚂",
    description: "Web Framework, Middleware & REST APIs",
  },
  nodejs: {
    title: "Node.js",
    badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    icon: "🟢",
    description: "Pure Runtime Architecture & Asynchronous I/O",
  },
  react: {
    title: "React.js",
    badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    icon: "⚛️",
    description: "Component Architecture, Hooks & Mental Models",
  },
  foundations: {
    title: "Foundations",
    badgeColor: "bg-ds-feature-lighter text-ds-feature-dark border-ds-feature-light",
    icon: "🚀",
    description: "Core Learning Craft Foundations",
  },
  mongodb: {
    title: "MongoDB",
    badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    icon: "🍃",
    description: "Document Database, Aggregation, Indexes & Data Modeling",
  },
  postgresql: {
    title: "PostgreSQL",
    badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    icon: "🐘",
    description: "Relational Database Design, SQL, Joins, ACID & Performance Tuning",
  },
  prisma: {
    title: "Prisma",
    badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    icon: "💎",
    description: "Next-Generation Typed ORM & Data Access Layer",
  },
  redux: {
    title: "Redux",
    badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    icon: "🟣",
    description: "Predictable State Container, Redux Toolkit & Selectors",
  },
};

// Known lessons database map
export const KNOWN_LESSONS: Record<string, { code: string; name: string; topicId: string }> = {
  // Redux Lessons
  "/learn/redux/rdx01-what-is-state": { code: "RDX-01", name: "What Is State & Why State Management Gets Hard", topicId: "redux" },
  "/learn/redux/rdx02-what-is-redux": { code: "RDX-02", name: "What Is Redux & Why Does It Exist?", topicId: "redux" },
  "/learn/redux/rdx03-when-to-use-redux": { code: "RDX-03", name: "When to Use Redux vs Local Component State", topicId: "redux" },
  "/learn/redux/rdx04-store-and-state": { code: "RDX-04", name: "The Store & The State Tree", topicId: "redux" },
  "/learn/redux/rdx05-actions-and-action-creators": { code: "RDX-05", name: "Actions, Action Creators & Action Types", topicId: "redux" },
  "/learn/redux/rdx06-dispatching-actions": { code: "RDX-06", name: "Dispatch: The Only Way to Trigger State Changes", topicId: "redux" },
  "/learn/redux/rdx07-reducers-and-pure-functions": { code: "RDX-07", name: "Reducers & The Pure Function Contract", topicId: "redux" },
  "/learn/redux/rdx08-immutability-in-state-updates": { code: "RDX-08", name: "Immutability & Structural Sharing", topicId: "redux" },
  "/learn/redux/rdx09-unidirectional-data-flow": { code: "RDX-09", name: "The Complete Unidirectional Data Flow Cycle", topicId: "redux" },
  "/learn/redux/rdx10-redux-without-abstractions": { code: "RDX-10", name: "Redux From Scratch (Why Toolkit Exists)", topicId: "redux" },
  "/learn/redux/rdx11-why-redux-toolkit": { code: "RDX-11", name: "Why Redux Toolkit Is the Modern Standard", topicId: "redux" },
  "/learn/redux/rdx12-configure-store": { code: "RDX-12", name: "configureStore: Simplified Setup with Good Defaults", topicId: "redux" },
  "/learn/redux/rdx13-create-slice": { code: "RDX-13", name: "createSlice: Combining Actions & Reducers", topicId: "redux" },
  "/learn/redux/rdx14-immer-under-the-hood": { code: "RDX-14", name: "Writing 'Mutative' Logic Safely with Immer", topicId: "redux" },
  "/learn/redux/rdx15-react-redux-provider": { code: "RDX-15", name: "Connecting Redux to React: The Provider", topicId: "redux" },
  "/learn/redux/rdx16-use-selector": { code: "RDX-16", name: "Reading State with useSelector", topicId: "redux" },
  "/learn/redux/rdx17-use-dispatch": { code: "RDX-17", name: "Dispatching Actions with useDispatch", topicId: "redux" },
  "/learn/redux/rdx18-what-belongs-in-redux": { code: "RDX-18", name: "What Belongs in Redux vs Local React State", topicId: "redux" },
  "/learn/redux/rdx19-derived-state-and-selectors": { code: "RDX-19", name: "Derived State & Memoized Selectors (createSelector)", topicId: "redux" },
  "/learn/redux/rdx20-normalized-state-design": { code: "RDX-20", name: "Normalized State Design & Avoiding Duplication", topicId: "redux" },
  "/learn/redux/rdx21-async-state-and-thunks": { code: "RDX-21", name: "Asynchronous Logic, Middleware & Thunks", topicId: "redux" },
  "/learn/redux/rdx22-create-async-thunk": { code: "RDX-22", name: "createAsyncThunk: Handling Async Lifecycles", topicId: "redux" },
  "/learn/redux/rdx23-redux-middleware": { code: "RDX-23", name: "Redux Middleware: The Dispatch Pipeline", topicId: "redux" },
  "/learn/redux/rdx24-redux-devtools-debugging": { code: "RDX-24", name: "Redux DevTools & Time-Travel Debugging", topicId: "redux" },
  "/learn/redux/rdx25-testing-redux-logic": { code: "RDX-25", name: "Testing Reducers, Selectors & Async Thunks", topicId: "redux" },
  "/learn/redux/rdx26-best-practices-and-mastery": { code: "RDX-26", name: "Redux Architecture Best Practices & Mental Mastery", topicId: "redux" },
  // Prisma Lessons
  "/learn/prisma/pri01-what-is-prisma": { code: "PRI-01", name: "What Is Prisma & Why Does It Exist?", topicId: "prisma" },
  "/learn/prisma/pri02-prisma-and-the-database": { code: "PRI-02", name: "Prisma & The Database Architecture", topicId: "prisma" },
  "/learn/prisma/pri03-project-setup-and-cli": { code: "PRI-03", name: "Project Setup & The Prisma CLI", topicId: "prisma" },
  "/learn/prisma/pri04-prisma-schema-anatomy": { code: "PRI-04", name: "Anatomy of the Prisma Schema File", topicId: "prisma" },
  "/learn/prisma/pri05-models-fields-scalar-types": { code: "PRI-05", name: "Defining Models, Fields & Scalar Types", topicId: "prisma" },
  "/learn/prisma/pri06-optional-fields-defaults-enums": { code: "PRI-06", name: "Optional Fields, Defaults & Enums", topicId: "prisma" },
  "/learn/prisma/pri07-one-to-one-relations": { code: "PRI-07", name: "One-to-One Relations", topicId: "prisma" },
  "/learn/prisma/pri08-one-to-many-relations": { code: "PRI-08", name: "One-to-Many Relations", topicId: "prisma" },
  "/learn/prisma/pri09-many-to-many-relations": { code: "PRI-09", name: "Many-to-Many Relations", topicId: "prisma" },
  "/learn/prisma/pri10-relation-attributes-referential-actions": { code: "PRI-10", name: "Referential Actions & Cascade Rules", topicId: "prisma" },
  "/learn/prisma/pri11-generating-prisma-client": { code: "PRI-11", name: "Generating Prisma Client", topicId: "prisma" },
  "/learn/prisma/pri12-client-crud-create-read": { code: "PRI-12", name: "Creating & Reading Records", topicId: "prisma" },
  "/learn/prisma/pri13-client-crud-update-delete": { code: "PRI-13", name: "Updating & Deleting Records", topicId: "prisma" },
  "/learn/prisma/pri14-selecting-and-including": { code: "PRI-14", name: "Selecting Fields & Including Relations", topicId: "prisma" },
  "/learn/prisma/pri15-nested-writes": { code: "PRI-15", name: "Nested Writes & Relational Mutations", topicId: "prisma" },
  "/learn/prisma/pri16-filtering-and-operators": { code: "PRI-16", name: "Filtering & Comparison Operators", topicId: "prisma" },
  "/learn/prisma/pri17-logical-operators-relation-filters": { code: "PRI-17", name: "Logical Operators & Relation Filters", topicId: "prisma" },
  "/learn/prisma/pri18-sorting-and-pagination": { code: "PRI-18", name: "Sorting & Pagination", topicId: "prisma" },
  "/learn/prisma/pri19-aggregations-and-grouping": { code: "PRI-19", name: "Aggregations & Grouping", topicId: "prisma" },
  "/learn/prisma/pri20-migrations-and-schema-evolution": { code: "PRI-20", name: "What Migrations Are & Why They Matter", topicId: "prisma" },
  "/learn/prisma/pri21-development-vs-production-migrations": { code: "PRI-21", name: "migrate dev vs migrate deploy", topicId: "prisma" },
  "/learn/prisma/pri22-prototyping-with-db-push": { code: "PRI-22", name: "Prototyping with db push", topicId: "prisma" },
  "/learn/prisma/pri23-transactions-batch-and-interactive": { code: "PRI-23", name: "Batch & Interactive Transactions", topicId: "prisma" },
  "/learn/prisma/pri24-prisma-errors-and-debugging": { code: "PRI-24", name: "Handling Prisma Errors & Debugging", topicId: "prisma" },
  "/learn/prisma/pri25-type-safety-and-generated-types": { code: "PRI-25", name: "Generated Types & Type Utilities", topicId: "prisma" },
  "/learn/prisma/pri26-singleton-client-and-app-architecture": { code: "PRI-26", name: "Singleton Client & Application Architecture", topicId: "prisma" },
  "/learn/prisma/pri27-prisma-best-practices-and-anti-patterns": { code: "PRI-27", name: "Prisma Best Practices & Anti-Patterns", topicId: "prisma" },

  // PostgreSQL Lessons
  "/learn/postgresql/pg01-what-is-postgresql": { code: "PG-01", name: "What Is PostgreSQL & The Relational Paradigm", topicId: "postgresql" },
  "/learn/postgresql/pg02-databases-schemas-tables": { code: "PG-02", name: "PostgreSQL Hierarchy: Databases, Schemas & Tables", topicId: "postgresql" },
  "/learn/postgresql/pg03-core-data-types": { code: "PG-03", name: "Core Data Types: Integers, Text, Decimals & Timestamps", topicId: "postgresql" },
  "/learn/postgresql/pg04-create-table-ddl": { code: "PG-04", name: "Defining Tables: CREATE TABLE & Safe Alterations", topicId: "postgresql" },
  "/learn/postgresql/pg05-insert-and-select": { code: "PG-05", name: "Inserting & Reading Rows (INSERT INTO & SELECT)", topicId: "postgresql" },
  "/learn/postgresql/pg06-update-and-delete": { code: "PG-06", name: "Modifying & Deleting Data (UPDATE, DELETE & Safety Guards)", topicId: "postgresql" },
  "/learn/postgresql/pg07-returning-clause": { code: "PG-07", name: "PostgreSQL Superpower: The RETURNING Clause", topicId: "postgresql" },
  "/learn/postgresql/pg08-where-filtering-operators": { code: "PG-08", name: "Filtering Rows: WHERE, Comparison & Logical Operators", topicId: "postgresql" },
  "/learn/postgresql/pg09-null-three-valued-logic": { code: "PG-09", name: "The Three-Valued Logic of NULL in SQL", topicId: "postgresql" },
  "/learn/postgresql/pg10-ordering-and-pagination": { code: "PG-10", name: "Ordering & Pagination: ORDER BY, LIMIT, OFFSET & Keyset", topicId: "postgresql" },
  "/learn/postgresql/pg11-primary-foreign-keys": { code: "PG-11", name: "Primary Keys & Foreign Key References", topicId: "postgresql" },
  "/learn/postgresql/pg12-inner-join-multi-table": { code: "PG-12", name: "Combining Related Tables: INNER JOIN", topicId: "postgresql" },
  "/learn/postgresql/pg13-outer-joins-left-right": { code: "PG-13", name: "Preserving Unmatched Data: LEFT JOIN & RIGHT JOIN", topicId: "postgresql" },
  "/learn/postgresql/pg14-modeling-cardinality": { code: "PG-14", name: "Modeling Relationships: 1-to-1, 1-to-N & Junction Tables", topicId: "postgresql" },
  "/learn/postgresql/pg15-aggregate-functions-group-by": { code: "PG-15", name: "Aggregate Functions & Grouping (COUNT, SUM, AVG, GROUP BY)", topicId: "postgresql" },
  "/learn/postgresql/pg16-having-vs-where": { code: "PG-16", name: "Filtering Aggregated Groups: HAVING vs WHERE", topicId: "postgresql" },
  "/learn/postgresql/pg17-subqueries-and-ctes": { code: "PG-17", name: "Subqueries & Common Table Expressions (CTEs with WITH)", topicId: "postgresql" },
  "/learn/postgresql/pg18-window-functions": { code: "PG-18", name: "Window Functions: ROW_NUMBER, RANK & OVER (PARTITION BY)", topicId: "postgresql" },
  "/learn/postgresql/pg19-upserts-on-conflict": { code: "PG-19", name: "Idempotent Inserts: ON CONFLICT DO UPDATE / NOTHING", topicId: "postgresql" },
  "/learn/postgresql/pg20-normalization-1nf-2nf-3nf": { code: "PG-20", name: "Database Normalization: 1NF, 2NF & 3NF Made Simple", topicId: "postgresql" },
  "/learn/postgresql/pg21-strategic-denormalization": { code: "PG-21", name: "Strategic Denormalization & Read Optimization", topicId: "postgresql" },
  "/learn/postgresql/pg22-jsonb-semi-structured-data": { code: "PG-22", name: "Working with Semi-Structured Data: PostgreSQL JSONB", topicId: "postgresql" },
  "/learn/postgresql/pg23-constraints-integrity": { code: "PG-23", name: "Integrity Constraints: UNIQUE, NOT NULL & CHECK", topicId: "postgresql" },
  "/learn/postgresql/pg24-foreign-key-referential-actions": { code: "PG-24", name: "Referential Actions: ON DELETE CASCADE vs RESTRICT", topicId: "postgresql" },
  "/learn/postgresql/pg25-transactions-acid-foundations": { code: "PG-25", name: "ACID Foundations: BEGIN, COMMIT & ROLLBACK", topicId: "postgresql" },
  "/learn/postgresql/pg26-isolation-levels-concurrency": { code: "PG-26", name: "Concurrency & Transaction Isolation Levels", topicId: "postgresql" },
  "/learn/postgresql/pg27-indexes-btree-compound": { code: "PG-27", name: "How Indexes Work: B-Tree, Compound & Unique Indexes", topicId: "postgresql" },
  "/learn/postgresql/pg28-explain-analyze-query-plans": { code: "PG-28", name: "Dissecting Execution Plans: EXPLAIN & EXPLAIN ANALYZE", topicId: "postgresql" },
  "/learn/postgresql/pg29-debugging-production-best-practices": { code: "PG-29", name: "Debugging Common PostgreSQL Errors & Production Best Practices", topicId: "postgresql" },

  // MongoDB Lessons
  "/learn/mongodb/mdb01-what-is-mongodb": { code: "MDB-01", name: "What Is MongoDB & Why Documents?", topicId: "mongodb" },
  "/learn/mongodb/mdb02-databases-collections-bson": { code: "MDB-02", name: "Databases, Collections & BSON Data Types", topicId: "mongodb" },
  "/learn/mongodb/mdb03-mongosh-and-compass": { code: "MDB-03", name: "Working with the Mongo Shell (mongosh) & Compass", topicId: "mongodb" },
  "/learn/mongodb/mdb04-create-insert": { code: "MDB-04", name: "Inserting Documents (insertOne & insertMany)", topicId: "mongodb" },
  "/learn/mongodb/mdb05-read-find-projections": { code: "MDB-05", name: "Reading Documents (find, findOne & Projections)", topicId: "mongodb" },
  "/learn/mongodb/mdb06-update-operators": { code: "MDB-06", name: "Updating Documents ($set, $inc, $unset & updateOne)", topicId: "mongodb" },
  "/learn/mongodb/mdb07-delete-documents": { code: "MDB-07", name: "Deleting Documents (deleteOne & deleteMany)", topicId: "mongodb" },
  "/learn/mongodb/mdb08-comparison-logical-operators": { code: "MDB-08", name: "Comparison & Logical Operators", topicId: "mongodb" },
  "/learn/mongodb/mdb09-element-evaluation-operators": { code: "MDB-09", name: "Element & Evaluation Operators ($exists, $regex)", topicId: "mongodb" },
  "/learn/mongodb/mdb10-sort-limit-pagination": { code: "MDB-10", name: "Cursor Methods: Sorting, Limiting & Pagination", topicId: "mongodb" },
  "/learn/mongodb/mdb11-querying-arrays-nested": { code: "MDB-11", name: "Querying Arrays & Nested Objects with Dot Notation", topicId: "mongodb" },
  "/learn/mongodb/mdb12-updating-arrays-operators": { code: "MDB-12", name: "Updating Arrays ($push, $pull, $addToSet & Positional $)", topicId: "mongodb" },
  "/learn/mongodb/mdb13-embedding-vs-referencing": { code: "MDB-13", name: "Embedding vs Referencing: The Core Design Decision", topicId: "mongodb" },
  "/learn/mongodb/mdb14-modeling-relationships": { code: "MDB-14", name: "Modeling 1-to-1, 1-to-Many & Many-to-Many Relationships", topicId: "mongodb" },
  "/learn/mongodb/mdb15-denormalization-unbounded-growth": { code: "MDB-15", name: "Denormalization Strategies & Preventing Unbounded Growth", topicId: "mongodb" },
  "/learn/mongodb/mdb16-schema-validation-rules": { code: "MDB-16", name: "JSON Schema Validation Rules with $jsonSchema", topicId: "mongodb" },
  "/learn/mongodb/mdb17-enforcing-validation-actions": { code: "MDB-17", name: "Enforcing Validation Actions & Modifying Existing Schemas", topicId: "mongodb" },
  "/learn/mongodb/mdb18-aggregation-pipeline-model": { code: "MDB-18", name: "The Aggregation Pipeline: $match & $project", topicId: "mongodb" },
  "/learn/mongodb/mdb19-group-metrics-accumulation": { code: "MDB-19", name: "Grouping & Computing Metrics ($group, $sum, $avg)", topicId: "mongodb" },
  "/learn/mongodb/mdb20-unwind-array-processing": { code: "MDB-20", name: "Array Deconstruction ($unwind) & Count Stages", topicId: "mongodb" },
  "/learn/mongodb/mdb21-lookup-collection-joins": { code: "MDB-21", name: "Joining Collections with $lookup (Left Outer Joins)", topicId: "mongodb" },
  "/learn/mongodb/mdb22-indexes-fundamentals": { code: "MDB-22", name: "How Indexes Work: Single-Field, Compound & Unique", topicId: "mongodb" },
  "/learn/mongodb/mdb23-explain-plan-esr-rule": { code: "MDB-23", name: "Analyzing Queries with explain() & The ESR Rule", topicId: "mongodb" },
  "/learn/mongodb/mdb24-atomicity-multi-doc-transactions": { code: "MDB-24", name: "Document Atomicity vs Multi-Document ACID Transactions", topicId: "mongodb" },
  "/learn/mongodb/mdb25-debugging-anti-patterns": { code: "MDB-25", name: "Debugging Slow Queries & Common Schema Anti-Patterns", topicId: "mongodb" },
  "/learn/mongodb/mdb26-production-best-practices": { code: "MDB-26", name: "Production Best Practices, Sizing & Security Checklist", topicId: "mongodb" },

  // Express.js Lessons
  "/learn/express/exp01-what-is-express": { code: "EXP-01", name: "What Is Express.js", topicId: "express" },
  "/learn/express/exp02-app-object": { code: "EXP-02", name: "Creating the Application & The app Object", topicId: "express" },
  "/learn/express/exp03-req-res-cycle": { code: "EXP-03", name: "Understanding the Request-Response Cycle", topicId: "express" },
  "/learn/express/exp04-http-methods-routes": { code: "EXP-04", name: "HTTP Methods & Basic Route Definition", topicId: "express" },
  "/learn/express/exp05-route-query-params": { code: "EXP-05", name: "Route Params vs Query Strings", topicId: "express" },
  "/learn/express/exp06-express-router": { code: "EXP-06", name: "Modular Routing with express.Router()", topicId: "express" },
  "/learn/express/exp07-headers-status-json": { code: "EXP-07", name: "Headers, Status Codes & Sending JSON", topicId: "express" },
  "/learn/express/exp08-body-parsing": { code: "EXP-08", name: "Body Parsing with express.json()", topicId: "express" },
  "/learn/express/exp09-response-helpers": { code: "EXP-09", name: "Response Helpers & Redirects", topicId: "express" },
  "/learn/express/exp10-middleware-mental-model": { code: "EXP-10", name: "What Is Middleware? (req, res, next)", topicId: "express" },
  "/learn/express/exp11-middleware-scopes": { code: "EXP-11", name: "Application vs Router vs Route Middleware", topicId: "express" },
  "/learn/express/exp12-custom-middleware-order": { code: "EXP-12", name: "Custom Middleware & Execution Order", topicId: "express" },
  "/learn/express/exp13-rest-crud-endpoints": { code: "EXP-13", name: "REST Resource Architecture & CRUD", topicId: "express" },
  "/learn/express/exp14-pagination-filtering": { code: "EXP-14", name: "Filtering, Pagination & Sorting", topicId: "express" },
  "/learn/express/exp15-api-response-envelopes": { code: "EXP-15", name: "Standardizing API Response Envelopes", topicId: "express" },
  "/learn/express/exp16-request-validation": { code: "EXP-16", name: "Request Validation & Sanitization", topicId: "express" },
  "/learn/express/exp17-validation-middleware": { code: "EXP-17", name: "Validation Middleware & 400 Bad Request", topicId: "express" },
  "/learn/express/exp18-sync-async-errors": { code: "EXP-18", name: "Sync vs Async Errors & next(err)", topicId: "express" },
  "/learn/express/exp19-error-handling-middleware": { code: "EXP-19", name: "The 4-Argument Error Middleware", topicId: "express" },
  "/learn/express/exp20-404-global-error-handling": { code: "EXP-20", name: "404 Not Found & Global Error Flow", topicId: "express" },
  "/learn/express/exp21-controller-service-separation": { code: "EXP-21", name: "Controller-Service Layer Separation", topicId: "express" },
  "/learn/express/exp22-env-config-bootstrap": { code: "EXP-22", name: "Environment Config & Safe Bootstrap", topicId: "express" },
  "/learn/express/exp23-auth-concepts": { code: "EXP-23", name: "Authentication vs Authorization", topicId: "express" },
  "/learn/express/exp24-jwt-auth-middleware": { code: "EXP-24", name: "JWT Verification & req.user Context", topicId: "express" },
  "/learn/express/exp25-rbac-guards": { code: "EXP-25", name: "Role-Based Access Control (RBAC) Guards", topicId: "express" },
  "/learn/express/exp26-debugging-common-mistakes": { code: "EXP-26", name: "Debugging Request Flow & Pitfalls", topicId: "express" },
  "/learn/express/exp27-testing-express-supertest": { code: "EXP-27", name: "Integration Testing with Supertest", topicId: "express" },
  "/learn/express/exp28-production-best-practices": { code: "EXP-28", name: "Production Checklist & Graceful Teardown", topicId: "express" },
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
