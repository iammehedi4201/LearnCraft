const fs = require('fs');

const NEW_QUESTIONS = [
  {
    id: "js-q21",
    trackKey: "javascript",
    category: "Data Types & Memory",
    subtopic: "Primitives vs References",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What are the primitive data types in JavaScript, how do they differ from Objects, and why does typeof null return 'object'?",
    answer: `### Simple answer:
JavaScript has 7 primitive types that store values directly in memory and are immutable. Objects are reference types that store a memory address. The fact that \`typeof null === "object"\` is a well-known historical bug in JavaScript from 1995 that cannot be fixed without breaking old websites.

### The 7 Primitive Types:
1. **string** (e.g., \`"hello"\`)
2. **number** (e.g., \`42\`, \`3.14\`, \`NaN\`)
3. **bigint** (e.g., \`9007199254740991n\`)
4. **boolean** (e.g., \`true\`, \`false\`)
5. **undefined** (a variable declared but not assigned a value)
6. **symbol** (unique identifiers created with \`Symbol()\`)
7. **null** (intentional absence of any object value)

### Primitives vs Objects:
- **Primitives are passed by value:** Copying a primitive copies the actual value into a new memory location. Modifying one does not affect the other.
- **Primitives are immutable:** You cannot attach properties to primitives (e.g. \`"cat".color = "black"\` fails or is ignored).
- **Objects are passed by reference:** Variables hold a pointer to the memory location where the object lives. Multiple variables pointing to the same object share mutations.

### Why typeof null is "object":
In the original 1995 JavaScript implementation, values were represented with a type tag and a value. Objects had a type tag of \`000\`. Because \`null\` was represented as a NULL pointer (all zeros), its type tag was also \`000\`, making \`typeof null\` return \`"object"\`.

### Interview answer:
JavaScript has 7 primitive types: string, number, bigint, boolean, undefined, symbol, and null. Primitives are immutable and compared by value, whereas Objects are mutable and compared by memory reference. \`typeof null\` returning \`"object"\` is a famous legacy bug from the first version of JS.`,
    followUps: [
      "How do you reliably check if a value is strictly null?",
      "Why does string autoboxing allow calling methods like 'hello'.toUpperCase() on a primitive?",
      "What is the difference between null and undefined in API payloads?"
    ],
    keyPoints: [
      "7 primitives: string, number, bigint, boolean, undefined, symbol, null",
      "Primitives are immutable and passed by value; objects are passed by reference",
      "typeof null returning 'object' is a legacy engine bug from 1995",
      "Reliable null check is value === null"
    ],
    tags: ["primitives", "data-types", "typeof", "null-vs-undefined", "memory"],
    relatedLessonSlug: "/learn/javascript/js02-variables-and-data-types",
    relatedLessonName: "JS-02: Variables & Data Types: let, const & Primitive Values"
  },
  {
    id: "js-q22",
    trackKey: "javascript",
    category: "Types & Type Coercion",
    subtopic: "Type Checking",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is NaN, why does NaN === NaN evaluate to false, and how do you reliably check if a value is NaN?",
    codeSnippet: `console.log(typeof NaN);
console.log(NaN === NaN);
console.log(isNaN("hello"));
console.log(Number.isNaN("hello"));`,
    expectedOutput: `number
false
true
false`,
    answer: `### Simple answer:
\`NaN\` stands for "Not-a-Number", but ironically its data type is \`"number"\`. In IEEE 754 floating-point standard, \`NaN\` represents an invalid or unrepresentable mathematical result (such as \`0 / 0\` or \`parseInt("abc")\`). It is the only value in JavaScript that is not equal to itself.

### Why NaN === NaN is false:
According to IEEE 754, two invalid mathematical calculations are not necessarily identical values (e.g. \`0 / 0\` does not equal \`Math.sqrt(-1)\`). Therefore, specification dictates that \`NaN\` never equals anything, including another \`NaN\`.

### isNaN() vs Number.isNaN():
1. **Global \`isNaN(val)\`:** Coerces the argument to a number first. \`isNaN("hello")\` converts \`"hello"\` to \`NaN\`, returning \`true\`. This is error-prone because non-numeric strings trigger false positives!
2. **ES6 \`Number.isNaN(val)\` (Recommended):** Does NOT coerce. It returns \`true\` **only** if the value is both of type number and currently \`NaN\`. \`Number.isNaN("hello")\` returns \`false\`.

### Interview answer:
\`NaN\` is a special number representing an undefined mathematical result. It is unique in JavaScript because it is never equal to itself (\`NaN === NaN\` is false). To check for it, always use \`Number.isNaN()\` rather than the global \`isNaN()\`, because the global version does unwanted type coercion.`,
    followUps: [
      "How does Object.is(NaN, NaN) differ from NaN === NaN?",
      "What arithmetic operations produce NaN in JavaScript?",
      "How does Array.prototype.includes() handle NaN compared to Array.prototype.indexOf()?"
    ],
    keyPoints: [
      "typeof NaN is 'number'",
      "NaN is the only JavaScript value where x !== x is true",
      "Global isNaN() coerces strings; Number.isNaN() is strict without coercion",
      "Object.is(NaN, NaN) returns true"
    ],
    tags: ["nan", "type-coercion", "numbers", "operators", "equality"],
    relatedLessonSlug: "/learn/javascript/js03-operators-and-type-coercion",
    relatedLessonName: "JS-03: Operators & Type Coercion: Arithmetic, Logic & Truthy/Falsy"
  },
  {
    id: "js-q23",
    trackKey: "javascript",
    category: "Functions & Execution Context",
    subtopic: "Arrow Functions",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What are the main differences between Arrow Functions and traditional Function Declarations?",
    codeSnippet: `const team = {
  name: "Frontend",
  regularFn: function() { console.log(this.name); },
  arrowFn: () => { console.log(this.name); }
};

team.regularFn();
team.arrowFn();`,
    expectedOutput: `Frontend
undefined`,
    answer: `### Simple answer:
Arrow functions provide shorter syntax and inherit \`this\` from their surrounding scope (lexical \`this\`). Unlike traditional functions, arrow functions cannot be used as constructors, do not have their own \`arguments\` object, and cannot have their \`this\` rebound using \`call\`, \`apply\`, or \`bind\`.

### Key Differences:
1. **Lexical \`this\` Binding:**
   - Traditional functions determine \`this\` based on **how** they are called (runtime context).
   - Arrow functions capture \`this\` from the outer enclosing scope at the time they are created.
2. **No Constructor (\`new\`):**
   - Traditional functions have a \`prototype\` property and can be invoked with \`new Animal()\`.
   - Arrow functions lack a \`prototype\` property and throw a \`TypeError\` if called with \`new\`.
3. **No \`arguments\` Object:**
   - Traditional functions provide an array-like \`arguments\` object.
   - Arrow functions do not have \`arguments\`; use rest parameters (\`(...args) => {}\`) instead.
4. **No Generator Syntax:**
   - Arrow functions cannot use the \`yield\` keyword or be declared as generators (\`function*\`).

### Interview answer:
The biggest difference is that arrow functions have lexical \`this\`, meaning they inherit \`this\` from the enclosing lexical scope instead of defining their own. They also lack their own \`arguments\` object, have no \`prototype\`, and cannot be invoked with the \`new\` keyword.`,
    followUps: [
      "Why should you avoid using arrow functions as object methods?",
      "Can you change the 'this' value of an arrow function using .bind()?",
      "When are traditional function declarations still preferred over arrow functions?"
    ],
    keyPoints: [
      "Arrow functions inherit this lexically from outer scope",
      "Traditional functions bind this dynamically at invocation time",
      "Arrow functions cannot be used as constructors with 'new'",
      "Arrow functions lack an arguments object; use rest parameters (...args) instead"
    ],
    tags: ["arrow-functions", "functions", "this", "es6", "constructors"],
    relatedLessonSlug: "/learn/javascript/js06-functions-and-arrow-syntax",
    relatedLessonName: "JS-06: Functions & Arrow Syntax: Parameters, Returns & Callbacks"
  },
  {
    id: "js-q24",
    trackKey: "javascript",
    category: "Arrays & Iteration",
    subtopic: "Array Higher-Order Methods",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "What is the difference between Array.prototype.map() and Array.prototype.forEach(), and when should you choose reduce()?",
    codeSnippet: `const numbers = [1, 2, 3];

const doubled = numbers.map(n => n * 2);
const eachResult = numbers.forEach(n => n * 2);

console.log(doubled);
console.log(eachResult);`,
    expectedOutput: `[ 2, 4, 6 ]
undefined`,
    answer: `### Simple answer:
\`map()\` returns a **new array** containing the transformed results of each element. \`forEach()\` simply iterates over items to perform side effects and always returns \`undefined\`. Use \`reduce()\` when you need to condense an array down to a single value, such as a sum, an object lookup map, or a grouped structure.

### Detailed Comparison:
| Feature | forEach() | map() | reduce() |
|---|---|---|---|
| **Return Value** | Always \`undefined\` | New array of same length | Single accumulated value |
| **Immutability** | Pure side effects | Does not mutate original | Does not mutate original |
| **Chainable?** | No (\`undefined\` cannot chain) | Yes (\`.map().filter()\`) | Yes |
| **Primary Use** | Logging, DOM updates | Transforming data lists | Sums, counting, grouping |

### When to choose reduce():
Use \`reduce(accumulator, currentItem)\` whenever your desired output structure is different from the input array. For example:
- Calculating a total sum from an array of numbers.
- Turning an array of items into a key-value dictionary lookup object.
- Grouping items by a category property.

### Interview answer:
Use \`map()\` when transforming an array into a new array of the same length without mutating the original. Use \`forEach()\` strictly for side effects like logging or emitting events, as it returns \`undefined\`. Use \`reduce()\` when aggregating an entire list into a single accumulator, like a sum or grouped object.`,
    followUps: [
      "Why is it considered bad practice to use map() if you don't use the returned array?",
      "What happens if you call reduce() on an empty array without an initial value?",
      "Can you break out of a forEach() loop early?"
    ],
    keyPoints: [
      "map() returns a brand-new transformed array; forEach() always returns undefined",
      "map() is chainable; forEach() is not chainable",
      "reduce() aggregates elements into a single accumulated result (sum, object, list)",
      "Always provide an initial value to reduce() to prevent errors on empty arrays"
    ],
    tags: ["arrays", "map", "forEach", "reduce", "functional-programming"],
    relatedLessonSlug: "/learn/javascript/js10-array-methods-transformations",
    relatedLessonName: "JS-10: Array Transformations: map, filter, reduce & find"
  },
  {
    id: "js-q25",
    trackKey: "javascript",
    category: "Modern JavaScript (ES6+)",
    subtopic: "Destructuring",
    type: "coding",
    difficulty: "easy",
    source: "curated",
    question: "How does destructuring assignment work for arrays and objects, and how do you assign default values or rename variables?",
    codeSnippet: `const user = { id: 101, username: "alex99" };
const { username: handle, role = "guest" } = user;

const coords = [10, 20, 30];
const [x, , z] = coords;

console.log(handle, role);
console.log(x, z);`,
    expectedOutput: `alex99 guest
10 30`,
    answer: `### Simple answer:
Destructuring is an ES6 syntax that unpacks values from arrays or properties from objects into distinct variables in a clean, one-line declaration.

### How it works:
1. **Object Destructuring:**
   - Properties are matched **by key name**: \`const { id, username } = user;\`
   - **Renaming:** Use a colon \`key: newName\`: \`const { username: handle } = user;\`
   - **Default Values:** Use \`=\`: \`const { role = "guest" } = user;\` (applied only when property is strictly \`undefined\`).
2. **Array Destructuring:**
   - Elements are matched **by positional index**: \`const [first, second] = array;\`
   - **Skipping Elements:** Leave an empty comma slot: \`const [x, , z] = [10, 20, 30];\`
   - **Rest Element:** Gather remaining items into a new array: \`const [head, ...tail] = list;\`

### Common Pitfalls:
- Default values only trigger on \`undefined\`, **not** on \`null\`. If an API returns \`{ role: null }\`, destructuring with \`{ role = "guest" }\` leaves \`role\` as \`null\`.
- Destructuring from \`null\` or \`undefined\` throws a fatal \`TypeError\` (\`Cannot destructure property of undefined\`).

### Interview answer:
Destructuring allows extracting object properties by key name or array elements by position. We can rename variables with \`prop: newName\` and assign fallback default values with \`=\`. Note that default values only apply if the incoming value is strictly \`undefined\`.`,
    followUps: [
      "What happens if you try to destructure null: const { a } = null?",
      "Why don't default values trigger when an object property is null?",
      "How do nested destructuring and function parameter destructuring work?"
    ],
    keyPoints: [
      "Object destructuring matches by key; array destructuring matches by index",
      "Colon syntax (key: alias) renames variables",
      "Equal sign syntax (key = fallback) sets default values",
      "Default values trigger only for undefined, never for null"
    ],
    tags: ["destructuring", "es6", "objects", "arrays", "clean-code"],
    relatedLessonSlug: "/learn/javascript/js17-destructuring-and-spread",
    relatedLessonName: "JS-17: Destructuring & Spread: Clean Data Extraction & Cloning"
  },
  {
    id: "js-q26",
    trackKey: "javascript",
    category: "Modern JavaScript (ES6+)",
    subtopic: "Logical Operators",
    type: "coding",
    difficulty: "easy",
    source: "curated",
    question: "What is the difference between the Nullish Coalescing Operator (??) and the Logical OR Operator (||)?",
    codeSnippet: `const config = {
  timeout: 0,
  title: ""
};

console.log(config.timeout || 3000);
console.log(config.timeout ?? 3000);

console.log(config.title || "Default Title");
console.log(config.title ?? "Default Title");`,
    expectedOutput: `3000
0
Default Title
`,
    answer: `### Simple answer:
The logical OR operator (\`||\`) falls back on **any falsy value** (\`0\`, \`""\`, \`false\`, \`NaN\`, \`null\`, \`undefined\`). The nullish coalescing operator (\`??\`) falls back **only on nullish values** (\`null\` or \`undefined\`).

### The Bug with || for Defaults:
When configuring settings, valid values like \`0\` (zero delay) or \`""\` (empty string) are falsy.
Using \`port || 8080\` or \`delay || 1000\` will unexpectedly overwrite \`0\` with the fallback because \`0\` is falsy in JavaScript.

### When to use ?? :
Use \`??\` whenever \`0\`, \`false\`, or \`""\` are legitimate, valid inputs and you only want to supply a default if the variable was genuinely missing (\`undefined\` or \`null\`).

### Example:
\`\`\`javascript
const userScore = 0;
const scoreA = userScore || 10; // 10 (Bug! User scored 0, but gets 10)
const scoreB = userScore ?? 10; // 0  (Correct! 0 is preserved)
\`\`\`

### Interview answer:
The \`||\` operator checks for truthiness and treats \`0\`, \`false\`, and \`""\` as triggers for the default. In contrast, the nullish coalescing operator \`??\` specifically checks for \`null\` or \`undefined\`, ensuring that valid falsy values like zero or empty strings are safely preserved.`,
    followUps: [
      "Can you combine ?? with && or || without parentheses?",
      "How does Optional Chaining (?.) work in combination with ??"
    ],
    keyPoints: [
      "|| checks for any falsy value (0, false, '', null, undefined, NaN)",
      "?? checks strictly for nullish values (null and undefined only)",
      "?? prevents bugs where 0 or false are valid user inputs",
      "Directly mixing ?? with && or || requires explicit parentheses"
    ],
    tags: ["nullish-coalescing", "logical-operators", "truthy-falsy", "es2020"],
    relatedLessonSlug: "/learn/javascript/js18-optional-chaining-and-nullish",
    relatedLessonName: "JS-18: Optional Chaining & Nullish Coalescing: Safe Property Access"
  },
  {
    id: "js-q27",
    trackKey: "javascript",
    category: "Error Handling & Debugging",
    subtopic: "Exception Handling",
    type: "debugging",
    difficulty: "medium",
    source: "curated",
    question: "How does try...catch...finally work, and what happens if both the try block and finally block return a value?",
    codeSnippet: `function testFlow() {
  try {
    console.log("1: inside try");
    return "returned from try";
  } catch (err) {
    console.log("2: inside catch");
  } finally {
    console.log("3: inside finally");
    return "returned from finally";
  }
}

console.log(testFlow());`,
    expectedOutput: `1: inside try
3: inside finally
returned from finally`,
    answer: `### Simple answer:
The \`finally\` block **always runs**, regardless of whether an error was thrown or whether the \`try\` block executed a \`return\` statement. If the \`finally\` block explicitly returns a value, it overrides and discards any return value or uncaught exception from the \`try\` or \`catch\` blocks.

### The Lifecycle of try...catch...finally:
1. **\`try\`**: Contains code that may throw an exception.
2. **\`catch(error)\`**: Executes only if an exception is thrown in \`try\`. Provides access to the error object (\`message\`, \`stack\`).
3. **\`finally\`**: Guaranteed cleanup code (closing file handles, clearing spinners, releasing database locks). It executes before control leaves the function.

### Returning from finally:
Returning a value from inside a \`finally\` block is considered an anti-pattern because it silently swallows errors and overrides earlier returns, making control flow confusing and difficult to debug.

### Interview answer:
The \`finally\` block executes unconditionally after \`try\` and \`catch\`, making it ideal for resource cleanup. Even if \`try\` contains a return statement, \`finally\` will run before the function exits. If \`finally\` itself returns a value, that return value takes precedence over any return or thrown error from \`try\`.`,
    followUps: [
      "Can a try block have a finally block without a catch block?",
      "What is the difference between throwing an Error object vs throwing a string primitive?",
      "How do custom error classes extending Error preserve stack traces?"
    ],
    keyPoints: [
      "finally executes unconditionally after try and catch",
      "finally is ideal for cleanup like resetting flags or closing connections",
      "A return in finally overrides any previous return or thrown exception",
      "Always throw new Error() instances rather than raw strings for stack traces"
    ],
    tags: ["error-handling", "try-catch-finally", "exceptions", "debugging"],
    relatedLessonSlug: "/learn/javascript/js19-error-handling-and-exceptions",
    relatedLessonName: "JS-19: Error Handling: try, catch, finally & Custom Errors"
  },
  {
    id: "js-q28",
    trackKey: "javascript",
    category: "Asynchronous JavaScript",
    subtopic: "Async/Await",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How does async/await work under the hood, and how should you properly handle errors in asynchronous functions?",
    codeSnippet: `async function fetchUserData(userId) {
  try {
    if (!userId) throw new Error("Invalid User ID");
    return { id: userId, name: "Maria" };
  } catch (err) {
    console.error("Caught error:", err.message);
    throw err; // rethrow so caller is notified
  }
}

fetchUserData(null).catch(e => console.log("Caller handled:", e.message));`,
    expectedOutput: `Caught error: Invalid User ID
Caller handled: Invalid User ID`,
    answer: `### Simple answer:
\`async/await\` is syntactic sugar built on top of native JavaScript Promises and Generators. An \`async\` function always returns a Promise, and the \`await\` keyword pauses execution of the function until the promise settles, allowing asynchronous code to be written sequentially with standard \`try...catch\` blocks.

### How it works under the hood:
1. Declaring \`async function foo()\` automatically wraps any return value in \`Promise.resolve(result)\`. If the function throws an error, it returns a rejected promise \`Promise.reject(error)\`.
2. \`await promise\` pauses the async function execution and yields control back to the event loop. The remainder of the async function is queued as a **Microtask** when the awaited Promise resolves.

### Best Practices for Error Handling:
- **Wrap with \`try...catch\`:** Handle network failures and status errors locally.
- **Rethrow when necessary:** If the caller needs to update UI state (e.g., show a toast notification), rethrow the error after local logging.
- **Catch at caller level:** You can also chain \`.catch()\` directly onto the returned promise: \`await fetchUser().catch(handleError)\`.

### Interview answer:
\`async/await\` is syntactic sugar over Promises that makes asynchronous code look synchronous. An \`async\` function always returns a Promise. When you \`await\` a promise, JavaScript yields execution until that promise settles, placing the continuation into the Microtask Queue. Errors are handled cleanly using standard \`try...catch\` blocks.`,
    followUps: [
      "What happens if you forget to await a promise that rejects?",
      "Can you use await at the top level of an ES module?",
      "How does Promise.all() parallelize multiple independent await operations?"
    ],
    keyPoints: [
      "async functions always return a Promise",
      "await pauses function execution until promise settles; continuation runs as microtask",
      "Errors can be caught using standard try...catch blocks",
      "Parallelize independent async tasks with Promise.all() rather than sequential awaits"
    ],
    tags: ["async-await", "promises", "error-handling", "asynchronous", "microtasks"],
    relatedLessonSlug: "/learn/javascript/js22-async-await-and-error-handling",
    relatedLessonName: "JS-22: Async/Await: Clean Asynchronous Code & Error Handling"
  },
  {
    id: "js-q29",
    trackKey: "javascript",
    category: "Browser DOM & Events",
    subtopic: "DOM Selection",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is the difference between querySelectorAll and getElementsByClassName, and what is the difference between a static NodeList and a live HTMLCollection?",
    answer: `### Simple answer:
\`getElementsByClassName\` returns a **live HTMLCollection** that automatically updates whenever elements are added or removed from the DOM. \`querySelectorAll\` returns a **static NodeList** representing a snapshot of elements at the exact moment the query was executed.

### Live HTMLCollection vs Static NodeList:
1. **Live HTMLCollection (\`getElementsByClassName\`, \`getElementsByTagName\`):**
   - Automatically reflects subsequent changes to the DOM in real time.
   - Danger: Modifying the DOM while looping over a live collection can cause infinite loops or skipped elements because its \`.length\` changes during the loop!
2. **Static NodeList (\`querySelectorAll\`):**
   - A static snapshot that does not change even if matching elements are added or removed later.
   - Safer to iterate over with \`.forEach()\`.
   - Supports CSS selector syntax (e.g. \`.card > p:first-child\`).

### Array Conversion:
Neither collection is a true JavaScript Array. To use array methods like \`.map()\` or \`.filter()\`, convert them using:
\`\`\`javascript
const items = Array.from(document.querySelectorAll(".item"));
// or using spread syntax:
const itemsList = [...document.getElementsByClassName("item")];
\`\`\`

### Interview answer:
\`querySelectorAll\` uses CSS selectors and returns a static NodeList that acts as a fixed snapshot in time. In contrast, older methods like \`getElementsByClassName\` return a live HTMLCollection that mutates dynamically when the DOM changes. Modern JavaScript favors \`querySelectorAll\` because static collections are safer to iterate over.`,
    followUps: [
      "Why does document.getElementById() perform faster than document.querySelector('#id')?",
      "Can you run .forEach() directly on a NodeList vs an HTMLCollection?",
      "What is the difference between Element and Node in the DOM tree?"
    ],
    keyPoints: [
      "querySelectorAll returns a static NodeList snapshot",
      "getElementsByClassName returns a live HTMLCollection that auto-updates with DOM changes",
      "Live collections can cause bugs when mutating elements inside loops",
      "Convert collections to real arrays using Array.from() or [...spread]"
    ],
    tags: ["dom", "nodelist", "htmlcollection", "queryselector", "browser-apis"],
    relatedLessonSlug: "/learn/javascript/js28-dom-essentials",
    relatedLessonName: "JS-28: Browser DOM Essentials: Selecting & Modifying Elements"
  },
  {
    id: "js-q30",
    trackKey: "javascript",
    category: "Browser APIs & Storage",
    subtopic: "Web Storage",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "What are the key differences between localStorage, sessionStorage, and Cookies in modern web applications?",
    answer: `### Simple answer:
\`localStorage\` stores data permanently until manually cleared (~5-10MB). \`sessionStorage\` stores data only for the current browser tab session (~5MB). Cookies store smaller amounts of data (~4KB) and are automatically sent to the server with every HTTP request.

### Feature Comparison Matrix:
| Feature | localStorage | sessionStorage | Cookies |
|---|---|---|---|
| **Storage Capacity** | ~5MB - 10MB per origin | ~5MB per origin | ~4KB per cookie |
| **Lifetime** | Permanent until explicitly cleared | Cleared when browser tab closes | Configured via \`Expires\` or \`Max-Age\` |
| **Server Transfer** | Never sent automatically | Never sent automatically | Sent automatically in HTTP \`Cookie\` header |
| **Access Scope** | Any tab/window from same origin | Isolated to the specific tab | Same origin / configurable domain |
| **Security Flags** | No (Accessible by any script) | No (Accessible by any script) | \`HttpOnly\`, \`Secure\`, \`SameSite\` |

### Security Warning (XSS vs JWT):
Never store sensitive authentication tokens (like refresh tokens) in \`localStorage\` because any Cross-Site Scripting (XSS) vulnerability allows an attacker's script to read \`localStorage.getItem("token")\`.
For authentication tokens, secure HTTP-only cookies (\`HttpOnly; Secure; SameSite=Strict\`) are preferred because JavaScript cannot read them.

### Interview answer:
\`localStorage\` provides permanent client-side storage (~5MB) across all tabs of the same origin. \`sessionStorage\` is scoped to a single tab and is cleared when the tab closes. Cookies are small (~4KB) and transmitted to the server with every HTTP request. Sensitive auth tokens should use \`HttpOnly\` cookies rather than localStorage to protect against XSS attacks.`,
    followUps: [
      "Why is localStorage synchronous and how can large reads impact performance?",
      "What are HttpOnly and SameSite flags on cookies and how do they defend against XSS and CSRF?",
      "When is IndexedDB preferred over localStorage?"
    ],
    keyPoints: [
      "localStorage persists indefinitely; sessionStorage dies when the tab closes",
      "Cookies are sent automatically with HTTP requests (~4KB limit)",
      "localStorage only stores strings; use JSON.stringify and JSON.parse for objects",
      "Never store sensitive auth tokens in localStorage due to XSS vulnerabilities"
    ],
    tags: ["localstorage", "sessionstorage", "cookies", "security", "web-storage"],
    relatedLessonSlug: "/learn/javascript/js30-browser-storage-and-debugging",
    relatedLessonName: "JS-30: Browser Storage & Debugging: LocalStorage, SessionStorage & DevTools"
  }
];

let fileContent = fs.readFileSync('lib/interview-questions/javascript-questions.ts', 'utf8');

const lastBracketIdx = fileContent.lastIndexOf('];');
if (lastBracketIdx === -1) {
  console.error("Could not find closing bracket in javascript-questions.ts");
  process.exit(1);
}

function formatQuestion(q) {
  return `  {
    id: ${JSON.stringify(q.id)},
    trackKey: ${JSON.stringify(q.trackKey)},
    category: ${JSON.stringify(q.category)},
    subtopic: ${JSON.stringify(q.subtopic)},
    type: ${JSON.stringify(q.type)},
    difficulty: ${JSON.stringify(q.difficulty)},
    source: ${JSON.stringify(q.source)},
    question: ${JSON.stringify(q.question)},${q.codeSnippet ? `\n    codeSnippet: ${JSON.stringify(q.codeSnippet)},` : ''}${q.expectedOutput ? `\n    expectedOutput: ${JSON.stringify(q.expectedOutput)},` : ''}
    answer: ${JSON.stringify(q.answer)},
    followUps: ${JSON.stringify(q.followUps, null, 6).replace(/\n/g, '\n    ')},
    keyPoints: ${JSON.stringify(q.keyPoints, null, 6).replace(/\n/g, '\n    ')},
    tags: ${JSON.stringify(q.tags, null, 6).replace(/\n/g, '\n    ')},
    relatedLessonSlug: ${JSON.stringify(q.relatedLessonSlug)},
    relatedLessonName: ${JSON.stringify(q.relatedLessonName)}
  }`;
}

const formattedQuestions = NEW_QUESTIONS.map(formatQuestion).join(',\n');

const updated = fileContent.slice(0, lastBracketIdx) + ',\n' + formattedQuestions + '\n' + fileContent.slice(lastBracketIdx);

fs.writeFileSync('lib/interview-questions/javascript-questions.ts', updated, 'utf8');
console.log(`Successfully appended ${NEW_QUESTIONS.length} new curated questions to javascript-questions.ts`);
