import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri14PrismaStudioAndSeedDataContent: StandardLessonContent = {
  slug: "pri14-prisma-studio-and-seed-data",
  code: "PRI-14",
  title: "Prisma Studio and Seed Data",
  subtitle: "Visually browse database records with Prisma Studio and populate development environments with seed scripts.",
  difficulty: "Easy",
  scenario: {
    question: "Your course page looks empty because your development database has no courses. What should you do?",
    answer: "Use a seed script to insert sample course records. You can use Prisma Studio to inspect the inserted rows visually.",
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
    title: "Prisma Studio and Seed Data",
    bigPicture: "Developing an application is much easier when you have realistic sample data to work with, and a quick visual way to inspect what is stored.\n\n- `npx prisma studio` opens a visual database browser in your web browser where you can view, filter, insert, and edit records.\n- A seed script (`prisma/seed.ts`) populates initial records (like admin accounts, product categories, or sample courses) using Prisma Client.\n\nRunning `npx prisma db seed` runs your seed script to set up a fresh environment.",
    codeSnippet: "// 1. Launch visual browser:\n// npx prisma studio\n\n// 2. prisma/seed.ts\nimport { PrismaClient } from \"@prisma/client\";\n\nconst prisma = new PrismaClient();\n\nasync function main() {\n  await prisma.user.create({\n    data: {\n      email: \"seed@example.com\",\n      name: \"Sample User\",\n    },\n  });\n}\n\nmain()\n  .catch(console.error)\n  .finally(async () => {\n    await prisma.$disconnect();\n  });",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. npx prisma studio",
                "desc": "Launches a local web GUI to browse, filter, and inspect table records without writing SQL."
          },
          {
                "title": "2. prisma/seed.ts script",
                "desc": "Uses standard Prisma Client queries to insert sample records for testing."
          },
          {
                "title": "3. package.json prisma.seed",
                "desc": "Configures the command to run when executing npx prisma db seed."
          },
          {
                "title": "4. prisma.$disconnect()",
                "desc": "Closes database connection pools gracefully when the seed script terminates."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Reliable seed data and visual inspection allow every developer to spin up a working local environment in seconds.",
    rule: {
      title: "Idempotent Seeding Rule",
      content: "Write seed scripts idempotently using upsert() rather than create(). This ensures running the seed script multiple times does not produce duplicate records or unique constraint crashes.",
    },
    cards: [
          {
                "number": "01",
                "tag": "VISUAL GUI",
                "title": "Prisma Studio",
                "description": "Zero-configuration web GUI for inspecting records, searching relationships, and verifying migrations.",
                "color": "purple"
          },
          {
                "number": "02",
                "tag": "AUTOMATION",
                "title": "prisma db seed",
                "description": "Populates development databases with realistic users, categories, and test records automatically.",
                "color": "emerald"
          },
          {
                "number": "03",
                "tag": "IDEMPOTENT",
                "title": "upsert() in Seeds",
                "description": "Using upsert ensures seed scripts can be run repeatedly without crashing on duplicate unique keys.",
                "color": "cyan"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Configuring seed scripts in package.json and handling teardown:",
    points: [
          {
                "title": "Configuring package.json for Seeding",
                "content": "Define the prisma.seed property in package.json to tell Prisma how to execute your seed script via tsx or ts-node.",
                "codeSnippet": "// In package.json:\n\"prisma\": {\n  \"seed\": \"tsx prisma/seed.ts\"\n}\n\n// Then execute via CLI:\n// npx prisma db seed"
          },
          {
                "title": "Browsing Relationships in Prisma Studio",
                "content": "In Prisma Studio, clicking on a relation field (like posts) navigates directly to the related records, making relational debugging intuitive."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Using `create()` in seed scripts, causing subsequent runs to crash with unique constraint violations.",
    badApproach: {
      title: "Non-Idempotent Seeding with create()",
      code: "// Flawed: Crashes on second run because email already exists!\nawait prisma.user.create({\n  data: { email: \"admin@example.com\", name: \"Admin\" }\n});",
      flaw: "Running npx prisma db seed a second time throws P2002 Unique Constraint Violation and aborts.",
    },
    betterApproach: {
      title: "Idempotent Seeding with upsert()",
      code: "// Clean: Safe to run repeatedly\nawait prisma.user.upsert({\n  where: { email: \"admin@example.com\" },\n  update: { name: \"Admin\" },\n  create: { email: \"admin@example.com\", name: \"Admin\" },\n});",
      benefit: "Updates the record if it already exists or creates it if missing, ensuring repeatable test runs.",
    },
    whyItMatters: "Seed scripts must be reliable and idempotent across CI/CD and developer onboarding.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Explore an idempotent seed script structure:",
    starterCode: "// Example idempotent seed pattern\nimport { PrismaClient } from \"@prisma/client\";\n\nconst prisma = new PrismaClient();\n\nasync function seed() {\n  const admin = await prisma.user.upsert({\n    where: { email: \"admin@example.com\" },\n    update: {},\n    create: {\n      email: \"admin@example.com\",\n      name: \"Platform Administrator\"\n    }\n  });\n\n  console.log(\"Seeded admin user:\", admin.email);\n}\n\nseed();",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why is it best practice to use upsert() instead of create() in a prisma/seed.ts script?",
      options: [
              "Because create() does not support PostgreSQL databases",
              "So the script can be executed multiple times without failing on duplicate unique key errors",
              "Because upsert() bypasses password hashing",
              "Because upsert() automatically deletes all old records"
      ],
      correctIndex: 1,
      explanation: "Using upsert() makes the seed script idempotent, meaning it updates existing records if already present or creates them if missing, avoiding unique constraint crashes.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "Prisma Studio for Inspection",
                "desc": "Run 'npx prisma studio' to view and modify database records in your browser."
          },
          {
                "title": "Seed Scripts Provide Sample Data",
                "desc": "Populate development databases with sample records for testing."
          },
          {
                "title": "Use upsert() in Seeds",
                "desc": "Ensure seed scripts are idempotent and safe to run multiple times."
          }
    ],
  },
};
