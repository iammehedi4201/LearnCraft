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
  "system-design": {
    title: "System Design",
    badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    icon: "📐",
    description: "Distributed Systems, Scalability & Architecture",
  },
};

// Known lessons database map
export const KNOWN_LESSONS: Record<string, { code: string; name: string; topicId: string }> = {
  // System Design Lessons
  "/learn/system-design/sys01-what-is-system-design": { code: "SYS-01", name: "What Is System Design & Why It Matters", topicId: "system-design" },
  "/learn/system-design/sys02-software-system-structure": { code: "SYS-02", name: "How Software Systems Are Structured", topicId: "system-design" },
  "/learn/system-design/sys03-requirements-and-trade-offs": { code: "SYS-03", name: "Requirements & The Trade-Off Mindset", topicId: "system-design" },
  "/learn/system-design/sys04-traffic-and-scale-estimation": { code: "SYS-04", name: "Back-of-the-Envelope: Traffic & RPS Estimation", topicId: "system-design" },
  "/learn/system-design/sys05-storage-and-bandwidth-planning": { code: "SYS-05", name: "Storage & Bandwidth Capacity Planning", topicId: "system-design" },
  "/learn/system-design/sys06-load-balancers-and-reverse-proxies": { code: "SYS-06", name: "Load Balancers, Reverse Proxies & Traffic Routing", topicId: "system-design" },
  "/learn/system-design/sys07-stateless-vs-stateful-services": { code: "SYS-07", name: "Stateless Architecture & Session Decoupling", topicId: "system-design" },
  "/learn/system-design/sys08-caching-fundamentals-and-patterns": { code: "SYS-08", name: "Caching Fundamentals & Read Strategies", topicId: "system-design" },
  "/learn/system-design/sys09-write-strategies-and-invalidation": { code: "SYS-09", name: "Write Strategies & Cache Invalidation", topicId: "system-design" },
  "/learn/system-design/sys10-cache-stampede-and-failure-modes": { code: "SYS-10", name: "Cache Stampede, Penetration & Avalanche Prevention", topicId: "system-design" },
  "/learn/system-design/sys11-sql-vs-nosql-architectural-choice": { code: "SYS-11", name: "SQL vs NoSQL: The Architectural Choice", topicId: "system-design" },
  "/learn/system-design/sys12-database-replication-and-read-scaling": { code: "SYS-12", name: "Database Replication, Read Replicas & Failover", topicId: "system-design" },
  "/learn/system-design/sys13-partitioning-and-sharding": { code: "SYS-13", name: "Database Partitioning & Horizontal Sharding", topicId: "system-design" },
  "/learn/system-design/sys14-sync-vs-async-communication": { code: "SYS-14", name: "Sync vs Async Communication & Service Decoupling", topicId: "system-design" },
  "/learn/system-design/sys15-message-queues-and-pubsub": { code: "SYS-15", name: "Message Queues, Pub/Sub & Worker Pools", topicId: "system-design" },
  "/learn/system-design/sys16-dead-letter-queues-and-backpressure": { code: "SYS-16", name: "Dead-Letter Queues, Delivery Guarantees & Backpressure", topicId: "system-design" },
  "/learn/system-design/sys17-timeouts-retries-and-backoff": { code: "SYS-17", name: "Timeouts, Retries, Exponential Backoff & Jitter", topicId: "system-design" },
  "/learn/system-design/sys18-circuit-breakers-and-rate-limiting": { code: "SYS-18", name: "Circuit Breakers & Rate Limiting Algorithms", topicId: "system-design" },
  "/learn/system-design/sys19-idempotency-and-duplicate-prevention": { code: "SYS-19", name: "Idempotency Keys & Duplicate Prevention", topicId: "system-design" },
  "/learn/system-design/sys20-single-point-of-failure-and-redundancy": { code: "SYS-20", name: "Single Points of Failure & Redundancy Design", topicId: "system-design" },
  "/learn/system-design/sys21-strong-vs-eventual-consistency": { code: "SYS-21", name: "Strong vs Eventual Consistency in Practice", topicId: "system-design" },
  "/learn/system-design/sys22-cap-theorem-and-pacelc-in-practice": { code: "SYS-22", name: "The CAP Theorem & PACELC in Real-World Systems", topicId: "system-design" },
  "/learn/system-design/sys23-architecture-level-security": { code: "SYS-23", name: "Architecture-Level Security Boundaries", topicId: "system-design" },
  "/learn/system-design/sys24-observability-logs-metrics-traces": { code: "SYS-24", name: "Observability: Logs, Metrics, Traces & Health", topicId: "system-design" },
  "/learn/system-design/sys25-monolith-to-microservices-evolution": { code: "SYS-25", name: "Monolith Evolution vs Service Boundaries", topicId: "system-design" },
  "/learn/system-design/sys26-event-driven-architecture": { code: "SYS-26", name: "Event-Driven Architecture & Event Sourcing", topicId: "system-design" },
  "/learn/system-design/sys27-case-study-url-shortener": { code: "SYS-27", name: "Case Study: High-Throughput URL Shortener", topicId: "system-design" },
  "/learn/system-design/sys28-case-study-distributed-rate-limiter": { code: "SYS-28", name: "Case Study: Distributed Rate Limiter & Gateway", topicId: "system-design" },
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

  // Node.js Lessons (Authoritative 20-lesson runtime curriculum)
  "/learn/nodejs/node01-what-is-nodejs": { code: "NODE-01", name: "What Is Node.js?", topicId: "nodejs" },
  "/learn/nodejs/node02-start-and-run-a-nodejs-project": { code: "NODE-02", name: "Start and Run a Node.js Project", topicId: "nodejs" },
  "/learn/nodejs/node03-what-are-npm-and-packages": { code: "NODE-03", name: "What Are npm and Packages?", topicId: "nodejs" },
  "/learn/nodejs/node04-import-and-export-code": { code: "NODE-04", name: "Import and Export Code Between Files", topicId: "nodejs" },
  "/learn/nodejs/node05-read-environment-variables-safely": { code: "NODE-05", name: "Read Environment Variables Safely", topicId: "nodejs" },
  "/learn/nodejs/node06-read-and-write-files": { code: "NODE-06", name: "Read and Write Files", topicId: "nodejs" },
  "/learn/nodejs/node07-why-the-path-module-matters": { code: "NODE-07", name: "Why the path Module Matters", topicId: "nodejs" },
  "/learn/nodejs/node08-synchronous-vs-asynchronous-work": { code: "NODE-08", name: "Synchronous vs. Asynchronous Work", topicId: "nodejs" },
  "/learn/nodejs/node09-use-async-and-await": { code: "NODE-09", name: "Use async and await", topicId: "nodejs" },
  "/learn/nodejs/node10-understand-the-event-loop": { code: "NODE-10", name: "Understand the Event Loop", topicId: "nodejs" },
  "/learn/nodejs/node11-handle-errors-with-try-catch": { code: "NODE-11", name: "Handle Errors with try...catch", topicId: "nodejs" },
  "/learn/nodejs/node12-events-and-eventemitter": { code: "NODE-12", name: "Events and EventEmitter", topicId: "nodejs" },
  "/learn/nodejs/node13-buffers-and-streams": { code: "NODE-13", name: "Buffers and Streams", topicId: "nodejs" },
  "/learn/nodejs/node14-understand-http-requests-and-responses": { code: "NODE-14", name: "Understand HTTP Requests and Responses", topicId: "nodejs" },
  "/learn/nodejs/node15-make-an-http-request-with-fetch": { code: "NODE-15", name: "Make an HTTP Request with fetch", topicId: "nodejs" },
  "/learn/nodejs/node16-validate-input-and-avoid-trusting-users": { code: "NODE-16", name: "Validate Input and Avoid Trusting Users", topicId: "nodejs" },
  "/learn/nodejs/node17-use-process-and-exit-codes": { code: "NODE-17", name: "Use process and Exit Codes", topicId: "nodejs" },
  "/learn/nodejs/node18-debug-nodejs-code": { code: "NODE-18", name: "Debug Node.js Code", topicId: "nodejs" },
  "/learn/nodejs/node19-write-basic-tests": { code: "NODE-19", name: "Write Basic Tests", topicId: "nodejs" },
  "/learn/nodejs/node20-keep-a-nodejs-application-responsive": { code: "NODE-20", name: "Keep a Node.js Application Responsive", topicId: "nodejs" },

  // Node.js Legacy Slugs (Backward Compatibility)
  "/learn/nodejs/node02-nodejs-vs-browser": { code: "NODE-02", name: "Start and Run a Node.js Project", topicId: "nodejs" },
  "/learn/nodejs/node03-event-loop-and-async-io": { code: "NODE-10", name: "Understand the Event Loop", topicId: "nodejs" },
  "/learn/nodejs/node04-commonjs-vs-esm": { code: "NODE-04", name: "Import and Export Code Between Files", topicId: "nodejs" },
  "/learn/nodejs/node05-npm-and-package-json": { code: "NODE-03", name: "What Are npm and Packages?", topicId: "nodejs" },
  "/learn/nodejs/node06-path-module-and-filenames": { code: "NODE-07", name: "Why the path Module Matters", topicId: "nodejs" },
  "/learn/nodejs/node07-fs-module-reading-writing": { code: "NODE-06", name: "Read and Write Files", topicId: "nodejs" },
  "/learn/nodejs/node08-fs-promises-safe-operations": { code: "NODE-06", name: "Read and Write Files", topicId: "nodejs" },
  "/learn/nodejs/node09-event-emitter-pattern": { code: "NODE-12", name: "Events and EventEmitter", topicId: "nodejs" },
  "/learn/nodejs/node10-buffers-and-binary-data": { code: "NODE-13", name: "Buffers and Streams", topicId: "nodejs" },
  "/learn/nodejs/node11-streams-readable-writable": { code: "NODE-13", name: "Buffers and Streams", topicId: "nodejs" },
  "/learn/nodejs/node12-piping-and-backpressure": { code: "NODE-13", name: "Buffers and Streams", topicId: "nodejs" },
  "/learn/nodejs/node13-http-module-server-basics": { code: "NODE-14", name: "Understand HTTP Requests and Responses", topicId: "nodejs" },
  "/learn/nodejs/node14-http-routing-and-json": { code: "NODE-14", name: "Understand HTTP Requests and Responses", topicId: "nodejs" },
  "/learn/nodejs/node15-parsing-http-request-bodies": { code: "NODE-14", name: "Understand HTTP Requests and Responses", topicId: "nodejs" },
  "/learn/nodejs/node16-process-env-and-configuration": { code: "NODE-05", name: "Read Environment Variables Safely", topicId: "nodejs" },
  "/learn/nodejs/node17-error-handling-and-exit-codes": { code: "NODE-11", name: "Handle Errors with try...catch", topicId: "nodejs" },
  "/learn/nodejs/node18-graceful-shutdown-signals": { code: "NODE-17", name: "Use process and Exit Codes", topicId: "nodejs" },
  "/learn/nodejs/node19-application-architecture-clean-design": { code: "NODE-20", name: "Keep a Node.js Application Responsive", topicId: "nodejs" },
  "/learn/nodejs/node20-debugging-node-inspector": { code: "NODE-18", name: "Debug Node.js Code", topicId: "nodejs" },
  "/learn/nodejs/node21-testing-with-node-test-runner": { code: "NODE-19", name: "Write Basic Tests", topicId: "nodejs" },
  "/learn/nodejs/node22-best-practices-and-anti-patterns": { code: "NODE-20", name: "Keep a Node.js Application Responsive", topicId: "nodejs" },
  "/learn/nodejs/node23-core-interview-concepts": { code: "NODE-20", name: "Keep a Node.js Application Responsive", topicId: "nodejs" },
  "/learn/nodejs/node24-nodejs-capstone-project": { code: "NODE-20", name: "Keep a Node.js Application Responsive", topicId: "nodejs" },

  // PostgreSQL Official Lessons (22 Lessons)
  "/learn/postgresql/pg01-what-is-postgresql": { code: "PG-01", name: "What Is PostgreSQL?", topicId: "postgresql" },
  "/learn/postgresql/pg02-database-table-row-column": { code: "PG-02", name: "Database, Table, Row, and Column", topicId: "postgresql" },
  "/learn/postgresql/pg03-common-data-types": { code: "PG-03", name: "Common Data Types", topicId: "postgresql" },
  "/learn/postgresql/pg04-create-tables-and-constraints": { code: "PG-04", name: "Create Tables and Add Rules (Constraints)", topicId: "postgresql" },
  "/learn/postgresql/pg05-crud-operations": { code: "PG-05", name: "Add, Read, Change, and Delete Rows (CRUD)", topicId: "postgresql" },
  "/learn/postgresql/pg06-filter-sort-limit": { code: "PG-06", name: "Filter, Sort, and Limit Rows", topicId: "postgresql" },
  "/learn/postgresql/pg07-null-and-missing-values": { code: "PG-07", name: "Understand NULL (Missing Values)", topicId: "postgresql" },
  "/learn/postgresql/pg08-relationships-and-foreign-keys": { code: "PG-08", name: "Connect Tables with Keys and Relationships", topicId: "postgresql" },
  "/learn/postgresql/pg09-join-related-tables": { code: "PG-09", name: "Join Related Tables", topicId: "postgresql" },
  "/learn/postgresql/pg10-aggregate-functions-group-by-having": { code: "PG-10", name: "Group Data and Calculate Totals", topicId: "postgresql" },
  "/learn/postgresql/pg11-subqueries-and-ctes": { code: "PG-11", name: "Break Big Queries into Smaller Steps", topicId: "postgresql" },
  "/learn/postgresql/pg12-update-and-returning": { code: "PG-12", name: "Change Rows Safely and Get Immediate Results", topicId: "postgresql" },
  "/learn/postgresql/pg13-transactions-and-acid": { code: "PG-13", name: "Keep Data Safe with Transactions (ACID)", topicId: "postgresql" },
  "/learn/postgresql/pg14-database-design-and-normalization": { code: "PG-14", name: "Organize Tables to Avoid Duplicate Work", topicId: "postgresql" },
  "/learn/postgresql/pg15-indexes-find-rows-faster": { code: "PG-15", name: "Find Rows Faster with Indexes", topicId: "postgresql" },
  "/learn/postgresql/pg16-query-plan-explain": { code: "PG-16", name: "See How PostgreSQL Runs a Query", topicId: "postgresql" },
  "/learn/postgresql/pg17-views": { code: "PG-17", name: "Save Useful Queries as Views", topicId: "postgresql" },
  "/learn/postgresql/pg18-jsonb-store-and-read": { code: "PG-18", name: "Store and Read Flexible JSON Data", topicId: "postgresql" },
  "/learn/postgresql/pg19-pagination-limit-offset-keyset": { code: "PG-19", name: "Show Long Lists Page by Page", topicId: "postgresql" },
  "/learn/postgresql/pg20-safe-queries-and-sql-injection": { code: "PG-20", name: "Protect Your Database from Bad Input", topicId: "postgresql" },
  "/learn/postgresql/pg21-database-roles-and-permissions": { code: "PG-21", name: "Decide Who Can See and Change Data", topicId: "postgresql" },
  "/learn/postgresql/pg22-backups-and-restoring-data": { code: "PG-22", name: "Make Copies and Restore Your Database", topicId: "postgresql" },

  // PostgreSQL Legacy Slugs (Backward Compatibility)
  "/learn/postgresql/pg02-databases-schemas-tables": { code: "PG-02", name: "Database, Table, Row, and Column", topicId: "postgresql" },
  "/learn/postgresql/pg03-core-data-types": { code: "PG-03", name: "Common Data Types", topicId: "postgresql" },
  "/learn/postgresql/pg04-create-table-ddl": { code: "PG-04", name: "Create Tables and Add Rules (Constraints)", topicId: "postgresql" },
  "/learn/postgresql/pg05-insert-and-select": { code: "PG-05", name: "Add, Read, Change, and Delete Rows (CRUD)", topicId: "postgresql" },
  "/learn/postgresql/pg06-update-and-delete": { code: "PG-05", name: "Add, Read, Change, and Delete Rows (CRUD)", topicId: "postgresql" },
  "/learn/postgresql/pg07-returning-clause": { code: "PG-12", name: "Change Rows Safely and Get Immediate Results", topicId: "postgresql" },
  "/learn/postgresql/pg08-where-filtering-operators": { code: "PG-06", name: "Filter, Sort, and Limit Rows", topicId: "postgresql" },
  "/learn/postgresql/pg09-null-three-valued-logic": { code: "PG-07", name: "Understand NULL (Missing Values)", topicId: "postgresql" },
  "/learn/postgresql/pg10-ordering-and-pagination": { code: "PG-06", name: "Filter, Sort, and Limit Rows", topicId: "postgresql" },
  "/learn/postgresql/pg11-primary-foreign-keys": { code: "PG-08", name: "Connect Tables with Keys and Relationships", topicId: "postgresql" },
  "/learn/postgresql/pg12-inner-join-multi-table": { code: "PG-09", name: "Join Related Tables", topicId: "postgresql" },
  "/learn/postgresql/pg13-outer-joins-left-right": { code: "PG-09", name: "Join Related Tables", topicId: "postgresql" },
  "/learn/postgresql/pg14-modeling-cardinality": { code: "PG-08", name: "Connect Tables with Keys and Relationships", topicId: "postgresql" },
  "/learn/postgresql/pg15-aggregate-functions-group-by": { code: "PG-10", name: "Group Data and Calculate Totals", topicId: "postgresql" },
  "/learn/postgresql/pg16-having-vs-where": { code: "PG-10", name: "Group Data and Calculate Totals", topicId: "postgresql" },
  "/learn/postgresql/pg17-subqueries-and-ctes": { code: "PG-11", name: "Break Big Queries into Smaller Steps", topicId: "postgresql" },
  "/learn/postgresql/pg18-window-functions": { code: "PG-11", name: "Break Big Queries into Smaller Steps", topicId: "postgresql" },
  "/learn/postgresql/pg19-upserts-on-conflict": { code: "PG-05", name: "Add, Read, Change, and Delete Rows (CRUD)", topicId: "postgresql" },
  "/learn/postgresql/pg20-normalization-1nf-2nf-3nf": { code: "PG-14", name: "Organize Tables to Avoid Duplicate Work", topicId: "postgresql" },
  "/learn/postgresql/pg21-strategic-denormalization": { code: "PG-14", name: "Organize Tables to Avoid Duplicate Work", topicId: "postgresql" },
  "/learn/postgresql/pg22-jsonb-semi-structured-data": { code: "PG-18", name: "Store and Read Flexible JSON Data", topicId: "postgresql" },
  "/learn/postgresql/pg23-constraints-integrity": { code: "PG-04", name: "Create Tables and Add Rules (Constraints)", topicId: "postgresql" },
  "/learn/postgresql/pg24-foreign-key-referential-actions": { code: "PG-08", name: "Connect Tables with Keys and Relationships", topicId: "postgresql" },
  "/learn/postgresql/pg25-transactions-acid-foundations": { code: "PG-13", name: "Keep Data Safe with Transactions (ACID)", topicId: "postgresql" },
  "/learn/postgresql/pg26-isolation-levels-concurrency": { code: "PG-13", name: "Keep Data Safe with Transactions (ACID)", topicId: "postgresql" },
  "/learn/postgresql/pg27-indexes-btree-compound": { code: "PG-15", name: "Find Rows Faster with Indexes", topicId: "postgresql" },
  "/learn/postgresql/pg28-explain-analyze-query-plans": { code: "PG-16", name: "See How PostgreSQL Runs a Query", topicId: "postgresql" },
  "/learn/postgresql/pg29-debugging-production-best-practices": { code: "PG-20", name: "Protect Your Database from Bad Input", topicId: "postgresql" },

  // MongoDB Official Lessons (20 Lessons)
  "/learn/mongodb/mdb01-what-is-mongodb": { code: "MDB-01", name: "What Is MongoDB?", topicId: "mongodb" },
  "/learn/mongodb/mdb02-databases-collections-documents-and-bson": { code: "MDB-02", name: "Databases, Collections, Documents, and BSON", topicId: "mongodb" },
  "/learn/mongodb/mdb03-working-with-mongodb-using-mongosh": { code: "MDB-03", name: "Working with MongoDB Using mongosh", topicId: "mongodb" },
  "/learn/mongodb/mdb04-insert-documents": { code: "MDB-04", name: "Insert Documents", topicId: "mongodb" },
  "/learn/mongodb/mdb05-find-documents": { code: "MDB-05", name: "Find Documents", topicId: "mongodb" },
  "/learn/mongodb/mdb06-filter-documents-with-query-operators": { code: "MDB-06", name: "Filter Documents with Query Operators", topicId: "mongodb" },
  "/learn/mongodb/mdb07-choose-fields-sort-results-and-limit-results": { code: "MDB-07", name: "Choose Fields, Sort Results, and Limit Results", topicId: "mongodb" },
  "/learn/mongodb/mdb08-update-documents": { code: "MDB-08", name: "Update Documents", topicId: "mongodb" },
  "/learn/mongodb/mdb09-delete-documents-safely": { code: "MDB-09", name: "Delete Documents Safely", topicId: "mongodb" },
  "/learn/mongodb/mdb10-arrays-and-embedded-documents": { code: "MDB-10", name: "Arrays and Embedded Documents", topicId: "mongodb" },
  "/learn/mongodb/mdb11-embedding-vs-referencing-related-data": { code: "MDB-11", name: "Embedding vs. Referencing Related Data", topicId: "mongodb" },
  "/learn/mongodb/mdb12-schema-validation": { code: "MDB-12", name: "Schema Validation", topicId: "mongodb" },
  "/learn/mongodb/mdb13-indexes": { code: "MDB-13", name: "Indexes", topicId: "mongodb" },
  "/learn/mongodb/mdb14-check-a-query-with-explain": { code: "MDB-14", name: "Check a Query with explain()", topicId: "mongodb" },
  "/learn/mongodb/mdb15-pagination": { code: "MDB-15", name: "Pagination", topicId: "mongodb" },
  "/learn/mongodb/mdb16-aggregation-pipeline": { code: "MDB-16", name: "Aggregation Pipeline", topicId: "mongodb" },
  "/learn/mongodb/mdb17-combine-data-with-lookup": { code: "MDB-17", name: "Combine Data with $lookup", topicId: "mongodb" },
  "/learn/mongodb/mdb18-atomic-updates-and-transactions": { code: "MDB-18", name: "Atomic Updates and Transactions", topicId: "mongodb" },
  "/learn/mongodb/mdb19-database-security-basics": { code: "MDB-19", name: "Database Security Basics", topicId: "mongodb" },
  "/learn/mongodb/mdb20-backups-replication-and-scaling": { code: "MDB-20", name: "Backups, Replication, and Scaling — The Basic Idea", topicId: "mongodb" },

  // MongoDB Legacy Aliases
  "/learn/mongodb/mdb02-databases-collections-bson": { code: "MDB-02", name: "Databases, Collections, Documents, and BSON", topicId: "mongodb" },
  "/learn/mongodb/mdb03-mongosh-and-compass": { code: "MDB-03", name: "Working with MongoDB Using mongosh", topicId: "mongodb" },
  "/learn/mongodb/mdb04-create-insert": { code: "MDB-04", name: "Insert Documents", topicId: "mongodb" },
  "/learn/mongodb/mdb05-read-find-projections": { code: "MDB-05", name: "Find Documents", topicId: "mongodb" },
  "/learn/mongodb/mdb06-update-operators": { code: "MDB-08", name: "Update Documents", topicId: "mongodb" },
  "/learn/mongodb/mdb07-delete-documents": { code: "MDB-09", name: "Delete Documents Safely", topicId: "mongodb" },
  "/learn/mongodb/mdb08-comparison-logical-operators": { code: "MDB-06", name: "Filter Documents with Query Operators", topicId: "mongodb" },
  "/learn/mongodb/mdb09-element-evaluation-operators": { code: "MDB-06", name: "Filter Documents with Query Operators", topicId: "mongodb" },
  "/learn/mongodb/mdb10-sort-limit-pagination": { code: "MDB-07", name: "Choose Fields, Sort Results, and Limit Results", topicId: "mongodb" },
  "/learn/mongodb/mdb11-querying-arrays-nested": { code: "MDB-10", name: "Arrays and Embedded Documents", topicId: "mongodb" },
  "/learn/mongodb/mdb12-updating-arrays-operators": { code: "MDB-08", name: "Update Documents", topicId: "mongodb" },
  "/learn/mongodb/mdb13-embedding-vs-referencing": { code: "MDB-11", name: "Embedding vs. Referencing Related Data", topicId: "mongodb" },
  "/learn/mongodb/mdb14-modeling-relationships": { code: "MDB-11", name: "Embedding vs. Referencing Related Data", topicId: "mongodb" },
  "/learn/mongodb/mdb15-denormalization-unbounded-growth": { code: "MDB-11", name: "Embedding vs. Referencing Related Data", topicId: "mongodb" },
  "/learn/mongodb/mdb16-schema-validation-rules": { code: "MDB-12", name: "Schema Validation", topicId: "mongodb" },
  "/learn/mongodb/mdb17-enforcing-validation-actions": { code: "MDB-12", name: "Schema Validation", topicId: "mongodb" },
  "/learn/mongodb/mdb18-aggregation-pipeline-model": { code: "MDB-16", name: "Aggregation Pipeline", topicId: "mongodb" },
  "/learn/mongodb/mdb19-group-metrics-accumulation": { code: "MDB-16", name: "Aggregation Pipeline", topicId: "mongodb" },
  "/learn/mongodb/mdb20-unwind-array-processing": { code: "MDB-16", name: "Aggregation Pipeline", topicId: "mongodb" },
  "/learn/mongodb/mdb21-lookup-collection-joins": { code: "MDB-17", name: "Combine Data with $lookup", topicId: "mongodb" },
  "/learn/mongodb/mdb22-indexes-fundamentals": { code: "MDB-13", name: "Indexes", topicId: "mongodb" },
  "/learn/mongodb/mdb23-explain-plan-esr-rule": { code: "MDB-14", name: "Check a Query with explain()", topicId: "mongodb" },
  "/learn/mongodb/mdb24-atomicity-multi-doc-transactions": { code: "MDB-18", name: "Atomic Updates and Transactions", topicId: "mongodb" },
  "/learn/mongodb/mdb25-debugging-anti-patterns": { code: "MDB-19", name: "Database Security Basics", topicId: "mongodb" },
  "/learn/mongodb/mdb26-troubleshooting-slow-queries": { code: "MDB-14", name: "Check a Query with explain()", topicId: "mongodb" },
  "/learn/mongodb/mdb26-production-best-practices": { code: "MDB-20", name: "Backups, Replication, and Scaling — The Basic Idea", topicId: "mongodb" },

  // Express.js Official Lessons (22 Lessons)
  "/learn/express/exp01-what-is-express": { code: "EXP-01", name: "What Is Express?", topicId: "express" },
  "/learn/express/exp02-starting-an-express-project": { code: "EXP-02", name: "Starting an Express Project", topicId: "express" },
  "/learn/express/exp03-requests-and-responses": { code: "EXP-03", name: "Requests and Responses", topicId: "express" },
  "/learn/express/exp04-http-methods-and-status-codes": { code: "EXP-04", name: "HTTP Methods and Status Codes", topicId: "express" },
  "/learn/express/exp05-routes-and-route-parameters": { code: "EXP-05", name: "Routes and Route Parameters", topicId: "express" },
  "/learn/express/exp06-query-parameters": { code: "EXP-06", name: "Query Parameters", topicId: "express" },
  "/learn/express/exp07-reading-a-request-body": { code: "EXP-07", name: "Reading a Request Body", topicId: "express" },
  "/learn/express/exp08-middleware": { code: "EXP-08", name: "Middleware", topicId: "express" },
  "/learn/express/exp09-routers-and-organizing-routes": { code: "EXP-09", name: "Routers and Organizing Routes", topicId: "express" },
  "/learn/express/exp10-sending-json-and-choosing-a-response": { code: "EXP-10", name: "Sending JSON and Choosing a Response", topicId: "express" },
  "/learn/express/exp11-build-rest-style-routes": { code: "EXP-11", name: "Build REST-Style Routes", topicId: "express" },
  "/learn/express/exp12-validate-user-input": { code: "EXP-12", name: "Validate User Input", topicId: "express" },
  "/learn/express/exp13-handling-errors": { code: "EXP-13", name: "Handling Errors", topicId: "express" },
  "/learn/express/exp14-async-route-handlers": { code: "EXP-14", name: "Async Route Handlers", topicId: "express" },
  "/learn/express/exp15-separate-route-logic-from-business-logic": { code: "EXP-15", name: "Separate Route Logic From Business Logic", topicId: "express" },
  "/learn/express/exp16-cors": { code: "EXP-16", name: "CORS", topicId: "express" },
  "/learn/express/exp17-authentication-and-authorization-basics": { code: "EXP-17", name: "Authentication and Authorization Basics", topicId: "express" },
  "/learn/express/exp18-basic-express-security": { code: "EXP-18", name: "Basic Express Security", topicId: "express" },
  "/learn/express/exp19-environment-variables-and-configuration": { code: "EXP-19", name: "Environment Variables and Configuration", topicId: "express" },
  "/learn/express/exp20-testing-express-routes": { code: "EXP-20", name: "Testing Express Routes", topicId: "express" },
  "/learn/express/exp21-logging-and-debugging-requests": { code: "EXP-21", name: "Logging and Debugging Requests", topicId: "express" },
  "/learn/express/exp22-build-a-small-rest-api": { code: "EXP-22", name: "Build a Small REST API", topicId: "express" },

  // Express.js Legacy Aliases
  "/learn/express/exp02-app-object": { code: "EXP-02", name: "Starting an Express Project", topicId: "express" },
  "/learn/express/exp03-req-res-cycle": { code: "EXP-03", name: "Requests and Responses", topicId: "express" },
  "/learn/express/exp04-http-methods-routes": { code: "EXP-04", name: "HTTP Methods and Status Codes", topicId: "express" },
  "/learn/express/exp05-route-query-params": { code: "EXP-05", name: "Routes and Route Parameters", topicId: "express" },
  "/learn/express/exp06-express-router": { code: "EXP-09", name: "Routers and Organizing Routes", topicId: "express" },
  "/learn/express/exp07-headers-status-json": { code: "EXP-10", name: "Sending JSON and Choosing a Response", topicId: "express" },
  "/learn/express/exp08-body-parsing": { code: "EXP-07", name: "Reading a Request Body", topicId: "express" },
  "/learn/express/exp09-response-helpers": { code: "EXP-10", name: "Sending JSON and Choosing a Response", topicId: "express" },
  "/learn/express/exp10-middleware-mental-model": { code: "EXP-08", name: "Middleware", topicId: "express" },
  "/learn/express/exp11-middleware-scopes": { code: "EXP-08", name: "Middleware", topicId: "express" },
  "/learn/express/exp12-custom-middleware-order": { code: "EXP-08", name: "Middleware", topicId: "express" },
  "/learn/express/exp13-rest-crud-endpoints": { code: "EXP-11", name: "Build REST-Style Routes", topicId: "express" },
  "/learn/express/exp14-pagination-filtering": { code: "EXP-06", name: "Query Parameters", topicId: "express" },
  "/learn/express/exp15-api-response-envelopes": { code: "EXP-10", name: "Sending JSON and Choosing a Response", topicId: "express" },
  "/learn/express/exp16-request-validation": { code: "EXP-12", name: "Validate User Input", topicId: "express" },
  "/learn/express/exp17-validation-middleware": { code: "EXP-12", name: "Validate User Input", topicId: "express" },
  "/learn/express/exp18-sync-async-errors": { code: "EXP-13", name: "Handling Errors", topicId: "express" },
  "/learn/express/exp19-error-handling-middleware": { code: "EXP-13", name: "Handling Errors", topicId: "express" },
  "/learn/express/exp20-404-global-error-handling": { code: "EXP-13", name: "Handling Errors", topicId: "express" },
  "/learn/express/exp21-controller-service-separation": { code: "EXP-15", name: "Separate Route Logic From Business Logic", topicId: "express" },
  "/learn/express/exp22-env-config-bootstrap": { code: "EXP-19", name: "Environment Variables and Configuration", topicId: "express" },
  "/learn/express/exp23-auth-concepts": { code: "EXP-17", name: "Authentication and Authorization Basics", topicId: "express" },
  "/learn/express/exp24-jwt-auth-middleware": { code: "EXP-17", name: "Authentication and Authorization Basics", topicId: "express" },
  "/learn/express/exp25-rbac-guards": { code: "EXP-17", name: "Authentication and Authorization Basics", topicId: "express" },
  "/learn/express/exp26-debugging-common-mistakes": { code: "EXP-21", name: "Logging and Debugging Requests", topicId: "express" },
  "/learn/express/exp27-testing-express-supertest": { code: "EXP-20", name: "Testing Express Routes", topicId: "express" },
  "/learn/express/exp28-production-best-practices": { code: "EXP-18", name: "Basic Express Security", topicId: "express" },
  // NestJS Canonical Lessons (19 Lessons)
  "/learn/nestjs/nj01-what-is-nestjs": { code: "NJ-01", name: "What Is NestJS?", topicId: "nestjs" },
  "/learn/nestjs/nj03-project-structure-and-main": { code: "NJ-03", name: "Project Structure and main.ts", topicId: "nestjs" },
  "/learn/nestjs/nj04-modules": { code: "NJ-04", name: "Modules", topicId: "nestjs" },
  "/learn/nestjs/nj05-controllers": { code: "NJ-05", name: "Controllers", topicId: "nestjs" },
  "/learn/nestjs/nj06-routes-and-http-methods": { code: "NJ-06", name: "Routes and HTTP Methods", topicId: "nestjs" },
  "/learn/nestjs/nj07-parameters-and-request-bodies": { code: "NJ-07", name: "Route Parameters, Query Parameters, and Request Bodies", topicId: "nestjs" },
  "/learn/nestjs/nj08-providers-and-services": { code: "NJ-08", name: "Providers and Services", topicId: "nestjs" },
  "/learn/nestjs/nj09-dependency-injection": { code: "NJ-09", name: "Dependency Injection", topicId: "nestjs" },
  "/learn/nestjs/nj10-decorators": { code: "NJ-10", name: "Decorators", topicId: "nestjs" },
  "/learn/nestjs/nj11-dtos-data-transfer-objects": { code: "NJ-11", name: "DTOs (Data Transfer Objects)", topicId: "nestjs" },
  "/learn/nestjs/nj12-validation-and-pipes": { code: "NJ-12", name: "Validation and Pipes", topicId: "nestjs" },
  "/learn/nestjs/nj13-handling-errors": { code: "NJ-13", name: "Handling Errors", topicId: "nestjs" },
  "/learn/nestjs/nj14-middleware": { code: "NJ-14", name: "Middleware", topicId: "nestjs" },
  "/learn/nestjs/nj15-guards-and-route-protection": { code: "NJ-15", name: "Guards and Route Protection", topicId: "nestjs" },
  "/learn/nestjs/nj16-interceptors": { code: "NJ-16", name: "Interceptors", topicId: "nestjs" },
  "/learn/nestjs/nj17-the-request-lifecycle": { code: "NJ-17", name: "The Request Lifecycle", topicId: "nestjs" },
  "/learn/nestjs/nj18-authentication-vs-authorization": { code: "NJ-18", name: "Authentication vs. Authorization", topicId: "nestjs" },
  "/learn/nestjs/nj19-testing-a-nestjs-service": { code: "NJ-19", name: "Testing a NestJS Service", topicId: "nestjs" },
  "/learn/nestjs/nj20-organize-a-feature-and-debug": { code: "NJ-20", name: "Organize a Feature and Debug Common Problems", topicId: "nestjs" },

  // NestJS Legacy Slugs (Backward Compatibility)
  "/learn/nestjs/nj01-typescript-essentials": { code: "NJ-01", name: "TypeScript Essentials", topicId: "nestjs" },
  "/learn/nestjs/nj02-oop-foundations": { code: "NJ-02", name: "OOP Foundations", topicId: "nestjs" },
  "/learn/nestjs/nj03-decorators": { code: "NJ-03", name: "Decorators Deep Dive", topicId: "nestjs" },
  "/learn/nestjs/nj04-solid": { code: "NJ-04", name: "SOLID Principles", topicId: "nestjs" },
  "/learn/nestjs/nj05-setup": { code: "NJ-05", name: "NestJS Setup & CLI", topicId: "nestjs" },
  "/learn/nestjs/nj06-modules": { code: "NJ-06", name: "Modules & Architecture", topicId: "nestjs" },
  "/learn/nestjs/nj07-controllers": { code: "NJ-07", name: "Controllers & Routing", topicId: "nestjs" },
  "/learn/nestjs/nj08-services": { code: "NJ-08", name: "Services & Business Logic", topicId: "nestjs" },
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

  // Next.js Canonical Lessons (NX-01 through NX-20)
  "/learn/nextjs/nx01-what-is-nextjs": { code: "NX-01", name: "What Is Next.js?", topicId: "nextjs" },
  "/learn/nextjs/nx02-app-folder-and-routes": { code: "NX-02", name: "The App Folder and File-Based Routing", topicId: "nextjs" },
  "/learn/nextjs/nx03-pages-and-layouts": { code: "NX-03", name: "Pages and Shared Layouts", topicId: "nextjs" },
  "/learn/nextjs/nx04-moving-between-pages-with-link": { code: "NX-04", name: "Moving Between Pages with Next.js Link", topicId: "nextjs" },
  "/learn/nextjs/nx05-dynamic-routes": { code: "NX-05", name: "Dynamic Routes and URL Parameters", topicId: "nextjs" },
  "/learn/nextjs/nx06-server-and-client-components": { code: "NX-06", name: "Server Components vs Client Components", topicId: "nextjs" },
  "/learn/nextjs/nx07-client-side-interaction": { code: "NX-07", name: "Adding Interactivity with Client Components", topicId: "nextjs" },
  "/learn/nextjs/nx08-fetching-data-server-component": { code: "NX-08", name: "Fetching Data in a Server Component", topicId: "nextjs" },
  "/learn/nextjs/nx09-url-and-search-parameters": { code: "NX-09", name: "URL Parameters and Search Parameters", topicId: "nextjs" },
  "/learn/nextjs/nx10-loading-ui": { code: "NX-10", name: "Loading UI with Suspense and Skeletons", topicId: "nextjs" },
  "/learn/nextjs/nx11-missing-pages-and-errors": { code: "NX-11", name: "Handling Missing Pages and Errors", topicId: "nextjs" },
  "/learn/nextjs/nx12-forms-and-server-actions": { code: "NX-12", name: "Forms and Server Actions", topicId: "nextjs" },
  "/learn/nextjs/nx13-route-handlers": { code: "NX-13", name: "Custom API Endpoints with Route Handlers", topicId: "nextjs" },
  "/learn/nextjs/nx14-revalidating-data": { code: "NX-14", name: "Revalidating Cached Data", topicId: "nextjs" },
  "/learn/nextjs/nx15-page-titles-and-metadata": { code: "NX-15", name: "Page Titles and Metadata for SEO", topicId: "nextjs" },
  "/learn/nextjs/nx16-images-and-static-files": { code: "NX-16", name: "Optimizing Images and Static Files", topicId: "nextjs" },
  "/learn/nextjs/nx17-environment-variables-and-secrets": { code: "NX-17", name: "Environment Variables and Secrets", topicId: "nextjs" },
  "/learn/nextjs/nx18-authentication-and-authorization": { code: "NX-18", name: "Authentication and Protected Routes", topicId: "nextjs" },
  "/learn/nextjs/nx19-validating-user-input": { code: "NX-19", name: "Validating User Input Safely", topicId: "nextjs" },
  "/learn/nextjs/nx20-debugging-nextjs-problems": { code: "NX-20", name: "Debugging Common Next.js Problems", topicId: "nextjs" },
  "/learn/nextjs/nx21-website-performance-optimization": { code: "NX-21", name: "Website Performance Optimization", topicId: "nextjs" },

  // Next.js Legacy Slugs (Backward Compatibility)
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
  "/learn/nextjs/nx21-performance-optimization": { code: "NX-21", name: "Website Performance Optimization", topicId: "nextjs" },

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
