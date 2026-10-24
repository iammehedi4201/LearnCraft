import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx08FetchingDataServerComponentContent: StandardLessonContent = {
  slug: "nx08-fetching-data-server-component",
  code: "NX-08",
  title: "Fetching Data in a Server Component",
  subtitle: "In Next.js, page components run on the server by default. You can use direct async/await without useEffect or useState!",
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
    bigPicture: "In standard React, loading data requires useState, useEffect, and a loading spinner. In the Next.js App Router, your page is a Server Component by default! It runs on the server, so you can turn it into an async function and directly await your data before returning JSX. The browser receives complete HTML with the data already inside.",
    codeSnippet: `// app/posts/page.tsx
type Post = { id: number; title: string };

// 1. Notice the 'async' keyword on the component:
export default async function PostsPage() {
  // 2. Await data directly on the server — NO useEffect or useState needed!
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error("Could not load posts");
  }

  const posts: Post[] = await response.json();

  // 3. Return HTML with the data already rendered:
  return (
    <main>
      <h1>Latest Posts</h1>
      <ul>
        {posts.slice(0, 5).map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}`,
    breakdownTitle: "How This Works Step by Step",
    breakdownItems: [
      {
        title: "1. async function PostsPage()",
        desc: "Because this component runs on the server, React allows it to be an asynchronous function.",
      },
      {
        title: "2. await fetch(...)",
        desc: "Next.js pauses rendering on the server, fetches the data, and checks response.ok before continuing.",
      },
      {
        title: "3. Direct JSX Rendering",
        desc: "The data is mapped directly into <li> elements. Next.js produces finished HTML and sends it to the user's browser.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "The Server Data Rule",
      content: "Always fetch and prepare data inside Server Components by default. Use Client Components ('use client') only when you need interactive browser features like onClick or useState.",
    },
    cards: [
      {
        number: "01",
        tag: "NO HOOKS",
        title: "Say Goodbye to useEffect",
        description: "You no longer need useState(data), useState(loading), or useEffect dependency arrays just to show a list of items.",
        color: "purple",
      },
      {
        number: "02",
        tag: "INSTANT HTML",
        title: "No Initial Blank Screen",
        description: "The user gets real text and items in the initial HTML response immediately, instead of an empty white page waiting for client JavaScript.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "SECURITY",
        title: "Keep Database Secrets Safe",
        description: "Because this code runs strictly on the server, private API keys, database credentials, and internal queries never leak to the client.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here are the 3 essential rules to remember when fetching data on the server:",
    points: [
      {
        title: "1. Server vs Browser Execution",
        content: "If you add console.log('FETCHING...') inside this component, you will see it in your terminal, NOT in the browser DevTools console. The browser only receives the finished HTML output.",
      },
      {
        title: "2. Fetching from APIs or Databases",
        content: "Because you are on the server, you aren't limited to fetch()! You can query your database directly using ORMs like Prisma (e.g. await db.post.findMany()) without building a separate API route.",
      },
      {
        title: "3. Handling Errors Gracefully",
        content: "Always check 'if (!response.ok)' when calling HTTP APIs. If you throw new Error(), Next.js automatically shows your nearest error.tsx file without crashing the entire app.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Old React Way: Client-Side useEffect & useState Waterfall",
      code: `// ❌ OLD REACT PATTERN (Slow & Boilerplate heavy)
"use client";
import { useState, useEffect } from "react";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading courses...</p>;
  return <ul>{courses.map((c: any) => <li key={c.id}>{c.title}</li>)}</ul>;
}`,
      explanation: "The browser downloads empty HTML, then downloads JavaScript, and only THEN starts fetching data. The user stares at a loading spinner.",
    },
    good: {
      title: "Next.js Way: Direct Async Server Component",
      code: `// ✅ NEXT.JS PATTERN (Fast, Clean & Zero Hooks)
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
      explanation: "The server fetches the data and sends finished HTML with all courses already rendered. Fast for users and great for SEO.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore how clean an async Server Component is. Notice that data is loaded right at the top of the function:",
    starterCode: `// app/courses/page.tsx
type CourseItem = { id: number; title: string; category: string };

export default async function CoursesPage() {
  // Direct server data loading (simulating a database or API call):
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
      question: "Why is fetching data in an async Server Component better for showing a page than using useEffect in standard React?",
      options: [
        "Data is loaded on the server before HTML is sent, avoiding loading spinners and keeping API keys secure",
        "Server Components can only fetch data from Google APIs",
        "useEffect is completely forbidden in all web development",
        "Server Components only work when the user's internet is turned off",
      ],
      correctIndex: 0,
      explanation: "Fetching in Server Components delivers pre-rendered HTML to the user, avoids loading waterfalls, and keeps private API secrets off the client.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Async by Default",
        desc: "Server Components can be declared as async functions and await data directly.",
      },
      {
        title: "Zero Hook Boilerplate",
        desc: "No need for useState, useEffect, or loading booleans just to display content.",
      },
      {
        title: "Always Check response.ok",
        desc: "Verify that HTTP requests succeeded before parsing JSON so errors trigger your error.tsx boundary.",
      },
    ],
    nextLessonPreview: {
      title: "URL Parameters and Search Parameters",
      desc: "Learn how to read dynamic route parameters and query strings from searchParams.",
    },
  },
};
