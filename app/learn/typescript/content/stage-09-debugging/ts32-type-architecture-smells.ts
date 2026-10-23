import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts32TypeArchitectureSmellsContent: StandardLessonContent = {
  slug: "ts32-type-architecture-smells",
  code: "TS-32",
  title: "Clean Type Architecture and Smells",
  subtitle: "Identify type code smells, audit AI-generated TypeScript, avoid over-engineering, and master senior technical interview principles.",
  sections: [
    {
      id: "part1",
      label: "Clean Type Architecture",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Top Type Smells",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Auditing AI Code",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Over-Engineering Trap",
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
    title: "Clean Type Architecture and Smells",
    bigPicture:
      "Good types make code easy to read and refactor; bad types make it confusing. Watch out for 'type smells' like using `any`, overusing `as Type` assertions, or creating overly complicated 5-layer generic puzzles.",
    breakdownTitle: "Four Principles of Clean Architecture",
    breakdownItems: [
      {
        title: "Self-Documenting Models",
        desc: "Design clear interfaces that reflect real domain entities instead of cryptic puzzles.",
      },
      {
        title: "Zero 'any' Leakage",
        desc: "Never let `any` into public functions—it silently disables safety for the entire codebase.",
      },
      {
        title: "Audit AI Suggestions",
        desc: "AI often suggests `as any` to silence errors. Replace assertions with real guards.",
      },
      {
        title: "Simplicity First",
        desc: "Write types that human teammates and AI assistants can immediately read and maintain.",
      },
    ],
  },
  part2: {
    title: "Recognizing Common Type Smells",
    intro:
      "Recognize the three architectural anti-patterns that plague modern TypeScript projects:",
    cards: [
      {
        number: "01",
        tag: "Smell 1",
        title: "1. any-Leakage",
        description:
          "A single 'any' on an API fetcher silently turns off type-checking across 20 downstream components.",
        codeSnippet:
          "// Bad: function getRaw(): any;\n// Good: function getRaw(): unknown; // Forces verification",
        color: "rose",
      },
      {
        number: "02",
        tag: "Smell 2",
        title: "2. Assertion Addiction",
        description:
          "Sprinkling 'as User' everywhere instead of writing runtime guards or type predicates.",
        codeSnippet:
          "// Bad: const u = data as User;\n// Good: if (isUser(data)) { ... }",
        color: "amber",
      },
      {
        number: "03",
        tag: "Smell 3",
        title: "3. Optional Soup",
        description:
          "Modeling asynchronous state with giant objects of optional fields instead of discriminated unions.",
        codeSnippet:
          "// Bad: { loading?: boolean, error?: string, data?: User }\n// Good: Tagged unions with shared 'status' tag",
        color: "emerald",
      },
    ],
    rule: {
      title: "The AI Code Review Rule",
      content:
        "When reviewing AI-generated TypeScript, always check for: (1) unnecessary 'as' assertions, (2) missing strict null checks, and (3) over-complicated generic abstractions.",
    },
  },
  part3: {
    title: "Auditing AI-Generated TypeScript Code",
    intro:
      "Master the five core TypeScript questions asked in modern technical interviews:",
    points: [
      {
        title: "1. Type Erasure & Zero Runtime Cost",
        content:
          "Interview Q: 'What is the performance cost of TypeScript types in production?' Answer: 'Exactly zero. All types, interfaces, and type annotations are completely stripped out upon compilation into pure JavaScript.'",
        codeSnippet:
          "// Types disappear completely during build. Production runs native V8 JS.",
      },
      {
        title: "2. Structural Typing (Duck Typing)",
        content:
          "Interview Q: 'How does TypeScript determine if two types are compatible?' Answer: 'TypeScript uses structural subtyping: if an object has all required properties of a target shape, it is compatible, regardless of its declared name.'",
        codeSnippet:
          "interface Point { x: number; y: number }\nconst p = { x: 1, y: 2, z: 3 };\nconst pt: Point = p; // Valid! Structural subtyping allows extra fields via variables",
      },
      {
        title: "3. unknown vs any",
        content:
          "Interview Q: 'Why should you prefer unknown over any?' Answer: 'Both accept any value, but unknown forces type narrowing before usage, while any completely disables the type checker.'",
        codeSnippet:
          "const raw: unknown = 'hello';\nif (typeof raw === 'string') console.log(raw.toUpperCase()); // Safe!",
      },
      {
        title: "4. Discriminated Unions & Impossible States",
        content:
          "Interview Q: 'How do you eliminate impossible states in TypeScript?' Answer: 'Using discriminated unions with a shared literal tag (e.g. status), ensuring only valid combinations can compile.'",
        codeSnippet:
          "type State = { status: 'loading' } | { status: 'success'; data: User };",
      },
      {
        title: "5. satisfies vs as Assertions",
        content:
          "Interview Q: 'What is the difference between satisfies and as?' Answer: 'as forces the compiler to accept a type blindly; satisfies validates that an expression conforms to a contract without widening or losing its exact literal types.'",
        codeSnippet:
          "const theme = { brand: '#6366f1' } satisfies Record<string, string>;",
      },
    ],
  },
  part4: {
    title: "Common Anti-Pattern: Over-Engineering Types",
    bad: {
      title: "❌ Writing Inscrutable Type Puzzles for Simple Problems",
      code:
        "// Over-engineered nightmare: 5-level nested conditional mapped type\ntype DeepExtractNestedKeys<T> =\n  T extends object ? {\n    [K in keyof T]: T[K] extends Function ? never : K extends `_${string}` ? never : T[K]\n  }[keyof T] : never;",
      explanation:
        "Clever meta-programming types that take 15 minutes to decipher slow your team down, hurt compiler performance, and produce incomprehensible error traces.",
    },
    good: {
      title: "✅ Write Simple, Readable Types that Serve the Code",
      code:
        "// Clear, self-documenting interface:\ninterface UserProfile {\n  id: string;\n  name: string;\n  email: string;\n  role: 'admin' | 'member';\n}\n\n// Clear, predictable DTO:\ntype UpdateUserDTO = Partial<Pick<UserProfile, 'name' | 'role'>>;",
      explanation:
        "Clean type architecture favors clarity over cleverness. Straightforward interfaces and standard utility types keep code maintainable.",
    },
    whyItMatters:
      "A great software engineer uses TypeScript to ship reliable products faster, not to build academic type-level puzzles.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Review healthy domain modeling and clean type composition in the final sandbox:",
    starterCode:
      "// TS-32: Clean Type Architecture & Best Practices\ninterface BaseEntity {\n  readonly id: string;\n  createdAt: number;\n}\n\ninterface UserAccount extends BaseEntity {\n  username: string;\n  email: string;\n  role: \"admin\" | \"member\";\n}\n\ntype UserUpdatePayload = Partial<Pick<UserAccount, \"username\" | \"role\">>;\n\nconst user: UserAccount = {\n  id: \"usr_1001\",\n  username: \"alex_dev\",\n  email: \"alex@learncraft.com\",\n  role: \"admin\",\n  createdAt: Date.now(),\n};\n\nconst update: UserUpdatePayload = { role: \"member\" };\n\nconsole.log(`User: ${user.username} (${user.role})`);\nconsole.log(`Update pending for role: ${update.role}`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Which of the following is considered the #1 indicator of clean, production-grade TypeScript architecture?",
      options: [
        "Writing 5-level nested conditional types for every domain entity.",
        "Clear, self-documenting interfaces, zero 'any' leakage, and using discriminated unions to eliminate impossible application states.",
        "Using 'as any' whenever compiler errors occur.",
        "Disabling strict mode in tsconfig.json.",
      ],
      correctIndex: 1,
      explanation:
        "Clean type architecture focuses on making applications easier to build, understand, and refactor. Clear interfaces, zero 'any' leakage, and discriminated unions keep code maintainable, self-documenting, and bug-free.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Pragmatic Types",
        desc: "Types exist to serve the software and developers. Prioritize readability and simplicity over cleverness.",
      },
      {
        title: "Audit AI Code",
        desc: "Watch for AI hallucinations: replace 'as any' with unknown, and ensure strict null checks are respected.",
      },
      {
        title: "Ready for Production",
        desc: "You now possess the foundational mental models, type safety skills, and architectural knowledge to build world-class TypeScript applications.",
      },
    ],
    nextLessonPreview: {
      title: "Capstone: Type-Safe In-Memory Query Engine",
      desc: "Apply your complete TypeScript mastery: generic stores, schema inference, discriminated union events, and zero-dependency type-safe query builders.",
    },
  },
};
