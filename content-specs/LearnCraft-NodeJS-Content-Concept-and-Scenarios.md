# LearnCraft: Node.js Curriculum

## What this course is for

The goal is to understand the main ideas behind Node.js so you can read code, understand AI-generated backend code, debug problems, and build applications with AI's help. You do not need to memorize every Node.js API.

Lessons are marked **Easy**, **Moderate**, or **Difficult**. Easy lessons are short. Difficult lessons explain the idea step by step. Each lesson includes a practical example and a scenario question with a simple model answer. Interview questions appear only where they add value.

Examples use modern Node.js and ES modules (`import`/`export`). If your project uses CommonJS (`require`/`module.exports`), follow its existing module setup rather than mixing both styles in the same file. Run examples in a Node.js version supported by your project.

---

# Part 1: Understand Node.js and Start a Project

## Lesson 1: What Is Node.js?
**Difficulty: Easy**

Node.js lets you run JavaScript outside a web browser. Developers often use it to build backend services, command-line tools, and scripts.

A browser can use JavaScript to respond to clicks on a page. Node.js can use JavaScript to read files, communicate over a network, and run a server.

```js
// hello.js
console.log("Hello from Node.js!");
```

Run it in your terminal:

```bash
node hello.js
```

**Step by step**
1. `node hello.js` asks Node.js to run the file.
2. Node.js reads and runs the JavaScript.
3. `console.log()` prints the message in the terminal.

**When is it useful?** Use Node.js when JavaScript needs to run on the server or as a local tool.

**Scenario question:** You want to run a script that reads a file from your computer. Do you need a browser?

**Simple answer:** No. Node.js can run JavaScript directly on your computer and provides APIs for working with files.

## Lesson 2: Start and Run a Node.js Project
**Difficulty: Easy**

A Node.js project usually has a folder for its code and a `package.json` file that describes the project and its commands.

Create a folder, open a terminal in it, and run:

```bash
npm init -y
```

Create `app.js`:

```js
console.log("My Node.js app is running");
```

Run:

```bash
node app.js
```

**Step by step**
1. `npm init -y` creates a basic `package.json` file.
2. `app.js` contains the code to run.
3. `node app.js` starts that file.

In the following lessons, examples use ES modules. For a project that uses ES modules in `.js` files, configure its `package.json` with `"type": "module"`. Alternatively, use `.mjs` files. Do not change a project's module type without checking its current setup.

**Scenario question:** You type `node app.js`, but Node says it cannot find the file. What should you check first?

**Simple answer:** Check that the file exists, that its name is spelled correctly, and that the terminal is in the correct folder.

## Lesson 3: What Are npm and Packages?
**Difficulty: Easy**

`npm` is a tool commonly used to install JavaScript packages and run project scripts. A package is reusable code that someone has published or that your project defines.

For example, after installing a package, your code can import it. Do not install packages just because they exist; use one when it solves a real need.

```bash
npm install dayjs
```

A package can then be imported in an ES module:

```js
import dayjs from "dayjs";

console.log(dayjs().format("YYYY-MM-DD"));
```

**Step by step**
1. `npm install dayjs` downloads the package and records it as a project dependency.
2. `import dayjs from "dayjs"` makes the package available in this file.
3. `format()` returns the date in the requested format.

`package.json` lists project information and dependencies. `package-lock.json` records the dependency versions selected for the install, helping the team install a consistent dependency tree.

**Scenario question:** Your teammate shares a project that has `package.json` and `package-lock.json`. How do you install its packages?

**Simple answer:** Run `npm install` in the project folder. Do not delete the lockfile just to make installation easier.

## Lesson 4: Import and Export Code Between Files
**Difficulty: Moderate**

Modules let you split code into files and reuse functions or values. In modern Node.js, you can use ES module `export` and `import` syntax when the project is configured for it.

In `math.js`:

```js
export function add(a, b) {
  return a + b;
}
```

In `app.js`:

```js
import { add } from "./math.js";

console.log(add(2, 3)); // 5
```

**Step by step**
1. `export` makes `add` available outside `math.js`.
2. `import` brings `add` into `app.js`.
3. `add(2, 3)` runs the function and returns `5`.

The `./` means “from a file near this file.” Include the file extension in relative ES module imports when required by the Node.js module setup.

Node.js also supports CommonJS (`require` and `module.exports`). Recognize both styles, but avoid mixing them without understanding the project's configuration.

**Scenario question:** A function is written in `helpers.js`, but another file cannot use it. What should you check?

**Simple answer:** Check that the function is exported, imported from the correct path, and that both files use a compatible module system.

**Interview question:** What is the purpose of modules?

**Simple answer:** Modules split code into reusable files and make a project easier to organize and maintain.

---

# Part 2: Work with Files and Settings

## Lesson 5: Read Environment Variables Safely
**Difficulty: Moderate**

Environment variables let you give a program settings from outside its source code. They are often used for values that change between local development and production.

```js
const port = process.env.PORT || 3000;

console.log(`The app will use port ${port}`);
```

**Step by step**
1. `process.env` contains environment variables available to the running process.
2. `process.env.PORT` reads the `PORT` setting, if one is supplied.
3. `|| 3000` uses `3000` when the value is missing or empty.

Environment variable values are usually strings. Check and convert a value when you need a number. Keep passwords and API keys out of source code and version control. A `.env` file is only safe if it is kept out of Git and loaded using a tool or runtime feature configured for the project.

**Scenario question:** Your app works locally but fails because `process.env.API_KEY` is missing. What should you check?

**Simple answer:** Check whether the variable is set in the environment where the app is running and whether the project loads its environment settings correctly. Never fix this by committing the real secret to Git.

## Lesson 6: Read and Write Files
**Difficulty: Moderate**

Node.js provides the `node:fs` module for file work. Prefer its promise-based API for common asynchronous file operations.

```js
import { readFile, writeFile } from "node:fs/promises";

const text = await readFile("./notes.txt", "utf8");
console.log(text);

await writeFile("./copy.txt", text);
```

**Step by step**
1. `readFile()` reads `notes.txt`.
2. The `"utf8"` option asks for text instead of a raw Buffer.
3. `await` waits for the read to finish before using `text`.
4. `writeFile()` writes the text to `copy.txt`.

This example uses top-level `await`, which works in an ES module. In other setups, put these statements inside an `async` function. The files must exist or be writable as required; file operations can fail, so real applications should handle errors.

**Scenario question:** A user uploads a file, and reading it fails. What should the app do?

**Simple answer:** Catch the error, log useful details for developers, and show a safe message to the user instead of crashing unexpectedly.

## Lesson 7: Why the `path` Module Matters
**Difficulty: Easy**

File paths look different on different operating systems. The `node:path` module helps you build paths in a way that works with the current operating system.

```js
import path from "node:path";

const filePath = path.join("uploads", "photo.png");
console.log(filePath);
```

**Step by step**
1. `path.join()` joins the path pieces.
2. Node.js uses the correct path separators for the operating system.
3. `filePath` contains the resulting path.

Joining paths does not prove that a path is safe. When handling user input, validate it and make sure it cannot escape the directory you intend to use.

**Scenario question:** Your application builds a file path by joining strings with `"/"`. Why might `path.join()` be better?

**Simple answer:** `path.join()` handles platform-specific separators more reliably. You still need to validate untrusted file names.

---

# Part 3: Understand Asynchronous JavaScript in Node.js

## Lesson 8: Synchronous vs. Asynchronous Work
**Difficulty: Moderate**

Synchronous work finishes before the next statement runs. Asynchronous work lets Node.js continue other work while it waits for something such as a file or network response.

```js
import { readFile } from "node:fs/promises";

console.log("1. Start");

const text = await readFile("./notes.txt", "utf8");
console.log("2. File loaded");

console.log("3. Finish");
```

**Step by step**
1. The first message prints.
2. Node.js starts reading the file. `await` pauses this async function until the read finishes; it does not block the whole Node.js process in the way a synchronous read would.
3. After the file is read, the second message prints.
4. The third message prints last in this example.

The exact time the file takes depends on the system. Avoid synchronous file operations in request handling when they could pause other work.

**Scenario question:** A server reads a large file synchronously for every request. What could happen?

**Simple answer:** Each synchronous read can block the JavaScript thread, delaying other requests. An asynchronous file API is usually a better choice for this work.

## Lesson 9: Use `async` and `await`
**Difficulty: Moderate**

An `async` function returns a Promise. `await` lets you write asynchronous code in a style that is easier to read step by step.

```js
async function getMessage() {
  return "Hello";
}

const message = await getMessage();
console.log(message); // Hello
```

**Step by step**
1. `async` makes `getMessage()` return a Promise.
2. The Promise fulfills with the value `"Hello"`.
3. `await` gets that value after the Promise fulfills.
4. The message is printed.

If the Promise rejects, `await` throws an error. Use `try...catch` when your code needs to handle that failure.

**Scenario question:** A function uses `await` but the result is never used. What should you check?

**Simple answer:** Check whether the awaited call returns the value you expect, whether you assigned it to a variable, and whether errors are being handled.

## Lesson 10: Understand the Event Loop
**Difficulty: Difficult**

Node.js can wait for I/O, such as file reads and network responses, without stopping JavaScript from doing all other work. The event loop helps Node.js run callbacks when asynchronous work is ready. You do not need to memorize every event-loop phase at first.

```js
console.log("First");

setTimeout(() => {
  console.log("Timer callback");
}, 0);

console.log("Second");
```

Expected output:

```text
First
Second
Timer callback
```

**Step by step**
1. Node.js runs the current JavaScript statement and prints `First`.
2. `setTimeout()` schedules a callback. A delay of `0` does not mean the callback runs immediately.
3. Node.js continues the current code and prints `Second`.
4. When the timer callback becomes eligible and the event loop can run it, `Timer callback` prints.

The event loop does not make CPU-heavy JavaScript disappear. A long calculation on the main JavaScript thread can still delay other callbacks. For now, focus on the difference between waiting for I/O and doing long CPU work.

**Scenario question:** One request runs a very long loop, and other requests become slow. Why?

**Simple answer:** The loop keeps the JavaScript thread busy, so the event loop cannot handle other callbacks until the loop finishes. The work may need to be optimized or moved to a worker thread or separate process.

**Interview question:** What does the Node.js event loop do?

**Simple answer:** It helps Node.js run callbacks for timers and completed asynchronous operations, so the process can handle I/O without waiting idly for every operation to finish.

## Lesson 11: Handle Errors with `try...catch`
**Difficulty: Moderate**

Errors can happen when a file is missing, a network request fails, or code receives unexpected data. `try...catch` lets you handle errors instead of allowing them to go unhandled.

```js
import { readFile } from "node:fs/promises";

try {
  const text = await readFile("./missing.txt", "utf8");
  console.log(text);
} catch (error) {
  console.error("Could not read the file.");
}
```

**Step by step**
1. The code inside `try` attempts to read the file.
2. If the operation succeeds, the text is printed.
3. If it fails, execution moves to `catch`.
4. The app can show a safe message or take another action.

In real applications, log enough detail to investigate the problem, but do not expose file paths, secrets, or stack traces to ordinary users. Do not silently catch an error and pretend the operation succeeded.

**Scenario question:** An API request fails. Should the app return fake success data?

**Simple answer:** No. It should handle the failure honestly, log useful diagnostic information, and return an appropriate error response or fallback if one is safe.

---

# Part 4: Handle Events and Data

## Lesson 12: Events and `EventEmitter`
**Difficulty: Moderate**

An event is a signal that something happened. Node.js uses events in many places. `EventEmitter` lets your own code send and listen for events.

```js
import { EventEmitter } from "node:events";

const bus = new EventEmitter();

bus.on("orderCreated", (orderId) => {
  console.log(`Order ${orderId} created`);
});

bus.emit("orderCreated", 42);
```

**Step by step**
1. `new EventEmitter()` creates an event emitter.
2. `.on()` registers a listener for the `orderCreated` event.
3. `.emit()` sends that event with the value `42`.
4. The listener runs and prints `Order 42 created`.

This is useful when one part of a program needs to notify another part about an event. Do not use events when a simple function call would be clearer. Event listeners run in the same process; this alone is not a durable job queue.

**Scenario question:** After an order is created, another part of the app should write a log entry. How could an event help?

**Simple answer:** The order code can emit an event, and a listener can respond by writing the log. For reliable work that must survive a crash, a stronger queue or storage system may be needed.

## Lesson 13: Buffers and Streams
**Difficulty: Difficult**

A Buffer stores bytes. A stream lets Node.js process data piece by piece instead of requiring the whole thing in memory at once. You will encounter both when working with files, uploads, downloads, and network data.

Create a Buffer:

```js
const data = Buffer.from("Hello", "utf8");
console.log(data.length); // 5 bytes for these ASCII letters
```

Read a large file using a stream:

```js
import { createReadStream } from "node:fs";

const stream = createReadStream("./large-file.txt", {
  encoding: "utf8",
});

stream.on("data", (chunk) => {
  console.log("Received a piece of the file");
});

stream.on("error", (error) => {
  console.error("File reading failed", error.message);
});
```

**Step by step**
1. `createReadStream()` opens a stream for the file.
2. Node.js supplies pieces of data called chunks.
3. The `data` listener runs as chunks arrive.
4. The `error` listener handles a stream error.

A stream can reduce memory use for large files, but it needs correct error handling. When sending data from one stream to another, helpers such as `pipeline()` are usually safer than manually wiring every event because they handle important completion and error cases.

**Scenario question:** Your app needs to send a very large file. Why might a stream be better than reading the entire file first?

**Simple answer:** A stream processes the file in smaller pieces, so the app does not need to keep the whole file in memory at once.

---

# Part 5: Build Basic Server Features

## Lesson 14: Understand HTTP Requests and Responses
**Difficulty: Moderate**

HTTP is the common way that clients and servers exchange web requests and responses. A request asks for something or sends data. A response returns a status code, headers, and sometimes a body.

Common status codes include `200` (success), `201` (created), `400` (bad request), `401` (not authenticated), `403` (not allowed), `404` (not found), and `500` (server error).

```js
import { createServer } from "node:http";

const server = createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8",
  });
  response.end("Hello from the server");
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
```

**Step by step**
1. `createServer()` creates an HTTP server.
2. The callback runs when a request reaches the server.
3. `writeHead()` sends the status code and content type.
4. `end()` sends the response body and finishes the response.
5. `listen()` starts listening on port `3000`.

This is a small example using Node's built-in HTTP module. Frameworks such as Express and NestJS provide higher-level ways to organize server routes. Those frameworks should have their own lessons.

**Scenario question:** A browser sends a request, but the server never finishes its response. What can happen?

**Simple answer:** The browser may keep waiting. Make sure each request path eventually sends or ends a response, including error paths.

## Lesson 15: Make an HTTP Request with `fetch`
**Difficulty: Moderate**

Node.js provides `fetch()` in modern versions. It lets your server request data from another service without needing a separate HTTP client package for basic requests.

```js
const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}

const post = await response.json();
console.log(post.title);
```

**Step by step**
1. `fetch()` sends the request and returns a Promise for the response.
2. `response.ok` checks whether the HTTP status is in the successful range. `fetch()` does not automatically throw just because the server returns `404` or `500`.
3. `response.json()` reads and parses the response body.
4. The code prints the post's title.

In production code, also handle network errors and invalid response data. External services can be slow, unavailable, or return data that differs from what you expected.

**Scenario question:** Your `fetch()` call returns a `404`, but your `catch` block does not run. Why might that happen?

**Simple answer:** `fetch()` normally resolves for HTTP error statuses such as `404`. Check `response.ok` or `response.status` and handle unsuccessful responses yourself.

---

# Part 6: Protect and Maintain the Application

## Lesson 16: Validate Input and Avoid Trusting Users
**Difficulty: Moderate**

Data received from a user, a request, or an outside service should not be trusted automatically. Validation checks whether the data has the shape and values your app expects.

```js
function validateAge(value) {
  const age = Number(value);

  if (!Number.isInteger(age) || age < 0 || age > 120) {
    return { valid: false, message: "Enter a valid age." };
  }

  return { valid: true, age };
}

console.log(validateAge("25"));
console.log(validateAge("hello"));
```

**Step by step**
1. `Number(value)` tries to turn the input into a number.
2. `Number.isInteger()` checks that it is a whole number.
3. The range check rejects negative ages and values over `120`.
4. The function returns a clear result describing whether the input is valid.

This example validates one field. Real requests need validation for all required fields and must still use appropriate security controls for the action. Validation is not a replacement for authorization or safe database queries.

**Scenario question:** A client sends `"admin": true` in a request. Should the server trust it?

**Simple answer:** No. The server must check the logged-in user's identity and permissions itself. A client can change the data it sends.

## Lesson 17: Use `process` and Exit Codes
**Difficulty: Easy**

The global `process` object provides information about the running Node.js program. For example, `process.exitCode` can indicate whether a command completed successfully.

```js
const taskSucceeded = false;

if (!taskSucceeded) {
  console.error("The task failed");
  process.exitCode = 1;
}
```

An exit code of `0` usually means success. A non-zero code usually signals a failure to the shell or another program. Setting `process.exitCode` lets Node.js finish its normal cleanup instead of forcing an immediate exit.

**Scenario question:** A script fails, but another tool still treats it as successful. What should you check?

**Simple answer:** Check whether the script sets a non-zero exit code when it fails and whether the error is being handled correctly.

## Lesson 18: Debug Node.js Code
**Difficulty: Moderate**

Debugging means finding why code behaves incorrectly and fixing the real cause instead of hiding the error.

```js
function totalPrice(price, quantity) {
  return price + quantity; // Bug: should multiply
}

console.log(totalPrice(100, 3)); // 103, not 300
```

**Step by step**
1. Work out what the function should do: multiply price by quantity.
2. Check the actual line: it uses `+`, which adds the values.
3. Replace `+` with `*`.
4. Run the example again and confirm the result is `300`.

Useful tools include `console.log()`, the Node.js debugger (`node --inspect`), browser-based DevTools when applicable, and clear error messages. Start with the smallest example that shows the problem.

**Scenario question:** An AI-suggested fix removes an error, but the result is still wrong. What should you do?

**Simple answer:** Check the requirement, reproduce the problem, inspect the changed code, and test the actual output. An error disappearing does not prove the solution is correct.

## Lesson 19: Write Basic Tests
**Difficulty: Moderate**

A test checks that code behaves as expected. Node.js includes a built-in test runner, so basic tests do not require an additional testing package.

Create `math.js`:

```js
export function add(a, b) {
  return a + b;
}
```

Create `math.test.js`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { add } from "./math.js";

test("add returns the sum", () => {
  assert.equal(add(2, 3), 5);
});
```

Run the test with:

```bash
node --test
```

**Step by step**
1. `test()` defines a test case.
2. `add(2, 3)` calls the function.
3. `assert.equal()` checks that the result is `5`.
4. The test runner reports whether the test passed.

Tests help protect code when you change it. Start with important behavior and likely mistakes; you do not need to write a test for every trivial line.

**Scenario question:** You change a function and worry that you may have broken another feature. What can help?

**Simple answer:** Run tests that cover the function and the related behavior. Add a test for the bug if the problem could happen again.

**Interview question:** Why are tests useful?

**Simple answer:** Tests check expected behavior and help developers catch regressions when they change code.

## Lesson 20: Keep a Node.js Application Responsive
**Difficulty: Moderate**

A Node.js server can handle many I/O operations efficiently, but long CPU-heavy work can block its main JavaScript thread. Keep request handlers focused and avoid doing unnecessary work for every request.

```js
// Prefer asynchronous file operations in a request handler.
import { readFile } from "node:fs/promises";

async function readMessage() {
  return readFile("./message.txt", "utf8");
}
```

**What to remember**
1. Prefer async I/O for operations such as reading files or making network requests in normal server flows.
2. Avoid repeating expensive work if a safe, correct reuse strategy is available.
3. Measure before optimizing. A slow database query, large response, or CPU-heavy function can each cause different problems.
4. For CPU-heavy work, consider whether it belongs in a worker thread or separate process, but learn those APIs only when you need them.

Do not assume that adding `async` makes CPU-heavy work non-blocking. An `async` function can still run a long synchronous loop that blocks the event loop.

**Scenario question:** Your API becomes slow when it processes a large calculation. Will changing the function to `async` automatically fix the problem?

**Simple answer:** No. The calculation still blocks the JavaScript thread if it runs synchronously. Measure the issue, improve the algorithm, or move suitable CPU-heavy work to a worker thread or another process.

---

# Final Review: What You Should Understand

After this course, you should be able to explain:

- What Node.js is and why a backend may use it.
- How to run a Node.js file and manage packages.
- How modules share code.
- How to read environment variables safely.
- How to work with files and file paths.
- Why async operations are useful and what the event loop does at a high level.
- How to handle errors and listen for events.
- What HTTP requests and responses do.
- How to call an API and handle HTTP failures.
- Why validating untrusted input matters.
- How to debug, test, and keep a Node.js app responsive.

You do not need to memorize every Node.js API. Focus on understanding the core ideas, recognizing them in code, and checking AI-generated implementations.

## Scope note

This curriculum focuses on Node.js itself. Express, NestJS, databases, ORMs, Docker, deployment, and advanced worker/process management belong in their own tracks or later lessons. Add them here only if the course goals explicitly change.
