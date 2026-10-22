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
