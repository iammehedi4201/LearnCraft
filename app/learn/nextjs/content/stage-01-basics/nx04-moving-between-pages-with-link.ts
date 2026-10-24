import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx04MovingBetweenPagesWithLinkContent: StandardLessonContent = {
  slug: "nx04-moving-between-pages-with-link",
  code: "NX-04",
  title: "Moving Between Pages with Link",
  subtitle: "The Next.js Link component provides fast client-side transitions and viewport route prefetching.",
  difficulty: "Easy",
  scenario: {
    question: "A user clicks 'View courses' and should go to /courses. What should you use?",
    answer: "Use Link from next/link with href=\"/courses\".",
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
    title: "Moving Between Pages with Link",
    bigPicture: "In traditional websites, clicking a link causes the browser to reload the whole window, flash white, and reset all JavaScript state. In Next.js, the <Link> component performs fast client-side navigation: it only downloads and updates the new page content while keeping your existing layout intact.",
    analogy: "Clicking a standard HTML <a> tag is like closing your book completely, walking over to the shelf, and opening a brand-new book. Next.js <Link> is like smoothly flipping to the next page in the book already in your hands: instant, effortless, and you never lose your place.",
    codeSnippet: `// app/components/Navbar.tsx
// 1. Import Link from next/link:
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "16px" }}>
      {/* 2. Point to internal routes using href: */}
      <Link href="/">Home</Link>
      <Link href="/courses">Courses</Link>
      <Link href="/about">About Us</Link>
    </nav>
  );
}

// Result: Clicking 'Courses' swaps the page instantly with NO full-page reload!`,
    breakdownTitle: "How This Works Step by Step",
    breakdownItems: [
      {
        title: "1. import Link from 'next/link'",
        desc: "Next.js provides a specialized React component that intercepts normal browser link clicks.",
      },
      {
        title: "2. Automatic Viewport Prefetching",
        desc: "When a <Link> appears in the user's viewport (on screen), Next.js automatically downloads the code for that page in the background before the user even clicks it.",
      },
      {
        title: "3. Client-Side Page Swapping",
        desc: "When clicked, Next.js updates the browser URL and replaces the active page component without refreshing the browser window.",
      },
      {
        title: "4. Preserves Component State",
        desc: "Because there is no hard refresh, your header, footer, audio players, or form states in parent layouts are never interrupted.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Navigation Component Rule",
      content: "Always use <Link> for internal pages inside your Next.js application. Use standard HTML <a> tags only for external websites (e.g., https://github.com).",
    },
    cards: [
      {
        number: "01",
        tag: "SPEED",
        title: "Instant Navigation",
        description: "Because only the necessary page segment is updated, page transitions feel as fast as a native mobile app.",
        color: "purple",
      },
      {
        number: "02",
        tag: "PREFETCH",
        title: "Automatic Prefetching",
        description: "Next.js preloads the route payload in production before the user clicks, making the transition virtually zero-delay.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "STATE",
        title: "Retains Layout State",
        description: "Unlike browser hard reloads, client-side transitions don't blow away current React state in shared layouts.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to navigate cleanly across routes in your app:",
    points: [
      {
        title: "1. Basic internal link",
        content: "Use <Link href=\"/courses\">Courses</Link> to jump straight to the /courses route.",
      },
      {
        title: "2. Links with query parameters",
        content: "You can pass query parameters directly in the string: <Link href=\"/courses?level=beginner\">.",
      },
      {
        title: "3. External websites",
        content: "For external links (e.g. href=\"https://google.com\"), use standard HTML <a href=\"...\"> with target=\"_blank\" rel=\"noopener noreferrer\".",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Using HTML <a> for Internal App Routes",
      code: `// ❌ Flashes blank screen and reloads the entire browser window:
export default function Navbar() {
  return <a href="/courses">Courses</a>;
}`,
      explanation: "Standard <a> tags cause a hard page reload, losing client state and negating Next.js performance optimizations.",
    },
    good: {
      title: "Using the Next.js <Link> Component",
      code: `// ✅ Instant SPA-like transition with background prefetching:
import Link from "next/link";

export default function Navbar() {
  return <Link href="/courses">Courses</Link>;
}`,
      explanation: "Next.js Link handles navigation client-side, preserving layout state and prefetching route data.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore a navigation bar with Next.js Link:",
    starterCode: `import Link from "next/link";

export default function Navigation() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      {links.map((link) => (
        <Link key={link.href} href={link.href} style={{ textDecoration: "none", color: "#6366f1" }}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why should you use Next.js <Link> instead of a standard HTML <a> tag for internal navigation?",
      options: [
        "Link performs fast client-side navigation without a full browser reload and supports prefetching",
        "HTML <a> tags are completely banned and cause a build crash in Next.js",
        "Link converts your site into an iOS native app",
        "Link automatically translates the page into multiple languages",
      ],
      correctIndex: 0,
      explanation: "The Next.js Link component intercepts clicks to perform instant client-side navigation and prefetches linked route data in the background.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Fast Transitions",
        desc: "Navigates client-side without full page reloads or blank flash screens.",
      },
      {
        title: "Auto-Prefetching",
        desc: "Routes linked in the viewport are preloaded automatically in production.",
      },
      {
        title: "Internal vs External",
        desc: "Use <Link> for internal app routes; use regular <a> for external websites.",
      },
    ],
    nextLessonPreview: {
      title: "Dynamic Routes",
      desc: "Learn how dynamic folders like [courseId] let one page component render hundreds of distinct items.",
    },
  },
};
