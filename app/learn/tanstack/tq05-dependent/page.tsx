/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TQ-05 — Dependent Queries
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * TANSTACK QUERY CONCEPT
 * ─────────────────────
 * Dependent queries are queries that only run after another query has completed
 * successfully. You use the "enabled" flag to pause a query until its dependency
 * has data. This prevents wasted API calls and ensures data flows in the correct order.
 *
 * HOW IT WORKS UNDER THE HOOD
 * ────────────────────────────
 * The "enabled" option is a boolean that controls whether a query runs. When enabled
 * is false, the query doesn't execute, and its status stays "pending". You set enabled
 * based on a condition like "enabled: firstQuery.isSuccess && firstQuery.data?.id".
 * When the condition becomes true, TanStack Query automatically executes the query.
 *
 * NEXT.JS CONCEPT
 * ───────────────
 * This page demonstrates client-side data flow: first you select a user (Query 1),
 * then based on that selection, you fetch their posts (Query 2). It's a common
 * pattern in interactive web apps where child data depends on parent selection.
 *
 * WHEN TO USE THIS
 * ────────────────
 * Use dependent queries for: user details before fetching their orders, parent category
 * before fetching sub-items, authentication check before fetching private data, or any
 * scenario where B requires data from A.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsers, fetchPostsByUser, User, Post } from "@/lib/api";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function TQ05Dependent(): JSX.Element {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // Query 1: Fetch all users (always enabled)
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

  // Query 2: Fetch posts for selected user (only runs when userId is selected)
  const userPostsQuery = useQuery({
    queryKey: ["posts", "user", selectedUserId],
    queryFn: () => fetchPostsByUser(selectedUserId!),
    enabled: selectedUserId !== null, // Only run when userId is selected
  });

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="TQ-05"
          featureName="Dependent Queries"
          tanstackConcept="Dependent queries only run when their dependencies are satisfied. You use the enabled flag to conditionally pause/resume queries. Query B waits for Query A's data before executing, preventing wasted API calls and ensuring correct data flow."
          howItWorks="The enabled option (boolean) controls query execution. When false, the query stays in 'pending' state and is not executed. Set enabled based on data from another query: enabled: userQuery.isSuccess && userQuery.data?.id. When the condition becomes true, TanStack Query automatically runs the query."
          nextjsConcept="This page demonstrates interactive sequential data fetching: select a user (Query 1), then their posts automatically load (Query 2 enabled). This is a core pattern in interactive Next.js apps with dependent data."
          whenToUse="Use dependent queries when one query's result is required for another: fetch user first, then their orders; fetch category first, then items in that category; check auth first, then fetch private data."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Interactive Example: User → Posts Flow
          </h2>

          {/* Query 1: Users List */}
          <div className="bg-white p-6 rounded-lg border-2 border-blue-300 mb-6">
            <h3 className="font-semibold text-lg mb-2 text-gray-800">
              Query 1: Fetch All Users (Always Enabled)
            </h3>
            <p className="text-xs text-gray-600 mb-3 font-mono bg-blue-100 p-2 rounded">
              enabled: true (implicitly — no condition)
            </p>

            {usersQuery.isLoading && (
              <p className="text-blue-600">🔄 Loading users...</p>
            )}
            {usersQuery.error && (
              <p className="text-red-600">❌ Error: {usersQuery.error.message}</p>
            )}
            {usersQuery.data && (
              <div>
                <p className="text-gray-700 mb-3 font-semibold">
                  ✓ Loaded {usersQuery.data.length} users. Click one to fetch their posts:
                </p>
                <div className="flex gap-2 flex-wrap">
                  {usersQuery.data.slice(0, 5).map((user: User) => (
                    <button
                      key={user.id}
                      onClick={() => setSelectedUserId(user.id)}
                      className={`px-3 py-2 rounded font-medium transition-colors ${
                        selectedUserId === user.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {user.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Query 2: User's Posts */}
          <div className="bg-white p-6 rounded-lg border-2 border-purple-300">
            <h3 className="font-semibold text-lg mb-2 text-gray-800">
              Query 2: Fetch Posts by Selected User (Dependent)
            </h3>
            <p className="text-xs text-gray-600 mb-3 font-mono bg-purple-100 p-2 rounded">
              enabled: selectedUserId !== null
            </p>

            {!selectedUserId && (
              <div className="p-4 bg-gray-100 border border-gray-300 rounded">
                <p className="text-gray-600 font-semibold">
                  ⏸ Query is paused (not enabled yet)
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Select a user above to enable this query. No API call is made until
                  you select someone.
                </p>
              </div>
            )}

            {selectedUserId && (
              <div>
                {userPostsQuery.isLoading && (
                  <p className="text-purple-600">
                    🔄 Loading {usersQuery.data?.find(u => u.id === selectedUserId)?.name}'s
                    posts...
                  </p>
                )}
                {userPostsQuery.error && (
                  <p className="text-red-600">❌ Error: {userPostsQuery.error.message}</p>
                )}
                {userPostsQuery.data && (
                  <div>
                    <p className="text-gray-700 mb-3 font-semibold">
                      ✓ Found {userPostsQuery.data.length} posts by{" "}
                      {usersQuery.data?.find(u => u.id === selectedUserId)?.name}:
                    </p>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {userPostsQuery.data.map((post: Post) => (
                        <div
                          key={post.id}
                          className="p-3 bg-purple-50 border border-purple-200 rounded"
                        >
                          <p className="font-semibold text-gray-900 text-sm">
                            {post.title}
                          </p>
                          <p className="text-gray-700 text-xs mt-1 line-clamp-2">
                            {post.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Query Flow Visualization */}
          {selectedUserId && (
            <div className="mt-6 p-6 bg-green-50 border-l-4 border-green-500 rounded">
              <p className="text-green-900 font-semibold mb-3">
                ✓ Data Flow Visualized
              </p>
              <div className="space-y-3 text-sm text-green-800 font-mono">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-200 rounded">Query 1</span>
                  <span>→ Fetches all users</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="ml-4">User clicks User #{selectedUserId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-purple-200 rounded">Query 2</span>
                  <span>→ Automatically enabled, fetches their posts</span>
                </div>
                <div className="text-green-700 italic mt-3">
                  No wasted API calls — Query 2 only runs when needed.
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Code Breakdown */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            How to Implement Dependent Queries
          </h2>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Step 1: Main Query (Always Enabled)
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const usersQuery = useQuery({
  queryKey: ["users"],
  queryFn: () => fetchUsers(),
  // No 'enabled' means it runs immediately
});`}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Step 2: Dependent Query (Conditionally Enabled)
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

const userPostsQuery = useQuery({
  queryKey: ["posts", "user", selectedUserId],
  queryFn: () => fetchPostsByUser(selectedUserId!),
  enabled: selectedUserId !== null, // Key! Only run when userId is selected
});

// When user clicks a user:
// setSelectedUserId(123)  ← triggers enabled condition
// Query automatically runs   ← TanStack Query handles this
// Posts are fetched         ← Only when needed`}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              More Complex Dependency Chain
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`// Query 1: Fetch user
const userQuery = useQuery({
  queryKey: ["user", userId],
  queryFn: () => fetchUser(userId),
  enabled: userId !== null,
});

// Query 2: Fetch user's orders (depends on Query 1)
const ordersQuery = useQuery({
  queryKey: ["orders", userQuery.data?.id],
  queryFn: () => fetchOrders(userQuery.data!.id),
  enabled: userQuery.data?.id !== undefined, // Wait for Query 1 to succeed
});

// Query 3: Fetch first order's details (depends on Query 2)
const firstOrderDetailsQuery = useQuery({
  queryKey: ["order-details", ordersQuery.data?.[0]?.id],
  queryFn: () => fetchOrderDetails(ordersQuery.data![0].id),
  enabled: ordersQuery.data && ordersQuery.data.length > 0,
});`}
            </pre>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="font-semibold text-lg mb-3 text-blue-900">
              Best Practices
            </h3>
            <ul className="space-y-2 text-blue-900 text-sm">
              <li>
                ✓ Use enabled for clean, declarative data dependencies
              </li>
              <li>
                ✓ Avoid nested useQuery calls — use enabled instead
              </li>
              <li>
                ✓ Always include the dependency value in queryKey: ["posts", userId]
              </li>
              <li>
                ✓ Check both isSuccess and that data exists: enabled: query1.isSuccess && query1.data?.id
              </li>
              <li>
                ✓ Chain enabled conditions for multi-step flows
              </li>
            </ul>
          </div>
        </section>

        {/* Common Patterns */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Common Patterns
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">Pattern: Optional Query</h4>
              <pre className="bg-gray-900 text-white p-3 rounded text-xs overflow-x-auto">
{`enabled: searchTerm !== ""  // Only search when term is not empty`}
              </pre>
            </div>

            <div className="bg-white p-4 rounded border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">Pattern: Auth Gate</h4>
              <pre className="bg-gray-900 text-white p-3 rounded text-xs overflow-x-auto">
{`enabled: isAuthenticated  // Only fetch private data if logged in`}
              </pre>
            </div>

            <div className="bg-white p-4 rounded border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">Pattern: Multi-Step Sequential</h4>
              <pre className="bg-gray-900 text-white p-3 rounded text-xs overflow-x-auto">
{`enabled: query1.isSuccess && !!query1.data?.id`}
              </pre>
            </div>
          </div>
        </section>

        <section className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-yellow-900">
            📝 Next Step
          </h3>
          <p className="text-yellow-900">
            Now that you understand dependent queries, move to <strong>F-06 — Parallel Queries</strong> to learn
            how to fetch multiple independent resources simultaneously!
          </p>
        </section>
      </div>
    </>
  );
}
