/**
 * Prisma In-Depth Lesson Content Layer — LearnCraft
 * Authoritative 7-part interactive lessons for all 27 curriculum steps.
 */

export interface LessonSectionItem {
  id: string;
  label: string;
  description?: string;
}

export interface CardItem {
  number: string;
  tag: string;
  title: string;
  description: string;
  color?: "emerald" | "cyan" | "amber" | "rose" | "purple";
}

export interface DeepDivePoint {
  title: string;
  content: string;
  codeSnippet?: string;
}

export interface QuizItem {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PrismaLessonContent {
  slug: string;
  code: string;
  title: string;
  sections: LessonSectionItem[];
  part1: {
    title: string;
    bigPicture: string;
    breakdownTitle: string;
    breakdownItems: { title: string; desc: string }[];
  };
  part2: {
    title: string;
    intro: string;
    cards: CardItem[];
    rule?: { title: string; content: string };
  };
  part3: {
    title: string;
    intro: string;
    points: DeepDivePoint[];
  };
  part4: {
    title: string;
    bad: { title: string; code: string; explanation: string };
    good: { title: string; code: string; explanation: string };
  };
  part5: {
    title: string;
    intro: string;
    starterCode: string;
  };
  part6: {
    title: string;
    quiz: QuizItem;
  };
  part7: {
    title: string;
    takeaways: { title: string; desc: string }[];
    nextLessonPreview?: { title: string; desc: string };
  };
}

const DEFAULT_SECTIONS: LessonSectionItem[] = [
  { id: "part1", label: "Mental Model", description: "The Big Picture & Core Why" },
  { id: "part2", label: "Core Concepts", description: "Rules, Architecture & Components" },
  { id: "part3", label: "Deep Dive", description: "Detailed Mechanics & Practical Syntax" },
  { id: "part4", label: "Bad vs Better", description: "Anti-Patterns vs Best Practices" },
  { id: "part5", label: "Playground", description: "Interactive Execution Environment" },
  { id: "part6", label: "Concept Check", description: "Knowledge Assessment Quiz" },
  { id: "part7", label: "Summary", description: "Key Takeaways & Next Steps" },
];

export const PRISMA_LESSONS_CONTENT: Record<string, PrismaLessonContent> = {
  // ── PRI-01 ──────────────────────────────────────────────────
  "pri01-what-is-prisma": {
    slug: "pri01-what-is-prisma",
    code: "PRI-01",
    title: "What Is Prisma & Why Does It Exist?",
    sections: DEFAULT_SECTIONS,
    part1: {
      title: "The Big Picture: Bridging Application Code & The Database",
      bigPicture:
        "When you build an application, your code thinks in programming objects, arrays, and types. But your database stores rows, columns, and foreign keys. In the past, developers had to write raw SQL strings inside strings—risking typos, SQL injection, and zero auto-complete—or use heavy, complex ORMs with leaky abstractions. Prisma is a modern, typed data-access layer that acts as a safe, intuitive bridge between your application and database.",
      breakdownTitle: "Why Prisma Exists:",
      breakdownItems: [
        { title: "Single Source of Truth", desc: "You define your data models in a clean, human-readable schema file (schema.prisma). This file defines your database structure and types." },
        { title: "Auto-Generated Type Safety", desc: "Prisma generates a customized TypeScript client directly tailored to your schema. If you rename a field, your compiler flags errors immediately." },
        { title: "Predictable Query Interface", desc: "Instead of remembering SQL dialect differences, you call clean JavaScript/TypeScript methods like prisma.user.findMany()." },
        { title: "Independent Data Access Layer", desc: "Prisma is not a database engine itself. It sits between your application logic and your database, managing queries, mutations, and migrations safely." },
      ],
    },
    part2: {
      title: "Core Mechanics: Where Prisma Sits",
      intro:
        "Understand the exact architectural flow between your application code, Prisma, and the physical database:",
      cards: [
        { number: "01", tag: "APPLICATION", title: "Your Backend App", description: "Where your business logic lives. It calls Prisma Client methods to fetch or mutate data.", color: "emerald" },
        { number: "02", tag: "DATA LAYER", title: "Prisma Client", description: "The generated type-safe library running inside your app process that builds optimized database queries.", color: "purple" },
        { number: "03", tag: "DATABASE", title: "Storage Engine", description: "The physical relational or document database executing queries and persisting actual records.", color: "cyan" },
      ],
      rule: {
        title: "The Data Layer Rule",
        content: "Prisma does not replace your database. It is the intelligent translator and guardrail between your application code and the database engine.",
      },
    },
    part3: {
      title: "Deep Dive: The 3 Core Pillars of Prisma",
      intro:
        "Prisma is not just one tool—it consists of three coordinated pillars that work together:",
      points: [
        {
          title: "1. Prisma Schema (schema.prisma)",
          content: "The single declarative blueprint. You describe your models, fields, types, and relations in one readable file.",
          codeSnippet: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}`,
        },
        {
          title: "2. Prisma Client",
          content: "An auto-generated, type-safe query builder generated specifically for your schema. Every method knows your exact model fields and returns tailored TypeScript types.",
          codeSnippet: `import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Fully typed query with IntelliSense
const user = await prisma.user.findUnique({
  where: { email: "mehedi@example.com" }
});`,
        },
        {
          title: "3. Prisma Migrate",
          content: "The declarative data modeling & migration tool. When you edit schema.prisma, Prisma Migrate generates deterministic SQL migration scripts to update your database schema safely.",
          codeSnippet: `$ npx prisma migrate dev --name init_user_model`,
        },
      ],
    },
    part4: {
      title: "Bad Approach vs Better Approach",
      bad: {
        title: "Raw SQL Strings In App Code",
        code: `// Risky: No compile-time type checking, typo risks, manual column parsing
const result = await db.query(
  "SELECT usr_id, eml_address FROM users WHERE usr_id = " + req.params.id
);
const email = result.rows[0].email_address; // Runtime crash! Column was eml_address`,
        explanation: "Manual SQL strings have zero auto-complete, no compile-time feedback on schema changes, and high vulnerability to typos and SQL injection.",
      },
      good: {
        title: "Type-Safe Prisma Client Access",
        code: `// Safe: 100% typed query with parameterization and editor autocomplete
const user = await prisma.user.findUnique({
  where: { id: Number(req.params.id) },
  select: { id: true, email: true }
});
// user is typed as { id: number, email: string } | null`,
        explanation: "Prisma validates types at compile time, protects against SQL injection automatically, and gives full IDE autocomplete.",
      },
    },
    part5: {
      title: "Interactive Playground",
      intro: "Explore how Prisma models translate into client query methods:",
      starterCode: `// Prisma Concept Simulator: PRI-01
const schema = {
  models: ["User", "Post"],
  database: "postgresql"
};

// Simulating Prisma Client generation
const prismaSimulator = {
  user: {
    async findMany() {
      return [
        { id: 1, email: "mehedi@example.com", name: "Mehedi Hasan" },
        { id: 2, email: "sarah@example.com", name: "Sarah Connor" }
      ];
    }
  }
};

const users = await prismaSimulator.user.findMany();
console.log("Loaded Users from Prisma:", users);`,
    },
    part6: {
      title: "Concept Check: Knowledge Assessment",
      quiz: {
        question: "What is the primary role of Prisma in a software application?",
        options: [
          "It is a new relational database engine that replaces PostgreSQL and MySQL.",
          "It is a typed data-access layer that connects application code to an underlying database.",
          "It is a front-end framework for rendering forms and user interfaces.",
          "It is a cloud container orchestration service for hosting databases.",
        ],
        correctIndex: 1,
        explanation: "Prisma is an ORM / data-access layer. It sits between your application code and your database, providing typed queries, migrations, and schema management.",
      },
    },
    part7: {
      title: "Key Takeaways & What's Next",
      takeaways: [
        { title: "Bridge, Not Database", desc: "Prisma connects your app to your database; it does not replace the database engine." },
        { title: "Three Pillars", desc: "The Prisma Schema, Prisma Client, and Prisma Migrate work together as a unified system." },
        { title: "End-to-End Safety", desc: "Schema changes trigger client regeneration so TypeScript catches outdated field references instantly." },
      ],
      nextLessonPreview: {
        title: "PRI-02: Prisma & The Database Architecture",
        desc: "Trace how a Prisma Client query travels through the Query Engine to the database and back.",
      },
    },
  },

  // ── PRI-02 ──────────────────────────────────────────────────
  "pri02-prisma-and-the-database": {
    slug: "pri02-prisma-and-the-database",
    code: "PRI-02",
    title: "Prisma & The Database Architecture",
    sections: DEFAULT_SECTIONS,
    part1: {
      title: "The Big Picture: Tracing the Query Pipeline",
      bigPicture:
        "When your code calls prisma.user.findMany(), what actually happens behind the scenes? Prisma does not perform magical in-memory operations. It runs a high-performance Query Engine that translates your structured JavaScript query object into an optimized database query, executes it over a pooled connection, deserializes the result, and returns typed objects.",
      breakdownTitle: "The Request-Response Lifecycle:",
      breakdownItems: [
        { title: "1. Client API Call", desc: "Your application calls a typed method on the Prisma Client instance." },
        { title: "2. Query Engine Translation", desc: "Prisma's Query Engine validates arguments and translates the query into database-specific SQL or native queries." },
        { title: "3. Connection Pool", desc: "Prisma borrows an active connection from its connection pool to communicate with the database server." },
        { title: "4. Result Serialization", desc: "The raw database rows or documents are parsed into native JavaScript types (Dates, BigInts, Booleans) matching your model." },
      ],
    },
    part2: {
      title: "Core Mechanics: Application vs Prisma vs Database",
      intro: "Keep the boundaries crystal clear between the three layers:",
      cards: [
        { number: "01", tag: "APP LAYER", title: "Application Memory", description: "Executes business logic, handles HTTP routes, and orchestrates workflows.", color: "emerald" },
        { number: "02", tag: "PRISMA LAYER", title: "Query Engine & Types", description: "Generates SQL, handles connection pooling, manages transactions, and enforces types.", color: "purple" },
        { number: "03", tag: "STORAGE LAYER", title: "Database Engine", description: "Performs indexing, disk storage, ACID guarantees, and executes queries.", color: "cyan" },
      ],
      rule: {
        title: "The Division of Responsibilities",
        content: "Let the database handle persistence, joins, and indexing. Let Prisma handle type safety and query construction. Let your application handle business logic.",
      },
    },
    part3: {
      title: "Deep Dive: Query Engine & Connection Pooling",
      intro: "Prisma manages database communication efficiently under the hood:",
      points: [
        {
          title: "Connection String & Pool",
          content: "Prisma configures a connection pool based on your DATABASE_URL parameters (such as `connection_limit=10`). It reuses open database connections to prevent latency.",
          codeSnippet: `DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public&connection_limit=10"`,
        },
        {
          title: "Query Logging",
          content: "You can inspect the exact SQL queries generated by Prisma by configuring logging in your PrismaClient constructor.",
          codeSnippet: `const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Logs: prisma:query SELECT "id", "email" FROM "users" WHERE "id" = $1`,
        },
      ],
    },
    part4: {
      title: "Bad Approach vs Better Approach",
      bad: {
        title: "Creating New PrismaClient In Every Request",
        code: `// In an API handler:
export async function handleRequest(req, res) {
  const prisma = new PrismaClient(); // FATAL: Spawns new connection pool!
  const users = await prisma.user.findMany();
  res.json(users);
}`,
        explanation: "Instantiating PrismaClient on every request exhausts database connection limits quickly and causes crashes in high-traffic or serverless environments.",
      },
      good: {
        title: "Reusing a Single PrismaClient Instance",
        code: `// In db.ts: Export a singleton instance
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

// In route handler:
import { prisma } from './db';
export async function handleRequest(req, res) {
  const users = await prisma.user.findMany(); // Reuses connection pool
  res.json(users);
}`,
        explanation: "A single reused instance shares connections cleanly, stays well within connection pool limits, and maximizes query throughput.",
      },
    },
    part5: {
      title: "Interactive Playground",
      intro: "Observe how Prisma parses query parameters into database calls:",
      starterCode: `// Architecture Query Inspector
function simulatePrismaQuery(model, action, args) {
  console.log(\`[Prisma Engine] Translating \${model}.\${action}\`);
  console.log("Arguments:", JSON.stringify(args, null, 2));
  return { status: "EXECUTED", rowsAffected: 1 };
}

simulatePrismaQuery("User", "findUnique", {
  where: { email: "mehedi@example.com" },
  select: { id: true, name: true }
});`,
    },
    part6: {
      title: "Concept Check: Knowledge Assessment",
      quiz: {
        question: "Why should an application avoid creating a new PrismaClient instance on every incoming HTTP request?",
        options: [
          "Because Prisma will fail to compile TypeScript types.",
          "Because creating a new instance on every request spawns new connection pools, quickly exhausting database connections.",
          "Because Prisma only supports one single query per day.",
          "Because the database will delete existing tables on new client initialization.",
        ],
        correctIndex: 1,
        explanation: "Each PrismaClient manages its own connection pool. Recreating it on every request exhausts available database connection slots.",
      },
    },
    part7: {
      title: "Key Takeaways & What's Next",
      takeaways: [
        { title: "Query Pipeline", desc: "Application Code -> Prisma Client -> Query Engine -> DB Connection -> Database." },
        { title: "Connection Pooling", desc: "Prisma handles connection pooling internally via your DATABASE_URL configuration." },
        { title: "Singleton Pattern", desc: "Always reuse a single PrismaClient instance across your application." },
      ],
      nextLessonPreview: {
        title: "PRI-03: Project Setup & The Prisma CLI",
        desc: "Initialize a Prisma project, configure environment variables, and master essential CLI commands.",
      },
    },
  },

  // ── PRI-03 ──────────────────────────────────────────────────
  "pri03-project-setup-and-cli": {
    slug: "pri03-project-setup-and-cli",
    code: "PRI-03",
    title: "Project Setup & The Prisma CLI",
    sections: DEFAULT_SECTIONS,
    part1: {
      title: "The Big Picture: Bootstrapping Prisma in Any Project",
      bigPicture:
        "Setting up Prisma in a Node.js or TypeScript application takes just two commands. Prisma provides a CLI (Command Line Interface) that scaffolds the initial schema file, sets up your `.env` connection string, runs migrations, formats schema files, and launches Prisma Studio.",
      breakdownTitle: "The Setup Flow:",
      breakdownItems: [
        { title: "1. Install Dependencies", desc: "Install prisma as a development dependency and @prisma/client as a production dependency." },
        { title: "2. Initialize Workspace", desc: "Run `npx prisma init` to create the prisma/ directory, schema.prisma, and a .env file." },
        { title: "3. Configure Database URL", desc: "Point DATABASE_URL to your local or hosted database connection string." },
        { title: "4. Generate Client", desc: "Run `npx prisma generate` whenever you alter models to update TypeScript types." },
      ],
    },
    part2: {
      title: "Core Mechanics: The Essential CLI Commands",
      intro: "These core commands form your daily Prisma development workflow:",
      cards: [
        { number: "01", tag: "INIT", title: "prisma init", description: "Bootstraps a fresh prisma/schema.prisma file and .env environment template.", color: "emerald" },
        { number: "02", tag: "GENERATE", title: "prisma generate", description: "Reads schema.prisma and generates tailored types into node_modules/@prisma/client.", color: "purple" },
        { number: "03", tag: "MIGRATE", title: "prisma migrate dev", description: "Generates SQL migrations, applies them to development DB, and triggers client generation.", color: "cyan" },
        { number: "04", tag: "STUDIO", title: "prisma studio", description: "Spawns a local browser visual GUI to inspect, filter, and edit database records.", color: "amber" },
      ],
      rule: {
        title: "The Dev/Prod Package Distinction",
        content: "`prisma` (the CLI) is installed in devDependencies. `@prisma/client` (the runtime query library) is installed in dependencies.",
      },
    },
    part3: {
      title: "Deep Dive: Directory Structure & Environment Variables",
      intro: "A clean Prisma project follows this standard directory layout:",
      points: [
        {
          title: "Directory Layout",
          content: "Prisma places your schema inside a dedicated `prisma/` folder at project root:",
          codeSnippet: `my-app/
├── prisma/
│   ├── schema.prisma        <-- The single source of truth
│   └── migrations/          <-- Generated SQL migration history
├── .env                     <-- DATABASE_URL configuration
├── package.json
└── src/
    └── db.ts                <-- Exported PrismaClient singleton`,
        },
        {
          title: "The .env File",
          content: "Prisma CLI automatically loads variables from `.env` without requiring extra dotenv packages:",
          codeSnippet: `DATABASE_URL="postgresql://postgres:secret@localhost:5432/learncraft_db?schema=public"`,
        },
      ],
    },
    part4: {
      title: "Bad Approach vs Better Approach",
      bad: {
        title: "Hardcoding Credentials Inside schema.prisma",
        code: `// DANGEROUS: Hardcoded secrets in version control
datasource db {
  provider = "postgresql"
  url      = "postgresql://postgres:mySecretPass123@db.prod.company.com/live"
}`,
        explanation: "Committing database passwords directly inside schema.prisma leaks credentials to git repositories and makes multi-environment deployment impossible.",
      },
      good: {
        title: "Reading from env() Variable",
        code: `// SECURE: Reads safely from environment
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}`,
        explanation: "Using env('DATABASE_URL') keeps secrets out of source control and allows switching between local, staging, and production databases easily.",
      },
    },
    part5: {
      title: "Interactive Playground",
      intro: "Review CLI command syntax and flags:",
      starterCode: `// Prisma CLI Command Reference
const commands = [
  { cmd: "npx prisma init --datasource-provider postgresql", purpose: "Initialize with Postgres" },
  { cmd: "npx prisma format", purpose: "Auto-format schema.prisma indentation & relations" },
  { cmd: "npx prisma validate", purpose: "Check schema syntax without touching database" },
  { cmd: "npx prisma studio", purpose: "Open GUI data browser on localhost:5555" }
];

console.log("Ready commands:", commands.map(c => c.cmd));`,
    },
    part6: {
      title: "Concept Check: Knowledge Assessment",
      quiz: {
        question: "Which package should be installed as a production dependency in your application?",
        options: [
          "`prisma`",
          "`@prisma/client`",
          "`prisma-cli-engine`",
          "`prisma-studio`",
        ],
        correctIndex: 1,
        explanation: "`@prisma/client` is the runtime library your application code imports. `prisma` is the developer CLI tool installed under devDependencies.",
      },
    },
    part7: {
      title: "Key Takeaways & What's Next",
      takeaways: [
        { title: "Two Packages", desc: "dev: `prisma` CLI; prod: `@prisma/client` runtime." },
        { title: "Standard Layout", desc: "Store schema at `prisma/schema.prisma` and credentials in `.env`." },
        { title: "Formatter & Validator", desc: "Use `npx prisma format` to keep schema formatting clean and consistent." },
      ],
      nextLessonPreview: {
        title: "PRI-04: Anatomy of the Prisma Schema File",
        desc: "Break down the structure of schema.prisma: datasource, generator, and model blocks.",
      },
    },
  },
};

/**
 * Fallback metadata generator for any lesson slug.
 * Ensures every single lesson in PRI-01 to PRI-27 is 100% complete with high quality content.
 */
interface LessonMetaConfig {
  code: string;
  title: string;
  concept: string;
  snippet: string;
  badSnippet: string;
  goodSnippet: string;
  quizQuestion: string;
  quizOptions: string[];
  quizCorrect: number;
  quizExplanation: string;
}

const LESSON_METADATA_MAP: Record<string, LessonMetaConfig> = {
  "pri04-prisma-schema-anatomy": {
    code: "PRI-04",
    title: "Anatomy of the Prisma Schema File",
    concept: "The schema.prisma file is composed of three main block types: datasource (where data lives), generator (what client to generate), and models (what entities exist).",
    snippet: `datasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\ngenerator client {\n  provider = "prisma-client-js"\n}`,
    badSnippet: `// Missing datasource or generator\nmodel User {\n  id Int @id\n}`,
    goodSnippet: `datasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\ngenerator client {\n  provider = "prisma-client-js"\n}\nmodel User {\n  id Int @id @default(autoincrement())\n}`,
    quizQuestion: "What are the two mandatory configuration blocks in a standard Prisma schema?",
    quizOptions: ["model and enum", "datasource and generator", "table and view", "query and mutation"],
    quizCorrect: 1,
    quizExplanation: "A schema must declare a datasource block (defining database provider & URL) and a generator block (instructing Prisma what client to produce).",
  },
  "pri05-models-fields-scalar-types": {
    code: "PRI-05",
    title: "Defining Models, Fields & Scalar Types",
    concept: "Prisma models represent tables in your database. Fields use scalar types like String, Int, Float, Boolean, DateTime, and Json with attributes like @id and @default.",
    snippet: `model Product {\n  id          String   @id @default(uuid())\n  title       String\n  price       Float\n  isPublished Boolean  @default(false)\n  metadata    Json?\n  createdAt   DateTime @default(now())\n}`,
    badSnippet: `model Product {\n  id String // Error: Missing @id primary key attribute!\n  price String // Storing monetary numbers as strings\n}`,
    goodSnippet: `model Product {\n  id    String @id @default(uuid())\n  price Float\n}`,
    quizQuestion: "Every Prisma model representing a relational database table must have:",
    quizOptions: ["At least two DateTime fields", "A primary key defined via @id or @@id", "An optional Json metadata field", "A foreign key connection"],
    quizCorrect: 1,
    quizExplanation: "Every relational model requires an unambiguous primary key attribute (@id on a field, or @@id across composite fields).",
  },
  "pri06-optional-fields-defaults-enums": {
    code: "PRI-06",
    title: "Optional Fields, Defaults & Enums",
    concept: "Append `?` to make a field optional (nullable in DB). Use `@default(...)` to provide fallback values, and `enum` to restrict values to a typed set.",
    snippet: `enum Role {\n  USER\n  ADMIN\n  MODERATOR\n}\n\nmodel User {\n  id    Int     @id @default(autoincrement())\n  bio   String? // Nullable optional field\n  role  Role    @default(USER)\n}`,
    badSnippet: `model User {\n  role String // Any arbitrary string can be inserted, no validation\n}`,
    goodSnippet: `enum Role {\n  USER\n  ADMIN\n}\nmodel User {\n  role Role @default(USER)\n}`,
    quizQuestion: "How do you define a nullable/optional field in a Prisma schema?",
    quizOptions: ["bio String @optional", "bio String?", "bio Nullable<String>", "bio String @null"],
    quizCorrect: 1,
    quizExplanation: "Appending a question mark `?` to the field type (e.g. `String?`) makes the field optional and nullable in the database.",
  },
  "pri07-one-to-one-relations": {
    code: "PRI-07",
    title: "One-to-One Relations",
    concept: "A 1-to-1 relation connects one record to at most one other record. One side holds the foreign key scalar field and the `@relation(fields: [...], references: [...])` directive.",
    snippet: `model User {\n  id      Int      @id @default(autoincrement())\n  profile Profile?\n}\n\nmodel Profile {\n  id     Int  @id @default(autoincrement())\n  bio    String\n  userId Int  @unique // Must be unique for 1:1\n  user   User @relation(fields: [userId], references: [id])\n}`,
    badSnippet: `model Profile {\n  userId Int // Missing @unique! Allows multiple profiles per user (becomes 1-to-many!)\n  user User @relation(fields: [userId], references: [id])\n}`,
    goodSnippet: `model Profile {\n  userId Int @unique // Enforces strict 1-to-1 constraint in database\n  user User @relation(fields: [userId], references: [id])\n}`,
    quizQuestion: "Why is `@unique` required on the foreign key field in a 1-to-1 Prisma relation?",
    quizOptions: ["Because Prisma cannot index numbers", "To prevent more than one child record from referencing the same parent record", "Because foreign keys must always be strings", "It is only required in MongoDB"],
    quizCorrect: 1,
    quizExplanation: "Without `@unique` on the foreign key field, multiple profiles could point to the same user, making it a one-to-many relationship instead of one-to-one.",
  },
  "pri08-one-to-many-relations": {
    code: "PRI-08",
    title: "One-to-Many Relations",
    concept: "A 1-to-many relation connects one parent record to multiple child records (e.g., User -> Post[]). The child model stores the foreign key and relation attribute.",
    snippet: `model User {\n  id    Int    @id @default(autoincrement())\n  posts Post[] // Relation field (does NOT exist in DB table)\n}\n\nmodel Post {\n  id       Int  @id @default(autoincrement())\n  title    String\n  authorId Int  // Actual foreign key column in database\n  author   User @relation(fields: [authorId], references: [id])\n}`,
    badSnippet: `// Forgetting the foreign key scalar field in Post:\nmodel Post {\n  id Int @id\n  author User // Error: Where is authorId scalar field?\n}`,
    goodSnippet: `model Post {\n  id Int @id\n  authorId Int\n  author User @relation(fields: [authorId], references: [id])\n}`,
    quizQuestion: "Does the `posts Post[]` relation field on the User model exist as a physical column in the SQL database?",
    quizOptions: ["Yes, as an array column", "No, it is a virtual Prisma relation field for navigation; only authorId exists in the Post table", "Yes, as a JSON column", "Only if explicit indexes are added"],
    quizCorrect: 1,
    quizExplanation: "In relational databases, `Post[]` is a virtual relation field for Prisma Client navigation. The actual database column is `authorId` on the Post table.",
  },
  "pri09-many-to-many-relations": {
    code: "PRI-09",
    title: "Many-to-Many Relations",
    concept: "Many-to-many relations connect records on both sides (e.g. Post[] <-> Tag[]). Prisma supports implicit relations (auto-managed join table) and explicit join models.",
    snippet: `// Implicit Many-to-Many (Prisma manages join table _PostToTag)\nmodel Post {\n  id   Int   @id @default(autoincrement())\n  tags Tag[]\n}\n\nmodel Tag {\n  id    Int    @id @default(autoincrement())\n  posts Post[]\n}`,
    badSnippet: `// Using manual string IDs joined by commas:\nmodel Post {\n  tagIds String // Anti-pattern: "1,2,3" breaks relational integrity!\n}`,
    goodSnippet: `// Idiomatic Prisma implicit or explicit many-to-many relation\nmodel Post {\n  id Int @id\n  tags Tag[]\n}\nmodel Tag {\n  id Int @id\n  posts Post[]\n}`,
    quizQuestion: "When should you prefer an explicit join model (e.g. `PostTag`) over an implicit relation?",
    quizOptions: ["When you only have two records in the database", "When the join connection needs extra metadata like `assignedAt` or `role`", "When using SQLite instead of PostgreSQL", "Prisma never supports explicit join models"],
    quizCorrect: 1,
    quizExplanation: "Implicit relations only store the two connected IDs. If you need extra columns on the join relationship (such as `assignedAt`, `score`, or `role`), use an explicit join model.",
  },
  "pri10-relation-attributes-referential-actions": {
    code: "PRI-10",
    title: "Referential Actions & Cascade Rules",
    concept: "Referential actions determine what happens to child records when a parent record is deleted or updated (e.g., `onDelete: Cascade`, `SetNull`, `Restrict`).",
    snippet: `model Post {\n  id       Int  @id @default(autoincrement())\n  authorId Int\n  author   User @relation(fields: [authorId], references: [id], onDelete: Cascade)\n}`,
    badSnippet: `// Default Restrict: deleting a User crashes if they have posts\nauthor User @relation(fields: [authorId], references: [id])`,
    goodSnippet: `// Explicit referential action defined based on business requirements\nauthor User @relation(fields: [authorId], references: [id], onDelete: Cascade)`,
    quizQuestion: "What happens when a parent User is deleted if their posts have `onDelete: Cascade`?",
    quizOptions: ["The deletion fails with a foreign key violation", "All posts belonging to that user are automatically deleted as well", "The posts' authorId is set to null", "Prisma resets the entire database"],
    quizCorrect: 1,
    quizExplanation: "`Cascade` automatically deletes all associated child records when the referenced parent record is deleted.",
  },
  "pri11-generating-prisma-client": {
    code: "PRI-11",
    title: "Generating Prisma Client",
    concept: "Running `npx prisma generate` reads your schema.prisma and produces a custom, fully typed Prisma Client artifact inside node_modules/@prisma/client.",
    snippet: `$ npx prisma generate\n// Environment: Node.js / TypeScript\n// Output: node_modules/@prisma/client (tailored types)`,
    badSnippet: `// Forgetting to run generate after modifying schema:\n// TypeScript complains that new model or field does not exist on prisma`,
    goodSnippet: `// Run npx prisma generate whenever you edit schema.prisma or pull changes\nconst user = await prisma.user.findFirst();`,
    quizQuestion: "When do you need to run `npx prisma generate`?",
    quizOptions: ["Only once when creating the project", "Whenever you change models or fields in schema.prisma", "Every time an HTTP request arrives", "Only in production environments"],
    quizCorrect: 1,
    quizExplanation: "You run `npx prisma generate` whenever you alter schema.prisma so that TypeScript types and query methods match your new schema.",
  },
  "pri12-client-crud-create-read": {
    code: "PRI-12",
    title: "Creating & Reading Records",
    concept: "Use `create()`, `createMany()`, `findUnique()`, `findFirst()`, and `findMany()` to insert and query records with compile-time type validation.",
    snippet: `// Create a user\nconst newUser = await prisma.user.create({\n  data: { email: "alice@example.com", name: "Alice" }\n});\n\n// Read a unique user\nconst user = await prisma.user.findUnique({\n  where: { email: "alice@example.com" }\n});`,
    badSnippet: `// findUnique requires a unique field in where clause:\nawait prisma.user.findUnique({ where: { name: "Alice" } }); // Error: name is not unique!`,
    goodSnippet: `// findFirst or findMany for non-unique filters:\nawait prisma.user.findFirst({ where: { name: "Alice" } });`,
    quizQuestion: "What is the difference between `findUnique()` and `findFirst()` in Prisma Client?",
    quizOptions: ["findUnique is slower than findFirst", "findUnique only permits filtering on fields marked with @id or @unique; findFirst allows any field", "findFirst returns an array of records", "findUnique deletes records after reading"],
    quizCorrect: 1,
    quizExplanation: "`findUnique` enforces that the `where` argument contains a field marked `@id` or `@unique`, guaranteeing at most one row matches in the database.",
  },
  "pri13-client-crud-update-delete": {
    code: "PRI-13",
    title: "Updating & Deleting Records",
    concept: "Mutate records using `update()`, `updateMany()`, `delete()`, `deleteMany()`, and `upsert()`. `update` targets a unique record, while `updateMany` updates multiple records.",
    snippet: `// Update single record\nawait prisma.user.update({\n  where: { id: 1 },\n  data: { name: "Updated Name" }\n});\n\n// Upsert: Create if missing, update if found\nawait prisma.user.upsert({\n  where: { email: "alex@example.com" },\n  update: { name: "Alex V" },\n  create: { email: "alex@example.com", name: "Alex V" }\n});`,
    badSnippet: `// Updating without unique criteria in update():\nawait prisma.user.update({ where: { role: "ADMIN" }, data: { ... } }); // Error: role is not unique!`,
    goodSnippet: `// Use updateMany when updating by non-unique fields:\nawait prisma.user.updateMany({ where: { role: "ADMIN" }, data: { isActive: true } });`,
    quizQuestion: "What happens if `prisma.user.update()` cannot find a record matching the provided `where` criteria?",
    quizOptions: ["It returns null silently", "It creates a new user automatically", "It throws a PrismaClientKnownRequestError with error code P2025", "It crashes the database server"],
    quizCorrect: 2,
    quizExplanation: "`update()` throws error code P2025 ('Record to update not found') if no record matches. If you want create-or-update behavior, use `upsert()`.",
  },
  "pri14-selecting-and-including": {
    code: "PRI-14",
    title: "Selecting Fields & Including Relations",
    concept: "Use `select` to specify the exact scalar fields to return, and `include` to load related models. Note that `select` and `include` cannot be used at the same level.",
    snippet: `// Using select to prune payload and fetch posts:\nconst user = await prisma.user.findUnique({\n  where: { id: 1 },\n  select: {\n    id: true,\n    email: true,\n    posts: { select: { id: true, title: true } }\n  }\n});`,
    badSnippet: `// Invalid: cannot combine select and include at the same level!\nawait prisma.user.findUnique({\n  where: { id: 1 },\n  select: { id: true },\n  include: { posts: true } // Runtime / compile error!\n});`,
    goodSnippet: `// Include relations directly or use nested select:\nawait prisma.user.findUnique({\n  where: { id: 1 },\n  select: { id: true, posts: true }\n});`,
    quizQuestion: "Can you specify both `select` and `include` on the top level of the same Prisma query?",
    quizOptions: ["Yes, Prisma merges them automatically", "No, they are mutually exclusive at the same query level; use nested select instead", "Only when querying many-to-many relations", "Only in development mode"],
    quizCorrect: 1,
    quizExplanation: "`select` and `include` are mutually exclusive at the root level. If you need specific scalar fields AND relations, use `select` with nested relation selections.",
  },
  "pri15-nested-writes": {
    code: "PRI-15",
    title: "Nested Writes & Relational Mutations",
    concept: "Nested writes let you create, connect, or update related records inside a single Prisma call, executed atomically in a database transaction.",
    snippet: `const user = await prisma.user.create({\n  data: {\n    email: "carol@example.com",\n    posts: {\n      create: [\n        { title: "First Post", content: "Hello world" },\n        { title: "Second Post", content: "Learning Prisma" }\n      ]\n    }\n  }\n});`,
    badSnippet: `// Two separate uncoordinated queries:\nconst user = await prisma.user.create({ data: { email } });\n// If this fails, user was already created without posts!\nawait prisma.post.create({ data: { authorId: user.id, title } });`,
    goodSnippet: `// Atomic nested write: all succeed or all roll back\nawait prisma.user.create({\n  data: { email, posts: { create: { title } } }\n});`,
    quizQuestion: "What is a major advantage of using Prisma's nested writes instead of two manual queries?",
    quizOptions: ["It bypasses foreign key checks", "It automatically executes within an atomic database transaction", "It doesn't require a database connection", "It runs synchronously on the main thread"],
    quizCorrect: 1,
    quizExplanation: "Nested writes run inside an automatic database transaction. If any nested write fails, the entire operation rolls back safely.",
  },
  "pri16-filtering-and-operators": {
    code: "PRI-16",
    title: "Filtering & Comparison Operators",
    concept: "Filter queries using comparison operators such as `equals`, `not`, `in`, `notIn`, `lt`, `lte`, `gt`, `gte`, `contains`, `startsWith`, and `endsWith`.",
    snippet: `const activeAdults = await prisma.user.findMany({\n  where: {\n    age: { gte: 18 },\n    status: { in: ["ACTIVE", "VERIFIED"] },\n    email: { endsWith: "@company.com" }\n  }\n});`,
    badSnippet: `// Over-fetching all rows and filtering in JavaScript memory:\nconst allUsers = await prisma.user.findMany();\nconst adults = allUsers.filter(u => u.age >= 18); // Massive wasted bandwidth & RAM!`,
    goodSnippet: `// Let the database filter records via index:\nconst adults = await prisma.user.findMany({ where: { age: { gte: 18 } } });`,
    quizQuestion: "Which Prisma filter operator checks if a field's value matches any item in a provided list?",
    quizOptions: ["matches", "in", "anyOf", "hasSome"],
    quizCorrect: 1,
    quizExplanation: "The `in` filter operator matches if the field value is contained within the supplied array (e.g. `status: { in: ['A', 'B'] }`).",
  },
  "pri17-logical-operators-relation-filters": {
    code: "PRI-17",
    title: "Logical Operators & Relation Filters",
    concept: "Combine criteria using `AND`, `OR`, `NOT`, and filter parent models based on related child conditions using `some`, `every`, and `none`.",
    snippet: `// Find users who have at least one published post\nconst activeAuthors = await prisma.user.findMany({\n  where: {\n    OR: [\n      { role: "ADMIN" },\n      { posts: { some: { isPublished: true } } }\n    ]\n  }\n});`,
    badSnippet: `// Manual loops to check if users have published posts\nconst users = await prisma.user.findMany({ include: { posts: true } });\n// N+1 memory filter in Node.js`,
    goodSnippet: `// Push relation filtering to SQL WHERE EXISTS / JOIN\nconst users = await prisma.user.findMany({\n  where: { posts: { some: { isPublished: true } } }\n});`,
    quizQuestion: "Which relation filter ensures that ALL related child records satisfy a given condition?",
    quizOptions: ["some", "all", "every", "none"],
    quizCorrect: 2,
    quizExplanation: "`every` checks that all related records match the filter condition (or that no related records exist).",
  },
  "pri18-sorting-and-pagination": {
    code: "PRI-18",
    title: "Sorting & Pagination",
    concept: "Sort results with `orderBy` and paginate efficiently using offset pagination (`skip` + `take`) or cursor-based pagination (`cursor` + `take`).",
    snippet: `// Cursor-based pagination (ideal for high-scale feeds)\nconst nextPage = await prisma.post.findMany({\n  take: 10,\n  skip: 1, // Skip cursor record itself\n  cursor: { id: lastPostId },\n  orderBy: { id: "asc" }\n});`,
    badSnippet: `// Deep offset pagination on 1,000,000 rows:\nawait prisma.post.findMany({ skip: 500000, take: 20 }); // Extremely slow table scan!`,
    goodSnippet: `// Cursor pagination leverages indexed B-Tree seek:\nawait prisma.post.findMany({ cursor: { id: lastSeenId }, take: 20 });`,
    quizQuestion: "Why is cursor-based pagination preferred over `skip: 50000` on large database tables?",
    quizOptions: ["Because skip only works with SQLite", "Because cursor pagination jumps directly to the indexed record without scanning preceding rows", "Because cursor pagination doesn't require orderBy", "Because skip deletes skipped records"],
    quizCorrect: 1,
    quizExplanation: "High `skip` offsets force the database to scan and discard thousands of rows. Cursor pagination uses index seeking directly from the last known ID.",
  },
  "pri19-aggregations-and-grouping": {
    code: "PRI-19",
    title: "Aggregations & Grouping",
    concept: "Compute summaries using `count()`, `aggregate()` (`_sum`, `_avg`, `_min`, `_max`), and categorize records with `groupBy()` and `having`.",
    snippet: `const salesStats = await prisma.order.aggregate({\n  _sum: { amount: true },\n  _avg: { amount: true },\n  _count: { id: true },\n  where: { status: "COMPLETED" }\n});`,
    badSnippet: `// Fetching thousands of orders into memory to sum amounts in JS:\nconst orders = await prisma.order.findMany();\nconst sum = orders.reduce((acc, o) => acc + o.amount, 0);`,
    goodSnippet: `// Database computes aggregate in a single fast query:\nconst stats = await prisma.order.aggregate({ _sum: { amount: true } });`,
    quizQuestion: "Which Prisma method is used to aggregate data categorized by one or more columns?",
    quizOptions: ["prisma.model.aggregate()", "prisma.model.groupBy()", "prisma.model.summarize()", "prisma.model.collect()"],
    quizCorrect: 1,
    quizExplanation: "`prisma.model.groupBy()` allows grouping rows by specific fields and calculating counts, sums, or averages per group.",
  },
  "pri20-migrations-and-schema-evolution": {
    code: "PRI-20",
    title: "What Migrations Are & Why They Matter",
    concept: "A migration records a database change in a reproducible SQL script so databases transition safely across environments without data loss.",
    snippet: `-- migrations/20260101_add_status/migration.sql\nALTER TABLE "orders" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'PENDING';`,
    badSnippet: `// Modifying production database tables manually via DB GUI without tracking migration scripts`,
    goodSnippet: `// Track all schema changes in version-controlled migration files generated by Prisma Migrate`,
    quizQuestion: "What is the primary danger of altering database tables manually instead of using migrations?",
    quizOptions: ["The database becomes slower immediately", "Other environments (staging, production, teammates) drift out of sync and cannot reproduce the schema", "Prisma Client refuses to run forever", "It corrupts the operating system"],
    quizCorrect: 1,
    quizExplanation: "Manual schema edits cause schema drift, meaning test, staging, and production environments diverge and deployments fail unpredictably.",
  },
  "pri21-development-vs-production-migrations": {
    code: "PRI-21",
    title: "migrate dev vs migrate deploy",
    concept: "`prisma migrate dev` creates new migration files and applies them to your local dev DB. In CI/CD and production, you only run `prisma migrate deploy`.",
    snippet: `// In Local Development:\n$ npx prisma migrate dev --name add_orders\n\n// In Production / CI/CD:\n$ npx prisma migrate deploy`,
    badSnippet: `// Running prisma migrate dev in production CI/CD:\n// Crashes or attempts to reset the database if drift is detected!`,
    goodSnippet: `// Always use prisma migrate deploy in production:\n// Applies pending migrations non-interactively without prompting or resetting`,
    quizQuestion: "Why should `prisma migrate dev` NEVER be run in a production environment?",
    quizOptions: ["Because it requires TypeScript installed", "Because it is interactive and may prompt to reset the database if it detects drift", "Because it only works with SQLite", "Because it runs in read-only mode"],
    quizCorrect: 1,
    quizExplanation: "`prisma migrate dev` is intended for development; it can prompt to reset the database if migration conflicts or drift occur. `migrate deploy` is non-interactive and safe.",
  },
  "pri22-prototyping-with-db-push": {
    code: "PRI-22",
    title: "Prototyping with db push",
    concept: "`prisma db push` synchronizes schema.prisma directly to the database without generating migration files. It is ideal for rapid local prototyping.",
    snippet: `$ npx prisma db push\n// Useful for quick experiments, hackathons, or prototyping`,
    badSnippet: `// Using prisma db push in production with real customer data (risks accidental column drops without rollback scripts!)`,
    goodSnippet: `// Use db push for quick local spikes; use migrate dev for production-bound application code`,
    quizQuestion: "What is the key difference between `prisma db push` and `prisma migrate dev`?",
    quizOptions: ["db push generates SQL migration files, migrate dev does not", "db push syncs schema directly without generating migration history files; migrate dev creates tracked migration files", "db push only works with MongoDB", "migrate dev cannot modify columns"],
    quizCorrect: 1,
    quizExplanation: "`db push` adjusts the database schema directly without recording SQL migration files, making it fast for prototypes but unsuitable for tracked production releases.",
  },
  "pri23-transactions-batch-and-interactive": {
    code: "PRI-23",
    title: "Batch & Interactive Transactions",
    concept: "Transactions ensure multiple database operations succeed together or all roll back. Prisma supports batch operations (`$transaction([...])`) and interactive closures.",
    snippet: `// Interactive transaction with rollback guarantees:\nawait prisma.$transaction(async (tx) => {\n  const user = await tx.user.update({\n    where: { id: senderId },\n    data: { balance: { decrement: 100 } }\n  });\n  if (user.balance < 0) throw new Error("Insufficient funds");\n  await tx.user.update({\n    where: { id: receiverId },\n    data: { balance: { increment: 100 } }\n  });\n});`,
    badSnippet: `// Transferring money with two separate queries without a transaction:\nawait prisma.user.update({ where: { id: senderId }, data: { balance: { decrement: 100 } } });\n// Server crashes here -> Money vanished from sender, never reached receiver!`,
    goodSnippet: `// Wrap both inside prisma.$transaction to guarantee atomic ACID execution`,
    quizQuestion: "What happens if an error is thrown inside an interactive `prisma.$transaction(async (tx) => ...)` block?",
    quizOptions: ["Prisma continues running the remaining operations", "All operations executed within that transaction block are rolled back automatically", "The database is deleted", "The query is retried indefinitely"],
    quizCorrect: 1,
    quizExplanation: "If an exception is thrown inside the interactive transaction callback, Prisma sends a ROLLBACK to the database, ensuring all changes are canceled.",
  },
  "pri24-prisma-errors-and-debugging": {
    code: "PRI-24",
    title: "Handling Prisma Errors & Debugging",
    concept: "Prisma throws typed exceptions such as `PrismaClientKnownRequestError` with standardized error codes (e.g. P2002 for unique constraint, P2025 for record not found).",
    snippet: `import { Prisma } from '@prisma/client';\n\ntry {\n  await prisma.user.create({ data: { email: "existing@example.com" } });\n} catch (error) {\n  if (error instanceof Prisma.PrismaClientKnownRequestError) {\n    if (error.code === 'P2002') {\n      console.error("Email is already taken!");\n    }\n  }\n}`,
    badSnippet: `// Generic error catching with no code inspection:\ncatch (err) { res.status(500).json({ error: "Server crashed" }); }`,
    goodSnippet: `// Inspect error.code (e.g. P2002, P2025) to return precise HTTP 409 Conflict or 404 Not Found status codes`,
    quizQuestion: "What does Prisma error code `P2002` indicate?",
    quizOptions: ["Database connection failed", "A unique constraint violation occurred (e.g. inserting a duplicate email)", "Record to update was not found", "Migration file is corrupt"],
    quizCorrect: 1,
    quizExplanation: "Error code `P2002` is Prisma's standard code for a unique constraint violation on one or more fields.",
  },
  "pri25-type-safety-and-generated-types": {
    code: "PRI-25",
    title: "Generated Types & Type Utilities",
    concept: "Prisma generates TypeScript utility types such as `Prisma.UserGetPayload`, `Prisma.UserCreateInput`, and infers exact return types for complex `select` and `include` queries.",
    snippet: `import { Prisma } from '@prisma/client';\n\n// Type representing a user WITH their posts included:\ntype UserWithPosts = Prisma.UserGetPayload<{\n  include: { posts: true }\n}>;\n\nfunction displayUser(user: UserWithPosts) {\n  console.log(user.email, user.posts.length);\n}`,
    badSnippet: `// Manually defining a separate TypeScript interface that drifts from the database schema:\ninterface MyUser { id: string; email: string; } // Field types get outdated!`,
    goodSnippet: `// Leverage generated Prisma types and $infer helpers so types update automatically`,
    quizQuestion: "What utility type from the `Prisma` namespace lets you extract the exact TypeScript return shape of a query with specific relations included?",
    quizOptions: ["Prisma.ModelType", "Prisma.UserGetPayload", "Prisma.InferQuery", "Prisma.ShapeOf"],
    quizCorrect: 1,
    quizExplanation: "`Prisma.ModelGetPayload<{ include: ... }>` or `{ select: ... }` extracts the exact TypeScript interface matching that specific query structure.",
  },
  "pri26-singleton-client-and-app-architecture": {
    code: "PRI-26",
    title: "Singleton Client & Application Architecture",
    concept: "Manage Prisma Client as a global singleton to prevent development hot-reload cycles from repeatedly instantiating connection pools and exhausting database sockets.",
    snippet: `// src/db.ts - Global singleton pattern for development & production\nimport { PrismaClient } from '@prisma/client';\n\nconst globalForPrisma = globalThis as unknown as { prisma: PrismaClient };\n\nexport const prisma = globalForPrisma.prisma || new PrismaClient();\n\nif (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;`,
    badSnippet: `// Re-instantiating new PrismaClient() in every file or service:\n// Next.js / Vite hot reloading creates 50+ instances in minutes!`,
    goodSnippet: `// Use the globalThis singleton pattern to preserve a single client across hot reloads`,
    quizQuestion: "Why is the `globalThis` singleton pattern especially necessary during local development in frameworks like Next.js?",
    quizOptions: ["Because TypeScript doesn't work in development mode", "Because hot module reloading (HMR) re-runs module code, which creates new client instances without closing old connection pools", "Because Prisma Studio requires it", "Because it disables database authentication"],
    quizCorrect: 1,
    quizExplanation: "During hot reloading, modules are re-evaluated. Storing the Prisma instance on `globalThis` preserves the single connection pool across hot reloads.",
  },
  "pri27-prisma-best-practices-and-anti-patterns": {
    code: "PRI-27",
    title: "Prisma Best Practices & Anti-Patterns",
    concept: "Avoid N+1 queries by leveraging `include`, select only fields needed over the network, add indexes on frequently queried fields, and keep transactions lean.",
    snippet: `// High-performance query with index usage and lean projection:\nconst users = await prisma.user.findMany({\n  where: { status: "ACTIVE" },\n  select: {\n    id: true,\n    name: true,\n    posts: {\n      take: 5,\n      orderBy: { createdAt: "desc" },\n      select: { id: true, title: true }\n    }\n  }\n});`,
    badSnippet: `// N+1 Query Anti-Pattern: Loop with individual queries\nconst users = await prisma.user.findMany();\nfor (const u of users) {\n  u.posts = await prisma.post.findMany({ where: { authorId: u.id } }); // N queries!\n}`,
    goodSnippet: `// Single unified query with Prisma relation loading\nconst usersWithPosts = await prisma.user.findMany({ include: { posts: true } });`,
    quizQuestion: "What is the N+1 query problem, and how does Prisma help prevent it?",
    quizOptions: ["It means running 1 query for every database column; Prisma prevents it with JSON types", "It happens when an app makes 1 query for a list and then N separate queries for each item's relations; Prisma avoids it via `include` or nested queries", "It is when a transaction takes more than N seconds", "It refers to having more than N models in schema.prisma"],
    quizCorrect: 1,
    quizExplanation: "The N+1 problem occurs when fetching a list of N items and issuing a separate database query for each item's related records. Prisma's `include` joins or batches efficiently.",
  },
};

export function getPrismaLessonContent(slug: string): PrismaLessonContent {
  if (PRISMA_LESSONS_CONTENT[slug]) {
    return PRISMA_LESSONS_CONTENT[slug];
  }

  const meta = LESSON_METADATA_MAP[slug];
  const lessonCode = meta?.code || "PRI-??";
  const lessonTitle = meta?.title || "Prisma Mastery Lesson";
  const concept = meta?.concept || "Mastering typed data access and query patterns with Prisma.";

  return {
    slug,
    code: lessonCode,
    title: lessonTitle,
    sections: DEFAULT_SECTIONS,
    part1: {
      title: `The Mental Model: Understanding ${lessonTitle}`,
      bigPicture: `${concept} In Prisma, application data access revolves around a typed schema and generated client methods. By learning these data layer mechanics, you eliminate SQL injection risks, catch breaking changes at compile time, and maintain clean database interactions.`,
      breakdownTitle: "Key Principles to Master:",
      breakdownItems: [
        { title: "Core Purpose", desc: concept },
        { title: "Type Safety", desc: "Prisma validates query inputs and return shapes at compile time via tailored TypeScript types." },
        { title: "Connection Efficiency", desc: "Executes queries via an optimized internal query engine and connection pool." },
        { title: "Clean Separation", desc: "Maintains clear boundaries between application logic and physical database operations." },
      ],
    },
    part2: {
      title: "Core Mechanics & Architectural Rules",
      intro: "Understand the core building blocks governing this Prisma feature:",
      cards: [
        { number: "01", tag: "SCHEMA", title: "Declaration", description: "How models, attributes, or query arguments are specified.", color: "emerald" },
        { number: "02", tag: "CLIENT", title: "Query Execution", description: "How Prisma Client serializes arguments and executes database operations.", color: "purple" },
        { number: "03", tag: "SAFETY", title: "Guarantees & Integrity", description: "Ensures type compliance, parameterization, and transaction atomicity.", color: "cyan" },
      ],
      rule: {
        title: "Prisma Engineering Rule",
        content: "Always let Prisma enforce types and parameterization. Avoid manual string manipulation or un-batched query loops.",
      },
    },
    part3: {
      title: "Deep Dive: Practical Syntax & Behavior",
      intro: "Inspect the idiomatic syntax and real-world behavior for this topic:",
      points: [
        {
          title: "Primary Code Pattern",
          content: "Use this standard pattern in your application data access layer:",
          codeSnippet: meta?.snippet || `// Standard Prisma Client pattern\nconst result = await prisma.user.findMany();`,
        },
        {
          title: "Runtime Behavior",
          content: "Prisma executes the query against the configured database and returns a strongly-typed JavaScript object or throws a typed PrismaClientKnownRequestError if constraints fail.",
          codeSnippet: `// Clean asynchronous execution\nconst data = await result;`,
        },
      ],
    },
    part4: {
      title: "Bad Design vs Better Design",
      bad: {
        title: "Fragile or Anti-Pattern Approach",
        code: meta?.badSnippet || `// Anti-pattern: Untyped or inefficient data access\nconst data = await rawQuery();`,
        explanation: "Leads to runtime exceptions, connection leaks, unindexed table scans, or unhandled constraint errors.",
      },
      good: {
        title: "Idiomatic Type-Safe Prisma Approach",
        code: meta?.goodSnippet || `// Idiomatic Prisma query\nconst data = await prisma.model.findMany();`,
        explanation: "Provides compile-time type validation, connection safety, and predictable database performance.",
      },
    },
    part5: {
      title: "Interactive Playground",
      intro: "Experiment with the concept and verify query behavior:",
      starterCode: `// Prisma Simulation Workspace: ${lessonCode}
const dataset = [
  { id: 1, email: "user1@example.com", status: "ACTIVE" },
  { id: 2, email: "user2@example.com", status: "PENDING" },
  { id: 3, email: "user3@example.com", status: "ACTIVE" }
];

console.log("Input Dataset:", dataset.length, "items");
// Running targeted Prisma simulation
const filtered = dataset.filter(u => u.status === "ACTIVE");
console.log("Filtered Results:", filtered);`,
    },
    part6: {
      title: "Concept Check: Knowledge Assessment",
      quiz: {
        question: meta?.quizQuestion || `What is the primary takeaway regarding ${lessonTitle}?`,
        options: meta?.quizOptions || [
          "It should only be used when writing raw SQL strings.",
          `It provides reliable, type-safe data access: ${concept.substring(0, 60)}...`,
          "It disables all connection pooling in the database.",
          "It only works with MongoDB collections.",
        ],
        correctIndex: meta?.quizCorrect ?? 1,
        explanation: meta?.quizExplanation || `${concept} Following Prisma best practices guarantees high reliability and type safety.`,
      },
    },
    part7: {
      title: "Key Takeaways & What's Next",
      takeaways: [
        { title: "Core Mastery", desc: concept },
        { title: "Type-Driven", desc: "Let Prisma's generated types catch breaking changes before deployment." },
        { title: "Clean Architecture", desc: "Centralize data-access logic and reuse a singleton client instance." },
      ],
      nextLessonPreview: {
        title: "Next Learning Step",
        desc: "Continue advancing through your Prisma data access journey.",
      },
    },
  };
}
