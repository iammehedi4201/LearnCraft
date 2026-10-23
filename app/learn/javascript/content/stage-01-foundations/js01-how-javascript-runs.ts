import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js01HowJavascriptRunsContent: StandardLessonContent = {
  slug: "js01-how-javascript-runs",
  code: "JS-01",
  title: "How JavaScript Runs Code",
  subtitle: "Learn how JavaScript executes instructions line by line, prints messages with console.log, and performs calculations.",
  sections: [
    {
      id: "part1",
      label: "How JavaScript Runs",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "Statements & console.log",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Sequential Execution",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Missing Quotes Trap",
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
    title: "How JavaScript Runs Code",
    bigPicture: "JavaScript executes instructions line by line from top to bottom. It runs directly inside modern web browsers and Node.js environments.",
    breakdownTitle: "Core Rules of Execution",
    breakdownItems: [
      {
        title: "Top-to-Bottom Execution",
        desc: "JavaScript reads and executes your script line by line in the order you write it."
      },
      {
        title: "Viewing Output with console.log",
        desc: "console.log() prints text, numbers, and test results to the screen."
      },
      {
        title: "Comments with //",
        desc: "Lines starting with // are ignored by JavaScript, allowing you to leave helpful notes."
      }
    ]
  },
  part2: {
    title: "Statements and console.log",
    intro: "Here are the three basic building blocks of every JavaScript program.",
    cards: [
      {
        number: "01",
        tag: "Output",
        title: "Printing Text",
        description: "Enclose words in quotes to display text in the console.",
        codeSnippet: "console.log(\"Welcome to LearnCraft!\");\n// Output: Welcome to LearnCraft!",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Calculation",
        title: "Performing Math",
        description: "JavaScript calculates math expressions immediately inside console.log.",
        codeSnippet: "console.log(20 + 5);\nconsole.log(10 * 3);\n// Output:\n// 25\n// 30",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Notes",
        title: "Using Comments",
        description: "Add notes to explain your code without affecting how it runs.",
        codeSnippet: "// This note is ignored by JavaScript\nconsole.log(\"Code runs normally\");\n// Output: Code runs normally",
        color: "purple"
      }
    ],
    rule: {
      title: "The Golden Rule of Strings",
      content: "Always wrap text in matching quotes ('text' or \"text\"). Numbers do not need quotes."
    }
  },
  part3: {
    title: "Sequential Line-by-Line Execution",
    intro: "Follow how JavaScript moves through lines one by one.",
    points: [
      {
        title: "1. Step 1 Runs First",
        content: "The engine executes the first line, produces the output, and finishes before looking at line 2.",
        codeSnippet: "console.log(\"Step 1: Starting the engine\");\n// Output: Step 1: Starting the engine"
      },
      {
        title: "2. Step 2 Calculates Values",
        content: "Expressions are evaluated first, then the result is logged.",
        codeSnippet: "console.log(\"Step 2: Total is\", 50 + 25);\n// Output: Step 2: Total is 75"
      },
      {
        title: "3. Step 3 Finishes the Script",
        content: "The final line runs only after all preceding instructions have completed.",
        codeSnippet: "console.log(\"Step 3: Program complete\");\n// Output: Step 3: Program complete"
      }
    ]
  },
  part4: {
    title: "Common Trap: Missing Quotes Around Text",
    bad: {
      title: "❌ Leaving Off Quotes Around Words",
      code: "console.log(Welcome);\n// ReferenceError: Welcome is not defined",
      explanation: "Without quotes, JavaScript thinks Welcome is a variable name. Because no variable named Welcome exists, the program crashes with a ReferenceError."
    },
    good: {
      title: "✅ Wrap Text Inside Quotes",
      code: "console.log(\"Welcome\");\n// Output: Welcome",
      explanation: "Enclosing text in quotes tells JavaScript that this is a literal text string, so it prints it without error."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Practice running basic statements. Click Run Code to see JavaScript execute each line in order.",
    starterCode: "// 1. Print a greeting:\nconsole.log(\"Hello, JavaScript!\");\n\n// 2. Perform a math calculation:\nconsole.log(\"Calculated sum:\", 10 + 15);\n\n// 3. Print multiple values together:\nconsole.log(\"User count:\", 3, \"Status:\", \"Online\");\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Runs Top to Bottom",
        desc: "JavaScript executes lines sequentially, finishing each instruction before moving to the next."
      },
      {
        title: "console.log() Shows Results",
        desc: "Use console.log to print values, calculations, and debug information to the screen."
      },
      {
        title: "Quotes Mean Text",
        desc: "Always wrap literal text in quotes. Numbers and math operations do not require quotes."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "How does JavaScript execute code statements inside a script by default?",
      options: [
        "It executes statements line by line from top to bottom in order",
        "It executes lines in random order depending on computer speed",
        "It executes all lines at the exact same instant simultaneously",
        "It starts at the bottom of the file and reads upward"
      ],
      correctIndex: 0,
      explanation: "JavaScript executes instructions sequentially from top to bottom, completing each statement before proceeding to the next."
    }
  }
};
