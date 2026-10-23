import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts13ExhaustiveCheckingContent: StandardLessonContent = {
  slug: "ts13-exhaustive-checking",
  code: "TS-13",
  title: "Exhaustive Checking with never",
  subtitle: "Use the 'never' type in switch statements so TypeScript alerts you if you ever forget to handle a case.",
  sections: [
    {
      id: "part1",
      label: "Exhaustive Checking",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "The never Pattern",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Refactoring Safety",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Silent Default Trap",
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
    title: "Exhaustive Checking with never",
    bigPicture:
      "Exhaustive checking ensures that your switch statements handle every single case of a union. By assigning the leftover value to a 'never' variable in the default block, TypeScript throws a compile error if you ever forget a case.",
    breakdownTitle: "Three Core Mechanics",
    breakdownItems: [
      {
        title: "The never Tripwire",
        desc: "Because nothing can be assigned to 'never', any unhandled union case triggers an immediate compiler error.",
      },
      {
        title: "Refactoring Protection",
        desc: "Adding a new member to a union immediately highlights every switch statement in your app that needs to be updated.",
      },
      {
        title: "assertNever Helper",
        desc: "A small reusable helper that enforces compile-time safety and throws a helpful runtime error if triggered.",
      },
    ],
  },
  part2: {
    title: "How Exhaustive Checking Works",
    intro:
      "Observe how the 'never' type guarantees every union member is handled:",
    cards: [
      {
        number: "01",
        tag: "Pattern",
        title: "1. The Inline never Check",
        description:
          "Assign the variable to a local 'never' constant inside the default branch.",
        codeSnippet:
          "default:\n  const _exhaustive: never = state;\n  throw new Error(`Unhandled: ${_exhaustive}`);",
        color: "purple",
      },
      {
        number: "02",
        tag: "Helper",
        title: "2. Reusable assertNever Function",
        description:
          "Write a 3-line helper once and use it in all switch statements.",
        codeSnippet:
          "function assertNever(x: never): never {\n  throw new Error(`Unexpected object: ${x}`);\n}",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Compile Error",
        title: "3. Forgetting a Case Triggers an Error",
        description:
          "Adding a new union member without updating the switch immediately fails the build.",
        codeSnippet:
          "// If 'refunded' is not handled:\n// Error: Type '\"refunded\"' is not assignable to type 'never'!",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Exhaustive Switch Rule",
      content:
        "Always add `assertNever(variable)` to the default clause of union switch statements to guarantee every case is handled at compile time.",
    },
  },
  part3: {
    title: "Why and When to Use Exhaustive Checks",
    intro:
      "How exhaustive checking prevents bugs during application refactors:",
    points: [
      {
        title: "1. Confident Feature Additions",
        content:
          "When you add a new payment method or user role, TypeScript instantly guides you to every switch statement that needs to handle it.",
        codeSnippet:
          "type Role = 'admin' | 'user' | 'guest'; // Adding 'manager' here flags all incomplete switches!",
      },
      {
        title: "2. Clean Reducer Functions",
        content:
          "In Redux or useReducer dispatch handlers, assertNever guarantees no actions are ignored silently.",
        codeSnippet:
          "switch (action.type) {\n  case 'INCREMENT': return state + 1;\n  default: return assertNever(action);\n}",
      },
      {
        title: "3. Dual Safety (Compile & Runtime)",
        content:
          "Provides compile-time error checks in your editor plus a clear runtime crash message if invalid data bypasses validation.",
        codeSnippet:
          "throw new Error(`Unexpected value: ${val}`);",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Empty or Silent default Clauses",
    bad: {
      title: "❌ Leaving default: return null (Silent Bugs)",
      code:
        "function handleStatus(s: 'pending' | 'success' | 'error') {\n  switch (s) {\n    case 'pending': return 'Loading';\n    case 'success': return 'Done';\n    // 'error' is forgotten! Silently falls into default:\n    default: return null;\n  }\n}",
      explanation:
        "An empty or silent default statement masks forgotten cases, allowing bugs to reach production unnoticed.",
    },
    good: {
      title: "✅ Use assertNever in default: to Catch Missed Cases",
      code:
        "function handleStatus(s: 'pending' | 'success' | 'error') {\n  switch (s) {\n    case 'pending': return 'Loading';\n    case 'success': return 'Done';\n    case 'error': return 'Failed';\n    default: return assertNever(s); // Safe!\n  }\n}",
      explanation:
        "If you ever add a new status, TypeScript refuses to compile until you add a case for it.",
    },
    whyItMatters:
      "Silent defaults hide bugs. Exhaustive checks force your code to stay 100% complete as your application grows.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Test exhaustive switch checks and see how TypeScript protects you when adding new cases:",
    starterCode:
      "// TS-13: Exhaustive Checking with never\ntype PaymentMethod = \"card\" | \"paypal\" | \"crypto\";\n\nfunction assertNever(x: never): never {\n  throw new Error(`Unhandled payment method: ${JSON.stringify(x)}`);\n}\n\nfunction getFee(method: PaymentMethod): number {\n  switch (method) {\n    case \"card\":\n      return 2.5;\n    case \"paypal\":\n      return 3.0;\n    case \"crypto\":\n      return 1.0;\n    default:\n      return assertNever(method);\n  }\n}\n\nconsole.log(\"Card Fee:\", getFee(\"card\"));\nconsole.log(\"Crypto Fee:\", getFee(\"crypto\"));\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "How does assigning a variable to type `never` in a `default:` branch prevent bugs?",
      options: [
        "It speeds up execution in the browser.",
        "If all cases are handled, the variable is type `never` and compiles cleanly; if any case is missed, assigning it to `never` triggers an instant compiler error.",
        "It automatically writes the missing case code for you.",
        "It converts the switch statement into an if-else chain.",
      ],
      correctIndex: 1,
      explanation:
        "When all union cases are checked, the remaining type is `never`. If a case is missed, that unhandled type cannot be assigned to `never`, causing TypeScript to immediately flag the error.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "never Tripwire",
        desc: "Use const _check: never = val in default clauses to catch unhandled union members.",
      },
      {
        title: "assertNever Helper",
        desc: "Create a reusable assertNever function for clean, standardized exhaustive checks.",
      },
      {
        title: "Refactoring Safety",
        desc: "Adding new values to your union automatically flags every switch statement that needs updating.",
      },
    ],
    nextLessonPreview: {
      title: "TS-14: Writing Generic Functions",
      desc: "Learn how generics with <T> capture relationships between inputs and outputs without losing type information.",
    },
  },
};
