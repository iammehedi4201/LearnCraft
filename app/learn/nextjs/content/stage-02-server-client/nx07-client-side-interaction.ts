import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx07ClientSideInteractionContent: StandardLessonContent = {
  slug: "nx07-client-side-interaction",
  code: "NX-07",
  title: "Client-Side Interaction with State and Events",
  subtitle: "Use Client Components with React state and event handlers to build responsive, interactive interfaces.",
  difficulty: "Moderate",
  scenario: {
    question: "You need a “Show answer” button that reveals text after a click. What kind of component do you need and why?",
    answer: "A Client Component, because it uses a click event and state to update the UI.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Client-Side Interaction with State and Events",
    bigPicture: "Next.js components run on the server by default. But when a component needs to respond to user actions—like clicking a button, opening a modal, typing in an input, or counting likes—it must become a Client Component. Adding the 'use client' directive allows you to use standard React hooks like useState and event handlers like onClick.",
    analogy: "A Server Component is like a printed paper restaurant menu: it is fast to hand out and easy to read, but it cannot change dynamically. A Client Component is like a touchscreen ordering kiosk: you can tap buttons, toggle menus open and closed, and the screen updates instantly in response to your fingers.",
    codeSnippet: `// app/components/ShowAnswer.tsx
// 1. Add "use client" at the very top of the file:
"use client";

import { useState } from "react";

export default function ShowAnswer() {
  // 2. Initialize local React state in the browser:
  const [visible, setVisible] = useState(false);

  // 3. Attach an onClick event listener to toggle state:
  return (
    <section>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Hide answer" : "Show answer"}
      </button>

      {/* 4. Conditionally display content based on state: */}
      {visible && <p>A Server Component runs on the server before sending HTML!</p>}
    </section>
  );
}`,
    breakdownTitle: "How This Works Step by Step",
    breakdownItems: [
      {
        title: "1. The 'use client' Directive",
        desc: "Must be placed on line 1. It creates a boundary that tells Next.js to send this component's JavaScript to the browser so interactive event listeners can run.",
      },
      {
        title: "2. Initial State with useState(false)",
        desc: "React creates a boolean state variable in the user's browser memory. It starts as false, keeping the answer paragraph hidden on first page load.",
      },
      {
        title: "3. Capturing the onClick Event",
        desc: "When the visitor clicks the button, the onClick handler fires in the browser and calls setVisible(!visible), flipping the boolean from false to true.",
      },
      {
        title: "4. Instant DOM Re-rendering",
        desc: "React notices that the state changed and immediately re-renders the component. Because visible is now true, the answer paragraph displays instantly without any network reload.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Interaction Boundary Rule",
      content: "Only add 'use client' to small interactive leaves of your component tree (like a button, search input, or modal), keeping the parent page a Server Component.",
    },
    cards: [
      {
        number: "01",
        tag: "CLIENT ONLY",
        title: "Event Handlers",
        description: "Props like onClick, onChange, and onSubmit can only be attached inside Client Components.",
        color: "purple",
      },
      {
        number: "02",
        tag: "REACT STATE",
        title: "Local State (useState)",
        description: "useState stores interactive data in browser memory that drives dynamic changes in your component UI.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "RESPONSIVE",
        title: "Instant UI Updates",
        description: "The browser updates immediately without needing a full server roundtrip for basic UI toggles and counters.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how state coordinates client-side UI:",
    points: [
      {
        title: "1. useState initialization",
        content: "useState(false) begins with the answer hidden so the initial HTML is clean, compact, and fast to display.",
      },
      {
        title: "2. Triggering state changes",
        content: "Clicking the button runs setVisible(!visible), flipping the boolean from false to true without contacting the server.",
      },
      {
        title: "3. Conditional rendering in JSX",
        content: "The expression {visible && <p>...</p>} evaluates to true, showing the answer to the user with smooth DOM patching.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Using Event Handlers Without 'use client'",
      code: `// app/ShowAnswer.tsx (Missing 'use client'!)
export default function ShowAnswer() {
  // ❌ Build error: Event handlers cannot be passed to Server Component props!
  return <button onClick={() => alert("Hi")}>Click me</button>;
}`,
      explanation: "Server Components execute on the server and cannot serialize JavaScript function references like onClick to the client.",
    },
    good: {
      title: "Adding 'use client' at the Top of the File",
      code: `"use client"; // ✅ Marks this file as an interactive Client Component
import { useState } from "react";

export default function ShowAnswer() {
  const [clicked, setClicked] = useState(false);
  return <button onClick={() => setClicked(true)}>Clicked: {String(clicked)}</button>;
}`,
      explanation: "Adding 'use client' allows event handlers and state hooks to execute smoothly in the user's browser.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore an interactive counter and toggle in a Client Component:",
    starterCode: `"use client";

import { useState } from "react";

export default function InteractiveDemo() {
  const [likes, setLikes] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
      <button onClick={() => setLikes(likes + 1)} style={{ marginRight: "1rem" }}>
        👍 Likes: {likes}
      </button>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide" : "Show"} Details
      </button>
      {showDetails && <p style={{ marginTop: "1rem", color: "#10b981" }}>State updates instantly!</p>}
    </div>
  );
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens if you attach an onClick handler in a component that lacks the 'use client' directive?",
      options: [
        "Next.js reports an error because event handlers cannot be passed or executed in Server Components",
        "Next.js silently converts the server into a browser",
        "The click executes directly on the remote database server",
        "The computer speaker beeps three times",
      ],
      correctIndex: 0,
      explanation: "Functions like onClick cannot be serialized across the network to the browser. Event handlers require the component to be a Client Component with 'use client'.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Requires 'use client'",
        desc: "Any component using React state or event handlers must declare 'use client' at the top.",
      },
      {
        title: "Local State Storage",
        desc: "useState holds interactive UI state that re-renders components on demand.",
      },
      {
        title: "Keep Components Focused",
        desc: "Keep interactive Client Components small so the rest of your page benefits from Server Component speed.",
      },
    ],
    nextLessonPreview: {
      title: "Fetching Data in a Server Component",
      desc: "Learn how Server Components can directly await fetch requests and database queries without hooks.",
    },
  },
};
