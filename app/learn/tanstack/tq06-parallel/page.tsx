/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TQ-06 — Parallel Queries
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * TANSTACK QUERY CONCEPT
 * ─────────────────────
 * Parallel queries are independent queries that fetch data simultaneously without
 * waiting for each other. You simply call multiple useQuery hooks in the same
 * component. TanStack Query automatically manages all of them in parallel, with no
 * extra configuration needed. This is different from dependent queries where B waits for A.
 *
 * HOW IT WORKS UNDER THE HOOD
 * ────────────────────────────
 * Each useQuery call registers itself with the QueryClient independently. The client
 * doesn't block one query for another — they all execute concurrently over the network.
 * TanStack Query manages separate cache entries, staleness, and refetch logic for each.
 * From React's perspective, all three useQuery hooks run, triggering renders as each
 * completes.
 *
 * NEXT.JS CONCEPT
 * ───────────────
 * This page shows how a React/Next.js component can execute multiple independent
 * async operations. In traditional React, you'd use multiple useState + useEffect,
 * but with TanStack Query, it's just multiple hooks with no extra boilerplate.
 *
 * WHEN TO USE THIS
 * ────────────────
 * Use parallel queries whenever you need multiple independent resources: fetching
 * user profile, notifications, and settings at the same time. TanStack Query handles
 * all network requests in parallel, loading all data faster than sequential fetching.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPosts, fetchUsers, fetchComments, Post, User, Comment } from "@/lib/api";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function TQ06Parallel(): JSX.Element {
  // Parallel Query 1: Fetch all posts
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  // Parallel Query 2: Fetch all users
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

  // Parallel Query 3: Fetch all comments
  const commentsQuery = useQuery({
    queryKey: ["comments"],
    queryFn: () => fetchComments(),
  });

  // Calculate combined state
  const isLoading =
    postsQuery.isLoading || usersQuery.isLoading || commentsQuery.isLoading;
  const hasError = postsQuery.error || usersQuery.error || commentsQuery.error;

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="TQ-06"
          featureName="Parallel Queries"
          tanstackConcept="Parallel queries are independent queries that execute simultaneously. You simply call multiple useQuery hooks — TanStack Query automatically manages them all in parallel without any extra configuration or waiting."
          howItWorks="Each useQuery hook registers independently with QueryClient. Network requests for all three queries start immediately and run concurrently. TanStack Query manages separate cache entries, staleness, and re-rendering for each query independently."
          nextjsConcept="In a Server Component world, you might fetch all this data at build time or use dynamic route segments. In a client component (like this), TanStack Query lets you fetch multiple resources in parallel with clean, declarative hooks."
          whenToUse="Use parallel queries to load multiple independent resources faster: dashboard loading profile + stats + notifications simultaneously, or page loading posts + users + comments at once. Much faster than fetching sequentially."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Live Example: Three Parallel Requests
          </h2>

          {/* Overall Status */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Overall Status</p>
              <p className="text-2xl font-bold">
                {isLoading ? (
                  <span className="text-blue-600">🔄 Loading...</span>
                ) : hasError ? (
                  <span className="text-red-600">❌ Error</span>
                ) : (
                  <span className="text-green-600">✓ Complete</span>
                )}
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Queries Completed</p>
              <p className="text-2xl font-bold text-blue-600">
                {[
                  !postsQuery.isLoading ? 1 : 0,
                  !usersQuery.isLoading ? 1 : 0,
                  !commentsQuery.isLoading ? 1 : 0,
                ].reduce((a, b) => a + b, 0)}{" "}
                of 3
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Total Records</p>
              <p className="text-2xl font-bold text-purple-600">
                {(postsQuery.data?.length || 0) +
                  (usersQuery.data?.length || 0) +
                  (commentsQuery.data?.length || 0)}
              </p>
            </div>
          </div>

          {/* Parallel Queries Visualization */}
          <div className="space-y-4">
            {/* Posts Query */}
            <div className="border-2 border-blue-300 rounded-lg overflow-hidden">
              <div className="bg-blue-100 px-4 py-3 border-b border-blue-300">
                <h3 className="font-semibold text-blue-900">Query 1: Posts</h3>
              </div>
              <div className="p-4">
                <div className="mb-3">
                  <p className="text-sm font-mono text-gray-600">
                    queryKey: ["posts"]
                  </p>
                </div>
                {postsQuery.isLoading ? (
                  <p className="text-blue-600">🔄 Fetching posts...</p>
                ) : postsQuery.error ? (
                  <p className="text-red-600">❌ Error loading posts</p>
                ) : (
                  <div>
                    <p className="text-green-600 font-semibold mb-2">
                      ✓ Loaded {postsQuery.data?.length} posts
                    </p>
                    <div className="text-sm text-gray-700 space-y-1">
                      {postsQuery.data?.slice(0, 3).map((post: Post) => (
                        <p key={post.id}>• {post.title.substring(0, 50)}...</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Users Query */}
            <div className="border-2 border-green-300 rounded-lg overflow-hidden">
              <div className="bg-green-100 px-4 py-3 border-b border-green-300">
                <h3 className="font-semibold text-green-900">Query 2: Users</h3>
              </div>
              <div className="p-4">
                <div className="mb-3">
                  <p className="text-sm font-mono text-gray-600">
                    queryKey: ["users"]
                  </p>
                </div>
                {usersQuery.isLoading ? (
                  <p className="text-green-600">🔄 Fetching users...</p>
                ) : usersQuery.error ? (
                  <p className="text-red-600">❌ Error loading users</p>
                ) : (
                  <div>
                    <p className="text-green-600 font-semibold mb-2">
                      ✓ Loaded {usersQuery.data?.length} users
                    </p>
                    <div className="text-sm text-gray-700 space-y-1">
                      {usersQuery.data?.slice(0, 3).map((user: User) => (
                        <p key={user.id}>• {user.name}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Comments Query */}
            <div className="border-2 border-purple-300 rounded-lg overflow-hidden">
              <div className="bg-purple-100 px-4 py-3 border-b border-purple-300">
                <h3 className="font-semibold text-purple-900">Query 3: Comments</h3>
              </div>
              <div className="p-4">
                <div className="mb-3">
                  <p className="text-sm font-mono text-gray-600">
                    queryKey: ["comments"]
                  </p>
                </div>
                {commentsQuery.isLoading ? (
                  <p className="text-purple-600">🔄 Fetching comments...</p>
                ) : commentsQuery.error ? (
                  <p className="text-red-600">❌ Error loading comments</p>
                ) : (
                  <div>
                    <p className="text-purple-600 font-semibold mb-2">
                      ✓ Loaded {commentsQuery.data?.length} comments
                    </p>
                    <div className="text-sm text-gray-700 space-y-1">
                      {commentsQuery.data?.slice(0, 3).map((comment: Comment) => (
                        <p key={comment.id}>• {comment.name.substring(0, 40)}...</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Timing Visualization */}
          {!isLoading && (
            <div className="mt-6 p-6 bg-green-50 border-l-4 border-green-500 rounded">
              <p className="text-green-900 font-semibold mb-3">
                ✓ All Queries Loaded in Parallel
              </p>
              <p className="text-green-800 text-sm">
                All three queries ran <strong>simultaneously</strong> on the network.
                If they ran sequentially, it would take 3x longer. TanStack Query
                managed all three requests in parallel automatically, with no extra code.
              </p>
            </div>
          )}
        </section>

        {/* Code Breakdown */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Implementation Guide
          </h2>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Simple Pattern: Multiple useQuery Hooks
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`// All three queries run in parallel — no waiting!
const postsQuery = useQuery({
  queryKey: ["posts"],
  queryFn: () => fetchPosts(),
});

const usersQuery = useQuery({
  queryKey: ["users"],
  queryFn: () => fetchUsers(),
});

const commentsQuery = useQuery({
  queryKey: ["comments"],
  queryFn: () => fetchComments(),
});

// Each query has independent state
console.log(postsQuery.isLoading);    // May be true while usersQuery is false
console.log(usersQuery.error);        // Independent error state
console.log(commentsQuery.data);      // Independent data`}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Checking Combined Status
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`// Wait for ALL queries
const isLoading = postsQuery.isLoading || usersQuery.isLoading || commentsQuery.isLoading;
const hasError = postsQuery.error || usersQuery.error || commentsQuery.error;

if (isLoading) return <div>Loading all data...</div>;
if (hasError) return <div>Error occurred</div>;

// All data is available
return (
  <div>
    <h2>{postsQuery.data.length} posts</h2>
    <h2>{usersQuery.data.length} users</h2>
    <h2>{commentsQuery.data.length} comments</h2>
  </div>
);`}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Using useQueries Hook (For Dynamic Count)
            </h3>
            <p className="text-gray-700 text-sm mb-3">
              If you have a dynamic number of queries, use useQueries instead:
            </p>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`import { useQueries } from "@tanstack/react-query";

const queries = useQueries({
  queries: [
    {
      queryKey: ["posts"],
      queryFn: () => fetchPosts(),
    },
    {
      queryKey: ["users"],
      queryFn: () => fetchUsers(),
    },
    {
      queryKey: ["comments"],
      queryFn: () => fetchComments(),
    },
  ],
});

// queries is an array: queries[0], queries[1], queries[2]
const allLoading = queries.every((q) => q.isLoading);
const allSuccess = queries.every((q) => q.isSuccess);`}
            </pre>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="font-semibold text-lg mb-3 text-blue-900">
              Key Insights
            </h3>
            <ul className="space-y-2 text-blue-900 text-sm">
              <li>
                ✓ Just call useQuery multiple times — TanStack Query handles parallelism
              </li>
              <li>
                ✓ Each query has independent isLoading, error, data states
              </li>
              <li>
                ✓ No configuration needed — parallelism is automatic
              </li>
              <li>
                ✓ Use useQueries hook for dynamic number of queries
              </li>
              <li>
                ✓ Much faster than sequential fetching!
              </li>
            </ul>
          </div>
        </section>

        {/* Comparison */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Parallel vs Sequential vs Dependent
          </h2>

          <div className="space-y-3">
            <div className="p-4 bg-white border-l-4 border-blue-500 rounded">
              <p className="font-semibold text-gray-800 mb-2">Parallel (This Feature)</p>
              <p className="text-sm text-gray-700">
                All queries start immediately. Perfect for independent data: profile, settings, notifications. Fastest.
              </p>
            </div>

            <div className="p-4 bg-white border-l-4 border-yellow-500 rounded">
              <p className="font-semibold text-gray-800 mb-2">Dependent (F-05)</p>
              <p className="text-sm text-gray-700">
                Query B waits for Query A. Use when B needs data from A: fetch user first, then their orders.
              </p>
            </div>

            <div className="p-4 bg-white border-l-4 border-purple-500 rounded">
              <p className="font-semibold text-gray-800 mb-2">Sequential (Anti-pattern)</p>
              <p className="text-sm text-gray-700">
                Don't do this! Wait for A, then B, then C. Unnecessarily slow. Use parallel unless A depends on B.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-yellow-900">
            🎓 Foundation Complete!
          </h3>
          <p className="text-yellow-900 mb-3">
            You've learned all the core TanStack Query concepts:
          </p>
          <ul className="text-yellow-900 text-sm space-y-1 mb-4">
            <li>✓ F-01: Project setup</li>
            <li>✓ F-02: useQuery basics</li>
            <li>✓ F-03: Query keys</li>
            <li>✓ F-04: staleTime & gcTime</li>
            <li>✓ F-05: Dependent queries</li>
            <li>✓ TQ-06: Parallel queries</li>
          </ul>
          <p className="text-yellow-900">
            Next, move to <strong>Mutations</strong> to learn how to write data (POST, PUT, DELETE)!
          </p>
        </section>
      </div>
    </>
  );
}
