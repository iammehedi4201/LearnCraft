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
    bigPicture: "Next.js has two kinds of components for different jobs. A Server Component prepares content on the server and is a great place to load data. A Client Component lets part of the page respond to user actions like button clicks. Components are Server Components by default.",
    codeSnippet: `// Example 1: Server Component (app/courses/page.tsx)
type Course = { id: number; title: string };

export default async function CoursesPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const courses: Course[] = await response.json();

  return (
    <main>
      <h1>Courses</h1>
      {courses.slice(0, 5).map((course) => (
        <p key={course.id}>{course.title}</p>
      ))}
    </main>
  );
}

// Example 2: Client Component (app/courses/FavoriteButton.tsx)
"use client";
import { useState } from "react";

export default function FavoriteButton() {
  const [saved, setSaved] = useState(false);
  return (
    <button onClick={() => setSaved(!saved)}>
      {saved ? "Saved" : "Add to favorites"}
    </button>
  );
}`,
    breakdownTitle: "Component Responsibilities",
    breakdownItems: [
      {
        title: "Server Component (Default)",
        desc: "Executes on the server, fetches data directly, keeps heavy libraries off the client bundle, and outputs HTML.",
      },
      {
        title: "Client Component ('use client')",
        desc: "Opt-in directive placed at the top of the file enabling React hooks (useState, useEffect) and event listeners (onClick).",
      },
      {
        title: "Initial Pre-Rendering",
        desc: "Client Components still render initial HTML on the server during the first load; they are not blank while downloading JS.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Decision Rule",
      content: "Does this part only need to show content, or must it respond to user interactions? Use Server Components for data display, and isolate Client Components to interactive islands.",
    },
    cards: [
      {
        number: "01",
        tag: "SERVER DEFAULT",
        title: "Server Components",
        description: "Zero client JavaScript bundle impact, direct access to server resources, and ideal for data-fetching pages.",
        color: "purple",
      },
      {
        number: "02",
        tag: "INTERACTIVE",
        title: "Client Components",
        description: "Marked with 'use client' to handle state, effects, and browser event listeners like click and submit.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "ISLANDS",
        title: "Keep Boundaries Small",
        description: "Do not turn entire pages into Client Components; keep the client boundary small and focused on interactive controls.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to combine Server and Client Components on the same page:",
    points: [
      {
        title: "1. The Server Component parent",
        content: "app/courses/page.tsx stays an async Server Component. It queries your database or API and constructs the main HTML layout.",
      },
      {
        title: "2. The interactive Client leaf",
        content: "Inside the course list, you embed <FavoriteButton />. Only that small button ships interactive JavaScript to the client browser.",
      },
      {
        title: "3. Secret safety",
        content: "Never put database connection strings or private secret keys in Client Component files, because client code can be viewed by anyone in DevTools.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Marking the Whole Page as Client Component",
      code: `"use client"; // In app/courses/page.tsx
// Makes the entire page ship JS to the browser
// Loses direct server database access and SEO benefits`,
      explanation: "Putting 'use client' on the entire page bloats the JavaScript bundle and forces client-side data fetching.",
    },
    good: {
      title: "Isolating Interactive Leaves",
      code: `// app/courses/page.tsx (Server Component)
import FavoriteButton from "./FavoriteButton";

export default async function CoursesPage() {
  const courses = await getCourses(); // Server fetch
  return (
    <div>
      {courses.map((c) => (
        <div key={c.id}>
          <span>{c.title}</span>
          <FavoriteButton /> {/* Isolated Client Component */}
        </div>
      ))}
    </div>
  );
}`,
      explanation: "The page remains a fast, lightweight Server Component while the button handles user interaction.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore how an interactive Client Component is structured:",
    starterCode: `"use client";

import { useState } from "react";

export default function FavoriteToggle({ courseTitle }: { courseTitle: string }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div style={{ border: "1px solid #333", padding: "1rem", borderRadius: "8px" }}>
      <h4>{courseTitle}</h4>
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        style={{
          background: isFavorite ? "#ef4444" : "#4f46e5",
          color: "white",
          border: "none",
          padding: "6px 12px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {isFavorite ? "♥ Favorited" : "♡ Add to Favorites"}
      </button>
    </div>
  );
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which component should you choose for a page that only fetches and displays product information with no buttons or forms?",
      options: [
        "A Server Component, because it prepares data on the server without adding client JS bundle weight",
        "A Client Component with 'use client', because Server Components cannot display HTML",
        "A Web Worker running inside an iframe",
        "A manual Redux store with 10 custom reducers",
      ],
      correctIndex: 0,
      explanation: "If a component only needs to fetch and display data, Server Components are ideal. They execute on the server and add zero JavaScript to the client bundle.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Server by Default",
        desc: "All App Router components are Server Components unless explicitly marked with 'use client'.",
      },
      {
        title: "Client for Interaction",
        desc: "Use 'use client' only when needing state, effects, or browser event listeners.",
      },
      {
        title: "Security Boundary",
        desc: "Never place database connections or private secret keys inside Client Component files.",
      },
    ],
    nextLessonPreview: {
      title: "Client-Side Interaction with State and Events",
      desc: "Learn how React useState and event handlers work inside Client Components to build responsive UI.",
    },
  },
};
