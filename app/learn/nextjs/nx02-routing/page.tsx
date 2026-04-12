/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NX-02 — File-Based Routing
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * NEXT.JS CONCEPT
 * ───────────────
 * File-based routing means your folder structure automatically becomes your URLs.
 * Every page.tsx file is a route. Nested folders create nested URLs. This is how
 * Next.js works by default - no need for a router config file like traditional SPAs.
 *
 * HOW IT WORKS UNDER THE HOOD
 * ────────────────────────────
 * When Next.js builds, it scans the /app directory and creates a route for every
 * page.tsx it finds. The folder path becomes the URL path. Folders starting with
 * parentheses () are route groups (don't appear in URL). Square brackets [] create
 * dynamic segments. Special files like layout.tsx, error.tsx, loading.tsx wrap routes.
 *
 * ROUTING PATTERNS
 * ────────────────
 * Static route: /app/learn/page.tsx → /learn
 * Dynamic route: /app/posts/[id]/page.tsx → /posts/123, /posts/456, etc.
 * Catch-all: /app/docs/[...slug]/page.tsx → /docs/a/b/c, /docs/x/y, etc.
 * Optional: /app/posts/[[...slug]]/page.tsx → /posts OR /posts/any/path
 *
 * WHEN TO USE THIS
 * ────────────────
 * Always! This is how Next.js routing works. Organize your pages by their URL structure.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function NX02Routing(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>

        <CodeNote
          featureCode="NX-02"
          featureName="File-Based Routing"
          tanstackConcept="N/A"
          howItWorks="Next.js scans the /app directory and creates routes based on file structure. page.tsx files become accessible routes. Folders become URL segments. Special files like layout.tsx, error.tsx, and loading.tsx provide structure and error handling. Dynamic segments use square brackets [id], catch-alls use [...slug]."
          nextjsConcept="File-based routing is the foundation of Next.js. Your folder structure directly maps to URLs. No route configuration needed. This is opposite of traditional React apps where you define routes in code."
          whenToUse="Always organize your pages using Next.js file-based routing. Think about the URL structure first, then create folders and page.tsx files to match."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Routing Examples</h2>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Static Routes</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">File Path</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">URL</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm">app/page.tsx</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm">/</td>
                    <td className="border border-gray-300 px-4 py-2">Home page</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm">app/learn/page.tsx</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm">/learn</td>
                    <td className="border border-gray-300 px-4 py-2">Learn hub</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm">app/learn/nextjs/page.tsx</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm">/learn/nextjs</td>
                    <td className="border border-gray-300 px-4 py-2">Nested route</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Dynamic Routes</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">File Path</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">URL Examples</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Params Access</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm">app/posts/[id]/page.tsx</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm">/posts/1, /posts/hello</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm">params.id</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm">app/docs/[...slug]/page.tsx</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm">/docs/a/b/c</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm">params.slug = ['a', 'b', 'c']</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Code Example</h3>
          <pre className="bg-gray-900 text-white p-6 rounded-lg overflow-x-auto text-sm mb-6">
{`// app/posts/[id]/page.tsx
export default async function Post({ params }: { params: { id: string } }) {
  const post = await fetch(\`/api/posts/\${params.id}\`).then(r => r.json());
  
  return <div>{post.title}</div>;
}

// Access at /posts/1, /posts/2, etc.
// params.id automatically contains the dynamic segment value`}
          </pre>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <h4 className="font-semibold text-green-900 mb-2">✅ Key Takeaways</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Folder structure = URL structure (intuitive and self-documenting)</li>
              <li>• page.tsx files make routes public and accessible</li>
              <li>• Dynamic segments [id] create catch-all routes for that segment</li>
              <li>• Catch-alls [...slug] match any number of nested segments</li>
              <li>• Optional segments [[...slug]] make the catch-all optional</li>
              <li>• Route groups (folders in parentheses) organize without affecting URLs</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
