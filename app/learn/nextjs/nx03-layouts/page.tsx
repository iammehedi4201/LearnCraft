"use client";

import { useState, useEffect } from "react";
import { Nav } from "@/components/nav";
import { InteractiveGrid } from "@/components/interactive-grid";
import {
  Sparkles,
  Layers,
} from "../components/icons";
import { NextjsLessonNavFooter } from "../components/lesson-nav-footer";
import { NextjsLessonSidebar } from "../components/lesson-sidebar";
import {
  useNextjsModuleProgress,
  NextjsSectionItem,
} from "../hooks/use-nextjs-module-progress";

const SECTIONS: NextjsSectionItem[] = [
  { id: "part1", label: "Mental Model: Picture Frame", icon: "🏛️" },
  { id: "part2", label: "layout.tsx vs template.tsx", icon: "⚖️" },
  { id: "part3", label: "Interactive State Retention Lab", icon: "🧪" },
  { id: "part4", label: "Route Groups Architecture", icon: "📂" },
  { id: "part5", label: "Common Pitfalls & Traps", icon: "⚠️" },
  { id: "part6", label: "Knowledge Check Quiz", icon: "🧠" },
];

export default function NX03LayoutsPage(): JSX.Element {
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
    lessonSlug: "nx03-layouts",
    sections: SECTIONS,
  });

  const [selectedTab, setSelectedTab] = useState<"overview" | "reports" | "team">("overview");
  const [sidebarSearch, setSidebarSearch] = useState<string>("next.js");
  const [pageNote, setPageNote] = useState<string>("");
  const [useTemplateMode, setUseTemplateMode] = useState<boolean>(false);
  const [navKey, setNavKey] = useState<number>(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const handleTabChange = (tab: "overview" | "reports" | "team") => {
    setSelectedTab(tab);
    if (useTemplateMode) {
      setNavKey((k) => k + 1);
      setSidebarSearch("");
      setPageNote("");
    }
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
                Mental Model: The Persistent Picture Frame
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Think of <strong>layout.tsx</strong> as a physical picture frame hanging on your wall, and <strong>page.tsx</strong> as the photograph inside it.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-lg space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5 text-purple-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Key Characteristics of Layouts
                  </h3>
                  <ul className="text-xs sm:text-sm text-slate-400 space-y-2 list-disc pl-5">
                    <li>
                      <strong className="text-slate-200">Preserves State</strong>: When navigating between sibling child routes, the layout never re-renders, protecting user inputs, sidebar collapse states, and audio/video playback.
                    </li>
                    <li>
                      <strong className="text-slate-200">Automatic Nesting</strong>: Sub-folders inherit parent layouts without duplicate boilerplate.
                    </li>
                    <li>
                      <strong className="text-slate-200">Server Side Data Fetching</strong>: Layouts can fetch authenticated session data or organization settings once for all descendant pages.
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
                <span>PART 02 · ARCHITECTURE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                layout.tsx vs template.tsx
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                While layouts persist state across navigation, templates create a brand new component instance on every single route change:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0E121B] border border-purple-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-purple-400">layout.tsx</span>
                  <span className="text-[10px] bg-purple-500/15 text-purple-300 px-2 py-0.5 rounded font-mono font-bold">
                    DEFAULT
                  </span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 leading-relaxed">
                  <li>Never unmounts during sibling route transitions</li>
                  <li>Maintains scroll position and form states</li>
                  <li>Use for headers, sidebars, context providers</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#0E121B] border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-400">template.tsx</span>
                  <span className="text-[10px] bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                    OPT-IN
                  </span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 leading-relaxed">
                  <li>Re-mounts on every route navigation</li>
                  <li>Resets all local state to initial defaults</li>
                  <li>Use for enter/exit animations or per-page logging</li>
                </ul>
              </div>
            </div>
          </section>
        );

      case "part3":
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20 mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>PART 03 · INTERACTIVE LAB</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Interactive State Retention Lab
                  </h2>
                </div>

                <button
                  onClick={() => setUseTemplateMode(!useTemplateMode)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                    useTemplateMode
                      ? "bg-amber-500/20 border-amber-500 text-amber-300"
                      : "bg-purple-500/20 border-purple-500 text-purple-300"
                  }`}
                >
                  Mode: {useTemplateMode ? "template.tsx (Resetting)" : "layout.tsx (Persistent)"}
                </button>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Type into the search input in the sidebar, switch tabs, and compare how <code>layout.tsx</code> preserves your input while <code>template.tsx</code> wipes it clean:
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-6" key={navKey}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-purple-400">
                      {useTemplateMode ? "template.tsx" : "layout.tsx"} Sidebar
                    </span>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold ${
                        useTemplateMode
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-emerald-500/20 text-emerald-300"
                      }`}
                    >
                      {useTemplateMode ? "RE-MOUNTS ON NAV" : "PERSISTS ACROSS NAV"}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Sidebar Search Filter:</label>
                    <input
                      type="text"
                      value={sidebarSearch}
                      onChange={(e) => setSidebarSearch(e.target.value)}
                      placeholder="Type something here..."
                      className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                    <span className="text-[10px] text-slate-500">
                      Value in state: &quot;{sidebarSearch}&quot;
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                      Child Routes:
                    </span>
                    {(["overview", "reports", "team"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          selectedTab === tab
                            ? "bg-purple-600 text-white font-bold"
                            : "bg-white/[0.02] text-slate-400 hover:text-white hover:bg-white/[0.04]"
                        }`}
                      >
                        /dashboard/{tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 p-5 rounded-xl bg-black/60 border border-white/[0.06] flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        page.tsx for: /dashboard/{selectedTab}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded">
                        Re-rendered on every switch
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white capitalize">
                      {selectedTab} View
                    </h3>

                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Page-level Draft Notes:</label>
                      <textarea
                        rows={2}
                        value={pageNote}
                        onChange={(e) => setPageNote(e.target.value)}
                        placeholder="Add draft note for this specific tab..."
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs text-slate-400">
                    💡 <strong>Observation:</strong> In <code>layout.tsx</code> mode, your sidebar search text persists as you switch between Overview, Reports, and Team tabs. In <code>template.tsx</code> mode, switching tabs resets state!
                  </div>
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
                <span>PART 04 · ROUTE GROUPS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Route Groups Architecture
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Folders wrapped in parentheses like <code>(marketing)</code> and <code>(dashboard)</code> are omitted from the URL path. They allow you to apply distinct layouts to different parts of your site:
              </p>
            </div>

            <pre className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`app/
├── (marketing)/              # URL segment is omitted!
│   ├── layout.tsx            # Marketing layout with Hero Header & Footer
│   ├── page.tsx              # Maps to "/"
│   └── pricing/
│       └── page.tsx          # Maps to "/pricing"
├── (dashboard)/              # URL segment is omitted!
│   ├── layout.tsx            # Authenticated layout with Sidebar & UserMenu
│   ├── dashboard/
│   │   └── page.tsx          # Maps to "/dashboard"
│   └── settings/
│       └── page.tsx          # Maps to "/settings"
└── (auth)/                   # Clean auth flow with zero navbars
    ├── layout.tsx            # Minimalist centered card layout
    ├── login/
    │   └── page.tsx          # Maps to "/login"
    └── signup/
        └── page.tsx          # Maps to "/signup"`}
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
                Common Layout & Group Traps
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Watch out for these common layout issues:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <strong className="text-white block font-mono text-xs">
                  1. Expecting layout to re-run on navigation
                </strong>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Next.js does <em>not</em> re-render a layout when switching between its children. If you need animations or logging on every page switch, use <code>template.tsx</code> instead of <code>layout.tsx</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <strong className="text-white block font-mono text-xs">
                  2. Duplicate route collisions in Route Groups
                </strong>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Because <code>(group)</code> folders do not affect the URL, having <code>app/(marketing)/about/page.tsx</code> and <code>app/(shop)/about/page.tsx</code> causes a fatal build error: <code>You cannot define the same route more than once</code>.
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
                Test your mastery of Next.js layouts and route groups:
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-4">
              <h3 className="text-base font-bold text-white">
                What public URL route does `app/(marketing)/contact/page.tsx` map to?
              </h3>

              <div className="space-y-2">
                {[
                  { id: 0, text: "/(marketing)/contact", correct: false },
                  { id: 1, text: "/marketing/contact", correct: false },
                  { id: 2, text: "/contact", correct: true },
                  { id: 3, text: "/marketing", correct: false },
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
                        {option.correct ? "✓ Correct! Parentheses folders are stripped (+20 XP)" : "✗ Try again"}
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
            lessonCode="NX-03"
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
            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-8">
              <header className="space-y-2 border-b border-white/[0.08] pb-6">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/25">
                    NX-03
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {SECTIONS[currentIndex]?.label}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Layouts, Templates & Route Groups
                </h1>
                <p className="text-sm text-slate-300">
                  Master UI persistence with <code>layout.tsx</code>, state-resetting transitions with <code>template.tsx</code>, and clean organizational boundaries with <code>(route-groups)</code>.
                </p>
              </header>

              {renderSectionContent()}
            </div>

            <NextjsLessonNavFooter currentSlug="nx03-layouts" />
          </main>
        </div>
      </div>
    </InteractiveGrid>
  );
}
