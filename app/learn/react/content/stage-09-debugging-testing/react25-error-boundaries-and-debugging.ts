import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react25ErrorBoundariesAndDebuggingContent: StandardLessonContent = {
  slug: "react25-error-boundaries-and-debugging",
  code: "REACT-25",
  title: "Error Boundaries, React DevTools & Debugging Common Bugs",
  subtitle: "Catch rendering crashes gracefully with Error Boundaries and master the 5-step React debugging checklist.",
  difficulty: "Moderate",
  scenario: {
    question: "Clicking a button does not change anything on the screen. What should you check first?",
    answer: "Check the browser console for JavaScript errors, confirm that the click handler is attached and running (e.g. console.log), and verify that it updates the right state variable using its setter function. Then test the behavior again.",
  },
  interviewQuestion: {
    question: "What is an Error Boundary in React, and what kinds of errors does it NOT catch?",
    answer: "An Error Boundary is a React component that catches JavaScript errors anywhere in its child component tree, logs the error, and displays a fallback UI instead of crashing the entire white-screen app. It catches render and lifecycle errors, but does NOT catch errors inside event handlers, asynchronous code (like setTimeout or fetch), or server-side rendering.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "The 5-Step Debugging Checklist", icon: "⚙️" },
    { id: "part3", label: "Error Boundary Implementation", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "Debugging & Error Resilience in React",
    bigPicture: "In React, an unhandled JavaScript error inside a component's render function unmounts the entire component tree, leaving users with a blank white screen. Error Boundaries catch these runtime rendering crashes and display graceful fallback UI. Combined with React DevTools, they give you professional debugging power.",
    codeSnippet: `import React from "react";

// Error Boundary must be a class component (or use a library wrapper)
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows fallback UI
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to an error reporting service
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h3>Something went wrong.</h3>
          <p>{this.state.errorMessage}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}`,
    analogy: "Think of an electrical circuit breaker in your home. If a toaster in the kitchen shorts out (a component crashes), the circuit breaker trips for only the kitchen outlet. The rest of the house stays lit, rather than blacking out the entire city block.",
    breakdownTitle: "The 5-Step React Debugging Checklist",
    breakdownItems: [
      {
        title: "1. Reproduce the Issue",
        desc: "Identify the exact user action (clicks, inputs, query changes) that triggers the unexpected behavior.",
      },
      {
        title: "2. Read the Console & Terminal",
        desc: "Check browser DevTools console for warnings like missing keys, invalid hooks, or undefined properties.",
      },
      {
        title: "3. Inspect Props & State in DevTools",
        desc: "Open the React DevTools Components tab. Click the component to inspect its current props and state in real time.",
      },
      {
        title: "4. Check Event Handlers & Conditions",
        desc: "Confirm that callbacks receive expected arguments, preventDefault() is called, and conditional checks match reality.",
      },
      {
        title: "5. Make One Focused Change",
        desc: "Change one variable or condition at a time, test the result, and verify before moving forward.",
      },
    ],
  },
  part2: {
    title: "React DevTools Mastery",
    rule: {
      title: "The Isolated Failure Rule",
      content: "Wrap major independent sections of your application (e.g. Sidebar, CourseFeed, CommentsPanel) in separate Error Boundaries so a crash in comments never crashes the entire app.",
    },
    cards: [
      {
        number: "01",
        tag: "COMPONENTS TAB",
        title: "Tree Inspection",
        description: "Browse the live virtual component hierarchy, inspect rendered hooks, and edit state directly to test edge cases.",
        color: "purple",
      },
      {
        number: "02",
        tag: "FALLBACK UI",
        title: "Graceful Degradation",
        description: "Show user-friendly error notifications with retry buttons rather than letting users stare at a blank screen.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "LOGGING SERVICES",
        title: "Production Telemetry",
        description: "Use `componentDidCatch` to send stack traces and component stack frames to services like Sentry or Datadog.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step error boundary lifecycle and recovery:",
    points: [
      {
        title: "1. Child Throws Render Error",
        content: "A render error occurs inside a deeply nested child widget.",
      },
      {
        title: "2. getDerivedStateFromError Catches",
        content: "The nearest parent Error Boundary intercepts the crash and sets hasError: true.",
        codeSnippet: `static getDerivedStateFromError(error) {\n  return { hasError: true, errorMessage: error.message };\n}`,
      },
      {
        title: "3. Fallback Rendered",
        content: "Error boundary renders clean fallback UI while neighboring tree branches remain interactive.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Expecting Error Boundaries to Catch Async Errors",
      code: `// ❌ INCORRECT: Error Boundary cannot catch async fetch errors!
function BadWidget() {
  function load() {
    fetch("/bad").then(r => r.json());
  }
}`,
      explanation: "Error Boundaries only catch errors thrown during rendering and lifecycle methods, not inside async Promises or event handlers.",
    },
    good: {
      title: "Handle Async Failures with Try/Catch & State",
      code: `// ✅ Correct: Catch async errors and store in state
async function load() {
  try {
    const res = await fetch("/data");
    const json = await res.json();
    setData(json);
  } catch (err) {
    setError(err.message);
  }
}`,
      explanation: "Use try/catch and error state variables to manage asynchronous network failures.",
    },
    whyItMatters: "Distinguishing render errors from async errors ensures robust error reporting across all application layers.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Trigger simulated errors to observe how error boundaries preserve UI stability:",
    starterCode: `import { useState } from "react";

function BuggyCounter() {
  const [count, setCount] = useState(0);

  if (count === 5) {
    throw new Error("Simulated component crash at count 5!");
  }

  return (
    <div style={{ padding: "12px", border: "1px solid #3b82f6", borderRadius: "6px" }}>
      <p>Safe Count: <strong>{count}</strong> (Will crash at 5)</p>
      <button onClick={() => setCount(c => c + 1)} style={{ padding: "6px 12px" }}>
        Increment Count
      </button>
    </div>
  );
}

export default function App() {
  const [hasError, setHasError] = useState(false);
  const [errorText, setErrorText] = useState("");

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h3>Error Boundary Concept Demo</h3>
      <p>Click increment until count reaches 5 to observe how errors are handled safely.</p>

      {hasError ? (
        <div style={{ padding: "16px", backgroundColor: "#fee2e2", color: "#991b1b", borderRadius: "6px" }}>
          <h4>⚠️ Component Caught Error</h4>
          <p>{errorText}</p>
          <button onClick={() => setHasError(false)} style={{ padding: "6px 12px" }}>
            Reset &amp; Try Again
          </button>
        </div>
      ) : (
        <BuggyCounter />
      )}
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "5-Step Checklist",
        desc: "Reproduce, Read logs, Inspect DevTools, Check handlers, Test focused change.",
      },
      {
        title: "Graceful Fallbacks",
        desc: "Error Boundaries prevent rendering crashes from blanking out the whole screen.",
      },
      {
        title: "Try/Catch for Handlers",
        desc: "Error boundaries do NOT catch errors in event handlers or async promises; use try/catch for those.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which of the following errors is an Error Boundary GUARANTEED to catch?",
      options: [
        "An error thrown inside a button's onClick handler",
        "An error thrown during a component's render execution",
        "A network timeout in fetch()",
        "A syntax error in server code",
      ],
      correctIndex: 1,
      explanation: "Error Boundaries catch errors thrown during rendering, in lifecycle methods, and in constructors of the tree below them.",
    },
  },
};
