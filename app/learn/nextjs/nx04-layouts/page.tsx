"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function NX04Layouts(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>
        <CodeNote
          featureCode="NX-04"
          featureName="Layouts & Nesting"
          tanstackConcept="N/A"
          howItWorks="layout.tsx files create shared UI for route segments. Nested folders create nested layouts. Each layout receives {children} prop containing the page or nested layout. Layouts persist across navigation—only children change, improving performance."
          nextjsConcept="Layouts provide a powerful way to structure your app. Root layout (app/layout.tsx) wraps all pages. Segment-specific layouts add structure. When navigating, layouts don't re-render, only children updates."
          whenToUse="Use layouts for navigation, sidebars, shared UI, providers, and any component that should persist across page changes."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white dark:text-white">Layout Hierarchy</h2>

          <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`app/
├── layout.tsx                    ← Root layout (entire app)
│   └── children
├── learn/
│   ├── layout.tsx               ← Learn layout (/learn/*)
│   │   └── children
│   ├── page.tsx                 (/learn)
│   ├── tanstack/
│   │   ├── layout.tsx           ← TanStack layout (/learn/tanstack/*)
│   │   ├── page.tsx             (/learn/tanstack)
│   │   └── tq01-setup/
│   │       └── page.tsx         (/learn/tanstack/tq01-setup)
│   └── nextjs/
│       ├── page.tsx             (/learn/nextjs)
│       └── nx01-app-router/
│           └── page.tsx         (/learn/nextjs/nx01-app-router)
`}
            </pre>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 dark:bg-blue-950/20 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-blue-900 dark:text-blue-400 dark:text-blue-400 mb-3">✨ Key Feature: Layouts Don't Re-render</h3>
            <p className="text-gray-700 dark:text-slate-300 dark:text-slate-300 mb-3">
              When you click a link from /learn/tanstack/tq01 to /learn/tanstack/tq02:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-slate-300 dark:text-slate-300 text-sm">
              <li>✅ app/layout.tsx stays mounted (persists)</li>
              <li>✅ app/learn/layout.tsx stays mounted (persists)</li>
              <li>✅ app/learn/tanstack/layout.tsx stays mounted (persists)</li>
              <li>🔄 Only children (the page.tsx content) changes</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Code Examples</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white dark:text-white mb-2">Root Layout</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/layout.tsx
import { QueryClientProvider } from '@tanstack/react-query';
import NavBar from '@/components/navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider>
          <NavBar />
          <main>{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white dark:text-white mb-2">Segment Layout</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/learn/layout.tsx
import Sidebar from '@/components/sidebar';

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar /> {/* Persists across all /learn/* routes */}
      <main>{children}</main>
    </div>
  );
}`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white dark:text-white mb-2">Route Groups (Optional Grouping)</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// Files in (auth) folder don't add /auth to URL

app/
├── (auth)/                    ← Route group (no URL segment)
│   ├── layout.tsx             ← Auth layout
│   ├── login/page.tsx         → /login (not /auth/login)
│   ├── signup/page.tsx        → /signup (not /auth/signup)
└── dashboard/page.tsx         → /dashboard
`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 dark:bg-green-950/20 border-l-4 border-green-500 p-4 rounded mt-6">
            <h4 className="font-semibold text-green-900 dark:text-green-400 dark:text-green-400 mb-2">✅ Key Takeaways</h4>
            <ul className="space-y-2 text-gray-700 dark:text-slate-300 dark:text-slate-300">
              <li>• layout.tsx files wrap nested routes with shared UI</li>
              <li>• Layouts persist across navigation (better performance)</li>
              <li>• Root layout (app/layout.tsx) wraps entire application</li>
              <li>• Segment layouts add structure to specific route groups</li>
              <li>• Route groups (parentheses) organize without affecting URLs</li>
              <li>• Nested layouts create powerful, hierarchical UI structures</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
