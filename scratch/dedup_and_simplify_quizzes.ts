import fs from "fs";
import { JAVASCRIPT_MODULE_QUIZZES } from "../lib/quiz/javascript-quizzes";

// Map unique quizzes by lessonCode
const uniqueMap = new Map<string, any>();
for (const q of JAVASCRIPT_MODULE_QUIZZES) {
  if (!uniqueMap.has(q.lessonCode)) {
    // deep clone
    uniqueMap.set(q.lessonCode, JSON.parse(JSON.stringify(q)));
  }
}

console.log(`Found ${uniqueMap.size} unique quizzes.`);

// Sort from JS-01 to JS-30
const sortedQuizzes: any[] = [];
for (let i = 1; i <= 30; i++) {
  const code = `JS-${i < 10 ? "0" + i : i}`;
  const q = uniqueMap.get(code);
  if (q) {
    sortedQuizzes.push(q);
  }
}

// Now apply specific simplifications to make English crystal clear and beginner-friendly
for (const quiz of sortedQuizzes) {
  // Simplify description
  if (quiz.lessonCode === "JS-01") {
    quiz.description = "Test your understanding of how JavaScript runs code line by line, the Call Stack, and the console.";
    for (const q of quiz.questions) {
      if (q.id === "js01-q1") {
        q.explanation = "JavaScript has one Call Stack. It executes one line at a time from top to bottom, handing slow background tasks to the browser so your page stays responsive.";
        q.hint = "Think about JavaScript running instructions one after another in order.";
      }
      if (q.id === "js01-q2") {
        q.explanation = "JavaScript runs line by line from top to bottom. 1 + 1 calculates 2, which combines with 'v' to make 'v2', outputting: 'Start', 'v2', 'Finish'.";
      }
      if (q.id === "js01-q3") {
        q.title = "Fast Engine Execution";
        q.prompt = "How does the browser engine run JavaScript code so fast?";
        q.options = [
          "It converts JavaScript into Python code before running",
          "It translates and optimizes code into fast computer instructions right as your program runs",
          "It sends every line of code to a remote server for processing",
          "It disables all error checks to increase execution speed",
        ];
        q.correctAnswer = 1;
        q.explanation = "Modern browser engines translate JavaScript into fast computer instructions right as it runs, speeding up functions that are used often.";
        q.hint = "The engine turns your code into fast computer instructions as it runs.";
      }
    }
  }

  if (quiz.lessonCode === "JS-02") {
    quiz.description = "Check your understanding of const vs let, curly-brace scope, the 7 basic data types, and typeof checks.";
    for (const q of quiz.questions) {
      if (q.hint && q.hint.includes("Immutability")) {
        q.hint = "Values that cannot change by accident make your code safe and predictable.";
      }
    }
  }

  if (quiz.lessonCode === "JS-03") {
    quiz.lessonTitle = "Operators, Equality & Type Conversion: The === Rule";
    quiz.description = "Check your understanding of math operators, logical operators, truthy/falsy values, and why === is safer than ==.";
    for (const q of quiz.questions) {
      if (q.explanation && q.explanation.includes("type coercion")) {
        q.explanation = "Strict equality (===) checks both the value and the type. Unlike double equals (==), it never guesses or converts types behind your back.";
      }
    }
  }

  if (quiz.lessonCode === "JS-06") {
    for (const q of quiz.questions) {
      if (q.explanation && q.explanation.includes("lexically")) {
        q.explanation = "Arrow functions do not have their own 'this'. They simply borrow 'this' from the code around them where they were written.";
      }
      if (q.hint && q.hint.includes("lexical")) {
        q.hint = "Arrow functions borrow 'this' from the code around them.";
      }
    }
  }

  if (quiz.lessonCode === "JS-08") {
    quiz.description = "Test your understanding of how functions remember variables from where they were created.";
    for (const q of quiz.questions) {
      if (q.id === "js08-q1") {
        q.title = "Counter Function Output";
        q.prompt = "What will this code log to the console?";
        q.options = [
          "'1 2 1'",
          "'1 2 3'",
          "'1 1 1'",
          "'0 1 0'"
        ];
        q.correctAnswer = 0;
        q.explanation = "Each call to makeCounter() creates a new function with its own private 'count' variable. Because c1 and c2 have separate private memory, c1 reaches 2 while c2 starts fresh at 1, outputting: 1 2 1.";
        q.hint = "Each time you call makeCounter(), it gets its own separate counter variable.";
      }
      if (q.id === "js08-q2") {
        q.title = "What is a Closure?";
        q.prompt = "What is a closure in JavaScript?";
        q.options = [
          "A command used to close a network socket or browser window",
          "A function that remembers the variables from the place where it was created, even after the outer function has finished running",
          "An error thrown when a script fails to load",
          "A method that converts an object into text"
        ];
        q.correctAnswer = 1;
        q.explanation = "A closure happens when a function remembers the variables from the place where it was created, even after the outer function has finished running.";
        q.hint = "Think of a function carrying a backpack of variables from where it was born.";
      }
    }
  }

  if (quiz.lessonCode === "JS-09") {
    for (const q of quiz.questions) {
      if (q.id === "js09-q3") {
        q.title = "Passing a Function vs Calling It";
        q.prompt = "When passing a function as a callback (e.g., button.addEventListener('click', handleClick)), why do we write handleClick instead of handleClick()?";
        q.options = [
          "handleClick() would pass the function reference, which is invalid",
          "handleClick passes the function itself so the browser can run it later; handleClick() runs it immediately",
          "Parentheses are optional in all JavaScript function calls",
          "addEventListener requires functions to have no names"
        ];
        q.correctAnswer = 1;
        q.explanation = "Adding parentheses () runs the function immediately right now. Leaving off parentheses passes the function so the browser can run it later when clicked.";
      }
    }
  }

  if (quiz.lessonCode === "JS-10") {
    for (const q of quiz.questions) {
      if (q.id === "js10-q3") {
        q.options = [
          "slice alters the original array; splice returns a shallow copy",
          "slice returns a new array without changing the original; splice modifies the original array in place",
          "slice only works on strings; splice only works on numbers",
          "Both methods change the original list equally"
        ];
      }
    }
  }

  if (quiz.lessonCode === "JS-16") {
    for (const q of quiz.questions) {
      if (q.id === "js16-q3") {
        q.prompt = "How do you safely call a callback function that might not have been provided?";
        q.explanation = "callback?.() checks if callback is null or undefined before attempting to call it, preventing 'is not a function' errors.";
      }
    }
  }

  if (quiz.lessonCode === "JS-13") {
    quiz.description = "Understand how objects are stored in memory, why copying a variable can point to the same object, and how to make safe copies.";
    for (const q of quiz.questions) {
      if (q.title && q.title.includes("Mutation")) {
        q.title = "Accidental Changes with Shared Objects";
      }
      if (q.explanation && q.explanation.includes("shared reference")) {
        q.explanation = "Because original and copy point to the exact same object in memory, changing a property through one variable changes the object for both.";
      }
    }
  }

  if (quiz.lessonCode === "JS-17") {
    quiz.description = "Check your understanding of the 'this' keyword: method calls, arrow functions, and how 'this' gets its value.";
    for (const q of quiz.questions) {
      if (q.title === "Method Invocation Rule") {
        q.title = "Method Call Rule";
      }
      if (q.prompt.includes("invoked")) {
        q.prompt = "Predict what will be logged when this method is called:";
      }
      if (q.hint && q.hint.includes("invocation")) {
        q.hint = "Look immediately to the left of the dot when the function is called.";
      }
      if (q.options) {
        q.options = q.options.map((opt: string) => {
          if (opt.includes("lexically capture")) {
            return "Arrow functions do not have their own 'this'; they borrow 'this' from the outer code where they were created";
          }
          if (opt.includes("can only be invoked once")) {
            return "Arrow functions can only be called once";
          }
          return opt;
        });
      }
      if (q.hint && q.hint.includes("lexically")) {
        q.hint = "Arrow functions borrow 'this' directly from the code around them.";
      }
    }
  }

  if (quiz.lessonCode === "JS-18") {
    quiz.lessonTitle = "Prototypes & Inheritance: How JavaScript Shares Methods";
    quiz.description = "Test your understanding of object prototypes, method sharing, and looking up properties.";
    for (const q of quiz.questions) {
      if (q.title && q.title.includes("Prototypal")) {
        q.title = "Object Prototypes";
      }
      if (q.explanation && q.explanation.includes("prototype chain")) {
        q.explanation = "If JavaScript cannot find a property directly on an object, it automatically looks at the object's prototype to find it. This lets multiple objects share the same helper methods.";
      }
    }
  }

  if (quiz.lessonCode === "JS-19") {
    quiz.description = "Test your understanding of modern JavaScript classes, constructors, and using extends and super().";
    for (const q of quiz.questions) {
      if (q.options) {
        q.options = q.options.map((opt: string) => {
          if (opt.includes("Syntactic sugar")) {
            return "A cleaner, modern way to create objects using JavaScript's prototype system under the hood";
          }
          return opt;
        });
      }
      if (q.hint && q.hint.includes("syntactic sugar")) {
        q.hint = "Classes provide a cleaner syntax over JavaScript prototypes.";
      }
    }
  }

  if (quiz.lessonCode === "JS-20") {
    quiz.lessonTitle = "Async JavaScript: Blocking vs Non-Blocking Code";
    quiz.description = "Test your understanding of why slow tasks run in the background with setTimeout instead of freezing your page.";
    for (const q of quiz.questions) {
      if (q.explanation && q.explanation.includes("synchronously")) {
        q.explanation = "1 logs first. setTimeout hands the timer to the browser to wait in the background. 3 logs next. When the timer finishes, 2 logs last.";
      }
    }
  }

  if (quiz.lessonCode === "JS-21") {
    quiz.description = "Test your understanding of Promises: pending, fulfilled, and rejected states, and chaining with .then() and .catch().";
    for (const q of quiz.questions) {
      if (q.title && q.title.includes("Propagation")) {
        q.title = "Handling Errors in Promise Chains";
      }
      if (q.prompt.includes("concurrent Promise.all")) {
        q.prompt = "What will Promise.all log when running these tasks together?";
      }
      if (q.options) {
        q.options = q.options.map((opt: string) => {
          if (opt.includes("concurrently")) {
            return opt.replace("concurrently", "at the same time");
          }
          return opt;
        });
      }
      if (q.explanation && q.explanation.includes("error propagates down")) {
        q.explanation = "If an error happens anywhere in a Promise chain, JavaScript skips ahead to the nearest .catch() block to handle it safely.";
      }
    }
  }

  if (quiz.lessonCode === "JS-22") {
    for (const q of quiz.questions) {
      if (q.options) {
        q.options = q.options.map((opt: string) => {
          if (opt.includes("concurrently")) {
            return opt.replace("concurrently", "at the same time");
          }
          return opt;
        });
      }
    }
  }

  if (quiz.lessonCode === "JS-23") {
    quiz.lessonTitle = "The Event Loop: Call Stack & Task Queues";
    quiz.description = "Understand how JavaScript runs code on the Call Stack and handles background tasks with microtasks (Promises) and macrotasks (Timers).";
    for (const q of quiz.questions) {
      if (q.explanation && q.explanation.includes("synchronous code")) {
        q.explanation = "Code on the Call Stack runs first. When it clears, microtasks (like Promises) run next before any macrotasks (like setTimeout).";
      }
    }
  }

  if (quiz.lessonCode === "JS-26") {
    for (const q of quiz.questions) {
      if (q.options) {
        q.options = q.options.map((opt: string) => {
          if (opt.includes("runs asynchronously")) {
            return "JSON.parse runs in the background and returns a Promise";
          }
          return opt;
        });
      }
    }
  }

  if (quiz.lessonCode === "JS-29") {
    for (const q of quiz.questions) {
      if (q.id === "js29-q1") {
        q.prompt = "What is 'event bubbling' in the browser?";
        q.options = [
          "When an event is cancelled and never runs",
          "When an event happens on an element and travels upward through its parent elements like an air bubble in water",
          "When the browser reloads the entire page automatically",
          "When an event only works on mobile touchscreens",
        ];
        q.correctAnswer = 1;
        q.explanation = "Event bubbling means an event fires on the clicked element first, and then travels up through each parent element in the page.";
        q.hint = "Think of air bubbles rising upward through water.";
      }
    }
  }
}

// Generate typescript code
const header = `/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * JAVASCRIPT CURATED MODULE QUIZZES REPOSITORY
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Authoritative, curriculum-aligned module quizzes for LearnCraft's JavaScript
 * learning track (JS-01 through JS-30).
 *
 * Written in simple, clear, beginner-friendly English so that learners can
 * easily test their JavaScript understanding.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { ModuleQuiz } from "./quiz-types";

export const JAVASCRIPT_MODULE_QUIZZES: ModuleQuiz[] = ${JSON.stringify(sortedQuizzes, null, 2)};
`;

fs.writeFileSync("lib/quiz/javascript-quizzes.ts", header, "utf8");
console.log(`Successfully rewrote lib/quiz/javascript-quizzes.ts with ${sortedQuizzes.length} deduplicated, simplified quizzes!`);
