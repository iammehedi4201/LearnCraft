import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg17ViewsContent: StandardLessonContent = {
  slug: "pg17-views",
  code: "PG-17",
  title: "Views",
  subtitle: "Encapsulate reusable, complex queries as virtual tables that simplify reports and secure sensitive columns.",
  difficulty: "Moderate",
  scenario: {
    question: "Several reports need the same customer order summary. How can a view help?",
    answer: "Create a view containing the shared summary query. Each report can read from the view instead of repeating the same SQL.",
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
    title: "Views",
    bigPicture:
      "A view is a saved SQL query that you can read like a table. A normal view stores the query, not a separate copy of its result.",
    codeSnippet: `CREATE VIEW order_summaries AS
SELECT customer_id, COUNT(*) AS order_count,
       SUM(total) AS total_spent
FROM orders
GROUP BY customer_id;

-- Read directly from the view:
SELECT *
FROM order_summaries
WHERE total_spent > 5000;`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. CREATE VIEW order_summaries",
        desc: "Saves the query specification into the database catalog under a virtual table name.",
      },
      {
        title: "2. Aggregation query definition",
        desc: "The underlying query aggregates orders by customer and computes order counts and spending totals.",
      },
      {
        title: "3. Clean client consumption",
        desc: "Applications and BI reports query `order_summaries` directly using standard SELECT, WHERE, and ORDER BY syntax.",
      },
      {
        title: "4. Dynamic evaluation",
        desc: "A standard view executes against underlying tables on demand; it does not store a stale duplicate copy of the data on disk.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "Views eliminate duplicated SQL snippets across different backend services and can act as a security layer to hide sensitive fields like password hashes or credit card tokens.",
    rule: {
      title: "View Encapsulation Rule",
      content:
        "Use standard views to simplify complex joins and aggregations into clean virtual tables. Understand that standard views compute results dynamically on each query without consuming separate table storage.",
    },
    cards: [
      {
        number: "01",
        tag: "REUSABILITY",
        title: "DRY Query Logic",
        description:
          "Define intricate 4-table joins once in a view. All microservices and reporting dashboards query the view consistently.",
        color: "purple",
      },
      {
        number: "02",
        tag: "SECURITY",
        title: "Column Security Masking",
        description:
          "Create views that omit sensitive columns (e.g. `user_public_profiles` excludes `password_hash` and `ssn`) and grant permissions only to the view.",
        color: "emerald",
      },
      {
        number: "03",
        tag: "STORAGE",
        title: "Zero Duplicate Storage",
        description:
          "Standard views do not duplicate row data on disk. When data in the underlying table changes, the view immediately reflects the update.",
        color: "cyan",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Explore how finance and reporting teams utilize views for store analytics.",
    points: [
      {
        title: "Shared Business Definitions",
        content:
          "If the definition of an 'active paying customer' involves filtering orders and excluding refunds, putting that logic in a view ensures marketing and finance report matching numbers.",
      },
      {
        title: "Materialized Views (Future Study)",
        content:
          "For massive multi-million-row aggregations that run infrequently, PostgreSQL also offers `MATERIALIZED VIEW` which caches the computed result on disk and can be refreshed periodically.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Copying and pasting a 50-line analytical join query into 12 different API routes and reporting scripts.",
    badApproach: {
      title: "Duplicated Analytical SQL",
      code: `// Route 1, Route 2, and Route 3 all repeat the exact same raw SQL:
SELECT c.id, c.name, count(o.id), sum(o.total)
FROM customers c JOIN orders o ON o.customer_id = c.id
GROUP BY c.id, c.name;`,
      flaw: "When business logic changes (e.g. excluding cancelled orders), developers must update all 12 routes; missing one causes data discrepancies.",
    },
    betterApproach: {
      title: "Encapsulated Database View",
      code: `CREATE VIEW customer_sales_overview AS
SELECT c.id, c.name, count(o.id) AS order_count, sum(o.total) AS total_revenue
FROM customers c JOIN orders o ON o.customer_id = c.id
WHERE o.status != 'cancelled'
GROUP BY c.id, c.name;

-- All API routes now query:
SELECT * FROM customer_sales_overview WHERE total_revenue > 1000;`,
      benefit: "Centralizes logic in one place. Updating the view updates all consumers instantly.",
    },
    whyItMatters:
      "Views provide maintainable abstraction boundaries, keeping application code clean and business logic centralized.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Create a view summarizing orders and query it with filters:",
    starterCode: `CREATE TABLE orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id BIGINT NOT NULL,
  total NUMERIC(10, 2) NOT NULL
);

INSERT INTO orders (customer_id, total) VALUES
  (1, 1500.00), (1, 4000.00),
  (2, 600.00),
  (3, 8000.00);

CREATE VIEW order_summaries AS
SELECT customer_id, COUNT(*) AS order_count, SUM(total) AS total_spent
FROM orders
GROUP BY customer_id;

SELECT *
FROM order_summaries
WHERE total_spent > 5000;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Does a standard PostgreSQL view duplicate table data on disk?",
      options: [
        "Yes, it creates a full physical copy of every underlying table",
        "No, it stores only the query definition and runs against underlying tables dynamically",
        "Yes, but only for tables with fewer than 1000 rows",
        "It stores data in browser cache only",
      ],
      correctIndex: 1,
      explanation:
        "A standard view is a saved query definition that reads from its underlying tables dynamically when accessed; it does not store a duplicate copy of the result data on disk.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Virtual Tables",
        desc: "A view is a saved SQL query that can be queried just like a regular table.",
      },
      {
        title: "Dynamic Evaluation",
        desc: "Standard views read live data from base tables without duplicating data on disk.",
      },
      {
        title: "Centralized Logic",
        desc: "Views centralize complex joins and calculations so all application consumers share consistent definitions.",
      },
    ],
  },
};

