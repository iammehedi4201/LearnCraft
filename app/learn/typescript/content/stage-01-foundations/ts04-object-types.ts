import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts04ObjectTypesContent: StandardLessonContent = {
  slug: "ts04-object-types",
  code: "TS-04",
  title: "Object Types and Optional Properties",
  subtitle: "Define clear object shapes with required fields, optional properties (?), and readonly modifiers.",
  sections: [
    {
      id: "part1",
      label: "Object Types",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Object Modifiers",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Practical Patterns",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Optional Pitfalls",
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
    title: "Object Types and Optional Properties",
    bigPicture:
      "Object types describe the properties of JavaScript objects. Use '?' for optional properties and 'readonly' to prevent modifications.",
    breakdownTitle: "Three Object Mechanics",
    breakdownItems: [
      {
        title: "Object Shape",
        desc: "Specifies required property names and their types (e.g. { id: string; name: string }).",
      },
      {
        title: "Optional Fields (?)",
        desc: "Properties that can be present or undefined (e.g. email?: string).",
      },
      {
        title: "readonly Fields",
        desc: "Properties that cannot be reassigned once initialized.",
      },
    ],
  },
  part2: {
    title: "How Object Types Work",
    intro:
      "Observe how required, optional, and readonly modifiers define object shapes:",
    cards: [
      {
        number: "01",
        tag: "Required",
        title: "1. Required Properties",
        description:
          "All declared properties must be present when creating the object.",
        codeSnippet:
          "type User = { id: string; name: string };\nconst u: User = { id: 'u1', name: 'Alex' };\n// Missing either property causes a compile error",
        color: "purple",
      },
      {
        number: "02",
        tag: "Optional",
        title: "2. Optional Properties (?)",
        description:
          "Properties that can be omitted when creating an object.",
        codeSnippet:
          "type User = { id: string; bio?: string };\nconst u: User = { id: 'u1' }; // OK: bio is optional",
        color: "cyan",
      },
      {
        number: "03",
        tag: "readonly",
        title: "3. Readonly Properties",
        description:
          "Cannot be reassigned after the object is created.",
        codeSnippet:
          "type Config = { readonly apiKey: string };\nconst cfg: Config = { apiKey: 'key_123' };\n// cfg.apiKey = 'new'; // Error: Cannot assign to readonly",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Object Shape Rule",
      content:
        "TypeScript enforces object contracts strictly: missing required properties or providing extra unexpected properties triggers compile errors.",
    },
  },
  part3: {
    title: "Why and When to Use Object Modifiers",
    intro:
      "Essential patterns for modeling data in real-world TypeScript applications:",
    points: [
      {
        title: "1. Handling Optional Form Fields",
        content:
          "Use '?' for fields that users might leave blank, such as phone number or profile bio.",
        codeSnippet:
          "type ProfileInput = { username: string; bio?: string; avatarUrl?: string };",
      },
      {
        title: "2. Protecting Critical IDs with readonly",
        content:
          "Mark database IDs and created timestamps as readonly to prevent accidental mutations.",
        codeSnippet:
          "type UserEntity = { readonly id: string; readonly createdAt: Date; name: string };",
      },
      {
        title: "3. Safe Access with Optional Chaining",
        content:
          "Always use optional chaining '?.' when accessing properties on optional objects.",
        codeSnippet:
          "const city = user.address?.city; // Safe: evaluates to undefined if address is missing",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Calling Methods on Optional Properties",
    bad: {
      title: "❌ Calling Methods on Optional Fields Without Checking",
      code:
        "type User = { name: string; nickname?: string };\nfunction getUpperNickname(u: User) {\n  // Error: Object is possibly 'undefined':\n  return u.nickname.toUpperCase();\n}",
      explanation:
        "If nickname is undefined at runtime, calling .toUpperCase() will crash with a TypeError.",
    },
    good: {
      title: "✅ Use Optional Chaining or an if-Check",
      code:
        "type User = { name: string; nickname?: string };\nfunction getUpperNickname(u: User) {\n  return u.nickname?.toUpperCase() ?? 'No Nickname';\n}",
      explanation:
        "Optional chaining (?.) safely short-circuits to undefined when the property is not provided.",
    },
    whyItMatters:
      "Optional fields have type 'T | undefined'. Always handle the undefined case before calling methods.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Practice defining object types with optional and readonly properties:",
    starterCode:
      "// TS-04: Object Types\ntype Course = {\n  readonly id: string;\n  title: string;\n  description?: string;\n  rating: number;\n};\n\nconst course: Course = {\n  id: \"c_101\",\n  title: \"TypeScript Object Models\",\n  rating: 4.9,\n};\n\nconsole.log(`${course.title} (Rating: ${course.rating})`);\nconsole.log(`Description: ${course.description ?? \"N/A\"}`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "What type does `age?: number` have when reading it from an object?",
      options: [
        "`number` only",
        "`number | undefined`",
        "`null`",
        "`any`",
      ],
      correctIndex: 1,
      explanation:
        "An optional property `age?: number` means the property can hold a `number` or be completely omitted (`undefined`).",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Object Shapes",
        desc: "Define required property names and value types to model your application data.",
      },
      {
        title: "Optional Fields (?)",
        desc: "Mark properties with '?' when they can be omitted (type becomes T | undefined).",
      },
      {
        title: "readonly Immutability",
        desc: "Use readonly on database IDs and timestamps to prevent accidental reassignment.",
      },
    ],
    nextLessonPreview: {
      title: "TS-05: Special Types: any, unknown, never, void",
      desc: "Learn why unknown is safe, why any is dangerous, and what never means in plain, simple words.",
    },
  },
};
