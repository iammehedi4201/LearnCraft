import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react20DataFetchingAndAsyncUiContent: StandardLessonContent = {
  slug: "react20-data-fetching-and-async-ui",
  code: "REACT-20",
  title: "Data Fetching: Loading, Success, Error & Empty States",
  subtitle: "Fetch backend API data cleanly inside useEffect and model UI states with loading, success, error, and empty views.",
  difficulty: "Difficult",
  scenario: {
    question: "A page stays blank with no indication of activity while data loads, and crashes or stays blank when an API request fails. What should the developer add?",
    answer: "Track explicit states: loading (boolean), error (string/null), and data (array/object). Show a loading spinner/message while waiting, render items upon success, and display a helpful error message with retry options when requests fail.",
  },
  interviewQuestion: {
    question: "What are the essential states a robust React component must handle when fetching asynchronous data?",
    answer: "A robust async component must handle four distinct UI states: 1) Loading state (initial request pending), 2) Success state with data, 3) Empty state (successful response but 0 items returned), and 4) Error state (network failure or HTTP error with user feedback).",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "State Machine for Async UI", icon: "⚙️" },
    { id: "part3", label: "Step-by-Step Walkthrough", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "Fetching Data in a React Component",
    bigPicture: "React components are synchronous by nature; they cannot be async functions that return Promises. To fetch data on the client side, we trigger an asynchronous network request inside `useEffect` after mount, and store the resulting data in `useState` to trigger a re-render once received.",
    codeSnippet: `import { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error("Could not load users.");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) return <p className="status">Loading users...</p>;
  if (error) return <p className="error">{error}</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}`,
    analogy: "Think of dining at a restaurant: You are seated (initial render). You place an order (useEffect fetch). The kitchen says 'preparing' (loading state). If the dish is ready, they serve it (success). If they ran out of ingredients, they apologize and explain (error state).",
    breakdownTitle: "Step-by-Step Async Flow",
    breakdownItems: [
      {
        title: "1. Synchronous Initial Render",
        desc: "Component renders immediately with loading=true so the user sees immediate feedback.",
      },
      {
        title: "2. Trigger Request in useEffect",
        desc: "The effect runs after the component commits to DOM, launching the async fetch.",
      },
      {
        title: "3. Check response.ok",
        desc: "fetch() does NOT reject HTTP 404 or 500 errors! You must explicitly verify response.ok.",
      },
      {
        title: "4. Update State in Finally",
        desc: "Sets data or error, and always turns loading to false in the finally block.",
      },
    ],
  },
  part2: {
    title: "The Four Async UI States",
    rule: {
      title: "The HTTP Error Check Rule",
      content: "Never assume `fetch()` throws on HTTP 404 or 500. `fetch` only rejects on complete network failure. Always check `if (!response.ok) throw new Error(...)` before parsing JSON.",
    },
    cards: [
      {
        number: "01",
        tag: "LOADING",
        title: "Immediate Feedback",
        description: "Show skeletons or spinners to reassure users that their request is progressing.",
        color: "purple",
      },
      {
        number: "02",
        tag: "SUCCESS",
        title: "Content Display",
        description: "Map over loaded arrays with unique keys to display real data.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "EMPTY & ERROR",
        title: "Edge Cases & Recovery",
        description: "Provide clear empty state copy ('No results found') and retry buttons for network errors.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Step-by-Step Implementation Walkthrough",
    intro: "Step-by-step lifecycle of async data loading:",
    points: [
      {
        title: "1. Initial Synchronous Render",
        content: "Component renders loading state immediately so user sees responsive feedback.",
      },
      {
        title: "2. Launch Async Fetch in Effect",
        content: "Effect declares and invokes async loadUsers() after DOM mount.",
        codeSnippet: `async function loadUsers() {\n  const res = await fetch('/api/users');\n  const data = await res.json();\n}`,
      },
      {
        title: "3. State Update & Success Render",
        content: "Sets data in state, sets loading to false, and renders list elements.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Making useEffect Callback Async Directly",
      code: `// ❌ ERROR: useEffect callback must return void or cleanup function, NOT a Promise!
useEffect(async () => {
  const res = await fetch("/api/data");
}, []);`,
      explanation: "An async function returns a Promise. React expects useEffect to return either undefined or a synchronous cleanup function.",
    },
    good: {
      title: "Declare Async Function Inside Effect",
      code: `// ✅ Correct: Declare async function inside or outside and invoke it
useEffect(() => {
  async function load() {
    const res = await fetch("/api/data");
  }
  load();
}, []);`,
      explanation: "Declaring the async function inside the effect allows proper async/await syntax while preserving synchronous cleanup return values.",
    },
    whyItMatters: "Proper async structure prevents memory leaks and ensures cleanup functions execute predictably.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Simulate network delay and failure to experience the async UI state transitions:",
    starterCode: `import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");

  function simulateFetch(shouldFail = false) {
    setStatus("loading");
    setTimeout(() => {
      if (shouldFail) {
        setStatus("error");
      } else {
        setData(["React 18 Basics", "TypeScript Pro", "Next.js Fullstack"]);
        setStatus("success");
      }
    }, 1200);
  }

  useEffect(() => {
    simulateFetch();
  }, []);

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h3>Async UI State Simulator</h3>
      
      <div style={{ marginBottom: "12px" }}>
        <button onClick={() => simulateFetch(false)} style={{ marginRight: "8px", padding: "6px 12px" }}>
          Simulate Success
        </button>
        <button onClick={() => simulateFetch(true)} style={{ padding: "6px 12px" }}>
          Simulate Network Failure
        </button>
      </div>

      <div style={{ padding: "16px", border: "1px solid #e2e8f0", borderRadius: "6px", minHeight: "100px" }}>
        {status === "loading" && <p style={{ color: "#3b82f6" }}>⏳ Loading courses from server...</p>}
        {status === "error" && <p style={{ color: "#dc2626" }}>❌ Failed to connect to course server.</p>}
        {status === "success" && (
          <ul>
            {data.map((course, idx) => <li key={idx}>📘 {course}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Async in useEffect",
        desc: "Components render synchronously; trigger async requests in useEffect after mount.",
      },
      {
        title: "Four UI States",
        desc: "Always model Loading, Success, Empty, and Error states explicitly.",
      },
      {
        title: "Verify response.ok",
        desc: "Always check response.ok before parsing JSON since fetch() resolves HTTP errors.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why does `fetch('/bad-url')` returning a 404 NOT automatically trigger a catch block?",
      options: [
        "Because 404 is considered a success in JavaScript",
        "Because fetch() only rejects on complete network failure; HTTP status codes resolve normally",
        "Because React blocks 404 errors",
        "Because catch blocks only handle syntax errors",
      ],
      correctIndex: 1,
      explanation: "In the browser fetch API, HTTP error statuses still resolve the Promise. You must manually verify `response.ok`.",
    },
  },
};
