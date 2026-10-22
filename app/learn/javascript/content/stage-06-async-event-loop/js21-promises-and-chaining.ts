import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js21PromisesAndChainingContent: StandardLessonContent = {
  "slug": "js21-promises-and-chaining",
  "code": "JS-21",
  "title": "Promises & Chaining: Managing Future Values",
  "subtitle": "Master JavaScript Promises, handle asynchronous success and errors with .then() and .catch(), and avoid callback hell.",
  "sections": [
    {
      "id": "part1",
      "label": "Promise Lifecycle",
      "icon": "🤝",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "then, catch, finally",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Chaining & AI Traps",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Broken Chain Bug",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Promises Sandbox",
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
    "title": "A Commitment to Future Data",
    "bigPicture": "A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. It replaces messy nested callbacks with clean sequential chains.",
    "analogy": "Think of a Promise like a restaurant buzzer. When you order, you receive a buzzer. It is pending while your food cooks. It either buzzes green (resolved) when ready, or buzzes red (rejected) if they ran out of food.",
    "diagram": "             new Promise()\n                   |\n            [ Pending State ]\n              /         \\\n     Resolve /           \\ Reject\n            v             v\n      [ Fulfilled ]  [ Rejected ]\n          .then()       .catch()",
    "breakdownTitle": "The Three Promise States",
    "breakdownItems": [
      {
        "title": "Pending",
        "desc": "The initial state; the asynchronous operation is still in progress."
      },
      {
        "title": "Fulfilled (Resolved)",
        "desc": "The operation succeeded, producing a resolved value handled by `.then()`."
      },
      {
        "title": "Rejected",
        "desc": "The operation failed with an error, handled by `.catch()`."
      }
    ]
  },
  "part2": {
    "title": "Promise Syntax & Handlers",
    "intro": "Create promises, handle results with `.then()`, and catch errors with `.catch()`.",
    "cards": [
      {
        "number": "01",
        "tag": "Creation",
        "title": "new Promise()",
        "description": "Wrap async logic in a Promise with resolve and reject controllers.",
        "codeSnippet": "const p = new Promise((resolve) => {\n  resolve(\"Data loaded successfully!\");\n});\np.then(data => console.log(data)); // Output: Data loaded successfully!",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Chaining",
        "title": ".then() Chaining",
        "description": "Chain multiple steps sequentially without nesting.",
        "codeSnippet": "Promise.resolve(10)\n  .then(n => n * 2)\n  .then(n => console.log(\"Final:\", n)); // Output: Final: 20",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Errors",
        "title": ".catch() & .finally()",
        "description": "Handle errors centrally and perform cleanup regardless of outcome.",
        "codeSnippet": "Promise.reject(new Error(\"Network failed\"))\n  .catch(err => console.error(err.message))\n  .finally(() => console.log(\"Request finished\"));",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Always Return in .then()",
      "content": "Always return values from inside `.then()` handlers so subsequent steps in the chain receive the data."
    }
  },
  "part3": {
    "title": "Promise Chaining & Reading AI Code",
    "intro": "Learn to build flat promise chains and handle errors gracefully.",
    "points": [
      {
        "title": "1. Returning in .then() Chains",
        "content": "Whatever you return from a `.then()` handler becomes the input value for the next `.then()` in the sequence.",
        "codeSnippet": "Promise.resolve(\"user_101\")\n  .then(userId => {\n    return { id: userId, name: \"Alex\" }; // Returns object\n  })\n  .then(user => {\n    return user.name.toUpperCase();      // Returns string\n  })\n  .then(formatted => {\n    console.log(\"Result:\", formatted);   // Output: Result: ALEX\n  });"
      },
      {
        "title": "2. Centralized Error Catching",
        "content": "A single `.catch()` at the end of the chain catches errors thrown in ANY of the preceding `.then()` steps.",
        "codeSnippet": "Promise.resolve()\n  .then(() => {\n    throw new Error(\"Payment gateway rejected card\");\n  })\n  .then(() => console.log(\"Never reached\"))\n  .catch(err => {\n    console.log(\"Handled error:\", err.message);\n  });\n// Output: Handled error: Payment gateway rejected card"
      },
      {
        "title": "3. Promise.all for Parallel Requests",
        "content": "Run multiple independent promises in parallel with `Promise.all()`. It completes when all promises resolve.",
        "codeSnippet": "const p1 = Promise.resolve(\"Users loaded\");\nconst p2 = Promise.resolve(\"Stats loaded\");\n\nPromise.all([p1, p2]).then(([users, stats]) => {\n  console.log(users, \"and\", stats);\n});\n// Output: Users loaded and Stats loaded"
      }
    ]
  },
  "part4": {
    "title": "Nesting Promises Inside .then()",
    "bad": {
      "title": "❌ Nesting Promises Creates New Callback Hell",
      "code": "// Bug: Nesting .then inside .then reintroduces pyramid of doom!\ngetUser(1).then(user => {\n  getOrders(user.id).then(orders => {\n    getOrderDetails(orders[0]).then(details => {\n      console.log(details);\n    });\n  });\n});",
      "explanation": "Nesting `.then()` calls inside each other creates the exact same unreadable pyramid as old callback hell."
    },
    "good": {
      "title": "✅ Flat Promise Chain",
      "code": "// Clean: Return promises to flatten the chain\ngetUser(1)\n  .then(user => getOrders(user.id))\n  .then(orders => getOrderDetails(orders[0]))\n  .then(details => console.log(details))\n  .catch(err => console.error(err));",
      "explanation": "Return inner promises to keep the chain flat, readable, and protected by a single error handler."
    }
  },
  "part5": {
    "title": "Interactive Promises Sandbox",
    "intro": "Create promises and experiment with chaining transformations.",
    "starterCode": "console.log(\"Starting Promise execution...\");\n\n// 1. Create a resolved promise pipeline:\nPromise.resolve(25)\n  .then(price => {\n    console.log(\"Base price:\", price);\n    return price * 1.08; // Add 8% tax\n  })\n  .then(total => {\n    console.log(\"Total with tax: $\" + total.toFixed(2));\n    return total;\n  })\n  .catch(err => console.error(\"Error occurred:\", err));\n"
  },
  "part6": {
    "title": "Key Takeaways: Promises",
    "takeaways": [
      {
        "title": "Three States",
        "desc": "A Promise is either pending, fulfilled with data, or rejected with an error."
      },
      {
        "title": "Return to Chain",
        "desc": "Always return values from .then() handlers to pass data to the next step."
      },
      {
        "title": "Centralized Catch",
        "desc": "A single .catch() at the end captures errors from any step in the chain."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What happens if an error is thrown inside the first `.then()` of a 4-step promise chain?",
      "options": [
        "The program crashes immediately without warning",
        "Execution jumps past the remaining .then() handlers straight to the .catch() handler",
        "The error is silently converted to 0",
        "The chain restarts from the beginning"
      ],
      "correctIndex": 1,
      "explanation": "When an error is thrown inside a `.then()` handler, the promise is rejected and JavaScript skips remaining `.then()` steps to execute the nearest `.catch()` handler."
    }
  }
};
