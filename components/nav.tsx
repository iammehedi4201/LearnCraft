/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NAV COMPONENT — Global Navigation
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * A simple navigation component to link back to the learn hub.
 * Appears at the top of every feature page.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import Link from "next/link";

export function Nav(): JSX.Element {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/learn" className="font-bold text-lg text-blue-600">
          ← Back to Learn Hub
        </Link>
        <div className="text-sm text-gray-600">
          <a
            href="https://tanstack.com/query/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mr-4"
          >
            TanStack Docs
          </a>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Next.js Docs
          </a>
        </div>
      </div>
    </nav>
  );
}
