import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts21IndexedAccessTypeofContent: StandardLessonContent = {
  slug: "ts21-indexed-access-typeof",
  code: "TS-17",
  title: "Indexed Access and typeof",
  subtitle: "Extract types directly from existing objects and variables without repeating code in plain, easy words.",
  sections: [
    {
      id: "part1",
      label: "Indexed Access & typeof",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Type Query Syntax",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Single Source of Truth",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Dot Notation Trap",
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
    title: "Indexed Access and typeof",
    bigPicture:
      "'typeof' extracts a type directly from a JavaScript variable or object. Indexed Access (Type['key']) extracts the type of a specific property from an existing type.",
    breakdownTitle: "Three Type Query Tools",
    breakdownItems: [
      {
        title: "typeof (Extract from Value)",
        desc: "Captures the inferred type of any JavaScript variable, function, or object constant.",
      },
      {
        title: "Indexed Access (Type['key'])",
        desc: "Looks up the type of a property using square brackets on an existing type.",
      },
      {
        title: "Array Lookup (Type[number])",
        desc: "Extracts the union of all elements inside an array or tuple.",
      },
    ],
  },
  part2: {
    title: "How Indexed Access and typeof Work",
    intro:
      "Observe how TypeScript derives types from existing code without duplicating shapes:",
    cards: [
      {
        number: "01",
        tag: "typeof",
        title: "1. typeof from Constants",
        description:
          "Extracts the exact type of a runtime JavaScript object.",
        codeSnippet:
          "const defaultConfig = { port: 8080, env: 'dev' };\ntype Config = typeof defaultConfig;\n// Config is { port: number; env: string }",
        color: "purple",
      },
      {
        number: "02",
        tag: "Lookup",
        title: "2. Indexed Access (T['key'])",
        description:
          "Look up the type of a specific property using brackets.",
        codeSnippet:
          "interface UserProfile {\n  contact: { email: string; phone: string };\n}\ntype Contact = UserProfile['contact']; // { email: string; phone: string }",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Array[number]",
        title: "3. Union from Array",
        description:
          "Turn a readonly array into an exact union of its items.",
        codeSnippet:
          "const ROLES = ['admin', 'editor', 'viewer'] as const;\ntype Role = (typeof ROLES)[number];\n// Role is 'admin' | 'editor' | 'viewer'!",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Single Source of Truth Rule",
      content:
        "Avoid writing the same structure twice. Use typeof on configuration objects and indexed access (T['key']) to keep types automatically in sync with code.",
    },
  },
  part3: {
    title: "Why and When to Use These Tools",
    intro:
      "How to keep your codebase DRY and maintainable using type queries:",
    points: [
      {
        title: "1. Zero Duplication for Config Objects",
        content:
          "Create your runtime config object in JavaScript, then export its type with typeof. When you edit the object, the type updates automatically.",
        codeSnippet:
          "export const theme = { primary: '#6366f1', secondary: '#ec4899' };\nexport type Theme = typeof theme;",
      },
      {
        title: "2. Reusing Sub-Types from API Interfaces",
        content:
          "Extract nested object shapes from large API responses without declaring separate interfaces.",
        codeSnippet:
          "type Address = ApiResponse['user']['address'];",
      },
      {
        title: "3. Generating Unions from Array Constants",
        content:
          "Keep an array of options in JavaScript and derive the TypeScript union from it using `[number]`.",
        codeSnippet:
          "const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE'] as const;\ntype HttpMethod = (typeof HTTP_METHODS)[number];",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Using Dot Notation for Type Lookups",
    bad: {
      title: "❌ Using Dot Notation to Look Up a Property Type",
      code:
        "interface User {\n  id: string;\n}\n// Syntax Error: You cannot use dot notation in a type position:\n// type IdType = User.id;",
      explanation:
        "In TypeScript type positions, dot notation is illegal. You must use square brackets with quotes.",
    },
    good: {
      title: "✅ Use Square Brackets: User['id']",
      code:
        "interface User {\n  id: string;\n}\ntype IdType = User['id']; // Safe and correct! Evaluates to 'string'",
      explanation:
        "Always use square brackets `Type['propertyName']` when indexing into types.",
    },
    whyItMatters:
      "Remembering to use square brackets in type annotations prevents syntax errors when inspecting nested shapes.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Practice extracting types with typeof and indexed access in the live editor:",
    starterCode:
      "// TS-21: Indexed Access and typeof\nconst appConfig = {\n  host: \"localhost\",\n  port: 3000,\n  features: {\n    auth: true,\n    analytics: false,\n  },\n};\n\ntype AppConfig = typeof appConfig;\ntype Features = AppConfig[\"features\"];\n\nconst featureFlags: Features = {\n  auth: true,\n  analytics: true,\n};\n\nconsole.log(`Port: ${appConfig.port}, Auth enabled: ${featureFlags.auth}`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Given `const ROLES = ['admin', 'user'] as const;`, what does `type Role = (typeof ROLES)[number];` produce?",
      options: [
        "The type `number`.",
        "The union type `'admin' | 'user'`.",
        "An array type `string[]`.",
        "A function that returns a role.",
      ],
      correctIndex: 1,
      explanation:
        "Indexing a readonly tuple with `[number]` extracts the union of all literal values stored in the array: `'admin' | 'user'`.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "typeof for Values",
        desc: "Use typeof to capture the type of any JavaScript variable or object constant.",
      },
      {
        title: "Square Bracket Lookups",
        desc: "Use Type['key'] to look up the type of an individual property.",
      },
      {
        title: "Array[number]",
        desc: "Index a const array with [number] to generate an exact union of its elements.",
      },
    ],
    nextLessonPreview: {
      title: "TS-22: Conditional Types and infer",
      desc: "Learn how ternary types ('T extends U ? X : Y') and 'infer' unpack types dynamically in simple, easy words.",
    },
  },
};
