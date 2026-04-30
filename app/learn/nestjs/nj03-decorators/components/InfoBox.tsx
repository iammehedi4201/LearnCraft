"use client";

import { ReactNode } from "react";

interface InfoBoxProps {
  variant?: "info" | "warning" | "danger" | "success" | "amber";
  title?: string;
  icon?: string;
  children: ReactNode;
  className?: string;
}

const variantStyles = {
  info: "bg-sky-500/5 border-sky-200/50 dark:border-sky-500/15",
  warning: "bg-amber-500/5 border-amber-500/10",
  danger: "bg-red-500/5 border-red-200/50 dark:border-red-500/20",
  success: "bg-emerald-500/5 border-emerald-500/10",
  amber: "bg-amber-500/5 border-amber-500/10",
};

const titleStyles = {
  info: "text-sky-700 dark:text-sky-400",
  warning: "text-amber-700 dark:text-amber-400",
  danger: "text-red-600",
  success: "text-emerald-700 dark:text-emerald-400",
  amber: "text-amber-700 dark:text-amber-400",
};

export function InfoBox({
  variant = "info",
  title,
  icon,
  children,
  className = "",
}: InfoBoxProps) {
  return (
    <div className={`p-5 rounded-2xl border ${variantStyles[variant]} ${className}`}>
      {title && (
        <h3 className={`font-bold text-base ${titleStyles[variant]} mb-2`}>
          {icon && <span className="mr-1">{icon}</span>}
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
