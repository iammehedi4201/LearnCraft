import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts28AssertionsVsSatisfiesContent: StandardLessonContent = {
  slug: "ts28-assertions-vs-satisfies",
  code: "TS-28",
  title: "Type Assertions Versus satisfies",
  subtitle: "Master the difference between unsafe 'as Type' assertions and the modern 'satisfies' operator to validate shapes without losing exact literal types.",
  sections: [
    {
      id: "part1",
      label: "Assertions vs satisfies",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "as vs satisfies Rules",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Why satisfies Wins",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Double Assertion Trap",
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
    title: "Type Assertions Versus satisfies",
    bigPicture:
      "`as Type` tells the compiler to shut up and trust you, which can hide dangerous runtime bugs. `satisfies Type` checks that your object meets the type requirements without losing its exact literal types.",
    breakdownTitle: "Three Validation Methods",
    breakdownItems: [
      {
        title: "Type Assertion (val as Type)",
        desc: "Overrides TypeScript's check. Dangerous because it allows missing or invalid properties.",
      },
      {
        title: "satisfies Operator (val satisfies Type)",
        desc: "Validates against the type contract while keeping exact, specific inferred literal types.",
      },
      {
        title: "Type Annotation (const val: Type)",
        desc: "Checks the contract but widens specific literals into broad types (like 'red' into string).",
      },
    ],
  },
  part2: {
    title: "How as and satisfies Differ",
    intro:
      "Observe the critical differences in type retention across all three approaches:",
    cards: [
      {
        number: "01",
        tag: "Annotation",
        title: "1. Annotation: Widens Types",
        description:
          "Enforces the shape, but widens specific values (e.g. RGB array vs hex string).",
        codeSnippet:
          "type Colors = Record<string, string | number[]>;\nconst palette: Colors = { red: '#ff0000', blue: [0, 0, 255] };\n// palette.red.toUpperCase(); // Error: Property does not exist on number[]!",
        color: "purple",
      },
      {
        number: "02",
        tag: "Assertion (as)",
        title: "2. Assertion: Silences Errors",
        description:
          "Forces compatibility. Fails to warn if required properties are omitted.",
        codeSnippet:
          "interface Config { port: number; host: string }\nconst c = { port: 8080 } as Config; // Danger! Missing host is silently allowed",
        color: "rose",
      },
      {
        number: "03",
        tag: "satisfies",
        title: "3. satisfies: The Best of Both",
        description:
          "Validates against the contract, but remembers palette.red is a string!",
        codeSnippet:
          "const palette = {\n  red: '#ff0000',\n  blue: [0, 0, 255],\n} satisfies Record<string, string | number[]>;\nconsole.log(palette.red.toUpperCase()); // Safe! Inferred as string!",
        color: "emerald",
      },
    ],
    rule: {
      title: "The satisfies Golden Rule",
      content:
        "Whenever you want to validate that an object literal conforms to a type without losing its specific literal properties or widening unions, use 'satisfies'. Never use 'as' to silence errors.",
    },
  },
  part3: {
    title: "Step-by-Step: Why satisfies Prevents Bugs",
    intro:
      "Explore how satisfies catches typos while maintaining exact property autocomplete:",
    points: [
      {
        title: "1. Catches Misspelled Properties",
        content:
          "If your object literal contains an invalid key or wrong type, satisfies flags it immediately.",
        codeSnippet:
          "type NavRoute = { path: string; label: string };\n// Error: 'labell' does not exist on NavRoute:\n// const route = { path: '/home', labell: 'Home' } satisfies NavRoute;",
      },
      {
        title: "2. Preserves Exact Literal Keys",
        content:
          "Unlike `Record<string, ...>`, satisfies remembers the exact keys you defined: 'red', 'green', 'blue'.",
        codeSnippet:
          "const theme = {\n  primary: '#6366f1',\n  secondary: '#10b981',\n} satisfies Record<string, string>;\n// theme.primary is known; theme.nonExistent triggers an error!",
      },
      {
        title: "3. Auditing AI-Generated Assertions",
        content:
          "When AI suggests `const data = res as SomeType;`, replace it with `satisfies` or a custom guard to verify safety.",
        codeSnippet:
          "// AI suggestion: const cfg = raw as Config;\n// Safer replacement: write a type guard or validate with satisfies",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Double Assertions (as unknown as T)",
    bad: {
      title: "❌ The 'as unknown as Type' Sledgehammer",
      code:
        "interface User { id: number; name: string }\nconst bogus = 'completely wrong data';\n\n// Double assertion forces TypeScript to accept anything:\nconst fakeUser = bogus as unknown as User;\n// Crashes at runtime when accessing fakeUser.id!",
      explanation:
        "Double casting with `as unknown as Type` turns off all compiler sanity checks. It is an extreme code smell that almost always causes runtime crashes.",
    },
    good: {
      title: "✅ Use satisfies or Runtime Schema Validation",
      code:
        "interface User { id: number; name: string }\n\nconst validUser = {\n  id: 101,\n  name: 'Alex Vance',\n} satisfies User;\n\nconsole.log(validUser.name.toUpperCase());\n// Output: ALEX VANCE",
      explanation:
        "satisfies proves that the object matches the interface at compile time without forcing or lying to the compiler.",
    },
    whyItMatters:
      "Interviewers frequently ask candidates to explain the differences between type annotations, type assertions, and satisfies. Knowing why satisfies was added in TS 4.9 proves up-to-date expertise.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Compare type annotations and the satisfies operator in the live playground:",
    starterCode:
      "// TS-28: Type Assertions vs satisfies\ntype ColorPalette = Record<string, string | [number, number, number]>;\n\nconst theme = {\n  brand: \"#6366f1\",\n  accent: [16, 185, 129],\n  white: \"#ffffff\",\n} satisfies ColorPalette;\n\n// Because we used satisfies, TypeScript knows theme.brand is a string:\nconsole.log(`Brand Upper: ${theme.brand.toUpperCase()}`);\n\n// And TypeScript knows theme.accent is a tuple of numbers:\nconsole.log(`Accent RGB: rgb(${theme.accent.join(\", \")})`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Why is `const x = { ... } satisfies Type` safer and more precise than `const x: Type = { ... }`?",
      options: [
        "satisfies converts the code into JavaScript private fields.",
        "satisfies validates that the object conforms to `Type`, but preserves the exact, narrow inferred types of each property rather than widening them.",
        "satisfies automatically encrypts data in memory.",
        "satisfies allows properties to be omitted without error.",
      ],
      correctIndex: 1,
      explanation:
        "While both validate that the value matches the type, a type annotation (`: Type`) widens properties to the broader declared type (e.g. `string | number[]`). In contrast, `satisfies` validates conformance while retaining the specific, narrower literal type of each property.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Avoid 'as' Assertions",
        desc: "Type assertions bypass compiler checking and mask runtime crashes. Treat 'as' with extreme caution.",
      },
      {
        title: "Embrace satisfies",
        desc: "Use satisfies to validate that object literals conform to a contract without widening or losing literal types.",
      },
      {
        title: "Audit AI Suggestions",
        desc: "AI coding assistants frequently reach for 'as any' or unsafe assertions; replace them with guards or satisfies.",
      },
    ],
    nextLessonPreview: {
      title: "TS-29: Handling Errors with unknown",
      desc: "Learn why catch errors are typed as unknown in strict mode and how to write custom error narrowing guards.",
    },
  },
};
