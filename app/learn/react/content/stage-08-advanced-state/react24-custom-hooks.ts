import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react24CustomHooksContent: StandardLessonContent = {
  slug: "react24-custom-hooks",
  code: "REACT-24",
  title: "Custom Hooks: Extracting & Sharing Reusable Logic",
  subtitle: "Package stateful logic into custom use... functions to share across components without code duplication.",
  difficulty: "Moderate",
  scenario: {
    question: "Several independent components need the same toggle/modal visibility or window-tracking behavior, and the state and effect logic is being copy-pasted across files. What should you do?",
    answer: "Extract that stateful logic into a custom Hook (e.g. `useToggle`, `useWindowSize`). Components can call the custom Hook to reuse the logic while maintaining their own independent state.",
  },
  interviewQuestion: {
    question: "When two different components call the same Custom Hook, do they share the same state?",
    answer: "No. Custom Hooks share stateful *logic*, not state values. Every time a component calls a custom Hook, it receives its own completely isolated instance of the underlying `useState` and `useEffect` variables.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "The use... Naming Convention", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "Custom Hooks: Reusing React Logic",
    bigPicture: "In React, components let you reuse UI markup and styling. Custom Hooks let you reuse stateful logic (fetching, timers, window listeners, form handling) between different components. A custom Hook is simply a JavaScript function whose name starts with `use` and that can call other React Hooks.",
    codeSnippet: `import { useState } from "react";

// 1. Define custom hook (name must start with 'use')
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  function toggle() {
    setValue(current => !current);
  }

  return [value, toggle];
}

// 2. Consume custom hook in a component
export default function Details() {
  const [visible, toggleVisible] = useToggle();

  return (
    <div>
      <button onClick={toggleVisible}>
        {visible ? "Hide" : "Show"} details
      </button>
      {visible && <p>These are the course curriculum details.</p>}
    </div>
  );
}`,
    analogy: "Think of regular components like custom-shaped cookie cutters that shape dough (UI). A Custom Hook is like an electric stand mixer recipe: multiple bakers can follow the exact same mixing instructions, but each baker bakes their own separate batch of cookies.",
    breakdownTitle: "Custom Hook Mechanics",
    breakdownItems: [
      {
        title: "1. The 'use' Prefix Rule",
        desc: "Custom hooks MUST start with 'use' (e.g. useOnlineStatus). This signals to React and ESLint to enforce the Rules of Hooks.",
      },
      {
        title: "2. Composing Built-in Hooks",
        desc: "A custom hook can call useState, useEffect, useRef, useReducer, or other custom hooks.",
      },
      {
        title: "3. Flexible Return Types",
        desc: "Unlike components that must return JSX, custom hooks can return arrays, objects, booleans, or functions.",
      },
    ],
  },
  part2: {
    title: "Custom Hook Architecture",
    rule: {
      title: "The Logic vs UI Rule",
      content: "Custom Hooks should manage behavior, data, and side effects, not JSX markup. Return data values and action functions; let components decide how to render them.",
    },
    cards: [
      {
        number: "01",
        tag: "ISOLATION",
        title: "Independent State Instances",
        description: "Calling `useToggle()` in Component A and Component B creates two completely independent state cells in React.",
        color: "purple",
      },
      {
        number: "02",
        tag: "LINTING",
        title: "ESLint Rules of Hooks",
        description: "Naming your function `useSomething` enables React's linter to guarantee hooks inside are called unconditionally at the top level.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "COMPOSABILITY",
        title: "Chaining Hooks",
        description: "You can build higher-level hooks out of smaller hooks: `useAuth` can internally use `useLocalStorage` and `useFetch`.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step extraction and invocation of custom Hooks:",
    points: [
      {
        title: "1. Encapsulate Logic",
        content: "useToggle declares local state and a helper function to invert it.",
      },
      {
        title: "2. Return Custom API",
        content: "Return [value, toggle] tuple matching useState convention.",
        codeSnippet: `return [value, toggle];`,
      },
      {
        title: "3. Component Consumes Cleanly",
        content: "Details calls const [visible, toggleVisible] = useToggle() without repeating useState boilerplate.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Assuming Custom Hooks Share Global State",
      code: `// ❌ INCORRECT ASSUMPTION: Both components will share the same count!
function ComponentA() { const [c, inc] = useCounter(); }
function ComponentB() { const [c, inc] = useCounter(); }`,
      explanation: "Calling a custom Hook creates a fresh local state for each caller. Custom hooks share logic, not state variables.",
    },
    good: {
      title: "Combine with Context for Shared State",
      code: `// ✅ Correct: Connect hook to Context if global state is required
const CounterContext = createContext();
function useSharedCounter() { return useContext(CounterContext); }`,
      explanation: "To share actual state data across multiple components, pair your custom hook with React Context.",
    },
    whyItMatters: "Recognizing state isolation prevents confusion when components unexpectedly manage independent copies of data.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Interact with two independent counter instances created from the same custom hook:",
    starterCode: `import { useState } from "react";

// Custom Hook definition
function useCounter(initial = 0, step = 1) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(c => c + step);
  const decrement = () => setCount(c => c - step);
  const reset = () => setCount(initial);

  return { count, increment, decrement, reset };
}

export default function App() {
  // Two independent instances of useCounter
  const counterA = useCounter(0, 1);
  const counterB = useCounter(100, 10);

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h3>Custom Hook: useCounter</h3>
      
      <div style={{ padding: "12px", border: "1px solid #3b82f6", borderRadius: "6px", marginBottom: "12px" }}>
        <h4>Counter A (Step 1): {counterA.count}</h4>
        <button onClick={counterA.increment} style={{ marginRight: "6px" }}>+1</button>
        <button onClick={counterA.decrement} style={{ marginRight: "6px" }}>-1</button>
        <button onClick={counterA.reset}>Reset</button>
      </div>

      <div style={{ padding: "12px", border: "1px solid #10b981", borderRadius: "6px" }}>
        <h4>Counter B (Step 10): {counterB.count}</h4>
        <button onClick={counterB.increment} style={{ marginRight: "6px" }}>+10</button>
        <button onClick={counterB.decrement} style={{ marginRight: "6px" }}>-10</button>
        <button onClick={counterB.reset}>Reset</button>
      </div>
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Reusable Stateful Logic",
        desc: "Custom Hooks package stateful logic into reusable functions across components.",
      },
      {
        title: "The 'use' Prefix",
        desc: "Always prefix custom hook names with 'use' to enforce the Rules of Hooks.",
      },
      {
        title: "Independent Memory",
        desc: "Custom Hooks share logic, not state; each caller maintains its own state instance.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why must custom Hooks begin with the prefix 'use'?",
      options: [
        "It is required by the JavaScript language specification",
        "To allow React and ESLint to identify it as a Hook and enforce the Rules of Hooks",
        "It makes the function run in a Web Worker",
        "It turns off garbage collection",
      ],
      correctIndex: 1,
      explanation: "The `use` prefix is the universal convention that enables linters and React tooling to enforce Hook rules.",
    },
  },
};
