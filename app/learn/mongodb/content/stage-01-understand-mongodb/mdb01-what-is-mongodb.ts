import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb01WhatIsMongodbContent: StandardLessonContent = {
  slug: "mdb01-what-is-mongodb",
  code: "MDB-01",
  title: "What Is MongoDB?",
  subtitle: "MongoDB is a database that stores information as documents similar to JavaScript objects.",
  difficulty: "Easy",
  scenario: {
    question: "You are building a course website. The course title and price must still be available tomorrow. Why would you use MongoDB?",
    answer: "I can save each course as a document in MongoDB. The data stays in the database, so the application can read it again later.",
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
    title: "What Is MongoDB?",
    bigPicture:
      "MongoDB is a database that stores information as documents. A document looks similar to a JavaScript object. This makes it natural to store data such as users, products, courses, and orders.",
    codeSnippet: `// Illustrative MongoDB Document
{
  title: "JavaScript Basics",
  price: 500,
  isPublished: true
}`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Document structure",
        desc: "Information is grouped in key-value pairs, just like a JavaScript object.",
      },
      {
        title: "2. Data types",
        desc: "Fields hold familiar types: strings (\"JavaScript Basics\"), numbers (500), and booleans (true).",
      },
      {
        title: "3. Persistence",
        desc: "MongoDB stores this document permanently on disk so your app can retrieve it anytime.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & When to Use It",
    intro:
      "Your application needs a place to save data so it is still available after a user closes the page or the server restarts.",
    rule: {
      title: "Persistence & Document Model Rule",
      content:
        "Use MongoDB when your application needs to store and query document-shaped data. Choose a database based on the needs of the project; MongoDB is not automatically the best choice for every application.",
    },
    cards: [
      {
        number: "01",
        tag: "PERSISTENCE",
        title: "Persistent Storage",
        color: "emerald",
        description:
          "Memory in Node.js resets when the server restarts. MongoDB keeps your records safe on disk.",
      },
      {
        number: "02",
        tag: "DOCUMENT MODEL",
        title: "Natural Object Shape",
        color: "purple",
        description:
          "Stores documents directly matching the JSON-like objects already used in modern application code.",
      },
      {
        number: "03",
        tag: "SELECTION",
        title: "Deliberate Database Choice",
        color: "cyan",
        description:
          "Evaluate project requirements carefully. MongoDB is ideal for document data, but evaluate relational or cache stores where appropriate.",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Understanding how MongoDB fits into a production backend application:",
    points: [
      {
        title: "Course Catalog Storage",
        content:
          "When a platform creates a new course, it sends the course object to MongoDB. The database writes the document to disk and returns a confirmation.",
      },
      {
        title: "Surviving Restarts",
        content:
          "Even if the Node.js API server crashes or updates to a new version, all courses remain preserved in MongoDB ready to be queried on restart.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Relying on in-memory JavaScript variables or global arrays to store user data across requests.",
    bad: {
      title: "Storing Data in In-Memory Variables",
      code: `// Anti-pattern: in-memory state in application memory
const courses = [];

app.post('/api/courses', (req, res) => {
  courses.push(req.body); // Lost completely whenever the server restarts!
  res.json({ success: true });
});`,
      explanation:
        "In-memory arrays disappear the instant your process terminates or crashes, causing catastrophic data loss.",
    },
    good: {
      title: "Persisting Records in MongoDB",
      code: `// Best practice: write records to MongoDB collection
// mongosh illustrative command:
db.courses.insertOne({
  title: "JavaScript Basics",
  price: 500,
  isPublished: true
});
// Data is durable and safely persisted to disk.`,
      explanation:
        "MongoDB writes documents to permanent storage with transaction logging, guaranteeing durability.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. The code below simulates storing and reading course documents:",
    starterCode: `// Simulating MongoDB document storage
const database = {
  courses: []
};

function insertCourse(course) {
  const doc = { ...course, _id: "doc_" + Date.now() };
  database.courses.push(doc);
  return doc;
}

const savedCourse = insertCourse({
  title: "JavaScript Basics",
  price: 500,
  isPublished: true
});

console.log("Persisted course document:", savedCourse);
console.log("Database courses count:", database.courses.length);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "You are building a course website. The course title and price must still be available tomorrow. Why would you use MongoDB?",
      options: [
        "I can save each course as a document in MongoDB so the data stays in the database and the app can read it later.",
        "MongoDB automatically writes CSS styling for course pages so they display properly.",
        "JavaScript memory retains all data permanently across system reboots without a database.",
        "MongoDB replaces Node.js entirely so an application server is no longer needed.",
      ],
      correctIndex: 0,
      explanation:
        "MongoDB provides durable, persistent document storage so information is safely retained and queryable across restarts.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Document Database",
        desc: "MongoDB stores data in JSON-like documents, making it natural to represent application objects.",
      },
      {
        title: "Durable Persistence",
        desc: "Data saved in MongoDB survives server restarts, deployments, and page closures.",
      },
      {
        title: "Deliberate Tool Selection",
        desc: "Choose MongoDB when document-shaped data and queries fit your project requirements.",
      },
    ],
    nextLessonPreview: {
      title: "Lesson 2: Databases, Collections, Documents, and BSON",
      desc: "Learn how MongoDB organizes data into databases, collections, and documents using BSON data types.",
    },
  },
};

