import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts02PrimitivesInferenceContent: StandardLessonContent = {
  slug: "ts02-primitives-inference",
  code: "TS-02",
  title: "Type Annotations and Type Inference",
  subtitle: "Master string, number, and boolean, and understand when to let TypeScript infer types automatically.",
  sections: [
    {
      id: "part1",
      label: "Primitives & Inference",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Inference Rules",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Best Practices",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Inference Pitfalls",
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
    title: "Type Annotations and Type Inference",
    bigPicture:
      "TypeScript automatically infers variable types from their initial values. You only write explicit type annotations when declaring an empty variable to assign later.",
    breakdownTitle: "Three Core Primitives",
    breakdownItems: [
      {
        title: "string",
        desc: "Text values wrapped in quotes or template strings (e.g. 'Alex' or `Hello ${name}`).",
      },
      {
        title: "number",
        desc: "All numeric values including integers (42), decimals (3.14), and negative numbers.",
      },
      {
        title: "boolean",
        desc: "True or false logic values (never quotes like 'true' or numbers like 1).",
      },
    ],
  },
  part2: {
    title: "How Type Inference Works",
    intro:
      "Observe how TypeScript infers types automatically from declaration and assignment:",
    cards: [
      {
        number: "01",
        tag: "Inference",
        title: "1. Automatic Inference",
        description:
          "TypeScript automatically infers the type from the initial value.",
        codeSnippet:
          "let score = 100; // Inferred as number\n// score = '100'; // Error: Type 'string' is not assignable to 'number'",
        color: "purple",
      },
      {
        number: "02",
        tag: "Annotation",
        title: "2. Explicit Annotation",
        description:
          "Use explicit types when declaring a variable before assigning its value.",
        codeSnippet:
          "let userRole: string; // Explicit annotation\nuserRole = 'admin';  // OK",
        color: "cyan",
      },
      {
        number: "03",
        tag: "const Literal",
        title: "3. const Infers Literals",
        description:
          "Constants cannot change, so TypeScript infers their exact literal value.",
        codeSnippet:
          "const role = 'admin'; // Inferred as literal 'admin', not general string",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Inference Rule",
      content:
        "Trust type inference for initialized variables. Only add explicit annotations when a variable is declared without an initial value.",
    },
  },
  part3: {
    title: "When to Annotate vs When to Infer",
    intro:
      "Follow these practical guidelines for clean, idiomatic TypeScript code:",
    points: [
      {
        title: "1. Avoid Redundant Annotations",
        content:
          "Writing 'let name: string = Alex' is redundant noise. Just write 'let name = Alex'.",
        codeSnippet:
          "// Redundant: let count: number = 0;\n// Idiomatic: let count = 0;",
      },
      {
        title: "2. Always Use Lowercase Primitives",
        content:
          "Always use lowercase string, number, and boolean. Uppercase String or Number are JavaScript wrapper objects.",
        codeSnippet:
          "let name: string = 'Alex'; // Correct\n// let name: String = 'Alex'; // Avoid wrapper objects!",
      },
      {
        title: "3. Uninitialized Variables Default to any",
        content:
          "Declaring 'let x;' without an initial value or type causes it to implicitly become 'any'.",
        codeSnippet:
          "let query: string; // Good: typed before assignment",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: The Implicit any Trap",
    bad: {
      title: "❌ Declaring Variables Without Value or Type",
      code:
        "let search; // Inferred as 'any'!\nsearch = 'shoes';\nsearch = 42; // TypeScript allows this silently, losing type safety",
      explanation:
        "Variables declared with 'let' and no initial value fall back to 'any', disabling type safety.",
    },
    good: {
      title: "✅ Add an Explicit Type When Initializing Later",
      code:
        "let search: string; // Explicitly typed as string\nsearch = 'shoes';\n// search = 42; // Caught! Error: Type 'number' is not assignable to 'string'",
      explanation:
        "Add a type annotation whenever declaring a variable whose value will be assigned later.",
    },
    whyItMatters:
      "Letting variables accidentally fall back to 'any' undermines TypeScript's error detection across your codebase.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Experiment with primitive types and automatic inference in the live sandbox:",
    starterCode:
      "// TS-02: Primitives & Inference\nlet courseTitle = \"LearnCraft TypeScript\"; // Inferred as string\nlet maxStudents = 50;                     // Inferred as number\nlet isPublished = true;                   // Inferred as boolean\n\nconsole.log(`${courseTitle} allows ${maxStudents} students (Active: ${isPublished})`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Why is `let count: number = 10;` considered non-idiomatic TypeScript?",
      options: [
        "Because `count` cannot be reassigned when typed as `number`.",
        "Because TypeScript already infers `count` as `number` from the value `10`, making `: number` redundant.",
        "Because `number` is an invalid type in TypeScript.",
        "Because numbers must be written with quotes.",
      ],
      correctIndex: 1,
      explanation:
        "TypeScript's inference engine automatically types initialized variables. Writing `: number` when assigning `10` is redundant boilerplate.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Inference First",
        desc: "Let TypeScript infer types automatically whenever an initial value is provided.",
      },
      {
        title: "Lowercase Types",
        desc: "Always use lowercase string, number, and boolean primitive types.",
      },
      {
        title: "Annotate Uninitialized",
        desc: "Add explicit type annotations when declaring variables without immediate values to prevent implicit any.",
      },
    ],
    nextLessonPreview: {
      title: "TS-03: Arrays and Tuples",
      desc: "Learn type-safe arrays (T[]) and positional fixed-length tuples ([string, number]) in TypeScript.",
    },
  },
};
