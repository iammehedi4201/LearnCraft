import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js23TheEventLoopContent: StandardLessonContent = {
  slug: "js23-the-event-loop",
  code: "JS-23",
  title: "How the Event Loop Works",
  subtitle: "Master the internal concurrency model of the Event Loop, understand Microtask Queue vs Task Queue priority, and prevent thread starvation.",
  sections: [
    {
      id: "part1",
      label: "Event Loop Architecture",
      icon: "🔄",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "Microtasks vs Macrotasks",
      icon: "⚖️",
      tag: "PRIORITY"
    },
    {
      id: "part3",
      label: "Prediction Challenge",
      icon: "🧠",
      tag: "STEP BY STEP"
    },
    {
      id: "part4",
      label: "Microtask Starvation",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Event Loop Sandbox",
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
    title: "The Heartbeat of JavaScript Concurrency",
    bigPicture: "The Event Loop is an endless loop running inside the JavaScript engine. Its sole job is to monitor the Call Stack and determine exactly when queued tasks and promises are allowed to execute.",
    analogy: "Like an airport runway controller: the runway (Call Stack) can only hold one airplane at a time. The controller prioritizes urgent medical flights (Microtasks) before clearing scheduled commercial passenger flights (Macrotasks).",
    diagram: "+---------------------------------------------------+\n|  1. CALL STACK: Runs synchronous code until empty |\n+---------------------------------------------------+\n                          |\n                          v\n+---------------------------------------------------+\n|  2. MICROTASKS: Drain ALL Promises & microtasks   |\n|     (Runs until Microtask Queue is completely 0!) |\n+---------------------------------------------------+\n                          |\n                          v\n+---------------------------------------------------+\n|  3. BROWSER RENDER: Repaints UI updates           |\n+---------------------------------------------------+\n                          |\n                          v\n+---------------------------------------------------+\n|  4. TASK QUEUE: Runs ONE Macrotask (setTimeout)   |\n+---------------------------------------------------+\n                          |\n                          +--> REPEAT LOOP FOREVER",
    breakdownTitle: "Queue Priorities",
    breakdownItems: [
      {
        title: "Call Stack (Immediate)",
        desc: "Synchronous statements run immediately and run to completion without interruption."
      },
      {
        title: "Microtask Queue (High Priority)",
        desc: "Promise.then, queueMicrotask, MutationObserver. The engine empties the entire microtask queue before touching macrotasks."
      },
      {
        title: "Task Queue (Normal Priority)",
        desc: "setTimeout, setInterval, I/O callbacks, and DOM event handlers. Only one task is executed per Event Loop tick."
      }
    ]
  },
  part2: {
    title: "Microtasks vs Macrotasks in Detail",
    intro: "Step through how different async APIs are prioritized by the Event Loop.",
    cards: [
      {
        number: "01",
        tag: "Microtask",
        title: "Microtask (Promise.then)",
        description: "Executes immediately after the current synchronous script, before any macrotasks or UI renders.",
        codeSnippet: "Promise.resolve().then(() => {\n  console.log(\"Microtask: High Priority\");\n});",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Macrotask",
        title: "Macrotask (setTimeout)",
        description: "Enqueued in the Task Queue. Runs only after all pending microtasks have finished.",
        codeSnippet: "setTimeout(() => {\n  console.log(\"Macrotask: Normal Priority\");\n}, 0);",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Native API",
        title: "queueMicrotask()",
        description: "Standard API to schedule an explicit microtask without creating a Promise.",
        codeSnippet: "queueMicrotask(() => {\n  console.log(\"Explicit microtask executed\");\n});",
        color: "purple"
      }
    ],
    rule: {
      title: "The Drain Rule",
      content: "The Event Loop will NEVER pick a Macrotask (setTimeout) from the Task Queue until the Microtask Queue is 100% drained and empty."
    }
  },
  part3: {
    title: "The Classic Event Loop Prediction Challenge",
    intro: "Trace how the engine sequences logs across the Call Stack, Microtasks, and Macrotasks.",
    points: [
      {
        title: "The Canonical Interview Snippet",
        content: "What is the exact output order of this code?\n\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);",
        codeSnippet: "console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);\n// Output:\n// 1\n// 4\n// 3\n// 2"
      },
      {
        title: "Step-by-Step Reasoned Trace",
        content: "Step 1: console.log(1) runs on Call Stack -> prints 1.\nStep 2: setTimeout(..., 0) queues 2 into the Task Queue.\nStep 3: Promise.then queues 3 into the Microtask Queue.\nStep 4: console.log(4) runs on Call Stack -> prints 4.\nStep 5: Call Stack empty! Drain Microtask Queue -> prints 3.\nStep 6: Microtasks empty! Run one Macrotask -> prints 2.",
        codeSnippet: "// Order: Synchronous (1, 4) -> Microtasks (3) -> Macrotasks (2)"
      },
      {
        title: "Browser Frame Rendering",
        content: "Browser paints and animation frames (requestAnimationFrame) occur after microtasks drain and before subsequent macrotasks.",
        codeSnippet: "requestAnimationFrame(() => {\n  console.log(\"Rendering frame\");\n});"
      }
    ]
  },
  part4: {
    title: "The Danger of Microtask Starvation",
    bad: {
      title: "❌ Infinite Microtask Recursion Freezes the Page",
      code: "function starver() {\n  // Bug: Scheduling microtasks recursively drains the queue indefinitely!\n  // Because microtasks are prioritized, Macrotasks & UI never run!\n  Promise.resolve().then(starver);\n}\n// starver(); // UI completely freezes! Page becomes unresponsive!",
      explanation: "Because the Event Loop empties the entire microtask queue before rendering or running macrotasks, a recursive microtask starves the browser indefinitely."
    },
    good: {
      title: "✅ Use Macrotasks (setTimeout) to Yield Control",
      code: "function safeBatch(n) {\n  if (n <= 0) return;\n  console.log(\"Processing batch:\", n);\n  // Safe: setTimeout yields to browser rendering before running next batch\n  setTimeout(() => safeBatch(n - 1), 0);\n}\nsafeBatch(3);",
      explanation: "Using setTimeout yields control back to the Event Loop, allowing the browser to paint updates and handle user input between batches."
    }
  },
  part5: {
    title: "Event Loop Simulator Sandbox",
    intro: "Step through Call Stack, Microtask, and Macrotask execution order in the sandbox.",
    starterCode: "console.log(\"[1] Synchronous Script Start\");\n\nsetTimeout(() => {\n  console.log(\"[5] Macrotask (setTimeout 0ms)\");\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log(\"[3] Microtask 1 (Promise)\");\n}).then(() => {\n  console.log(\"[4] Microtask 2 (Chained Promise)\");\n});\n\nconsole.log(\"[2] Synchronous Script End\");\n"
  },
  part6: {
    title: "Key Takeaways: The Event Loop",
    takeaways: [
      {
        title: "Call Stack Runs First",
        desc: "All synchronous statements execute to completion before any queued callback runs."
      },
      {
        title: "Microtasks Drain First",
        desc: "Promises and microtasks always run before macrotasks (setTimeout) and UI repaints."
      },
      {
        title: "Prevent Starvation",
        desc: "Never run endless recursive microtasks; yield using setTimeout to keep UI responsive."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Given: `console.log('A'); setTimeout(() => console.log('B'), 0); Promise.resolve().then(() => console.log('C'));` — what is the output?",
      options: [
        "A, B, C",
        "A, C, B",
        "C, A, B",
        "B, C, A"
      ],
      correctIndex: 1,
      explanation: "'A' runs immediately on the Call Stack. The Promise callback 'C' is queued in the Microtask Queue. 'B' is queued in the Task Queue. Because microtasks have higher priority than task queues, 'C' executes before 'B', giving 'A, C, B'."
    }
  }
};
