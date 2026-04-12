"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function NX01AppRouter(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>

        <CodeNote
          featureCode="NX-01"
          featureName="App Router Fundamentals"
          tanstackConcept="N/A"
          howItWorks="The Next.js App Router uses the /app directory for routing. Files named page.tsx become routes. Folders become URL segments. layout.tsx files provide shared layout and context for nested routes."
          nextjsConcept="Next.js 13+ App Router replaces the Pages Router. It's file-based routing where folder structure maps directly to URLs. Each page is a Server Component by default."
          whenToUse="Always use App Router for new projects. It provides better Server Component support, automatic code splitting, and cleaner data fetching patterns."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Project Structure</h2>

          <div className="bg-gray-900 text-white p-6 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
            <pre>{`app/
├── layout.tsx              # Root layout (metadata, providers)
├── page.tsx                # Home route (/)
├── learn/
│   ├── layout.tsx          # Shared layout for /learn/*
│   ├── page.tsx            # /learn route
│   ├── tanstack/
│   │   ├── page.tsx        # /learn/tanstack route
│   │   └── tq01-setup/
│   │       └── page.tsx    # /learn/tanstack/tq01-setup route
│   └── nextjs/
│       ├── page.tsx        # /learn/nextjs route
│       └── nx01-app-router/
│           └── page.tsx    # /learn/nextjs/nx01-app-router route
├── api/
│   └── route.ts            # /api route handlers
└── globals.css             # Global styles`}</pre>
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-900">How Routing Works</h3>
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden mb-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border-b border-gray-200">File/Folder</th>
                <th className="px-4 py-2 text-left border-b border-gray-200">Route</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2 font-mono text-sm">app/page.tsx</td>
                <td className="px-4 py-2">/</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2 font-mono text-sm">app/learn/page.tsx</td>
                <td className="px-4 py-2">/learn</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2 font-mono text-sm">app/learn/tanstack/page.tsx</td>
                <td className="px-4 py-2">/learn/tanstack</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2 font-mono text-sm">app/learn/tanstack/tq01-setup/page.tsx</td>
                <td className="px-4 py-2">/learn/tanstack/tq01-setup</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-sm">app/api/route.ts</td>
                <td className="px-4 py-2">/api</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mb-4 text-gray-900">Key Concepts</h3>
          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">📁 Segments</h4>
              <p className="text-gray-700">
                Folder names become URL segments. Nested folders create nested routes. E.g., /app/learn/tanstack/tq01-setup/ creates URL /learn/tanstack/tq01-setup.
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">📄 page.tsx</h4>
              <p className="text-gray-700">
                Makes a route segment publicly accessible. File name doesn't matter, only page.tsx. For example, /app/learn/page.tsx makes /learn route work.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">🎨 layout.tsx</h4>
              <p className="text-gray-700">
                Shared UI for a route and all nested routes. Can contain providers, navigation, or shared components. Resets don't happen between layout-level navigation.
              </p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-2">📌 Server Components (default)</h4>
              <p className="text-gray-700">
                Pages are Server Components by default. They can access databases, call async functions directly, and keep secrets. No hydration overhead.
              </p>
            </div>
          </div>

          <pre className="mt-6 bg-gray-900 text-white p-4 rounded overflow-x-auto text-xs">
{`// app/page.tsx - Server Component by default
export default async function Home() {
  // Can use await directly, fetch data server-side
  const data = await fetch('...');
  return <div>{/* UI with server data */}</div>;
}

// app/learn/layout.tsx - Shared layout
export default function LearnLayout({ children }) {
  return (
    <div>
      <nav>{/* Navigation */}</nav>
      <main>{children}</main>
    </div>
  );
}

// app/learn/tanstack/page.tsx - TanStack learning hub
export default function TanStackHub() {
  return <div>{/* Feature list */}</div>;
}`}
          </pre>
        </section>
      </div>
    </>
  );
}
