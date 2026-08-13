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
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-ds-text-strong mb-6 tracking-tight">The Roadmap to <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-ds-info-base to-ds-feature-base">Mastery</span></h2>
          <p className="text-ds-text-sub text-lg">A step-by-step curriculum designed to take you from a junior developer to a senior architect.</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-[2px] bg-ds-stroke-soft -translate-x-1/2" />

          <div className="space-y-12">
            {roadmap.map((item, i) => (
              <div key={item.title} className={`relative flex items-center gap-8 lg:gap-0 ${i % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Connector Dot */}
                <div className="absolute left-8 lg:left-1/2 w-10 h-10 -translate-x-1/2 z-10 flex items-center justify-center">
                  <div className={`w-full h-full rounded-full border-4 transition-all duration-500 ${item.status === 'completed' ? 'bg-ds-info-base border-ds-stroke-soft' :
                    item.status === 'current' ? 'bg-ds-bg-weak border-ds-info-base animate-pulse shadow-md' :
                      'bg-ds-bg-weak border-ds-stroke-soft'
                    }`} />
                  {item.status === 'completed' && (
                    <svg className="absolute w-5 h-5 text-ds-static-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* Content Card */}
                <div className="lg:w-1/2 pl-16 lg:px-8">
                  <div className={`p-8 rounded-[1rem] bg-ds-bg-white border border-ds-stroke-soft transition-all duration-500 group hover:-translate-y-1 ${item.status === 'current' ? 'ring-2 ring-ds-info-base/50 shadow-2xl' : ''
                    }`}>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ds-info-dark mb-2 block">{item.status}</span>
                    <h3 className="text-2xl font-bold text-ds-text-strong mb-3">{item.title}</h3>
                    <p className="text-ds-text-sub leading-relaxed group-hover:text-ds-text-strong transition-colors">{item.desc}</p>
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
