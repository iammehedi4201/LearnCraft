import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx15PageTitlesAndMetadataContent: StandardLessonContent = {
  slug: "nx15-page-titles-and-metadata",
  code: "NX-15",
  title: "Page Titles and Metadata",
  subtitle: "Configure browser tab titles, descriptions, and SEO preview tags with static and dynamic metadata.",
  difficulty: "Easy",
  scenario: {
    question: "Your course page still shows the website's default browser-tab title. How can you set a better title for that page?",
    answer: "Export a metadata object from the page or use generateMetadata when the title depends on data.",
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
    bigPicture: "Metadata describes a page to browsers and search services. It can include the page title, description, and social media preview tags. In the App Router, a Server Component can export metadata for a page or layout.",
    codeSnippet: `// app/courses/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LearnCraft Courses",
  description: "Learn modern programming step by step.",
};

export default function CoursesPage() {
  return <h1>Courses</h1>;
}

// Next.js automatically injects <title> and <meta name="description">
// into the HTML <head> element.`,
    breakdownTitle: "Metadata Mechanics",
    breakdownItems: [
      {
        title: "Static metadata Export",
        desc: "Export an object named metadata conforming to Next.js Metadata type for static titles and descriptions.",
      },
      {
        title: "generateMetadata Function",
        desc: "For dynamic pages (e.g. /courses/[id]), export async function generateMetadata to fetch the title from a database.",
      },
      {
        title: "Layout Inheritance",
        desc: "Root layouts set default fallback titles; nested pages override or template them with title.template.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Metadata Rule",
      content: "Always provide unique, descriptive titles and meta descriptions for pages to improve SEO and user tab recognition.",
    },
    cards: [
      {
        number: "01",
        tag: "SEO",
        title: "Search Ranking",
        description: "Search engines use the page title and description snippet to rank and present your website in results.",
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
        description: "Adding openGraph metadata creates rich preview cards with images when links are shared on Slack or Twitter.",
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
      code: `"use client"; // ❌ Error!
import type { Metadata } from "next";

export const metadata: Metadata = { // Will throw a Next.js build error
  title: "My Page",
};`,
      explanation: "Next.js can only read metadata exports from Server Components. Putting metadata in a Client Component fails compilation.",
    },
    good: {
      title: "Keeping Metadata in a Server Component Parent",
      code: `// app/courses/page.tsx (Server Component)
import type { Metadata } from "next";
import InteractiveClientView from "./InteractiveClientView";

export const metadata: Metadata = {
  title: "Courses | LearnCraft",
};

export default function Page() {
  return <InteractiveClientView />;
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
