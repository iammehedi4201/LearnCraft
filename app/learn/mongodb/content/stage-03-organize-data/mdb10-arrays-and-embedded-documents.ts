import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb10ArraysAndEmbeddedDocumentsContent: StandardLessonContent = {
  slug: "mdb10-arrays-and-embedded-documents",
  code: "MDB-10",
  title: "Arrays and Embedded Documents",
  subtitle: "Organize related data within documents using arrays and embedded subdocuments with dot notation.",
  difficulty: "Moderate",
  scenario: {
    question: "A course always displays its instructor's name and city. How could you store that information together?",
    answer: "Store an `instructor` object inside the course document. Then the course and instructor details can be read together.",
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
    title: "Arrays and Embedded Documents",
    bigPicture:
      "A MongoDB document can contain an array or another document. This lets you keep related information together.",
    codeSnippet: `// Document with array and embedded subdocument (illustrative):
{
  title: "MongoDB Basics",
  tags: ["database", "backend"],
  instructor: {
    name: "Rina",
    city: "Dhaka"
  }
}

// Find courses that have the "backend" tag:
db.courses.find({ tags: "backend" })

// Find courses taught by an instructor in Dhaka using dot notation:
db.courses.find({ "instructor.city": "Dhaka" })`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Array matching",
        desc: "`tags` contains an array, so MongoDB can match a value inside that array directly.",
      },
      {
        title: "2. Embedded document",
        desc: "`instructor` is a document inside the course document.",
      },
      {
        title: "3. Dot notation",
        desc: "Dot notation, such as `\"instructor.city\"`, lets you search a field inside the embedded document.",
      },
    ],
  },
  part2: {
    title: "When to Use Arrays & Embedded Documents",
    intro:
      "Use arrays for lists of related values and embedded documents for small pieces of information that are usually read with their parent document.",
    rule: {
      title: "Data Colocation Rule",
      content:
        "Embed data that is strictly bounded in size and always queried alongside its parent. Use quoted dot notation `\"parent.field\"` for querying and updating nested properties.",
    },
    cards: [
      {
        number: "01",
        tag: "ARRAYS",
        title: "Array Fields",
        color: "emerald",
        description:
          "Store lists of scalar values or lists of objects (e.g. tags, roles, variants). Queried directly without special syntax.",
      },
      {
        number: "02",
        tag: "NESTED",
        title: "Embedded Subdocuments",
        color: "cyan",
        description:
          "Nested objects grouped under a parent key. Keep related attributes like addresses or author profiles together.",
      },
      {
        number: "03",
        tag: "DOT NOTATION",
        title: "Quoted Dot Notation",
        color: "purple",
        description:
          "Always wrap nested paths in quotes (e.g. `\"address.city\": \"Dhaka\"`) when filtering or updating.",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Designing nested document structures in practical systems:",
    points: [
      {
        title: "Course Tags Filtering",
        content:
          "Finding courses tagged with 'backend': `db.courses.find({ tags: 'backend' })` automatically scans elements inside the `tags` array without requiring an explicit `$elemMatch` for simple scalar checks.",
      },
      {
        title: "Instructor Information Colocation",
        content:
          "When viewing a course, displaying the instructor's name and city doesn't require a second database query or join because it is embedded inside the course document.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Forgetting quotes around dot notation keys in query filters, causing JavaScript syntax errors.",
    bad: {
      title: "Unquoted Dot Notation in Query",
      code: `// SyntaxError in JavaScript / mongosh:
db.courses.find({
  instructor.city: "Dhaka" // Invalid JavaScript syntax without quotes!
});`,
      explanation:
        "In JavaScript object literals, property keys containing dots must be wrapped in quotes.",
    },
    good: {
      title: "Quoted Dot Notation Path",
      code: `// Valid syntax:
db.courses.find({
  "instructor.city": "Dhaka"
});`,
      explanation:
        "Wrapping `\"instructor.city\"` in quotes tells MongoDB to traverse the nested object path correctly.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. Below is a simulation of array and dot-notation querying:",
    starterCode: `// Simulating dot notation and array matching in JavaScript
const courses = [
  {
    title: "MongoDB Basics",
    tags: ["database", "backend"],
    instructor: { name: "Rina", city: "Dhaka" }
  },
  {
    title: "React Basics",
    tags: ["frontend", "javascript"],
    instructor: { name: "Tanvir", city: "Chittagong" }
  }
];

// 1. Find by array element
const backendCourses = courses.filter(c => c.tags.includes("backend"));
console.log("Courses with 'backend' tag:", backendCourses.map(c => c.title));

// 2. Find by embedded document field (dot notation)
const dhakaCourses = courses.filter(c => c.instructor?.city === "Dhaka");
console.log("Courses in Dhaka:", dhakaCourses.map(c => c.title));`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "A course always displays its instructor's name and city. How could you store that information together?",
      options: [
        "Store an `instructor` object inside the course document so the course and instructor details can be read together.",
        "Store the instructor name in the database name and the city in the collection name.",
        "Store all data in an external text file on the learner's desktop.",
        "Create a new database for every single instructor.",
      ],
      correctIndex: 0,
      explanation:
        "Storing an embedded `instructor` object colocates the instructor details inside the course document for efficient unified reads.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Arrays in Documents",
        desc: "MongoDB natively supports arrays and matches elements directly in query filters.",
      },
      {
        title: "Embedded Subdocuments",
        desc: "Store related attributes inside the parent document to eliminate unnecessary queries.",
      },
      {
        title: "Quoted Dot Notation",
        desc: "Use `\"parent.child\"` syntax with quotes to query and update nested properties.",
      },
    ],
    nextLessonPreview: {
      title: "Lesson 11: Embedding vs. Referencing Related Data",
      desc: "Learn how to choose between embedding and referencing based on access patterns and data growth.",
    },
  },
};

