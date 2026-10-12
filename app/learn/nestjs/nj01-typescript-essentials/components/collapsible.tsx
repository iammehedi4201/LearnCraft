"use client";

import { useState, ReactNode } from "react";

interface CollapsibleProps {
  title: string;
  children: ReactNode;
}

export function Collapsible({ title, children }: CollapsibleProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm font-bold text-ds-feature-base hover:text-ds-feature-dark flex items-center gap-1 transition-colors cursor-pointer"
      >
        {open ? "▼" : "▶"} {title}
      </button>
      {open && (
        <div className="mt-3 animate-in fade-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}
