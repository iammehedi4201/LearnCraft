"use client";

import { useState } from "react";
import Link from "next/link";

type ShowcaseFeature = "playground" | "notes" | "quickcheck" | "tests";

export function PlaygroundShowcase() {
  const [activeFeature, setActiveFeature] = useState<ShowcaseFeature>("playground");
  const [simulatedRunOutput, setSimulatedRunOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  const handleSimulateRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setSimulatedRunOutput(
        "[LearnCraft Sandbox] ✓ Query executed in 14ms (Cached)\n[Live Telemetry] Cache Status: FRESH\n[Validation] 3/3 Automated test assertions passed!"
      );
      setIsRunning(false);
    }, 400);
  };

  return (
    <section id="playground-showcase" className="py-12 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-ds-success-lighter text-ds-success-dark">
              Interactive Engine
            </span>
            <span className="text-xs text-ds-text-soft font-semibold">
              Zero-Setup In-Browser Sandbox
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-ds-text-strong font-display">
            Built for How Developers Actually Learn
          </h2>
          <p className="text-sm sm:text-base text-ds-text-sub mt-2">
            No more switching tabs or configuring build tools. Every lesson includes embedded sandboxes, architectural notes, and instant test assertions.
          </p>
        </div>
      </div>

      {/* Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Feature Selection Cards */}
        <div className="lg:col-span-5 space-y-3">
          {[
            {
              id: "playground" as const,
              title: "Embedded In-Browser Sandbox",
              badge: "Live Runtime",
              badgeColor: "bg-ds-feature-lighter text-ds-feature-dark",
              desc: "Run JavaScript and TypeScript code right in your browser with real-time console capture and test assertion feedback.",
              icon: "⚡",
            },
            {
              id: "notes" as const,
              title: "Architectural Code Notes",
              badge: "Mental Models",
              badgeColor: "bg-ds-info-lighter text-ds-info-dark",
              desc: "Side-by-side callouts breaking down production edge-cases, memory leak prevention, and concurrency patterns.",
              icon: "💡",
            },
            {
              id: "quickcheck" as const,
              title: "Quick-Check Micro Quizzes",
              badge: "Retention",
              badgeColor: "bg-ds-success-lighter text-ds-success-dark",
              desc: "Multi-choice quizzes embedded at the end of topics to verify your understanding before progressing.",
              icon: "🎯",
            },
            {
              id: "tests" as const,
              title: "Automated Test Assertions",
              badge: "Validation",
              badgeColor: "bg-ds-away-lighter text-ds-away-dark",
              desc: "Interactive unit checks validate your solutions instantly against expected outputs.",
              icon: "🧪",
            },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveFeature(item.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                activeFeature === item.id
                  ? "bg-ds-bg-white border-ds-feature-base shadow-sm ring-1 ring-ds-feature-base/20"
                  : "bg-ds-bg-white/60 hover:bg-ds-bg-white border-ds-stroke-soft hover:border-ds-stroke-sub"
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{item.icon}</span>
                  <h3 className="text-sm font-bold text-ds-text-strong">{item.title}</h3>
                </div>
                <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>
              <p className="text-xs text-ds-text-sub leading-relaxed pl-7">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Right: Live Interactive Sandbox / Demo Window */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm overflow-hidden">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between px-5 py-3 bg-ds-bg-weak border-b border-ds-stroke-soft">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-ds-error-base" />
                <div className="w-3 h-3 rounded-full bg-ds-warning-base" />
                <div className="w-3 h-3 rounded-full bg-ds-success-base" />
                <span className="text-xs font-mono text-ds-text-soft ml-2">
                  {activeFeature === "playground" && "exercise.ts"}
                  {activeFeature === "notes" && "ArchitectureCallout.ts"}
                  {activeFeature === "quickcheck" && "KnowledgeVerification.quiz"}
                  {activeFeature === "tests" && "assertions.test.ts"}
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-ds-text-disabled">
                Interactive Preview
              </span>
            </div>

            {/* Dynamic Content Panel */}
            <div className="p-6 min-h-[360px] flex flex-col justify-between">
              {activeFeature === "playground" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-ds-stroke-soft">
                    <span className="text-xs font-bold text-ds-text-strong">
                      Exercise: Asynchronous Cache Invalidation
                    </span>
                    <button
                      onClick={handleSimulateRun}
                      disabled={isRunning}
                      className="px-3.5 py-1.5 bg-ds-success-base hover:bg-ds-success-dark text-ds-static-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
                    >
                      {isRunning ? (
                        <>
                          <span className="w-2.5 h-2.5 rounded-full border-2 border-ds-static-white border-t-transparent animate-spin" />
                          Executing...
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          Run Code & Tests
                        </>
                      )}
                    </button>
                  </div>

                  {/* Code Snippet Box */}
                  <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft font-mono text-xs text-ds-text-strong leading-relaxed overflow-x-auto">
                    <span className="text-ds-text-disabled">// Click "Run Code & Tests" to execute</span>
                    <br />
                    <span className="text-ds-feature-base">import</span> {"{ useQueryClient }"} <span className="text-ds-feature-base">from</span> <span className="text-ds-success-dark">&apos;@tanstack/react-query&apos;</span>;
                    <br />
                    <br />
                    <span className="text-ds-info-base">export async function</span> <span className="text-ds-warning-dark font-bold">syncOrderState</span>(queryClient, orderId) {"{"}
                    <br />
                    &nbsp;&nbsp;<span className="text-ds-feature-base">await</span> queryClient.<span className="text-ds-info-base">invalidateQueries</span>({"{"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;queryKey: [<span className="text-ds-success-dark">&apos;orders&apos;</span>, orderId],
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;refetchType: <span className="text-ds-success-dark">&apos;active&apos;</span>
                    <br />
                    &nbsp;&nbsp;{"}"});
                    <br />
                    {"}"}
                  </div>

                  {/* Console Output */}
                  <div className="p-3.5 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft font-mono text-[11px]">
                    <div className="flex items-center justify-between text-ds-text-soft font-bold mb-1 uppercase tracking-wider text-[9px]">
                      <span>Console & Test Result</span>
                    </div>
                    {simulatedRunOutput ? (
                      <pre className="text-ds-success-dark font-medium whitespace-pre-wrap">
                        {simulatedRunOutput}
                      </pre>
                    ) : (
                      <span className="text-ds-text-disabled italic">
                        Click &quot;Run Code &amp; Tests&quot; above to execute.
                      </span>
                    )}
                  </div>
                </div>
              )}

              {activeFeature === "notes" && (
                <div className="space-y-4">
                  <div className="p-5 rounded-xl border border-ds-info-base bg-ds-info-lighter text-ds-text-strong">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💡</span>
                      <div>
                        <h4 className="text-sm font-bold text-ds-info-dark mb-1">
                          Architecture Callout: Stale Time vs Cache Time
                        </h4>
                        <p className="text-xs text-ds-text-sub leading-relaxed">
                          <code className="text-ds-info-dark font-mono font-bold">staleTime</code> defines when data is considered out-of-date and triggers background refetches. <code className="text-ds-info-dark font-mono font-bold">gcTime</code> defines how long inactive data persists in garbage collection memory.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl border border-ds-warning-base bg-ds-warning-lighter text-ds-text-strong">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⚠️</span>
                      <div>
                        <h4 className="text-sm font-bold text-ds-warning-dark mb-1">
                          Production Trap: Unkeyed Mutations
                        </h4>
                        <p className="text-xs text-ds-text-sub leading-relaxed">
                          Mutations without explicit onSuccess cache invalidation will leave your UI with ghost data. Always tie mutation hooks directly to query client cache invalidation keys.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeFeature === "quickcheck" && (
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-ds-feature-base uppercase tracking-wider">
                        Quick Check Assessment
                      </span>
                      <span className="text-[10px] text-ds-text-soft">• 1 min check</span>
                    </div>
                    <h4 className="text-sm font-bold text-ds-text-strong mb-4">
                      When using Next.js 15 Server Actions with optimistic updates, what is the recommended way to revert state on network failure?
                    </h4>

                    <div className="space-y-2">
                      {[
                        "Reload the entire browser window via window.location.reload()",
                        "Store previous query cache in context onMutate and restore it in onError",
                        "Delete the cookie header and restart server process",
                      ].map((opt, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedQuizAnswer(idx)}
                          className={`p-3 rounded-xl text-xs font-medium border cursor-pointer transition-all ${
                            selectedQuizAnswer === idx
                              ? idx === 1
                                ? "bg-ds-success-lighter border-ds-success-base text-ds-success-dark font-bold"
                                : "bg-ds-error-lighter border-ds-error-base text-ds-error-dark"
                              : "bg-ds-bg-white border-ds-stroke-soft text-ds-text-strong hover:border-ds-feature-base/40"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{opt}</span>
                            {selectedQuizAnswer === idx && idx === 1 && <span>✓ Correct</span>}
                            {selectedQuizAnswer === idx && idx !== 1 && <span>✗ Incorrect</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeFeature === "tests" && (
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft space-y-3">
                    <h4 className="text-sm font-bold text-ds-text-strong">
                      Automated In-Browser Test Suite
                    </h4>
                    <p className="text-xs text-ds-text-sub">
                      Each exercise validates your code against unit assertions before allowing you to mark the module complete:
                    </p>

                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-ds-bg-white border border-ds-stroke-soft">
                        <span className="text-ds-text-strong">✓ Test 1: Query key correctly formatted</span>
                        <span className="text-ds-success-dark font-bold">Passed</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-ds-bg-white border border-ds-stroke-soft">
                        <span className="text-ds-text-strong">✓ Test 2: Invalidation triggers active refetch</span>
                        <span className="text-ds-success-dark font-bold">Passed</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-ds-bg-white border border-ds-stroke-soft">
                        <span className="text-ds-text-strong">✓ Test 3: Optimistic rollback captures snapshot</span>
                        <span className="text-ds-success-dark font-bold">Passed</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Quick Jump Link */}
              <div className="pt-4 border-t border-ds-stroke-soft flex items-center justify-between text-xs">
                <span className="text-ds-text-soft">
                  Full playgrounds are integrated into every lesson module
                </span>
                <Link
                  href="/learn/nextjs"
                  className="font-bold text-ds-feature-base hover:text-ds-feature-dark flex items-center gap-1"
                >
                  Try in Next.js Track →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
