import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node08SynchronousVsAsynchronousWorkContent: StandardLessonContent = {
  slug: "node08-synchronous-vs-asynchronous-work",
  code: "NODE-08",
  title: "Synchronous vs. Asynchronous Work",
  subtitle: "Synchronous work blocks execution, while asynchronous work lets Node.js continue other work while waiting for I/O.",
  difficulty: "Moderate",
  scenario: {
    question: "A server reads a large file synchronously for every request. What could happen?",
    answer: "Each synchronous read can block the JavaScript thread, delaying other requests. An asynchronous file API is usually a better choice for this work.",
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
    title: "Synchronous vs. Asynchronous Work",
    bigPicture:
      "Synchronous work finishes before the next statement runs. Asynchronous work lets Node.js continue other work while it waits for something such as a file or network response.",
    codeSnippet: `import { readFile } from "node:fs/promises";

console.log("1. Start");

const text = await readFile("./notes.txt", "utf8");
console.log("2. File loaded");

console.log("3. Finish");`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. First message",
        desc: "The first message (`1. Start`) prints immediately.",
      },
      {
        title: "2. Non-blocking await",
        desc: "Node.js starts reading the file. `await` pauses this async function until the read finishes; it does not block the whole Node.js process in the way a synchronous read would.",
      },
      {
        title: "3. Read complete",
        desc: "After the file is read, the second message (`2. File loaded`) prints.",
      },
      {
        title: "4. Completion",
        desc: "The third message (`3. Finish`) prints last in this example.",
      },
    ],
  },
  part2: {
    title: "Thread Non-Blocking Principles",
    intro:
      "The exact time the file takes depends on the system. Avoid synchronous file operations in request handling when they could pause other work.",
    rule: {
      title: "Non-Blocking I/O Rule",
      content:
        "Node.js runs your JavaScript on a single thread. Always prefer asynchronous APIs for I/O operations (files, network, database) so other concurrent requests remain fast and responsive.",
    },
    cards: [
      {
        number: "01",
        tag: "SYNCHRONOUS",
        title: "Synchronous Blocking",
        description:
          "Halts all execution on the JavaScript thread until the operating system finishes the disk or network operation.",
        color: "rose",
      },
      {
        number: "02",
        tag: "ASYNCHRONOUS",
        title: "Asynchronous Non-Blocking",
        description:
          "Delegates I/O to the operating system/libuv and allows Node.js to serve other requests in the meantime.",
        color: "emerald",
      },
      {
        number: "03",
        tag: "CONCURRENCY",
        title: "Single-Threaded Scale",
        description:
          "Enables Node.js servers to efficiently handle thousands of concurrent connections with minimal overhead.",
        color: "cyan",
      },
    ],
  },
  part3: {
    title: "Scenario & Performance Tradeoffs",
    intro: "Understanding the real-world impact of blocking file reads on web servers:",
    points: [
      {
        title: "Single-Thread Bottlenecks",
        content:
          "Because Node.js executes JavaScript on a single main thread, synchronous methods like `fs.readFileSync()` freeze the entire process. No other user can receive a response until that file read finishes.",
      },
      {
        title: "Asynchronous File APIs",
        content:
          "Using `node:fs/promises` allows Node.js to register an asynchronous callback or promise fulfillment, freeing the thread to process incoming network traffic.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Using synchronous `readFileSync` inside request handlers or loops stalls the entire server for all connected clients.",
    bad: {
      title: "Synchronous Read in Server Flow",
      code: `import fs from "node:fs";\n\n// Blocks all users while disk reads!\nfunction handleRequest(req, res) {\n  const config = fs.readFileSync("./config.json", "utf8");\n  res.end(config);\n}`,
      explanation:
        "Every incoming request blocks all other users until the disk read finishes.",
    },
    good: {
      title: "Asynchronous Read with fs/promises",
      code: `import { readFile } from "node:fs/promises";\n\n// Non-blocking: Server continues handling other requests\nasync function handleRequest(req, res) {\n  const config = await readFile("./config.json", "utf8");\n  res.end(config);\n}`,
      explanation:
        "The async function yields during the read, keeping the server responsive.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Observe simulated asynchronous execution order:",
    starterCode: `console.log("1. Start");\n\n// Simulating async operation with setTimeout\nsetTimeout(() => {\n  console.log("2. Async operation completed");\n}, 100);\n\nconsole.log("3. Finish synchronous execution");`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "A server reads a large file synchronously for every request. What could happen?",
      options: [
        "Each synchronous read can block the JavaScript thread, delaying other requests. An asynchronous file API is usually a better choice for this work.",
        "The server automatically creates 10 background threads to handle the file.",
        "Node.js converts synchronous reads into async network requests automatically.",
        "Nothing happens, synchronous code is always faster in Node.js.",
      ],
      correctIndex: 0,
      explanation:
        "Synchronous reads block the single JavaScript thread, freezing the server and delaying all other concurrent user requests.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Synchronous Work",
        desc: "Finishes before the next statement runs and blocks the main JavaScript thread.",
      },
      {
        title: "Asynchronous Work",
        desc: "Lets Node.js continue other work while waiting for file or network I/O.",
      },
      {
        title: "Non-Blocking APIs",
        desc: "Avoid synchronous file operations in request handling to keep your application responsive.",
      },
    ],
  },
};
