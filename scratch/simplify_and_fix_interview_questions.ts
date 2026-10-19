import fs from "fs";
import { JAVASCRIPT_QUESTIONS } from "../lib/interview-questions/javascript-questions";
import { getAllLessons } from "../app/learn/javascript/data/javascript-curriculum";

const lessons = getAllLessons();

// Deep clone questions
const questions = JSON.parse(JSON.stringify(JAVASCRIPT_QUESTIONS));

// Map proper lessons
const lessonMap = new Map<string, any>();
lessons.forEach(l => {
  lessonMap.set(l.code, l);
});

// Specific lesson mappings for questions that had wrong slugs:
const correctLessonCodes: Record<string, string> = {
  "js-q01": "JS-23", // Event loop
  "js-q02": "JS-08", // Closures & var in loop
  "js-q03": "JS-18", // Prototypes
  "js-q04": "JS-21", // Promises
  "js-q05": "JS-30", // Memory leaks & DevTools
  "js-q06": "JS-02", // Primitives vs References
  "js-q07": "JS-03", // == vs === & Coercion
  "js-q08": "JS-02", // null vs undefined
  "js-q09": "JS-06", // Arrow functions vs Regular
  "js-q10": "JS-06", // Hoisting
  "js-q11": "JS-11", // map, filter, reduce
  "js-q12": "JS-17", // call, apply, bind
  "js-q13": "JS-13", // Shallow vs Deep copy
  "js-q14": "JS-20", // Debounce & Throttle
  "js-q15": "JS-29", // Event bubbling & delegation
  "js-q16": "JS-07", // Scope & Scope Chain
  "js-q17": "JS-22", // Async/await under the hood
  "js-q18": "JS-09", // Currying
  "js-q19": "JS-12", // Object.freeze vs Object.seal
  "js-q20": "JS-20", // Web Workers
  "js-q21": "JS-02", // 7 Primitives & typeof null
  "js-q22": "JS-03", // NaN & Number.isNaN
  "js-q23": "JS-06", // Arrow vs Function declarations
  "js-q24": "JS-11", // map vs forEach vs reduce
  "js-q25": "JS-14", // Destructuring
  "js-q26": "JS-16", // Optional chaining & Nullish coalescing
  "js-q27": "JS-24", // try/catch/finally
  "js-q28": "JS-22", // Async/await error handling
  "js-q29": "JS-28", // DOM querySelectorAll vs getElementsByClassName
  "js-q30": "JS-30", // localStorage vs sessionStorage vs Cookies
};

for (const q of questions) {
  const targetCode = correctLessonCodes[q.id];
  if (targetCode && lessonMap.has(targetCode)) {
    const l = lessonMap.get(targetCode);
    q.relatedLessonSlug = l.path;
    q.relatedLessonName = `${l.code}: ${l.name}`;
  }

  // Update categories and tags where needed
  if (q.category === "Event Loop & Concurrency") {
    q.category = "Event Loop & Async";
  }
  if (q.category === "Objects & Immutability") {
    q.category = "Objects & Data Safety";
  }
  if (q.category === "Browser APIs & Concurrency") {
    q.category = "Browser APIs & Background Tasks";
  }
  if (q.subtopic === "Type Coercion") {
    q.subtopic = "Type Conversion & Equality";
  }

  // Question-specific simplifications
  if (q.id === "js-q01") {
    q.answer = `### Simple answer:
The Event Loop constantly checks if the call stack is empty. When the call stack is empty, it grabs waiting tasks from queues (first microtasks like Promises, then macrotasks like timers) and runs them one by one.

### How it works:
1. **Call Stack:** JavaScript runs normal, synchronous code one line at a time from top to bottom.
2. **Microtask Queue (VIP Fast Track):** As soon as the call stack is empty, the event loop runs **all** waiting microtasks before touching anything else.
   - Examples: \`Promise.then / catch / finally\`, \`queueMicrotask()\`.
3. **Macrotask Queue (General Tasks):** The event loop takes **one** task from this queue, places it on the call stack, and runs it.
   - Examples: \`setTimeout\`, \`setInterval\`, user clicks, and network events.
4. After that macrotask finishes, the event loop drains any new microtasks that were scheduled before taking the next macrotask.

### Interview answer:
JavaScript is single-threaded and executes synchronous code on the call stack. When background tasks complete, microtasks (like Promises) always run first as soon as the stack clears, followed by macrotasks (like \`setTimeout\`). This keeps web pages responsive without freezing the browser screen.`;
  }

  if (q.id === "js-q02") {
    q.answer = `### Simple answer:
It logs \`3\`, \`3\`, \`3\` because \`var\` shares a single variable for the entire loop, and the timers run after the loop has already finished counting to 3.

### How it works:
1. \`var\` does not care about curly braces (it is function-scoped). There is only one variable \`i\` shared across all iterations.
2. The loop runs immediately from start to finish, counting \`i\` up to \`3\`.
3. When the timers finally run ~100ms later, they all look at that same variable \`i\`, which is now \`3\`.

### Fix 1: Use \`let\` (Recommended)
\`let\` lives inside curly braces and creates a brand-new variable for every step of the loop:
\`\`\`javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Outputs: 0, 1, 2
\`\`\`

### Fix 2: Wrap in a function (Closure)
You can pass \`i\` into a helper function that remembers the value for that specific step:
\`\`\`javascript
for (var i = 0; i < 3; i++) {
  ((stepNumber) => {
    setTimeout(() => console.log(stepNumber), 100);
  })(i);
}
\`\`\`

### Interview answer:
Because \`var\` is function-scoped, all timer callbacks share the exact same variable after the loop finishes counting to 3. Replacing \`var\` with \`let\` solves the problem because \`let\` has block scope, creating a fresh variable for each iteration of the loop.`;
  }

  if (q.id === "js-q03") {
    q.answer = `### Simple answer:
In JavaScript, objects can borrow properties and methods directly from other objects through a chain called the prototype chain.

### How it works:
1. When you ask for a property or method on an object (like \`user.greet()\`), JavaScript first looks on the object itself.
2. If it cannot find it, it looks up at the object's prototype.
3. It keeps searching up the chain until it finds the property or reaches the top (\`null\`).
4. **\`prototype\` vs \`__proto__\`:**
   - \`ConstructorFunction.prototype\` is the shared blueprint attached to functions.
   - \`instance.__proto__\` is the internal link that points to that shared blueprint.

### Code Example:
\`\`\`javascript
function Person(name) {
  this.name = name;
}

// Attach a shared method once:
Person.prototype.sayHello = function() {
  return \`Hello, I am \${this.name}\`;
};

const alice = new Person("Alice");
console.log(alice.sayHello()); // "Hello, I am Alice"
console.log(alice.hasOwnProperty("sayHello")); // false (borrowed from prototype!)
\`\`\`

### Interview answer:
JavaScript objects inherit features directly from other objects through the prototype chain. If an object does not have a property, JavaScript searches up the chain to find it on its prototype. Modern ES6 classes use this exact same prototype system under the hood.`;
  }

  if (q.id === "js-q06") {
    q.answer = `### Simple answer:
Primitive types store their actual value directly in memory and cannot be changed in place. Reference types (like objects and lists) store a memory address that points to where the data lives.

### How it works:
1. **Primitives (7 types):** \`string\`, \`number\`, \`boolean\`, \`null\`, \`undefined\`, \`symbol\`, and \`bigint\`.
   - Copying a primitive makes a completely separate, independent copy of the value.
2. **References:** Objects, Arrays, and Functions.
   - Copying a reference variable only copies the memory address. Both variables now point to the exact same object in memory!

### Code Example:
\`\`\`javascript
// Primitives: independent copies
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (unchanged!)

// References: shared memory
const original = { name: "Maya" };
const copy = original;
copy.name = "Alex";
console.log(original.name); // "Alex" (changed because both share the same object!)
\`\`\`

### Interview answer:
Primitives are copied by value, meaning changing one variable never affects another. Objects and arrays are copied by reference, meaning two variables point to the same memory location, so changing properties through one variable updates the object for both.`;
  }

  if (q.id === "js-q07") {
    q.answer = `### Simple answer:
\`==\` (double equals) compares values after converting them to the same type, while \`===\` (triple equals) checks both the value and the type without guessing or changing types behind your back.

### How it works:
- **Type conversion (coercion):** JavaScript automatically converts one data type to another during operations.
  - \`5 == "5"\` is \`true\` because the text \`"5"\` is converted to the number \`5\`.
  - \`0 == false\` is \`true\` because \`false\` is converted to \`0\`.
- **Strict equality (\`===\`):**
  - \`5 === "5"\` is \`false\` because number does not match string.
  - \`0 === false\` is \`false\` because number does not match boolean.

### Interview answer:
Always use \`===\` because it checks both the value and the type, preventing surprising conversion bugs. The only common exception is checking \`x == null\`, which is a neat shortcut to check for both \`null\` and \`undefined\` at the same time.`;
  }

  if (q.id === "js-q09") {
    q.answer = `### Simple answer:
Arrow functions (\`() => {}\`) provide a shorter way to write functions and automatically borrow \`this\` from the surrounding code where they were written. Regular functions determine \`this\` based on who called them.

### Key Differences:
1. **\`this\` Keyword:**
   - Regular functions get their \`this\` from who calls them at runtime (left of the dot).
   - Arrow functions borrow \`this\` directly from the surrounding code where the arrow function was created.
2. **Constructors:** Regular functions can be called with \`new\` to create objects; arrow functions cannot.
3. **Arguments:** Regular functions have a built-in \`arguments\` object; arrow functions use modern Rest parameters (\`...args\`).

### Interview answer:
The main difference is how \`this\` works. Arrow functions do not have their own \`this\`; they borrow it from the code around them, which makes them ideal for callbacks and timers. Regular functions are best when you need dynamic \`this\` for object methods.`;
  }

  if (q.id === "js-q10") {
    q.answer = `### Simple answer:
Hoisting is JavaScript's behavior of reading variable and function declarations before running any code. It allows you to call functions before the lines where they are defined.

### How it works:
1. **Function Declarations:** Fully hoisted. You can call \`sayHi()\` at the very top of your file, even if the function definition is at the bottom.
2. **\`var\` Variables:** Hoisted, but set to \`undefined\`. If you read a \`var\` variable before its assignment line, you get \`undefined\` instead of an error.
3. **\`let\` and \`const\` Variables:** Hoisted into scope, but locked in the **Temporal Dead Zone**. If you try to use them before their declaration line, JavaScript stops with a \`ReferenceError\`.

### Interview answer:
Hoisting sets up declarations before the code runs. Function declarations are fully usable anywhere in their scope. \`var\` variables are hoisted with a value of \`undefined\`, while \`let\` and \`const\` stay in the Temporal Dead Zone and cannot be accessed before their declaration line.`;
  }

  if (q.id === "js-q17") {
    q.answer = `### Simple answer:
\`async/await\` is a modern, clean way to work with Promises. An \`async\` function always returns a Promise. The \`await\` keyword pauses the function until the background task finishes, letting you write asynchronous code that reads just like step-by-step instructions.

### How it works:
1. Any function marked with \`async\` wraps its return value in a Promise automatically.
2. When JavaScript sees \`await promise\`, it pauses that function and lets other tasks run in the background.
3. Once the promise finishes, the rest of the function resumes.
4. You catch errors using standard, familiar \`try...catch\` blocks.

### Avoiding Slow Code (The Waterfall Trap):
\`\`\`javascript
// ❌ Slow: Waits for user, THEN waits for posts (takes 2 seconds)
const user = await fetchUser();
const posts = await fetchPosts();

// ✅ Fast: Runs both at the same time (takes only 1 second)
const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
\`\`\`

### Interview answer:
\`async/await\` is a cleaner way to work with Promises without messy callback chains. An \`async\` function always returns a promise, and \`await\` pauses execution until that promise settles. We handle errors cleanly using standard \`try...catch\` blocks.`;
  }

  if (q.id === "js-q23") {
    q.answer = `### Simple answer:
Arrow functions (\`() => {}\`) provide a shorter syntax and automatically borrow \`this\` from the surrounding code where they were written. Unlike regular functions, they cannot be used as constructors with \`new\`, and they do not have the legacy \`arguments\` keyword.

### Key Differences:
1. **\`this\` Binding:** Regular functions get \`this\` from who called them. Arrow functions borrow \`this\` from the code around them.
2. **Constructor Use:** Regular functions can be called with \`new Person()\`. Arrow functions throw an error if called with \`new\`.
3. **Arguments:** Regular functions have a built-in array-like \`arguments\` object. Arrow functions use clean modern rest parameters (\`(...args) => {}\`).

### Interview answer:
The primary difference is that arrow functions have inherited \`this\`, borrowing it from the surrounding code instead of creating their own. They also lack an \`arguments\` object and cannot be called with \`new\`.`;
  }
}

// Convert questions to TypeScript code
const tsContent = `import { InterviewQuestion } from "@/types/interview";

export const JAVASCRIPT_QUESTIONS: InterviewQuestion[] = ${JSON.stringify(questions, null, 2)};
`;

fs.writeFileSync("lib/interview-questions/javascript-questions.ts", tsContent, "utf8");
console.log(`Successfully rewrote lib/interview-questions/javascript-questions.ts with ${questions.length} simplified questions!`);
