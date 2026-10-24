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
    bigPicture: "Think of a layout as a picture frame and a page as the picture inside! A layout.tsx file wraps around your pages to share persistent elements like navigation bars, sidebars, and footers. When users click between pages, only the inside content ({children}) changes — the layout stays in place without re-rendering or losing state.",
    codeSnippet: `// 1. app/layout.tsx — The Shared Frame (Root Layout)
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Navigation bar is written ONCE here: */}
        <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <strong>LearnCraft</strong> | <a href="/">Home</a> | <a href="/about">About</a>
        </nav>

        {/* The active page appears inside {children}: */}
        <main style={{ padding: "1rem" }}>{children}</main>

        <footer style={{ padding: "1rem", borderTop: "1px solid #ccc" }}>
          © 2026 LearnCraft
        </footer>
      </body>
    </html>
  );
}

// 2. app/page.tsx — The Home Page (inserted into {children} at '/')
export default function HomePage() {
  return <h1>Welcome to the Home Page</h1>;
}

// 3. app/about/page.tsx — The About Page (inserted into {children} at '/about')
export default function AboutPage() {
  return <h1>About LearnCraft</h1>;
}`,
    breakdownTitle: "How This Works Step by Step",
    breakdownItems: [
      {
        title: "1. The {children} Prop",
        desc: "Next.js automatically passes the current page component as the {children} prop into RootLayout.",
      },
      {
        title: "2. The Shared Shell",
        desc: "The <nav> and <footer> are defined once in layout.tsx. You never have to copy-paste them into every page.",
      },
      {
        title: "3. Fast Page Switching",
        desc: "When navigating from '/' to '/about', Next.js only swaps the content inside <main>{children}</main>. The layout never unmounts.",
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
        tag: "NO DUPLICATION",
        title: "Don't Repeat Yourself",
        description: "Shared navigation bars, themes, and global footers are written once and inherited by all child routes.",
        color: "purple",
      },
      {
        number: "02",
        tag: "PERSISTENCE",
        title: "Preserves State & Scroll",
        description: "Layouts stay mounted when switching between pages. Sidebar scroll positions and search inputs never reset.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "NESTED LAYOUTS",
        title: "Section-Specific Layouts",
        description: "Subfolders like app/dashboard/layout.tsx can add a dashboard sidebar that only affects dashboard subpages.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about layouts when structuring your application:",
    points: [
      {
        title: "1. Root layout is mandatory",
        content: "Every Next.js app requires app/layout.tsx. It must contain the <html> and <body> tags because it wraps every page in your project.",
      },
      {
        title: "2. Nested layouts nest automatically",
        content: "If you create app/courses/layout.tsx, Next.js automatically places it inside the root layout. It creates a hierarchy: RootLayout -> CoursesLayout -> CoursePage.",
      },
      {
        title: "3. Layouts do not re-render",
        content: "When users navigate between sibling pages, React keeps the layout component alive in memory. Only the {children} slot updates with new content.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Copy-Pasting Navigation into Every Page",
      code: `// ❌ BAD PRACTICE: Duplicating Navbar in every file
// app/page.tsx
export default function Home() {
  return (
    <div>
      <Navbar /> {/* Repeated in 50 different pages! */}
      <h1>Home Content</h1>
    </div>
  );
}

// app/about/page.tsx
export default function About() {
  return (
    <div>
      <Navbar /> {/* If Navbar changes, you must edit 50 files! */}
      <h1>About Content</h1>
    </div>
  );
}`,
      explanation: "Copy-pasting navigation components forces every page to re-render the navbar from scratch on navigation and makes maintenance painful.",
    },
    good: {
      title: "Define Once in layout.tsx",
      code: `// ✅ CLEAN NEXT.JS PRACTICE: Write once in layout.tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Navbar /> {/* Rendered once, shared everywhere! */}
        <main>{children}</main>
      </body>
    </html>
  );
}`,
      explanation: "Layouts keep your code DRY (Don't Repeat Yourself), preserve component state during navigation, and improve performance.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Here is how a clean root layout wraps pages with a persistent header and footer:",
    starterCode: `// app/layout.tsx
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <header style={{ padding: "1rem 0", borderBottom: "2px solid #6366f1" }}>
        <h2>LearnCraft Architecture</h2>
      </header>

      {/* The active page content renders here: */}
      <section style={{ padding: "1.5rem 0" }}>
        {children}
      </section>

      <footer style={{ padding: "1rem 0", borderTop: "1px solid #e5e7eb", color: "#6b7280" }}>
        <small>© 2026 LearnCraft Educational Platform</small>
      </footer>
    </div>
  );
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the main benefit of putting a navigation bar in layout.tsx instead of copying it into every page.tsx?",
      options: [
        "It is written once, shared by all pages, and does not re-render when switching pages",
        "It makes the website only work on mobile phones",
        "It encrypts the navigation bar so users cannot inspect it",
        "It deletes all CSS styles from the application",
      ],
      correctIndex: 0,
      explanation: "Layouts persist across page transitions, prevent duplicate code, and avoid re-rendering shared UI like headers and footers.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "The Frame & The Picture",
        desc: "Layout is the persistent frame; pages are the interchangeable pictures rendered inside {children}.",
      },
      {
        title: "Root Layout Required",
        desc: "app/layout.tsx is mandatory and must contain <html> and <body> tags.",
      },
      {
        title: "Preserves State",
        desc: "Layouts stay mounted when switching sibling routes, preserving user scroll and input states.",
      },
    ],
    nextLessonPreview: {
      title: "Moving Between Pages with Link",
      desc: "Learn how the Next.js Link component gives you instant, smooth client-side page transitions.",
    },
  },
};
