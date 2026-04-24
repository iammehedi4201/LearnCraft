"use client";

import { useState } from 'react';

const faqs = [
  { q: "Is this course kept current?", a: "Yes, we update our lessons with every major Next.js and TanStack Query release. We are currently fully compatible with Next.js 15 and TanStack v5." },
  { q: "Can I use these patterns in enterprise apps?", a: "Absolutely. These are the exact patterns used in high-scale production apps at companies like Meta, Stripe, and Vercel." },
  { q: "Is there a certificate of completion?", a: "Yes, upon finishing each path and completing the final project, you receive a verifiable digital certificate linked to your GitHub." },
  { q: "How long does it take to complete?", a: "Most developers complete a full path in 4-6 weeks of dedicated study, spending about 10 hours per week." }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-16 text-center tracking-tight">Common Questions</h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rounded-[1rem] glass-card transition-all duration-300 overflow-hidden ${openIndex === i ? 'ring-2 ring-blue-500/30' : 'hover:border-white/20'
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full p-8 text-left flex items-center justify-between"
                >
                  <span className="text-lg font-bold text-foreground">{faq.q}</span>
                  <svg
                    className={`w-6 h-6 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="px-8 pb-8 text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.a}
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
