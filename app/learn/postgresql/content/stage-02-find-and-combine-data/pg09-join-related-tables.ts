import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg09JoinRelatedTablesContent: StandardLessonContent = {
  slug: "pg09-join-related-tables",
  code: "PG-09",
  title: "JOIN — Read Data from Related Tables",
  subtitle: "Combine data from multiple tables using INNER JOIN and preserve unmatched records with LEFT JOIN.",
  difficulty: "Difficult",
  scenario: {
    question: "An admin wants to see all customers, including customers who have never placed an order. Which join should be used?",
    answer: "Use LEFT JOIN with customers on the left. It keeps all customers and shows NULL for order information when no order exists.",
  },
  interviewQuestion: {
    question: "What is the difference between INNER JOIN and LEFT JOIN?",
    answer: "INNER JOIN returns only rows with matches on both sides. LEFT JOIN returns every row from the left table and matching rows from the right table; missing matches have NULL values.",
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
    title: "JOIN — Read Data from Related Tables",
    bigPicture:
      "A `JOIN` combines related rows from two or more tables. It is useful when the information you need is stored in different tables.\n\nSuppose customer names are in `customers` and order totals are in `orders`.",
    codeSnippet: `-- INNER JOIN: returns rows where a match exists in both tables
SELECT customers.name, orders.total
FROM customers
INNER JOIN orders
  ON orders.customer_id = customers.id;

-- LEFT JOIN: keeps every customer even if they have no orders
SELECT customers.name, orders.total
FROM customers
LEFT JOIN orders
  ON orders.customer_id = customers.id;`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Table scanning",
        desc: "PostgreSQL reads rows from both `customers` and `orders`.",
      },
      {
        title: "2. Join predicate (ON)",
        desc: "`ON orders.customer_id = customers.id` specifies the matching condition linking the tables.",
      },
      {
        title: "3. INNER JOIN semantics",
        desc: "Returns only pairs of rows where a matching customer and matching order both exist.",
      },
      {
        title: "4. LEFT JOIN semantics",
        desc: "Preserves every row from the left table (`customers`), filling in `NULL` for order columns when no matching order exists.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "Relational design avoids data duplication by separating entities into distinct tables. Joins allow querying normalized tables as a cohesive, single result set.",
    rule: {
      title: "Join Selection Rule",
      content:
        "Use `INNER JOIN` when you only care about records that possess related data on both sides. Use `LEFT JOIN` when you need to preserve all records from the primary table regardless of whether children exist.",
    },
    cards: [
      {
        number: "01",
        tag: "INNER",
        title: "Exact Intersections",
        description:
          "INNER JOIN drops customers who haven't ordered yet and drops any orphaned orders. It only returns verified relationships.",
        color: "purple",
      },
      {
        number: "02",
        tag: "OUTER",
        title: "Inclusive LEFT JOIN",
        description:
          "LEFT JOIN guarantees that every left row appears in the output, allowing reports to show inactive customers or unassigned tickets.",
        color: "emerald",
      },
      {
        number: "03",
        tag: "PREDICATE",
        title: "Explicit ON Conditions",
        description:
          "Always specify exact join predicates with `ON`. Forgetting `ON` causes a Cartesian product (CROSS JOIN) multiplying all rows.",
        color: "cyan",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Examine how customer marketing and sales reports utilize different join types.",
    points: [
      {
        title: "Sales Report (INNER JOIN)",
        content:
          "When calculating total store revenue for customers who actually bought items, `INNER JOIN` ensures only real sales are included.",
      },
      {
        title: "Customer Engagement Audit (LEFT JOIN)",
        content:
          "To find registered customers who have never made a purchase, use `LEFT JOIN` and filter for `WHERE orders.id IS NULL`.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Using an INNER JOIN when generating a full customer list, accidentally filtering out all newly registered customers who haven't purchased yet.",
    badApproach: {
      title: "Inadvertently Omitting Inactive Users",
      code: `-- Flawed: Drops all customers with 0 orders!
SELECT customers.name, orders.total
FROM customers
INNER JOIN orders ON orders.customer_id = customers.id;`,
      flaw: "Customers who signed up recently or have zero purchases disappear completely from customer management lists.",
    },
    betterApproach: {
      title: "Inclusive LEFT JOIN with Fallback",
      code: `-- Production: Keeps all customers
SELECT customers.name, COALESCE(orders.total, 0.00) AS order_total
FROM customers
LEFT JOIN orders ON orders.customer_id = customers.id;`,
      benefit: "Shows every customer in the database, displaying 0.00 or NULL if they have not placed an order.",
    },
    whyItMatters:
      "Choosing the wrong join type can silently exclude customers, leading to skewed analytics and broken customer support dashboards.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Compare INNER JOIN and LEFT JOIN behavior with real records:",
    starterCode: `CREATE TABLE customers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id BIGINT REFERENCES customers(id),
  total NUMERIC(10, 2) NOT NULL
);

INSERT INTO customers (name) VALUES ('Amina'), ('Rahim');
INSERT INTO orders (customer_id, total) VALUES (1, 1200.00);

-- Amina has an order; Rahim does not.
-- Try switching between INNER JOIN and LEFT JOIN:
SELECT customers.name, orders.total
FROM customers
LEFT JOIN orders ON orders.customer_id = customers.id;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which join returns all rows from the left table and fills in NULL for right-side columns when no match exists?",
      options: [
        "CROSS JOIN",
        "INNER JOIN",
        "LEFT JOIN",
        "FULL OUTER JOIN",
      ],
      correctIndex: 2,
      explanation:
        "A LEFT JOIN returns every row from the left table. If there is no matching row on the right, the right-side columns are filled with NULL values.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "JOIN Combines Relations",
        desc: "Joins connect normalized tables based on shared key relationships defined in `ON` clauses.",
      },
      {
        title: "INNER vs LEFT",
        desc: "`INNER JOIN` requires matches on both sides; `LEFT JOIN` preserves all rows from the left table.",
      },
      {
        title: "Spotting Inactive Records",
        desc: "Use `LEFT JOIN ... WHERE right_table.id IS NULL` to identify unassociated or inactive records.",
      },
    ],
  },
};

