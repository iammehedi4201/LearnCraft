import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb08UpdateDocumentsContent: StandardLessonContent = {
  slug: "mdb08-update-documents",
  code: "MDB-08",
  title: "Update Documents",
  subtitle: "Modify documents atomically using updateOne(), updateMany(), $set, $unset, and $inc.",
  difficulty: "Moderate",
  scenario: {
    question: "A course price changes, but its title and description must stay the same. How should you update it?",
    answer: "Use `updateOne()` with a filter that identifies the course and `$set` only the price field. The other fields remain unchanged.",
  },
  interviewQuestion: {
    question: "What is the difference between $set and replacing a document?",
    answer: "$set changes the fields you name and keeps other fields. Replacing a document replaces the document's fields with the new document, apart from the _id rules.",
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
    title: "Update Documents",
    bigPicture:
      "Use `updateOne()` to change one matching document and `updateMany()` to change all matching documents.",
    codeSnippet: `// Update one document with $set (illustrative):
db.courses.updateOne(
  { title: "React Basics" },
  { $set: { price: 750 } }
)

// Increment a counter with $inc:
db.courses.updateOne(
  { title: "React Basics" },
  { $inc: { enrolledCount: 1 } }
)`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Match filter",
        desc: "The first object finds the course to change.",
      },
      {
        title: "2. The $set operator",
        desc: "`$set` changes the `price` field to `750`.",
      },
      {
        title: "3. Unaltered fields",
        desc: "Other fields stay as they are.",
      },
      {
        title: "4. The $inc operator",
        desc: "`$inc` increments or decrements numeric values atomically without race conditions.",
      },
    ],
  },
  part2: {
    title: "Update Operators & Safety Rules",
    intro:
      "Useful update operators include:\n- `$set`: add a field or change its value.\n- `$unset`: remove a field.\n- `$inc`: increase or decrease a number.\n- `$push`: add an item to an array.\n- `$addToSet`: add an item to an array only if it is not already present.",
    rule: {
      title: "Targeted Field Update Rule",
      content:
        "Always use atomic update operators like `$set` or `$inc` to update fields in-place. An update filter matters: check it carefully so you do not change the wrong documents.",
    },
    cards: [
      {
        number: "01",
        tag: "SET",
        title: "$set & $unset",
        color: "emerald",
        description:
          "`$set` updates or creates specified fields. `$unset` completely removes a field from matching documents.",
      },
      {
        number: "02",
        tag: "MATH",
        title: "$inc Counters",
        color: "cyan",
        description:
          "Increases or decreases numbers atomically. E.g. `{ $inc: { views: 1 } }` or `{ $inc: { stock: -1 } }`.",
      },
      {
        number: "03",
        tag: "ARRAYS",
        title: "$push & $addToSet",
        color: "purple",
        description:
          "`$push` appends an item to an array. `$addToSet` appends an item only if it does not already exist.",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Managing document mutations in production backends:",
    points: [
      {
        title: "Course Enrollment Counter",
        content:
          "When a student buys a course, running `db.courses.updateOne({ _id: courseId }, { $inc: { enrolledCount: 1 } })` ensures the count is accurate even under concurrent purchases.",
      },
      {
        title: "Bulk Price Adjustment",
        content:
          "Applying a sale across a category: `db.courses.updateMany({ category: 'web' }, { $set: { onSale: true } })` updates all matching documents in one operation.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Forgetting the `$set` operator in update methods or calling `replaceOne()` accidentally, wiping out all other fields in the document.",
    bad: {
      title: "Accidental Document Overwrite",
      code: `// Danger: without an operator, replacing replaces the whole object!
db.courses.replaceOne(
  { title: "React Basics" },
  { price: 750 } // Wipes out title, description, instructor, and tags!
);`,
      explanation:
        "Full document replacement wipes out all unmentioned fields, keeping only `price` and the original `_id`.",
    },
    good: {
      title: "In-Place Field Update with $set",
      code: `// Safe: in-place modification with $set
db.courses.updateOne(
  { title: "React Basics" },
  { $set: { price: 750 } }
); // All other fields remain intact!`,
      explanation:
        "`$set` changes only the specified fields, preserving all existing document attributes.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. Below is a simulation of $set and $inc operations:",
    starterCode: `// Simulating MongoDB $set and $inc in JavaScript
let course = {
  _id: "crs_1",
  title: "React Basics",
  price: 600,
  enrolledCount: 10,
  isPublished: true
};

function updateOne(doc, update) {
  const result = { ...doc };
  if (update.$set) {
    Object.assign(result, update.$set);
  }
  if (update.$inc) {
    for (const [key, val] of Object.entries(update.$inc)) {
      result[key] = (result[key] || 0) + val;
    }
  }
  return result;
}

course = updateOne(course, { $set: { price: 750 } });
console.log("After $set price:", course);

course = updateOne(course, { $inc: { enrolledCount: 1 } });
console.log("After $inc enrolledCount:", course);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "What is the difference between $set and replacing a document?",
      options: [
        "$set changes the fields you name and keeps other fields. Replacing a document replaces the document's fields with the new document, apart from the _id rules.",
        "$set deletes the entire collection, while replacing creates an index.",
        "$set only works on numbers, while replacing only works on strings.",
        "There is no difference; both delete all unmentioned fields.",
      ],
      correctIndex: 0,
      explanation:
        "`$set` performs targeted in-place field updates without affecting unmentioned fields, whereas document replacement replaces the document content entirely.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "In-Place $set",
        desc: "Use `$set` to add or update specific fields while preserving all other document data.",
      },
      {
        title: "Atomic $inc",
        desc: "Use `$inc` to safely increment or decrement numeric counters without race conditions.",
      },
      {
        title: "Careful Filtering",
        desc: "Always verify your query filter before executing `updateMany()` to avoid unintended changes.",
      },
    ],
    nextLessonPreview: {
      title: "Lesson 9: Delete Documents Safely",
      desc: "Learn how to delete single or multiple documents safely using deleteOne() and deleteMany().",
    },
  },
};

