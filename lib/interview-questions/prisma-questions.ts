import { InterviewQuestion } from "@/types/interview";

export const PRISMA_QUESTIONS: InterviewQuestion[] = [
  {
    id: "prisma-q01",
    trackKey: "prisma",
    category: "ORM & Query Performance",
    subtopic: "N+1 Problem",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "How does Prisma handle the N+1 query problem, and how do you optimize relation queries in Prisma Client?",
    answer: `### Simple answer:
The **N+1 query problem** happens when an ORM issues 1 query to fetch parent records, followed by N separate queries to fetch related items for each individual parent. Prisma solves this automatically with an internal Rust query engine that batches queries using SQL \`IN\` clauses.

### How Prisma Solves N+1:
When you query posts and include their authors:
\`\`\`typescript
const posts = await prisma.post.findMany({
  include: { author: true }
});
\`\`\`
Prisma does **NOT** run N+1 queries. It generates exactly **two efficient SQL queries**:
1. \`SELECT * FROM "Post";\`
2. \`SELECT * FROM "User" WHERE "id" IN (1, 2, 3, ...);\`
The Prisma Rust query engine joins the data in memory before returning strictly typed TypeScript objects.

### Optimization Best Practices:
1. **Use \`select\` instead of \`include\`:** Select only needed columns to avoid overfetching large text columns or password hashes:
\`\`\`typescript
select: { id: true, title: true, author: { select: { name: true } } }
\`\`\`
2. **Batching with \`$transaction\`:** Group multiple queries into a single roundtrip.
3. **Connection Pooling:** Use PgBouncer or Prisma Accelerate for serverless deployments.

### Interview answer:
Prisma avoids the N+1 query problem by batching related queries into SQL \`IN\` operators and merging them in its Rust query engine. We optimize queries by using explicit \`select\` to prevent overfetching unused columns and utilizing connection pooling for serverless environments.`,
    followUps: [
      "What is the difference between Prisma include and Prisma select?",
      "How do interactive transactions work in Prisma compared to sequential batching?",
      "Why is connection pooling essential when deploying Prisma to serverless environments (Vercel/AWS Lambda)?"
    ],
    keyPoints: [
      "Prisma batches relations into SQL IN clauses preventing N+1 queries",
      "Prisma Rust query engine merges relation datasets in memory",
      "Use explicit select to prevent fetching large unused fields",
      "Serverless environments require connection poolers like PgBouncer"
    ],
    tags: ["prisma", "orm", "n-plus-1", "database", "query-optimization"],
    relatedLessonSlug: "/learn/prisma/prs04-relations-and-nested-queries",
    relatedLessonName: "PRS-04: Relations & Batch Query Execution"
  },
  {
    id: "prisma-q02",
    trackKey: "prisma",
    category: "Fundamentals",
    subtopic: "Prisma Architecture",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is Prisma, and how does it differ from traditional ORMs like TypeORM or Sequelize?",
    answer: `### Simple answer:
Prisma is a next-generation Node.js and TypeScript ORM (Object-Relational Mapper) that provides an auto-generated, strictly type-safe database client based on a single declarative schema file.

### Key Differences from Traditional ORMs:
| Aspect | Traditional ORMs (TypeORM, Sequelize) | Prisma |
|---|---|---|
| **Schema Definition** | TypeScript class decorators or JavaScript models | Declarative \`schema.prisma\` file as single source of truth |
| **Type Safety** | Types must be manually defined or synced with classes | **Auto-generated types** derived directly from the schema |
| **Query Engine** | JavaScript query generators | High-performance compiled **Rust query engine** |
| **Migrations** | Manual migration files often out of sync | Automated, declarative migrations (\`prisma migrate dev\`) |
| **API Style** | Class instances with Active Record or Data Mapper | Pure plain JavaScript objects with autocomplete |

### The Three Core Tools in Prisma:
1. **Prisma Schema:** Declarative modeling of database tables and relations.
2. **Prisma Migrate:** Automated migration generation and database synchronization.
3. **Prisma Client:** Auto-generated, type-safe query builder for TypeScript.

### Interview answer:
Unlike traditional ORMs that rely on class decorators and manual typing, Prisma uses a declarative schema file as the single source of truth. Its CLI auto-generates completely type-safe TypeScript clients and automated SQL migrations, powered by a high-performance compiled Rust query engine.`,
    followUps: [
      "What is the Prisma Rust Query Engine and how does it interface with Node.js?",
      "Can Prisma be used with existing databases (introspection via prisma db pull)?",
      "What databases does Prisma support?"
    ],
    keyPoints: [
      "Single declarative schema.prisma as source of truth",
      "Auto-generates exact TypeScript types from database schema",
      "High performance Rust-powered query engine",
      "Eliminates class decorator boilerplate"
    ],
    tags: ["prisma", "orm", "typescript", "architecture", "typeorm"],
    relatedLessonSlug: "/learn/prisma/prs01-what-is-prisma",
    relatedLessonName: "PRS-01: What is Prisma & Type-Safe Database Access"
  },
  {
    id: "prisma-q03",
    trackKey: "prisma",
    category: "Schema Modeling",
    subtopic: "Schema Syntax",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "Explain the structure of a `schema.prisma` file: Datasource, Generators, Models, and Attributes.",
    answer: `### Simple answer:
The \`schema.prisma\` file defines your database connection, client generators, and data models in an intuitive declarative syntax:

### Structure breakdown:
1. **Datasource:** Configures the database engine and connection URL:
\`\`\`prisma
datasource db {
  provider = "postgresql" // or "mysql", "sqlite", "mongodb"
  url      = env("DATABASE_URL")
}
\`\`\`

2. **Generator:** Specifies what client library to generate:
\`\`\`prisma
generator client {
  provider = "prisma-client-js"
}
\`\`\`

3. **Models & Attributes:** Represents database tables:
\`\`\`prisma
model User {
  id        String   @id @default(cuid()) // @id = primary key
  email     String   @unique              // @unique = unique index
  name      String?                       // ? = optional (nullable)
  role      Role     @default(USER)       // default value
  posts     Post[]                        // relation field
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt           // automatically updates timestamp!

  @@map("users") // maps model to "users" table in SQL
  @@index([email, role]) // composite index
}
\`\`\`

### Attributes:
- Field attributes start with **\`@\`** (e.g. \`@id\`, \`@default\`, \`@unique\`).
- Block attributes start with **\`@@\`** (e.g. \`@@map\`, \`@@index\`, \`@@unique\`).

### Interview answer:
A \`schema.prisma\` file consists of a \`datasource\` specifying the database connection, a \`generator\` generating the TypeScript client, and \`model\` blocks representing tables. Fields use single \`@\` attributes like \`@id\` or \`@default\`, while table-level configurations use \`@@\` block attributes like \`@@index\` or \`@@map\`.`,
    followUps: [
      "What is the difference between @default(cuid()) and @default(uuid())?",
      "How does @updatedAt automatically update timestamps on SQL databases?",
      "How do Enums work in Prisma schema?"
    ],
    keyPoints: [
      "datasource configures provider and DATABASE_URL",
      "generator client creates @prisma/client",
      "models define tables, fields, and relations",
      "@ prefix for field attributes, @@ prefix for table-level block attributes"
    ],
    tags: ["prisma-schema", "models", "attributes", "cuid", "data-modeling"],
    relatedLessonSlug: "/learn/prisma/prs02-prisma-schema-modeling",
    relatedLessonName: "PRS-02: Prisma Schema Modeling & Field Attributes"
  },
  {
    id: "prisma-q04",
    trackKey: "prisma",
    category: "Migrations & CLI",
    subtopic: "Migrate vs Push",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "What is the difference between `prisma migrate dev` and `prisma db push`? When should you use each?",
    answer: `### Simple answer:
- **\`prisma migrate dev\`**: Generates sequential SQL migration files in a \`prisma/migrations/\` folder and applies them. Use this for **production-ready applications**.
- **\`prisma db push\`**: Directly syncs your database schema with \`schema.prisma\` **without creating migration files**. Use this for **rapid local prototyping** or MongoDB.

### Comparison Table:
| Feature | \`prisma migrate dev\` | \`prisma db push\` |
|---|---|---|
| **Creates SQL files?** | **Yes** (version-controlled migration history) | ❌ No |
| **Tracks migration history?** | Yes (via \`_prisma_migrations\` table) | ❌ No |
| **Production safe?** | **Yes** (deployed via \`prisma migrate deploy\`) | ❌ No (can drop data unexpectedly) |
| **MongoDB support?** | ❌ No (MongoDB has no SQL migrations) | **Yes** (required for MongoDB) |
| **Best For** | Team development, staging, production | Quick prototyping, hackathons, MongoDB |

### Interview answer:
Use \`prisma migrate dev\` for relational databases in team projects and production because it creates version-controlled SQL migration scripts that can be inspected and safely deployed. Use \`prisma db push\` for rapid prototyping, ephemeral preview branches, or MongoDB where migration history files are not needed.`,
    followUps: [
      "What does prisma migrate deploy do in production CI/CD pipelines?",
      "How do you resolve migration drift when the database schema diverges?",
      "Why is prisma db push required for MongoDB instead of prisma migrate dev?"
    ],
    keyPoints: [
      "migrate dev creates sequential version-controlled SQL migration files",
      "migrate deploy applies pending migrations in production CI/CD without prompts",
      "db push directly modifies database without migration tracking",
      "db push is ideal for prototyping and required for MongoDB"
    ],
    tags: ["migrations", "prisma-migrate", "db-push", "cli", "devops"],
    relatedLessonSlug: "/learn/prisma/prs03-migrations-and-workflows",
    relatedLessonName: "PRS-03: Database Migrations & Production Deployment"
  },
  {
    id: "prisma-q05",
    trackKey: "prisma",
    category: "Prisma Client",
    subtopic: "CRUD Methods",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "Explain the core CRUD methods in Prisma Client: `findUnique`, `findFirst`, `findMany`, `create`, `update`, and `upsert`.",
    answer: `### Simple answer:
Prisma Client generates intuitive, strictly typed methods on each model:

### 1. Reading:
- **\`findUnique\`**: Finds a single row by a **Unique or Primary Key field** only.
- **\`findFirst\`**: Finds the first row matching arbitrary criteria (can filter by any column).
- **\`findMany\`**: Finds multiple rows with filtering, sorting, pagination (\`skip\`, \`take\`).

\`\`\`typescript
// findUnique: fast lookup by unique index
const user = await prisma.user.findUnique({
  where: { email: "alex@example.com" }
});

// findMany with pagination and sorting
const recentPosts = await prisma.post.findMany({
  where: { published: true },
  orderBy: { createdAt: "desc" },
  take: 10,
  skip: 0,
});
\`\`\`

### 2. Writing:
- **\`create\`**: Inserts a new row.
- **\`update\`**: Updates a row by a Unique identifier.
- **\`upsert\`**: Checks if a record exists; if yes, updates it; if not, creates it!

\`\`\`typescript
// Upsert pattern (great for idempotent syncing):
const profile = await prisma.profile.upsert({
  where: { userId: "usr_1" },
  update: { bio: "Updated bio" },
  create: { userId: "usr_1", bio: "New bio" },
});
\`\`\`

### Interview answer:
Prisma Client provides \`findUnique\` for fast index lookups by primary or unique keys, \`findFirst\` and \`findMany\` for broader filtering, \`create\` and \`update\` for data mutation, and \`upsert\` to atomically create or update records idempotently based on whether the unique identifier exists.`,
    followUps: [
      "What is the difference between findUnique and findUniqueOrThrow?",
      "How does cursor-based pagination differ from offset pagination (skip/take) in Prisma?",
      "How do updateMany and deleteMany differ from update and delete?"
    ],
    keyPoints: [
      "findUnique requires a unique field in the where clause",
      "findMany supports skip, take, cursor, and orderBy",
      "upsert guarantees atomic create-or-update behavior",
      "All return types are fully inferred with TypeScript autocomplete"
    ],
    tags: ["prisma-client", "crud", "findUnique", "upsert", "typescript"],
    relatedLessonSlug: "/learn/prisma/prs04-relations-and-nested-queries",
    relatedLessonName: "PRS-04: Relations & Batch Query Execution"
  },
  {
    id: "prisma-q06",
    trackKey: "prisma",
    category: "Relations & Data Modeling",
    subtopic: "Relations",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How do you model 1-to-1, 1-to-Many, and Many-to-Many relations in Prisma?",
    answer: `### Simple answer:
Prisma models relations using the **\`@relation\`** attribute linking foreign keys between models:

### 1. One-to-Many (e.g. User has many Posts):
\`\`\`prisma
model User {
  id    String @id @default(cuid())
  posts Post[]
}

model Post {
  id       String @id @default(cuid())
  userId   String
  author   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}
\`\`\`

### 2. One-to-One (e.g. User has one Profile):
Same as One-to-Many, but with a **\`@unique\`** constraint on the foreign key:
\`\`\`prisma
model Profile {
  id     String @id @default(cuid())
  userId String @unique // @unique enforces 1-to-1!
  user   User   @relation(fields: [userId], references: [id])
}
\`\`\`

### 3. Implicit Many-to-Many (e.g. Posts have many Tags):
Prisma automatically creates and manages a hidden join table for you:
\`\`\`prisma
model Post {
  id   String @id @default(cuid())
  tags Tag[]  // Implicit relation
}

model Tag {
  id    String @id @default(cuid())
  posts Post[] // Implicit relation
}
\`\`\`
Prisma generates a SQL junction table named \`_PostToTag\` behind the scenes!

### Interview answer:
Prisma defines relations using the \`@relation(fields: [...], references: [...])\` attribute. A 1-to-Many defines an array relation on the parent and a foreign key on the child. Adding \`@unique\` to the foreign key makes it 1-to-1. Many-to-Many can be implicit (Prisma generates the join table automatically) or explicit via an intermediate model.`,
    followUps: [
      "When should you use an explicit Many-to-Many join table instead of an implicit one?",
      "What is nested writes in Prisma (e.g. creating a User and their Posts in one call)?",
      "How does referentialActions like onDelete: SetNull work in Prisma?"
    ],
    keyPoints: [
      "1-to-Many: foreign key column references primary key with @relation",
      "1-to-1: foreign key column is marked with @unique",
      "Implicit Many-to-Many: Prisma creates and manages the junction table automatically",
      "Explicit Many-to-Many: needed when the junction table requires metadata (e.g. assignedAt)"
    ],
    tags: ["relations", "one-to-many", "many-to-many", "foreign-keys", "prisma"],
    relatedLessonSlug: "/learn/prisma/prs02-prisma-schema-modeling",
    relatedLessonName: "PRS-02: Prisma Schema Modeling & Field Attributes"
  },
  {
    id: "prisma-q07",
    trackKey: "prisma",
    category: "Prisma Client",
    subtopic: "Select vs Include",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "What is the difference between `select` and `include` in Prisma Client queries?",
    answer: `### Simple answer:
- **\`include\`**: Returns **all scalar fields** of the model, plus adds specified related records.
- **\`select\`**: Returns **only the specific fields** you explicitly list (cherry-picking columns).

### Why they cannot be used together at the same level:
You cannot pass both \`select\` and \`include\` at the same root object level because \`select\` defines an explicit whitelist of fields, while \`include\` implies returning all base fields plus relations.

### Example:
\`\`\`typescript
// 1. include: returns id, title, content, publishedAt, PLUS author
const postWithInclude = await prisma.post.findUnique({
  where: { id: "p1" },
  include: { author: true }
});

// 2. select: returns ONLY id and title, plus author's name (NO content/password)
const postWithSelect = await prisma.post.findUnique({
  where: { id: "p1" },
  select: {
    id: true,
    title: true,
    author: {
      select: { name: true } // Nested select!
    }
  }
});
\`\`\`

### Performance & Security Tip:
Always use \`select\` when returning user objects in public APIs to prevent accidentally returning sensitive fields like \`passwordHash\` or internal tokens!

### Interview answer:
\`include\` retrieves all fields of the model plus related entities. \`select\` retrieves only the explicitly specified fields, which improves database query performance by preventing overfetching and enhances security by ensuring sensitive columns are omitted.`,
    followUps: [
      "Can you nest a select inside an include?",
      "How does Prisma's TypeScript inference change when using select vs include?",
      "What is Prisma.validator and how does it help define reusable query return types?"
    ],
    keyPoints: [
      "include returns all model columns plus related records",
      "select returns only chosen columns to minimize payload",
      "Cannot combine select and include at the same root level",
      "select is essential for hiding sensitive columns like passwords"
    ],
    tags: ["select", "include", "overfetching", "prisma-client", "security"],
    relatedLessonSlug: "/learn/prisma/prs04-relations-and-nested-queries",
    relatedLessonName: "PRS-04: Relations & Batch Query Execution"
  },
  {
    id: "prisma-q08",
    trackKey: "prisma",
    category: "Transactions & Concurrency",
    subtopic: "Interactive Transactions",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How do Interactive Transactions work in Prisma Client using `prisma.$transaction()`?",
    answer: `### Simple answer:
Prisma offers two types of transactions with \`prisma.$transaction()\`:
1. **Sequential Array Batching:** An array of independent queries executed in a single database transaction.
2. **Interactive Transactions:** A callback function that receives a transactional client (\`tx\`), allowing queries that depend on the results of previous queries to execute atomically.

### Example: Interactive Bank Transfer
\`\`\`typescript
await prisma.$transaction(async (tx) => {
  // 1. Check sender balance
  const sender = await tx.account.findUnique({ where: { id: fromAccountId } });
  if (sender.balance < amount) {
    throw new Error("Insufficient funds"); // Throws error -> automatically rolls back!
  }

  // 2. Deduct from sender
  await tx.account.update({
    where: { id: fromAccountId },
    data: { balance: { decrement: amount } }
  });

  // 3. Credit receiver
  await tx.account.update({
    where: { id: toAccountId },
    data: { balance: { increment: amount } }
  });
}, {
  maxWait: 5000, // max wait to acquire connection (5s)
  timeout: 10000 // max execution time before automatic rollback (10s)
});
\`\`\`

### Critical Rule:
Always use the transactional client **\`tx\`** inside the callback, **not** the global \`prisma\` instance! Calling \`prisma\` bypasses the active transaction.

### Interview answer:
Interactive transactions pass a transactional client \`tx\` into an async callback function inside \`prisma.$transaction(async (tx) => ...)\`. If any error occurs or is thrown inside the callback, Prisma automatically rolls back all operations, ensuring full ACID atomicity.`,
    followUps: [
      "What happens if you accidentally call prisma.model inside a $transaction callback instead of tx.model?",
      "What are the maxWait and timeout configuration options in interactive transactions?",
      "How does isolationLevel configuration work in Prisma transactions?"
    ],
    keyPoints: [
      "Interactive transactions allow dependent operations within a transaction",
      "Any thrown error triggers an automatic ROLLBACK",
      "Must use the tx instance provided in callback arguments",
      "Supports configurable timeout and isolation levels"
    ],
    tags: ["transactions", "interactive-transactions", "acid", "prisma", "concurrency"],
    relatedLessonSlug: "/learn/prisma/prs05-transactions-and-concurrency",
    relatedLessonName: "PRS-05: Transactions, Locks & ACID Guarantees"
  },
  {
    id: "prisma-q09",
    trackKey: "prisma",
    category: "Extensibility & Middleware",
    subtopic: "Client Extensions",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What are Prisma Client Extensions (`$extends`), and how do you use them for Soft Deletes or Computed Fields?",
    answer: `### Simple answer:
Prisma Client Extensions (\`$extends\`) is the modern replacement for legacy Prisma Middleware. It allows you to extend Prisma Client with custom methods, computed fields, query interceptors, and model modifications.

### 1. Computed Field Example (e.g. \`fullName\`):
\`\`\`typescript
const prisma = new PrismaClient().$extends({
  result: {
    user: {
      fullName: {
        needs: { firstName: true, lastName: true },
        compute(user) {
          return \`\${user.firstName} \${user.lastName}\`;
        }
      }
    }
  }
});

// Now user.fullName is automatically calculated on all queries!
const user = await prisma.user.findFirst();
console.log(user.fullName);
\`\`\`

### 2. Soft Delete Example (Query hook):
\`\`\`typescript
const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async delete({ args, query }) {
        // Intercept delete and convert to soft delete update:
        return prisma.user.update({
          ...args,
          data: { isDeleted: true, deletedAt: new Date() }
        });
      }
    }
  }
});
\`\`\`

### Interview answer:
Prisma Client Extensions (\`$extends\`) customize Prisma Client functionality with full type safety. They allow adding computed fields via \`result\`, custom model methods via \`model\`, and intercepting queries via \`query\` to implement cross-cutting concerns like soft deletes, auditing, and encryption.`,
    followUps: [
      "Why did Prisma deprecate $use middleware in favor of $extends?",
      "Can multiple Prisma extensions be chained together?",
      "How do extensions preserve exact TypeScript types in the returned client?"
    ],
    keyPoints: [
      "$extends replaces legacy middleware with full type safety",
      "result extensions add computed properties dynamically",
      "query extensions intercept and mutate database operations (soft deletes)",
      "Extensions return a new typed client instance without mutating the original"
    ],
    tags: ["prisma-extensions", "extends", "soft-delete", "computed-fields", "plugins"],
    relatedLessonSlug: "/learn/prisma/prs06-client-extensions-and-plugins",
    relatedLessonName: "PRS-06: Prisma Client Extensions & Middleware Patterns"
  },
  {
    id: "prisma-q10",
    trackKey: "prisma",
    category: "Cloud & Scaling",
    subtopic: "Accelerate and Pulse",
    type: "architecture",
    difficulty: "hard",
    source: "curated",
    question: "What are Prisma Accelerate and Prisma Pulse, and how do they optimize modern edge and real-time architectures?",
    answer: `### Simple answer:
Prisma Accelerate and Prisma Pulse are cloud-native database services designed by Prisma to solve serverless connection pooling, edge caching, and real-time database events:

### 1. Prisma Accelerate:
- **Connection Pooling:** Solves database connection exhaustion by managing a distributed connection pool across global regions.
- **Edge Caching:** Enables caching database queries directly on a global CDN:
\`\`\`typescript
const users = await prisma.user.findMany({
  cacheStrategy: { ttl: 60, swr: 30 } // Stale-While-Revalidate caching!
});
\`\`\`
Queries return in under **10ms** from the nearest edge location without hitting your origin database.

### 2. Prisma Pulse:
- **Real-Time Change Data Capture (CDC):** Listens to PostgreSQL's Write-Ahead Log (WAL) and streams database mutations (creates, updates, deletes) in real-time to your application:
\`\`\`typescript
const stream = await prisma.order.stream({
  create: {} // Listen for newly created orders in real-time
});

for await (const event of stream) {
  console.log("New order received:", event.created.id);
}
\`\`\`
Eliminates the need for polling or separate message brokers for database event streaming.

### Interview answer:
Prisma Accelerate provides global connection pooling and edge caching with Stale-While-Revalidate for serverless architectures. Prisma Pulse provides real-time change data capture by streaming database mutations directly from the PostgreSQL Write-Ahead Log to your application without needing message queues.`,
    followUps: [
      "How does Prisma Accelerate reduce database connection spikes in Vercel Edge functions?",
      "How does Prisma Pulse read from the PostgreSQL replication stream (WAL)?",
      "What is the difference between Cache TTL and SWR in Prisma Accelerate?"
    ],
    keyPoints: [
      "Accelerate provides global connection pooling and edge caching (cacheStrategy)",
      "Reduces edge query latencies from hundreds of ms to under 10ms",
      "Pulse delivers real-time Change Data Capture (CDC) via database WAL",
      "Eliminates complex polling loops and separate messaging infrastructure"
    ],
    tags: ["prisma-accelerate", "prisma-pulse", "edge-caching", "cdc", "serverless"],
    relatedLessonSlug: "/learn/prisma/prs07-cloud-accelerate-and-pulse",
    relatedLessonName: "PRS-07: Prisma Accelerate & Pulse Real-Time Architecture"
  }
];
