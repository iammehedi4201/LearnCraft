import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb14CheckAQueryWithExplainContent: StandardLessonContent = {
  slug: "mdb14-check-a-query-with-explain",
  code: "MDB-14",
  title: "Check a Query with explain()",
  subtitle: "Diagnose query performance with executionStats, comparing COLLSCAN vs IXSCAN and totalDocsExamined.",
  difficulty: "Moderate",
  scenario: {
    question: "A query returns 10 courses but examines 50,000 documents. What should you investigate?",
    answer: "Check the filter and its indexes. Use `explain()` to understand why so many documents are examined, then test a suitable index or query change.",
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
    title: "Check a Query with explain()",
    bigPicture:
      "A query may be slow because MongoDB examines too many documents or cannot use a helpful index. `explain()` shows how MongoDB plans and runs a query.",
    codeSnippet: `// Run query profiler with execution statistics (illustrative):
db.courses
  .find({ title: "React Basics" })
  .explain("executionStats")`,
    breakdownTitle: "Key ideas in the output",
    breakdownItems: [
      {
        title: "1. COLLSCAN",
        desc: "MongoDB scans documents in the collection.",
      },
      {
        title: "2. IXSCAN",
        desc: "MongoDB scans an index.",
      },
      {
        title: "3. totalDocsExamined",
        desc: "How many documents MongoDB examined.",
      },
      {
        title: "4. nReturned",
        desc: "How many documents the query returned.",
      },
    ],
  },
  part2: {
    title: "How to Investigate Queries Step by Step",
    intro:
      "Do not assume that every `COLLSCAN` is automatically bad. A collection scan can be reasonable for a small collection or a query that returns many documents. Read the full plan and measure the real workload.",
    rule: {
      title: "Query Diagnostics Rule",
      content:
        "Run `explain('executionStats')`. Compare `totalDocsExamined` with `nReturned`. When `totalDocsExamined` vastly exceeds `nReturned`, add or adjust indexes to achieve an IXSCAN stage.",
    },
    cards: [
      {
        number: "01",
        tag: "STAGES",
        title: "COLLSCAN vs IXSCAN",
        color: "emerald",
        description:
          "COLLSCAN inspects every document in storage. IXSCAN uses an indexed B-tree to jump directly to matching pointer records.",
      },
      {
        number: "02",
        tag: "RATIO",
        title: "Selectivity Ratio",
        color: "cyan",
        description:
          "Ideal ratio of `totalDocsExamined : nReturned` is close to 1:1. High disparity indicates unindexed filtering.",
      },
      {
        number: "03",
        tag: "CONTEXT",
        title: "Workload Context",
        color: "purple",
        description:
          "For collections with only 50 documents, a COLLSCAN is often faster than reading an index from RAM.",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Troubleshooting slow production query patterns:",
    points: [
      {
        title: "Diagnosing 50,000 Document Scans",
        content:
          "When a query for 10 users takes 400ms, running `.explain('executionStats')` reveals `stage: 'COLLSCAN'` and `totalDocsExamined: 50000`. Adding an index drops docs examined to 10.",
      },
      {
        title: "Verifying Index Usage",
        content:
          "After creating an index, running `explain()` confirms whether the query optimizer selected your index (`winningPlan.inputStage.indexName`).",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Guessing why a query is slow without checking the execution plan, or assuming every COLLSCAN is automatically a critical defect.",
    bad: {
      title: "Guessing Index Strategy Without Profiling",
      code: `// Anti-pattern: blindly adding indexes without measuring
db.courses.createIndex({ price: 1, title: 1, isPublished: 1 });
// Query might still be slow if the optimizer cannot use the prefix keys!`,
      explanation:
        "Without running `explain()`, you cannot see which index was chosen or where execution time was spent.",
    },
    good: {
      title: "Inspecting executionStats with explain()",
      code: `// Best practice: inspect the execution plan first
const stats = db.courses
  .find({ title: "React Basics" })
  .explain("executionStats");

console.log(stats.executionStats.totalDocsExamined);
console.log(stats.executionStats.nReturned);`,
      explanation:
        "`executionStats` reveals exact document examination counts and winning plan stages.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. Below is a simulation of explain plan metrics calculation:",
    starterCode: `// Simulating explain('executionStats') output in JavaScript
function simulateExplain(hasIndex, collectionSize, matchCount) {
  const stage = hasIndex ? "IXSCAN" : "COLLSCAN";
  const totalDocsExamined = hasIndex ? matchCount : collectionSize;
  const executionTimeMillis = hasIndex ? 2 : Math.round(collectionSize / 200);

  return {
    executionStats: {
      executionSuccess: true,
      nReturned: matchCount,
      executionTimeMillis,
      totalDocsExamined,
      stage
    }
  };
}

console.log("Unindexed scan:", simulateExplain(false, 50000, 10));
console.log("Indexed scan:", simulateExplain(true, 50000, 10));`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "A query returns 10 courses but examines 50,000 documents. What should you investigate?",
      options: [
        "Check the filter and its indexes. Use `explain()` to understand why so many documents are examined, then test a suitable index or query change.",
        "Restart the computer and assume the query returned the wrong 10 courses.",
        "Immediately delete 49,990 documents from the database.",
        "Convert all numbers in the documents into strings.",
      ],
      correctIndex: 0,
      explanation:
        "Use `explain('executionStats')` to inspect `totalDocsExamined` and verify if an index can replace the full collection scan.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "explain('executionStats')",
        desc: "Provides detailed metrics on query planning, winning plans, and execution times.",
      },
      {
        title: "COLLSCAN vs IXSCAN",
        desc: "`COLLSCAN` scans all collection documents; `IXSCAN` leverages an index.",
      },
      {
        title: "Docs Examined vs Returned",
        desc: "Aim for a ratio where `totalDocsExamined` is as close as possible to `nReturned`.",
      },
    ],
    nextLessonPreview: {
      title: "Lesson 15: Pagination",
      desc: "Learn how to paginate large collections using skip()/limit() and efficient range-based queries.",
    },
  },
};

