"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SELECTION TOOLBAR COMPONENT
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Lightweight floating action button that appears right above selected
 * text in lesson pages, allowing users to quickly take a note.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useRef } from "react";
import { useRevision } from "@/context/revision-context";
import { usePathname } from "next/navigation";

export function SelectionToolbar(): JSX.Element | null {
  const { activeSelection, openNoteDialog, clearSelection } = useRevision();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Do not show the note-taking toolbar on the content improvement admin page
  // (text selection there is used for content block selection, not notes)
  if (pathname?.startsWith("/improve")) return null;

  if (!activeSelection) return null;

  const { rect } = activeSelection;

  // Calculate toolbar position with safety bounds
  const toolbarWidth = 140;
  const toolbarHeight = 40;

  // Center horizontally over selection
  let left = rect.left + rect.width / 2 - toolbarWidth / 2;
  // Position above selection if space permits, else below
  let top = rect.top - toolbarHeight - 10;

  // Check window bounds
  if (typeof window !== "undefined") {
    left = Math.max(16, Math.min(left, window.innerWidth - toolbarWidth - 16));
    if (top < 70) {
      top = rect.bottom + 10; // Place below if top navbar conflicts
    }
  }

  const handleAddNote = () => {
    openNoteDialog();
  };

  return (
    <div
      ref={toolbarRef}
      data-revision-ui="true"
      style={{
        position: "fixed",
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 9999,
      }}
      className="flex items-center gap-1 p-1 bg-ds-bg-white/95 backdrop-blur-xl border border-ds-stroke-soft rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-150 select-none pointer-events-auto"
    >
      {/* Primary Add Note Button */}
      <button
        onClick={handleAddNote}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white text-xs font-bold transition-all active:scale-95 shadow-md shadow-ds-feature-base/20 group"
        title="Take note on selection (N)"
      >
        <svg
          className="w-3.5 h-3.5 group-hover:rotate-6 transition-transform"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
        <span>Add Note</span>
      </button>

      {/* Dismiss Button */}
      <button
        onClick={clearSelection}
        className="p-1.5 rounded-xl text-ds-text-soft hover:text-ds-text-strong hover:bg-ds-bg-weak transition-colors"
        title="Dismiss"
      >
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
