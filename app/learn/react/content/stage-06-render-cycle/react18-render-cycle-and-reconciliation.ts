import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react18RenderCycleAndReconciliationContent: StandardLessonContent = {
  slug: "react18-render-cycle-and-reconciliation",
  code: "REACT-18",
  title: "The Render Cycle: Trigger, Render, Commit & Virtual DOM",
  subtitle: "Understand the three-stage pipeline React uses to transform state updates into high-performance DOM commits.",
  difficulty: "Moderate",
  scenario: {
    question: "A component increments an outside variable or mutates global state during its render execution. In development mode, the counter jumps by 2 or more unexpectedly. What is wrong?",
    answer: "Rendering must be a pure calculation with no side effects. React may invoke render functions multiple times (e.g. StrictMode in development) to detect side effects. Keep rendering focused purely on returning JSX from props and state.",
  },
  interviewQuestion: {
    question: "Explain the three phases of React's rendering lifecycle (Trigger, Render, Commit).",
    answer: "1. Trigger: An event occurs (initial mount or state setter call) requesting a render. 2. Render: React calls your component functions to determine what JSX should appear (pure calculation, diffing the virtual DOM). 3. Commit: React applies only the minimal necessary changes to the real browser DOM, followed by browser paint.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "The Three Phases", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "Keeping Components Predictable & Pure",
    bigPicture: "Before your components are displayed on the screen, they must be rendered by React. Understanding this pipeline helps you reason about performance, avoid infinite loops, and understand why React enforces component purity. A component should behave like a pure mathematical formula: same props and state in -> same JSX UI out.",
    codeSnippet: `// Pure component: Predictable and side-effect free
function CourseTitle({ title }) {
  return <h2 className="title">{title}</h2>;
}

export default function App() {
  return <CourseTitle title="React 18 Architecture" />;
}`,
    analogy: "Imagine a restaurant: 1) Trigger: Customer places an order. 2) Render: The chef prepares the recipe in the kitchen (pure calculation). 3) Commit: The waiter delivers the plate to the table (touching the real world). The kitchen recipe doesn't alter customer tables until served.",
    breakdownTitle: "The Three Pipeline Steps",
    breakdownItems: [
      {
        title: "Step 1: Triggering a Render",
        desc: "Happens on initial mount (<App />) or when a state setter (setCount) or context change requests an update.",
      },
      {
        title: "Step 2: Rendering the Component",
        desc: "React invokes your component function. It compares (diffs) the newly returned virtual JSX elements against the previous virtual tree.",
      },
      {
        title: "Step 3: Committing to the DOM",
        desc: "React modifies only the DOM nodes that actually changed. If the output is identical, React skips touching the real DOM completely.",
      },
    ],
  },
  part2: {
    title: "The Virtual DOM & Reconciliation",
    rule: {
      title: "The Render Purity Rule",
      content: "Component rendering must be pure: same inputs must always return the same JSX. Never mutate preexisting variables, DOM nodes, or external objects during render.",
    },
    cards: [
      {
        number: "01",
        tag: "VIRTUAL DOM",
        title: "Lightweight JS Tree",
        description: "The virtual DOM is a tree of lightweight JavaScript objects describing what the UI should look like, avoiding slow direct DOM reads.",
        color: "purple",
      },
      {
        number: "02",
        tag: "RECONCILIATION",
        title: "Diffing Algorithm",
        description: "React compares the old and new virtual trees using heuristics (component type and keys) to compute minimal mutation patches.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "MINIMAL COMMIT",
        title: "Targeted DOM Mutation",
        description: "If an <h1> changed text but 100 neighboring elements stayed the same, React updates only the <h1> textContent, preserving input focus and scroll positions.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step diffing and DOM commit lifecycle:",
    points: [
      {
        title: "1. Trigger Render",
        content: "State setter or prop change triggers React to schedule a component render.",
      },
      {
        title: "2. Diff Virtual Trees",
        content: "React executes the component and compares the new virtual DOM tree against the old one.",
        codeSnippet: `// Diffing detects that only the textContent of span changed`,
      },
      {
        title: "3. Commit Minimal Patch",
        content: "React commits only changed nodes to the real browser DOM, preserving input focus and scroll position.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Side Effects During Render",
      code: `// ❌ BUG: Mutating outside variable during render!
let globalCount = 0;
function BadCard() {
  globalCount++;
  return <div>Render count: {globalCount}</div>;
}`,
      explanation: "Modifying variables outside the component during render produces erratic bugs, especially with concurrent rendering and Fast Refresh.",
    },
    good: {
      title: "Pure Render with State/Effects",
      code: `// ✅ Correct: Use state or useEffect for side effects
function GoodCard() {
  const [count, setCount] = useState(0);
  return <div>Render count: {count}</div>;
}`,
      explanation: "Keeping the render calculation pure ensures the component behaves predictably across all renders.",
    },
    whyItMatters: "Pure components allow React to pause, resume, and abort rendering work concurrently without breaking UI consistency.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Type into the input and increment the counter to see minimal targeted DOM updates in action:",
    starterCode: `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [otherText, setOtherText] = useState("");

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h3>Reconciliation &amp; Minimal DOM Commits</h3>
      
      <div style={{ padding: "12px", border: "1px solid #94a3b8", borderRadius: "6px", marginBottom: "12px" }}>
        <h4>Counter (Updates this node only):</h4>
        <p style={{ fontSize: "24px", color: "#3b82f6", margin: "4px 0" }}>{count}</p>
        <button onClick={() => setCount(c => c + 1)} style={{ padding: "6px 12px" }}>+1 Increment</button>
      </div>

      <div style={{ padding: "12px", border: "1px solid #94a3b8", borderRadius: "6px" }}>
        <h4>Static Sibling Form:</h4>
        <input
          value={otherText}
          onChange={e => setOtherText(e.target.value)}
          placeholder="Type here..."
          style={{ padding: "6px" }}
        />
        <p style={{ color: "#64748b" }}>Notice your cursor focus is never lost when the counter updates!</p>
      </div>
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Three Pipeline Phases",
        desc: "The render pipeline has three phases: Trigger -> Render -> Commit.",
      },
      {
        title: "Pure Calculations",
        desc: "Rendering is pure calculation: same inputs must return the same JSX without side effects.",
      },
      {
        title: "Minimal DOM Commits",
        desc: "React only commits changes to DOM nodes that actually changed, preserving user focus and scroll.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which of the following is permitted inside a pure component render function?",
      options: [
        "Modifying a global variable",
        "Calling fetch() to make a network request",
        "Computing JSX based on received props and current state",
        "Calling document.getElementById().appendChild()",
      ],
      correctIndex: 2,
      explanation: "Rendering must be a pure function that calculates JSX output based strictly on props and state.",
    },
  },
};
