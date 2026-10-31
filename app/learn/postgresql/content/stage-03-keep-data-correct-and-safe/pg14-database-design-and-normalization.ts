import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg14DatabaseDesignAndNormalizationContent: StandardLessonContent = {
  slug: "pg14-database-design-and-normalization",
  code: "PG-14",
  title: "Database Design and Normalization",
  subtitle: "Organize schemas to eliminate redundancy, avoid update anomalies, and connect entities with foreign keys.",
  difficulty: "Difficult",
  scenario: {
    question: "A customer's email is copied into 20 order rows. The customer changes their email. What design problem does this create?",
    answer: "The same information is repeated in many places. Some rows could be missed during an update. Store the email once in the customers table and connect orders using a foreign key.",
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
    title: "Database Design and Normalization",
    bigPicture:
      "Database design is deciding how information should be split into tables and how those tables should be connected.\n\n**Problem: repeating customer details in every order:**\n\nA badly designed table might store customer name and email on every order row. If the customer changes their email, many rows may need updating. Some rows could be missed.",
    codeSnippet: `CREATE TABLE customers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE
);

CREATE TABLE orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id),
  total NUMERIC(10, 2) NOT NULL
);`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Dedicated customers table",
        desc: "Stores customer details in one authoritative location.",
      },
      {
        title: "2. Dedicated orders table",
        desc: "Stores order-specific data such as total and timestamp.",
      },
      {
        title: "3. Foreign key reference",
        desc: "Each order stores the customer's ID instead of duplicating customer name and email across every row.",
      },
      {
        title: "4. Single source of truth",
        desc: "Updating a customer's email requires changing only one row in `customers`, automatically updating the customer's profile across all past and future orders.",
      },
      {
        title: "5. On-demand joining",
        desc: "The application uses an efficient SQL `JOIN` whenever it needs both customer and order attributes together.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "Normalization organizes data to reduce unnecessary repetition and prevent update, insert, and delete anomalies.",
    rule: {
      title: "Single Source of Truth Rule",
      content:
        "Every distinct fact should exist in exactly one place in your database. Separate distinct real-world entities into separate tables and connect them using foreign keys.",
    },
    cards: [
      {
        number: "01",
        tag: "ANOMALIES",
        title: "Eliminating Update Anomalies",
        description:
          "If an address is duplicated across 50 orders, updating it in 49 rows leaves the 50th in a desynchronized state. Normalization stores it once.",
        color: "rose",
      },
      {
        number: "02",
        tag: "NORMALIZATION",
        title: "Practical Normalization",
        description:
          "You don't need to memorize academic normal forms on day one; focus on identifying distinct entities and avoiding repeated string blocks.",
        color: "purple",
      },
      {
        number: "03",
        tag: "STORAGE",
        title: "Storage & Cache Efficiency",
        description:
          "Storing integer foreign keys (8 bytes) instead of repeated customer names and emails (50+ bytes per row) saves massive amounts of disk and RAM.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Explore how product catalogs and order history benefit from normalized schema architecture.",
    points: [
      {
        title: "Product Catalog Updates",
        content:
          "When a merchant renames a product, storing `product_id` in order items means the product name only changes in one row in the `products` table.",
      },
      {
        title: "Historical Snapshot Nuance",
        content:
          "For prices charged at the moment of checkout, order items store a copy of the historical price paid (`unit_price`), because catalog prices fluctuate over time.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Creating a single flat table that denormalizes customer names, emails, and phone numbers into every order row.",
    badApproach: {
      title: "Duplicated Denormalized Table",
      code: `-- Flawed: repeating customer details across every order
CREATE TABLE orders (
  id INT,
  customer_name TEXT,
  customer_email TEXT, -- Copied into every single order!
  order_total NUMERIC
);`,
      flaw: "If the customer updates their email, old orders display stale data or require updating thousands of rows.",
    },
    betterApproach: {
      title: "Normalized Relational Architecture",
      code: `CREATE TABLE customers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE
);

CREATE TABLE orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id),
  total NUMERIC(10, 2) NOT NULL
);`,
      benefit: "Customer data is updated in one row; orders link to it via customer_id.",
    },
    whyItMatters:
      "Proper database design prevents data inconsistency, simplifies schema migrations, and saves database storage.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Create normalized customers and orders tables and join them:",
    starterCode: `CREATE TABLE customers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE
);

CREATE TABLE orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id),
  total NUMERIC(10, 2) NOT NULL
);

INSERT INTO customers (name, email)
VALUES ('Amina', 'amina@example.com');

INSERT INTO orders (customer_id, total)
VALUES (1, 350.00), (1, 890.00);

-- Updating email in one place updates it for all queries:
UPDATE customers SET email = 'amina.new@example.com' WHERE id = 1;

SELECT o.id, c.name, c.email, o.total
FROM orders o
JOIN customers c ON c.id = o.customer_id;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the primary motivation for normalizing a database into separate related tables?",
      options: [
        "To make sure every query runs without an index",
        "To reduce data duplication and prevent update anomalies",
        "To avoid needing primary keys on tables",
        "To eliminate the need for SQL JOIN operations",
      ],
      correctIndex: 1,
      explanation:
        "Normalization splits data into distinct entity tables to eliminate redundant copies of information and avoid update anomalies.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Separate Entities",
        desc: "Store distinct entities (customers, products, orders) in dedicated tables.",
      },
      {
        title: "Connect with Foreign Keys",
        desc: "Use foreign keys to link tables rather than copying repetitive text.",
      },
      {
        title: "Prevent Update Anomalies",
        desc: "Single-source-of-truth tables ensure that updates happen in one place.",
      },
    ],
  },
};
