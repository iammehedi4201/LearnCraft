"use client";

import { useState } from "react";
import { ChevronDown, Sparkles, BookOpen, AlertTriangle, Scale } from "./icons";

interface CollapsibleDetailProps {
  title: string;
  subtitle?: string;
  badge?: string;
  type?: "deep-dive" | "comparison" | "mistakes" | "general";
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const TYPE_ICONS = {
  "deep-dive": Sparkles,
  comparison: Scale,
  mistakes: AlertTriangle,
  general: BookOpen,
};

export function CollapsibleDetail({
  title,
  subtitle,
  badge,
  type = "general",
  defaultOpen = false,
  children,
}: CollapsibleDetailProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const Icon = TYPE_ICONS[type] || BookOpen;

  return (
    <details
      open={isOpen}
      onToggle={(e) => setIsOpen(e.currentTarget.open)}
      className="group my-6 rounded-2xl border border-ds-stroke-soft bg-ds-bg-white transition-all shadow-sm overflow-hidden"
    >
      <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer select-none list-none text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-ds-feature-base">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-xl bg-ds-bg-weak text-ds-icon-sub group-hover:text-ds-icon-strong transition-colors">
            <Icon className="w-4 h-4 shrink-0" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-ds-text-strong group-hover:text-ds-feature-dark transition-colors">
                {title}
              </span>
              {badge && (
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-ds-bg-weak text-ds-text-soft border border-ds-stroke-soft">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-ds-text-sub mt-0.5 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-ds-text-soft shrink-0">
          <span className="hidden sm:inline text-[11px]">
            {isOpen ? "Collapse" : "Expand"}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-ds-feature-base" : "text-ds-text-disabled"
            }`}
          />
        </div>
      </summary>

      <div className="px-5 pb-5 pt-3 border-t border-ds-stroke-soft text-sm text-ds-text-sub leading-relaxed space-y-4">
        {children}
      </div>
    </details>
  );
}
