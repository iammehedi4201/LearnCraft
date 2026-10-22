import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js09CallbacksAndHigherOrderFunctionsContent: StandardLessonContent = {
  "slug": "js09-callbacks-and-higher-order-functions",
  "code": "JS-09",
  "title": "Callbacks & Higher-Order Functions: Passing Logic",
  "subtitle": "Treat functions as values, pass callbacks to customize behavior, and master higher-order function patterns.",
  "sections": [
    {
      "id": "part1",
      "label": "First-Class Functions",
      "icon": "🧩",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Higher-Order Patterns",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Pure Callbacks & AI Code",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Callback Hell vs Clean Code",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Callbacks Sandbox",
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
    "title": "Functions as First-Class Values",
    "bigPicture": "In JavaScript, functions are values just like numbers or strings. You can store them in variables, pass them into other functions as arguments (callbacks), and return them from functions.",
    "analogy": "Think of a higher-order function like a power drill, and callbacks like interchangeable drill bits. The drill provides the motor; you swap bits to perform different tasks.",
    "diagram": "processData(data, callbackFunction)\n                     |\n                     v\n             Calls callback(item)\n                     |\n                     v\n          Returns customized result",
    "breakdownTitle": "Core Concepts",
    "breakdownItems": [
      {
        "title": "Callback Function",
        "desc": "A function passed as an argument to another function to be executed later."
      },
      {
        "title": "Higher-Order Function",
        "desc": "A function that takes another function as an argument or returns a function."
      },
      {
        "title": "Separation of Concerns",
        "desc": "Separates the generic algorithm (looping, fetching) from the specific business logic."
      }
    ]
  },
  "part2": {
    "title": "Higher-Order Function Patterns",
    "intro": "See how passing functions simplifies common programming patterns.",
    "cards": [
      {
        "number": "01",
        "tag": "Callback",
        "title": "Passing Functions",
        "description": "Pass a named or anonymous function directly into another function's parameter list.",
        "codeSnippet": "function runTwice(fn) {\n  fn();\n  fn();\n}\nrunTwice(() => console.log(\"Hello!\"));\n// Output:\n// Hello!\n// Hello!",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Transform",
        "title": "Data Transformation",
        "description": "Apply a custom transformation function to each item in a dataset.",
        "codeSnippet": "function transformText(text, formatter) {\n  return formatter(text);\n}\nconst shout = (s) => s.toUpperCase() + \"!\";\nconsole.log(transformText(\"ready\", shout)); // Output: READY!",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Filter",
        "title": "Predicate Callbacks",
        "description": "Pass a function that returns true or false to select specific items.",
        "codeSnippet": "function keepIf(arr, predicate) {\n  const result = [];\n  for (const item of arr) {\n    if (predicate(item)) result.push(item);\n  }\n  return result;\n}\nconsole.log(keepIf([1, 6, 3, 8], (n) => n > 5)); // Output: [ 6, 8 ]",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Pure Callbacks Rule",
      "content": "Callbacks should take inputs and return outputs without mutating variables in the outer scope."
    }
  },
  "part3": {
    "title": "Callbacks in Practice & Reading AI Code",
    "intro": "Learn to write clean callbacks and avoid the pyramid of callback nesting.",
    "points": [
      {
        "title": "1. Passing Functions as Arguments",
        "content": "Remember to pass the function reference `fn`, not the result of calling it `fn()`, unless you specifically want to pass its return value.",
        "codeSnippet": "function notifyUser(name, sendEmail) {\n  console.log(\"Preparing notification for:\", name);\n  sendEmail(name); // Executes the callback\n}\n\nconst sendWelcome = (user) => console.log(\"Welcome email sent to:\", user);\nnotifyUser(\"Alex\", sendWelcome); // Notice: sendWelcome, NOT sendWelcome()\n// Output:\n// Preparing notification for: Alex\n// Welcome email sent to: Alex"
      },
      {
        "title": "2. Inline Anonymous Callbacks",
        "content": "Use arrow functions inline when the callback logic is small and only used in that one place.",
        "codeSnippet": "const numbers = [10, 20, 30];\n\n// Clean 1-line inline callback:\nconst doubled = numbers.map(n => n * 2);\nconsole.log(\"Doubled:\", doubled); // Output: Doubled: [ 20, 40, 60 ]"
      },
      {
        "title": "3. Keeping Callbacks Pure",
        "content": "Avoid side effects inside callbacks. A callback should compute and return data rather than modifying external variables.",
        "codeSnippet": "const prices = [15, 25, 40];\n\n// ✅ Pure callback: computes new value cleanly\nconst formatted = prices.map(p => \"$\" + p.toFixed(2));\nconsole.log(formatted); // Output: [ '$15.00', '$25.00', '$40.00' ]"
      }
    ]
  },
  "part4": {
    "title": "Callback Hell vs Flat Callbacks",
    "bad": {
      "title": "❌ Deep Callback Nesting (Callback Hell)",
      "code": "// Nested callbacks create pyramid of doom\ngetUser(userId, (user) => {\n  getOrders(user.id, (orders) => {\n    getOrderDetails(orders[0].id, (details) => {\n      console.log(\"Order details loaded:\", details);\n    });\n  });\n});",
      "explanation": "Nesting callbacks inside callbacks makes error handling painful and code unreadable."
    },
    "good": {
      "title": "✅ Named Functions or Modern Promises",
      "code": "// Named functions keep each step flat and testable:\nfunction handleDetails(details) {\n  console.log(\"Order details loaded:\", details);\n}\n\nfunction handleOrders(orders) {\n  getOrderDetails(orders[0].id, handleDetails);\n}\n\nfunction handleUser(user) {\n  getOrders(user.id, handleOrders);\n}",
      "explanation": "Breaking nested callbacks into named functions flattens execution and makes each piece reusable and testable."
    }
  },
  "part5": {
    "title": "Interactive Callbacks Sandbox",
    "intro": "Experiment with higher-order functions and callback parameters in the editor.",
    "starterCode": "// 1. Higher-order function:\nfunction processNumbers(nums, operation) {\n  const output = [];\n  for (const n of nums) {\n    output.push(operation(n));\n  }\n  return output;\n}\n\n// 2. Test with different callbacks:\nconst baseNums = [1, 2, 3, 4];\nconst squared = processNumbers(baseNums, (x) => x * x);\nconst tripled = processNumbers(baseNums, (x) => x * 3);\n\nconsole.log(\"Squared:\", squared);\nconsole.log(\"Tripled:\", tripled);\n"
  },
  "part6": {
    "title": "Key Takeaways: Callbacks & Higher-Order Functions",
    "takeaways": [
      {
        "title": "Functions as Values",
        "desc": "Functions can be stored in variables and passed into other functions as arguments."
      },
      {
        "title": "Reference vs Call",
        "desc": "Pass the function name (fn) to be called later, not fn() which calls it immediately."
      },
      {
        "title": "Pure Callbacks",
        "desc": "Design callbacks to transform and return data without mutating external state."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What is a higher-order function in JavaScript?",
      "options": [
        "A function that runs faster than regular functions",
        "A function that takes a function as an argument or returns a function",
        "A function that can only be called from inside a class",
        "A function that automatically converts strings to numbers"
      ],
      "correctIndex": 1,
      "explanation": "A higher-order function is defined as any function that accepts another function as an argument, returns a function, or both."
    }
  }
};
