/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NEXT.JS CURRICULUM QUIZZES — LearnCraft
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Authoritative, high-yield module quizzes for all 21 lessons in the
 * Next.js App Router track (NX-01 through NX-21).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { ModuleQuiz } from "./quiz-types";

export const NEXTJS_MODULE_QUIZZES: ModuleQuiz[] = [
  // ── NX-01: What Is Next.js? ──
  {
    id: "quiz-nextjs-nx01",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx01-what-is-nextjs",
    lessonCode: "NX-01",
    lessonTitle: "What Is Next.js?",
    description: "Assess your mental model of Next.js full-stack capabilities, server rendering, and built-in routing.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx01-q1",
        type: "multiple_choice",
        title: "Framework Purpose",
        prompt: "Why would an engineering team choose Next.js instead of building with only React?",
        options: [
          "React is a UI library; Next.js provides built-in routing, server rendering, and server data loading in one framework",
          "React only runs in web browsers, while Next.js only runs in mobile apps",
          "Next.js eliminates JavaScript entirely and writes binary code",
          "React requires buying paid licenses, while Next.js is proprietary to Windows",
        ],
        correctAnswer: 0,
        explanation: "React provides UI component primitives. Next.js wraps React into a complete framework with routing, server-side data loading, and hybrid rendering.",
        hint: "Think about the tools you need for a complete website (routing, SSR, bundling).",
        hintCostXP: 5,
      },
      {
        id: "nx01-q2",
        type: "code_output",
        title: "Server Component Default Execution",
        prompt: "Predict where this console log appears when the home page renders upon a user visit:",
        codeSnippet: `// app/page.tsx
export default function HomePage() {
  console.log("RENDER_HOME");
  return <h1>Welcome to LearnCraft</h1>;
}`,
        language: "tsx",
        options: [
          "Logged ONLY in the Node.js / server terminal; 0 client logs",
          "Logged in BOTH Server terminal and Browser DevTools console",
          "Logged ONLY in the Browser DevTools console",
          "Throws a compile error because console.log is forbidden",
        ],
        correctAnswer: 0,
        explanation: "In Next.js App Router, components are Server Components by default. They execute strictly on the server, so their logs only appear in the server terminal.",
        hint: "Server Components do not ship their code to the client browser bundle.",
        hintCostXP: 5,
      },
      {
        id: "nx01-q3",
        type: "multiple_choice",
        title: "Full Website Architecture",
        prompt: "You need to build a website with a home page, product pages, and product data fetching. What is the advantage of Next.js?",
        options: [
          "It provides file-system routing and server-side data fetching out of the box",
          "It forces all pages to be static HTML files with no dynamic behavior",
          "It disables client-side navigation completely",
          "It automatically purchases web domains for you",
        ],
        correctAnswer: 0,
        explanation: "Next.js handles file-based routing and server-side data fetching in one unified stack, removing the need for separate client routers and custom servers.",
        hint: "Review the Lesson 1 scenario question.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-02: The app Folder and Routes ──
  {
    id: "quiz-nextjs-nx02",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx02-app-folder-and-routes",
    lessonCode: "NX-02",
    lessonTitle: "The app Folder and Routes",
    description: "Evaluate your understanding of file-system routing conventions and the special page.tsx file.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx02-q1",
        type: "multiple_choice",
        title: "Route Creation",
        prompt: "Which file must you create inside app/about to make the /about route accessible in the browser?",
        options: [
          "app/about/page.tsx",
          "app/about/index.html",
          "app/about/route.html",
          "app/about/view.tsx",
        ],
        correctAnswer: 0,
        explanation: "In the Next.js App Router, a route only exists if its folder contains a default-exported page.tsx (or page.js/jsx) file.",
        hint: "Remember the special leaf file name convention.",
        hintCostXP: 5,
      },
      {
        id: "nx02-q2",
        type: "code_output",
        title: "Route Segment URL",
        prompt: "Given this folder structure, what URL will render the ContactPage component?",
        codeSnippet: `// app/support/contact/page.tsx
export default function ContactPage() {
  return <h1>Contact Support</h1>;
}`,
        language: "tsx",
        options: [
          "/support/contact",
          "/app/support/contact/page",
          "/contact",
          "/support",
        ],
        correctAnswer: 0,
        explanation: "Folders inside app directly map to URL segments: app/support/contact/page.tsx maps to /support/contact.",
        hint: "Omit the app folder and the page.tsx file name from the URL.",
        hintCostXP: 5,
      },
      {
        id: "nx02-q3",
        type: "multiple_choice",
        title: "Component Colocation",
        prompt: "If you add a file named app/about/TeamCard.tsx, does Next.js create a public /about/TeamCard route?",
        options: [
          "No, only folders containing page.tsx become public routes; TeamCard.tsx remains a private colocated component",
          "Yes, every file inside app/ creates a public route automatically",
          "Yes, but only in development mode",
          "It causes a fatal build crash",
        ],
        correctAnswer: 0,
        explanation: "Next.js supports safe file colocation. Files not named page.tsx are not routes, allowing you to keep helper components and tests inside route folders.",
        hint: "Think about safe file colocation in the App Router.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-03: Pages and Layouts ──
  {
    id: "quiz-nextjs-nx03",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx03-pages-and-layouts",
    lessonCode: "NX-03",
    lessonTitle: "Pages and Layouts",
    description: "Test your understanding of root layouts, nested layouts, state persistence, and the children prop.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx03-q1",
        type: "multiple_choice",
        title: "Layout Persistence",
        prompt: "What happens to the RootLayout component when a user navigates between sibling routes (e.g. from / to /courses)?",
        options: [
          "The layout preserves its state and DOM without re-rendering; only changing child page slots swap",
          "The layout unmounts completely and the browser reloads the entire page",
          "The layout is re-fetched from scratch and throws an error",
          "All CSS styles are deleted from memory",
        ],
        correctAnswer: 0,
        explanation: "Next.js layouts are state-preserving. When navigating between sibling routes, the layout remains mounted and preserves its React state while only the child page slot updates.",
        hint: "Think about why sidebar or audio player state doesn't reset when browsing subpages.",
        hintCostXP: 5,
      },
      {
        id: "nx03-q2",
        type: "code_output",
        title: "Layout Children Prop",
        prompt: "What is passed into the children prop of app/layout.tsx?",
        codeSnippet: `// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}`,
        language: "tsx",
        options: [
          "The active page or nested layout component corresponding to the current route",
          "The raw HTML string of the entire internet",
          "An array of all CSS filenames",
          "A database connection string",
        ],
        correctAnswer: 0,
        explanation: "Next.js automatically passes the rendered page (or child nested layout) into the layout's children prop.",
        hint: "Think of the layout as a parent frame surrounding the page.",
        hintCostXP: 5,
      },
      {
        id: "nx03-q3",
        type: "multiple_choice",
        title: "Shared UI Architecture",
        prompt: "Your home, courses, and profile pages all require the exact same navigation bar. What is the recommended architectural approach?",
        options: [
          "Place the navigation bar in a shared layout (such as app/layout.tsx) rather than duplicating it on each page",
          "Copy and paste the navbar component JSX into all three page files",
          "Store the navbar HTML in a browser cookie",
          "Never use navigation bars in web applications",
        ],
        correctAnswer: 0,
        explanation: "Placing shared navigation in a layout mounts it once, avoids code duplication, and prevents unnecessary re-rendering across page transitions.",
        hint: "Review the Lesson 3 scenario question.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-04: Moving Between Pages with Link ──
  {
    id: "quiz-nextjs-nx04",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx04-moving-between-pages-with-link",
    lessonCode: "NX-04",
    lessonTitle: "Moving Between Pages with Link",
    description: "Assess your knowledge of Next.js <Link>, client-side transitions, and viewport prefetching.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx04-q1",
        type: "multiple_choice",
        title: "Link Component Benefits",
        prompt: "Why should you use <Link> from 'next/link' instead of a plain <a> tag for internal routes?",
        options: [
          "Link provides fast client-side navigation without full page reloads and automatically prefetches routes in the viewport",
          "Link is the only way to style text in CSS",
          "Plain <a> tags cause immediate server crashes in Next.js",
          "Link prevents users from seeing the URL in the address bar",
        ],
        correctAnswer: 0,
        explanation: "Next.js <Link> performs smooth client-side transitions and automatically prefetches destination route code in the background when the link enters the viewport.",
        hint: "Think about user experience: instant transition vs blank white reload flash.",
        hintCostXP: 5,
      },
      {
        id: "nx04-q2",
        type: "code_output",
        title: "External Links",
        prompt: "Which element should you use to link to an external website such as https://github.com?",
        codeSnippet: `// Which element is appropriate for external URLs?
// Option A: <Link href="https://github.com">GitHub</Link>
// Option B: <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>`,
        language: "tsx",
        options: [
          "Option B: Standard HTML <a> tag, because client-side prefetching is not needed for external domains",
          "Option A: Always use Link for every URL on the internet",
          "Neither, external links are forbidden in modern web apps",
          "A custom WebSockets connection",
        ],
        correctAnswer: 0,
        explanation: "Standard HTML <a> tags are best for external domains. Next.js <Link> is optimized for internal routes within your App Router.",
        hint: "Next.js cannot prefetch or client-route third-party websites.",
        hintCostXP: 5,
      },
      {
        id: "nx04-q3",
        type: "multiple_choice",
        title: "Prefetching Behavior",
        prompt: "When does Next.js prefetch linked routes in production?",
        options: [
          "Automatically in the background as <Link> elements enter the user's viewport",
          "Only when the user reboots their device",
          "Never; prefetching must be manually coded in C++",
          "Only when the browser window is minimized",
        ],
        correctAnswer: 0,
        explanation: "Next.js automatically prefetches the route payload for any <Link> that appears within the browser viewport in production builds.",
        hint: "It prepares pages before the user even clicks.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-05: Dynamic Routes ──
  {
    id: "quiz-nextjs-nx05",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx05-dynamic-routes",
    lessonCode: "NX-05",
    lessonTitle: "Dynamic Routes",
    description: "Evaluate your understanding of dynamic folder bracket segments and asynchronous params.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx05-q1",
        type: "multiple_choice",
        title: "Dynamic Segment Syntax",
        prompt: "Which folder name allows /courses/12 and /courses/99 to be handled by the same page component?",
        options: [
          "app/courses/[courseId]/page.tsx",
          "app/courses/(courseId)/page.tsx",
          "app/courses/{courseId}/page.tsx",
          "app/courses/*courseId/page.tsx",
        ],
        correctAnswer: 0,
        explanation: "Square brackets [paramName] define a dynamic route segment in the App Router.",
        hint: "Parentheses ( ) are for route groups; square brackets [ ] are for dynamic parameters.",
        hintCostXP: 5,
      },
      {
        id: "nx05-q2",
        type: "code_output",
        title: "Awaiting params",
        prompt: "In modern Next.js App Router, how do you correctly access courseId from page props?",
        codeSnippet: `// app/courses/[courseId]/page.tsx
export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  return <h1>Course: {courseId}</h1>;
}`,
        language: "tsx",
        options: [
          "params is a Promise that must be awaited inside an async component",
          "params is a synchronous object accessed directly as params.courseId",
          "params must be read from window.localStorage",
          "params can only be accessed using document.getElementById",
        ],
        correctAnswer: 0,
        explanation: "In modern Next.js, page params is typed as a Promise<{ [key: string]: string }> and awaited inside an async component function.",
        hint: "Notice the Promise type and the await keyword.",
        hintCostXP: 5,
      },
      {
        id: "nx05-q3",
        type: "multiple_choice",
        title: "Dynamic Route Value",
        prompt: "When a user navigates to /courses/42, what value does courseId hold when extracted from params?",
        options: [
          "'42' (as a string)",
          "42 (as a number)",
          "true (as a boolean)",
          "undefined",
        ],
        correctAnswer: 0,
        explanation: "URL route segments are always extracted as strings.",
        hint: "All URL path tokens arrive as string data.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-06: Server Components and Client Components ──
  {
    id: "quiz-nextjs-nx06",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx06-server-and-client-components",
    lessonCode: "NX-06",
    lessonTitle: "Server Components and Client Components",
    description: "Test your mental model of the Server Component default, 'use client' boundaries, and security rules.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx06-q1",
        type: "multiple_choice",
        title: "Component Default",
        prompt: "In the Next.js App Router, what kind of component are files by default if they lack a directive?",
        options: [
          "Server Components (RSC)",
          "Client Components",
          "Shared Web Workers",
          "Static HTML templates with no React",
        ],
        correctAnswer: 0,
        explanation: "All components inside the App Router are React Server Components by default. You opt into client rendering by adding 'use client' at the top of the file.",
        hint: "The App Router is server-first by default.",
        hintCostXP: 5,
      },
      {
        id: "nx06-q2",
        type: "multiple_choice",
        title: "Choosing Boundaries",
        prompt: "A courses page loads course names from an API, and each course has a button to save it as a favorite. How should you structure this?",
        options: [
          "Keep the page as a Server Component to load and show courses, and make only the favorite button a Client Component",
          "Make the entire page a Client Component with 'use client'",
          "Make the button a Server Component and the page a Client Component",
          "Avoid using buttons in React apps",
        ],
        correctAnswer: 0,
        explanation: "Keep the page as a Server Component for fast data preparation and 0 KB client bundle size. Make only the interactive leaf (the favorite button) a Client Component.",
        hint: "Review the Lesson 6 scenario question.",
        hintCostXP: 5,
      },
      {
        id: "nx06-q3",
        type: "multiple_choice",
        title: "Secret Protection",
        prompt: "Where is it safe to place database connection strings and private secret API keys?",
        options: [
          "Only in Server Components, Server Actions, or server-side files; never in Client Components",
          "In any Client Component file",
          "In public HTML comments",
          "Directly inside client button onClick handlers",
        ],
        correctAnswer: 0,
        explanation: "Client Component code is bundled and delivered to the browser where anyone can inspect it. Private secrets must remain strictly on the server.",
        hint: "Never expose private keys to the client browser.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-07: Client-Side Interaction with State and Events ──
  {
    id: "quiz-nextjs-nx07",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx07-client-side-interaction",
    lessonCode: "NX-07",
    lessonTitle: "Client-Side Interaction with State and Events",
    description: "Evaluate your understanding of React useState, event handlers, and the 'use client' requirement.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx07-q1",
        type: "multiple_choice",
        title: "Interactive Requirements",
        prompt: "You need a 'Show answer' button that reveals text when clicked. What kind of component is required?",
        options: [
          "A Client Component with 'use client', because it requires an onClick event handler and useState",
          "A Server Component, because state is only allowed on the server",
          "An HTML email template",
          "A database stored procedure",
        ],
        correctAnswer: 0,
        explanation: "Click listeners and dynamic state hooks require the browser JavaScript runtime, which requires a Client Component.",
        hint: "Review the Lesson 7 scenario question.",
        hintCostXP: 5,
      },
      {
        id: "nx07-q2",
        type: "code_output",
        title: "Directive Placement",
        prompt: "Where must the 'use client' directive be placed in an interactive component file?",
        codeSnippet: `// File header:
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`,
        language: "tsx",
        options: [
          "At the very top of the file, before any import statements",
          "Inside the component function body",
          "Inside the return JSX statement",
          "In a separate CSS file",
        ],
        correctAnswer: 0,
        explanation: "'use client' must sit at the top of the file, above all imports, to tell the bundler that this file marks the boundary of a Client Component.",
        hint: "It acts as a file-level compiler directive.",
        hintCostXP: 5,
      },
      {
        id: "nx07-q3",
        type: "multiple_choice",
        title: "Event Handler Execution",
        prompt: "What error occurs if you attach an onClick handler in a component that does NOT have 'use client'?",
        options: [
          "Next.js reports an error stating that event handlers cannot be passed to or executed in Server Components",
          "The click handler silently converts into a database trigger",
          "The browser automatically restarts",
          "The code compiles without any warning",
        ],
        correctAnswer: 0,
        explanation: "Functions like onClick cannot be serialized across the network to the browser. Event handlers require the component to be a Client Component.",
        hint: "Server Components cannot serialize JavaScript function references.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-08: Fetching Data in a Server Component ──
  {
    id: "quiz-nextjs-nx08",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx08-fetching-data-server-component",
    lessonCode: "NX-08",
    lessonTitle: "Fetching Data in a Server Component",
    description: "Assess your ability to fetch data directly inside async Server Components and handle HTTP responses.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx08-q1",
        type: "multiple_choice",
        title: "Server Data Fetching",
        prompt: "Where is the best place to load a list of courses from your API when the list does not need browser interaction just to appear?",
        options: [
          "Directly in the async Server Component for the page",
          "In a client-side useEffect hook with multiple loading states",
          "In a CSS file using media queries",
          "Inside the user's localStorage before loading the page",
        ],
        correctAnswer: 0,
        explanation: "Loading data in the Server Component prepares the HTML on the server, eliminates client-side waterfalls, and keeps API keys secure.",
        hint: "Review the Lesson 8 scenario question.",
        hintCostXP: 5,
      },
      {
        id: "nx08-q2",
        type: "code_output",
        title: "Direct async/await",
        prompt: "What is notable about how Server Components handle promises compared to standard React components?",
        codeSnippet: `// app/courses/page.tsx
export default async function CoursesPage() {
  const res = await fetch("https://api.example.com/courses");
  const courses = await res.json();
  return <ul>{courses.map((c: any) => <li key={c.id}>{c.title}</li>)}</ul>;
}`,
        language: "tsx",
        options: [
          "The component function can be declared as 'async' and directly await fetch requests",
          "It must use a Redux saga to resolve promises",
          "It requires 5 nested callbacks",
          "It cannot use TypeScript types",
        ],
        correctAnswer: 0,
        explanation: "Server Components can be asynchronous functions and await promises directly without requiring useState or useEffect hooks.",
        hint: "Look at the 'async function' declaration.",
        hintCostXP: 5,
      },
      {
        id: "nx08-q3",
        type: "multiple_choice",
        title: "HTTP Status Checking",
        prompt: "Why should you check 'if (!response.ok)' when calling fetch on the server?",
        options: [
          "Because fetch does not reject on HTTP 404 or 500 status codes; checking response.ok catches API failures early",
          "Because response.ok is mandatory for TypeScript compilation",
          "Because response.ok deletes bad records from the database",
          "Because APIs require response.ok headers to be sent back",
        ],
        correctAnswer: 0,
        explanation: "fetch only rejects on network failures. If the API returns a 404 or 500 error, response.ok is false, allowing you to throw an error or handle the failure gracefully.",
        hint: "Remember standard web fetch behavior.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-09: URL Parameters and Search Parameters ──
  {
    id: "quiz-nextjs-nx09",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx09-url-and-search-parameters",
    lessonCode: "NX-09",
    lessonTitle: "URL Parameters and Search Parameters",
    description: "Evaluate your knowledge of query strings, searchParams props, and shareable URL state.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx09-q1",
        type: "multiple_choice",
        title: "Reading Query Strings",
        prompt: "A learner filters by 'beginner', making the URL /courses?level=beginner. Where do you read 'level' in the page component?",
        options: [
          "From the searchParams prop in the page component",
          "From window.document.cookie",
          "From a global Redux reducer",
          "From process.env.LEVEL",
        ],
        correctAnswer: 0,
        explanation: "Next.js passes URL query strings into the searchParams prop of page components.",
        hint: "Review the Lesson 9 scenario question.",
        hintCostXP: 5,
      },
      {
        id: "nx09-q2",
        type: "code_output",
        title: "Awaiting searchParams",
        prompt: "In modern Next.js App Router, how is searchParams handled inside a page component?",
        codeSnippet: `// app/courses/page.tsx
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const { level } = await searchParams;
  return <p>Level: {level ?? "all"}</p>;
}`,
        language: "tsx",
        options: [
          "searchParams is a Promise and must be awaited inside the async page function",
          "searchParams is a synchronous object that cannot be awaited",
          "searchParams is only accessible in Client Components",
          "searchParams requires a third-party query parser package",
        ],
        correctAnswer: 0,
        explanation: "Modern Next.js delivers searchParams as a Promise in page props, requiring async component functions and await searchParams.",
        hint: "Notice the Promise type and await statement.",
        hintCostXP: 5,
      },
      {
        id: "nx09-q3",
        type: "multiple_choice",
        title: "Page vs Layout searchParams",
        prompt: "Can layout.tsx access the searchParams prop in Next.js?",
        options: [
          "No, layouts do not re-render on query string changes; searchParams is only supported in page.tsx",
          "Yes, layout.tsx has access to searchParams but page.tsx does not",
          "Yes, but only if the user is an admin",
          "Only on Sundays",
        ],
        correctAnswer: 0,
        explanation: "Layouts preserve their state and do not re-render when query strings change. Consequently, searchParams is intentionally only passed to page.tsx.",
        hint: "Think about layout state preservation.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-10: Loading UI ──
  {
    id: "quiz-nextjs-nx10",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx10-loading-ui",
    lessonCode: "NX-10",
    lessonTitle: "Loading UI",
    description: "Test your understanding of loading.tsx, streaming SSR, and React Suspense boundaries.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx10-q1",
        type: "multiple_choice",
        title: "loading.tsx Convention",
        prompt: "Your course page takes 2 seconds to load data. What file can you create in the route folder to show a loading skeleton instantly?",
        options: [
          "loading.tsx",
          "spinner.html",
          "wait.tsx",
          "pending.js",
        ],
        correctAnswer: 0,
        explanation: "Creating loading.tsx in a route segment automatically wraps page.tsx in a React Suspense boundary using the loading component as the fallback.",
        hint: "Review the Lesson 10 scenario question.",
        hintCostXP: 5,
      },
      {
        id: "nx10-q2",
        type: "multiple_choice",
        title: "Streaming Mechanism",
        prompt: "How does Next.js stream loading UI to the browser?",
        options: [
          "It sends the layout and loading.tsx fallback immediately while preparing the page data on the server in the background",
          "It forces the user to wait until all data is loaded before sending any HTML",
          "It downloads a heavy GIF animation from an external server",
          "It pauses the Node.js server thread completely",
        ],
        correctAnswer: 0,
        explanation: "Next.js leverages React 19 Streaming SSR to send the shared layout and loading UI immediately, then streams the finished page HTML as soon as the server data resolves.",
        hint: "Think about progressive streaming.",
        hintCostXP: 5,
      },
      {
        id: "nx10-q3",
        type: "multiple_choice",
        title: "Perceived Performance",
        prompt: "Why is a loading UI important for web applications?",
        options: [
          "It provides immediate visual feedback, reassuring users that navigation succeeded and preventing repeated clicks",
          "It slows down fast computers so slow computers can catch up",
          "It is required by the W3C HTML specification",
          "It reduces database disk storage",
        ],
        correctAnswer: 0,
        explanation: "Immediate loading states provide responsive feedback, improve perceived performance, and eliminate uncertainty during async transitions.",
        hint: "Think about user psychology during page transitions.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-11: Handling Missing Pages and Errors ──
  {
    id: "quiz-nextjs-nx11",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx11-missing-pages-and-errors",
    lessonCode: "NX-11",
    lessonTitle: "Handling Missing Pages and Errors",
    description: "Evaluate your knowledge of notFound(), not-found.tsx, and resilient error.tsx boundaries.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx11-q1",
        type: "multiple_choice",
        title: "Handling Missing Records",
        prompt: "A user navigates to /courses/999, but course 999 does not exist in the database. What should you do?",
        options: [
          "Call notFound() from 'next/navigation' to show the not-found.tsx page",
          "Throw a 500 internal server error",
          "Crash the server process with process.exit(1)",
          "Show a blank page with no message",
        ],
        correctAnswer: 0,
        explanation: "When a requested item is missing, call notFound(). Next.js stops rendering the route and displays your custom not-found.tsx UI with a proper 404 HTTP status.",
        hint: "Review the Lesson 11 scenario question.",
        hintCostXP: 5,
      },
      {
        id: "nx11-q2",
        type: "code_output",
        title: "error.tsx Client Requirement",
        prompt: "Why MUST error.tsx have the 'use client' directive at the top of the file?",
        codeSnippet: `// app/courses/error.tsx
"use client"; // Required!

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}`,
        language: "tsx",
        options: [
          "Error boundaries must catch errors during client hydration and require interactive recovery buttons like reset()",
          "Because Next.js does not allow TypeScript in Server Components",
          "Because errors can only happen in web browsers",
          "It is a bug in Next.js that will be removed",
        ],
        correctAnswer: 0,
        explanation: "React Error Boundaries must be Client Components to catch client-side errors and attach user retry handlers like reset().",
        hint: "Error boundaries require client event handlers like onClick on the reset button.",
        hintCostXP: 5,
      },
      {
        id: "nx11-q3",
        type: "multiple_choice",
        title: "Error Isolation",
        prompt: "If a component inside app/courses/page.tsx throws an unexpected error, what happens to the root navbar in app/layout.tsx?",
        options: [
          "The root layout stays intact and usable; only the courses segment renders the fallback error UI",
          "The entire website collapses and shows a white screen",
          "The user's computer reboots",
          "The database deletes all courses",
        ],
        correctAnswer: 0,
        explanation: "Next.js isolates errors to the nearest error boundary segment. The parent layout and navigation remain fully functional.",
        hint: "Segment-level error boundaries isolate crashes.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-12: Forms and Server Actions ──
  {
    id: "quiz-nextjs-nx12",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx12-forms-and-server-actions",
    lessonCode: "NX-12",
    lessonTitle: "Forms and Server Actions",
    description: "Assess your knowledge of 'use server' mutations, form actions, input validation, and authorization.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx12-q1",
        type: "multiple_choice",
        title: "Server Action Purpose",
        prompt: "What is a Server Action primarily used for, and what security check must it always include?",
        options: [
          "It handles server-side mutations like form submissions; it must validate input and verify user permissions on the server",
          "It animates CSS buttons on mouse hover without security checks",
          "It renders client canvas graphics in 3D",
          "It replaces PostgreSQL with local text files",
        ],
        correctAnswer: 0,
        explanation: "Server Actions execute on the server to mutate data. Because they can be invoked via HTTP POST, they must validate inputs and verify user permissions.",
        hint: "Review the Lesson 12 interview question.",
        hintCostXP: 5,
      },
      {
        id: "nx12-q2",
        type: "code_output",
        title: "Form Action Binding",
        prompt: "How does this form trigger the Server Action?",
        codeSnippet: `// app/actions.ts
"use server";
export async function saveCourse(formData: FormData) {
  const title = formData.get("title");
  // server mutation...
}

// app/page.tsx
import { saveCourse } from "./actions";
export default function Form() {
  return (
    <form action={saveCourse}>
      <input name="title" />
      <button type="submit">Submit</button>
    </form>
  );
}`,
        language: "tsx",
        options: [
          "Passing the async Server Action directly into the form's action attribute",
          "Using window.addEventListener in useEffect",
          "Writing a manual XMLHttpRequest in jQuery",
          "Using a WebSocket connection",
        ],
        correctAnswer: 0,
        explanation: "React and Next.js support passing Server Actions directly to the <form action={...}> prop for progressive enhancement.",
        hint: "Look at the <form action={saveCourse}> attribute.",
        hintCostXP: 5,
      },
      {
        id: "nx12-q3",
        type: "multiple_choice",
        title: "Authorization Enforcement",
        prompt: "A logged-in user submits a form to rename a course. Why must the action check course ownership?",
        options: [
          "Because being logged in does not automatically grant permission to edit every course in the database",
          "Because Next.js deletes unverified users",
          "Because SQL databases forbid update statements",
          "Because forms can only be submitted once per year",
        ],
        correctAnswer: 0,
        explanation: "Authentication proves identity, but authorization verifies permission. Any logged-in user could attempt to send an ID belonging to another user.",
        hint: "Think about user ownership vs general login status.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-13: Route Handlers ──
  {
    id: "quiz-nextjs-nx13",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx13-route-handlers",
    lessonCode: "NX-13",
    lessonTitle: "Route Handlers",
    description: "Test your understanding of route.ts files, HTTP methods (GET, POST), and webhooks.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx13-q1",
        type: "multiple_choice",
        title: "Route Handler vs Server Action",
        prompt: "What is the key difference between a Server Action and a Route Handler?",
        options: [
          "A Server Action is typically called from the app UI; a Route Handler defines a standard HTTP REST endpoint for external consumers",
          "Route Handlers can only return HTML pages",
          "Server Actions can only run on mobile phones",
          "Route Handlers cannot access databases",
        ],
        correctAnswer: 0,
        explanation: "Server Actions are integrated with UI forms and mutations. Route Handlers (route.ts) define HTTP endpoints for external webhooks, mobile apps, or public APIs.",
        hint: "Review the Lesson 13 interview question.",
        hintCostXP: 5,
      },
      {
        id: "nx13-q2",
        type: "code_output",
        title: "Named HTTP Method Export",
        prompt: "What HTTP method does this Route Handler respond to?",
        codeSnippet: `// app/api/health/route.ts
export function GET() {
  return Response.json({ status: "ok" });
}`,
        language: "tsx",
        options: [
          "HTTP GET requests to /api/health",
          "HTTP POST requests only",
          "Any arbitrary WebSocket connection",
          "It does not respond to any requests",
        ],
        correctAnswer: 0,
        explanation: "Exporting a function named GET handles HTTP GET requests to that route URL.",
        hint: "The function name directly matches the HTTP verb.",
        hintCostXP: 5,
      },
      {
        id: "nx13-q3",
        type: "multiple_choice",
        title: "Folder Conflict Rule",
        prompt: "Can a directory inside app/ contain both page.tsx and route.ts at the exact same level?",
        options: [
          "No, Next.js throws a route conflict build error because one URL cannot be both an HTML page and a raw route handler",
          "Yes, Next.js alternates between them randomly",
          "Yes, route.ts always deletes page.tsx",
          "Only in production mode",
        ],
        correctAnswer: 0,
        explanation: "page.tsx and route.ts conflict if placed in the same folder. API routes should be organized in separate folders (e.g. app/api/...).",
        hint: "Remember the file colocation conflict rule.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-14: Revalidating Data After a Change ──
  {
    id: "quiz-nextjs-nx14",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx14-revalidating-data",
    lessonCode: "NX-14",
    lessonTitle: "Revalidating Data After a Change",
    description: "Evaluate your understanding of on-demand cache invalidation using revalidatePath and revalidateTag.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx14-q1",
        type: "multiple_choice",
        title: "Cache Invalidation Purpose",
        prompt: "An admin edits a course title, but the course catalog still shows the old title due to caching. What should you call after updating the database?",
        options: [
          "revalidatePath('/courses') or revalidateTag() to purge the stale cache",
          "window.location.reload() inside the server action",
          "process.exit(0)",
          "rebootServer()",
        ],
        correctAnswer: 0,
        explanation: "Calling revalidatePath('/courses') purges the cached route on-demand, ensuring the next visit fetches and displays fresh data.",
        hint: "Review the Lesson 14 scenario question.",
        hintCostXP: 5,
      },
      {
        id: "nx14-q2",
        type: "code_output",
        title: "revalidatePath Execution",
        prompt: "Where can revalidatePath be called in Next.js?",
        codeSnippet: `// app/actions.ts
"use server";
import { revalidatePath } from "next/cache";

export async function updateAction() {
  // DB mutation...
  revalidatePath("/courses");
}`,
        language: "tsx",
        options: [
          "Inside Server Actions, Route Handlers, or server-side functions",
          "Inside browser client onClick handlers directly",
          "In a CSS module file",
          "Inside public/robots.txt",
        ],
        correctAnswer: 0,
        explanation: "revalidatePath is a server-only API from 'next/cache' and must execute inside Server Actions or Route Handlers.",
        hint: "Notice the 'use server' directive at the top.",
        hintCostXP: 5,
      },
      {
        id: "nx14-q3",
        type: "multiple_choice",
        title: "revalidatePath vs revalidateTag",
        prompt: "When is revalidateTag preferable over revalidatePath?",
        options: [
          "When the same entity (like user profile data) is displayed across multiple unrelated routes that share a cache tag",
          "When you want to delete a file from git",
          "When you want to clear browser cookies",
          "revalidateTag is deprecated",
        ],
        correctAnswer: 0,
        explanation: "revalidateTag purges specific tagged fetch requests wherever they appear across the application, without needing to know every individual route URL.",
        hint: "Tags target data across multiple pages.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-15: Page Titles and Metadata ──
  {
    id: "quiz-nextjs-nx15",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx15-page-titles-and-metadata",
    lessonCode: "NX-15",
    lessonTitle: "Page Titles and Metadata",
    description: "Assess your ability to define static metadata objects and dynamic generateMetadata functions.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx15-q1",
        type: "multiple_choice",
        title: "Custom Page Titles",
        prompt: "How can you set a custom browser tab title and description for a specific page in the App Router?",
        options: [
          "Export a 'metadata' object or 'generateMetadata' function from the Server Component page.tsx",
          "Write <title> directly in client useState",
          "Edit the computer's hosts file",
          "Call document.title in the root CSS file",
        ],
        correctAnswer: 0,
        explanation: "In Next.js App Router, Server Component pages export a metadata object or an async generateMetadata function to configure head tags.",
        hint: "Review the Lesson 15 scenario question.",
        hintCostXP: 5,
      },
      {
        id: "nx15-q2",
        type: "code_output",
        title: "Static Metadata Export",
        prompt: "What will Next.js inject into the HTML <head> from this export?",
        codeSnippet: `// app/courses/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LearnCraft Courses",
  description: "Learn modern full-stack web development.",
};`,
        language: "tsx",
        options: [
          "<title>LearnCraft Courses</title> and <meta name=\"description\" content=\"...\"> tags",
          "A JavaScript alert box on load",
          "A pop-up cookie banner",
          "An invisible iframe",
        ],
        correctAnswer: 0,
        explanation: "Next.js automatically renders the title and description properties into standard HTML head elements for browsers and search crawlers.",
        hint: "It configures browser tab titles and SEO snippets.",
        hintCostXP: 5,
      },
      {
        id: "nx15-q3",
        type: "multiple_choice",
        title: "Client Component Restriction",
        prompt: "What happens if you attempt to export 'const metadata' from a file that has 'use client' at the top?",
        options: [
          "Next.js throws a compile/build error because metadata can only be exported from Server Components",
          "The title displays in pink text",
          "The metadata is saved to localStorage",
          "It works without any issue",
        ],
        correctAnswer: 0,
        explanation: "Metadata exports must be evaluated on the server before HTML is streamed. They are not supported in Client Components.",
        hint: "Metadata is strictly a Server Component feature.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-16: Images and Static Files ──
  {
    id: "quiz-nextjs-nx16",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx16-images-and-static-files",
    lessonCode: "NX-16",
    lessonTitle: "Images and Static Files",
    description: "Evaluate your knowledge of the public directory, static paths, and the next/image optimization component.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx16-q1",
        type: "multiple_choice",
        title: "Public Folder Path",
        prompt: "You saved an image as public/logo.png. What path should you use in your application to display it?",
        options: [
          "/logo.png",
          "/public/logo.png",
          "../public/logo.png",
          "/static/public/logo.png",
        ],
        correctAnswer: 0,
        explanation: "Next.js maps the public folder directly to the base root URL (/), so public/logo.png is served at /logo.png.",
        hint: "Review the Lesson 16 scenario question.",
        hintCostXP: 5,
      },
      {
        id: "nx16-q2",
        type: "code_output",
        title: "next/image Dimension Enforcement",
        prompt: "Why does the Next.js <Image> component require width and height props (or fill={true})?",
        codeSnippet: `import Image from "next/image";

export default function Avatar() {
  return <Image src="/avatar.png" alt="Avatar" width={64} height={64} />;
}`,
        language: "tsx",
        options: [
          "To reserve correct aspect ratio space in the layout before downloading, preventing Cumulative Layout Shift (CLS)",
          "To stretch the image across the entire monitor",
          "Because HTML forbids displaying images without width",
          "To convert the PNG into a video",
        ],
        correctAnswer: 0,
        explanation: "Explicit dimensions allow the browser to calculate the exact layout box before the image file finishes downloading, completely preventing layout shift.",
        hint: "Think about Cumulative Layout Shift (CLS).",
        hintCostXP: 5,
      },
      {
        id: "nx16-q3",
        type: "multiple_choice",
        title: "Image Optimization Features",
        prompt: "What performance benefits does the Next.js <Image> component provide automatically?",
        options: [
          "Modern format compression (WebP/AVIF), viewport lazy loading, and automatic device-size resizing",
          "It watermarks images with copyright tags",
          "It converts all images into black and white",
          "It uploads photos to social media automatically",
        ],
        correctAnswer: 0,
        explanation: "next/image automatically resizes images, compresses them into modern formats like WebP or AVIF, and lazy loads images as they approach the viewport.",
        hint: "Modern format conversion and lazy loading.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-17: Environment Variables and Secrets ──
  {
    id: "quiz-nextjs-nx17",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx17-environment-variables-and-secrets",
    lessonCode: "NX-17",
    lessonTitle: "Environment Variables and Secrets",
    description: "Assess your understanding of server secrets, .env.local, and the NEXT_PUBLIC_ exposure boundary.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx17-q1",
        type: "multiple_choice",
        title: "Private Key Safety",
        prompt: "Your app needs a private payment-provider secret key. Should you name it NEXT_PUBLIC_PAYMENT_KEY?",
        options: [
          "No; keep the key in a server-only variable without the NEXT_PUBLIC_ prefix so it is never sent to the browser",
          "Yes; NEXT_PUBLIC_ encrypts the key with a password",
          "Yes; all environment variables must have NEXT_PUBLIC_",
          "It doesn't matter; client and server have no security differences",
        ],
        correctAnswer: 0,
        explanation: "NEXT_PUBLIC_ inlines variables into browser JavaScript where anyone can view them. Private keys must never use this prefix.",
        hint: "Review the Lesson 17 scenario question.",
        hintCostXP: 5,
      },
      {
        id: "nx17-q2",
        type: "code_output",
        title: "Browser Client Environment Access",
        prompt: "What will be printed in the browser console when this Client Component runs?",
        codeSnippet: `// .env.local
DATABASE_URL="postgresql://user:pass@localhost:5432/db"

// app/client.tsx
"use client";
export default function ClientView() {
  console.log("DB URL:", process.env.DATABASE_URL);
  return <div>Client</div>;
}`,
        language: "tsx",
        options: [
          "'DB URL: undefined' (server-only variables are stripped from client bundles)",
          "'DB URL: postgresql://user:pass@localhost:5432/db'",
          "Throws a fatal JavaScript compilation error",
          "'DB URL: [object Object]'",
        ],
        correctAnswer: 0,
        explanation: "Next.js strips server-only environment variables from client builds. Accessing them inside Client Components evaluates to undefined.",
        hint: "Variables without NEXT_PUBLIC_ are invisible to the browser.",
        hintCostXP: 5,
      },
      {
        id: "nx17-q3",
        type: "multiple_choice",
        title: ".gitignore Protection",
        prompt: "Why must .env.local always be included in your .gitignore file?",
        options: [
          "To prevent developers from accidentally pushing live production credentials and API keys to public git repositories",
          "Because git cannot commit files that start with a dot",
          "Because Next.js deletes .env files on git push",
          "To make git clone commands faster",
        ],
        correctAnswer: 0,
        explanation: ".env.local contains sensitive development secrets and credentials that should never be stored in version control history.",
        hint: "Never commit private secrets to GitHub.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-18: Authentication and Authorization ──
  {
    id: "quiz-nextjs-nx18",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx18-authentication-and-authorization",
    lessonCode: "NX-18",
    lessonTitle: "Authentication and Authorization",
    description: "Evaluate your mental model of Authentication (AuthN) vs Authorization (AuthZ) and server enforcement.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx18-q1",
        type: "multiple_choice",
        title: "AuthN vs AuthZ",
        prompt: "What is the primary difference between Authentication and Authorization?",
        options: [
          "Authentication verifies WHO the user is; Authorization verifies WHAT that user is allowed to do",
          "Authentication is for mobile apps; Authorization is for desktop websites",
          "Authentication uses passwords; Authorization only uses facial recognition",
          "They are identical synonyms for logging in",
        ],
        correctAnswer: 0,
        explanation: "Authentication proves user identity (e.g. valid login session). Authorization verifies whether that identified user has permission for a specific action.",
        hint: "Review the Lesson 18 interview question.",
        hintCostXP: 5,
      },
      {
        id: "nx18-q2",
        type: "multiple_choice",
        title: "URL Navigation vs UI Links",
        prompt: "A normal user changes the browser URL to /admin. You already hid the admin navigation link from them. Is that sufficient security?",
        options: [
          "No; hiding a link only changes what the user sees. The server must still verify admin permissions before returning protected data",
          "Yes; hiding the link guarantees the user can never open the URL",
          "Yes; Next.js blocks users from editing browser address bars",
          "Only if the user is using Google Chrome",
        ],
        correctAnswer: 0,
        explanation: "Hiding a link is cosmetic. Users can manually type URLs or forge network requests. The server must enforce permission checks on every route and action.",
        hint: "Review the Lesson 18 scenario question.",
        hintCostXP: 5,
      },
      {
        id: "nx18-q3",
        type: "code_output",
        title: "Server Action Permission Check",
        prompt: "Why must this Server Action perform an ownership check?",
        codeSnippet: `"use server";
export async function deleteCourse(courseId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const allowed = await userCanDeleteCourse(user.id, courseId);
  if (!allowed) throw new Error("Forbidden");

  await removeCourse(courseId);
}`,
        language: "tsx",
        options: [
          "To verify that the logged-in user actually owns or has permission to delete this specific course",
          "To check if the user has an internet connection",
          "To test if the database is running",
          "To slow down the delete operation",
        ],
        correctAnswer: 0,
        explanation: "Being authenticated does not mean a user is authorized to delete other people's courses. Entity-level authorization checks are mandatory.",
        hint: "Being logged in doesn't give you rights to another user's data.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-19: Validating User Input ──
  {
    id: "quiz-nextjs-nx19",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx19-validating-user-input",
    lessonCode: "NX-19",
    lessonTitle: "Validating User Input",
    description: "Assess your understanding of server-side data validation, input sanitization, and defensive programming.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx19-q1",
        type: "multiple_choice",
        title: "Untrusted Client Input",
        prompt: "A form requires a course title, but someone sends an HTTP POST request directly with curl without using your form. Can you trust the value?",
        options: [
          "No; all input must be validated on the server because network requests can easily bypass browser-side checks",
          "Yes; HTML form attributes are enforced by international internet routers",
          "Yes; Next.js rejects any request not sent from a mouse click",
          "Only if the request has an SSL certificate",
        ],
        correctAnswer: 0,
        explanation: "Browser-side validation is easily bypassed with curl, Postman, or DevTools. The server must independently validate every incoming field.",
        hint: "Review the Lesson 19 scenario question.",
        hintCostXP: 5,
      },
      {
        id: "nx19-q2",
        type: "code_output",
        title: "Server Validation Logic",
        prompt: "What does this server validation function protect against?",
        codeSnippet: `function validateCourseTitle(value: unknown) {
  if (typeof value !== "string" || value.trim().length < 3) {
    return { valid: false, message: "Title must have at least 3 characters." };
  }
  return { valid: true, title: value.trim() };
}`,
        language: "tsx",
        options: [
          "Non-string types, empty inputs, whitespace-only strings, and titles shorter than 3 characters",
          "Computer viruses and malware",
          "Slow WiFi network connections",
          "Browser tab crashes",
        ],
        correctAnswer: 0,
        explanation: "The validator verifies type safety (string), trims accidental leading/trailing whitespace, and enforces minimum character length rules.",
        hint: "Notice typeof value, trim(), and length checks.",
        hintCostXP: 5,
      },
      {
        id: "nx19-q3",
        type: "multiple_choice",
        title: "Role of Client Validation",
        prompt: "If server validation is mandatory, why include client-side validation in forms at all?",
        options: [
          "Client validation provides instant user feedback and prevents unnecessary network requests for honest users",
          "Client validation is required to unlock CSS colors",
          "Client validation encrypts the database",
          "There is no reason; client validation should never be written",
        ],
        correctAnswer: 0,
        explanation: "Client validation improves user experience by alerting users immediately to typos, while server validation guarantees security and data integrity.",
        hint: "Client validation is for UX; server validation is for security.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-20: Debugging Next.js Problems ──
  {
    id: "quiz-nextjs-nx20",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx20-debugging-nextjs-problems",
    lessonCode: "NX-20",
    lessonTitle: "Debugging Next.js Problems",
    description: "Evaluate your troubleshooting skills for App Router error messages, hydration mismatches, and boundary checks.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx20-q1",
        type: "multiple_choice",
        title: "useState in Server Component",
        prompt: "You get an error saying 'useState can only be used in a Client Component'. What should you check?",
        options: [
          "Check that the component using useState is a Client Component with 'use client' at the top",
          "Check if your computer has enough RAM memory",
          "Check if the CSS file has valid syntax",
          "Check if the database server is running",
        ],
        correctAnswer: 0,
        explanation: "React state hooks like useState can only execute in Client Components. Add 'use client' to the file, or extract the interactive piece into a Client Component.",
        hint: "Review the Lesson 20 scenario question.",
        hintCostXP: 5,
      },
      {
        id: "nx20-q2",
        type: "multiple_choice",
        title: "Hydration Mismatch Causes",
        prompt: "What causes a React 'Text content does not match server-rendered HTML' hydration error?",
        options: [
          "Rendering browser-specific or non-deterministic values (like new Date() or window) that differ between the server and the browser",
          "Using TypeScript instead of JavaScript",
          "Having more than 3 buttons on a page",
          "Running the app on a port other than 3000",
        ],
        correctAnswer: 0,
        explanation: "Hydration errors occur when the initial HTML pre-rendered on the server does not match the initial render tree in the browser. Values like timestamps or window properties should be mounted after client hydration.",
        hint: "Server HTML and initial client render must match.",
        hintCostXP: 5,
      },
      {
        id: "nx20-q3",
        type: "multiple_choice",
        title: "Practical Debugging Process",
        prompt: "What is the recommended first step when debugging a runtime failure in Next.js?",
        options: [
          "Read the first useful error line in the terminal or console to identify the exact file and line number",
          "Randomly delete dependencies from package.json",
          "Rewrite the entire application from scratch",
          "Reinstall the operating system",
        ],
        correctAnswer: 0,
        explanation: "Systematic debugging starts by reading the top of the error stack trace to identify the exact file, line number, and component boundary that caused the failure.",
        hint: "Follow the practical debugging checklist from Lesson 20.",
        hintCostXP: 5,
      },
    ],
  },

  // ── NX-21: Website Performance Optimization ──
  {
    id: "quiz-nextjs-nx21",
    trackKey: "nextjs",
    trackTitle: "Next.js",
    lessonSlug: "nx21-website-performance-optimization",
    lessonCode: "NX-21",
    lessonTitle: "Website Performance Optimization",
    description: "Assess your knowledge of Core Web Vitals, next/image optimization, parallel data loading with Promise.all, and server-side pagination.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "nx21-q1",
        type: "multiple_choice",
        title: "Measuring Real Performance",
        prompt: "Why should you never measure Core Web Vitals (LCP, INP, CLS) or run Lighthouse in 'next dev' development mode?",
        options: [
          "Development mode includes source maps, hot-reload scripts, unminified bundles, and unoptimized code that artificially slow down performance",
          "Development mode disables CSS styling completely so scores are zero",
          "Lighthouse refuses to run on localhost under any circumstance",
          "Development mode is actually faster than production builds, making scores deceptively high",
        ],
        correctAnswer: 0,
        explanation: "Always measure performance against a production build using 'npm run build && npm run start'. Development mode includes hot reload and unminified bundles that distort benchmarks.",
        hint: "Always build and start a production server before running audits.",
        hintCostXP: 5,
      },
      {
        id: "nx21-q2",
        type: "code_output",
        title: "Eliminating Data Waterfalls",
        prompt: "In this Server Component, how long does data loading take if fetchReviews takes 300ms and fetchAnalytics takes 400ms?",
        codeSnippet: `// app/course/page.tsx
const [reviews, analytics] = await Promise.all([
  fetchReviews(),
  fetchAnalytics(),
]);`,
        language: "tsx",
        options: [
          "Approximately 400ms (they run concurrently in parallel)",
          "700ms (they run sequentially one after another)",
          "1200ms (each fetch retries 3 times automatically)",
          "0ms (Next.js executes them during compile time only)",
        ],
        correctAnswer: 0,
        explanation: "Using Promise.all executes both asynchronous fetches in parallel, so the total waiting time equals the slowest request (~400ms) rather than their sum (700ms).",
        hint: "Parallel execution runs simultaneously, bounded by the slowest task.",
        hintCostXP: 5,
      },
      {
        id: "nx21-q3",
        type: "multiple_choice",
        title: "Scaling Heavy Datasets",
        prompt: "A course page has 2,000 student reviews and a heavy 2MB interactive analytics chart. What are the best optimization steps?",
        options: [
          "Paginate reviews on the server (e.g. take: 20) and dynamically lazy load the heavy chart with next/dynamic or React Suspense",
          "Fetch all 2,000 reviews at once and hide 1,980 with CSS 'display: none'",
          "Convert the entire page into a Client Component with useEffect",
          "Remove the database and store all reviews in a client-side localStorage cookie",
        ],
        correctAnswer: 0,
        explanation: "Server-side pagination (take: 20) keeps payloads small and fast. Lazy loading heavy interactive widgets delays JavaScript downloading until needed, drastically reducing INP and initial bundle size.",
        hint: "Think about what needs to be in the initial payload vs loaded on demand.",
        hintCostXP: 5,
      },
    ],
  },
];
