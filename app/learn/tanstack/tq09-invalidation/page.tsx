/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TQ-09 — Query Invalidation
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * TANSTACK QUERY CONCEPT
 * ─────────────────────
 * Query invalidation marks a query as stale, triggering a refetch. After mutations,
 * you invalidate related queries to keep the cache in sync. For example, after
 * creating a post, invalidate the ["posts"] query to refetch the list. This is
 * the most common pattern for keeping data fresh after writes.
 *
 * HOW IT WORKS UNDER THE HOOD
 * ────────────────────────────
 * invalidateQueries() sets the dataUpdatedAt timestamp to 0 for matching queries,
 * marking them as stale. If any component is mounting that query, it refetches
 * immediately. If the query is inactive, it stays stale until next access. Partial
 * key matching enables granular invalidation: invalidate(["posts"]) invalidates
 * ["posts"], ["posts", 1], ["posts", { userId: 2 }], etc.
 *
 * NEXT.JS CONCEPT
 * ───────────────
 * This page demonstrates data cache synchronization after writes. In a real
 * Next.js app, you might also use revalidatePath() in server actions, but
 * TanStack Query's invalidation is the client-side pattern.
 *
 * WHEN TO USE THIS
 * ────────────────
 * Use invalidation after every mutation that modifies data. After creating a post,
 * invalidate ["posts"]. After deleting a user, invalidate ["users"]. It's the
 * simplest way to keep cache in sync and is preferred over optimistic updates
 * for most scenarios.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, fetchPosts, deletePost, Post } from "@/lib/api";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function TQ09Invalidation(): JSX.Element {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");

  // Fetch posts
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  // Create post mutation — invalidates on success
  const createPostMutation = useMutation({
    mutationFn: (newPost: Omit<Post, "id">) => createPost(newPost),
    onSuccess: async () => {
      // ✓ After successful create, invalidate the posts list
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      setTitle("");
      setBody("");
      setMessage("✓ Post created! List refreshed.");
      setTimeout(() => setMessage(""), 3000);
    },
    onError: () => {
      setMessage("❌ Failed to create post");
      setTimeout(() => setMessage(""), 3000);
    },
  });

  // Delete post mutation — invalidates on success
  const deletePostMutation = useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: async () => {
      // ✓ After successful delete, invalidate the posts list
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      setMessage("✓ Post deleted! List refreshed.");
      setTimeout(() => setMessage(""), 3000);
    },
    onError: () => {
      setMessage("❌ Failed to delete post");
      setTimeout(() => setMessage(""), 3000);
    },
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    createPostMutation.mutate({
      userId: 1,
      title,
      body,
    });
  };

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="TQ-09"
          featureName="Query Invalidation"
          tanstackConcept="Query invalidation marks queries as stale, triggering refetches. After mutations, you invalidate related queries to sync the cache with the server. This is the standard pattern for keeping cached data fresh after writes."
          howItWorks="invalidateQueries() sets a query's dataUpdatedAt to 0, marking it stale. Active queries (mounted components) refetch immediately. Inactive queries refetch on next access. Partial key matching invalidates hierarchies: invalidate(['posts']) catches ['posts', 1], ['posts', {'userId': 2}], etc."
          nextjsConcept="Post-mutation cache synchronization is a core Next.js pattern. While Server Components use revalidatePath(), this TanStack Query pattern is essential for client-side interactivity and cache coherence."
          whenToUse="Use invalidation after every mutation to keep cache fresh. After creating/updating/deleting, invalidate the related query. It's simpler than optimistic updates and works for all scenarios. Combine both: optimistic updates for UX, invalidation for sync."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Interactive Example: Create & Delete with Invalidation
          </h2>

          {/* Message */}
          {message && (
            <div
              className={`p-4 rounded-lg mb-6 font-semibold ${
                message.startsWith("❌")
                  ? "bg-red-50 text-red-900 border border-red-200"
                  : "bg-green-50 text-green-900 border border-green-200"
              }`}
            >
              {message}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Create Form */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">
                Create a Post
              </h3>
              <form onSubmit={handleCreatePost} className="space-y-3">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={createPostMutation.isPending}
                  placeholder="Title"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm disabled:opacity-50"
                  required
                />
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  disabled={createPostMutation.isPending}
                  placeholder="Body"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm disabled:opacity-50"
                  required
                />
                <button
                  type="submit"
                  disabled={
                    createPostMutation.isPending || !title || !body
                  }
                  className="w-full px-4 py-2 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                >
                  {createPostMutation.isPending ? "Creating..." : "Create"}
                </button>
              </form>
            </div>

            {/* Status */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">
                Cache Status
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Posts in Cache</p>
                  <p className="font-bold text-lg text-blue-600">
                    {postsQuery.data?.length ?? 0}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Cache Status</p>
                  <p className="font-bold">
                    {postsQuery.isRefetching && "🔄 Refetching..."}
                    {!postsQuery.isRefetching && postsQuery.isSuccess && "✓ Fresh"}
                    {!postsQuery.isRefetching && !postsQuery.isSuccess && postsQuery.isLoading && "Loading..."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Posts (showing 5 of {postsQuery.data?.length ?? 0})
            </h3>

            {postsQuery.isLoading && (
              <p className="text-blue-600">🔄 Loading posts...</p>
            )}

            {postsQuery.data && (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {postsQuery.data.slice(0, 5).map((post: Post) => (
                  <div
                    key={post.id}
                    className="p-3 bg-gray-50 rounded border border-gray-200 flex justify-between items-start gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 line-clamp-1">
                        #{post.id}: {post.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {post.body}
                      </p>
                    </div>
                    <button
                      onClick={() => deletePostMutation.mutate(post.id)}
                      disabled={deletePostMutation.isPending}
                      className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Information */}
          <div className="mt-6 p-6 bg-blue-50 border-l-4 border-blue-500 rounded">
            <h3 className="font-semibold text-blue-900 mb-3">
              ✨ How Invalidation Works Here
            </h3>
            <ol className="space-y-2 text-blue-900 text-sm">
              <li>
                <strong>1. You create a post:</strong> Form data sent to server
              </li>
              <li>
                <strong>2. Server responds:</strong> Post created successfully
              </li>
              <li>
                <strong>3. onSuccess triggers:</strong> Mutation succeeds
              </li>
              <li>
                <strong>4. invalidateQueries runs:</strong> ["posts"] marked
                stale
              </li>
              <li>
                <strong>5. Automatic refetch:</strong> Posts query runs again
              </li>
              <li>
                <strong>6. UI updates:</strong> New data in list (if visible)
              </li>
            </ol>
          </div>
        </section>

        {/* Code Breakdown */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Implementation Pattern
          </h2>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Basic Pattern: Invalidate on Success
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const createPostMutation = useMutation({
  mutationFn: (newPost) => createPost(newPost),
  onSuccess: async () => {
    // After successful create, mark posts query as stale
    await queryClient.invalidateQueries({
      queryKey: ["posts"],
    });
    // Active queries refetch immediately
    // Inactive queries refetch on next access
  },
});`}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Partial Key Invalidation (Hierarchy)
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`// Invalidate ALL posts queries (all variations)
await queryClient.invalidateQueries({ queryKey: ["posts"] });
// This invalidates:
// - ["posts"]
// - ["posts", 1]
// - ["posts", { userId: 2 }]
// - ["posts", { userId: 2, page: 1 }]
// Everything under "posts" namespace!

// Invalidate specific user's posts only
await queryClient.invalidateQueries({
  queryKey: ["posts", { userId: 2 }],
});
// This does NOT invalidate ["posts"] or ["posts", 1]`}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Real-World Example: Full CRUD with Invalidation
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`// CREATE
const createMutation = useMutation({
  mutationFn: (newPost) => api.createPost(newPost),
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
});

// UPDATE
const updateMutation = useMutation({
  mutationFn: (post) => api.updatePost(post.id, post),
  onSuccess: async (data) => {
    // Invalidate both the list and this item
    await queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
});

// DELETE
const deleteMutation = useMutation({
  mutationFn: (postId) => api.deletePost(postId),
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
});`}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Advanced: Invalidation with Refetch Options
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const mutation = useMutation({
  mutationFn: (data) => api.save(data),
  onSuccess: async () => {
    await queryClient.invalidateQueries({
      queryKey: ["posts"],
      exact: false, // Partial match (default)
      refetchType: "active", // Only refetch if mounted (default)
      // or "inactive": refetch even inactive queries
      // or "all": refetch everything
    });
  },
});`}
            </pre>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="font-semibold text-lg mb-3 text-blue-900">
              Invalidation Strategies
            </h3>
            <div className="space-y-3 text-blue-900 text-sm">
              <div>
                <p className="font-semibold">Broad Invalidation (Simple)</p>
                <p>invalidate(["posts"]) — for simple apps, always works</p>
              </div>
              <div>
                <p className="font-semibold">Targeted Invalidation (Precise)</p>
                <p>invalidate(["posts", userId]) — for complex apps with many cached variants</p>
              </div>
              <div>
                <p className="font-semibold">Hybrid: Optimistic + Invalidation</p>
                <p>Use optimistic updates for UX, invalidate onSuccess for sync (best practice!)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            When to Use Each Approach
          </h2>

          <div className="space-y-3">
            <div className="p-4 bg-white border-l-4 border-purple-500 rounded">
              <p className="font-semibold text-gray-800 mb-2">Invalidation (Most Common)</p>
              <p className="text-sm text-gray-700">
                Simplest approach. After mutation, mark queries stale and let them refetch. Works for all scenarios.
              </p>
            </div>

            <div className="p-4 bg-white border-l-4 border-green-500 rounded">
              <p className="font-semibold text-gray-800 mb-2">Optimistic Updates (UX)</p>
              <p className="text-sm text-gray-700">
                Update cache immediately for faster perceived performance. Use when operation rarely fails.
              </p>
            </div>

            <div className="p-4 bg-white border-l-4 border-blue-500 rounded">
              <p className="font-semibold text-gray-800 mb-2">Both Together (Best Practice)</p>
              <p className="text-sm text-gray-700">
                Use optimistic updates in onMutate for instant UX. Use invalidation in onSuccess to sync with server.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-yellow-900">
            🎓 Mutations Complete!
          </h3>
          <p className="text-yellow-900 mb-3">
            You've learned all the mutation patterns:
          </p>
          <ul className="text-yellow-900 text-sm space-y-1 mb-4">
            <li>✓ M-01: useMutation basics</li>
            <li>✓ M-02: Optimistic updates</li>
            <li>✓ TQ-09: Query invalidation</li>
          </ul>
          <p className="text-yellow-900">
            Next, move to <strong>Pagination</strong> to learn how to handle large datasets!
          </p>
        </section>
      </div>
    </>
  );
}
