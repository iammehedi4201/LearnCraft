"use client";

/**
 * RoadmapFilter — Search bar + category filter chips for the roadmaps hub.
 */

import { CATEGORY_META } from "@/lib/roadmap-data";
import type { SkillCategory } from "@/lib/roadmap-data";

interface RoadmapFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: SkillCategory | "all";
  onCategoryChange: (category: SkillCategory | "all") => void;
}

const categories: { key: SkillCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  ...Object.entries(CATEGORY_META).map(([key, meta]) => ({
    key: key as SkillCategory,
    label: meta.label,
  })),
];

export function RoadmapFilter({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}: RoadmapFilterProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-md">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ds-text-soft"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="8" />
          <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search roadmaps..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-ds-bg-white border border-ds-stroke-soft text-ds-text-strong text-sm focus:outline-none focus:border-ds-feature-base focus:ring-2 focus:ring-ds-feature-base/10 transition-all placeholder:text-ds-text-soft"
        />
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onCategoryChange(cat.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeCategory === cat.key
                ? "bg-ds-feature-base text-ds-static-white shadow-md shadow-ds-feature-base/15"
                : "bg-ds-bg-white border border-ds-stroke-soft text-ds-text-sub hover:border-ds-feature-base hover:text-ds-feature-dark"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
