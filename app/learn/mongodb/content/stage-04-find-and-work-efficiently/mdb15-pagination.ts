import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb15PaginationContent: StandardLessonContent = {
  slug: "mdb15-pagination",
  code: "MDB-15",
  title: "Pagination",
  subtitle: "Paginate large result sets with skip() / limit() and high-performance range-based keyset pagination.",
  difficulty: "Moderate",
  scenario: {
    question: "Your admin page has thousands of courses. Should it load every course at once?",
    answer: "No. It should load a small page of courses at a time. For very large result sets, range-based pagination can be more efficient than skipping many documents.",
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
    title: "Pagination",
    bigPicture:
      "Pagination means returning a large list in smaller groups instead of sending every document at once.\n\nFor a simple page-number approach, use `skip()` and `limit()`:\n\nFor very large collections, range-based pagination using the last seen ID is significantly faster.",
    codeSnippet: `// Approach 1: Offset pagination with skip() & limit() (illustrative):
db.courses
  .find()
  .sort({ _id: 1 })
  .skip(20)
  .limit(10)

// Approach 2: Range-based pagination using last seen ID:
db.courses
  .find({ _id: { $gt: lastSeenId } })
  .sort({ _id: 1 })
  .limit(10)`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Stable sort order",
        desc: "`sort({ _id: 1 })` gives the results a consistent order.",
      },
      {
        title: "2. skip(20)",
        desc: "`skip(20)` skips the first 20 documents.",
      },
      {
        title: "3. limit(10)",
        desc: "`limit(10)` returns the next 10 documents.",
      },
      {
        title: "4. Range-based indexing",
        desc: "`{ _id: { $gt: lastSeenId } }` jumps directly past earlier results without having to traverse discarded records.",
      },
    ],
  },
  part2: {
    title: "Offset vs Range-Based Pagination",
    intro:
      "Large `skip()` values can become slower because MongoDB still has to move past earlier results. For large collections, range-based pagination is often better. Use a stable sort field and a matching query/index for your real data.",
    rule: {
      title: "Pagination Architecture Rule",
      content:
        "Use `skip()` and `limit()` for small collections and direct page jumping. Switch to range-based (keyset) pagination `{ field: { $gt: lastSeen } }` when scaling past thousands of documents or infinite scrolling.",
    },
    cards: [
      {
        number: "01",
        tag: "OFFSET",
        title: "skip() + limit()",
        color: "emerald",
        description:
          "Simple to implement. Supports direct page jumping ('Go to page 5'). Becomes linear O(N) as offset increases.",
      },
      {
        number: "02",
        tag: "RANGE",
        title: "Range-Based Keyset",
        color: "cyan",
        description:
          "Constant O(1) indexed jump using `{ _id: { $gt: lastSeenId } }`. Ideal for infinite feeds and large catalogs.",
      },
      {
        number: "03",
        tag: "DETERMINISTIC",
        title: "Deterministic Sort",
        color: "purple",
        description:
          "Always sort by a unique key (such as `_id`) to ensure documents never appear duplicated or missed across page boundaries.",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Implementing pagination in real API routes:",
    points: [
      {
        title: "E-Commerce Catalog Pages",
        content:
          "A store catalog displaying 24 items per page calculates `skip: (page - 1) * 24` and `limit: 24`, allowing buyers to jump directly to page 3.",
      },
      {
        title: "Social Activity Feed",
        content:
          "Infinite scrolling feeds send the `lastSeenId` from the bottom of the feed: `{ _id: { $lt: oldestSeenId } }` grabs the next chunk instantly.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Skipping hundreds of thousands of documents using `skip(500000)`, causing MongoDB to scan all half-million records before returning 10.",
    bad: {
      title: "Massive skip() on Large Collections",
      code: `// Severe performance penalty:
db.logs
  .find()
  .sort({ createdAt: -1 })
  .skip(250000) // MongoDB must traverse all 250,000 index entries!
  .limit(20);`,
      explanation:
        "Large skips force MongoDB to read and discard hundreds of thousands of entries, creating high latency.",
    },
    good: {
      title: "Range-Based Seek with Index",
      code: `// Fast seek using last timestamp / ID:
db.logs
  .find({ createdAt: { $lt: lastSeenTimestamp } })
  .sort({ createdAt: -1 })
  .limit(20); // Jumps directly via B-tree index!`,
      explanation:
        "The B-tree index navigates directly to `lastSeenTimestamp` in O(log N) time, ignoring earlier documents entirely.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. Below is a simulation of offset and range-based pagination:",
    starterCode: `// Simulating offset vs keyset pagination in JavaScript
const items = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: "Item #" + (i + 1)
}));

// 1. Offset Pagination: Page 3 with pageSize 5
const pageSize = 5;
const page = 3;
const offsetPage = items.slice((page - 1) * pageSize, page * pageSize);
console.log("Offset Pagination (Page 3):", offsetPage);

// 2. Keyset / Range Pagination: Fetch 5 items after id = 10
const lastSeenId = 10;
const keysetPage = items.filter(i => i.id > lastSeenId).slice(0, pageSize);
console.log("Keyset Pagination (after id 10):", keysetPage);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Your admin page has thousands of courses. Should it load every course at once?",
      options: [
        "No. It should load a small page of courses at a time. For very large result sets, range-based pagination can be more efficient than skipping many documents.",
        "Yes, always load all thousands of records into browser memory in a single unpaginated request.",
        "No, admin pages can only display exactly one course per month.",
        "Yes, because MongoDB has no way to limit query results.",
      ],
      correctIndex: 0,
      explanation:
        "Paginating results reduces payload sizes and memory consumption, with range-based pagination providing optimal performance for large result sets.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "skip() and limit()",
        desc: "Ideal for smaller datasets and traditional page-numbered user interfaces.",
      },
      {
        title: "Range-Based Keyset",
        desc: "Use `{ field: { $gt: lastSeen } }` for large collections and infinite scroll patterns.",
      },
      {
        title: "Stable Sort Keys",
        desc: "Always pair pagination with a deterministic sort (e.g. `{ _id: 1 }`).",
      },
    ],
    nextLessonPreview: {
      title: "Lesson 16: Aggregation Pipeline",
      desc: "Transform, group, and calculate analytical insights using multi-stage aggregation pipelines.",
    },
  },
};

