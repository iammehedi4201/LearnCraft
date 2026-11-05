"use client";

import { useState } from 'react';
import Link from 'next/link';

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="pt-12 sm:pt-20 pb-12 sm:pb-16 bg-ds-bg-weak border-t border-ds-stroke-soft">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 mb-12 md:mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden shadow-lg border border-ds-stroke-soft shrink-0">
                <img
                  src="/logo.png"
                  alt="LearnCraft Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-ds-text-strong tracking-tighter">LearnCraft</span>
            </div>
            <p className="text-ds-text-sub text-sm sm:text-lg max-w-md leading-relaxed mb-6 sm:mb-10">
              Elevating the developer community through high-impact,
              production-focused engineering education and architectural mastery.
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {['Twitter', 'GitHub', 'Discord', 'YouTube'].map(social => (
                <Link key={social} href="#" className="text-ds-text-sub hover:text-ds-text-strong font-bold text-xs sm:text-sm transition-colors uppercase tracking-widest">{social}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-ds-text-strong font-bold mb-4 sm:mb-8 uppercase tracking-[0.2em] text-xs">Roadmaps</h4>
            <ul className="space-y-3 sm:space-y-4">
              {[
                { name: 'Next.js Mastery', href: '/roadmaps/nextjs' },
                { name: 'TanStack Query', href: '/roadmaps/tanstack' },
                { name: 'NestJS Elite', href: '/learn/nestjs' },
                { name: 'All Roadmaps', href: '/roadmaps' },
              ].map(item => (
                <li key={item.name}>
                  <Link href={item.href} className="text-ds-text-sub hover:text-ds-info-dark font-medium text-sm transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-ds-text-strong font-bold mb-4 sm:mb-8 uppercase tracking-[0.2em] text-xs">Stay Ahead</h4>
            <p className="text-ds-text-sub text-xs sm:text-sm mb-4 sm:mb-6">Get weekly insights on modern web architecture.</p>
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
                className="w-full bg-ds-bg-white border border-ds-stroke-soft rounded-2xl pl-4 sm:pl-6 pr-20 sm:pr-24 py-3 sm:py-4 text-ds-text-strong text-xs sm:text-sm focus:outline-none focus:border-ds-info-base transition-colors"
                required
              />
              <button className="absolute right-1.5 sm:right-2 top-1.5 sm:top-2 bottom-1.5 sm:bottom-2 px-3 sm:px-4 bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white rounded-xl font-bold text-xs transition-colors cursor-pointer">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 sm:pt-16 border-t border-ds-stroke-soft flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 text-center sm:text-left">
          <p className="text-ds-text-disabled text-xs sm:text-sm font-medium">
            © 2026 LearnCraft Engineering. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <Link href="#" className="text-ds-text-disabled hover:text-ds-text-strong text-xs font-bold uppercase tracking-widest transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-ds-text-disabled hover:text-ds-text-strong text-xs font-bold uppercase tracking-widest transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
