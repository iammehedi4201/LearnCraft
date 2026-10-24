import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx11MissingPagesAndErrorsContent: StandardLessonContent = {
  slug: "nx11-missing-pages-and-errors",
  code: "NX-11",
  title: "Handling Missing Pages and Errors",
  subtitle: "Respond to missing records with notFound() and catch runtime failures with error.tsx boundaries.",
  difficulty: "Moderate",
  scenario: {
    question: "A user opens /courses/999, but course 999 does not exist. Should you show a generic server error?",
    answer: "No. Call notFound() and show a not-found page because the requested course does not exist.",
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
    title: "Handling Missing Pages and Errors",
    bigPicture: "Web applications encounter two different kinds of problems. An expected absence happens when a user types an ID that does not exist in your database (e.g., '/courses/999'). An unexpected error happens when your database goes offline or code crashes. Next.js handles expected missing records using 'notFound()' and 'not-found.tsx', while catching crashes using 'error.tsx'.",
    analogy: "If you walk into a bookstore and ask for a book that does not exist, the clerk politely says 'Sorry, we do not carry that title'—that is notFound(). But if a water pipe suddenly bursts in the cafe corner, a caution barrier is put up while the rest of the bookstore stays open—that is error.tsx isolating a crash.",
    codeSnippet: `// app/courses/[courseId]/page.tsx
import { notFound } from "next/navigation";

interface CoursePageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  // 1. Await the route parameter:
  const { courseId } = await params;

  // 2. Query the database:
  const course = await db.course.findUnique({ where: { id: courseId } });

  // 3. If the record does not exist, call notFound():
  if (!course) {
    notFound(); // Halts rendering and triggers not-found.tsx!
  }

  // 4. If found, render the valid course page:
  return <h1>{course.title}</h1>;
}`,
    breakdownTitle: "How This Works Step by Step",
    breakdownItems: [
      {
        title: "1. Await the Course ID",
        desc: "In modern Next.js, 'params' is a Promise. We await it to extract the requested 'courseId' from the URL.",
      },
      {
        title: "2. Query the Database",
        desc: "We search for the course in the database. If the record does not exist, 'course' returns null.",
      },
      {
        title: "3. Trigger notFound()",
        desc: "Calling 'notFound()' from 'next/navigation' immediately stops rendering the component and instructs Next.js to display your custom 'not-found.tsx' with an official HTTP 404 status code.",
      },
      {
        title: "4. Catch Runtime Crashes with error.tsx",
        desc: "If the database server itself is down, it throws an unexpected exception. Next.js catches this error in 'error.tsx' so the header and navigation remain usable while showing a 'Try again' button.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Error Categorization Rule",
      content: "Distinguish between expected missing items (call notFound() to show a friendly 404) and unexpected system exceptions (caught by error.tsx).",
    },
    cards: [
      {
        number: "01",
        tag: "404 NOT FOUND",
        title: "Expected Absences",
        description: "A user typing an invalid ID is normal behavior; display a helpful 404 with links back to the course catalog.",
        color: "purple",
      },
      {
        number: "02",
        tag: "CRASH RESILIENCE",
        title: "Segment Isolation",
        description: "An error in one nested page does not crash your entire website; navigation and layout stay active.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "RECOVERY",
        title: "The reset() Function",
        description: "error.tsx receives a reset callback that lets users retry rendering without refreshing the entire browser window.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how Next.js isolates and recovers from errors:",
    points: [
      {
        title: "1. Detecting missing records",
        content: "When querying your database, if the result is null or undefined, call notFound() from next/navigation immediately.",
      },
      {
        title: "2. The not-found boundary renders",
        content: "Next.js replaces the page with the UI from app/courses/[courseId]/not-found.tsx or the root app/not-found.tsx.",
      },
      {
        title: "3. Catching unexpected failures",
        content: "If a network request drops or JSON parsing fails, error.tsx wraps the route segment in an Error Boundary and shows a 'Try Again' button.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Forgetting 'use client' on error.tsx",
      code: `// app/courses/error.tsx
// ❌ Missing 'use client' directive!
export default function ErrorPage({ error }: { error: Error }) {
  // Build error: error.tsx must be a Client Component!
  return <div>Something broke: {error.message}</div>;
}`,
      explanation: "Next.js error boundaries MUST be Client Components so they can catch client-side render errors and trigger reset() retries.",
    },
    good: {
      title: "Declaring error.tsx as a Client Component with reset()",
      code: `// app/courses/error.tsx
"use client"; // ✅ Required for error boundaries

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Could not load courses</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}`,
      explanation: "Correctly handles runtime failures with an interactive retry button that attempts to re-render the segment.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore how not-found and error components look:",
    starterCode: `// app/courses/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Course Not Found</h2>
      <p>We could not find the course you requested.</p>
      <Link href="/courses" style={{ color: "#6366f1" }}>
        ← Browse all available courses
      </Link>
    </div>
  );
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which function should you call in a dynamic course page when a requested course ID does not exist in the database?",
      options: [
        "notFound() from 'next/navigation'",
        "process.exit(1)",
        "window.close()",
        "console.clear()",
      ],
      correctIndex: 0,
      explanation: "Calling notFound() tells Next.js to stop rendering the current page and render the closest not-found.tsx component with a 404 status code.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "notFound() for 404s",
        desc: "Call notFound() whenever a database record or resource does not exist.",
      },
      {
        title: "error.tsx Must Be Client",
        desc: "error.tsx must have 'use client' and accepts error and reset props.",
      },
      {
        title: "Localized Impact",
        desc: "Errors are contained within their route segment, leaving outer layouts intact.",
      },
    ],
    nextLessonPreview: {
      title: "Forms and Server Actions",
      desc: "Learn how Server Actions process form submissions directly on the server with full validation and security.",
    },
  },
};
