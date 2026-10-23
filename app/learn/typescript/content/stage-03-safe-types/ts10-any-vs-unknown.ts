import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts10AnyVsUnknownContent: StandardLessonContent = {
  slug: "ts10-any-vs-unknown",
  code: "TS-10",
  title: "any vs. unknown",
  subtitle: "Distinguish disabling type safety with any from safe uncertain data with unknown.",
  difficulty: "Moderate",
  scenario: {
    question: "An external tool gives your code a value, but you do not know whether it is a string, number, or object. Which is the safer starting type: `any` or `unknown`? Why?",
    answer: "Use `unknown`. It lets the value be anything, but asks us to check its type before we use it in a specific way. `any` skips many of those checks.",
  },
  interviewQuestion: {
    question: "Why is `unknown` usually safer than `any`?",
    answer: "`any` skips many type checks. `unknown` makes us check the value before using it as a string, number, or another specific type, so it is usually safer.",
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
    title: "any vs. unknown",
    bigPicture: "Both can hold values of an unknown type, but they provide different levels of safety. `any` turns off many type checks. `unknown` makes you check the value before using it in a type-specific way.",
    codeSnippet: "let loose: any = \"hello\";\nloose.toFixed(2); // TypeScript allows it; it fails at runtime\n\nlet checked: unknown = \"hello\";\nif (typeof checked === \"string\") {\n  console.log(checked.toUpperCase());\n}",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "any (Unchecked Escape Hatch)",
            "desc": "Turns off compiler checks; allows calling arbitrary methods that may crash at runtime."
      },
      {
            "title": "unknown (Type-Safe Top Type)",
            "desc": "Accepts any value, but forces you to check the type before calling methods on it."
      },
      {
            "title": "Production Safety",
            "desc": "Use `unknown` for parsing JSON, reading third-party API payloads, or handling generic errors."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Rule of Thumb for any vs unknown",
      "content": "Prefer `unknown` when you do not yet know a value's type. Use `any` only when there is a clear reason to give up type checking."
},
    cards: [
      {
        number: "01",
        tag: "CORE PRINCIPLE",
        title: "any (Unchecked Escape Hatch)",
        description: "Turns off compiler checks; allows calling arbitrary methods that may crash at runtime.",
        color: "purple",
      },
      {
        number: "02",
        tag: "USAGE RULE",
        title: "unknown (Type-Safe Top Type)",
        description: "Accepts any value, but forces you to check the type before calling methods on it.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PRACTICAL VALUE",
        title: "Production Safety",
        description: "Use `unknown` for parsing JSON, reading third-party API payloads, or handling generic errors.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
          {
                "title": "1. any turns off type checking",
                "content": "Using `any` tells TypeScript to stop checking, which can let bugs sneak through silently into production."
          },
          {
                "title": "2. unknown is the safe choice",
                "content": "`unknown` says: 'we don't know what this data is yet, so you must check its type before you can use it.'"
          },
          {
                "title": "3. Check before using unknown",
                "content": "Before treating an `unknown` value as text or a number, verify it with `typeof` or a helper function."
          }
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      "title": "Silencing Types with any",
      "code": "let data: any = \"just text\";\n// Compiles without error, but crashes at runtime!\ndata.calculateTotal();",
      "explanation": "any turns off type checking, creating a false sense of safety that leads to production crashes."
},
    good: {
      "title": "Enforcing Safety with unknown",
      "code": "let data: unknown = \"just text\";\nif (typeof data === \"string\") {\n  console.log(data.toUpperCase()); // Safe and checked!\n}",
      "explanation": "unknown forces you to verify the data shape before use, preventing runtime method errors."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test and run this TypeScript code live in the editor:",
    starterCode: "// Lesson 10: any vs. unknown\nlet loose: any = \"hello\";\n// loose.toFixed(2); // Unsafe! Fails at runtime\n\nlet checked: unknown = \"hello\";\nif (typeof checked === \"string\") {\n  console.log(\"Safe uppercase:\", checked.toUpperCase());\n}\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "What is the key difference between `any` and `unknown` in TypeScript?",
      "options": [
            "`any` disables type checking, while `unknown` requires type checking before use",
            "`any` can only store strings, while `unknown` can store any type",
            "`unknown` is evaluated at runtime, while `any` is evaluated at compile time",
            "`unknown` cannot be used inside functions"
      ],
      "correctIndex": 0,
      "explanation": "`any` completely bypasses compiler type checks, while `unknown` safely accepts any value but forces you to narrow its type before invoking properties or methods."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "any",
            "desc": "Turns off type checking; avoid using it as an easy shortcut."
      },
      {
            "title": "unknown",
            "desc": "The safe alternative that requires a type check before use."
      },
      {
            "title": "Safe Defaults",
            "desc": "Always prefer unknown for external data, API payloads, and dynamic values."
      }
],
  },
};
