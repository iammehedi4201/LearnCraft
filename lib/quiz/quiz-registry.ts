/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * LEARNCRAFT QUIZ REGISTRY
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * High-yield, curriculum-aligned module quizzes featuring both
 * conceptual Multiple Choice questions and Code Output Prediction challenges.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { ModuleQuiz } from "./quiz-types";
import { JAVASCRIPT_MODULE_QUIZZES } from "./javascript-quizzes";
import { TYPESCRIPT_MODULE_QUIZZES } from "./typescript-quizzes";
import { OOP_MODULE_QUIZZES } from "./oop-quizzes";
import { JAVASCRIPT_LEGACY_SLUG_MAP } from "@/app/learn/javascript/data/javascript-curriculum";
import { TYPESCRIPT_LEGACY_SLUG_MAP } from "@/app/learn/typescript/data/typescript-curriculum";
import { NEXTJS_MODULE_QUIZZES } from "./nextjs-quizzes";
import { NEXTJS_LEGACY_SLUG_MAP } from "@/app/learn/nextjs/data/nextjs-curriculum";

export const CURATED_MODULE_QUIZZES: ModuleQuiz[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // JAVASCRIPT CURRICULUM QUIZZES
  // ──────────────────────────────────────────────────────────────────────────
  ...JAVASCRIPT_MODULE_QUIZZES,
  // ──────────────────────────────────────────────────────────────────────────
  // TYPESCRIPT CURRICULUM QUIZZES
  // ──────────────────────────────────────────────────────────────────────────
  ...TYPESCRIPT_MODULE_QUIZZES,
  // ──────────────────────────────────────────────────────────────────────────
  // OBJECT-ORIENTED PROGRAMMING (OOP) CURRICULUM QUIZZES
  // ──────────────────────────────────────────────────────────────────────────
  ...OOP_MODULE_QUIZZES,
  // ──────────────────────────────────────────────────────────────────────────
  // NEXT.JS CURRICULUM QUIZZES
  // ──────────────────────────────────────────────────────────────────────────
  ...NEXTJS_MODULE_QUIZZES,

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
  const normTrack = trackKey.toLowerCase();
  let resolvedSlug = lessonSlug.toLowerCase();

  if (normTrack === "javascript" && JAVASCRIPT_LEGACY_SLUG_MAP[resolvedSlug]) {
    resolvedSlug = JAVASCRIPT_LEGACY_SLUG_MAP[resolvedSlug].toLowerCase();
  } else if (normTrack === "typescript" && TYPESCRIPT_LEGACY_SLUG_MAP[resolvedSlug]) {
    resolvedSlug = TYPESCRIPT_LEGACY_SLUG_MAP[resolvedSlug].toLowerCase();
  } else if (normTrack === "nextjs" && NEXTJS_LEGACY_SLUG_MAP[resolvedSlug]) {
    resolvedSlug = NEXTJS_LEGACY_SLUG_MAP[resolvedSlug].toLowerCase();
  }

  // 1. Check exact match in curated registry
  const match = CURATED_MODULE_QUIZZES.find(
    (q) =>
      q.trackKey.toLowerCase() === normTrack &&
      (q.lessonSlug.toLowerCase() === resolvedSlug ||
        q.lessonSlug.toLowerCase() === lessonSlug.toLowerCase() ||
        resolvedSlug.startsWith(q.lessonCode.toLowerCase().replace("-", "").toLowerCase()) ||
        q.id.toLowerCase().includes(resolvedSlug))
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
        title: "Design principle",
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
        title: "Code prediction",
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
        title: "Recovery strategy",
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
