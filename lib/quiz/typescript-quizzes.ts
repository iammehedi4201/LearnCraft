/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TYPESCRIPT CURRICULUM QUIZZES — LearnCraft
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Authoritative, high-yield module quizzes for all 18 lessons in the
 * TypeScript track (TS-01 through TS-18).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { ModuleQuiz } from "./quiz-types";

export const TYPESCRIPT_MODULE_QUIZZES: ModuleQuiz[] = [
  {
    "id": "quiz-typescript-ts01",
    "trackKey": "typescript",
    "trackTitle": "TypeScript",
    "lessonSlug": "ts01-what-typescript-does",
    "lessonCode": "TS-01",
    "lessonTitle": "What TypeScript Does",
    "description": "Assess your understanding of static typing, compile-time error checking, and type erasure.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "ts01-q1",
        "type": "code_output",
        "title": "Runtime Execution & Type Erasure",
        "prompt": "What will be printed to the console when the following compiled JavaScript runs in Node.js or the browser?",
        "codeSnippet": "let userName: string = \"Rina\";\nuserName = \"Mehedi\";\nconsole.log(typeof userName);",
        "language": "typescript",
        "options": [
          "'string'",
          "'userName'",
          "'undefined'",
          "TypeScript error"
        ],
        "correctAnswer": 0,
        "explanation": "TypeScript compiles to standard JavaScript. At runtime, userName is a regular string variable, so typeof evaluates to 'string'.",
        "hint": "Types are checked at compile time; standard JavaScript runs at runtime.",
        "hintCostXP": 5
      },
      {
        "id": "ts01-q2",
        "type": "multiple_choice",
        "title": "Compile-Time Mistake Detection",
        "prompt": "If you declare `let price: number = 500`, what kind of mistake can TypeScript catch before your code runs?",
        "options": [
          "Assigning text such as 'five hundred' to price",
          "A network timeout when fetching the price from an API",
          "The user's credit card failing payment validation",
          "The computer running out of RAM"
        ],
        "correctAnswer": 0,
        "explanation": "TypeScript checks variable types at compile time and warns you immediately if you attempt to assign an incompatible type like a string to a number variable.",
        "hint": "Think about the scenario question: what does number tell you?",
        "hintCostXP": 5
      },
      {
        "id": "ts01-q3",
        "type": "multiple_choice",
        "title": "TypeScript Limitations",
        "prompt": "Which of the following is true regarding TypeScript's type checking?",
        "options": [
          "Types help catch mistakes before code runs, but do not automatically validate data received from an API at runtime",
          "TypeScript types convert into runtime if-statements that check incoming JSON payloads",
          "TypeScript eliminates 100% of all software bugs and logical errors",
          "TypeScript runs slower than JavaScript because types are checked on every line at runtime"
        ],
        "correctAnswer": 0,
        "explanation": "TypeScript types exist solely at compile time. They do not find every bug and do not automatically validate live incoming network payloads at runtime.",
        "hint": "Remember the core rule: types do not automatically validate API data at runtime.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-typescript-ts02",
    "trackKey": "typescript",
    "trackTitle": "TypeScript",
    "lessonSlug": "ts02-type-annotations-inference",
    "lessonCode": "TS-02",
    "lessonTitle": "Type Annotations and Type Inference",
    "description": "Evaluate your understanding of explicit annotations versus automatic type inference.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "ts02-q1",
        "type": "code_output",
        "title": "Inferred Variable Types",
        "prompt": "What will TypeScript report when checking the following code?",
        "codeSnippet": "let city = \"Dhaka\";\n// @ts-expect-error test\ncity = 10;",
        "language": "typescript",
        "options": [
          "A type error: Type 'number' is not assignable to type 'string'",
          "No error: city dynamically changes into a number",
          "A syntax error on the variable declaration",
          "A runtime ReferenceError"
        ],
        "correctAnswer": 0,
        "explanation": "Because city was initialized with 'Dhaka', TypeScript inferred its type as string. Assigning a number triggers a compile-time type error.",
        "hint": "Type inference assigns the type from the initial value.",
        "hintCostXP": 5
      },
      {
        "id": "ts02-q2",
        "type": "multiple_choice",
        "title": "When Annotations Are Needed",
        "prompt": "You write `const total = 100`. Do you need to add `: number`?",
        "options": [
          "No, because TypeScript can see that 100 is a number and infers it automatically",
          "Yes, because TypeScript cannot infer types for constants",
          "Yes, omitting the annotation causes a compiler warning in strict mode",
          "No, but omitting it causes total to have the type 'any'"
        ],
        "correctAnswer": 0,
        "explanation": "TypeScript sees that 100 is a number and automatically works out the type. Adding `: number` is valid syntax, but not needed here.",
        "hint": "Recall the lesson scenario: let inference handle obvious cases.",
        "hintCostXP": 5
      },
      {
        "id": "ts02-q3",
        "type": "multiple_choice",
        "title": "Best Practice for Annotations",
        "prompt": "When is adding an explicit type annotation most recommended?",
        "options": [
          "When it makes the code clearer or when TypeScript cannot work out the intended type",
          "On every single variable, parameter, and property without exception",
          "Only when writing React components in Next.js",
          "Never; annotations are deprecated in favor of 100% inference"
        ],
        "correctAnswer": 0,
        "explanation": "Add explicit types when it clarifies intent or when TypeScript lacks enough context to deduce the type. Let inference handle obvious cases.",
        "hint": "Balance clarity with conciseness.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-typescript-ts03",
    "trackKey": "typescript",
    "trackTitle": "TypeScript",
    "lessonSlug": "ts03-basic-types-arrays",
    "lessonCode": "TS-03",
    "lessonTitle": "Basic Types and Arrays",
    "description": "Verify your grasp of basic primitives and typed arrays.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "ts03-q1",
        "type": "multiple_choice",
        "title": "Favorite Books Array Type",
        "prompt": "A list should contain only a user's favorite book titles. Which type fits the list, and why?",
        "options": [
          "string[], because every book title is text",
          "number[], because books have page numbers",
          "boolean[], because books are either read or unread",
          "any[], because book titles can contain symbols"
        ],
        "correctAnswer": 0,
        "explanation": "Book titles are text, so `string[]` accurately restricts the list to strings only.",
        "hint": "Think about Dune or Matilda.",
        "hintCostXP": 5
      },
      {
        "id": "ts03-q2",
        "type": "code_output",
        "title": "Array Type Enforcement",
        "prompt": "What will happen if you run `scores.push('eighty')` on `let scores: number[] = [85, 90, 78]`?",
        "codeSnippet": "let scores: number[] = [85, 90, 78];\n// @ts-expect-error\nscores.push(\"eighty\");",
        "language": "typescript",
        "options": [
          "TypeScript reports: Argument of type 'string' is not assignable to parameter of type 'number'",
          "The string is converted to NaN and appended to the array",
          "TypeScript silently retypes the array to (number | string)[]",
          "The code compiles and logs 'eighty' at index 3"
        ],
        "correctAnswer": 0,
        "explanation": "Because scores is typed as number[], TypeScript rejects pushing strings into the array.",
        "hint": "Typed arrays are protected against incompatible elements.",
        "hintCostXP": 5
      },
      {
        "id": "ts03-q3",
        "type": "multiple_choice",
        "title": "Core Primitives",
        "prompt": "Which three types are the most frequently used basic primitives in TypeScript?",
        "options": [
          "string, number, and boolean",
          "varchar, int, and bit",
          "char, float, and bool",
          "text, decimal, and binary"
        ],
        "correctAnswer": 0,
        "explanation": "TypeScript uses lowercase JavaScript primitives: string for text, number for numbers, and boolean for true/false.",
        "hint": "JavaScript primitive names are lowercase.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-typescript-ts04",
    "trackKey": "typescript",
    "trackTitle": "TypeScript",
    "lessonSlug": "ts04-function-parameters-return-types",
    "lessonCode": "TS-04",
    "lessonTitle": "Function Parameters and Return Types",
    "description": "Assess your ability to establish clear function contracts and return types.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "ts04-q1",
        "type": "multiple_choice",
        "title": "Non-Returning Function Type",
        "prompt": "A function sends an email and does not return a useful value. What return type should you use?",
        "options": [
          "void",
          "string",
          "null",
          "never"
        ],
        "correctAnswer": 0,
        "explanation": "If a function does not return a useful value, use `void` as its return type.",
        "hint": "Think about function sendEmail(): void.",
        "hintCostXP": 5
      },
      {
        "id": "ts04-q2",
        "type": "code_output",
        "title": "Function Argument Validation",
        "prompt": "What happens if a developer calls `calculateTotal('250', 3)` on `function calculateTotal(price: number, quantity: number): number`?",
        "codeSnippet": "function calculateTotal(price: number, quantity: number): number {\n  return price * quantity;\n}\n\n// calculateTotal(\"250\", 3);",
        "language": "typescript",
        "options": [
          "TypeScript reports an error because '250' is a string, not a number",
          "JavaScript automatically parses '250' to 250 and returns 750 with no warning",
          "TypeScript converts quantity into a string and returns '250250250'",
          "The compiler crashes with an unhandled exception"
        ],
        "correctAnswer": 0,
        "explanation": "TypeScript checks argument types against parameter signatures and reports an error when a string is passed where a number is required.",
        "hint": "Parameter annotations act as a strict agreement.",
        "hintCostXP": 5
      },
      {
        "id": "ts04-q3",
        "type": "multiple_choice",
        "title": "Purpose of Function Types",
        "prompt": "Why should you write clear function parameter and return types?",
        "options": [
          "They act as a clear agreement between the function and the code that uses it",
          "They make the function run asynchronously on another CPU thread",
          "They allow the function to be called without parentheses",
          "They encrypt the function implementation from external inspection"
        ],
        "correctAnswer": 0,
        "explanation": "A clear function type documents what inputs are required and what output is guaranteed, preventing misunderstandings.",
        "hint": "Think of function types as contracts.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-typescript-ts05",
    "trackKey": "typescript",
    "trackTitle": "TypeScript",
    "lessonSlug": "ts05-object-types",
    "lessonCode": "TS-05",
    "lessonTitle": "Object Types",
    "description": "Test your understanding of object shapes and optional fields with ?.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "ts05-q1",
        "type": "multiple_choice",
        "title": "Optional Fields",
        "prompt": "A customer can create an account without adding a phone number. How would you describe the phone field so it is allowed to be missing?",
        "options": [
          "phone?: string",
          "phone: string | null",
          "phone: optional(string)",
          "phone: string = undefined"
        ],
        "correctAnswer": 0,
        "explanation": "Adding `?` after the property name (phone?: string) marks the field as optional, meaning the customer object can include it, but does not have to.",
        "hint": "The question mark modifier marks fields as optional.",
        "hintCostXP": 5
      },
      {
        "id": "ts05-q2",
        "type": "code_output",
        "title": "Reading Optional Properties",
        "prompt": "If `type User = { id: number; name: string; email?: string }`, what is the type of `user.email`?",
        "codeSnippet": "type User = { id: number; name: string; email?: string };\nconst user: User = { id: 1, name: \"Rina\" };\nconsole.log(user.email);",
        "language": "typescript",
        "options": [
          "string | undefined",
          "string",
          "null",
          "any"
        ],
        "correctAnswer": 0,
        "explanation": "Because email is optional, its value can be either string or undefined if omitted.",
        "hint": "Optional properties can be missing, leaving them undefined.",
        "hintCostXP": 5
      },
      {
        "id": "ts05-q3",
        "type": "multiple_choice",
        "title": "When to Use Object Types",
        "prompt": "When is creating an object type most appropriate?",
        "options": [
          "To describe structured data such as a user, product, order, or API response",
          "Only when defining classes that use inheritance",
          "Only when storing primitive numbers in local variables",
          "To replace standard JavaScript if statements"
        ],
        "correctAnswer": 0,
        "explanation": "Use object types whenever you need to model multi-field entities like users, products, or orders.",
        "hint": "Think about representing domain entities.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-typescript-ts06",
    "trackKey": "typescript",
    "trackTitle": "TypeScript",
    "lessonSlug": "ts06-type-and-interface",
    "lessonCode": "TS-06",
    "lessonTitle": "type and interface",
    "description": "Compare type aliases and interfaces for data modeling and interview preparation.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "ts06-q1",
        "type": "multiple_choice",
        "title": "Choosing Between type and interface",
        "prompt": "You need a type called `Status` that can be 'pending', 'success', or 'failed'. Would a type alias or an interface be the natural choice?",
        "options": [
          "A type alias, because it can describe a union of exact string choices",
          "An interface, because interfaces are faster to compile",
          "An interface, because type aliases cannot describe strings",
          "Neither; you must use a numeric enum"
        ],
        "correctAnswer": 0,
        "explanation": "Use a type alias because it can describe unions (`type Status = 'pending' | 'success' | 'failed'`). Interfaces are primarily used for object shapes.",
        "hint": "Interfaces cannot directly define a union of literal strings.",
        "hintCostXP": 5
      },
      {
        "id": "ts06-q2",
        "type": "multiple_choice",
        "title": "Common Interview Question: Difference",
        "prompt": "What is one important difference between `type` and `interface`?",
        "options": [
          "Both can describe object fields, but `type` can also describe unions, while `interface` is commonly used for object shapes and can be extended",
          "`type` runs at runtime, while `interface` is checked only at compile time",
          "`interface` can only be used with numbers, while `type` is for strings",
          "There is no difference whatsoever; they are 100% interchangeable synonyms"
        ],
        "correctAnswer": 0,
        "explanation": "Both describe object shapes. Type aliases can also name unions, primitives, and tuples. Interfaces can be extended with `extends` and support declaration merging.",
        "hint": "Recall the simple interview answer.",
        "hintCostXP": 5
      },
      {
        "id": "ts06-q3",
        "type": "code_output",
        "title": "Extending Object Contracts",
        "prompt": "What syntax allows an interface `Admin` to inherit the properties of interface `User`?",
        "codeSnippet": "interface User { id: number; name: string; }\n// How does Admin inherit from User?",
        "language": "typescript",
        "options": [
          "interface Admin extends User { permissions: string[]; }",
          "interface Admin implements User { permissions: string[]; }",
          "interface Admin imports User { permissions: string[]; }",
          "interface Admin = User + { permissions: string[]; }"
        ],
        "correctAnswer": 0,
        "explanation": "Interfaces use the `extends` keyword to inherit properties from another interface.",
        "hint": "Classes implement interfaces; interfaces extend interfaces.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-typescript-ts07",
    "trackKey": "typescript",
    "trackTitle": "TypeScript",
    "lessonSlug": "ts07-union-and-literal-types",
    "lessonCode": "TS-07",
    "lessonTitle": "Union Types and Literal Types",
    "description": "Assess your grasp of union types and exact literal sets.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "ts07-q1",
        "type": "multiple_choice",
        "title": "Modeling Order Status",
        "prompt": "An order can only be 'new', 'shipped', or 'delivered'. How would you describe those allowed states?",
        "options": [
          "type OrderStatus = 'new' | 'shipped' | 'delivered';",
          "type OrderStatus = ['new', 'shipped', 'delivered'];",
          "type OrderStatus = string;",
          "interface OrderStatus { status: 'all' }"
        ],
        "correctAnswer": 0,
        "explanation": "Use a union of literal types (`'new' | 'shipped' | 'delivered'`). TypeScript will warn if an invalid value like 'cancelled' is assigned unless added to the type.",
        "hint": "Use pipe | characters between literal strings.",
        "hintCostXP": 5
      },
      {
        "id": "ts07-q2",
        "type": "code_output",
        "title": "Multi-Type Union Assignment",
        "prompt": "Given `type UserId = string | number;`, which of the following assignments is valid?",
        "codeSnippet": "type UserId = string | number;\nlet id1: UserId = 42;\nlet id2: UserId = \"usr_99\";\n// let id3: UserId = true;",
        "language": "typescript",
        "options": [
          "Both id1 and id2 are valid; id3 is a TypeScript error",
          "Only id1 is valid; string IDs are rejected",
          "Only id2 is valid; numbers cannot be IDs",
          "All three are valid because unions allow any primitive"
        ],
        "correctAnswer": 0,
        "explanation": "UserId can be a string or a number. Assigning true causes an error because boolean is not in the union.",
        "hint": "A union allows only the explicitly listed member types.",
        "hintCostXP": 5
      },
      {
        "id": "ts07-q3",
        "type": "multiple_choice",
        "title": "Benefit of Literal Unions",
        "prompt": "Why are literal union types preferred over generic `string` for finite choices?",
        "options": [
          "They prevent typos and unsupported values from entering your application logic",
          "They compile to smaller binary bytecode files",
          "They enable automatic database migrations",
          "They make string concatenation instantaneous"
        ],
        "correctAnswer": 0,
        "explanation": "Literal unions make allowed choices clear and catch typos at compile time instead of failing silently at runtime.",
        "hint": "Think about catching misspelled status strings early.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-typescript-ts08",
    "trackKey": "typescript",
    "trackTitle": "TypeScript",
    "lessonSlug": "ts08-optional-values-null-undefined",
    "lessonCode": "TS-08",
    "lessonTitle": "Optional Values, null, and undefined",
    "description": "Verify your ability to safely handle missing data and null checks.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "ts08-q1",
        "type": "multiple_choice",
        "title": "Handling Missing Nickname",
        "prompt": "A user profile may not have a saved nickname. What should the code check before calling a string method on that nickname?",
        "options": [
          "Check that the nickname exists (e.g. `if (nickname !== undefined)`) before calling `.toUpperCase()`",
          "Call `.toUpperCase()` directly because TypeScript automatically returns an empty string",
          "Wrap the method call in a Promise",
          "Disable strictNullChecks in tsconfig.json"
        ],
        "correctAnswer": 0,
        "explanation": "Check that the nickname exists before using a string method. If it can also be null, check for that too to prevent runtime TypeError crashes.",
        "hint": "Always check existence before property access.",
        "hintCostXP": 5
      },
      {
        "id": "ts08-q2",
        "type": "code_output",
        "title": "Null-Checking Guard",
        "prompt": "What does TypeScript know about `name` inside the if block?",
        "codeSnippet": "function getDisplayName(name: string | undefined): string {\n  if (name === undefined) {\n    return \"Guest\";\n  }\n  return name.toUpperCase();\n}",
        "language": "typescript",
        "options": [
          "Outside the if block, TypeScript knows name must be a string",
          "name remains string | undefined everywhere in the function",
          "name is converted to null",
          "TypeScript throws a compile error on line 4"
        ],
        "correctAnswer": 0,
        "explanation": "Because the function returned early when name was undefined, TypeScript's control flow analysis knows name is definitely a string afterwards.",
        "hint": "Early return eliminates the undefined possibility.",
        "hintCostXP": 5
      },
      {
        "id": "ts08-q3",
        "type": "multiple_choice",
        "title": "Value of strictNullChecks",
        "prompt": "What is the primary benefit of enabling `strictNullChecks` in TypeScript?",
        "options": [
          "It makes missing data visible and forces you to handle null and undefined explicitly",
          "It deletes all null values from memory automatically",
          "It prevents any function from returning undefined",
          "It replaces all undefined values with zero"
        ],
        "correctAnswer": 0,
        "explanation": "strictNullChecks prevents treating null and undefined as valid values for any type, stopping 'Cannot read properties of undefined' crashes.",
        "hint": "Visibility of missing data prevents crashes.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-typescript-ts09",
    "trackKey": "typescript",
    "trackTitle": "TypeScript",
    "lessonSlug": "ts09-type-narrowing",
    "lessonCode": "TS-09",
    "lessonTitle": "Type Narrowing",
    "description": "Master control flow analysis and runtime type guards.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "ts09-q1",
        "type": "multiple_choice",
        "title": "Narrowing Array vs String",
        "prompt": "A function accepts either a string or an array of strings. What should you check before using a method that exists only on arrays?",
        "options": [
          "Use `Array.isArray(value)`",
          "Use `typeof value === 'array'`",
          "Check `value.length > 0`",
          "Use `value instanceof String`"
        ],
        "correctAnswer": 0,
        "explanation": "Use `Array.isArray(value)`. If true, TypeScript refines the type to an array, allowing array methods safely.",
        "hint": "In JavaScript, typeof [] evaluates to 'object'. Use Array.isArray.",
        "hintCostXP": 5
      },
      {
        "id": "ts09-q2",
        "type": "multiple_choice",
        "title": "Interview Question: What is Type Narrowing?",
        "prompt": "What does type narrowing mean in TypeScript?",
        "options": [
          "Checking a value at runtime so TypeScript can work out which type it has in that part of the code",
          "Compressing code to make the compiled file size smaller",
          "Restricting a codebase to only using three types total",
          "Converting all numbers to 32-bit floating point numbers"
        ],
        "correctAnswer": 0,
        "explanation": "Type narrowing means using runtime checks (like typeof or Array.isArray) so TypeScript refines the type within that specific branch of code.",
        "hint": "Recall the simple interview answer.",
        "hintCostXP": 5
      },
      {
        "id": "ts09-q3",
        "type": "code_output",
        "title": "typeof Narrowing Branches",
        "prompt": "In `formatId(id: string | number)`, what method is safe to call inside `if (typeof id === 'number')`?",
        "codeSnippet": "function formatId(id: string | number): string {\n  if (typeof id === \"number\") {\n    return id.toFixed(0); // line A\n  }\n  return id.toUpperCase();   // line B\n}",
        "language": "typescript",
        "options": [
          "id.toFixed(0) on line A, and id.toUpperCase() on line B",
          "id.toUpperCase() on line A, and id.toFixed(0) on line B",
          "Both methods on both lines",
          "Neither method is safe without an explicit type assertion"
        ],
        "correctAnswer": 0,
        "explanation": "Inside the if branch, TypeScript knows id is a number (so toFixed is valid). After that branch, id must be a string (so toUpperCase is valid).",
        "hint": "Control flow analysis refines types in each branch.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-typescript-ts10",
    "trackKey": "typescript",
    "trackTitle": "TypeScript",
    "lessonSlug": "ts10-any-vs-unknown",
    "lessonCode": "TS-10",
    "lessonTitle": "any vs. unknown",
    "description": "Evaluate your understanding of type safety boundaries and top types.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "ts10-q1",
        "type": "multiple_choice",
        "title": "Safer Starting Type for External Data",
        "prompt": "An external tool gives your code a value, but you do not know whether it is a string, number, or object. Which is the safer starting type: `any` or `unknown`? Why?",
        "options": [
          "Use `unknown`, because it asks us to check its type before using it, whereas `any` skips checks",
          "Use `any`, because it automatically fixes type mismatches at runtime",
          "Use `any`, because unknown is not supported in modern TypeScript",
          "Neither; external data cannot be handled in TypeScript"
        ],
        "correctAnswer": 0,
        "explanation": "unknown is the safe choice: it allows any value to enter, but forces you to check its type before calling methods on it. any turns off checks.",
        "hint": "unknown forces verification; any skips it.",
        "hintCostXP": 5
      },
      {
        "id": "ts10-q2",
        "type": "multiple_choice",
        "title": "Interview Question: Why is unknown safer?",
        "prompt": "Why is `unknown` usually safer than `any`?",
        "options": [
          "`any` skips many type checks, whereas `unknown` makes us check the value before using it as a string, number, or another specific type",
          "`unknown` encrypts data in browser memory",
          "`unknown` compiles into a web worker thread",
          "`any` causes a fatal syntax error in Node.js"
        ],
        "correctAnswer": 0,
        "explanation": "`any` disables the type checker. `unknown` keeps type safety intact by demanding a type check before usage.",
        "hint": "Recall the interview model answer.",
        "hintCostXP": 5
      },
      {
        "id": "ts10-q3",
        "type": "code_output",
        "title": "Compiler Behavior on any vs unknown",
        "prompt": "What does TypeScript do when checking `let x: unknown = 'hi'; x.toUpperCase();`?",
        "codeSnippet": "let x: unknown = \"hi\";\n// x.toUpperCase();",
        "language": "typescript",
        "options": [
          "Reports an error: Object is of type 'unknown'",
          "Allows it without warning because 'hi' is a string",
          "Automatically casts x to any",
          "Executes the method and returns 'HI'"
        ],
        "correctAnswer": 0,
        "explanation": "TypeScript forbids calling methods on an unknown value until its type has been narrowed.",
        "hint": "unknown requires a type guard before method access.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-typescript-ts11",
    "trackKey": "typescript",
    "trackTitle": "TypeScript",
    "lessonSlug": "ts11-type-assertions",
    "lessonCode": "TS-11",
    "lessonTitle": "Type Assertions",
    "description": "Understand the boundaries of type assertions and runtime safety.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "ts11-q1",
        "type": "multiple_choice",
        "title": "Investigating as User Assertions",
        "prompt": "An AI-generated answer adds `as User` to silence a type error. What should you check before accepting that change?",
        "options": [
          "Check what the value really contains and why the error happened, because `as User` does not validate data at runtime",
          "Accept it immediately; AI assertions are always type-safe",
          "Change it to `as any` to be even safer",
          "Remove the User type from your project"
        ],
        "correctAnswer": 0,
        "explanation": "Type assertions do not validate or transform data. If the value comes from an external source or may be null, check its fields at runtime.",
        "hint": "Assertions tell TypeScript to trust you; they do not check data.",
        "hintCostXP": 5
      },
      {
        "id": "ts11-q2",
        "type": "code_output",
        "title": "DOM Query Nullability",
        "prompt": "What is a safer alternative to `const el = document.querySelector('input') as HTMLInputElement;`?",
        "codeSnippet": "const element = document.querySelector(\"input\");\nif (element) {\n  element.value = \"Hello\";\n}",
        "language": "typescript",
        "options": [
          "Checking `if (element)` before accessing properties, because the query might return null",
          "Using `document.querySelector('input') as any`",
          "Disabling DOM type definitions in tsconfig",
          "Assertions are already the safest possible approach"
        ],
        "correctAnswer": 0,
        "explanation": "querySelector can return null if no element is found. Checking `if (element)` handles null safely without crashing.",
        "hint": "Selectors might fail to find matching elements.",
        "hintCostXP": 5
      },
      {
        "id": "ts11-q3",
        "type": "multiple_choice",
        "title": "Nature of Type Assertions",
        "prompt": "Which statement accurately describes what `as Type` does in TypeScript?",
        "options": [
          "It tells TypeScript to treat a value as a chosen type during compile time, but does not change or prove the value at runtime",
          "It parses JSON strings into JavaScript objects at runtime",
          "It triggers a database constraint check",
          "It converts strings into numbers"
        ],
        "correctAnswer": 0,
        "explanation": "Type assertions are purely compile-time instructions that override inference; they perform no runtime conversions or validations.",
        "hint": "Assertions do not affect runtime values.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-typescript-ts12",
    "trackKey": "typescript",
    "trackTitle": "TypeScript",
    "lessonSlug": "ts12-generics",
    "lessonCode": "TS-12",
    "lessonTitle": "Generics",
    "description": "Test your mastery of type parameters and generic abstractions.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "ts12-q1",
        "type": "multiple_choice",
        "title": "Generics vs any for Reusable Functions",
        "prompt": "You want one helper that returns the first item from a list of users or a list of numbers. Why could a generic be better than using `any`?",
        "options": [
          "A generic lets one function work with both lists while keeping the correct item type, avoiding the loss of type safety caused by `any`",
          "Generics make the function run twice as fast",
          "`any` cannot be used with arrays in TypeScript",
          "Generics automatically sort the list before returning the item"
        ],
        "correctAnswer": 0,
        "explanation": "With a users list, the generic function returns a user; with numbers, it returns a number. `any` would discard that helpful type information.",
        "hint": "Recall the scenario answer: generics preserve type fidelity.",
        "hintCostXP": 5
      },
      {
        "id": "ts12-q2",
        "type": "multiple_choice",
        "title": "Interview Question: Problem Solved by Generics",
        "prompt": "What problem do generics solve in TypeScript?",
        "options": [
          "They let one function or type work with different kinds of data while keeping track of each kind, avoiding losing type information with `any`",
          "They replace async/await for network requests",
          "They allow TypeScript to run without Node.js",
          "They automatically format code with prettier"
        ],
        "correctAnswer": 0,
        "explanation": "Generics solve the problem of code reuse without sacrificing type safety or resorting to loose `any` typing.",
        "hint": "Recall the interview question model answer.",
        "hintCostXP": 5
      },
      {
        "id": "ts12-q3",
        "type": "code_output",
        "title": "Generic Type Inference",
        "prompt": "What is the inferred return type of `firstItem(['Ava', 'Liam'])` given `function firstItem<T>(items: T[]): T | undefined`?",
        "codeSnippet": "function firstItem<T>(items: T[]): T | undefined {\n  return items[0];\n}\nconst name = firstItem([\"Ava\", \"Liam\"]);",
        "language": "typescript",
        "options": [
          "string | undefined",
          "string",
          "any",
          "unknown"
        ],
        "correctAnswer": 0,
        "explanation": "Passing string[] causes TypeScript to infer T as string. The return type is therefore `string | undefined`.",
        "hint": "T is inferred from the array element type.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-typescript-ts13",
    "trackKey": "typescript",
    "trackTitle": "TypeScript",
    "lessonSlug": "ts13-common-utility-types",
    "lessonCode": "TS-13",
    "lessonTitle": "Common Utility Types",
    "description": "Verify your ability to transform types with Partial, Pick, Omit, and Record.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "ts13-q1",
        "type": "multiple_choice",
        "title": "Optional Update Fields",
        "prompt": "A form updates only a user's name or email, and does not require both fields every time. Which utility type could help make those fields optional?",
        "options": [
          "Use `Partial`, e.g. `type UserUpdate = Partial<Pick<User, 'name' | 'email'>>`",
          "Use `Omit<User, 'all'>`",
          "Use `Record<string, User>`",
          "Use `Required<User>`"
        ],
        "correctAnswer": 0,
        "explanation": "Applying `Partial` makes the selected fields optional, which is ideal for partial update payloads.",
        "hint": "Partial makes properties optional.",
        "hintCostXP": 5
      },
      {
        "id": "ts13-q2",
        "type": "code_output",
        "title": "Pick Utility Behavior",
        "prompt": "If `type User = { id: number; name: string; email: string }`, what fields exist on `type UserPreview = Pick<User, 'id' | 'name'>`?",
        "codeSnippet": "type User = { id: number; name: string; email: string };\ntype UserPreview = Pick<User, \"id\" | \"name\">;",
        "language": "typescript",
        "options": [
          "Only `id` and `name`",
          "All three fields: `id`, `name`, and `email`",
          "Only `email`",
          "An empty object `{}`"
        ],
        "correctAnswer": 0,
        "explanation": "`Pick` constructs a type containing only the properties explicitly specified in the keys union.",
        "hint": "Pick keeps the fields you name.",
        "hintCostXP": 5
      },
      {
        "id": "ts13-q3",
        "type": "multiple_choice",
        "title": "Dictionary Mapping with Record",
        "prompt": "What does the utility type `Record<string, number>` describe?",
        "options": [
          "An object with string keys and number values",
          "An audio recording stored in memory",
          "An array containing numbers and strings mixed together",
          "A database table with number columns only"
        ],
        "correctAnswer": 0,
        "explanation": "`Record<K, V>` constructs an object type whose property keys are of type K and values are of type V.",
        "hint": "Record models key-value dictionaries.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-typescript-ts14",
    "trackKey": "typescript",
    "trackTitle": "TypeScript",
    "lessonSlug": "ts14-classes-and-implements",
    "lessonCode": "TS-14",
    "lessonTitle": "Classes and implements",
    "description": "Assess your understanding of classes and interface contract enforcement.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "ts14-q1",
        "type": "multiple_choice",
        "title": "Ensuring Classes Have id",
        "prompt": "Several classes must have an `id` number. How could an interface help check that each class follows this rule?",
        "options": [
          "Create `interface HasId { id: number }` and have each class use `implements HasId`",
          "Name all classes with the prefix 'IdClass'",
          "Define a global variable named id in window",
          "Use a union type `type Class = 1 | 2 | 3`"
        ],
        "correctAnswer": 0,
        "explanation": "Declaring `implements HasId` instructs TypeScript to verify that every conforming class provides the required id number.",
        "hint": "Think about the scenario answer: implements HasId.",
        "hintCostXP": 5
      },
      {
        "id": "ts14-q2",
        "type": "code_output",
        "title": "Parameter Properties Shortcut",
        "prompt": "In `class Product { constructor(public id: number, public name: string) {} }`, what does `public` in the constructor parameters do?",
        "codeSnippet": "class Product {\n  constructor(public id: number, public name: string) {}\n}",
        "language": "typescript",
        "options": [
          "Automatically declares and assigns the properties on the class instance",
          "Makes the parameters accessible only inside the constructor body",
          "Converts the parameters into static class methods",
          "Exports the class to global scope"
        ],
        "correctAnswer": 0,
        "explanation": "TypeScript parameter properties automatically create and initialize class members from constructor arguments.",
        "hint": "It avoids writing `this.id = id;` manually.",
        "hintCostXP": 5
      },
      {
        "id": "ts14-q3",
        "type": "multiple_choice",
        "title": "When to Use Classes",
        "prompt": "Is every TypeScript application required to use classes?",
        "options": [
          "No; classes are helpful in object-oriented codebases, but functions and plain objects are also widely used",
          "Yes; TypeScript cannot compile functions without an enclosing class",
          "Yes; classes are mandatory for type checking to work",
          "No; classes were removed in TypeScript 5"
        ],
        "correctAnswer": 0,
        "explanation": "Classes are a tool for grouping data and methods, but modern TypeScript also thrives on pure functions and object types.",
        "hint": "Follow your project's architectural style.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-typescript-ts15",
    "trackKey": "typescript",
    "trackTitle": "TypeScript",
    "lessonSlug": "ts15-modules-and-type-imports",
    "lessonCode": "TS-15",
    "lessonTitle": "Modules and Type Imports",
    "description": "Evaluate your modular architecture and type-only import skills.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "ts15-q1",
        "type": "multiple_choice",
        "title": "Sharing Types Across Files",
        "prompt": "Three files need the same `User` type. Why is importing it from one shared file better than defining it in all three files?",
        "options": [
          "All three files stay consistent; if the shape changes, we update it in one place instead of syncing multiple copies",
          "Importing types allows the browser to download them faster",
          "Defining types in multiple files causes a syntax error",
          "Shared files automatically run unit tests"
        ],
        "correctAnswer": 0,
        "explanation": "Exporting from a single source of truth ensures consistency across your entire codebase.",
        "hint": "Single source of truth prevents drift.",
        "hintCostXP": 5
      },
      {
        "id": "ts15-q2",
        "type": "code_output",
        "title": "import type Behavior",
        "prompt": "What happens to `import type { User } from './types'` during compilation to JavaScript?",
        "codeSnippet": "import type { User } from \"./types\";\nexport function greet(user: User): string {\n  return `Hello, ${user.name}`;\n}",
        "language": "typescript",
        "options": [
          "It is completely erased; no runtime import statement is emitted in the output JavaScript",
          "It is converted into a standard `require('./types')` call",
          "It loads the types dynamically using fetch() in the browser",
          "It generates a runtime error if types.js does not exist"
        ],
        "correctAnswer": 0,
        "explanation": "`import type` is purely for type checking and is completely erased during compilation, preventing unnecessary bundle overhead.",
        "hint": "Type erasure applies to type-only imports.",
        "hintCostXP": 5
      },
      {
        "id": "ts15-q3",
        "type": "multiple_choice",
        "title": "Circular Dependency Prevention",
        "prompt": "How can `import type` help avoid circular dependency runtime errors?",
        "options": [
          "Because type-only imports are removed during compilation, they create no runtime module evaluation dependencies",
          "By delaying file loading with setTimeout",
          "By caching imported files in localStorage",
          "By inlining the entire module inside every file"
        ],
        "correctAnswer": 0,
        "explanation": "Since type-only imports produce no JavaScript runtime code, they cannot cause circular module loading crashes.",
        "hint": "No runtime JS means no circular import crash.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-typescript-ts16",
    "trackKey": "typescript",
    "trackTitle": "TypeScript",
    "lessonSlug": "ts16-promises-and-async-functions",
    "lessonCode": "TS-16",
    "lessonTitle": "Promises and async Functions",
    "description": "Verify your ability to type asynchronous workflows and Promises.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "ts16-q1",
        "type": "multiple_choice",
        "title": "Promise<string> vs string Return",
        "prompt": "A function loads a user's name from a server. Why is its return type `Promise<string>` instead of simply `string`?",
        "options": [
          "The server response takes time, so the function returns a Promise that will provide a string later",
          "TypeScript requires all functions that return strings to use Promise",
          "Because strings cannot be sent over HTTP",
          "Because Promise makes text uppercase automatically"
        ],
        "correctAnswer": 0,
        "explanation": "`string` describes a value available immediately, whereas `Promise<string>` accurately represents a value available asynchronously.",
        "hint": "Think about timing: server responses take time.",
        "hintCostXP": 5
      },
      {
        "id": "ts16-q2",
        "type": "code_output",
        "title": "Awaiting Promises",
        "prompt": "What is the type of `const name` in the following code?",
        "codeSnippet": "async function getUserName(): Promise<string> { return \"Rina\"; }\nasync function test() {\n  const name = await getUserName();\n}",
        "language": "typescript",
        "options": [
          "string",
          "Promise<string>",
          "void",
          "unknown"
        ],
        "correctAnswer": 0,
        "explanation": "The `await` expression unwraps the Promise, resolving `Promise<string>` to `string`.",
        "hint": "await unwraps the promise value.",
        "hintCostXP": 5
      },
      {
        "id": "ts16-q3",
        "type": "multiple_choice",
        "title": "Non-Returning Async Functions",
        "prompt": "What return type should be given to an `async` function that returns no value?",
        "options": [
          "Promise<void>",
          "void",
          "Promise<null>",
          "undefined"
        ],
        "correctAnswer": 0,
        "explanation": "All async functions return a Promise. If no value is returned, the return type is `Promise<void>`.",
        "hint": "Async functions always wrap their return in a Promise.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-typescript-ts17",
    "trackKey": "typescript",
    "trackTitle": "TypeScript",
    "lessonSlug": "ts17-check-api-data",
    "lessonCode": "TS-17",
    "lessonTitle": "Check API Data Before Trusting It",
    "description": "Master runtime boundary validation for external API payloads.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "ts17-q1",
        "type": "multiple_choice",
        "title": "Mismatched Server Data Risk",
        "prompt": "Your app expects an API response with numeric `id`, but the server sometimes sends `id` as text. What could go wrong, and why is a TypeScript type alone not enough?",
        "options": [
          "Code expecting a number may fail or behave incorrectly; TypeScript checks code before it runs, but does not check live API responses at runtime",
          "TypeScript will automatically reject the HTTP request before it reaches the browser",
          "The server will crash and throw a TypeScript compiler error",
          "The browser will automatically convert text to numbers without any risk"
        ],
        "correctAnswer": 0,
        "explanation": "TypeScript checks code at compile time, not live network traffic. Mismatched runtime data requires explicit runtime validation.",
        "hint": "Recall the scenario answer: TypeScript does not inspect live API data.",
        "hintCostXP": 5
      },
      {
        "id": "ts17-q2",
        "type": "code_output",
        "title": "The data as User Trap",
        "prompt": "Why is `const data = (await res.json()) as User;` considered risky for external data?",
        "codeSnippet": "type User = { id: number; name: string };\nconst data = (await response.json()) as User;\nconsole.log(data.id.toFixed(2));",
        "language": "typescript",
        "options": [
          "`as User` does not check the data at runtime; if the server sent `{ error: 'Not found' }`, data.id is undefined and toFixed() will crash",
          "`as User` causes a syntax error in modern JavaScript",
          "`as User` converts the response to XML",
          "`as User` blocks the main thread for 5 seconds"
        ],
        "correctAnswer": 0,
        "explanation": "Type assertions only satisfy the compiler; they perform zero runtime validation on what the server actually sent.",
        "hint": "Type assertions do not validate runtime JSON.",
        "hintCostXP": 5
      },
      {
        "id": "ts17-q3",
        "type": "multiple_choice",
        "title": "Safe Boundary Handling",
        "prompt": "What is the recommended first step when parsing untrusted external JSON data?",
        "options": [
          "Type the raw parsed data as `unknown` and verify its fields before using it",
          "Type the raw data as `any` and disable strict mode",
          "Assume the backend developers will never make changes or return errors",
          "Cast it directly to the most complex interface available"
        ],
        "correctAnswer": 0,
        "explanation": "Typing unverified external data as `unknown` forces your code to check its properties before trusting its shape.",
        "hint": "unknown enforces verification before use.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-typescript-ts18",
    "trackKey": "typescript",
    "trackTitle": "TypeScript",
    "lessonSlug": "ts18-find-and-fix-type-errors",
    "lessonCode": "TS-18",
    "lessonTitle": "Find and Fix Type Errors",
    "description": "Diagnose compiler errors accurately and fix root causes cleanly.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "ts18-q1",
        "type": "multiple_choice",
        "title": "AI Suggests as any",
        "prompt": "AI suggests adding `as any` to make a compiler error disappear. What would you investigate before accepting that fix?",
        "options": [
          "Check what TypeScript expected, what value we actually have, and why they do not match, because `as any` only hides the warning without fixing the bug",
          "Accept it immediately because AI always writes production-ready code",
          "Replace the entire file with a bash script",
          "Ignore the error and push directly to production"
        ],
        "correctAnswer": 0,
        "explanation": "`as any` hides the compiler warning without fixing the underlying problem, so the bug can still cause runtime crashes.",
        "hint": "Understand the mismatch first.",
        "hintCostXP": 5
      },
      {
        "id": "ts18-q2",
        "type": "code_output",
        "title": "Fixing Call Site Mismatches",
        "prompt": "Given `function welcome(name: string): string { return `Welcome, ${name}`; }`, how do you correctly fix `welcome(42)`?",
        "codeSnippet": "function welcome(name: string): string {\n  return `Welcome, ${name}`;\n}\n// welcome(42); // Error!",
        "language": "typescript",
        "options": [
          "Pass a string argument: `welcome('Rina')`",
          "Call `welcome(42 as any)`",
          "Change the function name to welcomeNumber",
          "Delete the name parameter from the function"
        ],
        "correctAnswer": 0,
        "explanation": "Fix the call by passing a valid string argument matching the function's contract.",
        "hint": "Fix the cause: pass what the function expects.",
        "hintCostXP": 5
      },
      {
        "id": "ts18-q3",
        "type": "multiple_choice",
        "title": "5 Steps to Resolving Type Errors",
        "prompt": "What is the first step when diagnosing a TypeScript compiler error?",
        "options": [
          "Find the value mentioned in the error and check which type the code expected vs what it actually has",
          "Add `// @ts-ignore` to the top of the file",
          "Restart your computer",
          "Rename all variable names to single letters"
        ],
        "correctAnswer": 0,
        "explanation": "Read the diagnostic to locate the mismatched value, check expected vs actual types, and fix the root cause.",
        "hint": "Read the error message carefully to find the mismatch.",
        "hintCostXP": 5
      }
    ]
  }
];
