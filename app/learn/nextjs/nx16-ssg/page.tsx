"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function NX16SSG(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>

        <CodeNote
          featureCode="NX-16"
          featureName="Static Site Generation (SSG)"
          tanstackConcept="N/A"
          howItWorks="Pages are pre-rendered at build time. Next.js calls your async functions, fetches data, and generates HTML. Result is a static HTML file served instantly. For dynamic routes, use generateStaticParams."
          nextjsConcept="SSG (Static Generation) provides the fastest performance. Pages are pre-built as HTML and served from CDN. Great for blogs, docs, marketing sites. Can revalidate with ISR."
          whenToUse="Content that doesn't change frequently: blogs, documentation, marketing sites, product catalogs."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white dark:text-white">Static Generation</h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Static Page (Default)</h3>
              <pre className="bg-gray-900 text-white p4 rounded text-sm overflow-x-auto">
{`// app/blog/page.tsx
// This page is pre-rendered at build time (SSG)

export default async function BlogList() {
  const posts = await fetch('https://api.example.com/posts')
    .then(r => r.json());

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

// Next.js runs this at build time, creates HTML, and serves it statically`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Dynamic Static Routes</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  // Tell Next.js which routes to pre-generate
  const posts = await fetch('https://api.example.com/posts')
    .then(r => r.json());

  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }) {
  const post = await fetch(\`https://api.example.com/posts/\${params.slug}\`)
    .then(r => r.json());

  return <h1>{post.title}</h1>;
}

// At build time: /blog/first, /blog/second, etc. are pre-generated`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Incremental Static Regeneration (ISR)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/products/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function Products() {
  const products = await fetch('https://api.example.com/products')
    .then(r => r.json());

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

// Initially static, but refreshes data every hourt

// Or per-request basis:
const res = await fetch('...', {
  next: { revalidate: 60 } // This fetch revalidates every 60s
});`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 dark:bg-green-950/20 border-l-4 border-green-500 p-4 rounded mt-6">
            <h4 className="font-semibold text-green-900 dark:text-green-400 dark:text-green-400 mb-2">✅ Key Takeaways</h4>
            <ul className="space-y-2 text-gray-700 dark:text-slate-300 dark:text-slate-300">
              <li>• SSG pages are pre-rendered at build time (fastest)</li>
              <li>• Uses generateStaticParams for dynamic routes</li>
              <li>• ISR allows revalidating at intervals</li>
              <li>• Best for content that doesn't change hourly</li>
              <li>• Can use revalidate prop or fetch option</li>
              <li>• Provides instant page loads from CDN</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
