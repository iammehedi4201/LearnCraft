/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * P-03 — useInfiniteQuery
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * TANSTACK QUERY CONCEPT: useInfiniteQuery is for infinite scroll. Instead of
 * page numbers, it uses a cursor/pageParam. fetchNextPage() appends more data
 * to the list. hasNextPage tells you when to stop loading.
 *
 * HOW IT WORKS: queryFn receives pageParam (cursor). First call has pageParam=0.
 * queryFn returns { items, nextCursor }. TanStack Query caches all pages together
 * under one queryKey. fetchNextPage() increments cursor and appends new items.
 *
 * NEXT.JS CONCEPT: Infinite scroll is common in modern apps (Twitter, Instagram).
 * Implemented in client components with scroll events or Intersection Observer.
 *
 * WHEN TO USE: Social feeds, search results with "load more", chat messages.
 * Not traditional pagination (use P-01 for that).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchInfinitePosts, Post } from "@/lib/api";
import { useRef, useEffect } from "react";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function P03InfiniteQuery(): JSX.Element {
  const observerTarget = useRef<HTMLDivElement>(null);

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["posts-infinite"],
    queryFn: ({ pageParam = 0 }) => fetchInfinitePosts(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CodeNote
          featureCode="P-03"
          featureName="useInfiniteQuery"
          tanstackConcept="useInfiniteQuery loads data incrementally using a cursor (pageParam). fetchNextPage() appends more data. hasNextPage tells when to stop. Perfect for infinite scroll feeds."
          howItWorks="queryFn receives pageParam (cursor). Returns {items, nextCursor}. TanStack Query stores all pages under one queryKey. fetchNextPage() increments cursor and appends new items to data.pages array."
          nextjsConcept="Infinite scroll uses Intersection Observer (or scroll events) to detect when user scrolls to bottom, then calls fetchNextPage(). This is a client-side pattern common in modern web apps."
          whenToUse="Use for social feeds, search results with dynamic loading, chat messages, or any list where users expect infinite scrolling. Not for traditional page numbers."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Infinite Scroll (Scroll to Load More)
          </h2>

          {/* Status */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-white rounded border">
              <p className="text-xs text-gray-600">Posts Loaded</p>
              <p className="font-bold text-2xl">{allPosts.length}</p>
            </div>
            <div className="p-4 bg-white rounded border">
              <p className="text-xs text-gray-600">Pages Loaded</p>
              <p className="font-bold text-2xl">{data?.pages.length || 0}</p>
            </div>
            <div className="p-4 bg-white rounded border">
              <p className="text-xs text-gray-600">Has More?</p>
              <p className="font-bold text-lg">{hasNextPage ? "Yes" : "No"}</p>
            </div>
          </div>

          {/* Initial Loading */}
          {isLoading && (
            <div className="p-6 text-center bg-blue-50 rounded border border-blue-200">
              <p className="text-blue-600 font-semibold">🔄 Loading first page...</p>
            </div>
          )}

          {/* Posts List */}
          {allPosts.length > 0 && (
            <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
              {allPosts.map((post: Post) => (
                <div key={post.id} className="p-4 bg-white rounded border border-gray-200">
                  <h4 className="font-semibold text-gray-900">#{post.id}: {post.title}</h4>
                  <p className="text-gray-700 text-sm mt-1">{post.body}</p>
                </div>
              ))}

              {/* Intersection Observer Target */}
              <div
                ref={observerTarget}
                className="p-6 text-center bg-purple-50 border-2 border-purple-200 rounded"
              >
                {isFetchingNextPage ? (
                  <p className="text-purple-600 font-semibold">⬇️ Loading more posts...</p>
                ) : hasNextPage ? (
                  <p className="text-purple-600 text-sm">Scroll down to load more</p>
                ) : (
                  <p className="text-gray-600">No more posts to load</p>
                )}
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-900">
              <strong>💡 How it works:</strong> Scroll down in the posts list. When
              the "Load more" indicator comes into view, fetchNextPage() is triggered
              automatically. More posts appear without clicking anything!
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Implementation</h2>
          <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
  queryKey: ["posts"],
  queryFn: ({ pageParam = 0 }) => fetchInfinitePosts(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextCursor,
  initialPageParam: 0,
});

// Intersection Observer for infinite scroll
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });
  observer.observe(targetElement);
}, [hasNextPage, fetchNextPage]);

// Flatten all posts from all pages
const allPosts = data?.pages.flatMap(page => page.posts) ?? [];`}
          </pre>
        </section>

        <section className="mt-12 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-lg text-green-900 mb-3">
            🎓 Pagination Complete!
          </h3>
          <p className="text-green-900 text-sm mb-3">You've learned all pagination patterns:</p>
          <ul className="text-green-900 text-sm space-y-1">
            <li>✓ P-01: Traditional pagination</li>
            <li>✓ P-02: Smooth transitions with placeholderData</li>
            <li>✓ P-03: Infinite scroll with useInfiniteQuery</li>
          </ul>
        </section>
      </div>
    </>
  );
}
