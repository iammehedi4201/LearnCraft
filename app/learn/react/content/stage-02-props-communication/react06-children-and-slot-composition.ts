import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react06ChildrenAndSlotCompositionContent: StandardLessonContent = {
  slug: "react06-children-and-slot-composition",
  code: "REACT-06",
  title: "Component Composition: The children Prop & Layout Slots",
  subtitle: "Build flexible wrapper and container components using the special children prop and named JSX slots.",
  difficulty: "Moderate",
  scenario: {
    question: "You want a card wrapper component that provides identical styling, borders, and shadows across your app, but the internal content differs on every page. How should you design it?",
    answer: "Use the special children prop: `<Card>{children}</Card>`. This allows parent components to nest arbitrary JSX between the opening and closing tags.",
  },
  interviewQuestion: {
    question: "What is the children prop in React, and why does React favor composition over inheritance?",
    answer: "The children prop is a special prop that automatically contains whatever JSX or elements are nested between a component's opening and closing tags. React favors composition over inheritance because it keeps components decoupled, modular, and easy to reuse without complex class hierarchies.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Composition Over Inheritance", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "The children Prop & Container Components",
    bigPicture: "Some components don't know their children ahead of time. Think of generic boxes, modals, cards, or sidebars. In React, any JSX placed between `<Wrapper>` and `</Wrapper>` is automatically passed into `Wrapper` as a prop named `children`.",
    codeSnippet: `function Card({ title, children }) {
  return (
    <div className="card-container">
      {title && <h3 className="card-header">{title}</h3>}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// Usage:
export default function App() {
  return (
    <Card title="Course Overview">
      <p>Learn React from first principles to production mastery.</p>
      <button>Start Lesson</button>
    </Card>
  );
}`,
    analogy: "Think of a picture frame. The frame provides the border, glass, and hanging hook (the container component). The photo inside is the children prop. You can put any photo in the frame without building a brand new frame.",
    breakdownTitle: "How Composition Works",
    breakdownItems: [
      {
        title: "The children Prop",
        desc: "React automatically passes whatever is placed inside the JSX opening and closing tags as props.children.",
      },
      {
        title: "Named Slots",
        desc: "You can pass JSX elements as regular props too (e.g. icon={<StarIcon />}, footer={<SaveButton />}) to create multiple layout slots.",
      },
      {
        title: "Containment & Specialization",
        desc: "Build general containers first, then create specialized components by configuring the container with specific props and children.",
      },
    ],
  },
  part2: {
    title: "Why Composition Beats Inheritance",
    rule: {
      title: "The Composition Rule",
      content: "In React, we never use class inheritance (like class Dialog extends Window) to reuse UI. Instead, we compose components by nesting them inside containers using `children` or JSX slot props.",
    },
    cards: [
      {
        number: "01",
        tag: "FLEXIBILITY",
        title: "Arbitrary Content",
        description: "The container doesn't care if children is a string, a list of buttons, or an entire interactive form.",
        color: "purple",
      },
      {
        number: "02",
        tag: "NAMED SLOTS",
        title: "Multi-Section Layouts",
        description: "Props are not limited to primitives. You can pass JSX elements via props like `header={<TopBar />} left={<Sidebar />} right={<Feed />}`.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "NO INHERITANCE",
        title: "Decoupled Architecture",
        description: "By composing small components, you avoid deep, brittle inheritance trees and maintain clear visual boundaries.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step layout containment using the children prop:",
    points: [
      {
        title: "1. Defining the Container",
        content: "Card accepts ({ title, children }) and nests {children} inside its internal body wrapper.",
      },
      {
        title: "2. Nesting Content at Call Site",
        content: "Caller places arbitrary paragraphs, forms, or buttons between <Card> and </Card>.",
        codeSnippet: `<Card title=\"Intro\">\n  <p>Nested child content here</p>\n</Card>`,
      },
      {
        title: "3. Clean Slot Separation",
        content: "Container handles chrome and styling while callers retain full control over content.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Misspelling the 'children' Prop",
      code: `// ❌ ERROR: Prop is named child or Children (wrong case)
function Box({ child }) {
  return <div>{child}</div>;
}`,
      explanation: "React reserved the prop name `children` (lowercase). Passing nested JSX will only populate `props.children`.",
    },
    good: {
      title: "Use Exact 'children' Parameter",
      code: `// ✅ Correct: React requires the exact lowercase name 'children'
function Box({ children }) {
  return <div>{children}</div>;
}`,
      explanation: "Destructuring `children` ensures nested JSX elements render accurately inside the container.",
    },
    whyItMatters: "Standardizing on `children` enables universal container components like dialogs, sidebars, and grid layouts.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Nest different elements inside this alert container to test component composition:",
    starterCode: `function AlertBox({ type = "info", children }) {
  const colors = {
    info: { border: "#3b82f6", bg: "rgba(59, 130, 246, 0.1)" },
    warning: { border: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)" },
  };
  const style = colors[type] || colors.info;

  return (
    <div style={{
      borderLeft: "4px solid " + style.border,
      backgroundColor: style.bg,
      padding: "12px 16px",
      margin: "12px 0",
      borderRadius: "4px",
      fontFamily: "sans-serif"
    }}>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: "16px" }}>
      <AlertBox type="info">
        <strong>Tip:</strong> Always use the <code>children</code> prop for wrapper layouts.
      </AlertBox>

      <AlertBox type="warning">
        <strong>Caution:</strong> Never mutate state directly in React!
      </AlertBox>
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "The children Prop",
        desc: "Represents whatever JSX or components are nested between opening and closing tags.",
      },
      {
        title: "Layout Containers",
        desc: "Containers provide borders, padding, and layout without coupling to specific child content.",
      },
      {
        title: "Composition Over Inheritance",
        desc: "React achieves modular code reuse through component composition, not class inheritance.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "How do you access content placed between <Card> and </Card> inside the Card component?",
      options: [
        "Through props.slot",
        "Through props.children",
        "Through props.body",
        "Through props.innerHtml",
      ],
      correctIndex: 1,
      explanation: "React automatically collects any nested content and provides it on the `props.children` property.",
    },
  },
};
