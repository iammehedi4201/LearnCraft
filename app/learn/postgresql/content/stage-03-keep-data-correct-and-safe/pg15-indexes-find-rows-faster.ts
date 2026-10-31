import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg15IndexesFindRowsFasterContent: StandardLessonContent = {
  slug: "pg15-indexes-find-rows-faster",
  code: "PG-15",
  title: "Indexes — Find Rows Faster",
  subtitle: "Accelerate query performance with B-Tree indexes while understanding write overhead and storage trade-offs.",
  difficulty: "Moderate",
  scenario: {
    question: "An orders table has millions of rows, and searching by customer_id is slow. What can you investigate?",
    answer: "Check the query plan and consider an index on customer_id. Then measure the query again to see whether it improved.",
  },
  interviewQuestion: {
    question: "Why can too many indexes be a problem?",
    answer: "Indexes use extra storage and must be updated when rows change. Too many indexes can slow down inserts, updates, and deletes.",
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
    title: "Indexes — Find Rows Faster",
    bigPicture:
      "An index is a data structure PostgreSQL can use to find rows without checking every row in the table. It can make some searches faster, but it also uses storage and adds work when data changes.",
    codeSnippet: `CREATE INDEX idx_orders_customer_id
ON orders(customer_id);

SELECT *
FROM orders
WHERE customer_id = 25;`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. CREATE INDEX idx_orders_customer_id",
        desc: "Creates a B-Tree index on the `customer_id` column of the `orders` table.",
      },
      {
        title: "2. Maintenance on mutations",
        desc: "PostgreSQL automatically updates the B-Tree index whenever rows are inserted, updated, or deleted.",
      },
      {
        title: "3. Fast index lookup",
        desc: "When a query filters by `customer_id = 25`, PostgreSQL can navigate the B-Tree in O(log N) operations to locate target rows directly.",
      },
      {
        title: "4. Planner cost decision",
        desc: "The query planner decides whether using the index is cheaper than a sequential scan based on table statistics and row selectivity.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "Without an index, finding one order out of 10 million rows forces PostgreSQL to read every single disk page sequentially (a sequential scan).",
    rule: {
      title: "Index Trade-Off Rule",
      content:
        "Index frequently filtered columns, foreign keys, and unique constraints. Do not index every column indiscriminately, as every index increases write latency and disk consumption.",
    },
    cards: [
      {
        number: "01",
        tag: "READ SPEED",
        title: "O(log N) Lookups",
        description:
          "Indexes allow jumping directly to matching rows without scanning the full table, reducing query response times from seconds to microseconds.",
        color: "emerald",
      },
      {
        number: "02",
        tag: "WRITE OVERHEAD",
        title: "Insert / Update Costs",
        description:
          "Every `INSERT`, `UPDATE`, or `DELETE` must update every index on the table, adding CPU and write I/O overhead.",
        color: "amber",
      },
      {
        number: "03",
        tag: "STORAGE",
        title: "Disk & Memory Footprint",
        description:
          "Indexes consume RAM in the PostgreSQL buffer pool. Over-indexing starves data caches and harms overall database throughput.",
        color: "rose",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Examine when indexing foreign keys and search columns transforms application latency.",
    points: [
      {
        title: "Indexing Foreign Keys",
        content:
          "PostgreSQL creates indexes for PRIMARY KEY and UNIQUE constraints automatically, but does NOT create an index on `FOREIGN KEY` columns. Always index foreign keys like `orders.customer_id`.",
      },
      {
        title: "Small Table Exception",
        content:
          "On tables with only a few hundred rows (like a `roles` or `order_status` table), a sequential scan is often faster than an index scan because the entire table fits in a single memory block.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Failing to index foreign keys or frequently queried search columns in tables with millions of rows.",
    badApproach: {
      title: "Missing Index on Foreign Key",
      code: `-- Flawed: 10 million row orders table with NO index on customer_id
SELECT * FROM orders WHERE customer_id = 42;

-- Results in: Sequential Scan on orders (cost=0.00..184562.00 rows=3 width=48)
-- Reads all 10,000,000 rows from disk every query!`,
      flaw: "Causes massive disk I/O and CPU spikes, slowing down customer order history pages.",
    },
    betterApproach: {
      title: "Targeted B-Tree Index",
      code: `CREATE INDEX idx_orders_customer_id ON orders(customer_id);

-- Now executes: Bitmap Index Scan on idx_orders_customer_id (cost=0.00..8.50)
-- Reads only matching rows in less than 1 millisecond.`,
      benefit: "Reduces execution time by over 99% while conserving server CPU and memory.",
    },
    whyItMatters:
      "Strategic indexing is the single most effective way to optimize relational query response times under high scale.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Create an index on orders and query matching rows:",
    starterCode: `CREATE TABLE orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id BIGINT NOT NULL,
  total NUMERIC(10, 2) NOT NULL
);

CREATE INDEX idx_orders_customer_id
ON orders(customer_id);

INSERT INTO orders (customer_id, total) VALUES
  (25, 450.00),
  (25, 120.00),
  (42, 900.00);

SELECT *
FROM orders
WHERE customer_id = 25;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why should you avoid adding an index to every single column in a table?",
      options: [
        "PostgreSQL only allows a maximum of two indexes per table",
        "Indexes consume extra storage and slow down inserts, updates, and deletes",
        "Indexes make SELECT queries slower for all users",
        "Indexes corrupt primary key constraints",
      ],
      correctIndex: 1,
      explanation:
        "Every index consumes disk space and must be updated on every INSERT, UPDATE, or DELETE, which increases write latency and memory usage.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Speed Up Searches",
        desc: "Indexes allow PostgreSQL to locate matching rows without scanning every row in the table.",
      },
      {
        title: "Write Trade-Off",
        desc: "Indexes accelerate reads but add computational overhead and storage costs to writes.",
      },
      {
        title: "Index Foreign Keys",
        desc: "Always index foreign key columns to ensure joins and parent updates run fast.",
      },
    ],
  },
};

