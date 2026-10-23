import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js10ArraysAndIndexingContent: StandardLessonContent = {
  slug: "js10-arrays-and-indexing",
  code: "JS-10",
  title: "Working with Arrays",
  subtitle: "Store ordered collections of data, access elements with zero-based indexing, read array length, and add or remove items using push, pop, and slice.",
  sections: [
    {
      id: "part1",
      label: "Working with Arrays",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "Array Elements & Indexing",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Core Array Methods",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Off-by-One Errors",
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
    title: "Working with Arrays",
    bigPicture: "An array is an ordered list of items enclosed in square brackets `[]`. Elements are accessed using zero-based index numbers starting at `0`.",
    breakdownTitle: "Array Fundamentals",
    breakdownItems: [
      {
        title: "Zero-Based Indexing",
        desc: "The first item is always at index 0, and the last is at array.length - 1."
      },
      {
        title: "The length Property",
        desc: "Returns the total count of elements currently in the array."
      },
      {
        title: "Dynamic Sizing",
        desc: "JavaScript arrays expand and shrink dynamically as you add or remove items."
      }
    ]
  },
  part2: {
    title: "Reading, Adding, and Updating Elements",
    intro: "Use square brackets [ ] with an index number to read or modify elements.",
    cards: [
      {
        number: "01",
        tag: "Read",
        title: "Reading by Index",
        description: "Access any value using its zero-based position in square brackets.",
        codeSnippet: "const skills = [\"JavaScript\", \"TypeScript\", \"React\"];\nconsole.log(skills[0]); // Output: JavaScript\nconsole.log(skills[2]); // Output: React",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Write",
        title: "Updating Elements",
        description: "Assign a new value directly to any existing index position.",
        codeSnippet: "const items = [\"Alpha\", \"Beta\"];\nitems[0] = \"Omega\"; // Replace position 0\nconsole.log(items); // Output: ['Omega', 'Beta']",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Last Item",
        title: "Reading the Last Item",
        description: "Use array.at(-1) or array[array.length - 1] to read from the end.",
        codeSnippet: "const letters = [\"A\", \"B\", \"C\", \"D\"];\nconsole.log(letters.at(-1)); // Output: D",
        color: "purple"
      }
    ],
    rule: {
      title: "Index Range Rule",
      content: "Valid indices run from 0 to array.length - 1. Accessing an index outside this range returns undefined without crashing."
    }
  },
  part3: {
    title: "Essential Array Methods (push, pop, includes)",
    intro: "The most common tools for modifying and inspecting lists.",
    points: [
      {
        title: "1. push() and pop()",
        content: "push() adds one or more items to the very end of an array. pop() removes and returns the last item.",
        codeSnippet: "const list = [\"task1\"];\nlist.push(\"task2\"); // Add to end\nconsole.log(list);   // Output: ['task1', 'task2']\nconst last = list.pop(); // Removes 'task2'\nconsole.log(last);   // Output: task2"
      },
      {
        title: "2. includes() for Membership Checks",
        content: "Returns true if an item exists anywhere in the array, false otherwise.",
        codeSnippet: "const roles = [\"admin\", \"editor\"];\nconsole.log(roles.includes(\"admin\")); // Output: true\nconsole.log(roles.includes(\"guest\")); // Output: false"
      },
      {
        title: "3. slice() for Non-Destructive Sub-Arrays",
        content: "Extracts a section of an array without modifying the original array.",
        codeSnippet: "const numbers = [10, 20, 30, 40];\nconst middle = numbers.slice(1, 3);\nconsole.log(middle); // Output: [20, 30]"
      }
    ]
  },
  part4: {
    title: "Common Trap: Off-by-One Index Errors",
    bad: {
      title: "❌ Using array.length as an Index",
      code: "const fruits = [\"apple\", \"banana\", \"cherry\"];\n// fruits.length is 3!\n// But the valid indices are 0, 1, 2!\nconsole.log(fruits[fruits.length]);\n// Output: undefined",
      explanation: "Because indexing starts at 0, an array of length 3 has items at indices 0, 1, and 2. Index 3 does not exist and evaluates to undefined."
    },
    good: {
      title: "✅ Subtract 1 or Use array.at(-1)",
      code: "const fruits = [\"apple\", \"banana\", \"cherry\"];\nconsole.log(fruits[fruits.length - 1]); // Output: cherry\nconsole.log(fruits.at(-1));             // Output: cherry",
      explanation: "array.length - 1 or the modern array.at(-1) safely accesses the last element."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Add items, check membership with includes(), and inspect the length of your array.",
    starterCode: "const techStack = [\"JavaScript\", \"React\"];\n\n// 1. Add modern backend tools:\ntechStack.push(\"Node.js\");\ntechStack.push(\"PostgreSQL\");\n\nconsole.log(\"Complete stack:\", techStack);\nconsole.log(\"Total technologies:\", techStack.length);\nconsole.log(\"First technology:\", techStack[0]);\nconsole.log(\"Last technology:\", techStack.at(-1));\nconsole.log(\"Contains React:\", techStack.includes(\"React\"));\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Indexing Starts at 0",
        desc: "The first item is always at index 0, and the last is at array.length - 1."
      },
      {
        title: "push and pop Manage Ends",
        desc: "Use push() to add items to the end and pop() to remove the last item."
      },
      {
        title: "Use includes() to Search",
        desc: "Check if an item exists cleanly with array.includes(item) returning true or false."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "In an array with 4 items: const colors = ['red', 'green', 'blue', 'yellow'], what is the index of the first item?",
      options: [
        "0",
        "1",
        "-1",
        "4"
      ],
      correctIndex: 0,
      explanation: "JavaScript arrays are zero-indexed. The very first element is always located at index 0, so colors[0] gives 'red'."
    }
  }
};
