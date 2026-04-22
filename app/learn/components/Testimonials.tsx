"use client";

import React from 'react';

const testimonials = [
  {
    name: "Alex Rivers",
    role: "Sr. Architect @ Meta",
    text: "This is the curriculum I wish I had when I started. The Next.js patterns alone saved us weeks of refactoring on our high-traffic marketing sites.",
    avatar: "AR"
  },
  {
    name: "Elena Chen",
    role: "Eng. Manager @ Stripe",
    text: "Transformed how our team handles server state. TanStack Query Mastery is an essential guide for any serious frontend engineer today.",
    avatar: "EC"
  },
  {
    name: "Marcus Thorne",
    role: "Principal @ Vercel",
    text: "Clean, consistent, and highly professional. A true masterpiece for modern web developers looking to stay ahead of the curve.",
    avatar: "MT"
  }
];

export function Testimonials() {
  return (
    <section className="py-12 bg-slate-50/50 dark:bg-slate-900/20">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl lg:text-5xl font-black text-foreground mb-20 tracking-tight">Loved by Architects & Leads</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-10 rounded-[3rem] glass-card flex flex-col justify-between transition-all hover:-translate-y-2 group"
            >
              <div className="mb-8">
                <div className="flex gap-1 mb-6 text-blue-600 dark:text-blue-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed italic">"{t.text}"</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-foreground">{t.name}</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
