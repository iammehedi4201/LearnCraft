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
];
