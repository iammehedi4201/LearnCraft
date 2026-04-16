"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function NX05Dynamic(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>
        <CodeNote
          featureCode="NX-05"
          featureName="Dynamic Routes"
          tanstackConcept="N/A"
          howItWorks="Square brackets [id] create dynamic segments. /app/posts/[id]/page.tsx creates a route that matches /posts/123, /posts/abc, etc. The value is available via params.id. Catch-alls [...slug] match any number of segments."
          nextjsConcept="Dynamic routes use folder names in square brackets. The matched value becomes a parameter accessible in the component. This is how Next.js handles URL parameters without route definitions."
          whenToUse="Use dynamic routes for detail pages, user profiles, product pages, or any URL-parameterized content."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white dark:text-white">Dynamic Route Patterns</h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Single Dynamic Segment</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-4">
{`// File: app/posts/[id]/page.tsx
export default async function Post({ params }: { params: { id: string } }) {
  const post = await fetch(\`/api/posts/\${params.id}\`).then(r => r.json());
  
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

// Matches:
// /posts/1        → params.id = "1"
// /posts/hello    → params.id = "hello"
// /posts/123abc   → params.id = "123abc"`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Multiple Dynamic Segments</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-4">
{`// File: app/users/[userId]/posts/[postId]/page.tsx
export default async function UserPost({ params }) {
  return (
    <div>
      <p>User: {params.userId}</p>
      <p>Post: {params.postId}</p>
    </div>
  );
}

// Matches:
// /users/1/posts/100        → params = { userId: "1", postId: "100" }
// /users/john/posts/my-post → params = { userId: "john", postId: "my-post" }`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Catch-All Routes</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-4">
{`// File: app/docs/[...slug]/page.tsx
export default async function Docs({ params }) {
  // [...slug] captures all remaining segments as an array
  return <div>Path: {params.slug?.join('/')}</div>;
}

// Matches:
// /docs/getting-started         → params.slug = ["getting-started"]
// /docs/api/v1/auth            → params.slug = ["api", "v1", "auth"]
// /docs/guides/installation/mac → params.slug = ["guides", "installation", "mac"]`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Optional Catch-All Routes</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-4">
{`// File: app/blog/[[...slug]]/page.tsx
export default async function Blog({ params }) {
  const slug = params.slug?.join('/') || 'home';
  return <div>Blog: {slug}</div>;
}

// Matches:
// /blog                 → params.slug = undefined
// /blog/2024            → params.slug = ["2024"]
// /blog/2024/01/first   → params.slug = ["2024", "01", "first"]`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 dark:bg-green-950/20 border-l-4 border-green-500 p-4 rounded mt-6">
            <h4 className="font-semibold text-green-900 dark:text-green-400 dark:text-green-400 mb-2">✅ Key Takeaways</h4>
            <ul className="space-y-2 text-gray-700 dark:text-slate-300 dark:text-slate-300">
              <li>• [id] creates a dynamic segment matching any single value</li>
              <li>• [...slug] is a catch-all matching any remaining path segments</li>
              <li>• [[...slug]] is optional catch-all (matches route with or without segments)</li>
              <li>• Multiple [bracket] segments can be combined</li>
              <li>• Dynamic segments are passed via params object to the component</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
