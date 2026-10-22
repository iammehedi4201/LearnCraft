import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js04ConditionalLogicContent: StandardLessonContent = {
  "slug": "js04-conditional-logic",
  "code": "JS-04",
  "title": "Conditional Logic: if/else, Guard Clauses & Ternary",
  "subtitle": "Make decisions in code with if/else statements, flatten complex logic with guard clauses, and use ternary operators cleanly.",
  "sections": [
    {
      "id": "part1",
      "label": "Branching Logic",
      "icon": "🔀",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Conditionals Syntax",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Guard Clauses & AI Traps",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Deep Nesting Bug",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Conditionals Sandbox",
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
    "title": "Controlling Execution with Conditions",
    "bigPicture": "Real-world applications adapt to data. Conditional logic allows your program to choose between different execution paths depending on user actions and system state.",
    "analogy": "Think of conditionals like a railway switch. Depending on whether the signal is green or red, the train safely continues down track A or track B.",
    "diagram": "              [ Condition: score >= 80 ]\n                     /          \\\n            True    /            \\   False\n                   v              v\n     console.log(\"Pass\")    console.log(\"Retake\")",
    "breakdownTitle": "Decision Making Tools",
    "breakdownItems": [
      {
        "title": "if / else",
        "desc": "The fundamental branching structure for choosing between execution blocks."
      },
      {
        "title": "Guard Clauses",
        "desc": "Returning early from functions when errors or invalid data are encountered."
      },
      {
        "title": "Ternary Operator (? :)",
        "desc": "A compact one-line expression for choosing between two values."
      }
    ]
  },
  "part2": {
    "title": "Decision Structures in JavaScript",
    "intro": "Compare `if / else`, ternary operators, and switch statements.",
    "cards": [
      {
        "number": "01",
        "tag": "Standard",
        "title": "if / else Statement",
        "description": "Executes code blocks based on whether the condition evaluates to true or false.",
        "codeSnippet": "const balance = 120;\nif (balance >= 50) {\n  console.log(\"Purchase approved!\"); // Output: Purchase approved!\n} else {\n  console.log(\"Insufficient funds.\");\n}",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Concise",
        "title": "Ternary Operator (? :)",
        "description": "A compact single-line expression for assigning values conditionally.",
        "codeSnippet": "const age = 20;\nconst status = age >= 18 ? \"Adult\" : \"Minor\";\nconsole.log(\"Status:\", status); // Output: Status: Adult",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Multi-branch",
        "title": "Switch Statement",
        "description": "Cleanly compares a single variable against multiple exact match cases.",
        "codeSnippet": "const role = \"admin\";\nswitch (role) {\n  case \"admin\":\n    console.log(\"Full control\"); // Output: Full control\n    break;\n  default:\n    console.log(\"Standard access\");\n}",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Keep It Flat Rule",
      "content": "Avoid nesting `if` statements inside other `if` statements. Use guard clauses to exit early instead."
    }
  },
  "part3": {
    "title": "Guard Clauses & AI Code Reading",
    "intro": "Clean up messy nested conditionals using guard clauses and early returns.",
    "points": [
      {
        "title": "1. Guard Clauses for Clean Flow",
        "content": "Validate input requirements at the start of the function and return immediately if invalid. The rest of your code stays flat and easy to read.",
        "codeSnippet": "function registerUser(email, password) {\n  if (!email) return \"Error: Email required\";\n  if (!password || password.length < 6) return \"Error: Password too short\";\n  \n  return \"User registered successfully!\";\n}\n\nconsole.log(registerUser(\"test@test.com\", \"123456\")); \n// Output: User registered successfully!"
      },
      {
        "title": "2. The AI Nested Ternary Trap",
        "content": "AI tools often write chained ternary operators `a ? b : c ? d : e`. These are very difficult to read. Replace them with clear `if / else` statements.",
        "codeSnippet": "// ❌ Hard to read:\n// const badge = score > 90 ? \"Gold\" : score > 75 ? \"Silver\" : \"Bronze\";\n\n// ✅ Clean and readable:\nfunction getBadge(score) {\n  if (score > 90) return \"Gold\";\n  if (score > 75) return \"Silver\";\n  return \"Bronze\";\n}\nconsole.log(\"Badge earned:\", getBadge(82)); // Output: Badge earned: Silver"
      },
      {
        "title": "3. Truthy Checks for Input Validation",
        "content": "Use truthy checks to verify that objects, strings, and arrays exist before reading their properties.",
        "codeSnippet": "function greetUser(user) {\n  if (!user || !user.name) {\n    return \"Hello, Guest!\";\n  }\n  return \"Hello, \" + user.name + \"!\";\n}\n\nconsole.log(greetUser(null)); // Output: Hello, Guest!\nconsole.log(greetUser({ name: \"Sarah\" })); // Output: Hello, Sarah!"
      }
    ]
  },
  "part4": {
    "title": "Nested Pyramid of Doom",
    "bad": {
      "title": "❌ Deeply Nested Conditionals",
      "code": "function processOrder(order) {\n  if (order) {\n    if (order.items.length > 0) {\n      if (order.hasPaid) {\n        console.log(\"Shipping order...\");\n      } else {\n        console.log(\"Payment required\");\n      }\n    } else {\n      console.log(\"Empty cart\");\n    }\n  } else {\n    console.log(\"No order found\");\n  }\n}",
      "explanation": "Deep nesting creates a 'pyramid of doom' where edge cases are pushed far down and logic is hard to follow."
    },
    "good": {
      "title": "✅ Flat Guard Clauses",
      "code": "function processOrder(order) {\n  if (!order) return \"No order found\";\n  if (order.items.length === 0) return \"Empty cart\";\n  if (!order.hasPaid) return \"Payment required\";\n\n  return \"Shipping order...\";\n}\n\nconsole.log(processOrder({ items: [\"Book\"], hasPaid: true }));\n// Output: Shipping order...",
      "explanation": "Guard clauses handle errors up front and return early, leaving the happy path clean and un-nested."
    }
  },
  "part5": {
    "title": "Interactive Conditionals Sandbox",
    "intro": "Test guard clauses and conditional branching in the sandbox.",
    "starterCode": "// 1. Guard clause function:\nfunction calculateDiscount(cartTotal, isMember) {\n  if (cartTotal <= 0) return 0;\n  if (!isMember) return 0;\n  \n  return cartTotal * 0.15; // 15% discount for members\n}\n\nconst discount = calculateDiscount(100, true);\nconsole.log(\"Member Discount:\", discount);\n\n// 2. Ternary assignment:\nconst isShippingFree = discount > 10 ? \"Free Shipping\" : \"$5 Shipping\";\nconsole.log(\"Shipping Status:\", isShippingFree);\n"
  },
  "part6": {
    "title": "Key Takeaways: Conditional Logic",
    "takeaways": [
      {
        "title": "Return Early",
        "desc": "Use guard clauses at the top of functions to keep logic flat and clean."
      },
      {
        "title": "Simple Ternaries Only",
        "desc": "Use ternary operators only for simple 1-line value assignments."
      },
      {
        "title": "Check Before Accessing",
        "desc": "Verify that objects and variables exist before accessing their properties."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "Why are guard clauses preferred over deeply nested `if / else` blocks?",
      "options": [
        "They run 10x faster in the browser",
        "They handle invalid cases early and keep code flat and readable",
        "They prevent variables from using computer memory",
        "They automatically convert strings to numbers"
      ],
      "correctIndex": 1,
      "explanation": "Guard clauses handle edge cases and invalid conditions at the top of a function, keeping the main happy path flat and easy to read."
    }
  }
};
