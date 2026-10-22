import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js15SpreadAndRestOperatorsContent: StandardLessonContent = {
  slug: "js15-spread-and-rest-operators",
  code: "JS-15",
  title: "Using Spread and Rest",
  subtitle: "Master the three dots (...) syntax to gather function arguments with Rest and unpack arrays and objects with Spread.",
  sections: [
    {
      id: "part1",
      label: "Rest vs Spread",
      icon: "✨",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "Three Dots Syntax",
      icon: "⚡",
      tag: "SYNTAX"
    },
    {
      id: "part3",
      label: "Merging & Copying",
      icon: "📑",
      tag: "PATTERNS"
    },
    {
      id: "part4",
      label: "Rest Position Trap",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Spread Sandbox",
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
    title: "The Dual Roles of the Three Dots (...)",
    bigPicture: "The three dots (...) perform opposite operations depending on where they are used: Spread unpacks elements out of a container; Rest gathers multiple loose elements into a single array.",
    analogy: "Spread is like unpacking a suitcase: taking all items out onto the bed. Rest is like packing items into a box: gathering loose items into one container.",
    diagram: "SPREAD (Unpacks items):\n[1, 2] + [3, 4]  -->  [...[1, 2], ...[3, 4]]  -->  [1, 2, 3, 4]\n\nREST (Gathers items):\nfn(1, 2, 3, 4)   -->  function fn(...items)     -->  items = [1, 2, 3, 4]",
    breakdownTitle: "Core Distinctions",
    breakdownItems: [
      {
        title: "Spread Operator",
        desc: "Used in expressions, array literals, and object literals to expand elements."
      },
      {
        title: "Rest Operator",
        desc: "Used in function parameter lists and destructuring patterns to gather remaining items."
      },
      {
        title: "Immutable Merging",
        desc: "Spread allows combining objects and arrays into brand new structures without mutating originals."
      }
    ]
  },
  part2: {
    title: "Spread and Rest Syntaxes",
    intro: "Two primary applications of the three dots (...) syntax.",
    cards: [
      {
        number: "01",
        tag: "Spread",
        title: "Spreading Arrays & Objects",
        description: "Unpacks elements to shallow copy or merge structures.",
        codeSnippet: "const base = [1, 2];\nconst combined = [...base, 3, 4];\nconsole.log(combined); // Output: [1, 2, 3, 4]\n\nconst user = { name: \"Alex\" };\nconst withRole = { ...user, role: \"Admin\" };\nconsole.log(withRole); // Output: { name: 'Alex', role: 'Admin' }",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Rest",
        title: "Rest Parameters",
        description: "Gathers any number of incoming arguments into a real array.",
        codeSnippet: "function sumAll(...numbers) {\n  return numbers.reduce((total, n) => total + n, 0);\n}\nconsole.log(sumAll(5, 10, 15)); // Output: 30",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Destructuring",
        title: "Rest in Destructuring",
        description: "Gathers the remaining unextracted properties into a separate object.",
        codeSnippet: "const task = { id: 1, title: \"Ship v1\", done: false, priority: 1 };\nconst { id, title, ...meta } = task;\nconsole.log(meta); // Output: { done: false, priority: 1 }",
        color: "purple"
      }
    ],
    rule: {
      title: "Context Rule",
      content: "If ... is on the receiving side (function parameters or destructuring), it is Rest (gathering). If it is on the producing side (array/object literal), it is Spread (unpacking)."
    }
  },
  part3: {
    title: "Common Patterns with Spread",
    intro: "Everyday use cases for the spread operator in modern applications.",
    points: [
      {
        title: "1. Passing Array Elements as Arguments",
        content: "Expand an array into individual arguments for functions like Math.max().",
        codeSnippet: "const scores = [45, 99, 12, 88];\nconst highest = Math.max(...scores);\nconsole.log(highest); // Output: 99"
      },
      {
        title: "2. Overwriting Object Properties Cleanly",
        content: "Later properties in an object spread override earlier ones with the same key.",
        codeSnippet: "const defaults = { theme: \"light\", notifications: true };\nconst userSettings = { ...defaults, theme: \"dark\" };\nconsole.log(userSettings); // Output: { theme: 'dark', notifications: true }"
      },
      {
        title: "3. Concatenating Arrays",
        content: "Merge multiple arrays into a new array cleanly without mutable methods.",
        codeSnippet: "const frontend = [\"React\", \"Vue\"];\nconst backend = [\"Node\", \"Go\"];\nconst fullStack = [...frontend, ...backend];\nconsole.log(fullStack); // Output: ['React', 'Vue', 'Node', 'Go']"
      }
    ]
  },
  part4: {
    title: "Common Pitfall: Rest Parameter Must Be Last",
    bad: {
      title: "❌ Rest Parameter Placed in the Middle",
      code: "// SyntaxError: Rest parameter must be last formal parameter\n// function process(first, ...middle, last) {\n//   return [first, last];\n// }",
      explanation: "JavaScript cannot determine where a middle rest parameter ends, so placing it anywhere except the end throws a SyntaxError."
    },
    good: {
      title: "✅ Place Rest as the Final Parameter",
      code: "function process(first, ...rest) {\n  return { first, remainingCount: rest.length };\n}\nconsole.log(process(\"primary\", \"sec1\", \"sec2\"));\n// Output: { first: 'primary', remainingCount: 2 }",
      explanation: "Rest parameters must always be the final identifier in a parameter list."
    }
  },
  part5: {
    title: "Spread & Rest Sandbox",
    intro: "Practice gathering function arguments with rest and merging objects with spread.",
    starterCode: "// 1. Rest function that prefixes items:\nfunction tagList(prefix, ...items) {\n  return items.map(item => `[${prefix}] ${item}`);\n}\n\n// 2. Spread object update:\nconst defaultProfile = { role: \"user\", verified: false };\nconst customProfile = { ...defaultProfile, verified: true, name: \"Sarah\" };\n\nconsole.log(tagList(\"NEW\", \"MacBook\", \"iPad\", \"AirPods\"));\nconsole.log(customProfile);\n"
  },
  part6: {
    title: "Key Takeaways: Spread & Rest",
    takeaways: [
      {
        title: "Spread Unpacks",
        desc: "Expands arrays and objects into individual elements or properties."
      },
      {
        title: "Rest Gathers",
        desc: "Collects multiple incoming arguments or remaining properties into a real array."
      },
      {
        title: "Rest Must Be Last",
        desc: "Always place ...rest as the final parameter in function definitions."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What does `const merged = { a: 1, ...{ a: 2, b: 3 } }; console.log(merged.a);` output?",
      options: [
        "1",
        "2",
        "undefined",
        "SyntaxError"
      ],
      correctIndex: 1,
      explanation: "In object spreads, properties that appear later in the literal overwrite earlier properties sharing the same key. The second object's `a: 2` replaces `a: 1`."
    }
  }
};
