export function HeaderSection() {
  return (
    <div className="group relative bg-white dark:bg-slate-800/40 rounded-[1rem] p-10 lg:p-14 mb-12 overflow-hidden border border-slate-200/60 dark:border-slate-800/50 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-2xl backdrop-blur-xl">
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-slate-100 dark:via-slate-800 to-transparent" />

      <div className="relative z-10">
        <div className="flex items-center gap-6 mb-12 pb-8 border-b border-slate-100 dark:border-slate-800/50">
          <div className="flex h-14 w-20 items-center justify-center rounded-[1.2rem] bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-500/20 ring-4 ring-orange-500/10">
            <span className="font-black text-sm tracking-widest whitespace-nowrap">
              NJ-02
            </span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            OOP Foundations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-6 w-6 rounded-full bg-amber-500/10 flex items-center justify-center shadow-inner">
                <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
              </div>
              <h4 className="text-[11px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-[0.2em]">
                What is OOP?
              </h4>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed font-medium">
              OOP (Object-Oriented Programming) is a way to organize code.
              You put related <strong className="text-slate-900 dark:text-slate-200">data</strong> and{" "}
              <strong className="text-slate-900 dark:text-slate-200">actions</strong> together in units called{" "}
              <em className="text-slate-600 dark:text-slate-300 italic">classes</em>. Instead of many loose functions in
              different files, you group everything in one place — like putting all "user" code inside a{" "}
              <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-sm">User</span> class.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-6 w-6 rounded-full bg-rose-500/10 flex items-center justify-center shadow-inner">
                <div className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
              </div>
              <h4 className="text-[11px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-[0.2em]">
                Why NestJS Needs This
              </h4>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed font-medium">
              NestJS is built on OOP. Controllers, services,
              guards, pipes — they are all{" "}
              <strong className="text-slate-900 dark:text-slate-200">classes</strong>. If you understand OOP, you understand
              how NestJS works. This lesson teaches the basics that
              everything else is built on.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center shadow-inner">
                <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              </div>
              <h4 className="text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">
                Express.js vs NestJS
              </h4>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed font-medium">
              Express uses a <strong className="text-slate-900 dark:text-slate-200">function-based</strong> style — you
              write separate functions and connect them yourself.
              NestJS uses a <strong className="text-slate-900 dark:text-slate-200">class-based</strong> style — you put
              everything into classes and NestJS connects them for you.
              OOP is what makes this possible.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shadow-inner">
                <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              </div>
              <h4 className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em]">
                What You&apos;ll Learn
              </h4>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed font-medium">
              The 5 pillars of OOP:{" "}
              <strong className="text-slate-900 dark:text-slate-200">Classes & Objects</strong>,{" "}
              <strong className="text-slate-900 dark:text-slate-200">Encapsulation</strong>,{" "}
              <strong className="text-slate-900 dark:text-slate-200">Inheritance</strong>,{" "}
              <strong className="text-slate-900 dark:text-slate-200">Polymorphism</strong>, and{" "}
              <strong className="text-slate-900 dark:text-slate-200">Abstraction</strong>. For each one you&apos;ll see a
              plain explanation, a real analogy, code examples, and exactly
              how NestJS uses it behind the scenes.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl group-hover:bg-amber-500/10 transition-colors duration-700" />
      <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors duration-700" />
    </div>
  );
}

