import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js30BrowserStorageAndDebuggingContent: StandardLessonContent = {
  slug: "js30-browser-storage-and-debugging",
  code: "JS-30",
  title: "Saving Data in the Browser",
  subtitle: "Persist user data across browser refreshes with localStorage, and debug code with browser DevTools.",
  sections: [
    {
      id: "part1",
      label: "Browser Storage",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "localStorage & JSON",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "DevTools Debugging",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Object Stringification Trap",
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
    title: "Saving Data in the Browser",
    bigPicture: "`localStorage` saves key-value string data persistently across browser reloads. Combine it with `JSON.stringify()` and `JSON.parse()` to persist complex state like themes or auth tokens.",
    breakdownTitle: "Key Storage & Debugging Features",
    breakdownItems: [
      {
        title: "localStorage.setItem()",
        desc: "Saves a key-value text pair persistently in the browser storage."
      },
      {
        title: "localStorage.getItem()",
        desc: "Retrieves a stored string by key, returning null if not found."
      },
      {
        title: "Browser DevTools",
        desc: "Inspect active storage in the Application tab and set breakpoints in the Sources tab."
      }
    ]
  },
  part2: {
    title: "localStorage and sessionStorage with JSON",
    intro: "Because localStorage only stores text strings, combine it with JSON for objects and arrays.",
    cards: [
      {
        number: "01",
        tag: "Save",
        title: "Saving Simple Strings",
        description: "Store text directly using a unique key name.",
        codeSnippet: "localStorage.setItem(\"theme\", \"dark\");\nconsole.log(localStorage.getItem(\"theme\"));\n// Output: dark",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Objects",
        title: "Saving Objects with JSON",
        description: "Always stringify objects before saving, and parse them when reading.",
        codeSnippet: "const user = { name: \"Maya\", level: 5 };\nlocalStorage.setItem(\"user\", JSON.stringify(user));\n\nconst loaded = JSON.parse(localStorage.getItem(\"user\"));\nconsole.log(loaded.name); // Output: Maya",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Remove",
        title: "Removing Data",
        description: "Delete specific keys or clear all stored data.",
        codeSnippet: "localStorage.removeItem(\"tempToken\"); // Removes single key\nlocalStorage.clear();               // Clears all keys",
        color: "purple"
      }
    ],
    rule: {
      title: "The String-Only Rule",
      content: "localStorage can ONLY store plain text strings. Always serialize objects with JSON.stringify() before storing them."
    }
  },
  part3: {
    title: "Debugging with Console and DevTools",
    intro: "Modern debugging tools inside browser DevTools (F12 or Inspect).",
    points: [
      {
        title: "1. Structured Logging with console.table()",
        content: "Format arrays of objects into clean, readable tabular data in the browser console.",
        codeSnippet: "const users = [\n  { id: 1, name: \"Maya\", role: \"Admin\" },\n  { id: 2, name: \"Alex\", role: \"Editor\" }\n];\nconsole.table(users); // Displays a clean spreadsheet-like table!"
      },
      {
        title: "2. Setting Breakpoints in DevTools",
        content: "Open the Sources tab in DevTools and click on a line number to set a breakpoint. JavaScript will freeze on that line, letting you hover over variables to see their live values.",
        codeSnippet: "// Tip: You can also write the 'debugger;' statement directly in your code!"
      },
      {
        title: "3. Inspecting the Application Tab",
        content: "Open DevTools -> Application -> Storage -> Local Storage to view, edit, or delete stored keys in real time.",
        codeSnippet: "// Visual inspector lets you see live keys and values instantly"
      }
    ]
  },
  part4: {
    title: "Common Trap: Storing Objects as '[object Object]'",
    bad: {
      title: "❌ Saving an Object Directly to localStorage",
      code: "const settings = { darkMode: true, zoom: 100 };\n// BUG: Passed object directly without JSON.stringify!\nlocalStorage.setItem(\"settings\", settings);\nconsole.log(localStorage.getItem(\"settings\"));\n// Output: \"[object Object]\" (Data is ruined!)",
      explanation: "Because localStorage expects a string, it automatically converts settings using .toString(), resulting in the useless string '[object Object]'."
    },
    good: {
      title: "✅ Serialize with JSON.stringify()",
      code: "const settings = { darkMode: true, zoom: 100 };\n// Correct: Serialize to JSON text string first:\nlocalStorage.setItem(\"settings\", JSON.stringify(settings));\nconst retrieved = JSON.parse(localStorage.getItem(\"settings\"));\nconsole.log(retrieved.darkMode);\n// Output: true (Preserved perfectly!)",
      explanation: "Using JSON.stringify() preserves the complete object structure cleanly in storage."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Save user configuration into the mock localStorage runtime and inspect tabular output with console.table().",
    starterCode: "// 1. Saving structured preferences:\nconst userConfig = {\n  activeTheme: \"dark-mode\",\n  editorFontSize: 14,\n  autoSave: true\n};\n\nlocalStorage.setItem(\"learncraft_config\", JSON.stringify(userConfig));\n\n// 2. Reading and parsing preferences back:\nconst savedConfig = JSON.parse(localStorage.getItem(\"learncraft_config\") || \"{}\");\nconsole.log(\"Restored editor font size:\", savedConfig.editorFontSize);\n\n// 3. Structured console debugging:\nconst debugMetrics = [\n  { metric: \"LoadTime\", valueMs: 140, status: \"PASS\" },\n  { metric: \"StorageQuota\", valueMs: 12, status: \"PASS\" }\n];\nconsole.table(debugMetrics);\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "localStorage Survives Reloads",
        desc: "Use localStorage to remember settings, themes, and cart items across sessions."
      },
      {
        title: "Always Use JSON for Objects",
        desc: "Store with JSON.stringify(obj) and restore with JSON.parse(str)."
      },
      {
        title: "Use DevTools Breakpoints",
        desc: "Freeze execution in the Sources tab to inspect live variable values step by step."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens if you store an object directly into localStorage using localStorage.setItem('user', userObj) without JSON.stringify?",
      options: [
        "The object is automatically converted to the useless string '[object Object]' and its properties are lost",
        "JavaScript automatically deep-clones the object into memory",
        "The browser throws a fatal StorageError",
        "It stores the object in binary database format"
      ],
      correctIndex: 0,
      explanation: "localStorage only stores strings. If you pass an object directly, JavaScript calls .toString() on it, which produces the string '[object Object]', permanently losing your data unless you serialize with JSON.stringify."
    }
  }
};
