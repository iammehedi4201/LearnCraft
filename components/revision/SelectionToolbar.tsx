"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SELECTION TOOLBAR COMPONENT
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Lightweight floating contextual toolbar that appears right above selected
 * text in lesson pages, styled strictly with LearnCraft design system tokens.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState, useRef } from "react";
import { useRevision } from "@/context/revision-context";
import { HighlightColor } from "@/types/revision";

const COLOR_OPTIONS: { key: HighlightColor; name: string; dotClass: string; bgClass: string }[] = [
  { key: "feature", name: "Feature Purple", dotClass: "bg-ds-feature-base", bgClass: "hover:bg-ds-feature-lighter" },
  { key: "away", name: "Amber Gold", dotClass: "bg-ds-away-base", bgClass: "hover:bg-ds-away-lighter" },
  { key: "highlighted", name: "Rose Pink", dotClass: "bg-ds-highlighted-base", bgClass: "hover:bg-ds-highlighted-lighter" },
  { key: "success", name: "Emerald Green", dotClass: "bg-ds-success-base", bgClass: "hover:bg-ds-success-lighter" },
  { key: "info", name: "Sky Blue", dotClass: "bg-ds-info-base", bgClass: "hover:bg-ds-info-lighter" },
];

export function SelectionToolbar(): JSX.Element | null {
  const { activeSelection, addHighlight, openNoteDialog, clearSelection } = useRevision();
  const [selectedColor, setSelectedColor] = useState<HighlightColor>("feature");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  if (!activeSelection) return null;

  const { rect } = activeSelection;

  // Calculate toolbar position with safety bounds
  const toolbarWidth = 240;
  const toolbarHeight = 44;

  // Center horizontally over selection
  let left = rect.left + rect.width / 2 - toolbarWidth / 2;
  // Position above selection if space permits, else below
  let top = rect.top - toolbarHeight - 12;

  // Check window bounds
  if (typeof window !== "undefined") {
    left = Math.max(16, Math.min(left, window.innerWidth - toolbarWidth - 16));
    if (top < 70) {
      top = rect.bottom + 12; // Place below if top navbar conflicts
    }
  }

  const handleHighlight = () => {
    addHighlight(selectedColor);
  };

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
      className="flex items-center gap-1.5 p-1.5 bg-ds-bg-white/95 backdrop-blur-xl border border-ds-stroke-soft rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-150 select-none pointer-events-auto"
    >
      {/* Primary Highlight Button */}
      <button
        onClick={handleHighlight}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white text-xs font-bold transition-all active:scale-95 shadow-md shadow-ds-feature-base/20 group"
        title="Highlight selection (H)"
      >
        <svg
          className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 11-6 6v3h3l6-6" />
          <path d="m22 7-3-3a2.83 2.83 0 0 0-4 0l-1.5 1.5 7 7 1.5-1.5a2.83 2.83 0 0 0 0-4Z" />
        </svg>
        <span>Highlight</span>
      </button>

      {/* Color Selector Trigger */}
      <div className="relative">
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="p-2 rounded-xl bg-ds-bg-weak hover:bg-ds-bg-soft border border-ds-stroke-soft text-ds-text-strong transition-all active:scale-95 flex items-center justify-center"
          title="Choose highlight color"
        >
          <span
            className={`w-3 h-3 rounded-full ${
              COLOR_OPTIONS.find((c) => c.key === selectedColor)?.dotClass || "bg-ds-feature-base"
            }`}
          />
        </button>

        {/* Color Popover Menu */}
        {showColorPicker && (
          <div className="absolute top-full mt-2 left-0 p-2 bg-ds-bg-white border border-ds-stroke-soft rounded-xl shadow-xl flex gap-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            {COLOR_OPTIONS.map((col) => (
              <button
                key={col.key}
                onClick={() => {
                  setSelectedColor(col.key);
                  setShowColorPicker(false);
                }}
                className={`w-6 h-6 rounded-lg ${col.dotClass} flex items-center justify-center transition-transform hover:scale-110 active:scale-90 ${
                  selectedColor === col.key ? "ring-2 ring-ds-feature-base ring-offset-2" : ""
                }`}
                title={col.name}
              >
                {selectedColor === col.key && (
                  <svg className="w-3 h-3 text-ds-static-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="2 6 4.5 8.5 10 3" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Add Note Button */}
      <button
        onClick={handleAddNote}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-ds-bg-weak hover:bg-ds-bg-soft text-ds-text-strong border border-ds-stroke-soft text-xs font-bold transition-all active:scale-95 group"
        title="Add personal note (N)"
      >
        <svg
          className="w-3.5 h-3.5 text-ds-icon-sub group-hover:text-ds-feature-base transition-colors"
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
        className="p-2 rounded-xl text-ds-text-soft hover:text-ds-text-strong hover:bg-ds-bg-weak transition-colors"
        title="Dismiss"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
