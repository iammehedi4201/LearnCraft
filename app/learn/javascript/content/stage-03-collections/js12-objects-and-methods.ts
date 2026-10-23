import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js12ObjectsAndMethodsContent: StandardLessonContent = {
  slug: "js12-objects-and-methods",
  code: "JS-12",
  title: "Working with Objects",
  subtitle: "Model real-world entities using labeled key-value pairs, understand dot vs bracket notation, and attach reusable methods.",
  sections: [
    {
      id: "part1",
      label: "Working with Objects",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "Dot vs Bracket Notation",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Object Methods",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Reading undefined Properties",
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
    title: "Working with Objects",
    bigPicture: "Objects store labeled key-value pairs inside curly braces `{}`. Access properties using dot notation (`user.name`) or bracket notation (`user['name']`) for dynamic keys.",
    breakdownTitle: "Object Fundamentals",
    breakdownItems: [
      {
        title: "Key-Value Pairs",
        desc: "Each entry connects a string key to a value separated by a colon."
      },
      {
        title: "Dot vs Bracket Access",
        desc: "Use dot notation for static property names and brackets when property names come from variables."
      },
      {
        title: "Adding & Updating",
        desc: "Assigning to user.age = 29 updates existing properties or creates new ones instantly."
      }
    ]
  },
  part2: {
    title: "Dot Notation vs Bracket Notation",
    intro: "Two ways to read and write property values in an object.",
    cards: [
      {
        number: "01",
        tag: "Standard",
        title: "Dot Notation (user.key)",
        description: "The cleanest and most common way to access properties when you know the key name ahead of time.",
        codeSnippet: "const user = { name: \"Maya\", role: \"Admin\" };\nconsole.log(user.name); // Output: Maya\nuser.status = \"Active\"; // Add new property\nconsole.log(user.status); // Output: Active",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Dynamic",
        title: "Bracket Notation (user[var])",
        description: "Mandatory when the property key is stored in a variable or contains spaces.",
        codeSnippet: "const field = \"email\";\nconst profile = { email: \"maya@dev.io\", \"job title\": \"Lead Dev\" };\nconsole.log(profile[field]);       // Output: maya@dev.io\nconsole.log(profile[\"job title\"]); // Output: Lead Dev",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Check",
        title: "Checking for Properties",
        description: "Use the 'in' operator to verify whether a key exists on an object.",
        codeSnippet: "const settings = { theme: \"dark\" };\nconsole.log(\"theme\" in settings); // Output: true\nconsole.log(\"sound\" in settings); // Output: false",
        color: "purple"
      }
    ],
    rule: {
      title: "When to Use Brackets",
      content: "Use dot notation by default. Use bracket notation when the property name comes from a variable or contains hyphens/spaces."
    }
  },
  part3: {
    title: "Attaching and Calling Methods on Objects",
    intro: "When a function lives inside an object, it is called a method.",
    points: [
      {
        title: "1. Defining Object Methods",
        content: "Methods allow objects to perform actions using concise ES6 method syntax.",
        codeSnippet: "const calculator = {\n  brand: \"DevCalc\",\n  add(a, b) {\n    return a + b;\n  }\n};\nconsole.log(calculator.add(10, 5)); // Output: 15"
      },
      {
        title: "2. Nested Objects in Practice",
        content: "Objects can contain other objects and arrays to represent rich data structures.",
        codeSnippet: "const student = {\n  name: \"Alex\",\n  grades: [90, 85, 95],\n  address: { city: \"Austin\", state: \"TX\" }\n};\nconsole.log(student.address.city); // Output: Austin"
      },
      {
        title: "3. Deleting Properties with delete",
        content: "Remove a property completely from an object using the delete keyword.",
        codeSnippet: "const temp = { id: 1, tempToken: \"xyz\" };\ndelete temp.tempToken;\nconsole.log(temp); // Output: { id: 1 }"
      }
    ]
  },
  part4: {
    title: "Common Trap: Accessing Properties on undefined",
    bad: {
      title: "❌ Reading Properties from an Undefined Parent",
      code: "const user = {};\n// user.profile is undefined!\n// Reading .bio on undefined crashes JavaScript!\nconsole.log(user.profile.bio);\n// TypeError: Cannot read properties of undefined (reading 'bio')",
      explanation: "Accessing a missing property on an object returns undefined. But trying to access a sub-property ON undefined immediately throws a fatal TypeError."
    },
    good: {
      title: "✅ Check or Use Optional Chaining (?.)",
      code: "const user = {};\n// Safe navigation with optional chaining:\nconsole.log(user.profile?.bio);\n// Output: undefined (No crash!)",
      explanation: "Using optional chaining (?.) gracefully returns undefined instead of crashing your app."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Model a real-world user profile and practice accessing dynamic properties with bracket notation.",
    starterCode: "const account = {\n  id: 101,\n  username: \"developer_sam\",\n  role: \"Lead Architect\",\n  skills: [\"TypeScript\", \"React\", \"Node.js\"],\n  getSummary() {\n    return `${this.username} - ${this.role}`;\n  }\n};\n\n// 1. Read with dot notation:\nconsole.log(\"User role:\", account.role);\n\n// 2. Read with dynamic bracket notation:\nconst queryKey = \"skills\";\nconsole.log(\"Queried field:\", account[queryKey]);\n\n// 3. Execute object method:\nconsole.log(\"Summary:\", account.getSummary());\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Objects Group Labeled Data",
        desc: "Use { key: value } pairs to represent entities with meaningful property names."
      },
      {
        title: "Dot vs Bracket Notation",
        desc: "Use dot notation for fixed property names; use brackets when the key is stored in a variable."
      },
      {
        title: "Watch Out for Undefined Errors",
        desc: "Reading missing properties produces undefined; accessing sub-properties on undefined crashes."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "When is bracket notation (obj[key]) required instead of dot notation (obj.key)?",
      options: [
        "When the property name is stored inside a variable or contains spaces/hyphens",
        "Only when the object contains more than 10 properties",
        "Whenever the value stored inside the object is a number",
        "Bracket notation is obsolete and never needed in modern JavaScript"
      ],
      correctIndex: 0,
      explanation: "Bracket notation is mandatory when the property name is dynamic (stored in a variable) or contains special characters/spaces that are invalid in standard dot syntax."
    }
  }
};
