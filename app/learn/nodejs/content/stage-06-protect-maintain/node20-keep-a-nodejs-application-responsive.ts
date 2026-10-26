import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node20KeepANodejsApplicationResponsiveContent: StandardLessonContent = {
  slug: "node20-keep-a-nodejs-application-responsive",
  code: "NODE-20",
  title: "Keep a Node.js Application Responsive",
  subtitle: "Keep Node.js responsive by using asynchronous I/O and preventing long CPU calculations from blocking the event loop.",
  difficulty: "Moderate",
  scenario: {
    question: "Your API becomes slow when it processes a large calculation. Will changing the function to async automatically fix the problem?",
    answer: "No. The calculation still blocks the JavaScript thread if it runs synchronously. Measure the issue, improve the algorithm, or move suitable CPU-heavy work to a worker thread or another process.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "Real-World Scenarios & Practice", tag: "SCENARIOS & PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Keep a Node.js Application Responsive",
    bigPicture:
      "A Node.js server can handle many I/O operations efficiently, but long CPU-heavy work can block its main JavaScript thread. Keep request handlers focused and avoid doing unnecessary work for every request.",
    codeSnippet: `// Prefer asynchronous file operations in a request handler.
import { readFile } from "node:fs/promises";

async function readMessage() {
  return readFile("./message.txt", "utf8");
}`,
    breakdownTitle: "What to remember",
    breakdownItems: [
      {
        title: "1. Prefer async I/O",
        desc: "Prefer async I/O for operations such as reading files or making network requests in normal server flows.",
      },
      {
        title: "2. Avoid repeating expensive work",
        desc: "Avoid repeating expensive work if a safe, correct reuse strategy is available.",
      },
      {
        title: "3. Measure before optimizing",
        desc: "Measure before optimizing. A slow database query, large response, or CPU-heavy function can each cause different problems.",
      },
      {
        title: "4. Worker threads for CPU work",
        desc: "For CPU-heavy work, consider whether it belongs in a worker thread or separate process, but learn those APIs only when you need them.",
      },
    ],
  },
  part2: {
    title: "Async vs Synchronous CPU Work",
    intro:
      "Do not assume that adding `async` makes CPU-heavy work non-blocking. An `async` function can still run a long synchronous loop that blocks the event loop.",
    rule: {
      title: "Responsiveness Rule",
      content:
        "An `async` keyword simply wraps a function in a Promise. It does not spawn background threads. Any synchronous `for` loop inside an async function still runs directly on the single JavaScript thread and blocks all other traffic until finished.",
    },
    cards: [
      {
        number: "01",
        tag: "ASYNC I/O",
        title: "Asynchronous I/O",
        description:
          "Keep network requests, file reads, and database queries asynchronous so other requests can be served.",
        color: "emerald",
      },
      {
        number: "02",
        tag: "PROFILING",
        title: "Measure Before Optimizing",
        description:
          "Identify whether bottlenecks stem from database queries, oversized payloads, or CPU computations.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "WORKERS",
        title: "Worker Threads",
        description:
          "Offload heavy cryptography, compression, or mathematical operations to background worker threads.",
        color: "purple",
      },
    ],
  },
  part3: {
    title: "Scenario & CPU Optimization Strategies",
    intro: "Diagnosing and fixing single-thread CPU performance bottlenecks:",
    points: [
      {
        title: "The Async Illusion",
        content:
          "Simply putting `async` in front of a CPU-intensive calculation does not make it run on another thread. It executes synchronously on the main thread during that event loop turn.",
      },
      {
        title: "Real Remediation Options",
        content:
          "Profile the slow calculation, optimize the algorithm (e.g. from O(n²) to O(n)), or offload to a Node.js `worker_threads` worker.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Adding `async` to a CPU-heavy loop and assuming the server is now non-blocking.",
    bad: {
      title: "Thinking async Makes Loops Non-Blocking",
      code: `// Bug: Still blocks the thread completely for 3 seconds!\nasync function calculateHash(data) {\n  for (let i = 0; i < 1e9; i++) { /* CPU loop */ }\n  return "hash";\n}`,
      explanation:
        "The async keyword does not create background threads. The loop freezes all server requests.",
    },
    good: {
      title: "Offloading or Breaking Up Heavy Work",
      code: `// Efficient: Asynchronous I/O or worker thread\nimport { Worker } from "node:worker_threads";\n\nfunction runWorker(data) {\n  return new Promise((resolve, reject) => {\n    const worker = new Worker("./calc-worker.js", { workerData: data });\n    worker.on("message", resolve);\n    worker.on("error", reject);\n  });\n}`,
      explanation:
        "Worker threads run CPU computations on a separate thread, keeping the main server responsive.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Examine execution timing of operations:",
    starterCode: `console.time("Computation");\n\n// Fast, efficient array manipulation\nconst items = Array.from({ length: 1000 }, (_, i) => i + 1);\nconst sum = items.reduce((acc, n) => acc + n, 0);\n\nconsole.timeEnd("Computation");\nconsole.log("Calculated sum:", sum);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Your API becomes slow when it processes a large calculation. Will changing the function to async automatically fix the problem?",
      options: [
        "No. The calculation still blocks the JavaScript thread if it runs synchronously. Measure the issue, improve the algorithm, or move suitable CPU-heavy work to a worker thread or another process.",
        "Yes, async automatically creates a new CPU core thread for the calculation.",
        "Yes, Node.js will pause the calculation whenever a new request arrives.",
        "No, because Node.js does not support async functions on servers.",
      ],
      correctIndex: 0,
      explanation:
        "Adding async does not move CPU work to a background thread. Synchronous loops inside async functions still block the single main JavaScript thread.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Keep Handlers Focused",
        desc: "A Node.js server handles many I/O operations efficiently, but CPU work blocks the main thread.",
      },
      {
        title: "Measure Before Optimizing",
        desc: "Measure before optimizing; a slow query, large response, or CPU function cause different issues.",
      },
      {
        title: "Do Not Rely on async Alone",
        desc: "Adding async does not make CPU-heavy work non-blocking; use worker threads or optimize algorithms.",
      },
    ],
  },
};
