const fs = require('fs');

const NEW_QUIZZES = [
  // JS-04: Conditional Logic
  {
    id: "quiz-javascript-js04",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js04-conditional-logic",
    lessonCode: "JS-04",
    lessonTitle: "Conditional Logic: Decision Making with if/else & switch",
    description: "Test your understanding of branching logic, ternary operators, and switch statements with break.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js04-q1",
        type: "multiple_choice",
        title: "Ternary Operator Syntax",
        prompt: "What does the ternary operator (? :) do in JavaScript?",
        options: [
          "It defines a loop that runs three times",
          "It provides a concise one-line if/else expression that evaluates to a value",
          "It compares three variables for equality",
          "It throws an error if a condition is falsy"
        ],
        correctAnswer: 1,
        explanation: "The ternary operator condition ? valueIfTrue : valueIfFalse evaluates a condition and directly returns one of two values.",
        hint: "Think: condition ? trueResult : falseResult",
        hintCostXP: 5
      },
      {
        id: "js04-q2",
        type: "code_output",
        title: "Switch Statement Fall-Through",
        prompt: "What is logged to the console by this switch statement?",
        codeSnippet: `const grade = "B";
let result = "";
switch (grade) {
  case "A":
    result += "Great ";
  case "B":
    result += "Good ";
  case "C":
    result += "Pass";
    break;
  default:
    result = "Unknown";
}
console.log(result);`,
        language: "javascript",
        options: [
          "'Good '",
          "'Good Pass'",
          "'Great Good Pass'",
          "'Pass'"
        ],
        correctAnswer: 1,
        explanation: "Because case 'B' lacks a break statement, execution falls through into case 'C', adding 'Pass' before reaching break.",
        hint: "Watch out for missing break statements in switch cases.",
        hintCostXP: 5
      },
      {
        id: "js04-q3",
        type: "multiple_choice",
        title: "Logical AND Guard",
        prompt: "In the expression (isLoggedIn && showDashboard()), when does showDashboard() actually execute?",
        options: [
          "Always, regardless of isLoggedIn",
          "Only if isLoggedIn is truthy (short-circuit evaluation)",
          "Only if isLoggedIn is false",
          "Never, because && requires a ternary operator"
        ],
        correctAnswer: 1,
        explanation: "JavaScript uses short-circuit evaluation: if the left side of && is falsy, execution stops immediately. showDashboard() only runs if isLoggedIn is true.",
        hint: "If the first condition is false, && cannot be true, so the right side is skipped.",
        hintCostXP: 5
      }
    ]
  },

  // JS-05: Loops and Iteration
  {
    id: "quiz-javascript-js05",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js05-loops-and-iteration",
    lessonCode: "JS-05",
    lessonTitle: "Loops & Iteration: Repeating Work Without Repeating Code",
    description: "Test your skills with for loops, while loops, for...of iteration, and avoiding infinite loops.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js05-q1",
        type: "multiple_choice",
        title: "for...of vs for...in",
        prompt: "Which loop is designed specifically for iterating over the VALUES of an array or iterable?",
        options: [
          "for...in",
          "for...of",
          "while...in",
          "do...for"
        ],
        correctAnswer: 1,
        explanation: "for...of iterates directly over the values of arrays, strings, and sets. for...in iterates over the property keys of an object.",
        hint: "Think: for (const item of items) gets the items themselves.",
        hintCostXP: 5
      },
      {
        id: "js05-q2",
        type: "code_output",
        title: "Break and Continue",
        prompt: "What will this loop output?",
        codeSnippet: `const numbers = [1, 2, 3, 4, 5];
let sum = 0;
for (const n of numbers) {
  if (n === 2) continue;
  if (n === 4) break;
  sum += n;
}
console.log(sum);`,
        language: "javascript",
        options: [
          "4",
          "6",
          "10",
          "1"
        ],
        correctAnswer: 0,
        explanation: "1 is added (sum=1). 2 is skipped with continue. 3 is added (sum=4). When n is 4, break stops the loop immediately. Output is 4.",
        hint: "continue skips to the next item; break terminates the entire loop.",
        hintCostXP: 5
      },
      {
        id: "js05-q3",
        type: "multiple_choice",
        title: "Infinite Loops",
        prompt: "What causes a while loop to become an infinite loop that freezes the browser?",
        options: [
          "Using let instead of const for loop counters",
          "The condition never evaluates to false because the counter is not updated",
          "Having more than 10 lines of code inside the loop body",
          "Iterating over an empty array"
        ],
        correctAnswer: 1,
        explanation: "A while loop runs as long as its condition is true. If the loop body never changes the variables tested in the condition, it will run forever and freeze execution.",
        hint: "Every loop needs a termination condition that is guaranteed to be reached.",
        hintCostXP: 5
      }
    ]
  },

  // JS-07: Scope: Global, Function & Block
  {
    id: "quiz-javascript-js07",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js07-scope-global-function-block",
    lessonCode: "JS-07",
    lessonTitle: "Scope & Visibility: Global, Function & Block Scope with let & const",
    description: "Verify your understanding of block scope, variable shadowing, and the scope chain.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js07-q1",
        type: "multiple_choice",
        title: "Block Scope",
        prompt: "Which pair of keywords respects block scope enclosed by curly braces {}?",
        options: [
          "var and function",
          "let and const",
          "var and let",
          "global and window"
        ],
        correctAnswer: 1,
        explanation: "let and const are block-scoped. Variables declared with them inside { } cannot be accessed from outside that block. var ignores blocks.",
        hint: "These two modern keywords were introduced in ES6 to fix var's scoping leaks.",
        hintCostXP: 5
      },
      {
        id: "js07-q2",
        type: "code_output",
        title: "Variable Shadowing",
        prompt: "What is logged by the following code?",
        codeSnippet: `const role = "member";
function checkAccess() {
  const role = "admin";
  return role;
}
console.log(checkAccess() + " | " + role);`,
        language: "javascript",
        options: [
          "'admin | admin'",
          "'admin | member'",
          "'member | member'",
          "ReferenceError: role is already declared"
        ],
        correctAnswer: 1,
        explanation: "Inside checkAccess, the local role shadows the outer role. Outside the function, the global role remains 'member'.",
        hint: "Inner scopes can create local variables with the same name without altering outer variables.",
        hintCostXP: 5
      },
      {
        id: "js07-q3",
        type: "multiple_choice",
        title: "Scope Chain Direction",
        prompt: "How does JavaScript look for variables along the scope chain?",
        options: [
          "From outside scopes downward into inner functions",
          "From the current inner scope outward toward parent scopes and global scope",
          "Randomly across all files in the project",
          "Only in the global scope"
        ],
        correctAnswer: 1,
        explanation: "JavaScript searches from the inside out: it checks the local scope first, then parent function scopes, and finally the global scope.",
        hint: "Think of looking out through one-way glass: you can see outward, but outside cannot see inward.",
        hintCostXP: 5
      }
    ]
  },

  // JS-09: Callbacks & Higher-Order Functions
  {
    id: "quiz-javascript-js09",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js09-callbacks-and-higher-order-functions",
    lessonCode: "JS-09",
    lessonTitle: "Callbacks & Higher-Order Functions: Functions as First-Class Citizens",
    description: "Test your comprehension of higher-order functions and passing functions as data.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js09-q1",
        type: "multiple_choice",
        title: "First-Class Functions",
        prompt: "What does it mean that functions are 'first-class citizens' in JavaScript?",
        options: [
          "Functions can only be created by administrators",
          "Functions can be assigned to variables, passed as arguments, and returned from other functions",
          "Functions execute faster than standard code blocks",
          "Functions cannot be modified once defined"
        ],
        correctAnswer: 1,
        explanation: "In JavaScript, functions are values just like numbers, strings, or objects. You can pass them into functions and return them dynamically.",
        hint: "Functions can be treated just like any ordinary variable or data value.",
        hintCostXP: 5
      },
      {
        id: "js09-q2",
        type: "code_output",
        title: "Higher-Order Function Output",
        prompt: "What is the output of this code?",
        codeSnippet: `function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}
const double = createMultiplier(2);
console.log(double(7));`,
        language: "javascript",
        options: [
          "14",
          "9",
          "undefined",
          "NaN"
        ],
        correctAnswer: 0,
        explanation: "createMultiplier returns a new function that remembers factor (2). Calling double(7) computes 7 * 2 = 14.",
        hint: "The returned function multiplies its argument by the factory's factor.",
        hintCostXP: 5
      },
      {
        id: "js09-q3",
        type: "multiple_choice",
        title: "Callback Invocation",
        prompt: "When passing a function as a callback (e.g., button.addEventListener('click', handleClick)), why do we write handleClick instead of handleClick()?",
        options: [
          "handleClick() would pass the function reference, which is invalid",
          "handleClick passes the function itself to be called later; handleClick() calls it immediately",
          "Parentheses are optional in all JavaScript function calls",
          "addEventListener requires functions to have no names"
        ],
        correctAnswer: 1,
        explanation: "Adding parentheses executes the function immediately and passes its return value. Omitting parentheses passes the function definition itself to be called when the event occurs.",
        hint: "We want the browser to call the function when clicked, not right now during setup.",
        hintCostXP: 5
      }
    ]
  },

  // JS-10: Arrays and Indexing
  {
    id: "quiz-javascript-js10",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js10-arrays-and-indexing",
    lessonCode: "JS-10",
    lessonTitle: "Arrays & Indexing: Storing Ordered Lists and Array Fundamentals",
    description: "Evaluate your knowledge of zero-based array indexing, length, push/pop, and slice vs splice.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js10-q1",
        type: "multiple_choice",
        title: "Zero-Based Indexing",
        prompt: "If an array has 5 items (items.length === 5), what is the index of the very last item?",
        options: [
          "5",
          "4",
          "0",
          "-1"
        ],
        correctAnswer: 1,
        explanation: "Because JavaScript array indices start at 0, the last item is always at index items.length - 1 (5 - 1 = 4).",
        hint: "The items are indexed 0, 1, 2, 3, 4.",
        hintCostXP: 5
      },
      {
        id: "js10-q2",
        type: "code_output",
        title: "Push and Pop",
        prompt: "What will this code print?",
        codeSnippet: `const tasks = [\"Email client\", \"Write tests\"];
tasks.push(\"Ship feature\");
const finished = tasks.pop();
console.log(tasks.length + \" | \" + finished);`,
        language: "javascript",
        options: [
          "'2 | Ship feature'",
          "'3 | Ship feature'",
          "'2 | Write tests'",
          "'3 | Email client'"
        ],
        correctAnswer: 0,
        explanation: "push adds 'Ship feature' to the end (length 3). pop removes and returns the last item ('Ship feature'), leaving 2 items.",
        hint: "push adds to the end, pop removes from the end.",
        hintCostXP: 5
      },
      {
        id: "js10-q3",
        type: "multiple_choice",
        title: "slice vs splice",
        prompt: "What is the crucial difference between array.slice() and array.splice()?",
        options: [
          "slice alters the original array; splice returns a shallow copy",
          "slice returns a new array without changing the original; splice modifies the original array in place",
          "slice only works on strings; splice only works on numbers",
          "Both methods mutate the original array equally"
        ],
        correctAnswer: 1,
        explanation: "slice(start, end) copies a portion of an array non-destructively. splice(start, count) cuts or inserts items directly into the original array.",
        hint: "Remember: 'splice' has a 'p' for 'permanent' changes to the original.",
        hintCostXP: 5
      }
    ]
  },

  // JS-12: Objects and Methods
  {
    id: "quiz-javascript-js12",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js12-objects-and-methods",
    lessonCode: "JS-12",
    lessonTitle: "Objects & Methods: Modeling Real-World Data with Key-Value Pairs",
    description: "Check your mastery of object properties, dot notation vs bracket notation, and object methods.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js12-q1",
        type: "multiple_choice",
        title: "Bracket Notation",
        prompt: "When MUST you use bracket notation (user[key]) instead of dot notation (user.key)?",
        options: [
          "When accessing numbers stored inside objects",
          "When the property name is stored in a dynamic variable or contains spaces/hyphens",
          "When calling a function attached to an object",
          "When creating a nested object"
        ],
        correctAnswer: 1,
        explanation: "Dot notation only works for static, valid JavaScript identifiers. If the key is stored in a variable (e.g. const prop = 'age') or has special characters like 'first-name', bracket notation is required.",
        hint: "Think: user[dynamicKey] evaluates the variable dynamicKey.",
        hintCostXP: 5
      },
      {
        id: "js12-q2",
        type: "code_output",
        title: "Object Property Update",
        prompt: "What is printed by this code?",
        codeSnippet: `const product = { name: \"Desk\", price: 200 };
product.price = 250;
product[\"inStock\"] = true;
console.log(product.price + \" | \" + product.inStock);`,
        language: "javascript",
        options: [
          "'250 | true'",
          "'200 | undefined'",
          "'200 | true'",
          "TypeError: Assignment to constant variable"
        ],
        correctAnswer: 0,
        explanation: "Declaring an object with const prevents reassigning the variable product to a new value, but the properties inside the object remain mutable.",
        hint: "const protects the reference, not the properties inside.",
        hintCostXP: 5
      },
      {
        id: "js12-q3",
        type: "multiple_choice",
        title: "Object.keys and Object.values",
        prompt: "What does Object.keys(obj) return?",
        options: [
          "A string of all keys combined",
          "An array containing all the property names (keys) of the object",
          "The count of properties inside the object",
          "A new copy of the object"
        ],
        correctAnswer: 1,
        explanation: "Object.keys(obj) returns an array of strings representing all enumerable property keys of the object.",
        hint: "It returns a list of all the key names in an array.",
        hintCostXP: 5
      }
    ]
  },

  // JS-13: Object References & Copying
  {
    id: "quiz-javascript-js13",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js13-object-references-and-copying",
    lessonCode: "JS-13",
    lessonTitle: "Object References & Copying: Shallow Copy vs Deep Cloning",
    description: "Test your mental model of pointers, reference mutation, spread cloning, and structuredClone.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js13-q1",
        type: "code_output",
        title: "Shared Reference Mutation",
        prompt: "What will this code log?",
        codeSnippet: `const a = { count: 10 };
const b = a;
b.count = 25;
console.log(a.count);`,
        language: "javascript",
        options: [
          "10",
          "25",
          "undefined",
          "NaN"
        ],
        correctAnswer: 1,
        explanation: "Assigning const b = a copies the memory pointer, not the object. Both a and b point to the exact same object in memory, so modifying b.count modifies a.count.",
        hint: "Both variables reference the exact same memory location.",
        hintCostXP: 5
      },
      {
        id: "js13-q2",
        type: "multiple_choice",
        title: "Shallow vs Deep Copy",
        prompt: "Why is the spread operator {...user} only a SHALLOW copy?",
        options: [
          "It only copies the first property of the object",
          "It clones top-level properties, but nested objects and arrays are still copied as shared references",
          "It converts all numbers to strings",
          "It deletes any functions inside the object"
        ],
        correctAnswer: 1,
        explanation: "Spread ({...obj}) clones the top level. If user has a nested address: { city: 'Tokyo' }, both the copy and original still share the same nested address object.",
        hint: "Shallow means only 1 layer deep.",
        hintCostXP: 5
      },
      {
        id: "js13-q3",
        type: "multiple_choice",
        title: "Native Deep Cloning",
        prompt: "Which modern built-in JavaScript function creates a true deep clone of an object with nested data?",
        options: [
          "Object.assign()",
          "structuredClone()",
          "Object.freeze()",
          "JSON.copy()"
        ],
        correctAnswer: 1,
        explanation: "structuredClone() is the standard modern JavaScript API for deep-cloning objects, including nested objects, arrays, Dates, and Sets.",
        hint: "It is a native global function with 'clone' in its name.",
        hintCostXP: 5
      }
    ]
  },

  // JS-14: Destructuring
  {
    id: "quiz-javascript-js14",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js14-destructuring",
    lessonCode: "JS-14",
    lessonTitle: "Destructuring: Unpacking Objects and Arrays Cleanly",
    description: "Assess your skill with object extraction, renaming, default values, and array destructuring.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js14-q1",
        type: "code_output",
        title: "Object Destructuring with Defaults",
        prompt: "What will be printed?",
        codeSnippet: `const user = { name: \"Alex\" };
const { name, role = \"guest\" } = user;
console.log(name + \" is a \" + role);`,
        language: "javascript",
        options: [
          "'Alex is a guest'",
          "'Alex is a undefined'",
          "'guest is a Alex'",
          "ReferenceError"
        ],
        correctAnswer: 0,
        explanation: "name is extracted from user ('Alex'). role is not in user, so it takes the default value 'guest'.",
        hint: "Default values kick in when the property is undefined.",
        hintCostXP: 5
      },
      {
        id: "js14-q2",
        type: "multiple_choice",
        title: "Renaming in Destructuring",
        prompt: "How do you rename a property 'id' to 'userId' while destructuring an object?",
        options: [
          "const { id as userId } = obj;",
          "const { id: userId } = obj;",
          "const { id -> userId } = obj;",
          "const { userId = id } = obj;"
        ],
        correctAnswer: 1,
        explanation: "In object destructuring, the colon syntax { sourceProperty: newVariableName } extracts sourceProperty and assigns it to newVariableName.",
        hint: "Use colon (:), like { id: userId }.",
        hintCostXP: 5
      },
      {
        id: "js14-q3",
        type: "code_output",
        title: "Array Destructuring Skipping Items",
        prompt: "What will this output?",
        codeSnippet: `const coords = [10, 20, 30];
const [x, , z] = coords;
console.log(x + \",\" + z);`,
        language: "javascript",
        options: [
          "'10,20'",
          "'10,30'",
          "'20,30'",
          "'10,undefined'"
        ],
        correctAnswer: 1,
        explanation: "Leaving an empty space between commas [x, , z] skips the second item (20), assigning x=10 and z=30.",
        hint: "An empty comma slot skips that position in array destructuring.",
        hintCostXP: 5
      }
    ]
  },

  // JS-15: Spread and Rest Operators
  {
    id: "quiz-javascript-js15",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js15-spread-and-rest-operators",
    lessonCode: "JS-15",
    lessonTitle: "Spread & Rest Operators: Spreading Items vs Gathering Arguments",
    description: "Understand the twin roles of the three dots (...): Rest parameters and Spread syntax.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js15-q1",
        type: "multiple_choice",
        title: "Rest vs Spread Purpose",
        prompt: "What is the key difference between Rest parameters and the Spread operator?",
        options: [
          "Rest gathers multiple values into a single array; Spread unpacks an array into individual values",
          "Rest is for strings; Spread is for numbers",
          "Rest only works in React; Spread is only in Node.js",
          "They are identical synonyms with no behavioral differences"
        ],
        correctAnswer: 0,
        explanation: "Rest (...args in a function parameter) gathers multiple arguments into one array. Spread (...arr in a function call or literal) expands an array into individual elements.",
        hint: "Rest gathers; Spread unpacks.",
        hintCostXP: 5
      },
      {
        id: "js15-q2",
        type: "code_output",
        title: "Object Spread Merging",
        prompt: "What is logged when merging objects with spread?",
        codeSnippet: `const defaults = { theme: \"light\", zoom: 100 };
const userPrefs = { theme: \"dark\" };
const config = { ...defaults, ...userPrefs };
console.log(config.theme + \" | \" + config.zoom);`,
        language: "javascript",
        options: [
          "'dark | 100'",
          "'light | 100'",
          "'dark | undefined'",
          "SyntaxError"
        ],
        correctAnswer: 0,
        explanation: "Properties spread later override earlier properties with the same name. userPrefs.theme ('dark') overrides defaults.theme ('light').",
        hint: "Later objects in the spread override earlier keys.",
        hintCostXP: 5
      },
      {
        id: "js15-q3",
        type: "multiple_choice",
        title: "Rest Parameter Position",
        prompt: "Where must the Rest parameter (...rest) be placed in a function's parameter list?",
        options: [
          "As the very first parameter",
          "As the very last parameter",
          "Anywhere in the parameter list",
          "Functions can have multiple rest parameters"
        ],
        correctAnswer: 1,
        explanation: "A rest parameter must be the last parameter in the function signature because it collects all remaining arguments.",
        hint: "It gathers the 'rest' of the arguments, so nothing can come after it.",
        hintCostXP: 5
      }
    ]
  },

  // JS-16: Optional Chaining and Nullish Coalescing
  {
    id: "quiz-javascript-js16",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js16-optional-chaining-and-nullish-coalescing",
    lessonCode: "JS-16",
    lessonTitle: "Optional Chaining & Nullish Coalescing: Defensive Coding with ?. and ??",
    description: "Verify your mastery of safe property navigation (?.) and precise null/undefined fallbacks (??).",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js16-q1",
        type: "multiple_choice",
        title: "Optional Chaining (?.)",
        prompt: "What does user?.address?.city return if user.address is null or undefined?",
        options: [
          "It throws a TypeError: Cannot read property 'city' of undefined",
          "undefined (without throwing an error)",
          "null",
          "false"
        ],
        correctAnswer: 1,
        explanation: "Optional chaining (?.) short-circuits and safely returns undefined as soon as any part of the chain is null or undefined, preventing runtime crashes.",
        hint: "It safely returns undefined instead of throwing a crash.",
        hintCostXP: 5
      },
      {
        id: "js16-q2",
        type: "code_output",
        title: "Nullish Coalescing (??) vs Logical OR (||)",
        prompt: "What will this code log to the console?",
        codeSnippet: `const score = 0;
const res1 = score || 10;
const res2 = score ?? 10;
console.log(res1 + \" | \" + res2);`,
        language: "javascript",
        options: [
          "'10 | 0'",
          "'0 | 0'",
          "'10 | 10'",
          "'0 | 10'"
        ],
        correctAnswer: 0,
        explanation: "Logical OR (||) treats 0 as falsy, so it falls back to 10. Nullish coalescing (??) only falls back on null or undefined, preserving the valid value 0.",
        hint: "0 is a valid number, but it is falsy in boolean expressions.",
        hintCostXP: 5
      },
      {
        id: "js16-q3",
        type: "multiple_choice",
        title: "Optional Function Calling",
        prompt: "How do you safely invoke a callback function that might not have been provided?",
        options: [
          "callback?()",
          "callback?.()",
          "callback!().",
          "call(callback)"
        ],
        correctAnswer: 1,
        explanation: "callback?.() checks if callback is null or undefined before attempting to invoke it, preventing 'is not a function' errors.",
        hint: "Use ?. before the opening parenthesis: fn?.()",
        hintCostXP: 5
      }
    ]
  },

  // JS-18: Prototypes and Prototype Chain
  {
    id: "quiz-javascript-js18",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js18-prototypes-and-prototype-chain",
    lessonCode: "JS-18",
    lessonTitle: "Prototypes & Delegation: How JavaScript Inherits Through the Prototype Chain",
    description: "Test your mental model of prototypal delegation, __proto__, and Object.create.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js18-q1",
        type: "multiple_choice",
        title: "Prototypal Delegation",
        prompt: "What happens when you access a property on an object that does NOT exist on that object?",
        options: [
          "JavaScript immediately throws a PropertyNotFoundError",
          "JavaScript looks up the prototype chain to see if the property exists on the object's prototype",
          "JavaScript creates the property and sets it to null",
          "The object is deleted from memory"
        ],
        correctAnswer: 1,
        explanation: "JavaScript uses delegation: if a property is missing on an object, the engine walks up its prototype chain until it finds it or reaches Object.prototype (null).",
        hint: "It delegates the lookup to the object's prototype.",
        hintCostXP: 5
      },
      {
        id: "js18-q2",
        type: "code_output",
        title: "Object.create Prototype Link",
        prompt: "What is printed by this prototype delegation snippet?",
        codeSnippet: `const parent = { role: \"standard\", greet() { return \"Hi\"; } };
const child = Object.create(parent);
child.role = \"super\";
console.log(child.role + \" | \" + child.greet());`,
        language: "javascript",
        options: [
          "'super | Hi'",
          "'standard | Hi'",
          "'super | undefined'",
          "TypeError"
        ],
        correctAnswer: 0,
        explanation: "child has its own role ('super'). When child.greet() is called, greet is not on child directly, so it delegates up to parent and calls parent.greet(), returning 'Hi'.",
        hint: "child overrides role, but borrows greet from parent.",
        hintCostXP: 5
      },
      {
        id: "js18-q3",
        type: "multiple_choice",
        title: "hasOwnProperty",
        prompt: "How can you verify whether a property exists directly on an object rather than on its prototype chain?",
        options: [
          "Object.hasOwn(obj, prop) or obj.hasOwnProperty(prop)",
          "prop in obj",
          "obj[prop] !== undefined",
          "typeof obj.prop === 'direct'"
        ],
        correctAnswer: 0,
        explanation: "Object.hasOwn(obj, prop) checks if the property is a direct 'own' property of the object, ignoring properties inherited through the prototype chain.",
        hint: "Look for 'hasOwn' or 'hasOwnProperty'.",
        hintCostXP: 5
      }
    ]
  },

  // JS-19: Classes, extends & super
  {
    id: "quiz-javascript-js19",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js19-classes-extends-and-super",
    lessonCode: "JS-19",
    lessonTitle: "ES6 Classes: Object-Oriented Blueprints, extends & super()",
    description: "Check your knowledge of constructors, class methods, inheritance with extends, and super().",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js19-q1",
        type: "multiple_choice",
        title: "super() in Derived Classes",
        prompt: "In a subclass constructor that uses 'extends', why must you call super() before accessing 'this'?",
        options: [
          "super() is optional and only recommended for logging",
          "super() calls the parent constructor to initialize the instance before 'this' can be accessed",
          "super() converts the class to an arrow function",
          "super() binds event listeners automatically"
        ],
        correctAnswer: 1,
        explanation: "In JavaScript, derived class instances are created by the parent constructor. Calling super() runs the parent constructor; accessing 'this' before super() throws a ReferenceError.",
        hint: "The parent constructor must initialize the object before the child can use 'this'.",
        hintCostXP: 5
      },
      {
        id: "js19-q2",
        type: "code_output",
        title: "Method Overriding with super",
        prompt: "What will this class hierarchy log?",
        codeSnippet: `class Vehicle {
  start() { return \"Engine on\"; }
}
class Car extends Vehicle {
  start() { return super.start() + \", Seatbelt buckled\"; }
}
const myCar = new Car();
console.log(myCar.start());`,
        language: "javascript",
        options: [
          "'Engine on, Seatbelt buckled'",
          "'Engine on'",
          "'Seatbelt buckled'",
          "TypeError: super.start is not a function"
        ],
        correctAnswer: 0,
        explanation: "Car overrides start(), but calls super.start() to reuse the parent's logic before adding ', Seatbelt buckled'.",
        hint: "super.methodName() invokes the parent class's version of that method.",
        hintCostXP: 5
      },
      {
        id: "js19-q3",
        type: "multiple_choice",
        title: "Classes under the Hood",
        prompt: "What is an ES6 class under the hood in JavaScript?",
        options: [
          "A completely separate memory architecture unrelated to prototypes",
          "Syntactic sugar built on top of JavaScript's prototype-based inheritance",
          "A compiled C++ binary structure",
          "A plain JSON object"
        ],
        correctAnswer: 1,
        explanation: "ES6 classes provide a cleaner, more readable syntax, but under the hood they still create standard constructor functions and prototype chains.",
        hint: "It is syntactic sugar over prototypes.",
        hintCostXP: 5
      }
    ]
  },

  // JS-20: Synchronous vs Asynchronous
  {
    id: "quiz-javascript-js20",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js20-synchronous-vs-asynchronous",
    lessonCode: "JS-20",
    lessonTitle: "Async JavaScript: Blocking vs Non-Blocking & Single-Thread Concurrency",
    description: "Assess your understanding of blocking code, the single thread, and background Web APIs.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js20-q1",
        type: "multiple_choice",
        title: "Blocking Code",
        prompt: "What happens in a browser tab if a synchronous function runs a heavy calculation for 10 seconds?",
        options: [
          "The browser automatically moves it to another thread and UI stays responsive",
          "The entire page freezes, buttons stop responding, and animations halt because the main thread is blocked",
          "The calculation is paused and rescheduled for night time",
          "The browser restarts immediately"
        ],
        correctAnswer: 1,
        explanation: "Because JavaScript's main thread runs both your script and the UI rendering loop, heavy synchronous work blocks all user interactions and rendering.",
        hint: "Single thread means only one task can execute on the main thread at a time.",
        hintCostXP: 5
      },
      {
        id: "js20-q2",
        type: "code_output",
        title: "setTimeout with 0 Delay",
        prompt: "In what order are the numbers logged?",
        codeSnippet: `console.log(1);
setTimeout(() => console.log(2), 0);
console.log(3);`,
        language: "javascript",
        options: [
          "1, 2, 3",
          "1, 3, 2",
          "2, 1, 3",
          "3, 1, 2"
        ],
        correctAnswer: 1,
        explanation: "1 logs first. setTimeout registers a timer with the browser and queues the callback in the task queue. 3 logs synchronously. Only after the call stack is empty does 2 execute.",
        hint: "Synchronous code on the call stack always runs before task queue callbacks.",
        hintCostXP: 5
      },
      {
        id: "js20-q3",
        type: "multiple_choice",
        title: "Web APIs Role",
        prompt: "Where do timers (setTimeout) and network calls (fetch) actually wait while your JavaScript code continues running?",
        options: [
          "Inside the Call Stack",
          "In the browser/runtime Web APIs environment outside the JavaScript engine thread",
          "In the CPU register",
          "In the HTML document"
        ],
        correctAnswer: 1,
        explanation: "The browser's host environment (Web APIs in browsers, libuv in Node.js) handles waiting for timers and network packets in background threads without blocking JavaScript.",
        hint: "The host runtime provides background threads for waiting operations.",
        hintCostXP: 5
      }
    ]
  },

  // JS-22: Async/Await
  {
    id: "quiz-javascript-js22",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js22-async-await",
    lessonCode: "JS-22",
    lessonTitle: "Async/Await: Writing Asynchronous Code That Reads Like Synchronous Code",
    description: "Verify your ability to use async/await, handle errors with try/catch, and avoid sequential waterfalls.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js22-q1",
        type: "multiple_choice",
        title: "Async Function Return Value",
        prompt: "What does an 'async' function ALWAYS return, even if you return a plain value like return 42?",
        options: [
          "A number (42)",
          "A Promise that resolves to that value",
          "A callback function",
          "undefined"
        ],
        correctAnswer: 1,
        explanation: "Every async function automatically wraps its return value in a Promise (e.g. Promise.resolve(42)).",
        hint: "Async functions always return Promises.",
        hintCostXP: 5
      },
      {
        id: "js22-q2",
        type: "multiple_choice",
        title: "Parallel Execution with Promise.all",
        prompt: "If you need to fetch user, products, and orders at the same time and none depend on each other, how should you execute them?",
        options: [
          "await each one sequentially: await getUser(); await getProducts(); await getOrders();",
          "Run them concurrently with Promise.all([getUser(), getProducts(), getOrders()])",
          "Create a while loop that waits for all three",
          "Use three separate script tags"
        ],
        correctAnswer: 1,
        explanation: "Awaiting them one by one creates an async waterfall where each request waits for the previous one. Promise.all initiates all three simultaneously.",
        hint: "Promise.all fires independent asynchronous tasks in parallel.",
        hintCostXP: 5
      },
      {
        id: "js22-q3",
        type: "code_output",
        title: "Error Catching in async/await",
        prompt: "What will this async function print?",
        codeSnippet: `async function test() {
  try {
    await Promise.reject(new Error(\"Network timeout\"));
    console.log(\"Success!\");
  } catch (err) {
    console.log(\"Caught: \" + err.message);
  }
}
test();`,
        language: "javascript",
        options: [
          "'Success!'",
          "'Caught: Network timeout'",
          "Uncaught Promise Rejection error",
          "Nothing is printed"
        ],
        correctAnswer: 1,
        explanation: "awaiting a rejected promise throws an exception inside the async function, jumping directly into the catch block.",
        hint: "await unwraps rejections as standard thrown exceptions.",
        hintCostXP: 5
      }
    ]
  },

  // JS-24: Error Handling
  {
    id: "quiz-javascript-js24",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js24-error-handling",
    lessonCode: "JS-24",
    lessonTitle: "Error Handling: Defending Against Crashes with try, catch & finally",
    description: "Test your skills with structured error handling, finally blocks, and throwing custom errors.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js24-q1",
        type: "code_output",
        title: "The finally Block",
        prompt: "What is logged by this code with a finally block?",
        codeSnippet: `let log = \"\";
try {
  log += \"1\";
  throw new Error(\"Oops\");
} catch {
  log += \"2\";
} finally {
  log += \"3\";
}
console.log(log);`,
        language: "javascript",
        options: [
          "'123'",
          "'12'",
          "'13'",
          "'23'"
        ],
        correctAnswer: 0,
        explanation: "1 is added. The error is thrown and caught, adding 2. The finally block ALWAYS runs regardless of whether an error occurred, adding 3. Result: '123'.",
        hint: "The finally block executes no matter what happens in try or catch.",
        hintCostXP: 5
      },
      {
        id: "js24-q2",
        type: "multiple_choice",
        title: "Throwing Custom Errors",
        prompt: "What is the best practice when throwing an error in JavaScript?",
        options: [
          "throw \"Something broke\"",
          "throw new Error(\"Something broke\")",
          "throw 404",
          "throw false"
        ],
        correctAnswer: 1,
        explanation: "Throwing an instance of Error (or a subclass) captures the stack trace, filename, and line number where the error occurred, making debugging much easier.",
        hint: "Error objects contain valuable stack traces.",
        hintCostXP: 5
      },
      {
        id: "js24-q3",
        type: "multiple_choice",
        title: "Swallowed Errors Anti-Pattern",
        prompt: "Why is an empty catch block (try { ... } catch (e) {}) considered a dangerous anti-pattern?",
        options: [
          "It causes JavaScript to run out of memory",
          "It silently swallows errors, hiding crashes and making bugs almost impossible to diagnose",
          "It makes the page reload automatically",
          "Catch blocks must always contain a return statement"
        ],
        correctAnswer: 1,
        explanation: "Swallowing errors hides failures without logging them. When something breaks, your application behaves unpredictably and there are zero logs to explain why.",
        hint: "Always log or handle errors so you know when things go wrong.",
        hintCostXP: 5
      }
    ]
  },

  // JS-25: ES Modules
  {
    id: "quiz-javascript-js25",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js25-es-modules",
    lessonCode: "JS-25",
    lessonTitle: "ES Modules: Organizing Code with import, export & Scope Boundaries",
    description: "Evaluate your understanding of ES Modules, named exports vs default exports, and module scope.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js25-q1",
        type: "multiple_choice",
        title: "Named vs Default Exports",
        prompt: "How many default exports can a single JavaScript module file have?",
        options: [
          "As many as needed",
          "At most one",
          "Exactly two",
          "Zero, default exports are deprecated"
        ],
        correctAnswer: 1,
        explanation: "A module can have multiple named exports, but at most ONE default export (export default ...).",
        hint: "Think: each file has only one 'default' thing.",
        hintCostXP: 5
      },
      {
        id: "js25-q2",
        type: "multiple_choice",
        title: "Importing Named Exports",
        prompt: "Which syntax imports a named export calculateTax from './math.js'?",
        options: [
          "import calculateTax from './math.js'",
          "import { calculateTax } from './math.js'",
          "require('./math.js').calculateTax",
          "import * as calculateTax from './math.js'"
        ],
        correctAnswer: 1,
        explanation: "Named exports must be imported using curly braces: import { calculateTax } from './math.js'. Importing without curly braces imports the default export.",
        hint: "Named imports use curly braces: import { ... } from '...'",
        hintCostXP: 5
      },
      {
        id: "js25-q3",
        type: "multiple_choice",
        title: "Module Scope",
        prompt: "If you declare a variable const API_KEY = 'secret' at the top level of an ES module, is it accessible from other files automatically?",
        options: [
          "Yes, all top-level variables are automatically global",
          "No, top-level variables in an ES module are scoped to that file unless explicitly exported",
          "Yes, but only in the same folder",
          "Only in Node.js, not in browsers"
        ],
        correctAnswer: 1,
        explanation: "ES Modules have their own module scope. Variables declared inside a module are private to that file unless exported with the export keyword.",
        hint: "Modules prevent global namespace pollution by keeping everything private by default.",
        hintCostXP: 5
      }
    ]
  },

  // JS-26: Working with JSON
  {
    id: "quiz-javascript-js26",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js26-working-with-json",
    lessonCode: "JS-26",
    lessonTitle: "Working with JSON: Serialization, Parsing & API Data Transfer",
    description: "Check your knowledge of JSON format rules, JSON.stringify, and safe JSON.parse.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js26-q1",
        type: "multiple_choice",
        title: "JSON Quotes Requirement",
        prompt: "In valid JSON format, how must keys and string values be quoted?",
        options: [
          "With single quotes ('key': 'value')",
          "With double quotes (\"key\": \"value\")",
          "Keys must have no quotes at all",
          "Any quotes or backticks are valid"
        ],
        correctAnswer: 1,
        explanation: "JSON specification strictly requires double quotes (\"...\") for both keys and string values. Single quotes cause a SyntaxError during JSON.parse.",
        hint: "JSON strictly forbids single quotes.",
        hintCostXP: 5
      },
      {
        id: "js26-q2",
        type: "code_output",
        title: "Stripped Values in JSON.stringify",
        prompt: "What happens to properties with value 'undefined' when serialized with JSON.stringify?",
        codeSnippet: `const user = { name: \"Maya\", role: undefined };
const json = JSON.stringify(user);
console.log(json);`,
        language: "javascript",
        options: [
          "'{\"name\":\"Maya\",\"role\":undefined}'",
          "'{\"name\":\"Maya\",\"role\":null}'",
          "'{\"name\":\"Maya\"}'",
          "TypeError: Cannot stringify undefined"
        ],
        correctAnswer: 2,
        explanation: "JSON has no representation for undefined (or functions/symbols). JSON.stringify strips these properties from objects entirely.",
        hint: "undefined is omitted from the resulting JSON string.",
        hintCostXP: 5
      },
      {
        id: "js26-q3",
        type: "multiple_choice",
        title: "Guarding JSON.parse",
        prompt: "Why should you always wrap JSON.parse(incomingString) inside a try/catch block?",
        options: [
          "JSON.parse runs asynchronously and requires a Promise",
          "Malformed or corrupted JSON strings will throw a fatal SyntaxError that crashes the application if uncaught",
          "JSON.parse deletes original objects",
          "try/catch speeds up parsing by 50%"
        ],
        correctAnswer: 1,
        explanation: "If the input string is not valid JSON (e.g., truncated network payload or HTML error page), JSON.parse throws a SyntaxError. try/catch protects your app from crashing.",
        hint: "Invalid JSON throws an exception immediately.",
        hintCostXP: 5
      }
    ]
  },

  // JS-27: The Fetch API
  {
    id: "quiz-javascript-js27",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js27-the-fetch-api",
    lessonCode: "JS-27",
    lessonTitle: "The Fetch API: Making Network Requests & Consuming REST APIs",
    description: "Verify your ability to send HTTP requests, check res.ok, and parse responses.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js27-q1",
        type: "multiple_choice",
        title: "Fetch Rejection Behavior",
        prompt: "When does the Promise returned by fetch() REJECT?",
        options: [
          "Whenever the server returns HTTP 404 Not Found or HTTP 500 Server Error",
          "Only when there is a network failure or DNS lookup failure that prevented the request from completing",
          "Whenever the JSON response is empty",
          "fetch() never rejects under any circumstances"
        ],
        correctAnswer: 1,
        explanation: "fetch() only rejects on network errors (e.g. no internet connection, blocked CORS, DNS failure). It resolves normally even on 404 or 500 error pages.",
        hint: "HTTP error codes are still valid server responses, so fetch fulfills.",
        hintCostXP: 5
      },
      {
        id: "js27-q2",
        type: "code_output",
        title: "Checking response.ok",
        prompt: "What does response.ok evaluate to when a request receives an HTTP 200 OK vs HTTP 404 Not Found?",
        codeSnippet: `// If res1 is 200 and res2 is 404:
console.log(res1.ok + \" | \" + res2.ok);`,
        language: "javascript",
        options: [
          "'true | false'",
          "'true | true'",
          "'false | false'",
          "'200 | 404'"
        ],
        correctAnswer: 0,
        explanation: "response.ok is a boolean shorthand that is true for HTTP status codes in the 200-299 range, and false for all other statuses (like 404 or 500).",
        hint: "res.ok is true only for successful 2xx status codes.",
        hintCostXP: 5
      },
      {
        id: "js27-q3",
        type: "multiple_choice",
        title: "Sending JSON with POST",
        prompt: "When sending a POST request with fetch(), which header tells the server that the request body is JSON?",
        options: [
          "'Accept': 'text/html'",
          "'Content-Type': 'application/json'",
          "'Authorization': 'Bearer JSON'",
          "'Encoding': 'utf-8'"
        ],
        correctAnswer: 1,
        explanation: "The header 'Content-Type': 'application/json' informs the server how to parse the incoming request body.",
        hint: "Content-Type specifies the format of the payload.",
        hintCostXP: 5
      }
    ]
  },

  // JS-29: Events and Delegation
  {
    id: "quiz-javascript-js29",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js29-events-and-delegation",
    lessonCode: "JS-29",
    lessonTitle: "Browser Events: Reacting to User Interaction & Event Delegation",
    description: "Test your understanding of event listeners, event bubbling, and event delegation.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js29-q1",
        type: "multiple_choice",
        title: "Event Bubbling",
        prompt: "What is 'event bubbling' in the browser DOM?",
        options: [
          "Events are deleted after 5 seconds",
          "When an event triggers on an element, it propagates upward through its parent elements up to the document root",
          "Events only trigger if the user double-clicks",
          "Events create animation bubbles on the screen"
        ],
        correctAnswer: 1,
        explanation: "Event bubbling means an event fires on the target element first, and then bubbles up through all of its ancestors in the DOM tree.",
        hint: "Think of air bubbles rising upward through water.",
        hintCostXP: 5
      },
      {
        id: "js29-q2",
        type: "multiple_choice",
        title: "Event Delegation Advantage",
        prompt: "Why is event delegation useful when dealing with a list that has 1,000 dynamic items?",
        options: [
          "It attaches 1,000 separate listeners so every item is independent",
          "It attaches a single listener to the parent element, saving memory and handling newly added items automatically",
          "It forces the browser to disable mouse clicks",
          "It prevents the user from scrolling the list"
        ],
        correctAnswer: 1,
        explanation: "Attaching one listener to the parent container is much more memory-efficient and automatically handles newly added child elements without having to attach new listeners.",
        hint: "One listener on the parent instead of 1,000 listeners on children.",
        hintCostXP: 5
      },
      {
        id: "js29-q3",
        type: "multiple_choice",
        title: "event.target vs event.currentTarget",
        prompt: "In an event listener handler, what is event.target?",
        options: [
          "The element that currently has the addEventListener attached to it",
          "The actual element that was clicked or triggered the event",
          "The next element in the HTML document",
          "The browser window title"
        ],
        correctAnswer: 1,
        explanation: "event.target is the element that originated the event (e.g. the specific button clicked). event.currentTarget is the element listening to the event.",
        hint: "target is the specific item that took the click.",
        hintCostXP: 5
      }
    ]
  },

  // JS-30: Browser Storage and Debugging
  {
    id: "quiz-javascript-js30",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js30-browser-storage-and-debugging",
    lessonCode: "JS-30",
    lessonTitle: "Browser Storage & Debugging: LocalStorage, SessionStorage & DevTools",
    description: "Check your mastery of browser persistence, storage limitations, and DevTools debugging.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js30-q1",
        type: "multiple_choice",
        title: "localStorage vs sessionStorage",
        prompt: "How does localStorage differ from sessionStorage?",
        options: [
          "localStorage data persists even after closing and reopening the browser; sessionStorage is cleared when the tab closes",
          "sessionStorage stores up to 100GB; localStorage only stores 100 bytes",
          "localStorage can only store numbers; sessionStorage stores strings",
          "They have the exact same lifetime"
        ],
        correctAnswer: 0,
        explanation: "localStorage data has no expiration date and persists across restarts. sessionStorage is isolated to the specific browser tab and is cleared when that tab is closed.",
        hint: "localStorage is permanent; sessionStorage lives only for that session tab.",
        hintCostXP: 5
      },
      {
        id: "js30-q2",
        type: "code_output",
        title: "Storing Objects in LocalStorage",
        prompt: "What happens if you run localStorage.setItem('user', { name: 'Dan' }) without JSON.stringify?",
        codeSnippet: `// What string does localStorage actually store?
console.log(String({ name: \"Dan\" }));`,
        language: "javascript",
        options: [
          "'{\"name\":\"Dan\"}'",
          "'[object Object]'",
          "SyntaxError",
          "null"
        ],
        correctAnswer: 1,
        explanation: "localStorage only stores strings. If you pass an object directly, JavaScript converts it using toString(), storing the useless string '[object Object]'. Always use JSON.stringify!",
        hint: "Objects default to '[object Object]' when converted to strings.",
        hintCostXP: 5
      },
      {
        id: "js30-q3",
        type: "multiple_choice",
        title: "The debugger Statement",
        prompt: "What does placing the 'debugger;' keyword inside your JavaScript code do when DevTools is open?",
        options: [
          "It deletes all variables currently in memory",
          "It pauses script execution like a breakpoint so you can step through lines and inspect variables",
          "It prints the entire program to the printer",
          "It automatically fixes any syntax errors"
        ],
        correctAnswer: 1,
        explanation: "The debugger; statement acts as a code-defined breakpoint. If browser DevTools is open, execution pauses at that line, allowing you to inspect the call stack, scope, and variable values.",
        hint: "It pauses execution like a breakpoint.",
        hintCostXP: 5
      }
    ]
  }
];

// Read current javascript-quizzes.ts
let fileText = fs.readFileSync('lib/quiz/javascript-quizzes.ts', 'utf8');

// Find closing bracket of JAVASCRIPT_MODULE_QUIZZES array: `];` at end of file
const lastBracketIdx = fileText.lastIndexOf('];');
if (lastBracketIdx === -1) {
  console.error('Could not find closing bracket in javascript-quizzes.ts');
  process.exit(1);
}

// Format the new quizzes JSON cleanly without trailing comma issues
const formattedQuizzes = NEW_QUIZZES.map(q => JSON.stringify(q, null, 2)).join(',\n\n');

// Splice into fileText before `];`
const updatedText = fileText.slice(0, lastBracketIdx) + ',\n\n' + formattedQuizzes + '\n' + fileText.slice(lastBracketIdx);

fs.writeFileSync('lib/quiz/javascript-quizzes.ts', updatedText, 'utf8');
console.log(`Successfully appended ${NEW_QUIZZES.length} new curated quizzes to javascript-quizzes.ts`);
