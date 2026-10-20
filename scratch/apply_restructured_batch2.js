const fs = require('fs');

// 1. Update app/learn/javascript/data/javascript-lesson-content.ts for JS-04, JS-05, and JS-06
const lessonContentPath = 'app/learn/javascript/data/javascript-lesson-content.ts';
let lessonContent = fs.readFileSync(lessonContentPath, 'utf8');

const js04Updated = `  "js04-conditional-logic": {
    "slug": "js04-conditional-logic",
    "code": "JS-04",
    "title": "Conditional Logic: Making Decisions with if, else & switch",
    "subtitle": "Teach your programs to make decisions: run code only when conditions are true, handle alternatives with else, and match multiple cases with switch.",
    "sections": [
      {
        "id": "part1",
        "label": "How Code Makes Decisions",
        "icon": "🚦",
        "tag": "DECISIONS"
      },
      {
        "id": "part2",
        "label": "if, else if, and else",
        "icon": "🔀",
        "tag": "BRANCHING"
      },
      {
        "id": "part3",
        "label": "Ternary & switch",
        "icon": "⚖️",
        "tag": "CHOICES"
      },
      {
        "id": "part4",
        "label": "Common Mistakes",
        "icon": "⚠️",
        "tag": "TRAPS"
      },
      {
        "id": "part5",
        "label": "Conditionals Playground",
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
      "title": "Decision Making: How Programs Choose Different Paths",
      "bigPicture": "Every program needs to make decisions based on changing information. An if statement is like a fork in the road: if the signal light is green, proceed forward; otherwise, take a different path or stop.",
      "breakdownTitle": "What You Will Learn in This Lesson:",
      "breakdownItems": [
        {
          "title": "The if Statement",
          "desc": "Run a block of code only when a condition evaluates to true."
        },
        {
          "title": "Handling Alternatives with else",
          "desc": "Provide an alternative fallback block when the condition is false."
        },
        {
          "title": "Ternary & switch",
          "desc": "Write concise one-line checks and handle multiple exact matches cleanly."
        }
      ]
    },
    "part2": {
      "title": "Branching Flow: if, else if, and else",
      "intro": "JavaScript uses three keywords to create decision branches in your code:",
      "cards": [
        {
          "number": "01",
          "tag": "Primary",
          "title": "if Statement",
          "description": "Runs its curly-brace code block only if its condition evaluates to true. If false, JavaScript skips the block completely.",
          "color": "emerald"
        },
        {
          "number": "02",
          "tag": "Fallback",
          "title": "else Statement",
          "description": "Runs only when the if condition above it is false. It guarantees that one of the two code blocks will always run.",
          "color": "cyan"
        },
        {
          "number": "03",
          "tag": "Chaining",
          "title": "else if Statement",
          "description": "Lets you check multiple possible conditions in order from top to bottom. The first one that is true runs, and the rest are skipped.",
          "color": "purple"
        }
      ],
      "rule": {
        "title": "💡 The Order-of-Checks Rule",
        "content": "JavaScript checks conditions from top to bottom and stops at the very first true match. Always place your most specific conditions first."
      }
    },
    "part3": {
      "title": "The Ternary Operator & switch Statements",
      "intro": "When you need concise checks or want to match multiple exact values, JavaScript provides two clean tools:",
      "points": [
        {
          "title": "1. The Ternary Operator (? : ) for Quick Choices",
          "content": "When you simply want to pick one of two values based on a condition, the ternary operator is a clean shortcut: const status = isOnline ? \\"Active\\" : \\"Offline\\";"
        },
        {
          "title": "2. switch Statements for Multiple Exact Values",
          "content": "When checking a single variable against many exact values (like days of the week or user roles), switch is cleaner than writing many else if statements."
        },
        {
          "title": "3. Why Every switch Case Needs a 'break'",
          "content": "Without a break statement, JavaScript does not stop after matching a case; it falls through and runs the next cases too! Always end each case with break.",
          "codeSnippet": "const userRole = \\"admin\\";\\n\\nswitch (userRole) {\\n  case \\"admin\\":\\n    console.log(\\"Full access granted\\");\\n    break; // Stop here!\\n  case \\"editor\\":\\n    console.log(\\"Edit access granted\\");\\n    break;\\n  default:\\n    console.log(\\"Read-only access\\");\\n}"
        }
      ]
    },
    "part4": {
      "title": "Common Beginner Mistakes with Conditionals",
      "bad": {
        "title": "❌ Broken: Using = instead of ===, and adding a semicolon after the if condition",
        "code": "const score = 85;\\n\\n// Mistake 1: Accidental assignment instead of comparison\\n// if (score = 100) -> Overwrites score with 100 and always runs!\\n\\n// Mistake 2: Semicolon after if condition terminates it immediately\\nif (score > 90); {\\n  console.log(\\"You got an A!\\"); // Runs even though score is 85!\\n}",
        "explanation": "Putting a semicolon immediately after if (score > 90); cuts the if statement short, so the code inside the curly braces runs unconditionally. Using single = reassigns the variable instead of comparing it."
      },
      "good": {
        "title": "✅ Clean: Clear comparisons with proper curly-brace blocks",
        "code": "const score = 85;\\n\\nif (score >= 90) {\\n  console.log(\\"Grade: A (Excellent!)\\");\\n} else if (score >= 80) {\\n  console.log(\\"Grade: B (Well done!)\\");\\n} else {\\n  console.log(\\"Grade: C (Keep practicing!)\\");\\n}\\n\\n// Clean ternary for status label:\\nconst passStatus = score >= 70 ? \\"Passed\\" : \\"Needs review\\";\\nconsole.log(\\"Status:\\", passStatus);",
        "explanation": "Using === or >= with clean curly-brace blocks ensures each branch runs only when its condition is genuinely met."
      }
    },
    "part5": {
      "title": "Conditional Logic Playground",
      "intro": "Run the code below to see if/else branching, ternary checks, and switch statements in action:",
      "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n// JS-04: CONDITIONAL LOGIC & DECISION MAKING\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n\\nconst userAge = 20;\\nconst isMember = true;\\n\\n// 1. Basic if / else branching:\\nif (userAge >= 18) {\\n  console.log(\\"Access: Welcome to the adult section!\\");\\n} else {\\n  console.log(\\"Access: Sorry, you must be 18 or older.\\");\\n}\\n\\n// 2. Chained else if for membership discounts:\\nlet discountRate = 0;\\n\\nif (isMember && userAge >= 60) {\\n  discountRate = 30; // Senior Member\\n} else if (isMember) {\\n  discountRate = 15; // Regular Member\\n} else {\\n  discountRate = 0;  // Non-member\\n}\\nconsole.log(\\"Discount Rate:\\", discountRate + \\"%\\");\\n\\n// 3. Ternary operator shortcut:\\nconst accountStatus = isMember ? \\"Active Member\\" : \\"Guest\\";\\nconsole.log(\\"Status:\\", accountStatus);\\n\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n// YOUR TURN:\\n// 1. Create a variable 'temperature' set to 28.\\n// 2. If temperature > 25, print \\"Wear shorts!\\".\\n// 3. Otherwise, print \\"Bring a jacket!\\".\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n"
    },
    "part6": {
      "title": "Key Takeaways: Making Decisions",
      "takeaways": [
        {
          "title": "1. if Checks Conditions",
          "desc": "Code inside an if block runs only when its condition evaluates to true."
        },
        {
          "title": "2. else Provides Fallbacks",
          "desc": "Use else to run an alternative block when the condition is false."
        },
        {
          "title": "3. Ternary for Simple Values",
          "desc": "condition ? valueIfTrue : valueIfFalse is great for simple one-line assignments."
        },
        {
          "title": "4. break in switch",
          "desc": "Always put a break statement at the end of each switch case to prevent fall-through."
        }
      ],
      "nextLessonPreview": {
        "title": "JS-05: Loops & Iteration: Repeating Work Without Repeating Code",
        "desc": "Now that you know how to make decisions, learn how to repeat instructions automatically with loops."
      }
    },
    "part7": {
      "title": "Knowledge Check: Decision Making",
      "quiz": {
        "question": "What happens in a switch statement if you forget to add a 'break' statement after a case?",
        "options": [
          "It throws a SyntaxError and stops running immediately.",
          "It falls through and executes the next case regardless of whether that case matches.",
          "It restarts the switch statement from the top.",
          "It deletes the variable being tested."
        ],
        "correctIndex": 1,
        "explanation": "Without a break statement, JavaScript continues executing subsequent cases even if their case values do not match."
      }
    }
  }`;

const js05Updated = `  "js05-loops-and-iteration": {
    "slug": "js05-loops-and-iteration",
    "code": "JS-05",
    "title": "Loops & Iteration: Repeating Work Without Repeating Code",
    "subtitle": "Automate repetitive tasks: understand while loops, master counting with classic for loops, and control iteration with break and continue.",
    "sections": [
      {
        "id": "part1",
        "label": "Why We Need Loops",
        "icon": "🔁",
        "tag": "AUTOMATION"
      },
      {
        "id": "part2",
        "label": "while & for Loop Mechanics",
        "icon": "⚙️",
        "tag": "SYNTAX"
      },
      {
        "id": "part3",
        "label": "Counter Walkthrough",
        "icon": "🔢",
        "tag": "COUNTERS"
      },
      {
        "id": "part4",
        "label": "Infinite Loop Traps",
        "icon": "⚠️",
        "tag": "TRAPS"
      },
      {
        "id": "part5",
        "label": "Loops Playground",
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
      "title": "Repeating Tasks: Why Loops Save Time",
      "bigPicture": "Computers are incredible at repeating work thousands of times without making mistakes or getting tired. Instead of copying and pasting the same line of code over and over, a loop tells the computer: 'keep running this block of code until my condition says to stop'.",
      "breakdownTitle": "What You Will Learn in This Lesson:",
      "breakdownItems": [
        {
          "title": "1. while Loops",
          "desc": "Repeat instructions as long as a condition remains true."
        },
        {
          "title": "2. for Loops",
          "desc": "A compact, standard loop for counting from a start number to an end number."
        },
        {
          "title": "3. Loop Control",
          "desc": "Use break to stop a loop early, and continue to skip to the next repetition."
        }
      ]
    },
    "part2": {
      "title": "The Two Main Kinds of Loops: while and for",
      "intro": "JavaScript gives you two primary ways to repeat code:",
      "cards": [
        {
          "number": "01",
          "tag": "Condition-First",
          "title": "The while Loop",
          "description": "while (condition) { ... } checks its condition before every round. As long as it is true, the block runs again. Great when you don't know the exact count in advance.",
          "color": "amber"
        },
        {
          "number": "02",
          "tag": "Counting",
          "title": "The Classic for Loop",
          "description": "for (start; check; step) packs the counter creation, condition check, and increment into one neat line. Perfect when you know how many times to repeat.",
          "color": "emerald"
        },
        {
          "number": "03",
          "tag": "Steering",
          "title": "break and continue",
          "description": "break stops the entire loop immediately. continue skips the rest of the current round and jumps straight to the next cycle.",
          "color": "purple"
        }
      ],
      "rule": {
        "title": "💡 The Termination Rule",
        "content": "Every loop must have a guaranteed path to its exit condition. Always make sure your counter moves closer to stopping on every single round."
      }
    },
    "part3": {
      "title": "Step-by-Step Walkthrough of a for Loop",
      "intro": "Understanding exactly what happens on each round of a counting loop:",
      "points": [
        {
          "title": "1. The 3 Parts of a for Loop",
          "content": "In for (let i = 1; i <= 3; i++), part 1 runs once at the start (let i = 1). Part 2 checks if i <= 3. If true, the code block runs. Part 3 increments i (i++), and the cycle repeats."
        },
        {
          "title": "2. Tracing the Counter",
          "content": "Round 1: i is 1 (runs). Round 2: i is 2 (runs). Round 3: i is 3 (runs). Then i becomes 4: 4 <= 3 is false, so the loop stops!"
        },
        {
          "title": "3. break vs continue in Action",
          "content": "Use break when you find what you are looking for and don't need to check further. Use continue when you want to ignore a specific number (like skipping even numbers).",
          "codeSnippet": "// Count from 1 to 5, but skip number 3:\\nfor (let i = 1; i <= 5; i++) {\\n  if (i === 3) continue; // Skip 3\\n  console.log(\\"Count:\\", i); // Prints 1, 2, 4, 5\\n}"
        }
      ]
    },
    "part4": {
      "title": "The Infinite Loop Trap: Freezing the Browser",
      "bad": {
        "title": "❌ Broken: Forgetting to increment the counter in a while loop",
        "code": "let count = 1;\\n\\n// Danger: count is never updated inside the loop!\\n// while (count <= 3) {\\n//   console.log(\\"Count:\\", count);\\n//   // Forgot count++! Runs forever and freezes your tab!\\n// }",
        "explanation": "Because count remains 1 forever, count <= 3 is always true. The loop repeats millions of times per second until the browser crashes."
      },
      "good": {
        "title": "✅ Clean: Guaranteed counter progression with safe bounds",
        "code": "// 1. while loop with counter update\\nlet count = 1;\\nwhile (count <= 3) {\\n  console.log(\\"While count:\\", count);\\n  count++; // Safe: moves toward 4, stopping the loop!\\n}\\n\\n// 2. for loop with compact counting\\nfor (let i = 1; i <= 3; i++) {\\n  console.log(\\"For loop count:\\", i);\\n}",
        "explanation": "Updating the counter on every iteration guarantees that the exit condition is reached cleanly."
      }
    },
    "part5": {
      "title": "Loops & Iteration Playground",
      "intro": "Run counting loops, experiment with while statements, and control loops with break:",
      "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n// JS-05: LOOPS & ITERATION\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n\\n// 1. Counting with a classic for loop:\\nconsole.log(\\"--- Counting 1 to 5 ---\\\\n\\");\\nfor (let i = 1; i <= 5; i++) {\\n  console.log(\\"Step #\\" + i);\\n}\\n\\n// 2. Countdown with a while loop:\\nconsole.log(\\"\\\\n--- Rocket Launch Countdown ---\\\\n\\");\\nlet countdown = 3;\\nwhile (countdown > 0) {\\n  console.log(countdown + \\"...\\");\\n  countdown--; // Decrement counter\\n}\\nconsole.log(\\"🚀 Blast off!\\\\n\\");\\n\\n// 3. Early exit with break:\\nconsole.log(\\"--- Searching for number 3 ---\\\\n\\");\\nfor (let num = 1; num <= 10; num++) {\\n  if (num === 3) {\\n    console.log(\\"Found target number 3! Stopping early.\\");\\n    break; // Stop loop here\\n  }\\n  console.log(\\"Checking:\\", num);\\n}\\n\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n// YOUR TURN:\\n// 1. Write a for loop that calculates the sum of numbers from 1 to 5.\\n//    (Hint: start with let total = 0; before the loop).\\n// 2. Print the final total to the console.\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n"
    },
    "part6": {
      "title": "Key Takeaways: Repeating Tasks",
      "takeaways": [
        {
          "title": "1. Loops Automate Repetition",
          "desc": "They run a code block repeatedly until their exit condition is reached."
        },
        {
          "title": "2. for for Counting",
          "desc": "Use for (let i = 0; i < n; i++) when you know the number of repetitions."
        },
        {
          "title": "3. Guaranteed Counter Updates",
          "desc": "Always ensure while loop counters increment to avoid infinite loops."
        },
        {
          "title": "4. break & continue",
          "desc": "Use break to exit early, and continue to skip the current cycle."
        }
      ],
      "nextLessonPreview": {
        "title": "JS-06: Functions: Packaging Reusable Logic & Arrow Syntax",
        "desc": "Now that you can make decisions and repeat tasks, learn how to package code into reusable functions."
      }
    },
    "part7": {
      "title": "Knowledge Check: Repeating Tasks",
      "quiz": {
        "question": "What is the key difference between the 'break' and 'continue' keywords inside a loop?",
        "options": [
          "break stops the entire loop immediately; continue skips to the next cycle of the loop.",
          "break pauses execution for 1 second; continue runs the loop faster.",
          "break is only allowed in while loops; continue is only allowed in for loops.",
          "There is no difference; both words do the exact same thing."
        ],
        "correctIndex": 0,
        "explanation": "The 'break' keyword terminates the loop completely, while 'continue' skips the rest of the current round and jumps to the next iteration."
      }
    }
  }`;

const js06Updated = `  "js06-functions-and-arrow-syntax": {
    "slug": "js06-functions-and-arrow-syntax",
    "code": "JS-06",
    "title": "Functions: Packaging Reusable Logic & Arrow Syntax",
    "subtitle": "Write reusable blocks of code: understand function declarations, pass parameters in, return results, and master concise modern arrow functions.",
    "sections": [
      {
        "id": "part1",
        "label": "What Is a Function?",
        "icon": "📦",
        "tag": "CONCEPT"
      },
      {
        "id": "part2",
        "label": "Parameters & Return Values",
        "icon": "📥",
        "tag": "MECHANICS"
      },
      {
        "id": "part3",
        "label": "Modern Arrow Functions",
        "icon": "🏹",
        "tag": "ARROWS"
      },
      {
        "id": "part4",
        "label": "Common Function Mistakes",
        "icon": "⚠️",
        "tag": "TRAPS"
      },
      {
        "id": "part5",
        "label": "Functions Playground",
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
      "title": "What a Function Is & Why We Use Them",
      "bigPicture": "A function is a reusable machine in your code. You write a set of instructions once, give it a name, and can call it anytime with different inputs to get calculated results. Think of a function like a smoothie blender: you drop ingredients in (parameters), run the machine, and pour out the delicious result (return value).",
      "breakdownTitle": "What You Will Learn in This Lesson:",
      "breakdownItems": [
        {
          "title": "1. Function Declarations",
          "desc": "Define reusable blocks using the function keyword and give them descriptive names."
        },
        {
          "title": "2. Parameters vs Arguments",
          "desc": "Parameters are the input placeholders in the definition; arguments are the real values passed in."
        },
        {
          "title": "3. Return Values & Arrow Syntax",
          "desc": "Send computed answers back to callers using return, and write concise modern arrow functions."
        }
      ]
    },
    "part2": {
      "title": "Parameters, Arguments & Return Values",
      "intro": "Functions communicate with the rest of your program through inputs and outputs:",
      "cards": [
        {
          "number": "01",
          "tag": "Standard",
          "title": "function Declaration",
          "description": "function greet(name) { return \\"Hello, \\" + name; } — the standard, classic way to define a named reusable function.",
          "color": "emerald"
        },
        {
          "number": "02",
          "tag": "Inputs",
          "title": "Parameters & Arguments",
          "description": "Parameters are the variable names in the function definition (like name). Arguments are the actual values you pass in when calling it (like greet(\\"Alice\\")).",
          "color": "cyan"
        },
        {
          "number": "03",
          "tag": "Outputs",
          "title": "The return Keyword",
          "description": "Sends a value back out to where the function was called. If you don't write a return statement, the function returns undefined by default.",
          "color": "purple"
        }
      ],
      "rule": {
        "title": "💡 The Single Responsibility Rule",
        "content": "Keep each function focused on doing one job well. Give your function a clear action verb name like calculateTotal, formatName, or isAdult."
      }
    },
    "part3": {
      "title": "Modern Arrow Functions (=>)",
      "intro": "Writing clean, concise functions using modern ES6 arrow syntax:",
      "points": [
        {
          "title": "1. Arrow Function Syntax",
          "content": "Modern JavaScript allows writing functions using an arrow (=>): const add = (a, b) => { return a + b; }; It creates a function and stores it inside a const variable."
        },
        {
          "title": "2. One-Line Implicit Return Shortcut",
          "content": "If an arrow function only contains a single expression, you can remove the curly braces and the return keyword! const add = (a, b) => a + b; automatically returns the sum."
        },
        {
          "title": "3. Default Parameters",
          "content": "You can provide a fallback value for any parameter: function greet(name = \\"Guest\\") { ... } If someone calls greet() without passing a name, it uses 'Guest' automatically.",
          "codeSnippet": "// Classic function:\\nfunction multiply(a, b) {\\n  return a * b;\\n}\\n\\n// Modern 1-line arrow function (implicit return):\\nconst multiplyArrow = (a, b) => a * b;\\n\\nconsole.log(multiplyArrow(4, 5)); // 20"
        }
      ]
    },
    "part4": {
      "title": "Common Beginner Mistakes with Functions",
      "bad": {
        "title": "❌ Broken: Forgetting the return statement and mixing up parameters with console.log",
        "code": "// Mistake 1: Forgetting return (calling code gets undefined!)\\nfunction addBonus(score) {\\n  const newScore = score + 50;\\n  // Forgot to return newScore!\\n}\\n\\nconst finalScore = addBonus(100);\\nconsole.log(\\"Final Score:\\", finalScore); // ❌ undefined!\\n\\n// Mistake 2: Forgetting to call the function with parentheses\\nconsole.log(addBonus); // ❌ Prints function code, does not run it!",
        "explanation": "Printing with console.log() inside a function only shows output on the screen; it does NOT send the value back to your code. You must use return. Also, writing addBonus without () references the function itself without executing it."
      },
      "good": {
        "title": "✅ Clean: Explicit returns and proper function calls",
        "code": "// 1. Function calculates and returns the result\\nfunction addBonus(score) {\\n  return score + 50; // ✅ Returns the new number\\n}\\n\\n// 2. Call with parentheses and store the returned answer\\nconst finalScore = addBonus(100);\\nconsole.log(\\"Final Score:\\", finalScore); // 150\\n\\n// 3. Clean arrow function alternative\\nconst double = (num) => num * 2;\\nconsole.log(\\"Double 25:\\", double(25)); // 50",
        "explanation": "Using return delivers the calculated value so you can store it in variables or pass it to other calculations."
      }
    },
    "part5": {
      "title": "Functions & Arrow Syntax Playground",
      "intro": "Write functions, experiment with default parameters, and convert regular functions to arrows:",
      "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n// JS-06: FUNCTIONS & ARROW SYNTAX\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n\\n// 1. Standard Function with Default Parameter:\\nfunction greetUser(name = \\"Friend\\") {\\n  return \\"Hello, \\" + name + \\"! Welcome back.\\";\\n}\\n\\nconsole.log(greetUser(\\"Alex\\"));\\nconsole.log(greetUser()); // Uses default 'Friend'\\n\\n// 2. Function with Math calculation and explicit return:\\nfunction calculateDiscount(price, discountPercent = 10) {\\n  const discountAmount = price * (discountPercent / 100);\\n  return price - discountAmount;\\n}\\n\\nconst salePrice = calculateDiscount(100, 20);\\nconsole.log(\\"Sale Price ($100 with 20% off): $\\" + salePrice);\\n\\n// 3. Concise 1-line Arrow Function (implicit return):\\nconst isAdult = (age) => age >= 18;\\nconsole.log(\\"Is age 20 an adult?:\\", isAdult(20)); // true\\n\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n// YOUR TURN:\\n// 1. Create a function 'calculateArea(width, height)' that returns width * height.\\n// 2. Call calculateArea(5, 10) and print the result.\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n"
    },
    "part6": {
      "title": "Key Takeaways: Functions & Reusable Logic",
      "takeaways": [
        {
          "title": "1. Functions Package Code",
          "desc": "Write logic once and run it many times with different inputs."
        },
        {
          "title": "2. Parameters vs Arguments",
          "desc": "Parameters are the variables in the definition; arguments are the real values passed in."
        },
        {
          "title": "3. Always return Results",
          "desc": "Use return to send computed values back to the calling code."
        },
        {
          "title": "4. Arrow Functions (=>)",
          "desc": "Use arrow functions for clean, modern syntax and concise one-line returns."
        }
      ],
      "nextLessonPreview": {
        "title": "JS-07: Scope: Global, Function, and Block Scope",
        "desc": "Now that you can write functions, learn where variables live and why scope boundaries protect your code."
      }
    },
    "part7": {
      "title": "Knowledge Check: Functions & Arrow Syntax",
      "quiz": {
        "question": "What does a JavaScript function return if it finishes running without reaching an explicit 'return' statement?",
        "options": [
          "null",
          "0",
          "undefined",
          "false"
        ],
        "correctIndex": 2,
        "explanation": "In JavaScript, any function that finishes executing without an explicit return statement automatically returns undefined."
      }
    }
  }`;

// Find start of js04 and end of js06 in lessonContent
const startMark = '  "js04-conditional-logic": {';
const endMark = '  "js07-scope-global-function-block": {';

const startIdx = lessonContent.indexOf(startMark);
const endIdx = lessonContent.indexOf(endMark);

if (startIdx === -1 || endIdx === -1) {
  throw new Error("Could not find start/end marks in javascript-lesson-content.ts");
}

const newBatchContent = js04Updated + ',\n\n' + js05Updated + ',\n\n' + js06Updated + ',\n\n';
lessonContent = lessonContent.slice(0, startIdx) + newBatchContent + lessonContent.slice(endIdx);
fs.writeFileSync(lessonContentPath, lessonContent, 'utf8');
console.log("Successfully updated javascript-lesson-content.ts for JS-04, JS-05, and JS-06!");

// 2. Update lib/quiz/javascript-quizzes.ts
const quizzesPath = 'lib/quiz/javascript-quizzes.ts';
let quizzesContent = fs.readFileSync(quizzesPath, 'utf8');

const updatedQuizzesBatch = `  {
    "id": "quiz-javascript-js04",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js04-conditional-logic",
    "lessonCode": "JS-04",
    "lessonTitle": "Conditional Logic: Making Decisions with if, else & switch",
    "description": "Test your understanding of branching logic, ternary operators, and switch statements with break.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js04-q1",
        "type": "multiple_choice",
        "title": "Ternary Operator Syntax",
        "prompt": "What does the ternary operator (? :) do in JavaScript?",
        "options": [
          "It defines a loop that repeats three times",
          "It provides a concise one-line if/else expression that evaluates to a value",
          "It compares three numbers for equality",
          "It throws an error if a condition is false"
        ],
        "correctAnswer": 1,
        "explanation": "The ternary operator condition ? valueIfTrue : valueIfFalse evaluates a condition and directly returns one of two values.",
        "hint": "Think: condition ? trueResult : falseResult",
        "hintCostXP": 5
      },
      {
        "id": "js04-q2",
        "type": "code_output",
        "title": "Switch Statement Fall-Through",
        "prompt": "What is logged to the console by this switch statement?",
        "codeSnippet": "const grade = \\"B\\";\\nlet result = \\"\\";\\nswitch (grade) {\\n  case \\"A\\":\\n    result += \\"Great \\";\\n  case \\"B\\":\\n    result += \\"Good \\";\\n  case \\"C\\":\\n    result += \\"Pass\\";\\n    break;\\n  default:\\n    result = \\"Unknown\\";\\n}\\nconsole.log(result);",
        "language": "javascript",
        "options": [
          "'Good '",
          "'Good Pass'",
          "'Great Good Pass'",
          "'Pass'"
        ],
        "correctAnswer": 1,
        "explanation": "Because case 'B' lacks a break statement, execution falls through into case 'C', adding 'Pass' before reaching break.",
        "hint": "Watch out for missing break statements in switch cases.",
        "hintCostXP": 5
      },
      {
        "id": "js04-q3",
        "type": "code_output",
        "title": "Chained if / else if Evaluation",
        "prompt": "What will this code log to the console?",
        "codeSnippet": "const score = 82;\\nlet grade = \\"\\";\\nif (score >= 90) {\\n  grade = \\"A\\";\\n} else if (score >= 80) {\\n  grade = \\"B\\";\\n} else {\\n  grade = \\"C\\";\\n}\\nconsole.log(grade);",
        "language": "javascript",
        "options": [
          "'B'",
          "'A'",
          "'C'",
          "'A B'"
        ],
        "correctAnswer": 0,
        "explanation": "82 >= 90 is false, so it checks score >= 80. 82 >= 80 is true, so grade is set to 'B' and all remaining else blocks are skipped.",
        "hint": "JavaScript checks from top to bottom and stops at the first true match.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js05",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js05-loops-and-iteration",
    "lessonCode": "JS-05",
    "lessonTitle": "Loops & Iteration: Repeating Work Without Repeating Code",
    "description": "Test your understanding of while loops, for loops, break, continue, and avoiding infinite loops.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js05-q1",
        "type": "code_output",
        "title": "Classic for Loop Counting",
        "prompt": "What will this counting loop output to the console?",
        "codeSnippet": "let result = \\"\\";\\nfor (let i = 1; i <= 3; i++) {\\n  result += i + \\" \\";\\n}\\nconsole.log(result.trim());",
        "language": "javascript",
        "options": [
          "'1 2 3'",
          "'1 2'",
          "'0 1 2 3'",
          "'3 2 1'"
        ],
        "correctAnswer": 0,
        "explanation": "The loop starts with i = 1, runs while i <= 3, and increments i by 1 each round, logging '1 2 3'.",
        "hint": "Notice that the loop starts at 1 and stops when i becomes greater than 3.",
        "hintCostXP": 5
      },
      {
        "id": "js05-q2",
        "type": "code_output",
        "title": "Break and Continue in a Counting Loop",
        "prompt": "What will this loop calculate and output?",
        "codeSnippet": "let sum = 0;\\nfor (let i = 1; i <= 5; i++) {\\n  if (i === 2) continue;\\n  if (i === 4) break;\\n  sum += i;\\n}\\nconsole.log(sum);",
        "language": "javascript",
        "options": [
          "4",
          "6",
          "10",
          "1"
        ],
        "correctAnswer": 0,
        "explanation": "i=1: sum becomes 1. i=2: continue skips adding 2. i=3: sum becomes 1 + 3 = 4. i=4: break immediately exits the loop. The final sum is 4.",
        "hint": "continue skips to the next number; break exits the loop immediately.",
        "hintCostXP": 5
      },
      {
        "id": "js05-q3",
        "type": "multiple_choice",
        "title": "Preventing Infinite Loops",
        "prompt": "What causes a while loop to become an infinite loop that freezes the browser?",
        "options": [
          "Using let instead of const for the counter variable",
          "The condition never becomes false because the counter or variable is never updated inside the loop",
          "Writing more than 5 lines of code inside the loop body",
          "Using a console.log statement inside the loop"
        ],
        "correctAnswer": 1,
        "explanation": "A while loop runs as long as its condition is true. If the loop body never changes the tested variable, the condition stays true forever, causing an infinite loop.",
        "hint": "Every loop must have a path to make its condition false.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js06",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js06-functions-and-arrow-syntax",
    "lessonCode": "JS-06",
    "lessonTitle": "Functions: Packaging Reusable Logic & Arrow Syntax",
    "description": "Assess your understanding of function declarations, arrow functions, default parameters, and return values.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js06-q1",
        "type": "code_output",
        "title": "Arrow Function with Default Parameter",
        "prompt": "Predict the output of these two function calls:",
        "codeSnippet": "const multiply = (a, b = 2) => a * b;\\nconsole.log(multiply(5));\\nconsole.log(multiply(5, 4));",
        "language": "javascript",
        "options": [
          "10 then 20",
          "NaN then 20",
          "undefined then 20",
          "10 then 10"
        ],
        "correctAnswer": 0,
        "explanation": "When b is omitted, the default parameter b = 2 is used (5 * 2 = 10). When 4 is provided, it calculates 5 * 4 = 20.",
        "hint": "Default parameters activate only when the argument is omitted.",
        "hintCostXP": 5
      },
      {
        "id": "js06-q2",
        "type": "multiple_choice",
        "title": "Parameters vs Arguments",
        "prompt": "What is the difference between a parameter and an argument in JavaScript?",
        "options": [
          "Parameters are the placeholder variable names in the function definition; arguments are the real values passed when calling the function",
          "Arguments are only numbers, while parameters are only strings",
          "Parameters are only used in arrow functions; arguments are only used in regular functions",
          "There is no difference; both words mean the exact same thing"
        ],
        "correctAnswer": 0,
        "explanation": "Parameters are defined in the function signature (like a, b). Arguments are the actual values passed in during an invocation (like 5, 10).",
        "hint": "Think: parameter = placeholder, argument = actual value.",
        "hintCostXP": 5
      },
      {
        "id": "js06-q3",
        "type": "code_output",
        "title": "Missing Return Statement",
        "prompt": "What will be printed when calling a function that has no return statement?",
        "codeSnippet": "function recordScore(points) {\\n  const updated = points + 10;\\n}\\nconst scoreResult = recordScore(50);\\nconsole.log(scoreResult);",
        "language": "javascript",
        "options": [
          "undefined",
          "60",
          "0",
          "null"
        ],
        "correctAnswer": 0,
        "explanation": "In JavaScript, any function that finishes executing without an explicit return statement returns undefined by default.",
        "hint": "If a function doesn't use the return keyword, what does JavaScript return?",
        "hintCostXP": 5
      }
    ]
  }`;

const quizStartMark = '  {\n    "id": "quiz-javascript-js04",';
const quizEndMark = '  {\n    "id": "quiz-javascript-js07",';

const qStartIdx = quizzesContent.indexOf(quizStartMark);
const qEndIdx = quizzesContent.indexOf(quizEndMark);

if (qStartIdx === -1 || qEndIdx === -1) {
  throw new Error("Could not find quiz start/end marks in javascript-quizzes.ts");
}

quizzesContent = quizzesContent.slice(0, qStartIdx) + updatedQuizzesBatch + ',\n' + quizzesContent.slice(qEndIdx);
fs.writeFileSync(quizzesPath, quizzesContent, 'utf8');
console.log("Successfully updated lib/quiz/javascript-quizzes.ts for JS-04, JS-05, and JS-06!");
