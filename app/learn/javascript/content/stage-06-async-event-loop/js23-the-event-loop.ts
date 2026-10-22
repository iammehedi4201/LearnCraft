import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js23TheEventLoopContent: StandardLessonContent = {
  "slug": "js23-the-event-loop",
  "code": "JS-23",
  "title": "The Event Loop: Call Stack, Microtasks & Macrotasks",
  "subtitle": "Understand how JavaScript coordinates synchronous execution, promise microtasks, and timer macrotasks.",
  "sections": [
    {
      "id": "part1",
      "label": "Event Loop Anatomy",
      "icon": "🎡",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Queues & Priorities",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Execution Order & AI",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Starvation Pitfall",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Event Loop Sandbox",
      "icon": "🚀",
      "tag": "SANDBOX"
    },
    {
      "id": "part6",
      "label": "Key Takeaways",
      "icon": "🎓",
      "tag": "SUMMARY"
    },
    {
      "id": "part7",
      "label": "Knowledge Check",
      "icon": "🎯",
      "tag": "QUIZ"
    }
  ],
  "part1": {
    "title": "The Heartbeat of JavaScript",
    "bigPicture": "The Event Loop is the underlying engine mechanism that monitors the Call Stack and the Task Queues. When the Call Stack is completely empty, the Event Loop takes waiting callbacks and pushes them onto the stack.",
    "analogy": "Think of an air traffic controller. The runway (Call Stack) can only handle one plane at a time. The controller empties the emergency landing strip first (Microtasks), before letting regular flights take off (Macrotasks).",
    "diagram": "[ Call Stack ]  <--- Currently executing\n      ^\n      |  (When Call Stack is empty!)\n[ Microtask Queue ]  <--- Promises, queueMicrotask (HIGHEST PRIORITY)\n      ^\n      |  (When Microtasks are completely drained!)\n[ Macrotask Queue ]  <--- setTimeout, setInterval (LOWER PRIORITY)",
    "breakdownTitle": "The Three Execution Stages",
    "breakdownItems": [
      {
        "title": "1. The Call Stack",
        "desc": "Executes synchronous code immediately in last-in, first-out order."
      },
      {
        "title": "2. Microtask Queue (High Priority)",
        "desc": "Holds Promise callbacks and `queueMicrotask`. Must be completely empty before timers run."
      },
      {
        "title": "3. Macrotask Queue (Lower Priority)",
        "desc": "Holds `setTimeout`, `setInterval`, and I/O callbacks."
      }
    ]
  },
  "part2": {
    "title": "Task Queues & Priorities",
    "intro": "Observe how microtasks take priority over macrotasks.",
    "cards": [
      {
        "number": "01",
        "tag": "Stack",
        "title": "Call Stack (Sync)",
        "description": "Runs immediately. Blocks everything else until finished.",
        "codeSnippet": "console.log(\"1. Synchronous statement\");\n// Output: 1. Synchronous statement",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Microtask",
        "title": "Microtasks (Promises)",
        "description": "Executes immediately after the call stack empties, before timers.",
        "codeSnippet": "Promise.resolve().then(() => {\n  console.log(\"3. Microtask callback\");\n});",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Macrotask",
        "title": "Macrotasks (Timers)",
        "description": "Executes only after all synchronous code and microtasks finish.",
        "codeSnippet": "setTimeout(() => {\n  console.log(\"4. Macrotask callback\");\n}, 0);",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Microtasks First Rule",
      "content": "The Event Loop will always drain ALL pending microtasks before executing a single macrotask."
    }
  },
  "part3": {
    "title": "Tracing Execution Order & Interview Questions",
    "intro": "Master the classic event loop interview puzzle with crystal clear tracing.",
    "points": [
      {
        "title": "1. The Classic Event Loop Order Puzzle",
        "content": "Trace code by sorting statements into: Synchronous -> Microtasks (Promises) -> Macrotasks (Timers).",
        "codeSnippet": "console.log(\"1. Sync Start\");\n\nsetTimeout(() => console.log(\"4. Timer Macrotask\"), 0);\n\nPromise.resolve().then(() => console.log(\"3. Promise Microtask\"));\n\nconsole.log(\"2. Sync End\");\n\n// Output Order:\n// 1. Sync Start\n// 2. Sync End\n// 3. Promise Microtask\n// 4. Timer Macrotask"
      },
      {
        "title": "2. Microtasks Spawning Microtasks",
        "content": "If a microtask schedules another microtask, the new microtask runs before any macrotasks can execute.",
        "codeSnippet": "Promise.resolve().then(() => {\n  console.log(\"Microtask A\");\n  return Promise.resolve().then(() => console.log(\"Microtask B\"));\n});\nsetTimeout(() => console.log(\"Macrotask\"), 0);\n\n// Microtask A and B BOTH run before Macrotask!"
      },
      {
        "title": "3. queueMicrotask() Utility",
        "content": "Use standard `queueMicrotask(fn)` when you need logic to run asynchronously before the browser repaints.",
        "codeSnippet": "console.log(\"Sync A\");\nqueueMicrotask(() => console.log(\"Microtask B\"));\nconsole.log(\"Sync C\");\n// Output: Sync A -> Sync C -> Microtask B"
      }
    ]
  },
  "part4": {
    "title": "Microtask Starvation",
    "bad": {
      "title": "❌ Microtask Queue Starves Event Loop",
      "code": "// Bug: Infinite recursive microtasks\nfunction recurse() {\n  Promise.resolve().then(recurse);\n}\nrecurse();\n// Call stack and timers NEVER run! Page freezes completely!",
      "explanation": "Because the Event Loop drains all microtasks before doing anything else, recursive microtasks starve the main thread, freezing the UI."
    },
    "good": {
      "title": "✅ Use setTimeout to Yield Control",
      "code": "// Clean: setTimeout yields back to the browser and rendering\nfunction scheduleBatch() {\n  setTimeout(() => {\n    console.log(\"Batch processed cleanly\");\n  }, 0);\n}\nscheduleBatch();",
      "explanation": "`setTimeout` queues a macrotask, allowing the browser to paint frames and handle user clicks between iterations."
    }
  },
  "part5": {
    "title": "Interactive Event Loop Sandbox",
    "intro": "Observe the exact execution order of stack, microtasks, and macrotasks in the live editor.",
    "starterCode": "console.log(\"1. Synchronous Step 1\");\n\nsetTimeout(() => {\n  console.log(\"4. Macrotask (setTimeout 0ms)\");\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log(\"3. Microtask (Promise .then)\");\n});\n\nconsole.log(\"2. Synchronous Step 2\");\n"
  },
  "part6": {
    "title": "Key Takeaways: The Event Loop",
    "takeaways": [
      {
        "title": "Call Stack First",
        "desc": "Synchronous code runs to completion before any queue is checked."
      },
      {
        "title": "Microtasks Over Timers",
        "desc": "Promise callbacks always execute before setTimeout callbacks."
      },
      {
        "title": "Yield with Timers",
        "desc": "Use setTimeout when you need to let the browser repaint between heavy tasks."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "In what order will `console.log(\"A\")`, `setTimeout(() => console.log(\"B\"), 0)`, and `Promise.resolve().then(() => console.log(\"C\"))` execute?",
      "options": [
        "A -> C -> B",
        "A -> B -> C",
        "C -> A -> B",
        "B -> C -> A"
      ],
      "correctIndex": 0,
      "explanation": "`A` is synchronous and runs immediately. `C` is a microtask (Promise) and runs as soon as the stack is empty. `B` is a macrotask (timer) and runs last."
    }
  }
};
