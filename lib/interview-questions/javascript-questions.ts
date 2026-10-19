import { InterviewQuestion } from "@/types/interview";

export const JAVASCRIPT_QUESTIONS: InterviewQuestion[] = [
  {
    "id": "js-q01",
    "trackKey": "javascript",
    "category": "Event Loop & Async",
    "subtopic": "Event Loop",
    "type": "conceptual",
    "difficulty": "medium",
    "source": "curated",
    "question": "How does the JavaScript Event Loop work, and what is the difference between the Call Stack, Microtask Queue, and Macrotask Queue?",
    "answer": "### Simple answer:\nThe Event Loop constantly checks if the call stack is empty. When the call stack is empty, it grabs waiting tasks from queues (first microtasks like Promises, then macrotasks like timers) and runs them one by one.\n\n### How it works:\n1. **Call Stack:** JavaScript runs normal, synchronous code one line at a time from top to bottom.\n2. **Microtask Queue (VIP Fast Track):** As soon as the call stack is empty, the event loop runs **all** waiting microtasks before touching anything else.\n   - Examples: `Promise.then / catch / finally`, `queueMicrotask()`.\n3. **Macrotask Queue (General Tasks):** The event loop takes **one** task from this queue, places it on the call stack, and runs it.\n   - Examples: `setTimeout`, `setInterval`, user clicks, and network events.\n4. After that macrotask finishes, the event loop drains any new microtasks that were scheduled before taking the next macrotask.\n\n### Interview answer:\nJavaScript is single-threaded and executes synchronous code on the call stack. When background tasks complete, microtasks (like Promises) always run first as soon as the stack clears, followed by macrotasks (like `setTimeout`). This keeps web pages responsive without freezing the browser screen.",
    "followUps": [
      "What happens if a microtask recursively enqueues another microtask?",
      "Why does `process.nextTick` run before `Promise.then` in Node.js?",
      "Can heavy synchronous code cause UI freezing in the browser?"
    ],
    "keyPoints": [
      "JavaScript single-threaded call stack execution",
      "Microtasks drain completely before the next macrotask is dequeued",
      "Promises and queueMicrotask belong to microtasks",
      "setTimeout and setInterval belong to macrotasks (task queue)"
    ],
    "tags": [
      "event-loop",
      "asynchronous",
      "microtasks",
      "macrotasks",
      "promises"
    ],
    "relatedLessonSlug": "/learn/javascript/js23-the-event-loop",
    "relatedLessonName": "JS-23: The Event Loop & Concurrency: Call Stack & Task Queues"
  },
  {
    "id": "js-q02",
    "trackKey": "javascript",
    "category": "Closures & Scope",
    "subtopic": "Closures",
    "type": "coding",
    "difficulty": "easy",
    "source": "curated",
    "question": "What will this code log to the console, and why? How would you fix it to log 0, 1, 2?",
    "codeSnippet": "for (var i = 0; i < 3; i++) {\n  setTimeout(() => {\n    console.log(i);\n  }, 100);\n}",
    "expectedOutput": "3\n3\n3",
    "answer": "### Simple answer:\nIt logs `3`, `3`, `3` because `var` shares a single variable for the entire loop, and the timers run after the loop has already finished counting to 3.\n\n### How it works:\n1. `var` does not care about curly braces (it is function-scoped). There is only one variable `i` shared across all iterations.\n2. The loop runs immediately from start to finish, counting `i` up to `3`.\n3. When the timers finally run ~100ms later, they all look at that same variable `i`, which is now `3`.\n\n### Fix 1: Use `let` (Recommended)\n`let` lives inside curly braces and creates a brand-new variable for every step of the loop:\n```javascript\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Outputs: 0, 1, 2\n```\n\n### Fix 2: Wrap in a function (Closure)\nYou can pass `i` into a helper function that remembers the value for that specific step:\n```javascript\nfor (var i = 0; i < 3; i++) {\n  ((stepNumber) => {\n    setTimeout(() => console.log(stepNumber), 100);\n  })(i);\n}\n```\n\n### Interview answer:\nBecause `var` is function-scoped, all timer callbacks share the exact same variable after the loop finishes counting to 3. Replacing `var` with `let` solves the problem because `let` has block scope, creating a fresh variable for each iteration of the loop.",
    "followUps": [
      "How does the compiler treat `let` inside a `for` loop header differently than `var`?",
      "What is the Temporal Dead Zone (TDZ) with `let` and `const`?",
      "Can closures cause memory leaks in long-running single-page applications?"
    ],
    "keyPoints": [
      "var is function-scoped while let is block-scoped",
      "Synchronous loop completes before macrotask callbacks run",
      "let creates a distinct binding per loop iteration",
      "Closures capture variables by reference, not value snapshot"
    ],
    "tags": [
      "closures",
      "scoping",
      "var-let-const",
      "asynchronous"
    ],
    "relatedLessonSlug": "/learn/javascript/js08-closures",
    "relatedLessonName": "JS-08: Closures: How Functions Remember Their Birthplace"
  },
  {
    "id": "js-q03",
    "trackKey": "javascript",
    "category": "Prototypes & Inheritance",
    "subtopic": "Prototypes",
    "type": "conceptual",
    "difficulty": "medium",
    "source": "curated",
    "question": "Explain prototypical inheritance in JavaScript. What is the difference between `__proto__` and `prototype`?",
    "answer": "### Simple answer:\nIn JavaScript, objects can borrow properties and methods directly from other objects through a chain called the prototype chain.\n\n### How it works:\n1. When you ask for a property or method on an object (like `user.greet()`), JavaScript first looks on the object itself.\n2. If it cannot find it, it looks up at the object's prototype.\n3. It keeps searching up the chain until it finds the property or reaches the top (`null`).\n4. **`prototype` vs `__proto__`:**\n   - `ConstructorFunction.prototype` is the shared blueprint attached to functions.\n   - `instance.__proto__` is the internal link that points to that shared blueprint.\n\n### Code Example:\n```javascript\nfunction Person(name) {\n  this.name = name;\n}\n\n// Attach a shared method once:\nPerson.prototype.sayHello = function() {\n  return `Hello, I am ${this.name}`;\n};\n\nconst alice = new Person(\"Alice\");\nconsole.log(alice.sayHello()); // \"Hello, I am Alice\"\nconsole.log(alice.hasOwnProperty(\"sayHello\")); // false (borrowed from prototype!)\n```\n\n### Interview answer:\nJavaScript objects inherit features directly from other objects through the prototype chain. If an object does not have a property, JavaScript searches up the chain to find it on its prototype. Modern ES6 classes use this exact same prototype system under the hood.",
    "followUps": [
      "Why is accessing or mutating `__proto__` deprecated in modern JavaScript?",
      "How does `Object.create(proto)` work under the hood?",
      "What are the performance implications of deep prototype chains?"
    ],
    "keyPoints": [
      "Every object links to a prototype forming a chain up to null",
      "prototype property is on constructors; [[Prototype]] is on instances",
      "ES6 classes are syntactic sugar over prototypal delegation",
      "Use Object.getPrototypeOf() instead of __proto__"
    ],
    "tags": [
      "prototypes",
      "inheritance",
      "oop",
      "objects"
    ],
    "relatedLessonSlug": "/learn/javascript/js18-prototypes-and-prototype-chain",
    "relatedLessonName": "JS-18: Prototypes & The Prototype Chain: JavaScript's Inheritance"
  },
  {
    "id": "js-q04",
    "trackKey": "javascript",
    "category": "Asynchronous Programming",
    "subtopic": "Promises",
    "type": "conceptual",
    "difficulty": "medium",
    "source": "curated",
    "question": "Compare `Promise.all`, `Promise.allSettled`, `Promise.race`, and `Promise.any`. When would you choose each?",
    "answer": "### Simple answer:\nThese four methods handle multiple asynchronous promises at the same time, but they resolve or fail in different ways:\n\n| Method | Resolves When | Rejects When | Best Use Case |\n|---|---|---|---|\n| **`Promise.all`** | **All** promises resolve | **Any single** promise rejects (fail-fast) | Operations that all need to succeed together (e.g. user details and permissions) |\n| **`Promise.allSettled`** | **All** promises finish (resolved or rejected) | **Never rejects**; returns array of status objects | Independent operations where you want results regardless of errors (e.g. bulk notifications) |\n| **`Promise.race`** | **First** promise to finish (either resolve OR reject) | **First** promise to reject (if it finishes first) | Request timeout wrappers (race API fetch against a timer) |\n| **`Promise.any`** | **First** promise to **resolve** successfully | **All** promises reject (`AggregateError`) | Fallback sources (e.g. ping multiple mirrors; take the first successful response) |\n\n### Example:\n```javascript\n// Timeout pattern using Promise.race:\nconst timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error(\"Timeout\")), ms));\nconst data = await Promise.race([fetchData(), timeout(5000)]);\n```\n\n### Interview answer:\nUse `Promise.all` when all tasks must succeed. Use `Promise.allSettled` when you need to know the outcome of every task even if some fail. Use `Promise.race` for the fastest result or timeouts, and `Promise.any` for the first successful result among multiple fallbacks.",
    "followUps": [
      "What is an AggregateError in Promise.any?",
      "How do you cancel an inflight fetch request when Promise.race times out?",
      "Does Promise.all execute tasks in parallel or concurrently?"
    ],
    "keyPoints": [
      "Promise.all fails fast on the first rejection",
      "Promise.allSettled waits for all and never rejects",
      "Promise.race takes the first settled (resolved or rejected)",
      "Promise.any ignores rejections until all fail"
    ],
    "tags": [
      "promises",
      "async",
      "concurrency",
      "error-handling"
    ],
    "relatedLessonSlug": "/learn/javascript/js21-promises-and-chaining",
    "relatedLessonName": "JS-21: Promises: Managing Future Values with .then() & .catch()"
  },
  {
    "id": "js-q05",
    "trackKey": "javascript",
    "category": "Memory & Performance",
    "subtopic": "Garbage Collection",
    "type": "conceptual",
    "difficulty": "hard",
    "source": "curated",
    "question": "What causes memory leaks in modern JavaScript applications, and how do you detect and fix them?",
    "answer": "### Simple answer:\nA memory leak happens when your application keeps holding references to objects it no longer needs, preventing JavaScript's garbage collector from freeing that memory.\n\n### Common Causes:\n1. **Accidental Global Variables:** Assigning to undeclared variables attaches them to `window` or `globalThis`.\n2. **Forgotten Timers / Intervals:** A `setInterval` running in the background holding references to large objects or unmounted components.\n3. **Uncleared Event Listeners:** Adding DOM event listeners or observers without removing them when components unmount.\n4. **Detached DOM Nodes:** Holding a JavaScript variable referencing a DOM element that was removed from the HTML page.\n5. **Closures Retaining Unneeded Scope:** Functions capturing large variables in outer scopes that remain alive longer than needed.\n\n### Detection & Prevention:\n- Use **Chrome DevTools Memory tab**: Take Heap Snapshots before and after user interactions to look for retained object size.\n- Clean up timers (`clearInterval`) and event listeners (`removeEventListener`) inside lifecycle cleanup functions.\n- Use `WeakMap` or `WeakSet` for caches because their entries are collected automatically when keys have no other references.\n\n### Interview answer:\nMemory leaks occur when unused objects remain reachable from the root. The most common causes are uncancelled `setInterval` timers, unremoved DOM event listeners, and detached DOM nodes. We detect them using Chrome DevTools heap snapshots and fix them by properly cleaning up resources when components unmount.",
    "followUps": [
      "How does the Mark-and-Sweep garbage collection algorithm work?",
      "What is the difference between shallow size and retained size in heap snapshots?",
      "How do WeakMap and WeakSet help prevent memory leaks?"
    ],
    "keyPoints": [
      "Mark-and-sweep cannot collect objects reachable from root",
      "Forgotten intervals and uncleared DOM listeners are the #1 source",
      "Detached DOM nodes keep entire subtrees in memory",
      "WeakMap and WeakSet prevent reference retention"
    ],
    "tags": [
      "memory-leaks",
      "garbage-collection",
      "performance",
      "devtools"
    ],
    "relatedLessonSlug": "/learn/javascript/js30-browser-storage-and-debugging",
    "relatedLessonName": "JS-30: Browser Storage (localStorage) & DevTools Debugging"
  },
  {
    "id": "js-q06",
    "trackKey": "javascript",
    "category": "Data Types & Fundamentals",
    "subtopic": "Types",
    "type": "conceptual",
    "difficulty": "easy",
    "source": "curated",
    "question": "What is the difference between Primitive types and Reference types in JavaScript?",
    "answer": "### Simple answer:\nPrimitive types store their actual value directly in memory and cannot be changed in place. Reference types (like objects and lists) store a memory address that points to where the data lives.\n\n### How it works:\n1. **Primitives (7 types):** `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, and `bigint`.\n   - Copying a primitive makes a completely separate, independent copy of the value.\n2. **References:** Objects, Arrays, and Functions.\n   - Copying a reference variable only copies the memory address. Both variables now point to the exact same object in memory!\n\n### Code Example:\n```javascript\n// Primitives: independent copies\nlet a = 10;\nlet b = a;\nb = 20;\nconsole.log(a); // 10 (unchanged!)\n\n// References: shared memory\nconst original = { name: \"Maya\" };\nconst copy = original;\ncopy.name = \"Alex\";\nconsole.log(original.name); // \"Alex\" (changed because both share the same object!)\n```\n\n### Interview answer:\nPrimitives are copied by value, meaning changing one variable never affects another. Objects and arrays are copied by reference, meaning two variables point to the same memory location, so changing properties through one variable updates the object for both.",
    "followUps": [
      "Why are primitive strings able to call methods like .toUpperCase()?",
      "What is boxing and unboxing in JavaScript?",
      "How do you compare two objects by value instead of reference?"
    ],
    "keyPoints": [
      "7 primitive types: string, number, boolean, null, undefined, symbol, bigint",
      "Primitives are immutable and passed by value",
      "Objects, arrays, and functions are mutable and passed by reference",
      "Assigning an object copies the reference address, not the underlying data"
    ],
    "tags": [
      "primitives",
      "reference-types",
      "data-types",
      "memory"
    ],
    "relatedLessonSlug": "/learn/javascript/js02-variables-and-data-types",
    "relatedLessonName": "JS-02: Variables & Data Types: Storing Data with let & const"
  },
  {
    "id": "js-q07",
    "trackKey": "javascript",
    "category": "Equality & Operators",
    "subtopic": "Type Conversion & Equality",
    "type": "conceptual",
    "difficulty": "easy",
    "source": "curated",
    "question": "What is the difference between `==` and `===` in JavaScript, and what is type coercion?",
    "answer": "### Simple answer:\n`==` (double equals) compares values after converting them to the same type, while `===` (triple equals) checks both the value and the type without guessing or changing types behind your back.\n\n### How it works:\n- **Type conversion (coercion):** JavaScript automatically converts one data type to another during operations.\n  - `5 == \"5\"` is `true` because the text `\"5\"` is converted to the number `5`.\n  - `0 == false` is `true` because `false` is converted to `0`.\n- **Strict equality (`===`):**\n  - `5 === \"5\"` is `false` because number does not match string.\n  - `0 === false` is `false` because number does not match boolean.\n\n### Interview answer:\nAlways use `===` because it checks both the value and the type, preventing surprising conversion bugs. The only common exception is checking `x == null`, which is a neat shortcut to check for both `null` and `undefined` at the same time.",
    "followUps": [
      "When is it acceptable or common to use loose equality `==`?",
      "What does Object.is() do differently than `===`?",
      "Why is NaN === NaN false?"
    ],
    "keyPoints": [
      "=== checks both value and type without conversion",
      "== performs implicit type coercion before comparison",
      "x == null checks for both null and undefined",
      "NaN === NaN is false; use Number.isNaN(x)"
    ],
    "tags": [
      "equality",
      "type-coercion",
      "operators",
      "comparison"
    ],
    "relatedLessonSlug": "/learn/javascript/js03-operators-and-equality",
    "relatedLessonName": "JS-03: Operators, Equality & Type Coercion: The === Rule"
  },
  {
    "id": "js-q08",
    "trackKey": "javascript",
    "category": "Data Types & Fundamentals",
    "subtopic": "Null vs Undefined",
    "type": "conceptual",
    "difficulty": "easy",
    "source": "curated",
    "question": "What is the difference between `null` and `undefined` in JavaScript?",
    "answer": "### Simple answer:\n`undefined` means a variable has been declared but not yet assigned a value, while `null` is an intentional assignment representing \"no value\" or \"empty\".\n\n### How it works:\n- **`undefined`:** Default value provided by JavaScript when something is missing:\n  - Declared variables with no value: `let x;`\n  - Function parameters that were not passed\n  - Functions with no explicit `return` statement\n  - Non-existent properties on an object\n- **`null`:** Explicitly set by developers to indicate an empty or reset object reference.\n\n### Example:\n```javascript\nlet user;\nconsole.log(user); // undefined (not assigned yet)\n\nlet activeUser = null; // explicitly set to empty\n\nconsole.log(typeof undefined); // \"undefined\"\nconsole.log(typeof null);      // \"object\" (famous historical JS bug!)\n\nconsole.log(null == undefined);  // true\nconsole.log(null === undefined); // false\n```\n\n### Interview answer:\n`undefined` is JavaScript's default for uninitialized variables or missing inputs. `null` is an intentional value assigned by developers to represent an empty or non-existent object. Also, `typeof null` returns `\"object\"` due to an early JavaScript bug.",
    "followUps": [
      "Why does typeof null return 'object'?",
      "How does optional chaining (?.) and nullish coalescing (??) treat null vs undefined?",
      "What is the difference between ?? and ||?"
    ],
    "keyPoints": [
      "undefined = variable declared with no value assigned",
      "null = intentional absence of any object value",
      "typeof undefined is 'undefined', typeof null is 'object'",
      "null == undefined is true, but null === undefined is false"
    ],
    "tags": [
      "null",
      "undefined",
      "types",
      "fundamentals"
    ],
    "relatedLessonSlug": "/learn/javascript/js02-variables-and-data-types",
    "relatedLessonName": "JS-02: Variables & Data Types: Storing Data with let & const"
  },
  {
    "id": "js-q09",
    "trackKey": "javascript",
    "category": "Functions & Scope",
    "subtopic": "Arrow Functions",
    "type": "conceptual",
    "difficulty": "medium",
    "source": "curated",
    "question": "What are the key differences between Arrow Functions and Regular Functions in JavaScript?",
    "answer": "### Simple answer:\nArrow functions (`() => {}`) provide a shorter way to write functions and automatically borrow `this` from the surrounding code where they were written. Regular functions determine `this` based on who called them.\n\n### Key Differences:\n1. **`this` Keyword:**\n   - Regular functions get their `this` from who calls them at runtime (left of the dot).\n   - Arrow functions borrow `this` directly from the surrounding code where the arrow function was created.\n2. **Constructors:** Regular functions can be called with `new` to create objects; arrow functions cannot.\n3. **Arguments:** Regular functions have a built-in `arguments` object; arrow functions use modern Rest parameters (`...args`).\n\n### Interview answer:\nThe main difference is how `this` works. Arrow functions do not have their own `this`; they borrow it from the code around them, which makes them ideal for callbacks and timers. Regular functions are best when you need dynamic `this` for object methods.",
    "followUps": [
      "Can you change an arrow function's `this` using call, apply, or bind?",
      "Why should you avoid using arrow functions as object methods?",
      "How do rest parameters replace the arguments object?"
    ],
    "keyPoints": [
      "Arrow functions lexically inherit this from outer scope",
      "Arrow functions cannot be used with new (no prototype)",
      "Arrow functions lack their own arguments object",
      "call, apply, and bind cannot re-bind an arrow function's this"
    ],
    "tags": [
      "arrow-functions",
      "this",
      "functions",
      "scope"
    ],
    "relatedLessonSlug": "/learn/javascript/js06-functions-and-arrow-syntax",
    "relatedLessonName": "JS-06: Functions: Parameters, Return Values & Arrow Syntax"
  },
  {
    "id": "js-q10",
    "trackKey": "javascript",
    "category": "Execution & Scope",
    "subtopic": "Hoisting",
    "type": "conceptual",
    "difficulty": "easy",
    "source": "curated",
    "question": "What is Hoisting in JavaScript? How do `var`, `let`, `const`, and function declarations behave?",
    "answer": "### Simple answer:\nHoisting is JavaScript's behavior of reading variable and function declarations before running any code. It allows you to call functions before the lines where they are defined.\n\n### How it works:\n1. **Function Declarations:** Fully hoisted. You can call `sayHi()` at the very top of your file, even if the function definition is at the bottom.\n2. **`var` Variables:** Hoisted, but set to `undefined`. If you read a `var` variable before its assignment line, you get `undefined` instead of an error.\n3. **`let` and `const` Variables:** Hoisted into scope, but locked in the **Temporal Dead Zone**. If you try to use them before their declaration line, JavaScript stops with a `ReferenceError`.\n\n### Interview answer:\nHoisting sets up declarations before the code runs. Function declarations are fully usable anywhere in their scope. `var` variables are hoisted with a value of `undefined`, while `let` and `const` stay in the Temporal Dead Zone and cannot be accessed before their declaration line.",
    "followUps": [
      "What is the Temporal Dead Zone (TDZ)?",
      "Are function expressions hoisted the same way as function declarations?",
      "What happens if a variable and function share the same name?"
    ],
    "keyPoints": [
      "Compilation allocates memory for declarations before execution",
      "Function declarations are hoisted with their complete body",
      "var is initialized to undefined upon hoisting",
      "let and const exist in TDZ until evaluated"
    ],
    "tags": [
      "hoisting",
      "var",
      "let",
      "const",
      "tdz"
    ],
    "relatedLessonSlug": "/learn/javascript/js06-functions-and-arrow-syntax",
    "relatedLessonName": "JS-06: Functions: Parameters, Return Values & Arrow Syntax"
  },
  {
    "id": "js-q11",
    "trackKey": "javascript",
    "category": "Arrays & Iteration",
    "subtopic": "Array Methods",
    "type": "practical",
    "difficulty": "easy",
    "source": "curated",
    "question": "Compare `map()`, `filter()`, `reduce()`, and `forEach()` in JavaScript. When should you use each?",
    "answer": "### Simple answer:\nThese are built-in array methods for working with list data, but they return different results and serve different purposes:\n\n- **`map()`: Transforms** every element and returns a **new array** of the exact same length.\n- **`filter()`: Selects** elements that pass a test and returns a **new array** of matching items.\n- **`reduce()`: Combines** all elements into a **single value** (like a sum, object, or grouped array).\n- **`forEach()`: Executes** a function for each element to perform **side effects** (like logging or updating DOM), returning `undefined`.\n\n### Example:\n```javascript\nconst numbers = [1, 2, 3, 4];\n\n// map: double every number -> [2, 4, 6, 8]\nconst doubled = numbers.map(n => n * 2);\n\n// filter: keep even numbers -> [2, 4]\nconst evens = numbers.filter(n => n % 2 === 0);\n\n// reduce: compute sum -> 10\nconst total = numbers.reduce((sum, n) => sum + n, 0);\n\n// forEach: print to console (no return array)\nnumbers.forEach(n => console.log(n));\n```\n\n### Interview answer:\nUse `map` when you want to transform items into a new array. Use `filter` when you want a subset of items. Use `reduce` when you need to condense the array into a single accumulated result. Use `forEach` only when you need side effects and do not need a new array.",
    "followUps": [
      "Can you break or return early from a forEach loop?",
      "Do map, filter, or reduce mutate the original array?",
      "How do you group an array of objects by category using reduce?"
    ],
    "keyPoints": [
      "map returns a new array with transformed items",
      "filter returns a new array with items matching a condition",
      "reduce returns a single accumulated value",
      "forEach returns undefined and is used for side effects"
    ],
    "tags": [
      "arrays",
      "map",
      "filter",
      "reduce",
      "forEach"
    ],
    "relatedLessonSlug": "/learn/javascript/js11-essential-array-methods",
    "relatedLessonName": "JS-11: Essential Array Methods: map, filter, find & reduce"
  },
  {
    "id": "js-q12",
    "trackKey": "javascript",
    "category": "Functions & Scope",
    "subtopic": "This Context",
    "type": "practical",
    "difficulty": "easy",
    "source": "curated",
    "question": "How do `call()`, `apply()`, and `bind()` work in JavaScript, and what are the differences between them?",
    "answer": "### Simple answer:\nAll three methods allow you to explicitly set what `this` refers to when calling a function.\n\n### Key Differences:\n- **`call(thisArg, arg1, arg2, ...)`:** Invokes the function **immediately**, passing arguments one by one (comma-separated).\n- **`apply(thisArg, [arg1, arg2, ...])`:** Invokes the function **immediately**, passing arguments as an **array**.\n- **`bind(thisArg, arg1, arg2, ...)`:** Does **not** invoke the function immediately. It returns a **brand new function** with `this` permanently bound.\n\n### Example:\n```javascript\nfunction introduce(greeting, punctuation) {\n  return `${greeting}, I am ${this.name}${punctuation}`;\n}\n\nconst user = { name: \"Sarah\" };\n\n// call: comma-separated arguments\nconsole.log(introduce.call(user, \"Hello\", \"!\")); // \"Hello, I am Sarah!\"\n\n// apply: array of arguments\nconsole.log(introduce.apply(user, [\"Hi\", \".\"])); // \"Hi, I am Sarah.\"\n\n// bind: returns a new reusable function\nconst sarahIntro = introduce.bind(user, \"Welcome\");\nconsole.log(sarahIntro(\"~\")); // \"Welcome, I am Sarah~\"\n```\n\n### Interview answer:\n`call` and `apply` run the function immediately with a specified `this` context—`call` takes arguments individually, while `apply` takes them as an array. `bind` returns a new function with `this` locked in for future calls.",
    "followUps": [
      "How do you remember the difference between call and apply? (Hint: C for Comma, A for Array)",
      "Can a function bound with bind() be rebound using another call() or bind()?",
      "What is partial application using bind()?"
    ],
    "keyPoints": [
      "call executes immediately with comma-separated arguments",
      "apply executes immediately with an array of arguments",
      "bind returns a new function without calling it immediately",
      "Useful for borrowing methods from other objects"
    ],
    "tags": [
      "this",
      "call",
      "apply",
      "bind",
      "functions"
    ],
    "relatedLessonSlug": "/learn/javascript/js17-the-this-keyword",
    "relatedLessonName": "JS-17: The this Keyword: Who Called Me?"
  },
  {
    "id": "js-q13",
    "trackKey": "javascript",
    "category": "Objects & Memory",
    "subtopic": "Cloning",
    "type": "practical",
    "difficulty": "medium",
    "source": "curated",
    "question": "What is the difference between a Shallow Copy and a Deep Copy in JavaScript? How do you create each?",
    "answer": "### Simple answer:\nA shallow copy copies top-level properties, but nested objects still share memory references. A deep copy duplicates everything at all nested levels, creating completely independent data.\n\n### How it works:\n- **Shallow Copy:**\n  - Using spread: `const copy = { ...original }`\n  - Using `Object.assign({}, original)`\n  - If `original.address.city` changes in the copy, it also changes in the original!\n- **Deep Copy:**\n  - Modern native standard: **`structuredClone(original)`** (handles Date, Map, Set, nested arrays, and circular references).\n  - Quick fallback: `JSON.parse(JSON.stringify(original))` (fails on Functions, Symbols, `undefined`, and Dates become strings).\n\n### Example:\n```javascript\nconst user = { name: \"Leo\", address: { city: \"Berlin\" } };\n\n// Shallow copy:\nconst shallow = { ...user };\nshallow.address.city = \"Munich\";\nconsole.log(user.address.city); // \"Munich\" (unintentionally changed original!)\n\n// Deep copy:\nconst deep = structuredClone(user);\ndeep.address.city = \"Hamburg\";\nconsole.log(user.address.city); // Still \"Munich\" (independent copy)\n```\n\n### Interview answer:\nShallow copies only clone top-level properties, leaving nested objects linked by reference. Deep copies clone every nested layer. In modern JavaScript, use the native `structuredClone()` function for deep copying objects cleanly.",
    "followUps": [
      "What are the limitations of JSON.parse(JSON.stringify()) for deep copying?",
      "Can structuredClone copy functions or DOM nodes?",
      "How does lodash.cloneDeep work compared to structuredClone?"
    ],
    "keyPoints": [
      "Shallow copy copies references for nested objects",
      "Spread operator ({ ...obj }) and Object.assign create shallow copies",
      "structuredClone() is the standard modern deep copy method",
      "JSON serialization drops functions, undefined, and converts Dates to strings"
    ],
    "tags": [
      "shallow-copy",
      "deep-copy",
      "structuredClone",
      "objects"
    ],
    "relatedLessonSlug": "/learn/javascript/js13-object-references-and-copying",
    "relatedLessonName": "JS-13: Object References & Immutability: Shallow vs Deep Copy"
  },
  {
    "id": "js-q14",
    "trackKey": "javascript",
    "category": "Performance & Optimization",
    "subtopic": "Rate Limiting",
    "type": "practical",
    "difficulty": "medium",
    "source": "curated",
    "question": "What is the difference between Debouncing and Throttling? How do you implement a simple debounce function?",
    "answer": "### Simple answer:\nBoth limit how often a function executes during rapid events, but:\n- **Debounce:** Waits until the user **stops** triggering the event for a specified delay before running.\n- **Throttle:** Guarantees the function runs at most **once every fixed interval**, no matter how many times it is triggered.\n\n### When to use which:\n- **Debounce:** Search bar auto-complete (wait until user stops typing), window resize calculations, saving drafts after typing.\n- **Throttle:** Scroll position tracking, infinite scrolling, game loop input, mousemove tracking.\n\n### Simple Debounce Implementation:\n```javascript\nfunction debounce(fn, delay) {\n  let timerId;\n  return function(...args) {\n    clearTimeout(timerId); // reset timer on every new call\n    timerId = setTimeout(() => {\n      fn.apply(this, args);\n    }, delay);\n  };\n}\n\n// Usage:\nconst handleSearch = debounce((query) => {\n  console.log(\"Searching for:\", query);\n}, 300);\n```\n\n### Interview answer:\nDebounce delays execution until a pause in activity (like waiting for typing to stop in a search bar). Throttle ensures the function runs at a steady, fixed rate (like reading scroll events at most once every 200ms).",
    "followUps": [
      "How do you implement immediate/leading edge execution in debounce?",
      "How do you cancel a pending debounced call when a component unmounts?",
      "Why is throttle preferred over debounce for scroll event listeners?"
    ],
    "keyPoints": [
      "Debounce waits for silence/inactivity before executing",
      "Throttle enforces a maximum execution frequency over time",
      "Debounce uses clearTimeout and setTimeout",
      "Essential for preventing expensive calculations or API calls on frequent events"
    ],
    "tags": [
      "debounce",
      "throttle",
      "performance",
      "timers"
    ],
    "relatedLessonSlug": "/learn/javascript/js20-synchronous-vs-asynchronous",
    "relatedLessonName": "JS-20: Synchronous vs Asynchronous: Why JavaScript Never Freezes"
  },
  {
    "id": "js-q15",
    "trackKey": "javascript",
    "category": "DOM & Events",
    "subtopic": "Event Propagation",
    "type": "conceptual",
    "difficulty": "medium",
    "source": "curated",
    "question": "Explain Event Bubbling, Event Capturing, and Event Delegation in the browser DOM.",
    "answer": "### Simple answer:\nWhen an event happens on a web page, it travels through three phases: down from the document (capturing), hits the target element, and then travels back up to the document (bubbling).\n\n### The Three Phases:\n1. **Capturing Phase:** Event travels down from `window` -> `document` -> parent elements -> target.\n2. **Target Phase:** Event reaches the element that was actually clicked (`event.target`).\n3. **Bubbling Phase (Default):** Event bubbles back up from target -> parent elements -> `document` -> `window`.\n\n### What is Event Delegation?\nInstead of adding event listeners to 100 individual list items, you attach **one listener to their common parent**. When an item is clicked, the event bubbles up to the parent, and you check `event.target`.\n\n```javascript\n// Event Delegation on a list:\ndocument.querySelector(\"#item-list\").addEventListener(\"click\", (e) => {\n  if (e.target.matches(\"li.delete-btn\")) {\n    console.log(\"Deleted item:\", e.target.dataset.id);\n  }\n});\n```\n\n### Stopping Propagation:\n- `event.stopPropagation()`: Stops the event from traveling further up or down.\n- `event.preventDefault()`: Prevents default browser action (like navigating an `<a>` tag or submitting a form).\n\n### Interview answer:\nEvents travel down in the capturing phase and bubble up in the bubbling phase. Event delegation takes advantage of bubbling by placing a single listener on a parent element to handle events for all children, saving memory and automatically handling dynamically added items.",
    "followUps": [
      "What is the difference between event.target and event.currentTarget?",
      "How do you configure an event listener to run during the capturing phase instead of bubbling?",
      "Why is event delegation beneficial for dynamic content added after page load?"
    ],
    "keyPoints": [
      "Event propagation phases: Capturing -> Target -> Bubbling",
      "addEventListener defaults to bubbling (use third param true for capturing)",
      "Event delegation attaches one listener to a parent element",
      "target is what was clicked; currentTarget is element holding the listener"
    ],
    "tags": [
      "events",
      "bubbling",
      "capturing",
      "delegation",
      "dom"
    ],
    "relatedLessonSlug": "/learn/javascript/js29-events-and-delegation",
    "relatedLessonName": "JS-29: Events, Event Listeners & Event Delegation"
  },
  {
    "id": "js-q16",
    "trackKey": "javascript",
    "category": "Execution & Scope",
    "subtopic": "Scope Chain",
    "type": "conceptual",
    "difficulty": "easy",
    "source": "curated",
    "question": "What is Scope and the Scope Chain in JavaScript? What are Global, Function, and Block scopes?",
    "answer": "### Simple answer:\nScope determines where variables can be accessed in your code. The Scope Chain is the lookup mechanism JavaScript uses to find variables from inner scopes to outer scopes.\n\n### The Three Scopes:\n1. **Global Scope:** Variables declared outside any function or block. Accessible everywhere in the application.\n2. **Function Scope:** Variables declared inside a function (e.g. with `var`, `let`, or `const`). Accessible only inside that function.\n3. **Block Scope:** Variables declared with `let` or `const` inside curly braces `{ ... }` (like inside `if`, `for`, or `while` blocks). Accessible only within that block.\n\n### How the Scope Chain works:\nWhen JavaScript looks for a variable, it starts in the local scope. If not found, it steps outward to the parent scope, continuing up the chain until it reaches the global scope. If still not found, it throws a `ReferenceError`.\n\n```javascript\nconst globalName = \"LearnCraft\";\n\nfunction outer() {\n  const outerVal = 10;\n  function inner() {\n    const innerVal = 20;\n    // Looks up innerVal (local) -> outerVal (parent) -> globalName (global)\n    console.log(innerVal + outerVal, globalName);\n  }\n  inner();\n}\nouter();\n```\n\n### Interview answer:\nScope controls variable visibility. JavaScript has global scope, function scope, and block scope (introduced with `let` and `const`). When reading a variable, JavaScript searches from the current local scope up through enclosing parent scopes to the global scope via the scope chain.",
    "followUps": [
      "What is lexical scoping (static scoping)?",
      "What is variable shadowing in JavaScript?",
      "Why does assigning to an undeclared variable without var/let create an accidental global in non-strict mode?"
    ],
    "keyPoints": [
      "Global scope is accessible everywhere",
      "var is function-scoped; let and const are block-scoped",
      "Scope chain resolves variables from innermost to outermost",
      "Strict mode ('use strict') prevents accidental globals"
    ],
    "tags": [
      "scope",
      "scope-chain",
      "block-scope",
      "variables"
    ],
    "relatedLessonSlug": "/learn/javascript/js07-scope-global-function-block",
    "relatedLessonName": "JS-07: Scope: Global, Function, and Block Scope"
  },
  {
    "id": "js-q17",
    "trackKey": "javascript",
    "category": "Asynchronous Programming",
    "subtopic": "Async Await",
    "type": "practical",
    "difficulty": "medium",
    "source": "curated",
    "question": "How does `async/await` work under the hood, and how should you handle errors in asynchronous code?",
    "answer": "### Simple answer:\n`async/await` is a modern, clean way to work with Promises. An `async` function always returns a Promise. The `await` keyword pauses the function until the background task finishes, letting you write asynchronous code that reads just like step-by-step instructions.\n\n### How it works:\n1. Any function marked with `async` wraps its return value in a Promise automatically.\n2. When JavaScript sees `await promise`, it pauses that function and lets other tasks run in the background.\n3. Once the promise finishes, the rest of the function resumes.\n4. You catch errors using standard, familiar `try...catch` blocks.\n\n### Avoiding Slow Code (The Waterfall Trap):\n```javascript\n// ❌ Slow: Waits for user, THEN waits for posts (takes 2 seconds)\nconst user = await fetchUser();\nconst posts = await fetchPosts();\n\n// ✅ Fast: Runs both at the same time (takes only 1 second)\nconst [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);\n```\n\n### Interview answer:\n`async/await` is a cleaner way to work with Promises without messy callback chains. An `async` function always returns a promise, and `await` pauses execution until that promise settles. We handle errors cleanly using standard `try...catch` blocks.",
    "followUps": [
      "What happens if you await a non-promise value?",
      "How does top-level await work in ES modules?",
      "Why is an async waterfall bad for application performance?"
    ],
    "keyPoints": [
      "async functions always return a Promise",
      "await pauses function execution until promise settles",
      "Use try/catch for robust error handling",
      "Avoid sequential awaits for independent calls; use Promise.all"
    ],
    "tags": [
      "async-await",
      "promises",
      "error-handling",
      "asynchronous"
    ],
    "relatedLessonSlug": "/learn/javascript/js22-async-await",
    "relatedLessonName": "JS-22: Async/Await: Clean Asynchronous Workflows"
  },
  {
    "id": "js-q18",
    "trackKey": "javascript",
    "category": "Functional Programming",
    "subtopic": "Currying",
    "type": "practical",
    "difficulty": "medium",
    "source": "curated",
    "question": "What is Currying in JavaScript, and what are its practical benefits?",
    "answer": "### Simple answer:\nCurrying is a technique where a function with multiple arguments is transformed into a sequence of nested functions that each take a single argument.\n\n### How it works:\nInstead of calling `fn(a, b, c)`, you call `fn(a)(b)(c)`.\n\n### Example:\n```javascript\n// Normal function\nfunction add(a, b) {\n  return a + b;\n}\n\n// Curried function\nfunction curriedAdd(a) {\n  return function(b) {\n    return a + b;\n  };\n}\n\nconst addFive = curriedAdd(5); // partially applied\nconsole.log(addFive(10)); // 15\nconsole.log(addFive(20)); // 25\n```\n\n### Practical Use Case: Reusable Utilities & Logging\n```javascript\nconst logger = (level) => (prefix) => (message) => {\n  console.log(`[${level}] [${prefix}]: ${message}`);\n};\n\nconst errorLogger = logger(\"ERROR\")(\"AuthService\");\nerrorLogger(\"Invalid password\"); // [ERROR] [AuthService]: Invalid password\n```\n\n### Interview answer:\nCurrying transforms a function that takes multiple arguments into nested unary functions. It enables partial application—creating specialized helper functions by locking in configuration arguments ahead of time, which makes code cleaner and more composable.",
    "followUps": [
      "What is the difference between Currying and Partial Application?",
      "How do you write a generic curry(fn) utility that works with any function length?",
      "How is currying used in middleware pipelines (like Redux middleware)?"
    ],
    "keyPoints": [
      "Converts f(a, b) into f(a)(b)",
      "Relies on closures to remember earlier arguments",
      "Enables function composition and reusable specialized helpers",
      "Widely used in functional libraries and Redux middleware"
    ],
    "tags": [
      "currying",
      "functional-programming",
      "closures",
      "functions"
    ],
    "relatedLessonSlug": "/learn/javascript/js09-callbacks-and-higher-order-functions",
    "relatedLessonName": "JS-09: Callbacks & Higher-Order Functions: Functions as Data"
  },
  {
    "id": "js-q19",
    "trackKey": "javascript",
    "category": "Objects & Data Safety",
    "subtopic": "Object Methods",
    "type": "practical",
    "difficulty": "medium",
    "source": "curated",
    "question": "What is the difference between `Object.freeze()` and `Object.seal()` in JavaScript?",
    "answer": "### Simple answer:\nBoth make an object more restrictive, but `Object.freeze()` makes it completely read-only, while `Object.seal()` still allows you to change existing property values.\n\n### Comparison:\n| Capability | Normal Object | `Object.seal()` | `Object.freeze()` |\n|---|---|---|---|\n| **Add new properties** | Yes | ❌ No | ❌ No |\n| **Delete existing properties** | Yes | ❌ No | ❌ No |\n| **Modify existing values** | Yes | **Yes** | ❌ No |\n| **Reconfigure descriptors** | Yes | ❌ No | ❌ No |\n\n### Example:\n```javascript\nconst sealedObj = Object.seal({ id: 1, name: \"Alice\" });\nsealedObj.name = \"Bob\";   // Allowed! Updates to \"Bob\"\nsealedObj.age = 30;       // Ignored (or TypeError in strict mode)\ndelete sealedObj.id;      // Ignored (cannot delete)\n\nconst frozenObj = Object.freeze({ id: 1, name: \"Alice\" });\nfrozenObj.name = \"Bob\";   // Ignored (cannot mutate)\nfrozenObj.age = 30;       // Ignored (cannot add)\ndelete frozenObj.id;      // Ignored (cannot delete)\n```\n\n### Important Caveat: Shallow Freeze\nBoth methods are **shallow**. Nested objects inside a frozen object can still be mutated unless you implement a deep freeze recursive helper.\n\n### Interview answer:\n`Object.seal()` prevents adding or deleting properties, but permits modifying existing values. `Object.freeze()` is stricter: it prevents adding, deleting, and modifying existing properties. Both are shallow operations.",
    "followUps": [
      "How do you implement a deepFreeze() utility function?",
      "How does Object.isFrozen() verify object state?",
      "Why does strict mode ('use strict') throw errors on frozen mutations while non-strict silently ignores them?"
    ],
    "keyPoints": [
      "seal prevents adding/deleting properties but allows value edits",
      "freeze prevents all additions, deletions, and value edits",
      "Both methods are shallow; nested objects remain mutable",
      "In strict mode, attempting forbidden mutations throws a TypeError"
    ],
    "tags": [
      "object-freeze",
      "object-seal",
      "immutability",
      "objects"
    ],
    "relatedLessonSlug": "/learn/javascript/js12-objects-and-methods",
    "relatedLessonName": "JS-12: Objects: Key-Value Pairs, Methods & Property Access"
  },
  {
    "id": "js-q20",
    "trackKey": "javascript",
    "category": "Browser APIs & Background Tasks",
    "subtopic": "Web Workers",
    "type": "scenario",
    "difficulty": "hard",
    "source": "curated",
    "question": "What are Web Workers, when should you use them, and how do they communicate with the main thread?",
    "answer": "### Simple answer:\nWeb Workers let you run JavaScript code on a background thread separate from the browser's main UI thread, so heavy computations don't freeze the user interface.\n\n### Why they are needed:\nBecause JavaScript on the main thread is single-threaded, running heavy tasks (like image processing, audio filtering, or heavy sorting) blocks UI rendering and user interactions, making the page lag or freeze.\n\n### How they work:\n- Web Workers run in a separate global context (`self` / `DedicatedWorkerGlobalScope`).\n- They **cannot access the DOM directly** (`document`, `window`), but they have access to `fetch`, `IndexedDB`, `setTimeout`, and `crypto`.\n- Communication happens via message passing: **`postMessage()`** and the **`onmessage`** event listener.\n\n### Example:\n```javascript\n// main.js:\nconst worker = new Worker(\"worker.js\");\n\n// Send data to worker\nworker.postMessage({ numbers: [5000000, 3000000] });\n\n// Receive result\nworker.onmessage = (e) => {\n  console.log(\"Calculated result:\", e.data.result);\n};\n\n// worker.js (runs in background thread):\nself.onmessage = (e) => {\n  const { numbers } = e.data;\n  const result = numbers.reduce((a, b) => a + b, 0); // heavy calculation\n  self.postMessage({ result });\n};\n```\n\n### Interview answer:\nWeb Workers provide true background multi-threading in browsers for CPU-heavy tasks. They prevent the UI from freezing by offloading work to a worker thread and communicating with the main thread using asynchronous `postMessage` messaging.",
    "followUps": [
      "What is the difference between Dedicated Workers, Shared Workers, and Service Workers?",
      "How does Transferable Objects (like ArrayBuffer) avoid expensive cloning overhead in postMessage?",
      "Why can't Web Workers access the DOM directly?"
    ],
    "keyPoints": [
      "Web Workers run scripts in background threads independent of main UI thread",
      "Prevents heavy CPU operations from blocking user interactions and animations",
      "No direct DOM access; communicate via postMessage and onmessage",
      "Can transfer memory ownership using Transferable Objects (ArrayBuffer)"
    ],
    "tags": [
      "web-workers",
      "concurrency",
      "multi-threading",
      "performance",
      "browser-apis"
    ],
    "relatedLessonSlug": "/learn/javascript/js20-synchronous-vs-asynchronous",
    "relatedLessonName": "JS-20: Synchronous vs Asynchronous: Why JavaScript Never Freezes"
  },
  {
    "id": "js-q21",
    "trackKey": "javascript",
    "category": "Data Types & Memory",
    "subtopic": "Primitives vs References",
    "type": "conceptual",
    "difficulty": "easy",
    "source": "curated",
    "question": "What are the primitive data types in JavaScript, how do they differ from Objects, and why does typeof null return 'object'?",
    "answer": "### Simple answer:\nJavaScript has 7 simple primitive data types (like text, numbers, and booleans). They store their values directly, and you cannot alter their inner parts. Objects, however, are collections of data stored by reference. The fact that `typeof null === \"object\"` is an old historical bug from the first version of JavaScript in 1995 that cannot be changed today without breaking existing websites.\n\n### The 7 Primitive Types:\n1. **string** (e.g., `\"hello\"`)\n2. **number** (e.g., `42`, `3.14`, `NaN`)\n3. **bigint** (e.g., `9007199254740991n`)\n4. **boolean** (e.g., `true`, `false`)\n5. **undefined** (a variable declared but not assigned a value)\n6. **symbol** (unique identifiers created with `Symbol()`)\n7. **null** (intentional absence of any object value)\n\n### Primitives vs Objects:\n- **Primitives are passed by value:** Copying a primitive copies the actual value into a new memory location. Modifying one does not affect the other.\n- **Primitives are immutable:** You cannot attach properties to primitives (e.g. `\"cat\".color = \"black\"` fails or is ignored).\n- **Objects are passed by reference:** Variables hold a pointer to the memory location where the object lives. Multiple variables pointing to the same object share mutations.\n\n### Why typeof null is \"object\":\nIn the original 1995 JavaScript implementation, values were represented with a type tag and a value. Objects had a type tag of `000`. Because `null` was represented as a NULL pointer (all zeros), its type tag was also `000`, making `typeof null` return `\"object\"`.\n\n### Interview answer:\nJavaScript has 7 primitive types: string, number, bigint, boolean, undefined, symbol, and null. Primitives are immutable and compared by value, whereas Objects are mutable and compared by memory reference. `typeof null` returning `\"object\"` is a famous legacy bug from the first version of JS.",
    "followUps": [
      "How do you reliably check if a value is strictly null?",
      "Why does string autoboxing allow calling methods like 'hello'.toUpperCase() on a primitive?",
      "What is the difference between null and undefined in API payloads?"
    ],
    "keyPoints": [
      "7 primitives: string, number, bigint, boolean, undefined, symbol, null",
      "Primitives are immutable and passed by value; objects are passed by reference",
      "typeof null returning 'object' is a legacy engine bug from 1995",
      "Reliable null check is value === null"
    ],
    "tags": [
      "primitives",
      "data-types",
      "typeof",
      "null-vs-undefined",
      "memory"
    ],
    "relatedLessonSlug": "/learn/javascript/js02-variables-and-data-types",
    "relatedLessonName": "JS-02: Variables & Data Types: Storing Data with let & const"
  },
  {
    "id": "js-q22",
    "trackKey": "javascript",
    "category": "Types & Type Coercion",
    "subtopic": "Type Checking",
    "type": "conceptual",
    "difficulty": "easy",
    "source": "curated",
    "question": "What is NaN, why does NaN === NaN evaluate to false, and how do you reliably check if a value is NaN?",
    "codeSnippet": "console.log(typeof NaN);\nconsole.log(NaN === NaN);\nconsole.log(isNaN(\"hello\"));\nconsole.log(Number.isNaN(\"hello\"));",
    "expectedOutput": "number\nfalse\ntrue\nfalse",
    "answer": "### Simple answer:\n`NaN` stands for \"Not-a-Number\", but ironically its data type is `\"number\"`. `NaN` stands for 'Not-a-Number', but JavaScript ironically categorizes it as a number! It represents an impossible math calculation (like dividing zero by zero). It is special because it is the only value in all of JavaScript that is never equal to itself.\n\n### Why NaN === NaN is false:\nAccording to IEEE 754, two invalid mathematical calculations are not necessarily identical values (e.g. `0 / 0` does not equal `Math.sqrt(-1)`). Therefore, specification dictates that `NaN` never equals anything, including another `NaN`.\n\n### isNaN() vs Number.isNaN():\n1. **Global `isNaN(val)`:** Coerces the argument to a number first. `isNaN(\"hello\")` converts `\"hello\"` to `NaN`, returning `true`. This is error-prone because non-numeric strings trigger false positives!\n2. **ES6 `Number.isNaN(val)` (Recommended):** Does NOT coerce. It returns `true` **only** if the value is both of type number and currently `NaN`. `Number.isNaN(\"hello\")` returns `false`.\n\n### Interview answer:\n`NaN` is a special number representing an undefined mathematical result. It is unique in JavaScript because it is never equal to itself (`NaN === NaN` is false). To check for it, always use `Number.isNaN()` rather than the global `isNaN()`, because the global version does unwanted type coercion.",
    "followUps": [
      "How does Object.is(NaN, NaN) differ from NaN === NaN?",
      "What arithmetic operations produce NaN in JavaScript?",
      "How does Array.prototype.includes() handle NaN compared to Array.prototype.indexOf()?"
    ],
    "keyPoints": [
      "typeof NaN is 'number'",
      "NaN is the only JavaScript value where x !== x is true",
      "Global isNaN() coerces strings; Number.isNaN() is strict without coercion",
      "Object.is(NaN, NaN) returns true"
    ],
    "tags": [
      "nan",
      "type-coercion",
      "numbers",
      "operators",
      "equality"
    ],
    "relatedLessonSlug": "/learn/javascript/js03-operators-and-equality",
    "relatedLessonName": "JS-03: Operators, Equality & Type Coercion: The === Rule"
  },
  {
    "id": "js-q23",
    "trackKey": "javascript",
    "category": "Functions & Execution Context",
    "subtopic": "Arrow Functions",
    "type": "conceptual",
    "difficulty": "easy",
    "source": "curated",
    "question": "What are the main differences between Arrow Functions and traditional Function Declarations?",
    "codeSnippet": "const team = {\n  name: \"Frontend\",\n  regularFn: function() { console.log(this.name); },\n  arrowFn: () => { console.log(this.name); }\n};\n\nteam.regularFn();\nteam.arrowFn();",
    "expectedOutput": "Frontend\nundefined",
    "answer": "### Simple answer:\nArrow functions (`() => {}`) provide a shorter syntax and automatically borrow `this` from the surrounding code where they were written. Unlike regular functions, they cannot be used as constructors with `new`, and they do not have the legacy `arguments` keyword.\n\n### Key Differences:\n1. **`this` Binding:** Regular functions get `this` from who called them. Arrow functions borrow `this` from the code around them.\n2. **Constructor Use:** Regular functions can be called with `new Person()`. Arrow functions throw an error if called with `new`.\n3. **Arguments:** Regular functions have a built-in array-like `arguments` object. Arrow functions use clean modern rest parameters (`(...args) => {}`).\n\n### Interview answer:\nThe primary difference is that arrow functions have inherited `this`, borrowing it from the surrounding code instead of creating their own. They also lack an `arguments` object and cannot be called with `new`.",
    "followUps": [
      "Why should you avoid using arrow functions as object methods?",
      "Can you change the 'this' value of an arrow function using .bind()?",
      "When are traditional function declarations still preferred over arrow functions?"
    ],
    "keyPoints": [
      "Arrow functions inherit this lexically from outer scope",
      "Traditional functions bind this dynamically at invocation time",
      "Arrow functions cannot be used as constructors with 'new'",
      "Arrow functions lack an arguments object; use rest parameters (...args) instead"
    ],
    "tags": [
      "arrow-functions",
      "functions",
      "this",
      "es6",
      "constructors"
    ],
    "relatedLessonSlug": "/learn/javascript/js06-functions-and-arrow-syntax",
    "relatedLessonName": "JS-06: Functions: Parameters, Return Values & Arrow Syntax"
  },
  {
    "id": "js-q24",
    "trackKey": "javascript",
    "category": "Arrays & Iteration",
    "subtopic": "Array Higher-Order Methods",
    "type": "practical",
    "difficulty": "easy",
    "source": "curated",
    "question": "What is the difference between Array.prototype.map() and Array.prototype.forEach(), and when should you choose reduce()?",
    "codeSnippet": "const numbers = [1, 2, 3];\n\nconst doubled = numbers.map(n => n * 2);\nconst eachResult = numbers.forEach(n => n * 2);\n\nconsole.log(doubled);\nconsole.log(eachResult);",
    "expectedOutput": "[ 2, 4, 6 ]\nundefined",
    "answer": "### Simple answer:\n`map()` creates and returns a **brand-new list** where each item has been transformed. `forEach()` simply loops over the items to do something with them (like printing to the console) and always returns `undefined`. Use `reduce()` when you want to take an entire list and combine it into one single result, like finding a total sum or building a summary object.\n\n### Detailed Comparison:\n| Feature | forEach() | map() | reduce() |\n|---|---|---|---|\n| **Return Value** | Always `undefined` | New array of same length | Single accumulated value |\n| **Immutability** | Pure side effects | Does not mutate original | Does not mutate original |\n| **Chainable?** | No (`undefined` cannot chain) | Yes (`.map().filter()`) | Yes |\n| **Primary Use** | Logging, DOM updates | Transforming data lists | Sums, counting, grouping |\n\n### When to choose reduce():\nUse `reduce(accumulator, currentItem)` whenever your desired output structure is different from the input array. For example:\n- Calculating a total sum from an array of numbers.\n- Turning an array of items into a key-value dictionary lookup object.\n- Grouping items by a category property.\n\n### Interview answer:\nUse `map()` when transforming an array into a new array of the same length without mutating the original. Use `forEach()` strictly for side effects like logging or emitting events, as it returns `undefined`. Use `reduce()` when aggregating an entire list into a single accumulator, like a sum or grouped object.",
    "followUps": [
      "Why is it considered bad practice to use map() if you don't use the returned array?",
      "What happens if you call reduce() on an empty array without an initial value?",
      "Can you break out of a forEach() loop early?"
    ],
    "keyPoints": [
      "map() returns a brand-new transformed array; forEach() always returns undefined",
      "map() is chainable; forEach() is not chainable",
      "reduce() aggregates elements into a single accumulated result (sum, object, list)",
      "Always provide an initial value to reduce() to prevent errors on empty arrays"
    ],
    "tags": [
      "arrays",
      "map",
      "forEach",
      "reduce",
      "functional-programming"
    ],
    "relatedLessonSlug": "/learn/javascript/js11-essential-array-methods",
    "relatedLessonName": "JS-11: Essential Array Methods: map, filter, find & reduce"
  },
  {
    "id": "js-q25",
    "trackKey": "javascript",
    "category": "Modern JavaScript (ES6+)",
    "subtopic": "Destructuring",
    "type": "coding",
    "difficulty": "easy",
    "source": "curated",
    "question": "How does destructuring assignment work for arrays and objects, and how do you assign default values or rename variables?",
    "codeSnippet": "const user = { id: 101, username: \"alex99\" };\nconst { username: handle, role = \"guest\" } = user;\n\nconst coords = [10, 20, 30];\nconst [x, , z] = coords;\n\nconsole.log(handle, role);\nconsole.log(x, z);",
    "expectedOutput": "alex99 guest\n10 30",
    "answer": "### Simple answer:\nDestructuring is a convenient shorthand that lets you unpack items from arrays or properties from objects directly into distinct variables in a single clean line.\n\n### How it works:\n1. **Object Destructuring:**\n   - Properties are matched **by key name**: `const { id, username } = user;`\n   - **Renaming:** Use a colon `key: newName`: `const { username: handle } = user;`\n   - **Default Values:** Use `=`: `const { role = \"guest\" } = user;` (applied only when property is strictly `undefined`).\n2. **Array Destructuring:**\n   - Elements are matched **by positional index**: `const [first, second] = array;`\n   - **Skipping Elements:** Leave an empty comma slot: `const [x, , z] = [10, 20, 30];`\n   - **Rest Element:** Gather remaining items into a new array: `const [head, ...tail] = list;`\n\n### Common Pitfalls:\n- Default values only trigger on `undefined`, **not** on `null`. If an API returns `{ role: null }`, destructuring with `{ role = \"guest\" }` leaves `role` as `null`.\n- Destructuring from `null` or `undefined` throws a fatal `TypeError` (`Cannot destructure property of undefined`).\n\n### Interview answer:\nDestructuring allows extracting object properties by key name or array elements by position. We can rename variables with `prop: newName` and assign fallback default values with `=`. Note that default values only apply if the incoming value is strictly `undefined`.",
    "followUps": [
      "What happens if you try to destructure null: const { a } = null?",
      "Why don't default values trigger when an object property is null?",
      "How do nested destructuring and function parameter destructuring work?"
    ],
    "keyPoints": [
      "Object destructuring matches by key; array destructuring matches by index",
      "Colon syntax (key: alias) renames variables",
      "Equal sign syntax (key = fallback) sets default values",
      "Default values trigger only for undefined, never for null"
    ],
    "tags": [
      "destructuring",
      "es6",
      "objects",
      "arrays",
      "clean-code"
    ],
    "relatedLessonSlug": "/learn/javascript/js14-destructuring",
    "relatedLessonName": "JS-14: Destructuring: Unpacking Objects & Arrays with Ease"
  },
  {
    "id": "js-q26",
    "trackKey": "javascript",
    "category": "Modern JavaScript (ES6+)",
    "subtopic": "Logical Operators",
    "type": "coding",
    "difficulty": "easy",
    "source": "curated",
    "question": "What is the difference between the Nullish Coalescing Operator (??) and the Logical OR Operator (||)?",
    "codeSnippet": "const config = {\n  timeout: 0,\n  title: \"\"\n};\n\nconsole.log(config.timeout || 3000);\nconsole.log(config.timeout ?? 3000);\n\nconsole.log(config.title || \"Default Title\");\nconsole.log(config.title ?? \"Default Title\");",
    "expectedOutput": "3000\n0\nDefault Title\n",
    "answer": "### Simple answer:\nThe logical OR operator (`||`) replaces **any falsy value** (including 0, false, and empty text). The nullish coalescing operator (`??`) is smarter: it replaces **only missing values** (`null` or `undefined`), safely keeping valid zero (0) and false values.\n\n### The Bug with || for Defaults:\nWhen configuring settings, valid values like `0` (zero delay) or `\"\"` (empty string) are falsy.\nUsing `port || 8080` or `delay || 1000` will unexpectedly overwrite `0` with the fallback because `0` is falsy in JavaScript.\n\n### When to use ?? :\nUse `??` whenever `0`, `false`, or `\"\"` are legitimate, valid inputs and you only want to supply a default if the variable was genuinely missing (`undefined` or `null`).\n\n### Example:\n```javascript\nconst userScore = 0;\nconst scoreA = userScore || 10; // 10 (Bug! User scored 0, but gets 10)\nconst scoreB = userScore ?? 10; // 0  (Correct! 0 is preserved)\n```\n\n### Interview answer:\nThe `||` operator checks for truthiness and treats `0`, `false`, and `\"\"` as triggers for the default. In contrast, the nullish coalescing operator `??` specifically checks for `null` or `undefined`, ensuring that valid falsy values like zero or empty strings are safely preserved.",
    "followUps": [
      "Can you combine ?? with && or || without parentheses?",
      "How does Optional Chaining (?.) work in combination with ??"
    ],
    "keyPoints": [
      "|| checks for any falsy value (0, false, '', null, undefined, NaN)",
      "?? checks strictly for nullish values (null and undefined only)",
      "?? prevents bugs where 0 or false are valid user inputs",
      "Directly mixing ?? with && or || requires explicit parentheses"
    ],
    "tags": [
      "nullish-coalescing",
      "logical-operators",
      "truthy-falsy",
      "es2020"
    ],
    "relatedLessonSlug": "/learn/javascript/js16-optional-chaining-and-nullish-coalescing",
    "relatedLessonName": "JS-16: Optional Chaining (?.) & Nullish Coalescing (??)"
  },
  {
    "id": "js-q27",
    "trackKey": "javascript",
    "category": "Error Handling & Debugging",
    "subtopic": "Exception Handling",
    "type": "practical",
    "difficulty": "medium",
    "source": "curated",
    "question": "How does try...catch...finally work, and what happens if both the try block and finally block return a value?",
    "codeSnippet": "function testFlow() {\n  try {\n    console.log(\"1: inside try\");\n    return \"returned from try\";\n  } catch (err) {\n    console.log(\"2: inside catch\");\n  } finally {\n    console.log(\"3: inside finally\");\n    return \"returned from finally\";\n  }\n}\n\nconsole.log(testFlow());",
    "expectedOutput": "1: inside try\n3: inside finally\nreturned from finally",
    "answer": "### Simple answer:\nThe `finally` block **always runs**, no matter what happens in `try` or `catch`. Even if the `try` block already returned a value, `finally` runs right before exiting. If `finally` returns a value of its own, it overrides and replaces everything else.\n\n### The Lifecycle of try...catch...finally:\n1. **`try`**: Contains code that may throw an exception.\n2. **`catch(error)`**: Executes only if an exception is thrown in `try`. Provides access to the error object (`message`, `stack`).\n3. **`finally`**: Guaranteed cleanup code (closing file handles, clearing spinners, releasing database locks). It executes before control leaves the function.\n\n### Returning from finally:\nReturning a value from inside a `finally` block is considered an anti-pattern because it silently swallows errors and overrides earlier returns, making control flow confusing and difficult to debug.\n\n### Interview answer:\nThe `finally` block executes unconditionally after `try` and `catch`, making it ideal for resource cleanup. Even if `try` contains a return statement, `finally` will run before the function exits. If `finally` itself returns a value, that return value takes precedence over any return or thrown error from `try`.",
    "followUps": [
      "Can a try block have a finally block without a catch block?",
      "What is the difference between throwing an Error object vs throwing a string primitive?",
      "How do custom error classes extending Error preserve stack traces?"
    ],
    "keyPoints": [
      "finally executes unconditionally after try and catch",
      "finally is ideal for cleanup like resetting flags or closing connections",
      "A return in finally overrides any previous return or thrown exception",
      "Always throw new Error() instances rather than raw strings for stack traces"
    ],
    "tags": [
      "error-handling",
      "try-catch-finally",
      "exceptions",
      "debugging"
    ],
    "relatedLessonSlug": "/learn/javascript/js24-error-handling",
    "relatedLessonName": "JS-24: Error Handling: try, catch, finally & throw"
  },
  {
    "id": "js-q28",
    "trackKey": "javascript",
    "category": "Asynchronous JavaScript",
    "subtopic": "Async/Await",
    "type": "practical",
    "difficulty": "medium",
    "source": "curated",
    "question": "How does async/await work under the hood, and how should you properly handle errors in asynchronous functions?",
    "codeSnippet": "async function fetchUserData(userId) {\n  try {\n    if (!userId) throw new Error(\"Invalid User ID\");\n    return { id: userId, name: \"Maria\" };\n  } catch (err) {\n    console.error(\"Caught error:\", err.message);\n    throw err; // rethrow so caller is notified\n  }\n}\n\nfetchUserData(null).catch(e => console.log(\"Caller handled:\", e.message));",
    "expectedOutput": "Caught error: Invalid User ID\nCaller handled: Invalid User ID",
    "answer": "### Simple answer:\n`async/await` is a modern, clean way to handle background tasks without messy callback chains. An `async` function always returns a Promise. The `await` keyword pauses the function until the background task is done, letting you write asynchronous code that reads just like regular step-by-step code.\n\n### How it works under the hood:\n1. Declaring `async function foo()` automatically wraps any return value in `Promise.resolve(result)`. If the function throws an error, it returns a rejected promise `Promise.reject(error)`.\n2. `await promise` pauses the async function execution and yields control back to the event loop. The remainder of the async function is queued as a **Microtask** when the awaited Promise resolves.\n\n### Best Practices for Error Handling:\n- **Wrap with `try...catch`:** Handle network failures and status errors locally.\n- **Rethrow when necessary:** If the caller needs to update UI state (e.g., show a toast notification), rethrow the error after local logging.\n- **Catch at caller level:** You can also chain `.catch()` directly onto the returned promise: `await fetchUser().catch(handleError)`.\n\n### Interview answer:\n`async/await` is syntactic sugar over Promises that makes asynchronous code look synchronous. An `async` function always returns a Promise. When you `await` a promise, JavaScript yields execution until that promise settles, placing the continuation into the Microtask Queue. Errors are handled cleanly using standard `try...catch` blocks.",
    "followUps": [
      "What happens if you forget to await a promise that rejects?",
      "Can you use await at the top level of an ES module?",
      "How does Promise.all() parallelize multiple independent await operations?"
    ],
    "keyPoints": [
      "async functions always return a Promise",
      "await pauses function execution until promise settles; continuation runs as microtask",
      "Errors can be caught using standard try...catch blocks",
      "Parallelize independent async tasks with Promise.all() rather than sequential awaits"
    ],
    "tags": [
      "async-await",
      "promises",
      "error-handling",
      "asynchronous",
      "microtasks"
    ],
    "relatedLessonSlug": "/learn/javascript/js22-async-await",
    "relatedLessonName": "JS-22: Async/Await: Clean Asynchronous Workflows"
  },
  {
    "id": "js-q29",
    "trackKey": "javascript",
    "category": "Browser DOM & Events",
    "subtopic": "DOM Selection",
    "type": "conceptual",
    "difficulty": "easy",
    "source": "curated",
    "question": "What is the difference between querySelectorAll and getElementsByClassName, and what is the difference between a static NodeList and a live HTMLCollection?",
    "answer": "### Simple answer:\n`getElementsByClassName` returns a **live collection** that changes automatically whenever HTML elements are added or removed from the page. `querySelectorAll` returns a **safe snapshot** (a static NodeList) of the elements at the exact moment you asked for them, which makes it much safer to loop over.\n\n### Live HTMLCollection vs Static NodeList:\n1. **Live HTMLCollection (`getElementsByClassName`, `getElementsByTagName`):**\n   - Automatically reflects subsequent changes to the DOM in real time.\n   - Danger: Modifying the DOM while looping over a live collection can cause infinite loops or skipped elements because its `.length` changes during the loop!\n2. **Static NodeList (`querySelectorAll`):**\n   - A static snapshot that does not change even if matching elements are added or removed later.\n   - Safer to iterate over with `.forEach()`.\n   - Supports CSS selector syntax (e.g. `.card > p:first-child`).\n\n### Array Conversion:\nNeither collection is a true JavaScript Array. To use array methods like `.map()` or `.filter()`, convert them using:\n```javascript\nconst items = Array.from(document.querySelectorAll(\".item\"));\n// or using spread syntax:\nconst itemsList = [...document.getElementsByClassName(\"item\")];\n```\n\n### Interview answer:\n`querySelectorAll` uses CSS selectors and returns a static NodeList that acts as a fixed snapshot in time. In contrast, older methods like `getElementsByClassName` return a live HTMLCollection that mutates dynamically when the DOM changes. Modern JavaScript favors `querySelectorAll` because static collections are safer to iterate over.",
    "followUps": [
      "Why does document.getElementById() perform faster than document.querySelector('#id')?",
      "Can you run .forEach() directly on a NodeList vs an HTMLCollection?",
      "What is the difference between Element and Node in the DOM tree?"
    ],
    "keyPoints": [
      "querySelectorAll returns a static NodeList snapshot",
      "getElementsByClassName returns a live HTMLCollection that auto-updates with DOM changes",
      "Live collections can cause bugs when mutating elements inside loops",
      "Convert collections to real arrays using Array.from() or [...spread]"
    ],
    "tags": [
      "dom",
      "nodelist",
      "htmlcollection",
      "queryselector",
      "browser-apis"
    ],
    "relatedLessonSlug": "/learn/javascript/js28-dom-essentials",
    "relatedLessonName": "JS-28: Browser DOM Essentials: Selecting & Modifying Elements"
  },
  {
    "id": "js-q30",
    "trackKey": "javascript",
    "category": "Browser APIs & Storage",
    "subtopic": "Web Storage",
    "type": "practical",
    "difficulty": "easy",
    "source": "curated",
    "question": "What are the key differences between localStorage, sessionStorage, and Cookies in modern web applications?",
    "answer": "### Simple answer:\n`localStorage` keeps data permanently on the user's computer until deleted (about 5MB of space). `sessionStorage` keeps data only while the browser tab is open and disappears when the tab is closed. Cookies store small bits of data (about 4KB) and are automatically sent to the server with every web request.\n\n### Feature Comparison Matrix:\n| Feature | localStorage | sessionStorage | Cookies |\n|---|---|---|---|\n| **Storage Capacity** | ~5MB - 10MB per origin | ~5MB per origin | ~4KB per cookie |\n| **Lifetime** | Permanent until explicitly cleared | Cleared when browser tab closes | Configured via `Expires` or `Max-Age` |\n| **Server Transfer** | Never sent automatically | Never sent automatically | Sent automatically in HTTP `Cookie` header |\n| **Access Scope** | Any tab/window from same origin | Isolated to the specific tab | Same origin / configurable domain |\n| **Security Flags** | No (Accessible by any script) | No (Accessible by any script) | `HttpOnly`, `Secure`, `SameSite` |\n\n### Security Warning (XSS vs JWT):\nNever store sensitive authentication tokens (like refresh tokens) in `localStorage` because any Cross-Site Scripting (XSS) vulnerability allows an attacker's script to read `localStorage.getItem(\"token\")`.\nFor authentication tokens, secure HTTP-only cookies (`HttpOnly; Secure; SameSite=Strict`) are preferred because JavaScript cannot read them.\n\n### Interview answer:\n`localStorage` provides permanent client-side storage (~5MB) across all tabs of the same origin. `sessionStorage` is scoped to a single tab and is cleared when the tab closes. Cookies are small (~4KB) and transmitted to the server with every HTTP request. Sensitive auth tokens should use `HttpOnly` cookies rather than localStorage to protect against XSS attacks.",
    "followUps": [
      "Why is localStorage synchronous and how can large reads impact performance?",
      "What are HttpOnly and SameSite flags on cookies and how do they defend against XSS and CSRF?",
      "When is IndexedDB preferred over localStorage?"
    ],
    "keyPoints": [
      "localStorage persists indefinitely; sessionStorage dies when the tab closes",
      "Cookies are sent automatically with HTTP requests (~4KB limit)",
      "localStorage only stores strings; use JSON.stringify and JSON.parse for objects",
      "Never store sensitive auth tokens in localStorage due to XSS vulnerabilities"
    ],
    "tags": [
      "localstorage",
      "sessionstorage",
      "cookies",
      "security",
      "web-storage"
    ],
    "relatedLessonSlug": "/learn/javascript/js30-browser-storage-and-debugging",
    "relatedLessonName": "JS-30: Browser Storage (localStorage) & DevTools Debugging"
  }
];
