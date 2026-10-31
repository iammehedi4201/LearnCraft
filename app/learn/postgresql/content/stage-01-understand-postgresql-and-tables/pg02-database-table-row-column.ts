import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg02DatabaseTableRowColumnContent: StandardLessonContent = {
  slug: "pg02-database-table-row-column",
  code: "PG-02",
  title: "Database, Table, Row, and Column",
  subtitle: "Understand the core hierarchy of relational data: databases hold tables, tables hold rows, and columns define fields.",
  difficulty: "Easy",
  scenario: {
    question: "You need to store many customers. Should you create one table for every customer or one customers table with many rows?",
    answer: "Use one customers table and add one row for each customer. Tables are designed to hold many records of the same kind.",
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
    title: "Database, Table, Row, and Column",
    bigPicture:
      "A **database** holds related tables. A **table** stores one kind of information. A **row** is one record. A **column** describes one part of that record.\n\nFor example, a `customers` table stores customer records. Each row is one customer. The columns describe the customer's ID, name, and email.",
    codeSnippet: `SELECT name, email
FROM customers;`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. SELECT name, email",
        desc: "Specifies the exact columns to project in the result set.",
      },
      {
        title: "2. FROM customers",
        desc: "Specifies the target table to read rows from.",
      },
      {
        title: "3. Row projection",
        desc: "PostgreSQL returns those columns for each matching row in the table.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "Understanding relational hierarchy prevents chaotic schema designs where data is scattered across duplicate tables.",
    rule: {
      title: "Table Entity Rule",
      content:
        "A table represents an entity type (e.g. customers, products). Add rows to represent individual instances of that entity; never create a new table for each entity instance.",
    },
    cards: [
      {
        number: "01",
        tag: "HIERARCHY",
        title: "Database Container",
        description:
          "The logical database groups all tables, schemas, and relations that belong to a single application domain.",
        color: "purple",
      },
      {
        number: "02",
        tag: "ENTITY",
        title: "Table Structure",
        description:
          "A table acts as a structured collection of records sharing identical column definitions, constraints, and data types.",
        color: "emerald",
      },
      {
        number: "03",
        tag: "RECORD",
        title: "Rows & Columns",
        description:
          "Each horizontal row represents one unique entity record. Each vertical column represents an attribute field.",
        color: "cyan",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Here is how customer records are mapped to rows and columns in the store database.",
    points: [
      {
        title: "Tabular Mental Model",
        content:
          "Think of a database as a cabinet, a table as a folder of standardized forms, a row as a filled-out form, and columns as the labeled question boxes.",
      },
      {
        title: "Efficient Querying",
        content:
          "Because all rows in a table share the same schema, PostgreSQL can index columns and scan millions of records in milliseconds.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Creating separate tables for individual customers or categories instead of adding rows to a single table.",
    badApproach: {
      title: "Anti-Pattern: Dynamic Tables per Customer",
      code: `-- Flawed: creating a separate table per customer
CREATE TABLE customer_amina ( id INT, order_total NUMERIC );
CREATE TABLE customer_rahim ( id INT, order_total NUMERIC );`,
      flaw: "Requires dynamic SQL DDL generation, breaks standard relationships, and prevents cross-customer querying and aggregation.",
    },
    betterApproach: {
      title: "Production Solution: One Table with Multiple Rows",
      code: `CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE
);

-- Add one row per customer:
INSERT INTO customers (id, name, email)
VALUES
  (1, 'Amina', 'amina@example.com'),
  (2, 'Rahim', 'rahim@example.com');`,
      benefit: "Tables are designed to hold millions of rows with uniform schemas, indexed lookups, and clean constraints.",
    },
    whyItMatters:
      "Consistent table design allows indexes, queries, foreign keys, and backups to operate cleanly and predictably.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Create the customers table, insert two rows, and query selected columns:",
    starterCode: `CREATE TABLE customers (
  id INTEGER,
  name TEXT,
  email TEXT
);

INSERT INTO customers (id, name, email)
VALUES
  (1, 'Amina', 'amina@example.com'),
  (2, 'Rahim', 'rahim@example.com');

SELECT name, email
FROM customers;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "In relational database terminology, what does an individual row represent?",
      options: [
        "A database backup snapshot on disk",
        "A single record or entity instance in a table",
        "A column data type constraint rule",
        "A network connection from the client driver",
      ],
      correctIndex: 1,
      explanation:
        "A row represents one specific record or instance of an entity (such as one customer), while columns represent the attributes of that entity.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Relational Structure",
        desc: "Databases hold tables; tables store rows; rows contain values for each defined column.",
      },
      {
        title: "Uniform Entities",
        desc: "Always store multiple records of the same type as rows in one table, rather than creating separate tables.",
      },
      {
        title: "Column Projection",
        desc: "Use `SELECT column1, column2` to query only the specific attributes your application needs.",
      },
    ],
  },
};

