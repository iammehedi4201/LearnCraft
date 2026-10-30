import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb09DeleteDocumentsSafelyContent: StandardLessonContent = {
  slug: "mdb09-delete-documents-safely",
  code: "MDB-09",
  title: "Delete Documents Safely",
  subtitle: "Remove documents with deleteOne() and deleteMany() while preventing accidental mass deletion.",
  difficulty: "Easy",
  scenario: {
    question: "An admin wants to remove one discontinued course. What should they do?",
    answer: "Use `deleteOne()` with a filter that identifies that course. Check the filter before running the command.",
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
    title: "Delete Documents Safely",
    bigPicture:
      "Use `deleteOne()` to remove one matching document and `deleteMany()` to remove all matching documents.",
    codeSnippet: `// Delete one specific document (illustrative):
db.courses.deleteOne({
  title: "Old Course"
})

// DANGER: Empty filter deletes EVERY document in the collection!
// db.courses.deleteMany({})`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Filter evaluation",
        desc: "MongoDB checks the filter.",
      },
      {
        title: "2. Removal of match",
        desc: "It removes one matching document.",
      },
      {
        title: "3. Result response",
        desc: "It reports how many documents were deleted (e.g. `{ acknowledged: true, deletedCount: 1 }`).",
      },
      {
        title: "4. Empty filter warning",
        desc: "`deleteMany({})` removes every document in the collection. Do not run it unless deleting all records is truly intended.",
      },
    ],
  },
  part2: {
    title: "Safe Deletion Strategies & Soft Deletes",
    intro:
      "Deleting data permanently removes it from the database. In production, write targeted filters and consider soft-delete flags.",
    rule: {
      title: "Deletion Safeguard Rule",
      content:
        "Never run `deleteMany()` without an explicit, validated filter. Verify the target document count with `find(filter).count()` before running destructive operations.",
    },
    cards: [
      {
        number: "01",
        tag: "SINGLE",
        title: "deleteOne()",
        color: "emerald",
        description:
          "Finds the first document matching the query criteria and permanently removes it from the collection.",
      },
      {
        number: "02",
        tag: "BATCH",
        title: "deleteMany()",
        color: "cyan",
        description:
          "Deletes all documents that match the provided filter. Passing `{}` removes all records.",
      },
      {
        number: "03",
        tag: "BEST PRACTICE",
        title: "Soft Delete Pattern",
        color: "purple",
        description:
          "Instead of physically deleting, set `{ isDeleted: true, deletedAt: new Date() }` to allow recovery and auditing.",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Handling deletion safely in web applications:",
    points: [
      {
        title: "Removing Discontinued Course",
        content:
          "When an admin archives a single course: `db.courses.deleteOne({ _id: courseId })` targets the unique ID to ensure only that one course is deleted.",
      },
      {
        title: "Clearing Expired Sessions",
        content:
          "A periodic maintenance task deletes old sessions: `db.sessions.deleteMany({ expiresAt: { $lt: new Date() } })` cleans up only expired records.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Accidentally running `deleteMany({})` or passing an undefined variable as a filter, wiping out the entire collection.",
    bad: {
      title: "Running deleteMany() with Empty Filter",
      code: `// Catastrophic error: deleting all documents!
const targetId = undefined;
db.courses.deleteMany({ _id: targetId }); // If undefined field gets stripped, wipes out everything!`,
      explanation:
        "An empty or unvalidated filter in `deleteMany` destroys every single document in the collection.",
    },
    good: {
      title: "Validating Filter Before Deletion",
      code: `// Safe: ensure the filter is non-empty and well-formed
if (!courseId) {
  throw new Error("Target courseId is required for deletion");
}
db.courses.deleteOne({ _id: courseId });`,
      explanation:
        "Validating inputs ensures deletion is strictly targeted to the intended document.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. Below is a simulation of deleteOne and deleteMany:",
    starterCode: `// Simulating deleteOne and deleteMany in JavaScript
let courses = [
  { _id: "1", title: "Active Course 1" },
  { _id: "2", title: "Discontinued Course" },
  { _id: "3", title: "Active Course 2" }
];

function deleteOne(filter) {
  const index = courses.findIndex(c => Object.entries(filter).every(([k, v]) => c[k] === v));
  if (index !== -1) {
    courses.splice(index, 1);
    return { acknowledged: true, deletedCount: 1 };
  }
  return { acknowledged: true, deletedCount: 0 };
}

console.log("Before deletion:", courses.map(c => c.title));
const result = deleteOne({ title: "Discontinued Course" });
console.log("Deletion result:", result);
console.log("Remaining courses:", courses.map(c => c.title));`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "An admin wants to remove one discontinued course. What should they do?",
      options: [
        "Use `deleteOne()` with a filter that identifies that course. Check the filter before running the command.",
        "Use `db.courses.deleteMany({})` to remove all courses.",
        "Use `show dbs` to hide the course from the screen.",
        "Use `insertMany()` with an empty array.",
      ],
      correctIndex: 0,
      explanation:
        "Using `deleteOne()` with an explicit filter targeting that specific course removes only that document safely.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "deleteOne()",
        desc: "Removes a single document matching the specified filter criteria.",
      },
      {
        title: "deleteMany() Caution",
        desc: "Never pass an empty filter `{}` to `deleteMany()` unless you genuinely intend to truncate the collection.",
      },
      {
        title: "Filter Verification",
        desc: "Double-check your filter and test query counts with `find()` prior to deleting.",
      },
    ],
    nextLessonPreview: {
      title: "Lesson 10: Arrays and Embedded Documents",
      desc: "Begin Part 3: Organize Data the Right Way by querying nested documents and manipulating arrays.",
    },
  },
};

