import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js10ArraysAndIndexingContent: StandardLessonContent = {
  "slug": "js10-arrays-and-indexing",
  "code": "JS-10",
  "title": "Arrays & Indexing: Storing Ordered Lists",
  "subtitle": "Create ordered collections of data, access elements by zero-based index, and manage list sizes.",
  "sections": [
    {
      "id": "part1",
      "label": "Ordered Lists",
      "icon": "📋",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Indexing & Length",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Safe Access & AI Traps",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Off-by-One Bugs",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Arrays Sandbox",
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
    "title": "Why Ordered Lists Matter",
    "bigPicture": "Arrays store ordered collections of items under a single variable name. Each item occupies a numbered slot starting at index 0.",
    "analogy": "Think of an array like a row of post office boxes numbered 0, 1, 2, 3... You look inside any box by its specific number slot.",
    "diagram": "Index:      0          1          2\nArray:  [\"Apple\",  \"Banana\",  \"Cherry\"]\nLength: 3 elements",
    "breakdownTitle": "Array Essentials",
    "breakdownItems": [
      {
        "title": "Zero-Based Indexing",
        "desc": "The first item is always at index 0, and the last item is at array.length - 1."
      },
      {
        "title": "Dynamic Length",
        "desc": "The `.length` property automatically reflects the current count of elements."
      },
      {
        "title": "Mixed Data Types",
        "desc": "Arrays can hold strings, numbers, objects, or even other arrays."
      }
    ]
  },
  "part2": {
    "title": "Creating & Accessing Arrays",
    "intro": "Create arrays with square brackets and read elements with index notation.",
    "cards": [
      {
        "number": "01",
        "tag": "Literal",
        "title": "Array Literal ([])",
        "description": "Declare a list of comma-separated items enclosed in square brackets.",
        "codeSnippet": "const fruits = [\"Apple\", \"Banana\", \"Cherry\"];\nconsole.log(\"First fruit:\", fruits[0]); // Output: First fruit: Apple",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Index",
        "title": "Reading by Index",
        "description": "Access any element using its zero-based position in brackets `arr[index]`.",
        "codeSnippet": "const languages = [\"HTML\", \"CSS\", \"JavaScript\"];\nconsole.log(\"Favorite:\", languages[2]); // Output: Favorite: JavaScript",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Length",
        "title": "Array .length",
        "description": "Inspect the total number of items stored in the array.",
        "codeSnippet": "const tags = [\"frontend\", \"web\", \"react\"];\nconsole.log(\"Total tags:\", tags.length); // Output: Total tags: 3",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Zero-Index Rule",
      "content": "Remember that the last item of any array is always at `array.length - 1`."
    }
  },
  "part3": {
    "title": "Safe Access & Reading AI Code",
    "intro": "Learn safe array reading habits and avoid common off-by-one indexing traps.",
    "points": [
      {
        "title": "1. Out of Bounds Access",
        "content": "Accessing an index beyond the end of an array does not crash; it safely returns `undefined`.",
        "codeSnippet": "const colors = [\"Red\", \"Green\"];\nconsole.log(colors[5]); // Output: undefined (no crash!)"
      },
      {
        "title": "2. Updating Elements by Index",
        "content": "You can update an existing index directly. Always ensure the index exists before reassigning.",
        "codeSnippet": "const tasks = [\"Draft\", \"Review\"];\ntasks[0] = \"Draft Updated\";\nconsole.log(tasks); // Output: [ 'Draft Updated', 'Review' ]"
      },
      {
        "title": "3. Last Element Access with at(-1)",
        "content": "Modern JavaScript provides `arr.at(-1)` to access the last element cleanly without writing `arr[arr.length - 1]`.",
        "codeSnippet": "const users = [\"Alex\", \"Maria\", \"Sam\"];\nconsole.log(\"Last user:\", users.at(-1)); // Output: Last user: Sam"
      }
    ]
  },
  "part4": {
    "title": "Off-by-One Index Error",
    "bad": {
      "title": "❌ Reading arr[arr.length]",
      "code": "const items = [\"A\", \"B\", \"C\"];\n// Bug: length is 3, but the last index is 2!\nconst last = items[items.length];\nconsole.log(\"Last item:\", last); // Output: Last item: undefined",
      "explanation": "Because arrays are zero-indexed, `items[items.length]` accesses an index one slot past the end, resulting in `undefined`."
    },
    "good": {
      "title": "✅ Use at(-1) or length - 1",
      "code": "const items = [\"A\", \"B\", \"C\"];\n// Solution A: Modern .at(-1)\nconst lastA = items.at(-1);\n\n// Solution B: items.length - 1\nconst lastB = items[items.length - 1];\n\nconsole.log(\"Last item:\", lastA); // Output: Last item: C",
      "explanation": "Always subtract 1 from length or use modern `items.at(-1)` to read the final element."
    }
  },
  "part5": {
    "title": "Interactive Arrays Sandbox",
    "intro": "Practice creating arrays and reading elements in the editor.",
    "starterCode": "// 1. Declare an array of framework names:\nconst frameworks = [\"React\", \"Vue\", \"Angular\", \"Next.js\"];\n\n// 2. Access first and last elements:\nconsole.log(\"First framework:\", frameworks[0]);\nconsole.log(\"Last framework:\", frameworks.at(-1));\nconsole.log(\"Total count:\", frameworks.length);\n\n// PRACTICE:\n// 1. Add a new framework with frameworks.push(\"Svelte\");\n// 2. Log frameworks.length to confirm it increased.\n"
  },
  "part6": {
    "title": "Key Takeaways: Arrays & Indexing",
    "takeaways": [
      {
        "title": "Zero-Indexed",
        "desc": "Array indexing starts at 0, not 1."
      },
      {
        "title": "Safe Fallback",
        "desc": "Missing array slots evaluate to undefined without throwing fatal errors."
      },
      {
        "title": "Modern at()",
        "desc": "Use arr.at(-1) to read the last item cleanly."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "For an array with 5 elements, what is the index of the last element?",
      "options": [
        "5",
        "4",
        "undefined",
        "-1"
      ],
      "correctIndex": 1,
      "explanation": "Because JavaScript arrays start at index 0, an array with 5 elements has indexes 0, 1, 2, 3, and 4. The last index is `5 - 1 = 4`."
    }
  }
};
