import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js05LoopsAndIterationContent: StandardLessonContent = {
  slug: "js05-loops-and-iteration",
  code: "JS-05",
  title: "Repeating Code with Loops",
  subtitle: "Automate repetitive tasks using standard for loops, modern for...of loops, while loops, and control execution with break.",
  sections: [
    {
      id: "part1",
      label: "Repeating Code with Loops",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "Loop Syntaxes",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "break & continue",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Infinite Loop Trap",
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
    title: "Repeating Code with Loops",
    bigPicture: "Loops repeat a block of code while a condition is true. Use `for...of` to iterate through arrays, standard `for` when you need index counts, and `while` when repetitions depend on a condition.",
    breakdownTitle: "The Three Main Loops",
    breakdownItems: [
      {
        title: "Standard for Loop",
        desc: "Best when you need a numeric counter to repeat code an exact number of times."
      },
      {
        title: "for...of Loop",
        desc: "The cleanest modern way to step through every item in an array or collection."
      },
      {
        title: "while Loop",
        desc: "Repeats as long as a condition holds true, useful when total cycles are uncertain."
      }
    ]
  },
  part2: {
    title: "for, while, and for...of Loops",
    intro: "Choose the loop that fits your task best.",
    cards: [
      {
        number: "01",
        tag: "Counting",
        title: "Standard for Loop",
        description: "Includes initialization, test condition, and step increment in one line.",
        codeSnippet: "for (let i = 1; i <= 3; i++) {\n  console.log(\"Count:\", i);\n}\n// Output:\n// Count: 1\n// Count: 2\n// Count: 3",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Modern",
        title: "for...of Loop (Lists)",
        description: "Directly accesses each value in an array or collection with simple, readable syntax.",
        codeSnippet: "const fruits = [\"apple\", \"banana\", \"orange\"];\nfor (const item of fruits) {\n  console.log(item);\n}\n// Output: apple, banana, orange",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Condition",
        title: "while Loop",
        description: "Continues running as long as its condition evaluates to true.",
        codeSnippet: "let power = 3;\nwhile (power > 0) {\n  console.log(\"Power:\", power);\n  power--;\n}\n// Output: 3, 2, 1",
        color: "purple"
      }
    ],
    rule: {
      title: "Anatomy of a for Loop",
      content: "for (start; condition; step) { ... }. Always ensure the step moves the counter closer to ending the condition."
    }
  },
  part3: {
    title: "Controlling Execution: break and continue",
    intro: "You can alter how a loop executes using break and continue.",
    points: [
      {
        title: "1. break: Exit the Loop Immediately",
        content: "Use break to immediately terminate the entire loop when a desired condition is found.",
        codeSnippet: "for (let i = 1; i <= 10; i++) {\n  if (i === 3) break; // Stops entire loop\n  console.log(i);\n}\n// Output: 1, 2"
      },
      {
        title: "2. continue: Skip to the Next Iteration",
        content: "Use continue to skip the rest of the current iteration and jump straight to the next cycle.",
        codeSnippet: "for (let i = 1; i <= 4; i++) {\n  if (i === 2) continue; // Skips 2\n  console.log(i);\n}\n// Output: 1, 3, 4"
      },
      {
        title: "3. Accumulating Totals in a Loop",
        content: "A common real-world pattern is summing numbers inside a loop using an external variable.",
        codeSnippet: "let total = 0;\nfor (let i = 1; i <= 3; i++) {\n  total += i;\n}\nconsole.log(\"Total sum:\", total); // Output: 6"
      }
    ]
  },
  part4: {
    title: "Common Trap: The Infinite Loop",
    bad: {
      title: "❌ Forgetting to Update the Counter",
      code: "let count = 1;\nwhile (count <= 3) {\n  console.log(count);\n  // BUG: count is never incremented!\n  // The condition (count <= 3) remains true forever!\n}",
      explanation: "If a loop's condition never becomes false, the loop runs forever, freezing the browser or crashing your Node.js program."
    },
    good: {
      title: "✅ Always Increment Counter Toward the Exit",
      code: "let count = 1;\nwhile (count <= 3) {\n  console.log(count);\n  count++; // Safely increments count: 1 -> 2 -> 3 -> 4 (stops!)\n}\n// Output: 1, 2, 3",
      explanation: "Every loop must include a step that progresses toward making the condition false."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Run counting loops and calculate total amounts in the interactive sandbox.",
    starterCode: "// 1. Standard counting loop:\nconsole.log(\"--- Counting 1 to 4 ---\");\nfor (let i = 1; i <= 4; i++) {\n  console.log(\"Step #\", i);\n}\n\n// 2. Accumulating a total sum:\nlet totalPoints = 0;\nfor (let i = 1; i <= 5; i++) {\n  totalPoints += 10;\n}\nconsole.log(\"Total points earned:\", totalPoints);\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Standard for Counts Steps",
        desc: "Use for (let i = 0; i < limit; i++) when you know exactly how many times to repeat."
      },
      {
        title: "Use for...of for Collections",
        desc: "Use for...of to cleanly inspect items in lists without tracking numbers."
      },
      {
        title: "Always Advance Toward Exit",
        desc: "Make sure loop variables change on each iteration to prevent infinite loops."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "How many times will this loop print 'Hello'?: for (let i = 0; i < 3; i++) { console.log('Hello'); }",
      options: [
        "3 times (for i = 0, 1, and 2)",
        "4 times (for i = 0, 1, 2, and 3)",
        "2 times (for i = 1 and 2)",
        "0 times because i starts at zero"
      ],
      correctIndex: 0,
      explanation: "The loop starts at i = 0 and continues while i < 3. It runs for i = 0, i = 1, and i = 2 (a total of 3 times). When i reaches 3, the condition i < 3 becomes false and the loop terminates."
    }
  }
};
