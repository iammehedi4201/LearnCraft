"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Snippet {
  id: string;
  label: string;
  badge: string;
  filename: string;
  code: string;
  color: string;
  accentClass: string;
}

const snippets: Snippet[] = [
  {
    id: "nextjs",
    label: "Next.js 15",
    badge: "App Router & Actions",
    filename: "app/dashboard/page.tsx",
    code: `// Server Component with Streaming & Actions
export default async function DashboardPage() {
  const metrics = await getProductionMetrics();
  
  return (
    <Suspense fallback={<MetricsSkeleton />}>
      <AnalyticsFeed data={metrics} />
      <OptimisticTracker initial={metrics.liveCount} />
    </Suspense>
  );
}`,
    color: "text-ds-feature-base",
    accentClass: "bg-ds-feature-lighter text-ds-feature-dark",
  },
  {
    id: "tanstack",
    label: "TanStack Query",
    badge: "v5 Optimistic State",
    filename: "hooks/use-realtime-query.ts",
    code: `export function useLiveMetrics() {
  return useQuery({
    queryKey: ['system', 'metrics'],
    queryFn: fetchProductionMetrics,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true,
    placeholderData: keepPreviousData,
  });
}`,
    color: "text-ds-info-base",
    accentClass: "bg-ds-info-lighter text-ds-info-dark",
  },
  {
    id: "nestjs",
    label: "NestJS Elite",
    badge: "Enterprise DI & Guards",
    filename: "src/analytics/analytics.controller.ts",
    code: `@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnalyticsController {
  constructor(private readonly service: MetricsService) {}

  @Get('realtime')
  @Roles('ARCHITECT')
  async getLiveFeed(@Query() filter: FilterDto) {
    return this.service.getTelemetry(filter);
  }
}`,
    color: "text-ds-error-base",
    accentClass: "bg-ds-error-lighter text-ds-error-dark",
  },
];

export function Hero() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % snippets.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeSnippet = snippets[activeTab];

  return (
    <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Side: Editorial Content */}
        <div className="lg:col-span-7 space-y-8">
          {/* Studio Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-ds-feature-lighter shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ds-feature-base opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-ds-feature-base"></span>
            </span>
            <span className="text-xs font-bold tracking-wider text-ds-feature-dark uppercase">
              LearnCraft v2.0 • Studio-Grade Platform
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-ds-text-strong font-display leading-[1.08] text-balance">
            Master the{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-ds-feature-base via-ds-info-base to-ds-verified-base">
              Modern Web Stack
            </span>{" "}
            at Production Scale.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-ds-text-sub max-w-2xl leading-relaxed text-balance">
            Skip surface-level tutorials. Learn full-stack architectural patterns,
            asynchronous state, and enterprise backend design with interactive in-browser
            playgrounds and real-world mental models.
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {[
              { icon: "⚡", label: "Zero-Setup Runtime", desc: "Live in-browser runner" },
              { icon: "🎯", label: "69+ Deep Modules", desc: "Next.js, TanStack & Nest" },
              { icon: "🧪", label: "Built-in Tests", desc: "Instant assertion checks" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-3 p-3 rounded-xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm"
              >
                <span className="text-xl">{f.icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-ds-text-strong">{f.label}</h4>
                  <p className="text-[11px] text-ds-text-soft">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              href="#curriculums"
              className="px-6 py-3.5 bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white font-bold rounded-xl transition-all duration-200 active:scale-95 shadow-md shadow-ds-feature-base/15 text-center text-sm flex items-center justify-center gap-2 group"
            >
              Explore Curriculums
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="#playground-showcase"
              className="px-6 py-3.5 bg-ds-bg-soft hover:bg-ds-bg-sub text-ds-text-strong font-bold rounded-xl transition-all duration-200 border border-ds-stroke-soft text-center text-sm flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-ds-feature-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              View Learning Engine
            </Link>
          </div>
        </div>

        {/* Right Side: Interactive Code & Architecture Window */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl bg-ds-bg-white border border-ds-stroke-soft shadow-xl overflow-hidden transition-all duration-300">
            {/* Window Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5 border-b border-ds-stroke-soft bg-ds-bg-weak">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-ds-error-base" />
                <div className="w-3 h-3 rounded-full bg-ds-warning-base" />
                <div className="w-3 h-3 rounded-full bg-ds-success-base" />
                <span className="ml-2 font-mono text-[11px] text-ds-text-soft hidden sm:inline-block">
                  {activeSnippet.filename}
                </span>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center gap-1 bg-ds-bg-white p-1 rounded-xl border border-ds-stroke-soft shadow-inner">
                {snippets.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveTab(i)}
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                      activeTab === i
                        ? "bg-ds-feature-base text-ds-static-white shadow-sm"
                        : "text-ds-text-soft hover:text-ds-text-strong"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Content */}
            <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[260px] bg-ds-bg-white text-ds-text-strong">
              <div className="flex gap-4">
                <div className="text-ds-text-disabled text-right select-none pr-2 border-r border-ds-stroke-soft/60">
                  {activeSnippet.code.split("\n").map((_, i) => (
                    <div key={i} className="text-[11px]">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <pre className="flex-1">
                  <code>
                    {activeSnippet.code.split("\n").map((line, i) => (
                      <div key={i} className="whitespace-pre">
                        {line.split(/([{}()@[\],.;'"])/).map((part, j) => {
                          if (["{", "}", "(", ")", "[", "]", "@", ";", "."].includes(part)) {
                            return <span key={j} className="text-ds-feature-base font-bold">{part}</span>;
                          }
                          if (part.startsWith("'") || part.startsWith('"') || part.endsWith("'") || part.endsWith('"')) {
                            return <span key={j} className="text-ds-success-dark font-medium">{part}</span>;
                          }
                          if (
                            [
                              "export",
                              "default",
                              "async",
                              "function",
                              "const",
                              "return",
                              "import",
                              "from",
                              "constructor",
                              "private",
                              "readonly",
                              "class",
                            ].includes(part.trim())
                          ) {
                            return <span key={j} className="text-ds-info-base font-bold">{part}</span>;
                          }
                          if (part.includes("//")) {
                            return <span key={j} className="text-ds-text-disabled italic">{part}</span>;
                          }
                          if (["Controller", "UseGuards", "Get", "Query", "Roles", "Suspense", "useQuery"].includes(part.trim())) {
                            return <span key={j} className="text-ds-highlighted-base font-semibold">{part}</span>;
                          }
                          return <span key={j}>{part}</span>;
                        })}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>

            {/* Window Footer */}
            <div className="px-5 py-3 bg-ds-bg-weak border-t border-ds-stroke-soft flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${activeSnippet.accentClass}`}>
                  {activeSnippet.badge}
                </span>
              </div>
              <span className="text-[10px] font-mono text-ds-text-soft">
                Interactive Preview
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
