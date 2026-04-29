export function HeaderSection() {
  return (
    <div className="w-full">
      {/* Header with Title */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-amber-500 text-white shadow-md">
          <span className="font-black text-sm tracking-widest">NJ-02</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          OOP Foundations
        </h2>
      </div>

      {/* Vertical Card Layout - matching left sidebar style */}
      <div className="space-y-4">
        {/* Card 1 */}
        <div className="group relative bg-white dark:bg-slate-800/40 rounded-xl p-6 border border-slate-200/40 dark:border-slate-700 backdrop-blur-sm hover:border-amber-500/20 dark:hover:border-amber-500/20 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-2">
                What is OOP?
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                OOP (Object-Oriented Programming) is a way to organize code. You put related{" "}
                <strong>data</strong> and <strong>actions</strong> together in units called{" "}
                <em>classes</em>. Instead of many loose functions in different files, you group
                everything in one place — like putting all "user" code inside a{" "}
                <span className="inline-block px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-xs">
                  User
                </span>{" "}
                class.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group relative bg-white dark:bg-slate-800/40 rounded-xl p-6 border border-slate-200/40 dark:border-slate-700 backdrop-blur-sm hover:border-rose-500/20 dark:hover:border-rose-500/20 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10">
                <div className="h-2 w-2 rounded-full bg-rose-500" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide mb-2">
                Why NestJS Needs This
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                NestJS is built on OOP. Controllers, services, guards, pipes — they are all{" "}
                <strong>classes</strong>. If you understand OOP, you understand how NestJS works.
                This lesson teaches the basics that everything else is built on.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="group relative bg-white dark:bg-slate-800/40 rounded-xl p-6 border border-slate-200/40 dark:border-slate-700 backdrop-blur-sm hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2">
                Express.js vs NestJS
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Express uses a <strong>function-based</strong> style — you write separate
                functions and connect them yourself. NestJS uses a <strong>class-based</strong>{" "}
                style — you put everything into classes and NestJS connects them for you. OOP
                is what makes this possible.
              </p>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="group relative bg-white dark:bg-slate-800/40 rounded-xl p-6 border border-slate-200/40 dark:border-slate-700 backdrop-blur-sm hover:border-emerald-500/20 dark:hover:border-emerald-500/20 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-2">
                What You&apos;ll Learn
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                The 5 pillars of OOP: <strong>Classes & Objects</strong>, <strong>Encapsulation</strong>,{" "}
                <strong>Inheritance</strong>, <strong>Polymorphism</strong>, and{" "}
                <strong>Abstraction</strong>. For each one you&apos;ll see a plain explanation, a
                real analogy, code examples, and exactly how NestJS uses it behind the scenes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

