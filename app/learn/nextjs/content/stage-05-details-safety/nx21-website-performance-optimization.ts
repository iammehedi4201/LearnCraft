import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx21WebsitePerformanceOptimizationContent: StandardLessonContent = {
  slug: "nx21-website-performance-optimization",
  code: "NX-21",
  title: "Website Performance Optimization",
  subtitle: "Measure first with Lighthouse, optimize images and fonts, eliminate waterfalls, and paginate large datasets.",
  difficulty: "Difficult",
  scenario: {
    question: "A course page loads slowly. It shows a large hero image, loads 2,000 course records, and imports a chart library even when the chart is hidden. What would you check first?",
    answer: "Measure the page with Lighthouse and DevTools first. Then optimize the hero image, fetch only the course records needed for the current page, and load the chart library only when the chart is needed. Test again to see which changes helped.",
  },
  interviewQuestion: {
    question: "What are a few ways to improve performance in a Next.js app?",
    answer: "Measure the problem first. Optimize images and fonts, reduce unnecessary Client Components and JavaScript, fetch independent data in parallel, cache reusable data safely, paginate large lists, lazy-load heavy features, and test again with Lighthouse and DevTools.",
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
    title: "Website Performance Optimization",
    bigPicture: "Website performance means how quickly a page appears, how quickly it responds when someone uses it, and whether the page layout stays steady while loading. Measure first, find the biggest problem, and fix that problem. Do not add optimizations just because they sound advanced.",
    codeSnippet: `// 1. Parallel data fetching without waterfall delays:
const [courses, categories] = await Promise.all([
  getCourses(),
  getCategories(),
]);

// 2. Paginate large database queries on the server:
const pageSize = 20;
const page = Math.max(1, requestedPage);
const products = await database.product.findMany({
  skip: (page - 1) * pageSize,
  take: pageSize,
});

// 3. Optimized image with dimensions, sizes, and selective preloading:
import Image from "next/image";

export default function HeroBanner() {
  return (
    <Image
      src="/home-hero.jpg"
      alt="LearnCraft learning dashboard"
      width={1600}
      height={900}
      sizes="100vw"
      preload
    />
  );
}`,
    breakdownTitle: "Core Performance Pillars",
    breakdownItems: [
      {
        title: "1. Measure in Production First",
        desc: "Always test a production build (npm run build && npm run start) with Lighthouse and Chrome DevTools. Never benchmark development mode.",
      },
      {
        title: "2. Asset & Media Optimization",
        desc: "Use next/image with explicit dimensions and responsive sizes to prevent layout shifts. Host web fonts with next/font/google.",
      },
      {
        title: "3. Server-First Architecture",
        desc: "Keep components on the server by default. Isolate 'use client' to small interactive leaves and lazy-load heavy widgets with next/dynamic.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "The Golden Rule of Performance",
      content: "Do not guess or try every optimization at once. Measure the page in a production build, find the biggest confirmed bottleneck, make one useful change, and measure again.",
    },
    cards: [
      {
        number: "01",
        tag: "VITALS",
        title: "Core Web Vitals",
        description: "Focus on LCP (Largest Contentful Paint < 2.5s), INP (Interaction to Next Paint < 200ms), and CLS (Cumulative Layout Shift < 0.1).",
        color: "purple",
      },
      {
        number: "02",
        tag: "ASSETS",
        title: "Image & Font Speed",
        description: "next/image provides automatic WebP/AVIF compression and lazy loading. next/font eliminates external DNS delays and layout shifts.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "DATA",
        title: "Pagination & Parallelism",
        description: "Fetch independent queries with Promise.all. Paginate database results (20 items per page) instead of transferring thousands of rows.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how senior Next.js engineers systematically measure and optimize application speed:",
    points: [
      {
        title: "1. Diagnostic Workflow with Chrome DevTools",
        content: "Open Chrome DevTools Network tab to detect huge payloads or slow requests. Record a trace in the Performance tab to find long scripting tasks. Use the Lighthouse tab on production builds for actionable guidance.",
      },
      {
        title: "2. Reduce Browser JavaScript with Server Components",
        content: "Every byte of client JavaScript must be downloaded, parsed, and executed. Keeping data display in Server Components eliminates client bundle weight. Use next/dynamic to defer heavy modules like chart editors until requested.",
      },
      {
        title: "3. Choose the Right Caching & Pagination Strategy",
        content: "Cache safe reusable public content and revalidate on mutations. For large datasets, use server pagination (skip/take) for jumpable pages, infinite scrolling for feeds, or virtualization for massive visible tables.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Monolithic Waterfall & Unbounded Over-Fetching",
      code: `// BAD: Serial waterfall, fetching 2,000 records, unoptimized <img>
export default async function CoursesPage() {
  // Serial requests wait one after another!
  const courses = await database.course.findMany(); // 2,000 records!
  const categories = await database.category.findMany();

  return (
    <div>
      {/* Raw <img> has no width/height, causing severe CLS layout shifts */}
      <img src="/hero.png" alt="Banner" />
      {courses.map(c => <p key={c.id}>{c.title}</p>)}
    </div>
  );
}`,
      explanation: "Serial await calls double total network wait time, fetching 2,000 rows exhausts mobile device memory, and raw <img> without dimensions causes jarring Cumulative Layout Shift (CLS).",
    },
    good: {
      title: "Parallel Fetching, Database Pagination & Optimized Media",
      code: `// CLEAN: Parallel queries, 20 items per page, and next/image
import Image from "next/image";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const pageSize = 20;

  // Run independent database queries simultaneously
  const [courses, categories] = await Promise.all([
    database.course.findMany({
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }),
    database.category.findMany(),
  ]);

  return (
    <main>
      {/* next/image reserves space immediately, preventing layout shift */}
      <Image
        src="/hero.jpg"
        alt="Course Catalog"
        width={1200}
        height={400}
        sizes="100vw"
        preload
      />
      {courses.map(c => <p key={c.id}>{c.title}</p>)}
    </main>
  );
}`,
      explanation: "Promise.all cuts query latency in half, server-side pagination transfers only 20 records over the wire, and next/image with preload delivers fast LCP with zero layout shift.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore a modern Next.js performance pattern combining parallel fetching, pagination, and asset optimization:",
    starterCode: `import Image from "next/image";

// Simulated high-performance Server Component
export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;
  const pageNum = Math.max(1, parseInt(page, 10));
  const pageSize = 10;

  // Fetch independent data in parallel without waterfall delays
  const [items, stats] = await Promise.all([
    fetchItems(pageNum, pageSize),
    fetchCatalogStats(),
  ]);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Performance-Optimized Course Catalog</h1>
      <p>Total Available Courses: {stats.totalCount}</p>
      <p>Showing Page {pageNum} ({items.length} items)</p>

      {/* Optimized hero with explicit dimensions */}
      <Image
        src="/banner.jpg"
        alt="LearnCraft Campus"
        width={800}
        height={300}
        sizes="(max-width: 768px) 100vw, 800px"
      />

      <section style={{ marginTop: "1.5rem" }}>
        {items.map((item) => (
          <article key={item.id} style={{ borderBottom: "1px solid #333", padding: "0.5rem 0" }}>
            <strong>{item.title}</strong> — {item.level}
          </article>
        ))}
      </section>
    </main>
  );
}

async function fetchItems(page: number, limit: number) {
  return [
    { id: 1, title: "Next.js App Router Architecture", level: "Advanced" },
    { id: 2, title: "Server Actions & Form Security", level: "Intermediate" },
  ];
}
async function fetchCatalogStats() {
  return { totalCount: 42 };
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "A course page loads slowly. It shows a large hero image, loads 2,000 course records, and imports a chart library even when the chart is hidden. What should you do first?",
      options: [
        "Immediately add useMemo and useCallback to every single React component in the project",
        "Measure the page with Lighthouse and DevTools in a production build to identify the primary bottleneck",
        "Rewrite the entire application in Python or WebAssembly without checking network requests",
        "Convert all Server Components into Client Components with 'use client'",
      ],
      correctIndex: 1,
      explanation: "Always measure first using Lighthouse and Chrome DevTools on a production build (npm run build && npm run start). Identify whether the delay is caused by the large image, unpaginated data query, or heavy JS bundle before applying targeted fixes.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Measure Before Changing",
        desc: "Always test a production build with Lighthouse and DevTools. Find the single biggest confirmed bottleneck before applying optimizations.",
      },
      {
        title: "Asset & Data Efficiency",
        desc: "Use next/image with dimensions and responsive sizes to prevent layout shifts. Paginate large database queries (skip/take) on the server.",
      },
      {
        title: "Eliminate Waterfalls & Bloat",
        desc: "Fetch independent queries in parallel with Promise.all, stream loading states with Suspense, and lazy-load heavy client features with next/dynamic.",
      },
    ],
  },
};
