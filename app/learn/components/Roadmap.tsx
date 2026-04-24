"use client";



const roadmap = [
  {
    title: "Foundations",
    desc: "Master the core concepts of React and Next.js Architecture, including rendering strategies and data fetching fundamentals.",
    status: "completed"
  },
  {
    title: "Advanced Patterns",
    desc: "Deep dive into Server Components, ISR, Caching, and modern React 19 features like Actions and useFormStatus.",
    status: "current"
  },
  {
    title: "State Mastery",
    desc: "Unlock the power of TanStack Query for complex data flows, optimistic updates, and infinite scrolling.",
    status: "upcoming"
  },
  {
    title: "Production Deployment",
    desc: "Deploy at scale with Vercel and Edge Runtime, implementing monitoring, analytics, and performance optimization.",
    status: "upcoming"
  },
];

export function Roadmap() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-6 tracking-tight">The Roadmap to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Mastery</span></h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">A step-by-step curriculum designed to take you from a junior developer to a senior architect.</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-indigo-500/20 to-transparent -translate-x-1/2 hidden lg:block" />

          <div className="space-y-12">
            {roadmap.map((item, i) => (
              <div key={item.title} className={`relative flex items-center gap-8 lg:gap-0 ${i % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Connector Dot */}
                <div className="absolute left-8 lg:left-1/2 w-10 h-10 -translate-x-1/2 z-10 flex items-center justify-center">
                  <div className={`w-full h-full rounded-full border-4 transition-all duration-500 ${item.status === 'completed' ? 'bg-blue-500 border-white/10 dark:border-slate-900' :
                    item.status === 'current' ? 'bg-background border-blue-500 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]' :
                      'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-white/5'
                    }`} />
                  {item.status === 'completed' && (
                    <svg className="absolute w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* Content Card */}
                <div className="lg:w-1/2 pl-16 lg:px-8">
                  <div className={`p-8 rounded-[1rem] glass-card transition-all duration-500 group hover:-translate-y-1 ${item.status === 'current' ? 'ring-2 ring-blue-500/50 shadow-2xl shadow-blue-500/5' : ''
                    }`}>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-2 block">{item.status}</span>
                    <h3 className="text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
