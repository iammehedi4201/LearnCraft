/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TQ-22 — SSR with HydrationBoundary
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * TANSTACK QUERY CONCEPT: HydrationBoundary (Suspense-integrated SSR pattern)
 * allows server-side fetching with TanStack Query, then hydrates on client.
 * Requires dehydrate() on server, HydrationBoundary on client.
 *
 * PATTERN: Fetch data server-side → dehydrate → send to client → hydrate.
 * Client components wrap in HydrationBoundary with dehydrated state.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPosts, Post } from "@/lib/api";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function TQ22SSR(): JSX.Element {
  const postsQuery = useQuery({
    queryKey: ["posts", "ssr"],
    queryFn: () => fetchPosts(),
  });

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="TQ-22"
          featureName="SSR with HydrationBoundary"
          tanstackConcept="HydrationBoundary enables server-side fetching with TanStack Query. Fetch on server, dehydrate, ship to client, hydrate → instant data. Avoids waterfall requests."
          howItWorks="Server: fetch data, dehydrate QueryClient. Client: wrap page in HydrationBoundary with dehydrated state. Query mounts with cached data already set. No refetch initially."
          nextjsConcept="Next.js App Router best practice: fetch data on server when possible (Server Components), hydrate on client for interactive features."
          whenToUse="Use for initial page load data. Fetch on server (faster, secure), hydrate on client (instant display, then refetch if stale). Combines SSR benefits with client interactivity."
        />

        <section className="mt-12">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-lg mb-4">Posts (Hydrated from Server)</h3>
            {postsQuery.isLoading && <p className="text-blue-600">Loading...</p>}
            {postsQuery.data && (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {postsQuery.data.slice(0, 5).map((post: Post) => (
                  <p key={post.id} className="text-sm text-gray-700">
                    • {post.title.substring(0, 50)}...
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded text-sm text-blue-900">
            <p><strong>💡 In a real app:</strong> This data would be fetched on the server using getQueryClient(), dehydrated, and sent to the client. The component would wrap in HydrationBoundary({"{ state }"}) for instant data.</p>
          </div>

          <pre className="mt-6 bg-gray-900 text-white p-4 rounded overflow-x-auto text-xs">
{`// Server: app/posts/page.tsx (Server Component)
import { queryClient } from '@/lib/query-client';
import { dehydrate } from '@tanstack/react-query';
import PostsClient from './posts-client';

export default async function PostsPage() {
  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PostsClient />
    </HydrationBoundary>
  );
}`}
          </pre>
        </section>
      </div>
    </>
  );
}
