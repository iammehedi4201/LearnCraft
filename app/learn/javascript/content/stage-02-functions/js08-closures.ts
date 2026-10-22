import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js08ClosuresContent: StandardLessonContent = {
  "slug": "js08-closures",
  "code": "JS-08",
  "title": "Closures: Private State & Retaining Outer Scope",
  "subtitle": "Master closures to create private state, write factory functions, and understand how functions remember where they were born.",
  "sections": [
    {
      "id": "part1",
      "label": "Closure Concept",
      "icon": "🔒",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Private Encapsulation",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Factories & AI Bugs",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Closure Loop Trap",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Closures Sandbox",
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
    "title": "Functions with a Memory",
    "bigPicture": "A closure is created when an inner function remembers variables from its outer enclosing scope, even after the outer function has finished executing.",
    "analogy": "Think of a closure like a backpack. Wherever the inner function travels, it carries its backpack full of variables from the room where it was created.",
    "diagram": "function createCounter() {\n  let count = 0;              <-- Closed-over private variable\n  return () => ++count;       <-- Inner function keeps reference\n}\n\nconst countA = createCounter();\ncountA(); // 1\ncountA(); // 2 (Remembers previous state!)",
    "breakdownTitle": "Why Closures Matter",
    "breakdownItems": [
      {
        "title": "Private Variables",
        "desc": "Hide sensitive data from the global scope without using complex classes."
      },
      {
        "title": "Function Factories",
        "desc": "Generate specialized functions configured with custom initial arguments."
      },
      {
        "title": "Stateful Callbacks",
        "desc": "Maintain state across event listeners and asynchronous operations."
      }
    ]
  },
  "part2": {
    "title": "Creating Private State with Closures",
    "intro": "See how closures encapsulate state safely inside function boundaries.",
    "cards": [
      {
        "number": "01",
        "tag": "Private",
        "title": "Encapsulated State",
        "description": "Internal variables remain hidden and can only be modified through exposed methods.",
        "codeSnippet": "function createVault() {\n  let secret = 42; // Private variable\n  return {\n    getSecret: () => secret,\n    setSecret: (val) => { secret = val; }\n  };\n}\nconst vault = createVault();\nconsole.log(vault.getSecret()); // Output: 42",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Factory",
        "title": "Function Factory",
        "description": "Create customized multiplier or formatting functions on demand.",
        "codeSnippet": "function makeMultiplier(factor) {\n  return (n) => n * factor;\n}\nconst triple = makeMultiplier(3);\nconsole.log(triple(10)); // Output: 30",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Independence",
        "title": "Independent Instances",
        "description": "Each function call creates a brand new, completely isolated closure instance.",
        "codeSnippet": "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst c1 = makeCounter();\nconst c2 = makeCounter();\nconsole.log(c1(), c1(), c2()); // Output: 1 2 1",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Clean Encapsulation Rule",
      "content": "Use closures to hide implementation details and expose only the minimal API needed by callers."
    }
  },
  "part3": {
    "title": "Closures in Practice & Reading AI Code",
    "intro": "Identify closure patterns and avoid common closure memory pitfalls.",
    "points": [
      {
        "title": "1. Retaining State Across Invocations",
        "content": "The inner function retains its reference to outer variables even after the parent function has completely returned.",
        "codeSnippet": "function createGreeter(greeting) {\n  return function(name) {\n    return greeting + \", \" + name + \"!\";\n  };\n}\n\nconst sayHello = createGreeter(\"Hello\");\nconsole.log(sayHello(\"Maria\")); // Output: Hello, Maria!\nconsole.log(sayHello(\"David\")); // Output: Hello, David!"
      },
      {
        "title": "2. Counter Pattern with Private State",
        "content": "Expose an object of getter and setter methods that manipulate a shared private closure variable.",
        "codeSnippet": "function createScoreTracker() {\n  let score = 0; // Private: cannot be directly overwritten from outside\n  return {\n    addPoints: (pts) => { score += pts; },\n    getScore: () => score,\n  };\n}\n\nconst tracker = createScoreTracker();\ntracker.addPoints(50);\nconsole.log(\"Current Score:\", tracker.getScore()); // Output: Current Score: 50"
      },
      {
        "title": "3. Avoiding Closure Memory Retention",
        "content": "If a closure references an unnecessary large object, it prevents garbage collection. Only capture what you actually need.",
        "codeSnippet": "function processLargeData() {\n  const largeArray = new Array(1000).fill(\"item\");\n  const count = largeArray.length; // Capture just the count, not the array\n  \n  return () => console.log(\"Total items processed:\", count);\n}\n\nconst reporter = processLargeData();\nreporter(); // Output: Total items processed: 1000"
      }
    ]
  },
  "part4": {
    "title": "The Classic var in Loop Closure Bug",
    "bad": {
      "title": "❌ var in Asynchronous Loops",
      "code": "// Bug: All callbacks share the same single 'i' variable!\nfor (var i = 1; i <= 3; i++) {\n  setTimeout(() => {\n    console.log(\"Index:\", i); // Prints 4, 4, 4!\n  }, 10);\n}",
      "explanation": "Because `var` is function-scoped, all 3 timeout callbacks close over the exact same variable `i`, which equals 4 when the callbacks run."
    },
    "good": {
      "title": "✅ Block-Scoped let Creates New Closure per Iteration",
      "code": "// Safe: 'let' creates a fresh variable 'i' for every single iteration\nfor (let i = 1; i <= 3; i++) {\n  setTimeout(() => {\n    console.log(\"Index:\", i); // Output: 1, then 2, then 3!\n  }, 10);\n}",
      "explanation": "`let` creates a distinct, brand-new binding for each iteration of the loop, ensuring each callback captures its own correct number."
    }
  },
  "part5": {
    "title": "Interactive Closures Sandbox",
    "intro": "Experiment with private closure state and function factories.",
    "starterCode": "// 1. Create a bank account closure:\nfunction createAccount(initialBalance) {\n  let balance = initialBalance; // Private state\n  \n  return {\n    deposit: (amount) => {\n      balance += amount;\n      return \"Deposited $\" + amount;\n    },\n    getBalance: () => \"$\" + balance,\n  };\n}\n\nconst myAccount = createAccount(100);\nconsole.log(myAccount.deposit(50));\nconsole.log(\"Current Balance:\", myAccount.getBalance());\n\n// PRACTICE:\n// Add a 'withdraw(amount)' method that checks if balance >= amount.\n"
  },
  "part6": {
    "title": "Key Takeaways: Closures",
    "takeaways": [
      {
        "title": "Functions Remember",
        "desc": "A closure allows an inner function to remember variables from its lexical environment."
      },
      {
        "title": "Private State",
        "desc": "Variables defined inside the outer function cannot be accessed or modified from outside."
      },
      {
        "title": "Use let in Loops",
        "desc": "Always use let in loops with callbacks so each iteration gets its own fresh closure."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "Why can an inner function access variables of an outer function even after the outer function has returned?",
      "options": [
        "JavaScript automatically copies all variables to global memory",
        "The inner function maintains a closure reference to its lexical environment",
        "Because all variables in JavaScript are immutable",
        "The browser stores the outer function in LocalStorage"
      ],
      "correctIndex": 1,
      "explanation": "A closure preserves the reference between an inner function and the lexical scope in which it was declared, keeping those variables alive."
    }
  }
};
