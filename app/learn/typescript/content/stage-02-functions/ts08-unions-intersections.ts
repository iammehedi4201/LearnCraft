import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts08UnionsIntersectionsContent: StandardLessonContent = {
  slug: "ts08-unions-intersections",
  code: "TS-08",
  title: "Union and Intersection Types",
  subtitle: "Learn Union (|) for OR and Intersection (&) for AND with simple, real-world examples.",
  sections: [
    {
      id: "part1",
      label: "Unions & Intersections",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Union & Intersection Rules",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Why and When to Use",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Common Mistake",
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
    title: "Union and Intersection Types",
    bigPicture:
      "A Union (|) means OR — a value can be one of several types. An Intersection (&) means AND — an object must combine all fields from both types.",
    breakdownTitle: "The Core Difference",
    breakdownItems: [
      {
        title: "Union (|)",
        desc: "Value can be this OR that (e.g. string | number).",
      },
      {
        title: "Literal Union",
        desc: "Locks a variable to exact allowed words (e.g. 'light' | 'dark').",
      },
      {
        title: "Intersection (&)",
        desc: "Combines two objects into one combined shape.",
      },
    ],
  },
  part2: {
    title: "How Unions and Intersections Work",
    intro:
      "Here is how you write unions and intersections in your code:",
    cards: [
      {
        number: "01",
        tag: "Union (|)",
        title: "1. Union Types (|)",
        description:
          "Allows either Type A OR Type B.",
        codeSnippet:
          "let id: string | number;\nid = 'usr_102'; // OK\nid = 404;       // OK",
        color: "purple",
      },
      {
        number: "02",
        tag: "Literals",
        title: "2. Literal Unions",
        description:
          "Restricts a variable to exact allowed words so you never make typos.",
        codeSnippet:
          "type Status = 'pending' | 'active' | 'done';\nlet state: Status = 'active';\n// state = 'actve'; // Error: typo caught!",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Intersection (&)",
        title: "3. Object Intersections (&)",
        description:
          "Combines multiple object types into one.",
        codeSnippet:
          "type User = { name: string };\ntype Admin = User & { role: 'admin' };\n\nconst user: Admin = {\n  name: 'Alex',\n  role: 'admin',\n};",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Narrowing Rule",
      content:
        "When using a union like string | number, you can only call methods that both share until you check the type with typeof.",
    },
  },
  part3: {
    title: "Why and When to Use Them",
    intro:
      "Practical reasons why developers use unions and intersections every day:",
    points: [
      {
        title: "1. Handle Flexible Inputs Safely",
        content:
          "Use a union when a function can accept more than one type without resorting to 'any'.",
        codeSnippet:
          "function formatId(id: string | number) {\n  return `ID: ${id}`;\n}",
      },
      {
        title: "2. Catch Typos in Status Strings",
        content:
          "Use literal unions to restrict state values so typos are flagged immediately while typing.",
        codeSnippet:
          "type OrderStatus = 'placed' | 'shipped' | 'delivered';",
      },
      {
        title: "3. Build Clean Modular Models",
        content:
          "Use intersections (&) to attach timestamps or metadata to any entity without repeating code.",
        codeSnippet:
          "type WithTimestamps = { createdAt: Date };\ntype Post = { title: string } & WithTimestamps;",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Using Type Methods Without Checking",
    bad: {
      title: "❌ Calling a String Method on string | number",
      code:
        "function getLength(val: string | number) {\n  // Error: Property 'length' does not exist on type 'number'\n  return val.length;\n}",
      explanation:
        "If val is a number at runtime, val.length is undefined and will cause bugs.",
    },
    good: {
      title: "✅ Check the Type with typeof First",
      code:
        "function getLength(val: string | number) {\n  if (typeof val === 'string') {\n    return val.length; // Safe!\n  }\n  return val.toString().length; // Safe!\n}",
      explanation:
        "Checking typeof val === 'string' safely narrows the type inside the if block.",
    },
    whyItMatters:
      "Always narrow union types before calling methods that belong to only one branch.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Try changing the values below in the live editor:",
    starterCode:
      "// TS-08: Unions and Intersections\ntype Status = \"loading\" | \"success\" | \"error\";\n\ntype User = {\n  id: string | number;\n  name: string;\n};\n\ntype Admin = User & {\n  role: \"admin\";\n};\n\nconst member: Admin = {\n  id: 101,\n  name: \"Alice\",\n  role: \"admin\",\n};\n\nconsole.log(`${member.name} (${member.role}) - ID: ${member.id}`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Given `type Id = string | number`, what can you safely do before checking with `typeof`?",
      options: [
        "Call `.toUpperCase()`",
        "Call `.toFixed(2)`",
        "Call `.toString()` (shared by both)",
        "Call `.substring(0, 2)`",
      ],
      correctIndex: 2,
      explanation:
        "Both `string` and `number` have a `.toString()` method in JavaScript. You can only call methods shared by both types until you narrow the type with `typeof`.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Union (|) = OR",
        desc: "A value can be one of multiple types (e.g. string | number).",
      },
      {
        title: "Intersection (&) = AND",
        desc: "Combines multiple object types into one single shape.",
      },
      {
        title: "Literal Unions Prevent Typos",
        desc: "Use exact string values like 'pending' | 'success' instead of loose strings.",
      },
    ],
    nextLessonPreview: {
      title: "TS-09: Type Aliases Versus Interfaces",
      desc: "Learn when to use 'type' vs 'interface' in plain, easy words with clear examples.",
    },
  },
};
