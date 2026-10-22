import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js18PrototypesAndPrototypeChainContent: StandardLessonContent = {
  "slug": "js18-prototypes-and-prototype-chain",
  "code": "JS-18",
  "title": "Prototypes & The Prototype Chain: Delegation",
  "subtitle": "Understand prototypal inheritance, how JavaScript looks up methods, and the prototype chain.",
  "sections": [
    {
      "id": "part1",
      "label": "Prototypal Model",
      "icon": "🧬",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Prototype Mechanics",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Delegation & AI Traps",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Prototype Pollution Bug",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Prototypes Sandbox",
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
    "title": "Inheritance Through Delegation",
    "bigPicture": "JavaScript does not copy methods into objects. Instead, every object has an internal link to a prototype object. If a property is missing on an object, JavaScript searches up the chain.",
    "analogy": "Think of a prototype like asking an assistant for a tool. If they don't have it on their desk, they look in the department storage room, and finally in the central warehouse.",
    "diagram": "dog (Own properties: name = \"Rex\")\n  |\n  +---> Linked to: Animal.prototype (Methods: speak, eat)\n          |\n          +---> Linked to: Object.prototype (toString, hasOwnProperty)\n                  |\n                  +---> Linked to: null (End of chain)",
    "breakdownTitle": "Prototype Concepts",
    "breakdownItems": [
      {
        "title": "Shared Memory",
        "desc": "Methods defined on prototypes exist in memory once and are shared by all instances."
      },
      {
        "title": "Prototype Lookup",
        "desc": "JavaScript walks up the prototype chain until it finds the property or hits null."
      },
      {
        "title": "Object.create()",
        "desc": "Creates a brand-new object with its prototype explicitly set to an existing object."
      }
    ]
  },
  "part2": {
    "title": "Prototypal Delegation Patterns",
    "intro": "Create prototype links and inspect inherited properties.",
    "cards": [
      {
        "number": "01",
        "tag": "Object.create",
        "title": "Explicit Prototype Link",
        "description": "Create an object that inherits properties directly from another object.",
        "codeSnippet": "const animal = { eats: true };\nconst rabbit = Object.create(animal);\nrabbit.jumps = true;\nconsole.log(rabbit.eats); // Output: true (inherited!)",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Constructor",
        "title": "Constructor Prototypes",
        "description": "Attach shared methods to constructor functions via `.prototype`.",
        "codeSnippet": "function User(name) { this.name = name; }\nUser.prototype.sayHi = function() {\n  return \"Hi, \" + this.name;\n};\nconst u = new User(\"Alex\");\nconsole.log(u.sayHi()); // Output: Hi, Alex",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Own Props",
        "title": "Object.hasOwn()",
        "description": "Check if a property is directly on the object rather than its prototype.",
        "codeSnippet": "const obj = Object.create({ shared: true });\nobj.mine = 123;\nconsole.log(Object.hasOwn(obj, \"mine\"));   // Output: true\nconsole.log(Object.hasOwn(obj, \"shared\")); // Output: false",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Never Modify Built-in Prototypes",
      "content": "Never add methods to `Array.prototype` or `Object.prototype`. It breaks libraries and causes collisions."
    }
  },
  "part3": {
    "title": "Prototypes in Practice & Reading AI Code",
    "intro": "Understand how built-in JavaScript methods work through prototype delegation.",
    "points": [
      {
        "title": "1. Why Array Methods Exist on All Arrays",
        "content": "Every array you create inherits from `Array.prototype`. That is why methods like `.map()` and `.filter()` are available without copying code.",
        "codeSnippet": "const numbers = [1, 2, 3];\nconsole.log(numbers.hasOwnProperty(\"map\")); // Output: false\nconsole.log(Array.prototype.hasOwnProperty(\"map\")); // Output: true"
      },
      {
        "title": "2. Prototype Chain Lookup Order",
        "content": "If an object has its own property with the same name as a prototype method, the own property shadows the prototype method.",
        "codeSnippet": "const base = { greeting: \"Hello from base\" };\nconst child = Object.create(base);\nchild.greeting = \"Hello from child\"; // Shadows prototype\n\nconsole.log(child.greeting); // Output: Hello from child"
      },
      {
        "title": "3. Top of the Chain is Object.prototype",
        "content": "All objects trace upward to `Object.prototype`, which eventually points to `null`.",
        "codeSnippet": "const empty = {};\nconst proto1 = Object.getPrototypeOf(empty);\nconsole.log(proto1 === Object.prototype); // Output: true\n\nconst proto2 = Object.getPrototypeOf(proto1);\nconsole.log(proto2); // Output: null (end of chain!)"
      }
    ]
  },
  "part4": {
    "title": "Polluting Global Prototypes",
    "bad": {
      "title": "❌ Modifying Built-in Array.prototype",
      "code": "// Danger: Global prototype pollution!\nArray.prototype.last = function() {\n  return this[this.length - 1];\n};\n\n// Breaks third-party libraries and for...in loops!",
      "explanation": "Modifying built-in prototypes causes conflicts across npm libraries and can break loops that expect standard properties."
    },
    "good": {
      "title": "✅ Standalone Utility Functions",
      "code": "// Clean: Standalone helper function\nfunction getLast(arr) {\n  return arr.at(-1);\n}\n\nconst list = [10, 20, 30];\nconsole.log(getLast(list)); // Output: 30",
      "explanation": "Keep utility functions standalone to prevent global prototype pollution."
    }
  },
  "part5": {
    "title": "Interactive Prototypes Sandbox",
    "intro": "Inspect the prototype chain of objects and arrays in the live editor.",
    "starterCode": "// 1. Prototype delegation:\nconst machine = {\n  powered: true,\n  status() {\n    return \"Machine powered: \" + this.powered;\n  },\n};\n\nconst robot = Object.create(machine);\nrobot.name = \"Unit-01\";\n\nconsole.log(\"Robot name:\", robot.name);\nconsole.log(\"Robot status:\", robot.status());\nconsole.log(\"Has own 'powered':\", Object.hasOwn(robot, \"powered\"));\n"
  },
  "part6": {
    "title": "Key Takeaways: Prototypes & Delegation",
    "takeaways": [
      {
        "title": "Delegation, Not Copying",
        "desc": "JavaScript walks up the prototype chain to find missing properties."
      },
      {
        "title": "Shared in Memory",
        "desc": "Prototype methods are stored once and shared across all instances."
      },
      {
        "title": "Never Pollute",
        "desc": "Never modify built-in prototypes like Array.prototype."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "When you call `arr.filter(...)`, where is the `filter` method actually defined?",
      "options": [
        "Directly inside each individual array instance",
        "On Array.prototype",
        "Inside the global window object",
        "Inside JSON.stringify"
      ],
      "correctIndex": 1,
      "explanation": "Array methods like `filter`, `map`, and `slice` are defined once on `Array.prototype` and shared by all array instances through delegation."
    }
  }
};
