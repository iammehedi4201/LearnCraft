import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts07FunctionOverloadsContent: StandardLessonContent = {
  slug: "ts07-function-overloads",
  code: "TS-07",
  title: "Writing Function Overloads",
  subtitle: "Define multiple function signatures so a function returns exact types based on different inputs.",
  sections: [
    {
      id: "part1",
      label: "Function Overloads",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Overload Syntax",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Overloads vs Unions",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Signature Mismatch Trap",
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
    title: "Writing Function Overloads",
    bigPicture:
      "Function overloads let a single function return different types depending on what inputs you pass in. You write multiple header signatures on top, followed by one real function body underneath.",
    breakdownTitle: "Three Overload Mechanics",
    breakdownItems: [
      {
        title: "Overload Signatures",
        desc: "Header lines at the top that declare each valid input-to-output relationship.",
      },
      {
        title: "Single Implementation Body",
        desc: "Only one real JavaScript function body exists at runtime; it handles all cases using if checks.",
      },
      {
        title: "Exact Return Types",
        desc: "Callers get back the exact return type for their input without needing to narrow a union.",
      },
    ],
  },
  part2: {
    title: "How Function Overloads Work",
    intro:
      "Observe how public overload signatures pair with one internal implementation body:",
    cards: [
      {
        number: "01",
        tag: "Signatures",
        title: "1. Overload Signatures",
        description:
          "Declare signatures without function bodies directly above the implementation.",
        codeSnippet:
          "function parse(x: string): string[];\nfunction parse(x: number): number[];",
        color: "purple",
      },
      {
        number: "02",
        tag: "Body",
        title: "2. The Single Body",
        description:
          "One function body with broad parameter types to handle all signatures.",
        codeSnippet:
          "function parse(x: string | number): any[] {\n  return typeof x === 'string' ? x.split('') : [x];\n}",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Usage",
        title: "3. Exact Results",
        description:
          "Callers receive the exact type without any type casting.",
        codeSnippet:
          "const letters = parse('hello'); // Inferred as string[]\nconst numbers = parse(42);      // Inferred as number[]",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Overload Rule",
      content:
        "Outside callers can only invoke the overload signatures. The implementation signature itself is invisible to outside callers.",
    },
  },
  part3: {
    title: "Overloads vs Simple Unions",
    intro:
      "When to use function overloads versus simpler alternatives like unions or generics:",
    points: [
      {
        title: "1. Overloads Give Exact Return Types",
        content:
          "Using a union like string | number forces callers to check the result. Overloads guarantee the exact type immediately.",
        codeSnippet:
          "// With overload: parse('hi') is 100% string[], not string[] | number[]",
      },
      {
        title: "2. Handling Different Argument Counts",
        content:
          "Overloads are perfect when a function can be called with 1 argument OR 3 arguments.",
        codeSnippet:
          "function makeDate(timestamp: number): Date;\nfunction makeDate(m: number, d: number, y: number): Date;\nfunction makeDate(mOrTimestamp: number, d?: number, y?: number): Date { ... }",
      },
      {
        title: "3. Prefer Generics When Simpler",
        content:
          "If the return type is always the same as the input type, a generic function <T>(x: T): T is simpler than overloads.",
        codeSnippet:
          "// Simpler with generic: function identity<T>(arg: T): T { return arg; }",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Implementation Incompatible with Overloads",
    bad: {
      title: "❌ Making the Implementation Body Too Narrow",
      code:
        "function format(input: string): string;\nfunction format(input: number): string;\n// Error: Implementation parameter only accepts string:\nfunction format(input: string): string {\n  return input.trim();\n}",
      explanation:
        "The implementation signature must accept all possible arguments declared in the overloads.",
    },
    good: {
      title: "✅ Use a Union That Covers All Overload Signatures",
      code:
        "function format(input: string): string;\nfunction format(input: number): string;\nfunction format(input: string | number): string {\n  return typeof input === 'string' ? input.trim() : input.toFixed(2);\n}\nconsole.log(format(' hello ')); // 'hello'\nconsole.log(format(12.3456));   // '12.35'",
      explanation:
        "Use a broad union (string | number) on the implementation so all overloads are supported.",
    },
    whyItMatters:
      "TypeScript checks that the implementation signature can legally satisfy every overload above it.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Test function overloads and inspect their return types in the live sandbox:",
    starterCode:
      "// TS-07: Function Overloads\nfunction getInfo(id: number): string;\nfunction getInfo(name: string): { name: string; found: boolean };\nfunction getInfo(arg: number | string): string | { name: string; found: boolean } {\n  if (typeof arg === \"number\") {\n    return `User #${arg}: Verified`;\n  }\n  return { name: arg, found: true };\n}\n\nconst strResult = getInfo(101);       // Inferred as string\nconst objResult = getInfo(\"Alice\");   // Inferred as { name: string; found: boolean }\n\nconsole.log(strResult);\nconsole.log(objResult.name, objResult.found);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Can calling code directly invoke the implementation signature of an overloaded function?",
      options: [
        "Yes, callers can invoke any signature including the implementation.",
        "No, TypeScript only allows callers to invoke the declared overload signatures; the implementation signature is hidden.",
        "Only if the implementation uses `any` as its return type.",
        "Only inside Node.js environments.",
      ],
      correctIndex: 1,
      explanation:
        "TypeScript treats overload signatures as the only public contract. The implementation signature is internal and hidden from outside callers.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Exact Return Types",
        desc: "Overloads map specific input types to exact output types.",
      },
      {
        title: "One Implementation Body",
        desc: "Write overload signatures on top; write a single function body underneath.",
      },
      {
        title: "Implementation Covers All",
        desc: "The implementation signature must be broad enough to handle every overload above it.",
      },
    ],
    nextLessonPreview: {
      title: "TS-08: Union and Intersection Types",
      desc: "Learn Union (|) for OR and Intersection (&) for AND with simple, real-world examples.",
    },
  },
};
