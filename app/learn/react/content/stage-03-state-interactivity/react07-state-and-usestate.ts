import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react07StateAndUsestateContent: StandardLessonContent = {
  slug: "react07-state-and-usestate",
  code: "REACT-07",
  title: "What Is State? The useState Hook & Component Memory",
  subtitle: "State is data a component remembers across renders. Updating state prompts React to re-render the UI.",
  difficulty: "Moderate",
  scenario: {
    question: "A developer changes a normal JavaScript variable after clicking a button, but the text on the screen does not update. What concept is missing?",
    answer: "The changing value must be stored in state. In React, changing a regular variable does not trigger a re-render. Calling a state setter tells React to render the component again with the new value.",
  },
  interviewQuestion: {
    question: "What is state in React?",
    answer: "State is data a component remembers across renders. When state changes through its setter function, React renders the component again to display the updated UI on screen.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "State vs Regular Variables", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "State with useState",
    bigPicture: "Ordinary JavaScript variables disappear when a function finishes executing. But interactive components need memory: whether a modal is open, text typed into an input, or whether a post was liked. The `useState` Hook gives components persistent memory that triggers UI re-renders.",
    codeSnippet: `import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? "Liked ❤️" : "Like 🤍"}
    </button>
  );
}`,
    analogy: "Think of regular variables like notes written on a whiteboard that gets erased every time you leave the room. State is like writing in a permanent notebook: React keeps the notebook safe between renders and reads it back to you.",
    breakdownTitle: "How useState Works",
    breakdownItems: [
      {
        title: "Initial Value",
        desc: "useState(false) sets the initial state value only on the very first render.",
      },
      {
        title: "Array Destructuring",
        desc: "useState returns an array with exactly two elements: [currentValue, setterFunction].",
      },
      {
        title: "Setter Triggers Render",
        desc: "Calling setLiked(!liked) asks React to re-render the component with the new value.",
      },
    ],
  },
  part2: {
    title: "State vs Props vs Local Variables",
    rule: {
      title: "The State Mutation Rule",
      content: "Never modify state directly: do not write `liked = true`. Always call the setter function `setLiked(true)` so React is notified that a re-render is required.",
    },
    cards: [
      {
        number: "01",
        tag: "MEMORY",
        title: "Component-Specific State",
        description: "If you render `<LikeButton />` three times, each button has its own independent state. Clicking one does not affect the others.",
        color: "purple",
      },
      {
        number: "02",
        tag: "REACTIVITY",
        title: "Re-rendering Trigger",
        description: "Calling a setter schedules a re-render. React executes the function component again, producing updated JSX for the virtual DOM.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "INITIALIZATION",
        title: "Lazy Initialization",
        description: "For expensive initial calculations, pass a function to useState: `useState(() => computeHeavyDefault())` so it only runs once.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step state update and re-render lifecycle:",
    points: [
      {
        title: "1. Component Mounts",
        content: "useState(false) registers initial state. Component returns initial JSX showing 'Like 🤍'.",
      },
      {
        title: "2. User Interacts",
        content: "User clicks button, invoking setLiked(!liked) with true.",
      },
      {
        title: "3. React Re-renders",
        content: "React executes the component again with liked = true, displaying 'Liked ❤️' on screen.",
        codeSnippet: `const [liked, setLiked] = useState(false);\n// On next render, liked is true`,
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Mutating State Variable Directly",
      code: `// ❌ Direct mutation! React has no idea value changed
let [count, setCount] = useState(0);
function handleAdd() {
  count++;
}`,
      explanation: "Direct variable reassignment does not notify React to re-render. The displayed UI remains unchanged.",
    },
    good: {
      title: "Call State Setter Function",
      code: `// ✅ Correct: setter schedules re-render
const [count, setCount] = useState(0);
function handleAdd() {
  setCount(count + 1);
}`,
      explanation: "Always declare state with `const` and update exclusively via the setter function.",
    },
    whyItMatters: "Using setters ensures that React accurately computes virtual DOM diffs and triggers minimal DOM commits.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Click buttons to observe how independent state variables trigger clean component re-renders:",
    starterCode: `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h2>useState in Action</h2>
      <p>Current count: <strong>{count}</strong></p>
      
      <button
        onClick={() => setCount(count + 1)}
        style={{ padding: "8px 12px", marginRight: "8px" }}
      >
        Increment
      </button>

      <button
        onClick={() => setActive(!active)}
        style={{
          padding: "8px 12px",
          backgroundColor: active ? "#10b981" : "#64748b",
          color: "white",
          border: "none",
          borderRadius: "4px"
        }}
      >
        Status: {active ? "Active" : "Inactive"}
      </button>
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Component Memory",
        desc: "useState provides components with memory that survives across render cycles.",
      },
      {
        title: "Setters Trigger Renders",
        desc: "Calling a setter is the only way to notify React that an interactive state changed.",
      },
      {
        title: "Isolated Instances",
        desc: "Each rendered instance of a component has its own completely independent state.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why does changing `let count = 0; count++;` fail to update the UI in React?",
      options: [
        "Because React prevents JavaScript variables from changing",
        "Because React only renders when state setters are called or props change",
        "Because let variables are read-only in JSX",
        "Because browsers disable regular variables in modern frameworks",
      ],
      correctIndex: 1,
      explanation: "React does not track ordinary variable reassignment. Calling a state setter is what notifies React to schedule a re-render.",
    },
  },
};
