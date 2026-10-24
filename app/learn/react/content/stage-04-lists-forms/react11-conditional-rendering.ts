import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react11ConditionalRenderingContent: StandardLessonContent = {
  slug: "react11-conditional-rendering",
  code: "REACT-11",
  title: "Conditional Rendering: Ternaries, && & Guard Clauses",
  subtitle: "Render different UI elements based on state using if statements, ternary operators, and logical AND.",
  difficulty: "Easy",
  scenario: {
    question: "A component needs to show 'Welcome back!' when a user is logged in, and 'Please sign in.' when logged out. What should you use?",
    answer: "Use conditional rendering: either an if statement returning early, or a ternary operator inside JSX: `{isLoggedIn ? <WelcomeBack /> : <SignIn />}`.",
  },
  interviewQuestion: {
    question: "What are the different ways to conditionally render JSX in React, and what is the common trap with the `&&` operator?",
    answer: "You can use `if/else` guard returns, ternary operators `condition ? <A /> : <B />`, or logical AND `condition && <A />`. The trap with `&&` occurs with numbers like `0`: writing `count && <Badge />` when count is `0` will render the literal digit `0` on screen because 0 is falsy but renderable. Use `count > 0 && <Badge />` or `Boolean(count)` instead.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Patterns: Ternaries, && & If", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "Conditional Rendering in React",
    bigPicture: "In React, there are no special template directives like `v-if` or `*ngIf`. Instead, you use standard JavaScript conditions — `if` statements, ternary operators (`? :`), and logical AND (`&&`) — to decide what JSX to return.",
    codeSnippet: `function LoginStatus({ isLoggedIn, username }) {
  // 1. Guard clause with early return
  if (!isLoggedIn) {
    return <p className="text-muted">Please sign in to continue.</p>;
  }

  // 2. Inline conditional logic
  return (
    <div className="user-banner">
      <h2>Welcome back, {username}!</h2>
      <button>Open Dashboard</button>
    </div>
  );
}`,
    analogy: "Think of conditional rendering like a smart railway switch. Depending on the signal (state or props), the train is directed down track A or track B.",
    breakdownTitle: "Three Ways to Conditionally Render",
    breakdownItems: [
      {
        title: "1. Early Return (Guard Clause)",
        desc: "Return early from the function component if a prerequisite isn't met (e.g. if (!user) return null).",
      },
      {
        title: "2. Ternary Operator (? :)",
        desc: "Best for choosing between two alternatives inside JSX: {isLoggedIn ? <Dashboard /> : <LoginForm />}",
      },
      {
        title: "3. Logical AND (&&)",
        desc: "Best for showing an element or nothing at all: {unreadCount > 0 && <NotificationBadge />}",
      },
    ],
  },
  part2: {
    title: "When to Return null",
    rule: {
      title: "The Null Return Rule",
      content: "If you want a component to render nothing at all under certain conditions, return `null`. React will skip rendering that branch in the DOM.",
    },
    cards: [
      {
        number: "01",
        tag: "READABILITY",
        title: "Keep JSX Clean",
        description: "If an inline ternary has deeply nested JSX branches, extract each branch into a smaller sub-component or use early return guard clauses.",
        color: "purple",
      },
      {
        number: "02",
        tag: "FALSY TRAP",
        title: "The Zero Render Trap",
        description: "In JavaScript, `0 && <Component />` evaluates to `0`. React renders `0` on screen! Always use boolean expressions: `count > 0 && <Component />`.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "CONDITIONAL PROPS",
        title: "Dynamic Attributes",
        description: "You can conditionally render attribute values: `<button className={isActive ? 'btn-active' : 'btn-idle'}>`.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step conditional branch evaluation:",
    points: [
      {
        title: "1. Guard Clauses First",
        content: "Check prerequisites early: if (!user) return <SignInMessage />.",
      },
      {
        title: "2. Inline Ternaries",
        content: "Use {condition ? <TrueView /> : <FalseView />} for two-way choices.",
        codeSnippet: `{isLoggedIn ? <p>Welcome back!</p> : <p>Please sign in.</p>}`,
      },
      {
        title: "3. Short-Circuit AND",
        content: "Use {booleanCondition && <OptionalBadge />} to show an element or nothing.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Rendering Literal Zero with Logical &&",
      code: `// ❌ BUG: When items.length is 0, renders literal "0" on screen!
<div>{items.length && <Badge count={items.length} />}</div>`,
      explanation: "JavaScript logical AND returns the left-hand operand if falsy. If items.length is 0, React displays the number 0.",
    },
    good: {
      title: "Enforce Strict Boolean Condition",
      code: `// ✅ Correct: Strict comparison renders nothing when count is 0
<div>{items.length > 0 && <Badge count={items.length} />}</div>`,
      explanation: "Using `> 0` ensures the condition evaluates to a strict boolean `false`, which React ignores safely.",
    },
    whyItMatters: "Preventing accidental 0 prints keeps headers, badges, and notification bars looking professional.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Toggle login state and notification count to observe conditional UI rendering:",
    starterCode: `import { useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h2>Conditional UI Sandbox</h2>

      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          style={{ padding: "8px 12px", marginRight: "8px" }}
        >
          {isLoggedIn ? "Log Out" : "Log In"}
        </button>

        <button
          onClick={() => setUnreadCount(c => c + 1)}
          style={{ padding: "8px 12px" }}
        >
          Add Notification
        </button>
      </div>

      <div style={{ padding: "12px", backgroundColor: "#f1f5f9", borderRadius: "6px" }}>
        {isLoggedIn ? (
          <p style={{ color: "#16a34a", margin: 0 }}>
            Welcome back! You are logged in.
          </p>
        ) : (
          <p style={{ color: "#dc2626", margin: 0 }}>
            Please log in to view your course progress.
          </p>
        )}
      </div>

      {unreadCount > 0 && (
        <p style={{ marginTop: "12px", color: "#3b82f6" }}>
          📬 You have <strong>{unreadCount}</strong> unread notification(s)!
        </p>
      )}
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Standard JS Conditions",
        desc: "Use if statements, ternaries, and logical AND instead of template directives.",
      },
      {
        title: "Return null to Hide",
        desc: "Returning null instructs React to render nothing for that component.",
      },
      {
        title: "The Zero Trap",
        desc: "Always write count > 0 && ... to prevent displaying the digit 0 on screen.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What does `{count && <Badge />}` display if count is equal to 0?",
      options: [
        "Nothing at all",
        "The literal number 0",
        "An empty <Badge /> element",
        "A JavaScript ReferenceError",
      ],
      correctIndex: 1,
      explanation: "In JS, `0 && <Badge />` evaluates to `0`. React renders `0` as visible text on the page.",
    },
  },
};
