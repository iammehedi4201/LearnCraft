import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts17GenericsKeyofContent: StandardLessonContent = {
  slug: "ts17-generics-keyof",
  code: "TS-17",
  title: "Generics with keyof",
  subtitle: "Learn how '<K extends keyof T>' and lookup types ('T[K]') enable 100% type-safe dynamic property access.",
  sections: [
    {
      id: "part1",
      label: "Generics with keyof",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "The keyof Formula",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Why keyof Matters",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Loose string Trap",
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
    title: "Generics with keyof",
    bigPicture:
      "'keyof' gives you an object's keys as allowed words (e.g. 'id' | 'name'). Combining '<K extends keyof T>' with 'T[K]' lets you read object properties dynamically (obj[key]) with 100% type safety and zero typos.",
    breakdownTitle: "Three Parts of the Formula",
    breakdownItems: [
      {
        title: "keyof T",
        desc: "Extracts an object's keys into a union of allowed string literals (e.g. keyof User is 'id' | 'name').",
      },
      {
        title: "K extends keyof T",
        desc: "Guarantees that the key parameter must be an existing property on the object, catching typos at build time.",
      },
      {
        title: "Indexed Return (T[K])",
        desc: "Automatically returns the exact type stored at that key (e.g. User['id'] is number, User['name'] is string).",
      },
    ],
  },
  part2: {
    title: "How keyof and Generics Work Together",
    intro:
      "Observe how TypeScript extracts keys and enforces lookup types in one clean signature:",
    cards: [
      {
        number: "01",
        tag: "keyof",
        title: "1. The keyof Operator",
        description:
          "Extracts a union of property names from any object type.",
        codeSnippet:
          "type User = { id: number; name: string };\ntype UserKey = keyof User; // 'id' | 'name'",
        color: "purple",
      },
      {
        number: "02",
        tag: "Formula",
        title: "2. The Lookup Signature",
        description:
          "Combines object T with key K to return the exact property type T[K].",
        codeSnippet:
          "function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Safety",
        title: "3. Typos Blocked",
        description:
          "Passing an invalid property name triggers an immediate compile error.",
        codeSnippet:
          "const user = { id: 1, name: 'Alex' };\ngetProp(user, 'name'); // OK: returns string\n// getProp(user, 'email'); // Error: 'email' does not exist!",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Dynamic Access Rule",
      content:
        "Never type an object key parameter as loose 'string'. Always type it as 'K extends keyof T' so TypeScript catches typos and infers the return type T[K].",
    },
  },
  part3: {
    title: "Why keyof Generics are Essential",
    intro:
      "Everyday situations where this formula prevents bugs in dynamic JavaScript utilities:",
    points: [
      {
        title: "1. Perfect Return Type Inference",
        content:
          "Calling getProp(user, 'id') returns number, while getProp(user, 'name') returns string. No type casting needed.",
        codeSnippet:
          "const id = getProp(user, 'id');     // Inferred as number\nconst name = getProp(user, 'name'); // Inferred as string",
      },
      {
        title: "2. Type-Safe Property Setters",
        content:
          "Ensure that updated values match the exact property type being modified.",
        codeSnippet:
          "function setProp<T, K extends keyof T>(obj: T, key: K, val: T[K]) {\n  obj[key] = val;\n}",
      },
      {
        title: "3. Plucking Properties from Arrays",
        content:
          "Extracting single columns from an array of records (e.g. users.map(u => u.id)).",
        codeSnippet:
          "function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {\n  return items.map(item => item[key]);\n}",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Using Loose 'string' for Object Keys",
    bad: {
      title: "❌ Typing key: string on Object Access Functions",
      code:
        "function badGet(obj: any, key: string) {\n  return obj[key]; // Returns 'any' and permits typos!\n}\n// Silent bug: returns undefined at runtime with zero warning:\nconst val = badGet({ name: 'Alex' }, 'namme');",
      explanation:
        "Typing key as a loose string disables property name validation and loses the return type.",
    },
    good: {
      title: "✅ Use <T, K extends keyof T>(obj: T, key: K): T[K]",
      code:
        "function goodGet<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n// TypeScript flags typo immediately in your editor:\n// goodGet({ name: 'Alex' }, 'namme'); // Error: Argument not assignable!",
      explanation:
        "Using K extends keyof T forces the caller to pass an existing property name and preserves the exact type.",
    },
    whyItMatters:
      "This pattern turns dynamic object access—historically the buggiest part of JavaScript—into 100% type-safe code.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Practice using keyof and dynamic property access in the live editor:",
    starterCode:
      "// TS-17: Generics with keyof\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst serverConfig = {\n  host: \"localhost\",\n  port: 8080,\n  isProduction: false,\n};\n\nconst host = getProperty(serverConfig, \"host\"); // Inferred as string\nconst port = getProperty(serverConfig, \"port\"); // Inferred as number\n\nconsole.log(`Server running at ${host}:${port}`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "In `function getProp<T, K extends keyof T>(obj: T, key: K): T[K]`, what does `T[K]` represent?",
      options: [
        "An array containing all keys of `T`.",
        "The exact type of the value stored at property `K` on object `T`.",
        "A string representation of the key.",
        "A boolean indicating if the property exists.",
      ],
      correctIndex: 1,
      explanation:
        "`T[K]` is an indexed access type (lookup type). It represents the exact type of the value that lives at key `K` inside object `T` (e.g. if `User['age']` is `number`, `T[K]` evaluates to `number`).",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "keyof Operator",
        desc: "keyof T extracts an object's keys as a union of literal strings.",
      },
      {
        title: "K extends keyof T",
        desc: "Constrains keys to existing properties, preventing typos at compile time.",
      },
      {
        title: "T[K] Lookup Type",
        desc: "Automatically infers the exact return type stored at that property.",
      },
    ],
    nextLessonPreview: {
      title: "TS-18: Class Fields and Access Modifiers",
      desc: "Learn public, private, protected, and readonly modifiers for clean encapsulation in backend services.",
    },
  },
};
