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

interface FileNode {
  path: string;
  name: string;
  type: "page" | "layout" | "route" | "folder";
  url: string;
  desc: string;
  layouts: string[];
  code: string;
}

const FILE_TREE: FileNode[] = [
  {
    path: "app/page.tsx",
    name: "page.tsx",
    type: "page",
    url: "/",
    desc: "The root landing page of the application.",
    layouts: ["app/layout.tsx"],
    code: `// app/page.tsx (Server Component by default)
export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Welcome to LearnCraft</h1>
      <p className="mt-2 text-slate-400">Master full-stack Next.js 15.</p>
    </main>
  );
}`,
  },
  {
    path: "app/layout.tsx",
    name: "layout.tsx",
    type: "layout",
    url: "Wraps all / routes",
    desc: "The mandatory Root Layout defining <html> and <body>. Preserves UI and state across page navigations.",
    layouts: [],
    code: `// app/layout.tsx (Mandatory Root Layout)
import type { Metadata } from "next";
import "@/globals.css";

export const metadata: Metadata = {
  title: "LearnCraft — Next.js Masterclass",
  description: "Job-ready full-stack learning path",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen">
        <header className="border-b border-white/10 p-4">Site Header</header>
        {children}
      </body>
    </html>
  );
}`,
  },
  {
    path: "app/dashboard/layout.tsx",
    name: "dashboard/layout.tsx",
    type: "layout",
    url: "Wraps all /dashboard/* routes",
    desc: "Nested layout for the dashboard. Renders a persistent sidebar that never re-mounts on child navigation.",
    layouts: ["app/layout.tsx"],
    code: `// app/dashboard/layout.tsx (Nested Layout)
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-white/10 p-4">
        Sidebar Navigation (Persists across tab clicks)
      </aside>
      <section className="flex-1 p-6">{children}</section>
    </div>
  );
}`,
  },
  {
    path: "app/dashboard/page.tsx",
    name: "dashboard/page.tsx",
    type: "page",
    url: "/dashboard",
    desc: "The primary dashboard overview page.",
    layouts: ["app/layout.tsx", "app/dashboard/layout.tsx"],
    code: `// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Analytics Overview</h2>
      <p className="text-slate-400 mt-2">Active students: 1,420</p>
    </div>
  );
}`,
  },
  {
    path: "app/dashboard/settings/page.tsx",
    name: "dashboard/settings/page.tsx",
    type: "page",
    url: "/dashboard/settings",
    desc: "The settings tab nested under /dashboard. Reuses both RootLayout and DashboardLayout.",
    layouts: ["app/layout.tsx", "app/dashboard/layout.tsx"],
    code: `// app/dashboard/settings/page.tsx
export default function SettingsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Account Settings</h2>
      <p className="text-slate-400 mt-2">Update your profile and API keys.</p>
    </div>
  );
}`,
  },
  {
    path: "app/api/webhooks/route.ts",
    name: "api/webhooks/route.ts",
    type: "route",
    url: "/api/webhooks",
    desc: "Backend REST endpoint handling POST webhooks (Stripe, GitHub). Returns NextResponse JSON.",
    layouts: [],
    code: `// app/api/webhooks/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();
  console.log("Received webhook:", payload.event);
  return NextResponse.json({ received: true });
}`,
  },
];

const SECTIONS: NextjsSectionItem[] = [
  { id: "part1", label: "Architecture & Mental Model", icon: "🚀" },
  { id: "part2", label: "Project Filesystem Anatomy", icon: "📁" },
  { id: "part3", label: "Interactive Router Simulator", icon: "⚡" },
  { id: "part4", label: "Layout Nesting & Hierarchy", icon: "🏛️" },
  { id: "part5", label: "Common Pitfalls & Traps", icon: "⚠️" },
  { id: "part6", label: "Knowledge Check Quiz", icon: "🧠" },
];

export default function NX01AppRouterPage(): JSX.Element {
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
    lessonSlug: "nx01-app-router",
    sections: SECTIONS,
  });

  const [selectedFile, setSelectedFile] = useState<FileNode>(FILE_TREE[0]);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const renderSectionContent = () => {
    switch (activeSection) {
      case "part1":
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            {/* Header */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PART 01 · CORE CONCEPT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Mental Model: The Folder as a Building Floor Plan
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                In traditional SPAs, routing is declared in a long JavaScript object (`react-router-dom`). In Next.js App Router, the <strong>file system itself is the route map</strong>.
              </p>
            </div>

            {/* Analogy Card */}
            <div className="p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-lg relative overflow-hidden space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5 text-purple-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    How App Router Primitives Relate
                  </h3>
                  <ul className="text-xs sm:text-sm text-slate-400 space-y-2 list-disc pl-5">
                    <li>
                      <strong className="text-slate-200">Folders</strong> create URL segments (`app/dashboard/settings` → `/dashboard/settings`).
                    </li>
                    <li>
                      <strong className="text-slate-200">page.tsx</strong> is the front door that makes a segment publicly accessible. Without a `page.tsx`, a folder is private and cannot be loaded by the browser.
                    </li>
                    <li>
                      <strong className="text-slate-200">layout.tsx</strong> is the building frame. It wraps all child pages, preserves state across page transitions, and never re-renders when navigating between sibling routes.
                    </li>
                    <li>
                      <strong className="text-slate-200">route.ts</strong> is a backend REST API endpoint. A folder cannot have both `page.tsx` and `route.ts` because one renders HTML while the other returns JSON.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">
                Pages Router vs App Router Architecture
              </h3>
              <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0E121B]">
                <table className="w-full text-xs text-left">
                  <thead className="bg-white/[0.03] text-slate-300 font-mono border-b border-white/[0.08]">
                    <tr>
                      <th className="p-3.5">Feature</th>
                      <th className="p-3.5 text-slate-400">Pages Router (Legacy)</th>
                      <th className="p-3.5 text-purple-400">App Router (Modern Next.js 15)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04] text-slate-400 font-mono">
                    <tr>
                      <td className="p-3.5 font-bold text-white">Default Component Type</td>
                      <td className="p-3.5">Client Component (hydrated in browser)</td>
                      <td className="p-3.5 text-emerald-400 font-bold">React Server Component (zero bundle footprint)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-white">Routing Directory</td>
                      <td className="p-3.5"><code>/pages</code></td>
                      <td className="p-3.5 text-purple-300"><code>/app</code> with folder segments</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-white">Layout Inheritance</td>
                      <td className="p-3.5">Custom <code>_app.tsx</code> or manual per-page layouts</td>
                      <td className="p-3.5 text-purple-300">Automatic nested <code>layout.tsx</code> wrapping</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-white">Data Fetching</td>
                      <td className="p-3.5"><code>getServerSideProps</code>, <code>getStaticProps</code></td>
                      <td className="p-3.5 text-emerald-400">Async Server Components with native <code>fetch()</code> or Prisma</td>
                    </tr>
                  </tbody>
                </table>
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
                <span>PART 02 · FILESYSTEM CONVENTIONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Anatomy of the /app Directory
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Next.js reserves special filenames within the <code>/app</code> folder. Each special file serves a dedicated role in the UI lifecycle:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0E121B] border border-white/[0.08] space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-400">
                    page.tsx
                  </span>
                  <span className="text-xs text-slate-400">Unique UI for a route</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Defines the view displayed at a specific URL. Without a <code>page.tsx</code>, a folder cannot be reached by web browsers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0E121B] border border-white/[0.08] space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-purple-500/20 text-purple-400">
                    layout.tsx
                  </span>
                  <span className="text-xs text-slate-400">Shared & persistent UI</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Wraps child routes. Preserves state, accepts <code>{`{ children }`}</code>, and does not re-mount when navigating between sub-routes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0E121B] border border-white/[0.08] space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/20 text-amber-400">
                    loading.tsx
                  </span>
                  <span className="text-xs text-slate-400">Instant Suspense skeleton</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Automatically wraps the route segment in React <code>&lt;Suspense&gt;</code>, displaying instant fallback UI while server data loads.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0E121B] border border-white/[0.08] space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-500/20 text-rose-400">
                    error.tsx
                  </span>
                  <span className="text-xs text-slate-400">Segment error boundary</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Catches runtime errors inside the segment and renders an error fallback with a <code>reset()</code> retry button without crashing the whole site.
                </p>
              </div>
            </div>

            {/* Folder Structure Code Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                Standard Enterprise Next.js App Tree
              </span>
              <pre className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`app/
├── layout.tsx              # Mandatory Root Layout (<html>, <body>, Global Providers)
├── page.tsx                # Homepage ("/")
├── globals.css             # Tailwind & Global Styles
│
├── (marketing)/            # Route Group (parentheses omitted from URL)
│   ├── layout.tsx          # Marketing layout with Hero & Navbar
│   ├── pricing/
│   │   └── page.tsx        # Maps to "/pricing"
│   └── about/
│       └── page.tsx        # Maps to "/about"
│
├── (dashboard)/            # Route Group with Private Auth Protection
│   ├── layout.tsx          # Dashboard layout with Persistent Sidebar
│   └── dashboard/
│       ├── page.tsx        # Maps to "/dashboard"
│       └── settings/
│           └── page.tsx    # Maps to "/dashboard/settings"
│
└── api/
    └── webhooks/
        └── route.ts        # Backend REST API endpoint ("/api/webhooks")`}
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
                <span>PART 03 · HANDS-ON LAB</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Interactive Router Simulator
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Click any file below to see how Next.js computes its URL, resolves layout nesting, and constructs the component tree:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#0E121B] border border-white/[0.08]">
              {/* File Selector */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase text-slate-500 font-bold block mb-2">
                  📁 Project Tree (/app)
                </span>
                {FILE_TREE.map((node) => {
                  const isSelected = selectedFile.path === node.path;
                  return (
                    <button
                      key={node.path}
                      onClick={() => setSelectedFile(node)}
                      className={`w-full text-left p-3 rounded-xl font-mono text-xs transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-purple-600/20 border border-purple-500/50 text-white font-bold"
                          : "bg-white/[0.02] border border-white/[0.04] text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]"
                      }`}
                    >
                      <span>{node.path}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                          node.type === "page"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : node.type === "layout"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-sky-500/20 text-sky-400"
                        }`}
                      >
                        {node.type}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Inspector */}
              <div className="md:col-span-2 space-y-4 flex flex-col justify-between bg-black/40 p-4 rounded-xl border border-white/[0.04]">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-500">
                        Resolved Public URL:
                      </span>
                      <div className="text-sm font-mono font-bold text-emerald-400">
                        {selectedFile.url}
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded bg-white/[0.04] text-slate-300 font-mono">
                      {selectedFile.path}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedFile.desc}
                  </p>

                  {selectedFile.layouts.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] font-mono uppercase text-slate-500">
                        Active Layout Wrappers (Outer → Inner):
                      </span>
                      <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                        {selectedFile.layouts.map((l, idx) => (
                          <span
                            key={l}
                            className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20"
                          >
                            {idx + 1}. {l}
                          </span>
                        ))}
                        <span className="text-slate-500">→</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {selectedFile.name}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="mt-3">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                      Source Implementation:
                    </span>
                    <pre className="p-3 rounded-lg bg-black/60 border border-white/[0.06] text-[11px] font-mono text-slate-300 overflow-x-auto">
                      {selectedFile.code}
                    </pre>
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
                <span>PART 04 · DEEP DIVE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Layout Nesting & Hierarchy
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Layouts in Next.js form a nested tree. An outer layout wraps inner layouts, passing them down as <code>children</code>:
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-4">
              <h3 className="text-base font-bold text-white">
                How Next.js Composes Layout Wrappers
              </h3>
              <div className="p-4 rounded-xl bg-black/60 border border-white/[0.06] font-mono text-xs text-slate-300 space-y-2">
                <div className="text-purple-400">
                  &lt;RootLayout&gt; {/* app/layout.tsx */}
                </div>
                <div className="pl-6 text-sky-400">
                  &lt;DashboardLayout&gt; {/* app/dashboard/layout.tsx */}
                </div>
                <div className="pl-12 text-emerald-400 font-bold">
                  &lt;SettingsPage /&gt; {/* app/dashboard/settings/page.tsx */}
                </div>
                <div className="pl-6 text-sky-400">&lt;/DashboardLayout&gt;</div>
                <div className="text-purple-400">&lt;/RootLayout&gt;</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-slate-300">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <strong className="text-white block font-bold">
                    State Preservation
                  </strong>
                  <p className="text-slate-400">
                    When switching from <code>/dashboard/settings</code> to <code>/dashboard/analytics</code>, <code>DashboardLayout</code> never unmounts. Sidebar state, active scroll position, and video players continue uninterrupted.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <strong className="text-white block font-bold">
                    Subtree Data Isolation
                  </strong>
                  <p className="text-slate-400">
                    A layout can fetch data required by all its children (e.g. user authentication or organization preferences) once, without duplicate database queries.
                  </p>
                </div>
              </div>
            </div>
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
                Common App Router Traps & Breaking Errors
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Avoid the most frequent mistakes that trip up engineers transitioning to Next.js App Router:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <strong className="text-white block font-mono text-xs">
                  1. Forgetting `export default`
                </strong>
                <p className="text-slate-400 text-xs leading-relaxed">
                  In Next.js App Router, every <code>page.tsx</code> and <code>layout.tsx</code> must export a default React component. Named exports (<code>export function Page()</code>) will cause:
                </p>
                <div className="p-2 rounded bg-black/60 font-mono text-[11px] text-rose-300 border border-rose-500/20">
                  Error: Default export is not a React Component in page.tsx
                </div>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <strong className="text-white block font-mono text-xs">
                  2. Missing `children` in layout.tsx
                </strong>
                <p className="text-slate-400 text-xs leading-relaxed">
                  A layout must accept and render <code>{`{ children }`}</code>. If you omit <code>{`{ children }`}</code>, nested pages will simply never render into the DOM, leaving a blank viewport.
                </p>
                <div className="p-2 rounded bg-black/60 font-mono text-[11px] text-rose-300 border border-rose-500/20">
                  export default function Layout({`{ children }`}) {`{ return <div>{children}</div>; }`}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <strong className="text-white block font-mono text-xs">
                  3. Putting Client Hooks in Server Components
                </strong>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Components in App Router are Server Components by default. Using <code>useState</code>, <code>useEffect</code>, or <code>onClick</code> handlers without adding <code>&quot;use client&quot;</code> at the top will crash during build:
                </p>
                <div className="p-2 rounded bg-black/60 font-mono text-[11px] text-rose-300 border border-rose-500/20">
                  You&apos;re importing a component that needs useState. It only works in a Client Component.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <strong className="text-white block font-mono text-xs">
                  4. Omitting `&lt;html&gt;` and `&lt;body&gt;` in Root Layout
                </strong>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Only the top-level <code>app/layout.tsx</code> must define the <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code> tags. Nested layouts must <strong>never</strong> re-declare them, or invalid HTML with multiple bodies will be generated.
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
                Test your mastery of Next.js App Router conventions:
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-4">
              <h3 className="text-base font-bold text-white">
                Which public URL does the file `app/dashboard/analytics/page.tsx` map to?
              </h3>

              <div className="space-y-2">
                {[
                  { id: 0, text: "/app/dashboard/analytics", correct: false },
                  { id: 1, text: "/dashboard/analytics", correct: true },
                  { id: 2, text: "/analytics", correct: false },
                  { id: 3, text: "/dashboard/page", correct: false },
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
                        {option.correct ? "✓ Correct! (+20 XP)" : "✗ Try again"}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {quizAnswer === 1 && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 animate-in fade-in">
                  🎉 <strong>Excellent!</strong> In the App Router, <code>/app</code> is omitted from the URL, and folders map directly to path segments. <code>page.tsx</code> marks the segment as publicly visitable at <code>/dashboard/analytics</code>.
                </div>
              )}
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
            lessonCode="NX-01"
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
                    NX-01
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {SECTIONS[currentIndex]?.label}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  The App Router Architecture
                </h1>
                <p className="text-sm text-slate-300">
                  How Next.js transforms directory trees into production URLs, wraps pages in persistent layouts, and isolates client/server boundaries.
                </p>
              </header>

              {renderSectionContent()}
            </div>

            <NextjsLessonNavFooter currentSlug="nx01-app-router" />
          </main>
        </div>
      </div>
    </InteractiveGrid>
  );
}
