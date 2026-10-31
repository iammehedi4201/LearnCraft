import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg11SubqueriesAndCtesContent: StandardLessonContent = {
  slug: "pg11-subqueries-and-ctes",
  code: "PG-11",
  title: "Subqueries and Common Table Expressions (CTEs)",
  subtitle: "Break complex SQL transformations into readable steps using nested subqueries and named CTEs with the WITH clause.",
  difficulty: "Difficult",
  scenario: {
    question: "A report query is becoming difficult to read because it contains a calculation inside another query. What could make it clearer?",
    answer: "A CTE can give the calculation a name and separate it from the main query. It can make the SQL easier to read, although it is not automatically faster than a subquery.",
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
    title: "Subqueries and Common Table Expressions (CTEs)",
    bigPicture:
      "A **subquery** is a query used inside another query. A **CTE** is a named result created with `WITH`, which can make a longer query easier to read.",
    codeSnippet: `-- Subquery example: find products priced above average
SELECT name, price
FROM products
WHERE price > (
  SELECT AVG(price)
  FROM products
);

-- CTE example: named intermediate result with WITH
WITH customer_totals AS (
  SELECT customer_id, SUM(total) AS spent
  FROM orders
  GROUP BY customer_id
)
SELECT customer_id, spent
FROM customer_totals
WHERE spent > 5000;`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Inner subquery",
        desc: "The nested subquery `(SELECT AVG(price) FROM products)` computes the single average price value first.",
      },
      {
        title: "2. Outer query comparison",
        desc: "The outer query filters rows whose individual price exceeds that computed scalar average.",
      },
      {
        title: "3. WITH customer_totals AS (...) ",
        desc: "Creates a named Common Table Expression (CTE) holding the aggregated customer spendings.",
      },
      {
        title: "4. Main query execution",
        desc: "The outer query cleanly selects from `customer_totals` and applies business filters (`WHERE spent > 5000`).",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "Deeply nested SQL queries become unmaintainable spaghetti code. CTEs allow writing complex multi-step queries top-to-bottom like clean procedural code.",
    rule: {
      title: "Query Modularity Rule",
      content:
        "Use CTEs (`WITH`) to name intermediate datasets and simplify multi-step analytics. While modern PostgreSQL optimizes CTEs inline with subqueries, CTEs provide far superior readability and team maintainability.",
    },
    cards: [
      {
        number: "01",
        tag: "READABILITY",
        title: "Linear Top-to-Bottom Flow",
        description:
          "CTEs read like variable declarations in standard programming languages, making complex business logic easy to audit.",
        color: "purple",
      },
      {
        number: "02",
        tag: "SUBQUERIES",
        title: "Scalar Lookups",
        description:
          "Use quick inline subqueries for dynamic scalar thresholds like `WHERE created_at > (SELECT max(...) FROM ...)`.",
        color: "emerald",
      },
      {
        number: "03",
        tag: "COMPOSABILITY",
        title: "Chained CTEs",
        description:
          "You can chain multiple CTEs with commas (`WITH a AS (...), b AS (...) SELECT ...`) to construct elegant analytical pipelines.",
        color: "cyan",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Analyze how revenue analytics and tiered customer reporting use CTEs to organize complex logic.",
    points: [
      {
        title: "Multi-Tier Customer Segmentation",
        content:
          "Compute order totals in CTE 1, classify customers into Gold/Silver tiers in CTE 2, and aggregate tier performance in the final query.",
      },
      {
        title: "Subquery in WHERE IN",
        content:
          "`WHERE id IN (SELECT product_id FROM active_promotions)` lets you filter against dynamic lists from other tables cleanly.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Writing deeply nested subqueries 4 levels deep in FROM and WHERE clauses, making queries unreadable and hard to debug.",
    badApproach: {
      title: "Hard-to-Read Deeply Nested Subquery",
      code: `-- Flawed: nested subquery within a subquery
SELECT * FROM (
  SELECT customer_id, spent FROM (
    SELECT customer_id, SUM(total) as spent FROM orders GROUP BY customer_id
  ) AS t1 WHERE spent > 1000
) AS t2 WHERE customer_id IN (SELECT id FROM customers WHERE is_active = TRUE);`,
      flaw: "Extremely difficult to read, debug, and maintain as business requirements evolve.",
    },
    betterApproach: {
      title: "Clean Modular Common Table Expression (CTE)",
      code: `WITH active_customers AS (
  SELECT id FROM customers WHERE is_active = TRUE
),
customer_spending AS (
  SELECT customer_id, SUM(total) AS spent
  FROM orders
  GROUP BY customer_id
)
SELECT customer_id, spent
FROM customer_spending
WHERE customer_id IN (SELECT id FROM active_customers)
  AND spent > 1000;`,
      benefit: "Each step is isolated, named clearly, and easily verified independently.",
    },
    whyItMatters:
      "Readable SQL reduces maintenance bugs, speeds up code reviews, and simplifies performance troubleshooting.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Test subqueries and CTEs on product and order data:",
    starterCode: `CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL
);

INSERT INTO products (name, price) VALUES
  ('Mechanical Keyboard', 1200.00),
  ('Mouse Pad', 200.00),
  ('4K Monitor', 4500.00),
  ('HDMI Cable', 150.00);

-- Query products priced above the overall catalog average:
WITH catalog_stats AS (
  SELECT AVG(price) AS avg_price
  FROM products
)
SELECT p.name, p.price, round(s.avg_price, 2) AS catalog_avg
FROM products p, catalog_stats s
WHERE p.price > s.avg_price;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which SQL clause is used to define a Common Table Expression (CTE)?",
      options: [
        "HAVING",
        "WITH",
        "CREATE TEMP",
        "EXTRACT",
      ],
      correctIndex: 1,
      explanation:
        "The WITH clause introduces a Common Table Expression (CTE), giving an intermediate query result a temporary name that can be referenced in the main query.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Subquery Inside Query",
        desc: "A subquery is a nested SQL statement executed within an outer query.",
      },
      {
        title: "CTEs for Clean Organization",
        desc: "Use `WITH` to name intermediate calculations and make multi-step SQL readable.",
      },
      {
        title: "Maintainability Win",
        desc: "CTEs make complex analytical queries easier to read and test than deeply nested subqueries.",
      },
    ],
  },
};

