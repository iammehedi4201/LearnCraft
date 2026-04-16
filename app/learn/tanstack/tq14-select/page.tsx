/**
 * TQ-14 — Select Transform
 * Use select() to transform/filter data inside useQuery.
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/api";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function TQ14Select(): JSX.Element {
  // Only get titles, not full posts
  const titlesQuery = useQuery({
    queryKey: ["posts", "titles"],
    queryFn: () => fetchPosts(),
    select: (posts) => posts.map((p) => ({ id: p.id, title: p.title })),
  });

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="TQ-14"
          featureName="Select Transform"
          tanstackConcept="select() transforms/filters data returned by queryFn. Runs after successful fetch. Only transformed data is returned to component."
          howItWorks="queryFn fetches full posts. select() runs on result, returning only titles. Component receives transformed data. Cached under full key, but component sees filtered version."
          nextjsConcept="Data transformation in client components. In Next.js, you might do this server-side, but client-side select() is useful for computed/derived data from API responses."
          whenToUse="Use select() for computed properties, filtering, projecting. Keeps remote data in cache but shows component only what it needs."
        />

        <section className="mt-12">
          <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 p-6 rounded-lg border">
            <h3 className="font-semibold text-lg mb-4">Post Titles Only (using select)</h3>
            {titlesQuery.isLoading && <p className="text-blue-600 dark:text-blue-400 dark:text-blue-400">🔄 Loading...</p>}
            {titlesQuery.data && (
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {titlesQuery.data.slice(0, 5).map((item) => (
                  <div key={item.id} className="text-sm text-gray-700 dark:text-slate-300 dark:text-slate-300">
                    • {item.title.substring(0, 60)}...
                  </div>
                ))}
              </div>
            )}
          </div>

          <pre className="mt-6 bg-gray-900 text-white p-4 rounded overflow-x-auto text-xs">
{`// Full posts fetched, only titles returned to component
const query = useQuery({
  queryKey: ["posts"],
  queryFn: () => fetchPosts(), // Full posts in cache
  select: (posts) => posts.map(p => ({ id: p.id, title: p.title })),
});

// Component receives: [{ id: 1, title: "..." }, ...]
// Not full posts with body, userId, etc.`}
          </pre>
        </section>
      </div>
    </>
  );
}
