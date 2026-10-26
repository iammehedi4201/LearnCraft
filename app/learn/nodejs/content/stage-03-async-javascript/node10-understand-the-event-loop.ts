import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node10UnderstandTheEventLoopContent: StandardLessonContent = {
  slug: "node10-understand-the-event-loop",
  code: "NODE-10",
  title: "Understand the Event Loop",
  subtitle: "The event loop helps Node.js run callbacks for timers and completed asynchronous operations without blocking.",
  difficulty: "Difficult",
  scenario: {
    question: "One request runs a very long loop, and other requests become slow. Why?",
    answer: "The loop keeps the JavaScript thread busy, so the event loop cannot handle other callbacks until the loop finishes. The work may need to be optimized or moved to a worker thread or separate process.",
  },
  interviewQuestion: {
    question: "What does the Node.js event loop do?",
    answer: "It helps Node.js run callbacks for timers and completed asynchronous operations, so the process can handle I/O without waiting idly for every operation to finish.",
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
    title: "Understand the Event Loop",
    bigPicture:
      "Node.js can wait for I/O, such as file reads and network responses, without stopping JavaScript from doing all other work. The event loop helps Node.js run callbacks when asynchronous work is ready. You do not need to memorize every event-loop phase at first.",
    codeSnippet: `console.log("First");

setTimeout(() => {
  console.log("Timer callback");
}, 0);

console.log("Second");

// Expected output:
// First
// Second
// Timer callback`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Current synchronous code",
        desc: "Node.js runs the current JavaScript statement and prints `First`.",
      },
      {
        title: "2. Schedule timer callback",
        desc: "`setTimeout()` schedules a callback. A delay of `0` does not mean the callback runs immediately.",
      },
      {
        title: "3. Continue execution",
        desc: "Node.js continues the current code and prints `Second`.",
      },
      {
        title: "4. Event loop execution",
        desc: "When the timer callback becomes eligible and the event loop can run it, `Timer callback` prints.",
      },
    ],
  },
  part2: {
    title: "CPU-Heavy Work vs Waiting for I/O",
    intro:
      "The event loop does not make CPU-heavy JavaScript disappear. A long calculation on the main JavaScript thread can still delay other callbacks. For now, focus on the difference between waiting for I/O and doing long CPU work.",
    rule: {
      title: "I/O vs CPU Execution Rule",
      content:
        "The event loop excels at waiting for I/O (disks, databases, network sockets) without blocking. But CPU-intensive JavaScript runs directly on the main thread and will block all other event loop callbacks until finished.",
    },
    cards: [
      {
        number: "01",
        tag: "EVENT LOOP",
        title: "Event Loop Coordination",
        description:
          "Checks timers, processes pending I/O callbacks, and runs idle handlers continuously.",
        color: "purple",
      },
      {
        number: "02",
        tag: "I/O WAITING",
        title: "Non-Blocking I/O",
        description:
          "While waiting for database responses or file reads, Node.js can serve hundreds of other user requests.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "CPU WORK",
        title: "Main Thread CPU Work",
        description:
          "Long synchronous loops keep the thread busy, starving all other callbacks from executing.",
        color: "amber",
      },
    ],
  },
  part3: {
    title: "Scenario & Selected Interview Question",
    intro: "Understanding event loop behavior and answering architecture interview questions:",
    points: [
      {
        title: "Single Thread Saturation",
        content:
          "When a request triggers a million-iteration synchronous calculation, no timers or network events can run until that calculation completes.",
      },
      {
        title: "Worker Threads or Separate Processes",
        content:
          "Heavy calculations (image processing, cryptography, heavy math) should be offloaded to worker threads or independent background workers.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Believing `setTimeout(fn, 0)` executes immediately before synchronous code finishes running.",
    bad: {
      title: "Assuming Immediate Zero-Delay Execution",
      code: `let status = "initial";\nsetTimeout(() => { status = "ready"; }, 0);\n// Expecting status to be "ready" immediately:\nconsole.log(status); // Still "initial"!`,
      explanation:
        "Timer callbacks cannot run until the current synchronous execution turn completely finishes.",
    },
    good: {
      title: "Understanding Callback Ordering",
      code: `let status = "initial";\nsetTimeout(() => {\n  status = "ready";\n  console.log("Async Callback:", status); // "ready"\n}, 0);\nconsole.log("Synchronous:", status); // "initial"`,
      explanation:
        "Synchronous code finishes first, then the event loop processes eligible timer callbacks.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Observe event loop ordering with timers:",
    starterCode: `console.log("First");\n\nsetTimeout(() => {\n  console.log("Timer callback (0ms)");\n}, 0);\n\nconsole.log("Second");`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "One request runs a very long loop, and other requests become slow. Why?",
      options: [
        "The loop keeps the JavaScript thread busy, so the event loop cannot handle other callbacks until the loop finishes. The work may need to be optimized or moved to a worker thread or separate process.",
        "Node.js runs out of virtual memory because the event loop terminates.",
        "The browser closes the TCP connection due to DNS failure.",
        "The event loop automatically restarts the Node.js process.",
      ],
      correctIndex: 0,
      explanation:
        "Because Node.js runs JavaScript on a single thread, a long synchronous loop occupies the thread and prevents the event loop from running other callbacks.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Event Loop Purpose",
        desc: "Helps Node.js run callbacks for timers and completed asynchronous operations without waiting idly.",
      },
      {
        title: "Non-Zero Delays",
        desc: "A setTimeout delay of 0 schedules the callback for the next event loop turn after synchronous code finishes.",
      },
      {
        title: "CPU Bound Work",
        desc: "The event loop does not eliminate CPU work; long loops block the thread and must be optimized or moved to worker threads.",
      },
    ],
  },
};
