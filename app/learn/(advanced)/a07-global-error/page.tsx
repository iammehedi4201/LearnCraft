/**
 * A-07 — Global Error Handling
 * QueryClient default error handlers.
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/api";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function A07GlobalError(): JSX.Element {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="A-07"
          featureName="Global Error Handling"
          tanstackConcept="Set default error handler on QueryClient. All queries/mutations use it unless overridden. Centralized error logging, toasts, retries."
          howItWorks="QueryClient constructor takes defaultOptions with queryErrorResetBoundary. Set onError in default mutations. When error occurs, handler called automatically."
          nextjsConcept="Global error handling pattern. In Next.js, combine with Error boundary for component-level recovery."
          whenToUse="Log all errors, show toast notifications, auto-retry, redirect to error page. Keep as fallback; override at component level if needed."
        />

        <section className="mt-12">
          <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 p-6 rounded-lg border">
            <h3 className="font-semibold text-lg mb-4">Global Error Handling</h3>
            {postsQuery.isLoading && <p className="text-blue-600 dark:text-blue-400 dark:text-blue-400">🔄 Loading...</p>}
            {postsQuery.error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded">
                <p className="text-red-900 font-semibold">Error handled globally!</p>
                <p className="text-red-800 text-sm">
                  Check lib/query-client.ts for default onError handler.
                </p>
              </div>
            )}
            {postsQuery.data && (
              <p className="text-green-600">✓ Loaded {postsQuery.data.length} posts</p>
            )}
          </div>

          <pre className="mt-6 bg-gray-900 text-white p-4 rounded overflow-x-auto text-xs">
{`// lib/query-client.ts
const defaultOptions = {
  queries: {
    onError: (error) => {
      console.error('Query error:', error);
      // Show toast notification
      // Log to error tracking service
    },
  },
  mutations: {
    onError: (error) => {
      console.error('Mutation error:', error);
    },
  },
};

export const queryClient = new QueryClient({
  defaultOptions,
});

// Individual queries can override:
useQuery({
  queryKey: ['data'],
  queryFn: () => fetch(),
  onError: (error) => {
    // Custom handling for this query only
  },
});`}
          </pre>
        </section>
      </div>
    </>
  );
}
