/**
 * TQ-18 — Query Cancellation (AbortSignal)
 */

"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/api";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function TQ18Cancellation(): JSX.Element {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts", "cancellable"],
    queryFn: ({ signal }) => fetchPosts(signal), // Pass signal to API
  });

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="TQ-18"
          featureName="Query Cancellation"
          tanstackConcept="Pass AbortSignal to queryFn to cancel in-flight requests. Useful on unmount, route change, or user cancel button."
          howItWorks="TanStack Query automatically creates AbortSignal for each request. Pass it to fetch(): fetch(url, {signal}). On cancel, request aborted. Great for cleanup."
          nextjsConcept="Navigation cancellation pattern. When user navigates away, in-flight requests are canceled automatically."
          whenToUse="Automatic on unmount. Provide cancel button for long searches. Add to fetchFunctions to handle AbortSignal."
        />

        <section className="mt-12">
          <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 p-6 rounded-lg border">
            <h3 className="font-semibold text-lg mb-4">Cancellable Query</h3>
            {postsQuery.isLoading && <p className="text-blue-600 dark:text-blue-400 dark:text-blue-400">🔄 Loading...</p>}
            {postsQuery.data && (
              <>
                <p className="text-green-600 mb-2">✓ Loaded {postsQuery.data.length} posts</p>
                <button
                  onClick={() =>
                    queryClient.cancelQueries({
                      queryKey: ["posts", "cancellable"],
                    })
                  }
                  className="px-4 py-2 bg-red-600 text-white rounded text-sm"
                >
                  Cancel Request
                </button>
              </>
            )}
          </div>

          <pre className="mt-6 bg-gray-900 text-white p-4 rounded overflow-x-auto text-xs">
{`// Fetch function accepts signal
export async function fetchPosts(signal?: AbortSignal) {
  const res = await fetch('/api/posts', { signal });
  return res.json();
}

// useQuery automatically handles signal
const query = useQuery({
  queryKey: ['posts'],
  queryFn: ({ signal }) => fetchPosts(signal),
});

// Cancel manually
queryClient.cancelQueries({ queryKey: ['posts'] });

// Auto-cancels on unmount if not in use elsewhere`}
          </pre>
        </section>
      </div>
    </>
  );
}
