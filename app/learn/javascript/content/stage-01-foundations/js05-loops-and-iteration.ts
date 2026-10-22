import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js05LoopsAndIterationContent: StandardLessonContent = {
  "slug": "js05-loops-and-iteration",
  "code": "JS-05",
  "title": "Loops & Iteration: for...of, while & Loop Control",
  "subtitle": "Iterate through lists cleanly using modern for...of, understand while loops, and control execution with break and continue.",
  "sections": [
    {
      "id": "part1",
      "label": "Loop Fundamentals",
      "icon": "🔁",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Loop Varieties",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Safe Iteration & AI Bugs",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Infinite Loop Traps",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Loops Sandbox",
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
    "title": "Repeating Actions with Loops",
    "bigPicture": "Loops allow code to repeat tasks without duplicate code. Modern JavaScript emphasizes clean, non-indexed iteration using `for...of`.",
    "analogy": "Think of a loop like a factory conveyor belt. Each item passes in front of the robotic arm, gets inspected, and moves along until the belt is empty.",
    "diagram": "Array: [\"Item 1\", \"Item 2\", \"Item 3\"]\n             |\n             v\n   for (const item of items)\n   - Iteration 1: item = \"Item 1\"\n   - Iteration 2: item = \"Item 2\"\n   - Iteration 3: item = \"Item 3\"\n             |\n             v\n         Loop Ends",
    "breakdownTitle": "Looping Mechanisms",
    "breakdownItems": [
      {
        "title": "for...of Loop",
        "desc": "The modern standard for iterating over arrays and collections directly."
      },
      {
        "title": "while Loop",
        "desc": "Repeats a block of code as long as a condition evaluates to true."
      },
      {
        "title": "break & continue",
        "desc": "`break` exits the loop early; `continue` skips to the next item."
      }
    ]
  },
  "part2": {
    "title": "Loop Types in JavaScript",
    "intro": "Compare the most common loop types and when to use each.",
    "cards": [
      {
        "number": "01",
        "tag": "Modern",
        "title": "for...of Loop",
        "description": "Iterates through array elements directly without messy index tracking.",
        "codeSnippet": "const fruits = [\"Apple\", \"Banana\", \"Cherry\"];\nfor (const fruit of fruits) {\n  console.log(\"Fruit:\", fruit);\n}\n// Output:\n// Fruit: Apple\n// Fruit: Banana\n// Fruit: Cherry",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Conditional",
        "title": "while Loop",
        "description": "Runs as long as a condition is true. Useful when iterations are unknown upfront.",
        "codeSnippet": "let power = 1;\nwhile (power < 10) {\n  power *= 2;\n}\nconsole.log(\"Final power:\", power); // Output: Final power: 16",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Control",
        "title": "break & continue",
        "description": "Control loop flow: break stops immediately; continue skips to next iteration.",
        "codeSnippet": "for (let i = 1; i <= 4; i++) {\n  if (i === 2) continue; // Skip 2\n  console.log(\"Step:\", i);\n}\n// Output prints Step: 1, Step: 3, Step: 4",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Prefer for...of Rule",
      "content": "When looping over an array, prefer `for...of` over traditional index-based `for (let i = 0...)` loops."
    }
  },
  "part3": {
    "title": "Safe Iteration & AI Code Traps",
    "intro": "Master efficient loop control and avoid common loop mistakes in AI-generated code.",
    "points": [
      {
        "title": "1. for...of for Clean Array Reading",
        "content": "Use `for...of` to access elements directly. It prevents off-by-one errors and array index confusion.",
        "codeSnippet": "const students = [\"Alex\", \"Maria\", \"David\"];\nfor (const student of students) {\n  console.log(\"Present:\", student);\n}\n// Output:\n// Present: Alex\n// Present: Maria\n// Present: David"
      },
      {
        "title": "2. Early Exit with break",
        "content": "When searching for an element, stop looping with `break` as soon as you find it to save computer power.",
        "codeSnippet": "const orders = [101, 102, 103, 104];\nlet found = null;\n\nfor (const id of orders) {\n  if (id === 103) {\n    found = id;\n    break; // Stop immediately!\n  }\n}\nconsole.log(\"Found target order:\", found); // Output: Found target order: 103"
      },
      {
        "title": "3. Guarding Against Infinite Loops",
        "content": "In `while` loops, make sure the loop condition changes inside the loop body, otherwise the page will freeze.",
        "codeSnippet": "let attempts = 0;\nwhile (attempts < 3) {\n  console.log(\"Attempt #\" + (attempts + 1));\n  attempts++; // Crucial counter increment!\n}\n// Output:\n// Attempt #1\n// Attempt #2\n// Attempt #3"
      }
    ]
  },
  "part4": {
    "title": "Infinite Loop Crash",
    "bad": {
      "title": "❌ Infinite Loop Freezes Browser",
      "code": "let count = 0;\n// Bug: count is never updated inside the loop!\nwhile (count < 5) {\n  console.log(\"Count:\", count);\n  // Missing count++ causes infinite loop!\n}",
      "explanation": "Because `count` is never changed inside the loop body, the condition `count < 5` remains true forever, freezing the browser tab."
    },
    "good": {
      "title": "✅ Clear Loop Termination",
      "code": "let count = 0;\n// Safe: count increments toward the exit condition\nwhile (count < 3) {\n  console.log(\"Count:\", count);\n  count++; // Advances toward exit\n}\nconsole.log(\"Loop finished successfully!\");\n// Output:\n// Count: 0\n// Count: 1\n// Count: 2\n// Loop finished successfully!",
      "explanation": "Ensure every loop has a clear, guaranteed termination step that eventually makes the condition false."
    }
  },
  "part5": {
    "title": "Interactive Loops Sandbox",
    "intro": "Experiment with `for...of` and loop control keywords in the live editor.",
    "starterCode": "// 1. Iterate over an array with for...of:\nconst scores = [85, 92, 78, 96, 88];\nlet total = 0;\n\nfor (const score of scores) {\n  total += score;\n}\n\nconst average = total / scores.length;\nconsole.log(\"Average Score:\", average);\n\n// 2. Search and break:\nfor (const score of scores) {\n  if (score > 90) {\n    console.log(\"Top score found:\", score);\n    break; // Found first top score\n  }\n}\n"
  },
  "part6": {
    "title": "Key Takeaways: Loops & Iteration",
    "takeaways": [
      {
        "title": "Use for...of",
        "desc": "for...of provides the cleanest syntax for array iteration without managing counters."
      },
      {
        "title": "Exit Early with break",
        "desc": "Stop searching as soon as you find what you need."
      },
      {
        "title": "Check while Loop Counters",
        "desc": "Always ensure while loop variables change inside the loop body to prevent freezes."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What is the primary advantage of `for...of` over traditional `for (let i = 0; i < arr.length; i++)`?",
      "options": [
        "It avoids index variables and prevents off-by-one errors",
        "It automatically runs in parallel across multiple CPU cores",
        "It converts strings to numbers automatically",
        "It can only be used on objects, not arrays"
      ],
      "correctIndex": 0,
      "explanation": "`for...of` provides clean direct access to array elements without manual index counters, eliminating off-by-one errors."
    }
  }
};
