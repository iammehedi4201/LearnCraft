import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js14CallbacksAndHigherOrderFunctionsContent: StandardLessonContent = {
  slug: "js14-callbacks-and-higher-order-functions",
  code: "JS-14",
  title: "Callbacks and Higher-Order Functions",
  subtitle: "A higher-order function accepts a function; a callback is the function you pass in.",
  difficulty: "Moderate",
  scenario: {
    question: "A button should run some code when the user clicks it. Why might a developer pass a function to an event listener instead of running the code immediately?",
    answer: "The function is passed as a callback so the browser can run it when the click happens. If we call the function immediately, it runs before the user clicks.",
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
    title: "Callbacks and Higher-Order Functions",
    bigPicture: "A higher-order function accepts a function as an argument (or returns one). A callback is the function passed in to be called.",
    codeSnippet: `// Higher-Order Function: accepts an 'operation' function
function calculate(a, b, operation) {
  return operation(a, b);
}

// Callbacks: the functions passed in to do the work
function add(x, y) { return x + y; }
function multiply(x, y) { return x * y; }

console.log(calculate(10, 5, add));      // 15
console.log(calculate(10, 5, multiply)); // 50`,
    breakdownTitle: "Two Core Roles",
    breakdownItems: [
      {
        title: "1. Higher-Order Function (The Receiver)",
        desc: "The function that takes another function as a parameter (like calculate, filter, or setTimeout).",
      },
      {
        title: "2. Callback Function (The Passed Function)",
        desc: "The function you hand over to be executed (like add, multiply, or an arrow function).",
      },
      {
        title: "3. Pass by Name",
        desc: "Pass calculate(10, 5, add) without () so it runs when calculate decides, not immediately.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "The Callback Rule",
      content: "Pass callbacks by name without () so they execute when needed, not on the spot.",
    },
    cards: [
      {
        number: "01",
        tag: "THE RECEIVER",
        title: "Higher-Order Function",
        description: "A function that takes another function as an argument. Example: calculate, map, setTimeout.",
        color: "purple",
      },
      {
        number: "02",
        tag: "THE WORKER",
        title: "Callback Function",
        description: "The function you pass into another function to do a specific job. Example: add, multiply.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "THE REASON",
        title: "Functions are Values",
        description: "Functions can be passed around just like numbers or strings. That is why callbacks work.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Two functions working together as a team:",
    points: [
      {
        title: "1. Manager & Worker",
        content: "calculate is the manager that sets up the calculation; add is the worker that performs it.",
      },
      {
        title: "2. Built-in Examples",
        content: "In numbers.filter(n => n > 2), filter is higher-order and n => n > 2 is the callback. In setTimeout(sayHi, 1000), setTimeout is higher-order and sayHi is the callback.",
      },
      {
        title: "3. Reusability",
        content: "Write the higher-order function once, and change what it does by passing different callbacks.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Accidentally Invoking with ()",
      code: `function add(x, y) { return x + y; }\nfunction calculate(a, b, operation) { return operation(a, b); }\n\n// ❌ Wrong: add(5, 5) runs immediately and passes 10 (a number!)\n// calculate(5, 5, add(5, 5)); // TypeError: operation is not a function`,
      explanation: "Adding () calls the function immediately instead of passing it as a callback.",
    },
    good: {
      title: "Pass the Function Name",
      code: `function add(x, y) { return x + y; }\nfunction calculate(a, b, operation) { return operation(a, b); }\n\n// ✅ Correct: Pass 'add' by name without ()\nconsole.log(calculate(5, 5, add)); // 10`,
      explanation: "Passing add without parentheses hands over the function so calculate can run it.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Run the calculate higher-order function with different callbacks:",
    starterCode: `// JS-14: Callbacks and Higher-Order Functions\nfunction calculate(a, b, operation) {\n  return operation(a, b);\n}\n\nfunction add(x, y) { return x + y; }\nfunction multiply(x, y) { return x * y; }\n\nconsole.log("Add:", calculate(10, 5, add));           // 15\nconsole.log("Multiply:", calculate(10, 5, multiply)); // 50\nconsole.log("Subtract:", calculate(10, 5, (x, y) => x - y)); // 5`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "In the expression calculate(10, 5, add), which function is the Higher-Order Function and which is the Callback?",
      options: [
        "calculate is the Higher-Order Function; add is the Callback",
        "add is the Higher-Order Function; calculate is the Callback",
        "Both calculate and add are Callback functions",
        "Neither; higher-order functions only exist in array methods",
      ],
      correctIndex: 0,
      explanation: "calculate is the higher-order function because it accepts a function. add is the callback because it is passed in to be executed.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Higher-Order Function",
        desc: "Takes a function as an argument or returns one (The Manager).",
      },
      {
        title: "Callback Function",
        desc: "The function passed in to be executed (The Worker).",
      },
      {
        title: "Pass without ()",
        desc: "Pass the name like add, not add(), so it runs at the right time.",
      },
    ],
    nextLessonPreview: {
      title: "Closures",
      desc: "Discover how inner functions remember variables from their outer scope.",
    },
  },
};
