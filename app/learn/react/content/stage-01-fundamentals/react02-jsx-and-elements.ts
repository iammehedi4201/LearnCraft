import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react02JsxAndElementsContent: StandardLessonContent = {
  slug: "react02-jsx-and-elements",
  code: "REACT-02",
  title: "JSX: Writing HTML Inside JavaScript & Expressions",
  subtitle: "JSX lets you write markup-like code inside JavaScript using curly braces {} for dynamic values.",
  difficulty: "Easy",
  scenario: {
    question: "You write <h1>Hello, learnerName</h1> and the screen shows the literal word learnerName instead of the variable's value. What is missing?",
    answer: "Put the variable inside curly braces: <h1>Hello, {learnerName}</h1>. Curly braces tell JSX to evaluate JavaScript expressions.",
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
    title: "JSX and JavaScript Inside JSX",
    bigPicture: "JSX is a syntax extension for JavaScript that looks similar to HTML. It allows you to write component structure directly alongside your JavaScript logic. Use curly braces {} to embed any valid JavaScript variable, calculation, or function call inside markup.",
    codeSnippet: `const learnerName = "Rina";

export default function Greeting() {
  return <h1>Hello, {learnerName}!</h1>;
}`,
    analogy: "Think of JSX curly braces like an open window into JavaScript. Everything outside {} is treated as markup text, while everything inside {} is evaluated as live JavaScript code.",
    breakdownTitle: "Key Syntax Rules of JSX",
    breakdownItems: [
      {
        title: "Curly Braces {}",
        desc: "Insert variables, arithmetic, or function results directly into element content or attributes.",
      },
      {
        title: "className Instead of class",
        desc: "Because class is a reserved word in JavaScript, JSX uses className for CSS classes.",
      },
      {
        title: "Self-Closing Tags",
        desc: "All tags without children must be explicitly self-closed, such as <img /> and <input />.",
      },
    ],
  },
  part2: {
    title: "Why JSX Follows JavaScript Rules",
    rule: {
      title: "JSX Single Root Rule",
      content: "A component must return a single root element. If you have multiple siblings, wrap them in a parent element or a React Fragment: <>...</>.",
    },
    cards: [
      {
        number: "01",
        tag: "SYNTAX RULE",
        title: "Dynamic Expressions with {}",
        description: "Pass variables, object properties, template literals, and ternary conditionals inside curly braces.",
        color: "purple",
      },
      {
        number: "02",
        tag: "HTML VS JSX",
        title: "CamelCase Attribute Names",
        description: "Attributes like onclick become onClick, stroke-width becomes strokeWidth, and tabindex becomes tabIndex.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "STRUCTURE",
        title: "React Fragments",
        description: "Use <>...</> to group multiple elements without adding an unnecessary <div> wrapper to the real DOM.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step evaluation of dynamic expressions inside JSX:",
    points: [
      {
        title: "1. Variable Declaration",
        content: "learnerName stores the string 'Rina' in normal JavaScript memory.",
      },
      {
        title: "2. JSX Markup Evaluation",
        content: "The component returns an <h1> element containing a greeting template.",
      },
      {
        title: "3. Expression Interpolation",
        content: "When React encounters {learnerName}, it reads the variable value and displays 'Hello, Rina!'.",
        codeSnippet: `<h1>Hello, {learnerName}!</h1>`,
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Forgetting Curly Braces for Variables",
      code: `// ❌ Renders the literal text "learnerName" on screen
function BadGreeting() {
  const learnerName = "Rina";
  return <h1>Hello, learnerName!</h1>;
}`,
      explanation: "Without curly braces, JSX treats the variable name as plain string text.",
    },
    good: {
      title: "Wrapping Expressions in Curly Braces",
      code: `// ✅ Correctly evaluates the JavaScript variable
function GoodGreeting() {
  const learnerName = "Rina";
  return <h1>Hello, {learnerName}!</h1>;
}`,
      explanation: "Curly braces tell JSX to execute the expression and insert the resulting value.",
    },
    whyItMatters: "Understanding JSX expression boundaries is essential for rendering dynamic API data, formatted numbers, and conditional labels.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice embedding JavaScript values, calculations, and ternary logic inside JSX curly braces:",
    starterCode: `export default function UserBadge() {
  const user = {
    name: "Rina Ahmed",
    role: "Senior Engineer",
    level: 4,
    isOnline: true,
  };

  return (
    <div style={{ padding: "16px", borderRadius: "12px", background: "#0f172a", color: "#f8fafc" }}>
      <h3>{user.name}</h3>
      <p>Role: {user.role} (Tier {user.level * 2})</p>
      <p style={{ color: user.isOnline ? "#4ade80" : "#f87171" }}>
        Status: {user.isOnline ? "● Online" : "○ Away"}
      </p>
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Markup in JavaScript",
        desc: "JSX allows you to write HTML-like syntax directly within JavaScript components.",
      },
      {
        title: "Dynamic Windows {}",
        desc: "Any valid JavaScript variable or expression can be embedded inside JSX using {}.",
      },
      {
        title: "Strict Syntax",
        desc: "Use className, close every tag (<img />), and wrap siblings in fragments (<>...</>).",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which of the following correctly embeds the variable courseCount into JSX?",
      options: [
        "<p>Available courses: {courseCount}</p>",
        "<p>Available courses: {{courseCount}}</p>",
        "<p>Available courses: [courseCount]</p>",
        "<p>Available courses: $courseCount</p>",
      ],
      correctIndex: 0,
      explanation: "In JSX, single curly braces {courseCount} evaluate JavaScript expressions and variables directly in the markup.",
    },
  },
};
