"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SECTION 1: Explore Learning Roadmaps (Role-Based Paths)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Clean, focused career path selection for Frontend, Backend, and Full-Stack.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import Link from "next/link";
import { ROLE_ROADMAPS } from "@/lib/roadmap-data";
import { RoleIcon } from "@/components/roadmap/TechIcon";

export function CoursePaths() {
  return (
    <section id="explore-roadmaps" className="pt-12 pb-4 lg:pt-16 lg:pb-6 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Role-Based Roadmaps
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Explore Learning Roadmaps
            </h2>
            <p className="text-base sm:text-lg text-gray-400 mt-2 leading-relaxed">
              Choose an engineering career path to master modern software development through production-tested milestones.
            </p>
          </div>

          <Link
            href="/roadmaps"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/10 text-xs font-bold transition-all self-start md:self-auto hover:border-purple-500/40"
          >
            <span>Browse All Roadmaps</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* 3 Role-Based Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ROLE_ROADMAPS.map((role) => {
            const availableStepCount = role.steps.filter(
              (st) =>
                st.skillSlug === "nestjs" ||
                st.skillSlug === "nextjs" ||
                st.skillSlug === "tanstack"
            ).length;

            return (
              <div
                key={role.id}
                className="group relative flex flex-col justify-between p-7 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <div>
                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[11px] font-bold">
                      <RoleIcon role={role.slug} className="w-4 h-4 text-purple-400" />
                      <span>Career Path</span>
                    </span>

                    <span className="text-[11px] font-semibold text-gray-400">
                      {role.steps.length} Skills Sequence
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-2xl font-black text-white tracking-tight mb-2 group-hover:text-purple-300 transition-colors">
                    {role.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                    {role.description}
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <div className="text-[11px] text-gray-400">
                    <strong className="text-purple-400 font-bold">
                      {availableStepCount}
                    </strong>{" "}
                    of {role.steps.length} skills live now
                  </div>

                  <Link
                    href={`/roadmaps/role/${role.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300 group-hover:gap-2 transition-all"
                  >
                    <span>View Roadmap</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
