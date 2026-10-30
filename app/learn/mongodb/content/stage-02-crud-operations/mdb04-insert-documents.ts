import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb04InsertDocumentsContent: StandardLessonContent = {
  slug: "mdb04-insert-documents",
  code: "MDB-04",
  title: "Insert Documents",
  subtitle: "Save single or multiple documents into a collection using insertOne() and insertMany().",
  difficulty: "Easy",
  scenario: {
    question: "An admin adds a new course to the website. Which operation saves it in MongoDB?",
    answer: "Use `insertOne()` because the admin is adding one course document.",
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
    title: "Insert Documents",
    bigPicture:
      "To save a new document, use `insertOne()`. To save several documents at once, use `insertMany()`.",
    codeSnippet: `// Insert one document (illustrative):
db.courses.insertOne({
  title: "React Basics",
  price: 600,
  isPublished: true
})

// Insert multiple documents:
db.courses.insertMany([
  { title: "Node.js Basics", price: 700 },
  { title: "MongoDB Basics", price: 800 }
])`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Select collection",
        desc: "`db.courses` selects the `courses` collection.",
      },
      {
        title: "2. Tell MongoDB to save",
        desc: "`insertOne()` tells MongoDB to save one document.",
      },
      {
        title: "3. Fields and values",
        desc: "The object contains the fields and values to save.",
      },
      {
        title: "4. Auto-generated _id",
        desc: "MongoDB adds an `_id` if the document does not already have one.",
      },
    ],
  },
  part2: {
    title: "When to Use insertOne() vs insertMany()",
    intro:
      "Use `insertOne()` for one new record and `insertMany()` when you need to add a group of records.",
    rule: {
      title: "Document Insertion Rule",
      content:
        "Pass a single document object to `insertOne()` and an array of document objects to `insertMany()`. MongoDB returns acknowledgment with the inserted `_id` values.",
    },
    cards: [
      {
        number: "01",
        tag: "SINGLE",
        title: "insertOne()",
        color: "emerald",
        description:
          "Saves one document. Returns `{ acknowledged: true, insertedId: ObjectId(...) }`.",
      },
      {
        number: "02",
        tag: "BATCH",
        title: "insertMany()",
        color: "cyan",
        description:
          "Accepts an array of documents to insert in a single network round-trip, improving batch performance.",
      },
      {
        number: "03",
        tag: "KEY",
        title: "Automatic ID Generation",
        color: "purple",
        description:
          "If omitted, MongoDB automatically generates a unique 12-byte BSON `_id` for every document.",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Applying insert operations in real application flows:",
    points: [
      {
        title: "Admin Dashboard Course Creation",
        content:
          "When an instructor submits the 'Create Course' form, the server calls `insertOne()` with the title, price, and status.",
      },
      {
        title: "Data Seeding & Migrations",
        content:
          "When initializing a test database or importing initial catalog records, using `insertMany([...])` is much faster than looping `insertOne()`.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Passing a single object directly into `insertMany()` or passing an array into `insertOne()`.",
    bad: {
      title: "Passing Array to insertOne()",
      code: `// Mistake: passing array to insertOne
db.courses.insertOne([
  { title: "React Basics" },
  { title: "Node.js Basics" }
]);
// MongoDB will attempt to save the entire array as a single invalid document!`,
      explanation:
        "insertOne() expects a single document object, not an array.",
    },
    good: {
      title: "Using the Correct Method for the Structure",
      code: `// Correct: use insertMany for arrays of documents
db.courses.insertMany([
  { title: "React Basics", price: 600 },
  { title: "Node.js Basics", price: 700 }
]);`,
      explanation:
        "insertMany() cleanly accepts an array of documents and inserts each one individually.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. Below is a simulation of insertOne and insertMany operations:",
    starterCode: `// Simulating insertOne and insertMany
const collection = [];

function insertOne(doc) {
  const newDoc = { _id: "obj_" + Math.random().toString(36).substring(2, 9), ...doc };
  collection.push(newDoc);
  return { acknowledged: true, insertedId: newDoc._id };
}

function insertMany(docs) {
  const ids = [];
  for (const doc of docs) {
    const res = insertOne(doc);
    ids.push(res.insertedId);
  }
  return { acknowledged: true, insertedIds: ids };
}

const single = insertOne({ title: "React Basics", price: 600 });
console.log("insertOne result:", single);

const batch = insertMany([
  { title: "Node.js Basics", price: 700 },
  { title: "MongoDB Basics", price: 800 }
]);
console.log("insertMany result:", batch);
console.log("Total collection size:", collection.length);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "An admin adds a new course to the website. Which operation saves it in MongoDB?",
      options: [
        "Use `insertOne()` because the admin is adding one course document.",
        "Use `db.dropDatabase()` to refresh the courses list.",
        "Use `show collections` to save the new record.",
        "Use `insertMany()` with no arguments.",
      ],
      correctIndex: 0,
      explanation:
        "Use `insertOne()` to save a single new document into a collection.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "insertOne()",
        desc: "Inserts a single document and automatically generates an `_id` if omitted.",
      },
      {
        title: "insertMany()",
        desc: "Inserts an array of documents in a single efficient batch operation.",
      },
      {
        title: "Write Acknowledgment",
        desc: "MongoDB confirms each write with status and inserted identifiers.",
      },
    ],
    nextLessonPreview: {
      title: "Lesson 5: Find Documents",
      desc: "Learn how to read documents from collections using find() and findOne().",
    },
  },
};

