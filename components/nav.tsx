"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NAV COMPONENT — Scalable Global Navigation & Mega Curriculum Dropdown
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Features 4 core domains: Frontend, Backend, Database, and DevOps & Cloud.
 * Dark, borderless premium glass aesthetic with ultra-subtle borders (no white lines).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { reconcileCloudProgress } from "@/lib/progress-sync";
import { useRevision } from "@/context/revision-context";
import {
  SKILL_ROADMAPS,
  type SkillRoadmap,
} from "@/lib/roadmap-data";
import { TechIcon } from "@/components/roadmap/TechIcon";
import { AuthModal, openAuthModal } from "@/components/auth-modal";
import { StreakXPPill } from "@/components/gamification/StreakXPPill";

export function Nav() {
  return (
    <Suspense fallback={<div className="h-16 w-full" />}>
      <NavContent />
    </Suspense>
  );
}

type CoreCategory = "language" | "frontend" | "backend" | "database" | "orm" | "state-management";

interface CategoryMeta {
  id: CoreCategory;
  label: string;
  icon: string;
  description: string;
  upcomingTopics: string[];
}

const CATEGORIES: CategoryMeta[] = [
  {
    id: "language",
    label: "Languages",
    icon: "💻",
    description: "Core programming languages, type systems, runtime internals & compiler pipelines",
    upcomingTopics: ["JavaScript Deep Dive", "Go Basics"],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "🎨",
    description: "Modern UI architecture, state management & full-stack React frameworks",
    upcomingTopics: ["React 19", "Tailwind CSS v4"],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "⚙️",
    description: "Enterprise backend architecture, microservices, APIs & dependency injection",
    upcomingTopics: ["Node.js Core", "Express.js"],
  },
  {
    id: "database",
    label: "Database",
    icon: "🗄️",
    description: "Relational database design, query optimization, caching & document stores",
    upcomingTopics: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    id: "orm",
    label: "ORM",
    icon: "💎",
    description: "Type-safe ORMs, data-access layers, migrations & schema contracts",
    upcomingTopics: ["Prisma", "Drizzle ORM"],
  },
  {
    id: "state-management",
    label: "State Management",
    icon: "🔄",
    description: "Predictable client state, one-way data flow, Redux Toolkit & store architectures",
    upcomingTopics: ["Redux", "Zustand"],
  },
];

function NavContent(): JSX.Element {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CoreCategory>("language");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileActiveCategory, setMobileActiveCategory] = useState<CoreCategory>("language");

  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const isImproveMode = searchParams.get("improveMode") === "true";

  let totalRevisions = 0;
  try {
    const revision = useRevision();
    totalRevisions = revision.stats.total;
  } catch {
    // Rendered outside provider
  }

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside and escape key handling
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Focus search input when menu opens
  useEffect(() => {
    if (isMenuOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery("");
      setActiveCategory("language");
    }
  }, [isMenuOpen]);

  // Available live courses mapped by category
  const availableSkillsByCategory = useMemo(() => {
    const map: Record<CoreCategory, SkillRoadmap[]> = {
      language: [],
      frontend: [],
      backend: [],
      database: [],
      orm: [],
      "state-management": [],
    };

    SKILL_ROADMAPS.forEach((skill) => {
      if (skill.status === "available" && skill.category in map) {
        map[skill.category as CoreCategory].push(skill);
      }
    });

    return map;
  }, []);

  // Filter available skills based on search query or active category
  const displayedSkills = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (query) {
      // Search only among available courses on the website
      return SKILL_ROADMAPS.filter(
        (skill) =>
          skill.status === "available" &&
          (skill.title.toLowerCase().includes(query) ||
            skill.description.toLowerCase().includes(query) ||
            skill.slug.toLowerCase().includes(query))
      );
    }

    return availableSkillsByCategory[activeCategory] || [];
  }, [activeCategory, searchQuery, availableSkillsByCategory]);

  const activeCategoryMeta = useMemo(
    () => CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0],
    [activeCategory]
  );

  if (isImproveMode) return <></>;

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
              {/* Logo */}
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

              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-6">
                {/* Scalable Curriculum Mega Dropdown */}
                <div className="relative" ref={menuRef}>
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className={`text-sm font-semibold transition-colors relative py-1 flex items-center gap-1.5 ${
                      isMenuOpen
                        ? "text-ds-feature-dark dark:text-purple-300 font-bold"
                        : "text-ds-text-sub hover:text-ds-text-strong"
                    }`}
                    aria-expanded={isMenuOpen}
                    aria-haspopup="true"
                  >
                    <span>Curriculum</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isMenuOpen ? "rotate-180 text-ds-feature-base" : "text-ds-text-soft"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Mega Dropdown Popover */}
                  {isMenuOpen && (
                    <div className="absolute top-full left-0 mt-3 w-[660px] rounded-2xl bg-[#0E121B]/95 backdrop-blur-2xl border border-white/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.8)] p-4 animate-in fade-in slide-in-from-top-2 duration-200 z-50 overflow-hidden">
                      {/* Top Header with Search */}
                      <div className="flex items-center justify-between gap-4 pb-3 mb-3 border-b border-white/[0.06]">
                        <div>
                          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                            Curriculum Catalog
                          </h3>
                          <p className="text-[11px] text-slate-400">
                            Explore interactive tracks and structured masterclasses
                          </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-56">
                          <svg
                            className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <circle cx="11" cy="11" r="8" />
                            <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                          </svg>
                          <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search live courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                          />
                          {searchQuery && (
                            <button
                              type="button"
                              onClick={() => setSearchQuery("")}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white"
                              aria-label="Clear search"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Main Layout: 4 Category Tabs (Left) + Content Area (Right) */}
                      <div className="grid grid-cols-12 gap-3 min-h-[220px]">
                        {/* Sidebar Category Tabs */}
                        <div className="col-span-4 border-r border-white/[0.06] pr-2.5 space-y-1">
                          {searchQuery ? (
                            <div className="px-2.5 py-2 text-[11px] font-bold text-purple-400">
                              Search Results ({displayedSkills.length})
                            </div>
                          ) : (
                            CATEGORIES.map((cat) => {
                              const isActive = activeCategory === cat.id;
                              const liveCourses = availableSkillsByCategory[cat.id] || [];
                              const hasLiveCourses = liveCourses.length > 0;

                              return (
                                <button
                                  key={cat.id}
                                  type="button"
                                  onMouseEnter={() => setActiveCategory(cat.id)}
                                  onClick={() => setActiveCategory(cat.id)}
                                  className={`w-full text-left px-2.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all group ${
                                    isActive
                                      ? "bg-purple-500/15 text-purple-300 font-bold"
                                      : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                                  }`}
                                >
                                  <div className="flex items-center gap-2 truncate">
                                    <span className="text-sm">{cat.icon}</span>
                                    <span className="truncate">{cat.label}</span>
                                  </div>

                                  {hasLiveCourses ? (
                                    <span
                                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                                        isActive
                                          ? "bg-emerald-500/20 text-emerald-400"
                                          : "bg-white/[0.05] text-slate-400 group-hover:text-slate-300"
                                      }`}
                                    >
                                      {liveCourses.length} Live
                                    </span>
                                  ) : (
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400/90 bg-amber-500/10 px-1.5 py-0.5 rounded-md">
                                      Soon
                                    </span>
                                  )}
                                </button>
                              );
                            })
                          )}
                        </div>

                        {/* Content Area: Live Course Cards OR Clean Coming Soon Banner */}
                        <div className="col-span-8 overflow-y-auto pr-1">
                          {displayedSkills.length > 0 ? (
                            <div className="space-y-1.5">
                              {displayedSkills.map((skill) => (
                                <Link
                                  key={skill.slug}
                                  href={skill.learnPath}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="group flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] transition-all"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 p-1.5 group-hover:scale-105 transition-transform">
                                    <TechIcon slug={skill.slug} className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                      <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                                        <span>{skill.title}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                                      </h4>
                                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                        {skill.totalLessons} Lessons
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                      {skill.description}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ) : (
                            /* Coming Soon State for Categories with no live courses (e.g. Database, DevOps) */
                            <div className="h-full flex flex-col justify-center p-4 rounded-xl bg-white/[0.015]">
                              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1.5">
                                <span>{activeCategoryMeta.icon}</span>
                                <span>{activeCategoryMeta.label} Track — Coming Soon</span>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                                {activeCategoryMeta.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/[0.04]">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mr-1">
                                  In Development:
                                </span>
                                {activeCategoryMeta.upcomingTopics.map((topic) => (
                                  <span
                                    key={topic}
                                    className="text-[10px] font-semibold text-slate-300 bg-white/[0.04] px-2 py-0.5 rounded-md"
                                  >
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Dropdown Footer */}
                      <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs">
                        <span className="text-[11px] text-slate-400">
                          Interactive hands-on tracks from fundamentals to production
                        </span>
                        <Link
                          href="/roadmaps#skill-roadmaps"
                          onClick={() => setIsMenuOpen(false)}
                          className="font-bold text-purple-300 hover:text-purple-200 flex items-center gap-1 transition-colors group"
                        >
                          <span>Explore All Roadmaps</span>
                          <svg
                            className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side Actions — Clean & Streamlined */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Daily Streak & XP Widget */}
              <StreakXPPill />

              {/* User Profile Dropdown or Sign In */}
              {session?.user ? (
                <UserNavMenu totalRevisions={totalRevisions} />
              ) : (
                <button
                  onClick={openAuthModal}
                  className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 border border-white/[0.08] text-white text-xs font-bold rounded-xl hover:bg-white/[0.06] hover:border-purple-500/40 transition-all cursor-pointer shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>Sign In</span>
                </button>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="md:hidden p-2 rounded-xl text-ds-text-sub hover:text-ds-text-strong bg-ds-bg-weak border border-ds-stroke-soft"
                aria-label="Toggle navigation menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Collapsible Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-white/[0.06] bg-[#0E121B] px-5 py-4 space-y-4 rounded-b-2xl shadow-xl max-h-[80vh] overflow-y-auto">
              {/* Category Filter Chips on Mobile */}
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Curriculum
                </span>
                <div className="flex flex-wrap gap-1.5 pb-2">
                  {CATEGORIES.map((cat) => {
                    const hasLive = (availableSkillsByCategory[cat.id] || []).length > 0;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setMobileActiveCategory(cat.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          mobileActiveCategory === cat.id
                            ? "bg-purple-600 text-white"
                            : "bg-white/[0.04] text-slate-400"
                        }`}
                      >
                        {cat.icon} {cat.label} {!hasLive ? "(Soon)" : ""}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Skill Items */}
              <div className="space-y-1.5 max-h-[260px] overflow-y-auto">
                {(availableSkillsByCategory[mobileActiveCategory] || []).length > 0 ? (
                  availableSkillsByCategory[mobileActiveCategory].map((skill) => (
                    <Link
                      key={skill.slug}
                      href={skill.learnPath}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.04] text-xs font-bold text-white"
                    >
                      <div className="flex items-center gap-2.5">
                        <TechIcon slug={skill.slug} className="w-4 h-4" />
                        <span>{skill.title}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full text-emerald-400 bg-emerald-500/10 font-bold">
                        {skill.totalLessons} lessons
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className="p-3 rounded-xl bg-white/[0.02] text-xs text-slate-400">
                    <span className="text-amber-400 font-bold block mb-1">
                      {CATEGORIES.find((c) => c.id === mobileActiveCategory)?.label} Tracks — Coming Soon
                    </span>
                    Interactive tracks for this category are currently in development.
                  </div>
                )}
              </div>

              {/* Mobile Revision & Roadmaps link */}
              <div className="pt-2 border-t border-white/[0.06] flex flex-col gap-2">
                <Link
                  href="/notes"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-xs font-bold"
                >
                  <span>My Study Notes</span>
                  {totalRevisions > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-mono">
                      {totalRevisions}
                    </span>
                  )}
                </Link>

                <Link
                  href="/revision"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-ds-feature-base text-ds-static-white text-xs font-bold"
                >
                  <span>Quick Revision</span>
                </Link>
                <Link
                  href="/roadmaps"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-xs font-bold"
                >
                  <span>Explore All Roadmaps</span>
                  <span className="text-purple-400">→</span>
                </Link>

                {/* Mobile Auth button */}
                <div className="pt-1">
                  <MobileAuthButton onAction={() => setIsMobileMenuOpen(false)} />
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
      <div className="h-[100px] w-full pointer-events-none" />
      <AuthModal />
    </>
  );
}

function UserNavMenu({ totalRevisions }: { totalRevisions: number }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "synced">("idle");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session?.user) {
      setSyncStatus("syncing");
      reconcileCloudProgress()
        .then(() => setSyncStatus("synced"))
        .catch(() => setSyncStatus("idle"));
    }
  }, [session?.user]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!session?.user) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-purple-500/30 transition-all cursor-pointer group"
        title="User Menu & Study Hub"
      >
        <div className="relative">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "Avatar"}
              className="w-6 h-6 rounded-lg object-cover ring-1 ring-white/10"
            />
          ) : (
            <div className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold">
              {session.user.name?.charAt(0) || "U"}
            </div>
          )}
          {syncStatus === "synced" && (
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#0E121B]" />
          )}
        </div>

        <span className="text-xs font-bold text-white max-w-[90px] truncate hidden sm:inline-block">
          {session.user.name?.split(" ")[0] || "Profile"}
        </span>

        <svg
          className={`w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* User Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl bg-[#0E121B]/95 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-left">
          {/* User Info Header */}
          <div className="p-3 pb-2.5 border-b border-white/[0.06] mb-1">
            <div className="flex items-center gap-3 mb-2">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "Avatar"}
                  className="w-9 h-9 rounded-xl object-cover ring-1 ring-white/10 shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {session.user.name?.charAt(0) || "U"}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-white truncate">
                  {session.user.name || "Learner"}
                </h4>
                <p className="text-xs text-slate-400 truncate" title={session.user.email || undefined}>
                  {session.user.email || "GitHub Account"}
                </p>
              </div>
            </div>

            {/* Sync Badge */}
            <div className="flex items-center gap-1.5 pt-0.5 text-[11px] font-medium text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Cloud Sync Active</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-0.5">
            <Link
              href="/notes"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-purple-400">📝</span>
                <span>My Study Notes</span>
              </div>
              {totalRevisions > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-mono font-bold">
                  {totalRevisions}
                </span>
              )}
            </Link>

            <Link
              href="/revision"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-purple-400">⚡</span>
                <span>Quick Revision & Flashcards</span>
              </div>
            </Link>

            <Link
              href="/roadmaps"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-purple-400">🗺️</span>
                <span>Skill Roadmaps</span>
              </div>
            </Link>
          </div>

          <div className="h-px bg-white/[0.06] my-1" />

          {/* Sign Out Button */}
          <button
            onClick={() => {
              setIsOpen(false);
              signOut();
            }}
            className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}

function MobileAuthButton({ onAction }: { onAction?: () => void }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] text-slate-400 text-xs font-semibold animate-pulse">
        <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
        <span>Signing in...</span>
      </div>
    );
  }

  if (session && session.user) {
    return (
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User avatar"}
              className="w-6 h-6 rounded-lg object-cover ring-1 ring-white/10"
            />
          ) : (
            <div className="w-6 h-6 rounded-lg bg-ds-feature-base text-ds-static-white flex items-center justify-center text-[10px] font-bold">
              {session.user.name?.charAt(0) || "U"}
            </div>
          )}
          <span className="text-xs font-bold text-white truncate max-w-[120px]">
            {session.user.name || "Learner"}
          </span>
        </div>
        <button
          onClick={() => {
            signOut();
            onAction?.();
          }}
          className="text-xs font-bold text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => {
        openAuthModal();
        onAction?.();
      }}
      className="w-full flex items-center justify-center gap-2.5 p-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-bold transition-all cursor-pointer"
    >
      <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      <span>Sign In with GitHub</span>
    </button>
  );
}
