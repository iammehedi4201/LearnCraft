import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react08EventHandlingAndUpdatesContent: StandardLessonContent = {
  slug: "react08-event-handling-and-updates",
  code: "REACT-08",
  title: "Why State Updates Can Feel Delayed & Updater Functions",
  subtitle: "Each render sees a snapshot of state. Learn how batching works and when to use functional updates.",
  difficulty: "Difficult",
  scenario: {
    question: "A developer calls setCount(count + 1) three times in one click handler, expecting the count to increase by three. Why might it increase only by one, and how can they fix it?",
    answer: "Each call uses the same snapshot of count from the current render. To fix this, use the functional updater form: setCount(current => current + 1) for each call, so React calculates each step from the latest queued value.",
  },
  interviewQuestion: {
    question: "Why doesn't a state variable change immediately after calling its setter?",
    answer: "A state variable belongs to the current render snapshot. Calling the setter schedules a future render with the new value; it does not mutate or replace the variable in the currently executing function execution.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Step-by-Step Snapshot Walkthrough", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "State as a Snapshot",
    bigPicture: "When React renders a component, it takes a 'snapshot' of the state at that exact moment. Inside an event handler, state variables are fixed constants representing that snapshot. Calling a setter requests a new render for the future; it does not change the variable in the running code.",
    codeSnippet: `import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log(count); // Still prints 0!
  }

  return <button onClick={handleClick}>Count: {count}</button>;
}`,
    analogy: "Think of an event handler like a printed photograph. Even if you order a new photo of yourself wearing a hat (calling setState), the printed photo currently in your hands doesn't magically sprout a hat.",
    breakdownTitle: "The Step-by-Step Execution Sequence",
    breakdownItems: [
      {
        title: "1. Current Snapshot (count = 0)",
        desc: "During this render, count is 0 everywhere inside the Counter function, including inside handleClick.",
      },
      {
        title: "2. Request Render (setCount(0 + 1))",
        desc: "React queues a request to re-render Counter with state value 1.",
      },
      {
        title: "3. Console.log(count)",
        desc: "The variable count in this running function is still 0, so console.log prints 0.",
      },
      {
        title: "4. Next Render Executes",
        desc: "React finishes the event, executes Counter() anew with count = 1, and updates the DOM.",
      },
    ],
  },
  part2: {
    title: "The Functional Updater Pattern",
    rule: {
      title: "The Updater Function Rule",
      content: "Whenever your new state depends directly on the previous state and you perform multiple updates or asynchronous reads, pass an updater function: `setCount(prev => prev + 1)` instead of `setCount(count + 1)`.",
    },
    cards: [
      {
        number: "01",
        tag: "SNAPSHOT",
        title: "Render Snapshot Model",
        description: "State values are frozen constants for the duration of a single render. They never change mid-execution of an event handler.",
        color: "purple",
      },
      {
        number: "02",
        tag: "BATCHING",
        title: "Automatic Batching",
        description: "React batches multiple state updates within the same browser event into a single re-render for maximum UI performance.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "UPDATER QUEUE",
        title: "Queue Processing",
        description: "Passing `prev => prev + 1` pushes a calculation function into React's update queue, guaranteeing calculations run against latest queued values.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step resolution of queued state updates:",
    points: [
      {
        title: "1. Render Snapshot",
        content: "On render 1, count is 0. All event handler closures reference count as 0.",
      },
      {
        title: "2. Queuing Functional Updaters",
        content: "setCount(c => c + 1) queues a function: (pendingState) => pendingState + 1.",
        codeSnippet: `setCount(c => c + 1);\nsetCount(c => c + 1);\nsetCount(c => c + 1);`,
      },
      {
        title: "3. Queue Evaluation",
        content: "React pipes pending state: 0 -> 1 -> 2 -> 3, committing 3 on next render.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Triple Direct Setter Calls",
      code: `// ❌ BUG: All three calls use count = 0 from current render snapshot!
function addThree() {
  setCount(count + 1); // 0 + 1 = 1
  setCount(count + 1); // 0 + 1 = 1
  setCount(count + 1); // 0 + 1 = 1 (Result: 1)
}`,
      explanation: "Without updaters, all three calls evaluate count + 1 using the stale render snapshot value 0.",
    },
    good: {
      title: "Use Functional Updater Queue",
      code: `// ✅ Correct: Each updater receives the pending state from the previous updater
function addThree() {
  setCount(c => c + 1); // 0 -> 1
  setCount(c => c + 1); // 1 -> 2
  setCount(c => c + 1); // 2 -> 3 (Result: 3)
}`,
      explanation: "Functional updaters ensure each queued operation receives the latest calculated intermediate state.",
    },
    whyItMatters: "Understanding the snapshot model prevents stale closure bugs in timers, intervals, and rapid event triggers.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Compare direct state setting vs functional updates in real time:",
    starterCode: `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  function handleDirectAdd() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  function handleUpdaterAdd() {
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
  }

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h2>State Snapshot Demo</h2>
      <p style={{ fontSize: "20px" }}>Count: <strong>{count}</strong></p>
      
      <button onClick={handleDirectAdd} style={{ padding: "8px 12px", marginRight: "8px" }}>
        Direct: setCount(count + 1) x 3
      </button>

      <button onClick={handleUpdaterAdd} style={{ padding: "8px 12px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "4px" }}>
        Updater: setCount(c =&gt; c + 1) x 3
      </button>
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "State Snapshots",
        desc: "State inside an event handler is a constant snapshot representing the current render.",
      },
      {
        title: "Batching",
        desc: "React batches multiple updates inside event handlers to avoid unnecessary intermediate renders.",
      },
      {
        title: "Functional Updates",
        desc: "Use setCount(c => c + 1) when the next state value depends on the previous state.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "If count is 0 and you run `setCount(count + 1); console.log(count);`, what prints in the console?",
      options: [
        "1",
        "0",
        "undefined",
        "NaN",
      ],
      correctIndex: 1,
      explanation: "0 prints because the count variable in the current function execution is a fixed snapshot of the current render.",
    },
  },
};
