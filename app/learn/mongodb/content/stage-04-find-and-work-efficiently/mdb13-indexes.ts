import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb13IndexesContent: StandardLessonContent = {
  slug: "mdb13-indexes",
  code: "MDB-13",
  title: "Indexes",
  subtitle: "Accelerate query performance with single-field, compound, and unique indexes while managing write costs.",
  difficulty: "Difficult",
  scenario: {
    question: "A products page becomes slow when users search by product name. What could help?",
    answer: "An index on the product name may help. First check the query and use `explain()` to see whether MongoDB is scanning too many documents.",
  },
  interviewQuestion: {
    question: "Why not create an index on every field?",
    answer: "Indexes use storage and add work to inserts, updates, and deletes. I create indexes for queries that need them and check their effect.",
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
    title: "Indexes",
    bigPicture:
      "An index helps MongoDB find documents faster. Without a useful index, MongoDB may need to examine many documents to answer a query.\n\nThink of an index like the index at the back of a book. Instead of checking every page, you use the index to find where a topic appears.\n\nSuppose your application often searches courses by `title`:",
    codeSnippet: `// Create an index on title (illustrative):
db.courses.createIndex({ title: 1 })

// Query that utilizes the index:
db.courses.find({ title: "React Basics" })`,
    breakdownTitle: "Understand it step by step",
    breakdownItems: [
      {
        title: "1. Search pattern",
        desc: "Your application often searches by `title`.",
      },
      {
        title: "2. Index creation",
        desc: "You create an index on the `title` field.",
      },
      {
        title: "3. Index data structure",
        desc: "MongoDB stores extra index information to help locate matching documents.",
      },
      {
        title: "4. Index lookup",
        desc: "A suitable query can use that index instead of examining every document.",
      },
    ],
  },
  part2: {
    title: "The Cost & Strategy of Indexing",
    intro:
      "Indexes also have a cost: they use storage and can make writes slower because MongoDB must keep the indexes updated. Do not create an index on every field. Add indexes that support real queries and check whether MongoDB uses them.",
    rule: {
      title: "Query-Driven Indexing Rule",
      content:
        "Index fields based on frequent query filters and sort criteria. Every additional index incurs RAM overhead and write latency on inserts and updates.",
    },
    cards: [
      {
        number: "01",
        tag: "SPEED",
        title: "Read Acceleration",
        color: "emerald",
        description:
          "Changes query execution from an O(N) collection scan (COLLSCAN) to an O(log N) index scan (IXSCAN).",
      },
      {
        number: "02",
        tag: "COST",
        title: "Write & RAM Overhead",
        color: "amber",
        description:
          "Indexes must fit into Working Set RAM. Every insert, update, or delete must update every index on the collection.",
      },
      {
        number: "03",
        tag: "DISCIPLINE",
        title: "Prudent Creation",
        color: "purple",
        description:
          "Index only verified query paths. Verify efficiency using `explain()` rather than guessing.",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Applying index optimization in production databases:",
    points: [
      {
        title: "Product Search Acceleration",
        content:
          "In an online catalog with 500,000 items, searching by `productName` without an index examines all 500,000 records. An index on `{ productName: 1 }` resolves the query in a few milliseconds.",
      },
      {
        title: "Unique Email Constraint",
        content:
          "`db.users.createIndex({ email: 1 }, { unique: true })` both speeds up user login lookups and enforces duplicate email prevention at the database level.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Creating an index on every single field in a collection, bloating disk and memory usage and degrading write throughput.",
    bad: {
      title: "Over-Indexing Every Property",
      code: `// Anti-pattern: indexing every field blindly
db.courses.createIndex({ title: 1 });
db.courses.createIndex({ price: 1 });
db.courses.createIndex({ isPublished: 1 });
db.courses.createIndex({ createdAt: 1 });
db.courses.createIndex({ description: 1 });
// Writes now incur massive performance penalties!`,
      explanation:
        "Every write operation must synchronously update 5 separate B-tree index structures, dramatically slowing down inserts and consuming unnecessary RAM.",
    },
    good: {
      title: "Targeting Only Query Patterns",
      code: `// Best practice: index specifically for actual read workloads
db.courses.createIndex({ title: 1 });
// Verify with explain() before adding additional indexes.`,
      explanation:
        "Create indexes strictly for fields involved in high-frequency queries and sorting operations.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. Below is a simulation of collection scan vs index lookup:",
    starterCode: `// Simulating full scan vs index lookup in JavaScript
const collection = Array.from({ length: 1000 }, (_, i) => ({
  _id: i,
  title: "Course " + i,
  price: Math.floor(Math.random() * 500) + 100
}));

// 1. Full Collection Scan: checks every record (O(N))
let docsExamined = 0;
function collScan(title) {
  for (const doc of collection) {
    docsExamined++;
    if (doc.title === title) return doc;
  }
  return null;
}

// 2. Index Map Lookup: instant key fetch (O(1) hash / O(log N) B-Tree)
const titleIndex = new Map(collection.map(d => [d.title, d]));

console.log("Found via Scan:", collScan("Course 742"));
console.log("Documents examined in Scan:", docsExamined);

console.log("Found via Index:", titleIndex.get("Course 742")?.title);
console.log("Documents examined via Index: 1");*/`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Why not create an index on every field in a MongoDB collection?",
      options: [
        "Indexes use storage and add work to inserts, updates, and deletes. I create indexes for queries that need them and check their effect.",
        "MongoDB only allows exactly one index per database.",
        "Indexes cause the database to permanently delete all data every 24 hours.",
        "Creating an index prevents users from reading documents.",
      ],
      correctIndex: 0,
      explanation:
        "Indexes require disk and RAM space and slow down write operations (inserts, updates, deletes) because every index must be kept up to date.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Index Purpose",
        desc: "Indexes allow MongoDB to locate documents quickly without scanning every document in the collection.",
      },
      {
        title: "Trade-offs",
        desc: "Faster reads come at the cost of additional storage and slower write operations.",
      },
      {
        title: "Targeted Indexing",
        desc: "Create indexes that match real application query patterns and verify their usage with `explain()`.",
      },
    ],
    nextLessonPreview: {
      title: "Lesson 14: Check a Query with explain()",
      desc: "Learn how to analyze query execution plans, COLLSCAN vs IXSCAN, and totalDocsExamined.",
    },
  },
};

