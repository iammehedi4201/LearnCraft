import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react01WhatIsReactContent: StandardLessonContent = {
  slug: "react01-what-is-react",
  code: "REACT-01",
  title: "What Is React? The Declarative Mental Model",
  subtitle: "React is a JavaScript library for building user interfaces by splitting screens into reusable, declarative components.",
  difficulty: "Easy",
  scenario: {
    question: "You need to show the same welcome message in several places across a website. Why might you make it a component?",
    answer: "I can write the welcome message once and reuse the component. If the message changes, I can update it in one place.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "What Is React?",
    bigPicture: "React is a JavaScript library for building user interfaces. It lets you split a screen into small, reusable pieces called components. Instead of imperatively searching and updating HTML elements by hand, you describe what the screen should look like, and React updates it when needed.",
    codeSnippet: `function Welcome() {
  return <h1>Welcome to LearnCraft!</h1>;
}

export default function App() {
  return <Welcome />;
}`,
    analogy: "Think of components like LEGO blocks. Instead of molding one giant piece of plastic for an entire house, you build reusable bricks (windows, doors, walls) and snap them together.",
    breakdownTitle: "How React Works",
    breakdownItems: [
      {
        title: "Function Components",
        desc: "A component is a JavaScript function that returns JSX describing what should appear on the screen.",
      },
      {
        title: "Declarative UI",
        desc: "You describe the desired UI state for your data. React turns the component output into the user interface.",
      },
      {
        title: "Reusability",
        desc: "Write markup and logic once, then display it in multiple places without duplicating code.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use React",
    rule: {
      title: "The Declarative Rule",
      content: "Do not manually manipulate DOM elements with document.getElementById() in React. Describe what the screen looks like based on props and state, and let React update the DOM.",
    },
    cards: [
      {
        number: "01",
        tag: "CORE PRINCIPLE",
        title: "Component-Driven Design",
        description: "Split complex screens into small, isolated, and maintainable units that are easy to test and reuse.",
        color: "purple",
      },
      {
        number: "02",
        tag: "DEVELOPER EXPERIENCE",
        title: "Declarative Over Imperative",
        description: "No more fragile manual element queries. Change the data, and React recalculates and applies minimal DOM updates.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "ECOSYSTEM",
        title: "Rich Ecosystem & Community",
        description: "Supported by modern build tools like Vite and frameworks like Next.js for high-performance production apps.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step breakdown of how React turns components into visible page elements:",
    points: [
      {
        title: "1. Defining the Component",
        content: "Welcome is a function starting with a capital letter that returns JSX describing a heading element.",
        codeSnippet: `function Welcome() {\n  return <h1>Welcome to LearnCraft!</h1>;\n}`,
      },
      {
        title: "2. Using the Component",
        content: "App renders <Welcome /> using JSX tag syntax just like a standard HTML tag.",
        codeSnippet: `export default function App() {\n  return <Welcome />;\n}`,
      },
      {
        title: "3. React Renders to the DOM",
        content: "React evaluates the component tree and produces real DOM nodes on the webpage automatically.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Imperative Manual DOM Mutation",
      code: `// ❌ Fragile manual DOM queries that easily get out of sync
const title = document.getElementById("title");
title.innerText = "Welcome to LearnCraft!";
title.classList.add("header-active");`,
      explanation: "Manual DOM manipulation bypasses React's virtual tree, causing bugs and stale UI when state changes.",
    },
    good: {
      title: "Declarative Component Rendering",
      code: `// ✅ Clean declarative component
function Welcome() {
  return <h1 className="header-active">Welcome to LearnCraft!</h1>;
}

export default function App() {
  return <Welcome />;
}`,
      explanation: "The component clearly states its structure and styling in one self-contained, predictable function.",
    },
    whyItMatters: "Declarative components eliminate thousands of lines of fragile manual DOM synchronization in large applications.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Edit this React component live to customize your welcome message and see React re-render immediately:",
    starterCode: `function Welcome({ name }) {
  return (
    <div style={{ padding: "16px", borderRadius: "12px", background: "#1a1e2e", color: "#f8fafc" }}>
      <h2>Welcome to LearnCraft, {name}! 🚀</h2>
      <p>You are now learning modern React with declarative components.</p>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Welcome name="Alex" />
      <Welcome name="Taylor" />
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Component-Based UI",
        desc: "React splits interfaces into small, reusable functions that return JSX markup.",
      },
      {
        title: "Declarative Paradigm",
        desc: "You declare how the UI should look for a given set of data instead of imperatively updating DOM nodes.",
      },
      {
        title: "Single Source of Truth",
        desc: "Components keep markup and view logic together in one maintainable place.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is a component in React?",
      options: [
        "A JavaScript function that returns JSX describing what should appear on screen",
        "A special CSS class that animates HTML elements",
        "A backend database table that stores user sessions",
        "A server-side script that compiles TypeScript into machine code",
      ],
      correctIndex: 0,
      explanation: "A React component is a JavaScript function (starting with a capital letter) that returns JSX describing a portion of the user interface.",
    },
  },
};
