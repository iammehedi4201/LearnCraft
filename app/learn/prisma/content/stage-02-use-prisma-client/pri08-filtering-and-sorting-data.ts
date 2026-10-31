import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri08FilteringAndSortingDataContent: StandardLessonContent = {
  slug: "pri08-filtering-and-sorting-data",
  code: "PRI-08",
  title: "Filtering and Sorting Data",
  subtitle: "Filter query results with where conditions and order results with orderBy.",
  difficulty: "Moderate",
  scenario: {
    question: "A blog needs to show only published posts, with the newest post at the top. What Prisma query should you write?",
    answer: "Use `where: { published: true }` to filter the posts and `orderBy: { createdAt: \"desc\" }` to sort by newest first.",
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
    title: "Filtering and Sorting Data",
    bigPicture: "You can filter which records to return using `where` and sort their order using `orderBy`.\n\n- `where` filters rows by comparing fields against values or operators (e.g. `equals`, `contains`, `gt`, `lt`, `in`).\n- `orderBy` sorts rows ascending (`\"asc\"`) or descending (`\"desc\"`).\n\nPrisma turns these into SQL `WHERE` and `ORDER BY` clauses.",
    codeSnippet: "const posts = await prisma.post.findMany({\n  where: {\n    published: true,\n  },\n  orderBy: {\n    createdAt: \"desc\",\n  },\n});",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. where: { published: true }",
                "desc": "Filters rows so only records where published is true are retrieved from the database."
          },
          {
                "title": "2. orderBy: { createdAt: \"desc\" }",
                "desc": "Sorts matching posts descending by creation date, placing the newest posts first."
          },
          {
                "title": "3. Combined in one query",
                "desc": "Both filtering and sorting happen inside the database engine before rows are transmitted over the network."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Filtering and sorting inside the database is dramatically faster than fetching thousands of rows and filtering in JavaScript memory.",
    rule: {
      title: "Database-Level Filtering Rule",
      content: "Always filter with where and sort with orderBy in the database query. Filtering in application memory wastes network bandwidth and database memory.",
    },
    cards: [
          {
                "number": "01",
                "tag": "FILTERING",
                "title": "where Clause",
                "description": "Filters rows using equality, ranges (gt, gte, lt, lte), pattern matches (contains), or sets (in).",
                "color": "purple"
          },
          {
                "number": "02",
                "tag": "ORDERING",
                "title": "orderBy Clause",
                "description": "Sorts records by one or multiple fields in 'asc' (ascending) or 'desc' (descending) order.",
                "color": "emerald"
          },
          {
                "number": "03",
                "tag": "LOGIC",
                "title": "AND / OR Operators",
                "description": "Combine multiple conditions using AND, OR, and NOT logical filter arrays.",
                "color": "cyan"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Advanced filtering conditions for an ecommerce store:",
    points: [
          {
                "title": "Range & Text Filtering",
                "content": "Prisma provides operators for price ranges, string searches, and status lists.",
                "codeSnippet": "// Find active products between $10 and $100 matching a search keyword\nconst products = await prisma.product.findMany({\n  where: {\n    inStock: true,\n    price: {\n      gte: 10,\n      lte: 100,\n    },\n    title: {\n      contains: \"keyboard\",\n      mode: \"insensitive\", // Case-insensitive search\n    },\n  },\n  orderBy: {\n    price: \"asc\",\n  },\n});"
          },
          {
                "title": "Sorting by Multiple Fields",
                "content": "You can pass an array to orderBy to sort by multiple columns, such as sorting first by category ascending and then by price descending."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Fetching all records and filtering with JavaScript array methods in memory.",
    badApproach: {
      title: "Filtering in Memory with Array.filter",
      code: "// Flawed: Fetches all 100,000 posts across the network!\nconst allPosts = await prisma.post.findMany();\nconst published = allPosts.filter(p => p.published);",
      flaw: "Transfers thousands of unnecessary rows across the database connection, causing high memory usage and slow responses.",
    },
    betterApproach: {
      title: "Filtering in the Database Query",
      code: "// Clean: Database only returns the matching rows\nconst published = await prisma.post.findMany({\n  where: { published: true },\n});",
      benefit: "Database uses indexes to find matching rows instantly and transmits only the needed data.",
    },
    whyItMatters: "Pushing filtering and sorting to the database engine ensures high performance as your dataset grows.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Test filtering and sorting queries:",
    starterCode: "// Example filtering and sorting\nimport { PrismaClient } from \"@prisma/client\";\n\nconst prisma = new PrismaClient();\n\nasync function run() {\n  const posts = await prisma.post.findMany({\n    where: { published: true },\n    orderBy: { createdAt: \"desc\" },\n    take: 5\n  });\n\n  console.log(\"Top 5 recent posts:\", posts);\n}\n\nrun();",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "How do you sort posts so the newest post appears first in Prisma Client?",
      options: [
              "orderBy: { createdAt: 'desc' }",
              "orderBy: { createdAt: 'asc' }",
              "where: { sort: 'newest' }",
              "filter: { createdAt: 'latest' }"
      ],
      correctIndex: 0,
      explanation: "Sorting with orderBy: { createdAt: 'desc' } orders records descending by creation date, placing the newest timestamps at the top of the result list.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "where Filters Rows",
                "desc": "Specify conditions in where to filter records in the database."
          },
          {
                "title": "orderBy Sorts Results",
                "desc": "Use 'asc' for oldest/lowest and 'desc' for newest/highest."
          },
          {
                "title": "Filter in DB, Not App",
                "desc": "Always filter inside the database query rather than in JavaScript memory."
          }
    ],
  },
};
