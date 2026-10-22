import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js30BrowserStorageAndDebuggingContent: StandardLessonContent = {
  "slug": "js30-browser-storage-and-debugging",
  "code": "JS-30",
  "title": "Browser Storage & Debugging: LocalStorage & DevTools",
  "subtitle": "Persist state across page reloads with LocalStorage, serialize data with JSON, and debug like a senior engineer.",
  "sections": [
    {
      "id": "part1",
      "label": "Client Persistence",
      "icon": "💾",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "LocalStorage API",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "DevTools & AI Traps",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Quota & String Bugs",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Storage Sandbox",
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
    "title": "Saving State Across Browser Sessions",
    "bigPicture": "Web applications need to remember user preferences (dark mode, authentication tokens, cart items) even after the user closes the browser or refreshes the page. The Web Storage API provides persistent client-side storage.",
    "analogy": "Think of computer RAM like a whiteboard (erased when you turn off the computer). LocalStorage is like a notebook in the desk drawer: you write in it, close the drawer, and the notes are still there tomorrow.",
    "diagram": "localStorage.setItem(\"theme\", \"dark\")\n                 |\n                 v (Persisted to browser disk)\nBrowser Closed & Reopened\n                 |\n                 v\nlocalStorage.getItem(\"theme\")  --> \"dark\"",
    "breakdownTitle": "Storage & Debugging Toolkit",
    "breakdownItems": [
      {
        "title": "localStorage",
        "desc": "Persists data permanently until explicitly cleared by the user or code."
      },
      {
        "title": "sessionStorage",
        "desc": "Stores data only for the current browser tab session; cleared on tab close."
      },
      {
        "title": "DevTools & Breakpoints",
        "desc": "Inspect live variables, pause execution with `debugger`, and step through code."
      }
    ]
  },
  "part2": {
    "title": "Storage Operations",
    "intro": "Save, read, and remove data in client-side storage.",
    "cards": [
      {
        "number": "01",
        "tag": "Write",
        "title": "setItem(key, value)",
        "description": "Stores a key-value string pair in the browser.",
        "codeSnippet": "// localStorage.setItem(\"theme\", \"dark\");\nconsole.log(\"Saved theme preference to storage\");",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Read",
        "title": "getItem(key)",
        "description": "Retrieves a stored string value by its key name.",
        "codeSnippet": "// const theme = localStorage.getItem(\"theme\");\nconst theme = \"dark\";\nconsole.log(\"Retrieved theme:\", theme); // Output: Retrieved theme: dark",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Debug",
        "title": "debugger Statement",
        "description": "Triggers an automatic breakpoint when browser DevTools is open.",
        "codeSnippet": "function computeBill(total) {\n  // debugger; // Execution pauses here in DevTools!\n  return total * 1.08;\n}\nconsole.log(\"Total:\", computeBill(100)); // Output: Total: 108",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Strings Only Rule",
      "content": "LocalStorage ONLY stores strings. Always serialize objects with `JSON.stringify()` before saving."
    }
  },
  "part3": {
    "title": "Storage Patterns & Senior Debugging",
    "intro": "Store complex objects safely and debug code efficiently using breakpoints.",
    "points": [
      {
        "title": "1. The [object Object] Storage Trap",
        "content": "Passing an object directly to `localStorage.setItem` converts it to the useless string `\"[object Object]\"`. Always use `JSON.stringify()`.",
        "codeSnippet": "const settings = { darkMode: true, zoom: 1.2 };\n\n// Safe serialization:\nconst serialized = JSON.stringify(settings);\nconsole.log(\"Safe storage string:\", serialized);\n// Output: Safe storage string: {\"darkMode\":true,\"zoom\":1.2}"
      },
      {
        "title": "2. Safe Storage Helper with Fallbacks",
        "content": "Create helper functions to save and load state with automatic JSON serialization and error fallbacks.",
        "codeSnippet": "function loadStoredData(key, fallback = null) {\n  try {\n    const raw = '{\"token\": \"xyz123\"}'; // Simulated localStorage.getItem\n    return raw ? JSON.parse(raw) : fallback;\n  } catch {\n    return fallback;\n  }\n}\n\nconst auth = loadStoredData(\"auth_token\");\nconsole.log(\"Loaded auth token:\", auth.token); // Output: Loaded auth token: xyz123"
      },
      {
        "title": "3. Console Methods Beyond log()",
        "content": "Use `console.table()` for tabular data, `console.warn()` for warnings, and `console.time()` for performance measurement.",
        "codeSnippet": "const users = [\n  { id: 1, name: \"Alex\" },\n  { id: 2, name: \"Maria\" },\n];\nconsole.table(users); // Displays clean table in browser console!"
      }
    ]
  },
  "part4": {
    "title": "Saving Un-Stringified Objects",
    "bad": {
      "title": "❌ Saving Object Directly Without JSON.stringify",
      "code": "const user = { name: \"Alex\", role: \"admin\" };\n// Bug: JavaScript converts user to string with .toString()!\n// Stored value becomes \"[object Object]\"!\nlocalStorage.setItem(\"user\", user);\n\n// Reading it back:\nconst loaded = localStorage.getItem(\"user\");\nconsole.log(loaded.name); // Output: undefined!",
      "explanation": "LocalStorage calls `.toString()` on non-strings, destroying the object structure into `\"[object Object]\"`."
    },
    "good": {
      "title": "✅ JSON.stringify & JSON.parse",
      "code": "const user = { name: \"Alex\", role: \"admin\" };\n\n// Safe: serialize to JSON string before saving\nconst jsonString = JSON.stringify(user);\n// localStorage.setItem(\"user\", jsonString);\n\n// Read back and parse:\nconst loaded = JSON.parse(jsonString);\nconsole.log(loaded.name); // Output: Alex",
      "explanation": "Always stringify objects before saving, and parse them back when reading."
    }
  },
  "part5": {
    "title": "Interactive Storage Sandbox",
    "intro": "Experiment with storage serialization helpers and debugging statements in the editor.",
    "starterCode": "// Storage serialization helper:\nfunction saveToStorage(key, data) {\n  const serialized = JSON.stringify(data);\n  console.log(\"Saved [\" + key + \"]:\", serialized);\n  return serialized;\n}\n\nfunction getFromStorage(serialized, fallback = {}) {\n  try {\n    return JSON.parse(serialized);\n  } catch {\n    return fallback;\n  }\n}\n\nconst savedData = saveToStorage(\"user_prefs\", { theme: \"dark\", fontSize: 16 });\nconst loadedData = getFromStorage(savedData);\nconsole.log(\"Restored font size:\", loadedData.fontSize);\n"
  },
  "part6": {
    "title": "Key Takeaways: Storage & Debugging",
    "takeaways": [
      {
        "title": "Always Stringify",
        "desc": "LocalStorage only stores strings; serialize objects with JSON.stringify."
      },
      {
        "title": "5MB Quota",
        "desc": "LocalStorage is limited to ~5MB per domain; handle quota errors gracefully."
      },
      {
        "title": "Use Breakpoints",
        "desc": "Step through execution with debugger and DevTools instead of endless logs."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What happens if you run `localStorage.setItem(\"data\", { score: 100 })` without `JSON.stringify`?",
      "options": [
        "It saves the object perfectly",
        "It throws a TypeError",
        "It stores the string \"[object Object]\", losing all properties",
        "It converts the score into an array"
      ],
      "correctIndex": 2,
      "explanation": "LocalStorage only accepts strings. Non-string inputs are converted via `.toString()`, which turns plain objects into the literal string `\"[object Object]\"`."
    }
  }
};
