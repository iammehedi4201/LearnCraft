/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * JAVASCRIPT CURATED MODULE QUIZZES REPOSITORY
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Comprehensive, curriculum-aligned module quizzes for LearnCraft's JavaScript
 * learning track. Features both conceptual multiple choice questions and
 * sandboxed code-output prediction challenges across all major learning stages.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { ModuleQuiz } from "./quiz-types";

export const JAVASCRIPT_MODULE_QUIZZES: ModuleQuiz[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // JS-01: How JavaScript Runs
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-javascript-js01",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js01-how-javascript-runs",
    lessonCode: "JS-01",
    lessonTitle: "How JavaScript Runs: The Runtime, Console & Statements",
    description: "Assess your understanding of the V8 JavaScript engine, single-threaded execution, call stack mechanics, and statement parsing.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js01-q1",
        type: "multiple_choice",
        title: "Single-Threaded Execution",
        prompt: "What does it mean that JavaScript runs in a 'single-threaded' environment?",
        options: [
          "JavaScript can only run on computers with a single physical CPU core",
          "It has a single Call Stack and executes one line of code at a time from top to bottom",
          "Each browser tab can only open a single JavaScript file",
          "It cannot process mathematical calculations with decimal numbers",
        ],
        correctAnswer: 1,
        explanation: "JavaScript has a single Call Stack. It processes one execution context at a time sequentially, offloading long tasks to the browser runtime to keep the main thread responsive.",
        hint: "Think about the Call Stack executing operations one after another in order.",
        hintCostXP: 5,
      },
      {
        id: "js01-q2",
        type: "code_output",
        title: "Sequential Execution",
        prompt: "Predict the exact console output of this sequential code execution:",
        codeSnippet: `console.log("Start");
const appVersion = 1 + 1;
console.log("v" + appVersion);
console.log("Finish");`,
        language: "javascript",
        options: [
          "'Start', 'v2', 'Finish'",
          "'Start', 'v11', 'Finish'",
          "'Finish', 'v2', 'Start'",
          "'Start', 'Finish'",
        ],
        correctAnswer: 0,
        explanation: "JavaScript executes synchronously top-to-bottom. 1 + 1 calculates 2, which is string-concatenated with 'v' to produce 'v2', outputting: 'Start', 'v2', 'Finish'.",
        hint: "Follow the execution line by line from top to bottom.",
        hintCostXP: 5,
      },
      {
        id: "js01-q3",
        type: "multiple_choice",
        title: "JIT Compilation",
        prompt: "How does the V8 engine execute modern JavaScript code so quickly?",
        options: [
          "It converts JavaScript directly into Python code before executing",
          "It uses Just-In-Time (JIT) compilation to compile and optimize hot code into machine code at runtime",
          "It sends every line of code to a remote server for processing",
          "It disables all error checks to increase execution speed",
        ],
        correctAnswer: 1,
        explanation: "Modern engines like V8 use JIT (Just-In-Time) compilation. They parse code into an AST and compile frequently executed 'hot' functions into optimized machine code.",
        hint: "JIT stands for Just-In-Time compilation.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // JS-02: Variables and Data Types
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-javascript-js02",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js02-variables-and-data-types",
    lessonCode: "JS-02",
    lessonTitle: "Variables & Data Types: Storing Data with let & const",
    description: "Verify your mastery of const vs let, block scoping, the 7 primitive data types, and typeof checks.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js02-q1",
        type: "multiple_choice",
        title: "const vs let best practice",
        prompt: "What is the industry best practice when declaring variables in modern JavaScript?",
        options: [
          "Use 'var' for everything because it works in legacy browsers",
          "Default to 'const' for predictability; only switch to 'let' when reassignment is explicitly required",
          "Always use 'let' because 'const' values cannot be read more than once",
          "Declare all variables without keywords to make them globally available",
        ],
        correctAnswer: 1,
        explanation: "Using const by default makes code predictable and prevents accidental reassignment bugs. Use let only when a value genuinely needs reassignment (e.g., loop counters).",
        hint: "Immutability and predictability make code easier to reason about.",
        hintCostXP: 5,
      },
      {
        id: "js02-q2",
        type: "code_output",
        title: "typeof Primitives",
        prompt: "What will this code log to the console?",
        codeSnippet: `const age = 25;
const isMember = true;
let score;
console.log(typeof age, typeof isMember, typeof score);`,
        language: "javascript",
        options: [
          "'number boolean undefined'",
          "'int bool null'",
          "'number boolean null'",
          "'number boolean void'",
        ],
        correctAnswer: 0,
        explanation: "In JavaScript, numeric values have type 'number', booleans have type 'boolean', and an unassigned variable has type 'undefined'.",
        hint: "JavaScript does not have 'int' or 'bool' types; it uses 'number' and 'boolean'.",
        hintCostXP: 5,
      },
      {
        id: "js02-q3",
        type: "multiple_choice",
        title: "null vs undefined",
        prompt: "What is the key semantic difference between 'null' and 'undefined'?",
        options: [
          "'null' is an intentional assignment representing 'no value', while 'undefined' means a variable has been declared but not assigned",
          "'null' is a number equal to 0; 'undefined' is a string",
          "'null' throws a crash when logged, while 'undefined' does not",
          "They are completely identical with no semantic difference",
        ],
        correctAnswer: 0,
        explanation: "'undefined' is JavaScript's default uninitialized state, while 'null' is explicitly assigned by developers to represent intentional absence of value.",
        hint: "One is assigned intentionally by developers; the other is the engine's default empty state.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // JS-03: Operators and Equality
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-javascript-js03",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js03-operators-and-equality",
    lessonCode: "JS-03",
    lessonTitle: "Operators, Equality & Type Coercion: The === Rule",
    description: "Evaluate your mental model of strict equality (===) vs loose equality (==), type coercion, and truthy/falsy evaluation.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js03-q1",
        type: "code_output",
        title: "Strict vs Loose Equality",
        prompt: "Predict the output of these two comparisons:",
        codeSnippet: `console.log(0 == "");
console.log(0 === "");`,
        language: "javascript",
        options: [
          "true then false",
          "false then false",
          "true then true",
          "false then true",
        ],
        correctAnswer: 0,
        explanation: "Double equals (==) coerces empty string '' into 0, making 0 == '' true! Triple equals (===) checks both type and value; since number !== string, 0 === '' is false.",
        hint: "Double equals performs hidden type coercion; triple equals does not.",
        hintCostXP: 5,
      },
      {
        id: "js03-q2",
        type: "multiple_choice",
        title: "Falsy values in JavaScript",
        prompt: "Which of the following values is truthy in JavaScript?",
        options: [
          "The empty string: ''",
          "The number: 0",
          "An empty array: []",
          "The value: null",
        ],
        correctAnswer: 2,
        explanation: "In JavaScript, all objects and arrays (even empty ones like [] and {}) are truthy! Only 6 values are falsy: false, 0, -0, '', null, undefined, and NaN.",
        hint: "Empty objects and arrays are reference types and always evaluate to truthy.",
        hintCostXP: 5,
      },
      {
        id: "js03-q3",
        type: "code_output",
        title: "Logical Short-Circuiting",
        prompt: "What will this short-circuiting expression output?",
        codeSnippet: `const result = "Guest" || "Default";
const guard = null && "Active";
console.log(result, guard);`,
        language: "javascript",
        options: [
          "'Guest null'",
          "'Default Active'",
          "'true false'",
          "'Guest Active'",
        ],
        correctAnswer: 0,
        explanation: "Logical OR (||) returns the first truthy value ('Guest'). Logical AND (&&) returns the first falsy value (null).",
        hint: "|| stops at first truthy; && stops at first falsy.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // JS-06: Functions & Arrow Syntax
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-javascript-js06",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js06-functions-and-arrow-syntax",
    lessonCode: "JS-06",
    lessonTitle: "Functions: Parameters, Return Values & Arrow Syntax",
    description: "Assess your knowledge of function declarations, arrow functions, default parameters, and return value mechanics.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js06-q1",
        type: "code_output",
        title: "Arrow Function Implicit Return",
        prompt: "Predict the output of this concise arrow function:",
        codeSnippet: `const multiply = (a, b = 2) => a * b;
console.log(multiply(5));
console.log(multiply(5, 4));`,
        language: "javascript",
        options: [
          "10 then 20",
          "NaN then 20",
          "undefined then 20",
          "10 then 10",
        ],
        correctAnswer: 0,
        explanation: "When b is omitted, the default parameter b = 2 is used (5 * 2 = 10). When 4 is provided, it calculates 5 * 4 = 20.",
        hint: "Default parameters only activate when the argument is undefined or omitted.",
        hintCostXP: 5,
      },
      {
        id: "js06-q2",
        type: "multiple_choice",
        title: "Arrow Function Characteristics",
        prompt: "Which of the following is true regarding Arrow Functions in JavaScript?",
        options: [
          "They cannot take more than one parameter",
          "They do not have their own 'this' binding or 'arguments' object",
          "They are hoisted above variable declarations",
          "They must always be declared using the 'function' keyword",
        ],
        correctAnswer: 1,
        explanation: "Arrow functions do not bind their own 'this' or 'arguments'; they lexically capture both from the surrounding enclosing scope.",
        hint: "Think about lexical scoping and 'this'.",
        hintCostXP: 5,
      },
      {
        id: "js06-q3",
        type: "code_output",
        title: "Missing Return Statement",
        prompt: "What will be printed when invoking this function without a return keyword?",
        codeSnippet: `function recordMetric(val) {
  const calculated = val * 10;
}
const output = recordMetric(5);
console.log(output);`,
        language: "javascript",
        options: [
          "undefined",
          "50",
          "0",
          "null",
        ],
        correctAnswer: 0,
        explanation: "In JavaScript, any function that finishes executing without reaching an explicit 'return' statement returns undefined by default.",
        hint: "What does JavaScript return when no return statement exists?",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // JS-08: Closures
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-javascript-js08",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js08-closures",
    lessonCode: "JS-08",
    lessonTitle: "Closures: How Functions Remember Their Birthplace",
    description: "Test your mental model of lexical scope, closures, private state encapsulation, and by-reference variable capture.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js08-q1",
        type: "code_output",
        title: "Closure Counter State",
        prompt: "Predict what will be logged after calling these closure counter instances:",
        codeSnippet: `function makeCounter() {
  let count = 0;
  return () => ++count;
}

const c1 = makeCounter();
const c2 = makeCounter();

console.log(c1(), c1(), c2());`,
        language: "javascript",
        options: [
          "1 2 1",
          "1 2 3",
          "1 1 1",
          "undefined undefined undefined",
        ],
        correctAnswer: 0,
        explanation: "Each call to makeCounter() creates a brand-new lexical environment with its own private 'count' variable. c1 increments its count twice (1, 2), while c2 has its own independent count (1).",
        hint: "Each invocation of the factory function allocates a separate closure with isolated memory.",
        hintCostXP: 5,
      },
      {
        id: "js08-q2",
        type: "multiple_choice",
        title: "Definition of Closure",
        prompt: "What is a Closure in JavaScript?",
        options: [
          "A command used to close a network socket",
          "A function bundled with references to its surrounding lexical state, retaining access even after the outer function finishes executing",
          "An error thrown when a script tag fails to load",
          "A method that converts an object into a string",
        ],
        correctAnswer: 1,
        explanation: "A closure is formed when an inner function retains access to variables declared in its outer lexical scope, even after the parent function has returned.",
        hint: "Think about the function remembering its birthplace variables.",
        hintCostXP: 5,
      },
      {
        id: "js08-q3",
        type: "code_output",
        title: "The Classic for Loop Closure Trap",
        prompt: "What is logged by this classic loop with 'let' (block scope)?",
        codeSnippet: `const callbacks = [];
for (let i = 0; i < 3; i++) {
  callbacks.push(() => i);
}
console.log(callbacks[0](), callbacks[2]());`,
        language: "javascript",
        options: [
          "0 2",
          "3 3",
          "0 0",
          "undefined undefined",
        ],
        correctAnswer: 0,
        explanation: "Because 'let' is block-scoped, JavaScript creates a fresh binding of 'i' for every single loop iteration. callbacks[0]() closes over i=0, and callbacks[2]() closes over i=2.",
        hint: "'let' creates a new binding for each loop iteration; 'var' would share one binding.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // JS-11: Essential Array Methods
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-javascript-js11",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js11-essential-array-methods",
    lessonCode: "JS-11",
    lessonTitle: "Essential Array Methods: map, filter, find & reduce",
    description: "Evaluate your skills in functional array transformations, predicate filtering, item lookup, and accumulator reduction.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js11-q1",
        type: "code_output",
        title: "filter and map chaining",
        prompt: "What will this chained array operation output?",
        codeSnippet: `const numbers = [1, 2, 3, 4, 5];
const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 10);
console.log(result);`,
        language: "javascript",
        options: [
          "[20, 40]",
          "[10, 20, 30, 40, 50]",
          "[2, 4]",
          "[60]",
        ],
        correctAnswer: 0,
        explanation: "filter(n => n % 2 === 0) keeps only even numbers [2, 4]. map(n => n * 10) multiplies each by 10 to produce [20, 40].",
        hint: "Filter first for evens, then multiply remaining items by 10.",
        hintCostXP: 5,
      },
      {
        id: "js11-q2",
        type: "multiple_choice",
        title: "find vs filter difference",
        prompt: "What is the key difference between .find() and .filter()?",
        options: [
          "find() returns the first matching element directly (or undefined), whereas filter() returns an array of all matches",
          "find() mutates the original array in place, while filter() creates a copy",
          "filter() only accepts number elements; find() works only on objects",
          "There is no difference; find is an alias for filter",
        ],
        correctAnswer: 0,
        explanation: "find() stops evaluating as soon as it finds the first element matching the predicate, returning that element. filter() checks all elements and returns a new array.",
        hint: "One returns an element directly; the other returns an array.",
        hintCostXP: 5,
      },
      {
        id: "js11-q3",
        type: "code_output",
        title: "reduce Sum Accumulation",
        prompt: "Predict the final number calculated by this reduce accumulator:",
        codeSnippet: `const cart = [{ price: 10 }, { price: 25 }, { price: 15 }];
const total = cart.reduce((acc, item) => acc + item.price, 0);
console.log(total);`,
        language: "javascript",
        options: [
          "50",
          "25",
          "0",
          "NaN",
        ],
        correctAnswer: 0,
        explanation: "Initial accumulator is 0. 0 + 10 = 10; 10 + 25 = 35; 35 + 15 = 50.",
        hint: "Trace the sum: 0 + 10 + 25 + 15.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // JS-17: The this Keyword
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-javascript-js17",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js17-the-this-keyword",
    lessonCode: "JS-17",
    lessonTitle: "The this Keyword: Who Called Me?",
    description: "Assess your mastery of implicit method binding, lexical arrow this, and explicit binding with call, apply, and bind.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js17-q1",
        type: "code_output",
        title: "Method Invocation Rule",
        prompt: "Predict what will be logged when this method is invoked:",
        codeSnippet: `const robot = {
  model: "T-800",
  identify() {
    return "Model: " + this.model;
  }
};
console.log(robot.identify());`,
        language: "javascript",
        options: [
          "'Model: T-800'",
          "'Model: undefined'",
          "TypeError: cannot read property model of undefined",
          "'Model: Object'",
        ],
        correctAnswer: 0,
        explanation: "Because robot is immediately to the left of the dot at call time (robot.identify()), 'this' points directly to the robot object.",
        hint: "Look to the left of the dot at the moment of function invocation.",
        hintCostXP: 5,
      },
      {
        id: "js17-q2",
        type: "multiple_choice",
        title: "Arrow functions and this",
        prompt: "Why should you avoid using Arrow Functions for object methods?",
        options: [
          "Arrow functions execute too slowly",
          "Arrow functions do not bind their own 'this'; they lexically capture 'this' from the outer module or window scope",
          "Arrow functions cannot return strings",
          "Arrow functions can only be invoked once",
        ],
        correctAnswer: 1,
        explanation: "Arrow functions do not create their own 'this'. When used as an object method, 'this' refers to the outer scope (e.g., window or module exports) rather than the object instance.",
        hint: "Arrow functions inherit 'this' lexically from their surrounding declaration context.",
        hintCostXP: 5,
      },
      {
        id: "js17-q3",
        type: "code_output",
        title: "Explicit Binding with call",
        prompt: "What will this explicit binding snippet log?",
        codeSnippet: `function greet() {
  return "Hello, " + this.name;
}
const user = { name: "Aria" };
console.log(greet.call(user));`,
        language: "javascript",
        options: [
          "'Hello, Aria'",
          "'Hello, undefined'",
          "TypeError: greet is not a function",
          "'Hello, user'",
        ],
        correctAnswer: 0,
        explanation: ".call(user) executes the function immediately, explicitly setting 'this' to the user object.",
        hint: ".call() binds 'this' to the first argument and invokes immediately.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // JS-21: Promises & Chaining
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-javascript-js21",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js21-promises-and-chaining",
    lessonCode: "JS-21",
    lessonTitle: "Promises: Managing Future Values with .then() & .catch()",
    description: "Evaluate your comprehension of Promise states, chaining transformations, error propagation, and finally cleanup.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js21-q1",
        type: "code_output",
        title: "Promise .then Chaining",
        prompt: "What will be printed to the console by this Promise chain?",
        codeSnippet: `Promise.resolve(5)
  .then(val => val * 2)
  .then(val => val + 3)
  .then(val => console.log(val));`,
        language: "javascript",
        options: [
          "13",
          "10",
          "5",
          "NaN",
        ],
        correctAnswer: 0,
        explanation: "5 is resolved; the first .then multiplies by 2 (10); the second .then adds 3 (13); the third logs 13.",
        hint: "Follow the value through each step of the pipeline: 5 -> *2 -> +3.",
        hintCostXP: 5,
      },
      {
        id: "js21-q2",
        type: "multiple_choice",
        title: "Error Propagation in Chains",
        prompt: "Where does execution jump if an error is thrown inside the first .then() of a Promise chain?",
        options: [
          "It ignores the error and continues to the next .then() with null",
          "It skips all subsequent .then() callbacks and jumps directly to the nearest .catch() handler",
          "It restarts the entire script from line 1",
          "It pauses execution for 5 seconds and retries",
        ],
        correctAnswer: 1,
        explanation: "When an exception occurs or a promise rejects, JavaScript skips remaining .then() handlers until it finds the nearest .catch() handler in the chain.",
        hint: ".catch() captures errors thrown anywhere above it in the chain.",
        hintCostXP: 5,
      },
      {
        id: "js21-q3",
        type: "code_output",
        title: "Promise.all Behavior",
        prompt: "What will this concurrent Promise.all operation log?",
        codeSnippet: `const p1 = Promise.resolve("A");
const p2 = Promise.resolve("B");
Promise.all([p1, p2]).then(results => console.log(results.join("-")));`,
        language: "javascript",
        options: [
          "'A-B'",
          "'AB'",
          "'A'",
          "'undefined-undefined'",
        ],
        correctAnswer: 0,
        explanation: "Promise.all waits for all promises in the array to resolve and delivers their results as an array ['A', 'B']. .join('-') outputs 'A-B'.",
        hint: "Promise.all delivers an array of all resolved values.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // JS-23: The Event Loop & Concurrency
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-javascript-js23",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js23-the-event-loop",
    lessonCode: "JS-23",
    lessonTitle: "The Event Loop & Concurrency: Call Stack & Task Queues",
    description: "Master the exact runtime execution order between synchronous Call Stack code, Microtasks (Promises), and Macrotasks (Timers).",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js23-q1",
        type: "code_output",
        title: "Microtask vs Macrotask Order",
        prompt: "In what exact order will the numbers 1, 2, 3, 4 be logged to the console?",
        codeSnippet: `console.log(1);

setTimeout(() => {
  console.log(4);
}, 0);

Promise.resolve().then(() => {
  console.log(3);
});

console.log(2);`,
        language: "javascript",
        options: [
          "1, 2, 3, 4",
          "1, 4, 3, 2",
          "1, 2, 4, 3",
          "3, 1, 2, 4",
        ],
        correctAnswer: 0,
        explanation: "1. Synchronous code on the Call Stack runs first: prints 1, then 2.\n2. When the Call Stack empties, the Microtask Queue drains: prints 3.\n3. The Event Loop advances to the Macrotask Queue: prints 4.\nFinal order: 1, 2, 3, 4.",
        hint: "Synchronous first -> Microtasks (Promises) second -> Macrotasks (setTimeout) third.",
        hintCostXP: 5,
      },
      {
        id: "js23-q2",
        type: "multiple_choice",
        title: "Microtask Queue Drain Rule",
        prompt: "When does the Event Loop check and process the Macrotask Queue (timers and I/O)?",
        options: [
          "Only after the Call Stack is empty AND the Microtask Queue is completely drained",
          "Simultaneously on a separate background thread",
          "Before executing any synchronous functions",
          "Every 100 milliseconds regardless of other tasks",
        ],
        correctAnswer: 0,
        explanation: "The engine never advances to the next Macrotask until the Call Stack is empty and all pending Microtasks (promises) have completely finished running.",
        hint: "Microtasks have VIP priority over Macrotasks.",
        hintCostXP: 5,
      },
      {
        id: "js23-q3",
        type: "code_output",
        title: "Zero-Millisecond Timeout",
        prompt: "What does setTimeout(fn, 0) do in JavaScript?",
        codeSnippet: `console.log("A");
setTimeout(() => console.log("C"), 0);
console.log("B");`,
        language: "javascript",
        options: [
          "Logs A, B, C",
          "Logs A, C, B",
          "Logs C, A, B",
          "Throws an error because delay cannot be zero",
        ],
        correctAnswer: 0,
        explanation: "Even with 0ms delay, the callback is placed on the Macrotask Queue. It cannot execute until all synchronous code (A, then B) completes and the Call Stack clears.",
        hint: "Timers always wait for the Call Stack to empty.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // JS-28: Browser DOM Essentials
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-javascript-js28",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js28-dom-essentials",
    lessonCode: "JS-28",
    lessonTitle: "Browser DOM Essentials: Selecting & Modifying Elements",
    description: "Assess your ability to safely select and manipulate DOM elements, prevent XSS attacks, and manage dynamic CSS classes.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js28-q1",
        type: "multiple_choice",
        title: "Preventing XSS with textContent",
        prompt: "Why should you use 'textContent' instead of 'innerHTML' when updating an element with user-provided text?",
        options: [
          "'textContent' automatically escapes HTML tags, preventing Cross-Site Scripting (XSS) attacks",
          "'textContent' changes the font color to green automatically",
          "'innerHTML' has been deprecated in HTML5",
          "'textContent' only works with numeric values",
        ],
        correctAnswer: 0,
        explanation: "textContent treats input strictly as plain text, escaping HTML entities like '<script>' so malicious scripts cannot execute.",
        hint: "Think about security and Cross-Site Scripting (XSS).",
        hintCostXP: 5,
      },
      {
        id: "js28-q2",
        type: "multiple_choice",
        title: "querySelector Selector Syntax",
        prompt: "Which method selects the FIRST element matching the CSS class 'highlight' on the page?",
        options: [
          "document.querySelector('.highlight')",
          "document.getElementsByClassName('highlight')",
          "document.querySelectorAll('.highlight')",
          "document.selectElement('highlight')",
        ],
        correctAnswer: 0,
        explanation: "document.querySelector('.highlight') takes any standard CSS selector and returns the very first matching Element node, or null if no match exists.",
        hint: "CSS class selectors use a dot (.), and querySelector returns the first match.",
        hintCostXP: 5,
      },
      {
        id: "js28-q3",
        type: "multiple_choice",
        title: "classList API",
        prompt: "Which classList method adds a CSS class if it is missing, or removes it if it is already present?",
        options: [
          "element.classList.toggle('active')",
          "element.classList.switch('active')",
          "element.classList.flip('active')",
          "element.classList.change('active')",
        ],
        correctAnswer: 0,
        explanation: "element.classList.toggle('active') checks if the class exists: if present, it removes it; if absent, it adds it.",
        hint: "The word means to flip a switch back and forth.",
        hintCostXP: 5,
      },
    ],
  },
];
