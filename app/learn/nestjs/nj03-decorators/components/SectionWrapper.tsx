"use client";

import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
}

export function SectionWrapper({ children }: SectionWrapperProps) {
  return (
    <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
      {children}
    </div>
  );
}
