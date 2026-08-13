"use client";

import { useState } from 'react';
import Link from 'next/link';

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="pt-20 pb-16 bg-ds-bg-weak border-t border-ds-stroke-soft">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-lg border border-ds-stroke-soft">
                <img
                  src="/logo.png"
                  alt="LearnCraft Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-3xl font-bold text-ds-text-strong tracking-tighter">LearnCraft</span>
            </div>
            <p className="text-ds-text-sub text-lg max-w-md leading-relaxed mb-10">
              Elevating the developer community through high-impact,
              production-focused engineering education and architectural mastery.
            </p>
            <div className="flex gap-6">
              {['Twitter', 'GitHub', 'Discord', 'YouTube'].map(social => (
                <Link key={social} href="#" className="text-ds-text-sub hover:text-ds-text-strong font-bold text-sm transition-colors uppercase tracking-widest">{social}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-ds-text-strong font-bold mb-8 uppercase tracking-[0.2em] text-xs">Curriculums</h4>
            <ul className="space-y-4">
              {['Next.js Mastery', 'TanStack Query', 'NestJS Elite', 'Typescript Pro'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-ds-text-sub hover:text-ds-info-dark font-medium transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-ds-text-strong font-bold mb-8 uppercase tracking-[0.2em] text-xs">Stay Ahead</h4>
            <p className="text-ds-text-sub text-sm mb-6">Get weekly insights on modern web architecture.</p>
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
                className="w-full bg-ds-bg-white border border-ds-stroke-soft rounded-2xl px-6 py-4 text-ds-text-strong text-sm focus:outline-none focus:border-ds-info-base transition-colors"
                required
              />
              <button className="absolute right-2 top-2 bottom-2 px-4 bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white rounded-xl font-bold text-xs transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-16 border-t border-ds-stroke-soft flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-ds-text-disabled text-sm font-medium">
            © 2026 LearnCraft Engineering. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-ds-text-disabled hover:text-ds-text-strong text-xs font-bold uppercase tracking-widest transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-ds-text-disabled hover:text-ds-text-strong text-xs font-bold uppercase tracking-widest transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
