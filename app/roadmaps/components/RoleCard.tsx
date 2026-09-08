"use client";

/**
 * RoleCard — Card for role-based (career path) roadmaps on the hub page.
 */

import Link from "next/link";
import type { RoleRoadmap } from "@/lib/roadmap-data";
import { getSkillStatus } from "@/lib/roadmap-data";
import { RoleIcon } from "@/components/roadmap/TechIcon";

interface RoleCardProps {
  role: RoleRoadmap;
}

export function RoleCard({ role }: RoleCardProps) {
  const availableCount = role.steps.filter(
    (s) => getSkillStatus(s.skillSlug) === "available"
  ).length;

  return (
    <Link href={`/roadmaps/role/${role.slug}`}>
      <div className="group relative p-6 sm:p-8 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft hover:border-ds-feature-base/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-ds-feature-lighter flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
          <RoleIcon role={role.slug} className="w-6 h-6 text-purple-400" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-ds-text-strong mb-2 group-hover:text-ds-feature-base transition-colors">
          {role.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-ds-text-sub leading-relaxed mb-5">
          {role.description}
        </p>

        {/* Skill pills preview */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {role.steps.slice(0, 5).map((step) => {
            const isAvailable = getSkillStatus(step.skillSlug) === "available";
            return (
              <span
                key={step.skillSlug}
                className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                  isAvailable
                    ? "bg-ds-feature-lighter text-ds-feature-dark"
                    : "bg-ds-bg-soft text-ds-text-disabled"
                }`}
              >
                {step.skillTitle}
              </span>
            );
          })}
          {role.steps.length > 5 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-ds-bg-soft text-ds-text-soft">
              +{role.steps.length - 5} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-ds-text-soft uppercase tracking-wider">
            {role.steps.length} Skills • {availableCount} Available
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-ds-feature-dark group-hover:text-ds-feature-base group-hover:gap-2 transition-all">
            <span>Explore</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
