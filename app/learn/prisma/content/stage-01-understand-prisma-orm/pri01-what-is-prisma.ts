import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri01WhatIsPrismaContent: StandardLessonContent = {
  slug: "pri01-what-is-prisma",
  code: "PRI-01",
  title: "What Is Prisma ORM?",
  subtitle: "Prisma ORM connects TypeScript and JavaScript applications to relational databases with type-safe models and queries.",
  difficulty: "Easy",
  scenario: {
    question: "Your application needs to show a list of users. A developer writes `prisma.user.findMany()`. What is Prisma doing here?",
    answer: "Prisma sends a request to the database to get user records and returns the result to the application.",
  },
  interviewQuestion: {
    question: "What is Prisma ORM?",
    answer: "Prisma is an ORM that helps an application work with a database through typed models and Prisma Client queries. It makes common database operations easier to write and understand.",
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
    title: "What Is Prisma ORM?",
    bigPicture: "Prisma ORM is a tool that helps a TypeScript or JavaScript application work with a database. Instead of writing SQL for every common operation, you can use Prisma Client methods such as `findMany()` and `create()`.\n\nPrisma does not replace the database. Your data still lives in PostgreSQL or another supported database. Prisma provides a typed way for your application to read and change that data.\n\nPrisma Client gives TypeScript-aware queries and helps catch many mistakes while writing code. It does not remove the need to understand the database or check what a query does.",
    codeSnippet: "const users = await prisma.user.findMany();\n\nconsole.log(users);",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. prisma.user",
                "desc": "Selects the User model declared in your Prisma schema."
          },
          {
                "title": "2. findMany()",
                "desc": "Asks the database for all matching records from the corresponding database table."
          },
          {
                "title": "3. await",
                "desc": "Waits asynchronously for the database request to complete."
          },
          {
                "title": "4. Returned users",
                "desc": "The returned records are stored in users with full TypeScript types."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Applications need a clean, reliable way to talk to databases without manual SQL string concatenation or runtime type surprises.",
    rule: {
      title: "The ORM Data Bridge Rule",
      content: "Prisma ORM acts as a type-safe bridge between application code and the database. It generates TypeScript types directly from your database schema, preventing runtime type mismatches.",
    },
    cards: [
          {
                "number": "01",
                "tag": "TYPE SAFETY",
                "title": "End-to-End Type Safety",
                "description": "Prisma Client queries return strongly typed TypeScript objects matching your exact schema fields, catching typos at compile time.",
                "color": "purple"
          },
          {
                "number": "02",
                "tag": "DATABASE RETAINED",
                "title": "Database Stays In Control",
                "description": "Prisma does not replace PostgreSQL or SQLite. Your database manages storage, constraints, indexes, and transactions while Prisma streamlines querying.",
                "color": "emerald"
          },
          {
                "number": "03",
                "tag": "QUERY METHODS",
                "title": "Intuitive Client Methods",
                "description": "Methods like findMany, create, update, and delete express database actions cleanly without hand-written SQL queries.",
                "color": "cyan"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Consider how an application queries data with Prisma Client versus raw SQL strings.",
    points: [
          {
                "title": "Prisma Client vs Raw SQL Concatenation",
                "content": "Raw string SQL queries lack autocomplete, risk syntax typos, and easily lead to SQL injection if variables are concatenated manually. Prisma Client methods provide autocomplete and parameterize queries automatically.",
                "codeSnippet": "// Raw SQL query: vulnerable and untyped\n// const users = await db.query(\"SELECT * FROM users WHERE email = '\" + input + \"'\");\n\n// Prisma Client: auto-parameterized and strongly typed\nconst users = await prisma.user.findMany({\n  where: { email: input },\n});"
          },
          {
                "title": "Model Centric Design",
                "content": "Every table in your database maps to a Prisma model. Changes in the schema immediately reflect in TypeScript types when running prisma generate."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Assuming Prisma replaces the database or that database constraints are no longer necessary.",
    badApproach: {
      title: "Relying Solely on App-Level Validation",
      code: "// Flawed: Skipping schema-level constraints and database uniqueness\nmodel User {\n  id    Int    @id @default(autoincrement())\n  email String // Missing @unique! Allows duplicate emails in DB!\n}",
      flaw: "Without database-level constraints like @unique, concurrent requests can insert duplicate records even if app-level validation checks first.",
    },
    betterApproach: {
      title: "Enforcing Constraints in Prisma Schema",
      code: "model User {\n  id        Int      @id @default(autoincrement())\n  email     String   @unique\n  createdAt DateTime @default(now())\n}",
      benefit: "The database enforces unique email integrity at the storage level, guaranteeing zero duplicates even under heavy concurrency.",
    },
    whyItMatters: "An ORM makes querying easier, but the database remains the ultimate authority on data integrity, constraints, and durability.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Explore querying records with Prisma Client:",
    starterCode: "// Example Prisma Client query\nimport { PrismaClient } from \"@prisma/client\";\n\nconst prisma = new PrismaClient();\n\nasync function run() {\n  // Query all users\n  const users = await prisma.user.findMany();\n  console.log(\"Users found:\", users);\n}\n\nrun();",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the primary role of Prisma ORM in an application?",
      options: [
              "It replaces the database engine with an in-memory storage cache",
              "It acts as a typed bridge between your TypeScript application and the database",
              "It compiles TypeScript files into native machine code binaries",
              "It manages CSS stylesheet bundling and static asset distribution"
      ],
      correctIndex: 1,
      explanation: "Prisma ORM is a data-access layer that connects your TypeScript/JavaScript application to your database with type-safe models and generated Prisma Client queries.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "Prisma is an ORM",
                "desc": "Prisma provides a typed way to read and modify data in relational databases like PostgreSQL."
          },
          {
                "title": "Your Data Lives in the DB",
                "desc": "Prisma does not replace your database; it issues optimized queries against your underlying database engine."
          },
          {
                "title": "TypeScript Integration",
                "desc": "Prisma Client queries are generated from your schema, giving autocomplete and compile-time error checking."
          }
    ],
  },
};
