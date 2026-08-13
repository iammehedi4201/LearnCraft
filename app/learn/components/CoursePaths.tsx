"use client";

import Link from "next/link";

interface CourseTrack {
  id: string;
  title: string;
  badge: string;
  moduleCount: string;
  description: string;
  href: string;
  highlights: string[];
  colorTokens: {
    badge: string;
    iconBg: string;
    iconText: string;
    actionText: string;
    borderHover: string;
  };
  icon: JSX.Element;
}

const courses: CourseTrack[] = [
  {
    id: "nextjs",
    title: "Next.js 15+ Mastery",
    badge: "Full-Stack & Edge",
    moduleCount: "20 Modules",
    description:
      "Master React 19 Server Components, Server Actions, streaming, ISR caching strategies, route handlers, and edge deployment.",
    href: "/learn/nextjs",
    highlights: ["App Router & RSC", "Server Actions", "Streaming & Suspense", "Granular Caching"],
    colorTokens: {
      badge: "bg-ds-feature-lighter text-ds-feature-dark",
      iconBg: "bg-ds-feature-lighter",
      iconText: "text-ds-feature-dark",
      actionText: "text-ds-feature-base group-hover:text-ds-feature-dark",
      borderHover: "hover:border-ds-feature-base/50",
    },
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    id: "tanstack",
    title: "TanStack Query v5",
    badge: "Async State Engine",
    moduleCount: "22 Modules",
    description:
      "Architect bulletproof asynchronous UI state. Master query keys, mutations, optimistic updates, infinite scrolling, and background sync.",
    href: "/learn/tanstack",
    highlights: ["Optimistic UI", "Query Invalidation", "Infinite Pagination", "SSR Hydration"],
    colorTokens: {
      badge: "bg-ds-info-lighter text-ds-info-dark",
      iconBg: "bg-ds-info-lighter",
      iconText: "text-ds-info-dark",
      actionText: "text-ds-info-base group-hover:text-ds-info-dark",
      borderHover: "hover:border-ds-info-base/50",
    },
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" />
        <path d="m16 16 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "nestjs",
    title: "NestJS Elite Backend",
    badge: "Enterprise Architecture",
    moduleCount: "27 Modules",
    description:
      "Build scalable, testable, and production-grade Node.js services with clean architecture, dependency injection, guards, and microservices.",
    href: "/learn/nestjs",
    highlights: ["Dependency Injection", "Guards & JWT Auth", "Microservices", "Swagger & DTOs"],
    colorTokens: {
      badge: "bg-ds-error-lighter text-ds-error-dark",
      iconBg: "bg-ds-error-lighter",
      iconText: "text-ds-error-dark",
      actionText: "text-ds-error-base group-hover:text-ds-error-dark",
      borderHover: "hover:border-ds-error-base/50",
    },
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="m9 8 6 4-6 4V8z" />
      </svg>
    ),
  },
];

export function CoursePaths() {
  return (
    <section id="curriculums" className="py-12 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-ds-feature-lighter text-ds-feature-dark">
              Curriculums
            </span>
            <span className="text-xs text-ds-text-soft font-semibold">
              69+ Total Lessons
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-ds-text-strong font-display">
            Choose Your Specialization Path
          </h2>
          <p className="text-sm sm:text-base text-ds-text-sub mt-2">
            Structured step-by-step tracks packed with real architecture code, interactive playgrounds, and production mental models.
          </p>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={course.href}
            className={`group relative flex flex-col justify-between p-8 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft ${course.colorTokens.borderHover} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
          >
            <div>
              {/* Header: Icon and Badges */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className={`p-3.5 rounded-xl ${course.colorTokens.iconBg} ${course.colorTokens.iconText} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {course.icon}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${course.colorTokens.badge}`}>
                    {course.badge}
                  </span>
                </div>
              </div>

              {/* Title & Count */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="text-xl font-bold text-ds-text-strong group-hover:text-ds-feature-base transition-colors">
                  {course.title}
                </h3>
              </div>

              <span className="inline-block text-[11px] font-bold text-ds-text-soft uppercase tracking-wider mb-4">
                {course.moduleCount}
              </span>

              {/* Description */}
              <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-6">
                {course.description}
              </p>

              {/* Highlights Chips */}
              <div className="space-y-2 mb-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-ds-text-soft">
                  Key Focus Areas
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {course.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-ds-bg-weak text-ds-text-sub"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action Link */}
            <div className={`pt-6 border-t border-ds-stroke-soft flex items-center justify-between text-xs font-bold ${course.colorTokens.actionText} transition-all`}>
              <span>Start Track</span>
              <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
