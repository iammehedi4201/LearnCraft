import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js14CallbacksAndHigherOrderFunctionsContent: StandardLessonContent = {
  slug: "js14-callbacks-and-higher-order-functions",
  code: "JS-14",
  title: "Callbacks and Higher-Order Functions",
  subtitle: "Pass functions as values to build flexible workflows and handle events.",
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
    bigPicture: "A callback is a function passed to another function to be called later or as part of its work. A higher-order function takes a function as an argument or returns a function.",
    codeSnippet: "function processName(name, callback) {\n  callback(name);\n}\n\nprocessName(\"Rina\", (value) => {\n  console.log(`Hello, ${value}`);\n});\n// Hello, Rina",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "First-Class Functions",
            "desc": "Functions in JavaScript can be assigned to variables, passed as arguments, and returned."
      },
      {
            "title": "Callbacks",
            "desc": "Functions supplied to run later in response to events, timers, or array iterations."
      },
      {
            "title": "Higher-Order Functions",
            "desc": "Functions like map, filter, or custom helpers that take or return other functions."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Callback Principle",
      content: "Pass functions by reference without parentheses so they execute when the event happens, not immediately.",
    },
    cards: [
      {
            "number": "01",
            "tag": "FIRST-CLASS VALUES",
            "title": "First-Class Functions",
            "description": "Functions in JavaScript can be assigned to variables, passed as arguments, and returned.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "DEFERRED WORK",
            "title": "Callbacks",
            "description": "Functions supplied to run later in response to events, timers, or array iterations.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "ABSTRACTION",
            "title": "Higher-Order Functions",
            "description": "Functions like map, filter, or custom helpers that take or return other functions.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. Functions are values",
            "content": "In JavaScript, functions can be passed into other functions just like numbers, strings, or objects."
      },
      {
            "title": "2. Callbacks run at the right time",
            "content": "A callback is not called immediately; it is handed over to run when an event happens, a timer finishes, or an item is processed."
      },
      {
            "title": "3. Powers modern JavaScript",
            "content": "Array methods (map, filter), browser event listeners (click), and timers (setTimeout) all rely on callbacks."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "function handleClick() { console.log(\"Clicked!\"); }\n// Bug: Calling the function immediately with ():\n// button.addEventListener(\"click\", handleClick()); // Runs at startup, not on click!",
      explanation: "Adding () calls the function right away instead of passing it as a callback reference.",
    },
    good: {
      title: "Recommended Approach",
      code: "function handleClick() { console.log(\"Clicked!\"); }\n// Correct: Pass the function reference without ():\n// button.addEventListener(\"click\", handleClick);",
      explanation: "Passing the function by name lets the runtime invoke it when the event occurs.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-14: Callbacks and Higher-Order Functions\nfunction processUser(id, callback) {\n  const user = { id, name: \"Rina\" };\n  return callback(user);\n}\n\nconst greeting = processUser(101, (u) => `Hello, ${u.name}!`);\nconsole.log(greeting);",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is a higher-order function in JavaScript?",
      options: ["A function that runs faster than other functions in V8","A function that takes another function as an argument, or returns a function","A function that can only be called from an HTML event","A function defined inside an async block"],
      correctIndex: 1,
      explanation: "A higher-order function is any function that accepts a function as an argument, returns a function, or both.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "First-Class Citizens",
            "desc": "Functions can be treated like any other variable value."
      },
      {
            "title": "Deferred Execution",
            "desc": "Callbacks execute when the caller decides, not immediately."
      },
      {
            "title": "Pass by Reference",
            "desc": "Pass function names without parentheses to avoid premature invocation."
      }
],
    nextLessonPreview: {
      title: "Closures",
      desc: "Discover how inner functions remember variables from their outer scope.",
    },
  },
};
