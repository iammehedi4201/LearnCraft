import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react21RaceConditionsAndCleanupContent: StandardLessonContent = {
  slug: "react21-race-conditions-and-cleanup",
  code: "REACT-21",
  title: "Race Conditions, AbortControllers & Fetch Cleanup",
  subtitle: "Prevent stale network responses from overwriting new user data using AbortController and active flags.",
  difficulty: "Difficult",
  scenario: {
    question: "A user types rapidly into a search bar: typing 're' sends Request 1, then typing 'react' sends Request 2. Request 1 takes 2 seconds while Request 2 takes 300ms. Request 1 finishes last and overwrites the search results with stale data! What is this bug and how do you fix it?",
    answer: "This is a race condition. Fix it by canceling obsolete requests in the `useEffect` cleanup function using `AbortController.abort()`, or by using an active flag (`let ignore = false; return () => { ignore = true; }`) to ignore stale responses.",
  },
  interviewQuestion: {
    question: "What is a race condition in React data fetching, and how do you resolve it?",
    answer: "A race condition occurs when multiple asynchronous operations run concurrently and complete in an unexpected order, allowing an outdated network response to overwrite fresher state. You resolve it by returning a cleanup function from `useEffect` that aborts the HTTP request via `controller.abort()` or flags the response as ignored.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Step-by-Step Race Condition", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "Stopping Stale Responses with AbortController",
    bigPicture: "Network requests do not necessarily finish in the order they were sent. When users type quickly, paginate rapidly, or toggle tabs, a component can trigger multiple API requests in sequence. Without proper cleanup, older requests can resolve after newer requests, corrupting the display with obsolete data.",
    codeSnippet: `import { useEffect, useState } from "react";

export default function UserSearch({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // 1. Create an AbortController for this effect execution
    const controller = new AbortController();

    async function search() {
      try {
        const response = await fetch(\`/api/search?q=\${query}\`, {
          signal: controller.signal // Connect signal to fetch
        });
        const data = await response.json();
        setResults(data);
      } catch (err) {
        // Abort errors are expected when canceling; ignore them!
        if (err.name !== "AbortError") {
          console.error("Search failed:", err);
        }
      }
    }

    if (query) search();

    // 2. Abort this request if query changes or component unmounts
    return () => controller.abort();
  }, [query]);

  return <ul>{results.map(r => <li key={r.id}>{r.title}</li>)}</ul>;
}`,
    analogy: "Think of placing phone orders. You call order #1 for chocolate cake, then change your mind and call order #2 for vanilla cake. If bakery #1 arrives 2 hours later after you've already enjoyed bakery #2, you don't want them replacing your vanilla cake! You cancel order #1 when placing order #2.",
    breakdownTitle: "How AbortController Works",
    breakdownItems: [
      {
        title: "1. Instantiate Controller",
        desc: "const controller = new AbortController() creates a controller whose signal can be passed to fetch.",
      },
      {
        title: "2. Signal Cancellation",
        desc: "Passing { signal: controller.signal } instructs the browser network stack to abort the HTTP socket when requested.",
      },
      {
        title: "3. Cleanup Trigger",
        desc: "When query changes, React runs the cleanup function controller.abort(), canceling the in-flight request.",
      },
      {
        title: "4. Ignore AbortError",
        desc: "The browser rejects an aborted fetch with DOMException named 'AbortError'. You catch and ignore it safely.",
      },
    ],
  },
  part2: {
    title: "The Boolean Flag vs AbortController",
    rule: {
      title: "The Active Flag Rule",
      content: "If your async operation doesn't support AbortController (e.g. third-party SDKs or Promises), use the active flag pattern: `let ignore = false; return () => { ignore = true; };` and check `if (!ignore) setState(...)` before updating.",
    },
    cards: [
      {
        number: "01",
        tag: "BANDWIDTH SAVINGS",
        title: "AbortController Advantage",
        description: "AbortController physically terminates HTTP data transfer over the network, saving user mobile data and battery life.",
        color: "purple",
      },
      {
        number: "02",
        tag: "SIMPLICITY",
        title: "The 'ignore' Boolean Flag",
        description: "A simple local boolean `let ignore = false` prevents setState from running on outdated responses even if the network transfer completes.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "DEVTOOLS",
        title: "Canceled in Network Tab",
        description: "Aborted requests appear in browser DevTools Network tab with status `(canceled)`, making verification straightforward.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step resolution of concurrent asynchronous requests:",
    points: [
      {
        title: "1. Request 1 Initiated",
        content: "User types 're', creating AbortController 1 and starting slow request.",
      },
      {
        title: "2. Request 2 Aborts Request 1",
        content: "User types 'react', triggering cleanup of Effect 1: controller1.abort() halts Request 1.",
        codeSnippet: `return () => controller.abort();`,
      },
      {
        title: "3. Clean Response Display",
        content: "Only Request 2 completes and updates state, preventing stale overwrite.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Treating AbortError as a Network Failure",
      code: `// ❌ BUG: Shows "Failed to search" red banner whenever user types quickly!
catch (err) {
  setErrorMessage("Failed to search");
}`,
      explanation: "Canceling an aborted fetch throws an `AbortError`. If you don't filter it out, the UI will report false errors on every keystroke.",
    },
    good: {
      title: "Ignore Deliberate AbortErrors",
      code: `// ✅ Correct: ignore deliberate cancellation
catch (err) {
  if (err.name === "AbortError") return;
  setErrorMessage("Failed to search");
}`,
      explanation: "Filtering out `AbortError` ensures user-initiated cancellations remain silent and seamless.",
    },
    whyItMatters: "Handling cancellations quietly provides smooth typing experiences without erratic error alerts.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Simulate race conditions and observe how cleanup flags prevent stale data overwrites:",
    starterCode: `import { useState, useEffect } from "react";

export default function App() {
  const [query, setQuery] = useState("React");
  const [result, setResult] = useState("");
  const [log, setLog] = useState([]);

  useEffect(() => {
    let ignore = false;
    const currentQuery = query;

    // Simulate variable network delay (longer for shorter queries)
    const delay = query === "React" ? 800 : 200;

    const timerId = setTimeout(() => {
      if (!ignore) {
        setResult("Results for: " + currentQuery);
        setLog(l => [...l, \`Committed "\${currentQuery}" after \${delay}ms\`]);
      } else {
        setLog(l => [...l, \`IGNORED stale response for "\${currentQuery}"\`]);
      }
    }, delay);

    return () => {
      ignore = true;
      clearTimeout(timerId);
    };
  }, [query]);

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h3>Race Condition Simulator</h3>
      <p>Search query: <strong>{query}</strong></p>
      
      <button onClick={() => setQuery("React")} style={{ marginRight: "8px", padding: "6px 12px" }}>
        Search "React" (Slow 800ms)
      </button>
      <button onClick={() => setQuery("Next.js")} style={{ padding: "6px 12px" }}>
        Search "Next.js" (Fast 200ms)
      </button>

      <div style={{ marginTop: "16px", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}>
        <p><strong>Active Result:</strong> {result || "None"}</p>
        <h4>Network Activity Log:</h4>
        <ul>
          {log.map((entry, idx) => (
            <li key={idx} style={{ fontFamily: "monospace", fontSize: "12px" }}>{entry}</li>
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
        title: "Race Condition Risks",
        desc: "Outdated responses can resolve after newer requests, corrupting state with stale data.",
      },
      {
        title: "AbortController",
        desc: "Use controller.abort() in useEffect cleanup to cancel in-flight HTTP sockets.",
      },
      {
        title: "Ignore AbortError",
        desc: "Filter out err.name === 'AbortError' to prevent false error notifications during fast typing.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is a race condition in web applications?",
      options: [
        "A competition between developers to write code faster",
        "A bug where asynchronous operations complete out of order, causing older results to overwrite newer results",
        "When the CPU temperature exceeds limits",
        "A CSS animation running at 120fps",
      ],
      correctIndex: 1,
      explanation: "A race condition occurs when asynchronous operations complete out of expected sequence, corrupting state with stale data.",
    },
  },
};
