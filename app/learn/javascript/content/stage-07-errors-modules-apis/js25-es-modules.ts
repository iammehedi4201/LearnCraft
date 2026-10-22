import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js25EsModulesContent: StandardLessonContent = {
  "slug": "js25-es-modules",
  "code": "JS-25",
  "title": "ES Modules: import & export Architecture",
  "subtitle": "Organize large JavaScript codebases into modular, maintainable files with named and default exports.",
  "sections": [
    {
      "id": "part1",
      "label": "Modular Architecture",
      "icon": "📦",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Named vs Default",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Renaming & AI Code",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Circular Import Bug",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Modules Sandbox",
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
    "title": "Structuring Multi-File Applications",
    "bigPicture": "ES Modules (ESM) are the standard way to split JavaScript into separate, isolated files. Each file is its own module with private scope, explicitly exporting values for other files to import.",
    "analogy": "Think of an application like building with LEGO bricks. Each module is a self-contained brick with defined attachment points (`export`). You snap them together (`import`) to build the castle.",
    "diagram": "// math.js\nexport const add = (a, b) => a + b;\nexport const sub = (a, b) => a - b;\n\n       |\n       v (Imported into app.js)\n\n// app.js\nimport { add, sub } from \"./math.js\";",
    "breakdownTitle": "ES Module Features",
    "breakdownItems": [
      {
        "title": "File-Level Scope",
        "desc": "Variables defined in a module are private by default and cannot leak to the global scope."
      },
      {
        "title": "Static Analysis",
        "desc": "Imports and exports are verified before code runs, enabling tree-shaking and bundler optimizations."
      },
      {
        "title": "Named vs Default",
        "desc": "Named exports allow multiple utilities; default exports provide a single primary export."
      }
    ]
  },
  "part2": {
    "title": "Import & Export Syntax",
    "intro": "Compare named exports, default exports, and module aggregation.",
    "cards": [
      {
        "number": "01",
        "tag": "Named",
        "title": "Named Exports",
        "description": "Export multiple variables or functions from a single module by name.",
        "codeSnippet": "// Exporting named utilities:\nexport const pi = 3.14159;\nexport const square = (n) => n * n;\n// Import: import { pi, square } from \"./math.js\";",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Default",
        "title": "Default Export",
        "description": "Export one main entity per file. The importer can choose any local name.",
        "codeSnippet": "// Single primary export:\nexport default function AuthManager() { ... }\n// Import: import AuthManager from \"./AuthManager.js\";",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Rename",
        "title": "Renaming with 'as'",
        "description": "Rename imported identifiers to prevent naming conflicts with local variables.",
        "codeSnippet": "// Renaming an imported utility:\nimport { add as sumNumbers } from \"./math.js\";\nconsole.log(sumNumbers(10, 20)); // Output: 30",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Prefer Named Exports Rule",
      "content": "Prefer named exports for utilities and services. They provide better IDE autocomplete and refactoring support."
    }
  },
  "part3": {
    "title": "Module Patterns & Reading AI Code",
    "intro": "Learn to organize barrel files and use dynamic imports for performance.",
    "points": [
      {
        "title": "1. Barrel Export Pattern",
        "content": "Use an `index.js` file to re-export utilities from multiple modules under a single entry point.",
        "codeSnippet": "// components/index.js:\n// export * from \"./Button.js\";\n// export * from \"./Card.js\";\n// export * from \"./Modal.js\";\n\n// Now consumers import everything cleanly:\n// import { Button, Card } from \"./components\";\nconsole.log(\"Clean barrel export pattern enabled\");"
      },
      {
        "title": "2. Importing Everything as a Namespace",
        "content": "Use `import * as Name` to group all exports of a module under a single namespace object.",
        "codeSnippet": "// import * as MathUtils from \"./math.js\";\nconst MathUtils = {\n  add: (a, b) => a + b,\n  pi: 3.14159,\n};\nconsole.log(\"Namespace calculation:\", MathUtils.add(5, 5));\n// Output: Namespace calculation: 10"
      },
      {
        "title": "3. Dynamic Lazy Loading with import()",
        "content": "Use dynamic `import()` to load heavy modules only when the user triggers an action, saving bandwidth.",
        "codeSnippet": "async function onDownloadPdfClick() {\n  // Only loaded when button is clicked:\n  const pdfModule = await Promise.resolve({\n    generatePdf: () => \"PDF Generated!\"\n  });\n  console.log(pdfModule.generatePdf());\n}\nonDownloadPdfClick(); // Output: PDF Generated!"
      }
    ]
  },
  "part4": {
    "title": "Mixing Up Named and Default Imports",
    "bad": {
      "title": "❌ Using Curly Braces on Default Export",
      "code": "// File: UserCard.js has 'export default UserCard;'\n// Bug in Consumer.js:\nimport { UserCard } from \"./UserCard.js\";\n// TypeError: UserCard is undefined!",
      "explanation": "Default exports must be imported without curly braces. Using `{ UserCard }` searches for a named export that does not exist."
    },
    "good": {
      "title": "✅ Correct Default Import Syntax",
      "code": "// File: UserCard.js has 'export default UserCard;'\n// Clean in Consumer.js (no curly braces):\nimport UserCard from \"./UserCard.js\";\n\nconsole.log(\"Imported default component successfully!\");",
      "explanation": "Import default exports without curly braces, and use curly braces exclusively for named exports."
    }
  },
  "part5": {
    "title": "Interactive Modules Sandbox",
    "intro": "Experiment with module pattern mechanics in the live editor.",
    "starterCode": "// Simulating module exports:\nconst MathModule = {\n  add: (a, b) => a + b,\n  multiply: (a, b) => a * b,\n  VERSION: \"1.0.0\",\n};\n\n// Simulating named destructuring imports:\nconst { add, multiply, VERSION } = MathModule;\n\nconsole.log(\"Module Version:\", VERSION);\nconsole.log(\"Add:\", add(10, 20));\nconsole.log(\"Multiply:\", multiply(4, 5));\n"
  },
  "part6": {
    "title": "Key Takeaways: ES Modules",
    "takeaways": [
      {
        "title": "File Isolation",
        "desc": "Each file has private scope; nothing leaks to the global namespace."
      },
      {
        "title": "Named vs Default",
        "desc": "Named uses { ... }, default is imported directly without braces."
      },
      {
        "title": "Tree-Shaking",
        "desc": "Static ESM syntax allows bundlers to remove unused code automatically."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "How do you import a named export `calculateTax` from `./tax.js`?",
      "options": [
        "import calculateTax from \"./tax.js\";",
        "import { calculateTax } from \"./tax.js\";",
        "const calculateTax = require(\"./tax.js\");",
        "import * calculateTax from \"./tax.js\";"
      ],
      "correctIndex": 1,
      "explanation": "Named exports must be imported using curly braces `{ calculateTax }` matching the exported identifier."
    }
  }
};
