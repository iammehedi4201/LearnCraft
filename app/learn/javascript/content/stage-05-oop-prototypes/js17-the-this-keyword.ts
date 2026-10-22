import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js17TheThisKeywordContent: StandardLessonContent = {
  slug: "js17-the-this-keyword",
  code: "JS-17",
  title: "How the this Keyword Works",
  subtitle: "Master the 4 call-site rules that determine 'this', fix lost context bugs in callbacks, and understand lexical 'this' in arrow functions.",
  sections: [
    {
      id: "part1",
      label: "Call-Site Determination",
      icon: "🧭",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "The 4 Binding Rules",
      icon: "⚡",
      tag: "RULES"
    },
    {
      id: "part3",
      label: "Arrow Functions & this",
      icon: "🏹",
      tag: "LEXICAL THIS"
    },
    {
      id: "part4",
      label: "Lost Context in Callbacks",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "this Sandbox",
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
    title: "Who Called the Function? (The Call-Site)",
    bigPicture: "In regular JavaScript functions, this is NOT determined by where the function was written. It is determined at call-time by HOW the function is invoked (the call-site).",
    analogy: "Like the pronoun 'I': who 'I' refers to depends entirely on who is currently speaking. If Alice speaks, 'I' means Alice; if Bob speaks, 'I' means Bob.",
    diagram: "+---------------------------------------------------+\n| 1. IMPLICIT: user.login()                         |\n|    Look left of the dot: 'this' is user           |\n+---------------------------------------------------+\n| 2. DETACHED: const detached = user.login;         |\n|    detached();                                    |\n|    No dot! 'this' reverts to global / undefined!  |\n+---------------------------------------------------+",
    breakdownTitle: "The Four Call-Site Rules",
    breakdownItems: [
      {
        title: "1. Default Binding",
        desc: "Standalone invocation fn(): this is the global window object in browsers, or undefined in strict mode ('use strict')."
      },
      {
        title: "2. Implicit Binding",
        desc: "Method invocation obj.method(): this points to the object immediately to the left of the dot."
      },
      {
        title: "3. Explicit Binding (call, apply, bind)",
        desc: "Explicitly forces this to a specified object argument regardless of how the function is called."
      }
    ]
  },
  part2: {
    title: "The 4 Binding Rules in Code",
    intro: "Step through how each rule determines what this points to.",
    cards: [
      {
        number: "01",
        tag: "Implicit",
        title: "Implicit Binding",
        description: "When called as a method on an object, this is that containing object.",
        codeSnippet: "const user = {\n  name: \"Alex\",\n  getName() {\n    return this.name;\n  }\n};\nconsole.log(user.getName()); // Output: Alex (this === user)",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Explicit",
        title: "Explicit Binding (call / bind)",
        description: "Explicitly supply the this object context via .call() or create a bound copy with .bind().",
        codeSnippet: "function showRole() {\n  return this.role;\n}\nconst admin = { role: \"SuperAdmin\" };\nconsole.log(showRole.call(admin)); // Output: SuperAdmin\n\nconst boundFn = showRole.bind(admin);\nconsole.log(boundFn()); // Output: SuperAdmin",
        color: "cyan"
      },
      {
        number: "03",
        tag: "New",
        title: "New Binding",
        description: "Calling with new creates a fresh empty object and binds this to that new instance.",
        codeSnippet: "function Player(name) {\n  this.name = name;\n  this.score = 0;\n}\nconst p1 = new Player(\"Maya\");\nconsole.log(p1.name); // Output: Maya",
        color: "purple"
      }
    ],
    rule: {
      title: "The Call-Site Rule",
      content: "To know what this points to in a regular function, always inspect the line where the function is CALLED, not where it is defined."
    }
  },
  part3: {
    title: "Arrow Functions & Lexical this",
    intro: "Arrow functions do not follow the 4 binding rules. They inherit this from the enclosing scope.",
    points: [
      {
        title: "1. No Own this in Arrow Functions",
        content: "Arrow functions have no this of their own. They look up this in the parent lexical scope, exactly like a normal variable.",
        codeSnippet: "const team = {\n  title: \"Engineers\",\n  members: [\"Alex\", \"Sam\"],\n  list() {\n    // Arrow function inherits 'this' from list() method:\n    return this.members.map(m => `${m} (${this.title})`);\n  }\n};\nconsole.log(team.list()); // Output: ['Alex (Engineers)', 'Sam (Engineers)']"
      },
      {
        title: "2. bind/call Cannot Change Arrow this",
        content: "Because arrow functions resolve this lexically, calling .call() or .bind() on an arrow function has no effect on its this.",
        codeSnippet: "const getLexical = () => this;\nconsole.log(getLexical.call({ fake: true }) === this); // Output: true"
      },
      {
        title: "3. Never Use Arrows as Object Methods",
        content: "If you define an object method with an arrow function, this points to the global scope or undefined, NOT the object!",
        codeSnippet: "const badUser = {\n  name: \"Broken\",\n  sayHi: () => `Hi, I am ${this.name}` // 'this' is global/undefined!\n};\nconsole.log(badUser.sayHi()); // Output: Hi, I am undefined"
      }
    ]
  },
  part4: {
    title: "The Classic Lost Context Trap in Callbacks",
    bad: {
      title: "❌ Passing Object Method as a Callback Detaches this",
      code: "const account = {\n  balance: 500,\n  check() {\n    return `Balance: $${this.balance}`;\n  }\n};\n\n// Bug: setTimeout receives function pointer, but invokes it without account. !\n// setTimeout(account.check, 100); // Output: Balance: $undefined",
      explanation: "Passing account.check passes only the function reference. When the timer runs it as a standalone call, this defaults to the global object where balance is undefined."
    },
    good: {
      title: "✅ Wrap in Arrow Function or Use .bind()",
      code: "const account = {\n  balance: 500,\n  check() {\n    return `Balance: $${this.balance}`;\n  }\n};\n\n// Option A: Arrow wrapper maintains object.method() call-site\nsetTimeout(() => console.log(account.check()), 100);\n\n// Option B: Explicitly bind context\nsetTimeout(account.check.bind(account), 100);",
      explanation: "Wrapping in an arrow function ensures the method is invoked with account on the left of the dot, preserving this."
    }
  },
  part5: {
    title: "this Keyword Sandbox",
    intro: "Test implicit method binding, explicit .bind(), and arrow lexical context.",
    starterCode: "const counter = {\n  count: 10,\n  increment() {\n    this.count++;\n    return this.count;\n  }\n};\n\n// 1. Implicit method call:\nconsole.log(\"Method call:\", counter.increment());\n\n// 2. Detached call (loses context):\nconst detached = counter.increment;\n// detached(); // Would fail or modify global!\n\n// 3. Fixed with bind:\nconst bound = counter.increment.bind(counter);\nconsole.log(\"Bound call:\", bound());\n"
  },
  part6: {
    title: "Key Takeaways: The this Keyword",
    takeaways: [
      {
        title: "Determined at Call-Site",
        desc: "For regular functions, this depends on HOW it is called (obj.method() vs standalone)."
      },
      {
        title: "Lexical Arrows",
        desc: "Arrow functions do not have their own this; they inherit it from their enclosing lexical scope."
      },
      {
        title: "Callbacks Lose this",
        desc: "Passing methods as callbacks strips context. Use arrow wrappers or .bind() to retain this."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why does `const fn = user.greet; fn();` lose access to `user` properties inside `this`?",
      options: [
        "Because assigning a method to a variable deletes the function from memory",
        "Because `fn()` is invoked as a standalone function without an object before a dot, triggering default binding",
        "Because JavaScript does not allow variables to hold functions",
        "Because `this` is only supported in ES6 classes"
      ],
      correctIndex: 1,
      explanation: "In regular functions, `this` is determined at call-time. Calling `fn()` has no object to the left of a dot, so it falls back to the Default Binding rule (undefined in strict mode or window in loose mode)."
    }
  }
};
