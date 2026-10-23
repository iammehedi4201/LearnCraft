import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js23TheEventLoopContent: StandardLessonContent = {
  slug: "js23-the-event-loop",
  code: "JS-23",
  title: "How the Event Loop Works",
  subtitle: "Understand execution priority under the hood: the Call Stack, VIP Microtasks (Promises), and Macrotasks (Timers).",
  sections: [
    {
      id: "part1",
      label: "How Event Loop Works",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "Microtasks vs Macrotasks",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Execution Priority Trace",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Task Priority Trap",
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
    title: "How the Event Loop Works",
    bigPicture: "The Event Loop monitors the Call Stack. When the Call Stack is empty, it runs queued Microtasks (Promises) first, and then runs regular Tasks (like setTimeout).",
    breakdownTitle: "The Three Execution Levels",
    breakdownItems: [
      {
        title: "Call Stack (Synchronous)",
        desc: "Executes your current code line by line. Nothing async can run until this stack is empty."
      },
      {
        title: "Microtask Queue (Promises)",
        desc: "Promise `.then()` and `await` callbacks run immediately after synchronous code finishes."
      },
      {
        title: "Task Queue (Timers)",
        desc: "Callbacks from `setTimeout` wait until both the Call Stack and all Microtasks are cleared."
      }
    ]
  },
  part2: {
    title: "Call Stack, Microtasks, and Macrotasks",
    intro: "Step through how different asynchronous tasks are ranked by the engine.",
    cards: [
      {
        number: "01",
        tag: "Priority 1",
        title: "Synchronous Code (Call Stack)",
        description: "Executes immediately on the main thread from top to bottom.",
        codeSnippet: "console.log(\"Sync statement\");\n// Runs immediately!",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Priority 2",
        title: "Microtasks (Promises)",
        description: "VIP queue. Drains completely before any timer callbacks or screen repaints.",
        codeSnippet: "Promise.resolve().then(() => {\n  console.log(\"Microtask (Promise resolved)\");\n});",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Priority 3",
        title: "Macrotasks (Timers)",
        description: "Standard queue. Runs only after all pending microtasks have finished.",
        codeSnippet: "setTimeout(() => {\n  console.log(\"Macrotask (Timer finished)\");\n}, 0);",
        color: "purple"
      }
    ],
    rule: {
      title: "The Drain Rule",
      content: "The Event Loop will NEVER pick a Macrotask (setTimeout) from the Task Queue until the Microtask Queue is 100% empty."
    }
  },
  part3: {
    title: "The Classic Execution Trace: Call Stack vs Promises",
    intro: "Predicting the execution order of this famous JavaScript snippet.",
    points: [
      {
        title: "1. The Interview Snippet",
        content: "What is the exact console output order of the following code?\n\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);",
        codeSnippet: "console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);\n// Output: 1, 4, 3, 2"
      },
      {
        title: "2. Step-by-Step Reasoned Walkthrough",
        content: "• Step 1: console.log(1) runs on the Call Stack -> prints 1.\n• Step 2: setTimeout queues '2' into the Task Queue.\n• Step 3: Promise.then queues '3' into the Microtask Queue.\n• Step 4: console.log(4) runs on the Call Stack -> prints 4.\n• Step 5: Stack is empty! Drain Microtasks -> prints 3.\n• Step 6: Microtasks empty! Run Macrotask -> prints 2.",
        codeSnippet: "// Order: Synchronous (1, 4) -> Microtasks (3) -> Macrotasks (2)"
      },
      {
        title: "3. Why This Matters in Production",
        content: "Understanding this priority explains why state updates in Promise chains (or React hooks) always resolve before setTimeout callbacks execute.",
        codeSnippet: "// Microtasks keep UI logic fresh before timer tasks run"
      }
    ]
  },
  part4: {
    title: "Common Trap: Assuming setTimeout(0) Runs Before Microtasks",
    bad: {
      title: "❌ Assuming 0ms Timer Runs First",
      code: "setTimeout(() => console.log(\"Timer finished\"), 0);\nPromise.resolve().then(() => console.log(\"Promise resolved\"));\n// Mistake: Expecting Timer to beat Promise because 0ms sounds instant!",
      explanation: "Even with 0 milliseconds delay, setTimeout callbacks are Macrotasks. Promise callbacks are Microtasks and ALWAYS run first."
    },
    good: {
      title: "✅ Understand Microtask VIP Priority",
      code: "setTimeout(() => console.log(\"Timer finished\"), 0);\nPromise.resolve().then(() => console.log(\"Promise resolved\"));\n// Actual Output:\n// Promise resolved\n// Timer finished",
      explanation: "The Event Loop always drains the entire Microtask Queue before running tasks from the Timer queue."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Run the canonical interview prediction snippet in the live runtime to observe output order.",
    starterCode: "// The classic JavaScript Event Loop interview question:\nconsole.log(\"1: Synchronous start\");\n\nsetTimeout(() => {\n  console.log(\"4: Macrotask (setTimeout callback)\");\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log(\"3: Microtask (Promise .then callback)\");\n});\n\nconsole.log(\"2: Synchronous end\");\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Synchronous Runs First",
        desc: "All code on the Call Stack runs to completion before any asynchronous queues are checked."
      },
      {
        title: "Promises Have VIP Priority",
        desc: "Microtasks (Promises) drain completely before macrotasks (timers) can run."
      },
      {
        title: "Timers Run Last",
        desc: "Even setTimeout(..., 0) waits for the stack and microtask queue to be empty."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Between a resolved Promise callback and a setTimeout(..., 0) callback, which one will execute first after the Call Stack empties?",
      options: [
        "The Promise callback, because microtasks always run before macrotasks",
        "The setTimeout callback, because 0 milliseconds executes immediately",
        "They execute simultaneously on two parallel threads",
        "Whichever one was written first in the source file"
      ],
      correctIndex: 0,
      explanation: "Promises place their callbacks in the Microtask Queue, while setTimeout places its callback in the Task Queue. The Event Loop prioritizes and completely drains the Microtask Queue before processing any tasks from the Task Queue."
    }
  }
};
