import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx07ClientSideInteractionContent: StandardLessonContent = {
  slug: "nx07-client-side-interaction",
  code: "NX-07",
  title: "Client-Side Interaction with State and Events",
  subtitle: "Use Client Components with React state and event handlers to build responsive, interactive interfaces.",
  difficulty: "Moderate",
  scenario: {
    question: "You need a 'Show answer' button that reveals text after a click. What kind of component do you need and why?",
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
    bigPicture: "Use a Client Component when a part of the page must respond to user actions. React state stores a value that can change and update the UI in response to clicks, keypresses, or form inputs.",
    codeSnippet: `"use client";

import { useState } from "react";

export default function ShowAnswer() {
  const [visible, setVisible] = useState(false);

  return (
    <section>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Hide answer" : "Show answer"}
      </button>
      {visible && <p>A Server Component runs on the server.</p>}
    </section>
  );
}`,
    breakdownTitle: "Interaction Lifecycle",
    breakdownItems: [
      {
        title: "Initial State Definition",
        desc: "useState(false) sets the initial value in browser memory when the component mounts.",
      },
      {
        title: "Handling the Event",
        desc: "The onClick callback executes in the user's browser whenever the button is pressed.",
      },
      {
        title: "Re-rendering the UI",
        desc: "Calling setVisible triggers React to re-render the component with the updated state.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "State and Event Rule",
      content: "Whenever a user gesture must immediately update DOM state or toggle visibility, use a Client Component with useState.",
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
        title: "Local State",
        description: "useState stores interactive data that drives dynamic changes in the component's rendered output.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "RESPONSIVE",
        title: "Instant Feedback",
        description: "The browser updates immediately without needing a full server roundtrip for basic UI toggles.",
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
        content: "useState(false) begins with the answer hidden so the initial HTML is clean and compact.",
      },
      {
        title: "2. Triggering state changes",
        content: "Clicking the button runs setVisible(!visible), flipping the boolean from false to true.",
      },
      {
        title: "3. Conditional rendering",
        content: "The expression {visible && <p>...</p>} evaluates to true, showing the answer to the user.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Using Event Handlers in a Server Component",
      code: `// app/ShowAnswer.tsx (No 'use client')
export default function ShowAnswer() {
  // ERROR: Event handlers cannot be passed to Client Component props
  return <button onClick={() => alert("Hi")}>Click</button>;
}`,
      explanation: "Server Components execute on the server and cannot serialize JavaScript function references like onClick to the client.",
    },
    good: {
      title: "Adding the 'use client' Directive",
      code: `"use client"; // Marks this file as a Client Component

export default function ShowAnswer() {
  return <button onClick={() => alert("Hi")}>Click</button>;
}`,
      explanation: "Adding 'use client' at the top of the file allows event handlers and state hooks to execute in the browser.",
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
