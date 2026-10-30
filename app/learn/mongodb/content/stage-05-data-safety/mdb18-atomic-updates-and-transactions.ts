import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb18AtomicUpdatesAndTransactionsContent: StandardLessonContent = {
  slug: "mdb18-atomic-updates-and-transactions",
  code: "MDB-18",
  title: "Atomic Updates and Transactions",
  subtitle: "Understand single-document atomicity guarantees vs multi-document ACID transactions with sessions.",
  difficulty: "Difficult",
  scenario: {
    question: "A money transfer subtracts money from one account and adds it to another. Both updates must succeed together. What should you consider?",
    answer: "Use a transaction so both updates commit together. If one fails, abort the transaction so only one account is not changed.",
  },
  interviewQuestion: {
    question: "What is the difference between single-document atomicity and a transaction?",
    answer: "A single-document write is atomic for that document. A transaction groups multiple operations, possibly across documents, so they succeed or fail together.",
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
    title: "Atomic Updates and Transactions",
    bigPicture:
      "An operation is **atomic** when it either completes as one whole operation or does not happen partly. In MongoDB, a write to a single document is atomic.\n\nFor example, increase one user's reward points:",
    codeSnippet: `// Single-document atomic write (illustrative):
db.users.updateOne(
  { _id: userId },
  { $inc: { points: 10 } }
)

// Multi-document transaction concept (illustrative pseudocode):
// const session = client.startSession();
// session.startTransaction();
// try {
//   await db.accounts.updateOne({ _id: accA }, { $inc: { balance: -100 } }, { session });
//   await db.accounts.updateOne({ _id: accB }, { $inc: { balance: 100 } }, { session });
//   await session.commitTransaction();
// } catch (error) {
//   await session.abortTransaction();
// } finally {
//   await session.endSession();
// }`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Single-document atomicity",
        desc: "MongoDB applies updates to a single document as one atomic operation without locking entire collections.",
      },
      {
        title: "2. When you need a transaction",
        desc: "Sometimes one action must update more than one document and all updates must succeed together.",
      },
      {
        title: "3. The money transfer problem",
        desc: "If Account A is debited but Account B fails, money vanishes unless wrapped in a transaction that can abort and roll back.",
      },
      {
        title: "4. Cost and complexity",
        desc: "Transactions are more complex and have a cost. First consider whether the data can be designed so the operation fits inside one document. Use a multi-document transaction when the business rule truly needs several documents to change as one unit.",
      },
    ],
  },
  part2: {
    title: "Single-Doc vs Multi-Doc Guarantees",
    intro:
      "MongoDB was designed around document atomicity. Many operations that require transactions in SQL can be structured inside a single embedded document in MongoDB.",
    rule: {
      title: "Atomicity Boundary Rule",
      content:
        "Design schemas to capture atomic operations inside single documents where possible. Reserve multi-document ACID transactions with sessions for cross-collection invariants like financial transfers and inventory checkout.",
    },
    cards: [
      {
        number: "01",
        tag: "DEFAULT",
        title: "Single-Document Atomicity",
        color: "emerald",
        description:
          "All modifications to fields and embedded arrays within a single document happen atomically without explicit transaction overhead.",
      },
      {
        number: "02",
        tag: "SESSIONS",
        title: "Multi-Doc Transactions",
        color: "cyan",
        description:
          "Coordinate changes across multiple documents or collections with all-or-nothing rollback semantics using client sessions.",
      },
      {
        number: "03",
        tag: "DESIGN",
        title: "Document Modeling First",
        color: "purple",
        description:
          "Careful schema design often eliminates the need for distributed transactions by embedding related state in one document.",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Applying transactional safety to mission-critical features:",
    points: [
      {
        title: "Bank Account Transfer",
        content:
          "Debit Account A by $100 and credit Account B by $100 within a transaction session: if Account B fails or network drops, both accounts revert to their original balances.",
      },
      {
        title: "Order Checkout & Inventory Decrement",
        content:
          "Creating the order document in `orders` and decrementing inventory count in `products` must either both commit or neither commit.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Executing dependent sequential updates without error handling or a transaction, leaving the database in an inconsistent corrupted state when the second operation throws.",
    bad: {
      title: "Sequential Uncoordinated Writes",
      code: `// Danger: uncoordinated writes without transaction
await db.accounts.updateOne({ _id: "A" }, { $inc: { balance: -100 } });
// Network error or crash occurs right here!
await db.accounts.updateOne({ _id: "B" }, { $inc: { balance: +100 } });
// Account A lost $100, but Account B never received it!`,
      explanation:
        "If a crash or error occurs between individual writes, the database is left permanently inconsistent.",
    },
    good: {
      title: "Coordinated ACID Transaction Rollback",
      code: `// Safe: session transaction with rollback
const session = client.startSession();
session.startTransaction();
try {
  await db.accounts.updateOne({ _id: "A" }, { $inc: { balance: -100 } }, { session });
  await db.accounts.updateOne({ _id: "B" }, { $inc: { balance: +100 } }, { session });
  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction(); // Reverts Account A back to initial balance!
} finally {
  await session.endSession();
}`,
      explanation:
        "A transaction ensures that either all operations commit, or all changes are rolled back cleanly.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. Below is a simulation of an atomic transaction with rollback:",
    starterCode: `// Simulating transactional commit and rollback in JavaScript
const accounts = {
  accA: { balance: 500 },
  accB: { balance: 200 }
};

function transfer(from, to, amount, simulateError = false) {
  const snapshot = JSON.parse(JSON.stringify(accounts));
  try {
    if (accounts[from].balance < amount) throw new Error("Insufficient funds");
    accounts[from].balance -= amount;

    if (simulateError) throw new Error("Network crash during transfer to " + to);
    accounts[to].balance += amount;

    console.log("Transaction COMMITTED successfully:", accounts);
  } catch (err) {
    console.error("Transaction ABORTED:", err.message);
    Object.assign(accounts, snapshot); // Rollback to snapshot
    console.log("State after ROLLBACK:", accounts);
  }
}

console.log("--- Test 1: Successful Transfer ---");
transfer("accA", "accB", 100, false);

console.log("\\n--- Test 2: Failed Transfer (Simulated Crash) ---");
transfer("accA", "accB", 50, true);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "What is the difference between single-document atomicity and a transaction in MongoDB?",
      options: [
        "A single-document write is atomic for that document. A transaction groups multiple operations, possibly across documents, so they succeed or fail together.",
        "Single-document atomicity requires a replica set of at least 10 servers, while transactions run only on floppy disks.",
        "There is no difference; transactions and single-document writes are identical.",
        "Transactions only work for deleting collections, not updating data.",
      ],
      correctIndex: 0,
      explanation:
        "Single-document writes are atomic by default for that single document. Multi-document transactions coordinate multiple operations across documents to succeed or abort together.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Single-Document Atomicity",
        desc: "Updates to a single document are completely atomic by default in MongoDB.",
      },
      {
        title: "Multi-Document Transactions",
        desc: "Use client sessions to execute ACID transactions across multiple documents and collections.",
      },
      {
        title: "All-or-Nothing Rollback",
        desc: "If any step in a transaction fails, aborting reverts all pending mutations.",
      },
    ],
    nextLessonPreview: {
      title: "Lesson 19: Database Security Basics",
      desc: "Protect your database with authentication, least privilege access, environment variables, and network controls.",
    },
  },
};

