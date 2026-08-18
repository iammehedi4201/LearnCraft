"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * EXISTING HIGHLIGHT POPOVER COMPONENT
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Contextual popover opened when a user clicks on an existing note/highlight
 * inside lesson content. Provides quick actions to edit notes, copy snippet,
 * or remove the annotation.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState } from "react";
import { useRevision } from "@/context/revision-context";

export function ExistingHighlightPopover(): JSX.Element | null {
  const {
    existingHighlightPopover,
    closeExistingHighlightPopover,
    openNoteDialog,
    deleteAnnotation,
  } = useRevision();

  const [copied, setCopied] = useState<boolean>(false);

  if (!existingHighlightPopover) return null;

  const { annotation, rect } = existingHighlightPopover;

  const popoverWidth = 280;
  let left = rect.left + rect.width / 2 - popoverWidth / 2;
  let top = rect.bottom + 8;

  if (typeof window !== "undefined") {
    left = Math.max(16, Math.min(left, window.innerWidth - popoverWidth - 16));
    if (top + 160 > window.innerHeight) {
      top = rect.top - 170;
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(annotation.selectedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditNote = () => {
    openNoteDialog(annotation);
  };

  const handleDelete = () => {
    deleteAnnotation(annotation.id);
  };

  return (
    <div
      data-revision-ui="true"
      style={{
        position: "fixed",
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 9999,
        width: `${popoverWidth}px`,
      }}
      className="bg-ds-bg-white border border-ds-stroke-soft rounded-2xl p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-ds-text-strong pointer-events-auto"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-ds-stroke-soft">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-ds-text-strong">
            {annotation.note ? "Saved Note" : "Saved Reference"}
          </span>
        </div>
        <button
          onClick={closeExistingHighlightPopover}
          className="text-ds-text-soft hover:text-ds-text-strong p-1 rounded-lg hover:bg-ds-bg-weak transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Note Content if exists */}
      {annotation.note && (
        <div className="p-2.5 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft mb-3">
          <span className="text-[9px] font-black uppercase tracking-wider text-ds-feature-dark block mb-0.5">
            Note Content:
          </span>
          <p className="text-xs text-ds-text-strong leading-relaxed line-clamp-3">
            {annotation.note}
          </p>
        </div>
      )}

      {/* Timestamp */}
      <div className="text-[10px] text-ds-text-soft mb-3 flex items-center gap-1">
        <span>Saved {new Date(annotation.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-3 gap-1.5">
        <button
          onClick={handleEditNote}
          className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white text-[11px] font-bold transition-colors"
          title="Edit note"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          <span>Edit</span>
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-ds-bg-weak hover:bg-ds-bg-soft text-ds-text-strong text-[11px] font-bold border border-ds-stroke-soft transition-colors"
          title="Copy snippet"
        >
          {copied ? (
            <svg className="w-3 h-3 text-ds-success-base" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m5 13 4 4L19 7"/></svg>
          ) : (
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-ds-error-lighter hover:bg-ds-error-light text-ds-error-dark text-[11px] font-bold border border-ds-error-base/30 transition-colors"
          title="Remove note"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
