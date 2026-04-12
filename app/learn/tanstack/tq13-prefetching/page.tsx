/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TQ-13 — Prefetching
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * TANSTACK QUERY CONCEPT: Prefetching loads data into cache before it's needed.
 * Useful on hover: when user hovers over a link, prefetch the data behind it.
 * When clicked, data is instant.
 *
 * HOW IT WORKS: queryClient.prefetchQuery() executes a query and stores result
 * in cache, but doesn't mount a component. Later, when useQuery uses same key,
 * data is already cached.
 *
 * WHEN TO USE: Hover over links/buttons, on route navigation, lazy-load details.
 * Dramatically improves perceived performance.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser, fetchPostsByUser, User } from "@/lib/api";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function TQ13Prefetching(): JSX.Element {
  const queryClient = useQueryClient();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const userQuery = useQuery({
    queryKey: ["users", selectedUserId ?? 0],
    queryFn: () => fetchUser(selectedUserId!),
    enabled: selectedUserId !== null,
  });

  const postsQuery = useQuery({
    queryKey: ["posts", "user", selectedUserId ?? 0],
    queryFn: () => fetchPostsByUser(selectedUserId!),
    enabled: selectedUserId !== null,
  });

  const handlePrefetch = (userId: number) => {
    queryClient.prefetchQuery({
      queryKey: ["users", userId],
      queryFn: () => fetchUser(userId),
    });
  };

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="TQ-13"
          featureName="Prefetching"
          tanstackConcept="Prefetching loads data into cache before it's needed. When user hovers a link, prefetch the data. On click, data is instant. Uses queryClient.prefetchQuery()."
          howItWorks="prefetchQuery() runs a query and stores the result in cache. No component mounts. Later, when useQuery uses the same key, data is already cached and ready."
          nextjsConcept="Client-side performance optimization. In Next.js with App Router, you can prefetch on hover or use Link prefetch prop for route transitions."
          whenToUse="Prefetch on hover, during route navigation, or before user actions. Improves perceived performance dramatically. Best for operations likely to happen next."
        />

        <section className="mt-12">
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4">Select a User (Hover to Prefetch)</h3>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5].map((id) => (
                <button
                  key={id}
                  onClick={() => setSelectedUserId(id)}
                  onMouseEnter={() => handlePrefetch(id)}
                  className={`px-4 py-2 rounded font-medium ${
                    selectedUserId === id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  User {id}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-3">
              💡 Hover over a button to prefetch that user's data, then click for instant load!
            </p>
          </div>

          {/* Results */}
          {selectedUserId && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-white rounded border">
                <h4 className="font-semibold mb-3">User Info</h4>
                {userQuery.isLoading ? (
                  <p className="text-blue-600">🔄 Loading...</p>
                ) : userQuery.data ? (
                  <div className="text-sm space-y-1">
                    <p><strong>{(userQuery.data as User).name}</strong></p>
                    <p className="text-gray-600">{(userQuery.data as User).email}</p>
                  </div>
                ) : null}
              </div>

              <div className="p-4 bg-white rounded border">
                <h4 className="font-semibold mb-3">Posts</h4>
                {postsQuery.isLoading ? (
                  <p className="text-blue-600">🔄 Loading...</p>
                ) : postsQuery.data ? (
                  <p className="text-sm">
                    {postsQuery.data.length} posts by this user
                  </p>
                ) : null}
              </div>
            </div>
          )}
        </section>

        <section className="mt-12">
          <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const handlePrefetch = (userId: number) => {
  queryClient.prefetchQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUser(userId),
  });
};

// On button hover, call handlePrefetch(userId)
// Data is cached before user clicks
// When they click, useQuery finds data in cache — instant!`}
          </pre>
        </section>
      </div>
    </>
  );
}
