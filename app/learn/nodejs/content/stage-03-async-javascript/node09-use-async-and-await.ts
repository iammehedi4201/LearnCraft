import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node09UseAsyncAndAwaitContent: StandardLessonContent = {
  slug: "node09-use-async-and-await",
  code: "NODE-09",
  title: "Use async and await",
  subtitle: "An async function returns a Promise, and await lets you write asynchronous code in a clear step-by-step style.",
  difficulty: "Moderate",
  scenario: {
    question: "A function uses await but the result is never used. What should you check?",
    answer: "Check whether the awaited call returns the value you expect, whether you assigned it to a variable, and whether errors are being handled.",
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
    title: "Use async and await",
    bigPicture:
      "An `async` function returns a Promise. `await` lets you write asynchronous code in a style that is easier to read step by step.",
    codeSnippet: `async function getMessage() {
  return "Hello";
}

const message = await getMessage();
console.log(message); // Hello`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. async return",
        desc: "`async` makes `getMessage()` return a Promise.",
      },
      {
        title: "2. Fulfillment",
        desc: 'The Promise fulfills with the value `"Hello"`.',
      },
      {
        title: "3. await extraction",
        desc: "`await` gets that value after the Promise fulfills.",
      },
      {
        title: "4. Output",
        desc: "The message is printed.",
      },
    ],
  },
  part2: {
    title: "Promise Rejection & Error Flow",
    intro:
      "If the Promise rejects, `await` throws an error. Use `try...catch` when your code needs to handle that failure.",
    rule: {
      title: "Async Error Handling Rule",
      content:
        "`await` unwraps fulfilled values, but converts rejected Promises into thrown JavaScript exceptions. Always wrap fallible `await` calls in `try...catch`.",
    },
    cards: [
      {
        number: "01",
        tag: "PROMISES",
        title: "Promise Returns",
        description:
          "Functions declared with `async` always return a Promise, even if returning a primitive value.",
        color: "cyan",
      },
      {
        number: "02",
        tag: "SYNTAX",
        title: "Clean Sequential Code",
        description:
          "Avoids nested `.then()` and `.catch()` chains, making asynchronous logic look clean and linear.",
        color: "purple",
      },
      {
        number: "03",
        tag: "EXCEPTIONS",
        title: "Rejection as Exception",
        description:
          "A rejected Promise automatically triggers a catch block when handled with `await`.",
        color: "amber",
      },
    ],
  },
  part3: {
    title: "Scenario & Practical Async Inspection",
    intro: "Diagnosing unused await expressions and asynchronous assignments:",
    points: [
      {
        title: "Verifying Return Values",
        content:
          "Check whether the asynchronous operation returns useful data that should be assigned to a `const` or `let` variable.",
      },
      {
        title: "Handling Potential Rejections",
        content:
          "Even if the return value is not needed (such as a write operation), the call still needs error handling so failures are properly logged or caught.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Forgetting `await` on an async function causes code to receive an unresolved Promise object instead of the actual data.",
    bad: {
      title: "Missing await on Async Call",
      code: `async function fetchUsername() { return "Alex"; }\n\n// Bug: username is a Promise { <pending> }, not "Alex"!\nconst username = fetchUsername();\nconsole.log(username.toUpperCase()); // TypeError: undefined is not a function`,
      explanation:
        "Without await, you receive the Promise object rather than its resolved value.",
    },
    good: {
      title: "Properly Awaiting the Result",
      code: `async function fetchUsername() { return "Alex"; }\n\n// Correct: Awaits the resolved string\nconst username = await fetchUsername();\nconsole.log(username.toUpperCase()); // "ALEX"`,
      explanation:
        "Using await pauses the function until the Promise resolves with the actual data.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Experiment with async functions and Promise resolutions:",
    starterCode: `async function calculateTotal(price, taxRate) {\n  return price + (price * taxRate);\n}\n\n// In modern ES modules, top-level await is supported:\nconst total = await calculateTotal(100, 0.15);\nconsole.log("Calculated Total:", total);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "A function uses await but the result is never used. What should you check?",
      options: [
        "Check whether the awaited call returns the value you expect, whether you assigned it to a variable, and whether errors are being handled.",
        "Remove async from the function because await is only for synchronous loops.",
        "Change the return statement to process.exit(0).",
        "Convert the project to CommonJS require syntax.",
      ],
      correctIndex: 0,
      explanation:
        "When an awaited result is unused, check if the function returns a value you meant to assign, and ensure error handling is present.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "async Functions",
        desc: "An async function returns a Promise containing the resolved value.",
      },
      {
        title: "await Keyword",
        desc: "Lets you write asynchronous code in a readable, sequential step-by-step style.",
      },
      {
        title: "Error Handling",
        desc: "If the Promise rejects, await throws an error. Use try...catch to handle failures.",
      },
    ],
  },
};
