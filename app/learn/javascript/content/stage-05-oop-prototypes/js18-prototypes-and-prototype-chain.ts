import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js18PrototypesAndPrototypeChainContent: StandardLessonContent = {
  slug: "js18-prototypes-and-prototype-chain",
  code: "JS-18",
  title: "How Prototypes Work",
  subtitle: "Understand JavaScript's prototypal inheritance model, step-by-step prototype chain property lookups, and memory-efficient shared methods.",
  sections: [
    {
      id: "part1",
      label: "Prototypal Inheritance",
      icon: "🧬",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "The Prototype Link",
      icon: "🔗",
      tag: "MECHANICS"
    },
    {
      id: "part3",
      label: "Chain Lookup Traversal",
      icon: "🪜",
      tag: "LOOKUP CHAIN"
    },
    {
      id: "part4",
      label: "Method Duplication Memory Trap",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Prototypes Sandbox",
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
    title: "How JavaScript Inherits: Prototypes",
    bigPicture: "Unlike traditional languages that copy blueprints using classical inheritance, JavaScript uses prototypal inheritance: objects delegate lookups to other objects via hidden prototype links.",
    analogy: "Like borrowing a tool from a neighbor: if you don't own a ladder in your garage, you check your neighbor's garage. If they don't have it, you check the community shed, until you either find it or reach the end of the neighborhood.",
    diagram: "+---------------------------------------------------+\n| user1: { name: \"Alex\" }                           |\n| [[Prototype]] (__proto__)                         |\n+---------------------------------------------------+\n                         |\n                         v\n+---------------------------------------------------+\n| User.prototype: { login: function() { ... } }     |\n| [[Prototype]] (__proto__)                         |\n+---------------------------------------------------+\n                         |\n                         v\n+---------------------------------------------------+\n| Object.prototype: { hasOwnProperty, toString }   |\n| [[Prototype]] (__proto__) --> null (End of chain) |\n+---------------------------------------------------+",
    breakdownTitle: "Prototypal Core Concepts",
    breakdownItems: [
      {
        title: "The [[Prototype]] Hidden Link",
        desc: "Every JavaScript object holds an internal reference pointing to another object known as its prototype."
      },
      {
        title: "Dynamic Delegation",
        desc: "When reading a property, if it does not exist on the child object, the engine automatically checks its prototype chain."
      },
      {
        title: "Memory Efficiency",
        desc: "Methods defined on a prototype are shared across millions of instances rather than copied into every single object."
      }
    ]
  },
  part2: {
    title: "Prototype Mechanics in Action",
    intro: "Step through how constructors link prototypes and how instances inherit methods.",
    cards: [
      {
        number: "01",
        tag: "Constructor",
        title: "Constructor Function",
        description: "Functions have a prototype property where shared methods are defined.",
        codeSnippet: "function Device(brand) {\n  this.brand = brand;\n}\nDevice.prototype.turnOn = function() {\n  return `${this.brand} is powered on.`;\n};\nconst phone = new Device(\"Pixel\");\nconsole.log(phone.turnOn()); // Output: Pixel is powered on.",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Inheritance",
        title: "Shared Method Reference",
        description: "All instances share the exact same method function reference in memory.",
        codeSnippet: "const d1 = new Device(\"Apple\");\nconst d2 = new Device(\"Sony\");\nconsole.log(d1.turnOn === d2.turnOn); // Output: true (Same memory address!)",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Inspection",
        title: "Object.getPrototypeOf()",
        description: "Inspect the prototype of any object cleanly using the standard API.",
        codeSnippet: "const proto = Object.getPrototypeOf(phone);\nconsole.log(proto === Device.prototype); // Output: true",
        color: "purple"
      }
    ],
    rule: {
      title: "Lookup Invariant",
      content: "Properties are searched from child to parent up the prototype chain until found. If the chain ends at null without a match, undefined is returned."
    }
  },
  part3: {
    title: "Step-by-Step Prototype Chain Traversal",
    intro: "Trace how the engine resolves property lookups through the chain.",
    points: [
      {
        title: "Step 1: Check Own Properties",
        content: "The engine first inspects the instance's own properties. If present, it returns immediately without checking prototypes.",
        codeSnippet: "const vehicle = { wheels: 4 };\nconsole.log(vehicle.hasOwnProperty(\"wheels\")); // Output: true\nconsole.log(vehicle.wheels); // Output: 4"
      },
      {
        title: "Step 2: Traverse to Parent Prototype",
        content: "If the property is missing on the instance, the engine steps up to the object's prototype (__proto__).",
        codeSnippet: "const arr = [1, 2, 3];\n// arr has no own 'map' property; it delegates to Array.prototype:\nconsole.log(arr.hasOwnProperty(\"map\")); // Output: false\nconsole.log(arr.map(x => x * 2)); // Output: [2, 4, 6]"
      },
      {
        title: "Step 3: Object.prototype and null Termination",
        content: "All standard objects eventually link to Object.prototype. Its prototype is null, which signals the absolute end of the chain.",
        codeSnippet: "console.log(Object.getPrototypeOf(Object.prototype)); // Output: null (Chain end)"
      }
    ]
  },
  part4: {
    title: "Common Pitfall: Method Duplication in Constructors",
    bad: {
      title: "❌ Defining Methods Directly Inside the Constructor",
      code: "function HeavyUser(name) {\n  this.name = name;\n  // Bug: Every new instance creates a brand new function copy in Heap!\n  this.save = function() {\n    return \"Saving \" + this.name;\n  };\n}\nconst u1 = new HeavyUser(\"Alex\");\nconst u2 = new HeavyUser(\"Sam\");\nconsole.log(u1.save === u2.save); // Output: false (Wastes Heap memory for 10,000 users!)",
      explanation: "Attaching methods inside the constructor allocates a duplicate function in memory for every instance, wasting memory at scale."
    },
    good: {
      title: "✅ Attach Shared Methods to the Prototype",
      code: "function HeavyUser(name) {\n  this.name = name;\n}\n// Safe: 1 single function in memory shared by all instances\nHeavyUser.prototype.save = function() {\n  return \"Saving \" + this.name;\n};\nconst u1 = new HeavyUser(\"Alex\");\nconst u2 = new HeavyUser(\"Sam\");\nconsole.log(u1.save === u2.save); // Output: true (1 shared function)",
      explanation: "Putting methods on the prototype ensures all instances delegate to a single shared function, optimizing memory efficiency."
    }
  },
  part5: {
    title: "Prototypes Sandbox",
    intro: "Inspect the prototype chain and add shared methods to a constructor prototype.",
    starterCode: "function Account(holder, balance) {\n  this.holder = holder;\n  this.balance = balance;\n}\n\n// 1. Add shared method to prototype:\nAccount.prototype.deposit = function(amount) {\n  this.balance += amount;\n  return `${this.holder} new balance: $${this.balance}`;\n};\n\nconst acc1 = new Account(\"Alex\", 100);\nconst acc2 = new Account(\"Jordan\", 500);\n\nconsole.log(acc1.deposit(50));\nconsole.log(acc2.deposit(200));\n\n// Verify shared reference in memory:\nconsole.log(\"Are methods identical in memory?\", acc1.deposit === acc2.deposit);\nconsole.log(\"Prototype of acc1 is Account.prototype?\", Object.getPrototypeOf(acc1) === Account.prototype);\n"
  },
  part6: {
    title: "Key Takeaways: Prototypes",
    takeaways: [
      {
        title: "Prototypal Delegation",
        desc: "JavaScript objects delegate missing property lookups to their prototype link."
      },
      {
        title: "Memory Efficiency",
        desc: "Methods defined on prototypes are created once and shared across all instances."
      },
      {
        title: "The Chain Ends at null",
        desc: "Lookups climb through Object.prototype to null, returning undefined if not found."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens when you access `user.toString()` if `user` does not have an own `toString` property?",
      options: [
        "JavaScript throws an immediate ReferenceError",
        "The engine climbs the prototype chain to Object.prototype, finds `toString`, and executes it",
        "It automatically returns the string '[object Object]' without checking prototypes",
        "The engine creates a new `toString` property on `user` and sets it to null"
      ],
      correctIndex: 1,
      explanation: "Because `user` does not have its own `toString` property, the JavaScript engine traverses up the prototype chain until it finds `toString` on `Object.prototype`."
    }
  }
};
