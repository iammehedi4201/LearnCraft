import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts26TsconfigStrictModeContent: StandardLessonContent = {
  slug: "ts26-tsconfig-strict-mode",
  code: "TS-26",
  title: "Configuring tsconfig and Strict Mode",
  subtitle: "Master essential compiler options: target, module, strict, and understand why strictNullChecks and noImplicitAny are non-negotiable in production.",
  sections: [
    {
      id: "part1",
      label: "tsconfig & Strict Mode",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Key Compiler Options",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "strictNullChecks",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Disabling Strict Mode",
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
    title: "Configuring tsconfig and Strict Mode",
    bigPicture:
      "The 'tsconfig.json' file configures the TypeScript compiler. Setting 'strict: true' is the golden rule—it prevents silent null bugs, forbids untyped variables (noImplicitAny), and guarantees maximum type safety.",
    breakdownTitle: "Three Key Compiler Flags",
    breakdownItems: [
      {
        title: "strict: true",
        desc: "The master switch that turns on all safety flags at once.",
      },
      {
        title: "strictNullChecks",
        desc: "Forbids assigning null or undefined to ordinary variables without explicit union handling.",
      },
      {
        title: "noImplicitAny",
        desc: "Requires explicit types when TypeScript cannot safely infer them automatically.",
      },
    ],
  },
  part2: {
    title: "Essential tsconfig Compiler Options",
    intro:
      "Examine the core compiler flags every TypeScript engineer should know:",
    cards: [
      {
        number: "01",
        tag: "strictNullChecks",
        title: "1. strictNullChecks",
        description:
          "null and undefined must be handled explicitly. Eliminates 'cannot read property of undefined' crashes.",
        codeSnippet:
          "let name: string = 'Alex';\n// name = null; // Error: Type 'null' is not assignable to type 'string'\nlet nullableName: string | null = null; // Explicit!",
        color: "purple",
      },
      {
        number: "02",
        tag: "noImplicitAny",
        title: "2. noImplicitAny",
        description:
          "Flags any variable or parameter where TypeScript cannot infer a type and would otherwise fall back to any.",
        codeSnippet:
          "// Error: Parameter 'x' implicitly has an 'any' type:\n// function double(x) { return x * 2; }\nfunction double(x: number) { return x * 2; }",
        color: "rose",
      },
      {
        number: "03",
        tag: "target & module",
        title: "3. target & module",
        description:
          "target decides what syntax is downleveled; module decides how import/export statements are formatted.",
        codeSnippet:
          "// target: 'ES2022' preserves async/await and private fields natively\n// module: 'NodeNext' or 'ESNext' supports native ES modules",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Strict Mode Golden Rule",
      content:
        "Always set 'strict: true' when starting any new project. It is 10 times harder to migrate a non-strict codebase to strict mode later than it is to start strict from day one.",
    },
  },
  part3: {
    title: "Strict Null Checks in Practice",
    intro:
      "Understand why strictNullChecks is considered TypeScript's greatest feature:",
    points: [
      {
        title: "1. The Non-Strict Danger",
        content:
          "In non-strict TypeScript (or standard JavaScript), null and undefined can be assigned to anything. A variable typed as string could secretly be null!",
        codeSnippet:
          "// Without strictNullChecks: TS allows this silent bug!\n// let s: string = null;\n// s.toUpperCase(); // Crashes in production with TypeError!",
      },
      {
        title: "2. The Strict Safety Net",
        content:
          "With strictNullChecks enabled, if something can be null, its type MUST say `string | null`. The compiler forces you to check before calling methods.",
        codeSnippet:
          "let s: string | null = null;\n// s.toUpperCase(); // Error: Object is possibly 'null'\nif (s !== null) console.log(s.toUpperCase()); // Safe!",
      },
      {
        title: "3. Catch Clause unknown Safety",
        content:
          "Strict mode sets `useUnknownInCatchVariables: true`, ensuring error catch blocks are typed as unknown instead of unsafe any.",
        codeSnippet:
          "try { ... } catch (err: unknown) {\n  if (err instanceof Error) console.error(err.message);\n}",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Turning Off Strict Mode",
    bad: {
      title: "❌ Setting strict: false to Avoid Initial Type Errors",
      code:
        "// In tsconfig.json:\n// \"strict\": false\n\n// Result: Sneaky 'any' and unhandled 'undefined' slip into your app,\n// converting TypeScript into a glorified linter that misses runtime crashes.",
      explanation:
        "Disabling strict mode turns off strictNullChecks and noImplicitAny. It removes compiler warnings in the short term, but re-introduces the exact runtime crashes TypeScript was adopted to eliminate.",
    },
    good: {
      title: "✅ Embrace strict: true from Day One",
      code:
        "// In tsconfig.json:\n{\n  \"compilerOptions\": {\n    \"strict\": true,\n    \"noUncheckedIndexedAccess\": true,\n    \"skipLibCheck\": true\n  }\n}",
      explanation:
        "Strict mode ensures you catch null pointers and missing parameters inside your editor before writing tests or deploying to production.",
    },
    whyItMatters:
      "Every serious TypeScript engineering interview includes questions about tsconfig and strictNullChecks. Stating that you always use strict mode signals production readiness.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Practice navigating strict null checks in the live code editor:",
    starterCode:
      "// TS-26: Strict Mode and Null Safety\ninterface UserSettings {\n  theme: \"dark\" | \"light\";\n  customAvatarUrl: string | null;\n}\n\nfunction getAvatarDisplay(settings: UserSettings): string {\n  // In strict mode, customAvatarUrl cannot be used directly without null check:\n  if (settings.customAvatarUrl !== null) {\n    return `Custom: ${settings.customAvatarUrl}`;\n  }\n  return \"Default: /avatars/guest.png\";\n}\n\nconst user1: UserSettings = { theme: \"dark\", customAvatarUrl: null };\nconst user2: UserSettings = { theme: \"light\", customAvatarUrl: \"https://cdn.example.com/pic.png\" };\n\nconsole.log(getAvatarDisplay(user1));\nconsole.log(getAvatarDisplay(user2));\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "What is the single most critical safety flag enabled when setting `\"strict\": true` in tsconfig.json?",
      options: [
        "`\"removeComments\"`",
        "`\"strictNullChecks\"`, which prevents `null` and `undefined` from silently being assigned to other types.",
        "`\"allowJs\"`",
        "`\"sourceMap\"`",
      ],
      correctIndex: 1,
      explanation:
        "`strictNullChecks` prevents `null` and `undefined` from being assignable to all types. It forces developers to handle possible null and undefined values explicitly, eliminating 'cannot read property of undefined' runtime crashes.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Always strict: true",
        desc: "Enable strict mode on all projects to activate strictNullChecks, noImplicitAny, and function type safety.",
      },
      {
        title: "strictNullChecks",
        desc: "null and undefined become distinct types; they must be guarded or explicitly declared with unions.",
      },
      {
        title: "target & module",
        desc: "Set target to modern ES versions (like ES2022) to avoid unnecessary downleveling of native JavaScript features.",
      },
    ],
    nextLessonPreview: {
      title: "TS-27: Declaration Files and Type Erasure",
      desc: "Learn ambient declarations (.d.ts), @types packages, and understanding that types disappear completely at runtime.",
    },
  },
};
