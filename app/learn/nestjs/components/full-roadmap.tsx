"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  ArrowRight,
  Filter,
} from "./icons";
import {
  NESTJS_STAGES,
} from "../data/nestjs-curriculum";
import { isLessonComplete, getCompletionByStage } from "../data/progress-store";
import { ContentTagBadge } from "./content-tag-badge";

interface FullRoadmapProps {
  initialExpandedStageId?: string;
}

export function FullRoadmap({ initialExpandedStageId }: FullRoadmapProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("ALL");
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    NESTJS_STAGES.forEach((stage, idx) => {
      map[stage.id] = initialExpandedStageId ? stage.id === initialExpandedStageId : idx === 0;
    });
    return map;
  });

  const toggleStage = (stageId: string) => {
    setExpandedStages((prev) => ({
      ...prev,
      [stageId]: !prev[stageId],
    }));
  };

  const expandAll = () => {
    const map: Record<string, boolean> = {};
    NESTJS_STAGES.forEach((s) => (map[s.id] = true));
    setExpandedStages(map);
  };

  const collapseAll = () => {
    const map: Record<string, boolean> = {};
    NESTJS_STAGES.forEach((s) => (map[s.id] = false));
    setExpandedStages(map);
  };

  const filteredStages = useMemo(() => {
    return NESTJS_STAGES.map((stage) => {
      const filteredLessons = stage.lessons.filter((lesson) => {
        const matchesSearch =
          !searchQuery.trim() ||
          lesson.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lesson.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lesson.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (lesson.outcomeName &&
            lesson.outcomeName.toLowerCase().includes(searchQuery.toLowerCase()));

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

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-5 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-ds-icon-sub absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search lessons, concepts, or codes (e.g. NJ-03, DTO, JWT)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-ds-bg-weak border border-ds-stroke-soft rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-ds-text-strong placeholder-ds-text-soft focus:outline-none focus:border-ds-feature-base transition-colors"
          />
        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-ds-text-soft mr-1 flex items-center gap-1 font-medium">
            <Filter className="w-3.5 h-3.5" /> Tag:
          </span>
          {(["ALL", "CORE", "BUILD", "PROFESSIONAL", "REFERENCE"] as const).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                selectedTag === tag
                  ? "bg-ds-bg-strong text-ds-text-white shadow-sm"
                  : "bg-ds-bg-weak text-ds-text-sub hover:text-ds-text-strong hover:bg-ds-bg-soft border border-ds-stroke-soft"
              }`}
            >
              {tag === "ALL" ? "All" : tag === "PROFESSIONAL" ? "Pro" : tag === "REFERENCE" ? "Ref" : tag.charAt(0) + tag.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Expand/Collapse All */}
        <div className="flex items-center gap-2 border-t md:border-t-0 pt-2 md:pt-0 border-ds-stroke-soft shrink-0">
          <button
            onClick={expandAll}
            className="text-xs font-semibold text-ds-text-sub hover:text-ds-text-strong transition-colors"
          >
            Expand All
          </button>
          <span className="text-ds-text-disabled">·</span>
          <button
            onClick={collapseAll}
            className="text-xs font-semibold text-ds-text-sub hover:text-ds-text-strong transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Stages Accordions */}
      <div className="space-y-5">
        {filteredStages.length === 0 ? (
          <div className="text-center py-12 border border-ds-stroke-soft rounded-2xl bg-ds-bg-white text-ds-text-sub text-sm">
            No lessons found matching &quot;{searchQuery}&quot;.
          </div>
        ) : (
          filteredStages.map((stage) => {
            const isExpanded = !!expandedStages[stage.id] || searchQuery.trim().length > 0;
            const stageStats = getCompletionByStage(stage.id);

            return (
              <div
                key={stage.id}
                className="rounded-3xl border border-ds-stroke-soft hover:border-ds-feature-base/30 bg-ds-bg-white overflow-hidden transition-all duration-300 shadow-sm"
              >
                {/* Stage Header Accordion Toggle */}
                <button
                  onClick={() => toggleStage(stage.id)}
                  className="group w-full px-6 sm:px-8 py-5 flex items-center justify-between gap-4 text-left transition-all hover:bg-ds-bg-weak/50 cursor-pointer"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-ds-bg-weak flex items-center justify-center font-mono text-xs font-black text-ds-text-strong border border-ds-stroke-soft group-hover:border-ds-feature-base/40 group-hover:text-ds-feature-base group-hover:bg-ds-feature-lighter/5 shrink-0 transition-all duration-300">
                      0{stage.stageNumber}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-base sm:text-lg font-black text-ds-text-strong group-hover:text-ds-feature-base transition-colors duration-300">
                          {stage.name}
                        </span>
                        <span className="text-xs sm:text-sm text-ds-text-sub hidden sm:inline">
                          — {stage.subtitle}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-ds-text-sub line-clamp-1 mt-0.5">
                        {stage.milestone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right hidden sm:block">
                      <span className="text-xs sm:text-sm font-bold text-ds-text-sub">
                        {stageStats.completed}/{stage.lessons.length}
                      </span>
                    </div>

                    <div className="p-1.5 rounded-lg text-ds-icon-sub group-hover:text-ds-feature-base group-hover:bg-ds-bg-soft/50 transition-all duration-300">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Stage Lessons Grid - Card-Based Design */}
                {isExpanded && (
                  <div className="p-6 sm:p-8 border-t border-ds-stroke-soft bg-ds-bg-weak">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {stage.lessons.map((lesson) => {
                        const isDone =
                          isLessonComplete(lesson.slug) ||
                          isLessonComplete(lesson.code);

                        return (
                          <Link
                            key={lesson.slug}
                            href={lesson.path}
                            className="group flex flex-col justify-between p-6 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft hover:border-ds-feature-base shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2.5 mb-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs font-bold text-ds-text-sub bg-ds-bg-weak px-2 py-0.5 rounded">
                                    {lesson.code}
                                  </span>
                                  {isDone && (
                                    <CheckCircle2 className="w-4 h-4 text-ds-success-base" />
                                  )}
                                </div>
                                <ContentTagBadge tag={lesson.tag} size="sm" />
                              </div>

                              <h4 className="text-base font-bold text-ds-text-strong group-hover:text-ds-feature-base transition-colors line-clamp-1">
                                {lesson.name}
                              </h4>
                              {lesson.outcomeName && (
                                <p className="text-xs font-semibold text-ds-feature-base mt-1 line-clamp-1">
                                  {lesson.outcomeName}
                                </p>
                              )}
                              <p className="text-xs sm:text-sm text-ds-text-sub line-clamp-2 mt-2 leading-relaxed">
                                {lesson.desc}
                              </p>
                            </div>

                            <div className="flex items-center justify-between gap-2 mt-5 pt-3.5 border-t border-ds-stroke-soft text-xs">
                              <span className="inline-flex items-center gap-1.5 text-ds-text-soft">
                                <Clock className="w-3.5 h-3.5" />
                                {lesson.estimatedMinutes}m
                              </span>
                              <div className="inline-flex items-center gap-1 font-bold text-ds-text-sub group-hover:text-ds-feature-base group-hover:translate-x-1 transition-all">
                                <span>{isDone ? "Review" : "Start"}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
