/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TQ-11 — keepPreviousData (placeholderData)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * TANSTACK QUERY CONCEPT: placeholderData (formerly keepPreviousData) shows
 * the previous page's data while fetching the next page. Eliminates loading
 * flicker, providing smooth pagination UX.
 *
 * HOW IT WORKS: When queryKey changes, TanStack Query fetches new data. But
 * until it arrives, placeholderData returns the old data. User sees prev page
 * briefly, then new page appears. Much better UX than empty loading state.
 *
 * NEXT.JS CONCEPT: Smooth client-side transitions. Alternatives in Next.js:
 * useTransition hook or Suspense boundaries for more controlled loading states.
 *
 * WHEN TO USE: Always use placeholderData for pagination to avoid jarring
 * loading states. Also useful for searchable lists, sortable tables.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPaginatedPosts, Post } from "@/lib/api";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function TQ11PlaceholderData(): JSX.Element {
  const [page, setPage] = useState(1);

  const postsQuery = useQuery({
    queryKey: ["posts", { page, limit: 10, keepPrev: true }],
    queryFn: () => fetchPaginatedPosts(page, 10),
    placeholderData: (previousData) => previousData, // Keep old data while fetching new
  });

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="TQ-11"
          featureName="keepPreviousData"
          tanstackConcept="placeholderData keeps the previous page's data visible while fetching the next page. No loading spinner flicker — user sees smooth transition from old data to new."
          howItWorks="When queryKey changes, TanStack Query normally returns undefined until new data arrives. With placeholderData, it returns the old data. User sees prev page content, then new content appears when ready."
          nextjsConcept="Client-side loading optimization. In Next.js, similar to useTransition hook which tracks pending navigations. This pattern enhances perceived performance."
          whenToUse="Use placeholderData for all paginated/searchable/sorted lists. Provides seamless UX. Shows user something familiar while new data loads."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Smooth Pagination (No Flicker)
          </h2>

          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-white rounded border">
              <p className="text-xs text-gray-600">Current Page</p>
              <p className="font-bold text-2xl">{page}</p>
            </div>
            <div className="p-4 bg-white rounded border">
              <p className="text-xs text-gray-600">Status</p>
              <p className="font-bold">{postsQuery.isPending ? "🔄" : "✓"}</p>
            </div>
            <div className="p-4 bg-white rounded border">
              <p className="text-xs text-gray-600">Is Refetching</p>
              <p className="font-bold">{postsQuery.isRefetching ? "Yes" : "No"}</p>
            </div>
            <div className="p-4 bg-white rounded border">
              <p className="text-xs text-gray-600">Items</p>
              <p className="font-bold">{postsQuery.data?.items.length || 0}</p>
            </div>
          </div>

          {/* Posts — shows placeholder data while loading */}
          {postsQuery.data && (
            <div className={`space-y-3 mb-6 max-h-80 overflow-y-auto ${postsQuery.isRefetching ? "opacity-60" : ""}`}>
              {postsQuery.data.items.map((post: Post) => (
                <div key={post.id} className="p-4 bg-white rounded border border-gray-200">
                  <h4 className="font-semibold text-gray-900">#{post.id}: {post.title}</h4>
                  <p className="text-gray-700 text-sm mt-1">{post.body}</p>
                </div>
              ))}
              {postsQuery.isRefetching && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded text-center text-blue-600">
                  🔄 Fetching page {page}...
                </div>
              )}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-between gap-4 p-4 bg-white rounded border">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Next
            </button>
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
            <p className="text-sm text-green-900">
              <strong>✨ Notice the difference:</strong> When you click a page button,
              you see the old page briefly (with 60% opacity), then the new page appears.
              No jarring empty state! This is placeholderData at work.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Implementation</h2>
          <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`// With placeholderData: smooth transition
const query = useQuery({
  queryKey: ["posts", { page }],
  queryFn: () => fetchPosts(page),
  placeholderData: (previousData) => previousData, // Keep old data
});

// Without placeholderData: loading flicker
// While fetching new page, data becomes undefined`}
          </pre>
        </section>

        <section className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-900">Next: <strong>P-03 — useInfiniteQuery</strong> for infinite scroll!</p>
        </section>
      </div>
    </>
  );
}
