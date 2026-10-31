import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri02PrismaProjectSetupAndMainFilesContent: StandardLessonContent = {
  slug: "pri02-prisma-project-setup-and-main-files",
  code: "PRI-02",
  title: "Prisma Project Setup and Main Files",
  subtitle: "Understand the key files in a Prisma project: schema.prisma, configuration, Prisma Client, and migrations.",
  difficulty: "Moderate",
  scenario: {
    question: "You open a project and cannot find the database URL inside `schema.prisma`. Does this mean the project cannot connect to the database?",
    answer: "No. In Prisma 7, the URL is normally placed in `prisma.config.ts`. In Prisma 5/6, it is in `schema.prisma`. Check the project's configuration file or environment variables.",
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
    title: "Prisma Project Setup and Main Files",
    bigPicture: "A Prisma project has a few important files. Their exact locations can vary by project, but their jobs are similar:\n\n- The Prisma schema (`prisma/schema.prisma`) describes models and their fields.\n- `prisma.config.ts` holds Prisma CLI configuration, including the database URL in Prisma 7 (or directly in `schema.prisma` with `url = env(\"DATABASE_URL\")` in Prisma 5 and 6).\n- Prisma Client is generated from the schema and used by application code.\n- The migrations folder (`prisma/migrations/`) stores the history of database structure changes.",
    codeSnippet: "// prisma/schema.prisma\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\n// prisma.config.ts (Prisma 7 style)\nimport { defineConfig, env } from \"prisma/config\";\n\nexport default defineConfig({\n  schema: \"prisma/schema.prisma\",\n  migrations: {\n    path: \"prisma/migrations\",\n  },\n  datasource: {\n    url: env(\"DATABASE_URL\"),\n  },\n});",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. generator client",
                "desc": "Configures the client generator and where the generated client code is written."
          },
          {
                "title": "2. datasource db",
                "desc": "Sets the database provider (e.g. postgresql, mysql, sqlite)."
          },
          {
                "title": "3. prisma.config.ts",
                "desc": "Defines CLI configuration and provides the database URL in Prisma 7 projects."
          },
          {
                "title": "4. Version compatibility",
                "desc": "In Prisma 5/6 (used in this project), the URL is declared directly inside datasource in schema.prisma: url = env(\"DATABASE_URL\")."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Knowing where configuration lives helps you configure database credentials, generate clients, and track migrations reliably.",
    rule: {
      title: "Single Source of Truth Rule",
      content: "The Prisma schema is the declarative single source of truth for your data models. Configuration files tell the CLI how to connect and where to generate the client.",
    },
    cards: [
          {
                "number": "01",
                "tag": "SCHEMA",
                "title": "schema.prisma",
                "description": "Defines models, fields, relations, enums, and generator settings for your database.",
                "color": "purple"
          },
          {
                "number": "02",
                "tag": "CONFIG",
                "title": "Connection & Config",
                "description": "Stores database URLs via env variables, keeping sensitive credentials out of version control.",
                "color": "cyan"
          },
          {
                "number": "03",
                "tag": "MIGRATIONS",
                "title": "migrations/ Directory",
                "description": "Contains chronological SQL migration files representing the full evolution of your database schema.",
                "color": "emerald"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Understanding project layout differences across Prisma versions:",
    points: [
          {
                "title": "Prisma 5/6 vs Prisma 7 Configuration",
                "content": "In Prisma 5/6 (such as LearnCraft's current setup), datasource contains url = env(\"DATABASE_URL\"). In Prisma 7, CLI configuration and connection URLs are moved to prisma.config.ts for cleaner separation of schema definition and environment config.",
                "codeSnippet": "// Prisma 5 / 6 datasource configuration:\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\ngenerator client {\n  provider = \"prisma-client-js\"\n}"
          },
          {
                "title": "Environment Variable Safety",
                "content": "Always keep database credentials in a .env file and never commit secrets to version control. Reference credentials using env(\"DATABASE_URL\")."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Hardcoding database connection URLs in schema files or committing production credentials.",
    badApproach: {
      title: "Hardcoding Database Credentials",
      code: "// Flawed: Hardcoded credentials exposed in source control\ndatasource db {\n  provider = \"postgresql\"\n  url      = \"postgresql://postgres:secret123@localhost:5432/mydb\"\n}",
      flaw: "Exposes database passwords in git history and prevents environment-specific database switching (dev vs staging vs prod).",
    },
    betterApproach: {
      title: "Using Environment Variables",
      code: "// Clean: Reading connection string safely from environment\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}",
      benefit: "Keeps credentials secure in .env and allows different connection URLs for local development and cloud production.",
    },
    whyItMatters: "Securing database connection strings is critical for preventing unauthorized database access and data breaches.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Inspect a typical schema.prisma configuration block:",
    starterCode: "// Example schema configuration\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\ngenerator client {\n  provider = \"prisma-client-js\"\n}\n\nmodel User {\n  id    Int    @id @default(autoincrement())\n  email String @unique\n  name  String?\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the primary role of the schema.prisma file?",
      options: [
              "It runs the local database server engine in the background",
              "It defines data models, relations, field types, and generator settings",
              "It builds front-end React components for displaying tables",
              "It monitors server network traffic and firewalls"
      ],
      correctIndex: 1,
      explanation: "The schema.prisma file is the central definition file where you declare models, scalar fields, relations, enums, and generator instructions.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "Schema as Foundation",
                "desc": "schema.prisma defines the structure of your data and models."
          },
          {
                "title": "Secure Environment URLs",
                "desc": "Always load database connection strings from environment variables via env(\"DATABASE_URL\")."
          },
          {
                "title": "Migrations History",
                "desc": "The prisma/migrations folder tracks database schema changes over time."
          }
    ],
  },
};
