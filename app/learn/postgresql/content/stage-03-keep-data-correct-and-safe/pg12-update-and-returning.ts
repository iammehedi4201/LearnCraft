import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg12UpdateAndReturningContent: StandardLessonContent = {
  slug: "pg12-update-and-returning",
  code: "PG-12",
  title: "UPDATE Carefully and Use RETURNING",
  subtitle: "Execute safe modifications and retrieve mutated, generated, or deleted rows in a single round-trip with RETURNING.",
  difficulty: "Moderate",
  scenario: {
    question: "An application changes a customer's email and needs the updated row immediately. What can it use?",
    answer: "It can use UPDATE ... RETURNING to change the email and get the updated row in the same statement.",
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
    title: "UPDATE Carefully and Use RETURNING",
    bigPicture:
      "`UPDATE` changes existing rows. PostgreSQL's `RETURNING` clause can show the rows that were changed.",
    codeSnippet: `UPDATE products
SET price = 1400
WHERE id = 10
RETURNING id, name, price;`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. UPDATE products",
        desc: "Selects the target table to modify.",
      },
      {
        title: "2. SET price = 1400",
        desc: "Assigns the new price value to matching rows.",
      },
      {
        title: "3. WHERE id = 10",
        desc: "Restricts the mutation to the single product with ID 10.",
      },
      {
        title: "4. RETURNING id, name, price",
        desc: "Returns the modified row immediately to the client without requiring a second SELECT query.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "In traditional SQL engines, updating or inserting a record requires two roundtrips: one write query followed by a read query. PostgreSQL's RETURNING clause eliminates this overhead.",
    rule: {
      title: "Atomic Mutation Return Rule",
      content:
        "Use `RETURNING` with `INSERT`, `UPDATE`, and `DELETE` to fetch generated IDs, updated timestamps, or deleted snapshots atomically in a single network round-trip.",
    },
    cards: [
      {
        number: "01",
        tag: "INSERT",
        title: "Fetch Generated IDs",
        description:
          "`INSERT INTO customers (...) RETURNING id;` immediately provides the generated primary key to your backend code.",
        color: "emerald",
      },
      {
        number: "02",
        tag: "UPDATE",
        title: "Verify Mutations",
        description:
          "RETURNING confirms the exact updated state and verifies whether any rows actually matched the WHERE condition.",
        color: "purple",
      },
      {
        number: "03",
        tag: "DELETE",
        title: "Archive Snapshots",
        description:
          "`DELETE FROM sessions WHERE expired_at < NOW() RETURNING *;` lets you log or archive purged records seamlessly.",
        color: "cyan",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Review how API routes update user profiles and inventory counts efficiently.",
    points: [
      {
        title: "User Profile Updates",
        content:
          "When a user edits their profile, `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *` immediately sends the fresh user object back to the client application.",
      },
      {
        title: "Checking for 0 Rows Affected",
        content:
          "If the RETURNING clause returns an empty array, your application knows immediately that no row matched the ID (e.g. 404 Not Found) without a separate lookup.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Executing an UPDATE followed by an immediate SELECT, introducing network latency and concurrency race conditions.",
    badApproach: {
      title: "Two-Query Write and Read",
      code: `// Flawed: Two separate network roundtrips with potential race conditions
await db.query("UPDATE products SET price = 1400 WHERE id = 10");
const updated = await db.query("SELECT * FROM products WHERE id = 10");`,
      flaw: "Doubles database network latency. Another concurrent transaction could modify the row between the UPDATE and SELECT.",
    },
    betterApproach: {
      title: "Single Roundtrip with RETURNING",
      code: `-- Production: Atomic single roundtrip
UPDATE products
SET price = 1400
WHERE id = 10
RETURNING id, name, price;`,
      benefit: "Halves latency and returns the exact snapshot produced by that specific UPDATE statement.",
    },
    whyItMatters:
      "RETURNING provides atomic, race-free verification of mutations while saving database bandwidth and reducing connection overhead.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Test the RETURNING clause on INSERT, UPDATE, and DELETE:",
    starterCode: `CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL
);

-- Insert and return generated ID:
INSERT INTO products (name, price)
VALUES ('Smart Watch', 499.00)
RETURNING id, name, price;

-- Update and return modified row:
UPDATE products
SET price = 449.00
WHERE name = 'Smart Watch'
RETURNING id, name, price;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which PostgreSQL clause allows you to return mutated rows directly from an INSERT, UPDATE, or DELETE statement?",
      options: [
        "OUTPUT",
        "RETURNING",
        "FETCH",
        "ECHO",
      ],
      correctIndex: 1,
      explanation:
        "The RETURNING clause is a powerful PostgreSQL feature that returns rows affected by INSERT, UPDATE, or DELETE statements in the same execution.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Immediate Feedback",
        desc: "`RETURNING` shows the exact rows modified, created, or removed by a mutation.",
      },
      {
        title: "Saves Network Roundtrips",
        desc: "Eliminates the need for a secondary `SELECT` after `INSERT` or `UPDATE`.",
      },
      {
        title: "Works with All Mutations",
        desc: "Use `RETURNING` across `INSERT`, `UPDATE`, and `DELETE` commands.",
      },
    ],
  },
};

