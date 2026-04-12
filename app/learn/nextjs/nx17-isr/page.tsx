"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function NX17ISR(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>

        <CodeNote
          featureCode="NX-17"
          featureName="Incremental Static Regeneration (ISR)"
          tanstackConcept="N/A"
          howItWorks="ISR combines benefits of static pages with dynamic content. Pages are pre-rendered and served instantly, but revalidated on a schedule or on-demand. Cache is invalidated when specified time passes or manually via webhook."
          nextjsConcept="ISR is the sweet spot between SSG and SSR. Get static performance but with fresh data. Pages update without full rebuild. Perfect for frequently updated content."
          whenToUse="Blog posts, news, e-commerce catalogs, any content that updates periodically but not constantly."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">ISR Patterns</h2>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Time-Based Revalidation</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/articles/[id]/page.tsx
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const articles = await fetch('api.example.com/articles')
    .then(r => r.json());
  
  return articles.map(a => ({ id: a.id.toString() }));
}

export default async function Article({ params }) {
  const article = await fetch(\`api.example.com/articles/\${params.id}\`)
    .then(r => r.json());

  return <article><h1>{article.title}</h1></article>;
}

// Timeline:
// 1. Build time: All articles pre-generated and cached
// 2. User visits: Gets instant cached HTML
// 3. After 1 hour: Next visitor triggers regeneration in background
// 4. Old cache still served during regeneration
// 5. New HTML replaces old cache`}
              </pre>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">On-Demand Revalidation</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  // Verify secret token
  const token = request.headers.get('x-revalidate-token');
  if (token !== process.env.REVALIDATE_TOKEN) {
    return new Response('Invalid token', { status: 401 });
  }

  const path = await request.json();

  // Revalidate specific paths immediately
  revalidatePath(path);
  
  return Response.json({ revalidated: true, now: Date.now() });
}

// From your CMS: POST /api/revalidate with path
// Example: POST /api/revalidate body: { "path": "/articles/my-post" }
// Instantly refreshes that page`}
              </pre>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Per-Fetch Revalidation</h3>
              <pre className="bg-gray-900 text-white p4 rounded text-sm overflow-x-auto">
{`// app/page.tsx - Different revalidation times per fetch

export default async function HomePage() {
  // Fresh every 1 hour
  const blogs = await fetch('api.example.com/blogs', {
    next: { revalidate: 3600 }
  }).then(r => r.json());

  // Fresh every 5 minutes (more frequently updated)
  const featured = await fetch('api.example.com/featured', {
    next: { revalidate: 300 }
  }).then(r => r.json());

  // Never cache - always fresh
  const realtime = await fetch('api.example.com/stock-prices', {
    next: { revalidate: 0 }
  }).then(r => r.json());

  return <div>{/* Render with all data */}</div>;
}`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mt-6">
            <h4 className="font-semibold text-green-900 mb-2">✅ Key Takeaways</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• ISR = static performance + fresh content</li>
              <li>• Pages revalidate on schedule (time-based)</li>
              <li>• On-demand revalidation via webhooks</li>
              <li>• Old cache served during regeneration (no downtime)</li>
              <li>• Different revalidation times per fetch</li>
              <li>• Perfect for frequently updated content at scale</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
