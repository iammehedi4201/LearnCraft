/**
 * A-03 — Suspense Integration
 * useSuspenseQuery works with Suspense boundaries for cleaner code.
 * Throws promise while loading, caught by Suspense fallback.
 */

"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchPosts, Post } from "@/lib/api";
import { Suspense } from "react";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

function PostsContent() {
  const { data: posts } = useSuspenseQuery({
    queryKey: ["posts", "suspense"],
    queryFn: () => fetchPosts(),
  });

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto">
      {posts.slice(0, 5).map((post: Post) => (
        <div key={post.id} className="p-2 bg-gray-50 rounded text-sm">
          {post.title.substring(0, 50)}...
        </div>
      ))}
    </div>
  );
}

export default function A03Suspense(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="A-03"
          featureName="Suspense Integration"
          tanstackConcept="useSuspenseQuery works with React Suspense. Throws on loading, caught by fallback. Cleaner code than checking isLoading in component."
          howItWorks="useSuspenseQuery throws a promise while fetching. React's Suspense catches it and shows fallback. When data arrives, component renders. Errors throw to error boundary."
          nextjsConcept="Suspense is core to Next.js Server Components. With useSuspenseQuery, client components can use Suspense too for cleaner async handling."
          whenToUse="Use for cleaner async code in interactive components. Wrap in Suspense boundary with fallback UI. Errors handled by Error boundary."
        />

        <section className="mt-12">
          <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 p-6 rounded-lg border">
            <h3 className="font-semibold text-lg mb-4">Posts (with Suspense)</h3>
            <Suspense
              fallback={
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 dark:bg-blue-950/20 border border-blue-200 rounded text-blue-600 dark:text-blue-400 dark:text-blue-400">
                  🔄 Loading posts...
                </div>
              }
            >
              <PostsContent />
            </Suspense>
          </div>

          <pre className="mt-6 bg-gray-900 text-white p-4 rounded overflow-x-auto text-xs">
{`// Component using useSuspenseQuery
function Posts() {
  const { data: posts } = useSuspenseQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });
  // If loading, throws promise → caught by Suspense
  // If error, throws error → caught by Error boundary

  return <div>{posts.map(...)}</div>;
}

// Parent wraps in Suspense
export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Posts />
    </Suspense>
  );
}`}
          </pre>
        </section>
      </div>
    </>
  );
}
