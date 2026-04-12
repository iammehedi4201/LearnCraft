/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * P-01 — Paginated Queries
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * TANSTACK QUERY CONCEPT: Paginated queries use page parameters in queryKey
 * and queryFn. When page changes, a new query is created, fetching next/prev data.
 * Each page's data is cached independently under different keys.
 *
 * HOW IT WORKS: queryKey includes page: ["posts", { page: 1 }]. Changing page
 * creates ["posts", { page: 2 }] — a different cache entry. TanStack Query
 * manages each page independently. Old pages stay cached until gcTime expires.
 *
 * NEXT.JS CONCEPT: This page demonstrates synchronizing URL/state with data fetching
 * in a client component. In real apps, you'd use searchParams or dynamic routes.
 *
 * WHEN TO USE: Traditional pagination with prev/next buttons or page numbers.
 * Not for infinite scroll (use P-03 useInfiniteQuery for that).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPaginatedPosts, Post } from "@/lib/api";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function P01Paginated(): JSX.Element {
  const [page, setPage] = useState(1);

  const postsQuery = useQuery({
    queryKey: ["posts", { page, limit: 10 }],
    queryFn: () => fetchPaginatedPosts(page, 10),
  });

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="P-01"
          featureName="Paginated Queries"
          tanstackConcept="Paginated queries include page parameters in the queryKey. Each page is cached independently. Changing page triggers a new query with a different key, fetching data for that page."
          howItWorks="When page changes, queryKey changes from ['posts', {page:1}] to ['posts', {page:2}]. TanStack Query sees a different key, checks cache (creates new entry if missing), and fetches if needed. Each page's data is cached separately."
          nextjsConcept="This component manages local page state with useState. In real Next.js apps, use searchParams or URL patterns like /posts?page=2 to make pagination bookmark/shareable."
          whenToUse="Use paginated queries for traditional pagination with page buttons. Not for infinite scroll (use useInfiniteQuery). Good for tables, search results, admin dashboards."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Paginated Posts (10 per page)
          </h2>

          {/* Status */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-white rounded border border-gray-200">
              <p className="text-xs text-gray-600">Current Page</p>
              <p className="font-bold text-2xl text-blue-600">{page}</p>
            </div>
            <div className="p-4 bg-white rounded border border-gray-200">
              <p className="text-xs text-gray-600">Items This Page</p>
              <p className="font-bold text-2xl">{postsQuery.data?.items.length || 0}</p>
            </div>
            <div className="p-4 bg-white rounded border border-gray-200">
              <p className="text-xs text-gray-600">Total Pages</p>
              <p className="font-bold text-2xl">{postsQuery.data?.totalPages || 0}</p>
            </div>
          </div>

          {/* Posts */}
          {postsQuery.isLoading && <p className="text-blue-600">🔄 Loading...</p>}

          {postsQuery.data && (
            <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
              {postsQuery.data.items.map((post: Post) => (
                <div key={post.id} className="p-4 bg-white rounded border border-gray-200">
                  <h4 className="font-semibold text-gray-900">#{post.id}: {post.title}</h4>
                  <p className="text-gray-700 text-sm mt-1">{post.body}</p>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-between items-center gap-4 p-4 bg-white rounded border border-gray-200">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || postsQuery.isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <div className="flex gap-2">
              {Array.from({ length: Math.min(5, postsQuery.data?.totalPages || 0) }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    page === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!postsQuery.data || page >= postsQuery.data.totalPages || postsQuery.isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-900">
              <strong>💡 Tip:</strong> Each page is cached separately. Click back to page 1,
              then forward to page 2 — it loads instantly because page 1 is still cached!
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Implementation Pattern
          </h2>

          <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const [page, setPage] = useState(1);

const postsQuery = useQuery({
  queryKey: ["posts", { page, limit: 10 }], // Page in key!
  queryFn: () => fetchPaginatedPosts(page, 10),
});

// Each page variation creates a separate cache entry
// ["posts", { page: 1 }]
// ["posts", { page: 2 }]
// Everything cached independently`}
          </pre>
        </section>

        <section className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-900">
            Next: <strong>P-02 — keepPreviousData</strong> to eliminate loading flicker between pages!
          </p>
        </section>
      </div>
    </>
  );
}
