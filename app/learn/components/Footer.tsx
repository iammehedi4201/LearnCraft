"use client";

import { useState } from "react";
import Link from "next/link";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="pt-14 pb-10 bg-ds-bg-white border-t border-ds-stroke-soft">
      <div className="max-w-[95rem] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-xl overflow-hidden shadow-sm border border-ds-stroke-soft">
                <img
                  src="/logo.png"
                  alt="LearnCraft Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-xl font-black text-ds-text-strong tracking-tight font-display">
                LearnCraft
              </span>
            </div>

            <p className="text-xs text-ds-text-sub leading-relaxed max-w-sm">
              Studio-grade engineering education for modern developers. Production-ready architectures, interactive sandboxes, and deep mental models.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-ds-feature-lighter text-ds-feature-dark">
                100% Free & Open
              </span>
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-ds-success-lighter text-ds-success-dark">
                69+ Lessons
              </span>
            </div>
          </div>

          {/* Curriculums Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-ds-text-strong uppercase tracking-wider font-display">
              Curriculums
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/learn/nextjs"
                  className="text-ds-text-sub hover:text-ds-feature-base transition-colors font-medium"
                >
                  Next.js 15+ Mastery (20 Modules)
                </Link>
              </li>
              <li>
                <Link
                  href="/learn/tanstack"
                  className="text-ds-text-sub hover:text-ds-feature-base transition-colors font-medium"
                >
                  TanStack Query v5 (22 Modules)
                </Link>
              </li>
              <li>
                <Link
                  href="/learn/nestjs"
                  className="text-ds-text-sub hover:text-ds-feature-base transition-colors font-medium"
                >
                  NestJS Elite Backend (27 Modules)
                </Link>
              </li>
              <li>
                <Link
                  href="/learn#curriculums"
                  className="text-ds-text-sub hover:text-ds-feature-base transition-colors font-medium"
                >
                  Compare All Tracks →
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Features Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-ds-text-strong uppercase tracking-wider font-display">
              Learning Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="#playground-showcase"
                  className="text-ds-text-sub hover:text-ds-feature-base transition-colors font-medium"
                >
                  In-Browser Sandboxes
                </Link>
              </li>
              <li>
                <Link
                  href="#curriculums"
                  className="text-ds-text-sub hover:text-ds-feature-base transition-colors font-medium"
                >
                  Curriculum Matrix
                </Link>
              </li>
              <li>
                <Link
                  href="/learn/nextjs"
                  className="text-ds-text-sub hover:text-ds-feature-base transition-colors font-medium"
                >
                  Interactive Quizzes
                </Link>
              </li>
              <li>
                <Link
                  href="/learn/tanstack"
                  className="text-ds-text-sub hover:text-ds-feature-base transition-colors font-medium"
                >
                  Architecture Notes
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-ds-text-strong uppercase tracking-wider font-display">
              Architecture Insights
            </h4>
            <p className="text-xs text-ds-text-sub leading-relaxed">
              Receive concise weekly architectural breakdowns of modern web engineering techniques.
            </p>

            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="architect@company.com"
                  required
                  className="w-full bg-ds-bg-weak border border-ds-stroke-soft rounded-xl px-3.5 py-2.5 text-xs text-ds-text-strong placeholder:text-ds-text-disabled focus:outline-none focus:border-ds-feature-base transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white text-xs font-bold rounded-lg transition-colors"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-ds-success-dark font-bold">
                  ✓ You&apos;re subscribed! Welcome to LearnCraft.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-ds-stroke-soft flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p className="text-ds-text-soft font-medium">
            © 2026 LearnCraft Engineering Platform. Built for developers worldwide.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/learn/nextjs"
              className="text-ds-text-sub hover:text-ds-text-strong transition-colors font-medium"
            >
              Next.js
            </Link>
            <Link
              href="/learn/tanstack"
              className="text-ds-text-sub hover:text-ds-text-strong transition-colors font-medium"
            >
              TanStack
            </Link>
            <Link
              href="/learn/nestjs"
              className="text-ds-text-sub hover:text-ds-text-strong transition-colors font-medium"
            >
              NestJS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
