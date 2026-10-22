import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js05LoopsAndIterationContent: StandardLessonContent = {
  slug: "js05-loops-and-iteration",
  code: "JS-05",
  title: "Repeating Code with Loops",
  subtitle: "Repeat operations efficiently using standard for loops, modern for...of for arrays, and condition-based while loops.",
  sections: [
    {
      id: "part1",
      label: "Looping Concepts",
      icon: "🔁",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "Loop Syntaxes",
      icon: "⚡",
      tag: "SYNTAX"
    },
    {
      id: "part3",
      label: "break & continue",
      icon: "🛑",
      tag: "FLOW CONTROL"
    },
    {
      id: "part4",
      label: "Infinite Loop Trap",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Loops Sandbox",
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
    title: "Repeating Work with Loops",
    bigPicture: "Loops repeat a block of code as long as a specified condition remains true. They automate repetitive tasks across data collections.",
    analogy: "Like running laps on a track: you repeat the lap until you reach your target lap count, then you stop.",
    diagram: "+-------------------------------------------+\n| 1. Initialize counter: let i = 0          |\n| 2. Check condition: i < 3                 |\n|    --> True: Run body & increment i++     |\n| 3. Repeat until condition becomes false   |\n+-------------------------------------------+",
    breakdownTitle: "Iteration Tools",
    breakdownItems: [
      {
        title: "Standard for Loop",
        desc: "Best when you need an explicit counter or numeric index to access positions."
      },
      {
        title: "for...of Loop",
        desc: "The cleanest modern way to iterate directly over elements in an array or iterable."
      },
      {
        title: "while Loop",
        desc: "Repeats as long as a dynamic condition is true, useful when the number of iterations is unknown in advance."
      }
    ]
  },
  part2: {
    title: "The Three Core Loop Syntaxes",
    intro: "Choose the loop syntax that matches your data source.",
    cards: [
      {
        number: "01",
        tag: "Modern",
        title: "for...of (Arrays)",
        description: "Directly accesses each item in an array without managing an index counter.",
        codeSnippet: "const fruits = [\"apple\", \"banana\", \"cherry\"];\nfor (const fruit of fruits) {\n  console.log(fruit);\n}\n// Output:\n// apple\n// banana\n// cherry",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Indexed",
        title: "Standard for Loop",
        description: "Tracks an index counter from start to end with custom step increments.",
        codeSnippet: "for (let i = 1; i <= 3; i++) {\n  console.log(\"Count:\", i);\n}\n// Output:\n// Count: 1\n// Count: 2\n// Count: 3",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Condition",
        title: "while Loop",
        description: "Runs as long as its condition evaluates to true.",
        codeSnippet: "let energy = 3;\nwhile (energy > 0) {\n  console.log(\"Energy remaining:\", energy);\n  energy--;\n}\n// Output: 3, 2, 1",
        color: "purple"
      }
    ],
    rule: {
      title: "Selection Rule",
      content: "When reading elements in an array, prefer for...of. Only use standard for loops when you specifically require the numerical index."
    }
  },
  part3: {
    title: "Controlling Loop Flow: break & continue",
    intro: "Use break to exit early and continue to skip to the next iteration.",
    points: [
      {
        title: "break (Instant Exit)",
        content: "Terminates the loop immediately when a match or condition is met.",
        codeSnippet: "const items = [1, 2, 99, 4, 5];\nfor (const num of items) {\n  if (num === 99) break; // Stops immediately\n  console.log(num);\n}\n// Output: 1, 2"
      },
      {
        title: "continue (Skip Iteration)",
        content: "Skips the rest of the current iteration and jumps straight to the next one.",
        codeSnippet: "for (let i = 1; i <= 4; i++) {\n  if (i === 2) continue; // Skips 2\n  console.log(i);\n}\n// Output: 1, 3, 4"
      },
      {
        title: "Accumulating Values",
        content: "A common loop pattern is maintaining an accumulator variable declared outside the loop.",
        codeSnippet: "let total = 0;\nconst prices = [10, 20, 30];\nfor (const price of prices) {\n  total += price;\n}\nconsole.log(\"Total:\", total); // Output: Total: 60"
      }
    ]
  },
  part4: {
    title: "Common Pitfall: The Infinite Loop",
    bad: {
      title: "❌ Missing Loop Increment (Freezes Browser)",
      code: "let count = 0;\n// Bug: count is never updated, condition is always true!\nwhile (count < 5) {\n  console.log(count);\n  // Missing count++! Freezes the thread indefinitely\n}",
      explanation: "Without incrementing the loop variable, the condition never evaluates to false, locking the single JavaScript thread."
    },
    good: {
      title: "✅ Guaranteed Condition Update",
      code: "let count = 0;\nwhile (count < 5) {\n  console.log(count);\n  count++; // Safe: advances toward exit condition\n}\n// Output: 0, 1, 2, 3, 4",
      explanation: "Ensure every while loop explicitly modifies its state so it reaches the exit condition."
    }
  },
  part5: {
    title: "Loops Sandbox",
    intro: "Practice iterating over collections with for...of and accumulating totals.",
    starterCode: "const scores = [80, 95, 70, 85];\nlet sum = 0;\n\n// 1. Calculate sum with for...of:\nfor (const score of scores) {\n  sum += score;\n}\n\nconst average = sum / scores.length;\nconsole.log(\"Total score:\", sum);\nconsole.log(\"Average score:\", average);\n"
  },
  part6: {
    title: "Key Takeaways: Loops",
    takeaways: [
      {
        title: "Prefer for...of for Arrays",
        desc: "Clean, direct iteration over array items without index boilerplate."
      },
      {
        title: "break vs continue",
        desc: "break stops the entire loop; continue skips only the current iteration."
      },
      {
        title: "Always Update Loop State",
        desc: "Prevent infinite loops by ensuring counters advance on every pass."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which loop syntax is most recommended for iterating over values in an array?",
      options: [
        "for...in loop",
        "for...of loop",
        "while loop with manual pointer",
        "do...while loop"
      ],
      correctIndex: 1,
      explanation: "for...of is designed specifically for iterating over iterable values like arrays cleanly, without needing manual index counters."
    }
  }
};
