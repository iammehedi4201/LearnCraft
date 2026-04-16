"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function NX09Loading(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>

        <CodeNote
          featureCode="NX-09"
          featureName="Loading States & loading.tsx"
          tanstackConcept="N/A"
          howItWorks="loading.tsx is a special file that wraps a page with React Suspense. While the page is loading, the loading component is shown. Once the page finishes rendering, it replaces the loading UI. This provides instant feedback to users."
          nextjsConcept="Use loading.tsx for Suspense boundaries. While a page's async operations complete, show a skeleton or spinner. Next.js automatically wraps the page in your loading component using React Suspense."
          whenToUse="Create loading.tsx whenever a page fetches data or has async operations. It dramatically improves perceived performance."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white dark:text-white">Loading States Pattern</h2>

          <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">File Structure</h3>
            <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`app/
├── dashboard/
│   ├── loading.tsx              ← Shows while page is loading
│   ├── page.tsx                 ← The actual page (async)
│   └── layout.tsx
├── posts/
│   ├── loading.tsx              ← Skeleton for posts
│   ├── page.tsx
│   └── [id]/
│       ├── loading.tsx          ← Skeleton for post detail
│       └── page.tsx`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Code Examples</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white dark:text-white mb-2">Simple Loading Skeleton</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

/* This loading component shows while page.tsx is rendering
   Once page.tsx finishes, it replaces the loading UI */`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white dark:text-white mb-2">Async Page with Loading.tsx</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/dashboard/page.tsx (async)
export default async function Dashboard() {
  // While this await is happening, loading.tsx is shown
  const data = await fetch('/api/dashboard').then(r => r.json());
  
  // Once data arrives, this component replaces loading.tsx
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white dark:text-white mb-2">Skeleton Component Pattern</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// components/post-skeleton.tsx
export function PostSkeleton() {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
}

// app/posts/loading.tsx
import { PostSkeleton } from '@/components/post-skeleton';

export default function PostsLoading() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
}`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white dark:text-white mb-2">Suspense Boundaries</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// Fine-grained loading with Suspense

import { Suspense } from 'react';

async function PostList() {
  const posts = await fetchPosts();
  return posts.map(p => <div key={p.id}>{p.title}</div>);
}

async function Comments() {
  const comments = await fetchComments();
  return comments.map(c => <div key={c.id}>{c.text}</div>);
}

export default function Page() {
  return (
    <div>
      <h1>Posts</h1>
      <Suspense fallback={<p>Loading posts...</p>}>
        <PostList />
      </Suspense>

      <h2>Comments</h2>
      <Suspense fallback={<p>Loading comments...</p>}>
        <Comments />
      </Suspense>
    </div>
  );
}

// Each async component shows its own loading state independently`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 dark:bg-green-950/20 border-l-4 border-green-500 p-4 rounded mt-6">
            <h4 className="font-semibold text-green-900 dark:text-green-400 dark:text-green-400 mb-2">✅ Key Takeaways</h4>
            <ul className="space-y-2 text-gray-700 dark:text-slate-300 dark:text-slate-300">
              <li>• loading.tsx shows while page.tsx is rendering</li>
              <li>• Automatically wrapped in React Suspense</li>
              <li>• Use animated skeletons for better UX</li>
              <li>• Each route segment can have its own loading.tsx</li>
              <li>• Use Suspense boundaries for fine-grained loading states</li>
              <li>• Improves perceived performance dramatically</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
