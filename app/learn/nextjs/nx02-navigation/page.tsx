"use client";

import { useState, useEffect } from "react";
import { Nav } from "@/components/nav";
import { InteractiveGrid } from "@/components/interactive-grid";
import {
  Sparkles,
  Zap,
} from "../components/icons";
import { NextjsLessonNavFooter } from "../components/lesson-nav-footer";
import { NextjsLessonSidebar } from "../components/lesson-sidebar";
import {
  useNextjsModuleProgress,
  NextjsSectionItem,
} from "../hooks/use-nextjs-module-progress";

const SECTIONS: NextjsSectionItem[] = [
  { id: "part1", label: "Mental Model: Teleportation", icon: "⚡" },
  { id: "part2", label: "Viewport Prefetching", icon: "🚀" },
  { id: "part3", label: "Interactive Navigation Lab", icon: "🧪" },
  { id: "part4", label: "Active Links & usePathname", icon: "🧭" },
  { id: "part5", label: "Common Pitfalls & Traps", icon: "⚠️" },
  { id: "part6", label: "Knowledge Check Quiz", icon: "🧠" },
];

export default function NX02NavigationPage(): JSX.Element {
  const {
    isAuthenticated,
    activeSection,
    completedSections,
    isLessonCompleted,
    currentIndex,
    progressPercent,
    handleSectionChange,
    completeLesson,
    getStepState,
  } = useNextjsModuleProgress({
    lessonSlug: "nx02-navigation",
    sections: SECTIONS,
  });

  const [activeTab, setActiveTab] = useState<string>("/dashboard");
  const [pageReloadCount, setPageReloadCount] = useState<number>(0);
  const [softNavCount, setSoftNavCount] = useState<number>(0);
  const [prefetchMode, setPrefetchMode] = useState<boolean>(true);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const simulateHardReload = (target: string) => {
    setActiveTab(target);
    setPageReloadCount((c) => c + 1);
  };

  const simulateSoftTransition = (target: string) => {
    setActiveTab(target);
    setSoftNavCount((c) => c + 1);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "part1":
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PART 01 · CORE CONCEPT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Teleportation vs Building Demolition
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                When a user clicks a regular HTML <code>&lt;a href=&quot;...&quot;&gt;</code>, the browser destroys the entire DOM, unloads all JavaScript, downloads the whole HTML page anew, and re-executes all scripts from scratch.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-lg space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    What Happens During a Soft Client Transition
                  </h3>
                  <ul className="text-xs sm:text-sm text-slate-400 space-y-2 list-disc pl-5">
                    <li>
                      <strong className="text-slate-200">Preserves Client State</strong>: Audio players keep playing, form inputs remain intact, and scroll positions are managed.
                    </li>
                    <li>
                      <strong className="text-slate-200">Viewport Prefetching</strong>: Whenever a <code>&lt;Link&gt;</code> enters the user&apos;s viewport, Next.js prefetches the route payload in the background. When clicked, navigation is virtually instantaneous (0ms perceived latency).
                    </li>
                    <li>
                      <strong className="text-slate-200">Diff Rendering</strong>: Only the changed layout/page subtree is swapped. Unchanged layouts remain completely untouched.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );

      case "part2":
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PART 02 · PREFETCHING ENGINE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                How Next.js Prefetches Routes
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                By default in production builds, Next.js uses an <code>IntersectionObserver</code> to monitor every <code>&lt;Link&gt;</code> visible on screen:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0E121B] border border-white/[0.08] space-y-2">
                <span className="text-xs font-mono font-bold text-purple-400 block">
                  Static Routes (Instant)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  For static routes, the entire React Server Component payload is prefetched and cached locally in the browser&apos;s router cache. Clicking it results in zero server round-trip latency.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0E121B] border border-white/[0.08] space-y-2">
                <span className="text-xs font-mono font-bold text-sky-400 block">
                  Dynamic Routes (Partial)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  For dynamic routes with personalized cookies or database queries, Next.js prefetches the static skeleton (loading.tsx) down to the nearest Suspense boundary, so transitions remain instantaneous.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                Disabling Prefetching When Needed
              </span>
              <pre className="p-4 rounded-xl bg-black/60 border border-white/[0.08] text-xs font-mono text-slate-300 overflow-x-auto">
{`// Disable prefetching on heavy or rarely visited routes:
<Link href="/billing/invoice-history" prefetch={false}>
  View Invoices
</Link>`}
              </pre>
            </div>
          </section>
        );

      case "part3":
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PART 03 · INTERACTIVE LAB</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Interactive Lab: &lt;a&gt; vs Next.js &lt;Link&gt;
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Experience the difference between destructive full page reloads and instant client-side transitions:
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-6">
              {/* Counters */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-black/40 border border-white/[0.04]">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">
                      Full Page Reloads:
                    </span>
                    <span className="text-lg font-mono font-bold text-rose-400">
                      {pageReloadCount} flashes
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">
                      Instant Soft Transitions:
                    </span>
                    <span className="text-lg font-mono font-bold text-emerald-400">
                      {softNavCount} instant
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Prefetch:</span>
                  <button
                    onClick={() => setPrefetchMode(!prefetchMode)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      prefetchMode
                        ? "bg-purple-600/30 text-purple-300 border border-purple-500/40"
                        : "bg-white/[0.04] text-slate-400 border border-white/[0.08]"
                    }`}
                  >
                    {prefetchMode ? "prefetch={true}" : "prefetch={false}"}
                  </button>
                </div>
              </div>

              {/* Simulated Browser Bar */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08] flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/60" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                    <span className="text-xs font-mono text-slate-500 ml-2">
                      URL: {activeTab}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {[
                      { path: "/dashboard", label: "Dashboard" },
                      { path: "/projects", label: "Projects" },
                      { path: "/analytics", label: "Analytics" },
                      { path: "/settings", label: "Settings" },
                    ].map((tab) => {
                      const isActive = activeTab === tab.path;
                      return (
                        <div key={tab.path} className="flex items-center gap-1">
                          <button
                            onClick={() => simulateSoftTransition(tab.path)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                              isActive
                                ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30"
                                : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
                            }`}
                          >
                            &lt;Link&gt; {tab.label}
                          </button>
                          <button
                            onClick={() => simulateHardReload(tab.path)}
                            className="px-1.5 py-1.5 rounded text-[10px] text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                            title="Simulate standard HTML anchor click"
                          >
                            &lt;a&gt;
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-black/30 border border-white/[0.04] text-center space-y-2">
                  <span className="text-[11px] font-mono text-purple-400">
                    Active Route Component:
                  </span>
                  <h3 className="text-xl font-bold text-white capitalize">
                    {activeTab.replace("/", "")} Page Content
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Notice that when navigating via <code>&lt;Link&gt;</code>, navigation is instantaneous with zero screen flicker and persistent layout state!
                  </p>
                </div>
              </div>
            </div>
          </section>
        );

      case "part4":
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PART 04 · CODE PATTERN</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Active Links with usePathname()
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                The standard production pattern for navigation bars in Next.js uses the <code>usePathname()</code> hook to apply active pill styles:
              </p>
            </div>

            <pre className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`// components/site-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/settings", label: "Settings" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-3">
      {NAV_LINKS.map(({ href, label }) => {
        // Matches exact root or sub-routes (e.g. /projects and /projects/new)
        const isActive = pathname === href || pathname.startsWith(\`\${href}/\`);

        return (
          <Link
            key={href}
            href={href}
            prefetch={true}
            className={\`px-3 py-1.5 rounded-lg text-sm transition-colors \${
              isActive
                ? "bg-purple-600 text-white font-bold"
                : "text-slate-400 hover:text-white"
            }\`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}`}
            </pre>
          </section>
        );

      case "part5":
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 text-xs font-mono font-bold border border-rose-500/20">
                <span>⚠️</span>
                <span>PART 05 · PITFALLS & DEBUGGING</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Common Navigation Pitfalls
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Avoid these navigation bugs in modern Next.js:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <strong className="text-white block font-mono text-xs">
                  1. Using `window.location.href`
                </strong>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Never use <code>window.location.href = &quot;/path&quot;</code> for internal app navigation. It triggers a full browser reload, discarding your React state and client cache. Use <code>useRouter().push(&quot;/path&quot;)</code> instead!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <strong className="text-white block font-mono text-xs">
                  2. Calling `usePathname()` in a Server Component
                </strong>
                <p className="text-slate-400 text-xs leading-relaxed">
                  <code>usePathname()</code> and <code>useRouter()</code> are client-side hooks. Calling them inside a Server Component throws: <code>usePathname only works in Client Components. Add &quot;use client&quot;</code>.
                </p>
              </div>
            </div>
          </section>
        );

      case "part6":
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PART 06 · KNOWLEDGE CHECK</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Check Your Understanding
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Test your mastery of Next.js navigation primitives:
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-4">
              <h3 className="text-base font-bold text-white">
                Why does Next.js &lt;Link&gt; feel much faster than traditional HTML links?
              </h3>

              <div className="space-y-2">
                {[
                  { id: 0, text: "It compresses all images to 1kb before clicking", correct: false },
                  { id: 1, text: "It prefetches route payloads in the background as links enter the viewport and swaps components without page reloads", correct: true },
                  { id: 2, text: "It turns the browser into a native desktop executable", correct: false },
                  { id: 3, text: "It disables CSS completely during transitions", correct: false },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setQuizAnswer(option.id);
                      if (option.correct) {
                        completeLesson();
                      }
                    }}
                    className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-mono transition-all flex items-center justify-between border cursor-pointer ${
                      quizAnswer === option.id
                        ? option.correct
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                          : "bg-rose-500/20 border-rose-500 text-rose-300"
                        : "bg-white/[0.02] border-white/[0.06] text-slate-300 hover:bg-white/[0.05]"
                    }`}
                  >
                    <span>{option.text}</span>
                    {quizAnswer === option.id && (
                      <span className="font-bold">
                        {option.correct ? "✓ Exactly right! (+20 XP)" : "✗ Try again"}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-300">
      <Nav />

      <div className="relative z-10 max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        {/* 2-Column Layout: Sidebar Stepper + Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Stepper Sidebar */}
          <NextjsLessonSidebar
            lessonCode="NX-02"
            sections={SECTIONS}
            currentIndex={currentIndex}
            progressPercent={progressPercent}
            completedSectionsCount={completedSections.size}
            isAuthenticated={isAuthenticated}
            isLessonCompleted={isLessonCompleted}
            getStepState={getStepState}
            onSelectSection={handleSectionChange}
            onPrev={() =>
              currentIndex > 0 &&
              handleSectionChange(SECTIONS[currentIndex - 1].id)
            }
            onNext={() => {
              if (currentIndex < SECTIONS.length - 1) {
                handleSectionChange(SECTIONS[currentIndex + 1].id);
              } else {
                completeLesson();
              }
            }}
          />

          {/* Main Content Pane */}
          <main className="flex-1 min-w-0 max-w-5xl space-y-8">
            <header className="space-y-2 border-b border-white/[0.08] pb-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/25">
                  NX-02
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {SECTIONS[currentIndex]?.label}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Client Navigation & &lt;Link&gt;
              </h1>
              <p className="text-sm text-slate-300">
                Eliminate hard page refreshes, automatically prefetch links in the viewport, and build reactive active state headers with <code>usePathname()</code>.
              </p>
            </header>

            {renderSectionContent()}

            <NextjsLessonNavFooter currentSlug="nx02-navigation" />
          </main>
        </div>
      </div>
    </InteractiveGrid>
  );
}
