import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg16QueryPlanExplainContent: StandardLessonContent = {
  slug: "pg16-query-plan-explain",
  code: "PG-16",
  title: "Read a Query Plan with EXPLAIN",
  subtitle: "Diagnose query bottlenecks, inspect Seq Scan vs Index Scan, and measure actual execution with EXPLAIN (ANALYZE, BUFFERS).",
  difficulty: "Difficult",
  scenario: {
    question: "A developer adds an index but the query is still slow. What should they check next?",
    answer: "Run EXPLAIN (ANALYZE, BUFFERS) and look at the actual plan, rows, and time. PostgreSQL may have chosen not to use the index, or another part of the query may be the real problem.",
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
    title: "Read a Query Plan with EXPLAIN",
    bigPicture:
      "`EXPLAIN` shows how PostgreSQL plans to run a query. It helps you understand whether PostgreSQL expects to scan a table, use an index, join tables, or perform other work.",
    codeSnippet: `-- Shows planned steps based on optimizer cost estimates
EXPLAIN
SELECT *
FROM orders
WHERE customer_id = 25;

-- Actually runs the query and displays real timings and buffer usage
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE customer_id = 25;`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. EXPLAIN estimation",
        desc: "Shows the query execution plan without running the statement, displaying estimated startup cost and total cost.",
      },
      {
        title: "2. Scan node types",
        desc: "Reveals whether PostgreSQL chooses a `Seq Scan` (reading the entire table) or an `Index Scan` / `Bitmap Index Scan`.",
      },
      {
        title: "3. ANALYZE option",
        desc: "Actually executes the query to measure actual runtime in milliseconds (`actual time=0.042..0.085`) and rows returned.",
      },
      {
        title: "4. BUFFERS option",
        desc: "Reports memory buffer hits (`shared hit=3`) vs physical disk reads (`read=12`).",
      },
      {
        title: "5. Safety note",
        desc: "`EXPLAIN ANALYZE` actually executes the query! Running it with an `UPDATE` or `DELETE` will modify database data.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "Never guess why a query is slow. `EXPLAIN` gives you direct visibility into the query planner's internal decisions.",
    rule: {
      title: "Query Plan Diagnostics Rule",
      content:
        "Diagnose slow queries using `EXPLAIN (ANALYZE, BUFFERS)`. Look for unexpected `Seq Scan` nodes on large tables and check for discrepancies between estimated and actual row counts.",
    },
    cards: [
      {
        number: "01",
        tag: "PLANS",
        title: "Seq Scan vs Index Scan",
        description:
          "Seq Scan reads all table blocks sequentially. Index Scan uses B-Tree pointers to read only relevant rows.",
        color: "purple",
      },
      {
        number: "02",
        tag: "BUFFERS",
        title: "Shared Buffer Hits",
        description:
          "Buffer hits indicate data was served from RAM. High buffer reads from disk identify I/O bottlenecks.",
        color: "emerald",
      },
      {
        number: "03",
        tag: "SAFETY",
        title: "ANALYZE Executes",
        description:
          "Remember that ANALYZE executes the statement. Always wrap tests in a rolled-back transaction if testing mutations (`BEGIN; EXPLAIN ANALYZE DELETE ...; ROLLBACK;`).",
        color: "rose",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "See how database engineers troubleshoot slow API endpoints using execution plans.",
    points: [
      {
        title: "Stale Statistics",
        content:
          "If the planner expects 5 rows (`rows=5`) but the query returns 500,000 rows (`actual rows=500000`), run `ANALYZE table_name;` to update PostgreSQL's planner statistics.",
      },
      {
        title: "Index Ignored Due to Type Mismatch",
        content:
          "If a column is `BIGINT` and your query passes a string or calls a function on the column (`WHERE lower(email) = ...`), PostgreSQL cannot use standard indexes.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Guessing which indexes to add without inspecting the EXPLAIN plan, or running EXPLAIN ANALYZE on a DELETE statement in production.",
    badApproach: {
      title: "Blind Optimization",
      code: `-- Guessing and adding random indexes:
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_desc ON products(description);
-- But query was slow because of an unindexed foreign key in the orders table!`,
      flaw: "Adds write overhead without solving the actual query bottleneck.",
    },
    betterApproach: {
      title: "Plan-Driven Optimization",
      code: `-- Run EXPLAIN (ANALYZE, BUFFERS) first:
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders WHERE customer_id = 25;

-- Plan shows: Seq Scan on orders (cost=0.00..120.00 rows=2)
-- Solution is clear: Index customer_id on orders!
CREATE INDEX idx_orders_customer_id ON orders(customer_id);`,
      benefit: "Identifies the exact step consuming execution time with empirical measurements.",
    },
    whyItMatters:
      "Data-driven query tuning solves real production bottlenecks without adding useless indexes.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Inspect the EXPLAIN plan for a simple query:",
    starterCode: `CREATE TABLE orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id BIGINT NOT NULL,
  total NUMERIC(10, 2) NOT NULL
);

INSERT INTO orders (customer_id, total)
VALUES (25, 100.00), (25, 250.00), (30, 90.00);

-- Inspect the plan:
EXPLAIN SELECT * FROM orders WHERE customer_id = 25;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is an important safety consideration when running EXPLAIN ANALYZE on a query?",
      options: [
        "It temporarily locks the database in read-only mode",
        "It actually executes the SQL statement, including any data modifications",
        "It deletes all query planner statistics",
        "It cannot be run on tables with more than 100 rows",
      ],
      correctIndex: 1,
      explanation:
        "Unlike plain EXPLAIN (which only estimates costs), EXPLAIN ANALYZE executes the statement to gather real runtime metrics. Use caution with data-modifying statements.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Understand Planner Choices",
        desc: "`EXPLAIN` displays whether PostgreSQL plans to scan a table, use an index, or join data.",
      },
      {
        title: "Measure Real Runtimes",
        desc: "`EXPLAIN (ANALYZE, BUFFERS)` executes the query to report actual times and buffer hits.",
      },
      {
        title: "Verify Before and After",
        desc: "Always compare query plans before and after adding an index to verify performance improvements.",
      },
    ],
  },
};

