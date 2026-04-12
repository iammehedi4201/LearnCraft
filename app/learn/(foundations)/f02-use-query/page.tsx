/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * F-02 — useQuery Basics
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * TANSTACK QUERY CONCEPT
 * ─────────────────────
 * useQuery is the foundation hook for fetching data. It takes a query key
 * (for caching) and a query function (that fetches data). It returns an
 * object with isLoading, error, data, and status. The query automatically
 * manages loading states, caching, refetching, and error handling.
 *
 * HOW IT WORKS UNDER THE HOOD
 * ────────────────────────────
 * When useQuery first mounts, it calls the query function. While fetching,
 * isLoading is true. When data returns, it's stored in cache under the query key.
 * On remount, if data is fresh (within staleTime), the cached version is returned
 * instantly. If stale, useQuery refetches in the background. Errors are stored
 * separately. The hook subscribes to cache updates and re-renders when data changes.
 *
 * NEXT.JS CONCEPT
 * ───────────────
 * This is a client component (marked "use client") because it uses React hooks.
 * Each page feature is its own route under the learn hub, using Next.js's file-based
 * routing. The component is interactive and handles real-time state updates.
 *
 * WHEN TO USE THIS
 * ────────────────
 * Use useQuery for any GET request: fetching a list of items, single item details,
 * search results, or any read-only data. It's the workhorse of async data fetching.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPosts, Post } from "@/lib/api";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function F02UseQuery(): JSX.Element {
  // Basic useQuery example: fetch a list of posts
  const {
    data: posts,
    isLoading,
    error,
    status,
  } = useQuery({
    queryKey: ["posts"], // Cache key: if this is the same on another component, it shares cache
    queryFn: () => fetchPosts(), // Function that does the actual fetching
    // staleTime: 0, // Can override defaults here — currently inherits from QueryClient
  });

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="F-02"
          featureName="useQuery Basics"
          tanstackConcept="useQuery is the core hook for fetching data. You provide it a queryKey (unique identifier for caching) and a queryFn (async function that fetches data). It returns an object with data, isLoading, error, and status properties that you use to render UI."
          howItWorks="useQuery executes queryFn on mount, caching the result under queryKey. While fetching, isLoading is true. Once data arrives, it's stored and isLoading becomes false. On remount, if data is fresh, the cached version is used. If stale (beyond staleTime), it refetches in the background. The hook re-renders whenever cache updates."
          nextjsConcept="This page is a client component (marked 'use client') because it uses React hooks. In Next.js 14, Server Components are the default, so we explicitly opt into client-side interactivity here."
          whenToUse="Use useQuery for every GET request: lists, details, search, filters, etc. It's the primary hook for reading data in TanStack Query applications."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Live Example: Fetching Posts
          </h2>

          {/* Status Display */}
          <div className="mb-6 p-6 bg-white rounded-lg border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-bold text-lg text-blue-600">{status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Is Loading</p>
                <p className="font-bold text-lg">
                  {isLoading ? "🔄 Yes" : "✓ No"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Posts Count</p>
                <p className="font-bold text-lg">{posts?.length ?? 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Has Error</p>
                <p className="font-bold text-lg">
                  {error ? "❌ Yes" : "✓ No"}
                </p>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded mb-6">
              <p className="text-blue-900 font-semibold">🔄 Loading posts...</p>
              <p className="text-blue-800 text-sm mt-2">
                The query function is being called. Data will appear here soon.
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-6 bg-red-50 border-l-4 border-red-500 rounded mb-6">
              <p className="text-red-900 font-semibold">❌ Error Loading Posts</p>
              <p className="text-red-800 text-sm mt-2">
                {error instanceof Error ? error.message : "An error occurred"}
              </p>
            </div>
          )}

          {/* Success State */}
          {posts && posts.length > 0 && (
            <div className="space-y-4">
              <p className="text-gray-700 font-semibold">
                ✓ Successfully fetched {posts.length} posts:
              </p>
              <div className="grid gap-3 max-h-96 overflow-y-auto">
                {posts.slice(0, 10).map((post: Post) => (
                  <div
                    key={post.id}
                    className="p-4 bg-white border border-gray-200 rounded hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">
                      #{post.id}: {post.title}
                    </h4>
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {post.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 text-xs text-center py-2">
                (Showing 10 of {posts.length} posts — scroll to see more)
              </p>
            </div>
          )}
        </section>

        {/* Code Breakdown */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Code Breakdown
          </h2>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Basic useQuery Call
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const {
  data: posts,       // The fetched data (undefined while loading)
  isLoading,          // true while first fetch is in progress
  error,              // Error object if fetch fails
  status,             // "pending" | "error" | "success"
} = useQuery({
  queryKey: ["posts"],        // Unique key for caching
  queryFn: () => fetchPosts(), // Async function that fetches data
});`}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              What happens under the hood:
            </h3>
            <ol className="space-y-3 text-gray-700">
              <li>
                <strong>1. Component mounts:</strong> useQuery sees data with
                queryKey ["posts"] isn't in cache.
              </li>
              <li>
                <strong>2. Query starts:</strong> isLoading = true, queryFn is
                called.
              </li>
              <li>
                <strong>3. API call:</strong> fetchPosts() runs, hitting JSON
                Placeholder API.
              </li>
              <li>
                <strong>4. Data arrives:</strong> isLoading = false, data is
                stored in cache.
              </li>
              <li>
                <strong>5. Component re-renders:</strong> UI updates with posts.
              </li>
              <li>
                <strong>6. On remount:</strong> Cache is checked. If fresh, use
                cache. If stale, refetch.
              </li>
            </ol>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Query Status Values
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>
                <strong>"pending":</strong> Query hasn't completed yet (first
                load or refetching).
              </li>
              <li>
                <strong>"error":</strong> Query failed. Error is available in
                the error property.
              </li>
              <li>
                <strong>"success":</strong> Query succeeded. Data is available.
              </li>
            </ul>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mt-12 p-6 bg-green-50 border-l-4 border-green-500 rounded">
          <h3 className="font-semibold text-lg mb-3 text-green-900">
            Key Takeaways
          </h3>
          <ul className="space-y-2 text-green-900 text-sm">
            <li>
              ✓ useQuery takes a queryKey (for caching) and queryFn (async function)
            </li>
            <li>
              ✓ It returns data, isLoading, error, and status for rendering UI
            </li>
            <li>
              ✓ Data is automatically cached under the queryKey
            </li>
            <li>
              ✓ On remount, cached data is used if fresh
            </li>
            <li>
              ✓ The hook manages loading/error states automatically
            </li>
          </ul>
        </section>

        <section className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-yellow-900">
            📝 Next Step
          </h3>
          <p className="text-yellow-900">
            Now that you understand useQuery, move to <strong>F-03 — Query Keys</strong> to learn
            how caching works with different keys!
          </p>
        </section>
      </div>
    </>
  );
}
