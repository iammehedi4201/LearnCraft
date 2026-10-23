import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js25EsModulesContent: StandardLessonContent = {
  slug: "js25-es-modules",
  code: "JS-25",
  title: "Using ES Modules",
  subtitle: "Split code into clean reusable files using named exports, default exports, and import statements.",
  sections: [
    {
      id: "part1",
      label: "Using ES Modules",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "Named vs Default Exports",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Import Patterns",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Import Syntax Confusion",
      icon: "🛡️",
      tag: "COMMON PITFALL"
    },
    {
      id: "part5",
      label: "Code Playground",
      icon: "💻",
      tag: "PLAYGROUND"
    },
    {
      id: "part6",
      label: "Key Takeaways",
      icon: "🎓",
      tag: "KEY TAKEAWAYS"
    },
    {
      id: "part7",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT"
    }
  ],
  part1: {
    title: "Using ES Modules",
    bigPicture: "ES Modules split code into clean, isolated files. Use named exports (`export const fn`) for utilities and default exports (`export default Component`) for main features.",
    breakdownTitle: "ES Module Fundamentals",
    breakdownItems: [
      {
        title: "Named Exports (import { ... })",
        desc: "Exports multiple functions or constants from a single file by exact name."
      },
      {
        title: "Default Exports (import Name)",
        desc: "Exports one primary entity per file without needing curly braces."
      },
      {
        title: "File-Level Isolation",
        desc: "Variables in a module remain strictly private unless explicitly marked with `export`."
      }
    ]
  },
  part2: {
    title: "Named Exports vs Default Exports",
    intro: "Two ways to share code between files in JavaScript.",
    cards: [
      {
        number: "01",
        tag: "Named",
        title: "Named Exports (Multiple)",
        description: "Export multiple variables and functions by name from a utility file.",
        codeSnippet: "// utils/math.js\nexport const add = (a, b) => a + b;\nexport const multiply = (a, b) => a * b;\n\n// app.js\nimport { add, multiply } from './utils/math.js';",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Default",
        title: "Default Export (Single Primary)",
        description: "Export the primary item from a file without curly braces.",
        codeSnippet: "// components/Button.js\nexport default function Button() { return \"<button>\"; }\n\n// app.js\nimport Button from './components/Button.js';",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Rename",
        title: "Renaming with 'as'",
        description: "Rename imported identifiers to avoid name collisions.",
        codeSnippet: "import { add as sumNumbers } from './utils/math.js';\nconsole.log(sumNumbers(10, 5)); // Output: 15",
        color: "purple"
      }
    ],
    rule: {
      title: "The Curly Braces Rule",
      content: "Named imports REQUIRE curly braces: import { a, b }. Default imports NEVER use curly braces: import MyComponent."
    }
  },
  part3: {
    title: "Importing and Re-exporting Modules",
    intro: "Master module namespace imports and combined patterns.",
    points: [
      {
        title: "1. Namespace Import (* as namespace)",
        content: "Import everything from a module into a single grouped namespace object.",
        codeSnippet: "import * as MathOps from './utils/math.js';\n// Usage: MathOps.add(10, 2), MathOps.multiply(5, 5)"
      },
      {
        title: "2. Combining Default and Named Imports",
        content: "A file can export one default item alongside several named helpers.",
        codeSnippet: "import React, { useState, useEffect } from 'react';\n// React is default; useState and useEffect are named!"
      },
      {
        title: "3. Clean Tree-Shaking",
        content: "Modern bundlers (like Vite and Next.js) automatically eliminate unused named exports from your final bundle, keeping load times fast.",
        codeSnippet: "// If you only import { add }, multiply is not packaged into your bundle!"
      }
    ]
  },
  part4: {
    title: "Common Trap: Mixing Named and Default Import Syntax",
    bad: {
      title: "❌ Adding Braces to Default Imports (or omitting for named)",
      code: "// Given: export default function User() {}\n// BUG: Adding curly braces to a default export!\nimport { User } from './User.js';\n// Error: SyntaxError or User is undefined",
      explanation: "Curly braces are reserved strictly for named exports. Adding braces to a default import looks for a named export that doesn't exist."
    },
    good: {
      title: "✅ No Braces for Default Exports",
      code: "// Correct: No curly braces for default export:\nimport User from './User.js';\n\n// Correct: Use curly braces for named exports:\nimport { calculateTax } from './tax.js';",
      explanation: "Default exports import cleanly without braces; named exports use curly braces."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Test simulated module export objects and observe how named utilities work together.",
    starterCode: "// Simulating an exported utility module:\nconst StringModule = {\n  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),\n  truncate: (str, max) => str.length > max ? str.slice(0, max) + \"...\" : str\n};\n\n// Simulating importing specific functions:\nconst { capitalize, truncate } = StringModule;\n\nconsole.log(\"Capitalized name:\", capitalize(\"learncraft\"));\nconsole.log(\"Truncated snippet:\", truncate(\"JavaScript ES Modules guide\", 14));\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Modules Organize Code",
        desc: "Split logic into focused, single-purpose files using export and import."
      },
      {
        title: "Named vs Default",
        desc: "Use { named } for multiple items; use default for the primary file component."
      },
      {
        title: "Private by Default",
        desc: "Variables stay private inside their file unless you explicitly export them."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the correct syntax to import a default export from a file named 'Logger.js'?",
      options: [
        "import Logger from './Logger.js';",
        "import { Logger } from './Logger.js';",
        "import * as { Logger } from './Logger.js';",
        "require(Logger) from './Logger.js';"
      ],
      correctIndex: 0,
      explanation: "Default exports are always imported without curly braces: import Logger from './Logger.js'. Curly braces are used exclusively for named exports."
    }
  }
};
