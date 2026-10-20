/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TYPESCRIPT CURRICULUM QUIZZES
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * High-yield, curriculum-aligned module quizzes for the TypeScript track.
 * Questions test actual learning objectives: compile-time vs runtime,
 * type erasure, primitive annotations, type inference, arrays, and tuples.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { ModuleQuiz } from "./quiz-types";

export const TYPESCRIPT_MODULE_QUIZZES: ModuleQuiz[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // TS-01: What is TypeScript? The Guardrail Mental Model
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts01",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts01-mental-model",
    lessonCode: "TS-01",
    lessonTitle: "What is TypeScript? The Guardrail Mental Model",
    description: "Assess your understanding of static typing, compile-time vs runtime, and type erasure.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts01-q1",
        type: "code_output",
        title: "Runtime Execution & Type Erasure",
        prompt: "What will be printed to the console when the following compiled JavaScript runs in Node.js or the browser?",
        codeSnippet: `interface User {
  id: number;
  name: string;
}

const user: User = { id: 1, name: "Sam" };

console.log(typeof user);`,
        language: "typescript",
        options: [
          "'object'",
          "'User'",
          "'interface'",
          "'undefined'"
        ],
        correctAnswer: 0,
        explanation: "Interfaces and type annotations exist purely at compile time and are completely erased upon compilation. At JavaScript runtime, user is a standard object, so 'typeof user' evaluates to 'object'.",
        hint: "Types and interfaces vanish when TypeScript compiles to JavaScript.",
        hintCostXP: 5,
      },
      {
        id: "ts01-q2",
        type: "multiple_choice",
        title: "Compile-Time vs Runtime",
        prompt: "What is the primary difference between compile-time checking in TypeScript and runtime execution in JavaScript?",
        options: [
          "Compile-time happens in your editor before the code runs to catch bugs early; runtime is when JavaScript actually executes in the browser",
          "Compile-time checks are only performed on server computers; runtime checks happen in the editor",
          "Compile-time checking slows down website performance for end users",
          "Compile-time converts JavaScript directly into binary assembly code"
        ],
        correctAnswer: 0,
        explanation: "Compile-time checking happens while you write code in your editor, finding syntax errors, typos, and shape mismatches before the program is ever executed.",
        hint: "Think about when the red squiggly lines appear in your editor.",
        hintCostXP: 5,
      },
      {
        id: "ts01-q3",
        type: "multiple_choice",
        title: "The Principle of Type Erasure",
        prompt: "Why does TypeScript have zero runtime performance overhead compared to plain JavaScript?",
        options: [
          "Because the browser has a built-in TypeScript engine that caches all types",
          "Because the compiler erases all types, interfaces, and annotations, emitting 100% standard JavaScript",
          "Because TypeScript uses multi-threaded Web Workers to validate types during page load",
          "Because TypeScript disables all JavaScript garbage collection"
        ],
        correctAnswer: 1,
        explanation: "Type erasure means every type keyword, interface, and annotation is stripped away during compilation. The emitted JavaScript contains zero type checks, running at full native speed.",
        hint: "What is left in the .js file after the tsc compiler finishes?",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TS-02: Basic Types & Type Inference
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts02",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts02-primitives-inference",
    lessonCode: "TS-02",
    lessonTitle: "Basic Types & Type Inference",
    description: "Evaluate your understanding of primitive types (string, number, boolean), type annotations, and automatic inference.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts02-q1",
        type: "code_output",
        title: "Assignability of Inferred Types",
        prompt: "What error occurs in TypeScript on the second line of this code snippet?",
        codeSnippet: `let totalScore = 100;
totalScore = "one hundred";`,
        language: "typescript",
        options: [
          "Type 'string' is not assignable to type 'number'",
          "SyntaxError: Variable 'totalScore' cannot be reassigned",
          "TypeError: Cannot convert number to string implicitly",
          "No error: TypeScript automatically changes the variable type to string"
        ],
        correctAnswer: 0,
        explanation: "TypeScript infers that totalScore is of type 'number' from its initial value 100. Assigning a string to a variable locked to 'number' triggers: Type 'string' is not assignable to type 'number'.",
        hint: "What type did TypeScript infer from the initial assignment of 100?",
        hintCostXP: 5,
      },
      {
        id: "ts02-q2",
        type: "multiple_choice",
        title: "When to Write Explicit Type Annotations",
        prompt: "In clean, idiomatic TypeScript, when is an explicit type annotation (like ': number') most necessary?",
        options: [
          "On every single variable, even when initialized with a literal like 'let count = 0'",
          "When declaring a variable without an immediate value, or specifying function parameter contracts",
          "Only when importing code from external libraries",
          "Only when working with HTML button elements"
        ],
        correctAnswer: 1,
        explanation: "If a variable is initialized immediately (let count = 0), TypeScript infers the type cleanly. Explicit annotations are needed when declaring a variable before assigning it, or on function parameters.",
        hint: "Think about when TypeScript cannot guess the type on its own.",
        hintCostXP: 5,
      },
      {
        id: "ts02-q3",
        type: "multiple_choice",
        title: "let vs const Type Inference",
        prompt: "What is the difference between the inferred type of 'let role = \"admin\"' and 'const role = \"admin\"'?",
        options: [
          "'let' infers the broad type 'string', while 'const' infers the specific literal type '\"admin\"'",
          "'const' infers 'any', while 'let' infers 'string'",
          "Both infer the identical broad type 'string'",
          "'let' causes a compile error unless an explicit annotation is added"
        ],
        correctAnswer: 0,
        explanation: "Because a 'let' variable can be reassigned to any string later, TypeScript infers 'string'. Because a 'const' variable can never change, TypeScript narrows it to the exact literal type '\"admin\"'.",
        hint: "Can a const variable ever change its value?",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TS-03: Arrays, Tuples & Readonly Collections
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts03",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts03-arrays-tuples",
    lessonCode: "TS-03",
    lessonTitle: "Arrays, Tuples & Readonly Collections",
    description: "Test your skills with typed arrays, fixed-position tuples, and immutable readonly collections.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts03-q1",
        type: "code_output",
        title: "Array Mutation Type Check",
        prompt: "What will TypeScript report when you try to compile the second line of this code?",
        codeSnippet: `const usernames: string[] = ["alex", "jordan"];
usernames.push(42);`,
        language: "typescript",
        options: [
          "Argument of type 'number' is not assignable to parameter of type 'string'",
          "usernames.push is not a function",
          "SyntaxError: Arrays cannot be modified",
          "No error: 42 is converted to the string '42'"
        ],
        correctAnswer: 0,
        explanation: "Because usernames is typed as string[], all array methods like .push() expect arguments of type 'string'. Passing the number 42 is rejected by the compiler.",
        hint: "The array is typed as string[]. Can you push a number into it?",
        hintCostXP: 5,
      },
      {
        id: "ts03-q2",
        type: "multiple_choice",
        title: "Array vs Tuple Distinction",
        prompt: "What is the primary difference between a typed array 'string[]' and a tuple '[string, number]'?",
        options: [
          "An array has a variable length with all items of type string; a tuple has a fixed length of 2 with exact types at each position",
          "An array can only be stored in memory; a tuple can be written to disk",
          "Tuples exist at runtime in JavaScript; arrays are erased",
          "Arrays only hold numbers; tuples only hold strings"
        ],
        correctAnswer: 0,
        explanation: "A typed array (string[]) can grow or shrink and every element is a string. A tuple ([string, number]) enforces a fixed number of items where position 0 is a string and position 1 is a number.",
        hint: "Think about length flexibility vs fixed positional types.",
        hintCostXP: 5,
      },
      {
        id: "ts03-q3",
        type: "multiple_choice",
        title: "The readonly Array Modifier",
        prompt: "What happens if you attempt to call '.push()' or '.pop()' on a variable typed as 'readonly string[]'?",
        options: [
          "TypeScript produces a compile error because mutating methods do not exist on 'readonly string[]'",
          "The array automatically duplicates itself before mutating",
          "The browser logs a runtime warning in the console",
          "The array allows the mutation if the variable was declared with 'let'"
        ],
        correctAnswer: 0,
        explanation: "The 'readonly' modifier removes all mutating methods (like push, pop, splice, shift, and reverse) from the array type interface, preventing mutations at compile time.",
        hint: "Does a readonly array allow modifications?",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TS-04: Object Types, Optional Fields & Readonly
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts04",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts04-object-types",
    lessonCode: "TS-04",
    lessonTitle: "Object Types, Optional Fields & Readonly",
    description: "Test your mastery of structural object shapes, optional properties with (?), and readonly immutability.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts04-q1",
        type: "code_output",
        title: "Optional Property Inferred Type",
        prompt: "Consider the following type: `type Profile = { id: number; bio?: string };`. What is the type of `user.bio` according to TypeScript?",
        codeSnippet: `type Profile = {
  id: number;
  bio?: string;
};

const user: Profile = { id: 10 };
console.log(user.bio);`,
        language: "typescript",
        options: [
          "'string | undefined'",
          "'string'",
          "'string | null'",
          "'any'"
        ],
        correctAnswer: 0,
        explanation: "An optional property declared with '?' can either be present with the declared type or omitted entirely, so TypeScript treats its type as 'string | undefined'.",
        hint: "If a property is optional, it might not be defined.",
        hintCostXP: 5,
      },
      {
        id: "ts04-q2",
        type: "multiple_choice",
        title: "The readonly Modifier on Object Properties",
        prompt: "What is the purpose and behavior of marking an object property as 'readonly' in TypeScript?",
        options: [
          "It prevents reassignment of the property after initialization, causing a compile-time error if modified",
          "It encrypts the property value at runtime so other scripts cannot read it",
          "It forces the property to be initialized to null",
          "It turns the property into a JavaScript getter function with no setter"
        ],
        correctAnswer: 0,
        explanation: "The 'readonly' modifier signals to the TypeScript compiler that the property should not be mutated after initialization. Any attempt to reassign it triggers a compile-time error.",
        hint: "Think about compile-time immutability.",
        hintCostXP: 5,
      },
      {
        id: "ts04-q3",
        type: "code_output",
        title: "Excess Property Checks",
        prompt: "What error will TypeScript report for the following function call with an object literal?",
        codeSnippet: `function printUser(user: { name: string; age: number }) {
  console.log(user.name, user.age);
}

printUser({ name: "Alice", age: 30, isAdmin: true });`,
        language: "typescript",
        options: [
          "Object literal may only specify known properties, and 'isAdmin' does not exist in type '{ name: string; age: number; }'",
          "Runtime ReferenceError: isAdmin is not defined in scope",
          "No error occurs because excess properties are silently deleted at compile time",
          "TypeError: Expected 3 arguments but received 1"
        ],
        correctAnswer: 0,
        explanation: "When an object literal is passed directly to a function or assigned to an explicit type, TypeScript performs excess property checks to catch typos and unintended fields.",
        hint: "Does TypeScript permit passing unknown properties in direct object literals?",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TS-05: Special Types: any, unknown, void & never
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts05",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts05-special-types",
    lessonCode: "TS-05",
    lessonTitle: "Special Types: any, unknown, void & never",
    description: "Demonstrate your understanding of top types (any vs unknown), bottom types (never), and void returns.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts05-q1",
        type: "multiple_choice",
        title: "any vs unknown for External Data",
        prompt: "Why is 'unknown' preferred over 'any' when handling data from external sources (such as an API or user input)?",
        options: [
          "'unknown' forces you to perform type checks (like typeof) before performing operations on the value, whereas 'any' disables all type checking",
          "'unknown' runs faster at runtime than 'any'",
          "'unknown' automatically converts strings into JSON objects",
          "'any' is deprecated and will be removed in future TypeScript versions"
        ],
        correctAnswer: 0,
        explanation: "Both 'any' and 'unknown' can hold any value, but 'unknown' is type-safe: TypeScript forces you to check its type (e.g. typeof x === 'string') before calling methods or accessing properties. 'any' disables all compiler checks completely.",
        hint: "Which type forces you to prove what the data is before using it?",
        hintCostXP: 5,
      },
      {
        id: "ts05-q2",
        type: "code_output",
        title: "The void Return Type",
        prompt: "What does the 'void' return type signify in the following function?",
        codeSnippet: `function logAction(action: string): void {
  console.log("[AUDIT]:", action);
}`,
        language: "typescript",
        options: [
          "The function does not return a meaningful value; its return value should not be captured or used",
          "The function will always throw a runtime exception",
          "The function accepts zero parameters",
          "The function runs asynchronously in a web worker thread"
        ],
        correctAnswer: 0,
        explanation: "In TypeScript, 'void' represents the absence of a return value. A function that completes normally without a return statement (or with an empty 'return;') has a return type of 'void'.",
        hint: "Look at whether the function produces a return value.",
        hintCostXP: 5,
      },
      {
        id: "ts05-q3",
        type: "multiple_choice",
        title: "The never Type",
        prompt: "In which scenario does a function in TypeScript have a return type of 'never'?",
        options: [
          "A function that always throws an error or never reaches its endpoint (e.g. an infinite loop)",
          "A variable that has been declared with 'let' but not yet initialized",
          "A function that returns undefined or null",
          "An optional property that was omitted from an object"
        ],
        correctAnswer: 0,
        explanation: "The 'never' type represents values that never occur. Functions that throw an exception or never return (e.g. an infinite loop) have a return type of 'never'. It is also used in exhaustive type checking.",
        hint: "What does it mean for a value to 'never' exist?",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TS-06: Function Signatures & Parameters
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts06",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts06-function-types",
    lessonCode: "TS-06",
    lessonTitle: "Function Signatures & Parameters",
    description: "Assess your mastery of typed parameters, return inference, optional/default values, and rest parameters.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts06-q1",
        type: "multiple_choice",
        title: "Optional vs Default Parameters",
        prompt: "What is the key difference in TypeScript between an optional parameter 'discount?: number' and a default parameter 'discount: number = 0'?",
        options: [
          "Both allow omitting the argument, but a default parameter ensures the parameter is always a number rather than number | undefined",
          "Optional parameters only work with strings, while default parameters only work with numbers",
          "Default parameters must precede all required parameters in the parameter list",
          "Optional parameters are kept at runtime while default parameters are erased"
        ],
        correctAnswer: 0,
        explanation: "Both let callers omit the argument. But inside the function body, an optional parameter has type 'number | undefined', whereas a default parameter has type 'number' because TypeScript supplies the fallback value if undefined is passed.",
        hint: "Consider the type of the variable inside the function body.",
        hintCostXP: 5,
      },
      {
        id: "ts06-q2",
        type: "multiple_choice",
        title: "Rest Parameter Type Annotation",
        prompt: "What is the proper type annotation for a rest parameter that collects any number of numeric arguments?",
        options: [
          "...scores: number[]",
          "...scores: [number]",
          "...scores: number",
          "scores: ...number[]"
        ],
        correctAnswer: 0,
        explanation: "In TypeScript, rest parameters collect multiple function arguments into a JavaScript array, so their type must always be an array type such as number[] or Array<number>.",
        hint: "What data structure does the rest operator collect arguments into?",
        hintCostXP: 5,
      },
      {
        id: "ts06-q3",
        type: "code_output",
        title: "Function Type Expressions",
        prompt: "Which type alias correctly describes a callback function that accepts a string username and returns a boolean?",
        codeSnippet: `// Which type definition matches?
const isValidUser: UserValidator = (name) => name.length > 3;`,
        language: "typescript",
        options: [
          "type UserValidator = (username: string) => boolean;",
          "type UserValidator = (username: string): boolean;",
          "type UserValidator = Function<string, boolean>;",
          "type UserValidator = (string) -> boolean;"
        ],
        correctAnswer: 0,
        explanation: "Function type expressions in TypeScript use arrow notation: (parameter: Type) => ReturnType.",
        hint: "TypeScript uses arrow syntax for function type expressions.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TS-07: Function Overloading
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts07",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts07-function-overloads",
    lessonCode: "TS-07",
    lessonTitle: "Function Overloading",
    description: "Verify your understanding of overload signatures, implementation bodies, and when to use overloads vs unions.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts07-q1",
        type: "multiple_choice",
        title: "Calling Overload Signatures",
        prompt: "When a function has overload signatures in TypeScript, which signatures are external callers permitted to invoke?",
        options: [
          "Only the declared overload signatures; the implementation signature is invisible to callers",
          "Only the implementation signature",
          "Both the overload signatures and the implementation signature interchangeably",
          "Only the very last signature declared"
        ],
        correctAnswer: 0,
        explanation: "The implementation signature is strictly internal to satisfy the compiler. Callers can only invoke the declared public overload signatures.",
        hint: "Which signatures define the public interface of the function?",
        hintCostXP: 5,
      },
      {
        id: "ts07-q2",
        type: "multiple_choice",
        title: "Overload Signature Syntax",
        prompt: "What is a structural requirement for declaring function overload signatures in TypeScript?",
        options: [
          "Overload signatures must end with a semicolon and have no body; only the implementation signature has a body",
          "Each overload signature must contain its own distinct curly-brace { ... } body",
          "Overload signatures must be exported in different files",
          "Overloads only work if all parameters are typed as 'any'"
        ],
        correctAnswer: 0,
        explanation: "Overload signatures declare call contracts without implementations and end with semicolons. Only the single implementation signature contains the function body.",
        hint: "Do overload signatures have their own curly-brace bodies?",
        hintCostXP: 5,
      },
      {
        id: "ts07-q3",
        type: "multiple_choice",
        title: "When to Choose Overloads over Unions",
        prompt: "In which scenario are function overloads necessary instead of a single function with union parameter types?",
        options: [
          "When the return type of the function depends directly on the specific type or combination of arguments passed",
          "When all parameters share the exact same type",
          "When the function returns void",
          "When you want to improve runtime JavaScript performance"
        ],
        correctAnswer: 0,
        explanation: "Overloads tie specific parameter types to specific return types. If passing a string guarantees a string return, but passing a number guarantees a number return, overloads enforce this relationship without requiring callers to cast the return value.",
        hint: "Think about coupling the return type to the argument type.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TS-08: Union & Intersection Types
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts08",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts08-unions-intersections",
    lessonCode: "TS-08",
    lessonTitle: "Union & Intersection Types",
    description: "Test your ability to compose flexible data types with unions (|) and combine shapes with intersections (&).",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts08-q1",
        type: "multiple_choice",
        title: "Accessing Union Type Members",
        prompt: "If a variable 'val' has the union type 'string | number[]', what properties can be accessed on 'val' before any type narrowing?",
        options: [
          "Only properties common to both types (such as .length and .slice())",
          "Any property belonging to string (such as .toUpperCase())",
          "Any property belonging to array (such as .push())",
          "No properties can be accessed until a typeof check is performed"
        ],
        correctAnswer: 0,
        explanation: "TypeScript only permits accessing properties that exist on every member of a union. Since both string and number[] share .length and .slice(), those can be accessed immediately.",
        hint: "What members do string and Array share in common?",
        hintCostXP: 5,
      },
      {
        id: "ts08-q2",
        type: "multiple_choice",
        title: "Benefits of String Literal Unions",
        prompt: "What is the primary benefit of declaring `type Role = 'admin' | 'editor' | 'viewer';` instead of `type Role = string;`?",
        options: [
          "It prevents typos (like 'admn') at compile time and provides editor autocomplete suggestions",
          "It compiles into a JavaScript enum object in the generated output",
          "It reduces the memory footprint of the string in the browser",
          "It automatically converts incoming integers into roles"
        ],
        correctAnswer: 0,
        explanation: "String literal unions constrain variables to an exact set of allowed string values, catching typos during compilation and enabling IDE autocomplete.",
        hint: "What happens if a developer mistypes 'admn'?",
        hintCostXP: 5,
      },
      {
        id: "ts08-q3",
        type: "code_output",
        title: "Intersection Types with Objects",
        prompt: "What is the requirement for an object to satisfy the intersection type `type Entity = Identifiable & Timestamped`?",
        codeSnippet: `type Identifiable = { id: string };
type Timestamped = { createdAt: Date };
type Entity = Identifiable & Timestamped;`,
        language: "typescript",
        options: [
          "The object must contain both 'id: string' AND 'createdAt: Date'",
          "The object only needs to contain either 'id' OR 'createdAt'",
          "The type evaluates to 'never' because objects cannot be intersected",
          "The object must be an array of both types"
        ],
        correctAnswer: 0,
        explanation: "An intersection type (&) combines multiple types into one. An object of type Entity must satisfy all properties from both Identifiable and Timestamped.",
        hint: "Think of intersection (&) as 'AND' — all properties must be satisfied.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TS-09: Type Aliases vs Interfaces
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts09",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts09-type-vs-interface",
    lessonCode: "TS-09",
    lessonTitle: "Type Aliases vs Interfaces",
    description: "Master the key architectural distinctions between interfaces and type aliases, including declaration merging and extends vs &.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts09-q1",
        type: "multiple_choice",
        title: "Declaration Merging",
        prompt: "What happens if you define two `interface User { ... }` blocks with different properties in the same scope, versus two `type User = { ... }` definitions?",
        options: [
          "The two interfaces merge their properties into a single combined interface, while duplicate type aliases throw a compiler error",
          "Both interfaces and type aliases automatically merge",
          "The second interface completely overwrites the first one",
          "Interfaces cannot have duplicate names, while type aliases can"
        ],
        correctAnswer: 0,
        explanation: "Declaration merging is unique to interfaces: duplicate interface definitions in the same scope merge into one. In contrast, type aliases cannot be reopened and produce a 'Duplicate identifier' compiler error.",
        hint: "Which construct can be 'reopened' and merged?",
        hintCostXP: 5,
      },
      {
        id: "ts09-q2",
        type: "multiple_choice",
        title: "Capabilities Unique to Type Aliases",
        prompt: "Which of the following can be created with a `type` alias, but CANNOT be declared with an `interface`?",
        options: [
          "A union of string literal values (e.g. type Status = 'open' | 'closed';)",
          "An object shape with required properties",
          "A contract with optional properties",
          "A contract with readonly fields"
        ],
        correctAnswer: 0,
        explanation: "Interfaces can only describe object shapes. Type aliases can represent unions, primitives, tuples, and function signatures in addition to object shapes.",
        hint: "Can an interface represent a union of string literals?",
        hintCostXP: 5,
      },
      {
        id: "ts09-q3",
        type: "code_output",
        title: "Interface Inheritance Syntax",
        prompt: "What is the idiomatic syntax for an interface 'Admin' to inherit all properties from an interface 'User'?",
        codeSnippet: `interface User {
  id: string;
  name: string;
}

// How does Admin inherit from User?`,
        language: "typescript",
        options: [
          "interface Admin extends User { permissions: string[]; }",
          "interface Admin inherits User { permissions: string[]; }",
          "interface Admin: User { permissions: string[]; }",
          "interface Admin with User { permissions: string[]; }"
        ],
        correctAnswer: 0,
        explanation: "Interfaces use the 'extends' keyword to inherit properties from other interfaces or object types.",
        hint: "TypeScript uses the object-oriented 'extends' keyword for interface inheritance.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TS-10: Control Flow Analysis & Basic Guards
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts10",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts10-control-flow-guards",
    lessonCode: "TS-10",
    lessonTitle: "Control Flow Analysis & Basic Guards",
    description: "Assess your mastery of type narrowing using typeof, instanceof, equality checks, and the in operator.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts10-q1",
        type: "multiple_choice",
        title: "typeof Type Guard Capabilities",
        prompt: "Which of the following types can be reliably distinguished using the JavaScript 'typeof' operator inside a TypeScript type guard?",
        options: [
          "'string', 'number', 'boolean', and 'symbol'",
          "'Array', 'Date', 'Error', and 'RegExp'",
          "'interface', 'type alias', and 'tuple'",
          "'null' from standard objects"
        ],
        correctAnswer: 0,
        explanation: "typeof is a JavaScript runtime operator returning primitive strings like 'string', 'number', 'boolean', and 'symbol'. It cannot distinguish between specific object instances like Date or Array (both return 'object'), nor can it distinguish null from object.",
        hint: "What values does the runtime typeof operator actually return in JavaScript?",
        hintCostXP: 5,
      },
      {
        id: "ts10-q2",
        type: "multiple_choice",
        title: "instanceof Type Guard",
        prompt: "When should you use the 'instanceof' operator instead of 'typeof' for type narrowing in TypeScript?",
        options: [
          "When distinguishing instances of classes or constructor functions, such as Error or Date",
          "When checking whether a variable is a string or number primitive",
          "When verifying if a property exists on a plain JSON object",
          "When converting a string to an integer at runtime"
        ],
        correctAnswer: 0,
        explanation: "instanceof checks the prototype chain of an object instance, making it ideal for narrowing classes and constructors like Date, Error, Map, or custom classes.",
        hint: "Which operator checks prototype inheritance?",
        hintCostXP: 5,
      },
      {
        id: "ts10-q3",
        type: "code_output",
        title: "Narrowing with the 'in' Operator",
        prompt: "Consider the types `type Fish = { swim: () => void };` and `type Bird = { fly: () => void };`. How can TypeScript narrow a variable `pet: Fish | Bird` to `Fish`?",
        codeSnippet: `type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(pet: Fish | Bird) {
  // How do we narrow to Fish?
}`,
        language: "typescript",
        options: [
          "if ('swim' in pet) { pet.swim(); }",
          "if (typeof pet === 'Fish') { pet.swim(); }",
          "if (pet instanceof Fish) { pet.swim(); }",
          "if (pet.hasProperty('swim')) { pet.swim(); }"
        ],
        correctAnswer: 0,
        explanation: "The 'in' operator checks whether a property exists on an object. TypeScript's control flow analysis uses 'swim' in pet to narrow pet to Fish inside the if branch.",
        hint: "Which JavaScript operator checks for property existence on an object?",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TS-11: Custom Type Predicates
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts11",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts11-custom-type-predicates",
    lessonCode: "TS-11",
    lessonTitle: "Custom Type Predicates",
    description: "Verify your understanding of user-defined type guards (parameter is Type), array filtering, and assertion signatures.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts11-q1",
        type: "multiple_choice",
        title: "Type Predicate Return Signature",
        prompt: "What is the return type annotation that turns a boolean validation function into a TypeScript custom type predicate?",
        options: [
          "parameterName is TargetType (e.g. pet is Dog)",
          "boolean as TargetType",
          "TargetType | boolean",
          "=> TargetType"
        ],
        correctAnswer: 0,
        explanation: "A custom type predicate uses the syntax 'parameterName is Type' in place of a boolean return type. When the function returns true, TypeScript narrows the argument to Type in the caller's scope.",
        hint: "Look for the keyword 'is' connecting the parameter to the type.",
        hintCostXP: 5,
      },
      {
        id: "ts11-q2",
        type: "code_output",
        title: "Filtering Arrays with Type Predicates",
        prompt: "Given an array `const items: (string | null)[] = ['a', null, 'b'];`, how can you filter it to produce a clean `string[]` without compiler errors?",
        codeSnippet: `const items: (string | null)[] = ['a', null, 'b'];
// Which filter call narrows the result to string[]?`,
        language: "typescript",
        options: [
          "items.filter((item): item is string => item !== null)",
          "items.filter(item => item !== null)",
          "items.map(item => item as string)",
          "Arrays with nulls cannot be filtered in TypeScript"
        ],
        correctAnswer: 0,
        explanation: "A standard filter returns boolean, which does not change the array's element type. Passing a type predicate (item): item is string instructs TypeScript to narrow the resulting array to string[].",
        hint: "Standard boolean callbacks do not narrow array element types; a type predicate is required.",
        hintCostXP: 5,
      },
      {
        id: "ts11-q3",
        type: "multiple_choice",
        title: "Assertion Signatures",
        prompt: "What does the 'asserts condition' or 'asserts value is Type' signature indicate in TypeScript?",
        options: [
          "The function throws an exception if the condition is false, allowing TypeScript to narrow the variable for all subsequent lines of code",
          "The function logs a warning to the console if the assertion fails",
          "The function returns a Promise that resolves to the asserted type",
          "The function compiles into a WebAssembly assertion check"
        ],
        correctAnswer: 0,
        explanation: "Assertion functions indicate that if the function returns normally (without throwing an error), the condition is guaranteed to be true, narrowing the variable for all subsequent code without requiring an if block.",
        hint: "What happens when an assertion passes without throwing?",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TS-12: Discriminated Unions
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts12",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts12-discriminated-unions",
    lessonCode: "TS-12",
    lessonTitle: "Discriminated Unions",
    description: "Master the premier TypeScript architectural pattern: tagged unions with shared literal properties and switch statements.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts12-q1",
        type: "multiple_choice",
        title: "Core Elements of a Discriminated Union",
        prompt: "What three structural characteristics define a Discriminated Union in TypeScript?",
        options: [
          "Multiple object types, a shared property with a common name, and a unique literal type for that property on each variant",
          "A class, an interface, and an abstract method",
          "A function with multiple overloads, a rest parameter, and an arrow return",
          "A type alias containing only optional properties and generic parameters"
        ],
        correctAnswer: 0,
        explanation: "A discriminated union consists of multiple object types that all share a common property (the 'discriminant' or 'tag') where each variant assigns a unique literal type (e.g. 'circle', 'square') to that tag.",
        hint: "Think about multiple object shapes sharing a single tagged property.",
        hintCostXP: 5,
      },
      {
        id: "ts12-q2",
        type: "multiple_choice",
        title: "Making Impossible States Unrepresentable",
        prompt: "Why is a discriminated union like `{ status: 'loading' } | { status: 'success'; data: User } | { status: 'error'; error: string }` superior to a single object `{ status: string; data?: User; error?: string }`?",
        options: [
          "It prevents impossible states, such as having both 'data' and 'error' populated at the same time, or accessing 'data' while 'loading'",
          "It compiles into smaller JavaScript bundle sizes",
          "It allows modifying properties at runtime without type checking",
          "It automatically executes asynchronous HTTP requests"
        ],
        correctAnswer: 0,
        explanation: "Discriminated unions ensure that data associated with a specific state (like data on success) can only ever exist when that state is active, eliminating invalid combinations.",
        hint: "Can an error and success data exist simultaneously in a proper state machine?",
        hintCostXP: 5,
      },
      {
        id: "ts12-q3",
        type: "multiple_choice",
        title: "Narrowing with Switch Statements",
        prompt: "When switching on 'shape.kind' in a discriminated union of shapes, what happens to 'shape' inside each 'case' block?",
        options: [
          "TypeScript automatically narrows 'shape' to the specific variant matching that 'kind', granting safe access to its specific properties",
          "'shape' retains the broad union type and requires manual type assertions",
          "TypeScript throws a warning that switch statements are deprecated",
          "The switch statement is converted to an if-else chain at runtime"
        ],
        correctAnswer: 0,
        explanation: "Inside case 'circle':, TypeScript's control flow analysis narrows shape to Circle, so properties like shape.radius are immediately available and autocompleted.",
        hint: "How does control flow analysis treat discriminant properties in case branches?",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TS-13: Exhaustive Checking with never
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts13",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts13-exhaustive-checking",
    lessonCode: "TS-13",
    lessonTitle: "Exhaustive Checking with never",
    description: "Ensure compile-time safety across union variants using the never type and assertNever helper pattern.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts13-q1",
        type: "multiple_choice",
        title: "The Type of Exhausted Unions",
        prompt: "In a switch statement that checks every possible variant of a discriminated union, what type does the switched variable have in the 'default:' branch?",
        options: [
          "'never'",
          "'any'",
          "'unknown'",
          "'undefined'"
        ],
        correctAnswer: 0,
        explanation: "Once all possible types of a union have been narrowed and handled in preceding cases, no possibilities remain. TypeScript assigns the empty bottom type, never, to the variable.",
        hint: "What is the bottom type representing an impossible value in TypeScript?",
        hintCostXP: 5,
      },
      {
        id: "ts13-q2",
        type: "multiple_choice",
        title: "The Exhaustive Check Pattern",
        prompt: "How does the helper function `function assertNever(x: never): never { throw new Error('Unhandled: ' + x); }` protect code during future updates?",
        options: [
          "If a new variant is added to the union in the future, assigning it to assertNever(x) in the default branch causes a compile-time error until a new case is added",
          "It catches memory leaks in the browser at runtime",
          "It automatically writes the missing case statement for you",
          "It enables multi-threading in Node.js"
        ],
        correctAnswer: 0,
        explanation: "Because assertNever only accepts never, passing any unhandled union variant triggers a compile-time error: Argument of type 'NewVariant' is not assignable to parameter of type 'never'. This ensures every switch statement is updated when a union expands.",
        hint: "If a new variant falls through to the default branch, can it be passed to a function expecting 'never'?",
        hintCostXP: 5,
      },
      {
        id: "ts13-q3",
        type: "code_output",
        title: "Exhaustive Error Message Identification",
        prompt: "If you add `'sms'` to a `NotificationChannel = 'email' | 'push'` union, what compile-time error does `assertNever(channel)` produce in an un-updated switch?",
        codeSnippet: `type NotificationChannel = 'email' | 'push' | 'sms';

function send(channel: NotificationChannel) {
  switch (channel) {
    case 'email': return sendEmail();
    case 'push': return sendPush();
    default:
      // What error occurs here on channel?
      return assertNever(channel);
  }
}`,
        language: "typescript",
        options: [
          "Argument of type 'string' (or 'sms') is not assignable to parameter of type 'never'",
          "RuntimeError: Out of memory in switch statement",
          "SyntaxError: Unexpected default case in function",
          "Warning: Unreachable code detected"
        ],
        correctAnswer: 0,
        explanation: "TypeScript flags that the unhandled variant 'sms' fell through to the default branch, where it cannot be assigned to the expected parameter type 'never'.",
        hint: "What happens when an unhandled string literal is assigned to parameter type 'never'?",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TS-14: Generic Functions & Type Parameters
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts14",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts14-generic-functions",
    lessonCode: "TS-14",
    lessonTitle: "Generic Functions & Type Parameters",
    description: "Assess your understanding of generic type parameters <T>, type argument inference, and capturing relationships.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts14-q1",
        type: "multiple_choice",
        title: "Purpose of Generic Type Parameters",
        prompt: "What is the primary advantage of writing `function identity<T>(arg: T): T` instead of `function identity(arg: any): any`?",
        options: [
          "Generics preserve the exact type relationship between the input argument and the return value without losing type safety",
          "Generics compile to smaller machine code at runtime",
          "Generics prevent the function from accepting strings or numbers",
          "Generics automatically validate inputs against a database schema"
        ],
        correctAnswer: 0,
        explanation: "Using 'any' causes the return value to be 'any', forfeiting all type safety and autocomplete. Generics capture the caller's actual type as T and guarantee that the return value retains that exact type.",
        hint: "Think about what happens to the return type when 'any' is used versus a type variable.",
        hintCostXP: 5,
      },
      {
        id: "ts14-q2",
        type: "multiple_choice",
        title: "Type Argument Inference",
        prompt: "When calling a generic function `function firstItem<T>(items: T[]): T`, do callers have to write `firstItem<string>(['a', 'b'])` explicitly?",
        options: [
          "No, TypeScript automatically infers T from the argument types passed in",
          "Yes, TypeScript requires explicit type arguments on every generic function call",
          "Only if the array contains numbers",
          "Yes, because type inference only works with let variables"
        ],
        correctAnswer: 0,
        explanation: "TypeScript has powerful type argument inference: it inspects the values passed to the function and automatically assigns the inferred type to T without requiring manual <Type> annotations.",
        hint: "Can the compiler figure out T from the arguments passed?",
        hintCostXP: 5,
      },
      {
        id: "ts14-q3",
        type: "code_output",
        title: "Multiple Type Parameters",
        prompt: "Which function signature correctly defines a generic utility that combines two values of potentially different types into a tuple?",
        codeSnippet: `// Which signature allows first and second to have independent types?
const pair = makePair("hello", 42); // should be [string, number]`,
        language: "typescript",
        options: [
          "function makePair<T, U>(first: T, second: U): [T, U]",
          "function makePair<T>(first: T, second: T): [T, T]",
          "function makePair(first: T, second: U): [T, U]",
          "function makePair<T | U>(first: T, second: U): [T, U]"
        ],
        correctAnswer: 0,
        explanation: "To support two independent types, declare two type parameters in angle brackets: <T, U>. If you only use <T>, both arguments are constrained to the same type.",
        hint: "Two independent types require two distinct type parameters.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TS-15: Generic Interfaces & Containers
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts15",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts15-generic-interfaces",
    lessonCode: "TS-15",
    lessonTitle: "Generic Interfaces & Containers",
    description: "Verify your ability to design reusable generic containers, API responses, and default type parameters.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts15-q1",
        type: "code_output",
        title: "Generic Interface Syntax",
        prompt: "What is the correct syntax for declaring a generic ApiResponse interface that wraps any data payload type?",
        codeSnippet: `// How do we define ApiResponse with a generic payload?`,
        language: "typescript",
        options: [
          "interface ApiResponse<T> { status: number; data: T; }",
          "interface ApiResponse: T { status: number; data: T; }",
          "interface ApiResponse { status: number; data: <T>; }",
          "interface<T> ApiResponse { status: number; data: T; }"
        ],
        correctAnswer: 0,
        explanation: "Type parameters on interfaces are declared immediately after the interface name in angle brackets: interface ApiResponse<T> { ... }.",
        hint: "Where do angle brackets belong on an interface declaration?",
        hintCostXP: 5,
      },
      {
        id: "ts15-q2",
        type: "multiple_choice",
        title: "Default Type Parameters",
        prompt: "What does the declaration `interface CacheEntry<T = string> { value: T; timestamp: number; }` allow callers to do?",
        options: [
          "Callers can write CacheEntry without type arguments, and T will default to string",
          "It forces T to always be a string and forbids any other type",
          "It makes value an optional property",
          "It initializes value to an empty string at runtime"
        ],
        correctAnswer: 0,
        explanation: "Default type parameters (T = DefaultType) make the type argument optional when referencing the interface. If omitted, T defaults to string.",
        hint: "Think about default values in standard function parameters.",
        hintCostXP: 5,
      },
      {
        id: "ts15-q3",
        type: "multiple_choice",
        title: "Generic Discriminated Unions",
        prompt: "Consider the type `type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };`. How does TypeScript handle this when `result.ok === true`?",
        options: [
          "TypeScript narrows result so that result.value of type T is accessible and error cannot be accessed",
          "result.value remains T | E until cast",
          "A runtime TypeError is thrown if error is accessed",
          "It requires converting T to a string"
        ],
        correctAnswer: 0,
        explanation: "Because Result<T, E> is a discriminated union with tag ok, branching on if (result.ok) automatically narrows to { ok: true; value: T }, giving full access to value of type T.",
        hint: "How does control flow analysis interact with the 'ok: true' tag?",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TS-16: Generic Constraints (extends)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts16",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts16-generic-constraints",
    lessonCode: "TS-16",
    lessonTitle: "Generic Constraints (extends)",
    description: "Master restricting type parameters using extends to guarantee property availability while preserving type fidelity.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts16-q1",
        type: "multiple_choice",
        title: "Generic Constraints Syntax",
        prompt: "Why does the unconstrained generic function `function logId<T>(item: T) { console.log(item.id); }` fail to compile?",
        options: [
          "Because T could be any type (like number or boolean) that has no id property; you must constrain T with <T extends { id: string }>",
          "Because console.log cannot print generic values",
          "Because id must always be private in TypeScript",
          "Because generic functions cannot access object properties"
        ],
        correctAnswer: 0,
        explanation: "Without a constraint, T represents literally any type. Since primitives and empty objects do not have an id property, TypeScript prevents property access. Adding <T extends { id: string }> guarantees that id exists on whatever type is passed.",
        hint: "Does a number or boolean have an 'id' property?",
        hintCostXP: 5,
      },
      {
        id: "ts16-q2",
        type: "multiple_choice",
        title: "Structural Compatibility with Constraints",
        prompt: "In the constraint `<T extends Lengthwise>`, what does the `extends` keyword signify?",
        options: [
          "T must satisfy the structural shape of Lengthwise (it can have additional properties, but must have at least what Lengthwise requires)",
          "T must be a subclass created with the JavaScript class keyword",
          "T must be identical to Lengthwise and cannot have any extra properties",
          "T will replace Lengthwise in the prototype chain"
        ],
        correctAnswer: 0,
        explanation: "In generic constraints, extends denotes structural compatibility (subtyping). T can be any type as long as it contains the properties required by Lengthwise.",
        hint: "Remember TypeScript's structural typing: can an object have extra properties?",
        hintCostXP: 5,
      },
      {
        id: "ts16-q3",
        type: "code_output",
        title: "Constraining with Union Types",
        prompt: "How can you constrain a generic type parameter T to only allow primitive strings or numbers?",
        codeSnippet: `// Which syntax correctly restricts T to string or number?`,
        language: "typescript",
        options: [
          "function format<T extends string | number>(val: T)",
          "function format<T: string | number>(val: T)",
          "function format<T implements string, number>(val: T)",
          "function format<T is string | number>(val: T)"
        ],
        correctAnswer: 0,
        explanation: "The extends keyword is used with union types to restrict T to specific allowed types: <T extends string | number>.",
        hint: "The extends keyword is used for all generic constraints.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TS-17: Generics with keyof & Property Lookup
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts17",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts17-generics-keyof",
    lessonCode: "TS-17",
    lessonTitle: "Generics with keyof & Property Lookup",
    description: "Combine K extends keyof T with indexed access T[K] for 100% type-safe object property access and utilities.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts17-q1",
        type: "multiple_choice",
        title: "The keyof Operator",
        prompt: "If `interface User { id: number; name: string; email: string; }`, what is the type produced by `keyof User`?",
        options: [
          "'id' | 'name' | 'email'",
          "string[]",
          "[number, string, string]",
          "UserKeys class"
        ],
        correctAnswer: 0,
        explanation: "The keyof operator extracts all known public property keys of an object type and returns them as a union of string literal types.",
        hint: "What literal strings represent the property names of User?",
        hintCostXP: 5,
      },
      {
        id: "ts17-q2",
        type: "multiple_choice",
        title: "Type-Safe Property Lookup with keyof",
        prompt: "What is the return type of `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]` when called with `getProperty(user, 'name')` where `user.name` is `string`?",
        options: [
          "string",
          "any",
          "keyof User",
          "unknown"
        ],
        correctAnswer: 0,
        explanation: "T[K] is an indexed access type: it looks up the value type corresponding to key K on object T. For user and 'name', T[K] evaluates precisely to string.",
        hint: "What type is the 'name' property on the user object?",
        hintCostXP: 5,
      },
      {
        id: "ts17-q3",
        type: "code_output",
        title: "Protection Against Property Typos",
        prompt: "What happens if a developer calls `getProperty(user, 'emial')` with a typo in the key name?",
        codeSnippet: `const user = { id: 1, name: "Alice", email: "alice@example.com" };
getProperty(user, "emial"); // What happens here?`,
        language: "typescript",
        options: [
          "TypeScript reports a compile-time error: Argument of type '\"emial\"' is not assignable to parameter of type '\"id\" | \"name\" | \"email\"'",
          "The function returns undefined silently with no compiler error",
          "The browser throws a runtime SyntaxError",
          "TypeScript automatically corrects the typo to 'email'"
        ],
        correctAnswer: 0,
        explanation: "Because K is constrained by extends keyof T, passing any string that is not a valid property of T causes an immediate compile-time error, preventing runtime undefined bugs.",
        hint: "Is 'emial' a valid key in keyof User?",
        hintCostXP: 5,
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // TS-18: Class Fields & Access Modifiers
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts18",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts18-class-access-modifiers",
    lessonCode: "TS-18",
    lessonTitle: "Class Fields & Access Modifiers",
    description: "Master public, protected, private, readonly, and the difference between compile-time private and ECMAScript #private.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts18-q1",
        type: "multiple_choice",
        title: "The protected Access Modifier",
        prompt: "Which of the following statements accurately describes the `protected` access modifier in TypeScript?",
        options: [
          "The member is accessible within the declaring class and its subclasses, but not outside on instances",
          "The member is accessible anywhere in the entire codebase like public",
          "The member is accessible only inside the exact declaring class and blocked even from subclasses",
          "The member is erased and converted into a global variable at runtime"
        ],
        correctAnswer: 0,
        explanation: "`protected` members can be read and invoked inside the class and any classes that extend it (subclasses), while remaining hidden from external consumers.",
        hint: "Can a derived child class access protected members of its parent?",
        hintCostXP: 5,
      },
      {
        id: "ts18-q2",
        type: "multiple_choice",
        title: "TypeScript private vs Native JS #private",
        prompt: "What is the critical distinction between TypeScript's `private` keyword and JavaScript's native `#privateField` syntax?",
        options: [
          "`private` is enforced purely at compile time and erased at runtime, whereas `#field` provides true hard runtime privacy enforced by the JavaScript engine",
          "`private` creates a symbol while `#field` creates an immutable object",
          "`#field` is deprecated in modern ECMAScript",
          "`private` can be accessed by subclasses while `#field` cannot"
        ],
        correctAnswer: 0,
        explanation: "TypeScript's `private` keyword is a soft compile-time barrier stripped during compilation (inspectable via `(obj as any).privateField`), whereas JS native `#private` creates a hard, unforgeable runtime boundary.",
        hint: "Does TypeScript's private modifier exist after code is compiled to JavaScript?",
        hintCostXP: 5,
      },
      {
        id: "ts18-q3",
        type: "code_output",
        title: "Immutability with readonly Class Properties",
        prompt: "What happens when the `updateAccount` method attempts to reassign the `readonly` property?",
        codeSnippet: `class BankAccount {
  readonly accountNumber: string;
  constructor(acc: string) {
    this.accountNumber = acc;
  }
  updateAccount(newAcc: string) {
    this.accountNumber = newAcc;
  }
}`,
        language: "typescript",
        options: [
          "TypeScript raises a compile-time error: Cannot assign to 'accountNumber' because it is a read-only property",
          "The reassignment succeeds silently at compile time and runtime",
          "JavaScript throws a runtime ReferenceError",
          "The class automatically clones itself with the new account number"
        ],
        correctAnswer: 0,
        explanation: "Properties marked readonly may only be assigned either at declaration or within the constructor. Attempting to assign them inside other methods triggers a compile-time error.",
        hint: "Can readonly class fields be mutated inside regular methods?",
        hintCostXP: 5,
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // TS-19: Parameter Properties & Getters/Setters
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts19",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts19-parameter-properties",
    lessonCode: "TS-19",
    lessonTitle: "Parameter Properties & Getters/Setters",
    description: "Assess constructor parameter property shorthand and type-safe getter/setter accessor pairs.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts19-q1",
        type: "multiple_choice",
        title: "Constructor Parameter Properties",
        prompt: "What does the declaration `constructor(public readonly id: string, private secret: string)` automatically generate?",
        options: [
          "It declares both id and secret as class fields with the specified modifiers and assigns constructor arguments to this.id and this.secret",
          "It requires manual assignments `this.id = id;` inside the constructor body",
          "It creates two global variables outside the class",
          "It makes the constructor return a plain tuple"
        ],
        correctAnswer: 0,
        explanation: "Prefixing a constructor parameter with an access modifier (public, private, protected) or readonly turns it into a Parameter Property, automatically declaring the member field and initializing it with the incoming argument.",
        hint: "Does parameter property syntax eliminate the need for manual `this.field = field` boilerplate?",
        hintCostXP: 5,
      },
      {
        id: "ts19-q2",
        type: "multiple_choice",
        title: "Getter and Setter Type Compatibility",
        prompt: "In TypeScript, what rule applies to the return type of a getter and the parameter type of its corresponding setter?",
        options: [
          "The setter parameter type must be assignable to the getter return type",
          "Getters and setters cannot share the same property name",
          "The getter must return void while the setter returns boolean",
          "Setters can take multiple arguments"
        ],
        correctAnswer: 0,
        explanation: "TypeScript requires that the parameter type of a setter be compatible with (assignable to) the return type of its corresponding getter to preserve consistent property access semantics.",
        hint: "Can a setter accept a type that contradicts what the getter returns?",
        hintCostXP: 5,
      },
      {
        id: "ts19-q3",
        type: "code_output",
        title: "Getter Without a Setter",
        prompt: "What behavior occurs when code attempts to assign a value to a getter that has no corresponding setter?",
        codeSnippet: `class User {
  constructor(public firstName: string, public lastName: string) {}
  get fullName(): string {
    return \`\${this.firstName} \${this.lastName}\`;
  }
}
const u = new User("Ada", "Lovelace");
u.fullName = "Grace Hopper";`,
        language: "typescript",
        options: [
          "TypeScript reports a compile-time error: Cannot assign to 'fullName' because it is a read-only property",
          "The property is assigned and overwrites the getter function",
          "A runtime TypeError is thrown by the browser only in non-strict mode",
          "The firstName is updated to 'Grace' automatically"
        ],
        correctAnswer: 0,
        explanation: "A getter without a matching setter is automatically inferred as readonly by TypeScript, causing the compiler to reject any assignment attempts.",
        hint: "Can you assign to a property that only has a getter?",
        hintCostXP: 5,
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // TS-20: Abstract Classes & Interface Implementation
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts20",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts20-abstract-classes",
    lessonCode: "TS-20",
    lessonTitle: "Abstract Classes & Interface Implementation",
    description: "Differentiate abstract classes from interfaces, enforce polymorphic method contracts, and master 'implements'.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts20-q1",
        type: "multiple_choice",
        title: "Instantiating Abstract Classes",
        prompt: "What happens if you attempt to directly instantiate an abstract class using `new BaseService()`?",
        options: [
          "TypeScript raises a compile-time error: Cannot create an instance of an abstract class",
          "The constructor returns null",
          "JavaScript throws a runtime SyntaxError",
          "TypeScript compiles normally and creates an empty object"
        ],
        correctAnswer: 0,
        explanation: "Abstract classes are blueprints intended exclusively for extension by subclasses. TypeScript strictly forbids direct instantiation via `new`.",
        hint: "Can you directly call `new` on a class marked with the `abstract` keyword?",
        hintCostXP: 5,
      },
      {
        id: "ts20-q2",
        type: "multiple_choice",
        title: "Abstract Class vs Interface",
        prompt: "When should an architect choose an `abstract class` over an `interface` in TypeScript?",
        options: [
          "When you need to provide shared, reusable method implementations and state alongside abstract method declarations",
          "When you want zero runtime JavaScript code emitted",
          "When you need to describe pure data shapes for JSON responses",
          "When multiple inheritance from 10 different types is required"
        ],
        correctAnswer: 0,
        explanation: "Interfaces are erased at runtime and cannot contain any implementation code. An abstract class emits a real JavaScript class that subclasses can inherit implementation and state from.",
        hint: "Which of the two can contain actual method implementation code?",
        hintCostXP: 5,
      },
      {
        id: "ts20-q3",
        type: "multiple_choice",
        title: "Implementing Abstract Methods",
        prompt: "If a non-abstract subclass extends an abstract class containing `abstract render(): string`, what must the subclass do?",
        options: [
          "The subclass must provide a concrete implementation of `render(): string`, otherwise TypeScript will produce a compile error",
          "The subclass can omit render() and inherit an empty function",
          "The subclass must mark render() as private",
          "The subclass must convert render() into a constructor"
        ],
        correctAnswer: 0,
        explanation: "Any concrete (non-abstract) subclass extending an abstract class must implement all inherited abstract members to satisfy the contractual blueprint.",
        hint: "Can a concrete subclass leave an inherited abstract method unimplemented?",
        hintCostXP: 5,
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // TS-21: Indexed Access & typeof Types
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts21",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts21-indexed-access-typeof",
    lessonCode: "TS-21",
    lessonTitle: "Indexed Access & typeof Types",
    description: "Master indexed access lookups (T[K], T[number]) and extracting types from runtime JavaScript objects with typeof.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts21-q1",
        type: "multiple_choice",
        title: "Indexed Access on Array Tuples",
        prompt: "Given `const roles = ['admin', 'editor', 'viewer'] as const;`, what type is produced by `type Role = (typeof roles)[number];`?",
        options: [
          "'admin' | 'editor' | 'viewer'",
          "string[]",
          "number",
          "['admin', 'editor', 'viewer']"
        ],
        correctAnswer: 0,
        explanation: "`typeof roles` captures the readonly tuple type, and indexing by `[number]` extracts the union of all element literal types: 'admin' | 'editor' | 'viewer'.",
        hint: "What happens when you index a const array tuple with [number]?",
        hintCostXP: 5,
      },
      {
        id: "ts21-q2",
        type: "multiple_choice",
        title: "Type-Level typeof Operator",
        prompt: "What does `typeof` do when used in a TypeScript type position (e.g. `type Config = typeof defaultConfig;`)?",
        options: [
          "It queries TypeScript's static type system to extract the compile-time type of an existing JavaScript runtime value or variable",
          "It returns the runtime string 'object' or 'function'",
          "It executes the variable to inspect its prototype",
          "It converts the variable into a JSON string"
        ],
        correctAnswer: 0,
        explanation: "In type positions, `typeof` is a type operator that inspects a runtime variable or object and produces its static TypeScript type.",
        hint: "Does typeof in a type position evaluate at compile time or runtime?",
        hintCostXP: 5,
      },
      {
        id: "ts21-q3",
        type: "multiple_choice",
        title: "Chained Indexed Access",
        prompt: "Given `interface Response { user: { profile: { avatarUrl: string } } }`, how do you access the type of `avatarUrl` directly?",
        options: [
          "Response['user']['profile']['avatarUrl']",
          "Response.user.profile.avatarUrl",
          "typeof Response.user.profile.avatarUrl",
          "Response->user->profile->avatarUrl"
        ],
        correctAnswer: 0,
        explanation: "Indexed access types use bracket notation `T[K]`. You can chain them `Response['user']['profile']['avatarUrl']` to drill down to deeply nested property types.",
        hint: "Which syntax is used to look up properties inside a type definition?",
        hintCostXP: 5,
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // TS-22: Conditional Types & infer
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts22",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts22-conditional-types-infer",
    lessonCode: "TS-22",
    lessonTitle: "Conditional Types & infer",
    description: "Master type-level ternary branching (T extends U ? X : Y), distributive conditional types, and pattern matching with infer.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts22-q1",
        type: "multiple_choice",
        title: "Conditional Type Branching",
        prompt: "Given `type IsString<T> = T extends string ? true : false;`, what is `type Result = IsString<42>;`?",
        options: [
          "false",
          "true",
          "boolean",
          "never"
        ],
        correctAnswer: 0,
        explanation: "Because 42 does not extend (is not assignable to) string, the conditional expression branches to the false branch, evaluating to the boolean literal type false.",
        hint: "Is number 42 assignable to type string?",
        hintCostXP: 5,
      },
      {
        id: "ts22-q2",
        type: "multiple_choice",
        title: "Distributive Conditional Types",
        prompt: "What happens when a naked type parameter union like `string | number[]` is passed to `type ToArray<T> = T extends any ? T[] : never`?",
        options: [
          "The condition distributes over each union member: (string extends any ? string[] : never) | (number[] extends any ? number[][] : never) -> string[] | number[][]",
          "The entire union is wrapped as (string | number[])[]",
          "TypeScript throws a compile error because unions cannot be conditioned",
          "It resolves to any[]"
        ],
        correctAnswer: 0,
        explanation: "When a naked type parameter T is a union, conditional types distribute over each variant individually and combine the results into a union.",
        hint: "Do naked type parameters in conditional types distribute across union members?",
        hintCostXP: 5,
      },
      {
        id: "ts22-q3",
        type: "multiple_choice",
        title: "Pattern Matching with infer",
        prompt: "How does `type UnpackPromise<T> = T extends Promise<infer R> ? R : T;` extract the inner resolved type of a Promise?",
        options: [
          "`infer R` introduces a pattern-matching type variable that TypeScript deduces from the type structure inside Promise",
          "`infer` runs a runtime async await on the promise",
          "`infer R` forces R to be any",
          "`infer` is a decorator for class constructors"
        ],
        correctAnswer: 0,
        explanation: "`infer` introduces a fresh type variable in the extends clause of a conditional type, letting the compiler deduce whatever type occupies that structural position.",
        hint: "What does the `infer` keyword do inside a conditional type's extends clause?",
        hintCostXP: 5,
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // TS-23: Mapped Types & Template Literals
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts23",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts23-mapped-template-types",
    lessonCode: "TS-23",
    lessonTitle: "Mapped Types & Template Literals",
    description: "Transform object keys with [K in keyof T], key remapping using 'as', and string pattern matching with template literal types.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts23-q1",
        type: "multiple_choice",
        title: "Mapped Type Transformation",
        prompt: "What does the mapped type `type Stringify<T> = { [K in keyof T]: string };` do to an interface?",
        options: [
          "It produces a new type where all property names of T are retained, but every property's value type is changed to string",
          "It converts all keys of T to uppercase",
          "It serializes the object to JSON at runtime",
          "It makes all properties of T optional"
        ],
        correctAnswer: 0,
        explanation: "`[K in keyof T]` iterates over each key in T, producing a new object type with identical keys where each property type evaluates to string.",
        hint: "Does the mapped type iterate over the keys or values of T?",
        hintCostXP: 5,
      },
      {
        id: "ts23-q2",
        type: "multiple_choice",
        title: "Key Remapping with as",
        prompt: "How do you remap keys to prefix them with 'get' in a mapped type (e.g. converting `name` to `getName`)?",
        options: [
          "[K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]",
          "[K in keyof T + 'get']: () => T[K]",
          "[K in keyof T -> getK]: () => T[K]",
          "[K in keyof T]: 'get' + K"
        ],
        correctAnswer: 0,
        explanation: "The `as` clause in mapped types allows remapping keys via template literal types and intrinsic string manipulation utilities like Capitalize.",
        hint: "Which clause is used in mapped types to transform the property key itself?",
        hintCostXP: 5,
      },
      {
        id: "ts23-q3",
        type: "multiple_choice",
        title: "Template Literal Type Combinations",
        prompt: "Given `type Event = 'click' | 'hover';` and `type Target = 'btn' | 'link';`, what union type is produced by `type EventId = `${Event}:${Target}`;`?",
        options: [
          "'click:btn' | 'click:link' | 'hover:btn' | 'hover:link'",
          "'click:Target' | 'hover:Target'",
          "string",
          "EventTarget"
        ],
        correctAnswer: 0,
        explanation: "Template literal types distribute across string literal unions, calculating the cross-product of all possible permutations.",
        hint: "How do template literal types handle unions in their placeholder positions?",
        hintCostXP: 5,
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // TS-24: Built-in Utility Types
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-typescript-ts24",
    trackKey: "typescript",
    trackTitle: "TypeScript",
    lessonSlug: "ts24-utility-types",
    lessonCode: "TS-24",
    lessonTitle: "Built-in Utility Types",
    description: "Master TypeScript's standard utility types: Partial, Required, Readonly, Record, Pick, Omit, Exclude, and ReturnType.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "ts24-q1",
        type: "multiple_choice",
        title: "Pick vs Omit",
        prompt: "If `interface User { id: number; name: string; email: string; role: string; }`, which utility type produces an object with only `id` and `email`?",
        options: [
          "Pick<User, 'id' | 'email'>",
          "Omit<User, 'id' | 'email'>",
          "Exclude<User, 'id' | 'email'>",
          "Extract<User, 'id' | 'email'>"
        ],
        correctAnswer: 0,
        explanation: "Pick<T, K> constructs a type by selecting the set of properties K from T. Omit<T, K> removes them.",
        hint: "Which utility explicitly selects specified properties from an interface?",
        hintCostXP: 5,
      },
      {
        id: "ts24-q2",
        type: "multiple_choice",
        title: "Exclude vs Omit",
        prompt: "What is the crucial difference between `Exclude<T, U>` and `Omit<T, K>`?",
        options: [
          "Exclude operates on union types to remove matching members, whereas Omit operates on object types to remove property keys",
          "Exclude is deprecated in favor of Omit",
          "Exclude works on arrays, while Omit works on sets",
          "Exclude is evaluated at runtime, while Omit is compile-time"
        ],
        correctAnswer: 0,
        explanation: "Exclude<Union, ExcludedMembers> operates on unions (e.g. 'a' | 'b' | 'c'), while Omit<ObjectType, Keys> operates on object interfaces to drop specified properties.",
        hint: "Does Exclude operate on unions or object keys?",
        hintCostXP: 5,
      },
      {
        id: "ts24-q3",
        type: "multiple_choice",
        title: "The ReturnType Utility",
        prompt: "What is the result of `type FuncResult = ReturnType<typeof fetchUserData>;` where `function fetchUserData(): Promise<User>`?",
        options: [
          "Promise<User>",
          "User",
          "() => Promise<User>",
          "void"
        ],
        correctAnswer: 0,
        explanation: "ReturnType<T> extracts the return type of a function type. For () => Promise<User>, ReturnType evaluates directly to Promise<User>.",
        hint: "What is the exact return type of the fetchUserData function signature?",
        hintCostXP: 5,
      },
    ],
  },
];
