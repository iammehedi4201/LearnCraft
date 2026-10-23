import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts14GenericFunctionsContent: StandardLessonContent = {
  slug: "ts14-generic-functions",
  code: "TS-14",
  title: "Writing Generic Functions",
  subtitle: "Understand how generics (<T>) capture and preserve types between inputs and outputs in plain, easy words.",
  sections: [
    {
      id: "part1",
      label: "Generic Functions",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Generic Syntax",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Why Generics Matter",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Unnecessary Generics Trap",
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
    title: "Writing Generic Functions",
    bigPicture:
      "Generics (<T>) are type variables. Instead of hardcoding one specific type like string or losing safety with any, <T> remembers whatever type you pass in and preserves that exact type on the output.",
    breakdownTitle: "Three Core Principles",
    breakdownItems: [
      {
        title: "The <T> Placeholder",
        desc: "A variable for types. It stands for whatever type the caller passes into the function.",
      },
      {
        title: "Exact Type Preservation",
        desc: "Passing in a string array returns a string (not any), preserving full autocomplete.",
      },
      {
        title: "Automatic Inference",
        desc: "TypeScript infers T automatically from your function arguments without manual annotations.",
      },
    ],
  },
  part2: {
    title: "How Generic Functions Work",
    intro:
      "Observe how <T> captures the input type and carries it through to the return value:",
    cards: [
      {
        number: "01",
        tag: "Identity",
        title: "1. The Identity Function",
        description:
          "Accepts any type and returns that exact same type.",
        codeSnippet:
          "function identity<T>(arg: T): T {\n  return arg;\n}\nconst num = identity(42);       // T is number\nconst str = identity('hello');  // T is string",
        color: "purple",
      },
      {
        number: "02",
        tag: "Arrays",
        title: "2. Extracting Array Elements",
        description:
          "Returns the first element of an array with its exact type preserved.",
        codeSnippet:
          "function first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\nconst item = first(['a', 'b']); // Inferred as string | undefined",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Multi-Param",
        title: "3. Multiple Type Variables",
        description:
          "Use <T, U> when a function combines two independent types.",
        codeSnippet:
          "function pair<T, U>(a: T, b: U): [T, U] {\n  return [a, b];\n}\nconst res = pair('score', 100); // Inferred as [string, number]",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Generic Purpose Rule",
      content:
        "Only use generics when there is a meaningful relationship between two or more parameters, or between an input and the output.",
    },
  },
  part3: {
    title: "Why Generics Beat 'any'",
    intro:
      "Compare what happens when you use 'any' versus a generic <T>:",
    points: [
      {
        title: "1. 'any' Destroys Autocomplete",
        content:
          "If a function returns 'any', your editor cannot suggest properties, and typos will crash in production.",
        codeSnippet:
          "function badFirst(arr: any[]): any { return arr[0]; }\n// badFirst(['alex']).toUpperCase(); // No autocomplete help!",
      },
      {
        title: "2. Generics Preserve Full Autocomplete",
        content:
          "Because T remembers the input was string, your editor suggests all string methods automatically.",
        codeSnippet:
          "function goodFirst<T>(arr: T[]): T | undefined { return arr[0]; }\n// goodFirst(['alex'])?.toUpperCase(); // Full editor autocomplete!",
      },
      {
        title: "3. Clean Reusable Utilities",
        content:
          "A single generic function can safely handle numbers, users, products, and dates without duplicate code.",
        codeSnippet:
          "function wrapInArray<T>(item: T): T[] {\n  return [item];\n}",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Adding Unnecessary Generics",
    bad: {
      title: "❌ Using a Generic When No Type Relationship Exists",
      code:
        "// Anti-pattern: T is used only once and not returned:\nfunction printMessage<T>(msg: T): void {\n  console.log(msg);\n}\n// A generic here adds useless complexity!",
      explanation:
        "If a type variable is only used once in a function parameter and not returned, you do not need a generic.",
    },
    good: {
      title: "✅ Use a Simple Primitive or unknown Type Instead",
      code:
        "// Clean and idiomatic:\nfunction printMessage(msg: unknown): void {\n  console.log(msg);\n}\n// Simple, readable, and zero boilerplate!",
      explanation:
        "Only introduce <T> when there is a relationship between inputs and outputs to preserve.",
    },
    whyItMatters:
      "Overusing generics is the #1 reason TypeScript codebases become hard to read. Keep functions simple until relationships require <T>.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Practice declaring and calling generic functions in the live sandbox:",
    starterCode:
      "// TS-14: Generic Functions\nfunction getFirstAndLast<T>(items: T[]): [T, T] | null {\n  if (items.length === 0) return null;\n  return [items[0], items[items.length - 1]];\n}\n\nconst scores = [88, 92, 79, 95];\nconst names = [\"Alice\", \"Bob\", \"Charlie\"];\n\nconst scoreRange = getFirstAndLast(scores); // Inferred as [number, number] | null\nconst nameRange = getFirstAndLast(names);   // Inferred as [string, string] | null\n\nconsole.log(\"Scores:\", scoreRange);\nconsole.log(\"Names:\", nameRange);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "What is the main benefit of writing `function first<T>(arr: T[]): T` instead of `function first(arr: any[]): any`?",
      options: [
        "It compiles faster.",
        "It captures and preserves the exact element type on the return value, providing full autocomplete and type safety.",
        "It allows arrays to hold multiple different types simultaneously.",
        "It prevents arrays from being mutated at runtime.",
      ],
      correctIndex: 1,
      explanation:
        "Using `<T>` links the array element type to the return type. When you pass `string[]`, TypeScript knows the return value is a `string`, preserving autocomplete and compile-time safety.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "<T> Type Variable",
        desc: "Generics act as type variables that capture and preserve types dynamically.",
      },
      {
        title: "Preserves Autocomplete",
        desc: "Generics ensure that the return type matches the input type, unlike unsafe any.",
      },
      {
        title: "Use Sparingly",
        desc: "Only use generics when there is a clear relationship between inputs and outputs.",
      },
    ],
    nextLessonPreview: {
      title: "TS-15: Generic Interfaces and Types",
      desc: "Learn how to build reusable data structures like ApiResponse<T> and Paginated<T> in simple, easy words.",
    },
  },
};
