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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
          isScrolled ? "pt-0 px-0" : "pt-6 px-6"
        }`}
      >
        <nav
          className={`transition-all duration-500 w-full border border-ds-stroke-soft shadow-sm pointer-events-auto ${
            isScrolled
              ? "h-14 bg-ds-bg-white/80 backdrop-blur-md rounded-none border-x-0 border-t-0"
              : "max-w-[95rem] h-16 bg-ds-bg-white/90 backdrop-blur-xl rounded-2xl hover:border-ds-feature-base/30 shadow-lg shadow-black/5"
          }`}
        >
          <div className="max-w-[95rem] mx-auto h-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link
                href="/learn"
                className="group flex items-center gap-2.5 font-black tracking-tight text-ds-text-strong"
              >
                <div className="relative h-8 w-8 overflow-hidden rounded-xl border border-ds-stroke-soft shadow-sm group-hover:scale-105 transition-all duration-300">
                  <img
                    src="/logo.png"
                    alt="LearnCraft Logo"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-lg hidden sm:inline-block font-display">
                  LearnCraft
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-6">
                {[
                  { name: "Next.js", href: "/learn/nextjs" },
                  { name: "TanStack", href: "/learn/tanstack" },
                  { name: "NestJS", href: "/learn/nestjs" },
                  { name: "Curriculums", href: "/learn#curriculums" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-semibold text-ds-text-sub hover:text-ds-text-strong transition-colors relative group py-1"
                  >
                    {item.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-ds-feature-base group-hover:w-full transition-all duration-300 rounded-full" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link
                href="/learn/nextjs"
                className="hidden sm:inline-flex px-4 py-2 bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white text-xs font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md shadow-ds-feature-base/15"
              >
                Start Learning
              </Link>
            </div>
          </div>
        </nav>
      </header>
      {/* Layout Spacer: Ensures content starts 50px below the navbar height (88px + 50px) */}
      <div className="h-[100px] w-full pointer-events-none" />
    </>
  );
}
