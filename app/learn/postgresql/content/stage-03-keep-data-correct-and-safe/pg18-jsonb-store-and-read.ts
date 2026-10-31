import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg18JsonbStoreAndReadContent: StandardLessonContent = {
  slug: "pg18-jsonb-store-and-read",
  code: "PG-18",
  title: "JSONB — Store and Read JSON Data",
  subtitle: "Store flexible, semi-structured document payloads alongside relational columns and query attributes using the ->> operator.",
  difficulty: "Moderate",
  scenario: {
    question: "Products have optional details that differ by category, such as screen size for laptops and material for chairs. How could JSONB help?",
    answer: "A JSONB column can store category-specific details that do not fit the same fixed set of columns. Keep common fields like name and price as normal columns.",
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
    title: "JSONB — Store and Read JSON Data",
    bigPicture:
      "PostgreSQL is a relational database, but it can also store JSON data. `JSONB` stores JSON in a form that PostgreSQL can query and index.\n\nUse normal columns for important, predictable fields. Use `JSONB` when some data has a flexible shape and you still need to store it in PostgreSQL.",
    codeSnippet: `CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  details JSONB
);

INSERT INTO products (name, details)
VALUES (
  'Laptop',
  '{"color": "black", "ram": 16}'::jsonb
);

SELECT name, details ->> 'color' AS color
FROM products;`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. details JSONB",
        desc: "Defines a column using PostgreSQL's binary JSON format, which parses and validates JSON on insert.",
      },
      {
        title: "2. Casting with ::jsonb",
        desc: "Casts raw JSON strings into binary JSONB objects.",
      },
      {
        title: "3. The ->> operator",
        desc: "Extracts a JSON object property as standard SQL `TEXT` (while `->` extracts the property as a nested JSON object).",
      },
      {
        title: "4. Hybrid relational modeling",
        desc: "Returns relational columns (`name`) and document attributes (`color`) together seamlessly in standard SQL result rows.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "Modern applications frequently ingest dynamic webhooks, device telemetry, or category-specific specifications that do not fit a single rigid table schema.",
    rule: {
      title: "Hybrid Relational-Document Rule",
      content:
        "Keep predictable, relational attributes (IDs, foreign keys, prices, statuses) as strongly-typed relational columns. Use `JSONB` only for polymorphic or dynamic attributes that vary widely across records.",
    },
    cards: [
      {
        number: "01",
        tag: "JSONB",
        title: "JSON vs JSONB",
        description:
          "Always use `JSONB` instead of plain `JSON`. `JSONB` stores decomposed binary data, eliminating re-parsing on every query and supporting GIN indexing.",
        color: "purple",
      },
      {
        number: "02",
        tag: "OPERATORS",
        title: "Arrow Operators (-> vs ->>)",
        description:
          "`->` extracts a JSON element (useful for chaining nested objects), while `->>` extracts the value as plain text for filtering and display.",
        color: "emerald",
      },
      {
        number: "03",
        tag: "INDEXING",
        title: "GIN Index Support",
        description:
          "PostgreSQL allows creating GIN indexes on JSONB columns (`CREATE INDEX ON products USING GIN (details);`) for ultra-fast document search.",
        color: "cyan",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Explore how diverse product catalogs store technical specifications without creating 50 empty columns.",
    points: [
      {
        title: "E-Commerce Category Attributes",
        content:
          "Laptops have `ram` and `screen_size`; shoes have `shoe_size` and `color`; books have `isbn` and `page_count`. Storing these in a `metadata JSONB` column avoids schema bloat.",
      },
      {
        title: "Filtering by JSON Properties",
        content:
          "`WHERE details ->> 'color' = 'black'` lets you filter products by nested document attributes using standard SQL clauses.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Dumping the entire application schema into a single JSONB column, losing all relational types, constraints, and foreign key guarantees.",
    badApproach: {
      title: "Anti-Pattern: Complete Denormalization into JSONB",
      code: `-- Flawed: No schema, no constraints, no foreign keys
CREATE TABLE products (
  id INT,
  data JSONB -- Name, price, customer_id all stuffed in JSON!
);`,
      flaw: "Loses NOT NULL, CHECK, UNIQUE, and FOREIGN KEY protection; arithmetic becomes slow and error-prone.",
    },
    betterApproach: {
      title: "Production Hybrid Model",
      code: `CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  details JSONB -- Reserved exclusively for variable category specs
);`,
      benefit: "Enforces strict financial and relational invariants while offering flexible document storage for variable fields.",
    },
    whyItMatters:
      "Balancing relational rigor with JSONB flexibility gives you the best of both worlds without sacrificing data integrity.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Insert and query semi-structured JSONB records:",
    starterCode: `CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  details JSONB
);

INSERT INTO products (name, details) VALUES
  ('Laptop Pro', '{"color": "space gray", "ram": 32, "screen": "16 inch"}'::jsonb),
  ('Desk Chair', '{"color": "black", "material": "mesh"}'::jsonb);

SELECT name, details ->> 'color' AS color, details ->> 'ram' AS ram
FROM products;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which PostgreSQL operator extracts a JSONB field value as plain SQL text?",
      options: [
        "->",
        "->>",
        "#>",
        "=>",
      ],
      correctIndex: 1,
      explanation:
        "The ->> operator extracts a JSON field as SQL TEXT, whereas -> extracts the field as a JSON/JSONB object.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Relational + Document",
        desc: "PostgreSQL combines relational tables with powerful semi-structured `JSONB` storage.",
      },
      {
        title: "Use ->> for Text",
        desc: "Use `->>` to extract nested values as text for display or filtering.",
      },
      {
        title: "Keep Core Fields Relational",
        desc: "Always keep IDs, foreign keys, and prices as strongly typed relational columns.",
      },
    ],
  },
};

