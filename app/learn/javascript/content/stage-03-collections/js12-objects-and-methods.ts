import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js12ObjectsAndMethodsContent: StandardLessonContent = {
  "slug": "js12-objects-and-methods",
  "code": "JS-12",
  "title": "Objects & Methods: Key-Value Data Modeling",
  "subtitle": "Model complex real-world entities using JavaScript objects, property access, and object methods.",
  "sections": [
    {
      "id": "part1",
      "label": "Entities & Models",
      "icon": "🏛️",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Keys, Values & Methods",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Dynamic Access & AI Traps",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Missing Key Access",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Objects Sandbox",
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
    "title": "Modeling Real-World Entities",
    "bigPicture": "Objects allow you to group related properties and functions together under a single entity. While arrays store ordered lists of items, objects store labeled key-value pairs.",
    "analogy": "Think of an object like an ID card. It has labeled fields: `Name`, `Age`, `Occupation`, and `Photo`. You look up fields by their label name.",
    "diagram": "const user = {\n  id: 101,          --> Key: id,          Value: 101\n  name: \"Alex\",     --> Key: name,        Value: \"Alex\"\n  role: \"admin\",    --> Key: role,        Value: \"admin\"\n  login() { ... }   --> Key: login,       Value: function\n};",
    "breakdownTitle": "Object Fundamentals",
    "breakdownItems": [
      {
        "title": "Keys & Values",
        "desc": "Keys are string identifiers; values can be any data type, including functions and nested objects."
      },
      {
        "title": "Dot vs Bracket Notation",
        "desc": "Use `user.name` for static keys; use `user[keyVar]` for dynamic variables."
      },
      {
        "title": "Object Methods",
        "desc": "Functions stored directly on an object that operate on its data."
      }
    ]
  },
  "part2": {
    "title": "Object Syntax & Access Patterns",
    "intro": "Create objects, access properties, and invoke object methods.",
    "cards": [
      {
        "number": "01",
        "tag": "Literal",
        "title": "Object Literal ({})",
        "description": "Define key-value pairs separated by commas inside curly braces.",
        "codeSnippet": "const profile = {\n  username: \"alex99\",\n  followers: 240,\n  verified: true,\n};\nconsole.log(profile.username); // Output: alex99",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Dynamic",
        "title": "Bracket Notation",
        "description": "Access properties dynamically when the key name is stored in a variable.",
        "codeSnippet": "const metric = \"followers\";\nconsole.log(profile[metric]); // Output: 240",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Methods",
        "title": "Object Methods",
        "description": "Functions attached to objects to perform actions on their data.",
        "codeSnippet": "const greeter = {\n  name: \"LearnCraft\",\n  greet() {\n    return \"Welcome to \" + this.name;\n  }\n};\nconsole.log(greeter.greet()); // Output: Welcome to LearnCraft",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Dot Notation by Default",
      "content": "Use dot notation `obj.prop` whenever possible. Reserve bracket notation `obj[prop]` for dynamic keys."
    }
  },
  "part3": {
    "title": "Dynamic Properties & Reading AI Code",
    "intro": "Learn to safely check property existence and inspect object keys.",
    "points": [
      {
        "title": "1. Dynamic Property Evaluation",
        "content": "Use bracket notation when reading properties from user input, function parameters, or URL queries.",
        "codeSnippet": "function getStat(user, statKey) {\n  return user[statKey]; // Evaluates the variable statKey\n}\n\nconst athlete = { speed: 92, stamina: 88 };\nconsole.log(\"Speed:\", getStat(athlete, \"speed\")); // Output: Speed: 92"
      },
      {
        "title": "2. Verifying Key Existence",
        "content": "Use the `in` operator to check if a property exists on an object before reading it.",
        "codeSnippet": "const settings = { darkMode: true, fontSize: 16 };\nconsole.log(\"darkMode\" in settings);    // Output: true\nconsole.log(\"notifications\" in settings); // Output: false"
      },
      {
        "title": "3. Inspecting Keys with Object.keys",
        "content": "Use `Object.keys()` to extract an array of all property names on an object for looping.",
        "codeSnippet": "const config = { host: \"localhost\", port: 3000 };\nconst keys = Object.keys(config);\nconsole.log(\"Config keys:\", keys); // Output: Config keys: [ 'host', 'port' ]"
      }
    ]
  },
  "part4": {
    "title": "Undefined Property TypeError",
    "bad": {
      "title": "❌ Reading Properties of Undefined",
      "code": "const user = { name: \"Alex\" };\n// Bug: user.address is undefined!\n// Reading .city on undefined throws TypeError!\nconsole.log(user.address.city); // TypeError: Cannot read properties of undefined",
      "explanation": "Accessing a missing key returns `undefined`. Attempting to access a nested key on `undefined` causes a fatal application crash."
    },
    "good": {
      "title": "✅ Safe Optional Chaining (?.)",
      "code": "const user = { name: \"Alex\" };\n// Safe: ?. stops and returns undefined without crashing\nconsole.log(user.address?.city); // Output: undefined (no crash!)",
      "explanation": "Use optional chaining `?.` to safely navigate nested properties when intermediate objects might be missing."
    }
  },
  "part5": {
    "title": "Interactive Objects Sandbox",
    "intro": "Create objects, write methods, and access keys dynamically.",
    "starterCode": "// 1. Create a task object:\nconst task = {\n  id: 101,\n  title: \"Build Login Component\",\n  status: \"In Progress\",\n  complete() {\n    this.status = \"Done\";\n    return \"Task marked as \" + this.status;\n  },\n};\n\nconsole.log(\"Initial status:\", task.status);\nconsole.log(task.complete());\nconsole.log(\"Updated status:\", task.status);\n"
  },
  "part6": {
    "title": "Key Takeaways: Objects & Methods",
    "takeaways": [
      {
        "title": "Key-Value Pairs",
        "desc": "Objects model structured real-world data with named labels."
      },
      {
        "title": "Dot vs Brackets",
        "desc": "Use dot notation for static keys, brackets for variable keys."
      },
      {
        "title": "Use Optional Chaining",
        "desc": "Prevent TypeError crashes when reading nested properties with ?."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "When should bracket notation `obj[key]` be used instead of dot notation `obj.key`?",
      "options": [
        "When the property name is stored inside a variable",
        "When the object has more than 10 properties",
        "Only inside class constructors",
        "Only when reading numbers"
      ],
      "correctIndex": 0,
      "explanation": "Bracket notation evaluates the expression inside the brackets, allowing you to access properties dynamically using variables."
    }
  }
};
