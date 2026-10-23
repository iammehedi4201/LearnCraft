# LearnCraft Adaptive Teaching Guide

## Philosophy: Teach According to Actual Difficulty

Not all topics require the same depth. 
- **Simple concepts** are taught in a few clear sentences with 1 small code snippet.
- **Moderate concepts** explain the key rules, differences, and common pitfalls.
- **Difficult concepts** provide step-by-step mental models, execution traces, and address core misconceptions.

---

## 1. The 3 Difficulty Levels & Rules

| Level | Word Limit | Code Snippets | Core Purpose | What to Avoid |
|---|---|---|---|---|
| 🟢 **Easy** | 80–120 words | Exactly 1 (max 5 lines) | Teach syntax and immediate usage directly. | No memory theory, no engine internals, no multiple variations. |
| 🟡 **Moderate** | 150–220 words | 1–2 practical snippets | Explain rules, differences (e.g. `==` vs `===`), and 1 common pitfall. | Don't over-explain every minor edge case. |
| 🔴 **Difficult** | 300–450 words | Practical snippets + trace | Step-by-step mental model, runtime behavior, and debugging traps. | Don't repeat the easy syntax; focus on the invisible mechanics. |

---

## 2. Topic Headings Standard (Strict 2 to 6 Words)

Every lesson heading must be between **2 and 6 simple words** that a complete beginner understands before opening the lesson.

| Avoid (Abstract/Overly Technical) | Prefer (2–6 Simple Words) |
|---|---|
| Understanding Execution Context | How JavaScript Runs Code |
| The Intricacies of Lexical Scoping | How Scope Works |
| Exploring Function Invocation Patterns | Writing and Calling Functions |
| A Deep Dive into Array Manipulation | Working with Arrays |
| Asynchronous Control Flow Mechanisms | How Async Code Works |
| Understanding the Fundamentals of Variables | Declaring Variables |

---

## 3. The 30 Authoritative JavaScript Lessons Reference Table

| Stage | Code | Title (2–6 Words) | Level | Focus & Depth |
|---|---|---|---|---|
| **1. Foundations & Basics** | JS-01 | How JavaScript Runs Code | 🔴 Difficult | Single-threaded engine, Call Stack frames |
| | JS-02 | Declaring Variables | 🟢 Easy | `const` default, `let` reassignment, primitives |
| | JS-03 | Comparing Values with == and === | 🟡 Moderate | Type coercion rules, strict `===` equality |
| | JS-04 | Making Decisions with if and else | 🟢 Easy | `if`/`else` branching, comparison conditions |
| | JS-05 | Repeating Code with Loops | 🟢 Easy | `for` counting loop, `while` condition |
| **2. Functions & Scope** | JS-06 | Writing and Calling Functions | 🟢 Easy | Parameters, return values, arrow syntax `=>` |
| | JS-07 | How Scope Works | 🔴 Difficult | Global vs block scope, scope chain lookup |
| | JS-08 | How Closures Work | 🔴 Difficult | Retained outer scope memory, function factories |
| | JS-09 | Using Callback Functions | 🟡 Moderate | Functions as values, passing callbacks |
| **3. Collections** | JS-10 | Working with Arrays | 🟢 Easy | 0-based indexing, length, `.push()`, `.slice()` |
| | JS-11 | Transforming Arrays with map and filter | 🔴 Difficult | Declarative transforms, accumulator mental model |
| | JS-12 | Working with Objects | 🟢 Easy | Key-value pairs, dot & bracket notation |
| | JS-13 | Object References and Copying | 🟡 Moderate | Heap pointers vs values, shallow vs deep clone |
| **4. Modern ES6+** | JS-14 | Destructuring Objects and Arrays | 🟢 Easy | Unpacking properties, defaults, renaming |
| | JS-15 | Using Spread and Rest | 🟢 Easy | Expanding `...` arrays/objects, rest parameters |
| | JS-16 | Safe Property Access with ?. and ?? | 🟢 Easy | Optional chaining `?.`, nullish fallback `??` |
| **5. OOP & Prototypes** | JS-17 | How the this Keyword Works | 🔴 Difficult | The 4 call-site binding rules, arrow function `this` |
| | JS-18 | How Prototypes Work | 🔴 Difficult | Prototype delegation chain, memory sharing |
| | JS-19 | Working with Classes | 🟡 Moderate | `class`, `constructor`, `extends`, `super()` |
| **6. Asynchronous JS** | JS-20 | How Async Code Works | 🔴 Difficult | Non-blocking execution, browser Web APIs |
| | JS-21 | Working with Promises | 🔴 Difficult | Pending/Fulfilled/Rejected states, `.then()/.catch()` |
| | JS-22 | Using async and await | 🔴 Difficult | Non-blocking pause, try/catch, parallel tasks |
| | JS-23 | How the Event Loop Works | 🔴 Difficult | Call Stack, VIP Microtasks, Timers |
| **7. Errors & APIs** | JS-24 | Handling Errors with try and catch | 🟢 Easy | Catching runtime exceptions, error messages |
| | JS-25 | Using ES Modules | 🟢 Easy | `export` and `import` for modular code |
| | JS-26 | Working with JSON | 🟡 Moderate | `JSON.stringify()`, `JSON.parse()`, data types |
| | JS-27 | Fetching Data with fetch | 🔴 Difficult | 2-step async fetch, the 404 trap, response streams |
| **8. Browser & Capstone** | JS-28 | Finding and Changing HTML Elements | 🟢 Easy | `querySelector`, `textContent`, `classList` |
| | JS-29 | Handling User Events | 🔴 Difficult | Event bubbling, delegation pattern |
| | JS-30 | Saving Data in the Browser | 🟡 Moderate | `localStorage` API, serializing state |

---

## 4. Prompts to Use with Gemini Flash

To prevent Gemini Flash from overthinking and treating every topic as difficult, **use separate prompts** and pass the difficulty level directly:

### Prompt for 🟢 Easy Topics
```markdown
Write a beginner lesson for the topic: [TOPIC NAME].
Difficulty: EASY.
- Title: 2 to 5 words.
- Explanation: Exactly 2–3 clear, friendly sentences.
- Code: Exactly 1 code snippet (max 5 lines).
- Note: 1 sentence explaining the key line.
- Hard constraint: Under 100 words total. Do not explain engine internals or edge cases.
```

### Prompt for 🟡 Moderate Topics
```markdown
Write a lesson for the topic: [TOPIC NAME].
Difficulty: MODERATE.
- Title: 2 to 5 words.
- Explanation: 3–4 sentences explaining the core concept.
- Code: 1 practical code example demonstrating real usage.
- Rule / Gotcha: 1 common mistake or important rule to remember.
- Hard constraint: Under 200 words total.
```

### Prompt for 🔴 Difficult Topics
```markdown
Write a deep-dive lesson for the topic: [TOPIC NAME].
Difficulty: DIFFICULT.
- Title: 2 to 5 words.
- Mental Model: Explain the invisible runtime behavior using a clear, simple analogy.
- Step-by-Step Execution: Trace what the JavaScript engine does line-by-line.
- Practical Code: Code example with comments and expected console outputs.
- Common Misconception: Explain why beginners get confused and how to avoid the trap.
- Hard constraint: 300 to 450 words total.
```

---

## 5. The 32 Authoritative TypeScript Lessons Reference Table

| Stage | Code | Title (2–6 Words) | Level | Focus & Depth |
|---|---|---|---|---|
| **1. Foundations** | TS-01 | How TypeScript Protects JavaScript | 🔴 Difficult | Static vs runtime, type erasure, tsc compilation |
| | TS-02 | Type Annotations and Type Inference | 🟢 Easy | `string`, `number`, `boolean`, letting TS infer |
| | TS-03 | Arrays and Tuples | 🟢 Easy | `T[]`, fixed-position `[A, B]`, `readonly` |
| | TS-04 | Typing Objects and Optional Properties | 🟢 Easy | Object shapes, optional `?`, `readonly` keys |
| | TS-05 | Special Types: any and unknown | 🟡 Moderate | `any` vs `unknown` safety, `void`, `never` |
| **2. Functions & Composition** | TS-06 | Typing Functions and Return Values | 🟢 Easy | Parameter types, return inference, defaults |
| | TS-07 | Writing Function Overloads | 🟡 Moderate | Multiple call signatures, 1 implementation |
| | TS-08 | Union and Intersection Types | 🟡 Moderate | Union `\|` alternatives, intersection `&` merge |
| | TS-09 | Type Aliases Versus Interfaces | 🟡 Moderate | Declaration merging, `extends` vs `&`, rule of thumb |
| **3. Narrowing & Control Flow** | TS-10 | How Type Narrowing Works | 🔴 Difficult | Control flow analysis, `typeof`, `instanceof`, `in` |
| | TS-11 | Writing Custom Type Guards | 🟡 Moderate | `val is Type` predicates, `.filter()` narrowing |
| | TS-12 | Using Discriminated Unions | 🔴 Difficult | Tagged literal discriminant, impossible states |
| | TS-13 | Exhaustive Checking with never | 🟡 Moderate | `switch` default never check, compile enforcement |
| **4. Generics & Abstraction** | TS-14 | Writing Generic Functions | 🔴 Difficult | Type variables `<T>`, preserving return fidelity |
| | TS-15 | Generic Interfaces and Types | 🟡 Moderate | Reusable containers (`ApiResponse<T>`, `Result<T, E>`) |
| | TS-16 | Constraining Generics with extends | 🔴 Difficult | `<T extends HasId>`, preserving exact subtypes |
| | TS-17 | Generics with keyof | 🔴 Difficult | `K extends keyof T`, type-safe property lookup `T[K]` |
| **5. Classes & OO** | TS-18 | Class Fields and Access Modifiers | 🟢 Easy | `public`, `private`, `protected`, `readonly` |
| | TS-19 | Constructor Parameter Properties | 🟢 Easy | `constructor(public name: string)` shorthand |
| | TS-20 | Abstract Classes and Interfaces | 🟡 Moderate | Abstract blueprints, shared logic vs pure shapes |
| **6. Advanced Types** | TS-21 | Indexed Access and typeof | 🟡 Moderate | `T[K]`, `T[number]`, deriving types with `typeof` |
| | TS-22 | Conditional Types and infer | 🔴 Difficult | `T extends U ? X : Y`, extracting types with `infer` |
| | TS-23 | Mapped Types and Template Literals | 🔴 Difficult | `[K in keyof T]`, `+`/`-` modifiers, template strings |
| | TS-24 | Essential Utility Types | 🟡 Moderate | `Partial`, `Required`, `Readonly`, `Record`, `Pick`, `Omit` |
| **7. Modules & Compilation** | TS-25 | Using Type-Only Imports | 🟢 Easy | `import type`, `export type`, preventing bloat |
| | TS-26 | Configuring tsconfig and Strict Mode | 🟡 Moderate | `strict`, `strictNullChecks`, `noImplicitAny` |
| | TS-27 | Declaration Files and Type Erasure | 🟡 Moderate | `.d.ts` files, `@types/*`, runtime erasure trap |
| **8. Practical Patterns** | TS-28 | Type Assertions Versus satisfies | 🟡 Moderate | `as Type` risks vs `satisfies` safe validation |
| | TS-29 | Handling Errors with unknown | 🟡 Moderate | `catch (err: unknown)`, `instanceof Error` guard |
| | TS-30 | Typing API Responses Safely | 🔴 Difficult | `Promise<T>`, boundary trap, unvalidated JSON |
| **9. Debugging & Smells** | TS-31 | Reading and Fixing Compiler Errors | 🔴 Difficult | Dissecting traces, bottom-up reading, expected vs got |
| | TS-32 | Clean Type Architecture and Smells | 🟡 Moderate | Type smells, auditing AI-generated code, interviews |

