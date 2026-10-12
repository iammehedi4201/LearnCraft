import { InterviewQuestion } from "@/types/interview";

export const NODEJS_QUESTIONS: InterviewQuestion[] = [
  {
    id: "node-q01",
    trackKey: "nodejs",
    category: "Event Loop & Architecture",
    subtopic: "Event Loop Phases",
    type: "conceptual",
    difficulty: "hard",
    source: "curated",
    question: "Walk through the 6 phases of the Node.js Event Loop (libuv). How do `process.nextTick` and `setImmediate` fit in?",
    answer: `### Simple answer:
The Node.js event loop is powered by **libuv** and cycles through 6 distinct phases in order to handle asynchronous I/O, timers, and callbacks without blocking the single main thread:

### The 6 Phases:
1. **Timers Phase:** Executes callbacks scheduled by expired \`setTimeout()\` and \`setInterval()\`.
2. **Pending Callbacks (I/O Callbacks):** Executes deferred I/O callbacks from previous loop iterations (e.g., specific OS errors like \`ECONNREFUSED\`).
3. **Idle, Prepare:** Internal libuv phases used only for engine internals.
4. **Poll Phase:** Retrieves new I/O events (network, filesystem, incoming sockets); blocks and waits for connections if no timers are ready.
5. **Check Phase:** Executes callbacks scheduled specifically by **\`setImmediate()\`**.
6. **Close Callbacks:** Executes socket and handle close callbacks (e.g., \`socket.on('close', ...)\`).

### Where does \`process.nextTick()\` run?
\`process.nextTick()\` is **not part of the event loop phases**. It manages its own microtask queue. It runs **immediately after the current synchronous operation finishes**, before the event loop transitions to any subsequent phase.

### \`process.nextTick\` vs \`setImmediate\`:
- \`process.nextTick\`: Runs immediately before the loop continues. Recursive calls can starve I/O completely!
- \`setImmediate\`: Runs in the Check phase on the next loop turn, allowing I/O to be serviced fairly.

### Interview answer:
The libuv event loop has 6 phases: Timers, Pending I/O, Idle/Prepare, Poll (waiting for new I/O), Check (running \`setImmediate\`), and Close. \`process.nextTick\` runs immediately between operations before the event loop enters any phase, while \`setImmediate\` queues callbacks for the Check phase after the Poll phase.`,
    followUps: [
      "If you call setTimeout(fn, 0) and setImmediate(fn) in the main module, which runs first?",
      "How does the libuv thread pool (UV_THREADPOOL_SIZE) interact with the single-threaded event loop?",
      "Which Node.js operations use the libuv thread pool versus OS async mechanisms?"
    ],
    keyPoints: [
      "The 6 phases: Timers, Pending Callbacks, Idle/Prepare, Poll, Check, Close",
      "setImmediate runs in the Check phase",
      "process.nextTick runs immediately between operations before any phase transition",
      "Filesystem and crypto use the libuv thread pool; network sockets use epoll/kqueue"
    ],
    tags: ["nodejs", "libuv", "event-loop", "setImmediate", "process-nextTick"],
    relatedLessonSlug: "/learn/nodejs/node02-event-loop-libuv",
    relatedLessonName: "NODE-02: The Node.js Event Loop & libuv Internals"
  },
  {
    id: "node-q02",
    trackKey: "nodejs",
    category: "Streams & Memory",
    subtopic: "Streams & Backpressure",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "What is Backpressure in Node.js Streams, and how do you properly handle it without blowing up RAM?",
    answer: `### Simple answer:
Backpressure happens when the data producer (Readable stream) reads data faster than the data consumer (Writable stream) can write it, causing unwritten data to pile up in memory until the server crashes.

### The Problem:
If you read a 5GB file from disk and pipe it to a slow network client without backpressure, the unwritten chunks accumulate in RAM, leading to an **Out Of Memory (OOM)** crash.

### How it works:
1. When \`writable.write(chunk)\` returns \`false\`, the internal buffer (\`highWaterMark\`, default 16KB or 64KB) is full.
2. The producer pauses reading via \`readable.pause()\`.
3. When the consumer clears its buffer, the writable emits a \`"drain"\` event.
4. The producer resumes reading via \`readable.resume()\`.

### Best Practice: \`stream.pipeline\`
Instead of manual \`drain\` events or older \`readable.pipe(writable)\` (which doesn't properly clean up on errors), use **\`stream.promises.pipeline\`**:

\`\`\`javascript
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";

async function copyFile() {
  await pipeline(
    createReadStream("huge-file.csv"),
    createWriteStream("output.csv")
  );
  console.log("Stream successfully finished with backpressure managed!");
}
\`\`\`

### Interview answer:
Backpressure occurs when a readable stream produces data faster than a writable stream can consume it. When the buffer is full, \`write()\` returns \`false\`, signaling the readable stream to pause until the writable emits a \`drain\` event. We handle this automatically using \`stream.pipeline\`, which manages backpressure and safely cleans up memory if errors occur.`,
    followUps: [
      "Why is readable.pipe() considered hazardous in production compared to stream.pipeline()?",
      "What are Transform streams and Duplex streams?",
      "How does the highWaterMark option affect stream throughput and latency?"
    ],
    keyPoints: [
      "Backpressure occurs when read rate exceeds write throughput",
      "writable.write() returns false when buffer exceeds highWaterMark",
      "Writable emits 'drain' when buffer frees up space",
      "stream.pipeline automatically handles backpressure and cleans up all streams on error"
    ],
    tags: ["nodejs", "streams", "backpressure", "memory", "pipeline"],
    relatedLessonSlug: "/learn/nodejs/node05-streams-and-buffers",
    relatedLessonName: "NODE-05: Streams, Buffers & Backpressure Handling"
  },
  {
    id: "node-q03",
    trackKey: "nodejs",
    category: "Concurrency & Scaling",
    subtopic: "Worker Threads vs Cluster",
    type: "conceptual",
    difficulty: "hard",
    source: "curated",
    question: "Compare Worker Threads, Cluster Module, and Child Processes in Node.js. When should you use each for scaling?",
    answer: `### Simple answer:
Node.js provides three distinct ways to scale beyond a single thread:

| Feature | Worker Threads (\`worker_threads\`) | Cluster Module (\`cluster\`) | Child Processes (\`child_process\`) |
|---|---|---|---|
| **Process Model** | Same process, multiple OS threads | Multiple independent OS processes | Multiple independent OS processes |
| **Memory** | Can share memory via \`SharedArrayBuffer\` | Isolated memory space per worker | Isolated memory space |
| **Best For** | **CPU-bound tasks** (image resize, encryption, heavy math) | **Network I/O scaling** (multi-core HTTP servers) | Executing external shell commands, Python scripts, CLI tools |
| **Port Sharing** | No native socket sharing | Shares server port across forks automatically | No native socket sharing |
| **Overhead** | Low RAM overhead (~few MBs) | Moderate (~30-50MB per process) | Highest (spawns separate binary) |

### Key Rule:
- To **handle more HTTP web traffic on a multi-core server**: Use **Cluster** or run multiple containers (Docker / Kubernetes).
- To **perform heavy CPU calculations** without blocking the main event loop: Use **Worker Threads**.
- To **run external CLI utilities** (e.g. \`ffmpeg\`, \`python\`, \`git\`): Use **\`child_process.spawn()\`**.

### Interview answer:
Use the Cluster module to utilize all CPU cores for handling network traffic by forking child processes that share the same port. Use Worker Threads for CPU-heavy tasks like cryptography or image processing to prevent blocking the event loop. Use Child Processes to execute external binaries or scripts.`,
    followUps: [
      "Why does cluster.fork() work well on Linux using round-robin socket distribution?",
      "How do Worker Threads communicate (MessageChannel, postMessage)?",
      "What is the difference between child_process.exec() and child_process.spawn() regarding buffer limits?"
    ],
    keyPoints: [
      "Cluster forks separate processes sharing the same TCP port for HTTP scaling",
      "Worker Threads run inside the same process with shared memory for CPU-bound computations",
      "Child Processes execute external binaries and system commands",
      "Heavy CPU tasks must never run on the main Node event loop thread"
    ],
    tags: ["cluster", "worker-threads", "child-process", "scaling", "multithreading"],
    relatedLessonSlug: "/learn/nodejs/node08-worker-threads-and-cluster",
    relatedLessonName: "NODE-08: Worker Threads & Multi-Core Clustering"
  },
  {
    id: "node-q04",
    trackKey: "nodejs",
    category: "Architecture & Fundamentals",
    subtopic: "Non-blocking I/O",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is Node.js, and how does its non-blocking asynchronous I/O model work?",
    answer: `### Simple answer:
Node.js is an open-source JavaScript runtime built on Google Chrome's V8 engine that allows developers to run JavaScript outside the browser on servers and desktops.

### Non-blocking I/O explained:
In traditional multi-threaded servers (like Apache or older Java servers), each incoming request gets its own thread. If a request reads from a database, the thread sits idle waiting for the disk/network.
In Node.js:
1. Everything runs on a **single main thread**.
2. When an I/O operation begins (file read, database query, network request), Node delegates the task to the underlying operating system or libuv thread pool.
3. The main thread is **immediately free** to handle the next incoming request!
4. When the I/O completes, a callback or Promise is placed in the task queue to process the result.

### Example:
\`\`\`javascript
import fs from "node:fs/promises";

console.log("1: Start request");

// Non-blocking asynchronous file read:
fs.readFile("data.txt", "utf-8").then((data) => {
  console.log("3: File data arrived");
});

console.log("2: Main thread continues immediately!");
// Outputs: 1 -> 2 -> 3
\`\`\`

### Interview answer:
Node.js is a server-side JavaScript runtime built on the V8 engine. It uses a single-threaded, non-blocking event-driven architecture where I/O operations are offloaded asynchronously, allowing a single server process to handle thousands of concurrent connections efficiently with low memory overhead.`,
    followUps: [
      "Why is Node.js ideal for I/O-heavy applications but historically challenging for CPU-heavy tasks?",
      "What role does the V8 engine play versus libuv in Node.js?",
      "How does epoll/kqueue enable OS-level non-blocking sockets?"
    ],
    keyPoints: [
      "V8 compiles JavaScript into machine code",
      "libuv manages asynchronous I/O and cross-platform event loops",
      "Non-blocking model delegates operations so main thread never sleeps",
      "High throughput for I/O-bound web services"
    ],
    tags: ["nodejs", "v8", "non-blocking", "event-driven", "fundamentals"],
    relatedLessonSlug: "/learn/nodejs/node01-what-is-nodejs",
    relatedLessonName: "NODE-01: What is Node.js & Asynchronous Runtime"
  },
  {
    id: "node-q05",
    trackKey: "nodejs",
    category: "Modules & Architecture",
    subtopic: "CommonJS vs ESM",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is the difference between CommonJS (CJS) and ECMAScript Modules (ESM) in Node.js?",
    answer: `### Simple answer:
CommonJS (\`require\` / \`module.exports\`) is Node's original module system. ECMAScript Modules (\`import\` / \`export\`) is the modern official JavaScript standard supported in both browsers and modern Node.js.

### Comparison:
| Feature | CommonJS (CJS) | ES Modules (ESM) |
|---|---|---|
| **Syntax** | \`const fs = require('fs');\` | \`import fs from 'fs';\` |
| **Export** | \`module.exports = { ... };\` | \`export default ...\` / \`export { ... }\` |
| **Loading** | **Synchronous** (blocks execution) | **Asynchronous** (parsed before execution) |
| **Top-level await** | ❌ No | **Yes** (supported natively) |
| **File extension** | \`.js\` or \`.cjs\` | \`.mjs\` or \`.js\` with \`"type": "module"\` in package.json |
| **Globals** | Has \`__dirname\` and \`__filename\` | Uses \`import.meta.url\` instead |

### How to use ESM in Node.js:
Add \`"type": "module"\` to your \`package.json\`, or use the \`.mjs\` file extension:
\`\`\`javascript
// Recreating __dirname in ESM:
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
\`\`\`

### Interview answer:
CommonJS uses synchronous \`require()\` and was Node's historical default. ESM is the modern ECMAScript standard using asynchronous static \`import\` statements, supporting tree shaking and top-level await. Modern Node.js projects prefer ESM by setting \`"type": "module"\` in \`package.json\`.`,
    followUps: [
      "Can an ESM file import a CommonJS package in Node.js?",
      "Can a CommonJS file require an ESM-only package like recent versions of node-fetch?",
      "How does tree-shaking work with ESM compared to CJS?"
    ],
    keyPoints: [
      "CommonJS: require/module.exports (synchronous)",
      "ESM: import/export (asynchronous and statically analyzable)",
      "Enable ESM using 'type': 'module' in package.json",
      "ESM supports top-level await and tree-shaking"
    ],
    tags: ["commonjs", "esm", "modules", "require", "import"],
    relatedLessonSlug: "/learn/nodejs/node03-modules-cjs-vs-esm",
    relatedLessonName: "NODE-03: CommonJS vs ES Modules & Package Architecture"
  },
  {
    id: "node-q06",
    trackKey: "nodejs",
    category: "Events & Patterns",
    subtopic: "EventEmitter",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "How does the `EventEmitter` class work in Node.js, and what causes the 'MaxListenersExceededWarning'?",
    answer: `### Simple answer:
The \`EventEmitter\` class from the \`node:events\` module implements the Observer / Pub-Sub pattern, allowing objects to emit named events and listen for them with callbacks.

### Basic Example:
\`\`\`javascript
import { EventEmitter } from "node:events";

const orderEmitter = new EventEmitter();

// 1. Register listener:
orderEmitter.on("order_placed", (orderId, amount) => {
  console.log(\`Order #\${orderId} placed for $\${amount}\`);
});

// 2. Emit event:
orderEmitter.emit("order_placed", 101, 49.99);
\`\`\`

### The MaxListenersExceededWarning:
By default, an EventEmitter allows a maximum of **10 listeners** per event.
If you attach more than 10 listeners, Node prints a warning:
\`\`\`
(node:1234) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 order_placed listeners added.
\`\`\`

### Why this happens:
It is an intentional safety safeguard against memory leaks! Usually, this warning indicates that code is adding a listener inside a loop or request handler without removing it with \`.off()\` or \`.removeListener()\`.

### How to fix:
1. Ensure listeners are cleaned up when no longer needed (\`emitter.off(event, handler)\`).
2. If having >10 listeners is deliberate, increase the limit safely:
\`\`\`javascript
orderEmitter.setMaxListeners(25);
\`\`\`

### Interview answer:
\`EventEmitter\` provides event-driven pub-sub communication in Node.js via \`.on()\` and \`.emit()\`. The MaxListenersExceededWarning appears when more than 10 listeners are attached to an event, which Node warns about to help developers identify potential memory leaks where listeners are added repeatedly without cleanup.`,
    followUps: [
      "What is the difference between emitter.on() and emitter.once()?",
      "What happens if an EventEmitter emits an 'error' event with no listener registered?",
      "How are Streams related to EventEmitters?"
    ],
    keyPoints: [
      "EventEmitter provides pub-sub event communication in Node.js",
      "Methods: on(), once(), emit(), off()",
      "Default max listeners is 10 to detect memory leaks early",
      "Unhandled 'error' events will crash the Node.js process"
    ],
    tags: ["event-emitter", "events", "memory-leaks", "observer-pattern"],
    relatedLessonSlug: "/learn/nodejs/node04-event-emitter-pattern",
    relatedLessonName: "NODE-04: EventEmitter & Reactive Event Pipelines"
  },
  {
    id: "node-q07",
    trackKey: "nodejs",
    category: "Buffers & Binary Data",
    subtopic: "Buffers",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "What are Buffers in Node.js, why are they needed, and how do you work with binary data?",
    answer: `### Simple answer:
A \`Buffer\` is a global class in Node.js used to handle raw binary data (sequences of bytes) directly in memory outside the V8 JavaScript heap.

### Why Buffers are needed:
Originally, JavaScript had no mechanism for reading or manipulating raw binary byte streams (like TCP network streams, file systems, images, or compressed archives). Buffers allocate fixed-size raw memory chunks managed by the operating system.

### How to create Buffers:
\`\`\`javascript
// 1. From string:
const bufFromString = Buffer.from("Hello LearnCraft", "utf-8");
console.log(bufFromString); // <Buffer 48 65 6c 6c 6f ...>

// 2. Allocate fixed size with zero-fill (safe):
const bufAlloc = Buffer.alloc(10); // 10 bytes filled with zeros

// 3. Convert back to string:
console.log(bufFromString.toString("utf-8")); // "Hello LearnCraft"
console.log(bufFromString.toString("base64")); // Base64 encoding!
\`\`\`

### Security Warning:
Never use \`Buffer.allocUnsafe()\` unless you immediately overwrite all bytes, because it does not zero-fill memory and could expose sensitive data (passwords, tokens) previously residing in RAM!

### Interview answer:
Buffers handle raw binary data in Node.js outside the V8 heap, essential for reading files, TCP sockets, and crypto operations. We create them using \`Buffer.from()\` or \`Buffer.alloc()\`, and convert between encodings like UTF-8, Base64, and Hex.`,
    followUps: [
      "What is the relationship between Node.js Buffer and JavaScript's Uint8Array?",
      "Why is Buffer.allocUnsafe faster but potentially dangerous?",
      "How do you slice or concatenate multiple Buffers using Buffer.concat()?"
    ],
    keyPoints: [
      "Buffers represent fixed-length raw binary data in memory",
      "Subclass of JavaScript's Uint8Array",
      "Essential for filesystem, network streams, and encryption",
      "Use Buffer.alloc() for safe zero-filled memory"
    ],
    tags: ["buffer", "binary-data", "memory", "streams"],
    relatedLessonSlug: "/learn/nodejs/node05-streams-and-buffers",
    relatedLessonName: "NODE-05: Streams, Buffers & Backpressure Handling"
  },
  {
    id: "node-q08",
    trackKey: "nodejs",
    category: "File System & I/O",
    subtopic: "File System",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "Compare the three ways to work with the File System in Node.js: Synchronous, Callbacks, and Promises.",
    answer: `### Simple answer:
Node.js offers three styles in the \`node:fs\` module:
1. **Synchronous (\`fs.readFileSync\`):** Blocks the entire main thread until the disk read finishes.
2. **Callbacks (\`fs.readFile(file, cb)\`):** Traditional Node error-first callback style.
3. **Promises (\`fs/promises\` or \`fs.promises.readFile\`):** Modern, clean \`async/await\` style.

### Comparison:
\`\`\`javascript
// 1. Synchronous (AVOID in server request handlers!):
import fs from "node:fs";
const dataSync = fs.readFileSync("config.json", "utf-8"); // blocks event loop!

// 2. Callback style:
fs.readFile("config.json", "utf-8", (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});

// 3. Promises style (RECOMMENDED):
import fsPromises from "node:fs/promises";
try {
  const data = await fsPromises.readFile("config.json", "utf-8");
  console.log(data);
} catch (err) {
  console.error("Failed to read file:", err);
}
\`\`\`

### When is Synchronous acceptable?
Only during application startup (e.g. reading configuration before listening on a port). Never use synchronous FS calls inside web request handlers because they block all other users!

### Interview answer:
Synchronous methods (\`readFileSync\`) block the event loop and should only be used during app startup. Callback-based methods are the legacy pattern. In modern Node.js, we use \`node:fs/promises\` with \`async/await\` and \`try/catch\` for non-blocking, readable file operations.`,
    followUps: [
      "What is the difference between reading a file with fs.readFile vs createReadStream?",
      "Why is createReadStream preferred for files larger than a few megabytes?",
      "How does fs.stat() retrieve file metadata like size and creation timestamp?"
    ],
    keyPoints: [
      "node:fs/promises is the modern standard for async/await file operations",
      "Synchronous fs methods freeze the event loop and should never run during requests",
      "Error-first callback pattern is (err, data) => ...",
      "Use createReadStream for large files to avoid loading entire contents into RAM"
    ],
    tags: ["fs", "filesystem", "promises", "async-await"],
    relatedLessonSlug: "/learn/nodejs/node06-filesystem-and-io",
    relatedLessonName: "NODE-06: File System Architecture & Streaming Files"
  },
  {
    id: "node-q09",
    trackKey: "nodejs",
    category: "Error Handling & Stability",
    subtopic: "Error Handling",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What is the difference between Operational Errors and Programmer Errors in Node.js, and how should you handle `uncaughtException` and `unhandledRejection`?",
    answer: `### Simple answer:
- **Operational Errors:** Expected runtime errors that happen during normal operation (e.g. database timeout, invalid user input, file not found, network failure). These should be caught and handled gracefully with user error messages.
- **Programmer Errors:** Bugs in the code written by developers (e.g. \`TypeError: Cannot read properties of undefined\`, syntax errors, passing wrong arguments).

### Handling \`unhandledRejection\` and \`uncaughtException\`:
These are process-level event hooks for catching errors that were not caught anywhere else:

\`\`\`javascript
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Promise Rejection at:", promise, "reason:", reason);
  // Log to error monitoring (e.g. Sentry)
});

process.on("uncaughtException", (error) => {
  console.error("CRITICAL: Uncaught Exception:", error);
  // 1. Log error
  // 2. Perform emergency cleanup
  // 3. Exit process! Do NOT continue running because memory state is corrupted:
  process.exit(1);
});
\`\`\`

### Why you MUST exit on \`uncaughtException\`:
Once an uncaught exception occurs, your Node.js application is in an unpredictable state. Continuing to run risks corrupted database writes and memory leaks. The standard practice is to log, exit with code 1, and let a process supervisor (like PM2, Docker, or Kubernetes) restart a fresh process.

### Interview answer:
Operational errors are normal runtime failures (like network timeouts) handled with \`try/catch\`. Programmer errors are bugs that represent code defects. When an \`uncaughtException\` occurs, the process memory is in an unstable state, so the server should log the incident and gracefully restart via a process manager like PM2 or Kubernetes.`,
    followUps: [
      "Why is continuing to run a Node server after uncaughtException considered an anti-pattern?",
      "How do process managers like PM2 or Kubernetes handle process restarts?",
      "How do custom Error classes extending Error improve operational error identification?"
    ],
    keyPoints: [
      "Operational errors are handled at runtime (network down, invalid input)",
      "Programmer errors are bugs that should be fixed in code",
      "uncaughtException indicates corrupted state; application should exit and restart",
      "Process supervisors (PM2/K8s) automatically restart cleanly exited crashed instances"
    ],
    tags: ["error-handling", "uncaughtException", "unhandledRejection", "resilience"],
    relatedLessonSlug: "/learn/nodejs/node07-robust-error-handling",
    relatedLessonName: "NODE-07: Error Handling Best Practices & Crash Recovery"
  },
  {
    id: "node-q10",
    trackKey: "nodejs",
    category: "Paths & Modules",
    subtopic: "Path Resolution",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "What is the difference between `path.join()` and `path.resolve()` in Node.js?",
    answer: `### Simple answer:
- **\`path.join()\`**: Concatenates path segments together using the operating system's separator (\`/\` on Linux/Mac, \`\\\\\` on Windows) and normalizes the path.
- **\`path.resolve()\`**: Resolves path segments into an **absolute path**, working from right to left like a series of \`cd\` commands starting from the current working directory.

### Example:
\`\`\`javascript
import path from "node:path";

// 1. path.join (joins segments as relative or absolute):
path.join("users", "admin", "config.json");
// Windows: "users\\admin\\config.json"
// Linux/Mac: "users/admin/config.json"

// Resolves relative '..' segments:
path.join("/app", "users", "..", "logs");
// Output: "/app/logs"

// 2. path.resolve (always produces an absolute path):
path.resolve("users", "config.json");
// Output: "/var/www/my-project/users/config.json" (prepends cwd)

path.resolve("/root", "app", "logs");
// Output: "/root/app/logs" (detects leading slash as root)
\`\`\`

### Interview answer:
\`path.join()\` simply joins path segments together using the OS path separator and normalizes them. \`path.resolve()\` always returns a full absolute path by treating segments like sequential \`cd\` commands starting from the current working directory (\`process.cwd()\`).`,
    followUps: [
      "Why should you never manually concatenate paths using string concatenation (a + '/' + b)?",
      "How does path.extname() and path.basename() work?",
      "What is path.posix vs path.win32?"
    ],
    keyPoints: [
      "path.join joins and normalizes path segments for the host OS",
      "path.resolve resolves segments into an absolute path from process.cwd()",
      "Prevents cross-platform Windows vs Linux slash compatibility bugs",
      "Correctly resolves relative '.' and '..' parent segments"
    ],
    tags: ["path", "path-join", "path-resolve", "cross-platform"],
    relatedLessonSlug: "/learn/nodejs/node06-filesystem-and-io",
    relatedLessonName: "NODE-06: File System Architecture & Streaming Files"
  },
  {
    id: "node-q11",
    trackKey: "nodejs",
    category: "Internals & Libuv",
    subtopic: "Thread Pool",
    type: "internals",
    difficulty: "medium",
    source: "curated",
    question: "What is the libuv Thread Pool in Node.js, which operations use it, and how do you configure its size?",
    answer: `### Simple answer:
Although Node's JavaScript runs on a single main thread, the underlying C library **libuv** maintains a pool of background worker threads to execute synchronous OS tasks that cannot be handled by operating system asynchronous primitives.

### Operations that USE the Libuv Thread Pool:
1. **File System operations:** All asynchronous \`fs\` calls (\`fs.readFile\`, \`fs.writeFile\`).
2. **DNS Lookups:** \`dns.lookup()\` (because OS getaddrinfo is synchronous).
3. **Cryptography:** Heavy CPU crypto tasks (\`crypto.pbkdf2\`, \`crypto.scrypt\`, \`crypto.randomBytes\`).
4. **Compression:** Zlib calls (\`zlib.deflate\`, \`zlib.gzip\`).

### Operations that DO NOT use the Thread Pool:
- **Network Sockets (HTTP, TCP, UDP):** Handled directly by operating system non-blocking kernel mechanisms like **epoll** (Linux), **kqueue** (macOS), or **IOCP** (Windows).

### Default Size and Configuration:
- **Default Size:** **4 threads**.
- **How to configure:** Set the \`UV_THREADPOOL_SIZE\` environment variable before running Node:
\`\`\`bash
# Linux / macOS:
UV_THREADPOOL_SIZE=8 node server.js

# Windows PowerShell:
$env:UV_THREADPOOL_SIZE=8; node server.js
\`\`\`
*(Maximum allowed value is 128).*

### Interview answer:
The libuv thread pool executes synchronous I/O and CPU tasks like filesystem calls, DNS resolution, and crypto operations off the main thread. Network calls use OS kernel polling (epoll) and don't touch the pool. The default pool size is 4 threads, which can be increased up to 128 via the \`UV_THREADPOOL_SIZE\` environment variable.`,
    followUps: [
      "Why must UV_THREADPOOL_SIZE be set before the Node process boots?",
      "What happens if 5 crypto.pbkdf2 calls run concurrently with a thread pool size of 4?",
      "Why doesn't network I/O need the thread pool?"
    ],
    keyPoints: [
      "Default size is 4 threads, max is 128",
      "Handles fs, crypto, zlib, and dns.lookup",
      "Network sockets do NOT use thread pool (use kernel epoll/kqueue)",
      "Must be set via environment variable before the V8 runtime initializes"
    ],
    tags: ["libuv", "thread-pool", "concurrency", "performance", "internals"],
    relatedLessonSlug: "/learn/nodejs/node02-event-loop-libuv",
    relatedLessonName: "NODE-02: The Node.js Event Loop & libuv Internals"
  },
  {
    id: "node-q12",
    trackKey: "nodejs",
    category: "Memory & Performance",
    subtopic: "Heap & Memory Limits",
    type: "internals",
    difficulty: "medium",
    source: "curated",
    question: "How does V8 Memory Management work in Node.js, and how do you inspect or increase the heap memory limit?",
    answer: `### Simple answer:
V8 allocates memory into segments: the **Stack** (for primitive values and function call frames) and the **Heap** (for dynamically allocated objects and arrays).

### Default Memory Limits:
- On 64-bit systems, Node.js defaults to approximately **1.4 GB to 4 GB** of heap memory (depending on Node version and total system RAM).
- If your application exceeds this threshold, Node crashes with \`JavaScript heap out of memory\`.

### How to inspect memory at runtime:
\`\`\`javascript
const memoryUsage = process.memoryUsage();
console.log({
  rss: \`\${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB\`, // Total process memory
  heapTotal: \`\${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB\`,
  heapUsed: \`\${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB\`,
  external: \`\${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB\`, // C++ objects / Buffers
});
\`\`\`

### How to increase the heap limit:
Pass the \`--max-old-space-size\` CLI flag specifying megabytes:
\`\`\`bash
# Allow up to 8GB of heap memory:
node --max-old-space-size=8192 server.js
\`\`\`

### Generational Garbage Collection:
- **Young Generation (Scavenge):** Short-lived objects collected quickly.
- **Old Generation (Mark-Sweep-Compact):** Surviving long-lived objects collected less frequently.

### Interview answer:
V8 divides memory into the stack and the heap. When memory usage exceeds the default limit, Node crashes with a heap out of memory error. We inspect memory using \`process.memoryUsage()\` and increase the heap limit using the \`--max-old-space-size=<MB>\` flag when launching the application.`,
    followUps: [
      "What is RSS (Resident Set Size) vs Heap Used in process.memoryUsage()?",
      "Why do large Buffers show up in 'external' rather than 'heapUsed'?",
      "How do you take a heap snapshot in production using the v8 or inspector module?"
    ],
    keyPoints: [
      "V8 heap stores objects; stack stores execution frames and primitives",
      "Default heap limit is ~2GB-4GB depending on Node version",
      "Configure with --max-old-space-size=<MB>",
      "process.memoryUsage() returns rss, heapTotal, heapUsed, and external"
    ],
    tags: ["v8", "memory", "heap", "garbage-collection", "performance"],
    relatedLessonSlug: "/learn/nodejs/node07-robust-error-handling",
    relatedLessonName: "NODE-07: Error Handling Best Practices & Crash Recovery"
  },
  {
    id: "node-q13",
    trackKey: "nodejs",
    category: "Security & Vulnerabilities",
    subtopic: "Node Security",
    type: "security",
    difficulty: "medium",
    source: "curated",
    question: "What are common security vulnerabilities in Node.js applications, and how do you protect against them?",
    answer: `### Simple answer:
Node.js servers are susceptible to specific web vulnerabilities that can lead to crashes, data leaks, or remote code execution:

### 1. Prototype Pollution:
Occurs when an attacker injects properties into JavaScript's \`Object.prototype\` via unsafe recursive object merges (like vulnerable deep merge libraries).
- *Fix:* Use \`Object.create(null)\` for key-value maps, validate incoming JSON schemas with Zod, or freeze prototypes with \`Object.freeze(Object.prototype)\`.

### 2. Command Injection:
Happens when user input is passed directly to \`child_process.exec()\`, allowing attackers to run arbitrary shell commands with \`; rm -rf /\`.
- *Fix:* Never use \`exec()\`; always use \`child_process.execFile()\` or \`spawn()\` with separated argument arrays.

### 3. Regular Expression Denial of Service (ReDoS):
Catastrophic backtracking in poorly written regular expressions causes the single thread to peg at 100% CPU for seconds or minutes.
- *Fix:* Avoid nested quantifiers like \`(a+)+$\`; use safe regex validation tools or timeouts.

### 4. Dependency Vulnerabilities:
Outdated packages with known vulnerabilities.
- *Fix:* Run \`npm audit\`, integrate automated scanning (Snyk / Dependabot), and lock versions in \`package-lock.json\`.

### Interview answer:
Key Node.js security risks include Prototype Pollution (prevented by schema validation and prototype freezing), Command Injection (avoiding shell execution in favor of \`execFile\`), and ReDoS (avoiding catastrophic backtracking regexes). Using security headers like Helmet and automated scanning like npm audit keeps servers secure.`,
    followUps: [
      "Why is child_process.spawn safer than child_process.exec?",
      "What is catastrophic backtracking in regular expressions?",
      "How does helmet middleware protect HTTP response headers?"
    ],
    keyPoints: [
      "Prototype pollution mutates Object.prototype; use schema validation",
      "Avoid child_process.exec with unsanitized user inputs",
      "ReDoS freezes the single thread; avoid nested regex quantifiers",
      "Run npm audit regularly and enforce dependency lockfiles"
    ],
    tags: ["security", "prototype-pollution", "command-injection", "redos", "best-practices"],
    relatedLessonSlug: "/learn/nodejs/node07-robust-error-handling",
    relatedLessonName: "NODE-07: Error Handling Best Practices & Crash Recovery"
  },
  {
    id: "node-q14",
    trackKey: "nodejs",
    category: "Process & Operations",
    subtopic: "Graceful Shutdown",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How do you implement a Graceful Shutdown in a Node.js HTTP server when receiving `SIGTERM` or `SIGINT`?",
    answer: `### Simple answer:
A Graceful Shutdown ensures that when a server receives a termination signal (from Docker, Kubernetes, or Ctrl+C), it finishes processing all currently active user requests and closes database connections cleanly before exiting.

### Why it's critical:
If you terminate abruptly (\`process.exit(0)\` immediately), active transactions are cut off mid-flight, database connection pools are orphaned, and users see sudden 502 Bad Gateway errors.

### Implementation Pattern:
\`\`\`javascript
import http from "node:http";

const server = http.createServer((req, res) => {
  res.end("Hello World");
});
server.listen(3000);

function shutdown(signal) {
  console.log(\`Received \${signal}. Starting graceful shutdown...\`);

  // 1. Stop accepting new incoming HTTP connections:
  server.close(async () => {
    console.log("Closed all active HTTP connections.");

    try {
      // 2. Disconnect database pools cleanly:
      await db.$disconnect();
      console.log("Database disconnected successfully.");
      process.exit(0);
    } catch (err) {
      console.error("Error during database disconnect:", err);
      process.exit(1);
    }
  });

  // 3. Force exit after timeout if connections refuse to close:
  setTimeout(() => {
    console.error("Forced termination: shutdown timed out after 10s");
    process.exit(1);
  }, 10000).unref(); // unref prevents this timer from keeping process alive
}

process.on("SIGTERM", () => shutdown("SIGTERM")); // sent by Kubernetes / Docker
process.on("SIGINT", () => shutdown("SIGINT"));   // sent by Ctrl+C in terminal
\`\`\`

### Interview answer:
Graceful shutdown listens for \`SIGTERM\` and \`SIGINT\` signals. It calls \`server.close()\` to stop accepting new connections while letting ongoing requests finish, disconnects database pools cleanly, and sets a fallback timeout to force exit if closing hangs.`,
    followUps: [
      "What is the unref() method on timers and why is it used in shutdown handlers?",
      "How does Kubernetes handle graceful termination periods (terminationGracePeriodSeconds)?",
      "What is the difference between SIGTERM and SIGKILL?"
    ],
    keyPoints: [
      "SIGTERM is sent by container managers before pod termination",
      "server.close() stops accepting new requests while finishing inflight ones",
      "Closes database connections and background workers cleanly",
      "Use fallback timeout with .unref() to prevent hanging forever"
    ],
    tags: ["graceful-shutdown", "sigterm", "sigint", "docker", "production"],
    relatedLessonSlug: "/learn/nodejs/node07-robust-error-handling",
    relatedLessonName: "NODE-07: Error Handling Best Practices & Crash Recovery"
  },
  {
    id: "node-q15",
    trackKey: "nodejs",
    category: "HTTP & Networking",
    subtopic: "Native HTTP Server",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "How do you create an HTTP server using Node's native `node:http` module, and why do developers usually use Express instead?",
    answer: `### Simple answer:
Node.js includes a built-in \`node:http\` module that can create lightweight HTTP web servers without installing any third-party npm packages.

### Native HTTP Server Example:
\`\`\`javascript
import http from "node:http";

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "healthy" }));
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

server.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
\`\`\`

### Why developers prefer Express / Fastify:
1. **Routing:** Native \`http\` requires giant nested \`if/else\` or \`switch\` statements on \`req.url\` and \`req.method\`. Frameworks offer clean declarations like \`app.get('/users/:id')\`.
2. **Middleware Pipeline:** Frameworks provide unified middleware chains (\`cors\`, authentication, logging, body parsing).
3. **Request Body Parsing:** In native HTTP, you must manually assemble raw byte stream chunks:
\`\`\`javascript
let body = "";
req.on("data", chunk => body += chunk);
req.on("end", () => console.log(JSON.parse(body)));
\`\`\`
Frameworks handle body parsing with a single line: \`app.use(express.json())\`.

### Interview answer:
Node's native \`node:http\` module creates web servers using \`createServer((req, res) => ...)\`. While it is lightweight, developers use frameworks like Express or Fastify because they provide convenient routing, parameter extraction, automatic JSON body parsing, and modular middleware pipelines.`,
    followUps: [
      "How does req.on('data') and req.on('end') process incoming HTTP request streams?",
      "Why is Fastify often faster than Express in benchmarks?",
      "What is the difference between res.write() and res.end() in native http?"
    ],
    keyPoints: [
      "Native http.createServer requires no external dependencies",
      "Request is a Readable stream; Response is a Writable stream",
      "Express/Fastify provide routing, middleware, and request body parsing",
      "Native HTTP forms the foundation of all Node web frameworks"
    ],
    tags: ["http", "native-http", "networking", "express", "servers"],
    relatedLessonSlug: "/learn/nodejs/node06-filesystem-and-io",
    relatedLessonName: "NODE-06: File System Architecture & Streaming Files"
  }
];
