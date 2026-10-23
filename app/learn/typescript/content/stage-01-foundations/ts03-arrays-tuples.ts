import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts03ArraysTuplesContent: StandardLessonContent = {
  slug: "ts03-arrays-tuples",
  code: "TS-03",
  title: "Arrays and Tuples",
  subtitle: "Master type-safe arrays (type[]) and fixed-position tuples ([string, number]) in TypeScript.",
  sections: [
    {
      id: "part1",
      label: "Arrays & Tuples",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Array & Tuple Rules",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Tuples in Practice",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Tuple Traps",
      icon: "🛡️",
      tag: "COMMON PITFALL",
    },
    {
      id: "part5",
      label: "Code Playground",
      icon: "💻",
      tag: "PLAYGROUND",
    },
    {
      id: "part6",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT",
    },
    {
      id: "part7",
      label: "Key Takeaways",
      icon: "🎓",
      tag: "KEY TAKEAWAYS",
    },
  ],
  part1: {
    title: "Arrays and Tuples",
    bigPicture:
      "An Array holds any number of items of the same type (number[]). A Tuple is a fixed-length array where each position has a specific type ([string, number]).",
    breakdownTitle: "The Core Difference",
    breakdownItems: [
      {
        title: "Array (type[])",
        desc: "A list of any length where all elements have the same type (e.g. string[]).",
      },
      {
        title: "Tuple ([A, B])",
        desc: "A fixed-size array with exact types at each index position (e.g. [string, number]).",
      },
      {
        title: "readonly Modifier",
        desc: "Locks an array or tuple so items cannot be added, removed, or modified.",
      },
    ],
  },
  part2: {
    title: "How Arrays and Tuples Work",
    intro:
      "Observe how TypeScript enforces types on arrays and fixed tuples:",
    cards: [
      {
        number: "01",
        tag: "Array",
        title: "1. Typed Arrays (T[])",
        description:
          "Holds any number of items of the declared type.",
        codeSnippet:
          "const scores: number[] = [85, 92, 78];\nscores.push(95);   // OK\n// scores.push('100'); // Error: number required",
        color: "purple",
      },
      {
        number: "02",
        tag: "Tuple",
        title: "2. Positional Tuples",
        description:
          "Fixed length and exact type at every position index.",
        codeSnippet:
          "const coordinate: [number, number] = [40.71, -74.00];\n// const bad: [number, number] = [40.71]; // Error: needs 2 items",
        color: "cyan",
      },
      {
        number: "03",
        tag: "readonly",
        title: "3. Readonly Arrays",
        description:
          "Prevents push, pop, and index reassignments.",
        codeSnippet:
          "const tags: readonly string[] = ['ts', 'js'];\n// tags.push('node'); // Error: push does not exist on readonly",
        color: "emerald",
      },
    ],
    rule: {
      title: "Array vs Tuple Rule",
      content:
        "Use an array (T[]) for collections of varying size. Use a tuple ([A, B]) when index positions carry specific meanings like key-value pairs or coordinates.",
    },
  },
  part3: {
    title: "Why and When to Use Tuples",
    intro:
      "Real-world scenarios where tuples provide clean, type-safe solutions:",
    points: [
      {
        title: "1. React Hook Return Values",
        content:
          "React's useState hook returns a tuple [value, setter] so callers can destruct and rename them easily.",
        codeSnippet:
          "// [count, setCount] is a tuple of [number, (val: number) => void]",
      },
      {
        title: "2. Coordinates and Key-Value Pairs",
        content:
          "Representing latitude/longitude or dictionary entries with fixed positions.",
        codeSnippet:
          "type Entry = [key: string, value: number];\nconst entry: Entry = ['score', 100];",
      },
      {
        title: "3. Inferring Tuples with as const",
        content:
          "Adding 'as const' tells TypeScript to infer an exact readonly tuple instead of a generic array.",
        codeSnippet:
          "const pair = ['admin', 1] as const; // Inferred as readonly ['admin', 1]",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Array Union vs Mixed Array",
    bad: {
      title: "❌ Misplacing Parentheses in Union Arrays",
      code:
        "let items: string | number[];\n// This means: either a single string OR an array of numbers!\n// items = ['a', 1]; // Error!",
      explanation:
        "Without parentheses, 'string | number[]' means a string OR an array of numbers.",
    },
    good: {
      title: "✅ Wrap the Union in Parentheses (type | type)[]",
      code:
        "let items: (string | number)[];\nitems = ['a', 1, 'b', 2]; // Safe! Allows mixed strings and numbers",
      explanation:
        "Wrap unions in parentheses '(string | number)[]' to declare an array containing mixed types.",
    },
    whyItMatters:
      "Parentheses change how TypeScript groups types. Mastering array union syntax prevents confusing type errors.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Practice declaring and using typed arrays and positional tuples:",
    starterCode:
      "// TS-03: Arrays & Tuples\nconst languages: string[] = [\"TypeScript\", \"JavaScript\", \"Python\"];\n\n// Positional Tuple: [name, rating]\nconst courseRating: [string, number] = [\"TS Foundations\", 4.9];\n\nconsole.log(`Course: ${courseRating[0]} (Rating: ${courseRating[1]})`);\nconsole.log(`All Languages: ${languages.join(\", \")}`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "What is the type of `const point: [number, number] = [10, 20];`?",
      options: [
        "A standard unbounded array of numbers.",
        "A fixed-length tuple with exactly two number elements.",
        "An object with keys 0 and 1.",
        "A union type of number and number.",
      ],
      correctIndex: 1,
      explanation:
        "The syntax `[number, number]` declares a tuple: an array with fixed length 2 where both elements must be numbers.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Arrays (T[])",
        desc: "Use arrays for dynamic lists of matching elements.",
      },
      {
        title: "Tuples ([A, B])",
        desc: "Use tuples for fixed-position pairs, coordinates, or multi-value return shapes.",
      },
      {
        title: "readonly Arrays",
        desc: "Add readonly to prevent mutating methods like .push() or direct reassignments.",
      },
    ],
    nextLessonPreview: {
      title: "TS-04: Object Types and Optional Properties",
      desc: "Learn how to define object shapes, optional fields (?), and immutable readonly properties in TypeScript.",
    },
  },
};
