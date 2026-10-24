import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react22UsereducerComplexStateContent: StandardLessonContent = {
  slug: "react22-usereducer-complex-state",
  code: "REACT-22",
  title: "useReducer: Predictable State Transitions for Complex UI",
  subtitle: "Consolidate complex, multi-action state transitions into a single pure reducer function.",
  difficulty: "Difficult",
  scenario: {
    question: "A shopping cart has actions to add items, remove items, apply discount codes, and clear the cart. The component is cluttered with 5 different useState setters and bug-prone logic. How could `useReducer` help?",
    answer: "Give each action a clear type (`ADD_ITEM`, `REMOVE_ITEM`, `CLEAR_CART`) and place the update rules in one reducer function. This decouples event handlers from state mechanics and makes transition logic testable in pure JavaScript.",
  },
  interviewQuestion: {
    question: "When should you prefer useReducer over useState in React?",
    answer: "Prefer `useReducer` when state consists of multiple interdependent values, when transitions require complex logic that shouldn't clutter the UI view, or when you want to isolate state management into a pure, easily testable function outside the component.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Reducers as Pure Functions", icon: "⚙️" },
    { id: "part3", label: "Step-by-Step Execution", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "useReducer for Organized State Changes",
    bigPicture: "While `useState` is ideal for simple independent variables, complex applications often have states that change in response to specific user actions. With `useReducer`, components express WHAT happened by dispatching actions, and a single reducer function decides HOW state updates.",
    codeSnippet: `import { useReducer } from "react";

// 1. Pure reducer function outside component
function countReducer(count, action) {
  if (action.type === "increment") return count + 1;
  if (action.type === "decrement") return count - 1;
  if (action.type === "reset") return 0;
  return count;
}

export default function Counter() {
  // 2. Initialize useReducer with reducer and initial value
  const [count, dispatch] = useReducer(countReducer, 0);

  return (
    <div>
      <p>Count: {count}</p>
      {/* 3. Dispatch actions describing what happened */}
      <button onClick={() => dispatch({ type: "increment" })}>+1</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}`,
    analogy: "Think of a restaurant kitchen. The waiters (event handlers) don't cook the food directly. They write an order ticket: { type: 'ORDER_STEAK', table: 4 } and send it to the head chef (the reducer). The chef alone decides how to modify the kitchen inventory.",
    breakdownTitle: "The useReducer Trifecta",
    breakdownItems: [
      {
        title: "1. Reducer Function (state, action) => newState",
        desc: "A pure function that takes the current state and an action object, and returns the next state.",
      },
      {
        title: "2. Action Object ({ type, payload })",
        desc: "A plain JavaScript object describing the user action that occurred.",
      },
      {
        title: "3. Dispatch Function",
        desc: "The function returned by useReducer used to send actions into the reducer.",
      },
    ],
  },
  part2: {
    title: "The Pure Reducer Rule",
    rule: {
      title: "The Reducer Purity Rule",
      content: "Reducers must be pure functions! Never mutate state directly in a reducer, never perform side effects (no fetch, no timers), and always return a new state object.",
    },
    cards: [
      {
        number: "01",
        tag: "SEPARATION",
        title: "Decouple View from Logic",
        description: "Event handlers stay minimal (`dispatch({ type: 'CHECKOUT' })`), while complex business rules live in the reducer.",
        color: "purple",
      },
      {
        number: "02",
        tag: "TESTABILITY",
        title: "Zero-Mock Unit Testing",
        description: "Because the reducer is a plain JavaScript function outside React, you can test all state transitions with simple Jest/Vitest assertions without mounting UI.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "DISPATCH STABILITY",
        title: "Stable Identity",
        description: "The `dispatch` function identity is guaranteed by React to never change across renders, so it can be passed down without triggering re-renders.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step dispatch and reducer transition cycle:",
    points: [
      {
        title: "1. Component Dispatches Action",
        content: "User clicks button, calling dispatch({ type: 'ADD', item }).",
      },
      {
        title: "2. Reducer Computes Next State",
        content: "React executes taskReducer(currentTasks, action) and stores returned next state.",
        codeSnippet: `function taskReducer(state, action) {\n  switch (action.type) {\n    case "ADD": return [...state, action.item];\n  }\n}`,
      },
      {
        title: "3. UI Re-renders",
        content: "React re-renders component with new tasks array seamlessly.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Mutating State Array Inside Reducer",
      code: `// ❌ MUTATION BUG: modifies existing array!
function reducer(state, action) {
  if (action.type === "ADD") {
    state.push(action.item);
    return state;
  }
}`,
      explanation: "Mutating the state object directly prevents React from detecting state changes, skipping the re-render.",
    },
    good: {
      title: "Return Brand New Array Copy",
      code: `// ✅ Correct: return new array copy
function reducer(state, action) {
  if (action.type === "ADD") {
    return [...state, action.item];
  }
}`,
      explanation: "Spread syntax returns a new array reference, correctly informing React that state has changed.",
    },
    whyItMatters: "Pure reducers make complex business logic testable, predictable, and free from race conditions.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Add, toggle, and delete tasks to test the useReducer state machine:",
    starterCode: `import { useReducer } from "react";

const initialTasks = [
  { id: 1, text: "Master React Fundamentals", done: true },
  { id: 2, text: "Build Capstone Dashboard", done: false },
];

function taskReducer(tasks, action) {
  switch (action.type) {
    case "ADD":
      return [...tasks, { id: Date.now(), text: action.text, done: false }];
    case "TOGGLE":
      return tasks.map(t => t.id === action.id ? { ...t, done: !t.done } : t);
    case "DELETE":
      return tasks.filter(t => t.id !== action.id);
    default:
      return tasks;
  }
}

export default function App() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  function handleAdd() {
    const text = prompt("Enter new task:");
    if (text) dispatch({ type: "ADD", text });
  }

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h3>Task Manager with useReducer</h3>
      <button onClick={handleAdd} style={{ padding: "6px 12px", marginBottom: "12px" }}>+ Add Task</button>
      
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map(t => (
          <li key={t.id} style={{ display: "flex", alignItems: "center", gap: "8px", margin: "6px 0" }}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => dispatch({ type: "TOGGLE", id: t.id })}
            />
            <span style={{ textDecoration: t.done ? "line-through" : "none", flex: 1 }}>{t.text}</span>
            <button onClick={() => dispatch({ type: "DELETE", id: t.id })} style={{ color: "red" }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Organize Multi-Step State",
        desc: "useReducer organizes state transitions around actions and a single reducer function.",
      },
      {
        title: "Pure Functions Only",
        desc: "Reducers must be pure functions with zero side effects: (state, action) => newState.",
      },
      {
        title: "Stable Dispatch",
        desc: "The dispatch function has a stable reference and never causes unnecessary re-renders.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What must a React reducer function return?",
      options: [
        "A JSX template string",
        "The next state value or object",
        "A Promise resolving to data",
        "A boolean indicating if render is permitted",
      ],
      correctIndex: 1,
      explanation: "A reducer must calculate and return the next state based on the current state and the received action.",
    },
  },
};
