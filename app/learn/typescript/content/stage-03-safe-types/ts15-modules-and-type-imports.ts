import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts15ModulesAndTypeImportsContent: StandardLessonContent = {
  slug: "ts15-modules-and-type-imports",
  code: "TS-15",
  title: "Modules and Type Imports",
  subtitle: "Organize code across files and use import type for type-only dependencies.",
  difficulty: "Moderate",
  scenario: {
    question: "Three files need the same `User` type. Why is importing it from one shared file better than defining it differently in all three files?",
    answer: "All three files use the same definition, so the type stays consistent. If the `User` shape changes, we update it in one place instead of trying to keep several copies in sync.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Modules and Type Imports",
    bigPicture: "Modules let you keep related code in separate files. You can export a type from one file and import it where it is needed instead of copying the same type definition.",
    codeSnippet: "// In types.ts:\nexport type User = {\n  id: number;\n  name: string;\n};\n\n// In greeting.ts:\nimport type { User } from \"./types\";\n\nexport function greet(user: User): string {\n  return `Hello, ${user.name}`;\n}",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "ES Modules",
            "desc": "Using `export` and `import` to share types and functions between files."
      },
      {
            "title": "`import type` Syntax",
            "desc": "Explicitly signals that an import is used only for type checking and should be erased completely from JS output."
      },
      {
            "title": "Single Source of Truth",
            "desc": "Define shared data types once in a shared file (e.g. `types.ts`) and import them everywhere."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Type Imports and Erasure",
      "content": "`import type` shows that `User` is needed for type checking. Exact module rules depend on the project's configuration, so follow the setup already used by the project."
},
    cards: [
      {
        number: "01",
        tag: "CORE PRINCIPLE",
        title: "ES Modules",
        description: "Using `export` and `import` to share types and functions between files.",
        color: "purple",
      },
      {
        number: "02",
        tag: "USAGE RULE",
        title: "`import type` Syntax",
        description: "Explicitly signals that an import is used only for type checking and should be erased completely from JS output.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PRACTICAL VALUE",
        title: "Single Source of Truth",
        description: "Define shared data types once in a shared file (e.g. `types.ts`) and import them everywhere.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
          {
                "title": "1. Share code across files",
                "content": "Use `export` to make a type or function available, and `import` to use it in other parts of your app."
          },
          {
                "title": "2. import type vanishes in production",
                "content": "Writing `import type { User }` tells TypeScript the import is only for type checking, so it adds zero bytes to your final JavaScript."
          },
          {
                "title": "3. Keeps project bundles small",
                "content": "Type-only imports prevent accidental bundle bloat and avoid circular dependency warnings."
          }
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      "title": "Redefining Types in Every File",
      "code": "// File A defines User:\ntype User = { id: number; name: string };\n\n// File B defines User slightly differently:\ntype User = { id: string; name: string }; // Inconsistent!",
      "explanation": "Duplicating types leads to subtle bugs when one file updates and others are forgotten."
},
    good: {
      "title": "Shared Module Export and import type",
      "code": "// shared/types.ts\nexport type User = { id: number; name: string };\n\n// feature/greet.ts\nimport type { User } from \"../shared/types\";\nexport function greet(user: User): string { return `Hello, ${user.name}`; }",
      "explanation": "Both files share the exact same authoritative type definition."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test and run this TypeScript code live in the editor:",
    starterCode: "// Lesson 15: Modules and Type Imports\n// Simulated module setup:\ntype User = {\n  id: number;\n  name: string;\n};\n\nfunction greet(user: User): string {\n  return `Hello, ${user.name}`;\n}\n\nconst testUser: User = { id: 1, name: \"Rina\" };\nconsole.log(greet(testUser));\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "What is the purpose of writing `import type { User } from './types'`?",
      "options": [
            "It tells the compiler the import is exclusively for type checking and produces no runtime JavaScript import",
            "It downloads third-party types from npm automatically",
            "It converts the imported type into a runtime JavaScript class",
            "It prevents other files from accessing the User type"
      ],
      "correctIndex": 0,
      "explanation": "`import type` is completely removed during compilation, avoiding circular runtime dependencies and unnecessary bundle weight."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Modular Code",
            "desc": "Split code into focused files using export and import."
      },
      {
            "title": "Single Source of Truth",
            "desc": "Share types across files instead of copying them."
      },
      {
            "title": "import type",
            "desc": "Guarantees zero runtime overhead for imported types."
      }
],
  },
};
