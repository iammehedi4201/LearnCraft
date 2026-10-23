import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx01WhatIsNextjsContent: StandardLessonContent = {
  slug: "nx01-what-is-nextjs",
  code: "NX-01",
  title: "What Is Next.js?",
  subtitle: "Next.js is a full-stack React framework that adds routing, server rendering, and data loading.",
  difficulty: "Moderate",
  scenario: {
    question: "You want to build a website with a home page, product pages, and a way to load product data. Why might you use Next.js instead of only React?",
    answer: "React helps build the UI. Next.js also gives me routing and server-side tools to load data and build the full website in one framework.",
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
    title: "What Is Next.js?",
    bigPicture: "Next.js is a framework built on React. React helps you build UI components. Next.js adds tools for building a complete website, such as routing, server rendering, data loading, and ways to handle pages and requests.",
    codeSnippet: `// app/page.tsx
export default function HomePage() {
  return <h1>Welcome to LearnCraft</h1>;
}

// When a user visits '/', Next.js uses this file to show the home page.`,
    breakdownTitle: "Framework Essentials",
    breakdownItems: [
      {
        title: "Built on React",
        desc: "You write standard React JSX components, but Next.js manages how and where they get rendered.",
      },
      {
        title: "Integrated Routing",
        desc: "File-system routing means creating a folder with page.tsx immediately creates a working URL route.",
      },
      {
        title: "Server Capabilities",
        desc: "Next.js can render components on the server and fetch data directly before sending HTML to the browser.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Why Use Next.js?",
      content: "You can build pages and full-stack app features without setting up client routers, bundlers, and server features yourself.",
    },
    cards: [
      {
        number: "01",
        tag: "ALL-IN-ONE",
        title: "Full Website Solution",
        description: "Provides routing, data fetching, server rendering, and API handlers in a single unified tool.",
        color: "purple",
      },
      {
        number: "02",
        tag: "ROUTING",
        title: "Zero-Config Routing",
        description: "No need for external routing packages; the file-system structure directly controls your URLs.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "SERVER-SIDE",
        title: "Server-First by Default",
        description: "Components render on the server by default, improving load performance and search engine visibility.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how Next.js powers real-world web applications:",
    points: [
      {
        title: "1. Unified developer experience",
        content: "Instead of maintaining a separate React frontend project and an Express backend project for basic websites, Next.js gives you both under one roof.",
      },
      {
        title: "2. Fast initial page loads",
        content: "By preparing HTML on the server before sending it over the network, users see content immediately instead of waiting for large JavaScript bundles to download and parse.",
      },
      {
        title: "3. Direct data fetching",
        content: "Server Components can fetch data from databases or external APIs directly inside async component functions without boilerplate state or effect hooks.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Over-complicating Pure React SPAs",
      code: `// Building routing from scratch in a pure React SPA
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Requires separate bundler setup, manual SSR, and API wiring`,
      explanation: "Using vanilla React for a multi-page website requires assembling routing, SSR, code splitting, and build pipelines manually.",
    },
    good: {
      title: "Clean Next.js File-System Page",
      code: `// app/page.tsx
export default function HomePage() {
  return <h1>Welcome to LearnCraft</h1>;
}
// Automatically available at http://localhost:3000/`,
      explanation: "Next.js configures routing, bundling, and server rendering automatically based on standard file conventions.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore a basic Next.js page component:",
    starterCode: `// app/page.tsx
export default function HomePage() {
  const platformName = "LearnCraft";
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Welcome to {platformName}</h1>
      <p>Master modern full-stack web development step by step.</p>
    </main>
  );
}

// In Next.js, exporting a default React component from app/page.tsx creates your root page.`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the primary difference between vanilla React and Next.js?",
      options: [
        "React is a UI library; Next.js is a full framework that adds routing, server rendering, and data loading",
        "React runs only in Python; Next.js runs in JavaScript",
        "Next.js cannot use standard React components or JSX",
        "Next.js replaces HTML entirely with binary machine code",
      ],
      correctIndex: 0,
      explanation: "React is a UI component library. Next.js builds on top of React to provide complete full-stack website capabilities including file-system routing and server rendering.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Framework on React",
        desc: "Next.js builds on React to provide complete web application architecture.",
      },
      {
        title: "File-Based Routing",
        desc: "Folders inside app/ define routes without manual router configuration.",
      },
      {
        title: "Server Capabilities",
        desc: "Renders pages on the server and loads data before shipping HTML to the browser.",
      },
    ],
    nextLessonPreview: {
      title: "The app Folder and Routes",
      desc: "Learn how folders and page.tsx files define your application's URLs.",
    },
  },
};
