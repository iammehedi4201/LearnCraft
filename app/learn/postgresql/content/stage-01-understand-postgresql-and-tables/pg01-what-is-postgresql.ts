import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg01WhatIsPostgresqlContent: StandardLessonContent = {
  slug: "pg01-what-is-postgresql",
  code: "PG-01",
  title: "What Is PostgreSQL?",
  subtitle: "PostgreSQL is a powerful relational database system that stores data in structured tables queryable with SQL.",
  difficulty: "Easy",
  scenario: {
    question: "An online store needs to remember products even after the server restarts. What should it use?",
    answer: "It should save the products in a database such as PostgreSQL. The data stays stored instead of existing only in the server's memory.",
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
    title: "What Is PostgreSQL?",
    bigPicture:
      "PostgreSQL (often called Postgres) is a database system. It stores information in tables and lets applications read, add, change, and delete that information using SQL.\n\nThink of an online store. It needs to store customers, products, and orders. PostgreSQL keeps this information in organized tables so the application can find it later.",
    codeSnippet: `CREATE TABLE products (
  id INTEGER,
  name TEXT,
  price NUMERIC(10, 2)
);`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. CREATE TABLE products",
        desc: "Creates a new table named `products` in the current database schema.",
      },
      {
        title: "2. id INTEGER",
        desc: "Defines an integer column to store a distinct product identifier.",
      },
      {
        title: "3. name TEXT",
        desc: "Stores product names as flexible, arbitrary-length UTF-8 text.",
      },
      {
        title: "4. price NUMERIC(10, 2)",
        desc: "Stores exact decimal currency amounts with up to 10 total digits and 2 decimal places.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "Applications need a reliable place to save information. PostgreSQL provides that place and helps keep the data organized.",
    rule: {
      title: "Persistence & Structured Storage Rule",
      content:
        "PostgreSQL is the database system; SQL is the language used to communicate with it. In-memory data is volatile; relational tables ensure durable, typed, and structured persistence across server reboots.",
    },
    cards: [
      {
        number: "01",
        tag: "PERSISTENCE",
        title: "Reliable On-Disk Storage",
        description:
          "Variables in server memory vanish on crash or deployment. PostgreSQL writes changes to disk so customer and product records persist forever.",
        color: "purple",
      },
      {
        number: "02",
        tag: "SQL LANGUAGE",
        title: "Standard Structured Query Language",
        description:
          "Applications query and manipulate table records using declarative SQL queries without managing raw file pointers or disk blocks.",
        color: "emerald",
      },
      {
        number: "03",
        tag: "TYPED COLUMNS",
        title: "Strict Data Shapes",
        description:
          "Every column has an explicit type (e.g. TEXT, NUMERIC, INTEGER) preventing invalid values like letters inside price fields.",
        color: "cyan",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Consider a small online store with customers, products, and orders. Here is how PostgreSQL acts as the single source of truth for the store.",
    points: [
      {
        title: "PostgreSQL vs Server Memory",
        content:
          "Node.js or Python memory disappears when processes exit. PostgreSQL operates as a dedicated database daemon ensuring data outlives your application processes.",
      },
      {
        title: "Relational Organization",
        content:
          "Rather than storing everything in one loose file, PostgreSQL organizes records into dedicated tables that can be joined and indexed efficiently.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Storing persistent state in local JavaScript memory variables or JSON files on the web server disk.",
    badApproach: {
      title: "Volatile In-Memory Storage",
      code: `// Flawed: in-memory state lost on restart or multiple server instances
const products = [];
app.post('/products', (req, res) => {
  products.push(req.body);
  res.json({ success: true });
});`,
      flaw: "Server reboots, container restarts, or load balancing across multiple instances will immediately lose or desynchronize data.",
    },
    betterApproach: {
      title: "Persistent PostgreSQL Table",
      code: `CREATE TABLE products (
  id INTEGER,
  name TEXT,
  price NUMERIC(10, 2)
);

-- Application executes SQL query against PostgreSQL:
INSERT INTO products (id, name, price)
VALUES (1, 'Mechanical Keyboard', 1200.00);`,
      benefit: "PostgreSQL persists changes to disk, supports concurrent reads and writes, and guarantees data durability.",
    },
    whyItMatters:
      "A database ensures that business-critical transactions, products, and user accounts survive server crashes, restarts, and horizontal scaling.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Run SQL DDL to create the products table and inspect its structure:",
    starterCode: `CREATE TABLE products (
  id INTEGER,
  name TEXT,
  price NUMERIC(10, 2)
);

INSERT INTO products (id, name, price)
VALUES (1, 'USB-C Cable', 250.00);

SELECT * FROM products;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the primary role of PostgreSQL in an online store application?",
      options: [
        "Rendering HTML templates and styling buttons in the browser",
        "Storing information in tables and managing reads and writes with SQL",
        "Managing DNS routing and SSL certificates for the store domain",
        "Serving static JavaScript and CSS assets from a CDN cache",
      ],
      correctIndex: 1,
      explanation:
        "PostgreSQL is a relational database management system. It stores structured data in tables and allows applications to query and modify records using SQL.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "PostgreSQL is the System",
        desc: "PostgreSQL is the database system; SQL is the query language used to interact with it.",
      },
      {
        title: "Tables Organize Data",
        desc: "Data is organized into named tables containing typed columns and individual record rows.",
      },
      {
        title: "Durable Persistence",
        desc: "Data stored in PostgreSQL survives application crashes, server restarts, and container scaling.",
      },
    ],
  },
};

