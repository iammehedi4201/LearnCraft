"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NOTE SIDEBAR — CLEAN DOCKED RIGHT NOTE PANEL
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Simple, user-friendly note editor with direct formatting options:
 * 1. Heading  — for questions, sections, topics (# ...)
 * 2. Bold     — for highlighting important text (**...**)
 * 3. Italic   — for quick inline emphasis (*...*)
 * 4. Example  — for real-world text examples, analogies, callouts (> ...)
 * 5. List     — for bulleted list items (- ...)
 * 6. Code     — for writing code examples (```ts or `code`)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState, useEffect, useRef } from "react";
import { useRevision } from "@/context/revision-context";
import { HighlightColor } from "@/types/revision";
import { MarkdownRenderer } from "./MarkdownRenderer";

type FormatAction = "heading" | "bold" | "italic" | "example" | "list" | "code";

interface OptionItem {
  id: FormatAction;
  label: string;
  icon: JSX.Element;
  title: string;
}

const FORMAT_OPTIONS: OptionItem[] = [
  {
    id: "heading",
    label: "Heading",
    title: "Heading / Question (# Heading)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M6 12h12" />
        <path d="M6 4v16" />
        <path d="M18 4v16" />
      </svg>
    ),
  },
  {
    id: "bold",
    label: "Bold",
    title: "Bold text (**bold**)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
        <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      </svg>
    ),
  },
  {
    id: "italic",
    label: "Italic",
    title: "Italic text for emphasis (*italic*)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="19" y1="4" x2="10" y2="4" />
        <line x1="14" y1="20" x2="5" y2="20" />
        <line x1="15" y1="4" x2="9" y2="20" />
      </svg>
    ),
  },
  {
    id: "example",
    label: "Example",
    title: "Text Example / Analogy Callout (> Example: ...)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7Z" />
        <line x1="9" y1="21" x2="15" y2="21" />
      </svg>
    ),
  },
  {
    id: "list",
    label: "List",
    title: "Bullet list (- item)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="9" y1="6" x2="20" y2="6" />
        <line x1="9" y1="12" x2="20" y2="12" />
        <line x1="9" y1="18" x2="20" y2="18" />
        <circle cx="4" cy="6" r="1.5" fill="currentColor" />
        <circle cx="4" cy="12" r="1.5" fill="currentColor" />
        <circle cx="4" cy="18" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "code",
    label: "Code",
    title: "Code example (```ts or `code`)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

// ─── Format Processor ──────────────────────────────────────────────────────
function applyFormatting(
  textarea: HTMLTextAreaElement,
  actionType: FormatAction
): { value: string; selStart: number; selEnd: number } {
  const ss = textarea.selectionStart;
  const se = textarea.selectionEnd;
  const value = textarea.value;
  const hasSelection = ss !== se;
  const selectedText = hasSelection ? value.slice(ss, se) : "";

  // 1. Heading
  if (actionType === "heading") {
    if (hasSelection) {
      const lineStart = value.lastIndexOf("\n", ss - 1) + 1;
      let lineEnd = value.indexOf("\n", se);
      if (lineEnd === -1) lineEnd = value.length;
      const block = value.slice(lineStart, lineEnd);
      const transformed = block
        .split("\n")
        .map((l) => `# ${l.replace(/^#{1,6}\s+/, "").replace(/^[-*+]\s+/, "")}`)
        .join("\n");
      const newVal = value.slice(0, lineStart) + transformed + value.slice(lineEnd);
      return { value: newVal, selStart: lineStart, selEnd: lineStart + transformed.length };
    } else {
      const lineStart = value.lastIndexOf("\n", ss - 1) + 1;
      let lineEnd = value.indexOf("\n", ss);
      if (lineEnd === -1) lineEnd = value.length;
      const line = value.slice(lineStart, lineEnd);
      const cleaned = line.replace(/^#{1,6}\s+/, "");
      const newVal = value.slice(0, lineStart) + `# ${cleaned}` + value.slice(lineEnd);
      return { value: newVal, selStart: lineStart + 2, selEnd: lineStart + 2 + cleaned.length };
    }
  }

  // 2. Bold (wraps in **bold**)
  if (actionType === "bold") {
    if (hasSelection) {
      const match = selectedText.match(/^(\s*)([\s\S]*?)(\s*)$/);
      const leading = match ? match[1] : "";
      const core = match ? match[2] : selectedText;
      const trailing = match ? match[3] : "";

      if (core.length === 0) return { value, selStart: ss, selEnd: se };

      if (core.startsWith("**") && core.endsWith("**") && core.length >= 4) {
        const unwrapped = core.slice(2, -2);
        const newVal = value.slice(0, ss) + leading + unwrapped + trailing + value.slice(se);
        return { value: newVal, selStart: ss, selEnd: ss + leading.length + unwrapped.length + trailing.length };
      }

      if (core.includes("\n\n")) {
        const transformed = core
          .split("\n\n")
          .map((p) => (p.trim() ? `**${p.trim()}**` : p))
          .join("\n\n");
        const newVal = value.slice(0, ss) + leading + transformed + trailing + value.slice(se);
        return { value: newVal, selStart: ss, selEnd: ss + leading.length + transformed.length + trailing.length };
      }

      const wrapped = `**${core}**`;
      const newVal = value.slice(0, ss) + leading + wrapped + trailing + value.slice(se);
      return { value: newVal, selStart: ss, selEnd: ss + leading.length + wrapped.length + trailing.length };
    } else {
      const placeholder = "**bold text**";
      const newVal = value.slice(0, ss) + placeholder + value.slice(se);
      return { value: newVal, selStart: ss + 2, selEnd: ss + 11 };
    }
  }

  // 3. Italic (wraps in *italic*)
  if (actionType === "italic") {
    if (hasSelection) {
      const match = selectedText.match(/^(\s*)([\s\S]*?)(\s*)$/);
      const leading = match ? match[1] : "";
      const core = match ? match[2] : selectedText;
      const trailing = match ? match[3] : "";

      if (core.length === 0) return { value, selStart: ss, selEnd: se };

      if (
        core.startsWith("*") &&
        core.endsWith("*") &&
        !core.startsWith("**") &&
        core.length >= 2
      ) {
        const unwrapped = core.slice(1, -1);
        const newVal = value.slice(0, ss) + leading + unwrapped + trailing + value.slice(se);
        return { value: newVal, selStart: ss, selEnd: ss + leading.length + unwrapped.length + trailing.length };
      }

      if (core.includes("\n\n")) {
        const transformed = core
          .split("\n\n")
          .map((p) => (p.trim() ? `*${p.trim()}*` : p))
          .join("\n\n");
        const newVal = value.slice(0, ss) + leading + transformed + trailing + value.slice(se);
        return { value: newVal, selStart: ss, selEnd: ss + leading.length + transformed.length + trailing.length };
      }

      const wrapped = `*${core}*`;
      const newVal = value.slice(0, ss) + leading + wrapped + trailing + value.slice(se);
      return { value: newVal, selStart: ss, selEnd: ss + leading.length + wrapped.length + trailing.length };
    } else {
      const placeholder = "*italic text*";
      const newVal = value.slice(0, ss) + placeholder + value.slice(se);
      return { value: newVal, selStart: ss + 1, selEnd: ss + 12 };
    }
  }

  // 4. Example / Analogy Callout (> ...)
  if (actionType === "example") {
    if (hasSelection) {
      const lineStart = value.lastIndexOf("\n", ss - 1) + 1;
      let lineEnd = value.indexOf("\n", se);
      if (lineEnd === -1) lineEnd = value.length;
      const block = value.slice(lineStart, lineEnd);
      const lines = block.split("\n");
      const allQuoted = lines.every((l) => l.trim() === "" || l.startsWith("> "));
      const transformed = lines
        .map((l) => {
          if (l.trim() === "") return l;
          if (allQuoted) {
            return l.replace(/^>\s*/, "");
          } else {
            return `> ${l.replace(/^>\s*/, "")}`;
          }
        })
        .join("\n");
      const newVal = value.slice(0, lineStart) + transformed + value.slice(lineEnd);
      return { value: newVal, selStart: lineStart, selEnd: lineStart + transformed.length };
    } else {
      const template = "> 💡 Example:\n> Write your real-world example or explanation here...";
      const newVal = value.slice(0, ss) + template + value.slice(se);
      return { value: newVal, selStart: ss + 14, selEnd: ss + template.length };
    }
  }

  // 5. List (adds/toggles - for all lines)
  if (actionType === "list") {
    if (hasSelection) {
      const lineStart = value.lastIndexOf("\n", ss - 1) + 1;
      let lineEnd = value.indexOf("\n", se);
      if (lineEnd === -1) lineEnd = value.length;
      const block = value.slice(lineStart, lineEnd);
      const lines = block.split("\n");
      const allListed = lines.every((l) => l.trim() === "" || l.startsWith("- "));
      const transformed = lines
        .map((l) => {
          if (l.trim() === "") return l;
          if (allListed) {
            return l.replace(/^- \s*/, "");
          } else {
            return `- ${l.replace(/^[-*+]\s+/, "").replace(/^\d+\.\s+/, "").replace(/^#{1,6}\s+/, "")}`;
          }
        })
        .join("\n");
      const newVal = value.slice(0, lineStart) + transformed + value.slice(lineEnd);
      return { value: newVal, selStart: lineStart, selEnd: lineStart + transformed.length };
    } else {
      const lineStart = value.lastIndexOf("\n", ss - 1) + 1;
      let lineEnd = value.indexOf("\n", ss);
      if (lineEnd === -1) lineEnd = value.length;
      const line = value.slice(lineStart, lineEnd);
      if (line.startsWith("- ")) {
        const newVal = value.slice(0, lineStart) + line.slice(2) + value.slice(lineEnd);
        return { value: newVal, selStart: Math.max(lineStart, ss - 2), selEnd: Math.max(lineStart, ss - 2) };
      } else {
        const newVal = value.slice(0, lineStart) + "- " + line + value.slice(lineEnd);
        return { value: newVal, selStart: ss + 2, selEnd: ss + 2 };
      }
    }
  }

  // 6. Code (formats multi-line into ```ts codeblocks, or single-line/inline into `code`)
  if (actionType === "code") {
    if (hasSelection) {
      if (selectedText.includes("\n")) {
        const cleaned = selectedText.replace(/^```[a-z]*\n?/i, "").replace(/\n?```$/i, "");
        const block = `\`\`\`ts\n${cleaned.trim()}\n\`\`\``;
        const newVal = value.slice(0, ss) + block + value.slice(se);
        return { value: newVal, selStart: ss, selEnd: ss + block.length };
      } else {
        const cleaned = selectedText.replace(/^`+|`+$/g, "");
        const block = `\`${cleaned}\``;
        const newVal = value.slice(0, ss) + block + value.slice(se);
        return { value: newVal, selStart: ss, selEnd: ss + block.length };
      }
    } else {
      const lineStart = value.lastIndexOf("\n", ss - 1) + 1;
      let lineEnd = value.indexOf("\n", ss);
      if (lineEnd === -1) lineEnd = value.length;
      const line = value.slice(lineStart, lineEnd);
      if (line.trim().length > 0) {
        const cleaned = line.replace(/^`+|`+$/g, "");
        const block = `\`${cleaned}\``;
        const newVal = value.slice(0, lineStart) + block + value.slice(lineEnd);
        return { value: newVal, selStart: lineStart, selEnd: lineStart + block.length };
      } else {
        const template = "```ts\n// write code here\n```";
        const newVal = value.slice(0, ss) + template + value.slice(se);
        return { value: newVal, selStart: ss + 6, selEnd: ss + 24 };
      }
    }
  }

  return { value, selStart: ss, selEnd: se };
}

// ─── Component ────────────────────────────────────────────────────────────
export function NoteDialog(): JSX.Element | null {
  const { isNoteDialogOpen, closeNoteDialog, editingAnnotation, saveNote } = useRevision();

  const [noteText, setNoteText] = useState<string>("");
  const [selectedColor] = useState<HighlightColor>("feature");
  const [editorMode, setEditorMode] = useState<"edit" | "preview">("edit");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync state when panel opens
  useEffect(() => {
    if (isNoteDialogOpen) {
      setNoteText(editingAnnotation?.note || "");
      setEditorMode("edit");
      setTimeout(() => textareaRef.current?.focus(), 80);
    }
  }, [isNoteDialogOpen, editingAnnotation]);

  if (!isNoteDialogOpen) return null;

  const handleSave = () => saveNote(noteText.trim(), selectedColor);

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSave();
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      closeNoteDialog();
      return;
    }

    // Ctrl+B shortcut for Bold
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
      if (textareaRef.current) {
        e.preventDefault();
        const result = applyFormatting(textareaRef.current, "bold");
        setNoteText(result.value);
        requestAnimationFrame(() => {
          textareaRef.current?.focus();
          textareaRef.current?.setSelectionRange(result.selStart, result.selEnd);
        });
      }
    }

    // Ctrl+I shortcut for Italic
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "i") {
      if (textareaRef.current) {
        e.preventDefault();
        const result = applyFormatting(textareaRef.current, "italic");
        setNoteText(result.value);
        requestAnimationFrame(() => {
          textareaRef.current?.focus();
          textareaRef.current?.setSelectionRange(result.selStart, result.selEnd);
        });
      }
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const ta = textareaRef.current!;
      const ss = ta.selectionStart;
      const se = ta.selectionEnd;
      const next = noteText.slice(0, ss) + "  " + noteText.slice(se);
      setNoteText(next);
      requestAnimationFrame(() => {
        ta.setSelectionRange(ss + 2, ss + 2);
      });
    }
  };

  const handleFormatClick = (action: FormatAction) => {
    if (!textareaRef.current) return;
    const result = applyFormatting(textareaRef.current, action);
    setNoteText(result.value);
    setEditorMode("edit");
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(result.selStart, result.selEnd);
    });
  };

  return (
    <aside
      data-revision-ui="true"
      className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] md:w-[480px] lg:w-[500px] z-[9999] bg-ds-bg-white border-l border-ds-stroke-soft shadow-2xl flex flex-col pointer-events-auto animate-in slide-in-from-right duration-200 text-ds-text-strong select-none"
      role="complementary"
      aria-label={editingAnnotation ? "Edit Note" : "Add Note"}
    >
      {/* ── Top Header ── */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-ds-stroke-soft bg-ds-bg-weak/40 shrink-0 select-none">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-ds-feature-lighter border border-ds-feature-light/50 flex items-center justify-center text-ds-feature-dark">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-ds-text-strong">
            {editingAnnotation ? "Edit Note" : "Add Note"}
          </h3>
        </div>
        <button
          onClick={closeNoteDialog}
          className="w-7 h-7 rounded-lg bg-ds-bg-soft hover:bg-ds-bg-sub text-ds-text-soft hover:text-ds-text-strong flex items-center justify-center transition-colors"
          aria-label="Close note panel"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* ── Body: Toolbar & Editor ── */}
      <div className="flex-1 overflow-hidden p-4 flex flex-col gap-3 min-h-0">
        {/* Edit / Preview Tabs */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center bg-ds-bg-soft border border-ds-stroke-soft rounded-xl p-0.5 gap-0.5">
            <button
              type="button"
              onClick={() => setEditorMode("edit")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                editorMode === "edit"
                  ? "bg-ds-bg-white text-ds-text-strong shadow-sm border border-ds-stroke-soft"
                  : "text-ds-text-sub hover:text-ds-text-strong"
              }`}
            >
              <svg className="w-3.5 h-3.5 text-ds-feature-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <span>Edit</span>
            </button>
            <button
              type="button"
              onClick={() => setEditorMode("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                editorMode === "preview"
                  ? "bg-ds-bg-white text-ds-text-strong shadow-sm border border-ds-stroke-soft"
                  : "text-ds-text-sub hover:text-ds-text-strong"
              }`}
            >
              <svg className="w-3.5 h-3.5 text-ds-feature-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>Preview</span>
            </button>
          </div>
          {noteText.trim() && editorMode === "edit" && (
            <span className="text-[10px] text-ds-text-disabled font-mono">
              {noteText.length} chars
            </span>
          )}
        </div>

        {/* Editor Container */}
        <div className="flex-1 flex flex-col rounded-xl border border-ds-stroke-soft overflow-hidden focus-within:border-ds-feature-base focus-within:ring-2 focus-within:ring-ds-feature-base/10 transition-all bg-ds-bg-white min-h-0">
          {/* Formatting Buttons (Edit mode only) */}
          {editorMode === "edit" && (
            <div className="flex items-center gap-1.5 px-3 py-2 bg-ds-bg-weak border-b border-ds-stroke-soft flex-wrap shrink-0">
              {FORMAT_OPTIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  title={item.title}
                  onMouseDown={(e) => {
                    // Prevent button click from taking focus and resetting textarea selection
                    e.preventDefault();
                  }}
                  onClick={() => handleFormatClick(item.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-ds-bg-white hover:bg-ds-bg-soft text-ds-text-strong border border-ds-stroke-soft text-xs font-semibold active:scale-95 transition-all shadow-sm"
                >
                  <span className="text-ds-feature-dark">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Textarea */}
          {editorMode === "edit" && (
            <textarea
              ref={textareaRef}
              id="note-editor-textarea"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              onKeyDown={handleTextareaKeyDown}
              placeholder={"Write your note here...\n\nSelect any text and click Heading, Bold, Italic, Example, List, or Code to format instantly."}
              className="flex-1 w-full p-4 bg-transparent outline-none text-xs sm:text-[13px] text-ds-text-strong placeholder:text-ds-text-disabled font-mono resize-none leading-relaxed overflow-y-auto"
              spellCheck
            />
          )}

          {/* Preview Container */}
          {editorMode === "preview" && (
            <div className="flex-1 overflow-y-auto p-4 bg-ds-bg-white">
              {noteText.trim() ? (
                <MarkdownRenderer content={noteText} />
              ) : (
                <p className="text-xs text-ds-text-disabled italic">
                  Write something in Edit mode to preview your formatted note.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Footer Actions ── */}
      <div className="p-4 border-t border-ds-stroke-soft bg-ds-bg-weak/30 flex items-center justify-end gap-2 shrink-0">
        <button
          type="button"
          onClick={closeNoteDialog}
          className="px-4 py-2 rounded-xl bg-ds-bg-soft hover:bg-ds-bg-sub text-ds-text-strong font-bold text-xs transition-all border border-ds-stroke-soft active:scale-95"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2 rounded-xl bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white font-bold text-xs transition-all shadow-md shadow-ds-feature-base/20 active:scale-95 flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="m5 13 4 4L19 7" />
          </svg>
          <span>Save Note</span>
        </button>
      </div>
    </aside>
  );
}
