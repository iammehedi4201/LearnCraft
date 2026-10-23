import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts12GenericsContent: StandardLessonContent = {
  slug: "ts12-generics",
  code: "TS-12",
  title: "Generics",
  subtitle: "Build reusable, type-safe functions and abstractions.",
  difficulty: "Difficult",
  scenario: {
    question: "You want one helper that returns the first item from a list of users or a list of numbers. Why could a generic be better than using `any`?",
    answer: "A generic lets one function work with both lists while keeping the correct item type. With a users list, the result is a user; with a numbers list, the result is a number. `any` would lose that helpful type information.",
  },
  interviewQuestion: {
    question: "What problem do generics solve?",
    answer: "Generics let one function or type work with different kinds of data while keeping track of each kind. This avoids losing type information by using `any`.",
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
    title: "Generics",
    bigPicture: "Generics let you write reusable code that works with different types while keeping track of the type being used.",
    codeSnippet: "function firstItem<T>(items: T[]): T | undefined {\n  return items[0];\n}\n\nconst firstName = firstItem([\"Ava\", \"Liam\"]); // string | undefined\nconst firstScore = firstItem([90, 85]);         // number | undefined",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Type Parameter `<T>`",
            "desc": "A placeholder for a type that will be provided or inferred when the code is called."
      },
      {
            "title": "Preserving Type Relationships",
            "desc": "Passing `string[]` ensures the return type is `string | undefined`, not generic `any`."
      },
      {
            "title": "Reusable Helpers",
            "desc": "Write functions, API clients, and collections once and use them with any data type."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "How Generics Work Step-by-Step",
      "content": "1. `T` is a placeholder for a type. 2. TypeScript works out `T` from the array passed to the function. 3. The function returns an item of that same type, or `undefined` if the array is empty. 4. One function works with different types without losing useful type information."
},
    cards: [
      {
        number: "01",
        tag: "CORE PRINCIPLE",
        title: "Type Parameter `<T>`",
        description: "A placeholder for a type that will be provided or inferred when the code is called.",
        color: "purple",
      },
      {
        number: "02",
        tag: "USAGE RULE",
        title: "Preserving Type Relationships",
        description: "Passing `string[]` ensures the return type is `string | undefined`, not generic `any`.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PRACTICAL VALUE",
        title: "Reusable Helpers",
        description: "Write functions, API clients, and collections once and use them with any data type.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
          {
                "title": "1. A reusable placeholder for types",
                "content": "A generic like `<T>` lets one function work with different data types without losing track of what went in."
          },
          {
                "title": "2. Keeps types without using any",
                "content": "If you pass a list of users, you get back a user. If you pass numbers, you get back a number. Nothing is lost."
          },
          {
                "title": "3. Think of it like a labeled box",
                "content": "A box can hold anything, but the label `<T>` ensures whatever you put in comes out as the exact same type."
          }
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      "title": "Using any for Reusable Functions",
      "code": "function firstItem(items: any[]): any {\n  return items[0];\n}\n\nconst item = firstItem([\"Ava\", \"Liam\"]);\n// item is 'any' - autocomplete and type safety are completely lost!",
      "explanation": "Using any discards all type information, preventing autocomplete and safety checks on the returned value."
},
    good: {
      "title": "Using a Generic Type Parameter",
      "code": "function firstItem<T>(items: T[]): T | undefined {\n  return items[0];\n}\n\nconst name = firstItem([\"Ava\", \"Liam\"]); // Type is string | undefined\nconsole.log(name?.toUpperCase()); // Full autocomplete and safety!",
      "explanation": "Generics keep track of the specific type passed in, ensuring the return type matches."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test and run this TypeScript code live in the editor:",
    starterCode: "// Lesson 12: Generics\nfunction firstItem<T>(items: T[]): T | undefined {\n  return items[0];\n}\n\nconst firstName = firstItem([\"Ava\", \"Liam\"]);\nconst firstScore = firstItem([90, 85]);\n\nconsole.log(\"First name:\", firstName);\nconsole.log(\"First score:\", firstScore);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "What does `T` represent in `function identity<T>(value: T): T`?",
      "options": [
            "A type variable that captures the specific type passed into the function",
            "A constant value that can only be used with text strings",
            "A built-in TypeScript keyword that converts values to strings",
            "A special variable that runs only in test environments"
      ],
      "correctIndex": 0,
      "explanation": "T is a generic type parameter that acts as a placeholder, capturing the argument's type and preserving it for the return value."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Generics",
            "desc": "Generics enable reusable code that preserves exact input and output types."
      },
      {
            "title": "Type Variables",
            "desc": "<T> acts as a placeholder resolved at call time."
      },
      {
            "title": "No any",
            "desc": "Generics prevent losing type safety in shared utilities."
      }
],
  },
};
