import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js15SpreadAndRestOperatorsContent: StandardLessonContent = {
  "slug": "js15-spread-and-rest-operators",
  "code": "JS-15",
  "title": "Spread & Rest Operators: Expanding & Collecting",
  "subtitle": "Master the three dots (...) syntax to expand elements with spread and collect parameters with rest.",
  "sections": [
    {
      "id": "part1",
      "label": "The Three Dots",
      "icon": "✨",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Spread vs Rest",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Practical Patterns & AI",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Mutation Pitfall",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Spread Sandbox",
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
    "title": "Expanding vs Collecting Data",
    "bigPicture": "The `...` operator has two distinct superpowers depending on where you use it. When expanding arrays or objects, it is the Spread operator. When gathering multiple arguments into an array, it is the Rest operator.",
    "analogy": "Spread is like unpacking a box and spreading its contents across a table. Rest is like gathering loose items from the table and packing them into a single box.",
    "diagram": "Spread (Unpacking):\n[ ...[1, 2], 3 ]  --> [ 1, 2, 3 ]\n\nRest (Gathering):\nfunction sum(...nums)  --> nums is gathered into [ 1, 2, 3 ]",
    "breakdownTitle": "Dual Modes of ...",
    "breakdownItems": [
      {
        "title": "Spread Operator",
        "desc": "Expands an iterable (like an array or object) into individual elements or properties."
      },
      {
        "title": "Rest Operator",
        "desc": "Gathers multiple remaining items into a real JavaScript array."
      },
      {
        "title": "Immutability",
        "desc": "Enables non-mutating additions and updates for state management."
      }
    ]
  },
  "part2": {
    "title": "Spread & Rest in Action",
    "intro": "See how spread combines data and how rest collects arguments.",
    "cards": [
      {
        "number": "01",
        "tag": "Array Spread",
        "title": "Combining Arrays",
        "description": "Merge multiple arrays into a new combined array cleanly.",
        "codeSnippet": "const front = [\"HTML\", \"CSS\"];\nconst back = [\"Node\", \"SQL\"];\nconst full = [...front, ...back];\nconsole.log(full); // Output: [ 'HTML', 'CSS', 'Node', 'SQL' ]",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Object Spread",
        "title": "Merging Objects",
        "description": "Combine properties from multiple objects, overriding duplicates.",
        "codeSnippet": "const defaults = { theme: \"light\", debug: false };\nconst userConfig = { ...defaults, theme: \"dark\" };\nconsole.log(userConfig); // Output: { theme: 'dark', debug: false }",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Rest Param",
        "title": "Rest Parameters",
        "description": "Gather an indefinite number of arguments into a true array.",
        "codeSnippet": "function sumAll(...numbers) {\n  return numbers.reduce((a, b) => a + b, 0);\n}\nconsole.log(\"Sum:\", sumAll(1, 2, 3, 4)); // Output: Sum: 10",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Rest Must Be Last",
      "content": "In function parameter lists, the rest parameter `...rest` must always be the very last parameter."
    }
  },
  "part3": {
    "title": "Practical Patterns & Reading AI Code",
    "intro": "Use spread for non-mutating array operations and rest for flexible functions.",
    "points": [
      {
        "title": "1. Non-Mutating Array Additions",
        "content": "Instead of calling `.push()` which mutates in place, use spread to create a new array with the item added.",
        "codeSnippet": "const tasks = [\"Task 1\", \"Task 2\"];\nconst nextTasks = [...tasks, \"Task 3\"];\n\nconsole.log(tasks.length);     // Output: 2 (untouched!)\nconsole.log(nextTasks.length); // Output: 3 (fresh copy)"
      },
      {
        "title": "2. Stripping Properties with Rest",
        "content": "Use rest destructuring to omit sensitive properties like passwords before returning data.",
        "codeSnippet": "const userAccount = { id: 101, username: \"alex\", password: \"secretPassword\" };\n\n// Strip password into its own variable, keep safeUser:\nconst { password, ...safeUser } = userAccount;\nconsole.log(\"Safe user object:\", safeUser);\n// Output: Safe user object: { id: 101, username: 'alex' }"
      },
      {
        "title": "3. Passing Array Items to Math.max",
        "content": "Functions like `Math.max()` expect separate number arguments. Use spread to unpack an array of numbers.",
        "codeSnippet": "const scores = [45, 88, 92, 70];\nconst highest = Math.max(...scores);\nconsole.log(\"Highest score:\", highest); // Output: Highest score: 92"
      }
    ]
  },
  "part4": {
    "title": "Mutating State Instead of Spreading",
    "bad": {
      "title": "❌ In-Place Push Mutates Original State",
      "code": "const state = [\"item-1\", \"item-2\"];\n// Bug: .push() modifies the existing array in memory!\nstate.push(\"item-3\");\nconsole.log(\"Mutated array length:\", state.length); // 3 (original was modified)",
      "explanation": "Direct mutation violates immutability principles in React, Redux, and modern reactive frameworks."
    },
    "good": {
      "title": "✅ Clean Spread Array Copy",
      "code": "const state = [\"item-1\", \"item-2\"];\n// Clean: creates a brand-new array reference\nconst nextState = [...state, \"item-3\"];\n\nconsole.log(\"Original state:\", state.length); // Output: 2 (safe!)\nconsole.log(\"Next state:\", nextState.length); // Output: 3",
      "explanation": "Spreading creates a new array reference, allowing state management engines to detect updates reliably."
    }
  },
  "part5": {
    "title": "Interactive Spread Sandbox",
    "intro": "Experiment with merging arrays and rest parameters in the editor.",
    "starterCode": "// 1. Merge settings objects:\nconst defaultTheme = { font: \"sans-serif\", bg: \"#ffffff\" };\nconst userTheme = { ...defaultTheme, bg: \"#1a1a1a\" };\nconsole.log(\"Theme configuration:\", userTheme);\n\n// 2. Rest parameter calculator:\nfunction calculateAverage(category, ...scores) {\n  const sum = scores.reduce((a, b) => a + b, 0);\n  return category + \" Average: \" + (sum / scores.length);\n}\n\nconsole.log(calculateAverage(\"Math\", 85, 90, 95));\n"
  },
  "part6": {
    "title": "Key Takeaways: Spread & Rest",
    "takeaways": [
      {
        "title": "Spread Unpacks",
        "desc": "Spread expands arrays and objects into new copies without mutating originals."
      },
      {
        "title": "Rest Gathers",
        "desc": "Rest collects leftover arguments into a true array."
      },
      {
        "title": "Immutable Updates",
        "desc": "Use spread to add and modify items cleanly in state."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What is the result of `const a = [1, 2]; const b = [...a, 3];` on the original array `a`?",
      "options": [
        "a becomes [1, 2, 3]",
        "a remains [1, 2] unchanged",
        "a throws a TypeError",
        "a becomes undefined"
      ],
      "correctIndex": 1,
      "explanation": "The spread operator copies elements from `a` into a new array `b`. The original array `a` remains completely untouched."
    }
  }
};
