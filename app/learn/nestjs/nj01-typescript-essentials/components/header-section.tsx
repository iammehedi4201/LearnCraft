
export function HeaderSection() {
  return (
    <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex h-12 w-16 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
            <span className="font-display font-bold text-sm tracking-wider whitespace-nowrap">NJ-01</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            TypeScript Essentials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 rounded-full bg-amber-500/10 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-600" />
              </div>
              <h4 className="font-display text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                Plain English Concept
              </h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">TypeScript is just JavaScript with rules. It acts like a spell-checker for your code. If you try to do math with a word, it stops you *before* the code runs.</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
              </div>
              <h4 className="font-display text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">
                Why NestJS Needs This
              </h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">NestJS relies on these rules to connect all the pieces of your app safely. Every file you make in NestJS will use these labels to prevent mistakes.</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              </div>
              <h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                Express.js Comparison
              </h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">In Express (JavaScript), bugs hide until a user clicks a button and the app crashes. In NestJS (TypeScript), bugs are caught immediately while you are typing.</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              </div>
              <h4 className="font-display text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                Learning Goal
              </h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">We will break down Types, Interfaces, Generics, Utility Types, and Enums into simple ideas so you can write foolproof code.</p>
          </div>
        </div>
      </div>
      <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl group-hover:bg-amber-500/10 transition-colors duration-500" />
    </div>
  );
}
