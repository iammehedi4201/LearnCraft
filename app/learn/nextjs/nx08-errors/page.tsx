"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function NX08Errors(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>

        <CodeNote
          featureCode="NX-08"
          featureName="Error Handling & error.tsx"
          tanstackConcept="N/A"
          howItWorks="error.tsx files are React Error Boundaries for a route segment. When an error is thrown in a page or component, Next.js catches it and renders the error.tsx component instead. Error components receive the error object and a reset function."
          nextjsConcept="Create an error.tsx file to handle errors in a route and all nested routes. The error component is automatically rendered when an error occurs. Use it to show error UI without showing the entire page as broken."
          whenToUse="Wrap route segments with error boundaries. Always have a root error.tsx and segment-specific ones as needed."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Error Boundary Setup</h2>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">File Structure</h3>
            <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`app/
├── error.tsx                    ← Root error boundary
├── page.tsx
├── dashboard/
│   ├── error.tsx               ← Dashboard specific errors
│   ├── layout.tsx
│   └── page.tsx
└── admin/
    ├── error.tsx               ← Admin specific errors
    └── page.tsx`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-900">Code Examples</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Root Error Boundary</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/error.tsx
"use client";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-red-600">Something went wrong!</h1>
      <p className="text-gray-600 mt-2">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Segment-Specific Error Handler</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/admin/error.tsx
"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-lg font-bold text-red-800">Admin Error</h2>
        <p className="text-red-700 mt-2">{error.message}</p>
        <button
          onClick={() => reset()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    </div>
  );
}`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Throwing Errors Intentionally</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/dashboard/page.tsx
export default async function Dashboard() {
  const res = await fetch('https://api.example.com/dashboard');
  
  if (!res.ok) {
    // This error will be caught by app/dashboard/error.tsx
    throw new Error(\`Failed to load dashboard: \${res.status}\`);
  }
  
  const data = await res.json();
  return <div>{/* dashboard content */}</div>;
}`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mt-6">
            <h4 className="font-semibold text-green-900 mb-2">✅ Key Takeaways</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• error.tsx creates an error boundary for a route segment</li>
              <li>• Error component receives error object and reset function</li>
              <li>• Must be a client component ("use client")</li>
              <li>• Nested errors propagate up to nearest error.tsx</li>
              <li>• Errors in children are caught but not errors in layout</li>
              <li>• Use for graceful error handling and user feedback</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
