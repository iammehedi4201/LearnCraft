import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri19ReusePrismaClientAndManageConnectionsContent: StandardLessonContent = {
  slug: "pri19-reuse-prisma-client-and-manage-connections",
  code: "PRI-19",
  title: "Reuse Prisma Client and Manage Connections",
  subtitle: "Prevent connection pool exhaustion in Node.js and Next.js using global singleton patterns.",
  difficulty: "Difficult",
  scenario: {
    question: "Your server creates a new Prisma Client inside every API request. After traffic grows, the database rejects new connections. What should you change?",
    answer: "Reuse a shared Prisma Client instead of creating a new one for every request. Also check connection limits.",
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
    title: "Reuse Prisma Client and Manage Connections",
    bigPicture: "Each instance of `PrismaClient` manages its own pool of database connections (usually 5 to 10 sockets).\n\nIf you instantiate `new PrismaClient()` inside every API request handler or server function, each request opens a fresh pool. Under even modest traffic, you will quickly exceed the maximum connection limit of your database (e.g. 100 connections), causing database connection errors.\n\nIn development environments with hot-reloading (like Next.js), files are re-evaluated frequently. A global singleton pattern preserves one client instance across reloads.",
    codeSnippet: "// lib/prisma.ts — Global singleton pattern\nimport { PrismaClient } from \"@prisma/client\";\n\nconst globalForPrisma = globalThis as unknown as {\n  prisma: PrismaClient | undefined;\n};\n\nexport const prisma = globalForPrisma.prisma ?? new PrismaClient();\n\nif (process.env.NODE_ENV !== \"production\") {\n  globalForPrisma.prisma = prisma;\n}",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. globalThis storage",
                "desc": "Stores the PrismaClient on Node's globalThis object, which survives hot module reloading in development."
          },
          {
                "title": "2. globalForPrisma.prisma ?? new PrismaClient()",
                "desc": "Reuses the existing client instance if already created; only instantiates a new one once."
          },
          {
                "title": "3. Shared connection pool",
                "desc": "All route handlers and services share the same connection pool, preventing socket exhaustion."
          },
          {
                "title": "4. Production behavior",
                "desc": "In production, modules are cached permanently, so the client is naturally instantiated only once per Node process."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Managing database connection counts is critical for server reliability and avoiding connection pool exhaustion.",
    rule: {
      title: "Singleton Client Rule",
      content: "Never call 'new PrismaClient()' inside an HTTP request handler, route handler, or server component. Always export and import a single shared client instance.",
    },
    cards: [
          {
                "number": "01",
                "tag": "EXHAUSTION",
                "title": "Connection Pooling",
                "description": "Database servers have strict limits on concurrent connections. Singletons share pool connections efficiently.",
                "color": "rose"
          },
          {
                "number": "02",
                "tag": "HOT RELOAD",
                "title": "globalThis in Next.js",
                "description": "Attaching the client to globalThis in development prevents creating dozens of orphaned pools during file saves.",
                "color": "purple"
          },
          {
                "number": "03",
                "tag": "SERVERLESS",
                "title": "Serverless & Edge",
                "description": "In serverless environments, use connection poolers (like PgBouncer or Prisma Accelerate) to handle ephemeral lambdas.",
                "color": "cyan"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Diagnosing connection pool issues in production:",
    points: [
          {
                "title": "Connection Limit Parameters in DATABASE_URL",
                "content": "You can configure the maximum pool size per Prisma Client by appending ?connection_limit=10 to your connection string in .env.",
                "codeSnippet": "// .env configuration with pool limit:\nDATABASE_URL=\"postgresql://user:pass@localhost:5432/mydb?connection_limit=10\""
          },
          {
                "title": "Graceful Shutdown with $disconnect",
                "content": "In standalone scripts, background workers, or integration tests, always await prisma.$disconnect() before exiting to close active sockets cleanly."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Calling `new PrismaClient()` inside every API endpoint function.",
    badApproach: {
      title: "Creating PrismaClient Inside Route Handlers",
      code: "// Flawed: Creates a new client and connection pool on EVERY request!\nexport async function GET(req: Request) {\n  const prisma = new PrismaClient(); // Catastrophic under load!\n  const users = await prisma.user.findMany();\n  return Response.json(users);\n}",
      flaw: "100 concurrent HTTP requests open 1,000 database connections, instantly crashing the database with connection refused errors.",
    },
    betterApproach: {
      title: "Importing a Shared Singleton",
      code: "// Clean: Import the shared singleton instance\nimport { prisma } from \"@/lib/prisma\";\n\nexport async function GET(req: Request) {\n  const users = await prisma.user.findMany();\n  return Response.json(users);\n}",
      benefit: "Reuses pooled connections safely across all concurrent requests.",
    },
    whyItMatters: "Singleton connection management is fundamental to preventing production outages.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Inspect the standard singleton client setup:",
    starterCode: "// lib/prisma.ts pattern used in production Next.js apps\nimport { PrismaClient } from \"@prisma/client\";\n\nconst globalForPrisma = globalThis as unknown as {\n  prisma: PrismaClient | undefined;\n};\n\nexport const prisma = globalForPrisma.prisma ?? new PrismaClient();\n\nif (process.env.NODE_ENV !== \"production\") {\n  globalForPrisma.prisma = prisma;\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why should you avoid creating 'new PrismaClient()' inside an API request handler?",
      options: [
              "Because Prisma Client does not work inside functions",
              "Because each instance creates its own pool of database connections, quickly exhausting database connection limits",
              "Because it causes TypeScript compilation to fail",
              "Because Prisma Client can only be called from HTML files"
      ],
      correctIndex: 1,
      explanation: "Every PrismaClient instance initializes a dedicated pool of database connections. Creating a new client on each request quickly exhausts the database's connection limit, causing crashes.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "Export a Single Client",
                "desc": "Create and export one shared PrismaClient instance for your entire application."
          },
          {
                "title": "Prevent Connection Exhaustion",
                "desc": "Reusing a single client shares connections efficiently across requests."
          },
          {
                "title": "globalThis in Next.js Dev",
                "desc": "Attach to globalThis during development to survive hot module reloads."
          }
    ],
  },
};
