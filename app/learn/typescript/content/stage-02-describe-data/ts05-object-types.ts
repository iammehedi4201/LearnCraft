import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts05ObjectTypesContent: StandardLessonContent = {
  slug: "ts05-object-types",
  code: "TS-05",
  title: "Object Types",
  subtitle: "Describe structured object shapes and optional fields with the ? modifier.",
  difficulty: "Moderate",
  scenario: {
    question: "A customer can create an account without adding a phone number. How would you describe the `phone` field so it is allowed to be missing?",
    answer: "Make the field optional with `phone?: string`. This means the customer object can include a phone number, but it does not have to.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Object Types",
    bigPicture: "An object type describes which fields an object should have and what type each field should contain.",
    codeSnippet: "type User = {\n  id: number;\n  name: string;\n  email?: string;\n};\n\nconst user: User = {\n  id: 1,\n  name: \"Rina\",\n};",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Object Type Alias",
            "desc": "Using `type User = { ... }` gives a reusable name to an object structure."
      },
      {
            "title": "Required Fields",
            "desc": "Fields without `?` must be provided whenever an object of this type is created."
      },
      {
            "title": "Optional Properties (`?`)",
            "desc": "Adding `?` allows a field to be omitted or have the value `undefined`."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "When to Use Object Types",
      "content": "Use object types when you want to describe data such as a user, product, order, or API response. The id and name fields are required. The ? makes email optional."
},
    cards: [
      {
        number: "01",
        tag: "CORE PRINCIPLE",
        title: "Object Type Alias",
        description: "Using `type User = { ... }` gives a reusable name to an object structure.",
        color: "purple",
      },
      {
        number: "02",
        tag: "USAGE RULE",
        title: "Required Fields",
        description: "Fields without `?` must be provided whenever an object of this type is created.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PRACTICAL VALUE",
        title: "Optional Properties (`?`)",
        description: "Adding `?` allows a field to be omitted or have the value `undefined`.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
          {
                "title": "1. Describing an object's fields",
                "content": "An object type lists the exact properties an object must have, such as `id: number` and `name: string`."
          },
          {
                "title": "2. Optional fields with question mark",
                "content": "Adding `?` (like `phone?: string`) means the phone number is allowed to be missing without causing a type error."
          },
          {
                "title": "3. Perfect for application data",
                "content": "Use object types for users, products, shopping carts, or any structured information in your app."
          }
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      "title": "Missing Required Properties",
      "code": "type User = {\n  id: number;\n  name: string;\n};\n\n// Error: Property 'name' is missing in type '{ id: number }'\nconst user: User = { id: 1 };",
      "explanation": "Required fields cannot be omitted without triggering a TypeScript error."
},
    good: {
      "title": "Using Optional Properties Appropriately",
      "code": "type User = {\n  id: number;\n  name: string;\n  email?: string;\n};\n\nconst user: User = { id: 1, name: \"Rina\" }; // Valid: email is optional\nconsole.log(\"User:\", user.name);",
      "explanation": "Using `?` explicitly tells TypeScript and your teammates that email is allowed to be missing."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test and run this TypeScript code live in the editor:",
    starterCode: "// Lesson 5: Object Types\ntype User = {\n  id: number;\n  name: string;\n  email?: string;\n};\n\nconst user: User = {\n  id: 1,\n  name: \"Rina\",\n};\n\nconsole.log(`User: ${user.name} (${user.email ?? \"No email provided\"})`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "How do you define an optional property in a TypeScript object type?",
      "options": [
            "Append a question mark to the property name: `phone?: string`",
            "Wrap the property in brackets: `[phone: string]`",
            "Set the type to optional: `phone: optional string`",
            "Write the property name in parentheses: `(phone): string`"
      ],
      "correctIndex": 0,
      "explanation": "The `?` suffix marks a property as optional, allowing it to be omitted or have the value undefined."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Object Shapes",
            "desc": "Object types define which fields an object must have and what types they hold."
      },
      {
            "title": "Optional Fields",
            "desc": "Use the ? modifier for fields that can be absent."
      },
      {
            "title": "Autocomplete",
            "desc": "Defined object types provide reliable editor autocomplete."
      }
],
  },
};
