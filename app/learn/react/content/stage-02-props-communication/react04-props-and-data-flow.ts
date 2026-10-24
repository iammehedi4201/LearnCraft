import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react04PropsAndDataFlowContent: StandardLessonContent = {
  slug: "react04-props-and-data-flow",
  code: "REACT-04",
  title: "Props & One-Way Data Flow: Passing Data Down",
  subtitle: "Props are read-only inputs passed from a parent component to configure child components cleanly.",
  difficulty: "Easy",
  scenario: {
    question: "The same card design needs to show different course titles across your app. What should you use?",
    answer: "Pass each title as a prop. This keeps the design reusable and lets each card display its own specific content.",
  },
  interviewQuestion: {
    question: "What are props in React?",
    answer: "Props are read-only values passed from a parent component to a child component. They let a component display different information while keeping its structure and design reusable.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "One-Way Data Flow", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "Props — Passing Information to Components",
    bigPicture: "Props (short for properties) are arguments passed into React components. Just like a function accepts arguments to produce different outputs, a component accepts props to render different UI. Crucially, props flow in one direction only: from parent to child.",
    codeSnippet: `function CourseCard({ title, level = "Beginner" }) {
  return (
    <article className="course-card">
      <h2>{title}</h2>
      <p>Level: {level}</p>
    </article>
  );
}

export default function App() {
  return (
    <main>
      <CourseCard title="React Basics" level="Beginner" />
      <CourseCard title="Advanced Hooks" level="Advanced" />
    </main>
  );
}`,
    analogy: "Think of props like shipping instructions or function arguments. When you call add(2, 3), you supply values. When you render <CourseCard title=\"React\" />, you pass props that tell the card what to display.",
    breakdownTitle: "How Props Work",
    breakdownItems: [
      {
        title: "Passed in Parent JSX",
        desc: "The parent specifies attributes on the JSX tag, e.g. title=\"React Basics\".",
      },
      {
        title: "Destructured in Parameters",
        desc: "The child receives a single props object, commonly destructured as ({ title, level }).",
      },
      {
        title: "Read-Only (Immutable)",
        desc: "A child component must never modify its own props. If the data must change, the parent must pass new props.",
      },
    ],
  },
  part2: {
    title: "The One-Way Data Flow Rule",
    rule: {
      title: "The Props Immutability Rule",
      content: "Never reassign props: do not write `props.title = 'New'`. In React, data flows strictly downward from parent to child. Components must be pure functions with respect to their props.",
    },
    cards: [
      {
        number: "01",
        tag: "DATA FLOW",
        title: "Top-Down / Unidirectional",
        description: "Data flows down from parent components to child components via props. This makes tracking bugs simple because you can trace data flow upwards.",
        color: "purple",
      },
      {
        number: "02",
        tag: "DESTRUCTURING",
        title: "Clean Parameter Signatures",
        description: "Destructuring `{ title, level = 'Beginner' }` directly in function parameters makes component dependencies immediately clear and supports default values.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "REUSABILITY",
        title: "Separation of Concerns",
        description: "A component with props is decoupled from hardcoded strings. It can render test data, mock data, or real production API responses identically.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step data passing from parent container to child presentation components:",
    points: [
      {
        title: "1. Parent Supplies Values",
        content: "App decides what data to pass down: <CourseCard title=\"React 18\" level=\"Beginner\" />.",
      },
      {
        title: "2. Child Receives Object",
        content: "CourseCard({ title, level }) unpacks the props object into local variables.",
      },
      {
        title: "3. Interpolation in Markup",
        content: "The child embeds the props inside JSX elements: <h2>{title}</h2>.",
        codeSnippet: `function CourseCard({ title, level }) {\n  return <h2>{title} ({level})</h2>;\n}`,
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Mutating Props Directly",
      code: `// ❌ ERROR: Cannot assign to read only property
function Counter({ count }) {
  count = count + 1;
  return <p>{count}</p>;
}`,
      explanation: "Props are read-only. Never mutate props directly. If a value needs to change in response to an action, use state or callback functions.",
    },
    good: {
      title: "Pass Callbacks to Request Changes",
      code: `// ✅ Clean: Read prop, notify parent via callback
function Counter({ count, onIncrement }) {
  return <button onClick={onIncrement}>{count}</button>;
}`,
      explanation: "Child components notify parents of requested changes via callback functions, respecting one-way data flow.",
    },
    whyItMatters: "Enforcing immutable props prevents subtle data corruption bugs where sibling components see conflicting data.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Edit props passed to CourseCard components to see how one component renders different content:",
    starterCode: `function CourseCard({ title, level, isEnrolled }) {
  return (
    <div style={{ border: "1px solid #3b82f6", borderRadius: "8px", padding: "16px", margin: "8px 0" }}>
      <h3 style={{ margin: "0 0 8px 0", color: "#60a5fa" }}>{title}</h3>
      <p style={{ margin: "0 0 8px 0" }}>Level: <strong>{level}</strong></p>
      <span style={{ fontSize: "12px", color: isEnrolled ? "#34d399" : "#94a3b8" }}>
        {isEnrolled ? "✓ Enrolled" : "Not Enrolled"}
      </span>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h2>Available Courses</h2>
      <CourseCard title="React 18 & Modern UI" level="Intermediate" isEnrolled={true} />
      <CourseCard title="TypeScript for React" level="Advanced" isEnrolled={false} />
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Read-Only Inputs",
        desc: "Props are inputs passed from parent to child components and are strictly immutable.",
      },
      {
        title: "Unidirectional Flow",
        desc: "Data flows down in one direction from parent to child, making bugs easy to trace.",
      },
      {
        title: "Destructuring & Defaults",
        desc: "Destructuring parameter objects with ES6 default values keeps components robust and clean.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Can a child component modify the props it receives from its parent?",
      options: [
        "Yes, by writing props.title = 'New'",
        "No, props are read-only and immutable",
        "Yes, but only if they are string types",
        "Only in development mode",
      ],
      correctIndex: 1,
      explanation: "Props are strictly read-only. A component must behave like a pure function with respect to its props.",
    },
  },
};
