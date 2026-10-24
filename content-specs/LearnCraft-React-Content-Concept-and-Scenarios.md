# LearnCraft — React Curriculum

## Purpose of this track

This curriculum teaches the React concepts learners need to build user interfaces, understand code written by AI, find common bugs, and explain important ideas in interviews. It does not try to teach every React feature.

**Teaching rule:** Easy topics stay short. Moderate topics get a clear explanation and a practical example. Difficult topics are broken into steps, starting with the simplest useful example.

Each lesson includes a scenario question and a simple model answer. Interview questions appear only where they are especially useful.

## Version and scope

These lessons use modern React with function components and Hooks. The examples use JavaScript and JSX, not TypeScript. React's current official documentation lists React 19.3 as the latest version at the time this content was prepared. Most examples use stable, everyday React features and do not depend on new version-specific behavior.

This track focuses on React itself. Routing is included as a practical ecosystem topic using React Router; server-rendering frameworks such as Next.js remain in their own learning track.

---

# Part 1: React Foundations

## Lesson 1: What Is React?

**Difficulty:** Easy

### Core idea

React is a JavaScript library for building user interfaces. It lets you split a screen into small, reusable pieces called components.

### Example

```jsx
function Welcome() {
  return <h1>Welcome to LearnCraft!</h1>;
}

export default function App() {
  return <Welcome />;
}
```

### How it works

1. `Welcome` is a component because it is a function that returns JSX.
2. The JSX describes the heading that should appear on the screen.
3. `App` uses `<Welcome />` to show that component.
4. React turns the component output into the user interface.

You do not need to update page elements by hand for every change. You describe what the screen should look like, and React updates it when needed.

### Scenario question

**Scenario:** You need to show the same welcome message in several places. Why might you make it a component?

**Simple answer:** I can write the welcome message once and reuse the component. If the message changes, I can update it in one place.

---

## Lesson 2: Start a React Project

**Difficulty:** Easy

### Core idea

A React project needs a development setup that can run JavaScript and understand JSX. Vite is one common tool for starting a React project.

### Example

In a terminal, run:

```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
```

### How it works

1. The first command creates a starter React project.
2. `cd` moves into the project folder.
3. `npm install` installs the packages the project needs.
4. `npm run dev` starts the local development server. The terminal shows the local address to open in your browser.

If your LearnCraft playground already provides a React environment, you do not need to repeat these setup steps for every lesson.

### Scenario question

**Scenario:** You downloaded a React project, but it does not start because packages are missing. What should you try first?

**Simple answer:** Open the terminal in the project folder and run `npm install`, then run the project's development command.

---

## Lesson 3: JSX and JavaScript Inside JSX

**Difficulty:** Easy

### Core idea

JSX lets you write markup-like code inside JavaScript. Use curly braces `{}` to put a JavaScript value or expression into JSX.

### Example

```jsx
const learnerName = "Rina";

export default function Greeting() {
  return <h1>Hello, {learnerName}!</h1>;
}
```

### How it works

1. `learnerName` stores the text `"Rina"`.
2. The component returns an `<h1>` element.
3. `{learnerName}` tells JSX to read the JavaScript variable.
4. The screen shows `Hello, Rina!`.

JSX looks similar to HTML, but it follows JavaScript rules. For example, use `className` instead of `class`, and close tags such as `<img />`.

### Scenario question

**Scenario:** You write `<h1>Hello, learnerName</h1>` and the screen shows the word `learnerName` instead of the variable's value. What is missing?

**Simple answer:** Put the variable inside curly braces: `<h1>Hello, {learnerName}</h1>`.

---

## Lesson 4: Components and Reuse

**Difficulty:** Easy

### Core idea

A component is one reusable part of the user interface. Component names must start with a capital letter.

### Example

```jsx
function CourseCard() {
  return (
    <article>
      <h2>React Basics</h2>
      <p>Learn how components work.</p>
    </article>
  );
}

export default function App() {
  return (
    <main>
      <CourseCard />
      <CourseCard />
    </main>
  );
}
```

### How it works

1. `CourseCard` describes one course card.
2. `<CourseCard />` displays the card.
3. `App` uses the same component twice.
4. Both cards have the same content because they receive the same information.

When cards need different information, use props (the next lesson) instead of copying the component.

### Scenario question

**Scenario:** A website has 20 course cards with the same design. Should you write the same JSX 20 times?

**Simple answer:** No. Create one reusable card component and render it for each course.

---

## Lesson 5: Props — Passing Information to Components

**Difficulty:** Easy

### Core idea

Props are information that a parent component passes to a child component. A child should treat its props as read-only.

### Example

```jsx
function CourseCard({ title, level }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>Level: {level}</p>
    </article>
  );
}

export default function App() {
  return <CourseCard title="React Basics" level="Beginner" />;
}
```

### How it works

1. `App` passes two props: `title` and `level`.
2. `CourseCard` receives them in its function parameters.
3. The component displays the values in JSX.
4. To show a different course, pass different props. The card component itself can stay the same.

### Scenario question

**Scenario:** The same card design needs to show different course titles. What should you use?

**Simple answer:** Pass each title as a prop. This keeps the design reusable and lets each card show its own content.

### Important interview question

**What are props in React?**

**Simple answer:** Props are values passed from a parent component to a child component. They let a component display different information while keeping its design reusable.

---

## Lesson 6: Conditional Rendering

**Difficulty:** Easy

### Core idea

Conditional rendering means showing different UI depending on a condition. You can use normal JavaScript conditions, a ternary expression, or `&&` inside JSX.

### Example

```jsx
function LoginStatus({ isLoggedIn }) {
  if (isLoggedIn) {
    return <p>Welcome back!</p>;
  }

  return <p>Please sign in.</p>;
}
```

### How it works

1. The component receives `isLoggedIn` as a prop.
2. If it is `true`, the component returns `Welcome back!`.
3. Otherwise, it returns `Please sign in.`.
4. React displays the result returned by the component.

For a simple choice inside JSX, a ternary can also work: `{isLoggedIn ? <p>Welcome</p> : <p>Sign in</p>}`. Use whichever version is easiest to read.

### Scenario question

**Scenario:** You want to show an “Edit” button only to users who are allowed to edit a course. What can you do?

**Simple answer:** Use a condition to show the button only when the user has permission. Remember that hiding a button is not a security check; the server must also protect the actual update action.

---

## Lesson 7: Rendering Lists and Using Keys

**Difficulty:** Moderate

### Core idea

Use JavaScript's `map()` to turn an array of data into a list of React elements. Give each item a stable, unique `key` so React can track items when the list changes.

### Example

```jsx
const courses = [
  { id: 1, title: "React" },
  { id: 2, title: "JavaScript" },
];

export default function CourseList() {
  return (
    <ul>
      {courses.map((course) => (
        <li key={course.id}>{course.title}</li>
      ))}
    </ul>
  );
}
```

### How it works

1. `courses` is an array containing two objects.
2. `map()` visits each object and returns an `<li>` for it.
3. `course.title` becomes the visible text.
4. `key={course.id}` gives each item a stable identity, which helps React match items after adding, removing, or reordering them.

Use an ID from your data when possible. Avoid using the array index as a key when items can move or be removed, because React may connect the wrong item with its previous state.

### Scenario question

**Scenario:** A warning says a list item is missing a key. What should you do?

**Simple answer:** Add a stable, unique key such as `key={course.id}` to the element returned by `map()`.

---

# Part 2: Events and State

## Lesson 8: Handling Events

**Difficulty:** Easy

### Core idea

Events let a component respond to what a user does, such as clicking a button or typing in a field.

### Example

```jsx
export default function SaveButton() {
  function handleSave() {
    alert("Course saved!");
  }

  return <button onClick={handleSave}>Save course</button>;
}
```

### How it works

1. `handleSave` contains the code to run after the click.
2. `onClick={handleSave}` gives React the function to call later.
3. When the user clicks, React calls the function.
4. The alert appears.

Do not write `onClick={handleSave()}` here. That calls the function while rendering rather than waiting for the click.

### Scenario question

**Scenario:** A button runs its handler immediately when the page opens. The code uses `onClick={handleSave()}`. What should change?

**Simple answer:** Pass the function without calling it: `onClick={handleSave}`.

---

## Lesson 9: State with `useState`

**Difficulty:** Moderate

### Core idea

State is information a component remembers between renders. When state changes, React renders the component again so the screen can show the new value.

### Example

```jsx
import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? "Liked" : "Like"}
    </button>
  );
}
```

### How it works

1. `useState(false)` starts `liked` as `false`.
2. `liked` is the current value; `setLiked` is the function that asks React to update it.
3. When clicked, `!liked` changes `false` to `true`, or `true` to `false`.
4. React renders the button again with the updated text.

Do not change the state variable directly. Use its setter function.

### Scenario question

**Scenario:** A developer changes a normal variable after clicking a button, but the text on the screen does not update. What concept is missing?

**Simple answer:** The changing value should usually be stored in state. Updating state tells React to render the UI with the new value.

### Important interview question

**What is state in React?**

**Simple answer:** State is data a component remembers. When state changes through its setter, React can render the component again to show the updated UI.

---

## Lesson 10: Why State Updates Can Feel Delayed

**Difficulty:** Difficult

### Core idea

Each render sees a snapshot of state. Calling a state setter requests a future render; it does not change the state variable inside the current running code.

### Example

```jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log(count);
  }

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

### How it works, step by step

1. On the first render, `count` is `0`.
2. Clicking calls `setCount(count + 1)`, which asks React to render with `1`.
3. The `count` variable in this already-running handler still refers to the old render, so the log prints `0`.
4. React renders again, and the button then shows `Count: 1`.

If the next value depends on the previous value, use the updater form:

```jsx
setCount((currentCount) => currentCount + 1);
```

This tells React to calculate the next value from the latest queued state. It is especially useful when making several updates in one event.

### Scenario question

**Scenario:** A developer calls `setCount(count + 1)` three times in one click handler, expecting the count to increase by three. Why might it increase only by one, and how can they fix it?

**Simple answer:** Each call uses the same `count` from the current render. Use `setCount(current => current + 1)` for each update so React calculates each next value from the latest queued value.

### Important interview question

**Why doesn't a state variable change immediately after calling its setter?**

**Simple answer:** A state variable belongs to the current render. The setter asks React to render again with new state; it does not rewrite the value in the current render.

---

## Lesson 11: Forms and Controlled Inputs

**Difficulty:** Moderate

### Core idea

A controlled input gets its displayed value from React state. When the user types, an event handler updates the state.

### Example

```jsx
import { useState } from "react";

export default function NameForm() {
  const [name, setName] = useState("");

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      alert(`Hello, ${name}`);
    }}>
      <label>
        Name
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```

### How it works

1. `name` starts as an empty string.
2. `value={name}` makes React state the source of the input's value.
3. Each time the user types, `onChange` reads the new text and updates state.
4. On submit, `preventDefault()` stops the browser from reloading the page.
5. The handler can then use the latest name.

Real applications should also validate the submitted value. Client-side checks improve the user experience, but important validation must also happen on the server.

### Scenario question

**Scenario:** The input looks correct, but the value is always empty when the form is submitted. What should you inspect?

**Simple answer:** Check that `onChange` updates the state used by `value`, and that the submit handler reads that state.

---

## Lesson 12: Sharing State Between Components

**Difficulty:** Moderate

### Core idea

If two components need to use and update the same value, store that state in their closest common parent and pass it down through props. This is called lifting state up.

### Example

```jsx
import { useState } from "react";

function QuantityControls({ quantity, onChange }) {
  return (
    <button onClick={() => onChange(quantity + 1)}>
      Quantity: {quantity}
    </button>
  );
}

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <QuantityControls quantity={quantity} onChange={setQuantity} />
      <p>Items selected: {quantity}</p>
    </>
  );
}
```

### How it works

1. The parent `ProductPage` owns the quantity state.
2. It passes the current quantity and the setter function to `QuantityControls`.
3. The button calls `onChange` to request a new quantity.
4. The parent updates its state, so both the button and the summary show the same value.

### Scenario question

**Scenario:** A cart button and a cart summary must show the same item count. Each component currently stores a different count. What should you change?

**Simple answer:** Move the count into their closest common parent and pass it to both components through props.

---

## Lesson 13: Updating Objects and Arrays in State

**Difficulty:** Moderate

### Core idea

Treat objects and arrays in state as read-only. Make a new object or array when you update them, rather than changing the existing state value directly.

### Example: Updating an object

```jsx
const [user, setUser] = useState({ name: "Rina", city: "Dhaka" });

function changeCity() {
  setUser({ ...user, city: "Sylhet" });
}
```

### How it works

1. `{ ...user }` copies the existing fields into a new object.
2. `city: "Sylhet"` sets the new city value in that object.
3. `setUser` gives the new object to React.
4. Other fields, such as `name`, remain unchanged.

### Example: Adding to an array

```jsx
setCourses((currentCourses) => [
  ...currentCourses,
  { id: 3, title: "React Hooks" },
]);
```

The spread syntax copies the existing array items and adds the new course at the end.

### Scenario question

**Scenario:** A developer runs `user.city = "Sylhet"` and then sets the same `user` object as state, but the UI does not update as expected. What is a better approach?

**Simple answer:** Create a new object with `{ ...user, city: "Sylhet" }` and pass it to the setter. React state should be updated immutably.

---

# Part 3: Hooks and Sharing Data

## Lesson 14: The Rules of Hooks

**Difficulty:** Moderate

### Core idea

Hooks such as `useState`, `useEffect`, and `useContext` must be called at the top level of a React function component or a custom Hook. Do not call them inside conditions, loops, or nested functions.

### Example

```jsx
function Profile({ isLoggedIn }) {
  const [showDetails, setShowDetails] = useState(false);

  if (!isLoggedIn) {
    return <p>Please log in.</p>;
  }

  return (
    <button onClick={() => setShowDetails(!showDetails)}>
      {showDetails ? "Hide details" : "Show details"}
    </button>
  );
}
```

### How it works

1. `useState` is called at the top of the component, before the condition.
2. React can therefore match the Hook to the same place on every render.
3. The `if` statement can choose what to display after the Hook call.

### Scenario question

**Scenario:** A developer calls `useState` only when `isLoggedIn` is true. Why is that a problem?

**Simple answer:** The Hook call can happen in a different order between renders. Move the Hook to the top level of the component, then use conditions to decide what to display.

---

## Lesson 15: `useEffect` — Working With Things Outside React

**Difficulty:** Difficult

### Core idea

Use `useEffect` when a component needs to synchronize with something outside React, such as a browser event listener, a timer, or a third-party widget. Do not use it for every calculation or click action.

### Example

```jsx
import { useEffect, useState } from "react";

export default function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return <p>Window width: {width}px</p>;
}
```

> This example is for a browser-only React app. In a server-rendered app, reading `window` during the initial render needs extra care.

### How it works, step by step

1. The component stores the current width in state.
2. After React displays the component, the Effect adds a browser `resize` listener.
3. When the browser window changes size, `updateWidth` reads the new width and updates state.
4. React renders the new width on the screen.
5. The function returned from the Effect removes the listener when the component is removed. This cleanup prevents the component from leaving an old listener behind.

The empty dependency array means this Effect does not need to restart for each ordinary render. If an Effect uses changing values from the component, its dependencies must be handled correctly.

### When not to use an Effect

If you can calculate a value from existing props or state during rendering, do that directly. For example, do not store `fullName` in separate state if it can be calculated from `firstName` and `lastName`.

### Scenario question

**Scenario:** A component adds a `scroll` listener but never removes it. After the component is opened and closed repeatedly, old handlers keep running. How should it be fixed?

**Simple answer:** Return a cleanup function from `useEffect` that removes the listener. The cleanup should undo whatever the Effect set up.

### Important interview question

**What is `useEffect` used for?**

**Simple answer:** It synchronizes a component with something outside React, such as a subscription or browser API. If the setup needs undoing, return a cleanup function.

---

## Lesson 16: Fetching Data in a React Component

**Difficulty:** Difficult

### Core idea

When a component loads data, the UI should handle at least three situations: loading, success, and failure. This example uses `useEffect` to fetch data in a client-side React app. Larger apps may use a router or data-fetching library instead.

### Example

```jsx
import { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Could not load users.");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadUsers();
    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return users.map((user) => <p key={user.id}>{user.name}</p>);
}
```

### How it works, step by step

1. The component starts with an empty list and `loading` set to `true`.
2. The Effect starts the request after the component commits.
3. `response.ok` checks whether the server returned a successful HTTP status. `fetch` does not reject for every HTTP error automatically.
4. `response.json()` reads the response body as data.
5. `setUsers(data)` stores the list; the component later displays one paragraph per user.
6. If a request fails, the `catch` block stores an error message.
7. The cleanup aborts the request if the component is removed before it finishes.

In a real project, also consider the router, caching, retries, and data-fetching tools already used by the app. Do not copy this pattern into every component without thinking about the project's data flow.

### Scenario question

**Scenario:** A page stays blank while users are being loaded, and a failed request gives no helpful message. What should the developer add?

**Simple answer:** Track loading, success data, and error state. Show a loading message while waiting, show the data after success, and display a useful message when the request fails.

---

## Lesson 17: `useRef` — Remembering a Value Without Re-rendering

**Difficulty:** Moderate

### Core idea

A ref stores a value between renders, but changing it does not trigger a render. Refs are often used to access a DOM element or keep a value that is not part of the visible UI.

### Example

```jsx
import { useRef } from "react";

export default function SearchBox() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} placeholder="Search courses" />
      <button onClick={focusInput}>Focus search</button>
    </>
  );
}
```

### How it works

1. `useRef(null)` creates a ref object.
2. React places the actual input element in `inputRef.current` after the input is mounted.
3. When the button is clicked, `focusInput` calls `.focus()` on that input.
4. The browser moves the typing cursor into the input.

Use state for values that should change what's displayed. Use a ref when changing a value should not itself trigger a render, or when you need access to a DOM element.

### Scenario question

**Scenario:** You want to focus a search field after a button click. Should you store the input element in state?

**Simple answer:** Usually no. Use `useRef` to access the input element and call `.focus()` on it.

---

## Lesson 18: Context — Sharing Data Without Passing Props Through Every Level

**Difficulty:** Moderate

### Core idea

Context lets a component make a value available to components deeper in the tree without passing that value through every middle component. It is useful for shared values such as a theme or current user.

### Example

```jsx
import { createContext, useContext } from "react";

const ThemeContext = createContext("light");

function ThemeLabel() {
  const theme = useContext(ThemeContext);
  return <p>Current theme: {theme}</p>;
}

export default function App() {
  return (
    <ThemeContext value="dark">
      <ThemeLabel />
    </ThemeContext>
  );
}
```

### How it works

1. `createContext("light")` creates a context with a default value.
2. `App` provides the value `"dark"` to the components inside it.
3. `ThemeLabel` calls `useContext(ThemeContext)` to read the closest provided value.
4. The page shows `Current theme: dark`.

This uses the modern provider syntax supported by React 19. In older React versions, use `<ThemeContext.Provider value="dark">` instead.

Do not put every value into context. Start with props when the data only needs to travel through a small number of components.

### Scenario question

**Scenario:** Several distant components need the same theme value, and passing it through many middle components becomes messy. What can help?

**Simple answer:** Context can make the theme available to components below a provider, so the middle components do not have to pass the prop along.

### Important interview question

**When should you use Context?**

**Simple answer:** Use it when many components in one part of the app need the same value, such as a theme or current user. For simple parent-to-child data, ordinary props are often clearer.

---

## Lesson 19: `useReducer` for More Organized State Changes

**Difficulty:** Difficult

### Core idea

`useReducer` is another way to manage state. Instead of updating state in several different places, you describe an action and write one reducer function that decides the next state.

### Example

```jsx
import { useReducer } from "react";

function countReducer(count, action) {
  if (action.type === "increment") return count + 1;
  if (action.type === "reset") return 0;
  return count;
}

export default function Counter() {
  const [count, dispatch] = useReducer(countReducer, 0);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>
        Add one
      </button>
      <button onClick={() => dispatch({ type: "reset" })}>
        Reset
      </button>
    </>
  );
}
```

### How it works, step by step

1. The starting state is `0`.
2. Clicking “Add one” sends the action `{ type: "increment" }` to `dispatch`.
3. React calls `countReducer` with the current count and that action.
4. The reducer returns the next count, which React stores as state.
5. Clicking “Reset” sends a different action, so the reducer returns `0`.

For a single simple value, `useState` is usually easier. `useReducer` is useful when the state has several related changes or when you want the update rules in one place.

### Scenario question

**Scenario:** A shopping cart has actions to add an item, remove an item, and clear the cart. The update logic is becoming hard to follow. How could `useReducer` help?

**Simple answer:** Give each action a clear type and place the update rules in one reducer function. This can make related state changes easier to understand and test.

---

## Lesson 20: Custom Hooks — Reusing React Logic

**Difficulty:** Moderate

### Core idea

A custom Hook is a JavaScript function whose name starts with `use`. It combines React Hooks to reuse logic between components. It does not automatically share one state value between every component; each call has its own Hook state unless the Hook connects to a shared source.

### Example

```jsx
import { useState } from "react";

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  function toggle() {
    setValue((current) => !current);
  }

  return [value, toggle];
}

export default function Details() {
  const [visible, toggleVisible] = useToggle();

  return (
    <>
      <button onClick={toggleVisible}>
        {visible ? "Hide" : "Show"} details
      </button>
      {visible && <p>These are the course details.</p>}
    </>
  );
}
```

### How it works

1. `useToggle` keeps a boolean state and defines a function to flip it.
2. The Hook returns the current value and the toggle function.
3. `Details` uses those returned values without repeating the toggle logic.
4. Other components can call `useToggle` to reuse the same logic, each with their own state.

### Scenario question

**Scenario:** Several components need the same show/hide behavior, and the logic is being copied repeatedly. What can you do?

**Simple answer:** Move that state logic into a custom Hook and call it from each component. Each component will have its own toggle state unless you deliberately use a shared state source.

---

# Part 4: Common React Mistakes, Performance, and Quality

## Lesson 21: Keeping Components Predictable

**Difficulty:** Moderate

### Core idea

A component should return UI based on its props and state. Avoid changing outside variables or doing unrelated work while React is rendering a component.

### Example

```jsx
function CourseTitle({ title }) {
  return <h2>{title}</h2>;
}
```

This component is predictable: for the same `title`, it returns the same heading.

Avoid patterns like changing a global counter while rendering. React may render a component more than once in development to help find mistakes, so rendering should not change values outside the component.

### How it works

1. React calls `CourseTitle` with a `title` prop.
2. The component uses that prop to create a heading.
3. It does not modify the prop or an outside variable.
4. Calling it with the same title gives the same result.

### Scenario question

**Scenario:** A component increments a global counter every time it renders. The displayed numbers jump unexpectedly in development. What is the problem?

**Simple answer:** Rendering should not change outside values. Keep rendering focused on returning UI, and use state or props for values that affect the screen.

---

## Lesson 22: React Performance — Optimize Only When Needed

**Difficulty:** Moderate

### Core idea

First write clear React code. If a screen is slow, measure the problem before adding optimizations. Unnecessary re-renders or expensive calculations may cause slowness, but not every re-render is a problem.

### Example: Avoid recalculating simple derived data in state

```jsx
function CourseList({ courses, searchText }) {
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return filteredCourses.map((course) => (
    <p key={course.id}>{course.title}</p>
  ));
}
```

### How it works

1. The component receives course data and the search text.
2. It calculates the filtered list during rendering.
3. React displays only the matching courses.
4. There is no extra state to keep in sync with the original list and search text.

If profiling shows that a calculation is expensive, `useMemo` may help reuse its result between renders when its dependencies have not changed. `memo` and `useCallback` can also help in specific cases. React Compiler can automatically optimize many components when a project has it correctly enabled, so do not add manual memoization everywhere without a reason.

### Scenario question

**Scenario:** A developer adds `useMemo`, `memo`, and `useCallback` to every component before checking whether the app is slow. Is this a good first step?

**Simple answer:** No. Start with clear code, measure the slow part using React DevTools Profiler or browser tools, then optimize the part that actually needs it.

### Important interview question

**What does `useMemo` do?**

**Simple answer:** It can reuse the result of a calculation between renders while its dependencies stay the same. It is a performance tool, not something every calculation needs.

---

## Lesson 23: Routing in a React App

**Difficulty:** Moderate

### Core idea

Routing connects a URL to the page or component that should be displayed. React itself does not include a full routing system, so many client-side React apps use a routing library such as React Router.

### Example

This example shows the shape of a route setup in React Router. It assumes the current project has React Router installed and configured.

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router";

function Home() {
  return <h1>Home</h1>;
}

function Courses() {
  return <h1>Courses</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </BrowserRouter>
  );
}
```

In a new project, check the React Router version and its installation guide because package entry points and setup can differ between versions and modes.

### How it works

1. `BrowserRouter` provides browser URL navigation.
2. `Link` changes the URL without a full page reload in the usual client-side route flow.
3. `Routes` checks the current URL against the available routes.
4. The matching `Route` displays its component.

### Scenario question

**Scenario:** Your React app needs separate Home and Courses pages, each with its own URL. What do you need?

**Simple answer:** Use a routing library and define a route for each URL. React Router is one common choice for a client-side React app.

---

## Lesson 24: Testing and Debugging React Components

**Difficulty:** Moderate

### Core idea

Debugging means finding why something is not working. Testing checks whether a component behaves as expected. Focus tests on what users can see and do instead of how the component is written internally.

### Example

A simple button should update its text when clicked:

```jsx
import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked((current) => !current)}>
      {liked ? "Liked" : "Like"}
    </button>
  );
}
```

A useful test would check that the button starts as “Like,” then becomes “Liked” after a click. Use the testing tools already adopted by the project, such as React Testing Library with a supported test runner.

### How to debug a broken component

1. Reproduce the issue.
2. Read the browser console and terminal errors.
3. Check the props and state used by the component.
4. Check event handlers and conditions.
5. Make one focused change and test it again.

### Scenario question

**Scenario:** Clicking a button does not change the screen. What should you check first?

**Simple answer:** Check the browser console, confirm that the click handler runs, and verify that it updates the right state using the state setter. Then test the behavior again.

---

# Suggested final practice

Build a small course list that includes:

- A reusable `CourseCard` component.
- Props for each course's title and level.
- A list rendered with `map()` and stable keys.
- A search input controlled by state.
- A loading message and error message if courses come from an API.
- A button that saves a course to favorites.

Use this project to connect the main ideas rather than building a large app before the concepts make sense.

## Topics deliberately kept brief or left for later

This core React track does not try to cover every library or advanced API. Learn them only when the project needs them:

- State management libraries such as Redux or Zustand.
- Advanced concurrent rendering APIs.
- Deep React internals and reconciliation algorithms.
- Advanced animation libraries.
- Server Components and framework-specific rendering. Study these in the relevant framework track, such as Next.js.
- Advanced test tooling details.

Do not interpret “left for later” as “never useful.” These topics are simply not required for the first clear understanding of core React.

## Official learning references

Use official documentation to verify details when updating the content for a newer React version:

- React Learn: https://react.dev/learn
- Quick Start: https://react.dev/learn
- Managing State: https://react.dev/learn/managing-state
- Synchronizing with Effects: https://react.dev/learn/synchronizing-with-effects
- Passing Data Deeply with Context: https://react.dev/learn/passing-data-deeply-with-context
- React Hooks reference: https://react.dev/reference/react/hooks
- React versions: https://react.dev/versions
- React Router documentation: https://reactrouter.com/
