import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js17TheThisKeywordContent: StandardLessonContent = {
  "slug": "js17-the-this-keyword",
  "code": "JS-17",
  "title": "The this Keyword: Execution Context & Binding",
  "subtitle": "Understand how 'this' is determined at call time, lexical 'this' in arrows, and explicit binding.",
  "sections": [
    {
      "id": "part1",
      "label": "Context & Callers",
      "icon": "🧭",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Binding Rules",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Arrows & AI Traps",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Lost Context Bug",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "this Sandbox",
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
    "title": "Who Called the Function?",
    "bigPicture": "In JavaScript, `this` is a special identifier that refers to the execution context. For regular functions, `this` is determined by HOW the function is called, not where it is defined.",
    "analogy": "Think of `this` like the pronoun 'I'. When Alice says 'I', it means Alice. When Bob says 'I', it means Bob. Who 'I' refers to depends entirely on who is speaking.",
    "diagram": "user.greet()       --> 'this' is user (object to left of dot)\nconst fn = user.greet;\nfn()               --> 'this' is undefined/global (detached from user!)",
    "breakdownTitle": "The Four Binding Rules",
    "breakdownItems": [
      {
        "title": "Method Call (Implicit)",
        "desc": "When called as `obj.method()`, `this` points to `obj`."
      },
      {
        "title": "Arrow Functions (Lexical)",
        "desc": "Arrows do not have their own `this`; they inherit `this` from the enclosing scope."
      },
      {
        "title": "Explicit Binding",
        "desc": "`call`, `apply`, and `bind` explicitly set `this`."
      }
    ]
  },
  "part2": {
    "title": "Context Binding in Action",
    "intro": "Compare implicit method context, arrow functions, and explicit binding.",
    "cards": [
      {
        "number": "01",
        "tag": "Method",
        "title": "Implicit Method Binding",
        "description": "When called with dot notation, `this` refers to the parent object.",
        "codeSnippet": "const user = {\n  name: \"Alex\",\n  greet() { return \"Hi, \" + this.name; }\n};\nconsole.log(user.greet()); // Output: Hi, Alex",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Lexical",
        "title": "Arrow Functions (Lexical)",
        "description": "Inherits `this` from the enclosing scope where the function was created.",
        "codeSnippet": "const timer = {\n  count: 0,\n  start() {\n    setTimeout(() => {\n      this.count++;\n      console.log(\"Count:\", this.count);\n    }, 10);\n  }\n};\ntimer.start(); // Output: Count: 1",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Explicit",
        "title": "Explicit Binding with .call()",
        "description": "Directly specify what `this` should point to when invoking a function.",
        "codeSnippet": "function showRole() {\n  return \"Role: \" + this.role;\n}\nconsole.log(showRole.call({ role: \"Admin\" })); // Output: Role: Admin",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Arrow Function Warning",
      "content": "Never use arrow functions for top-level object methods if they need to access `this.property`."
    }
  },
  "part3": {
    "title": "Context Traps & Reading AI Code",
    "intro": "Learn how passing methods as callbacks breaks context and how to fix it.",
    "points": [
      {
        "title": "1. Detached Method Context Loss",
        "content": "Passing an object method as a callback detaches it from its parent object. `this` becomes `undefined` in strict mode.",
        "codeSnippet": "const account = {\n  balance: 500,\n  getBalance() { return \"$\" + this.balance; }\n};\n\n// ❌ Detached callback loses account context:\nconst fn = account.getBalance;\n// fn(); // TypeError or undefined!\n\n// ✅ Fixed with .bind():\nconst boundFn = account.getBalance.bind(account);\nconsole.log(boundFn()); // Output: $500"
      },
      {
        "title": "2. Arrow Functions for Callbacks",
        "content": "Use arrow functions inside methods to ensure callbacks retain access to the parent object.",
        "codeSnippet": "const team = {\n  name: \"LearnCraft Engineers\",\n  members: [\"Alex\", \"Maria\"],\n  printRoster() {\n    this.members.forEach(m => {\n      // Arrow function preserves this.name:\n      console.log(m + \" is on \" + this.name);\n    });\n  }\n};\nteam.printRoster();\n// Output:\n// Alex is on LearnCraft Engineers\n// Maria is on LearnCraft Engineers"
      },
      {
        "title": "3. Locking Context with .bind()",
        "content": "`.bind()` returns a brand new function with `this` permanently set to the provided object.",
        "codeSnippet": "const profile = { username: \"sam_coder\" };\nfunction showUsername() {\n  return \"@\" + this.username;\n}\n\nconst boundUsername = showUsername.bind(profile);\nconsole.log(boundUsername()); // Output: @sam_coder"
      }
    ]
  },
  "part4": {
    "title": "Arrow Function Method Trap",
    "bad": {
      "title": "❌ Arrow Function as Object Method",
      "code": "const user = {\n  name: \"Alex\",\n  // Bug: Arrow function does NOT bind to user!\n  greet: () => {\n    return \"Hello, \" + this.name;\n  }\n};\n\nconsole.log(user.greet()); // Output: Hello, undefined!",
      "explanation": "Arrow functions do not get an object `this`. They inherit from the outer global scope where `name` is undefined."
    },
    "good": {
      "title": "✅ Standard Method Shorthand",
      "code": "const user = {\n  name: \"Alex\",\n  // Clean: Regular method binds 'this' to user\n  greet() {\n    return \"Hello, \" + this.name;\n  }\n};\n\nconsole.log(user.greet()); // Output: Hello, Alex!",
      "explanation": "Always use standard method syntax `method() {}` for object methods that need `this`."
    }
  },
  "part5": {
    "title": "Interactive this Sandbox",
    "intro": "Experiment with method binding and lexical arrow context in the editor.",
    "starterCode": "const counter = {\n  count: 0,\n  increment() {\n    this.count += 1;\n    return \"Count is: \" + this.count;\n  },\n};\n\nconsole.log(counter.increment()); // Count is: 1\nconsole.log(counter.increment()); // Count is: 2\n\n// Test bound function:\nconst detachedInc = counter.increment.bind(counter);\nconsole.log(detachedInc()); // Count is: 3\n"
  },
  "part6": {
    "title": "Key Takeaways: The this Keyword",
    "takeaways": [
      {
        "title": "Call Time Binding",
        "desc": "For regular functions, this is determined by what is to the left of the dot."
      },
      {
        "title": "Lexical Arrows",
        "desc": "Arrow functions inherit this from where they were defined."
      },
      {
        "title": "Use .bind()",
        "desc": "Use .bind(obj) when passing methods as callbacks to preserve context."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "Why does an arrow function defined as an object method `const obj = { val: 10, get: () => this.val }` return undefined?",
      "options": [
        "Arrow functions do not have their own this; they inherit this from the surrounding global scope",
        "Arrow functions cannot return numbers",
        "Objects cannot contain functions in JavaScript",
        "Because val must be declared with let"
      ],
      "correctIndex": 0,
      "explanation": "Arrow functions do not have their own `this`. They capture `this` from the enclosing lexical scope (the global scope), where `val` does not exist."
    }
  }
};
