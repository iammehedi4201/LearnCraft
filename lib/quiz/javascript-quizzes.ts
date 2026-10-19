/**
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

export const JAVASCRIPT_MODULE_QUIZZES: ModuleQuiz[] = [
  {
    "id": "quiz-javascript-js01",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js01-how-javascript-runs",
    "lessonCode": "JS-01",
    "lessonTitle": "How JavaScript Runs: The Runtime, Console & Statements",
    "description": "Test your understanding of how JavaScript runs code line by line, using statements and expressions, and printing with console.log().",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js01-q1",
        "type": "multiple_choice",
        "title": "Line-by-Line Execution",
        "prompt": "How does JavaScript execute statements inside a script by default?",
        "options": [
          "It executes statements line by line from top to bottom in order",
          "It runs lines in random order depending on computer speed",
          "It starts at the bottom of the file and reads upward",
          "It only executes lines that contain numbers"
        ],
        "correctAnswer": 0,
        "explanation": "JavaScript executes code sequentially from top to bottom. It finishes each line before moving to the next line.",
        "hint": "Think about reading instructions from top to bottom.",
        "hintCostXP": 5
      },
      {
        "id": "js01-q2",
        "type": "code_output",
        "title": "Sequential Execution",
        "prompt": "Predict the exact console output of this sequential code execution:",
        "codeSnippet": "console.log(\"Start\");\nconst appVersion = 1 + 1;\nconsole.log(\"v\" + appVersion);\nconsole.log(\"Finish\");",
        "language": "javascript",
        "options": [
          "'Start', 'v2', 'Finish'",
          "'Start', 'v11', 'Finish'",
          "'Finish', 'v2', 'Start'",
          "'Start', 'Finish'"
        ],
        "correctAnswer": 0,
        "explanation": "JavaScript runs line by line from top to bottom. 1 + 1 calculates 2, which combines with 'v' to make 'v2', outputting: 'Start', 'v2', 'Finish'.",
        "hint": "Follow the execution line by line from top to bottom.",
        "hintCostXP": 5
      },
      {
        "id": "js01-q3",
        "type": "multiple_choice",
        "title": "Statements vs Expressions",
        "prompt": "What is the main difference between an expression and a statement in JavaScript?",
        "options": [
          "An expression produces a value (like 5 + 3); a statement is a complete instruction that performs an action (like console.log)",
          "Expressions can only contain letters; statements can only contain numbers",
          "Statements run before expressions are ever evaluated",
          "There is no difference; both words mean the exact same thing"
        ],
        "correctAnswer": 0,
        "explanation": "An expression evaluates to a value (such as 10 + 5 or 'Welcome'). A statement is a complete instruction that carries out an action, such as displaying output with console.log().",
        "hint": "An expression produces a value; a statement performs an action.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js02",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js02-variables-and-data-types",
    "lessonCode": "JS-02",
    "lessonTitle": "Variables & Data Types: Storing Data with let & const",
    "description": "Check your understanding of const vs let, curly-brace scope, the 7 basic data types, and typeof checks.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js02-q1",
        "type": "multiple_choice",
        "title": "const vs let best practice",
        "prompt": "What is the industry best practice when declaring variables in modern JavaScript?",
        "options": [
          "Use 'var' for everything because it works in legacy browsers",
          "Default to 'const' for predictability; only switch to 'let' when reassignment is explicitly required",
          "Always use 'let' because 'const' values cannot be read more than once",
          "Declare all variables without keywords to make them globally available"
        ],
        "correctAnswer": 1,
        "explanation": "Using const by default makes code predictable and prevents accidental reassignment bugs. Use let only when a value genuinely needs reassignment (e.g., loop counters).",
        "hint": "Values that cannot change by accident make your code safe and predictable.",
        "hintCostXP": 5
      },
      {
        "id": "js02-q2",
        "type": "code_output",
        "title": "typeof Primitives",
        "prompt": "What will this code log to the console?",
        "codeSnippet": "const age = 25;\nconst isMember = true;\nlet score;\nconsole.log(typeof age, typeof isMember, typeof score);",
        "language": "javascript",
        "options": [
          "'number boolean undefined'",
          "'int bool null'",
          "'number boolean null'",
          "'number boolean void'"
        ],
        "correctAnswer": 0,
        "explanation": "In JavaScript, numeric values have type 'number', booleans have type 'boolean', and an unassigned variable has type 'undefined'.",
        "hint": "JavaScript does not have 'int' or 'bool' types; it uses 'number' and 'boolean'.",
        "hintCostXP": 5
      },
      {
        "id": "js02-q3",
        "type": "multiple_choice",
        "title": "null vs undefined",
        "prompt": "What is the key semantic difference between 'null' and 'undefined'?",
        "options": [
          "'null' is an intentional assignment representing 'no value', while 'undefined' means a variable has been declared but not assigned",
          "'null' is a number equal to 0; 'undefined' is a string",
          "'null' throws a crash when logged, while 'undefined' does not",
          "They are completely identical with no semantic difference"
        ],
        "correctAnswer": 0,
        "explanation": "'undefined' is JavaScript's default uninitialized state, while 'null' is explicitly assigned by developers to represent intentional absence of value.",
        "hint": "One is assigned intentionally by developers; the other is the engine's default empty state.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js03",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js03-operators-and-equality",
    "lessonCode": "JS-03",
    "lessonTitle": "Operators, Equality & Type Conversion: The === Rule",
    "description": "Check your understanding of math operators, logical operators, truthy/falsy values, and why === is safer than ==.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js03-q1",
        "type": "code_output",
        "title": "Strict vs Loose Equality",
        "prompt": "Predict the output of these two comparisons:",
        "codeSnippet": "console.log(0 == \"\");\nconsole.log(0 === \"\");",
        "language": "javascript",
        "options": [
          "true then false",
          "false then false",
          "true then true",
          "false then true"
        ],
        "correctAnswer": 0,
        "explanation": "Double equals (==) coerces empty string '' into 0, making 0 == '' true! Triple equals (===) checks both type and value; since number !== string, 0 === '' is false.",
        "hint": "Double equals (==) tries to guess and convert types behind your back; triple equals (===) does not.",
        "hintCostXP": 5
      },
      {
        "id": "js03-q2",
        "type": "multiple_choice",
        "title": "Falsy values in JavaScript",
        "prompt": "Which of the following values is truthy in JavaScript?",
        "options": [
          "The empty string: ''",
          "The number: 0",
          "An empty array: []",
          "The value: null"
        ],
        "correctAnswer": 2,
        "explanation": "In JavaScript, all objects and arrays (even empty ones like [] and {}) are truthy! Only 6 values are falsy: false, 0, -0, '', null, undefined, and NaN.",
        "hint": "Empty objects and arrays are reference types and always evaluate to truthy.",
        "hintCostXP": 5
      },
      {
        "id": "js03-q3",
        "type": "code_output",
        "title": "Logical Short-Circuiting",
        "prompt": "What will this short-circuiting expression output?",
        "codeSnippet": "const result = \"Guest\" || \"Default\";\nconst guard = null && \"Active\";\nconsole.log(result, guard);",
        "language": "javascript",
        "options": [
          "'Guest null'",
          "'Default Active'",
          "'true false'",
          "'Guest Active'"
        ],
        "correctAnswer": 0,
        "explanation": "Logical OR (||) returns the first truthy value ('Guest'). Logical AND (&&) returns the first falsy value (null).",
        "hint": "|| stops at first truthy; && stops at first falsy.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js04",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js04-conditional-logic",
    "lessonCode": "JS-04",
    "lessonTitle": "Conditional Logic: Decision Making with if/else & switch",
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
          "It defines a loop that runs three times",
          "It provides a concise one-line if/else expression that evaluates to a value",
          "It compares three variables for equality",
          "It throws an error if a condition is falsy"
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
        "codeSnippet": "const grade = \"B\";\nlet result = \"\";\nswitch (grade) {\n  case \"A\":\n    result += \"Great \";\n  case \"B\":\n    result += \"Good \";\n  case \"C\":\n    result += \"Pass\";\n    break;\n  default:\n    result = \"Unknown\";\n}\nconsole.log(result);",
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
        "type": "multiple_choice",
        "title": "Logical AND Guard",
        "prompt": "In the expression (isLoggedIn && showDashboard()), when does showDashboard() actually execute?",
        "options": [
          "Always, regardless of isLoggedIn",
          "Only if isLoggedIn is truthy (short-circuit evaluation)",
          "Only if isLoggedIn is false",
          "Never, because && requires a ternary operator"
        ],
        "correctAnswer": 1,
        "explanation": "JavaScript uses short-circuit evaluation: if the left side of && is falsy, execution stops immediately. showDashboard() only runs if isLoggedIn is true.",
        "hint": "If the first condition is false, && cannot be true, so the right side is skipped.",
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
    "description": "Test your skills with for loops, while loops, for...of iteration, and avoiding infinite loops.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js05-q1",
        "type": "multiple_choice",
        "title": "for...of vs for...in",
        "prompt": "Which loop is designed specifically for iterating over the VALUES of an array or iterable?",
        "options": [
          "for...in",
          "for...of",
          "while...in",
          "do...for"
        ],
        "correctAnswer": 1,
        "explanation": "for...of iterates directly over the values of arrays, strings, and sets. for...in iterates over the property keys of an object.",
        "hint": "Think: for (const item of items) gets the items themselves.",
        "hintCostXP": 5
      },
      {
        "id": "js05-q2",
        "type": "code_output",
        "title": "Break and Continue",
        "prompt": "What will this loop output?",
        "codeSnippet": "const numbers = [1, 2, 3, 4, 5];\nlet sum = 0;\nfor (const n of numbers) {\n  if (n === 2) continue;\n  if (n === 4) break;\n  sum += n;\n}\nconsole.log(sum);",
        "language": "javascript",
        "options": [
          "4",
          "6",
          "10",
          "1"
        ],
        "correctAnswer": 0,
        "explanation": "1 is added (sum=1). 2 is skipped with continue. 3 is added (sum=4). When n is 4, break stops the loop immediately. Output is 4.",
        "hint": "continue skips to the next item; break terminates the entire loop.",
        "hintCostXP": 5
      },
      {
        "id": "js05-q3",
        "type": "multiple_choice",
        "title": "Infinite Loops",
        "prompt": "What causes a while loop to become an infinite loop that freezes the browser?",
        "options": [
          "Using let instead of const for loop counters",
          "The condition never evaluates to false because the counter is not updated",
          "Having more than 10 lines of code inside the loop body",
          "Iterating over an empty array"
        ],
        "correctAnswer": 1,
        "explanation": "A while loop runs as long as its condition is true. If the loop body never changes the variables tested in the condition, it will run forever and freeze execution.",
        "hint": "Every loop needs a termination condition that is guaranteed to be reached.",
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
    "lessonTitle": "Functions: Parameters, Return Values & Arrow Syntax",
    "description": "Assess your knowledge of function declarations, arrow functions, default parameters, and return value mechanics.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js06-q1",
        "type": "code_output",
        "title": "Arrow Function Implicit Return",
        "prompt": "Predict the output of this concise arrow function:",
        "codeSnippet": "const multiply = (a, b = 2) => a * b;\nconsole.log(multiply(5));\nconsole.log(multiply(5, 4));",
        "language": "javascript",
        "options": [
          "10 then 20",
          "NaN then 20",
          "undefined then 20",
          "10 then 10"
        ],
        "correctAnswer": 0,
        "explanation": "When b is omitted, the default parameter b = 2 is used (5 * 2 = 10). When 4 is provided, it calculates 5 * 4 = 20.",
        "hint": "Default parameters only activate when the argument is undefined or omitted.",
        "hintCostXP": 5
      },
      {
        "id": "js06-q2",
        "type": "multiple_choice",
        "title": "Arrow Function Characteristics",
        "prompt": "Which of the following is true regarding Arrow Functions in JavaScript?",
        "options": [
          "They cannot take more than one parameter",
          "They do not have their own 'this' binding or 'arguments' object",
          "They are hoisted above variable declarations",
          "They must always be declared using the 'function' keyword"
        ],
        "correctAnswer": 1,
        "explanation": "Arrow functions do not have their own 'this'. They simply borrow 'this' from the code around them where they were written.",
        "hint": "Arrow functions borrow 'this' from the code around them.",
        "hintCostXP": 5
      },
      {
        "id": "js06-q3",
        "type": "code_output",
        "title": "Missing Return Statement",
        "prompt": "What will be printed when invoking this function without a return keyword?",
        "codeSnippet": "function recordMetric(val) {\n  const calculated = val * 10;\n}\nconst output = recordMetric(5);\nconsole.log(output);",
        "language": "javascript",
        "options": [
          "undefined",
          "50",
          "0",
          "null"
        ],
        "correctAnswer": 0,
        "explanation": "In JavaScript, any function that finishes executing without reaching an explicit 'return' statement returns undefined by default.",
        "hint": "What does JavaScript return when no return statement exists?",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js07",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js07-scope-global-function-block",
    "lessonCode": "JS-07",
    "lessonTitle": "Scope & Visibility: Global, Function & Block Scope with let & const",
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
        "explanation": "let and const are block-scoped. Variables declared with them inside { } cannot be accessed from outside that block. var ignores blocks.",
        "hint": "These two modern keywords were introduced in ES6 to fix var's scoping leaks.",
        "hintCostXP": 5
      },
      {
        "id": "js07-q2",
        "type": "code_output",
        "title": "Variable Shadowing",
        "prompt": "What is logged by the following code?",
        "codeSnippet": "const role = \"member\";\nfunction checkAccess() {\n  const role = \"admin\";\n  return role;\n}\nconsole.log(checkAccess() + \" | \" + role);",
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
        "codeSnippet": "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\n\nconst c1 = makeCounter();\nconst c2 = makeCounter();\n\nconsole.log(c1(), c1(), c2());",
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
        "title": "The Classic for Loop Closure Trap",
        "prompt": "What is logged by this classic loop with 'let' (block scope)?",
        "codeSnippet": "const callbacks = [];\nfor (let i = 0; i < 3; i++) {\n  callbacks.push(() => i);\n}\nconsole.log(callbacks[0](), callbacks[2]());",
        "language": "javascript",
        "options": [
          "0 2",
          "3 3",
          "0 0",
          "undefined undefined"
        ],
        "correctAnswer": 0,
        "explanation": "Because 'let' is block-scoped, JavaScript creates a fresh binding of 'i' for every single loop iteration. callbacks[0]() closes over i=0, and callbacks[2]() closes over i=2.",
        "hint": "'let' creates a new binding for each loop iteration; 'var' would share one binding.",
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
    "lessonTitle": "Callbacks & Higher-Order Functions: Functions as First-Class Citizens",
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
        "explanation": "In JavaScript, functions are values just like numbers, strings, or objects. You can pass them into functions and return them dynamically.",
        "hint": "Functions can be treated just like any ordinary variable or data value.",
        "hintCostXP": 5
      },
      {
        "id": "js09-q2",
        "type": "code_output",
        "title": "Higher-Order Function Output",
        "prompt": "What is the output of this code?",
        "codeSnippet": "function createMultiplier(factor) {\n  return function(number) {\n    return number * factor;\n  };\n}\nconst double = createMultiplier(2);\nconsole.log(double(7));",
        "language": "javascript",
        "options": [
          "14",
          "9",
          "undefined",
          "NaN"
        ],
        "correctAnswer": 0,
        "explanation": "createMultiplier returns a new function that remembers factor (2). Calling double(7) computes 7 * 2 = 14.",
        "hint": "The returned function multiplies its argument by the factory's factor.",
        "hintCostXP": 5
      },
      {
        "id": "js09-q3",
        "type": "multiple_choice",
        "title": "Passing a Function vs Calling It",
        "prompt": "When passing a function as a callback (e.g., button.addEventListener('click', handleClick)), why do we write handleClick instead of handleClick()?",
        "options": [
          "handleClick() would pass the function reference, which is invalid",
          "handleClick passes the function itself so the browser can run it later; handleClick() runs it immediately",
          "Parentheses are optional in all JavaScript function calls",
          "addEventListener requires functions to have no names"
        ],
        "correctAnswer": 1,
        "explanation": "Adding parentheses () runs the function immediately right now. Leaving off parentheses passes the function so the browser can run it later when clicked.",
        "hint": "We want the browser to call the function when clicked, not right now during setup.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js10",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js10-arrays-and-indexing",
    "lessonCode": "JS-10",
    "lessonTitle": "Arrays & Indexing: Storing Ordered Lists and Array Fundamentals",
    "description": "Evaluate your knowledge of zero-based array indexing, length, push/pop, and slice vs splice.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js10-q1",
        "type": "multiple_choice",
        "title": "Zero-Based Indexing",
        "prompt": "If an array has 5 items (items.length === 5), what is the index of the very last item?",
        "options": [
          "5",
          "4",
          "0",
          "-1"
        ],
        "correctAnswer": 1,
        "explanation": "Because JavaScript array indices start at 0, the last item is always at index items.length - 1 (5 - 1 = 4).",
        "hint": "The items are indexed 0, 1, 2, 3, 4.",
        "hintCostXP": 5
      },
      {
        "id": "js10-q2",
        "type": "code_output",
        "title": "Push and Pop",
        "prompt": "What will this code print?",
        "codeSnippet": "const tasks = [\"Email client\", \"Write tests\"];\ntasks.push(\"Ship feature\");\nconst finished = tasks.pop();\nconsole.log(tasks.length + \" | \" + finished);",
        "language": "javascript",
        "options": [
          "'2 | Ship feature'",
          "'3 | Ship feature'",
          "'2 | Write tests'",
          "'3 | Email client'"
        ],
        "correctAnswer": 0,
        "explanation": "push adds 'Ship feature' to the end (length 3). pop removes and returns the last item ('Ship feature'), leaving 2 items.",
        "hint": "push adds to the end, pop removes from the end.",
        "hintCostXP": 5
      },
      {
        "id": "js10-q3",
        "type": "multiple_choice",
        "title": "slice vs splice",
        "prompt": "What is the crucial difference between array.slice() and array.splice()?",
        "options": [
          "slice alters the original array; splice returns a shallow copy",
          "slice returns a new array without changing the original; splice modifies the original array in place",
          "slice only works on strings; splice only works on numbers",
          "Both methods change the original list equally"
        ],
        "correctAnswer": 1,
        "explanation": "slice(start, end) copies a portion of an array non-destructively. splice(start, count) cuts or inserts items directly into the original array.",
        "hint": "Remember: 'splice' has a 'p' for 'permanent' changes to the original.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js11",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js11-essential-array-methods",
    "lessonCode": "JS-11",
    "lessonTitle": "Essential Array Methods: map, filter, find & reduce",
    "description": "Evaluate your skills in functional array transformations, predicate filtering, item lookup, and accumulator reduction.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js11-q1",
        "type": "code_output",
        "title": "filter and map chaining",
        "prompt": "What will this chained array operation output?",
        "codeSnippet": "const numbers = [1, 2, 3, 4, 5];\nconst result = numbers\n  .filter(n => n % 2 === 0)\n  .map(n => n * 10);\nconsole.log(result);",
        "language": "javascript",
        "options": [
          "[20, 40]",
          "[10, 20, 30, 40, 50]",
          "[2, 4]",
          "[60]"
        ],
        "correctAnswer": 0,
        "explanation": "filter(n => n % 2 === 0) keeps only even numbers [2, 4]. map(n => n * 10) multiplies each by 10 to produce [20, 40].",
        "hint": "Filter first for evens, then multiply remaining items by 10.",
        "hintCostXP": 5
      },
      {
        "id": "js11-q2",
        "type": "multiple_choice",
        "title": "find vs filter difference",
        "prompt": "What is the key difference between .find() and .filter()?",
        "options": [
          "find() returns the first matching element directly (or undefined), whereas filter() returns an array of all matches",
          "find() mutates the original array in place, while filter() creates a copy",
          "filter() only accepts number elements; find() works only on objects",
          "There is no difference; find is an alias for filter"
        ],
        "correctAnswer": 0,
        "explanation": "find() stops evaluating as soon as it finds the first element matching the predicate, returning that element. filter() checks all elements and returns a new array.",
        "hint": "One returns an element directly; the other returns an array.",
        "hintCostXP": 5
      },
      {
        "id": "js11-q3",
        "type": "code_output",
        "title": "reduce Sum Accumulation",
        "prompt": "Predict the final number calculated by this reduce accumulator:",
        "codeSnippet": "const cart = [{ price: 10 }, { price: 25 }, { price: 15 }];\nconst total = cart.reduce((acc, item) => acc + item.price, 0);\nconsole.log(total);",
        "language": "javascript",
        "options": [
          "50",
          "25",
          "0",
          "NaN"
        ],
        "correctAnswer": 0,
        "explanation": "Initial accumulator is 0. 0 + 10 = 10; 10 + 25 = 35; 35 + 15 = 50.",
        "hint": "Trace the sum: 0 + 10 + 25 + 15.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js12",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js12-objects-and-methods",
    "lessonCode": "JS-12",
    "lessonTitle": "Objects & Methods: Modeling Real-World Data with Key-Value Pairs",
    "description": "Check your mastery of object properties, dot notation vs bracket notation, and object methods.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js12-q1",
        "type": "multiple_choice",
        "title": "Bracket Notation",
        "prompt": "When MUST you use bracket notation (user[key]) instead of dot notation (user.key)?",
        "options": [
          "When accessing numbers stored inside objects",
          "When the property name is stored in a dynamic variable or contains spaces/hyphens",
          "When calling a function attached to an object",
          "When creating a nested object"
        ],
        "correctAnswer": 1,
        "explanation": "Dot notation only works for static, valid JavaScript identifiers. If the key is stored in a variable (e.g. const prop = 'age') or has special characters like 'first-name', bracket notation is required.",
        "hint": "Think: user[dynamicKey] evaluates the variable dynamicKey.",
        "hintCostXP": 5
      },
      {
        "id": "js12-q2",
        "type": "code_output",
        "title": "Object Property Update",
        "prompt": "What is printed by this code?",
        "codeSnippet": "const product = { name: \"Desk\", price: 200 };\nproduct.price = 250;\nproduct[\"inStock\"] = true;\nconsole.log(product.price + \" | \" + product.inStock);",
        "language": "javascript",
        "options": [
          "'250 | true'",
          "'200 | undefined'",
          "'200 | true'",
          "TypeError: Assignment to constant variable"
        ],
        "correctAnswer": 0,
        "explanation": "Declaring an object with const prevents reassigning the variable product to a new value, but the properties inside the object remain mutable.",
        "hint": "const protects the reference, not the properties inside.",
        "hintCostXP": 5
      },
      {
        "id": "js12-q3",
        "type": "multiple_choice",
        "title": "Object.keys and Object.values",
        "prompt": "What does Object.keys(obj) return?",
        "options": [
          "A string of all keys combined",
          "An array containing all the property names (keys) of the object",
          "The count of properties inside the object",
          "A new copy of the object"
        ],
        "correctAnswer": 1,
        "explanation": "Object.keys(obj) returns an array of strings representing all enumerable property keys of the object.",
        "hint": "It returns a list of all the key names in an array.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js13",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js13-object-references-and-copying",
    "lessonCode": "JS-13",
    "lessonTitle": "Object References & Copying: Shallow Copy vs Deep Cloning",
    "description": "Understand how objects are stored in memory, why copying a variable can point to the same object, and how to make safe copies.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js13-q1",
        "type": "code_output",
        "title": "Accidental Changes with Shared Objects",
        "prompt": "What will this code log?",
        "codeSnippet": "const a = { count: 10 };\nconst b = a;\nb.count = 25;\nconsole.log(a.count);",
        "language": "javascript",
        "options": [
          "10",
          "25",
          "undefined",
          "NaN"
        ],
        "correctAnswer": 1,
        "explanation": "Assigning const b = a copies the memory pointer, not the object. Both a and b point to the exact same object in memory, so modifying b.count modifies a.count.",
        "hint": "Both variables reference the exact same memory location.",
        "hintCostXP": 5
      },
      {
        "id": "js13-q2",
        "type": "multiple_choice",
        "title": "Shallow vs Deep Copy",
        "prompt": "Why is the spread operator {...user} only a SHALLOW copy?",
        "options": [
          "It only copies the first property of the object",
          "It clones top-level properties, but nested objects and arrays are still copied as shared references",
          "It converts all numbers to strings",
          "It deletes any functions inside the object"
        ],
        "correctAnswer": 1,
        "explanation": "Spread ({...obj}) clones the top level. If user has a nested address: { city: 'Tokyo' }, both the copy and original still share the same nested address object.",
        "hint": "Shallow means only 1 layer deep.",
        "hintCostXP": 5
      },
      {
        "id": "js13-q3",
        "type": "multiple_choice",
        "title": "Native Deep Cloning",
        "prompt": "Which modern built-in JavaScript function creates a true deep clone of an object with nested data?",
        "options": [
          "Object.assign()",
          "structuredClone()",
          "Object.freeze()",
          "JSON.copy()"
        ],
        "correctAnswer": 1,
        "explanation": "structuredClone() is the standard modern JavaScript API for deep-cloning objects, including nested objects, arrays, Dates, and Sets.",
        "hint": "It is a native global function with 'clone' in its name.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js14",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js14-destructuring",
    "lessonCode": "JS-14",
    "lessonTitle": "Destructuring: Unpacking Objects and Arrays Cleanly",
    "description": "Assess your skill with object extraction, renaming, default values, and array destructuring.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js14-q1",
        "type": "code_output",
        "title": "Object Destructuring with Defaults",
        "prompt": "What will be printed?",
        "codeSnippet": "const user = { name: \"Alex\" };\nconst { name, role = \"guest\" } = user;\nconsole.log(name + \" is a \" + role);",
        "language": "javascript",
        "options": [
          "'Alex is a guest'",
          "'Alex is a undefined'",
          "'guest is a Alex'",
          "ReferenceError"
        ],
        "correctAnswer": 0,
        "explanation": "name is extracted from user ('Alex'). role is not in user, so it takes the default value 'guest'.",
        "hint": "Default values kick in when the property is undefined.",
        "hintCostXP": 5
      },
      {
        "id": "js14-q2",
        "type": "multiple_choice",
        "title": "Renaming in Destructuring",
        "prompt": "How do you rename a property 'id' to 'userId' while destructuring an object?",
        "options": [
          "const { id as userId } = obj;",
          "const { id: userId } = obj;",
          "const { id -> userId } = obj;",
          "const { userId = id } = obj;"
        ],
        "correctAnswer": 1,
        "explanation": "In object destructuring, the colon syntax { sourceProperty: newVariableName } extracts sourceProperty and assigns it to newVariableName.",
        "hint": "Use colon (:), like { id: userId }.",
        "hintCostXP": 5
      },
      {
        "id": "js14-q3",
        "type": "code_output",
        "title": "Array Destructuring Skipping Items",
        "prompt": "What will this output?",
        "codeSnippet": "const coords = [10, 20, 30];\nconst [x, , z] = coords;\nconsole.log(x + \",\" + z);",
        "language": "javascript",
        "options": [
          "'10,20'",
          "'10,30'",
          "'20,30'",
          "'10,undefined'"
        ],
        "correctAnswer": 1,
        "explanation": "Leaving an empty space between commas [x, , z] skips the second item (20), assigning x=10 and z=30.",
        "hint": "An empty comma slot skips that position in array destructuring.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js15",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js15-spread-and-rest-operators",
    "lessonCode": "JS-15",
    "lessonTitle": "Spread & Rest Operators: Spreading Items vs Gathering Arguments",
    "description": "Understand the twin roles of the three dots (...): Rest parameters and Spread syntax.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js15-q1",
        "type": "multiple_choice",
        "title": "Rest vs Spread Purpose",
        "prompt": "What is the key difference between Rest parameters and the Spread operator?",
        "options": [
          "Rest gathers multiple values into a single array; Spread unpacks an array into individual values",
          "Rest is for strings; Spread is for numbers",
          "Rest only works in React; Spread is only in Node.js",
          "They are identical synonyms with no behavioral differences"
        ],
        "correctAnswer": 0,
        "explanation": "Rest (...args in a function parameter) gathers multiple arguments into one array. Spread (...arr in a function call or literal) expands an array into individual elements.",
        "hint": "Rest gathers; Spread unpacks.",
        "hintCostXP": 5
      },
      {
        "id": "js15-q2",
        "type": "code_output",
        "title": "Object Spread Merging",
        "prompt": "What is logged when merging objects with spread?",
        "codeSnippet": "const defaults = { theme: \"light\", zoom: 100 };\nconst userPrefs = { theme: \"dark\" };\nconst config = { ...defaults, ...userPrefs };\nconsole.log(config.theme + \" | \" + config.zoom);",
        "language": "javascript",
        "options": [
          "'dark | 100'",
          "'light | 100'",
          "'dark | undefined'",
          "SyntaxError"
        ],
        "correctAnswer": 0,
        "explanation": "Properties spread later override earlier properties with the same name. userPrefs.theme ('dark') overrides defaults.theme ('light').",
        "hint": "Later objects in the spread override earlier keys.",
        "hintCostXP": 5
      },
      {
        "id": "js15-q3",
        "type": "multiple_choice",
        "title": "Rest Parameter Position",
        "prompt": "Where must the Rest parameter (...rest) be placed in a function's parameter list?",
        "options": [
          "As the very first parameter",
          "As the very last parameter",
          "Anywhere in the parameter list",
          "Functions can have multiple rest parameters"
        ],
        "correctAnswer": 1,
        "explanation": "A rest parameter must be the last parameter in the function signature because it collects all remaining arguments.",
        "hint": "It gathers the 'rest' of the arguments, so nothing can come after it.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js16",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js16-optional-chaining-and-nullish-coalescing",
    "lessonCode": "JS-16",
    "lessonTitle": "Optional Chaining & Nullish Coalescing: Defensive Coding with ?. and ??",
    "description": "Verify your mastery of safe property navigation (?.) and precise null/undefined fallbacks (??).",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js16-q1",
        "type": "multiple_choice",
        "title": "Optional Chaining (?.)",
        "prompt": "What does user?.address?.city return if user.address is null or undefined?",
        "options": [
          "It throws a TypeError: Cannot read property 'city' of undefined",
          "undefined (without throwing an error)",
          "null",
          "false"
        ],
        "correctAnswer": 1,
        "explanation": "Optional chaining (?.) short-circuits and safely returns undefined as soon as any part of the chain is null or undefined, preventing runtime crashes.",
        "hint": "It safely returns undefined instead of throwing a crash.",
        "hintCostXP": 5
      },
      {
        "id": "js16-q2",
        "type": "code_output",
        "title": "Nullish Coalescing (??) vs Logical OR (||)",
        "prompt": "What will this code log to the console?",
        "codeSnippet": "const score = 0;\nconst res1 = score || 10;\nconst res2 = score ?? 10;\nconsole.log(res1 + \" | \" + res2);",
        "language": "javascript",
        "options": [
          "'10 | 0'",
          "'0 | 0'",
          "'10 | 10'",
          "'0 | 10'"
        ],
        "correctAnswer": 0,
        "explanation": "Logical OR (||) treats 0 as falsy, so it falls back to 10. Nullish coalescing (??) only falls back on null or undefined, preserving the valid value 0.",
        "hint": "0 is a valid number, but it is falsy in boolean expressions.",
        "hintCostXP": 5
      },
      {
        "id": "js16-q3",
        "type": "multiple_choice",
        "title": "Optional Function Calling",
        "prompt": "How do you safely call a callback function that might not have been provided?",
        "options": [
          "callback?()",
          "callback?.()",
          "callback!().",
          "call(callback)"
        ],
        "correctAnswer": 1,
        "explanation": "callback?.() checks if callback is null or undefined before attempting to call it, preventing 'is not a function' errors.",
        "hint": "Use ?. before the opening parenthesis: fn?.()",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js17",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js17-the-this-keyword",
    "lessonCode": "JS-17",
    "lessonTitle": "The this Keyword: Who Called Me?",
    "description": "Check your understanding of the 'this' keyword: method calls, arrow functions, and how 'this' gets its value.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js17-q1",
        "type": "code_output",
        "title": "Method Call Rule",
        "prompt": "Predict what will be logged when this method is called:",
        "codeSnippet": "const robot = {\n  model: \"T-800\",\n  identify() {\n    return \"Model: \" + this.model;\n  }\n};\nconsole.log(robot.identify());",
        "language": "javascript",
        "options": [
          "'Model: T-800'",
          "'Model: undefined'",
          "TypeError: cannot read property model of undefined",
          "'Model: Object'"
        ],
        "correctAnswer": 0,
        "explanation": "Because robot is immediately to the left of the dot at call time (robot.identify()), 'this' points directly to the robot object.",
        "hint": "Look immediately to the left of the dot when the function is called.",
        "hintCostXP": 5
      },
      {
        "id": "js17-q2",
        "type": "multiple_choice",
        "title": "Arrow functions and this",
        "prompt": "Why should you avoid using Arrow Functions for object methods?",
        "options": [
          "Arrow functions execute too slowly",
          "Arrow functions do not have their own 'this'; they borrow 'this' from the outer code where they were created",
          "Arrow functions cannot return strings",
          "Arrow functions can only be called once"
        ],
        "correctAnswer": 1,
        "explanation": "Arrow functions do not create their own 'this'. When used as an object method, 'this' refers to the outer scope (e.g., window or module exports) rather than the object instance.",
        "hint": "Arrow functions borrow 'this' directly from the code around them.",
        "hintCostXP": 5
      },
      {
        "id": "js17-q3",
        "type": "code_output",
        "title": "Explicit Binding with call",
        "prompt": "What will this explicit binding snippet log?",
        "codeSnippet": "function greet() {\n  return \"Hello, \" + this.name;\n}\nconst user = { name: \"Aria\" };\nconsole.log(greet.call(user));",
        "language": "javascript",
        "options": [
          "'Hello, Aria'",
          "'Hello, undefined'",
          "TypeError: greet is not a function",
          "'Hello, user'"
        ],
        "correctAnswer": 0,
        "explanation": ".call(user) executes the function immediately, explicitly setting 'this' to the user object.",
        "hint": ".call() binds 'this' to the first argument and invokes immediately.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js18",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js18-prototypes-and-prototype-chain",
    "lessonCode": "JS-18",
    "lessonTitle": "Prototypes & Inheritance: How JavaScript Shares Methods",
    "description": "Test your understanding of object prototypes, method sharing, and looking up properties.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js18-q1",
        "type": "multiple_choice",
        "title": "Object Prototypes",
        "prompt": "What happens when you access a property on an object that does NOT exist on that object?",
        "options": [
          "JavaScript immediately throws a PropertyNotFoundError",
          "JavaScript looks up the prototype chain to see if the property exists on the object's prototype",
          "JavaScript creates the property and sets it to null",
          "The object is deleted from memory"
        ],
        "correctAnswer": 1,
        "explanation": "If JavaScript cannot find a property directly on an object, it automatically looks at the object's prototype to find it. This lets multiple objects share the same helper methods.",
        "hint": "It delegates the lookup to the object's prototype.",
        "hintCostXP": 5
      },
      {
        "id": "js18-q2",
        "type": "code_output",
        "title": "Object.create Prototype Link",
        "prompt": "What is printed by this prototype delegation snippet?",
        "codeSnippet": "const parent = { role: \"standard\", greet() { return \"Hi\"; } };\nconst child = Object.create(parent);\nchild.role = \"super\";\nconsole.log(child.role + \" | \" + child.greet());",
        "language": "javascript",
        "options": [
          "'super | Hi'",
          "'standard | Hi'",
          "'super | undefined'",
          "TypeError"
        ],
        "correctAnswer": 0,
        "explanation": "child has its own role ('super'). When child.greet() is called, greet is not on child directly, so it delegates up to parent and calls parent.greet(), returning 'Hi'.",
        "hint": "child overrides role, but borrows greet from parent.",
        "hintCostXP": 5
      },
      {
        "id": "js18-q3",
        "type": "multiple_choice",
        "title": "hasOwnProperty",
        "prompt": "How can you verify whether a property exists directly on an object rather than on its prototype chain?",
        "options": [
          "Object.hasOwn(obj, prop) or obj.hasOwnProperty(prop)",
          "prop in obj",
          "obj[prop] !== undefined",
          "typeof obj.prop === 'direct'"
        ],
        "correctAnswer": 0,
        "explanation": "If JavaScript cannot find a property directly on an object, it automatically looks at the object's prototype to find it. This lets multiple objects share the same helper methods.",
        "hint": "Look for 'hasOwn' or 'hasOwnProperty'.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js19",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js19-classes-extends-and-super",
    "lessonCode": "JS-19",
    "lessonTitle": "ES6 Classes: Object-Oriented Blueprints, extends & super()",
    "description": "Test your understanding of modern JavaScript classes, constructors, and using extends and super().",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js19-q1",
        "type": "multiple_choice",
        "title": "super() in Derived Classes",
        "prompt": "In a subclass constructor that uses 'extends', why must you call super() before accessing 'this'?",
        "options": [
          "super() is optional and only recommended for logging",
          "super() calls the parent constructor to initialize the instance before 'this' can be accessed",
          "super() converts the class to an arrow function",
          "super() binds event listeners automatically"
        ],
        "correctAnswer": 1,
        "explanation": "In JavaScript, derived class instances are created by the parent constructor. Calling super() runs the parent constructor; accessing 'this' before super() throws a ReferenceError.",
        "hint": "The parent constructor must initialize the object before the child can use 'this'.",
        "hintCostXP": 5
      },
      {
        "id": "js19-q2",
        "type": "code_output",
        "title": "Method Overriding with super",
        "prompt": "What will this class hierarchy log?",
        "codeSnippet": "class Vehicle {\n  start() { return \"Engine on\"; }\n}\nclass Car extends Vehicle {\n  start() { return super.start() + \", Seatbelt buckled\"; }\n}\nconst myCar = new Car();\nconsole.log(myCar.start());",
        "language": "javascript",
        "options": [
          "'Engine on, Seatbelt buckled'",
          "'Engine on'",
          "'Seatbelt buckled'",
          "TypeError: super.start is not a function"
        ],
        "correctAnswer": 0,
        "explanation": "Car overrides start(), but calls super.start() to reuse the parent's logic before adding ', Seatbelt buckled'.",
        "hint": "super.methodName() invokes the parent class's version of that method.",
        "hintCostXP": 5
      },
      {
        "id": "js19-q3",
        "type": "multiple_choice",
        "title": "Classes under the Hood",
        "prompt": "What is an ES6 class under the hood in JavaScript?",
        "options": [
          "A completely separate memory architecture unrelated to prototypes",
          "A cleaner, modern way to create objects using JavaScript's prototype system under the hood",
          "A compiled C++ binary structure",
          "A plain JSON object"
        ],
        "correctAnswer": 1,
        "explanation": "ES6 classes provide a cleaner, more readable syntax, but under the hood they still create standard constructor functions and prototype chains.",
        "hint": "Classes provide a cleaner syntax over JavaScript prototypes.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js20",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js20-synchronous-vs-asynchronous",
    "lessonCode": "JS-20",
    "lessonTitle": "Async JavaScript: Blocking vs Non-Blocking Code",
    "description": "Test your understanding of why slow tasks run in the background with setTimeout instead of freezing your page.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js20-q1",
        "type": "multiple_choice",
        "title": "Blocking Code",
        "prompt": "What happens in a browser tab if a synchronous function runs a heavy calculation for 10 seconds?",
        "options": [
          "The browser automatically moves it to another thread and UI stays responsive",
          "The entire page freezes, buttons stop responding, and animations halt because the main thread is blocked",
          "The calculation is paused and rescheduled for night time",
          "The browser restarts immediately"
        ],
        "correctAnswer": 1,
        "explanation": "Because JavaScript's main thread runs both your script and the UI rendering loop, heavy synchronous work blocks all user interactions and rendering.",
        "hint": "Single thread means only one task can execute on the main thread at a time.",
        "hintCostXP": 5
      },
      {
        "id": "js20-q2",
        "type": "code_output",
        "title": "setTimeout with 0 Delay",
        "prompt": "In what order are the numbers logged?",
        "codeSnippet": "console.log(1);\nsetTimeout(() => console.log(2), 0);\nconsole.log(3);",
        "language": "javascript",
        "options": [
          "1, 2, 3",
          "1, 3, 2",
          "2, 1, 3",
          "3, 1, 2"
        ],
        "correctAnswer": 1,
        "explanation": "1 logs first. setTimeout hands the timer to the browser to wait in the background. 3 logs next. When the timer finishes, 2 logs last.",
        "hint": "Synchronous code on the call stack always runs before task queue callbacks.",
        "hintCostXP": 5
      },
      {
        "id": "js20-q3",
        "type": "multiple_choice",
        "title": "Web APIs Role",
        "prompt": "Where do timers (setTimeout) and network calls (fetch) actually wait while your JavaScript code continues running?",
        "options": [
          "Inside the Call Stack",
          "In the browser/runtime Web APIs environment outside the JavaScript engine thread",
          "In the CPU register",
          "In the HTML document"
        ],
        "correctAnswer": 1,
        "explanation": "The browser's host environment (Web APIs in browsers, libuv in Node.js) handles waiting for timers and network packets in background threads without blocking JavaScript.",
        "hint": "The host runtime provides background threads for waiting operations.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js21",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js21-promises-and-chaining",
    "lessonCode": "JS-21",
    "lessonTitle": "Promises: Managing Future Values with .then() & .catch()",
    "description": "Test your understanding of Promises: pending, fulfilled, and rejected states, and chaining with .then() and .catch().",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js21-q1",
        "type": "code_output",
        "title": "Promise .then Chaining",
        "prompt": "What will be printed to the console by this Promise chain?",
        "codeSnippet": "Promise.resolve(5)\n  .then(val => val * 2)\n  .then(val => val + 3)\n  .then(val => console.log(val));",
        "language": "javascript",
        "options": [
          "13",
          "10",
          "5",
          "NaN"
        ],
        "correctAnswer": 0,
        "explanation": "5 is resolved; the first .then multiplies by 2 (10); the second .then adds 3 (13); the third logs 13.",
        "hint": "Follow the value through each step of the pipeline: 5 -> *2 -> +3.",
        "hintCostXP": 5
      },
      {
        "id": "js21-q2",
        "type": "multiple_choice",
        "title": "Handling Errors in Promise Chains",
        "prompt": "Where does execution jump if an error is thrown inside the first .then() of a Promise chain?",
        "options": [
          "It ignores the error and continues to the next .then() with null",
          "It skips all subsequent .then() callbacks and jumps directly to the nearest .catch() handler",
          "It restarts the entire script from line 1",
          "It pauses execution for 5 seconds and retries"
        ],
        "correctAnswer": 1,
        "explanation": "When an exception occurs or a promise rejects, JavaScript skips remaining .then() handlers until it finds the nearest .catch() handler in the chain.",
        "hint": ".catch() captures errors thrown anywhere above it in the chain.",
        "hintCostXP": 5
      },
      {
        "id": "js21-q3",
        "type": "code_output",
        "title": "Promise.all Behavior",
        "prompt": "What will Promise.all log when running these tasks together?",
        "codeSnippet": "const p1 = Promise.resolve(\"A\");\nconst p2 = Promise.resolve(\"B\");\nPromise.all([p1, p2]).then(results => console.log(results.join(\"-\")));",
        "language": "javascript",
        "options": [
          "'A-B'",
          "'AB'",
          "'A'",
          "'undefined-undefined'"
        ],
        "correctAnswer": 0,
        "explanation": "Promise.all waits for all promises in the array to resolve and delivers their results as an array ['A', 'B']. .join('-') outputs 'A-B'.",
        "hint": "Promise.all delivers an array of all resolved values.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js22",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js22-async-await",
    "lessonCode": "JS-22",
    "lessonTitle": "Async/Await: Writing Asynchronous Code That Reads Like Synchronous Code",
    "description": "Verify your ability to use async/await, handle errors with try/catch, and avoid sequential waterfalls.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js22-q1",
        "type": "multiple_choice",
        "title": "Async Function Return Value",
        "prompt": "What does an 'async' function ALWAYS return, even if you return a plain value like return 42?",
        "options": [
          "A number (42)",
          "A Promise that resolves to that value",
          "A callback function",
          "undefined"
        ],
        "correctAnswer": 1,
        "explanation": "Every async function automatically wraps its return value in a Promise (e.g. Promise.resolve(42)).",
        "hint": "Async functions always return Promises.",
        "hintCostXP": 5
      },
      {
        "id": "js22-q2",
        "type": "multiple_choice",
        "title": "Parallel Execution with Promise.all",
        "prompt": "If you need to fetch user, products, and orders at the same time and none depend on each other, how should you execute them?",
        "options": [
          "await each one sequentially: await getUser(); await getProducts(); await getOrders();",
          "Run them at the same time with Promise.all([getUser(), getProducts(), getOrders()])",
          "Create a while loop that waits for all three",
          "Use three separate script tags"
        ],
        "correctAnswer": 1,
        "explanation": "Awaiting them one by one creates an async waterfall where each request waits for the previous one. Promise.all initiates all three simultaneously.",
        "hint": "Promise.all fires independent asynchronous tasks in parallel.",
        "hintCostXP": 5
      },
      {
        "id": "js22-q3",
        "type": "code_output",
        "title": "Error Catching in async/await",
        "prompt": "What will this async function print?",
        "codeSnippet": "async function test() {\n  try {\n    await Promise.reject(new Error(\"Network timeout\"));\n    console.log(\"Success!\");\n  } catch (err) {\n    console.log(\"Caught: \" + err.message);\n  }\n}\ntest();",
        "language": "javascript",
        "options": [
          "'Success!'",
          "'Caught: Network timeout'",
          "Uncaught Promise Rejection error",
          "Nothing is printed"
        ],
        "correctAnswer": 1,
        "explanation": "awaiting a rejected promise throws an exception inside the async function, jumping directly into the catch block.",
        "hint": "await unwraps rejections as standard thrown exceptions.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js23",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js23-the-event-loop",
    "lessonCode": "JS-23",
    "lessonTitle": "The Event Loop: Call Stack & Task Queues",
    "description": "Understand how JavaScript runs code on the Call Stack and handles background tasks with microtasks (Promises) and macrotasks (Timers).",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js23-q1",
        "type": "code_output",
        "title": "Microtask vs Macrotask Order",
        "prompt": "In what exact order will the numbers 1, 2, 3, 4 be logged to the console?",
        "codeSnippet": "console.log(1);\n\nsetTimeout(() => {\n  console.log(4);\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log(3);\n});\n\nconsole.log(2);",
        "language": "javascript",
        "options": [
          "1, 2, 3, 4",
          "1, 4, 3, 2",
          "1, 2, 4, 3",
          "3, 1, 2, 4"
        ],
        "correctAnswer": 0,
        "explanation": "1. Synchronous code on the Call Stack runs first: prints 1, then 2.\n2. When the Call Stack empties, the Microtask Queue drains: prints 3.\n3. The Event Loop advances to the Macrotask Queue: prints 4.\nFinal order: 1, 2, 3, 4.",
        "hint": "Synchronous first -> Microtasks (Promises) second -> Macrotasks (setTimeout) third.",
        "hintCostXP": 5
      },
      {
        "id": "js23-q2",
        "type": "multiple_choice",
        "title": "Microtask Queue Drain Rule",
        "prompt": "When does the Event Loop check and process the Macrotask Queue (timers and I/O)?",
        "options": [
          "Only after the Call Stack is empty AND the Microtask Queue is completely drained",
          "Simultaneously on a separate background thread",
          "Before executing any synchronous functions",
          "Every 100 milliseconds regardless of other tasks"
        ],
        "correctAnswer": 0,
        "explanation": "The engine never advances to the next Macrotask until the Call Stack is empty and all pending Microtasks (promises) have completely finished running.",
        "hint": "Microtasks have VIP priority over Macrotasks.",
        "hintCostXP": 5
      },
      {
        "id": "js23-q3",
        "type": "code_output",
        "title": "Zero-Millisecond Timeout",
        "prompt": "What does setTimeout(fn, 0) do in JavaScript?",
        "codeSnippet": "console.log(\"A\");\nsetTimeout(() => console.log(\"C\"), 0);\nconsole.log(\"B\");",
        "language": "javascript",
        "options": [
          "Logs A, B, C",
          "Logs A, C, B",
          "Logs C, A, B",
          "Throws an error because delay cannot be zero"
        ],
        "correctAnswer": 0,
        "explanation": "Code on the Call Stack runs first. When it clears, microtasks (like Promises) run next before any macrotasks (like setTimeout).",
        "hint": "Timers always wait for the Call Stack to empty.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js24",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js24-error-handling",
    "lessonCode": "JS-24",
    "lessonTitle": "Error Handling: Defending Against Crashes with try, catch & finally",
    "description": "Test your skills with structured error handling, finally blocks, and throwing custom errors.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js24-q1",
        "type": "code_output",
        "title": "The finally Block",
        "prompt": "What is logged by this code with a finally block?",
        "codeSnippet": "let log = \"\";\ntry {\n  log += \"1\";\n  throw new Error(\"Oops\");\n} catch {\n  log += \"2\";\n} finally {\n  log += \"3\";\n}\nconsole.log(log);",
        "language": "javascript",
        "options": [
          "'123'",
          "'12'",
          "'13'",
          "'23'"
        ],
        "correctAnswer": 0,
        "explanation": "1 is added. The error is thrown and caught, adding 2. The finally block ALWAYS runs regardless of whether an error occurred, adding 3. Result: '123'.",
        "hint": "The finally block executes no matter what happens in try or catch.",
        "hintCostXP": 5
      },
      {
        "id": "js24-q2",
        "type": "multiple_choice",
        "title": "Throwing Custom Errors",
        "prompt": "What is the best practice when throwing an error in JavaScript?",
        "options": [
          "throw \"Something broke\"",
          "throw new Error(\"Something broke\")",
          "throw 404",
          "throw false"
        ],
        "correctAnswer": 1,
        "explanation": "Throwing an instance of Error (or a subclass) captures the stack trace, filename, and line number where the error occurred, making debugging much easier.",
        "hint": "Error objects contain valuable stack traces.",
        "hintCostXP": 5
      },
      {
        "id": "js24-q3",
        "type": "multiple_choice",
        "title": "Swallowed Errors Anti-Pattern",
        "prompt": "Why is an empty catch block (try { ... } catch (e) {}) considered a dangerous anti-pattern?",
        "options": [
          "It causes JavaScript to run out of memory",
          "It silently swallows errors, hiding crashes and making bugs almost impossible to diagnose",
          "It makes the page reload automatically",
          "Catch blocks must always contain a return statement"
        ],
        "correctAnswer": 1,
        "explanation": "Swallowing errors hides failures without logging them. When something breaks, your application behaves unpredictably and there are zero logs to explain why.",
        "hint": "Always log or handle errors so you know when things go wrong.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js25",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js25-es-modules",
    "lessonCode": "JS-25",
    "lessonTitle": "ES Modules: Organizing Code with import, export & Scope Boundaries",
    "description": "Evaluate your understanding of ES Modules, named exports vs default exports, and module scope.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js25-q1",
        "type": "multiple_choice",
        "title": "Named vs Default Exports",
        "prompt": "How many default exports can a single JavaScript module file have?",
        "options": [
          "As many as needed",
          "At most one",
          "Exactly two",
          "Zero, default exports are deprecated"
        ],
        "correctAnswer": 1,
        "explanation": "A module can have multiple named exports, but at most ONE default export (export default ...).",
        "hint": "Think: each file has only one 'default' thing.",
        "hintCostXP": 5
      },
      {
        "id": "js25-q2",
        "type": "multiple_choice",
        "title": "Importing Named Exports",
        "prompt": "Which syntax imports a named export calculateTax from './math.js'?",
        "options": [
          "import calculateTax from './math.js'",
          "import { calculateTax } from './math.js'",
          "require('./math.js').calculateTax",
          "import * as calculateTax from './math.js'"
        ],
        "correctAnswer": 1,
        "explanation": "Named exports must be imported using curly braces: import { calculateTax } from './math.js'. Importing without curly braces imports the default export.",
        "hint": "Named imports use curly braces: import { ... } from '...'",
        "hintCostXP": 5
      },
      {
        "id": "js25-q3",
        "type": "multiple_choice",
        "title": "Module Scope",
        "prompt": "If you declare a variable const API_KEY = 'secret' at the top level of an ES module, is it accessible from other files automatically?",
        "options": [
          "Yes, all top-level variables are automatically global",
          "No, top-level variables in an ES module are scoped to that file unless explicitly exported",
          "Yes, but only in the same folder",
          "Only in Node.js, not in browsers"
        ],
        "correctAnswer": 1,
        "explanation": "ES Modules have their own module scope. Variables declared inside a module are private to that file unless exported with the export keyword.",
        "hint": "Modules prevent global namespace pollution by keeping everything private by default.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js26",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js26-working-with-json",
    "lessonCode": "JS-26",
    "lessonTitle": "Working with JSON: Serialization, Parsing & API Data Transfer",
    "description": "Check your knowledge of JSON format rules, JSON.stringify, and safe JSON.parse.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js26-q1",
        "type": "multiple_choice",
        "title": "JSON Quotes Requirement",
        "prompt": "In valid JSON format, how must keys and string values be quoted?",
        "options": [
          "With single quotes ('key': 'value')",
          "With double quotes (\"key\": \"value\")",
          "Keys must have no quotes at all",
          "Any quotes or backticks are valid"
        ],
        "correctAnswer": 1,
        "explanation": "JSON specification strictly requires double quotes (\"...\") for both keys and string values. Single quotes cause a SyntaxError during JSON.parse.",
        "hint": "JSON strictly forbids single quotes.",
        "hintCostXP": 5
      },
      {
        "id": "js26-q2",
        "type": "code_output",
        "title": "Stripped Values in JSON.stringify",
        "prompt": "What happens to properties with value 'undefined' when serialized with JSON.stringify?",
        "codeSnippet": "const user = { name: \"Maya\", role: undefined };\nconst json = JSON.stringify(user);\nconsole.log(json);",
        "language": "javascript",
        "options": [
          "'{\"name\":\"Maya\",\"role\":undefined}'",
          "'{\"name\":\"Maya\",\"role\":null}'",
          "'{\"name\":\"Maya\"}'",
          "TypeError: Cannot stringify undefined"
        ],
        "correctAnswer": 2,
        "explanation": "JSON has no representation for undefined (or functions/symbols). JSON.stringify strips these properties from objects entirely.",
        "hint": "undefined is omitted from the resulting JSON string.",
        "hintCostXP": 5
      },
      {
        "id": "js26-q3",
        "type": "multiple_choice",
        "title": "Guarding JSON.parse",
        "prompt": "Why should you always wrap JSON.parse(incomingString) inside a try/catch block?",
        "options": [
          "JSON.parse runs in the background and returns a Promise",
          "Malformed or corrupted JSON strings will throw a fatal SyntaxError that crashes the application if uncaught",
          "JSON.parse deletes original objects",
          "try/catch speeds up parsing by 50%"
        ],
        "correctAnswer": 1,
        "explanation": "If the input string is not valid JSON (e.g., truncated network payload or HTML error page), JSON.parse throws a SyntaxError. try/catch protects your app from crashing.",
        "hint": "Invalid JSON throws an exception immediately.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js27",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js27-the-fetch-api",
    "lessonCode": "JS-27",
    "lessonTitle": "The Fetch API: Making Network Requests & Consuming REST APIs",
    "description": "Verify your ability to send HTTP requests, check res.ok, and parse responses.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js27-q1",
        "type": "multiple_choice",
        "title": "Fetch Rejection Behavior",
        "prompt": "When does the Promise returned by fetch() REJECT?",
        "options": [
          "Whenever the server returns HTTP 404 Not Found or HTTP 500 Server Error",
          "Only when there is a network failure or DNS lookup failure that prevented the request from completing",
          "Whenever the JSON response is empty",
          "fetch() never rejects under any circumstances"
        ],
        "correctAnswer": 1,
        "explanation": "fetch() only rejects on network errors (e.g. no internet connection, blocked CORS, DNS failure). It resolves normally even on 404 or 500 error pages.",
        "hint": "HTTP error codes are still valid server responses, so fetch fulfills.",
        "hintCostXP": 5
      },
      {
        "id": "js27-q2",
        "type": "code_output",
        "title": "Checking response.ok",
        "prompt": "What does response.ok evaluate to when a request receives an HTTP 200 OK vs HTTP 404 Not Found?",
        "codeSnippet": "// If res1 is 200 and res2 is 404:\nconsole.log(res1.ok + \" | \" + res2.ok);",
        "language": "javascript",
        "options": [
          "'true | false'",
          "'true | true'",
          "'false | false'",
          "'200 | 404'"
        ],
        "correctAnswer": 0,
        "explanation": "response.ok is a boolean shorthand that is true for HTTP status codes in the 200-299 range, and false for all other statuses (like 404 or 500).",
        "hint": "res.ok is true only for successful 2xx status codes.",
        "hintCostXP": 5
      },
      {
        "id": "js27-q3",
        "type": "multiple_choice",
        "title": "Sending JSON with POST",
        "prompt": "When sending a POST request with fetch(), which header tells the server that the request body is JSON?",
        "options": [
          "'Accept': 'text/html'",
          "'Content-Type': 'application/json'",
          "'Authorization': 'Bearer JSON'",
          "'Encoding': 'utf-8'"
        ],
        "correctAnswer": 1,
        "explanation": "The header 'Content-Type': 'application/json' informs the server how to parse the incoming request body.",
        "hint": "Content-Type specifies the format of the payload.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js28",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js28-dom-essentials",
    "lessonCode": "JS-28",
    "lessonTitle": "Browser DOM Essentials: Selecting & Modifying Elements",
    "description": "Assess your ability to safely select and manipulate DOM elements, prevent XSS attacks, and manage dynamic CSS classes.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js28-q1",
        "type": "multiple_choice",
        "title": "Preventing XSS with textContent",
        "prompt": "Why should you use 'textContent' instead of 'innerHTML' when updating an element with user-provided text?",
        "options": [
          "'textContent' automatically escapes HTML tags, preventing Cross-Site Scripting (XSS) attacks",
          "'textContent' changes the font color to green automatically",
          "'innerHTML' has been deprecated in HTML5",
          "'textContent' only works with numeric values"
        ],
        "correctAnswer": 0,
        "explanation": "textContent treats input strictly as plain text, escaping HTML entities like '<script>' so malicious scripts cannot execute.",
        "hint": "Think about security and Cross-Site Scripting (XSS).",
        "hintCostXP": 5
      },
      {
        "id": "js28-q2",
        "type": "multiple_choice",
        "title": "querySelector Selector Syntax",
        "prompt": "Which method selects the FIRST element matching the CSS class 'highlight' on the page?",
        "options": [
          "document.querySelector('.highlight')",
          "document.getElementsByClassName('highlight')",
          "document.querySelectorAll('.highlight')",
          "document.selectElement('highlight')"
        ],
        "correctAnswer": 0,
        "explanation": "document.querySelector('.highlight') takes any standard CSS selector and returns the very first matching Element node, or null if no match exists.",
        "hint": "CSS class selectors use a dot (.), and querySelector returns the first match.",
        "hintCostXP": 5
      },
      {
        "id": "js28-q3",
        "type": "multiple_choice",
        "title": "classList API",
        "prompt": "Which classList method adds a CSS class if it is missing, or removes it if it is already present?",
        "options": [
          "element.classList.toggle('active')",
          "element.classList.switch('active')",
          "element.classList.flip('active')",
          "element.classList.change('active')"
        ],
        "correctAnswer": 0,
        "explanation": "element.classList.toggle('active') checks if the class exists: if present, it removes it; if absent, it adds it.",
        "hint": "The word means to flip a switch back and forth.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js29",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js29-events-and-delegation",
    "lessonCode": "JS-29",
    "lessonTitle": "Browser Events: Reacting to User Interaction & Event Delegation",
    "description": "Test your understanding of event listeners, event bubbling, and event delegation.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js29-q1",
        "type": "multiple_choice",
        "title": "Event Bubbling",
        "prompt": "What is 'event bubbling' in the browser?",
        "options": [
          "When an event is cancelled and never runs",
          "When an event happens on an element and travels upward through its parent elements like an air bubble in water",
          "When the browser reloads the entire page automatically",
          "When an event only works on mobile touchscreens"
        ],
        "correctAnswer": 1,
        "explanation": "Event bubbling means an event fires on the clicked element first, and then travels up through each parent element in the page.",
        "hint": "Think of air bubbles rising upward through water.",
        "hintCostXP": 5
      },
      {
        "id": "js29-q2",
        "type": "multiple_choice",
        "title": "Event Delegation Advantage",
        "prompt": "Why is event delegation useful when dealing with a list that has 1,000 dynamic items?",
        "options": [
          "It attaches 1,000 separate listeners so every item is independent",
          "It attaches a single listener to the parent element, saving memory and handling newly added items automatically",
          "It forces the browser to disable mouse clicks",
          "It prevents the user from scrolling the list"
        ],
        "correctAnswer": 1,
        "explanation": "Attaching one listener to the parent container is much more memory-efficient and automatically handles newly added child elements without having to attach new listeners.",
        "hint": "One listener on the parent instead of 1,000 listeners on children.",
        "hintCostXP": 5
      },
      {
        "id": "js29-q3",
        "type": "multiple_choice",
        "title": "event.target vs event.currentTarget",
        "prompt": "In an event listener handler, what is event.target?",
        "options": [
          "The element that currently has the addEventListener attached to it",
          "The actual element that was clicked or triggered the event",
          "The next element in the HTML document",
          "The browser window title"
        ],
        "correctAnswer": 1,
        "explanation": "event.target is the element that originated the event (e.g. the specific button clicked). event.currentTarget is the element listening to the event.",
        "hint": "target is the specific item that took the click.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js30",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js30-browser-storage-and-debugging",
    "lessonCode": "JS-30",
    "lessonTitle": "Browser Storage & Debugging: LocalStorage, SessionStorage & DevTools",
    "description": "Check your mastery of browser persistence, storage limitations, and DevTools debugging.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js30-q1",
        "type": "multiple_choice",
        "title": "localStorage vs sessionStorage",
        "prompt": "How does localStorage differ from sessionStorage?",
        "options": [
          "localStorage data persists even after closing and reopening the browser; sessionStorage is cleared when the tab closes",
          "sessionStorage stores up to 100GB; localStorage only stores 100 bytes",
          "localStorage can only store numbers; sessionStorage stores strings",
          "They have the exact same lifetime"
        ],
        "correctAnswer": 0,
        "explanation": "localStorage data has no expiration date and persists across restarts. sessionStorage is isolated to the specific browser tab and is cleared when that tab is closed.",
        "hint": "localStorage is permanent; sessionStorage lives only for that session tab.",
        "hintCostXP": 5
      },
      {
        "id": "js30-q2",
        "type": "code_output",
        "title": "Storing Objects in LocalStorage",
        "prompt": "What happens if you run localStorage.setItem('user', { name: 'Dan' }) without JSON.stringify?",
        "codeSnippet": "// What string does localStorage actually store?\nconsole.log(String({ name: \"Dan\" }));",
        "language": "javascript",
        "options": [
          "'{\"name\":\"Dan\"}'",
          "'[object Object]'",
          "SyntaxError",
          "null"
        ],
        "correctAnswer": 1,
        "explanation": "localStorage only stores strings. If you pass an object directly, JavaScript converts it using toString(), storing the useless string '[object Object]'. Always use JSON.stringify!",
        "hint": "Objects default to '[object Object]' when converted to strings.",
        "hintCostXP": 5
      },
      {
        "id": "js30-q3",
        "type": "multiple_choice",
        "title": "The debugger Statement",
        "prompt": "What does placing the 'debugger;' keyword inside your JavaScript code do when DevTools is open?",
        "options": [
          "It deletes all variables currently in memory",
          "It pauses script execution like a breakpoint so you can step through lines and inspect variables",
          "It prints the entire program to the printer",
          "It automatically fixes any syntax errors"
        ],
        "correctAnswer": 1,
        "explanation": "The debugger; statement acts as a code-defined breakpoint. If browser DevTools is open, execution pauses at that line, allowing you to inspect the call stack, scope, and variable values.",
        "hint": "It pauses execution like a breakpoint.",
        "hintCostXP": 5
      }
    ]
  }
];
