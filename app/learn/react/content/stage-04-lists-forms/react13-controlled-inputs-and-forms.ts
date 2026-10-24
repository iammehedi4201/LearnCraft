import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react13ControlledInputsAndFormsContent: StandardLessonContent = {
  slug: "react13-controlled-inputs-and-forms",
  code: "REACT-13",
  title: "Controlled Inputs & Handling User Forms",
  subtitle: "Bind form inputs to React state for real-time validation, dynamic UI, and reliable form submission.",
  difficulty: "Moderate",
  scenario: {
    question: "A form input looks correct, but its value is always empty when the user clicks submit. What should you inspect?",
    answer: "Check that `onChange` actually updates the state bound to `value={name}`, and verify that the submit handler reads from that state variable rather than querying the DOM.",
  },
  interviewQuestion: {
    question: "What is the difference between a controlled component and an uncontrolled component in React?",
    answer: "In a controlled component, the input value is dictated by React state (`value={state}`) and updated via `onChange`. React is the single source of truth. In an uncontrolled component, the DOM keeps its own internal state, and React reads the value on demand using a `ref`.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "The Controlled Input Pattern", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "Forms and Controlled Inputs",
    bigPicture: "In conventional HTML, form inputs maintain their own internal state. In React, we typically push that input value into React state. This is called a 'controlled component'. It gives you total control over user input: you can enforce uppercase, format credit cards, validate on every keystroke, and disable buttons conditionally.",
    codeSnippet: `import { useState } from "react";

export default function NameForm() {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault(); // Stop full page reload
    if (name.trim() === "") {
      alert("Name cannot be empty!");
      return;
    }
    alert(\`Hello, \${name}!\`);
    setName(""); // Clear input
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}`,
    analogy: "Think of an uncontrolled input like an independent typewriter: whatever you hit is inked on paper. A controlled input is like a teleprompter: the speaker only reads what the computer sends to the screen, and every keystroke you type sends a suggestion to the computer first.",
    breakdownTitle: "How Controlled Inputs Work",
    breakdownItems: [
      {
        title: "1. value={state}",
        desc: "The input's visible value is strictly tied to React state. It can only display what state says.",
      },
      {
        title: "2. onChange Handler",
        desc: "Fires on every keystroke. event.target.value reads what the user typed and updates state.",
      },
      {
        title: "3. event.preventDefault()",
        desc: "Stops the default browser action of reloading the entire web page upon form submission.",
      },
    ],
  },
  part2: {
    title: "The Form State Machine",
    rule: {
      title: "The PreventDefault Rule",
      content: "Always call `event.preventDefault()` inside your `onSubmit` handler. Standard HTML forms submit to the URL and refresh the page, which destroys all React state.",
    },
    cards: [
      {
        number: "01",
        tag: "SINGLE TRUTH",
        title: "State Is Truth",
        description: "Because React state holds the input value, submitting the form simply reads from that state variable — no manual DOM querying needed.",
        color: "purple",
      },
      {
        number: "02",
        tag: "VALIDATION",
        title: "Instant Feedback",
        description: "Validate inputs on the fly: disable the submit button until password criteria are met or highlight fields in red immediately.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "SECURITY",
        title: "Server-Side Validation",
        description: "Client-side checks provide a smooth user experience, but critical security and business validations must always be verified by backend APIs.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step user input cycle in controlled components:",
    points: [
      {
        title: "1. User Types Keystroke",
        content: "Browser fires onChange event containing event.target.value with the newest text.",
      },
      {
        title: "2. Handler Updates State",
        content: "setName(event.target.value) tells React to schedule a re-render with the new string.",
      },
      {
        title: "3. React Sets Input Value",
        content: "React re-renders with value={name}, rendering the updated text into the input field.",
        codeSnippet: `<input value={name} onChange={e => setName(e.target.value)} />`,
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Omitting event.preventDefault() on Form Submit",
      code: `// ❌ BUG: Browser triggers full HTTP GET/POST reload, erasing all state!
function handleSubmit(e) {
  saveData(formData);
}`,
      explanation: "Standard browser form submission reloads the page, wiping out the entire single-page React app state.",
    },
    good: {
      title: "Always Prevent Default Submission",
      code: `// ✅ Correct: Keeps SPA in memory and handles data asynchronously
function handleSubmit(e) {
  e.preventDefault();
  saveData(formData);
}`,
      explanation: "e.preventDefault() halts default browser navigation, allowing JavaScript to process the submission cleanly.",
    },
    whyItMatters: "Preventing page reloads maintains state, avoids screen flashes, and allows graceful client-side validation.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test live form inputs, category selection, and form submission:",
    starterCode: `import { useState } from "react";

export default function App() {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("frontend");
  const [submittedMessage, setSubmittedMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!courseTitle.trim()) {
      alert("Please provide a title");
      return;
    }
    setSubmittedMessage("Created: " + courseTitle + " (" + category + ")");
    setCourseTitle("");
  }

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h3>Create Course Form</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
        <label>
          Title:
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            style={{ width: "100%", padding: "6px", marginTop: "4px" }}
            placeholder="e.g. Next.js 14 Guide"
          />
        </label>

        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "100%", padding: "6px", marginTop: "4px" }}
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="devops">DevOps</option>
          </select>
        </label>

        <button type="submit" style={{ padding: "8px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "4px" }}>
          Submit Course
        </button>
      </form>

      {submittedMessage && (
        <div style={{ marginTop: "16px", padding: "8px", backgroundColor: "#dcfce7", color: "#166534", borderRadius: "4px" }}>
          ✓ {submittedMessage}
        </div>
      )}
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Controlled by React",
        desc: "In controlled components, input values are dictated by React state and updated on every keystroke.",
      },
      {
        title: "Always Prevent Default",
        desc: "Call e.preventDefault() in form onSubmit handlers to prevent full page reloads.",
      },
      {
        title: "Initial Strings",
        desc: "Always initialize string inputs with \"\" rather than null or undefined to avoid uncontrolled warnings.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why should you call `e.preventDefault()` inside form onSubmit handlers?",
      options: [
        "To speed up browser rendering by 50%",
        "To prevent the browser from reloading the page and losing all in-memory React state",
        "To validate input fields automatically",
        "To convert inputs into TypeScript types",
      ],
      correctIndex: 1,
      explanation: "Standard browser form submission triggers a full-page document reload, which wipes out all in-memory state.",
    },
  },
};
