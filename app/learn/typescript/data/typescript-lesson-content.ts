/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TYPESCRIPT IN-DEPTH LESSON CONTENT LAYER — LearnCraft
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Authoritative, beginner-friendly lessons for the TypeScript curriculum.
 * Every lesson features intuitive everyday analogies, step-by-step
 * mental models, clear Bad vs Clean code comparisons, interactive
 * code sandboxes, and concept-reinforcing Knowledge Check Quizzes.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { StandardLessonContent, LessonSectionItem } from "@/components/curriculum/lesson-content-types";
import { getLessonBySlug, getAllLessons } from "./typescript-curriculum";

export const TYPESCRIPT_SECTIONS: LessonSectionItem[] = [
  { id: "part1", label: "Mental Model & Overview", icon: "🧠" },
  { id: "part2", label: "Core Mechanics & Syntax", icon: "⚙️" },
  { id: "part3", label: "Step-by-Step Mental Model", icon: "📖" },
  { id: "part4", label: "Anti-Patterns vs Clean Code", icon: "🛡️" },
  { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
  { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
  { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
];

// ────────────────────────────────────────────────────────────────────────────
// TS-01: What is TypeScript? The Guardrail Mental Model
// ────────────────────────────────────────────────────────────────────────────
const TS01_CONTENT: StandardLessonContent = {
  slug: "ts01-mental-model",
  code: "TS-01",
  title: "What is TypeScript? The Guardrail Mental Model",
  subtitle: "Discover what TypeScript is, how it adds a safety net to JavaScript, and how compile-time type checking prevents runtime bugs.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Smart Spellchecker: Why JavaScript Needs TypeScript",
    bigPicture:
      "JavaScript is flexible: you can create variables, change their types, and call functions with any inputs. But that freedom has a major downside—if you misspell a property name or pass the wrong type of data, JavaScript won't warn you until the code actually runs in production and crashes in front of a real user! TypeScript is a smart safety guardrail built on top of JavaScript. It acts like a real-time spellchecker for your code, underlining mistakes in red right inside your editor before you ever run it.",
    breakdownTitle: "Four Core Foundations of TypeScript:",
    breakdownItems: [
      {
        title: "JavaScript + Types",
        desc: "TypeScript is not a completely foreign language. Every line of valid JavaScript is already valid TypeScript. It simply adds a layer of type definitions on top.",
      },
      {
        title: "Compile-Time Checking",
        desc: "In your editor, TypeScript checks your code ahead of time. It catches typos, missing properties, and logic errors before you save or run the program.",
      },
      {
        title: "The Type Erasure Principle",
        desc: "Browsers and Node.js cannot run TypeScript directly. When TypeScript compiles your code to JavaScript, all types are completely stripped away, leaving clean standard JavaScript with zero runtime performance cost.",
      },
      {
        title: "Instant Autocomplete & Tooling",
        desc: "Because TypeScript knows the shape of your data, your editor can suggest properties, autocomplete method names, and explain function parameters as you type.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Writing TypeScript vs Running JavaScript",
    intro: "How code journeys from your editor into the browser or server across 3 distinct phases:",
    cards: [
      {
        number: "01",
        tag: "Phase 1: Write",
        title: "Editor Checking (Compile-Time)",
        description:
          "You write .ts files with types. TypeScript inspects every variable and function in real time, highlighting errors with red squiggly lines before you run anything.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Phase 2: Compile",
        title: "The tsc Compiler & Type Erasure",
        description:
          "The TypeScript compiler (tsc) strips out every type annotation and interface. It outputs a 100% clean, standard .js file ready for any browser or Node.js runtime.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Phase 3: Run",
        title: "Pure JavaScript Execution (Runtime)",
        description:
          "The browser or Node.js executes the plain .js file. Because types were completely erased, your application runs at full native speed with zero extra memory overhead.",
        color: "emerald",
      },
    ],
    rule: {
      title: "💡 The Golden Rule of Type Erasure",
      content:
        "TypeScript types exist ONLY during development and compilation! Once code compiles to JavaScript, all types vanish completely. TypeScript cannot check live external data arriving from the internet at runtime without your own validation logic.",
    },
  },
  part3: {
    title: "The Mental Model: The Safety Net & The Blueprint",
    intro: "Why modern software teams rely on TypeScript instead of plain JavaScript:",
    points: [
      {
        title: "1. The Spelling Mistake Trap",
        content:
          "In plain JavaScript, writing user.locatoin instead of user.location silently produces undefined without warning. If you then call .toLowerCase(), the entire app crashes. TypeScript stops you immediately: 'Property locatoin does not exist on type User. Did you mean location?'",
        codeSnippet: `// TypeScript catches the typo in your editor:\nconst city = user.locatoin; // ❌ Error: Property 'locatoin' does not exist!`,
      },
      {
        title: "2. The Living Documentation",
        content:
          "In plain JavaScript, function calculateDiscount(price, user) forces you to guess: is price a number? What properties does user have? In TypeScript, function calculateDiscount(price: number, user: UserAccount): number tells you the exact inputs and outputs instantly.",
        codeSnippet: `function calculateDiscount(price: number, user: { isPremium: boolean }): number {\n  return user.isPremium ? price * 0.8 : price;\n}`,
      },
      {
        title: "3. Fearless Refactoring",
        content:
          "Need to rename a property across 50 files? In plain JavaScript, doing find-and-replace often breaks code silently. In TypeScript, renaming a property updates all references automatically, and flags any missed call sites immediately.",
      },
    ],
  },
  part4: {
    title: "Common Mistakes: Runtime Crashes in JS vs Compile-Time Safety in TS",
    bad: {
      title: "❌ Plain JavaScript: Silent property typo leads to runtime crash",
      code: `// Plain JavaScript: No errors shown in editor!
const customer = {
  name: "Morgan",
  email: "morgan@example.com"
};

// Typo: 'emial' instead of 'email'
// JavaScript doesn't complain, evaluates to undefined!
console.log("Contacting: " + customer.emial.toLowerCase());
// 💥 BOOM! Uncaught TypeError: Cannot read properties of undefined (reading 'toLowerCase')`,
      explanation:
        "JavaScript allows typos on object properties without complaint. The typo only explodes when executed at runtime, crashing the user's experience.",
    },
    good: {
      title: "✅ TypeScript: Catches the typo instantly before execution",
      code: `// TypeScript: Protects you right in the editor!
interface Customer {
  name: string;
  email: string;
}

const customer: Customer = {
  name: "Morgan",
  email: "morgan@example.com"
};

// TypeScript immediately underlines 'emial' in red:
// ❌ Error: Property 'emial' does not exist on type 'Customer'. Did you mean 'email'?
console.log("Contacting: " + customer.email.toLowerCase());
// ✅ Clean execution: "Contacting: morgan@example.com"`,
      explanation:
        "TypeScript checks the shape of Customer and immediately prevents you from accessing non-existent properties, turning a potential production bug into an instant editor fix.",
    },
  },
  part5: {
    title: "TypeScript Playground: First Steps",
    intro: "Run your first TypeScript code. Try changing a property name or assigning a number to a string to see how TypeScript reacts:",
    starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TS-01: WHAT IS TYPESCRIPT? PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Defining a clear data contract:
interface Student {
  name: string;
  age: number;
  enrolled: boolean;
}

// 2. Creating an object that matches the contract:
const student: Student = {
  name: "Alex",
  age: 22,
  enrolled: true
};

// 3. A function with typed parameters and return type:
function greetStudent(s: Student): string {
  return \`Hello, \${s.name}! You are \${s.age} years old. Status: \${s.enrolled ? "Active" : "Inactive"}\`;
}

console.log(greetStudent(student));

// 💡 Try this:
// Uncomment the line below to see TypeScript catch an invalid property:
// console.log(student.graduationYear);
`,
  },
  part6: {
    title: "Concept Check: Understanding TypeScript",
    quiz: {
      question:
        "What happens to TypeScript type annotations (like ': string' or 'interface User') when your code is compiled to JavaScript?",
      options: [
        "They are converted into JavaScript classes that check types on every line",
        "They are completely erased, leaving clean standard JavaScript with zero runtime performance cost",
        "They are stored in a hidden database in the browser",
        "They slow down code execution because the browser must check them at runtime",
      ],
      correctIndex: 1,
      explanation:
        "TypeScript uses Type Erasure: all types, interfaces, and annotations exist solely at compile time. The compiler completely erases them, resulting in standard JavaScript that runs at full native speed.",
    },
  },
  part7: {
    title: "Key Takeaways: Understanding TypeScript",
    takeaways: [
      {
        title: "1. JavaScript + Types",
        desc: "TypeScript is a superset of JavaScript: all valid JavaScript is valid TypeScript with type safety added on top.",
      },
      {
        title: "2. Compile-Time Verification",
        desc: "Compile-time checking catches typos, shape mismatches, and logic errors in your editor before your code ever runs.",
      },
      {
        title: "3. Zero Runtime Overhead",
        desc: "Type erasure means types are completely stripped away when compiling to JavaScript, so there is zero runtime performance penalty.",
      },
      {
        title: "4. Developer Superpowers",
        desc: "TypeScript provides self-documenting code and instant autocomplete, making codebases easier to understand and refactor.",
      },
    ],
    nextLessonPreview: {
      title: "TS-02: Basic Types & Type Inference",
      desc: "Learn the core primitive types (string, number, boolean), when to write explicit type annotations, and how automatic type inference works.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-02: Basic Types & Type Inference
// ────────────────────────────────────────────────────────────────────────────
const TS02_CONTENT: StandardLessonContent = {
  slug: "ts02-primitives-inference",
  code: "TS-02",
  title: "Basic Types & Type Inference: Annotating and Letting TS Infer",
  subtitle: "Master primitive types (string, number, boolean), understand when to write annotations, and let TypeScript infer types automatically.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Transparent Bins: Primitives and Annotations",
    bigPicture:
      "Every program handles data: names, ages, toggle switches, prices, and IDs. In plain JavaScript, a variable declared with 'let score = 50' can later be changed to 'score = \"fifty\"', often causing subtle math bugs later on. TypeScript introduces strict basic types: string, number, boolean, null, and undefined. Once a variable is assigned a type, TypeScript guarantees it stays that type throughout its entire lifetime.",
    breakdownTitle: "Core Primitive Types in TypeScript:",
    breakdownItems: [
      {
        title: "string",
        desc: "Represents textual data wrapped in quotes: 'Alex', \"TypeScript\", or template literals `Hello ${name}`.",
      },
      {
        title: "number",
        desc: "Represents both integers and decimals: 42, 3.14, -10. In TypeScript, all numbers share the single 'number' type.",
      },
      {
        title: "boolean",
        desc: "Represents binary truth values: strictly true or false.",
      },
      {
        title: "null & undefined",
        desc: "Represent intentional absence of a value (null) or an uninitialized variable (undefined).",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Type Annotations vs Automatic Type Inference",
    intro: "When should you write type annotations, and when should you let TypeScript do the work?",
    cards: [
      {
        number: "01",
        tag: "Explicit",
        title: "Type Annotations (: type)",
        description:
          "Explicitly telling TypeScript what type a variable must hold: let city: string = 'Dhaka';. Required when declaring a variable before assigning its value.",
        color: "emerald",
      },
      {
        number: "02",
        tag: "Automatic",
        title: "Type Inference (Smart Guessing)",
        description:
          "If you initialize a variable with a value (let count = 10;), TypeScript automatically infers that count is a number. Writing ': number' here is redundant noise!",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Error Guard",
        title: "Type Assignability Check",
        description:
          "Once a type is set (explicitly or inferred), reassigning a different type triggers: Type 'string' is not assignable to type 'number'.",
        color: "purple",
      },
    ],
    rule: {
      title: "💡 The Golden Rule of Type Inference",
      content:
        "Don't annotate the obvious! If you write 'let message = \"Hello\";', TypeScript already knows 100% that message is a string. Reserve explicit annotations for function parameters, variables initialized later, or complex object shapes.",
    },
  },
  part3: {
    title: "The Mental Model: The Assignability Gatekeeper",
    intro: "How TypeScript locks in variable types to protect your program:",
    points: [
      {
        title: "1. The Stamp of Origin",
        content:
          "When you write let price = 99.99;, TypeScript stamps price with the type 'number'. From that moment on, the compiler treats price strictly as a number everywhere in the file.",
        codeSnippet: `let price = 99.99; // TypeScript locks the type to: number`,
      },
      {
        title: "2. The Gatekeeper Check",
        content:
          "When you write price = 79.99;, TypeScript checks: is 79.99 a number? Yes -> Allowed. But if you write price = 'free';, the gatekeeper blocks it: Type 'string' is not assignable to type 'number'.",
        codeSnippet: `price = 79.99;   // ✅ Allowed (same type)\n// price = "free"; // ❌ Type 'string' is not assignable to type 'number'`,
      },
      {
        title: "3. const vs let Inference",
        content:
          "With let username = 'Alex';, TypeScript infers the broad type 'string' (because the value could change to another string). With const taxRate = 0.05;, TypeScript infers the exact literal type 0.05 (because const can never change!).",
      },
    ],
  },
  part4: {
    title: "Common Mistakes: Redundant Noise vs Idiomatic Inference",
    bad: {
      title: "❌ Bad: Cluttering obvious code with redundant type annotations",
      code: `// Cluttered and noisy:
let userName: string = "Sam";
let userAge: number = 28;
let isLoggedIn: boolean = false;
let discountPercent: number = 10;

// Adding : string or : number here provides zero extra safety;
// TypeScript already infers them with 100% precision!`,
      explanation:
        "Over-annotating simple initialized variables adds visual clutter without improving safety. Professional TypeScript code relies on clean inference.",
    },
    good: {
      title: "✅ Clean: Let inference handle obvious values, annotate when needed",
      code: `// Clean & Idiomatic: Inferred automatically!
let userName = "Sam";          // Inferred as string
let userAge = 28;              // Inferred as number
let isLoggedIn = false;        // Inferred as boolean

// Annotate when declaring a variable before assigning its value:
let userScore: number;         // Annotation required!
userScore = 100;               // ✅ Allowed
// userScore = "perfect";      // ❌ Error: Type 'string' is not assignable to 'number'`,
      explanation:
        "Clean code lets TypeScript infer initialized variables and reserves explicit annotations for uninitialized variables or function contracts.",
    },
  },
  part5: {
    title: "Type Annotations & Inference Playground",
    intro: "Experiment with type annotations, automatic inference, and assignability checks:",
    starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TS-02: BASIC TYPES & INFERENCE PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Automatic Type Inference:
let courseName = "Mastering TypeScript"; // Inferred as string
let studentCount = 1420;                // Inferred as number
let isPublished = true;                 // Inferred as boolean

console.log(\`\${courseName} has \${studentCount} students. Published: \${isPublished}\`);

// 2. Valid reassignment with matching type:
studentCount = studentCount + 1; // ✅ Valid: still a number
console.log(\`Updated enrollment: \${studentCount}\`);

// 3. Uninitialized variable (Explicit annotation needed):
let currentGrade: string;
currentGrade = "A+"; // ✅ Valid: string assigned to string
console.log(\`Current grade: \${currentGrade}\`);

// 💡 Try this:
// Uncomment the line below to see TypeScript stop an invalid reassignment:
// courseName = 404; // Error: Type 'number' is not assignable to type 'string'
`,
  },
  part6: {
    title: "Concept Check: Basic Types & Inference",
    quiz: {
      question: "What type does TypeScript automatically infer for the variable in 'let totalAmount = 250;'?",
      options: [
        "any",
        "number",
        "integer",
        "unknown",
      ],
      correctIndex: 1,
      explanation:
        "TypeScript automatically infers 'number' from the initial value 250. In TypeScript and JavaScript, all numerical values (integers and decimals) are of type 'number'.",
    },
  },
  part7: {
    title: "Key Takeaways: Basic Types & Inference",
    takeaways: [
      {
        title: "1. Core Primitives",
        desc: "The fundamental primitives are string, number, boolean, null, and undefined.",
      },
      {
        title: "2. Automatic Inference",
        desc: "Type inference allows TypeScript to automatically determine variable types from their initial values.",
      },
      {
        title: "3. Avoid Redundant Annotations",
        desc: "Do not write redundant type annotations on simple initialized variables; let TypeScript infer them cleanly.",
      },
      {
        title: "4. Annotate Uninitialized Variables",
        desc: "Use explicit type annotations when declaring variables without an immediate value: let score: number;.",
      },
    ],
    nextLessonPreview: {
      title: "TS-03: Arrays, Tuples & Readonly Collections",
      desc: "Learn how to type collections of data with string[] and number[], create fixed-length tuples, and prevent mutations with readonly.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-03: Arrays, Tuples & Readonly Collections
// ────────────────────────────────────────────────────────────────────────────
const TS03_CONTENT: StandardLessonContent = {
  slug: "ts03-arrays-tuples",
  code: "TS-03",
  title: "Arrays & Tuples: Typed Collections & Fixed Sequences",
  subtitle: "Create type-safe arrays with string[] and number[], enforce fixed positions with tuples, and prevent unwanted modifications with readonly.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Egg Carton & The GPS Coordinate: Typed Collections",
    bigPicture:
      "In plain JavaScript, arrays have no boundaries on what they can contain. A single array can hold numbers, strings, objects, and functions all mixed together: [42, 'hello', true]. When you loop through such an array, you never know what type of data the next element will be, leading to runtime crashes. TypeScript solves this with Typed Arrays (where every element shares a consistent type) and Tuples (fixed-length arrays where each position has a specific, guaranteed type).",
    breakdownTitle: "Three Collection Types to Master:",
    breakdownItems: [
      {
        title: "Typed Arrays (T[])",
        desc: "Enforces that every element in the array matches type T (e.g., string[] or number[]). The list can grow or shrink, but element types stay consistent.",
      },
      {
        title: "Tuples ([T1, T2])",
        desc: "A special fixed-length array where the order and type of each position is strictly enforced (e.g., [string, number] for a name and score pair).",
      },
      {
        title: "The readonly Modifier",
        desc: "Prefixing an array or tuple with readonly locks it down, preventing methods like .push(), .pop(), or direct index reassignment.",
      },
      {
        title: "Array Method Type Safety",
        desc: "Methods like .push(), .map(), and .filter() are strictly type-checked. Pushing a number into a string[] is caught immediately.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Array Syntax, Tuples & Readonly",
    intro: "Syntax rules for declaring and protecting collections in TypeScript:",
    cards: [
      {
        number: "01",
        tag: "Arrays",
        title: "Typed Arrays: string[] & number[]",
        description:
          "Declare arrays with elementType[]: const tags: string[] = ['react', 'node'];. TypeScript ensures .push('ts') succeeds, but .push(123) is flagged as a type error.",
        color: "emerald",
      },
      {
        number: "02",
        tag: "Tuples",
        title: "Fixed Tuples: [string, number]",
        description:
          "Tuples enforce both exact length and position types: const coordinate: [number, number] = [40.7128, -74.0060];. Position 0 and 1 are guaranteed to be numbers.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Immutability",
        title: "The readonly Modifier",
        description:
          "Use readonly number[] or ReadonlyArray<number> to create immutable arrays. Any attempt to modify the array (.push(), .splice(), arr[0] = 5) causes a compile error.",
        color: "purple",
      },
    ],
    rule: {
      title: "💡 Tuple vs Array Rule of Thumb",
      content:
        "Use an array (string[]) when the number of items can grow or shrink and all items represent the same kind of thing (like a list of tags). Use a tuple ([number, number]) when the collection represents a single structured unit where the position of each item has a distinct meaning (like [latitude, longitude] or [key, value]).",
    },
  },
  part3: {
    title: "The Mental Model: Flexible Lists vs Fixed Units",
    intro: "Visualizing how TypeScript treats arrays and tuples in memory:",
    points: [
      {
        title: "1. The Open-Ended Train (Arrays)",
        content:
          "An array string[] is like a passenger train: you can attach another passenger car at any time (push), but every car must be for passengers (strings). You cannot attach a freight car full of cement (numbers).",
        codeSnippet: `const fruits: string[] = ["apple", "banana"];\nfruits.push("orange"); // ✅ Allowed\n// fruits.push(123);   // ❌ Type 'number' is not assignable to 'string'`,
      },
      {
        title: "2. The Key-Card Slot (Tuples)",
        content:
          "A tuple [string, number] is like a security key-card that requires exactly two specific slots: Slot 0 MUST be a name, Slot 1 MUST be an ID number. Swapping the order or adding a third slot is strictly rejected by the lock.",
        codeSnippet: `type UserRecord = [name: string, id: number];\nconst user: UserRecord = ["Sam", 101]; // ✅ Allowed\n// const invalid: UserRecord = [101, "Sam"]; // ❌ Error: Order swapped!`,
      },
      {
        title: "3. Readonly as Frozen Armor",
        content:
          "Adding readonly to an array strips away all mutating methods (.push, .pop, .shift, .sort). You can still read elements and run non-mutating methods (.map, .filter, .slice), but the original array is completely protected from accidental alteration.",
      },
    ],
  },
  part4: {
    title: "Common Mistakes: Unchecked Mixed Arrays vs Type-Safe Tuples",
    bad: {
      title: "❌ Bad: Using loose arrays for paired data, leading to index mix-ups",
      code: `// Plain JS or loose typing:
const userRecord = ["Alex", 25]; // Inferred as (string | number)[]

// Fragile! Array can grow uncontrollably, and positions can be swapped:
userRecord.push("Extra text");
userRecord.push(999);

// At runtime, you don't know what is at index 0, 1, or 2!`,
      explanation:
        "Loose arrays have variable lengths and mixed element types, making positional data unreliable and prone to indexing bugs.",
    },
    good: {
      title: "✅ Clean: Enforce exact structure with a strict Tuple",
      code: `// Strict Tuple: Exactly 2 elements, position 0 is string, position 1 is number
type UserPair = [name: string, age: number];

const user: UserPair = ["Alex", 25]; // ✅ Valid

// ❌ Error: Type 'number' is not assignable to type 'string' (order enforced!)
// const wrongOrder: UserPair = [25, "Alex"];

// Readonly array: Cannot be accidentally mutated
const allowedRoles: readonly string[] = ["admin", "editor", "viewer"];
// allowedRoles.push("hacker"); // ❌ Error: Property 'push' does not exist on 'readonly string[]'`,
      explanation:
        "Tuples guarantee exact position types and element counts, while readonly arrays protect fixed lists from being modified anywhere in your codebase.",
    },
  },
  part5: {
    title: "Arrays & Tuples Playground",
    intro: "Practice creating typed arrays, enforcing tuple contracts, and observing readonly protections:",
    starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TS-03: ARRAYS & TUPLES PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Type-Safe Array:
const skills: string[] = ["JavaScript", "TypeScript", "React"];
skills.push("Node.js"); // ✅ Valid: adding a string
console.log("Developer skills:", skills.join(", "));

// 2. Fixed-Length Tuple for Geographic Coordinates [latitude, longitude]:
type Coordinates = [latitude: number, longitude: number];

const paris: Coordinates = [48.8566, 2.3522];
console.log(\`Paris Coordinates: Lat \${paris[0]}, Long \${paris[1]}\`);

// 3. Readonly Array (Immutable List):
const validStatuses: readonly string[] = ["pending", "active", "completed"];
console.log("Allowed statuses:", validStatuses.join(", "));

// 💡 Try this:
// Uncomment these lines to see TypeScript protect your data:
// skills.push(404); // Error: Argument of type 'number' is not assignable to parameter of type 'string'
// validStatuses.push("deleted"); // Error: Property 'push' does not exist on type 'readonly string[]'
`,
  },
  part6: {
    title: "Concept Check: Arrays & Tuples",
    quiz: {
      question: "Given 'const entry: [string, number] = [\"Score\", 100];', which of the following reassignments will cause a TypeScript compile error?",
      options: [
        "entry[0] = 'Points';",
        "entry[1] = 200;",
        "entry[0] = 50;",
        "console.log(entry[0]);",
      ],
      correctIndex: 2,
      explanation:
        "In the tuple [string, number], position 0 is strictly typed as a 'string'. Assigning the number 50 to entry[0] causes the type error: Type 'number' is not assignable to type 'string'.",
    },
  },
  part7: {
    title: "Key Takeaways: Arrays & Tuples",
    takeaways: [
      {
        title: "1. Typed Arrays (T[])",
        desc: "Typed arrays (e.g. string[]) ensure every item in the list matches the declared type and prevent mixed-type bugs.",
      },
      {
        title: "2. Fixed-Length Tuples",
        desc: "Tuples ([string, number]) enforce fixed element counts and exact types at each specific index position.",
      },
      {
        title: "3. Labeled Tuple Elements",
        desc: "Labeled tuple elements ([name: string, age: number]) make tuples self-documenting and easier to understand.",
      },
      {
        title: "4. Immutable with readonly",
        desc: "The readonly modifier prevents accidental array mutations like push(), pop(), or index reassignment.",
      },
    ],
    nextLessonPreview: {
      title: "TS-04: Object Types, Optional Fields & Readonly",
      desc: "Learn how to define object shapes, declare optional properties with ?, and protect fields with readonly.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-04: Object Types, Optional Fields & Readonly
// ────────────────────────────────────────────────────────────────────────────
const TS04_CONTENT: StandardLessonContent = {
  slug: "ts04-object-types",
  code: "TS-04",
  title: "Object Types, Optional Fields & Readonly",
  subtitle:
    "Master structural object contracts, optional properties (?), immutable readonly fields, and excess property checks.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Architectural Blueprint: Why Objects Need Contracts",
    bigPicture:
      "In JavaScript, an object is a lawless dictionary. You can attach any property, delete existing fields, or misspell keys like user.emial, and JavaScript won't complain until your app crashes in production. TypeScript changes this by treating object types as structural blueprints. An object type specifies exactly which properties MUST exist, what types their values must hold, and which properties are optional or immutable. If an object does not fit the blueprint, TypeScript stops you immediately.",
    breakdownTitle: "Four Foundational Object Concepts:",
    breakdownItems: [
      {
        title: "1. Inline Object Types",
        desc: "Define shapes directly where variables or parameters are declared: let user: { id: number; name: string }.",
      },
      {
        title: "2. Optional Properties (?)",
        desc: "Mark fields that may or may not exist with a question mark (e.g. bio?: string). TypeScript automatically types this as string | undefined.",
      },
      {
        title: "3. Readonly Fields (readonly)",
        desc: "Lock fields so they can only be assigned when the object is created. Any subsequent mutation (user.id = 2) triggers a compile-time error.",
      },
      {
        title: "4. Excess Property Checks",
        desc: "When assigning an object literal directly, TypeScript verifies you didn't pass unknown or misspelled properties.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Defining Shapes, Optionality & Immutability",
    intro: "Learn the essential syntax rules for building type-safe JavaScript objects:",
    cards: [
      {
        number: "01",
        tag: "Shape",
        title: "Required Properties",
        description:
          "Every unadorned property is strictly required. Omitting a required property or giving it the wrong type causes a compile error.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Optionality",
        title: "The '?' Modifier",
        description:
          "Appending ? after a property name (e.g., avatarUrl?: string) tells TypeScript that the property can be omitted or set to undefined.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Immutability",
        title: "The 'readonly' Modifier",
        description:
          "Prefixing a property with readonly protects critical keys (like primary keys or IDs) from being overwritten after creation.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Shape Rule",
      content:
        "TypeScript checks object shapes, not object names. If an object matches the requested property names and value types, TypeScript accepts it—this is called structural typing.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Inspecting Object Contracts",
    intro: "Follow how TypeScript enforces contracts on objects across their lifecycle:",
    points: [
      {
        title: "1. Defining an Inline Object Type",
        content:
          "You annotate an object with curly braces containing property names and types separated by semicolons or commas:",
        codeSnippet: `let user: {
  readonly id: number;
  name: string;
  email: string;
  bio?: string;
};

user = {
  id: 101,
  name: "Mehedi Hasan",
  email: "mehedi@example.com",
  // bio is optional, omitting it is 100% valid!
};`,
      },
      {
        title: "2. The Protection of readonly",
        content:
          "Attempting to reassign a readonly property after initialization will be blocked by the compiler instantly:",
        codeSnippet: `// ❌ Cannot assign to 'id' because it is a read-only property:
// user.id = 202;

// ✅ Mutable properties can be updated freely:
user.name = "Mehedi H.";`,
      },
      {
        title: "3. Handling Optional Properties Safely",
        content:
          "Because optional properties might be undefined, TypeScript forces you to check before accessing nested methods or values:",
        codeSnippet: `// ❌ Unsafe: user.bio could be undefined at runtime:
// console.log(user.bio.toUpperCase());

// ✅ Safe: Use optional chaining (?.) or an if check:
console.log(user.bio?.toUpperCase() ?? "No bio provided");`,
      },
      {
        title: "4. Direct Literals vs Excess Property Checks",
        content:
          "When passing an object literal directly, TypeScript flags extra unexpected properties to catch typos:",
        codeSnippet: `function printUser(u: { name: string }) {
  console.log(u.name);
}

// ❌ Error: Object literal may only specify known properties, and 'namme' does not exist
// printUser({ namme: "Alice" });

// ✅ Valid: Exactly matches the requested shape
printUser({ name: "Alice" });`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Untyped Objects & Accidental Mutations",
      code: `// ❌ Loose JavaScript: No property safety, easy typos, mutated IDs
const profile = {
  id: 1,
  username: "mehedi",
  plan: "pro",
};

// Accidental typo creates a new unused property instead of updating:
profile.usrename = "hasan";

// Accidental reassignment overwrites an immutable database ID:
profile.id = 999;`,
      explanation:
        "Without an object type contract, property typos silently succeed and critical identifiers can be accidentally overwritten anywhere in your codebase.",
    },
    good: {
      title: "Strict Object Contract with readonly and optional fields",
      code: `// ✅ TypeScript: Strict structural contract
type UserProfile = {
  readonly id: number;
  username: string;
  plan: string;
  avatarUrl?: string; // Optional field
};

const profile: UserProfile = {
  id: 1,
  username: "mehedi",
  plan: "pro",
};

// profile.id = 999; // ❌ Compile error: Cannot assign to read-only property
// profile.usrename = "hasan"; // ❌ Compile error: Property does not exist

profile.username = "hasan"; // ✅ Allowed and validated
console.log(profile.avatarUrl?.toUpperCase() ?? "Default Avatar");`,
      explanation:
        "The contract prevents typos, guarantees immutable identifiers, and ensures optional fields are accessed safely without runtime null-pointer crashes.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Test Object Contracts",
    intro:
      "Run this code in the live sandbox. Experiment with optional properties, observe autocomplete, and test the readonly guardrail:",
    starterCode: `// TS-04: Object Types & Shape Contracts
// 1. Define an explicit object shape
const product: {
  readonly id: string;
  name: string;
  price: number;
  discountPercentage?: number; // Optional
} = {
  id: "prod-901",
  name: "Wireless Mechanical Keyboard",
  price: 120,
  discountPercentage: 15,
};

console.log("Product:", product.name);
console.log("Base Price: $" + product.price);

// 2. Safe calculation with optional property
const finalPrice = product.discountPercentage !== undefined
  ? product.price * (1 - product.discountPercentage / 100)
  : product.price;

console.log("Final Price: $" + finalPrice);

// 3. Try uncommenting the line below to see TypeScript block mutation:
// product.id = "prod-999"; // Error: Cannot assign to 'id' because it is a read-only property

console.log("Verified product ID (immutable):", product.id);
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "What happens when you declare a property with bio?: string in an object type?",
      options: [
        "The property must always be a non-empty string.",
        "The property becomes optional and its inferred type is string | undefined.",
        "The property is automatically deleted when the object is compiled to JavaScript.",
        "The property can store any data type, including numbers and booleans.",
      ],
      correctIndex: 1,
      explanation:
        "The ? modifier indicates that the property is optional. At compile time, TypeScript types it as string | undefined, requiring you to handle the possibility of it being omitted before using string methods.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. Structural Blueprints",
        desc: "Object types define the exact properties and value types an object must have.",
      },
      {
        title: "2. Optional with '?'",
        desc: "Optional properties (prop?: Type) safely model fields that may not always be present.",
      },
      {
        title: "3. Immutability with 'readonly'",
        desc: "Prefixing a field with readonly locks it after initialization, protecting primary keys and configuration values.",
      },
      {
        title: "4. Direct Literal Verification",
        desc: "Excess property checks immediately catch misspelled property names on object literals.",
      },
    ],
    nextLessonPreview: {
      title: "TS-05: Special Types (any, unknown, void & never)",
      desc: "Learn how to master TypeScript's type hierarchy, avoid the hazards of any, and write defensive code with unknown and never.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-05: Special Types: any, unknown, void & never
// ────────────────────────────────────────────────────────────────────────────
const TS05_CONTENT: StandardLessonContent = {
  slug: "ts05-special-types",
  code: "TS-05",
  title: "Special Types: any, unknown, void & never",
  subtitle:
    "Master TypeScript's type hierarchy: avoid the hazards of any, embrace type-safe unknown, understand void returns, and leverage never for exhaustiveness.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Type Hierarchy: Ceilings, Floors, and Emptiness",
    bigPicture:
      "Beyond everyday types like numbers and strings, TypeScript features four special types that form the boundaries of the type system. At the very top sits any (which turns off type checking) and unknown (which demands proof before use). In the middle sits void (representing functions that return nothing). At the very bottom sits never (representing values that can never exist). Understanding these four types will turn you from someone who merely writes types into someone who designs bulletproof systems.",
    breakdownTitle: "The Four Special Types Explained Simply:",
    breakdownItems: [
      {
        title: "1. any (The Safety Off-Switch)",
        desc: "Allows any operation, property access, or assignment with zero compiler checks. It silences TypeScript and brings back all JavaScript runtime bugs. Treat 'any' as an emergency escape hatch, not normal code.",
      },
      {
        title: "2. unknown (The Safe Box)",
        desc: "Can hold any value just like any, BUT TypeScript forbids you from calling methods, accessing properties, or passing it anywhere until you check what it actually is (e.g. using typeof).",
      },
      {
        title: "3. void (Nothing Returned)",
        desc: "Used almost exclusively as the return type for functions that perform side effects (like logging or updating the DOM) and do not return a meaningful value.",
      },
      {
        title: "4. never (The Impossible Value)",
        desc: "Represents values that can never occur. A function that always throws an error or never finishes an infinite loop returns never. It is also used to ensure every union possibility has been handled.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Top Types vs Bottom Types",
    intro: "Learn how the compiler treats each special type when checking your code:",
    cards: [
      {
        number: "01",
        tag: "Dangerous",
        title: "any: Unchecked Freedom",
        description:
          "Tells TypeScript: 'Trust me, don't check anything.' If you make a typo or call a non-existent method on 'any', it crashes at runtime.",
        color: "amber",
      },
      {
        number: "02",
        tag: "Defensive",
        title: "unknown: Safe Verification",
        description:
          "Tells TypeScript: 'I don't know what this data is yet (like an API response). Make me check it with typeof or an if-statement before using it.'",
        color: "purple",
      },
      {
        number: "03",
        tag: "Exhaustive",
        title: "never: Guaranteed Closure",
        description:
          "The bottom type that can never hold a value. Used in functions that throw errors or to ensure no edge case is ever forgotten.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Golden Rule of Special Types",
      content:
        "Whenever you are tempted to write any because you don't know what an incoming value is, write unknown instead. It gives you the same flexibility without forfeiting type safety.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Taming Dynamic Data",
    intro: "See how each special type behaves in real TypeScript scenarios:",
    points: [
      {
        title: "1. Why 'any' is Hazardous",
        content:
          "Using any tells TypeScript to look away. You lose autocomplete, typos slip past, and your program crashes at runtime:",
        codeSnippet: `let looseValue: any = "Hello World";
looseValue = 42; // Allowed
// looseValue.nonExistentMethod(); // ❌ Compiles without warning! Crashes at runtime!`,
      },
      {
        title: "2. Why 'unknown' is the Type-Safe Alternative",
        content:
          "unknown accepts any value, but TypeScript refuses to let you perform any operations until you prove its type using a type guard:",
        codeSnippet: `let safeValue: unknown = "Hello World";

// ❌ Error: Object is of type 'unknown':
// safeValue.toUpperCase();

// ✅ Safe: Narrow the type with typeof first:
if (typeof safeValue === "string") {
  console.log(safeValue.toUpperCase()); // TypeScript knows it's a string here!
}`,
      },
      {
        title: "3. Functions with 'void'",
        content:
          "When a function performs an action but produces no output to return, its return type is void:",
        codeSnippet: `function logMessage(message: string): void {
  console.log("[LOG]:", message);
  // No return statement, or return;
}

const result = logMessage("User logged in"); // result has type 'void'`,
      },
      {
        title: "4. The Impossible 'never'",
        content:
          "Functions that never reach their endpoint return never. This happens when a function always throws an exception:",
        codeSnippet: `function fail(errorMsg: string): never {
  throw new Error(errorMsg);
  // Code execution stops here; nothing is ever returned
}`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Using 'any' for External Data Parsing",
      code: `// ❌ Sloppy: Blindly trusting external JSON with 'any'
function processApiResponse(rawData: any) {
  // If the server changes its payload or sends null, this crashes:
  const uppercaseName = rawData.user.name.toUpperCase();
  console.log("User:", uppercaseName);
}`,
      explanation:
        "If rawData or user is undefined, any provides zero compiler warning. The code crashes in production with 'Cannot read properties of undefined'.",
    },
    good: {
      title: "Using 'unknown' with Safe Narrowing",
      code: `// ✅ Robust: Treat unknown data with skepticism
function processApiResponse(rawData: unknown) {
  // Verify that rawData is an object before inspecting properties
  if (typeof rawData === "object" && rawData !== null && "name" in rawData) {
    const candidate = (rawData as { name: unknown }).name;
    if (typeof candidate === "string") {
      console.log("User:", candidate.toUpperCase());
      return;
    }
  }
  console.log("Invalid payload structure received.");
}`,
      explanation:
        "By typing the payload as unknown, TypeScript forces you to validate the shape before accessing properties, eliminating runtime crashes completely.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Inspecting Special Types",
    intro:
      "Run this code in the sandbox. See how TypeScript guards unknown, logs with void, and guarantees type safety:",
    starterCode: `// TS-05: Special Types in Action

// 1. void function (performs side effects, returns nothing)
function notify(text: string): void {
  console.log("[Notification]: " + text);
}
notify("System update scheduled.");

// 2. unknown variable: must be narrowed before use
function parseInput(input: unknown): string {
  if (typeof input === "string") {
    return "String input: " + input.trim();
  }
  if (typeof input === "number") {
    return "Number multiplied: " + (input * 2);
  }
  if (typeof input === "boolean") {
    return "Flag is: " + (input ? "ACTIVE" : "INACTIVE");
  }
  return "Unknown type received";
}

console.log(parseInput("   LearnCraft   "));
console.log(parseInput(21));
console.log(parseInput(true));

// 3. What happens if we try to call a method on unknown directly?
const secret: unknown = "secret code";
// Uncomment the line below to see TypeScript block it:
// console.log(secret.toUpperCase()); // Error: 'secret' is of type 'unknown'

if (typeof secret === "string") {
  console.log("Safe secret uppercase:", secret.toUpperCase());
}
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "What is the crucial difference between the any type and the unknown type?",
      options: [
        "any is for strings and numbers, while unknown is only for objects.",
        "any disables all type checking, while unknown requires type checking before you can do anything with the value.",
        "unknown is stripped at runtime, while any persists in the compiled JavaScript output.",
        "There is no difference; they are interchangeable aliases.",
      ],
      correctIndex: 1,
      explanation:
        "Both any and unknown can hold any value, but any completely disables compiler safety. In contrast, unknown forces you to perform type checks (like typeof) before allowing you to access properties or call methods on the value.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. Ban 'any' From Your Code",
        desc: "any completely disables type checking and re-introduces JavaScript runtime bugs.",
      },
      {
        title: "2. Reach for 'unknown' Instead",
        desc: "Use unknown for data from external APIs, JSON parsing, or dynamic user input where the type is truly not known in advance.",
      },
      {
        title: "3. 'void' for Void Returns",
        desc: "Functions that perform actions without returning a value should specify a return type of void.",
      },
      {
        title: "4. 'never' for Impossible States",
        desc: "The never type marks code that never returns (throws exceptions or infinite loops) or represents unhandled edge cases.",
      },
    ],
    nextLessonPreview: {
      title: "Stage 2: Functions & Type Composition",
      desc: "Advance to Stage 2 to master function signatures, parameter typing, return inference, union types, and interface contracts.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// Registry of Handcrafted Lessons
// ────────────────────────────────────────────────────────────────────────────
export const TYPESCRIPT_LESSONS_CONTENT: Record<string, StandardLessonContent> = {
  "ts01-mental-model": TS01_CONTENT,
  "ts02-primitives-inference": TS02_CONTENT,
  "ts03-arrays-tuples": TS03_CONTENT,
  "ts04-object-types": TS04_CONTENT,
  "ts05-special-types": TS05_CONTENT,
};

/**
 * Procedural generator for untransformed TypeScript curriculum lessons (TS-04 through TS-32).
 */
function generateTypeScriptLesson(slug: string): StandardLessonContent {
  const lesson = getLessonBySlug(slug) || getAllLessons()[0];

  return {
    slug: lesson.slug,
    code: lesson.code,
    title: lesson.name,
    sections: TYPESCRIPT_SECTIONS,
    part1: {
      title: `The Mental Model: Understanding ${lesson.name}`,
      bigPicture: `${lesson.desc} In TypeScript, mastering this concept creates strict architectural boundaries, catches logical flaws before build time, and ensures seamless team scalability.`,
      breakdownTitle: "Key Principles to Master",
      breakdownItems: [
        {
          title: "Core Purpose",
          desc: lesson.desc,
        },
        {
          title: "Compiler Guarantees",
          desc: "Validates contracts statically without injecting runtime execution overhead.",
        },
        {
          title: "Architectural Safety",
          desc: "Prevents regression and domain drift across large shared codebases.",
        },
        {
          title: "Developer Ergonomics",
          desc: "Provides autocomplete, documentation, and instant refactoring in your IDE.",
        },
      ],
    },
    part2: {
      title: "Core Mechanics & Compiler Rules",
      intro: `Understand the exact syntax rules and type semantics governing ${lesson.name}:`,
      cards: [
        {
          number: "01",
          tag: "Syntax",
          title: "Declaration Semantics",
          description: "Defines clean type shapes and strict property contracts.",
          color: "purple",
        },
        {
          number: "02",
          tag: "Assignability",
          title: "Type Compatibility",
          description: "Evaluates structural subtyping and variance relationships.",
          color: "cyan",
        },
        {
          number: "03",
          tag: "Safety",
          title: "Strict Mode Compliance",
          description: "Ensures full compatibility under strictNullChecks and noImplicitAny.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Type Safety Rule",
        content: `Always write explicit contracts for ${lesson.name} to avoid loose implicit typing.`,
      },
    },
    part3: {
      title: "In-Depth Architectural Deep Dive",
      intro: `Deep dive into production usage patterns for ${lesson.name}:`,
      points: [
        {
          title: "Static Verification",
          content: `When leveraging ${lesson.name}, the compiler proves data invariants across every call site.`,
          codeSnippet: `// Example: ${lesson.code} contract\ntype Result<T> = { success: true; data: T } | { success: false; error: string };`,
        },
        {
          title: "Clean Modularity",
          content: "Keep types tightly coupled to their domain modules and export only public contracts.",
        },
      ],
    },
    part4: {
      title: "Anti-Patterns vs Idiomatic Code",
      bad: {
        title: "Loose Type Casting & Implicit Assumptions",
        code: `// ❌ Loose pattern: bypasses compiler verification\nconst config = {} as any;\nconsole.log(config.nonExistentProperty);`,
        explanation:
          "Type assertions (\`as any\`) hide missing property errors until production execution.",
      },
      good: {
        title: "Strict Typed Contracts & Exhaustive Checks",
        code: `// ✅ Idiomatic pattern: strict type safety\ninterface AppConfig {\n  readonly apiUrl: string;\n  readonly retries: number;\n}\nconst config: AppConfig = { apiUrl: "https://api.example.com", retries: 3 };`,
        explanation:
          "Strict typed declarations guarantee all required properties exist at compile time.",
      },
    },
    part5: {
      title: "Interactive Code Sandbox",
      intro: "Practice this TypeScript feature in real-time:",
      starterCode: `// ${lesson.code} - ${lesson.name}
// Practice and explore this TypeScript feature:

console.log("Practicing ${lesson.code}: ${lesson.name}");

interface DemoItem {
  id: string;
  title: string;
  active: boolean;
}

const item: DemoItem = {
  id: "item-101",
  title: "TypeScript Mastery",
  active: true,
};

console.log("Verified:", item);
`,
    },
    part6: {
      title: "Concept Check: Knowledge Assessment",
      quiz: {
        question: `What is the primary architectural advantage of ${lesson.name}?`,
        options: [
          "It adds runtime reflection classes to the JavaScript engine.",
          `It enforces compile-time safety and self-documenting contracts for: ${lesson.name}.`,
          "It automatically compiles TypeScript into WebAssembly bytecode.",
          "It requires disabling all strict compiler options in tsconfig.json.",
        ],
        correctIndex: 1,
        explanation: `${lesson.desc} Strict compile-time validation prevents production bugs and enables safe refactoring across teams.`,
      },
    },
    part7: {
      title: "Key Takeaways & What's Next",
      takeaways: [
        { title: "Compile-Time Guarantee", desc: lesson.desc },
        { title: "Zero Runtime Overhead", desc: "Type erasure guarantees zero performance penalty in production." },
        { title: "Clean Refactoring", desc: "Types document code intent and make breaking changes immediately visible." },
      ],
      nextLessonPreview: {
        title: `Next: Progressive TypeScript Mastery`,
        desc: "Continue advancing through the next stage of the TypeScript curriculum.",
      },
    },
  };
}

export function getTypeScriptLessonContent(slug: string): StandardLessonContent {
  const normalized = slug.toLowerCase().trim();
  if (TYPESCRIPT_LESSONS_CONTENT[normalized]) {
    return TYPESCRIPT_LESSONS_CONTENT[normalized];
  }
  const byCode = Object.values(TYPESCRIPT_LESSONS_CONTENT).find(
    (l) => l.code?.toLowerCase() === normalized || l.slug?.toLowerCase() === normalized
  );
  if (byCode) return byCode;

  return generateTypeScriptLesson(slug);
}
