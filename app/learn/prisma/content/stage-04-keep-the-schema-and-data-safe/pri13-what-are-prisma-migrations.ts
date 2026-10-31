import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri13WhatArePrismaMigrationsContent: StandardLessonContent = {
  slug: "pri13-what-are-prisma-migrations",
  code: "PRI-13",
  title: "What Are Prisma Migrations?",
  subtitle: "Evolve database schemas deterministically across environments using Prisma Migrate.",
  difficulty: "Difficult",
  scenario: {
    question: "You add a `phone` field to your Prisma model. Your local database still does not have a `phone` column. What should you do next?",
    answer: "Create and apply a migration with `prisma migrate dev`, then check that the change was applied to the database.",
  },
  interviewQuestion: {
    question: "Why use Prisma Migrate instead of changing the database manually?",
    answer: "Migrations keep a record of database changes. This helps developers apply the same changes reliably in development, testing, and production.",
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
    title: "What Are Prisma Migrations?",
    bigPicture: "A migration is a recorded change to the structure of your database. When you add a new model, delete a field, or add an index in `schema.prisma`, your database tables do not change automatically.\n\nPrisma Migrate creates a timestamped SQL migration file that describes the exact changes and applies them to your database.\n\nBecause the changes are stored as plain SQL files in your repository, every developer and production server applies the exact same changes in the exact same order.",
    codeSnippet: "// 1. Edit schema.prisma (e.g. add phone field)\n// model User {\n//   ...\n//   phone String?\n// }\n\n// 2. In development: creates migration SQL and applies to local DB\n// npx prisma migrate dev --name add_phone_to_user\n\n// 3. In production deployment: applies pending migrations\n// npx prisma migrate deploy",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. Update schema.prisma",
                "desc": "Change your models or attributes to reflect the new desired database state."
          },
          {
                "title": "2. prisma migrate dev",
                "desc": "Compares your schema to existing migrations, generates a new migration.sql file, and runs it on your development database."
          },
          {
                "title": "3. Commit migration files",
                "desc": "The generated SQL files inside prisma/migrations/ are committed to version control."
          },
          {
                "title": "4. prisma migrate deploy",
                "desc": "In CI/CD or production, runs only pending migrations without generating new ones."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Managing schema changes with migrations ensures reproducibility, auditability, and zero drift across development, staging, and production.",
    rule: {
      title: "Versioned Migration Rule",
      content: "Never manually alter production database tables using visual tools. All structural changes must originate as version-controlled migration files applied with 'prisma migrate deploy'.",
    },
    cards: [
          {
                "number": "01",
                "tag": "DEV MIGRATIONS",
                "title": "prisma migrate dev",
                "description": "Generates timestamped SQL files and applies changes to local development databases, automatically regenerating Prisma Client.",
                "color": "purple"
          },
          {
                "number": "02",
                "tag": "PROD DEPLOY",
                "title": "prisma migrate deploy",
                "description": "Safe deployment command for production CI/CD pipelines that executes unapplied migrations in chronological order.",
                "color": "emerald"
          },
          {
                "number": "03",
                "tag": "PROTOTYPING",
                "title": "prisma db push",
                "description": "Directly pushes schema changes to a temporary database without creating migration files; ideal for rapid early prototyping.",
                "color": "cyan"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Understanding migration lifecycle and team collaboration:",
    points: [
          {
                "title": "prisma migrate dev vs prisma db push",
                "content": "Use 'prisma migrate dev' for projects with production databases and team members to ensure all changes are tracked in SQL files. Use 'prisma db push' when prototyping or working with databases where historical migrations are not needed.",
                "codeSnippet": "// Inspecting migration status:\n// npx prisma migrate status\n\n// Applying in deployment:\n// npx prisma migrate deploy"
          },
          {
                "title": "Handling Breaking Schema Changes",
                "content": "Adding a required field (NOT NULL) without a default value to a table with existing rows will fail. Always provide a @default() or make the field optional (String?) during migration."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Running `prisma migrate dev` on a production database or altering production SQL manually.",
    badApproach: {
      title: "Running migrate dev in Production",
      code: "// Flawed: Running interactive development command in production!\n// In production server terminal:\nnpx prisma migrate dev",
      flaw: "migrate dev is interactive, prompts for resets on drift, and requires shadow database creation which fails on managed production servers.",
    },
    betterApproach: {
      title: "Using prisma migrate deploy in CI/CD",
      code: "// Clean: Automated production deployment step\nnpx prisma migrate deploy",
      benefit: "Executes pending migrations non-interactively and fails immediately if drift is detected.",
    },
    whyItMatters: "Using the proper migration command protects production data from accidental resets and interactive prompts.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Inspect a generated Prisma migration SQL statement:",
    starterCode: "-- Example generated migration SQL (prisma/migrations/20261031_add_phone/migration.sql):\nALTER TABLE \"User\" ADD COLUMN \"phone\" TEXT;\n\n-- Verify applied columns:\nSELECT column_name, data_type, is_nullable\nFROM information_schema.columns\nWHERE table_name = 'User';",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which command should be executed in automated production CI/CD pipelines to apply pending database migrations?",
      options: [
              "npx prisma migrate dev",
              "npx prisma migrate deploy",
              "npx prisma studio --prod",
              "npx prisma db push --force"
      ],
      correctIndex: 1,
      explanation: "prisma migrate deploy is designed specifically for production; it non-interactively applies pending migrations without creating shadow databases or generating new files.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "Migrations Track Schema Changes",
                "desc": "Timestamped SQL files record every schema change in version control."
          },
          {
                "title": "migrate dev for Local Development",
                "desc": "Generates new migration files and applies them to local development databases."
          },
          {
                "title": "migrate deploy for Production",
                "desc": "Applies pending migrations safely in CI/CD environments."
          }
    ],
  },
};
