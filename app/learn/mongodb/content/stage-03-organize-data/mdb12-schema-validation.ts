import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb12SchemaValidationContent: StandardLessonContent = {
  slug: "mdb12-schema-validation",
  code: "MDB-12",
  title: "Schema Validation",
  subtitle: "Enforce collection integrity, required keys, and BSON type checks with $jsonSchema validation rules.",
  difficulty: "Moderate",
  scenario: {
    question: "Someone tries to save a course with a price of `\"free\"` instead of a number. How can MongoDB help prevent this?",
    answer: "Add schema validation that requires `price` to be a number. MongoDB can reject a document that does not follow the rule.",
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
    title: "Schema Validation",
    bigPicture:
      "MongoDB has a flexible data model, but flexible does not mean every document should contain random or incorrect values. **Schema validation** lets you define rules for the documents in a collection.",
    codeSnippet: `// Create a collection with schema validation (illustrative):
db.createCollection("validatedCourses", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "price"],
      properties: {
        title: { bsonType: "string" },
        price: { bsonType: "number", minimum: 0 }
      }
    }
  }
})`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. validator object",
        desc: "`validator` contains the rules for documents in the collection.",
      },
      {
        title: "2. required array",
        desc: "`required` says that `title` and `price` must exist.",
      },
      {
        title: "3. bsonType check",
        desc: "`bsonType` checks the kind of value (e.g. \"string\", \"number\", \"object\").",
      },
      {
        title: "4. Constraints (minimum: 0)",
        desc: "`minimum: 0` prevents a negative price.",
      },
    ],
  },
  part2: {
    title: "Why Schema Validation Matters",
    intro:
      "Schema validation helps stop invalid documents from being saved. It does not replace checking user input in your application.",
    rule: {
      title: "Defense in Depth Rule",
      content:
        "Validate inputs in your application layer (e.g. Zod or Joi) and enforce rules at the database level with `$jsonSchema`. Database schema validation acts as the ultimate safety net against bugs and rogue scripts.",
    },
    cards: [
      {
        number: "01",
        tag: "SAFETY",
        title: "Database Safety Net",
        color: "emerald",
        description:
          "Rejects malformed writes at the database layer before corrupted records can compromise production data.",
      },
      {
        number: "02",
        tag: "JSON SCHEMA",
        title: "$jsonSchema Standard",
        color: "cyan",
        description:
          "Uses the industry-standard JSON Schema specification extended with BSON type validation (`bsonType`).",
      },
      {
        number: "03",
        tag: "COMPLEMENTARY",
        title: "App Validation Synergy",
        color: "purple",
        description:
          "Database validation complements application input checks rather than replacing them.",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Enforcing business constraints at the database boundary:",
    points: [
      {
        title: "Preventing String Prices",
        content:
          "If a frontend form sends `{ price: 'free' }`, MongoDB throws a `DocumentValidationFailure` and blocks the write because the schema expects a number with `minimum: 0`.",
      },
      {
        title: "Enforcing Mandatory User Fields",
        content:
          "Ensuring every user document in `users` has `email` and `createdAt` before any write can be acknowledged.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Relying solely on frontend validation and having no validation rules on the collection, allowing direct mongosh or API script errors to write corrupt records.",
    bad: {
      title: "Zero Database Validation Rules",
      code: `// Collection created without validator:
db.createCollection("courses");
// Anyone can insert completely corrupted shapes:
db.courses.insertOne({ title: 12345, price: -999, invalidField: true });
// Accepted by MongoDB without complaint!`,
      explanation:
        "Without schema validation, MongoDB permits arbitrary types and shapes, allowing corrupted records into production.",
    },
    good: {
      title: "Enforcing Types and Ranges with $jsonSchema",
      code: `// Enforce required keys and valid types:
db.createCollection("courses", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "price"],
      properties: {
        title: { bsonType: "string" },
        price: { bsonType: "number", minimum: 0 }
      }
    }
  }
});`,
      explanation:
        "MongoDB automatically rejects writes that do not adhere to the `$jsonSchema` specification.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. Below is a simulation of $jsonSchema validator logic:",
    starterCode: `// Simulating MongoDB $jsonSchema validation in JavaScript
function validateCourse(doc) {
  const errors = [];
  if (typeof doc.title !== "string") {
    errors.push("title must be a string");
  }
  if (typeof doc.price !== "number" || doc.price < 0) {
    errors.push("price must be a number >= 0");
  }
  return {
    valid: errors.length === 0,
    errors
  };
}

console.log("Valid doc:", validateCourse({ title: "React Basics", price: 600 }));
console.log("Invalid string price:", validateCourse({ title: "React Basics", price: "free" }));
console.log("Invalid negative price:", validateCourse({ title: "React Basics", price: -50 }));`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Someone tries to save a course with a price of `\"free\"` instead of a number. How can MongoDB help prevent this?",
      options: [
        "Add schema validation that requires `price` to be a number so MongoDB rejects the invalid document.",
        "MongoDB automatically converts the string 'free' to 0 without any configuration.",
        "Delete the entire database whenever an invalid input is entered.",
        "MongoDB cannot validate schemas under any circumstances.",
      ],
      correctIndex: 0,
      explanation:
        "Schema validation with `$jsonSchema` checks that `price` is of `bsonType: 'number'`, rejecting string values like 'free'.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "$jsonSchema Validation",
        desc: "Define collection rules using JSON Schema with BSON type checks.",
      },
      {
        title: "Required Fields",
        desc: "Specify arrays of mandatory keys with the `required` constraint.",
      },
      {
        title: "Defense in Depth",
        desc: "Pair application-level validation with database-level schema enforcement.",
      },
    ],
    nextLessonPreview: {
      title: "Lesson 13: Indexes",
      desc: "Move into Part 4: Find and Work with Data Efficiently by exploring how B-tree indexes accelerate queries.",
    },
  },
};

