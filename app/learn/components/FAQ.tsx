"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What courses and learning tracks are available on LearnCraft?",
    a: "LearnCraft provides production-grade masterclasses in Next.js 15 (App Router, Caching, RSC), TanStack Query v5 (Cache Management, Mutations, SSR), and NestJS Elite (Enterprise Architecture, Microservices). We also offer guided career roadmaps for Frontend, Backend, and Full-Stack development.",
  },
  {
    q: "Can I use these patterns in enterprise applications?",
    a: "Absolutely. Every lesson teaches production-ready architectural patterns, strict TypeScript conventions, resilient error boundaries, and scalable data fetching strategies used by elite engineering teams at companies like Meta, Stripe, and Vercel.",
  },
  {
    q: "How do the interactive Practice Playground and Revision tools work?",
    a: "LearnCraft includes an in-browser code execution sandbox for live hands-on challenges and a Quick Revision system with active-recall flashcards to help reinforce core mental models and prepare for technical interviews.",
  },
  {
    q: "Is this curriculum kept up to date?",
    a: "Yes, our lessons are continuously updated with every major framework release. We are currently fully compatible with Next.js 15, React 19, TanStack Query v5, and modern NestJS architecture.",
  },
  {
    q: "Is there a certificate of completion?",
    a: "Yes, upon finishing each path and completing the final milestone challenges, you receive a verifiable digital certificate linked directly to your GitHub profile.",
  },
  {
    q: "Is LearnCraft free to use and how do I get help?",
    a: "All guided roadmaps and interactive tracks are open and free to explore. If you ever get stuck or want code reviews, you can join our private Discord community to collaborate with peers and mentors.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle Background Glow matching Design System */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-ds-feature-base/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ds-feature-lighter border border-ds-feature-light mb-5 animate-fade-in shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ds-feature-base opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ds-feature-base" />
              </span>
              <span className="text-xs font-bold tracking-wider text-ds-feature-dark dark:text-purple-300 uppercase">
                Got Questions?
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ds-text-strong mb-5 leading-tight">
              Frequently Asked{" "}
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-ds-feature-base via-purple-400 to-ds-info-base">
                Questions
              </span>
            </h2>

            <p className="text-base sm:text-lg text-ds-text-sub max-w-xl mx-auto leading-relaxed">
              Everything you need to know about our modern curriculum, production-ready roadmaps, practice sandbox, and certificates.
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;

              return (
                <div
                  key={i}
                  className={`group relative rounded-2xl transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white/[0.04] border border-purple-500/40 shadow-xl shadow-purple-950/30"
                      : "bg-white/[0.02] hover:bg-white/[0.035] border border-white/[0.06] hover:border-purple-500/30 shadow-sm"
                  }`}
                >
                  {/* Left Active Accent Bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-500 transition-opacity duration-300 ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Accordion Trigger */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                      {/* Numeric Index Badge */}
                      <span
                        className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center transition-colors border ${
                          isOpen
                            ? "bg-purple-500/15 text-purple-300 border-purple-500/30"
                            : "bg-white/[0.03] text-gray-400 border-white/[0.06] group-hover:text-gray-300"
                        }`}
                      >
                        {i + 1 < 10 ? `0${i + 1}` : i + 1}
                      </span>

                      {/* Question Text */}
                      <span
                        className={`text-base sm:text-lg font-bold transition-colors ${
                          isOpen
                            ? "text-white"
                            : "text-gray-200 group-hover:text-purple-300"
                        }`}
                      >
                        {faq.q}
                      </span>
                    </div>

                    {/* Chevron Indicator Pill */}
                    <div
                      className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                        isOpen
                          ? "bg-purple-600 text-white border-purple-500 rotate-180 shadow-md shadow-purple-600/20"
                          : "bg-white/[0.04] text-gray-400 border-white/[0.06] group-hover:text-white group-hover:border-white/10"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 sm:px-7 pb-6 sm:pb-7 text-gray-400 text-sm sm:text-base leading-relaxed pt-1">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

