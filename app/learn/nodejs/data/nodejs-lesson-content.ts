/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NODE.JS LESSONS CONTENT REPOSITORY — SIMPLE, CLEAR & INTUITIVE EXPLANATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Beginner-friendly explanations, real-world analogies, and practical examples
 * for all 24 Node.js lessons (NODE-01 through NODE-24).
 *
 * Strict Topic Boundary: Pure Node.js runtime only.
 * Teaches runtime architecture, V8 + libuv, Event Loop, non-blocking I/O,
 * CommonJS & ESM, core modules (fs, path, os, process), EventEmitter, Buffers,
 * Streams, native HTTP server, async I/O, error handling, debugging & testing.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export interface NodejsLessonSection {
  id: string;
  label: string;
  icon: string;
}

export interface NodejsLessonCard {
  number: string;
  tag: string;
  title: string;
  description: string;
  color?: "purple" | "emerald" | "amber" | "cyan" | "rose" | "indigo" | "blue";
}

export interface NodejsMentalModelPoint {
  title: string;
  content: string;
  codeSnippet?: string;
}

export interface NodejsCodeComparison {
  title: string;
  code: string;
  explanation: string;
}

export interface NodejsQuizData {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface NodejsLessonTakeaway {
  title: string;
  desc: string;
}

export interface NodejsLessonContent {
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  sections: NodejsLessonSection[];
  part1: {
    title: string;
    bigPicture: string;
    breakdownTitle: string;
    breakdownItems: Array<{ title: string; desc: string }>;
  };
  part2: {
    title: string;
    intro: string;
    cards: NodejsLessonCard[];
    rule: {
      title: string;
      content: string;
    };
  };
  part3: {
    title: string;
    intro: string;
    points: NodejsMentalModelPoint[];
  };
  part4: {
    title: string;
    bad: NodejsCodeComparison;
    good: NodejsCodeComparison;
  };
  part5: {
    title: string;
    intro: string;
    starterCode: string;
  };
  part6: {
    title: string;
    quiz: NodejsQuizData;
  };
  part7: {
    title: string;
    takeaways: NodejsLessonTakeaway[];
    nextLessonPreview?: {
      title: string;
      desc: string;
    };
  };
}

export const NODEJS_LESSONS_CONTENT: Record<string, NodejsLessonContent> = {
  // ─────────────────────────────────────────────────────────────
  // NODE-01: What Is Node.js?
  // ─────────────────────────────────────────────────────────────
  "node01-what-is-nodejs": {
    slug: "node01-what-is-nodejs",
    code: "NODE-01",
    title: "What Is Node.js? The JavaScript Server Runtime & V8 Engine",
    subtitle: "Learn why Node.js exists, how JavaScript runs outside the browser, and the synergy between Google V8 and libuv.",
    sections: [
      { id: "part1", label: "Why Do We Need Node.js?", icon: "💡" },
      { id: "part2", label: "The Runtime Architecture", icon: "⚙️" },
      { id: "part3", label: "V8 Engine & Libuv Synergy", icon: "🧩" },
      { id: "part4", label: "Synchronous vs Async Runtime", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Why Do We Need Node.js?",
      bigPicture: "For years, JavaScript only lived inside web browsers to animate buttons and validate forms. If you wanted to build a backend server, read files from a hard drive, or listen on network sockets, you had to use a different language like C++, Java, or Python. In 2009, Ryan Dahl took Google's ultra-fast V8 JavaScript engine out of Chrome, combined it with a C library called libuv, and created Node.js.",
      breakdownTitle: "What Node.js gives us beyond plain JavaScript:",
      breakdownItems: [
        { title: "JavaScript Outside the Browser", desc: "Execute JavaScript code directly on servers, desktops, and terminal environments." },
        { title: "Direct Operating System Access", desc: "Interact with the local file system, process environment variables, and open raw TCP/HTTP ports." },
        { title: "Single-Threaded Asynchronous I/O", desc: "Handle thousands of concurrent user connections without spawning a heavy OS thread for each client." },
      ],
    },
    part2: {
      title: "The Anatomy of Node.js",
      intro: "Node.js is not a programming language or a framework. It is a JavaScript runtime environment consisting of several layers:",
      cards: [
        {
          number: "01",
          tag: "ENGINE",
          title: "Google V8 Engine",
          description: "Written in C++, V8 compiles your JavaScript directly into native machine instructions in real time.",
          color: "purple",
        },
        {
          number: "02",
          tag: "I/O WORKHORSE",
          title: "Libuv C Library",
          description: "Provides the cross-platform event loop, asynchronous file operations, DNS lookups, and a background thread pool.",
          color: "emerald",
        },
        {
          number: "03",
          tag: "CORE APIS",
          title: "Node.js Built-in Bindings",
          description: "JavaScript wrapper modules (fs, path, http, crypto, os) that call down into native C/C++ OS system calls.",
          color: "cyan",
        },
      ],
      rule: {
        title: "The Runtime Equation",
        content: "Node.js = V8 (JavaScript Execution Engine) + Libuv (Async I/O & Event Loop) + Core Native C++ Bindings.",
      },
    },
    part3: {
      title: "Mental Model: JavaScript Engine vs Host Environment",
      intro: "How JavaScript code actually travels down to the operating system:",
      points: [
        {
          title: "1. V8 runs the JavaScript instructions",
          content: "Your variables, functions, and logic execute on a single main thread managed by the V8 engine.",
        },
        {
          title: "2. Native C++ Bindings bridge the gap",
          content: "When you call a core method like fs.readFile(), V8 delegates the work across the C++ binding layer to libuv.",
        },
        {
          title: "3. Libuv interacts with the OS kernel",
          content: "Libuv asks the OS to read the disk. While the disk spins, your Node.js main thread is completely free to handle other tasks.",
          codeSnippet: `// Node.js bridges JS to OS capabilities
console.log("Process ID:", process.pid);
console.log("Platform:", process.platform);
console.log("Node version:", process.version);`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Understanding the Runtime Bridge",
      bad: {
        title: "Misconception: Node.js is a new language or framework",
        code: `// Mistake: Believing Node.js has special syntax
// Node.js is just JavaScript executing in a backend host!
function server() {
  // Trying to use browser-only globals inside Node:
  window.alert("Hello!"); // ReferenceError: window is not defined
  document.getElementById("btn"); // ReferenceError: document is not defined
}`,
        explanation: "Node.js runs standard ECMAScript JavaScript, but browser DOM objects like window and document do not exist in a server environment.",
      },
      good: {
        title: "Accurate Model: Using Node.js Runtime Globals",
        code: `// Node provides server runtime globals instead of DOM:
console.log("Running on:", process.platform);
console.log("Current working dir:", process.cwd());
console.log("Memory usage:", process.memoryUsage().heapUsed, "bytes");`,
        explanation: "Node.js provides server-focused globals such as process, globalThis, and Buffer to inspect and control the host system.",
      },
    },
    part5: {
      title: "Try It: Inspecting Your Node.js Runtime",
      intro: "Run this script to inspect the host architecture, platform, and memory allocations provided by Node.js:",
      starterCode: `// Inspect the Node.js runtime environment
const runtimeInfo = {
  platform: typeof process !== 'undefined' ? process.platform : 'browser-sandbox',
  nodeVersion: typeof process !== 'undefined' ? process.version : 'v20.x',
  architecture: typeof process !== 'undefined' ? process.arch : 'x64',
  timestamp: new Date().toISOString(),
};

console.log("=== Node.js Runtime Environment ===");
console.log("Platform:", runtimeInfo.platform);
console.log("Node.js Version:", runtimeInfo.nodeVersion);
console.log("System Architecture:", runtimeInfo.architecture);
console.log("Current Time:", runtimeInfo.timestamp);
console.log("Runtime check complete: Node.js is active!");`,
    },
    part6: {
      title: "Concept Check: What is Node.js?",
      quiz: {
        question: "Which statement accurately describes what Node.js is?",
        options: [
          "A new backend programming language with its own custom syntax that replaces JavaScript.",
          "A JavaScript runtime environment powered by the V8 engine and libuv that runs JavaScript outside the browser.",
          "A frontend framework designed to manipulate HTML DOM elements on the client side.",
          "A relational database management system built in C++.",
        ],
        correctIndex: 1,
        explanation: "Node.js is a JavaScript runtime environment built on Chrome's V8 engine and the libuv C library, allowing JavaScript to run on servers with OS access.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "Server-Side JavaScript", desc: "Node.js allows you to use your JavaScript knowledge to write server backends, CLI tools, and automation scripts." },
        { title: "V8 + Libuv", desc: "V8 executes your JavaScript logic, while Libuv handles non-blocking I/O and OS communication behind the scenes." },
        { title: "No DOM, Rich OS APIs", desc: "Node.js replaces window/document with process, fs, path, and networking modules." },
      ],
      nextLessonPreview: {
        title: "NODE-02: Node.js vs Browser",
        desc: "Deep dive into the differences between browser JS and Node.js: globalThis, the process object, and filesystem access.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-02: Node.js vs Browser
  // ─────────────────────────────────────────────────────────────
  "node02-nodejs-vs-browser": {
    slug: "node02-nodejs-vs-browser",
    code: "NODE-02",
    title: "Node.js vs Browser: Globals, process & The Runtime Environment",
    subtitle: "Understand the fundamental boundary between browser JavaScript and Node.js: globals, process, and system capabilities.",
    sections: [
      { id: "part1", label: "Two Different Worlds", icon: "🌐" },
      { id: "part2", label: "Global Scope Comparison", icon: "🔍" },
      { id: "part3", label: "The process Object", icon: "⚡" },
      { id: "part4", label: "Browser Code vs Node Code", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "🧪" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Two Different Worlds: Browser vs Server",
      bigPicture: "Both the browser and Node.js execute JavaScript according to the official ECMAScript standard. However, the host environments are built for completely different purposes. The browser lives in a secure sandbox to display web pages and protect the user's computer from malicious scripts. Node.js lives on the server and is designed to have full, unrestricted access to the computer's resources: disk drives, network ports, and environment variables.",
      breakdownTitle: "Key differences at a glance:",
      breakdownItems: [
        { title: "No DOM in Node.js", desc: "There is no window, document, localStorage, or HTML rendering engine in Node.js." },
        { title: "Full System Access in Node.js", desc: "Node.js can create files, start processes, listen on ports, and inspect CPU memory." },
        { title: "Unified Standard: globalThis", desc: "In modern JS, globalThis points to window in browsers and global in Node.js." },
      ],
    },
    part2: {
      title: "Global Scope: Browser vs Node.js",
      intro: "Here is how the top-level global environments differ:",
      cards: [
        {
          number: "01",
          tag: "BROWSER ONLY",
          title: "DOM & Web APIs",
          description: "window, document, fetch (web), alert, localStorage, sessionStorage, navigator, history.",
          color: "rose",
        },
        {
          number: "02",
          tag: "SHARED JS",
          title: "ECMAScript Core",
          description: "Promise, Array, Object, JSON, Map, Set, setTimeout, setInterval, console, globalThis.",
          color: "purple",
        },
        {
          number: "03",
          tag: "NODE.JS ONLY",
          title: "System & Process APIs",
          description: "process, Buffer, __dirname, __filename (CommonJS), module, exports, require, native C++ bindings.",
          color: "emerald",
        },
      ],
      rule: {
        title: "The Sandbox Rule",
        content: "Browser JavaScript is sandboxed for client security. Node.js has direct operating system privileges as a server process.",
      },
    },
    part3: {
      title: "The Heart of Node: The process Object",
      intro: "In Node.js, the global `process` object provides full information and control over the currently running program:",
      points: [
        {
          title: "process.argv",
          content: "An array of command-line arguments passed when launching the program (e.g. `node app.js --port 3000`).",
          codeSnippet: `// node app.js --env production
const args = process.argv.slice(2);
console.log("Arguments:", args); // ['--env', 'production']`,
        },
        {
          title: "process.env",
          content: "An object containing all operating system environment variables (PORT, DB_URL, NODE_ENV).",
          codeSnippet: `const port = process.env.PORT || 3000;
console.log("Listening on port:", port);`,
        },
        {
          title: "process.exit()",
          content: "Terminates the program immediately. Code 0 means clean success; non-zero codes (e.g., 1) indicate an error.",
          codeSnippet: `if (!process.env.SECRET_KEY) {
  console.error("Missing SECRET_KEY! Halting.");
  process.exit(1);
}`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Accessing Globals Safely",
      bad: {
        title: "Assuming Browser Globals Exist on the Server",
        code: `// Mistake: Calling window or alert in Node.js
function getStorage(key) {
  // Crashes in Node.js: ReferenceError: localStorage is not defined
  return localStorage.getItem(key);
}`,
        explanation: "localStorage and window are browser APIs. In Node.js, we read from files or database stores instead.",
      },
      good: {
        title: "Using Environment Variables and Universal globalThis",
        code: `// Safe: Reading server config via process.env
function getConfig(key, defaultValue) {
  if (typeof process !== "undefined" && process.env) {
    return process.env[key] || defaultValue;
  }
  return defaultValue;
}

const dbHost = getConfig("DB_HOST", "localhost");
console.log("DB Host:", dbHost);`,
        explanation: "Checking the host environment or using standard Node globals keeps backend code robust and crash-free.",
      },
    },
    part5: {
      title: "Try It: Inspecting process and Environment Variables",
      intro: "Experiment with reading simulated command-line arguments and configuration:",
      starterCode: `// Inspecting Node process information
const mockProcess = {
  pid: 14280,
  platform: 'win32',
  version: 'v20.11.0',
  uptime: () => 42.5, // seconds
  env: {
    NODE_ENV: 'development',
    PORT: '8080',
    APP_NAME: 'LearnCraft Node Engine'
  }
};

console.log("Process ID:", mockProcess.pid);
console.log("OS Platform:", mockProcess.platform);
console.log("App Name:", mockProcess.env.APP_NAME);
console.log("Port:", mockProcess.env.PORT);
console.log("Uptime:", mockProcess.uptime() + "s");`,
    },
    part6: {
      title: "Concept Check: Browser vs Node.js",
      quiz: {
        question: "Which of the following globals exists natively in Node.js but NOT in a standard web browser window?",
        options: [
          "document",
          "localStorage",
          "process",
          "window",
        ],
        correctIndex: 2,
        explanation: "The `process` object is a Node.js-specific global that provides control and metadata for the running server process.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "No DOM on Servers", desc: "Node.js does not have window or document; it is designed for backend computation and I/O." },
        { title: "The process Object", desc: "Use process.env for configuration, process.argv for CLI args, and process.exit() for termination." },
        { title: "Universal JS", desc: "Use globalThis when writing code that needs to reference the global scope across both environments." },
      ],
      nextLessonPreview: {
        title: "NODE-03: The Event Loop & Non-Blocking I/O",
        desc: "Discover how Node.js achieves incredible concurrency with a single thread using the Event Loop and Libuv.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-03: The Event Loop & Non-Blocking I/O
  // ─────────────────────────────────────────────────────────────
  "node03-event-loop-and-async-io": {
    slug: "node03-event-loop-and-async-io",
    code: "NODE-03",
    title: "The Event Loop & Non-Blocking I/O: Call Stack, Libuv & Queues",
    subtitle: "Build an unshakable mental model of how Node.js handles thousands of concurrent requests on a single main thread.",
    sections: [
      { id: "part1", label: "The Concurrency Secret", icon: "💡" },
      { id: "part2", label: "Execution Components", icon: "⚙️" },
      { id: "part3", label: "Event Loop Mental Model", icon: "🔄" },
      { id: "part4", label: "Blocking vs Non-Blocking", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "The Concurrency Secret of Node.js",
      bigPicture: "In traditional multi-threaded web servers (like classic Apache or Java servers), every incoming user request creates a new operating system thread. If 1,000 users connect, the server needs 1,000 threads, which eats up gigabytes of RAM. Node.js takes the opposite approach: it runs your JavaScript on a single thread and uses non-blocking I/O. When an operation takes time (like reading a file or querying a database), Node asks the OS or a background thread to do the work, and immediately continues handling other incoming requests.",
      breakdownTitle: "How non-blocking I/O works:",
      breakdownItems: [
        { title: "Single Main Thread", desc: "Your JavaScript code executes synchronously on one call stack without race conditions." },
        { title: "Offload Slow Work to Libuv", desc: "File I/O, crypto operations, and network sockets are delegated to the OS kernel or Libuv's thread pool." },
        { title: "Callback Queues & Event Loop", desc: "When slow work finishes, its callback is placed in a queue and executed once the call stack is clear." },
      ],
    },
    part2: {
      title: "The Four Core Runtime Components",
      intro: "How the parts work together seamlessly:",
      cards: [
        {
          number: "01",
          tag: "EXECUTION",
          title: "The Call Stack",
          description: "LIFO stack where JavaScript functions execute. If a function is running here, nothing else in JS can run.",
          color: "purple",
        },
        {
          number: "02",
          tag: "OFFLOAD",
          title: "Libuv Thread Pool & OS",
          description: "C++ background workers that perform expensive disk reads, DNS lookups, and crypto hashing asynchronously.",
          color: "emerald",
        },
        {
          number: "03",
          tag: "STAGING",
          title: "Callback Queues",
          description: "Holds completed I/O callbacks, timers (setTimeout), and microtasks (Promise resolutions, process.nextTick).",
          color: "amber",
        },
        {
          number: "04",
          tag: "ORCHESTRATOR",
          title: "The Event Loop",
          description: "A continuous loop that checks: 'Is the Call Stack empty? If yes, push the next callback onto the stack!'",
          color: "cyan",
        },
      ],
      rule: {
        title: "The Golden Rule of Node.js",
        content: "Never block the main thread with heavy CPU calculations (e.g. sync loops, JSON.parse on 100MB strings), or all user requests will freeze.",
      },
    },
    part3: {
      title: "Event Loop Phases & Microtask Priority",
      intro: "The order of execution when asynchronous events resolve:",
      points: [
        {
          title: "Microtasks have Top Priority",
          content: "`process.nextTick()` and `Promise.then()` callbacks run immediately as soon as the current synchronous script finishes, before any timer or I/O callback.",
        },
        {
          title: "Timers Phase",
          content: "Executes callbacks scheduled by `setTimeout()` and `setInterval()` whose threshold has elapsed.",
        },
        {
          title: "Poll / I/O Phase",
          content: "Retrieves new I/O events (incoming network data, file read completions) and executes their callbacks.",
        },
        {
          title: "Check Phase",
          content: "Executes callbacks scheduled by `setImmediate()` right after the poll phase finishes.",
          codeSnippet: `console.log("1. Sync script");

setTimeout(() => console.log("4. Timer (setTimeout)"), 0);

Promise.resolve().then(() => console.log("3. Microtask (Promise)"));

process.nextTick(() => console.log("2. Microtask (nextTick)"));`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Blocking vs Non-Blocking",
      bad: {
        title: "Blocking the Event Loop Synchronously",
        code: `// Mistake: Reading a huge file synchronously in a web request handler
const fs = require("fs");

function handleRequest(req, res) {
  // Freezes the entire server for ALL users while the disk reads 500MB!
  const data = fs.readFileSync("/huge-file.csv", "utf8");
  res.end(data);
}`,
        explanation: "readFileSync blocks the single main thread. No other user can connect or receive responses until the file read completes.",
      },
      good: {
        title: "Non-Blocking Asynchronous Reading",
        code: `// Improved: Using asynchronous non-blocking fs
const fs = require("fs/promises");

async function handleRequest(req, res) {
  // Node asks the OS to read the file in the background.
  // The main thread continues serving other users immediately!
  const data = await fs.readFile("/huge-file.csv", "utf8");
  res.end(data);
}`,
        explanation: "Asynchronous readFile delegates disk reading to libuv, keeping the main thread free to accept new incoming connections.",
      },
    },
    part5: {
      title: "Try It: Predict Execution Order",
      intro: "Observe how synchronous code, microtasks, and macrotasks execute across Event Loop turns:",
      starterCode: `console.log("A: Synchronous Start");

setTimeout(() => {
  console.log("D: Macrotask (setTimeout 0ms)");
}, 0);

Promise.resolve().then(() => {
  console.log("C: Microtask (Promise.then)");
});

console.log("B: Synchronous End");

// Output prediction:
// A: Synchronous Start
// B: Synchronous End
// C: Microtask (Promise.then)
// D: Macrotask (setTimeout 0ms)`,
    },
    part6: {
      title: "Concept Check: The Event Loop",
      quiz: {
        question: "Why can Node.js handle thousands of concurrent I/O connections on a single main thread?",
        options: [
          "It spawns a new operating system thread for every single HTTP request.",
          "It delegates slow I/O operations to the OS/libuv and uses an Event Loop to process callbacks when ready.",
          "It pauses time using hardware virtualization.",
          "It automatically compiles JavaScript into SQL queries.",
        ],
        correctIndex: 1,
        explanation: "Node.js offloads slow I/O work to the OS and libuv background workers, freeing the single JavaScript thread to handle other incoming requests.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "Single-Threaded JS", desc: "JavaScript executes on one Call Stack, so never write heavy synchronous blocking loops." },
        { title: "Non-Blocking by Default", desc: "Always prefer asynchronous APIs (fs/promises, fetch, streams) over synchronous ones (readFileSync)." },
        { title: "Microtasks First", desc: "Promises and nextTick run before timers (setTimeout) and setImmediate." },
      ],
      nextLessonPreview: {
        title: "NODE-04: CommonJS vs ES Modules",
        desc: "Master code organization across files using require/module.exports and modern import/export.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-04: CommonJS vs ES Modules
  // ─────────────────────────────────────────────────────────────
  "node04-commonjs-vs-esm": {
    slug: "node04-commonjs-vs-esm",
    code: "NODE-04",
    title: "CommonJS vs ES Modules: require vs import & Module Boundaries",
    subtitle: "Understand the two module systems in Node.js: CommonJS (require) vs modern ECMAScript Modules (import/export).",
    sections: [
      { id: "part1", label: "Why Modules Exist", icon: "📦" },
      { id: "part2", label: "CommonJS vs ESM", icon: "⚖️" },
      { id: "part3", label: "Module Caching & Scoping", icon: "🔒" },
      { id: "part4", label: "CJS vs ESM Syntax", icon: "🔍" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Why Modules Exist in Node.js",
      bigPicture: "Without a module system, all variables and functions would live in one giant global space, leading to naming collisions and impossible-to-maintain code. Node.js was designed from day one to have modular file boundaries. In Node, every file is its own isolated scope: variables declared in one file cannot leak into another unless explicitly exported.",
      breakdownTitle: "The two module systems in modern Node.js:",
      breakdownItems: [
        { title: "CommonJS (CJS)", desc: "Node's original module system using require() and module.exports. Synchronous loading by default." },
        { title: "ECMAScript Modules (ESM)", desc: "The official JavaScript standard using import and export. Static, asynchronous, and browser-compatible." },
        { title: "Enabling ESM in Node", desc: "Set \"type\": \"module\" in package.json or use the .mjs file extension." },
      ],
    },
    part2: {
      title: "Comparison: CommonJS vs ES Modules",
      intro: "Key differences every Node.js developer must know:",
      cards: [
        {
          number: "01",
          tag: "COMMONJS",
          title: "CommonJS (require / exports)",
          description: "Dynamic loading at runtime. Default in older Node codebases. Provides __dirname and __filename globals.",
          color: "amber",
        },
        {
          number: "02",
          tag: "ES MODULES",
          title: "ES Modules (import / export)",
          description: "Static analysis at compile time. Tree-shaking friendly. Uses import.meta.url instead of __dirname.",
          color: "purple",
        },
        {
          number: "03",
          tag: "INTEROP",
          title: "Interoperability Rule",
          description: "ESM can import CJS packages, but CJS cannot use synchronous require() to load pure ESM packages without dynamic import().",
          color: "emerald",
        },
      ],
      rule: {
        title: "Modern Default",
        content: "For new Node.js projects, prefer ES Modules by adding \"type\": \"module\" to package.json for standard modern JS syntax.",
      },
    },
    part3: {
      title: "Module Caching & The Module Wrapper",
      intro: "What Node.js actually does when you load a file:",
      points: [
        {
          title: "Modules are Cached Singletons",
          content: "The first time a module is required/imported, Node.js executes the file and caches the result in memory. Subsequent requires return the exact same cached object without re-running the file.",
        },
        {
          title: "CommonJS Module Wrapper Function",
          content: "In CJS, Node wraps your file in a secret function behind the scenes: `(function(exports, require, module, __filename, __dirname) { ... });`. This is why `exports` and `__dirname` exist!",
        },
        {
          title: "ESM Path Resolutions",
          content: "In Node's native ESM mode, relative import paths must include the file extension: `import { helper } from './utils.js';`.",
          codeSnippet: `// ESM equivalent of __dirname:
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Module Exports",
      bad: {
        title: "Overwriting exports in CommonJS Incorrectly",
        code: `// math.js - Mistake!
// Overwriting the exports reference directly breaks the export link:
exports = function add(a, b) {
  return a + b;
};
// When another file requires math.js, it receives an empty object {}!`,
        explanation: "exports is just a reference pointing to module.exports. If you assign a new value to exports directly, you break that reference. You must use module.exports instead.",
      },
      good: {
        title: "Clean ES Module or module.exports Usage",
        code: `// ESM approach (Recommended):
// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// app.js
import { add, subtract } from "./math.js";
console.log(add(10, 5)); // 15`,
        explanation: "Named exports in ES Modules are clear, statically checkable, and support IDE autocompletion out of the box.",
      },
    },
    part5: {
      title: "Try It: Modular Code Organization",
      intro: "Experiment with exporting and importing helper utility functions:",
      starterCode: `// Simulating a modular service layer
const MathService = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b,
  calculateTax: (subtotal, rate = 0.08) => subtotal * rate,
};

const OrderService = {
  calculateTotal: (items) => {
    const subtotal = items.reduce((acc, item) => acc + item.price, 0);
    const tax = MathService.calculateTax(subtotal);
    return {
      subtotal,
      tax,
      total: MathService.add(subtotal, tax)
    };
  }
};

const cart = [{ name: 'Book', price: 20 }, { name: 'Pen', price: 5 }];
console.log("Order Summary:", OrderService.calculateTotal(cart));`,
    },
    part6: {
      title: "Concept Check: CommonJS vs ESM",
      quiz: {
        question: "How do you enable native ES Module (import/export) syntax in a Node.js project?",
        options: [
          "Install the 'esm-plugin' npm package.",
          "Add \"type\": \"module\" to your project's package.json file.",
          "Run the node command with the --enable-dom flag.",
          "Wrap all files in an async function.",
        ],
        correctIndex: 1,
        explanation: "Adding `\"type\": \"module\"` to your `package.json` instructs Node.js to treat all `.js` files in that directory as standard ES Modules.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "File Boundaries", desc: "Every file in Node.js is an isolated module with its own scope." },
        { title: "Single Execution Cache", desc: "Modules are executed once and cached; subsequent imports receive the cached export." },
        { title: "Standard ESM", desc: "Use import/export with \"type\": \"module\" for modern, standard JavaScript." },
      ],
      nextLessonPreview: {
        title: "NODE-05: npm, package.json & Dependencies",
        desc: "Learn how to manage third-party dependencies, understand SemVer ranges (^ vs ~), and use npm scripts.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-05: npm & package.json
  // ─────────────────────────────────────────────────────────────
  "node05-npm-and-package-json": {
    slug: "node05-npm-and-package-json",
    code: "NODE-05",
    title: "npm, package.json & Dependencies: Scripts, SemVer & Lockfiles",
    subtitle: "Master the Node Package Manager: managing dependencies, package scripts, semantic versioning, and lockfiles.",
    sections: [
      { id: "part1", label: "What is npm?", icon: "📦" },
      { id: "part2", label: "The package.json Blueprint", icon: "📋" },
      { id: "part3", label: "SemVer & Lockfiles", icon: "🔒" },
      { id: "part4", label: "Dependencies vs DevDependencies", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "What is npm and Why Does It Matter?",
      bigPicture: "npm (Node Package Manager) is the world's largest registry of open-source software libraries and the default CLI tool shipped with Node.js. Instead of writing everything from scratch (like cryptographic algorithms or date formatters), you can install tested packages from the registry and link them into your project.",
      breakdownTitle: "Key roles of npm in a project:",
      breakdownItems: [
        { title: "Package Registry", desc: "A searchable online cloud repository containing millions of open-source JavaScript packages." },
        { title: "Project Manifest (package.json)", desc: "A JSON file describing your project metadata, scripts, and list of required dependencies." },
        { title: "Dependency Resolver", desc: "Installs libraries into the node_modules folder and generates a deterministic package-lock.json." },
      ],
    },
    part2: {
      title: "The Anatomy of package.json",
      intro: "The configuration file that defines your Node.js application:",
      cards: [
        {
          number: "01",
          tag: "METADATA",
          title: "Name, Version & Type",
          description: "Defines the project identifier, current semantic version (1.0.0), and module system (\"type\": \"module\").",
          color: "purple",
        },
        {
          number: "02",
          tag: "AUTOMATION",
          title: "Scripts Section",
          description: "Custom command aliases runnable via `npm run <name>` (e.g. `\"start\": \"node server.js\"`, `\"test\": \"node --test\"`).",
          color: "emerald",
        },
        {
          number: "03",
          tag: "LIBRARIES",
          title: "Dependencies List",
          description: "Exact list of external packages required for runtime vs packages only needed during development.",
          color: "cyan",
        },
      ],
      rule: {
        title: "Never Edit node_modules Directly",
        content: "The `node_modules` directory is managed entirely by npm. Never commit it to git; always let team members run `npm install` from `package.json`.",
      },
    },
    part3: {
      title: "Semantic Versioning (SemVer) & package-lock.json",
      intro: "How versions are resolved and locked:",
      points: [
        {
          title: "SemVer Format: MAJOR.MINOR.PATCH",
          content: "Example `2.4.1`: MAJOR = breaking change, MINOR = new backward-compatible feature, PATCH = bug fix.",
        },
        {
          title: "Version Prefixes: Caret (^) vs Tilde (~)",
          content: "`^1.2.3` allows updates to any Minor or Patch version (e.g. 1.3.0). `~1.2.3` only allows Patch updates (e.g. 1.2.9).",
        },
        {
          title: "Why package-lock.json is Mandatory",
          content: "Locks the exact downloaded version of every nested sub-dependency so every developer and production server runs identical code.",
          codeSnippet: `{
  "name": "my-node-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "node --watch src/index.js"
  }
}`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Dependency Categorization",
      bad: {
        title: "Putting Development Tools into Production Dependencies",
        code: `// Mistake in package.json:
{
  "dependencies": {
    "typescript": "^5.3.0",   // Bad: only needed to build, not at runtime
    "eslint": "^8.56.0",       // Bad: linter tool
    "dotenv": "^16.4.0"
  }
}`,
        explanation: "Linters, testing tools, and build compilers should be saved in `devDependencies` using `npm install -D` to keep production containers lean.",
      },
      good: {
        title: "Clean Separation of Dependencies",
        code: `{
  "dependencies": {
    "dotenv": "^16.4.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "eslint": "^8.56.0"
  }
}`,
        explanation: "Production servers can run `npm install --omit=dev` to skip dev dependencies, saving bandwidth and build time.",
      },
    },
    part5: {
      title: "Try It: Simulating package.json Script Execution",
      intro: "Experiment with how npm parses package metadata and resolves script pipelines:",
      starterCode: `// Simulating package.json scripts resolution
const packageJson = {
  name: "learncraft-core",
  version: "2.1.0",
  type: "module",
  scripts: {
    start: "node src/server.js",
    test: "node --test tests/",
    lint: "eslint src/",
    build: "echo 'Build complete!'"
  }
};

function runScript(scriptName) {
  const command = packageJson.scripts[scriptName];
  if (!command) {
    return \`Error: Missing script "\${scriptName}"\`;
  }
  return \`> \${packageJson.name}@\${packageJson.version} \${scriptName}\\n> \${command}\`;
}

console.log(runScript("start"));
console.log("---");
console.log(runScript("test"));`,
    },
    part6: {
      title: "Concept Check: npm & Lockfiles",
      quiz: {
        question: "What is the primary purpose of the package-lock.json file in a Node.js project?",
        options: [
          "To store passwords and encrypted database secrets.",
          "To lock the exact versions of all installed dependencies and their sub-dependencies for deterministic builds.",
          "To prevent other users from reading your JavaScript source code.",
          "To automatically compile JavaScript into WebAssembly.",
        ],
        correctIndex: 1,
        explanation: "package-lock.json records the exact versions of every installed package to guarantee that every environment installs identical dependencies.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "Project Blueprint", desc: "package.json defines your project name, dependencies, scripts, and module type." },
        { title: "Commit the Lockfile", desc: "Always commit package-lock.json to git so all team members and servers install the exact same versions." },
        { title: "devDependencies", desc: "Use -D for tools only used during development (testing, linters, types)." },
      ],
      nextLessonPreview: {
        title: "NODE-06: The Path Module",
        desc: "Learn how to build cross-platform file paths safely across Windows, macOS, and Linux.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-06: The Path Module
  // ─────────────────────────────────────────────────────────────
  "node06-path-module-and-filenames": {
    slug: "node06-path-module-and-filenames",
    code: "NODE-06",
    title: "The Path Module: path.join, resolve & Cross-Platform Paths",
    subtitle: "Safely construct and resolve filesystem paths across Windows, macOS, and Linux without OS delimiter bugs.",
    sections: [
      { id: "part1", label: "Why the Path Module?", icon: "📂" },
      { id: "part2", label: "Core Path Methods", icon: "🛠️" },
      { id: "part3", label: "join vs resolve", icon: "⚖️" },
      { id: "part4", label: "Safe vs Fragile Paths", icon: "🔍" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Why Do We Need the path Module?",
      bigPicture: "Different operating systems format directory paths differently. Windows uses backslashes (like `C:\\Users\\app\\data.json`), while macOS and Linux use forward slashes (`/home/user/app/data.json`). If you concatenate path strings manually with `+ \"/\"`, your application will crash when deployed on Windows or a Linux Docker container. Node's built-in `node:path` module solves this by handling OS-specific separators automatically.",
      breakdownTitle: "What the path module handles:",
      breakdownItems: [
        { title: "Cross-Platform Normalization", desc: "Automatically converts forward slashes and backslashes to match the host operating system." },
        { title: "Resolving Absolute Paths", desc: "Calculates the true absolute path relative to the current working directory." },
        { title: "Extracting Filename Metadata", desc: "Easily retrieves directory names, extensions (`.json`, `.png`), and base filenames." },
      ],
    },
    part2: {
      title: "Essential Methods of node:path",
      intro: "The methods you will use in almost every Node.js backend:",
      cards: [
        {
          number: "01",
          tag: "JOIN",
          title: "path.join(...paths)",
          description: "Joins all given path segments together using the platform-specific separator and normalizes relative segments ('..' and '.').",
          color: "purple",
        },
        {
          number: "02",
          tag: "RESOLVE",
          title: "path.resolve(...paths)",
          description: "Resolves a sequence of paths into an absolute path starting from the current working directory.",
          color: "emerald",
        },
        {
          number: "03",
          tag: "METADATA",
          title: "extname / basename / dirname",
          description: "path.extname('app.ts') -> '.ts'; path.basename('/src/app.ts') -> 'app.ts'; path.dirname('/src/app.ts') -> '/src'.",
          color: "cyan",
        },
      ],
      rule: {
        title: "The Zero-String-Concatenation Rule",
        content: "Never use manual string addition (`dir + '/' + file`) for file paths. Always use `path.join()` or `path.resolve()`.",
      },
    },
    part3: {
      title: "path.join vs path.resolve: The Crucial Difference",
      intro: "Understanding how join and resolve treat leading slashes:",
      points: [
        {
          title: "path.join() simply concatenates and normalizes",
          content: "`path.join('folder', 'subfolder', 'file.txt')` outputs `folder/subfolder/file.txt`. It preserves relative paths.",
        },
        {
          title: "path.resolve() always returns an ABSOLUTE path",
          content: "`path.resolve('folder', 'file.txt')` prepends `process.cwd()` to create a full system path like `/Users/me/app/folder/file.txt`.",
        },
        {
          title: "Leading Slash in path.resolve resets the root",
          content: "`path.resolve('/a', 'b', '/c')` treats `/c` as the root and outputs `/c`, ignoring earlier segments!",
          codeSnippet: `import path from 'node:path';

// Joining segments safely:
const configPath = path.join('config', 'default.json');

// Generating full absolute path:
const absoluteConfig = path.resolve('config', 'default.json');
console.log("Absolute:", absoluteConfig);`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Path Construction",
      bad: {
        title: "Fragile String Concatenation",
        code: `// Mistake: Hardcoding forward slashes
const folder = "uploads";
const file = "avatar.png";

// On Windows, mixing backslashes and forward slashes creates bugs!
const fullPath = __dirname + "/" + folder + "/" + file;`,
        explanation: "Manual slash addition creates double slashes (`//`) and breaks on Windows when combined with backslash paths.",
      },
      good: {
        title: "Safe Cross-Platform path.join",
        code: `import path from "node:path";

const folder = "uploads";
const file = "avatar.png";

// Safe on Windows, macOS, and Linux:
const fullPath = path.join(__dirname, folder, file);
console.log("Clean path:", fullPath);`,
        explanation: "path.join handles duplicate slashes, normalizes relative segments, and uses the correct OS delimiter.",
      },
    },
    part5: {
      title: "Try It: Parsing and Joining Paths",
      intro: "Experiment with constructing and decomposing paths:",
      starterCode: `// Simulating path operations
const pathSimulator = {
  join: (...segments) => segments.filter(Boolean).join('/').replace(/\\/+/g, '/'),
  extname: (filename) => {
    const idx = filename.lastIndexOf('.');
    return idx !== -1 ? filename.slice(idx) : '';
  },
  basename: (filepath) => filepath.split('/').pop() || ''
};

const fullUploadPath = pathSimulator.join('var', 'data', 'uploads', '2026', 'report.pdf');
console.log("Constructed Path:", fullUploadPath);
console.log("Base File:", pathSimulator.basename(fullUploadPath));
console.log("Extension:", pathSimulator.extname(fullUploadPath));`,
    },
    part6: {
      title: "Concept Check: Path Resolution",
      quiz: {
        question: "What is the key difference between path.join() and path.resolve()?",
        options: [
          "path.join() deletes the file, while path.resolve() creates it.",
          "path.join() concatenates segments as-is, while path.resolve() always constructs an absolute path starting from the root.",
          "path.resolve() only works on Windows computers.",
          "There is no difference; they are exact aliases of each other.",
        ],
        correctIndex: 1,
        explanation: "path.join() normalizes and concatenates segments, whereas path.resolve() processes paths from right to left until creating an absolute path.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "No Hardcoded Slashes", desc: "Never manually concatenate file paths with / or \\." },
        { title: "path.join", desc: "Use path.join to glue relative directory segments together safely." },
        { title: "path.resolve", desc: "Use path.resolve when you need a guaranteed absolute path from the current working directory." },
      ],
      nextLessonPreview: {
        title: "NODE-07: The fs Module",
        desc: "Learn how to read, write, append, and inspect files asynchronously using Node's native File System module.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-07: The fs Module
  // ─────────────────────────────────────────────────────────────
  "node07-fs-module-reading-writing": {
    slug: "node07-fs-module-reading-writing",
    code: "NODE-07",
    title: "The File System (fs): Async Reading, Writing & Directories",
    subtitle: "Read files, write outputs, append logs, create directories, and inspect file metadata asynchronously with node:fs.",
    sections: [
      { id: "part1", label: "The File System Module", icon: "📁" },
      { id: "part2", label: "Core File Operations", icon: "📝" },
      { id: "part3", label: "File Metadata & Stats", icon: "📊" },
      { id: "part4", label: "Sync vs Async Callbacks", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "The File System (node:fs) Module",
      bigPicture: "Unlike browser JavaScript which is blocked from touching the user's hard drive for security reasons, Node.js has full filesystem privileges. The built-in `node:fs` module lets you create files, read configuration, write log files, and create directory trees.",
      breakdownTitle: "The three styles of the fs module:",
      breakdownItems: [
        { title: "Synchronous (Blocking)", desc: "`fs.readFileSync()` — pauses the entire program until finished. Useful only for initial bootstrap config." },
        { title: "Callback-based (Async)", desc: "`fs.readFile(path, (err, data) => {})` — Node's original async callback signature." },
        { title: "Promise-based (Modern Async)", desc: "`import fs from 'node:fs/promises'` — Clean async/await syntax (the modern standard)." },
      ],
    },
    part2: {
      title: "Core File System Operations",
      intro: "Common file system operations you will perform in backend services:",
      cards: [
        {
          number: "01",
          tag: "READING",
          title: "fs.readFile(path, 'utf8')",
          description: "Reads the entire file into memory. Specifying 'utf8' returns a string; omitting encoding returns a raw Buffer.",
          color: "purple",
        },
        {
          number: "02",
          tag: "WRITING",
          title: "fs.writeFile(path, data)",
          description: "Creates the file if it does not exist, or completely overwrites existing contents with the new data.",
          color: "emerald",
        },
        {
          number: "03",
          tag: "APPENDING",
          title: "fs.appendFile(path, data)",
          description: "Appends new text to the end of an existing file (ideal for loggers and audit trails).",
          color: "amber",
        },
        {
          number: "04",
          tag: "DIRECTORIES",
          title: "fs.mkdir(path, { recursive: true })",
          description: "Creates directories recursively without throwing an error if the directory already exists.",
          color: "cyan",
        },
      ],
      rule: {
        title: "Always Handle File Errors",
        content: "File operations can fail at any time (missing file, permission denied, disk full). Always wrap in try/catch or inspect the error callback.",
      },
    },
    part3: {
      title: "File Metadata & Inspection with fs.stat()",
      intro: "Checking if a path exists and inspecting its size or timestamps:",
      points: [
        {
          title: "Inspecting File Stats",
          content: "`fs.stat(path)` returns a `Stats` object containing file size in bytes, creation time (`birthtime`), and last modified time (`mtime`).",
        },
        {
          title: "Checking File vs Directory",
          content: "Use `stats.isFile()` and `stats.isDirectory()` to determine what kind of filesystem entry a path is.",
        },
        {
          title: "Reading Directory Contents",
          content: "`fs.readdir(dirPath)` returns an array of all filenames located inside the given directory.",
          codeSnippet: `import fs from 'node:fs/promises';

const stats = await fs.stat('./package.json');
console.log("Is file:", stats.isFile());
console.log("Size in bytes:", stats.size);
console.log("Last modified:", stats.mtime);`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Reading Files",
      bad: {
        title: "Forgetting the Encoding Parameter",
        code: `// Mistake: Omitting 'utf8' encoding
import fs from "node:fs/promises";

async function showConfig() {
  const data = await fs.readFile("./config.json");
  // Prints raw hex Buffer: <Buffer 7b 0a 20 20 22 70 6f 72 74 ...>
  console.log("Config content:", data);
}`,
        explanation: "By default, fs.readFile returns a raw binary Buffer. Pass 'utf8' as the second argument to receive a decoded string.",
      },
      good: {
        title: "Specifying utf8 and Parsing JSON Safely",
        code: `import fs from "node:fs/promises";

async function showConfig() {
  try {
    const text = await fs.readFile("./config.json", "utf8");
    const config = JSON.parse(text);
    console.log("Loaded port:", config.port);
  } catch (err) {
    console.error("Failed to load config:", err.message);
  }
}`,
        explanation: "Passing 'utf8' produces a readable string, and wrapping in try/catch prevents the server from crashing if the file is missing.",
      },
    },
    part5: {
      title: "Try It: Simulating File System Reads and Writes",
      intro: "Experiment with an in-memory virtual filesystem simulator:",
      starterCode: `// Virtual File System Simulator
class VirtualFS {
  constructor() {
    this.storage = new Map();
  }

  async writeFile(path, content) {
    this.storage.set(path, String(content));
    return \`Wrote \${content.length} characters to \${path}\`;
  }

  async readFile(path) {
    if (!this.storage.has(path)) {
      throw new Error(\`ENOENT: no such file or directory '\${path}'\`);
    }
    return this.storage.get(path);
  }
}

const vfs = new VirtualFS();

async function run() {
  await vfs.writeFile('/etc/hosts', '127.0.0.1 localhost');
  console.log("File saved!");
  const content = await vfs.readFile('/etc/hosts');
  console.log("File content:", content);
}

run();`,
    },
    part6: {
      title: "Concept Check: fs.readFile Encoding",
      quiz: {
        question: "What does fs.readFile('app.log') return if you do NOT provide an encoding parameter (like 'utf8')?",
        options: [
          "An empty string.",
          "A raw binary Buffer object.",
          "A parsed JSON object.",
          "A JavaScript Promise that never resolves.",
        ],
        correctIndex: 1,
        explanation: "Without an encoding parameter, fs.readFile returns the raw binary Buffer representation of the file's bytes.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "Always Async", desc: "Use asynchronous file operations in production to avoid freezing the single main thread." },
        { title: "utf8 Encoding", desc: "Provide 'utf8' when reading text or JSON files, or you will receive a raw Buffer." },
        { title: "Safe Directories", desc: "Use { recursive: true } when calling fs.mkdir to safely create nested directories." },
      ],
      nextLessonPreview: {
        title: "NODE-08: fs/promises & Safe File Operations",
        desc: "Master modern async/await file manipulation with fs/promises, atomic writes, and error safety.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-08: fs/promises & Safe File Operations
  // ─────────────────────────────────────────────────────────────
  "node08-fs-promises-safe-operations": {
    slug: "node08-fs-promises-safe-operations",
    code: "NODE-08",
    title: "fs/promises & Safe File Operations: Modern async/await I/O",
    subtitle: "Write clean, robust, and crash-proof file manipulation code using node:fs/promises and structured error checking.",
    sections: [
      { id: "part1", label: "The Promise API", icon: "✨" },
      { id: "part2", label: "Atomic Writes & Safety", icon: "🛡️" },
      { id: "part3", label: "Common Error Codes (ENOENT)", icon: "⚠️" },
      { id: "part4", label: "Callback Hell vs async/await", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Modern File I/O: node:fs/promises",
      bigPicture: "In early Node.js versions, doing multiple file operations sequentially required deeply nested callbacks ('Callback Hell'). Today, Node provides `node:fs/promises`, which returns native JavaScript Promises for every file operation. This allows you to use clean `async/await` syntax with standard `try/catch` error blocks.",
      breakdownTitle: "Benefits of node:fs/promises:",
      breakdownItems: [
        { title: "Clean async/await Syntax", desc: "Write sequential asynchronous file operations that read like synchronous code without blocking the event loop." },
        { title: "Standard try/catch Handling", desc: "Catch errors naturally at any point in the workflow without managing error callback parameters." },
        { title: "Promise Composition", desc: "Easily run multiple file operations in parallel using Promise.all() for maximum performance." },
      ],
    },
    part2: {
      title: "Safe File Handling Patterns",
      intro: "Best practices for writing production-grade file services:",
      cards: [
        {
          number: "01",
          tag: "ERROR CODES",
          title: "Checking err.code === 'ENOENT'",
          description: "ENOENT means 'Error No Entity' (file not found). Check for this specific code before creating fallback defaults.",
          color: "amber",
        },
        {
          number: "02",
          tag: "ATOMIC WRITES",
          title: "Write-and-Rename Pattern",
          description: "Write data to a temporary file (`file.tmp`), then rename it to `file.json`. If the server crashes mid-write, the original file is never corrupted.",
          color: "emerald",
        },
        {
          number: "03",
          tag: "PARALLEL READS",
          title: "Promise.all() for Multiple Files",
          description: "Read 10 configuration files simultaneously in the background instead of awaiting them one-by-one.",
          color: "purple",
        },
      ],
      rule: {
        title: "Do Not Check With fs.access() Before Reading",
        content: "Avoid 'check-then-act' race conditions (TOCTOU). Instead of checking if a file exists before reading, simply attempt to read it and catch ENOENT.",
      },
    },
    part3: {
      title: "The Write-and-Rename Pattern Explained",
      intro: "How production databases and logging engines prevent corrupted files on crash:",
      points: [
        {
          title: "1. The Risk of Direct Writes",
          content: "If you call `fs.writeFile('data.json', hugeString)` and the server loses power at 50%, `data.json` will be left half-written and corrupted.",
        },
        {
          title: "2. The Temporary File Strategy",
          content: "Write the new content to `data.json.tmp`. At this point, the old `data.json` is still 100% intact.",
        },
        {
          title: "3. Atomic Rename",
          content: "Call `fs.rename('data.json.tmp', 'data.json')`. Operating systems perform file renames atomically, ensuring zero data corruption.",
          codeSnippet: `import fs from 'node:fs/promises';

async function safeSave(filepath, content) {
  const tempPath = \`\${filepath}.\${Date.now()}.tmp\`;
  await fs.writeFile(tempPath, content, 'utf8');
  await fs.rename(tempPath, filepath); // Atomic operation
}`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Callback Pyramid vs async/await",
      bad: {
        title: "Deeply Nested Callback Pyramid",
        code: `// Old Node style: Callback Hell
const fs = require("fs");

fs.readFile("user.json", "utf8", (err, data) => {
  if (err) return console.error(err);
  const user = JSON.parse(data);
  user.lastLogin = Date.now();

  fs.writeFile("user.json", JSON.stringify(user), (err2) => {
    if (err2) return console.error(err2);
    console.log("Updated user!");
  });
});`,
        explanation: "Nested callbacks make error handling fragmented and are prone to unhandled exceptions.",
      },
      good: {
        title: "Linear async/await with fs/promises",
        code: `import fs from "node:fs/promises";

async function updateUserLogin(filepath) {
  try {
    const raw = await fs.readFile(filepath, "utf8");
    const user = JSON.parse(raw);
    user.lastLogin = Date.now();
    await fs.writeFile(filepath, JSON.stringify(user, null, 2), "utf8");
    console.log("Updated user safely!");
  } catch (err) {
    if (err.code === "ENOENT") {
      console.warn("User file does not exist yet.");
    } else {
      console.error("File update failed:", err.message);
    }
  }
}`,
        explanation: "fs/promises allows linear, readable code with unified try/catch error classification.",
      },
    },
    part5: {
      title: "Try It: Parallel Async File Operations",
      intro: "Simulate loading multiple data files concurrently with Promise.all():",
      starterCode: `// Simulating parallel async file reads
const mockFiles = {
  'users.json': JSON.stringify([{ id: 1, name: 'Alice' }]),
  'settings.json': JSON.stringify({ theme: 'dark', language: 'en' }),
  'meta.json': JSON.stringify({ version: '1.4.0' })
};

async function readMockFile(filename) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockFiles[filename]) resolve(JSON.parse(mockFiles[filename]));
      else reject(new Error(\`ENOENT: File not found \${filename}\`));
    }, 50);
  });
}

async function bootstrap() {
  console.log("Loading all configs in parallel...");
  const [users, settings, meta] = await Promise.all([
    readMockFile('users.json'),
    readMockFile('settings.json'),
    readMockFile('meta.json')
  ]);
  
  console.log("Users:", users);
  console.log("Settings Theme:", settings.theme);
  console.log("App Version:", meta.version);
}

bootstrap();`,
    },
    part6: {
      title: "Concept Check: Safe File Handling",
      quiz: {
        question: "What does the error code 'ENOENT' indicate in a Node.js filesystem error?",
        options: [
          "The hard drive is out of memory space.",
          "The requested file or directory does not exist at the specified path.",
          "The user does not have permission to write to the file.",
          "The file contains invalid JavaScript syntax.",
        ],
        correctIndex: 1,
        explanation: "ENOENT stands for 'Error NO ENTIty' (No such file or directory).",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "fs/promises Standard", desc: "Always import from 'node:fs/promises' for modern async/await file handling." },
        { title: "Catch ENOENT", desc: "Check if err.code === 'ENOENT' to handle missing files gracefully." },
        { title: "Atomic Writes", desc: "Write to a temporary file first, then rename to guarantee zero data corruption on sudden crashes." },
      ],
      nextLessonPreview: {
        title: "NODE-09: The EventEmitter Pattern",
        desc: "Discover how Node's event-driven architecture powers internal modules and custom pub/sub systems.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-09: The EventEmitter Pattern
  // ─────────────────────────────────────────────────────────────
  "node09-event-emitter-pattern": {
    slug: "node09-event-emitter-pattern",
    code: "NODE-09",
    title: "The EventEmitter: Custom Events, Listeners & Observers",
    subtitle: "Master the publish/subscribe pattern in Node.js using EventEmitter: emitting events, listening, and memory leak prevention.",
    sections: [
      { id: "part1", label: "What is an Event?", icon: "📢" },
      { id: "part2", label: "The EventEmitter API", icon: "🛠️" },
      { id: "part3", label: "Memory Leaks & Cleanup", icon: "🧹" },
      { id: "part4", label: "Tight Coupling vs EventEmitter", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "What is an Event in Node.js?",
      bigPicture: "An event is simply a way for a system to say: 'Hey! Something important just happened!' Much of Node's core (HTTP servers, Streams, process signals) is built around events. The `node:events` module gives us the `EventEmitter` class, which allows you to build decoupled publish/subscribe (Pub/Sub) architectures.",
      breakdownTitle: "Why EventEmitter is so powerful:",
      breakdownItems: [
        { title: "Decoupled Architecture", desc: "The component that emits the event does not need to know which functions are listening to it." },
        { title: "Multiple Listeners", desc: "A single event (like 'userRegistered') can trigger an email, write an audit log, and update metrics simultaneously." },
        { title: "Core Foundation", desc: "Streams, HTTP requests, and socket connections are all subclasses of EventEmitter." },
      ],
    },
    part2: {
      title: "The EventEmitter Core API",
      intro: "The fundamental methods of EventEmitter:",
      cards: [
        {
          number: "01",
          tag: "REGISTER",
          title: "emitter.on(eventName, listener)",
          description: "Registers a callback function that will be executed every time the specified event is emitted.",
          color: "purple",
        },
        {
          number: "02",
          tag: "TRIGGER",
          title: "emitter.emit(eventName, ...args)",
          description: "Synchronously calls all registered listeners for the event in the order they were registered, passing any optional arguments.",
          color: "emerald",
        },
        {
          number: "03",
          tag: "ONE-TIME",
          title: "emitter.once(eventName, listener)",
          description: "Registers a listener that will only fire once. After firing, it automatically removes itself.",
          color: "amber",
        },
        {
          number: "04",
          tag: "CLEANUP",
          title: "emitter.off(eventName, listener)",
          description: "Removes a specific listener function to prevent memory leaks when a component is destroyed.",
          color: "cyan",
        },
      ],
      rule: {
        title: "The 'error' Event Rule",
        content: "If an EventEmitter emits an 'error' event and NO listener is registered for 'error', Node.js will throw an unhandled exception and crash the entire process.",
      },
    },
    part3: {
      title: "Memory Leaks & The MaxListeners Warning",
      intro: "How to avoid common EventEmitter pitfalls:",
      points: [
        {
          title: "The 10-Listener Warning",
          content: "By default, if you attach more than 10 listeners to a single event on an EventEmitter, Node logs a warning: `MaxListenersExceededWarning`. This is a safeguard against forgotten listeners in loops.",
        },
        {
          title: "Always Remove Listeners",
          content: "If you dynamically attach listeners to a long-lived EventEmitter, always call `emitter.off()` when the operation completes to avoid retaining memory references.",
        },
        {
          title: "Always Listen for 'error'",
          content: "Always register `emitter.on('error', (err) => { ... })` on any emitter to handle failures gracefully without crashing.",
          codeSnippet: `import { EventEmitter } from 'node:events';

class UserService extends EventEmitter {
  createUser(username) {
    // Business logic...
    this.emit('userCreated', { username, timestamp: Date.now() });
  }
}`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Coupling vs Event Pub/Sub",
      bad: {
        title: "Tightly Coupled Direct Method Calls",
        code: `// Mistake: OrderService directly calls every subsystem
class OrderService {
  checkout(order) {
    saveToDatabase(order);
    sendEmailReceipt(order);    // If this fails, checkout breaks
    notifyWarehouse(order);     // Hardcoded dependency
    trackAnalytics(order);      // Cluttered service
  }
}`,
        explanation: "Hardcoding every notification inside the checkout method makes the service brittle, bloated, and difficult to test.",
      },
      good: {
        title: "Clean Pub/Sub with EventEmitter",
        code: `import { EventEmitter } from "node:events";

class OrderService extends EventEmitter {
  checkout(order) {
    // 1. Process primary domain work
    saveToDatabase(order);

    // 2. Emit event for interested listeners
    this.emit("orderPlaced", order);
  }
}

const orderService = new OrderService();

// Decoupled listeners in separate modules:
orderService.on("orderPlaced", (o) => sendEmailReceipt(o));
orderService.on("orderPlaced", (o) => notifyWarehouse(o));
orderService.on("orderPlaced", (o) => trackAnalytics(o));`,
        explanation: "The OrderService only cares about processing the order and announcing it. Other modules subscribe independently.",
      },
    },
    part5: {
      title: "Try It: Building a Custom Event Bus",
      intro: "Experiment with emitting and handling custom events with multiple subscribers:",
      starterCode: `// Simulating an EventEmitter class
class SimpleEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return false;
    for (const listener of this.events.get(event)) {
      listener(...args);
    }
    return true;
  }
}

const bus = new SimpleEmitter();

// Subscribe
bus.on('paymentSuccess', (data) => console.log("📧 Email receipt sent to:", data.email));
bus.on('paymentSuccess', (data) => console.log("📊 Analytics logged for amount: $" + data.amount));

// Trigger
console.log("Processing payment...");
bus.emit('paymentSuccess', { email: 'user@example.com', amount: 99.00 });`,
    },
    part6: {
      title: "Concept Check: Unhandled 'error' Event",
      quiz: {
        question: "What happens if an EventEmitter emits an 'error' event and no listener was registered for 'error'?",
        options: [
          "Node.js ignores it silently and continues executing.",
          "Node.js prints a yellow warning in the terminal but keeps running.",
          "Node.js throws an unhandled exception and crashes the entire process.",
          "The error is automatically logged into a file named error.log.",
        ],
        correctIndex: 2,
        explanation: "In Node.js, an unhandled 'error' event on an EventEmitter causes Node to print a stack trace and immediately terminate the process.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "Decoupled Architecture", desc: "Use EventEmitter to announce state changes without tightly coupling services together." },
        { title: "Always Listen to 'error'", desc: "Always attach an 'error' listener to prevent unhandled process crashes." },
        { title: "Remove Listeners", desc: "Use emitter.off() or emitter.once() to prevent memory leaks." },
      ],
      nextLessonPreview: {
        title: "NODE-10: Buffers & Binary Data",
        desc: "Learn how Node.js represents raw memory bytes, handles encodings (utf-8, hex, base64), and manages binary data.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-10: Buffers & Binary Data
  // ─────────────────────────────────────────────────────────────
  "node10-buffers-and-binary-data": {
    slug: "node10-buffers-and-binary-data",
    code: "NODE-10",
    title: "Buffers & Binary Data: Raw Memory, Hex & Encodings",
    subtitle: "Understand how Node.js manages raw bytes in memory outside the V8 heap: allocation, encodings, and byte manipulation.",
    sections: [
      { id: "part1", label: "Why Do We Need Buffers?", icon: "💾" },
      { id: "part2", label: "Creating & Reading Buffers", icon: "🔍" },
      { id: "part3", label: "Encodings: UTF-8, Hex & Base64", icon: "🔤" },
      { id: "part4", label: "Buffer.alloc vs allocUnsafe", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Why Do We Need Buffers in Node.js?",
      bigPicture: "Originally, JavaScript was designed only to handle strings and numbers in the browser. But server applications must handle raw binary streams: JPEG images, PDF files, encrypted TLS certificates, and TCP network packets. The `Buffer` class in Node.js provides a fixed-size chunk of raw memory allocated outside the V8 JavaScript garbage-collected heap.",
      breakdownTitle: "What a Buffer is:",
      breakdownItems: [
        { title: "Array of Octets (Bytes)", desc: "A Buffer is a sequence of integers where each element is an 8-bit byte (0 to 255)." },
        { title: "Fixed Memory Allocation", desc: "Once a Buffer is created, its size cannot be increased or decreased." },
        { title: "Direct OS Memory", desc: "Allocated in C++ memory outside the V8 heap, making binary operations blazingly fast." },
      ],
    },
    part2: {
      title: "Creating and Manipulating Buffers",
      intro: "The modern, safe methods for working with Buffers:",
      cards: [
        {
          number: "01",
          tag: "FROM DATA",
          title: "Buffer.from(string, encoding)",
          description: "Converts a string, array of numbers, or existing buffer into a new Buffer.",
          color: "purple",
        },
        {
          number: "02",
          tag: "SAFE ALLOC",
          title: "Buffer.alloc(size)",
          description: "Allocates a new buffer of `size` bytes, initialized with all zeroes for security.",
          color: "emerald",
        },
        {
          number: "03",
          tag: "STRING CONVERT",
          title: "buf.toString(encoding)",
          description: "Decodes the raw bytes back into a readable string using 'utf8', 'hex', or 'base64'.",
          color: "cyan",
        },
        {
          number: "04",
          tag: "COMBINE",
          title: "Buffer.concat(list)",
          description: "Concatenates multiple Buffer chunks into a single unified Buffer (vital when receiving stream chunks).",
          color: "amber",
        },
      ],
      rule: {
        title: "Avoid Deprecated new Buffer()",
        content: "`new Buffer()` is deprecated and dangerous. Always use `Buffer.from()` or `Buffer.alloc()`.",
      },
    },
    part3: {
      title: "Understanding Binary Encodings",
      intro: "How strings become bytes and bytes become strings:",
      points: [
        {
          title: "UTF-8 (Default)",
          content: "Variable-length character encoding. ASCII characters take 1 byte; special symbols and emojis can take 2 to 4 bytes.",
        },
        {
          title: "Hexadecimal (Hex)",
          content: "Encodes each byte as a 2-character base-16 number (00 to ff). Commonly used for cryptographic hashes.",
        },
        {
          title: "Base64",
          content: "Encodes 3 bytes into 4 printable ASCII characters. Standard for sending images and binary files in JSON or HTTP headers.",
          codeSnippet: `const buf = Buffer.from('Hello 🌍', 'utf8');
console.log("Byte length:", buf.length); // 10 bytes!
console.log("Hex format:", buf.toString('hex'));
console.log("Base64 format:", buf.toString('base64'));`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Buffer Allocation",
      bad: {
        title: "Using Buffer.allocUnsafe Without Overwriting",
        code: `// Danger: allocUnsafe does NOT clear memory!
const buf = Buffer.allocUnsafe(100);

// If this buffer is sent over the network before being filled,
// it might leak leftover memory data (passwords, tokens, keys) from previous operations!
res.end(buf);`,
        explanation: "Buffer.allocUnsafe allocates memory faster because it does not overwrite old RAM. If not filled immediately, it poses a security leak.",
      },
      good: {
        title: "Using Buffer.alloc for Guaranteed Zeroed Memory",
        code: `// Safe: Buffer.alloc fills the memory with zeroes
const buf = Buffer.alloc(100);

// Writing safe data:
buf.write("Safe message", "utf8");
console.log("Zeroed and safe:", buf.toString("utf8"));`,
        explanation: "Buffer.alloc guarantees all allocated bytes are zeroed out, preventing accidental data leakage.",
      },
    },
    part5: {
      title: "Try It: Encoding and Decoding with Buffers",
      intro: "Experiment with creating Buffers and converting between UTF-8, Hex, and Base64:",
      starterCode: `// Working with Buffers
const text = "LearnCraft Node Engine";
const buffer = Buffer.from(text, 'utf8');

console.log("Original Text:", text);
console.log("Buffer (Hex bytes):", buffer);
console.log("Byte Length:", buffer.length, "bytes");

const base64String = buffer.toString('base64');
console.log("Base64 Encoded:", base64String);

const restored = Buffer.from(base64String, 'base64').toString('utf8');
console.log("Restored Text:", restored);`,
    },
    part6: {
      title: "Concept Check: String length vs Buffer length",
      quiz: {
        question: "Why does Buffer.from('🚀').length equal 4, while '🚀'.length in JavaScript equals 2?",
        options: [
          "Because Node.js has a bug in its character counting algorithm.",
          "Because '🚀' takes 4 raw bytes in UTF-8 binary encoding, whereas JS string.length counts UTF-16 code units.",
          "Because Buffers always add 2 extra padding bytes.",
          "Because emojis are stored as 64-bit floating point numbers.",
        ],
        correctIndex: 1,
        explanation: "Buffer.length measures raw memory size in bytes (the rocket emoji takes 4 bytes in UTF-8), while string.length measures 16-bit code units.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "Raw Memory", desc: "Buffers represent raw binary byte arrays allocated outside the V8 heap." },
        { title: "Safe Allocation", desc: "Always use Buffer.from() or Buffer.alloc(), never the deprecated new Buffer()." },
        { title: "Encodings", desc: "Convert seamlessly between utf8, hex, and base64 using buf.toString(encoding)." },
      ],
      nextLessonPreview: {
        title: "NODE-11: Streams Fundamentals",
        desc: "Learn how to process gigabytes of data piece-by-piece using Readable and Writable streams with minimal RAM.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-11: Streams Fundamentals
  // ─────────────────────────────────────────────────────────────
  "node11-streams-readable-writable": {
    slug: "node11-streams-readable-writable",
    code: "NODE-11",
    title: "Streams Fundamentals: Readable, Writable & Memory Efficiency",
    subtitle: "Process massive files and network data chunk-by-chunk without exhausting server memory.",
    sections: [
      { id: "part1", label: "The Streaming Philosophy", icon: "🌊" },
      { id: "part2", label: "The 4 Types of Streams", icon: "🧩" },
      { id: "part3", label: "Readable & Writable Events", icon: "🔄" },
      { id: "part4", label: "Memory: Buffers vs Streams", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "The Streaming Philosophy: Chunk-by-Chunk",
      bigPicture: "Imagine watching a 4K movie on Netflix. Does Netflix download the entire 15 Gigabyte movie file onto your computer before allowing you to watch the first second? No! It sends small chunks of data continuously as you watch. In Node.js, Streams work the exact same way: instead of reading a 2GB file entirely into RAM at once, Streams process the file 64 Kilobytes at a time as the data arrives.",
      breakdownTitle: "Why Streams are crucial in Node.js:",
      breakdownItems: [
        { title: "Tiny Memory Footprint", desc: "You can process a 10GB file on a server with only 50MB of available RAM." },
        { title: "Time Efficiency", desc: "Start processing or sending the first chunk immediately without waiting for the whole payload to finish downloading." },
        { title: "Native HTTP & FS Integration", desc: "Node's http request/response and fs read/write streams are built as native Streams." },
      ],
    },
    part2: {
      title: "The Four Types of Node.js Streams",
      intro: "Every stream in Node belongs to one of four fundamental categories:",
      cards: [
        {
          number: "01",
          tag: "INPUT",
          title: "Readable Streams",
          description: "An abstraction for a source from which data can be consumed (e.g., `fs.createReadStream()`, `http.IncomingMessage`).",
          color: "purple",
        },
        {
          number: "02",
          tag: "OUTPUT",
          title: "Writable Streams",
          description: "An abstraction for a destination to which data can be written (e.g., `fs.createWriteStream()`, `http.ServerResponse`).",
          color: "emerald",
        },
        {
          number: "03",
          tag: "TWO-WAY",
          title: "Duplex Streams",
          description: "A stream that is both Readable and Writable (e.g., a TCP network socket connection).",
          color: "cyan",
        },
        {
          number: "04",
          tag: "MODIFY",
          title: "Transform Streams",
          description: "A Duplex stream where the output is computed based on transforming the input (e.g., zlib compression or crypto encryption).",
          color: "amber",
        },
      ],
      rule: {
        title: "The Memory Rule",
        content: "If a file or payload could exceed a few megabytes, never use `fs.readFile()`. Always use a Stream.",
      },
    },
    part3: {
      title: "Readable and Writable Stream Events",
      intro: "How to listen to chunks as they flow through the stream:",
      points: [
        {
          title: "stream.on('data', chunk)",
          content: "Fires whenever a new piece (chunk) of data is available from the source. The chunk is a Buffer.",
        },
        {
          title: "stream.on('end')",
          content: "Fires when there is no more data to be consumed from the Readable stream.",
        },
        {
          title: "stream.on('error', err)",
          content: "Fires if reading fails (e.g. disk read error or broken network socket). Always handle this!",
          codeSnippet: `import fs from 'node:fs';

const readStream = fs.createReadStream('./large-log.txt', {
  highWaterMark: 64 * 1024 // 64KB chunk size
});

readStream.on('data', (chunk) => {
  console.log("Received chunk of size:", chunk.length, "bytes");
});

readStream.on('end', () => console.log("Done streaming file!"));`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Buffering vs Streaming a File",
      bad: {
        title: "Loading a 1GB File Into Memory at Once",
        code: `// Mistake: Reading the entire file into RAM before serving
import fs from "node:fs/promises";
import http from "node:http";

http.createServer(async (req, res) => {
  // If 50 users request this simultaneously, the server tries to hold
  // 50GB of RAM and crashes with: "JavaScript heap out of memory"!
  const bigFile = await fs.readFile("./movie.mp4");
  res.end(bigFile);
});`,
        explanation: "Reading large files entirely into RAM causes catastrophic memory exhaustion under concurrent traffic.",
      },
      good: {
        title: "Streaming the File Directly to the Response",
        code: `import fs from "node:fs";
import http from "node:http";

http.createServer((req, res) => {
  // Memory consumption is only ~64KB per user!
  const readStream = fs.createReadStream("./movie.mp4");
  
  res.writeHead(200, { "Content-Type": "video/mp4" });
  readStream.pipe(res); // Streams chunk-by-chunk directly to the client
});`,
        explanation: "Streaming chunks directly from disk to the client response keeps memory flat regardless of file size.",
      },
    },
    part5: {
      title: "Try It: Simulating a Chunk-by-Chunk Stream",
      intro: "Observe how data is pushed and processed in discrete chunks:",
      starterCode: `// Simulating chunked streaming processing
const dataChunks = [
  "Chunk 1: [User: Alice, Action: Login]\\n",
  "Chunk 2: [User: Bob, Action: Purchase]\\n",
  "Chunk 3: [User: Charlie, Action: Logout]\\n"
];

let totalBytesProcessed = 0;

function processChunk(chunk, index) {
  const bytes = chunk.length;
  totalBytesProcessed += bytes;
  console.log(\`📦 Received Chunk #\${index + 1} (\${bytes} bytes): \${chunk.trim()}\`);
}

dataChunks.forEach((chunk, idx) => {
  setTimeout(() => {
    processChunk(chunk, idx);
    if (idx === dataChunks.length - 1) {
      console.log(\`✅ Stream complete! Total bytes processed: \${totalBytesProcessed} bytes\`);
    }
  }, idx * 100);
});`,
    },
    part6: {
      title: "Concept Check: Stream Memory Usage",
      quiz: {
        question: "Why does streaming a 5GB video file use almost no RAM compared to fs.readFile?",
        options: [
          "Streams delete the video file from the hard drive while reading.",
          "Streams process only a small buffer chunk (e.g. 64KB) in memory at any given moment before discarding it.",
          "Streams run on the user's computer instead of the server.",
          "Streams compress the file using quantum encryption.",
        ],
        correctIndex: 1,
        explanation: "Streams only hold the current small chunk (e.g. 64KB) in RAM at any moment, allowing files of any size to be processed safely.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "Chunk-by-Chunk", desc: "Streams process data in small pieces without buffering the entire dataset in RAM." },
        { title: "Four Types", desc: "Readable (input), Writable (output), Duplex (two-way), and Transform (modify)." },
        { title: "Huge Performance Win", desc: "Streams allow your backend to serve massive files efficiently under high concurrency." },
      ],
      nextLessonPreview: {
        title: "NODE-12: Piping Streams & Backpressure",
        desc: "Learn how to connect streams with stream.pipeline(), handle slow clients, and prevent memory overflow with backpressure.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-12: Piping Streams & Backpressure
  // ─────────────────────────────────────────────────────────────
  "node12-piping-and-backpressure": {
    slug: "node12-piping-and-backpressure",
    code: "NODE-12",
    title: "Piping Streams & Backpressure: pipeline() & Transform Streams",
    subtitle: "Safely connect data pipes with stream.pipeline(), manage backpressure when clients are slow, and compress data on the fly.",
    sections: [
      { id: "part1", label: "The Piping Concept", icon: "🚰" },
      { id: "part2", label: "What is Backpressure?", icon: "🛑" },
      { id: "part3", label: "stream.pipeline vs .pipe()", icon: "🛡️" },
      { id: "part4", label: "Transform Streams (Gzip)", icon: "🔄" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Piping: Connecting Data Faucets to Drains",
      bigPicture: "Piping is the mechanism of taking the output of a Readable stream and feeding it directly into the input of a Writable stream. It's like connecting a water hose: water flows straight from the source (file or network) into the destination without you having to write manual event loops.",
      breakdownTitle: "Key components in a stream pipeline:",
      breakdownItems: [
        { title: "Source (Readable)", desc: "Reads bytes from disk, network socket, or process input." },
        { title: "Transform (Optional)", desc: "Modifies bytes on the fly (e.g. gzip compression, encryption, uppercase conversion)." },
        { title: "Destination (Writable)", desc: "Writes bytes to a destination file, HTTP response, or database stream." },
      ],
    },
    part2: {
      title: "What is Backpressure?",
      intro: "The most important concept in high-performance streaming:",
      cards: [
        {
          number: "01",
          tag: "THE PROBLEM",
          title: "Fast Reader, Slow Writer",
          description: "If your NVMe hard drive reads data at 1,000 MB/sec, but a mobile client downloads at 1 MB/sec, where do the unread 999 MB go? Into server RAM!",
          color: "rose",
        },
        {
          number: "02",
          tag: "THE SOLUTION",
          title: "Backpressure Signal",
          description: "When the Writable stream's internal buffer is full, it signals the Readable stream: 'Stop reading! Pause until I catch up!'",
          color: "emerald",
        },
        {
          number: "03",
          tag: "AUTOMATION",
          title: "Built-in Flow Control",
          description: "Both `pipe()` and `stream.pipeline()` handle backpressure automatically by pausing and resuming the readable source.",
          color: "purple",
        },
      ],
      rule: {
        title: "Always Use pipeline() in Production",
        content: "Never use plain `.pipe()` in production because it does not automatically destroy streams and clean up file descriptors if an error occurs. Always use `stream/promises pipeline()`.",
      },
    },
    part3: {
      title: "stream.pipeline vs readable.pipe()",
      intro: "Why pipeline() is the industry standard for production code:",
      points: [
        {
          title: "1. Automatic Error Propagation",
          content: "If the destination writable stream errors out (e.g. client disconnects abruptly), `pipeline()` immediately destroys all streams in the chain, closing open file descriptors.",
        },
        {
          title: "2. Clean Promise / Async/Await Interface",
          content: "With `import { pipeline } from 'node:stream/promises'`, you can `await pipeline(...)` directly in async functions.",
        },
        {
          title: "3. Clean Multi-Stage Chaining",
          content: "Easily chain 3, 4, or 5 transform streams together in one readable line of code.",
          codeSnippet: `import { pipeline } from 'node:stream/promises';
import fs from 'node:fs';
import zlib from 'node:zlib';

// Compressing a file with full backpressure and error safety:
await pipeline(
  fs.createReadStream('input.txt'),
  zlib.createGzip(),
  fs.createWriteStream('input.txt.gz')
);
console.log("Compression pipeline finished!");`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Stream Piping",
      bad: {
        title: "Using .pipe() Without Error Cleanup",
        code: `// Mistake: Old .pipe() leaks file handles on error
const fs = require("fs");

const src = fs.createReadStream("huge.log");
const dest = fs.createWriteStream("copy.log");

// If dest fails (e.g. disk full), src stays OPEN forever in memory!
src.pipe(dest);`,
        explanation: "Old .pipe() does not close the readable stream if the writable stream encounters an error, causing memory and file descriptor leaks.",
      },
      good: {
        title: "Using stream/promises pipeline()",
        code: `import { pipeline } from "node:stream/promises";
import fs from "node:fs";

async function copyFileSafely() {
  try {
    await pipeline(
      fs.createReadStream("huge.log"),
      fs.createWriteStream("copy.log")
    );
    console.log("File safely copied!");
  } catch (err) {
    console.error("Pipeline failed and cleaned up all handles:", err.message);
  }
}`,
        explanation: "pipeline() guarantees that all streams are destroyed and memory is freed even if an error occurs mid-stream.",
      },
    },
    part5: {
      title: "Try It: Simulating a Stream Transformation Pipeline",
      intro: "Experiment with chaining data transformation stages through a pipeline:",
      starterCode: `// Simulating a stream transform pipeline
function uppercaseTransform(chunk) {
  return chunk.toUpperCase();
}

function tagTransform(chunk) {
  return \`[LOG]: \${chunk}\`;
}

const rawInputs = [
  "server started on port 3000\\n",
  "database connection established\\n",
  "incoming request /api/users\\n"
];

console.log("=== Pipeline Execution ===");
for (const input of rawInputs) {
  // Stage 1: Uppercase -> Stage 2: Tag
  const step1 = uppercaseTransform(input);
  const step2 = tagTransform(step1);
  console.log(step2.trim());
}
console.log("Pipeline processing complete!");`,
    },
    part6: {
      title: "Concept Check: Backpressure",
      quiz: {
        question: "What is 'backpressure' in the context of Node.js streams?",
        options: [
          "A tool used to format JavaScript code before running it.",
          "A mechanism that pauses reading from a fast source when a slow destination's buffer is full, preventing memory overflow.",
          "An HTTP error code returned when a database is offline.",
          "A technique to compress images into SVG format.",
        ],
        correctIndex: 1,
        explanation: "Backpressure signals the readable source to pause pushing data when the writable destination cannot keep up, preventing RAM exhaustion.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "Flow Control", desc: "Backpressure prevents fast data sources from overwhelming slow consumers and exhausting memory." },
        { title: "Always Use pipeline()", desc: "Use stream/promises pipeline() for automatic error handling and stream teardown." },
        { title: "Transform Streams", desc: "Use Transform streams (like zlib.createGzip) to modify data on the fly during piping." },
      ],
      nextLessonPreview: {
        title: "NODE-13: The http Module & Server Basics",
        desc: "Build your first raw HTTP server using Node's core http module and inspect the incoming request/response cycle.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-13: The http Module & Server Basics
  // ─────────────────────────────────────────────────────────────
  "node13-http-module-server-basics": {
    slug: "node13-http-module-server-basics",
    code: "NODE-13",
    title: "The http Module: Creating a Server & The Request/Response Cycle",
    subtitle: "Build a raw HTTP web server from scratch without external frameworks using Node's native node:http module.",
    sections: [
      { id: "part1", label: "The Raw Web Server", icon: "🌐" },
      { id: "part2", label: "Request & Response", icon: "🔄" },
      { id: "part3", label: "Status Codes & Headers", icon: "📋" },
      { id: "part4", label: "Server Architecture", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Building an HTTP Server with Pure Node.js",
      bigPicture: "Every modern backend framework (Express, Fastify, NestJS) is built on top of Node's native `node:http` module. Before jumping to frameworks, understanding how Node receives an HTTP socket, parses headers, and sends back an HTTP response gives you a superpower: you understand what the backend is actually doing underneath.",
      breakdownTitle: "The core HTTP lifecycle:",
      breakdownItems: [
        { title: "http.createServer(callback)", desc: "Starts a TCP listener that parses incoming HTTP wire data into JavaScript objects." },
        { title: "req (http.IncomingMessage)", desc: "A Readable stream representing the client's HTTP request (method, url, headers, body)." },
        { title: "res (http.ServerResponse)", desc: "A Writable stream used to send HTTP status codes, headers, and the response body back to the client." },
      ],
    },
    part2: {
      title: "The Request and Response Objects",
      intro: "Understanding the two parameters passed to your server callback:",
      cards: [
        {
          number: "01",
          tag: "INCOMING",
          title: "req.method & req.url",
          description: "req.method reveals the HTTP verb ('GET', 'POST'). req.url reveals the requested path ('/api/users?page=1').",
          color: "purple",
        },
        {
          number: "02",
          tag: "HEADERS",
          title: "req.headers",
          description: "An object containing incoming client headers in lowercase (e.g. `req.headers['authorization']`, `content-type`).",
          color: "emerald",
        },
        {
          number: "03",
          tag: "STATUS",
          title: "res.writeHead(status, headers)",
          description: "Sends the HTTP response status code (200, 404, 500) and headers before sending the body.",
          color: "cyan",
        },
        {
          number: "04",
          tag: "TERMINATE",
          title: "res.end(data)",
          description: "Sends the final chunk of data and signals to the client that the HTTP response is complete.",
          color: "amber",
        },
      ],
      rule: {
        title: "Always End the Response",
        content: "If you forget to call `res.end()`, the client's browser will spin indefinitely and eventually time out.",
      },
    },
    part3: {
      title: "HTTP Status Codes & Response Headers",
      intro: "Standard status codes every backend developer must use correctly:",
      points: [
        {
          title: "2xx Success Codes",
          content: "`200 OK` (standard success), `201 Created` (resource created successfully), `204 No Content` (success with empty body).",
        },
        {
          title: "4xx Client Errors",
          content: "`400 Bad Request` (invalid input), `401 Unauthorized` (missing auth), `403 Forbidden` (not allowed), `404 Not Found`.",
        },
        {
          title: "5xx Server Errors",
          content: "`500 Internal Server Error` (unexpected server crash). Always catch internal errors and send a clean 500.",
          codeSnippet: `import http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from raw Node.js HTTP server!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: HTTP Response Handling",
      bad: {
        title: "Writing Headers After Sending Data",
        code: `// Mistake: Calling writeHead after res.write or res.end
import http from "node:http";

http.createServer((req, res) => {
  res.write("Hello World");
  // Throws: ERR_HTTP_HEADERS_SENT: Cannot set headers after they are sent to the client!
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end();
});`,
        explanation: "HTTP requires headers to be sent BEFORE the body. Once bytes are sent, headers cannot be changed.",
      },
      good: {
        title: "Setting Status & Headers First",
        code: `import http from "node:http";

http.createServer((req, res) => {
  // 1. Set status code and headers first
  res.writeHead(200, { "Content-Type": "application/json" });

  // 2. Send body and end response
  res.end(JSON.stringify({ status: "ok", message: "Server is healthy" }));
});`,
        explanation: "Setting headers and status before calling res.end() guarantees a well-formed HTTP response.",
      },
    },
    part5: {
      title: "Try It: Simulating an HTTP Request Handler",
      intro: "Experiment with how Node routes an incoming request and generates the response:",
      starterCode: `// Simulating the HTTP Request/Response Handler
function handleHttpRequest(req) {
  const { method, url } = req;
  
  if (method === 'GET' && url === '/') {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Welcome to the Home Page!'
    };
  }

  if (method === 'GET' && url === '/health') {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'healthy', uptime: '99.9%' })
    };
  }

  return {
    statusCode: 404,
    headers: { 'Content-Type': 'text/plain' },
    body: '404 Not Found'
  };
}

console.log("GET / ->", handleHttpRequest({ method: 'GET', url: '/' }));
console.log("GET /health ->", handleHttpRequest({ method: 'GET', url: '/health' }));
console.log("GET /unknown ->", handleHttpRequest({ method: 'GET', url: '/unknown' }));`,
    },
    part6: {
      title: "Concept Check: HTTP Lifecycle",
      quiz: {
        question: "What happens if an incoming HTTP request reaches your server callback, but your code never calls res.end()?",
        options: [
          "Node.js immediately restarts the server.",
          "The client browser continues waiting indefinitely until reaching its network timeout.",
          "Node.js automatically returns a 200 OK after 5 seconds.",
          "The operating system closes the port.",
        ],
        correctIndex: 1,
        explanation: "res is a Writable stream. If you do not call res.end(), the connection remains open until the client or server times out.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "Raw HTTP Module", desc: "Node's node:http module provides createServer to handle low-level HTTP network traffic." },
        { title: "req is Readable", desc: "req provides method, url, and incoming streaming body data." },
        { title: "res is Writable", desc: "res sends status codes, headers, and body chunks. Always call res.end()." },
      ],
      nextLessonPreview: {
        title: "NODE-14: HTTP Routing & Sending JSON",
        desc: "Learn how to build a manual router supporting GET/POST/DELETE routes and serialize JSON responses cleanly.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-14: HTTP Routing & Sending JSON
  // ─────────────────────────────────────────────────────────────
  "node14-http-routing-and-json": {
    slug: "node14-http-routing-and-json",
    code: "NODE-14",
    title: "Routing & Headers: Methods, URLs & Sending JSON Responses",
    subtitle: "Route GET/POST/DELETE requests manually, parse query parameters, set Content-Types, and serialize JSON responses.",
    sections: [
      { id: "part1", label: "Manual URL Routing", icon: "🧭" },
      { id: "part2", label: "Parsing URLs & Query Params", icon: "🔍" },
      { id: "part3", label: "Sending Clean JSON", icon: "📦" },
      { id: "part4", label: "Structured Router Design", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "How Routing Works Under the Hood",
      bigPicture: "Before Express and NestJS introduced `@Get()` decorators and `app.get()`, all web servers routed requests manually. A router is simply a decision engine that inspects two things on the incoming request: the HTTP Method (`GET`, `POST`, `DELETE`) and the URL Path (`/api/tasks`, `/api/users`). Understanding how to route manually demystifies how backend frameworks work.",
      breakdownTitle: "Key routing responsibilities:",
      breakdownItems: [
        { title: "Method & Path Matching", desc: "Directing `GET /api/tasks` to a task fetcher vs `POST /api/tasks` to a creation handler." },
        { title: "URL Parsing (new URL())", desc: "Separating the pathname (`/search`) from query parameters (`?q=nodejs&sort=asc`)." },
        { title: "Setting Content-Type", desc: "Informing the browser that the response is JSON via `Content-Type: application/json`." },
      ],
    },
    part2: {
      title: "Parsing Paths with the Standard URL API",
      intro: "Using the modern Web-standard URL class in Node.js:",
      cards: [
        {
          number: "01",
          tag: "PARSE",
          title: "new URL(req.url, base)",
          description: "Pass `http://${req.headers.host}` as the base to parse full pathnames and search parameters cleanly.",
          color: "purple",
        },
        {
          number: "02",
          tag: "QUERY PARAMS",
          title: "parsedUrl.searchParams",
          description: "Easily retrieve query variables: `parsedUrl.searchParams.get('limit')`.",
          color: "emerald",
        },
        {
          number: "03",
          tag: "PATHNAME",
          title: "parsedUrl.pathname",
          description: "Gives the clean path without query strings (`/api/items`), perfect for route matching.",
          color: "cyan",
        },
      ],
      rule: {
        title: "The 404 Fallback Rule",
        content: "Always include a catch-all fallback route at the end of your router that returns `404 Not Found` for unhandled URLs.",
      },
    },
    part3: {
      title: "Helper: Sending JSON Responses Consistently",
      intro: "Creating a reusable response helper function:",
      points: [
        {
          title: "Always Set Content-Type",
          content: "Always include `'Content-Type': 'application/json'` in the headers so client apps parse the payload as JSON automatically.",
        },
        {
          title: "Serialize with JSON.stringify()",
          content: "`res.end()` only accepts Strings or Buffers. You must serialize objects with `JSON.stringify(data)`.",
        },
        {
          title: "Reusable sendJson Helper",
          content: "Wrap the logic in a small helper function to keep your route handlers clean and readable.",
          codeSnippet: `function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'X-Powered-By': 'Node.js Core'
  });
  res.end(JSON.stringify(payload));
}`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Routing Structure",
      bad: {
        title: "Giant Unmaintainable if/else Chain",
        code: `// Mistake: Nesting 50 if/else checks in one giant server function
http.createServer((req, res) => {
  if (req.url === "/a" && req.method === "GET") {
    // ...
  } else if (req.url === "/b" && req.method === "POST") {
    // ...
  } else if (req.url === "/c") {
    // Hard to read, maintain, and test!
  }
});`,
        explanation: "Giant nested if/else blocks become unreadable and error-prone as the application adds more endpoints.",
      },
      good: {
        title: "Clean Lookup Router Table",
        code: `const routes = {
  "GET /api/tasks": (req, res) => sendJson(res, 200, [{ id: 1, title: "Learn Node" }]),
  "GET /api/health": (req, res) => sendJson(res, 200, { status: "ok" }),
};

http.createServer((req, res) => {
  const parsed = new URL(req.url, \`http://\${req.headers.host}\`);
  const key = \`\${req.method} \${parsed.pathname}\`;
  const handler = routes[key];

  if (handler) {
    handler(req, res);
  } else {
    sendJson(res, 404, { error: "Route not found" });
  }
});`,
        explanation: "A route mapping dictionary separates route configuration from server dispatching logic.",
      },
    },
    part5: {
      title: "Try It: Testing a Pure Node.js Router",
      intro: "Experiment with dispatching requests against a router table:",
      starterCode: `// Router implementation
const taskDatabase = [
  { id: 1, title: "Master Node Event Loop", completed: true },
  { id: 2, title: "Build Raw HTTP Server", completed: false }
];

function dispatch(method, path) {
  if (method === 'GET' && path === '/api/tasks') {
    return { status: 200, body: taskDatabase };
  }
  if (method === 'GET' && path === '/api/stats') {
    return { status: 200, body: { totalTasks: taskDatabase.length } };
  }
  return { status: 404, body: { error: 'Not Found', path } };
}

console.log("GET /api/tasks ->", dispatch('GET', '/api/tasks'));
console.log("GET /api/stats ->", dispatch('GET', '/api/stats'));
console.log("DELETE /api/tasks ->", dispatch('DELETE', '/api/tasks'));`,
    },
    part6: {
      title: "Concept Check: JSON Response Serialization",
      quiz: {
        question: "Why must you pass JSON.stringify(data) to res.end() instead of passing the raw JavaScript object directly?",
        options: [
          "Because JavaScript objects are automatically deleted when passed to functions.",
          "Because res.end() only accepts string or Buffer payloads over the network stream.",
          "Because JSON.stringify encrypts the data using SSL.",
          "Because Node.js only allows XML data by default.",
        ],
        correctIndex: 1,
        explanation: "res.end() writes bytes to the network socket; it only accepts a string or a binary Buffer, so objects must be serialized to JSON strings.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "Router Logic", desc: "Routing is matching the combination of HTTP Method (GET, POST) and URL pathname." },
        { title: "Standard URL Parser", desc: "Use new URL(req.url, base) to extract pathnames and searchParams cleanly." },
        { title: "Content-Type", desc: "Always set 'Content-Type': 'application/json' when returning JSON payloads." },
      ],
      nextLessonPreview: {
        title: "NODE-15: Parsing HTTP Request Bodies",
        desc: "Learn how to collect streaming chunks from POST/PUT requests (req.on('data')) and safely parse JSON payloads.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-15: Parsing HTTP Request Bodies
  // ─────────────────────────────────────────────────────────────
  "node15-parsing-http-request-bodies": {
    slug: "node15-parsing-http-request-bodies",
    code: "NODE-15",
    title: "Parsing Request Bodies: Streaming Payloads & Content-Types",
    subtitle: "Collect streaming request chunks (req.on('data')), concatenate byte buffers, and parse JSON payloads safely.",
    sections: [
      { id: "part1", label: "Request as a Stream", icon: "📥" },
      { id: "part2", label: "The Body Parsing Recipe", icon: "🍳" },
      { id: "part3", label: "Payload Size Limits (DoS)", icon: "🛡️" },
      { id: "part4", label: "Unsafe vs Safe Body Parsing", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Why is req.body Not Automatically Available?",
      bigPicture: "In Express, you might be used to calling `req.body` directly. But in pure Node.js, `req.body` is undefined! Why? Because the `req` object is a Readable Stream. When a user uploads a large 50MB JSON file or image in a POST request, the data arrives in multiple chunks over the network. Node gives you raw access to the stream so you can inspect headers and validate payload size before allocating memory.",
      breakdownTitle: "The step-by-step body collection flow:",
      breakdownItems: [
        { title: "1. Listen to req.on('data')", desc: "Collect incoming Buffer chunks into an array as they arrive from the network." },
        { title: "2. Listen to req.on('end')", desc: "Concatenate all chunks using Buffer.concat(chunks).toString('utf8')." },
        { title: "3. JSON.parse with try/catch", desc: "Safely parse the text into a JavaScript object and handle malformed JSON syntax." },
      ],
    },
    part2: {
      title: "The Universal Body Parser Helper",
      intro: "A reusable async function to parse incoming JSON request bodies:",
      cards: [
        {
          number: "01",
          tag: "BUFFER CHUNKS",
          title: "Collecting Chunks in an Array",
          description: "Store chunks as raw Buffers in an array: `const chunks = []; req.on('data', c => chunks.push(c));`.",
          color: "purple",
        },
        {
          number: "02",
          tag: "CONCATENATE",
          title: "Buffer.concat(chunks)",
          description: "Merges all chunks efficiently in memory into one unified Buffer when the 'end' event fires.",
          color: "emerald",
        },
        {
          number: "03",
          tag: "SAFE PARSE",
          title: "try/catch around JSON.parse",
          description: "If a client sends broken JSON (e.g. `{ name: `), catch the SyntaxError and return a 400 Bad Request.",
          color: "cyan",
        },
      ],
      rule: {
        title: "Protect Against DoS Body Attacks",
        content: "Always enforce a maximum payload size limit (e.g. 1MB). If incoming bytes exceed the limit, destroy the request and return 413 Payload Too Large.",
      },
    },
    part3: {
      title: "Parsing with Size Limits & Error Handling",
      intro: "How production Node servers protect against memory exhaustion attacks:",
      points: [
        {
          title: "Track Total Received Bytes",
          content: "In `req.on('data', chunk)`, add `receivedBytes += chunk.length`. If `receivedBytes > MAX_SIZE`, abort immediately!",
        },
        {
          title: "Handling Empty Bodies",
          content: "If `req.on('end')` fires with 0 chunks received, return an empty object `{}` or handle as appropriate.",
        },
        {
          title: "Clean Promise Wrapper",
          content: "Wrap the streaming events in a clean Promise so you can `const body = await parseJsonBody(req);`.",
          codeSnippet: `function parseJsonBody(req, maxBytes = 1e6) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];

    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > maxBytes) {
        req.destroy();
        reject(new Error('413: Payload Too Large'));
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      try {
        const text = Buffer.concat(chunks).toString('utf8');
        resolve(text ? JSON.parse(text) : {});
      } catch (err) {
        reject(new Error('400: Invalid JSON'));
      }
    });

    req.on('error', reject);
  });
}`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Request Body Handling",
      bad: {
        title: "Assuming req.body Exists or Concatenating Strings with +",
        code: `// Mistake 1: Expecting req.body on raw Node http
http.createServer((req, res) => {
  console.log(req.body); // undefined!

  // Mistake 2: String concatenation can corrupt multi-byte UTF-8 characters!
  let body = "";
  req.on("data", (chunk) => {
    body += chunk; // BAD: Can split an emoji or accented character across chunks!
  });
});`,
        explanation: "Concatenating chunks with += converts each chunk to string independently, which corrupts multi-byte UTF-8 characters split across chunk boundaries.",
      },
      good: {
        title: "Collecting Buffer Arrays and Using Buffer.concat",
        code: `http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/tasks") {
    try {
      const body = await parseJsonBody(req);
      console.log("Received new task:", body.title);
      sendJson(res, 201, { success: true, task: body });
    } catch (err) {
      sendJson(res, 400, { error: err.message });
    }
  }
});`,
        explanation: "Collecting raw Buffers and merging them with Buffer.concat guarantees 100% binary and UTF-8 safety.",
      },
    },
    part5: {
      title: "Try It: Simulating Streaming Body Collection",
      intro: "Experiment with parsing multi-chunk incoming payloads:",
      starterCode: `// Simulating streaming chunks of a POST request
const incomingChunks = [
  Buffer.from('{"title": "Complete Node.js', 'utf8'),
  Buffer.from(' Capstone", "priority": ', 'utf8'),
  Buffer.from('"high"}', 'utf8')
];

function simulateBodyParse(chunks) {
  const mergedBuffer = Buffer.concat(chunks);
  const jsonString = mergedBuffer.toString('utf8');
  return JSON.parse(jsonString);
}

const parsedPayload = simulateBodyParse(incomingChunks);
console.log("Successfully parsed payload:");
console.log("Task Title:", parsedPayload.title);
console.log("Task Priority:", parsedPayload.priority);`,
    },
    part6: {
      title: "Concept Check: Streaming Request Bodies",
      quiz: {
        question: "Why should you collect chunks in an array (chunks.push(chunk)) and use Buffer.concat() instead of doing body += chunk?",
        options: [
          "Buffer.concat() is required by the JavaScript language specification.",
          "String concatenation with += can split multi-byte UTF-8 characters (like emojis or foreign accents) across chunks and corrupt them.",
          "Arrays are faster than strings in all computer operations.",
          "+= deletes data from the network card.",
        ],
        correctIndex: 1,
        explanation: "Multi-byte characters split across network packet boundaries will be corrupted if converted to strings individually. Buffer.concat() preserves raw bytes until the entire payload is ready.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "req is a Stream", desc: "HTTP request bodies arrive in chunks over the network via req.on('data')." },
        { title: "Buffer.concat", desc: "Collect Buffer chunks in an array and merge with Buffer.concat() for UTF-8 safety." },
        { title: "Enforce Limits", desc: "Always guard against memory exhaustion attacks by enforcing maximum payload size limits." },
      ],
      nextLessonPreview: {
        title: "NODE-16: Process Object & Environment Variables",
        desc: "Learn how to manage configuration, validate process.env, and secure backend secrets.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-16: Process Object & Environment Variables
  // ─────────────────────────────────────────────────────────────
  "node16-process-env-and-configuration": {
    slug: "node16-process-env-and-configuration",
    code: "NODE-16",
    title: "Process Object, Environment Variables & Configuration",
    subtitle: "Load and validate environment variables with process.env, manage configuration files, and avoid hardcoding secrets.",
    sections: [
      { id: "part1", label: "Why Environment Variables?", icon: "🔐" },
      { id: "part2", label: "process.env in Action", icon: "⚙️" },
      { id: "part3", label: "Configuration Validation", icon: "🛡️" },
      { id: "part4", label: "Hardcoded Secrets vs .env", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Why Environment Variables are Mandatory",
      bigPicture: "Never hardcode database passwords, secret API keys, or port numbers inside your source code. If you commit hardcoded secrets to GitHub, your accounts can be compromised in minutes. Furthermore, your application must run differently in development (on your laptop) than in production (on a cloud server). Environment variables via `process.env` allow you to configure behavior from the host environment without changing code.",
      breakdownTitle: "The Twelve-Factor App config rule:",
      breakdownItems: [
        { title: "Code is Identical Everywhere", desc: "The exact same JavaScript files run on your local machine, staging, and production." },
        { title: "Config Injected by Host", desc: "Port numbers, logging levels, and credentials are provided by the operating system environment." },
        { title: "Native Node.js Support (--env-file)", desc: "Modern Node.js (v20+) natively loads `.env` files using `node --env-file=.env app.js` without third-party packages!" },
      ],
    },
    part2: {
      title: "Reading and Parsing process.env",
      intro: "All environment variables are exposed as string keys on the global `process.env` object:",
      cards: [
        {
          number: "01",
          tag: "ALWAYS STRINGS",
          title: "process.env Values are Strings",
          description: "`process.env.PORT` is `'3000'` (a string), not a number. Always convert numbers with `Number(process.env.PORT)` or `parseInt()`.",
          color: "amber",
        },
        {
          number: "02",
          tag: "DEFAULTS",
          title: "Providing Sensible Defaults",
          description: "Use fallback operators: `const port = process.env.PORT || 3000;`.",
          color: "purple",
        },
        {
          number: "03",
          tag: "VALIDATION",
          title: "Fail-Fast Validation",
          description: "Validate that all required secrets exist on startup. If a critical key is missing, crash immediately before serving traffic.",
          color: "emerald",
        },
      ],
      rule: {
        title: "The .gitignore Secret Rule",
        content: "Always add `.env` and `.env.local` to `.gitignore`. Only commit `.env.example` showing variable names without real values.",
      },
    },
    part3: {
      title: "The Centralized Config Module Pattern",
      intro: "How to organize configuration across a professional Node.js app:",
      points: [
        {
          title: "Never scattered process.env calls",
          content: "Do NOT sprinkle `process.env.DB_PASSWORD` across 30 different files. Create a single `config.js` module that reads, validates, and exports a frozen config object.",
        },
        {
          title: "Fail Fast on Startup",
          content: "If `JWT_SECRET` is missing, throw an error immediately on line 1 so the server refuses to start with an invalid configuration.",
        },
        {
          title: "Type Coercion",
          content: "Convert strings to numbers (`port: Number(process.env.PORT) || 8080`) and booleans (`isProd: process.env.NODE_ENV === 'production'`).",
          codeSnippet: `// src/config.js
function loadConfig() {
  const required = ['APP_SECRET'];
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(\`FATAL: Missing required environment variable: \${key}\`);
    }
  }

  return Object.freeze({
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    appSecret: process.env.APP_SECRET,
    isProduction: process.env.NODE_ENV === 'production'
  });
}

export const config = loadConfig();`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Configuration Handling",
      bad: {
        title: "Hardcoded Secrets and Insecure Defaults",
        code: `// Mistake: Hardcoding secrets inside source files
const dbConfig = {
  host: "localhost",
  port: 5432,
  password: "super_secret_production_password_123" // COMMITTED TO GIT!
};`,
        explanation: "Hardcoding credentials in source code exposes private keys to git history and makes environment switching impossible.",
      },
      good: {
        title: "Validated Environment Configuration",
        code: `// config.js
export const config = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  password: process.env.DB_PASSWORD || (() => {
    throw new Error("DB_PASSWORD is required in production!");
  })()
};`,
        explanation: "Reading from environment variables keeps credentials secure and allows flexible deployments.",
      },
    },
    part5: {
      title: "Try It: Building a Config Validator",
      intro: "Experiment with validating environment variables and applying type coercion:",
      starterCode: `// Simulating process.env validation
const mockEnv = {
  PORT: '4000',
  NODE_ENV: 'production',
  API_KEY: 'sk_live_987654321'
};

function createSafeConfig(env) {
  if (!env.API_KEY) {
    throw new Error("Missing required variable: API_KEY");
  }

  return Object.freeze({
    port: Number(env.PORT) || 3000,
    isProd: env.NODE_ENV === 'production',
    apiKey: env.API_KEY
  });
}

const appConfig = createSafeConfig(mockEnv);
console.log("Validated App Config:");
console.log("Port (number):", appConfig.port, typeof appConfig.port);
console.log("Is Production:", appConfig.isProd);
console.log("API Key loaded successfully!");`,
    },
    part6: {
      title: "Concept Check: process.env Data Types",
      quiz: {
        question: "What is the data type of every value inside process.env in Node.js?",
        options: [
          "It automatically matches the original type (numbers are numbers, booleans are booleans).",
          "Every value in process.env is always a String (or undefined).",
          "Values are stored as binary Buffers.",
          "Values are stored as BigInt numbers.",
        ],
        correctIndex: 1,
        explanation: "All environment variables provided by the operating system are strings. `process.env.PORT === '3000'`, not the number 3000.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "No Secrets in Git", desc: "Never commit passwords, API keys, or tokens to git repositories." },
        { title: "Always Strings", desc: "Convert numeric and boolean env strings explicitly using Number() or Boolean checks." },
        { title: "Centralized config.js", desc: "Validate and export configuration from a single centralized module." },
      ],
      nextLessonPreview: {
        title: "NODE-17: Error Handling & Exit Codes",
        desc: "Master error handling in Node.js: sync vs async errors, uncaughtException, and graceful exit codes.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-17: Error Handling & Exit Codes
  // ─────────────────────────────────────────────────────────────
  "node17-error-handling-and-exit-codes": {
    slug: "node17-error-handling-and-exit-codes",
    code: "NODE-17",
    title: "Error Handling: try/catch, unhandledRejection & Exit Codes",
    subtitle: "Catch sync and async errors, handle unhandledRejection/uncaughtException, and exit cleanly with process.exit().",
    sections: [
      { id: "part1", label: "The Error Philosophy", icon: "💥" },
      { id: "part2", label: "Process-Level Error Traps", icon: "🛡️" },
      { id: "part3", label: "Exit Codes Demystified", icon: "🚪" },
      { id: "part4", label: "Silent Failures vs Explicit Errors", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Error Handling in Node.js: Expect the Unexpected",
      bigPicture: "In a single-threaded server environment, an unhandled exception in one user's request can crash the entire Node.js process, taking down the website for thousands of other active users. Robust error handling is not just a nice-to-have; it is what separates toy scripts from resilient production services.",
      breakdownTitle: "The three levels of error handling in Node:",
      breakdownItems: [
        { title: "Local try/catch", desc: "Handled locally around async operations (file reads, JSON parsing, database queries)." },
        { title: "Route/Controller Error Boundaries", desc: "Catching errors in HTTP handlers to return clean `500 Internal Server Error` responses." },
        { title: "Global Safety Traps", desc: "Listening for `unhandledRejection` and `uncaughtException` on the global `process` object." },
      ],
    },
    part2: {
      title: "The Global Process Error Traps",
      intro: "Last-resort safety nets on the global `process` object:",
      cards: [
        {
          number: "01",
          tag: "PROMISES",
          title: "process.on('unhandledRejection')",
          description: "Fires whenever a Promise rejects and there is no `.catch()` or `try/catch` attached to it.",
          color: "amber",
        },
        {
          number: "02",
          tag: "SYNCHRONOUS",
          title: "process.on('uncaughtException')",
          description: "Fires when an unexpected synchronous error was never caught. The process is now in an undefined state and must exit.",
          color: "rose",
        },
        {
          number: "03",
          tag: "CUSTOM ERRORS",
          title: "Custom AppError Hierarchy",
          description: "Create subclasses of Error (e.g. `NotFoundError`, `ValidationError`) with statusCode metadata.",
          color: "purple",
        },
      ],
      rule: {
        title: "Always Exit After uncaughtException",
        content: "When an `uncaughtException` occurs, memory may be corrupted. Log the error and immediately call `process.exit(1)`. Let process managers (like PM2 or Docker) restart the clean container.",
      },
    },
    part3: {
      title: "Exit Codes: Communicating with the OS",
      intro: "How `process.exit(code)` signals status to Docker, Kubernetes, and the OS:",
      points: [
        {
          title: "Exit Code 0: Clean Success",
          content: "`process.exit(0)` means the program completed its task successfully without any issues.",
        },
        {
          title: "Exit Code 1: Uncaught Fatal Exception",
          content: "`process.exit(1)` signals to system monitors that the program crashed due to an unhandled error.",
        },
        {
          title: "Automated Restart Hooks",
          content: "Tools like Docker and PM2 inspect the exit code. If code is non-zero, they automatically restart the service and trigger alerts.",
          codeSnippet: `// Global safety net in index.js
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('CRITICAL: Uncaught Exception:', err);
  process.exit(1); // Exit to allow clean restart
});`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Error Handling",
      bad: {
        title: "Swallowing Errors Silently (Silent Failure)",
        code: `// Mistake: Empty catch block hides critical bugs
async function loadUserData(userId) {
  try {
    const data = await database.findUser(userId);
    return data;
  } catch (err) {
    // SILENT CATCH! No logging, no re-throw.
    // If the database connection is dead, we will never know!
    return null;
  }
}`,
        explanation: "Empty catch blocks swallow errors silently, making bugs nearly impossible to diagnose in production.",
      },
      good: {
        title: "Structured Custom Error Hierarchy",
        code: `class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

class NotFoundError extends AppError {
  constructor(entity = "Resource") {
    super(\`\${entity} not found\`, 404);
  }
}

// In route handler:
if (!task) {
  throw new NotFoundError("Task #42");
}`,
        explanation: "Structured custom errors carry HTTP status codes and clear contextual diagnostics.",
      },
    },
    part5: {
      title: "Try It: Handling Custom Error Classes",
      intro: "Experiment with throwing and categorizing custom errors:",
      starterCode: `// Custom Error Hierarchy
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

class ValidationError extends AppError {
  constructor(msg) {
    super(msg, 400);
    this.name = 'ValidationError';
  }
}

function processUserRegistration(user) {
  if (!user.email || !user.email.includes('@')) {
    throw new ValidationError("Invalid email address provided");
  }
  return { success: true, user };
}

try {
  processUserRegistration({ name: 'Alice', email: 'invalid-email' });
} catch (err) {
  if (err instanceof AppError) {
    console.log(\`Caught App Error (\${err.statusCode}): \${err.message}\`);
  } else {
    console.error("Unknown Server Error:", err);
  }
}`,
    },
    part6: {
      title: "Concept Check: Exit Codes",
      quiz: {
        question: "What does process.exit(0) indicate to the operating system or Docker container?",
        options: [
          "The program ran out of memory.",
          "The program terminated cleanly and successfully.",
          "The program is frozen in an infinite loop.",
          "The program requires immediate reboot.",
        ],
        correctIndex: 1,
        explanation: "In Unix and Windows, an exit code of 0 universally indicates that the process terminated successfully without errors.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "No Silent Swallowing", desc: "Never write empty catch blocks; always log or handle the error explicitly." },
        { title: "Global Safety Nets", desc: "Register unhandledRejection and uncaughtException listeners on process." },
        { title: "Exit Codes", desc: "Exit with 0 for success and 1 for fatal errors so container orchestrators can respond." },
      ],
      nextLessonPreview: {
        title: "NODE-18: Graceful Shutdown & Signals",
        desc: "Learn how to intercept SIGTERM/SIGINT signals to close database connections and finish active HTTP requests before exiting.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-18: Graceful Shutdown & Signals
  // ─────────────────────────────────────────────────────────────
  "node18-graceful-shutdown-signals": {
    slug: "node18-graceful-shutdown-signals",
    code: "NODE-18",
    title: "Graceful Shutdown: Handling SIGTERM, SIGINT & Connection Teardown",
    subtitle: "Intercept termination signals (SIGTERM/SIGINT), finish in-flight HTTP requests, close database connections, and exit cleanly.",
    sections: [
      { id: "part1", label: "What is Graceful Shutdown?", icon: "🛑" },
      { id: "part2", label: "Operating System Signals", icon: "📡" },
      { id: "part3", label: "The Teardown Sequence", icon: "🔄" },
      { id: "part4", label: "Abrupt Crash vs Graceful Teardown", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "What is Graceful Shutdown?",
      bigPicture: "When deploying a new version of your backend on Kubernetes, AWS, or Docker, the hosting platform tells your old server: 'Time to shut down! I am starting a new container.' If you abruptly terminate the process, active users who are in the middle of paying for an order or uploading a file will have their connection abruptly severed with a 502 error. Graceful shutdown means: stop accepting new requests, finish all current in-flight requests, close database connections, and exit cleanly.",
      breakdownTitle: "The benefits of graceful shutdown:",
      breakdownItems: [
        { title: "Zero Dropped User Requests", desc: "Existing users complete their transactions smoothly without broken connections." },
        { title: "No Data Corruption", desc: "Database pools and open file handles are flushed and closed cleanly." },
        { title: "Seamless Zero-Downtime Deploys", desc: "Load balancers shift traffic smoothly to the new version." },
      ],
    },
    part2: {
      title: "POSIX Operating System Signals",
      intro: "The standard signals Node.js can intercept from the operating system:",
      cards: [
        {
          number: "01",
          tag: "TERMINAL",
          title: "SIGINT (Signal Interrupt)",
          description: "Sent when you press Ctrl+C in your terminal. Asks the application to shut down gracefully.",
          color: "amber",
        },
        {
          number: "02",
          tag: "PRODUCTION",
          title: "SIGTERM (Signal Terminate)",
          description: "The standard shutdown signal sent by Docker, Kubernetes, and systemd during scaling or deployments.",
          color: "purple",
        },
        {
          number: "03",
          tag: "FORCE KILL",
          title: "SIGKILL (Signal Kill)",
          description: "Forces immediate ungraceful termination by the OS kernel. Cannot be intercepted or handled in code.",
          color: "rose",
        },
      ],
      rule: {
        title: "The Timeout Failsafe",
        content: "Always add a 10-second timeout failsafe in your shutdown handler. If in-flight requests take too long to close, force exit with `process.exit(1)` to avoid hanging forever.",
      },
    },
    part3: {
      title: "The Step-by-Step Shutdown Recipe",
      intro: "The exact sequence to perform when receiving a shutdown signal:",
      points: [
        {
          title: "1. Stop Accepting New Connections",
          content: "Call `server.close()`. This stops the HTTP server from accepting new connections while letting current requests finish.",
        },
        {
          title: "2. Clean Up Background Resources",
          content: "Close database pools, clear ongoing intervals (`clearInterval`), and flush logging buffers.",
        },
        {
          title: "3. Exit with Code 0",
          content: "Once all cleanup is complete, call `process.exit(0)`.",
          codeSnippet: `import http from 'node:http';

const server = http.createServer((req, res) => {
  res.end('Request processed');
});

server.listen(3000);

function handleShutdown(signal) {
  console.log(\`Received \${signal}. Starting graceful shutdown...\`);
  
  // Failsafe: Force exit if cleanup takes over 10s
  setTimeout(() => {
    console.error('Forced shutdown due to timeout!');
    process.exit(1);
  }, 10000).unref();

  server.close(() => {
    console.log('HTTP server closed. All active requests completed.');
    // Close database pools, etc.
    process.exit(0);
  });
}

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Process Termination",
      bad: {
        title: "Ignoring Signals or Abrupt process.exit()",
        code: `// Mistake: Forcing immediate exit on SIGINT
process.on("SIGINT", () => {
  // Drops all current users mid-request!
  process.exit(0);
});`,
        explanation: "Instantly killing the process severs active client connections and can leave database transactions in a dangling state.",
      },
      good: {
        title: "Calling server.close() and Flushing Pools",
        code: `function gracefulShutdown() {
  server.close(() => {
    console.log("Closed HTTP server.");
    database.disconnect().then(() => {
      console.log("Database disconnected.");
      process.exit(0);
    });
  });
}`,
        explanation: "Allowing server.close() to finish active requests guarantees zero dropped user connections during deployments.",
      },
    },
    part5: {
      title: "Try It: Simulating a Graceful Teardown Flow",
      intro: "Observe how active tasks finish before the process terminates:",
      starterCode: `// Simulating active in-flight requests and teardown
let activeRequestsCount = 2;

function simulateServerClose(callback) {
  console.log("🔒 Server stopped accepting new traffic.");
  const interval = setInterval(() => {
    if (activeRequestsCount > 0) {
      console.log(\`⏳ In-flight requests remaining: \${activeRequestsCount}\`);
      activeRequestsCount--;
    } else {
      clearInterval(interval);
      callback();
    }
  }, 100);
}

console.log("🚨 Received SIGTERM signal!");
simulateServerClose(() => {
  console.log("✅ All in-flight requests finished. Resources closed.");
  console.log("👋 Process exiting with code 0.");
});`,
    },
    part6: {
      title: "Concept Check: Graceful Shutdown",
      quiz: {
        question: "What does calling server.close() do on a Node.js HTTP server?",
        options: [
          "It immediately kills all current client connections and deletes the source code.",
          "It stops accepting new incoming connections while allowing existing in-flight requests to finish.",
          "It restarts the computer operating system.",
          "It changes the server port number to 80.",
        ],
        correctIndex: 1,
        explanation: "server.close() instructs the HTTP server to refuse new incoming connections while giving existing active requests time to finish.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "SIGTERM & SIGINT", desc: "Listen for SIGTERM (containers/deployments) and SIGINT (Ctrl+C in terminal)." },
        { title: "server.close()", desc: "Stops new traffic while allowing ongoing requests to finish cleanly." },
        { title: "Failsafe Timer", desc: "Always set an unref'd timeout to force exit if cleanup hangs." },
      ],
      nextLessonPreview: {
        title: "NODE-19: Application Architecture & Clean Design",
        desc: "Learn how to structure professional Node.js backends with clear layers (controllers, services, repositories) without heavy frameworks.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-19: Application Architecture & Clean Design
  // ─────────────────────────────────────────────────────────────
  "node19-application-architecture-clean-design": {
    slug: "node19-application-architecture-clean-design",
    code: "NODE-19",
    title: "Node.js Application Architecture: Modular Organization Without Frameworks",
    subtitle: "Organize clean, maintainable project structures: controllers, services, repositories, and utilities with pure Node.js.",
    sections: [
      { id: "part1", label: "The Monolithic File Problem", icon: "🏛️" },
      { id: "part2", label: "The Layered Architecture", icon: "🍰" },
      { id: "part3", label: "Project Folder Structure", icon: "📁" },
      { id: "part4", label: "Messy Code vs Layered Code", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "The Danger of the Single-File Server",
      bigPicture: "When starting with Node.js, it is tempting to put everything into a single 2,000-line `server.js` file: HTTP routing, JSON validation, database calls, email sending, and file manipulation. As the app grows, changing a database query breaks your routing, and testing individual functions becomes impossible. Professional Node.js applications separate responsibilities into distinct, focused architectural layers.",
      breakdownTitle: "The principles of modular design:",
      breakdownItems: [
        { title: "Single Responsibility", desc: "Every module should have one reason to change (e.g. storage logic lives separate from HTTP logic)." },
        { title: "Framework Independence", desc: "Your core business rules should not depend on HTTP or routing libraries." },
        { title: "Testability", desc: "Isolated services and repositories can be unit tested without starting a live HTTP server." },
      ],
    },
    part2: {
      title: "The 4 Standard Backend Layers",
      intro: "How code is organized from incoming network request down to data storage:",
      cards: [
        {
          number: "01",
          tag: "HTTP / ROUTER",
          title: "Controllers / Routes",
          description: "Inspects incoming HTTP req, extracts parameters, calls the service layer, and sends JSON response.",
          color: "purple",
        },
        {
          number: "02",
          tag: "BUSINESS LOGIC",
          title: "Services",
          description: "Pure business rules (e.g. calculating discounts, checking user permissions). Completely agnostic of HTTP.",
          color: "emerald",
        },
        {
          number: "03",
          tag: "DATA ACCESS",
          title: "Repositories / Models",
          description: "Handles reading and writing to disk files, database tables, or memory maps.",
          color: "cyan",
        },
        {
          number: "04",
          tag: "CROSS-CUTTING",
          title: "Config & Utils",
          description: "Shared helpers: date formatters, environment config, custom error classes, and logger instances.",
          color: "amber",
        },
      ],
      rule: {
        title: "The Dependency Flow Rule",
        content: "Controllers depend on Services. Services depend on Repositories. Repositories depend on Storage. Dependencies only flow downward.",
      },
    },
    part3: {
      title: "Recommended Node.js Project Structure",
      intro: "A clean, battle-tested folder organization for pure Node.js projects:",
      points: [
        {
          title: "src/config/",
          content: "Environment validation and constants (`config.js`).",
        },
        {
          title: "src/controllers/ & src/routes/",
          content: "HTTP request handlers and URL router tables.",
        },
        {
          title: "src/services/ & src/repositories/",
          content: "Business domain logic and file/database persistence.",
        },
        {
          title: "src/utils/",
          content: "Helper functions, custom errors, and response formatting utilities.",
          codeSnippet: `my-node-app/
├── package.json
├── src/
│   ├── config/
│   │   └── config.js
│   ├── controllers/
│   │   └── task.controller.js
│   ├── services/
│   │   └── task.service.js
│   ├── repositories/
│   │   └── task.repository.js
│   ├── utils/
│   │   └── response.js
│   └── server.js
└── tests/`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Code Separation",
      bad: {
        title: "Mixed Concerns in One Route Handler",
        code: `// Mistake: HTTP handler does file I/O, validation, and business logic
http.createServer(async (req, res) => {
  if (req.url === "/tasks" && req.method === "POST") {
    const raw = await readBody(req);
    const body = JSON.parse(raw);
    
    // Direct file I/O inside HTTP handler!
    const data = await fs.readFile("tasks.json", "utf8");
    const tasks = JSON.parse(data);
    tasks.push(body);
    await fs.writeFile("tasks.json", JSON.stringify(tasks));
    
    res.end("Saved");
  }
});`,
        explanation: "Mixing HTTP parsing, business rules, and file system I/O in one handler makes the code brittle and untestable.",
      },
      good: {
        title: "Layered Architecture",
        code: `// task.repository.js
export class TaskRepository {
  async getAll() { return readTasksFromFile(); }
  async create(task) { return saveTaskToFile(task); }
}

// task.service.js
export class TaskService {
  constructor(repo) { this.repo = repo; }
  async addTask(title) {
    if (!title) throw new Error("Title required");
    return this.repo.create({ id: Date.now(), title });
  }
}

// task.controller.js
export class TaskController {
  constructor(service) { this.service = service; }
  async handleCreate(req, res) {
    const body = await parseJsonBody(req);
    const task = await this.service.addTask(body.title);
    sendJson(res, 201, task);
  }
}`,
        explanation: "Each class has a single responsibility. You can test TaskService in complete isolation without starting an HTTP server.",
      },
    },
    part5: {
      title: "Try It: Simulating a 3-Tier Layered Architecture",
      intro: "Observe how data flows cleanly through Repository -> Service -> Controller:",
      starterCode: `// 1. Data Repository Layer
class TaskRepository {
  constructor() { this.store = []; }
  save(task) { this.store.push(task); return task; }
  findAll() { return [...this.store]; }
}

// 2. Business Service Layer
class TaskService {
  constructor(repo) { this.repo = repo; }
  createTask(title) {
    if (!title || title.trim().length === 0) {
      throw new Error("Task title cannot be empty");
    }
    return this.repo.save({ id: Date.now(), title: title.trim(), done: false });
  }
  listTasks() { return this.repo.findAll(); }
}

// 3. Controller Layer
const repo = new TaskRepository();
const service = new TaskService(repo);

// Simulate Controller handling requests:
const task1 = service.createTask("Master Node.js Architecture");
console.log("Created Task:", task1);
console.log("All Tasks in DB:", service.listTasks());`,
    },
    part6: {
      title: "Concept Check: Layered Architecture",
      quiz: {
        question: "Why should business logic live in a Service layer instead of directly inside the HTTP Controller?",
        options: [
          "Because Node.js does not allow if statements inside controllers.",
          "So the business rules can be reused and tested independently without relying on HTTP request/response objects.",
          "Because Service layers run on separate GPU hardware.",
          "To force JavaScript into synchronous mode.",
        ],
        correctIndex: 1,
        explanation: "Keeping business logic in service classes allows them to be reused (e.g. by CLI commands or queues) and unit tested without mocking HTTP req/res objects.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "Separation of Concerns", desc: "Controllers handle HTTP; Services handle business rules; Repositories handle data storage." },
        { title: "Single Responsibility", desc: "Every module has one focused purpose, making code easy to read and maintain." },
        { title: "Testability", desc: "Layered architecture allows you to test business logic in milliseconds without a running server." },
      ],
      nextLessonPreview: {
        title: "NODE-20: Debugging Node.js with Inspector",
        desc: "Learn how to use node --inspect, connect Chrome DevTools, set breakpoints, and diagnose memory leaks.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-20: Debugging Node.js
  // ─────────────────────────────────────────────────────────────
  "node20-debugging-node-inspector": {
    slug: "node20-debugging-node-inspector",
    code: "NODE-20",
    title: "Debugging Node.js: Stack Traces, Inspector & Profiling",
    subtitle: "Diagnose bugs with node --inspect, connect Chrome DevTools, set breakpoints, and read complex asynchronous stack traces.",
    sections: [
      { id: "part1", label: "The Art of Debugging", icon: "🔍" },
      { id: "part2", label: "Node Inspector & DevTools", icon: "🛠️" },
      { id: "part3", label: "Reading Stack Traces", icon: "📜" },
      { id: "part4", label: "console.log vs Breakpoints", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Beyond console.log: Professional Node Debugging",
      bigPicture: "While `console.log()` is great for quick checks, debugging complex asynchronous timing bugs, memory leaks, or recursive loops by adding dozens of log statements is slow and painful. Node.js comes with a built-in debugging server using the Chrome DevTools Protocol, allowing you to pause execution, inspect live variables, and step through code line by line.",
      breakdownTitle: "Key debugging tools built into Node.js:",
      breakdownItems: [
        { title: "node --inspect", desc: "Launches the debugger server on port 9229, allowing Chrome or VS Code to attach to the live process." },
        { title: "node --inspect-brk", desc: "Pauses on the very first line of execution so you can debug startup code." },
        { title: "Async Stack Traces", desc: "V8 preserves asynchronous call history so you can trace errors across Promises and timers." },
      ],
    },
    part2: {
      title: "Connecting Chrome DevTools to Node.js",
      intro: "How to inspect your server inside Chrome:",
      cards: [
        {
          number: "01",
          tag: "LAUNCH",
          title: "Run node --inspect app.js",
          description: "Node prints: `Debugger listening on ws://127.0.0.1:9229/...`.",
          color: "purple",
        },
        {
          number: "02",
          tag: "CONNECT",
          title: "Open chrome://inspect",
          description: "Open Google Chrome, navigate to `chrome://inspect`, and click 'Inspect' on your running Node target.",
          color: "emerald",
        },
        {
          number: "03",
          tag: "INSPECT",
          title: "Full DevTools Power",
          description: "Use the Sources tab for breakpoints, the Memory tab for Heap Snapshots, and the Profiler for CPU bottlenecks.",
          color: "cyan",
        },
      ],
      rule: {
        title: "The Debugger Statement",
        content: "Adding the `debugger;` keyword anywhere in your code will automatically pause execution when running with `--inspect`.",
      },
    },
    part3: {
      title: "Reading Stack Traces Like a Senior Engineer",
      intro: "How to interpret error stack traces quickly:",
      points: [
        {
          title: "1. Read from Top to Bottom",
          content: "The top line tells you the exact error type (`TypeError: Cannot read properties of undefined`).",
        },
        {
          title: "2. Find Your File (Skip node:internal)",
          content: "Ignore lines starting with `node:internal/...`. Find the highest line in the trace pointing to your actual source code (e.g. `src/services/task.service.js:42:15`).",
        },
        {
          title: "3. Line and Column Numbers",
          content: "`app.js:42:15` means line 42, character column 15.",
          codeSnippet: `TypeError: Cannot read properties of undefined (reading 'title')
    at TaskService.create (f:/app/src/services/task.service.js:42:15) <-- YOUR BUG IS HERE!
    at processTicksAndRejections (node:internal/process/task_queues:95:5)`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Debugging Workflow",
      bad: {
        title: "Polluting Source Code with 50 console.log Statements",
        code: `// Mistake: Adding logs everywhere and forgetting to remove them
function processOrder(order) {
  console.log("HERE 1");
  const tax = calculateTax(order);
  console.log("HERE 2", tax);
  const total = order.subtotal + tax;
  console.log("HERE 3", total);
  // Logs accidentally committed to production!
  return total;
}`,
        explanation: "Adding and deleting log statements is slow, clutters git diffs, and can leak sensitive data into production logs.",
      },
      good: {
        title: "Using node --inspect with Breakpoints",
        code: `// Clean source code without log pollution:
function processOrder(order) {
  debugger; // Automatically pauses execution in DevTools
  const tax = calculateTax(order);
  const total = order.subtotal + tax;
  return total;
}`,
        explanation: "Breakpoints allow you to hover over variables, inspect the full call stack, and execute code in the live console without modifying files.",
      },
    },
    part5: {
      title: "Try It: Simulating Error Diagnostics",
      intro: "Experiment with parsing stack trace metadata from an error:",
      starterCode: `// Simulating stack trace inspection
function levelThree() {
  const err = new Error("Simulated database timeout failure");
  return err.stack;
}

function levelTwo() { return levelThree(); }
function levelOne() { return levelTwo(); }

const rawStack = levelOne();
console.log("=== Generated Stack Trace ===");
console.log(rawStack);

const lines = rawStack.split('\\n');
console.log("\\nPrimary Error Message:", lines[0]);
console.log("Top Execution Origin:", lines[1].trim());`,
    },
    part6: {
      title: "Concept Check: Node Inspector",
      quiz: {
        question: "What flag do you pass to the node CLI to start your script with the Chrome DevTools debugger listening?",
        options: [
          "node --debug-mode",
          "node --inspect",
          "node --chrome",
          "node --verbose-stack",
        ],
        correctIndex: 1,
        explanation: "`node --inspect` starts the Node.js debugger server on port 9229, allowing Chrome DevTools or VS Code to attach.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "node --inspect", desc: "Use node --inspect and chrome://inspect to debug with real breakpoints and variable inspection." },
        { title: "Skip Internal Frames", desc: "When reading stack traces, skip node:internal frames and jump straight to your application code." },
        { title: "debugger Keyword", desc: "Place debugger; in your code to automatically pause execution during debugging." },
      ],
      nextLessonPreview: {
        title: "NODE-21: Testing with Built-in Test Runner",
        desc: "Write unit and integration tests using Node's native node:test and node:assert modules without third-party frameworks.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-21: Testing with Built-in Test Runner
  // ─────────────────────────────────────────────────────────────
  "node21-testing-with-node-test-runner": {
    slug: "node21-testing-with-node-test-runner",
    code: "NODE-21",
    title: "Testing with Node.js Built-in Test Runner & Assertions (node:test)",
    subtitle: "Write unit and integration tests with node:test and node:assert without third-party test libraries.",
    sections: [
      { id: "part1", label: "Zero-Dependency Testing", icon: "🧪" },
      { id: "part2", label: "The node:test API", icon: "🛠️" },
      { id: "part3", label: "node:assert & Async Tests", icon: "✅" },
      { id: "part4", label: "Manual Testing vs Automated Suites", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Why Built-in Testing (node:test) is a Game Changer",
      bigPicture: "For years, writing tests in Node.js required installing heavy external dependencies like Jest, Mocha, or Chai. In modern Node.js (v18+), Node ships with a fast, native test runner built right into core: `node:test` and `node:assert`. You can write full unit and integration test suites with zero npm dependencies and run them simply with `node --test`.",
      breakdownTitle: "Features of the native test runner:",
      breakdownItems: [
        { title: "Zero Dependencies", desc: "Runs instantly without downloading 50MB of testing packages." },
        { title: "Native ESM & async/await Support", desc: "Seamlessly tests asynchronous Promises, callbacks, and ES Modules." },
        { title: "Standard Output Formats", desc: "Supports TAP (Test Anything Protocol), spec reporting, and code coverage with `--experimental-test-coverage`." },
      ],
    },
    part2: {
      title: "The node:test and node:assert API",
      intro: "The core functions you need to build automated test suites:",
      cards: [
        {
          number: "01",
          tag: "SUITES",
          title: "test() & describe() / it()",
          description: "Define test blocks and nested groups: `import { test, describe, it } from 'node:test';`.",
          color: "purple",
        },
        {
          number: "02",
          tag: "EQUALITY",
          title: "assert.strictEqual(actual, expected)",
          description: "Asserts that primitives are strictly equal (using `===`).",
          color: "emerald",
        },
        {
          number: "03",
          tag: "OBJECTS",
          title: "assert.deepStrictEqual(obj1, obj2)",
          description: "Deeply compares nested objects and arrays for equality.",
          color: "cyan",
        },
        {
          number: "04",
          tag: "ERRORS",
          title: "assert.rejects(asyncFn, errorType)",
          description: "Verifies that an async function rejects with the expected error.",
          color: "amber",
        },
      ],
      rule: {
        title: "Always Use Strict Assertions",
        content: "Always import `assert from 'node:assert/strict'` to ensure strict type equality checks (`===`) across all tests.",
      },
    },
    part3: {
      title: "Writing Asynchronous Tests with node:test",
      intro: "How to test async functions, Promises, and error rejections:",
      points: [
        {
          title: "Testing Async Functions",
          content: "Simply pass an `async` function to `test()`. The test runner waits for the returned Promise to resolve.",
        },
        {
          title: "Lifecycle Hooks",
          content: "`before()`, `after()`, `beforeEach()`, and `afterEach()` allow you to set up database fixtures and clean up temporary files.",
        },
        {
          title: "Running Tests via CLI",
          content: "Add `\"test\": \"node --test\"` to `package.json` scripts and run `npm test`.",
          codeSnippet: `import { test, describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('Math Utilities', () => {
  it('correctly sums positive numbers', () => {
    assert.strictEqual(5 + 5, 10);
  });

  it('handles object comparison', () => {
    assert.deepStrictEqual({ a: 1 }, { a: 1 });
  });
});`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Test Assertions",
      bad: {
        title: "Using Loose Equality and Manual if Checks",
        code: `// Mistake: Manual test assertions without runner
function testCalculator() {
  const result = add(2, 2);
  // Manual check: does not give line numbers, diffs, or reporting
  if (result != 4) {
    console.error("Test failed!");
  }
}`,
        explanation: "Manual if checks provide no structured reporting, no failure diffs, and stop running after the first error.",
      },
      good: {
        title: "Structured node:test Suite with Deep Assertions",
        code: `import { test } from "node:test";
import assert from "node:assert/strict";

test("TaskService.create adds timestamp", async () => {
  const service = new TaskService();
  const task = await service.create("Buy groceries");

  assert.strictEqual(task.title, "Buy groceries");
  assert.strictEqual(task.completed, false);
  assert.ok(task.createdAt > 0, "createdAt must be a valid timestamp");
});`,
        explanation: "node:test provides clear terminal output, timing metrics, and full assertion diffs on failure.",
      },
    },
    part5: {
      title: "Try It: Simulating a Micro Test Runner",
      intro: "Experiment with running test suites and assertion verification:",
      starterCode: `// Micro Test Runner Simulator
const testSuite = [];

function it(name, fn) { testSuite.push({ name, fn }); }

function assertEqual(actual, expected) {
  if (actual !== expected) {
    throw new Error(\`Expected \${expected}, but received \${actual}\`);
  }
}

// Define tests
it("Math: 2 + 2 = 4", () => assertEqual(2 + 2, 4));
it("String: Hello + World", () => assertEqual("Hello " + "World", "Hello World"));

// Execute suite
console.log("=== Running Test Suite ===");
let passed = 0;
for (const t of testSuite) {
  try {
    t.fn();
    console.log(\`✅ PASS: \${t.name}\`);
    passed++;
  } catch (err) {
    console.log(\`❌ FAIL: \${t.name} -> \${err.message}\`);
  }
}
console.log(\`\\nSummary: \${passed}/\${testSuite.length} tests passed.\`);`,
    },
    part6: {
      title: "Concept Check: Built-in Testing",
      quiz: {
        question: "How do you run all test files using Node's native built-in test runner?",
        options: [
          "node --run-jest",
          "node --test",
          "npm start --tests",
          "node --execute-all",
        ],
        correctIndex: 1,
        explanation: "`node --test` automatically discovers and executes all test files matching `*.test.js` or `*.spec.js` using the native runner.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "Zero Dependencies", desc: "Use node:test and node:assert/strict for zero-dependency unit and integration testing." },
        { title: "Strict Assertions", desc: "Always use assert/strict for strict equality (===) and deepStrictEqual for objects." },
        { title: "CLI Runner", desc: "Run node --test from your package.json test script for fast, automated verification." },
      ],
      nextLessonPreview: {
        title: "NODE-22: Best Practices & Common Anti-Patterns",
        desc: "Learn how to avoid blocking the event loop, handle async errors properly, and write clean production code.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-22: Best Practices & Common Anti-Patterns
  // ─────────────────────────────────────────────────────────────
  "node22-best-practices-and-anti-patterns": {
    slug: "node22-best-practices-and-anti-patterns",
    code: "NODE-22",
    title: "Node.js Best Practices & Common Anti-Patterns",
    subtitle: "Avoid blocking the event loop with synchronous calls, prevent unhandled rejections, and write robust production Node.js applications.",
    sections: [
      { id: "part1", label: "The Golden Rules", icon: "⭐" },
      { id: "part2", label: "Top 4 Anti-Patterns", icon: "⚠️" },
      { id: "part3", label: "Production Best Practices", icon: "🏆" },
      { id: "part4", label: "Bad vs Improved Patterns", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Mastering Node.js: The Production Mindset",
      bigPicture: "Writing code that works on your laptop with one user is easy. Writing code that stays fast, stable, and secure under thousands of concurrent users requires following proven best practices and avoiding classic Node.js anti-patterns.",
      breakdownTitle: "The core pillars of Node.js mastery:",
      breakdownItems: [
        { title: "Keep the Main Thread Free", desc: "Never block the event loop with heavy sync operations or infinite loops." },
        { title: "Handle Every Error Explicitly", desc: "Catch and log all Promise rejections and EventEmitter errors." },
        { title: "Stream Large Payloads", desc: "Never buffer large files or network payloads entirely into RAM." },
      ],
    },
    part2: {
      title: "The Top 4 Anti-Patterns to Avoid",
      intro: "Mistakes that cause production crashes and performance degradation:",
      cards: [
        {
          number: "01",
          tag: "BLOCKING",
          title: "Using Sync Methods in Request Handlers",
          description: "Calling `fs.readFileSync()` or `crypto.pbkdf2Sync()` inside an HTTP handler freezes all other users.",
          color: "rose",
        },
        {
          number: "02",
          tag: "SWALLOWING",
          title: "Empty Catch Blocks",
          description: "`try { ... } catch (e) {}` swallows errors, hiding crashes and corrupting application state.",
          color: "amber",
        },
        {
          number: "03",
          tag: "LEAKAGE",
          title: "Unbounded Global Caches",
          description: "Pushing objects into a global array or Map without a size limit causes gradual memory leaks (OOM crashes).",
          color: "purple",
        },
        {
          number: "04",
          tag: "SECURITY",
          title: "Hardcoding Secrets in Source Code",
          description: "Committing API keys or database passwords to git repositories compromises security.",
          color: "cyan",
        },
      ],
      rule: {
        title: "The Asynchronous First Rule",
        content: "If an API has both a Sync and an Async version (e.g. `fs.readFile` vs `fs.readFileSync`), always use the Async version in production.",
      },
    },
    part3: {
      title: "Production Best Practices Checklist",
      intro: "Rules followed by top Node.js engineering teams:",
      points: [
        {
          title: "1. Use Linters and Strict Mode",
          content: "Use ESLint and standard conventions to catch bugs before runtime.",
        },
        {
          title: "2. Structure by Feature, Not Just Tech",
          content: "Keep related routes, controllers, and services together in cohesive domain folders.",
        },
        {
          title: "3. Health Check Endpoint",
          content: "Always provide a `GET /health` route returning `{ status: 'ok' }` for load balancers and Kubernetes probes.",
          codeSnippet: `// Standard Health Check
if (req.url === '/health' && req.method === 'GET') {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage().heapUsed
  }));
}`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Sync vs Async in Handlers",
      bad: {
        title: "Calling fs.readFileSync in an HTTP Handler",
        code: `// Anti-pattern: Blocking the main thread
import fs from "node:fs";
import http from "node:http";

http.createServer((req, res) => {
  // Freezes the server for ALL users during the disk read!
  const template = fs.readFileSync("./page.html", "utf8");
  res.end(template);
});`,
        explanation: "readFileSync stops the event loop, preventing Node from accepting new connections or responding to existing users.",
      },
      good: {
        title: "Asynchronous File Reading or Caching on Bootstrap",
        code: `import fs from "node:fs/promises";
import http from "node:http";

// Best Practice: Load static template ONCE during server bootstrap
const template = await fs.readFile("./page.html", "utf8");

http.createServer((req, res) => {
  // Responds instantly from memory without touching disk!
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(template);
});`,
        explanation: "Loading static files once during bootstrap keeps request handlers non-blocking and blazingly fast.",
      },
    },
    part5: {
      title: "Try It: Code Quality Audit Simulator",
      intro: "Audit a simulated codebase for common anti-patterns:",
      starterCode: `// Code Audit Simulator
const codebase = [
  { file: 'server.js', code: 'fs.readFileSync("data.json")' },
  { file: 'auth.js', code: 'const apiKey = "sk_live_123456789";' },
  { file: 'tasks.js', code: 'try { doWork(); } catch (err) {}' },
  { file: 'health.js', code: 'res.end(JSON.stringify({ status: "ok" }))' }
];

function auditCode(files) {
  const issues = [];
  for (const f of files) {
    if (f.code.includes('Sync(')) issues.push(\`[WARN] \${f.file}: Synchronous blocking call detected!\`);
    if (f.code.includes('sk_live_')) issues.push(\`[SECURITY] \${f.file}: Hardcoded API secret detected!\`);
    if (f.code.includes('catch (err) {}')) issues.push(\`[ERROR] \${f.file}: Silent error catch block detected!\`);
  }
  return issues;
}

const report = auditCode(codebase);
console.log("=== Codebase Audit Report ===");
report.forEach(r => console.log(r));`,
    },
    part6: {
      title: "Concept Check: Node.js Anti-Patterns",
      quiz: {
        question: "Why should you never call synchronous file operations (like fs.readFileSync) inside an HTTP request handler?",
        options: [
          "Because synchronous operations run in a background thread.",
          "Because they block the single JavaScript main thread, preventing the server from handling any other user requests until the disk read finishes.",
          "Because Node.js will automatically delete the file.",
          "Because synchronous operations only work on Windows computers.",
        ],
        correctIndex: 1,
        explanation: "Synchronous operations block the single main thread completely, freezing all concurrent user requests until the operation finishes.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "Non-Blocking Always", desc: "Never use synchronous methods (readFileSync, pbkdf2Sync) inside web request handlers." },
        { title: "No Silent Swallowing", desc: "Always log and handle errors explicitly; never leave empty catch blocks." },
        { title: "Stream Large Data", desc: "Use streams for files and large payloads to keep memory usage minimal." },
      ],
      nextLessonPreview: {
        title: "NODE-23: Core Interview Concepts & Behavioral Scenarios",
        desc: "Master classic Node.js interview questions: Event Loop phases, process.nextTick vs setImmediate, and stream backpressure.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-23: Core Interview Concepts
  // ─────────────────────────────────────────────────────────────
  "node23-core-interview-concepts": {
    slug: "node23-core-interview-concepts",
    code: "NODE-23",
    title: "Node.js Core Interview Concepts & Behavioral Scenarios",
    subtitle: "Master classic Node.js interview questions: Event Loop phases, process.nextTick vs setImmediate, and stream backpressure.",
    sections: [
      { id: "part1", label: "The Interview Playbook", icon: "💼" },
      { id: "part2", label: "Top 4 Technical Questions", icon: "🎯" },
      { id: "part3", label: "nextTick vs setImmediate", icon: "⏱️" },
      { id: "part4", label: "Vague vs Precise Explanations", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "The Senior Node.js Interview Playbook",
      bigPicture: "Technical interviews for backend Node.js positions test whether you truly understand how the runtime behaves under the hood, or if you simply memorized framework APIs. Interviewers want to hear about V8, libuv, the Event Loop, memory management, and stream backpressure.",
      breakdownTitle: "The four core topics interviewers focus on:",
      breakdownItems: [
        { title: "1. Runtime Architecture", desc: "Explaining the relationship between V8 (JS execution) and Libuv (async I/O & thread pool)." },
        { title: "2. Event Loop Execution Order", desc: "Distinguishing microtasks (Promises, nextTick) from macrotasks (timers, I/O, setImmediate)." },
        { title: "3. Streams & Backpressure", desc: "Explaining how Node handles gigabyte payloads without running out of RAM." },
        { title: "4. Error & Process Resilience", desc: "Explaining graceful shutdown (SIGTERM) and why uncaughtException requires process exit." },
      ],
    },
    part2: {
      title: "Classic Technical Questions & Direct Answers",
      intro: "How to answer core questions with precision:",
      cards: [
        {
          number: "01",
          tag: "CONCURRENCY",
          title: "Is Node.js truly single-threaded?",
          description: "JavaScript executes on a single main thread, but Libuv uses a background C++ thread pool (default 4 threads) for file I/O, DNS, and crypto.",
          color: "purple",
        },
        {
          number: "02",
          tag: "TIMING",
          title: "process.nextTick vs setImmediate",
          description: "nextTick runs immediately after current sync execution before the event loop continues. setImmediate runs in the Check phase of the next loop tick.",
          color: "emerald",
        },
        {
          number: "03",
          tag: "MEMORY",
          title: "What is Backpressure?",
          description: "Flow control that pauses the readable stream when the writable stream's buffer is full, preventing memory overflow.",
          color: "cyan",
        },
        {
          number: "04",
          tag: "ARCHITECTURE",
          title: "CommonJS vs ES Modules",
          description: "CJS is synchronous and dynamic with require(). ESM is static and asynchronous with import/export.",
          color: "amber",
        },
      ],
      rule: {
        title: "The 'Why Before How' Rule",
        content: "In interviews, always explain the problem first (e.g. 'Without backpressure, fast NVMe reads overwhelm slow network clients and exhaust RAM'), then explain the solution.",
      },
    },
    part3: {
      title: "Execution Priority: nextTick vs Promise vs Timer vs setImmediate",
      intro: "The exact micro-order of execution in Node.js:",
      points: [
        {
          title: "1. Synchronous Call Stack",
          content: "Current synchronous function runs to completion.",
        },
        {
          title: "2. process.nextTick Queue",
          content: "Runs before any other microtask or phase transition.",
        },
        {
          title: "3. Promise Microtask Queue",
          content: "Promise `.then()` and `await` continuations run next.",
        },
        {
          title: "4. Event Loop Phases (Timers -> I/O -> Check/setImmediate)",
          content: "Macrotasks execute in their respective phases.",
          codeSnippet: `console.log("1. Sync");

setTimeout(() => console.log("5. setTimeout (Timer phase)"), 0);
setImmediate(() => console.log("6. setImmediate (Check phase)"));

Promise.resolve().then(() => console.log("3. Promise microtask"));
process.nextTick(() => console.log("2. nextTick microtask"));

console.log("4. Sync End");`,
        },
      ],
    },
    part4: {
      title: "Bad vs Improved: Interview Explanations",
      bad: {
        title: "Vague Memorized Answer",
        code: `// Question: What is the event loop?
// Candidate: "Node.js is non-blocking and uses an event loop to run fast."
// Interviewer reaction: Vague! The candidate does not understand how it works.`,
        explanation: "Memorized buzzwords fail to demonstrate actual technical depth.",
      },
      good: {
        title: "Precise Architectural Explanation",
        code: `// Candidate:
// "Node.js runs JavaScript on a single Call Stack. When an asynchronous
// I/O operation (like a file read or network request) is started, Node
// offloads the work to Libuv or the OS kernel.
//
// The Event Loop continuously checks if the Call Stack is empty.
// When the stack is clear, it pulls completed callbacks from the queues
// (Microtasks first, then Timers, I/O, and setImmediate) and pushes them
// back onto the stack for execution."`,
        explanation: "Explaining the Call Stack, Libuv offload, and queue prioritization proves deep mastery.",
      },
    },
    part5: {
      title: "Try It: Test Your Execution Order Mental Model",
      intro: "Predict the output order of this interview scenario:",
      starterCode: `console.log("Step 1: Main line");

setTimeout(() => {
  console.log("Step 5: Timer callback");
}, 0);

setImmediate(() => {
  console.log("Step 6: setImmediate callback");
});

Promise.resolve().then(() => {
  console.log("Step 4: Promise microtask");
});

process.nextTick(() => {
  console.log("Step 3: nextTick microtask");
});

console.log("Step 2: End of script");

// Output Order:
// Step 1: Main line
// Step 2: End of script
// Step 3: nextTick microtask
// Step 4: Promise microtask
// Step 5: Timer callback
// Step 6: setImmediate callback`,
    },
    part6: {
      title: "Concept Check: Event Loop Priority",
      quiz: {
        question: "Between process.nextTick() and Promise.resolve().then(), which microtask queue executes first in Node.js?",
        options: [
          "Promise.resolve().then() always executes before process.nextTick().",
          "process.nextTick() executes first, immediately after the current synchronous script finishes.",
          "They execute at the exact same time on parallel threads.",
          "Neither executes until setTimeout finishes.",
        ],
        correctIndex: 1,
        explanation: "Node.js prioritizes the `process.nextTick` queue ahead of the standard Promise microtask queue.",
      },
    },
    part7: {
      title: "Key Takeaways & Next Steps",
      takeaways: [
        { title: "V8 + Libuv", desc: "V8 executes JavaScript; Libuv manages the thread pool, I/O, and the Event Loop." },
        { title: "nextTick Priority", desc: "process.nextTick microtasks execute before standard Promise microtasks." },
        { title: "Backpressure", desc: "Flow control prevents fast producers from overwhelming slow consumers." },
      ],
      nextLessonPreview: {
        title: "NODE-24: Capstone Project — File & Task Management Server",
        desc: "Put everything together: architect a complete, modular backend server using pure Node.js core modules!",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // NODE-24: Capstone Project
  // ─────────────────────────────────────────────────────────────
  "node24-nodejs-capstone-project": {
    slug: "node24-nodejs-capstone-project",
    code: "NODE-24",
    title: "Node.js Capstone: File & Task Management Server",
    subtitle: "Architect a complete, modular backend server from scratch using pure Node.js core modules.",
    sections: [
      { id: "part1", label: "The Capstone Mission", icon: "🏆" },
      { id: "part2", label: "Server Architecture", icon: "🏛️" },
      { id: "part3", label: "Core Requirements", icon: "📋" },
      { id: "part4", label: "Clean Architecture Blueprint", icon: "📐" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Capstone Knowledge Check", icon: "🎯" },
      { id: "part7", label: "Graduation & Mastery", icon: "🎓" },
    ],
    part1: {
      title: "The Ultimate Challenge: Pure Node.js Backend Server",
      bigPicture: "You have mastered the Node.js runtime: V8 engine, the Event Loop, asynchronous non-blocking I/O, CommonJS and ESM, the File System and Path modules, EventEmitter pub/sub, raw Buffers, high-performance Streams with backpressure, native HTTP routing and body parsing, environment configuration, error hierarchies, graceful shutdown signals, and automated testing with node:test. Now, you will combine all these skills to build a production-grade File & Task Management Server using STRICTLY Node.js core modules!",
      breakdownTitle: "Capstone rules and boundaries:",
      breakdownItems: [
        { title: "Zero External Frameworks", desc: "No Express, No Fastify, No NestJS. Built 100% on native node:http, node:fs, and node:events." },
        { title: "Zero Database Libraries", desc: "No Prisma, No Mongoose, No SQL drivers. Persistence is managed via atomic JSON and streaming file storage." },
        { title: "Production Resilience", desc: "Complete with environment validation, custom error handling, SIGTERM graceful shutdown, and node:test test suites." },
      ],
    },
    part2: {
      title: "Capstone System Architecture",
      intro: "The modular structure of your final capstone application:",
      cards: [
        {
          number: "01",
          tag: "HTTP LAYER",
          title: "Native HTTP Router",
          description: "Routes GET /api/tasks, POST /api/tasks, DELETE /api/tasks/:id, and POST /api/files/upload with streaming body parsing.",
          color: "purple",
        },
        {
          number: "02",
          tag: "STORAGE LAYER",
          title: "Atomic JSON & File Streams",
          description: "Task metadata stored in JSON using the write-and-rename atomic pattern. File attachments streamed with pipeline().",
          color: "emerald",
        },
        {
          number: "03",
          tag: "PUB / SUB",
          title: "EventEmitter Audit Logger",
          description: "Emits 'taskCreated', 'taskDeleted', and 'fileUploaded' events to write append-only audit logs asynchronously.",
          color: "cyan",
        },
        {
          number: "04",
          tag: "PROCESS",
          title: "Graceful Shutdown & Signals",
          description: "Listens for SIGTERM and SIGINT to close active HTTP connections cleanly before process exit.",
          color: "amber",
        },
      ],
      rule: {
        title: "The Mastery Standard",
        content: "Demonstrate not just that you can write JavaScript, but that you deeply understand how Node.js communicates with the operating system and orchestrates asynchronous I/O.",
      },
    },
    part3: {
      title: "Core Endpoints & Functional Requirements",
      intro: "What your File & Task Management Server must provide:",
      points: [
        {
          title: "1. GET /api/tasks",
          content: "Returns a list of all tasks with status 200 OK and `Content-Type: application/json`.",
        },
        {
          title: "2. POST /api/tasks",
          content: "Parses the streaming JSON request body, validates `title`, saves the task atomically, emits an audit event, and returns 201 Created.",
        },
        {
          title: "3. DELETE /api/tasks/:id",
          content: "Deletes a task by ID. If not found, throws a custom 404 NotFoundError.",
        },
        {
          title: "4. POST /api/files/upload",
          content: "Streams an uploaded file directly to the `/uploads` directory using `stream.pipeline()`.",
          codeSnippet: `// Server Entry Point: server.js
import http from 'node:http';
import { router } from './src/router.js';
import { config } from './src/config/config.js';
import { setupGracefulShutdown } from './src/utils/shutdown.js';

const server = http.createServer((req, res) => router.handle(req, res));

server.listen(config.port, () => {
  console.log(\`🚀 Capstone Server listening on http://localhost:\${config.port}\`);
});

setupGracefulShutdown(server);`,
        },
      ],
    },
    part4: {
      title: "Architectural Blueprint: Complete File Layout",
      bad: {
        title: "Single File Spaghetti (Anti-Pattern)",
        code: `// Avoid: Putting all 500 lines of routing, storage, and events in index.js
// This violates single responsibility and makes testing impossible.`,
        explanation: "Modular structure is a core grading criterion of the Capstone.",
      },
      good: {
        title: "Clean Modular Layering (Capstone Standard)",
        code: `task-server/
├── package.json               # "type": "module", "scripts": { "test": "node --test" }
├── src/
│   ├── config/config.js       # process.env validation
│   ├── events/auditLogger.js  # EventEmitter audit logger
│   ├── repositories/          # Atomic JSON and stream storage
│   ├── services/taskService.js# Domain validation & business logic
│   ├── controllers/           # HTTP route handlers
│   ├── utils/response.js      # sendJson & parseJsonBody helpers
│   ├── router.js              # URL matching dispatch table
│   └── server.js              # Entry point & SIGTERM shutdown
└── tests/
    └── task.test.js           # Automated tests with node:test`,
        explanation: "A clean, modular directory structure allows independent testing and seamless code maintenance.",
      },
    },
    part5: {
      title: "Try It: Capstone System Smoke Test",
      intro: "Test the combined TaskService, Atomic Storage, and Audit Logger simulation:",
      starterCode: `// Capstone Core Simulation
class AuditLogger {
  log(event, payload) {
    console.log(\`📢 [AUDIT \${new Date().toISOString()}]: \${event} ->\`, payload);
  }
}

class TaskService {
  constructor(logger) {
    this.tasks = [];
    this.logger = logger;
  }

  createTask(title, priority = 'normal') {
    if (!title) throw new Error("Task title is required");
    const task = { id: Date.now(), title, priority, completed: false };
    this.tasks.push(task);
    this.logger.log('TASK_CREATED', { id: task.id, title });
    return task;
  }

  getTasks() { return this.tasks; }
}

const audit = new AuditLogger();
const service = new TaskService(audit);

console.log("=== Running Capstone Workflow ===");
const t1 = service.createTask("Complete Node.js Curriculum", "high");
const t2 = service.createTask("Deploy Capstone Server", "high");

console.log("\\nAll Active Tasks:", service.getTasks());
console.log("\\n🎉 Capstone Verification: All subsystems operational!");`,
    },
    part6: {
      title: "Concept Check: Capstone Mastery",
      quiz: {
        question: "In the Node.js Capstone Server, why is file uploads handled with stream.pipeline() instead of fs.readFile()?",
        options: [
          "Because stream.pipeline() is required to convert files into SQL rows.",
          "Because stream.pipeline() streams chunks directly to disk with automatic backpressure and error teardown, keeping server RAM minimal.",
          "Because fs.readFile() deletes the uploaded file after 10 seconds.",
          "Because browsers refuse to send files over HTTP unless pipeline is used.",
        ],
        correctIndex: 1,
        explanation: "stream.pipeline() streams file chunks directly from the network socket to disk with automatic backpressure and resource teardown, preventing memory exhaustion.",
      },
    },
    part7: {
      title: "Graduation: You Have Mastered Node.js!",
      takeaways: [
        { title: "Runtime Mastery", desc: "You understand how V8, Libuv, and the Event Loop coordinate asynchronous non-blocking I/O." },
        { title: "Core APIs", desc: "You can build real servers using fs, path, events, buffers, streams, and native http." },
        { title: "Ready for Advanced Topics", desc: "You are now fully prepared for Express, NestJS, Prisma, PostgreSQL, Docker, and Redis in LearnCraft!" },
      ],
      nextLessonPreview: {
        title: "Explore the Capstone Workspace",
        desc: "Jump into the Capstone project workspace to inspect, run, and test your complete Node.js File & Task Management Server.",
      },
    },
  },
};

/**
 * Helper lookup function
 */
export function getNodejsLessonContent(slug: string): NodejsLessonContent {
  const content = NODEJS_LESSONS_CONTENT[slug];
  if (content) {
    return content;
  }

  // Fallback if not found
  return NODEJS_LESSONS_CONTENT["node01-what-is-nodejs"];
}
