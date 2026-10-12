import { InterviewQuestion } from "@/types/interview";

export const REACT_QUESTIONS: InterviewQuestion[] = [
  {
    id: "react-q01",
    trackKey: "react",
    category: "Hooks & Optimization",
    subtopic: "Memoization",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "What is the difference between `useMemo` and `useCallback`? When should you NOT use them?",
    answer: `### Simple answer:
- **\`useMemo\`** caches the **result of a calculation** (a value, object, or array).
- **\`useCallback\`** caches a **function definition** so its identity doesn't change between renders.

### How it works:
Both take a function and a dependency array. They only re-evaluate when one of the dependencies changes by referential equality (\`===\`).

\`\`\`tsx
// useMemo: caches the filtered array result
const visibleTodos = useMemo(() => {
  return todos.filter(t => t.completed === filterCompleted);
}, [todos, filterCompleted]);

// useCallback: caches the function reference
const handleDelete = useCallback((id: string) => {
  setTodos(prev => prev.filter(t => t.id !== id));
}, []);
\`\`\`

### When NOT to use them:
1. **Simple, cheap calculations:** Memoizing \`a + b\` or primitive checks adds more memory overhead (hook metadata + dependency checks) than simply recalculating.
2. **Components without \`React.memo\`:** If a child component isn't memoized with \`React.memo\`, passing a memoized callback won't stop the child from re-rendering anyway.
3. **Premature optimization:** Always profile first using React DevTools before sprinkling memoization everywhere.

### Interview answer:
\`useMemo\` memoizes computed values, while \`useCallback\` memoizes function references. They are most useful when passing props to memoized child components or as dependencies to other hooks. Avoid them for cheap operations or un-memoized child components where the overhead outweighs any gain.`,
    followUps: [
      "What happens if you omit the dependency array in useMemo or useCallback?",
      "How does the React Compiler in React 19 change the need for manual memoization?",
      "Can useMemo guarantee semantic stability, or can React drop the cache?"
    ],
    keyPoints: [
      "useMemo caches computed return values; useCallback caches function references",
      "Useful when passing callbacks to React.memo child components",
      "Avoid for cheap operations or where children re-render unconditionally",
      "React may purge cached values under memory pressure"
    ],
    tags: ["react", "hooks", "useMemo", "useCallback", "performance", "memoization"],
    relatedLessonSlug: "/learn/react/r12-usememo-usecallback",
    relatedLessonName: "R-12: useMemo & useCallback Deep Dive"
  },
  {
    id: "react-q02",
    trackKey: "react",
    category: "Architecture & Reconciliation",
    subtopic: "Fiber Engine",
    type: "conceptual",
    difficulty: "hard",
    source: "curated",
    question: "What is React Fiber and how does the Reconciliation Diffing algorithm work?",
    answer: `### Simple answer:
React Fiber is React's internal engine rewrite (introduced in React 16) that breaks rendering work into small units that can be paused, prioritized, or aborted so heavy renders don't freeze the browser.

### How it works:
1. **Fiber Nodes:** Every React element has a corresponding Fiber node. Together, they form a singly-linked list tree structure with pointers: \`child\`, \`sibling\`, and \`return\` (parent).
2. **Pause and Resume:** Because it's a linked list instead of a recursive call stack, React can stop rendering work after any node, yield control back to the browser for urgent events (typing or clicking), and resume later.
3. **The Two Phases:**
   - **Render Phase (Interruptible):** React builds the work-in-progress tree, calculates diffs, and marks changes. This phase can be paused or restarted.
   - **Commit Phase (Uninterruptible):** React applies the DOM mutations synchronously in one quick batch to prevent partial UI updates.

### Reconciliation Heuristics ($O(N)$ Diffing):
- Elements of different types produce different trees.
- Elements with a stable \`key\` prop maintain their identity across renders.

### Interview answer:
React Fiber replaced the synchronous stack reconciler with a pauseable linked-list structure. It splits rendering into an interruptible Render phase that calculates diffs and a fast, synchronous Commit phase that applies DOM updates, enabling concurrent features and smooth user interactions.`,
    followUps: [
      "What is the Double Buffering technique in React Fiber?",
      "What are the heuristic assumptions made by the Diffing algorithm (O(n) instead of O(n^3))?",
      "Why must keys in lists be stable, unique, and not array indices?"
    ],
    keyPoints: [
      "Fiber replaced synchronous recursive tree walk with a pauseable linked list",
      "Enables concurrent scheduling and prioritization of urgent vs transition updates",
      "Render phase is asynchronous/interruptible; commit phase is synchronous",
      "Double buffering: current tree vs work-in-progress tree"
    ],
    tags: ["fiber", "reconciliation", "virtual-dom", "concurrency", "architecture"],
    relatedLessonSlug: "/learn/react/r05-virtual-dom-reconciliation",
    relatedLessonName: "R-05: Virtual DOM & Reconciliation Internals"
  },
  {
    id: "react-q03",
    trackKey: "react",
    category: "Concurrent React",
    subtopic: "Transitions",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "What is the difference between `useTransition` and `useDeferredValue` in React 18+?",
    answer: `### Simple answer:
Both hooks mark non-urgent UI updates so React can prioritize urgent interactions (typing, clicking) to keep the app feeling fast and responsive.

### Key Differences:
| Feature | \`useTransition\` | \`useDeferredValue\` |
|---|---|---|
| **What it wraps** | Wraps the **state-updating function** (\`startTransition(() => setState(...))\`) | Wraps a **value** directly (\`useDeferredValue(query)\`) |
| **Loading indicator** | Provides built-in \`isPending\` boolean flag | No boolean; you check \`value !== deferredValue\` |
| **When to use** | When you control the state update code | When you receive the value as a prop or from a third-party hook |

### Example:
\`\`\`tsx
// useTransition:
const [isPending, startTransition] = useTransition();
function handleChange(e) {
  setQuery(e.target.value); // Urgent: input updates immediately
  startTransition(() => {
    setFilter(e.target.value); // Non-urgent: can be interrupted
  });
}

// useDeferredValue:
function ProductList({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  return <div style={{ opacity: isStale ? 0.7 : 1 }}>{/* render with deferredQuery */}</div>;
}
\`\`\`

### Interview answer:
\`useTransition\` lets you mark state updates as non-urgent with an \`isPending\` flag, while \`useDeferredValue\` defers updating a specific value until urgent renders finish. Both allow React to interrupt non-urgent rendering if the user types or clicks again.`,
    followUps: [
      "How does React interrupt a transition when a user types another keystroke?",
      "Can startTransition wrap asynchronous code like fetch or setTimeout?",
      "What is the difference between debouncing and useDeferredValue?"
    ],
    keyPoints: [
      "useTransition wraps state setters and gives isPending status",
      "useDeferredValue wraps values and lags behind until urgent renders finish",
      "Unlike debounce, transitions do not introduce artificial fixed millisecond delays",
      "React will interrupt transition work if new urgent user input arrives"
    ],
    tags: ["react18", "concurrent-mode", "useTransition", "useDeferredValue", "performance"],
    relatedLessonSlug: "/learn/react/r15-concurrent-react-transitions",
    relatedLessonName: "R-15: Concurrent React & useTransition"
  },
  {
    id: "react-q04",
    trackKey: "react",
    category: "Hooks & Lifecycle",
    subtopic: "Stale Closures",
    type: "coding",
    difficulty: "medium",
    source: "curated",
    question: "Identify the stale closure bug in this custom timer hook and explain how to fix it.",
    codeSnippet: `function useInterval(callback: () => void, delay: number) {
  useEffect(() => {
    const id = setInterval(() => {
      callback();
    }, delay);
    return () => clearInterval(id);
  }, [delay]); // notice callback is omitted
}`,
    answer: `### The Bug:
Because \`callback\` is missing from the dependency array, the \`useEffect\` only runs once when \`delay\` changes.
If the parent component re-renders with fresh state and creates a new \`callback\`, the timer continues executing the **stale closure** of the old \`callback\` that captured outdated state from the first render.

### The Fix: Mutable Ref Pattern
Keep a mutable \`useRef\` pointing to the latest callback so the timer never needs to reset, yet always invokes the freshest code:

\`\`\`tsx
import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Update ref to latest callback on every render
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up interval only when delay changes
  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
\`\`\`

### Interview answer:
Omitting functions from dependency arrays causes stale closures where the callback reads frozen, outdated state. We solve this using a mutable \`useRef\` that updates on every render, allowing the interval timer to run continuously while always calling the latest closure.`,
    followUps: [
      "Why is resetting setInterval on every re-render problematic for animations or accurate clocks?",
      "How will the proposed `useEffectEvent` hook simplify this pattern in future React releases?",
      "What happens if callback changes during a concurrent transition render?"
    ],
    keyPoints: [
      "Omitted dependencies cause closures to capture stale state from previous renders",
      "Mutable ref pattern decouples timer lifecycle from function identity changes",
      "Avoids resetting interval timer unnecessarily",
      "Essential foundation for custom event and timer hooks"
    ],
    tags: ["hooks", "stale-closures", "useRef", "useEffect", "custom-hooks"],
    relatedLessonSlug: "/learn/react/r08-useeffect-lifecycle-and-cleanup",
    relatedLessonName: "R-08: useEffect Lifecycle & Cleanup Guarantees"
  },
  {
    id: "react-q05",
    trackKey: "react",
    category: "State Management & Performance",
    subtopic: "Context API",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "Why can React Context cause unnecessary re-renders in large applications, and how do you mitigate it?",
    answer: `### Simple answer:
Whenever a Context Provider's \`value\` changes, **every single component that calls \`useContext()\` on that context will re-render**, even if the component only needed a property that didn't change.

### Mitigation Strategies:
1. **Split State and Dispatch:** Separate contexts for data and actions, because action dispatchers rarely change:
   \`\`\`tsx
   const StateContext = createContext<AppState | null>(null);
   const DispatchContext = createContext<Dispatch<Action> | null>(null);
   \`\`\`
2. **Context Splitting:** Split large monolithic contexts into smaller domain contexts (e.g., \`ThemeContext\`, \`UserContext\`, \`CartContext\`).
3. **Memoize Provider Value:** Always wrap compound objects in \`useMemo\` to prevent creating a new object reference on every parent render:
   \`\`\`tsx
   const value = useMemo(() => ({ theme, toggleTheme }), [theme]);
   \`\`\`
4. **Use Selector-based Stores:** For high-frequency state, use lightweight libraries like **Zustand** or **Redux Toolkit** that support fine-grained selector subscriptions (\`useStore(s => s.count)\`).

### Interview answer:
React Context is designed for low-frequency global data like themes or auth. Because it lacks selector support, any change re-renders all consumers. We fix this by splitting contexts into state and dispatch, memoizing provider values, or using selector-based state stores like Zustand for high-frequency updates.`,
    followUps: [
      "Why can't React Context provide native selector functionality like useSyncExternalStore?",
      "How does useSyncExternalStore help prevent tearing in concurrent rendering?",
      "What is the difference between prop drilling and context performance trade-offs?"
    ],
    keyPoints: [
      "useContext subscribes to the entire provider value with no selective filtering",
      "Splitting state and dispatch prevents re-renders in write-only consumers",
      "Split monolithic global contexts into granular domain providers",
      "Selector-based libraries (Zustand, Redux) prevent unnecessary re-renders"
    ],
    tags: ["react-context", "state-management", "re-renders", "zustand", "performance"],
    relatedLessonSlug: "/learn/react/r11-context-api-and-composition",
    relatedLessonName: "R-11: React Context API & Component Composition"
  },
  {
    id: "react-q06",
    trackKey: "react",
    category: "Fundamentals",
    subtopic: "Virtual DOM",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is React, and what is the Virtual DOM? How does it improve performance?",
    answer: `### Simple answer:
React is a JavaScript library for building component-based user interfaces. The Virtual DOM is a lightweight JavaScript representation of the real browser DOM kept in memory.

### How it works:
1. **Render:** When component state changes, React creates a new Virtual DOM tree in memory.
2. **Diffing:** React compares (diffs) this new tree against the previous Virtual DOM tree.
3. **Batch Updates (Reconciliation):** React calculates the minimal set of changes needed and updates only those specific nodes in the real browser DOM.

### Why manipulating real DOM is slow:
Directly updating real DOM triggers browser layout recalculations and repaints. The Virtual DOM minimizes these expensive browser operations by batching and applying only the differences.

\`\`\`javascript
// A Virtual DOM node is just a plain JavaScript object:
const vNode = {
  type: "button",
  props: {
    className: "btn-primary",
    children: "Click Me"
  }
};
\`\`\`

### Interview answer:
React uses a Virtual DOM—an in-memory JavaScript representation of the UI. When state changes, React compares the new virtual tree with the previous one, finds the exact differences, and updates only the changed elements in the real DOM in one efficient batch.`,
    followUps: [
      "Does React still use the Virtual DOM in React Server Components?",
      "How does React's diffing algorithm achieve O(n) performance?",
      "What is the difference between declarative and imperative UI programming?"
    ],
    keyPoints: [
      "Virtual DOM is an in-memory representation of UI elements",
      "Diffing compares old and new virtual trees to find minimal changes",
      "Minimizes expensive real DOM reflows and repaints",
      "React operates declaratively: you describe desired state, React handles DOM updates"
    ],
    tags: ["virtual-dom", "react-basics", "reconciliation", "fundamentals"],
    relatedLessonSlug: "/learn/react/r01-react-mental-model",
    relatedLessonName: "R-01: React Mental Model & The Virtual DOM"
  },
  {
    id: "react-q07",
    trackKey: "react",
    category: "Fundamentals",
    subtopic: "JSX",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is JSX, and how does React transform it into HTML in the browser?",
    answer: `### Simple answer:
JSX stands for JavaScript XML. It is a syntax extension for JavaScript that lets you write HTML-like markup directly inside JavaScript files.

### How it transforms:
Browsers do not understand JSX directly. During compilation (via Babel, SWC, or TypeScript), JSX is converted into plain JavaScript function calls:

\`\`\`tsx
// JSX syntax:
const element = <h1 className="greeting">Hello, World!</h1>;

// Compiled output (React 17+ JSX Transform):
import { jsx as _jsx } from "react/jsx-runtime";
const element = _jsx("h1", {
  className: "greeting",
  children: "Hello, World!"
});
\`\`\`

These function calls return plain JavaScript objects (Virtual DOM nodes) that React uses to create real DOM elements.

### Key Rules of JSX:
1. Must return a single root element (or use Fragment \`<>...</>\`).
2. Close all tags (e.g. \`<img />\`, \`<br />\`).
3. Use camelCase for attributes (e.g. \`className\` instead of \`class\`, \`htmlFor\` instead of \`for\`).

### Interview answer:
JSX is a syntax extension allowing us to write HTML-like structures inside JavaScript. A build tool compiles JSX into \`jsx()\` function calls that return plain JavaScript objects representing Virtual DOM nodes, which React renders to the browser DOM.`,
    followUps: [
      "Why must components return a single root element or Fragment in JSX?",
      "Why do we use className instead of class in JSX?",
      "How does JSX prevent Cross-Site Scripting (XSS) attacks by default?"
    ],
    keyPoints: [
      "JSX is syntax sugar compiled into JavaScript function calls",
      "Compilers transform JSX into React elements (Virtual DOM objects)",
      "Requires single root element or Fragment",
      "React escapes values embedded in JSX by default to protect against XSS"
    ],
    tags: ["jsx", "react-basics", "transpilation", "fundamentals"],
    relatedLessonSlug: "/learn/react/r02-jsx-and-components",
    relatedLessonName: "R-02: JSX Syntax & Component Composition"
  },
  {
    id: "react-q08",
    trackKey: "react",
    category: "State & Props",
    subtopic: "Props vs State",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is the difference between State and Props in React?",
    answer: `### Simple answer:
- **Props (Properties):** External data passed **into** a component from its parent (like function parameters). They are read-only and immutable by the child.
- **State:** Internal data managed **inside** a component that can change over time (like local variables). When state changes, the component re-renders.

### Comparison Table:
| Characteristic | Props | State |
|---|---|---|
| **Origin** | Passed from parent component | Initialized within component |
| **Mutability** | Read-only (immutable by child) | Mutable via setter function (\`setState\`) |
| **Causes Re-render** | Yes (when parent passes new props) | Yes (when setter is called) |
| **Analogy** | Function arguments | Local function variables |

### Example:
\`\`\`tsx
function CounterButton({ label }: { label: string }) { // label is a prop
  const [count, setCount] = useState(0); // count is local state

  return (
    <button onClick={() => setCount(count + 1)}>
      {label}: {count}
    </button>
  );
}
\`\`\`

### Interview answer:
Props are read-only inputs passed from a parent component to configure a child, while state is local, mutable data managed within the component that triggers re-renders when updated.`,
    followUps: [
      "Can a child component modify props received from a parent?",
      "What is 'lifting state up' in React?",
      "What is prop drilling and how do you avoid it?"
    ],
    keyPoints: [
      "Props flow downwards (one-way data binding)",
      "Props are immutable; children must not mutate props directly",
      "State is internal and managed with useState or useReducer",
      "Updates to either state or props trigger component re-renders"
    ],
    tags: ["state", "props", "components", "fundamentals"],
    relatedLessonSlug: "/learn/react/r03-state-and-props",
    relatedLessonName: "R-03: State Management & Props Flow"
  },
  {
    id: "react-q09",
    trackKey: "react",
    category: "Lists & Keys",
    subtopic: "Key Prop",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "Why do lists in React need `key` props, and why should you avoid using array indexes as keys?",
    answer: `### Simple answer:
Keys help React identify which items in a list have changed, been added, or been removed. They give each item a stable identity between renders so React doesn't re-render the whole list.

### Why avoid using array indexes (\`key={index}\`)?
If items in the list can be reordered, filtered, or inserted at the beginning:
1. The index changes for existing items.
2. React mistakenly pairs old component state (like input text or checkbox state) with the wrong item!
3. Causes subtle UI bugs and degrades animation and rendering performance.

### Example:
\`\`\`tsx
// BAD: Using array index
{items.map((item, index) => (
  <TodoItem key={index} todo={item} />
))}

// GOOD: Using stable unique identifier
{items.map((item) => (
  <TodoItem key={item.id} todo={item} />
))}
\`\`\`

### When is index acceptable?
Only if the list is static (never filtered, sorted, or reordered) and items have no uncontrolled state.

### Interview answer:
Keys provide a stable identity for list items so React's diffing algorithm knows which elements to move, add, or delete. Using array indexes as keys breaks when items are reordered or deleted because indexes change, leading to state bugs and unnecessary re-renders. Always use stable unique IDs.`,
    followUps: [
      "What happens internally in the reconciliation algorithm when keys are missing?",
      "Can keys be passed as props into child components directly?",
      "How do keys help reset component state (key as a reset mechanism)?"
    ],
    keyPoints: [
      "Keys give list items stable identity during reconciliation",
      "Using index causes bugs when inserting, deleting, or sorting items",
      "Stable IDs from database or crypto.randomUUID() are best practice",
      "Changing key on a component forcefully unmounts and resets it"
    ],
    tags: ["keys", "lists", "reconciliation", "best-practices"],
    relatedLessonSlug: "/learn/react/r04-lists-and-conditional-rendering",
    relatedLessonName: "R-04: Rendering Lists & Stable Keys"
  },
  {
    id: "react-q10",
    trackKey: "react",
    category: "Forms & Inputs",
    subtopic: "Controlled vs Uncontrolled",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "What is the difference between Controlled and Uncontrolled components in React forms?",
    answer: `### Simple answer:
- **Controlled Component:** Form input whose value is governed entirely by **React state** (\`value\` and \`onChange\`).
- **Uncontrolled Component:** Form input whose value is managed by the **browser DOM itself** and read using a \`ref\`.

### Comparison:
\`\`\`tsx
// 1. Controlled Component (React controls value):
function ControlledInput() {
  const [text, setText] = useState("");
  return (
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}

// 2. Uncontrolled Component (DOM holds value, read via ref):
function UncontrolledInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  function handleSubmit() {
    console.log(inputRef.current?.value);
  }
  return <input ref={inputRef} defaultValue="Default text" />;
}
\`\`\`

### When to use which:
- **Controlled:** For instant validation, disabling submit buttons, formatting text as user types, and dynamic inputs.
- **Uncontrolled:** For simple forms where you only read values on submit, file inputs (\`<input type="file" />\` is always uncontrolled in React), or high-performance forms with libraries like React Hook Form.

### Interview answer:
In controlled components, React state is the single source of truth for the input's value via \`value\` and \`onChange\`. In uncontrolled components, the DOM holds the state and you access it using a \`ref\`. Controlled is best for real-time validation, while uncontrolled is simpler and faster for basic forms.`,
    followUps: [
      "Why is <input type='file' /> always an uncontrolled component in React?",
      "How does React Hook Form use uncontrolled inputs for performance?",
      "What causes the warning: 'A component is changing an uncontrolled input to be controlled'?"
    ],
    keyPoints: [
      "Controlled components store input value in React state",
      "Uncontrolled components store input value in the DOM accessed via ref",
      "defaultValue sets initial value for uncontrolled inputs",
      "File inputs are always uncontrolled in React"
    ],
    tags: ["forms", "controlled-components", "uncontrolled-components", "useRef"],
    relatedLessonSlug: "/learn/react/r06-forms-and-controlled-inputs",
    relatedLessonName: "R-06: Form Handling & Controlled Inputs"
  },
  {
    id: "react-q11",
    trackKey: "react",
    category: "Hooks Fundamentals",
    subtopic: "Rules of Hooks",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What are the Rules of Hooks in React, and why do they exist?",
    answer: `### Simple answer:
There are two core rules for React Hooks:
1. **Only call hooks at the top level:** Do not call hooks inside loops, conditions, or nested functions.
2. **Only call hooks from React functions:** Call them from React function components or custom hooks, not regular JavaScript functions.

### Why these rules exist:
React does not track hooks by name. Internally, React stores hook state in an **ordered array (linked list)** for each component.
On every render, React relies on hooks being called in the **exact same sequential order** to match each \`useState\` or \`useEffect\` with its previous state!

### What happens if you break the rule:
\`\`\`tsx
// BAD: Inside condition
if (isLoggedIn) {
  useEffect(() => { ... }); // Changes hook order when isLoggedIn toggles!
}
\`\`\`
If \`isLoggedIn\` changes, the indices shift, and React gives the wrong state to the next hook, crashing the component.

### Interview answer:
Hooks must only be called at the top level of React function components or custom hooks, never inside loops or conditions. This is because React tracks hook state internally using a fixed order of execution; calling them conditionally would corrupt state alignment between renders.`,
    followUps: [
      "How does ESLint's eslint-plugin-react-hooks enforce these rules automatically?",
      "How does React store hook state under the hood (Fiber's memoizedState)?",
      "Can a custom hook call other hooks?"
    ],
    keyPoints: [
      "Rule 1: Top-level only (no conditions, loops, or nested functions)",
      "Rule 2: React function components or custom hooks only",
      "React tracks hooks by their sequential call order",
      "Conditionals inside hooks are fine (if inside useEffect), but conditionally calling the hook is forbidden"
    ],
    tags: ["hooks", "rules-of-hooks", "react-internals", "fiber"],
    relatedLessonSlug: "/learn/react/r07-hooks-architecture-rules",
    relatedLessonName: "R-07: The Rules of Hooks & Fiber Linked List"
  },
  {
    id: "react-q12",
    trackKey: "react",
    category: "Hooks & Lifecycle",
    subtopic: "useEffect Cleanup",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "How does the `useEffect` cleanup function work, and when does it execute?",
    answer: `### Simple answer:
A cleanup function is an optional function returned from inside \`useEffect\`. It cleans up resources (like timers, subscriptions, or event listeners) to prevent memory leaks.

### When does it run?
1. **Before the effect runs again:** On re-renders when dependencies change, React runs the previous render's cleanup function **before** running the new effect.
2. **When the component unmounts:** React runs the cleanup function one final time when the component is removed from the DOM.

### Example:
\`\`\`tsx
useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);

  // Cleanup function:
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []); // Empty dependency: runs on mount, cleans up on unmount
\`\`\`

### Strict Mode in Development:
In React 18+ development with StrictMode, React deliberately mounts, unmounts, and re-mounts components once to help you test that your cleanup functions work properly!

### Interview answer:
The cleanup function returned by \`useEffect\` runs when the component unmounts and before re-running the effect if dependencies change. It is essential for cancelling network requests, clearing timers, and removing DOM event listeners to prevent memory leaks.`,
    followUps: [
      "Why does React 18 mount and unmount components twice in development StrictMode?",
      "How do you cancel an inflight fetch request using AbortController in useEffect cleanup?",
      "What happens if useEffect does not return a function?"
    ],
    keyPoints: [
      "Cleanup runs before effect re-execution and on component unmount",
      "Essential for clearing timers, event listeners, and WebSocket connections",
      "React 18 StrictMode double-invokes effects in development to verify cleanup logic",
      "Use AbortController to cancel pending HTTP fetches"
    ],
    tags: ["useEffect", "cleanup", "lifecycle", "memory-leaks"],
    relatedLessonSlug: "/learn/react/r08-useeffect-lifecycle-and-cleanup",
    relatedLessonName: "R-08: useEffect Lifecycle & Cleanup Guarantees"
  },
  {
    id: "react-q13",
    trackKey: "react",
    category: "Performance & Re-rendering",
    subtopic: "Re-rendering Triggers",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "When does a React component re-render, and how can you prevent unnecessary re-renders?",
    answer: `### Simple answer:
A React component re-renders when:
1. Its **own state updates** (\`useState\` / \`useReducer\`).
2. Its **parent component re-renders** (by default, children re-render when a parent re-renders).
3. A **Context it consumes updates** via \`useContext\`.
4. Its **props change**.

### Common misconception:
Props changing does not trigger re-renders by itself; rather, the parent re-renders, which causes children to re-render with new props!

### How to prevent unnecessary re-renders:
1. **\`React.memo\`:** Wraps a child component so it only re-renders if its props change.
2. **\`useCallback\` & \`useMemo\`:** Keeps function references and objects stable so they don't break \`React.memo\`.
3. **Component Composition:** Move state down to where it is needed or pass components as \`children\` so the parent re-render doesn't re-render the wrapped child.
4. **Context Splitting:** Split high-frequency state from low-frequency state.

### Example (Moving state down):
\`\`\`tsx
// Instead of putting dialog state in the root page, wrap it in its own small component:
function OpenDialogButton() {
  const [isOpen, setIsOpen] = useState(false);
  return <>{/* only this small button re-renders when opened! */}</>;
}
\`\`\`

### Interview answer:
Components re-render when their state changes, their consumed Context updates, or their parent component re-renders. We prevent unnecessary re-renders by moving state down close to where it's used, passing children as props, and memoizing components with \`React.memo\` combined with \`useCallback\`.`,
    followUps: [
      "Why is moving state down often better than using React.memo?",
      "Does calling a state setter with the same value cause a re-render?",
      "How do you profile re-renders using the React DevTools Profiler?"
    ],
    keyPoints: [
      "Re-render triggers: state change, parent re-render, context change",
      "Parent re-rendering re-renders all children by default",
      "React skips re-renders if setter is called with identical value (Object.is)",
      "Best optimization is good component composition and moving state down"
    ],
    tags: ["re-renders", "performance", "React.memo", "optimization"],
    relatedLessonSlug: "/learn/react/r12-usememo-usecallback",
    relatedLessonName: "R-12: useMemo & useCallback Deep Dive"
  },
  {
    id: "react-q14",
    trackKey: "react",
    category: "Hooks Fundamentals",
    subtopic: "useRef",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What is `useRef`, and how does it differ from `useState`?",
    answer: `### Simple answer:
\`useRef\` returns a mutable object with a \`.current\` property that persists across renders. Unlike \`useState\`, changing \`ref.current\` **does not trigger a component re-render**.

### Comparison:
| Feature | \`useState\` | \`useRef\` |
|---|---|---|
| **Re-render on change?** | **Yes** (updates UI) | **No** (silent update) |
| **How to update** | Setter function (\`setCount(c => c + 1)\`) | Mutate directly (\`ref.current = 5\`) |
| **Access timing** | Next render | Immediately synchronous |
| **Primary purpose** | Data that needs to show on screen | Storing DOM elements or mutable values across renders |

### Two Main Use Cases for \`useRef\`:
1. **Accessing DOM nodes directly:**
\`\`\`tsx
const inputRef = useRef<HTMLInputElement>(null);
function focusInput() {
  inputRef.current?.focus(); // Direct DOM access
}
return <input ref={inputRef} />;
\`\`\`

2. **Storing mutable instance variables (like timer IDs or previous state):**
\`\`\`tsx
const timerRef = useRef<NodeJS.Timeout | null>(null);
function start() {
  timerRef.current = setInterval(() => console.log("tick"), 1000);
}
function stop() {
  if (timerRef.current) clearInterval(timerRef.current);
}
\`\`\`

### Interview answer:
\`useState\` is for data that impacts what appears on the screen and triggers re-renders when updated. \`useRef\` holds mutable values that persist across renders without triggering a re-render, commonly used for direct DOM references and storing timer IDs or previous values.`,
    followUps: [
      "How do you store the previous value of a prop using useRef?",
      "Why shouldn't you read or write ref.current during rendering?",
      "How does forwardRef work when passing refs to child components?"
    ],
    keyPoints: [
      "useRef holds a persistent mutable .current object",
      "Mutating ref.current does NOT trigger a re-render",
      "Used for direct DOM access (focus, scroll, measurements)",
      "Used for mutable timer IDs and tracking previous state values"
    ],
    tags: ["useRef", "useState", "dom", "hooks"],
    relatedLessonSlug: "/learn/react/r09-useref-and-forwardref",
    relatedLessonName: "R-09: useRef & forwardRef DOM Integration"
  },
  {
    id: "react-q15",
    trackKey: "react",
    category: "Hooks & Lifecycle",
    subtopic: "useLayoutEffect",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What is the difference between `useEffect` and `useLayoutEffect`?",
    answer: `### Simple answer:
- **\`useEffect\`** runs **asynchronously after** the browser has painted the screen (non-blocking).
- **\`useLayoutEffect\`** runs **synchronously before** the browser paints the screen (blocks painting).

### Lifecycle Order:
\`\`\`
1. React renders component
2. React updates DOM nodes
3. useLayoutEffect runs synchronously (can measure DOM here!)
4. Browser paints screen to pixels
5. useEffect runs asynchronously
\`\`\`

### When to use \`useLayoutEffect\`:
Only when you need to **measure DOM elements** (like width, height, or scroll position) and immediately adjust styles **before the user sees anything**, preventing visible layout flicker:

\`\`\`tsx
useLayoutEffect(() => {
  const rect = tooltipRef.current?.getBoundingClientRect();
  if (rect) {
    setPosition({ top: rect.bottom + 8, left: rect.left });
  }
}, []);
\`\`\`

### Why prefer \`useEffect\` 99% of the time:
Because \`useLayoutEffect\` blocks the browser from painting, heavy code inside it causes noticeable UI lag. Always use \`useEffect\` unless you are fixing a visual layout flicker.

### Interview answer:
\`useEffect\` runs after the browser paints so it doesn't block the UI. \`useLayoutEffect\` runs synchronously before the browser paints, which is useful when measuring DOM sizes or positions to prevent visual layout flickering before the user sees the page.`,
    followUps: [
      "Why does Next.js show a warning when using useLayoutEffect in Server Components?",
      "How does useInsertionEffect in React 18 differ from useLayoutEffect?",
      "Can heavy logic inside useLayoutEffect cause jank?"
    ],
    keyPoints: [
      "useEffect runs asynchronously after browser paint (recommended default)",
      "useLayoutEffect runs synchronously before browser paint",
      "Prevents visual layout jumps when measuring DOM elements",
      "Causes SSR warnings on server; use useEffect for data fetching"
    ],
    tags: ["useLayoutEffect", "useEffect", "dom-measurement", "hooks"],
    relatedLessonSlug: "/learn/react/r08-useeffect-lifecycle-and-cleanup",
    relatedLessonName: "R-08: useEffect Lifecycle & Cleanup Guarantees"
  },
  {
    id: "react-q16",
    trackKey: "react",
    category: "Custom Hooks",
    subtopic: "Custom Hooks",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What is a Custom Hook in React, and how do you build one?",
    answer: `### Simple answer:
A Custom Hook is a regular JavaScript function whose name starts with **\`use\`** that can call other React hooks. It allows you to extract and reuse component state logic across multiple components without duplicating code.

### Example: \`useLocalStorage\`
\`\`\`tsx
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
\`\`\`

### Usage in components:
\`\`\`tsx
function Settings() {
  const [theme, setTheme] = useLocalStorage("app_theme", "dark");
  return <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme}</button>;
}
\`\`\`

### Do components share state when using the same custom hook?
**No!** Each component that calls a custom hook gets its own completely independent instance of state and effects.

### Interview answer:
Custom hooks let you extract stateful logic into reusable functions starting with the prefix \`use\`. They can call other hooks, and each component that uses the custom hook maintains its own isolated state.`,
    followUps: [
      "Why must custom hook names start with 'use'?",
      "Can custom hooks return objects instead of tuples?",
      "How do custom hooks compare to Higher-Order Components (HOCs) and Render Props?"
    ],
    keyPoints: [
      "Must begin with 'use' for ESLint rules of hooks enforcement",
      "Encapsulates reusable stateful logic and side effects",
      "State inside custom hooks is NOT shared between component instances",
      "Replaced legacy patterns like HOCs and Render Props"
    ],
    tags: ["custom-hooks", "reusability", "hooks", "architecture"],
    relatedLessonSlug: "/learn/react/r10-custom-hooks-composition",
    relatedLessonName: "R-10: Custom Hooks & Logic Extraction"
  },
  {
    id: "react-q17",
    trackKey: "react",
    category: "Optimization",
    subtopic: "React.memo",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How does `React.memo` work, and how do you provide a custom comparison function?",
    answer: `### Simple answer:
\`React.memo\` is a Higher-Order Component that wraps a component to skip re-rendering if its props have not changed (shallow comparison).

### Default behavior (Shallow comparison):
React checks every prop using \`Object.is(prevProp, nextProp)\`. If all props are referentially identical, it reuses the previously rendered output.

\`\`\`tsx
const UserBadge = React.memo(function UserBadge({ name }: { name: string }) {
  console.log("Rendering UserBadge");
  return <span className="badge">{name}</span>;
});
\`\`\`

### Custom comparison function:
You can pass a second argument \`arePropsEqual(prevProps, nextProps)\`. Note: it returns \`true\` if props are equal (skip render), and \`false\` if they changed:

\`\`\`tsx
function arePropsEqual(prev: Props, next: Props) {
  // Only re-render if user ID or online status changes:
  return prev.user.id === next.user.id && prev.user.isOnline === next.user.isOnline;
}

export const OptimizedUser = React.memo(UserCard, arePropsEqual);
\`\`\`

### Gotcha: Passing new object or function references:
If you pass inline functions \`onClick={() => ...}\` or inline objects \`style={{ margin: 0 }}\`, \`React.memo\` will always fail because a new reference is created on every parent render! Pair \`React.memo\` with \`useCallback\` and \`useMemo\`.

### Interview answer:
\`React.memo\` prevents re-rendering a component if its props haven't changed. By default it performs a shallow comparison of props, and you can supply a custom comparison function that returns \`true\` to skip the render. To work effectively, parent components must pass referentially stable callbacks and objects.`,
    followUps: [
      "How is React.memo's arePropsEqual opposite to class component shouldComponentUpdate?",
      "Why can overusing React.memo actually hurt performance?",
      "How does the React 19 Compiler eliminate the need for React.memo?"
    ],
    keyPoints: [
      "Higher-order component that skips re-renders on shallow prop equality",
      "arePropsEqual returns true to skip render (opposite of shouldComponentUpdate)",
      "Fails if parent passes unstable inline functions or objects",
      "Best for frequently re-rendered components with complex subtree renders"
    ],
    tags: ["React.memo", "optimization", "memoization", "props"],
    relatedLessonSlug: "/learn/react/r12-usememo-usecallback",
    relatedLessonName: "R-12: useMemo & useCallback Deep Dive"
  },
  {
    id: "react-q18",
    trackKey: "react",
    category: "Error Handling",
    subtopic: "Error Boundaries",
    type: "scenario",
    difficulty: "medium",
    source: "curated",
    question: "What are Error Boundaries in React, and what types of errors can they NOT catch?",
    answer: `### Simple answer:
An Error Boundary is a React component that catches JavaScript errors anywhere in its child component tree, logs the error, and displays a fallback UI instead of crashing the whole app.

### How they work:
Must be implemented as a **Class component** implementing either:
- \`static getDerivedStateFromError(error)\`: Updates state to render a fallback UI.
- \`componentDidCatch(error, errorInfo)\`: Logs error details to reporting services (Sentry, Datadog).

\`\`\`tsx
class ErrorBoundary extends React.Component<{ fallback: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Caught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
\`\`\`

### Errors Error Boundaries CANNOT catch:
1. **Event Handlers:** (e.g. \`onClick\`) — Use regular \`try/catch\` inside the handler.
2. **Asynchronous code:** (e.g. \`setTimeout\`, \`requestAnimationFrame\`, or unhandled promise rejections).
3. **Server-Side Rendering (SSR):** Errors during server rendering.
4. **Errors thrown inside the Error Boundary itself.**

### Interview answer:
Error Boundaries catch errors in child render trees, lifecycle methods, and constructors to show fallback UIs instead of white screens. They cannot catch errors in event handlers, asynchronous code, or server rendering, which still require standard try/catch blocks.`,
    followUps: [
      "Why can't Error Boundaries be written as function components currently?",
      "How does the react-error-boundary library simplify error boundaries in modern React?",
      "How do Next.js error.tsx files implement error boundaries automatically?"
    ],
    keyPoints: [
      "Catches errors in child render, lifecycle methods, and constructors",
      "Requires class components with getDerivedStateFromError and componentDidCatch",
      "Cannot catch errors in event handlers, async code, or SSR",
      "Next.js app/error.tsx creates an automatic error boundary per route segment"
    ],
    tags: ["error-boundaries", "error-handling", "class-components", "resilience"],
    relatedLessonSlug: "/learn/react/r14-error-boundaries-and-suspense",
    relatedLessonName: "R-14: Error Boundaries & Suspense Architecture"
  },
  {
    id: "react-q19",
    trackKey: "react",
    category: "Architecture & Patterns",
    subtopic: "Prop Drilling",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "What is Prop Drilling in React, and how can you solve it using Component Composition?",
    answer: `### Simple answer:
Prop Drilling occurs when you pass data through multiple layers of intermediate components that don't need the data themselves, just to get it to a deeply nested child component.

### Why it's a problem:
It couples unrelated components to data they don't use and makes refactoring painful.

### Solution 1: Component Composition (Slots / Children)
Often you don't even need Context! Instead of passing data down 5 levels, pass the component itself as a child:

\`\`\`tsx
// Before (Prop Drilling):
<Page user={user} /> // Page passes user to Header, Header passes to Avatar

// After (Composition via children):
<Page>
  <Header>
    <Avatar user={user} /> {/* Avatar rendered right where user is available! */}
  </Header>
</Page>
\`\`\`

### Solution 2: React Context API
For truly global data like themes, authenticated users, or language settings.

### Solution 3: Global State Stores (Zustand, Redux)
For complex application-wide state with frequent updates.

### Interview answer:
Prop drilling is passing props through intermediate components that don't need them. While developers often jump straight to Context or Redux, the cleanest solution is often Component Composition—passing components as children or slots so deeply nested components can be rendered where the data already lives.`,
    followUps: [
      "Why is component composition preferred over React Context for local layout nesting?",
      "What is the inverted control pattern in React?",
      "When is Context truly necessary compared to composition?"
    ],
    keyPoints: [
      "Prop drilling passes data through non-consuming intermediary components",
      "Component composition (children prop) often eliminates prop drilling without context",
      "Context is best for genuinely global data (themes, auth)",
      "Reduces tight coupling across component hierarchies"
    ],
    tags: ["prop-drilling", "composition", "architecture", "context"],
    relatedLessonSlug: "/learn/react/r11-context-api-and-composition",
    relatedLessonName: "R-11: React Context API & Component Composition"
  },
  {
    id: "react-q20",
    trackKey: "react",
    category: "Modern React & Server Components",
    subtopic: "Server Components",
    type: "conceptual",
    difficulty: "hard",
    source: "curated",
    question: "What are React Server Components (RSC) in modern React, and how do they differ from traditional Server-Side Rendering (SSR)?",
    answer: `### Simple answer:
Traditional SSR renders HTML on the server and then downloads the full JavaScript bundle to hydrate the entire page in the browser. React Server Components (RSC) run **only on the server**, stream rendered UI to the client, and add **zero JavaScript** to the client bundle.

### Key Differences:
| Feature | Traditional SSR (Pages router) | React Server Components (RSC) |
|---|---|---|
| **Client JS bundle** | Sends JS for all components to hydrate | **0 KB JS** sent for Server Components |
| **Execution** | Runs on server first, then re-runs on client during hydration | Runs **only on server**; never re-runs on client |
| **Data Access** | Fetch inside \`getServerSideProps\` | Component is an \`async\` function querying DB directly |
| **State & Interactivity** | Can use hooks after hydration | Cannot use \`useState\` or \`useEffect\` (delegate to Client Components) |

### Example Server Component:
\`\`\`tsx
// Runs ONLY on server! Zero client JS.
export default async function UserProfile({ userId }: { userId: string }) {
  const user = await db.user.findUnique({ where: { id: userId } }); // Direct database call!
  return (
    <div>
      <h2>{user.name}</h2>
      <LikeButton initialLikes={user.likes} /> {/* Client component for interactivity */}
    </div>
  );
}
\`\`\`

### Interview answer:
Traditional SSR sends both HTML and full JavaScript to hydrate in the browser. Server Components execute exclusively on the server, streaming UI data to the client with zero added JavaScript bundle size. They can directly query databases and access secrets, while delegating interactive UI to Client Components marked with \`"use client"\`.`,
    followUps: [
      "How do Server Components and Client Components interleave with the children prop?",
      "What is the RSC payload format sent over HTTP?",
      "Why can't Server Components use React hooks like useState or useEffect?"
    ],
    keyPoints: [
      "Server components execute strictly on the server and add zero client JS bundle",
      "Can directly query databases, filesystems, and server secrets",
      "Traditional SSR hydrates all JS; RSC hydrates only Client Components",
      "Interactive widgets use 'use client' boundaries"
    ],
    tags: ["server-components", "rsc", "ssr", "react19", "architecture"],
    relatedLessonSlug: "/learn/react/r15-concurrent-react-transitions",
    relatedLessonName: "R-15: Concurrent React & useTransition"
  }
];
