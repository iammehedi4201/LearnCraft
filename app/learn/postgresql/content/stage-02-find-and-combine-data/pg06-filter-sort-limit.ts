import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg06FilterSortLimitContent: StandardLessonContent = {
  slug: "pg06-filter-sort-limit",
  code: "PG-06",
  title: "Filter, Sort, and Limit Results",
  subtitle: "Control query result sets with WHERE conditions, ORDER BY sorting, LIMIT clauses, and PostgreSQL's ILIKE operator.",
  difficulty: "Moderate",
  scenario: {
    question: "An admin wants to see the 10 newest orders. Which SQL parts are useful?",
    answer: "Use ORDER BY created_at DESC to put the newest orders first, then LIMIT 10 to show only 10 rows.",
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
    title: "Filter, Sort, and Limit Results",
    bigPicture:
      "Use `WHERE` to choose rows, `ORDER BY` to sort them, and `LIMIT` to control how many rows are returned.",
    codeSnippet: `SELECT name, price
FROM products
WHERE price >= 1000
ORDER BY price DESC
LIMIT 5;

-- Case-insensitive pattern match with PostgreSQL ILIKE:
SELECT *
FROM products
WHERE name ILIKE '%phone%';`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. FROM products",
        desc: "Chooses the table to query.",
      },
      {
        title: "2. WHERE price >= 1000",
        desc: "Filters and keeps only products that cost at least 1000.",
      },
      {
        title: "3. ORDER BY price DESC",
        desc: "Sorts the rows so the most expensive products appear first.",
      },
      {
        title: "4. LIMIT 5",
        desc: "Restricts the output to return no more than five rows.",
      },
      {
        title: "5. ILIKE '%phone%'",
        desc: "Matches text case-insensitively, a convenient PostgreSQL-specific operator.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "Database tables often contain millions of records. Filtering and limiting at the database layer prevents transferring gigabytes of unnecessary data across the network.",
    rule: {
      title: "Query Filtration & Sorting Rule",
      content:
        "Filter and sort data in SQL using `WHERE`, `ORDER BY`, and `LIMIT`, not in JavaScript after loading everything into memory. Remember that without `ORDER BY`, table row order is completely arbitrary.",
    },
    cards: [
      {
        number: "01",
        tag: "FILTERING",
        title: "WHERE Conditions",
        description:
          "Combine boolean criteria with `AND`, `OR`, `IN (...)`, `BETWEEN`, and `IS NULL` to filter rows before sorting and projection.",
        color: "purple",
      },
      {
        number: "02",
        tag: "ORDER",
        title: "Explicit Ordering",
        description:
          "SQL tables are unordered mathematical sets. You must specify `ORDER BY column ASC/DESC` if your UI depends on a consistent sequence.",
        color: "emerald",
      },
      {
        number: "03",
        tag: "SEARCH",
        title: "ILIKE for Text",
        description:
          "Use PostgreSQL's `ILIKE` for case-insensitive wildcard searches (e.g. `ILIKE '%laptop%'` matches 'Laptop', 'LAPTOP', and 'laptop').",
        color: "cyan",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "See how an e-commerce dashboard displays the top 5 most expensive products and searches inventory by keyword.",
    points: [
      {
        title: "Admin Dashboard Queries",
        content:
          "Displaying recent orders or top-selling products requires combining `WHERE` (e.g. status = 'completed'), `ORDER BY` (created_at DESC), and `LIMIT` (e.g. 10).",
      },
      {
        title: "Case-Insensitive Store Search",
        content:
          "Shoppers search with random casing ('IPHONE', 'iphone', 'IPhone'). `ILIKE` matches all variations without needing `LOWER(name) LIKE LOWER('%...%')`.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Using LIMIT without ORDER BY, resulting in unpredictable, random rows returned between different query runs.",
    badApproach: {
      title: "Unordered LIMIT",
      code: `-- Flawed: without ORDER BY, PostgreSQL returns an arbitrary 5 rows
SELECT name, price
FROM products
WHERE price >= 1000
LIMIT 5;`,
      flaw: "Because relational tables have no inherent order, the 5 rows returned can change unpredictably across queries.",
    },
    betterApproach: {
      title: "Deterministic ORDER BY with LIMIT",
      code: `-- Production: deterministic ordering
SELECT name, price
FROM products
WHERE price >= 1000
ORDER BY price DESC, id ASC
LIMIT 5;`,
      benefit: "Guarantees a stable, consistent top-5 result set every time the query executes.",
    },
    whyItMatters:
      "Deterministic sorting is essential for user-facing lists, pagination, and reporting dashboards.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Test filtering by price and searching with ILIKE:",
    starterCode: `CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL
);

INSERT INTO products (name, price) VALUES
  ('Smartphone Pro', 1200.00),
  ('Budget Phone', 450.00),
  ('Laptop 15-inch', 1800.00),
  ('Wireless Mouse', 40.00),
  ('Gaming Headset', 1100.00);

SELECT name, price
FROM products
WHERE price >= 1000
ORDER BY price DESC
LIMIT 5;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which PostgreSQL operator matches text patterns without caring about uppercase or lowercase letters?",
      options: [
        "EQUALS",
        "ILIKE",
        "MATCHES",
        "CONTAINS",
      ],
      correctIndex: 1,
      explanation:
        "ILIKE is a PostgreSQL-specific operator that performs case-insensitive pattern matching, while standard LIKE is case-sensitive.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "WHERE Filters Rows",
        desc: "Use `WHERE` to narrow rows using comparisons, `IN`, `BETWEEN`, and boolean operators.",
      },
      {
        title: "ORDER BY Controls Sequence",
        desc: "Always specify `ORDER BY` when using `LIMIT` to ensure predictable, deterministic output.",
      },
      {
        title: "ILIKE for Easy Search",
        desc: "PostgreSQL's `ILIKE` matches text without case sensitivity.",
      },
    ],
  },
};

