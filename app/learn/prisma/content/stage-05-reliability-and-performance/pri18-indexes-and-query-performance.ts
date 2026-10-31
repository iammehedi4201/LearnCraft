import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri18IndexesAndQueryPerformanceContent: StandardLessonContent = {
  slug: "pri18-indexes-and-query-performance",
  code: "PRI-18",
  title: "Indexes and Query Performance",
  subtitle: "Accelerate query lookups and enforce uniqueness using @@index and @@unique schema attributes.",
  difficulty: "Moderate",
  scenario: {
    question: "A large user table is often searched by `lastName`, and those searches are slow. What should you check?",
    answer: "Check the query plan and consider adding an index to `lastName`. Then measure the query time again.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "Real-World Scenarios & Practice", tag: "SCENARIOS & PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Indexes and Query Performance",
    bigPicture: "Without an index, the database must scan every single row in a table to find matching records (a full table scan). As a table grows to hundreds of thousands of rows, queries slow down noticeably.\n\nAn index is a specialized data structure (usually a B-Tree) that lets the database find matching rows in milliseconds.\n\nIn Prisma, you declare indexes directly in your models using the `@@index` attribute. Unique constraints (`@unique` and `@@unique`) also automatically create database indexes.",
    codeSnippet: "model User {\n  id        Int      @id @default(autoincrement())\n  email     String   @unique\n  lastName  String\n  createdAt DateTime @default(now())\n\n  @@index([lastName])\n  @@index([createdAt])\n}",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. @@index([lastName])",
                "desc": "Creates a B-Tree database index on the lastName column, speeding up WHERE and ORDER BY queries on that field."
          },
          {
                "title": "2. Automatic indexes",
                "desc": "Fields marked with @id and @unique automatically create unique indexes in the database."
          },
          {
                "title": "3. Compound indexes",
                "desc": "You can index multiple columns together (e.g. @@index([lastName, firstName])) for queries that filter by both."
          },
          {
                "title": "4. Trade-off",
                "desc": "Indexes speed up read queries (SELECT) but add slight overhead to write operations (INSERT, UPDATE, DELETE) because the index must be kept up to date."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Strategic indexes keep database lookups fast and sub-millisecond even as tables grow into millions of rows.",
    rule: {
      title: "Index Query Path Rule",
      content: "Index the columns you frequently filter by (where), sort by (orderBy), or join on (foreign keys). Avoid indexing rarely queried columns to prevent write overhead.",
    },
    cards: [
          {
                "number": "01",
                "tag": "LOOKUP SPEED",
                "title": "B-Tree Indexes",
                "description": "Turns slow O(N) full table scans into lightning fast O(log N) index lookups.",
                "color": "purple"
          },
          {
                "number": "02",
                "tag": "FOREIGN KEYS",
                "title": "Index Relation Keys",
                "description": "In PostgreSQL, foreign key columns (like authorId) should have an @@index to speed up relational joins.",
                "color": "emerald"
          },
          {
                "number": "03",
                "tag": "WRITE TRADE-OFF",
                "title": "Balance Reads vs Writes",
                "description": "Every index adds overhead to inserts and updates. Index intentionally based on measured query performance.",
                "color": "cyan"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Designing compound indexes for multi-column search:",
    points: [
          {
                "title": "Compound Indexes (ESR Rule)",
                "content": "When queries frequently filter by organizationId and status together, a compound index provides maximum speed.",
                "codeSnippet": "model Task {\n  id      Int    @id @default(autoincrement())\n  orgId   Int\n  status  String\n  dueDate DateTime\n\n  @@index([orgId, status])\n}"
          },
          {
                "title": "Query Plans and EXPLAIN",
                "content": "Before and after adding an index, inspect execution using PostgreSQL's EXPLAIN ANALYZE to verify the database performs an Index Scan rather than a Sequential Scan."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Over-indexing every single column in a table blindly.",
    badApproach: {
      title: "Adding Indexes to Every Field",
      code: "// Flawed: Pointless indexes on rarely searched columns\nmodel Log {\n  id        Int      @id @default(autoincrement())\n  message   String\n  @@index([id])      // Redundant! @id already creates an index\n  @@index([message]) // Heavy and rarely queried via exact match\n}",
      flaw: "Consumes excessive disk storage and significantly slows down bulk inserts and updates.",
    },
    betterApproach: {
      title: "Targeted Indexing on Query Filters",
      code: "// Clean: Indexing only high-frequency query columns\nmodel Log {\n  id        Int      @id @default(autoincrement())\n  level     String\n  createdAt DateTime @default(now())\n\n  @@index([level, createdAt])\n}",
      benefit: "Accelerates common filtering by log level and time range without wasting disk and write performance.",
    },
    whyItMatters: "Strategic indexing balances read acceleration with write efficiency.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Inspect index declarations in a Prisma schema:",
    starterCode: "// Example index declarations\nmodel User {\n  id        Int      @id @default(autoincrement())\n  email     String   @unique\n  lastName  String\n  status    String\n  createdAt DateTime @default(now())\n\n  @@index([lastName])\n  @@index([status, createdAt])\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "How do you declare a database index on the 'lastName' field in a Prisma model?",
      options: [
              "Add @@index([lastName]) inside the model block",
              "Set lastName String @indexed",
              "Run 'npx prisma index --field=lastName'",
              "Indexes are not supported in Prisma schema"
      ],
      correctIndex: 0,
      explanation: "In Prisma schema, you define indexes at the model level using the @@index attribute, passing an array of fields: @@index([lastName]).",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "Indexes Accelerate Searches",
                "desc": "Indexes allow the database to locate rows in milliseconds without full table scans."
          },
          {
                "title": "@@index in Schema",
                "desc": "Declare indexes directly in models using @@index([field])."
          },
          {
                "title": "Index Relation Keys",
                "desc": "Always index foreign keys and frequent filter columns."
          }
    ],
  },
};
