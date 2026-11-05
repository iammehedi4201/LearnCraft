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
import { createPortal } from "react-dom";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { reconcileCloudProgress } from "@/lib/progress-sync";
import { clearAllClientCaches } from "@/lib/query-client";
import { useRevision } from "@/context/revision-context";
import {
  SKILL_ROADMAPS,
  type SkillRoadmap,
} from "@/lib/roadmap-data";
import { TechIcon } from "@/components/roadmap/TechIcon";
import { AuthModal, openAuthModal } from "@/components/auth";
import { StreakXPPill } from "@/components/gamification/StreakXPPill";
import { getLocalNotes } from "@/lib/notes-bookmarks";
import { UserAvatar } from "@/components/ui/user-avatar";

export function Nav() {
  return (
    <Suspense fallback={<div className="h-16 w-full" />}>
      <NavContent />
    </Suspense>
  );
}

type CoreCategory = "language" | "frontend" | "backend" | "database" | "orm" | "state-management" | "architecture";

interface CategoryMeta {
  id: CoreCategory;
  label: string;
  icon: string;
  description: string;
  upcomingTopics: string[];
}

const MOBILE_CATEGORIES: { id: CoreCategory; label: string; icon: string; description: string }[] = [
  { id: "language", label: "Languages", icon: "💻", description: "Core languages, static typing & runtime internals" },
  { id: "frontend", label: "Frontend", icon: "🎨", description: "Component architecture, hooks & modern full-stack frameworks" },
  { id: "backend", label: "Backend", icon: "⚙️", description: "Enterprise backend architecture, microservices & REST APIs" },
  { id: "database", label: "Databases & ORM", icon: "🗄️", description: "Relational SQL, document stores & type-safe data access" },
  { id: "state-management", label: "State", icon: "🔄", description: "Predictable client store architectures & unidirectional flow" },
  { id: "architecture", label: "System Design", icon: "📐", description: "Distributed systems, scalability & design patterns" },
];

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
  {
    id: "architecture",
    label: "System Design",
    icon: "📐",
    description: "Distributed systems, capacity planning, load balancing & scalable architecture",
    upcomingTopics: ["System Design", "Microservices Patterns"],
  },
];


// ─── Individual Technology Brand Color Accents for Curriculum Drawer ───
const TRACK_ACCENTS: Record<
  string,
  {
    bg: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    tag: string;
  }
> = {
  typescript: {
    bg: "bg-blue-500/[0.06] hover:bg-blue-500/[0.12]",
    border: "border-blue-500/20 hover:border-blue-400/50",
    badgeBg: "bg-blue-500/15",
    badgeText: "text-blue-300",
    tag: "Language",
  },
  javascript: {
    bg: "bg-amber-400/[0.06] hover:bg-amber-400/[0.12]",
    border: "border-amber-400/20 hover:border-amber-300/50",
    badgeBg: "bg-amber-400/15",
    badgeText: "text-amber-300",
    tag: "Language",
  },
  react: {
    bg: "bg-cyan-400/[0.06] hover:bg-cyan-400/[0.12]",
    border: "border-cyan-400/20 hover:border-cyan-300/50",
    badgeBg: "bg-cyan-400/15",
    badgeText: "text-cyan-300",
    tag: "Frontend",
  },
  nextjs: {
    bg: "bg-white/[0.05] hover:bg-white/[0.1]",
    border: "border-white/20 hover:border-white/40",
    badgeBg: "bg-white/10",
    badgeText: "text-white",
    tag: "Full-Stack",
  },
  redux: {
    bg: "bg-purple-500/[0.06] hover:bg-purple-500/[0.12]",
    border: "border-purple-500/20 hover:border-purple-400/50",
    badgeBg: "bg-purple-500/15",
    badgeText: "text-purple-300",
    tag: "State Management",
  },
  nodejs: {
    bg: "bg-emerald-500/[0.06] hover:bg-emerald-500/[0.12]",
    border: "border-emerald-500/20 hover:border-emerald-400/50",
    badgeBg: "bg-emerald-500/15",
    badgeText: "text-emerald-300",
    tag: "Runtime",
  },
  express: {
    bg: "bg-amber-500/[0.06] hover:bg-amber-500/[0.12]",
    border: "border-amber-500/20 hover:border-amber-400/50",
    badgeBg: "bg-amber-500/15",
    badgeText: "text-amber-300",
    tag: "Backend",
  },
  expressjs: {
    bg: "bg-amber-500/[0.06] hover:bg-amber-500/[0.12]",
    border: "border-amber-500/20 hover:border-amber-400/50",
    badgeBg: "bg-amber-500/15",
    badgeText: "text-amber-300",
    tag: "Backend",
  },
  nestjs: {
    bg: "bg-rose-500/[0.06] hover:bg-rose-500/[0.12]",
    border: "border-rose-500/20 hover:border-rose-400/50",
    badgeBg: "bg-rose-500/15",
    badgeText: "text-rose-300",
    tag: "Enterprise",
  },
  postgresql: {
    bg: "bg-sky-500/[0.06] hover:bg-sky-500/[0.12]",
    border: "border-sky-500/20 hover:border-sky-400/50",
    badgeBg: "bg-sky-500/15",
    badgeText: "text-sky-300",
    tag: "SQL Database",
  },
  postgres: {
    bg: "bg-sky-500/[0.06] hover:bg-sky-500/[0.12]",
    border: "border-sky-500/20 hover:border-sky-400/50",
    badgeBg: "bg-sky-500/15",
    badgeText: "text-sky-300",
    tag: "SQL Database",
  },
  mongodb: {
    bg: "bg-emerald-500/[0.06] hover:bg-emerald-500/[0.12]",
    border: "border-emerald-500/20 hover:border-emerald-400/50",
    badgeBg: "bg-emerald-500/15",
    badgeText: "text-emerald-300",
    tag: "NoSQL Database",
  },
  mongo: {
    bg: "bg-emerald-500/[0.06] hover:bg-emerald-500/[0.12]",
    border: "border-emerald-500/20 hover:border-emerald-400/50",
    badgeBg: "bg-emerald-500/15",
    badgeText: "text-emerald-300",
    tag: "NoSQL Database",
  },
  prisma: {
    bg: "bg-indigo-500/[0.06] hover:bg-indigo-500/[0.12]",
    border: "border-indigo-500/20 hover:border-indigo-400/50",
    badgeBg: "bg-indigo-500/15",
    badgeText: "text-indigo-300",
    tag: "Type-Safe ORM",
  },
  "system-design": {
    bg: "bg-purple-500/[0.06] hover:bg-purple-500/[0.12]",
    border: "border-purple-500/20 hover:border-purple-400/50",
    badgeBg: "bg-purple-500/15",
    badgeText: "text-purple-300",
    tag: "Architecture",
  },
  oop: {
    bg: "bg-teal-500/[0.06] hover:bg-teal-500/[0.12]",
    border: "border-teal-500/20 hover:border-teal-400/50",
    badgeBg: "bg-teal-500/15",
    badgeText: "text-teal-300",
    tag: "OOP Paradigms",
  },
};

const DEFAULT_TRACK_ACCENT = {
  bg: "bg-white/[0.04] hover:bg-white/[0.08]",
  border: "border-white/[0.08] hover:border-purple-500/40",
  badgeBg: "bg-purple-500/15",
  badgeText: "text-purple-300",
  tag: "Track",
};

function NavContent(): JSX.Element {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() || "";
  const initialCategory: CoreCategory = useMemo(() => {
    const p = pathname.toLowerCase();
    if (p.includes("postgres") || p.includes("mongo") || p.includes("prisma") || p.includes("database")) return "database";
    if (p.includes("react") || p.includes("next")) return "frontend";
    if (p.includes("node") || p.includes("express") || p.includes("nest")) return "backend";
    if (p.includes("redux")) return "state-management";
    if (p.includes("system") || p.includes("oop")) return "architecture";
    return "language";
  }, [pathname]);

  const [activeCategory, setActiveCategory] = useState<CoreCategory>("language");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileActiveCategory, setMobileActiveCategory] = useState<CoreCategory>(initialCategory);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");

  // Sync active category when opening mobile menu to match current page
  useEffect(() => {
    if (isMobileMenuOpen) {
      setMobileActiveCategory(initialCategory);
      setMobileSearchQuery("");
    }
  }, [isMobileMenuOpen, initialCategory]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

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

  const [notesCount, setNotesCount] = useState<number>(0);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const updateNotesCount = () => {
      try {
        setNotesCount(getLocalNotes().length);
      } catch {}
    };

    updateNotesCount();

    window.addEventListener("learncraft-notes-updated", updateNotesCount);
    window.addEventListener("learncraft:revision-sync", updateNotesCount);

    return () => {
      window.removeEventListener("learncraft-notes-updated", updateNotesCount);
      window.removeEventListener("learncraft:revision-sync", updateNotesCount);
    };
  }, []);

  // Scroll detection & auto-hide/reveal logic with single passive listener
  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const threshold = 8; // ~8px threshold to prevent flickering

    const updateCssNavbarOffset = (visible: boolean) => {
      // When navbar visible: 56px (h-14).
      // When hidden: 0px (flush against top of screen with no gap).
      const offset = visible ? "56px" : "0px";
      document.documentElement.style.setProperty("--navbar-offset", offset);
    };

    // Check if current page is a curriculum module page on mount
    const initialPart1 = typeof document !== "undefined" ? document.getElementById("part-1") : null;
    const initialPart2 = typeof document !== "undefined" ? document.getElementById("part-2") : null;
    const initialScrollY = typeof window !== "undefined" ? window.scrollY : 0;

    if (initialScrollY > 40) {
      setIsScrolled(true);
      if (initialPart1 && initialPart2 && initialPart2.getBoundingClientRect().top <= 80) {
        setIsVisible(false);
        updateCssNavbarOffset(false);
      } else {
        updateCssNavbarOffset(true);
      }
    } else {
      updateCssNavbarOffset(true);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;

      // Check if we are on a curriculum module page (sections part-1 and part-2 exist)
      const part1 = document.getElementById("part-1");
      const part2 = document.getElementById("part-2");
      const isModulePage = Boolean(part1);

      // Always show when scrollY is near the top of the page
      if (currentScrollY <= 40) {
        setIsVisible(true);
        setIsScrolled(currentScrollY > 20);
        updateCssNavbarOffset(true);
        lastScrollY = currentScrollY;
        return;
      }

      setIsScrolled(true);

      // On module pages, determine if user has reached the first section.
      // If part2 exists, user is at the first section when part2 is below the sticky header area (> 80px).
      // When user is in part 2, 3, 4, etc., part2's top is <= 80px.
      const isAtFirstSection = isModulePage
        ? (part2 ? part2.getBoundingClientRect().top > 80 : currentScrollY <= 200)
        : true;

      if (scrollDiff < 0) {
        // Scrolling up:
        if (isModulePage) {
          // Requirement: "The navbar should only appear when I reach the first section of the current module."
          if (isAtFirstSection) {
            setIsVisible(true);
            updateCssNavbarOffset(true);
          } else {
            // In parts 2..7: keep navbar hidden
            setIsVisible(false);
            updateCssNavbarOffset(false);
          }
        } else {
          // Standard page: reveal navbar on scroll up
          if (Math.abs(scrollDiff) >= threshold) {
            setIsVisible(true);
            updateCssNavbarOffset(true);
          }
        }
        lastScrollY = currentScrollY;
      } else if (scrollDiff > 0) {
        // Scrolling down: auto-hide navbar
        if (Math.abs(scrollDiff) >= threshold) {
          setIsVisible(false);
          updateCssNavbarOffset(false);
          lastScrollY = currentScrollY;
        }
      }
    };

    const showNavbar = () => {
      setIsVisible(true);
      updateCssNavbarOffset(true);
    };

    const hideNavbar = () => {
      setIsVisible(false);
      updateCssNavbarOffset(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("learncraft-show-nav", showNavbar);
    window.addEventListener("learncraft-hide-nav", hideNavbar);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("learncraft-show-nav", showNavbar);
      window.removeEventListener("learncraft-hide-nav", hideNavbar);
    };
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
      architecture: [],
    };

    SKILL_ROADMAPS.forEach((skill) => {
      if (skill.status === "available" && skill.category in map) {
        map[skill.category as CoreCategory].push(skill);
      }
    });

    return map;
  }, []);

  // Skills to display in the mobile drawer (strictly 1 category at a time or instant search)
  const mobileSkillsToDisplay = useMemo(() => {
    const query = mobileSearchQuery.trim().toLowerCase();
    if (query) {
      return SKILL_ROADMAPS.filter(
        (s) =>
          s.status === "available" &&
          s.learnPath &&
          (s.title.toLowerCase().includes(query) ||
            s.description.toLowerCase().includes(query) ||
            s.slug.toLowerCase().includes(query) ||
            s.category.toLowerCase().includes(query))
      );
    }

    if (mobileActiveCategory === "database") {
      return [
        ...(availableSkillsByCategory.database || []),
        ...(availableSkillsByCategory.orm || []),
      ];
    }

    return availableSkillsByCategory[mobileActiveCategory] || [];
  }, [mobileActiveCategory, mobileSearchQuery, availableSkillsByCategory]);

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
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ease-out motion-reduce:transition-none ${
          isVisible || isMenuOpen || isMobileMenuOpen
            ? "translate-y-0"
            : "-translate-y-full"
        } ${isScrolled ? "pt-0 px-0" : "pt-0 px-0 md:pt-6 md:px-6"}`}
      >
        <nav
          className={`transition-all duration-300 w-full pointer-events-auto ${
            isScrolled
              ? "h-14 bg-[#0E121B]/95 backdrop-blur-xl rounded-none border-b border-white/[0.08] shadow-md shadow-black/30"
              : "h-14 md:h-16 max-w-[95rem] bg-[#0E121B]/95 backdrop-blur-xl rounded-none md:rounded-2xl border-b md:border border-white/[0.08] hover:border-purple-500/30 shadow-lg shadow-black/20"
          }`}
        >
          <div className="max-w-[95rem] mx-auto h-full px-3.5 sm:px-4 md:px-6 flex items-center justify-between">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <Link
                href="/learn"
                prefetch={true}
                className="group flex items-center gap-2.5 font-black tracking-tight text-ds-text-strong"
              >
                <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04] p-0.5 shadow-sm group-hover:scale-105 group-hover:border-purple-500/40 transition-all duration-300">
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
                                  prefetch={true}
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
                          prefetch={true}
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

            {/* Right Side Actions — Clean, Uniform & Cohesive */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
              {/* Global Search Palette Trigger */}
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("learncraft-open-command-palette"))}
                className="w-9 h-9 sm:w-auto flex items-center justify-center sm:px-3 text-xs text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-purple-500/40 rounded-xl transition-all duration-200 cursor-pointer shadow-sm group shrink-0"
                aria-label="Open search command palette"
                title="Search lessons, tracks, roadmaps, notes (Cmd+K / Ctrl+K)"
              >
                <svg
                  className="w-3.5 h-3.5 text-purple-400 group-hover:text-purple-300 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden md:inline font-medium text-slate-300 group-hover:text-white sm:ml-2">Search</span>
                <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-white/[0.06] border border-white/[0.1] rounded-md sm:ml-2">
                  <span>⌘K</span>
                </kbd>
              </button>

              {/* Daily Streak & XP Widget */}
              <StreakXPPill />

              {/* User Profile Dropdown or Sign In */}
              {session?.user ? (
                <UserNavMenu totalRevisions={totalRevisions} notesCount={notesCount} />
              ) : (
                <button
                  onClick={openAuthModal}
                  className="hidden sm:flex items-center gap-2 px-3.5 h-9 border border-white/[0.08] text-white text-xs font-bold rounded-xl bg-white/[0.04] hover:bg-white/[0.08] hover:border-purple-500/40 transition-all cursor-pointer shadow-sm shrink-0"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Sign In</span>
                </button>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-purple-500/40 transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                aria-label="Toggle navigation menu"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>


        </nav>
      </header>
      <div className="h-14 md:h-24 w-full pointer-events-none" />
      <AuthModal />

      {/* ─── Mobile Navigation Drawer Portal (Category-Focused Learning Hub) ─── */}
      {isMobileMenuOpen && mounted && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[99999] md:hidden bg-[#070913]/98 backdrop-blur-2xl flex flex-col text-slate-100 font-sans animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Curriculum Navigation"
        >
          {/* Top Header Bar */}
          <div className="h-14 px-4 bg-[#0B0F1E]/90 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between shrink-0 select-none shadow-sm">
            <Link
              href="/learn"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 active:scale-95 transition-transform"
            >
              <div className="h-8 w-8 overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.05] p-0.5 shadow-sm">
                <img
                  src="/logo.png"
                  alt="LearnCraft Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base font-display font-black tracking-tight text-white">
                  LearnCraft
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/25">
                  CURRICULUM
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.06] hover:bg-white/[0.12] active:scale-90 border border-white/[0.1] text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
              aria-label="Close navigation menu"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable Content Container */}
          <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-3.5 pb-24 scrollbar-thin scrollbar-thumb-white/10">
            {/* Quick Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                placeholder="Search topics (e.g. PostgreSQL, React, NestJS)..."
                className="w-full pl-9 pr-9 py-2.5 bg-white/[0.04] hover:bg-white/[0.06] focus:bg-[#0B0F24] border border-white/[0.1] focus:border-purple-500/60 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none transition-all shadow-inner"
              />
              {mobileSearchQuery && (
                <button
                  type="button"
                  onClick={() => setMobileSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white text-xs font-bold"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Selector Tabs (NO "All Tracks" — Always Focused on One Category) */}
            {!mobileSearchQuery && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-0.5">
                  Choose Category
                </span>
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
                  {MOBILE_CATEGORIES.map((cat) => {
                    const isSelected = mobileActiveCategory === cat.id;
                    const count =
                      cat.id === "database"
                        ? (availableSkillsByCategory.database || []).length + (availableSkillsByCategory.orm || []).length
                        : (availableSkillsByCategory[cat.id] || []).length;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setMobileActiveCategory(cat.id);
                          setMobileSearchQuery("");
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                          isSelected
                            ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/40"
                            : "bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md font-bold ${
                            isSelected ? "bg-white/20 text-white" : "bg-white/[0.06] text-slate-500"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Current Category Info Banner (Shows only the selected domain context) */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-950/30 to-indigo-950/20 border border-purple-500/20 flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-base">
                    {mobileSearchQuery
                      ? "🔍"
                      : MOBILE_CATEGORIES.find((c) => c.id === mobileActiveCategory)?.icon || "📚"}
                  </span>
                  <span className="text-xs font-bold text-white tracking-wide">
                    {mobileSearchQuery
                      ? "Search Results"
                      : MOBILE_CATEGORIES.find((c) => c.id === mobileActiveCategory)?.label || "Curriculum"}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold">
                    {mobileSkillsToDisplay.length} {mobileSkillsToDisplay.length === 1 ? "track" : "tracks"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300/80 mt-1 line-clamp-1">
                  {mobileSearchQuery
                    ? `Showing tracks matching "${mobileSearchQuery}"`
                    : MOBILE_CATEGORIES.find((c) => c.id === mobileActiveCategory)?.description}
                </p>
              </div>
            </div>

            {/* Focused Tracks List (Only 2 or 3 tracks at a time, never all 12 at once!) */}
            {mobileSkillsToDisplay.length > 0 ? (
              <div className="space-y-2.5">
                {mobileSkillsToDisplay.map((skill) => {
                  const accent = TRACK_ACCENTS[skill.slug] || DEFAULT_TRACK_ACCENT;
                  return (
                    <Link
                      key={skill.slug}
                      href={skill.learnPath}
                      prefetch={true}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`relative flex flex-col p-3.5 rounded-2xl ${accent.bg} border ${accent.border} transition-all duration-200 active:scale-[0.98] group shadow-sm hover:shadow-md space-y-2`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center p-2 shadow-inner group-hover:scale-105 transition-transform shrink-0">
                            <TechIcon slug={skill.slug} className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors block truncate">
                              {skill.title}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 font-semibold block">
                              {skill.totalLessons} interactive lessons
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${accent.badgeBg} ${accent.badgeText} border border-white/10 shrink-0`}
                        >
                          {accent.tag}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {skill.description}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-xs">
                        <span className="text-[11px] font-medium text-slate-400 group-hover:text-purple-300 transition-colors">
                          Start learning track
                        </span>
                        <div className="flex items-center gap-1 text-purple-400 font-bold group-hover:translate-x-1 transition-transform">
                          <span>Explore</span>
                          <span>→</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <span className="text-2xl">🔍</span>
                <p className="text-xs text-slate-400">
                  No tracks found matching "{mobileSearchQuery}"
                </p>
                <button
                  type="button"
                  onClick={() => setMobileSearchQuery("")}
                  className="px-3 py-1.5 rounded-xl bg-purple-600/30 text-purple-300 text-xs font-bold"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* Quick Study Navigation Dock */}
            <div className="space-y-2 pt-2 border-t border-white/[0.08]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-0.5">
                Study Tools & Resources
              </span>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/notes"
                  prefetch={true}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] active:scale-[0.98] border border-white/[0.06] text-white text-xs font-bold transition-all"
                >
                  <span className="text-base">📝</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate">Notes</span>
                      {notesCount > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 text-[9px] font-mono font-bold">
                          {notesCount}
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] font-normal text-slate-400 block">Saved Highlights</span>
                  </div>
                </Link>

                <Link
                  href="/interview"
                  prefetch={true}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] active:scale-[0.98] border border-white/[0.06] text-white text-xs font-bold transition-all"
                >
                  <span className="text-base">🎯</span>
                  <div className="min-w-0">
                    <span className="block truncate">Interviews</span>
                    <span className="text-[9px] font-normal text-slate-400 block">Practice Questions</span>
                  </div>
                </Link>

                <Link
                  href="/revision"
                  prefetch={true}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] active:scale-[0.98] border border-white/[0.06] text-white text-xs font-bold transition-all"
                >
                  <span className="text-base">⚡</span>
                  <div className="min-w-0">
                    <span className="block truncate">Revision</span>
                    <span className="text-[9px] font-normal text-slate-400 block">Spaced Flashcards</span>
                  </div>
                </Link>

                <Link
                  href="/roadmaps"
                  prefetch={true}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] active:scale-[0.98] border border-white/[0.06] text-white text-xs font-bold transition-all"
                >
                  <span className="text-base">🗺️</span>
                  <div className="min-w-0">
                    <span className="block truncate">Roadmaps</span>
                    <span className="text-[9px] font-normal text-slate-400 block">All Careers & Paths</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* User Profile / Authentication Section */}
            <div className="pt-3 border-t border-white/[0.08]">
              <MobileAuthButton onAction={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

function UserNavMenu({
  totalRevisions,
  notesCount,
}: {
  totalRevisions: number;
  notesCount: number;
}) {
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
        className="flex items-center gap-1.5 p-1 pl-1.5 pr-2 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-purple-500/30 transition-all cursor-pointer group shrink-0 shadow-sm"
        title="User Menu & Study Hub"
      >
        <div className="relative">
          <UserAvatar
            src={session.user.image}
            name={session.user.name}
            size="sm"
          />
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
        <>
          {/* Mobile backdrop for outside tap dismissal */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs sm:hidden z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed left-3 right-3 top-[68px] mx-auto max-w-[340px] sm:max-w-none sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2 sm:w-72 sm:w-80 rounded-2xl bg-[#0E121B]/95 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-left">
          {/* User Info Header */}
          <div className="p-3 pb-2.5 border-b border-white/[0.06] mb-1">
            <div className="flex items-center gap-3 mb-2">
              <UserAvatar
                src={session.user.image}
                name={session.user.name}
                size="lg"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-white truncate">
                  {session.user.name || "Learner"}
                </h4>
                <p className="text-xs text-slate-400 truncate" title={session.user.email || undefined}>
                  {session.user.email || "Google Account"}
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
              href="/dashboard"
              prefetch={true}
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-purple-400">📊</span>
                <span>Analytics Dashboard</span>
              </div>
              <span className="text-[10px] text-purple-400 font-mono font-bold">New</span>
            </Link>

            <Link
              href="/notes"
              prefetch={true}
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-purple-400">📝</span>
                <span>My Study Notes</span>
              </div>
              {notesCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-mono font-bold">
                  {notesCount}
                </span>
              )}
            </Link>

            <Link
              href="/revision"
              prefetch={true}
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-purple-400">⚡</span>
                <span>Quick Revision & Flashcards</span>
              </div>
              {totalRevisions > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-mono font-bold">
                  {totalRevisions}
                </span>
              )}
            </Link>

            <Link
              href="/interview"
              prefetch={true}
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-purple-400">🎯</span>
                <span>Interview Preparation</span>
              </div>
            </Link>
          </div>

          <div className="h-px bg-white/[0.06] my-1" />

          {/* Sign Out Button */}
          <button
            onClick={() => {
              setIsOpen(false);
              clearAllClientCaches();
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
        </>
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
          <UserAvatar
            src={session.user.image}
            name={session.user.name}
            size="sm"
          />
          <span className="text-xs font-bold text-white truncate max-w-[120px]">
            {session.user.name || "Learner"}
          </span>
        </div>
        <button
          onClick={() => {
            clearAllClientCaches();
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
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        />
      </svg>
      <span>Sign In with Google</span>
    </button>
  );
}
