const fs = require('fs');

// 1. Update app/learn/javascript/data/javascript-lesson-content.ts for JS-07, JS-08, and JS-09
const lessonContentPath = 'app/learn/javascript/data/javascript-lesson-content.ts';
let lessonContent = fs.readFileSync(lessonContentPath, 'utf8');

const js07Updated = `  "js07-scope-global-function-block": {
    "slug": "js07-scope-global-function-block",
    "code": "JS-07",
    "title": "Scope: Where Variables Live (Global, Function & Block)",
    "subtitle": "Understand variable visibility boundaries: discover why let and const stay inside curly braces, how function scope protects data, and how the one-way scope chain works.",
    "sections": [
      {
        "id": "part1",
        "label": "What Is Scope?",
        "icon": "🔍",
        "tag": "BOUNDARIES"
      },
      {
        "id": "part2",
        "label": "The 3 Scope Levels",
        "icon": "🧱",
        "tag": "LEVELS"
      },
      {
        "id": "part3",
        "label": "The Scope Chain",
        "icon": "🪜",
        "tag": "LOOKUP"
      },
      {
        "id": "part4",
        "label": "Common Scope Mistakes",
        "icon": "⚠️",
        "tag": "TRAPS"
      },
      {
        "id": "part5",
        "label": "Scope Playground",
        "icon": "💻",
        "tag": "PRACTICE"
      },
      {
        "id": "part6",
        "label": "Key Takeaways",
        "icon": "🎓",
        "tag": "SUMMARY"
      },
      {
        "id": "part7",
        "label": "Quick Quiz",
        "icon": "🎯",
        "tag": "QUIZ"
      }
    ],
    "part1": {
      "title": "Scope: Where Variables Live and Where They Disappear",
      "bigPicture": "Scope is the set of rules that decides where your variables can be seen and reached in your code. Think of scope like rooms in a building with one-way glass: code running inside an inner room can look out into the hallway to see outer variables, but code in the hallway cannot look inside the private room to see inner variables.",
      "breakdownTitle": "What You Will Learn in This Lesson:",
      "breakdownItems": [
        {
          "title": "1. Global Scope",
          "desc": "Variables created outside of any function or block, accessible everywhere in your script."
        },
        {
          "title": "2. Function Scope",
          "desc": "Variables created inside a function exist only while that function is running."
        },
        {
          "title": "3. Block Scope (let and const)",
          "desc": "Variables declared inside curly braces { } cannot leak outside those braces."
        }
      ]
    },
    "part2": {
      "title": "The Three Levels of Scope in JavaScript",
      "intro": "Every variable you create lives in one of three scope levels:",
      "cards": [
        {
          "number": "01",
          "tag": "Everywhere",
          "title": "Global Scope",
          "description": "Variables declared outside of all functions and blocks. Any part of your script can read them. Keep them few to avoid accidental name collisions.",
          "color": "emerald"
        },
        {
          "number": "02",
          "tag": "Function",
          "title": "Function Scope",
          "description": "Variables declared inside a function are born when the function runs and disappear when it finishes. Outside code cannot reach them.",
          "color": "cyan"
        },
        {
          "number": "03",
          "tag": "Curly Braces",
          "title": "Block Scope (let & const)",
          "description": "Any pair of curly braces { } (like in an if statement or loop) creates a block. Modern let and const stay strictly locked inside.",
          "color": "purple"
        }
      ],
      "rule": {
        "title": "💡 The Least Privilege Rule",
        "content": "Keep your variables as local as possible. Declare them inside the smallest function or block that needs them, rather than making everything global."
      }
    },
    "part3": {
      "title": "The One-Way Scope Chain Lookup",
      "intro": "Understanding how JavaScript searches for variables when running your code:",
      "points": [
        {
          "title": "1. Searching Outward Only",
          "content": "When code uses a variable, JavaScript checks the local block first. If it cannot find it, it steps outward to the parent function, and finally to the global scope. It NEVER searches inward into other blocks or functions."
        },
        {
          "title": "2. Variable Shadowing",
          "content": "If an inner block declares a variable with the exact same name as an outer variable, the inner variable temporarily shadows (hides) the outer one inside that block."
        },
        {
          "title": "3. ReferenceError When Looking Inward",
          "content": "If code outside an if block tries to read a variable declared inside that block, JavaScript cannot see it and throws a ReferenceError.",
          "codeSnippet": "const appName = \\"LearnCraft\\"; // Global scope\\n\\nfunction startSession() {\\n  const userId = 42; // Function scope\\n\\n  if (true) {\\n    const role = \\"Admin\\"; // Block scope\\n    console.log(appName, userId, role); // Sees all three!\\n  }\\n  // console.log(role); // ❌ ReferenceError: role is not defined!\\n}"
        }
      ]
    },
    "part4": {
      "title": "Common Beginner Mistakes with Scope",
      "bad": {
        "title": "❌ Broken: Trying to access block-scoped variables outside their curly braces",
        "code": "let isMember = true;\\n\\nif (isMember) {\\n  const discount = 20; // Locked inside this if block!\\n}\\n\\n// Trying to use discount outside the block:\\nconsole.log(\\"Your discount is:\\", discount); // ❌ ReferenceError: discount is not defined!",
        "explanation": "Because discount was declared with const inside the if block's curly braces, it does not exist outside that block. Attempting to log it causes a ReferenceError crash."
      },
      "good": {
        "title": "✅ Clean: Declaring variables in the outer scope when they need to be shared",
        "code": "let isMember = true;\\nlet discount = 0; // Declared in outer scope!\\n\\nif (isMember) {\\n  discount = 20; // Updates the outer variable\\n}\\n\\nconsole.log(\\"Your discount is:\\", discount + \\"%\\"); // ✅ 20%",
        "explanation": "If a value calculated inside a block needs to be used outside, declare the variable with let before the block, and update it inside."
      }
    },
    "part5": {
      "title": "Scope & Visibility Playground",
      "intro": "Test global, function, and block scope boundaries and observe what can and cannot be accessed:",
      "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n// JS-07: SCOPE & VISIBILITY\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n\\n// 1. Global variable (seen everywhere):\\nconst globalGame = \\"Space Quest\\";\\n\\nfunction playRound() {\\n  // 2. Function-scoped variable (seen only in playRound):\\n  const roundScore = 50;\\n  console.log(\\"Playing:\\", globalGame, \\"| Score:\\", roundScore);\\n\\n  if (roundScore >= 50) {\\n    // 3. Block-scoped variable (seen only in this if block):\\n    const bonusBadge = \\"🌟 Gold Star\\";\\n    console.log(\\"Achieved badge:\\", bonusBadge);\\n  }\\n\\n  // Un-commenting the next line would cause a ReferenceError:\\n  // console.log(bonusBadge); // Error: bonusBadge is trapped in the if block!\\n}\\n\\nplayRound();\\n\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n// YOUR TURN:\\n// 1. Create a function 'checkAge(age)'.\\n// 2. Inside an if block (age >= 18), declare 'const canDrive = true;'.\\n// 3. Print canDrive inside the if block.\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n"
    },
    "part6": {
      "title": "Key Takeaways: Where Variables Live",
      "takeaways": [
        {
          "title": "1. Block Scope with {}",
          "desc": "Variables created with let and const stay strictly inside their curly braces."
        },
        {
          "title": "2. Function Scope",
          "desc": "Variables inside a function are private to that function."
        },
        {
          "title": "3. The One-Way Lookup",
          "desc": "Inner scopes can look outward to find variables, but outer code cannot look inward."
        },
        {
          "title": "4. Keep Variables Local",
          "desc": "Declare variables only where they are needed to prevent accidental bugs."
        }
      ],
      "nextLessonPreview": {
        "title": "JS-08: Closures: How Functions Remember Their Birthplace",
        "desc": "Now that you know how scope boundaries work, discover how functions can remember variables even after their outer function finishes."
      }
    },
    "part7": {
      "title": "Knowledge Check: Scope",
      "quiz": {
        "question": "Can code running outside an 'if' block access a variable declared with 'const' inside that block?",
        "options": [
          "Yes, const variables are always globally accessible.",
          "No, const and let are strictly block-scoped to their enclosing curly braces {}.",
          "Only if the condition evaluated to true.",
          "Only if the variable was a number."
        ],
        "correctIndex": 1,
        "explanation": "Variables declared with let and const are block-scoped and cannot be accessed outside the curly braces {} where they were created."
      }
    }
  }`;

const js08Updated = `  "js08-closures": {
    "slug": "js08-closures",
    "code": "JS-08",
    "title": "Closures: How Functions Remember Their Birthplace",
    "subtitle": "Discover how inner functions carry a backpack of variables from where they were created, even after the outer function has finished running.",
    "sections": [
      {
        "id": "part1",
        "label": "What Is a Closure?",
        "icon": "🎒",
        "tag": "CONCEPT"
      },
      {
        "id": "part2",
        "label": "The Backpack Model",
        "icon": "🧠",
        "tag": "MECHANICS"
      },
      {
        "id": "part3",
        "label": "Private Memory",
        "icon": "🛡️",
        "tag": "PRIVACY"
      },
      {
        "id": "part4",
        "label": "Common Misunderstandings",
        "icon": "⚠️",
        "tag": "TRAPS"
      },
      {
        "id": "part5",
        "label": "Closures Playground",
        "icon": "💻",
        "tag": "PRACTICE"
      },
      {
        "id": "part6",
        "label": "Key Takeaways",
        "icon": "🎓",
        "tag": "SUMMARY"
      },
      {
        "id": "part7",
        "label": "Quick Quiz",
        "icon": "🎯",
        "tag": "QUIZ"
      }
    ],
    "part1": {
      "title": "Closures: Functions Carrying Their Variable Backpack",
      "bigPicture": "Normally, when a function finishes running, all of its local variables are wiped from memory. But when an inner function is created inside an outer function and returned, it remembers and holds onto the variables from where it was created. This superpower is called a closure: the inner function carries a 'backpack' of variables from its birthplace.",
      "breakdownTitle": "What You Will Learn in This Lesson:",
      "breakdownItems": [
        {
          "title": "1. Born Inside, Used Outside",
          "desc": "A function created inside another function carries access to the outer function's variables."
        },
        {
          "title": "2. Persistent Private Memory",
          "desc": "The remembered variables stay alive in memory as long as the inner function is kept around."
        },
        {
          "title": "3. Independent Instances",
          "desc": "Calling the outer creator function multiple times creates fresh, separate backpacks."
        }
      ]
    },
    "part2": {
      "title": "How a Closure Works Under the Hood",
      "intro": "Understanding why closures preserve variables and keep them private:",
      "cards": [
        {
          "number": "01",
          "tag": "Definition",
          "title": "What is a Closure?",
          "description": "A closure happens when a function remembers variables from where it was created, even after the outer function has finished running.",
          "color": "emerald"
        },
        {
          "number": "02",
          "tag": "Privacy",
          "title": "Private State",
          "description": "Variables inside the closure backpack cannot be modified directly from outside. They can only be read or changed by the inner function.",
          "color": "purple"
        },
        {
          "number": "03",
          "tag": "Factories",
          "title": "Function Factories",
          "description": "A function that configures and returns another customized function (like makeGreeter(\\"Hello\\") or createCounter()).",
          "color": "cyan"
        }
      ],
      "rule": {
        "title": "💡 The Closure Rule",
        "content": "Functions in JavaScript remember variables based on where they were written, not where or when they are executed later."
      }
    },
    "part3": {
      "title": "Step-by-Step Walkthrough: The Private Counter",
      "intro": "Following how a closure preserves a number across multiple function calls:",
      "points": [
        {
          "title": "1. Step-by-Step Counter Creation",
          "content": "function createCounter() { let count = 0; return function() { count++; return count; }; } When createCounter() runs, it sets count = 0 and returns the inner function. Even though createCounter() ends, the returned function keeps count in its backpack!"
        },
        {
          "title": "2. Completely Independent Backpacks",
          "content": "If you run const counterA = createCounter(); and const counterB = createCounter();, counterA and counterB each have their own private count. Calling counterA() does not affect counterB()!"
        },
        {
          "title": "3. Custom Greeter Factories",
          "content": "function makeGreeter(greeting) { return (name) => greeting + \\", \\" + name + \\"!\\"; } const sayHello = makeGreeter(\\"Hello\\"); Calling sayHello(\\"Alex\\") prints 'Hello, Alex!' because it remembered 'Hello'.",
          "codeSnippet": "function createCounter() {\\n  let count = 0; // Private variable\\n  return function() {\\n    count++;\\n    return count;\\n  };\\n}\\nconst myCounter = createCounter();\\nconsole.log(myCounter()); // 1\\nconsole.log(myCounter()); // 2"
        }
      ]
    },
    "part4": {
      "title": "Common Misunderstandings with Closures",
      "bad": {
        "title": "❌ Bad: Using exposed global variables that any code can accidentally overwrite",
        "code": "// Anyone in the script can accidentally modify or reset globalCount:\\nlet globalCount = 0;\\n\\nfunction increment() {\\n  globalCount++;\\n}\\n\\n// Somewhere else in the code, a bug resets it:\\nglobalCount = -999; // ❌ Ruined by accidental overwrite!",
        "explanation": "Relying on global variables means any part of your code can accidentally overwrite them or corrupt their state."
      },
      "good": {
        "title": "✅ Clean: Encapsulated private state protected inside a closure",
        "code": "function createSafeCounter() {\\n  let count = 0; // Protected inside the closure\\n  return function() {\\n    count++;\\n    return count;\\n  };\\n}\\n\\nconst safeCounter = createSafeCounter();\\nconsole.log(safeCounter()); // 1\\nconsole.log(safeCounter()); // 2\\n// Outside code CANNOT access or overwrite 'count' directly!",
        "explanation": "The count variable is completely inaccessible from the outside world. It can only be updated through the safe returned function."
      }
    },
    "part5": {
      "title": "Closures Playground",
      "intro": "Run the code below to see private counters and custom greeter closures in action:",
      "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n// JS-08: CLOSURES & PRIVATE STATE\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n\\n// 1. Private Counter Closure:\\nfunction createCounter(label) {\\n  let count = 0; // Private variable trapped in the closure\\n\\n  return function() {\\n    count++;\\n    return label + \\": \\" + count;\\n  };\\n}\\n\\nconst clicks = createCounter(\\"Button Clicks\\");\\nconst views = createCounter(\\"Page Views\\");\\n\\nconsole.log(clicks()); // Button Clicks: 1\\nconsole.log(clicks()); // Button Clicks: 2\\nconsole.log(views());  // Page Views: 1 (independent!)\\nconsole.log(clicks()); // Button Clicks: 3\\n\\n// 2. Custom Greeter Factory:\\nfunction makeGreeter(greeting) {\\n  return function(name) {\\n    return greeting + \\", \\" + name + \\"!\\";\\n  };\\n}\\n\\nconst sayWelcome = makeGreeter(\\"Welcome\\");\\nconsole.log(sayWelcome(\\"Alex\\"));\\nconsole.log(sayWelcome(\\"Emma\\"));\\n\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n// YOUR TURN:\\n// 1. Create a function 'makeMultiplier(factor)'.\\n// 2. Inside, return a function that takes 'number' and returns number * factor.\\n// 3. Test it by creating 'const triple = makeMultiplier(3);' and logging triple(5).\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n"
    },
    "part6": {
      "title": "Key Takeaways: How Functions Remember",
      "takeaways": [
        {
          "title": "1. What a Closure Is",
          "desc": "A function that remembers variables from where it was created, even after the outer function ends."
        },
        {
          "title": "2. Private Memory",
          "desc": "Variables inside the closure cannot be changed directly by outside code."
        },
        {
          "title": "3. Separate Instances",
          "desc": "Each time you call the outer function, a brand-new independent closure is born."
        },
        {
          "title": "4. Next: Callbacks",
          "desc": "In JS-09, we learn how to pass functions into other functions as data values."
        }
      ],
      "nextLessonPreview": {
        "title": "JS-09: Callbacks & Higher-Order Functions: Functions as Data",
        "desc": "Now that you understand functions and closures, learn how to pass functions to other functions as data."
      }
    },
    "part7": {
      "title": "Knowledge Check: Closures",
      "quiz": {
        "question": "What is a Closure in JavaScript?",
        "options": [
          "A command used to close a browser tab.",
          "A function that remembers variables from where it was created, even after the outer function has finished running.",
          "A syntax error caused by forgetting a closing bracket.",
          "A method that converts a number into text."
        ],
        "correctIndex": 1,
        "explanation": "A closure happens when an inner function remembers the variables from the scope where it was created, even after the outer function has finished running."
      }
    }
  }`;

const js09Updated = `  "js09-callbacks-and-higher-order-functions": {
    "slug": "js09-callbacks-and-higher-order-functions",
    "code": "JS-09",
    "title": "Callbacks & Higher-Order Functions: Functions as Data",
    "subtitle": "Treat functions as values: pass callback functions into other functions and manufacture custom functions dynamically.",
    "sections": [
      {
        "id": "part1",
        "label": "Functions as Values",
        "icon": "🧩",
        "tag": "FIRST-CLASS"
      },
      {
        "id": "part2",
        "label": "What Is a Callback?",
        "icon": "📞",
        "tag": "CALLBACKS"
      },
      {
        "id": "part3",
        "label": "Higher-Order Functions",
        "icon": "⚡",
        "tag": "COMPOSITION"
      },
      {
        "id": "part4",
        "label": "Passing vs Calling",
        "icon": "⚠️",
        "tag": "TRAPS"
      },
      {
        "id": "part5",
        "label": "Callbacks Playground",
        "icon": "💻",
        "tag": "PRACTICE"
      },
      {
        "id": "part6",
        "label": "Key Takeaways",
        "icon": "🎓",
        "tag": "SUMMARY"
      },
      {
        "id": "part7",
        "label": "Quick Quiz",
        "icon": "🎯",
        "tag": "QUIZ"
      }
    ],
    "part1": {
      "title": "First-Class Functions: Treating Functions as Values",
      "bigPicture": "In JavaScript, functions are first-class citizens. That simply means functions can be treated just like any other value: you can assign a function to a variable, pass a function into another function as an argument, and return a function from a function.",
      "breakdownTitle": "What You Will Learn in This Lesson:",
      "breakdownItems": [
        {
          "title": "1. Functions as Values",
          "desc": "Functions can be stored in variables and handed to other functions."
        },
        {
          "title": "2. Callback Functions",
          "desc": "A function you pass into another function to be 'called back' when needed."
        },
        {
          "title": "3. Higher-Order Functions",
          "desc": "A function that accepts another function as an input, or returns a new function."
        }
      ]
    },
    "part2": {
      "title": "What a Callback Function Is",
      "intro": "When you hand a function to another function to do a specific job, it is called a callback:",
      "cards": [
        {
          "number": "01",
          "tag": "Value",
          "title": "Functions in Variables",
          "description": "const sayHi = () => console.log(\\"Hi!\\"); — functions can be stored in variables just like numbers or text.",
          "color": "emerald"
        },
        {
          "number": "02",
          "tag": "Input",
          "title": "Callback Functions",
          "description": "A function passed as an argument into another function. The receiving function calls it at the right moment.",
          "color": "cyan"
        },
        {
          "number": "03",
          "tag": "Manager",
          "title": "Higher-Order Functions",
          "description": "Any function that takes a callback as a parameter or returns a function. It manages the general flow while the callback supplies the custom action.",
          "color": "purple"
        }
      ],
      "rule": {
        "title": "💡 The Callback Execution Rule",
        "content": "When passing a function as a callback, pass its name WITHOUT parentheses (myCallback). Adding parentheses (myCallback()) calls the function immediately instead of waiting."
      }
    },
    "part3": {
      "title": "Higher-Order Functions in Action",
      "intro": "How higher-order functions use callbacks to build flexible, reusable tools:",
      "points": [
        {
          "title": "1. The Universal Calculator",
          "content": "function calculate(a, b, operation) { return operation(a, b); } calculate does not care whether you add, multiply, or subtract. You pass the specific operation callback to tell it what to do!"
        },
        {
          "title": "2. Anonymous Inline Callbacks",
          "content": "Instead of naming every callback beforehand, you can pass an arrow function directly: calculate(10, 5, (x, y) => x - y); This is the exact pattern used across all modern JavaScript code."
        },
        {
          "title": "3. Repeating Actions with Callbacks",
          "content": "function repeat(times, action) { for (let i = 1; i <= times; i++) action(i); } You build a reusable repeater, and caller callbacks specify what action happens on each step.",
          "codeSnippet": "function calculate(a, b, operation) {\\n  return operation(a, b);\\n}\\n\\nconst add = (x, y) => x + y;\\nconst multiply = (x, y) => x * y;\\n\\nconsole.log(calculate(4, 5, add));      // 9\\nconsole.log(calculate(4, 5, multiply)); // 20"
        }
      ]
    },
    "part4": {
      "title": "Common Beginner Mistakes with Callbacks",
      "bad": {
        "title": "❌ Broken: Calling the callback immediately by accidentally adding parentheses ()",
        "code": "function runWithGreeting(name, callback) {\\n  return callback(name);\\n}\\n\\nfunction formatName(n) {\\n  return \\"*** \\" + n + \\" ***\\";\\n}\\n\\n// Mistake: accidentally adding (name) when passing the callback:\\n// runWithGreeting(\\"Alex\\", formatName(\\"Alex\\"));\\n// ❌ TypeError: callback is not a function! (because formatName(\\"Alex\\") ran immediately and passed a string!)",
        "explanation": "Adding parentheses immediately invokes the function and passes its return value instead of passing the function itself."
      },
      "good": {
        "title": "✅ Clean: Passing the function reference without parentheses",
        "code": "function runWithGreeting(name, callback) {\\n  return callback(name); // ✅ Higher-order function invokes it here\\n}\\n\\nfunction formatName(n) {\\n  return \\"*** \\" + n + \\" ***\\";\\n}\\n\\n// Pass the function name without ()\\nconst result = runWithGreeting(\\"Alex\\", formatName);\\nconsole.log(result); // \\"*** Alex ***\\"",
        "explanation": "Passing formatName without parentheses allows runWithGreeting to receive the function and call it at the right time."
      }
    },
    "part5": {
      "title": "Callbacks & Higher-Order Functions Playground",
      "intro": "Experiment with passing functions as arguments and executing custom operations:",
      "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n// JS-09: CALLBACKS & HIGHER-ORDER FUNCTIONS\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n\\n// 1. Higher-order function that accepts an operation callback:\\nfunction calculate(a, b, operation) {\\n  return operation(a, b);\\n}\\n\\n// Named callbacks:\\nconst add = (x, y) => x + y;\\nconst multiply = (x, y) => x * y;\\n\\nconsole.log(\\"10 + 5 =\\", calculate(10, 5, add));\\nconsole.log(\\"10 * 5 =\\", calculate(10, 5, multiply));\\n\\n// 2. Anonymous inline callback:\\nconsole.log(\\"10 - 5 =\\", calculate(10, 5, (x, y) => x - y));\\n\\n// 3. Action repeater higher-order function:\\nfunction repeatAction(times, action) {\\n  for (let i = 1; i <= times; i++) {\\n    action(i);\\n  }\\n}\\n\\nconsole.log(\\"\\\\n--- Running Action Repeater ---\\\\n\\");\\nrepeatAction(3, (step) => {\\n  console.log(\\"Step #\\" + step + \\": Processing item...\\");\\n});\\n\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n// YOUR TURN:\\n// 1. Use calculate(20, 4, callback) to divide 20 by 4 using an arrow function callback.\\n// 2. Print the result.\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n"
    },
    "part6": {
      "title": "Key Takeaways: Functions as Data",
      "takeaways": [
        {
          "title": "1. Functions are Values",
          "desc": "You can store functions in variables, pass them as arguments, and return them."
        },
        {
          "title": "2. Callbacks are Input Functions",
          "desc": "A callback is a function passed to another function to be executed."
        },
        {
          "title": "3. Pass Without ()",
          "desc": "Pass the function name without parentheses so the receiving function can run it."
        },
        {
          "title": "4. Prepares You for Arrays",
          "desc": "In JS-10 and JS-11, you will use callbacks to power array methods like map and filter."
        }
      ],
      "nextLessonPreview": {
        "title": "JS-10: Arrays & Indexing: Managing Ordered Lists",
        "desc": "Now that you understand functions and callbacks, learn how to store lists of data with arrays and access items by index."
      }
    },
    "part7": {
      "title": "Knowledge Check: Functions as Data",
      "quiz": {
        "question": "What is a 'Higher-Order Function' in JavaScript?",
        "options": [
          "A function that runs faster than normal functions.",
          "A function that accepts another function as an argument, or returns a function.",
          "A function that contains more than 10 lines of code.",
          "A function that can only be called from inside a loop."
        ],
        "correctIndex": 1,
        "explanation": "A Higher-Order Function is any function that accepts one or more functions as arguments, or returns a function as its result."
      }
    }
  }`;

// Find start of js07 and end of js09 in lessonContent
const startMark = '  "js07-scope-global-function-block": {';
const endMark = '  "js10-arrays-and-indexing": {';

const startIdx = lessonContent.indexOf(startMark);
const endIdx = lessonContent.indexOf(endMark);

if (startIdx === -1 || endIdx === -1) {
  throw new Error("Could not find start/end marks in javascript-lesson-content.ts");
}

const newBatchContent = js07Updated + ',\n\n' + js08Updated + ',\n\n' + js09Updated + ',\n\n';
lessonContent = lessonContent.slice(0, startIdx) + newBatchContent + lessonContent.slice(endIdx);
fs.writeFileSync(lessonContentPath, lessonContent, 'utf8');
console.log("Successfully updated javascript-lesson-content.ts for JS-07, JS-08, and JS-09!");

// 2. Update lib/quiz/javascript-quizzes.ts
const quizzesPath = 'lib/quiz/javascript-quizzes.ts';
let quizzesContent = fs.readFileSync(quizzesPath, 'utf8');

const updatedQuizzesBatch = `  {
    "id": "quiz-javascript-js07",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js07-scope-global-function-block",
    "lessonCode": "JS-07",
    "lessonTitle": "Scope: Where Variables Live (Global, Function & Block)",
    "description": "Verify your understanding of block scope, variable shadowing, and the scope chain.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js07-q1",
        "type": "multiple_choice",
        "title": "Block Scope",
        "prompt": "Which pair of keywords respects block scope enclosed by curly braces {}?",
        "options": [
          "var and function",
          "let and const",
          "var and let",
          "global and window"
        ],
        "correctAnswer": 1,
        "explanation": "let and const are block-scoped. Variables declared with them inside { } cannot be accessed from outside that block.",
        "hint": "These two modern keywords keep variables locked inside their curly braces.",
        "hintCostXP": 5
      },
      {
        "id": "js07-q2",
        "type": "code_output",
        "title": "Variable Shadowing",
        "prompt": "What is logged by the following code?",
        "codeSnippet": "const role = \\"member\\";\\nfunction checkAccess() {\\n  const role = \\"admin\\";\\n  return role;\\n}\\nconsole.log(checkAccess() + \\" | \\" + role);",
        "language": "javascript",
        "options": [
          "'admin | admin'",
          "'admin | member'",
          "'member | member'",
          "ReferenceError: role is already declared"
        ],
        "correctAnswer": 1,
        "explanation": "Inside checkAccess, the local role shadows the outer role. Outside the function, the global role remains 'member'.",
        "hint": "Inner scopes can create local variables with the same name without altering outer variables.",
        "hintCostXP": 5
      },
      {
        "id": "js07-q3",
        "type": "multiple_choice",
        "title": "Scope Chain Direction",
        "prompt": "How does JavaScript look for variables along the scope chain?",
        "options": [
          "From outside scopes downward into inner functions",
          "From the current inner scope outward toward parent scopes and global scope",
          "Randomly across all files in the project",
          "Only in the global scope"
        ],
        "correctAnswer": 1,
        "explanation": "JavaScript searches from the inside out: it checks the local scope first, then parent function scopes, and finally the global scope.",
        "hint": "Think of looking out through one-way glass: you can see outward, but outside cannot see inward.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js08",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js08-closures",
    "lessonCode": "JS-08",
    "lessonTitle": "Closures: How Functions Remember Their Birthplace",
    "description": "Test your understanding of how functions remember variables from where they were created.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js08-q1",
        "type": "code_output",
        "title": "Counter Function Output",
        "prompt": "What will this code log to the console?",
        "codeSnippet": "function makeCounter() {\\n  let count = 0;\\n  return () => ++count;\\n}\\n\\nconst c1 = makeCounter();\\nconst c2 = makeCounter();\\n\\nconsole.log(c1(), c1(), c2());",
        "language": "javascript",
        "options": [
          "'1 2 1'",
          "'1 2 3'",
          "'1 1 1'",
          "'0 1 0'"
        ],
        "correctAnswer": 0,
        "explanation": "Each call to makeCounter() creates a new function with its own private 'count' variable. Because c1 and c2 have separate private memory, c1 reaches 2 while c2 starts fresh at 1, outputting: 1 2 1.",
        "hint": "Each time you call makeCounter(), it gets its own separate counter variable.",
        "hintCostXP": 5
      },
      {
        "id": "js08-q2",
        "type": "multiple_choice",
        "title": "What is a Closure?",
        "prompt": "What is a closure in JavaScript?",
        "options": [
          "A command used to close a network socket or browser window",
          "A function that remembers the variables from the place where it was created, even after the outer function has finished running",
          "An error thrown when a script fails to load",
          "A method that converts an object into text"
        ],
        "correctAnswer": 1,
        "explanation": "A closure happens when a function remembers the variables from the place where it was created, even after the outer function has finished running.",
        "hint": "Think of a function carrying a backpack of variables from where it was born.",
        "hintCostXP": 5
      },
      {
        "id": "js08-q3",
        "type": "code_output",
        "title": "Adder Function Factory",
        "prompt": "What will this closure factory calculate and output?",
        "codeSnippet": "function makeAdder(x) {\\n  return function(y) {\\n    return x + y;\\n  };\\n}\\nconst addTen = makeAdder(10);\\nconsole.log(addTen(5));",
        "language": "javascript",
        "options": [
          "15",
          "50",
          "10",
          "undefined"
        ],
        "correctAnswer": 0,
        "explanation": "makeAdder(10) returns an inner function that remembers x = 10 in its closure. Calling addTen(5) computes 10 + 5 = 15.",
        "hint": "The returned function adds its argument to the remembered x value.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js09",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js09-callbacks-and-higher-order-functions",
    "lessonCode": "JS-09",
    "lessonTitle": "Callbacks & Higher-Order Functions: Functions as Data",
    "description": "Test your comprehension of higher-order functions and passing functions as data.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js09-q1",
        "type": "multiple_choice",
        "title": "First-Class Functions",
        "prompt": "What does it mean that functions are 'first-class citizens' in JavaScript?",
        "options": [
          "Functions can only be created by administrators",
          "Functions can be assigned to variables, passed as arguments, and returned from other functions",
          "Functions execute faster than standard code blocks",
          "Functions cannot be modified once defined"
        ],
        "correctAnswer": 1,
        "explanation": "In JavaScript, functions are values just like numbers or strings. You can pass them into functions and return them dynamically.",
        "hint": "Functions can be treated just like any ordinary variable or data value.",
        "hintCostXP": 5
      },
      {
        "id": "js09-q2",
        "type": "code_output",
        "title": "Higher-Order Function Output",
        "prompt": "What is the output of this code?",
        "codeSnippet": "function calculate(a, b, operation) {\\n  return operation(a, b);\\n}\\nconst multiply = (x, y) => x * y;\\nconsole.log(calculate(6, 4, multiply));",
        "language": "javascript",
        "options": [
          "24",
          "10",
          "undefined",
          "NaN"
        ],
        "correctAnswer": 0,
        "explanation": "calculate calls multiply(6, 4), which computes 6 * 4 = 24.",
        "hint": "The calculate function runs the multiply callback with arguments 6 and 4.",
        "hintCostXP": 5
      },
      {
        "id": "js09-q3",
        "type": "multiple_choice",
        "title": "Passing a Function vs Calling It",
        "prompt": "When passing a function as a callback (e.g. calculate(5, 3, add)), why do we write 'add' instead of 'add(5, 3)'?",
        "options": [
          "Writing add(5, 3) would pass an invalid syntax error",
          "Writing 'add' passes the function itself so calculate can invoke it; writing 'add(5, 3)' would call it immediately and pass its return value (8)",
          "Parentheses are optional in all JavaScript function calls",
          "Higher-order functions only accept anonymous functions"
        ],
        "correctAnswer": 1,
        "explanation": "Adding parentheses () calls the function immediately. Leaving off parentheses passes the function itself so the receiving function can run it.",
        "hint": "Think: pass the function vs run the function right now.",
        "hintCostXP": 5
      }
    ]
  }`;

const quizStartMark = '  {\n    "id": "quiz-javascript-js07",';
const quizEndMark = '  {\n    "id": "quiz-javascript-js10",';

const qStartIdx = quizzesContent.indexOf(quizStartMark);
const qEndIdx = quizzesContent.indexOf(quizEndMark);

if (qStartIdx === -1 || qEndIdx === -1) {
  throw new Error("Could not find quiz start/end marks in javascript-quizzes.ts");
}

quizzesContent = quizzesContent.slice(0, qStartIdx) + updatedQuizzesBatch + ',\n' + quizzesContent.slice(qEndIdx);
fs.writeFileSync(quizzesPath, quizzesContent, 'utf8');
console.log("Successfully updated lib/quiz/javascript-quizzes.ts for JS-07, JS-08, and JS-09!");
