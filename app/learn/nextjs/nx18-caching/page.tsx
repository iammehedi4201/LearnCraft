"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function NX18CacheControl(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>

        <CodeNote
          featureCode="NX-18"
          featureName="Caching & Revalidation"
          tanstackConcept="N/A"
          howItWorks="Next.js caches fetch requests and generated pages. Use revalidate option or revalidatePath/revalidateTag functions to clear cache. Cache is automatically invalidated on deploy."
          nextjsConcept="Next.js provides built-in caching for requests and pages. Cache duration is configurable. Can revalidate on-demand programmatically without redeploy."
          whenToUse="Control caching for API calls, pages, and static assets."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white dark:text-white">Cache Control</h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Fetch-Level Caching</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/page.tsx
const res = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 } // Cache for 1 hour
});

// Or:
const res = await fetch('https://api.example.com/data', {
  next: { revalidate: 0 } // No cache, always fresh
});

// Or use tags for group revalidation:
const res = await fetch('https://api.example.com/posts',  {
  next: { tags: ['posts'] }
});

// Then revalidate all 'posts' tagged fetches:
// revalidateTag('posts')  // Clears all fetches tagged 'posts'`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Page-Level Caching</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/products/page.tsx
export const revalidate = 3600; // This page revalidates every hour

// Or:
export const dynamic = 'force-dynamic'; // Always fresh (no cache)

// Or use segments:
export const dynamicParams = true; // Allow unknown dynamic params`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Manual Revalidation</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  const data = await request.json();

  if (data.type === 'path') {
    // Revalidate specific path
    revalidatePath(data.path);
  }

  if (data.type === 'tag') {
    // Revalidate all requests with this tag
    revalidateTag(data.tag);
  }

  return Response.json({ revalidated: true });
}

// Usage from CMS:
// POST /api/revalidate { "type": "tag", "tag": "posts" }
// ALL posts-tagged fetches are immediately invalidated`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Cache Strategies</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// 1. Static (best): Cache indefinitely
export const revalidate = false; // or omit
// Use for: docs, blog posts, never-changing content

// 2. ISR: Cache with periodic refresh
export const revalidate = 3600; // Revalidate hourly
// Use for: blog posts, product listings

// 3. Dynamic: Always fresh
export const revalidate = 0;

// Or:
export const dynamic = 'force-dynamic';
// Use for: real-time data, personalized content

// 4. On-demand: Cache with manual invalidation
export const revalidate = 86400; // Cache for 1 day
// Then invalidate via webhook when content updates
// Use for: CMSes, admin changes`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 dark:bg-green-950/20 border-l-4 border-green-500 p-4 rounded mt-6">
            <h4 className="font-semibold text-green-900 dark:text-green-400 dark:text-green-400 mb-2">✅ Key Takeaways</h4>
            <ul className="space-y-2 text-gray-700 dark:text-slate-300 dark:text-slate-300">
              <li>• Next.js caches fetch requests and pages automatically</li>
              <li>• Use next.revalidate to control cache duration</li>
              <li>• Use tags for group invalidation</li>
              <li>• revalidatePath() clears specific paths</li>
              <li>• revalidateTag() clears tagged requests</li>
              <li>• Combine strategies for optimal performance</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
