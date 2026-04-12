"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";

export default function LearnHub(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Learn Next.js & TanStack Query
          </h1>
          <p className="text-lg text-gray-600">
            Choose your learning path below. Both technologies organized separately with
            production-quality examples and comprehensive guides.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* TanStack Query Path */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200 p-8 hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full font-semibold text-sm mb-4">
                Query Management
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                TanStack Query v5
              </h2>
              <p className="text-gray-700">
                Master data fetching, caching, mutations, and synchronization.
                Learn query keys, stale time, GC, pagination, and advanced
                patterns. 22 comprehensive lessons.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔍</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Foundations (TQ-01 to TQ-06)</h3>
                  <p className="text-sm text-gray-600">
                    Setup, useQuery basics, query keys, staleness, dependent &amp; parallel queries
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✏️</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Intermediate (TQ-07 to TQ-12)</h3>
                  <p className="text-sm text-gray-600">
                    Mutations, optimistic updates, invalidation, traditional &amp; infinite pagination
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Advanced (TQ-13 to TQ-22)</h3>
                  <p className="text-sm text-gray-600">
                    Prefetching, selects, polling, cancellation, Suspense, SSR, custom hooks
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/learn/tanstack"
              className="inline-block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start TanStack Query →
            </Link>
          </div>

          {/* Next.js Path */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 p-8 hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <div className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full font-semibold text-sm mb-4">
                App Framework
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Next.js 14+
              </h2>
              <p className="text-gray-700">
                Build modern web applications with App Router, Server
                Components, data fetching patterns, and performance optimization.
                20 comprehensive lessons.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📁</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Basics (NX-01 to NX-06)</h3>
                  <p className="text-sm text-gray-600">
                    App Router, file routing, Server vs Client components, layouts, dynamic routes
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Intermediate (NX-07 to NX-12)</h3>
                  <p className="text-sm text-gray-600">
                    Data fetching, error handling, loading states, route handlers, middleware, metadata
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Advanced (NX-13 to NX-20)</h3>
                  <p className="text-sm text-gray-600">
                    Image/font optimization, SSG, ISR, caching strategies, environment variables
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/learn/nextjs"
              className="inline-block w-full text-center bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Start Next.js →
            </Link>
          </div>
        </div>

        <div className="mt-16 bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            💡 Learning Tips
          </h3>
          <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
            <li className="flex gap-2">
              <span>✓</span>
              <span>
                Each feature has concept explanation, "how it works" breakdown, and working examples
              </span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>
                Examples use real API calls to JSONPlaceholder for live data
              </span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>
                Learn technologies separately for clarity, then combine in your apps
              </span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>
                All code is production-quality, TypeScript, and follows best practices
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <p className="text-gray-700">
            <strong>Note:</strong> The existing 28 TanStack Query lessons are still available in the legacy routes. New pages are being created in the reorganized structure.
          </p>
        </div>
      </div>
    </>
  );
}
