"use client";

/**
 * RoadmapNode — A single lesson node in the visual roadmap.
 * Supports states: not-started, completed, current, coming-soon.
 */

import Link from "next/link";

export type NodeStatus = "not-started" | "completed" | "current" | "coming-soon";

interface RoadmapNodeProps {
  code: string;
  name: string;
  path: string;
  desc: string;
  estimatedMinutes?: number;
  status: NodeStatus;
  isLast?: boolean;
}

const statusConfig: Record<NodeStatus, {
  icon: JSX.Element;
  borderClass: string;
  bgClass: string;
  textClass: string;
  dotClass: string;
}> = {
  completed: {
    icon: (
      <svg className="w-4 h-4 text-ds-success-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    borderClass: "border-ds-success-light",
    bgClass: "bg-ds-success-lighter",
    textClass: "text-ds-success-dark",
    dotClass: "bg-ds-success-base",
  },
  current: {
    icon: (
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ds-feature-base opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-ds-feature-base" />
      </span>
    ),
    borderClass: "border-ds-feature-base ring-2 ring-ds-feature-base/20",
    bgClass: "bg-ds-feature-lighter",
    textClass: "text-ds-feature-dark",
    dotClass: "bg-ds-feature-base",
  },
  "not-started": {
    icon: (
      <div className="w-3 h-3 rounded-full border-2 border-ds-stroke-sub" />
    ),
    borderClass: "border-ds-stroke-soft",
    bgClass: "bg-ds-bg-white",
    textClass: "text-ds-text-sub",
    dotClass: "bg-ds-stroke-sub",
  },
  "coming-soon": {
    icon: (
      <div className="w-3 h-3 rounded-full bg-ds-bg-soft" />
    ),
    borderClass: "border-ds-stroke-soft border-dashed",
    bgClass: "bg-ds-bg-weak",
    textClass: "text-ds-text-disabled",
    dotClass: "bg-ds-bg-soft",
  },
};

export function RoadmapNode({
  code,
  name,
  path,
  desc,
  estimatedMinutes,
  status,
  isLast = false,
}: RoadmapNodeProps) {
  const config = statusConfig[status];
  const isClickable = status !== "coming-soon";

  const content = (
    <div
      className={`group relative flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 ${config.borderClass} ${config.bgClass} ${
        isClickable
          ? "hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
          : "opacity-60 cursor-default"
      }`}
    >
      {/* Status indicator */}
      <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center">
        {config.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${config.textClass}`}>
            {code}
          </span>
          {estimatedMinutes && status !== "coming-soon" && (
            <span className="text-[10px] text-ds-text-soft flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {estimatedMinutes}m
            </span>
          )}
          {status === "coming-soon" && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-ds-text-disabled bg-ds-bg-soft px-2 py-0.5 rounded-full">
              Coming Soon
            </span>
          )}
        </div>
        <h4 className={`text-sm font-bold leading-tight ${
          status === "coming-soon" ? "text-ds-text-disabled" : "text-ds-text-strong group-hover:text-ds-feature-base"
        } transition-colors`}>
          {name}
        </h4>
        <p className={`text-xs mt-1 leading-relaxed line-clamp-2 ${
          status === "coming-soon" ? "text-ds-text-disabled" : "text-ds-text-sub"
        }`}>
          {desc}
        </p>
      </div>

      {/* Arrow indicator for clickable nodes */}
      {isClickable && (
        <div className="flex-shrink-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-4 h-4 text-ds-feature-base" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      )}
    </div>
  );

  // Connector line between nodes
  const connector = !isLast ? (
    <div className="flex justify-center py-1">
      <div className={`w-px h-6 ${
        status === "completed" ? "bg-ds-success-light" : "bg-ds-stroke-soft"
      }`} />
    </div>
  ) : null;

  if (isClickable) {
    return (
      <>
        <Link href={path}>{content}</Link>
        {connector}
      </>
    );
  }

  return (
    <>
      {content}
      {connector}
    </>
  );
}
