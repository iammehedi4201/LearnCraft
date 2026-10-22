import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js25EsModulesContent: StandardLessonContent = {
  slug: "js25-es-modules",
  code: "JS-25",
  title: "Using ES Modules",
  subtitle: "Organize code into modular files with ES Modules, distinguish named vs default exports, and avoid global namespace pollution.",
  sections: [
    {
      id: "part1",
      label: "Modular Code",
      icon: "📦",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "Named vs Default",
      icon: "⚡",
      tag: "SYNTAX"
    },
    {
      id: "part3",
      label: "Renaming & Wildcards",
      icon: "🏷️",
      tag: "PATTERNS"
    },
    {
      id: "part4",
      label: "Default Import Misconception",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Modules Sandbox",
      icon: "🚀",
      tag: "PRACTICE"
    },
    {
      id: "part6",
      label: "Summary Takeaways",
      icon: "🎓",
      tag: "SUMMARY"
    },
    {
      id: "part7",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT"
    }
  ],
  part1: {
    title: "Breaking Large Programs into Modules",
    bigPicture: "ES Modules (ESM) allow you to split JavaScript programs into separate files with their own private scope. You explicitly export public functions and import them where needed.",
    analogy: "Like shipping containers: each container is sealed and isolated. Only the specific goods marked on the export manifest can be unloaded and used at another port.",
    diagram: "+-----------------------------+       +-----------------------------+\n| mathUtils.js                |       | app.js                      |\n| export const add = (a, b)   | ----> | import { add } from './math'|\n| const privateSecret = 42;   |       | add(5, 10); // 15           |\n| (privateSecret stays hidden)|       |                             |\n+-----------------------------+       +-----------------------------+",
    breakdownTitle: "ES Module Fundamentals",
    breakdownItems: [
      {
        title: "Module Scope Isolation",
        desc: "Variables defined in a module are completely private to that file and cannot leak into the global scope."
      },
      {
        title: "Named Exports",
        desc: "Export multiple values by name. The importer must use matching names inside curly braces { }."
      },
      {
        title: "Default Export",
        desc: "Each file can have at most one default export, imported without curly braces using any chosen name."
      }
    ]
  },
  part2: {
    title: "Named vs Default Exports in Code",
    intro: "Two primary patterns for sharing functions and data across files.",
    cards: [
      {
        number: "01",
        tag: "Named",
        title: "Named Exports",
        description: "Export multiple items by prefixing them with the export keyword.",
        codeSnippet: "// In utils.js:\nexport const API_URL = \"https://api.com\";\nexport function formatDate(d) { return d.toISOString(); }\n\n// In main.js:\nimport { API_URL, formatDate } from \"./utils.js\";",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Default",
        title: "Default Export",
        description: "Export the primary single entity of a file without curly braces.",
        codeSnippet: "// In UserService.js:\nexport default class UserService {\n  static getAll() { return []; }\n}\n\n// In main.js:\nimport UserService from \"./UserService.js\";",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Combined",
        title: "Combined Named & Default",
        description: "Import the default export alongside named utilities in one statement.",
        codeSnippet: "// Importing default and named exports together:\nimport UserService, { API_URL } from \"./UserService.js\";",
        color: "purple"
      }
    ],
    rule: {
      title: "Export Rule",
      content: "Prefer named exports for utility libraries with multiple functions. Use default export only when a module has one clear primary responsibility (like a React component)."
    }
  },
  part3: {
    title: "Renaming and Wildcard Imports",
    intro: "Techniques for resolving import conflicts and bundling namespaces.",
    points: [
      {
        title: "1. Renaming with the 'as' Keyword",
        content: "Rename imports locally if they collide with an existing variable name in your file.",
        codeSnippet: "import { render as renderButton } from \"./Button.js\";\nimport { render as renderCard } from \"./Card.js\";\nrenderButton();\nrenderCard();"
      },
      {
        title: "2. Wildcard Namespace Import (import * as)",
        content: "Import all named exports from a file grouped under a single namespace object.",
        codeSnippet: "import * as MathOps from \"./math.js\";\nconsole.log(MathOps.add(2, 3));\nconsole.log(MathOps.subtract(10, 4));"
      },
      {
        title: "3. Top-Level await in Modules",
        content: "Modern ES modules support using await at the top level outside of any async function wrapper.",
        codeSnippet: "// In modern ES modules:\nconst config = await fetch(\"/config.json\").then(r => r.json());\nexport { config };"
      }
    ]
  },
  part4: {
    title: "Common Pitfall: Mixing Up Named and Default Imports",
    bad: {
      title: "❌ Wrapping Default Export in Curly Braces {}",
      code: "// UserService.js has: export default class UserService { ... }\n\n// Bug: Using curly braces looks for a NAMED export called UserService!\n// import { UserService } from \"./UserService.js\"; // SyntaxError / undefined!",
      explanation: "Curly braces {} are reserved for named exports. Wrapping a default export in curly braces causes an import failure."
    },
    good: {
      title: "✅ Import Default Without Braces, Named With Braces",
      code: "// Correct default import (no braces):\nimport UserService from \"./UserService.js\";\n\n// Correct named import (with braces):\nimport { formatDate } from \"./utils.js\";",
      explanation: "Default exports are imported directly by identifier; named exports require curly braces."
    }
  },
  part5: {
    title: "ES Modules Simulator Sandbox",
    intro: "Observe how modular code packages public functions and keeps internal variables private.",
    starterCode: "// Conceptual module simulation:\nconst PaymentModule = (() => {\n  const secretApiKey = \"sk_live_998877\"; // Private to module!\n\n  function processCharge(amount) {\n    return `Charged $${amount} via ${secretApiKey.slice(0, 7)}***`;\n  }\n\n  return { processCharge }; // Public named export\n})();\n\nconsole.log(PaymentModule.processCharge(150));\n// Notice: secretApiKey cannot be accessed directly:\nconsole.log(\"Direct secret access:\", PaymentModule.secretApiKey); // undefined\n"
  },
  part6: {
    title: "Key Takeaways: ES Modules",
    takeaways: [
      {
        title: "File-Level Scope",
        desc: "Module files are strictly private; only items marked with export are accessible."
      },
      {
        title: "Named vs Default",
        desc: "Named exports require matching curly braces; default exports are imported directly."
      },
      {
        title: "Renaming with as",
        desc: "Use import { original as alias } to resolve naming conflicts cleanly."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "How do you import a module that was exported using `export default function calculate() {}`?",
      options: [
        "`import { calculate } from './calc.js';`",
        "`import calculate from './calc.js';`",
        "`import * from './calc.js';`",
        "`require('./calc.js').calculate;`"
      ],
      correctIndex: 1,
      explanation: "Default exports are imported without curly braces: `import calculate from './calc.js';`. Any variable name can be chosen when importing a default export."
    }
  }
};
