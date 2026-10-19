const fs = require('fs');

let fileText = fs.readFileSync('app/learn/javascript/data/javascript-lesson-content.ts', 'utf8');

const replacements = [
  // JS-01
  {
    from: `"title": "1. Parsing & AST",`,
    to: `"title": "1. Reading and Checking Code",`
  },
  // JS-02
  {
    from: `"title": "2. Temporal Dead Zone",`,
    to: `"title": "2. Reading Before Creating",`
  },
  {
    from: `// Primitive, immutable values stored directly by value:`,
    to: `// Primitive values stored directly by value (cannot be modified in place):`
  },
  // JS-03
  {
    from: `"title": "JS-03: Operators, Equality & Type Coercion: The === Rule",`,
    to: `"title": "JS-03: Operators, Equality & Type Conversion: The === Rule",`
  },
  {
    from: `"title": "Operators, Equality & Type Coercion: The === Rule",`,
    to: `"title": "Operators, Equality & Type Conversion: The === Rule",`
  },
  {
    from: `"label": "Coercion Traps",`,
    to: `"label": "Type Guessing Traps",`
  },
  {
    from: `"title": "❌ Bad: Using loose equality (==) and confusing type coercion",`,
    to: `"title": "❌ Bad: Using double equals (==) and confusing automatic conversions",`
  },
  {
    from: `"Because === checks both value and type without performing confusing implicit type coercion."`,
    to: `"Because === checks both the value and the type without guessing or changing types behind your back."`
  },
  {
    from: `"explanation": "Strict equality (===) avoids silent type coercion bugs by checking both the value and type."`,
    to: `"explanation": "Strict equality (===) avoids unexpected type conversion bugs by checking both the value and type."`
  },
  // JS-05
  {
    from: `"for (const item of list) — modern, readable loop for arrays without index boilerplate."`,
    to: `"for (const item of list) — modern, readable loop for arrays without manually counting index numbers."`
  },
  {
    from: `"desc": "Use for...of for clean, readable array traversal without indices."`,
    to: `"desc": "Use for...of for clean, readable array loops without manually counting index numbers."`
  },
  // JS-08
  {
    from: `"tag": "ENCAPSULATION"`,
    to: `"tag": "PRIVATE DATA"`
  },
  {
    from: `"title": "Lexical Scoping",`,
    to: `"title": "Where Variables Live",`
  },
  {
    from: `"title": "Data Privacy & Encapsulation",`,
    to: `"title": "Data Privacy & Keeping Variables Safe",`
  },
  {
    from: `"description": "A function bundled together with references to its surrounding lexical state.",`,
    to: `"description": "A function bundled together with the variables from where it was created.",`
  },
  {
    from: `"title": "Private Variables & Data Encapsulation",`,
    to: `"title": "Private Variables & Data Protection",`
  },
  {
    from: `"Closures capture variables by reference, so mutating the variable updates what the closure sees."`,
    to: `"Closures remember variables directly, so changing the variable updates what the closure sees."`
  },
  {
    from: `// Anyone in the app can mutate or corrupt bankBalance!`,
    to: `// Anyone in the app can accidentally change or mess up bankBalance!`
  },
  {
    from: `"title": "1. Lexical Scope",`,
    to: `"title": "1. Birthplace Scope",`
  },
  {
    from: `"Each factory invocation creates a new, isolated closure."`,
    to: `"Calling the factory function creates a brand-new, isolated closure with its own memory."`
  },
  {
    from: `"A function bundled with access to variables from its parent lexical scope, even after the parent returns."`,
    to: `"A function that remembers variables from the place where it was created, even after the outer function has finished running."`
  },
  {
    from: `"explanation": "A closure is formed when an inner function retains access to variables declared in its outer lexical scope, even after the outer function has completed execution."`,
    to: `"explanation": "A closure happens when a function remembers the variables from the place where it was created, even after the outer function has finished running."`
  },
  // JS-09
  {
    from: `"Invoked by the parent function when a specific action or event completes."`,
    to: `"Called by the outer function when a specific action or event finishes."`
  },
  // JS-10
  {
    from: `"tag": "Mutation"`,
    to: `"tag": "Changing Data"`
  },
  {
    from: `"title": "✅ Clean: Safe last element access and non-mutating slicing",`,
    to: `"title": "✅ Clean: Safe last element access and safe copying with slice",`
  },
  {
    from: `"title": "3. Non-Mutating slice",`,
    to: `"title": "3. Safe Copying with slice",`
  },
  {
    from: `"desc": "Use slice to copy ranges without mutating original data."`,
    to: `"desc": "Use slice to copy items without changing the original list."`
  },
  // JS-11
  {
    from: `"Transforms each item without mutating the original array."`,
    to: `"Transforms each item without changing the original list."`
  },
  {
    from: `"Never mutate array items inside map or filter. Always return a new value. Chain methods cleanly: filter first, then map."`,
    to: `"Never change array items directly inside map or filter. Always return a new value. Chain methods cleanly: filter first, then map."`
  },
  {
    from: `"title": "1. Immutability",`,
    to: `"title": "1. Safe Copies",`
  },
  {
    from: `"title": "❌ Bad: Verbose manual loops with mutating accumulator",`,
    to: `"title": "❌ Bad: Long manual loops that change variables directly",`
  },
  // JS-12
  {
    from: `Create objects, access nested properties, invoke methods, and inspect keys:`,
    to: `Create objects, access properties, run methods, and inspect keys:`
  },
  {
    from: `// 3. Invoking a method on an object:`,
    to: `// 3. Calling a method on an object:`
  },
  {
    from: `Use bracket notation when property names are dynamic (stored in variables) or contain special characters: user['user-id'].`,
    to: `Use bracket notation when property names are stored in a variable, or when they contain spaces or dashes (like user['user-id']).`
  },
  // JS-13
  {
    from: `"title": "JS-13: Object References & Immutability: Shallow vs Deep Copy",`,
    to: `"title": "JS-13: Object References & Copying: Shallow vs Deep Copy",`
  },
  {
    from: `"title": "Object References & Immutability: Shallow vs Deep Copy",`,
    to: `"title": "Object References & Copying: Shallow vs Deep Copy",`
  },
  {
    from: `"Discover why mutating a copied object affects the original, and learn how to clone data safely."`,
    to: `"Discover why changing a copied object affects the original, and learn how to copy data safely."`
  },
  {
    from: `"structuredClone(obj) recursively copies all nested levels into independent memory."`,
    to: `"structuredClone(obj) completely copies every nested level into independent memory."`
  },
  {
    from: `"title": "The Accidental Mutation Trap: Modifying the Original",`,
    to: `"title": "The Shared Reference Trap: Accidental Changes to the Original",`
  },
  {
    from: `"title": "❌ Bad: Accidental mutation through shared reference",`,
    to: `"title": "❌ Bad: Accidentally changing the original object through a shared reference",`
  },
  {
    from: `"title": "✅ Clean: Immutable shallow copy with property overrides",`,
    to: `"title": "✅ Clean: Safe shallow copy with property updates",`
  },
  // JS-15
  {
    from: `"title": "Immutable Merging",`,
    to: `"title": "Safe Merging",`
  },
  {
    from: `"desc": "Combine multiple arrays or objects without mutating the originals."`,
    to: `"desc": "Combine multiple arrays or objects without changing the originals."`
  },
  {
    from: `Combining arrays and cloning objects without mutating originals:`,
    to: `Combining arrays and copying objects without changing the originals:`
  },
  {
    from: `The three dots syntax (...) has two superpowers depending on context: Rest gathers multiple values into an array, while Spread unpacks an array into individual elements.`,
    to: `The three dots (...) do two different jobs. Spread unpacks a list into separate items. Rest collects multiple items into a single list.`
  },
  // JS-16
  {
    from: `"desc": "Invoke callbacks safely with callback?.()."`,
    to: `"desc": "Call callbacks safely with callback?.()."`
  },
  // JS-17
  {
    from: `"label": "Arrow Lexical this",`,
    to: `"label": "Arrow Inherited this",`
  },
  {
    from: `"title": "Method Invocation",`,
    to: `"title": "Method Calls",`
  },
  {
    from: `"Arrow functions DO NOT have their own this; they inherit it lexically from where they were written."`,
    to: `"Arrow functions DO NOT have their own this; they simply use the this from the surrounding code where they were written."`
  },
  {
    from: `Looking immediately to the left of the dot at the moment of invocation:`,
    to: `Look immediately to the left of the dot when the function is called:`
  },
  {
    from: `"description": "Look immediately to the left of the dot at the moment of invocation.",`,
    to: `"description": "Look immediately to the left of the dot when the function is called.",`
  },
  {
    from: `"tag": "Lexical"`,
    to: `"tag": "Inherited"`
  },
  {
    from: `"title": "Arrow Functions: Lexical this That Never Changes",`,
    to: `"title": "Arrow Functions: Borrowed this That Never Changes",`
  },
  {
    from: `"Capture 'this' lexically from surrounding code."`,
    to: `"Borrow 'this' directly from the surrounding code."`
  },
  {
    from: `"They lexically inherit 'this' from the scope where the arrow function was defined."`,
    to: `"They borrow 'this' from the surrounding code where the arrow function was created."`
  },
  {
    from: `"Arrow functions do not possess their own 'this' binding. They lexically resolve 'this' from their enclosing lexical context."`,
    to: `"Arrow functions do not have their own 'this'. They simply use the 'this' value from the surrounding code where they were created."`
  },
  // JS-18
  {
    from: `"JavaScript uses prototypal inheritance rather than traditional class blueprints. Think of this like borrowing a tool from a neighbor."`,
    to: `"In JavaScript, objects can borrow features directly from other objects through a prototype. Think of this like borrowing a tool from a neighbor."`
  },
  // JS-19
  {
    from: `"title": "ES6 Classes: Clean Syntactic Sugar for Objects",`,
    to: `"title": "ES6 Classes: Cleaner Syntax for Creating Objects",`
  },
  {
    from: `"description": "Modern, clean syntactic sugar over JavaScript's prototypical inheritance.",`,
    to: `"description": "Modern, cleaner syntax built on top of JavaScript's prototype system.",`
  },
  {
    from: `instantiate objects with new, and invoke super() methods:`,
    to: `create objects with new, and call super() methods:`
  },
  {
    from: `"What must you invoke in a child class constructor before using the 'this' keyword?"`,
    to: `"What must you call in a child class constructor before using the 'this' keyword?"`
  },
  // JS-20
  {
    from: `"tag": "CONCURRENCY"`,
    to: `"tag": "ASYNC TASKS"`
  },
  {
    from: `If a script executes a slow operation synchronously, the entire browser tab freezes.`,
    to: `If a script runs a slow task directly on the main thread, the entire browser tab freezes.`
  },
  {
    from: `"Because computers cannot calculate math synchronously."`,
    to: `"Because computers cannot calculate math without waiting."`
  },
  // JS-21
  {
    from: `"content": "Runs multiple promises concurrently and resolves when ALL promises succeed."`,
    to: `"content": "Runs multiple promises at the same time and finishes when ALL promises succeed."`
  },
  {
    from: `"label": "Concurrent Promise.all",`,
    to: `"label": "Running Tasks Together with Promise.all",`
  },
  // JS-22
  {
    from: `"Promise.all([fetchUsers(), fetchPosts()]) runs both tasks concurrently."`,
    to: `"Promise.all([fetchUsers(), fetchPosts()]) runs both tasks at the same time."`
  },
  {
    from: `// Both network requests run concurrently: takes only 1 second total!`,
    to: `// Both network requests run at the same time: takes only 1 second total!`
  },
  // JS-23
  {
    from: `"title": "JS-23: The Event Loop & Concurrency: Call Stack & Task Queues",`,
    to: `"title": "JS-23: The Event Loop: Call Stack & Task Queues",`
  },
  {
    from: `"title": "The Event Loop & Concurrency: Call Stack & Task Queues",`,
    to: `"title": "The Event Loop: Call Stack & Task Queues",`
  },
  {
    from: `"Recursively queuing microtasks starves the event loop, freezing macrotasks and rendering."`,
    to: `"Continuously adding new microtasks in a loop blocks the event loop and freezes the screen."`
  },
  {
    from: `// Logs '1' and '2' synchronously on the Call Stack.`,
    to: `// Logs '1' and '2' immediately on the Call Stack.`
  },
  // JS-25
  {
    from: `dumped into a single monolithic script with globals`,
    to: `dumped into one giant file with confusing global variables`
  },
  // JS-26 & JS-27
  {
    from: `parse JSON responses asynchronously.`,
    to: `fetch data and parse JSON responses in the background without freezing the page.`
  },
  {
    from: `"Asynchronously parses the response body stream into a usable object."`,
    to: `"Parses the response body in the background into a usable object."`
  },
  // JS-28
  {
    from: `"tag": "MUTATION"`,
    to: `"tag": "CHANGING THE DOM"`
  },
  // JS-29
  {
    from: `Event delegation leverages event bubbling to manage events for all existing and dynamically created child elements with a single listener on the parent container, conserving memory and simplifying code.`,
    to: `Event delegation attaches one single listener to a parent element. Because clicks bubble up, that one listener handles clicks for every child element, saving memory.`
  }
];

let applied = 0;
for (const r of replacements) {
  if (fileText.includes(r.from)) {
    fileText = fileText.replace(r.from, r.to);
    applied++;
  } else {
    console.warn(`WARNING: Could not match replacement:\n${r.from.slice(0, 70)}...`);
  }
}

fs.writeFileSync('app/learn/javascript/data/javascript-lesson-content.ts', fileText, 'utf8');
console.log(`Successfully applied ${applied} / ${replacements.length} simplifications to javascript-lesson-content.ts`);
