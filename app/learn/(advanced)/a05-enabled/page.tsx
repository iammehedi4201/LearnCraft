/**
 * A-05 — Enabled Flag
 * Conditionally pause/resume queries.
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPostsByUser } from "@/lib/api";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function A05Enabled(): JSX.Element {
  const [userId, setUserId] = useState<number | null>(null);

  const postsQuery = useQuery({
    queryKey: ["posts", "user", userId],
    queryFn: () => fetchPostsByUser(userId!),
    enabled: userId !== null, // Only fetch when userId is set
  });

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="A-05"
          featureName="Enabled Flag"
          tanstackConcept="enabled controls whether a query runs. When false, query stays paused. Useful for conditional queries: search only when term exists, fetch only after auth."
          howItWorks="When enabled=false, query doesn't execute even if used. Status stays 'pending'. When enabled becomes true, query runs. Enabling/disabling is declarative."
          nextjsConcept="Client-side conditional fetching. Common pattern: search box (query only on keypress), auth check (fetch only if logged in), multi-step forms."
          whenToUse="Pause queries until conditions met: search term entered, user authenticated, dependencies available, user action triggered."
        />

        <section className="mt-12">
          <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 p-6 rounded-lg border">
            <h3 className="font-semibold text-lg mb-4">Select User (Query Paused Until Selection)</h3>
            <div className="flex gap-2 flex-wrap mb-4">
              {[1, 2, 3].map((id) => (
                <button
                  key={id}
                  onClick={() => setUserId(id)}
                  className={`px-4 py-2 rounded ${
                    userId === id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  User {id}
                </button>
              ))}
              <button
                onClick={() => setUserId(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Clear
              </button>
            </div>

            {!userId && (
              <p className="text-gray-600 italic">
                ⏸ Query is paused. Select a user to enable fetching.
              </p>
            )}

            {userId && (
              <>
                {postsQuery.isLoading && <p className="text-blue-600 dark:text-blue-400 dark:text-blue-400">🔄 Loading...</p>}
                {postsQuery.data && (
                  <div className="text-sm">
                    <p className="font-semibold mb-2">{postsQuery.data.length} posts</p>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {postsQuery.data.slice(0, 3).map((p: any) => (
                        <p key={p.id}>• {p.title}</p>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <pre className="mt-6 bg-gray-900 text-white p-4 rounded overflow-x-auto text-xs">
{`const query = useQuery({
  queryKey: ["posts", userId],
  queryFn: () => fetchPostsByUser(userId!),
  enabled: userId !== null, // Paused until userId set
});`}
          </pre>
        </section>
      </div>
    </>
  );
}
