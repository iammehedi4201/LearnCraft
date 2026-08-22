"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Clock,
  Search,
} from "./icons";
import {
  NESTJS_STAGES,
} from "../data/nestjs-curriculum";
import {
  isLessonComplete,
  getCompletionByStage,
  getActiveLesson,
} from "../data/progress-store";
import { ContentTagBadge } from "./content-tag-badge";

interface FullRoadmapProps {
  initialExpandedStageId?: string;
}

const STAGE_THEMES: Record<
  number,
  {
    badge: string;
    accent: string;
    borderHover: string;
    glowBg: string;
  }
> = {
  1: {
    badge: "bg-ds-success-lighter text-ds-success-dark border-ds-stroke-soft",
    accent: "text-ds-success-dark",
    borderHover: "hover:border-ds-success-base/60",
    glowBg: "group-hover:bg-ds-success-base/10",
  },
  2: {
    badge: "bg-ds-info-lighter text-ds-info-dark border-ds-stroke-soft",
    accent: "text-ds-info-dark",
    borderHover: "hover:border-ds-info-base/60",
    glowBg: "group-hover:bg-ds-info-base/10",
  },
  3: {
    badge: "bg-ds-feature-lighter text-ds-feature-dark border-ds-stroke-soft",
    accent: "text-ds-feature-dark",
    borderHover: "hover:border-ds-feature-base/60",
    glowBg: "group-hover:bg-ds-feature-base/10",
  },
  4: {
    badge: "bg-ds-warning-lighter text-ds-warning-dark border-ds-stroke-soft",
    accent: "text-ds-warning-dark",
    borderHover: "hover:border-ds-warning-base/60",
    glowBg: "group-hover:bg-ds-warning-base/10",
  },
  5: {
    badge: "bg-ds-stable-lighter text-ds-stable-dark border-ds-stroke-soft",
    accent: "text-ds-stable-dark",
    borderHover: "hover:border-ds-stable-base/60",
    glowBg: "group-hover:bg-ds-stable-base/10",
  },
  6: {
    badge: "bg-ds-highlighted-lighter text-ds-highlighted-dark border-ds-stroke-soft",
    accent: "text-ds-highlighted-dark",
    borderHover: "hover:border-ds-highlighted-base/60",
    glowBg: "group-hover:bg-ds-highlighted-base/10",
  },
};

export function FullRoadmap({ initialExpandedStageId: _initialExpandedStageId }: FullRoadmapProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("ALL");
  const activeLesson = getActiveLesson();

  const filteredStages = useMemo(() => {
    return NESTJS_STAGES.map((stage) => {
      const filteredLessons = stage.lessons.filter((lesson) => {
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !query ||
          lesson.name.toLowerCase().includes(query) ||
          lesson.code.toLowerCase().includes(query) ||
          lesson.desc.toLowerCase().includes(query);

        const matchesTag =
          selectedTag === "ALL" || lesson.tag === selectedTag;

        return matchesSearch && matchesTag;
      });

      return {
        ...stage,
        lessons: filteredLessons,
      };
    }).filter((stage) => stage.lessons.length > 0);
  }, [searchQuery, selectedTag]);

  const totalMatches = useMemo(() => {
    return filteredStages.reduce((acc, s) => acc + s.lessons.length, 0);
  }, [filteredStages]);

  return (
    <div className="space-y-12">
      {/* Search & Filter Toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-ds-icon-sub absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search curriculum (e.g. NJ-03, DTO, JWT, Prisma, Testing)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-ds-bg-weak border border-ds-stroke-soft rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-ds-text-strong placeholder-ds-text-soft focus:outline-none focus:border-ds-feature-base transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ds-text-soft hover:text-ds-text-strong font-medium"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none shrink-0">
            {(["ALL", "CORE", "BUILD", "PROFESSIONAL", "REFERENCE"] as const).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedTag === tag
                    ? "bg-ds-bg-strong text-ds-text-white shadow-sm"
                    : "bg-ds-bg-weak text-ds-text-sub hover:text-ds-text-strong hover:bg-ds-bg-soft border border-ds-stroke-soft"
                }`}
              >
                {tag === "ALL"
                  ? "All"
                  : tag === "PROFESSIONAL"
                  ? "Pro"
                  : tag === "REFERENCE"
                  ? "Ref"
                  : tag.charAt(0) + tag.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Results Info */}
        {(searchQuery || selectedTag !== "ALL") && (
          <div className="text-xs text-ds-text-sub pt-2 border-t border-ds-stroke-soft flex items-center justify-between">
            <span>
              Showing <strong>{totalMatches}</strong> lessons matching your filter
            </span>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag("ALL");
              }}
              className="text-xs text-ds-feature-base hover:text-ds-feature-dark font-semibold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Stage-by-Stage Card Curriculum */}
      <div className="space-y-12">
        {filteredStages.length === 0 ? (
          <div className="text-center py-16 border border-ds-stroke-soft rounded-3xl bg-ds-bg-white text-ds-text-sub text-sm">
            No lessons found matching &quot;{searchQuery}&quot;.
          </div>
        ) : (
          filteredStages.map((stage) => {
            const theme = STAGE_THEMES[stage.stageNumber] || STAGE_THEMES[1];
            const stageStats = getCompletionByStage(stage.id);

            return (
              <section key={stage.id} className="space-y-5">
                {/* Stage Header Banner */}
                <div className="p-4 sm:p-5 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold border shrink-0 ${theme.badge}`}
                    >
                      0{stage.stageNumber}
                    </span>

                    <h2 className="text-base sm:text-lg font-bold text-ds-text-strong tracking-tight">
                      {stage.name}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold text-ds-text-sub bg-ds-bg-weak px-3 py-1 rounded-full border border-ds-stroke-soft">
                      {stageStats.completed} / {stage.lessons.length}
                    </span>
                  </div>
                </div>

                {/* Card Grid System */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {stage.lessons.map((lesson) => {
                    const isDone =
                      isLessonComplete(lesson.slug) ||
                      isLessonComplete(lesson.code);
                    const isCurrent =
                      Boolean(activeLesson &&
                      (activeLesson.slug === lesson.slug ||
                       activeLesson.code === lesson.code));

                    return (
                      <Link
                        key={lesson.slug}
                        href={lesson.path}
                        className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-ds-bg-white border transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden ${
                          isCurrent
                            ? "border-ds-feature-base ring-2 ring-ds-feature-base/20 bg-ds-feature-lighter/[0.06] shadow-md shadow-ds-feature-base/5"
                            : `border-ds-stroke-soft ${theme.borderHover}`
                        }`}
                      >
                        {/* Ambient Corner Glow on Hover */}
                        <div
                          className={`absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-100 ${theme.glowBg}`}
                        />

                        <div className="relative z-10">
                          {/* Card Top Row: Code, Status & Tag */}
                          <div className="flex items-center justify-between gap-2 mb-4">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-black tracking-wider text-ds-text-strong bg-ds-bg-weak px-2.5 py-1 rounded-lg border border-ds-stroke-soft group-hover:border-ds-feature-base/40 group-hover:text-ds-feature-base transition-colors">
                                {lesson.code}
                              </span>

                              {isDone ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-ds-success-dark bg-ds-success-lighter px-2.5 py-0.5 rounded-full border border-ds-stroke-soft">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-ds-success-base" />
                                  Done
                                </span>
                              ) : isCurrent ? (
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-ds-feature-dark bg-ds-feature-lighter px-2.5 py-0.5 rounded-full border border-ds-feature-base animate-pulse">
                                  <span className="w-1.5 h-1.5 rounded-full bg-ds-feature-base" />
                                  Current
                                </span>
                              ) : null}
                            </div>

                            <ContentTagBadge tag={lesson.tag} size="sm" />
                          </div>

                          {/* Lesson Title */}
                          <h3 className="text-base font-bold text-ds-text-strong group-hover:text-ds-feature-base transition-colors leading-snug tracking-tight">
                            {lesson.name}
                          </h3>

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-ds-text-sub group-hover:text-ds-text-strong/90 transition-colors line-clamp-2 mt-2 leading-relaxed font-normal">
                            {lesson.desc}
                          </p>

                          {/* Prerequisite Pill - Clean Borderless Design */}
                          {lesson.prerequisite && (
                            <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-ds-text-sub bg-ds-bg-weak px-2.5 py-1 rounded-lg">
                              <span className="text-ds-text-soft font-semibold">Requires:</span>
                              <span>{lesson.prerequisite}</span>
                            </div>
                          )}
                        </div>

                        {/* Card Bottom Footer */}
                        <div className="relative z-10 flex items-center justify-between gap-2 mt-6 pt-4 border-t border-ds-stroke-soft text-xs">
                          <span className="inline-flex items-center gap-1.5 text-ds-text-soft font-medium">
                            <Clock className="w-3.5 h-3.5 text-ds-icon-sub" />
                            {lesson.estimatedMinutes}m
                          </span>

                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ds-bg-weak text-ds-text-sub border border-ds-stroke-soft group-hover:bg-ds-feature-base group-hover:text-ds-static-white group-hover:border-ds-feature-base font-bold transition-all duration-300 shadow-sm">
                            <span>
                              {isDone ? "Review" : isCurrent ? "Continue" : "Start"}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })
        )}
      </div>
    </div>
  );
}
