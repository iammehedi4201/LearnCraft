import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js04ConditionalLogicContent: StandardLessonContent = {
  slug: "js04-conditional-logic",
  code: "JS-04",
  title: "Making Decisions with if and else",
  subtitle: "Control program flow with if/else statements, understand truthy and falsy values, and write compact ternary expressions.",
  sections: [
    {
      id: "part1",
      label: "if and else Decisions",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "if, else & Ternary",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Truthy & Falsy",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Falsy Value Traps",
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
    title: "Making Decisions with if and else",
    bigPicture: "Conditional statements (`if`, `else if`, `else`) run different code blocks depending on whether a condition is true or false. Use ternary (`? :`) for concise one-line value selection.",
    breakdownTitle: "Decision-Making Tools",
    breakdownItems: [
      {
        title: "if Statement",
        desc: "Executes a block of code enclosed in curly braces { } only if the condition evaluates to true."
      },
      {
        title: "else and else if",
        desc: "else provides a fallback when false. else if tests additional conditions sequentially."
      },
      {
        title: "Ternary Operator (? :)",
        desc: "A clean one-line shortcut to pick between two values based on a condition."
      }
    ]
  },
  part2: {
    title: "Writing if, else, and Ternary Statements",
    intro: "Use if/else to run different code blocks, and the ternary operator to choose between two values.",
    cards: [
      {
        number: "01",
        tag: "Standard",
        title: "if / else Statement",
        description: "Runs the if block when true, or the else block when false.",
        codeSnippet: "const score = 85;\nif (score >= 60) {\n  console.log(\"Passed!\"); // Output: Passed!\n} else {\n  console.log(\"Retake needed\");\n}",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Multiple Cases",
        title: "else if Chains",
        description: "Checks multiple conditions sequentially from top to bottom.",
        codeSnippet: "const hour = 14;\nif (hour < 12) {\n  console.log(\"Good morning\");\n} else if (hour < 18) {\n  console.log(\"Good afternoon\"); // Output: Good afternoon\n} else {\n  console.log(\"Good evening\");\n}",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Shortcut",
        title: "Ternary Operator (? :)",
        description: "Compact syntax: condition ? valueIfTrue : valueIfFalse.",
        codeSnippet: "const isMember = true;\nconst discount = isMember ? 20 : 0;\nconsole.log(discount); // Output: 20",
        color: "purple"
      }
    ],
    rule: {
      title: "Curly Braces Rule",
      content: "Always include curly braces { } around if and else blocks to keep your code clean, readable, and bug-free."
    }
  },
  part3: {
    title: "Understanding Truthy and Falsy Values",
    intro: "In JavaScript, any value can be evaluated as a condition. Values that evaluate to false are called falsy.",
    points: [
      {
        title: "1. The 6 Falsy Values in JavaScript",
        content: "There are only 6 values in JavaScript that evaluate to false: false, 0, \"\" (empty string), null, undefined, and NaN. Everything else is truthy!",
        codeSnippet: "console.log(Boolean(0));       // Output: false\nconsole.log(Boolean(\"\"));      // Output: false\nconsole.log(Boolean(null));    // Output: false"
      },
      {
        title: "2. Truthy Values",
        content: "Any number other than 0 (including negative numbers), any non-empty string, objects, and arrays are always truthy.",
        codeSnippet: "console.log(Boolean(\"hello\")); // Output: true\nconsole.log(Boolean(42));      // Output: true\nconsole.log(Boolean([]));      // Output: true"
      },
      {
        title: "3. Checking If Data Exists",
        content: "You can check if a variable has content by testing it directly with if (value).",
        codeSnippet: "const username = \"Maya\";\nif (username) {\n  console.log(\"Hello,\", username); // Output: Hello, Maya\n}"
      }
    ]
  },
  part4: {
    title: "Common Trap: Unintended Falsy Values",
    bad: {
      title: "❌ Confusing 0 with Missing Data",
      code: "const cartCount = 0;\n// 0 is falsy, so this branch mistakenly runs the else block!\nif (cartCount) {\n  console.log(`You have ${cartCount} items`);\n} else {\n  console.log(\"Cart is empty or not found\");\n}\n// Output: Cart is empty or not found",
      explanation: "Because 0 is falsy, testing if (cartCount) treats 0 the same as null or undefined. If 0 is a valid number in your app, compare it explicitly with cartCount > 0."
    },
    good: {
      title: "✅ Explicit Comparison for Numbers",
      code: "const cartCount = 0;\nif (cartCount > 0) {\n  console.log(`You have ${cartCount} items`);\n} else {\n  console.log(\"Cart has 0 items\");\n}\n// Output: Cart has 0 items",
      explanation: "Compare numbers explicitly with comparison operators (> or ===) instead of relying solely on truthiness."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Test user role checks and calculate discounts using if/else and the ternary operator.",
    starterCode: "const userRole = \"subscriber\";\nconst cartTotal = 120;\n\n// 1. Decision with if / else:\nif (userRole === \"admin\") {\n  console.log(\"Welcome, Admin! Full permissions granted.\");\n} else if (userRole === \"subscriber\") {\n  console.log(\"Welcome back, subscriber!\");\n} else {\n  console.log(\"Welcome, guest!\");\n}\n\n// 2. Quick decision with ternary operator:\nconst freeShipping = cartTotal >= 100 ? \"Yes\" : \"No\";\nconsole.log(\"Eligible for Free Shipping:\", freeShipping);\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "if / else Directs Flow",
        desc: "Use if to run code when conditions are met, and else to provide fallback behavior."
      },
      {
        title: "Know the 6 Falsy Values",
        desc: "Only false, 0, \"\", null, undefined, and NaN evaluate to false. All other values are truthy."
      },
      {
        title: "Ternary for Simple Choices",
        desc: "Use condition ? a : b when you need to pick between two values on a single line."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which of the following values is considered FALSY in JavaScript?",
      options: [
        "0 (the number zero)",
        "\"false\" (the word inside quotes)",
        "1 (the number one)",
        "[] (an empty array)"
      ],
      correctIndex: 0,
      explanation: "The number 0 is one of JavaScript's 6 falsy values. Any non-empty string (even \"false\") and empty arrays [] are truthy."
    }
  }
};
