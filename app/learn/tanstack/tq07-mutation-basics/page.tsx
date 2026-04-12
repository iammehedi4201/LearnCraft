/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TQ-07 — useMutation Basics
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * TANSTACK QUERY CONCEPT
 * ─────────────────────
 * useMutation is the hook for write operations: POST, PUT, PATCH, DELETE.
 * Unlike useQuery which runs automatically, mutations are triggered manually.
 * It provides isLoading, error, data, and other state for handling submission,
 * success, and error feedback. Mutations often invalidate related queries to
 * keep cache in sync after an API write.
 *
 * HOW IT WORKS UNDER THE HOOD
 * ────────────────────────────
 * A mutation is a function that runs synchronously (when you call mutate()). It
 * executes the mutationFn with variables you pass. While running, isPending is
 * true, and the status is "pending". On success, data contains the response.
 * On error, the error object is populated. Mutations don't cache results like
 * queries do — each call is independent.
 *
 * NEXT.JS CONCEPT
 * ───────────────
 * This page demonstrates interactive form submission in a client component.
 * When the user clicks "Create Post", useMutation.mutate() is called, triggering
 * the API mutation. Loading/error/success states drive the UI rendering.
 *
 * WHEN TO USE THIS
 * ────────────────
 * Use useMutation for any write operation: creating posts, updating profiles,
 * deleting items, or any action that modifies server state. The key difference
 * from useQuery is that mutations are triggered manually, not automatically.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { useMutation } from "@tanstack/react-query";
import { createPost, Post } from "@/lib/api";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function TQ07MutationBasics(): JSX.Element {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Define the mutation
  const createPostMutation = useMutation({
    mutationFn: (newPost: Omit<Post, "id">) => createPost(newPost),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger the mutation with form data
    createPostMutation.mutate({
      userId: 1,
      title,
      body,
    });
  };

  // Reset form on success
  if (createPostMutation.isSuccess) {
    setTimeout(() => {
      setTitle("");
      setBody("");
      createPostMutation.reset();
    }, 2000);
  }

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="TQ-07"
          featureName="useMutation Basics"
          tanstackConcept="useMutation is for write operations (POST, PUT, DELETE). Unlike useQuery which runs automatically, mutations are triggered manually. It returns isPending, error, data, and other state for handling the async operation."
          howItWorks="A mutation is defined with mutationFn, then triggered by calling mutate(variables). While running, isPending is true. On success, data contains the response. On error, error is populated. Mutations don't cache results; each call is independent."
          nextjsConcept="This client component uses form submission and mutation state to provide feedback. When the user submits, useMutation.mutate() is called, triggering the POST request and updating the UI with loading/error/success states."
          whenToUse="Use useMutation for all write operations: creating posts, updating user profile, deleting items, or any action that modifies server state. Also use after mutations to invalidate related queries to keep cache fresh."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Interactive Example: Create a Post
          </h2>

          {/* Form */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Create a New Post (Demo)
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={createPostMutation.isPending}
                  placeholder="Enter post title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Body *
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  disabled={createPostMutation.isPending}
                  placeholder="Enter post content"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={
                  createPostMutation.isPending || !title || !body
                }
                className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {createPostMutation.isPending ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Submitting...
                  </>
                ) : (
                  "Submit Post"
                )}
              </button>
            </form>
          </div>

          {/* Status Display */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 uppercase">Status</p>
              <p className="font-bold text-lg">
                {createPostMutation.isPending && "🔄 Pending"}
                {createPostMutation.isSuccess && "✓ Success"}
                {createPostMutation.isError && "❌ Error"}
                {!createPostMutation.isPending &&
                  !createPostMutation.isSuccess &&
                  !createPostMutation.isError &&
                  "Idle"}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 uppercase">Response ID</p>
              <p className="font-bold text-lg">
                {createPostMutation.data?.id ?? "—"}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 uppercase">Error</p>
              <p className="font-bold text-lg text-red-600">
                {createPostMutation.error ? "Yes" : "No"}
              </p>
            </div>
          </div>

          {/* Success Message */}
          {createPostMutation.isSuccess && (
            <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded mb-6">
              <h4 className="font-semibold text-green-900 mb-2">
                ✓ Post Created Successfully!
              </h4>
              <div className="text-green-800 text-sm space-y-1">
                <p>
                  <strong>ID:</strong> {createPostMutation.data?.id}
                </p>
                <p>
                  <strong>Title:</strong> {createPostMutation.data?.title}
                </p>
                <p>
                  <strong>User:</strong> {createPostMutation.data?.userId}
                </p>
              </div>
              <p className="text-green-700 text-xs mt-3">
                Form will reset in 2 seconds...
              </p>
            </div>
          )}

          {/* Error Message */}
          {createPostMutation.isError && (
            <div className="p-6 bg-red-50 border-l-4 border-red-500 rounded mb-6">
              <h4 className="font-semibold text-red-900 mb-2">
                ❌ Failed to Create Post
              </h4>
              <p className="text-red-800 text-sm">
                {createPostMutation.error instanceof Error
                  ? createPostMutation.error.message
                  : "An error occurred"}
              </p>
            </div>
          )}

          {/* Info Box */}
          <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-blue-900 font-semibold mb-2">
              ℹ️ About This API
            </p>
            <p className="text-blue-800 text-sm">
              JSONPlaceholder is a mock API — it accepts POST requests but returns
              a simulated ID. In real apps, you'd persist to a database. The key
              concept here is how useMutation manages async state and user feedback.
            </p>
          </div>
        </section>

        {/* Code Breakdown */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            How to Use useMutation
          </h2>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Step 1: Define the Mutation
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const createPostMutation = useMutation({
  mutationFn: (newPost) => createPost(newPost),
  // Optional: onSuccess, onError callbacks
  onSuccess: (data) => {
    console.log("Post created:", data);
  },
  onError: (error) => {
    console.error("Failed:", error);
  },
});`}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Step 2: Trigger with mutate()
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Call mutate() with variables
  createPostMutation.mutate({
    userId: 1,
    title: "New Post",
    body: "Post content",
  });
};`}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Step 3: Handle State
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`{createPostMutation.isPending && <p>Submitting...</p>}
{createPostMutation.isSuccess && <p>✓ Created!</p>}
{createPostMutation.isError && <p>❌ Failed</p>}

// Access response data
if (createPostMutation.data) {
  console.log("New post ID:", createPostMutation.data.id);
}

// Access error
if (createPostMutation.error) {
  console.error("Error:", createPostMutation.error.message);
}`}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Mutation State Properties
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-semibold">isPending</p>
                <p className="text-gray-600">true while mutation is running</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-semibold">isSuccess</p>
                <p className="text-gray-600">true after successful completion</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-semibold">isError</p>
                <p className="text-gray-600">true if mutation failed</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-semibold">data</p>
                <p className="text-gray-600">response from server on success</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-semibold">error</p>
                <p className="text-gray-600">error object if mutation failed</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-semibold">status</p>
                <p className="text-gray-600">"idle" | "pending" | "success" | "error"</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="font-semibold text-lg mb-3 text-blue-900">
              Key Difference: useQuery vs useMutation
            </h3>
            <ul className="space-y-2 text-blue-900 text-sm">
              <li>
                <strong>useQuery:</strong> Runs automatically on mount, caches results,
                used for reads (GET)
              </li>
              <li>
                <strong>useMutation:</strong> Runs on demand (mutate()), doesn't cache,
                used for writes (POST, PUT, DELETE)
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-yellow-900">
            📝 Next Step
          </h3>
          <p className="text-yellow-900">
            Now that you understand useMutation, move to <strong>M-02 — Optimistic Updates</strong> to learn
            how to update UI before the server responds!
          </p>
        </section>
      </div>
    </>
  );
}
