/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NX-12 — Metadata & SEO
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * NEXT.JS CONCEPT
 * ───────────────
 * Metadata is HTML head tag content: title, description, Open Graph, Twitter cards.
 * In Next.js, export metadata object from page.tsx or layout.tsx. Next.js automatically
 * generates the head tags. For dynamic
 content, use generateMetadata function.
 *
 * HOW IT WORKS UNDER THE HOOD
 * ────────────────────────────
 * When you export metadata or a generateMetadata function, Next.js calls it and
 * generates the HTML head tags. This happens at build time for static pages or
 * at request time for dynamic content. Metadata cascades: child metadata overrides parent.
 *
 * SEO BENEFITS
 * ────────────
 * Good titles and descriptions improve click-through rates in search results.
 * Open Graph tags control how links look when shared on social media.
 * Twitter cards customize tweet previews. Canonical tags prevent duplicate content.
 *
 * WHEN TO USE THIS
 * ────────────────
 * Always! Metadata is essential for SEO and social sharing. Every page should have it.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function NX12Metadata(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>

        <CodeNote
          featureCode="NX-12"
          featureName="Metadata & SEO"
          tanstackConcept="N/A"
          howItWorks="Export a metadata object from page.tsx or layout.tsx. Next.js generates HTML head tags from it. For dynamic content, export generateMetadata function that receives params and returns metadata."
          nextjsConcept="Next.js Metadata API replaces manually editing HTML head tags. Everything is TypeScript-safe. Supports static and dynamic metadata. Cascades from root layout to pages."
          whenToUse="Every page should have title and description. Use Open Graph for social sharing. Dynamic metadata for pages with variable content."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white dark:text-white">Metadata Examples</h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Static Metadata</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | My App',
  description: 'Welcome to my application',
  keywords: ['nextjs', 'react', 'javascript'],
  openGraph: {
    type: 'website',
    url: 'https://example.com',
    title: 'Home | My App',
    description: 'Welcome to my application',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home | My App',
    description: 'Welcome to my application',
    images: ['https://example.com/og-image.jpg'],
  },
};

export default function Home() {
  return <h1>Welcome</h1>;
}`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Dynamic Metadata</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/posts/[id]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Fetch data for the page
  const post = await fetch(\`/api/posts/\${params.id}\`)
    .then(r => r.json())
    .catch(() => null);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt || post.body.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function Post({ params }) {
  const post = await fetch(\`/api/posts/\${params.id}\`).then(r => r.json());
  return <div>{post.title}</div>;
}`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Root Metadata with Icons</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | My App', // Child page titles
    default: 'My App',
  },
  description: 'My amazing application',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Common Metadata Fields</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// Common SEO-related fields
{
  title: 'Page Title',                    // Browser tab title
  description: 'Short description',       // Search result snippet
  keywords: ['keyword1', 'keyword2'],     // Search keywords
  canonical: 'https://example.com/...',   // Canonical URL (duplicate prevention)
  robots: {
    index: true,                          // Allow indexing
    follow: true,                         // Follow links
    nocache: false,
  },
  openGraph: {
    type: 'website|article|product',      // Content type
    url: 'https://example.com',           // Canonical URL
    title: 'Title',
    description: 'Description',
    images: [{ url: '...', width, height }],
  },
  twitter: {
    card: 'summary|summary_large_image',  // Tweet card style
    title: 'Title',
    description: 'Description',
    images: ['...'],
  },
}`}
              </pre>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 dark:bg-blue-950/20 border border-blue-200 rounded-lg p-6 mt-6 mb-6">
            <h4 className="font-semibold text-blue-900 dark:text-blue-400 dark:text-blue-400 mb-3">💡 Title Template Pattern</h4>
            <p className="text-gray-700 dark:text-slate-300 dark:text-slate-300 mb-3">
              In your root layout, set a title template. Child pages automatically use this format:
            </p>
            <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// Root layout
export const metadata: Metadata = {
  title: {
    template: '%s | My App',
    default: 'My App',
  },
};

// Child page
export const metadata: Metadata = {
  title: 'About', // Becomes: "About | My App"
};

// Another child
export const metadata: Metadata = {
  title: 'Contact', // Becomes: "Contact | My App"
};`}
            </pre>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 dark:bg-green-950/20 border-l-4 border-green-500 p-4 rounded mt-6">
            <h4 className="font-semibold text-green-900 dark:text-green-400 dark:text-green-400 mb-2">✅ Key Takeaways</h4>
            <ul className="space-y-2 text-gray-700 dark:text-slate-300 dark:text-slate-300">
              <li>• Export metadata object or generateMetadata function</li>
              <li>• Metadata cascades: child pages override parent layout metadata</li>
              <li>• Use title templates for consistent branding across pages</li>
              <li>• Open Graph tags control social media sharing appearance</li>
              <li>• Twitter cards customize how links appear in tweets</li>
              <li>• Robots metadata controls search engine indexing</li>
              <li>• Dynamic metadata fetches fresh data before page render</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
