import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react15EffectCleanupAndMistakesContent: StandardLessonContent = {
  slug: "react15-effect-cleanup-and-mistakes",
  code: "REACT-15",
  title: "Effect Cleanups, Subscriptions & Common Traps",
  subtitle: "Return cleanup functions to cancel timers, remove event listeners, and prevent memory leaks.",
  difficulty: "Difficult",
  scenario: {
    question: "A component adds a scroll or resize listener but never removes it. After the component is opened and closed repeatedly, old handlers keep running in the background. How should it be fixed?",
    answer: "Return a cleanup function from `useEffect` that removes the listener: `return () => window.removeEventListener('resize', updateWidth);`. The cleanup should undo whatever the Effect set up.",
  },
  interviewQuestion: {
    question: "When exactly does the cleanup function returned by useEffect execute?",
    answer: "The cleanup function runs in two situations: 1) right before the Effect re-runs with new dependencies, to clean up the previous render's side effects, and 2) when the component completely unmounts from the screen.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "The Cleanup Lifecycle", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "Why Cleanups Are Essential",
    bigPicture: "Side effects like setInterval, WebSockets, and window event listeners don't vanish automatically when a component unmounts. If you don't clean them up, they continue running invisibly in the browser background, causing memory leaks, phantom state updates, and browser crashes.",
    codeSnippet: `import { useEffect, useState } from "react";

export default function WindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth);
    }

    // 1. Setup subscription
    window.addEventListener("resize", updateWidth);

    // 2. Return cleanup function
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []); // Run on mount, clean up on unmount

  return <p>Window width: {width}px</p>;
}`,
    analogy: "Think of borrowing books from a library. Checking out a book is the Effect setup. When you leave the city or move out (component unmounts), you must return the books (the cleanup function). If you don't, the library sends overdue notices forever.",
    breakdownTitle: "Step-by-Step Cleanup Sequence",
    breakdownItems: [
      {
        title: "1. Setup Phase",
        desc: "React runs your Effect body after the component renders, setting up the listener or timer.",
      },
      {
        title: "2. Cleanup Declaration",
        desc: "Returning a function from your Effect registers it as the official cleanup handler.",
      },
      {
        title: "3. Pre-Update Cleanup",
        desc: "If dependencies change, React executes the cleanup function with the old values BEFORE running the effect with new values.",
      },
      {
        title: "4. Final Unmount Cleanup",
        desc: "When the component is removed from the DOM, React runs the cleanup one last time to prevent leaks.",
      },
    ],
  },
  part2: {
    title: "Symmetry in Setup and Teardown",
    rule: {
      title: "The Symmetry Rule",
      content: "Whatever you set up inside an Effect must be undone symmetrically in the cleanup function: `addEventListener` paired with `removeEventListener`, `setInterval` paired with `clearInterval`, `subscribe` paired with `unsubscribe`.",
    },
    cards: [
      {
        number: "01",
        tag: "MEMORY SAFETY",
        title: "Preventing Leaks",
        description: "Without cleanups, every time a component mounts and unmounts (e.g. switching tabs), a new zombie listener remains attached to the browser.",
        color: "purple",
      },
      {
        number: "02",
        tag: "STRICT MODE",
        title: "Double Invocation in Dev",
        description: "In React StrictMode (development), React deliberately mounts, unmounts, and remounts your effects once to verify your cleanups work properly.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "UNMOUNT WARNING",
        title: "No Zombie State Updates",
        description: "Cleaning up timers prevents setState from running on components that have already been destroyed.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step setup and symmetric cleanup execution:",
    points: [
      {
        title: "1. Mounting Subscription",
        content: "Component mounts: window.addEventListener('resize', updateWidth) attaches listener to window.",
      },
      {
        title: "2. Continuous Window Listening",
        content: "When user resizes window, updateWidth triggers, updating width in state.",
        codeSnippet: `window.addEventListener("resize", updateWidth);`,
      },
      {
        title: "3. Teardown on Unmount",
        content: "When component is unmounted, returned cleanup function detaches the listener cleanly.",
        codeSnippet: `return () => window.removeEventListener("resize", updateWidth);`,
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Anonymous Function in removeEventListener",
      code: `// ❌ BUG: Passing a new arrow function creates a different function reference!
useEffect(() => {
  window.addEventListener("scroll", () => handleScroll());
  return () => window.removeEventListener("scroll", () => handleScroll());
}, []);`,
      explanation: "Browsers remove event listeners by comparing function references. Passing a new anonymous arrow function will fail to remove the listener.",
    },
    good: {
      title: "Named Function for Exact Reference",
      code: `// ✅ Correct: Name the function so removeEventListener references the exact same pointer
useEffect(() => {
  function onScroll() { handleScroll(); }
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);`,
      explanation: "Using the same function reference ensures the browser reliably removes the listener upon cleanup.",
    },
    whyItMatters: "Preventing zombie event listeners stops browser memory leaks, tab slowdowns, and phantom errors.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Mount and unmount the clock component to observe interval cleanup in action:",
    starterCode: `import { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div style={{ padding: "12px", border: "1px solid #10b981", borderRadius: "6px" }}>
      ⏰ Active Clock: <strong>{time}</strong>
    </div>
  );
}

export default function App() {
  const [showClock, setShowClock] = useState(true);

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h3>Timer Cleanup Demonstration</h3>
      <button
        onClick={() => setShowClock(!showClock)}
        style={{ marginBottom: "16px", padding: "8px 12px" }}
      >
        {showClock ? "Unmount Clock Component" : "Mount Clock Component"}
      </button>

      {showClock ? <Clock /> : <p style={{ color: "#64748b" }}>Clock unmounted. Interval cleared cleanly!</p>}
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Return Cleanup Function",
        desc: "Return a cleanup function from useEffect to undo subscriptions, timers, or browser listeners.",
      },
      {
        title: "Cleanup Timing",
        desc: "The cleanup runs right before the effect re-executes with new dependencies and when unmounting.",
      },
      {
        title: "Symmetric Teardown",
        desc: "Always pair addEventListener with removeEventListener using the exact same function reference.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why must `window.removeEventListener` receive the exact same function reference passed to `addEventListener`?",
      options: [
        "Because JavaScript checks function identity by reference equality, so anonymous functions cannot be removed",
        "Because React will crash if the names don't match",
        "Because browsers delete the window object otherwise",
        "Because removeEventListener only accepts strings",
      ],
      correctIndex: 0,
      explanation: "Browser event dispatchers locate registered listeners by matching reference equality.",
    },
  },
};
