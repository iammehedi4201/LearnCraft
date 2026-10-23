import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts24UtilityTypesContent: StandardLessonContent = {
  slug: "ts24-utility-types",
  code: "TS-24",
  title: "Essential Utility Types",
  subtitle: "Master everyday built-in utilities: Partial, Required, Readonly, Record, Pick, Omit, Exclude, and ReturnType to transform types cleanly.",
  sections: [
    {
      id: "part1",
      label: "Essential Utility Types",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Partial, Pick, Omit, Record",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Combining Utilities",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Omit Non-Existent Keys",
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
    title: "Essential Utility Types",
    bigPicture:
      "Utility types transform existing types without rewriting them. Use `Partial` to make properties optional, `Pick` to select fields, `Omit` to drop fields, and `Record` to build typed key-value maps.",
    breakdownTitle: "Four Key Categories",
    breakdownItems: [
      {
        title: "Modifiers (Partial / Required / Readonly)",
        desc: "Make all properties optional, required, or read-only.",
      },
      {
        title: "Slicers (Pick / Omit)",
        desc: "Keep only certain fields (Pick) or drop specific fields (Omit).",
      },
      {
        title: "Maps (Record<K, V>)",
        desc: "Creates an object type with specific keys and value types.",
      },
      {
        title: "Extractors (ReturnType / Awaited)",
        desc: "Extracts return values from functions or unwraps Promise results.",
      },
    ],
  },
  part2: {
    title: "The Most Important Utility Types",
    intro:
      "Explore the most frequently used built-in utilities in everyday TypeScript development:",
    cards: [
      {
        number: "01",
        tag: "Pick & Omit",
        title: "1. Pick<T, K> & Omit<T, K>",
        description:
          "Pick selects exact keys; Omit removes specified keys from an object shape.",
        codeSnippet:
          "interface User { id: string; name: string; secret: string }\ntype PublicUser = Omit<User, 'secret'>; // { id, name }\ntype UserPreview = Pick<User, 'name'>;   // { name }",
        color: "purple",
      },
      {
        number: "02",
        tag: "Partial",
        title: "2. Partial<T> for DTOs",
        description:
          "Makes all fields optional. The universal standard for update payloads and patch requests.",
        codeSnippet:
          "type UpdateUserDTO = Partial<Omit<User, 'id'>>;\n// Allows passing any subset of fields without 'id'",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Record",
        title: "3. Record<K, V>",
        description:
          "Creates type-safe lookup tables and dictionary maps.",
        codeSnippet:
          "type UserRole = 'admin' | 'editor';\nconst roleBadges: Record<UserRole, string> = {\n  admin: 'Shield',\n  editor: 'Pencil',\n};",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Single Source Rule",
      content:
        "Define your core domain model once. Derive all form payloads, update requests, and API previews using Pick, Omit, and Partial.",
    },
  },
  part3: {
    title: "Combining Utilities in Real Applications",
    intro:
      "Observe how combining utility types creates clean, production-grade contracts:",
    points: [
      {
        title: "1. Clean Update DTO Pattern",
        content:
          "Strip the server-generated id, then make remaining properties optional for PATCH updates.",
        codeSnippet:
          "interface Product { id: string; title: string; price: number }\ntype UpdateProduct = Partial<Omit<Product, 'id'>>;\nconst update: UpdateProduct = { price: 24.99 }; // Valid!",
      },
      {
        title: "2. Function Return Extraction with ReturnType<T>",
        content:
          "Extract the return type from third-party factory functions without needing the original interface exported.",
        codeSnippet:
          "function createSession() { return { token: 'xyz', expiresAt: Date.now() }; }\ntype Session = ReturnType<typeof createSession>;\n// Session is: { token: string; expiresAt: number }",
      },
      {
        title: "3. Union Filtering with Exclude<T, U>",
        content:
          "Filter out unwanted variants from a broad union type.",
        codeSnippet:
          "type Status = 'draft' | 'published' | 'archived' | 'deleted';\ntype PublicStatus = Exclude<Status, 'deleted' | 'draft'>;\n// 'published' | 'archived'",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Using Omit with Non-Existent Keys",
    bad: {
      title: "❌ Typos in Omit Keys Go Unnoticed",
      code:
        "interface User { id: string; name: string }\n\n// Typo in omitted key: 'namme' instead of 'name'\ntype UserWithoutName = Omit<User, 'namme'>;\n// Because Omit accepts any string key, 'name' is NOT removed!",
      explanation:
        "Unlike Pick (which enforces `K extends keyof T`), Omit accepts `keyof any`, so misspelling the omitted key silently fails to remove it.",
    },
    good: {
      title: "✅ Prefer Pick for Strict Whitelisting",
      code:
        "interface User { id: string; name: string; secret: string }\n\n// Pick enforces that keys MUST exist on User:\ntype SafePublicUser = Pick<User, 'id' | 'name'>;\n// If you misspell 'name', TypeScript flags it immediately!",
      explanation:
        "Whitelisting with Pick is safer than blacklisting with Omit because Pick validates key names at compile time.",
    },
    whyItMatters:
      "Mastering built-in utility types makes your code idiomatic and prevents thousands of lines of duplicated interface code across your stack.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Test Partial, Pick, Omit, and Record transformations in the live sandbox:",
    starterCode:
      "// TS-24: Essential Utility Types\ninterface Course {\n  id: string;\n  title: string;\n  price: number;\n  published: boolean;\n}\n\n// 1. Pick summary fields:\ntype CourseSummary = Pick<Course, \"id\" | \"title\">;\n\n// 2. Partial for updates:\ntype CourseUpdate = Partial<Omit<Course, \"id\">>;\n\n// 3. Dictionary lookup table:\ntype CourseCatalog = Record<string, CourseSummary>;\n\nconst catalog: CourseCatalog = {\n  \"ts-101\": { id: \"ts-101\", title: \"TypeScript Mastery\" },\n};\n\nconsole.log(`Catalog size: ${Object.keys(catalog).length}`);\nconsole.log(`Course: ${catalog[\"ts-101\"].title}`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "What is the difference between `Pick<User, 'id' | 'name'>` and `Omit<User, 'id' | 'name'>`?",
      options: [
        "Pick works only on classes; Omit works only on interfaces.",
        "Pick selects ONLY the specified keys to keep; Omit removes the specified keys and keeps everything else.",
        "Pick makes properties optional; Omit makes properties readonly.",
        "They are identical utility types with different names.",
      ],
      correctIndex: 1,
      explanation:
        "`Pick<T, K>` constructs a type by picking only the set of properties `K` from `T`. `Omit<T, K>` constructs a type by picking all properties from `T` and then removing `K`.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Pick & Omit",
        desc: "Use Pick to whitelist required properties and Omit to strip sensitive or internal fields.",
      },
      {
        title: "Partial for Updates",
        desc: "Use Partial<T> to make all fields optional for PATCH and edit form state.",
      },
      {
        title: "Record for Maps",
        desc: "Use Record<KeyType, ValueType> for strongly typed dictionaries and lookup objects.",
      },
    ],
    nextLessonPreview: {
      title: "TS-25: Using Type-Only Imports",
      desc: "Learn how to import and export types cleanly with 'import type' and 'export type' to keep production bundles light.",
    },
  },
};
