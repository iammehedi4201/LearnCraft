import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js10ArraysAndIndexingContent: StandardLessonContent = {
  slug: "js10-arrays-and-indexing",
  code: "JS-10",
  title: "Working with Arrays",
  subtitle: "Store ordered collections of data, access elements using zero-based indexing, and manage items with push, pop, and includes.",
  sections: [
    {
      id: "part1",
      label: "Ordered Lists",
      icon: "📋",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "Array Basics",
      icon: "⚡",
      tag: "SYNTAX"
    },
    {
      id: "part3",
      label: "Essential Methods",
      icon: "🛠️",
      tag: "METHODS"
    },
    {
      id: "part4",
      label: "Off-by-One Trap",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Arrays Sandbox",
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
    title: "Ordered Collections in JavaScript",
    bigPicture: "An array is an ordered list of values enclosed in square brackets. Each item is stored at a numeric position called an index, starting at 0.",
    analogy: "Like a row of numbered lockers starting at locker 0. To access what is inside, you open the locker using its number.",
    diagram: "Indices:    [0]          [1]          [2]\nValues:  [\"React\",   \"Node.js\",   \"Postgres\"]\nLength:  3 elements (Last element is at index length - 1)",
    breakdownTitle: "Array Fundamentals",
    breakdownItems: [
      {
        title: "Zero-Based Indexing",
        desc: "The first item in an array is at index 0. The second item is at index 1."
      },
      {
        title: "The length Property",
        desc: "Returns the total number of items in the array. The last item is at array[array.length - 1]."
      },
      {
        title: "Dynamic Resizing",
        desc: "JavaScript arrays automatically expand and shrink as elements are added or removed."
      }
    ]
  },
  part2: {
    title: "Accessing and Modifying Elements",
    intro: "Use square bracket notation to read and write items by their index position.",
    cards: [
      {
        number: "01",
        tag: "Read",
        title: "Reading by Index",
        description: "Access any value using its zero-based position in square brackets.",
        codeSnippet: "const tags = [\"frontend\", \"backend\", \"devops\"];\nconsole.log(tags[0]); // Output: frontend\nconsole.log(tags[2]); // Output: devops",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Write",
        title: "Updating Elements",
        description: "Reassign any existing index position with a new value.",
        codeSnippet: "const items = [\"alpha\", \"beta\"];\nitems[0] = \"ALPHA\"; // Mutate position 0\nconsole.log(items); // Output: ['ALPHA', 'beta']",
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
      title: "Out-of-Bounds Rule",
      content: "Accessing an index that does not exist in the array returns undefined without throwing an error."
    }
  },
  part3: {
    title: "Essential Array Operations",
    intro: "Common methods to add, remove, and check elements in arrays.",
    points: [
      {
        title: "push() & pop() (End of Array)",
        content: "push adds one or more items to the end. pop removes and returns the last item.",
        codeSnippet: "const queue = [\"task1\"];\nqueue.push(\"task2\"); // ['task1', 'task2']\nconst last = queue.pop(); // removes 'task2'\nconsole.log(queue, \"Popped:\", last); // Output: ['task1'] Popped: task2"
      },
      {
        title: "includes() (Membership Check)",
        content: "Returns true if an item exists in the array, using strict equality under the hood.",
        codeSnippet: "const allowedRoles = [\"admin\", \"editor\"];\nconsole.log(allowedRoles.includes(\"admin\")); // Output: true\nconsole.log(allowedRoles.includes(\"guest\")); // Output: false"
      },
      {
        title: "indexOf() (Locate Position)",
        content: "Returns the numeric index of the item, or -1 if the item is not found.",
        codeSnippet: "const colors = [\"red\", \"green\", \"blue\"];\nconsole.log(colors.indexOf(\"green\")); // Output: 1\nconsole.log(colors.indexOf(\"purple\")); // Output: -1"
      }
    ]
  },
  part4: {
    title: "Common Pitfall: The Off-by-One Index Error",
    bad: {
      title: "❌ Accessing array[array.length]",
      code: "const fruits = [\"apple\", \"banana\", \"mango\"];\n// Bug: length is 3, but the last index is 2!\nconst lastItem = fruits[fruits.length];\nconsole.log(lastItem); // Output: undefined",
      explanation: "Because indexing starts at 0, an array of length 3 has items at 0, 1, and 2. Reading index 3 looks past the end of the array."
    },
    good: {
      title: "✅ Use array[array.length - 1] or array.at(-1)",
      code: "const fruits = [\"apple\", \"banana\", \"mango\"];\nconst lastItemA = fruits[fruits.length - 1];\nconst lastItemB = fruits.at(-1);\nconsole.log(lastItemA, lastItemB); // Output: mango mango",
      explanation: "Subtract 1 from the length, or use modern array.at(-1) for clean negative indexing."
    }
  },
  part5: {
    title: "Arrays Sandbox",
    intro: "Practice adding, removing, and reading elements by index.",
    starterCode: "const techStack = [\"TypeScript\", \"React\", \"Node.js\"];\n\n// 1. Add an item:\ntechStack.push(\"PostgreSQL\");\n\n// 2. Read length and last item:\nconsole.log(\"Stack count:\", techStack.length);\nconsole.log(\"Last added:\", techStack.at(-1));\n\n// 3. Check membership:\nconsole.log(\"Has React?\", techStack.includes(\"React\"));\n"
  },
  part6: {
    title: "Key Takeaways: Arrays",
    takeaways: [
      {
        title: "Zero-Based Indexing",
        desc: "The first item is always at index 0; the last is at index length - 1."
      },
      {
        title: "push and pop",
        desc: "push adds items to the end; pop removes the last item."
      },
      {
        title: "Clean Check with includes",
        desc: "Use array.includes(item) to verify membership without manual loops."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "For an array with 5 elements, what is the index of the last element?",
      options: [
        "5",
        "4",
        "0",
        "-1"
      ],
      correctIndex: 1,
      explanation: "Because array indexing starts at 0, the 5 elements occupy indices 0, 1, 2, 3, and 4. The last element is at length - 1, which is index 4."
    }
  }
};
