const fs = require('fs');

let fileText = fs.readFileSync('app/learn/javascript/data/javascript-lesson-content.ts', 'utf8');

// Replacements dictionary for academic/complex terms to simple beginner-friendly phrases
const replacements = [
  // JS-01
  {
    from: `"Browsers and Node.js embed engines to execute JS with JIT compilation."`,
    to: `"Browsers have a built-in engine (like Chrome's V8) that translates your JavaScript into fast computer instructions right as it runs."`
  },
  {
    from: `"Statements execute sequentially unless deferred by control flow or timers."`,
    to: `"JavaScript runs one line at a time from top to bottom. It finishes each line before moving to the next."`
  },
  {
    from: `"Inspect variables, types, and logic flow during live execution."`,
    to: `"Print values and messages to your screen so you can easily see what your code is doing."`
  },
  {
    from: `"Always keep statements simple and readable. Use semicolons or consistent ASI and inspect values using console.log."`,
    to: `"Write one simple instruction per line. End statements cleanly with semicolons and use console.log() often to check your values."`
  },
  {
    from: `"The engine reads raw text and converts it into an Abstract Syntax Tree before compiling."`,
    to: `"1. Reading the Code: The engine checks your code for spelling mistakes and builds a clear plan of what you want to do."`
  },
  {
    from: `"Active function calls are pushed onto the call stack and popped off when they return."`,
    to: `"2. The Call Stack: Think of a stack of plates. When you run a function, JavaScript places a plate on top. When the function finishes, it takes that plate off."`
  },
  {
    from: `"Long operations are offloaded so the single thread never freezes the browser UI."`,
    to: `"3. Never Freezing the Screen: JavaScript hands slow tasks (like timers or network downloads) to the browser in the background so your app stays fast and responsive."`
  },
  {
    from: `"A runtime error in synchronous code crashes the call stack, halting all subsequent statements."`,
    to: `"When an unhandled error happens, JavaScript stops running immediately and skips all the lines that come after it."`
  },
  {
    from: `"Sequential statements with clear identifiers and output verification guarantee predictable runtime behavior."`,
    to: `"Running one clear step at a time with simple variable names keeps your program safe, predictable, and easy to follow."`
  },

  // JS-02
  {
    from: `"Use const by default for stable references; use let only when values need reassignment."`,
    to: `"Use const by default for values that never change. Use let only when you know you will change the value later."`
  },
  {
    from: `"String, Number, Boolean, BigInt, Symbol, null, and undefined are stored directly by value."`,
    to: `"JavaScript has 7 simple primitive data types, including text (strings), numbers, and true/false values (booleans)."`
  },
  {
    from: `"var has leaky function scoping and hoists with undefined, causing subtle bugs."`,
    to: `"Old code used var, but var can leak out of loops and cause confusing bugs. Modern JavaScript always uses const and let."`
  },
  {
    from: `"Prevents accidental reassignment. Ensures variables remain predictable."`,
    to: `"Locks the value so you cannot overwrite it by mistake. This keeps your program predictable and safe."`
  },
  {
    from: `"Block-scoped variable that permits reassignment (e.g., loop counters)."`,
    to: `"A flexible variable you can change later, perfect for game scores, user inputs, or counting loops."`
  },
  {
    from: `"Immutable values stored directly in memory (number, string, boolean, etc.)."`,
    to: `"Simple, single values like numbers and text. Changing a copy will never mess up the original."`
  },
  {
    from: `"let and const live only inside the nearest { } enclosing block."`,
    to: `"1. Curly Braces Keep Secrets: Variables created inside { } stay inside those braces. They cannot leak out into other parts of your code."`
  },
  {
    from: `"Accessing let or const before declaration throws a ReferenceError."`,
    to: `"2. Create Before You Use: You must declare a variable before you try to read it. If you try to use it too early, JavaScript stops with an error."`
  },
  {
    from: `"Check the runtime type of any value using typeof (e.g., typeof 42 === 'number')."`,
    to: `"3. Ask JavaScript for the Type: You can check what kind of data something is by writing typeof value (for example, typeof 'cat' returns 'string')."`
  },
  {
    from: `"var ignores block boundaries and leaks outside the loop, polluting the outer scope."`,
    to: `"Because var does not care about curly braces, the variable leaks outside the loop and can accidentally overwrite other variables."`
  },
  {
    from: `"const protects configuration, while let confines loop counters strictly to their block scope."`,
    to: `"Using let keeps the counter safely inside the loop, and it disappears automatically when the loop is done."`
  },

  // JS-03
  {
    from: `"Always use === (strict equality) to check both value and type without silent coercion."`,
    to: `"Always use === (triple equals) because it checks both the value and the type, without guessing or converting types behind your back."`
  },
  {
    from: `"Short-circuit evaluation: && stops at first falsy, || stops at first truthy."`,
    to: `"Smart shortcuts: && (AND) stops at the first false value it sees. || (OR) stops at the first true value it sees."`
  },
  {
    from: `"Loose equality (==) coerces types unpredictably (e.g., [] == false is true!)."`,
    to: `"1. Double Equals Tries to Guess: Double equals (==) tries to convert different types automatically, which leads to strange and confusing surprises."`
  },
  {
    from: `"Expressions evaluate left-to-right and stop as soon as the result is determined."`,
    to: `"2. Quick Checks: JavaScript checks conditions from left to right and stops as soon as it knows the final answer."`
  },
  {
    from: `"Every value in JavaScript is truthy except: false, 0, -0, '', null, undefined, and NaN."`,
    to: `"3. What Counts as False: In an if statement, almost everything is considered true except these 6 falsy values: false, 0, an empty string '', null, undefined, and NaN."`
  },
  {
    from: `"Double equals performs hidden type conversions that lead to bizarre, unpredictable production bugs."`,
    to: `"Double equals (==) silently guesses and changes types, making 0 equal to empty text '', which leads to hard-to-find bugs."`
  },
  {
    from: `"Triple equals checks both the value and type with zero hidden surprises."`,
    to: `"Triple equals (===) strictly checks that both sides have the exact same value and the exact same type."`
  },

  // JS-04
  {
    from: `"Nested if/else blocks create unreadable 'arrow code' with high cognitive complexity."`,
    to: `"Nesting lots of if statements inside each other makes code messy and hard to read."`
  },
  {
    from: `"Guard clauses handle invalid inputs immediately at the top, leaving happy path code flat."`,
    to: `"Checking for errors right at the top allows you to return early, keeping the rest of your code clean and easy to follow."`
  },

  // JS-05
  {
    from: `"Modifying loop condition variables unpredictably or missing increment leads to infinite hangs."`,
    to: `"Forgetting to increase the counter makes the loop run forever, which freezes your browser tab."`
  },
  {
    from: `"Bounded for loops and clear exit conditions prevent runaway execution."`,
    to: `"A clear start, a clear stopping condition, and a reliable counter step keep your loops running smoothly and safely."`
  },

  // JS-06
  {
    from: `"Arrow functions inherit 'this' lexically from surrounding scope; use them for callbacks."`,
    to: `"Arrow functions () => {} are shorter to write and automatically borrow 'this' from the code around them."`
  },
  {
    from: `"Traditional function declarations hoist completely with their body."`,
    to: `"Traditional functions can be called before the line where they are written because JavaScript prepares them first."`
  },

  // JS-07
  {
    from: `"Variables in nested scopes search upward through parent environments until reaching global."`,
    to: `"When a function needs a variable, it looks inside itself first. If it cannot find it, it looks outside into the surrounding code."`
  },
  {
    from: `"Accessing hoisted var before initialization yields confusing 'undefined' instead of catching errors."`,
    to: `"Using var before its line gives you 'undefined' instead of an error, which makes mistakes difficult to spot."`
  },

  // JS-08
  {
    from: `"Closures provide true encapsulation without classes."`,
    to: `"Closures keep your variables safe and private inside a function so outside code cannot accidentally tamper with them."`
  },
  {
    from: `"A closure happens when a function remembers variables from the place it was created, even after that outer function has finished executing."`,
    to: `"A closure happens when a function remembers variables from the place where it was born, even after that outer function has finished running."`
  },
  {
    from: `"Functions capture their birth scope forever."`,
    to: `"Functions remember the variables around them from the moment they were created."`
  },

  // JS-09
  {
    from: `"In JavaScript, functions are first-class values — you can pass a function into another function just like a number or a string."`,
    to: `"In JavaScript, functions are treated just like any other value: you can save them in variables and pass them into other functions as helpers."`
  },

  // JS-10
  {
    from: `"Negative indexing without .at() or accessing beyond array bounds returns undefined."`,
    to: `"Trying to read past the end of an array does not give you an error; it simply returns undefined."`
  },

  // JS-11
  {
    from: `"Imperative loops require manual index tracking, array allocations, and are harder to read and maintain."`,
    to: `"Writing loops by hand takes extra lines of code, requires manual counters, and makes it easy to make counting mistakes."`
  },
  {
    from: `"Declarative method chains read like a clear sentence: filter for inStock, then map to formatted labels."`,
    to: `"Array methods like .filter() and .map() read like clear English: first pick the items you want, then format them."`
  },

  // JS-12
  {
    from: `"Dot notation searches for the exact literal name after the dot. It cannot evaluate variables."`,
    to: `"Dot notation (user.name) looks for the literal word 'name'. If your property name is stored in a variable, you must use square brackets user[key]."`
  },

  // JS-13
  {
    from: `"userB points to the same memory as userA. Mutating userB silently corrupts userA."`,
    to: `"Both variables share the exact same object in memory. Changing one will silently change the other."`
  },
  {
    from: `"Using object spread creates a new memory allocation, leaving the original object unchanged."`,
    to: `"Using the spread operator ({ ...user }) creates a fresh copy so your changes do not affect the original object."`
  },

  // JS-14
  {
    from: `"Manually reassigning individual properties produces repetitive boilerplate."`,
    to: `"Copying properties out of an object one by one requires lots of repetitive, boring code."`
  },
  {
    from: `"Direct parameter destructuring provides immediate clarity, self-documenting inputs, and built-in defaults."`,
    to: `"Destructuring unpacks only the properties you need in a single clean line, with safe default values if anything is missing."`
  },

  // JS-15
  {
    from: `"The legacy arguments object is confusing, not a real array, and does not work in arrow functions."`,
    to: `"The old 'arguments' keyword is confusing and not a real array. Modern code uses rest parameters (...args) instead."`
  },
  {
    from: `"Rest parameters (...numbers) produce a genuine array directly compatible with modern array methods."`,
    to: `"Rest parameters gather any number of inputs into a real, easy-to-use array."`
  },

  // JS-16
  {
    from: `"Using || corrupts valid 0 values, and accessing nested properties without ?. crashes the app."`,
    to: `"Using || accidentally replaces valid zero (0) values, and reading deeply nested properties without ?. crashes your app if anything is missing."`
  },
  {
    from: `"?. prevents runtime crashes, and ?? provides fallback defaults accurately without overwriting 0 or false."`,
    to: `"Optional chaining (?.) stops crashes if something is missing, and nullish coalescing (??) safely keeps zero and false while replacing only null or undefined."`
  },

  // JS-17
  {
    from: `"Arrow functions don't create their own 'this'. Here 'this' points to global/module, where name is undefined."`,
    to: `"Arrow functions do not have their own 'this'. Inside an object method, using an arrow function makes 'this' look at the outside window instead of the object."`
  },
  {
    from: `"Standard method syntax binds 'this' to user; the inner arrow function captures that context cleanly."`,
    to: `"Regular method syntax binds 'this' to the user object, and helper arrow functions inside it safely borrow that same object."`
  },

  // JS-18
  {
    from: `"Attaching methods inside the factory creates thousands of duplicate function objects, wasting memory."`,
    to: `"Attaching a new function to every single object creates thousands of copies in memory, slowing down your app."`
  },
  {
    from: `"Both instances delegate to the same shared method on userMethods, optimizing memory usage."`,
    to: `"All objects share a single method on their prototype, saving computer memory while letting every object use it."`
  },

  // JS-19
  {
    from: `"In JavaScript derived constructors, accessing 'this' before calling super() throws an immediate ReferenceError."`,
    to: `"In a child class, you must call super() first to set up the parent class before you are allowed to use 'this'."`
  },
  {
    from: `"Calling super(name) first initializes the parent Animal state, enabling safe subclass extensions."`,
    to: `"Calling super(name) sets up the parent class properly, so the child class can safely add its own unique features."`
  },

  // JS-20
  {
    from: `"A synchronous busy-wait loop consumes 100% of the single thread, freezing the user's browser completely."`,
    to: `"A heavy, non-stop loop locks up JavaScript's single thread, completely freezing the web page so the user cannot click anything."`
  },
  {
    from: `"The single thread stays completely free to process other tasks while the timer waits in the background."`,
    to: `"JavaScript lets the browser handle waiting in the background, keeping the screen smooth and responsive."`
  },

  // JS-21
  {
    from: `"Deeply nested callbacks are nearly impossible to read, maintain, or error-handle reliably."`,
    to: `"Nesting lots of callbacks inside callbacks creates 'Callback Hell', which is messy, hard to read, and difficult to fix."`
  },
  {
    from: `"Chaining .then() creates a linear pipeline where a single .catch() at the bottom handles any failure."`,
    to: `"Promises let you chain steps cleanly one after another with .then(), and a single .catch() at the end handles any mistake."`
  },

  // JS-22
  {
    from: `"Awaiting independent promises sequentially doubles total wait time. Run them in parallel with Promise.all."`,
    to: `"Waiting for independent tasks one by one doubles your waiting time. Running them together with Promise.all saves precious seconds."`
  },
  {
    from: `"Promise.all executes independent async calls concurrently, halving response latency."`,
    to: `"Promise.all runs all your background tasks at the exact same time, cutting your total waiting time in half."`
  },

  // JS-23
  {
    from: `"Even with 0ms delay, setTimeout is a Macrotask. It must wait until the call stack is completely empty."`,
    to: `"Even with a 0-millisecond delay, timers are placed in a waiting line. They must wait until all regular code finishes before running."`
  },
  {
    from: `"Sync code (1, 2) runs first, then VIP microtask (3) drains, then macrotask (4) runs."`,
    to: `"Regular code runs first. Then Promises run immediately as VIP tasks. Finally, timers run once everything else is clear."`
  },

  // JS-24
  {
    from: `"Swallowing errors silently makes production bugs impossible to diagnose and triage."`,
    to: `"Leaving a catch block empty hides the error silently, making it nearly impossible to figure out why your app broke."`
  },
  {
    from: `"The error is captured with its message, the user receives feedback, and finally cleans up state reliably."`,
    to: `"We log the error message so we can fix it, show a friendly message to the user, and use finally to clean up."`
  },

  // JS-25
  {
    from: `"Monolithic scripts cause global namespace collisions, circular bugs, and zero code reusability."`,
    to: `"Putting everything into one giant file makes it easy to accidentally reuse variable names and break other parts of your code."`
  },
  {
    from: `"Dedicated modules encapsulate logic and clearly declare what capabilities they export and consume."`,
    to: `"Splitting code into small, focused files makes each piece easy to understand, test, and reuse anywhere in your project."`
  },

  // JS-26
  {
    from: `"JSON syntax requires double quotes for keys and strings. Calling JSON.parse without try/catch crashes the app."`,
    to: `"JSON strictly requires double quotes around keys and text. If someone gives you invalid JSON, JSON.parse will crash unless wrapped in try/catch."`
  },
  {
    from: `"Wrapping JSON.parse in a helper function catches syntax errors gracefully and supplies a safe default."`,
    to: `"Wrapping JSON.parse inside a try/catch block catches mistakes kindly and provides a safe fallback value."`
  },

  // JS-27
  {
    from: `"fetch() only rejects on network loss, not HTTP error statuses like 404 or 500."`,
    to: `"fetch() only throws an error if the internet disconnects completely. If a page is not found (404), fetch() still counts it as a completed request."`
  },
  {
    from: `"Checking res.ok ensures that only successful 2xx responses are parsed as JSON."`,
    to: `"Checking res.ok ensures the server gave a successful answer before you try to read the data."`
  },

  // JS-28
  {
    from: `"Using innerHTML with user input allows malicious actors to inject and execute arbitrary JavaScript."`,
    to: `"Using innerHTML with user text allows bad actors to inject dangerous scripts (called Cross-Site Scripting or XSS) into your page."`
  },
  {
    from: `"Using textContent prevents HTML injection completely, and classList adds styles predictably."`,
    to: `"Using textContent treats everything as safe plain text, and classList lets you add or remove CSS classes cleanly."`
  },

  // JS-29
  {
    from: `"Attaching listeners to every child consumes memory and fails to work for dynamically added elements."`,
    to: `"Attaching click listeners to hundreds of separate buttons wastes memory, and new buttons added later will not respond to clicks."`
  },
  {
    from: `"One listener on the parent handles clicks for all current and future dynamic items with zero memory waste."`,
    to: `"Placing a single listener on the parent container handles clicks for all current buttons and any new buttons created in the future."`
  },

  // JS-30
  {
    from: `"localStorage calls toString() on values, turning objects into '[object Object]' unless serialized with JSON.stringify."`,
    to: `"localStorage can only save text. If you pass an object directly without JSON.stringify, it saves the useless text '[object Object]'."`
  },
  {
    from: `"JSON serialization safely preserves object keys and types across page reloads."`,
    to: `"Converting objects to text with JSON.stringify keeps your data safe so you can read it back with JSON.parse after refreshing the page."`
  }
];

let replacedCount = 0;
for (const item of replacements) {
  if (fileText.includes(item.from)) {
    fileText = fileText.replace(item.from, item.to);
    replacedCount++;
  } else {
    console.warn(`Could not find target snippet:\n${item.from.slice(0, 60)}...`);
  }
}

fs.writeFileSync('app/learn/javascript/data/javascript-lesson-content.ts', fileText, 'utf8');
console.log(`Successfully simplified ${replacedCount} / ${replacements.length} sections in javascript-lesson-content.ts!`);
