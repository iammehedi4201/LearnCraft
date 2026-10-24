import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx15PageTitlesAndMetadataContent: StandardLessonContent = {
  slug: "nx15-page-titles-and-metadata",
  code: "NX-15",
  title: "Page Titles and Metadata",
  subtitle: "Configure browser tab titles, descriptions, and SEO preview tags with static and dynamic metadata.",
  difficulty: "Easy",
  scenario: {
    question: "Your course page still shows the website's default browser-tab title. How can you set a better title for that page?",
    answer: "Export a `metadata` object from the page or use `generateMetadata` when the title depends on data.",
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
    title: "Page Titles and Metadata",
    bigPicture: "Metadata is the information that describes your page to browsers, search engines like Google, and social media platforms. It controls the text displayed in the browser tab, the search result snippet on Google, and the preview card on Twitter or Discord. In Next.js, Server Components can export a static 'metadata' object or a dynamic 'generateMetadata' function.",
    analogy: "If your web page is a package sitting on a supermarket shelf, the component JSX is what is inside the box. The 'metadata' is the label printed on the outside: the title, description, and barcode that shoppers and cashiers read before opening the package.",
    codeSnippet: `// app/courses/page.tsx
// 1. Import the Metadata type from Next.js:
import type { Metadata } from "next";

// 2. Export a metadata object from your Server Component page:
export const metadata: Metadata = {
  title: "Full-Stack Courses | LearnCraft",
  description: "Master Next.js, TypeScript, and modern backend architecture step by step.",
};

// 3. Export your default React page component:
export default function CoursesPage() {
  return (
    <main>
      <h1>Browse All Courses</h1>
      <p>Select a learning track below.</p>
    </main>
  );
}

// Next.js automatically injects <title> and <meta name="description"> into the HTML <head>!`,
    breakdownTitle: "How This Works Step by Step",
    breakdownItems: [
      {
        title: "1. Type-Safe Metadata Object",
        desc: "Importing 'Metadata' from 'next' provides TypeScript autocomplete for all standard HTML meta tags, including OpenGraph and Twitter cards.",
      },
      {
        title: "2. Automatic <head> Injection",
        desc: "You never need to manually write <head> or <title> tags in your JSX. Next.js extracts the exported 'metadata' object and injects proper HTML tags into the document head on the server.",
      },
      {
        title: "3. Server Component Only",
        desc: "Next.js must read metadata before sending the initial HTML payload to Google crawlers, so metadata exports are only valid in Server Components (no 'use client').",
      },
      {
        title: "4. Dynamic Titles with generateMetadata",
        desc: "For dynamic routes (e.g. /courses/[id]), export 'async function generateMetadata({ params })' to fetch the course title from your database and set it dynamically.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Descriptive Metadata Rule",
      content: "Always provide unique, descriptive titles and meta descriptions for pages to improve SEO and user tab recognition.",
    },
    cards: [
      {
        number: "01",
        tag: "SEO",
        title: "Search Ranking",
        description: "Google uses the page title and description snippet to rank and present your website in search results.",
        color: "purple",
      },
      {
        number: "02",
        tag: "BROWSER TAB",
        title: "Tab Recognition",
        description: "Helps users identify your tab among dozens of open tabs in their browser window.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "SOCIAL SHARES",
        title: "OpenGraph Cards",
        description: "Adding openGraph metadata creates rich preview cards with images when links are shared on Slack, Discord, or Twitter.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to manage static and dynamic metadata:",
    points: [
      {
        title: "1. Static page export",
        content: "On fixed pages, export const metadata: Metadata = { title: '...', description: '...' } at the top of page.tsx.",
      },
      {
        title: "2. Dynamic database-driven titles",
        content: "On dynamic routes like [courseId], write export async function generateMetadata({ params }) to query the course name.",
      },
      {
        title: "3. Server Component requirement",
        content: "Metadata exports only work in Server Components. You cannot export metadata from files with 'use client'.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Exporting Metadata from a Client Component",
      code: `"use client"; // ❌ Next.js compiler error!
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Interactive Page",
};`,
      explanation: "Next.js can only read metadata exports from Server Components. Putting metadata in a Client Component fails compilation.",
    },
    good: {
      title: "Keeping Metadata in a Server Component Parent",
      code: `// app/courses/page.tsx (Server Component)
import type { Metadata } from "next";
import InteractiveCourseList from "./InteractiveCourseList"; // 'use client'

export const metadata: Metadata = {
  title: "Courses | LearnCraft",
};

export default function Page() {
  return <InteractiveCourseList />;
}`,
      explanation: "Keep metadata in the Server Component page wrapper and import interactive client UI components as children.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore a dynamic generateMetadata function for dynamic routes:",
    starterCode: `// app/courses/[id]/page.tsx
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: \`Course #\${id} | LearnCraft\`,
    description: \`Master curriculum for course id \${id}\`,
  };
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Where can the 'export const metadata' object be defined in the Next.js App Router?",
      options: [
        "In Server Component layout.tsx or page.tsx files",
        "In Client Components with 'use client'",
        "In CSS stylesheets",
        "In the public/robots.txt file only",
      ],
      correctIndex: 0,
      explanation: "Metadata can only be exported from Server Component layout.tsx or page.tsx files. It is not supported in Client Components.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Server Component Only",
        desc: "metadata can only be exported from Server Components.",
      },
      {
        title: "generateMetadata for Dynamic",
        desc: "Use async generateMetadata when titles depend on route parameters or database queries.",
      },
      {
        title: "Search & Social Previews",
        desc: "Configures browser tabs, search engine summaries, and OpenGraph social share cards.",
      },
    ],
    nextLessonPreview: {
      title: "Images and Static Files",
      desc: "Learn how the next/image component provides automatic resizing, optimization, and zero layout shift.",
    },
  },
};
