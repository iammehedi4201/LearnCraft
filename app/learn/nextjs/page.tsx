"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NextJsHub(): JSX.Element {
  const basics = [
    {
      code: "NX-01",
      name: "App Router Fundamentals",
      path: "/learn/nextjs/nx01-app-router",
      desc: "Understand the App Router (pages, layouts, segments)",
    },
    {
      code: "NX-02",
      name: "File-Based Routing",
      path: "/learn/nextjs/nx02-routing",
      desc: "How Next.js organizes routes using filesystem conventions",
    },
    {
      code: "NX-03",
      name: "Server vs Client Components",
      path: "/learn/nextjs/nx03-server-client",
      desc: "RSC vs client components, when to use each",
    },
    {
      code: "NX-04",
      name: "Layouts & Nesting",
      path: "/learn/nextjs/nx04-layouts",
      desc: "Shared layouts, route groups, nested routing patterns",
    },
    {
      code: "NX-05",
      name: "Dynamic Routes",
      path: "/learn/nextjs/nx05-dynamic",
      desc: "Segment parameters, catch-all routes, optional segments",
    },
    {
      code: "NX-06",
      name: "Server-side Data Fetching",
      path: "/learn/nextjs/nx06-server-fetch",
      desc: "Async components, fetch in layout/page, no loading states",
    },
  ];

  const intermediate = [
    {
      code: "NX-07",
      name: "Client-side Data Fetching",
      path: "/learn/nextjs/nx07-client-fetch",
      desc: 'useEffect pattern, loading states, "use client" components',
    },
    {
      code: "NX-08",
      name: "Error Handling & Error.tsx",
      path: "/learn/nextjs/nx08-errors",
      desc: "Error boundaries, error.tsx files, error recovery",
    },
    {
      code: "NX-09",
      name: "Loading States & Loading.tsx",
      path: "/learn/nextjs/nx09-loading",
      desc: "Instant UI feedback with loading.tsx and Suspense",
    },
    {
      code: "NX-10",
      name: "Route Handlers",
      path: "/learn/nextjs/nx10-route-handlers",
      desc: "Create API routes with /app/api/route.ts",
    },
    {
      code: "NX-11",
      name: "Middleware",
      path: "/learn/nextjs/nx11-middleware",
      desc: "Authorization, logging, request/response modification",
    },
    {
      code: "NX-12",
      name: "Metadata & SEO",
      path: "/learn/nextjs/nx12-metadata",
      desc: "Dynamic metadata, Open Graph, page titles",
    },
  ];

  const advanced = [
    {
      code: "NX-13",
      name: "Image Optimization",
      path: "/learn/nextjs/nx13-images",
      desc: "Next.js Image component, automatic optimization",
    },
    {
      code: "NX-14",
      name: "Font Optimization",
      path: "/learn/nextjs/nx14-fonts",
      desc: "next/font for self-hosted and Google Fonts",
    },
    {
      code: "NX-15",
      name: "Script Optimization",
      path: "/learn/nextjs/nx15-scripts",
      desc: "next/script for third-party scripts",
    },
    {
      code: "NX-16",
      name: "Static Generation (SSG)",
      path: "/learn/nextjs/nx16-ssg",
      desc: "Pre-render at build time, generateStaticParams",
    },
    {
      code: "NX-17",
      name: "Incremental Static Regeneration (ISR)",
      path: "/learn/nextjs/nx17-isr",
      desc: "Revalidate specific pages at intervals",
    },
    {
      code: "NX-18",
      name: "On-Demand Revalidation",
      path: "/learn/nextjs/nx18-on-demand-revalidate",
      desc: "Manually trigger cache invalidation from API routes",
    },
    {
      code: "NX-19",
      name: "Caching Strategies",
      path: "/learn/nextjs/nx19-caching",
      desc: "request memoization, data cache, full route cache",
    },
    {
      code: "NX-20",
      name: "Environment Variables",
      path: "/learn/nextjs/nx20-env",
      desc: "NEXT_PUBLIC_, server-only vars, .env files",
    },
  ];

  const FeatureCard = ({
    code,
    name,
    path,
    desc,
  }: {
    code: string;
    name: string;
    path: string;
    desc: string;
  }) => (
    <Link
      href={path}
      className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-purple-300 transition-all"
    >
      <h3 className="font-bold text-purple-600 mb-2">
        {code} — {name}
      </h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </Link>
  );

  return (
    <>
      <Nav />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <Link
            href="/learn"
            className="text-purple-600 hover:text-purple-700 mb-6 inline-block"
          >
            ← Back to Learning Paths
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Next.js 14+ Learning Path
          </h1>
          <p className="text-lg text-gray-700">
            Master the App Router, Server Components, data fetching patterns,
            and optimization strategies. 20 features organized from basics to
            advanced techniques.
          </p>
        </div>

        {/* Basics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-2 border-b-4 border-purple-600">
            📚 Basics (NX-01 to NX-06)
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {basics.map((f) => (
              <FeatureCard key={f.code} {...f} />
            ))}
          </div>
        </section>

        {/* Intermediate */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-2 border-b-4 border-orange-600">
            ⚡ Intermediate (NX-07 to NX-12)
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intermediate.map((f) => (
              <FeatureCard key={f.code} {...f} />
            ))}
          </div>
        </section>

        {/* Advanced */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-2 border-b-4 border-pink-600">
            🚀 Advanced (NX-13 to NX-20)
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advanced.map((f) => (
              <FeatureCard key={f.code} {...f} />
            ))}
          </div>
        </section>

        <div className="bg-purple-50 rounded-lg p-8 border border-purple-200 mb-12">
          <h3 className="font-bold text-lg text-gray-900 mb-4">💡 Note</h3>
          <p className="text-gray-700">
            Each feature explains the Next.js concept, shows how it works with
            practical examples, and demonstrates best practices. Start with
            basics to understand routing and components, then progress through
            intermediate patterns and optimization techniques.
          </p>
        </div>
      </div>
    </>
  );
}
