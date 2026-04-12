"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function NX19Environment(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>

        <CodeNote
          featureCode="NX-19"
          featureName="Environment Variables"
          tanstackConcept="N/A"
          howItWorks="Store configuration and secrets in .env.local files. Use NEXT_PUBLIC_ prefix for client-side variables (exposed in browser). Without prefix, variables are server-only (secret). Access via process.env."
          nextjsConcept="Next.js automatically loads .env.local during development and build. Use environment variables for API keys, database URLs, feature flags, and configuration."
          whenToUse="API keys, secrets, database URLs, feature flags, any configuration that changes between environments."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Environment Variables</h2>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Variable Types</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// .env.local

// Server-only (SECRET - not exposed to browser)
DATABASE_URL=postgresql://...
API_SECRET_KEY=sk_live_...
JWT_SECRET=...

// Client-accessible (prefixed with NEXT_PUBLIC_)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=My App
NEXT_PUBLIC_ENV=production`}
              </pre>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Using in Server Component</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/api/posts/route.ts (Server Component)
export async function GET() {
  // Can access server-only variables
  const dbUrl = process.env.DATABASE_URL;
  const apiKey = process.env.API_SECRET_KEY;

  // Can also access NEXT_PUBLIC_ variables
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  // Access database
  const posts = await db.posts.findAll();

  return Response.json(posts);
}`}
              </pre>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Using in Client Component</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/page.tsx (Client Component)
"use client";

export default function Page() {
  // ✅ Can access NEXT_PUBLIC_ variables in client
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // ❌ CANNOT access server-only variables from client
  // This would be undefined:
  // const secret = process.env.API_SECRET_KEY;

  return (
    <div>
      <p>API URL: {apiUrl}</p>
      {/* Fetch from NEXT_PUBLIC_API_URL in client */}
    </div>
  );
}`}
              </pre>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Multiple Environments</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// .env.local (development)
NEXT_PUBLIC_API_URL=http://localhost:3001/api

// .env.production.local (production)
NEXT_PUBLIC_API_URL=https://api.example.com

// .env.test.local (testing)
NEXT_PUBLIC_API_URL=http://localhost:3001/api/test

// Files are auto-loaded based on NODE_ENV`}
              </pre>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Usage Pattern</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// lib/config.ts
export const config = {
  // Client-accessible
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'My App',

  // Server-only (only use in server components)
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_SECRET_KEY,
};

// Usage in server component:
import { config } from '@/lib/config';

export default async function Page() {
  const posts = await db.posts.findAll(); // Uses config.dbUrl internally
  return <div>{posts.length} posts</div>;
}`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mt-6">
            <h4 className="font-semibold text-green-900 mb-2">✅ Key Takeaways</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Use .env.local for development configuration</li>
              <li>• NEXT_PUBLIC_ prefix = exposed to browser</li>
              <li>• Variables without prefix = server-only (secret)</li>
              <li>• Never commit .env files to Git</li>
              <li>• Use .env.local, .env.production.local, etc.</li>
              <li>• Centralize config in lib/config.ts</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
