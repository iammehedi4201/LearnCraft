/**
 * TQ-16 — Polling (refetchInterval)
 * Auto-refresh data at intervals.
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/api";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function TQ16Polling(): JSX.Element {
  const [isPolling, setIsPolling] = useState(true);

  const usersQuery = useQuery({
    queryKey: ["users", "polling"],
    queryFn: () => fetchUsers(),
    refetchInterval: isPolling ? 5000 : false, // Refetch every 5s if enabled
  });

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="TQ-16"
          featureName="Polling"
          tanstackConcept="refetchInterval automatically refetches query at specified intervals. Used for live data: stock prices, chat messages, activity feeds."
          howItWorks="Set refetchInterval to milliseconds. Query refetches in background at that interval. If component unmounts, polling stops. Re-enable with useQueryClient."
          nextjsConcept="Client-side live updates. For true real-time, consider WebSockets (not covered here, but integration pattern with mutations is similar)."
          whenToUse="Live dashboards, stock tickers, chat, activity feeds. Not for static data. Stop polling when user leaves to save resources."
        />

        <section className="mt-12">
          <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 p-6 rounded-lg border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Live Users (Polling Every 5s)</h3>
              <button
                onClick={() => setIsPolling(!isPolling)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  isPolling
                    ? "bg-green-600 text-white"
                    : "bg-gray-400 text-white"
                }`}
              >
                {isPolling ? "Pause" : "Resume"} Polling
              </button>
            </div>

            {usersQuery.isLoading && <p className="text-blue-600 dark:text-blue-400 dark:text-blue-400">🔄 Loading...</p>}
            {usersQuery.data && (
              <div className="space-y-1 text-sm">
                <p className="text-gray-600 mb-2">
                  {isPolling ? "⚙️ Polling active" : "⏸ Polling paused"}
                </p>
                {usersQuery.data.slice(0, 3).map((u: any) => (
                  <p key={u.id}>• {u.name}</p>
                ))}
              </div>
            )}
          </div>

          <pre className="mt-6 bg-gray-900 text-white p-4 rounded overflow-x-auto text-xs">
{`const query = useQuery({
  queryKey: ["data"],
  queryFn: () => fetchData(),
  refetchInterval: isPolling ? 5000 : false, // 5 seconds
  // or refetchIntervalInBackground: true to poll even when tab not focused
});`}
          </pre>
        </section>
      </div>
    </>
  );
}
