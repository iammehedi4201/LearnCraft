import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb17CombineDataWithLookupContent: StandardLessonContent = {
  slug: "mdb17-combine-data-with-lookup",
  code: "MDB-17",
  title: "Combine Data with $lookup",
  subtitle: "Join documents across collections within aggregation pipelines using $lookup stages.",
  difficulty: "Moderate",
  scenario: {
    question: "An order list needs to show the customer's name, but customer details are stored separately. What can you use?",
    answer: "Use `$lookup` to match each order's `customerId` with the customer's `_id` and include the matching customer data in the result.",
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
    title: "Combine Data with $lookup",
    bigPicture:
      "Sometimes related information is stored in separate collections. `$lookup` lets an aggregation pipeline match documents from another collection, similar to a join.\n\nSuppose `orders` documents contain a `customerId`, while customer details are stored in a `customers` collection.",
    codeSnippet: `// Join orders with matching customer documents (illustrative):
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customer"
    }
  }
])`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. from",
        desc: "`from` names the collection to search: `\"customers\"`.",
      },
      {
        title: "2. localField",
        desc: "`localField` is the field in the current order document (`\"customerId\"`).",
      },
      {
        title: "3. foreignField",
        desc: "`foreignField` is the matching field in the customer document (`\"_id\"`).",
      },
      {
        title: "4. as",
        desc: "`as` names the new field that will contain the matches (`\"customer\"`).",
      },
      {
        title: "5. Result array",
        desc: "The result includes a `customer` array with matching customer documents.",
      },
    ],
  },
  part2: {
    title: "When to Use $lookup Joins",
    intro:
      "`$lookup` is useful when you need related data from another collection. It does not mean every relationship should be stored separately; choose embedding or referencing based on how the application uses the data.",
    rule: {
      title: "Prudent Join Rule",
      content:
        "Index the `foreignField` in the target collection to ensure `$lookup` stages perform indexed joins rather than full collection scans. Prefer embedding for data that is always accessed together.",
    },
    cards: [
      {
        number: "01",
        tag: "JOIN",
        title: "Left Outer Join",
        color: "emerald",
        description:
          "`$lookup` behaves like an SQL LEFT OUTER JOIN: documents without matches receive an empty array `[]` in the `as` field.",
      },
      {
        number: "02",
        tag: "INDEXING",
        title: "Foreign Field Index",
        color: "cyan",
        description:
          "The collection named in `from` MUST have an index on `foreignField` to avoid O(N × M) nested scan overhead.",
      },
      {
        number: "03",
        tag: "PRAGMATISM",
        title: "Embed vs Join",
        color: "purple",
        description:
          "Embedding avoids joins completely. Use `$lookup` when data is referenced for scalability or multi-entity sharing.",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Enriching documents across collections in reporting queries:",
    points: [
      {
        title: "Order List with Customer Details",
        content:
          "Matching `orders.customerId` with `customers._id` produces enriched order documents displaying customer names and contact emails in admin order tables.",
      },
      {
        title: "Course Catalog with Instructor Bios",
        content:
          "Courses referencing `instructorId` join with the `instructors` collection to show instructor credentials on course landing pages.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Missing an index on the `foreignField` in the joined collection, causing disastrous query slow-downs on large datasets.",
    bad: {
      title: "Unindexed $lookup Joins",
      code: `// Danger: customers collection has NO index on customerId!
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "externalRefId", // Not indexed!
      as: "customer"
    }
  }
]); // MongoDB runs a full COLLSCAN of customers for EVERY single order!`,
      explanation:
        "Without an index on `foreignField`, MongoDB performs a full collection scan of the target collection for every document in the source collection.",
    },
    good: {
      title: "Joining on Indexed Key (_id or Indexed Field)",
      code: `// Ensure target collection field is indexed (e.g. _id):
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id", // _id is always indexed!
      as: "customer"
    }
  }
]);`,
      explanation:
        "Joining against `_id` or an indexed key allows MongoDB to use fast B-tree lookups for every join operation.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. Below is a simulation of the $lookup join mechanism:",
    starterCode: `// Simulating MongoDB $lookup in JavaScript
const orders = [
  { _id: "ord_1", customerId: "usr_101", amount: 250 },
  { _id: "ord_2", customerId: "usr_102", amount: 120 }
];

const customers = [
  { _id: "usr_101", name: "Sarah Ahmed", city: "Dhaka" },
  { _id: "usr_102", name: "David Kim", city: "Chittagong" }
];

function lookup(sourceList, targetList, localKey, foreignKey, asField) {
  return sourceList.map(item => {
    const matches = targetList.filter(t => t[foreignKey] === item[localKey]);
    return {
      ...item,
      [asField]: matches
    };
  });
}

const joinedOrders = lookup(orders, customers, "customerId", "_id", "customer");
console.log("Enriched Orders:", JSON.stringify(joinedOrders, null, 2));`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "An order list needs to show the customer's name, but customer details are stored separately. What can you use in MongoDB?",
      options: [
        "Use `$lookup` to match each order's `customerId` with the customer's `_id` and include the matching customer data in the result.",
        "Delete the customers collection and duplicate all names manually.",
        "MongoDB cannot combine data from two collections under any circumstances.",
        "Run `dropDatabase()` before querying orders.",
      ],
      correctIndex: 0,
      explanation:
        "The `$lookup` aggregation stage performs an equality join between two collections, appending matched records into a new array field.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "$lookup Stage",
        desc: "Joins data across collections using `from`, `localField`, `foreignField`, and `as`.",
      },
      {
        title: "Array Output",
        desc: "Matches are returned in an array field (e.g. `customer: [...]`), even for 1-to-1 matches.",
      },
      {
        title: "Index Requirement",
        desc: "Always index the `foreignField` in the target collection for acceptable join performance.",
      },
    ],
    nextLessonPreview: {
      title: "Lesson 18: Atomic Updates and Transactions",
      desc: "Begin Part 5: Keep Data Correct and Safe by understanding single-document atomicity and multi-document ACID transactions.",
    },
  },
};

