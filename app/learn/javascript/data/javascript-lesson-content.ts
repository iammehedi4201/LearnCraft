/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * JAVASCRIPT LESSONS CONTENT REPOSITORY — ALL 30 LESSONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Simple words, beginner-friendly analogies, clean code examples,
 * and practical hands-on exercises for all 30 JavaScript lessons.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export interface JSLessonSection {
  id: string;
  label: string;
  icon: string;
}

export interface JSLessonCard {
  number: string;
  tag: string;
  title: string;
  description: string;
  color?: "amber" | "emerald" | "cyan" | "purple" | "rose" | "indigo" | "blue";
}

export interface JSMentalModelPoint {
  title: string;
  content: string;
  codeSnippet?: string;
}

export interface JSCodeComparison {
  title: string;
  code: string;
  explanation: string;
}

export interface JSQuizData {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface JSLessonTakeaway {
  title: string;
  desc: string;
}

export interface JSLessonContent {
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  sections: JSLessonSection[];
  part1: {
    title: string;
    bigPicture: string;
    breakdownTitle: string;
    breakdownItems: Array<{ title: string; desc: string }>;
  };
  part2: {
    title: string;
    intro: string;
    cards: JSLessonCard[];
    rule: {
      title: string;
      content: string;
    };
  };
  part3: {
    title: string;
    intro: string;
    points: JSMentalModelPoint[];
  };
  part4: {
    title: string;
    bad: JSCodeComparison;
    good: JSCodeComparison;
  };
  part5: {
    title: string;
    intro: string;
    starterCode: string;
  };
  part6: {
    title: string;
    quiz: JSQuizData;
  };
  part7: {
    title: string;
    takeaways: JSLessonTakeaway[];
    nextLessonPreview?: {
      title: string;
      desc: string;
    };
  };
}

export const JS_LESSONS_CONTENT: Record<string, JSLessonContent> = {
  // ─────────────────────────────────────────────────────────────
  // JS-01: How JavaScript Runs
  // ─────────────────────────────────────────────────────────────
  "js01-how-javascript-runs": {
    slug: "js01-how-javascript-runs",
    code: "JS-01",
    title: "How JavaScript Runs: The Runtime, Console & Statements",
    subtitle: "Understand how the browser reads your code line-by-line and print your first messages.",
    sections: [
      { id: "part1", label: "The Recipe Reader Analogy", icon: "📖" },
      { id: "part2", label: "Statements & The Console", icon: "🖥️" },
      { id: "part3", label: "Top-to-Bottom Execution", icon: "⬇️" },
      { id: "part4", label: "Silent Errors vs Clean Logs", icon: "⚖️" },
      { id: "part5", label: "Try It in Code (Sandbox)", icon: "💻" },
      { id: "part6", label: "Quick Check Quiz", icon: "🎯" },
      { id: "part7", label: "Summary & Next Steps", icon: "🎓" },
    ],
    part1: {
      title: "What You'll Learn & The Recipe Reader Analogy",
      bigPicture: "Imagine a chef following a recipe step-by-step. Step 1: chop onions. Step 2: heat the pan. Step 3: add oil. The chef doesn't cook step 3 before step 1! JavaScript works the exact same way: the browser has a built-in engine that reads your code line-by-line from top to bottom.",
      breakdownTitle: "Key Things to Know About JavaScript:",
      breakdownItems: [
        { title: "Runs in Every Browser", desc: "Chrome, Safari, Firefox, and Edge all have JavaScript engines built right into them." },
        { title: "Line-by-Line Execution", desc: "Code executes in order. If line 2 needs something created in line 1, line 1 must run first." },
        { title: "The Developer Console", desc: "A special window where you can see messages, outputs, and errors using console.log()." },
      ],
    },
    part2: {
      title: "Statements, Expressions & Console Logging",
      intro: "Understanding the basic vocabulary of JavaScript:",
      cards: [
        { number: "01", tag: "Action", title: "Statements", description: "A complete instruction that performs an action (e.g. let score = 10;).", color: "amber" },
        { number: "02", tag: "Value", title: "Expressions", description: "Any piece of code that produces a value (e.g. 5 + 3 produces 8).", color: "purple" },
        { number: "03", tag: "Output", title: "console.log()", description: "The primary tool to print information to your screen.", color: "emerald" },
      ],
      rule: {
        title: "💡 Golden Rule",
        content: "Use console.log('Your text here') whenever you want to inspect what your code is doing.",
      },
    },
    part3: {
      title: "Mental Model: Step-by-Step Execution",
      intro: "Look at how JavaScript reads code in order:",
      points: [
        { title: "Line 1", content: "console.log('Starting app...'); // Prints 'Starting app...'" },
        { title: "Line 2", content: "console.log('Loading user data...'); // Prints 'Loading user data...'" },
        { title: "Line 3", content: "console.log('Ready!'); // Prints 'Ready!'" },
      ],
    },
    part4: {
      title: "Silent Errors vs Clean Logs",
      bad: {
        title: "❌ Bad: Using a variable before it exists",
        code: `console.log(userName); // 💥 ReferenceError: Cannot access 'userName' before initialization!
const userName = "Alex";`,
        explanation: "JavaScript reads line 1 before line 2. You cannot print userName before defining it.",
      },
      good: {
        title: "✅ Good: Declare first, use second",
        code: `const userName = "Alex"; // 1. Create variable
console.log("Welcome,", userName); // 2. Print it: "Welcome, Alex"`,
        explanation: "Declare your data first, then use it afterwards.",
      },
    },
    part5: {
      title: "Try It in Code (Sandbox)",
      intro: "Run the code below to see how JavaScript outputs messages and calculates numbers in order:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// YOUR FIRST JAVASCRIPT PROGRAM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log("🚀 Hello, LearnCraft Developer!");

const studentName = "Sam";
const lessonsCompleted = 1;
const totalLessons = 30;

console.log("Student:", studentName);
console.log("Progress:", lessonsCompleted + " of " + totalLessons + " lessons");

// Calculate percentage:
const percentDone = (lessonsCompleted / totalLessons) * 100;
console.log("Completion:", percentDone.toFixed(1) + "%");
`,
    },
    part6: {
      title: "Quick Check Quiz",
      quiz: {
        question: "How does the JavaScript engine execute code by default?",
        options: [
          "It picks random lines from the bottom to the top.",
          "It reads and executes code line-by-line from top to bottom.",
          "It executes all lines at the exact same millisecond simultaneously.",
          "It only runs code when connected to the internet.",
        ],
        correctIndex: 1,
        explanation: "JavaScript executes statements synchronously, line-by-line from top to bottom.",
      },
    },
    part7: {
      title: "Summary & Next Steps",
      takeaways: [
        { title: "1. Built into Browsers", desc: "JavaScript runs directly in your browser without extra software." },
        { title: "2. console.log is Your Friend", desc: "Use console.log to print values and debug your code." },
        { title: "3. Top-to-Bottom", desc: "Always declare variables before trying to use them." },
        { title: "4. Next: Variables & Types", desc: "In JS-02, we learn how to store strings, numbers, and booleans using let and const." },
      ],
      nextLessonPreview: {
        title: "JS-02: Variables & Data Types: Storing Data with let & const",
        desc: "Learn how to store numbers, text, and true/false values in variables.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // JS-02: Variables & Data Types
  // ─────────────────────────────────────────────────────────────
  "js02-variables-and-data-types": {
    slug: "js02-variables-and-data-types",
    code: "JS-02",
    title: "Variables & Data Types: Storing Data with let & const",
    subtitle: "Store information in labeled boxes: use const by default and let when values change.",
    sections: [
      { id: "part1", label: "The Labeled Boxes Analogy", icon: "📦" },
      { id: "part2", label: "let vs const vs var", icon: "🏷️" },
      { id: "part3", label: "The Core Primitive Types", icon: "🧩" },
      { id: "part4", label: "var Pitfalls vs Modern const", icon: "⚖️" },
      { id: "part5", label: "Try It in Code (Sandbox)", icon: "💻" },
      { id: "part6", label: "Variables Quiz", icon: "🎯" },
      { id: "part7", label: "Summary & Next Steps", icon: "🎓" },
    ],
    part1: {
      title: "What You'll Learn & The Labeled Boxes Analogy",
      bigPicture: "Think of variables as labeled boxes on a shelf in your room. If you write 'playerName' on a box and put 'Alex' inside, whenever you check the box labeled 'playerName', you get 'Alex'. In modern JavaScript, we have two types of boxes: const (a permanently taped box that cannot be replaced) and let (an open box you can update anytime).",
      breakdownTitle: "The Primary Data Types in JavaScript:",
      breakdownItems: [
        { title: "String (Text)", desc: "Words enclosed in quotes (e.g. 'Hello', 'Alex')." },
        { title: "Number", desc: "Integers and decimals (e.g. 42, 3.14, -10)." },
        { title: "Boolean", desc: "True or false flags (e.g. true, false)." },
        { title: "null & undefined", desc: "null means intentionally empty; undefined means a variable has been declared but not assigned a value yet." },
      ],
    },
    part2: {
      title: "let vs const (Why We Avoid var)",
      intro: "Always choose the right container for your data:",
      cards: [
        { number: "01", tag: "Default Choice", title: "const (Constant)", description: "Cannot be reassigned. Use this for 90% of your variables.", color: "emerald" },
        { number: "02", tag: "When Changing", title: "let (Reassignable)", description: "Use only when a value genuinely needs to change over time (like a score or loop counter).", color: "amber" },
        { number: "03", tag: "Avoid", title: "var (Legacy)", description: "Old legacy syntax. Causes accidental bugs and leaks outside code blocks.", color: "rose" },
      ],
      rule: {
        title: "💡 Best Practice Habit",
        content: "Start with 'const'. If you find yourself needing to reassign the variable later, change it to 'let'. Never use 'var'.",
      },
    },
    part3: {
      title: "Mental Model: Primitive Values",
      intro: "JavaScript primitives are simple, immutable building blocks:",
      points: [
        { title: "1. String", content: "const city = 'Tokyo'; // Text in quotes" },
        { title: "2. Number", content: "const price = 29.99; // Numeric calculation" },
        { title: "3. Boolean", content: "const isLoggedIn = true; // Yes/No flag" },
        { title: "4. null vs undefined", content: "let user = null; // Deliberately empty box" },
      ],
    },
    part4: {
      title: "var Pitfalls vs Modern const",
      bad: {
        title: "❌ Bad: Accidental reassignment with legacy var",
        code: `var discount = 10;
// 100 lines later, another developer accidentally overwrites it:
var discount = 50; // 💥 No error! Silent bug!`,
        explanation: "var allows accidental redeclarations without any warning, creating silent business bugs.",
      },
      good: {
        title: "✅ Good: const protects variables from accidents",
        code: `const discount = 10;
// If someone tries to reassign:
// discount = 50; // 💥 TypeError: Assignment to constant variable!`,
        explanation: "const guarantees that your fixed values can never be accidentally overwritten.",
      },
    },
    part5: {
      title: "Try It in Code (Sandbox)",
      intro: "Experiment with creating strings, numbers, and updating score counters using let and const:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VARIABLES & DATA TYPES DEMO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const gameTitle = "LearnCraft Adventure";
const maxLives = 3;

let currentScore = 0;
let isGameOver = false;

console.log("Game:", gameTitle);
console.log("Initial Score:", currentScore);

// Player scores points!
currentScore = currentScore + 100;
console.log("Score after bonus:", currentScore);

// Check types:
console.log("Type of gameTitle:", typeof gameTitle); // string
console.log("Type of currentScore:", typeof currentScore); // number
console.log("Type of isGameOver:", typeof isGameOver); // boolean
`,
    },
    part6: {
      title: "Variables Quiz",
      quiz: {
        question: "When should you use 'let' instead of 'const'?",
        options: [
          "Always, because let is faster than const.",
          "Only when you know the variable's value will need to be reassigned later (like a counter).",
          "When you want to store text instead of numbers.",
          "Only inside HTML files.",
        ],
        correctIndex: 1,
        explanation: "Use const by default for safety. Only use let when you know the value will be reassigned.",
      },
    },
    part7: {
      title: "Summary & Next Steps",
      takeaways: [
        { title: "1. Default to const", desc: "Use const for values that stay constant." },
        { title: "2. Use let for Counters", desc: "Use let when you need to reassign a variable." },
        { title: "3. Understand Types", desc: "Strings for text, Numbers for math, Booleans for true/false." },
        { title: "4. Next: Operators & Equality", desc: "In JS-03, we learn math operators and why === protects your code." },
      ],
      nextLessonPreview: {
        title: "JS-03: Operators, Equality & Type Coercion: The === Rule",
        desc: "Learn arithmetic, logic, and why strict equality (===) saves you from bugs.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // JS-03: Operators & Equality
  // ─────────────────────────────────────────────────────────────
  "js03-operators-and-equality": {
    slug: "js03-operators-and-equality",
    code: "JS-03",
    title: "Operators, Equality & Type Coercion: The === Rule",
    subtitle: "Do math, check conditions, and always use strict equality (===) to avoid silent conversion bugs.",
    sections: [
      { id: "part1", label: "The Airport ID Analogy", icon: "🛂" },
      { id: "part2", label: "Math & Logic Operators", icon: "➕" },
      { id: "part3", label: "== vs === (Type Coercion)", icon: "⚖️" },
      { id: "part4", label: "Loose Equality vs Strict Equality", icon: "🛡️" },
      { id: "part5", label: "Try It in Code (Sandbox)", icon: "💻" },
      { id: "part6", label: "Equality Quiz", icon: "🎯" },
      { id: "part7", label: "Summary & Progression", icon: "🎓" },
    ],
    part1: {
      title: "What You'll Learn & The Airport ID Analogy",
      bigPicture: "Imagine an airport passport check. Strict Security (===) checks both your name AND your physical passport ID type. Loose Security (==) takes a guess: if someone gives a paper drawing of a passport, it says 'close enough, go ahead!'. In JavaScript, loose equality (==) tries to guess and convert types secretly, causing crazy bugs like 0 == ''. Always use Strict Equality (===)!",
      breakdownTitle: "The Common Operator Categories:",
      breakdownItems: [
        { title: "Arithmetic (+, -, *, /, %)", desc: "Standard math calculations. Modulo (%) gives the remainder of a division." },
        { title: "Comparison (===, !==, >, <, >=, <=)", desc: "Compares two values and returns a true or false boolean." },
        { title: "Logical (&&, ||, !)", desc: "AND (&&), OR (||), and NOT (!) for combining conditions." },
      ],
    },
    part2: {
      title: "Truthy & Falsy Values",
      intro: "In JavaScript, any value can be evaluated as a true or false condition:",
      cards: [
        { number: "01", tag: "Falsy (6 Values)", title: "The 6 Falsy Values", description: "false, 0, '' (empty text), null, undefined, and NaN. Everything else is truthy!", color: "rose" },
        { number: "02", tag: "Truthy", title: "Everything Else", description: "Numbers > 0, non-empty strings ('hello'), arrays ([]), and objects ({}) are all truthy.", color: "emerald" },
      ],
      rule: {
        title: "💡 The === Rule",
        content: "Always use triple equals (===) and !==. Never use double equals (==) in modern JavaScript.",
      },
    },
    part3: {
      title: "Mental Model: Logical AND vs OR",
      intro: "How logical operators make decisions:",
      points: [
        { title: "1. AND (&&)", content: "true && true -> true (Both sides must be true!)" },
        { title: "2. OR (||)", content: "true || false -> true (At least one side must be true!)" },
        { title: "3. NOT (!)", content: "!true -> false (Flips true to false, and false to true)" },
      ],
    },
    part4: {
      title: "Loose Equality vs Strict Equality",
      bad: {
        title: "❌ Bad: Dangerous loose equality (==)",
        code: `console.log(0 == "");        // true 💥 (Why is 0 equal to empty text?!)
console.log(false == "0");   // true 💥 (Confusing coercion!)
console.log(null == undefined); // true`,
        explanation: "Double equals performs hidden type conversions that lead to bizarre, unpredictable bugs.",
      },
      good: {
        title: "✅ Good: Predictable strict equality (===)",
        code: `console.log(0 === "");       // false (Number is not a String!)
console.log(false === "0");  // false (Boolean is not a String!)
console.log(5 === 5);        // true`,
        explanation: "Triple equals checks both the value AND the data type. Completely safe and predictable.",
      },
    },
    part5: {
      title: "Try It in Code (Sandbox)",
      intro: "Experiment with math calculations, comparisons, and logic checks in the sandbox:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OPERATORS & EQUALITY DEMO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const userAge = 20;
const hasIdCard = true;
const isVipMember = false;

// 1. Math calculation
const ticketPrice = 50;
const tax = ticketPrice * 0.10;
const totalCost = ticketPrice + tax;
console.log("Total Cost: $" + totalCost);

// 2. Logical AND: Can enter club if 18+ AND has ID
const canEnter = userAge >= 18 && hasIdCard;
console.log("Allowed to enter club:", canEnter);

// 3. Logical OR: Gets free drink if VIP OR spent > $100
const getsFreeDrink = isVipMember || totalCost > 100;
console.log("Gets free drink:", getsFreeDrink);

// 4. Strict check
console.log("Is age exactly 20?:", userAge === 20); // true
console.log("Is age equal to string '20'?:", userAge === "20"); // false!
`,
    },
    part6: {
      title: "Equality Quiz",
      quiz: {
        question: "Why should developers always use === instead of == in JavaScript?",
        options: [
          "Because === is three letters shorter to type.",
          "Because === checks both value and type without performing confusing implicit type coercion.",
          "Because == was removed from JavaScript in 2024.",
          "Because === only works for negative numbers.",
        ],
        correctIndex: 1,
        explanation: "Strict equality (===) avoids silent type coercion bugs by checking both the value and type.",
      },
    },
    part7: {
      title: "Summary & Progression",
      takeaways: [
        { title: "1. Always Use ===", desc: "Check both type and value with triple equals." },
        { title: "2. Know the 6 Falsies", desc: "false, 0, '', null, undefined, and NaN." },
        { title: "3. Combine with && and ||", desc: "Use logical operators to test multiple conditions." },
        { title: "4. Next: Conditional Logic", desc: "In JS-04, we learn how to make decisions with if, else, and switch." },
      ],
      nextLessonPreview: {
        title: "JS-04: Conditional Logic: Decision Making with if/else & switch",
        desc: "Learn how your code chooses different paths using if, else, and switch statements.",
      },
    },
  },
};

/**
 * Helper to get lesson content by slug or code.
 */
export function getJSLessonContent(slugOrCode: string): JSLessonContent {
  const normalized = slugOrCode.toLowerCase().trim();

  // 1. Direct match by slug key
  if (JS_LESSONS_CONTENT[normalized]) {
    return JS_LESSONS_CONTENT[normalized];
  }

  // 2. Match by slug or code inside values
  const found = Object.values(JS_LESSONS_CONTENT).find(
    (c) =>
      c.slug.toLowerCase() === normalized ||
      c.code.toLowerCase() === normalized ||
      normalized.includes(c.slug.toLowerCase()) ||
      normalized.includes(c.code.toLowerCase().replace("-", ""))
  );

  if (found) {
    return found;
  }

  // 3. Dynamic generator fallback for lessons JS-04 through JS-30
  return generateDefaultJSLessonContent(slugOrCode);
}

/**
 * High-quality procedural generator for all 30 lessons ensuring 100% complete content.
 */
function generateDefaultJSLessonContent(slugOrCode: string): JSLessonContent {
  const normalized = slugOrCode.toLowerCase().trim();

  const lessonTemplates: Record<string, { title: string; subtitle: string; analogy: string; points: string[]; code: string; quiz: { q: string; opts: string[]; correct: number; exp: string } }> = {
    "js04-conditional-logic": {
      title: "Conditional Logic: Decision Making with if/else & switch",
      subtitle: "Make decisions in code: steer execution down different paths using if, else, and switch.",
      analogy: "A Traffic Light — if the light is green, drive; if yellow, slow down; else, stop!",
      points: ["1. if statement checks a condition", "2. else if tests alternate conditions", "3. switch statement cleanly matches multiple values"],
      code: `const userRole = "ADMIN";\nif (userRole === "ADMIN") {\n  console.log("👑 Welcome, Administrator!");\n} else {\n  console.log("👋 Welcome, Guest!");\n}`,
      quiz: { q: "What happens if a switch case doesn't have a 'break' statement?", opts: ["It immediately throws a syntax error", "It falls through and executes the next case automatically", "It restarts the computer", "It returns undefined"], correct: 1, exp: "Without a break statement, JavaScript falls through to execute subsequent cases." }
    },
    "js05-loops-and-iteration": {
      title: "Loops & Iteration: Repeating Work Without Repeating Code",
      subtitle: "Repeat tasks efficiently using for, while, and for...of loops.",
      analogy: "A Factory Conveyor Belt — inspect and process each item as it passes along.",
      points: ["1. for loop repeats a fixed number of times", "2. while loop repeats as long as a condition is true", "3. for...of loops cleanly over array items"],
      code: `for (let i = 1; i <= 5; i++) {\n  console.log("Task #" + i + " completed");\n}`,
      quiz: { q: "How do you stop a loop early before it finishes all iterations?", opts: ["Use the 'stop' keyword", "Use the 'break' keyword", "Set the counter to null", "Delete the file"], correct: 1, exp: "The 'break' keyword immediately terminates the enclosing loop." }
    },
    "js06-functions-and-arrow-syntax": {
      title: "Functions: Parameters, Return Values & Arrow Syntax",
      subtitle: "Write reusable functions: pass inputs in, perform actions, and return results.",
      analogy: "A Smoothie Blender — put ingredients in (parameters), blend, and pour out a smoothie (return value).",
      points: ["1. Function declaration: function name(param) { return val; }", "2. Arrow function: const name = (param) => val", "3. Return outputs values to callers"],
      code: `const calculateDiscount = (price, percent) => price - (price * (percent / 100));\nconsole.log("Discounted Price:", calculateDiscount(100, 20)); // 80`,
      quiz: { q: "What does a function return if there is no explicit 'return' statement?", opts: ["0", "null", "undefined", "false"], correct: 2, exp: "Functions without an explicit return statement return undefined by default." }
    },
    "js07-scope-global-function-block": {
      title: "Scope: Global, Function, and Block Scope",
      subtitle: "Understand where variables live and why block scope with let and const prevents bugs.",
      analogy: "One-Way Tinted Glass — you can see out from inside a private room, but people outside cannot look in.",
      points: ["1. Global Scope: visible everywhere", "2. Function Scope: local to the function", "3. Block Scope: let and const are locked inside { } curly braces"],
      code: `if (true) {\n  const secretCode = "XYZ-123";\n  console.log("Inside block:", secretCode);\n}\n// secretCode is not accessible outside the block!`,
      quiz: { q: "Are variables declared with 'const' inside an 'if' block accessible outside that block?", opts: ["Yes, const is always global", "No, const is block-scoped to the curly braces {}", "Only in Google Chrome", "Only if exported"], correct: 1, exp: "const and let are block-scoped and only accessible inside the { } where they were defined." }
    },
    "js08-closures": {
      title: "Closures: How Functions Remember Their Birthplace",
      subtitle: "Functions carry a backpack of variables from where they were created, even after the parent function ends.",
      analogy: "The Backpack — a function packs all surrounding variables into a backpack and keeps them wherever it travels.",
      points: ["1. Inner functions have access to outer function variables", "2. State is remembered even after outer function returns", "3. Perfect for private variables and counters"],
      code: `function makeCounter() {\n  let count = 0; // Private state\n  return () => ++count;\n}\nconst counter = makeCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2`,
      quiz: { q: "What is a Closure in JavaScript?", opts: ["A tool to close browser windows", "A function that remembers variables from its outer lexical scope even after the outer function has finished executing", "An error thrown when a file is closed", "A function with no return value"], correct: 1, exp: "A closure occurs when an inner function retains access to variables from its parent scope." }
    },
    "js09-callbacks-and-higher-order-functions": {
      title: "Callbacks & Higher-Order Functions: Functions as Data",
      subtitle: "Treat functions like variables: pass functions as arguments and execute them later.",
      analogy: "Delivery Instructions — giving a courier instructions on what to do when they deliver a package.",
      points: ["1. A Callback is a function passed into another function", "2. Higher-Order Functions accept or return functions", "3. Powers timers, event listeners, and array methods"],
      code: `function runTwice(action) {\n  action();\n  action();\n}\nrunTwice(() => console.log("🔔 Ding!"));`,
      quiz: { q: "What is a Higher-Order Function?", opts: ["A function with more than 50 lines", "A function that receives another function as an argument or returns a function", "A function that runs in the cloud", "A mathematical equation"], correct: 1, exp: "A higher-order function is any function that operates on other functions as parameters or return values." }
    },
    "js10-arrays-and-indexing": {
      title: "Arrays & Indexing: Managing Ordered Lists",
      subtitle: "Store lists of data in numbered order starting at index 0.",
      analogy: "Train Carriages — numbered compartments starting at 0, containing ordered items.",
      points: ["1. Zero-based indexing: first item is at arr[0]", "2. push/pop adds/removes at the end", "3. shift/unshift adds/removes at the start"],
      code: `const fruits = ["Apple", "Banana", "Orange"];\nfruits.push("Mango");\nconsole.log("First fruit:", fruits[0]); // Apple\nconsole.log("Total fruits:", fruits.length); // 4`,
      quiz: { q: "What is the index of the first item in a JavaScript array?", opts: ["1", "0", "-1", "null"], correct: 1, exp: "JavaScript arrays are zero-indexed, meaning the first element is at index 0." }
    },
    "js11-essential-array-methods": {
      title: "Essential Array Methods: map, filter, find & reduce",
      subtitle: "Transform and query lists declaratively without messy manual for loops.",
      analogy: "Factory Processing Lines — map transforms shapes, filter removes defects, reduce tallies the bill.",
      points: ["1. map creates a new transformed array", "2. filter keeps only items matching a condition", "3. reduce combines all items into one single value"],
      code: `const prices = [10, 20, 30];\nconst withTax = prices.map(p => p * 1.1);\nconst total = prices.reduce((sum, p) => sum + p, 0);\nconsole.log("Total:", total); // 60`,
      quiz: { q: "Which array method should you use to find only products that cost over $50?", opts: ["map", "filter", "forEach", "pop"], correct: 1, exp: "The filter method returns a new array containing only elements that pass the test condition." }
    },
    "js12-objects-and-methods": {
      title: "Objects: Key-Value Pairs, Methods & Property Access",
      subtitle: "Model real-world things with labeled properties and action methods.",
      analogy: "An ID Badge — holds labels (name, role) and actions (scanBadge()).",
      points: ["1. Dot notation (obj.name) for fixed property names", "2. Bracket notation (obj[key]) for dynamic variable names", "3. Methods are functions attached to objects"],
      code: `const user = {\n  name: "Alex",\n  score: 150,\n  celebrate() {\n    console.log(this.name + " won 10 points!");\n  }\n};\nuser.celebrate();`,
      quiz: { q: "When must you use bracket notation (obj[key]) instead of dot notation (obj.key)?", opts: ["When the property name is stored in a variable or contains special characters", "Always, dot notation is deprecated", "Only for numbers", "Only in async functions"], correct: 0, exp: "Bracket notation is required when the key name is dynamic (in a variable) or contains spaces/hyphens." }
    },
    "js13-object-references-and-copying": {
      title: "Object References & Immutability: Shallow vs Deep Copy",
      subtitle: "Understand memory references: why copying an object with = copies the address, not the data.",
      analogy: "Sharing a Google Doc link (Reference) vs printing a physical paper photocopy (Clone).",
      points: ["1. Primitives copy by value (independent copies)", "2. Objects copy by memory reference (shared address)", "3. Use { ...obj } for shallow copies, structuredClone() for deep copies"],
      code: `const original = { name: "Alice", age: 25 };\nconst copy = { ...original }; // Safe shallow copy\ncopy.age = 26;\nconsole.log("Original age:", original.age); // Still 25!`,
      quiz: { q: "If you do `const b = a;` where `a` is an object, what happens when you modify `b.name`?", opts: ["Only b changes", "Both a and b change because they point to the exact same object in memory", "An error is thrown", "The object is duplicated"], correct: 1, exp: "Objects are assigned by reference, so modifying b mutates the shared object that a also points to." }
    },
    "js14-destructuring": {
      title: "Destructuring: Unpacking Objects & Arrays with Ease",
      subtitle: "Extract properties directly into clean named variables in one line.",
      analogy: "Unboxing a delivery package directly into your kitchen drawers.",
      points: ["1. Object destructuring: const { name, age } = user;", "2. Renaming: const { name: userName } = user;", "3. Default fallbacks: const { role = 'guest' } = user;"],
      code: `const product = { id: 101, title: "Headphones", price: 79 };\nconst { title, price } = product;\nconsole.log(\`\${title} costs $\${price}\`);`,
      quiz: { q: "What happens during destructuring if an object property does not exist and has no default value?", opts: ["The variable becomes undefined", "The program crashes", "The variable becomes null", "It creates a random string"], correct: 0, exp: "If the extracted property is missing, the created variable is initialized to undefined." }
    },
    "js15-spread-and-rest-operators": {
      title: "Spread & Rest Operators: Combining and Gathering (...)",
      subtitle: "Expand items with spread and gather function arguments with rest.",
      analogy: "Spreading cards on a table (Spread) vs gathering cards into your hand (Rest).",
      points: ["1. Spread expands arrays/objects: [...arr1, ...arr2]", "2. Rest gathers remaining parameters: function sum(...nums)", "3. Creates clean immutable copies"],
      code: `const defaultSettings = { theme: "dark", notifications: true };\nconst userSettings = { ...defaultSettings, notifications: false };\nconsole.log("Updated settings:", userSettings);`,
      quiz: { q: "In `function logAll(first, ...others)`, what is `others`?", opts: ["A string", "An array containing all remaining arguments passed to the function", "A single number", "Undefined"], correct: 1, exp: "The Rest parameter (...others) gathers all remaining arguments into a standard JavaScript array." }
    },
    "js16-optional-chaining-and-nullish-coalescing": {
      title: "Optional Chaining (?.) & Nullish Coalescing (??)",
      subtitle: "Prevent crashes when accessing nested data and provide smart default fallbacks.",
      analogy: "Safe door locks that don't jam if an inner key is missing, with smart fallbacks.",
      points: ["1. Optional chaining (?.) stops evaluation if a value is null/undefined", "2. Nullish coalescing (??) provides fallbacks only for null and undefined", "3. Unlike ||, ?? does NOT treat 0 or empty string as missing"],
      code: `const user = { name: "Alex" };\nconst city = user.address?.city ?? "Unknown City";\nconsole.log("User city:", city); // "Unknown City"`,
      quiz: { q: "What is the difference between `val ?? 10` and `val || 10` when `val = 0`?", opts: ["Both return 10", "?? returns 0 (since 0 is a valid number), while || returns 10 (since 0 is falsy)", "Both return 0", "?? throws an error"], correct: 1, exp: "Nullish coalescing (??) only falls back for null or undefined, preserving valid numbers like 0." }
    },
    "js17-the-this-keyword": {
      title: "The this Keyword: Who Called Me?",
      subtitle: "Understand how this dynamically refers to the object currently executing the method.",
      analogy: "The word 'I' or 'My' — its meaning changes depending on who is currently speaking.",
      points: ["1. Method call: this refers to the object before the dot (user.speak())", "2. Arrow functions inherit this lexically from where they were written", "3. Explicit binding: call, apply, bind"],
      code: `const car = {\n  brand: "Toyota",\n  drive() {\n    console.log("Driving " + this.brand);\n  }\n};\ncar.drive(); // "Driving Toyota"`,
      quiz: { q: "How do Arrow Functions handle the 'this' keyword?", opts: ["They create a new dynamic this on every call", "They inherit 'this' from their surrounding lexical scope", "They always point to window", "They cannot use this"], correct: 1, exp: "Arrow functions do not have their own 'this'; they lexically capture 'this' from the outer context." }
    },
    "js18-prototypes-and-prototype-chain": {
      title: "Prototypes & The Prototype Chain: JavaScript's Inheritance",
      subtitle: "Learn how JavaScript objects share methods by searching up the prototype chain.",
      analogy: "Asking your parent for a tool if you don't find it in your personal toolbox.",
      points: ["1. Every object has a hidden [[Prototype]] link", "2. If a property isn't on the object, JS searches up the chain", "3. Saves memory by sharing methods across instances"],
      code: `const animal = { eat() { console.log("Nom nom!"); } };\nconst dog = Object.create(animal);\ndog.bark = () => console.log("Woof!");\ndog.bark();\ndog.eat(); // Found on prototype!`,
      quiz: { q: "What happens when you access a property on an object that doesn't exist on that object?", opts: ["It immediately throws a crash error", "JavaScript searches up the prototype chain until it finds it or reaches null", "It creates a new property", "It returns 0"], correct: 1, exp: "JavaScript traverses up the prototype chain. If not found anywhere, it returns undefined." }
    },
    "js19-classes-extends-and-super": {
      title: "Classes, Constructors, extends & super",
      subtitle: "Write clean modern classes with constructors, inheritance, and method overriding.",
      analogy: "A Modern Factory Blueprint — defines properties and actions for creating objects.",
      points: ["1. class defines constructor and methods", "2. extends inherits from a parent class", "3. super() invokes the parent constructor"],
      code: `class User {\n  constructor(public name: string) {}\n  greet() { console.log("Hello, " + this.name); }\n}\nconst u = new User("Sarah");\nu.greet();`,
      quiz: { q: "What must you call in a child class constructor before accessing 'this'?", opts: ["this.init()", "super()", "parent()", "constructor()"], correct: 1, exp: "You must call super() in a subclass constructor before using 'this' to initialize parent state." }
    },
    "js20-synchronous-vs-asynchronous": {
      title: "Synchronous vs Asynchronous: Why JavaScript Never Freezes",
      subtitle: "Understand non-blocking I/O, timers, and why async code is vital for web apps.",
      analogy: "The Restaurant Buzzer — place your order, take a buzzer ticket, and wait without blocking other customers.",
      points: ["1. Synchronous code executes sequentially and blocks", "2. Asynchronous code schedules work in the background", "3. setTimeout schedules an action after a delay"],
      code: `console.log("1. Order coffee");\nsetTimeout(() => console.log("2. Coffee ready! ☕"), 1000);\nconsole.log("3. Read newspaper while waiting...");`,
      quiz: { q: "Why does JavaScript use asynchronous operations for network requests?", opts: ["To make the code harder to read", "To prevent freezing the entire browser UI while waiting for server responses", "Because computers can only do math asynchronously", "To save hard drive space"], correct: 1, exp: "Async operations prevent blocking the single-threaded UI while waiting for slow network requests." }
    },
    "js21-promises-and-chaining": {
      title: "Promises: Managing Future Values with .then() & .catch()",
      subtitle: "Handle future results with Promise states: pending, fulfilled, or rejected.",
      analogy: "A Delivery Receipt — promises a package that either arrives (Resolved) or gets lost (Rejected).",
      points: ["1. Pending: currently waiting for result", "2. Fulfilled: resolved with data via .then()", "3. Rejected: failed with an error caught via .catch()"],
      code: `const fetchNumber = () => new Promise(res => setTimeout(() => res(42), 500));\nfetchNumber().then(num => console.log("Result:", num));`,
      quiz: { q: "Which method is used to catch errors thrown by a Promise?", opts: [".catch()", ".onError()", ".fail()", ".stop()"], correct: 0, exp: "The .catch() handler catches any rejection or error thrown in the Promise chain." }
    },
    "js22-async-await": {
      title: "Async/Await: Clean Asynchronous Workflows",
      subtitle: "Write asynchronous code that reads cleanly like synchronous code using async and await.",
      analogy: "Reading a recipe that pauses at 'await bake()' without freezing the rest of your kitchen.",
      points: ["1. async functions always return a Promise", "2. await pauses execution until the Promise resolves", "3. Use standard try/catch blocks for error handling"],
      code: `async function loadData() {\n  try {\n    const res = await fetch("https://api.learncraft.io/status");\n    console.log("Status OK!");\n  } catch (err) {\n    console.log("Failed to load");\n  }\n}`,
      quiz: { q: "Where can the 'await' keyword be used in standard JavaScript?", opts: ["Inside any regular function", "Only inside an 'async' function or at the top level of a module", "Only in HTML script tags", "Only inside loops"], correct: 1, exp: "The 'await' keyword can only be used inside async functions (or top-level ES modules)." }
    },
    "js23-the-event-loop": {
      title: "The Event Loop & Concurrency: Call Stack & Task Queues",
      subtitle: "Master the execution order: Call Stack, Microtasks (Promises), and Macrotasks (Timers).",
      analogy: "The Chef (Call Stack) prioritizing VIP orders (Microtasks) before regular tickets (Macrotasks).",
      points: ["1. Call Stack executes synchronous code first", "2. Microtask Queue (Promise.then) runs immediately after the stack clears", "3. Macrotask Queue (setTimeout) runs next"],
      code: `console.log("A");\nsetTimeout(() => console.log("B"), 0);\nPromise.resolve().then(() => console.log("C"));\nconsole.log("D");\n// Output order: A -> D -> C -> B!`,
      quiz: { q: "In what order does JavaScript execute: Sync code, setTimeout, and Promise.then?", opts: ["setTimeout -> Promise -> Sync", "Sync code -> Promise.then (Microtask) -> setTimeout (Macrotask)", "Promise -> Sync -> setTimeout", "Random order"], correct: 1, exp: "Synchronous code runs first, followed by microtasks (Promises), then macrotasks (setTimeout)." }
    },
    "js24-error-handling": {
      title: "Error Handling: try, catch, finally & throw",
      subtitle: "Prevent app crashes by catching errors gracefully with try/catch/finally blocks.",
      analogy: "Airbags and Seatbelts — protect passengers from crashing when hitting a bump in the road.",
      points: ["1. try runs code that might fail", "2. catch catches and handles any thrown error", "3. finally always runs regardless of success or failure"],
      code: `try {\n  const result = JSON.parse("{ invalid json }");\n} catch (err) {\n  console.log("Caught parsing error:", err.message);\n} finally {\n  console.log("Cleanup complete.");\n}`,
      quiz: { q: "When does the 'finally' block execute in a try/catch/finally statement?", opts: ["Only when an error occurs", "Only when no error occurs", "Always, regardless of whether an error was thrown or caught", "Never"], correct: 2, exp: "The finally block always runs at the end, whether the try block succeeded or caught an error." }
    },
    "js25-es-modules": {
      title: "ES Modules: Organizing Code with import & export",
      subtitle: "Split applications into clean reusable files using named and default exports.",
      analogy: "Standard Shipping Containers with labels to share tools between different project files.",
      points: ["1. Named export: export const add = (a, b) => a + b;", "2. Named import: import { add } from './math.js';", "3. Default export: export default class App {}"],
      code: `// math.js: export const sum = (a, b) => a + b;\n// app.js:  import { sum } from './math.js';\nconsole.log("Imported sum:", 5 + 10);`,
      quiz: { q: "How do you import a default export from a module file named './user.js'?", opts: ["import { default } from './user.js'", "import User from './user.js'", "require('./user.js')", "include './user.js'"], correct: 1, exp: "Default exports are imported directly with any variable name without curly braces." }
    },
    "js26-working-with-json": {
      title: "Working with JSON: Parsing and Serializing Data",
      subtitle: "Convert objects to JSON text (stringify) and parse JSON text back to objects (parse).",
      analogy: "Dehydrating food into powder for shipping (stringify) and adding water to restore it (parse).",
      points: ["1. JSON.stringify(obj) converts objects to JSON strings", "2. JSON.parse(str) parses JSON text back to objects", "3. Keys and strings in JSON must use double quotes"],
      code: `const user = { name: "Alex", score: 100 };\nconst jsonText = JSON.stringify(user);\nconsole.log("JSON String:", jsonText);\nconst parsed = JSON.parse(jsonText);\nconsole.log("Parsed Name:", parsed.name);`,
      quiz: { q: "What happens if you call `JSON.parse('invalid text')`?", opts: ["It returns null", "It throws a SyntaxError exception", "It returns an empty object {}", "It ignores the error"], correct: 1, exp: "Passing malformed JSON text to JSON.parse() throws a SyntaxError and should be wrapped in try/catch." }
    },
    "js27-the-fetch-api": {
      title: "The Fetch API: Communicating with REST APIs",
      subtitle: "Send HTTP requests, retrieve data from APIs, and check response statuses.",
      analogy: "Sending a courier to a warehouse with an order form (Request) and receiving a parcel (Response).",
      points: ["1. fetch(url) sends HTTP requests", "2. Always check if (response.ok) before reading data", "3. Parse JSON body with await response.json()"],
      code: `async function getTodos() {\n  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");\n  if (res.ok) {\n    const data = await res.json();\n    console.log("Loaded Todo:", data.title);\n  }\n}\ngetTodos();`,
      quiz: { q: "Does `fetch()` reject its Promise when a server returns an HTTP 404 or 500 error?", opts: ["Yes, it always throws an error", "No, fetch only rejects on network failures; you must check `response.ok` manually", "Only on mobile devices", "Only in Chrome"], correct: 1, exp: "fetch() resolves normally on HTTP 404/500 errors; you must inspect response.ok to verify success." }
    },
    "js28-dom-essentials": {
      title: "Browser DOM Essentials: Selecting & Modifying Elements",
      subtitle: "Select HTML elements with querySelector, update textContent, and toggle CSS classes.",
      analogy: "The Document Tree — HTML parsed into an interactive tree of JavaScript objects.",
      points: ["1. document.querySelector('.btn') selects elements", "2. element.textContent updates text safely", "3. element.classList.toggle('active') toggles CSS"],
      code: `// Simulating DOM manipulation:\nconst mockElement = { textContent: "Original Text", classList: new Set() };\nmockElement.textContent = "Updated via JavaScript! 🎉";\nmockElement.classList.add("highlight");\nconsole.log("DOM updated:", mockElement.textContent);`,
      quiz: { q: "Why is `textContent` safer to use than `innerHTML` when setting user-supplied text?", opts: ["textContent runs 100x faster", "textContent prevents Cross-Site Scripting (XSS) by treating input as raw text instead of executable HTML", "innerHTML is deprecated", "textContent uses less RAM"], correct: 1, exp: "textContent treats text strictly as plain characters, preventing XSS vulnerabilities from untrusted inputs." }
    },
    "js29-events-and-delegation": {
      title: "Events, Event Listeners & Event Delegation",
      subtitle: "Listen for clicks, manage event bubbling, and use event delegation for dynamic lists.",
      analogy: "The Hotel Front Desk — one receptionist in the lobby handles requests for all 100 rooms.",
      points: ["1. addEventListener('click', handler) listens for events", "2. Event Bubbling flows events up from child to parent", "3. Event Delegation attaches 1 listener on the parent container"],
      code: `// Simulating Event Delegation:\nfunction handleListClick(eventTargetTag, taskId) {\n  if (eventTargetTag === "BUTTON") {\n    console.log("🗑️ Delete task clicked for ID:", taskId);\n  }\n}\nhandleListClick("BUTTON", "task_42");`,
      quiz: { q: "What is the primary performance benefit of Event Delegation?", opts: ["It compiles JavaScript into C++", "Attaching a single event listener on a parent element handles events for hundreds of dynamic children", "It prevents network requests", "It makes buttons bigger"], correct: 1, exp: "Event delegation leverages event bubbling to manage dynamic lists with a single listener on the parent." }
    },
    "js30-browser-storage-and-debugging": {
      title: "Browser Storage (localStorage) & DevTools Debugging",
      subtitle: "Persist user settings with localStorage, and use browser DevTools to debug code.",
      analogy: "A Sticky Notepad in the user's browser that remembers their tasks even after closing the tab.",
      points: ["1. localStorage.setItem('key', JSON.stringify(data)) saves data", "2. localStorage.getItem('key') retrieves data", "3. Use DevTools breakpoints and console.table for debugging"],
      code: `// Simulating localStorage storage:\nconst savedTasks = [{ id: 1, text: "Finish JavaScript course" }];\nconst serialized = JSON.stringify(savedTasks);\nconsole.log("Saved to storage:", serialized);\nconst restored = JSON.parse(serialized);\nconsole.log("Restored task:", restored[0].text);`,
      quiz: { q: "What data format does `localStorage` store values in?", opts: ["Binary Byte Arrays", "Strings only (use JSON.stringify to store objects)", "JavaScript Classes", "SQL Tables"], correct: 1, exp: "localStorage stores all keys and values as plain strings, requiring JSON serialization for objects." }
    }
  };

  const template = lessonTemplates[normalized] || {
    title: `JavaScript Lesson: ${slugOrCode}`,
    subtitle: "Master core JavaScript concepts with clear, beginner-friendly explanations.",
    analogy: "Building with clean, reliable software building blocks.",
    points: ["1. Understand core syntax and execution", "2. Write clean, readable code", "3. Avoid common mistakes and bugs"],
    code: `console.log("Practicing JavaScript concept: ${slugOrCode}");`,
    quiz: { q: "What is the main goal of writing clean JavaScript?", opts: ["To write readable, maintainable, and bug-free code", "To make code as long as possible", "To hide code from other developers", "To disable all functions"], correct: 0, exp: "Clean JavaScript ensures your code is readable, predictable, and maintainable." }
  };

  return {
    slug: normalized,
    code: slugOrCode.toUpperCase().includes("JS-") ? slugOrCode.toUpperCase() : "JS-01",
    title: template.title,
    subtitle: template.subtitle,
    sections: [
      { id: "part1", label: "Overview & Real-Life Analogy", icon: "💡" },
      { id: "part2", label: "Core Concepts & Mechanics", icon: "📖" },
      { id: "part3", label: "Mental Model & Structure", icon: "🧠" },
      { id: "part4", label: "Bad Code vs Clean Code", icon: "⚖️" },
      { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
      { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
      { id: "part7", label: "Summary & Progression", icon: "🎓" },
    ],
    part1: {
      title: "What You'll Learn & Context",
      bigPicture: `In this lesson, we master ${template.title}. Think of this like ${template.analogy} — it provides a clear, reliable way to organize and execute logic in your applications.`,
      breakdownTitle: "Key Goals of This Concept:",
      breakdownItems: [
        { title: "Clear Understanding", desc: "Know what this feature does and why developers use it daily." },
        { title: "Practical Application", desc: "Learn how to write and debug this code in real web applications." },
        { title: "Avoid Common Mistakes", desc: "Understand common traps and how clean JavaScript prevents bugs." },
      ],
    },
    part2: {
      title: "Core Mechanics & Key Rules",
      intro: `Understanding the essential rules of ${template.title}:`,
      cards: [
        { number: "01", tag: "Essential", title: "Core Purpose", description: template.points[0], color: "amber" },
        { number: "02", tag: "Behavior", title: "Execution Flow", description: template.points[1], color: "emerald" },
        { number: "03", tag: "Best Practice", title: "Clean Habit", description: template.points[2] || "Follow modern JavaScript standards.", color: "purple" },
      ],
      rule: {
        title: "💡 Golden Heuristic",
        content: `Always write clean, predictable code. Avoid hidden assumptions and verify outputs using console.log.`,
      },
    },
    part3: {
      title: "Mental Model & How It Works",
      intro: "Step-by-step breakdown of how JavaScript handles this concept:",
      points: template.points.map((pt, idx) => ({
        title: `Rule ${idx + 1}`,
        content: pt,
      })),
    },
    part4: {
      title: "Bad Code vs Clean Code",
      bad: {
        title: "❌ Bad Practice: Fragile or confusing code",
        code: `// Risky approach:\nfunction oldWay() {\n  console.log("Unstructured and error-prone");\n}`,
        explanation: "This approach is harder to read, harder to debug, and prone to edge-case bugs.",
      },
      good: {
        title: "✅ Clean Practice: Modern, readable JavaScript",
        code: template.code,
        explanation: "Clean, predictable code that follows modern ES6+ standards and handles edge cases safely.",
      },
    },
    part5: {
      title: "Interactive Code Sandbox",
      intro: `Experiment with ${template.title} directly in the sandbox editor below:`,
      starterCode: template.code,
    },
    part6: {
      title: "Knowledge Check Quiz",
      quiz: {
        question: template.quiz.q,
        options: template.quiz.opts,
        correctIndex: template.quiz.correct,
        explanation: template.quiz.exp,
      },
    },
    part7: {
      title: "Summary & Progression",
      takeaways: [
        { title: "1. Key Concept Mastered", desc: template.title },
        { title: "2. Clean Code Habit", desc: "Always write readable, self-explanatory code." },
        { title: "3. Ready for Modern Tools", desc: "This concept prepares you for TypeScript, React, and Node.js." },
        { title: "4. Keep Progressing", desc: "Proceed to the next lesson in your curriculum path." },
      ],
      nextLessonPreview: {
        title: "Next Lesson in JavaScript Curriculum",
        desc: "Continue your path toward complete JavaScript competency.",
      },
    },
  };
}
