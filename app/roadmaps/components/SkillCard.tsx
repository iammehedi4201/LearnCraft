"use client";

/**
 * SkillCard — Card for the roadmaps hub page showing a skill with metadata.
 * Supports "available" (clickable) and "coming-soon" (muted) states.
 */

import Link from "next/link";
import { getLevelLabel } from "@/lib/roadmap-data";
import type { SkillRoadmap } from "@/lib/roadmap-data";
import { TechIcon } from "@/components/roadmap/TechIcon";

interface SkillCardProps {
  skill: SkillRoadmap;
}

export function SkillCard({ skill }: SkillCardProps) {
  const isAvailable = skill.status === "available";

  const content = (
    <div
      className={`group relative p-6 rounded-2xl border transition-all duration-300 ${
        isAvailable
          ? "bg-ds-bg-white border-ds-stroke-soft hover:border-ds-feature-base/50 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
          : "bg-ds-bg-weak border-ds-stroke-soft/60 opacity-60 cursor-default"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center p-1.5 shrink-0">
            <TechIcon slug={skill.slug} className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-bold ${
              isAvailable ? "text-ds-text-strong group-hover:text-ds-feature-base" : "text-ds-text-disabled"
            } transition-colors`}>
              {skill.title}
            </h3>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${
              isAvailable ? "text-ds-text-soft" : "text-ds-text-disabled"
            }`}>
              {getLevelLabel(skill.level)}
            </span>
          </div>
        </div>

        {/* Status badge */}
        {isAvailable ? (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${skill.badgeColor}`}>
            {skill.totalLessons} Lessons
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-ds-bg-soft text-ds-text-disabled border border-ds-stroke-soft/60">
            Coming Soon
          </span>
        )}
      </div>

      {/* Description */}
      <p className={`text-xs leading-relaxed mb-4 ${
        isAvailable ? "text-ds-text-sub" : "text-ds-text-disabled"
      }`}>
        {skill.description}
      </p>

      {/* Footer */}
      {isAvailable && (
        <div className="flex items-center gap-2 text-xs font-bold text-ds-feature-dark group-hover:text-ds-feature-base transition-colors">
          <span>View Roadmap</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      )}
    </div>
  );

  if (isAvailable) {
    return <Link href={`/roadmaps/${skill.slug}`}>{content}</Link>;
  }

  return content;
}
