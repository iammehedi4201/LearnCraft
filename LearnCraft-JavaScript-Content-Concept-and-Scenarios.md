# LearnCraft JavaScript Curriculum: Core Concepts and Scenarios

## Learning goal

Learn the main idea behind each JavaScript topic. Learners do not need to memorize every feature or understand every rare detail. AI can help write code, but learners should understand what the code does, why it is used, and whether a solution makes sense.

Keep easy topics short. Explain moderate topics clearly. Teach difficult topics step by step. Remove details that do not help learners understand or use the core concept.

Every lesson below includes a scenario question and a simple model answer. Interview questions are included only for topics that are especially useful for common JavaScript interviews. A scenario question is practice for explaining and applying a concept; it is not automatically a claim that the question is frequently asked in interviews.

---

# Part 1: JavaScript Foundations

## Lesson 1: What JavaScript Does
**Difficulty: Easy**

JavaScript is a programming language used to make web pages respond to users. It can also run outside the browser, such as on a server with Node.js.

```js
const buttonMessage = "Welcome!";
console.log(buttonMessage);
// Welcome!
```

This example stores text and prints it. Real applications use JavaScript for actions such as checking forms, updating a page, calling APIs, and handling user actions.

**Why it matters:** You need to understand what JavaScript is responsible for before learning its features.

**Scenario:** You are building a sign-up page. The page needs to check whether an email field is empty when the user clicks Submit. What can JavaScript do here?

**Simple answer:** JavaScript can respond to the click, check the field's value, and show a message if the email is empty. HTML creates the field, CSS styles it, and JavaScript handles the behavior.

## Lesson 2: Variables: `const` and `let`
**Difficulty: Easy**

Variables give names to values. Use `const` when you will not reassign the variable. Use `let` when you need to assign it a different value later.

```js
const userName = "Rina";
let score = 0;

score = score + 10;
console.log(userName, score);
// Rina 10
```

Use `const` by default. Choose `let` when the variable must change. A `const` object can still have its properties changed; `const` prevents reassignment of the variable, not every change inside an object.

**Scenario:** A shopping cart starts with a total of 0, and the total changes whenever the user adds an item. Which declaration fits the total?

**Simple answer:** Use `let total = 0`, because the total must be reassigned as items are added. A name that does not need reassignment can usually use `const`.

## Lesson 3: Basic Values and Types
**Difficulty: Easy**

JavaScript values include text (`string`), numbers (`number`), true/false values (`boolean`), missing values (`undefined`), intentionally empty values (`null`), and objects.

```js
const productName = "Keyboard";
const price = 1200;
const isAvailable = true;
let selectedProduct;
const chosenColor = null;

console.log(typeof productName); // "string"
console.log(typeof price);       // "number"
console.log(typeof isAvailable); // "boolean"
console.log(selectedProduct);    // undefined
```

`typeof null` is a historical JavaScript quirk that returns `"object"`. Do not use it to check for `null`; use `value === null` instead.

**Scenario:** A user has not selected a delivery date yet. The app needs to represent that no date is currently set. Which value might be used, and what should the app remember?

**Simple answer:** The app may use `null` to mean there is deliberately no selected date. It should check for `null` before trying to use the date. If a variable was never assigned a value, it will usually be `undefined`.

## Lesson 4: Comparisons and `===`
**Difficulty: Moderate**

Comparisons check how values relate. Use `===` for strict equality because it compares values without converting their types. Avoid `==` unless you understand and specifically want its type-conversion behavior.

```js
console.log(5 === 5);   // true
console.log(5 === "5"); // false
console.log(5 == "5");  // true
```

With `===`, the number `5` and the text `"5"` are different values. With `==`, JavaScript converts values in some cases before comparing them, which can be surprising.

**Scenario:** A form sends a user ID as the string `"42"`, but the selected record has the number `42`. Why might `id === selectedId` return `false`?

**Simple answer:** One value is a string and the other is a number. Convert the ID to the intended type before comparing, rather than changing `===` to `==` without understanding the data.

**Interview question:** Why is `===` usually preferred over `==`?

**Simple interview answer:** `===` does not convert the values to another type before comparing them, so its result is usually easier to predict.

## Lesson 5: Conditions and Truthy/Falsy Values
**Difficulty: Easy**

Conditions let code choose what to do. JavaScript treats some values as false in a condition, including `false`, `0`, `""`, `null`, `undefined`, and `NaN`. Most other values are truthy, including empty arrays and empty objects.

```js
const cartCount = 0;

if (cartCount > 0) {
  console.log("Cart has items");
} else {
  console.log("Cart is empty");
}
// Cart is empty
```

Use a clear condition that matches the meaning you want. For example, check `cartCount > 0` when you want to know whether the cart has items.

**Scenario:** A developer writes `if (items) { ... }` to check whether an array has any items. Why could that check be wrong?

**Simple answer:** An empty array `[]` is truthy in JavaScript. Check `items.length > 0` to see whether the array contains items.

## Lesson 6: Loops
**Difficulty: Moderate**

Loops repeat code. Use a loop when you need to do the same kind of work for several items. `for...of` is useful when you want each value from an array.

```js
const prices = [100, 200, 300];
let total = 0;

for (const price of prices) {
  total += price;
}

console.log(total); // 600
```

The loop takes each price and adds it to `total`. The loop stops when there are no more values.

**Scenario:** An app has a list of product prices and needs the total before checkout. What could you use, and what should happen for each price?

**Simple answer:** You can use a loop to visit each price and add it to a running total. For this job, `reduce()` is another option, but a loop is often easy to read for beginners.

## Lesson 7: Functions and Return Values
**Difficulty: Moderate**

A function is a reusable block of code. It can receive information through parameters and send a result back with `return`.

```js
function calculateTotal(price, quantity) {
  return price * quantity;
}

const total = calculateTotal(250, 3);
console.log(total); // 750
```

`price` and `quantity` are parameters. The call passes `250` and `3`. `return` sends the result back to the caller. `console.log()` displays a value; it does not replace `return`.

**Scenario:** A function calculates a discount, but the code calling it receives `undefined`. The function only uses `console.log(discount)`. What should you check?

**Simple answer:** The function may be printing the discount instead of returning it. Add `return discount` if the calling code needs to use the result.

**Interview question:** What is the difference between `return` and `console.log()`?

**Simple interview answer:** `return` sends a value back from a function. `console.log()` displays a value in the console for checking or debugging.

## Lesson 8: Global, Function, and Block Scope
**Difficulty: Moderate**

Scope means where a variable can be used in your code. JavaScript has different scopes. Understanding them helps you avoid errors when a variable cannot be accessed where you need it.

### 1. Global scope
In a simple script, a variable declared outside all functions and blocks is often called a global variable. Code inside a function can usually read it unless a nearer variable with the same name takes its place. In JavaScript modules, a top-level variable belongs to that module unless you export it.

```js
const appName = "LearnCraft";

function showAppName() {
  console.log(appName); // LearnCraft
}

showAppName();
```

Use wider-scope variables only when different parts of your code really need to share the value. Too many shared variables can make code harder to understand and can cause naming conflicts.

### 2. Function scope
A variable declared inside a function can be used inside that function, but not from outside it.

```js
function greet() {
  const message = "Hello";
  console.log(message); // Hello
}

greet();
// console.log(message); // ReferenceError
```

Here, `message` belongs to `greet()`. Code outside that function cannot access it.

### 3. Block scope
A block is code inside curly braces `{ }`, such as an `if` statement or a loop. Variables declared with `let` or `const` inside a block can be used only inside that block.

```js
if (true) {
  const message = "Hello from the block";
  console.log(message); // Hello from the block
}

// console.log(message); // ReferenceError
```

#### Remember var
`let` and `const` are block-scoped. `var` is function-scoped, so it can be used outside an `if` block if it was declared inside that block—but it still cannot be used outside the function where it was declared.

```js
if (true) {
  var oldStyle = "I can be used outside this block";
  let modernStyle = "I stay inside this block";
}

console.log(oldStyle); // I can be used outside this block
// console.log(modernStyle); // ReferenceError
```

Prefer `const` by default and use `let` when you need to reassign a value. Avoid `var` in new code unless you have a specific reason to use it.

**Scenario:** A variable is declared inside an `if` block, but a developer tries to use it after the block and gets a `ReferenceError`. Why?

**Simple answer:** The variable is block-scoped, so it is only available inside the block where it was declared. Declare it in a wider scope only if the later code truly needs it.

**Interview question:** What is scope in JavaScript?

**Simple interview answer:** Scope is the part of the code where a variable can be accessed. For example, a `const` declared inside a block cannot be accessed outside that block.

---

# Part 2: Working with Data

## Lesson 9: Arrays and Common Methods
**Difficulty: Moderate**

An array stores an ordered list of values. Common methods help you find, change, or create lists.

```js
const prices = [100, 250, 400];

const discounted = prices.map((price) => price * 0.9);
const expensive = prices.filter((price) => price >= 250);

console.log(discounted); // [90, 225, 360]
console.log(expensive);  // [250, 400]
```

- `map()` makes a new array by changing each item.
- `filter()` makes a new array with items that pass a condition.
- `find()` returns the first matching item, or `undefined` if none matches.
- `some()` checks whether at least one item matches.
- `reduce()` combines items into one result, such as a total.

These methods normally leave the original array unchanged, as long as the callback itself does not mutate objects inside it.

**Scenario:** You need to show only products that cost at least 250. Which array method is a good fit, and why?

**Simple answer:** Use `filter()`, because it creates a new array containing only the products that pass the price condition.

**Interview question:** What is the difference between `map()` and `filter()`?

**Simple interview answer:** `map()` changes each item into a result and returns a new array of those results. `filter()` returns a new array containing only the items that pass a condition.

## Lesson 10: Objects, Destructuring, and Spread
**Difficulty: Moderate**

Objects group related information into named properties. Destructuring takes properties out of an object, while the spread syntax (`...`) copies enumerable properties into a new object.

```js
const user = { name: "Rina", city: "Dhaka" };
const { name } = user;

const updatedUser = { ...user, city: "Sylhet" };

console.log(name);             // Rina
console.log(updatedUser.city); // Sylhet
console.log(user.city);        // Dhaka
```

The spread example makes a shallow copy and changes the city on the new object. Nested objects are not copied deeply; they may still be shared between the old and new objects.

**Scenario:** You need to update a user's city in UI state without changing the existing object directly. What could you do?

**Simple answer:** Create a new object with `{ ...user, city: "Sylhet" }`. This keeps the old object's city unchanged. Remember that this is a shallow copy, so nested objects need extra care.

## Lesson 11: Primitive Values vs. Object References
**Difficulty: Difficult**

Primitive values such as numbers and strings are copied as values. Objects and arrays are accessed through references. When you assign an object to another variable, both variables can refer to the same object.

```js
let firstScore = 10;
let secondScore = firstScore;
secondScore = 20;
console.log(firstScore); // 10

const firstUser = { name: "Rina" };
const secondUser = firstUser;
secondUser.name = "Mehedi";
console.log(firstUser.name); // Mehedi
```

Step by step:
1. `secondScore` receives a copy of the number `10`.
2. Changing `secondScore` does not change `firstScore`.
3. `secondUser` receives a reference to the same object as `firstUser`.
4. Changing the object's `name` through `secondUser` is visible through `firstUser` too.

**Scenario:** A developer copies a settings object into another variable, changes the copy, and unexpectedly sees the original settings change too. What may have happened?

**Simple answer:** Both variables may point to the same object. To make a separate shallow copy, use `{ ...settings }`. If it contains nested objects that also need to be separate, a shallow copy is not enough.

**Interview question:** What is the difference between copying a primitive and assigning an object to another variable?

**Simple interview answer:** A primitive assignment copies the value. An object assignment copies the reference, so both variables can refer to the same object.

## Lesson 12: Optional Chaining and Nullish Coalescing
**Difficulty: Easy**

Optional chaining (`?.`) safely reads a property when something before it may be `null` or `undefined`. Nullish coalescing (`??`) provides a fallback only when the left side is `null` or `undefined`.

```js
const user = { profile: null };
const city = user.profile?.city ?? "Unknown";

console.log(city); // Unknown
```

Without `?.`, trying to read `city` from `null` would cause an error. `??` uses the fallback because the result is `undefined`.

Unlike `||`, `??` does not replace valid values such as `0`, `false`, or an empty string.

**Scenario:** A product quantity can be `0`, but a developer uses `quantity || 1` as a fallback. Why might the result be wrong?

**Simple answer:** Because `0` is falsy, `||` replaces it with `1`. If the fallback should apply only when the value is missing, use `quantity ?? 1`.

## Lesson 13: Spread vs. Rest
**Difficulty: Moderate**

The `...` syntax is used in more than one way. Spread expands values; rest gathers remaining values into one array or object.

```js
const first = [1, 2];
const combined = [...first, 3];

function addAll(...numbers) {
  return numbers.reduce((total, number) => total + number, 0);
}

console.log(combined);       // [1, 2, 3]
console.log(addAll(1, 2, 3)); // 6
```

In `combined`, spread puts the array's items into a new array. In the function, rest collects all passed arguments into the `numbers` array.

**Scenario:** A helper function should accept any number of prices and return their total. Which syntax can collect the prices?

**Simple answer:** Use a rest parameter like `function total(...prices)`. It gathers all arguments into an array that the function can loop over or reduce.

---

# Part 3: Functions and Behavior

## Lesson 14: Callbacks and Higher-Order Functions
**Difficulty: Moderate**

A **higher-order function** is a function that accepts another function as an argument, or returns a function. A **callback** is the function that you pass in to be called.

Think of them as a team: the higher-order function is the **manager**, and the callback is the **worker**.

```js
// Higher-Order Function: accepts an 'operation' function
function calculate(a, b, operation) {
  return operation(a, b);
}

// Callbacks: the actual work to perform
function add(x, y) {
  return x + y;
}

function multiply(x, y) {
  return x * y;
}

// calculate is the higher-order function. add and multiply are the callbacks!
console.log(calculate(10, 5, add));      // 15
console.log(calculate(10, 5, multiply)); // 50
```

`calculate` is written once. You can change what it does simply by passing a different callback function (`add`, `multiply`, or an inline arrow function).

You already see callbacks every day in JavaScript:
- **Array methods:** In `numbers.filter(n => n > 2)`, `filter()` is the higher-order function, and `n => n > 2` is the callback.
- **Timers:** In `setTimeout(sayHello, 1000)`, `setTimeout` is the higher-order function, and `sayHello` is the callback.

**Scenario:** A button should run some code when the user clicks it. Why might a developer pass a function to an event listener instead of running the code immediately?

**Simple answer:** The function is passed as a callback so the browser can run it when the click happens. If we call the function immediately, it runs before the user clicks.

## Lesson 15: Closures
**Difficulty: Difficult**

A closure happens when a function keeps access to variables from the scope where it was created, even after that outer function has finished running.

```js
function createCounter() {
  let count = 0;

  return function () {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

Step by step:
1. `createCounter()` creates the variable `count`.
2. It returns an inner function.
3. The inner function still has access to `count` after `createCounter()` finishes.
4. Each call updates the same saved `count` value.

**Why use it?** Closures can keep private state and help create functions that remember information.

**Scenario:** You need a counter that keeps its own count and does not let other code change the count directly. How can a closure help?

**Simple answer:** A function can create a local `count` variable and return another function that changes it. The returned function remembers `count`, but outside code cannot access that local variable directly.

**Interview question:** What is a closure?

**Simple interview answer:** A closure is a function that keeps access to variables from the scope where it was created. It can be used to remember data or keep some state private.

## Lesson 16: The `this` Keyword
**Difficulty: Difficult**

In many normal function calls, `this` depends on how the function is called. In a method call like `user.greet()`, `this` usually refers to the object before the dot. Arrow functions do not create their own `this`; they use it from the surrounding scope.

```js
const user = {
  name: "Rina",
  greet() {
    return `Hello, ${this.name}`;
  },
};

console.log(user.greet()); // Hello, Rina
```

Here, `user.greet()` calls the function as a method, so `this` refers to `user`.

Do not assume `this` always means the object where a function was written. Its behavior depends on the call form and, for some cases, strict mode and the execution environment.

**Scenario:** A method works when called as `user.greet()`, but breaks after the function is stored in a separate variable and called alone. What should you check?

**Simple answer:** Check how the function is called. The separate call may no longer provide `user` as `this`. You may need to bind the method, call it through the object, or use a design that does not depend on `this`.

**Interview question:** How does `this` behave in an arrow function compared with a normal function?

**Simple interview answer:** A normal function's `this` depends on how it is called. An arrow function does not create its own `this`; it uses the one from the surrounding scope.

## Lesson 17: Errors and Debugging
**Difficulty: Moderate**

An error means something went wrong. The error message and stack trace can help you find where it happened. Do not fix an error by changing code at random; check the value, line, and reason first.

```js
function getUserName(user) {
  if (!user) {
    throw new Error("User is required");
  }

  return user.name;
}

console.log(getUserName({ name: "Rina" })); // Rina
```

The function checks whether `user` exists before reading its name. The `throw` statement raises an error if no user is passed.

**Scenario:** Your page crashes because code tries to read `name` from `undefined`. What should you investigate first?

**Simple answer:** Find where that value comes from and why it is missing. Then decide whether to provide a value, check for a missing user, or handle the error. Do not just hide the error without fixing its cause.

---

# Part 4: Async JavaScript and Real Applications

## Lesson 18: Promises and `async`/`await`
**Difficulty: Difficult**

Some work takes time, such as getting data from a server. A Promise represents a result that may be available later. `async` and `await` make Promise-based code easier to read.

```js
function getUser() {
  return Promise.resolve({ name: "Rina" });
}

async function showUser() {
  try {
    const user = await getUser();
    console.log(user.name);
  } catch (error) {
    console.error("Could not load user", error);
  }
}

showUser();
```

Step by step:
1. `getUser()` returns a Promise.
2. `await` waits for that Promise to settle before continuing inside `showUser`.
3. If it succeeds, the result is stored in `user`.
4. If it rejects, control moves to `catch`.

`await` pauses the current async function, not the whole JavaScript program.

**Scenario:** A page tries to show a user's profile before the API request finishes. How should the code be organized?

**Simple answer:** Wait for the request with `await` (or handle its Promise with `.then()`), then use the returned data. Also show a loading state and handle errors so the user is not left with a broken page.

**Interview question:** What does `await` do inside an async function?

**Simple interview answer:** It waits for a Promise to settle and gives the fulfilled value back to the function. If the Promise rejects, the error can be handled with `try/catch`.

## Lesson 19: The Event Loop: A Basic View
**Difficulty: Difficult**

JavaScript can do only one thing at a time. The **Event Loop** is the manager that decides what runs next.

It follows a simple 3-step priority:
1. **Normal code runs first** (immediate).
2. **Promises run second** (VIP line).
3. **Timers run last** (waiting line).

```js
console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
// Output:
// Start
// End
// Promise
// Timer
```

Step by step:
1. `Start` and `End` are normal code. They run first immediately.
2. The `Promise` callback has VIP priority, so it runs right after normal code finishes.
3. The `Timer` callback was placed in the waiting line, so it runs last.

A `0` millisecond delay in `setTimeout` does not mean "run right now"—it just means "join the waiting line."

**Scenario:** A developer expects a `setTimeout(..., 0)` callback to run before the next line, but it does not. Why?

**Simple answer:** The timer callback is placed in the waiting line. It only runs after the current normal code finishes. A zero delay does not skip the line.

**Interview question:** In this example, why does the Promise callback run before the timer callback?

**Simple interview answer:** Promise callbacks have VIP priority (microtasks). After normal code finishes, JavaScript processes Promises before looking at timer callbacks.

## Lesson 20: DOM Events
**Difficulty: Moderate**

The **DOM** is simply your webpage turned into JavaScript. It gives JavaScript a simple 3-step superpower to make pages interactive:
1. **Find it:** Point to an element on the screen (`document.querySelector`).
2. **Listen for it:** Wait for the user to click or type (`addEventListener`).
3. **Change it:** Update what is on screen (`textContent`).

```html
<button id="helloButton">Say hello</button>
<p id="message"></p>

<script>
  // 1. Find the elements
  const button = document.querySelector("#helloButton");
  const message = document.querySelector("#message");

  // 2. Listen for clicks
  button.addEventListener("click", () => {
    // 3. Change the text on screen!
    message.textContent = "Hello from JavaScript!";
  });
</script>
```

When the user clicks the button, the callback function runs and changes the paragraph text.

Always make sure the HTML button exists before JavaScript looks for it (put your `<script>` at the bottom of the page).

**Scenario:** A button is visible, but clicking it does nothing. What would you check?

**Simple answer:** Check that JavaScript selected the correct button, that the event listener was attached, and that there are no errors in the browser console. Also check that the script runs after the button exists.

## Lesson 21: JSON, `fetch()`, and API Responses
**Difficulty: Difficult**

A web app often gets data from an API. `fetch()` sends a request and returns a Promise for a response. For JSON data, `response.json()` reads and parses the response body asynchronously.

```js
async function loadUser() {
  try {
    const response = await fetch("https://example.com/api/user");

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const user = await response.json();
    console.log(user);
  } catch (error) {
    console.error("Could not load user", error);
  }
}

loadUser();
```

Step by step:
1. `fetch()` sends the request.
2. `await` waits for the response.
3. `response.ok` checks whether the HTTP status is in the successful range.
4. `response.json()` reads the response body and parses JSON.
5. `try/catch` handles network errors and errors thrown by the code.

A `fetch()` request usually does not reject just because the server returns an HTTP error such as 404, so checking `response.ok` matters. In real code, also handle invalid data and the actual API's authentication and response shape.

**Scenario:** An API returns status 404, but your code reaches the JSON parsing line as if the request succeeded. Why might this happen, and what should you do?

**Simple answer:** `fetch()` usually still resolves when the server returns 404. Check `response.ok` and handle unsuccessful status codes before using the response as successful data.

**Interview question:** Does `fetch()` reject automatically for every HTTP error status?

**Simple interview answer:** No. It usually resolves with a Response for statuses such as 404. Check `response.ok` or `response.status` yourself.

## Lesson 22: JavaScript Modules
**Difficulty: Moderate**

Modules let you split code into separate files and share functions or values using `export` and `import`.

In `math.js`:

```js
export function add(a, b) {
  return a + b;
}
```

In another module:

```js
import { add } from "./math.js";

console.log(add(2, 3)); // 5
```

This keeps code organized and lets you reuse functions without copying them into every file. The exact module setup depends on the project and its runtime or build tools.

**Scenario:** Several parts of an application need to use the same price-calculation function. How can modules help?

**Simple answer:** Put the function in one module, export it, and import it wherever needed. This avoids copying the same code into several places.

---

# Content boundaries

Keep this core track focused on JavaScript concepts that help learners read code, understand behavior, debug problems, build applications, and explain important ideas in interviews. Do not add a separate lesson for every rare method or language feature. Keep framework-specific topics such as React and Next.js, server-side topics such as Node.js, databases, and deployment in their own learning tracks.

Do not add an interview question to every lesson. Every lesson has a scenario question and a simple answer for practice; only selected important topics have interview questions. Do not label every scenario as a frequently asked interview question unless that is supported.

## Final teaching rule

Teach the core concept clearly. Explain only what matters. Easy topics should stay short; moderate topics should be clear; difficult topics should be taught step by step. Every selected topic should have a realistic scenario question and a simple model answer. Remove anything that does not help learners understand or use the concept.
