/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TQ-08 — Optimistic Updates
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * TANSTACK QUERY CONCEPT
 * ─────────────────────
 * Optimistic updates are a pattern where you update the cache BEFORE the server
 * responds, giving users instant feedback. If the server fails, you roll back.
 * This uses the onMutate callback to update cache before the request, and onError
 * to rollback if something goes wrong. It dramatically improves UX for fast APIs.
 *
 * HOW IT WORKS UNDER THE HOOD
 * ────────────────────────────
 * When you call mutate(), onMutate runs first — save current cache and update it
 * optimistically. Then mutationFn executes. If it succeeds, the optimistic update
 * stays (or is replaced with server response). If it fails, onError rolls back the
 * cache to the previous state saved in onMutate. The user sees instant changes,
 * then either permanent success or a quick rollback.
 *
 * NEXT.JS CONCEPT
 * ───────────────
 * This interactive page demonstrates client-side UX patterns: optimistic rendering
 * where the UI updates instantly, enhancing perceived performance. This is a
 * client-only pattern in Next.js.
 *
 * WHEN TO USE THIS
 * ────────────────
 * Use optimistic updates for operations that are very likely to succeed:
 * liking posts, toggling favorites, reordering items. If your API regularly fails,
 * don't use optimistic updates. Always provide rollback feedback ("Rolled back").
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updatePost, fetchPosts, Post } from "@/lib/api";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function TQ08Optimistic(): JSX.Element {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [message, setMessage] = useState("");

  // Fetch posts
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  // Mutation with optimistic update
  const updatePostMutation = useMutation({
    mutationFn: (variables: { id: number; title: string }) =>
      updatePost(variables.id, { title: variables.title }),

    onMutate: async (variables) => {
      // Cancel any ongoing refetches
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // Save previous data for rollback
      const previousPosts = queryClient.getQueryData(["posts"]);

      // Optimistically update the cache
      queryClient.setQueryData(["posts"], (oldPosts: Post[] | undefined) => {
        if (!oldPosts) return oldPosts;
        return oldPosts.map((post) =>
          post.id === variables.id
            ? { ...post, title: variables.title }
            : post
        );
      });

      setMessage("✓ Updating optimistically...");

      return { previousPosts }; // Return context for rollback
    },

    onError: (_error, _variables, context) => {
      // Rollback to previous data
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
      setMessage("❌ Update failed — rolled back!");
    },

    onSuccess: (data, variables) => {
      setMessage("✓ Update confirmed by server!");
      setEditingId(null);
      setEditTitle("");

      // Optional: replace optimistic data with server response
      queryClient.setQueryData(["posts"], (oldPosts: Post[] | undefined) => {
        if (!oldPosts) return oldPosts;
        return oldPosts.map((post) =>
          post.id === variables.id ? { ...post, ...data } : post
        );
      });
    },

    onSettled: () => {
      // Optional: invalidate and refetch to sync with server
      // queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
  };

  const handleSave = () => {
    if (editingId && editTitle) {
      updatePostMutation.mutate({
        id: editingId,
        title: editTitle,
      });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditTitle("");
    setMessage("");
  };

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="TQ-08"
          featureName="Optimistic Updates"
          tanstackConcept="Optimistic updates update the UI before the server responds, giving instant feedback. If the mutation fails, TanStack Query rolls back to the previous state. This dramatically improves perceived performance for operations that usually succeed."
          howItWorks="Uses onMutate callback to save current cache and update it optimistically. Then mutationFn runs. On success, optimistic update stays. On error, onError uses the saved context to rollback the cache to its previous state."
          nextjsConcept="This interactive page demonstrates a core UX pattern in modern web apps: instant feedback to user actions in client components. TanStack Query handles the complex cache synchronization automatically."
          whenToUse="Use optimistic updates for operations likely to succeed: like/unlike, favorite/unfavorite, toggle settings. Avoid for operations with high failure rates. Always provide rollback feedback so users know if something failed."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Interactive Example: Edit Posts with Optimistic Updates
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

          {/* Posts List */}
          {postsQuery.isLoading && (
            <p className="text-blue-600">🔄 Loading posts...</p>
          )}

          {postsQuery.data && (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {postsQuery.data.slice(0, 5).map((post: Post) => (
                <div
                  key={post.id}
                  className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  {editingId === post.id ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        disabled={updatePostMutation.isPending}
                        className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          disabled={
                            updatePostMutation.isPending ||
                            !editTitle
                          }
                          className="px-4 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
                        >
                          {updatePostMutation.isPending ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={handleCancel}
                          disabled={updatePostMutation.isPending}
                          className="px-4 py-1 bg-gray-400 text-white rounded text-sm hover:bg-gray-500 disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        #{post.id}: {post.title}
                      </h4>
                      <p className="text-gray-700 text-sm mb-3">{post.body}</p>
                      <button
                        onClick={() => handleEdit(post)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Edit Title
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Information Box */}
          <div className="mt-6 p-6 bg-blue-50 border-l-4 border-blue-500 rounded">
            <h3 className="font-semibold text-blue-900 mb-3">
              ✨ How Optimistic Updates Work Here
            </h3>
            <ol className="space-y-2 text-blue-900 text-sm">
              <li>
                <strong>1. You click "Edit Title"</strong> — Post enters edit mode
              </li>
              <li>
                <strong>2. You modify the title</strong> — Still local only
              </li>
              <li>
                <strong>3. You click "Save"</strong> — Mutation triggers
              </li>
              <li>
                <strong>4. onMutate runs:</strong> Cache is updated
                IMMEDIATELY. You see the new title right away.
              </li>
              <li>
                <strong>5. API request starts</strong> — Server is contacted
              </li>
              <li>
                <strong>6. If success:</strong> Update confirmed, title stays
                changed
              </li>
              <li>
                <strong>7. If error:</strong> onError rolls back the cache.
                Title reverts to old value with "rolled back" message.
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
              Full Optimistic Update Pattern
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const mutation = useMutation({
  mutationFn: (variables) => api.updatePost(variables.id, variables.data),

  // BEFORE API call: Update cache immediately
  onMutate: async (variables) => {
    // 1. Cancel any ongoing refetches for this query
    await queryClient.cancelQueries({ queryKey: ["posts"] });

    // 2. Save previous cache for rollback
    const previousPosts = queryClient.getQueryData(["posts"]);

    // 3. Update cache optimistically
    queryClient.setQueryData(["posts"], (oldPosts) =>
      oldPosts.map((post) =>
        post.id === variables.id
          ? { ...post, title: variables.data.title }
          : post
      )
    );

    // Return context for rollback
    return { previousPosts };
  },

  // IF API FAILS: Rollback
  onError: (error, variables, context) => {
    if (context?.previousPosts) {
      // Revert cache to previous state
      queryClient.setQueryData(["posts"], context.previousPosts);
    }
  },

  // IF API SUCCEEDS: Optional final sync
  onSuccess: (data, variables) => {
    // Optional: sync optimistic data with server response
  },
});`}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Trigger the Mutation
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const handleSave = () => {
  mutation.mutate({
    id: postId,
    data: { title: newTitle },
  });
  // onMutate runs → cache updates instantly
  // User sees new title immediately
  // Then API request starts
  // If error, onError rolls back
};`}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Mutation Callbacks Timeline
            </h3>
            <div className="space-y-3 text-sm font-mono">
              <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                <p className="font-semibold text-purple-900">
                  1. mutate() called
                </p>
              </div>
              <div className="ml-4 border-l-2 border-gray-300 pl-4 py-2">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="font-semibold text-blue-900">
                    2. onMutate() → Update cache optimistically
                  </p>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-gray-300 pl-4 py-2">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="font-semibold text-yellow-900">
                    3. mutationFn() → Make API request
                  </p>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-gray-300 pl-4 py-2">
                <div className="flex gap-2">
                  <div className="flex-1 p-3 bg-green-50 border border-green-200 rounded">
                    <p className="font-semibold text-green-900">
                      4a. onSuccess() ✓
                    </p>
                  </div>
                  <div className="flex-1 p-3 bg-red-50 border border-red-200 rounded">
                    <p className="font-semibold text-red-900">
                      4b. onError() ✗
                    </p>
                  </div>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-gray-300 pl-4 py-2">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <p className="font-semibold text-gray-900">
                    5. onSettled() → Clean up (both paths)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="font-semibold text-lg mb-3 text-blue-900">
              Critical Points
            </h3>
            <ul className="space-y-2 text-blue-900 text-sm">
              <li>
                ✓ onMutate runs BEFORE the API call — update cache immediately
              </li>
              <li>
                ✓ Return context from onMutate so onError can access previous data
              </li>
              <li>
                ✓ Always provide user feedback (success message, rollback message)
              </li>
              <li>
                ✓ Cancel pending refetches in onMutate to prevent race conditions
              </li>
              <li>
                ✓ Only use optimistic updates for operations that rarely fail
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-yellow-900">
            📝 Next Step
          </h3>
          <p className="text-yellow-900">
            Now that you understand optimistic updates, move to <strong>M-03 — Query Invalidation</strong> to learn
            how to keep cache in sync after mutations!
          </p>
        </section>
      </div>
    </>
  );
}
