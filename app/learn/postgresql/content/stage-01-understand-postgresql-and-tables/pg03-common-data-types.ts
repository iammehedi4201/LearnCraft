import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg03CommonDataTypesContent: StandardLessonContent = {
  slug: "pg03-common-data-types",
  code: "PG-03",
  title: "Common PostgreSQL Data Types",
  subtitle: "Choose the right column types for integers, text, exact financial decimals, timestamps, and boolean flags.",
  difficulty: "Easy",
  scenario: {
    question: "A product costs 1299.50. Which type is a good choice for its price?",
    answer: "NUMERIC(10, 2) is a good choice because it stores decimal values exactly to the chosen scale. This matters when working with money.",
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
    title: "Common PostgreSQL Data Types",
    bigPicture:
      "A data type tells PostgreSQL what kind of value a column can store. Choose a type that matches the information.\n\n- **INTEGER:** Whole numbers\n- **BIGINT:** Larger whole numbers\n- **TEXT:** Text\n- **BOOLEAN:** `TRUE` or `FALSE`\n- **NUMERIC(10, 2):** Exact decimal values, such as prices\n- **DATE:** A calendar date\n- **TIMESTAMPTZ:** A date and time with time-zone handling\n- **UUID:** A UUID value\n- **JSONB:** JSON data stored in a form PostgreSQL can query efficiently",
    codeSnippet: `CREATE TABLE products (
  id BIGINT,
  name TEXT,
  price NUMERIC(10, 2),
  is_available BOOLEAN,
  created_at TIMESTAMPTZ
);`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. id BIGINT",
        desc: "Stores an 8-byte signed whole-number ID, scaling beyond 2 billion records.",
      },
      {
        title: "2. name TEXT",
        desc: "Stores arbitrary-length strings without arbitrary character padding.",
      },
      {
        title: "3. price NUMERIC(10, 2)",
        desc: "Stores an exact decimal amount. This is a much better choice for money than floating-point types.",
      },
      {
        title: "4. is_available BOOLEAN",
        desc: "Stores whether the product is currently active (`TRUE` or `FALSE`).",
      },
      {
        title: "5. created_at TIMESTAMPTZ",
        desc: "Stores an unambiguous UTC-normalized timestamp with time-zone awareness.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "Choosing the wrong data type causes floating-point rounding errors in financial transactions, truncated IDs, or time-zone confusion.",
    rule: {
      title: "Data Type Precision Rule",
      content:
        "Always use `NUMERIC` for monetary values, `TIMESTAMPTZ` for system timestamps, `BIGINT` for auto-incrementing primary keys, and `TEXT` for general string content in PostgreSQL.",
    },
    cards: [
      {
        number: "01",
        tag: "MONEY",
        title: "Exact Numeric Arithmetic",
        description:
          "Never use FLOAT or REAL for money. `NUMERIC(10, 2)` guarantees exact base-10 precision without IEEE-754 binary rounding discrepancies.",
        color: "amber",
      },
      {
        number: "02",
        tag: "TIMESTAMPS",
        title: "TIMESTAMPTZ vs TIMESTAMP",
        description:
          "`TIMESTAMPTZ` converts inputs to UTC for storage and converts back to client local time when queried, preventing daylight-saving bugs.",
        color: "purple",
      },
      {
        number: "03",
        tag: "STRINGS",
        title: "TEXT vs VARCHAR",
        description:
          "In PostgreSQL, `TEXT` and `VARCHAR` have identical performance under the hood. Prefer `TEXT` unless a specific length constraint is required.",
        color: "cyan",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Review how typical eCommerce store columns map to their ideal PostgreSQL data types.",
    points: [
      {
        title: "Why NUMERIC Prevents Financial Bugs",
        content:
          "In JavaScript or C, `0.1 + 0.2 === 0.30000000000000004`. PostgreSQL's `NUMERIC` type computes decimals exactly as humans do on paper, ensuring invoices match to the cent.",
      },
      {
        title: "BIGINT for Growth",
        content:
          "A regular `INTEGER` tops out at 2,147,483,647. High-throughput logs, telemetry, or order rows will overflow. `BIGINT` safely supports up to 9 quintillion values.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Using REAL or FLOAT for financial product prices, causing penny drift during tax and discount calculations.",
    badApproach: {
      title: "Flawed: Inexact Floating-Point Type",
      code: `-- Flawed: FLOAT allows binary approximation rounding errors
CREATE TABLE products (
  id INT,
  name TEXT,
  price REAL -- Inexact floating-point!
);`,
      flaw: "Summing 100,000 prices will drift by fractions of cents due to IEEE-754 binary floating-point representation.",
    },
    betterApproach: {
      title: "Production Solution: Exact NUMERIC Column",
      code: `CREATE TABLE products (
  id BIGINT,
  name TEXT,
  price NUMERIC(10, 2), -- Exact decimal representation
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);`,
      benefit: "Guarantees 100% exact precision for arithmetic, reporting, invoicing, and tax accounting.",
    },
    whyItMatters:
      "Financial data must be exact. Using NUMERIC guarantees that every cent is accounted for in order totals and accounting ledgers.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Create a typed products table and insert records with exact numeric and timestamp values:",
    starterCode: `CREATE TABLE products (
  id BIGINT,
  name TEXT,
  price NUMERIC(10, 2),
  is_available BOOLEAN,
  created_at TIMESTAMPTZ
);

INSERT INTO products (id, name, price, is_available, created_at)
VALUES (
  101,
  'Ergonomic Mouse',
  1299.50,
  TRUE,
  CURRENT_TIMESTAMP
);

SELECT id, name, price, is_available, created_at
FROM products;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which PostgreSQL data type is recommended for storing product prices and monetary amounts?",
      options: [
        "FLOAT4 / REAL",
        "NUMERIC(10, 2)",
        "VARCHAR(10)",
        "BOOLEAN",
      ],
      correctIndex: 1,
      explanation:
        "NUMERIC (or DECIMAL) stores exact numeric values to a designated scale (e.g. 2 decimal places), avoiding binary floating-point rounding errors.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Exact Decimals for Money",
        desc: "Always use `NUMERIC(precision, scale)` for prices and money, never `FLOAT`.",
      },
      {
        title: "Time-Zone Aware Timestamps",
        desc: "Use `TIMESTAMPTZ` to store timestamps normalized to UTC.",
      },
      {
        title: "Big Integers for IDs",
        desc: "Prefer `BIGINT` for identity keys to avoid 32-bit integer overflow as tables grow.",
      },
    ],
  },
};

