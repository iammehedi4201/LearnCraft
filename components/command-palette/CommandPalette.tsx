"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import {
  searchLearnCraft,
  getRecentSearches,
  saveRecentSearch,
  removeRecentSearch,
  clearRecentSearches,
  SearchResultItem,
  RecentSearchItem,
  SearchCategory,
} from "@/lib/search-engine";

interface CategoryTab {
  id: SearchCategory;
  label: string;
  icon: string;
}

const CATEGORY_TABS: CategoryTab[] = [
  { id: "all", label: "All", icon: "✨" },
  { id: "lessons", label: "Lessons", icon: "📖" },
  { id: "tracks", label: "Tracks", icon: "⚡" },
  { id: "notes", label: "Notes", icon: "📝" },
  { id: "roadmaps", label: "Roadmaps", icon: "🗺️" },
  { id: "actions", label: "Actions", icon: "⚡" },
];

export function CommandPalette(): JSX.Element | null {
  const router = useRouter();
  const { toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<SearchCategory>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);
  const [isMac, setIsMac] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsListRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  // Detect platform (Mac vs PC)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform));
    }
  }, []);

  // Global Keybinding: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);
    const handleCustomClose = () => setIsOpen(false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("learncraft-open-command-palette", handleCustomOpen);
    window.addEventListener("learncraft-close-command-palette", handleCustomClose);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("learncraft-open-command-palette", handleCustomOpen);
      window.removeEventListener("learncraft-close-command-palette", handleCustomClose);
    };
  }, [isOpen]);

  // Focus management & body scroll lock
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      setRecentSearches(getRecentSearches());
      setSelectedIndex(0);

      // Auto-focus input
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
      if (previouslyFocusedElementRef.current && typeof previouslyFocusedElementRef.current.focus === "function") {
        previouslyFocusedElementRef.current.focus();
      }
    }
  }, [isOpen]);

  // Execute Search query
  const searchResults = useMemo(() => {
    if (!isOpen) return [];
    return searchLearnCraft(query, activeCategory, { limit: 40 });
  }, [isOpen, query, activeCategory]);

  // Reset selected index when query or results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (!resultsListRef.current) return;
    const selectedEl = resultsListRef.current.querySelector(
      `[data-result-index="${selectedIndex}"]`
    ) as HTMLElement | null;
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // Action Dispatcher
  const handleSelectResult = useCallback(
    (item: SearchResultItem | RecentSearchItem) => {
      // Save to recent searches
      saveRecentSearch({
        id: item.id,
        title: item.title,
        category: item.category,
        subtitle: item.subtitle,
        href: item.href,
        actionId: item.actionId,
        icon: item.icon,
      });

      setIsOpen(false);

      // Execute custom action if present
      if (item.actionId) {
        if (item.actionId === "toggle-theme") {
          toggleTheme();
          return;
        }
        if (item.actionId === "open-reading-panel") {
          window.dispatchEvent(new CustomEvent("learncraft-toggle-reading-panel"));
          return;
        }
        if (item.actionId === "clear-search-history") {
          clearRecentSearches();
          setRecentSearches([]);
          return;
        }
      }

      // Navigate if href present
      if (item.href) {
        router.push(item.href);
      }
    },
    [router, toggleTheme]
  );

  // Keyboard navigation within modal
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const listLength = query.trim() ? searchResults.length : recentSearches.length;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (listLength > 0) {
        setSelectedIndex((prev) => (prev + 1) % listLength);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (listLength > 0) {
        setSelectedIndex((prev) => (prev - 1 + listLength) % listLength);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim() && searchResults[selectedIndex]) {
        handleSelectResult(searchResults[selectedIndex]);
      } else if (!query.trim() && recentSearches[selectedIndex]) {
        handleSelectResult(recentSearches[selectedIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Cycle through category tabs
      const currentIdx = CATEGORY_TABS.findIndex((t) => t.id === activeCategory);
      const nextIdx = (currentIdx + 1) % CATEGORY_TABS.length;
      setActiveCategory(CATEGORY_TABS[nextIdx].id);
    }
  };

  const handleRemoveRecent = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = removeRecentSearch(id);
    setRecentSearches(updated);
  };

  const handleClearAllRecents = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  if (!isOpen) return null;

  const showRecents = !query.trim() && recentSearches.length > 0;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-6 pb-6"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette and Global Search"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-200"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-2xl bg-[#0B0F19] border border-white/[0.12] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[82vh] transition-all duration-200 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top ambient glow line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-80" />

        {/* Search Header Bar */}
        <div className="relative flex items-center gap-3 px-4 sm:px-5 py-4 border-b border-white/[0.08] bg-[#0E1322]">
          <span className="text-purple-400 text-lg flex items-center justify-center">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search lessons, tracks, roadmaps, notes, or run actions..."
            className="flex-1 bg-transparent text-white placeholder-slate-400 text-sm sm:text-base outline-none font-medium selection:bg-purple-500/30"
            autoComplete="off"
            spellCheck={false}
            role="combobox"
            aria-expanded="true"
            aria-haspopup="listbox"
            aria-controls="command-palette-results"
          />

          {query ? (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-white/[0.06] hover:bg-white/[0.1] transition-colors"
              aria-label="Clear search input"
            >
              Clear
            </button>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-white/[0.06] border border-white/[0.1] px-2 py-0.5 rounded-md">
              <span>{isMac ? "⌘" : "Ctrl"}</span>
              <span>K</span>
            </span>
          )}

          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/[0.06] transition-colors"
            aria-label="Close palette"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.06] bg-[#0A0D17] overflow-x-auto scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Results & Recents Area */}
        <div
          ref={resultsListRef}
          id="command-palette-results"
          role="listbox"
          className="flex-1 overflow-y-auto px-2 py-3 space-y-1 max-h-[50vh] divide-y divide-white/[0.02]"
        >
          {/* Recent Searches section (when query is empty) */}
          {showRecents && (
            <div className="pb-3 mb-2">
              <div className="flex items-center justify-between px-3 py-1.5 mb-1 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span>🕒</span> Recent Searches
                </span>
                <button
                  onClick={handleClearAllRecents}
                  className="text-slate-400 hover:text-rose-400 transition-colors text-[10px]"
                >
                  Clear All
                </button>
              </div>

              {recentSearches.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <div
                    key={`recent-${item.id}-${idx}`}
                    data-result-index={idx}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectResult(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? "bg-purple-600/20 border-l-2 border-purple-400 text-white"
                        : "hover:bg-white/[0.04] text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-base flex-shrink-0">{item.icon}</span>
                      <div className="min-w-0 truncate">
                        <div className="text-xs sm:text-sm font-semibold truncate text-white">
                          {item.title}
                        </div>
                        {item.subtitle && (
                          <div className="text-[11px] text-slate-400 truncate">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-400 uppercase">
                        {item.category}
                      </span>
                      <button
                        onClick={(e) => handleRemoveRecent(e, item.id)}
                        className="text-slate-400 hover:text-rose-400 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove recent item"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Active Search Results */}
          {query.trim() && searchResults.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Found {searchResults.length} {searchResults.length === 1 ? "result" : "results"}
              </div>

              {searchResults.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <div
                    key={item.id}
                    data-result-index={idx}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectResult(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? "bg-purple-600/20 border-l-2 border-purple-400 text-white shadow-sm"
                        : "hover:bg-white/[0.04] text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="text-lg flex-shrink-0">{item.icon}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-semibold truncate text-white">
                            {renderHighlightedTitle(item.title, query, item.highlightIndices)}
                          </span>
                          {item.badge && (
                            <span
                              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                                item.badgeColor || "bg-purple-500/10 text-purple-300 border-purple-500/20"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <div className="text-[11px] text-slate-400 truncate mt-0.5">
                            {item.subtitle}
                          </div>
                        )}
                        {item.description && !item.subtitle && (
                          <div className="text-[11px] text-slate-400 truncate mt-0.5">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      {isSelected ? (
                        <span className="flex items-center gap-1 text-[11px] font-mono font-semibold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30">
                          <span>↵</span>
                          <span>{item.category === "actions" ? "Run" : "Jump"}</span>
                        </span>
                      ) : item.shortcut ? (
                        <span className="text-[10px] font-mono text-slate-400 bg-white/[0.06] px-1.5 py-0.5 rounded">
                          {item.shortcut}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400 uppercase">
                          {item.category}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty state when query produces no matches */}
          {query.trim() && searchResults.length === 0 && (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="text-3xl">🔍</div>
              <div className="text-sm font-semibold text-white">No results found for &ldquo;{query}&rdquo;</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try searching by topic (e.g. Next.js, Redux), lesson code (e.g. SYS-01), or quick actions (e.g. Theme, Dashboard).
              </p>
              <div className="pt-2 flex justify-center gap-2 flex-wrap">
                {["System Design", "App Router", "Dashboard", "Redux"].map((sample) => (
                  <button
                    key={sample}
                    onClick={() => setQuery(sample)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-purple-300 border border-white/[0.08] transition-colors"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Default suggestion hints if query is empty and no recents */}
          {!query.trim() && !showRecents && (
            <div className="py-6 px-4 space-y-4">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2">
                Quick Shortcuts & Popular Tracks
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {searchResults.slice(0, 6).map((item, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <div
                      key={item.id}
                      data-result-index={idx}
                      onClick={() => handleSelectResult(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all ${
                        isSelected
                          ? "bg-purple-600/20 border-purple-500/40 text-white"
                          : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] text-slate-300"
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate">{item.title}</div>
                        <div className="text-[10px] text-slate-400 truncate">{item.subtitle || item.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Keyboard Hints */}
        <div className="px-4 py-3 bg-[#080B12] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-slate-300 border border-white/[0.1]">↑↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-slate-300 border border-white/[0.1]">↵</kbd>
              <span>Select</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-slate-300 border border-white/[0.1]">Tab</kbd>
              <span>Category</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-slate-300 border border-white/[0.1]">Esc</kbd>
              <span>Close</span>
            </span>
          </div>

          <span className="hidden sm:inline text-purple-400/80 font-semibold">
            LearnCraft Command Engine
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Highlight Match Letters Helper ──────────────────────────────────────────

function renderHighlightedTitle(
  title: string,
  query: string,
  ranges?: [number, number][]
): React.ReactNode {
  if (!query.trim() || !ranges || ranges.length === 0) {
    return title;
  }

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  for (let i = 0; i < ranges.length; i++) {
    const [start, end] = ranges[i];
    if (start > lastIndex) {
      elements.push(title.substring(lastIndex, start));
    }
    elements.push(
      <mark
        key={`mark-${i}-${start}`}
        className="bg-purple-500/35 text-purple-100 font-bold px-0.5 rounded"
      >
        {title.substring(start, end)}
      </mark>
    );
    lastIndex = end;
  }

  if (lastIndex < title.length) {
    elements.push(title.substring(lastIndex));
  }

  return <>{elements}</>;
}
