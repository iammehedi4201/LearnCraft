"use client";

import React from 'react';
import Link from 'next/link';

const paths = [
  {
    title: "TanStack Query",
    version: "v5",
    desc: "Master asynchronous state management. Learn caching, synchronization, and background refetching patterns for robust UIs.",
    href: "/learn/tanstack",
    color: "blue",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" /><path d="m16 16 2 2 4-4" /></svg>
    )
  },
  {
    title: "NestJS Elite",
    version: "2024",
    desc: "Architectural mastery for the backend. Build scalable, testable, and production-grade APIs using modern patterns.",
    href: "/learn/nestjs",
    color: "red",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
    )
  },
  {
    title: "Next.js Mastery",
    version: "15+",
    desc: "Build the future of full-stack. Explore App Router, Server Components, Streaming, and Edge Optimization.",
    href: "/learn/nextjs",
    color: "indigo",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2" /><path d="M12 21v-4" /><path d="m16 16 2 2 4-4" /></svg>
    )
  }
];

export function CoursePaths() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-4 tracking-tight">Choose Your Path</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Specialized curriculums designed for modern engineering needs.</p>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-white/10 to-transparent hidden md:block mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paths.map((path) => (
            <Link
              key={path.title}
              href={path.href}
              className="group relative block p-10 rounded-[1rem] glass-card overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className={`inline-flex p-4 rounded-2xl bg-${path.color}-500/10 text-${path.color}-600 dark:text-${path.color}-500 mb-8 group-hover:scale-110 transition-transform`}>
                {path.icon}
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
                {path.title}
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
                  {path.version}
                </span>
              </h3>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-10 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">
                {path.desc}
              </p>

              <div className={`flex items-center gap-2 font-bold text-${path.color}-400 group-hover:gap-4 transition-all`}>
                Start Journey
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>

              {/* Decorative gradient corners */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${path.color}-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-${path.color}-500/10 transition-colors`} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
