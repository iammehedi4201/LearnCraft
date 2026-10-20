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
    "lessonTitle": "How JavaScript Works: Running Code, The Console & Sequential Steps",
    "description": "Test your understanding of how JavaScript runs code line by line, using console.log() for output, and how expressions produce values.",
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
        "title": "Sequential Execution and Math Output",
        "prompt": "Predict the exact console output of this sequential code execution:",
        "codeSnippet": "console.log(\"Step A\");\nconsole.log(\"Sum:\", 10 + 5);\nconsole.log(\"Step B\");",
        "language": "javascript",
        "options": [
          "'Step A', 'Sum: 15', 'Step B'",
          "'Step A', 'Step B', 'Sum: 15'",
          "'Sum: 15', 'Step A', 'Step B'",
          "'Step A', 'Sum: 105', 'Step B'"
        ],
        "correctAnswer": 0,
        "explanation": "JavaScript runs line by line from top to bottom. Line 1 logs 'Step A', line 2 calculates 10 + 5 and logs 'Sum: 15', and line 3 logs 'Step B'.",
        "hint": "Follow the execution line by line and note that 10 + 5 is calculated first.",
        "hintCostXP": 5
      },
      {
        "id": "js01-q3",
        "type": "multiple_choice",
        "title": "Text in Quotes vs Unquoted Words",
        "prompt": "Why does console.log(\"Welcome\") work correctly, but console.log(Welcome) causes an error?",
        "options": [
          "Quotes tell JavaScript that the text inside is a plain text string; without quotes, JavaScript looks for a variable or command named Welcome that does not exist",
          "console.log only allows uppercase letters when words are unquoted",
          "Unquoted words are automatically erased before the program runs",
          "There is no difference; both lines run identically without any error"
        ],
        "correctAnswer": 0,
        "explanation": "Text must always be enclosed in quotes so JavaScript knows it is literal text (a string). Leaving off quotes causes JavaScript to search for a variable named Welcome, triggering a ReferenceError.",
        "hint": "Quotes signal to JavaScript that you want to display literal words.",
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
    "description": "Check your understanding of creating variables with const and let, preventing accidental reassignments, and identifying core data types.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js02-q1",
        "type": "multiple_choice",
        "title": "const vs let best practice",
        "prompt": "What is the recommended best practice when declaring variables in modern JavaScript?",
        "options": [
          "Default to const for values that stay constant, and use let only when a value needs to be reassigned",
          "Use var for everything because it is the newest keyword",
          "Always use let because const variables can never be read after creation",
          "Never use keywords when creating variables"
        ],
        "correctAnswer": 0,
        "explanation": "Using const by default makes code predictable and prevents accidental reassignment bugs. Use let only when a value genuinely needs reassignment (such as counters or scores).",
        "hint": "Values that cannot change by accident make your code safe and predictable.",
        "hintCostXP": 5
      },
      {
        "id": "js02-q2",
        "type": "code_output",
        "title": "Reassigning a const Variable",
        "prompt": "What happens when you run this code?",
        "codeSnippet": "const maxLives = 3;\nmaxLives = 5;\nconsole.log(maxLives);",
        "language": "javascript",
        "options": [
          "It throws a TypeError because a const variable cannot be reassigned",
          "It logs 5 to the console",
          "It logs 3 because the new assignment is silently ignored",
          "It logs undefined"
        ],
        "correctAnswer": 0,
        "explanation": "Variables declared with const are locked. Reassigning a new value throws a TypeError: Assignment to constant variable.",
        "hint": "Think about what the word 'constant' means.",
        "hintCostXP": 5
      },
      {
        "id": "js02-q3",
        "type": "code_output",
        "title": "typeof Core Primitives",
        "prompt": "What will this code log to the console?",
        "codeSnippet": "const playerName = \"Sam\";\nconst userScore = 100;\nconst isOnline = true;\nconsole.log(typeof playerName, typeof userScore, typeof isOnline);",
        "language": "javascript",
        "options": [
          "'string number boolean'",
          "'text int bool'",
          "'string int true'",
          "'word number flag'"
        ],
        "correctAnswer": 0,
        "explanation": "In JavaScript, text wrapped in quotes has type 'string', numbers have type 'number', and true/false values have type 'boolean'.",
        "hint": "JavaScript uses 'string', 'number', and 'boolean' for its core types.",
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
    "lessonTitle": "Operators, Comparisons & Type Conversion: The === Rule",
    "description": "Check your understanding of math operators, comparison checks, why === is safer than ==, and combining conditions with logic.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js03-q1",
        "type": "code_output",
        "title": "Strict vs Loose Equality",
        "prompt": "Predict the output of these two comparisons:",
        "codeSnippet": "console.log(5 === \"5\");\nconsole.log(5 === 5);",
        "language": "javascript",
        "options": [
          "false then true",
          "true then true",
          "false then false",
          "true then false"
        ],
        "correctAnswer": 0,
        "explanation": "Strict equality (===) checks both value and type. Because 5 is a number and '5' is a string, 5 === '5' is false. 5 === 5 compares two identical numbers, so it is true.",
        "hint": "Triple equals checks whether both the type and the value match exactly.",
        "hintCostXP": 5
      },
      {
        "id": "js03-q2",
        "type": "code_output",
        "title": "Number + String Behavior",
        "prompt": "What will this code print to the console?",
        "codeSnippet": "const count = 10;\nconst label = \" items\";\nconsole.log(count + label);",
        "language": "javascript",
        "options": [
          "'10 items'",
          "NaN",
          "'items 10'",
          "Throws a TypeError"
        ],
        "correctAnswer": 0,
        "explanation": "When the + operator is used between a number and a string, JavaScript converts the number to text and joins them together, resulting in '10 items'.",
        "hint": "The + operator joins text when at least one side is a string.",
        "hintCostXP": 5
      },
      {
        "id": "js03-q3",
        "type": "code_output",
        "title": "Logical AND (&&) Combination",
        "prompt": "What will this logical check output to the console?",
        "codeSnippet": "const userAge = 20;\nconst hasTicket = true;\nconst canEnter = userAge >= 18 && hasTicket;\nconsole.log(canEnter);",
        "language": "javascript",
        "options": [
          "true",
          "false",
          "undefined",
          "20"
        ],
        "correctAnswer": 0,
        "explanation": "userAge >= 18 evaluates to true, and hasTicket is true. Because both sides of && are true, canEnter is true.",
        "hint": "The && operator requires both sides to be true.",
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
        "type": "code_output",
        "title": "Chained if / else if Evaluation",
        "prompt": "What will this code log to the console?",
        "codeSnippet": "const score = 82;\nlet grade = \"\";\nif (score >= 90) {\n  grade = \"A\";\n} else if (score >= 80) {\n  grade = \"B\";\n} else {\n  grade = \"C\";\n}\nconsole.log(grade);",
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
        "codeSnippet": "let result = \"\";\nfor (let i = 1; i <= 3; i++) {\n  result += i + \" \";\n}\nconsole.log(result.trim());",
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
        "codeSnippet": "let sum = 0;\nfor (let i = 1; i <= 5; i++) {\n  if (i === 2) continue;\n  if (i === 4) break;\n  sum += i;\n}\nconsole.log(sum);",
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
        "codeSnippet": "function recordScore(points) {\n  const updated = points + 10;\n}\nconst scoreResult = recordScore(50);\nconsole.log(scoreResult);",
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
  },
  {
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
        "title": "Adder Function Factory",
        "prompt": "What will this closure factory calculate and output?",
        "codeSnippet": "function makeAdder(x) {\n  return function(y) {\n    return x + y;\n  };\n}\nconst addTen = makeAdder(10);\nconsole.log(addTen(5));",
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
        "codeSnippet": "function calculate(a, b, operation) {\n  return operation(a, b);\n}\nconst multiply = (x, y) => x * y;\nconsole.log(calculate(6, 4, multiply));",
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
  },
  {
    "id": "quiz-javascript-js10",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js10-arrays-and-indexing",
    "lessonCode": "JS-10",
    "lessonTitle": "Arrays & Indexing: Managing Ordered Lists",
    "description": "Evaluate your understanding of zero-based array indexing, array length, push, pop, and safe slicing.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js10-q1",
        "type": "multiple_choice",
        "title": "Zero-Based Indexing and Length",
        "prompt": "If an array contains 4 items (items.length === 4), what is the index of the very last item in that array?",
        "options": [
          "4",
          "3",
          "0",
          "undefined"
        ],
        "correctAnswer": 1,
        "explanation": "Because JavaScript arrays start counting indices at 0, the items sit at slots 0, 1, 2, and 3. The last item is always at index items.length - 1 (4 - 1 = 3).",
        "hint": "The 4 items are stored at slots 0, 1, 2, 3.",
        "hintCostXP": 5
      },
      {
        "id": "js10-q2",
        "type": "code_output",
        "title": "Array push and pop",
        "prompt": "What will this code print to the console?",
        "codeSnippet": "const tasks = [\"Write tests\", \"Fix bugs\"];\ntasks.push(\"Deploy app\");\nconst completed = tasks.pop();\nconsole.log(tasks.length + \" | \" + completed);",
        "language": "javascript",
        "options": [
          "'2 | Deploy app'",
          "'3 | Deploy app'",
          "'2 | Fix bugs'",
          "'3 | Write tests'"
        ],
        "correctAnswer": 0,
        "explanation": "tasks.push('Deploy app') adds a 3rd item. Then tasks.pop() removes and returns that last item ('Deploy app'), leaving 2 items in tasks.",
        "hint": "push adds to the end, pop removes and returns the last item.",
        "hintCostXP": 5
      },
      {
        "id": "js10-q3",
        "type": "multiple_choice",
        "title": "Safe Copying with slice()",
        "prompt": "What happens to the original array when you call const subset = original.slice(0, 2)?",
        "options": [
          "The first two items are deleted from the original array",
          "The original array remains completely untouched, and slice() returns a new array with the selected items",
          "The original array is converted into a string",
          "slice() modifies the original array in place"
        ],
        "correctAnswer": 1,
        "explanation": "array.slice(start, end) is non-destructive. It extracts a shallow copy of the requested elements into a fresh array without altering the original array.",
        "hint": "slice makes a safe copy; it does not cut items out of the original list.",
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
    "description": "Check your knowledge of transforming lists with map, selecting with filter, looking up items with find, and calculating totals with reduce.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js11-q1",
        "type": "code_output",
        "title": "Chaining filter and map",
        "prompt": "What will this chained array pipeline print?",
        "codeSnippet": "const numbers = [1, 2, 3, 4, 5];\nconst result = numbers\n  .filter(n => n % 2 === 0)\n  .map(n => n * 10);\nconsole.log(result);",
        "language": "javascript",
        "options": [
          "[20, 40]",
          "[10, 20, 30, 40, 50]",
          "[2, 4]",
          "[60]"
        ],
        "correctAnswer": 0,
        "explanation": "filter(n => n % 2 === 0) keeps only the even numbers [2, 4]. Then map(n => n * 10) multiplies each remaining number by 10, producing [20, 40].",
        "hint": "Filter for even numbers first, then multiply those numbers by 10.",
        "hintCostXP": 5
      },
      {
        "id": "js11-q2",
        "type": "multiple_choice",
        "title": "find() vs filter()",
        "prompt": "What is the key difference between array.find() and array.filter()?",
        "options": [
          "find() returns the first matching item directly (or undefined), whereas filter() returns an array of all matching items",
          "find() modifies the original array, while filter() does not",
          "filter() only works on numbers, while find() only works on strings",
          "There is no difference; they are identical aliases"
        ],
        "correctAnswer": 0,
        "explanation": "find() stops searching as soon as it finds the first element that satisfies the condition and returns that single item. filter() checks all elements and returns an array of matches.",
        "hint": "One returns a single element directly; the other returns an array.",
        "hintCostXP": 5
      },
      {
        "id": "js11-q3",
        "type": "code_output",
        "title": "Calculating totals with reduce",
        "prompt": "What number will this reduce accumulator calculate?",
        "codeSnippet": "const cart = [\n  { price: 10 },\n  { price: 25 },\n  { price: 15 }\n];\nconst total = cart.reduce((runningSum, item) => runningSum + item.price, 0);\nconsole.log(total);",
        "language": "javascript",
        "options": [
          "50",
          "25",
          "0",
          "NaN"
        ],
        "correctAnswer": 0,
        "explanation": "Starting with 0: 0 + 10 = 10, then 10 + 25 = 35, and finally 35 + 15 = 50. The final accumulated sum is 50.",
        "hint": "Add up the prices starting from initial value 0: 0 + 10 + 25 + 15.",
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
    "lessonTitle": "Objects & Methods: Key-Value Pairs & Behaviors",
    "description": "Test your understanding of object properties, dot notation vs bracket notation, object methods, and const object mutability.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js12-q1",
        "type": "multiple_choice",
        "title": "When to Use Bracket Notation",
        "prompt": "When MUST you use bracket notation (user[field]) instead of dot notation (user.field)?",
        "options": [
          "When the property name is stored inside a variable or contains spaces/hyphens",
          "Whenever the object has more than 3 properties",
          "Only when reading numbers from an object",
          "Dot notation is deprecated; bracket notation is always required"
        ],
        "correctAnswer": 0,
        "explanation": "Dot notation only works for fixed, valid JavaScript identifiers. If the property key is stored in a variable (e.g. const key = 'email') or has special characters, bracket notation is required.",
        "hint": "Think: user[variableKey] evaluates the variable.",
        "hintCostXP": 5
      },
      {
        "id": "js12-q2",
        "type": "code_output",
        "title": "Updating Properties in a const Object",
        "prompt": "What will this code print to the console?",
        "codeSnippet": "const product = { name: \"Desk\", price: 200 };\nproduct.price = 250;\nproduct[\"inStock\"] = true;\nconsole.log(product.price + \" | \" + product.inStock);",
        "language": "javascript",
        "options": [
          "'250 | true'",
          "'200 | undefined'",
          "TypeError: Assignment to constant variable",
          "'250 | undefined'"
        ],
        "correctAnswer": 0,
        "explanation": "Declaring an object with const prevents reassigning the variable product to a different object, but the internal properties can be freely updated or added.",
        "hint": "const locks the variable reference, not the properties inside.",
        "hintCostXP": 5
      },
      {
        "id": "js12-q3",
        "type": "multiple_choice",
        "title": "Inspecting Properties with Object.keys()",
        "prompt": "What does Object.keys(obj) return?",
        "options": [
          "An array containing all the property names (keys) of the object",
          "A single string with all keys separated by commas",
          "The number of properties in the object as a number",
          "A deep clone of the object"
        ],
        "correctAnswer": 0,
        "explanation": "Object.keys(obj) returns an array of strings representing all the enumerable property keys defined on the object.",
        "hint": "It returns an array of strings: the names of the keys.",
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
    "lessonTitle": "Object References & Copying: References, Shallow vs Deep Cloning",
    "description": "Check your grasp of memory references, the shared reference trap, shallow copy with spread, and native deep cloning with structuredClone.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js13-q1",
        "type": "code_output",
        "title": "The Shared Reference Trap",
        "prompt": "What will this code output to the console?",
        "codeSnippet": "const a = { count: 10 };\nconst b = a;\nb.count = 25;\nconsole.log(a.count);",
        "language": "javascript",
        "options": [
          "10",
          "25",
          "undefined",
          "NaN"
        ],
        "correctAnswer": 1,
        "explanation": "Assigning const b = a copies the memory reference (pointer), not the object. Both a and b point to the exact same object in memory, so modifying b.count modifies a.count.",
        "hint": "Both variables point to the exact same object in memory.",
        "hintCostXP": 5
      },
      {
        "id": "js13-q2",
        "type": "multiple_choice",
        "title": "Shallow Copy Limitations",
        "prompt": "Why is the spread operator ({ ...user }) considered a SHALLOW copy rather than a deep copy?",
        "options": [
          "It copies top-level properties into a new object, but any nested objects or arrays are still shared by reference",
          "It only copies the first property and ignores the rest",
          "It converts all numbers into strings",
          "It only works on arrays, not objects"
        ],
        "correctAnswer": 0,
        "explanation": "Spread ({ ...user }) creates a new outer object, but if user has nested properties (like user.address = { city: 'Paris' }), the nested object is still shared by memory reference.",
        "hint": "Shallow means only 1 layer deep.",
        "hintCostXP": 5
      },
      {
        "id": "js13-q3",
        "type": "multiple_choice",
        "title": "Native Deep Cloning with structuredClone",
        "prompt": "Which modern built-in JavaScript function creates a true deep clone of an object, including all nested objects and arrays?",
        "options": [
          "Object.assign()",
          "structuredClone()",
          "Object.freeze()",
          "JSON.clone()"
        ],
        "correctAnswer": 1,
        "explanation": "structuredClone() is the standard modern JavaScript function built into browsers and Node.js to create a complete, recursive deep clone of complex objects.",
        "hint": "It has 'clone' in its name and is a native global function.",
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
    "lessonTitle": "Destructuring: Unpacking Objects & Arrays with Ease",
    "description": "Assess your skill with object extraction, variable renaming with colons, fallback defaults, and array destructuring.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js14-q1",
        "type": "code_output",
        "title": "Object Destructuring with Defaults",
        "prompt": "What will this code print to the console?",
        "codeSnippet": "const user = { name: \"Alex\" };\nconst { name, role = \"guest\" } = user;\nconsole.log(name + \" is a \" + role);",
        "language": "javascript",
        "options": [
          "'Alex is a guest'",
          "'Alex is a undefined'",
          "'guest is a Alex'",
          "ReferenceError: role is not defined"
        ],
        "correctAnswer": 0,
        "explanation": "name is extracted from user ('Alex'). Because user has no role property, it takes the fallback default value 'guest'.",
        "hint": "Default values activate when the property is undefined.",
        "hintCostXP": 5
      },
      {
        "id": "js14-q2",
        "type": "multiple_choice",
        "title": "Renaming in Object Destructuring",
        "prompt": "How do you rename a property from 'id' to 'userId' while destructuring an object?",
        "options": [
          "const { id as userId } = obj;",
          "const { id: userId } = obj;",
          "const { id -> userId } = obj;",
          "const { userId = id } = obj;"
        ],
        "correctAnswer": 1,
        "explanation": "In JavaScript object destructuring, the colon syntax { sourceKey: newVariableName } extracts sourceKey and assigns it to newVariableName.",
        "hint": "Use colon (:), like { id: userId }.",
        "hintCostXP": 5
      },
      {
        "id": "js14-q3",
        "type": "code_output",
        "title": "Array Destructuring with Skipped Positions",
        "prompt": "What will this array destructuring code output?",
        "codeSnippet": "const coords = [10, 20, 30];\nconst [x, , z] = coords;\nconsole.log(x + \",\" + z);",
        "language": "javascript",
        "options": [
          "'10,20'",
          "'10,30'",
          "'20,30'",
          "'10,undefined'"
        ],
        "correctAnswer": 1,
        "explanation": "Leaving an empty space between commas [x, , z] skips the second element (20), assigning x=10 and z=30.",
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
    "lessonTitle": "Spread & Rest Operators: Expanding and Gathering (...)",
    "description": "Understand the twin roles of the three dots (...): Rest parameters gathering arguments and Spread expanding collections.",
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
          "Rest is only for strings; Spread is only for numbers",
          "Rest only works in React; Spread only works in Node.js",
          "They are identical synonyms with no behavioral differences"
        ],
        "correctAnswer": 0,
        "explanation": "Rest (...args in a function parameter) gathers multiple arguments into one array. Spread (...arr in a function call or array literal) expands an array into individual elements.",
        "hint": "Rest gathers items into an array; Spread unpacks an array into individual items.",
        "hintCostXP": 5
      },
      {
        "id": "js15-q2",
        "type": "code_output",
        "title": "Object Spread Merging Precedence",
        "prompt": "What is logged when merging objects with spread?",
        "codeSnippet": "const defaults = { theme: \"light\", zoom: 100 };\nconst userPrefs = { theme: \"dark\" };\nconst config = { ...defaults, ...userPrefs };\nconsole.log(config.theme + \" | \" + config.zoom);",
        "language": "javascript",
        "options": [
          "'dark | 100'",
          "'light | 100'",
          "'dark | undefined'",
          "SyntaxError: Duplicate property"
        ],
        "correctAnswer": 0,
        "explanation": "Properties spread further to the right overwrite earlier properties with the same name. userPrefs.theme ('dark') overrides defaults.theme ('light').",
        "hint": "Properties on the right win when merging objects with spread.",
        "hintCostXP": 5
      },
      {
        "id": "js15-q3",
        "type": "multiple_choice",
        "title": "Rest Parameter Placement Rule",
        "prompt": "Where must a Rest parameter (...rest) be placed in a function's parameter list?",
        "options": [
          "As the very first parameter",
          "As the very last parameter",
          "Anywhere in the parameter list",
          "A function can have multiple rest parameters"
        ],
        "correctAnswer": 1,
        "explanation": "A rest parameter gathers all remaining arguments, so it must always be the last parameter in the function declaration.",
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
    "lessonTitle": "Optional Chaining (?.) & Nullish Coalescing (??)",
    "description": "Verify your mastery of safe property navigation (?.) and precise null/undefined fallbacks (??) without false-alarm bugs.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js16-q1",
        "type": "multiple_choice",
        "title": "Optional Chaining Behavior",
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
        "title": "Optional Function Invocation",
        "prompt": "How do you safely call a callback function that might not have been provided?",
        "options": [
          "callback?()",
          "callback?.()",
          "callback!().",
          "call(callback)"
        ],
        "correctAnswer": 1,
        "explanation": "The syntax callback?.() checks if callback exists before executing it, cleanly skipping the call if callback is null or undefined.",
        "hint": "It uses question-mark dot parentheses: ?.",
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
    "description": "Check your understanding of the 'this' keyword: method calls, arrow functions, and how 'this' gets its value dynamically at call time.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js17-q1",
        "type": "code_output",
        "title": "The Dot Rule at Call Time",
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
        "title": "Arrow Functions and this",
        "prompt": "Why should you avoid using Arrow Functions for object methods?",
        "options": [
          "Arrow functions execute too slowly",
          "Arrow functions do not have their own 'this'; they borrow 'this' from the outer scope where they were created",
          "Arrow functions cannot return strings",
          "Arrow functions can only be called once"
        ],
        "correctAnswer": 1,
        "explanation": "Arrow functions do not create their own 'this'. When used as an object method, 'this' refers to the outer scope (e.g. window or module exports) rather than the object instance.",
        "hint": "Arrow functions borrow 'this' directly from the code around them.",
        "hintCostXP": 5
      },
      {
        "id": "js17-q3",
        "type": "code_output",
        "title": "Explicit Binding with .call()",
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
    "lessonTitle": "Prototypes & The Prototype Chain: Inheritance Under the Hood",
    "description": "Test your understanding of object prototypes, method delegation, and property lookup across the chain.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js18-q1",
        "type": "multiple_choice",
        "title": "Prototype Delegation Mechanism",
        "prompt": "What happens when you access a property on an object that does NOT exist directly on that object?",
        "options": [
          "JavaScript immediately throws a PropertyNotFoundError crash",
          "JavaScript looks up the prototype chain to see if the property exists on the object's prototype",
          "JavaScript creates the property and sets it to null",
          "The object is deleted from memory"
        ],
        "correctAnswer": 1,
        "explanation": "If JavaScript cannot find a property directly on an object, it automatically looks at the object's prototype to find it. This lets multiple objects share the same helper methods without duplicating them in memory.",
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
          "TypeError: child.greet is not a function"
        ],
        "correctAnswer": 0,
        "explanation": "child has its own direct role ('super'). When child.greet() is called, greet is missing on child, so it delegates up to parent.greet() and returns 'Hi'.",
        "hint": "child overrides role, but borrows greet from parent.",
        "hintCostXP": 5
      },
      {
        "id": "js18-q3",
        "type": "multiple_choice",
        "title": "Checking Direct Properties",
        "prompt": "How can you verify whether a property exists directly on an object rather than on its prototype chain?",
        "options": [
          "Object.hasOwn(obj, prop) or obj.hasOwnProperty(prop)",
          "prop in obj",
          "obj[prop] !== undefined",
          "typeof obj.prop === 'direct'"
        ],
        "correctAnswer": 0,
        "explanation": "Object.hasOwn(obj, prop) specifically checks if the property belongs directly to the object itself rather than being inherited from its prototype.",
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
    "lessonTitle": "ES6 Classes, Constructors & Inheritance: Clean Object-Oriented JS",
    "description": "Test your understanding of modern JavaScript classes, constructors, inheritance with extends, and calling super().",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js19-q1",
        "type": "multiple_choice",
        "title": "The super() Rule in Subclasses",
        "prompt": "In a subclass constructor that uses 'extends', why must you call super() before accessing 'this'?",
        "options": [
          "super() is optional and only recommended for logging",
          "super() calls the parent constructor to initialize the instance foundation before 'this' can be accessed",
          "super() converts the class to an arrow function",
          "super() binds event listeners automatically"
        ],
        "correctAnswer": 1,
        "explanation": "In JavaScript, derived class instances are initialized by the parent constructor. Calling super() runs the parent constructor; accessing 'this' before super() throws a ReferenceError.",
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
        "title": "Classes Under the Hood",
        "prompt": "What is an ES6 class under the hood in JavaScript?",
        "options": [
          "A completely separate memory architecture unrelated to prototypes",
          "A cleaner, modern blueprint syntax built on top of JavaScript's prototype system",
          "A compiled C++ binary structure",
          "A plain JSON object"
        ],
        "correctAnswer": 1,
        "explanation": "ES6 classes provide a cleaner, more readable syntax, but under the hood they still create standard constructor functions and prototype chains.",
        "hint": "Classes provide cleaner syntax over JavaScript prototypes.",
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
    "lessonTitle": "Synchronous vs Asynchronous: Why JavaScript Never Freezes",
    "description": "Test your understanding of why waiting tasks run in the background with setTimeout instead of freezing your page.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js20-q1",
        "type": "multiple_choice",
        "title": "The Single Thread and Blocking",
        "prompt": "What happens in a browser tab if a synchronous function runs a heavy calculation for 10 seconds?",
        "options": [
          "The browser automatically moves it to another thread and the UI stays responsive",
          "The entire page freezes, buttons stop responding, and animations halt because the main thread is blocked",
          "The calculation is paused and rescheduled for night time",
          "The browser restarts immediately"
        ],
        "correctAnswer": 1,
        "explanation": "Because JavaScript's single main thread runs both your script and the UI rendering loop, heavy synchronous work blocks all user interactions and rendering.",
        "hint": "Single thread means only one task can execute on the main thread at a time.",
        "hintCostXP": 5
      },
      {
        "id": "js20-q2",
        "type": "code_output",
        "title": "Execution Order with setTimeout",
        "prompt": "In what order are the numbers logged by this code?",
        "codeSnippet": "console.log(1);\nsetTimeout(() => console.log(2), 0);\nconsole.log(3);",
        "language": "javascript",
        "options": [
          "1, 2, 3",
          "1, 3, 2",
          "2, 1, 3",
          "3, 1, 2"
        ],
        "correctAnswer": 1,
        "explanation": "1 logs first. setTimeout hands the timer callback to the browser background. 3 logs next. Once all synchronous code finishes, 2 logs last.",
        "hint": "Synchronous code on the call stack always runs before task queue callbacks.",
        "hintCostXP": 5
      },
      {
        "id": "js20-q3",
        "type": "multiple_choice",
        "title": "Role of Web APIs",
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
        "title": "Promise .then Chaining Pipeline",
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
        "title": "Promise.all Results Handling",
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
    "lessonTitle": "Async/Await: Clean Asynchronous Workflows",
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
        "prompt": "If you need to fetch users and products at the same time and neither depends on the other, how should you run them?",
        "options": [
          "await each sequentially: await getUsers(); await getProducts();",
          "Run them simultaneously with Promise.all([getUsers(), getProducts()])",
          "Create a while loop that waits for both",
          "Use two separate script tags"
        ],
        "correctAnswer": 1,
        "explanation": "Awaiting them one by one creates an async waterfall where each request waits for the previous one. Promise.all initiates all requests simultaneously.",
        "hint": "Promise.all fires independent asynchronous tasks in parallel.",
        "hintCostXP": 5
      },
      {
        "id": "js22-q3",
        "type": "code_output",
        "title": "Catching Rejected Promises in async/await",
        "prompt": "What will this async function print to the console?",
        "codeSnippet": "async function test() {\n  try {\n    await Promise.reject(new Error(\"Network timeout\"));\n    console.log(\"Success!\");\n  } catch (err) {\n    console.log(\"Caught: \" + err.message);\n  }\n}\ntest();",
        "language": "javascript",
        "options": [
          "'Success!'",
          "'Caught: Network timeout'",
          "Uncaught Promise Rejection error",
          "Nothing is printed"
        ],
        "correctAnswer": 1,
        "explanation": "Awaiting a rejected promise throws an exception inside the async function, jumping directly into the catch block.",
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
        "prompt": "When does the Event Loop check and process the Macrotask Queue (timers)?",
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
        "title": "Zero-Millisecond Timeout Behavior",
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
        "explanation": "Code on the Call Stack runs first (A, B). When it clears, queued macrotask callbacks (C) run next.",
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
    "lessonTitle": "Error Handling: try, catch, finally & throw",
    "description": "Test your mastery of structured error handling, unconditional finally blocks, and throwing custom Error objects.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js24-q1",
        "type": "code_output",
        "title": "The Unconditional finally Block",
        "prompt": "What will be printed to the console by the following code?",
        "codeSnippet": "let log = \"A\";\ntry {\n  log += \"-B\";\n  throw new Error(\"Oops\");\n} catch (err) {\n  log += \"-C\";\n} finally {\n  log += \"-D\";\n}\nconsole.log(log);",
        "language": "javascript",
        "options": [
          "'A-B-C-D'",
          "'A-B-D'",
          "'A-B-C'",
          "'A-C-D'"
        ],
        "correctAnswer": 0,
        "explanation": "The try block runs ('A-B'), throws an error which redirects control to catch ('-C'), and finally ALWAYS runs at the end ('-D'). Result: 'A-B-C-D'.",
        "hint": "The finally block executes no matter what happens inside try or catch.",
        "hintCostXP": 5
      },
      {
        "id": "js24-q2",
        "type": "multiple_choice",
        "title": "The Danger of Empty catch Blocks",
        "prompt": "Why is an empty catch block (catch (err) {}) considered a dangerous anti-pattern in JavaScript?",
        "options": [
          "It causes an immediate SyntaxError in modern browser engines",
          "It swallows the error into a black hole, hiding bugs and making debugging nearly impossible",
          "It permanently stops the finally block from executing",
          "It automatically redirects the browser to an error page"
        ],
        "correctAnswer": 1,
        "explanation": "Empty catch blocks swallow errors silently with zero logs, leaving developers and users unaware of why a feature broke.",
        "hint": "Think about what happens when an error occurs and nobody logs or handles it.",
        "hintCostXP": 5
      },
      {
        "id": "js24-q3",
        "type": "code_output",
        "title": "Execution Halting on Throw",
        "prompt": "What is logged when calling validateInput(-5)?",
        "codeSnippet": "function validateInput(num) {\n  try {\n    if (num < 0) {\n      throw new Error(\"Negative numbers not allowed\");\n    }\n    console.log(\"Valid:\", num);\n  } catch (error) {\n    console.log(\"Caught:\", error.message);\n  }\n}\nvalidateInput(-5);",
        "language": "javascript",
        "options": [
          "'Valid: -5' followed by 'Caught: Negative numbers not allowed'",
          "'Caught: Negative numbers not allowed'",
          "'Caught: undefined'",
          "The script crashes and logs nothing"
        ],
        "correctAnswer": 1,
        "explanation": "When throw executes, the rest of the try block is immediately abandoned. Control jumps straight into catch, so 'Valid: -5' is never reached.",
        "hint": "Does code after a throw statement in a try block continue running?",
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
    "lessonTitle": "ES Modules: Organizing Code with import & export",
    "description": "Assess your understanding of ES module isolation, default vs named exports, and import syntax.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js25-q1",
        "type": "multiple_choice",
        "title": "Importing Default vs Named Exports",
        "prompt": "Given a module file that exports both a default class and named constants: 'export default class App {}' and 'export const VERSION = \"1.0\";', which import syntax is correct?",
        "options": [
          "import { App, VERSION } from './app.js';",
          "import App, { VERSION } from './app.js';",
          "import App, VERSION from './app.js';",
          "import { default as App, VERSION } from './app.js' only"
        ],
        "correctAnswer": 1,
        "explanation": "Default exports are imported WITHOUT curly braces (App), whereas named exports REQUIRE curly braces ({ VERSION }). Combining them yields 'import App, { VERSION } from ...'.",
        "hint": "Curly braces are reserved exclusively for named exports.",
        "hintCostXP": 5
      },
      {
        "id": "js25-q2",
        "type": "multiple_choice",
        "title": "Module Scope Isolation",
        "prompt": "What is the primary scoping advantage of ES Modules over traditional script tags?",
        "options": [
          "Variables declared inside a module are private to that file and do not pollute the global window scope",
          "All module variables are automatically stored in the user's localStorage",
          "Modules run in background Web Workers automatically",
          "Modules turn all functions into asynchronous Promises"
        ],
        "correctAnswer": 0,
        "explanation": "Every ES Module has its own top-level scope. Top-level variables remain private unless explicitly exported, eliminating global naming collisions.",
        "hint": "Think about global variables vs file-level private scopes.",
        "hintCostXP": 5
      },
      {
        "id": "js25-q3",
        "type": "code_output",
        "title": "Renaming Imports with 'as'",
        "prompt": "What does this code output when importing with an alias?",
        "codeSnippet": "// Inside stringUtils.js:\n// export const clean = (str) => str.trim().toUpperCase();\n\n// Inside main.js:\nimport { clean as sanitize } from './stringUtils.js';\nconsole.log(sanitize(\"   learncraft   \"));",
        "language": "javascript",
        "options": [
          "'   LEARNCRAFT   '",
          "'LEARNCRAFT'",
          "TypeError: sanitize is not a function",
          "'learncraft'"
        ],
        "correctAnswer": 1,
        "explanation": "The 'as' keyword renames the imported 'clean' function to 'sanitize' locally, which trims the outer whitespace and converts the text to uppercase.",
        "hint": "The function trims whitespace and converts to uppercase.",
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
    "lessonTitle": "Working with JSON: Parsing and Serializing Data",
    "description": "Evaluate your skills in serializing data with JSON.stringify, defensive JSON.parse techniques, and JSON format rules.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js26-q1",
        "type": "code_output",
        "title": "Serialization Omission Rules",
        "prompt": "What is the output of JSON.stringify on the following object?",
        "codeSnippet": "const person = {\n  name: \"Sam\",\n  age: 26,\n  greet: function() { return \"Hi!\"; },\n  nickname: undefined\n};\nconsole.log(JSON.stringify(person));",
        "language": "javascript",
        "options": [
          "'{\"name\":\"Sam\",\"age\":26,\"greet\":\"Hi!\",\"nickname\":null}'",
          "'{\"name\":\"Sam\",\"age\":26}'",
          "'{\"name\":\"Sam\",\"age\":26,\"nickname\":undefined}'",
          "Throws a TypeError because functions cannot be passed to stringify"
        ],
        "correctAnswer": 1,
        "explanation": "JSON.stringify automatically strips out functions, undefined values, and Symbols from objects because JSON is a data-only format that cannot represent executable code.",
        "hint": "What happens to functions and undefined properties during stringification?",
        "hintCostXP": 5
      },
      {
        "id": "js26-q2",
        "type": "multiple_choice",
        "title": "Strict JSON Syntax Requirements",
        "prompt": "Which of the following text strings is VALID JSON that can be parsed with JSON.parse() without throwing a SyntaxError?",
        "options": [
          "{ 'title': 'Book', 'pages': 300 }",
          "{ \"title\": \"Book\", \"pages\": 300, }",
          "{\"title\": \"Book\", \"pages\": 300}",
          "{ title: \"Book\", pages: 300 }"
        ],
        "correctAnswer": 2,
        "explanation": "In valid JSON, all keys MUST be enclosed in double quotes (not single quotes, not unquoted), and trailing commas after the last property are strictly forbidden.",
        "hint": "Look for double quotes on all keys and no trailing commas.",
        "hintCostXP": 5
      },
      {
        "id": "js26-q3",
        "type": "multiple_choice",
        "title": "Handling Malformed JSON Safely",
        "prompt": "What happens if you execute JSON.parse('malformed string') without wrapping it in a try/catch block?",
        "options": [
          "It returns undefined and the program continues running",
          "It returns null and logs an internal warning",
          "It throws a synchronous SyntaxError that halts program execution if uncaught",
          "The browser prompts the user to enter valid JSON"
        ],
        "correctAnswer": 2,
        "explanation": "JSON.parse throws a synchronous SyntaxError whenever the input string is not valid JSON. Uncaught, it terminates the script.",
        "hint": "JSON.parse is strict: bad format causes a synchronous exception.",
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
    "lessonTitle": "The Fetch API: Communicating with REST APIs",
    "description": "Test your ability to make HTTP requests, handle response.ok guards, and send JSON payloads with POST.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js27-q1",
        "type": "multiple_choice",
        "title": "The #1 Fetch Trap: HTTP Error Statuses",
        "prompt": "How does the fetch() API respond when a remote server returns an HTTP 404 (Not Found) or 500 (Internal Server Error) response?",
        "options": [
          "The fetch() Promise rejects immediately and jumps directly into the catch block",
          "The fetch() Promise fulfills successfully; response.ok is set to false and response.status holds the error code",
          "The browser automatically retries the request up to 3 times",
          "A NetworkError is thrown synchronously"
        ],
        "correctAnswer": 1,
        "explanation": "fetch() only rejects on real network failures (like lost internet connection or DNS errors). HTTP error status codes (like 404 or 500) fulfill successfully, but response.ok is false.",
        "hint": "Does fetch reject on HTTP error status codes?",
        "hintCostXP": 5
      },
      {
        "id": "js27-q2",
        "type": "multiple_choice",
        "title": "The Two-Step Promise Pattern",
        "prompt": "Why are there two consecutive await statements in 'const res = await fetch(url); const data = await res.json();'?",
        "options": [
          "The first awaits DNS resolution; the second awaits HTTP handshake",
          "The first awaits HTTP response headers and status; the second awaits downloading and parsing the streaming body as JSON",
          "The second await is optional and only needed for POST requests",
          "The first await reads from cache; the second reads from the network"
        ],
        "correctAnswer": 1,
        "explanation": "The first Promise resolves as soon as the HTTP headers arrive (giving you res.status and res.ok). The second Promise (res.json()) streams the rest of the body packets and parses them into a JavaScript object.",
        "hint": "The first step gets the response envelope; the second step reads and parses the stream.",
        "hintCostXP": 5
      },
      {
        "id": "js27-q3",
        "type": "multiple_choice",
        "title": "Sending JSON Payloads with POST",
        "prompt": "When sending a POST request containing JSON data via fetch(), which HTTP header is required to inform the server of the payload format?",
        "options": [
          "'Accept': 'text/plain'",
          "'Content-Type': 'application/json'",
          "'Authorization': 'Bearer JSON'",
          "'Data-Format': 'json-stream'"
        ],
        "correctAnswer": 1,
        "explanation": "The 'Content-Type': 'application/json' header informs the backend server that the request body is formatted as a JSON string and should be parsed accordingly.",
        "hint": "Content-Type specifies the media type of the resource being sent.",
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
        "title": "Preventing Cross-Site Scripting (XSS)",
        "prompt": "Why is element.textContent preferred over element.innerHTML when inserting user-generated text into the DOM?",
        "options": [
          "textContent renders text faster because it disables all CSS styling",
          "textContent treats input strictly as plain text, escaping HTML tags and preventing malicious script execution (XSS)",
          "innerHTML only works in older versions of Internet Explorer",
          "textContent automatically converts text to uppercase"
        ],
        "correctAnswer": 1,
        "explanation": "element.textContent treats all inserted content strictly as literal text. Any <script> or HTML tags provided by users are safely escaped as plain text, eliminating XSS vulnerabilities.",
        "hint": "Think about how script tags behave when parsed as HTML versus plain text.",
        "hintCostXP": 5
      },
      {
        "id": "js28-q2",
        "type": "code_output",
        "title": "Managing CSS Classes with classList",
        "prompt": "What will button.className be after running the following classList methods?",
        "codeSnippet": "const btn = document.createElement(\"button\");\nbtn.classList.add(\"btn\", \"primary\");\nbtn.classList.toggle(\"active\");\nbtn.classList.remove(\"primary\");\nconsole.log(btn.className);",
        "language": "javascript",
        "options": [
          "'btn active'",
          "'btn primary active'",
          "'btn'",
          "'primary active'"
        ],
        "correctAnswer": 0,
        "explanation": "The classes 'btn' and 'primary' are added. 'active' is toggled on. Then 'primary' is removed, leaving 'btn active'.",
        "hint": "Follow each add, toggle, and remove operation in sequence.",
        "hintCostXP": 5
      },
      {
        "id": "js28-q3",
        "type": "multiple_choice",
        "title": "querySelector vs querySelectorAll",
        "prompt": "What does document.querySelector('.card') return if there are five elements with the class 'card' on the page?",
        "options": [
          "An Array containing all five card elements",
          "A NodeList containing all five card elements",
          "Only the first matching card element in the document",
          "It throws a DOMException because multiple matches exist"
        ],
        "correctAnswer": 2,
        "explanation": "document.querySelector() returns only the first matching element found in tree order (or null if none exist). To retrieve all matches, use document.querySelectorAll().",
        "hint": "querySelector returns one element; querySelectorAll returns a list.",
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
    "lessonTitle": "Events, Event Listeners & Event Delegation",
    "description": "Evaluate your skills in handling browser events, stopping form reloads with preventDefault, and implementing event delegation.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js29-q1",
        "type": "multiple_choice",
        "title": "The Memory Advantage of Event Delegation",
        "prompt": "Why is Event Delegation preferred over attaching individual event listeners to 500 list items in a loop?",
        "options": [
          "Browsers limit web pages to a maximum of 5 event listeners",
          "Attaching one listener to a parent element saves significant memory and automatically handles dynamically added child items",
          "Event delegation causes click events to run synchronously in background threads",
          "Individual event listeners cannot read event.target"
        ],
        "correctAnswer": 1,
        "explanation": "Event delegation leverages event bubbling by attaching one listener to the parent container. This drastically reduces memory overhead and automatically works for newly added children.",
        "hint": "Think about memory consumption and dynamic elements.",
        "hintCostXP": 5
      },
      {
        "id": "js29-q2",
        "type": "multiple_choice",
        "title": "event.target vs event.currentTarget",
        "prompt": "If a user clicks a <button> located inside a <div id='container'>, and a click listener is attached to the <div>, what are event.target and event.currentTarget?",
        "options": [
          "event.target is the <button>; event.currentTarget is the <div>",
          "event.target is the <div>; event.currentTarget is the <button>",
          "Both are always identical and reference the <div>",
          "Both are always identical and reference the <button>"
        ],
        "correctAnswer": 0,
        "explanation": "event.target is the deepest element that was actually clicked (the button). event.currentTarget is the element to which the event handler is attached (the div).",
        "hint": "Target is who was clicked; currentTarget is who holds the listener.",
        "hintCostXP": 5
      },
      {
        "id": "js29-q3",
        "type": "multiple_choice",
        "title": "Stopping Default Browser Behavior",
        "prompt": "What does calling event.preventDefault() inside a form submit event handler do?",
        "options": [
          "It clears all input fields in the form",
          "It prevents the browser from reloading the entire webpage so JavaScript can handle submission asynchronously",
          "It stops event bubbling to parent elements",
          "It closes the browser window"
        ],
        "correctAnswer": 1,
        "explanation": "By default, submitting an HTML form reloads the page or navigates to a new URL. Calling event.preventDefault() stops this default action, allowing JavaScript to process the form.",
        "hint": "What does a form submission normally do to a web page?",
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
    "lessonTitle": "Browser Storage (localStorage) & DevTools Debugging",
    "description": "Test your understanding of persistent storage with localStorage, JSON serialization rules, and DevTools debugging.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js30-q1",
        "type": "code_output",
        "title": "The [object Object] localStorage Trap",
        "prompt": "What is stored in localStorage if you execute localStorage.setItem('user', { name: 'Alex' }); without stringifying?",
        "codeSnippet": "const user = { name: \"Alex\" };\nlocalStorage.setItem(\"user\", user);\nconsole.log(localStorage.getItem(\"user\"));",
        "language": "javascript",
        "options": [
          "'{\"name\":\"Alex\"}'",
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
        "id": "js30-q2",
        "type": "multiple_choice",
        "title": "localStorage vs sessionStorage",
        "prompt": "What is the key difference between localStorage and sessionStorage in the browser?",
        "options": [
          "localStorage data persists indefinitely even after closing the browser; sessionStorage data is cleared when the tab closes",
          "localStorage can store binary files while sessionStorage only stores strings",
          "sessionStorage is shared between all domains and tabs simultaneously",
          "localStorage is only available on desktop computers"
        ],
        "correctAnswer": 0,
        "explanation": "localStorage persists across browser sessions and computer reboots until explicitly cleared, whereas sessionStorage is scoped to the current browser tab and is deleted when the tab closes.",
        "hint": "Think about lifespan: persistent forever vs lifespan of the current tab.",
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
