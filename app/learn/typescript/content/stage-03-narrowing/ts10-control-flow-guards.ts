import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts10ControlFlowGuardsContent: StandardLessonContent = {
  slug: "ts10-control-flow-guards",
  code: "TS-10",
  title: "Control Flow Analysis and Type Guards",
  subtitle: "Learn how typeof, instanceof, and the 'in' operator narrow broad types safely inside if-statements.",
  sections: [
    {
      id: "part1",
      label: "Type Narrowing",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Built-in Guards",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Narrowing Patterns",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "The typeof null Trap",
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
    title: "Control Flow Analysis and Type Guards",
    bigPicture:
      "Type narrowing means turning a broad type (like string | number) into a specific type using standard JavaScript checks like typeof, instanceof, or in.",
    breakdownTitle: "Three Built-in Guards",
    breakdownItems: [
      {
        title: "typeof (Primitives)",
        desc: "Checks primitive types: string, number, boolean, undefined, and function.",
      },
      {
        title: "instanceof (Classes)",
        desc: "Checks if an object was created by a class constructor (e.g. Date, Error, or custom classes).",
      },
      {
        title: "in (Object Keys)",
        desc: "Checks if a specific property exists on an object (e.g. 'role' in account).",
      },
    ],
  },
  part2: {
    title: "How Built-in Guards Work",
    intro:
      "Observe how TypeScript narrows types inside conditional branches:",
    cards: [
      {
        number: "01",
        tag: "typeof",
        title: "1. typeof for Primitives",
        description:
          "Narrows string, number, and boolean unions cleanly.",
        codeSnippet:
          "function format(x: string | number) {\n  if (typeof x === 'number') return x.toFixed(2);\n  return x.trim(); // Inferred as string here!\n}",
        color: "purple",
      },
      {
        number: "02",
        tag: "instanceof",
        title: "2. instanceof for Classes",
        description:
          "Narrows Date, Error, or custom class instances.",
        codeSnippet:
          "function parseDate(d: string | Date) {\n  if (d instanceof Date) return d.getFullYear();\n  return new Date(d).getFullYear();\n}",
        color: "cyan",
      },
      {
        number: "03",
        tag: "in",
        title: "3. 'in' for Object Keys",
        description:
          "Narrows objects by checking for the presence of a property.",
        codeSnippet:
          "type Admin = { role: 'admin' };\ntype User = { name: string };\nfunction check(u: Admin | User) {\n  if ('role' in u) return u.role; // Safe!\n}",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Branch Narrowing Rule",
      content:
        "Inside an if-statement, TypeScript narrows the variable to that specific type. After an early return, it narrows the remaining code automatically.",
    },
  },
  part3: {
    title: "Effective Narrowing Patterns",
    intro:
      "Everyday techniques to narrow types with minimal boilerplate:",
    points: [
      {
        title: "1. Early Return Guard Clauses",
        content:
          "Exit early on null or undefined to eliminate nested if-statements.",
        codeSnippet:
          "function process(user: User | null) {\n  if (!user) return;\n  console.log(user.name); // user is guaranteed non-null here\n}",
      },
      {
        title: "2. Truthiness Checks",
        content:
          "Using if (val) filters out null, undefined, 0, and empty strings.",
        codeSnippet:
          "function print(msg?: string) {\n  if (msg) console.log(msg.toUpperCase());\n}",
      },
      {
        title: "3. Equality Narrowing",
        content:
          "Comparing two variables with === narrows both to their shared value.",
        codeSnippet:
          "function match(x: string | number, y: string | boolean) {\n  if (x === y) console.log(x.toUpperCase()); // Both must be string!\n}",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: The typeof null === 'object' Trap",
    bad: {
      title: "❌ Checking typeof x === 'object' Without Checking for null",
      code:
        "function handle(x: { name: string } | null) {\n  // In JavaScript, typeof null === 'object'!\n  if (typeof x === 'object') {\n    // x is still possibly null!\n    // return x.name; // Can crash at runtime!\n  }\n}",
      explanation:
        "In JavaScript, typeof null is 'object'. Checking only typeof allows null to pass through silently.",
    },
    good: {
      title: "✅ Always Check x !== null When Checking for Objects",
      code:
        "function handle(x: { name: string } | null) {\n  if (x !== null && typeof x === 'object') {\n    return x.name; // Safe! Guaranteed non-null object\n  }\n  return 'Anonymous';\n}",
      explanation:
        "Check x !== null before or alongside typeof to safely rule out null.",
    },
    whyItMatters:
      "The typeof null trap is the #1 cause of 'cannot read property of null' bugs in JavaScript and TypeScript.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Practice using typeof, instanceof, and 'in' to narrow types in the live editor:",
    starterCode:
      "// TS-10: Type Guards & Control Flow\nfunction parseInput(input: string | number | Date): string {\n  if (typeof input === \"number\") {\n    return `Number: ${input.toFixed(2)}`;\n  }\n  if (input instanceof Date) {\n    return `Date: ${input.toISOString()}`;\n  }\n  return `String: ${input.trim()}`;\n}\n\nconsole.log(parseInput(\"  hello  \"));\nconsole.log(parseInput(42.5678));\nconsole.log(parseInput(new Date()));\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Why is `typeof x === 'object'` not enough to prove that `x` is a valid object?",
      options: [
        "Because `typeof` only works on numbers and strings.",
        "Because in JavaScript, `typeof null` also returns `'object'`.",
        "Because arrays return `'array'` instead of `'object'`.",
        "Because objects are erased at compile time.",
      ],
      correctIndex: 1,
      explanation:
        "In JavaScript, `typeof null === 'object'` due to a historical language bug. To safely narrow an object, always check `x !== null && typeof x === 'object'`.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "typeof for Primitives",
        desc: "Use typeof to narrow string, number, boolean, and function types.",
      },
      {
        title: "instanceof for Classes",
        desc: "Use instanceof to check Date, Error, and class instances.",
      },
      {
        title: "'in' for Properties",
        desc: "Use 'key' in object to distinguish between different object shapes.",
      },
    ],
    nextLessonPreview: {
      title: "TS-11: Custom Type Predicates",
      desc: "Learn how to write custom functions that return 'value is Type' to teach TypeScript your own validation checks.",
    },
  },
};
