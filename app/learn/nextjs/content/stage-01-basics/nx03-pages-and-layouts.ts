import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx03PagesAndLayoutsContent: StandardLessonContent = {
  slug: "nx03-pages-and-layouts",
  code: "NX-03",
  title: "Pages and Layouts",
  subtitle: "Layouts share persistent navigation, headers, and footers across multiple pages without re-rendering.",
  difficulty: "Moderate",
  scenario: {
    question: "Your home, courses, and profile pages all need the same navigation bar. Should you copy it into all three pages?",
    answer: "No. Put the shared navigation in a layout or a shared component so the pages can reuse it.",
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
    title: "Pages and Layouts",
    bigPicture: "A page shows the content for a route. A layout provides UI shared by pages, such as a header, navigation, or footer. Layouts can be nested, so a group of pages can share its own layout.",
    codeSnippet: `// app/layout.tsx (Required Root Layout)
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>LearnCraft Navigation</header>
        {children}
        <footer>© 2026 LearnCraft</footer>
      </body>
    </html>
  );
}

// The 'children' value is the page or nested layout shown inside the shared layout.`,
    breakdownTitle: "Layout Mechanics",
    breakdownItems: [
      {
        title: "Root Layout is Required",
        desc: "app/layout.tsx is mandatory in the App Router and must define <html> and <body> tags.",
      },
      {
        title: "State Preservation",
        desc: "When users navigate between child pages, the layout does not re-render or lose client state.",
      },
      {
        title: "Nestable Structure",
        desc: "Folders like app/dashboard/layout.tsx can wrap only dashboard subpages with a sidebar.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Shared UI Rule",
      content: "Build shared parts like headers, sidebars, and footers once in layouts instead of repeating them on every page.",
    },
    cards: [
      {
        number: "01",
        tag: "DRY",
        title: "Don't Repeat Yourself",
        description: "Shared navigation bars and footers are written once and inherited by all child routes.",
        color: "purple",
      },
      {
        number: "02",
        tag: "PERSISTENCE",
        title: "Preserves State",
        description: "Layouts stay mounted when switching sibling routes; form inputs or scroll positions in sidebars don't reset.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "HIERARCHY",
        title: "Nested Layouts",
        description: "Subfolders can define their own layout.tsx, nesting their UI inside the parent layout.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how layouts and pages coordinate UI:",
    points: [
      {
        title: "1. Root HTML wrapper",
        content: "app/layout.tsx wraps every single page on the site, holding the global head tags, fonts, and header.",
      },
      {
        title: "2. The children prop",
        content: "Next.js automatically passes the current page component as the children prop into the layout.",
      },
      {
        title: "3. Sectional sub-layouts",
        content: "app/courses/layout.tsx can add a course sidebar that only appears on /courses and /courses/123, without affecting /about.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Duplicating Navigation in Every Page",
      code: `// app/page.tsx
export default function HomePage() {
  return (
    <div>
      <Navbar /> {/* Duplicated on every page */}
      <h1>Home</h1>
    </div>
  );
}

// app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <Navbar /> {/* Re-renders from scratch on navigation */}
      <h1>About</h1>
    </div>
  );
}`,
      explanation: "Copying Navbar into every page causes it to unmount and remount on navigation, losing focus and state.",
    },
    good: {
      title: "Using a Shared Layout",
      code: `// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* Rendered once, preserved across route changes */}
        {children}
      </body>
    </html>
  );
}`,
      explanation: "Placing Navbar in the layout keeps it permanently mounted while only the changing child page swaps.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore how a nested layout wraps page content:",
    starterCode: `// app/courses/layout.tsx
export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: "2rem", padding: "1rem" }}>
      <aside style={{ width: "200px", borderRight: "1px solid #ddd" }}>
        <h3>Course Tracks</h3>
        <ul>
          <li>Next.js</li>
          <li>TypeScript</li>
          <li>React</li>
        </ul>
      </aside>
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens to the RootLayout component when a user navigates between two sibling pages?",
      options: [
        "The layout remains mounted and preserves its state; only the child page changes",
        "The layout completely unmounts, reloads the browser, and resets all state",
        "The layout throws an error if it contains any HTML elements",
        "The layout is permanently deleted from the browser cache",
      ],
      correctIndex: 0,
      explanation: "Next.js layouts are state-preserving. When navigating between sibling routes, the layout does not unmount or lose its state; only the changing children page slot is swapped.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Shared UI Primitives",
        desc: "Layouts define UI that is shared across multiple pages in a route segment.",
      },
      {
        title: "State Preserving",
        desc: "Layouts do not unmount during navigation, maintaining scroll and component state.",
      },
      {
        title: "Mandatory Root",
        desc: "app/layout.tsx is required and must contain <html> and <body> tags.",
      },
    ],
    nextLessonPreview: {
      title: "Moving Between Pages with Link",
      desc: "Learn how the Next.js Link component enables instant, client-side navigation without full page reloads.",
    },
  },
};
