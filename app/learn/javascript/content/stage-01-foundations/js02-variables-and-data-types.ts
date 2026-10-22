import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js02VariablesAndDataTypesContent: StandardLessonContent = {
  slug: "js02-variables-and-data-types",
  code: "JS-02",
  title: "Declaring Variables",
  subtitle: "Store values in memory using const and let, and understand the core primitive data types in JavaScript.",
  sections: [
    {
      id: "part1",
      label: "Declaring Variables",
      icon: "📦",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "const vs let",
      icon: "⚡",
      tag: "SYNTAX"
    },
    {
      id: "part3",
      label: "Primitive Types",
      icon: "🏷️",
      tag: "TYPES"
    },
    {
      id: "part4",
      label: "Reassignment Error",
      icon: "⚠️",
      tag: "TRAPS"
    },
    {
      id: "part5",
      label: "Variables Sandbox",
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
    title: "Storing Values in Memory",
    bigPicture: "Variables store values in memory so you can reuse them throughout your program. Modern JavaScript uses const and let to declare variables.",
    analogy: "A variable is like a labeled container: the variable name is the label, and the stored data is what is inside.",
    diagram: "+----------------+       +-------------------------+\n|   const role   | ----> |       \"Frontend\"        |  (Locked: cannot reassign)\n+----------------+       +-------------------------+\n|   let count    | ----> |           10            |  (Flexible: can reassign)\n+----------------+       +-------------------------+",
    breakdownTitle: "Quick Declaration Rules",
    breakdownItems: [
      {
        title: "Default to const",
        desc: "Use const for all variables by default. It guarantees the variable reference will never be reassigned."
      },
      {
        title: "Use let Only for Reassignment",
        desc: "Use let only when a value must change later, such as a loop counter or accumulator."
      },
      {
        title: "Avoid var",
        desc: "var is legacy syntax that causes confusing scope and hoisting bugs in modern applications."
      }
    ]
  },
  part2: {
    title: "const and let Syntax",
    intro: "Two keywords define all variables in modern JavaScript.",
    cards: [
      {
        number: "01",
        tag: "Immutable",
        title: "const (Default)",
        description: "Creates a read-only variable reference that cannot be reassigned.",
        codeSnippet: "const port = 3000;\n// port = 8080; // TypeError: Assignment to constant variable\nconsole.log(port); // Output: 3000",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Reassignable",
        title: "let (When Changing)",
        description: "Allows reassigning the variable to a new value later.",
        codeSnippet: "let score = 0;\nscore = 10; // Perfectly valid\nconsole.log(score); // Output: 10",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Inspection",
        title: "typeof Operator",
        description: "Returns a string describing the data type of any value.",
        codeSnippet: "console.log(typeof \"text\"); // Output: string\nconsole.log(typeof 42);     // Output: number\nconsole.log(typeof true);   // Output: boolean",
        color: "purple"
      }
    ],
    rule: {
      title: "Declaration Rule",
      content: "Always write const first. Only change it to let if you find an explicit reason to reassign the variable."
    }
  },
  part3: {
    title: "The Core Primitive Types",
    intro: "JavaScript primitives represent immutable single values.",
    points: [
      {
        title: "Strings & Numbers",
        content: "Strings represent text enclosed in quotes. Numbers represent integers and decimals.",
        codeSnippet: "const name = \"LearnCraft\";\nconst rating = 4.9;\nconsole.log(name, rating); // Output: LearnCraft 4.9"
      },
      {
        title: "Booleans",
        content: "Booleans have only two possible states: true or false.",
        codeSnippet: "const isActive = true;\nconst isLocked = false;\nconsole.log(isActive, isLocked); // Output: true false"
      },
      {
        title: "null and undefined",
        content: "undefined means a variable has been declared but not assigned a value. null represents an intentional empty value.",
        codeSnippet: "let emptyValue;\nconsole.log(emptyValue); // Output: undefined\nconst user = null;\nconsole.log(user);       // Output: null"
      }
    ]
  },
  part4: {
    title: "Common Mistake: Reassigning const",
    bad: {
      title: "❌ Reassigning a const Variable",
      code: "const maxLimit = 100;\nmaxLimit = 150;\n// TypeError: Assignment to constant variable",
      explanation: "Attempting to assign a new value to a const variable throws a fatal runtime TypeError."
    },
    good: {
      title: "✅ Use let When Reassigning",
      code: "let limit = 100;\nlimit = 150; // Valid reassignment\nconsole.log(limit); // Output: 150",
      explanation: "Declare variables that change over time with let."
    }
  },
  part5: {
    title: "Variables Sandbox",
    intro: "Practice declaring variables with const and let and logging their types.",
    starterCode: "// 1. Declare a constant site name:\nconst siteName = \"LearnCraft\";\n\n// 2. Declare a counter with let and increment it:\nlet counter = 1;\ncounter = counter + 1;\n\nconsole.log(siteName, \"Counter:\", counter);\nconsole.log(\"Type of counter:\", typeof counter);\n"
  },
  part6: {
    title: "Key Takeaways: Variables",
    takeaways: [
      {
        title: "Use const by Default",
        desc: "Keeps code predictable by preventing accidental reassignments."
      },
      {
        title: "Use let for Mutable Values",
        desc: "Use let only when a value needs to be updated."
      },
      {
        title: "Primitive Types",
        desc: "string, number, boolean, null, and undefined are the core primitives."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which keyword should you use by default when declaring a variable in JavaScript?",
      options: [
        "const",
        "let",
        "var",
        "def"
      ],
      correctIndex: 0,
      explanation: "Always default to const. Only use let when you explicitly know the variable's value must be reassigned later."
    }
  }
};
