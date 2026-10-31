import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri09SelectOnlyTheFieldsYouNeedContent: StandardLessonContent = {
  slug: "pri09-select-only-the-fields-you-need",
  code: "PRI-09",
  title: "Select Only the Fields You Need",
  subtitle: "Use select to retrieve only necessary columns, improving performance and protecting sensitive data.",
  difficulty: "Moderate",
  scenario: {
    question: "Your user table has an internal password hash, but a page only needs the user's name and email. How does `select` help?",
    answer: "Use `select` to return only `name` and `email`. Do not fetch or send the password hash to the client.",
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
    title: "Select Only the Fields You Need",
    bigPicture: "By default, Prisma Client returns all scalar fields of a model. If a model has 20 columns, a query loads all 20.\n\nUsing `select`, you specify only the fields your application needs for that screen or operation. This reduces memory usage, speeds up database transfers, and prevents sensitive fields (like password hashes or API tokens) from leaking.\n\nIn TypeScript, the returned object type automatically adjusts to contain only the selected fields.",
    codeSnippet: "const users = await prisma.user.findMany({\n  select: {\n    id: true,\n    name: true,\n    email: true,\n  },\n});\n\n// TypeScript type of users[0]:\n// { id: number; name: string; email: string }",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. select object",
                "desc": "Pass an object mapping desired field names to true."
          },
          {
                "title": "2. Excluded fields",
                "desc": "Any field not specified (such as passwordHash or internalNotes) is omitted from the SQL SELECT query."
          },
          {
                "title": "3. TypeScript narrowing",
                "desc": "TypeScript types are narrowed automatically so attempting to access omitted fields results in a compiler error."
          },
          {
                "title": "4. select vs include",
                "desc": "select chooses which fields of the current model to load; include eagerly loads entire relation models."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Selecting only required fields protects user security and optimizes network payload size.",
    rule: {
      title: "Least Privilege Data Rule",
      content: "Never query or transmit fields that the receiving UI or API client does not require. Always use select to exclude password hashes, secret tokens, and heavy binary payloads.",
    },
    cards: [
          {
                "number": "01",
                "tag": "SECURITY",
                "title": "Prevent Data Leaks",
                "description": "Prevents sensitive attributes like passwordHash, resetTokens, or SSNs from being fetched into memory or sent in API responses.",
                "color": "rose"
          },
          {
                "number": "02",
                "tag": "PERFORMANCE",
                "title": "Slim Payload Size",
                "description": "Minimizes serialization time, database network transfer, and memory consumption by skipping heavy text and JSON fields.",
                "color": "emerald"
          },
          {
                "number": "03",
                "tag": "TYPE NARROWING",
                "title": "Compiler Guaranteed",
                "description": "TypeScript ensures your UI code cannot mistakenly read fields that were not fetched in the select clause.",
                "color": "purple"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Building a public user profile API:",
    points: [
          {
                "title": "Excluding Passwords Safely",
                "content": "Instead of manually deleting passwordHash from user objects after fetching, use select so the database never reads the hash in the first place.",
                "codeSnippet": "// Public user profile endpoint:\nconst publicProfile = await prisma.user.findUnique({\n  where: { id: userId },\n  select: {\n    id: true,\n    name: true,\n    image: true,\n    createdAt: true,\n    // passwordHash is never queried from SQL!\n  },\n});"
          },
          {
                "title": "Mutual Exclusivity of select and include",
                "content": "In Prisma, select and include cannot be used as top-level siblings on the same model. To fetch a relation alongside selected fields, put a nested select or include inside select."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Using `select` and `include` together at the same level.",
    badApproach: {
      title: "Mixing select and include as Siblings",
      code: "// Flawed: Prisma forbids select and include as top-level siblings\nconst user = await prisma.user.findUnique({\n  where: { id: 1 },\n  select: { name: true },\n  include: { posts: true }, // Error: Please choose either select or include!\n});",
      flaw: "Prisma throws a validation error because select and include cannot be combined at the same query level.",
    },
    betterApproach: {
      title: "Nesting the Relation Inside select",
      code: "// Clean: Include the relation inside the select block\nconst user = await prisma.user.findUnique({\n  where: { id: 1 },\n  select: {\n    name: true,\n    posts: true, // or posts: { select: { title: true } }\n  },\n});",
      benefit: "Selects specific fields of the parent model while cleanly fetching the related posts.",
    },
    whyItMatters: "Understanding Prisma's selection syntax prevents frustrating query structure errors.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Experiment with selecting specific fields:",
    starterCode: "// Example projection query\nimport { PrismaClient } from \"@prisma/client\";\n\nconst prisma = new PrismaClient();\n\nasync function run() {\n  const users = await prisma.user.findMany({\n    select: {\n      id: true,\n      name: true,\n      email: true\n    }\n  });\n\n  console.log(\"Slim users list:\", users);\n}\n\nrun();",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why should you use 'select' when querying user records for an API endpoint?",
      options: [
              "Because Prisma requires select on every query or it will fail",
              "To fetch only the needed fields, preventing sensitive data like password hashes from leaking",
              "Because select converts relational database tables into MongoDB documents",
              "To sort the returned records in alphabetical order"
      ],
      correctIndex: 1,
      explanation: "Using select retrieves only the specific columns needed, reducing payload size and ensuring sensitive fields (like password hashes) are never exposed.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "select Limits Columns",
                "desc": "Specify only the fields you need instead of fetching all table columns."
          },
          {
                "title": "Protects Sensitive Fields",
                "desc": "Omit password hashes and internal tokens directly at the database query level."
          },
          {
                "title": "Type Narrowing",
                "desc": "TypeScript guarantees that only selected fields exist on the result object."
          }
    ],
  },
};
