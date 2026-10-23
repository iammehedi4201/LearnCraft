import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts01WhatTypeScriptDoesContent: StandardLessonContent = {
  slug: "ts01-what-typescript-does",
  code: "TS-01",
  title: "What TypeScript Does",
  subtitle: "TypeScript adds a compile-time type system to JavaScript to catch bugs before your code runs.",
  difficulty: "Easy",
  scenario: {
    question: "You join a project and see `let price: number = 500`. What does `number` tell you, and what kind of mistake can TypeScript catch here?",
    answer: "`number` tells us that `price` should hold a number. TypeScript can warn us if we try to assign text such as `\"five hundred\"` to it.",
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
    title: "What TypeScript Does",
    bigPicture: "TypeScript adds a type system to JavaScript. Types help you catch many mistakes while writing or checking code, before the code runs.",
    codeSnippet: "let userName: string = \"Rina\";\nuserName = \"Mehedi\"; // valid\n// userName = 25;     // TypeScript error",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Compile-Time Type Checking",
            "desc": "TypeScript checks types while you write code in your editor, catching typos and type mismatches before execution."
      },
      {
            "title": "Type Erasure",
            "desc": "Types are removed when compiled to JavaScript. The browser or runtime executes clean, standard JavaScript."
      },
      {
            "title": "Static Analysis Boundaries",
            "desc": "Types improve code readability and catch mistakes, but they do not automatically validate data received from an API at runtime."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Why Use TypeScript?",
      "content": "Types make code easier to understand and help catch some mistakes early. They do not find every bug, and they do not automatically check data received from an API at runtime."
},
    cards: [
      {
        number: "01",
        tag: "CORE PRINCIPLE",
        title: "Compile-Time Type Checking",
        description: "TypeScript checks types while you write code in your editor, catching typos and type mismatches before execution.",
        color: "purple",
      },
      {
        number: "02",
        tag: "USAGE RULE",
        title: "Type Erasure",
        description: "Types are removed when compiled to JavaScript. The browser or runtime executes clean, standard JavaScript.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PRACTICAL VALUE",
        title: "Static Analysis Boundaries",
        description: "Types improve code readability and catch mistakes, but they do not automatically validate data received from an API at runtime.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
          {
                "title": "1. Catch mistakes while typing",
                "content": "If a variable is meant for text, TypeScript stops you right in your editor if you accidentally put a number into it."
          },
          {
                "title": "2. Clear code at a glance",
                "content": "Anyone reading your code immediately knows what kind of data each variable and function is supposed to work with."
          },
          {
                "title": "3. Helps before the code runs",
                "content": "TypeScript catches bugs during development. Once your code runs in the browser or on a server, plain JavaScript runs it."
          }
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      "title": "Assigning Incompatible Types",
      "code": "let userName: string = \"Rina\";\n// TypeScript flags this immediately:\nuserName = 25; // Error: Type 'number' is not assignable to type 'string'",
      "explanation": "Without TypeScript, JavaScript allows assigning any type to any variable, causing unexpected runtime crashes later."
},
    good: {
      "title": "Assigning the Declared Type",
      "code": "let userName: string = \"Rina\";\nuserName = \"Mehedi\"; // Valid: string re-assigned to string\nconsole.log(\"Current user:\", userName);",
      "explanation": "Keeping types consistent ensures methods like .toUpperCase() will never fail unexpectedly."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test and run this TypeScript code live in the editor:",
    starterCode: "// Lesson 1: What TypeScript Does\nlet userName: string = \"Rina\";\nuserName = \"Mehedi\"; // valid\n\nconsole.log(\"Current user:\", userName);\n\n// Try uncommenting the next line to see TypeScript in action:\n// userName = 25;",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "What is the primary benefit of TypeScript's type system?",
      "options": [
            "It catches many mistakes while writing or checking code before it runs",
            "It automatically validates API responses at runtime",
            "It makes JavaScript code run ten times faster in the browser",
            "It converts JavaScript into low-level machine assembly code"
      ],
      "correctIndex": 0,
      "explanation": "TypeScript adds compile-time types to help catch mistakes before code runs. Types are erased during build and do not validate API responses at runtime."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Static Typing",
            "desc": "TypeScript adds a type system to JavaScript to catch errors before code runs."
      },
      {
            "title": "Compile-Time Guard",
            "desc": "Errors are reported in your editor while writing code."
      },
      {
            "title": "Zero Runtime Overhead",
            "desc": "Types are removed when compiled to standard JavaScript."
      }
],
  },
};
