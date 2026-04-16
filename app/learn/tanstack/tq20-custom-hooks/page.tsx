/**
 * TQ-20 — Custom Hooks
 * Extract queries/mutations into reusable useXxx() hooks.
 */

"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchPosts, createPost, Post } from "@/lib/api";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

// Custom hooks (normally in hooks/useUser.ts, etc.)
function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });
}

function useCreatePost() {
  return useMutation<Post, Error, Omit<Post, "id">>({
    mutationFn: (data: Omit<Post, "id">) => createPost(data),
  });
}

export default function TQ20CustomHooks(): JSX.Element {
  const postsQuery = usePosts();
  const createMutation = useCreatePost();
  const [title, setTitle] = useState("");

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="TQ-20"
          featureName="Custom Hooks"
          tanstackConcept="Extract queries/mutations into custom useXxx() hooks. Improves reusability, testability, and code organization. Each hook encapsulates one data operation."
          howItWorks="Create useXxx() hooks wrapping useQuery/useMutation. Export from hooks/ directory. Import and use in components. Same benefits as writing inline, better organized."
          nextjsConcept="React hooks best practice. Separate concerns: data fetching logic in hooks, UI rendering in components. Perfect for large Next.js apps."
          whenToUse="Always extract queries/mutations used in multiple components. Even for single-use, extracts logic from component. Makes testing easier."
        />

        <section className="mt-12">
          <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 p-6 rounded-lg border">
            <div className="mb-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <button
                onClick={() => createMutation.mutate({ userId: 1, title, body: "Demo" })}
                disabled={createMutation.isPending}
                className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
              >
                Create
              </button>
            </div>

            <h3 className="font-semibold text-lg mb-2">Posts (using usePosts hook)</h3>
            {postsQuery.isLoading && <p className="text-blue-600 dark:text-blue-400 dark:text-blue-400">🔄 Loading...</p>}
            {postsQuery.data && (
              <div className="text-sm space-y-1 max-h-40 overflow-y-auto">
                {postsQuery.data.slice(0, 3).map((p: any) => (
                  <p key={p.id}>• {p.title.substring(0, 50)}...</p>
                ))}
              </div>
            )}
          </div>

          <pre className="mt-6 bg-gray-900 text-white p-4 rounded overflow-x-auto text-xs">
{`// hooks/usePosts.ts
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/lib/api';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(),
  });
}

// hooks/useCreatePost.ts
export function useCreatePost() {
  return useMutation({
    mutationFn: (data) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

// component.tsx
export default function Component() {
  const posts = usePosts();
  const createPost = useCreatePost();

  return (
    <div>
      {posts.data?.map(p => <div>{p.title}</div>)}
      <button onClick={() => createPost.mutate({...})}>
        Create
      </button>
    </div>
  );
}`}
          </pre>
        </section>

        <section className="mt-12 p-6 bg-green-50 dark:bg-green-950/20 dark:bg-green-950/20 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-lg text-green-900 dark:text-green-400 dark:text-green-400 mb-3">
            🎓 Advanced Complete!
          </h3>
          <p className="text-green-900 dark:text-green-400 dark:text-green-400 text-sm">
            You've learned production-grade TanStack Query patterns. You're now ready
            to build complex data-driven applications!
          </p>
        </section>
      </div>
    </>
  );
}
