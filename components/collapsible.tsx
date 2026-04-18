"use client";

import { useState } from "react";

export function Collapsible({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
      >
        {open ? "▼" : "▶"} {title}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}
