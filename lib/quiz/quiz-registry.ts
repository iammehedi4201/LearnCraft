/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * LEARNCRAFT QUIZ REGISTRY
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * High-yield, curriculum-aligned module quizzes featuring both
 * conceptual Multiple Choice questions and Code Output Prediction challenges.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { ModuleQuiz } from "./quiz-types";

export const CURATED_MODULE_QUIZZES: ModuleQuiz[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // NEXT.JS: NX-01 — The App Router Architecture
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-nextjs-nx01",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx01-app-router",
    lessonCode: "NX-01",
    lessonTitle: "The App Router Architecture",
    description: "Evaluate your mental model of React Server Components, layout re-rendering rules, and server/client boundary execution in Next.js 15.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx01-q1",
        type: "multiple_choice",
        prompt: "In the Next.js App Router, how does layout state behave when a user navigates between sibling child routes (e.g. from /dashboard/analytics to /dashboard/settings)?",
        options: [
          "The parent layout fully unmounts and remounts with brand-new state",
          "The layout preserves its React state and DOM structure without re-rendering",
          "The layout re-executes only on the client while preserving server caches",
          "The layout is re-fetched via SSR and overwrites previous client state",
        ],
        correctAnswer: 1,
        explanation: "Next.js App Router layouts are state-preserving. When navigating between sibling routes inside the same layout, the layout does not unmount or lose its state; only the changing children page slots are swapped.",
        hint: "Think about why tabs and sidebar state don't collapse or reset when browsing subpages.",
        hintCostXP: 5,
      },
      {
        id: "nx01-q2",
        type: "code_output",
        prompt: "Predict the terminal vs browser console output when this Server Component renders during initial page load:",
        codeSnippet: `// app/feed/page.tsx (Server Component)
export default async function FeedPage() {
  console.log("SERVER_LOG: Fetching user timeline");
  return (
    <main>
      <h1>Activity Feed</h1>
    </main>
  );
}`,
        language: "tsx",
        options: [
          "Logged in BOTH Server terminal and Browser DevTools console",
          "Logged ONLY in the Node.js/Server terminal; 0 client logs",
          "Logged ONLY in the Browser DevTools console after hydration",
          "Triggers a runtime build error because console.log is banned in Server Components",
        ],
        correctAnswer: 1,
        explanation: "By default, components inside the App Router are React Server Components (RSC). They execute strictly on the server during request/build time. Their JavaScript bundle is never shipped to the client, so their console logs only appear in the server terminal.",
        hint: "Server Components do not bundle their code or runtime execution into the client browser bundle.",
        hintCostXP: 5,
      },
      {
        id: "nx01-q3",
        type: "code_output",
        prompt: "What will be rendered and logged given this boundary hierarchy?",
        codeSnippet: `// app/components/Counter.tsx
"use client";
import { useState } from "react";

export function Counter({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(() => {
    console.log("INIT_COUNT:", initialCount);
    return initialCount;
  });
  return <button>{count}</button>;
}

// app/page.tsx (Server Component)
import { Counter } from "./components/Counter";

export default function Page() {
  console.log("PAGE_SERVER");
  return <Counter initialCount={42} />;
}`,
        language: "tsx",
        options: [
          "Server terminal: 'PAGE_SERVER' and 'INIT_COUNT: 42' | Browser console: 'INIT_COUNT: 42'",
          "Server terminal: 'PAGE_SERVER' only | Browser console: 'PAGE_SERVER' and 'INIT_COUNT: 42'",
          "Server terminal: 'INIT_COUNT: 42' only | Browser console: 'PAGE_SERVER'",
          "Browser console: 'INIT_COUNT: 42' only (Server logs nothing)",
        ],
        correctAnswer: 0,
        explanation: "Client Components ('use client') undergo SSR on the server first before being hydrated in the browser. Therefore, Counter initializes on the server (logging INIT_COUNT: 42 in the server terminal) AND then hydrates on the client (logging INIT_COUNT: 42 in browser console). Page.tsx is pure RSC and logs only on the server.",
        hint: "Remember: 'use client' does NOT mean 'client-only'. Client components still pre-render on the server during initial HTML generation!",
        hintCostXP: 5,
      },
      {
        id: "nx01-q4",
        type: "multiple_choice",
        prompt: "What is the primary architectural purpose of Route Groups with parentheses like `app/(marketing)/about/page.tsx` and `app/(dashboard)/settings/page.tsx`?",
        options: [
          "They define nested URL pathname segments like /marketing/about",
          "They organize routes and allow multiple nested layouts without affecting the URL path",
          "They enforce authentication middleware boundaries at the file-system level",
          "They make the contained pages run exclusively as Edge Functions",
        ],
        correctAnswer: 1,
        explanation: "Parentheses in route groups (e.g. `(marketing)`) omit the folder name from the URL path. This allows developers to organize routes logically and assign distinct root layouts without altering the clean URL structure.",
        hint: "The folder name surrounded by parentheses is stripped from the browser URL address.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // REACT: RC-01 — Thinking in React & Modern Mental Models
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-react-rc01",
    trackKey: "react",
    trackTitle: "React.js",
    lessonSlug: "rc01-mental-models",
    lessonCode: "RC-01",
    lessonTitle: "Thinking in React & Modern Mental Models",
    description: "Test your understanding of React 19 reconciliation, state update batching, and closure mental models.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "rc01-q1",
        type: "code_output",
        prompt: "What is logged to the console when the user clicks this button ONCE?",
        codeSnippet: `function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log("Count is:", count);
  }

  return <button onClick={handleClick}>Click</button>;
}`,
        language: "tsx",
        options: [
          "'Count is: 3'",
          "'Count is: 1'",
          "'Count is: 0'",
          "'Count is: undefined'",
        ],
        correctAnswer: 2,
        explanation: "State updates in React do not mutate the state variable in the currently executing closure. During handleClick, 'count' is fixed to 0 from the render snapshot. All three setCount calls queue updates based on 0 + 1, and console.log reads the snapshot value '0'.",
        hint: "State is a snapshot of the current render pass. Calling setCount does not change the local variable in the existing function execution.",
        hintCostXP: 5,
      },
      {
        id: "rc01-q2",
        type: "code_output",
        prompt: "Predict the final rendered count after clicking the button once with updater functions:",
        codeSnippet: `function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 5);
    setCount((prev) => prev * 2);
  }

  return <div>{count}</div>;
}`,
        language: "tsx",
        options: [
          "12",
          "6",
          "10",
          "2",
        ],
        correctAnswer: 0,
        explanation: "Updater functions receive the pending state from the queue: (0 + 1) = 1; then (1 + 5) = 6; then (6 * 2) = 12. On next render, count is 12.",
        hint: "Trace the pending state sequentially through each updater callback: 0 -> +1 -> +5 -> *2.",
        hintCostXP: 5,
      },
      {
        id: "rc01-q3",
        type: "multiple_choice",
        prompt: "Why does React require keys when rendering lists of dynamic components?",
        options: [
          "Keys are used by CSS stylesheets to order DOM nodes properly",
          "Keys give items stable identity across renders so React can diff, move, or retain them accurately",
          "Keys enable asynchronous parallel fetching of list item data",
          "Keys encrypt client DOM nodes to prevent XSS injection attacks",
        ],
        correctAnswer: 1,
        explanation: "React relies on keys during reconciliation to correlate items across render cycles. Without keys (or with array indices when items are reordered), React risks updating or recycling incorrect DOM elements and local component states.",
        hint: "Reconciliation diffing needs a stable identity to know if an element was moved, added, or deleted.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TYPESCRIPT: TS-01 — Types vs Values & The Static Type System
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts01",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts01-mental-model",
    lessonCode: "TS-01",
    lessonTitle: "Types vs Values & The Static Type System",
    description: "Assess your knowledge of type erasure, structural typing, and type-space vs value-space separation.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts01-q1",
        type: "code_output",
        prompt: "What is the runtime console output after compilation to JavaScript?",
        codeSnippet: `interface User {
  id: string;
  name: string;
}

const user: User = { id: "u1", name: "Alice" };

console.log(typeof user);
// @ts-ignore
console.log(typeof User);`,
        language: "typescript",
        options: [
          "'object' then 'undefined'",
          "'User' then 'interface'",
          "'object' then 'object'",
          "'User' then 'undefined'",
        ],
        correctAnswer: 0,
        explanation: "Interfaces exist purely in TypeScript's type space and are completely erased during compilation. At JavaScript runtime, 'typeof user' evaluates to 'object', while 'User' does not exist in JavaScript value space, producing 'undefined'.",
        hint: "Types and interfaces are erased at compile time; they do not exist in the emitted JavaScript runtime.",
        hintCostXP: 5,
      },
      {
        id: "ts01-q2",
        type: "multiple_choice",
        prompt: "TypeScript is structurally typed rather than nominally typed. What does this mean in practice?",
        options: [
          "Two types are compatible only if they share the exact same declared class name",
          "Two types are compatible if their shape and properties match, regardless of declaration name",
          "Types must be explicitly cast using the 'as' keyword before any assignment",
          "Variables can only hold primitives; object structures require schema validation libraries",
        ],
        correctAnswer: 1,
        explanation: "In structural typing (duck typing for types), compatibility is based on whether the required properties and types match the expected shape, not whether they were instantiated from the same named type or class.",
        hint: "'If it walks like a duck and quacks like a duck, it's a duck.'",
        hintCostXP: 5,
      },
      {
        id: "ts01-q3",
        type: "code_output",
        prompt: "What will this discriminated union pattern print at runtime?",
        codeSnippet: `type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side * shape.side;
  }
}

const item = { kind: "square" as const, side: 4, label: "Box" };
console.log(getArea(item));`,
        language: "typescript",
        options: [
          "16",
          "NaN",
          "TypeError: item has excess property 'label'",
          "undefined",
        ],
        correctAnswer: 0,
        explanation: "The object satisfies { kind: 'square'; side: number } structurally. Passing an existing object variable bypasses excess property checks (which only apply to direct object literals), calculating 4 * 4 = 16.",
        hint: "4 * 4 = 16. Excess property checks only run on fresh inline object literals.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // NODE.JS: NODE-01 — What Is Node.js? Server Runtime & V8 Engine
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-nodejs-node01",
    trackKey: "nodejs",
    trackTitle: "Node.js",
    lessonSlug: "node01-what-is-nodejs",
    lessonCode: "NODE-01",
    lessonTitle: "What Is Node.js? Server Runtime & V8 Engine",
    description: "Test your understanding of the libuv event loop, microtask queues, and asynchronous event prioritization.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "node01-q1",
        type: "code_output",
        prompt: "In what exact order will the following numbers be printed in Node.js?",
        codeSnippet: `console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

Promise.resolve().then(() => {
  console.log(3);
});

process.nextTick(() => {
  console.log(4);
});

console.log(5);`,
        language: "javascript",
        options: [
          "1, 5, 4, 3, 2",
          "1, 5, 3, 4, 2",
          "1, 2, 3, 4, 5",
          "1, 5, 2, 4, 3",
        ],
        correctAnswer: 0,
        explanation: "1. Synchronous code runs first: prints 1, then 5.\n2. Microtask queue runs before the event loop advances to macrotasks. In Node.js, process.nextTick has highest priority (prints 4).\n3. Promise resolution microtask runs next (prints 3).\n4. Finally, timer macrotask in the Timer phase runs (prints 2). Result: 1, 5, 4, 3, 2.",
        hint: "Synchronous first -> process.nextTick -> Promise microtask -> setTimeout macrotask.",
        hintCostXP: 5,
      },
      {
        id: "node01-q2",
        type: "multiple_choice",
        prompt: "Which component of the Node.js architecture handles asynchronous I/O operations such as file system access and DNS lookups on a background thread pool?",
        options: [
          "Google V8 JavaScript Engine",
          "libuv C library",
          "V8 Just-In-Time (JIT) Compiler",
          "Node.js HTTP Parser (llhttp)",
        ],
        correctAnswer: 1,
        explanation: "libuv provides the cross-platform event loop and thread pool (default 4 threads) used to offload blocking I/O tasks like fs operations, crypto, and DNS lookups from the main JavaScript thread.",
        hint: "It's the C library that gives Node.js its non-blocking asynchronous I/O capabilities.",
        hintCostXP: 5,
      },
    ],
  },
];

/**
 * Retrieve a curated or dynamically generated quiz for any module in the platform
 */
export function getQuizBySlug(trackKey: string, lessonSlug: string): ModuleQuiz | null {
  // 1. Check exact match in curated registry
  const match = CURATED_MODULE_QUIZZES.find(
    (q) =>
      q.trackKey.toLowerCase() === trackKey.toLowerCase() &&
      (q.lessonSlug.toLowerCase() === lessonSlug.toLowerCase() ||
        lessonSlug.toLowerCase().startsWith(q.lessonCode.toLowerCase().replace("-", "").toLowerCase()) ||
        q.id.toLowerCase().includes(lessonSlug.toLowerCase()))
  );
  if (match) return match;

  // 2. Synthesize an authoritative fallback quiz so ANY module across 14 tracks is testable
  const formattedTitle = lessonSlug
    .replace(/^[a-z0-9]+-/i, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    id: `quiz-${trackKey}-${lessonSlug}`,
    trackKey,
    trackTitle: trackKey.toUpperCase(),
    lessonSlug,
    lessonCode: lessonSlug.split("-")[0]?.toUpperCase() || "MOD",
    lessonTitle: formattedTitle || "Module Mastery Assessment",
    description: `Demonstrate your practical proficiency and architectural understanding of ${formattedTitle}.`,
    passingScore: 70,
    baseXpReward: 25,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: `${lessonSlug}-q1`,
        type: "multiple_choice",
        prompt: `Which of the following best represents the primary design principle established in ${formattedTitle}?`,
        options: [
          "Decoupling concerns to guarantee deterministic execution and maintainability",
          "Directly coupling database queries with user presentation components",
          "Disabling type assertions and linting checks in production builds",
          "Relying entirely on synchronous blocking calls across client threads",
        ],
        correctAnswer: 0,
        explanation: "Separation of concerns and deterministic execution ensure predictable, testable, and scalable systems.",
        hint: "Focus on clean architecture, decoupling, and deterministic data flow.",
        hintCostXP: 5,
      },
      {
        id: `${lessonSlug}-q2`,
        type: "code_output",
        prompt: `Predict the output or behavior of this code snippet related to ${formattedTitle}:`,
        codeSnippet: `const config = Object.freeze({
  mode: "production",
  retries: 3,
});

try {
  // @ts-ignore
  config.retries = 5;
} catch (e) {
  // strict mode handling
}

console.log(config.retries);`,
        language: "typescript",
        options: [
          "3",
          "5",
          "undefined",
          "null",
        ],
        correctAnswer: 0,
        explanation: "Object.freeze creates an immutable shallow copy. Property mutations fail silently or throw in strict mode, leaving config.retries as 3.",
        hint: "Object.freeze prevents reassignment of existing properties.",
        hintCostXP: 5,
      },
      {
        id: `${lessonSlug}-q3`,
        type: "multiple_choice",
        prompt: `What is the recommended production failure-recovery strategy for this layer?`,
        options: [
          "Structured Error Boundaries with fallback UI and graceful degradation",
          "Ignoring unhandled rejections and letting the process silently stall",
          "Hardcoding mock responses directly in the production client bundle",
          "Restarting the entire operating system on every network timeout",
        ],
        correctAnswer: 0,
        explanation: "Production-grade web apps encapsulate failures using error boundaries and automated fallback handling.",
        hint: "Think about error boundaries and graceful degradation.",
        hintCostXP: 5,
      },
    ],
  };
}

export function getAllQuizzes(): ModuleQuiz[] {
  return CURATED_MODULE_QUIZZES;
}
