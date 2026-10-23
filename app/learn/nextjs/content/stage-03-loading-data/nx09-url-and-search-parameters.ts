import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx09UrlAndSearchParametersContent: StandardLessonContent = {
  slug: "nx09-url-and-search-parameters",
  code: "NX-09",
  title: "URL Parameters and Search Parameters",
  subtitle: "Read dynamic path parameters and query strings to drive filters, pagination, and shared URLs.",
  difficulty: "Moderate",
  scenario: {
    question: "A learner selects 'beginner' courses, and the URL becomes /courses?level=beginner. Where do you read level?",
    answer: "Read it from searchParams in the page, then use it to filter or load the matching courses.",
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
    title: "URL Parameters and Search Parameters",
    bigPicture: "A dynamic route parameter comes from the path (e.g. /courses/42 -> courseId = '42'), while a search parameter comes after '?' in the URL (e.g. /courses?level=beginner -> level = 'beginner'). In modern App Router versions, searchParams is asynchronous.",
    codeSnippet: `// app/courses/page.tsx
export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string; sort?: string }>;
}) {
  const { level, sort } = await searchParams;

  return (
    <div>
      <h1>Courses</h1>
      <p>Selected level: {level ?? "all levels"}</p>
      <p>Sort order: {sort ?? "newest"}</p>
    </div>
  );
}`,
    breakdownTitle: "Key Differences",
    breakdownItems: [
      {
        title: "Path Parameters (params)",
        desc: "Defines the identity of a specific resource in the folder path (e.g. /courses/[courseId]).",
      },
      {
        title: "Search Parameters (searchParams)",
        desc: "Optional modifiers after the '?' character used for filtering, searching, and pagination.",
      },
      {
        title: "Awaited in Modern Next.js",
        desc: "Like params, searchParams is received as a Promise in page props and must be awaited.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Shareable URL Rule",
      content: "Store filters and pagination state in searchParams so users can bookmark and share the exact state of the page.",
    },
    cards: [
      {
        number: "01",
        tag: "SHAREABLE",
        title: "Bookmarkable State",
        description: "Storing query state in the URL means sending the link to a coworker reproduces the exact filtered view.",
        color: "purple",
      },
      {
        number: "02",
        tag: "SERVER DRIVEN",
        title: "Server Filtering",
        description: "The Server Component reads searchParams and filters database queries before sending HTML to the client.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "NAVIGATION",
        title: "Browser History",
        description: "URL changes create entries in the browser history, enabling standard Back and Forward button navigation.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to work with search parameters:",
    points: [
      {
        title: "1. Navigation triggers search params",
        content: "Clicking <Link href=\"/courses?level=beginner\"> or submitting a search input navigates to the query URL.",
      },
      {
        title: "2. The page receives searchParams",
        content: "Next.js injects searchParams into the page props as a Promise resolving to an object of string values.",
      },
      {
        title: "3. Passing to data queries",
        content: "Pass the extracted level filter directly into your database query: const courses = await db.findMany({ level }).",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Reading searchParams in Layouts",
      code: `// app/courses/layout.tsx
// ❌ searchParams is NOT supported in layout props!
export default function CoursesLayout({ children, searchParams }: any) {
  // searchParams will be undefined here
  return <div>{children}</div>;
}`,
      explanation: "Next.js layouts do NOT re-render when search parameters change, so searchParams is only available on page.tsx.",
    },
    good: {
      title: "Reading searchParams in page.tsx",
      code: `// app/courses/page.tsx
export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const { level } = await searchParams; // ✅ Available and awaited
  return <h1>Filtering by: {level || "all"}</h1>;
}`,
      explanation: "Pages re-render when searchParams change, making page.tsx the designated place to read query values.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore how searchParams filters course records:",
    starterCode: `// app/courses/page.tsx
interface PageProps {
  searchParams: Promise<{ filter?: string }>;
}

export default async function CoursesPage({ searchParams }: PageProps) {
  const { filter } = await searchParams;
  const allCourses = ["Next.js App Router", "TypeScript Pro", "React Internals"];

  const filtered = filter
    ? allCourses.filter((c) => c.toLowerCase().includes(filter.toLowerCase()))
    : allCourses;

  return (
    <div>
      <p>Active Query: {filter || "none"}</p>
      <ul>
        {filtered.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the key difference between route params and searchParams?",
      options: [
        "params comes from the folder path (e.g. /courses/42), while searchParams comes after '?' in the query string",
        "searchParams can only contain numbers, while params can only contain emojis",
        "params only works in PHP; searchParams only works in React",
        "There is no difference; they are identical synonyms",
      ],
      correctIndex: 0,
      explanation: "Route parameters (params) come from dynamic folder segments like [id], while search parameters (searchParams) come from the URL query string after '?'.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Path vs Query",
        desc: "params defines resource identity; searchParams defines filters and sorting.",
      },
      {
        title: "Async in App Router",
        desc: "searchParams must be typed as a Promise and awaited in modern Next.js.",
      },
      {
        title: "Page Props Only",
        desc: "searchParams is passed to page.tsx, not layout.tsx.",
      },
    ],
    nextLessonPreview: {
      title: "Loading UI",
      desc: "Learn how loading.tsx provides instant feedback and skeleton loaders while routes wait for data.",
    },
  },
};
