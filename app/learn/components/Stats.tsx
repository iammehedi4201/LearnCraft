"use client";

interface StatItem {
  value: string;
  label: string;
  detail: string;
  badge: string;
  badgeClass: string;
}

const stats: StatItem[] = [
  {
    value: "3 Tracks",
    label: "Core Engineering Paths",
    detail: "Next.js 15+, TanStack Query v5, NestJS Elite",
    badge: "Full-Stack",
    badgeClass: "bg-ds-feature-lighter text-ds-feature-dark",
  },
  {
    value: "69+ Lessons",
    label: "Comprehensive Modules",
    detail: "Real production patterns, architectures & guides",
    badge: "In-Depth",
    badgeClass: "bg-ds-info-lighter text-ds-info-dark",
  },
  {
    value: "100%",
    label: "Interactive Sandboxes",
    detail: "Client-side execution with zero setup required",
    badge: "Live Runtime",
    badgeClass: "bg-ds-success-lighter text-ds-success-dark",
  },
  {
    value: "100% Free",
    label: "Open Source Platform",
    detail: "High-impact engineering education for everyone",
    badge: "Open Source",
    badgeClass: "bg-ds-verified-lighter text-ds-verified-dark",
  },
];

export function Stats() {
  return (
    <section className="py-6 mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-6 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm hover:border-ds-feature-base/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl lg:text-4xl font-black text-ds-text-strong tracking-tight font-display group-hover:text-ds-feature-base transition-colors">
                  {stat.value}
                </span>
                <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${stat.badgeClass}`}>
                  {stat.badge}
                </span>
              </div>
              <h3 className="text-sm font-bold text-ds-text-strong mb-1.5">
                {stat.label}
              </h3>
              <p className="text-xs text-ds-text-sub leading-relaxed">
                {stat.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
