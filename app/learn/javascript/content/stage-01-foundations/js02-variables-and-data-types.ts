import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js02VariablesAndDataTypesContent: StandardLessonContent = {
  "slug": "js02-variables-and-data-types",
  "code": "JS-02",
  "title": "Variables & Data Types: Storing Data with let & const",
  "subtitle": "Learn how to store values in memory, when to use const vs let, and master the core primitive types.",
  "sections": [
    {
      "id": "part1",
      "label": "Variables & Memory",
      "icon": "📦",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "const vs let",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Type Verification & AI Traps",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Reassignment Bugs",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Variables Playground",
      "icon": "🚀",
      "tag": "SANDBOX"
    },
    {
      "id": "part6",
      "label": "Key Takeaways",
      "icon": "🎓",
      "tag": "SUMMARY"
    },
    {
      "id": "part7",
      "label": "Knowledge Check",
      "icon": "🎯",
      "tag": "QUIZ"
    }
  ],
  "part1": {
    "title": "Storing Data in Memory",
    "bigPicture": "Variables are labeled containers in computer memory. Instead of retyping raw values repeatedly, you store them in a variable and reference the name throughout your code.",
    "analogy": "Think of a variable like a labeled storage box. The label is the variable name (like `username`), and the contents inside the box is the stored value (like `\"Sarah\"`).",
    "diagram": "+-------------------+         +------------------------+\n|   const appName   | ------> |  \"LearnCraft Engine\"   | (Cannot be reassigned)\n+-------------------+         +------------------------+\n\n+-------------------+         +------------------------+\n|    let score      | ------> |           10           | (Can be updated later)\n+-------------------+         +------------------------+",
    "breakdownTitle": "Modern Variable Declaration Rules",
    "breakdownItems": [
      {
        "title": "const by Default",
        "desc": "Always declare variables with `const`. It signals that the variable reference will never be reassigned."
      },
      {
        "title": "let for Changes",
        "desc": "Use `let` only when you specifically intend to reassign the variable to a new value later."
      },
      {
        "title": "Never Use var",
        "desc": "`var` is outdated and introduces unpredictable hoisting bugs across modern applications."
      }
    ]
  },
  "part2": {
    "title": "Variable Declaration Keywords",
    "intro": "Compare `const` and `let` to choose the right keyword for your data.",
    "cards": [
      {
        "number": "01",
        "tag": "Immutable",
        "title": "const (Constant)",
        "description": "Locks the variable identifier so it cannot be reassigned to a different value.",
        "codeSnippet": "const maxRetries = 3;\n// maxRetries = 4; // TypeError: Assignment to constant variable!\nconsole.log(\"Max retries:\", maxRetries); // Output: Max retries: 3",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Reassignable",
        "title": "let (Mutable)",
        "description": "Allows the variable to be reassigned to a new value whenever needed.",
        "codeSnippet": "let activeUsers = 10;\nactiveUsers = 11; // Perfectly valid\nconsole.log(\"Active users:\", activeUsers); // Output: Active users: 11",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Inspection",
        "title": "typeof Operator",
        "description": "Returns a string representing the primitive type of any variable.",
        "codeSnippet": "console.log(typeof \"Alex\"); // Output: string\nconsole.log(typeof 42);     // Output: number\nconsole.log(typeof true);   // Output: boolean",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "The const-First Rule",
      "content": "Always start with `const`. Only change it to `let` when you actually write code that reassigns it."
    }
  },
  "part3": {
    "title": "Type Verification & AI Traps",
    "intro": "Verify variable types and avoid common variable declaration mistakes.",
    "points": [
      {
        "title": "1. Default to const for Predictability",
        "content": "Code is much easier to read and debug when variables cannot change unexpectedly midway through a function.",
        "codeSnippet": "const baseUrl = \"https://api.learncraft.dev\";\nconst timeoutMs = 5000;\nconsole.log(\"Connecting to:\", baseUrl); // Output: Connecting to: https://api.learncraft.dev"
      },
      {
        "title": "2. Avoid var Completely",
        "content": "`var` is hoisted to the top of functions and ignores block scoping `{}`. Always use modern `const` and `let`.",
        "codeSnippet": "// ❌ Outdated var leaks outside blocks:\nif (true) {\n  var leaked = \"I leaked out\";\n}\nconsole.log(leaked); // Output: I leaked out (unexpected leak!)\n\n// ✅ Block-scoped let stays contained:\nif (true) {\n  const contained = \"safe\";\n}\n// console.log(contained); // ReferenceError: contained is not defined"
      },
      {
        "title": "3. Inspecting Types with typeof",
        "content": "JavaScript is dynamically typed. Check variable types with `typeof` before performing operations.",
        "codeSnippet": "const score = \"100\";\nconsole.log(typeof score); // Output: string\n\nconst cleanScore = Number(score);\nconsole.log(typeof cleanScore); // Output: number\nconsole.log(cleanScore + 50);   // Output: 150"
      }
    ]
  },
  "part4": {
    "title": "Reassignment Traps",
    "bad": {
      "title": "❌ Reassigning a Constant Variable",
      "code": "const userRole = \"viewer\";\n// Bug: Attempting to update a const variable\nuserRole = \"admin\"; // TypeError: Assignment to constant variable!",
      "explanation": "`const` prevents reassignment. Trying to assign a new value to a `const` throws a fatal `TypeError`."
    },
    "good": {
      "title": "✅ Use let When Values Must Change",
      "code": "// Declare with let when updates are required\nlet userRole = \"viewer\";\nuserRole = \"admin\"; // Clean reassignment\nconsole.log(\"Updated role:\", userRole); // Output: Updated role: admin",
      "explanation": "Use `let` whenever you know a variable will be updated over time."
    }
  },
  "part5": {
    "title": "Interactive Variables Sandbox",
    "intro": "Experiment with `const`, `let`, and `typeof` in the live editor.",
    "starterCode": "// 1. Declare a constant:\nconst courseTitle = \"JavaScript Foundations\";\n\n// 2. Declare a reassignable counter:\nlet currentModule = 1;\nconsole.log(\"Starting:\", courseTitle, \"- Module\", currentModule);\n\n// 3. Update the counter:\ncurrentModule += 1;\nconsole.log(\"Progressing to Module:\", currentModule);\n\n// 4. Check types:\nconsole.log(\"Type of courseTitle:\", typeof courseTitle);\nconsole.log(\"Type of currentModule:\", typeof currentModule);\n"
  },
  "part6": {
    "title": "Key Takeaways: Variables & Types",
    "takeaways": [
      {
        "title": "const is Default",
        "desc": "Use const for 90% of your variables to prevent accidental mutations."
      },
      {
        "title": "let for Counters & State",
        "desc": "Only use let when you explicitly reassign the variable."
      },
      {
        "title": "Check Types",
        "desc": "Use typeof to confirm whether a value is a string, number, or boolean."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What happens if you execute `const score = 10; score = 20;`?",
      "options": [
        "score becomes 20 silently",
        "score remains 10 with a warning",
        "TypeError: Assignment to constant variable",
        "ReferenceError: score is not defined"
      ],
      "correctIndex": 2,
      "explanation": "Variables declared with `const` cannot be reassigned. Attempting to assign a new value throws a `TypeError`."
    }
  }
};
