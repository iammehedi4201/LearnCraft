"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NAV COMPONENT — Global Navigation
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * A simple navigation component to link back to the learn hub.
 * Appears at the top of every feature page.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Nav(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${isScrolled ? 'pt-0 px-0' : 'pt-6 px-6'
          }`}
      >
        <nav
          className={`transition-all duration-500 w-full border border-slate-200/50 dark:border-white/10 shadow-lg shadow-black/5 pointer-events-auto ${isScrolled
            ? 'h-14 bg-background/80 backdrop-blur-md rounded-none border-x-0 border-t-0'
            : 'max-w-7xl h-16 glass-card rounded-2xl hover:shadow-2xl hover:shadow-blue-500/10'
            }`}
        >
          <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link
                href="/learn"
                className="group flex items-center gap-2.5 font-bold tracking-tighter text-foreground"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg group-hover:scale-110 transition-all duration-300">
                  <span className="text-base font-black italic">L</span>
                </div>
                <span className="text-lg hidden sm:inline-block">LearnCraft</span>
              </Link>

              <div className="hidden md:flex items-center gap-6">
                {[
                  { name: 'Next.js', href: '/learn/nextjs' },
                  { name: 'TanStack', href: '/learn/tanstack' },
                  { name: 'NestJS', href: '/learn/nestjs' },
                  { name: 'Roadmap', href: '#roadmap' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-bold text-slate-500 hover:text-foreground transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button className="hidden sm:flex px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-lg hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-500/20">
                Get Started
              </button>
            </div>
          </div>
        </nav>
      </header>
      {/* Layout Spacer: Ensures content starts 50px below the navbar height (88px + 50px) */}
      <div className="h-[138px] w-full pointer-events-none" />
    </>
  );
}

