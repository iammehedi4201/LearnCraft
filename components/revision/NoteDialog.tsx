"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NOTE DIALOG COMPONENT
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Modal dialog for attaching or editing personal explanations and memory hooks
 * on highlighted lesson content, strictly following the LearnCraft design system.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState, useEffect, useRef } from "react";
import { useRevision } from "@/context/revision-context";
import { HighlightColor } from "@/types/revision";

export function NoteDialog(): JSX.Element | null {
  const {
    isNoteDialogOpen,
    closeNoteDialog,
    editingAnnotation,
    activeSelection,
    saveNote,
  } = useRevision();

  const [questionText, setQuestionText] = useState<string>("");
  const [noteText, setNoteText] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<HighlightColor>("feature");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync dialog data when opened
  useEffect(() => {
    if (isNoteDialogOpen) {
      if (editingAnnotation) {
        setQuestionText(editingAnnotation.question || "");
        setNoteText(editingAnnotation.note || "");
        setSelectedColor(editingAnnotation.color || "feature");
      } else {
        setQuestionText("");
        setNoteText("");
        setSelectedColor("feature");
      }
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    }
  }, [isNoteDialogOpen, editingAnnotation]);

  if (!isNoteDialogOpen) return null;

  const quoteText = editingAnnotation ? editingAnnotation.selectedText : activeSelection?.text || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveNote(noteText.trim(), selectedColor, questionText.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    } else if (e.key === "Escape") {
      closeNoteDialog();
    }
  };

  return (
    <div
      data-revision-ui="true"
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-ds-overlay backdrop-blur-sm animate-in fade-in duration-200 pointer-events-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeNoteDialog();
      }}
    >
      <div
        className="w-full max-w-lg bg-ds-bg-white border border-ds-stroke-soft rounded-xl p-6 sm:p-7 shadow-2xl shadow-black/10 animate-in zoom-in-95 duration-200 flex flex-col gap-5 text-ds-text-strong"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ds-stroke-soft pb-3">
          <div className="flex items-center gap-2">
            <span className="text-base">📝</span>
            <h3 className="text-base font-bold text-ds-text-strong font-display">
              {editingAnnotation ? "Edit Note" : "Add Note"}
            </h3>
          </div>
          <button
            onClick={closeNoteDialog}
            className="w-7 h-7 rounded-md bg-ds-bg-weak hover:bg-ds-bg-soft text-ds-text-soft hover:text-ds-text-strong flex items-center justify-center transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Selected Quote */}
        {quoteText && (
          <div className="bg-ds-bg-weak border-l-4 border-ds-feature-base rounded-r-lg p-3 max-h-28 overflow-y-auto">
            <p className="text-xs text-ds-text-strong italic leading-relaxed line-clamp-3">
              "{quoteText}"
            </p>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Question Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-ds-text-sub">
              Question
            </label>
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a question for flashcard practice..."
              className="w-full px-3.5 py-2 rounded-lg bg-ds-bg-weak border border-ds-stroke-soft focus:border-ds-feature-base focus:ring-1 focus:ring-ds-feature-base/20 outline-none text-xs text-ds-text-strong placeholder:text-ds-text-disabled transition-all"
            />
          </div>

          {/* Note Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-ds-text-sub">
              Note
            </label>
            <textarea
              ref={textareaRef}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write your explanation or takeaway..."
              rows={3}
              className="w-full px-3.5 py-2 rounded-lg bg-ds-bg-weak border border-ds-stroke-soft focus:border-ds-feature-base focus:ring-1 focus:ring-ds-feature-base/20 outline-none text-xs text-ds-text-strong placeholder:text-ds-text-disabled transition-all resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-ds-stroke-soft mt-1">
            <button
              type="button"
              onClick={closeNoteDialog}
              className="px-3.5 py-2 rounded-lg bg-ds-bg-soft hover:bg-ds-bg-sub text-ds-text-strong font-bold text-xs transition-all border border-ds-stroke-soft active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white font-bold text-xs transition-all shadow-md shadow-ds-feature-base/20 active:scale-95"
            >
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
