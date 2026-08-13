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
        className="text-sm font-bold text-[#344b8f] dark:text-[#7f6fbe] hover:text-[#7b52ac] flex items-center gap-1 transition-colors"
      >
        {open ? "▼" : "▶"} {title}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}
