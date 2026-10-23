import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx08FetchingDataServerComponentContent: StandardLessonContent = {
  slug: "nx08-fetching-data-server-component",
  code: "NX-08",
  title: "Fetching Data in a Server Component",
  subtitle: "Server Components can be async functions that directly fetch data from APIs or databases.",
  difficulty: "Moderate",
  scenario: {
    question: "A courses page needs a list of courses from your API. The list does not need browser interaction just to appear. Where is a good place to load the data?",
    answer: "Load it in the Server Component for the page. Add a Client Component only for parts that need interaction.",
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
    title: "Fetching Data in a Server Component",
    bigPicture: "A Server Component can be an async function and load data before it returns the page UI. This is useful when a page needs data from an API or a database.",
    codeSnippet: `// app/posts/page.tsx
type Post = { id: number; title: string };

export default async function PostsPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error("Could not load posts");
  }

  const posts: Post[] = await response.json();

  return (
    <ul>
      {posts.slice(0, 5).map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`,
    breakdownTitle: "Step-by-Step Flow",
    breakdownItems: [
      {
        title: "1. await fetch(...)",
        desc: "Requests data on the server during rendering before any HTML is sent to the client.",
      },
      {
        title: "2. response.ok check",
        desc: "Validates whether the HTTP response succeeded to catch network or API failures early.",
      },
      {
        title: "3. Direct JSX mapping",
        desc: "Renders the fetched data directly with standard Array.map() without requiring useState or useEffect.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Server Data Rule",
      content: "Load data on the server without shipping data-loading logic or sensitive API credentials to the browser.",
    },
    cards: [
      {
        number: "01",
        tag: "NO HOOKS",
        title: "Direct async/await",
        description: "No boilerplate useEffect, loading booleans, or manual error states required for standard page reads.",
        color: "purple",
      },
      {
        number: "02",
        tag: "SECURITY",
        title: "Keep Secrets Server-Side",
        description: "API tokens and database credentials stay safely on the server and are never exposed to browser clients.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "WATERFALL",
        title: "Reduced Latency",
        description: "Server-to-database connections usually execute over high-speed data center backbones with minimal latency.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about server data fetching in production apps:",
    points: [
      {
        title: "1. Server-side execution",
        content: "The async function runs on your server. Next.js pauses rendering until the promise resolves, then generates the finished HTML.",
      },
      {
        title: "2. Error propagation",
        content: "If response.ok is false and you throw an error, Next.js catches it and displays your nearest error.tsx boundary.",
      },
      {
        title: "3. Private data checks",
        content: "Always check user authentication and permissions before returning private or sensitive records from your data store.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Client-Side useEffect Fetch Waterfall",
      code: `// Old client-side pattern in pure React:
"use client";
import { useState, useEffect } from "react";

export default function Courses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses").then(r => r.json()).then(d => {
      setData(d);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  return <div>{/* Render data */}</div>;
}`,
      explanation: "Client useEffect fetching forces the browser to download JS, parse it, mount the component, and only then fire a network request, causing layout shift.",
    },
    good: {
      title: "Direct Server Component Async Fetch",
      code: `// Clean Next.js Server Component pattern:
export default async function CoursesPage() {
  const res = await fetch("https://api.example.com/courses");
  if (!res.ok) throw new Error("Failed to load courses");
  const courses = await res.json();

  return (
    <ul>
      {courses.map((course: any) => (
        <li key={course.id}>{course.title}</li>
      ))}
    </ul>
  );
}`,
      explanation: "Data is loaded on the server and arrives immediately inside the initial HTML document.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore an async Server Component data fetching function:",
    starterCode: `// app/courses/page.tsx
type CourseItem = { id: number; title: string; category: string };

export default async function CoursesPage() {
  // Simulated server fetch:
  const courses: CourseItem[] = [
    { id: 1, title: "Next.js App Router Foundations", category: "Framework" },
    { id: 2, title: "TypeScript Deep Dive", category: "Language" },
    { id: 3, title: "Full-Stack System Design", category: "Architecture" },
  ];

  return (
    <div>
      <h2>Available Courses</h2>
      <ul>
        {courses.map((c) => (
          <li key={c.id}>
            <strong>{c.title}</strong> — <em>{c.category}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why is fetching data in an async Server Component often better than using useEffect in the browser?",
      options: [
        "Data is loaded on the server before HTML is sent, avoiding client waterfalls and keeping API keys secure",
        "Server Components can only fetch data from Google, not other APIs",
        "useEffect is completely deprecated in React 19",
        "Client fetching runs only when the computer is turned off",
      ],
      correctIndex: 0,
      explanation: "Fetching in Server Components delivers pre-rendered HTML to the user, avoids loading waterfalls, and keeps private API secrets off the client.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Async Components",
        desc: "Server Components can be async functions that await promises directly.",
      },
      {
        title: "Error Handling",
        desc: "Check response.ok and throw descriptive errors when HTTP requests fail.",
      },
      {
        title: "Zero Boilerplate",
        desc: "No useState or useEffect needed for initial data loading.",
      },
    ],
    nextLessonPreview: {
      title: "URL Parameters and Search Parameters",
      desc: "Learn how to read dynamic route parameters and query strings from searchParams.",
    },
  },
};
