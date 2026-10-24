import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx05DynamicRoutesContent: StandardLessonContent = {
  slug: "nx05-dynamic-routes",
  code: "NX-05",
  title: "Dynamic Routes",
  subtitle: "Use square brackets [id] to create a single reusable page template that handles thousands of different URLs.",
  difficulty: "Moderate",
  scenario: {
    question: "You want a page for /courses/1 and /courses/2 without creating a folder for every course number. How do you name the folder?",
    answer: "Use square brackets for the dynamic segment, such as app/courses/[courseId]/page.tsx.",
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
    title: "Dynamic Routes",
    bigPicture: "Imagine an online store with 10,000 products. You wouldn't want to create 10,000 separate folders! In Next.js, wrapping a folder name in square brackets like [courseId] creates a Dynamic Route. One single page.tsx file acts as a smart template that dynamically loads and displays content based on whatever value appears in the URL.",
    codeSnippet: `// app/courses/[courseId]/page.tsx

// In modern Next.js App Router, 'params' is received as a Promise:
export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  // Step 1: Await the params Promise to extract the URL segment
  const { courseId } = await params;

  // Step 2: Render the page using that specific ID
  return (
    <main>
      <h1>Course Details</h1>
      <p>Currently viewing course ID: <strong>{courseId}</strong></p>
    </main>
  );
}

// How URLs map to this file:
// /courses/react-101   -> courseId is "react-101"
// /courses/nextjs-deep -> courseId is "nextjs-deep"
// /courses/42          -> courseId is "42"`,
    breakdownTitle: "How This Works Step by Step",
    breakdownItems: [
      {
        title: "1. The Square Bracket Syntax [paramName]",
        desc: "Naming a folder [courseId] tells Next.js: 'This part of the URL is a variable, not a fixed word.'",
      },
      {
        title: "2. The params Promise",
        desc: "Next.js passes the captured URL value into your page component via the params prop.",
      },
      {
        title: "3. const { courseId } = await params",
        desc: "You await params to get the value. If the user visited /courses/42, courseId is '42'. You can use this ID to fetch that course from your database.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "The Dynamic Template Rule",
      content: "Use square brackets [param] whenever multiple items share the same page layout but show different data based on an ID, username, or slug in the URL.",
    },
    cards: [
      {
        number: "01",
        tag: "SCALABILITY",
        title: "One Template for Thousands",
        description: "A single [slug]/page.tsx file can serve 100,000 blog posts or user profiles without creating duplicate code.",
        color: "purple",
      },
      {
        number: "02",
        tag: "CLEAN URLS",
        title: "Human-Readable Slugs",
        description: "Dynamic segments can be numbers (/courses/42) or descriptive slugs (/courses/learn-nextjs) for optimal SEO.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "ASYNC PARAMS",
        title: "Awaited in Modern Next.js",
        description: "Next.js makes params a Promise so it can stream page headers before waiting for slow route parameters.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to design dynamic routes in production applications:",
    points: [
      {
        title: "1. Matching the folder name to the variable",
        content: "If your folder is named [courseId], the extracted property will be params.courseId. If named [slug], it will be params.slug.",
      },
      {
        title: "2. Fetching real data with the ID",
        content: "Once you extract courseId, pass it directly to your database: const course = await db.course.findUnique({ where: { id: courseId } }).",
      },
      {
        title: "3. Catch-all dynamic segments",
        content: "For docs or complex hierarchies with multiple slashes (e.g. /docs/react/hooks/usestate), use [...slug] to capture an array of all path segments.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Creating Fixed Folders for Every Single Item",
      code: `// ❌ BAD: Creating hardcoded folders for every item!
// app/courses/1/page.tsx
// app/courses/2/page.tsx
// app/courses/3/page.tsx
// ... app/courses/1000/page.tsx

export default function CourseOne() {
  return <h1>Course 1</h1>;
}`,
      explanation: "Manually creating static folders for dynamic database items creates an unmaintainable project that cannot scale.",
    },
    good: {
      title: "One Dynamic Folder with [paramName]",
      code: `// ✅ CLEAN: One dynamic segment folder handles all items!
// app/courses/[courseId]/page.tsx

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await getCourseFromDb(courseId);

  return (
    <article>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
    </article>
  );
}`,
      explanation: "A single dynamic route template serves every current and future course automatically from your database.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Try this dynamic route component. Notice how params is awaited to display the dynamic courseId:",
    starterCode: `// app/courses/[courseId]/page.tsx
import React from "react";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  // Simulate awaiting the route parameter from Next.js:
  const { courseId } = await params;

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1.5rem" }}>
      <span style={{ background: "#e0e7ff", color: "#4338ca", padding: "4px 8px", borderRadius: "4px", fontSize: "12px" }}>
        DYNAMIC ROUTE
      </span>
      <h2 style={{ marginTop: "12px" }}>Course ID: {courseId}</h2>
      <p style={{ color: "#4b5563" }}>
        This single file responds to any URL matching /courses/[courseId]!
      </p>
    </div>
  );
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "If your folder is named app/products/[productId], how do you read the productId inside the page component?",
      options: [
        "By awaiting the params prop: const { productId } = await params",
        "By writing a custom Webpack plugin for every dynamic URL",
        "By inspecting document.title in the browser console",
        "By renaming the file to index.html",
      ],
      correctIndex: 0,
      explanation: "Next.js provides dynamic path segments via the params Promise prop, matching the exact folder name inside the square brackets.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Square Bracket Syntax",
        desc: "Folders wrapped in [brackets] act as dynamic parameters in the URL.",
      },
      {
        title: "Await params",
        desc: "In modern Next.js App Router, params is a Promise that must be awaited.",
      },
      {
        title: "Single Reusable Template",
        desc: "One dynamic page file serves unlimited items from your database or API.",
      },
    ],
    nextLessonPreview: {
      title: "Server and Client Components",
      desc: "Learn the core mental model of React Server Components: server data preparation vs client interactivity.",
    },
  },
};
