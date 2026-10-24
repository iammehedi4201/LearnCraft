import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx01WhatIsNextjsContent: StandardLessonContent = {
  slug: "nx01-what-is-nextjs",
  code: "NX-01",
  title: "What Is Next.js?",
  subtitle: "Next.js is a framework built on React that adds routing, server rendering, data loading, and request handling.",
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
    analogy: "Think of React as a powerful car engine. It runs great, but an engine alone cannot get you to work. Next.js is the complete car: it takes that engine and adds the wheels, steering wheel, doors, headlights, and GPS so you can start driving immediately.",
    codeSnippet: `// app/page.tsx
export default function HomePage() {
  return <h1>Welcome to LearnCraft</h1>;
}

// When a user visits '/', Next.js uses this file to show the home page.`,
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
        title: "1. Component Definition",
        desc: "HomePage is the component that describes this page.",
      },
      {
        title: "2. JSX Heading Output",
        desc: "The function returns an <h1> heading.",
      },
      {
        title: "3. Route Mapping (/)",
        desc: "Next.js shows that heading when the user opens '/'.",
      },
      {
        title: "4. Server-Rendered HTML",
        desc: "Next.js renders this on the server by default and sends ready-to-view HTML to the browser.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Why It Matters",
      content: "You can build pages and app features without setting up routing and every server feature yourself.",
    },
    cards: [
      {
        number: "01",
        tag: "ALL-IN-ONE",
        title: "Complete Website Tooling",
        description: "Includes routing, data fetching, server rendering, and API handlers in a single package without manual setup.",
        color: "purple",
      },
      {
        number: "02",
        tag: "ROUTING",
        title: "Zero-Config Routing",
        description: "No need for external packages like react-router-dom; creating folders automatically creates web pages.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "SERVER-FIRST",
        title: "Fast Server Rendering",
        description: "Components render on the server before reaching the user, making pages load fast even on slow mobile networks.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how Next.js powers modern web applications:",
    points: [
      {
        title: "1. Unified developer experience",
        content: "Instead of building a separate React frontend project and an Express backend project, Next.js lets you build pages, API routes, and database mutations in a single codebase.",
      },
      {
        title: "2. Instant page display for visitors",
        content: "Pure React sends an empty HTML page that shows a white screen while downloading big JavaScript files. Next.js prepares the full HTML on the server, so visitors see text and pictures instantly.",
      },
      {
        title: "3. Automatic production optimization",
        content: "Next.js automatically splits your code into small chunks, compresses images into WebP format, and prefetches linked pages when they appear on the screen.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Setting Up Routing Manually in Pure React",
      code: `// Pure React SPA setup:
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Requires installing extra packages, configuring bundlers,
// and manually handling server rendering and SEO tags.`,
      explanation: "Building a multi-page app with pure React requires installing and configuring several external packages manually.",
    },
    good: {
      title: "Automatic File-System Page in Next.js",
      code: `// app/page.tsx
export default function HomePage() {
  return <h1>Welcome to LearnCraft</h1>;
}
// Automatically available at http://localhost:3000/ with zero extra configuration!`,
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
