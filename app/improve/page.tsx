import { ImprovementManager } from "@/components/improve/ImprovementManager";
import { Nav } from "@/components/nav";

export const metadata = {
  title: "Lesson Content Improvement Manager — LearnCraft Dev Tools",
  description: "Developer tool for applying, previewing, and tracking improvements to LearnCraft lesson content.",
  robots: "noindex, nofollow",
};

export default function ImprovePage() {
  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100">
      <Nav />

      <main className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-100 tracking-tight">
                Lesson Content Improvement Manager
              </h1>
              <p className="text-xs text-slate-500">
                Paste → Auto-detect → Preview → Confirm → Track History
              </p>
            </div>

            {/* Dev-only badge */}
            <span className="ml-auto px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase tracking-widest">
              Dev Tool
            </span>
          </div>

          {/* Workflow steps */}
          <div className="mt-5 flex items-center gap-1 flex-wrap text-[11px] font-medium text-slate-600">
            {[
              "Paste Section",
              "Auto-Detect Location",
              "Preview Diff",
              "Confirm",
              "File Updated",
              "History Saved",
            ].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-1">
                <span className="text-slate-500">{step}</span>
                {i < arr.length - 1 && (
                  <svg className="w-3 h-3 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Main panel */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm shadow-2xl shadow-black/40 p-6 sm:p-8">
          <ImprovementManager />
        </div>

        {/* Footer note */}
        <p className="mt-5 text-center text-xs text-slate-700">
          All changes are sandboxed to{" "}
          <code className="font-mono text-slate-600">app/learn/</code>.
          Version history is stored in{" "}
          <code className="font-mono text-slate-600">improvement-history.json</code>.
        </p>
      </main>
    </div>
  );
}
