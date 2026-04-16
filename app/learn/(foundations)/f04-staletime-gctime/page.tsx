/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * F-04 — staleTime & gcTime
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * TANSTACK QUERY CONCEPT
 * ─────────────────────
 * staleTime controls how long data is considered "fresh" after being fetched.
 * While fresh, cached data is used without refetching. gcTime (garbage collection time)
 * controls how long unused queries persist in memory after unmounting.
 * Understanding these settings is crucial for optimal cache behavior.
 *
 * HOW IT WORKS UNDER THE HOOD
 * ────────────────────────────
 * When data is fetched, TanStack Query marks it with a dataUpdatedAt timestamp.
 * If current time - dataUpdatedAt < staleTime, data is "fresh" and used from cache.
 * If stale but still in gcTime, data is shown but a refetch happens in background.
 * After gcTime expires, the query is deleted from memory. gcTime (formerly cacheTime)
 * applies only to inactive queries; active ones stay in memory indefinitely.
 *
 * NEXT.JS CONCEPT
 * ───────────────
 * This page uses client-side state to demonstrate cache behavior. The timestamps
 * and status updates happen in real-time, giving visibility into TanStack Query's
 * internal staleness tracking.
 *
 * WHEN TO USE THIS
 * ────────────────
 * • High staleTime (e.g., 5m): User profile, static settings — don't refetch often
 * • Low staleTime (0ms): Live feeds, real-time dashboards — refetch on access
 * • High gcTime: Save memory, keep fresh data longer if user returns
 * • Low gcTime: Memory-constrained apps, don't need cached data long
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, User } from "@/lib/api";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function F04StaleTimeGcTime(): JSX.Element {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<"fresh" | "stale">("fresh");

  // Query 1: Fresh data (staleTime = 30 seconds)
  const freshQuery = useQuery({
    queryKey: ["users", "fresh"],
    queryFn: () => fetchUsers(),
    staleTime: 30 * 1000, // 30 seconds
  });

  // Query 2: Stale data (staleTime = 0, refetch immediately)
  const staleQuery = useQuery({
    queryKey: ["users", "stale"],
    queryFn: () => fetchUsers(),
    staleTime: 0, // Immediately stale
  });

  const handleRefresh = (key: string[]) => {
    queryClient.invalidateQueries({ queryKey: key });
  };

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="F-04"
          featureName="staleTime & gcTime"
          tanstackConcept="staleTime determines how long fetched data is considered 'fresh'. While fresh, cached data is used without refetching. gcTime (garbage collection time) determines how long unused queries stay in memory after unmounting."
          howItWorks="TanStack Query tracks dataUpdatedAt for each query. If (now - dataUpdatedAt) < staleTime, the query is 'fresh' and cached data is returned. If stale but within gcTime window, a background refetch happens. After gcTime expires, the query is deleted from memory."
          nextjsConcept="This page uses useEffect to update a timestamp every second, giving real-time visibility into TanStack Query's staleness calculations. The UI dynamically reflects whether data is fresh or stale."
          whenToUse="Set high staleTime for data that rarely changes (user profile, settings). Set low/zero staleTime for real-time data (feeds, live dashboards). Adjust gcTime based on memory constraints and user behavior."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white dark:text-white">
            Interactive Demo: Staleness Over Time
          </h2>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setTab("fresh")}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                tab === "fresh"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800 dark:text-slate-200 dark:text-slate-200"
              }`}
            >
              Fresh Data (staleTime: 30s)
            </button>
            <button
              onClick={() => setTab("stale")}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                tab === "stale"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-800 dark:text-slate-200 dark:text-slate-200"
              }`}
            >
              Stale Data (staleTime: 0s)
            </button>
          </div>

          {/* Fresh Data Tab */}
          {tab === "fresh" && (
            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 p-6 rounded-lg border-2 border-green-300">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-green-50 dark:bg-green-950/20 dark:bg-green-950/20 rounded">
                  <p className="text-xs text-gray-600">Status</p>
                  <p className="font-bold text-lg text-green-600">
                    {freshQuery.isLoading && "🔄 Loading"}
                    {!freshQuery.isLoading && freshQuery.isRefetching && "↻ Refetching"}
                    {!freshQuery.isLoading && !freshQuery.isRefetching && "✓ Fresh"}
                  </p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-950/20 dark:bg-green-950/20 rounded">
                  <p className="text-xs text-gray-600">Data Count</p>
                  <p className="font-bold text-lg">
                    {freshQuery.data?.length ?? 0}
                  </p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded">
                <p className="font-semibold text-green-900 dark:text-green-400 dark:text-green-400 mb-2">
                  ✓ Data is Fresh
                </p>
                <p className="text-green-800 dark:text-green-300 dark:text-green-300 text-sm">
                  This query was fetched less than 30 seconds ago. If you click
                  "Refresh", TanStack Query will use the cached data immediately
                  without making a new API call. Users get instant results!
                </p>
              </div>

              <button
                onClick={() => handleRefresh(["users", "fresh"])}
                disabled={freshQuery.isLoading}
                className="px-4 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700 disabled:opacity-50"
              >
                Click "Refresh" (will use cache)
              </button>
              {freshQuery.data && (
                <div className="mt-4 text-sm text-gray-700 dark:text-slate-300 dark:text-slate-300">
                  <p className="font-semibold mb-2">Users:</p>
                  <ul className="space-y-1">
                    {freshQuery.data.slice(0, 3).map((user: User) => (
                      <li key={user.id}>• {user.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Stale Data Tab */}
          {tab === "stale" && (
            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 p-6 rounded-lg border-2 border-red-300">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-red-50 rounded">
                  <p className="text-xs text-gray-600">Status</p>
                  <p className="font-bold text-lg text-red-600">
                    {staleQuery.isLoading && "🔄 Loading"}
                    {!staleQuery.isLoading && staleQuery.isRefetching && "↻ Refetching"}
                    {!staleQuery.isLoading && !staleQuery.isRefetching && "⚠ Stale"}
                  </p>
                </div>
                <div className="p-3 bg-red-50 rounded">
                  <p className="text-xs text-gray-600">Data Count</p>
                  <p className="font-bold text-lg">
                    {staleQuery.data?.length ?? 0}
                  </p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded">
                <p className="font-semibold text-red-900 mb-2">
                  ⚠ Data is Stale
                </p>
                <p className="text-red-800 text-sm">
                  staleTime is set to 0ms, so this query is immediately considered
                  stale. Every time you access it, TanStack Query refetches in the
                  background to keep data fresh. Users see cached data instantly,
                  then it updates when new data arrives.
                </p>
              </div>

              <button
                onClick={() => handleRefresh(["users", "stale"])}
                className="px-4 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-700"
              >
                Click "Refresh" (will refetch in background)
              </button>
              {staleQuery.data && (
                <div className="mt-4 text-sm text-gray-700 dark:text-slate-300 dark:text-slate-300">
                  <p className="font-semibold mb-2">Users:</p>
                  <ul className="space-y-1">
                    {staleQuery.data.slice(0, 3).map((user: User) => (
                      <li key={user.id}>• {user.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Code Breakdown */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white dark:text-white">
            Configuration Deep Dive
          </h2>

          <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 dark:border-slate-800 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200 dark:text-slate-200">
              Setting staleTime in a Query
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const query = useQuery({
  queryKey: ["users"],
  queryFn: () => fetchUsers(),
  staleTime: 30 * 1000, // 30 seconds
  // If not specified, inherits from QueryClient defaults (0ms)
});`}
            </pre>
          </div>

          <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 dark:border-slate-800 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200 dark:text-slate-200">
              Understanding the Timeline
            </h3>
            <div className="space-y-3 text-sm text-gray-700 dark:text-slate-300 dark:text-slate-300">
              <div className="p-3 bg-green-50 dark:bg-green-950/20 dark:bg-green-950/20 border border-green-200 rounded">
                <p className="font-semibold text-green-900 dark:text-green-400 dark:text-green-400">Fresh Phase (0 to staleTime)</p>
                <p>Data is considered fresh. Cached data is returned instantly. No refetch.</p>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/50 dark:border-yellow-900/50 rounded">
                <p className="font-semibold text-yellow-900 dark:text-yellow-400 dark:text-yellow-400">Stale-but-cached Phase (staleTime to gcTime)</p>
                <p>Data is stale but still in memory. Background refetch triggered on access.</p>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <p className="font-semibold text-red-900">Garbage Collected (after gcTime)</p>
                <p>Query deleted from memory. Next access requires a fresh fetch.</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 dark:border-slate-800 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200 dark:text-slate-200">
              Real-World staleTime Examples
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`// User profile — rarely changes
staleTime: 1000 * 60 * 10 // 10 minutes

// Live feed — needs frequent updates
staleTime: 0 // Immediately stale

// Search results — moderately fresh
staleTime: 1000 * 60 // 1 minute

// Static settings
staleTime: 1000 * 60 * 60 // 1 hour`}
            </pre>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 dark:bg-blue-950/20 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="font-semibold text-lg mb-3 text-blue-900 dark:text-blue-400 dark:text-blue-400">
              Key Insights
            </h3>
            <ul className="space-y-2 text-blue-900 dark:text-blue-400 dark:text-blue-400 text-sm">
              <li>
                ✓ staleTime = 0 (default) means data is immediately considered stale on access
              </li>
              <li>
                ✓ During background refetch, users see cached data — no loading spinner
              </li>
              <li>
                ✓ gcTime (formerly cacheTime) only affects INACTIVE queries
              </li>
              <li>
                ✓ Active mounted queries stay in memory indefinitely
              </li>
              <li>
                ✓ Balance between performance (less fetching) and freshness (more refetches)
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-950/20 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/50 dark:border-yellow-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-yellow-900 dark:text-yellow-400 dark:text-yellow-400">
            📝 Next Step
          </h3>
          <p className="text-yellow-900 dark:text-yellow-400 dark:text-yellow-400">
            Now that you understand staleness, move to <strong>F-05 — Dependent Queries</strong> to learn
            how to chain queries where one depends on another!
          </p>
        </section>
      </div>
    </>
  );
}
