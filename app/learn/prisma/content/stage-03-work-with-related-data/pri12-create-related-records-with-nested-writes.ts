import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri12CreateRelatedRecordsWithNestedWritesContent: StandardLessonContent = {
  slug: "pri12-create-related-records-with-nested-writes",
  code: "PRI-12",
  title: "Create Related Records with Nested Writes",
  subtitle: "Create, link, and manage parent and child records in a single atomic database operation.",
  difficulty: "Difficult",
  scenario: {
    question: "When a customer signs up, your application also needs to create their first profile record. Why is a nested write helpful?",
    answer: "Use a nested write. Create the customer and the related profile in one Prisma operation so both records are saved together.",
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
    title: "Create Related Records with Nested Writes",
    bigPicture: "A nested write lets you create a record and its related records in a single operation. Instead of creating a user first, waiting for the generated ID, and then creating posts with that ID, Prisma does both together.\n\nPrisma handles creating the parent, capturing its generated foreign key, and inserting the related children inside a single database transaction.\n\nPrisma nested writes also support connecting existing records using `connect` or `connectOrCreate`.",
    codeSnippet: "const user = await prisma.user.create({\n  data: {\n    email: \"writer@example.com\",\n    name: \"Tariq\",\n    posts: {\n      create: [\n        { title: \"My first post\" },\n        { title: \"Learning Prisma\" },\n      ],\n    },\n  },\n});",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. Parent create",
                "desc": "Creates the new User record and generates its primary key."
          },
          {
                "title": "2. posts: { create: [...] }",
                "desc": "Creates the related Post records and automatically assigns their authorId foreign key to the new user's ID."
          },
          {
                "title": "3. Atomic transaction",
                "desc": "Prisma wraps the parent and child inserts in an atomic database transaction. If creating a post fails, the user is rolled back."
          },
          {
                "title": "4. Single roundtrip",
                "desc": "Eliminates manual foreign key plumbing in application code."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Nested writes eliminate manual ID plumbing and guarantee that related records are created together atomically.",
    rule: {
      title: "Atomic Nested Write Rule",
      content: "Prisma executes nested writes inside a database transaction automatically. If any child creation fails, all changes roll back, preventing orphan records.",
    },
    cards: [
          {
                "number": "01",
                "tag": "ATOMIC",
                "title": "Automatic Transaction",
                "description": "Both parent and child inserts succeed together or fail together with zero partial writes.",
                "color": "purple"
          },
          {
                "number": "02",
                "tag": "CONNECT",
                "title": "connect & connectOrCreate",
                "description": "Link to existing records by unique ID or create them if they do not exist yet.",
                "color": "cyan"
          },
          {
                "number": "03",
                "tag": "CONVENIENCE",
                "title": "Zero Manual Plumbing",
                "description": "No need to capture user.id and pass authorId: user.id manually across sequential queries.",
                "color": "emerald"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Connecting existing entities and creating new ones simultaneously:",
    points: [
          {
                "title": "Connecting Existing Records with connect",
                "content": "When creating a post, you can link it to an existing author using connect instead of passing the raw authorId.",
                "codeSnippet": "// Create a post and connect it to an existing user by email:\nconst post = await prisma.post.create({\n  data: {\n    title: \"Prisma Relations in Depth\",\n    author: {\n      connect: { email: \"writer@example.com\" },\n    },\n  },\n});"
          },
          {
                "title": "connectOrCreate for Idempotent Setup",
                "content": "Useful for tags and categories: connects to an existing tag with that name or creates the tag if it is missing."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Creating parent and child records in separate manual steps without transaction protection.",
    badApproach: {
      title: "Sequential Manual Inserts Without a Transaction",
      code: "// Flawed: If creating the post fails, the user remains created without a post!\nconst user = await prisma.user.create({\n  data: { email: \"user@example.com\", name: \"User\" }\n});\n\n// Crash here leaves incomplete state in database:\nawait prisma.post.create({\n  data: { title: \"First Post\", authorId: user.id }\n});",
      flaw: "If the second query fails due to network drop or validation, the database is left with incomplete orphaned data.",
    },
    betterApproach: {
      title: "Using a Single Nested Write",
      code: "// Clean: Both records are created atomically together\nconst user = await prisma.user.create({\n  data: {\n    email: \"user@example.com\",\n    name: \"User\",\n    posts: {\n      create: [{ title: \"First Post\" }]\n    }\n  }\n});",
      benefit: "Prisma executes both inserts in a transaction; failure rolls back everything cleanly.",
    },
    whyItMatters: "Data integrity depends on related entities either existing completely or not at all.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Test creating records with nested writes:",
    starterCode: "// Example nested write\nimport { PrismaClient } from \"@prisma/client\";\n\nconst prisma = new PrismaClient();\n\nasync function run() {\n  const user = await prisma.user.create({\n    data: {\n      email: \"tariq@example.com\",\n      name: \"Tariq\",\n      posts: {\n        create: [\n          { title: \"Getting Started with Prisma\" }\n        ]\n      }\n    },\n    include: { posts: true }\n  });\n\n  console.log(\"Created user with posts:\", user);\n}\n\nrun();",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the primary benefit of creating related records using Prisma's nested write feature?",
      options: [
              "It converts relational tables into JSON documents",
              "It creates both parent and related records atomically in a transaction without manual foreign key passing",
              "It automatically publishes records to social media",
              "It deletes any older records with the same name"
      ],
      correctIndex: 1,
      explanation: "Nested writes create parent and related child records in a single coordinated database transaction, automatically assigning foreign keys and rolling back if any step fails.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "Atomic Creation",
                "desc": "Parent and child records are created together in a single transaction."
          },
          {
                "title": "Automatic ID Wiring",
                "desc": "Prisma sets the child's foreign key automatically to the parent's generated ID."
          },
          {
                "title": "connect & connectOrCreate",
                "desc": "Use connect to link existing records and connectOrCreate for safe setup."
          }
    ],
  },
};
