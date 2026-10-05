"use client";

import { useState, useEffect } from "react";
import { Nav } from "@/components/nav";
import { InteractiveGrid } from "@/components/interactive-grid";
import {
  Sparkles,
  Target,
} from "../components/icons";
import { NextjsLessonNavFooter } from "../components/lesson-nav-footer";
import { NextjsLessonSidebar } from "../components/lesson-sidebar";
import {
  useNextjsModuleProgress,
  NextjsSectionItem,
} from "../hooks/use-nextjs-module-progress";

const SECTIONS: NextjsSectionItem[] = [
  { id: "part1", label: "Dynamic Wildcards Concept", icon: "🎯" },
  { id: "part2", label: "Single vs Catch-All", icon: "🧩" },
  { id: "part3", label: "Interactive URL Parser", icon: "🧪" },
  { id: "part4", label: "Next.js 15 Async Params", icon: "⚡" },
  { id: "part5", label: "Common Pitfalls & Traps", icon: "⚠️" },
  { id: "part6", label: "Knowledge Check Quiz", icon: "🧠" },
];

export default function NX04DynamicRoutesPage(): JSX.Element {
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
    lessonSlug: "nx04-dynamic-routes",
    sections: SECTIONS,
  });

  const [testUrl, setTestUrl] = useState<string>("/blog/nextjs-15-deep-dive");
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const parseUrl = (url: string) => {
    const clean = url.trim().replace(/^\/|\/$/g, "");
    const parts = clean.split("/");

    if (parts[0] === "blog" && parts[1]) {
      return {
        matchedRoute: "app/blog/[slug]/page.tsx",
        patternType: "Single Dynamic Segment [slug]",
        params: { slug: parts[1] },
        codeExample: `// Next.js 15 Type-Safe Dynamic Segment
interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params; // Note: async in Next.js 15!
  return <h1>Article: {slug}</h1>;
}`,
      };
    }

    if (parts[0] === "docs") {
      const slugArray = parts.slice(1);
      return {
        matchedRoute: "app/docs/[...slug]/page.tsx",
        patternType: "Catch-All Dynamic Segment [...slug]",
        params: { slug: slugArray.length > 0 ? slugArray : ["(empty)"] },
        codeExample: `// Catch-all segment receives string array
interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function DocsPage({ params }: Props) {
  const { slug } = await params;
  return <h1>Breadcrumb: {slug.join(" > ")}</h1>;
}`,
      };
    }

    return {
      matchedRoute: "app/[...catchall]/page.tsx",
      patternType: "Generic Dynamic Route",
      params: { segments: parts },
      codeExample: `// Generic Catch-All
export default async function CatchAll({ params }: { params: Promise<{ segments: string[] }> }) {
  const { segments } = await params;
  return <pre>{JSON.stringify(segments, null, 2)}</pre>;
}`,
    };
  };

  const parsed = parseUrl(testUrl);

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
                URL Wildcards with Exact TypeScript Types
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                When building modern web apps, you cannot create a static folder for every single blog post, user profile, or e-commerce SKU. Dynamic segments act as type-safe wildcards in your filesystem:
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-lg space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    How Next.js Resolves Dynamic Paths
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    By wrapping folder names in square brackets (e.g. <code>[id]</code> or <code>[slug]</code>), Next.js passes the matched segment directly into the component&apos;s <code>params</code> prop at runtime or build time.
                  </p>
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
                <span>PART 02 · SEGMENT TYPES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                The 3 Dynamic Segment Conventions
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Next.js provides three distinct bracket patterns depending on your routing depth:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-[#0E121B] border border-purple-500/30 space-y-1.5">
                <span className="text-xs font-mono font-bold text-purple-400 block">
                  1. Single Segment [id]
                </span>
                <p className="text-xs text-slate-300">
                  Matches exactly one path segment.
                </p>
                <div className="p-2 rounded bg-black/50 font-mono text-[11px] text-slate-400">
                  /blog/[slug]<br />
                  → /blog/next-15
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0E121B] border border-sky-500/30 space-y-1.5">
                <span className="text-xs font-mono font-bold text-sky-400 block">
                  2. Catch-All [...slug]
                </span>
                <p className="text-xs text-slate-300">
                  Matches 1 or more nested segments.
                </p>
                <div className="p-2 rounded bg-black/50 font-mono text-[11px] text-slate-400">
                  /docs/[...slug]<br />
                  → /docs/api/v1/auth
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0E121B] border border-amber-500/30 space-y-1.5">
                <span className="text-xs font-mono font-bold text-amber-400 block">
                  3. Optional [[...slug]]
                </span>
                <p className="text-xs text-slate-300">
                  Matches 0 or more segments, including root.
                </p>
                <div className="p-2 rounded bg-black/50 font-mono text-[11px] text-slate-400">
                  /shop/[[...slug]]<br />
                  → /shop & /shop/shoes
                </div>
              </div>
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
                Interactive URL Segment Parser
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Type or select a URL to see how the App Router extracts params into TypeScript types:
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                  Simulated Browser Address Bar
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center bg-black/60 border border-white/10 rounded-xl px-3 py-2 font-mono text-xs">
                    <span className="text-slate-500 mr-2">https://learncraft.dev</span>
                    <input
                      type="text"
                      value={testUrl}
                      onChange={(e) => setTestUrl(e.target.value)}
                      className="flex-1 bg-transparent text-white focus:outline-none"
                      placeholder="/blog/my-first-post"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
                  <span className="text-slate-500">Presets:</span>
                  {[
                    "/blog/mastering-nextjs",
                    "/blog/react-server-components",
                    "/docs/getting-started",
                    "/docs/api/v1/authentication/tokens",
                  ].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setTestUrl(preset)}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-purple-300 font-mono text-[11px] border border-white/[0.06] cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-500">
                      Matched Filesystem Route:
                    </span>
                    <div className="text-sm font-mono font-bold text-emerald-400">
                      {parsed.matchedRoute}
                    </div>
                    <span className="text-xs text-purple-400 font-medium">
                      {parsed.patternType}
                    </span>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-white/[0.06]">
                    <span className="text-[10px] font-mono uppercase text-slate-500">
                      Extracted `params` Object:
                    </span>
                    <pre className="p-3 rounded-lg bg-black/60 border border-white/[0.04] text-xs font-mono text-amber-300">
                      {JSON.stringify(parsed.params, null, 2)}
                    </pre>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">
                    Next.js 15 Async Component Code:
                  </span>
                  <pre className="p-3 rounded-lg bg-black/60 border border-white/[0.04] text-xs font-mono text-slate-300 overflow-x-auto">
                    {parsed.codeExample}
                  </pre>
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
                <span>PART 04 · NEXT.JS 15 SHIFT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Next.js 15 Async Params Unwrapping
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                In Next.js 15, <code>params</code> and <code>searchParams</code> are delivered as asynchronous Promises to prepare for React Cache and Suspense optimizations:
              </p>
            </div>

            <pre className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`// app/blog/[slug]/page.tsx
interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  // Await the promises inside your Server Component:
  const { slug } = await params;
  const { ref } = await searchParams;

  return (
    <article className="p-6">
      <h1 className="text-2xl font-bold">Article: {slug}</h1>
      <p className="text-slate-400">Referrer: {ref || "Direct"}</p>
    </article>
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
                Common Dynamic Routing Traps
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Avoid these pitfalls when handling parameters:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <strong className="text-white block font-mono text-xs">
                  1. Synchronous params access in Next.js 15
                </strong>
                <p className="text-slate-400 text-xs leading-relaxed">
                  In Next.js 14 and below, <code>params</code> was a plain object. In Next.js 15, accessing <code>params.slug</code> directly without <code>await</code> logs a runtime warning: <code>params should be awaited before using its properties</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <strong className="text-white block font-mono text-xs">
                  2. Forgetting non-strings in generateStaticParams
                </strong>
                <p className="text-slate-400 text-xs leading-relaxed">
                  When pre-rendering static routes with <code>generateStaticParams()</code>, values in the returned objects must be strings: <code>{`{ id: String(item.id) }`}</code>. Returning numbers or booleans will cause a build-time type failure.
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
                Test your mastery of dynamic routes:
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-4">
              <h3 className="text-base font-bold text-white">
                What type does `params.slug` have in a catch-all route `app/docs/[...slug]/page.tsx`?
              </h3>

              <div className="space-y-2">
                {[
                  { id: 0, text: "string (e.g. 'guides/auth')", correct: false },
                  { id: 1, text: "string[] (e.g. ['guides', 'auth'])", correct: true },
                  { id: 2, text: "number", correct: false },
                  { id: 3, text: "Record<string, string>", correct: false },
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
                        {option.correct ? "✓ Correct! Catch-all returns string[] (+20 XP)" : "✗ Try again"}
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
            lessonCode="NX-04"
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
                    NX-04
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {SECTIONS[currentIndex]?.label}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Dynamic Segments & Type-Safe Params
                </h1>
                <p className="text-sm text-slate-300">
                  Construct dynamic URLs with bracket syntax, capture variable path segments, and handle async parameter unwrapping in modern Next.js 15.
                </p>
              </header>

              {renderSectionContent()}
            </div>

            <NextjsLessonNavFooter currentSlug="nx04-dynamic-routes" />
          </main>
        </div>
      </div>
    </InteractiveGrid>
  );
}
