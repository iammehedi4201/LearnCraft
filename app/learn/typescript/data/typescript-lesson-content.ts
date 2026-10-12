/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TYPESCRIPT IN-DEPTH LESSON CONTENT LAYER — LearnCraft
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Authoritative 7-part interactive lessons for all 32 TypeScript curriculum steps.
 * Strict Topic Boundary: Pure TypeScript language, compiler, and type system.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { StandardLessonContent, LessonSectionItem } from "@/components/curriculum/lesson-content-types";
import { getLessonBySlug, getAllLessons } from "./typescript-curriculum";

export const TYPESCRIPT_SECTIONS: LessonSectionItem[] = [
  { id: "part1", label: "Mental Model & Architecture", icon: "🧠" },
  { id: "part2", label: "Core Mechanics & Compiler Rules", icon: "⚙️" },
  { id: "part3", label: "Type System Deep Dive", icon: "📖" },
  { id: "part4", label: "Anti-Patterns vs Idiomatic Code", icon: "🛡️" },
  { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
  { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
  { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
];

const TS01_CONTENT: StandardLessonContent = {
  slug: "ts01-mental-model",
  code: "TS-01",
  title: "The Static Typing Mental Model & Compiler Pipeline",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Static Typing Mental Model",
    bigPicture:
      "TypeScript is an ahead-of-time static analysis layer over JavaScript. Variables in JavaScript have no static types — only runtime values in memory have types. TypeScript evaluates shapes, contracts, and data flow before your code runs, catching syntax and type errors directly in your editor.",
    breakdownTitle: "Core Principles to Master",
    breakdownItems: [
      {
        title: "Ahead-of-Time Checking",
        desc: "The TypeScript compiler checks assignability and contracts at build time before execution.",
      },
      {
        title: "Type Erasure Principle",
        desc: "All type annotations, interfaces, and generics are completely stripped away upon emit, resulting in zero runtime overhead.",
      },
      {
        title: "Boundary Contracts",
        desc: "Explicitly annotate function signatures and module boundaries, while relying on compiler inference for local variables.",
      },
      {
        title: "Runtime Boundary Distinction",
        desc: "TypeScript does not validate live incoming JSON at runtime without dedicated schema validators like Zod.",
      },
    ],
  },
  part2: {
    title: "The TypeScript Compiler Pipeline (`tsc`)",
    intro: "From raw source text to clean executable JavaScript across 5 distinct pipeline phases:",
    cards: [
      {
        number: "01",
        tag: "Lexical",
        title: "Scanner",
        description: "Converts raw source characters into a stream of syntax tokens.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Syntactic",
        title: "Parser",
        description: "Constructs an Abstract Syntax Tree (AST) representing the program structure.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Semantic",
        title: "Binder",
        description: "Associates declarations with Symbols inside lexical scopes.",
        color: "emerald",
      },
      {
        number: "04",
        tag: "Verification",
        title: "Type Checker",
        description: "Validates types, assignability, and structural interface compatibility.",
        color: "amber",
      },
      {
        number: "05",
        tag: "Output",
        title: "Emitter",
        description: "Erases all type annotations and outputs clean JavaScript and .d.ts files.",
        color: "rose",
      },
    ],
    rule: {
      title: "Build Safety Rule",
      content:
        "By default, tsc emits JavaScript even if errors exist. Always configure 'noEmitOnError': true in tsconfig.json to prevent flawed builds from reaching production.",
    },
  },
  part3: {
    title: "Type Annotations vs Type Inference",
    intro: "Achieving ideal developer ergonomics and strict architectural safety:",
    points: [
      {
        title: "Rule 1: Annotate System Boundaries",
        content:
          "Always annotate function parameters, public methods, and external return values to enforce explicit architectural contracts.",
        codeSnippet: `function sendWelcomeEmail(user: { id: string; email: string }): Promise<boolean> { ... }`,
      },
      {
        title: "Rule 2: Infer Local Variables",
        content:
          "Allow TypeScript to infer local variable declarations. Redundant annotations add visual noise without improving safety.",
        codeSnippet: `const timeoutMs = 5000; // Inferred automatically as number`,
      },
      {
        title: "Rule 3: Structural Subtyping (Duck Typing)",
        content:
          "TypeScript uses structural typing. Two types are interchangeable if their member shapes are compatible, regardless of explicit nominal declarations.",
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Production Best Practices",
    bad: {
      title: "Overusing `any` & Blindly Trusting External JSON",
      code: `// ❌ Disables type checker completely
function parseUserProfile(rawPayload: any): any {
  return rawPayload.user.profile.email.toLowerCase(); // Runtime crash risk!
}`,
      explanation:
        "Using `any` disables type checking for that variable and spreads viral type unsafety throughout downstream code.",
    },
    good: {
      title: "Strict Unknown Narrowing & Schema Validation",
      code: `// ✅ Safe compile-time type narrowing
function parseUserProfile(rawPayload: unknown): string {
  if (typeof rawPayload === "object" && rawPayload !== null && "email" in rawPayload) {
    return String((rawPayload as { email: unknown }).email).toLowerCase();
  }
  return "guest@example.com";
}`,
      explanation:
        "Prefer `unknown` when input types are uncertain, forcing explicit type guards before property access.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Edit the TypeScript code below and run the compiler sandbox in real-time:",
    starterCode: `// TS-01: Static Typing & Type Erasure in Action

interface LessonMeta {
  id: string;
  title: string;
  estimatedMinutes: number;
  completed: boolean;
}

function calculateTotalStudyTime(lessons: LessonMeta[]): string {
  const total = lessons.reduce((sum, l) => sum + l.estimatedMinutes, 0);
  return \`Total estimated study time: \${total} minutes\`;
}

const track: LessonMeta[] = [
  { id: "ts-01", title: "Mental Model", estimatedMinutes: 20, completed: true },
  { id: "ts-02", title: "Primitive Types", estimatedMinutes: 25, completed: false },
  { id: "ts-03", title: "Arrays & Tuples", estimatedMinutes: 30, completed: false },
];

console.log(calculateTotalStudyTime(track));
console.log("Compiler validation active!");
`,
  },
  part6: {
    title: "Quick Knowledge Check",
    quiz: {
      question:
        "What happens to a TypeScript interface when your application is compiled to JavaScript and runs in Node.js or the browser?",
      options: [
        "It converts into a JavaScript class with runtime property getters.",
        "It is completely erased (zero bytes in the compiled JavaScript output).",
        "It creates a hidden Proxy object that checks types on assignment.",
        "It becomes a global JSON schema validator.",
      ],
      correctIndex: 1,
      explanation:
        "TypeScript interfaces and types exist strictly at compile time. The compiler completely erases them, resulting in zero runtime overhead and 100% native execution speed.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "Ahead-of-Time Verification",
        desc: "TypeScript catches bugs before your code ever deploys or executes.",
      },
      {
        title: "Zero Runtime Overhead",
        desc: "Type erasure guarantees compiled JavaScript runs without performance penalties.",
      },
      {
        title: "Strict CI/CD Enforcement",
        desc: "Configure noEmitOnError: true to turn type violations into build-breaking blockers.",
      },
    ],
    nextLessonPreview: {
      title: "TS-02: Primitive Types & Strict Null Checks",
      desc: "Master primitive types, void vs undefined, and why strictNullChecks eliminates null reference exceptions.",
    },
  },
};

/**
 * Procedural generator for standard TypeScript curriculum lessons.
 */
function generateTypeScriptLesson(slug: string): StandardLessonContent {
  const lesson = getLessonBySlug(slug) || getAllLessons()[0];

  return {
    slug: lesson.slug,
    code: lesson.code,
    title: lesson.name,
    sections: TYPESCRIPT_SECTIONS,
    part1: {
      title: `The Mental Model: Understanding ${lesson.name}`,
      bigPicture: `${lesson.desc} In TypeScript, mastering this concept creates strict architectural boundaries, catches logical flaws before build time, and ensures seamless team scalability.`,
      breakdownTitle: "Key Principles to Master",
      breakdownItems: [
        {
          title: "Core Purpose",
          desc: lesson.desc,
        },
        {
          title: "Compiler Guarantees",
          desc: "Validates contracts statically without injecting runtime execution overhead.",
        },
        {
          title: "Architectural Safety",
          desc: "Prevents regression and domain drift across large shared codebases.",
        },
        {
          title: "Developer Ergonomics",
          desc: "Provides autocomplete, documentation, and instant refactoring in your IDE.",
        },
      ],
    },
    part2: {
      title: "Core Mechanics & Compiler Rules",
      intro: `Understand the exact syntax rules and type semantics governing ${lesson.name}:`,
      cards: [
        {
          number: "01",
          tag: "Syntax",
          title: "Declaration Semantics",
          description: "Defines clean type shapes and strict property contracts.",
          color: "purple",
        },
        {
          number: "02",
          tag: "Assignability",
          title: "Type Compatibility",
          description: "Evaluates structural subtyping and variance relationships.",
          color: "cyan",
        },
        {
          number: "03",
          tag: "Safety",
          title: "Strict Mode Compliance",
          description: "Ensures full compatibility under strictNullChecks and noImplicitAny.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Type Safety Rule",
        content: `Always write explicit contracts for ${lesson.name} to avoid loose implicit typing.`,
      },
    },
    part3: {
      title: "In-Depth Architectural Deep Dive",
      intro: `Deep dive into production usage patterns for ${lesson.name}:`,
      points: [
        {
          title: "Static Verification",
          content: `When leveraging ${lesson.name}, the compiler proves data invariants across every call site.`,
          codeSnippet: `// Example: ${lesson.code} contract\ntype Result<T> = { success: true; data: T } | { success: false; error: string };`,
        },
        {
          title: "Clean Modularity",
          content: "Keep types tightly coupled to their domain modules and export only public contracts.",
        },
      ],
    },
    part4: {
      title: "Anti-Patterns vs Idiomatic Code",
      bad: {
        title: "Loose Type Casting & Implicit Assumptions",
        code: `// ❌ Loose pattern: bypasses compiler verification
const config = {} as any;
console.log(config.nonExistentProperty);`,
        explanation:
          "Type assertions (`as any`) hide missing property errors until production execution.",
      },
      good: {
        title: "Strict Typed Contracts & Exhaustive Checks",
        code: `// ✅ Idiomatic pattern: strict type safety
interface AppConfig {
  readonly apiUrl: string;
  readonly retries: number;
}
const config: AppConfig = { apiUrl: "https://api.example.com", retries: 3 };`,
        explanation:
          "Strict typed declarations guarantee all required properties exist at compile time.",
      },
    },
    part5: {
      title: "Interactive Code Sandbox",
      intro: "Practice this TypeScript feature in real-time:",
      starterCode: `// ${lesson.code} - ${lesson.name}
// Practice and explore this TypeScript feature:

console.log("Practicing ${lesson.code}: ${lesson.name}");

interface DemoItem {
  id: string;
  title: string;
  active: boolean;
}

const item: DemoItem = {
  id: "item-101",
  title: "TypeScript Mastery",
  active: true,
};

console.log("Verified:", item);
`,
    },
    part6: {
      title: "Concept Check: Knowledge Assessment",
      quiz: {
        question: `What is the primary architectural advantage of ${lesson.name}?`,
        options: [
          "It adds runtime reflection classes to the JavaScript engine.",
          `It enforces compile-time safety and self-documenting contracts for: ${lesson.name}.`,
          "It automatically compiles TypeScript into WebAssembly bytecode.",
          "It requires disabling all strict compiler options in tsconfig.json.",
        ],
        correctIndex: 1,
        explanation: `${lesson.desc} Strict compile-time validation prevents production bugs and enables safe refactoring across teams.`,
      },
    },
    part7: {
      title: "Key Takeaways & What's Next",
      takeaways: [
        { title: "Compile-Time Guarantee", desc: lesson.desc },
        { title: "Zero Runtime Overhead", desc: "Type erasure guarantees zero performance penalty in production." },
        { title: "Clean Refactoring", desc: "Types document code intent and make breaking changes immediately visible." },
      ],
      nextLessonPreview: {
        title: `Next: Progressive TypeScript Mastery`,
        desc: "Continue advancing through the next stage of the TypeScript curriculum.",
      },
    },
  };
}

export function getTypeScriptLessonContent(slug: string): StandardLessonContent {
  const normalized = slug.toLowerCase();
  if (normalized === "ts01-mental-model" || normalized === "ts-01") {
    return TS01_CONTENT;
  }
  return generateTypeScriptLesson(slug);
}
