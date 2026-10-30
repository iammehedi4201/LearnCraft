import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb05FindDocumentsContent: StandardLessonContent = {
  slug: "mdb05-find-documents",
  code: "MDB-05",
  title: "Find Documents",
  subtitle: "Query documents from a collection using find() for multiple results and findOne() for single matches.",
  difficulty: "Easy",
  scenario: {
    question: "A course details page needs to show one course using its title. Which method can you use?",
    answer: "Use `findOne()` with a title filter because the page needs one matching course.",
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
    title: "Find Documents",
    bigPicture:
      "Use `find()` to read documents from a collection. Use `findOne()` when you only need one matching document.",
    codeSnippet: `// Return all documents in collection (illustrative):
db.courses.find()

// Find one matching course by title:
db.courses.findOne({ title: "React Basics" })`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. The query filter",
        desc: "The object inside `findOne()` is the filter.",
      },
      {
        title: "2. Matching evaluation",
        desc: "MongoDB looks for a document whose `title` is `React Basics`.",
      },
      {
        title: "3. Result returned",
        desc: "It returns one matching document, or `null` when no document matches.",
      },
    ],
  },
  part2: {
    title: "Choosing find() vs findOne()",
    intro:
      "Use `find()` for a list of results and `findOne()` when one result is enough.",
    rule: {
      title: "Query Method Selection Rule",
      content:
        "`find()` returns a cursor pointing to multiple documents, whereas `findOne()` returns the single document object or null directly.",
    },
    cards: [
      {
        number: "01",
        tag: "CURSOR",
        title: "db.collection.find()",
        color: "emerald",
        description:
          "Returns a cursor to iterate over matching documents. An empty filter `{}` matches all documents.",
      },
      {
        number: "02",
        tag: "SINGLE",
        title: "db.collection.findOne()",
        color: "cyan",
        description:
          "Returns the first matching document found on disk, or null if no document matches the filter criteria.",
      },
      {
        number: "03",
        tag: "FILTER",
        title: "Filter Object",
        color: "purple",
        description:
          "Specify field-value pairs to restrict which documents are selected from storage.",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Understanding read patterns in web applications:",
    points: [
      {
        title: "Course Catalog Listing",
        content:
          "The `/courses` index page calls `db.courses.find()` to display a list of all available offerings.",
      },
      {
        title: "Single Course Details Page",
        content:
          "The `/courses/:title` route calls `db.courses.findOne({ title })` to render that specific course's description and pricing.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Using `find()` when your application expects a single document object, causing array/cursor mismatch bugs.",
    bad: {
      title: "Calling find() When Expecting an Object",
      code: `// Mistake in application code:
const course = await db.courses.find({ title: "React Basics" });
// In driver code, find() returns a Cursor, not a single document!
console.log(course.price); // undefined!`,
      explanation:
        "find() returns a cursor over a set of documents. To get a single document directly, use findOne().",
    },
    good: {
      title: "Using findOne() for Single Document Lookups",
      code: `// Best practice:
const course = await db.courses.findOne({ title: "React Basics" });
if (course) {
  console.log(course.price); // 600
}`,
      explanation:
        "findOne() directly resolves to the document or null, avoiding unnecessary array indexing.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. Below is a simulation of find and findOne filtering:",
    starterCode: `// Simulating find() and findOne() in JavaScript
const courses = [
  { _id: "1", title: "JavaScript Basics", price: 500 },
  { _id: "2", title: "React Basics", price: 600 },
  { _id: "3", title: "Node.js Basics", price: 700 }
];

function find(filter = {}) {
  return courses.filter(item => {
    return Object.entries(filter).every(([key, val]) => item[key] === val);
  });
}

function findOne(filter = {}) {
  return find(filter)[0] || null;
}

console.log("All courses:", find());
console.log("Single course by title:", findOne({ title: "React Basics" }));
console.log("Missing course:", findOne({ title: "CSS Basics" }));`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "A course details page needs to show one course using its title. Which method can you use?",
      options: [
        "Use `findOne()` with a title filter because the page needs one matching course.",
        "Use `db.dropDatabase()` to refresh the page.",
        "Use `insertMany()` to retrieve courses from MongoDB.",
        "Use `show dbs` with the course title.",
      ],
      correctIndex: 0,
      explanation:
        "Use `findOne()` with a filter matching the title when exactly one document is needed.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "find()",
        desc: "Returns a cursor over all documents matching the filter.",
      },
      {
        title: "findOne()",
        desc: "Returns a single document or null if no document matches.",
      },
      {
        title: "Filter Objects",
        desc: "Pass key-value objects like `{ title: 'React Basics' }` to find matching documents.",
      },
    ],
    nextLessonPreview: {
      title: "Lesson 6: Filter Documents with Query Operators",
      desc: "Go beyond exact matches with comparison operators like $gt, $lte, $in, and logical $and / $or.",
    },
  },
};

