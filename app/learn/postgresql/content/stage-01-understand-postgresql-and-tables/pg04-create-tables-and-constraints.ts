import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg04CreateTablesAndConstraintsContent: StandardLessonContent = {
  slug: "pg04-create-tables-and-constraints",
  code: "PG-04",
  title: "Create Tables and Add Constraints",
  subtitle: "Enforce domain integrity at the database boundary using PRIMARY KEY, NOT NULL, UNIQUE, CHECK, and DEFAULT.",
  difficulty: "Moderate",
  scenario: {
    question: "Two products must not have the same SKU. Where should you enforce this rule?",
    answer: "Add a UNIQUE constraint to the sku column. The database then protects the rule even if two application requests arrive at almost the same time.",
  },
  interviewQuestion: {
    question: "What is the purpose of a primary key?",
    answer: "A primary key uniquely identifies each row in a table. It cannot be NULL and its value must be unique.",
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
    title: "Create Tables and Add Constraints",
    bigPicture:
      "A **constraint** is a rule that PostgreSQL checks before accepting data. Constraints help stop invalid records from entering a table.\n\nImportant constraints:\n- **PRIMARY KEY:** uniquely identifies each row and does not allow `NULL`.\n- **NOT NULL:** requires a value.\n- **UNIQUE:** prevents duplicate values in a column or column group.\n- **CHECK:** requires a condition to be true.\n- **DEFAULT:** supplies a value when one is not provided.\n- **FOREIGN KEY:** makes sure a value refers to a row in another table.",
    codeSnippet: `CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  sku TEXT UNIQUE,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  is_available BOOLEAN NOT NULL DEFAULT TRUE
);`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. GENERATED ALWAYS AS IDENTITY",
        desc: "Lets PostgreSQL automatically generate a sequential ID for each row.",
      },
      {
        title: "2. PRIMARY KEY",
        desc: "Makes that ID strictly unique, non-null, and creates an underlying unique index.",
      },
      {
        title: "3. NOT NULL",
        desc: "Requires every product record to provide a valid name and price.",
      },
      {
        title: "4. UNIQUE (sku)",
        desc: "Prevents two products from ever sharing the same stock keeping unit (SKU).",
      },
      {
        title: "5. CHECK (price >= 0)",
        desc: "Rejects inserts or updates where a product price is negative.",
      },
      {
        title: "6. DEFAULT TRUE",
        desc: "Automatically sets `is_available` to true when no explicit value is supplied.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "Application validation can be bypassed by parallel requests or direct database access. Database constraints guarantee invariant data integrity.",
    rule: {
      title: "Database Boundary Constraint Rule",
      content:
        "Enforce fundamental business invariants (uniqueness, non-nullability, valid ranges) directly in table schema DDL. The database engine enforces constraints atomically under high concurrency.",
    },
    cards: [
      {
        number: "01",
        tag: "IDENTITY",
        title: "Modern Identity Keys",
        description:
          "Prefer `GENERATED ALWAYS AS IDENTITY` over legacy `SERIAL`. It adheres to standard SQL and prevents accidental manual ID collisions.",
        color: "purple",
      },
      {
        number: "02",
        tag: "CONCURRENCY",
        title: "Race Condition Safety",
        description:
          "Two concurrent signup requests checking 'SELECT email' will both pass in Node.js. A `UNIQUE` constraint guarantees the database rejects duplicates.",
        color: "emerald",
      },
      {
        number: "03",
        tag: "CHECK",
        title: "Domain Validation",
        description:
          "`CHECK` constraints validate ranges, formatting, and mathematical rules right at write time without trusting client inputs.",
        color: "cyan",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Examine how constraints safeguard an online store from bad data and race conditions.",
    points: [
      {
        title: "Race Conditions in User Registration",
        content:
          "Without a UNIQUE constraint on email or SKU, two server workers processing requests at the same millisecond can create duplicate records.",
      },
      {
        title: "Preventing Negative Prices",
        content:
          "A bug in a coupon discount calculation could compute a negative total. A `CHECK (price >= 0)` constraint immediately aborts the invalid write.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Relying solely on frontend or API validation and creating unconstrained database columns.",
    badApproach: {
      title: "Unconstrained DDL",
      code: `-- Flawed: missing constraints
CREATE TABLE products (
  id INT,
  name TEXT,
  sku TEXT,
  price NUMERIC(10, 2)
);

-- Allows negative price and duplicate SKUs!
INSERT INTO products VALUES (1, NULL, 'KEY-01', -50.00);
INSERT INTO products VALUES (1, 'Duplicate', 'KEY-01', 10.00);`,
      flaw: "Allows null names, negative prices, and duplicate IDs/SKUs, corrupting business data.",
    },
    betterApproach: {
      title: "Production Constrained DDL",
      code: `CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  sku TEXT UNIQUE,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  is_available BOOLEAN NOT NULL DEFAULT TRUE
);`,
      benefit: "The database rejects invalid records at write time, providing guaranteed safety for every connected client.",
    },
    whyItMatters:
      "Constraints protect your data from code bugs, race conditions, and migration glitches forever.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Create the table with constraints and test constraint enforcement:",
    starterCode: `CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  sku TEXT UNIQUE,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  is_available BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO products (name, sku, price)
VALUES ('Studio Headphones', 'HP-100', 3500.00);

SELECT * FROM products;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which constraint ensures that a column value can never be left empty or missing?",
      options: [
        "DEFAULT",
        "NOT NULL",
        "CHECK",
        "FOREIGN KEY",
      ],
      correctIndex: 1,
      explanation:
        "The NOT NULL constraint requires that every inserted or updated row must provide a valid, non-null value for that column.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Primary Key Role",
        desc: "A primary key uniquely identifies each row and does not permit `NULL`.",
      },
      {
        title: "Enforce Invariants in DB",
        desc: "Use `UNIQUE`, `NOT NULL`, and `CHECK` constraints to guard against race conditions.",
      },
      {
        title: "Standard Identity Keys",
        desc: "Use `GENERATED ALWAYS AS IDENTITY` for sequential row identification.",
      },
    ],
  },
};

