"use client";

/**
 * RoleFlowChart — Visual flowchart showing skill sequence for a developer role.
 * Each node represents a skill, connected by arrows.
 */

import Link from "next/link";
import { getSkillRoadmap, getSkillStatus } from "@/lib/roadmap-data";
import type { RoleRoadmap } from "@/lib/roadmap-data";
import { TechIcon, RoleIcon } from "@/components/roadmap/TechIcon";

interface RoleFlowChartProps {
  role: RoleRoadmap;
}

export function RoleFlowChart({ role }: RoleFlowChartProps) {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ds-feature-lighter text-ds-feature-dark text-xs font-bold border border-ds-feature-light">
              <RoleIcon role={role.slug} className="w-4 h-4" />
              <span>Career Path</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-ds-text-soft">
              {role.steps.length} Skills
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-ds-text-strong leading-tight">
            {role.title}
          </h1>
          <p className="text-base sm:text-lg text-ds-text-sub mt-2 max-w-2xl">
            {role.description}
          </p>
        </div>
      </section>

      {/* Flowchart */}
      <div className="max-w-2xl mx-auto">
        {role.steps.map((step, idx) => {
          const skill = getSkillRoadmap(step.skillSlug);
          const status = getSkillStatus(step.skillSlug);
          const isAvailable = status === "available";
          const isLast = idx === role.steps.length - 1;

          const hasAlternatives = step.alternatives && step.alternatives.length > 0;

          const nodeContent = (
            <div
              className={`group relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                isAvailable
                  ? "bg-ds-bg-white border-ds-stroke-soft hover:border-ds-feature-base hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                  : "bg-ds-bg-weak border-ds-stroke-soft border-dashed opacity-70 cursor-default"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Step number */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black ${
                  isAvailable
                    ? "bg-ds-feature-lighter text-ds-feature-dark"
                    : "bg-ds-bg-soft text-ds-text-disabled"
                }`}>
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Skill info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <TechIcon slug={step.skillSlug} className="w-5 h-5 shrink-0" />
                    <h3 className={`text-base font-bold ${
                      isAvailable
                        ? "text-ds-text-strong group-hover:text-ds-feature-base"
                        : "text-ds-text-disabled"
                    } transition-colors`}>
                      {step.skillTitle}
                    </h3>
                  </div>
                  <p className={`text-xs ${isAvailable ? "text-ds-text-sub" : "text-ds-text-disabled"}`}>
                    {skill?.description || ""}
                  </p>
                </div>

                {/* Right side */}
                <div className="flex-shrink-0 flex items-center gap-2">
                  {isAvailable ? (
                    <>
                      <span className={`hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${skill?.badgeColor || ""}`}>
                        {skill?.totalLessons || 0} Lessons
                      </span>
                      <svg className="w-4 h-4 text-ds-feature-base opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-ds-bg-soft text-ds-text-disabled border border-ds-stroke-soft">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>

              {/* Alternatives (e.g., Express.js OR NestJS) */}
              {hasAlternatives && (
                <div className="mt-3 pt-3 border-t border-ds-stroke-soft">
                  <span className="text-[10px] font-bold text-ds-text-soft uppercase tracking-wider">
                    Alternative:{" "}
                    {step.alternatives!.map((alt) => {
                      const altSkill = getSkillRoadmap(alt);
                      return altSkill?.title || alt;
                    }).join(", ")}
                  </span>
                </div>
              )}

              {/* Required badge */}
              {!step.required && (
                <div className="absolute -top-2 -right-2">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-ds-bg-weak text-ds-text-soft border border-ds-stroke-soft">
                    Optional
                  </span>
                </div>
              )}
            </div>
          );

          return (
            <div key={step.skillSlug}>
              {isAvailable ? (
                <Link href={`/roadmaps/${step.skillSlug}`}>{nodeContent}</Link>
              ) : (
                nodeContent
              )}

              {/* Connector arrow */}
              {!isLast && (
                <div className="flex justify-center py-2">
                  <div className="flex flex-col items-center">
                    <div className="w-px h-4 bg-ds-stroke-soft" />
                    <svg className="w-4 h-4 text-ds-stroke-sub" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
