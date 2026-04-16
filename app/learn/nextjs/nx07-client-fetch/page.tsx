/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NX-07 — Client-side Data Fetching
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * NEXT.JS CONCEPT
 * ───────────────
 * Client-side fetching means loading data after the page renders in the browser.
 * Use "use client" to create an interactive component, then useEffect to fetch.
 * This is necessary for real-time search, infinite scroll, or user-driven actions.
 *
 * HOW IT WORKS UNDER THE HOOD
 * ────────────────────────────
 * When you mark a component with "use client", it becomes interactive. useEffect is
 * called after render. Inside, you can fetch from APIs. While loading, show a spinner.
 * When data returns, setState updates the component. Perfect for search, filters, etc.
 *
 * WHEN TO USE THIS
 * ────────────────
 * Search forms, filtering, pagination controls, real-time updates, anything that
 * requires user interaction to fetch new data.
 *
 * BEST PRACTICE
 * ──────────────
 * Prefer server-side fetching for initial data. Use client-side for user-driven actions.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function NX07ClientFetch(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch posts based on search
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5`);
      const data = await res.json();
      const filtered = data.filter((post: Post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPosts(filtered);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [searchTerm]);

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>

        <CodeNote
          featureCode="NX-07"
          featureName="Client-side Data Fetching"
          tanstackConcept="N/A"
          howItWorks="Use 'use client' directive to create an interactive component. Inside, use useEffect to fetch data after render. Update state with the results. Show loading state while fetching. Handle errors gracefully. Re-fetch when dependencies change."
          nextjsConcept="Client-side fetching is for interactive, user-driven data loads. Unlike server-side fetching, this happens after the page renders. Users see loading states. Good for search, filters, infinite scroll, or actions that require user input."
          whenToUse="Use for search functionality, filtering, real-time updates, pagination, or any data fetch triggered by user interaction."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white dark:text-white">Live Example: Search Posts</h2>

          <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6 mb-6">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            />

            {isLoading && (
              <div className="text-center py-6">
                <p className="text-gray-600">🔄 Loading posts...</p>
              </div>
            )}

            {!isLoading && posts.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-600">❌ No posts found</p>
              </div>
            )}

            {!isLoading && posts.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">✅ Found {posts.length} posts</p>
                {posts.map((post) => (
                  <div key={post.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:border-slate-800 dark:border-slate-800">
                    <h3 className="font-semibold text-gray-900 dark:text-white dark:text-white">{post.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{post.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Code Examples</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white dark:text-white mb-2">Basic useEffect Pattern</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`"use client";

import { useState, useEffect } from "react";

export default function Posts() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/posts');
        const posts = await res.json();
        setData(posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty deps = runs once on mount

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data?.map(post => <div key={post.id}>{post.title}</div>)}
    </div>
  );
}`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white dark:text-white mb-2">Search/Filter Pattern</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`"use client";

import { useState, useEffect } from "react";

export default function SearchPosts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    const search = async () => {
      setIsSearching(true);
      const res = await fetch(\`/api/posts?q=\${searchTerm}\`);
      const posts = await res.json();
      setResults(posts);
      setIsSearching(false);
    };

    // Debounce: wait 300ms before searching
    const timer = setTimeout(search, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]); // Re-run when searchTerm changes

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      {isSearching && <p>Searching...</p>}
      {results.map(post => <div key={post.id}>{post.title}</div>)}
    </div>
  );
}`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white dark:text-white mb-2">TanStack Query Alternative</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`"use client";

import { useQuery } from "@tanstack/react-query";

export default function Posts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch('/api/posts');
      return res.json();
    },
  });

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading posts</p>}
      {data?.map(post => <div key={post.id}>{post.title}</div>)}
    </div>
  );
}

// Note: TanStack Query handles caching, refetching, deduplication
// Much simpler than managing useEffect and state manually!`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 dark:bg-green-950/20 border-l-4 border-green-500 p-4 rounded mt-6">
            <h4 className="font-semibold text-green-900 dark:text-green-400 dark:text-green-400 mb-2">✅ Key Takeaways</h4>
            <ul className="space-y-2 text-gray-700 dark:text-slate-300 dark:text-slate-300">
              <li>• "use client" required for useEffect and interactive fetching</li>
              <li>• useEffect with empty deps runs once on mount</li>
              <li>• Update dependencies to re-execute the effect</li>
              <li>• Handle loading and error states</li>
              <li>• Consider using TanStack Query for automatic caching/deduplication</li>
              <li>• Prefer server-side fetching when possible (better performance)</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
