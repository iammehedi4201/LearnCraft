import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js07ScopeGlobalFunctionBlockContent: StandardLessonContent = {
  slug: "js07-scope-global-function-block",
  code: "JS-07",
  title: "How Scope Works",
  subtitle: "Master lexical scoping, inside-out scope chain lookup, variable shadowing, and why block-scoped let/const prevents leaks.",
  sections: [
    {
      id: "part1",
      label: "Lexical Scope Model",
      icon: "🌐",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "The Three Scope Tiers",
      icon: "📐",
      tag: "MECHANICS"
    },
    {
      id: "part3",
      label: "The Scope Chain",
      icon: "🔗",
      tag: "LOOKUP CHAIN"
    },
    {
      id: "part4",
      label: "Variable Shadowing & var Leak",
      icon: "⚠️",
      tag: "TRAPS"
    },
    {
      id: "part5",
      label: "Scope Sandbox",
      icon: "🚀",
      tag: "PRACTICE"
    },
    {
      id: "part6",
      label: "Core Takeaways",
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
    title: "How Lexical Scope Works",
    bigPicture: "Scope determines where variables are accessible in your code. JavaScript uses lexical scoping: accessibility is determined strictly by the physical location where variables and blocks are written in the source code.",
    analogy: "Think of one-way tinted glass: someone inside a room can look out and see everything in the hallway, but people outside in the hallway cannot see inside your room.",
    diagram: "+---------------------------------------------------+\n| GLOBAL SCOPE                                      |\n| const site = \"LearnCraft\";                         |\n|                                                   |\n|   +---------------------------------------------+ |\n|   | FUNCTION SCOPE: loadUser()                  | |\n|   | const userId = 42;                          | |\n|   |                                             | |\n|   |   +---------------------------------------+ | |\n|   |   | BLOCK SCOPE: if (isAdmin) { ... }     | | |\n|   |   | const token = \"XYZ-999\";              | | |\n|   |   | (token is trapped inside this block!) | | |\n|   |   +---------------------------------------+ | |\n|   +---------------------------------------------+ |\n+---------------------------------------------------+",
    breakdownTitle: "Scope Rules",
    breakdownItems: [
      {
        title: "Lexical Scoping",
        desc: "Scope is determined at author time when you write the code, based on the nesting of blocks and functions."
      },
      {
        title: "Inside-Out Visibility",
        desc: "Code inside an inner block can see and access variables declared in outer parent scopes. Outer code cannot access inner variables."
      },
      {
        title: "Block vs Function Isolation",
        desc: "const and let are bound to the nearest enclosing curly braces {}. var ignores blocks and leaks to the enclosing function."
      }
    ]
  },
  part2: {
    title: "The Three Tiers of Scope in JavaScript",
    intro: "Understand the three distinct boundaries where variables live in memory.",
    cards: [
      {
        number: "01",
        tag: "Global",
        title: "Global Scope",
        description: "Variables declared outside of any function or curly braces. Accessible anywhere in the application.",
        codeSnippet: "const APP_NAME = \"LearnCraft\";\n\nfunction showApp() {\n  console.log(APP_NAME); // Can access global\n}\nshowApp(); // Output: LearnCraft",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Function",
        title: "Function Scope",
        description: "Variables declared inside a function body cannot be accessed from outside that function.",
        codeSnippet: "function generateToken() {\n  const secret = \"jwt_secret_123\";\n  return secret;\n}\n\ngenerateToken();\n// console.log(secret); // ReferenceError: secret is not defined",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Block",
        title: "Block Scope (let / const)",
        description: "Variables declared with let or const inside any { ... } block (if, for, while) are trapped inside.",
        codeSnippet: "if (true) {\n  const blockVar = \"Protected inside if block\";\n}\n// console.log(blockVar); // ReferenceError: blockVar is not defined",
        color: "purple"
      }
    ],
    rule: {
      title: "The One-Way Rule of Scope",
      content: "Inner scopes can look outward to their parent scopes. Outer scopes can NEVER reach inward into a child function or block."
    }
  },
  part3: {
    title: "The Scope Chain: Inside-Out Lookup",
    intro: "Step-by-step resolution of variable identifiers by the JavaScript engine.",
    points: [
      {
        title: "1. Check Current Local Scope",
        content: "When a variable name is read, the engine first searches the immediate current block or function environment.",
        codeSnippet: "function checkLocal() {\n  const val = \"local\";\n  console.log(val); // Step 1: Found immediately in local scope -> 'local'\n}\ncheckLocal(); // Output: local"
      },
      {
        title: "2. Climb to Enclosing Parent Scope",
        content: "If the variable is not in the local scope, the engine moves up to the enclosing parent scope and checks there.",
        codeSnippet: "const globalGreeting = \"Hello\";\nfunction outer() {\n  function inner() {\n    // Not in inner -> climbs up to global scope\n    console.log(globalGreeting);\n  }\n  inner();\n}\nouter(); // Output: Hello"
      },
      {
        title: "3. Reaching the Top (ReferenceError)",
        content: "If the engine climbs all the way up to the Global Scope and still cannot find the variable, it throws a fatal ReferenceError.",
        codeSnippet: "function findNonExistent() {\n  // console.log(unknownData);\n  // ReferenceError: unknownData is not defined\n}\nfindNonExistent();"
      }
    ]
  },
  part4: {
    title: "Common Traps: Variable Shadowing & var Leaks",
    bad: {
      title: "❌ var Leaks Out of Block Scopes",
      code: "if (true) {\n  var leakedSecret = \"Exposed outside!\";\n}\n// var does NOT respect block scope {}\nconsole.log(leakedSecret); // Output: Exposed outside! (Pollutes scope)",
      explanation: "var ignores curly braces and leaks variables into the enclosing function or global scope, causing hard-to-track bugs."
    },
    good: {
      title: "✅ const & let Respect Block Scope",
      code: "if (true) {\n  const safeSecret = \"Protected inside!\";\n  console.log(safeSecret); // Output: Protected inside!\n}\n// safeSecret is inaccessible out here, keeping code modular\n// console.log(safeSecret); // ReferenceError (Safe!)",
      explanation: "Using const and let locks the variable within its block, preventing accidental data leaks and scope pollution."
    }
  },
  part5: {
    title: "Scope Chain & Shadowing Sandbox",
    intro: "Observe how inner variables shadow outer variables with the same name, and how scope lookup resolves.",
    starterCode: "const role = \"Global Guest\";\n\nfunction dashboard() {\n  // Shadowing: inner variable hides the outer 'role'\n  const role = \"Dashboard Manager\";\n\n  if (true) {\n    const role = \"Block Admin\";\n    console.log(\"1. Inside block scope:\", role);\n  }\n\n  console.log(\"2. Inside function scope:\", role);\n}\n\ndashboard();\nconsole.log(\"3. In global scope:\", role);\n"
  },
  part6: {
    title: "Key Takeaways: Scope",
    takeaways: [
      {
        title: "Lexical Scoping",
        desc: "Scope is determined by where variables are physically written in code."
      },
      {
        title: "Inside-Out Lookup",
        desc: "The engine searches the scope chain from inside out, throwing ReferenceError if not found."
      },
      {
        title: "Block Isolation with const/let",
        desc: "Always use const and let to ensure variables remain safely contained within their blocks."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens if a function tries to access a variable declared with `const` inside one of its child `if` blocks?",
      options: [
        "It successfully reads the value because parent scopes can see inside child blocks",
        "It throws a ReferenceError because outer scopes cannot reach inside child block scopes",
        "It returns undefined instead of throwing an error",
        "It creates a new global variable with the same name automatically"
      ],
      correctIndex: 1,
      explanation: "Block scope is strictly one-way: code inside the block can look outward, but code outside the block cannot access variables declared inside with const or let."
    }
  }
};
