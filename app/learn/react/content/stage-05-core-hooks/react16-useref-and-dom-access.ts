import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react16UserefAndDomAccessContent: StandardLessonContent = {
  slug: "react16-useref-and-dom-access",
  code: "REACT-16",
  title: "useRef: Retaining Values Without Re-rendering & DOM Access",
  subtitle: "Store mutable values that persist across renders without triggering re-renders, and access DOM nodes directly.",
  difficulty: "Moderate",
  scenario: {
    question: "You want to automatically focus an input field or scroll a chat window after a button click. Should you store the DOM element in state?",
    answer: "No. Use `useRef` to attach a reference to the DOM element (`ref={inputRef}`) and call native browser methods like `inputRef.current.focus()` without causing unnecessary re-renders.",
  },
  interviewQuestion: {
    question: "What is the primary difference between `useState` and `useRef` in React?",
    answer: "Updating `useState` notifies React to schedule a re-render so new data appears on screen. Mutating `ref.current` stores data between renders but does NOT trigger a re-render. Use state for values that affect what is rendered; use refs for DOM access or values that don't change visual output (like timer IDs).",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "State vs Ref Comparison", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "Remembering Values Without Re-rendering",
    bigPicture: "When you want a component to remember some information, but you don't want that information to trigger new renders, you can use a ref. Additionally, refs are React's primary escape hatch for directly interacting with underlying real DOM nodes (like managing focus, measuring dimensions, or playing audio).",
    codeSnippet: `import { useRef } from "react";

export default function SearchBox() {
  const inputRef = useRef(null);

  function focusInput() {
    // Directly focus the input element via the ref
    inputRef.current?.focus();
  }

  return (
    <div className="search-box">
      <input ref={inputRef} placeholder="Search courses..." />
      <button onClick={focusInput}>Focus search</button>
    </div>
  );
}`,
    analogy: "Think of a ref like a secret pocket in your coat. You can slip a notebook or a key into that pocket (ref.current) and change it whenever you want. Looking into your pocket doesn't change your outward appearance or make you change your clothes (no re-render).",
    breakdownTitle: "How useRef Works",
    breakdownItems: [
      {
        title: "1. Persistent Plain Object",
        desc: "useRef(initialValue) returns a plain JavaScript object: { current: initialValue } that persists across renders.",
      },
      {
        title: "2. Mutating .current",
        desc: "You can change ref.current anytime. React will not re-render the component when you modify it.",
      },
      {
        title: "3. Attaching to JSX elements",
        desc: "Passing ref={inputRef} instructs React to place the actual DOM element into inputRef.current once mounted.",
      },
    ],
  },
  part2: {
    title: "When to Use Refs vs State",
    rule: {
      title: "The Render Purity Rule for Refs",
      content: "Do not read or write `ref.current` during the render phase (outside of event handlers or `useEffect`). Reading or writing mutable refs during render breaks React's purity and concurrent rendering guarantees.",
    },
    cards: [
      {
        number: "01",
        tag: "DOM ACCESS",
        title: "Imperative DOM Operations",
        description: "Focusing inputs, measuring element scroll heights, playing HTML5 video/audio, and integrating non-React canvas libraries.",
        color: "purple",
      },
      {
        number: "02",
        tag: "PERSISTENT TIMERS",
        title: "Storing Timer IDs",
        description: "Holding `setInterval` or `setTimeout` handles so you can clear them across different event handlers or during cleanup.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PREVIOUS VALUES",
        title: "Tracking Previous Props/State",
        description: "Storing the previous value of a prop or state variable to perform delta calculations when new renders happen.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step imperative DOM interaction via useRef:",
    points: [
      {
        title: "1. Declare Ref Hook",
        content: "const inputRef = useRef(null) initializes the ref container.",
      },
      {
        title: "2. Attach to JSX Node",
        content: "Passing ref={inputRef} instructs React to assign the real DOM input to inputRef.current after commit.",
        codeSnippet: `<input ref={inputRef} placeholder="Search..." />`,
      },
      {
        title: "3. Execute Native DOM Methods",
        content: "Event handler calls inputRef.current.focus() to move keyboard focus imperatively.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Reading or Writing ref.current During Render",
      code: `// ❌ BUG: Modifying or displaying ref directly in JSX render output!
function BadComponent() {
  const countRef = useRef(0);
  countRef.current++;
  return <p>{countRef.current}</p>;
}`,
      explanation: "Refs are not reactive. Updating ref.current does not trigger a re-render, leading to stale or erratic UI output.",
    },
    good: {
      title: "Use State for Rendered Values",
      code: `// ✅ Correct: Use state for values rendered to screen
function GoodComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`,
      explanation: "Values displayed on screen belong in useState. Use refs only for values not involved in visual rendering.",
    },
    whyItMatters: "Keeping refs out of the render calculation guarantees consistent UI snapshots across React concurrent features.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test silent ref mutations versus native DOM element focusing:",
    starterCode: `import { useRef, useState } from "react";

export default function App() {
  const inputRef = useRef(null);
  const clickCountRef = useRef(0);
  const [, setForceUpdate] = useState(0);

  function handleFocus() {
    inputRef.current?.focus();
  }

  function handleSilentIncrement() {
    clickCountRef.current++;
    alert("clickCountRef is now: " + clickCountRef.current + " (Notice screen didn't re-render!)");
  }

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h3>useRef Playground</h3>
      
      <div style={{ marginBottom: "16px" }}>
        <input ref={inputRef} placeholder="Focus me with the button..." style={{ padding: "6px" }} />
        <button onClick={handleFocus} style={{ marginLeft: "8px", padding: "6px 12px" }}>
          Focus Input
        </button>
      </div>

      <div style={{ padding: "12px", border: "1px dashed #cbd5e1", borderRadius: "6px" }}>
        <p>Silent clicks stored in ref: <strong>{clickCountRef.current}</strong></p>
        <button onClick={handleSilentIncrement} style={{ marginRight: "8px", padding: "6px 12px" }}>
          Click Without Re-rendering
        </button>
        <button onClick={() => setForceUpdate(n => n + 1)} style={{ padding: "6px 12px" }}>
          Force Render to Show Ref Value
        </button>
      </div>
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Persistent Object",
        desc: "useRef returns { current: value } that persists across renders without triggering re-renders.",
      },
      {
        title: "Direct DOM Access",
        desc: "Attach ref={myRef} to access native DOM nodes for focus, measurements, and media control.",
      },
      {
        title: "Keep Render Pure",
        desc: "Do not read or write ref.current during rendering; access it in event handlers or useEffect.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens when you update `myRef.current = 'new value'`?",
      options: [
        "React immediately re-renders the component",
        "The value is stored in memory, but no re-render is triggered",
        "React triggers a DOM crash",
        "The component unmounts",
      ],
      correctIndex: 1,
      explanation: "Unlike useState setters, mutating ref.current does not notify React to re-render the component.",
    },
  },
};
