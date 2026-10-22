import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js20SynchronousVsAsynchronousContent: StandardLessonContent = {
  slug: "js20-synchronous-vs-asynchronous",
  code: "JS-20",
  title: "How Async Code Works",
  subtitle: "Understand how JavaScript runs non-blocking asynchronous operations on a single thread using the Call Stack, Web APIs, and Task Queues.",
  sections: [
    {
      id: "part1",
      label: "Non-Blocking Architecture",
      icon: "⏳",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "The Moving Parts",
      icon: "⚙️",
      tag: "ENGINE ARCHITECTURE"
    },
    {
      id: "part3",
      label: "The setTimeout(0) Secret",
      icon: "🧠",
      tag: "STEP BY STEP"
    },
    {
      id: "part4",
      label: "Blocking Thread Trap",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Async Sandbox",
      icon: "🚀",
      tag: "PRACTICE"
    },
    {
      id: "part6",
      label: "Core Takeaways",
      icon: "🎓",
      tag: "SUMMARY"
    },
    {
      id: "part7",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT"
    }
  ],
  part1: {
    title: "How Single-Threaded JavaScript Doesn't Freeze",
    bigPicture: "JavaScript has only one main thread. If network requests or file reads ran synchronously, the entire browser would freeze until the request finished. Instead, JavaScript delegates waiting to the browser environment (Web APIs), keeping the main thread free.",
    analogy: "Like ordering at a coffee shop: you place your order, receive a buzzer (callback), and step aside so the cashier can take the next customer. When your drink is ready, your buzzer rings and your coffee is handed over.",
    diagram: "+--------------------------------------------------------+\n| 1. Call Stack: console.log(\"Start\");                   |\n|    --> Prints immediately                              |\n+--------------------------------------------------------+\n| 2. Call Stack: setTimeout(callback, 2000);             |\n|    --> Offloads timer to Web API in background!        |\n|    --> Call Stack is immediately FREE for next line!   |\n+--------------------------------------------------------+\n| 3. Call Stack: console.log(\"End\");                     |\n|    --> Prints immediately                              |\n+--------------------------------------------------------+\n| 4. (2000ms later) Web API pushes callback to Queue     |\n|    --> Event Loop pushes it to Stack when empty!       | \n+--------------------------------------------------------+",
    breakdownTitle: "Async Architecture",
    breakdownItems: [
      {
        title: "Synchronous (Blocking)",
        desc: "Each statement must finish completely before the next statement begins. Heavy operations block user clicks and screen rendering."
      },
      {
        title: "Asynchronous (Non-Blocking)",
        desc: "Operations like timers, network requests, and disk reads are handled concurrently by browser/Node APIs in the background."
      },
      {
        title: "The Callback Queue",
        desc: "When an async operation finishes, its completion callback waits in a queue until the main Call Stack is completely clear."
      }
    ]
  },
  part2: {
    title: "The Components of Asynchronous JavaScript",
    intro: "Step through how the Call Stack and browser APIs cooperate.",
    cards: [
      {
        number: "01",
        tag: "Call Stack",
        title: "The Call Stack",
        description: "Executes JavaScript code line by line. Can only do one task at a time.",
        codeSnippet: "console.log(\"1: Call stack runs\");\nconsole.log(\"2: Call stack finishes\");\n// Output:\n// 1: Call stack runs\n// 2: Call stack finishes",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Web APIs",
        title: "Browser Web APIs",
        description: "Background threads provided by the browser (timers, fetch, DOM events).",
        codeSnippet: "// setTimeout is handled by the browser's timer thread:\nsetTimeout(() => {\n  console.log(\"Timer expired in Web API\");\n}, 1000);",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Task Queue",
        title: "The Task Queue",
        description: "Holds completed callbacks waiting to enter the Call Stack.",
        codeSnippet: "console.log(\"A\");\nsetTimeout(() => console.log(\"B (from queue)\"), 0);\nconsole.log(\"C\");\n// Output: A, C, B (Queue must wait for stack to empty!)",
        color: "purple"
      }
    ],
    rule: {
      title: "The Non-Interruption Invariant",
      content: "A callback waiting in the queue can NEVER interrupt code currently executing on the Call Stack. It must wait until the stack is completely empty."
    }
  },
  part3: {
    title: "The Secret of setTimeout(..., 0)",
    intro: "Why a zero-millisecond timer does not execute immediately.",
    points: [
      {
        title: "1. Handed Off to Web API",
        content: "Calling setTimeout(fn, 0) asks the browser to queue fn as soon as possible. But it still must go through the Web API and Task Queue.",
        codeSnippet: "setTimeout(() => console.log(\"Async Timeout\"), 0);\nconsole.log(\"Synchronous Line\");\n// Output:\n// Synchronous Line\n// Async Timeout"
      },
      {
        title: "2. The Call Stack Has Priority",
        content: "Even with a delay of 0ms, the callback cannot run until all synchronous code in the current script has finished running.",
        codeSnippet: "console.log(\"Start\");\nsetTimeout(() => console.log(\"Timeout callback\"), 0);\nfor (let i = 0; i < 3; i++) {\n  console.log(\"Loop item:\", i);\n}\nconsole.log(\"End\");\n// Output: Start, Loop 0, 1, 2, End, Timeout callback"
      },
      {
        title: "3. Yielding the Thread",
        content: "Developers historically used setTimeout(..., 0) to yield execution and allow browser rendering before continuing heavy calculations.",
        codeSnippet: "// Defers calculation to let the browser paint updates:\nsetTimeout(() => {\n  // Run background calculation\n}, 0);"
      }
    ]
  },
  part4: {
    title: "Common Pitfall: Blocking the Main Thread with Synchronous Work",
    bad: {
      title: "❌ Heavy Synchronous Sleep Freezes the Entire Page",
      code: "function synchronousSleep(ms) {\n  // Bug: Busy-wait loop hogs the Call Stack completely!\n  const start = Date.now();\n  while (Date.now() - start < ms) {\n    // Browser freezes! Clicks, animations, typing are blocked!\n  }\n}\nconsole.log(\"Before sleep\");\nsynchronousSleep(3000); // 3 seconds of frozen UI\nconsole.log(\"After sleep\");",
      explanation: "A synchronous loop monopolizes the single Call Stack thread, completely freezing UI rendering and user interactions."
    },
    good: {
      title: "✅ Use Non-Blocking Asynchronous Timers",
      code: "console.log(\"Before non-blocking timer\");\n// Safe: Browser timer thread waits in background, keeping page responsive\nsetTimeout(() => {\n  console.log(\"3 seconds elapsed non-blockingly!\");\n}, 3000);\nconsole.log(\"Page remains responsive and clickable!\");",
      explanation: "Asynchronous timers offload the waiting period to the browser environment, allowing the main thread to remain fully responsive."
    }
  },
  part5: {
    title: "Async vs Sync Sandbox",
    intro: "Predict the exact order in which these logs will print before clicking Run.",
    starterCode: "console.log(\"1. Synchronous First\");\n\nsetTimeout(() => {\n  console.log(\"4. Timer (0ms delay)\");\n}, 0);\n\nsetTimeout(() => {\n  console.log(\"5. Timer (100ms delay)\");\n}, 100);\n\nconsole.log(\"2. Synchronous Second\");\nconsole.log(\"3. Synchronous Third\");\n"
  },
  part6: {
    title: "Key Takeaways: Sync vs Async",
    takeaways: [
      {
        title: "Single Main Thread",
        desc: "JavaScript executes one instruction at a time on its Call Stack."
      },
      {
        title: "Non-Blocking Web APIs",
        desc: "Timers and network requests wait in the browser background without blocking the UI."
      },
      {
        title: "Queue Waits for Stack",
        desc: "Queued callbacks cannot run until the Call Stack is completely clear of synchronous work."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why does `setTimeout(() => console.log('B'), 0)` execute after `console.log('A')`?",
      options: [
        "Because setTimeout has a built-in minimum delay of 10 seconds",
        "Because the callback is placed in the Task Queue and cannot run until the synchronous Call Stack is empty",
        "Because JavaScript reverses the order of asynchronous functions",
        "Because 'A' is stored in heap memory while 'B' is in stack memory"
      ],
      correctIndex: 1,
      explanation: "Even with a 0ms delay, `setTimeout` pushes its callback to the Task Queue. The Event Loop only moves items from the queue to the Call Stack after all synchronous statements have finished executing."
    }
  }
};
