import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts23MappedTemplateTypesContent: StandardLessonContent = {
  slug: "ts23-mapped-template-types",
  code: "TS-23",
  title: "Mapped Types and Template Literals",
  subtitle: "Transform object shapes with [K in keyof T] and construct powerful string pattern types using template literal interpolation.",
  sections: [
    {
      id: "part1",
      label: "Mapped & Template Types",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Mapped Type Syntax",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Building Utility Types",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Over-Engineering Types",
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
    title: "Mapped Types and Template Literals",
    bigPicture:
      "Mapped types transform every property in an object type using a loop: `[K in Keys]: Value`. Template literal types combine string patterns using `${A}_${B}` to enforce exact text formats like event names or API routes.",
    breakdownTitle: "Three Core Ideas",
    breakdownItems: [
      {
        title: "Mapped Loop ([K in keyof T])",
        desc: "Iterates over every key in an object to create a new modified type.",
      },
      {
        title: "Modifiers (+ / -)",
        desc: "Add or remove optional (?) or readonly flags across all fields at once.",
      },
      {
        title: "Template Literals (`${A}_${B}`)",
        desc: "Combines string unions to create strongly typed string patterns.",
      },
    ],
  },
  part2: {
    title: "How Mapped Types and Template Literals Work",
    intro:
      "Observe how mapped types and template literals generate precise shapes:",
    cards: [
      {
        number: "01",
        tag: "Mapped",
        title: "1. Making Fields Optional",
        description:
          "Iterates over all keys of an object and appends ? to make them optional (how Partial<T> works).",
        codeSnippet:
          "type Optional<T> = { [K in keyof T]?: T[K] };\ninterface User { id: string; name: string }\ntype UserUpdate = Optional<User>; // { id?: string; name?: string }",
        color: "purple",
      },
      {
        number: "02",
        tag: "Template",
        title: "2. Template Literal Types",
        description:
          "Constructs string pattern types using template literal interpolation.",
        codeSnippet:
          "type Direction = 'top' | 'bottom';\ntype Position = `margin-${Direction}`; // 'margin-top' | 'margin-bottom'",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Modifiers",
        title: "3. Stripping Modifiers (-? and -readonly)",
        description:
          "Use minus (-) to strip optional flags or readonly constraints from existing types.",
        codeSnippet:
          "type Concrete<T> = { -readonly [K in keyof T]-?: T[K] };\n// Turns optional readonly fields into required mutable fields",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Mapped Type Rule",
      content:
        "Mapped types can only be declared inside type aliases using { [K in Keys]: Value }, never inside an interface definition.",
    },
  },
  part3: {
    title: "Step-by-Step: How Built-in Utility Types Work",
    intro:
      "Demystify how TypeScript's standard library implements Record and Partial:",
    points: [
      {
        title: "How Record<K, V> Is Built",
        content: "Record simply maps over a union of keys K and assigns value type V to each.",
        codeSnippet:
          "type MyRecord<K extends keyof any, V> = {\n  [P in K]: V;\n};\ntype PagePermissions = MyRecord<'home' | 'settings', boolean>;\n// { home: boolean; settings: boolean }",
      },
      {
        title: "How Readonly<T> Is Built",
        content: "Loops over keyof T and prepends the readonly modifier to every property.",
        codeSnippet:
          "type MyReadonly<T> = {\n  readonly [P in keyof T]: T[P];\n};\ntype FrozenUser = MyReadonly<{ id: number; name: string }>;",
      },
      {
        title: "Event Handlers with Template Literals",
        content: "Generate strongly typed event listener names from domain entities.",
        codeSnippet:
          "type EventType = 'click' | 'hover';\ntype HandlerName = `on${Capitalize<EventType>}`; // 'onClick' | 'onHover'",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Writing Metaprogramming Puzzles",
    bad: {
      title: "❌ Deep Recursive Key Remapping Puzzles",
      code:
        "// Inscrutable type puzzle:\ntype CamelToKebab<S extends string> =\n  S extends `${infer T}${infer U}`\n    ? `${T extends Lowercase<T> ? '' : '-'}${Lowercase<T>}${CamelToKebab<U>}`\n    : S;",
      explanation:
        "Complex recursive string manipulation types slow down the TypeScript compiler and make codebase maintenance painful for teammates.",
    },
    good: {
      title: "✅ Use Template Literals for High-Yield Domain Boundaries",
      code:
        "type Scope = 'read' | 'write' | 'admin';\ntype Resource = 'users' | 'billing';\ntype Permission = `${Resource}:${Scope}`;\n\nconst p: Permission = 'users:read'; // Verified!\nconsole.log(p);\n// Output: users:read",
      explanation:
        "Keep template literals focused on high-value constraints like API permission strings, event names, and CSS tokens.",
    },
    whyItMatters:
      "Understanding mapped and template types allows you to confidently read advanced library definitions (like Prisma, tRPC, and Next.js) without getting lost in type-level puzzles.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Experiment with mapped types and template literal event signatures in the editor:",
    starterCode:
      "// TS-23: Mapped Types & Template Literals\ntype Status = \"queued\" | \"active\" | \"completed\";\n\n// Template literal type:\ntype TaskEvent = `task_${Status}`;\n\n// Mapped type: Count mapping for each status\ntype StatusCounts = {\n  [S in Status]: number;\n};\n\nconst counts: StatusCounts = {\n  queued: 12,\n  active: 4,\n  completed: 85,\n};\n\nfunction logEvent(event: TaskEvent) {\n  console.log(`[EVENT TRIGGERED] ${event}`);\n}\n\nlogEvent(\"task_active\");\nconsole.log(`Active count: ${counts.active}`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "What type does `type Action = `${'user' | 'order'}_${'add' | 'remove'}` evaluate to in TypeScript?",
      options: [
        "`string`",
        "`'user_add' | 'user_remove' | 'order_add' | 'order_remove'`",
        "`['user', 'order', 'add', 'remove']`",
        "`{ user: string; order: string }`",
      ],
      correctIndex: 1,
      explanation:
        "Template literal types perform a Cartesian product over union members: each member of the first union is paired with each member of the second union, evaluating to `'user_add' | 'user_remove' | 'order_add' | 'order_remove'`.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Mapped Types ([K in Keys])",
        desc: "Mapped types loop over a union of keys to transform properties across an object shape.",
      },
      {
        title: "Template Literals",
        desc: "Use template string interpolation at the type level to construct strongly typed event and permission names.",
      },
      {
        title: "Utility Foundation",
        desc: "Mapped types form the underlying implementation for Partial, Required, Readonly, and Record.",
      },
    ],
    nextLessonPreview: {
      title: "TS-24: Essential Utility Types",
      desc: "Deep dive into everyday built-in utilities: Partial, Required, Readonly, Record, Pick, Omit, Exclude, and ReturnType.",
    },
  },
};
