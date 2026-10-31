import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg13TransactionsAndAcidContent: StandardLessonContent = {
  slug: "pg13-transactions-and-acid",
  code: "PG-13",
  title: "Transactions and ACID",
  subtitle: "Group related SQL operations into atomic units with BEGIN, COMMIT, and ROLLBACK, and master the four ACID guarantees.",
  difficulty: "Difficult",
  scenario: {
    question: "A money transfer subtracts money from the first account, but adding it to the second account fails. What should the application do?",
    answer: "It should roll back the transaction so the first subtraction is not saved by itself. Both parts of the transfer must succeed together.",
  },
  interviewQuestion: {
    question: "Why do we use database transactions?",
    answer: "Transactions keep related changes together. They help prevent incomplete operations, such as subtracting money from one account without adding it to the other.",
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
    title: "Transactions and ACID",
    bigPicture:
      "A transaction groups multiple database actions into one unit. The goal is to make sure the related actions succeed together or are undone together.\n\nImagine transferring 500 from one bank account to another. The system must subtract 500 from one account and add 500 to the other. It must not finish only half of the transfer.",
    codeSnippet: `BEGIN;

UPDATE accounts
SET balance = balance - 500
WHERE id = 1;

UPDATE accounts
SET balance = balance + 500
WHERE id = 2;

COMMIT;`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. BEGIN",
        desc: "Opens a new transactional unit of work.",
      },
      {
        title: "2. First UPDATE (Debit)",
        desc: "Subtracts 500 from account 1.",
      },
      {
        title: "3. Second UPDATE (Credit)",
        desc: "Adds 500 to account 2.",
      },
      {
        title: "4. COMMIT",
        desc: "Persists both changes permanently and atomically to disk.",
      },
      {
        title: "5. ROLLBACK safety",
        desc: "If any step encounters an error or crash before commit, `ROLLBACK` undoes all interim changes as if they never happened.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "Without transactions, network disconnects or mid-operation exceptions leave your database in an inconsistent, corrupt state.",
    rule: {
      title: "ACID Transaction Guarantees Rule",
      content:
        "Whenever two or more mutations must succeed or fail as a single logical unit of work, enclose them in `BEGIN` and `COMMIT`. Always issue `ROLLBACK` in catch/error handlers.",
    },
    cards: [
      {
        number: "01",
        tag: "ATOMICITY",
        title: "All or Nothing",
        description:
          "All modifications inside the transaction boundary commit successfully, or all changes are completely rolled back.",
        color: "purple",
      },
      {
        number: "02",
        tag: "CONSISTENCY",
        title: "Constraint Invariants",
        description:
          "A transaction cannot leave the database in an invalid state; all table constraints and rules must be satisfied upon commit.",
        color: "emerald",
      },
      {
        number: "03",
        tag: "ISOLATION & DURABILITY",
        title: "Concurrency & Durability",
        description:
          "Isolation prevents concurrent transactions from seeing uncommitted intermediate states. Durability guarantees committed writes survive power loss.",
        color: "cyan",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Observe how e-commerce order checkout relies on ACID transactions.",
    points: [
      {
        title: "Order Placement and Inventory Deduction",
        content:
          "Creating an order record and decrementing inventory must happen together. If inventory is out of stock, rolling back the transaction ensures no orphan order record is created.",
      },
      {
        title: "Connection Loss Recovery",
        content:
          "If the database connection drops while executing statements before `COMMIT`, PostgreSQL automatically aborts and rolls back the uncommitted transaction.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Running multi-step mutations without a transaction block, leaving partial writes in the database on error.",
    badApproach: {
      title: "Unprotected Multi-Step Mutations",
      code: `-- Flawed: No transaction!
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
-- If the server crashes or the next query fails here,
-- 500 is lost forever and never credited to account 2!
UPDATE accounts SET balance = balance + 500 WHERE id = 2;`,
      flaw: "Leaves the database in an inconsistent state where money has vanished from account 1.",
    },
    betterApproach: {
      title: "Protected Transaction Block",
      code: `BEGIN;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;

-- If any error occurs, execute: ROLLBACK;
COMMIT;`,
      benefit: "Guarantees that money is only deducted if it is successfully credited to the destination account.",
    },
    whyItMatters:
      "Transactions prevent incomplete business operations and are the bedrock of reliable financial and order processing systems.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Simulate a balance transfer inside a transaction block:",
    starterCode: `CREATE TABLE accounts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  owner TEXT NOT NULL,
  balance NUMERIC(10, 2) NOT NULL CHECK (balance >= 0)
);

INSERT INTO accounts (owner, balance) VALUES
  ('Amina', 1000.00),
  ('Rahim', 250.00);

BEGIN;
UPDATE accounts SET balance = balance - 200.00 WHERE owner = 'Amina';
UPDATE accounts SET balance = balance + 200.00 WHERE owner = 'Rahim';
COMMIT;

SELECT owner, balance FROM accounts;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which ACID property guarantees that either all operations in a transaction finish or none of them do?",
      options: [
        "Isolation",
        "Durability",
        "Atomicity",
        "Consistency",
      ],
      correctIndex: 2,
      explanation:
        "Atomicity ensures that a transaction is treated as an indivisible unit of work: all statements succeed together or the entire transaction is rolled back.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Keep Changes Together",
        desc: "Transactions ensure that multi-step mutations either complete as a whole or leave no partial changes.",
      },
      {
        title: "BEGIN, COMMIT, ROLLBACK",
        desc: "Start with `BEGIN`, save with `COMMIT`, and cancel with `ROLLBACK` on error.",
      },
      {
        title: "The Four ACID Pillars",
        desc: "Atomicity (all or nothing), Consistency (valid rules), Isolation (independent concurrency), Durability (permanent storage).",
      },
    ],
  },
};

