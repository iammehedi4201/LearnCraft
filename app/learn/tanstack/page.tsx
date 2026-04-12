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
    },
    {
      code: "TQ-02",
      name: "useQuery Basics",
      path: "/learn/tanstack/tq02-use-query",
      desc: "Fetch data, handle loading/error/success states, understand query lifecycle",
    },
    {
      code: "TQ-03",
      name: "Query Keys & Caching",
      path: "/learn/tanstack/tq03-queries-keys",
      desc: "Query key structure, cache organization, automatic cache keying",
    },
    {
      code: "TQ-04",
      name: "staleTime & gcTime",
      path: "/learn/tanstack/tq04-staletime-gctime",
      desc: "Control when data is considered fresh and how long cache persists",
    },
    {
      code: "TQ-05",
      name: "Dependent Queries",
      path: "/learn/tanstack/tq05-dependent",
      desc: "Chain queries where one depends on data from another",
    },
    {
      code: "TQ-06",
      name: "Parallel Queries",
      path: "/learn/tanstack/tq06-parallel",
      desc: "Fetch multiple independent resources simultaneously",
    },
  ];

  const intermediate = [
    {
      code: "TQ-07",
      name: "useMutation Basics",
      path: "/learn/tanstack/tq07-mutation-basics",
      desc: "POST/PUT/DELETE requests with loading/error feedback",
    },
    {
      code: "TQ-08",
      name: "Optimistic Updates",
      path: "/learn/tanstack/tq08-optimistic",
      desc: "Update UI immediately, roll back if server rejects",
    },
    {
      code: "TQ-09",
      name: "Query Invalidation",
      path: "/learn/tanstack/tq09-invalidation",
      desc: "Keep cache in sync by invalidating queries after mutations",
    },
    {
      code: "TQ-10",
      name: "Traditional Pagination",
      path: "/learn/tanstack/tq10-pagination",
      desc: "useQuery with page parameters and next/prev navigation",
    },
    {
      code: "TQ-11",
      name: "Placeholder Data",
      path: "/learn/tanstack/tq11-placeholder-data",
      desc: "No loading flicker between page transitions with placeholderData",
    },
    {
      code: "TQ-12",
      name: "useInfiniteQuery",
      path: "/learn/tanstack/tq12-infinite",
      desc: "Infinite scroll with automatic pagination",
    },
  ];

  const advanced = [
    {
      code: "TQ-13",
      name: "Prefetching",
      path: "/learn/tanstack/tq13-prefetching",
      desc: "Prefetch queries on hover or on server for instant loads",
    },
    {
      code: "TQ-14",
      name: "Select Transform",
      path: "/learn/tanstack/tq14-select",
      desc: "Transform server data inside useQuery with select()",
    },
    {
      code: "TQ-15",
      name: "Enabled Flag",
      path: "/learn/tanstack/tq15-enabled",
      desc: "Conditionally pause or skip queries based on state",
    },
    {
      code: "TQ-16",
      name: "Polling & Refetch Intervals",
      path: "/learn/tanstack/tq16-polling",
      desc: "Auto-refresh data at intervals for live dashboards",
    },
    {
      code: "TQ-17",
      name: "Global Error Handling",
      path: "/learn/tanstack/tq17-error-handling",
      desc: "QueryClient defaults and error boundaries",
    },
    {
      code: "TQ-18",
      name: "Request Cancellation",
      path: "/learn/tanstack/tq18-cancellation",
      desc: "AbortSignal to cancel in-flight requests",
    },
    {
      code: "TQ-19",
      name: "Complex Mutations",
      path: "/learn/tanstack/tq19-mutations",
      desc: "Multi-step mutations with onMutate, onError, onSuccess",
    },
    {
      code: "TQ-20",
      name: "Custom Hooks",
      path: "/learn/tanstack/tq20-custom-hooks",
      desc: "Extract queries/mutations into reusable useXxx() hooks",
    },
    {
      code: "TQ-21",
      name: "Suspense Integration",
      path: "/learn/tanstack/tq21-suspense",
      desc: "Use useSuspenseQuery with React Suspense boundaries",
    },
    {
      code: "TQ-22",
      name: "SSR & Hydration",
      path: "/learn/tanstack/tq22-ssr",
      desc: "Server-side rendering with HydrationBoundary",
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
      className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-300 transition-all"
    >
      <h3 className="font-bold text-blue-600 mb-2">
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
            className="text-blue-600 hover:text-blue-700 mb-6 inline-block"
          >
            ← Back to Learning Paths
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            TanStack Query v5 Learning Path
          </h1>
          <p className="text-lg text-gray-700">
            Master data fetching, caching, mutations, and server state
            management. 22 features organized from foundations to advanced
            patterns.
          </p>
        </div>

        {/* Foundations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-2 border-b-4 border-blue-600">
            🎓 Foundations (TQ-01 to TQ-06)
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foundations.map((f) => (
              <FeatureCard key={f.code} {...f} />
            ))}
          </div>
        </section>

        {/* Intermediate */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-2 border-b-4 border-purple-600">
            ⚡ Intermediate (TQ-07 to TQ-12)
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
            🚀 Advanced (TQ-13 to TQ-22)
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advanced.map((f) => (
              <FeatureCard key={f.code} {...f} />
            ))}
          </div>
        </section>

        <div className="bg-blue-50 rounded-lg p-8 border border-blue-200 mb-12">
          <h3 className="font-bold text-lg text-gray-900 mb-4">💡 Note</h3>
          <p className="text-gray-700">
            Each feature has a dedicated page with concept explanation, how it
            works breakdown, and interactive examples. All examples use real API
            calls to JSONPlaceholder. Start with foundations and progress
            through intermediate and advanced features.
          </p>
        </div>
      </div>
    </>
  );
}
