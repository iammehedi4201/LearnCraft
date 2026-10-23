import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts16PromisesAndAsyncFunctionsContent: StandardLessonContent = {
  slug: "ts19-promises-and-async-functions",
  code: "TS-19",
  title: "Promises and async Functions",
  subtitle: "Model asynchronous values with Promise<T> and async/await syntax.",
  difficulty: "Moderate",
  scenario: {
    question: "A function loads a user's name from a server. Why might its return type be `Promise<string>` instead of simply `string`?",
    answer: "The server response takes time, so the function returns a Promise that will provide a string later. `string` would describe a value available right away, not the Promise used for an async result.",
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
    title: "Promises and async Functions",
    bigPicture: "An `async` function returns a Promise. `Promise<string>` means the Promise will provide a string if it succeeds. `await` lets you wait for the Promise's result inside an async function.",
    codeSnippet: "async function getUserName(): Promise<string> {\n  return \"Rina\";\n}\n\nasync function showName(): Promise<void> {\n  const name = await getUserName();\n  console.log(name);\n}",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Promise<T>",
            "desc": "A container for a value of type T that will resolve asynchronously in the future."
      },
      {
            "title": "async Functions",
            "desc": "Functions marked with `async` always return a Promise, wrapping return values automatically."
      },
      {
            "title": "await Syntax",
            "desc": "Unwraps `Promise<T>` into a value of type T inside an async block."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Understanding Promise Return Types",
      "content": "`Promise<void>` means the function does not return a useful value to its caller. A Promise can fail, so real code may also need error handling."
},
    cards: [
      {
        number: "01",
        tag: "CORE PRINCIPLE",
        title: "Promise<T>",
        description: "A container for a value of type T that will resolve asynchronously in the future.",
        color: "purple",
      },
      {
        number: "02",
        tag: "USAGE RULE",
        title: "async Functions",
        description: "Functions marked with `async` always return a Promise, wrapping return values automatically.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PRACTICAL VALUE",
        title: "await Syntax",
        description: "Unwraps `Promise<T>` into a value of type T inside an async block.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
          {
                "title": "1. Async functions return Promises",
                "content": "Any function marked `async` automatically returns a `Promise` representing data that will arrive later."
          },
          {
                "title": "2. Typing the future value",
                "content": "Writing `Promise<User>` tells TypeScript that once the network call finishes, the result will be a `User`."
          },
          {
                "title": "3. await unpacks the result",
                "content": "When you use `await`, TypeScript knows the result is already unwrapped and ready to use."
          }
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      "title": "Confusing a Promise with Its Resolved Value",
      "code": "async function getUserName(): Promise<string> {\n  return \"Rina\";\n}\n\n// Error: Calling .toUpperCase() directly on a Promise!\nconst result = getUserName();\n// result.toUpperCase(); // Runtime error: Promise does not have toUpperCase!",
      "explanation": "Without await, result is the Promise object itself, not the string."
},
    good: {
      "title": "Awaiting the Promise Correctly",
      "code": "async function getUserName(): Promise<string> {\n  return \"Rina\";\n}\n\nasync function run() {\n  const name = await getUserName();\n  console.log(name.toUpperCase()); // Safe string method call!\n}",
      "explanation": "Awaiting unwraps the Promise and gives you the typed string."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test and run this TypeScript code live in the editor:",
    starterCode: "// Lesson 16: Promises and async Functions\nasync function getUserName(): Promise<string> {\n  return \"Rina\";\n}\n\nasync function showName(): Promise<void> {\n  const name = await getUserName();\n  console.log(\"Async User Name:\", name);\n}\n\nshowName();\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "If a function is declared as `async function fetchData(): Promise<number>`, what is the type of `const x = await fetchData()`?",
      "options": [
            "number",
            "Promise<number>",
            "void",
            "unknown"
      ],
      "correctIndex": 0,
      "explanation": "The `await` keyword pauses execution until the promise resolves and unwraps `Promise<number>` into `number`."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Promise<T>",
            "desc": "Models a value of type T that resolves asynchronously."
      },
      {
            "title": "async / await",
            "desc": "Async functions return promises; await unwraps the resolved value."
      },
      {
            "title": "Error Handling",
            "desc": "Use try/catch to handle potential network and asynchronous failures."
      }
],
  },
};
