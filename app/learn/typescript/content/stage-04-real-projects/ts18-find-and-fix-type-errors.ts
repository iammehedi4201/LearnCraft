import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts18FindAndFixTypeErrorsContent: StandardLessonContent = {
  slug: "ts18-find-and-fix-type-errors",
  code: "TS-18",
  title: "Find and Fix Type Errors",
  subtitle: "Read compiler diagnostics to identify mismatches and fix root causes cleanly.",
  difficulty: "Moderate",
  scenario: {
    question: "AI suggests adding `as any` to make a compiler error disappear. What would you investigate before accepting that fix?",
    answer: "First check what TypeScript expected, what value we actually have, and why they do not match. `as any` hides the warning without fixing the cause, so the bug may still happen when the app runs.",
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
    title: "Find and Fix Type Errors",
    bigPicture: "A type error usually means a value does not match what the code expects. Read the error and find the mismatch instead of hiding it.",
    codeSnippet: "function welcome(name: string): string {\n  return `Welcome, ${name}`;\n}\n\nwelcome(42); // Error: number is not a string\n\n// Fix the call if the function should receive a name:\nwelcome(\"Rina\");",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Reading Diagnostics",
            "desc": "Examine the expected type vs received type in TypeScript's error message."
      },
      {
            "title": "Fixing the Cause",
            "desc": "Correct the bad argument or update the signature if legitimate new data types are supported."
      },
      {
            "title": "Avoiding as any",
            "desc": "Silencing errors with `as any` masks bugs that will surface when real users run the app."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "5 Steps to Resolve Type Errors",
      "content": "1. Find the value mentioned in the error. 2. Check which type the code expects. 3. Check which type the value actually has. 4. Decide what the program should do. 5. Fix the cause and run the type check or tests again. Do not automatically use `any` or a type assertion to silence an error. Understand the mismatch first."
},
    cards: [
      {
        number: "01",
        tag: "CORE PRINCIPLE",
        title: "Reading Diagnostics",
        description: "Examine the expected type vs received type in TypeScript's error message.",
        color: "purple",
      },
      {
        number: "02",
        tag: "USAGE RULE",
        title: "Fixing the Cause",
        description: "Correct the bad argument or update the signature if legitimate new data types are supported.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PRACTICAL VALUE",
        title: "Avoiding as any",
        description: "Silencing errors with `as any` masks bugs that will surface when real users run the app.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
          {
                "title": "1. Read what was expected vs received",
                "content": "TypeScript error messages tell you two things: what type the code asked for, and what type you actually provided."
          },
          {
                "title": "2. Fix the real issue",
                "content": "Look at the mismatch and decide: did you pass the wrong value, or does your type definition need to be updated?"
          },
          {
                "title": "3. Don't use as any as a quick fix",
                "content": "Forcing `as any` silences the error message, but leaves the real bug waiting to crash your app in production."
          }
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      "title": "Hiding Errors with as any",
      "code": "function welcome(name: string): string {\n  return `Welcome, ${name}`;\n}\n\n// Bad: hides the error without fixing the mismatch!\nwelcome(42 as any);",
      "explanation": "Using as any silences the compiler, but passes an invalid number to code expecting a string."
},
    good: {
      "title": "Fixing the Mismatch Directly",
      "code": "function welcome(name: string): string {\n  return `Welcome, ${name}`;\n}\n\nwelcome(\"Rina\"); // Clean, fixed, and verified!",
      "explanation": "Fixing the underlying data matches expectations and preserves type safety."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test and run this TypeScript code live in the editor:",
    starterCode: "// Lesson 18: Find and Fix Type Errors\nfunction welcome(name: string): string {\n  return `Welcome, ${name}`;\n}\n\n// Fixed call:\nconst message = welcome(\"Rina\");\nconsole.log(message);\n\n// Try uncommenting to see the compiler diagnose the mismatch:\n// welcome(42);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "What should you do when you see a TypeScript error stating 'Type X is not assignable to type Y'?",
      "options": [
            "Find why X and Y do not match, and either correct the value or update the expected type contract",
            "Add `as any` immediately to suppress compiler output",
            "Delete the tsconfig.json file from your project",
            "Convert the file into a plain .js file without types"
      ],
      "correctIndex": 0,
      "explanation": "A type error indicates a data mismatch. Inspect the expected type vs received value, determine the intended behavior, and fix the root cause."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Read the Diagnostic",
            "desc": "TypeScript tells you what type was expected and what was received."
      },
      {
            "title": "Fix the Root Cause",
            "desc": "Correct the value or intentionally update the type contract."
      },
      {
            "title": "Avoid as any",
            "desc": "Never suppress errors without understanding why the mismatch occurred."
      }
    ],
    nextLessonPreview: {
      title: "TypeScript Real-World Project Capstone",
      desc: "Put all 18 lessons into practice: type an entire application end-to-end with verified data contracts."
    }
  },
};
