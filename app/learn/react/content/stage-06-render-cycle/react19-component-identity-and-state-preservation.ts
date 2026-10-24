import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react19ComponentIdentityAndStatePreservationContent: StandardLessonContent = {
  slug: "react19-component-identity-and-state-preservation",
  code: "REACT-19",
  title: "Component Identity, Keys & State Reset Rules",
  subtitle: "Master the Rules of Hooks, how React preserves state by tree position, and how to force state resets with keys.",
  difficulty: "Moderate",
  scenario: {
    question: "A developer calls `useState` inside an `if (isLoggedIn)` block. Why does React throw an error or corrupt state on the next render?",
    answer: "React matches Hook state by the exact order in which Hooks are called. Calling a Hook conditionally alters the call order across renders. Move all Hooks to the top level, before any conditional returns.",
  },
  interviewQuestion: {
    question: "Why must Hooks only be called at the top level of a component, and how does React track Hook state internally?",
    answer: "React does not track Hooks by variable name. Internally, React maintains an ordered array or linked list of Hook cells for each component instance. If an `if` condition skips a Hook call, the index pointer shifts, causing React to return the wrong state to the wrong variable on subsequent renders.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "The Rules of Hooks", icon: "⚙️" },
    { id: "part3", label: "State Resetting with Keys", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "The Rules of Hooks",
    bigPicture: "Hooks like `useState`, `useEffect`, and `useContext` are JavaScript functions, but they require two strict rules: 1) Only call Hooks at the top level (never inside loops, conditions, or nested functions), and 2) Only call Hooks from React function components or Custom Hooks.",
    codeSnippet: `import { useState } from "react";

function Profile({ isLoggedIn }) {
  // 1. Call hooks at the top level on EVERY render
  const [showDetails, setShowDetails] = useState(false);

  // 2. Conditions come AFTER hooks
  if (!isLoggedIn) {
    return <p>Please log in.</p>;
  }

  return (
    <button onClick={() => setShowDetails(!showDetails)}>
      {showDetails ? "Hide details" : "Show details"}
    </button>
  );
}`,
    analogy: "Think of an airport luggage carousel. Suitcases come out in a strict sequence: Bag 1 (useState), Bag 2 (useEffect), Bag 3 (useRef). If passenger 2 doesn't show up and the luggage attendant hands Bag 3 to passenger 2, everyone gets someone else's luggage!",
    breakdownTitle: "How React Preserves State",
    breakdownItems: [
      {
        title: "Call Order Consistency",
        desc: "Because the order of Hook calls never changes, React reliably pairs each Hook call with its internal state slot.",
      },
      {
        title: "State Is Tied to Tree Position",
        desc: "React preserves state as long as you render the same component at the same position in the UI tree.",
      },
      {
        title: "Resetting State with Key",
        desc: "Giving a component a different key (e.g. <Profile key={userId} />) tells React it is a different entity, forcing a complete state reset.",
      },
    ],
  },
  part2: {
    title: "Position in the Tree vs Key",
    rule: {
      title: "The Top-Level Hook Rule",
      content: "Never call Hooks inside conditions, loops, or nested functions. Always declare Hooks at the very top of your function component before any early returns.",
    },
    cards: [
      {
        number: "01",
        tag: "HOOK CELL ORDER",
        title: "Deterministic Pointers",
        description: "React increments an internal cursor: `currentHookIndex++`. If render 1 has 3 hooks and render 2 has 2 hooks, React crashes with an invariant error.",
        color: "purple",
      },
      {
        number: "02",
        tag: "TREE POSITION",
        title: "State Follows Structure",
        description: "If a component renders at the same level under the same parent tag, React preserves its state across re-renders automatically.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "KEY RESET",
        title: "Explicit Identity with Keys",
        description: "To wipe child state (e.g. clearing form inputs when switching users), change its key: `<UserForm key={selectedUserId} />`.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step state preservation and key-based reset mechanics:",
    points: [
      {
        title: "1. Position Preservation",
        content: "If a component remains in the exact same position in the tree across renders, React preserves its state.",
      },
      {
        title: "2. Different Position Wipes State",
        content: "Moving a component to a different DOM branch destroys the instance and mounts a fresh one.",
      },
      {
        title: "3. Changing Key Forces Remount",
        content: "Changing key={userId} instructs React that this is a brand-new entity, completely resetting all internal state.",
        codeSnippet: `<ChatBox key={recipient} recipient={recipient} />`,
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Calling Hooks Conditionally",
      code: `// ❌ ERROR: Hook called after conditional return!
function BadComponent({ user }) {
  if (!user) return <p>No user</p>;
  const [theme, setTheme] = useState("dark");
  return <div>{user.name}</div>;
}`,
      explanation: "Early returns before Hook declarations cause the total number of Hooks called to vary between renders, violating React's contract.",
    },
    good: {
      title: "Declare All Hooks at Top Level",
      code: `// ✅ Correct: Declare all hooks at the top before any if statements
function GoodComponent({ user }) {
  const [theme, setTheme] = useState("dark");
  if (!user) return <p>No user</p>;
  return <div>{user.name}</div>;
}`,
      explanation: "Placing all Hooks before conditions guarantees consistent Hook execution order across every render.",
    },
    whyItMatters: "Consistent Hook ordering allows React to store state in simple, high-speed arrays without symbol lookups.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Switch the chat recipient to observe how passing a key resets internal draft state cleanly:",
    starterCode: `import { useState } from "react";

function ChatBox({ recipient }) {
  const [text, setText] = useState("");

  return (
    <div style={{ padding: "12px", border: "1px solid #3b82f6", borderRadius: "6px", marginTop: "12px" }}>
      <h4>Chat with {recipient}</h4>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type a message..."
        style={{ padding: "6px", width: "80%" }}
      />
      <p style={{ fontSize: "12px", color: "#64748b" }}>Current draft: "{text}"</p>
    </div>
  );
}

export default function App() {
  const [recipient, setRecipient] = useState("Sarah");

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h3>State Reset with Keys Demo</h3>
      <button onClick={() => setRecipient(r => r === "Sarah" ? "Alex" : "Sarah")} style={{ padding: "6px 12px" }}>
        Switch Recipient (Current: {recipient})
      </button>

      {/* Passing key={recipient} tells React to reset ChatBox state when recipient changes */}
      <ChatBox key={recipient} recipient={recipient} />
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Top-Level Hooks",
        desc: "Only call Hooks at the top level of function components or custom Hooks.",
      },
      {
        title: "Tree Position",
        desc: "React preserves component state as long as it occupies the same position in the UI tree.",
      },
      {
        title: "Forced Reset with Keys",
        desc: "Pass a changing key prop (<Form key={id} />) to cleanly reset child component state.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "How does React internally know which state variable belongs to which `useState` call?",
      options: [
        "By the name of the variable you declare",
        "By the strict order in which the Hooks are called on every render",
        "By reading source code line numbers in the browser",
        "By inspecting the HTML output",
      ],
      correctIndex: 1,
      explanation: "React relies on a deterministic call order to pair each Hook call with its internal state slot.",
    },
  },
};
