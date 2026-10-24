import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react03ComponentsAndCompositionContent: StandardLessonContent = {
  slug: "react03-components-and-composition",
  code: "REACT-03",
  title: "Components & Composition: Building Reusable Blocks",
  subtitle: "Components are reusable building blocks starting with a capital letter that can be nested to assemble full interfaces.",
  difficulty: "Easy",
  scenario: {
    question: "A website has 20 course cards with the exact same visual design. Should you write the same JSX 20 times?",
    answer: "No. Create one reusable card component and render it for each course. This keeps code DRY and easy to maintain in one place.",
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
    title: "Components and Reuse",
    bigPicture: "A component is one reusable part of the user interface. By defining a component once as a function, you can render it dozens or hundreds of times across your application. Every component must start with an uppercase capital letter so React distinguishes it from built-in HTML tags.",
    codeSnippet: `function CourseCard() {
  return (
    <article>
      <h2>React Basics</h2>
      <p>Learn how components work.</p>
    </article>
  );
}

export default function App() {
  return (
    <main>
      <CourseCard />
      <CourseCard />
    </main>
  );
}`,
    analogy: "Think of a component like a rubber stamp. Once you carve the stamp design (the component), you can stamp it onto paper as many times as you need without redrawing the design.",
    breakdownTitle: "Component Architecture",
    breakdownItems: [
      {
        title: "Capitalization Requirement",
        desc: "React treats lowercase tags (like <div>, <button>) as built-in HTML elements, and capitalized tags (<CourseCard />) as custom components.",
      },
      {
        title: "Composition",
        desc: "Smaller components are nested inside larger parent components, forming a tree structure.",
      },
      {
        title: "Independent Instances",
        desc: "Each rendered instance of a component operates as an independent copy with its own lifecycle.",
      },
    ],
  },
  part2: {
    title: "Why Component Reuse Matters",
    rule: {
      title: "Component Capitalization Rule",
      content: "Always start React component names with an uppercase letter. If you name a component 'courseCard' starting with lowercase, React treats it as an unknown HTML element.",
    },
    cards: [
      {
        number: "01",
        tag: "MAINTAINABILITY",
        title: "Single Source of Truth",
        description: "Need to update card borders or badge padding? Change the component once, and every card across your site updates instantly.",
        color: "purple",
      },
      {
        number: "02",
        tag: "READABILITY",
        title: "Clean Declarative Trees",
        description: "Parent components read like clean architectural outlines (<Header />, <Sidebar />, <Feed />) rather than 500 lines of nested divs.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "ISOLATION",
        title: "Isolated Scope",
        description: "Component styles, state, and handlers stay contained inside their own function, preventing side-effect leaks.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step rendering of reusable component hierarchies:",
    points: [
      {
        title: "1. Defining the Child Component",
        content: "CourseCard defines the structure of a single course card with a heading and description.",
        codeSnippet: `function CourseCard() {\n  return (\n    <article>\n      <h2>React Basics</h2>\n      <p>Learn how components work.</p>\n    </article>\n  );\n}`,
      },
      {
        title: "2. Composing in Parent",
        content: "The parent App renders multiple <CourseCard /> elements inside a <main> container.",
        codeSnippet: `<main>\n  <CourseCard />\n  <CourseCard />\n</main>`,
      },
      {
        title: "3. Independent Rendering",
        content: "Both cards have the same content in this basic example; when cards need different data, props are used.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Lowercase Component Naming",
      code: `// ❌ Lowercase name confuses React
function courseCard() {
  return <div>Course</div>;
}

export default function App() {
  // React thinks <courseCard> is a native HTML tag that doesn't exist
  return <courseCard />;
}`,
      explanation: "JSX requires custom components to be capitalized. Lowercase names fail to render custom logic.",
    },
    good: {
      title: "Uppercase Component Naming",
      code: `// ✅ Capitalized function name
function CourseCard() {
  return <div>Course</div>;
}

export default function App() {
  return <CourseCard />;
}`,
      explanation: "Capitalizing CourseCard tells React to execute the JavaScript function and render its JSX output.",
    },
    whyItMatters: "Following React's naming conventions prevents subtle JSX parser errors and ensures clean component composition.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Compose multiple reusable cards into a mini curriculum grid in this live sandbox:",
    starterCode: `function StatCard({ label, value }) {
  return (
    <div style={{ padding: "14px", borderRadius: "10px", background: "#1e293b", border: "1px solid #334155" }}>
      <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>{label}</p>
      <h3 style={{ margin: "4px 0 0 0", color: "#38bdf8" }}>{value}</h3>
    </div>
  );
}

export default function DashboardSummary() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
      <StatCard label="Total Modules" value="27" />
      <StatCard label="XP Earned" value="1,450" />
      <StatCard label="Completed Steps" value="18" />
      <StatCard label="Current Streak" value="7 Days 🔥" />
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Reusable Units",
        desc: "Components allow you to build an element once and display it repeatedly.",
      },
      {
        title: "Capitalized Names",
        desc: "All custom React component functions must start with an uppercase letter.",
      },
      {
        title: "Clean Composition",
        desc: "Combine small components into complex layouts for maintainable web applications.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why must React component names start with a capital letter (e.g., CourseCard instead of courseCard)?",
      options: [
        "So React knows it is a custom component rather than a native HTML tag",
        "It is a required syntax rule enforced by the JavaScript language parser",
        "Because components are always converted to TypeScript interfaces behind the scenes",
        "It allows CSS stylesheets to automatically color the element purple",
      ],
      correctIndex: 0,
      explanation: "JSX uses lowercase names for built-in HTML tags (div, span, button) and uppercase names for custom React components.",
    },
  },
};
