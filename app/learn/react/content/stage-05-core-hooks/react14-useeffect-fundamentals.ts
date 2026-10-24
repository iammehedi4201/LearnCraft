import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react14UseeffectFundamentalsContent: StandardLessonContent = {
  slug: "react14-useeffect-fundamentals",
  code: "REACT-14",
  title: "useEffect: Synchronizing with External Systems",
  subtitle: "Connect React components to external systems like browser APIs, timers, and event listeners after rendering.",
  difficulty: "Difficult",
  scenario: {
    question: "A component needs to set the document page title or register a browser window event when it appears on screen. Where should this side effect run?",
    answer: "Inside `useEffect`. Effects let you run side effects after React has rendered and committed changes to the screen, without blocking the visual paint.",
  },
  interviewQuestion: {
    question: "What is useEffect used for in React?",
    answer: "useEffect synchronizes a component with systems outside React, such as browser APIs, subscriptions, network requests, or manual DOM widgets. It runs after render, and can return a cleanup function to undo subscriptions when unmounting or re-running.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "The Dependency Array", icon: "⚙️" },
    { id: "part3", label: "Step-by-Step Execution", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "When NOT to Use Effects", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "Working With Things Outside React",
    bigPicture: "React component functions should be pure: given the same props and state, they should return the same JSX without modifying outside systems. But real applications must interact with the outside world: updating document.title, setting timers, or listening to window resize events. The `useEffect` Hook is React's official escape hatch for external synchronization.",
    codeSnippet: `import { useEffect, useState } from "react";

export default function DocumentTitleCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Synchronize with the browser's document title
    document.title = \`You clicked \${count} times\`;
  }, [count]); // Only re-run when count changes

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`,
    analogy: "Think of rendering like presenting a speech. During the speech (render phase), you don't step away to file paperwork. Once you finish the speech and step offstage (commit phase), your assistant executes follow-up tasks like sending confirmation emails (the Effect).",
    breakdownTitle: "Anatomy of an Effect",
    breakdownItems: [
      {
        title: "1. Effect Callback",
        desc: "The function passed to useEffect. React executes it after the component has rendered on screen.",
      },
      {
        title: "2. Dependency Array",
        desc: "The second argument [count]. Tells React to skip running the effect if none of the listed dependencies changed since the previous render.",
      },
      {
        title: "3. Non-Blocking Render",
        desc: "Effects run asynchronously after paint, ensuring the user interface remains snappy and responsive.",
      },
    ],
  },
  part2: {
    title: "The Three Dependency Modes",
    rule: {
      title: "The Dependency Completeness Rule",
      content: "Every reactive value (props, state, or derived variables) read inside your Effect must be listed in the dependency array. Never lie to React about your dependencies.",
    },
    cards: [
      {
        number: "01",
        tag: "NO ARRAY",
        title: "useEffect(() => {})",
        description: "Runs after every single render. Rarely needed; usually causes performance issues or infinite loops if state is updated inside.",
        color: "purple",
      },
      {
        number: "02",
        tag: "EMPTY ARRAY",
        title: "useEffect(() => {}, [])",
        description: "Runs exactly once after the initial mount. Perfect for one-time initialization like reading local storage or adding global window listeners.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "WITH DEPS",
        title: "useEffect(() => {}, [prop, state])",
        description: "Runs on mount and re-runs whenever any dependency changes reference (using Object.is comparison).",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Step-by-Step Lifecycle Walkthrough",
    intro: "Execution order of rendering vs effect execution:",
    points: [
      {
        title: "1. Component Renders",
        content: "React executes the component function, calculating JSX for the Virtual DOM.",
      },
      {
        title: "2. DOM Painted",
        content: "React commits changes to the real DOM, and the browser displays the updated screen.",
      },
      {
        title: "3. Effect Callback Runs",
        content: "React asynchronously calls your useEffect function, updating external document title or browser listeners.",
        codeSnippet: `useEffect(() => {\n  document.title = \`Count: \${count}\`;\n}, [count]);`,
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Using Effects to Calculate Derived State",
      code: `// ❌ ANTI-PATTERN: Redundant state and extra re-render!
const [firstName, setFirstName] = useState("Mehedi");
const [lastName, setLastName] = useState("Hasan");
const [fullName, setFullName] = useState("");

useEffect(() => {
  setFullName(firstName + " " + lastName);
}, [firstName, lastName]);`,
      explanation: "Using an Effect to compute derived state causes an unnecessary extra render pass and can introduce state synchronization bugs.",
    },
    good: {
      title: "Derive State Directly During Render",
      code: `// ✅ Correct: Calculate directly during render! Zero effects needed.
const [firstName, setFirstName] = useState("Mehedi");
const [lastName, setLastName] = useState("Hasan");
const fullName = firstName + " " + lastName;`,
      explanation: "Computing derived values in the component body runs instantly, keeping state minimal and predictable.",
    },
    whyItMatters: "Eliminating redundant effects avoids cascading re-renders and keeps component logic easy to understand.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Increment the count to observe how useEffect synchronizes after the render commits:",
    starterCode: `import { useState, useEffect } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState([]);

  useEffect(() => {
    const time = new Date().toLocaleTimeString();
    setLog(prev => [...prev.slice(-3), \`Rendered at \${time} with count=\${count}\`]);
  }, [count]);

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h3>useEffect Execution Sandbox</h3>
      <p>Count: <strong>{count}</strong></p>
      <button onClick={() => setCount(c => c + 1)} style={{ padding: "8px 12px" }}>
        Increment Count
      </button>

      <div style={{ marginTop: "16px" }}>
        <h4>Effect Execution Log:</h4>
        <ul>
          {log.map((entry, idx) => (
            <li key={idx} style={{ fontFamily: "monospace", color: "#64748b" }}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "External Synchronization",
        desc: "useEffect is an escape hatch for synchronizing with systems outside React.",
      },
      {
        title: "Runs After Paint",
        desc: "Effects run asynchronously after React commits DOM changes and the screen is painted.",
      },
      {
        title: "Dependency Control",
        desc: "The dependency array controls re-runs: omit for every render, [] on mount, [deps] on change.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "When does the callback function passed to `useEffect(fn, [id])` run?",
      options: [
        "Before the JSX is evaluated",
        "After React renders and commits the UI to screen, only if id changed since the last render",
        "Synchronously inside the virtual DOM diffing algorithm",
        "Only on the server side",
      ],
      correctIndex: 1,
      explanation: "Effects run asynchronously after the render and commit phase when the browser has painted the screen.",
    },
  },
};
