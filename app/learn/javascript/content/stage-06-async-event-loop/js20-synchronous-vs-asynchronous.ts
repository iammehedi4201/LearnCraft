import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js20SynchronousVsAsynchronousContent: StandardLessonContent = {
  "slug": "js20-synchronous-vs-asynchronous",
  "code": "JS-20",
  "title": "Synchronous vs Asynchronous: Non-Blocking I/O",
  "subtitle": "Understand how JavaScript handles long-running tasks without blocking the main execution thread.",
  "sections": [
    {
      "id": "part1",
      "label": "Single-Threaded Model",
      "icon": "⏳",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Sync vs Async",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Non-Blocking & AI Traps",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Blocking the Thread",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Async Sandbox",
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
    "title": "Why JavaScript is Non-Blocking",
    "bigPicture": "JavaScript is single-threaded: it has one call stack and can only execute one line of code at a time. To prevent long tasks (like downloading data) from freezing the screen, JavaScript uses an asynchronous non-blocking model.",
    "analogy": "Think of a restaurant waiter. If the waiter stood at the kitchen door waiting 20 minutes for a steak to cook, no other table would get water. Instead, the waiter places the order (async) and serves other tables.",
    "diagram": "Sync Code:   [ Step 1 ] ---> [ Step 2 ] ---> [ Step 3 ]\nAsync Call:  [ Send Request ] ---------------------> [ Handle Response ]\n                               (UI stays interactive!)",
    "breakdownTitle": "Execution Models",
    "breakdownItems": [
      {
        "title": "Single-Threaded",
        "desc": "One main thread executes instructions sequentially on the call stack."
      },
      {
        "title": "Non-Blocking APIs",
        "desc": "Browser and Node.js APIs handle timers, disk I/O, and HTTP requests in the background."
      },
      {
        "title": "Callback Queue",
        "desc": "Completed background tasks wait in line to be executed when the main thread is idle."
      }
    ]
  },
  "part2": {
    "title": "Sync vs Async Behavior",
    "intro": "Observe the difference between blocking synchronous code and non-blocking asynchronous timers.",
    "cards": [
      {
        "number": "01",
        "tag": "Sync",
        "title": "Synchronous Execution",
        "description": "Runs line by line. Each line must complete before the next line begins.",
        "codeSnippet": "console.log(\"A\");\nconsole.log(\"B\");\nconsole.log(\"C\");\n// Output: A, B, C (immediate)",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Async",
        "title": "Asynchronous Non-Blocking",
        "description": "Schedules work to run later. The rest of the program continues immediately.",
        "codeSnippet": "console.log(\"1. Start\");\nsetTimeout(() => console.log(\"3. Done\"), 100);\nconsole.log(\"2. End\");\n// Output: 1. Start, 2. End, 3. Done",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "0ms Timer",
        "title": "setTimeout with 0ms",
        "description": "Still runs after all synchronous code finishes executing.",
        "codeSnippet": "setTimeout(() => console.log(\"Later\"), 0);\nconsole.log(\"Now\");\n// Output: Now, then Later",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Never Block the Main Thread",
      "content": "Never write long synchronous loops. Delegate expensive or waiting tasks to asynchronous APIs."
    }
  },
  "part3": {
    "title": "Non-Blocking Execution & Reading AI Code",
    "intro": "Learn to predict output order when synchronous and asynchronous operations mix.",
    "points": [
      {
        "title": "1. Synchronous Code Always Wins",
        "content": "All synchronous code currently on the call stack completes before ANY asynchronous callback is allowed to run.",
        "codeSnippet": "console.log(\"Step 1\");\n\nsetTimeout(() => {\n  console.log(\"Step 3 (Async callback)\");\n}, 0);\n\nconsole.log(\"Step 2\");\n// Output:\n// Step 1\n// Step 2\n// Step 3 (Async callback)"
      },
      {
        "title": "2. The Async Return Trap",
        "content": "You cannot return a value from an async callback directly into an outer synchronous variable.",
        "codeSnippet": "let result = \"initial\";\n\nsetTimeout(() => {\n  result = \"updated\";\n}, 10);\n\nconsole.log(\"Immediate read:\", result); \n// Output: Immediate read: initial (callback hasn't run yet!)"
      },
      {
        "title": "3. Handling Delayed Values with Callbacks",
        "content": "To handle the result of an asynchronous operation, pass a callback or return a Promise.",
        "codeSnippet": "function fetchUsername(callback) {\n  setTimeout(() => {\n    callback(\"alex_dev\");\n  }, 20);\n}\n\nfetchUsername(name => console.log(\"Fetched name:\", name));\n// Output: Fetched name: alex_dev"
      }
    ]
  },
  "part4": {
    "title": "Freezing the UI with Synchronous Sleep",
    "bad": {
      "title": "❌ Busy-Wait Loop Freezes the Page",
      "code": "// Bug: Infinite busy-waiting loop\nconst start = Date.now();\nwhile (Date.now() - start < 3000) {\n  // Completely freezes browser tab for 3 seconds!\n}\nconsole.log(\"Done waiting\");",
      "explanation": "Synchronous busy-waiting blocks the call stack, preventing the browser from rendering or responding to clicks."
    },
    "good": {
      "title": "✅ Non-Blocking setTimeout",
      "code": "// Clean: schedules callback without blocking\nconsole.log(\"Starting non-blocking delay...\");\nsetTimeout(() => {\n  console.log(\"Done waiting (UI stayed responsive!)\");\n}, 100);",
      "explanation": "Using asynchronous timers allows the browser to keep animating and handling user clicks while waiting."
    }
  },
  "part5": {
    "title": "Interactive Async Sandbox",
    "intro": "Trace the execution order of synchronous logs and asynchronous timers in the editor.",
    "starterCode": "// 1. Synchronous line:\nconsole.log(\"A: Synchronous start\");\n\n// 2. Asynchronous timer (0ms delay):\nsetTimeout(() => {\n  console.log(\"C: Timer callback finished\");\n}, 0);\n\n// 3. Synchronous line:\nconsole.log(\"B: Synchronous end\");\n\n// Notice output order: A -> B -> C!\n"
  },
  "part6": {
    "title": "Key Takeaways: Sync vs Async",
    "takeaways": [
      {
        "title": "Single Threaded",
        "desc": "JavaScript executes one task at a time on its call stack."
      },
      {
        "title": "Non-Blocking APIs",
        "desc": "Heavy operations run in the background via browser and Node.js APIs."
      },
      {
        "title": "Sync Runs First",
        "desc": "Synchronous code always finishes before asynchronous callbacks execute."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "Why does `setTimeout(fn, 0)` execute AFTER `console.log(\"Done\")`?",
      "options": [
        "Because 0ms means the timer is canceled",
        "Because the callback is placed in the task queue and must wait for the synchronous call stack to empty",
        "Because setTimeout is slower than console.log",
        "Because JavaScript skips all functions with 0 arguments"
      ],
      "correctIndex": 1,
      "explanation": "Even with 0ms, `setTimeout` delegates the callback to the event loop's task queue. The call stack must completely finish all synchronous code before executing tasks from the queue."
    }
  }
};
