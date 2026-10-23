import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js08ScopeAndBlockScopeContent: StandardLessonContent = {
  slug: "js08-scope-and-block-scope",
  code: "JS-08",
  title: "Global, Function, and Block Scope",
  subtitle: "Scope means where a variable can be used in your code: global, function, and block scope.",
  difficulty: "Moderate",
  scenario: {
    question: "A variable is declared inside an if block, but a developer tries to use it after the block and gets a ReferenceError. Why?",
    answer: "The variable is block-scoped, so it is only available inside the block where it was declared. Declare it in a wider scope only if the later code truly needs it.",
  },
  interviewQuestion: {
    question: "What is scope in JavaScript?",
    answer: "Scope is the part of the code where a variable can be accessed. For example, a const declared inside a block cannot be accessed outside that block.",
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
    title: "Global, Function, and Block Scope",
    bigPicture: "Scope means where a variable can be used in your code. JavaScript has different scopes: global scope, function scope, and block scope. Understanding them helps you avoid errors when a variable cannot be accessed where you need it.",
    codeSnippet: `// 1. Global scope\nconst appName = "LearnCraft";\n\nfunction showAppName() {\n  console.log(appName); // LearnCraft\n}\nshowAppName();\n\n// 2. Function scope\nfunction greet() {\n  const message = "Hello";\n  console.log(message); // Hello\n}\ngreet();\n// console.log(message); // ReferenceError\n\n// 3. Block scope\nif (true) {\n  const message = "Hello from the block";\n  console.log(message); // Hello from the block\n}\n// console.log(message); // ReferenceError`,
    breakdownTitle: "The Three Scopes in JavaScript",
    breakdownItems: [
      {
        title: "1. Global Scope",
        desc: "Declared outside all functions and blocks. Readable everywhere unless shadowed; in modules, top-level variables belong to that module unless exported.",
      },
      {
        title: "2. Function Scope",
        desc: "Declared inside a function with const, let, or var. Belongs to that function and cannot be accessed from outside.",
      },
      {
        title: "3. Block Scope",
        desc: "Code inside curly braces { } (like if statements and loops). const and let stay inside the block; var is function-scoped and leaks out.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Scoping Best Practice",
      content: "Prefer const by default and use let when you need to reassign a value. Use wider-scope variables only when different parts truly need to share them, and avoid var in modern code.",
    },
    cards: [
      {
        number: "01",
        tag: "GLOBAL SCOPE",
        title: "Global Scope",
        description: "Accessible across functions and scripts. In modules, top-level variables belong to that module unless exported.",
        color: "purple",
      },
      {
        number: "02",
        tag: "FUNCTION SCOPE",
        title: "Function Scope",
        description: "Variables declared inside a function belong to that function and cannot be reached from outside.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "BLOCK SCOPE & VAR",
        title: "Block Scope vs var",
        description: "let and const are block-scoped to { }. var is function-scoped, leaking out of if blocks into the surrounding function.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how each scope level behaves in everyday code, followed by a realistic scenario:",
    points: [
      {
        title: "1. Global Scope: Share only when needed",
        content: "In a simple script, a variable declared outside all functions and blocks is global. Code inside a function can read it unless a nearer variable with the same name shadows it. In modules, top-level variables belong to that module unless exported. Use wider-scope variables only when different parts really need to share values to avoid naming conflicts.",
      },
      {
        title: "2. Function Scope: Contained within the function",
        content: "A variable declared inside a function can be used inside that function, but not outside it. Trying to access it outside triggers a ReferenceError.",
      },
      {
        title: "3. Block Scope & Remember var",
        content: "A block is code inside curly braces { }, such as an if statement or a loop. Variables declared with let or const stay inside that block. var is function-scoped, so it can be used outside an if block if declared inside that block—but it still cannot leave the function.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "var Leaking Out of Blocks",
      code: `if (true) {\n  var oldStyle = "I can be used outside this block";\n  let modernStyle = "I stay inside this block";\n}\n\nconsole.log(oldStyle); // "I can be used outside this block"\n// console.log(modernStyle); // ReferenceError`,
      explanation: "var ignores block boundaries and leaks outside if statements and loops, risking accidental variable overwrites.",
    },
    good: {
      title: "Controlled Scope with const & let",
      code: `let sharedResult = null;\n\nif (true) {\n  const message = "Hello from the block";\n  sharedResult = message;\n}\n\nconsole.log(sharedResult); // "Hello from the block"`,
      explanation: "Declare with const inside blocks for local values. When a value must be shared, declare let in the outer scope intentionally.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Experiment with global, function, and block scope in the live editor:",
    starterCode: `// JS-08: Global, Function, and Block Scope\nconst appName = "LearnCraft";\n\nfunction showAppName() {\n  console.log("Global appName:", appName);\n}\nshowAppName();\n\nfunction greet() {\n  const message = "Hello from greet()";\n  console.log("Function message:", message);\n}\ngreet();\n\nif (true) {\n  const blockMessage = "Hello from the block";\n  console.log("Block message:", blockMessage);\n}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens when var is declared inside an if block versus let or const?",
      options: [
        "var is function-scoped and can be used outside the if block, while let and const are block-scoped and stay inside the block",
        "var stays inside the block, while let leaks outside",
        "Both var and let are block-scoped and throw a ReferenceError outside the block",
        "var cannot be declared inside an if block",
      ],
      correctIndex: 0,
      explanation: "let and const are block-scoped to { }, while var is function-scoped and leaks out of if blocks into the enclosing function or script.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Three Scopes",
        desc: "JavaScript has global scope (top-level), function scope (inside functions), and block scope (inside { }).",
      },
      {
        title: "Block Isolation",
        desc: "let and const stay safely inside { }, preventing variable leakage and naming collisions.",
      },
      {
        title: "Prefer const & let",
        desc: "Prefer const by default, let when reassigning, and avoid var in modern code.",
      },
    ],
    nextLessonPreview: {
      title: "Arrays and Common Methods",
      desc: "Learn how to store lists and transform them with map(), filter(), and find().",
    },
  },
};
