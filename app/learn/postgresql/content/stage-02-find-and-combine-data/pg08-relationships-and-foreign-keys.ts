import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg08RelationshipsAndForeignKeysContent: StandardLessonContent = {
  slug: "pg08-relationships-and-foreign-keys",
  code: "PG-08",
  title: "Relationships and Foreign Keys",
  subtitle: "Connect related tables and guarantee referential integrity using foreign keys and primary keys.",
  difficulty: "Moderate",
  scenario: {
    question: "An app tries to save an order for customer ID 500, but there is no customer with ID 500. What should happen?",
    answer: "The foreign key should reject the order. This prevents an order from pointing to a customer who does not exist.",
  },
  interviewQuestion: {
    question: "What is the difference between a primary key and a foreign key?",
    answer: "A primary key identifies a row in its own table. A foreign key connects a row to a matching row in another table (or, in some designs, the same table).",
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
    title: "Relationships and Foreign Keys",
    bigPicture:
      "A relational database stores related information in separate tables and connects them with keys.\n\nFor example, one customer can place many orders. Each order belongs to one customer. The `orders.customer_id` column can point to `customers.id`.",
    codeSnippet: `CREATE TABLE customers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id),
  total NUMERIC(10, 2) NOT NULL
);`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. customers.id PRIMARY KEY",
        desc: "Uniquely identifies each customer record.",
      },
      {
        title: "2. orders.customer_id",
        desc: "Stores the associated customer's ID for that specific order.",
      },
      {
        title: "3. REFERENCES customers(id)",
        desc: "Creates a foreign key constraint linking orders to customers.",
      },
      {
        title: "4. Referential integrity enforcement",
        desc: "PostgreSQL rejects an order that refers to a customer ID that does not exist in the customers table.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "Foreign keys protect relationships and prevent orphaned records from polluting your database when referenced parents are deleted or invalid IDs are inserted.",
    rule: {
      title: "Referential Integrity Rule",
      content:
        "Every relationship column (like `customer_id` or `product_id`) must have a foreign key constraint pointing to the primary key of the parent table. Never rely solely on application code to enforce relationships.",
    },
    cards: [
      {
        number: "01",
        tag: "INTEGRITY",
        title: "Orphan Prevention",
        description:
          "Foreign keys stop records from pointing to non-existent parent rows, guaranteeing referential consistency across all tables.",
        color: "purple",
      },
      {
        number: "02",
        tag: "CARDINALITY",
        title: "One-to-Many Modeling",
        description:
          "One customer can have many orders. Placing `customer_id` on the `orders` table models this classic 1:N cardinality cleanly.",
        color: "emerald",
      },
      {
        number: "03",
        tag: "PERFORMANCE",
        title: "Index Foreign Keys",
        description:
          "PostgreSQL does not automatically index foreign key columns. Always add an index to foreign key columns for fast joins and cascade deletes.",
        color: "cyan",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Explore how foreign keys protect order processing in an eCommerce store.",
    points: [
      {
        title: "Preventing Phantom Orders",
        content:
          "If a frontend sends an order with an invalid or deleted customer ID, PostgreSQL rejects the `INSERT` immediately with a foreign key violation error.",
      },
      {
        title: "Cascade Options",
        content:
          "PostgreSQL allows configuring `ON DELETE RESTRICT` (prevent deleting a customer who has orders) or `ON DELETE CASCADE` (automatically delete orders when customer is deleted).",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Creating relational columns without a REFERENCES constraint, allowing ghost records that point to non-existent parents.",
    badApproach: {
      title: "Unconstrained Reference Column",
      code: `-- Flawed: plain BIGINT with no foreign key
CREATE TABLE orders (
  id BIGINT PRIMARY KEY,
  customer_id BIGINT, -- No REFERENCES constraint!
  total NUMERIC(10, 2)
);

-- Can insert orders for customer ID 999999 who does not exist!
INSERT INTO orders (id, customer_id, total) VALUES (1, 999999, 500.00);`,
      flaw: "Allows orphaned order records when customers are deleted or mistyped, breaking business reporting and invoicing.",
    },
    betterApproach: {
      title: "Foreign Key with REFERENCES",
      code: `CREATE TABLE orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id),
  total NUMERIC(10, 2) NOT NULL
);`,
      benefit: "The database rejects invalid customer IDs and enforces data integrity at all times.",
    },
    whyItMatters:
      "Referential integrity ensures that every transaction is connected to real entities, avoiding corrupted analytics and broken views.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Create parent and child tables with a foreign key constraint:",
    starterCode: `CREATE TABLE customers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id),
  total NUMERIC(10, 2) NOT NULL
);

INSERT INTO customers (name) VALUES ('Amina');

INSERT INTO orders (customer_id, total) VALUES (1, 450.00);

SELECT orders.id, customers.name, orders.total
FROM orders
JOIN customers ON customers.id = orders.customer_id;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the primary difference between a primary key and a foreign key?",
      options: [
        "Primary keys store text, while foreign keys store numbers",
        "A primary key uniquely identifies a row in its table; a foreign key links to a matching row in another table",
        "Foreign keys can only be used in temporary memory tables",
        "Primary keys are optional, but foreign keys are required on every column",
      ],
      correctIndex: 1,
      explanation:
        "A primary key uniquely identifies rows in its own table, whereas a foreign key references a primary (or unique) key in another table to enforce a relationship.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Relational Links",
        desc: "Relational databases store related information in separate tables connected by keys.",
      },
      {
        title: "Foreign Key Invariants",
        desc: "A foreign key constraint ensures that a child row cannot reference a non-existent parent row.",
      },
      {
        title: "Prevent Orphan Rows",
        desc: "Foreign keys prevent orphaned records and protect data consistency across mutations.",
      },
    ],
  },
};

