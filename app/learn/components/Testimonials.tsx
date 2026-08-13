"use client";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
  trackPraise: string;
  badgeClass: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Alex Rivers",
    role: "Staff Software Architect",
    company: "Meta",
    avatar: "AR",
    text: "This is the curriculum I wish I had when building enterprise web applications. The Next.js 15 Server Action patterns and ISR caching explanations alone saved our team weeks of refactoring on high-traffic consumer endpoints.",
    trackPraise: "Next.js 15 Track",
    badgeClass: "bg-ds-feature-lighter text-ds-feature-dark",
  },
  {
    name: "Elena Chen",
    role: "Lead Frontend Engineer",
    company: "Stripe",
    avatar: "EC",
    text: "Completely transformed how our engineers reason about server state. The TanStack Query v5 optimistic mutations and cache invalidation guides are the clearest, most production-accurate materials available today.",
    trackPraise: "TanStack Query Track",
    badgeClass: "bg-ds-info-lighter text-ds-info-dark",
  },
  {
    name: "Marcus Thorne",
    role: "Principal Systems Engineer",
    company: "Vercel",
    avatar: "MT",
    text: "The combination of in-browser interactive sandboxes with clean, modular architecture breakdowns makes LearnCraft stand in a league of its own. It bridges the gap between docs and high-scale production systems.",
    trackPraise: "NestJS & Sandboxes",
    badgeClass: "bg-ds-success-lighter text-ds-success-dark",
  },
];

export function Testimonials() {
  return (
    <section className="py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-ds-away-lighter text-ds-away-dark">
              Developer Reviews
            </span>
            <span className="text-xs text-ds-text-soft font-semibold">
              Trusted by Architects
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-ds-text-strong font-display">
            Endorsed by Engineers at Scale
          </h2>
          <p className="text-sm sm:text-base text-ds-text-sub mt-2">
            See why senior engineers and tech leads use LearnCraft to upskill their teams.
          </p>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {testimonials.map((item) => (
          <div
            key={item.name}
            className="p-7 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft hover:border-ds-feature-base/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Star Rating & Track Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-1 text-ds-away-base">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${item.badgeClass}`}>
                  {item.trackPraise}
                </span>
              </div>

              {/* Quote */}
              <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-6 italic">
                &ldquo;{item.text}&rdquo;
              </p>
            </div>

            {/* Author Footer */}
            <div className="flex items-center gap-3 pt-5 border-t border-ds-stroke-soft">
              <div className="w-10 h-10 rounded-xl bg-ds-feature-lighter text-ds-feature-dark font-black text-sm flex items-center justify-center shadow-sm">
                {item.avatar}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-ds-text-strong">
                  {item.name}
                </h4>
                <p className="text-[11px] text-ds-text-soft font-medium">
                  {item.role} • <span className="text-ds-text-strong font-semibold">{item.company}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
