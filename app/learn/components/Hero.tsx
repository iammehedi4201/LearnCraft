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
    color: 'text-blue-400'
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
    color: 'text-indigo-400'
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
    color: 'text-red-400'
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
    <section className="relative pt-20 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-bold tracking-wider text-blue-500 dark:text-blue-400 uppercase">Studio Grade Learning</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-foreground mb-8 leading-[0.9] text-balance">
              Master the <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">Modern Web</span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-lg leading-relaxed text-balance">
              Skip the surface-level tutorials. Learn the architectural patterns and
              production-ready practices used by elite engineering teams at scale.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button className="w-full sm:w-auto group relative px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl">
                Start Learning Now
              </button>
              <button className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-bold hover:text-foreground transition-colors group">
                View Curriculum
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side: Interactive Code Window */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2rem] blur opacity-10 dark:opacity-20 transition duration-1000"></div>
            <div className="relative rounded-[1rem] bg-slate-950 dark:bg-[#0b1120] border border-white/10 overflow-hidden shadow-2xl">
              {/* Window Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex gap-4">
                  {snippets.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveTab(i)}
                      className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === i ? s.color : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Content */}
              <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto min-h-[240px]">
                <div className="flex gap-6">
                  <div className="text-slate-600 text-right select-none">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <pre className="text-slate-300">
                    <code>
                      {snippets[activeTab].code.split('\n').map((line, i) => (
                        <div key={i} className="whitespace-pre">
                          {line.split(/([{}()@[\],.'])/).map((part, j) => {
                            if (['{', '}', '(', ')', '[', ']', '@'].includes(part)) return <span key={j} className="text-indigo-400">{part}</span>;
                            if (part.match(/['].*[']/)) return <span key={j} className="text-emerald-400">{part}</span>;
                            if (part.match(/useQuery|export|async|function|class|@Controller|@Get/)) return <span key={j} className="text-blue-400 font-bold">{part}</span>;
                            return <span key={j}>{part}</span>;
                          })}
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Window Footer */}
              <div className="px-6 py-3 bg-white/5 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${snippets[activeTab].color.replace('text', 'bg')} animate-pulse`} />
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Live Architectural Pattern</span>
                </div>
                <div className="text-[10px] text-slate-600 font-bold">UTF-8</div>
              </div>
            </div>

            {/* Floating Accents */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
