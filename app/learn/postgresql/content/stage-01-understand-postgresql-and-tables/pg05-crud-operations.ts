import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg05CrudOperationsContent: StandardLessonContent = {
  slug: "pg05-crud-operations",
  code: "PG-05",
  title: "Insert, Read, Update, and Delete Data (CRUD)",
  subtitle: "Master the four foundational database operations and the vital role of the WHERE clause in UPDATE and DELETE.",
  difficulty: "Moderate",
  scenario: {
    question: "A developer runs UPDATE products SET price = 500; but meant to change only one product. What went wrong?",
    answer: "The query has no WHERE condition, so PostgreSQL updates every row in products. The developer should add a condition that identifies the intended product.",
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
    title: "Insert, Read, Update, and Delete Data (CRUD)",
    bigPicture:
      "CRUD means **Create, Read, Update, and Delete**. These are the four basic actions used to work with stored records.",
    codeSnippet: `-- Create — add a product
INSERT INTO products (name, sku, price)
VALUES ('Keyboard', 'KEY-001', 1200.00);

-- Read — find products
SELECT id, name, price
FROM products;

-- Update — change a price
UPDATE products
SET price = 1350.00
WHERE sku = 'KEY-001';

-- Delete — remove a product
DELETE FROM products
WHERE sku = 'KEY-001';`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. INSERT INTO",
        desc: "Adds a new row to the table with specified column values.",
      },
      {
        title: "2. SELECT",
        desc: "Reads and projects rows from the table without mutating stored state.",
      },
      {
        title: "3. UPDATE ... SET",
        desc: "Modifies values in existing rows that match the filter condition.",
      },
      {
        title: "4. DELETE FROM",
        desc: "Removes matching rows from the table entirely.",
      },
      {
        title: "5. WHERE condition",
        desc: "The WHERE condition determines exactly which rows are targeted. Without it, UPDATE and DELETE modify every row in the table!",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "Every web application continuously reads, modifies, and purges database records. Mastering CRUD syntax and safety guards prevents catastrophic data loss.",
    rule: {
      title: "WHERE Condition Safety Rule",
      content:
        "Always double-check the `WHERE` condition before executing an `UPDATE` or `DELETE` statement. In SQL, omitting `WHERE` applies the operation to the entire table without warning.",
    },
    cards: [
      {
        number: "01",
        tag: "CREATE",
        title: "Explicit Column Lists",
        description:
          "Always list column names in `INSERT INTO table (col1, col2)`. Avoid raw `INSERT INTO table VALUES (...)` which breaks when schema columns change order.",
        color: "emerald",
      },
      {
        number: "02",
        tag: "READ",
        title: "Projected Columns",
        description:
          "Select explicit columns like `SELECT id, name, price` rather than `SELECT *` to conserve network bandwidth and memory.",
        color: "purple",
      },
      {
        number: "03",
        tag: "MUTATION",
        title: "Targeted Updates",
        description:
          "Target updates and deletions by unique identifier (`WHERE id = ...` or `WHERE sku = ...`) to prevent collateral row modifications.",
        color: "rose",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Review how an online store manages its product catalog across standard CRUD workflows.",
    points: [
      {
        title: "Safety in Migration Scripts",
        content:
          "When updating prices or clearing old cart sessions in production, always wrap mutations in a transaction and test with a SELECT using the exact same WHERE condition first.",
      },
      {
        title: "Testing WHERE First with SELECT",
        content:
          "Before running `DELETE FROM products WHERE ...`, run `SELECT count(*) FROM products WHERE ...` to verify exactly how many rows will be affected.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Executing an UPDATE or DELETE statement without a WHERE clause in production.",
    badApproach: {
      title: "Dangerous Unfiltered UPDATE",
      code: `-- Catastrophic: missing WHERE clause updates EVERY product
UPDATE products
SET price = 500.00;`,
      flaw: "Overwrites the price of every item in the entire store to 500.00, causing massive pricing errors.",
    },
    betterApproach: {
      title: "Filtered UPDATE Targeted by Key",
      code: `-- Safe: uniquely targets the exact product
UPDATE products
SET price = 500.00
WHERE sku = 'KEY-001';`,
      benefit: "Safely restricts the mutation to only the intended matching record.",
    },
    whyItMatters:
      "Omitting WHERE from an UPDATE or DELETE affects the entire table. Always verify your filter clause.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Practice inserting, updating, and querying products:",
    starterCode: `CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  sku TEXT UNIQUE,
  price NUMERIC(10, 2) NOT NULL
);

INSERT INTO products (name, sku, price)
VALUES ('Mechanical Keyboard', 'KEY-001', 1200.00);

UPDATE products
SET price = 1350.00
WHERE sku = 'KEY-001';

SELECT id, name, sku, price
FROM products;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens if you execute DELETE FROM products; without a WHERE clause?",
      options: [
        "PostgreSQL raises a syntax error and cancels the query",
        "It deletes only the first row inserted into the table",
        "It deletes every single row in the products table",
        "It drops the table definition from the schema",
      ],
      correctIndex: 2,
      explanation:
        "Without a WHERE clause, SQL applies the DELETE statement unconditionally to all rows in the table.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Four Core Actions",
        desc: "`INSERT` creates, `SELECT` reads, `UPDATE` modifies, and `DELETE` removes.",
      },
      {
        title: "Always Check WHERE",
        desc: "Never run `UPDATE` or `DELETE` without verifying your `WHERE` condition.",
      },
      {
        title: "Target by Unique Key",
        desc: "Use primary keys or unique columns (like `id` or `sku`) in `WHERE` clauses to safely modify single records.",
      },
    ],
  },
};

