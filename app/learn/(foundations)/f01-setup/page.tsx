/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * F-01 — Project Setup
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * TANSTACK QUERY CONCEPT
 * ─────────────────────
 * This page documents how to set up TanStack Query in a Next.js 14+ project.
 * The key is wrapping your app with QueryClientProvider and configuring the
 * QueryClient with sensible defaults. DevTools help you inspect queries,
 * mutations, cache, and network activity in real-time.
 *
 * HOW IT WORKS UNDER THE HOOD
 * ────────────────────────────
 * QueryClientProvider uses React Context to inject a QueryClient instance
 * throughout your component tree. All useQuery and useMutation hooks
 * automatically find this client via context. DevTools attaches listeners
 * to every query/mutation event to display debugging information.
 *
 * NEXT.JS CONCEPT
 * ───────────────
 * The root layout.tsx marks "use client" and wraps the app with QueryClientProvider.
 * This creates the client boundary where React hooks and Context work. Pages
 * under this layout inherit the QueryClient context automatically.
 *
 * WHEN TO USE THIS
 * ────────────────
 * Do this setup once at the root of any Next.js + TanStack Query project.
 * It's the prerequisite for all other features.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function F01Setup(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="F-01"
          featureName="Project Setup"
          tanstackConcept="TanStack Query (React Query v5) is installed via npm and requires wrapping your app with QueryClientProvider. This provider makes the QueryClient instance available via React Context to all child components."
          howItWorks="The QueryClientProvider is a React Context provider at the root of your app. When you create a QueryClient, you pass it an object of DefaultOptions that define staleTime, gcTime, retry logic, etc. All hooks like useQuery and useMutation automatically get this client from Context."
          nextjsConcept="In Next.js 14 with the App Router, the root layout is a Server Component by default. To use React Context and Client-side hooks (like useQuery), the root layout must be marked 'use client', creating a client boundary."
          whenToUse="Set this up once at the very beginning of your Next.js + TanStack Query project. It's a one-time configuration that enables all other features."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white dark:text-white">
            Setup Checklist
          </h2>

          <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 dark:border-slate-800 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200 dark:text-slate-200">
              1. Install Dependencies
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
{`npm install @tanstack/react-query @tanstack/react-query-devtools`}
            </pre>
          </div>

          <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 dark:border-slate-800 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200 dark:text-slate-200">
              2. Create QueryClient Config
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`// lib/query-client.ts
import { QueryClient, DefaultOptions } from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
  queries: {
    staleTime: 0,
    gcTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: true,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});`}
            </pre>
          </div>

          <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 dark:border-slate-800 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200 dark:text-slate-200">
              3. Wrap Root Layout with QueryClientProvider
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`// app/layout.tsx
"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/query-client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}`}
            </pre>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 dark:bg-green-950/20 border-l-4 border-green-500 p-6 rounded">
            <h3 className="font-semibold text-lg mb-3 text-green-900 dark:text-green-400 dark:text-green-400">
              ✓ You're Done!
            </h3>
            <p className="text-green-800 dark:text-green-300 dark:text-green-300 mb-3">
              Your app is now set up to use TanStack Query. Every page and component
              can now use useQuery, useMutation, and other hooks.
            </p>
            <p className="text-green-800 dark:text-green-300 dark:text-green-300 text-sm">
              <strong>Tip:</strong> Open React Query Devtools (lower right corner) and navigate
              to other features — you'll see queries being added to the cache in real-time!
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 dark:bg-blue-950/20 border-l-4 border-blue-500 p-6 rounded mt-6">
            <h3 className="font-semibold text-lg mb-3 text-blue-900 dark:text-blue-400 dark:text-blue-400">
              Key Config Options Explained
            </h3>
            <ul className="space-y-3 text-blue-900 dark:text-blue-400 dark:text-blue-400 text-sm">
              <li>
                <strong>staleTime (0ms):</strong> How long until fetched data is considered "stale" and needs refetching. 0 means immediately.
              </li>
              <li>
                <strong>gcTime (5 minutes):</strong> How long to keep unused queries in memory before deleting them. (formerly cacheTime)
              </li>
              <li>
                <strong>retry (1):</strong> How many times to retry a failed request before showing an error.
              </li>
              <li>
                <strong>refetchOnWindowFocus (true):</strong> Refetch data when the user returns to the browser tab.
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-950/20 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/50 dark:border-yellow-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-yellow-900 dark:text-yellow-400 dark:text-yellow-400">
            📝 Next Step
          </h3>
          <p className="text-yellow-900 dark:text-yellow-400 dark:text-yellow-400">
            Now that your project is set up, move to <strong>F-02 — useQuery Basics</strong> to learn how to fetch data!
          </p>
        </section>
      </div>
    </>
  );
}
