import { ImprovementManager } from "@/components/improve/ImprovementManager";
import { Nav } from "@/components/nav";

export const metadata = {
  title: "Lesson Content Improvement Manager — LearnCraft Dev Tools",
  description:
    "Developer tool for applying, previewing, and tracking improvements to LearnCraft lesson content.",
  robots: "noindex, nofollow",
};

export default function ImprovePage() {
  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100">
      <Nav />

      <main className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Main panel */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm shadow-2xl shadow-black/40 p-6 sm:p-8">
          <ImprovementManager />
        </div>

        {/* Footer note */}
        <p className="mt-5 text-center text-xs text-slate-700">
          All changes are sandboxed to{" "}
          <code className="font-mono text-slate-600">app/learn/</code>. Version
          history is stored in{" "}
          <code className="font-mono text-slate-600">
            improvement-history.json
          </code>
          .
        </p>
      </main>
    </div>
  );
}
