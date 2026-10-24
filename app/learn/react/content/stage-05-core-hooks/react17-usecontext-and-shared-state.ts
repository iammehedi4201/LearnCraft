import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react17UsecontextAndSharedStateContent: StandardLessonContent = {
  slug: "react17-usecontext-and-shared-state",
  code: "REACT-17",
  title: "useContext: Sharing Global Context Without Prop Drilling",
  subtitle: "Broadcast values across deep component trees without passing props manually through intermediate components.",
  difficulty: "Moderate",
  scenario: {
    question: "Several deeply nested components need access to the current theme ('light' or 'dark'), but passing theme props through 5 intermediate layout components is messy. What should you use?",
    answer: "Use React Context (`createContext` + `useContext`). Context broadcasts the value to any descendant component in the tree without requiring intermediate components to pass props along.",
  },
  interviewQuestion: {
    question: "When should you use React Context, and what is 'prop drilling'?",
    answer: "Prop drilling is passing props through components that don't need them just to deliver data to a deeply nested child. You should use Context when multiple components at different nesting levels require access to common global state, such as active theme, user authentication, or language locale.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Provider & Consumer Model", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "Context: Teleporting Data Deep into the Tree",
    bigPicture: "Passing props is the primary way to pass data in React, but it becomes cumbersome when many components across multiple layers need the same data (like dark/light theme, current logged-in user, or localization settings). Context provides a way to share values like these without having to explicitly pass a prop through every level of the tree.",
    codeSnippet: `import { createContext, useContext, useState } from "react";

// 1. Create context with default fallback value
const ThemeContext = createContext("light");

function ThemeLabel() {
  // 3. Read context value in any descendant component
  const theme = useContext(ThemeContext);
  return <p>Current theme: <strong>{theme}</strong></p>;
}

export default function App() {
  const [theme, setTheme] = useState("dark");

  return (
    // 2. Wrap tree in Provider (Compatible with React 18 & 19)
    <ThemeContext.Provider value={theme}>
      <header>
        <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}>
          Toggle Theme
        </button>
      </header>
      <main>
        <ThemeLabel />
      </main>
    </ThemeContext.Provider>
  );
}`,
    analogy: "Think of props like passing a physical baton hand-to-hand down a relay line. Context is like a Wi-Fi router: the router broadcasts the signal to the entire house, and any device with the password (useContext) can connect directly without people passing wires between rooms.",
    breakdownTitle: "Three Steps to Using Context",
    breakdownItems: [
      {
        title: "1. createContext()",
        desc: "Creates the context object outside components, with a default fallback value if no Provider is above it.",
      },
      {
        title: "2. <ThemeContext.Provider value={...}>",
        desc: "Wraps the component tree and supplies the current value. (Note: React 19 allows <ThemeContext value={...}> directly).",
      },
      {
        title: "3. useContext(ThemeContext)",
        desc: "Called inside any descendant component to read the closest provided value.",
      },
    ],
  },
  part2: {
    title: "When NOT to Use Context",
    rule: {
      title: "The Context Restraint Rule",
      content: "Do not put all state in Context. Start with props. If passing props is only 1 or 2 levels deep, ordinary props are simpler, faster, and more explicit.",
    },
    cards: [
      {
        number: "01",
        tag: "GLOBAL STATE",
        title: "Ideal Use Cases",
        description: "Theming (dark/light mode), user authentication sessions, i18n locale translations, and routing parameters.",
        color: "purple",
      },
      {
        number: "02",
        tag: "RE-RENDERS",
        title: "Consumer Re-rendering",
        description: "Whenever the Provider's `value` changes, EVERY component that calls `useContext(MyContext)` will re-render, even if memoized with React.memo.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "COMPOSITION ALTERNATIVE",
        title: "Component Composition First",
        description: "Before creating a Context to bypass middle components, check if you can pass elements as children: `<Page layout={<UserAvatar user={user} />} />`.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step data broadcasting across descendant component trees:",
    points: [
      {
        title: "1. Create Context",
        content: "const ThemeContext = createContext('light') defines the global channel.",
      },
      {
        title: "2. Wrap with Provider",
        content: "<ThemeContext.Provider value={theme}> broadcasts the current theme to all children.",
        codeSnippet: `<ThemeContext.Provider value={theme}>\n  <Layout />\n</ThemeContext.Provider>`,
      },
      {
        title: "3. Direct Consumer Read",
        content: "Descendant calls useContext(ThemeContext) to read the closest ancestor value directly.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Passing Inline Object Literals to Context Provider",
      code: `// ❌ Performance issue: New object reference created on every App render!
<UserContext.Provider value={{ user, setUser }}>
  <Dashboard />
</UserContext.Provider>`,
      explanation: "Passing an inline object literal creates a brand-new object on every render, causing all context subscribers to re-render needlessly.",
    },
    good: {
      title: "Memoize Context Value Object",
      code: `// ✅ Optimized: Memoize object or use state setters directly
const value = useMemo(() => ({ user, setUser }), [user]);
<UserContext.Provider value={value}>
  <Dashboard />
</UserContext.Provider>`,
      explanation: "useMemo keeps the object reference stable unless `user` actually changes, skipping unnecessary consumer re-renders.",
    },
    whyItMatters: "Preventing unnecessary context re-renders keeps large application shells fast and responsive.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Toggle the theme at the top level to observe the nested consumer card update directly:",
    starterCode: `import { createContext, useContext, useState } from "react";

const ThemeContext = createContext("dark");

function ThemeCard() {
  const theme = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div style={{
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: isDark ? "#1e293b" : "#f8fafc",
      color: isDark ? "#f8fafc" : "#0f172a",
      border: "1px solid " + (isDark ? "#334155" : "#e2e8f0"),
      marginTop: "12px"
    }}>
      <h4>Nested Card Consumer</h4>
      <p>I read theme directly via <code>useContext</code>: <strong>{theme}</strong></p>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h3>React Context Demo</h3>
      <button
        onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
        style={{ padding: "8px 14px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "4px" }}
      >
        Toggle Theme
      </button>

      {/* Provider broadcasts theme to all descendants */}
      <ThemeContext.Provider value={theme}>
        <ThemeCard />
      </ThemeContext.Provider>
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Avoid Prop Drilling",
        desc: "Context allows components to share data without manual prop drilling through middle layers.",
      },
      {
        title: "Provider & Consumer",
        desc: "Use createContext() to define context, <Context.Provider> to supply data, and useContext() to read it.",
      },
      {
        title: "Reserved for Global Data",
        desc: "Context is best for genuinely global data: theming, auth user sessions, and language localization.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is 'prop drilling' in React?",
      options: [
        "A fast way to compile props in Vite",
        "Passing props through several levels of intermediate components that don't need them",
        "An error caused by circular prop references",
        "A method for validating PropTypes",
      ],
      correctIndex: 1,
      explanation: "Prop drilling refers to threading props down through layers of components purely to reach a deeply nested child.",
    },
  },
};
