"use client";

export function PageHeader() {
  return (
    <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex h-12 w-16 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
            <span className="font-display font-bold text-sm tracking-wider whitespace-nowrap">NJ-03</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Decorators Deep Dive</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 rounded-full bg-amber-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-amber-600" /></div>
              <h4 className="font-display text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">Core Concept</h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Decorators are functions that attach metadata to classes, methods, properties, or parameters using the @ syntax. They are THE defining feature of NestJS.</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-red-600" /></div>
              <h4 className="font-display text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">Why NestJS Needs This</h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">@Module, @Controller, @Injectable, @Get, @Post, @Body, @Param, @UseGuards — every NestJS building block IS a decorator.</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div>
              <h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express has no decorators. You wire everything manually. NestJS decorators are declarative — they describe WHAT your code does, not HOW.</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-emerald-600" /></div>
              <h4 className="font-display text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Learning Goal</h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Build and understand all 4 types of decorators. After this, NestJS code stops looking like magic.</p>
          </div>
        </div>
      </div>
      <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl group-hover:bg-amber-500/10 transition-colors duration-500" />
    </div>
  );
}
