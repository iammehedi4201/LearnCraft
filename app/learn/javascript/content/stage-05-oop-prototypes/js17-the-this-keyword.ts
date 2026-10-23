import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js17TheThisKeywordContent: StandardLessonContent = {
  slug: "js17-the-this-keyword",
  code: "JS-17",
  title: "How the this Keyword Works",
  subtitle: "Master the 3 rules that determine 'this', fix lost context bugs in callbacks, and understand lexical 'this' in arrow functions.",
  sections: [
    {
      id: "part1",
      label: "How this Works",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "The Rules of this",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Arrow Functions & this",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Losing this in Callbacks",
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
    title: "How the this Keyword Works",
    bigPicture: "In regular functions, `this` refers to whatever object called the function (the object to the left of the dot). Arrow functions do not bind their own `this`; they borrow it from their surrounding scope.",
    breakdownTitle: "The Essential 'this' Rules",
    breakdownItems: [
      {
        title: "Method Call (user.login())",
        desc: "In an object method call, `this` points directly to the object before the dot (`user`)."
      },
      {
        title: "Standalone Call (fn())",
        desc: "Calling a function without an object sets `this` to undefined in strict mode."
      },
      {
        title: "Arrow Functions (() => {})",
        desc: "Arrow functions never bind their own `this`—they inherit `this` from the outer scope."
      }
    ]
  },
  part2: {
    title: "The Core Rules of this in Functions",
    intro: "Step through how each rule determines what this points to.",
    cards: [
      {
        number: "01",
        tag: "Method",
        title: "Object Method Call",
        description: "When called as a method on an object, this refers to that object.",
        codeSnippet: "const user = {\n  name: \"Alex\",\n  greet() {\n    return `Hello, ${this.name}!`;\n  }\n};\nconsole.log(user.greet()); // Output: Hello, Alex! (this === user)",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Explicit",
        title: "Explicit Binding (.bind)",
        description: "Lock this to a specific object permanently using .bind().",
        codeSnippet: "function showRole() {\n  return this.role;\n}\nconst admin = { role: \"SuperAdmin\" };\nconst boundRole = showRole.bind(admin); // Locked to admin!\nconsole.log(boundRole()); // Output: SuperAdmin",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Lexical",
        title: "Arrow Functions",
        description: "Arrow functions never change their this based on how they are called.",
        codeSnippet: "const team = {\n  name: \"Engineers\",\n  members: [\"Alex\", \"Maya\"],\n  showMembers() {\n    // Arrow function borrows 'this' from showMembers():\n    this.members.forEach(m => console.log(`${m} on ${this.name}`));\n  }\n};\nteam.showMembers();",
        color: "purple"
      }
    ],
    rule: {
      title: "The Left-of-the-Dot Rule",
      content: "For regular functions: whatever object is immediately to the left of the dot when calling the function becomes 'this'."
    }
  },
  part3: {
    title: "Arrow Functions and Lexical this",
    intro: "Why arrow functions are the modern solution to this confusion.",
    points: [
      {
        title: "1. No Own 'this'",
        content: "Arrow functions do not define their own this keyword. They look outward to their parent scope to see what this was.",
        codeSnippet: "const timer = {\n  seconds: 0,\n  start() {\n    // Arrow function preserves timer as 'this':\n    setTimeout(() => {\n      this.seconds++;\n      console.log(\"Elapsed seconds:\", this.seconds);\n    }, 100);\n  }\n};\ntimer.start(); // Correctly updates timer.seconds"
      },
      {
        title: "2. Do NOT Use Arrow Functions for Object Methods",
        content: "If you define an object method with an arrow function, its this looks at the global scope, NOT the object!",
        codeSnippet: "const user = {\n  name: \"Maya\",\n  // BUG: Arrow method binds to global scope!\n  sayHi: () => `Hi, ${this.name}`\n};\nconsole.log(user.sayHi()); // Output: Hi, undefined!"
      },
      {
        title: "3. Best Practice for Objects",
        content: "Use standard method syntax obj() {} for top-level object methods, and arrow functions () => {} inside callbacks.",
        codeSnippet: "const app = {\n  title: \"LearnCraft\",\n  render() { // Standard method\n    [1].forEach(() => console.log(this.title)); // Arrow inside callback\n  }\n};\napp.render(); // Output: LearnCraft"
      }
    ]
  },
  part4: {
    title: "Common Trap: Losing 'this' in Callbacks",
    bad: {
      title: "❌ Passing an Object Method as a Callback",
      code: "const account = {\n  user: \"developer_sam\",\n  login() {\n    console.log(\"Logged in user:\", this.user);\n  }\n};\n// BUG: Passing account.login detaches it from account!\nsetTimeout(account.login, 100);\n// Output: Logged in user: undefined (Lost this!)",
      explanation: "When you pass account.login, you are only passing the raw function. When setTimeout calls it later, there is no 'account.' in front of it, so this becomes undefined."
    },
    good: {
      title: "✅ Wrap in an Arrow Function or Use .bind()",
      code: "const account = {\n  user: \"developer_sam\",\n  login() {\n    console.log(\"Logged in user:\", this.user);\n  }\n};\n// Fix 1: Wrap in an arrow function\nsetTimeout(() => account.login(), 100);\n// Fix 2: Or bind permanently: setTimeout(account.login.bind(account), 100);\n// Output: Logged in user: developer_sam",
      explanation: "Wrapping in () => account.login() ensures account is to the left of the dot when the function actually executes."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Observe method calls, arrow function inheritance, and fix detached callbacks using .bind().",
    starterCode: "const userProfile = {\n  name: \"Alex Chen\",\n  role: \"Senior Architect\",\n  getDetails() {\n    return `${this.name} (${this.role})`;\n  }\n};\n\n// 1. Standard method call (this === userProfile):\nconsole.log(\"1. Direct method call:\", userProfile.getDetails());\n\n// 2. Detaching the method into a standalone variable:\nconst detachedFunction = userProfile.getDetails;\n// console.log(detachedFunction()); // Would fail or output undefined!\n\n// 3. Binding it permanently:\nconst boundFunction = detachedFunction.bind(userProfile);\nconsole.log(\"2. Safely bound call:\", boundFunction());\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Look Left of the Dot",
        desc: "In regular method calls obj.fn(), this is whatever object is to the left of the dot."
      },
      {
        title: "Arrow Functions Inherit Lexically",
        desc: "Arrow functions don't create their own this; they adopt this from where they were written."
      },
      {
        title: "Callbacks Lose Context",
        desc: "Passing methods as callbacks detaches them; wrap in an arrow function or use .bind()."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "How does an arrow function determine the value of 'this'?",
      options: [
        "It inherits 'this' lexically from the surrounding scope where the arrow function was defined",
        "It always sets 'this' to the global window object",
        "It binds 'this' to the first argument passed to the function",
        "It dynamically looks at the object that called it at runtime"
      ],
      correctIndex: 0,
      explanation: "Arrow functions do not have their own 'this'. Instead, they inherit 'this' lexically from their enclosing parent scope, making them ideal for callbacks inside methods."
    }
  }
};
