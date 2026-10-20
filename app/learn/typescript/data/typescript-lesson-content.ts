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
      title: "TS-06: Function Signatures & Parameters",
      desc: "Advance to Stage 2 to master function parameter contracts, return types, optional/default parameters, and rest arguments.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-06: Function Signatures & Parameters
// ────────────────────────────────────────────────────────────────────────────
const TS06_CONTENT: StandardLessonContent = {
  slug: "ts06-function-types",
  code: "TS-06",
  title: "Function Signatures & Parameters",
  subtitle:
    "Define strict input/output contracts, optional parameters (?), default values, rest parameter arrays, and function type signatures.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Vending Machine: Why Functions Need Strict Contracts",
    bigPicture:
      "In JavaScript, a function is like an unlabelled slot. Callers can pass strings where numbers are expected, omit required values, or pass too many arguments without warning—causing silent NaN calculations, undefined bugs, or runtime crashes. In TypeScript, a function is a strict contract: you specify the exact types of arguments it accepts and what type it guarantees to return.",
    breakdownTitle: "Four Core Function Principles:",
    breakdownItems: [
      {
        title: "1. Parameter Type Annotations",
        desc: "Every parameter must specify its expected type (e.g., (price: number, tax: number)). TypeScript prevents passing the wrong types at compile time.",
      },
      {
        title: "2. Return Type Inference & Annotations",
        desc: "TypeScript automatically infers what a function returns from its return statements, but adding explicit annotations ((): number) prevents accidental return drift.",
      },
      {
        title: "3. Optional (?) vs Default Parameters",
        desc: "Optional parameters (discount?: number) have the type number | undefined. Default parameters (tax = 0.05) provide an automatic fallback, guaranteeing a number inside the body.",
      },
      {
        title: "4. Rest Parameters as Typed Arrays",
        desc: "Rest parameters collect variable numbers of arguments into a typed array: (...scores: number[]).",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Inputs, Outputs & Signatures",
    intro: "Learn the essential syntax rules for building type-safe functions:",
    cards: [
      {
        number: "01",
        tag: "Parameters",
        title: "Explicit Parameter Typing",
        description:
          "TypeScript cannot safely guess what callers might pass in the future, so function parameters require explicit type annotations.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Optionality",
        title: "Optional After Required",
        description:
          "Optional parameters (?) and default parameters must always come after all required parameters in the parameter list.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Callables",
        title: "Function Type Signatures",
        description:
          "Define reusable function shapes using arrow notation: type Formatter = (text: string) => string.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Order Rule",
      content:
        "Optional parameters (param?: Type) and default parameters (param = value) must always appear after all required parameters in the function declaration.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Inspecting Function Contracts",
    intro: "Follow how TypeScript enforces parameter safety and return types:",
    points: [
      {
        title: "1. Annotating Parameters and Return Types",
        content:
          "Type each parameter followed by a colon, and place the return type after the closing parenthesis:",
        codeSnippet: `function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

// ✅ Valid: Exactly matches the contract:
const total = calculateTotal(19.99, 3);

// ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number':
// calculateTotal("19.99", 3);`,
      },
      {
        title: "2. Optional Parameters vs Default Fallbacks",
        content:
          "Compare an optional parameter (which might be undefined) with a default parameter (which is guaranteed to have a value):",
        codeSnippet: `// Optional parameter: discount is 'number | undefined':
function applyCoupon(price: number, discount?: number): number {
  return discount !== undefined ? price - discount : price;
}

// Default parameter: taxRate is always 'number' inside:
function applyTax(price: number, taxRate: number = 0.08): number {
  return price * (1 + taxRate);
}`,
      },
      {
        title: "3. Rest Parameters as Typed Arrays",
        content:
          "When a function accepts an arbitrary number of arguments, use the rest syntax with an array type annotation:",
        codeSnippet: `function sumAll(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sumAll(10, 20, 30, 40)); // 100`,
      },
      {
        title: "4. Function Type Expressions (Callback Types)",
        content:
          "You can define reusable callback contracts using arrow notation:",
        codeSnippet: `type StringTransformer = (input: string) => string;

function processText(text: string, transform: StringTransformer): string {
  return transform(text);
}

const shout: StringTransformer = (str) => str.toUpperCase() + "!";
console.log(processText("hello", shout)); // "HELLO!"`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Untyped Parameters & Silent String Concatenation",
      code: `// ❌ Loose JavaScript: No parameter types
function addTax(subtotal, tax) {
  // If someone passes "10" and "2", JavaScript concatenates: "102"
  return subtotal + tax;
}

console.log(addTax("10", "2")); // "102" (Silent financial bug!)`,
      explanation:
        "Without parameter annotations, JavaScript performs string concatenation instead of addition, leading to silent calculation errors.",
    },
    good: {
      title: "Strict Parameter Typing with Verified Return",
      code: `// ✅ TypeScript: Strict parameter types and return annotation
function addTax(subtotal: number, taxRate: number = 0.05): number {
  return subtotal + (subtotal * taxRate);
}

// addTax("10", "2"); // ❌ Compile error: Argument of type 'string' is not assignable to 'number'
console.log(addTax(100, 0.08)); // 108`,
      explanation:
        "TypeScript catches string arguments at compile time, guarantees numeric arithmetic, and documents default tax calculations.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Test Function Contracts",
    intro:
      "Run this code in the live sandbox. Experiment with optional arguments, default fallbacks, and rest parameters:",
    starterCode: `// TS-06: Function Signatures & Parameters

// 1. Order calculator with required, default, optional, and rest parameters
function calculateOrder(
  subtotal: number,
  taxRate: number = 0.07,       // Default parameter
  couponCode?: string,          // Optional parameter
  ...fees: number[]             // Rest parameter array
): { total: number; summary: string } {
  let discount = 0;
  if (couponCode === "SAVE10") {
    discount = 10;
  }

  const feesTotal = fees.reduce((acc, fee) => acc + fee, 0);
  const taxableAmount = Math.max(0, subtotal - discount);
  const finalTotal = taxableAmount * (1 + taxRate) + feesTotal;

  return {
    total: Math.round(finalTotal * 100) / 100,
    summary: "Subtotal: $" + subtotal + ", Fees: $" + feesTotal,
  };
}

// Test with all arguments
const order1 = calculateOrder(100, 0.08, "SAVE10", 5, 2.5);
console.log("Order 1:", order1);

// Test with default tax and no optional coupon/fees
const order2 = calculateOrder(50);
console.log("Order 2:", order2);
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "What is the key difference inside a function body between `fee?: number` and `fee: number = 10`?",
      options: [
        "`fee?: number` has type `number | undefined`, while `fee: number = 10` is always a `number`.",
        "`fee?: number` is kept at runtime, while default parameters are erased.",
        "Optional parameters must be strings; default parameters must be numbers.",
        "There is no difference; they behave identically in every scenario.",
      ],
      correctIndex: 0,
      explanation:
        "Inside the function body, an optional parameter (`fee?: number`) might not have been provided, so its type is `number | undefined`. In contrast, a default parameter provides an automatic fallback, guaranteeing that `fee` is always a `number`.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. Explicit Parameter Contracts",
        desc: "Always annotate function parameters to prevent accidental undefined bugs or string concatenation errors.",
      },
      {
        title: "2. Optional vs Default",
        desc: "Use optional (?) when absence is meaningful; use defaults (= value) when a standard fallback is desired.",
      },
      {
        title: "3. Rest Parameters as Arrays",
        desc: "Collect arbitrary arguments with ...rest: Type[] for type-safe variable arity.",
      },
      {
        title: "4. Function Type Aliases",
        desc: "Declare callable shapes with (param: Type) => ReturnType for reusable callbacks.",
      },
    ],
    nextLessonPreview: {
      title: "TS-07: Function Overloading",
      desc: "Learn how to declare multiple call signatures with a single unified implementation to support flexible, adaptive functions.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-07: Function Overloading
// ────────────────────────────────────────────────────────────────────────────
const TS07_CONTENT: StandardLessonContent = {
  slug: "ts07-function-overloads",
  code: "TS-07",
  title: "Function Overloading",
  subtitle:
    "Declare multiple public call signatures with a single implementation to support versatile functions with exact return types.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Multi-Tool: Adaptive Functions with Exact Return Types",
    bigPicture:
      "Sometimes a function needs to accept different argument combinations and return different results accordingly. For example, passing a timestamp number should return a Date object, while passing year, month, and day numbers should also return a Date. In JavaScript, callers have no idea what arguments work together. In TypeScript, Function Overloading allows you to declare multiple distinct calling signatures (the public menu), backed by a single flexible implementation (the kitchen).",
    breakdownTitle: "The Anatomy of Function Overloads:",
    breakdownItems: [
      {
        title: "1. Overload Signatures",
        desc: "One or more signature declarations without curly-brace bodies. These define the exact combinations of arguments and return types callers can use.",
      },
      {
        title: "2. The Implementation Signature",
        desc: "The final signature that includes the actual function body ({ ... }). Its parameter and return types must be broad enough to accommodate all overload signatures.",
      },
      {
        title: "3. Caller Isolation",
        desc: "Callers can ONLY invoke the declared overload signatures. The implementation signature is invisible to external callers.",
      },
      {
        title: "4. Overloads vs Unions",
        desc: "Use overloads when the return type depends directly on the argument types. If the return type is always the same, simple union parameters are cleaner.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Writing Overload Signatures",
    intro: "Understand the three-step pattern for declaring overloaded functions:",
    cards: [
      {
        number: "01",
        tag: "Public",
        title: "Overload Headers",
        description:
          "Write each valid calling pattern as a header ending with a semicolon. Do NOT include curly braces here.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Private",
        title: "Unified Body",
        description:
          "Immediately follow with the implementation header that accepts union types and provides the single { ... } body.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Precision",
        title: "Exact Return Typing",
        description:
          "Callers receive the exact return type of the matching overload without needing manual type assertions (as).",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Visibility Rule",
      content:
        "The implementation signature is completely invisible to callers. Callers can only call signatures declared in the overloads.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Building Overloads",
    intro: "Step through creating a function that accepts either a timestamp or date components:",
    points: [
      {
        title: "1. Declare Overload Signatures (Public API)",
        content:
          "Write the signatures that you want callers to see in autocomplete. Note that each ends with a semicolon:",
        codeSnippet: `// Overload 1: Create date from a timestamp number
function makeDate(timestamp: number): Date;

// Overload 2: Create date from year, month, day numbers
function makeDate(year: number, month: number, day: number): Date;`,
      },
      {
        title: "2. Write the Implementation Signature (Internal Body)",
        content:
          "The implementation signature must accept all valid arguments from both overloads using optional parameters or unions:",
        codeSnippet: `// Implementation signature: compatible with both overloads
function makeDate(yearOrTimestamp: number, month?: number, day?: number): Date {
  if (month !== undefined && day !== undefined) {
    return new Date(yearOrTimestamp, month - 1, day);
  }
  return new Date(yearOrTimestamp);
}`,
      },
      {
        title: "3. How Callers Experience the Function",
        content:
          "Callers can invoke Overload 1 (1 argument) or Overload 2 (3 arguments), but TypeScript rejects invalid arities (like 2 arguments):",
        codeSnippet: `const d1 = makeDate(1609459200000); // ✅ Matches Overload 1
const d2 = makeDate(2025, 1, 1);    // ✅ Matches Overload 2

// ❌ Error: No overload expects 2 arguments:
// const d3 = makeDate(2025, 1);`,
      },
      {
        title: "4. When to Use Overloads vs Simple Unions",
        content:
          "If the return type depends on the argument type, overloads are ideal:",
        codeSnippet: `// Good use of overloads: Return type matches input type
function parse(input: string): string;
function parse(input: number): number;
function parse(input: string | number): string | number {
  return typeof input === "string" ? input.trim() : input * 2;
}

const s = parse(" hello "); // s is inferred as string (no cast needed!)
const n = parse(42);        // n is inferred as number!`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Union Return Type Forcing Callers to Cast",
      code: `// ❌ Loose pattern: Callers get a messy union return
function getItem(idOrName: string | number): string | number {
  return typeof idOrName === "string" ? idOrName.toUpperCase() : idOrName * 10;
}

const result = getItem("item-1");
// ❌ Error: Property 'toUpperCase' does not exist on type 'string | number'
// result.toUpperCase(); // Caller must do annoying type narrowing or casting!`,
      explanation:
        "Using a broad union return `string | number` forces every caller to manually narrow or cast the return value, even when the input type was known.",
    },
    good: {
      title: "Clean Overloads Coupling Input and Output Types",
      code: `// ✅ Idiomatic pattern: Overloads preserve exact return types
function getItem(name: string): string;
function getItem(id: number): number;
function getItem(idOrName: string | number): string | number {
  return typeof idOrName === "string" ? idOrName.toUpperCase() : idOrName * 10;
}

const text = getItem("item-1"); // text is inferred as 'string'
console.log(text.toUpperCase()); // ✅ Works directly without casting!

const num = getItem(42);         // num is inferred as 'number'
console.log(num.toFixed(2));     // ✅ Works directly!`,
      explanation:
        "Overload signatures tie the input type to the output type, giving callers exact type inference without manual casting.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Test Function Overloading",
    intro:
      "Run this code in the live sandbox. Test calling both overloads and observe the exact return types:",
    starterCode: `// TS-07: Function Overloading in Action

// Overload 1: String input returns formatted uppercase string
function formatData(value: string): string;

// Overload 2: Number input returns currency string
function formatData(value: number): string;

// Overload 3: Array of items returns count message
function formatData(value: string[]): string;

// Implementation signature
function formatData(value: string | number | string[]): string {
  if (typeof value === "string") {
    return "[TEXT]: " + value.toUpperCase();
  }
  if (typeof value === "number") {
    return "[PRICE]: $" + value.toFixed(2);
  }
  return "[COLLECTION]: " + value.length + " item(s)";
}

// Test each overload
const res1 = formatData("mechanical keyboard");
const res2 = formatData(129.99);
const res3 = formatData(["item1", "item2", "item3"]);

console.log(res1);
console.log(res2);
console.log(res3);

// Try uncommenting an invalid argument type to see TypeScript block it:
// formatData(true); // Error: No overload matches this call
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "Which signatures are external callers permitted to invoke on an overloaded function?",
      options: [
        "Only the declared overload signatures; the implementation signature is invisible to callers.",
        "Only the implementation signature.",
        "Both overload signatures and the implementation signature interchangeably.",
        "Only the very last signature declared in the file.",
      ],
      correctIndex: 0,
      explanation:
        "The implementation signature exists only internally to write the function body. Callers can only see and invoke the public overload signatures declared above it.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. Public Contracts vs Private Body",
        desc: "Overload signatures declare public call options; the implementation signature unifies them internally.",
      },
      {
        title: "2. Exact Return Types",
        desc: "Overloads tie specific parameter types to specific return types, eliminating caller type assertions.",
      },
      {
        title: "3. No Bodies on Overloads",
        desc: "Overload signatures end with a semicolon; only the implementation signature has a curly-brace body.",
      },
      {
        title: "4. Overloads vs Unions",
        desc: "Prefer simple union parameters unless the return type depends directly on the argument types.",
      },
    ],
    nextLessonPreview: {
      title: "TS-08: Union & Intersection Types",
      desc: "Learn how to compose flexible data structures with union (|), combine contracts with intersection (&), and enforce exact literal values.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-08: Union & Intersection Types
// ────────────────────────────────────────────────────────────────────────────
const TS08_CONTENT: StandardLessonContent = {
  slug: "ts08-unions-intersections",
  code: "TS-08",
  title: "Union & Intersection Types",
  subtitle:
    "Compose flexible types with union (|), combine object models with intersection (&), and enforce exact literal values.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The 'OR' Door vs The 'AND' Blend: Composing Types",
    bigPicture:
      "In real applications, data is rarely static and one-dimensional. A payment could be made with cash OR credit card. An order status could be 'pending' OR 'shipped'. A customer record might combine basic contact info AND billing details. TypeScript gives you two mathematical composition operators: Union (|) for 'either/or' choices, and Intersection (&) for combining multiple structures into one unified contract.",
    breakdownTitle: "Two Core Composition Patterns:",
    breakdownItems: [
      {
        title: "1. Union Types (|)",
        desc: "Represents a value that can be one of several types (e.g., string | number). It acts like an 'OR' operator.",
      },
      {
        title: "2. Literal Types",
        desc: "Restricts a variable to exact values (e.g., 'success' | 'error' | 'loading'), eliminating typos and invalid state values.",
      },
      {
        title: "3. Common Property Access",
        desc: "Before narrowing a union, TypeScript only permits accessing properties that exist on ALL members of the union.",
      },
      {
        title: "4. Intersection Types (&)",
        desc: "Combines multiple object types into one. An object of type A & B must satisfy all properties from both A and B.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Unions, Intersections & Literals",
    intro: "Learn the syntax and behavior of type composition operators:",
    cards: [
      {
        number: "01",
        tag: "Choice",
        title: "Union (|): One of Many",
        description:
          "Allows a variable to hold any of the listed types. Useful for polymorphic inputs and state machines.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Exactness",
        title: "Literal Types: Exact Values",
        description:
          "Combines exact primitive values ('small' | 'medium' | 'large') to build domain-specific state enums without runtime overhead.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Combination",
        title: "Intersection (&): All in One",
        description:
          "Merges multiple object types so that an entity must contain every field declared across all intersected types.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Common Property Rule",
      content:
        "When inspecting a union of object types, TypeScript only allows direct access to properties that exist on every member of that union until you narrow the type.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Composing and Combining",
    intro: "Follow how unions and intersections behave in real code:",
    points: [
      {
        title: "1. Union Types (|) in Action",
        content:
          "A union variable can be assigned any of the allowed types:",
        codeSnippet: `let id: string | number;

id = "usr_4821"; // ✅ Allowed
id = 10042;      // ✅ Allowed
// id = true;    // ❌ Error: Type 'boolean' is not assignable to type 'string | number'`,
      },
      {
        title: "2. String Literal Types for Domain Safety",
        content:
          "Replace generic string types with exact literal unions to catch typos at compile time:",
        codeSnippet: `type OrderStatus = "pending" | "processing" | "shipped" | "delivered";

let currentStatus: OrderStatus = "pending";
// currentStatus = "pnding"; // ❌ Compile error: Type '"pnding"' is not assignable!`,
      },
      {
        title: "3. Intersection Types (&) for Object Composition",
        content:
          "Combine reusable entity pieces into a single comprehensive model:",
        codeSnippet: `type Identifiable = { id: string };
type Timestamped = { createdAt: Date; updatedAt: Date };

// Intersection: requires id, createdAt, AND updatedAt
type DatabaseEntity = Identifiable & Timestamped;

const record: DatabaseEntity = {
  id: "ent-99",
  createdAt: new Date(),
  updatedAt: new Date(),
};`,
      },
      {
        title: "4. The Impossible Primitive Intersection (never)",
        content:
          "Intersecting incompatible primitives yields never, because no value can be both a string and a number simultaneously:",
        codeSnippet: `// ❌ Impossible type:
type Impossible = string & number; // Evaluates to 'never'`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Loose Strings and Duplicated Object Fields",
      code: `// ❌ Loose strings: Typos slip past compiler
function updateStatus(orderId: string, status: string) {
  console.log("Updating to:", status);
}
updateStatus("101", "shippped"); // Typo compiles without warning!

// Duplicating common audit fields across every model:
type User = { id: string; name: string; createdAt: Date; updatedAt: Date; };
type Product = { id: string; title: string; createdAt: Date; updatedAt: Date; };`,
      explanation:
        "Using loose `string` allows invalid state strings, while duplicating audit fields across every model creates maintenance headaches.",
    },
    good: {
      title: "Strict Literal Unions and Composable Intersections",
      code: `// ✅ String literal union: Catches typos instantly
type OrderStatus = "pending" | "shipped" | "delivered";
function updateStatus(orderId: string, status: OrderStatus) {
  console.log("Updating to:", status);
}
// updateStatus("101", "shippped"); // ❌ Compile error caught immediately!

// Reusable composition with intersection (&):
type Timestamps = { readonly createdAt: Date; updatedAt: Date; };
type User = { id: string; name: string; } & Timestamps;
type Product = { id: string; title: string; } & Timestamps;`,
      explanation:
        "Literal unions eliminate typos and provide autocomplete, while intersections allow modular, DRY data model compositions.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Test Unions & Intersections",
    intro:
      "Run this code in the live sandbox. Experiment with literal unions, combined intersections, and safe property access:",
    starterCode: `// TS-08: Union & Intersection Types

// 1. Literal Union for UI State
type NetworkState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; error: string };

function renderState(state: NetworkState): string {
  // Notice that 'status' is common to all members of the union!
  if (state.status === "loading") {
    return "Spinner: Loading data...";
  }
  if (state.status === "success") {
    return "Data loaded: " + state.data;
  }
  if (state.status === "error") {
    return "Alert: " + state.error;
  }
  return "Ready to load";
}

console.log(renderState({ status: "loading" }));
console.log(renderState({ status: "success", data: "User Profile Loaded" }));

// 2. Intersection (&) for Data Models
type BaseEntity = { id: string };
type AuditInfo = { createdAt: string; createdBy: string };
type UserAccount = BaseEntity & AuditInfo & { username: string };

const user: UserAccount = {
  id: "u-101",
  username: "mehedi_dev",
  createdAt: "2026-10-20",
  createdBy: "system",
};

console.log("User:", user.username, "Created by:", user.createdBy);
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "If a variable has the union type `string | number[]`, what properties can you access before narrowing the type?",
      options: [
        "Only properties common to both types (such as `.length` and `.slice()`).",
        "Any property belonging to string (such as `.toUpperCase()`).",
        "Any property belonging to array (such as `.push()`).",
        "No properties can be accessed until a typeof check is performed.",
      ],
      correctIndex: 0,
      explanation:
        "TypeScript only permits accessing properties that exist on every member of a union. Since both `string` and `number[]` share `.length` and `.slice()`, those properties can be accessed without narrowing.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. Union (|) is 'OR'",
        desc: "A union represents a value that can match one of several alternative types.",
      },
      {
        title: "2. Literal Types for Safety",
        desc: "Use string or number literal unions ('open' | 'closed') to eliminate typos and invalid states.",
      },
      {
        title: "3. Intersection (&) is 'AND'",
        desc: "An intersection combines multiple object shapes into one unified required structure.",
      },
      {
        title: "4. Common Member Access",
        desc: "Without narrowing, only properties shared by all union branches can be accessed.",
      },
    ],
    nextLessonPreview: {
      title: "TS-09: Type Aliases vs Interfaces",
      desc: "Master the key architectural distinctions between interfaces and type aliases, including declaration merging and extends vs &.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-09: Type Aliases vs Interfaces
// ────────────────────────────────────────────────────────────────────────────
const TS09_CONTENT: StandardLessonContent = {
  slug: "ts09-type-vs-interface",
  code: "TS-09",
  title: "Type Aliases vs Interfaces",
  subtitle:
    "Master the key architectural distinctions between interfaces and type aliases: declaration merging, extends vs &, and practical decision rules.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Passport vs The Open Plug-In: Choosing the Right Tool",
    bigPicture:
      "One of the most frequent questions in TypeScript is: 'Should I use an interface or a type alias?' Both can define the shape of an object and look very similar. But they serve distinct architectural purposes. An interface defines an open, extensible contract that can be inherited with extends and augmented via Declaration Merging. A type alias is a universal nickname for ANY type—not just objects, but also unions, primitives, tuples, and function signatures.",
    breakdownTitle: "Four Foundational Distinctions:",
    breakdownItems: [
      {
        title: "1. Declaration Merging",
        desc: "Multiple interface declarations with the same name in the same scope merge together automatically. Duplicate type aliases cause a compiler error.",
      },
      {
        title: "2. Scope of Definition",
        desc: "Interfaces can only describe object shapes. Type aliases can represent unions, primitives, tuples, functions, and mapped types.",
      },
      {
        title: "3. Inheritance vs Composition",
        desc: "Interfaces use the object-oriented 'extends' keyword. Type aliases combine shapes using the intersection operator (&).",
      },
      {
        title: "4. Architectural Best Practice",
        desc: "Use interface for public API contracts, domain entities, and class contracts. Use type for unions, primitives, and complex computed types.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Interfaces vs Type Aliases",
    intro: "Understand the syntax and capabilities of both constructs:",
    cards: [
      {
        number: "01",
        tag: "Contract",
        title: "interface: Open Contracts",
        description:
          "Best for domain models, OOP class contracts (implements), and library APIs that benefit from declaration merging.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Alias",
        title: "type: Universal Aliases",
        description:
          "Best for union types ('a' | 'b'), tuples ([string, number]), primitive aliases, and function expressions.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Heritage",
        title: "extends vs &",
        description:
          "Interfaces inherit with 'extends', which provides cleaner compiler error messages. Type aliases combine with '&'.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Practical Rule of Thumb",
      content:
        "Use `interface` for object shapes and data contracts. Use `type` when you need unions, primitives, or complex type composition.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Comparing Syntax and Features",
    intro: "Examine side-by-side examples of interfaces and type aliases:",
    points: [
      {
        title: "1. Defining an Object Shape",
        content:
          "Both constructs look nearly identical for basic object shapes:",
        codeSnippet: `// Interface syntax (no equals sign):
interface UserInterface {
  id: string;
  name: string;
}

// Type alias syntax (requires equals sign):
type UserType = {
  id: string;
  name: string;
};`,
      },
      {
        title: "2. Extending vs Intersecting",
        content:
          "Interfaces extend with the 'extends' keyword; types combine with '&':",
        codeSnippet: `// Interface extension:
interface AdminInterface extends UserInterface {
  permissions: string[];
}

// Type alias intersection:
type AdminType = UserType & {
  permissions: string[];
};`,
      },
      {
        title: "3. Declaration Merging (Interfaces Only!)",
        content:
          "If an interface is declared multiple times, TypeScript merges all properties into one unified interface:",
        codeSnippet: `interface WindowSettings {
  title: string;
}

interface WindowSettings {
  width: number; // Merged into WindowSettings!
}

const win: WindowSettings = {
  title: "Main Window",
  width: 1024, // Both properties are required!
};`,
      },
      {
        title: "4. Things Only 'type' Can Do",
        content:
          "Interfaces cannot declare unions, tuples, or primitive aliases:",
        codeSnippet: `// ✅ Valid type aliases:
type Status = "draft" | "published"; // Union (Interface CANNOT do this!)
type Point = [number, number];       // Tuple (Interface CANNOT do this!)
type UserID = string;                // Primitive alias`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Using the Wrong Tool for the Job",
      code: `// ❌ Attempting to create a union with an interface (Syntax Error!):
// interface Status = "open" | "closed"; // Invalid TypeScript!

// ❌ Redeclaring a type alias expecting it to merge:
type AppConfig = { host: string; };
// type AppConfig = { port: number; }; // Error: Duplicate identifier 'AppConfig'`,
      explanation:
        "Interfaces cannot represent union types. Conversely, type aliases cannot be reopened for declaration merging.",
    },
    good: {
      title: "Idiomatic Harmony: Interfaces for Models, Types for Unions",
      code: `// ✅ Idiomatic: Interface for domain entity
interface User {
  id: string;
  name: string;
  role: UserRole; // Uses union type
}

// ✅ Idiomatic: Type alias for state union
type UserRole = "admin" | "editor" | "viewer";

// ✅ Idiomatic: Extending the entity interface
interface SuperAdmin extends User {
  superKey: string;
}`,
      explanation:
        "Use `interface` for extensible data models and `type` for finite unions and primitives. They work together harmoniously.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Test Interface vs Type",
    intro:
      "Run this code in the live sandbox. Experiment with interface extension, declaration merging, and union type aliases:",
    starterCode: `// TS-09: Type Aliases vs Interfaces in Practice

// 1. Interface with Declaration Merging
interface Config {
  apiUrl: string;
}

interface Config {
  timeout: number; // Merges into Config!
}

const appConfig: Config = {
  apiUrl: "https://api.learncraft.dev",
  timeout: 5000,
};

console.log("Config:", appConfig.apiUrl, "Timeout:", appConfig.timeout + "ms");

// 2. Type Alias for Union & Result Pattern
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function fetchUser(id: string): ApiResponse<{ id: string; name: string }> {
  return {
    success: true,
    data: { id: id, name: "Mehedi Hasan" },
  };
}

const response = fetchUser("usr_101");
if (response.success) {
  console.log("Fetched User:", response.data.name);
} else {
  console.log("Error:", response.error);
}
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "What happens if you declare two `interface User { ... }` blocks with different properties in the same scope, versus two `type User = { ... }` definitions?",
      options: [
        "The two interfaces merge their properties into a single combined interface, while duplicate type aliases throw a compiler error.",
        "Both interfaces and type aliases automatically merge.",
        "The second interface completely overwrites the first one.",
        "Interfaces cannot have duplicate names, while type aliases can.",
      ],
      correctIndex: 0,
      explanation:
        "Declaration merging is unique to interfaces: duplicate interface definitions in the same scope merge into one. In contrast, type aliases cannot be reopened and produce a 'Duplicate identifier' compiler error.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. Interface for Object Contracts",
        desc: "Use interface for domain models, OOP contracts, and public library APIs.",
      },
      {
        title: "2. Type for Unions & Primitives",
        desc: "Use type for unions, intersections, primitives, and callable function expressions.",
      },
      {
        title: "3. Declaration Merging",
        desc: "Interfaces in the same scope merge together; type aliases cannot be redeclared.",
      },
      {
        title: "4. extends vs &",
        desc: "Interfaces inherit with extends; type aliases combine with the intersection operator (&).",
      },
    ],
    nextLessonPreview: {
      title: "TS-10: Control Flow Analysis & Basic Guards",
      desc: "Advance to Stage 3 to learn how TypeScript tracks types across if-branches with typeof, instanceof, custom type predicates, and discriminated unions.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-10: Control Flow Analysis & Basic Guards
// ────────────────────────────────────────────────────────────────────────────
const TS10_CONTENT: StandardLessonContent = {
  slug: "ts10-control-flow-guards",
  code: "TS-10",
  title: "Control Flow Analysis & Basic Guards",
  subtitle:
    "Master how TypeScript narrows broad types across branches using typeof, instanceof, equality, and the in operator.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Funnel & Security Checkpoints: How Narrowing Works",
    bigPicture:
      "When a variable has a broad union type like string | number | Date, you cannot immediately call .toUpperCase() because the value might be a number or a Date. In JavaScript, developers write if (typeof x === 'string') to protect their code at runtime. TypeScript is smart: its Control Flow Analysis engine actively inspects your if-statements, switches, and returns. As code flows past a check, TypeScript automatically narrows the variable to the specific type proven by that branch.",
    breakdownTitle: "Four Foundational Narrowing Techniques:",
    breakdownItems: [
      {
        title: "1. typeof Guards",
        desc: "Narrows JavaScript primitives (string, number, boolean, symbol, undefined, function).",
      },
      {
        title: "2. instanceof Guards",
        desc: "Inspects prototype chains to narrow instances of classes and constructor functions like Date, Error, or Map.",
      },
      {
        title: "3. Truthiness & Equality Checks",
        desc: "Using if (value) or if (value !== null) filters out null and undefined, leaving behind only the defined data.",
      },
      {
        title: "4. The 'in' Operator",
        desc: "Checks for the existence of an object property (e.g., if ('swim' in animal)) to distinguish between object shapes.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Types of Guards",
    intro: "Learn the syntax rules and behaviors for TypeScript's built-in type guards:",
    cards: [
      {
        number: "01",
        tag: "Primitives",
        title: "typeof: Primitive Check",
        description:
          "Checks JavaScript primitives. Inside `if (typeof val === 'string')`, `val` is safely typed as `string`.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Prototypes",
        title: "instanceof: Class Check",
        description:
          "Checks object instances. Inside `if (err instanceof Error)`, `err.message` and `err.stack` are guaranteed.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Properties",
        title: "in: Property Check",
        description:
          "Checks object keys. Inside `if ('drive' in vehicle)`, vehicle is narrowed to the vehicle type that has a drive method.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Automatic Narrowing Rule",
      content:
        "You do not need to cast variables (as Type) after an if-check. TypeScript's Control Flow Analysis automatically refines the type inside the checked branch.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Narrowing in Practice",
    intro: "Observe how TypeScript progressively narrows types across control branches:",
    points: [
      {
        title: "1. Narrowing Primitives with typeof",
        content:
          "Inside the if block, string methods are enabled; in the else block, TypeScript knows it must be a number:",
        codeSnippet: `function doubleOrUpper(value: string | number): string {
  if (typeof value === "string") {
    // TypeScript knows 'value' is a string here:
    return value.toUpperCase();
  } else {
    // TypeScript knows 'value' must be a number here:
    return (value * 2).toString();
  }
}`,
      },
      {
        title: "2. Narrowing Class Instances with instanceof",
        content:
          "Use instanceof to distinguish between custom error classes or built-in constructors like Date:",
        codeSnippet: `function formatTimestamp(input: number | Date): string {
  if (input instanceof Date) {
    // 'input' is guaranteed to be a Date object:
    return input.toISOString();
  }
  // 'input' is narrowed to number:
  return new Date(input).toISOString();
}`,
      },
      {
        title: "3. Removing null and undefined with Truthiness",
        content:
          "Checking if a variable exists filters out falsy null and undefined values:",
        codeSnippet: `function printBio(bio?: string | null): void {
  if (!bio) {
    console.log("No bio available.");
    return;
  }
  // Beyond this guard, 'bio' is strictly string:
  console.log("Bio: " + bio.trim());
}`,
      },
      {
        title: "4. Differentiating Object Shapes with 'in'",
        content:
          "The 'in' operator checks for property presence to distinguish between distinct interfaces:",
        codeSnippet: `type Car = { drive: () => void };
type Boat = { sail: () => void };

function operate(vehicle: Car | Boat) {
  if ("drive" in vehicle) {
    vehicle.drive(); // Narrowed to Car!
  } else {
    vehicle.sail();  // Narrowed to Boat!
  }
}`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Forced Type Assertions (as) Without Verification",
      code: `// ❌ Dangerous: Forcing a type cast without checking
function processInput(input: string | number) {
  // If the caller passes a number, this compiles without warning but crashes at runtime!
  const upper = (input as string).toUpperCase();
  console.log(upper);
}`,
      explanation:
        "Using `as string` silences TypeScript without verifying the actual runtime type, leading to 'TypeError: input.toUpperCase is not a function' crashes.",
    },
    good: {
      title: "Control Flow Analysis with Native typeof",
      code: `// ✅ Safe: Let TypeScript narrow automatically
function processInput(input: string | number) {
  if (typeof input === "string") {
    console.log(input.toUpperCase()); // Safe and autocompleted!
  } else {
    console.log(input.toFixed(2));     // Safe numeric operation!
  }
}`,
      explanation:
        "Control Flow Analysis eliminates the need for type assertions, ensuring code compiles only when operations are provably safe.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Test Type Guards",
    intro:
      "Run this code in the live sandbox. Experiment with typeof, instanceof, and property checks:",
    starterCode: `// TS-10: Control Flow Analysis & Type Guards

type Formattable = string | number | Date | { message: string };

function formatValue(item: Formattable): string {
  // 1. Check for Date instance
  if (item instanceof Date) {
    return "[DATE]: " + item.toDateString();
  }

  // 2. Check for primitive string
  if (typeof item === "string") {
    return "[STRING]: " + item.trim().toUpperCase();
  }

  // 3. Check for primitive number
  if (typeof item === "number") {
    return "[NUMBER]: " + item.toFixed(2);
  }

  // 4. Object property check using 'in'
  if ("message" in item) {
    return "[OBJECT]: " + item.message;
  }

  return "[UNKNOWN]";
}

console.log(formatValue("   hello world   "));
console.log(formatValue(42.857));
console.log(formatValue(new Date("2026-10-20")));
console.log(formatValue({ message: "System operational" }));
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "Which operator is best suited for narrowing between a class instance like `Date` and a primitive `number`?",
      options: [
        "`instanceof` (e.g. `if (val instanceof Date)`)",
        "`typeof` (e.g. `if (typeof val === 'Date')`)",
        "The `as` assertion operator",
        "The `in` operator (e.g. `if ('Date' in val)`)",
      ],
      correctIndex: 0,
      explanation:
        "`instanceof` checks the prototype chain of an object instance, making it the correct tool for narrowing classes like `Date`, `Error`, or custom class instances. `typeof` only returns primitive strings like 'object'.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. Automatic Narrowing",
        desc: "TypeScript refines types inside conditional branches without requiring manual type assertions.",
      },
      {
        title: "2. typeof for Primitives",
        desc: "Use typeof for string, number, boolean, symbol, and undefined.",
      },
      {
        title: "3. instanceof for Classes",
        desc: "Use instanceof to inspect prototype chains for Date, Error, and class instances.",
      },
      {
        title: "4. 'in' for Object Shapes",
        desc: "Check for property presence to distinguish between distinct interface shapes.",
      },
    ],
    nextLessonPreview: {
      title: "TS-11: Custom Type Predicates",
      desc: "Learn how to build reusable type guard functions with 'value is Type' signatures and assertion functions.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-11: Custom Type Predicates
// ────────────────────────────────────────────────────────────────────────────
const TS11_CONTENT: StandardLessonContent = {
  slug: "ts11-custom-type-predicates",
  code: "TS-11",
  title: "Custom Type Predicates & Assertion Functions",
  subtitle:
    "Teach TypeScript about your domain models with 'value is Type' return signatures and fail-fast assertion functions.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Certified Inspector Stamp: Teaching TypeScript Custom Rules",
    bigPicture:
      "Built-in guards like typeof only recognize basic JavaScript primitives. What if you need to verify that an unknown API response has an id, an email, and an array of roles? If you write a helper function that returns a regular boolean, TypeScript forgets what you verified as soon as the function returns. A Custom Type Predicate is a function that returns a special type signature: 'parameterName is TargetType'. When this function returns true, TypeScript stamps the variable as officially certified and narrows it across the calling scope.",
    breakdownTitle: "Core Concepts of Type Predicates:",
    breakdownItems: [
      {
        title: "1. The 'is' Syntax",
        desc: "Instead of returning boolean, the function declares: (val: unknown): val is User. Returning true proves the type to the compiler.",
      },
      {
        title: "2. Runtime Verification",
        desc: "Inside the function, you write honest runtime checks (e.g. checking property types and existence) to validate the data.",
      },
      {
        title: "3. Safe Array Filtering",
        desc: "Passing a type predicate to .filter() narrows an array from (string | null)[] to a clean string[].",
      },
      {
        title: "4. Assertion Functions",
        desc: "Functions declared with asserts value is Type throw an error on failure and narrow the variable for all subsequent lines.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Predicates vs Assertions",
    intro: "Learn the syntax and usage patterns for custom type guards:",
    cards: [
      {
        number: "01",
        tag: "Predicate",
        title: "val is Type",
        description:
          "Returns boolean. If true, TypeScript narrows the argument to Type inside the calling if-branch.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Collection",
        title: "Array Narrowing",
        description:
          "Enables array.filter() to narrow union arrays without leaving behind null or undefined types.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Assertion",
        title: "asserts val is Type",
        description:
          "Throws an error if the check fails. Eliminates the need for if-statements in linear workflows.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Honesty Contract",
      content:
        "TypeScript trusts your type predicate completely. You must perform thorough runtime validation inside the predicate body to avoid false guarantees.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Building Type Predicates",
    intro: "Follow how to author and use custom type predicates:",
    points: [
      {
        title: "1. The Limitation of Plain Booleans",
        content:
          "A function returning a regular boolean does NOT narrow the type in the caller's scope:",
        codeSnippet: `// ❌ Regular boolean does not narrow:
function isUserRegular(obj: unknown): boolean {
  return typeof obj === "object" && obj !== null && "id" in obj;
}

const item: unknown = { id: "101", name: "Mehedi" };
if (isUserRegular(item)) {
  // ❌ Error: 'item' is still 'unknown'!
  // console.log(item.id);
}`,
      },
      {
        title: "2. Authoring a Type Predicate (obj is User)",
        content:
          "Replacing boolean with 'obj is User' instructs TypeScript to narrow the variable upon a true return:",
        codeSnippet: `interface User {
  id: string;
  name: string;
}

// ✅ Type predicate:
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    typeof (obj as { id: unknown }).id === "string" &&
    "name" in obj &&
    typeof (obj as { name: unknown }).name === "string"
  );
}

if (isUser(item)) {
  // ✅ TypeScript knows 'item' is strictly 'User' here:
  console.log("Verified User:", item.name);
}`,
      },
      {
        title: "3. Filtering Arrays with Type Predicates",
        content:
          "A type predicate allows array filter operations to drop null and undefined from the element type:",
        codeSnippet: `const mixedList: (string | null | undefined)[] = ["alpha", null, "beta", undefined, "gamma"];

// Helper type predicate for non-null items:
function isDefined<T>(val: T | null | undefined): val is T {
  return val !== null && val !== undefined;
}

// cleanList is inferred as string[]:
const cleanList: string[] = mixedList.filter(isDefined);
console.log(cleanList); // ["alpha", "beta", "gamma"]`,
      },
      {
        title: "4. Assertion Functions for Fail-Fast Validation",
        content:
          "Assertion functions throw an error if validation fails, narrowing all subsequent code:",
        codeSnippet: `function assertIsString(val: unknown): asserts val is string {
  if (typeof val !== "string") {
    throw new Error("Expected string, but received: " + typeof val);
  }
}

const input: unknown = "secure_token";
assertIsString(input);
// Beyond this line, 'input' is guaranteed to be 'string':
console.log(input.toUpperCase());`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Manual Type Casts After Boolean Validation",
      code: `// ❌ Loose pattern: Boolean validator forces caller to cast
function isValidEmail(data: any): boolean {
  return typeof data === "string" && data.includes("@");
}

function sendEmail(recipient: unknown) {
  if (isValidEmail(recipient)) {
    // ❌ Annoying manual type cast required:
    const email = recipient as string;
    console.log("Sending to:", email.toLowerCase());
  }
}`,
      explanation:
        "Because the helper returns a generic boolean, callers are forced to perform repeated manual type assertions (`as string`).",
    },
    good: {
      title: "Custom Type Predicate Enabling Automatic Narrowing",
      code: `// ✅ Clean pattern: Type predicate narrows caller automatically
function isValidEmail(data: unknown): data is string {
  return typeof data === "string" && data.includes("@");
}

function sendEmail(recipient: unknown) {
  if (isValidEmail(recipient)) {
    // ✅ 'recipient' is automatically narrowed to 'string':
    console.log("Sending to:", recipient.toLowerCase());
  }
}`,
      explanation:
        "The type predicate (`data is string`) communicates with the TypeScript compiler, eliminating manual casts and guaranteeing safety.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Test Type Predicates",
    intro:
      "Run this code in the live sandbox. Test validating unknown objects and filtering nullable arrays:",
    starterCode: `// TS-11: Custom Type Predicates in Action

interface Product {
  id: string;
  price: number;
}

// 1. Custom type predicate function
function isProduct(item: unknown): item is Product {
  if (typeof item !== "object" || item === null) return false;
  const p = item as Record<string, unknown>;
  return typeof p.id === "string" && typeof p.price === "number";
}

const apiPayload: unknown = { id: "p-404", price: 89.99 };

if (isProduct(apiPayload)) {
  console.log("Verified Product:", apiPayload.id, "Price: $" + apiPayload.price);
} else {
  console.log("Payload did not match Product structure.");
}

// 2. Safe array filtering with type predicate
const rawScores: (number | null | undefined)[] = [85, null, 92, undefined, 78];

function isNumber(val: unknown): val is number {
  return typeof val === "number";
}

const validScores: number[] = rawScores.filter(isNumber);
const total = validScores.reduce((acc, score) => acc + score, 0);
console.log("Valid scores:", validScores, "Average:", total / validScores.length);
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "What is the return type annotation that turns a boolean validation function into a TypeScript custom type predicate?",
      options: [
        "`parameterName is TargetType` (e.g. `pet is Dog`)",
        "`boolean as TargetType`",
        "`TargetType | boolean`",
        "`=> TargetType`",
      ],
      correctIndex: 0,
      explanation:
        "A custom type predicate replaces `boolean` with `parameterName is TargetType`. When the function evaluates to `true`, TypeScript refines the argument to `TargetType` in the calling scope.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. The 'is' Keyword",
        desc: "Use (param: unknown): param is Type to teach TypeScript how to identify custom domain models.",
      },
      {
        title: "2. Clean Array Filtering",
        desc: "Pass type predicates to .filter() to narrow union arrays without leaving null or undefined behind.",
      },
      {
        title: "3. Assertion Functions",
        desc: "Use asserts val is Type for fail-fast validation that narrows all subsequent linear code.",
      },
      {
        title: "4. Honest Validation",
        desc: "Always write rigorous runtime checks inside your predicate body to honor the compiler contract.",
      },
    ],
    nextLessonPreview: {
      title: "TS-12: Discriminated Unions",
      desc: "Master the premier TypeScript architectural pattern: tagged unions with shared literal properties and switch statements.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-12: Discriminated Unions
// ────────────────────────────────────────────────────────────────────────────
const TS12_CONTENT: StandardLessonContent = {
  slug: "ts12-discriminated-unions",
  code: "TS-12",
  title: "Discriminated Unions",
  subtitle:
    "Master the premier TypeScript architectural pattern: tagged unions that make impossible states impossible to represent.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Labeled Shipping Crates: Making Impossible States Impossible",
    bigPicture:
      "When building complex state (like a network request or payment flow), inexperienced developers often create a single object with optional flags: { isLoading: boolean, isError: boolean, error?: string, data?: User }. But this allows contradictory states: what if isLoading is true, but error is also set? A Discriminated Union (also called a Tagged Union) solves this elegantly: you model each state as a separate object type that shares a common literal property (the 'tag' or 'discriminant', like status: 'loading' | 'success' | 'error'). By inspecting this single tag, TypeScript instantly knows which data properties exist.",
    breakdownTitle: "Three Essential Ingredients of a Discriminated Union:",
    breakdownItems: [
      {
        title: "1. Multiple Distinct Object Types",
        desc: "Each state or variant is modeled as its own clean interface or type alias.",
      },
      {
        title: "2. A Shared Discriminant Property",
        desc: "Every variant possesses a property with the exact same name (commonly 'kind', 'type', or 'status').",
      },
      {
        title: "3. Unique Literal Types for the Tag",
        desc: "Each variant assigns a unique string or number literal (e.g. 'circle' vs 'square') to the discriminant property.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Modeling & Narrowing Tagged Unions",
    intro: "Learn how discriminated unions eliminate state bugs and supercharge autocomplete:",
    cards: [
      {
        number: "01",
        tag: "Structure",
        title: "The Common Tag",
        description:
          "Every variant in the union shares a single common property with a unique literal value (e.g., status: 'success').",
        color: "purple",
      },
      {
        number: "02",
        tag: "Branching",
        title: "Switch Narrowing",
        description:
          "Switching or branching on the tag property automatically narrows the entire object to that specific variant.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Integrity",
        title: "No Impossible States",
        description:
          "Data properties only exist on the states where they make sense. You cannot access error on a success state.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Discriminated Union Rule",
      content:
        "Every variant in the union must share the exact same tag property name with a unique literal value to enable automatic control flow narrowing.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Designing Tagged Unions",
    intro: "Step through building a production network request state model:",
    points: [
      {
        title: "1. Define the Individual State Variants",
        content:
          "Each variant has a unique 'status' literal and only the fields appropriate for that state:",
        codeSnippet: `type LoadingState = {
  status: "loading";
};

type SuccessState = {
  status: "success";
  data: { id: string; name: string };
};

type ErrorState = {
  status: "error";
  errorMessage: string;
};

// Combine into a Discriminated Union:
type FetchState = LoadingState | SuccessState | ErrorState;`,
      },
      {
        title: "2. Pattern Matching with a switch Statement",
        content:
          "Switching on state.status automatically narrows the object inside each case block:",
        codeSnippet: `function render(state: FetchState): string {
  switch (state.status) {
    case "loading":
      return "Loading spinner...";
    case "success":
      // TypeScript knows 'data' exists here:
      return "User: " + state.data.name;
    case "error":
      // TypeScript knows 'errorMessage' exists here:
      return "Error: " + state.errorMessage;
  }
}`,
      },
      {
        title: "3. Impossible States Are Blocked at Compile Time",
        content:
          "Attempting to access data while loading or errorMessage on success is immediately rejected by the compiler:",
        codeSnippet: `function check(state: FetchState) {
  if (state.status === "loading") {
    // ❌ Error: Property 'data' does not exist on type 'LoadingState':
    // console.log(state.data);
  }
}`,
      },
      {
        title: "4. Geometry & Domain Models Example",
        content:
          "Discriminated unions work brilliantly for shapes, actions, events, and AST nodes:",
        codeSnippet: `type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; size: number };
type Shape = Circle | Square;

function calculateArea(shape: Shape): number {
  return shape.kind === "circle"
    ? Math.PI * shape.radius ** 2
    : shape.size * shape.size;
}`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "The 'God Object' with Conflicting Boolean Flags",
      code: `// ❌ Fragile: Single object with contradictory flags
interface AsyncData {
  isLoading: boolean;
  isError: boolean;
  data?: string;
  error?: string;
}

// Valid TypeScript, but a nonsensical contradictory runtime state!
const state: AsyncData = {
  isLoading: true,
  isError: true,
  data: "Hello",
  error: "Network timed out",
};`,
      explanation:
        "The monolithic object allows impossible states (both loading and error simultaneously), requiring tedious null-checks everywhere.",
    },
    good: {
      title: "Clean Discriminated Union State Machine",
      code: `// ✅ Robust: Discriminated union enforces clear, mutually exclusive states
type AsyncData =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; error: string };

// Now impossible states literally CANNOT compile:
// const state: AsyncData = { status: "loading", error: "Boom" }; // ❌ Error!`,
      explanation:
        "By binding data fields to specific discriminant tags, contradictory states cannot even compile.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Test Discriminated Unions",
    intro:
      "Run this code in the live sandbox. Experiment with file upload states and observe compiler narrowing:",
    starterCode: `// TS-12: Discriminated Unions in Action

// 1. Model an asynchronous file upload workflow
type UploadState =
  | { status: "idle" }
  | { status: "uploading"; progressPercentage: number }
  | { status: "success"; fileUrl: string; fileSizeMb: number }
  | { status: "failed"; errorCode: number; reason: string };

function describeUpload(state: UploadState): string {
  switch (state.status) {
    case "idle":
      return "Ready to upload. Select a file.";
    case "uploading":
      return "Uploading: " + state.progressPercentage + "% complete";
    case "success":
      return "Uploaded successfully! URL: " + state.fileUrl + " (" + state.fileSizeMb + " MB)";
    case "failed":
      return "Upload failed (Code " + state.errorCode + "): " + state.reason;
  }
}

// Test each state
console.log(describeUpload({ status: "idle" }));
console.log(describeUpload({ status: "uploading", progressPercentage: 65 }));
console.log(describeUpload({ status: "success", fileUrl: "https://cdn.learncraft.dev/file.pdf", fileSizeMb: 4.2 }));
console.log(describeUpload({ status: "failed", errorCode: 504, reason: "Gateway Timeout" }));
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "Why is a Discriminated Union superior to a single object with optional flags (`isLoading: boolean`, `data?`, `error?`)?",
      options: [
        "It prevents impossible contradictory states, such as having both `data` and `error` active at the same time.",
        "It compiles into smaller JavaScript bundle files.",
        "It converts TypeScript into WebAssembly for faster execution.",
        "It automatically caches responses in localStorage.",
      ],
      correctIndex: 0,
      explanation:
        "Discriminated unions ensure mutually exclusive states. Data associated with a state (like `data` on `success`) can only exist when that exact state tag is active, preventing contradictory states at compile time.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. The Discriminant Tag",
        desc: "All variants share a common literal property (status: 'loading' | 'success') that acts as a unique identifier.",
      },
      {
        title: "2. Impossible States Eliminated",
        desc: "Fields like data or error only exist on the specific states where they belong.",
      },
      {
        title: "3. Effortless Switch Narrowing",
        desc: "Switching on the tag property automatically narrows the object inside each case branch.",
      },
      {
        title: "4. The Foundation for Exhaustiveness",
        desc: "Discriminated unions pair seamlessly with the never type to ensure all cases are handled.",
      },
    ],
    nextLessonPreview: {
      title: "TS-13: Exhaustive Checking with never",
      desc: "Learn how to guarantee at compile time that every single branch of a discriminated union is handled using the never type.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-13: Exhaustive Checking with never
// ────────────────────────────────────────────────────────────────────────────
const TS13_CONTENT: StandardLessonContent = {
  slug: "ts13-exhaustive-checking",
  code: "TS-13",
  title: "Exhaustive Checking with never",
  subtitle:
    "Guarantee compile-time safety across state variants using the never type and the assertNever helper pattern.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Unhandled Alarm: Why Exhaustiveness Matters",
    bigPicture:
      "Imagine your app handles 3 payment methods: 'card', 'paypal', and 'apple_pay'. Six months later, another developer adds 'crypto' to the PaymentMethod union. How do you ensure every single switch statement, invoice generator, and receipt builder across 50 files is updated to handle 'crypto'? Without TypeScript, unhandled cases silently fall through to runtime bugs. With Exhaustive Checking, TypeScript turns the bottom type `never` into a compile-time alarm: if any union branch is forgotten, the code literally refuses to build.",
    breakdownTitle: "The Mechanics of Exhaustiveness Checking:",
    breakdownItems: [
      {
        title: "1. The Exhaustion Principle",
        desc: "When all possibilities of a union have been checked in preceding switch cases, the remaining type is the empty set: never.",
      },
      {
        title: "2. The assertNever Helper",
        desc: "A small utility function: function assertNever(x: never): never { throw new Error('Unhandled: ' + x); }.",
      },
      {
        title: "3. The Compile-Time Alarm",
        desc: "In the default: branch, passing the variable to assertNever(state) guarantees a compile error if any variant was forgotten.",
      },
      {
        title: "4. Fearless Enterprise Refactoring",
        desc: "When expanding unions, the compiler flags every single file that needs updating before code is even committed.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: The assertNever Pattern",
    intro: "Learn how to wire exhaustive checking into your switch statements:",
    cards: [
      {
        number: "01",
        tag: "Bottom Type",
        title: "never: Empty Set",
        description:
          "Represents values that can never occur. When every case has been handled, the variable in default is typed as `never`.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Sentinel",
        title: "assertNever Helper",
        description:
          "Accepts only `never`. If an unhandled variant reaches it, TypeScript throws a compile-time assignability error.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Refactoring",
        title: "Guaranteed Coverage",
        description:
          "Adding a new member to a union immediately highlights all switch statements across the repository.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Exhaustive Rule",
      content:
        "Always place an `assertNever(value)` call in the `default:` branch of discriminated union switch statements to enforce compile-time exhaustiveness.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Wiring assertNever",
    intro: "Follow how the compiler catches forgotten cases:",
    points: [
      {
        title: "1. Define the assertNever Utility",
        content:
          "Write a reusable helper that only accepts values of type never:",
        codeSnippet: `function assertNever(value: never): never {
  throw new Error("Unhandled union variant: " + JSON.stringify(value));
}`,
      },
      {
        title: "2. Fully Handled Switch Statement",
        content:
          "When all cases are handled, the variable in the default branch has type never, and compilation succeeds cleanly:",
        codeSnippet: `type Action =
  | { type: "login"; username: string }
  | { type: "logout" };

function handleAction(action: Action) {
  switch (action.type) {
    case "login":
      console.log("Logged in:", action.username);
      break;
    case "logout":
      console.log("Logged out");
      break;
    default:
      // ✅ 'action' is 'never' here because both cases are handled!
      return assertNever(action);
  }
}`,
      },
      {
        title: "3. What Happens When the Union Expands?",
        content:
          "Now suppose we add a third variant: { type: 'signup'; email: string }. Because the switch does not handle 'signup', it falls through to default:",
        codeSnippet: `type Action =
  | { type: "login"; username: string }
  | { type: "logout" }
  | { type: "signup"; email: string }; // Newly added!

// In handleAction's default branch:
// ❌ COMPILE ERROR:
// Argument of type '{ type: "signup"; email: string }' is not assignable to parameter of type 'never'.`,
      },
      {
        title: "4. The Fix: Simply Add the Missing Case",
        content:
          "Adding case 'signup': immediately resolves the compile error and restores 100% type safety:",
        codeSnippet: `case "signup":
  console.log("Registered:", action.email);
  break;
// ✅ Now 'action' is 'never' again in default!`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Silent Fallthrough or Generic Runtime Errors",
      code: `// ❌ Loose pattern: Silently falls through without compiler warning
function getDiscount(tier: "bronze" | "silver" | "gold" | "platinum") {
  switch (tier) {
    case "bronze": return 0.05;
    case "silver": return 0.10;
    case "gold": return 0.15;
    // Forgot "platinum"!
    default:
      return 0; // Silent bug! Platinum customer receives 0% discount!
  }
}`,
      explanation:
        "The developer forgot to handle `'platinum'`, and the default branch silently returned 0 instead of alerting the developer at compile time.",
    },
    good: {
      title: "Compile-Time Exhaustive Guard with assertNever",
      code: `// ✅ Robust: assertNever forces compile-time resolution
function getDiscount(tier: "bronze" | "silver" | "gold" | "platinum"): number {
  switch (tier) {
    case "bronze": return 0.05;
    case "silver": return 0.10;
    case "gold": return 0.15;
    case "platinum": return 0.25; // Handled!
    default:
      return assertNever(tier);   // If a new tier is added, this errors!
  }
}`,
      explanation:
        "`assertNever(tier)` guarantees that adding a `'diamond'` tier in the future will immediately cause a compile-time build failure until handled.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Test Exhaustive Checking",
    intro:
      "Run this code in the live sandbox. See how assertNever protects notification routing:",
    starterCode: `// TS-13: Exhaustive Checking with never

function assertNever(x: never): never {
  throw new Error("Unhandled variant: " + JSON.stringify(x));
}

type NotificationChannel =
  | { type: "email"; address: string }
  | { type: "sms"; phoneNumber: string }
  | { type: "push"; deviceToken: string };

function dispatchNotification(channel: NotificationChannel): string {
  switch (channel.type) {
    case "email":
      return "Sending Email to: " + channel.address;
    case "sms":
      return "Sending SMS to: " + channel.phoneNumber;
    case "push":
      return "Sending Push Notification to device: " + channel.deviceToken;
    default:
      // Notice that 'channel' has type 'never' here because all 3 cases are handled!
      return assertNever(channel);
  }
}

console.log(dispatchNotification({ type: "email", address: "user@learncraft.dev" }));
console.log(dispatchNotification({ type: "sms", phoneNumber: "+15551234567" }));
console.log(dispatchNotification({ type: "push", deviceToken: "tok_ios_881" }));
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "What type does a variable have in the `default:` branch of a switch statement that has already handled every variant of a discriminated union?",
      options: [
        "`never`",
        "`any`",
        "`unknown`",
        "`undefined`",
      ],
      correctIndex: 0,
      explanation:
        "When all possible types of a union have been narrowed and handled in preceding cases, no possibilities remain. TypeScript assigns the empty bottom type, `never`, to the variable.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. The 'never' Type",
        desc: "Represents values that can never occur. An exhausted union evaluates to never.",
      },
      {
        title: "2. The assertNever Sentinel",
        desc: "Passing an unhandled variant to assertNever(x: never) triggers a compile-time error.",
      },
      {
        title: "3. Fearless Codebase Updates",
        desc: "Adding a new member to a union immediately flags every switch that needs attention.",
      },
      {
        title: "4. No Silent Fallthroughs",
        desc: "Prevents business logic bugs where newly added states fall through to generic defaults.",
      },
    ],
    nextLessonPreview: {
      title: "Stage 4: Generics & Type Abstraction",
      desc: "Advance to Stage 4 to master generic functions, type parameters <T>, constraints (extends), and keyof property lookups.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-14: Generic Functions & Type Parameters
// ────────────────────────────────────────────────────────────────────────────
export const TS14_CONTENT: StandardLessonContent = {
  slug: "ts14-generic-functions",
  code: "TS-14",
  title: "Generic Functions & Type Parameters",
  subtitle:
    "Harness the power of type variables (<T>) to build reusable functions without sacrificing type safety or resorting to any.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Universal Mold: Why Generics Are Variables for Types",
    bigPicture:
      "When building reusable utilities (like identity, array reversers, or cache managers), developers often face an ugly choice: duplicate identical code for every type (`reverseNumbers`, `reverseStrings`), or surrender to `any`, which disables TypeScript completely and leads to runtime crashes. Generics solve this by introducing type variables: placeholders written as `<T>` that capture the exact type passed in at call-time and pass it along to the return value with zero loss of type safety.",
    breakdownTitle: "The Anatomy of Generic Functions:",
    breakdownItems: [
      {
        title: "1. The Type Variable <T>",
        desc: "Declared inside angle brackets after the function name, acting as a placeholder for types just as arguments act as placeholders for values.",
      },
      {
        title: "2. Automatic Call-Site Inference",
        desc: "You rarely need to write `fn<string>('hello')`. TypeScript looks at the arguments you pass and infers T automatically.",
      },
      {
        title: "3. End-to-End Type Preservation",
        desc: "Unlike 'any', returning 'T' ensures the caller retains full autocomplete, property access, and method validation.",
      },
      {
        title: "4. Multiple Type Parameters",
        desc: "Functions can accept multiple independent type parameters, such as `pair<K, V>(key: K, value: V): [K, V]`.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Declaring and Calling Generics",
    intro: "Understand the syntax and execution rules of generic type parameters:",
    cards: [
      {
        number: "01",
        tag: "Syntax",
        title: "<T> Declaration",
        description:
          "Placed immediately after the function name. Declares that T is a type parameter scoped to this function call.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Inference",
        title: "Automatic Inference",
        description:
          "TypeScript inspects the argument passed at runtime and binds T to that specific type without explicit annotations.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Fidelity",
        title: "Zero Type Erasure Loss",
        description:
          "The returned value maintains its exact primitive or object identity, preventing accidental method access bugs.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Generic Reusability Rule",
      content:
        "Never use `any` to write reusable utilities. Declare a type parameter `<T>` so the compiler captures and enforces the exact types flowing into and out of your function.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Tracing Generic Execution",
    intro: "Observe how TypeScript binds and tracks types through generic functions:",
    points: [
      {
        title: "1. The Identity Function Problem",
        content:
          "Using `any` causes TypeScript to forget the return type entirely, opening the door to silent bugs:",
        codeSnippet: `// ❌ Loses all type information:
function identityAny(arg: any): any {
  return arg;
}
const result = identityAny("hello"); // Type is 'any'
// result.nonExistentMethod(); // Compiles fine, crashes at runtime!`,
      },
      {
        title: "2. Introducing the <T> Type Parameter",
        content:
          "By declaring `<T>`, we tell the compiler: 'whatever type goes in as arg must also come out as the return value':",
        codeSnippet: `// ✅ Preserves exact type information:
function identity<T>(arg: T): T {
  return arg;
}

const text = identity("LearnCraft"); // T is inferred as string!
const num = identity(42);           // T is inferred as number!

console.log(text.toUpperCase());    // ✅ Full autocomplete for string methods!
console.log(num.toFixed(2));        // ✅ Full autocomplete for number methods!`,
      },
      {
        title: "3. Generic Arrays & Collections",
        content:
          "Type parameters work seamlessly with arrays, tuples, and collections:",
        codeSnippet: `function getFirstElement<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}

const names = ["Alice", "Bob", "Charlie"];
const firstName = getFirstElement(names); // Inferred as: string | undefined

const scores = [95, 88, 100];
const topScore = getFirstElement(scores); // Inferred as: number | undefined`,
      },
      {
        title: "4. Multiple Type Parameters",
        content:
          "You can define two or more independent type variables by separating them with commas:",
        codeSnippet: `function makePair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const pair = makePair("status", 200); // Inferred as: [string, number]
console.log(pair[0].length);          // ✅ string method
console.log(pair[1].toFixed(1));       // ✅ number method`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Using 'any' for Reusable Collection Utilities",
      code: `// ❌ Loose pattern: Using any[] hides catastrophic runtime type errors
function reverseList(items: any[]): any[] {
  return items.slice().reverse();
}

const numbers = [10, 20, 30];
const reversed = reverseList(numbers);

// TypeScript assumes reversed is any[], so it cannot warn us:
reversed[0].toLowerCase(); // 💥 RUNTIME CRASH: reversed[0].toLowerCase is not a function!`,
      explanation:
        "Because `reverseList` returned `any[]`, TypeScript had no way of knowing that the array contained numbers. The bug escaped compile time and crashed in production.",
    },
    good: {
      title: "Generic Function Preserving Element Fidelity",
      code: `// ✅ Robust: Generic type parameter maintains exact element types
function reverseList<T>(items: T[]): T[] {
  return items.slice().reverse();
}

const numbers = [10, 20, 30];
const reversed = reverseList(numbers); // Inferred as number[]

// reversed[0].toLowerCase(); // ❌ TypeScript catches this at compile time!
// Error: Property 'toLowerCase' does not exist on type 'number'.

console.log(reversed[0].toFixed(2)); // ✅ Type-safe: "30.00"`,
      explanation:
        "`reverseList<T>` captures `T = number` automatically. TypeScript validates all subsequent operations and provides instant IDE autocomplete.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Experiment with Generics",
    intro:
      "Run the generic functions below. Notice how each call preserves the exact return type without any casting:",
    starterCode: `// TS-14: Generic Functions & Type Parameters

// 1. Single type parameter
function wrapInBox<T>(item: T): { value: T; createdAt: string } {
  return {
    value: item,
    createdAt: new Date().toISOString()
  };
}

const stringBox = wrapInBox("LearnCraft TypeScript");
console.log("Box value:", stringBox.value.toUpperCase());

const numberBox = wrapInBox(1337);
console.log("Box value doubled:", numberBox.value * 2);

// 2. Multiple type parameters with tuples
function createKeyValuePair<K, V>(key: K, value: V): { key: K; value: V } {
  return { key, value };
}

const entry = createKeyValuePair("session_token", 99482);
console.log("Key:", entry.key, "| Value:", entry.value);
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "In the function signature `function wrap<T>(val: T): { data: T }`, what is the inferred return type of calling `wrap('hello')`?",
      options: [
        "`{ data: string }`",
        "`{ data: any }`",
        "`{ data: unknown }`",
        "`{ data: T }`",
      ],
      correctIndex: 0,
      explanation:
        "TypeScript inspects the argument `'hello'`, infers `T` as `string`, and resolves the return type `{ data: T }` to `{ data: string }`.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. Type Variables (<T>)",
        desc: "Act as placeholders for types, capturing the incoming type at call time.",
      },
      {
        title: "2. Reusability Without 'any'",
        desc: "Provides total code reusability while preserving strict compile-time type safety.",
      },
      {
        title: "3. Automatic Inference",
        desc: "TypeScript infers type arguments automatically from function arguments.",
      },
      {
        title: "4. Multi-Parameter Flexibility",
        desc: "Declare independent type variables like <T, U> for paired or mapped data.",
      },
    ],
    nextLessonPreview: {
      title: "TS-15: Generic Interfaces & Containers",
      desc: "Apply generics to object interfaces and standard envelopes like ApiResponse<T> and PaginatedList<T>.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-15: Generic Interfaces & Containers
// ────────────────────────────────────────────────────────────────────────────
export const TS15_CONTENT: StandardLessonContent = {
  slug: "ts15-generic-interfaces",
  code: "TS-15",
  title: "Generic Interfaces & Containers",
  subtitle:
    "Structure scalable API envelopes, paginated collections, and repository contracts using parameterized interfaces.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Standard Shipping Container: Modeling Reusable Envelopes",
    bigPicture:
      "An intermodal shipping container has identical dimensions, corner castings, and crane attachments whether it carries luxury sports cars, fresh bananas, or computer chips. In TypeScript, a generic interface like `ApiResponse<T>` provides identical envelope metadata (success, timestamp, statusCode) while safely transporting whatever payload type `T` your backend delivers. Real-world applications consume dozens of API endpoints. If you define a separate response interface for every entity (`UserApiResponse`, `ProductApiResponse`, `OrderApiResponse`), your codebase drowns in redundant boilerplate that rapidly drifts out of sync. By defining generic interfaces, you declare the container shape once (`ApiResponse<T>`) and parameterize only the dynamic payload, keeping your API contracts clean, consistent, and strictly typed.",
    breakdownTitle: "Core Aspects of Generic Containers:",
    breakdownItems: [
      {
        title: "1. The Envelope vs Payload Separation",
        desc: "Fixed metadata (success, error, page, total) stays constant while payload data <T> adapts to the specific entity.",
      },
      {
        title: "2. Composable Nesting",
        desc: "Generic interfaces nest naturally: `ApiResponse<PaginatedList<User>>` models complex nested data with zero type degradation.",
      },
      {
        title: "3. Default Type Parameters",
        desc: "Just like default parameter values in JavaScript, interfaces can provide fallback types: `interface Cache<T = string>`.",
      },
      {
        title: "4. Shared Repository & Service Contracts",
        desc: "Patterns like `Repository<T>` define consistent CRUD method signatures across users, products, and invoices.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Modeling Generic Interfaces",
    intro: "Learn how to define, extend, and consume parameterized object interfaces:",
    cards: [
      {
        number: "01",
        tag: "Pattern",
        title: "Envelope Pattern",
        description:
          "Wrap business entities in standardized response structures with status codes, error details, and typed payloads.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Composition",
        title: "Deep Nesting",
        description:
          "Compose containers freely: ApiResponse<Paginated<User>> gives full autocomplete through all nesting layers.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Defaults",
        title: "Default Type Arguments",
        description:
          "Provide default types (e.g. <T = unknown>) for common baseline cases while allowing full specialization.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Envelope Consistency Rule",
      content:
        "Always model network, storage, and event payloads with generic container interfaces (`ApiResponse<T>`) instead of duplicating envelope properties across domain models.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Building API Containers",
    intro: "Follow how generic containers replace repetitive type declarations:",
    points: [
      {
        title: "1. The Repetitive Envelope Problem",
        content:
          "Without generics, developers write dozens of nearly identical wrapper interfaces:",
        codeSnippet: `// ❌ Redundant duplication:
interface UserResponse {
  success: boolean;
  timestamp: number;
  data: { id: number; name: string };
}

interface ProductResponse {
  success: boolean;
  timestamp: number;
  data: { id: number; title: string; price: number };
}`,
      },
      {
        title: "2. Unifying with a Generic ApiResponse<T>",
        content:
          "Define the envelope once, leaving the data field parameterized by `T`:",
        codeSnippet: `// ✅ Clean & Unified:
interface ApiResponse<T> {
  success: boolean;
  timestamp: number;
  data: T;
  error?: string;
}

interface User {
  id: number;
  name: string;
}

// Now easily declare typed responses:
type UserResponse = ApiResponse<User>;
type UserListResponse = ApiResponse<User[]>;`,
      },
      {
        title: "3. Multi-Level Container Composition",
        content:
          "Combine pagination and network envelopes without any loss of type safety:",
        codeSnippet: `interface PaginatedList<Item> {
  items: Item[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

// Seamless composition:
type PaginatedUsersResponse = ApiResponse<PaginatedList<User>>;

function handleUsers(res: PaginatedUsersResponse) {
  console.log("Total users:", res.data.totalCount);
  console.log("First user:", res.data.items[0]?.name); // ✅ Fully typed!
}`,
      },
      {
        title: "4. Default Generic Arguments",
        content:
          "Provide default types using the `=` syntax, just like default parameters in functions:",
        codeSnippet: `interface CacheEntry<T = string> {
  key: string;
  value: T;
  expiresAt: number;
}

// Uses default type (string):
const stringCache: CacheEntry = { key: "theme", value: "dark", expiresAt: 123456 };

// Explicitly overrides default with number:
const numCache: CacheEntry<number> = { key: "score", value: 42, expiresAt: 123456 };`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Duplicating Response Envelopes or Using 'data: any'",
      code: `// ❌ Anti-pattern: Using any or creating 20 duplicate interfaces
interface ApiResult {
  success: boolean;
  data: any; // Type safety destroyed!
}

async function fetchUser(): Promise<ApiResult> {
  return { success: true, data: { id: 1, username: "alice" } };
}

const res = await fetchUser();
console.log(res.data.nonExistentField.toLowerCase()); // 💥 Silent compile, runtime crash!`,
      explanation:
        "Using `data: any` erases all benefits of TypeScript. Callers receive no autocomplete, and accessing missing properties causes runtime errors.",
    },
    good: {
      title: "Clean Generic Container with Strong Domain Types",
      code: `// ✅ Robust: Generic container parameterizes the data payload
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

interface User {
  id: number;
  username: string;
}

async function fetchUser(): Promise<ApiResponse<User>> {
  return { success: true, data: { id: 1, username: "alice" } };
}

const res = await fetchUser();
console.log(res.data.username.toUpperCase()); // ✅ Autocomplete & compile-time safety!`,
      explanation:
        "`ApiResponse<User>` guarantees that `res.data` is an authentic `User` object, catching invalid property lookups immediately during development.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Test Generic Containers",
    intro:
      "Run the generic response handler below. See how TypeScript checks both the envelope and payload types:",
    starterCode: `// TS-15: Generic Interfaces & Containers

interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: number;
  error?: string;
}

interface User {
  id: number;
  name: string;
  role: "admin" | "editor" | "viewer";
}

interface Product {
  id: number;
  title: string;
  price: number;
}

function createSuccessResponse<T>(payload: T): ApiResponse<T> {
  return {
    success: true,
    data: payload,
    timestamp: Date.now(),
  };
}

const userRes = createSuccessResponse<User>({
  id: 101,
  name: "Sarah Connor",
  role: "admin"
});

const productsRes = createSuccessResponse<Product[]>([
  { id: 1, title: "Mechanical Keyboard", price: 129.99 },
  { id: 2, title: "UltraWide Monitor", price: 499.00 }
]);

console.log("User:", userRes.data.name, "(Role:", userRes.data.role + ")");
console.log("Product count:", productsRes.data.length);
console.log("First product price: $" + productsRes.data[0].price.toFixed(2));
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "Given the interface `interface Box<T> { content: T; }`, what is the type of `const b: Box<number[]> = { content: [1, 2, 3] };`'s `content` property?",
      options: [
        "`number[]`",
        "`number`",
        "`Box<number>`",
        "`any[]`",
      ],
      correctIndex: 0,
      explanation:
        "By specifying `Box<number[]>`, the type argument `T` is bound to `number[]`. Therefore, `content: T` resolves strictly to `number[]`.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. Envelope & Payload Architecture",
        desc: "Parameterize the dynamic payload while keeping standard envelope fields consistent.",
      },
      {
        title: "2. DRY API Contracts",
        desc: "Avoid duplicating response structures across dozens of application endpoints.",
      },
      {
        title: "3. Composable Containers",
        desc: "Nest generic interfaces like ApiResponse<PaginatedList<T>> with full type safety.",
      },
      {
        title: "4. Default Type Arguments",
        desc: "Use <T = DefaultType> to supply fallback types for common base use cases.",
      },
    ],
    nextLessonPreview: {
      title: "TS-16: Generic Constraints",
      desc: "Learn how to restrict type parameters with 'extends' so you can safely access properties like .length or .id.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-16: Generic Constraints
// ────────────────────────────────────────────────────────────────────────────
export const TS16_CONTENT: StandardLessonContent = {
  slug: "ts16-generic-constraints",
  code: "TS-16",
  title: "Generic Constraints",
  subtitle:
    "Establish structural lower bounds using extends to safely inspect properties while retaining exact return subtypes.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The VIP Velvet Rope: Setting Structural Minimum Requirements",
    bigPicture:
      "At a theme park roller coaster, the operator does not care what color shirt you are wearing or what language you speak, but they enforce one strict minimum requirement: 'You must be at least 48 inches tall.' In TypeScript, generic constraints work the same way. Unconstrained generics `<T>` can be literally anything: a number, a boolean, null, or a function. Because `T` could be anything, TypeScript forbids you from accessing properties like `item.length` or `item.id`, because numbers and booleans do not have those properties! Generic constraints use the `extends` keyword to set a structural floor: `<T extends HasId>` tells the compiler that `T` is guaranteed to have an `id`, allowing safe member access while preserving the caller's specific subtype.",
    breakdownTitle: "How Generic Constraints Work:",
    breakdownItems: [
      {
        title: "1. The Unconstrained Limitation",
        desc: "With `<T>`, you cannot access `x.length` or `x.id` because T could be `number` or `undefined`.",
      },
      {
        title: "2. The 'extends' Keyword as a Bound",
        desc: "`<T extends { length: number }>` specifies that T must satisfy this minimum structural shape.",
      },
      {
        title: "3. Safe In-Body Member Access",
        desc: "Inside the function body, you can safely read constrained properties without casting or checking.",
      },
      {
        title: "4. Subtype Specificity Preservation",
        desc: "Passing a detailed `AdminUser` returns `AdminUser`, not just the degraded base constraint shape.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Restricting Type Parameters",
    intro: "Understand how to declare constraints and preserve specific return types:",
    cards: [
      {
        number: "01",
        tag: "Contract",
        title: "Structural Minimum",
        description:
          "T extends Shape ensures incoming arguments possess all required properties without forbidding extra ones.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Access",
        title: "Guaranteed Properties",
        description:
          "The function body can freely access item.id or item.length with zero type assertions needed.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Preservation",
        title: "Full Subtype Fidelity",
        description:
          "Unlike accepting the base interface directly, generic constraints preserve the caller's exact original type.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Constraint Rule",
      content:
        "When a generic function needs to access properties on `<T>`, constrain it with `extends` rather than degrading the parameter type to a plain interface or resorting to `as any`.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Enforcing Minimum Shapes",
    intro: "Walk through why constraints are necessary and how they protect your code:",
    points: [
      {
        title: "1. The Unconstrained Failure",
        content:
          "If you try to read properties on a raw generic `<T>`, TypeScript immediately flags an error:",
        codeSnippet: `function printLength<T>(item: T) {
  // ❌ COMPILE ERROR: Property 'length' does not exist on type 'T'.
  // Why? Because someone could call printLength(42) or printLength(false)!
  console.log(item.length);
}`,
      },
      {
        title: "2. Setting the Lower Bound with extends",
        content:
          "We define the minimum interface and constrain `T` using `extends`:",
        codeSnippet: `interface HasLength {
  length: number;
}

// ✅ Now TypeScript knows T is guaranteed to have .length:
function printLength<T extends HasLength>(item: T): number {
  console.log("Length:", item.length);
  return item.length;
}

printLength("hello");       // ✅ string has .length (5)
printLength([1, 2, 3, 4]);  // ✅ array has .length (4)
printLength({ length: 10 });// ✅ object has .length (10)
// printLength(42);         // ❌ Compile error: number has no .length!`,
      },
      {
        title: "3. Preserving Caller Specificity vs Base Interfaces",
        content:
          "Why not just write `function printLength(item: HasLength): HasLength`? Because it degrades the return type:",
        codeSnippet: `// ❌ Without generics: degrades return type to HasLength
function longestNonGeneric(a: HasLength, b: HasLength): HasLength {
  return a.length >= b.length ? a : b;
}
const s = longestNonGeneric("apple", "banana");
// s.toUpperCase(); // ❌ ERROR: HasLength has no .toUpperCase() method!

// ✅ With generic constraint: preserves the exact input type (string)
function longest<T extends HasLength>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
const result = longest("apple", "banana"); // Type is string!
console.log(result.toUpperCase()); // ✅ Safe and autocompleted: "BANANA"`,
      },
      {
        title: "4. Constraining Objects by ID",
        content:
          "A classic enterprise use case: searching lists of any entity that has an `id`:",
        codeSnippet: `interface Identifiable {
  id: number | string;
}

function findById<T extends Identifiable>(items: T[], targetId: T["id"]): T | undefined {
  return items.find((item) => item.id === targetId);
}`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Type Casting 'as any' to Bypass the Compiler",
      code: `// ❌ Loose pattern: Force-casting inside an unconstrained generic
function getEntityId<T>(entity: T): string {
  // Casting with 'as any' silences TypeScript and invites production crashes:
  return (entity as any).id;
}

getEntityId({ id: "usr_1" }); // Works
getEntityId(42); // Returns undefined silently, leading to broken database lookups!`,
      explanation:
        "Using `as any` completely defeats the purpose of TypeScript. Calling `getEntityId(42)` produces no compiler warning but yields corrupt `undefined` values at runtime.",
    },
    good: {
      title: "Strict Generic Constraint with Compile-Time Enforcement",
      code: `// ✅ Robust: Constrain T to objects with an id
interface HasId {
  id: string;
}

function getEntityId<T extends HasId>(entity: T): string {
  return entity.id; // ✅ 100% safe, no casting required
}

getEntityId({ id: "usr_1", name: "Alice" }); // ✅ Inferred as: { id: string; name: string }
// getEntityId(42); // ❌ Compile error: Argument of type 'number' does not satisfy constraint 'HasId'.`,
      explanation:
        "The constraint `<T extends HasId>` prevents non-conforming arguments from ever compiling, while guaranteeing safe property access in the function body.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Test Generic Constraints",
    intro:
      "Run the generic entity repository below. See how constraints enforce the presence of an `id` while preserving specific entity shapes:",
    starterCode: `// TS-16: Generic Constraints

interface HasId {
  id: number;
}

interface User extends HasId {
  name: string;
  email: string;
}

interface Product extends HasId {
  title: string;
  price: number;
}

// Function requires items to have an 'id', but preserves the exact element type T
function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

const products: Product[] = [
  { id: 101, title: "Desk Lamp", price: 29.99 },
  { id: 102, title: "Ergonomic Chair", price: 249.00 },
];

const foundUser = findById(users, 2);
if (foundUser) {
  // TypeScript knows foundUser is User, so .name and .email are autocompleted:
  console.log("Found user:", foundUser.name, "<" + foundUser.email + ">");
}

const foundProduct = findById(products, 101);
if (foundProduct) {
  // TypeScript knows foundProduct is Product, so .title and .price are autocompleted:
  console.log("Found product:", foundProduct.title, "- $" + foundProduct.price.toFixed(2));
}
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "Why does TypeScript report an error on `function printLen<T>(val: T) { return val.length; }`?",
      options: [
        "Because unconstrained T could be any type (like number or boolean) that lacks a length property",
        "Because length is a reserved keyword in TypeScript generics",
        "Because generic functions cannot return numbers",
        "Because val must be explicitly converted to string first",
      ],
      correctIndex: 0,
      explanation:
        "Without a constraint like `<T extends { length: number }>`, `T` could be any type. TypeScript refuses to let you access `.length` on values that might not have it.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. Structural Lower Bound",
        desc: "<T extends Constraint> sets a minimum requirement for incoming types.",
      },
      {
        title: "2. Safe In-Body Property Access",
        desc: "Read guaranteed properties like .id or .length without any type casting.",
      },
      {
        title: "3. Call-Site Rejection",
        desc: "Invalid arguments that lack required properties are rejected at compile time.",
      },
      {
        title: "4. Return Type Preservation",
        desc: "Preserves the caller's specific subtype instead of flattening to the base interface.",
      },
    ],
    nextLessonPreview: {
      title: "TS-17: Generics with keyof & Property Lookup",
      desc: "Combine generic constraints with keyof to safely lookup and pluck object properties without typos.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-17: Generics with keyof & Property Lookup
// ────────────────────────────────────────────────────────────────────────────
export const TS17_CONTENT: StandardLessonContent = {
  slug: "ts17-generics-keyof",
  code: "TS-17",
  title: "Generics with keyof & Property Lookup",
  subtitle:
    "Achieve complete typo immunity and automatic indexed return typing using K extends keyof T and T[K].",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Smart Keycard Reader: Banning Object Property Typos",
    bigPicture:
      "In a high-security research building, a door card reader does not accept random handwritten room names scribbled on napkins. It checks your keycard against the facility's exact list of authorized room identifiers, and only opens the specific room matching that key. A frequent need in JavaScript is reading or writing object properties dynamically: `getProperty(user, key)`. If `key` is typed as plain `string`, a simple typo like `getProperty(user, 'emial')` compiles without warning and returns `undefined` at runtime, causing silent bugs. By combining the `keyof` operator with generic constraints and indexed access types (`T[K]`), TypeScript catches property typos at compile time and automatically computes the exact return type of the requested field.",
    breakdownTitle: "The Mechanics of Keyof & Indexed Access:",
    breakdownItems: [
      {
        title: "1. The keyof Operator",
        desc: "Extracts all public keys of an object type as a union of string literal types: `keyof User` -> `'id' | 'name' | 'email'`.",
      },
      {
        title: "2. The K extends keyof T Constraint",
        desc: "Restricts the second type parameter K to only keys that genuinely exist on T.",
      },
      {
        title: "3. Indexed Access Types T[K]",
        desc: "Computes the exact type stored under key K (e.g. `User['email']` -> `string`).",
      },
      {
        title: "4. Typo Immunity & IDE Autocomplete",
        desc: "Calling `getProperty(user, 'na')` triggers immediate IDE autocomplete suggestions and compile errors for typos.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: keyof, Constraints, and T[K]",
    intro: "Understand the three-part formula for type-safe dynamic property access:",
    cards: [
      {
        number: "01",
        tag: "Extraction",
        title: "keyof Operator",
        description:
          "Produces a union of literal strings representing every known key on the object type.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Constraint",
        title: "K extends keyof T",
        description:
          "Guarantees that the key argument matches one of the object's valid properties, banning invalid strings.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Lookup",
        title: "Indexed Access T[K]",
        description:
          "Returns the exact property value type corresponding to key K with zero casting required.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Keyof Safety Rule",
      content:
        "Never use `key: string` when reading or writing object properties dynamically. Always write `<T, K extends keyof T>(obj: T, key: K): T[K]` to guarantee complete typo immunity and exact return typing.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: The getProperty Formula",
    intro: "Deconstruct how TypeScript evaluates `<T, K extends keyof T>(obj: T, key: K): T[K]`:",
    points: [
      {
        title: "1. The Typo Disaster of key: string",
        content:
          "Using `key: string` gives no typo protection and usually forces a dangerous `any` return type:",
        codeSnippet: `// ❌ Loose pattern:
function getLoose(obj: any, key: string): any {
  return obj[key];
}

const user = { id: 1, name: "Alice", email: "alice@learncraft.dev" };
const email = getLoose(user, "emial"); // Typo! Returns undefined silently!
// email.toLowerCase(); // 💥 CRASH: TypeError: Cannot read properties of undefined`,
      },
      {
        title: "2. What Does keyof Extract?",
        content:
          "The `keyof` operator extracts all property keys as a union of string literals:",
        codeSnippet: `interface User {
  id: number;
  name: string;
  email: string;
}

type UserKeys = keyof User;
// Evaluates to: "id" | "name" | "email"`,
      },
      {
        title: "3. Wiring the Generic Signature",
        content:
          "Combine `T`, `K extends keyof T`, and `T[K]`:",
        codeSnippet: `// ✅ 100% Type-Safe Property Lookup:
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Alice", email: "alice@learncraft.dev" };

const name = getProperty(user, "name");   // Inferred as: string
const id = getProperty(user, "id");       // Inferred as: number

// getProperty(user, "emial");
// ❌ COMPILE ERROR: Argument of type '"emial"' is not assignable to parameter of type '"id" | "name" | "email"'.`,
      },
      {
        title: "4. Plucking Arrays of Properties",
        content:
          "The same pattern powers collection utilities like `pluck`:",
        codeSnippet: `function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}

const users = [
  { id: 1, name: "Alice", score: 95 },
  { id: 2, name: "Bob", score: 88 }
];

const scores = pluck(users, "score"); // Inferred as: number[]
const names = pluck(users, "name");   // Inferred as: string[]`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Using 'key: string' with 'any' Return Type",
      code: `// ❌ Anti-pattern: Unsafe string parameter permits typos
function readProp(obj: Record<string, any>, key: string): any {
  return obj[key];
}

const settings = { theme: "dark", notifications: true, volume: 80 };
const vol = readProp(settings, "vloume"); // Typo! Returns undefined!

// In production, volume calculations break silently:
const nextVol = vol + 10; // NaN in JavaScript!`,
      explanation:
        "Because `key` was typed as `string`, the typo `'vloume'` passed unnoticed. The resulting `undefined` poisoned downstream calculations as `NaN`.",
    },
    good: {
      title: "Strict Dynamic Lookup with keyof and Indexed Access",
      code: `// ✅ Robust: keyof constraint catches typos instantly
function readProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const settings = { theme: "dark", notifications: true, volume: 80 };

// readProp(settings, "vloume"); // ❌ Compile error: Argument of type '"vloume"' is not assignable!
const vol = readProp(settings, "volume"); // ✅ Inferred as: number
console.log("Next volume:", vol + 10);   // ✅ Safe: 90`,
      explanation:
        "The compiler guarantees that `'volume'` is an authentic property on `settings`, autocompletes all valid keys in the IDE, and types the return value strictly as `number`.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Test keyof and Property Lookups",
    intro:
      "Run the code below. See how getProperty and pluck compute exact return types and how keyof prevents typos:",
    starterCode: `// TS-17: Generics with keyof & Property Lookup

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map(item => item[key]);
}

interface Developer {
  id: number;
  name: string;
  role: string;
  isActive: boolean;
}

const team: Developer[] = [
  { id: 1, name: "Ada Lovelace", role: "Systems Architect", isActive: true },
  { id: 2, name: "Alan Turing", role: "Cryptographer", isActive: true },
  { id: 3, name: "Grace Hopper", role: "Compiler Engineer", isActive: false },
];

// 1. Single property lookup
const dev = team[0];
const devName = getProperty(dev, "name");
console.log("Dev name:", devName.toUpperCase());

// 2. Plucking fields across an entire collection
const allRoles = pluck(team, "role");
console.log("Roles in team:", allRoles.join(", "));

const allIds = pluck(team, "id");
console.log("IDs in team:", allIds);
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "If `interface Product { id: number; title: string; inStock: boolean; }`, what is the return type of `getProperty(prod, 'inStock')` using `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]`?",
      options: [
        "`boolean`",
        "`string`",
        "`'id' | 'title' | 'inStock'`",
        "`any`",
      ],
      correctIndex: 0,
      explanation:
        "TypeScript binds `K` to `'inStock'`. The indexed access type `T[K]` evaluates to `Product['inStock']`, which is strictly `boolean`.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. The keyof Operator",
        desc: "Extracts all public keys of an object as a union of string literals.",
      },
      {
        title: "2. Typo Immunity via Constraints",
        desc: "K extends keyof T ensures only valid, existing property keys can be passed.",
      },
      {
        title: "3. Indexed Access Return Typing",
        desc: "T[K] automatically calculates the exact property value type for the requested key.",
      },
      {
        title: "4. Powerful Utility Functions",
        desc: "Forms the bedrock of utilities like pluck, pick, omit, and reactive state stores.",
      },
    ],
    nextLessonPreview: {
      title: "Stage 5: Classes & Object-Oriented TypeScript",
      desc: "Advance to Stage 5 to master class syntax, parameter properties, access modifiers (private, protected), and abstract classes.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-18: Class Fields & Access Modifiers
// ────────────────────────────────────────────────────────────────────────────
export const TS18_CONTENT: StandardLessonContent = {
  slug: "ts18-class-access-modifiers",
  code: "TS-18",
  title: "Class Fields & Access Modifiers",
  subtitle:
    "Control visibility and immutability with public, private, protected, readonly, and JavaScript #private fields.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Bank Branch Access Tiers: Guarding Internal State",
    bigPicture:
      "Consider the security architecture of a commercial bank branch. The front lobby is `public`: customers, delivery drivers, and visitors can walk in freely. The employee staff room is `protected`: regular customers are barred, but authorized bank staff and personnel from regional subsidiary branches (subclasses) have badge access. The subterranean cash vault is `private`: only the branch's automated time lock system (the declaring class itself) can unlock it. Finally, each customer's account number is `readonly`: permanently etched onto their debit card when the account is opened (the constructor) and immutable forever after. In TypeScript, access modifiers provide this exact layered defense system, safeguarding your class invariants against accidental corruption.",
    breakdownTitle: "Four Layers of Class Member Security:",
    breakdownItems: [
      {
        title: "1. public (Default Visibility)",
        desc: "Accessible from anywhere—inside the class, derived subclasses, and on external instance calls.",
      },
      {
        title: "2. protected (Hierarchical Access)",
        desc: "Accessible within the declaring class and any subclasses that extend it, but hidden from external consumers.",
      },
      {
        title: "3. private vs. ECMAScript #private",
        desc: "TypeScript 'private' is a soft compile-time guard, while native JavaScript '#field' provides unforgeable runtime engine-level privacy.",
      },
      {
        title: "4. readonly Modifiers",
        desc: "Ensures fields can only be initialized at declaration or inside the constructor, preventing mutation inside methods.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Visibility and Immutability",
    intro: "Learn how modifiers control accessibility across your class hierarchy:",
    cards: [
      {
        number: "01",
        tag: "Hierarchy",
        title: "protected vs public",
        description:
          "protected grants subclass inheritance privileges while shielding properties from external code tampering.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Isolation",
        title: "private vs #private",
        description:
          "Use private for compile-time architectural boundaries; use native #private if you need hard runtime security.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Integrity",
        title: "readonly Immutability",
        description:
          "Locks down identifiers and immutable config values so they cannot be overwritten after construction.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Encapsulation Rule",
      content:
        "Default internal class state to `private` or `protected` and enforce invariants through explicit public methods, rather than exposing raw mutable fields directly to external callers.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Applying Access Modifiers",
    intro: "Observe how TypeScript enforces visibility boundaries at compile time:",
    points: [
      {
        title: "1. Default Public Visibility",
        content:
          "By default in TypeScript, all class properties and methods are public unless marked otherwise:",
        codeSnippet: `class Greeter {
  public greeting: string; // 'public' is implicit if omitted
  constructor(message: string) {
    this.greeting = message;
  }
}
const g = new Greeter("Hello");
console.log(g.greeting); // ✅ Accessible everywhere`,
      },
      {
        title: "2. The protected Boundary",
        content:
          "Subclasses can read and write protected fields, but external callers are blocked:",
        codeSnippet: `class Vehicle {
  protected engineStatus: "off" | "running" = "off";

  public startEngine(): void {
    this.engineStatus = "running";
  }
}

class RaceCar extends Vehicle {
  public turboBoost(): void {
    // ✅ Subclass can access protected member:
    if (this.engineStatus === "running") {
      console.log("Nitro activated!");
    }
  }
}

const car = new RaceCar();
// car.engineStatus; 
// ❌ COMPILE ERROR: Property 'engineStatus' is protected and only accessible within class 'Vehicle' and its subclasses.`,
      },
      {
        title: "3. TypeScript private vs JS #private",
        content:
          "TypeScript's `private` keyword is erased at compilation, while `#` fields persist at runtime:",
        codeSnippet: `class SecureVault {
  private softPin: string = "1234"; // Stripped at JS runtime
  #hardPin: string = "5678";         // Native ECMAScript private field

  verify(pin: string): boolean {
    return this.#hardPin === pin;
  }
}

const vault = new SecureVault();
// vault.softPin; // ❌ Compile error in TypeScript!
// (vault as any).softPin; // ⚠️ Accessible at runtime in JS!

// vault.#hardPin; // 💥 SyntaxError even in raw JavaScript! Cannot access #hardPin outside class.`,
      },
      {
        title: "4. Protecting Invariants with readonly",
        content:
          "Readonly properties prevent reassignment outside the constructor:",
        codeSnippet: `class UserAccount {
  readonly id: string;
  public username: string;

  constructor(id: string, username: string) {
    this.id = id; // ✅ Allowed in constructor
    this.username = username;
  }

  changeUsername(newName: string) {
    this.username = newName; // ✅ Allowed
    // this.id = "new_id";
    // ❌ COMPILE ERROR: Cannot assign to 'id' because it is a read-only property.
  }
}`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Exposing Mutable State or Relying on Underscore Conventions",
      code: `// ❌ Loose pattern: Public mutable fields permit arbitrary external corruption
class Wallet {
  public _balance: number = 0; // Fake privacy via underscore naming

  deposit(amount: number) {
    this._balance += amount;
  }
}

const w = new Wallet();
w.deposit(50);
// External code bypasses deposit validation and directly corrupts balance:
w._balance = -999999; // Corrupted state! No compiler warning!`,
      explanation:
        "Using naming conventions like `_balance` provides zero type protection. Any caller can bypass business validation rules and directly set invalid values.",
    },
    good: {
      title: "Encapsulated State with private / #private & Controlled Methods",
      code: `// ✅ Robust: Enforced encapsulation with validation invariants
class Wallet {
  #balance: number = 0;

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Deposit must be positive");
    this.#balance += amount;
  }

  getBalance(): number {
    return this.#balance;
  }
}

const w = new Wallet();
w.deposit(50);
// w.#balance = -999; // ❌ Compile error & runtime syntax failure!
console.log("Safe balance:", w.getBalance()); // ✅ 50`,
      explanation:
        "By encapsulating the balance behind `#balance`, the class guarantees that its balance can never be corrupted by direct external mutation.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Test Access Modifiers",
    intro:
      "Run the bank account simulation below. Observe how TypeScript protects internal account data while exposing clean operations:",
    starterCode: `// TS-18: Class Fields & Access Modifiers

class BankAccount {
  readonly accountNumber: string;
  protected accountType: "checking" | "savings";
  private balance: number;

  constructor(accountNumber: string, type: "checking" | "savings", initialDeposit: number) {
    this.accountNumber = accountNumber;
    this.accountType = type;
    this.balance = Math.max(0, initialDeposit);
  }

  public deposit(amount: number): void {
    if (amount <= 0) {
      console.log("Deposit must be positive");
      return;
    }
    this.balance += amount;
    console.log("Deposited $" + amount + ". New balance: $" + this.balance);
  }

  public withdraw(amount: number): boolean {
    if (amount > this.balance) {
      console.log("Insufficient funds! Current balance: $" + this.balance);
      return false;
    }
    this.balance -= amount;
    console.log("Withdrew $" + amount + ". Remaining: $" + this.balance);
    return true;
  }

  public getBalanceSummary(): string {
    return "[" + this.accountNumber + " (" + this.accountType + ")]: $" + this.balance;
  }
}

const myAccount = new BankAccount("AC-9941-88", "checking", 250);
console.log(myAccount.getBalanceSummary());

myAccount.deposit(100);
myAccount.withdraw(50);
myAccount.withdraw(500); // Exceeds balance!

// Notice: myAccount.balance is inaccessible directly from here!
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "Which access modifier allows a class member to be accessed inside the declaring class and its subclasses, but forbids external access on instances?",
      options: [
        "`protected`",
        "`private`",
        "`public`",
        "`readonly`",
      ],
      correctIndex: 0,
      explanation:
        "`protected` members are accessible throughout the inheritance chain (within the parent class and derived child classes), while remaining strictly hidden from external instance calls.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. public by Default",
        desc: "All unannotated members are public. Add modifiers explicitly to restrict access.",
      },
      {
        title: "2. protected for Subclasses",
        desc: "Allows child classes in the inheritance tree to access shared internal mechanics.",
      },
      {
        title: "3. private vs. #private",
        desc: "Use private for compile-time safety, or #private for hard native JS engine privacy.",
      },
      {
        title: "4. readonly Invariants",
        desc: "Guarantees that properties cannot be overwritten outside of class initialization.",
      },
    ],
    nextLessonPreview: {
      title: "TS-19: Parameter Properties & Getters/Setters",
      desc: "Learn how to eliminate constructor boilerplate with parameter properties and wire type-safe getters and setters.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-19: Parameter Properties & Getters/Setters
// ────────────────────────────────────────────────────────────────────────────
export const TS19_CONTENT: StandardLessonContent = {
  slug: "ts19-parameter-properties",
  code: "TS-19",
  title: "Parameter Properties & Getters/Setters",
  subtitle:
    "Eliminate constructor boilerplate with parameter properties and implement type-safe accessors.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Turnkey Furnished Apartment: Zero Boilerplate Constructors",
    bigPicture:
      "In vanilla JavaScript and early TypeScript, creating a class required writing every property name three times: once as a field declaration, once in the constructor parameter list, and once in the assignment statement (`this.username = username`). That is like renting an empty apartment and manually carrying in every piece of furniture one by one. TypeScript's Parameter Properties act like a turnkey furnished apartment: by simply prefixing a constructor parameter with an access modifier (`public`, `private`, `protected`, or `readonly`), TypeScript automatically declares the class field and assigns the incoming argument to it in a single concise line. Paired with type-safe getters and setters, you achieve elegant, declarative data modeling with zero ceremony.",
    breakdownTitle: "Mechanics of Parameter Properties & Accessors:",
    breakdownItems: [
      {
        title: "1. Parameter Property Shorthand",
        desc: "Prefixing constructor arguments with `public`, `private`, or `readonly` declares and assigns the field automatically.",
      },
      {
        title: "2. Getter Accessors (get)",
        desc: "Compute values on-the-fly or expose private state under a read-only interface.",
      },
      {
        title: "3. Setter Accessors (set)",
        desc: "Intercept mutations to validate inputs, enforce business logic, or trigger side effects.",
      },
      {
        title: "4. Type Synchronization",
        desc: "TypeScript guarantees that getter return types and setter parameter types remain strictly compatible.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Concise Constructors & Accessors",
    intro: "Master the syntax for parameter properties and accessor methods:",
    cards: [
      {
        number: "01",
        tag: "Shorthand",
        title: "Parameter Properties",
        description:
          "constructor(public name: string) eliminates triple-declaration boilerplate in one clean token.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Encapsulation",
        title: "Computed Getters",
        description:
          "A getter without a setter is automatically inferred as readonly, preventing accidental mutation.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Validation",
        title: "Guarded Setters",
        description:
          "Setters validate incoming values before writing to internal private fields, ensuring data integrity.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Turnkey Conciseness Rule",
      content:
        "Use parameter properties (`constructor(public readonly id: string, private secret: string)`) to eliminate redundant constructor assignment boilerplate, and pair private fields with getters/setters when values require validation.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: From Verbose to Concise",
    intro: "Step through how parameter properties and accessors simplify classes:",
    points: [
      {
        title: "1. The Verbose Boilerplate Problem",
        content:
          "Standard class syntax requires declaring each field, accepting it in the constructor, and manually assigning it:",
        codeSnippet: `// ❌ Verbose boilerplate (written 3 times for each field):
class EmployeeOld {
  public id: string;
  public name: string;
  private salary: number;

  constructor(id: string, name: string, salary: number) {
    this.id = id;
    this.name = name;
    this.salary = salary;
  }
}`,
      },
      {
        title: "2. Parameter Property Magic",
        content:
          "Prefixing constructor parameters with an access modifier does everything automatically:",
        codeSnippet: `// ✅ Clean & Concise:
class Employee {
  constructor(
    public readonly id: string,
    public name: string,
    private salary: number
  ) {
    // No body needed! TypeScript automatically generates:
    // this.id = id; this.name = name; this.salary = salary;
  }

  getSalarySummary(): string {
    return \`\${this.name} earns \$\${this.salary}\`;
  }
}`,
      },
      {
        title: "3. Computed Getters as Read-Only Properties",
        content:
          "A getter without a matching setter creates a read-only calculated property:",
        codeSnippet: `class UserProfile {
  constructor(
    public firstName: string,
    public lastName: string
  ) {}

  // Computed getter:
  get fullName(): string {
    return \`\${this.firstName} \${this.lastName}\`;
  }
}

const user = new UserProfile("Margaret", "Hamilton");
console.log(user.fullName); // "Margaret Hamilton"
// user.fullName = "Grace Hopper";
// ❌ COMPILE ERROR: Cannot assign to 'fullName' because it is a read-only property.`,
      },
      {
        title: "4. Validated Setters",
        content:
          "Setters intercept assignments to perform validation before updating internal private fields:",
        codeSnippet: `class TemperatureSensor {
  private _celsius: number = 0;

  get celsius(): number {
    return this._celsius;
  }

  set celsius(val: number) {
    if (val < -273.15) {
      throw new RangeError("Temperature cannot be below absolute zero!");
    }
    this._celsius = val;
  }
}`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Triplicate Property Declarations & Unguarded Mutation",
      code: `// ❌ Anti-pattern: 15 lines of boilerplate and unprotected mutation
class Product {
  public id: number;
  public title: string;
  public price: number;

  constructor(id: number, title: string, price: number) {
    this.id = id;
    this.title = title;
    this.price = price;
  }
}

const p = new Product(1, "Sneakers", 120);
p.price = -50; // Negative price accepted! No validation!`,
      explanation:
        "Manually writing declarations and assignments triples constructor code size and leaves `price` open to invalid assignments like negative numbers.",
    },
    good: {
      title: "Clean Parameter Properties & Validated Accessor",
      code: `// ✅ Robust: Parameter properties with validated setter
class Product {
  private _price: number;

  constructor(
    public readonly id: number,
    public title: string,
    initialPrice: number
  ) {
    this._price = Math.max(0, initialPrice);
  }

  get price(): number {
    return this._price;
  }

  set price(newPrice: number) {
    if (newPrice < 0) throw new Error("Price cannot be negative");
    this._price = newPrice;
  }
}

const p = new Product(1, "Sneakers", 120);
// p.price = -50; // 💥 Throws validation error immediately!`,
      explanation:
        "Parameter properties eliminate field declaration boilerplate, while the `price` getter/setter pair enforces non-negative business rules.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Test Parameter Properties & Accessors",
    intro:
      "Run the UserAccount model below. Notice how parameter properties streamline construction and how getters and setters enforce validation:",
    starterCode: `// TS-19: Parameter Properties & Getters/Setters

class UserProfile {
  private _age: number;

  constructor(
    public readonly id: string,
    public username: string,
    initialAge: number,
    public role: "user" | "admin" = "user"
  ) {
    this._age = Math.max(0, initialAge);
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    if (value < 0 || value > 150) {
      console.log("Invalid age provided: " + value);
      return;
    }
    this._age = value;
    console.log("Updated age for " + this.username + " to " + value);
  }

  get profileBadge(): string {
    return this.username + " [" + this.role.toUpperCase() + ", " + this.age + "yo]";
  }
}

const dev = new UserProfile("usr_402", "LinusTorvalds", 54, "admin");
console.log(dev.profileBadge);

// Testing validated setter:
dev.age = 55;
dev.age = -10; // Rejected by setter!
console.log("Current age:", dev.age);
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "What happens when a class defines a getter `get score(): number` but does NOT define a corresponding setter `set score`?",
      options: [
        "TypeScript infers the property as readonly, causing any assignment `obj.score = 10` to produce a compile error",
        "TypeScript automatically creates a default setter that allows arbitrary assignment",
        "A runtime SyntaxError is thrown by the JavaScript engine when instantiated",
        "The getter return type automatically becomes `any`",
      ],
      correctIndex: 0,
      explanation:
        "When an accessor has a getter but no matching setter, TypeScript automatically infers the property as `readonly`. Any attempt to assign to it is rejected at compile time.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. Parameter Property Shorthand",
        desc: "Prefix constructor parameters with access modifiers to declare and assign fields in one step.",
      },
      {
        title: "2. Readonly Getters",
        desc: "A getter without a setter creates a safe, computed, read-only property.",
      },
      {
        title: "3. Validated Setters",
        desc: "Use setters to intercept mutations and enforce business rules before updating private fields.",
      },
      {
        title: "4. Type Synchronization",
        desc: "Getter return types and setter value parameters are checked for strict compatibility.",
      },
    ],
    nextLessonPreview: {
      title: "TS-20: Abstract Classes & Interface Implementation",
      desc: "Compare abstract classes to interfaces, enforce structural contracts, and master the template method pattern.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-20: Abstract Classes & Interface Implementation
// ────────────────────────────────────────────────────────────────────────────
export const TS20_CONTENT: StandardLessonContent = {
  slug: "ts20-abstract-classes",
  code: "TS-20",
  title: "Abstract Classes & Interface Implementation",
  subtitle:
    "Enforce polymorphic contracts and provide shared base implementations with abstract classes and implements.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Pre-Cast Foundation: Blueprints with Real Plumbing",
    bigPicture:
      "When building a skyscraper, architects use two different kinds of specifications. An `interface` is like an architectural inspection checklist on paper: it lists required dimensions, fire safety requirements, and exit layouts, but it has zero physical substance and disappears into a drawer once construction begins. An `abstract class` is like a pre-cast concrete foundation: it provides real load-bearing columns, water piping, and electrical conduits (shared concrete implementation) that all floors inherit, while declaring designated empty spaces (`abstract` methods) that each custom department must build out itself. In TypeScript, choosing between an interface and an abstract class comes down to whether your derived types only share a shape contract, or need to inherit real executable code.",
    breakdownTitle: "Key Dimensions of Abstract Classes vs Interfaces:",
    breakdownItems: [
      {
        title: "1. No Direct Instantiation",
        desc: "Abstract classes cannot be instantiated with `new`. They exist solely as base blueprints for subclasses.",
      },
      {
        title: "2. Abstract Methods as Contracts",
        desc: "Declared without a body in the base class (`abstract execute(): void;`), compelling derived classes to implement them.",
      },
      {
        title: "3. Concrete Implementation Sharing",
        desc: "Unlike interfaces, abstract classes can contain fully functioning helper methods, shared state, and lifecycle flows.",
      },
      {
        title: "4. The 'implements' Keyword",
        desc: "Classes use `implements MyInterface` to commit to a pure structural contract with zero runtime code bloat.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Abstract Classes, Methods, and Implements",
    intro: "Learn how to architect polymorphic hierarchies and enforce structural contracts:",
    cards: [
      {
        number: "01",
        tag: "Blueprint",
        title: "abstract class",
        description:
          "Defines base state and method signatures that subclasses must fulfill before direct instantiation is permitted.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Template",
        title: "Template Method Pattern",
        description:
          "The abstract base coordinates the overall algorithm workflow while delegating specific steps to abstract child methods.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Contract",
        title: "implements Interface",
        description:
          "Guarantees that a class satisfies a type signature without inheriting any implementation baggage or runtime overhead.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Blueprint Architecture Rule",
      content:
        "Use `interface` for pure structural contracts and data transfer shapes with zero runtime footprint; use `abstract class` when child classes must share executable methods, state, or structured workflow logic.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Building Abstract Services",
    intro: "Observe how abstract classes enforce method implementation across subclasses:",
    points: [
      {
        title: "1. Declaring an Abstract Class",
        content:
          "Prefix the class with `abstract`. TypeScript prevents anyone from instantiating it directly:",
        codeSnippet: `abstract class BasePaymentProcessor {
  constructor(public currency: string) {}

  // Abstract method: MUST be implemented by subclasses
  abstract processPayment(amount: number): boolean;

  // Concrete method: shared by ALL subclasses
  logTransaction(amount: number, status: string): void {
    console.log(\`[\${this.currency}] \$\${amount} - \${status}\`);
  }
}

// const p = new BasePaymentProcessor("USD");
// ❌ COMPILE ERROR: Cannot create an instance of an abstract class.`,
      },
      {
        title: "2. Concrete Subclass Implementation",
        content:
          "Subclasses extend the abstract class and provide the missing method bodies:",
        codeSnippet: `class StripeProcessor extends BasePaymentProcessor {
  processPayment(amount: number): boolean {
    // Concrete Stripe API logic
    this.logTransaction(amount, "Stripe charge approved");
    return true;
  }
}

class PayPalProcessor extends BasePaymentProcessor {
  processPayment(amount: number): boolean {
    // Concrete PayPal logic
    this.logTransaction(amount, "PayPal payment captured");
    return true;
  }
}

// ✅ Subclasses instantiate cleanly:
const stripe = new StripeProcessor("USD");
stripe.processPayment(150);`,
      },
      {
        title: "3. The Template Method Pattern",
        content:
          "The abstract base defines the overarching execution pipeline while delegating specific hook steps:",
        codeSnippet: `abstract class DataExporter {
  // Template method coordinating the workflow:
  public export(): void {
    this.connect();
    const data = this.fetchData();
    this.formatAndSend(data);
    this.disconnect();
  }

  protected abstract fetchData(): string[];
  protected abstract formatAndSend(data: string[]): void;

  private connect(): void { console.log("Database connected"); }
  private disconnect(): void { console.log("Database closed"); }
}`,
      },
      {
        title: "4. Implementing Interfaces (implements)",
        content:
          "Classes can also commit to pure interfaces without any class inheritance:",
        codeSnippet: `interface Loggable {
  log(msg: string): void;
}

interface Disposable {
  dispose(): void;
}

// A class can implement multiple interfaces:
class ResourceManager implements Loggable, Disposable {
  log(msg: string): void { console.log("[LOG]:", msg); }
  dispose(): void { console.log("Cleaning up resources..."); }
}`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Duplicating Common Workflows Across Independent Classes",
      code: `// ❌ Anti-pattern: 5 classes duplicating identical connection & retry boilerplate
class UserCsvExporter {
  export() {
    console.log("Connecting to DB..."); // Duplicated!
    console.log("Fetching users...");
    console.log("Formatting CSV...");
    console.log("Disconnecting DB..."); // Duplicated!
  }
}

class OrderCsvExporter {
  export() {
    console.log("Connecting to DB..."); // Duplicated!
    console.log("Fetching orders...");
    console.log("Formatting CSV...");
    console.log("Disconnecting DB..."); // Duplicated!
  }
}`,
      explanation:
        "Duplicating shared lifecycle steps across separate classes violates DRY and leads to subtle bugs when connection handling logic changes.",
    },
    good: {
      title: "Abstract Base Class with the Template Method Pattern",
      code: `// ✅ Robust: Abstract base unifies the lifecycle, delegating only payload logic
abstract class BaseCsvExporter {
  public export(): void {
    console.log("Connecting to DB...");
    const data = this.fetchRows();
    console.log("Formatting and writing " + data.length + " CSV rows...");
    console.log("Disconnecting DB...");
  }

  protected abstract fetchRows(): string[];
}

class UserCsvExporter extends BaseCsvExporter {
  protected fetchRows(): string[] {
    return ["user_1,Alice", "user_2,Bob"];
  }
}

const exporter = new UserCsvExporter();
exporter.export();`,
      explanation:
        "The abstract class centralizes database connection and cleanup logic, leaving child classes focused solely on retrieving their specific domain records.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Test Abstract Classes & Polymorphism",
    intro:
      "Run the payment processor hierarchy below. Observe how the abstract class enforces the implementation of `charge` while sharing the `execute` pipeline:",
    starterCode: `// TS-20: Abstract Classes & Interface Implementation

abstract class PaymentGateway {
  constructor(public readonly merchantId: string) {}

  // Template method: orchestrates the transaction pipeline
  public executeTransaction(amount: number): boolean {
    console.log("Initializing transaction for merchant: " + this.merchantId);
    if (!this.authenticate()) {
      console.log("Authentication failed!");
      return false;
    }
    const success = this.charge(amount);
    if (success) {
      console.log("Transaction of $" + amount.toFixed(2) + " successfully completed.");
    }
    return success;
  }

  // Abstract hooks: MUST be defined by child gateways
  protected abstract authenticate(): boolean;
  protected abstract charge(amount: number): boolean;
}

class StripeGateway extends PaymentGateway {
  protected authenticate(): boolean {
    console.log("Stripe API key validated.");
    return true;
  }

  protected charge(amount: number): boolean {
    console.log("Stripe charged $" + amount + " via card token.");
    return true;
  }
}

class CryptoGateway extends PaymentGateway {
  protected authenticate(): boolean {
    console.log("Crypto wallet signature verified.");
    return true;
  }

  protected charge(amount: number): boolean {
    console.log("Broadcasted on-chain transaction for $" + amount);
    return true;
  }
}

const stripe = new StripeGateway("merch_stripe_88");
stripe.executeTransaction(199.95);

console.log("---");

const crypto = new CryptoGateway("0x99A418B");
crypto.executeTransaction(500.00);
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "What happens if code attempts to instantiate an abstract class directly using `const x = new MyAbstractClass()`?",
      options: [
        "TypeScript reports a compile-time error: Cannot create an instance of an abstract class",
        "JavaScript creates an empty object and assigns prototype methods",
        "A runtime TypeError is thrown by the JavaScript engine only in strict mode",
        "The constructor returns undefined silently",
      ],
      correctIndex: 0,
      explanation:
        "Abstract classes are blueprints designed exclusively for inheritance. TypeScript blocks direct instantiation via `new` with a compile-time error.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. Abstract Base Blueprint",
        desc: "Abstract classes cannot be instantiated directly and define required contracts for child classes.",
      },
      {
        title: "2. Template Method Pattern",
        desc: "Centralize overarching workflow logic in base classes while delegating specific steps to abstract hooks.",
      },
      {
        title: "3. Interface vs Abstract Class",
        desc: "Use interfaces for pure zero-runtime contracts; use abstract classes when sharing executable code and state.",
      },
      {
        title: "4. Multiple Interface Implementation",
        desc: "A class can implement multiple independent interfaces simultaneously via implements.",
      },
    ],
    nextLessonPreview: {
      title: "Stage 6: Advanced Types & Type Manipulation",
      desc: "Advance to Stage 6 to master indexed access types, mapped types, conditional types, and infer.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-21: Indexed Access & typeof Types
// ────────────────────────────────────────────────────────────────────────────
export const TS21_CONTENT: StandardLessonContent = {
  slug: "ts21-indexed-access-typeof",
  code: "TS-21",
  title: "Indexed Access & typeof Types",
  subtitle:
    "Extract property types dynamically with T[K], unpack array element unions with T[number], and generate types from runtime values via typeof.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Warehouse Scanner: Extracting & Deriving Truth",
    bigPicture:
      "Imagine managing a massive warehouse containing thousands of parts. Instead of hand-copying specifications onto separate paper forms every time you design a new module, you use a barcode scanner: aiming it at a box instantly pulls the exact blueprint and specifications from the master database (`T['details']['dimensions']`). Furthermore, if you already have a precision-engineered physical machine running smoothly on the factory floor (a concrete runtime JavaScript configuration object), a 3D laser scanner (`typeof realObject`) can scan it and generate its complete digital CAD model without manual typing. In TypeScript, Indexed Access types (`T[K]`) and type-level `typeof` act as this scanner, eliminating redundant type declarations by deriving truth directly from existing types and runtime constants.",
    breakdownTitle: "Key Capabilities of Type Introspection:",
    breakdownItems: [
      {
        title: "1. Indexed Access (T[K])",
        desc: "Query and extract nested member types directly from existing interfaces using bracket notation, preventing type drift.",
      },
      {
        title: "2. Array Element Unpacking (T[number])",
        desc: "Extract a union of all possible array or tuple element types using the [number] index signature.",
      },
      {
        title: "3. Type-Level typeof Operator",
        desc: "In type positions, typeof queries TypeScript's static engine to reverse-engineer a static type from a runtime value.",
      },
      {
        title: "4. The 'as const' Derivation Pattern",
        desc: "Pairing runtime arrays with 'as const' and '(typeof array)[number]' creates bulletproof literal unions with zero runtime boilerplate.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Looking Up and Deriving Types",
    intro: "Learn how to query types and generate static contracts from runtime values:",
    cards: [
      {
        number: "01",
        tag: "Lookup",
        title: "Indexed Access T[K]",
        description:
          "Drill into complex nested interfaces using bracket syntax to reuse deep property types without duplication.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Unpacking",
        title: "Array Element [number]",
        description:
          "Index arrays and tuples by [number] to extract the clean union of all item types contained within them.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Derivation",
        title: "typeof + as const",
        description:
          "Derive exact literal union types from runtime constant arrays, ensuring data and types never fall out of sync.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Single Source of Truth Rule",
      content:
        "Never declare redundant types that duplicate existing runtime data or nested interfaces. Use `T[K]` to extract nested types and `typeof value as const` to derive literal unions from runtime configurations.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Lookup and Derivation in Practice",
    intro: "Step through how TypeScript evaluates indexed access and typeof expressions:",
    points: [
      {
        title: "1. Deep Nested Property Lookup",
        content:
          "Instead of creating separate sub-interfaces for every nested object, drill in with bracket notation:",
        codeSnippet: `interface UserResponse {
  user: {
    id: string;
    profile: {
      avatarUrl: string;
      theme: "dark" | "light";
    };
  };
}

// Extract nested types directly:
type UserProfile = UserResponse["user"]["profile"]; // { avatarUrl: string; theme: "dark" | "light" }
type ThemePreference = UserResponse["user"]["profile"]["theme"]; // "dark" | "light"`,
      },
      {
        title: "2. Unpacking Arrays with [number]",
        content:
          "Index an array type by `number` to extract the union of its item types:",
        codeSnippet: `type StringOrNumList = (string | number)[];
type ListItem = StringOrNumList[number]; // string | number

interface Article {
  tags: string[];
}
type Tag = Article["tags"][number]; // string`,
      },
      {
        title: "3. Generating Types from Runtime Configs (typeof)",
        content:
          "When you have an authoritative configuration object, let TypeScript write its type for you:",
        codeSnippet: `const APP_CONFIG = {
  apiEndpoint: "https://api.learncraft.dev/v1",
  timeoutMs: 5000,
  features: {
    darkMode: true,
    betaQuiz: false,
  },
};

// Derive the static type:
type AppConfig = typeof APP_CONFIG;
/* Equivalent to:
{
  apiEndpoint: string;
  timeoutMs: number;
  features: { darkMode: boolean; betaQuiz: boolean; };
}
*/`,
      },
      {
        title: "4. The Golden Pattern: as const + (typeof array)[number]",
        content:
          "Define runtime arrays and derive exact string literal unions without duplicating code:",
        codeSnippet: `const ROLES = ["admin", "editor", "viewer"] as const;

// 1. typeof ROLES gives: readonly ["admin", "editor", "viewer"]
// 2. [number] extracts union of elements:
type Role = (typeof ROLES)[number]; 
// Result: "admin" | "editor" | "viewer"

function assignRole(role: Role) {
  console.log("Assigned role:", role);
}

assignRole("admin"); // ✅ Valid
// assignRole("superadmin"); // ❌ Compile error!`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Duplicating Unions and Runtime Arrays Manually",
      code: `// ❌ Loose pattern: Dual declaration that inevitably drifts out of sync
type Status = "draft" | "review" | "published" | "archived";

// Developer creates array for dropdown options:
const STATUS_OPTIONS = ["draft", "review", "published"]; // Forgot "archived"!

function isStatus(val: string): val is Status {
  return STATUS_OPTIONS.includes(val); // 💥 Subtle bug: "archived" is rejected at runtime!
}`,
      explanation:
        "Declaring both a type union and a runtime array manually creates two independent sources of truth. Over time, someone will update one and forget the other.",
    },
    good: {
      title: "Deriving Union Directly from as const Array",
      code: `// ✅ Robust: Single source of truth using as const + typeof [number]
const STATUS_OPTIONS = ["draft", "review", "published", "archived"] as const;

// Union is automatically derived from the runtime array:
type Status = (typeof STATUS_OPTIONS)[number];

function isStatus(val: string): val is Status {
  return (STATUS_OPTIONS as readonly string[]).includes(val);
}`,
      explanation:
        "The runtime array is the single source of truth. Adding `'deleted'` to `STATUS_OPTIONS` automatically updates the `Status` type across the entire application instantly.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Test Indexed Access & typeof",
    intro:
      "Run the configuration and role management system below. Observe how types are derived directly from runtime definitions:",
    starterCode: `// TS-21: Indexed Access & typeof Types

// 1. The as const + typeof pattern for permissions
const PERMISSIONS = ["read:users", "write:users", "delete:users", "admin:all"] as const;
type Permission = (typeof PERMISSIONS)[number];

// 2. Deriving types from an authoritative system configuration
const SYSTEM_SETTINGS = {
  env: "production",
  port: 8080,
  database: {
    host: "postgres.internal",
    port: 5432,
    ssl: true,
  },
  allowedOrigins: ["https://learncraft.dev", "https://api.learncraft.dev"] as const,
} as const;

type SystemSettings = typeof SYSTEM_SETTINGS;
type DatabaseSettings = SystemSettings["database"];
type AllowedOrigin = SystemSettings["allowedOrigins"][number];

function checkPermission(p: Permission): void {
  console.log("Checking security clearance for:", p);
}

checkPermission("write:users");
console.log("Database Host:", SYSTEM_SETTINGS.database.host);
console.log("Allowed Origins:", SYSTEM_SETTINGS.allowedOrigins.join(", "));
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "Given `const THEMES = ['light', 'dark', 'system'] as const;`, what type does `type AppTheme = (typeof THEMES)[number];` produce?",
      options: [
        "`'light' | 'dark' | 'system'`",
        "`string[]`",
        "`number`",
        "`['light', 'dark', 'system']`",
      ],
      correctIndex: 0,
      explanation:
        "Because `THEMES` is annotated with `as const`, `typeof THEMES` yields a readonly tuple of literal types. Indexing by `[number]` extracts the union of all element types: `'light' | 'dark' | 'system'`.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. Indexed Access (T[K])",
        desc: "Query property types on objects directly using bracket syntax without duplicate interfaces.",
      },
      {
        title: "2. Array Unpacking (T[number])",
        desc: "Extract a clean union of all items in an array or tuple by indexing with [number].",
      },
      {
        title: "3. Type-Level typeof",
        desc: "Reverse-engineer compile-time types directly from existing runtime JavaScript objects.",
      },
      {
        title: "4. as const Derivation",
        desc: "Combine as const with (typeof arr)[number] for single-source-of-truth literal unions.",
      },
    ],
    nextLessonPreview: {
      title: "TS-22: Conditional Types & infer",
      desc: "Master type-level ternary branching (T extends U ? X : Y) and pattern matching with infer.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-22: Conditional Types & infer
// ────────────────────────────────────────────────────────────────────────────
export const TS22_CONTENT: StandardLessonContent = {
  slug: "ts22-conditional-types-infer",
  code: "TS-22",
  title: "Conditional Types & infer",
  subtitle:
    "Master type-level ternary branching (T extends U ? X : Y), distributive unions, and structural pattern matching with infer.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Airport Baggage Scanner: Decision-Making at the Type Level",
    bigPicture:
      "At an international airport, an automated conveyor system inspects every piece of luggage: if the item exceeds 50 pounds, it is routed to heavy cargo; otherwise, it moves to the passenger flight belt. This is conditional logic: `Weight extends Heavy ? CargoHold : OverheadBin`. Now imagine an X-Ray scanner on that belt: it looks through locked shipping boxes without opening them, inspecting their structural contents and extracting whatever is inside (`Box<infer Item>`). In TypeScript, Conditional Types bring this exact ternary logic to the compile-time type system: they allow types to branch dynamically (`T extends U ? X : Y`) and use the `infer` keyword to pattern-match and unpack inner types from Promises, arrays, and functions with mathematical precision.",
    breakdownTitle: "Anatomy of Conditional Meta-Programming:",
    breakdownItems: [
      {
        title: "1. Type Ternaries (T extends U ? X : Y)",
        desc: "Evaluate assignability at compile time to produce different type results based on input types.",
      },
      {
        title: "2. Distributive Conditional Types",
        desc: "When a naked type parameter T is a union, TypeScript automatically distributes the test over each union member.",
      },
      {
        title: "3. Pattern Matching with 'infer'",
        desc: "Declares a temporary type variable in the condition's extends clause to capture and extract nested types.",
      },
      {
        title: "4. Container Unwrapping",
        desc: "Effortlessly unpack Promises (`Awaited<T>`), Array elements, and Function return types (`ReturnType<T>`).",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Branching, Distribution, and Extraction",
    intro: "Learn how conditional types evaluate assignability and extract inner signatures:",
    cards: [
      {
        number: "01",
        tag: "Branching",
        title: "Ternary Logic",
        description:
          "T extends U ? X : Y tests whether T is assignable to U, picking type X or Y dynamically.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Distribution",
        title: "Union Distribution",
        description:
          "Conditions distribute over unions: (A | B) extends U ? X : Y evaluates A and B independently.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Extraction",
        title: "infer Keyword",
        description:
          "Introduces a deduced type variable inside the condition to unpack internal wrapped types.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Conditional Extraction Rule",
      content:
        "Use conditional types with `infer` to peel back wrappers (`Promise<T>`, `Array<T>`, `(...args) => T`) instead of manually maintaining separate inner and outer types.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Conditional Types in Action",
    intro: "Follow how the compiler evaluates conditional types and resolves `infer`:",
    points: [
      {
        title: "1. Basic Type-Level Ternary",
        content:
          "Test assignability and pick a type based on the outcome:",
        codeSnippet: `type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // true
type B = IsString<42>;       // false
type C = IsString<boolean>;  // false`,
      },
      {
        title: "2. Distributive Unions in Action",
        content:
          "When a naked type parameter is a union, the condition tests each member individually:",
        codeSnippet: `type NonNullableType<T> = T extends null | undefined ? never : T;

// Evaluates as:
// (string extends null | undefined ? never : string) |
// (null extends null | undefined ? never : null)
type Sanitized = NonNullableType<string | null>; // Resolves to: string!`,
      },
      {
        title: "3. Unpacking Types with infer",
        content:
          "Use `infer` to let TypeScript deduce whatever type is inside a container:",
        codeSnippet: `type Flatten<T> = T extends (infer Element)[] ? Element : T;

type StrArr = Flatten<string[]>; // Inferred as: string
type Num = Flatten<number>;      // Not an array, so returned as: number

// Unpacking Promise resolutions:
type UnpackPromise<T> = T extends Promise<infer Result> ? Result : T;
type ResolvedUser = UnpackPromise<Promise<{ id: string; name: string }>>;
// Evaluates to: { id: string; name: string }`,
      },
      {
        title: "4. Extracting Function Return Types",
        content:
          "This is how TypeScript's native `ReturnType<T>` utility is implemented:",
        codeSnippet: `type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function calculateScore(): number {
  return 98.5;
}

type ScoreResult = MyReturnType<typeof calculateScore>; // number`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Unsafe Type Assertions on Unwrapped Values",
      code: `// ❌ Loose pattern: Forcing types with assertions after unwrapping
async function loadData() {
  return { id: 101, username: "dev_sarah" };
}

// Inexperienced dev forces return type manually:
type User = { id: number; username: string };
const user = (await loadData()) as User; // If loadData changes, this assertion hides the bug!`,
      explanation:
        "Using manual type assertions (`as User`) masks API drift. If `loadData` is refactored to return an `email` field, the assertion silently pretends everything is fine until runtime.",
    },
    good: {
      title: "Automated Type Derivation with Awaited & ReturnType",
      code: `// ✅ Robust: Compiler calculates the unwrapped type automatically
async function loadData() {
  return { id: 101, username: "dev_sarah", email: "sarah@learncraft.dev" };
}

// Automatically derived directly from the function implementation:
type User = Awaited<ReturnType<typeof loadData>>;

const user: User = await loadData();
console.log(user.email); // ✅ 100% synchronized, zero assertions needed!`,
      explanation:
        "Combining `Awaited<ReturnType<typeof fn>>` ensures that whenever the function's implementation changes, the resulting type updates automatically with zero chance of drift.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Test Conditional Types & infer",
    intro:
      "Run the type deduction engine below. Observe how conditional types unpack arrays, functions, and promises:",
    starterCode: `// TS-22: Conditional Types & infer

// 1. Unpacking generic containers
type Unwrap<T> = 
  T extends Promise<infer Inner> ? Unwrap<Inner> :
  T extends (infer Item)[] ? Item :
  T;

type A = Unwrap<Promise<string>>;          // string
type B = Unwrap<number[]>;                  // number
type C = Unwrap<Promise<Promise<boolean>>>; // boolean (recursive unpacking!)

// 2. Extracting first argument of a function
type FirstParameter<T> = T extends (first: infer P, ...rest: any[]) => any ? P : never;

function registerUser(email: string, age: number, role: string) {
  return { email, age, role };
}

type RegisterEmail = FirstParameter<typeof registerUser>; // string

console.log("Unwrapped types computed at compile time.");
console.log("RegisterEmail type verified as string.");
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "What is the role of the `infer` keyword in the conditional type `type ElementType<T> = T extends (infer E)[] ? E : T;`?",
      options: [
        "It declares a fresh type variable `E` that TypeScript deduces from the array's element type",
        "It forces `E` to be converted to `any` at runtime",
        "It tells TypeScript to run an asynchronous await on `T`",
        "It creates a constructor parameter property inside `T`",
      ],
      correctIndex: 0,
      explanation:
        "`infer` introduces a pattern-matching type variable (`E`) within the `extends` clause. If `T` matches the pattern of an array, TypeScript deduces and extracts whatever type is inside `E`.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. Type-Level Ternaries",
        desc: "T extends U ? X : Y tests assignability and branches dynamically at compile time.",
      },
      {
        title: "2. Distributive Unions",
        desc: "Naked type parameters distribute conditional logic across every member of a union.",
      },
      {
        title: "3. Pattern Matching with infer",
        desc: "Capture and extract nested types inside containers like Promise<T> and arrays.",
      },
      {
        title: "4. Single-Source Synchronization",
        desc: "Derive unwrapped payload types directly from functions without manual assertions.",
      },
    ],
    nextLessonPreview: {
      title: "TS-23: Mapped Types & Template Literals",
      desc: "Transform object shapes with [K in keyof T], remap keys with 'as', and construct string types with template literals.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-23: Mapped Types & Template Literals
// ────────────────────────────────────────────────────────────────────────────
export const TS23_CONTENT: StandardLessonContent = {
  slug: "ts23-mapped-template-types",
  code: "TS-23",
  title: "Mapped Types & Template Literals",
  subtitle:
    "Transform object keys with [K in keyof T], remap property names using 'as', and construct string types with template literals.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Industrial Stamping Press: Batch-Transforming Types",
    bigPicture:
      "In manufacturing, crafting 50 distinct metal brackets by hand with a hammer is slow and error-prone. Instead, factories use an industrial stamping press: you feed in a master blueprint (`keyof User`), and the machine stamps out an entire matching set of components in a single pass (`[K in keyof T]`), applying a protective coating (`readonly`) or adding quick-release latches (`?`). Right beside it, a computer-controlled laser etcher uses template literals (`on${Capitalize<Event>}`) to engrave standardized, typo-free labels onto every part. In TypeScript, Mapped Types and Template Literal Types provide this exact automated assembly line: they let you transform entire interfaces en masse and construct strictly typed string domain models with zero manual duplication.",
    breakdownTitle: "The Toolkit of Mapped Metaprogramming:",
    breakdownItems: [
      {
        title: "1. The [K in keyof T] Mapping Loop",
        desc: "Iterate over every property of an interface to generate a new object type with modified values or attributes.",
      },
      {
        title: "2. Adding & Stripping Modifiers (+ / -)",
        desc: "Add or remove readonly (`+readonly`, `-readonly`) and optionality (`+?`, `-?`) across all fields simultaneously.",
      },
      {
        title: "3. Key Remapping with 'as'",
        desc: "Filter, rename, or reformat property keys during iteration (e.g. converting `name` to `getName`).",
      },
      {
        title: "4. Template Literal Types",
        desc: "Combine string literal unions to create and validate complex string patterns like event names and routes.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Iteration, Modifiers, and String Types",
    intro: "Learn the syntax and operators that power type transformations:",
    cards: [
      {
        number: "01",
        tag: "Iteration",
        title: "Mapping Loop [K in keyof T]",
        description:
          "Constructs a new type by applying a type transformation to every property key of type T.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Modifiers",
        title: "Modifier Controls (+ / -)",
        description:
          "Explicitly add or strip optionality (-?) and immutability (+readonly) across all fields.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Remapping",
        title: "Key Remapping via as",
        description:
          "Transform property keys using template literals and string helpers like Capitalize and Uppercase.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Systematic Transformation Rule",
      content:
        "Never manually duplicate interfaces just to change mutability, optionality, or method prefixes. Write a mapped type to transform the authoritative shape systematically.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Building Mapped Types",
    intro: "Follow how mapped types and template literals reshape data structures:",
    points: [
      {
        title: "1. Basic Mapped Type",
        content:
          "Iterate over keys and map every property to a new type:",
        codeSnippet: `interface User {
  id: number;
  name: string;
  email: string;
}

// Convert all property types to boolean flags:
type UserFlags = {
  [K in keyof User]: boolean;
};
/* Result:
{
  id: boolean;
  name: boolean;
  email: boolean;
}
*/`,
      },
      {
        title: "2. Controlling Modifiers (+?, -?, readonly)",
        content:
          "Add or strip modifiers across all fields:",
        codeSnippet: `// Make all properties optional:
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

// Strip optionality to make all fields strictly required:
type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};

// Make all fields deeply immutable:
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};`,
      },
      {
        title: "3. Key Remapping with 'as'",
        content:
          "Use the `as` clause to rename property keys during mapping:",
        codeSnippet: `interface State {
  user: string;
  theme: string;
}

// Automatically generate getter methods:
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type StateGetters = Getters<State>;
/* Result:
{
  getUser: () => string;
  getTheme: () => string;
}
*/`,
      },
      {
        title: "4. Template Literal Unions",
        content:
          "Template literals compute all permutations when combined with string unions:",
        codeSnippet: `type HttpMethod = "GET" | "POST" | "DELETE";
type Endpoint = "/users" | "/products";

type ApiRoute = \`\${HttpMethod} \${Endpoint}\`;
// Result:
// "GET /users" | "GET /products" | "POST /users" | "POST /products" | "DELETE /users" | "DELETE /products"`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Duplicating Interfaces for Every Mutation State",
      code: `// ❌ Anti-pattern: 4 duplicate interfaces that drift out of sync
interface Product {
  id: string;
  title: string;
  price: number;
}

interface PartialProduct {
  id?: string;
  title?: string;
  price?: number;
}

interface ReadonlyProduct {
  readonly id: string;
  readonly title: string;
  readonly price: number;
}`,
      explanation:
        "Manually maintaining `PartialProduct` and `ReadonlyProduct` creates massive maintenance overhead. Adding a new field to `Product` requires editing 3 different files.",
    },
    good: {
      title: "Clean Mapped Types Deriving Variations Automatically",
      code: `// ✅ Robust: Base interface is the single source of truth
interface Product {
  id: string;
  title: string;
  price: number;
}

type PartialProduct = Partial<Product>;
type ReadonlyProduct = Readonly<Product>;

// Custom mapped type generating event handlers:
type ProductEventHandlers = {
  [K in keyof Product as \`on\${Capitalize<string & K>}Change\`]?: (newValue: Product[K]) => void;
};`,
      explanation:
        "The base `Product` interface is the sole source of truth. All partial, readonly, and event handler variations are derived systematically with zero code duplication.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Test Mapped & Template Types",
    intro:
      "Run the state and event management system below. Observe how mapped types generate typed getter and setter pairs:",
    starterCode: `// TS-23: Mapped Types & Template Literals

interface AppState {
  userId: string;
  isLoggedIn: boolean;
  score: number;
}

// 1. Generate getter methods for every state property
type StateGetters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

// 2. Generate setter methods for every state property
type StateSetters<T> = {
  [K in keyof T as \`set\${Capitalize<string & K>}\`]: (value: T[K]) => void;
};

// 3. Combined store interface
type Store<T> = StateGetters<T> & StateSetters<T>;

const store: Store<AppState> = {
  getUserId: () => "usr_991",
  getIsLoggedIn: () => true,
  getScore: () => 1450,
  setUserId: (id) => console.log("Set userId:", id),
  setIsLoggedIn: (status) => console.log("Set isLoggedIn:", status),
  setScore: (score) => console.log("Set score:", score),
};

console.log("Logged in user:", store.getUserId());
store.setScore(1500);
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "What does the modifier `-?` do inside a mapped type like `{ [K in keyof T]-?: T[K] }`?",
      options: [
        "It removes the optional flag from all properties, making every property strictly required",
        "It removes all properties that have undefined values at runtime",
        "It makes all properties readonly",
        "It deletes all optional fields from the interface entirely",
      ],
      correctIndex: 0,
      explanation:
        "The `-?` syntax is a modifier removal operator. It strips the optional modifier (`?`) from every property in `T`, making every field strictly required.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. Mapped Type Loops",
        desc: "[K in keyof T] iterates over property keys to transform interfaces systematically.",
      },
      {
        title: "2. Modifier Operators",
        desc: "Use +readonly, -readonly, +?, and -? to batch-control property attributes.",
      },
      {
        title: "3. Key Remapping (as)",
        desc: "Transform property names using template literal types and Capitalize.",
      },
      {
        title: "4. Template Literal Permutations",
        desc: "Combine string unions to compute all permutations of route and event names.",
      },
    ],
    nextLessonPreview: {
      title: "TS-24: Built-in Utility Types",
      desc: "Master TypeScript's standard type toolkit: Partial, Required, Readonly, Record, Pick, Omit, and ReturnType.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-24: Built-in Utility Types
// ────────────────────────────────────────────────────────────────────────────
export const TS24_CONTENT: StandardLessonContent = {
  slug: "ts24-utility-types",
  code: "TS-24",
  title: "Built-in Utility Types",
  subtitle:
    "Master TypeScript's standard type toolkit: Partial, Required, Readonly, Record, Pick, Omit, Exclude, and ReturnType.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Swiss Army Knife: The Standard Type Toolkit",
    bigPicture:
      "When a professional chef enters a kitchen, they do not forge their own knives from raw iron every morning: they open a toolkit containing precision knives, peelers, spatulas, and shears designed specifically for standard tasks. In TypeScript, you do not need to invent custom mapped types or conditional ternary expressions for common daily needs. TypeScript ships with a built-in 'Swiss Army Knife' of standard utility types: `Partial` makes everything optional for PATCH endpoints; `Readonly` prevents accidental mutation; `Pick` and `Omit` slice data transfer objects; `Record` builds dictionary maps; and `ReturnType` introspects function outputs. Mastering these standard utilities lets you express complex transformations concisely and idioms that every TypeScript developer instantly recognizes.",
    breakdownTitle: "The Four Essential Utility Categories:",
    breakdownItems: [
      {
        title: "1. Mutation Utilities",
        desc: "Partial<T> (all optional), Required<T> (all required), and Readonly<T> (all immutable).",
      },
      {
        title: "2. Selection Utilities",
        desc: "Pick<T, K> (keep only specified keys) and Omit<T, K> (drop specified keys) for building DTOs.",
      },
      {
        title: "3. Dictionary Utilities",
        desc: "Record<Keys, Values> creates strictly typed key-value maps and lookup tables.",
      },
      {
        title: "4. Union & Function Utilities",
        desc: "Exclude<T, U> and Extract<T, U> filter unions; ReturnType<T> and Parameters<T> inspect functions.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: The Standard Transformation Arsenal",
    intro: "Learn the primary utility types and their architectural roles:",
    cards: [
      {
        number: "01",
        tag: "Mutators",
        title: "Partial & Readonly",
        description:
          "Transform property flags en masse for update payloads, query filters, and immutable state trees.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Selectors",
        title: "Pick vs Omit",
        description:
          "Surgically slice domain models into lightweight DTOs without declaring redundant interfaces.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Collections",
        title: "Record & ReturnType",
        description:
          "Construct type-safe key-value dictionaries and capture function return types automatically.",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Standard Toolkit Rule",
      content:
        "Always reach for TypeScript's built-in utility types (`Partial`, `Pick`, `Omit`, `Record`, `ReturnType`) before building custom mapped types or resorting to type assertions.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Applying Utilities in Domain Code",
    intro: "Follow how utilities replace hundreds of lines of redundant interface code:",
    points: [
      {
        title: "1. Partial & Readonly for Updates and Stores",
        content:
          "Create update payload shapes and freeze objects without repeating fields:",
        codeSnippet: `interface User {
  id: string;
  name: string;
  email: string;
}

// All fields optional for update operations:
type UpdateUserDto = Partial<User>; // { id?: string; name?: string; email?: string }

// All fields immutable for state stores:
type ImmutableUser = Readonly<User>;`,
      },
      {
        title: "2. Pick vs Omit for DTOs",
        content:
          "Choose whether to include a whitelist or remove a blacklist of properties:",
        codeSnippet: `interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
}

// Whitelist only fields needed on the homepage card:
type ArticleCard = Pick<Article, "id" | "title" | "createdAt">;

// Blacklist internal fields for client creation payload:
type CreateArticleInput = Omit<Article, "id" | "createdAt">;`,
      },
      {
        title: "3. Type-Safe Dictionaries with Record",
        content:
          "Never use loose objects or `any` for key-value maps:",
        codeSnippet: `type UserRole = "admin" | "editor" | "viewer";

interface RolePermissions {
  canDelete: boolean;
  canEdit: boolean;
}

// Every key in UserRole MUST be present in the Record:
const ROLE_MATRIX: Record<UserRole, RolePermissions> = {
  admin: { canDelete: true, canEdit: true },
  editor: { canDelete: false, canEdit: true },
  viewer: { canDelete: false, canEdit: false },
};`,
      },
      {
        title: "4. Union Filtering with Exclude & Extract",
        content:
          "Exclude removes matching types from a union; Extract keeps only matching types:",
        codeSnippet: `type Status = "pending" | "active" | "suspended" | "deleted";

type ActiveStatus = Exclude<Status, "suspended" | "deleted">;
// Result: "pending" | "active"

type DangerStatus = Extract<Status, "deleted">;
// Result: "deleted"`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Code",
    bad: {
      title: "Duplicating Entities for API Inputs and DTOs",
      code: `// ❌ Anti-pattern: Duplicating fields across multiple DTO interfaces
interface UserEntity {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

// Developer re-types everything for registration:
interface RegisterDto {
  username: string;
  email: string;
  passwordHash: string;
}

// Developer re-types everything for profile view:
interface UserProfileDto {
  id: string;
  username: string;
  email: string;
}`,
      explanation:
        "When `UserEntity` changes (e.g. adding `avatarUrl`), developers must manually remember to update `RegisterDto` and `UserProfileDto`. If they forget, silent bugs occur.",
    },
    good: {
      title: "Composing Standard Utilities from the Master Entity",
      code: `// ✅ Robust: Single authoritative entity powering all DTOs
interface UserEntity {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

// Creation input omits auto-generated database columns:
type RegisterDto = Omit<UserEntity, "id" | "createdAt">;

// Public profile omits sensitive password hash:
type UserProfileDto = Omit<UserEntity, "passwordHash">;

// Update profile makes all profile fields optional:
type UpdateProfileDto = Partial<UserProfileDto>;`,
      explanation:
        "Every DTO is dynamically derived from `UserEntity`. Adding a new property to `UserEntity` immediately flows into all relevant DTOs automatically.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Test Built-in Utility Types",
    intro:
      "Run the product catalog management simulation below. Observe how utility types enforce consistent domain models:",
    starterCode: `// TS-24: Built-in Utility Types

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "electronics" | "clothing" | "books";
  isPublished: boolean;
}

// 1. DTO for updating an existing product (id is required, everything else optional)
type UpdateProductInput = Pick<Product, "id"> & Partial<Omit<Product, "id">>;

// 2. Public store listing preview
type ProductCard = Pick<Product, "id" | "name" | "price" | "category">;

// 3. Category count dictionary
type CategoryCounts = Record<Product["category"], number>;

const counts: CategoryCounts = {
  electronics: 142,
  clothing: 89,
  books: 320,
};

function applyProductUpdate(input: UpdateProductInput): void {
  console.log("Updating product " + input.id + " with fields:", Object.keys(input));
}

applyProductUpdate({
  id: "prod_401",
  price: 79.99,
  isPublished: true,
});

console.log("Electronics catalog count:", counts.electronics);
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "What is the difference between `Omit<T, K>` and `Exclude<T, U>`?",
      options: [
        "`Omit` removes properties from an object type, whereas `Exclude` removes members from a union type",
        "`Omit` is for arrays, whereas `Exclude` is for objects",
        "`Omit` is evaluated at runtime, whereas `Exclude` is compile-time",
        "`Exclude` is deprecated in favor of `Omit`",
      ],
      correctIndex: 0,
      explanation:
        "`Omit<T, K>` takes an object interface `T` and removes the keys `K`. `Exclude<T, U>` takes a union `T` (e.g. `'a' | 'b' | 'c'`) and removes matching variants `U`.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. Mutation Utilities",
        desc: "Use Partial, Required, and Readonly to batch-transform property mutability and optionality.",
      },
      {
        title: "2. Selection Utilities",
        desc: "Use Pick and Omit to derive lightweight DTOs directly from master domain models.",
      },
      {
        title: "3. Record for Dictionaries",
        desc: "Enforce exhaustive key-value mapping across strict literal union keys.",
      },
      {
        title: "4. Function Utilities",
        desc: "Extract return types and parameters using ReturnType and Parameters.",
      },
    ],
    nextLessonPreview: {
      title: "Stage 7: Modules, Configuration & Compilation",
      desc: "Advance to Stage 7 to master ES modules, import type, tsconfig.json compiler flags, strict mode, and declaration files (.d.ts).",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-25: ES Modules & Type-Only Imports
// ────────────────────────────────────────────────────────────────────────────
export const TS25_CONTENT: StandardLessonContent = {
  slug: "ts25-modules-type-imports",
  code: "TS-25",
  title: "ES Modules & Type-Only Imports",
  subtitle:
    "Master ES module imports and exports, type-only imports (import type), inline type qualifiers, and circular dependency avoidance.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Construction Blueprint: Erasable Pencil Marks vs Concrete Beams",
    bigPicture:
      "When building a modern skyscraper, crane operators only lift and transport physical materials: steel beams, concrete slabs, and heavy plumbing fixtures. The architect's layout marks, laser guidelines, and blueprint elevation notes are critical for the construction crew to position items accurately, but the crane never attempts to load pencil marks onto a flatbed truck. In JavaScript, runtime modules are the physical steel beams that the JS engine must load, execute, and link in memory. TypeScript types are the architect's pencil marks. If you import an interface using a standard import statement, bundlers and runtime engines may mistakenly treat it as a real runtime dependency, bundling empty files or deadlocking in circular dependency loops. `import type` and `export type` explicitly tell the compiler: 'This is purely a pencil mark. Strip this import completely from the emitted JavaScript!'",
    breakdownTitle: "Four Pillars of Modern TypeScript Modularity:",
    breakdownItems: [
      {
        title: "1. The Zero-Emission Guarantee",
        desc: "`import type` guarantees that the import statement is 100% eliminated from the compiled JavaScript output, generating zero runtime bundle overhead.",
      },
      {
        title: "2. Inline Type Qualifiers",
        desc: "Modern TypeScript allows mixing runtime values and compile-time types cleanly in a single line: `import { Service, type Config } from './service';`.",
      },
      {
        title: "3. Circular Dependency Elimination",
        desc: "Cycles between modules (A imports B, B imports A) crash at runtime. Replacing type dependencies with `import type` completely breaks the runtime evaluation cycle.",
      },
      {
        title: "4. Bundler & Tree-Shaking Hygiene",
        desc: "Prevents modern bundlers (Vite, Webpack, Rollup) from retaining ghost chunks or executing unintended module side-effects when importing types.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Type-Only Imports vs Value Imports",
    intro: "Understand how TypeScript compiles and optimizes imports across build boundaries:",
    cards: [
      {
        number: "01",
        tag: "Erasure",
        title: "import type Syntax",
        description:
          "Declares that every imported item from the module is strictly a type. Emits zero JavaScript lines into the final bundle.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Ergonomics",
        title: "Inline Type Qualifiers",
        description:
          "Enables importing concrete classes/functions alongside erased interfaces without duplicating import declarations across files.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Safety",
        title: "verbatimModuleSyntax",
        description:
          "Strict compiler setting that enforces unambiguous import statements, preventing subtle transpile-only tooling miscompilations.",
        color: "emerald",
      },
    ],
    rule: {
      title: "💡 The Module Erasure Law",
      content:
        "Whenever an imported identifier is exclusively used in type positions (type annotations, generic parameters, interface extensions), use `import type` or the inline `type` keyword. This guarantees zero runtime side-effects and completely eliminates circular dependency deadlocks.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: The Module Lifecycle",
    intro: "How TypeScript and JavaScript collaborate during module loading and execution:",
    points: [
      {
        title: "1. Static Analysis in Your Editor",
        content:
          "TypeScript resolves module specifiers and verifies exported contracts across your codebase. When you import an interface, autocomplete and type validation activate immediately.",
        codeSnippet: `// Type-only import: purely for compiler validation\nimport type { UserRole, Permission } from "./auth-types";\n\nconst adminRole: UserRole = "admin";`,
      },
      {
        title: "2. The Type-Strip Phase (tsc Compilation)",
        content:
          "During compilation, the TypeScript compiler checks every import. Statements marked with `import type` are completely removed. If a file only imported types, no `import` or `require` call is emitted in JavaScript.",
        codeSnippet: `// Source TypeScript:\nimport type { UserProfile } from "./user";\nimport { renderAvatar } from "./ui";\n\n// Emitted JavaScript:\nimport { renderAvatar } from "./ui";\n// Note: UserProfile import has vanished completely!`,
      },
      {
        title: "3. Inline Type Modifiers (TypeScript 4.5+)",
        content:
          "Before TS 4.5, importing both a class and an interface required two separate import statements from the same path. Inline modifiers allow co-locating values and types in a single statement cleanly.",
        codeSnippet: `// Single import combining value (AuthService) and erased type (SessionToken)\nimport { AuthService, type SessionToken } from "./services/auth";`,
      },
      {
        title: "4. Breaking Circular Module Deadlocks",
        content:
          "If Module A imports Module B, and Module B imports Module A, JavaScript evaluates one before the other finishes exports, resulting in `undefined` errors. Since `import type` is erased, no runtime module cycle exists in JavaScript.",
        codeSnippet: `// In Order.ts: uses Customer type\nimport type { Customer } from "./Customer"; // Erased at runtime! No cycle.\n\n// In Customer.ts: creates Order at runtime\nimport { createOrder } from "./Order"; // Clean single-direction runtime dependency!`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Idiomatic Imports",
    bad: {
      title: "Value Imports for Types Causing Circular Runtime Deadlocks",
      code: `// ❌ Anti-pattern: standard value import for a pure type\n// If order-service.ts imports user-service.ts at runtime, this causes a deadlock!\nimport { UserAccount } from "./user-service";\n\nexport function calculateDiscount(user: UserAccount): number {\n  return user.isVip ? 0.2 : 0;\n}`,
      explanation:
        "Using a standard import for `UserAccount` causes the bundler to emit a runtime `import` or `require` call. If `user-service.ts` also imports from this file, JavaScript deadlocks at runtime and crashes with `TypeError: Cannot read properties of undefined`.",
    },
    good: {
      title: "Explicit Type-Only Import with Zero Runtime Footprint",
      code: `// ✅ Idiomatic: explicit import type completely erased at build time\nimport type { UserAccount } from "./user-service";\n\nexport function calculateDiscount(user: UserAccount): number {\n  return user.isVip ? 0.2 : 0;\n}`,
      explanation:
        "Because `UserAccount` is imported with `import type`, the entire import statement vanishes from the emitted JavaScript. The runtime evaluation cycle is broken, and bundle size remains minimal.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Module Contracts & Type Modifiers",
    intro:
      "Explore how TypeScript distinguishes between runtime JavaScript values and compile-time types within modules:",
    starterCode: `// TS-25: ES Modules & Type-Only Imports
// Simulated module demonstrating value exports and erased type exports

// Simulated types module (erased at runtime)
type UserRole = "superadmin" | "manager" | "member";

interface AccountProfile {
  id: string;
  name: string;
  role: UserRole;
  isActive: boolean;
}

// Simulated runtime value module
class UserPermissionManager {
  private allowedRoles: Set<UserRole>;

  constructor(allowedRoles: UserRole[]) {
    this.allowedRoles = new Set(allowedRoles);
  }

  canAccessAdminPanel(account: AccountProfile): boolean {
    return account.isActive && this.allowedRoles.has(account.role);
  }
}

// Simulated consumer file:
// In a multi-file project, this would be:
// import { UserPermissionManager, type AccountProfile, type UserRole } from "./security";

const securityManager = new UserPermissionManager(["superadmin", "manager"]);

const staffMember: AccountProfile = {
  id: "usr-402",
  name: "Marcus Aurelius",
  role: "manager",
  isActive: true,
};

const hasAccess = securityManager.canAccessAdminPanel(staffMember);

console.log("Account:", staffMember.name);
console.log("Role:", staffMember.role);
console.log("Admin Panel Access Granted:", hasAccess);
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "What happens to the statement `import type { AppTheme } from './theme';` when compiled to JavaScript?",
      options: [
        "The import statement is completely erased, leaving zero runtime JavaScript code or module side-effects",
        "It compiles to `const { AppTheme } = require('./theme');`",
        "It imports the theme file lazily when window.onload fires",
        "It throws a runtime ReferenceError if AppTheme is not a concrete JavaScript class",
      ],
      correctIndex: 0,
      explanation:
        "`import type` guarantees complete compile-time erasure. The compiler verifies the type during development, but emits zero JavaScript code for that import in the final bundle.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. Zero Runtime Cost",
        desc: "import type is 100% eliminated by the compiler, leaving no trace in the emitted JavaScript output.",
      },
      {
        title: "2. Inline Type Qualifiers",
        desc: "Use `import { Value, type ErasedType }` to import runtime values alongside erased types cleanly on one line.",
      },
      {
        title: "3. Break Circular Cycles",
        desc: "Eliminate circular module evaluation deadlocks by converting type-only dependencies into import type.",
      },
      {
        title: "4. Bundler Optimization",
        desc: "Guarantees bundlers don't include unused files or run unwanted module side-effects for static types.",
      },
    ],
    nextLessonPreview: {
      title: "TS-26: tsconfig.json & Strict Flags",
      desc: "Master compiler configuration, strict mode flags (strictNullChecks, noImplicitAny), and compilation targets.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-26: tsconfig.json & Strict Flags
// ────────────────────────────────────────────────────────────────────────────
export const TS26_CONTENT: StandardLessonContent = {
  slug: "ts26-tsconfig-strict-mode",
  code: "TS-26",
  title: "tsconfig.json & Strict Flags",
  subtitle:
    "Master compiler configuration, strict mode flags (strictNullChecks, noImplicitAny), compilation targets, and module resolution.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Building Code: Safety Inspection Checklist vs Cutting Corners",
    bigPicture:
      "Imagine two construction companies building high-rise towers. Company A builds in an unregulated district where inspectors never check foundation depth, load capacities, or electrical grounding. The building goes up rapidly, but the first storm causes water leaks, electrical fires, and structural collapse. Company B follows the International Building Code with a mandatory 50-point inspection checklist: every structural pillar is load-tested, every wire is insulated, and emergency exits are certified. In TypeScript, `tsconfig.json` is your project's architectural building code. Setting `\"strict\": true` activates the ultimate safety inspection checklist: it forbids silent `any` types, bans unvetted `null` assignments, and forces your team to handle every possible edge case before code ever ships to production.",
    breakdownTitle: "Core Compiler Capabilities Governed by tsconfig.json:",
    breakdownItems: [
      {
        title: "1. The 'strict': true Master Switch",
        desc: "Enables the complete suite of strict checks, including strictNullChecks, noImplicitAny, strictFunctionTypes, and strictPropertyInitialization.",
      },
      {
        title: "2. strictNullChecks (The Billion-Dollar Shield)",
        desc: "Separates null and undefined into distinct types that cannot be assigned to strings, numbers, or objects without an explicit union.",
      },
      {
        title: "3. noImplicitAny",
        desc: "Prohibits variables and function parameters whose types cannot be inferred from silently falling back to the unsafe 'any' type.",
      },
      {
        title: "4. target vs module",
        desc: "target controls ECMAScript language syntax downleveling (e.g. ES2022), while module controls import/export emission format (NodeNext, ESNext).",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Compiler Flags & Type Soundness",
    intro: "Learn how tsconfig.json options safeguard your codebase against runtime errors:",
    cards: [
      {
        number: "01",
        tag: "Master Switch",
        title: "\"strict\": true",
        description:
          "Activates all fundamental type-checking flags at once, delivering maximum static verification and catching subtle regressions early.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Null Safety",
        title: "strictNullChecks",
        description:
          "Prevents 'Cannot read properties of undefined' crashes by making null and undefined distinct, non-assignable types.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Emission",
        title: "target & module",
        description:
          "Directs how modern TypeScript syntax compiles into standard JavaScript for Node.js or browser execution environments.",
        color: "emerald",
      },
    ],
    rule: {
      title: "💡 The Strict Mode Imperative",
      content:
        "Always start every new TypeScript project with `\"strict\": true`. Migrating a large existing codebase to strict mode later requires hundreds of refactoring edits, whereas starting in strict mode guarantees every single line of code is safe from the very first commit.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: The Strict Inspection Engine",
    intro: "How key compiler flags transform code verification at development time:",
    points: [
      {
        title: "1. Without strictNullChecks (Dangerous Loose Mode)",
        content:
          "In loose mode, null and undefined are valid values for EVERY type. Writing `let name: string = null` compiles without error. If you subsequently call `name.toLowerCase()`, your application crashes in production with a TypeError.",
        codeSnippet: `// ❌ In loose mode (strictNullChecks: false):
let user: { name: string } = null; // Silently accepted!
user.name.toUpperCase(); // Crashes with TypeError at runtime!`,
      },
      {
        title: "2. With strictNullChecks: true (Bulletproof Safety)",
        content:
          "Under strictNullChecks, null and undefined are concrete, distinct types. To allow a value to be missing, you must explicitly declare a union (`string | null`), forcing callers to narrow the value before accessing properties.",
        codeSnippet: `// ✅ Under strictNullChecks: true:
let user: { name: string } | null = null;
// user.name; // Compile error: 'user' is possibly 'null'!

if (user !== null) {
  console.log(user.name.toUpperCase()); // Safe! Narrowed to { name: string }
}`,
      },
      {
        title: "3. The noImplicitAny Protection",
        content:
          "Without this flag, function parameters without type annotations silently fall back to `any`, effectively turning off type checking for that variable. `noImplicitAny` forces explicit contracts.",
        codeSnippet: `// ❌ Under noImplicitAny: false:
function calculate(x) { return x * 2; } // x is silently 'any'

// ✅ Under noImplicitAny: true:
// Error: Parameter 'x' implicitly has an 'any' type.
function calculate(x: number): number { return x * 2; }`,
      },
      {
        title: "4. noUncheckedIndexedAccess (The Pro Flag)",
        content:
          "By default, indexing an array `arr[0]` produces type `T`, even if the array is empty! Enabling `noUncheckedIndexedAccess` changes the type to `T | undefined`, forcing you to verify the element actually exists.",
        codeSnippet: `// With noUncheckedIndexedAccess: true:
const items: string[] = [];
const first = items[0]; // Type is: string | undefined (not string!)

if (first !== undefined) {
  console.log(first.toUpperCase());
}`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Configuration",
    bad: {
      title: "Loose tsconfig with Loose Null and Implicit Any Checks",
      code: `// ❌ Dangerous tsconfig.json configuration
{
  "compilerOptions": {
    "target": "ES5",
    "strict": false,
    "noImplicitAny": false,
    "strictNullChecks": false
  }
}`,
      explanation:
        "Disabling strict mode strips away TypeScript's core guarantees. Developers can pass `null` anywhere, function parameters silently degrade to `any`, and runtime crashes slip right past the compiler into production.",
    },
    good: {
      title: "Production-Grade Strict tsconfig.json Configuration",
      code: `// ✅ Production-grade modern tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true
  }
}`,
      explanation:
        "Setting `\"strict\": true` activates the complete family of strict type checks. Adding `noUncheckedIndexedAccess` provides ultimate defense against index-out-of-bounds runtime errors.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Strict Type Safety & Null Defense",
    intro:
      "Practice writing code that complies with strict mode checks, handling nullable values and optional records safely:",
    starterCode: `// TS-26: tsconfig.json & Strict Flags
// Demonstrating strict mode patterns (strictNullChecks & noImplicitAny)

interface UserProfile {
  id: string;
  displayName: string;
  bio?: string;
  phoneNumber: string | null;
}

function formatUserContact(profile: UserProfile): string {
  // 1. Safe handling of nullable phoneNumber (strictNullChecks)
  let contactInfo: string;
  if (profile.phoneNumber !== null) {
    contactInfo = "Phone: " + profile.phoneNumber;
  } else {
    contactInfo = "No phone number provided";
  }

  // 2. Safe handling of optional bio with nullish coalescing
  const userBio = profile.bio ?? "Member has not written a bio yet.";

  return profile.displayName + " | " + contactInfo + " | " + userBio;
}

// 3. Simulating safe dictionary lookup (noUncheckedIndexedAccess)
const userDirectory: Record<string, UserProfile> = {
  "user-1": {
    id: "user-1",
    displayName: "Ada Lovelace",
    bio: "First computer programmer",
    phoneNumber: "+1-555-0192",
  },
};

const queryId = "user-1";
const foundUser = userDirectory[queryId]; // string | undefined under strict checks

if (foundUser !== undefined) {
  console.log("Found User:", formatUserContact(foundUser));
} else {
  console.log("User not found in directory.");
}
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "Under `\"strictNullChecks\": true`, what happens if you assign `null` to a variable declared as `let title: string`?",
      options: [
        "TypeScript reports a compile-time error: Type 'null' is not assignable to type 'string'",
        "The assignment succeeds without error because null is a subtype of string in all modes",
        "The variable title is automatically coerced to an empty string ''",
        "JavaScript throws a runtime SyntaxError during compilation",
      ],
      correctIndex: 0,
      explanation:
        "Under `strictNullChecks`, `null` and `undefined` are independent types. They cannot be assigned to `string`, `number`, or other concrete types unless explicitly declared as a union (`string | null`).",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. The strict Umbrella",
        desc: "\"strict\": true turns on noImplicitAny, strictNullChecks, and other critical verification flags in one go.",
      },
      {
        title: "2. The Null Defense",
        desc: "strictNullChecks eliminates the 'billion-dollar mistake' by requiring explicit null unions and narrowing.",
      },
      {
        title: "3. noImplicitAny Requirement",
        desc: "Prevents parameters from silently decaying to any, ensuring complete type coverage across functions.",
      },
      {
        title: "4. target vs module",
        desc: "target defines the JavaScript version syntax emitted; module defines the import/export module format.",
      },
    ],
    nextLessonPreview: {
      title: "TS-27: Declaration Files & Type Erasure",
      desc: "Master declaration files (.d.ts), ambient types (declare), DefinitelyTyped (@types), and runtime type erasure.",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TS-27: Declaration Files & Type Erasure
// ────────────────────────────────────────────────────────────────────────────
export const TS27_CONTENT: StandardLessonContent = {
  slug: "ts27-declarations-type-erasure",
  code: "TS-27",
  title: "Declaration Files & Type Erasure",
  subtitle:
    "Master declaration files (.d.ts), ambient types (declare), DefinitelyTyped (@types), and runtime type erasure.",
  sections: TYPESCRIPT_SECTIONS,
  part1: {
    title: "The Passport Visa Stamp: Describing Reality Without Creating It",
    bigPicture:
      "When you travel internationally, border control stamps a visa into your passport. The visa stamp does not build the hotel you stay in, nor does it lay the railroad tracks you ride on—it simply describes who you are, what permissions you have, and which borders you are authorized to cross. In TypeScript, `.d.ts` declaration files are that visa stamp. When your project consumes an external JavaScript library (such as Lodash, Stripe, or a browser API) that was written without TypeScript, TypeScript has no native way to know what functions or properties exist. A `.d.ts` declaration file uses ambient `declare` statements to describe the library's shapes, parameter types, and return contracts for the compiler—without emitting a single byte of executable JavaScript code.",
    breakdownTitle: "Four Core Pillars of Type Declarations and Erasure:",
    breakdownItems: [
      {
        title: "1. Declaration Files (.d.ts)",
        desc: "Pure type specification files containing zero runtime JavaScript executable code. They provide type information across package boundaries.",
      },
      {
        title: "2. The 'declare' Keyword",
        desc: "Promises the TypeScript compiler that a variable, function, or global object will exist in the runtime environment (injected by CDN, browser, or bundler).",
      },
      {
        title: "3. DefinitelyTyped & @types",
        desc: "The massive community-maintained repository of .d.ts declaration packages providing type support for existing JavaScript npm libraries.",
      },
      {
        title: "4. The Type Erasure Principle",
        desc: "TypeScript interfaces, type aliases, and type annotations disappear 100% at compile time. Only standard JavaScript executable code remains.",
      },
    ],
  },
  part2: {
    title: "Core Mechanics: Ambient Declarations & Type Erasure",
    intro: "Learn how declaration files bridge JavaScript libraries and TypeScript projects:",
    cards: [
      {
        number: "01",
        tag: "Ambient Types",
        title: ".d.ts Files",
        description:
          "Provide compile-time type descriptions for plain JavaScript libraries, enabling autocomplete, validation, and refactoring.",
        color: "purple",
      },
      {
        number: "02",
        tag: "Environment",
        title: "The declare Keyword",
        description:
          "Informs TypeScript of globally injected runtime variables (window globals, process.env, CDN scripts) without generating code.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Performance",
        title: "Pure Type Erasure",
        description:
          "Guarantees that TypeScript types impose zero runtime memory overhead or execution slowdown in production.",
        color: "emerald",
      },
    ],
    rule: {
      title: "💡 The Declaration Boundary Rule",
      content:
        "Never write executable logic inside a `.d.ts` declaration file! Declaration files only contain type annotations, `declare` statements, interfaces, and type aliases. Any runtime JavaScript code placed inside a `.d.ts` file is ignored or invalid.",
    },
  },
  part3: {
    title: "Step-by-Step Mental Model: Ambient Types to Runtime Erasure",
    intro: "How ambient declarations provide compile-time safety for runtime JavaScript:",
    points: [
      {
        title: "1. Ambient Global Variables with 'declare'",
        content:
          "When a third-party analytics script or bundler injects a global variable onto `window`, TypeScript doesn't know it exists and flags an error. The `declare` keyword tells TypeScript: 'Trust me, this exists at runtime.'",
        codeSnippet: `// In an env.d.ts file:
declare const __APP_VERSION__: string;
declare const __API_BASE_URL__: string;

// In your application code:
console.log("App Version:", __APP_VERSION__); // Safe! TypeScript knows it is a string.`,
      },
      {
        title: "2. Declaration Files (.d.ts) for Libraries",
        content:
          "When you publish a TypeScript library, enabling `\"declaration\": true` in `tsconfig.json` instructs `tsc` to emit `.d.ts` files alongside compiled `.js` files. Consumers get full autocomplete without needing your original `.ts` source.",
        codeSnippet: `// Emitted math-utils.d.ts:
export declare function add(a: number, b: number): number;
export declare function multiply(a: number, b: number): number;
export declare interface MathConfig { precision: number; }`,
      },
      {
        title: "3. DefinitelyTyped (@types/* Packages)",
        content:
          "When an npm package is authored in pure JavaScript (like `lodash` or `express`), running `npm i -D @types/lodash` installs community-crafted `.d.ts` files into `node_modules/@types/`, giving you instant type safety.",
        codeSnippet: `// TypeScript looks in node_modules/@types/lodash/index.d.ts
import debounce from "lodash/debounce";
// Autocomplete and parameter validation work seamlessly!`,
      },
      {
        title: "4. The Type Erasure Proof",
        content:
          "Interfaces, type aliases, and type annotations do not exist in JavaScript. If you try to inspect an interface with `instanceof`, JavaScript throws a ReferenceError. Always remember: types are compile-time phantoms.",
        codeSnippet: `interface User { id: string; }
const u: User = { id: "1" };

// ❌ Error: 'User' only refers to a type, but is being used as a value here!
// console.log(u instanceof User);`,
      },
    ],
  },
  part4: {
    title: "Anti-Patterns vs Clean Ambient Declarations",
    bad: {
      title: "Attempting Runtime Introspection on Erased Interfaces",
      code: `// ❌ Anti-pattern: attempting to check a TypeScript interface at runtime
interface PaymentPayload {
  amount: number;
  currency: string;
}

function processPayment(data: unknown) {
  // Crashes with: ReferenceError: PaymentPayload is not defined!
  // TypeScript interfaces do not exist in emitted JavaScript!
  if (data instanceof PaymentPayload) {
    console.log(data.amount);
  }
}`,
      explanation:
        "Interfaces are 100% erased during compilation. Calling `instanceof` on an interface causes a fatal `ReferenceError` at runtime in the browser or Node.js because the identifier was erased from the bundle.",
    },
    good: {
      title: "Using Runtime Type Guards alongside Compile-Time Declarations",
      code: `// ✅ Idiomatic: runtime validation function guarding the compile-time type
interface PaymentPayload {
  amount: number;
  currency: string;
}

function isPaymentPayload(data: unknown): data is PaymentPayload {
  return (
    typeof data === "object" &&
    data !== null &&
    "amount" in data &&
    typeof (data as { amount: unknown }).amount === "number" &&
    "currency" in data &&
    typeof (data as { currency: unknown }).currency === "string"
  );
}

function processPayment(data: unknown) {
  if (isPaymentPayload(data)) {
    console.log("Safe payment amount:", data.amount); // Type narrowed safely!
  }
}`,
      explanation:
        "A custom type predicate (`data is PaymentPayload`) performs real runtime JavaScript validation while giving TypeScript's static type checker the proof it needs to narrow the type safely.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox: Ambient Contracts & Type Erasure",
    intro:
      "Explore how ambient type declarations and runtime guards work together to ensure complete type safety:",
    starterCode: `// TS-27: Declaration Files & Type Erasure
// Demonstrating ambient declarations and runtime validation

// 1. Ambient declaration simulated for a global analytics provider
interface AnalyticsPayload {
  eventName: string;
  timestamp: number;
  properties: Record<string, string | number | boolean>;
}

// 2. Runtime type guard function proving the shape of incoming data
function isValidAnalyticsEvent(raw: unknown): raw is AnalyticsPayload {
  if (typeof raw !== "object" || raw === null) return false;

  const candidate = raw as Record<string, unknown>;
  return (
    typeof candidate.eventName === "string" &&
    typeof candidate.timestamp === "number" &&
    typeof candidate.properties === "object" &&
    candidate.properties !== null
  );
}

// 3. Processing untrusted external data (e.g. from an incoming webhook or CDN)
function trackEvent(input: unknown): void {
  if (isValidAnalyticsEvent(input)) {
    // Inside this block, TypeScript knows input is AnalyticsPayload!
    console.log("Tracking verified event:", input.eventName);
    console.log("Event Timestamp:", new Date(input.timestamp).toISOString());
    console.log("Properties:", input.properties);
  } else {
    console.log("Invalid analytics payload received. Event dropped.");
  }
}

// Test with valid event
trackEvent({
  eventName: "user_completed_lesson",
  timestamp: Date.now(),
  properties: { lessonCode: "TS-27", score: 100 },
});

// Test with invalid event
trackEvent({ eventName: 42 });
`,
  },
  part6: {
    title: "Concept Check: Knowledge Assessment",
    quiz: {
      question:
        "Which of the following TypeScript constructs is emitted into the runtime JavaScript bundle after compilation?",
      options: [
        "A standard JavaScript class with constructor and methods",
        "An interface declaration (`interface User { id: string }`)",
        "A type alias (`type Status = 'open' | 'closed'`)",
        "An ambient declaration (`declare const __VERSION__: string;`)",
      ],
      correctIndex: 0,
      explanation:
        "Classes are standard ECMAScript runtime constructs, so TypeScript emits executable JavaScript class code for them. Interfaces, type aliases, and ambient declarations are completely erased at compile time.",
    },
  },
  part7: {
    title: "Key Takeaways & What's Next",
    takeaways: [
      {
        title: "1. Pure Type Erasure",
        desc: "Interfaces, type aliases, and ambient declarations leave 0 bytes of code in emitted JavaScript.",
      },
      {
        title: "2. The declare Keyword",
        desc: "declare creates ambient promises that a global or module exists without creating runtime memory.",
      },
      {
        title: "3. .d.ts Declaration Files",
        desc: "Declaration files describe external JavaScript APIs for the compiler across package boundaries.",
      },
      {
        title: "4. DefinitelyTyped Ecosystem",
        desc: "@types packages allow seamless, fully-typed consumption of pure JavaScript npm libraries.",
      },
    ],
    nextLessonPreview: {
      title: "Stage 8: Practical TypeScript Patterns (TS-28 – TS-30)",
      desc: "Advance to Stage 8 to master type assertions vs satisfies, safe catch error handling with unknown, and type-safe API contracts.",
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
  "ts06-function-types": TS06_CONTENT,
  "ts07-function-overloads": TS07_CONTENT,
  "ts08-unions-intersections": TS08_CONTENT,
  "ts09-type-vs-interface": TS09_CONTENT,
  "ts10-control-flow-guards": TS10_CONTENT,
  "ts11-custom-type-predicates": TS11_CONTENT,
  "ts12-discriminated-unions": TS12_CONTENT,
  "ts13-exhaustive-checking": TS13_CONTENT,
  "ts14-generic-functions": TS14_CONTENT,
  "ts15-generic-interfaces": TS15_CONTENT,
  "ts16-generic-constraints": TS16_CONTENT,
  "ts17-generics-keyof": TS17_CONTENT,
  "ts18-class-access-modifiers": TS18_CONTENT,
  "ts19-parameter-properties": TS19_CONTENT,
  "ts20-abstract-classes": TS20_CONTENT,
  "ts21-indexed-access-typeof": TS21_CONTENT,
  "ts22-conditional-types-infer": TS22_CONTENT,
  "ts23-mapped-template-types": TS23_CONTENT,
  "ts24-utility-types": TS24_CONTENT,
  "ts25-modules-type-imports": TS25_CONTENT,
  "ts26-tsconfig-strict-mode": TS26_CONTENT,
  "ts27-declarations-type-erasure": TS27_CONTENT,
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
