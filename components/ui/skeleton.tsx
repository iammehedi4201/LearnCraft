"use client";

import React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * Base primitive shimmer element for LearnCraft.
 * Adapts to dark/light modes and matches DashboardSkeleton's aesthetic tokens.
 */
export function Skeleton({ className = "", ...props }: SkeletonProps): JSX.Element {
  return (
    <div
      className={`animate-pulse rounded-md bg-white/[0.06] dark:bg-white/[0.06] bg-neutral-200/70 ${className}`}
      {...props}
    />
  );
}

export interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lineHeight?: string;
  lastLineWidth?: string;
}

/**
 * Generates natural paragraph-like shimmers with varying line widths
 */
export function SkeletonText({
  lines = 3,
  className = "space-y-2",
  lineHeight = "h-3.5",
  lastLineWidth = "w-3/5",
}: SkeletonTextProps): JSX.Element {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, i) => {
        const isLast = i === lines - 1;
        const widthClass = isLast
          ? lastLineWidth
          : i % 2 === 0
          ? "w-full"
          : "w-11/12";
        return (
          <Skeleton
            key={i}
            className={`${lineHeight} ${widthClass} rounded`}
          />
        );
      })}
    </div>
  );
}

export interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Container card matching LearnCraft's dark glassmorphic cards:
 * bg-[#0E121B] border-white/[0.08]
 */
export function SkeletonCard({
  className = "",
  children,
  ...props
}: SkeletonCardProps): JSX.Element {
  return (
    <div
      className={`rounded-2xl sm:rounded-3xl bg-[#0E121B] border border-white/[0.08] p-5 sm:p-6 backdrop-blur-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface SkeletonBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "default" | "purple";
}

/**
 * Small pill badge skeleton matching lesson codes and track badges
 */
export function SkeletonBadge({
  className = "",
  variant = "default",
  ...props
}: SkeletonBadgeProps): JSX.Element {
  const colorStyles =
    variant === "purple"
      ? "bg-purple-500/15 border-purple-500/25"
      : "bg-white/[0.08] border-white/[0.06]";

  return (
    <div
      className={`h-5 sm:h-6 rounded-full border animate-pulse inline-flex items-center ${colorStyles} ${className}`}
      {...props}
    />
  );
}

export interface SkeletonButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "default" | "primary" | "secondary";
}

/**
 * Button skeleton matching LearnCraft's interactive CTA buttons
 */
export function SkeletonButton({
  className = "",
  variant = "default",
  ...props
}: SkeletonButtonProps): JSX.Element {
  let variantClass = "bg-white/[0.06] border-white/[0.08]";
  if (variant === "primary") {
    variantClass = "bg-purple-600/30 border-purple-500/30 shadow-lg shadow-purple-600/10";
  } else if (variant === "secondary") {
    variantClass = "bg-white/[0.04] border-white/[0.06]";
  }

  return (
    <div
      className={`h-10 sm:h-11 rounded-xl border animate-pulse ${variantClass} ${className}`}
      {...props}
    />
  );
}

export interface SkeletonCodeBlockProps {
  lines?: number;
  className?: string;
}

/**
 * Code block wireframe with macOS/terminal window dots and indented code shimmers
 */
export function SkeletonCodeBlock({
  lines = 5,
  className = "",
}: SkeletonCodeBlockProps): JSX.Element {
  const lineIndents = ["w-3/4", "w-1/2 ml-4", "w-2/3 ml-4", "w-1/3 ml-8", "w-3/5 ml-4", "w-1/4"];

  return (
    <div
      className={`rounded-2xl bg-black/60 border border-white/[0.08] p-4 font-mono text-xs overflow-hidden ${className}`}
    >
      {/* Fake header with window dots */}
      <div className="flex items-center gap-1.5 pb-3 mb-3 border-b border-white/[0.06]">
        <div className="w-2.5 h-2.5 rounded-full bg-white/[0.1]" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/[0.1]" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/[0.1]" />
        <div className="w-20 h-2.5 rounded bg-white/[0.05] ml-2" />
      </div>

      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-4 text-[10px] text-white/[0.15] select-none text-right font-mono">
              {i + 1}
            </span>
            <Skeleton
              className={`h-3 rounded ${lineIndents[i % lineIndents.length]}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
