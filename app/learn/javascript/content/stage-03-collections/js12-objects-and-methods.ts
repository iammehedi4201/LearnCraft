import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js12ObjectsAndMethodsContent: StandardLessonContent = {
  slug: "js12-objects-and-methods",
  code: "JS-12",
  title: "Working with Objects",
  subtitle: "Structure structured data with key-value pairs, access dynamic properties using bracket notation, and define object methods.",
  sections: [
    {
      id: "part1",
      label: "Object Structure",
      icon: "📦",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "Property Access",
      icon: "⚡",
      tag: "SYNTAX"
    },
    {
      id: "part3",
      label: "Methods & Shorthands",
      icon: "⚙️",
      tag: "METHODS"
    },
    {
      id: "part4",
      label: "Dynamic Key Pitfall",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Objects Sandbox",
      icon: "🚀",
      tag: "PRACTICE"
    },
    {
      id: "part6",
      label: "Summary Takeaways",
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
    title: "Structuring Data with Objects",
    bigPicture: "Objects are collections of key-value pairs enclosed in curly braces {}. They group related properties and behaviors together into a single structured entity.",
    analogy: "Like an identity card: the card has named fields like Name, Age, and Occupation, each holding a corresponding value.",
    diagram: "+-------------------------------------------+\n| Object: user                              |\n| name: \"Alex\"                              |\n| role: \"Admin\"                             |\n| loginCount: 42                            |\n| logDetails(): method                      |\n+-------------------------------------------+",
    breakdownTitle: "Object Fundamentals",
    breakdownItems: [
      {
        title: "Keys and Values",
        desc: "Keys (properties) are strings or symbols that identify values stored in the object."
      },
      {
        title: "Dot vs Bracket Notation",
        desc: "Dot notation (user.name) is preferred for static keys; bracket notation (user[key]) is required for dynamic keys."
      },
      {
        title: "Methods",
        desc: "Functions stored as properties inside an object are called methods."
      }
    ]
  },
  part2: {
    title: "Reading and Writing Properties",
    intro: "Understand when to use dot notation vs dynamic bracket notation.",
    cards: [
      {
        number: "01",
        tag: "Dot Notation",
        title: "Dot Access",
        description: "The standard way to read and write properties with known, valid identifier names.",
        codeSnippet: "const user = { name: \"Maya\", level: 3 };\nconsole.log(user.name); // Output: Maya\nuser.level = 4; // Update property\nconsole.log(user.level); // Output: 4",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Bracket Notation",
        title: "Dynamic Bracket Access",
        description: "Evaluates variables or strings containing spaces and special characters.",
        codeSnippet: "const book = { \"book-title\": \"Modern JS\" };\nconsole.log(book[\"book-title\"]); // Output: Modern JS\n\nconst keyName = \"author\";\nbook[keyName] = \"Sarah\";\nconsole.log(book.author); // Output: Sarah",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Methods",
        title: "Object Methods",
        description: "Define actions directly on the object using modern method shorthand.",
        codeSnippet: "const robot = {\n  model: \"RX-9\",\n  greet() {\n    return \"Greetings from \" + this.model;\n  }\n};\nconsole.log(robot.greet()); // Output: Greetings from RX-9",
        color: "purple"
      }
    ],
    rule: {
      title: "Notation Choice",
      content: "Use dot notation by default. Switch to bracket notation only when the property name is stored in a variable or contains hyphens/spaces."
    }
  },
  part3: {
    title: "Modern Object Shorthands & Utilities",
    intro: "Write clean, readable objects with ES6 features and standard utilities.",
    points: [
      {
        title: "Property Value Shorthand",
        content: "If the variable name matches the property key name, you can write the identifier just once.",
        codeSnippet: "const title = \"Architect\";\nconst salary = 120000;\n// Instead of { title: title, salary: salary }:\nconst job = { title, salary };\nconsole.log(job); // Output: { title: 'Architect', salary: 120000 }"
      },
      {
        title: "Object.keys(), Object.values(), Object.entries()",
        content: "Extract arrays of keys, values, or key-value pairs to iterate over objects cleanly.",
        codeSnippet: "const stats = { wins: 10, losses: 2 };\nconsole.log(Object.keys(stats));   // Output: ['wins', 'losses']\nconsole.log(Object.values(stats)); // Output: [10, 2]\nconsole.log(Object.entries(stats)); // Output: [['wins', 10], ['losses', 2]]"
      },
      {
        title: "Computed Property Names",
        content: "Compute property keys dynamically using square brackets inside the object literal.",
        codeSnippet: "const prefix = \"api_\";\nconst config = {\n  [prefix + \"timeout\"]: 5000\n};\nconsole.log(config.api_timeout); // Output: 5000"
      }
    ]
  },
  part4: {
    title: "Common Pitfall: Dot Access with Dynamic Variables",
    bad: {
      title: "❌ Using Dot Notation with a Variable Name",
      code: "const field = \"email\";\nconst user = { email: \"user@test.com\" };\n// Bug: user.field looks for literal property named 'field', NOT 'email'!\nconsole.log(user.field); // Output: undefined",
      explanation: "Dot notation treats the text after the dot as literal. It does not evaluate the variable field."
    },
    good: {
      title: "✅ Use Bracket Notation for Variables",
      code: "const field = \"email\";\nconst user = { email: \"user@test.com\" };\n// Correct: user[field] evaluates field -> user[\"email\"]\nconsole.log(user[field]); // Output: user@test.com",
      explanation: "Bracket notation evaluates expressions and variables, accessing the property whose name matches the variable's value."
    }
  },
  part5: {
    title: "Objects Sandbox",
    intro: "Practice creating objects with shorthand syntax and accessing dynamic properties.",
    starterCode: "const make = \"Tesla\";\nconst model = \"Model 3\";\n\nconst car = {\n  make,\n  model,\n  mileage: 15000,\n  drive(miles) {\n    this.mileage += miles;\n    return `${this.make} ${this.model} now has ${this.mileage} miles.`;\n  }\n};\n\nconsole.log(car.drive(250));\nconsole.log(\"Object keys:\", Object.keys(car));\n"
  },
  part6: {
    title: "Key Takeaways: Objects",
    takeaways: [
      {
        title: "Dot vs Bracket Access",
        desc: "Use dot notation for static properties; use bracket notation for dynamic variable keys."
      },
      {
        title: "Shorthand Syntax",
        desc: "Use property and method shorthands to eliminate redundant boilerplate code."
      },
      {
        title: "Object Utilities",
        desc: "Use Object.keys(), Object.values(), and Object.entries() to inspect and iterate objects."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "If `const key = \"score\"; const data = { score: 100 };`, what does `data.key` return?",
      options: [
        "100",
        "undefined",
        "\"score\"",
        "TypeError"
      ],
      correctIndex: 1,
      explanation: "Dot notation does not evaluate variables; it looks for a property literally named `key`. Since `data` has no property named `key`, it returns `undefined`. Use `data[key]` to access 100."
    }
  }
};
