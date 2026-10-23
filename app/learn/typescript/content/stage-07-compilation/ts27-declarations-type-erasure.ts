import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts27DeclarationsTypeErasureContent: StandardLessonContent = {
  slug: "ts27-declarations-type-erasure",
  code: "TS-27",
  title: "Declaration Files and Type Erasure",
  subtitle: "Master ambient declaration files (.d.ts), @types packages, and internalize why types leave zero runtime footprint in JavaScript bundles.",
  sections: [
    {
      id: "part1",
      label: "Declarations & Type Erasure",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: ".d.ts & @types",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Type Erasure in Bundles",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Runtime Interface Trap",
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
    title: "Declaration Files and Type Erasure",
    bigPicture:
      "Declaration files (`.d.ts`) provide type definitions for plain JavaScript libraries without running any code. The `declare` keyword tells TypeScript that a variable or library exists at runtime (e.g. from a script tag or `@types/` package).",
    breakdownTitle: "Three Core Concepts",
    breakdownItems: [
      {
        title: ".d.ts Files",
        desc: "Files containing only types and signatures, never compiled into JavaScript output.",
      },
      {
        title: "@types/ Packages",
        desc: "Community type definitions (DefinitelyTyped) for JavaScript libraries like Express or Lodash.",
      },
      {
        title: "The declare Keyword",
        desc: "Informs TypeScript that a global variable or function exists at runtime (like window.ENV).",
      },
    ],
  },
  part2: {
    title: "How Declaration Files (.d.ts) Work",
    intro:
      "Examine how ambient declarations provide type coverage for external assets and libraries:",
    cards: [
      {
        number: "01",
        tag: "declare module",
        title: "1. Asset Declarations",
        description:
          "Allows importing non-code files like CSS modules, SVG icons, and PNG images without compiler errors.",
        codeSnippet:
          "// In globals.d.ts:\ndeclare module '*.css';\ndeclare module '*.svg' {\n  const content: string;\n  export default content;\n}",
        color: "purple",
      },
      {
        number: "02",
        tag: "@types",
        title: "2. @types Packages",
        description:
          "Installed as devDependencies (npm i -D @types/node) to supply type definitions for vanilla JS libraries.",
        codeSnippet:
          "// npm i -D @types/node\nimport { readFileSync } from 'fs';\n// Full autocomplete for Node.js standard library!",
        color: "cyan",
      },
      {
        number: "03",
        tag: "declare global",
        title: "3. Ambient Globals",
        description:
          "Declares environment variables, third-party analytics scripts, or injected browser extensions.",
        codeSnippet:
          "declare const __API_URL__: string;\ndeclare global {\n  interface Window { gtag: (...args: any[]) => void; }\n}",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Type Erasure Rule",
      content:
        "Interfaces, type aliases, and .d.ts files exist only in the compiler. You can NEVER use them with runtime operators like 'instanceof', 'typeof', or inspect them in console.log.",
    },
  },
  part3: {
    title: "Understanding Type Erasure at Build Time",
    intro:
      "Understand why types cannot be accessed or inspected during runtime execution:",
    points: [
      {
        title: "1. Zero Runtime Footprint",
        content:
          "When you run `tsc`, every interface, type alias, and generic parameter is stripped away. The generated JavaScript does not contain a single trace of your types.",
        codeSnippet:
          "// In TypeScript: interface User { id: number }\n// In Compiled JavaScript: (Completely empty! 0 bytes generated)",
      },
      {
        title: "2. Why instanceof Fails on Interfaces",
        content:
          "`instanceof` is a JavaScript runtime operator that checks object prototype chains. Because interfaces do not exist in JavaScript, `x instanceof UserInterface` is a fatal syntax error.",
        codeSnippet:
          "interface Vehicle { wheels: number }\n// Error: 'Vehicle' only refers to a type, but is being used as a value here:\n// if (car instanceof Vehicle) { ... }",
      },
      {
        title: "3. Use Classes When instanceof is Needed",
        content:
          "Classes exist at runtime as real constructor functions, so `x instanceof MyClass` works perfectly at runtime.",
        codeSnippet:
          "class Vehicle { constructor(public wheels: number) {} }\nconst v = new Vehicle(4);\nif (v instanceof Vehicle) console.log('Valid vehicle!');",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Expecting Types to Exist at Runtime",
    bad: {
      title: "❌ Checking Type Names with typeof or instanceof",
      code:
        "interface User { id: number; name: string }\n\nfunction validate(data: unknown) {\n  // Error: 'User' only refers to a type, but is being used as a value:\n  // if (typeof data === 'User') { ... }\n  // if (data instanceof User) { ... }\n}",
      explanation:
        "Because interfaces vanish upon compilation, JavaScript runtime operators cannot inspect them.",
    },
    good: {
      title: "✅ Use Custom Type Predicates or Classes for Runtime Checks",
      code:
        "interface User { id: number; name: string }\n\nfunction isUser(data: unknown): data is User {\n  return typeof data === 'object' && data !== null && 'id' in data;\n}\nconst u = { id: 101, name: 'Alex' };\nif (isUser(u)) console.log(u.name.toUpperCase());\n// Output: ALEX",
      explanation:
        "Pair compile-time interfaces with runtime type predicates or schema libraries (Zod) to validate live data.",
    },
    whyItMatters:
      "Understanding type erasure prevents catastrophic misunderstandings about how TypeScript interacts with live browsers, servers, and networks.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Experiment with compile-time interfaces and runtime values in the playground:",
    starterCode:
      "// TS-27: Declarations & Type Erasure\ninterface SystemMetrics {\n  uptime: number;\n  activeConnections: number;\n}\n\n// Ambient simulated server metrics:\nconst liveMetrics: SystemMetrics = {\n  uptime: 142099,\n  activeConnections: 42,\n};\n\nconsole.log(`Runtime typeof liveMetrics: ${typeof liveMetrics}`);\nconsole.log(`Uptime: ${liveMetrics.uptime}s`);\nconsole.log(`Connections: ${liveMetrics.activeConnections}`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Why does `data instanceof UserInterface` produce a TypeScript compiler error when `UserInterface` is defined with `interface`?",
      options: [
        "Because instanceof is deprecated in modern JavaScript.",
        "Because interfaces exist purely at compile time and are erased upon build; they do not exist as constructor functions in the JavaScript runtime.",
        "Because interfaces can only be checked using typeof.",
        "Because instanceof only works on strings and numbers.",
      ],
      correctIndex: 1,
      explanation:
        "Under the type erasure principle, interfaces and type aliases are completely stripped out during compilation and do not emit any runtime code. Because `instanceof` is a JavaScript runtime operator that checks constructor prototypes, referencing an interface where a runtime value is expected is an error.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: ".d.ts Declaration Files",
        desc: "Declaration files contain only type contracts with zero implementation, enabling TypeScript for vanilla JavaScript libraries.",
      },
      {
        title: "@types Packages",
        desc: "Install @types/ packages as devDependencies to provide type definitions for npm packages that lack built-in types.",
      },
      {
        title: "Type Erasure Principle",
        desc: "Types and interfaces do not exist in JavaScript bundles; they cannot be inspected with typeof or instanceof.",
      },
    ],
    nextLessonPreview: {
      title: "TS-28: Type Assertions Versus satisfies",
      desc: "Learn why 'as Type' can lie to the compiler and how the modern 'satisfies' operator provides safe, non-widening validation.",
    },
  },
};
