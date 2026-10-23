import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts09TypeVsInterfaceContent: StandardLessonContent = {
  slug: "ts09-type-vs-interface",
  code: "TS-09",
  title: "Type Aliases Versus Interfaces",
  subtitle: "Learn the exact decision rule: when to use 'type' and when to use 'interface' in plain, easy words.",
  sections: [
    {
      id: "part1",
      label: "Type vs Interface",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Syntax Comparison",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Decision Rules",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Interface Union Trap",
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
    title: "Type Aliases Versus Interfaces",
    bigPicture:
      "'type' and 'interface' both define object shapes. The golden rule is simple: use 'type' for unions, primitives, and tuples; use 'interface' for object models, classes, and framework contracts.",
    breakdownTitle: "Three Key Differences",
    breakdownItems: [
      {
        title: "Unions & Primitives (type Only)",
        desc: "Only 'type' can name unions (string | number) or primitives. Interfaces cannot do this.",
      },
      {
        title: "Object Extension (interface: extends, type: &)",
        desc: "Interfaces use the 'extends' keyword. Types combine shapes using the '&' intersection operator.",
      },
      {
        title: "Declaration Merging (interface Only)",
        desc: "Defining the same interface twice merges them into one (useful for extending global window or third-party types).",
      },
    ],
  },
  part2: {
    title: "Comparing Type Aliases and Interfaces",
    intro:
      "Observe how 'interface' and 'type' define and extend object shapes:",
    cards: [
      {
        number: "01",
        tag: "interface",
        title: "1. Interface with extends",
        description:
          "Clear object contract syntax using the familiar 'extends' keyword.",
        codeSnippet:
          "interface User {\n  name: string;\n}\ninterface Admin extends User {\n  role: 'admin';\n}",
        color: "purple",
      },
      {
        number: "02",
        tag: "type",
        title: "2. Type Alias with &",
        description:
          "Flexible object shapes combined using the '&' intersection operator.",
        codeSnippet:
          "type User = { name: string };\nttype Admin = User & { role: 'admin' };",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Unions",
        title: "3. Unions (type only)",
        description:
          "Only 'type' can name union types or primitives.",
        codeSnippet:
          "type Status = 'pending' | 'success' | 'error';\ntype ID = string | number;\n// Interfaces cannot do this!",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Decision Rule",
      content:
        "Use 'type' for unions, tuples, and function signatures. Use 'interface' for class contracts and expandable domain models. Pick one style for basic objects and stay consistent.",
    },
  },
  part3: {
    title: "Why and When to Pick One Over the Other",
    intro:
      "Straightforward guidelines for choosing between type and interface:",
    points: [
      {
        title: "1. Extending Third-Party Types with Interfaces",
        content:
          "Interfaces can be declared multiple times to safely add properties to global objects like Window or Express Request.",
        codeSnippet:
          "interface Window {\n  customAnalyticsToken?: string;\n}",
      },
      {
        title: "2. Modeling Complex State with Types",
        content:
          "Types excel at modeling state unions like 'loading' | 'success' | 'error' with associated data.",
        codeSnippet:
          "type State = { status: 'loading' } | { status: 'success'; data: string[] };",
      },
      {
        title: "3. Both Work for Standard Objects",
        content:
          "For 90% of objects, `{ id: string; name: string }` works identically with type or interface.",
        codeSnippet:
          "type UserA = { id: string };\ninterface UserB { id: string; } // Behaves identically!",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Trying to Declare a Union as an Interface",
    bad: {
      title: "❌ Attempting to Create a Union with the 'interface' Keyword",
      code:
        "// Syntax Error: An interface cannot name a union or primitive directly:\n// interface Status = 'active' | 'inactive';",
      explanation:
        "Interfaces can only describe object shapes and functions; they cannot alias primitives or unions.",
    },
    good: {
      title: "✅ Use 'type' for All Union and Primitive Aliases",
      code:
        "type Status = 'active' | 'inactive'; // Safe and idiomatic\ntype ID = string | number;           // Safe and idiomatic",
      explanation:
        "Whenever you write '|' for a union, always reach for the 'type' keyword.",
    },
    whyItMatters:
      "Knowing the unique strengths of 'type' (unions) vs 'interface' (extensible contracts) eliminates daily hesitation.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Practice declaring and extending interfaces and types in the live sandbox:",
    starterCode:
      "// TS-09: Type vs Interface\ninterface BaseEntity {\n  id: string;\n  createdAt: Date;\n}\n\ninterface UserProfile extends BaseEntity {\n  username: string;\n  role: \"admin\" | \"member\";\n}\n\nconst user: UserProfile = {\n  id: \"usr_99\",\n  createdAt: new Date(),\n  username: \"Mehedi\",\n  role: \"admin\",\n};\n\nconsole.log(`User: ${user.username} (${user.role}) - Created: ${user.createdAt.getFullYear()}`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Which of the following can ONLY be done with a `type` alias, not an `interface`?",
      options: [
        "Extending another shape.",
        "Declaring optional properties with `?`.",
        "Creating a union type (e.g. `type Status = 'open' | 'closed'`).",
        "Defining an object with `id` and `name`.",
      ],
      correctIndex: 2,
      explanation:
        "Only `type` aliases can name union types (like `'open' | 'closed'`) or primitive aliases. An `interface` must always define an object shape or callable signature.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "type for Unions",
        desc: "Use type aliases for unions, primitives, and tuples.",
      },
      {
        title: "interface for Objects",
        desc: "Use interfaces for object models, OOP classes, and declaration merging.",
      },
      {
        title: "Consistency Matters",
        desc: "For basic object shapes, both work identically. Stick to one convention within your team.",
      },
    ],
    nextLessonPreview: {
      title: "TS-10: Control Flow Analysis and Type Guards",
      desc: "Learn how typeof, instanceof, and the 'in' operator narrow broad types safely inside if-statements.",
    },
  },
};
