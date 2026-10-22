import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js01HowJavascriptRunsContent: StandardLessonContent = {
  "slug": "js01-how-javascript-runs",
  "code": "JS-01",
  "title": "How JavaScript Runs: The Console & Sequential Steps",
  "subtitle": "Understand how computers execute JavaScript line by line, and how to print output and calculations with console.log().",
  "sections": [
    {
      "id": "part1",
      "label": "Sequential Execution",
      "icon": "⚡",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Printing with console.log",
      "icon": "💻",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Tracing & AI Code Reading",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Common Errors & Fixes",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Interactive Sandbox",
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
    "title": "How JavaScript Executes Code",
    "bigPicture": "JavaScript is a programming language that executes instructions in strict sequential order from top to bottom. A JavaScript engine reads each line, runs it completely, and then moves to the next.",
    "analogy": "Think of JavaScript like reading a cooking recipe. You must preheat the oven before baking the cake. Skipping ahead or changing the order produces errors.",
    "diagram": "+---------------------------------------+\n| 1. console.log(\"Initializing...\");    |  --> Executed First\n+---------------------------------------+\n                   |\n                   v\n+---------------------------------------+\n| 2. const total = 10 * 5;              |  --> Executed Second\n+---------------------------------------+\n                   |\n                   v\n+---------------------------------------+\n| 3. console.log(\"Done:\", total);       |  --> Executed Third\n+---------------------------------------+",
    "breakdownTitle": "Core Execution Principles",
    "breakdownItems": [
      {
        "title": "Line-by-Line Flow",
        "desc": "Each statement runs one after another in order. A line always has access to what was defined above it."
      },
      {
        "title": "The Console as Your Window",
        "desc": "The `console.log()` function displays text, numbers, and calculation results so you can inspect your program state."
      },
      {
        "title": "Expressions Produce Values",
        "desc": "Math operations like `10 + 5` are calculated immediately before being passed to other functions."
      }
    ]
  },
  "part2": {
    "title": "Displaying Output with console.log()",
    "intro": "Use `console.log()` to print text, numbers, and multiple values together.",
    "cards": [
      {
        "number": "01",
        "tag": "Strings",
        "title": "Text in Quotes",
        "description": "Wrap literal words inside double or single quotes so JavaScript treats them as plain text.",
        "codeSnippet": "console.log(\"Hello, LearnCraft!\");\n// Output: Hello, LearnCraft!",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Math",
        "title": "Numbers & Math",
        "description": "Leave numbers and math unquoted so the JavaScript engine calculates the result.",
        "codeSnippet": "console.log(10 + 5 * 2);\n// Output: 20",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Multi-value",
        "title": "Comma-Separated Values",
        "description": "Pass multiple values separated by commas. JavaScript adds a space between them automatically.",
        "codeSnippet": "console.log(\"Total score:\", 95);\n// Output: Total score: 95",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Golden Rule of Output",
      "content": "Put quotes around text you want to display; leave numbers and math expressions unquoted so JavaScript calculates them."
    }
  },
  "part3": {
    "title": "Tracing Execution & Reading AI Code",
    "intro": "Follow code sequentially from top to bottom to verify logic and catch subtle bugs.",
    "points": [
      {
        "title": "1. Trace Top to Bottom",
        "content": "Always follow code execution from the first line downward. Verify what each line produces before moving forward.",
        "codeSnippet": "console.log(\"Step 1: Connecting to server...\");\nconsole.log(\"Step 2: Authenticating user...\");\nconsole.log(\"Step 3: Loading dashboard.\");\n// Output:\n// Step 1: Connecting to server...\n// Step 2: Authenticating user...\n// Step 3: Loading dashboard."
      },
      {
        "title": "2. Inspect Values with Logs",
        "content": "When reviewing code, log variables at each step to verify they hold the exact values you expect.",
        "codeSnippet": "const price = 40;\nconst tax = price * 0.15;\nconsole.log(\"Tax amount:\", tax); // Output: Tax amount: 6\nconsole.log(\"Total due:\", price + tax); // Output: Total due: 46"
      },
      {
        "title": "3. Comments for Clarity",
        "content": "Use double slashes for notes. The JavaScript engine ignores comments, making them perfect for explaining intent.",
        "codeSnippet": "// Apply a 20% promotional discount:\nconst discountRate = 0.2;\nconst finalAmount = 100 * (1 - discountRate);\nconsole.log(\"Final amount:\", finalAmount); // Output: Final amount: 80"
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes & How to Fix Them",
    "bad": {
      "title": "❌ Missing Quotes & Quoting Math",
      "code": "// ReferenceError: JavaScript looks for a variable named Welcome\nconsole.log(Welcome);\n\n// Bug: Quotes prevent calculation\nconsole.log(\"10 + 5\"); // Output: \"10 + 5\" (literal text)",
      "explanation": "Unquoted words cause a `ReferenceError` because JavaScript treats them as variable names. Quoting math expressions treats them as literal text instead of numbers."
    },
    "good": {
      "title": "✅ Quoted Strings & Solved Math",
      "code": "// Text wrapped in quotes\nconsole.log(\"Welcome\"); // Output: Welcome\n\n// Math left unquoted\nconsole.log(10 + 5); // Output: 15\n\n// Combined label and math\nconsole.log(\"Total:\", 10 + 5); // Output: Total: 15",
      "explanation": "Always wrap literal words in quotes and leave math expressions unquoted so JavaScript calculates them."
    }
  },
  "part5": {
    "title": "Interactive Console Sandbox",
    "intro": "Run this script to observe sequential execution. Then complete the two practice steps below.",
    "starterCode": "// 1. Print text:\nconsole.log(\"Hello from LearnCraft!\");\n\n// 2. Perform math:\nconsole.log(\"10 * 5 =\", 10 * 5);\n\n// 3. Sequential steps:\nconsole.log(\"Step 1: Ready\");\nconsole.log(\"Step 2: Done\");\n\n// PRACTICE:\n// 1. Print your name with console.log(\"My name is ...\");\n// 2. Print the result of 100 divided by 4 (no quotes around 100 / 4);\n"
  },
  "part6": {
    "title": "Key Takeaways: How JavaScript Runs",
    "takeaways": [
      {
        "title": "Sequential Flow",
        "desc": "JavaScript runs line by line from top to bottom."
      },
      {
        "title": "Strings vs Numbers",
        "desc": "Wrap text in quotes; leave math unquoted so JavaScript solves it."
      },
      {
        "title": "Debugging with Logs",
        "desc": "Inspect values at each step with console.log() to verify AI and human code."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What will `console.log(\"20 + 10\")` print to the screen?",
      "options": [
        "30",
        "\"20 + 10\"",
        "Error: Invalid syntax",
        "undefined"
      ],
      "correctIndex": 1,
      "explanation": "Because `\"20 + 10\"` is wrapped in quotation marks, JavaScript treats it as a string literal and prints the exact characters instead of doing math."
    }
  }
};
