import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg10AggregateFunctionsGroupByHavingContent: StandardLessonContent = {
  slug: "pg10-aggregate-functions-group-by-having",
  code: "PG-10",
  title: "Aggregate Functions, GROUP BY, and HAVING",
  subtitle: "Calculate summary metrics with COUNT, SUM, and AVG, group rows by category, and filter aggregate results with HAVING.",
  difficulty: "Difficult",
  scenario: {
    question: "You need to show only products with more than 100 sales. Where should you filter the calculated sale count?",
    answer: "Use HAVING after GROUP BY, because the condition applies to the calculated count for each product group.",
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
    title: "Aggregate Functions, GROUP BY, and HAVING",
    bigPicture:
      "Aggregate functions calculate one result from many rows. Common examples are `COUNT`, `SUM`, `AVG`, `MIN`, and `MAX`.\n\nUse `GROUP BY` to calculate a result for each group. Use `HAVING` to filter the groups after the calculation.",
    codeSnippet: `SELECT customer_id, COUNT(*) AS order_count,
       SUM(total) AS amount_spent
FROM orders
GROUP BY customer_id
HAVING COUNT(*) >= 2;`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. FROM orders",
        desc: "PostgreSQL reads all candidate rows from the orders table.",
      },
      {
        title: "2. GROUP BY customer_id",
        desc: "Buckets rows into distinct groups based on matching `customer_id` values.",
      },
      {
        title: "3. COUNT(*)",
        desc: "Calculates the total number of orders in each customer group.",
      },
      {
        title: "4. SUM(total)",
        desc: "Sums the `total` column across all rows in each group.",
      },
      {
        title: "5. HAVING COUNT(*) >= 2",
        desc: "Filters the calculated groups, keeping only customers who have placed at least two orders.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "Businesses run on aggregated metrics: total revenue, average order value, daily active users. Understanding the difference between WHERE and HAVING is essential.",
    rule: {
      title: "WHERE vs HAVING Rule",
      content:
        "Use `WHERE` to filter individual rows *before* grouping occurs. Use `HAVING` to filter the aggregated group results *after* calculation. Never put aggregate functions inside a `WHERE` clause.",
    },
    cards: [
      {
        number: "01",
        tag: "AGGREGATES",
        title: "Mathematical Summaries",
        description:
          "`COUNT`, `SUM`, `AVG`, `MIN`, and `MAX` compress multiple rows into a single scalar value per group.",
        color: "purple",
      },
      {
        number: "02",
        tag: "GROUP BY",
        title: "Grouping Keys",
        description:
          "Every column in your SELECT list must either appear in the `GROUP BY` clause or be wrapped in an aggregate function.",
        color: "emerald",
      },
      {
        number: "03",
        tag: "HAVING",
        title: "Post-Aggregation Filtering",
        description:
          "Because aggregate results do not exist until rows are grouped, filtering by those calculations requires `HAVING`.",
        color: "amber",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Analyze customer purchase frequency and store revenue distributions.",
    points: [
      {
        title: "VIP Customer Loyalty Analysis",
        content:
          "To reward repeat buyers, query the orders table grouped by customer ID with `HAVING SUM(total) > 5000` to find high-value VIP accounts.",
      },
      {
        title: "Combining WHERE and HAVING",
        content:
          "`WHERE created_at >= '2026-01-01'` filters out old orders first, then `GROUP BY customer_id HAVING count(*) >= 3` finds frequent buyers this year.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Attempting to filter an aggregate calculation inside a WHERE clause, which triggers a syntax error in SQL.",
    badApproach: {
      title: "Aggregate in WHERE Clause",
      code: `-- Syntax Error in PostgreSQL: aggregate functions not allowed in WHERE
SELECT customer_id, count(*)
FROM orders
WHERE count(*) >= 2 -- Invalid!
GROUP BY customer_id;`,
      flaw: "SQL processes WHERE before calculating aggregates. The count does not exist yet when WHERE runs.",
    },
    betterApproach: {
      title: "Correct HAVING Clause",
      code: `-- Production: Valid SQL grouping and post-filter
SELECT customer_id, count(*) AS order_count
FROM orders
GROUP BY customer_id
HAVING count(*) >= 2;`,
      benefit: "Correctly filters the aggregated result set after group calculations are complete.",
    },
    whyItMatters:
      "Understanding query execution order (FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY) prevents common SQL runtime errors.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Group orders by customer and filter using HAVING:",
    starterCode: `CREATE TABLE orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id BIGINT NOT NULL,
  total NUMERIC(10, 2) NOT NULL
);

INSERT INTO orders (customer_id, total) VALUES
  (1, 250.00),
  (1, 400.00),
  (1, 150.00),
  (2, 80.00),
  (3, 900.00),
  (3, 1200.00);

SELECT customer_id, COUNT(*) AS order_count, SUM(total) AS amount_spent
FROM orders
GROUP BY customer_id
HAVING COUNT(*) >= 2;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "When should you use HAVING instead of WHERE in a SQL query?",
      options: [
        "When filtering individual rows before grouping occurs",
        "When filtering conditions based on aggregated calculations like COUNT or SUM",
        "When joining more than three tables in one query",
        "When creating a new database user role",
      ],
      correctIndex: 1,
      explanation:
        "HAVING is evaluated after rows are grouped and aggregated, making it the proper place to filter based on aggregate calculations such as COUNT(*) or SUM(total).",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Summarizing Many Rows",
        desc: "Aggregate functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) compute single metrics from sets of rows.",
      },
      {
        title: "GROUP BY Creates Buckets",
        desc: "Use `GROUP BY` to segment calculations across categories, users, or dates.",
      },
      {
        title: "WHERE vs HAVING",
        desc: "`WHERE` filters input rows before grouping; `HAVING` filters calculated metrics after grouping.",
      },
    ],
  },
};

