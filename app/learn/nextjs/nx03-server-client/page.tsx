/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NX-03 — Server vs Client Components
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * NEXT.JS CONCEPT
 * ───────────────
 * Next.js 13+ uses React Server Components (RSC) by default. Components run on the
 * server, execute async code directly, and never ship JavaScript to the client.
 * Client components (marked with "use client") run in the browser and can use hooks.
 *
 * HOW IT WORKS UNDER THE HOOD
 * ────────────────────────────
 * By default, every page.tsx is a Server Component. It renders once on the server,
 * sends HTML to the client. It can access databases, APIs, and secrets. When you
 * add "use client" directive at the top, that component and its children become
 * interactive, can use React hooks, and ship JavaScript to the browser.
 *
 * TRADE-OFFS
 * ──────────
 * Server Components: Great for data fetching, security, initial performance
 * Client Components: Required for interactivity (forms, events, hooks)
 * Best Practice: Use Server Components as default, reach for Client when needed
 *
 * WHEN TO USE THIS
 * ────────────────
 * Server Components: pages, layouts, data fetching, database calls
 * Client Components: buttons, forms, useState, useEffect, hooks
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function NX03ServerClient(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>

        <CodeNote
          featureCode="NX-03"
          featureName="Server vs Client Components"
          tanstackConcept="N/A"
          howItWorks="By default, Next.js pages are Server Components. They run on the server, execute async code, access databases directly. Adding 'use client' directive converts a component and its children to Client Components that run in the browser with full JavaScript bundle and React hooks available."
          nextjsConcept="React Server Components (RSC) are a Next.js innovation. Server Components default to no JavaScript in browser. Client Components (marked 'use client') inject JavaScript and enable interactivity. This hybrid approach balances performance and functionality."
          whenToUse="Use Server Components by default (better performance). Use Client Components only when you need interactivity, hooks, or browser APIs."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white dark:text-white">Server vs Client Comparison</h2>

          <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg overflow-hidden mb-6">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b border-gray-300 px-4 py-2 text-left">Feature</th>
                  <th className="border-b border-gray-300 px-4 py-2 text-left">Server</th>
                  <th className="border-b border-gray-300 px-4 py-2 text-left">Client</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-200 dark:border-slate-800 dark:border-slate-800">
                  <td className="px-4 py-3 font-semibold">JavaScript to Browser</td>
                  <td className="px-4 py-3">❌ None</td>
                  <td className="px-4 py-3">✅ Full bundle</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-slate-800 dark:border-slate-800 bg-gray-50">
                  <td className="px-4 py-3 font-semibold">React Hooks</td>
                  <td className="px-4 py-3">❌ No (useState, useEffect)</td>
                  <td className="px-4 py-3">✅ Yes</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-slate-800 dark:border-slate-800">
                  <td className="px-4 py-3 font-semibold">Database Access</td>
                  <td className="px-4 py-3">✅ Direct</td>
                  <td className="px-4 py-3">❌ Via API only</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-slate-800 dark:border-slate-800 bg-gray-50">
                  <td className="px-4 py-3 font-semibold">Secrets/API Keys</td>
                  <td className="px-4 py-3">✅ Safe</td>
                  <td className="px-4 py-3">❌ Exposed</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-slate-800 dark:border-slate-800">
                  <td className="px-4 py-3 font-semibold">Browser APIs</td>
                  <td className="px-4 py-3">❌ No (window, localStorage)</td>
                  <td className="px-4 py-3">✅ Yes</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-semibold">Initial Load Performance</td>
                  <td className="px-4 py-3">✅ Excellent</td>
                  <td className="px-4 py-3">⚠️ Slower</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Code Examples</h3>

          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-950/20 dark:bg-blue-950/20 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 dark:text-blue-400 dark:text-blue-400 mb-3">🖥️ Server Component (Default)</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/posts/page.tsx - No "use client" = Server Component
export default async function Posts() {
  // ✅ Can use await directly
  const posts = await fetch('http://api.example.com/posts').then(r => r.json());
  
  // ✅ Can access database directly
  // const posts = await db.posts.findAll();
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}`}
              </pre>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h4 className="font-semibold text-purple-900 mb-3">🌐 Client Component</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/counter/page.tsx - Has "use client" = Client Component
"use client";

import { useState } from "react"; // ✅ Can use hooks

export default function Counter() {
  const [count, setCount] = useState(0); // ✅ This works
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}
              </pre>
            </div>

            <div className="bg-green-50 dark:bg-green-950/20 dark:bg-green-950/20 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 dark:text-green-400 dark:text-green-400 mb-3">🎯 Hybrid Pattern (Recommended)</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/products/page.tsx - Server Component for data
export default async function Products() {
  const products = await fetch('http://api.example.com/products')
    .then(r => r.json());
  
  return (
    <div>
      {products.map(product => (
        // ProductCart becomes Client Component for interactivity
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Separate client component for interaction
"use client";
function ProductCard({ product }) {
  const [inCart, setInCart] = useState(false);
  
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => setInCart(!inCart)}>
        {inCart ? 'Remove' : 'Add to Cart'}
      </button>
    </div>
  );
}`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 dark:bg-green-950/20 border-l-4 border-green-500 p-4 rounded mt-6">
            <h4 className="font-semibold text-green-900 dark:text-green-400 dark:text-green-400 mb-2">✅ Key Takeaways</h4>
            <ul className="space-y-2 text-gray-700 dark:text-slate-300 dark:text-slate-300">
              <li>• Server Components are the default - better for data fetching and security</li>
              <li>• Use "use client" directive only when you need interactivity</li>
              <li>• Server Components send zero JavaScript to the browser</li>
              <li>• Client Components are required for hooks (useState, useEffect, etc.)</li>
              <li>• Secrets and database access are safe in Server Components</li>
              <li>• Combine both: Server Components for data, Client for UI interactivity</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
