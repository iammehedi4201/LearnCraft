import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb06FilterDocumentsWithQueryOperatorsContent: StandardLessonContent = {
  slug: "mdb06-filter-documents-with-query-operators",
  code: "MDB-06",
  title: "Filter Documents with Query Operators",
  subtitle: "Filter collections using comparison ($gt, $gte, $lt, $lte, $in) and logical operators ($and, $or).",
  difficulty: "Moderate",
  scenario: {
    question: "A learner wants to see published courses that cost less than 1,000. How can you find them?",
    answer: "Use a filter with `isPublished: true` and `price: { $lt: 1000 }`. MongoDB returns courses that meet both conditions.",
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
    title: "Filter Documents with Query Operators",
    bigPicture:
      "A filter tells MongoDB which documents you want. Query operators let you search using conditions instead of exact matches only.\n\nExample: find courses that cost at least 500.",
    codeSnippet: `// Illustrative query with comparison operator:
db.courses.find({
  price: { $gte: 500 }
})

// Combined implicit AND condition:
db.courses.find({
  isPublished: true,
  price: { $lt: 1000 }
})`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. The field to check",
        desc: "`price` is the field MongoDB checks.",
      },
      {
        title: "2. The operator $gte",
        desc: "`$gte` means \"greater than or equal to\".",
      },
      {
        title: "3. Results matched",
        desc: "MongoDB returns documents where `price` is 500 or more.",
      },
      {
        title: "4. Implicit AND",
        desc: "When you put multiple fields in one filter object, MongoDB applies an AND condition: all those conditions must match.",
      },
    ],
  },
  part2: {
    title: "Core Comparison & Logical Operators",
    intro:
      "MongoDB supports a rich set of query operators prefixed with `$` to construct flexible search conditions.",
    rule: {
      title: "Query Operator Syntax Rule",
      content:
        "Field-level comparison operators take the shape `{ field: { $operator: value } }`. Compound conditions use `{ $and: [...] }` or `{ $or: [...] }`.",
    },
    cards: [
      {
        number: "01",
        tag: "COMPARISON",
        title: "$gt / $gte / $lt / $lte",
        color: "emerald",
        description:
          "Greater than ($gt), greater or equal ($gte), less than ($lt), less or equal ($lte) for numbers and dates.",
      },
      {
        number: "02",
        tag: "SET",
        title: "$in & $ne",
        color: "cyan",
        description:
          "`$in` matches any value in a list (e.g. `{ category: { $in: ['web', 'backend'] } }`). `$ne` matches not equal.",
      },
      {
        number: "03",
        tag: "LOGIC",
        title: "$and & $or",
        color: "purple",
        description:
          "`$or` matches if at least one condition is true. Multiple fields in an object apply implicit `$and`.",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Constructing queries for search filters in web stores:",
    points: [
      {
        title: "Budget Pricing Filter",
        content:
          "Filtering for affordable courses: `db.courses.find({ price: { $gte: 200, $lte: 800 } })` finds records between 200 and 800 inclusive.",
      },
      {
        title: "Multi-Category Search",
        content:
          "Finding courses in multiple categories: `db.courses.find({ category: { $in: ['javascript', 'database'] } })` efficiently queries across categories.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Forgetting the `$` prefix on operators or using JavaScript comparison operators like `>=` instead of `$gte`.",
    bad: {
      title: "Using Raw JavaScript Comparison Operators",
      code: `// Mistake: MongoDB queries use BSON query operators, not JS expressions!
db.courses.find({
  price >= 500 // SyntaxError!
});`,
      explanation:
        "MongoDB query filters are plain BSON objects and require operators like `$gte`.",
    },
    good: {
      title: "Using MongoDB Query Operators",
      code: `// Correct: use $gte operator inside a filter object
db.courses.find({
  price: { $gte: 500 }
});`,
      explanation:
        "`{ price: { $gte: 500 } }` correctly instructs the query engine to evaluate the condition.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. The snippet below simulates MongoDB query operator filtering:",
    starterCode: `// Simulating MongoDB comparison operators
const courses = [
  { title: "HTML Basics", price: 300, isPublished: true },
  { title: "React Basics", price: 600, isPublished: true },
  { title: "Node.js Basics", price: 700, isPublished: false },
  { title: "MongoDB Basics", price: 1200, isPublished: true }
];

// Query: isPublished: true AND price < 1000
const filteredCourses = courses.filter(course => {
  const matchesPublished = course.isPublished === true;
  const matchesPrice = course.price < 1000; // Simulating { $lt: 1000 }
  return matchesPublished && matchesPrice;
});

console.log("Published courses under 1000:", filteredCourses);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "A learner wants to see published courses that cost less than 1,000. How can you find them?",
      options: [
        "Use a filter with `isPublished: true` and `price: { $lt: 1000 }`. MongoDB returns courses that meet both conditions.",
        "Use `db.courses.deleteMany({ price: 1000 })`.",
        "Use `db.courses.find({ price: 'less than 1000' })` with plain English strings.",
        "Use `show collections` with `isPublished: true`.",
      ],
      correctIndex: 0,
      explanation:
        "Combining `isPublished: true` with `price: { $lt: 1000 }` in a filter object applies an AND condition matching courses meeting both requirements.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Comparison Operators",
        desc: "Use `$gt`, `$gte`, `$lt`, `$lte`, and `$ne` to compare values.",
      },
      {
        title: "List Membership with $in",
        desc: "Use `{ field: { $in: [...] } }` to match any value in a list.",
      },
      {
        title: "Implicit AND",
        desc: "Multiple fields within the same filter object must all match by default.",
      },
    ],
    nextLessonPreview: {
      title: "Lesson 7: Choose Fields, Sort Results, and Limit Results",
      desc: "Shape query results with projections, ascending/descending sorting, and result limits.",
    },
  },
};

