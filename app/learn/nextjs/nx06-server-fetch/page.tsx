"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function NX06ServerFetch(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>
        <CodeNote
          featureCode="NX-06"
          featureName="Server-side Data Fetching"
          tanstackConcept="N/A"
          howItWorks="In Server Components, you can use await directly. Use fetch() to call APIs, or connect to databases. Data is fetched during server rendering. The HTML sent to the browser already contains data. No waterfall or loading states needed."
          nextjsConcept="Server Components are async by default. You can await fetch, database queries, or any async operation. Data fetching happens on the server before the page is sent to the browser, resulting in fast initial loads."
          whenToUse="Always fetch data server-side when possible. It's faster, more secure, and simpler than client-side fetching."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white dark:text-white">Server-side Fetching Patterns</h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Basic Async Fetch</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-4">
{`// app/posts/page.tsx - Server Component (default)
export default async function Posts() {
  // ✅ Can use await directly
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

// HTML sent to browser already contains all posts
// No loading state, no waterfall fetching`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Dynamic Routes with Server Fetch</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-4">
{`// app/posts/[id]/page.tsx
export default async function Post({ params }: { params: { id: string } }) {
  const res = await fetch(\`https://api.example.com/posts/\${params.id}\`);
  const post = await res.json();
  
  // generateStaticParams for prerendering
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

// Generate static pages at build time
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  return posts.map(post => ({
    id: post.id.toString(),
  }));
}`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Error Handling</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-4">
{`// app/posts/page.tsx
export default async function Posts() {
  try {
    const res = await fetch('https://api.example.com/posts');
    
    if (!res.ok) {
      throw new Error(\`Failed: \${res.status}\`);
    }
    
    const posts = await res.json();
    return <div>{/* render posts */}</div>;
  } catch (error) {
    return <div>Error loading posts</div>;
  }
}

// Or use error.tsx for automatic error boundaries`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Revalidation Strategies</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-4">
{`// Set cache duration with next/fetch options
const res = await fetch('https://api.example.com/posts', {
  next: { revalidate: 60 } // Revalidate every 60 seconds (ISR)
});

// Or disable caching
const res = await fetch('https://api.example.com/posts', {
  next: { revalidate: 0 } // Always fresh (like no-cache)
});

// Or use time-based ISR
export const revalidate = 3600; // Page revalidates every hour`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 dark:bg-green-950/20 border-l-4 border-green-500 p-4 rounded mt-6">
            <h4 className="font-semibold text-green-900 dark:text-green-400 dark:text-green-400 mb-2">✅ Key Takeaways</h4>
            <ul className="space-y-2 text-gray-700 dark:text-slate-300 dark:text-slate-300">
              <li>• Server Components can use await directly</li>
              <li>• Fetch in layouts or pages—data loads before HTML is sent</li>
              <li>• No loading states or waterfalls with server-side fetching</li>
              <li>• Data is automatically cached (with revalidate option)</li>
              <li>• Use generateStaticParams() to pre-render dynamic routes</li>
              <li>• Much faster than client-side fetching</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
