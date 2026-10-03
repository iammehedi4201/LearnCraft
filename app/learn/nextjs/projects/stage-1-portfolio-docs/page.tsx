"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NEXT.JS STAGE 1 CAPSTONE PROJECT — DEVELOPER PORTFOLIO & DOCS HUB
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Combines App Router foundations (NX-01), Client Navigation (NX-02),
 * Layouts & Route Groups (NX-03), Dynamic Segments (NX-04), and Media (NX-05)
 * into a production-grade multi-page portfolio and documentation system.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";
import { Playground } from "@/components/playground/Playground";
import { recordActivity } from "@/lib/gamification";
import {
  markLessonComplete,
  isLessonComplete,
} from "@/app/learn/nextjs/data/progress-store";
import { NEXTJS_STAGE_1_CAPSTONE } from "@/app/learn/nextjs/data/nextjs-curriculum";

interface ProjectStep {
  id: number;
  title: string;
  tag: string;
  desc: string;
  instructions: string[];
  starterCode: string;
  solutionCode: string;
  hints: string[];
  tests: { name: string; code: string }[];
}

const PROJECT_STEPS: ProjectStep[] = [
  {
    id: 1,
    title: "App Router Layout & Route Hierarchy",
    tag: "Step 1: Router Hierarchy",
    desc: "Build an App Router hierarchy validator that enforces default exports, layout nesting, and computes public route URLs.",
    instructions: [
      "1. Define an interface `AppRouteNode` with `path: string`, `hasPage: boolean`, `hasLayout: boolean`, and `isRouteGroup: boolean`.",
      "2. Implement `resolvePublicUrl(folderPath: string): string` that strips route groups in parentheses like `(marketing)` or `(dashboard)` and returns the canonical URL (e.g. `app/(marketing)/pricing` → `/pricing`, `app/(dashboard)/analytics` → `/analytics`, `app/` → `/`).",
      "3. Implement `getLayoutChain(hierarchy: string[]): string[]` that returns all active `layout.tsx` files from root to leaf."
    ],
    starterCode: `// ─── STEP 1: APP ROUTER RESOLVER ───

export interface AppRouteNode {
  path: string;
  hasPage: boolean;
  hasLayout: boolean;
  isRouteGroup: boolean;
}

// 1. Strip route groups (e.g., "(marketing)") and return canonical URL
export function resolvePublicUrl(folderPath: string): string {
  // Normalize path by splitting segments
  const clean = folderPath.replace(/^app\/?/, "");
  if (!clean || clean === "/") return "/";

  const segments = clean
    .split("/")
    .filter((seg) => !seg.startsWith("(") && !seg.endsWith(")"));

  if (segments.length === 0) return "/";
  return "/" + segments.join("/");
}

// 2. Resolve nested layout chain from root down to current segment
export function getLayoutChain(hierarchy: string[]): string[] {
  // Filter and map paths that include layout.tsx
  return hierarchy.filter((file) => file.endsWith("layout.tsx"));
}

// Test your implementation:
console.log("Pricing URL:", resolvePublicUrl("app/(marketing)/pricing"));
console.log("Dashboard URL:", resolvePublicUrl("app/(dashboard)/settings"));
console.log("Layouts:", getLayoutChain([
  "app/layout.tsx",
  "app/(dashboard)/layout.tsx",
  "app/(dashboard)/settings/page.tsx"
]));
`,
    solutionCode: `export interface AppRouteNode {
  path: string;
  hasPage: boolean;
  hasLayout: boolean;
  isRouteGroup: boolean;
}

export function resolvePublicUrl(folderPath: string): string {
  const clean = folderPath.replace(/^app\/?/, "");
  if (!clean || clean === "/") return "/";

  const segments = clean
    .split("/")
    .filter((seg) => Boolean(seg) && !(seg.startsWith("(") && seg.endsWith(")")));

  if (segments.length === 0) return "/";
  return "/" + segments.join("/");
}

export function getLayoutChain(hierarchy: string[]): string[] {
  return hierarchy.filter((file) => file.endsWith("layout.tsx"));
}

console.log("Pricing URL:", resolvePublicUrl("app/(marketing)/pricing"));
console.log("Dashboard URL:", resolvePublicUrl("app/(dashboard)/settings"));
console.log("Layouts:", getLayoutChain([
  "app/layout.tsx",
  "app/(dashboard)/layout.tsx",
  "app/(dashboard)/settings/page.tsx"
]));`,
    hints: [
      "Check if a segment starts with '(' and ends with ')' to identify route groups.",
      "Root route should return '/' when all segments are stripped.",
      "Filter the array with file.endsWith('layout.tsx')."
    ],
    tests: [
      {
        name: "resolvePublicUrl strips (marketing) correctly",
        code: `const url = resolvePublicUrl("app/(marketing)/pricing"); if (url !== "/pricing") throw new Error("Expected /pricing, got " + url);`,
      },
      {
        name: "resolvePublicUrl handles nested route groups and root",
        code: `const dash = resolvePublicUrl("app/(dashboard)/team/roles"); if (dash !== "/team/roles") throw new Error("Expected /team/roles, got " + dash); const root = resolvePublicUrl("app/(marketing)"); if (root !== "/") throw new Error("Expected /, got " + root);`,
      },
      {
        name: "getLayoutChain identifies all nested layout files",
        code: `const chain = getLayoutChain(["app/layout.tsx", "app/docs/layout.tsx", "app/docs/page.tsx"]); if (chain.length !== 2 || chain[1] !== "app/docs/layout.tsx") throw new Error("Layout chain resolution failed.");`,
      },
    ],
  },
  {
    id: 2,
    title: "Dynamic Slug & Async Params Handler",
    tag: "Step 2: Dynamic Routing",
    desc: "Implement Next.js 15 async parameter unwrapping and static path generators for documentation pages.",
    instructions: [
      "1. Create an async function `unwrapParams<T>(paramsPromise: Promise<T>): Promise<T>` that safely awaits params.",
      "2. Implement `parseDocsSlug(segments: string[]): { section: string; slug: string; breadcrumb: string }`.",
      "3. Implement `generateStaticParamsMock(articles: { id: string }[]): Promise<{ slug: string }[]>` that returns array of param objects."
    ],
    starterCode: `// ─── STEP 2: DYNAMIC ROUTING & ASYNC PARAMS ───

// 1. Next.js 15 Async parameter unwrap
export async function unwrapParams<T>(paramsPromise: Promise<T>): Promise<T> {
  // Await and return the parameters
  return await paramsPromise;
}

// 2. Parse catch-all documentation slugs (e.g. ['components', 'buttons'])
export function parseDocsSlug(segments: string[]): {
  section: string;
  slug: string;
  breadcrumb: string;
} {
  const section = segments[0] || "general";
  const slug = segments[segments.length - 1] || section;
  const breadcrumb = segments.join(" > ");
  return { section, slug, breadcrumb };
}

// 3. Generate static params for build pre-rendering
export async function generateStaticParamsMock(
  articles: { id: string }[]
): Promise<{ slug: string }[]> {
  return articles.map((a) => ({ slug: a.id }));
}

// Test your logic:
async function runTest() {
  const p = unwrapParams(Promise.resolve({ slug: "mastering-nextjs" }));
  console.log("Unwrapped:", await p);

  const parsed = parseDocsSlug(["getting-started", "installation"]);
  console.log("Parsed Docs:", parsed);
}
runTest();
`,
    solutionCode: `export async function unwrapParams<T>(paramsPromise: Promise<T>): Promise<T> {
  return await paramsPromise;
}

export function parseDocsSlug(segments: string[]): {
  section: string;
  slug: string;
  breadcrumb: string;
} {
  const section = segments[0] || "general";
  const slug = segments[segments.length - 1] || section;
  const breadcrumb = segments.join(" > ");
  return { section, slug, breadcrumb };
}

export async function generateStaticParamsMock(
  articles: { id: string }[]
): Promise<{ slug: string }[]> {
  return articles.map((a) => ({ slug: a.id }));
}

async function runTest() {
  const p = unwrapParams(Promise.resolve({ slug: "mastering-nextjs" }));
  console.log("Unwrapped:", await p);
  const parsed = parseDocsSlug(["getting-started", "installation"]);
  console.log("Parsed Docs:", parsed);
}
runTest();`,
    hints: [
      "unwrapParams simply awaits the promise and returns the resolved value.",
      "parseDocsSlug takes the first segment as section, last as slug, and joins with ' > '.",
      "generateStaticParamsMock maps each item to { slug: item.id }."
    ],
    tests: [
      {
        name: "unwrapParams unwraps async params Promise",
        code: `const res = await unwrapParams(Promise.resolve({ id: "nx-101" })); if (res.id !== "nx-101") throw new Error("unwrapParams failed.");`,
      },
      {
        name: "parseDocsSlug formats section and breadcrumb",
        code: `const p = parseDocsSlug(["guide", "styling", "tailwind"]); if (p.section !== "guide" || p.slug !== "tailwind" || p.breadcrumb !== "guide > styling > tailwind") throw new Error("parseDocsSlug output incorrect.");`,
      },
      {
        name: "generateStaticParamsMock produces array of static slugs",
        code: `const params = await generateStaticParamsMock([{ id: "a" }, { id: "b" }]); if (params.length !== 2 || params[0].slug !== "a") throw new Error("generateStaticParamsMock failed.");`,
      },
    ],
  },
  {
    id: 3,
    title: "Media Optimization & Metadata Engine",
    tag: "Step 3: Core Media & SEO",
    desc: "Calculate aspect ratio bounding boxes for zero CLS and construct dynamic OpenGraph metadata.",
    instructions: [
      "1. Implement `calculateAspectRatioBox(width: number, height: number): { aspectRatio: string; paddingBottom: string }`.",
      "2. Implement `validateRemoteImage(src: string, allowedHosts: string[]): boolean` that verifies if an image URL hostname is authorized.",
      "3. Implement `generatePageMetadata(title: string, description: string): { title: string; openGraph: { title: string; description: string } }`."
    ],
    starterCode: `// ─── STEP 3: MEDIA OPTIMIZATION & METADATA ───

// 1. Calculate reserved aspect ratio to guarantee Zero CLS
export function calculateAspectRatioBox(width: number, height: number): {
  aspectRatio: string;
  paddingBottom: string;
} {
  const ratio = width / height;
  const percent = ((height / width) * 100).toFixed(2) + "%";
  return {
    aspectRatio: \`\${width} / \${height}\`,
    paddingBottom: percent,
  };
}

// 2. Security validation against next.config.js remotePatterns
export function validateRemoteImage(src: string, allowedHosts: string[]): boolean {
  try {
    const url = new URL(src);
    return allowedHosts.includes(url.hostname);
  } catch {
    return false;
  }
}

// 3. Dynamic Page Metadata Builder
export function generatePageMetadata(title: string, description: string) {
  const fullTitle = \`\${title} | LearnCraft\`;
  return {
    title: fullTitle,
    openGraph: {
      title: fullTitle,
      description,
    },
  };
}

// Test your logic:
console.log("Aspect Box:", calculateAspectRatioBox(1920, 1080));
console.log("Allowed image:", validateRemoteImage("https://images.unsplash.com/photo-1", ["images.unsplash.com"]));
console.log("Metadata:", generatePageMetadata("My Portfolio", "Full-stack developer"));
`,
    solutionCode: `export function calculateAspectRatioBox(width: number, height: number): {
  aspectRatio: string;
  paddingBottom: string;
} {
  const percent = ((height / width) * 100).toFixed(2) + "%";
  return {
    aspectRatio: \`\${width} / \${height}\`,
    paddingBottom: percent,
  };
}

export function validateRemoteImage(src: string, allowedHosts: string[]): boolean {
  try {
    const url = new URL(src);
    return allowedHosts.includes(url.hostname);
  } catch {
    return false;
  }
}

export function generatePageMetadata(title: string, description: string) {
  const fullTitle = \`\${title} | LearnCraft\`;
  return {
    title: fullTitle,
    openGraph: {
      title: fullTitle,
      description,
    },
  };
}

console.log("Aspect Box:", calculateAspectRatioBox(1920, 1080));
console.log("Allowed image:", validateRemoteImage("https://images.unsplash.com/photo-1", ["images.unsplash.com"]));
console.log("Metadata:", generatePageMetadata("My Portfolio", "Full-stack developer"));`,
    hints: [
      "Use new URL(src).hostname to extract domain name.",
      "calculateAspectRatioBox returns aspect ratio and padding bottom percentage.",
      "generatePageMetadata suffixes title with '| LearnCraft'."
    ],
    tests: [
      {
        name: "calculateAspectRatioBox calculates exact 16:9 ratio",
        code: `const box = calculateAspectRatioBox(1600, 900); if (box.aspectRatio !== "1600 / 900" || box.paddingBottom !== "56.25%") throw new Error("Aspect ratio calculation mismatch: " + JSON.stringify(box));`,
      },
      {
        name: "validateRemoteImage blocks unauthorized hostnames",
        code: `const ok = validateRemoteImage("https://cdn.mysite.com/avatar.jpg", ["cdn.mysite.com"]); const blocked = validateRemoteImage("https://evil.com/hack.jpg", ["cdn.mysite.com"]); if (!ok || blocked) throw new Error("validateRemoteImage security check failed.");`,
      },
      {
        name: "generatePageMetadata structures title and openGraph",
        code: `const meta = generatePageMetadata("Docs", "Official documentation"); if (!meta.title.includes("Docs | LearnCraft") || meta.openGraph.description !== "Official documentation") throw new Error("Metadata generation failed.");`,
      },
    ],
  },
];

export default function Stage1PortfolioDocsProjectPage(): JSX.Element {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [isCompletedInDb, setIsCompletedInDb] = useState(false);

  const activeStep = useMemo(
    () => PROJECT_STEPS.find((s) => s.id === activeStepId) || PROJECT_STEPS[0],
    [activeStepId]
  );

  useEffect(() => {
    setIsCompletedInDb(isLessonComplete("stage-1-portfolio-docs"));
  }, []);

  const handleStepPassed = (stepId: number) => {
    setCompletedSteps((prev) => {
      const updated = { ...prev, [stepId]: true };

      // If all 3 steps completed
      const allPassed = PROJECT_STEPS.every((s) => updated[s.id]);
      if (allPassed && !isCompletedInDb) {
        // Award 100 XP
        recordActivity(
          "project_complete",
          "Stage 1 Capstone: Developer Portfolio & Docs Hub",
          { skill: "nextjs", project: "stage-1-portfolio-docs" }
        );
        markLessonComplete("stage-1-portfolio-docs");
        setIsCompletedInDb(true);
        setShowCelebration(true);
      }
      return updated;
    });
  };

  return (
    <InteractiveGrid className="min-h-screen bg-[#0A0D14] text-white selection:bg-purple-500/20 font-sans">
      <Nav />

      <main className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium flex-wrap">
            <Link
              href="/learn/nextjs"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>←</span>
              <span>Next.js Curriculum</span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-purple-400 font-mono font-bold">Stage 01</span>
            <span className="text-slate-600">/</span>
            <span className="text-purple-300 font-semibold">Capstone Project</span>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-purple-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    🛠️ Stage 1 Capstone Project
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    +{NEXTJS_STAGE_1_CAPSTONE.xpReward} XP Reward
                  </span>
                  {isCompletedInDb && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Project Mastered ✅</span>
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  {NEXTJS_STAGE_1_CAPSTONE.title}
                </h1>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {NEXTJS_STAGE_1_CAPSTONE.desc}
                </p>

                {/* Progress Steps Indicators */}
                <div className="flex items-center gap-2 pt-2 flex-wrap">
                  {PROJECT_STEPS.map((step) => {
                    const isPassed = Boolean(completedSteps[step.id]);
                    const isCurrent = step.id === activeStepId;
                    return (
                      <button
                        key={step.id}
                        onClick={() => setActiveStepId(step.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                          isCurrent
                            ? "bg-purple-600/30 border-purple-500 text-purple-200 shadow-md"
                            : isPassed
                            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                            : "bg-white/[0.03] border-white/[0.06] text-slate-400 hover:text-white"
                        }`}
                      >
                        <span>Step 0{step.id}</span>
                        {isPassed && <span>✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Completion Overview */}
              <div className="shrink-0 p-5 rounded-2xl bg-black/40 border border-white/[0.06] text-center space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 block">
                  Project Progress
                </span>
                <div className="text-2xl font-mono font-black text-emerald-400">
                  {Object.keys(completedSteps).length} / {PROJECT_STEPS.length}
                </div>
                <span className="text-[11px] text-slate-400 block">
                  Steps Completed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Step Playground Workspace */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                {activeStep.tag}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {activeStep.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {activeStep.desc}
              </p>
            </div>

            {/* Step Switcher Buttons */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                disabled={activeStepId === 1}
                onClick={() => setActiveStepId((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-bold text-slate-300 hover:text-white transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                ← Previous Step
              </button>
              <button
                disabled={activeStepId === PROJECT_STEPS.length}
                onClick={() =>
                  setActiveStepId((prev) =>
                    Math.min(PROJECT_STEPS.length, prev + 1)
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                Next Step →
              </button>
            </div>
          </div>

          {/* Requirements Callout */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
              <span>📋</span> Requirements & Specification
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-slate-300">
              {activeStep.instructions.map((inst, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#0E121B] border border-white/[0.04]"
                >
                  {inst}
                </div>
              ))}
            </div>
          </div>

          {/* Sandboxed Interactive Playground */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0E121B] overflow-hidden shadow-2xl">
            <Playground
              key={`step-${activeStep.id}`}
              runtime="typescript"
              language="TypeScript"
              exercise={{
                id: `nextjs-capstone-1-step-${activeStep.id}`,
                title: activeStep.title,
                instructions: activeStep.desc,
                starterCode: activeStep.starterCode,
                solutionCode: activeStep.solutionCode,
                hints: activeStep.hints,
                tests: activeStep.tests,
                difficulty: activeStep.id === 3 ? "intermediate" : "beginner",
              }}
              onSuccess={() => handleStepPassed(activeStep.id)}
              height="500px"
            />
          </div>
        </div>

        {/* Celebration Modal */}
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="max-w-md w-full p-8 rounded-3xl bg-[#0E121B] border border-purple-500/40 shadow-[0_25px_60px_rgba(125,82,244,0.3)] text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-purple-600 to-emerald-400 flex items-center justify-center text-4xl shadow-xl shadow-purple-600/30 animate-bounce">
                🏆
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Capstone Mastered
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Stage 1 Complete! 🎉
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  You successfully built the core App Router, Dynamic Segments, and Media Optimizer engines.
                  You earned <strong className="text-purple-400">+100 XP</strong> and unlocked Stage 2 (React Server Components & Data Streaming)!
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowCelebration(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Review Code
                </button>
                <Link
                  href="/learn/nextjs"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-colors shadow-lg shadow-purple-600/30 cursor-pointer"
                >
                  Go to Stage 2 →
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
