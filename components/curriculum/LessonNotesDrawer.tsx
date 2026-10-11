"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import {
  getNoteForLesson,
  upsertNote,
  deleteNote,
  syncNotesWithCloud,
} from "@/lib/notes-bookmarks";
import { MarkdownRenderer } from "@/components/revision/MarkdownRenderer";

interface LessonNotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  trackKey: string;
  trackTitle: string;
  lessonSlug: string;
  lessonTitle: string;
  activeSectionId?: string;
  activeSectionLabel?: string;
}

const SUPPORTED_CODE_LANGUAGES = [
  { value: "typescript", label: "TypeScript (ts/tsx)" },
  { value: "javascript", label: "JavaScript (js/jsx)" },
  { value: "python", label: "Python" },
  { value: "sql", label: "SQL" },
  { value: "html", label: "HTML / CSS" },
  { value: "json", label: "JSON" },
  { value: "bash", label: "Bash / Terminal" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
];

/**
 * Safely format code blocks inside a Markdown document without risking corruption.
 */
function formatCodeBlocksInDocument(markdown: string): string {
  if (!markdown) return markdown;
  return markdown.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)\n```/g, (match, lang, code) => {
    try {
      const trimmedLang = (lang || "").toLowerCase();
      if (trimmedLang === "json") {
        const parsed = JSON.parse(code);
        return `\`\`\`${lang}\n${JSON.stringify(parsed, null, 2)}\n\`\`\``;
      }
      // Indentation formatter for JavaScript / TypeScript / general code
      const lines = code.split("\n");
      let indentLevel = 0;
      const formatted = lines.map((line: string) => {
        const trimmed = line.trim();
        if (!trimmed) return "";
        if (trimmed.startsWith("}") || trimmed.startsWith("]") || trimmed.startsWith(")")) {
          indentLevel = Math.max(0, indentLevel - 1);
        }
        const pad = "  ".repeat(indentLevel);
        if (trimmed.endsWith("{") || trimmed.endsWith("[") || trimmed.endsWith("(")) {
          indentLevel++;
        }
        return pad + trimmed;
      });
      return `\`\`\`${lang}\n${formatted.join("\n")}\n\`\`\``;
    } catch {
      return match; // Safe fallback: preserve original code
    }
  });
}

export function LessonNotesDrawer({
  isOpen,
  onClose,
  trackKey,
  trackTitle,
  lessonSlug,
  lessonTitle,
  activeSectionId,
  activeSectionLabel,
}: LessonNotesDrawerProps) {
  // Continuous Document Note Content
  const [content, setContent] = useState<string>("");
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);

  // Editor View Mode: "write" | "preview"
  const [mode, setMode] = useState<"write" | "preview">("write");

  // Save Status
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error">("saved");

  // Popover state for "+ Code" language picker
  const [isCodeMenuOpen, setIsCodeMenuOpen] = useState<boolean>(false);
  const codeMenuRef = useRef<HTMLDivElement | null>(null);

  // Popover state for "List" type picker
  const [isListMenuOpen, setIsListMenuOpen] = useState<boolean>(false);
  const listMenuRef = useRef<HTMLDivElement | null>(null);

  // Textarea reference for cursor-anchored insertions & Tab key handling
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const latestContentRef = useRef<string>("");
  latestContentRef.current = content;

  // ─── Load Note on Drawer Open / Lesson Change ──────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    const existingNote = getNoteForLesson(trackKey, lessonSlug);
    if (existingNote) {
      setCurrentNoteId(existingNote.id);
      setContent(existingNote.content || "");
    } else {
      setCurrentNoteId(null);
      setContent("");
    }

    setMode("write");
    setSaveStatus("saved");
    setIsCodeMenuOpen(false);
    setIsListMenuOpen(false);

    // Initial background cloud sync
    syncNotesWithCloud();
  }, [isOpen, trackKey, lessonSlug]);

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (codeMenuRef.current && !codeMenuRef.current.contains(e.target as Node)) {
        setIsCodeMenuOpen(false);
      }
      if (listMenuRef.current && !listMenuRef.current.contains(e.target as Node)) {
        setIsListMenuOpen(false);
      }
    }
    if (isCodeMenuOpen || isListMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isCodeMenuOpen, isListMenuOpen]);

  // ─── Debounced Autosave Engine ─────────────────────────────────────────────
  const triggerAutoSave = (newContent: string) => {
    setSaveStatus("saving");

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      saveNoteToStorage(newContent);
    }, 500);
  };

  const saveNoteToStorage = (contentToSave: string) => {
    try {
      if (contentToSave.trim().length > 0) {
        const saved = upsertNote({
          id: currentNoteId || undefined,
          trackKey,
          lessonSlug,
          sectionId: activeSectionId,
          lessonPath: `/learn/${trackKey}/${lessonSlug}`,
          title: `Notes: ${lessonTitle}`,
          content: contentToSave,
        });
        setCurrentNoteId(saved.id);
        setSaveStatus("saved");
      } else if (currentNoteId) {
        deleteNote(currentNoteId);
        setCurrentNoteId(null);
        setSaveStatus("saved");
      } else {
        setSaveStatus("saved");
      }
    } catch (err) {
      console.error("Auto-save error:", err);
      setSaveStatus("error");
    }
  };

  const handleClose = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      saveNoteToStorage(latestContentRef.current);
    }
    onClose();
  };

  const handleTextChange = (value: string) => {
    setContent(value);
    triggerAutoSave(value);
  };

  // ─── Contextual Insertion Tools ───────────────────────────────────────────
  const insertTextAtCursor = (
    prefix: string,
    placeholder: string = "",
    suffix: string = ""
  ) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      const updated = content + prefix + placeholder + suffix;
      handleTextChange(updated);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);

    const textToInsert = selected || placeholder;
    const replacement = prefix + textToInsert + suffix;
    const nextContent = content.substring(0, start) + replacement + content.substring(end);

    handleTextChange(nextContent);

    // Restore cursor position inside the inserted block
    setTimeout(() => {
      textarea.focus();
      const selectionStart = start + prefix.length;
      const selectionEnd = selectionStart + textToInsert.length;
      textarea.setSelectionRange(selectionStart, selectionEnd);
    }, 30);
  };

  // 1. Insert Q&A Section at cursor
  const handleInsertQA = () => {
    const textarea = textareaRef.current;
    const prefix = textarea && textarea.selectionStart > 0 && !content.slice(0, textarea.selectionStart).endsWith("\n\n")
      ? "\n\n"
      : "";

    insertTextAtCursor(
      prefix + "**Question:** ",
      "What is dependency injection?",
      "\n**Answer:** Dependency injection is a technique where a class receives its dependencies from outside instead of creating them itself.\n\n"
    );
  };

  // 2. Insert Code Block at cursor
  const handleInsertCodeBlock = (lang: string) => {
    setIsCodeMenuOpen(false);
    const textarea = textareaRef.current;
    const prefix = textarea && textarea.selectionStart > 0 && !content.slice(0, textarea.selectionStart).endsWith("\n\n")
      ? "\n\n"
      : "";

    insertTextAtCursor(
      `${prefix}\`\`\`${lang}\n`,
      "// Write or paste code snippet here",
      "\n```\n\n"
    );
  };

  // 3. Format all code blocks in the document
  const handleFormatAllCode = () => {
    const formatted = formatCodeBlocksInDocument(content);
    handleTextChange(formatted);
  };

  // Keyboard shortcut: Tab indents 2 spaces, Esc closes drawer
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      if (!e.shiftKey) {
        // Tab: insert 2 spaces
        const updated = content.substring(0, start) + "  " + content.substring(end);
        handleTextChange(updated);
        setTimeout(() => {
          textarea.setSelectionRange(start + 2, start + 2);
        }, 0);
      } else {
        // Shift+Tab: remove up to 2 leading spaces
        if (start >= 2 && content.substring(start - 2, start) === "  ") {
          const updated = content.substring(0, start - 2) + content.substring(start);
          handleTextChange(updated);
          setTimeout(() => {
            textarea.setSelectionRange(start - 2, start - 2);
          }, 0);
        }
      }
    }
  };

  // Close drawer on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isCodeMenuOpen) {
          setIsCodeMenuOpen(false);
        } else if (isListMenuOpen) {
          setIsListMenuOpen(false);
        } else {
          handleClose();
        }
      }
    };
    window.addEventListener("keydown", onGlobalKeyDown);
    return () => window.removeEventListener("keydown", onGlobalKeyDown);
  }, [isOpen, isCodeMenuOpen, isListMenuOpen]);

  // Word & character stats
  const stats = useMemo(() => {
    const trimmed = content.trim();
    const wordCount = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const charCount = trimmed.length;
    return { wordCount, charCount };
  }, [content]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Lesson Notes Editor"
      className="fixed inset-0 z-[10000] flex justify-end animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-Over Drawer: One Continuous Notes Document */}
      <div className="relative w-full max-w-2xl bg-[#090C14] border-l border-white/[0.1] shadow-2xl flex flex-col h-full z-10 text-slate-200">
        {/* ─── 1. Fixed Responsive Header Layout ───────────────────────────── */}
        <div className="px-4 sm:px-6 py-4 border-b border-white/[0.08] flex items-center justify-between gap-3 sm:gap-4 bg-[#0E121B] min-h-[72px]">
          {/* Breadcrumb & Title Column with truncation protection */}
          <div className="min-w-0 flex-1 pr-1 sm:pr-2">
            <div className="flex items-center gap-2 min-w-0 flex-wrap sm:flex-nowrap">
              <span className="text-[11px] sm:text-xs font-mono font-bold text-purple-400 uppercase tracking-wider shrink-0">
                {trackTitle}
              </span>
              <span className="text-slate-600 shrink-0">/</span>
              <span
                className="text-[11px] sm:text-xs text-slate-400 font-mono truncate max-w-[160px] sm:max-w-[240px]"
                title={lessonSlug}
              >
                {lessonSlug}
              </span>
              {activeSectionLabel && (
                <>
                  <span className="text-slate-600 shrink-0">/</span>
                  <span
                    className="text-[11px] sm:text-xs text-purple-300 font-mono truncate max-w-[140px]"
                    title={activeSectionLabel}
                  >
                    {activeSectionLabel}
                  </span>
                </>
              )}
            </div>
            <h2
              className="text-sm sm:text-base font-bold text-white mt-1 truncate max-w-full"
              title={lessonTitle}
            >
              {lessonTitle}
            </h2>
          </div>

          {/* Action Buttons: Pinned & aligned, immune to long title push */}
          <div className="flex items-center gap-2 shrink-0 self-center">
            <Link
              href="/notes"
              target="_blank"
              title="Open All Notes Hub"
              className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <span>📂</span>
              <span className="hidden xs:inline">All Notes</span>
            </Link>
            <button
              onClick={handleClose}
              aria-label="Close notes editor"
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-purple-500"
              title="Close (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ─── 2. Enhanced Document Toolbar with Insert Tools ───────────────── */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#0B0F19] border-b border-white/[0.06] flex flex-col gap-2">
          {/* Top Row: Write / Preview Toggle, Word Count & Autosave Indicator */}
          <div className="flex items-center justify-between gap-2">
            {/* Write / Preview Tab Switcher */}
            <div className="flex items-center gap-1 bg-[#121624] p-0.5 rounded-xl border border-white/[0.08]">
              <button
                type="button"
                onClick={() => setMode("write")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  mode === "write"
                    ? "bg-purple-600 text-white font-bold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>✏️</span>
                <span>Write</span>
              </button>
              <button
                type="button"
                onClick={() => setMode("preview")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  mode === "preview"
                    ? "bg-purple-600 text-white font-bold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>👁️</span>
                <span>Preview</span>
              </button>
            </div>

            {/* Right Status: Word count & Autosave Indicator */}
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono text-slate-500 hidden xs:inline">
                {stats.wordCount} {stats.wordCount === 1 ? "word" : "words"}
              </span>

              {/* Autosave Status Pill */}
              {saveStatus === "saving" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Saving...
                </span>
              )}
              {saveStatus === "saved" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                  <span>✓</span>
                  Saved
                </span>
              )}
              {saveStatus === "error" && (
                <button
                  type="button"
                  onClick={() => saveNoteToStorage(content)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-rose-500/15 text-rose-300 border border-rose-500/25 hover:bg-rose-500/25 transition-colors cursor-pointer"
                  title="Click to retry saving"
                >
                  <span>⚠️</span>
                  Save failed (Retry)
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row: Text Formatting Buttons + Contextual Insert Tools (in Write Mode) */}
          {mode === "write" && (
            <div className="flex items-center gap-1 flex-wrap pt-1.5 border-t border-white/[0.04]">
              {/* Standard Markdown Buttons */}
              <button
                type="button"
                onClick={() => insertTextAtCursor("## ", "Heading 2", "\n\n")}
                className="px-2 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-[11px] font-mono cursor-pointer transition-colors"
                title="Heading 2"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => insertTextAtCursor("**", "bold text", "**")}
                className="px-2 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-[11px] font-bold cursor-pointer transition-colors"
                title="Bold"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => insertTextAtCursor("*", "italic text", "*")}
                className="px-2 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-[11px] italic cursor-pointer transition-colors"
                title="Italic"
              >
                I
              </button>
              {/* List Dropdown Menu */}
              <div className="relative" ref={listMenuRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsListMenuOpen(!isListMenuOpen);
                    setIsCodeMenuOpen(false);
                  }}
                  className="px-2 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-[11px] cursor-pointer transition-colors flex items-center gap-1"
                  title="List options"
                  aria-expanded={isListMenuOpen}
                >
                  <span>• List</span>
                  <span className="text-[9px] text-slate-400">▼</span>
                </button>

                {isListMenuOpen && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full mt-1.5 w-40 bg-[#101422] border border-white/[0.12] rounded-xl p-1 shadow-2xl z-40 flex flex-col gap-0.5 backdrop-blur-md animate-in fade-in zoom-in-95 duration-100"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setIsListMenuOpen(false);
                        insertTextAtCursor("- ", "List item", "\n");
                      }}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] text-slate-200 hover:text-white hover:bg-white/[0.08] text-left transition-colors"
                    >
                      <span className="text-slate-400 font-mono text-xs">•</span>
                      <span>Bullet List</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsListMenuOpen(false);
                        insertTextAtCursor("1. ", "Numbered item", "\n");
                      }}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] text-slate-200 hover:text-white hover:bg-white/[0.08] text-left transition-colors"
                    >
                      <span className="text-slate-400 font-mono text-xs">1.</span>
                      <span>Numbered List</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsListMenuOpen(false);
                        insertTextAtCursor("- [ ] ", "Task item", "\n");
                      }}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] text-slate-200 hover:text-white hover:bg-white/[0.08] text-left transition-colors"
                    >
                      <span className="text-slate-400 font-mono text-xs">☑</span>
                      <span>Task List</span>
                    </button>
                  </div>
                )}
              </div>

              <span className="text-slate-700 mx-1">|</span>

              {/* Contextual Insertion Control: + Q&A */}
              <button
                type="button"
                onClick={handleInsertQA}
                className="px-2.5 py-1 rounded-lg bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold cursor-pointer transition-colors flex items-center gap-1 shadow-sm whitespace-nowrap"
                title="Insert Question & Answer section at cursor"
              >
                <span>❓</span>
                <span>+ Q&A</span>
              </button>

              {/* Contextual Insertion Control: + Code with Language Menu */}
              <div className="relative" ref={codeMenuRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsCodeMenuOpen(!isCodeMenuOpen);
                    setIsListMenuOpen(false);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-purple-600/15 hover:bg-purple-600/25 text-purple-300 border border-purple-500/30 text-[11px] font-bold cursor-pointer transition-colors flex items-center gap-1 shadow-sm whitespace-nowrap"
                  title="Insert formatted code snippet at cursor"
                  aria-expanded={isCodeMenuOpen}
                >
                  <span>💻</span>
                  <span>+ Code</span>
                  <span className="text-[9px] text-purple-400">▼</span>
                </button>

                {/* Language Selector Popover */}
                {isCodeMenuOpen && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full mt-1.5 w-48 bg-[#101422] border border-white/[0.12] rounded-xl p-1 shadow-2xl z-40 flex flex-col gap-0.5 backdrop-blur-md animate-in fade-in zoom-in-95 duration-100"
                  >
                    <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold border-b border-white/[0.06] mb-0.5">
                      Select Language
                    </div>
                    {SUPPORTED_CODE_LANGUAGES.map((lang) => (
                      <button
                        key={lang.value}
                        type="button"
                        role="menuitem"
                        onClick={() => handleInsertCodeBlock(lang.value)}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/[0.06] text-xs text-slate-200 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <span>{lang.label}</span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {lang.value}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Code Formatting Action */}
              <button
                type="button"
                onClick={handleFormatAllCode}
                className="px-2 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-[11px] cursor-pointer transition-colors flex items-center gap-1 whitespace-nowrap"
                title="Auto-indent all code snippets in this note"
              >
                <span>✨</span>
                <span>Format</span>
              </button>
            </div>
          )}
        </div>

        {/* ─── 3. Continuous Writing & Reading Document Area ───────────────── */}
        <div className="flex-1 overflow-hidden p-4 sm:p-6 flex flex-col">
          {mode === "write" ? (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => handleTextChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write down what you learned, save a code example (+ Code), or add a question to review (+ Q&A)..."
              className="w-full flex-1 bg-[#0A0D18] border border-white/[0.08] rounded-2xl p-4 sm:p-5 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 resize-none leading-relaxed font-sans shadow-inner overflow-y-auto"
              spellCheck={false}
              autoFocus
            />
          ) : (
            <div className="w-full flex-1 bg-[#0A0D18] border border-white/[0.08] rounded-2xl p-4 sm:p-6 overflow-y-auto shadow-inner">
              {content.trim() ? (
                <div className="text-sm leading-relaxed text-slate-300">
                  <MarkdownRenderer content={content} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-12 text-slate-500">
                  <span className="text-2xl mb-2">📝</span>
                  <p className="text-sm">No notes written yet.</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Switch to Write mode and use the toolbar to take notes.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ─── 4. Footer Actions & Word Count ──────────────────────────────── */}
        <div className="px-4 sm:px-6 py-3 border-t border-white/[0.08] bg-[#0E121B] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-mono text-slate-500 text-[11px]">
            <span>
              {stats.wordCount} {stats.wordCount === 1 ? "word" : "words"}
            </span>
            <span>•</span>
            <span>{stats.charCount} chars</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Changes save automatically
            </span>
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
