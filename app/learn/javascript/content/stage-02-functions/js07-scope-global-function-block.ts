import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js07ScopeGlobalFunctionBlockContent: StandardLessonContent = {
  slug: "js07-scope-global-function-block",
  code: "JS-07",
  title: "How Scope Works",
  subtitle: "Understand variable visibility boundaries, why let and const stay inside curly braces, and how the one-way scope chain works.",
  sections: [
    {
      id: "part1",
      label: "How Scope Works",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "Three Scope Tiers",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "The Scope Chain",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Block Scope Leak",
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
    title: "How Scope Works",
    bigPicture: "Scope controls where variables can be accessed. Variables created with `const` and `let` are block-scoped—visible inside their curly braces `{}` and inner children, but never accessible from outside.",
    breakdownTitle: "Core Scope Principles",
    breakdownItems: [
      {
        title: "Block Scope (const & let)",
        desc: "Variables are trapped inside the enclosing curly braces { } where they were defined."
      },
      {
        title: "One-Way Visibility",
        desc: "Inner functions can see variables in outer scopes, but outer scopes cannot reach inward."
      },
      {
        title: "ReferenceError",
        desc: "Accessing an out-of-scope variable triggers an immediate ReferenceError."
      }
    ]
  },
  part2: {
    title: "Global, Function, and Block Scope",
    intro: "Understand where variables can and cannot be accessed.",
    cards: [
      {
        number: "01",
        tag: "Global",
        title: "Global Scope",
        description: "Variables declared outside of all functions and blocks. Accessible anywhere in the file.",
        codeSnippet: "const APP_NAME = \"LearnCraft\";\nfunction printApp() {\n  console.log(APP_NAME); // Can read global variable\n}\nprintApp(); // Output: LearnCraft",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Function",
        title: "Function Scope",
        description: "Variables declared inside a function body cannot be accessed from outside that function.",
        codeSnippet: "function createToken() {\n  const secret = \"12345\";\n  return secret;\n}\ncreateToken();\n// console.log(secret); // ReferenceError: secret is not defined",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Block",
        title: "Block Scope ({ })",
        description: "Variables declared with let or const inside { } (like if, for) are trapped inside.",
        codeSnippet: "if (true) {\n  const message = \"Hello from inside if!\";\n  console.log(message);\n}\n// console.log(message); // ReferenceError: message is not defined",
        color: "purple"
      }
    ],
    rule: {
      title: "The One-Way Scope Rule",
      content: "Inner scopes can look outward to their parent scopes. Outer scopes can NEVER reach inward into a child function or block."
    }
  },
  part3: {
    title: "How the Scope Chain Searches for Variables",
    intro: "Watch how JavaScript looks up variables step by step.",
    points: [
      {
        title: "1. Look in Current Local Block First",
        content: "When you use a variable, JavaScript checks the current immediate block first.",
        codeSnippet: "function test() {\n  const localVal = \"A\";\n  console.log(localVal); // Found locally -> 'A'\n}\ntest(); // Output: A"
      },
      {
        title: "2. Look Up to Enclosing Parent",
        content: "If not found locally, JavaScript steps outward to the parent scope to check.",
        codeSnippet: "const globalGreeting = \"Hello\";\nfunction greet() {\n  // Found by looking outward to parent scope:\n  console.log(globalGreeting);\n}\ngreet(); // Output: Hello"
      },
      {
        title: "3. ReferenceError if Not Found",
        content: "If the search reaches the global scope and the variable does not exist, a ReferenceError is thrown.",
        codeSnippet: "// console.log(unknownVariable);\n// ReferenceError: unknownVariable is not defined"
      }
    ]
  },
  part4: {
    title: "Common Trap: Accessing Block Variables Outside",
    bad: {
      title: "❌ Accessing Block-Scoped Variables Outside",
      code: "if (true) {\n  const discount = 15;\n}\n// BUG: discount only exists inside the if block!\nconsole.log(discount);\n// ReferenceError: discount is not defined",
      explanation: "Because discount was declared with const inside the { } block, it is destroyed as soon as the block ends."
    },
    good: {
      title: "✅ Declare in the Outer Scope with let",
      code: "let discount = 0;\nif (true) {\n  discount = 15; // Reassign outer variable\n}\nconsole.log(\"Applied discount:\", discount);\n// Output: Applied discount: 15",
      explanation: "Declare the variable in the outer scope using let if you need to use its value after the block finishes."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Run this code to observe how inner blocks can read outer variables, and how variable shadowing works.",
    starterCode: "const siteTheme = \"dark\";\n\nfunction renderProfile() {\n  const username = \"Alex\";\n\n  if (true) {\n    const badge = \"Pro Member\";\n    // Inner block can read its own variables AND outer variables:\n    console.log(\"User:\", username, \"| Badge:\", badge, \"| Theme:\", siteTheme);\n  }\n}\n\nrenderProfile();\nconsole.log(\"Global theme remains:\", siteTheme);\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "let and const are Block-Scoped",
        desc: "Variables stay trapped inside the curly braces { } where they were declared."
      },
      {
        title: "Scope is One-Way",
        desc: "Inside code can look out to parent scopes; outside code cannot reach in."
      },
      {
        title: "Declare Outside to Share",
        desc: "If you need a value outside an if or loop block, declare it with let before the block."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens if code outside an 'if' block tries to access a variable declared with 'const' inside that 'if' block?",
      options: [
        "A ReferenceError is thrown because const variables are trapped inside the block",
        "It successfully reads the value because parent scopes can see inside child blocks",
        "It returns null instead of throwing an error",
        "It automatically converts the variable into a global variable"
      ],
      correctIndex: 0,
      explanation: "const and let are strictly block-scoped. They exist only within the curly braces { } where they are declared. Accessing them from outside causes a ReferenceError."
    }
  }
};
