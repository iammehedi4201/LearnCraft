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
    bigPicture: "Different problems need different responses. not-found.tsx shows a clear 404 page when a resource does not exist. error.tsx provides a fallback UI for unexpected runtime crashes. The notFound() function stops rendering the current route when a record is missing.",
    codeSnippet: `// app/courses/[courseId]/page.tsx
import { notFound } from "next/navigation";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await findCourse(courseId);

  if (!course) {
    notFound(); // Triggers not-found.tsx
  }

  return <h1>{course.title}</h1>;
}`,
    breakdownTitle: "Error Primitives",
    breakdownItems: [
      {
        title: "notFound() Function",
        desc: "Terminates rendering immediately and triggers the closest not-found.tsx UI with a 404 status code.",
      },
      {
        title: "not-found.tsx",
        desc: "Dedicated UI shown when a route does not exist or when notFound() is invoked.",
      },
      {
        title: "error.tsx (Client Component)",
        desc: "Catches unexpected runtime exceptions in a route segment and provides a reset() function to retry rendering.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Error Categorization Rule",
      content: "Distinguish between expected missing items (use notFound()) and unexpected system crashes (caught by error.tsx).",
    },
    cards: [
      {
        number: "01",
        tag: "404 NOT FOUND",
        title: "Expected Absences",
        description: "A user typing an invalid ID is normal behavior; display a helpful 404 with links back to the home page.",
        color: "purple",
      },
      {
        number: "02",
        tag: "CRASH RESILIENCE",
        title: "Segment Isolation",
        description: "An error in one segment does not bring down the entire app; the rest of your layout and navigation remains usable.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "RECOVERY",
        title: "The reset() Function",
        description: "error.tsx receives a reset callback that lets users retry rendering without refreshing the whole browser.",
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
      title: "Making error.tsx a Server Component",
      code: `// app/courses/error.tsx
// ❌ Missing 'use client' directive
export default function ErrorPage({ error }: { error: Error }) {
  return <div>Something went wrong: {error.message}</div>;
}`,
      explanation: "Next.js error boundaries MUST be Client Components so they can catch client-side render errors and trigger reset() retries.",
    },
    good: {
      title: "Declaring error.tsx as a Client Component",
      code: `// app/courses/error.tsx
"use client"; // Required for error boundaries

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Could not load courses</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}`,
      explanation: "Correctly handles runtime failures with an interactive retry button.",
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
