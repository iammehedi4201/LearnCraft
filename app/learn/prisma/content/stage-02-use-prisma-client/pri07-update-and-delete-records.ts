import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri07UpdateAndDeleteRecordsContent: StandardLessonContent = {
  slug: "pri07-update-and-delete-records",
  code: "PRI-07",
  title: "Update and Delete Records",
  subtitle: "Modify existing rows with update() and remove records safely with delete() and deleteMany().",
  difficulty: "Moderate",
  scenario: {
    question: "A user edits their profile name. Should you create a new user or update the existing user?",
    answer: "Update the existing user with `update()`, using the user's unique ID to find the record and passing the new name in `data`.",
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
    title: "Update and Delete Records",
    bigPicture: "Prisma Client provides `update()` and `delete()` to modify or remove existing records.\n\n- `update()` targets a single record using a unique identifier and applies changes in `data`.\n- `delete()` removes a single record matching a unique identifier.\n- For bulk modifications, Prisma provides `updateMany()` and `deleteMany()`.",
    codeSnippet: "// 1. Update a user\nconst updatedUser = await prisma.user.update({\n  where: { id: 1 },\n  data: { name: \"Amina Khan\" },\n});\n\n// 2. Delete a user\nawait prisma.user.delete({\n  where: { id: 1 },\n});",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. update({ where, data })",
                "desc": "Locates the record using a unique identifier in where, and applies new values provided in data."
          },
          {
                "title": "2. Atomic partial updates",
                "desc": "You only need to supply the fields being changed in data; unmentioned fields remain untouched."
          },
          {
                "title": "3. delete({ where })",
                "desc": "Permanently removes the specified record from the database."
          },
          {
                "title": "4. Return values",
                "desc": "Both update() and delete() return the affected record."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Modifying and deleting data must be targeted carefully to prevent accidental mass updates or unintended data loss.",
    rule: {
      title: "Unique Target Rule for update/delete",
      content: "Single-record update() and delete() methods require a unique 'where' selector. If the targeted record does not exist, Prisma throws a RecordNotFound error (P2025).",
    },
    cards: [
          {
                "number": "01",
                "tag": "MUTATION",
                "title": "update()",
                "description": "Updates specified fields of a single record identified by unique key. Returns the modified record.",
                "color": "purple"
          },
          {
                "number": "02",
                "tag": "REMOVAL",
                "title": "delete()",
                "description": "Deletes a specific record by primary key or unique index. Throws P2025 if the record does not exist.",
                "color": "rose"
          },
          {
                "number": "03",
                "tag": "BULK",
                "title": "updateMany / deleteMany",
                "description": "Applies mutations or deletions across multiple rows matching a where filter. Returns a count object.",
                "color": "amber"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Targeting records safely during user profile management:",
    points: [
          {
                "title": "Atomic Number Increments",
                "content": "Prisma supports atomic number updates like increment and decrement to avoid race conditions when counters change concurrently.",
                "codeSnippet": "// Safe atomic view counter increment:\nawait prisma.post.update({\n  where: { id: 10 },\n  data: {\n    views: { increment: 1 },\n  },\n});"
          },
          {
                "title": "Soft Deletes vs Hard Deletes",
                "content": "Instead of permanently removing rows with delete(), many production systems implement soft deletes by updating a deletedAt timestamp (e.g. data: { deletedAt: new Date() })."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Calling `update()` on an ID that might not exist, causing unhandled P2025 exceptions.",
    badApproach: {
      title: "Unchecked update() Call",
      code: "// Flawed: Throws uncaught P2025 if id 999 is missing\nconst user = await prisma.user.update({\n  where: { id: 999 },\n  data: { name: \"New Name\" },\n});",
      flaw: "Prisma throws PrismaClientKnownRequestError with code P2025, which crashes the route handler if uncaught.",
    },
    betterApproach: {
      title: "Handling Missing Records or Using upsert()",
      code: "// Option A: Catch error or check existence\ntry {\n  await prisma.user.update({\n    where: { id: userId },\n    data: { name: newName },\n  });\n} catch (error) {\n  if (error.code === \"P2025\") {\n    // Record not found\n  }\n}\n\n// Option B: upsert() creates if missing, updates if present\nawait prisma.user.upsert({\n  where: { id: userId },\n  update: { name: newName },\n  create: { id: userId, email: \"user@example.com\", name: newName },\n});",
      benefit: "Gracefully handles nonexistent records without unexpected application crashes.",
    },
    whyItMatters: "Production web applications must handle missing entity mutations predictably without crashing API servers.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Test updating and deleting records:",
    starterCode: "// Example update and delete operations\nimport { PrismaClient } from \"@prisma/client\";\n\nconst prisma = new PrismaClient();\n\nasync function run() {\n  // Update name\n  const updated = await prisma.user.update({\n    where: { id: 1 },\n    data: { name: \"Amina Khan\" }\n  });\n  console.log(\"Updated:\", updated);\n}\n\nrun();",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens if you call prisma.user.update() with an ID that does not exist in the database?",
      options: [
              "It automatically creates a brand new user with that ID",
              "It throws a PrismaClientKnownRequestError with code P2025 (Record not found)",
              "It returns undefined without throwing an error",
              "It deletes all rows in the table"
      ],
      correctIndex: 1,
      explanation: "Calling update() or delete() on a non-existent unique target throws a PrismaClientKnownRequestError with code P2025 indicating the record was not found.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "update() Modifies Existing Data",
                "desc": "Target by unique ID and provide only the fields being changed in data."
          },
          {
                "title": "delete() Removes Records",
                "desc": "Deletes a single record by unique identifier and returns the deleted row."
          },
          {
                "title": "upsert() for Idempotency",
                "desc": "Use upsert() when you want to update an existing record or create it if missing."
          }
    ],
  },
};
