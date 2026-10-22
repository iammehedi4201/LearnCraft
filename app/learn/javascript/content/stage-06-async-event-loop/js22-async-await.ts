import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js22AsyncAwaitContent: StandardLessonContent = {
  "slug": "js22-async-await",
  "code": "JS-22",
  "title": "async / await: Clean Asynchronous Code",
  "subtitle": "Write asynchronous code that looks and reads like clean synchronous code using async/await and try/catch.",
  "sections": [
    {
      "id": "part1",
      "label": "Syntax Evolution",
      "icon": "⚡",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "async & await",
      "icon": "💻",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Parallel Execution & AI",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Uncaught Async Rejection",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "async/await Sandbox",
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
    "title": "Asynchronous Code Made Simple",
    "bigPicture": "`async` and `await` are syntactic sugar built on top of JavaScript Promises. They allow you to write asynchronous code that reads sequentially like normal synchronous code, eliminating `.then()` chains.",
    "analogy": "Think of `await` like pausing a video game. You pause while the next level assets load, but your computer remains responsive. Once loaded, the game resumes smoothly.",
    "diagram": "// Promise syntax:\nfetchData().then(data => console.log(data));\n\n// async/await syntax:\nconst data = await fetchData();\nconsole.log(data);",
    "breakdownTitle": "The Two Keywords",
    "breakdownItems": [
      {
        "title": "async keyword",
        "desc": "Placed before a function to make it return a Promise automatically."
      },
      {
        "title": "await keyword",
        "desc": "Pauses execution inside an async function until the Promise resolves."
      },
      {
        "title": "try...catch integration",
        "desc": "Handles both synchronous exceptions and asynchronous rejections with identical syntax."
      }
    ]
  },
  "part2": {
    "title": "async & await in Action",
    "intro": "Compare async function declarations, awaiting promises, and error handling.",
    "cards": [
      {
        "number": "01",
        "tag": "async",
        "title": "async Functions",
        "description": "Functions marked with `async` always return a Promise.",
        "codeSnippet": "async function getGreeting() {\n  return \"Welcome to LearnCraft!\";\n}\ngetGreeting().then(msg => console.log(msg)); // Output: Welcome to LearnCraft!",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "await",
        "title": "await Expression",
        "description": "Unwraps the resolved value of a Promise cleanly.",
        "codeSnippet": "async function loadData() {\n  const value = await Promise.resolve(42);\n  console.log(\"Unwrapped value:\", value); // Output: Unwrapped value: 42\n}\nloadData();",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Errors",
        "title": "try...catch Blocks",
        "description": "Catch errors naturally using standard JavaScript try/catch syntax.",
        "codeSnippet": "async function safeCall() {\n  try {\n    await Promise.reject(new Error(\"Failed\"));\n  } catch (err) {\n    console.error(\"Caught:\", err.message); // Output: Caught: Failed\n  }\n}\nsafeCall();",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "The await Rule",
      "content": "`await` can only be used inside `async` functions or at the top level of ES modules."
    }
  },
  "part3": {
    "title": "Parallel Execution & Reading AI Code",
    "intro": "Avoid accidental waterfalls by awaiting promises in parallel with Promise.all.",
    "points": [
      {
        "title": "1. Avoiding Sequential Waterfall Bottlenecks",
        "content": "Awaiting two independent requests one after another doubles total wait time. Run independent requests in parallel.",
        "codeSnippet": "async function loadDashboard() {\n  // Parallel execution: both start at the same time\n  const [user, stats] = await Promise.all([\n    Promise.resolve({ name: \"Alex\" }),\n    Promise.resolve({ views: 120 }),\n  ]);\n  console.log(\"Dashboard:\", user.name, stats.views);\n}\nloadDashboard(); // Output: Dashboard: Alex 120"
      },
      {
        "title": "2. Graceful Error Fallbacks",
        "content": "Use `try...catch` around network requests to provide default values when an API request fails.",
        "codeSnippet": "async function getUserPreferences() {\n  try {\n    const data = await Promise.reject(new Error(\"Timeout\"));\n    return data;\n  } catch (err) {\n    console.log(\"API failed, using fallback settings\");\n    return { theme: \"dark\" }; // Safe default\n  }\n}\n\ngetUserPreferences().then(p => console.log(p));\n// Output: API failed, using fallback settings -> { theme: 'dark' }"
      },
      {
        "title": "3. Top-Level Await in Modern Modules",
        "content": "In modern ES modules, you can use `await` directly at the top level of a file without an enclosing async function.",
        "codeSnippet": "// Top-level await in ES modules:\nconst config = await Promise.resolve({ apiUrl: \"https://api.dev\" });\nconsole.log(\"Config loaded:\", config.apiUrl); // Output: Config loaded: https://api.dev"
      }
    ]
  },
  "part4": {
    "title": "Forgotten await Returns Raw Promise",
    "bad": {
      "title": "❌ Omitting await Assigns Raw Promise",
      "code": "async function getUser() { return { name: \"Alex\" }; }\n\nasync function run() {\n  // Bug: Forgot 'await'!\n  const user = getUser();\n  // user is a Promise object, not the resolved data!\n  console.log(\"User name:\", user.name); // Output: User name: undefined\n}",
      "explanation": "Without `await`, the variable holds the unresolved Promise object rather than the unpacked data."
    },
    "good": {
      "title": "✅ Await the Promise to Unwrap Data",
      "code": "async function getUser() { return { name: \"Alex\" }; }\n\nasync function run() {\n  // Clean: await unwraps the resolved object\n  const user = await getUser();\n  console.log(\"User name:\", user.name); // Output: User name: Alex\n}\nrun();",
      "explanation": "Always `await` promises before reading properties from their resolved values."
    }
  },
  "part5": {
    "title": "Interactive async/await Sandbox",
    "intro": "Experiment with async functions and try/catch blocks in the live editor.",
    "starterCode": "async function simulateApiRequest() {\n  console.log(\"1. Sending async request...\");\n  const data = await Promise.resolve({ id: 101, status: \"Active\" });\n  console.log(\"2. Response received:\", data.status);\n  return data;\n}\n\nasync function start() {\n  try {\n    const result = await simulateApiRequest();\n    console.log(\"3. Finished processing user #\" + result.id);\n  } catch (err) {\n    console.error(\"Request failed:\", err);\n  }\n}\n\nstart();\n"
  },
  "part6": {
    "title": "Key Takeaways: async / await",
    "takeaways": [
      {
        "title": "Linear Readability",
        "desc": "async/await makes asynchronous code read like clean synchronous code."
      },
      {
        "title": "Standard try/catch",
        "desc": "Use familiar try/catch blocks for bulletproof error handling."
      },
      {
        "title": "Parallel with Promise.all",
        "desc": "Run independent promises together to prevent slow sequential waterfalls."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What does an `async` function return if you write `return 42;` inside it?",
      "options": [
        "The number 42 directly",
        "A Promise that resolves to 42",
        "undefined",
        "A string \"42\""
      ],
      "correctIndex": 1,
      "explanation": "Functions marked with `async` always wrap their return value in a Promise. Returning `42` returns `Promise.resolve(42)`."
    }
  }
};
