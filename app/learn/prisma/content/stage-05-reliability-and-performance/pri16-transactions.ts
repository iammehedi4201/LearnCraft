import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri16TransactionsContent: StandardLessonContent = {
  slug: "pri16-transactions",
  code: "PRI-16",
  title: "Transactions",
  subtitle: "Guarantee all-or-nothing atomicity across multiple queries using batch and interactive $transaction.",
  difficulty: "Difficult",
  scenario: {
    question: "An order is created, but saving its order item fails. You do not want an empty order left in the database. How do you prevent this?",
    answer: "Use a transaction so creating the order and its item succeeds together or is rolled back together.",
  },
  interviewQuestion: {
    question: "What is a database transaction?",
    answer: "A transaction groups database operations into one unit. If the required operations succeed, the changes are saved. If one fails, the changes are rolled back.",
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
    title: "Transactions",
    bigPicture: "A transaction groups multiple database operations into a single atomic unit. Either all operations succeed and their changes are committed, or if any operation fails, all changes are rolled back.\n\nPrisma provides two forms of `$transaction`:\n\n- Batch transaction (`prisma.$transaction([query1, query2])`): Executes a static array of queries in order.\n- Interactive transaction (`prisma.$transaction(async (tx) => { ... })`): Allows dynamic code where subsequent queries depend on the results of earlier queries inside the transaction.",
    codeSnippet: "await prisma.$transaction(async (tx) => {\n  // 1. Create the parent order\n  const order = await tx.order.create({\n    data: { customerId: 10 },\n  });\n\n  // 2. Create the associated line item using the new order's ID\n  await tx.orderItem.create({\n    data: {\n      orderId: order.id,\n      productId: 99,\n      quantity: 2,\n    },\n  });\n});",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. prisma.$transaction(async (tx) => ...)",
                "desc": "Starts an interactive transaction and passes a dedicated transactional client 'tx'."
          },
          {
                "title": "2. tx.order.create()",
                "desc": "Executes the first operation within the transaction boundary, yielding order.id."
          },
          {
                "title": "3. tx.orderItem.create()",
                "desc": "Uses the generated ID from the first step inside the same transaction."
          },
          {
                "title": "4. Automatic commit or rollback",
                "desc": "If the callback resolves without error, changes are committed; if an exception is thrown, all changes roll back immediately."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Financial transactions, inventory deductions, and order placement require strict ACID atomicity.",
    rule: {
      title: "Transactional Client Rule",
      content: "Inside an interactive transaction callback, you MUST use the provided 'tx' client. Calling methods on the root 'prisma' instance executes outside the transaction, risking partial writes.",
    },
    cards: [
          {
                "number": "01",
                "tag": "ATOMICITY",
                "title": "All or Nothing",
                "description": "Guarantees that multiple related operations either all persist or none do, preventing corrupt half-finished states.",
                "color": "purple"
          },
          {
                "number": "02",
                "tag": "INTERACTIVE",
                "title": "Interactive Callbacks",
                "description": "Allows conditional business logic, reading intermediate states, and passing IDs from earlier queries to later ones.",
                "color": "cyan"
          },
          {
                "number": "03",
                "tag": "BATCH",
                "title": "Sequential Batching",
                "description": "Passing an array of promises to $transaction executes them sequentially in a single transaction with minimal overhead.",
                "color": "emerald"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Transferring account balances with interactive transactions:",
    points: [
          {
                "title": "Bank Balance Transfer Example",
                "content": "Deducting money from Account A and adding it to Account B must be atomic to ensure funds never vanish or duplicate.",
                "codeSnippet": "// Transfer $50 from sender to receiver\nawait prisma.$transaction(async (tx) => {\n  const sender = await tx.account.update({\n    where: { id: fromId },\n    data: { balance: { decrement: 50 } },\n  });\n\n  if (sender.balance < 0) {\n    throw new Error(\"Insufficient funds!\"); // Triggers automatic rollback!\n  }\n\n  await tx.account.update({\n    where: { id: toId },\n    data: { balance: { increment: 50 } },\n  });\n});"
          },
          {
                "title": "Transaction Timeouts",
                "content": "Interactive transactions have a default timeout (typically 5000ms) to prevent database locks from remaining open indefinitely. Keep transaction logic focused and fast."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Using the global `prisma` client instead of the transactional `tx` parameter inside `$transaction`.",
    badApproach: {
      title: "Calling Root prisma Inside $transaction",
      code: "// Flawed: Calling root 'prisma' instead of 'tx'\nawait prisma.$transaction(async (tx) => {\n  const order = await prisma.order.create({ ... }); // Runs OUTSIDE transaction!\n  await tx.orderItem.create({ ... });\n});",
      flaw: "The first query executes in its own standalone connection. If the second query fails, the first is NOT rolled back.",
    },
    betterApproach: {
      title: "Consistently Using tx Client",
      code: "// Clean: All queries use tx and share the transaction\nawait prisma.$transaction(async (tx) => {\n  const order = await tx.order.create({ ... });\n  await tx.orderItem.create({ ... });\n});",
      benefit: "Both queries are bound to the transaction; any failure safely rolls back the entire operation.",
    },
    whyItMatters: "Ensuring all operations use the transactional client is critical for atomic data integrity.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Explore transaction execution patterns:",
    starterCode: "// Example interactive transaction\nimport { PrismaClient } from \"@prisma/client\";\n\nconst prisma = new PrismaClient();\n\nasync function placeOrder(userId: number, productId: number) {\n  return await prisma.$transaction(async (tx) => {\n    const order = await tx.order.create({ data: { customerId: userId } });\n    const item = await tx.orderItem.create({\n      data: { orderId: order.id, productId, quantity: 1 }\n    });\n    return { order, item };\n  });\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens if an error is thrown inside an interactive prisma.$transaction(async (tx) => ...) callback?",
      options: [
              "Only the failed statement is ignored; all other statements are saved",
              "All operations executed within the transaction are rolled back automatically",
              "The database drops the entire table",
              "Prisma converts the failed operation into a background job"
      ],
      correctIndex: 1,
      explanation: "If an error is thrown inside an interactive transaction callback, Prisma immediately aborts the transaction and rolls back all database modifications.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "Atomicity Guarantees",
                "desc": "Transactions ensure multiple database operations succeed or fail as a single unit."
          },
          {
                "title": "Use tx Inside Callbacks",
                "desc": "Always call methods on the provided 'tx' client to participate in the transaction."
          },
          {
                "title": "Keep Transactions Short",
                "desc": "Avoid long-running asynchronous tasks inside transactions to prevent lock contention."
          }
    ],
  },
};
