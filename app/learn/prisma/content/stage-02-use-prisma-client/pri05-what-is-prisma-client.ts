import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri05WhatIsPrismaClientContent: StandardLessonContent = {
  slug: "pri05-what-is-prisma-client",
  code: "PRI-05",
  title: "What Is Prisma Client?",
  subtitle: "Prisma Client is the generated type-safe query engine your application uses to read and write database records.",
  difficulty: "Moderate",
  scenario: {
    question: "You add a new `phone` field to the `User` model, but TypeScript does not recognize `phone` in Prisma queries. What should you check?",
    answer: "Check that the schema was updated and Prisma Client was generated again. Also check that the application imports the correct generated client.",
  },
  interviewQuestion: {
    question: "What is Prisma Client?",
    answer: "Prisma Client is generated from the Prisma schema. It gives the application typed methods to read, create, update, and delete database records.",
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
    title: "What Is Prisma Client?",
    bigPicture: "Prisma Client is the generated code your application uses to query the database. Prisma creates it from your models, so the available models and fields are reflected in TypeScript types and editor suggestions.\n\nIn Prisma 7, direct connections use a database driver adapter such as `@prisma/adapter-pg`. In Prisma 5 and 6 (as used in this project), PrismaClient is imported directly from `@prisma/client` and connects using `DATABASE_URL`.\n\nPrisma Client is the part of Prisma you use most often in application code. It provides typed methods for reading and changing data.",
    codeSnippet: "// Prisma 7 PostgreSQL client example:\nimport { PrismaClient } from \"../generated/prisma/client\";\nimport { PrismaPg } from \"@prisma/adapter-pg\";\n\nconst adapter = new PrismaPg({\n  connectionString: process.env.DATABASE_URL!,\n});\n\nexport const prisma = new PrismaClient({ adapter });\n\n// Prisma 5 / 6 standard client example (used in this project):\n// import { PrismaClient } from \"@prisma/client\";\n// export const prisma = new PrismaClient();",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. Import PrismaClient",
                "desc": "Imports the client generated specifically for your application models."
          },
          {
                "title": "2. Driver adapter / connection",
                "desc": "Prisma 7 uses driver adapters like PrismaPg; Prisma 5/6 initializes directly with built-in connection handling."
          },
          {
                "title": "3. Pass connection parameters",
                "desc": "The database connection string is passed securely via process.env.DATABASE_URL."
          },
          {
                "title": "4. Export singleton instance",
                "desc": "Exports a single shared client instance so the application reuses connections instead of creating new sockets per request."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Prisma Client bridges your application logic to database queries with full TypeScript autocomplete.",
    rule: {
      title: "Regeneration Rule",
      content: "Whenever schema.prisma changes, you must run 'prisma generate' to recompile Prisma Client types. Without regeneration, TypeScript and runtime queries remain outdated.",
    },
    cards: [
          {
                "number": "01",
                "tag": "GENERATION",
                "title": "npx prisma generate",
                "description": "Reads schema.prisma and emits custom TypeScript definitions tailored specifically to your models.",
                "color": "purple"
          },
          {
                "number": "02",
                "tag": "AUTOCOMPLETE",
                "title": "Full IDE Autocomplete",
                "description": "Field names, relational filters, and selection arguments are suggested and validated directly by your code editor.",
                "color": "cyan"
          },
          {
                "number": "03",
                "tag": "REUSE",
                "title": "Singleton Client",
                "description": "Instantiate one PrismaClient instance per application process to maintain connection pool efficiency.",
                "color": "emerald"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Understanding client generation workflow during active development:",
    points: [
          {
                "title": "Schema Change Workflow",
                "content": "1. Edit schema.prisma (e.g. add a new column). 2. Run 'npx prisma migrate dev' or 'npx prisma generate'. 3. Immediately access the new field on prisma.model in TypeScript.",
                "codeSnippet": "// After adding 'role' to User in schema:\nconst admin = await prisma.user.findFirst({\n  where: { role: \"ADMIN\" }, // Autocompleted and type-checked!\n});"
          },
          {
                "title": "Generated Type Exports",
                "content": "Prisma also exports type definitions such as 'User' and 'Prisma.UserCreateInput' directly from the client package for use in function signatures and API request types."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Forgetting to run `prisma generate` after editing `schema.prisma`.",
    badApproach: {
      title: "Editing Schema Without Generating",
      code: "// Flawed: Schema edited, but prisma generate was not executed\n// In schema: phone String?\nconst user = await prisma.user.create({\n  data: { email: \"test@example.com\", phone: \"+12345\" },\n  // Error: Property 'phone' does not exist on type 'UserCreateInput'!\n});",
      flaw: "TypeScript throws compilation errors because the generated client node_modules files still reflect the old schema.",
    },
    betterApproach: {
      title: "Running Prisma Generate",
      code: "// Run in terminal:\n// npx prisma generate\n\n// Now TypeScript recognises the new field cleanly:\nconst user = await prisma.user.create({\n  data: { email: \"test@example.com\", phone: \"+12345\" },\n});",
      benefit: "Prisma Client is synchronized with the schema and TypeScript types validate without error.",
    },
    whyItMatters: "Client generation synchronizes your code editor, TypeScript compiler, and runtime query methods with your actual schema.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Explore initializing and calling Prisma Client:",
    starterCode: "// Example Prisma Client initialization\nimport { PrismaClient } from \"@prisma/client\";\n\nconst prisma = new PrismaClient();\n\nasync function main() {\n  console.log(\"Prisma Client initialized with models:\", Object.keys(prisma));\n}\n\nmain();",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "When should you run 'npx prisma generate' in your development workflow?",
      options: [
              "Only once when installing Node.js on your computer",
              "Every time you update models, fields, or relations in schema.prisma",
              "Only when deploying code to production servers",
              "Every time you run a SELECT query in the browser"
      ],
      correctIndex: 1,
      explanation: "You must run 'prisma generate' whenever you change schema.prisma so the generated client types and query methods match your new schema definition.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "Generated Query Engine",
                "desc": "Prisma Client is custom-generated TypeScript code built directly from your schema."
          },
          {
                "title": "Instant Autocomplete",
                "desc": "Queries benefit from compile-time type validation and editor suggestions."
          },
          {
                "title": "Regenerate on Schema Changes",
                "desc": "Always run 'prisma generate' after modifying schema.prisma."
          }
    ],
  },
};
