/**
 * A-09 — Complex Mutations with Context
 * Multi-step mutations, variables, context for rollback.
 */

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/lib/api";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function A09ComplexMutations(): JSX.Element {
  const queryClient = useQueryClient();
  const [response, setResponse] = useState("");

  const mutation = useMutation({
    mutationFn: (variables: { title: string; body: string }) =>
      createPost({ userId: 1, title: variables.title, body: variables.body }),

    onMutate: async (_variables) => {
      // Save state for rollback
      return { savedAt: new Date() };
    },

    onSuccess: (data, _variables, _context) => {
      setResponse(`✓ Created post #${data.id}`);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },

    onError: (_error, _variables, _context) => {
      setResponse(`❌ Failed`);
    },
  });

  const handleCreate = () => {
    mutation.mutate({
      title: "New Post",
      body: "Content here",
    });
  };

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="A-09"
          featureName="Complex Mutations"
          tanstackConcept="Mutations support onMutate, onSuccess, onError callbacks with context passing. Perfect for multi-step operations, rollbacks, and side effects."
          howItWorks="onMutate runs first, can return context. mutationFn runs, then onSuccess/onError. Context flows through callbacks for coordinated handling."
          nextjsConcept="Complex async workflows in client components. Especially useful with form submission and multi-step processes."
          whenToUse="Multi-step processes, audit logging, complex rollbacks, coordinated cache updates."
        />

        <section className="mt-12">
          <div className="bg-white p-6 rounded-lg border">
            <button
              onClick={handleCreate}
              disabled={mutation.isPending}
              className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              {mutation.isPending ? "Creating..." : "Create Post"}
            </button>
            {response && (
              <p className="mt-4 font-semibold">{response}</p>
            )}
          </div>

          <pre className="mt-6 bg-gray-900 text-white p-4 rounded overflow-x-auto text-xs">
{`const mutation = useMutation({
  mutationFn: (vars) => api.createPost(vars),

  // 1. Before API call
  onMutate: async (variables) => {
    // Optimistic update, save state
    return { previousData: /* ... */ };
  },

  // 2. On success
  onSuccess: (data, variables, context) => {
    // data: response from server
    // variables: what was sent
    // context: returned from onMutate
    invalidateQueries();
  },

  // 3. On error
  onError: (error, variables, context) => {
    // Rollback using context
  },

  // 4. Always runs
  onSettled: () => {
    // Cleanup
  },
});

mutation.mutate({ title: 'New' });`}
          </pre>
        </section>
      </div>
    </>
  );
}
