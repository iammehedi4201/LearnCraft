import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js07ScopeGlobalFunctionBlockContent: StandardLessonContent = {
  "slug": "js07-scope-global-function-block",
  "code": "JS-07",
  "title": "Scope & Lexical Environment: Block, Function & Global",
  "subtitle": "Understand how variables are isolated in blocks, how functions create scopes, and how the scope chain works.",
  "sections": [
    {
      "id": "part1",
      "label": "Scope Hierarchy",
      "icon": "🌐",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Block vs Function",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Scope Chain & AI Bugs",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Variable Leak Bug",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Scope Sandbox",
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
    "title": "Where Do Variables Live?",
    "bigPicture": "Scope determines where variables are accessible in your code. Proper scoping prevents variables from colliding and accidentally overwriting each other.",
    "analogy": "Think of scope like security badges in a building. Visitors in the lobby (global) cannot enter private offices (blocks), but staff in private offices can see the lobby.",
    "diagram": "[ Global Scope: appTitle = \"LearnCraft\" ]\n       |\n       +---> [ Function Scope: user = \"Alex\" ]\n              |\n              +---> [ Block Scope: tempToken = \"xyz123\" ]\n                    (tempToken cannot escape this block!)",
    "breakdownTitle": "Three Levels of Scope",
    "breakdownItems": [
      {
        "title": "Block Scope (let & const)",
        "desc": "Variables declared inside curly braces `{}` are trapped inside that block."
      },
      {
        "title": "Function Scope",
        "desc": "Variables declared inside a function cannot be accessed outside the function."
      },
      {
        "title": "Global Scope",
        "desc": "Variables declared outside all functions and blocks, accessible everywhere."
      }
    ]
  },
  "part2": {
    "title": "Scope Levels in Action",
    "intro": "Understand how block scope, function scope, and global scope isolate variables.",
    "cards": [
      {
        "number": "01",
        "tag": "Block",
        "title": "Block Scope ({})",
        "description": "Variables declared with `let` or `const` inside `{}` cannot leak outside.",
        "codeSnippet": "if (true) {\n  const secret = \"private-key-123\";\n  console.log(\"Inside block:\", secret);\n}\n// console.log(secret); // ReferenceError: secret is not defined",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Function",
        "title": "Function Scope",
        "description": "Functions create an isolated scope for their parameters and local variables.",
        "codeSnippet": "function calculateTax(amount) {\n  const taxRate = 0.08;\n  return amount * taxRate;\n}\nconsole.log(calculateTax(100)); // Output: 8\n// console.log(taxRate); // ReferenceError: taxRate is not defined",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Lookup",
        "title": "Scope Chain",
        "description": "JavaScript looks upward through parent scopes to find variables.",
        "codeSnippet": "const globalApp = \"LearnCraft\";\nfunction showBanner() {\n  const page = \"Home\";\n  console.log(globalApp + \" - \" + page); // Output: LearnCraft - Home\n}\nshowBanner();",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Principle of Least Privilege",
      "content": "Declare variables in the narrowest scope possible. Keep global variables to an absolute minimum."
    }
  },
  "part3": {
    "title": "Scope Chain & Reading AI Code",
    "intro": "Trace variable lookup and avoid variable shadowing bugs.",
    "points": [
      {
        "title": "1. Upward Lookup Chain",
        "content": "Inner scopes can read variables from parent scopes, but parent scopes cannot reach down into child scopes.",
        "codeSnippet": "const brand = \"LearnCraft\";\n\nfunction printReceipt(item, price) {\n  const formattedPrice = \"$\" + price;\n  // Can access brand, item, and formattedPrice:\n  console.log(brand + \": \" + item + \" for \" + formattedPrice);\n}\n\nprintReceipt(\"Pro Membership\", 29);\n// Output: LearnCraft: Pro Membership for $29"
      },
      {
        "title": "2. Variable Shadowing Caution",
        "content": "When an inner variable shares the same name as an outer variable, it shadows the outer one, which can cause confusion.",
        "codeSnippet": "const theme = \"dark\";\n\nfunction renderCard() {\n  const theme = \"light\"; // Shadows the outer theme!\n  console.log(\"Card theme:\", theme); // Output: Card theme: light\n}\n\nrenderCard();\nconsole.log(\"Global theme:\", theme); // Output: Global theme: dark"
      },
      {
        "title": "3. Accidental Global Leaks",
        "content": "Assigning to an undeclared variable without `const` or `let` accidentally creates a global variable in sloppy mode.",
        "codeSnippet": "function setConfig() {\n  // ❌ Accidental global leak (missing const/let):\n  // apiEndpoint = \"https://api.dev\";\n  \n  // ✅ Clean local declaration:\n  const apiEndpoint = \"https://api.dev\";\n  console.log(\"Configured:\", apiEndpoint);\n}\nsetConfig();"
      }
    ]
  },
  "part4": {
    "title": "Accidental Variable Leaks with var",
    "bad": {
      "title": "❌ var Leaks Outside Block Scope",
      "code": "for (var i = 0; i < 3; i++) {\n  // Loop work...\n}\n\n// Bug: i leaked out into the outer scope!\nconsole.log(\"Leaked counter:\", i); // Output: Leaked counter: 3",
      "explanation": "`var` ignores block `{}` scope, leaking variables into the enclosing function or global scope and causing accidental collisions."
    },
    "good": {
      "title": "✅ let Stays Safely Contained",
      "code": "for (let i = 0; i < 3; i++) {\n  // Loop work...\n}\n\n// i is safely isolated to the loop block\n// console.log(i); // ReferenceError: i is not defined\nconsole.log(\"Loop completed cleanly!\"); // Output: Loop completed cleanly!",
      "explanation": "`let` and `const` are strictly block-scoped, ensuring loop counters and temporary variables cannot leak."
    }
  },
  "part5": {
    "title": "Interactive Scope Sandbox",
    "intro": "Observe how variables in different scopes behave in the live editor.",
    "starterCode": "// 1. Global variable:\nconst appVersion = \"1.0.0\";\n\nfunction startSession(userId) {\n  // 2. Function-scoped variable:\n  const sessionId = \"sess_\" + userId;\n  \n  if (true) {\n    // 3. Block-scoped variable:\n    const token = \"auth_tok_abc\";\n    console.log(\"Inside block - Version:\", appVersion);\n    console.log(\"Inside block - Session:\", sessionId);\n    console.log(\"Inside block - Token:\", token);\n  }\n}\n\nstartSession(42);\n"
  },
  "part6": {
    "title": "Key Takeaways: Scope & Lexical Environment",
    "takeaways": [
      {
        "title": "Block Scoping",
        "desc": "let and const are confined inside their surrounding curly braces {}."
      },
      {
        "title": "Upward Lookup",
        "desc": "Functions can access variables from outer parent scopes, but not vice versa."
      },
      {
        "title": "Avoid Globals",
        "desc": "Keep variables local to prevent accidental name collisions."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What happens when you attempt to log `item` outside of `if (true) { const item = 10; }`?",
      "options": [
        "It prints 10",
        "It prints undefined",
        "ReferenceError: item is not defined",
        "It prints null"
      ],
      "correctIndex": 2,
      "explanation": "Because `item` is declared with `const` inside a block `{}`, it is block-scoped and cannot be accessed outside the block."
    }
  }
};
