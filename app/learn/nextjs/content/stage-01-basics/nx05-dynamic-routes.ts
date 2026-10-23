import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx05DynamicRoutesContent: StandardLessonContent = {
  slug: "nx05-dynamic-routes",
  code: "NX-05",
  title: "Dynamic Routes",
  subtitle: "Dynamic segments like [courseId] let one page show different content based on the URL path.",
  difficulty: "Moderate",
  scenario: {
    question: "You have hundreds of courses. You want /courses/12 and /courses/25 to show different courses using the same page. How can you do that?",
    answer: "Create app/courses/[courseId]/page.tsx, read courseId from params, and use it to load the correct course.",
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
    bigPicture: "A dynamic route lets one page show different content based on part of the URL. Put a route name in square brackets, such as [courseId]. In current App Router versions, params is asynchronous.",
    codeSnippet: `// app/courses/[courseId]/page.tsx
export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return <h1>Course: {courseId}</h1>;
}

// Visiting '/courses/42' gives courseId the value '42'.`,
    breakdownTitle: "Dynamic Segment Primitives",
    breakdownItems: [
      {
        title: "Bracket Syntax",
        desc: "Wrapping a folder name in square brackets [paramName] captures that portion of the URL.",
      },
      {
        title: "Async params Promise",
        desc: "In modern Next.js App Router, params is provided as a Promise that must be awaited.",
      },
      {
        title: "Reusable Page Template",
        desc: "One single file handles thousands of distinct items, such as blog posts, user profiles, or products.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Dynamic Segment Rule",
      content: "Use dynamic segments whenever the exact route segment is determined by database IDs, slugs, or user input.",
    },
    cards: [
      {
        number: "01",
        tag: "SCALE",
        title: "Scale Without Duplication",
        description: "Instead of hardcoding a folder for every course or blog post, a single dynamic template serves all of them.",
        color: "purple",
      },
      {
        number: "02",
        tag: "ASYNC",
        title: "Awaited Params",
        description: "Modern Next.js passes params as a Promise, ensuring compatibility with streaming and concurrent features.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "FLEXIBLE",
        title: "Data Driving UI",
        description: "The extracted ID or slug parameter is passed directly to your database query or API fetch function.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how dynamic segments route and load data:",
    points: [
      {
        title: "1. Defining the dynamic folder",
        content: "Create app/courses/[courseId]/page.tsx. Any URL matching /courses/anything routes to this page.",
      },
      {
        title: "2. Awaiting the parameters",
        content: "Inside the async page function, write const { courseId } = await params to extract the string value.",
      },
      {
        title: "3. Loading matching data",
        content: "Use courseId to look up the specific course in your database and render its title, description, and lessons.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Accessing params Synchronously in Modern Next.js",
      code: `// Synchronous access in Next.js 15+ causes a runtime warning/error:
export default function CoursePage({
  params,
}: {
  params: { courseId: string }; // Outdated synchronous pattern
}) {
  return <h1>Course: {params.courseId}</h1>;
}`,
      explanation: "In modern Next.js App Router, params is asynchronous and must be typed as Promise<{ param: string }> and awaited.",
    },
    good: {
      title: "Awaiting params Cleanly",
      code: `// Modern, type-safe Next.js async params pattern:
export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  return <h1>Course: {courseId}</h1>;
}`,
      explanation: "Awaiting params is fully compliant with the modern App Router and guarantees correct concurrent execution.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore how an async dynamic route extracts URL parameters:",
    starterCode: `// app/courses/[courseId]/page.tsx
interface CoursePageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;

  return (
    <article>
      <h2>Active Course ID: {courseId}</h2>
      <p>Now loading data from database for course #{courseId}...</p>
    </article>
  );
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "How should page components access dynamic route parameters in modern Next.js App Router?",
      options: [
        "By typing params as Promise<{ [key: string]: string }> and using await params inside an async component",
        "By reading window.location.pathname with regular expressions",
        "By importing a global singleton from 'next/router'",
        "By writing a custom Webpack plugin for every dynamic URL",
      ],
      correctIndex: 0,
      explanation: "Modern Next.js App Router delivers route params as a Promise in page props, requiring async component functions and await params.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Bracket Folder Syntax",
        desc: "[courseId] captures dynamic URL path segments into parameters.",
      },
      {
        title: "Async Parameters",
        desc: "params is a Promise in current App Router versions and must be awaited.",
      },
      {
        title: "One Template for Many",
        desc: "One dynamic page file serves hundreds or thousands of database-driven records.",
      },
    ],
    nextLessonPreview: {
      title: "Server Components and Client Components",
      desc: "Master the fundamental boundary: understand when code runs on the server vs in the browser.",
    },
  },
};
