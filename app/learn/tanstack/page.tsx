"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";

export default function TanStackHub(): JSX.Element {
  const foundations = [
    {
      code: "TQ-01",
      name: "Setup & Configuration",
      path: "/learn/tanstack/tq01-setup",
      desc: "Install TanStack Query, configure QueryClient, add React Query Devtools",
      color: "blue",
    },
    {
      code: "TQ-02",
      name: "useQuery Basics",
      path: "/learn/tanstack/tq02-use-query",
      desc: "Fetch data, handle loading/error/success states, understand query lifecycle",
      color: "blue",
    },
    {
      code: "TQ-03",
      name: "Query Keys & Caching",
      path: "/learn/tanstack/tq03-queries-keys",
      desc: "Query key structure, cache organization, automatic cache keying",
      color: "blue",
    },
    {
      code: "TQ-04",
      name: "staleTime & gcTime",
      path: "/learn/tanstack/tq04-staletime-gctime",
      desc: "Control when data is considered fresh and how long cache persists",
      color: "blue",
    },
    {
      code: "TQ-05",
      name: "Dependent Queries",
      path: "/learn/tanstack/tq05-dependent",
      desc: "Chain queries where one depends on data from another",
      color: "blue",
    },
    {
      code: "TQ-06",
      name: "Parallel Queries",
      path: "/learn/tanstack/tq06-parallel",
      desc: "Fetch multiple independent resources simultaneously",
      color: "blue",
    },
  ];

  const intermediate = [
    {
      code: "TQ-07",
      name: "useMutation Basics",
      path: "/learn/tanstack/tq07-mutation-basics",
      desc: "POST/PUT/DELETE requests with loading/error feedback",
      color: "indigo",
    },
    {
      code: "TQ-08",
      name: "Optimistic Updates",
      path: "/learn/tanstack/tq08-optimistic",
      desc: "Update UI immediately, roll back if server rejects",
      color: "indigo",
    },
    {
      code: "TQ-09",
      name: "Query Invalidation",
      path: "/learn/tanstack/tq09-invalidation",
      desc: "Keep cache in sync by invalidating queries after mutations",
      color: "indigo",
    },
    {
      code: "TQ-10",
      name: "Traditional Pagination",
      path: "/learn/tanstack/tq10-pagination",
      desc: "useQuery with page parameters and next/prev navigation",
      color: "indigo",
    },
    {
      code: "TQ-11",
      name: "Placeholder Data",
      path: "/learn/tanstack/tq11-placeholder-data",
      desc: "No loading flicker between page transitions with placeholderData",
      color: "indigo",
    },
    {
      code: "TQ-12",
      name: "useInfiniteQuery",
      path: "/learn/tanstack/tq12-infinite",
      desc: "Infinite scroll with automatic pagination",
      color: "indigo",
    },
  ];

  const advanced = [
    {
      code: "TQ-13",
      name: "Prefetching",
      path: "/learn/tanstack/tq13-prefetching",
      desc: "Prefetch queries on hover or on server for instant loads",
      color: "pink",
    },
    {
      code: "TQ-14",
      name: "Select Transform",
      path: "/learn/tanstack/tq14-select",
      desc: "Transform server data inside useQuery with select()",
      color: "pink",
    },
    {
      code: "TQ-15",
      name: "Enabled Flag",
      path: "/learn/tanstack/tq15-enabled",
      desc: "Conditionally pause or skip queries based on state",
      color: "pink",
    },
    {
      code: "TQ-16",
      name: "Polling & Refetch Intervals",
      path: "/learn/tanstack/tq16-polling",
      desc: "Auto-refresh data at intervals for live dashboards",
      color: "pink",
    },
    {
      code: "TQ-17",
      name: "Global Error Handling",
      path: "/learn/tanstack/tq17-error-handling",
      desc: "QueryClient defaults and error boundaries",
      color: "pink",
    },
    {
      code: "TQ-18",
      name: "Request Cancellation",
      path: "/learn/tanstack/tq18-cancellation",
      desc: "AbortSignal to cancel in-flight requests",
      color: "pink",
    },
    {
      code: "TQ-19",
      name: "Complex Mutations",
      path: "/learn/tanstack/tq19-mutations",
      desc: "Multi-step mutations with onMutate, onError, onSuccess",
      color: "pink",
    },
    {
      code: "TQ-20",
      name: "Custom Hooks",
      path: "/learn/tanstack/tq20-custom-hooks",
      desc: "Extract queries/mutations into reusable useXxx() hooks",
      color: "pink",
    },
    {
      code: "TQ-21",
      name: "Suspense Integration",
      path: "/learn/tanstack/tq21-suspense",
      desc: "Use useSuspenseQuery with React Suspense boundaries",
      color: "pink",
    },
    {
      code: "TQ-22",
      name: "SSR & Hydration",
      path: "/learn/tanstack/tq22-ssr",
      desc: "Server-side rendering with HydrationBoundary",
      color: "pink",
    },
  ];

  const FeatureCard = ({
    code,
    name,
    path,
    desc,
    color = "blue",
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
        <h3 className="font-display font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
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
              <h1 className="text-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
                TanStack Query <span className="text-blue-600 dark:text-blue-400">v5</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                22 comprehensive lessons taking you from absolute foundations
                to advanced production patterns and server-side integration.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-100 px-4 py-2 rounded-full">
              <div className="h-2 w-2 rounded-full bg-green-50 dark:bg-green-950/20 dark:bg-green-950/200 animate-pulse" />
              Progress: 0 / 22 Complete
            </div>
          </div>
        </div>

        {/* Foundations */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-display text-2xl font-bold text-slate-900 dark:text-white">
              Foundations
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-200 dark:from-blue-900/50 to-transparent" />
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full uppercase tracking-widest">TQ-01 to TQ-06</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foundations.map((f) => (
              <FeatureCard key={f.code} {...f} />
            ))}
          </div>
        </section>

        {/* Intermediate */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-display text-2xl font-bold text-slate-900 dark:text-white">
              Intermediate
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-indigo-200 dark:from-indigo-900/50 to-transparent" />
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full uppercase tracking-widest">TQ-07 to TQ-12</span>
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
            <h2 className="text-display text-2xl font-bold text-slate-900 dark:text-white">
              Advanced Patterns
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-pink-200 dark:from-pink-900/50 to-transparent" />
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20 px-3 py-1 rounded-full uppercase tracking-widest">TQ-13 to TQ-22</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advanced.map((f) => (
              <FeatureCard key={f.code} {...f} />
            ))}
          </div>
        </section>

        <div className="relative group overflow-hidden rounded-3xl bg-blue-900 p-8 sm:p-12 text-white shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h3 className="text-display text-2xl font-bold mb-4">Deep Dive Documentation</h3>
              <p className="text-blue-100 leading-relaxed mb-8 max-w-xl">
                Each feature includes code-level annotations, conceptual breakdowns, and working
                interactive sandboxes to test your knowledge in real scenarios.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-blue-900 bg-blue-800 flex items-center justify-center text-xs font-bold">
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-blue-200 font-medium">3-Step Learning Process</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-3xl bg-white dark:bg-slate-900/50 dark:bg-slate-900/50/10 backdrop-blur flex items-center justify-center border border-white/20">
                <svg className="w-12 h-12 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /><path d="M8 6h10" /><path d="M8 10h10" /><path d="M8 14h10" /></svg>
              </div>
            </div>
          </div>
          <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500" />
        </div>
      </div>
    </>
  );
}

