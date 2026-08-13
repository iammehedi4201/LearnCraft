"use client";

interface RoadmapStep {
  step: string;
  phase: string;
  title: string;
  badge: string;
  badgeColor: string;
  desc: string;
  keySkills: string[];
}

const roadmapSteps: RoadmapStep[] = [
  {
    step: "01",
    phase: "Phase 1",
    title: "Foundations & Architecture Mental Models",
    badge: "Core Basics",
    badgeColor: "bg-ds-feature-lighter text-ds-feature-dark",
    desc: "Understand the core mental models of modern full-stack web applications: Client vs Server execution environments, strict TypeScript type safety, and component lifecycle.",
    keySkills: ["TypeScript Strict Mode", "Server Component Boundaries", "Module Patterns"],
  },
  {
    step: "02",
    phase: "Phase 2",
    title: "Full-Stack Rendering & Edge Caching",
    badge: "Next.js Mastery",
    badgeColor: "bg-ds-info-lighter text-ds-info-dark",
    desc: "Master Server Actions, granular caching layers, streaming with Suspense, ISR revalidation, and deploying edge middleware.",
    keySkills: ["Server Actions", "Streaming & Suspense", "Granular ISR", "Edge Middleware"],
  },
  {
    step: "03",
    phase: "Phase 3",
    title: "Asynchronous State & Optimistic UI",
    badge: "TanStack Query",
    badgeColor: "bg-ds-success-lighter text-ds-success-dark",
    desc: "Eliminate race conditions and UI lag with deterministic query keys, mutation rollback handlers, infinite virtualization, and server state hydration.",
    keySkills: ["Optimistic UI Rollbacks", "Deterministic Invalidation", "Infinite Pagination"],
  },
  {
    step: "04",
    phase: "Phase 4",
    title: "Enterprise Backend & Microservices",
    badge: "NestJS Elite",
    badgeColor: "bg-ds-error-lighter text-ds-error-dark",
    desc: "Architect scalable backend services using Dependency Injection, Guards, Interceptors, WebSockets, Message Queues, and Microservice transports.",
    keySkills: ["Inversion of Control (DI)", "Guards & JWT", "Microservices & Message Brokers"],
  },
];

export function Roadmap() {
  return (
    <section className="py-16">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ds-feature-lighter mb-4">
          <span className="text-xs font-bold tracking-wider text-ds-feature-dark uppercase">
            Architect Roadmap
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-ds-text-strong font-display">
          The Proven Path to Senior Web Engineering
        </h2>
        <p className="text-sm sm:text-base text-ds-text-sub mt-3 leading-relaxed max-w-xl mx-auto">
          A structured sequence designed to take you from foundational understanding to full-stack architectural mastery.
        </p>
      </div>

      {/* Timeline Grid */}
      <div className="relative max-w-4xl mx-auto">
        {/* Timeline connector line */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-ds-stroke-soft -translate-x-1/2 hidden sm:block" />

        <div className="space-y-8 sm:space-y-12">
          {roadmapSteps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={step.step}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 ${
                  isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Center Badge / Step Node */}
                <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 z-10 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-xl bg-ds-feature-lighter text-ds-feature-dark font-black text-xs flex items-center justify-center shadow-sm">
                    {step.step}
                  </div>
                </div>

                {/* Content Card */}
                <div className="w-full sm:w-[calc(50%-2rem)]">
                  <div className="p-6 lg:p-7 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft hover:border-ds-feature-base/40 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="text-[10px] font-bold text-ds-text-soft uppercase tracking-widest">
                        {step.phase}
                      </span>
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${step.badgeColor}`}>
                        {step.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-ds-text-strong group-hover:text-ds-feature-base transition-colors mb-2">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-4">
                      {step.desc}
                    </p>

                    {/* Skill chips */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-ds-stroke-soft">
                      {step.keySkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-ds-bg-weak text-ds-text-sub"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
