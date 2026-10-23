import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts05SpecialTypesContent: StandardLessonContent = {
  slug: "ts05-special-types",
  code: "TS-05",
  title: "Special Types: any, unknown, never, void",
  subtitle: "Understand why unknown is safe, why any is dangerous, and what void and never mean in plain, simple words.",
  sections: [
    {
      id: "part1",
      label: "Special Types",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Type Comparison",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Why and When to Use",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "The any Trap",
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
    title: "Special Types: any, unknown, never, void",
    bigPicture:
      "'any' turns off TypeScript completely and allows anything, even code that crashes. 'unknown' is the safe version: it accepts any value, but forces you to check the type before using it. 'void' means no return value, and 'never' means code that can never finish.",
    breakdownTitle: "Four Special Types",
    breakdownItems: [
      {
        title: "any (Unsafe)",
        desc: "Turns off the type checker. Allows calling non-existent methods and causes runtime bugs.",
      },
      {
        title: "unknown (Safe Top Type)",
        desc: "Accepts any value, but forces you to check the type with typeof or an if-statement before use.",
      },
      {
        title: "void (No Return)",
        desc: "A function that completes its execution but returns no value (like console.log).",
      },
      {
        title: "never (Unreachable)",
        desc: "Values that can never exist (like functions that always throw an error or infinite loops).",
      },
    ],
  },
  part2: {
    title: "How any, unknown, and never Work",
    intro:
      "Observe how TypeScript treats each of these four special types:",
    cards: [
      {
        number: "01",
        tag: "any",
        title: "1. any (Safety Off)",
        description:
          "TypeScript stops checking. You can call any method, even if it crashes at runtime.",
        codeSnippet:
          "let data: any = 42;\n// TypeScript does not stop this crash:\ndata.toUpperCase(); // Runtime TypeError!",
        color: "rose",
      },
      {
        number: "02",
        tag: "unknown",
        title: "2. unknown (Safety On)",
        description:
          "Accepts anything, but you must check the type before accessing methods.",
        codeSnippet:
          "let data: unknown = 'hello';\n// data.toUpperCase(); // Error: must check first!\nif (typeof data === 'string') data.toUpperCase(); // Safe!",
        color: "purple",
      },
      {
        number: "03",
        tag: "never",
        title: "3. never (Impossible)",
        description:
          "Represents code paths that never finish or values that can never happen.",
        codeSnippet:
          "function throwError(msg: string): never {\n  throw new Error(msg); // Never returns!\n}",
        color: "emerald",
      },
    ],
    rule: {
      title: "The unknown vs any Rule",
      content:
        "Whenever you don't know what type an incoming value will be, always use 'unknown' instead of 'any' so TypeScript protects you from accidental crashes.",
    },
  },
  part3: {
    title: "Why and When to Use Each Type",
    intro:
      "Practical situations where each special type belongs in your code:",
    points: [
      {
        title: "1. Use unknown for External Data",
        content:
          "When parsing JSON from an API or reading third-party inputs, type the result as unknown and verify it before using it.",
        codeSnippet:
          "function parseInput(raw: unknown) {\n  if (typeof raw === 'string') return raw.trim();\n  return '';\n}",
      },
      {
        title: "2. Use void for Action Functions",
        content:
          "Functions that perform an action (like logging, sending an event, or modifying external state) return void.",
        codeSnippet:
          "function logMessage(msg: string): void {\n  console.log(`[LOG]: ${msg}`);\n}",
      },
      {
        title: "3. Use never for Exhaustive Checks",
        content:
          "Assign unhandled switch cases to a never variable so TypeScript warns you if you forget a case.",
        codeSnippet:
          "function assertUnreachable(x: never): never {\n  throw new Error(`Unhandled case: ${x}`);\n}",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Using any to Silence Compiler Errors",
    bad: {
      title: "❌ Using any to Quickly Make Red Squiggly Errors Disappear",
      code:
        "function handleResponse(res: any) {\n  // Disables all autocomplete and type safety:\n  return res.data.user.profile.name;\n}",
      explanation:
        "Using 'any' hides the error in your editor, but moves the crash into your production app.",
    },
    good: {
      title: "✅ Use unknown and Narrow the Value Safely",
      code:
        "function handleResponse(res: unknown) {\n  if (typeof res === 'object' && res !== null && 'data' in res) {\n    return (res as { data: { user: { name: string } } }).data.user.name;\n  }\n  return 'Anonymous';\n}",
      explanation:
        "Checking or typing the shape ensures the application never crashes on unexpected payloads.",
    },
    whyItMatters:
      "Every 'any' in your codebase is a hole in your safety net. Using 'unknown' keeps your code resilient.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Test how any, unknown, and void behave in the live sandbox:",
    starterCode:
      "// TS-05: Special Types\nfunction safePrint(val: unknown): void {\n  if (typeof val === \"string\") {\n    console.log(`Text: ${val.toUpperCase()}`);\n  } else if (typeof val === \"number\") {\n    console.log(`Number: ${val.toFixed(2)}`);\n  } else {\n    console.log(`Other: ${String(val)}`);\n  }\n}\n\nsafePrint(\"learncraft\");\nsafePrint(99.456);\nsafePrint(true);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "What is the key difference between `any` and `unknown` in TypeScript?",
      options: [
        "`any` accepts only primitives, while `unknown` accepts only objects.",
        "`any` disables type checking and allows calling any method; `unknown` requires narrowing before accessing properties or methods.",
        "`unknown` is erased at compile time, while `any` runs in the browser.",
        "`any` can only be used inside functions, while `unknown` is global.",
      ],
      correctIndex: 1,
      explanation:
        "Both `any` and `unknown` accept any value. However, `any` turns off all type safety, while `unknown` forces you to perform a type check before you can use the value.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "unknown Over any",
        desc: "Always choose unknown for untrusted data; never use any as a shortcut.",
      },
      {
        title: "void for No Return",
        desc: "Functions that return nothing have return type void.",
      },
      {
        title: "never for Impossible",
        desc: "Code that throws errors or branches that should never be reached have type never.",
      },
    ],
    nextLessonPreview: {
      title: "TS-06: Function Types and Signatures",
      desc: "Learn parameter annotations, optional parameters, and function type signatures in simple, easy words.",
    },
  },
};
