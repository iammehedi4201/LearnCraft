"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="pt-20 pb-16 bg-background border-t border-slate-200 dark:border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-lg">L</div>
              <span className="text-3xl font-black text-foreground tracking-tighter">LearnCraft</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md leading-relaxed mb-10">
              Elevating the developer community through high-impact,
              production-focused engineering education and architectural mastery.
            </p>
            <div className="flex gap-6">
              {['Twitter', 'GitHub', 'Discord', 'YouTube'].map(social => (
                <Link key={social} href="#" className="text-slate-600 dark:text-slate-500 hover:text-foreground font-bold text-sm transition-colors uppercase tracking-widest">{social}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-8 uppercase tracking-[0.2em] text-xs">Curriculums</h4>
            <ul className="space-y-4">
              {['Next.js Mastery', 'TanStack Query', 'NestJS Elite', 'Typescript Pro'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-slate-600 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-8 uppercase tracking-[0.2em] text-xs">Stay Ahead</h4>
            <p className="text-slate-600 dark:text-slate-500 text-sm mb-6">Get weekly insights on modern web architecture.</p>
            <form
              className="relative"
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Joined: ${email}`);
                setEmail("");
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="engineering@company.com"
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 text-foreground text-sm focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
              <button className="absolute right-2 top-2 bottom-2 px-4 bg-primary text-primary-foreground rounded-xl font-bold text-xs hover:bg-blue-600 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-16 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 text-sm font-medium">
            © 2026 LearnCraft Engineering. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-slate-500 hover:text-foreground text-xs font-bold uppercase tracking-widest transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-slate-500 hover:text-foreground text-xs font-bold uppercase tracking-widest transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
