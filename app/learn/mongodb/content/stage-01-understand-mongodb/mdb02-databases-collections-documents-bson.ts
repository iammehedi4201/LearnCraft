import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb02DatabasesCollectionsDocumentsBsonContent: StandardLessonContent = {
  slug: "mdb02-databases-collections-documents-and-bson",
  code: "MDB-02",
  title: "Databases, Collections, Documents, and BSON",
  subtitle: "Organize data hierarchically in databases, collections, and BSON documents with rich types.",
  difficulty: "Easy",
  scenario: {
    question: "A learner has a name, a list of skills, and an address. Can MongoDB store all of these in one document?",
    answer: "Yes. A document can contain normal fields, arrays, and other documents. This keeps related information together.",
  },
  interviewQuestion: {
    question: "What is the difference between a database, a collection, and a document?",
    answer: "A database contains collections. A collection contains documents. A document is one record made of fields and values.",
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
    title: "Databases, Collections, Documents, and BSON",
    bigPicture:
      "MongoDB organizes data in three main levels:\n\n- **Database:** Holds related collections.\n- **Collection:** Holds documents of a similar kind. It is roughly like a table in a relational database.\n- **Document:** One saved record, written as field-and-value pairs.\n\nThink of a database as a filing cabinet, a collection as a folder, and a document as one file inside that folder.",
    codeSnippet: `// Example BSON document (illustrative):
{
  _id: ObjectId("65a000000000000000000001"),
  name: "Rina",
  age: 24,
  skills: ["JavaScript", "React"],
  address: {
    city: "Dhaka",
    country: "Bangladesh"
  }
}`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. name and age",
        desc: "`name` and `age` are simple fields.",
      },
      {
        title: "2. skills array",
        desc: "`skills` is an array because one person can have several skills.",
      },
      {
        title: "3. address embedded document",
        desc: "`address` is a document inside another document. This is called an embedded document.",
      },
      {
        title: "4. _id primary key",
        desc: "`_id` identifies the document. MongoDB creates an `_id` automatically when you do not provide one.",
      },
    ],
  },
  part2: {
    title: "BSON & Organization Hierarchy",
    intro:
      "MongoDB stores documents in BSON, a binary format based on JSON that supports extra data types, such as ObjectId and dates.",
    rule: {
      title: "Three-Tier Organization Rule",
      content:
        "Databases contain collections, collections contain documents, and documents contain typed fields and values stored in BSON binary format.",
    },
    cards: [
      {
        number: "01",
        tag: "HIERARCHY",
        title: "Filing Cabinet Analogy",
        color: "emerald",
        description:
          "Database = filing cabinet. Collection = folder. Document = individual file inside that folder.",
      },
      {
        number: "02",
        tag: "BSON",
        title: "Binary JSON (BSON)",
        color: "cyan",
        description:
          "Extends JSON with high-performance binary encoding and native types like ObjectId, Date, and 64-bit integers.",
      },
      {
        number: "03",
        tag: "IDENTIFIER",
        title: "Automatic _id",
        color: "purple",
        description:
          "Every document requires an `_id`. MongoDB generates a unique 12-byte ObjectId if you don't supply one.",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Understanding how MongoDB documents represent rich application entities:",
    points: [
      {
        title: "Unified Student Record",
        content:
          "In relational databases, storing Rina's skills and address would require 3 tables and foreign keys. In MongoDB, it is stored cleanly in a single document.",
      },
      {
        title: "BSON Serialization",
        content:
          "When you query MongoDB, the driver converts BSON bytes back into native JavaScript objects seamlessly.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Confusing MongoDB collections with relational tables or treating documents as plain strings without types.",
    bad: {
      title: "Storing Nested Information as Stringified JSON",
      code: `// Anti-pattern: stringifying nested structures
{
  name: "Rina",
  address: "{\\"city\\": \\"Dhaka\\", \\"country\\": \\"Bangladesh\\"}"
}`,
      explanation:
        "MongoDB cannot query or index fields inside a raw string without parsing the entire string.",
    },
    good: {
      title: "Storing Nested Structures as Embedded Documents",
      code: `// Best practice: native embedded documents and arrays
{
  name: "Rina",
  skills: ["JavaScript", "React"],
  address: {
    city: "Dhaka",
    country: "Bangladesh"
  }
}`,
      explanation:
        "Embedded documents preserve native BSON types and allow precise dot notation querying like address.city.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. Below is a simulation of the Database -> Collection -> Document hierarchy:",
    starterCode: `// Simulating MongoDB hierarchy in JavaScript
const learncraftDb = {
  name: "learncraft",
  collections: {
    learners: [
      {
        _id: "65a000000000000000000001",
        name: "Rina",
        age: 24,
        skills: ["JavaScript", "React"],
        address: { city: "Dhaka", country: "Bangladesh" }
      }
    ]
  }
};

const learner = learncraftDb.collections.learners[0];
console.log("Learner name:", learner.name);
console.log("Skills array:", learner.skills);
console.log("Embedded address:", learner.address.city);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "What is the difference between a database, a collection, and a document in MongoDB?",
      options: [
        "A database contains collections. A collection contains documents. A document is one record made of fields and values.",
        "A document contains collections, which contain databases.",
        "A collection is an in-memory variable, while a database is stored in an HTML file.",
        "Databases, collections, and documents are identical synonyms in MongoDB.",
      ],
      correctIndex: 0,
      explanation:
        "MongoDB data is organized hierarchically: Databases contain collections, collections contain documents, and documents contain fields and values.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Three Levels of Data",
        desc: "Database -> Collection -> Document represents the core MongoDB storage structure.",
      },
      {
        title: "Rich BSON Types",
        desc: "BSON provides support for native ObjectIds, dates, embedded subdocuments, and arrays.",
      },
      {
        title: "Colocated Information",
        desc: "Embedding related attributes together avoids complex joins for natural entity structures.",
      },
    ],
    nextLessonPreview: {
      title: "Lesson 3: Working with MongoDB Using mongosh",
      desc: "Learn practical commands in mongosh to navigate databases, inspect collections, and query documents.",
    },
  },
};

