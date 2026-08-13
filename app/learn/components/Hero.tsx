"use client";

import { useState, useEffect } from 'react';

const snippets = [
  {
    id: 'tanstack',
    label: 'TanStack Query',
    code: `const { data, isLoading } = useQuery({
  queryKey: ['analytics'],
  queryFn: fetchStats,
  staleTime: 60 * 1000,
  retry: 3,
});`,
    color: 'text-ds-info-base'
  },
  {
    id: 'nextjs',
    label: 'Next.js 15',
    code: `export default async function Page() {
  const stats = await getMetrics();
  
  return (
    <Dashboard data={stats} />
  );
}`,
    color: 'text-ds-feature-base'
  },
  {
    id: 'nestjs',
    label: 'NestJS Elite',
    code: `@Controller('metrics')
export class MetricsController {
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.service.get();
  }
}`,
    color: 'text-ds-error-base'
  }
];

export function Hero() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % snippets.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-20 pb-20 lg:pt-36 lg:pb-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ds-info-lighter border border-ds-info-light mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ds-info-base opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ds-info-base"></span>
              </span>
              <span className="text-xs font-bold tracking-wider text-ds-info-dark uppercase">Studio Grade Learning</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-ds-text-strong mb-8 leading-[0.9] text-balance">
              Master the <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-ds-feature-base to-ds-info-base">Modern Web</span>
            </h1>

            <p className="text-lg lg:text-xl text-ds-text-sub mb-12 max-w-lg leading-relaxed text-balance">
              Skip the surface-level tutorials. Learn the architectural patterns and
              production-ready practices used by elite engineering teams at scale.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button className="w-full sm:w-auto px-8 py-4 bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white font-semibold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-ds-feature-base/10">
                Start Learning Now
              </button>
              <button className="flex items-center gap-2 text-ds-text-sub font-semibold hover:text-ds-text-strong transition-colors group">
                View Curriculum
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side: Interactive Code Window */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-ds-feature-base to-ds-info-base rounded-[2rem] blur opacity-10 dark:opacity-20 transition duration-1000"></div>
            <div className="relative rounded-[1rem] bg-ds-bg-white border border-ds-stroke-soft overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-ds-stroke-soft bg-ds-bg-weak">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-ds-error-base/80" />
                  <div className="w-3 h-3 rounded-full bg-ds-warning-base/80" />
                  <div className="w-3 h-3 rounded-full bg-ds-success-base/80" />
                </div>
                <div className="flex gap-4">
                  {snippets.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveTab(i)}
                      className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === i ? `${s.color} font-black` : 'text-ds-text-disabled hover:text-ds-text-sub'}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Content */}
              <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto min-h-[240px] selection:bg-ds-feature-light/20">
                <div className="flex gap-6">
                  <div className="text-ds-text-disabled text-right select-none">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <pre className="text-ds-text-strong">
                    <code>
                      {snippets[activeTab].code.split('\n').map((line, i) => (
                        <div key={i} className="whitespace-pre">
                          {line.split(/([{}()@[\],.'])/).map((part, j) => {
                            if (['{', '}', '(', ')', '[', ']', '@'].includes(part)) return <span key={j} className="text-ds-feature-base">{part}</span>;
                            if (part.match(/['].*[']/)) return <span key={j} className="text-ds-success-dark">{part}</span>;
                            if (part.match(/useQuery|export|async|function|class|@Controller|@Get/)) return <span key={j} className="text-ds-info-base font-semibold">{part}</span>;
                            return <span key={j}>{part}</span>;
                          })}
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Window Footer */}
              <div className="px-6 py-3 bg-ds-bg-weak border-t border-ds-stroke-soft flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${snippets[activeTab].color.replace('text', 'bg')} animate-pulse`} />
                  <span className="text-[10px] text-ds-text-soft font-bold uppercase tracking-widest">Live Architectural Pattern</span>
                </div>
                <div className="text-[10px] text-ds-text-disabled font-bold">UTF-8</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
