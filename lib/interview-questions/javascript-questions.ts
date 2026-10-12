import { InterviewQuestion } from "@/types/interview";

export const JAVASCRIPT_QUESTIONS: InterviewQuestion[] = [
  {
    id: "js-q01",
    trackKey: "javascript",
    category: "Event Loop & Concurrency",
    subtopic: "Event Loop",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "How does the JavaScript Event Loop work, and what is the difference between the Call Stack, Microtask Queue, and Macrotask Queue?",
    answer: `JavaScript is single-threaded, meaning it has a single call stack and executes one operation at a time. The **Event Loop** is the coordination mechanism between the call stack and task queues.

### Simple answer:
The Event Loop constantly checks if the call stack is empty. If it is empty, it grabs waiting tasks from queues and runs them one by one.

### How it works:
1. **Call Stack:** Synchronous code executes immediately until the stack is completely empty.
2. **Microtask Queue (High Priority):** When the call stack empties, the event loop drains **all** queued microtasks before doing anything else.
   - Examples: \`Promise.then/catch/finally\`, \`queueMicrotask()\`, \`MutationObserver\`, \`process.nextTick\` (Node.js).
3. **Render Step (Browser):** In browsers, style recalculation and repainting occur after microtasks if needed.
4. **Macrotask Queue (Task Queue):** The event loop takes **one** macrotask from the queue and places it on the call stack.
   - Examples: \`setTimeout\`, \`setInterval\`, \`setImmediate\` (Node.js), I/O callbacks, UI events.
5. Once that macrotask finishes, the event loop drains any new microtasks created before taking the next macrotask.

### Interview answer:
JavaScript runs code synchronously on the call stack. When async tasks finish, microtasks (like Promises) run first as soon as the stack is clear, followed by macrotasks (like \`setTimeout\`). This keeps the app non-blocking while ensuring promises resolve quickly.`,
    followUps: [
      "What happens if a microtask recursively enqueues another microtask?",
      "Why does `process.nextTick` run before `Promise.then` in Node.js?",
      "Can heavy synchronous code cause UI freezing in the browser?"
    ],
    keyPoints: [
      "JavaScript single-threaded call stack execution",
      "Microtasks drain completely before the next macrotask is dequeued",
      "Promises and queueMicrotask belong to microtasks",
      "setTimeout and setInterval belong to macrotasks (task queue)"
    ],
    tags: ["event-loop", "asynchronous", "microtasks", "macrotasks", "promises"],
    relatedLessonSlug: "/learn/javascript/js07-event-loop-microtasks",
    relatedLessonName: "JS-07: The Event Loop & Microtasks"
  },
  {
    id: "js-q02",
    trackKey: "javascript",
    category: "Closures & Scope",
    subtopic: "Closures",
    type: "coding",
    difficulty: "easy",
    source: "curated",
    question: "What will this code log to the console, and why? How would you fix it to log 0, 1, 2?",
    codeSnippet: `for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}`,
    expectedOutput: "3\n3\n3",
    answer: `### Simple answer:
It logs \`3\`, \`3\`, \`3\` because \`var\` creates one shared variable for the whole loop, and the timers run after the loop has already finished counting to 3.

### How it works:
1. \`var\` is **function-scoped**, not block-scoped. There is only one variable \`i\` shared across all loop iterations.
2. The \`for\` loop runs synchronously to completion, incrementing \`i\` from \`0\` to \`3\`.
3. The \`setTimeout\` callbacks are sent to the Macrotask queue. When they finally execute after ~100ms, they reference the single shared variable \`i\`, which has already become \`3\`.

### Fix 1: Use \`let\` (Block Scope)
\`let\` creates a brand new variable binding for each loop iteration:
\`\`\`javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Outputs: 0, 1, 2
\`\`\`

### Fix 2: IIFE (Immediately Invoked Function Expression)
Creates a closure that captures the value of \`i\` at that specific iteration:
\`\`\`javascript
for (var i = 0; i < 3; i++) {
  ((capturedI) => {
    setTimeout(() => console.log(capturedI), 100);
  })(i);
}
\`\`\`

### Interview answer:
Because \`var\` is function-scoped, all callbacks close over the exact same variable after the loop reaches 3. Replacing \`var\` with \`let\` solves this immediately because \`let\` has block scope and creates a new binding for each loop iteration.`,
    followUps: [
      "How does the compiler treat `let` inside a `for` loop header differently than `var`?",
      "What is the Temporal Dead Zone (TDZ) with `let` and `const`?",
      "Can closures cause memory leaks in long-running single-page applications?"
    ],
    keyPoints: [
      "var is function-scoped while let is block-scoped",
      "Synchronous loop completes before macrotask callbacks run",
      "let creates a distinct binding per loop iteration",
      "Closures capture variables by reference, not value snapshot"
    ],
    tags: ["closures", "scoping", "var-let-const", "asynchronous"],
    relatedLessonSlug: "/learn/javascript/js03-closures-and-lexical-scope",
    relatedLessonName: "JS-03: Closures & Lexical Scope"
  },
  {
    id: "js-q03",
    trackKey: "javascript",
    category: "Prototypes & Inheritance",
    subtopic: "Prototypes",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "Explain prototypical inheritance in JavaScript. What is the difference between `__proto__` and `prototype`?",
    answer: `### Simple answer:
In JavaScript, objects can inherit properties and methods directly from other objects through a chain called the prototype chain.

### How it works:
Every JavaScript object has an internal hidden link to another object called its **prototype** (\`[[Prototype]]\`). When you access a property on an object:
1. The engine searches the object's own properties.
2. If not found, it traverses up the **prototype chain**.
3. It continues until it finds the property or reaches \`Object.prototype\` whose prototype is \`null\`.

### Difference between \`prototype\` and \`__proto__\`:
- **\`Function.prototype\`:** A property on constructor functions. It defines what will become the prototype of instances created with \`new FunctionName()\`.
- **\`__proto__\` / \`Object.getPrototypeOf(obj)\`:** The accessor property on an **instance** pointing to that instance's actual prototype object.

\`\`\`javascript
function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function() {
  return \`Hi, \${this.name}\`;
};

const me = new Person("Alex");
console.log(Object.getPrototypeOf(me) === Person.prototype); // true
\`\`\`

### Interview answer:
JavaScript objects inherit from other objects via prototypes. The \`prototype\` property is on constructor functions to give new instances shared methods, while \`__proto__\` is the link on instances pointing back to their prototype.`,
    followUps: [
      "Why is accessing or mutating `__proto__` deprecated in modern JavaScript?",
      "How does `Object.create(proto)` work under the hood?",
      "What are the performance implications of deep prototype chains?"
    ],
    keyPoints: [
      "Every object links to a prototype forming a chain up to null",
      "prototype property is on constructors; [[Prototype]] is on instances",
      "ES6 classes are syntactic sugar over prototypal delegation",
      "Use Object.getPrototypeOf() instead of __proto__"
    ],
    tags: ["prototypes", "inheritance", "oop", "objects"],
    relatedLessonSlug: "/learn/javascript/js04-prototypal-inheritance",
    relatedLessonName: "JS-04: Prototypal Inheritance Deep Dive"
  },
  {
    id: "js-q04",
    trackKey: "javascript",
    category: "Asynchronous Programming",
    subtopic: "Promises",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "Compare `Promise.all`, `Promise.allSettled`, `Promise.race`, and `Promise.any`. When would you choose each?",
    answer: `### Simple answer:
These four methods handle multiple asynchronous promises at the same time, but they resolve or fail in different ways:

| Method | Resolves When | Rejects When | Best Use Case |
|---|---|---|---|
| **\`Promise.all\`** | **All** promises resolve | **Any single** promise rejects (fail-fast) | Operations that all need to succeed together (e.g. user details and permissions) |
| **\`Promise.allSettled\`** | **All** promises finish (resolved or rejected) | **Never rejects**; returns array of status objects | Independent operations where you want results regardless of errors (e.g. bulk notifications) |
| **\`Promise.race\`** | **First** promise to finish (either resolve OR reject) | **First** promise to reject (if it finishes first) | Request timeout wrappers (race API fetch against a timer) |
| **\`Promise.any\`** | **First** promise to **resolve** successfully | **All** promises reject (\`AggregateError\`) | Fallback sources (e.g. ping multiple mirrors; take the first successful response) |

### Example:
\`\`\`javascript
// Timeout pattern using Promise.race:
const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms));
const data = await Promise.race([fetchData(), timeout(5000)]);
\`\`\`

### Interview answer:
Use \`Promise.all\` when all tasks must succeed. Use \`Promise.allSettled\` when you need to know the outcome of every task even if some fail. Use \`Promise.race\` for the fastest result or timeouts, and \`Promise.any\` for the first successful result among multiple fallbacks.`,
    followUps: [
      "What is an AggregateError in Promise.any?",
      "How do you cancel an inflight fetch request when Promise.race times out?",
      "Does Promise.all execute tasks in parallel or concurrently?"
    ],
    keyPoints: [
      "Promise.all fails fast on the first rejection",
      "Promise.allSettled waits for all and never rejects",
      "Promise.race takes the first settled (resolved or rejected)",
      "Promise.any ignores rejections until all fail"
    ],
    tags: ["promises", "async", "concurrency", "error-handling"],
    relatedLessonSlug: "/learn/javascript/js06-promises-and-async-await",
    relatedLessonName: "JS-06: Promises & Async/Await Architecture"
  },
  {
    id: "js-q05",
    trackKey: "javascript",
    category: "Memory & Performance",
    subtopic: "Garbage Collection",
    type: "conceptual",
    difficulty: "hard",
    source: "curated",
    question: "What causes memory leaks in modern JavaScript applications, and how do you detect and fix them?",
    answer: `### Simple answer:
A memory leak happens when your application keeps holding references to objects it no longer needs, preventing JavaScript's garbage collector from freeing that memory.

### Common Causes:
1. **Accidental Global Variables:** Assigning to undeclared variables attaches them to \`window\` or \`globalThis\`.
2. **Forgotten Timers / Intervals:** A \`setInterval\` running in the background holding references to large objects or unmounted components.
3. **Uncleared Event Listeners:** Adding DOM event listeners or observers without removing them when components unmount.
4. **Detached DOM Nodes:** Holding a JavaScript variable referencing a DOM element that was removed from the HTML page.
5. **Closures Retaining Unneeded Scope:** Functions capturing large variables in outer scopes that remain alive longer than needed.

### Detection & Prevention:
- Use **Chrome DevTools Memory tab**: Take Heap Snapshots before and after user interactions to look for retained object size.
- Clean up timers (\`clearInterval\`) and event listeners (\`removeEventListener\`) inside lifecycle cleanup functions.
- Use \`WeakMap\` or \`WeakSet\` for caches because their entries are collected automatically when keys have no other references.

### Interview answer:
Memory leaks occur when unused objects remain reachable from the root. The most common causes are uncancelled \`setInterval\` timers, unremoved DOM event listeners, and detached DOM nodes. We detect them using Chrome DevTools heap snapshots and fix them by properly cleaning up resources when components unmount.`,
    followUps: [
      "How does the Mark-and-Sweep garbage collection algorithm work?",
      "What is the difference between shallow size and retained size in heap snapshots?",
      "How do WeakMap and WeakSet help prevent memory leaks?"
    ],
    keyPoints: [
      "Mark-and-sweep cannot collect objects reachable from root",
      "Forgotten intervals and uncleared DOM listeners are the #1 source",
      "Detached DOM nodes keep entire subtrees in memory",
      "WeakMap and WeakSet prevent reference retention"
    ],
    tags: ["memory-leaks", "garbage-collection", "performance", "devtools"],
    relatedLessonSlug: "/learn/javascript/js08-memory-management-and-gc",
    relatedLessonName: "JS-08: Memory Management & V8 Garbage Collection"
  },
  {
    id: "js-q06",
    trackKey: "javascript",
    category: "Data Types & Fundamentals",
    subtopic: "Types",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is the difference between Primitive types and Reference types in JavaScript?",
    answer: `### Simple answer:
Primitive types store their actual value directly in memory, while Reference types store a pointer (address) to where the object is located in memory.

### How it works:
- **Primitives:** \`string\`, \`number\`, \`boolean\`, \`null\`, \`undefined\`, \`symbol\`, and \`bigint\`. They are immutable and copied by value.
- **Reference types:** \`Object\`, \`Array\`, \`Function\`, \`Date\`, \`Map\`, \`Set\`. They are mutable and copied by reference.

### Example:
\`\`\`javascript
// Primitive: copied by value
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (unchanged)

// Reference: copied by reference (pointer)
let obj1 = { name: "Alice" };
let obj2 = obj1;
obj2.name = "Bob";
console.log(obj1.name); // "Bob" (both point to the same object!)
\`\`\`

### Interview answer:
Primitives are stored and copied by value, meaning changing one variable does not affect another. Objects and arrays are stored and copied by reference, meaning two variables can point to the same memory location, so mutating one mutates both.`,
    followUps: [
      "Why are primitive strings able to call methods like .toUpperCase()?",
      "What is boxing and unboxing in JavaScript?",
      "How do you compare two objects by value instead of reference?"
    ],
    keyPoints: [
      "7 primitive types: string, number, boolean, null, undefined, symbol, bigint",
      "Primitives are immutable and passed by value",
      "Objects, arrays, and functions are mutable and passed by reference",
      "Assigning an object copies the reference address, not the underlying data"
    ],
    tags: ["primitives", "reference-types", "data-types", "memory"],
    relatedLessonSlug: "/learn/javascript/js01-types-and-variables",
    relatedLessonName: "JS-01: JavaScript Data Types & Memory Allocation"
  },
  {
    id: "js-q07",
    trackKey: "javascript",
    category: "Equality & Operators",
    subtopic: "Type Coercion",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is the difference between `==` and `===` in JavaScript, and what is type coercion?",
    answer: `### Simple answer:
\`==\` (loose equality) compares values after converting them to the same type (type coercion), while \`===\` (strict equality) compares both value and type without converting.

### How it works:
Type coercion is JavaScript's automatic conversion of a value from one data type to another during operations.
- With \`==\`, JavaScript tries to convert values before comparing:
  - \`5 == "5"\` is \`true\` (string \`"5"\` is coerced to number \`5\`).
  - \`0 == false\` is \`true\`.
  - \`null == undefined\` is \`true\`.
- With \`===\`, if the types differ, it returns \`false\` immediately:
  - \`5 === "5"\` is \`false\`.
  - \`0 === false\` is \`false\`.

### Example:
\`\`\`javascript
console.log(1 == "1");   // true (coerced)
console.log(1 === "1");  // false (different types)

console.log([] == false); // true (empty array coerced to 0, false coerced to 0)
console.log([] === false);// false
\`\`\`

### Interview answer:
Always prefer \`===\` because it avoids unexpected type conversions and compares both value and type. The only common exception is checking \`x == null\`, which cleanly checks for both \`null\` and \`undefined\` at once.`,
    followUps: [
      "When is it acceptable or common to use loose equality `==`?",
      "What does Object.is() do differently than `===`?",
      "Why is NaN === NaN false?"
    ],
    keyPoints: [
      "=== checks both value and type without conversion",
      "== performs implicit type coercion before comparison",
      "x == null checks for both null and undefined",
      "NaN === NaN is false; use Number.isNaN(x)"
    ],
    tags: ["equality", "type-coercion", "operators", "comparison"],
    relatedLessonSlug: "/learn/javascript/js02-operators-and-coercion",
    relatedLessonName: "JS-02: Equality, Truthy/Falsy & Type Coercion"
  },
  {
    id: "js-q08",
    trackKey: "javascript",
    category: "Data Types & Fundamentals",
    subtopic: "Null vs Undefined",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is the difference between `null` and `undefined` in JavaScript?",
    answer: `### Simple answer:
\`undefined\` means a variable has been declared but not yet assigned a value, while \`null\` is an intentional assignment representing "no value" or "empty".

### How it works:
- **\`undefined\`:** Default value provided by JavaScript when something is missing:
  - Declared variables with no value: \`let x;\`
  - Function parameters that were not passed
  - Functions with no explicit \`return\` statement
  - Non-existent properties on an object
- **\`null\`:** Explicitly set by developers to indicate an empty or reset object reference.

### Example:
\`\`\`javascript
let user;
console.log(user); // undefined (not assigned yet)

let activeUser = null; // explicitly set to empty

console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object" (famous historical JS bug!)

console.log(null == undefined);  // true
console.log(null === undefined); // false
\`\`\`

### Interview answer:
\`undefined\` is JavaScript's default for uninitialized variables or missing inputs. \`null\` is an intentional value assigned by developers to represent an empty or non-existent object. Also, \`typeof null\` returns \`"object"\` due to an early JavaScript bug.`,
    followUps: [
      "Why does typeof null return 'object'?",
      "How does optional chaining (?.) and nullish coalescing (??) treat null vs undefined?",
      "What is the difference between ?? and ||?"
    ],
    keyPoints: [
      "undefined = variable declared with no value assigned",
      "null = intentional absence of any object value",
      "typeof undefined is 'undefined', typeof null is 'object'",
      "null == undefined is true, but null === undefined is false"
    ],
    tags: ["null", "undefined", "types", "fundamentals"],
    relatedLessonSlug: "/learn/javascript/js01-types-and-variables",
    relatedLessonName: "JS-01: JavaScript Data Types & Memory Allocation"
  },
  {
    id: "js-q09",
    trackKey: "javascript",
    category: "Functions & Scope",
    subtopic: "Arrow Functions",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "What are the key differences between Arrow Functions and Regular Functions in JavaScript?",
    answer: `### Simple answer:
Arrow functions provide a shorter syntax and lexically inherit \`this\` from their surrounding scope instead of creating their own \`this\`.

### Key Differences:
1. **\`this\` binding:** Regular functions determine \`this\` based on **how** they are called (caller). Arrow functions capture \`this\` from the lexical scope where they are written.
2. **Constructor capability:** Regular functions can be used as constructors with \`new\`. Arrow functions do **not** have a \`prototype\` property and throw a TypeError if called with \`new\`.
3. **\`arguments\` object:** Regular functions have an \`arguments\` object containing passed arguments. Arrow functions do not (use rest parameters \`...args\` instead).
4. **Duplicate parameter names:** Allowed in non-strict regular functions, forbidden in arrow functions.

### Example:
\`\`\`javascript
const timer = {
  seconds: 0,
  startRegular() {
    setTimeout(function() {
      // this points to window/global in non-strict mode!
      console.log(this.seconds); // undefined
    }, 100);
  },
  startArrow() {
    setTimeout(() => {
      // this is lexically bound to timer object!
      console.log(this.seconds); // 0
    }, 100);
  }
};
\`\`\`

### Interview answer:
The main difference is \`this\`. Arrow functions do not bind their own \`this\`, \`arguments\`, or \`prototype\`. They inherit \`this\` from the enclosing code, making them perfect for callbacks and short utility functions, while regular functions are needed when you want dynamic \`this\` or object methods.`,
    followUps: [
      "Can you change an arrow function's `this` using call, apply, or bind?",
      "Why should you avoid using arrow functions as object methods?",
      "How do rest parameters replace the arguments object?"
    ],
    keyPoints: [
      "Arrow functions lexically inherit this from outer scope",
      "Arrow functions cannot be used with new (no prototype)",
      "Arrow functions lack their own arguments object",
      "call, apply, and bind cannot re-bind an arrow function's this"
    ],
    tags: ["arrow-functions", "this", "functions", "scope"],
    relatedLessonSlug: "/learn/javascript/js03-closures-and-lexical-scope",
    relatedLessonName: "JS-03: Closures & Lexical Scope"
  },
  {
    id: "js-q10",
    trackKey: "javascript",
    category: "Execution & Scope",
    subtopic: "Hoisting",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is Hoisting in JavaScript? How do `var`, `let`, `const`, and function declarations behave?",
    answer: `### Simple answer:
Hoisting is JavaScript's default behavior of moving variable and function declarations to the top of their containing scope during the compilation phase before running the code.

### How it works:
1. **Function Declarations:** Fully hoisted with their implementation. You can call the function before its declaration in the file.
2. **\`var\` variables:** Hoisted and initialized with \`undefined\`. Accessing them before their line produces \`undefined\`, not an error.
3. **\`let\` and \`const\` variables:** Hoisted into scope, but **not initialized**. Accessing them before their declaration line throws a \`ReferenceError\`. The time between entering scope and declaration is called the **Temporal Dead Zone (TDZ)**.

### Example:
\`\`\`javascript
sayHello(); // Works! Outputs "Hello"
function sayHello() {
  console.log("Hello");
}

console.log(a); // undefined
var a = 10;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;
\`\`\`

### Interview answer:
Hoisting moves declarations to the top of their scope during compilation. Function declarations are fully hoisted with their body. \`var\` is hoisted and initialized with \`undefined\`. \`let\` and \`const\` are hoisted but stay in the Temporal Dead Zone until initialized, throwing a ReferenceError if accessed early.`,
    followUps: [
      "What is the Temporal Dead Zone (TDZ)?",
      "Are function expressions hoisted the same way as function declarations?",
      "What happens if a variable and function share the same name?"
    ],
    keyPoints: [
      "Compilation allocates memory for declarations before execution",
      "Function declarations are hoisted with their complete body",
      "var is initialized to undefined upon hoisting",
      "let and const exist in TDZ until evaluated"
    ],
    tags: ["hoisting", "var", "let", "const", "tdz"],
    relatedLessonSlug: "/learn/javascript/js03-closures-and-lexical-scope",
    relatedLessonName: "JS-03: Closures & Lexical Scope"
  },
  {
    id: "js-q11",
    trackKey: "javascript",
    category: "Arrays & Iteration",
    subtopic: "Array Methods",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "Compare `map()`, `filter()`, `reduce()`, and `forEach()` in JavaScript. When should you use each?",
    answer: `### Simple answer:
These are built-in array methods for working with list data, but they return different results and serve different purposes:

- **\`map()\`: Transforms** every element and returns a **new array** of the exact same length.
- **\`filter()\`: Selects** elements that pass a test and returns a **new array** of matching items.
- **\`reduce()\`: Combines** all elements into a **single value** (like a sum, object, or grouped array).
- **\`forEach()\`: Executes** a function for each element to perform **side effects** (like logging or updating DOM), returning \`undefined\`.

### Example:
\`\`\`javascript
const numbers = [1, 2, 3, 4];

// map: double every number -> [2, 4, 6, 8]
const doubled = numbers.map(n => n * 2);

// filter: keep even numbers -> [2, 4]
const evens = numbers.filter(n => n % 2 === 0);

// reduce: compute sum -> 10
const total = numbers.reduce((sum, n) => sum + n, 0);

// forEach: print to console (no return array)
numbers.forEach(n => console.log(n));
\`\`\`

### Interview answer:
Use \`map\` when you want to transform items into a new array. Use \`filter\` when you want a subset of items. Use \`reduce\` when you need to condense the array into a single accumulated result. Use \`forEach\` only when you need side effects and do not need a new array.`,
    followUps: [
      "Can you break or return early from a forEach loop?",
      "Do map, filter, or reduce mutate the original array?",
      "How do you group an array of objects by category using reduce?"
    ],
    keyPoints: [
      "map returns a new array with transformed items",
      "filter returns a new array with items matching a condition",
      "reduce returns a single accumulated value",
      "forEach returns undefined and is used for side effects"
    ],
    tags: ["arrays", "map", "filter", "reduce", "forEach"],
    relatedLessonSlug: "/learn/javascript/js05-array-methods-and-iteration",
    relatedLessonName: "JS-05: Array Methods & Higher-Order Functions"
  },
  {
    id: "js-q12",
    trackKey: "javascript",
    category: "Functions & Scope",
    subtopic: "This Context",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "How do `call()`, `apply()`, and `bind()` work in JavaScript, and what are the differences between them?",
    answer: `### Simple answer:
All three methods allow you to explicitly set what \`this\` refers to when calling a function.

### Key Differences:
- **\`call(thisArg, arg1, arg2, ...)\`:** Invokes the function **immediately**, passing arguments one by one (comma-separated).
- **\`apply(thisArg, [arg1, arg2, ...])\`:** Invokes the function **immediately**, passing arguments as an **array**.
- **\`bind(thisArg, arg1, arg2, ...)\`:** Does **not** invoke the function immediately. It returns a **brand new function** with \`this\` permanently bound.

### Example:
\`\`\`javascript
function introduce(greeting, punctuation) {
  return \`\${greeting}, I am \${this.name}\${punctuation}\`;
}

const user = { name: "Sarah" };

// call: comma-separated arguments
console.log(introduce.call(user, "Hello", "!")); // "Hello, I am Sarah!"

// apply: array of arguments
console.log(introduce.apply(user, ["Hi", "."])); // "Hi, I am Sarah."

// bind: returns a new reusable function
const sarahIntro = introduce.bind(user, "Welcome");
console.log(sarahIntro("~")); // "Welcome, I am Sarah~"
\`\`\`

### Interview answer:
\`call\` and \`apply\` run the function immediately with a specified \`this\` context—\`call\` takes arguments individually, while \`apply\` takes them as an array. \`bind\` returns a new function with \`this\` locked in for future calls.`,
    followUps: [
      "How do you remember the difference between call and apply? (Hint: C for Comma, A for Array)",
      "Can a function bound with bind() be rebound using another call() or bind()?",
      "What is partial application using bind()?"
    ],
    keyPoints: [
      "call executes immediately with comma-separated arguments",
      "apply executes immediately with an array of arguments",
      "bind returns a new function without calling it immediately",
      "Useful for borrowing methods from other objects"
    ],
    tags: ["this", "call", "apply", "bind", "functions"],
    relatedLessonSlug: "/learn/javascript/js03-closures-and-lexical-scope",
    relatedLessonName: "JS-03: Closures & Lexical Scope"
  },
  {
    id: "js-q13",
    trackKey: "javascript",
    category: "Objects & Memory",
    subtopic: "Cloning",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What is the difference between a Shallow Copy and a Deep Copy in JavaScript? How do you create each?",
    answer: `### Simple answer:
A shallow copy copies top-level properties, but nested objects still share memory references. A deep copy duplicates everything at all nested levels, creating completely independent data.

### How it works:
- **Shallow Copy:**
  - Using spread: \`const copy = { ...original }\`
  - Using \`Object.assign({}, original)\`
  - If \`original.address.city\` changes in the copy, it also changes in the original!
- **Deep Copy:**
  - Modern native standard: **\`structuredClone(original)\`** (handles Date, Map, Set, nested arrays, and circular references).
  - Quick fallback: \`JSON.parse(JSON.stringify(original))\` (fails on Functions, Symbols, \`undefined\`, and Dates become strings).

### Example:
\`\`\`javascript
const user = { name: "Leo", address: { city: "Berlin" } };

// Shallow copy:
const shallow = { ...user };
shallow.address.city = "Munich";
console.log(user.address.city); // "Munich" (unintentionally changed original!)

// Deep copy:
const deep = structuredClone(user);
deep.address.city = "Hamburg";
console.log(user.address.city); // Still "Munich" (independent copy)
\`\`\`

### Interview answer:
Shallow copies only clone top-level properties, leaving nested objects linked by reference. Deep copies clone every nested layer. In modern JavaScript, use the native \`structuredClone()\` function for deep copying objects cleanly.`,
    followUps: [
      "What are the limitations of JSON.parse(JSON.stringify()) for deep copying?",
      "Can structuredClone copy functions or DOM nodes?",
      "How does lodash.cloneDeep work compared to structuredClone?"
    ],
    keyPoints: [
      "Shallow copy copies references for nested objects",
      "Spread operator ({ ...obj }) and Object.assign create shallow copies",
      "structuredClone() is the standard modern deep copy method",
      "JSON serialization drops functions, undefined, and converts Dates to strings"
    ],
    tags: ["shallow-copy", "deep-copy", "structuredClone", "objects"],
    relatedLessonSlug: "/learn/javascript/js01-types-and-variables",
    relatedLessonName: "JS-01: JavaScript Data Types & Memory Allocation"
  },
  {
    id: "js-q14",
    trackKey: "javascript",
    category: "Performance & Optimization",
    subtopic: "Rate Limiting",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What is the difference between Debouncing and Throttling? How do you implement a simple debounce function?",
    answer: `### Simple answer:
Both limit how often a function executes during rapid events, but:
- **Debounce:** Waits until the user **stops** triggering the event for a specified delay before running.
- **Throttle:** Guarantees the function runs at most **once every fixed interval**, no matter how many times it is triggered.

### When to use which:
- **Debounce:** Search bar auto-complete (wait until user stops typing), window resize calculations, saving drafts after typing.
- **Throttle:** Scroll position tracking, infinite scrolling, game loop input, mousemove tracking.

### Simple Debounce Implementation:
\`\`\`javascript
function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId); // reset timer on every new call
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Usage:
const handleSearch = debounce((query) => {
  console.log("Searching for:", query);
}, 300);
\`\`\`

### Interview answer:
Debounce delays execution until a pause in activity (like waiting for typing to stop in a search bar). Throttle ensures the function runs at a steady, fixed rate (like reading scroll events at most once every 200ms).`,
    followUps: [
      "How do you implement immediate/leading edge execution in debounce?",
      "How do you cancel a pending debounced call when a component unmounts?",
      "Why is throttle preferred over debounce for scroll event listeners?"
    ],
    keyPoints: [
      "Debounce waits for silence/inactivity before executing",
      "Throttle enforces a maximum execution frequency over time",
      "Debounce uses clearTimeout and setTimeout",
      "Essential for preventing expensive calculations or API calls on frequent events"
    ],
    tags: ["debounce", "throttle", "performance", "timers"],
    relatedLessonSlug: "/learn/javascript/js07-event-loop-microtasks",
    relatedLessonName: "JS-07: The Event Loop & Microtasks"
  },
  {
    id: "js-q15",
    trackKey: "javascript",
    category: "DOM & Events",
    subtopic: "Event Propagation",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "Explain Event Bubbling, Event Capturing, and Event Delegation in the browser DOM.",
    answer: `### Simple answer:
When an event happens on a web page, it travels through three phases: down from the document (capturing), hits the target element, and then travels back up to the document (bubbling).

### The Three Phases:
1. **Capturing Phase:** Event travels down from \`window\` -> \`document\` -> parent elements -> target.
2. **Target Phase:** Event reaches the element that was actually clicked (\`event.target\`).
3. **Bubbling Phase (Default):** Event bubbles back up from target -> parent elements -> \`document\` -> \`window\`.

### What is Event Delegation?
Instead of adding event listeners to 100 individual list items, you attach **one listener to their common parent**. When an item is clicked, the event bubbles up to the parent, and you check \`event.target\`.

\`\`\`javascript
// Event Delegation on a list:
document.querySelector("#item-list").addEventListener("click", (e) => {
  if (e.target.matches("li.delete-btn")) {
    console.log("Deleted item:", e.target.dataset.id);
  }
});
\`\`\`

### Stopping Propagation:
- \`event.stopPropagation()\`: Stops the event from traveling further up or down.
- \`event.preventDefault()\`: Prevents default browser action (like navigating an \`<a>\` tag or submitting a form).

### Interview answer:
Events travel down in the capturing phase and bubble up in the bubbling phase. Event delegation takes advantage of bubbling by placing a single listener on a parent element to handle events for all children, saving memory and automatically handling dynamically added items.`,
    followUps: [
      "What is the difference between event.target and event.currentTarget?",
      "How do you configure an event listener to run during the capturing phase instead of bubbling?",
      "Why is event delegation beneficial for dynamic content added after page load?"
    ],
    keyPoints: [
      "Event propagation phases: Capturing -> Target -> Bubbling",
      "addEventListener defaults to bubbling (use third param true for capturing)",
      "Event delegation attaches one listener to a parent element",
      "target is what was clicked; currentTarget is element holding the listener"
    ],
    tags: ["events", "bubbling", "capturing", "delegation", "dom"],
    relatedLessonSlug: "/learn/javascript/js07-event-loop-microtasks",
    relatedLessonName: "JS-07: The Event Loop & Microtasks"
  },
  {
    id: "js-q16",
    trackKey: "javascript",
    category: "Execution & Scope",
    subtopic: "Scope Chain",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is Scope and the Scope Chain in JavaScript? What are Global, Function, and Block scopes?",
    answer: `### Simple answer:
Scope determines where variables can be accessed in your code. The Scope Chain is the lookup mechanism JavaScript uses to find variables from inner scopes to outer scopes.

### The Three Scopes:
1. **Global Scope:** Variables declared outside any function or block. Accessible everywhere in the application.
2. **Function Scope:** Variables declared inside a function (e.g. with \`var\`, \`let\`, or \`const\`). Accessible only inside that function.
3. **Block Scope:** Variables declared with \`let\` or \`const\` inside curly braces \`{ ... }\` (like inside \`if\`, \`for\`, or \`while\` blocks). Accessible only within that block.

### How the Scope Chain works:
When JavaScript looks for a variable, it starts in the local scope. If not found, it steps outward to the parent scope, continuing up the chain until it reaches the global scope. If still not found, it throws a \`ReferenceError\`.

\`\`\`javascript
const globalName = "LearnCraft";

function outer() {
  const outerVal = 10;
  function inner() {
    const innerVal = 20;
    // Looks up innerVal (local) -> outerVal (parent) -> globalName (global)
    console.log(innerVal + outerVal, globalName);
  }
  inner();
}
outer();
\`\`\`

### Interview answer:
Scope controls variable visibility. JavaScript has global scope, function scope, and block scope (introduced with \`let\` and \`const\`). When reading a variable, JavaScript searches from the current local scope up through enclosing parent scopes to the global scope via the scope chain.`,
    followUps: [
      "What is lexical scoping (static scoping)?",
      "What is variable shadowing in JavaScript?",
      "Why does assigning to an undeclared variable without var/let create an accidental global in non-strict mode?"
    ],
    keyPoints: [
      "Global scope is accessible everywhere",
      "var is function-scoped; let and const are block-scoped",
      "Scope chain resolves variables from innermost to outermost",
      "Strict mode ('use strict') prevents accidental globals"
    ],
    tags: ["scope", "scope-chain", "block-scope", "variables"],
    relatedLessonSlug: "/learn/javascript/js03-closures-and-lexical-scope",
    relatedLessonName: "JS-03: Closures & Lexical Scope"
  },
  {
    id: "js-q17",
    trackKey: "javascript",
    category: "Asynchronous Programming",
    subtopic: "Async Await",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How does `async/await` work under the hood, and how should you handle errors in asynchronous code?",
    answer: `### Simple answer:
\`async/await\` is syntactic sugar built on top of Promises and Generators. It lets you write asynchronous code that reads cleanly like synchronous code without blocking the main thread.

### How it works:
1. An \`async\` function **always returns a Promise**. If you return a primitive string or number, JavaScript wraps it in \`Promise.resolve()\`.
2. The \`await\` keyword pauses execution of the \`async\` function until the Promise resolves or rejects, freeing the thread to run other tasks.
3. Errors are handled using standard \`try/catch\` blocks.

### Example:
\`\`\`javascript
async function fetchUserProfile(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    throw error; // rethrow or return fallback
  }
}
\`\`\`

### Common Gotcha: Sequential vs Concurrent
\`\`\`javascript
// SLOW: Sequential (takes 2 + 2 = 4 seconds)
const user = await fetchUser();
const posts = await fetchPosts();

// FAST: Concurrent using Promise.all (takes only 2 seconds)
const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
\`\`\`

### Interview answer:
\`async/await\` wraps promises in readable syntax. An \`async\` function always returns a promise, and \`await\` pauses function execution until that promise settles. Always wrap calls in \`try/catch\` or handle errors at the caller level, and use \`Promise.all()\` for independent operations to avoid slow sequential waterfalls.`,
    followUps: [
      "What happens if you await a non-promise value?",
      "How does top-level await work in ES modules?",
      "Why is an async waterfall bad for application performance?"
    ],
    keyPoints: [
      "async functions always return a Promise",
      "await pauses function execution until promise settles",
      "Use try/catch for robust error handling",
      "Avoid sequential awaits for independent calls; use Promise.all"
    ],
    tags: ["async-await", "promises", "error-handling", "asynchronous"],
    relatedLessonSlug: "/learn/javascript/js06-promises-and-async-await",
    relatedLessonName: "JS-06: Promises & Async/Await Architecture"
  },
  {
    id: "js-q18",
    trackKey: "javascript",
    category: "Functional Programming",
    subtopic: "Currying",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What is Currying in JavaScript, and what are its practical benefits?",
    answer: `### Simple answer:
Currying is a technique where a function with multiple arguments is transformed into a sequence of nested functions that each take a single argument.

### How it works:
Instead of calling \`fn(a, b, c)\`, you call \`fn(a)(b)(c)\`.

### Example:
\`\`\`javascript
// Normal function
function add(a, b) {
  return a + b;
}

// Curried function
function curriedAdd(a) {
  return function(b) {
    return a + b;
  };
}

const addFive = curriedAdd(5); // partially applied
console.log(addFive(10)); // 15
console.log(addFive(20)); // 25
\`\`\`

### Practical Use Case: Reusable Utilities & Logging
\`\`\`javascript
const logger = (level) => (prefix) => (message) => {
  console.log(\`[\${level}] [\${prefix}]: \${message}\`);
};

const errorLogger = logger("ERROR")("AuthService");
errorLogger("Invalid password"); // [ERROR] [AuthService]: Invalid password
\`\`\`

### Interview answer:
Currying transforms a function that takes multiple arguments into nested unary functions. It enables partial application—creating specialized helper functions by locking in configuration arguments ahead of time, which makes code cleaner and more composable.`,
    followUps: [
      "What is the difference between Currying and Partial Application?",
      "How do you write a generic curry(fn) utility that works with any function length?",
      "How is currying used in middleware pipelines (like Redux middleware)?"
    ],
    keyPoints: [
      "Converts f(a, b) into f(a)(b)",
      "Relies on closures to remember earlier arguments",
      "Enables function composition and reusable specialized helpers",
      "Widely used in functional libraries and Redux middleware"
    ],
    tags: ["currying", "functional-programming", "closures", "functions"],
    relatedLessonSlug: "/learn/javascript/js03-closures-and-lexical-scope",
    relatedLessonName: "JS-03: Closures & Lexical Scope"
  },
  {
    id: "js-q19",
    trackKey: "javascript",
    category: "Objects & Immutability",
    subtopic: "Object Methods",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What is the difference between `Object.freeze()` and `Object.seal()` in JavaScript?",
    answer: `### Simple answer:
Both make an object more restrictive, but \`Object.freeze()\` makes it completely read-only, while \`Object.seal()\` still allows you to change existing property values.

### Comparison:
| Capability | Normal Object | \`Object.seal()\` | \`Object.freeze()\` |
|---|---|---|---|
| **Add new properties** | Yes | ❌ No | ❌ No |
| **Delete existing properties** | Yes | ❌ No | ❌ No |
| **Modify existing values** | Yes | **Yes** | ❌ No |
| **Reconfigure descriptors** | Yes | ❌ No | ❌ No |

### Example:
\`\`\`javascript
const sealedObj = Object.seal({ id: 1, name: "Alice" });
sealedObj.name = "Bob";   // Allowed! Updates to "Bob"
sealedObj.age = 30;       // Ignored (or TypeError in strict mode)
delete sealedObj.id;      // Ignored (cannot delete)

const frozenObj = Object.freeze({ id: 1, name: "Alice" });
frozenObj.name = "Bob";   // Ignored (cannot mutate)
frozenObj.age = 30;       // Ignored (cannot add)
delete frozenObj.id;      // Ignored (cannot delete)
\`\`\`

### Important Caveat: Shallow Freeze
Both methods are **shallow**. Nested objects inside a frozen object can still be mutated unless you implement a deep freeze recursive helper.

### Interview answer:
\`Object.seal()\` prevents adding or deleting properties, but permits modifying existing values. \`Object.freeze()\` is stricter: it prevents adding, deleting, and modifying existing properties. Both are shallow operations.`,
    followUps: [
      "How do you implement a deepFreeze() utility function?",
      "How does Object.isFrozen() verify object state?",
      "Why does strict mode ('use strict') throw errors on frozen mutations while non-strict silently ignores them?"
    ],
    keyPoints: [
      "seal prevents adding/deleting properties but allows value edits",
      "freeze prevents all additions, deletions, and value edits",
      "Both methods are shallow; nested objects remain mutable",
      "In strict mode, attempting forbidden mutations throws a TypeError"
    ],
    tags: ["object-freeze", "object-seal", "immutability", "objects"],
    relatedLessonSlug: "/learn/javascript/js01-types-and-variables",
    relatedLessonName: "JS-01: JavaScript Data Types & Memory Allocation"
  },
  {
    id: "js-q20",
    trackKey: "javascript",
    category: "Browser APIs & Concurrency",
    subtopic: "Web Workers",
    type: "scenario",
    difficulty: "hard",
    source: "curated",
    question: "What are Web Workers, when should you use them, and how do they communicate with the main thread?",
    answer: `### Simple answer:
Web Workers let you run JavaScript code on a background thread separate from the browser's main UI thread, so heavy computations don't freeze the user interface.

### Why they are needed:
Because JavaScript on the main thread is single-threaded, running heavy tasks (like image processing, audio filtering, or heavy sorting) blocks UI rendering and user interactions, making the page lag or freeze.

### How they work:
- Web Workers run in a separate global context (\`self\` / \`DedicatedWorkerGlobalScope\`).
- They **cannot access the DOM directly** (\`document\`, \`window\`), but they have access to \`fetch\`, \`IndexedDB\`, \`setTimeout\`, and \`crypto\`.
- Communication happens via message passing: **\`postMessage()\`** and the **\`onmessage\`** event listener.

### Example:
\`\`\`javascript
// main.js:
const worker = new Worker("worker.js");

// Send data to worker
worker.postMessage({ numbers: [5000000, 3000000] });

// Receive result
worker.onmessage = (e) => {
  console.log("Calculated result:", e.data.result);
};

// worker.js (runs in background thread):
self.onmessage = (e) => {
  const { numbers } = e.data;
  const result = numbers.reduce((a, b) => a + b, 0); // heavy calculation
  self.postMessage({ result });
};
\`\`\`

### Interview answer:
Web Workers provide true background multi-threading in browsers for CPU-heavy tasks. They prevent the UI from freezing by offloading work to a worker thread and communicating with the main thread using asynchronous \`postMessage\` messaging.`,
    followUps: [
      "What is the difference between Dedicated Workers, Shared Workers, and Service Workers?",
      "How does Transferable Objects (like ArrayBuffer) avoid expensive cloning overhead in postMessage?",
      "Why can't Web Workers access the DOM directly?"
    ],
    keyPoints: [
      "Web Workers run scripts in background threads independent of main UI thread",
      "Prevents heavy CPU operations from blocking user interactions and animations",
      "No direct DOM access; communicate via postMessage and onmessage",
      "Can transfer memory ownership using Transferable Objects (ArrayBuffer)"
    ],
    tags: ["web-workers", "concurrency", "multi-threading", "performance", "browser-apis"],
    relatedLessonSlug: "/learn/javascript/js07-event-loop-microtasks",
    relatedLessonName: "JS-07: The Event Loop & Microtasks"
  }
];
