import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts09TypeNarrowingContent: StandardLessonContent = {
  slug: "ts09-type-narrowing",
  code: "TS-09",
  title: "Type Narrowing",
  subtitle: "Refine broad union types into specific types with runtime type guards.",
  difficulty: "Difficult",
  scenario: {
    question: "A function accepts either a string or an array of strings. What could you check before using a method that exists only on arrays? Explain your choice.",
    answer: "Use `Array.isArray(value)`. If it returns `true`, the value is an array, so we can safely use array methods in that branch. Otherwise, handle it as a string.",
  },
  interviewQuestion: {
    question: "What does type narrowing mean?",
    answer: "Type narrowing means checking a value so TypeScript can work out which type it has in that part of the code. For example, `typeof value === \"string\"` tells TypeScript the value is a string inside that branch.",
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
    title: "Type Narrowing",
    bigPicture: "A value can have more than one possible type. Type narrowing uses a check to help TypeScript understand which type the value has in a certain part of the code.",
    codeSnippet: "function formatId(id: string | number): string {\n  if (typeof id === \"number\") {\n    return id.toFixed(0);\n  }\n\n  return id.toUpperCase();\n}",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Control Flow Analysis",
            "desc": "TypeScript analyzes if/else branches, switch statements, and early returns to deduce types."
      },
      {
            "title": "typeof Guards",
            "desc": "Use `typeof x === 'string'` or `typeof x === 'number'` to narrow primitive unions."
      },
      {
            "title": "Array Guards",
            "desc": "Use `Array.isArray(value)` to distinguish arrays from single elements."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "How Narrowing Works Step-by-Step",
      "content": "1. `id` may be a string or a number. 2. The `typeof` check asks whether it is a number. 3. Inside the `if` block, TypeScript knows `id` is a number, so `toFixed()` is allowed. 4. After that check, the remaining possibility is a string, so `toUpperCase()` is allowed."
},
    cards: [
      {
        number: "01",
        tag: "CORE PRINCIPLE",
        title: "Control Flow Analysis",
        description: "TypeScript analyzes if/else branches, switch statements, and early returns to deduce types.",
        color: "purple",
      },
      {
        number: "02",
        tag: "USAGE RULE",
        title: "typeof Guards",
        description: "Use `typeof x === 'string'` or `typeof x === 'number'` to narrow primitive unions.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PRACTICAL VALUE",
        title: "Array Guards",
        description: "Use `Array.isArray(value)` to distinguish arrays from single elements.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
          {
                "title": "1. Narrowing means checking the type",
                "content": "When a value can be more than one type (like text or an array), an `if` check tells TypeScript which one it is right now."
          },
          {
                "title": "2. Using typeof for basic types",
                "content": "Checking `if (typeof value === \"string\")` lets TypeScript know it is 100% safe to use string methods inside that branch."
          },
          {
                "title": "3. Using Array.isArray() for lists",
                "content": "When a value might be a single string or an array of strings, `Array.isArray(value)` proves it is a list."
          }
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      "title": "Calling Type-Specific Methods Without Narrowing",
      "code": "function formatId(id: string | number): string {\n  // Error: Property 'toUpperCase' does not exist on type 'number'\n  return id.toUpperCase();\n}",
      "explanation": "Since id might be a number, calling a string method directly without checking is unsafe and rejected by TypeScript."
},
    good: {
      "title": "Narrowing Before Method Access",
      "code": "function formatId(id: string | number): string {\n  if (typeof id === \"number\") {\n    return id.toFixed(0);\n  }\n  return id.toUpperCase(); // Safe: TypeScript knows id is string here!\n}",
      "explanation": "Type narrowing ensures each branch only calls methods supported by the refined type."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test and run this TypeScript code live in the editor:",
    starterCode: "// Lesson 9: Type Narrowing\nfunction formatId(id: string | number): string {\n  if (typeof id === \"number\") {\n    return id.toFixed(0);\n  }\n  return id.toUpperCase();\n}\n\nconsole.log(\"Formatted number:\", formatId(123.45));\nconsole.log(\"Formatted string:\", formatId(\"user-abc\"));\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "What check would you use to narrow a union `string | string[]` to specifically the array branch?",
      "options": [
            "Array.isArray(value)",
            "typeof value === 'array'",
            "value instanceof Array[]",
            "value.type === 'list'"
      ],
      "correctIndex": 0,
      "explanation": "In JavaScript and TypeScript, `typeof []` returns 'object', so `Array.isArray(value)` is the correct runtime check to identify arrays."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Type Narrowing",
            "desc": "Narrowing refines broad union types into specific types within code branches."
      },
      {
            "title": "Common Guards",
            "desc": "Use typeof for primitives, Array.isArray for arrays, and equality checks."
      },
      {
            "title": "Branch Safety",
            "desc": "Inside narrowed branches, you can safely call methods specific to that type."
      }
],
  },
};
