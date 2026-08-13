"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
  badge: string;
}

const faqs: FAQItem[] = [
  {
    q: "How does LearnCraft differ from standard official documentation?",
    a: "Official documentation teaches you what APIs exist. LearnCraft teaches you how to architect production-ready systems using those APIs. Every lesson features architectural trade-offs, mental models, failure recovery patterns, and live in-browser sandboxes with instant test feedback.",
    badge: "Methodology",
  },
  {
    q: "Are the curriculums updated for Next.js 15, React 19, and TanStack Query v5?",
    a: "Yes. All code snippets, lessons, and interactive playground examples are built for and tested against Next.js 15+ (App Router, Server Actions, granular caching), React 19 Server Components, and TanStack Query v5.",
    badge: "Modern Stack",
  },
  {
    q: "How does the in-browser sandbox playground work?",
    a: "LearnCraft features a client-side execution sandbox runtime. You can edit code, trigger runs, inspect console telemetry, and validate test assertions without installing Node.js, Docker, or any local dependencies.",
    badge: "Interactive Engine",
  },
  {
    q: "Are these architectural patterns suitable for enterprise production scale?",
    a: "Absolutely. The patterns taught across Next.js, TanStack Query, and NestJS tracks reflect architectures implemented at high-scale tech companies (Meta, Stripe, Vercel) — including optimistic UI rollbacks, resilient cache invalidation, and decoupled microservice communication.",
    badge: "Enterprise Grade",
  },
  {
    q: "Is LearnCraft free and open-source?",
    a: "Yes! LearnCraft is 100% free and open-source. Our mission is to democratize elite, studio-grade engineering education for developers worldwide.",
    badge: "Open Source",
  },
  {
    q: "Can I jump directly to advanced modules if I already know the basics?",
    a: "Yes. Every curriculum track is structured to be modular and non-linear. You can jump directly into advanced topics like Server Actions, ISR Caching, Optimistic UI, or Microservices at any time.",
    badge: "Flexible Learning",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ds-feature-lighter mb-3">
            <span className="text-xs font-bold tracking-wider text-ds-feature-dark uppercase">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-ds-text-strong font-display">
            Everything You Need to Know
          </h2>
          <p className="text-sm sm:text-base text-ds-text-sub mt-2 max-w-xl mx-auto">
            Got questions about our curriculums, interactive sandboxes, or architecture guides? We&apos;ve got answers.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                className={`rounded-2xl bg-ds-bg-white border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-ds-feature-base shadow-sm ring-1 ring-ds-feature-base/20"
                    : "border-ds-stroke-soft hover:border-ds-stroke-sub"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm sm:text-base font-bold text-ds-text-strong">
                      {faq.q}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full bg-ds-bg-weak text-ds-text-soft hidden sm:inline-block">
                      {faq.badge}
                    </span>
                    <svg
                      className={`w-5 h-5 text-ds-text-soft transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-ds-feature-base" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-ds-text-sub leading-relaxed border-t border-ds-stroke-soft/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
