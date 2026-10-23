import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts01MentalModelContent: StandardLessonContent = {
  slug: "ts01-mental-model",
  code: "TS-01",
  title: "How TypeScript Protects JavaScript",
  subtitle: "Understand compile-time error checking, the type erasure principle, and how TypeScript runs plain JavaScript.",
  sections: [
    {
      id: "part1",
      label: "Mental Model",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "The Three Phases",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Why TypeScript Matters",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Runtime Trap",
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
    title: "How TypeScript Protects JavaScript",
    bigPicture:
      "JavaScript runs dynamically and crashes at runtime when properties are missing or misspelled. TypeScript catches these errors inside your editor before your code ever runs.",
    breakdownTitle: "Three Core Foundations",
    breakdownItems: [
      {
        title: "Compile-Time Checks",
        desc: "Catches typos and data mismatches inside your editor while you type.",
      },
      {
        title: "Type Erasure",
        desc: "All types are stripped away during compilation; browsers only run plain JavaScript.",
      },
      {
        title: "Zero Runtime Cost",
        desc: "TypeScript adds zero performance overhead to your production bundle.",
      },
    ],
  },
  part2: {
    title: "How TypeScript Works",
    intro:
      "Every line of TypeScript follows this clean 3-step journey to production:",
    cards: [
      {
        number: "01",
        tag: "Editor",
        title: "1. Editor Analysis",
        description:
          "Inspects code in real time and highlights errors before you run it.",
        codeSnippet:
          "const price: number = 49.99;\n// price = 'free'; // Error: Type 'string' is not assignable to 'number'",
        color: "purple",
      },
      {
        number: "02",
        tag: "Build",
        title: "2. Type Erasure",
        description:
          "The compiler removes all types and leaves behind clean standard JavaScript.",
        codeSnippet:
          "// Compiled output in .js:\nconst price = 49.99;\nconsole.log(price);",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Runtime",
        title: "3. Native Execution",
        description:
          "Browsers and Node.js execute the resulting JavaScript at full native speed.",
        codeSnippet:
          "typeof price; // Evaluates to 'number' in JavaScript engine",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Golden Rule of Type Erasure",
      content:
        "Types exist solely for developer safety in your editor. At runtime, all types vanish completely.",
    },
  },
  part3: {
    title: "Why TypeScript Matters",
    intro:
      "Three practical advantages TypeScript gives you on real-world projects:",
    points: [
      {
        title: "1. Catch Typos Instantly",
        content:
          "Flags misspelled object properties immediately instead of crashing in production.",
        codeSnippet:
          "const user = { name: 'Alex' };\n// user.locatoin; // Error: Property 'locatoin' does not exist",
      },
      {
        title: "2. Instant Editor Autocomplete",
        content:
          "Type definitions let your editor and AI assistants suggest properties and function arguments automatically.",
        codeSnippet:
          "user.name.toUpperCase(); // Editor autocompletes string methods",
      },
      {
        title: "3. Confident Refactoring",
        content:
          "Renaming a function parameter or object property flags every file that needs to be updated.",
        codeSnippet:
          "// Change a function parameter shape, and TypeScript highlights all callers across your app.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Expecting Runtime Validation from Types",
    bad: {
      title: "❌ Expecting TS Types to Validate API Responses at Runtime",
      code:
        "type User = { id: number };\n// If API returns { id: 'invalid' }, TypeScript types cannot prevent it at runtime!\nconst user = (await fetch('/api')).json() as User;",
      explanation:
        "TypeScript types vanish after compile. They cannot check live incoming network data by themselves.",
    },
    good: {
      title: "✅ Use Runtime Checks or Schema Validators for Live Data",
      code:
        "type User = { id: number };\nconst data = await res.json();\nif (typeof data.id !== 'number') {\n  throw new Error('Invalid user payload');\n}",
      explanation:
        "Use runtime JavaScript guards (or libraries like Zod) to check external data shapes before trusting them.",
    },
    whyItMatters:
      "Remembering that TypeScript is compile-time only prevents dangerous security and data corruption assumptions.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Test TypeScript's type checking and type erasure in the live editor:",
    starterCode:
      "// TS-01: Mental Model\nconst courseName: string = \"TypeScript Foundations\";\nconst estimatedHours: number = 4;\n\nfunction printSummary(title: string, hours: number): string {\n  return `${title} - Est: ${hours}h`;\n}\n\nconsole.log(printSummary(courseName, estimatedHours));\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "What happens to TypeScript type annotations when your code is compiled to JavaScript?",
      options: [
        "They are converted into runtime if-statements that validate data.",
        "They are completely stripped away, leaving only plain JavaScript.",
        "They are preserved as comments inside the JavaScript bundle.",
        "They run in a special TypeScript background process in the browser.",
      ],
      correctIndex: 1,
      explanation:
        "TypeScript uses Type Erasure: all types, interfaces, and annotations are stripped away during build time, outputting standard JavaScript that browsers understand.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Compile-Time Guardrails",
        desc: "TypeScript catches bugs inside your editor before you ever run code.",
      },
      {
        title: "Type Erasure",
        desc: "Types exist only during development. The compiled output is 100% standard JavaScript.",
      },
      {
        title: "Zero Runtime Overhead",
        desc: "Because types are erased, TypeScript applications run at native JavaScript speed.",
      },
    ],
    nextLessonPreview: {
      title: "TS-02: Primitives and Type Inference",
      desc: "Learn string, number, boolean, and how TypeScript infers types automatically without redundant code.",
    },
  },
};
