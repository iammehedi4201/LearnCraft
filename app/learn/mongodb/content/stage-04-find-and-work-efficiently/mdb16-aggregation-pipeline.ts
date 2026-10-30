import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb16AggregationPipelineContent: StandardLessonContent = {
  slug: "mdb16-aggregation-pipeline",
  code: "MDB-16",
  title: "Aggregation Pipeline",
  subtitle: "Transform, group, aggregate, and calculate analytical insights through multi-stage pipelines.",
  difficulty: "Difficult",
  scenario: {
    question: "A shop owner wants to see total sales for each product category. What MongoDB feature can help?",
    answer: "Use an aggregation pipeline. Filter the orders if needed, group them by category, and use `$sum` to calculate total sales.",
  },
  interviewQuestion: {
    question: "What is an aggregation pipeline?",
    answer: "It is a series of stages. Each stage processes documents and passes the result to the next stage. It is useful for filtering, grouping, calculating, and reshaping data.",
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
    title: "Aggregation Pipeline",
    bigPicture:
      "An aggregation pipeline processes documents in stages. Each stage receives documents, does one job, and passes its results to the next stage.\n\nFor example, imagine an `orders` collection. You want to find how much each customer has spent on paid orders.",
    codeSnippet: `// Aggregate total spent per customer for paid orders (illustrative):
db.orders.aggregate([
  { $match: { status: "paid" } },
  {
    $group: {
      _id: "$customerId",
      totalSpent: { $sum: "$amount" }
    }
  },
  { $sort: { totalSpent: -1 } }
])`,
    breakdownTitle: "Understand each stage",
    breakdownItems: [
      {
        title: "1. $match",
        desc: "`$match`: Keeps only orders where `status` is `paid`.",
      },
      {
        title: "2. $group",
        desc: "`$group`: Groups those orders by `customerId`.",
      },
      {
        title: "3. $sum",
        desc: "`$sum`: Adds the `amount` values for each customer.",
      },
      {
        title: "4. $sort",
        desc: "`$sort`: Places customers with the highest total first. `-1` means descending order.",
      },
    ],
  },
  part2: {
    title: "When to Use Aggregation",
    intro:
      "The pipeline does not change the saved orders in this example. It returns calculated results. Other useful stages include `$project` to choose or calculate fields and `$limit` to keep only a certain number of results. Learn these when a query needs them; you do not need to memorize every stage.",
    rule: {
      title: "Assembly Line Pipeline Rule",
      content:
        "Think of aggregation as an assembly line: each stage receives documents, transforms or reduces them, and streams the output to the next stage. Place `$match` as early as possible to reduce document volume before grouping.",
    },
    cards: [
      {
        number: "01",
        tag: "FILTER",
        title: "$match Stage",
        color: "emerald",
        description:
          "Filters documents early using standard query operators so subsequent stages process fewer documents.",
      },
      {
        number: "02",
        tag: "GROUP",
        title: "$group Stage",
        color: "cyan",
        description:
          "Groups documents by a key (`_id: '$field'`) and computes accumulator metrics like `$sum`, `$avg`, `$min`, `$max`.",
      },
      {
        number: "03",
        tag: "RESHAPE",
        title: "$project & $sort",
        color: "purple",
        description:
          "Reshapes output fields and orders the resulting computed documents without altering source data.",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Computing analytics and financial summaries in production:",
    points: [
      {
        title: "Sales by Product Category",
        content:
          "Filtering paid orders and grouping by category: `{ $group: { _id: '$category', totalSales: { $sum: '$price' }, count: { $sum: 1 } } }` generates executive dashboards.",
      },
      {
        title: "Customer Lifetime Value",
        content:
          "Calculating total spend per user and sorting descending gives the top spending VIP customers immediately.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Placing `$group` before `$match`, forcing the database to group the entire collection in memory before filtering.",
    bad: {
      title: "Grouping Before Matching",
      code: `// Inefficient pipeline: grouping 1,000,000 orders first
db.orders.aggregate([
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } },
  { $match: { total: { $gt: 500 } } } // Misses opportunity to filter paid orders early!
]);`,
      explanation:
        "Processing unneeded documents in `$group` exhausts memory limits and degrades query speed.",
    },
    good: {
      title: "Filtering Early with $match",
      code: `// Optimized: filter down to relevant records immediately
db.orders.aggregate([
  { $match: { status: "paid" } }, // Cuts down dataset immediately!
  { $group: { _id: "$customerId", totalSpent: { $sum: "$amount" } } },
  { $sort: { totalSpent: -1 } }
]);`,
      explanation:
        "Early `$match` allows MongoDB to use indexes and minimizes the volume of documents piped to memory-intensive stages.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. Below is a simulation of the $match -> $group -> $sort aggregation pipeline:",
    starterCode: `// Simulating MongoDB aggregation pipeline in JavaScript
const orders = [
  { customerId: "Alice", amount: 150, status: "paid" },
  { customerId: "Bob", amount: 200, status: "pending" },
  { customerId: "Alice", amount: 250, status: "paid" },
  { customerId: "Charlie", amount: 300, status: "paid" }
];

// Stage 1: $match { status: "paid" }
const matched = orders.filter(o => o.status === "paid");

// Stage 2: $group { _id: "$customerId", totalSpent: { $sum: "$amount" } }
const groupedMap = {};
for (const o of matched) {
  groupedMap[o.customerId] = (groupedMap[o.customerId] || 0) + o.amount;
}
const grouped = Object.entries(groupedMap).map(([id, total]) => ({ _id: id, totalSpent: total }));

// Stage 3: $sort { totalSpent: -1 }
grouped.sort((a, b) => b.totalSpent - a.totalSpent);

console.log("Pipeline result:", grouped);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is an aggregation pipeline in MongoDB?",
      options: [
        "It is a series of stages where each stage processes documents and passes the result to the next stage, useful for filtering, grouping, calculating, and reshaping data.",
        "It is a network cable connecting two physical MongoDB servers.",
        "It is an HTML form for creating new database accounts.",
        "It is a command that permanently deletes all duplicate records without backup.",
      ],
      correctIndex: 0,
      explanation:
        "An aggregation pipeline is an ordered series of operations (stages) that process documents and stream the transformed or calculated results to the next stage.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Stage Pipeline Model",
        desc: "Documents stream through sequential stages like `$match`, `$group`, `$sort`, and `$project`.",
      },
      {
        title: "Early Filtering",
        desc: "Place `$match` stages as early as possible to leverage indexes and reduce working set memory.",
      },
      {
        title: "Calculated Analytics",
        desc: "Pipelines calculate totals, averages, and group metrics without mutating original stored documents.",
      },
    ],
    nextLessonPreview: {
      title: "Lesson 17: Combine Data with $lookup",
      desc: "Learn how to join related data across separate collections within an aggregation pipeline.",
    },
  },
};

