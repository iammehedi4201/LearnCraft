import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb07ChooseFieldsSortResultsAndLimitResultsContent: StandardLessonContent = {
  slug: "mdb07-choose-fields-sort-results-and-limit-results",
  code: "MDB-07",
  title: "Choose Fields, Sort Results, and Limit Results",
  subtitle: "Optimize query payloads using projections (1/0), sorting (1/-1), and result limiting.",
  difficulty: "Moderate",
  scenario: {
    question: "A course list should show only the course title and price, with the cheapest courses first. What should you use?",
    answer: "Use projection to select the title and price, then sort by price in ascending order.",
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
    title: "Choose Fields, Sort Results, and Limit Results",
    bigPicture:
      "Sometimes you do not need every field or every document. MongoDB lets you choose fields, sort results, and limit the number of results.",
    codeSnippet: `// Choose fields with projection (illustrative):
db.courses.find(
  {},
  { title: 1, price: 1, _id: 0 }
)

// Sort results (1 = ascending, -1 = descending):
db.courses.find().sort({ price: 1 })

// Limit results:
db.courses.find().limit(5)

// Combined query:
db.courses
  .find({}, { title: 1, price: 1 })
  .sort({ price: 1 })
  .limit(5)`,
    breakdownTitle: "How it works",
    breakdownItems: [
      {
        title: "1. Projection argument",
        desc: "The second argument to `find()` is the projection. `1` includes a field and `0` excludes it. MongoDB includes `_id` by default, so `_id: 0` explicitly hides it.",
      },
      {
        title: "2. sort({ field: 1 / -1 })",
        desc: "`1` sorts from low to high. `-1` sorts from high to low.",
      },
      {
        title: "3. limit(n)",
        desc: "Restricts the cursor to return at most `n` documents.",
      },
    ],
  },
  part2: {
    title: "When to Use Projection, Sort, and Limit",
    intro:
      "Use projection when the page needs only a few fields, sorting when results need an order, and limiting when you only want a small number of results.",
    rule: {
      title: "Payload & Cursor Shaping Rule",
      content:
        "Never transfer unneeded fields over the network. Always apply projections to minimize bandwidth and memory usage, and combine with explicit sort and limit.",
    },
    cards: [
      {
        number: "01",
        tag: "PROJECTION",
        title: "Projection (1 and 0)",
        color: "emerald",
        description:
          "Pick exact fields to return. You cannot mix 1 and 0 in the same projection, except for suppressing `_id: 0`.",
      },
      {
        number: "02",
        tag: "ORDER",
        title: "Sorting Direction",
        color: "cyan",
        description:
          "`1` specifies ascending (lowest first, A-Z), `-1` specifies descending (highest first, Z-A).",
      },
      {
        number: "03",
        tag: "BANDWIDTH",
        title: "Limiting Count",
        color: "purple",
        description:
          "`limit(5)` caps the returned documents, preventing queries from accidentally returning hundreds of thousands of records.",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Building performant API endpoints with MongoDB query modifiers:",
    points: [
      {
        title: "Cheapest Courses Widget",
        content:
          "A homepage carousel displays the 5 cheapest courses: `db.courses.find({}, { title: 1, price: 1 }).sort({ price: 1 }).limit(5)` fetches exactly what's needed.",
      },
      {
        title: "Omitting Large Binary or Text Fields",
        content:
          "If course documents contain full lesson transcripts or large embedded metadata, project `{ transcript: 0 }` so summary cards load rapidly.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Mixing 1 and 0 in a projection object (e.g. `{ title: 1, description: 0 }`), which triggers a MongoDB projection error.",
    bad: {
      title: "Mixing Inclusion and Exclusion (except _id)",
      code: `// Error in MongoDB:
db.courses.find({}, {
  title: 1,
  description: 0 // Cannot mix inclusion and exclusion!
});`,
      explanation:
        "MongoDB projections must be either entirely inclusive (1s) or entirely exclusive (0s), with the sole exception of `_id: 0`.",
    },
    good: {
      title: "Using Pure Inclusion with Optional _id Suppression",
      code: `// Valid: inclusion projection
db.courses.find({}, {
  title: 1,
  price: 1,
  _id: 0 // Allowed exception: suppressing _id in inclusion projection
});`,
      explanation:
        "This cleanly returns only `title` and `price`, omitting `_id` and all other fields.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. Below is a simulation of projection, sorting, and limiting:",
    starterCode: `// Simulating projection, sorting, and limiting in JavaScript
const courses = [
  { _id: "1", title: "Node.js Basics", price: 700, internalNotes: "Draft" },
  { _id: "2", title: "HTML Basics", price: 300, internalNotes: "Reviewed" },
  { _id: "3", title: "React Basics", price: 600, internalNotes: "Pending" },
  { _id: "4", title: "MongoDB Basics", price: 800, internalNotes: "Active" }
];

// Sort by price ascending, limit to top 2, and project only title and price:
const results = courses
  .slice()
  .sort((a, b) => a.price - b.price) // sort({ price: 1 })
  .slice(0, 2)                      // limit(2)
  .map(c => ({ title: c.title, price: c.price })); // projection: { title: 1, price: 1, _id: 0 }

console.log("Top 2 cheapest courses (projected):", results);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "A course list should show only the course title and price, with the cheapest courses first. What should you use?",
      options: [
        "Use projection to select the title and price, then sort by price in ascending order.",
        "Use `db.dropDatabase()` to reset pricing.",
        "Use `insertMany()` with price set to 0.",
        "Use `deleteOne()` on all courses that have a price.",
      ],
      correctIndex: 0,
      explanation:
        "Projection `{ title: 1, price: 1 }` returns only the required fields, and `.sort({ price: 1 })` orders from lowest to highest price.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Projection",
        desc: "Use `{ field: 1 }` to include or `{ field: 0 }` to exclude fields. `_id` is included unless explicitly set to 0.",
      },
      {
        title: "Sorting",
        desc: "Use `.sort({ field: 1 })` for ascending or `.sort({ field: -1 })` for descending order.",
      },
      {
        title: "Limiting",
        desc: "Use `.limit(n)` to cap response payloads to a specific maximum count.",
      },
    ],
    nextLessonPreview: {
      title: "Lesson 8: Update Documents",
      desc: "Learn how to update documents in-place using updateOne(), updateMany(), $set, and $inc.",
    },
  },
};

