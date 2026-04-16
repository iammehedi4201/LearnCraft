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
      color: "purple",
    },
    {
      code: "NX-02",
      name: "File-Based Routing",
      path: "/learn/nextjs/nx02-routing",
      desc: "How Next.js organizes routes using filesystem conventions",
      color: "purple",
    },
    {
      code: "NX-03",
      name: "Server vs Client Components",
      path: "/learn/nextjs/nx03-server-client",
      desc: "RSC vs client components, when to use each",
      color: "purple",
    },
    {
      code: "NX-04",
      name: "Layouts & Nesting",
      path: "/learn/nextjs/nx04-layouts",
      desc: "Shared layouts, route groups, nested routing patterns",
      color: "purple",
    },
    {
      code: "NX-05",
      name: "Dynamic Routes",
      path: "/learn/nextjs/nx05-dynamic",
      desc: "Segment parameters, catch-all routes, optional segments",
      color: "purple",
    },
    {
      code: "NX-06",
      name: "Server-side Data Fetching",
      path: "/learn/nextjs/nx06-server-fetch",
      desc: "Async components, fetch in layout/page, no loading states",
      color: "purple",
    },
  ];

  const intermediate = [
    {
      code: "NX-07",
      name: "Client-side Data Fetching",
      path: "/learn/nextjs/nx07-client-fetch",
      desc: 'useEffect pattern, loading states, "use client" components',
      color: "orange",
    },
    {
      code: "NX-08",
      name: "Error Handling & Error.tsx",
      path: "/learn/nextjs/nx08-errors",
      desc: "Error boundaries, error.tsx files, error recovery",
      color: "orange",
    },
    {
      code: "NX-09",
      name: "Loading States & Loading.tsx",
      path: "/learn/nextjs/nx09-loading",
      desc: "Instant UI feedback with loading.tsx and Suspense",
      color: "orange",
    },
    {
      code: "NX-10",
      name: "Route Handlers",
      path: "/learn/nextjs/nx10-route-handlers",
      desc: "Create API routes with /app/api/route.ts",
      color: "orange",
    },
    {
      code: "NX-11",
      name: "Middleware",
      path: "/learn/nextjs/nx11-middleware",
      desc: "Authorization, logging, request/response modification",
      color: "orange",
    },
    {
      code: "NX-12",
      name: "Metadata & SEO",
      path: "/learn/nextjs/nx12-metadata",
      desc: "Dynamic metadata, Open Graph, page titles",
      color: "orange",
    },
  ];

  const advanced = [
    {
      code: "NX-13",
      name: "Image Optimization",
      path: "/learn/nextjs/nx13-images",
      desc: "Next.js Image component, automatic optimization",
      color: "pink",
    },
    {
      code: "NX-14",
      name: "Font Optimization",
      path: "/learn/nextjs/nx14-fonts",
      desc: "next/font for self-hosted and Google Fonts",
      color: "pink",
    },
    {
      code: "NX-15",
      name: "Script Optimization",
      path: "/learn/nextjs/nx15-scripts",
      desc: "next/script for third-party scripts",
      color: "pink",
    },
    {
      code: "NX-16",
      name: "Static Generation (SSG)",
      path: "/learn/nextjs/nx16-ssg",
      desc: "Pre-render at build time, generateStaticParams",
      color: "pink",
    },
    {
      code: "NX-17",
      name: "Incremental Static Regeneration (ISR)",
      path: "/learn/nextjs/nx17-isr",
      desc: "Revalidate specific pages at intervals",
      color: "pink",
    },
    {
      code: "NX-18",
      name: "On-Demand Revalidation",
      path: "/learn/nextjs/nx18-on-demand-revalidate",
      desc: "Manually trigger cache invalidation from API routes",
      color: "pink",
    },
    {
      code: "NX-19",
      name: "Caching Strategies",
      path: "/learn/nextjs/nx19-caching",
      desc: "request memoization, data cache, full route cache",
      color: "pink",
    },
    {
      code: "NX-20",
      name: "Environment Variables",
      path: "/learn/nextjs/nx20-env",
      desc: "NEXT_PUBLIC_, server-only vars, .env files",
      color: "pink",
    },
  ];

  const FeatureCard = ({
    code,
    name,
    path,
    desc,
    color = "purple",
  }: {
    code: string;
    name: string;
    path: string;
    desc: string;
    color?: string;
  }) => (
    <Link
      href={path}
      className="group relative block p-6 glass-card rounded-2xl hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-${color}-500/10 text-${color}-600`}>
            {code}
          </span>
        </div>
        <h3 className="font-display font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      </div>
      <div className={`absolute bottom-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0 translate-x-4`}>
        <svg className={`w-5 h-5 text-${color}-500`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
      </div>
    </Link>
  );

  return (
    <>
      <Nav />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-20">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors mb-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            Back to Learning Paths
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">
                Next.js <span className="text-purple-600">14+</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Master the world's most popular React framework. From basic routing
                to advanced rendering strategies and performance optimizations.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-100 px-4 py-2 rounded-full">
              <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
              Progress: 0 / 20 Complete
            </div>
          </div>
        </div>

        {/* Basics */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-display text-2xl font-bold text-slate-900">
              Foundations
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-200 to-transparent" />
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full uppercase tracking-widest">NX-01 to NX-06</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {basics.map((f) => (
              <FeatureCard key={f.code} {...f} />
            ))}
          </div>
        </section>

        {/* Intermediate */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-display text-2xl font-bold text-slate-900">
              Intermediate
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-orange-200 to-transparent" />
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-widest">NX-07 to NX-12</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intermediate.map((f) => (
              <FeatureCard key={f.code} {...f} />
            ))}
          </div>
        </section>

        {/* Advanced */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-display text-2xl font-bold text-slate-900">
              Advanced Performance
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-pink-200 to-transparent" />
            <span className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full uppercase tracking-widest">NX-13 to NX-20</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advanced.map((f) => (
              <FeatureCard key={f.code} {...f} />
            ))}
          </div>
        </section>

        <div className="relative group overflow-hidden rounded-3xl bg-slate-900 p-8 sm:p-12 text-white shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h3 className="text-display text-2xl font-bold mb-4">Production-Ready Lessons</h3>
              <p className="text-slate-400 leading-relaxed mb-8 max-w-xl">
                Learn how to build scalable, high-performance applications that follow
                official Next.js recommendations and industry best practices.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-bold">
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-slate-400 font-medium">Full-Stack Roadmap</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-3xl bg-white dark:bg-slate-900/50 dark:bg-slate-900/50/10 backdrop-blur flex items-center justify-center border border-white/20">
                <svg className="w-12 h-12 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
            </div>
          </div>
          <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl group-hover:bg-purple-500/20 transition-colors duration-500" />
        </div>
      </div>
    </>
  );
}

