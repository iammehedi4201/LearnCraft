import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri17PaginationContent: StandardLessonContent = {
  slug: "pri17-pagination",
  code: "PRI-17",
  title: "Pagination",
  subtitle: "Navigate large datasets efficiently using offset-based (skip/take) and cursor-based pagination.",
  difficulty: "Moderate",
  scenario: {
    question: "Your admin page has 5,000 users. You only want to show 20 users at a time. What Prisma features do you use?",
    answer: "Use pagination with `take` to limit the records and `skip` or a cursor to choose where the next page starts.",
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
    title: "Pagination",
    bigPicture: "Large datasets must be broken into smaller chunks called pages. Returning 10,000 records at once slows down the database, exhausts server memory, and degrades user experience.\n\nPrisma provides two primary styles of pagination:\n\n- Offset pagination (`skip` and `take`): Skips a specified count of rows and takes the next batch. Easy to implement for numbered page navigation (e.g. Page 1, 2, 3).\n- Cursor pagination (`cursor` and `take`): Uses a unique record ID as a bookmark to fetch the next batch. Far faster and more consistent for high-volume infinite scroll lists.",
    codeSnippet: "// Offset pagination example:\nconst page = 2;\nconst pageSize = 20;\n\nconst users = await prisma.user.findMany({\n  skip: (page - 1) * pageSize,\n  take: pageSize,\n  orderBy: { id: \"asc\" },\n});",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. take: pageSize",
                "desc": "Limits the query to return at most pageSize (20) records, mapping to SQL LIMIT."
          },
          {
                "title": "2. skip: (page - 1) * pageSize",
                "desc": "Skips earlier records (e.g. skips 20 records for page 2), mapping to SQL OFFSET."
          },
          {
                "title": "3. orderBy: { id: \"asc\" }",
                "desc": "Always include a deterministic order so records appear in consistent order without duplicates or omissions across pages."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Efficient pagination prevents memory exhaustion and keeps API responses fast as datasets scale from hundreds to millions of records.",
    rule: {
      title: "Deterministic Ordering Rule",
      content: "Pagination requires a stable, deterministic 'orderBy' (such as primary key id or unique createdAt). Without an orderBy clause, the database does not guarantee row order across pages.",
    },
    cards: [
          {
                "number": "01",
                "tag": "OFFSET",
                "title": "skip & take",
                "description": "Simple to implement with page numbers. Ideal for traditional admin tables with page buttons.",
                "color": "purple"
          },
          {
                "number": "02",
                "tag": "CURSOR",
                "title": "cursor & take",
                "description": "High-performance pagination using an indexed ID cursor. Perfect for mobile feeds and infinite scrolling.",
                "color": "emerald"
          },
          {
                "number": "03",
                "tag": "STABILITY",
                "title": "Deterministic Sort",
                "description": "Always sort by unique columns to prevent rows from appearing on multiple pages if data changes.",
                "color": "cyan"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Comparing Offset Pagination vs Cursor Pagination:",
    points: [
          {
                "title": "Cursor-Based Pagination for High Scale",
                "content": "In large tables (e.g. 500,000 rows), skip: 100000 requires the database to scan and discard 100,000 rows. Cursor pagination uses an index seek to jump directly to the target record.",
                "codeSnippet": "// Cursor pagination: fast even at row 1,000,000\nconst nextBatch = await prisma.post.findMany({\n  take: 20,\n  skip: 1, // Skip the cursor itself\n  cursor: { id: lastPostId },\n  orderBy: { id: \"asc\" },\n});"
          },
          {
                "title": "Counting Total Pages",
                "content": "To display 'Page 1 of 50', run prisma.user.count({ where }) alongside findMany() to compute total pages."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Omitting `orderBy` during pagination, resulting in erratic row ordering across pages.",
    badApproach: {
      title: "Paginating Without Explicit Ordering",
      code: "// Flawed: SQL does not guarantee order without ORDER BY\nconst page1 = await prisma.user.findMany({ skip: 0, take: 10 });\n// Later, new inserts can cause rows to shift unexpectedly:\nconst page2 = await prisma.user.findMany({ skip: 10, take: 10 });",
      flaw: "Rows can appear on multiple pages or disappear entirely as the database rearranges internal storage order.",
    },
    betterApproach: {
      title: "Always Sorting Deterministically",
      code: "// Clean: Stable, deterministic pagination\nconst page2 = await prisma.user.findMany({\n  skip: 10,\n  take: 10,\n  orderBy: { id: \"asc\" },\n});",
      benefit: "Guarantees exact, reproducible page boundaries.",
    },
    whyItMatters: "Deterministic ordering ensures users never see duplicate or missing items when browsing pages.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Experiment with offset and cursor pagination:",
    starterCode: "// Example offset pagination\nimport { PrismaClient } from \"@prisma/client\";\n\nconst prisma = new PrismaClient();\n\nasync function getPage(pageNumber = 1, pageSize = 10) {\n  const [total, items] = await Promise.all([\n    prisma.user.count(),\n    prisma.user.findMany({\n      skip: (pageNumber - 1) * pageSize,\n      take: pageSize,\n      orderBy: { id: \"asc\" }\n    })\n  ]);\n\n  return { total, totalPages: Math.ceil(total / pageSize), items };\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why is cursor pagination preferred over offset pagination (skip/take) for massive datasets?",
      options: [
              "Cursor pagination works without an indexed column",
              "Cursor pagination uses an index seek to jump directly to the starting record instead of scanning and skipping thousands of rows",
              "Cursor pagination eliminates the need for database connections",
              "Cursor pagination only works in TypeScript"
      ],
      correctIndex: 1,
      explanation: "Cursor pagination uses indexed comparisons (e.g. WHERE id > lastId LIMIT 20) which jump directly to the target record, whereas large offset values (skip: 100000) force the database to scan all previous rows.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "take Limits Rows",
                "desc": "take specifies the page size, mapping to SQL LIMIT."
          },
          {
                "title": "skip Offsets Rows",
                "desc": "skip sets the starting offset for traditional page number pagination."
          },
          {
                "title": "Cursor for High Volume",
                "desc": "Use cursor-based pagination for high performance and infinite scrolling."
          }
    ],
  },
};
