"use client";

import React from 'react';

export function Community() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="relative rounded-[1rem] bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 p-12 lg:p-24 overflow-hidden group shadow-xl">
          {/* Decorative SVG Pattern */}
          <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-[20s]">
            <svg width="100%" height="100%">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-slate-200 dark:text-white" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-6">Community Hub</span>
              <h2 className="text-4xl lg:text-6xl font-black text-foreground mb-8 leading-tight">
                Learn faster with a <br />
                <span className="text-4xl lg:text-6xl text-blue-600 dark:text-blue-400">global network</span> of experts.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg lg:text-xl mb-12 max-w-lg leading-relaxed">
                Join our private Discord to get help from mentors, share your progress,
                and collaborate on real-world open source projects.
              </p>

              <div className="flex flex-wrap gap-6">
                <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
                  </svg>
                  Join Discord
                </button>
                <button className="px-8 py-4 bg-transparent border border-slate-200 dark:border-white/20 text-slate-600 dark:text-white font-bold rounded-2xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
                  Browse Projects
                </button>
              </div>
            </div>

            <div className="hidden lg:flex justify-end">
              <div className="w-[400px] h-[400px] bg-slate-200/20 dark:bg-white/5 rounded-[1rem] border border-slate-200 dark:border-white/10 relative p-8 backdrop-blur-xl animate-float">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white dark:bg-blue-400 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-900 shadow-2xl rotate-12 border border-slate-100 dark:border-none">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </div>
                <div className="space-y-6">
                  <div className="h-4 w-1/2 bg-slate-200 dark:bg-white/20 rounded-full" />
                  <div className="h-4 w-3/4 bg-slate-100 dark:bg-white/10 rounded-full" />
                  <div className="h-32 w-full bg-slate-100/50 dark:bg-white/5 rounded-2xl" />
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-500/10" />
                    <div className="space-y-2 flex-1">
                      <div className="h-3 w-1/3 bg-slate-200 dark:bg-white/20 rounded-full" />
                      <div className="h-3 w-2/3 bg-slate-100 dark:bg-white/10 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
