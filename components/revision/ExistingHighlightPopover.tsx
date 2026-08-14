"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * EXISTING HIGHLIGHT POPOVER COMPONENT
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Contextual popover opened when a user clicks on an existing highlight
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
          <span className="text-xs">
            {(annotation.note || annotation.question) ? "📝 Note Attached" : "🖍️ Highlight"}
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

      {/* Question if exists */}
      {annotation.question && (
        <div className="p-2.5 rounded-xl bg-ds-feature-lighter/40 border border-ds-feature-light mb-2">
          <span className="text-[9px] font-black uppercase tracking-wider text-ds-feature-dark block mb-0.5">
            ❓ Recall Question:
          </span>
          <p className="text-xs text-ds-text-strong font-bold leading-relaxed">
            {annotation.question}
          </p>
        </div>
      )}

      {/* Note Content if exists */}
      {annotation.note && (
        <div className="p-2.5 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft mb-3">
          <span className="text-[9px] font-black uppercase tracking-wider text-ds-text-soft block mb-0.5">
            💡 Personal Note:
          </span>
          <p className="text-xs text-ds-text-strong leading-relaxed">
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
          className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-ds-bg-weak hover:bg-ds-bg-soft text-ds-text-strong text-[11px] font-bold border border-ds-stroke-soft transition-colors"
          title="Edit note"
        >
          <span>✏️</span>
          <span>{(annotation.note || annotation.question) ? "Edit" : "Note"}</span>
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-ds-bg-weak hover:bg-ds-bg-soft text-ds-text-strong text-[11px] font-bold border border-ds-stroke-soft transition-colors"
          title="Copy snippet"
        >
          <span>{copied ? "✓" : "📋"}</span>
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-ds-error-lighter hover:bg-ds-error-light text-ds-error-dark text-[11px] font-bold border border-ds-error-base/30 transition-colors"
          title="Remove highlight"
        >
          <span>🗑️</span>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
