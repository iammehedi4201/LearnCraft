# LearnCraft TypeScript Curriculum

## Learning goal

Learn the main idea behind each TypeScript concept. You do not need to memorize every feature or understand every rare detail. AI can help write code, but you should be able to read the code, understand what it is doing, decide whether the approach makes sense, and explain the important choices.

Each lesson uses only the sections that help teach that topic. Easy topics stay short. Moderate topics get a clear explanation and practical example. Difficult topics are explained step by step.

Every lesson includes a scenario question and a simple model answer. The scenarios check whether learners can explain the concept and use it in a realistic situation. For important TypeScript topics, include common interview questions with short sample answers in easy English. Do not label every scenario as a frequently asked interview question unless that is well founded.

---

# Part 1: TypeScript Basics

## Lesson 1: What TypeScript Does
**Difficulty: Easy**

TypeScript adds a type system to JavaScript. Types help you catch many mistakes while writing or checking code, before the code runs.

```ts
let userName: string = "Rina";
userName = "Mehedi"; // valid
// userName = 25;     // TypeScript error
```

Here, `string` means the variable should hold text. TypeScript warns us when we try to put a number into it.

**Why use it?** Types make code easier to understand and help catch some mistakes early. They do not find every bug, and they do not automatically check data received from an API at runtime.

**Scenario:** You join a project and see `let price: number = 500`. What does `number` tell you, and what kind of mistake can TypeScript catch here?

**Simple answer:** `number` tells us that `price` should hold a number. TypeScript can warn us if we try to assign text such as `"five hundred"` to it.

## Lesson 2: Type Annotations and Type Inference
**Difficulty: Easy**

A type annotation tells TypeScript the type you want. Type inference means TypeScript works out the type from the value you give it.

```ts
let age: number = 25; // annotation
let city = "Dhaka";   // inferred as string

age = 26;
city = "Sylhet";
// city = 10;          // TypeScript error
```

You do not need to write a type for every variable. TypeScript can often work it out.

**When to use it:** Add a type when it makes the code clearer or when TypeScript cannot work out the intended type. Let inference handle obvious cases.

**Scenario:** You write `const total = 100`. Do you need to add `: number`? Explain why or why not.

**Simple answer:** No. TypeScript can see that `100` is a number, so it works out the type for us. Adding `: number` is possible, but it is not needed here.

## Lesson 3: Basic Types and Arrays
**Difficulty: Easy**

The types you will see most often are `string` for text, `number` for numbers, and `boolean` for `true` or `false`. An array type describes what kind of items a list contains.

```ts
let productName: string = "Keyboard";
let price: number = 1200;
let isAvailable: boolean = true;
let scores: number[] = [85, 90, 78];
```

`number[]` means the array should contain numbers.

**Scenario:** A list should contain only a user's favorite book titles. Which type would fit the list, and why?

**Simple answer:** Use `string[]`, because every book title is text. For example, `const books: string[] = ["Dune", "Matilda"]`.

## Lesson 4: Function Parameters and Return Types
**Difficulty: Moderate**

Function types describe what information a function expects and what it gives back. This helps people understand how to call the function correctly.

```ts
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

const total = calculateTotal(250, 3); // 750
```

The function expects two numbers and returns a number. TypeScript can report an error if you pass a string where a number is required.

**Why use it?** A clear function type acts like a small agreement between the function and the code that uses it.

**Scenario:** A function sends an email and does not return a useful value. Would `string` be a good return type? Explain what you would use instead and why.

**Simple answer:** No. If the function does not return a useful value, use `void` as its return type. For example, `function sendEmail(): void { /* send email */ }`.

---

# Part 2: Describe Your Data

## Lesson 5: Object Types
**Difficulty: Moderate**

An object type describes which fields an object should have and what type each field should contain.

```ts
type User = {
  id: number;
  name: string;
  email?: string;
};

const user: User = {
  id: 1,
  name: "Rina",
};
```

The `id` and `name` fields are required. The `?` makes `email` optional.

**When to use it:** Use object types when you want to describe data such as a user, product, order, or API response.

**Scenario:** A customer can create an account without adding a phone number. How would you describe the `phone` field so it is allowed to be missing?

**Simple answer:** Make the field optional with `phone?: string`. This means the customer object can include a phone number, but it does not have to.

## Lesson 6: `type` and `interface`
**Difficulty: Moderate**

Both `type` and `interface` can describe the fields an object should have.

```ts
interface User {
  id: number;
  name: string;
}

type Product = {
  id: number;
  title: string;
};

function greet(user: User): string {
  return `Hello, ${user.name}`;
}
```

A `type` can also name types beyond object shapes, such as a union of several possible values. Interfaces are often used to describe object shapes and can be extended. For many simple object shapes, either choice works.

**Scenario:** You need a type called `Status` that can be `"pending"`, `"success"`, or `"failed"`. Would a `type` alias or an `interface` be the natural choice? Explain why.

**Simple answer:** Use a `type` alias, because it can describe a union of exact string choices: `type Status = "pending" | "success" | "failed"`. An interface is mainly used to describe object shapes.

**Interview question:** What is one important difference between `type` and `interface`?

**Simple interview answer:** Both can describe an object's fields. A `type` can also describe a union, such as `string | number`. An `interface` is commonly used to describe an object shape and can be extended.

## Lesson 7: Union Types and Literal Types
**Difficulty: Moderate**

A union type lets a value be one of several types. A literal type limits a value to a specific set of choices.

```ts
type UserId = string | number;
type Status = "pending" | "success" | "failed";

const id: UserId = 42;
let status: Status = "pending";
// status = "finished"; // TypeScript error
```

`UserId` can be a string or a number. `Status` can only be one of the three listed strings.

**Why use it?** It makes allowed choices clear and helps prevent unsupported values from entering your code.

**Scenario:** An order can be only `"new"`, `"shipped"`, or `"delivered"`. How could you describe those allowed states?

**Simple answer:** Use a union of literal types: `type OrderStatus = "new" | "shipped" | "delivered"`. TypeScript will warn us if we use a different value, such as `"cancelled"`, unless we add it to the type.

## Lesson 8: Optional Values, `null`, and `undefined`
**Difficulty: Moderate**

Sometimes a value may be missing. An optional field can be absent, and a value may also be `null` or `undefined`, depending on how the code is designed.

```ts
function getDisplayName(name: string | undefined): string {
  if (name === undefined) {
    return "Guest";
  }

  return name.toUpperCase();
}
```

The function checks whether the name is missing before using a string method. With `strictNullChecks` enabled, TypeScript helps you handle possible `null` and `undefined` values.

**Why use it?** It makes missing data visible instead of letting the code assume a value always exists.

**Scenario:** A user profile may not have a saved nickname. What should the code check before calling a string method on that nickname?

**Simple answer:** Check that the nickname exists before using a string method. For example, use `if (nickname !== undefined)` before calling `nickname.toUpperCase()`. If it can also be `null`, check for that too.

## Lesson 9: Type Narrowing
**Difficulty: Difficult**

A value can have more than one possible type. Type narrowing uses a check to help TypeScript understand which type the value has in a certain part of the code.

```ts
function formatId(id: string | number): string {
  if (typeof id === "number") {
    return id.toFixed(0);
  }

  return id.toUpperCase();
}
```

How it works:

1. `id` may be a string or a number.
2. The `typeof` check asks whether it is a number.
3. Inside the `if` block, TypeScript knows `id` is a number, so `toFixed()` is allowed.
4. After that check, the remaining possibility is a string, so `toUpperCase()` is allowed.

**When to use it:** Use narrowing when a value can have different types and each type needs different handling.

**Scenario:** A function accepts either a string or an array of strings. What could you check before using a method that exists only on arrays? Explain your choice.

**Simple answer:** Use `Array.isArray(value)`. If it returns `true`, the value is an array, so we can safely use array methods in that branch. Otherwise, handle it as a string.

**Interview question:** What does type narrowing mean?

**Simple interview answer:** Type narrowing means checking a value so TypeScript can work out which type it has in that part of the code. For example, `typeof value === "string"` tells TypeScript the value is a string inside that branch.

---

# Part 3: Work With Types Safely

## Lesson 10: `any` vs. `unknown`
**Difficulty: Moderate**

Both can hold values of an unknown type, but they provide different levels of safety. `any` turns off many type checks. `unknown` makes you check the value before using it in a type-specific way.

```ts
let loose: any = "hello";
loose.toFixed(2); // TypeScript allows it; it fails at runtime

let checked: unknown = "hello";
if (typeof checked === "string") {
  console.log(checked.toUpperCase());
}
```

The `any` example is allowed by TypeScript even though a string does not have `toFixed()`. The `unknown` example checks the type first.

**Rule of thumb:** Prefer `unknown` when you do not yet know a value's type. Use `any` only when there is a clear reason to give up type checking.

**Scenario:** An external tool gives your code a value, but you do not know whether it is a string, number, or object. Which is the safer starting type: `any` or `unknown`? Why?

**Simple answer:** Use `unknown`. It lets the value be anything, but asks us to check its type before we use it in a specific way. `any` skips many of those checks.

**Interview question:** Why is `unknown` usually safer than `any`?

**Simple interview answer:** `any` skips many type checks. `unknown` makes us check the value before using it as a string, number, or another specific type, so it is usually safer.

## Lesson 11: Type Assertions
**Difficulty: Moderate**

A type assertion tells TypeScript to treat a value as a chosen type. It does not change the value or prove that the value really has that type.

```ts
const element = document.querySelector("input") as HTMLInputElement;
```

This tells TypeScript to treat the result as an input element. But the selector might not find anything, so the actual value can still be `null`. An assertion is not a runtime check.

A safer check is:

```ts
const element = document.querySelector("input");
if (element) {
  element.value = "Hello";
}
```

**Scenario:** An AI-generated answer adds `as User` to silence a type error. What should you check before accepting that change?

**Simple answer:** Check what the value really contains and why the original type error happened. `as User` does not change or validate the value. If the data comes from outside the app, check its fields at runtime.

## Lesson 12: Generics
**Difficulty: Difficult**

Generics let you write reusable code that works with different types while keeping track of the type being used.

```ts
function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}

const firstName = firstItem(["Ava", "Liam"]); // string | undefined
const firstScore = firstItem([90, 85]);         // number | undefined
```

How it works:

1. `T` is a placeholder for a type.
2. TypeScript works out `T` from the array passed to the function.
3. The function returns an item of that same type, or `undefined` if the array is empty.
4. One function works with different types without losing useful type information.

**Why use it?** Generics are useful for reusable functions, API helpers, and shared components that should keep the relationship between input and output types.

**Scenario:** You want one helper that returns the first item from a list of users or a list of numbers. Why could a generic be better than using `any`?

**Simple answer:** A generic lets one function work with both lists while keeping the correct item type. With a users list, the result is a user; with a numbers list, the result is a number. `any` would lose that helpful type information.

**Interview question:** What problem do generics solve?

**Simple interview answer:** Generics let one function or type work with different kinds of data while keeping track of each kind. This avoids losing type information by using `any`.

## Lesson 13: Common Utility Types
**Difficulty: Moderate**

Utility types help you create a type from an existing type, so you do not need to repeat the same fields.

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

type UserPreview = Pick<User, "id" | "name">;
type UserUpdate = Partial<Pick<User, "name" | "email">>;
```

- `Pick` keeps the fields you name.
- `Partial` makes the chosen fields optional.
- `Omit` removes fields you name.
- `Record` describes an object with a set of key and value types.

You do not need to memorize every utility type. Learn the common ones and learn to recognize them in existing code.

**Scenario:** A form updates only a user's name or email, and it does not require both fields every time. Which utility type could help make those fields optional?

**Simple answer:** Use `Partial`, applied to the fields the form can update. For example, `type UserUpdate = Partial<Pick<User, "name" | "email">>`. That makes both fields optional for an update.

## Lesson 14: Classes and `implements`
**Difficulty: Moderate**

A class groups data and methods together. TypeScript can check that a class follows the shape described by an interface by using `implements`.

```ts
interface HasId {
  id: number;
}

class Product implements HasId {
  constructor(public id: number, public name: string) {}
}
```

The class has the `id` field required by `HasId`. TypeScript reports an error if a required part is missing. You will see classes in some projects, but not every application needs to use them.

**Scenario:** Several classes must have an `id` number. How could an interface help you check that each class follows this rule?

**Simple answer:** Create an interface such as `interface HasId { id: number }`, then have each class use `implements HasId`. TypeScript will report an error if a class does not provide the required `id` number.

## Lesson 15: Modules and Type Imports
**Difficulty: Moderate**

Modules let you keep related code in separate files. You can export a type from one file and import it where it is needed instead of copying the same type definition.

In `types.ts`:

```ts
export type User = {
  id: number;
  name: string;
};
```

In `greeting.ts`:

```ts
import type { User } from "./types";

export function greet(user: User): string {
  return `Hello, ${user.name}`;
}
```

`import type` shows that `User` is needed for type checking. Exact module rules depend on the project's configuration, so follow the setup already used by the project.

**Scenario:** Three files need the same `User` type. Why is importing it from one shared file better than defining it differently in all three files?

**Simple answer:** All three files use the same definition, so the type stays consistent. If the `User` shape changes, we update it in one place instead of trying to keep several copies in sync.

---

# Part 4: Understand TypeScript in Real Projects

## Lesson 16: Promises and `async` Functions
**Difficulty: Moderate**

An `async` function returns a Promise. `Promise<string>` means the Promise will provide a string if it succeeds. `await` lets you wait for the Promise's result inside an async function.

```ts
async function getUserName(): Promise<string> {
  return "Rina";
}

async function showName(): Promise<void> {
  const name = await getUserName();
  console.log(name);
}
```

`Promise<void>` means the function does not return a useful value to its caller. A Promise can fail, so real code may also need error handling.

**Scenario:** A function loads a user's name from a server. Why might its return type be `Promise<string>` instead of simply `string`?

**Simple answer:** The server response takes time, so the function returns a Promise that will provide a string later. `string` would describe a value available right away, not the Promise used for an async result.

## Lesson 17: Check API Data Before Trusting It
**Difficulty: Difficult**

TypeScript can describe the data you expect from an API, but it cannot guarantee that the server actually sent that data. Data from outside your application must be checked at runtime before you trust its shape.

```ts
type User = {
  id: number;
  name: string;
};

const data: unknown = await response.json();

if (
  typeof data === "object" &&
  data !== null &&
  "id" in data &&
  typeof data.id === "number" &&
  "name" in data &&
  typeof data.name === "string"
) {
  const user: User = {
    id: data.id,
    name: data.name,
  };
  console.log(user.name);
}
```

How it works:

1. Treat the response as `unknown` because its contents have not been checked.
2. Check that it is an object and not `null`.
3. Check that `id` exists and is a number.
4. Check that `name` exists and is a string.
5. After those checks, create a value that matches `User`.

For larger apps, a reusable validation function or a validation library can make these checks easier to maintain.

**Important:** `data as User` does not validate an API response.

**Scenario:** Your app expects an API response to contain `id` and `name`, but the server sometimes sends `id` as text. What could go wrong, and why is a TypeScript type alone not enough to verify the response?

**Simple answer:** Code may expect `id` to be a number and then fail or behave incorrectly when it receives text. TypeScript checks our code before it runs, but it does not automatically check the real API response. We must validate the data when it arrives.

## Lesson 18: Find and Fix Type Errors
**Difficulty: Moderate**

A type error usually means a value does not match what the code expects. Read the error and find the mismatch instead of hiding it.

```ts
function welcome(name: string): string {
  return `Welcome, ${name}`;
}

welcome(42); // Error: number is not a string
```

Fix the call if the function should receive a name:

```ts
welcome("Rina");
```

When you see a type error:

1. Find the value mentioned in the error.
2. Check which type the code expects.
3. Check which type the value actually has.
4. Decide what the program should do.
5. Fix the cause and run the type check or tests again.

Do not automatically use `any` or a type assertion to silence an error. Understand the mismatch first.

**Scenario:** AI suggests adding `as any` to make a compiler error disappear. What would you investigate before accepting that fix?

**Simple answer:** First check what TypeScript expected, what value we actually have, and why they do not match. `as any` hides the warning without fixing the cause, so the bug may still happen when the app runs.

---

# How to Use These Lessons

- Easy lessons should normally stay short and use one example.
- Moderate lessons should explain the main idea, its purpose, and the important code behavior.
- Difficult lessons should explain prerequisites and walk through the example step by step.
- Include a scenario question and a simple answer for every topic, so learners can see how to explain the idea and apply it.
- Cover realistic scenarios across all important topics, but do not claim every question is guaranteed to appear in an interview.
- For topics that commonly matter in interviews, include an additional interview question and a short model answer in easy English.
- Keep answers direct: say what you would do and why, then show a small example only when it helps.
- Add interview-style questions only to important topics. Do not make every lesson feel like interview preparation.
- Do not add a quiz, summary, list of best practices, or extra section unless it helps the learner understand the topic.
- Do not add advanced details merely to make a lesson look complete.

# Content Boundaries

This is a focused TypeScript track. Do not turn it into a full JavaScript, React, Next.js, Node.js, database, or deployment course. Briefly explain a prerequisite only when needed to understand the TypeScript lesson.

The goal is not to master every TypeScript feature. The goal is to understand core concepts, explain why and when they are used, read code confidently, answer practical scenario questions in simple words, and evaluate AI-generated code without blindly trusting it. Every topic should have a scenario question and an easy-to-understand answer. Important interview topics should also have common interview questions with sample answers.
