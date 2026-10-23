import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js20SynchronousVsAsynchronousContent: StandardLessonContent = {
  slug: "js20-synchronous-vs-asynchronous",
  code: "JS-20",
  title: "How Async Code Works",
  subtitle: "Understand how JavaScript runs non-blocking asynchronous operations on a single thread using timers and background APIs.",
  sections: [
    {
      id: "part1",
      label: "How Async Works",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "Sync vs Async",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Async Execution Order",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "setTimeout(0) Misconception",
      icon: "🛡️",
      tag: "COMMON PITFALL"
    },
    {
      id: "part5",
      label: "Code Playground",
      icon: "💻",
      tag: "PLAYGROUND"
    },
    {
      id: "part6",
      label: "Key Takeaways",
      icon: "🎓",
      tag: "KEY TAKEAWAYS"
    },
    {
      id: "part7",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT"
    }
  ],
  part1: {
    title: "How Async Code Works",
    bigPicture: "JavaScript is single-threaded. Synchronous code blocks execution until finished, while asynchronous operations (like timers and network fetches) run in the background without freezing the UI.",
    breakdownTitle: "Key Async Concepts",
    breakdownItems: [
      {
        title: "Synchronous (Blocking)",
        desc: "Each line executes in order and blocks further progress until it finishes."
      },
      {
        title: "Asynchronous (Non-Blocking)",
        desc: "Long-running tasks are offloaded to background Web APIs, leaving the UI fast and responsive."
      },
      {
        title: "Single Main Thread",
        desc: "Only one piece of JavaScript runs at a time, eliminating multithreading race condition issues."
      }
    ]
  },
  part2: {
    title: "Synchronous vs Asynchronous Operations",
    intro: "Observe the difference between immediate execution and delayed callbacks.",
    cards: [
      {
        number: "01",
        tag: "Synchronous",
        title: "Synchronous Line by Line",
        description: "Statements run sequentially in the order written, finishing each before moving forward.",
        codeSnippet: "console.log(\"First\");\nconsole.log(\"Second\");\nconsole.log(\"Third\");\n// Output:\n// First\n// Second\n// Third",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Asynchronous",
        title: "Asynchronous Timer (setTimeout)",
        description: "The timer counts down in the background while the rest of your program keeps running.",
        codeSnippet: "console.log(\"A\");\nsetTimeout(() => {\n  console.log(\"B (after 100ms)\");\n}, 100);\nconsole.log(\"C\");\n// Output: A, C, B",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Callback",
        title: "Handling the Result",
        description: "A callback function is handed to the async operation to be called when the task completes.",
        codeSnippet: "function delayedGreeting(name, callback) {\n  setTimeout(() => {\n    callback(`Welcome, ${name}!`);\n  }, 50);\n}\ndelayedGreeting(\"Alex\", console.log);",
        color: "purple"
      }
    ],
    rule: {
      title: "The Non-Blocking Rule",
      content: "Never write heavy infinite loops or blocking operations on the main thread. Always use asynchronous APIs for network requests and delays."
    }
  },
  part3: {
    title: "Tracing Async Execution Order",
    intro: "Step through how JavaScript schedules lines when asynchronous timers are involved.",
    points: [
      {
        title: "Step 1: Synchronous Code Runs First",
        content: "All immediate synchronous lines run to completion first.",
        codeSnippet: "console.log(\"Step 1: Main program begins\");"
      },
      {
        title: "Step 2: Timers are Offloaded to Background",
        content: "When setTimeout is encountered, JavaScript tells the browser timer to start ticking and moves to the next line immediately.",
        codeSnippet: "setTimeout(() => {\n  console.log(\"Step 3: Background timer finished\");\n}, 200);\nconsole.log(\"Step 2: Main program ends\");\n// Output: Step 1, Step 2, then Step 3!"
      },
      {
        title: "Step 3: Callbacks Wait in Line",
        content: "When the timer completes, its callback waits in a queue until all currently running synchronous code has finished.",
        codeSnippet: "// Even if the timer expires instantly, the current script finishes first!"
      }
    ]
  },
  part4: {
    title: "Common Trap: The setTimeout(..., 0) Misconception",
    bad: {
      title: "❌ Expecting setTimeout(..., 0) to Run Immediately",
      code: "console.log(\"1: Start\");\nsetTimeout(() => {\n  console.log(\"2: Timer with 0ms\");\n}, 0);\nconsole.log(\"3: End\");\n// Mistake: Expecting 1, 2, 3!",
      explanation: "Even with 0 milliseconds, setTimeout sends its callback to the task queue. JavaScript will NEVER run a queued callback until the main synchronous script has completely finished."
    },
    good: {
      title: "✅ Understand the Actual Output: 1, 3, 2",
      code: "console.log(\"1: Start\");\nsetTimeout(() => {\n  console.log(\"2: Timer with 0ms\");\n}, 0);\nconsole.log(\"3: End\");\n// Actual Output:\n// 1: Start\n// 3: End\n// 2: Timer with 0ms",
      explanation: "Synchronous code always has priority over queued callbacks, regardless of the timer delay."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Run this code to see JavaScript finish synchronous execution before any timer callbacks fire.",
    starterCode: "console.log(\"--- [1] Program execution started ---\");\n\n// Schedule a background task:\nsetTimeout(() => {\n  console.log(\"--- [3] Async timer callback executed! ---\");\n}, 100);\n\nconsole.log(\"--- [2] Synchronous code finished ---\");\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "JavaScript is Single-Threaded",
        desc: "Executes one task at a time on the main thread; long waits must be asynchronous."
      },
      {
        title: "Async Doesn't Block",
        desc: "Background tasks allow the rest of your code and UI to stay responsive."
      },
      {
        title: "Synchronous Runs First",
        desc: "All immediate synchronous lines finish before any queued callback can run."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the output order of: console.log('A'); setTimeout(() => console.log('B'), 0); console.log('C');?",
      options: [
        "'A', 'C', 'B'",
        "'A', 'B', 'C'",
        "'B', 'A', 'C'",
        "'C', 'B', 'A'"
      ],
      correctIndex: 0,
      explanation: "JavaScript executes synchronous code first ('A', then 'C'). The setTimeout callback is placed in the task queue and only executes after the current synchronous code finishes ('B')."
    }
  }
};
