const fs = require('fs');

let content = fs.readFileSync('lib/interview-questions/javascript-questions.ts', 'utf8');

const replacements = [
  {
    from: `JavaScript has 7 primitive types that store values directly in memory and are immutable. Objects are reference types that store a memory address. The fact that \`typeof null === \\"object\\"\` is a well-known historical bug in JavaScript from 1995 that cannot be fixed without breaking old websites.`,
    to: `JavaScript has 7 simple primitive data types (like text, numbers, and booleans). They store their values directly, and you cannot alter their inner parts. Objects, however, are collections of data stored by reference. The fact that \`typeof null === \\"object\\"\` is an old historical bug from the first version of JavaScript in 1995 that cannot be changed today without breaking existing websites.`
  },
  {
    from: `In IEEE 754 floating-point standard, \`NaN\` represents an invalid or unrepresentable mathematical result (such as \`0 / 0\` or \`parseInt(\\"abc\\")\`). It is the only value in JavaScript that is not equal to itself.`,
    to: `\`NaN\` stands for 'Not-a-Number', but JavaScript ironically categorizes it as a number! It represents an impossible math calculation (like dividing zero by zero). It is special because it is the only value in all of JavaScript that is never equal to itself.`
  },
  {
    from: `Arrow functions provide shorter syntax and inherit \`this\` from their surrounding scope (lexical \`this\`). Unlike traditional functions, arrow functions cannot be used as constructors, do not have their own \`arguments\` object, and cannot have their \`this\` rebound using \`call\`, \`apply\`, or \`bind\`.`,
    to: `Arrow functions (() => {}) provide a shorter way to write functions and automatically borrow \`this\` from the code around them. Unlike regular functions, arrow functions cannot be used as object blueprints with 'new', and they do not have the old 'arguments' keyword.`
  },
  {
    from: `\`map()\` returns a **new array** containing the transformed results of each element. \`forEach()\` simply iterates over items to perform side effects and always returns \`undefined\`. Use \`reduce()\` when you need to condense an array down to a single value, such as a sum, an object lookup map, or a grouped structure.`,
    to: `\`map()\` creates and returns a **brand-new list** where each item has been transformed. \`forEach()\` simply loops over the items to do something with them (like printing to the console) and always returns \`undefined\`. Use \`reduce()\` when you want to take an entire list and combine it into one single result, like finding a total sum or building a summary object.`
  },
  {
    from: `Destructuring is an ES6 syntax that unpacks values from arrays or properties from objects into distinct variables in a clean, one-line declaration.`,
    to: `Destructuring is a convenient shorthand that lets you unpack items from arrays or properties from objects directly into distinct variables in a single clean line.`
  },
  {
    from: `The logical OR operator (\`||\`) falls back on **any falsy value** (\`0\`, \`\\"\\"\`, \`false\`, \`NaN\`, \`null\`, \`undefined\`). The nullish coalescing operator (\`??\`) falls back **only on nullish values** (\`null\` or \`undefined\`).`,
    to: `The logical OR operator (\`||\`) replaces **any falsy value** (including 0, false, and empty text). The nullish coalescing operator (\`??\`) is smarter: it replaces **only missing values** (\`null\` or \`undefined\`), safely keeping valid zero (0) and false values.`
  },
  {
    from: `The \`finally\` block **always runs**, regardless of whether an error was thrown or whether the \`try\` block executed a \`return\` statement. If the \`finally\` block explicitly returns a value, it overrides and discards any return value or uncaught exception from the \`try\` or \`catch\` blocks.`,
    to: `The \`finally\` block **always runs**, no matter what happens in \`try\` or \`catch\`. Even if the \`try\` block already returned a value, \`finally\` runs right before exiting. If \`finally\` returns a value of its own, it overrides and replaces everything else.`
  },
  {
    from: `\`async/await\` is syntactic sugar built on top of native JavaScript Promises and Generators. An \`async\` function always returns a Promise, and the \`await\` keyword pauses execution of the function until the promise settles, allowing asynchronous code to be written sequentially with standard \`try...catch\` blocks.`,
    to: `\`async/await\` is a modern, clean way to handle background tasks without messy callback chains. An \`async\` function always returns a Promise. The \`await\` keyword pauses the function until the background task is done, letting you write asynchronous code that reads just like regular step-by-step code.`
  },
  {
    from: `\`getElementsByClassName\` returns a **live HTMLCollection** that automatically updates whenever elements are added or removed from the DOM. \`querySelectorAll\` returns a **static NodeList** representing a snapshot of elements at the exact moment the query was executed.`,
    to: `\`getElementsByClassName\` returns a **live collection** that changes automatically whenever HTML elements are added or removed from the page. \`querySelectorAll\` returns a **safe snapshot** (a static NodeList) of the elements at the exact moment you asked for them, which makes it much safer to loop over.`
  },
  {
    from: `\`localStorage\` stores data permanently until manually cleared (~5-10MB). \`sessionStorage\` stores data only for the current browser tab session (~5MB). Cookies store smaller amounts of data (~4KB) and are automatically sent to the server with every HTTP request.`,
    to: `\`localStorage\` keeps data permanently on the user's computer until deleted (about 5MB of space). \`sessionStorage\` keeps data only while the browser tab is open and disappears when the tab is closed. Cookies store small bits of data (about 4KB) and are automatically sent to the server with every web request.`
  }
];

let replaced = 0;
for (const item of replacements) {
  if (content.includes(item.from)) {
    content = content.replace(item.from, item.to);
    replaced++;
  } else {
    console.warn('Could not find item:\n' + item.from.slice(0, 60));
  }
}

fs.writeFileSync('lib/interview-questions/javascript-questions.ts', content, 'utf8');
console.log(`Successfully simplified ${replaced} / ${replacements.length} interview answers!`);
