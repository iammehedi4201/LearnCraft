"use client";

import React from 'react';

const stats = [
  { label: "Active Lessons", value: "48+", color: "from-blue-500 to-indigo-500" },
  { label: "Students", value: "12k+", color: "from-purple-500 to-pink-500" },
  { label: "Production Guides", value: "150+", color: "from-emerald-500 to-teal-500" },
  { label: "Daily Updates", value: "Live", color: "from-orange-500 to-red-500" },
];

export function Stats() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative group p-8 rounded-[1rem] glass-card transition-all hover:-translate-y-1"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-t-full`} />
              <dt className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-2">{stat.label}</dt>
              <dd className="text-4xl lg:text-5xl font-black text-foreground tracking-tight">{stat.value}</dd>

              {/* Subtle accent glow */}
              <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity rounded-[2.5rem]`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
