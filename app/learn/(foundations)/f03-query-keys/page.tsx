/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * F-03 — Query Keys
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * TANSTACK QUERY CONCEPT
 * ─────────────────────
 * Query keys are unique identifiers that TanStack Query uses to cache and
 * manage queries. Two queries with the same queryKey share the same cache.
 * Query keys are usually arrays, with the first element being a string and
 * optional additional elements for parameters (like userId, filters, etc).
 * This hierarchical structure enables powerful cache invalidation patterns.
 *
 * HOW IT WORKS UNDER THE HOOD
 * ────────────────────────────
 * TanStack Query stores data in a cache map where the queryKey is the key.
 * When you call useQuery with queryKey ["posts", { userId: 1 }], it checks
 * if that exact key exists in cache. If not, it fetches. If yes, it checks
 * staleness. Query keys support partial matching: invalidating ["posts", 1]
 * can invalidate all queries starting with ["posts", 1]. This enables smart
 * cache busting after mutations.
 *
 * NEXT.JS CONCEPT
 * ───────────────
 * This page demonstrates interactive state management in a client component.
 * The buttons trigger different queries with different keys, showing how
 * TanStack Query handles multiple independent requests using the same API.
 *
 * WHEN TO USE THIS
 * ────────────────
 * Always structure query keys carefully. Use arrays with hierarchical structure:
 * ["posts"] for all posts, ["posts", { userId: 1 }] for user-specific posts.
 * This enables powerful invalidation: invalidate(["posts"]) clears all post queries.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { queryClient } from "@/lib/query-client";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts, fetchUser, Post, User } from "@/lib/api";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function F03QueryKeys(): JSX.Element {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showCacheInfo, setShowCacheInfo] = useState(false);

  // Query 1: All posts
  const allPostsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  // Query 2: Posts by specific user
  const userPostsQuery = useQuery({
    queryKey: ["posts", { userId: selectedUserId ?? 0 }],
    queryFn: selectedUserId
      ? () =>
          fetchPosts().then((posts) =>
            posts.filter((p) => p.userId === selectedUserId)
          )
      : () => Promise.resolve([]),
    enabled: selectedUserId !== null, // Only run when userId is selected
  });

  // Query 3: User details
  const userQuery = useQuery({
    queryKey: ["users", selectedUserId ?? 0],
    queryFn: selectedUserId ? () => fetchUser(selectedUserId) : () => Promise.reject(),
    enabled: selectedUserId !== null,
  });

  // Helper to display cache state
  const getCacheDebugInfo = () => {
    const cache = queryClient.getQueryCache();
    const queries = cache.getAll();
    return queries.map((q) => ({
      queryKey: q.queryKey,
      state: {
        data: q.state.data ? "✓ Has data" : "✗ No data",
        status: q.state.status,
        dataUpdatedAt: new Date(q.state.dataUpdatedAt).toLocaleTimeString(),
      },
    }));
  };

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="F-03"
          featureName="Query Keys"
          tanstackConcept="Query keys are unique identifiers (usually arrays) that TanStack Query uses to cache and manage requests. Two queries with the same queryKey share cache. Hierarchical structure like ['posts', { userId: 1 }] enables smart cache invalidation."
          howItWorks="TanStack Query stores data in an internal cache map keyed by queryKey. Exact key matches share cache. Partial key matching enables bulk invalidation: invalidate(['posts']) clears all queries starting with 'posts'. The cache persists for the configured gcTime and tracks staleness independently."
          nextjsConcept="This interactive page demonstrates client-side state management with React Query. Buttons trigger different queries, showing how TanStack Query manages multiple independent requests efficiently."
          whenToUse="Always use hierarchical query key structures. ['posts'] for all data, ['posts', { userId: 1 }] for filtered data, ['posts', 1] for a single item. This enables powerful, granular cache invalidation after mutations."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Interactive Example: Query Keys in Action
          </h2>

          {/* Controls */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              1. Select a User (triggers different query key)
            </h3>
            <div className="flex gap-2 flex-wrap mb-4">
              {[1, 2, 3].map((userId) => (
                <button
                  key={userId}
                  onClick={() => setSelectedUserId(userId)}
                  className={`px-4 py-2 rounded font-medium transition-colors ${
                    selectedUserId === userId
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  User {userId}
                </button>
              ))}
              <button
                onClick={() => setSelectedUserId(null)}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  selectedUserId === null
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Clear Selection
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Each button triggers a different query key. Check the React Query Devtools
              (bottom right) to see how queries are cached separately.
            </p>
          </div>

          {/* All Posts Query */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-2 text-gray-800">
              Query Key: ["posts"]
            </h3>
            <p className="text-xs text-gray-600 mb-3 font-mono bg-gray-100 p-2 rounded">
              Fetches ALL posts (no parameters)
            </p>
            {allPostsQuery.status === "pending" ? (
              <p className="text-blue-600">🔄 Loading all posts...</p>
            ) : allPostsQuery.error ? (
              <p className="text-red-600">❌ Error: {allPostsQuery.error.message}</p>
            ) : (
              <p className="text-green-600">
                ✓ Loaded {allPostsQuery.data?.length ?? 0} posts (first 3 shown)
              </p>
            )}
            {allPostsQuery.data && (
              <ul className="mt-3 space-y-1 text-sm text-gray-700">
                {allPostsQuery.data.slice(0, 3).map((post: Post) => (
                  <li key={post.id}>• Post #{post.id}: {post.title}</li>
                ))}
              </ul>
            )}
          </div>

          {/* User Posts Query */}
          {selectedUserId && (
            <div className="bg-white p-6 rounded-lg border border-blue-300 mb-6 border-l-4">
              <h3 className="font-semibold text-lg mb-2 text-gray-800">
                Query Key: ["posts", {"{ userId: " + selectedUserId + " }"}]
              </h3>
              <p className="text-xs text-gray-600 mb-3 font-mono bg-blue-50 p-2 rounded">
                Fetches only posts by User {selectedUserId}
              </p>
              <p className="text-sm text-blue-700 mb-2">
                <strong>Key difference:</strong> This key includes the userId parameter.
                If you select User 1, then User 2, both queries' data stays cached!
              </p>
              {userPostsQuery.status === "pending" ? (
                <p className="text-blue-600">🔄 Loading user posts...</p>
              ) : userPostsQuery.error ? (
                <p className="text-red-600">❌ Error</p>
              ) : (
                <p className="text-green-600">
                  ✓ Found {userPostsQuery.data?.length ?? 0} posts by User {selectedUserId}
                </p>
              )}
              {userPostsQuery.data && userPostsQuery.data.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm text-gray-700">
                  {userPostsQuery.data.slice(0, 5).map((post: Post) => (
                    <li key={post.id}>• Post #{post.id}: {post.title}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* User Details Query */}
          {selectedUserId && (
            <div className="bg-white p-6 rounded-lg border border-purple-300 mb-6 border-l-4">
              <h3 className="font-semibold text-lg mb-2 text-gray-800">
                Query Key: ["users", {selectedUserId}]
              </h3>
              <p className="text-xs text-gray-600 mb-3 font-mono bg-purple-50 p-2 rounded">
                Fetches a single user's details
              </p>
              {userQuery.status === "pending" ? (
                <p className="text-blue-600">🔄 Loading user details...</p>
              ) : userQuery.error ? (
                <p className="text-red-600">❌ Error</p>
              ) : userQuery.data ? (
                <div className="text-gray-700 text-sm">
                  <p>
                    <strong>User:</strong> {(userQuery.data as User).name}
                  </p>
                  <p>
                    <strong>Email:</strong> {(userQuery.data as User).email}
                  </p>
                </div>
              ) : null}
            </div>
          )}

          {/* Cache Debug Info */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <button
              onClick={() => setShowCacheInfo(!showCacheInfo)}
              className="px-4 py-2 bg-gray-800 text-white rounded font-medium hover:bg-gray-900"
            >
              {showCacheInfo ? "Hide" : "Show"} Cache Debug Info
            </button>

            {showCacheInfo && (
              <div className="mt-4">
                <h3 className="font-semibold text-sm mb-3 text-gray-800">
                  Current Queries in Cache:
                </h3>
                <div className="space-y-3 text-sm">
                  {getCacheDebugInfo().map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-gray-100 rounded font-mono text-xs"
                    >
                      <p className="text-gray-800">
                        <strong>Key:</strong> {JSON.stringify(item.queryKey)}
                      </p>
                      <p className="text-gray-800">
                        <strong>Status:</strong> {item.state.status}
                      </p>
                      <p className="text-gray-800">
                        <strong>Data:</strong> {item.state.data}
                      </p>
                      <p className="text-gray-600 text-xs">
                        {item.state.dataUpdatedAt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Code Breakdown */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Understanding Query Keys
          </h2>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Query Key Patterns
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`// Pattern 1: Root level (all items)
queryKey: ["posts"]

// Pattern 2: With parameters (filtered)
queryKey: ["posts", { userId: 1 }]

// Pattern 3: Single item by ID
queryKey: ["posts", 1]

// Pattern 4: Nested hierarchies
queryKey: ["posts", { userId: 1, page: 2, limit: 10 }]

// Pattern 5: Mixed
queryKey: ["users", 5, "posts"]`}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Key Matching & Invalidation
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`// Invalidate EXACT key
await queryClient.invalidateQueries({
  queryKey: ["posts", 1],
});

// Invalidate with partial matching (all posts)
await queryClient.invalidateQueries({
  queryKey: ["posts"],
});

// Invalidate all queries
await queryClient.invalidateQueries();`}
            </pre>
            <p className="text-gray-700 text-sm mt-3">
              This hierarchical structure is powerful: invalidating ["posts"] will
              clear ["posts", 1], ["posts", {"{ userId: 2 }"}], etc. — everything
              under that namespace.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="font-semibold text-lg mb-3 text-blue-900">
              Best Practices
            </h3>
            <ul className="space-y-2 text-blue-900 text-sm">
              <li>
                ✓ Use arrays for query keys (enables partial matching)
              </li>
              <li>
                ✓ Start with a domain name: ["posts"], ["users"], ["comments"]
              </li>
              <li>
                ✓ Add parameters as array elements or objects: ["posts", userId]
              </li>
              <li>
                ✓ Keep keys consistent across your app to enable smart invalidation
              </li>
              <li>
                ✓ Use constants to avoid typos: const POSTS_KEY = ["posts"]
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-yellow-900">
            📝 Next Step
          </h3>
          <p className="text-yellow-900">
            Now that you understand query keys, move to <strong>F-04 — staleTime & gcTime</strong> to learn
            when data refetches!
          </p>
        </section>
      </div>
    </>
  );
}
