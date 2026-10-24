import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx06ServerAndClientComponentsContent: StandardLessonContent = {
  slug: "nx06-server-and-client-components",
  code: "NX-06",
  title: "Server Components and Client Components",
  subtitle: "Understand the React Server Component paradigm: server data preparation versus client interactivity.",
  difficulty: "Difficult",
  scenario: {
    question: "You build a courses page. It loads course names from an API, and each course has a button to save it as a favorite. Should the whole page be a Client Component?",
    answer: "No. Keep the page as a Server Component to load and show the courses. Make only the favorite button a Client Component because it needs to respond to clicks.",
  },
  interviewQuestion: {
    question: "What is the difference between a Server Component and a Client Component?",
    answer: "A Server Component is a good place to load data and prepare page content on the server. A Client Component is used for interactive parts that need clicks, state, or browser features. A page can use both.",
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
    title: "Server Components and Client Components",
    bigPicture: "Next.js uses two kinds of components that work as a team. By default, every component is a Server Component — it runs on your server, loads data, and sends fast HTML to the browser with zero extra JavaScript. When you need interactive features like button clicks, input typing, or useState, you add 'use client' at the top of that specific component. The best practice is to keep the main page as a Server Component and import small Client Components for the buttons!",
    codeSnippet: `// 1. app/courses/FavoriteButton.tsx — The Client Component ("use client")
"use client"; // Tells Next.js: this component runs in the browser for interactivity!

import { useState } from "react";

export default function FavoriteButton({ courseTitle }: { courseTitle: string }) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <button onClick={() => setIsSaved(!isSaved)}>
      {isSaved ? "⭐ Saved" : "☆ Save"}
    </button>
  );
}

// 2. app/courses/page.tsx — The Server Component (Default)
// Notice: NO "use client" here! This runs safely on your server.
import FavoriteButton from "./FavoriteButton"; // Import the client button!

export default async function CoursesPage() {
  // Directly load data on the server:
  const courses = [
    { id: 1, title: "Next.js App Router Masterclass" },
    { id: 2, title: "TypeScript Architecture" },
  ];

  return (
    <main>
      <h1>Available Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <span>{course.title}</span>
            {/* Embed the interactive Client button right inside the Server list: */}
            <FavoriteButton courseTitle={course.title} />
          </li>
        ))}
      </ul>
    </main>
  );
}`,
    breakdownTitle: "How This Teamwork Works Step by Step",
    breakdownItems: [
      {
        title: "1. Server Component Runs First",
        desc: "CoursesPage runs on the server, fetches data from the database, and creates the HTML list. Zero data-fetching JavaScript is sent to the client.",
      },
      {
        title: "2. Client Component Island ('use client')",
        desc: "FavoriteButton is marked with 'use client' because it needs onClick and useState to change colors when clicked.",
      },
      {
        title: "3. Direct Composition",
        desc: "The Server Component imports and renders <FavoriteButton /> directly. Next.js only downloads JavaScript for that button, keeping the page lightning-fast!",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "The Island Architecture Rule",
      content: "Keep entire pages as Server Components by default. Push 'use client' down to the smallest leaves of your component tree (like buttons, modals, and search inputs).",
    },
    cards: [
      {
        number: "01",
        tag: "SERVER DEFAULT",
        title: "Server Components (Default)",
        description: "Best for: fetching data, accessing databases, reading private API secrets, and displaying content with zero client JS.",
        color: "purple",
      },
      {
        number: "02",
        tag: "CLIENT DIRECTIVE",
        title: "Client Components ('use client')",
        description: "Best for: onClick, onChange, useState, useEffect, browser APIs (localStorage, window), and custom UI animations.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "HYBRID BENEFIT",
        title: "Best of Both Worlds",
        description: "You get the lightning speed and SEO of server rendering, combined with the instant interactivity of React state.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here are the 3 golden rules for combining Server and Client Components:",
    points: [
      {
        title: "1. Can a Server Component import a Client Component?",
        content: "YES! This is the most common pattern. Your Server Component page imports a Client Component (like <FavoriteButton />) and renders it.",
      },
      {
        title: "2. Can a Client Component import a Server Component?",
        content: "NOT directly with an import statement. But you CAN pass a Server Component as a child: <ClientModal>{<ServerDataList />}</ClientModal>.",
      },
      {
        title: "3. Where do secrets live?",
        content: "Never put database connection strings or secret API keys in a Client Component file. Anyone can inspect client code in browser DevTools.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Turning the Entire Page into a Client Component",
      code: `// ❌ BAD: Putting "use client" at the top of the whole page!
"use client";
import { useState, useEffect } from "react";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // 💥 Lost server rendering! User sees blank screen until JS downloads!
    fetch("/api/courses").then(r => r.json()).then(setCourses);
  }, []);

  return <div>{/* 200 lines of page layout */}</div>;
}`,
      explanation: "Making the entire page a Client Component forces the browser to download huge JavaScript bundles and loses the speed and SEO of Server Components.",
    },
    good: {
      title: "Server Page with an Isolated Client Button",
      code: `// ✅ CLEAN: Server page stays fast; only the button is a Client Component!
// app/courses/page.tsx (Server Component)
import FavoriteButton from "./FavoriteButton";

export default async function CoursesPage() {
  const courses = await fetchCoursesOnServer(); // Fast & Direct!

  return (
    <main>
      <h1>Courses</h1>
      {courses.map(c => (
        <div key={c.id}>
          <h3>{c.title}</h3>
          <FavoriteButton courseId={c.id} />
        </div>
      ))}
    </main>
  );
}`,
      explanation: "Only the interactive button downloads JavaScript. The rest of the page arrives as instant, lightweight HTML.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Observe how clean this separation is: the server component loads data, while the client component handles clicks:",
    starterCode: `// 1. Client Component for interactivity:
"use client";
import React, { useState } from "react";

export function CounterButton() {
  const [likes, setLikes] = useState(0);
  return (
    <button onClick={() => setLikes(likes + 1)} style={{ padding: "6px 12px", cursor: "pointer" }}>
      👍 {likes} Likes
    </button>
  );
}

// 2. Server Component for data display:
export default function CourseCard() {
  const course = { title: "Next.js Architecture", author: "LearnCraft" };

  return (
    <div style={{ padding: "1rem", border: "1px solid #e5e7eb", borderRadius: "8px", maxWidth: "320px" }}>
      <h3>{course.title}</h3>
      <p style={{ color: "#6b7280" }}>By {course.author}</p>
      <CounterButton />
    </div>
  );
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "You are building a blog post page with a comment like button. What is the best architecture?",
      options: [
        "Keep the blog post page as a Server Component and make only the like button a Client Component",
        "Make the entire blog page a Client Component with 'use client' at the top",
        "Never use buttons in Next.js applications",
        "Delete all React components and write raw PHP",
      ],
      correctIndex: 0,
      explanation: "Keep the page as a Server Component for instant HTML rendering and SEO, and isolate Client Components ('use client') only to interactive controls like buttons.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Server by Default",
        desc: "All App Router components run on the server unless explicitly marked with 'use client'.",
      },
      {
        title: "Client for Interactivity",
        desc: "Use 'use client' when you need onClick, onChange, useState, useEffect, or browser APIs.",
      },
      {
        title: "Keep Client Leaves Small",
        desc: "Do not turn full pages into client components; keep the interactive boundary as small as possible.",
      },
    ],
    nextLessonPreview: {
      title: "Client-Side Interaction with State and Events",
      desc: "Deep dive into how React useState and event handlers work inside Client Components.",
    },
  },
};
