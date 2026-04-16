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
import { ThemeToggle } from "./theme-toggle";

export function Nav(): JSX.Element {
  return (
    <nav className="glass-nav sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/learn"
          className="group flex items-center gap-2 font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <span className="text-lg">L</span>
          </div>
          <span className="group-hover:text-blue-500 transition-colors">LearnCraft</span>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a
              href="https://tanstack.com/query/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              TanStack Docs
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
            </a>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              Next.js Docs
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/learn"
              className="hidden sm:inline-flex rounded-full bg-slate-900 dark:bg-white dark:text-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-xl hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-95 transition-all"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

