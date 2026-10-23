import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts12DiscriminatedUnionsContent: StandardLessonContent = {
  slug: "ts12-discriminated-unions",
  code: "TS-12",
  title: "Using Discriminated Unions",
  subtitle: "Master the #1 TypeScript pattern: using a shared 'status' or 'kind' property for 100% bug-free branching.",
  sections: [
    {
      id: "part1",
      label: "Discriminated Unions",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Pattern Anatomy",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Where to Use It",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Boolean Flag Anti-Pattern",
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
    title: "Using Discriminated Unions",
    bigPicture:
      "A Discriminated Union is a union of objects that share a single common property (like 'status' or 'kind'). Checking that one property instantly tells TypeScript which exact object shape you have.",
    breakdownTitle: "Three Essential Elements",
    breakdownItems: [
      {
        title: "Shared Discriminant Key",
        desc: "Every object shape in the union has the exact same property name (e.g. status, kind, or type).",
      },
      {
        title: "Unique Literal Values",
        desc: "Each shape assigns a distinct literal value to that key ('loading', 'success', 'error').",
      },
      {
        title: "No Impossible States",
        desc: "Guarantees that your application state can only represent one valid reality at a time.",
      },
    ],
  },
  part2: {
    title: "How Discriminated Unions Work",
    intro:
      "Observe how checking the shared 'status' property unlocks the specific fields for that state:",
    cards: [
      {
        number: "01",
        tag: "Shapes",
        title: "1. Define State Shapes",
        description:
          "Define separate types for each state sharing a common 'status' literal.",
        codeSnippet:
          "type Loading = { status: 'loading' };\ntype Success = { status: 'success'; data: string[] };\ntype Failure = { status: 'error'; message: string };",
        color: "purple",
      },
      {
        number: "02",
        tag: "Union",
        title: "2. Combine Into a Union",
        description:
          "Join the shapes with '|' into a single state type.",
        codeSnippet:
          "type FetchState = Loading | Success | Failure;\n// Exactly one of these states is active at any time",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Narrowing",
        title: "3. Check the Tag",
        description:
          "Checking state.status automatically narrows to that exact shape.",
        codeSnippet:
          "function render(s: FetchState) {\n  if (s.status === 'success') return s.data.join(', ');\n  if (s.status === 'error') return s.message;\n  return 'Loading...';\n}",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Single Reality Rule",
      content:
        "Never use multiple optional boolean flags like { isLoading: boolean, error?: string, data?: any }. Use a discriminated union so impossible states cannot exist.",
    },
  },
  part3: {
    title: "Where Discriminated Unions Shine",
    intro:
      "Three core architectural patterns that rely on discriminated unions:",
    points: [
      {
        title: "1. API Results (Success vs Error)",
        content:
          "Model API responses cleanly so data is only accessible when success is true.",
        codeSnippet:
          "type ApiResult = \n  | { success: true; user: User }\n  | { success: false; error: string };",
      },
      {
        title: "2. Redux Actions and Domain Events",
        content:
          "Every event has a 'type' property that determines its payload shape.",
        codeSnippet:
          "type Action = \n  | { type: 'LOGIN'; token: string }\n  | { type: 'LOGOUT' };",
      },
      {
        title: "3. Clean Switch Statements",
        content:
          "Using a switch statement on the discriminant tag gives 100% type safety in every branch.",
        codeSnippet:
          "switch (action.type) {\n  case 'LOGIN': return action.token;\n  case 'LOGOUT': return null;\n}",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: The 'Optional Flag Soup' Anti-Pattern",
    bad: {
      title: "❌ Using Multiple Optional Properties for One State",
      code:
        "// Anti-pattern: Permits impossible state combinations:\ntype BadState = {\n  isLoading: boolean;\n  isError: boolean;\n  error?: string;\n  data?: string[];\n};\n// What if isLoading === true AND isError === true at the same time?!",
      explanation:
        "Separate boolean flags allow invalid states that cause UI bugs and confusing if-checks.",
    },
    good: {
      title: "✅ Use a Discriminated Union Instead",
      code:
        "type GoodState =\n  | { status: 'idle' }\n  | { status: 'loading' }\n  | { status: 'success'; data: string[] }\n  | { status: 'error'; message: string };\n// Impossible states are completely prevented by design!",
      explanation:
        "With a discriminated union, you cannot have data while in an error state. Every state is strictly valid.",
    },
    whyItMatters:
      "Discriminated unions make entire categories of UI bugs and undefined property crashes impossible.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Experiment with discriminated unions and state narrowing in the live editor:",
    starterCode:
      "// TS-12: Discriminated Unions\ntype Shape =\n  | { kind: \"circle\"; radius: number }\n  | { kind: \"square\"; sideLength: number }\n  | { kind: \"rectangle\"; width: number; height: number };\n\nfunction calculateArea(s: Shape): number {\n  switch (s.kind) {\n    case \"circle\":\n      return Math.PI * s.radius ** 2;\n    case \"square\":\n      return s.sideLength * s.sideLength;\n    case \"rectangle\":\n      return s.width * s.height;\n  }\n}\n\nconsole.log(\"Circle Area:\", calculateArea({ kind: \"circle\", radius: 5 }).toFixed(2));\nconsole.log(\"Square Area:\", calculateArea({ kind: \"square\", sideLength: 4 }));\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "What makes a union of object types a 'Discriminated Union'?",
      options: [
        "Every object type must be an `abstract class`.",
        "Every object type in the union shares a common property key whose values are distinct literal types.",
        "The union can only contain primitive numbers and booleans.",
        "It can only be used inside React components.",
      ],
      correctIndex: 1,
      explanation:
        "A Discriminated Union requires all object members to share a common property (the discriminant) where each member assigns a unique literal type (e.g. `'loading'`, `'success'`). Checking this property narrows the union.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Shared Tag Property",
        desc: "Give all object shapes in the union the same property key with unique literal values.",
      },
      {
        title: "Impossible States Eliminated",
        desc: "Discriminated unions guarantee that only one valid state exists at a time.",
      },
      {
        title: "Instant Narrowing",
        desc: "Checking state.status immediately unlocks the exact properties of that state.",
      },
    ],
    nextLessonPreview: {
      title: "TS-13: Exhaustive Checking with never",
      desc: "Learn how to use the 'never' type in switch statements so TypeScript alerts you if you forget to handle a case.",
    },
  },
};
