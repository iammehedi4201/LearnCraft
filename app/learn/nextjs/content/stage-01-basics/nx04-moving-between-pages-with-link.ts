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
    bigPicture: "Use Next.js Link to navigate between routes in your app. It supports client-side navigation and Next.js navigation improvements without reloading the whole browser window.",
    codeSnippet: `import Link from "next/link";

export default function HomePage() {
  return (
    <nav>
      <Link href="/courses">View courses</Link>
      <Link href="/about">About Us</Link>
    </nav>
  );
}`,
    breakdownTitle: "Link Features",
    breakdownItems: [
      {
        title: "Client-Side Transition",
        desc: "Clicking a Link updates the URL and replaces the page content without triggering a full page refresh.",
      },
      {
        title: "Automatic Prefetching",
        desc: "Next.js automatically prefetches linked pages in the background as they enter the user's viewport.",
      },
      {
        title: "Accessibility Friendly",
        desc: "Renders standard HTML <a> tags under the hood, ensuring search engines and screen readers can crawl links.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Client Navigation Rule",
      content: "Always use <Link> for internal app navigation. Use regular <a> tags only for external websites outside your app.",
    },
    cards: [
      {
        number: "01",
        tag: "SPEED",
        title: "Instant Navigation",
        description: "Because only the necessary route segment is updated, page transitions feel instant to the user.",
        color: "purple",
      },
      {
        number: "02",
        tag: "PREFETCH",
        title: "Viewport Prefetching",
        description: "Next.js preloads the route payload in production before the user even clicks the link.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "STATE",
        title: "Retains Client State",
        description: "Unlike browser hard reloads, client-side transitions don't blow away current React state in layouts.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to navigate cleanly across routes:",
    points: [
      {
        title: "1. Basic internal link",
        content: "Use <Link href=\"/courses\">Courses</Link> to jump straight to the /courses route.",
      },
      {
        title: "2. Links with query parameters",
        content: "You can pass strings like <Link href=\"/courses?level=beginner\"> or URL objects.",
      },
      {
        title: "3. External URLs",
        content: "For external links (e.g. href=\"https://github.com\"), use standard HTML <a href=\"...\"> instead of Next.js Link.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Using HTML <a> for Internal Routes",
      code: `// Flashes blank screen and reloads the entire browser!
export default function Navbar() {
  return <a href="/courses">Courses</a>;
}`,
      explanation: "Standard <a> tags cause a hard page reload, losing client state and negating Next.js performance optimizations.",
    },
    good: {
      title: "Using Next.js <Link>",
      code: `// Instant SPA-like transition with background prefetching
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
