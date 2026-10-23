import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts31DebuggingCompilerErrorsContent: StandardLessonContent = {
  slug: "ts31-debugging-compiler-errors",
  code: "TS-31",
  title: "Reading and Fixing Compiler Errors",
  subtitle: "Learn how to dissect deep compiler error traces, read error messages from bottom to top, and troubleshoot common type mismatches.",
  sections: [
    {
      id: "part1",
      label: "Reading Compiler Errors",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Top 4 Compiler Errors",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Diagnosing Error Traces",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "@ts-ignore Anti-Pattern",
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
    title: "Reading and Fixing Compiler Errors",
    bigPicture:
      "TypeScript error messages can be long and intimidating, but the secret is simple: always read from the bottom line up. The deepest line tells you the exact missing or mismatched property.",
    breakdownTitle: "Three Rules for Reading Errors",
    breakdownItems: [
      {
        title: "Read Bottom-to-Top",
        desc: "The final indented line pinpoints the exact field or type causing the failure.",
      },
      {
        title: "Source vs Target",
        desc: "'Type X is not assignable to Y': X is what you gave it, Y is what it was expecting.",
      },
      {
        title: "Excess Property Errors",
        desc: "Passing an object literal directly triggers strict checking for misspelled or unknown keys.",
      },
    ],
  },
  part2: {
    title: "The Most Common TypeScript Errors",
    intro:
      "Recognize the four error messages you will encounter most frequently:",
    cards: [
      {
        number: "01",
        tag: "TS2322",
        title: "1. Type Assignability (TS2322)",
        description:
          "'Type X is not assignable to type Y.' Caused by mismatched types or missing required properties.",
        codeSnippet:
          "let age: number = '25';\n// Error: Type 'string' is not assignable to type 'number'.",
        color: "purple",
      },
      {
        number: "02",
        tag: "TS2339",
        title: "2. Missing Property (TS2339)",
        description:
          "'Property Z does not exist on type X.' Caused by misspelled property names or union types needing narrowing.",
        codeSnippet:
          "const u = { name: 'Alex' };\n// u.email; // Error: Property 'email' does not exist on type '{ name: string }'",
        color: "rose",
      },
      {
        number: "03",
        tag: "TS2532",
        title: "3. Possibly Undefined (TS2532)",
        description:
          "'Object is possibly undefined.' Triggered by strictNullChecks when array indexing or optional properties are accessed.",
        codeSnippet:
          "const items = ['a', 'b'];\nconst item = items[0]; // string | undefined in strict mode\n// item.toUpperCase(); // Error! Use item?.toUpperCase()",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Golden Rule of Debugging",
      content:
        "When an error trace is long, do not panic. Scroll straight to the bottom of the message. Fix the bottom-most line, and the entire 15-line error chain will disappear.",
    },
  },
  part3: {
    title: "Step-by-Step: Diagnosing Complex Error Traces",
    intro:
      "Walk through analyzing a real-world nested type failure:",
    points: [
      {
        title: "The Scenario: Passing Props to a Component",
        content:
          "You pass a user object into a function, but TypeScript flags a red squiggly error across the entire call.",
        codeSnippet:
          "interface Address { city: string; zip: string }\ninterface Customer { id: string; address: Address }\nfunction shipTo(c: Customer) { ... }\n\nshipTo({ id: '1', address: { city: 'Denver' } }); // Red squiggly!",
      },
      {
        title: "The Error Trace Anatomy",
        content:
          "Line 1 says 'Argument of type... is not assignable to Customer'. Line 2 says 'Types of property address are incompatible'. Line 3 says: 'Property zip is missing in type { city: string }'.",
        codeSnippet:
          "// Notice line 3: 'Property zip is missing'. That is the entire problem!",
      },
      {
        title: "The Immediate Resolution",
        content:
          "You provide `zip: '80202'`, and the entire error chain resolves immediately.",
        codeSnippet:
          "shipTo({ id: '1', address: { city: 'Denver', zip: '80202' } }); // Clean compile!",
      },
    ],
  },
  part4: {
    title: "Common Anti-Pattern: Suppressing Errors with @ts-ignore",
    bad: {
      title: "❌ Using // @ts-ignore or 'as any' to Make Red Squiggles Go Away",
      code:
        "// Lazy shortcut to make the build pass:\n// @ts-ignore\nconst result = calculateTotals(rawOrder);\n\n// Or casting with as any:\nconst data = (raw as any).nonExistent.field;",
      explanation:
        "Using `@ts-ignore` or `as any` silences the compiler, turning off static analysis. It hides real typos, missing fields, and type mismatches that will crash your users in production.",
    },
    good: {
      title: "✅ Fix the Root Cause by Adding Missing Fields or Narrowing",
      code:
        "// Proper fix: read the bottom line of the error and satisfy the contract:\nconst completeOrder = {\n  ...rawOrder,\n  currency: 'USD',\n};\nconst result = calculateTotals(completeOrder);",
      explanation:
        "Addressing the root cause preserves static type guarantees and keeps your application rock-solid.",
    },
    whyItMatters:
      "Senior engineers do not fear compiler errors: they treat them as an intelligent pair programmer catching mistakes before code ever hits git.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Practice fixing property mismatches and strict null errors in the live editor:",
    starterCode:
      "// TS-31: Reading and Fixing Compiler Errors\ninterface ServerMetrics {\n  cpuPercent: number;\n  memoryUsageMB: number;\n  clusterId: string;\n}\n\nfunction logMetrics(metrics: ServerMetrics): string {\n  return `Cluster ${metrics.clusterId}: CPU ${metrics.cpuPercent}%, Memory ${metrics.memoryUsageMB}MB`;\n}\n\n// Intentionally complete the object to satisfy all required properties:\nconst liveData: ServerMetrics = {\n  cpuPercent: 42.5,\n  memoryUsageMB: 1024,\n  clusterId: \"prod-us-east-1\",\n};\n\nconsole.log(logMetrics(liveData));\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "When encountering a deeply nested 15-line TypeScript compiler error message, where should you look first to find the root cause?",
      options: [
        "The very first line at the top of the error message.",
        "The deepest, most indented line at the very bottom of the error trace.",
        "Your tsconfig.json file.",
        "The package.json file.",
      ],
      correctIndex: 1,
      explanation:
        "TypeScript error messages drill down hierarchically from top to bottom. The top line is general ('Types are incompatible'), while the deepest line at the very bottom pinpoints the exact missing property or incompatible primitive type.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Read Bottom-to-Top",
        desc: "The deepest line at the bottom of an error message almost always states the exact property or type that failed.",
      },
      {
        title: "Source vs Target",
        desc: "Remember that in 'Type A is not assignable to type B', A is your provided value and B is what was expected.",
      },
      {
        title: "Never @ts-ignore",
        desc: "Avoid @ts-ignore or 'as any' shortcuts; address the root cause to maintain application stability.",
      },
    ],
    nextLessonPreview: {
      title: "TS-32: Clean Type Architecture and Smells",
      desc: "Learn to identify type smells, audit AI-generated code, avoid over-engineering, and master senior technical interview questions.",
    },
  },
};
