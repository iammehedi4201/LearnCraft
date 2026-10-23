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
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "const vs let",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Primitive Types",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Reassigning const",
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
    title: "Declaring Variables",
    bigPicture: "Variables store data in your program. In modern JavaScript, use `const` by default for fixed values, and `let` only when a value needs to be reassigned.",
    breakdownTitle: "Modern Declaration Rules",
    breakdownItems: [
      {
        title: "Default to const",
        desc: "Use const for all variables by default to prevent accidental reassignment bugs."
      },
      {
        title: "Use let for Changing Values",
        desc: "Use let only when a value must be reassigned later, like counters or loop accumulators."
      },
      {
        title: "Never Use var",
        desc: "var is legacy syntax with confusing hoisting behavior. Always use const and let."
      }
    ]
  },
  part2: {
    title: "const and let in Action",
    intro: "Two keywords handle all variable declarations in modern JavaScript.",
    cards: [
      {
        number: "01",
        tag: "Immutable",
        title: "const (Default Choice)",
        description: "Creates a permanent variable binding that cannot be reassigned to a new value.",
        codeSnippet: "const maxScore = 100;\nconsole.log(maxScore); // Output: 100\n// maxScore = 200; // Error! Cannot reassign const",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Reassignable",
        title: "let (When Value Changes)",
        description: "Allows reassigning the variable to a different value later in the code.",
        codeSnippet: "let score = 0;\nscore = 15; // Reassignment works cleanly\nconsole.log(score); // Output: 15",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Inspection",
        title: "typeof Operator",
        description: "Returns a string describing the category of data stored inside any variable.",
        codeSnippet: "console.log(typeof \"Hello\"); // Output: string\nconsole.log(typeof 42);      // Output: number\nconsole.log(typeof true);    // Output: boolean",
        color: "purple"
      }
    ],
    rule: {
      title: "The Best Practice Rule",
      content: "Write const by default. Only change it to let when you find a specific reason why the variable needs to be reassigned."
    }
  },
  part3: {
    title: "The Core Primitive Types",
    intro: "Primitives are basic, single values that represent fundamental data.",
    points: [
      {
        title: "1. String (Text)",
        content: "Represents textual information wrapped in quotes ('single' or \"double\").",
        codeSnippet: "const username = \"Alex\";\nconsole.log(username); // Output: Alex"
      },
      {
        title: "2. Number & Boolean",
        content: "Numbers represent integers and decimals. Booleans have only two states: true or false.",
        codeSnippet: "const age = 25;\nconst isVerified = true;\nconsole.log(age, isVerified); // Output: 25 true"
      },
      {
        title: "3. null and undefined",
        content: "undefined means a variable has been declared but not given a value yet. null represents an intentional, deliberate empty value.",
        codeSnippet: "let notAssignedYet;\nconsole.log(notAssignedYet); // Output: undefined\nconst userAddress = null;   // Explicitly empty\nconsole.log(userAddress);    // Output: null"
      }
    ]
  },
  part4: {
    title: "Common Trap: Reassigning a const Variable",
    bad: {
      title: "❌ Attempting to Reassign a const",
      code: "const maxLimit = 50;\nmaxLimit = 75;\n// TypeError: Assignment to constant variable",
      explanation: "JavaScript prevents changing what a const variable holds. Attempting to assign a new value causes a fatal TypeError."
    },
    good: {
      title: "✅ Use let When Values Need to Change",
      code: "let limit = 50;\nlimit = 75; // Allowed because limit was declared with let\nconsole.log(limit); // Output: 75",
      explanation: "If you know a value will change as the program runs, declare it with let right from the start."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Declare a constant site title and a dynamic counter using let. Observe how reassigning let works.",
    starterCode: "// 1. Declare a constant site name:\nconst platform = \"LearnCraft\";\n\n// 2. Declare a counter with let and update it:\nlet counter = 1;\ncounter = counter + 1;\n\nconsole.log(\"Platform:\", platform);\nconsole.log(\"Counter value:\", counter);\nconsole.log(\"Type of counter:\", typeof counter);\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Use const by Default",
        desc: "Declare every variable with const unless you specifically know it needs to be reassigned."
      },
      {
        title: "Use let for Changing Values",
        desc: "Use let for counters, totals, and state values that must be updated later."
      },
      {
        title: "Check Types with typeof",
        desc: "Use typeof to quickly inspect whether a variable holds a string, number, boolean, or object."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which keyword should you use by default when creating a variable in modern JavaScript?",
      options: [
        "const, because it prevents accidental reassignment and makes code predictable",
        "var, because it works the same in every version of JavaScript",
        "let, because const variables can never be read after creation",
        "def, because it defines functions and variables together"
      ],
      correctIndex: 0,
      explanation: "Modern JavaScript best practice is to declare all variables with const by default, and only switch to let when you explicitly need to reassign the value."
    }
  }
};
