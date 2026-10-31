import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri11ReadRelatedRecordsWithIncludeAndNestedSelectContent: StandardLessonContent = {
  slug: "pri11-read-related-records-with-include-and-nested-select",
  code: "PRI-11",
  title: "Read Related Records with `include` and Nested `select`",
  subtitle: "Eagerly load related entities using include or fetch precise nested subsets using nested select.",
  difficulty: "Moderate",
  scenario: {
    question: "A profile page needs the user's name and the titles of their posts, but not the full post contents. Should you use `include` or nested `select`?",
    answer: "Use `select` for the user's name and a nested `select` for each post's title.",
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
    title: "Read Related Records with `include` and Nested `select`",
    bigPicture: "By default, querying a user does not fetch their posts. This keeps queries fast and avoids pulling extra data from the database.\n\nWhen you need related records, you have two choices:\n\n- `include`: Loads the user and all fields of the related posts.\n- Nested `select`: Chooses exactly which fields to return from the user and which fields to return from each related post.",
    codeSnippet: "// 1. Example using include: returns all user fields and all post fields\nconst userWithPosts = await prisma.user.findUnique({\n  where: { id: 1 },\n  include: { posts: true },\n});\n\n// 2. Example using nested select: returns only specific fields\nconst userWithPostTitles = await prisma.user.findUnique({\n  where: { id: 1 },\n  select: {\n    name: true,\n    posts: {\n      select: { title: true },\n    },\n  },\n});",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. include: { posts: true }",
                "desc": "Tells Prisma to fetch all scalar fields of the User plus all scalar fields of every related Post in one operation."
          },
          {
                "title": "2. Nested select",
                "desc": "Selects specific columns on both the parent model and related child models."
          },
          {
                "title": "3. Avoids N+1 query problem",
                "desc": "Prisma batches relation queries efficiently, preventing slow loops of individual queries."
          },
          {
                "title": "4. Strongly typed results",
                "desc": "The returned TypeScript shape includes the related array with exact field typing."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Fetching related data in a single coordinated query avoids slow roundtrips and keeps API responses fast.",
    rule: {
      title: "Include vs Select Choice Rule",
      content: "Use include when you need all scalar fields of the parent plus all fields of related children. Use nested select when you only need a specific subset of columns to keep payloads lean.",
    },
    cards: [
          {
                "number": "01",
                "tag": "EAGER LOADING",
                "title": "include",
                "description": "Loads the entire related entity alongside the parent model. Simple and fast for full details views.",
                "color": "purple"
          },
          {
                "number": "02",
                "tag": "TARGETED PROJECTION",
                "title": "Nested select",
                "description": "Specifies exact fields across parent and child relations, reducing memory and bandwidth.",
                "color": "cyan"
          },
          {
                "number": "03",
                "tag": "BATCHING",
                "title": "N+1 Prevention",
                "description": "Prisma optimizes relation queries using SQL JOINs or batched IN queries, avoiding sequential latency.",
                "color": "emerald"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Filtering and sorting related records inside include/select:",
    points: [
          {
                "title": "Filtering Nested Relations",
                "content": "You can apply where, orderBy, and take inside include or select to filter which related items are returned.",
                "codeSnippet": "// Fetch user with only their 3 most recent published posts:\nconst user = await prisma.user.findUnique({\n  where: { id: 1 },\n  include: {\n    posts: {\n      where: { published: true },\n      orderBy: { createdAt: \"desc\" },\n      take: 3,\n    },\n  },\n});"
          },
          {
                "title": "TypeScript Return Types",
                "content": "Prisma provides helper types like Prisma.UserGetPayload<{ include: { posts: true } }> when passing relations to utility functions."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Accidentally fetching huge relational trees (e.g. users -> all posts -> all comments -> all authors).",
    badApproach: {
      title: "Over-Fetching Deep Relational Trees",
      code: "// Flawed: Pulling massive deep relations for a simple list view\nconst users = await prisma.user.findMany({\n  include: {\n    posts: {\n      include: {\n        comments: {\n          include: { author: true }\n        }\n      }\n    }\n  }\n});",
      flaw: "Can fetch tens of thousands of rows and megabytes of JSON, slowing database queries and freezing servers.",
    },
    betterApproach: {
      title: "Using Selective Projection and Limits",
      code: "// Clean: Fetch only necessary fields and paginate relations\nconst users = await prisma.user.findMany({\n  select: {\n    id: true,\n    name: true,\n    posts: {\n      take: 5,\n      select: { id: true, title: true }\n    }\n  }\n});",
      benefit: "Keeps database response times under a few milliseconds and payload sizes minimal.",
    },
    whyItMatters: "Controlling relation depth and payload size is essential for production performance and scalability.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Test querying related records:",
    starterCode: "// Example include vs select query\nimport { PrismaClient } from \"@prisma/client\";\n\nconst prisma = new PrismaClient();\n\nasync function run() {\n  const user = await prisma.user.findUnique({\n    where: { id: 1 },\n    select: {\n      name: true,\n      posts: {\n        select: { title: true }\n      }\n    }\n  });\n\n  console.log(\"User and post titles:\", user);\n}\n\nrun();",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "When should you prefer nested select over include when querying related models?",
      options: [
              "Only when using MongoDB instead of PostgreSQL",
              "When you only need a specific subset of fields from both parent and related models",
              "Whenever you want to delete records from the database",
              "Nested select is deprecated and should never be used"
      ],
      correctIndex: 1,
      explanation: "Nested select allows you to specify exact columns for both the main record and related child records, avoiding transferring unnecessary columns.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "Relations Are Not Loaded by Default",
                "desc": "Prisma queries do not fetch relations unless explicitly instructed."
          },
          {
                "title": "include for Full Models",
                "desc": "Use include to eager-load all fields of related entities."
          },
          {
                "title": "Nested select for Slim Payloads",
                "desc": "Pick specific columns on related records to optimize performance."
          }
    ],
  },
};
