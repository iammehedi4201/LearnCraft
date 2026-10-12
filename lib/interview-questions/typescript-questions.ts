import { InterviewQuestion } from "@/types/interview";

export const TYPESCRIPT_QUESTIONS: InterviewQuestion[] = [
  {
    id: "ts-q01",
    trackKey: "typescript",
    category: "Type System Fundamentals",
    subtopic: "Interface vs Type",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is the difference between `interface` and `type` in TypeScript? When should you use each?",
    answer: `### Simple answer:
Both define the shape of an object or data structure, but \`interface\` can be extended and merged across files, while \`type\` is more flexible and can define unions, primitives, and tuples.

### Key Differences:
1. **Declaration Merging:**
   - **\`interface\`** can be declared multiple times; TypeScript automatically merges them into one definition. This is how third-party libraries allow you to extend global types.
   - **\`type\`** cannot be redeclared and throws an error if duplicated.
2. **Unions and Primitives:**
   - **\`type\`** can define union types (\`type Status = "pending" | "done"\`), primitives, and tuples.
   - **\`interface\`** can only define object structures and callable signatures.
3. **Inheritance Syntax:**
   - \`interface\` uses \`extends\`.
   - \`type\` uses intersection operators (\`&\`).

### Example:
\`\`\`typescript
// Interface with extends
interface Animal {
  name: string;
}
interface Dog extends Animal {
  bark(): void;
}

// Type alias with union and intersection
type Status = "active" | "inactive";
type UserWithStatus = Dog & { status: Status };
\`\`\`

### Interview answer:
Use \`interface\` when defining object shapes, public APIs, or when you need declaration merging. Use \`type\` when you need unions, primitives, tuples, or complex mapped types. In everyday development, either works well for simple objects.`,
    followUps: [
      "How do you augment the NodeJS.ProcessEnv or Window interfaces?",
      "Why does type intersection `&` sometimes resolve to `never`?",
      "Can an interface extend a union type?"
    ],
    keyPoints: [
      "Interfaces support declaration merging; types do not",
      "Types can express unions, primitives, and mapped types; interfaces cannot",
      "Interfaces use extends with better compiler caching than type intersection",
      "Both support classes implementing them"
    ],
    tags: ["typescript", "interface", "type", "types", "declaration-merging"],
    relatedLessonSlug: "/learn/typescript/ts03-interfaces-vs-type-aliases",
    relatedLessonName: "TS-03: Interfaces vs Type Aliases & Augmentation"
  },
  {
    id: "ts-q02",
    trackKey: "typescript",
    category: "Type Safety & Top/Bottom Types",
    subtopic: "Type Safety",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "Explain the differences between `any`, `unknown`, and `never` in TypeScript.",
    answer: `### Simple answer:
- **\`any\`**: Completely disables type checking. You can do anything with it without errors (unsafe).
- **\`unknown\`**: Represents a value of any type, but you cannot use it until you verify what type it is (safe).
- **\`never\`**: Represents a value that can never exist or code that never returns.

### Comparison:
| Type | What it accepts | Can you call methods directly? | Best Use Case |
|---|---|---|---|
| **\`any\`** | Anything | Yes (no type safety) | Quick migration from JS (avoid in production) |
| **\`unknown\`** | Anything | ❌ No (must check type first) | API responses, user inputs, parsed JSON |
| **\`never\`** | Nothing | ❌ No | Functions that throw or infinite loops; exhaustive checks |

### Example:
\`\`\`typescript
// any vs unknown
let unsafeVal: any = "hello";
unsafeVal.foo(); // Compiles fine, crashes at runtime!

let safeVal: unknown = "hello";
// safeVal.toUpperCase(); // Error: Object is of type 'unknown'
if (typeof safeVal === "string") {
  console.log(safeVal.toUpperCase()); // Safe! Type narrowed to string
}

// never in exhaustive checking
type Shape = "circle" | "square";
function getArea(s: Shape) {
  switch (s) {
    case "circle": return Math.PI;
    case "square": return 1;
    default:
      const _exhaustive: never = s; // compile error if a new shape is added!
      return _exhaustive;
  }
}
\`\`\`

### Interview answer:
\`any\` disables type checking and is unsafe. \`unknown\` is the type-safe alternative to \`any\` that forces you to narrow the type before using it. \`never\` represents impossible values, commonly used for exhaustive checks to ensure all union variants are handled.`,
    followUps: [
      "How do you implement an exhaustive check function using never?",
      "Why is `never | string` equal to `string` in a union?",
      "Why is `unknown & string` equal to `string` in an intersection?"
    ],
    keyPoints: [
      "any opts out of type safety completely; unknown enforces runtime narrowing",
      "never is the bottom type representing impossible states or unreachable code",
      "Use unknown for untrusted external data and user input",
      "Use never for exhaustive check in switch statements"
    ],
    tags: ["unknown", "any", "never", "type-guards", "exhaustiveness"],
    relatedLessonSlug: "/learn/typescript/ts05-any-unknown-never-void",
    relatedLessonName: "TS-05: any, unknown, never & Type Lattice"
  },
  {
    id: "ts-q03",
    trackKey: "typescript",
    category: "Advanced Types & Generics",
    subtopic: "Conditional Types",
    type: "coding",
    difficulty: "hard",
    source: "curated",
    question: "How does the `infer` keyword work in conditional types? Recreate TypeScript's built-in `ReturnType<T>` utility type from scratch.",
    codeSnippet: `// Implement MyReturnType<T> without using ReturnType
type MyReturnType<T> = /* ??? */;

function getUser() {
  return { id: 1, name: "Alice", role: "admin" };
}

type User = MyReturnType<typeof getUser>;
// Expected: { id: number; name: string; role: string; }`,
    answer: `### Implementation:
\`\`\`typescript
type MyReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;
\`\`\`

### How it works:
1. **Generic Constraint (\`T extends (...args: any[]) => any\`):** Ensures \`T\` must be a callable function type.
2. **Conditional Type (\`T extends ... ? ... : ...\`):** Tests whether \`T\` matches the function signature pattern.
3. **The \`infer\` Keyword:** Introduces a new type variable \`R\` inside the conditional check. TypeScript inspects the function and deduces what type \`R\` represents from the return position.
4. **Result:** If it matches, TypeScript returns \`R\`. Otherwise, it returns \`never\`.

### Another practical example (\`Awaited<T>\`):
\`\`\`typescript
type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;
\`\`\`

### Interview answer:
The \`infer\` keyword lets you extract and capture an unknown type from within another type pattern during a conditional check. In \`ReturnType\`, we match the function signature and use \`infer R\` to extract the return type dynamically.`,
    followUps: [
      "Can you use multiple infer keywords in a single conditional type?",
      "How would you extract the first parameter of a function using infer?",
      "What is distributive conditional type behavior when passing union types?"
    ],
    keyPoints: [
      "infer introduces a type variable deduced by compiler inside conditional extends",
      "Used extensively in ReturnType, Parameters, Awaited, and Promise resolution",
      "Generic constraint restricts T to callable function signatures",
      "Returns never when the pattern match fails"
    ],
    tags: ["generics", "conditional-types", "infer", "utility-types", "meta-programming"],
    relatedLessonSlug: "/learn/typescript/ts09-conditional-types-and-infer",
    relatedLessonName: "TS-09: Conditional Types & infer Keyword"
  },
  {
    id: "ts-q04",
    trackKey: "typescript",
    category: "Pattern Matching & Narrowing",
    subtopic: "Discriminated Unions",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "What are Discriminated Unions (Tagged Unions) and how do they enable safe pattern matching in TypeScript?",
    answer: `### Simple answer:
A Discriminated Union is a union of object types where every object shares a common property (a "tag" or "discriminant") with a distinct literal value, allowing TypeScript to narrow the type accurately in \`if\` or \`switch\` blocks.

### Example:
\`\`\`typescript
type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

function render(state: State) {
  switch (state.status) {
    case "idle":
      return "Ready to load";
    case "loading":
      return "Loading...";
    case "success":
      // TypeScript knows state.data exists here!
      return \`Loaded: \${state.data.join(", ")}\`;
    case "error":
      // TypeScript knows state.message exists here!
      return \`Error: \${state.message}\`;
  }
}
\`\`\`

### Why this matters:
Without discriminated unions, people often write messy objects with many optional fields like \`{ data?: string[], error?: string, isLoading: boolean }\`, which allows impossible states (e.g. both data and error present while loading).

### Interview answer:
Discriminated unions combine multiple object shapes using a shared literal property like \`status\` or \`type\`. Checking that single property lets TypeScript narrow the object automatically, making state handling safe and impossible states unrepresentable.`,
    followUps: [
      "Why is a discriminated union superior to an object with multiple optional fields?",
      "Can enum values be used as discriminants?",
      "What is a user-defined type guard (parameter is Type) and when is it needed?"
    ],
    keyPoints: [
      "Shares a common single-literal field across all union members",
      "TypeScript compiler automatically narrows remaining properties inside control flow branches",
      "Guarantees impossible states cannot be represented in the data model",
      "Enables compile-time exhaustiveness checking via never"
    ],
    tags: ["discriminated-unions", "type-narrowing", "pattern-matching", "exhaustiveness"],
    relatedLessonSlug: "/learn/typescript/ts06-discriminated-unions-exhaustiveness",
    relatedLessonName: "TS-06: Discriminated Unions & Exhaustiveness Checks"
  },
  {
    id: "ts-q05",
    trackKey: "typescript",
    category: "Type System Fundamentals",
    subtopic: "Overview",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is TypeScript, and what advantages does it offer over vanilla JavaScript?",
    answer: `### Simple answer:
TypeScript is a statically typed superset of JavaScript developed by Microsoft. It adds optional type annotations to JavaScript and compiles down to clean, standard JavaScript that runs in any browser or Node.js environment.

### Key Advantages:
1. **Catch Bugs at Compile Time:** Detects typos, null reference bugs, and incorrect function arguments before code ever runs in production.
2. **Superior Autocomplete and Refactoring:** IDEs provide instant intelligent code suggestions, type definitions, and reliable cross-file renames.
3. **Self-Documenting Code:** Types serve as living documentation that stays synchronized with the implementation.
4. **Smooth Adoption:** Valid JavaScript is valid TypeScript; you can adopt types incrementally across a project.

### Example:
\`\`\`typescript
function calculateDiscount(price: number, discountPercent: number): number {
  return price - (price * discountPercent) / 100;
}

// Compile error caught immediately in editor:
calculateDiscount("100", 10); // Argument of type 'string' is not assignable to 'number'
\`\`\`

### Interview answer:
TypeScript adds static typing on top of JavaScript. Its main advantages are catching errors early during development, offering excellent IDE autocomplete and refactoring tools, and making large codebases easier to maintain and collaborate on.`,
    followUps: [
      "Does TypeScript add runtime overhead to JavaScript applications?",
      "What does the tsconfig.json file do?",
      "What is the difference between static typing and dynamic typing?"
    ],
    keyPoints: [
      "TypeScript is a typed superset of JavaScript",
      "Compiles to standard JavaScript with zero runtime type-checking overhead",
      "Catches errors at compile time rather than runtime",
      "Provides powerful IDE developer tooling and documentation"
    ],
    tags: ["typescript", "javascript", "compilation", "static-typing"],
    relatedLessonSlug: "/learn/typescript/ts01-why-typescript",
    relatedLessonName: "TS-01: Why TypeScript & Static Analysis"
  },
  {
    id: "ts-q06",
    trackKey: "typescript",
    category: "Type System Fundamentals",
    subtopic: "Basic Types",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What are the basic types in TypeScript, and what is the difference between an Array and a Tuple?",
    answer: `### Simple answer:
TypeScript includes all JavaScript primitives (\`string\`, \`number\`, \`boolean\`, \`null\`, \`undefined\`, \`symbol\`, \`bigint\`) plus special types like Arrays and Tuples.

### Arrays vs Tuples:
- **Array (\`number[]\` or \`Array<number>\`):** A collection of elements of the same type with **flexible length**.
- **Tuple (\`[string, number]\`):** A collection with a **fixed number of elements** where each position has a specific type.

### Example:
\`\`\`typescript
// Array: can hold any number of numbers
const scores: number[] = [95, 82, 90];
scores.push(88); // valid

// Tuple: fixed position and types
let userCoordinate: [number, number] = [40.7128, -74.0060]; // [latitude, longitude]
let keyValuePair: [string, boolean] = ["isAdmin", true];

// React's useState returns a tuple:
// const [count, setCount] = useState(0);
\`\`\`

### Interview answer:
Arrays have variable lengths and uniform types, whereas Tuples have fixed lengths with specific types assigned to each index position, like coordinates \`[lat, lng]\` or React's \`[state, setState]\`.`,
    followUps: [
      "Can you add elements to a TypeScript tuple using .push() at runtime?",
      "How do named tuple elements improve code clarity?",
      "What are readonly tuples in TypeScript?"
    ],
    keyPoints: [
      "Arrays hold variable amounts of elements of a specified type",
      "Tuples hold a fixed number of elements with positional types",
      "React useState is a classic example of a tuple [state, setter]",
      "Use readonly tuples (readonly [number, number]) to prevent mutations"
    ],
    tags: ["arrays", "tuples", "primitives", "types"],
    relatedLessonSlug: "/learn/typescript/ts02-basic-types-and-arrays",
    relatedLessonName: "TS-02: Basic Types, Arrays & Tuples"
  },
  {
    id: "ts-q07",
    trackKey: "typescript",
    category: "Interfaces & Objects",
    subtopic: "Interface Modifiers",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "How do Optional properties (`?`) and `readonly` properties work in TypeScript interfaces?",
    answer: `### Simple answer:
- **Optional (\`?\`)**: Marks a property as optional, meaning the object may or may not include it (its type becomes \`T | undefined\`).
- **\`readonly\`**: Prevents modifying the property after the object is created.

### Example:
\`\`\`typescript
interface UserProfile {
  readonly id: string; // Cannot be changed after creation
  name: string;
  avatarUrl?: string; // Optional: string or undefined
}

const user: UserProfile = {
  id: "usr_123",
  name: "Alex",
};

// Allowed:
user.name = "Alexander";

// Error: Cannot assign to 'id' because it is a read-only property
// user.id = "usr_999";
\`\`\`

### Interview answer:
Use \`?\` when a property isn't required on every object, which lets callers omit it safely. Use \`readonly\` for properties like IDs or database keys that should never be reassigned after initialization.`,
    followUps: [
      "Does readonly make nested object properties immutable too?",
      "How does the Readonly<T> utility type work on entire interfaces?",
      "What is the difference between optional properties and null values?"
    ],
    keyPoints: [
      "? marks properties as optional (type becomes T | undefined)",
      "readonly prevents reassignment at compile time",
      "readonly is shallow; nested object properties can still be modified",
      "Helps enforce immutability patterns in state management"
    ],
    tags: ["optional", "readonly", "interfaces", "immutability"],
    relatedLessonSlug: "/learn/typescript/ts03-interfaces-vs-type-aliases",
    relatedLessonName: "TS-03: Interfaces vs Type Aliases & Augmentation"
  },
  {
    id: "ts-q08",
    trackKey: "typescript",
    category: "Type Composition",
    subtopic: "Unions and Intersections",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is the difference between Union types (`|`) and Intersection types (`&`) in TypeScript?",
    answer: `### Simple answer:
- **Union (\`|\`)**: Means **OR**. The value can be one type OR another.
- **Intersection (\`&\`)**: Means **AND**. The value must combine all features of both types.

### Example:
\`\`\`typescript
// Union: value can be a string OR a number
type ID = string | number;
let userId: ID = "user-1"; // valid
userId = 101;              // valid

// Intersection: combines two object shapes
interface Person {
  name: string;
}
interface Employee {
  company: string;
  salary: number;
}

type WorkingPerson = Person & Employee;

const dev: WorkingPerson = {
  name: "Elena",
  company: "Tech Corp",
  salary: 120000,
};
\`\`\`

### Interview answer:
Union types (\`|\`) let a variable hold one of several possible types (e.g. \`string | number\`). Intersection types (\`&\`) merge multiple types together into one unified type that contains all properties from each operand.`,
    followUps: [
      "What happens if an intersection combines incompatible primitive types like `string & number`?",
      "How do union types interact with object property access?",
      "Why can you only access common properties on a union of objects without narrowing?"
    ],
    keyPoints: [
      "Union (|) represents an 'either/or' choice between types",
      "Intersection (&) merges multiple types together",
      "string & number resolves to never (impossible)",
      "To access specific properties on an object union, you must narrow the type first"
    ],
    tags: ["union-types", "intersection-types", "composition", "types"],
    relatedLessonSlug: "/learn/typescript/ts04-unions-and-intersections",
    relatedLessonName: "TS-04: Union & Intersection Types"
  },
  {
    id: "ts-q09",
    trackKey: "typescript",
    category: "Type Assertions",
    subtopic: "Assertions vs Casting",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "What are Type Assertions (`as Type`) and the Non-Null Assertion Operator (`!`) in TypeScript? When should you be cautious with them?",
    answer: `### Simple answer:
A type assertion tells the TypeScript compiler: *"Trust me, I know the type of this value better than you do."* It does **not** perform runtime conversion or type casting.

### How it works:
- **\`as Type\`**: Overrides TypeScript's inferred type.
- **\`value!\` (Non-null assertion)**: Tells TypeScript that \`value\` is definitely neither \`null\` nor \`undefined\`.

### Example:
\`\`\`typescript
// Type assertion for DOM elements:
const button = document.getElementById("submit-btn") as HTMLButtonElement;
button.disabled = true; // TypeScript knows 'disabled' exists on HTMLButtonElement

// Non-null assertion:
const input = document.getElementById("username")!;
console.log(input.tagName); // No 'Object is possibly null' error
\`\`\`

### Why you should be cautious:
Type assertions are purely compile-time instructions. If your assumption is wrong at runtime, the code will crash with \`TypeError: Cannot read properties of null\`! Prefer runtime checks or type guards when possible.

### Interview answer:
Type assertions (\`as\`) and non-null assertions (\`!\`) allow you to tell the compiler to treat a value as a specific type. They do not convert data at runtime, so using them carelessly can hide real bugs. Prefer safe runtime checks whenever possible.`,
    followUps: [
      "What is the difference between TypeScript's `as` and actual runtime casting in languages like Java or C++?",
      "How does `as unknown as DesiredType` work as a double assertion escape hatch?",
      "Why is the angle-bracket syntax `<Type>val` avoided in JSX/TSX files?"
    ],
    keyPoints: [
      "Type assertions do not modify runtime data or do type conversion",
      "Syntax: value as Type or value!",
      "Angle-bracket syntax (<Type>x) conflicts with JSX/TSX tags",
      "Overusing assertions bypasses TypeScript's safety guarantees"
    ],
    tags: ["type-assertions", "non-null-assertion", "casting", "type-safety"],
    relatedLessonSlug: "/learn/typescript/ts05-any-unknown-never-void",
    relatedLessonName: "TS-05: any, unknown, never & Type Lattice"
  },
  {
    id: "ts-q10",
    trackKey: "typescript",
    category: "Generics",
    subtopic: "Generics Fundamentals",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What are Generics in TypeScript, and how do they make functions and components reusable?",
    answer: `### Simple answer:
Generics allow you to write reusable code that works with different types while preserving complete type safety, acting like a variable for types.

### Why not just use \`any\`?
If you use \`any\`, you lose all type information:
\`\`\`typescript
function getFirstAny(arr: any[]): any {
  return arr[0];
}
const val = getFirstAny(["hello", "world"]); // val is typed as 'any', no autocomplete!
\`\`\`

### With Generics:
\`\`\`typescript
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const num = getFirst([1, 2, 3]);       // TypeScript infers num is number!
const str = getFirst(["a", "b", "c"]); // TypeScript infers str is string!
\`\`\`

### Generic Constraints (\`extends\`):
You can restrict what types \`T\` can be:
\`\`\`typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): number {
  return item.length;
}

logLength("hello");   // valid (strings have length)
logLength([1, 2, 3]); // valid (arrays have length)
// logLength(123);    // Error: number has no 'length' property!
\`\`\`

### Interview answer:
Generics allow functions, interfaces, and classes to accept types as parameters. This avoids code duplication and keeps full type safety without resorting to \`any\`. You can also constrain generics using \`extends\` to ensure the type has specific required properties.`,
    followUps: [
      "How do multiple generic parameters work (e.g. <T, K>)?",
      "Can generics have default types like <T = string>?",
      "How do generic React components work in TSX?"
    ],
    keyPoints: [
      "Generics act like variables for types (<T>)",
      "Preserves input-to-output type relationships unlike any",
      "Supports generic constraints with extends (T extends HasId)",
      "Widely used in API response wrappers, array methods, and state hooks"
    ],
    tags: ["generics", "reusability", "type-safety", "constraints"],
    relatedLessonSlug: "/learn/typescript/ts07-generics-fundamentals",
    relatedLessonName: "TS-07: Generics & Type Parameter Constraints"
  },
  {
    id: "ts-q11",
    trackKey: "typescript",
    category: "Type Guards & Narrowing",
    subtopic: "Type Guards",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What are Type Guards, and how do user-defined type predicates (`parameter is Type`) work?",
    answer: `### Simple answer:
A Type Guard is a runtime check that allows TypeScript to narrow down the type of a variable within a specific conditional code block.

### Built-in Type Guards:
- **\`typeof\`**: For primitive types (\`typeof x === "string"\`).
- **\`instanceof\`**: For class instances (\`err instanceof Error\`).
- **\`in\` operator**: Checks for property existence on objects (\`"message" in error\`).

### User-Defined Type Guard (Type Predicate):
When built-in checks are not enough, you create a function with a return type of \`parameter is TargetType\`:

\`\`\`typescript
interface Fish {
  swim: () => void;
}
interface Bird {
  fly: () => void;
}

// User-defined type guard:
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim(); // TypeScript knows pet is Fish here!
  } else {
    pet.fly();  // TypeScript knows pet is Bird here!
  }
}
\`\`\`

### Interview answer:
Type guards allow TypeScript to narrow a broad type into a specific type based on runtime checks. In addition to \`typeof\`, \`instanceof\`, and \`in\`, you can create custom type guard functions returning \`param is Type\`, which tells the compiler that returning \`true\` guarantees the parameter matches that type.`,
    followUps: [
      "What happens if a type predicate function returns true but the logic is wrong?",
      "How does Assertion Functions (asserts condition) differ from type predicates?",
      "How does Zod or Yup integrate with TypeScript type narrowing?"
    ],
    keyPoints: [
      "Built-in guards: typeof, instanceof, in operator",
      "User-defined guards use the 'param is Type' return signature",
      "Compiler narrows types inside the true/false branches",
      "Crucial for validating untrusted API payloads safely"
    ],
    tags: ["type-guards", "type-narrowing", "predicates", "runtime-checks"],
    relatedLessonSlug: "/learn/typescript/ts06-discriminated-unions-exhaustiveness",
    relatedLessonName: "TS-06: Discriminated Unions & Exhaustiveness Checks"
  },
  {
    id: "ts-q12",
    trackKey: "typescript",
    category: "Advanced Types",
    subtopic: "Keyof and Typeof",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How do the `keyof` and `typeof` operators work in TypeScript, and how are they used together?",
    answer: `### Simple answer:
- **\`typeof\`**: Extracts the TypeScript type of an existing JavaScript value or variable.
- **\`keyof\`**: Takes an object type and creates a union of all its property names (keys) as string literals.

### Using them together:
When you have a JavaScript object or config and want a type representing all its valid keys, you combine them: **\`keyof typeof obj\`**.

### Example:
\`\`\`typescript
const themeColors = {
  primary: "#3b82f6",
  secondary: "#64748b",
  danger: "#ef4444",
};

// 1. typeof extracts the shape:
type Theme = typeof themeColors;
// { primary: string; secondary: string; danger: string; }

// 2. keyof produces a union of its keys:
type ColorName = keyof typeof themeColors;
// "primary" | "secondary" | "danger"

function getColor(color: ColorName) {
  return themeColors[color];
}

getColor("primary"); // valid!
// getColor("purple");  // Compile Error: Argument is not assignable to ColorName
\`\`\`

### Interview answer:
In TypeScript, \`typeof\` extracts the type from a runtime value, and \`keyof\` produces a union of an object type's property names. Combining \`keyof typeof obj\` creates a strict union of keys directly from an existing JavaScript object without having to duplicate types manually.`,
    followUps: [
      "What does keyof any evaluate to?",
      "How does keyof work with indexed access types (Obj[K])?",
      "What is the difference between JavaScript's runtime typeof and TypeScript's compile-time typeof?"
    ],
    keyPoints: [
      "typeof extracts type from runtime values",
      "keyof extracts union of keys from an object type",
      "keyof typeof object creates union of valid keys from an object instance",
      "Eliminates duplicate manual union definitions"
    ],
    tags: ["keyof", "typeof", "operators", "utility-types"],
    relatedLessonSlug: "/learn/typescript/ts08-utility-types-and-keyof",
    relatedLessonName: "TS-08: Utility Types & keyof / typeof Operators"
  },
  {
    id: "ts-q13",
    trackKey: "typescript",
    category: "Utility Types",
    subtopic: "Built-in Utilities",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "Explain the common TypeScript Utility Types: `Partial`, `Required`, `Pick`, `Omit`, and `Record`.",
    answer: `### Simple answer:
TypeScript provides built-in utility types to transform existing types without rewriting them from scratch:

- **\`Partial<T>\`**: Makes all properties in \`T\` **optional** (\`?\`).
- **\`Required<T>\`**: Makes all properties in \`T\` **required** (removes \`?\`).
- **\`Pick<T, K>\`**: Selects a **subset** of properties \`K\` from \`T\`.
- **\`Omit<T, K>\`**: Excludes a **subset** of properties \`K\` from \`T\`.
- **\`Record<K, T>\`**: Constructs an object type whose keys are \`K\` and values are \`T\`.

### Example:
\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

// Partial: ideal for update operations
type UpdateUserInput = Partial<User>; // all fields optional

// Pick: only id and name
type UserSummary = Pick<User, "id" | "name">;

// Omit: everything except id
type CreateUserInput = Omit<User, "id">;

// Record: map of roles to user lists
type RoleMembers = Record<"admin" | "editor" | "viewer", User[]>;
\`\`\`

### Interview answer:
These utilities transform existing types cleanly. \`Partial\` makes all fields optional for update operations, \`Pick\` and \`Omit\` select or exclude specific properties for specialized models, and \`Record\` defines key-value dictionary types safely.`,
    followUps: [
      "How are Partial and Required implemented under the hood with mapped types?",
      "What is the difference between Omit and Exclude?",
      "Can you combine Pick and Partial together?"
    ],
    keyPoints: [
      "Partial<T> makes all keys optional; Required<T> makes all required",
      "Pick<T, K> keeps specified keys; Omit<T, K> removes specified keys",
      "Record<K, V> creates dictionary types with specified key and value types",
      "Promotes DRY (Don't Repeat Yourself) type definitions"
    ],
    tags: ["utility-types", "partial", "pick", "omit", "record"],
    relatedLessonSlug: "/learn/typescript/ts08-utility-types-and-keyof",
    relatedLessonName: "TS-08: Utility Types & keyof / typeof Operators"
  },
  {
    id: "ts-q14",
    trackKey: "typescript",
    category: "Mapped & Index Types",
    subtopic: "Mapped Types",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What are Index Signatures and Mapped Types in TypeScript?",
    answer: `### Simple answer:
- **Index Signature**: Allows an object to have dynamic keys when you don't know the exact property names in advance.
- **Mapped Type**: Creates a new type by iterating over keys of an existing type and transforming each property.

### Index Signature Example:
\`\`\`typescript
// Can have any string key with number value
interface CacheStorage {
  [key: string]: number;
}

const memoryCache: CacheStorage = {
  userCount: 42,
  cacheHits: 1200,
};
\`\`\`

### Mapped Type Example:
\`\`\`typescript
// Transform all properties of an object to boolean flags:
type FeatureFlags<T> = {
  [K in keyof T]: boolean;
};

interface AppConfig {
  darkMode: string;
  analytics: string;
}

type AppFeatures = FeatureFlags<AppConfig>;
// Result: { darkMode: boolean; analytics: boolean; }
\`\`\`

### Modifying Modifiers (\`-\` and \`+\`):
Mapped types can add or remove \`readonly\` and \`?\`:
\`\`\`typescript
// Removes optional modifier from all keys:
type Concrete<T> = {
  [K in keyof T]-?: T[K];
};
\`\`\`

### Interview answer:
Index signatures define objects with arbitrary keys. Mapped types take it further by iterating over a union of keys (\`[K in keyof T]\`) to transform properties, which is the underlying mechanism used by utility types like \`Partial\` and \`Readonly\`.`,
    followUps: [
      "What is key remapping in mapped types using the 'as' keyword?",
      "Why is Record<string, T> often preferred over [key: string]: T?",
      "Can an interface have both fixed properties and an index signature?"
    ],
    keyPoints: [
      "Index signatures define open dictionaries ([key: string]: T)",
      "Mapped types iterate over keys ([K in keyof T]: T[K])",
      "Mapped types can add or remove readonly and optional modifiers (-? / +?)",
      "Powers built-in utilities like Partial, Readonly, and Required"
    ],
    tags: ["mapped-types", "index-signatures", "advanced-types", "generics"],
    relatedLessonSlug: "/learn/typescript/ts08-utility-types-and-keyof",
    relatedLessonName: "TS-08: Utility Types & keyof / typeof Operators"
  },
  {
    id: "ts-q15",
    trackKey: "typescript",
    category: "Advanced Types",
    subtopic: "Conditional Types",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "What are Conditional Types in TypeScript, and how does Distributive Conditional behavior work?",
    answer: `### Simple answer:
Conditional types act like ternary operators for types: \`T extends U ? X : Y\`. They choose one of two possible types based on whether type \`T\` is assignable to \`U\`.

### Basic Example:
\`\`\`typescript
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>; // "yes"
type B = IsString<number>; // "no"
\`\`\`

### Distributive Conditional Types:
When a conditional type is given a **naked type parameter that is a Union**, TypeScript automatically distributes the condition across each member of the union:

\`\`\`typescript
// Exclude implementation:
type MyExclude<T, U> = T extends U ? never : T;

type Result = MyExclude<"a" | "b" | "c", "a">;
// Evaluates as:
// ("a" extends "a" ? never : "a") |
// ("b" extends "a" ? never : "b") |
// ("c" extends "a" ? never : "c")
// Result: never | "b" | "c" => "b" | "c"
\`\`\`

### Interview answer:
Conditional types allow types to branch using \`T extends U ? TrueType : FalseType\`. When applied to a union, they distribute across each member of the union individually, which is how utility types like \`Exclude\` and \`Extract\` filter union members.`,
    followUps: [
      "How do you prevent a conditional type from distributing across a union? (Hint: [T] extends [U])",
      "How does Extract<T, U> differ from Exclude<T, U>?",
      "Can conditional types be recursively nested?"
    ],
    keyPoints: [
      "Syntax mirrors ternary operator: T extends U ? X : Y",
      "Distributes across unions automatically when T is a naked generic parameter",
      "never in a union gets automatically removed (never | 'b' is 'b')",
      "Used in Exclude, Extract, NonNullable, and ReturnType"
    ],
    tags: ["conditional-types", "distributive", "generics", "type-level"],
    relatedLessonSlug: "/learn/typescript/ts09-conditional-types-and-infer",
    relatedLessonName: "TS-09: Conditional Types & infer Keyword"
  },
  {
    id: "ts-q16",
    trackKey: "typescript",
    category: "Type Narrowing & Literals",
    subtopic: "Const Assertions",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What is a `const` assertion (`as const`) in TypeScript, and how does it differ from a standard `const` variable?",
    answer: `### Simple answer:
A \`const\` variable in JavaScript prevents reassigning the variable itself, but object properties can still be changed. A TypeScript \`as const\` assertion makes the entire data structure **deeply read-only** and locks primitive types to their **exact literal values**.

### Differences:
1. **Literal Types:** Properties are inferred as their exact literal values (e.g. \`"GET"\` instead of \`string\`, \`42\` instead of \`number\`).
2. **Deep Readonly:** Object properties and array elements become deeply \`readonly\`.
3. **Tuples:** Arrays become fixed-length readonly tuples.

### Example:
\`\`\`typescript
// Normal object: properties are mutable strings
const route1 = {
  method: "GET", // type is string
  path: "/users",
};
route1.method = "POST"; // Allowed!

// With 'as const':
const route2 = {
  method: "GET", // type is literally "GET"
  path: "/users", // type is literally "/users"
} as const;

// route2.method = "POST"; // Error: Cannot assign to read-only property

// Array with 'as const' becomes a readonly tuple:
const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE"] as const;
type HttpMethod = typeof HTTP_METHODS[number]; // "GET" | "POST" | "PUT" | "DELETE"
\`\`\`

### Interview answer:
\`as const\` tells TypeScript to infer the narrowest, most specific literal types possible and makes objects and arrays deeply read-only. It is very useful for config objects and deriving strict union types from constant arrays without defining separate enums.`,
    followUps: [
      "Why is `as const` often preferred over TypeScript Enums?",
      "How do you derive a union type from an `as const` array using indexed access `[number]`?",
      "Does `as const` affect runtime JavaScript code?"
    ],
    keyPoints: [
      "Locks types to exact literal values instead of widening to string or number",
      "Applies deep readonly to all properties and nested arrays",
      "Converts arrays to fixed-length readonly tuples",
      "Popular modern alternative to enums"
    ],
    tags: ["as-const", "const-assertions", "literals", "readonly"],
    relatedLessonSlug: "/learn/typescript/ts04-unions-and-intersections",
    relatedLessonName: "TS-04: Union & Intersection Types"
  },
  {
    id: "ts-q17",
    trackKey: "typescript",
    category: "Compiler & Declarations",
    subtopic: "Ambient Declarations",
    type: "internals",
    difficulty: "hard",
    source: "curated",
    question: "What are Ambient Declarations and `.d.ts` declaration files? How does TypeScript provide types for untyped JavaScript libraries?",
    answer: `### Simple answer:
Ambient Declarations describe the types of existing JavaScript code or environment variables to the TypeScript compiler without generating any JavaScript code. They live in \`.d.ts\` (Declaration) files.

### Why they are needed:
When you install a JavaScript package from npm that has no TypeScript types (e.g. an older library), or when using browser globals injected by a script tag, TypeScript does not know what properties exist.

### How they work:
- The \`declare\` keyword tells the compiler: *"This variable or module exists in the runtime environment; here is its type shape."*
- \`.d.ts\` files contain **only type signatures**, never executable JavaScript implementations.

### Example:
\`\`\`typescript
// globals.d.ts:
declare const __API_BASE_URL__: string;

declare global {
  interface Window {
    analyticsTracker: {
      trackEvent: (name: string) => void;
    };
  }
}

// Declaring an untyped external library module:
declare module "untyped-chart-lib" {
  export function renderChart(elementId: string, data: number[]): void;
}
\`\`\`

### \`@types\` and DefinitelyTyped:
The community repository **DefinitelyTyped** hosts thousands of \`.d.ts\` files published to npm under the \`@types/\` scope (e.g. \`@types/react\`, \`@types/node\`).

### Interview answer:
\`.d.ts\` files contain ambient declarations using the \`declare\` keyword. They provide type information for JavaScript libraries and global environment variables so TypeScript can check them and offer autocomplete, without producing any JavaScript output during compilation.`,
    followUps: [
      "What is the difference between .ts and .d.ts files?",
      "How does the declaration option in tsconfig.json automatically generate .d.ts files for your package?",
      "What is module augmentation and how do you extend third-party types?"
    ],
    keyPoints: [
      ".d.ts files contain only type declarations, producing zero compiled JS",
      "declare keyword introduces types for runtime variables or external modules",
      "@types packages provide community declarations from DefinitelyTyped",
      "Essential for authoring published npm packages and adding types to legacy JS"
    ],
    tags: ["declarations", "ambient", "dts", "compiler", "definitely-typed"],
    relatedLessonSlug: "/learn/typescript/ts10-declaration-files-and-ambient-types",
    relatedLessonName: "TS-10: Ambient Declarations & .d.ts Architecture"
  },
  {
    id: "ts-q18",
    trackKey: "typescript",
    category: "Type System Internals",
    subtopic: "Variance",
    type: "internals",
    difficulty: "hard",
    source: "curated",
    question: "Explain Covariance and Contravariance in TypeScript function types.",
    answer: `### Simple answer:
Variance describes how subtyping between complex types relates to subtyping between their component types:
- **Covariant (Output positions):** Subtyping direction is **preserved**. (A \`Dog\` is an \`Animal\`, so a function returning \`Dog\` can be used where a function returning \`Animal\` is expected).
- **Contravariant (Input/Parameter positions):** Subtyping direction is **reversed**. (A function that can accept any \`Animal\` can be safely passed where a function accepting \`Dog\` is expected, because it can handle any animal!).

### Demonstration:
\`\`\`typescript
class Animal { name = "Animal"; }
class Dog extends Animal { bark() {} }

// Functions:
type AnimalConsumer = (a: Animal) => void;
type DogConsumer = (d: Dog) => void;

let processAnimal: AnimalConsumer = (a) => console.log(a.name);
let processDog: DogConsumer = (d) => d.bark();

// CONTRAVARIANCE on parameters:
// Can we assign processAnimal to DogConsumer?
processDog = processAnimal; // YES! processAnimal can safely handle any Dog.

// Can we assign processDog to AnimalConsumer?
// processAnimal = processDog; // NO! An animal might be a Cat with no bark()!
\`\`\`

### TypeScript's \`strictFunctionTypes\` setting:
By default in strict mode (\`strictFunctionTypes: true\`), TypeScript enforces **contravariance on function parameters**, preventing unsafe method calls.

### Interview answer:
Return types are covariant because returning a more specific subtype is always safe. Function parameters are contravariant because a function that handles a broader supertype can safely replace one expecting a narrow subtype. TypeScript enforces this with \`strictFunctionTypes\`.`,
    followUps: [
      "Why are method declarations on interfaces bivariant by default in TypeScript?",
      "How does covariance affect generic types like List<T>?",
      "What is the in and out variance annotation syntax introduced in TypeScript 4.7?"
    ],
    keyPoints: [
      "Return types are covariant (preserves subtyping direction)",
      "Function parameters are contravariant under strictFunctionTypes",
      "A handler accepting Animal can safely substitute for a handler expecting Dog",
      "strictFunctionTypes prevents runtime type crashes"
    ],
    tags: ["variance", "covariance", "contravariance", "strictFunctionTypes", "internals"],
    relatedLessonSlug: "/learn/typescript/ts09-conditional-types-and-infer",
    relatedLessonName: "TS-09: Conditional Types & infer Keyword"
  }
];
