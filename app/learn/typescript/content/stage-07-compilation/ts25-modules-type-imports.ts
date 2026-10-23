import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts25ModulesTypeImportsContent: StandardLessonContent = {
  slug: "ts25-modules-type-imports",
  code: "TS-25",
  title: "Using Type-Only Imports",
  subtitle: "Master import type and export type to prevent circular dependencies, eliminate bundling side-effects, and satisfy isolatedModules.",
  sections: [
    {
      id: "part1",
      label: "Type-Only Imports",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "import type Syntax",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Bundler Safety & Tree-Shaking",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Circular Runtime Imports",
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
    title: "Using Type-Only Imports",
    bigPicture:
      "Use 'import type' when importing interfaces, types, or signatures. It tells the compiler to completely erase the import so it never adds bytes or causes circular runtime crashes in your JavaScript bundle.",
    breakdownTitle: "Three Key Benefits",
    breakdownItems: [
      {
        title: "100% Erased at Build Time",
        desc: "Ensures the import leaves zero footprint in the final JavaScript bundle.",
      },
      {
        title: "No Circular Import Bugs",
        desc: "Two files can safely import types from each other without causing runtime crashes.",
      },
      {
        title: "Bundler Friendly",
        desc: "Works cleanly with single-file bundlers like Vite, esbuild, and Next.js.",
      },
    ],
  },
  part2: {
    title: "How Type-Only Imports Work",
    intro:
      "Explore the two ways to write type-only imports and exports in modern TypeScript:",
    cards: [
      {
        number: "01",
        tag: "Whole-Import",
        title: "1. Full Statement: import type",
        description:
          "Marks the entire import statement as type-only. None of its symbols can be used as runtime values.",
        codeSnippet:
          "import type { UserProfile, AccountTier } from './types';\n// const u = new UserProfile(); // Error: 'UserProfile' cannot be used as a value",
        color: "purple",
      },
      {
        number: "02",
        tag: "Inline",
        title: "2. Inline Type Modifiers",
        description:
          "Mix values and types in a single statement by prefixing individual specifiers with 'type'.",
        codeSnippet:
          "import { createUser, type User } from './user-service';\n// createUser is a runtime function; User is erased!",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Re-export",
        title: "3. Type Re-exports",
        description:
          "Export types cleanly from barrel files (index.ts) using 'export type'.",
        codeSnippet:
          "export type { User, Product } from './models';\nexport { authService } from './auth';",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Type Import Rule",
      content:
        "Whenever importing an interface or type alias that is only used in type positions, use 'import type'. In tsconfig.json, enable 'verbatimModuleSyntax' to enforce this automatically.",
    },
  },
  part3: {
    title: "Why Bundlers Need Type-Only Imports",
    intro:
      "Understand why modern build tools require unambiguous type imports:",
    points: [
      {
        title: "1. The Single-File Transpiler Problem",
        content:
          "Tools like esbuild and swc process one file at a time without loading other files. When they see `import { Car } from './car'`, they cannot know if Car is a class or an interface.",
        codeSnippet:
          "// Without 'type', esbuild doesn't know if Car emits JS code or vanishes",
      },
      {
        title: "2. The 'import type' Clarity",
        content:
          "Prefixing with `type` eliminates the ambiguity: the transpiler strips the import statement completely.",
        codeSnippet:
          "import type { Car } from './car'; // Transpiler strips this 100% instantly",
      },
      {
        title: "3. Zero Side-Effect Execution",
        content:
          "Standard imports can trigger top-level side effects (like running analytics or registering globals). Type imports guarantee no code executes.",
        codeSnippet:
          "// Will never execute code inside './heavy-module' at runtime:\nimport type { HeavyData } from './heavy-module';",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Circular Runtime Imports via Types",
    bad: {
      title: "❌ Using Standard Imports for Mutually Dependent Types",
      code:
        "// In user.ts:\nimport { Order } from './order'; // Standard import\nexport interface User { orders: Order[] }\n\n// In order.ts:\nimport { User } from './user';   // Standard import\nexport interface Order { customer: User }\n\n// At runtime: Bundler crashes with circular module initialization error!",
      explanation:
        "Standard imports make the bundler believe user.js and order.js must both initialize before each other at runtime, resulting in undefined exports.",
    },
    good: {
      title: "✅ Use 'import type' to Break the Runtime Dependency Cycle",
      code:
        "// In user.ts:\nimport type { Order } from './order'; // Type only!\nexport interface User { orders: Order[] }\n\n// In order.ts:\nimport type { User } from './user';   // Type only!\nexport interface Order { customer: User }",
      explanation:
        "Because both imports are erased completely during compilation, no runtime dependency exists between the compiled JavaScript files.",
    },
    whyItMatters:
      "Circular dependency bugs are notoriously hard to debug. Using 'import type' eliminates circular type dependencies permanently.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Test type contracts and module exports in the live playground:",
    starterCode:
      "// TS-25: Modules and Type-Only Imports\ninterface UserToken {\n  userId: string;\n  token: string;\n  expires: number;\n}\n\nfunction verifyToken(token: UserToken): boolean {\n  return token.expires > Date.now();\n}\n\nconst sampleToken: UserToken = {\n  userId: \"usr_88\",\n  token: \"abc_123_xyz\",\n  expires: Date.now() + 100000,\n};\n\nconsole.log(`Token valid: ${verifyToken(sampleToken)}`);\nconsole.log(`User: ${sampleToken.userId}`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "What is the primary technical benefit of using `import type { User } from './user'` instead of `import { User } from './user'`?",
      options: [
        "It speeds up browser network downloads of the TypeScript file.",
        "It guarantees the import is completely erased upon compilation, preventing circular dependency cycles and unwanted runtime module execution.",
        "It converts User into a global variable.",
        "It makes User accessible to other programming languages.",
      ],
      correctIndex: 1,
      explanation:
        "`import type` explicitly tells the compiler and bundlers that the import is strictly for type analysis. It is guaranteed to be completely erased from the compiled JavaScript, eliminating runtime side-effects and circular dependency crashes.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Guaranteed Erasure",
        desc: "import type guarantees that imported symbols leave zero trace in the emitted production JavaScript.",
      },
      {
        title: "Break Circular Loops",
        desc: "Use import type whenever two files need to reference each other's data contracts.",
      },
      {
        title: "Inline Type Modifiers",
        desc: "Mix values and types cleanly in a single import statement: import { func, type Model } from './module'.",
      },
    ],
    nextLessonPreview: {
      title: "TS-26: Configuring tsconfig and Strict Mode",
      desc: "Learn essential compiler options: target, module, strict, noImplicitAny, and why strictNullChecks is non-negotiable.",
    },
  },
};
