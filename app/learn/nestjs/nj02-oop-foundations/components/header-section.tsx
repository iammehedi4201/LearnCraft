export function HeaderSection() {
  return (
    <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex h-12 w-16 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
            <span className="font-display font-bold text-sm tracking-wider whitespace-nowrap">
              NJ-02
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            OOP Foundations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 rounded-full bg-amber-500/10 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-600" />
              </div>
              <h4 className="font-display text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                What is OOP?
              </h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              OOP (Object-Oriented Programming) is a way of organizing code
              by grouping related <strong>data</strong> and{" "}
              <strong>actions</strong> together into units called{" "}
              <em>classes</em>. Instead of loose functions scattered across
              files, you bundle everything that belongs together into one
              place — like putting all &quot;user&quot; logic inside a{" "}
              <code className="text-amber-600">User</code> class.
            </p>
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
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              NestJS is built entirely around OOP. Controllers, services,
              guards, pipes, interceptors — they are all{" "}
              <strong>classes</strong>. If you understand OOP, you understand
              how every piece of NestJS works. This lesson comes first
              because it&apos;s the foundation everything else stands on.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              </div>
              <h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                Express.js vs NestJS
              </h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Express uses a <strong>function-based</strong> style — you
              write standalone functions and wire them with middleware.
              NestJS uses a <strong>class-based</strong> style — you organize
              everything into classes and let NestJS connect them
              automatically. OOP is the bridge between the two.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              </div>
              <h4 className="font-display text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                What You&apos;ll Learn
              </h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              The 5 pillars of OOP:{" "}
              <strong>Classes &amp; Objects</strong>,{" "}
              <strong>Encapsulation</strong>,{" "}
              <strong>Inheritance</strong>,{" "}
              <strong>Polymorphism</strong>, and{" "}
              <strong>Abstraction</strong>. For each one you&apos;ll see a
              plain explanation, a real analogy, code examples, and exactly
              how NestJS uses it behind the scenes.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl group-hover:bg-amber-500/10 transition-colors duration-500" />
    </div>
  );
}
