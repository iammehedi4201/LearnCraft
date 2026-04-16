"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";

export default function LearnHub(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6">
              Master the <span className="text-gradient">Modern Web</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
              A curated collection of production-quality guides and hands-on examples for
              Next.js and TanStack Query. Built for developers who want to skip the fluff
              and build better apps.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2">
            {/* TanStack Query Path */}
            <div className="group relative flex flex-col gap-6 rounded-3xl glass-card p-10 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 group-hover:bg-blue-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" /><path d="m16 16 2 2 4-4" /></svg>
              </div>
              <div>
                <h2 className="text-display text-2xl font-bold text-slate-900 mb-3">
                  TanStack Query v5
                </h2>
                <p className="text-slate-600 leading-relaxed mb-8">
                  The missing data-fetching library for React. Caching, synchronization,
                  and server state managed effortlessly.
                </p>
                <Link
                  href="/learn/tanstack"
                  className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Explore Path <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
              <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            </div>

            {/* Next.js Path */}
            <div className="group relative flex flex-col gap-6 rounded-3xl glass-card p-10 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/30 group-hover:bg-slate-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 2 2 4-4" /><rect width="20" height="14" x="2" y="3" rx="2" /><path d="M12 21v-4" /></svg>
              </div>
              <div>
                <h2 className="text-display text-2xl font-bold text-slate-900 mb-3">
                  Next.js 14+
                </h2>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Build full-stack React apps with the App Router, Server Components,
                  and world-class performance out of the box.
                </p>
                <Link
                  href="/learn/nextjs"
                  className="inline-flex items-center gap-2 font-semibold text-slate-900 hover:text-primary transition-colors"
                >
                  Explore Path <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
              <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-slate-900/40 to-transparent" />
            </div>
          </div>

          <div className="mt-24 rounded-3xl bg-slate-900 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-display text-2xl font-bold mb-6">Expert Learning Tips</h3>
                <ul className="space-y-4 text-slate-300">
                  {[
                    "Each lesson includes real-world API implementations",
                    "Production-ready patterns and best practices",
                    "TypeScript focused examples for type safety",
                    "Step-by-step progress from basics to advanced"
                  ].map((tip, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-blue-400" />
                      </div>
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hidden md:block">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-3/4 rounded bg-white/10" />
                    <div className="h-2 w-1/2 rounded bg-white/10" />
                    <div className="h-2 w-5/6 rounded bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
          </div>
        </div>
      </div>
    </>
  );
}

