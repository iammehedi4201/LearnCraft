const fs = require('fs');

const lessonFilePath = 'app/learn/javascript/data/javascript-lesson-content.ts';
const quizFilePath = 'lib/quiz/javascript-quizzes.ts';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BATCH 8 (STAGE 7): JS-24, JS-25, JS-26, JS-27
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const batch8Lessons = {
  "js24-error-handling": {
    slug: "js24-error-handling",
    code: "JS-24",
    title: "Error Handling: try, catch, finally & throw",
    subtitle: "Protect web applications from crashes using try, catch, finally, and create intentional exceptions with throw.",
    sections: [
      { id: "part1", label: "The Safety Net", icon: "🛡️", tag: "CRASH DEFENSE" },
      { id: "part2", label: "try, catch & finally", icon: "🧯", tag: "SYNTAX" },
      { id: "part3", label: "Execution Mental Model", icon: "🧠", tag: "FLOW" },
      { id: "part4", label: "Swallowed Errors Trap", icon: "⚠️", tag: "TRAPS" },
      { id: "part5", label: "Error Sandbox", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Knowledge Check", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "The Trapeze Safety Net: Why Programs Must Handle Failure",
      bigPicture: "When JavaScript encounters an unhandled runtime mistake—like accessing a property on undefined or receiving corrupted data—it panics and abruptly terminates the entire script! In a browser, that means buttons stop working, animations freeze, and users see a broken screen. Structured error handling is your safety net: it intercepts the failure before it kills your app, giving you the chance to log what went wrong, alert the user politely, and keep the application alive.",
      breakdownTitle: "Four Pillars of Error Handling:",
      breakdownItems: [
        {
          title: "The try Block",
          desc: "Wraps code that might fail (like parsing external JSON or requesting server data) so errors can be intercepted."
        },
        {
          title: "The catch Block",
          desc: "Acts as the safety net; it only executes if an error occurs inside try, receiving the error object for inspection."
        },
        {
          title: "The finally Block",
          desc: "Guaranteed to run after try and catch finish, regardless of whether an error occurred. Ideal for cleanup."
        },
        {
          title: "The throw Statement",
          desc: "Allows you to manually trigger an error when custom business rules are violated (e.g., negative bank balance)."
        }
      ]
    },
    part2: {
      title: "Core Mechanics: try, catch, finally & Custom Errors",
      intro: "Master the syntax and tools JavaScript provides to catch and create errors:",
      cards: [
        {
          number: "01",
          tag: "The Net",
          title: "try...catch(err)",
          description: "Runs risky code in try. If an exception is thrown, execution immediately jumps into catch without crashing the thread.",
          color: "emerald"
        },
        {
          number: "02",
          tag: "The Cleanup",
          title: "The finally Block",
          description: "Always executes no matter what. Perfect for hiding loading spinners, closing database connections, or resetting flags.",
          color: "cyan"
        },
        {
          number: "03",
          tag: "Custom Errors",
          title: "throw new Error(msg)",
          description: "Creates and triggers an intentional Error instance complete with a descriptive message and line-numbered stack trace.",
          color: "purple"
        }
      ],
      rule: {
        title: "💡 Golden Rule of Error Objects",
        content: "Always throw an instance of the Error class (throw new Error('Something went wrong')) rather than primitive strings or numbers (throw 'bad'). The Error object automatically captures the exact call stack, file name, and line number where the problem occurred."
      }
    },
    part3: {
      title: "The Execution Mental Model: How Control Transfers",
      intro: "Understand exactly how JavaScript navigates between try, catch, and finally:",
      points: [
        {
          title: "1. The Smooth Swing (No Errors)",
          content: "Code inside try runs line-by-line. If no errors occur, the catch block is completely skipped, and execution glides directly into finally (if present) before continuing onward."
        },
        {
          title: "2. The Slip (Error Thrown)",
          content: "The moment an error is thrown inside try, execution immediately abandons the rest of the try block! JavaScript teleports instantly into catch, passing the Error object."
        },
        {
          title: "3. The Unbreakable Guarantee (finally)",
          content: "Whether try succeeds smoothly or catch recovers from an explosion, the finally block ALWAYS executes before any subsequent code outside the try/catch statement runs."
        }
      ]
    },
    part4: {
      title: "Common Mistakes: Swallowing Errors Silently (The Blindfold Trap)",
      bad: {
        title: "❌ Bad: Empty catch block hiding bugs and leaving developers blind",
        code: `function loadUserProfile(userId) {
  try {
    const profile = fetchProfileFromDatabase(userId);
    renderProfile(profile);
  } catch (err) {
    // Catastrophic anti-pattern: Silently swallowed!
    // When users report a blank screen, there are ZERO console errors,
    // ZERO logs, and no hint of what went wrong.
  }
}`,
        explanation: "Leaving catch empty swallows the error into a black hole. Bugs remain hidden, making production debugging almost impossible."
      },
      good: {
        title: "✅ Clean: Logging diagnostic details, alerting the user, and guaranteed cleanup",
        code: `function loadUserProfile(userId) {
  setLoadingState(true);
  try {
    const profile = fetchProfileFromDatabase(userId);
    renderProfile(profile);
  } catch (err) {
    console.error("Failed to load user profile:", err.message);
    displayUserNotice("Could not load your profile. Please refresh or try again later.");
  } finally {
    // Guaranteed to turn off the loading spinner whether fetch succeeded or failed!
    setLoadingState(false);
  }
}`,
        explanation: "The error is logged for diagnostics, the user receives clear feedback, and the UI spinner is guaranteed to turn off in finally."
      }
    },
    part5: {
      title: "Error Handling Playground",
      intro: "Experiment with throwing custom errors, catching exceptions, and observing the unconditional finally block:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-24: ERROR HANDLING PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const bankAccount = {
  owner: "Alex Rivera",
  balance: 350,
  isProcessing: true
};

function withdrawFunds(account, amount) {
  console.log(\`\\nAttempting withdrawal of $\${amount}...\`);
  
  try {
    // 1. Validate amount
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Withdrawal amount must be a positive number.");
    }

    // 2. Check sufficient balance
    if (amount > account.balance) {
      throw new Error(\`Insufficient funds: requested $\${amount}, but balance is only $\${account.balance}.\`);
    }

    // 3. Process transaction
    account.balance -= amount;
    console.log(\`✅ Withdrawal approved! New balance: $\${account.balance}\`);
  } catch (error) {
    console.error(\`❌ Transaction rejected: \${error.message}\`);
  } finally {
    account.isProcessing = false;
    console.log("🔒 Transaction closed: processing flag reset to false.");
  }
}

// Test 1: Valid withdrawal
withdrawFunds(bankAccount, 100);

// Test 2: Overdraft attempt (triggers custom error!)
withdrawFunds(bankAccount, 500);

// Test 3: Invalid input type
withdrawFunds(bankAccount, -25);
`
    },
    part6: {
      title: "Key Takeaways: Error Handling",
      takeaways: [
        {
          title: "1. The try/catch Safety Net",
          desc: "Enclose operations that might fail inside try; if an error occurs, catch intercepts it before the script crashes."
        },
        {
          title: "2. The finally Block Always Runs",
          desc: "Guaranteed to execute whether an error occurred or not; ideal for turning off spinners and closing resources."
        },
        {
          title: "3. Never Swallow Errors Silently",
          desc: "Avoid empty catch blocks; always log diagnostic information or notify the user so bugs can be resolved."
        },
        {
          title: "4. Throw Real Error Objects",
          desc: "Use throw new Error('message') so your exceptions include full stack trace and line number information."
        }
      ],
      nextLessonPreview: {
        title: "JS-25: ES Modules: Organizing Code with import & export",
        desc: "Organize large JavaScript applications into isolated, reusable module files using named exports, default exports, and import statements."
      }
    },
    part7: {
      title: "Knowledge Check: Error Handling",
      quiz: {
        question: "What is guaranteed about code placed inside a 'finally' block?",
        options: [
          "It only runs if an error was caught inside the catch block",
          "It always executes after try and catch, regardless of whether an error was thrown",
          "It executes before the try block starts",
          "It causes the browser to reload the page automatically"
        ],
        correctIndex: 1,
        explanation: "The finally block is guaranteed to run after the try (and catch, if an error occurred) block completes, regardless of the outcome."
      }
    }
  },

  "js25-es-modules": {
    slug: "js25-es-modules",
    code: "JS-25",
    title: "ES Modules: Organizing Code with import & export",
    subtitle: "Organize modern codebases into isolated, reusable files using named exports, default exports, and import statements.",
    sections: [
      { id: "part1", label: "Lego Brick Architecture", icon: "🧱", tag: "ARCHITECTURE" },
      { id: "part2", label: "Named vs Default Exports", icon: "📦", tag: "SYNTAX" },
      { id: "part3", label: "Module Mental Model", icon: "🧠", tag: "SCOPES" },
      { id: "part4", label: "Monolith vs Modular", icon: "⚖️", tag: "BEST PRACTICES" },
      { id: "part5", label: "Modules Playground", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Knowledge Check", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "The Lego Brick Architecture: Why Code Must Be Modular",
      bigPicture: "In early JavaScript, every script shared one massive global scope (the window object). If script A defined let total = 10 and script B also defined let total = 20, they collided, overwrote each other's data, and broke the website! ES Modules (ESM) solve this by treating every JavaScript file as an isolated module. Variables declared inside a file stay private to that file unless you explicitly export them, and other files must explicitly import only what they need.",
      breakdownTitle: "Four Pillars of ES Modules:",
      breakdownItems: [
        {
          title: "File-Level Scope Isolation",
          desc: "Variables in an ES module do not pollute the global scope. Multiple files can share variable names safely."
        },
        {
          title: "Named Exports (export const x)",
          desc: "Export multiple values from a single file by name; imported using matching curly braces { x }."
        },
        {
          title: "Default Exports (export default x)",
          desc: "Export the primary entity of a file; imported without curly braces and can be renamed freely."
        },
        {
          title: "Static Top-Level Imports",
          desc: "Import statements are resolved before code execution starts, enabling bundlers to detect unused code (tree-shaking)."
        }
      ]
    },
    part2: {
      title: "Core Mechanics: Named Exports, Default Exports & Aliases",
      intro: "Learn the exact syntax for exporting and importing modular code:",
      cards: [
        {
          number: "01",
          tag: "Named",
          title: "export { a, b }",
          description: "Used to export multiple utilities. Importers MUST use curly braces with exact matching names: import { a, b } from './file.js'.",
          color: "emerald"
        },
        {
          number: "02",
          tag: "Default",
          title: "export default Component",
          description: "One default export per file. Importers MUST NOT use curly braces and can choose any local identifier name.",
          color: "purple"
        },
        {
          number: "03",
          tag: "Aliases",
          title: "import { a as myA }",
          description: "Rename imports using 'as' to prevent naming conflicts, or bundle all named exports with 'import * as Utils'.",
          color: "cyan"
        }
      ],
      rule: {
        title: "💡 Golden Rule of Import Curly Braces",
        content: "Named exports REQUIRE curly braces when importing (import { add } from './math.js'). Default exports MUST NOT use curly braces (import Calculator from './calc.js'). Mixing these two up is the single most common module error in web development."
      }
    },
    part3: {
      title: "The Module Mental Model: Private Vaults & Connectors",
      intro: "How the browser and bundlers connect modular files together:",
      points: [
        {
          title: "1. The Private Vault",
          content: "Think of every module file as an enclosed room with opaque walls. Everything declared inside is private by default. Only items marked with 'export' are visible through the doorway."
        },
        {
          title: "2. Explicit Connectors",
          content: "Files do not guess where functions come from. Every dependency is declared explicitly at the top of the file via import statements, making codebases self-documenting."
        },
        {
          title: "3. Live Bindings, Not Copies",
          content: "When you import a variable, you get a live link to the exported binding, not a disconnected snapshot. If the source module modifies its exported state, the importer sees the change."
        }
      ]
    },
    part4: {
      title: "Common Mistakes: Monolithic Global Dumping vs Clean Modules",
      bad: {
        title: "❌ Bad: Dumping all app logic into a massive 3,000-line global file",
        code: `// everything.js - 3,000 lines of unrelated code
function calculateTax() { /* ... */ }
function renderCartTable() { /* ... */ }
function validateCreditCard() { /* ... */ }
function submitAnalyticsEvent() { /* ... */ }
// All declared in one file or attached directly to window!
// Hard to test, impossible to reuse, high risk of naming collisions.`,
        explanation: "Monolithic scripts pollute the global namespace, make automated testing nearly impossible, and prevent code reuse across projects."
      },
      good: {
        title: "✅ Clean: Focused single-responsibility modules with explicit imports",
        code: `// tax.js - Pure mathematical calculation
export const TAX_RATE = 0.08;
export function calculateTax(subtotal) {
  return subtotal * TAX_RATE;
}

// checkout.js - Composes clean, tested utilities
import { calculateTax, TAX_RATE } from './tax.js';

export function getOrderSummary(subtotal) {
  const tax = calculateTax(subtotal);
  return { subtotal, tax, total: subtotal + tax };
}`,
        explanation: "Each module has one clear responsibility. Logic is easily unit-tested in isolation and imported only where needed."
      }
    },
    part5: {
      title: "ES Modules Playground",
      intro: "Simulate a modular export and import pipeline with named utilities and a default checkout coordinator:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-25: ES MODULES SIMULATION PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Module 1: Simulated mathUtils.js
const mathUtils = {
  // Named export 1: add
  add(a, b) { return a + b; },
  // Named export 2: multiply
  multiply(a, b) { return a * b; },
  // Named export 3: TAX_RATE constant
  TAX_RATE: 0.075
};

// Module 2: Simulated cartService.js (with default export)
const cartService = {
  // Default export: createReceipt
  default: function createReceipt(items, taxRate) {
    const subtotal = items.reduce((acc, item) => acc + item.price, 0);
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    
    return {
      itemsCount: items.length,
      subtotal: "$" + subtotal.toFixed(2),
      tax: "$" + tax.toFixed(2),
      total: "$" + total.toFixed(2)
    };
  }
};

// Simulated consumer: main.js
// Destructure named exports (like: import { add, TAX_RATE } from './mathUtils.js')
const { add, multiply, TAX_RATE } = mathUtils;

// Destructure default export (like: import createReceipt from './cartService.js')
const createReceipt = cartService.default;

// Test the modular composition:
const shoppingCart = [
  { name: "Ergonomic Keyboard", price: 129.99 },
  { name: "Vertical Mouse", price: 65.50 }
];

console.log("Tax Rate:", (TAX_RATE * 100).toFixed(1) + "%");
console.log("Receipt Summary:", createReceipt(shoppingCart, TAX_RATE));
`
    },
    part6: {
      title: "Key Takeaways: ES Modules",
      takeaways: [
        {
          title: "1. File-Level Scope",
          desc: "Every module file has its own private scope; variables do not leak into the global environment."
        },
        {
          title: "2. Named Exports Use Curly Braces",
          desc: "Export multiple items with 'export const x'; import them using matching curly braces { x }."
        },
        {
          title: "3. Default Exports Do NOT Use Braces",
          desc: "A file can have one default export ('export default x'); import it directly without curly braces."
        },
        {
          title: "4. Renaming with 'as'",
          desc: "Prevent naming collisions between different modules using 'import { name as alias } from ...'."
        }
      ],
      nextLessonPreview: {
        title: "JS-26: Working with JSON: Parsing and Serializing Data",
        desc: "Convert live JavaScript data into JSON text blueprints with JSON.stringify and safely reconstruct objects with defensive JSON.parse."
      }
    },
    part7: {
      title: "Knowledge Check: ES Modules",
      quiz: {
        question: "How do you correctly import a default export named 'UserStore' from a file located at './stores/user.js'?",
        options: [
          "import { UserStore } from './stores/user.js';",
          "import UserStore from './stores/user.js';",
          "import * as { UserStore } from './stores/user.js';",
          "const UserStore = import('./stores/user.js');"
        ],
        correctIndex: 1,
        explanation: "Default exports are imported WITHOUT curly braces (import UserStore from './stores/user.js'). Curly braces are reserved exclusively for named exports."
      }
    }
  },

  "js26-working-with-json": {
    slug: "js26-working-with-json",
    code: "JS-26",
    title: "Working with JSON: Parsing and Serializing Data",
    subtitle: "Exchange structured data across web servers and APIs using JSON.stringify and defensive JSON.parse.",
    sections: [
      { id: "part1", label: "Shipping Blueprints", icon: "📦", tag: "DATA FORMAT" },
      { id: "part2", label: "stringify vs parse", icon: "⚙️", tag: "METHODS" },
      { id: "part3", label: "Serialization Mental Model", icon: "🧠", tag: "TRANSFORMATION" },
      { id: "part4", label: "Defensive Parsing", icon: "🛡️", tag: "TRAPS" },
      { id: "part5", label: "JSON Sandbox", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Knowledge Check", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "The Universal Shipping Blueprint: Why JSON Exists",
      bigPicture: "In-memory JavaScript objects are living, complex structures containing prototypes, active methods, and memory pointers. A computer network wire, however, can only transport a flat stream of plain text bytes. JSON (JavaScript Object Notation) is a standardized, language-neutral text format based on JavaScript object syntax. Whether an external server is written in Python, Go, Java, or C#, every backend language can read and generate JSON text strings seamlessly.",
      breakdownTitle: "Core Concepts of JSON:",
      breakdownItems: [
        {
          title: "JSON is Plain Text",
          desc: "JSON is a formatted string of characters, NOT an in-memory JavaScript object. It can be saved to files or sent over HTTP."
        },
        {
          title: "JSON.stringify() (Serialization)",
          desc: "Converts living JavaScript objects or arrays into a serialized JSON text string ready for transit."
        },
        {
          title: "JSON.parse() (Deserialization)",
          desc: "Reads a JSON text string and reconstructs living JavaScript objects and arrays in computer memory."
        },
        {
          title: "Strict Formatting Rules",
          desc: "All keys and strings MUST use double quotes (\"). Single quotes, trailing commas, and comments are strictly forbidden."
        }
      ]
    },
    part2: {
      title: "Core Mechanics: stringify, parse & Omission Rules",
      intro: "Master the syntax, options, and limitations of JavaScript's built-in JSON object:",
      cards: [
        {
          number: "01",
          tag: "Serialize",
          title: "JSON.stringify(data)",
          description: "Turns objects into text. Accepts formatting options like JSON.stringify(obj, null, 2) to generate human-readable indented JSON.",
          color: "emerald"
        },
        {
          number: "02",
          tag: "Deserialize",
          title: "JSON.parse(text)",
          description: "Rebuilds real objects from JSON strings. If the input text violates JSON syntax rules, it immediately throws a SyntaxError!",
          color: "cyan"
        },
        {
          number: "03",
          tag: "Omissions",
          title: "What JSON Drops",
          description: "Functions, undefined, and Symbols are completely stripped during stringify because executable logic cannot be safely represented in data.",
          color: "purple"
        }
      ],
      rule: {
        title: "💡 Golden Rule of JSON Parsing",
        content: "Never call naked JSON.parse() on external data (like localStorage or API responses) without wrapping it in a try/catch block. Malformed JSON will throw a synchronous SyntaxError that crashes your entire app if uncaught."
      }
    },
    part3: {
      title: "The Transformation Mental Model: Pack, Ship, Unpack",
      intro: "Visualize what happens to data during the serialization cycle:",
      points: [
        {
          title: "1. The 3D Castle to Flat Blueprint (stringify)",
          content: "Imagine your JavaScript object as a 3D Lego castle sitting in your computer's RAM. JSON.stringify flattens that castle into a printed 2D blueprint on a single sheet of paper (a text string)."
        },
        {
          title: "2. The Shipping Wire (Transit)",
          content: "The printed text blueprint travels across HTTP cables or sits inside browser localStorage. Because it is simple text, any operating system or programming language can store and read it."
        },
        {
          title: "3. Reconstructing the Castle (parse)",
          content: "The receiving program reads the printed blueprint and builds a brand-new 3D Lego castle in its own memory. The new object looks identical in data, but occupies distinct memory addresses."
        }
      ]
    },
    part4: {
      title: "Common Mistakes: Naked JSON.parse vs Defensive Safe Parsing",
      bad: {
        title: "❌ Bad: Naked JSON.parse throwing uncaught SyntaxError on bad input",
        code: `function loadStoredPreferences() {
  const rawData = localStorage.getItem("user_settings");
  // Catastrophic crash hazard:
  // If rawData is null, empty string, or corrupted text,
  // JSON.parse throws an unhandled SyntaxError and kills the entire app!
  const settings = JSON.parse(rawData);
  return settings.theme;
}`,
        explanation: "If the stored data is corrupted, empty, or edited by an extension, naked JSON.parse throws a fatal SyntaxError that freezes the application."
      },
      good: {
        title: "✅ Clean: Defensive JSON parsing with try/catch and fallback defaults",
        code: `function loadStoredPreferences(fallback = { theme: "dark", fontSize: 16 }) {
  const rawData = localStorage.getItem("user_settings");
  if (!rawData) return fallback;

  try {
    return JSON.parse(rawData);
  } catch (err) {
    console.warn("Corrupted JSON detected in localStorage; reverting to safe default:", err.message);
    return fallback;
  }
}`,
        explanation: "Wrapping JSON.parse in try/catch safely intercepts syntax errors, logs a helpful warning, and returns a reliable fallback object."
      }
    },
    part5: {
      title: "JSON Serialization & Parsing Playground",
      intro: "Experiment with pretty-printing JSON, observing stripped functions/undefined, and testing defensive parsing:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-26: WORKING WITH JSON PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Observe what JSON.stringify strips out:
const userAccount = {
  id: 101,
  username: "dev_alex",
  role: "moderator",
  skills: ["JS", "React", "Node"],
  secretKey: undefined, // Notice: undefined is dropped!
  greet: function() { return \`Hello from \${this.username}\`; } // Notice: functions are dropped!
};

console.log("Original Object has greet method:", typeof userAccount.greet);

// Serialize to pretty-printed JSON string (2-space indent):
const jsonString = JSON.stringify(userAccount, null, 2);
console.log("Serialized JSON Text:\\n" + jsonString);

// 2. Defensive JSON Parser Helper:
function safeParse(text, fallback = null) {
  if (typeof text !== "string" || !text.trim()) return fallback;
  try {
    return JSON.parse(text);
  } catch (error) {
    console.warn("⚠️ JSON Parse Error safely caught:", error.message);
    return fallback;
  }
}

// Test A: Parsing valid JSON
const validResult = safeParse('{"status": "ok", "itemsCount": 42}');
console.log("\\nValid parse result:", validResult.status);

// Test B: Parsing malformed JSON (missing quotes around keys, single quotes)
const invalidResult = safeParse("{ name: 'bad format' }", { status: "fallback" });
console.log("Invalid parse fallback:", invalidResult.status);
`
    },
    part6: {
      title: "Key Takeaways: Working with JSON",
      takeaways: [
        {
          title: "1. JSON is a Text Format",
          desc: "JSON is a standardized text string representation of data, not a living JavaScript object in memory."
        },
        {
          title: "2. Strict Double-Quote Rule",
          desc: "All property keys and string values MUST be enclosed in double quotes; trailing commas are illegal."
        },
        {
          title: "3. Functions & Undefined Dropped",
          desc: "JSON.stringify silently removes functions, undefined values, and Symbols because executable code cannot be serialized."
        },
        {
          title: "4. Always Parse Defensively",
          desc: "Never call JSON.parse without try/catch protection when dealing with external or user-provided strings."
        }
      ],
      nextLessonPreview: {
        title: "JS-27: The Fetch API: Communicating with REST APIs",
        desc: "Fetch live data from remote servers, send JSON payloads with HTTP POST, inspect HTTP status codes, and master the response.ok check."
      }
    },
    part7: {
      title: "Knowledge Check: Working with JSON",
      quiz: {
        question: "What happens when you pass an object containing a function to JSON.stringify({ name: 'App', start: () => {} })?",
        options: [
          "The function code is serialized as a plain string inside the JSON output",
          "The function property is completely omitted from the resulting JSON string",
          "JSON.stringify throws an immediate TypeError",
          "The function is replaced with the literal value null"
        ],
        correctIndex: 1,
        explanation: "JSON.stringify automatically strips out functions, undefined values, and Symbols from objects because JSON is a data-only format that cannot represent executable code."
      }
    }
  },

  "js27-the-fetch-api": {
    slug: "js27-the-fetch-api",
    code: "JS-27",
    title: "The Fetch API: Communicating with REST APIs",
    subtitle: "Make HTTP requests, parse JSON streams, handle network errors, and master the critical response.ok check.",
    sections: [
      { id: "part1", label: "The Restaurant Waiter", icon: "🌐", tag: "NETWORKING" },
      { id: "part2", label: "GET, POST & response.ok", icon: "📡", tag: "HTTP & APIs" },
      { id: "part3", label: "Two-Step Promise Flow", icon: "🧠", tag: "EXECUTION" },
      { id: "part4", label: "The 404 Fetch Trap", icon: "⚠️", tag: "TRAPS" },
      { id: "part5", label: "Fetch Sandbox", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Knowledge Check", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "The Restaurant Waiter Analogy: Requesting Live Web Data",
      bigPicture: "Modern web applications don't refresh the whole page every time you like a post or load your feed. Instead, JavaScript talks to remote backend servers in the background using the browser's built-in fetch() API. Think of fetch() as sending a friendly waiter to the kitchen: you place your order, your code continues running smoothly without freezing, and when the waiter returns with your food (data), you unpack the meal and display it to the user.",
      breakdownTitle: "Four Pillars of the Fetch API:",
      breakdownItems: [
        {
          title: "The Two-Step Promise",
          desc: "Step 1 (await fetch) receives HTTP headers and status; Step 2 (await res.json()) parses the streaming JSON body."
        },
        {
          title: "The response.ok Guard",
          desc: "fetch() does NOT reject on 404 or 500 errors! You must check if (!res.ok) to verify the server request succeeded."
        },
        {
          title: "HTTP Methods (GET & POST)",
          desc: "Use GET to retrieve information; use POST to send new records to the server inside the request body."
        },
        {
          title: "The Content-Type Header",
          desc: "When sending JSON in a POST request, include 'Content-Type': 'application/json' so the server knows how to decode the body."
        }
      ]
    },
    part2: {
      title: "Core Mechanics: GET, POST & Error Guards",
      intro: "Master the essential syntax for fetching and submitting data across the web:",
      cards: [
        {
          number: "01",
          tag: "GET Request",
          title: "await fetch(url)",
          description: "Retrieves data. Always verify res.ok (true for HTTP 200-299) before calling await res.json() to extract the body.",
          color: "emerald"
        },
        {
          number: "02",
          tag: "POST Request",
          title: "Sending JSON Payloads",
          description: "Pass an options object specifying method: 'POST', 'Content-Type' header, and JSON.stringify(payload) in the body.",
          color: "purple"
        },
        {
          number: "03",
          tag: "Network Defense",
          title: "try...catch with fetch",
          description: "Catches real network failures (like lost internet connection, DNS failure, or CORS errors) as well as errors thrown by your res.ok check.",
          color: "cyan"
        }
      ],
      rule: {
        title: "💡 The #1 Fetch Trap: Always Check response.ok",
        content: "The fetch() Promise ONLY rejects if the network wire itself breaks (e.g. offline, DNS failure). If the server responds with a 404 Not Found or 500 Server Error, fetch() considers the HTTP exchange a success! You MUST always inspect 'if (!response.ok) throw new Error(...)'. "
      }
    },
    part3: {
      title: "The Mental Model: The Two-Step Promise Timeline",
      intro: "Why working with fetch involves two consecutive await statements:",
      points: [
        {
          title: "1. Step 1: The Response Envelope (await fetch(url))",
          content: "The first Promise resolves as soon as the server's HTTP response headers arrive. You now have access to response.status (200, 404), response.statusText, and response.ok, but the body data is still streaming over the wire."
        },
        {
          title: "2. Step 2: Unpacking the Stream (await res.json())",
          content: "Calling res.json() returns a second Promise that waits for the rest of the incoming data packets to finish downloading and parses the raw text into a real JavaScript object."
        },
        {
          title: "3. The Error Boundary",
          content: "True network crashes jump straight to catch. HTTP errors (404/500) fulfill Step 1 normally; only your manual 'if (!res.ok) throw new Error()' redirects them into the catch block."
        }
      ]
    },
    part4: {
      title: "Common Mistakes: The Blind Fetch (Ignoring response.ok)",
      bad: {
        title: "❌ Bad: Assuming catch will handle 404 and 500 server errors",
        code: `async function loadProductDetails(productId) {
  try {
    const res = await fetch(\`/api/products/\${productId}\`);
    // Fatal mistake: If productId is not found (404), res.ok is false,
    // but the code doesn't check it! It proceeds to parse the 404 HTML page:
    const data = await res.json(); // SyntaxError or unexpected { error: 'not found' }!
    renderProduct(data.title); // Uncaught TypeError: Cannot read properties of undefined!
  } catch (err) {
    // This catch block NEVER runs on 404 unless json() explodes!
  }
}`,
        explanation: "Because fetch does not reject on 404, catch is bypassed. The app tries to read properties on undefined data and crashes."
      },
      good: {
        title: "✅ Clean: Inspecting response.ok and throwing actionable errors",
        code: `async function loadProductDetails(productId) {
  try {
    const res = await fetch(\`/api/products/\${productId}\`);
    if (!res.ok) {
      throw new Error(\`Failed to fetch product (HTTP Status \${res.status}: \${res.statusText})\`);
    }
    const product = await res.json();
    renderProduct(product.title);
  } catch (err) {
    console.error("Product load failed:", err.message);
    showUserToast("Unable to load product information. Please try again.");
  }
}`,
        explanation: "Checking !res.ok ensures all 404 and 500 HTTP failures trigger the catch block with accurate status diagnostics."
      }
    },
    part5: {
      title: "Fetch API Simulation Playground",
      intro: "Simulate a mock network client handling GET requests, 404 status checks, and sending POST JSON payloads:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-27: THE FETCH API PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Simulate a backend server responding over the network:
function mockFetch(url, options = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock GET /api/users/42 (Success 200)
      if (url.includes("/api/users/42")) {
        resolve({
          ok: true,
          status: 200,
          statusText: "OK",
          json: async () => ({ id: 42, name: "Jordan Smith", role: "Frontend Dev" })
        });
      } 
      // Mock GET /api/users/999 (Not Found 404)
      else if (url.includes("/api/users/999")) {
        resolve({
          ok: false,
          status: 404,
          statusText: "Not Found",
          json: async () => ({ error: "User not found" })
        });
      }
      // Mock POST /api/tasks (Created 201)
      else if (options.method === "POST") {
        const bodyData = JSON.parse(options.body || "{}");
        resolve({
          ok: true,
          status: 201,
          statusText: "Created",
          json: async () => ({ id: 1001, ...bodyData, createdAt: new Date().toISOString() })
        });
      }
    }, 150);
  });
}

// 2. Robust API Client Function with response.ok check:
async function fetchUser(userId) {
  try {
    console.log(\`📡 Fetching user \${userId}...\`);
    const res = await mockFetch(\`/api/users/\${userId}\`);

    // Mandatory check:
    if (!res.ok) {
      throw new Error(\`HTTP \${res.status} (\${res.statusText})\`);
    }

    const user = await res.json();
    console.log("✅ User loaded successfully:", user.name);
    return user;
  } catch (err) {
    console.error(\`❌ Could not load user \${userId}:\`, err.message);
  }
}

// 3. Test GET for existing user:
fetchUser(42);

// 4. Test GET for non-existent user (triggers !res.ok check):
fetchUser(999);
`
    },
    part6: {
      title: "Key Takeaways: The Fetch API",
      takeaways: [
        {
          title: "1. Two-Step Promise Architecture",
          desc: "First await fetch(url) for headers and status; second await res.json() to read and parse the body data."
        },
        {
          title: "2. The response.ok Requirement",
          desc: "fetch() does NOT reject on 404 or 500 errors; always check if (!res.ok) to verify request success."
        },
        {
          title: "3. Sending JSON with POST",
          desc: "Set method: 'POST', include header 'Content-Type': 'application/json', and pass JSON.stringify(data) in the body."
        },
        {
          title: "4. Full Error Protection",
          desc: "Wrap fetch logic in try/catch to gracefully handle network dropouts, CORS blocks, and HTTP status exceptions."
        }
      ],
      nextLessonPreview: {
        title: "JS-28: Browser DOM Essentials: Selecting & Modifying Elements",
        desc: "Bridge JavaScript with the browser: select elements with querySelector, update text and styles, and prevent cross-site scripting."
      }
    },
    part7: {
      title: "Knowledge Check: The Fetch API",
      quiz: {
        question: "How does the browser's fetch() API behave when the server returns an HTTP 404 Not Found error?",
        options: [
          "The fetch() Promise rejects immediately and jumps directly into the catch block",
          "The fetch() Promise fulfills normally, with response.ok set to false and response.status set to 404",
          "The browser automatically retries the request up to three times",
          "A synchronous NetworkError is thrown"
        ],
        correctIndex: 1,
        explanation: "fetch() only rejects on real network failures (like lost internet connection or DNS errors). HTTP error status codes like 404 or 500 fulfill successfully, but response.ok will be false."
      }
    }
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BATCH 8 MODULE QUIZZES: JS-24, JS-25, JS-26, JS-27
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const batch8Quizzes = [
  {
    id: "quiz-javascript-js24",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js24-error-handling",
    lessonCode: "JS-24",
    lessonTitle: "Error Handling: try, catch, finally & throw",
    description: "Test your mastery of structured error handling, unconditional finally blocks, and throwing custom Error objects.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js24-q1",
        type: "code_output",
        title: "The Unconditional finally Block",
        prompt: "What will be printed to the console by the following code?",
        codeSnippet: `let log = "A";
try {
  log += "-B";
  throw new Error("Oops");
} catch (err) {
  log += "-C";
} finally {
  log += "-D";
}
console.log(log);`,
        language: "javascript",
        options: [
          "'A-B-C-D'",
          "'A-B-D'",
          "'A-B-C'",
          "'A-C-D'"
        ],
        correctAnswer: 0,
        explanation: "The try block runs ('A-B'), throws an error which redirects control to catch ('-C'), and finally ALWAYS runs at the end ('-D'). Result: 'A-B-C-D'.",
        hint: "The finally block executes no matter what happens inside try or catch.",
        hintCostXP: 5
      },
      {
        id: "js24-q2",
        type: "multiple_choice",
        title: "The Danger of Empty catch Blocks",
        prompt: "Why is an empty catch block (catch (err) {}) considered a dangerous anti-pattern in JavaScript?",
        options: [
          "It causes an immediate SyntaxError in modern browser engines",
          "It swallows the error into a black hole, hiding bugs and making debugging nearly impossible",
          "It permanently stops the finally block from executing",
          "It automatically redirects the browser to an error page"
        ],
        correctAnswer: 1,
        explanation: "Empty catch blocks swallow errors silently with zero logs, leaving developers and users unaware of why a feature broke.",
        hint: "Think about what happens when an error occurs and nobody logs or handles it.",
        hintCostXP: 5
      },
      {
        id: "js24-q3",
        type: "code_output",
        title: "Execution Halting on Throw",
        prompt: "What is logged when calling validateInput(-5)?",
        codeSnippet: `function validateInput(num) {
  try {
    if (num < 0) {
      throw new Error("Negative numbers not allowed");
    }
    console.log("Valid:", num);
  } catch (error) {
    console.log("Caught:", error.message);
  }
}
validateInput(-5);`,
        language: "javascript",
        options: [
          "'Valid: -5' followed by 'Caught: Negative numbers not allowed'",
          "'Caught: Negative numbers not allowed'",
          "'Caught: undefined'",
          "The script crashes and logs nothing"
        ],
        correctAnswer: 1,
        explanation: "When throw executes, the rest of the try block is immediately abandoned. Control jumps straight into catch, so 'Valid: -5' is never reached.",
        hint: "Does code after a throw statement in a try block continue running?",
        hintCostXP: 5
      }
    ]
  },

  {
    id: "quiz-javascript-js25",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js25-es-modules",
    lessonCode: "JS-25",
    lessonTitle: "ES Modules: Organizing Code with import & export",
    description: "Assess your understanding of ES module isolation, default vs named exports, and import syntax.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js25-q1",
        type: "multiple_choice",
        title: "Importing Default vs Named Exports",
        prompt: "Given a module file that exports both a default class and named constants: 'export default class App {}' and 'export const VERSION = \"1.0\";', which import syntax is correct?",
        options: [
          "import { App, VERSION } from './app.js';",
          "import App, { VERSION } from './app.js';",
          "import App, VERSION from './app.js';",
          "import { default as App, VERSION } from './app.js' only"
        ],
        correctAnswer: 1,
        explanation: "Default exports are imported WITHOUT curly braces (App), whereas named exports REQUIRE curly braces ({ VERSION }). Combining them yields 'import App, { VERSION } from ...'.",
        hint: "Curly braces are reserved exclusively for named exports.",
        hintCostXP: 5
      },
      {
        id: "js25-q2",
        type: "multiple_choice",
        title: "Module Scope Isolation",
        prompt: "What is the primary scoping advantage of ES Modules over traditional script tags?",
        options: [
          "Variables declared inside a module are private to that file and do not pollute the global window scope",
          "All module variables are automatically stored in the user's localStorage",
          "Modules run in background Web Workers automatically",
          "Modules turn all functions into asynchronous Promises"
        ],
        correctAnswer: 0,
        explanation: "Every ES Module has its own top-level scope. Top-level variables remain private unless explicitly exported, eliminating global naming collisions.",
        hint: "Think about global variables vs file-level private scopes.",
        hintCostXP: 5
      },
      {
        id: "js25-q3",
        type: "code_output",
        title: "Renaming Imports with 'as'",
        prompt: "What does this code output when importing with an alias?",
        codeSnippet: `// Inside stringUtils.js:
// export const clean = (str) => str.trim().toUpperCase();

// Inside main.js:
import { clean as sanitize } from './stringUtils.js';
console.log(sanitize("   learncraft   "));`,
        language: "javascript",
        options: [
          "'   LEARNCRAFT   '",
          "'LEARNCRAFT'",
          "TypeError: sanitize is not a function",
          "'learncraft'"
        ],
        correctAnswer: 1,
        explanation: "The 'as' keyword renames the imported 'clean' function to 'sanitize' locally, which trims the outer whitespace and converts the text to uppercase.",
        hint: "The function trims whitespace and converts to uppercase.",
        hintCostXP: 5
      }
    ]
  },

  {
    id: "quiz-javascript-js26",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js26-working-with-json",
    lessonCode: "JS-26",
    lessonTitle: "Working with JSON: Parsing and Serializing Data",
    description: "Evaluate your skills in serializing data with JSON.stringify, defensive JSON.parse techniques, and JSON format rules.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js26-q1",
        type: "code_output",
        title: "Serialization Omission Rules",
        prompt: "What is the output of JSON.stringify on the following object?",
        codeSnippet: `const person = {
  name: "Sam",
  age: 26,
  greet: function() { return "Hi!"; },
  nickname: undefined
};
console.log(JSON.stringify(person));`,
        language: "javascript",
        options: [
          "'{\"name\":\"Sam\",\"age\":26,\"greet\":\"Hi!\",\"nickname\":null}'",
          "'{\"name\":\"Sam\",\"age\":26}'",
          "'{\"name\":\"Sam\",\"age\":26,\"nickname\":undefined}'",
          "Throws a TypeError because functions cannot be passed to stringify"
        ],
        correctAnswer: 1,
        explanation: "JSON.stringify automatically strips out functions, undefined values, and Symbols from objects because JSON is a data-only format that cannot represent executable code.",
        hint: "What happens to functions and undefined properties during stringification?",
        hintCostXP: 5
      },
      {
        id: "js26-q2",
        type: "multiple_choice",
        title: "Strict JSON Syntax Requirements",
        prompt: "Which of the following text strings is VALID JSON that can be parsed with JSON.parse() without throwing a SyntaxError?",
        options: [
          "{ 'title': 'Book', 'pages': 300 }",
          "{ \"title\": \"Book\", \"pages\": 300, }",
          "{\"title\": \"Book\", \"pages\": 300}",
          "{ title: \"Book\", pages: 300 }"
        ],
        correctAnswer: 2,
        explanation: "In valid JSON, all keys MUST be enclosed in double quotes (not single quotes, not unquoted), and trailing commas after the last property are strictly forbidden.",
        hint: "Look for double quotes on all keys and no trailing commas.",
        hintCostXP: 5
      },
      {
        id: "js26-q3",
        type: "multiple_choice",
        title: "Handling Malformed JSON Safely",
        prompt: "What happens if you execute JSON.parse('malformed string') without wrapping it in a try/catch block?",
        options: [
          "It returns undefined and the program continues running",
          "It returns null and logs an internal warning",
          "It throws a synchronous SyntaxError that halts program execution if uncaught",
          "The browser prompts the user to enter valid JSON"
        ],
        correctAnswer: 2,
        explanation: "JSON.parse throws a synchronous SyntaxError whenever the input string is not valid JSON. Uncaught, it terminates the script.",
        hint: "JSON.parse is strict: bad format causes a synchronous exception.",
        hintCostXP: 5
      }
    ]
  },

  {
    id: "quiz-javascript-js27",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js27-the-fetch-api",
    lessonCode: "JS-27",
    lessonTitle: "The Fetch API: Communicating with REST APIs",
    description: "Test your ability to make HTTP requests, handle response.ok guards, and send JSON payloads with POST.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js27-q1",
        type: "multiple_choice",
        title: "The #1 Fetch Trap: HTTP Error Statuses",
        prompt: "How does the fetch() API respond when a remote server returns an HTTP 404 (Not Found) or 500 (Internal Server Error) response?",
        options: [
          "The fetch() Promise rejects immediately and jumps directly into the catch block",
          "The fetch() Promise fulfills successfully; response.ok is set to false and response.status holds the error code",
          "The browser automatically retries the request up to 3 times",
          "A NetworkError is thrown synchronously"
        ],
        correctAnswer: 1,
        explanation: "fetch() only rejects on real network failures (like lost internet connection or DNS errors). HTTP error status codes (like 404 or 500) fulfill successfully, but response.ok is false.",
        hint: "Does fetch reject on HTTP error status codes?",
        hintCostXP: 5
      },
      {
        id: "js27-q2",
        type: "multiple_choice",
        title: "The Two-Step Promise Pattern",
        prompt: "Why are there two consecutive await statements in 'const res = await fetch(url); const data = await res.json();'?",
        options: [
          "The first awaits DNS resolution; the second awaits HTTP handshake",
          "The first awaits HTTP response headers and status; the second awaits downloading and parsing the streaming body as JSON",
          "The second await is optional and only needed for POST requests",
          "The first await reads from cache; the second reads from the network"
        ],
        correctAnswer: 1,
        explanation: "The first Promise resolves as soon as the HTTP headers arrive (giving you res.status and res.ok). The second Promise (res.json()) streams the rest of the body packets and parses them into a JavaScript object.",
        hint: "The first step gets the response envelope; the second step reads and parses the stream.",
        hintCostXP: 5
      },
      {
        id: "js27-q3",
        type: "multiple_choice",
        title: "Sending JSON Payloads with POST",
        prompt: "When sending a POST request containing JSON data via fetch(), which HTTP header is required to inform the server of the payload format?",
        options: [
          "'Accept': 'text/plain'",
          "'Content-Type': 'application/json'",
          "'Authorization': 'Bearer JSON'",
          "'Data-Format': 'json-stream'"
        ],
        correctAnswer: 1,
        explanation: "The 'Content-Type': 'application/json' header informs the backend server that the request body is formatted as a JSON string and should be parsed accordingly.",
        hint: "Content-Type specifies the media type of the resource being sent.",
        hintCostXP: 5
      }
    ]
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APPLY TO LESSON CONTENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let lessonContent = fs.readFileSync(lessonFilePath, 'utf8');

const slugs = Object.keys(batch8Lessons);
const nextSlugs = [...slugs, "js28-dom-essentials"];

for (const slug of slugs) {
  const lessonObj = batch8Lessons[slug];
  const marker = `  "${slug}": {`;
  const startIdx = lessonContent.indexOf(marker);

  if (startIdx === -1) {
    throw new Error(`Could not find start index for ${slug} in ${lessonFilePath}`);
  }

  let endIdx = -1;
  for (const nextSlug of nextSlugs) {
    if (nextSlug === slug) continue;
    const nextMarker = `  "${nextSlug}": {`;
    const foundIdx = lessonContent.indexOf(nextMarker, startIdx);
    if (foundIdx !== -1) {
      if (endIdx === -1 || foundIdx < endIdx) {
        endIdx = foundIdx;
      }
    }
  }

  if (endIdx === -1) {
    throw new Error(`Could not find end index for ${slug}`);
  }

  const replacement = `  "${slug}": ` + JSON.stringify(lessonObj, null, 2) + ',\n\n';
  lessonContent = lessonContent.substring(0, startIdx) + replacement + lessonContent.substring(endIdx);
}

fs.writeFileSync(lessonFilePath, lessonContent, 'utf8');
console.log('Successfully updated javascript-lesson-content.ts for JS-24, JS-25, JS-26, and JS-27!');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APPLY TO QUIZZES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let quizContent = fs.readFileSync(quizFilePath, 'utf8');

for (const quizObj of batch8Quizzes) {
  const marker = `"lessonSlug": "${quizObj.lessonSlug}"`;
  const markerIdx = quizContent.indexOf(marker);
  if (markerIdx === -1) {
    throw new Error(`Could not find quiz for ${quizObj.lessonSlug} in ${quizFilePath}`);
  }

  // Find the opening brace of this quiz object: last "  {" before markerIdx
  const startIdx = quizContent.lastIndexOf('  {', markerIdx);
  if (startIdx === -1) {
    throw new Error(`Could not find start of quiz object for ${quizObj.lessonSlug}`);
  }

  // Find the closing brace of this quiz object: "\n  }," or "\n  }"
  const closeComma = quizContent.indexOf('\n  },', startIdx);
  const closeBrace = quizContent.indexOf('\n  }\n];', startIdx);
  
  let endIdx = -1;
  let hasTrailingComma = true;
  if (closeComma !== -1 && (closeBrace === -1 || closeComma < closeBrace)) {
    endIdx = closeComma + 5; // length of "\n  },"
    hasTrailingComma = true;
  } else if (closeBrace !== -1) {
    endIdx = closeBrace + 4; // length of "\n  }"
    hasTrailingComma = false;
  }

  if (endIdx === -1) {
    throw new Error(`Could not find end of quiz object for ${quizObj.lessonSlug}`);
  }

  const formattedQuiz = '  ' + JSON.stringify(quizObj, null, 2).replace(/\n/g, '\n  ') + (hasTrailingComma ? ',' : '');
  quizContent = quizContent.substring(0, startIdx) + formattedQuiz + quizContent.substring(endIdx);
}

fs.writeFileSync(quizFilePath, quizContent, 'utf8');
console.log('Successfully updated lib/quiz/javascript-quizzes.ts for JS-24, JS-25, JS-26, and JS-27!');
