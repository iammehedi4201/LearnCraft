import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js30BrowserStorageAndDebuggingContent: StandardLessonContent = {
  slug: "js30-browser-storage-and-debugging",
  code: "JS-30",
  title: "Saving Data in the Browser",
  subtitle: "Persist data across sessions with localStorage, distinguish sessionStorage and cookies, and master modern DevTools debugging strategies.",
  sections: [
    {
      id: "part1",
      label: "Client Storage Options",
      icon: "💾",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "localStorage & JSON",
      icon: "⚡",
      tag: "STORAGE"
    },
    {
      id: "part3",
      label: "DevTools Debugging",
      icon: "🛠️",
      tag: "DEBUGGING"
    },
    {
      id: "part4",
      label: "Synchronous Storage Trap",
      icon: "⚠️",
      tag: "PERFORMANCE"
    },
    {
      id: "part5",
      label: "Storage Sandbox",
      icon: "🚀",
      tag: "PRACTICE"
    },
    {
      id: "part6",
      label: "Curriculum Summary",
      icon: "🎓",
      tag: "GRADUATION"
    },
    {
      id: "part7",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT"
    }
  ],
  part1: {
    title: "Client-Side Persistence Options",
    bigPicture: "Modern web applications store state on the user's device to persist settings, shopping carts, and cached data across page reloads and browser restarts.",
    analogy: "Like a notebook in your desk drawer: instead of calling the server for your preferences every morning, you open your notebook (localStorage) and immediately see your saved notes.",
    diagram: "+---------------------+----------------------+---------------------+\n| FEATURE             | localStorage         | sessionStorage      |\n+---------------------+----------------------+---------------------+\n| Lifetime            | Permanent            | Tab session only    |\n| Storage Capacity    | ~5 MB per origin     | ~5 MB per tab       |\n| Accessible Across   | All tabs on origin   | Current tab only    |\n| API Nature          | Synchronous          | Synchronous         |\n+---------------------+----------------------+---------------------+",
    breakdownTitle: "Storage Comparison",
    breakdownItems: [
      {
        title: "localStorage",
        desc: "Persists indefinitely until explicitly cleared by the user or code. Shared across all tabs under the same origin."
      },
      {
        title: "sessionStorage",
        desc: "Scoped to a single browser tab. Cleared automatically as soon as that tab is closed."
      },
      {
        title: "HTTP Cookies",
        desc: "Smaller (~4KB) data sent automatically with every HTTP request, primarily used for authentication session tokens."
      }
    ]
  },
  part2: {
    title: "Working with localStorage and JSON",
    intro: "localStorage only stores strings. Use JSON.stringify and JSON.parse to store complex objects.",
    cards: [
      {
        number: "01",
        tag: "Set & Get",
        title: "setItem & getItem",
        description: "Save and retrieve string values using key-value methods.",
        codeSnippet: "// Storing and retrieving plain strings:\nlocalStorage.setItem(\"theme\", \"dark\");\nconst currentTheme = localStorage.getItem(\"theme\");\nconsole.log(currentTheme); // Output: dark",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Objects",
        title: "Storing Objects with JSON",
        description: "Serialize objects to JSON strings before storing, and parse upon retrieval.",
        codeSnippet: "const user = { name: \"Alex\", xp: 450 };\nlocalStorage.setItem(\"userProfile\", JSON.stringify(user));\n\nconst cached = JSON.parse(localStorage.getItem(\"userProfile\") || \"{}\");\nconsole.log(cached.xp); // Output: 450",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Cleanup",
        title: "removeItem & clear",
        description: "Delete specific keys or wipe the entire origin storage.",
        codeSnippet: "localStorage.removeItem(\"theme\"); // Deletes single key\nlocalStorage.clear(); // Wipes all data for this domain",
        color: "purple"
      }
    ],
    rule: {
      title: "String Storage Rule",
      content: "localStorage converts non-strings to strings automatically. If you store an object without JSON.stringify, it saves as '[object Object]', corrupting your data."
    }
  },
  part3: {
    title: "DevTools Debugging Strategies",
    intro: "Professional techniques to diagnose and fix bugs without endless console.logs.",
    points: [
      {
        title: "1. The debugger Statement & Breakpoints",
        content: "Insert the debugger statement in your code to automatically pause execution and open DevTools to inspect variables.",
        codeSnippet: "function calculateTax(price) {\n  debugger; // Pauses execution in DevTools when open!\n  return price * 0.15;\n}"
      },
      {
        title: "2. console.table() for Arrays & Objects",
        content: "Render arrays of objects as clean, sortable tabular data in the console.",
        codeSnippet: "const users = [\n  { id: 1, name: \"Alice\", role: \"Admin\" },\n  { id: 2, name: \"Bob\", role: \"User\" }\n];\nconsole.table(users); // Formats as beautiful table in console"
      },
      {
        title: "3. Application & Network Tab Inspection",
        content: "Use the Application tab in DevTools to inspect localStorage keys live, and the Network tab to check payload timings and headers."
      }
    ]
  },
  part4: {
    title: "Common Pitfall: Storing Objects Without JSON.stringify()",
    bad: {
      title: "❌ Direct Object Storage Corrupts to '[object Object]'",
      code: "const cart = { items: [\"Keyboard\"], count: 1 };\n// Bug: localStorage calls String(cart) -> '[object Object]'!\nlocalStorage.setItem(\"cart\", cart);\n\nconst saved = localStorage.getItem(\"cart\");\nconsole.log(saved); // Output: \"[object Object]\" (Data is lost forever!)",
      explanation: "localStorage only stores strings. Passing a raw object causes it to be coerced to the useless string '[object Object]'."
    },
    good: {
      title: "✅ Always Serialize with JSON.stringify()",
      code: "const cart = { items: [\"Keyboard\"], count: 1 };\n// Safe: Converts object into valid JSON string\nlocalStorage.setItem(\"cart\", JSON.stringify(cart));\n\nconst saved = JSON.parse(localStorage.getItem(\"cart\") || \"null\");\nconsole.log(saved.items[0]); // Output: Keyboard (Fully preserved!)",
      explanation: "JSON.stringify preserves properties accurately so they can be parsed back into real objects."
    }
  },
  part5: {
    title: "Storage & State Sandbox",
    intro: "Build a safe storage helper that encapsulates JSON serialization and deserialization.",
    starterCode: "// Safe storage wrapper with automatic JSON handling:\nconst SafeStorage = {\n  save(key, value) {\n    try {\n      const serialized = JSON.stringify(value);\n      console.log(`[Storage Saved] '${key}':`, serialized);\n      return true;\n    } catch (err) {\n      console.error(\"Storage failed:\", err);\n      return false;\n    }\n  },\n  load(key, fallback = null) {\n    // Simulated retrieval:\n    return fallback;\n  }\n};\n\nSafeStorage.save(\"appSettings\", { theme: \"dark\", volume: 80 });\nconsole.log(\"JavaScript curriculum completed!\");\n"
  },
  part6: {
    title: "Congratulations: Full JavaScript Curriculum Complete!",
    takeaways: [
      {
        title: "Client-Side Storage",
        desc: "Use localStorage for permanent data, sessionStorage for tab-scoped data."
      },
      {
        title: "Always Serialize with JSON",
        desc: "Serialize objects with JSON.stringify() before writing to localStorage."
      },
      {
        title: "DevTools Mastery",
        desc: "Leverage debugger breakpoints, console.table(), and network tabs for rapid debugging."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens if you store an object directly into localStorage using `localStorage.setItem('user', { id: 1 })`?",
      options: [
        "The object is automatically converted into a structured JSON string",
        "The object is converted to the string '[object Object]', permanently losing its properties",
        "JavaScript throws a fatal TypeError: Object cannot be stored",
        "The browser opens an IndexedDB transaction automatically"
      ],
      correctIndex: 1,
      explanation: "Because `localStorage` only stores strings, it calls `String(obj)` on non-string arguments, resulting in the literal string `'[object Object]'` and losing all properties. You must use `JSON.stringify()`."
    }
  }
};
