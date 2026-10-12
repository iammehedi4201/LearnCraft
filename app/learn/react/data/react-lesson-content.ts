/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * REACT.JS LESSONS CONTENT REPOSITORY — SIMPLE, CLEAR & INTUITIVE EXPLANATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Beginner-friendly explanations, real-world analogies, and practical examples
 * for all 27 React.js lessons (REACT-01 through REACT-27).
 *
 * Strict Topic Boundary: Pure React.js only.
 * Focuses on mental models, components, JSX, props, state, effects, hooks,
 * rendering cycles, forms, async UI, debugging, and testing fundamentals.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export interface ReactLessonSection {
  id: string;
  label: string;
  icon: string;
}

export interface ReactLessonCard {
  number: string;
  tag: string;
  title: string;
  description: string;
  color?: "purple" | "emerald" | "amber" | "cyan" | "rose" | "indigo" | "blue";
}

export interface ReactMentalModelPoint {
  title: string;
  content: string;
  codeSnippet?: string;
}

export interface ReactCodeComparison {
  title: string;
  code: string;
  explanation: string;
}

export interface ReactQuizData {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ReactLessonTakeaway {
  title: string;
  desc: string;
}

export interface ReactLessonContent {
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  sections: ReactLessonSection[];
  part1: {
    title: string;
    bigPicture: string;
    breakdownTitle: string;
    breakdownItems: Array<{ title: string; desc: string }>;
  };
  part2: {
    title: string;
    intro: string;
    cards: ReactLessonCard[];
    rule: {
      title: string;
      content: string;
    };
  };
  part3: {
    title: string;
    intro: string;
    points: ReactMentalModelPoint[];
  };
  part4: {
    title: string;
    bad: ReactCodeComparison;
    good: ReactCodeComparison;
  };
  part5: {
    title: string;
    intro: string;
    starterCode: string;
  };
  part6: {
    title: string;
    quiz: ReactQuizData;
  };
  part7: {
    title: string;
    takeaways: ReactLessonTakeaway[];
    nextLessonPreview?: {
      title: string;
      desc: string;
    };
  };
}

export const REACT_LESSONS_CONTENT: Record<string, ReactLessonContent> = {
  // ─────────────────────────────────────────────────────────────
  // REACT-01: What Is React?
  // ─────────────────────────────────────────────────────────────
  "react01-what-is-react": {
    slug: "react01-what-is-react",
    code: "REACT-01",
    title: "What Is React? The Declarative Mental Model",
    subtitle: "Learn why React exists, how declarative UI works, and how components describe what the screen should show.",
    sections: [
      { id: "part1", label: "Why Do We Need React?", icon: "💡" },
      { id: "part2", label: "Imperative vs Declarative", icon: "⚖️" },
      { id: "part3", label: "The Component Blueprint", icon: "🧩" },
      { id: "part4", label: "Manual DOM vs React", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Why Do We Need React?",
      bigPicture: "In traditional JavaScript, if you want to update the screen when a user clicks a button, you have to manually find the HTML element, change its inner text, toggle CSS classes, and keep everything in sync. As apps grow, tracking dozens of manual updates becomes a chaotic mess.",
      breakdownTitle: "React solves this by changing how we think about UI:",
      breakdownItems: [
        { title: "You Declare What It Looks Like", desc: "You write a function that returns the desired UI for any given data." },
        { title: "React Handles the DOM", desc: "When your data changes, React automatically figures out the exact DOM changes needed." },
        { title: "Reusable Components", desc: "You build small, isolated pieces (like buttons, cards, and navbars) and assemble them into full apps." },
      ],
    },
    part2: {
      title: "Imperative vs Declarative UI",
      intro: "Understanding the difference between telling the computer 'how to step-by-step build UI' vs 'what the UI should look like':",
      cards: [
        {
          number: "01",
          tag: "OLD WAY",
          title: "Imperative (Step-by-Step)",
          description: "Like giving turn-by-turn driving directions: 'Turn left, go 200m, turn right, stop at number 14.' If one step fails, the whole route breaks.",
          color: "rose",
        },
        {
          number: "02",
          tag: "REACT WAY",
          title: "Declarative (Outcome-Focused)",
          description: "Like typing your destination into GPS: 'Take me to 14 Baker Street.' You specify the destination, and the system handles the navigation.",
          color: "purple",
        },
        {
          number: "03",
          tag: "RESULT",
          title: "Predictable & Bug-Free",
          description: "Because UI is always a direct reflection of current data, you avoid out-of-sync UI bugs.",
          color: "emerald",
        },
      ],
      rule: {
        title: "The Golden Rule of React",
        content: "UI = f(state). Your user interface is simply a pure visual reflection of your current data at any given moment.",
      },
    },
    part3: {
      title: "The Component Blueprint",
      intro: "A React application is just a tree of small, self-contained functions called components:",
      points: [
        {
          title: "Functions That Return UI",
          content: "A React component is a regular JavaScript function that starts with a capital letter and returns what should appear on screen.",
          codeSnippet: "function WelcomeBanner() {\n  return <h1>Welcome to LearnCraft!</h1>;\n}",
        },
        {
          title: "Self-Contained & Reusable",
          content: "Each component packages its own structure, style, and logic. You can reuse it anywhere in your app without copying and pasting code.",
        },
        {
          title: "Component Tree Hierarchy",
          content: "Components can contain other components, forming a clean hierarchy from the root App down to individual buttons and icons.",
        },
      ],
    },
    part4: {
      title: "Manual DOM Updates vs React Declarative UI",
      bad: {
        title: "❌ Imperative Vanilla JS (Fragile)",
        code: `// Imperative: manually selecting and mutating DOM nodes
const btn = document.querySelector("#counter-btn");
const display = document.querySelector("#count-display");
let count = 0;

btn.addEventListener("click", () => {
  count++;
  display.innerText = "Count: " + count; // Manual sync!
});`,
        explanation: "If another script modifies the DOM or if count changes elsewhere, the UI easily goes out of sync with the underlying data.",
      },
      good: {
        title: "✅ Declarative React Component (Robust)",
        code: `// Declarative: UI naturally reflects the count state
function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`,
        explanation: "You never touch document.querySelector. When count changes, React automatically updates the button text for you.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Declarative Thinking",
      intro: "Inspect this simple React component. Notice how changing the data immediately updates the output without any DOM queries:",
      starterCode: `// React Declarative Component Demo
function App() {
  const user = {
    name: "Alex",
    role: "Frontend Engineer",
    projectsCompleted: 12
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Hello, {user.name}! 👋</h2>
      <p>Role: <strong>{user.role}</strong></p>
      <p>Status: {user.projectsCompleted > 10 ? "🔥 Pro Builder" : "🌱 Active Learner"}</p>
    </div>
  );
}

// Render component preview
console.log("App component ready to render.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "What is the primary benefit of React's declarative approach over imperative DOM manipulation?",
        options: [
          "You must manually write document.getElementById for every update.",
          "You describe what the UI should look like for given data, and React handles DOM updates automatically.",
          "React deletes all HTML elements on every click and reloads the browser.",
          "Declarative code runs only on web servers, not in the browser.",
        ],
        correctIndex: 1,
        explanation: "Declarative UI means you describe the desired UI state, and React efficiently calculates and applies the exact DOM mutations needed.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "UI as a Function of Data", desc: "Your user interface is always a clean visual representation of your current data." },
        { title: "Components are Building Blocks", desc: "Break your UI down into small, reusable JavaScript functions that return JSX." },
        { title: "No Direct DOM Manipulation", desc: "Let React manage element creation, updates, and removals under the hood." },
      ],
      nextLessonPreview: {
        title: "REACT-02: JSX: Writing HTML Inside JavaScript",
        desc: "Discover how JSX combines HTML tags with JavaScript expressions to create dynamic UI elements.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-02: JSX & Elements
  // ─────────────────────────────────────────────────────────────
  "react02-jsx-and-elements": {
    slug: "react02-jsx-and-elements",
    code: "REACT-02",
    title: "JSX: Writing HTML Inside JavaScript & Expressions",
    subtitle: "Understand how JSX works, why curly braces embed JavaScript, and the essential syntax rules.",
    sections: [
      { id: "part1", label: "What is JSX?", icon: "💡" },
      { id: "part2", label: "JSX Syntax Rules", icon: "📐" },
      { id: "part3", label: "Curly Braces & Expressions", icon: "🔣" },
      { id: "part4", label: "JSX Mistakes vs Clean JSX", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "What is JSX?",
      bigPicture: "JSX is a syntax extension for JavaScript that lets you write HTML-like markup directly inside your JavaScript files. It is not HTML, and it is not a string — it is a friendly shorthand that compiles down to regular JavaScript function calls (React.createElement).",
      breakdownTitle: "Why JSX is so powerful:",
      breakdownItems: [
        { title: "Co-located Logic and Markup", desc: "Keep visual structure and interactive behavior together in one place." },
        { title: "Full Power of JavaScript", desc: "You can use any JavaScript expression inside JSX using curly braces `{}`." },
        { title: "Compile-Time Safety", desc: "Syntax errors and unclosed tags are caught immediately by your build tools before running in the browser." },
      ],
    },
    part2: {
      title: "The 3 Core Rules of JSX",
      intro: "Because JSX is compiled into JavaScript objects, it follows stricter rules than loose HTML:",
      cards: [
        {
          number: "01",
          tag: "RULE 1",
          title: "Return a Single Root Element",
          description: "A component must return one single parent tag. If you don't want an extra <div> in the DOM, wrap your elements in a Fragment `<>...</>`.",
          color: "purple",
        },
        {
          number: "02",
          tag: "RULE 2",
          title: "Close All Tags",
          description: "Every tag must be explicitly closed. Self-closing tags like `<img />`, `<input />`, and `<br />` must end with `/>`.",
          color: "amber",
        },
        {
          number: "03",
          tag: "RULE 3",
          title: "camelCase Attributes",
          description: "Since JSX turns into JavaScript, reserved words are replaced: `class` becomes `className`, and `for` becomes `htmlFor`.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Why Fragments `<>...</>` Matter",
        content: "React functions return a single value (a JavaScript object). Fragments let you group siblings without adding unnecessary DOM wrapper nodes.",
      },
    },
    part3: {
      title: "Dynamic Expressions with Curly Braces `{}`",
      intro: "Curly braces act as a window into the JavaScript world inside your markup:",
      points: [
        {
          title: "Embedding Variables & Calculations",
          content: "Put any valid JavaScript expression between `{}` to render its value directly into the element.",
          codeSnippet: "const score = 95;\nreturn <p>Final Score: {score * 2} / 200</p>;",
        },
        {
          title: "Passing Dynamic Attributes",
          content: "Use curly braces for attribute values instead of quotes when referencing variables or objects.",
          codeSnippet: "const avatarUrl = '/alex.png';\nreturn <img src={avatarUrl} alt='Alex' />;",
        },
        {
          title: "Inline Styles with Double Braces",
          content: "Style objects are passed as `{ { color: 'purple', fontSize: 16 } }` — the outer braces enter JavaScript, the inner braces define the object.",
        },
      ],
    },
    part4: {
      title: "Common JSX Mistakes vs Clean JSX",
      bad: {
        title: "❌ Invalid JSX (Multiple Roots & class)",
        code: `// Error: Adjacent JSX elements must be wrapped in an enclosing tag
// Error: 'class' is a reserved keyword in JavaScript
function Profile() {
  return (
    <h1>User Profile</h1>
    <p class="bio">Web Developer</p>
    <img src="avatar.jpg">
  );
}`,
        explanation: "Multiple top-level tags, unclosed img tag, and using 'class' instead of 'className' will throw compiler errors.",
      },
      good: {
        title: "✅ Valid Clean JSX (Fragments & className)",
        code: `// Wrapped in a Fragment <>, closed <img>, and using className
function Profile() {
  return (
    <>
      <h1>User Profile</h1>
      <p className="bio">Web Developer</p>
      <img src="avatar.jpg" alt="User avatar" />
    </>
  );
}`,
        explanation: "Correctly groups siblings with a Fragment, uses closed tags, and provides proper attribute naming.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Exploring JSX Expressions",
      intro: "Experiment with dynamic text interpolation and conditional expressions inside JSX:",
      starterCode: `// JSX Expressions Demo
function UserCard() {
  const user = {
    firstName: "Sarah",
    lastName: "Connor",
    isOnline: true,
    skills: ["React", "JavaScript", "HTML"]
  };

  const fullName = \`\${user.firstName} \${user.lastName}\`;

  return (
    <div style={{ border: "1px solid #334155", padding: "16px", borderRadius: "8px" }}>
      <h3>{fullName}</h3>
      <p>Status: {user.isOnline ? "🟢 Online" : "⚪ Offline"}</p>
      <p>Top Skill: {user.skills[0]}</p>
    </div>
  );
}

console.log("UserCard component ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "Why do we use 'className' instead of 'class' when applying CSS classes in JSX?",
        options: [
          "React only supports inline styles, not CSS classes.",
          "'class' is a reserved keyword in JavaScript for creating class objects.",
          "className is faster for the browser to parse than class.",
          "HTML5 deprecated the class attribute in 2024.",
        ],
        correctIndex: 1,
        explanation: "Because JSX is transformed into JavaScript, using 'class' would clash with the JavaScript class declaration keyword.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "JSX is JavaScript", desc: "JSX compiles into React.createElement calls that produce plain JavaScript UI descriptor objects." },
        { title: "Always Return a Single Root", desc: "Wrap multiple sibling tags in a Fragment `<>...</>` to avoid unnecessary DOM wrapper divs." },
        { title: "Curly Braces `{}` Open JS", desc: "Use curly braces to embed any variable, calculation, or function call inside your markup." },
      ],
      nextLessonPreview: {
        title: "REACT-03: Components & Composition",
        desc: "Learn how to organize UI into small, modular components that nest together cleanly.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-03: Components & Composition
  // ─────────────────────────────────────────────────────────────
  "react03-components-and-composition": {
    slug: "react03-components-and-composition",
    code: "REACT-03",
    title: "Components & Composition: Building Reusable Blocks",
    subtitle: "Master the art of breaking complex screens into small, focused, and composable UI building blocks.",
    sections: [
      { id: "part1", label: "Thinking in Components", icon: "💡" },
      { id: "part2", label: "Component Hierarchy", icon: "🏗️" },
      { id: "part3", label: "Composition Over Big Files", icon: "🧩" },
      { id: "part4", label: "Monolith vs Composed UI", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Thinking in Components",
      bigPicture: "When you look at a website like YouTube or GitHub, don't see one giant page. See a header containing a search bar, a sidebar of menu items, and a grid of video cards. Each of these is an independent component.",
      breakdownTitle: "Benefits of component-driven architecture:",
      breakdownItems: [
        { title: "Single Responsibility", desc: "Each component does one thing well (e.g. renders an avatar, formats a price tag, or handles a search field)." },
        { title: "Reusability", desc: "Build a `<Button />` or `<Badge />` once, use it in dozens of places across your entire application." },
        { title: "Easy Debugging", desc: "When something looks wrong with a card, you only inspect the `Card` component, not thousands of lines of code." },
      ],
    },
    part2: {
      title: "Naming and Structure Rules",
      intro: "React uses simple rules to distinguish components from regular HTML tags:",
      cards: [
        {
          number: "01",
          tag: "CAPITALIZATION",
          title: "Must Start with a Capital Letter",
          description: "React treats lowercase `<button>` as an HTML tag, but `<Button>` as a custom React component function.",
          color: "purple",
        },
        {
          number: "02",
          tag: "PURITY",
          title: "Pure Return Value",
          description: "Given the same inputs, a component should return the same JSX without modifying outside variables during render.",
          color: "cyan",
        },
        {
          number: "03",
          tag: "NESTING",
          title: "Never Nest Component Definitions",
          description: "Define components at the top level of your file. Never declare a component function inside another component function.",
          color: "rose",
        },
      ],
      rule: {
        title: "Avoid Nested Function Declarations",
        content: "Declaring a component inside another component re-creates that component on every render, destroying its internal state and hurting performance.",
      },
    },
    part3: {
      title: "Composition: Assembling Components",
      intro: "Components combine like Lego blocks to build rich applications:",
      points: [
        {
          title: "Parent and Child Components",
          content: "A parent component renders child components inside its JSX, forming a clear component tree.",
          codeSnippet: "function Dashboard() {\n  return (\n    <div>\n      <Navbar />\n      <StatsGrid />\n      <RecentActivity />\n    </div>\n  );\n}",
        },
        {
          title: "Leaf Components",
          content: "Small primitive components at the bottom of the tree (like Icons, Buttons, and Badges) that render plain HTML tags.",
        },
        {
          title: "Container Components",
          content: "Higher-level components that organize layout and coordinate data between leaf components.",
        },
      ],
    },
    part4: {
      title: "Giant Monolith vs Composed Components",
      bad: {
        title: "❌ Giant 300-Line Single Component",
        code: `// Unmaintainable: one function does header, sidebar, profile, and footer
function EntireWebsite() {
  return (
    <div>
      <header><nav><ul><li>Home</li><li>About</li></ul></nav></header>
      <main>
        <div className="card"><h3>Alex</h3><p>Online</p><button>Follow</button></div>
      </main>
      <footer><p>© 2026</p></footer>
    </div>
  );
}`,
        explanation: "Impossible to reuse the user card, hard to read, and difficult to test individual pieces in isolation.",
      },
      good: {
        title: "✅ Clean Composed Component Tree",
        code: `// Modular: small, focused building blocks
function UserCard({ name, status }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{status}</p>
      <button>Follow</button>
    </div>
  );
}

function EntireWebsite() {
  return (
    <div>
      <Header />
      <main><UserCard name="Alex" status="Online" /></main>
      <Footer />
    </div>
  );
}`,
        explanation: "Each component has a clear job and can be reused, tested, and modified independently.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Building a Modular Card",
      intro: "See how separating Avatar, UserInfo, and ActionButton makes the overall UserCard clean and easy to read:",
      starterCode: `// Component Composition Demo
function Avatar({ initial }) {
  return (
    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#7c3aed", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
      {initial}
    </div>
  );
}

function ActionButton({ text }) {
  return (
    <button style={{ padding: "6px 12px", borderRadius: "6px", background: "#334155", color: "#fff", border: "none", cursor: "pointer" }}>
      {text}
    </button>
  );
}

function ProfileCard() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", border: "1px solid #1e293b", borderRadius: "8px" }}>
      <Avatar initial="M" />
      <div>
        <h4 style={{ margin: 0 }}>Mehedi</h4>
        <small style={{ color: "#94a3b8" }}>Software Engineer</small>
      </div>
      <ActionButton text="Connect" />
    </div>
  );
}

console.log("ProfileCard composed successfully.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "Why must custom React component names always start with a capital letter (e.g. <Navbar /> instead of <navbar />)?",
        options: [
          "It is just a stylistic recommendation with no technical impact.",
          "JSX uses capitalization to distinguish custom React components from standard built-in HTML tags.",
          "Lowercase tags are reserved exclusively for JavaScript variables.",
          "JavaScript syntax does not allow functions to start with lowercase letters.",
        ],
        correctIndex: 1,
        explanation: "When JSX sees `<navbar>`, it treats it as a standard HTML element. When it sees `<Navbar>`, it looks for a component function in scope.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "Components are Pure Functions", desc: "They receive inputs, return JSX describing the UI, and start with a capital letter." },
        { title: "Favor Small Components", desc: "Keep components small and focused on a single responsibility for better readability." },
        { title: "Compose from the Bottom Up", desc: "Build small primitives first, then combine them into full feature screens." },
      ],
      nextLessonPreview: {
        title: "REACT-04: Props & One-Way Data Flow",
        desc: "Learn how parent components pass data down to children and how one-way data flow keeps apps predictable.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-04: Props & Data Flow
  // ─────────────────────────────────────────────────────────────
  "react04-props-and-data-flow": {
    slug: "react04-props-and-data-flow",
    code: "REACT-04",
    title: "Props & One-Way Data Flow: Passing Data Down",
    subtitle: "Learn how props work like function arguments to customize child components and why data flows strictly downward.",
    sections: [
      { id: "part1", label: "What are Props?", icon: "💡" },
      { id: "part2", label: "Props as Arguments", icon: "📦" },
      { id: "part3", label: "One-Way Data Flow", icon: "⬇️" },
      { id: "part4", label: "Hardcoded UI vs Dynamic Props", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "What are Props?",
      bigPicture: "Props (short for properties) are the arguments you pass into a React component. Just like you pass arguments to a JavaScript function `formatPrice(amount)`, you pass props to a component `<PriceTag amount={49} />` to customize what it displays.",
      breakdownTitle: "Key characteristics of props:",
      breakdownItems: [
        { title: "Customizable Components", desc: "One `<Button />` component can render 'Save', 'Delete', or 'Cancel' depending on the props passed to it." },
        { title: "Props are Read-Only (Immutable)", desc: "A child component must never change its own props. Props are owned and controlled by the parent." },
        { title: "Any JavaScript Value", desc: "You can pass strings, numbers, booleans, objects, arrays, and even functions as props." },
      ],
    },
    part2: {
      title: "Reading and Destructuring Props",
      intro: "A React component receives a single object argument containing all passed props:",
      cards: [
        {
          number: "01",
          tag: "BASIC",
          title: "Direct Props Object",
          description: "`function Card(props) { return <h2>{props.title}</h2>; }` — Access properties through the props object directly.",
          color: "purple",
        },
        {
          number: "02",
          tag: "CLEAN",
          title: "Destructuring (Recommended)",
          description: "`function Card({ title, price }) { return <h2>{title} - ${price}</h2>; }` — Unpack properties cleanly in the function signature.",
          color: "emerald",
        },
        {
          number: "03",
          tag: "DEFAULTS",
          title: "Default Prop Values",
          description: "`function Badge({ type = 'info', text })` — Provide sensible fallbacks when optional props are omitted by the parent.",
          color: "cyan",
        },
      ],
      rule: {
        title: "Props are Immutable",
        content: "Never do `props.title = 'New'`. If a child wants to change data, the parent must pass a callback function to update parent state.",
      },
    },
    part3: {
      title: "One-Way Data Flow (Top to Bottom)",
      intro: "In React, data flows strictly from top to bottom through the component tree:",
      points: [
        {
          title: "Water Down a Stream",
          content: "Data flows downwards from parent components to child components. A child never directly pushes data sideways to its siblings.",
        },
        {
          title: "Single Source of Truth",
          content: "When state lives in a parent, changes flow naturally to all children that consume that data.",
        },
        {
          title: "Predictable Debugging",
          content: "If a value looks wrong on screen, you trace upwards through the props chain to find the parent that passed the bad data.",
        },
      ],
    },
    part4: {
      title: "Hardcoded Component vs Dynamic Props Component",
      bad: {
        title: "❌ Duplicate Hardcoded Components",
        code: `// Bad: Creating separate components for every single button label
function SaveButton() {
  return <button className="btn btn-primary">Save Changes</button>;
}
function DeleteButton() {
  return <button className="btn btn-danger">Delete Item</button>;
}`,
        explanation: "Duplicating JSX structure for every slight variation causes bloated, unmaintainable code.",
      },
      good: {
        title: "✅ Single Reusable Component with Props",
        code: `// Good: One flexible component driven by props
function Button({ label, variant = "primary" }) {
  return (
    <button className={\`btn btn-\${variant}\`}>
      {label}
    </button>
  );
}

// Usage:
// <Button label="Save Changes" variant="primary" />
// <Button label="Delete Item" variant="danger" />`,
        explanation: "A single clean component handles all variations through clear, documented props.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Passing Props to a Product Card",
      intro: "Inspect how one ProductCard component renders different products based on the props passed to it:",
      starterCode: `// Props Demonstration
function ProductCard({ title, price, inStock, discount = 0 }) {
  const finalPrice = discount > 0 ? price - (price * discount) / 100 : price;

  return (
    <div style={{ border: "1px solid #334155", padding: "12px", borderRadius: "8px", width: "240px" }}>
      <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
      <p style={{ margin: "0 0 4px" }}>
        Price: <strong>\${finalPrice.toFixed(2)}</strong>
        {discount > 0 && <span style={{ color: "#10b981", marginLeft: "6px" }}>({discount}% OFF)</span>}
      </p>
      <span style={{ fontSize: "12px", color: inStock ? "#34d399" : "#f87171" }}>
        {inStock ? "✓ In Stock" : "✗ Out of Stock"}
      </span>
    </div>
  );
}

console.log("ProductCard component ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "Can a child component directly modify the props it receives from its parent?",
        options: [
          "Yes, child components can freely reassign props (e.g. props.count = 10).",
          "No, props are read-only (immutable) to maintain predictable one-way data flow.",
          "Only if the props are strings or numbers, but not objects.",
          "Yes, but only inside a setTimeout callback.",
        ],
        correctIndex: 1,
        explanation: "Props are strictly read-only. If a child needs to trigger a data change, it calls a callback function provided by the parent.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "Props Customize Components", desc: "Pass data into components just like passing arguments into regular JavaScript functions." },
        { title: "Props are Read-Only", desc: "Never mutate props inside a child component; treat them as immutable snapshots." },
        { title: "Destructure for Clarity", desc: "Unpack `{ name, age, role }` directly in the component signature with default fallback values." },
      ],
      nextLessonPreview: {
        title: "REACT-05: Callback Props & Child-to-Parent Communication",
        desc: "Learn how child components notify parents of user actions by calling function props.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-05: Passing Functions & Callbacks
  // ─────────────────────────────────────────────────────────────
  "react05-passing-functions-and-callbacks": {
    slug: "react05-passing-functions-and-callbacks",
    code: "REACT-05",
    title: "Callback Props: Child-to-Parent Communication",
    subtitle: "Learn how child components trigger actions in parent components by invoking callback functions passed as props.",
    sections: [
      { id: "part1", label: "The Communication Problem", icon: "💡" },
      { id: "part2", label: "How Callbacks Work", icon: "📞" },
      { id: "part3", label: "Passing Arguments Upwards", icon: "📤" },
      { id: "part4", label: "Direct Mutation vs Callback", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "The Communication Problem",
      bigPicture: "Data only flows down from parent to child. But what happens when a user clicks a 'Delete' button inside a child `TodoItem` component? The child needs to tell the parent list: 'Hey, please remove me!'",
      breakdownTitle: "The Callback Solution:",
      breakdownItems: [
        { title: "Parent Owns the Function", desc: "The parent creates a function that knows how to modify the parent's data." },
        { title: "Passed Down as a Prop", desc: "The parent hands that function to the child as a prop (e.g. `onDelete={handleDelete}`)." },
        { title: "Child Invokes on Event", desc: "When the button is clicked, the child calls `onDelete(id)`, notifying the parent." },
      ],
    },
    part2: {
      title: "The Callback Pattern Explained",
      intro: "Think of passing a callback like giving someone your phone number:",
      cards: [
        {
          number: "01",
          tag: "STEP 1",
          title: "Parent Prepares Handler",
          description: "Parent defines `function handleSelect(item) { ... }` containing the logic to run.",
          color: "purple",
        },
        {
          number: "02",
          tag: "STEP 2",
          title: "Passed as a Prop",
          description: "`<ItemCard onSelect={handleSelect} />` — the child receives the function reference.",
          color: "cyan",
        },
        {
          number: "03",
          tag: "STEP 3",
          title: "Child Rings the Bell",
          description: "Child runs `onClick={() => onSelect(item.id)}` whenever the user clicks.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Naming Convention",
        content: "Use `onEvent` for prop names (e.g. `onDelete`, `onSave`) and `handleEvent` for the parent's implementation function (e.g. `handleDelete`).",
      },
    },
    part3: {
      title: "Passing Arguments Back to Parent",
      intro: "Children can pass values back to the parent as parameters when invoking the callback:",
      points: [
        {
          title: "Calling with an ID or Payload",
          content: "Wrap the callback in an arrow function so it only runs when clicked and passes the target ID.",
          codeSnippet: "<button onClick={() => onDelete(task.id)}>Delete</button>",
        },
        {
          title: "Do Not Call Immediately During Render",
          content: "Writing `onClick={onDelete(task.id)}` executes the function immediately during render, causing infinite loops!",
        },
        {
          title: "Custom Form Data Payloads",
          content: "A child form can package an entire object `{ title, category }` and pass it up to `<Parent onSubmit={data => ...} />`.",
        },
      ],
    },
    part4: {
      title: "Direct Parent Mutation vs Callback Prop",
      bad: {
        title: "❌ Trying to Mutate Parent Directly",
        code: `// Bad: Child attempts to modify parent list directly
function TodoItem({ item, parentList }) {
  const handleDelete = () => {
    // WRONG: Mutating an external array breaks React's change detection!
    parentList.splice(parentList.indexOf(item), 1);
  };

  return <button onClick={handleDelete}>Delete</button>;
}`,
        explanation: "Mutating parent data directly breaks one-way data flow and React will not re-render the UI.",
      },
      good: {
        title: "✅ Clean Callback Communication",
        code: `// Good: Child calls the parent's callback with the ID
function TodoItem({ item, onDelete }) {
  return (
    <div>
      <span>{item.title}</span>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
}`,
        explanation: "The child stays purely presentational. The parent retains full control over how items are deleted and updated.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Parent-Child Callback Flow",
      intro: "Observe how the parent component receives the notification and payload from child buttons:",
      starterCode: `// Callback Props Demo
function QuantitySelector({ quantity, onIncrement, onDecrement }) {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <button onClick={onDecrement} style={{ padding: "4px 10px" }}>-</button>
      <span style={{ fontWeight: "bold", minWidth: "24px", textAlign: "center" }}>{quantity}</span>
      <button onClick={onIncrement} style={{ padding: "4px 10px" }}>+</button>
    </div>
  );
}

// Simulated parent usage
function CartItem() {
  const currentQty = 3;

  const handlePlus = () => console.log("Parent received: Increment quantity");
  const handleMinus = () => console.log("Parent received: Decrement quantity");

  return (
    <div style={{ padding: "16px", border: "1px solid #334155", borderRadius: "8px" }}>
      <h4>Mechanical Keyboard</h4>
      <QuantitySelector
        quantity={currentQty}
        onIncrement={handlePlus}
        onDecrement={handleMinus}
      />
    </div>
  );
}

console.log("CartItem & QuantitySelector ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "What is the common bug with writing `onClick={handleClick(item.id)}` in JSX?",
        options: [
          "It converts the item.id into a string.",
          "It executes handleClick immediately during component render instead of waiting for a user click.",
          "React throws a CSS styling error.",
          "The browser crashes because HTML buttons cannot receive numbers.",
        ],
        correctIndex: 1,
        explanation: "Adding parentheses `()` executes the function right away when rendering. To pass arguments on click, wrap it in an arrow function: `onClick={() => handleClick(item.id)}`.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "Callbacks Flow Down, Events Flow Up", desc: "Parents pass function references down; children invoke them with event details." },
        { title: "Never Mutate Props", desc: "Let the parent update its own state when the callback is triggered." },
        { title: "Use Arrow Wrappers for Arguments", desc: "Write `onClick={() => onAction(id)}` to pass parameters without triggering execution during render." },
      ],
      nextLessonPreview: {
        title: "REACT-06: Component Composition & The children Prop",
        desc: "Learn how the children prop allows you to create flexible wrapper and container components.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-06: Children & Slot Composition
  // ─────────────────────────────────────────────────────────────
  "react06-children-and-slot-composition": {
    slug: "react06-children-and-slot-composition",
    code: "REACT-06",
    title: "Component Composition: The children Prop & Layout Slots",
    subtitle: "Build reusable wrapper components, modal dialogs, and flexible card layouts using the special children prop.",
    sections: [
      { id: "part1", label: "The children Prop", icon: "💡" },
      { id: "part2", label: "Wrapper Components", icon: "📦" },
      { id: "part3", label: "Named Slots Pattern", icon: "🗂️" },
      { id: "part4", label: "Prop Drilling vs Composition", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "The children Prop",
      bigPicture: "Just like standard HTML tags can wrap other elements (`<div><p>Hello</p></div>`), React components can wrap arbitrary JSX. Whatever you place between opening and closing tags `<Card><p>Hello</p></Card>` is automatically passed to the Card component as a prop named `children`.",
      breakdownTitle: "Why the children prop is indispensable:",
      breakdownItems: [
        { title: "Generic Containers", desc: "Build Cards, Modals, Drawers, and Alert boxes that don't care what content is inside them." },
        { title: "No Rigid Prop Lists", desc: "Instead of passing 10 different string props, let the parent pass any custom JSX structure inside." },
        { title: "Clean Hierarchy", desc: "Your JSX reads naturally like an HTML layout tree." },
      ],
    },
    part2: {
      title: "Building Wrapper Components",
      intro: "A wrapper component provides a consistent frame, styling, or behavior around arbitrary content:",
      cards: [
        {
          number: "01",
          tag: "STEP 1",
          title: "Accept children in Props",
          description: "`function Card({ children, title }) { ... }` — unpack `children` from props.",
          color: "purple",
        },
        {
          number: "02",
          tag: "STEP 2",
          title: "Place in JSX",
          description: "Render `{children}` inside the wrapper's template where you want the nested content to appear.",
          color: "cyan",
        },
        {
          number: "03",
          tag: "STEP 3",
          title: "Nest Content Naturally",
          description: "`<Card title='Overview'><Chart /><StatsTable /></Card>` — nest any combination of components.",
          color: "emerald",
        },
      ],
      rule: {
        title: "children Can Be Anything",
        content: "The `children` prop can be plain text, HTML elements, other React components, or even a list of mixed elements.",
      },
    },
    part3: {
      title: "The Named Slots Pattern",
      intro: "When you need multiple designated slots (like a Header, Sidebar, and Footer), pass JSX elements as regular props:",
      points: [
        {
          title: "Props as UI Holes",
          content: "Props aren't limited to strings or numbers; you can pass entire JSX elements as props: `<PageLayout sidebar={<Nav />} content={<Feed />} />`.",
          codeSnippet: "function SplitPane({ leftSlot, rightSlot }) {\n  return (\n    <div className='split'>\n      <aside>{leftSlot}</aside>\n      <main>{rightSlot}</main>\n    </div>\n  );\n}",
        },
        {
          title: "Flexible Layout Architecture",
          content: "This allows parent components to configure completely different headers or sidebars without modifying the layout container.",
        },
      ],
    },
    part4: {
      title: "Prop-Heavy Monolith vs Slot Composition",
      bad: {
        title: "❌ Rigid Container with 15 Props",
        code: `// Bad: Creating special props for every possible piece of content
function Modal({ title, bodyText, showConfirm, confirmText, showCancel, cancelText, iconUrl }) {
  return (
    <div className="modal">
      <h3>{title}</h3>
      <p>{bodyText}</p>
      {showConfirm && <button>{confirmText}</button>}
    </div>
  );
}`,
        explanation: "If you later need a modal with a form or a video, this rigid prop structure breaks down immediately.",
      },
      good: {
        title: "✅ Flexible Container Using children",
        code: `// Good: Generic wrapper accepting children
function Modal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <header><h3>{title}</h3><button onClick={onClose}>✕</button></header>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}`,
        explanation: "Any content can be placed inside the Modal (forms, images, buttons) without changing the Modal component.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Composable Alert Box",
      intro: "See how an Alert box wraps different children while keeping its border and icon styles consistent:",
      starterCode: `// Composition with children Demo
function AlertBox({ type = "info", children }) {
  const colors = {
    info: { bg: "#1e1b4b", border: "#6366f1", text: "#c7d2fe" },
    success: { bg: "#064e3b", border: "#10b981", text: "#a7f3d0" },
    warning: { bg: "#451a03", border: "#f59e0b", text: "#fde68a" },
  };

  const style = colors[type] || colors.info;

  return (
    <div style={{ padding: "12px 16px", borderRadius: "8px", background: style.bg, border: \`1px solid \${style.border}\`, color: style.text, marginBottom: "12px" }}>
      {children}
    </div>
  );
}

// Usage examples
function App() {
  return (
    <div>
      <AlertBox type="success">
        <strong>Deployment Successful!</strong> Your React app is live at learncraft.dev.
      </AlertBox>
      <AlertBox type="warning">
        <strong>Attention:</strong> Your session will expire in 5 minutes.
      </AlertBox>
    </div>
  );
}

console.log("AlertBox composition demo ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "What is the primary purpose of the special 'children' prop in React?",
        options: [
          "It is used exclusively to count the number of child DOM nodes.",
          "It allows components to accept and render whatever JSX is nested between their opening and closing tags.",
          "It forces child components to inherit parent state automatically.",
          "It is a required prop for every functional component in React.",
        ],
        correctIndex: 1,
        explanation: "The `children` prop represents whatever content is placed inside `<Component>...</Component>`, making reusable container components simple to build.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "The children Prop", desc: "Access whatever JSX is placed between opening and closing tags via `props.children`." },
        { title: "Build Flexible Containers", desc: "Cards, Modals, and Layout grids stay clean and reusable when powered by children." },
        { title: "Named Slots via Regular Props", desc: "Pass JSX elements as named props (e.g. `header={<Title />}`) for multi-slot layouts." },
      ],
      nextLessonPreview: {
        title: "REACT-07: What Is State? The useState Hook",
        desc: "Give your components interactive memory using useState to respond to user clicks and keystrokes.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-07: State & useState
  // ─────────────────────────────────────────────────────────────
  "react07-state-and-usestate": {
    slug: "react07-state-and-usestate",
    code: "REACT-07",
    title: "What Is State? The useState Hook & Component Memory",
    subtitle: "Understand how React components remember values between renders and how state updates trigger UI updates.",
    sections: [
      { id: "part1", label: "Why Regular Variables Fail", icon: "💡" },
      { id: "part2", label: "The useState Hook", icon: "🧠" },
      { id: "part3", label: "The Render Trigger Cycle", icon: "🔄" },
      { id: "part4", label: "Local Variable vs useState", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Why Regular Variables Fail in React",
      bigPicture: "If you declare `let count = 0` inside a component and increment it on click, two problems happen: 1) Local variables are wiped clean on every render, and 2) changing a regular variable doesn't tell React to re-render the screen. The UI never updates!",
      breakdownTitle: "State provides what regular variables lack:",
      breakdownItems: [
        { title: "Component Memory", desc: "React preserves state variables in memory across multiple renders." },
        { title: "Re-render Trigger", desc: "Calling the state setter function `setCount(count + 1)` tells React: 'My data changed, please re-render the screen!'" },
        { title: "Isolated Per Instance", desc: "If you render three `<Counter />` components, each counter has its own independent state memory." },
      ],
    },
    part2: {
      title: "The Anatomy of useState",
      intro: "Calling `useState` returns an array with exactly two items via array destructuring:",
      cards: [
        {
          number: "01",
          tag: "CURRENT VALUE",
          title: "The State Variable (Read)",
          description: "`const [count, setCount] = useState(0);` — `count` holds the current value during this render.",
          color: "purple",
        },
        {
          number: "02",
          tag: "SETTER FUNCTION",
          title: "The Setter Function (Write)",
          description: "`setCount(newValue)` — updates the value and schedules React to re-render the component.",
          color: "cyan",
        },
        {
          number: "03",
          tag: "INITIAL VALUE",
          title: "Initial Value Parameter",
          description: "`useState(0)` — the argument (e.g. `0`, `''`, `[]`, `{}`) is only used on the very first initial render.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Never Mutate State Directly",
        content: "Never do `count = count + 1` or `items.push(newItem)`. Always pass a new value to the setter: `setCount(count + 1)`.",
      },
    },
    part3: {
      title: "The Render Trigger Cycle",
      intro: "What happens step-by-step when a user triggers a state change:",
      points: [
        {
          title: "1. User Interaction",
          content: "The user clicks a button or types in an input, invoking an event handler.",
        },
        {
          title: "2. State Setter Called",
          content: "Your handler calls `setCount(1)`. React records the new value for the next render.",
        },
        {
          title: "3. React Re-renders the Component",
          content: "React runs your component function again. This time, `useState(0)` returns `1` as the current count.",
        },
        {
          title: "4. DOM Updates",
          content: "React compares the new JSX with the previous JSX and updates only the changed text in the browser DOM.",
        },
      ],
    },
    part4: {
      title: "Local Variable vs useState",
      bad: {
        title: "❌ Local Variable (UI Never Updates)",
        code: `function BrokenCounter() {
  let count = 0; // Reset to 0 on every render!

  const handleClick = () => {
    count = count + 1; // Changes variable, but React has NO IDEA!
    console.log("Count is:", count); // Logs 1, 2, 3... but screen stays 0
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}`,
        explanation: "Modifying a plain local variable does not notify React to re-render the UI.",
      },
      good: {
        title: "✅ useState (Screen Updates Reliably)",
        code: `function WorkingCounter() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(count + 1); // Updates memory AND schedules re-render
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}`,
        explanation: "Calling setCount triggers a re-render where the new count is displayed seamlessly.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Light Switch State",
      intro: "Inspect this simple toggle state. Notice how toggling isOn changes both the text and background color:",
      starterCode: `// useState Demo: Light Switch
function LightSwitch() {
  const [isOn, setIsOn] = React.useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div style={{
      padding: "20px",
      borderRadius: "10px",
      background: isOn ? "#fef08a" : "#1e293b",
      color: isOn ? "#713f12" : "#f8fafc",
      textAlign: "center",
      transition: "all 0.3s"
    }}>
      <h3>The light is {isOn ? "💡 ON" : "🌑 OFF"}</h3>
      <button
        onClick={toggleSwitch}
        style={{ padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
      >
        Turn {isOn ? "Off" : "On"}
      </button>
    </div>
  );
}

console.log("LightSwitch ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "What happens when you call a state setter function like `setCount(5)` in a React component?",
        options: [
          "It immediately refreshes the entire web browser window.",
          "It updates the stored state value and schedules React to re-render the component with the new value.",
          "It directly modifies the HTML file on the server.",
          "It deletes the component from the DOM permanently.",
        ],
        correctIndex: 1,
        explanation: "Calling a setter function updates the state value in React's internal fiber and schedules a component re-render so the UI matches the new data.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "State is Component Memory", desc: "useState keeps data alive between renders and triggers UI updates." },
        { title: "Array Destructuring", desc: "`const [value, setValue] = useState(initial)` unpacks the current value and its setter." },
        { title: "Never Mutate Directly", desc: "Always call the setter function with a fresh value so React knows to re-render." },
      ],
      nextLessonPreview: {
        title: "REACT-08: Event Handling & Functional State Updates",
        desc: "Master onClick, onChange, and the updater function pattern `prev => prev + 1` to prevent stale state bugs.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-08: Event Handling & Functional State Updates
  // ─────────────────────────────────────────────────────────────
  "react08-event-handling-and-updates": {
    slug: "react08-event-handling-and-updates",
    code: "REACT-08",
    title: "Event Handling & Functional State Updates",
    subtitle: "Handle browser events cleanly and use the updater function pattern to avoid stale state bugs.",
    sections: [
      { id: "part1", label: "React Event Handling", icon: "💡" },
      { id: "part2", label: "Synthetic Events", icon: "⚡" },
      { id: "part3", label: "The Updater Function Pattern", icon: "🔄" },
      { id: "part4", label: "Direct Setter vs Updater", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "React Event Handling",
      bigPicture: "Handling events in React looks similar to HTML, but with two key differences: React event names are camelCase (`onClick`, `onChange`, `onSubmit`), and you pass a function reference `onClick={handleClick}` rather than a string `onclick='handleClick()'`. ",
      breakdownTitle: "Essential Event Handling Rules:",
      breakdownItems: [
        { title: "Pass Functions, Not Calls", desc: "Write `onClick={handleClick}`, never `onClick={handleClick()}` unless returning a function." },
        { title: "Inline Arrow Handlers", desc: "For quick actions, write `onClick={() => setOpen(!open)}` directly in JSX." },
        { title: "Preventing Default Behavior", desc: "Call `e.preventDefault()` on form submissions to stop the browser from reloading the entire page." },
      ],
    },
    part2: {
      title: "Synthetic Events in React",
      intro: "React wraps native browser events in a cross-browser SyntheticEvent wrapper:",
      cards: [
        {
          number: "01",
          tag: "CROSS-BROWSER",
          title: "Consistent Across All Browsers",
          description: "SyntheticEvents normalize event behavior across Chrome, Safari, Firefox, and Edge seamlessly.",
          color: "purple",
        },
        {
          number: "02",
          tag: "EVENT TARGET",
          title: "e.target.value",
          description: "In an input `onChange` handler, `e.target.value` gives you the current text typed by the user.",
          color: "cyan",
        },
        {
          number: "03",
          tag: "PREVENT DEFAULT",
          title: "e.preventDefault()",
          description: "Stops browser defaults (like link navigation or form page reload) reliably.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Event Delegation",
        content: "React attaches a single root event listener to the root container rather than individual DOM nodes, ensuring high performance.",
      },
    },
    part3: {
      title: "Why Functional Updates `prev => next` Matter",
      intro: "State updates in React are queued and batched. If an update depends on the previous state, use the updater function:",
      points: [
        {
          title: "The Batching Problem",
          content: "If you call `setCount(count + 1)` three times in a row, all three calls read the same snapshot of `count` from the current render. Count only goes up by 1, not 3!",
        },
        {
          title: "The Updater Function Solution",
          content: "Passing `setCount(prev => prev + 1)` gives you the guaranteed latest pending state value for each step in the queue.",
          codeSnippet: "setCount(prev => prev + 1);\nsetCount(prev => prev + 1);\nsetCount(prev => prev + 1); // Guaranteed to increment by 3!",
        },
        {
          title: "Rule of Thumb",
          content: "Whenever your next state depends on your previous state (counters, toggles, appending to arrays), use the updater function `prev => ...`.",
        },
      ],
    },
    part4: {
      title: "Direct Value Setter vs Functional Updater",
      bad: {
        title: "❌ Stale State Update (Only +1)",
        code: `function BrokenCounter() {
  const [count, setCount] = React.useState(0);

  const addThree = () => {
    // Both read count = 0 from current render snapshot!
    setCount(count + 1); // 0 + 1 = 1
    setCount(count + 1); // 0 + 1 = 1
    setCount(count + 1); // 0 + 1 = 1
  };

  return <button onClick={addThree}>+3 (Broken)</button>;
}`,
        explanation: "All three calls calculate 0 + 1 = 1 because count hasn't re-rendered yet during this function execution.",
      },
      good: {
        title: "✅ Functional Updater (Accurate +3)",
        code: `function WorkingCounter() {
  const [count, setCount] = React.useState(0);

  const addThree = () => {
    // Each updater receives the freshly queued previous value
    setCount(prev => prev + 1); // 0 -> 1
    setCount(prev => prev + 1); // 1 -> 2
    setCount(prev => prev + 1); // 2 -> 3
  };

  return <button onClick={addThree}>+3 (Working)</button>;
}`,
        explanation: "The updater function receives the pending state from the queue, ensuring all three increments succeed.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Batched Updates & State Toggles",
      intro: "Test toggling a boolean with functional state updates:",
      starterCode: `// Functional Updates Demo
function Scoreboard() {
  const [score, setScore] = React.useState(0);

  // Safely increment score based on previous value
  const addPoints = (points) => {
    setScore(prev => prev + points);
  };

  const reset = () => setScore(0);

  return (
    <div style={{ padding: "16px", border: "1px solid #334155", borderRadius: "8px" }}>
      <h2>Current Score: {score}</h2>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => addPoints(1)}>+1 Point</button>
        <button onClick={() => addPoints(5)}>+5 Combo</button>
        <button onClick={reset} style={{ color: "#f87171" }}>Reset</button>
      </div>
    </div>
  );
}

console.log("Scoreboard ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "Why is `setCount(prev => prev + 1)` preferred over `setCount(count + 1)` when the update depends on previous state?",
        options: [
          "It converts the number into a floating-point value automatically.",
          "It ensures the calculation uses the most up-to-date queued state value, preventing stale state bugs in batched updates.",
          "It runs synchronously and bypasses React's virtual DOM.",
          "It prevents the browser from firing click events.",
        ],
        correctIndex: 1,
        explanation: "The updater function receives the latest pending state from React's queue, preventing bugs when multiple updates are batched together.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "camelCase Event Handlers", desc: "Pass function references to `onClick`, `onChange`, and `onSubmit` in JSX." },
        { title: "Use e.preventDefault()", desc: "Stop full page reloads on form submissions." },
        { title: "Use Updater Functions", desc: "Write `setVal(prev => !prev)` whenever the next state depends on the prior state." },
      ],
      nextLessonPreview: {
        title: "REACT-09: Lifting State Up",
        desc: "Learn how to share state between sibling components by moving it to their closest common ancestor.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-09: Lifting State Up
  // ─────────────────────────────────────────────────────────────
  "react09-lifting-state-up": {
    slug: "react09-lifting-state-up",
    code: "REACT-09",
    title: "Lifting State Up: Sharing State Between Siblings",
    subtitle: "Coordinate data between multiple components by moving state up to their closest common parent.",
    sections: [
      { id: "part1", label: "The Sibling Problem", icon: "💡" },
      { id: "part2", label: "The Lifting State Process", icon: "⬆️" },
      { id: "part3", label: "Single Source of Truth", icon: "🎯" },
      { id: "part4", label: "Isolated State vs Lifted State", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "The Sibling Communication Problem",
      bigPicture: "Imagine a search bar component `<SearchBar />` and a search results component `<SearchResults />`. Both are sibling components rendered inside `<App />`. If the search input state lives inside `<SearchBar />`, how does `<SearchResults />` know what text was typed?",
      breakdownTitle: "The Solution: Lift State Up",
      breakdownItems: [
        { title: "Identify Common Ancestor", desc: "Find the closest parent component that encloses all components needing the data." },
        { title: "Move State to the Parent", desc: "Declare `useState` inside the parent component." },
        { title: "Pass Down via Props", desc: "Pass the current state value down to `<SearchResults query={query} />` and the updater down to `<SearchBar onQueryChange={setQuery} />`." },
      ],
    },
    part2: {
      title: "The 3 Steps to Lift State Up",
      intro: "Whenever two components need to reflect the same changing data:",
      cards: [
        {
          number: "01",
          tag: "REMOVE",
          title: "Remove Local State",
          description: "Delete the `useState` call from the child components.",
          color: "rose",
        },
        {
          number: "02",
          tag: "DECLARE",
          title: "Declare in Common Parent",
          description: "Move `const [text, setText] = useState('')` to the closest common parent.",
          color: "purple",
        },
        {
          number: "03",
          tag: "CONNECT",
          title: "Pass Props & Callbacks",
          description: "Pass `value={text}` and `onChange={setText}` down to the children as props.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Where Should State Live?",
        content: "Place state in the lowest common ancestor of all components that read or modify it.",
      },
    },
    part3: {
      title: "Single Source of Truth",
      intro: "Lifting state prevents synchronization bugs between different parts of your UI:",
      points: [
        {
          title: "No Duplicate State Copies",
          content: "Never copy a prop into a child's local state unless you intentionally want an un-synced draft.",
        },
        {
          title: "Parent Coordinates Siblings",
          content: "When one sibling calls a callback prop, the parent state updates, and new props flow down to all siblings automatically.",
        },
        {
          title: "Clean Separation of Concerns",
          content: "Children stay lightweight and purely presentational, while the parent coordinates the data flow.",
        },
      ],
    },
    part4: {
      title: "Isolated Sibling State vs Lifted Shared State",
      bad: {
        title: "❌ Duplicate Disconnected State in Siblings",
        code: `// Bad: SearchBar and Results each hold their own query state
function SearchBar() {
  const [query, setQuery] = useState("");
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}

function SearchResults() {
  const [query, setQuery] = useState(""); // Out of sync! Never receives SearchBar changes
  return <p>Showing results for: {query}</p>;
}`,
        explanation: "The two components have separate memory in state and cannot see each other's changes.",
      },
      good: {
        title: "✅ Lifted State in Common Parent",
        code: `// Good: Parent holds query and shares with both children
function App() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <SearchBar query={query} onQueryChange={setQuery} />
      <SearchResults query={query} />
    </div>
  );
}`,
        explanation: "App is the single source of truth. Typing in SearchBar immediately updates SearchResults.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Synchronized Temperature Inputs",
      intro: "See how lifting state to the parent keeps two inputs (Celsius and Fahrenheit) perfectly in sync:",
      starterCode: `// Lifting State Up Demo
function TempInput({ label, temperature, onTemperatureChange }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label style={{ display: "block", marginBottom: "4px" }}>{label}: </label>
      <input
        type="number"
        value={temperature}
        onChange={(e) => onTemperatureChange(e.target.value)}
        style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #475569" }}
      />
    </div>
  );
}

function TemperatureCalculator() {
  const [celsius, setCelsius] = React.useState("20");

  const fahrenheit = celsius !== "" ? (parseFloat(celsius) * 9 / 5 + 32).toFixed(1) : "";

  return (
    <div style={{ padding: "16px", border: "1px solid #334155", borderRadius: "8px" }}>
      <h3>Temperature Converter</h3>
      <TempInput
        label="Celsius (°C)"
        temperature={celsius}
        onTemperatureChange={setCelsius}
      />
      <p>Fahrenheit equivalent: <strong>{fahrenheit}°F</strong></p>
    </div>
  );
}

console.log("TemperatureCalculator ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "When two sibling components need to share or synchronize the same data, what is the recommended React solution?",
        options: [
          "Use a global window variable to store the shared data.",
          "Lift the state up to their closest common parent component and pass it down as props.",
          "Directly query the DOM of the sibling component.",
          "Create a separate database for each component.",
        ],
        correctIndex: 1,
        explanation: "Lifting state to the closest common parent creates a single source of truth and allows both siblings to receive synchronized props.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "Find the Common Parent", desc: "Move state to the lowest component in the tree that encloses all consumers." },
        { title: "Single Source of Truth", desc: "Never duplicate the same state in multiple sibling components." },
        { title: "Pass State & Callbacks", desc: "Parent passes the data down to readers and the updater callback down to writers." },
      ],
      nextLessonPreview: {
        title: "REACT-10: Derived State vs Stored State",
        desc: "Learn why calculating values during render is far better than storing redundant state variables.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-10: Derived State vs Stored State
  // ─────────────────────────────────────────────────────────────
  "react10-derived-state-vs-stored-state": {
    slug: "react10-derived-state-vs-stored-state",
    code: "REACT-10",
    title: "Derived State: Calculating Values on the Fly",
    subtitle: "Avoid redundant state variables and out-of-sync bugs by calculating derived data during render.",
    sections: [
      { id: "part1", label: "What is Derived State?", icon: "💡" },
      { id: "part2", label: "The Redundant State Trap", icon: "⚠️" },
      { id: "part3", label: "How to Calculate on the Fly", icon: "🧮" },
      { id: "part4", label: "Redundant State vs Derived Calculation", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "What is Derived State?",
      bigPicture: "If you have a list of items `const [items, setItems] = useState([...])`, do you need a separate `const [itemCount, setItemCount] = useState(0)`? No! You can simply calculate `const itemCount = items.length` directly during render.",
      breakdownTitle: "The Rule of State Minimalism:",
      breakdownItems: [
        { title: "Don't Store What You Can Calculate", desc: "If a value can be computed from existing props or state, compute it on the fly during render." },
        { title: "Zero Sync Bugs", desc: "When `items` changes, `items.length` automatically updates during the next render with zero chance of going out of sync." },
        { title: "Fewer useState Calls", desc: "Keeps your component logic smaller, cleaner, and much easier to maintain." },
      ],
    },
    part2: {
      title: "The Redundant State Trap",
      intro: "Storing values that can be derived leads to messy synchronization headaches:",
      cards: [
        {
          number: "01",
          tag: "TRAP 1",
          title: "Full Name from First & Last",
          description: "Storing `firstName`, `lastName`, AND `fullName` requires updating 2 setters whenever a name changes.",
          color: "rose",
        },
        {
          number: "02",
          tag: "TRAP 2",
          title: "Filtered Lists in State",
          description: "Storing `todos` AND `filteredTodos` in state easily leads to filteredTodos containing deleted items.",
          color: "amber",
        },
        {
          number: "03",
          tag: "SOLUTION",
          title: "Calculate in the Function Body",
          description: "`const filtered = items.filter(...)` — fast, clean, and always 100% accurate on every render.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Ask Yourself This Question",
        content: "Can I calculate this value from existing props and state? If yes, DO NOT put it in useState.",
      },
    },
    part3: {
      title: "How to Compute Derived Values",
      intro: "Common real-world examples of clean derived calculations in React:",
      points: [
        {
          title: "Filtered Lists & Search Results",
          content: "Filter arrays directly during render based on the search query state.",
          codeSnippet: "const filteredUsers = users.filter(u => u.name.toLowerCase().includes(query.toLowerCase()));",
        },
        {
          title: "Totals and Summaries",
          content: "Use `.reduce()` to calculate cart totals and order counts directly.",
          codeSnippet: "const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);",
        },
        {
          title: "Selected Item Lookup",
          content: "Store only the `selectedId` in state, and find the item: `const selectedItem = items.find(i => i.id === selectedId);`.",
        },
      ],
    },
    part4: {
      title: "Redundant State vs Derived Calculation",
      bad: {
        title: "❌ Redundant State (Bug-Prone)",
        code: `function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // REDUNDANT!

  const addItem = (newItem) => {
    setItems([...items, newItem]);
    setTotalPrice(totalPrice + newItem.price); // Easily forgotten or desynced on delete!
  };
}`,
        explanation: "If an item is removed or updated and you forget to update totalPrice, the UI shows incorrect data.",
      },
      good: {
        title: "✅ Clean Derived Value (Always in Sync)",
        code: `function ShoppingCart() {
  const [items, setItems] = useState([]);

  // Computed freshly on every render: impossible to go out of sync!
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const itemCount = items.length;

  return <div>Total: \${totalPrice} ({itemCount} items)</div>;
}`,
        explanation: "totalPrice and itemCount are always 100% accurate with zero extra state management code.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Filtered User Search",
      intro: "Observe how the filtered list and match count are derived on the fly without any extra state variables:",
      starterCode: `// Derived State Demo
function UserDirectory() {
  const users = [
    { id: 1, name: "Alice Smith", role: "Engineering" },
    { id: 2, name: "Bob Jones", role: "Design" },
    { id: 3, name: "Charlie Brown", role: "Engineering" },
    { id: 4, name: "Diana Prince", role: "Product" },
  ];

  const [search, setSearch] = React.useState("");

  // Derived calculations: computed during render!
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );
  const resultCount = filteredUsers.length;

  return (
    <div style={{ padding: "16px", border: "1px solid #334155", borderRadius: "8px" }}>
      <input
        placeholder="Search by name or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "100%", borderRadius: "6px", marginBottom: "12px", border: "1px solid #475569" }}
      />
      <p style={{ color: "#94a3b8", fontSize: "14px" }}>Found {resultCount} matching users</p>
      <ul>
        {filteredUsers.map(u => (
          <li key={u.id}><strong>{u.name}</strong> — {u.role}</li>
        ))}
      </ul>
    </div>
  );
}

console.log("UserDirectory ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "Why should you calculate derived values (like `items.length` or `cartTotal`) on the fly rather than storing them in a separate useState?",
        options: [
          "React throws a compile error if you have more than 2 useState calls.",
          "Derived values calculated during render are always guaranteed to be in sync with the source data without duplicate setters.",
          "useState can only store boolean values, not numbers.",
          "Calculating during render sends an API request to the backend.",
        ],
        correctIndex: 1,
        explanation: "Computing values from existing state during render eliminates synchronization bugs and avoids unnecessary extra state setters.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "Minimize State", desc: "Only put truly irreducible, raw state into `useState`." },
        { title: "Calculate During Render", desc: "Derived filters, totals, counts, and formatted strings belong in plain local variables." },
        { title: "Zero Desync Bugs", desc: "When base state updates, all derived calculations update automatically in the same render." },
      ],
      nextLessonPreview: {
        title: "REACT-11: Conditional Rendering: Ternaries, && & Guard Clauses",
        desc: "Learn how to show and hide UI elements conditionally using if statements, ternaries, and logical AND.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-11: Conditional Rendering
  // ─────────────────────────────────────────────────────────────
  "react11-conditional-rendering": {
    slug: "react11-conditional-rendering",
    code: "REACT-11",
    title: "Conditional Rendering: Ternaries, && & Guard Clauses",
    subtitle: "Show and hide elements dynamically based on state using if statements, ternary operators, and logical AND.",
    sections: [
      { id: "part1", label: "Conditional UI Basics", icon: "💡" },
      { id: "part2", label: "The 3 Rendering Patterns", icon: "🔀" },
      { id: "part3", label: "The `0 && <UI />` Trap", icon: "⚠️" },
      { id: "part4", label: "Cluttered JSX vs Clean Guard Clauses", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Conditional UI Basics",
      bigPicture: "In web apps, you constantly need to display different things depending on conditions: show a spinner while loading, show an error banner if a request fails, or show an 'Admin Dashboard' link only if the user is an admin. In React, conditional rendering uses standard JavaScript logic.",
      breakdownTitle: "Core approaches to conditional rendering:",
      breakdownItems: [
        { title: "Ternary Operator `condition ? A : B`", desc: "Perfect for choosing between two different UI states (e.g. Login vs Logout button)." },
        { title: "Logical AND `condition && <UI />`", desc: "Perfect for rendering an element when true and nothing when false (e.g. notification badge)." },
        { title: "Early Return Guard Clauses", desc: "Return loading spinners or error messages early before rendering the main page layout." },
      ],
    },
    part2: {
      title: "The 3 Key Conditional Patterns",
      intro: "Choose the right tool for each UI scenario:",
      cards: [
        {
          number: "01",
          tag: "GUARD CLAUSE",
          title: "Early Return `if (loading) return ...`",
          description: "Cleanly stops rendering the rest of the component when in an early state like loading or error.",
          color: "purple",
        },
        {
          number: "02",
          tag: "BINARY CHOICE",
          title: "Ternary `isLoggedIn ? <User /> : <Guest />`",
          description: "Renders alternative UI seamlessly inside JSX markup.",
          color: "cyan",
        },
        {
          number: "03",
          tag: "SHOW / HIDE",
          title: "Logical AND `hasUnread && <Badge />`",
          description: "Renders the right-hand element only if the condition on the left is truthy.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Returning null in React",
        content: "If a component returns `null`, React renders nothing at all to the DOM without throwing any errors.",
      },
    },
    part3: {
      title: "The `0 && <UI />` Number Bug",
      intro: "A classic React trap when using the logical `&&` operator with numbers:",
      points: [
        {
          title: "JavaScript Falsy Evaluation",
          content: "In JavaScript, `0 && <Badge />` evaluates to the number `0`! React will literally render the text '0' onto your webpage instead of nothing.",
        },
        {
          title: "The Safe Fix: Convert to Boolean",
          content: "Always ensure the left side is a true boolean: `messages.length > 0 && <Badge />` or `Boolean(count) && <Badge />`.",
          codeSnippet: "// UNSAFE: renders '0' if items is empty\n{items.length && <List />}\n\n// SAFE: renders nothing if items is empty\n{items.length > 0 && <List />}",
        },
      ],
    },
    part4: {
      title: "Cluttered Nested Ternaries vs Clean Early Returns",
      bad: {
        title: "❌ Deeply Nested Ternaries (Hard to Read)",
        code: `// Unreadable spaghetti JSX
function UserProfile({ loading, error, user }) {
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading profile!</p>
      ) : user ? (
        <div><h2>{user.name}</h2></div>
      ) : null}
    </div>
  );
}`,
        explanation: "Chaining 3+ ternaries inside JSX makes code impossible to scan and maintain.",
      },
      good: {
        title: "✅ Clean Early Returns (Guard Clauses)",
        code: `// Clean, readable guard clauses at the top
function UserProfile({ loading, error, user }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile!</p>;
  if (!user) return <p>No user found.</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}`,
        explanation: "Each state is handled cleanly with early returns, leaving the main JSX clear and focused.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Tab Navigation",
      intro: "Experiment with rendering different views based on the active tab state:",
      starterCode: `// Conditional Rendering Demo
function TabbedInterface() {
  const [activeTab, setActiveTab] = React.useState("overview");

  return (
    <div style={{ padding: "16px", border: "1px solid #334155", borderRadius: "8px" }}>
      {/* Navigation Buttons */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <button
          onClick={() => setActiveTab("overview")}
          style={{ padding: "6px 12px", background: activeTab === "overview" ? "#7c3aed" : "#334155", color: "#fff", border: "none", borderRadius: "4px" }}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          style={{ padding: "6px 12px", background: activeTab === "settings" ? "#7c3aed" : "#334155", color: "#fff", border: "none", borderRadius: "4px" }}
        >
          Settings
        </button>
      </div>

      {/* Conditional Content */}
      {activeTab === "overview" && (
        <div>
          <h4>📊 Project Overview</h4>
          <p>LearnCraft React Curriculum is 100% on track.</p>
        </div>
      )}

      {activeTab === "settings" && (
        <div>
          <h4>⚙️ Account Settings</h4>
          <label><input type="checkbox" defaultChecked /> Enable email notifications</label>
        </div>
      )}
    </div>
  );
}

console.log("TabbedInterface ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "What will render on screen if you write `{unreadCount && <Badge />}` when `unreadCount` is 0?",
        options: [
          "Nothing will render on screen.",
          "The number '0' will literally appear as text on the webpage.",
          "React will throw an unhandled exception.",
          "The Badge component will render with empty text.",
        ],
        correctIndex: 1,
        explanation: "In JavaScript, `0 && <Badge />` evaluates to the number `0`. React renders valid numbers to the screen, so '0' will be displayed. Use `{unreadCount > 0 && <Badge />}` instead.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "Use Early Returns for Loading/Errors", desc: "Handle edge cases early before rendering main component JSX." },
        { title: "Use Ternaries for A/B Choices", desc: "`isLoggedIn ? <Dashboard /> : <Login />` cleanly handles binary states." },
        { title: "Watch the 0 && Bug", desc: "Always make sure the left side of `&&` is an explicit boolean (e.g. `items.length > 0`)." },
      ],
      nextLessonPreview: {
        title: "REACT-12: Rendering Lists with map() & Why Keys Matter",
        desc: "Transform JavaScript arrays into UI lists and master the critical role of unique, stable keys.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-12: Lists & Keys
  // ─────────────────────────────────────────────────────────────
  "react12-rendering-lists-and-keys": {
    slug: "react12-rendering-lists-and-keys",
    code: "REACT-12",
    title: "Rendering Lists with map() & Why Keys Matter",
    subtitle: "Transform data arrays into dynamic JSX lists and master unique, stable keys to prevent DOM corruption.",
    sections: [
      { id: "part1", label: "Rendering Arrays with map()", icon: "💡" },
      { id: "part2", label: "Why Keys Matter", icon: "🔑" },
      { id: "part3", label: "The Array Index Pitfall", icon: "⚠️" },
      { id: "part4", label: "Index as Key vs Unique ID", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Rendering Arrays with map()",
      bigPicture: "Modern web apps display collections of data: todo items, products, comments, chat messages. In React, you don't write manual `for` loops inside JSX; you use JavaScript's built-in array method `.map()` to transform each data object into a JSX element.",
      breakdownTitle: "The map() Pattern:",
      breakdownItems: [
        { title: "1-to-1 Transformation", desc: "`.map(item => <li key={item.id}>{item.title}</li>)` transforms an array of data into an array of JSX elements." },
        { title: "Inline or Variable", desc: "You can embed `.map()` directly inside JSX using curly braces `{items.map(...)}`." },
        { title: "Empty States", desc: "Pair with conditional rendering: `items.length === 0 ? <EmptyState /> : items.map(...)`." },
      ],
    },
    part2: {
      title: "Why Keys Matter to React",
      intro: "Keys give each list element a stable identity between renders:",
      cards: [
        {
          number: "01",
          tag: "IDENTITY",
          title: "Tracking Items Across Renders",
          description: "When items are added, deleted, or reordered, keys tell React exactly which item moved where without re-rendering the whole list.",
          color: "purple",
        },
        {
          number: "02",
          tag: "PERFORMANCE",
          title: "Minimal DOM Mutations",
          description: "With stable keys, inserting an item at the top only inserts one DOM node instead of rebuilding all existing list items.",
          color: "cyan",
        },
        {
          number: "03",
          tag: "STATE PRESERVATION",
          title: "Preserving Internal State",
          description: "Ensures checkboxes, text inputs, and animations stay attached to the correct data item when the list reorders.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Key Placement Rule",
        content: "The `key` attribute must always be placed on the outermost JSX element returned directly inside the `.map()` callback.",
      },
    },
    part3: {
      title: "The Array Index as Key Pitfall",
      intro: "Why you should avoid using the array index `key={index}` when items can reorder, insert, or delete:",
      points: [
        {
          title: "What Happens on Delete / Insert",
          content: "If you delete the first item, the item that was second now gets index 0. React thinks the first item updated its text, rather than knowing item #1 was removed!",
        },
        {
          title: "Input Corruption Bug",
          content: "If list items contain uncontrolled inputs or checkboxes, the checked state will stay on index 0, corrupting the wrong item's UI.",
        },
        {
          title: "When is Index OK?",
          content: "Only when the list is 100% static: it is never reordered, filtered, or mutated in any way.",
        },
      ],
    },
    part4: {
      title: "Array Index as Key vs Unique ID",
      bad: {
        title: "❌ Using Index as Key (Corrupts on Reorder)",
        code: `// Bad: Using index as key in a dynamic, deletable list
function TodoList({ todos, onDelete }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        // Bug: If first item is deleted, remaining items shift indices!
        <li key={index}>
          <input type="checkbox" />
          <span>{todo.text}</span>
          <button onClick={() => onDelete(todo.id)}>✕</button>
        </li>
      ))}
    </ul>
  );
}`,
        explanation: "Deleting the top item leaves the top checkbox checked because React matches elements by index 0.",
      },
      good: {
        title: "✅ Using Unique Stable ID (Rock-Solid)",
        code: `// Good: Using stable unique database ID as key
function TodoList({ todos, onDelete }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input type="checkbox" />
          <span>{todo.text}</span>
          <button onClick={() => onDelete(todo.id)}>✕</button>
        </li>
      ))}
    </ul>
  );
}`,
        explanation: "React precisely tracks each item by its unique ID. Deleting, sorting, and inserting work flawlessly.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Dynamic Todo List with Keys",
      intro: "Inspect how adding and deleting items works smoothly with unique timestamp IDs:",
      starterCode: `// List Rendering Demo
function TaskList() {
  const [tasks, setTasks] = React.useState([
    { id: "t1", text: "Master React JSX", done: true },
    { id: "t2", text: "Understand Keys in Lists", done: false },
    { id: "t3", text: "Build Capstone Dashboard", done: false },
  ]);

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={{ padding: "16px", border: "1px solid #334155", borderRadius: "8px" }}>
      <h3>Task Checklist ({tasks.length})</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map(task => (
          <li
            key={task.id}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", borderBottom: "1px solid #1e293b" }}
          >
            <span style={{ textDecoration: task.done ? "line-through" : "none", color: task.done ? "#64748b" : "#f8fafc" }}>
              {task.done ? "✓" : "○"} {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              style={{ background: "#f87171", border: "none", color: "#fff", padding: "2px 8px", borderRadius: "4px", cursor: "pointer" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

console.log("TaskList ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "Why does React require a unique 'key' prop on elements rendered inside an array .map()?",
        options: [
          "Keys are required by CSS for applying grid styling.",
          "Keys identify each item between renders so React knows which items were added, removed, or reordered.",
          "Keys automatically encrypt data before sending it to the server.",
          "Without keys, the map function cannot execute in JavaScript.",
        ],
        correctIndex: 1,
        explanation: "Keys provide a stable identity so React can efficiently update only the changed items in the DOM without corrupting component state.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "Use .map() for Lists", desc: "Transform data arrays directly into JSX elements inside `{data.map(...)}`." },
        { title: "Keys Must Be Unique & Stable", desc: "Use database IDs (e.g. `item.id`). Avoid generating random numbers during render." },
        { title: "Avoid Array Index as Key", desc: "Indices shift when items are deleted or sorted, causing UI state bugs." },
      ],
      nextLessonPreview: {
        title: "REACT-13: Controlled Inputs & Handling User Forms",
        desc: "Connect text fields, selects, and checkboxes directly to React state for seamless form handling.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-13: Forms & Controlled Inputs
  // ─────────────────────────────────────────────────────────────
  "react13-controlled-inputs-and-forms": {
    slug: "react13-controlled-inputs-and-forms",
    code: "REACT-13",
    title: "Controlled Inputs & Handling User Forms",
    subtitle: "Bind form inputs to React state, handle onSubmit, validate fields, and reset forms cleanly.",
    sections: [
      { id: "part1", label: "What is a Controlled Input?", icon: "💡" },
      { id: "part2", label: "The Controlled Input Pattern", icon: "✍️" },
      { id: "part3", label: "Handling Multiple Inputs", icon: "📋" },
      { id: "part4", label: "Uncontrolled DOM vs Controlled State", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "What is a Controlled Input?",
      bigPicture: "In standard HTML, an `<input />` holds its own internal state in the DOM. In React, a controlled input has its value driven by React state: React tells the input what to show (`value={text}`), and when the user types, the input tells React to update state (`onChange={e => setText(e.target.value)}`).",
      breakdownTitle: "Benefits of Controlled Inputs:",
      breakdownItems: [
        { title: "Single Source of Truth", desc: "Your React state always knows the exact text in every input at all times." },
        { title: "Instant Validation", desc: "Validate email formats, passwords, or character limits live as the user types." },
        { title: "Easy Reset & Submission", desc: "Clear a form by simply setting state back to initial values (`setText('')`)." },
      ],
    },
    part2: {
      title: "The 2 Ingredients of a Controlled Input",
      intro: "A controlled input requires two props wired together:",
      cards: [
        {
          number: "01",
          tag: "VALUE",
          title: "1. `value={state}`",
          description: "Passes the current state value into the input. The input displays whatever is in state.",
          color: "purple",
        },
        {
          number: "02",
          tag: "ONCHANGE",
          title: "2. `onChange={e => setState(...)}`",
          description: "Listens for user keystrokes and updates state with `e.target.value` immediately.",
          color: "cyan",
        },
        {
          number: "03",
          tag: "ONSUBMIT",
          title: "3. `onSubmit={handleSubmit}`",
          description: "Placed on the `<form>` tag; calls `e.preventDefault()` to stop full-page browser reloads.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Never Pass undefined as value",
        content: "If `value` starts as `undefined` and becomes a string, React warns about an input switching from uncontrolled to controlled. Always initialize state with an empty string `useState('')`.",
      },
    },
    part3: {
      title: "Handling Checkboxes and Selects",
      intro: "Different input types use slightly different properties:",
      points: [
        {
          title: "Checkboxes use `checked`",
          content: "For checkboxes, bind `checked={agreed}` and update with `e.target.checked` (a boolean).",
          codeSnippet: "<input type='checkbox' checked={agreed} onChange={e => setAgreed(e.target.checked)} />",
        },
        {
          title: "Select Dropdowns",
          content: "Bind `value={category}` and `onChange={e => setCategory(e.target.value)}` on the `<select>` tag itself, not the `<option>` tags.",
        },
        {
          title: "Object State for Multi-Input Forms",
          content: "Manage multiple fields in one state object using computed property names: `setForm({ ...form, [e.target.name]: e.target.value })`.",
        },
      ],
    },
    part4: {
      title: "Uncontrolled DOM Scraping vs Controlled React State",
      bad: {
        title: "❌ Uncontrolled DOM Scraping (Fragile)",
        code: `// Bad: Querying the DOM on submission
function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Reaching into DOM manually
    const email = document.getElementById("email-input").value;
    const pass = document.getElementById("pass-input").value;
    console.log(email, pass);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input id="email-input" />
      <input id="pass-input" type="password" />
      <button type="submit">Log In</button>
    </form>
  );
}`,
        explanation: "No instant validation, fragile element ID dependencies, and bypasses React's state management.",
      },
      good: {
        title: "✅ Controlled State (Clean & Validated)",
        code: `// Good: Inputs bound to React state
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", { email, password });
    setEmail("");
    setPassword(""); // Clean reset!
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
      <button type="submit">Log In</button>
    </form>
  );
}`,
        explanation: "React controls the input values, enabling clean validation, disable states, and simple form resets.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Controlled Registration Form",
      intro: "Test live validation and form resetting with controlled inputs:",
      starterCode: `// Controlled Form Demo
function RegisterForm() {
  const [username, setUsername] = React.useState("");
  const [role, setRole] = React.useState("developer");
  const [terms, setTerms] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return alert("Username required!");
    setSubmitted({ username, role, terms });
  };

  return (
    <div style={{ padding: "16px", border: "1px solid #334155", borderRadius: "8px", maxWidth: "340px" }}>
      <h3>Create Account</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", fontSize: "12px" }}>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "6px", borderRadius: "4px", border: "1px solid #475569" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", fontSize: "12px" }}>Primary Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: "6px", borderRadius: "4px", border: "1px solid #475569" }}
          >
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Product Manager</option>
          </select>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontSize: "13px" }}>
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              style={{ marginRight: "6px" }}
            />
            Agree to terms
          </label>
        </div>

        <button
          type="submit"
          disabled={!terms || !username.trim()}
          style={{ padding: "8px 16px", width: "100%", borderRadius: "6px", background: terms ? "#7c3aed" : "#475569", color: "#fff", border: "none", cursor: terms ? "pointer" : "not-allowed" }}
        >
          Sign Up
        </button>
      </form>

      {submitted && (
        <div style={{ marginTop: "12px", padding: "8px", background: "#064e3b", borderRadius: "4px", fontSize: "12px" }}>
          ✓ Registered {submitted.username} ({submitted.role})!
        </div>
      )}
    </div>
  );
}

console.log("RegisterForm ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "Why must you call `e.preventDefault()` inside a form's onSubmit event handler in React?",
        options: [
          "To convert input values from strings into JSON objects.",
          "To prevent the browser's default behavior of reloading the entire web page on form submit.",
          "To disable the submit button permanently.",
          "To delete the input values from state.",
        ],
        correctIndex: 1,
        explanation: "By default, browsers refresh the page on `<form>` submission. Calling `e.preventDefault()` lets your React JavaScript code handle the submission seamlessly.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "value + onChange = Controlled", desc: "Bind the input value to state and update state on change events." },
        { title: "Always Call e.preventDefault()", desc: "Stop form submissions from triggering a full browser page refresh." },
        { title: "Initialize with Empty Strings", desc: "Avoid `undefined` to prevent 'uncontrolled to controlled' warnings." },
      ],
      nextLessonPreview: {
        title: "REACT-14: useEffect: Synchronizing with External Systems",
        desc: "Learn when and why Effects are needed to connect your components with browser APIs and networks.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-14: useEffect Fundamentals
  // ─────────────────────────────────────────────────────────────
  "react14-useeffect-fundamentals": {
    slug: "react14-useeffect-fundamentals",
    code: "REACT-14",
    title: "useEffect: Synchronizing with External Systems",
    subtitle: "Understand what side effects are, when to use useEffect, and how the dependency array controls execution.",
    sections: [
      { id: "part1", label: "What is an Effect?", icon: "💡" },
      { id: "part2", label: "The Dependency Array", icon: "📦" },
      { id: "part3", label: "When You DON'T Need an Effect", icon: "🚫" },
      { id: "part4", label: "Unnecessary Effect vs Derived Calculation", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "What is an Effect?",
      bigPicture: "A React component's main job is to calculate JSX during render. But sometimes your component needs to do something outside React — such as setting the browser document title, starting a timer, listening to window resize events, or fetching data from a network. These are called Side Effects, and `useEffect` is how you run them safely after rendering.",
      breakdownTitle: "The Lifecycle of an Effect:",
      breakdownItems: [
        { title: "Runs After Render", desc: "React renders your UI first so the user sees content immediately, then runs your Effect function." },
        { title: "Synchronizes with Outside Systems", desc: "Connects your component to browser APIs, analytics, or external subscriptions." },
        { title: "Controlled by Dependencies", desc: "The dependency array tells React exactly when to re-run your Effect." },
      ],
    },
    part2: {
      title: "The 3 Dependency Array Modes",
      intro: "The second argument to `useEffect` determines how often it runs:",
      cards: [
        {
          number: "01",
          tag: "NO ARRAY",
          title: "1. No Dependency Array",
          description: "`useEffect(() => { ... })` — Runs after EVERY single render. Rarely what you want.",
          color: "rose",
        },
        {
          number: "02",
          tag: "EMPTY ARRAY",
          title: "2. Empty Array `[]`",
          description: "`useEffect(() => { ... }, [])` — Runs ONLY ONCE when the component first mounts on screen.",
          color: "emerald",
        },
        {
          number: "03",
          tag: "WITH DEPS",
          title: "3. With Dependencies `[prop, state]`",
          description: "`useEffect(() => { ... }, [roomId])` — Runs on mount AND whenever any listed dependency value changes.",
          color: "purple",
        },
      ],
      rule: {
        title: "The Dependency Rule",
        content: "Every reactive value (props, state, or variables derived from them) referenced inside your Effect MUST be included in the dependency array.",
      },
    },
    part3: {
      title: "When You DON'T Need an Effect",
      intro: "Modern React best practice: many things beginners put in `useEffect` should NOT be in an Effect at all:",
      points: [
        {
          title: "Transforming Data for Render",
          content: "DO NOT use an Effect to filter or calculate state. Calculate it directly in the component body (Derived State).",
        },
        {
          title: "Handling User Events",
          content: "DO NOT put 'send purchase request' inside an Effect that watches state. Put it directly in the button's `onClick` event handler.",
        },
        {
          title: "Resetting State on Prop Change",
          content: "DO NOT use an Effect to reset state when an ID changes. Use a unique `key` prop instead (covered in REACT-19).",
        },
      ],
    },
    part4: {
      title: "Unnecessary Effect vs Clean Event Handler",
      bad: {
        title: "❌ Unnecessary Effect for Form Submission",
        code: `// Bad: Using an Effect to trigger an action on state change
function BuyButton() {
  const [bought, setBought] = useState(false);

  useEffect(() => {
    if (bought) {
      sendAnalyticsEvent("Purchase");
      postOrderToApi();
    }
  }, [bought]); // Disconnected from the actual user click!

  return <button onClick={() => setBought(true)}>Buy Now</button>;
}`,
        explanation: "Effects should synchronize, not handle user click actions. Put action logic directly in the event handler.",
      },
      good: {
        title: "✅ Direct Event Handler (Clear & Intentional)",
        code: `// Good: Event logic stays in the event handler
function BuyButton() {
  const handleBuy = async () => {
    sendAnalyticsEvent("Purchase");
    await postOrderToApi();
  };

  return <button onClick={handleBuy}>Buy Now</button>;
}`,
        explanation: "The purchase action runs directly when the user clicks the button. Clean and easy to reason about.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Document Title Synchronizer",
      intro: "See how useEffect synchronizes the browser tab's document title whenever the count changes:",
      starterCode: `// useEffect Synchronization Demo
function TitleSynchronizer() {
  const [unreadCount, setUnreadCount] = React.useState(3);

  // Synchronize with external browser API: document.title
  React.useEffect(() => {
    document.title = unreadCount > 0 ? \`(\${unreadCount}) LearnCraft Inbox\` : "LearnCraft Inbox";
    console.log("Effect executed: document.title updated to", document.title);
  }, [unreadCount]); // Re-runs ONLY when unreadCount changes

  return (
    <div style={{ padding: "16px", border: "1px solid #334155", borderRadius: "8px" }}>
      <h3>Unread Messages: {unreadCount}</h3>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => setUnreadCount(prev => prev + 1)}>Receive Message (+1)</button>
        <button onClick={() => setUnreadCount(0)}>Mark All Read</button>
      </div>
    </div>
  );
}

console.log("TitleSynchronizer ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "When does a `useEffect` with an empty dependency array `[]` run?",
        options: [
          "It runs before every single state change.",
          "It runs once after the component first mounts to the screen.",
          "It runs continuously every millisecond.",
          "It never runs at all.",
        ],
        correctIndex: 1,
        explanation: "An empty dependency array `[]` tells React that this Effect has no dependencies, so it runs only once when the component initially mounts.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "Effects are for Synchronization", desc: "Use `useEffect` when your component needs to sync with external systems (APIs, document, timers)." },
        { title: "Control with Dependencies", desc: "Pass `[dep1, dep2]` to re-run only when specific reactive values change." },
        { title: "Don't Overuse Effects", desc: "Handle user click actions in event handlers and calculate derived data during render." },
      ],
      nextLessonPreview: {
        title: "REACT-15: Effect Cleanups, Subscriptions & Common Traps",
        desc: "Learn how cleanup functions prevent memory leaks, timer bugs, and infinite render loops.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-15: Effect Cleanup & Mistakes
  // ─────────────────────────────────────────────────────────────
  "react15-effect-cleanup-and-mistakes": {
    slug: "react15-effect-cleanup-and-mistakes",
    code: "REACT-15",
    title: "Effect Cleanups, Subscriptions & Common Traps",
    subtitle: "Return cleanup functions to cancel timers and listeners, and avoid infinite render loops.",
    sections: [
      { id: "part1", label: "Why Effects Need Cleanups", icon: "💡" },
      { id: "part2", label: "How Cleanup Works", icon: "🧹" },
      { id: "part3", label: "The Infinite Render Loop Trap", icon: "♾️" },
      { id: "part4", label: "Missing Cleanup vs Clean Cleanup", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Why Effects Need Cleanups",
      bigPicture: "If your Effect starts a `setInterval` timer, subscribes to a WebSocket, or adds a `window.addEventListener('resize')`, what happens when the user navigates away and the component unmounts? If you don't clean it up, the timer or listener keeps running in the background forever, causing memory leaks and crashes.",
      breakdownTitle: "The Cleanup Function Solution:",
      breakdownItems: [
        { title: "Return a Function", desc: "If you return a function from `useEffect`, React will call that function whenever it's time to clean up." },
        { title: "Runs on Unmount", desc: "When the component leaves the screen, React runs your cleanup function to cancel active connections." },
        { title: "Runs Before Next Effect", desc: "Before running the Effect again with new dependencies, React cleans up the previous execution." },
      ],
    },
    part2: {
      title: "Common Scenarios Requiring Cleanup",
      intro: "Whenever an Effect starts an ongoing process, return a cleanup function:",
      cards: [
        {
          number: "01",
          tag: "TIMERS",
          title: "Timers (`setInterval` / `setTimeout`)",
          description: "`const id = setInterval(...); return () => clearInterval(id);` — prevents runaway timers.",
          color: "purple",
        },
        {
          number: "02",
          tag: "DOM LISTENERS",
          title: "Global Event Listeners",
          description: "`window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn);`",
          color: "cyan",
        },
        {
          number: "03",
          tag: "CONNECTIONS",
          title: "Sockets & Observers",
          description: "`socket.connect(); return () => socket.disconnect();` — clean connection teardown.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Setup and Teardown Symmetry",
        content: "Whatever your Effect sets up (addListener, startTimer, openSocket), your cleanup function must tear down (removeListener, clearTimer, closeSocket).",
      },
    },
    part3: {
      title: "The Infinite Render Loop Trap",
      intro: "How developers accidentally create infinite loops with `useEffect`:",
      points: [
        {
          title: "Updating State Without Dependencies",
          content: "If your Effect calls `setCount(count + 1)` and has no dependency array, it runs after render → sets state → triggers re-render → runs Effect again → infinite loop!",
        },
        {
          title: "Creating Objects Inside Render",
          content: "If you pass an object literal `options = { id: 1 }` as a dependency, the object gets a new memory reference on every render, causing the Effect to run continuously.",
        },
        {
          title: "The Fix",
          content: "Always provide accurate dependency arrays, and move static objects outside the component or use primitive dependencies.",
        },
      ],
    },
    part4: {
      title: "Missing Cleanup vs Clean Effect Cleanup",
      bad: {
        title: "❌ Missing Cleanup (Leaking Window Listener)",
        code: `function WindowTracker() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    // BUG: Missing return () => window.removeEventListener!
    // Every time this mounts/unmounts, an orphaned listener is added.
  }, []);

  return <p>Window Width: {width}px</p>;
}`,
        explanation: "When the component unmounts, the resize listener remains active in the browser memory forever.",
      },
      good: {
        title: "✅ Symmetrical Cleanup (No Leaks)",
        code: `function WindowTracker() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Clean teardown when unmounting:
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <p>Window Width: {width}px</p>;
}`,
        explanation: "The cleanup function removes the listener when unmounting, leaving zero lingering memory leaks.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Interval Stopwatch with Cleanup",
      intro: "Inspect how the timer stops and cleans up interval memory when paused:",
      starterCode: `// Effect Cleanup Demo: Stopwatch
function Timer() {
  const [seconds, setSeconds] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    if (!isActive) return;

    // Start timer interval
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // CRITICAL: Cleanup function cancels timer when paused or unmounted
    return () => {
      clearInterval(intervalId);
      console.log("Cleanup: interval cleared.");
    };
  }, [isActive]);

  return (
    <div style={{ padding: "16px", border: "1px solid #334155", borderRadius: "8px" }}>
      <h3>⏱️ Timer: {seconds}s</h3>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => setIsActive(!isActive)}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button onClick={() => { setIsActive(false); setSeconds(0); }}>
          Reset
        </button>
      </div>
    </div>
  );
}

console.log("Timer component ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "What is the purpose of returning a function from inside a `useEffect` callback?",
        options: [
          "It tells React to run the Effect twice on every render.",
          "It defines a cleanup function that React executes before re-running the Effect or when unmounting the component.",
          "It formats the return value as a JSON object.",
          "It forces the browser to reload all CSS files.",
        ],
        correctIndex: 1,
        explanation: "The returned function is a cleanup handler that React runs to tear down subscriptions, cancel timers, or remove event listeners before the next effect or on unmount.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "Clean Up Side Effects", desc: "Return a cleanup function to cancel intervals, abort fetches, and remove listeners." },
        { title: "Avoid Infinite Loops", desc: "Never update state inside an Effect without a proper dependency array." },
        { title: "Symmetrical Teardown", desc: "Every `addEventListener` or `subscribe` must have a corresponding `removeEventListener` or `unsubscribe`." },
      ],
      nextLessonPreview: {
        title: "REACT-16: useRef: Retaining Values Without Re-rendering & DOM Access",
        desc: "Learn how useRef stores mutable values without triggering re-renders and provides direct access to DOM nodes.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-16: useRef & DOM Access
  // ─────────────────────────────────────────────────────────────
  "react16-useref-and-dom-access": {
    slug: "react16-useref-and-dom-access",
    code: "REACT-16",
    title: "useRef: Retaining Values Without Re-rendering & DOM Access",
    subtitle: "Store mutable values that survive renders without triggering re-renders, and access real DOM elements.",
    sections: [
      { id: "part1", label: "What is useRef?", icon: "💡" },
      { id: "part2", label: "useRef vs useState", icon: "⚖️" },
      { id: "part3", label: "Accessing Real DOM Elements", icon: "🎯" },
      { id: "part4", label: "Misusing State vs useRef", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "What is useRef?",
      bigPicture: "Think of `useRef` as a secret pocket inside your component. You can put any value inside `ref.current` and change it whenever you want. Changing a ref does NOT cause the component to re-render. It is also the standard tool to grab a direct reference to a real browser DOM element (like an `<input />` or `<video />`).",
      breakdownTitle: "Two Primary Use Cases of useRef:",
      breakdownItems: [
        { title: "Storing Mutable Values", desc: "Store timer IDs, previous state values, or flag variables without triggering re-renders." },
        { title: "Direct DOM Access", desc: "Focus an input, scroll a container into view, or measure element dimensions." },
        { title: "Persists Across Renders", desc: "Just like state, the value inside `ref.current` survives multiple renders." },
      ],
    },
    part2: {
      title: "useRef vs useState: When to Use Which",
      intro: "Understanding the difference between state and refs:",
      cards: [
        {
          number: "01",
          tag: "STATE",
          title: "useState (Visual Data)",
          description: "Use when data appears on screen. Changing state triggers a re-render so the user sees the new data.",
          color: "purple",
        },
        {
          number: "02",
          tag: "REF",
          title: "useRef (Behind-the-Scenes Data)",
          description: "Use for internal values (timer IDs, click counts, DOM nodes) where updating it should NOT trigger a re-render.",
          color: "emerald",
        },
        {
          number: "03",
          tag: "MUTABILITY",
          title: "Direct Mutation Allowed",
          description: "Unlike state, you can directly mutate `ref.current = newValue` at any time.",
          color: "cyan",
        },
      ],
      rule: {
        title: "Do Not Read / Write ref.current During Render",
        content: "Only read or modify `ref.current` inside event handlers or `useEffect`. Reading/writing it during JSX render makes UI unpredictable.",
      },
    },
    part3: {
      title: "Direct DOM Manipulation via `ref` Attribute",
      intro: "How to connect a ref to a real browser DOM node:",
      points: [
        {
          title: "1. Create the Ref",
          content: "`const inputRef = useRef(null);` — initialize with null.",
        },
        {
          title: "2. Attach to JSX Element",
          content: "`<input ref={inputRef} />` — React automatically sets `inputRef.current` to the real DOM `<input>` element on mount.",
        },
        {
          title: "3. Call DOM Methods",
          content: "`inputRef.current.focus()` or `inputRef.current.scrollIntoView()` inside event handlers.",
          codeSnippet: "const handleFocus = () => {\n  inputRef.current.focus();\n};",
        },
      ],
    },
    part4: {
      title: "Misusing State for Timer IDs vs useRef",
      bad: {
        title: "❌ Storing Timer ID in useState (Causes Extra Renders)",
        code: `function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(null); // UNNECESSARY STATE!

  const start = () => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    setTimerId(id); // Triggers an unwanted extra re-render just to store a number!
  };
}`,
        explanation: "Storing internal IDs in state triggers useless re-renders since the timer ID is never displayed on screen.",
      },
      good: {
        title: "✅ Storing Timer ID in useRef (Silent & Clean)",
        code: `function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null); // Silent internal storage

  const start = () => {
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  };

  const stop = () => {
    clearInterval(timerRef.current);
  };
}`,
        explanation: "useRef holds the interval ID cleanly across renders without causing any extra re-render overhead.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Programmatic Input Focus",
      intro: "See how clicking the 'Search' button programmatically focuses the input element via useRef:",
      starterCode: `// useRef DOM Access Demo
function SearchBarWithFocus() {
  const inputRef = React.useRef(null);

  const handleFocusClick = () => {
    // Directly call browser DOM focus method
    inputRef.current.focus();
    inputRef.current.style.borderColor = "#7c3aed";
  };

  return (
    <div style={{ padding: "16px", border: "1px solid #334155", borderRadius: "8px" }}>
      <h3>Quick Search</h3>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          ref={inputRef}
          placeholder="Click button to focus me..."
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #475569", flex: 1 }}
        />
        <button
          onClick={handleFocusClick}
          style={{ padding: "8px 16px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          🔍 Focus Input
        </button>
      </div>
    </div>
  );
}

console.log("SearchBarWithFocus ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "What is the key difference between modifying a state variable via `setState` vs modifying a ref via `ref.current = newValue`?",
        options: [
          "Modifying state triggers a component re-render, whereas modifying ref.current does NOT trigger a re-render.",
          "State is deleted on every render, while refs survive across page reloads.",
          "refs can only store HTML strings, while state can store objects.",
          "useRef only works on mobile devices.",
        ],
        correctIndex: 0,
        explanation: "Modifying `ref.current` mutates the value silently without scheduling a re-render, making it ideal for internal IDs and DOM references.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "useRef Holds Mutable Data", desc: "Store internal values (timer IDs, flags) without triggering unwanted re-renders." },
        { title: "Direct DOM Access", desc: "Attach `<input ref={myRef} />` to access real DOM nodes for focus, scroll, and measurements." },
        { title: "Don't Read/Write in JSX", desc: "Access `ref.current` inside event handlers and `useEffect`, not during JSX render." },
      ],
      nextLessonPreview: {
        title: "REACT-17: useContext: Sharing Global Context Without Prop Drilling",
        desc: "Learn how React Context teleports data across deep component trees without tedious prop drilling.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-17: useContext & Shared State
  // ─────────────────────────────────────────────────────────────
  "react17-usecontext-and-shared-state": {
    slug: "react17-usecontext-and-shared-state",
    code: "REACT-17",
    title: "useContext: Sharing Global Context Without Prop Drilling",
    subtitle: "Share application theme, authentication, or language settings deeply across component trees without prop drilling.",
    sections: [
      { id: "part1", label: "The Prop Drilling Problem", icon: "💡" },
      { id: "part2", label: "The 3 Context Steps", icon: "📡" },
      { id: "part3", label: "When to Use Context", icon: "⚖️" },
      { id: "part4", label: "Prop Drilling vs useContext", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "The Prop Drilling Problem",
      bigPicture: "Imagine your top-level `<App />` has user authentication info or a dark mode theme setting. If a deep child component `<UserAvatar />` (5 levels down) needs that user info, you have to pass `user={user}` through `<Layout>`, `<Header>`, `<Navbar>`, and `<ProfileDropdown>` even though none of those intermediate components care about it. This tedious passing is called 'prop drilling.'",
      breakdownTitle: "Context acts as a direct teleporter:",
      breakdownItems: [
        { title: "Broadcasts Data", desc: "The parent provides data to the entire component subtree underneath it." },
        { title: "Direct Consumption", desc: "Any child at any depth can directly call `useContext()` to read the data without intermediate props." },
        { title: "Automatic Updates", desc: "When the provided value changes, all consuming components re-render with the new data." },
      ],
    },
    part2: {
      title: "The 3 Steps to Using Context",
      intro: "Creating and consuming a React Context in 3 simple steps:",
      cards: [
        {
          number: "01",
          tag: "CREATE",
          title: "1. Create Context",
          description: "`const ThemeContext = React.createContext('light');` — create the context object outside components.",
          color: "purple",
        },
        {
          number: "02",
          tag: "PROVIDE",
          title: "2. Wrap with Provider",
          description: "`<ThemeContext.Provider value={theme}>` — wraps your tree and broadcasts the current value.",
          color: "cyan",
        },
        {
          number: "03",
          tag: "CONSUME",
          title: "3. Read with useContext",
          description: "`const theme = useContext(ThemeContext);` — any nested child reads the value directly.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Default Fallback Value",
        content: "The argument passed to `createContext(defaultValue)` is only used if a component calls `useContext` outside any matching Provider.",
      },
    },
    part3: {
      title: "When Context is Useful (and When It's Not)",
      intro: "Context is powerful, but shouldn't be used for everything:",
      points: [
        {
          title: "Great For: Global App Settings",
          content: "Current theme (dark/light), logged-in user session, localization language, and global notification toasts.",
        },
        {
          title: "Bad For: Highly Dynamic Local State",
          content: "Do not put text input keystrokes in Context. Every time the context value changes, all consuming components re-render.",
        },
        {
          title: "Consider Component Composition First",
          content: "Before reaching for Context, consider passing `<UserAvatar user={user} />` as a `children` prop (slot composition) down through Layout.",
        },
      ],
    },
    part4: {
      title: "Tedious Prop Drilling vs Clean useContext",
      bad: {
        title: "❌ Prop Drilling Through 4 Layers",
        code: `// Bad: Passing theme through components that don't need it
function App() {
  const [theme, setTheme] = useState("dark");
  return <Layout theme={theme} />;
}
function Layout({ theme }) {
  return <Header theme={theme} />;
}
function Header({ theme }) {
  return <ThemeButton theme={theme} />;
}`,
        explanation: "Every intermediate component must accept and forward the prop, cluttering the entire codebase.",
      },
      good: {
        title: "✅ Direct Teleportation with useContext",
        code: `const ThemeContext = React.createContext("light");

function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={theme}>
      <Layout /> {/* No props needed on Layout or Header! */}
    </ThemeContext.Provider>
  );
}

function ThemeButton() {
  const theme = React.useContext(ThemeContext); // Direct read!
  return <button className={theme}>Theme: {theme}</button>;
}`,
        explanation: "ThemeButton consumes the theme directly without bothering Layout or Header.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Theme Context Provider",
      intro: "Toggle dark/light mode and observe how deep child components read the theme without prop drilling:",
      starterCode: `// useContext Demo: Theme Toggle
const ThemeContext = React.createContext("dark");

function ThemeCard() {
  // Consumes ThemeContext directly!
  const theme = React.useContext(ThemeContext);

  return (
    <div style={{
      padding: "16px",
      borderRadius: "8px",
      background: theme === "dark" ? "#0f172a" : "#f1f5f9",
      color: theme === "dark" ? "#f8fafc" : "#0f172a",
      border: "1px solid #334155"
    }}>
      <h4>ThemeCard (Nested Deeply)</h4>
      <p>Current Active Theme: <strong>{theme.toUpperCase()}</strong></p>
    </div>
  );
}

function App() {
  const [theme, setTheme] = React.useState("dark");

  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ padding: "16px", border: "1px solid #334155", borderRadius: "8px" }}>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{ marginBottom: "12px", padding: "6px 12px", cursor: "pointer" }}
        >
          Toggle to {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
        <ThemeCard />
      </div>
    </ThemeContext.Provider>
  );
}

console.log("App with ThemeContext ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "What problem does React Context and the `useContext` hook solve?",
        options: [
          "It replaces the need for CSS files.",
          "It avoids 'prop drilling' by allowing deep child components to consume shared data directly without passing props through intermediate layers.",
          "It speeds up internet connection speeds for API requests.",
          "It converts functional components into class components automatically.",
        ],
        correctIndex: 1,
        explanation: "Context lets you broadcast values (like user authentication or theme) down the tree so any descendant can consume it directly without prop drilling.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "Eliminate Prop Drilling", desc: "Use Context for truly global data (auth user, theme, locale) that many components need." },
        { title: "3 Steps: Create, Provide, Consume", desc: "`createContext()`, `<Provider value={...}>`, and `useContext()`." },
        { title: "Don't Overuse Context", desc: "For local component sharing, prefer lifting state up or using the `children` slot pattern." },
      ],
      nextLessonPreview: {
        title: "REACT-18: The Render Cycle: Trigger, Render, Commit & Virtual DOM",
        desc: "Peek under the hood to see how React schedules renders, compares virtual trees, and commits minimal DOM updates.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-18: Render Cycle & Reconciliation
  // ─────────────────────────────────────────────────────────────
  "react18-render-cycle-and-reconciliation": {
    slug: "react18-render-cycle-and-reconciliation",
    code: "REACT-18",
    title: "The Render Cycle: Trigger, Render, Commit & Virtual DOM",
    subtitle: "Understand how React schedules renders, diffs virtual element trees, and commits minimal updates to the real DOM.",
    sections: [
      { id: "part1", label: "The 3 Steps of the Render Cycle", icon: "💡" },
      { id: "part2", label: "The Virtual DOM & Diffing", icon: "🌳" },
      { id: "part3", label: "Render vs DOM Mutation", icon: "⚡" },
      { id: "part4", label: "Mental Model Breakdown", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "The 3 Steps of the Render Cycle",
      bigPicture: "When state changes, React does not instantly rewrite the browser HTML. It goes through a disciplined 3-step pipeline: 1. Triggering a render, 2. Rendering (calling your component function to produce new JSX objects), and 3. Committing (applying only the exact differences to the real browser DOM).",
      breakdownTitle: "The Restaurant Kitchen Analogy:",
      breakdownItems: [
        { title: "1. Triggering (Placing the Order)", desc: "A user click calls a state setter, submitting an order to the kitchen." },
        { title: "2. Rendering (Cooking in the Kitchen)", desc: "React calls your component function to figure out what the UI should look like." },
        { title: "3. Committing (Serving to the Table)", desc: "React takes the finished dish and places only the changed items onto the browser screen." },
      ],
    },
    part2: {
      title: "The Virtual DOM & Reconciliation (Diffing)",
      intro: "How React makes updates fast and efficient behind the scenes:",
      cards: [
        {
          number: "01",
          tag: "TREE 1",
          title: "Virtual DOM (Lightweight JS Objects)",
          description: "JSX returns plain JavaScript objects representing elements. Creating JS objects is virtually instantaneous.",
          color: "purple",
        },
        {
          number: "02",
          tag: "DIFFING",
          title: "Reconciliation (Diffing Algorithm)",
          description: "React compares the new virtual tree with the previous virtual tree to find what actually changed.",
          color: "cyan",
        },
        {
          number: "03",
          tag: "COMMIT",
          title: "Targeted DOM Mutation",
          description: "If only a number changed inside a `<span>`, React only changes that single text node in the real DOM.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Rendering is Pure",
        content: "During the Render step, React calls your component function. It must be pure: no side effects, no DOM mutations, no API calls inside the function body.",
      },
    },
    part3: {
      title: "Rendering Does NOT Always Mean DOM Updates",
      intro: "An important distinction that separates beginners from experts:",
      points: [
        {
          title: "Component Rendering vs Browser Painting",
          content: "A component 'renders' whenever its function executes. If the returned JSX is identical to the previous render, React touches 0 DOM nodes during the commit phase.",
        },
        {
          title: "Parent Re-renders Trigger Child Renders",
          content: "By default, when a parent component re-renders, all of its child components also re-render unless memoized.",
        },
        {
          title: "Browser Repaint Optimization",
          content: "Because real browser DOM mutations are expensive, React's diffing ensures minimal repainting for smooth 60fps performance.",
        },
      ],
    },
    part4: {
      title: "Mental Model Comparison: Manual DOM vs React Pipeline",
      bad: {
        title: "❌ Naive Manual DOM Overwrite (Slow)",
        code: `// Naive approach: Overwriting innerHTML wipes all DOM nodes
function updateList(items) {
  const container = document.getElementById("list");
  // Destroys existing DOM nodes, drops focus, and forces full browser reflow!
  container.innerHTML = items.map(item => \`<li>\${item.title}</li>\`).join("");
}`,
        explanation: "Rewriting innerHTML drops scroll positions, resets text inputs, and forces expensive layout calculations.",
      },
      good: {
        title: "✅ React Render-Commit Pipeline (Fast & Minimal)",
        code: `// React diffs the virtual tree and updates only changed text nodes
function ItemList({ items }) {
  return (
    <ul id="list">
      {items.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}`,
        explanation: "React compares virtual nodes and mutates only the specific text node that changed in the real DOM.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Render Counter Inspection",
      intro: "Observe how clicking the button causes the component function to re-render with fresh values:",
      starterCode: `// Render Cycle Inspection
let renderCount = 0;

function RenderDemo() {
  renderCount++;
  const [clicks, setClicks] = React.useState(0);

  return (
    <div style={{ padding: "16px", border: "1px solid #334155", borderRadius: "8px" }}>
      <h3>Render Cycle Demo</h3>
      <p>Component Function Executions: <strong>{renderCount}</strong></p>
      <p>User Clicks: <strong>{clicks}</strong></p>
      <button
        onClick={() => setClicks(clicks + 1)}
        style={{ padding: "8px 16px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
      >
        Click to Trigger Render
      </button>
    </div>
  );
}

console.log("RenderDemo ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "What are the three distinct phases of React's UI update lifecycle?",
        options: [
          "Compile, Bundle, Deploy.",
          "Trigger, Render, Commit.",
          "Download, Parse, Execute.",
          "Query, Mutate, Destroy.",
        ],
        correctIndex: 1,
        explanation: "React updates the UI in three steps: Triggering the render (via state change), Rendering (calling the component to diff virtual trees), and Committing (updating the real DOM).",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "Trigger → Render → Commit", desc: "State updates schedule a render; React diffs virtual trees and commits only the diff to real DOM." },
        { title: "Virtual DOM is Lightweight", desc: "Comparing JavaScript objects is blazing fast compared to mutating browser DOM elements." },
        { title: "Keep Render Functions Pure", desc: "Never perform side effects (like fetch or DOM mutations) during the render phase." },
      ],
      nextLessonPreview: {
        title: "REACT-19: Component Identity, Keys & State Reset Rules",
        desc: "Learn why state is tied to position in the UI tree, and how changing keys forces a clean state reset.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-19: Component Identity & State Preservation
  // ─────────────────────────────────────────────────────────────
  "react19-component-identity-and-state-preservation": {
    slug: "react19-component-identity-and-state-preservation",
    code: "REACT-19",
    title: "Component Identity, Keys & State Reset Rules",
    subtitle: "Understand why state lives at the position in the UI tree, and how changing keys forces an intentional state reset.",
    sections: [
      { id: "part1", label: "Where Does State Live?", icon: "💡" },
      { id: "part2", label: "State Preservation Rules", icon: "🌲" },
      { id: "part3", label: "Resetting State with Keys", icon: "🔑" },
      { id: "part4", label: "Accidental State Preservation Trap", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Where Does State Actually Live?",
      bigPicture: "You might think state lives inside the component function. But components are just functions that run and exit! State is actually held by React inside an internal tree structure and tied to the component's POSITION in the UI tree. As long as the same component stays at the same position, React preserves its state.",
      breakdownTitle: "The Golden Rule of State Preservation:",
      breakdownItems: [
        { title: "Same Component at Same Position", desc: "React preserves the state (e.g. text typed in input stays intact)." },
        { title: "Different Component at Same Position", desc: "React destroys the old state and mounts fresh state." },
        { title: "Changing the Key Prop", desc: "Giving a component a different `key` forces React to destroy the old instance and reset state completely." },
      ],
    },
    part2: {
      title: "State Preservation in Action",
      intro: "How React decides whether to preserve or destroy state across renders:",
      cards: [
        {
          number: "01",
          tag: "SCENARIO 1",
          title: "Same Component, Same Position",
          description: "`isFancy ? <Counter isFancy={true} /> : <Counter isFancy={false} />` — State is PRESERVED because Counter is at the same slot.",
          color: "emerald",
        },
        {
          number: "02",
          tag: "SCENARIO 2",
          title: "Different Component Type",
          description: "`isEditing ? <EditProfile /> : <ViewProfile />` — State is DESTROYED because component type changed.",
          color: "rose",
        },
        {
          number: "03",
          tag: "SCENARIO 3",
          title: "Different Key at Same Position",
          description: "`<Chat key={userId} />` — Switching `userId` gives a new key, forcing React to reset the chat state cleanly.",
          color: "purple",
        },
      ],
      rule: {
        title: "Keys Are Not Just for Lists",
        content: "You can place a `key` on any single component (like `<Profile key={userId} />`) to tell React: 'When userId changes, treat this as a completely new profile and reset its form state.'",
      },
    },
    part3: {
      title: "Resetting Form State with Keys (The Clean Way)",
      intro: "Why using a `key` is far superior to using `useEffect` for state resets:",
      points: [
        {
          title: "The Old Buggy Approach (useEffect Reset)",
          content: "Listening to `useEffect(() => setText(''), [userId])` renders the old user's draft for 1 frame before resetting, causing visual flashes.",
        },
        {
          title: "The React Way (key={userId})",
          content: "Passing `<UserForm key={userId} />` tells React to immediately discard the old component instance and mount a fresh one with initial state.",
        },
      ],
    },
    part4: {
      title: "Accidental State Preservation vs Keyed Reset",
      bad: {
        title: "❌ Accidental State Leak Between Users",
        code: `// Bad: Switching users keeps the previous user's un-submitted comment text!
function ProfilePage({ user }) {
  return (
    <div>
      <h3>{user.name}</h3>
      {/* Same position in tree, no key -> draft comment leaks to next user! */}
      <CommentBox />
    </div>
  );
}`,
        explanation: "Because CommentBox stays at the same position in the tree, React preserves its internal text draft when switching users.",
      },
      good: {
        title: "✅ Resetting State by Changing Key",
        code: `// Good: key={user.id} forces a fresh state instance for every user
function ProfilePage({ user }) {
  return (
    <div>
      <h3>{user.name}</h3>
      {/* Changing user.id destroys old instance and starts with clean state */}
      <CommentBox key={user.id} />
    </div>
  );
}`,
        explanation: "React treats each user.id as a unique component identity, ensuring comments never leak across profiles.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Resetting Score with Key",
      intro: "Switch between players and observe how key={player} resets the counter cleanly:",
      starterCode: `// Component Identity & Key Reset Demo
function PlayerScore({ player }) {
  const [score, setScore] = React.useState(0);

  return (
    <div style={{ padding: "12px", background: "#1e293b", borderRadius: "6px", marginTop: "12px" }}>
      <h4>Player: {player}</h4>
      <p>Score: <strong>{score}</strong></p>
      <button onClick={() => setScore(score + 1)}>+1 Point</button>
    </div>
  );
}

function Scoreboard() {
  const [player, setPlayer] = React.useState("Alice");

  return (
    <div style={{ padding: "16px", border: "1px solid #334155", borderRadius: "8px" }}>
      <button onClick={() => setPlayer(player === "Alice" ? "Bob" : "Alice")}>
        Switch to {player === "Alice" ? "Bob" : "Alice"}
      </button>

      {/* Notice the key={player} prop! */}
      <PlayerScore key={player} player={player} />
    </div>
  );
}

console.log("Scoreboard ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "How can you tell React to completely destroy a component's existing state and reset it with fresh initial state when an ID prop changes?",
        options: [
          "Call document.location.reload().",
          "Pass the ID as the component's `key` prop (e.g. `<ProfileForm key={userId} />`).",
          "Delete the component file from your project.",
          "Write a while loop inside the render function.",
        ],
        correctIndex: 1,
        explanation: "Changing a component's `key` tells React that it is a fundamentally different instance, prompting React to destroy the old state and mount fresh state.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "State is Tied to Tree Position", desc: "React preserves state as long as the same component type remains at the same position in the tree." },
        { title: "Keys Define Component Identity", desc: "A different `key` forces React to treat the component as brand new and reset state." },
        { title: "Use Keys for Form Resets", desc: "Pass `key={entityId}` to reset form drafts cleanly without complex `useEffect` logic." },
      ],
      nextLessonPreview: {
        title: "REACT-20: Data Fetching: Loading, Success, Error & Empty States",
        desc: "Learn how to fetch backend API data inside useEffect and model all UI states gracefully.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-20: Data Fetching & Async UI
  // ─────────────────────────────────────────────────────────────
  "react20-data-fetching-and-async-ui": {
    slug: "react20-data-fetching-and-async-ui",
    code: "REACT-20",
    title: "Data Fetching: Loading, Success, Error & Empty States",
    subtitle: "Fetch backend data inside useEffect and model loading, error, success, and empty states cleanly.",
    sections: [
      { id: "part1", label: "The 4 States of Async UI", icon: "💡" },
      { id: "part2", label: "The Data Fetching Pattern", icon: "🌐" },
      { id: "part3", label: "Handling Errors Gracefully", icon: "🛡️" },
      { id: "part4", label: "Unchecked Fetch vs 4-State Fetch", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "The 4 States of Async UI",
      bigPicture: "When your app requests data over the network, it takes time. The request might take 200ms, or it might fail if the user goes offline. A professional React application must explicitly handle all 4 states of asynchronous data flow: 1. Loading, 2. Success, 3. Error, and 4. Empty.",
      breakdownTitle: "The 4 Essential UI States:",
      breakdownItems: [
        { title: "1. Loading State", desc: "Show a spinner or skeleton screen while the network request is in-flight." },
        { title: "2. Success State", desc: "Render the retrieved data cleanly when the response arrives." },
        { title: "3. Error State", desc: "Display a helpful error message with a 'Try Again' button if the fetch fails." },
        { title: "4. Empty State", desc: "Display a friendly message when the query succeeds but returns 0 items (e.g. 'No tasks yet. Create one!')." },
      ],
    },
    part2: {
      title: "The Standard Fetching Pattern in useEffect",
      intro: "How to structure asynchronous data fetching in a React component:",
      cards: [
        {
          number: "01",
          tag: "STATE",
          title: "Declare Status State",
          description: "`const [data, setData] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState(null);`",
          color: "purple",
        },
        {
          number: "02",
          tag: "FETCH",
          title: "Fetch Inside useEffect",
          description: "Define an `async function fetchData()` inside `useEffect` and call it immediately on mount.",
          color: "cyan",
        },
        {
          number: "03",
          tag: "GUARD",
          title: "Render with Guard Clauses",
          description: "Use early returns for `if (loading)` and `if (error)` before rendering the main data list.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Never Make useEffect Callback Async",
        content: "Do not write `useEffect(async () => { ... })`. An async function returns a Promise, but useEffect expects either nothing or a cleanup function. Declare the async function inside the effect instead.",
      },
    },
    part3: {
      title: "Handling Network Errors Properly",
      intro: "A common pitfall with JavaScript's `fetch()` API:",
      points: [
        {
          title: "fetch() Does NOT Reject on 404 or 500",
          content: "The browser's `fetch()` only throws an error on network loss. If the server returns HTTP 404 or 500, fetch resolves normally!",
        },
        {
          title: "Always Check `res.ok`",
          content: "You must check `if (!res.ok) throw new Error('Server error')` before parsing `await res.json()`.",
          codeSnippet: "const res = await fetch('/api/users');\nif (!res.ok) {\n  throw new Error(`Failed to load users: ${res.status}`);\n}\nconst json = await res.json();",
        },
      ],
    },
    part4: {
      title: "Unchecked Async Fetch vs Robust 4-State Fetch",
      bad: {
        title: "❌ Naive Async Fetch (Crashes on Error/Loading)",
        code: `// Bad: Assumes fetch never fails and data arrives instantly
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data)); // What if it errors? What if it's loading?
  }, []);

  // Crashes or shows blank screen during loading!
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
        explanation: "No loading spinner, no error handling, and crashes if the network response is an error object.",
      },
      good: {
        title: "✅ Robust 4-State Data Fetching",
        code: `function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Could not load users");
        const json = await res.json();
        setUsers(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <p>⏳ Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>❌ Error: {error}</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
        explanation: "Handles all 4 states (loading, error, empty, success) gracefully and predictably.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Mock API Fetcher",
      intro: "Simulate loading, success, and error states with a simulated network delay:",
      starterCode: `// Async Data Fetching Demo
function UserDirectory() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // Simulated async fetch with 1s delay
    const timer = setTimeout(() => {
      const mockData = [
        { id: 1, name: "Sarah Connor", role: "DevOps Lead" },
        { id: 2, name: "John Doe", role: "Frontend Architect" },
        { id: 3, name: "Ada Lovelace", role: "Principal Engineer" }
      ];
      setUsers(mockData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div style={{ padding: "16px" }}>⏳ Fetching team directory...</div>;
  if (error) return <div style={{ padding: "16px", color: "#f87171" }}>❌ Error: {error}</div>;
  if (users.length === 0) return <div style={{ padding: "16px" }}>No team members found.</div>;

  return (
    <div style={{ padding: "16px", border: "1px solid #334155", borderRadius: "8px" }}>
      <h3>Team Members ({users.length})</h3>
      <ul>
        {users.map(u => (
          <li key={u.id}><strong>{u.name}</strong> — {u.role}</li>
        ))}
      </ul>
    </div>
  );
}

console.log("UserDirectory async demo ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "Why should you never write `useEffect(async () => { ... })` directly?",
        options: [
          "Async functions are not supported by modern JavaScript engines.",
          "An async function returns a Promise, but useEffect expects either nothing or a synchronous cleanup function.",
          "React requires all API calls to be synchronous.",
          "It forces the browser to open a new tab.",
        ],
        correctIndex: 1,
        explanation: "useEffect callbacks must return either undefined or a cleanup function. Async functions return a Promise, which confuses React's cleanup mechanism. Instead, declare an async function inside the effect body.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "Handle All 4 States", desc: "Always model Loading, Error, Success, and Empty states in your UI." },
        { title: "Check `res.ok`", desc: "Browser fetch does not throw on 404/500 errors; check `if (!res.ok)` manually." },
        { title: "Define Async Function Inside Effect", desc: "Declare `async function load() { ... }` inside useEffect and invoke it." },
      ],
      nextLessonPreview: {
        title: "REACT-21: Race Conditions, AbortControllers & Fetch Cleanup",
        desc: "Prevent stale network responses from overwriting fresh data using AbortController and active flags.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-21: Race Conditions & Cleanup
  // ─────────────────────────────────────────────────────────────
  "react21-race-conditions-and-cleanup": {
    slug: "react21-race-conditions-and-cleanup",
    code: "REACT-21",
    title: "Race Conditions, AbortControllers & Fetch Cleanup",
    subtitle: "Prevent stale network responses from overwriting new data using AbortController and active flags.",
    sections: [
      { id: "part1", label: "What is a Race Condition?", icon: "💡" },
      { id: "part2", label: "The Active Flag Pattern", icon: "🚩" },
      { id: "part3", label: "The AbortController API", icon: "🛑" },
      { id: "part4", label: "Race Condition vs Abort Cleanup", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "What is a Race Condition in React?",
      bigPicture: "Imagine a user quickly searches for 'React' and then immediately changes their mind and searches for 'Next'. Two network requests are sent: Request A (for 'React') and Request B (for 'Next'). If Request A takes 800ms and Request B takes 200ms, Request A will arrive LAST and overwrite Request B! The screen now shows results for 'React' even though the input says 'Next'. This is a race condition.",
      breakdownTitle: "Two Rock-Solid Solutions in React:",
      breakdownItems: [
        { title: "1. The Active Flag Pattern", desc: "Use a local boolean flag `let active = true` that is set to `false` in the cleanup function so stale responses are ignored." },
        { title: "2. The AbortController API", desc: "The standard browser API to genuinely cancel in-flight HTTP requests when the component unmounts or query changes." },
      ],
    },
    part2: {
      title: "The Active Flag Pattern Explained",
      intro: "A simple, reliable pattern that prevents out-of-order state updates:",
      cards: [
        {
          number: "01",
          tag: "FLAG",
          title: "1. Create Flag in Effect",
          description: "`let isActive = true;` — initialized to true when the Effect runs.",
          color: "purple",
        },
        {
          number: "02",
          tag: "CHECK",
          title: "2. Check Flag Before Setting State",
          description: "`if (isActive) { setData(result); }` — only updates state if this is still the current active request.",
          color: "cyan",
        },
        {
          number: "03",
          tag: "CLEANUP",
          title: "3. Set Flag to False on Cleanup",
          description: "`return () => { isActive = false; };` — automatically marks stale requests as obsolete.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Why Cleanup Runs First",
        content: "When dependencies change, React runs the previous Effect's cleanup BEFORE starting the next Effect, guaranteeing `isActive` is flipped to false for the old request.",
      },
    },
    part3: {
      title: "Canceling Network Requests with AbortController",
      intro: "The browser's native API to actually stop data transfer over the wire:",
      points: [
        {
          title: "Creating the Controller",
          content: "Instantiate `const controller = new AbortController();` inside your Effect and pass `{ signal: controller.signal }` to `fetch()`.",
        },
        {
          title: "Aborting in Cleanup",
          content: "In the cleanup function, call `controller.abort()`. The browser immediately cancels the pending network request.",
        },
        {
          title: "Ignoring Abort Errors",
          content: "An aborted fetch throws an `AbortError`. Catch it and ignore it so you don't show a false error message to the user.",
          codeSnippet: "try {\n  const res = await fetch(url, { signal: controller.signal });\n} catch (err) {\n  if (err.name !== 'AbortError') setError(err.message);\n}",
        },
      ],
    },
    part4: {
      title: "Race Condition Bug vs Clean AbortController",
      bad: {
        title: "❌ Unhandled Race Condition",
        code: `// Bad: Out-of-order network responses overwrite newer data
function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // If query="A" is slow and query="B" is fast, "A" will arrive last!
    fetch(\`/api/search?q=\${query}\`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, [query]);
}`,
        explanation: "Fast subsequent requests get overwritten by slow previous requests.",
      },
      good: {
        title: "✅ Protected with AbortController",
        code: `function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const res = await fetch(\`/api/search?q=\${query}\`, {
          signal: controller.signal
        });
        const data = await res.json();
        setResults(data);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    }

    fetchData();
    return () => controller.abort(); // Cancels previous in-flight request!
  }, [query]);
}`,
        explanation: "Whenever query changes, any pending fetch is immediately canceled, guaranteeing the UI only shows results for the latest query.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Active Flag Simulation",
      intro: "See how the active flag ignores delayed responses from previous user choices:",
      starterCode: `// Race Condition Prevention Demo
function UserProfileFetcher({ userId }) {
  const [profile, setProfile] = React.useState(null);

  React.useEffect(() => {
    let active = true;

    // Simulate network delay
    const delay = userId === 1 ? 1500 : 300;
    const timer = setTimeout(() => {
      if (active) {
        setProfile({ id: userId, name: \`User #\${userId}\` });
        console.log(\`Profile loaded for User #\${userId}\`);
      } else {
        console.log(\`Stale response discarded for User #\${userId}\`);
      }
    }, delay);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [userId]);

  return <div>Profile: {profile ? profile.name : "Loading..."}</div>;
}

console.log("UserProfileFetcher ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "How does an AbortController prevent race condition bugs during rapid search input changes in React?",
        options: [
          "It blocks the user from typing more than 5 characters.",
          "It cancels the previous in-flight HTTP request when the search query changes, ensuring only the latest response updates state.",
          "It stores the responses in localStorage automatically.",
          "It forces the browser to run on a single CPU core.",
        ],
        correctIndex: 1,
        explanation: "Calling `controller.abort()` in the cleanup function cancels earlier network requests before they can resolve out of order.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "Race Conditions are Real", desc: "Network requests resolve in unpredictable order; never assume the last request sent finishes last." },
        { title: "Use AbortController", desc: "Pass `signal` to `fetch()` and call `controller.abort()` in your effect cleanup." },
        { title: "Ignore AbortErrors", desc: "Catch `err.name === 'AbortError'` silently so you don't flash unnecessary error banners." },
      ],
      nextLessonPreview: {
        title: "REACT-22: useReducer: Predictable State Transitions for Complex UI",
        desc: "Consolidate complex multi-step state logic into a single reducer function with action types.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-22: useReducer
  // ─────────────────────────────────────────────────────────────
  "react22-usereducer-complex-state": {
    slug: "react22-usereducer-complex-state",
    code: "REACT-22",
    title: "useReducer: Predictable State Transitions for Complex UI",
    subtitle: "Consolidate complex multi-step state logic into a single reducer function with clear action types.",
    sections: [
      { id: "part1", label: "When useState Gets Messy", icon: "💡" },
      { id: "part2", label: "The Reducer Pattern", icon: "⚙️" },
      { id: "part3", label: "Actions & Dispatch", icon: "📬" },
      { id: "part4", label: "Multiple useStates vs useReducer", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "When useState Gets Messy",
      bigPicture: "When a component has 5 different state variables that update together (e.g. `items`, `loading`, `error`, `filter`, `selectedId`), having dozens of scattered `setState` calls makes logic tangled and hard to follow. `useReducer` lets you move all state update logic outside the component into a single, predictable function.",
      breakdownTitle: "The Anatomy of a Reducer:",
      breakdownItems: [
        { title: "Current State + Action = Next State", desc: "A reducer is a pure function: `(state, action) => nextState`." },
        { title: "Dispatching Actions", desc: "Instead of calling setters directly, event handlers dispatch intentions: `dispatch({ type: 'ITEM_DELETED', id: 4 })`." },
        { title: "Centralized Logic", desc: "All possible state transitions are organized in one place, making testing and debugging effortless." },
      ],
    },
    part2: {
      title: "The 3 Pieces of useReducer",
      intro: "How useReducer works step-by-step:",
      cards: [
        {
          number: "01",
          tag: "REDUCER",
          title: "1. The Reducer Function",
          description: "`function reducer(state, action)` — switches on `action.type` and returns a fresh state object.",
          color: "purple",
        },
        {
          number: "02",
          tag: "DISPATCH",
          title: "2. The dispatch Function",
          description: "`dispatch({ type: 'ADD_TASK', payload: 'New task' })` — notifies the reducer that something happened.",
          color: "cyan",
        },
        {
          number: "03",
          tag: "IMMUTABILITY",
          title: "3. Return New State",
          description: "Reducers must be pure. Always return a new object: `return { ...state, count: state.count + 1 };`.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Never Mutate State Inside a Reducer",
        content: "Never do `state.items.push(action.payload)`. Reducers must return brand new object/array copies using spread operators `[...state.items, action.payload]`.",
      },
    },
    part3: {
      title: "Actions: Describing What Happened",
      intro: "Action objects describe user intent rather than how to update state:",
      points: [
        {
          title: "Action Type Naming",
          content: "Use clear, descriptive string constants like `TASK_ADDED`, `FILTER_CHANGED`, `FETCH_FAILED`.",
        },
        {
          title: "Action Payloads",
          content: "Pass extra data inside the action object: `{ type: 'SET_SEARCH', payload: 'React' }`.",
          codeSnippet: "switch (action.type) {\n  case 'SET_QUERY':\n    return { ...state, query: action.payload };\n  case 'RESET':\n    return initialState;\n  default:\n    return state;\n}",
        },
      ],
    },
    part4: {
      title: "Scattered useStates vs Centralized useReducer",
      bad: {
        title: "❌ 5 Scattered useState Setters",
        code: `// Bad: 5 separate setters in every handler
function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStart = () => {
    setLoading(true);
    setError(null); // Easy to forget one of these!
  };
}`,
        explanation: "Handling multi-step state transitions with individual setters easily causes inconsistent partial states.",
      },
      good: {
        title: "✅ Clean useReducer State Machine",
        code: `function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, tasks: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function TaskManager() {
  const [state, dispatch] = useReducer(reducer, { tasks: [], loading: false, error: null });
  // dispatch({ type: "FETCH_START" })
}`,
        explanation: "All state transitions are guaranteed to be atomic, consistent, and easy to test in isolation.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Shopping Cart Reducer",
      intro: "See how dispatching actions (ADD, REMOVE, CLEAR) updates state cleanly in the reducer:",
      starterCode: `// useReducer Shopping Cart Demo
const initialState = { items: [], total: 0 };

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        items: [...state.items, action.payload],
        total: state.total + action.payload.price
      };
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

function Cart() {
  const [state, dispatch] = React.useReducer(cartReducer, initialState);

  return (
    <div style={{ padding: "16px", border: "1px solid #334155", borderRadius: "8px" }}>
      <h3>Cart Items: {state.items.length} | Total: \${state.total}</h3>
      <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
        <button onClick={() => dispatch({ type: "ADD_ITEM", payload: { id: Date.now(), name: "Book", price: 20 } })}>
          Add Book ($20)
        </button>
        <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}

console.log("Cart component with useReducer ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "What is the primary responsibility of a reducer function passed to `useReducer`?",
        options: [
          "To send network requests directly to the database.",
          "To take the current state and an action object, and return the next state.",
          "To render HTML elements to the screen.",
          "To optimize image sizes in the browser.",
        ],
        correctIndex: 1,
        explanation: "A reducer is a pure function with the signature `(state, action) => nextState`. It computes the new state based on the dispatched action.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "Use useReducer for Complex State", desc: "When multiple state values update together, consolidate them in a reducer." },
        { title: "Dispatch Intentions", desc: "Event handlers dispatch action objects `{ type: 'ACTION_NAME', payload }`." },
        { title: "Keep Reducers Pure", desc: "Never mutate state directly; always return fresh object/array copies." },
      ],
      nextLessonPreview: {
        title: "REACT-23: Performance: When to use memo, useMemo & useCallback",
        desc: "Understand what causes re-renders and apply memoization only when fixing genuine performance bottlenecks.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-23: Performance & Memoization
  // ─────────────────────────────────────────────────────────────
  "react23-performance-memo-usememo-usecallback": {
    slug: "react23-performance-memo-usememo-usecallback",
    code: "REACT-23",
    title: "Performance: When to use memo, useMemo & useCallback",
    subtitle: "Understand what causes re-renders and apply memoization pragmatically only when fixing measured bottlenecks.",
    sections: [
      { id: "part1", label: "The Truth About Re-renders", icon: "💡" },
      { id: "part2", label: "The 3 Memoization Tools", icon: "⚡" },
      { id: "part3", label: "When Memoization is a Waste", icon: "⚠️" },
      { id: "part4", label: "Premature Memo vs Targeted Memo", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "The Truth About Re-renders in React",
      bigPicture: "Many beginners panic whenever a component re-renders and try to wrap everything in `useMemo` and `useCallback`. But in React, re-rendering is cheap! React easily re-renders hundreds of components in less than 1 millisecond. Memoization has its own memory and comparison overhead, so you should only optimize when you have a measured, noticeable slowdown.",
      breakdownTitle: "The Performance Golden Rules:",
      breakdownItems: [
        { title: "Re-renders are Normal", desc: "React components are just JavaScript functions. Running a fast function is not a performance bug." },
        { title: "Measure Before Optimizing", desc: "Use the React DevTools Profiler to find actual slow components before adding memoization." },
        { title: "Composition First", desc: "Lifting state down or using the `children` slot pattern often fixes re-renders without any memoization." },
      ],
    },
    part2: {
      title: "The 3 Memoization Tools Explained",
      intro: "React provides 3 distinct tools for specific caching needs:",
      cards: [
        {
          number: "01",
          tag: "COMPONENT",
          title: "1. `React.memo(Component)`",
          description: "Skips re-rendering a child component if its props have not changed.",
          color: "purple",
        },
        {
          number: "02",
          tag: "VALUE",
          title: "2. `useMemo(() => compute(), [deps])`",
          description: "Caches the RESULT of an expensive calculation (e.g. sorting 5,000 items) between renders.",
          color: "cyan",
        },
        {
          number: "03",
          tag: "FUNCTION",
          title: "3. `useCallback(fn, [deps])`",
          description: "Caches a FUNCTION definition between renders so child components receive a stable function reference.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Referential Equality in JavaScript",
        content: "In JavaScript, `{} !== {}` and `() => {} !== () => {}`. Even if code is identical, a new object or function has a new memory address on every render. `useCallback` and `useMemo` keep memory references stable.",
      },
    },
    part3: {
      title: "When Memoization is a Waste",
      intro: "Scenarios where adding memoization actually makes your app slower:",
      points: [
        {
          title: "Cheap Calculations",
          content: "Wrapping `const total = useMemo(() => a + b, [a, b])` adds array allocation and comparison overhead for an addition that takes 0.0001 nanoseconds.",
        },
        {
          title: "Wrapping Components Without memo()",
          content: "Passing `useCallback` to a child component that is NOT wrapped in `React.memo()` is completely pointless because the child will re-render anyway.",
        },
      ],
    },
    part4: {
      title: "Premature Memoization vs Targeted Optimization",
      bad: {
        title: "❌ Premature Memoization Everywhere",
        code: `// Bad: Cluttering simple code with useless useMemo
function Greeting({ name }) {
  // Pointless overhead: string concatenation is virtually free!
  const message = useMemo(() => \`Hello, \${name}!\`, [name]);
  const handleClick = useCallback(() => console.log("Hi"), []);

  return <button onClick={handleClick}>{message}</button>;
}`,
        explanation: "Adds memory overhead and dependency tracking for operations that take less than a microsecond.",
      },
      good: {
        title: "✅ Targeted useMemo for Heavy Computations",
        code: `// Good: Caching genuinely expensive filtering on large dataset
function LargeDataTable({ items, filterQuery }) {
  // Expensive: sorting and filtering 10,000 rows
  const visibleItems = useMemo(() => {
    return items
      .filter(item => item.text.includes(filterQuery))
      .sort((a, b) => b.score - a.score);
  }, [items, filterQuery]); // Only re-computes when items or query changes!

  return <VirtualGrid rows={visibleItems} />;
}`,
        explanation: "useMemo prevents recalculating expensive sorting algorithms on unrelated renders.",
      },
    },
    part5: {
      title: "Interactive Sandbox: useMemo Expensive Calculation",
      intro: "See how useMemo caches the result of an expensive loop calculation:",
      starterCode: `// useMemo Demo
function ExpensiveMathDemo() {
  const [count, setCount] = React.useState(10);
  const [themeDark, setThemeDark] = React.useState(false);

  // Expensive calculation: only re-runs when count changes!
  const factorial = React.useMemo(() => {
    console.log("Computing factorial for", count);
    let result = 1;
    for (let i = 1; i <= count; i++) {
      result *= i;
    }
    return result;
  }, [count]);

  return (
    <div style={{
      padding: "16px",
      borderRadius: "8px",
      background: themeDark ? "#0f172a" : "#f8fafc",
      color: themeDark ? "#f8fafc" : "#0f172a",
      border: "1px solid #334155"
    }}>
      <h3>Factorial of {count} = {factorial}</h3>
      <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
        <button onClick={() => setCount(count + 1)}>Increment Count (+1)</button>
        {/* Toggling theme does NOT re-run the factorial calculation! */}
        <button onClick={() => setThemeDark(!themeDark)}>Toggle Theme</button>
      </div>
    </div>
  );
}

console.log("ExpensiveMathDemo ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "When should you use `useMemo` in a React application?",
        options: [
          "Wrap every single variable and string concatenation in useMemo.",
          "Only when caching genuinely expensive calculations (like heavy data transformations) or maintaining stable object references for memoized children.",
          "Whenever you want to trigger an HTTP network request.",
          "To style CSS components automatically.",
        ],
        correctIndex: 1,
        explanation: "`useMemo` has comparison overhead and should only be applied to genuinely expensive calculations or when maintaining stable references for memoized components.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "Re-renders are Cheap", desc: "Don't prematurely optimize fast components; re-rendering is how React stays reactive." },
        { title: "useMemo Caches Values", desc: "Use `useMemo` for heavy calculations like filtering/sorting thousands of items." },
        { title: "useCallback Caches Functions", desc: "Use `useCallback` to pass stable function references to `React.memo` children." },
      ],
      nextLessonPreview: {
        title: "REACT-24: Custom Hooks: Extracting & Sharing Reusable Logic",
        desc: "Package stateful logic into custom use... functions to share across components without repetition.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-24: Custom Hooks
  // ─────────────────────────────────────────────────────────────
  "react24-custom-hooks": {
    slug: "react24-custom-hooks",
    code: "REACT-24",
    title: "Custom Hooks: Extracting & Sharing Reusable Logic",
    subtitle: "Package stateful logic and effects into custom use... functions to share across components without repetition.",
    sections: [
      { id: "part1", label: "What is a Custom Hook?", icon: "💡" },
      { id: "part2", label: "The Custom Hook Rules", icon: "📜" },
      { id: "part3", label: "Building Real Custom Hooks", icon: "🛠️" },
      { id: "part4", label: "Duplicated Logic vs Custom Hook", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "What is a Custom Hook?",
      bigPicture: "When two different components need to share the same JavaScript function, you extract a regular helper function. But what if two components need to share STATEFUL logic that uses `useState` and `useEffect` (like window resizing, local storage sync, or API fetching)? You create a Custom Hook! A custom hook is simply a JavaScript function whose name starts with 'use'.",
      breakdownTitle: "Why Custom Hooks are Transformative:",
      breakdownItems: [
        { title: "Reusability Without UI", desc: "Share stateful logic between completely different visual components." },
        { title: "Declutters Components", desc: "Your component files shrink from 100 lines of effect setup down to one clean line: `const { data, loading } = useFetch('/api/users')`." },
        { title: "Isolated State", desc: "Each component that calls your custom hook gets its own completely independent state memory." },
      ],
    },
    part2: {
      title: "The Rules of Custom Hooks",
      intro: "Custom hooks follow standard React Hook rules:",
      cards: [
        {
          number: "01",
          tag: "NAME",
          title: "Must Start with 'use'",
          description: "Names must start with `use` (e.g. `useWindowSize`, `useLocalStorage`, `useDebounce`) so linter tools recognize hook rules.",
          color: "purple",
        },
        {
          number: "02",
          tag: "TOP LEVEL",
          title: "Call at the Top Level",
          description: "Never call hooks inside loops, if statements, or nested functions.",
          color: "rose",
        },
        {
          number: "03",
          tag: "INDEPENDENT",
          title: "State is NOT Shared Globally",
          description: "Two components calling `useCounter()` do NOT share the same count; each has its own independent state.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Return What Your Component Needs",
        content: "A custom hook can return an array `[value, setValue]` (like useState) or an object `{ data, loading, error }` (like data fetchers).",
      },
    },
    part3: {
      title: "Real-World Custom Hook: `useWindowSize`",
      intro: "See how easy it is to package listener logic into a clean reusable hook:",
      points: [
        {
          title: "The Hook Implementation",
          content: "Handles state and resize listeners internally, returning `{ width, height }`.",
          codeSnippet: "function useWindowSize() {\n  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });\n\n  useEffect(() => {\n    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });\n    window.addEventListener('resize', handleResize);\n    return () => window.removeEventListener('resize', handleResize);\n  }, []);\n\n  return size;\n}",
        },
        {
          title: "Clean Usage in Any Component",
          content: "`const { width } = useWindowSize();` — 1 single line of readable code in your UI component!",
        },
      ],
    },
    part4: {
      title: "Duplicated Component Logic vs Clean Custom Hook",
      bad: {
        title: "❌ Duplicating 20 Lines of Effect Logic in 3 Components",
        code: `// Bad: Header, Sidebar, and Modal each duplicate window resize listeners
function Header() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return <div>Width: {width}</div>;
}`,
        explanation: "Copying and pasting complex useEffect and listener logic across multiple files leads to maintenance nightmares.",
      },
      good: {
        title: "✅ Clean Reusable Custom Hook",
        code: `// Good: Extract once, use anywhere in 1 line
function Header() {
  const { width } = useWindowSize(); // 1 line!
  return <div>Width: {width}</div>;
}

function Sidebar() {
  const { width } = useWindowSize(); // Reusable everywhere
  return <aside>{width < 768 ? <MobileMenu /> : <DesktopMenu />}</aside>;
}`,
        explanation: "All lifecycle, state, and cleanup logic is neatly encapsulated in `useWindowSize`.",
      },
    },
    part5: {
      title: "Interactive Sandbox: `useToggle` Custom Hook",
      intro: "Inspect this simple `useToggle` custom hook and how it simplifies modal/drawer state:",
      starterCode: `// Custom Hook Demo: useToggle
function useToggle(initialValue = false) {
  const [state, setState] = React.useState(initialValue);
  const toggle = () => setState(prev => !prev);
  const setOn = () => setState(true);
  const setOff = () => setState(false);

  return [state, toggle, setOn, setOff];
}

function ModalExample() {
  const [isOpen, toggleOpen, openModal, closeModal] = useToggle(false);

  return (
    <div style={{ padding: "16px", border: "1px solid #334155", borderRadius: "8px" }}>
      <h3>Modal Controller</h3>
      <button onClick={toggleOpen} style={{ padding: "6px 12px", cursor: "pointer" }}>
        {isOpen ? "Close Modal" : "Open Modal"}
      </button>

      {isOpen && (
        <div style={{ marginTop: "12px", padding: "12px", background: "#1e1b4b", border: "1px solid #6366f1", borderRadius: "6px" }}>
          <p>🎉 This is a modal powered by the <strong>useToggle</strong> custom hook!</p>
          <button onClick={closeModal}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

console.log("ModalExample with useToggle ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "When two different components call the same custom hook `useLocalStorage('theme')`, do they share the exact same state in memory?",
        options: [
          "Yes, custom hooks always act as a global singleton state.",
          "No, each component call to a custom hook creates its own completely isolated, independent state instance.",
          "Only if the components are in the same file.",
          "Yes, but only in production builds.",
        ],
        correctIndex: 1,
        explanation: "Custom hooks share stateful logic, not state itself. Each component calling the hook gets its own completely isolated state memory.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "Prefix with 'use'", desc: "Always name custom hooks `useSomething` so React linters enforce hook rules." },
        { title: "Encapsulate Stateful Logic", desc: "Move repetitive `useState` + `useEffect` logic out of components into reusable hooks." },
        { title: "Independent State Instances", desc: "Every component that invokes a custom hook receives its own fresh, isolated state." },
      ],
      nextLessonPreview: {
        title: "REACT-25: Error Boundaries, React DevTools & Debugging Common Bugs",
        desc: "Catch rendering crashes with Error Boundaries and master debugging state and props with React DevTools.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-25: Error Boundaries & Debugging
  // ─────────────────────────────────────────────────────────────
  "react25-error-boundaries-and-debugging": {
    slug: "react25-error-boundaries-and-debugging",
    code: "REACT-25",
    title: "Error Boundaries, React DevTools & Debugging Common Bugs",
    subtitle: "Catch render crashes gracefully with Error Boundaries and debug props, state, and hooks with React DevTools.",
    sections: [
      { id: "part1", label: "Why Render Crashes Happen", icon: "💡" },
      { id: "part2", label: "Error Boundaries Explained", icon: "🛡️" },
      { id: "part3", label: "React DevTools Inspection", icon: "🔍" },
      { id: "part4", label: "White Screen of Death vs Fallback UI", icon: "⚠️" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Why Render Crashes Happen in React",
      bigPicture: "In React, if a JavaScript runtime error happens during rendering (like trying to read `user.profile.avatar` when `user` is `undefined`), the entire React component tree unmounts, leaving the user with a blank 'White Screen of Death.' Error Boundaries catch these errors and display a friendly fallback UI instead of crashing the whole app.",
      breakdownTitle: "What Error Boundaries Do:",
      breakdownItems: [
        { title: "Isolate Crashes", desc: "If a broken widget in the sidebar crashes, the rest of your app (navbar, main content) keeps working normally." },
        { title: "Show Fallback UI", desc: "Display a clean 'Something went wrong with this widget' card with a reload button." },
        { title: "Log to Error Services", desc: "Send the error stack trace to logging services like Sentry for investigation." },
      ],
    },
    part2: {
      title: "How Error Boundaries Work",
      intro: "An Error Boundary wraps sections of your component tree like a try/catch block for UI:",
      cards: [
        {
          number: "01",
          tag: "WRAPPER",
          title: "Wrap Vulnerable Components",
          description: "`<ErrorBoundary fallback={<CardError />}><UserWidget /></ErrorBoundary>`",
          color: "purple",
        },
        {
          number: "02",
          tag: "CATCH",
          title: "Catches Render Errors",
          description: "Catches errors thrown during rendering, in lifecycle methods, and in constructors of child components.",
          color: "emerald",
        },
        {
          number: "03",
          tag: "LIMITATION",
          title: "What They Don't Catch",
          description: "Error Boundaries do NOT catch errors inside event handlers (e.g. `onClick`) or async code (e.g. `setTimeout`). Use regular `try/catch` for those!",
          color: "rose",
        },
      ],
      rule: {
        title: "Class Component Requirement",
        content: "Currently, Error Boundaries must be class components implementing `componentDidCatch` or `getDerivedStateFromError`, or use open-source wrapper libraries.",
      },
    },
    part3: {
      title: "Debugging with React DevTools",
      intro: "The official browser extension every professional React engineer uses:",
      points: [
        {
          title: "Components Tab",
          content: "Inspect the live component tree, view current props and state in real-time, and edit state on the fly to test edge cases.",
        },
        {
          title: "Profiler Tab",
          content: "Record a user interaction (like clicking a button) to see exactly which components re-rendered and how many milliseconds each took.",
        },
        {
          title: "Highlight Updates",
          content: "Enable 'Highlight updates when components render' in settings to visually see colored flash outlines on re-rendering elements.",
        },
      ],
    },
    part4: {
      title: "White Screen of Death vs Resilient Fallback UI",
      bad: {
        title: "❌ No Error Boundary (Entire App Crashes)",
        code: `// If BrokenWidget throws an error during render:
function App() {
  return (
    <div>
      <Navbar />
      <BrokenWidget /> {/* CRASH! Uncaught error destroys whole tree */}
      <Footer />
    </div>
  );
}`,
        explanation: "One tiny broken widget crashes the entire webpage, leaving the user with a completely blank screen.",
      },
      good: {
        title: "✅ Isolated Error Boundary (Graceful Fallback)",
        code: `function App() {
  return (
    <div>
      <Navbar />
      <ErrorBoundary fallback={<p>⚠️ Failed to load widget.</p>}>
        <BrokenWidget />
      </ErrorBoundary>
      <Footer /> {/* Navbar and Footer continue working perfectly! */}
    </div>
  );
}`,
        explanation: "The crash is contained inside the Error Boundary, preserving the rest of the application seamlessly.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Safe Optional Chaining & Fallbacks",
      intro: "See how optional chaining `?.` prevents undefined crashes during rendering:",
      starterCode: `// Defensive Rendering Demo
function UserCard({ user }) {
  // Safe optional chaining: never crashes even if user.details is missing!
  const city = user?.details?.address?.city || "Unknown City";

  return (
    <div style={{ padding: "12px", border: "1px solid #334155", borderRadius: "6px" }}>
      <h4>{user?.name || "Guest User"}</h4>
      <p>Location: {city}</p>
    </div>
  );
}

function App() {
  const completeUser = { name: "Alex", details: { address: { city: "Dhaka" } } };
  const partialUser = { name: "Guest" }; // Missing details

  return (
    <div style={{ display: "flex", gap: "12px", padding: "16px" }}>
      <UserCard user={completeUser} />
      <UserCard user={partialUser} />
    </div>
  );
}

console.log("Defensive UserCard demo ready.");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "What is the primary benefit of wrapping sections of your React app in an Error Boundary?",
        options: [
          "It speeds up network data fetching by 50%.",
          "It catches runtime rendering crashes in child components and shows a fallback UI instead of crashing the entire webpage.",
          "It prevents the user from opening the browser console.",
          "It automatically fixes broken JavaScript syntax errors.",
        ],
        correctIndex: 1,
        explanation: "Error Boundaries catch errors during rendering in their child tree and render a fallback UI, preventing the whole app from crashing.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "Protect Your App Tree", desc: "Use Error Boundaries around major widgets so a single failure doesn't crash the entire page." },
        { title: "Use Optional Chaining `?.`", desc: "Safely read nested properties (`user?.address?.city`) to prevent undefined render crashes." },
        { title: "Master React DevTools", desc: "Inspect live props, state, and profiler timings to diagnose bugs quickly." },
      ],
      nextLessonPreview: {
        title: "REACT-26: Testing Fundamentals: User-Centric Component Tests",
        desc: "Learn how to write reliable tests that verify what users see and do on screen.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-26: Testing Fundamentals
  // ─────────────────────────────────────────────────────────────
  "react26-testing-fundamentals": {
    slug: "react26-testing-fundamentals",
    code: "REACT-26",
    title: "Testing Fundamentals: User-Centric Component Tests",
    subtitle: "Test what users see and do: render outputs, user interactions, and loading/error states.",
    sections: [
      { id: "part1", label: "The Philosophy of React Testing", icon: "💡" },
      { id: "part2", label: "The 3 Levels of Testing", icon: "🧪" },
      { id: "part3", label: "Testing User Interactions", icon: "🖱️" },
      { id: "part4", label: "Testing Implementation vs User Behavior", icon: "🔍" },
      { id: "part5", label: "Interactive Sandbox", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "The Philosophy of React Testing",
      bigPicture: "The best tests test your components the same way your users interact with them. Don't test internal state variables or private helper functions. Test what appears on screen (e.g. 'Is the button labeled Submit?'), what happens on click (e.g. 'Does a success message appear?'), and what happens on errors.",
      breakdownTitle: "The Guiding Principle of Testing:",
      breakdownItems: [
        { title: "Test Behavior, Not Implementation", desc: "If you refactor your component from `useState` to `useReducer`, your tests should still pass without changes!" },
        { title: "Query by Accessible Roles", desc: "Find elements by role (`screen.getByRole('button', { name: /save/i })`) just like screen readers and users do." },
        { title: "Confidence in Refactoring", desc: "Great tests give you confidence to refactor and optimize code without breaking user features." },
      ],
    },
    part2: {
      title: "The Anatomy of a Component Test",
      intro: "Every test follows the simple AAA pattern (Arrange, Act, Assert):",
      cards: [
        {
          number: "01",
          tag: "ARRANGE",
          title: "1. Render the Component",
          description: "`render(<Counter initialCount={5} />);` — mounts the component in a simulated DOM environment.",
          color: "purple",
        },
        {
          number: "02",
          tag: "ACT",
          title: "2. Perform User Action",
          description: "`await userEvent.click(screen.getByRole('button', { name: /increment/i }));`",
          color: "cyan",
        },
        {
          number: "03",
          tag: "ASSERT",
          title: "3. Verify Output",
          description: "`expect(screen.getByText('Count: 6')).toBeInTheDocument();`",
          color: "emerald",
        },
      ],
      rule: {
        title: "Avoid Testing Implementation Details",
        content: "Never test `wrapper.state().count === 5`. Test the rendered text `expect(screen.getByText('5')).toBeInTheDocument()`.",
      },
    },
    part3: {
      title: "Testing Asynchronous UI & API Mocking",
      intro: "How to test async loading and error states reliably:",
      points: [
        {
          title: "Using `findBy...` for Async Elements",
          content: "`screen.findByText('Success')` returns a Promise that waits for the element to appear after an async network request.",
        },
        {
          title: "Mocking Fetch Calls",
          content: "Mock `global.fetch` to return simulated JSON so your test runs instantly without hitting real backend servers.",
        },
      ],
    },
    part4: {
      title: "Testing Implementation Details vs User Behavior",
      bad: {
        title: "❌ Testing Fragile Implementation Details",
        code: `// Bad: Tightly coupled to internal variable names
test("increments count state", () => {
  const wrapper = shallow(<Counter />);
  expect(wrapper.state("count")).toBe(0); // Fails if state is renamed!
  wrapper.instance().handleClick();
  expect(wrapper.state("count")).toBe(1);
});`,
        explanation: "Renaming a state variable or refactoring to useReducer breaks the test even if the UI still works perfectly.",
      },
      good: {
        title: "✅ Testing User-Facing Behavior",
        code: `// Good: Tests what the user actually sees and clicks
test("increments displayed count when clicked", async () => {
  render(<Counter />);
  expect(screen.getByText("Count: 0")).toBeInTheDocument();

  const button = screen.getByRole("button", { name: /increment/i });
  await userEvent.click(button);

  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});`,
        explanation: "Refactoring the internal code will not break this test as long as the user experience remains correct.",
      },
    },
    part5: {
      title: "Interactive Sandbox: Test Scenario Simulation",
      intro: "Inspect this Toggle component and its test verification logic:",
      starterCode: `// Component Testing Logic Demo
function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ border: "1px solid #334155", borderRadius: "6px", marginBottom: "8px" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: "100%", padding: "8px", textAlign: "left", background: "#1e293b", color: "#fff", border: "none" }}
      >
        {isOpen ? "▼" : "▶"} {title}
      </button>
      {isOpen && <div style={{ padding: "12px" }}>{children}</div>}
    </div>
  );
}

// Simulated Test Runner in Console:
console.log("TEST 1: Accordion starts closed (children hidden)");
console.log("TEST 2: Clicking button displays children");
console.log("TEST 3: Clicking button again hides children");
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "Why should React tests prioritize user-facing queries (like `getByRole` or `getByText`) over inspecting internal state variables?",
        options: [
          "Because internal state variables are encrypted by React.",
          "Because user-centric tests ensure the application works from the user's perspective and won't break when internal code is refactored.",
          "Because user-centric tests run only on mobile phones.",
          "Because React does not allow testing state variables.",
        ],
        correctIndex: 1,
        explanation: "Testing what the user sees and does makes your test suite resilient to refactoring and guarantees real-world functionality.",
      },
    },
    part7: {
      title: "Lesson Summary & Key Takeaways",
      takeaways: [
        { title: "Test User Behavior", desc: "Focus on what users see on screen and actions they perform with keyboard and mouse." },
        { title: "The AAA Pattern", desc: "Arrange (render), Act (click/type), and Assert (verify text or role is present)." },
        { title: "Refactor with Confidence", desc: "Behavior-focused tests stay green even when you refactor internal components." },
      ],
      nextLessonPreview: {
        title: "REACT-27: React Capstone: Task & Workflow Dashboard",
        desc: "Architect a complete, production-ready React application from scratch demonstrating all core competencies.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REACT-27: React Capstone Project
  // ─────────────────────────────────────────────────────────────
  "react27-react-capstone-project": {
    slug: "react27-react-capstone-project",
    code: "REACT-27",
    title: "React Capstone: Task & Workflow Dashboard",
    subtitle: "Architect a complete, modular React application from scratch demonstrating all core React competencies.",
    sections: [
      { id: "part1", label: "Capstone Overview & Architecture", icon: "🏛️" },
      { id: "part2", label: "Component Hierarchy & State Model", icon: "🌳" },
      { id: "part3", label: "The 5 Implementation Milestones", icon: "🎯" },
      { id: "part4", label: "Evaluation Criteria & Best Practices", icon: "✅" },
      { id: "part5", label: "Capstone Workspace", icon: "⚡" },
      { id: "part6", label: "Architecture Check", icon: "🎯" },
      { id: "part7", label: "Graduation & Mastery", icon: "🎓" },
    ],
    part1: {
      title: "Capstone Overview & Architecture",
      bigPicture: "Congratulations on reaching the final React milestone! The Capstone Project is your opportunity to build a complete, independent React application from scratch: an Interactive Task & Workflow Dashboard with live column sorting, filtering, persistent storage, modal forms, and async status handling.",
      breakdownTitle: "Skills You Will Demonstrate in the Capstone:",
      breakdownItems: [
        { title: "Component Composition", desc: "Clean slot architecture with Header, FilterBar, TaskList, TaskCard, and ModalDialog." },
        { title: "State Management & Lifting", desc: "Coordinating multi-column task moves and search filters through a single source of truth." },
        { title: "Controlled Forms", desc: "Form validation for task title, priority, category tags, and due dates." },
        { title: "Custom Hooks & Effects", desc: "Encapsulating localStorage synchronization and simulated async API syncing." },
      ],
    },
    part2: {
      title: "Component Hierarchy & State Model",
      intro: "A clean architectural blueprint for your capstone app:",
      cards: [
        {
          number: "01",
          tag: "APP ROOT",
          title: "<TaskDashboard /> (Root)",
          description: "Holds main tasks state, active filters, and search query. Coordinates data across components.",
          color: "purple",
        },
        {
          number: "02",
          tag: "FILTER BAR",
          title: "<FilterToolbar />",
          description: "Search input, priority dropdown filter, and 'Add Task' button trigger.",
          color: "cyan",
        },
        {
          number: "03",
          tag: "COLUMNS",
          title: "<TaskBoard /> & <TaskCard />",
          description: "Renders tasks grouped by status ('To Do', 'In Progress', 'Done') with action buttons.",
          color: "emerald",
        },
      ],
      rule: {
        title: "Pure React Competency",
        content: "Do not use Redux, Next.js, or external routing libraries for this capstone. Build it using pure React fundamentals to prove your mastery.",
      },
    },
    part3: {
      title: "The 5 Implementation Milestones",
      intro: "Follow these 5 progressive milestones to complete your dashboard:",
      points: [
        {
          title: "Milestone 1: Static Layout & Component Tree",
          content: "Create Header, Board, Column, and Card components with mock data.",
        },
        {
          title: "Milestone 2: State Management & Adding Tasks",
          content: "Implement controlled modal form to add new tasks with validation.",
        },
        {
          title: "Milestone 3: Moving Tasks Across Columns",
          content: "Add buttons or actions to advance tasks from 'To Do' -> 'In Progress' -> 'Done'.",
        },
        {
          title: "Milestone 4: Search & Filter Derived State",
          content: "Derive filtered tasks dynamically based on search text and priority filters.",
        },
        {
          title: "Milestone 5: Custom Hook for Persistence",
          content: "Create `useLocalStorage` to save and restore tasks across browser reloads.",
        },
      ],
    },
    part4: {
      title: "Evaluation Rubric: What Makes a Great Capstone",
      bad: {
        title: "❌ Messy Monolith Anti-Pattern",
        code: `// Anti-pattern: 600 lines in one file with 15 redundant useStates
function App() {
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]); // Redundant!
  const [taskCount, setTaskCount] = useState(0); // Redundant!
  // No component separation, prop drilling everywhere...
}`,
        explanation: "Unseparated concerns, redundant state variables, and fragile inline logic.",
      },
      good: {
        title: "✅ Modular Clean Architecture",
        code: `// Modular architecture with clear responsibilities
function TaskDashboard() {
  const [tasks, setTasks] = useLocalStorage("learncraft_tasks", initialTasks);
  const [query, setQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  // Clean derived calculations
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => ...);
  }, [tasks, query, priorityFilter]);

  return (
    <div className="dashboard">
      <Header />
      <FilterBar query={query} onQueryChange={setQuery} />
      <TaskBoard tasks={filteredTasks} onMove={handleMove} onDelete={handleDelete} />
    </div>
  );
}`,
        explanation: "Clean component boundaries, derived calculations, custom hook storage, and predictable data flow.",
      },
    },
    part5: {
      title: "Capstone Workspace: Starter Template",
      intro: "Review the capstone starter code below and launch the dedicated Capstone Project Workspace:",
      starterCode: `// React Capstone: Task Dashboard Starter Template
const initialTasks = [
  { id: "1", title: "Complete React Fundamentals", status: "DONE", priority: "HIGH" },
  { id: "2", title: "Master useEffect & Cleanups", status: "IN_PROGRESS", priority: "HIGH" },
  { id: "3", title: "Build Final Capstone Dashboard", status: "TODO", priority: "MEDIUM" },
];

function TaskDashboardApp() {
  const [tasks, setTasks] = React.useState(initialTasks);
  const [filter, setFilter] = React.useState("ALL");

  const moveTask = (id, nextStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: nextStatus } : t));
  };

  const visibleTasks = filter === "ALL" ? tasks : tasks.filter(t => t.status === filter);

  return (
    <div style={{ padding: "16px", border: "1px solid #334155", borderRadius: "8px" }}>
      <h2>📋 Task & Workflow Dashboard</h2>
      <p style={{ color: "#94a3b8" }}>Total: {tasks.length} | Showing: {visibleTasks.length}</p>
      <ul>
        {visibleTasks.map(t => (
          <li key={t.id} style={{ marginBottom: "8px" }}>
            <strong>{t.title}</strong> [{t.status}]
            {t.status !== "DONE" && (
              <button
                onClick={() => moveTask(t.id, t.status === "TODO" ? "IN_PROGRESS" : "DONE")}
                style={{ marginLeft: "8px", fontSize: "11px" }}
              >
                Advance →
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

console.log("TaskDashboardApp ready.");
`,
    },
    part6: {
      title: "Capstone Architecture Check",
      quiz: {
        question: "In your Capstone Dashboard, where should the list of tasks state live?",
        options: [
          "Inside individual TaskCard components.",
          "In the top-level TaskDashboard parent component, so it can be filtered, edited, and shared across columns as a single source of truth.",
          "In a global CSS file.",
          "In the browser's cookie storage on every single keystroke.",
        ],
        correctIndex: 1,
        explanation: "State belongs in the common parent (`TaskDashboard`) where it serves as the single source of truth for all child columns, filters, and modal forms.",
      },
    },
    part7: {
      title: "Graduation & React Mastery",
      takeaways: [
        { title: "React Mental Model Mastered", desc: "You understand components, declarative UI, props, state, effects, and one-way data flow." },
        { title: "Ready for Any React Codebase", desc: "You have built, debugged, and tested real React applications independently." },
        { title: "Graduation Complete 🎓", desc: "You are fully equipped to move on to Next.js, full-stack frameworks, or modern web engineering!" },
      ],
      nextLessonPreview: {
        title: "🎉 React Curriculum Complete!",
        desc: "Head over to the Capstone Project Workspace to finalize and submit your project.",
      },
    },
  },
};

/**
 * Get lesson content by slug with safe fallback.
 */
export function getReactLessonContent(slug: string): ReactLessonContent {
  const content = REACT_LESSONS_CONTENT[slug];
  if (content) return content;

  // Fallback if slug not found directly
  const firstKey = Object.keys(REACT_LESSONS_CONTENT)[0];
  return REACT_LESSONS_CONTENT[firstKey];
}
