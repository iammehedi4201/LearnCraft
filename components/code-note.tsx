/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * CODE-NOTE COMPONENT — Explanation Display
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * This component displays the structured explanation comment in a formatted,
 * visually appealing way. It extracts the comment content and renders each
 * section with proper styling.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

interface CodeNoteProps {
  featureCode: string;
  featureName: string;
  tanstackConcept: string;
  howItWorks: string;
  nextjsConcept: string;
  whenToUse: string;
}

export function CodeNote({
  featureCode,
  featureName,
  tanstackConcept,
  howItWorks,
  nextjsConcept,
  whenToUse,
}: CodeNoteProps): JSX.Element {
  return (
    <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
            <span className="font-display font-bold text-sm tracking-wider">{featureCode}</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            {featureName}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              </div>
              <h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                TanStack Concept
              </h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{tanstackConcept}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 rounded-full bg-indigo-500/10 dark:bg-indigo-400/10 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              </div>
              <h4 className="font-display text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                Under the Hood
              </h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{howItWorks}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 rounded-full bg-purple-500/10 dark:bg-purple-400/10 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />
              </div>
              <h4 className="font-display text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
                Next.js Integration
              </h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{nextjsConcept}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 rounded-full bg-pink-500/10 dark:bg-pink-400/10 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-pink-600 dark:bg-pink-400" />
              </div>
              <h4 className="font-display text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-widest">
                When to Use
              </h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{whenToUse}</p>
          </div>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-blue-500/5 dark:bg-blue-400/5 blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500" />
    </div>
  );
}

