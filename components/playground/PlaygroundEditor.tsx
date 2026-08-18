"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { useAutocomplete } from "./autocomplete/use-autocomplete";
import { AutocompletePopover } from "./autocomplete/AutocompletePopover";
import { highlightCode } from "./syntax-highlighter";
import { formatCodeWithCursor } from "./code-formatter";

// Pair mapping for auto-closing brackets and quotes
const PAIR_MAP: Record<string, string> = {
  "(": ")",
  "{": "}",
  "[": "]",
  '"': '"',
  "'": "'",
  "`": "`",
};

const CLOSING_CHARS = new Set([")", "}", "]", '"', "'", "`"]);

// Universal exact line height and padding constants in px
const LINE_HEIGHT_PX = 24;
const PADDING_TOP_PX = 14;
const PADDING_LEFT_PX = 16;
const CHAR_WIDTH_PX = 7.82; // 13px SF Mono / Cascadia Code

interface HistoryEntry {
  value: string;
  selectionStart: number;
  selectionEnd: number;
}

interface PlaygroundEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  minHeight?: string;
  readOnly?: boolean;
  isFullscreen?: boolean;
  placeholder?: string;
  errorLine?: number;
  onFormat?: () => void;
  isWordWrap?: boolean;
  onToggleWordWrap?: () => void;
}

export function PlaygroundEditor({
  value,
  onChange,
  language,
  minHeight,
  readOnly = false,
  isFullscreen = false,
  placeholder,
  errorLine,
  onFormat,
  isWordWrap: isWordWrapProp,
  onToggleWordWrap: onToggleWordWrapProp,
}: PlaygroundEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);
  const errorHighlightRef = useRef<HTMLDivElement>(null);

  // Word Wrap State (Controlled or Uncontrolled)
  const [internalWordWrap, setInternalWordWrap] = useState<boolean>(false);
  const effectiveWordWrap = isWordWrapProp !== undefined ? isWordWrapProp : internalWordWrap;

  const toggleWordWrap = useCallback(() => {
    if (onToggleWordWrapProp) {
      onToggleWordWrapProp();
    } else {
      setInternalWordWrap((prev) => !prev);
    }
  }, [onToggleWordWrapProp]);

  // Undo / Redo History Stack for custom actions
  const undoStackRef = useRef<HistoryEntry[]>([]);
  const redoStackRef = useRef<HistoryEntry[]>([]);
  const lastRecordedValueRef = useRef<string>(value);

  // ─── Autocomplete System ───
  const {
    isOpen,
    suggestions,
    selectedIndex,
    setSelectedIndex,
    caretCoords,
    tokenRange,
    applySuggestion,
    handleKeyDown: handleAutocompleteKeyDown,
    closeSuggestions,
  } = useAutocomplete({
    textareaRef,
    value,
    onChange,
    language,
    readOnly,
  });

  const lines = value.split("\n");
  const lineCount = Math.max(1, lines.length);

  // ─── Synchronize Scroll Between Textarea, Highlight Layer, and Line Numbers ───
  const syncScrollLayers = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const top = textarea.scrollTop;
    const left = textarea.scrollLeft;

    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = top;
    }
    if (highlightRef.current) {
      highlightRef.current.scrollTop = top;
      highlightRef.current.scrollLeft = left;
    }
    if (errorHighlightRef.current) {
      errorHighlightRef.current.style.transform = `translateY(-${top}px)`;
    }
  }, []);

  const handleScroll = useCallback(() => {
    syncScrollLayers();
  }, [syncScrollLayers]);

  // ─── Cursor auto-scroll when reaching the viewport boundary ───
  const scrollCursorIntoView = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const textBefore = textarea.value.substring(0, cursorPos);
    const lineNumber = textBefore.split("\n").length; // 1-based line number

    const verticalBuffer = LINE_HEIGHT_PX * 3; // 72px (3 lines breathing room)

    // Vertical auto-scroll
    const cursorTop = PADDING_TOP_PX + (lineNumber - 1) * LINE_HEIGHT_PX;
    const cursorBottom = cursorTop + LINE_HEIGHT_PX;

    const clientHeight = textarea.clientHeight;
    if (clientHeight > 0) {
      const visibleTop = textarea.scrollTop;
      const visibleBottom = textarea.scrollTop + clientHeight;

      if (cursorBottom + verticalBuffer > visibleBottom) {
        textarea.scrollTop = Math.max(0, cursorBottom + verticalBuffer - clientHeight);
      } else if (cursorTop - verticalBuffer < visibleTop) {
        textarea.scrollTop = Math.max(0, cursorTop - verticalBuffer);
      }
    }

    // Horizontal auto-scroll
    const currentLineBeforeCursor = textBefore.split("\n").pop() || "";
    const visualCharCount = currentLineBeforeCursor.replace(/\t/g, "  ").length;
    const cursorLeft = PADDING_LEFT_PX + visualCharCount * CHAR_WIDTH_PX;
    const clientWidth = textarea.clientWidth;

    if (clientWidth > 0) {
      const currentScrollLeft = textarea.scrollLeft;
      const horizontalBuffer = 50; // 50px buffer

      if (cursorLeft + horizontalBuffer > currentScrollLeft + clientWidth) {
        textarea.scrollLeft = cursorLeft + horizontalBuffer - clientWidth;
      } else if (cursorLeft - horizontalBuffer < currentScrollLeft) {
        textarea.scrollLeft = Math.max(0, cursorLeft - horizontalBuffer);
      }
    }

    syncScrollLayers();
  }, [syncScrollLayers]);

  // ─── Cursor offset state for bracket pair highlighting ───
  const [cursorOffset, setCursorOffset] = useState<number | null>(null);

  const syncCursorPos = useCallback(() => {
    if (textareaRef.current) {
      setCursorOffset(textareaRef.current.selectionStart);
    }
  }, []);

  // ─── Helper for Deterministic Text Mutations with Undo Support ───
  const applyTextEdit = useCallback(
    (
      newFullValue: string,
      newCursorStart: number,
      newCursorEnd: number = newCursorStart,
      recordUndo: boolean = true
    ) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (recordUndo) {
        undoStackRef.current.push({
          value: textarea.value,
          selectionStart: textarea.selectionStart,
          selectionEnd: textarea.selectionEnd,
        });
        if (undoStackRef.current.length > 200) {
          undoStackRef.current.shift();
        }
        redoStackRef.current = [];
      }

      lastRecordedValueRef.current = newFullValue;
      onChange(newFullValue);

      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = newCursorStart;
          textareaRef.current.selectionEnd = newCursorEnd;
          setCursorOffset(newCursorStart);
          scrollCursorIntoView();
          syncScrollLayers();
        }
      });
    },
    [onChange, scrollCursorIntoView, syncScrollLayers]
  );

  // ─── Direct In-Editor Format Handler (Preserves Cursor, Scroll & Undo) ───
  const handleFormatSelf = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea || !value.trim()) return;

    const currentCursor = textarea.selectionStart;
    const { formatted, cursorOffset: newCursor } = formatCodeWithCursor(
      value,
      currentCursor,
      language
    );

    if (formatted !== value) {
      applyTextEdit(formatted, newCursor, newCursor, true);
    }
  }, [value, language, applyTextEdit]);

  // ─── Ensure Sync on Any External Value Updates (Props Change, Reset, Run) ───
  useLayoutEffect(() => {
    lastRecordedValueRef.current = value;
    const textarea = textareaRef.current;
    if (textarea) {
      // Clamp cursor if length shortened
      const maxLen = value.length;
      if (textarea.selectionStart > maxLen) {
        textarea.selectionStart = maxLen;
      }
      if (textarea.selectionEnd > maxLen) {
        textarea.selectionEnd = maxLen;
      }
      setCursorOffset(textarea.selectionStart);
    }
    syncScrollLayers();
  }, [value, syncScrollLayers]);

  // ─── Handle Key Down Events ───
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (readOnly) return;

      // Autocomplete interception (Tab, Escape, Arrows when popup is open)
      const intercepted = handleAutocompleteKeyDown(e);
      if (intercepted) return;

      // Format code shortcut: Shift+Alt+F, Ctrl+Shift+F, Ctrl+Shift+I
      if (
        (e.shiftKey && e.altKey && (e.key === "f" || e.key === "F")) ||
        (e.ctrlKey &&
          e.shiftKey &&
          (e.key === "f" || e.key === "F" || e.key === "i" || e.key === "I"))
      ) {
        e.preventDefault();
        handleFormatSelf();
        onFormat?.();
        return;
      }

      // ─── Word Wrap Shortcut: Alt+Z (Option+Z on Mac) ───
      if (
        e.altKey &&
        (e.key === "z" || e.key === "Z") &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey
      ) {
        e.preventDefault();
        toggleWordWrap();
        requestAnimationFrame(() => {
          syncCursorPos();
          scrollCursorIntoView();
          syncScrollLayers();
        });
        return;
      }

      const textarea = e.currentTarget;
      const domValue = textarea.value;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // ─── Undo / Redo Shortcuts (Ctrl+Z / Ctrl+Y / Ctrl+Shift+Z) ───
      if ((e.ctrlKey || e.metaKey) && (e.key === "z" || e.key === "Z")) {
        if (e.shiftKey) {
          // Redo
          if (redoStackRef.current.length > 0) {
            e.preventDefault();
            const nextEntry = redoStackRef.current.pop()!;
            undoStackRef.current.push({
              value: domValue,
              selectionStart: start,
              selectionEnd: end,
            });
            applyTextEdit(nextEntry.value, nextEntry.selectionStart, nextEntry.selectionEnd, false);
            return;
          }
        } else {
          // Undo
          if (undoStackRef.current.length > 0) {
            e.preventDefault();
            const prevEntry = undoStackRef.current.pop()!;
            redoStackRef.current.push({
              value: domValue,
              selectionStart: start,
              selectionEnd: end,
            });
            applyTextEdit(prevEntry.value, prevEntry.selectionStart, prevEntry.selectionEnd, false);
            return;
          }
        }
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || e.key === "Y")) {
        // Redo
        if (redoStackRef.current.length > 0) {
          e.preventDefault();
          const nextEntry = redoStackRef.current.pop()!;
          undoStackRef.current.push({
            value: domValue,
            selectionStart: start,
            selectionEnd: end,
          });
          applyTextEdit(nextEntry.value, nextEntry.selectionStart, nextEntry.selectionEnd, false);
          return;
        }
      }

      // ─── Arrow Keys, Home, End, PageUp, PageDown ───
      // Allow complete native navigation across characters, lines, and words.
      if (
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "Home" ||
        e.key === "End" ||
        e.key === "PageUp" ||
        e.key === "PageDown"
      ) {
        closeSuggestions();
        requestAnimationFrame(() => {
          syncCursorPos();
          scrollCursorIntoView();
        });
        return;
      }

      // ─── Ctrl+/ : Toggle Line Comment ───
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        const selStartLine = domValue.lastIndexOf("\n", start - 1) + 1;
        const selEndLineIdx = domValue.indexOf("\n", end);
        const selEndLine = selEndLineIdx === -1 ? domValue.length : selEndLineIdx;

        const lineArr = domValue.substring(selStartLine, selEndLine).split("\n");
        const allCommented = lineArr.every((l) => /^\s*\/\//.test(l) || !l.trim());

        let newLines: string[];
        if (allCommented) {
          newLines = lineArr.map((l) => l.replace(/^(\s*)\/\/\s?/, "$1"));
        } else {
          newLines = lineArr.map((l) => (l.trim() ? l.replace(/^(\s*)/, "$1// ") : l));
        }

        const newContent = newLines.join("\n");
        const newFullValue =
          domValue.substring(0, selStartLine) + newContent + domValue.substring(selEndLine);
        const lengthDelta = newContent.length - (selEndLine - selStartLine);

        if (start === end) {
          const delta = newLines[0].length - lineArr[0].length;
          const newPos = Math.max(selStartLine, start + delta);
          applyTextEdit(newFullValue, newPos, newPos);
        } else {
          applyTextEdit(newFullValue, selStartLine, selEndLine + lengthDelta);
        }
        return;
      }

      // ─── Ctrl+D : Duplicate Line ───
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "d" || e.key === "D") &&
        !e.shiftKey
      ) {
        e.preventDefault();
        const curLineStart = domValue.lastIndexOf("\n", start - 1) + 1;
        const curLineEndIdx = domValue.indexOf("\n", start);
        const curLineEnd = curLineEndIdx === -1 ? domValue.length : curLineEndIdx;
        const lineContent = domValue.substring(curLineStart, curLineEnd);

        const newFullValue =
          domValue.substring(0, curLineEnd) + "\n" + lineContent + domValue.substring(curLineEnd);
        const colOffset = start - curLineStart;
        const newPos = curLineEnd + 1 + colOffset;
        applyTextEdit(newFullValue, newPos, newPos);
        return;
      }

      // ─── 1. Auto-close Bracket and Quote Pairs ───
      const openChar = e.key;
      const matchingClose = PAIR_MAP[openChar];

      if (matchingClose) {
        if (start !== end) {
          e.preventDefault();
          const selectedText = domValue.substring(start, end);
          const wrapped = openChar + selectedText + matchingClose;
          const newFullValue =
            domValue.substring(0, start) + wrapped + domValue.substring(end);
          applyTextEdit(newFullValue, start + 1, start + 1 + selectedText.length);
          return;
        }

        const prevChar = start > 0 ? domValue[start - 1] : "";
        const nextChar = domValue[start] || "";

        // Skip over quote if typed directly when already in front of closing quote
        if (
          (openChar === "'" || openChar === '"' || openChar === "`") &&
          openChar === nextChar
        ) {
          e.preventDefault();
          requestAnimationFrame(() => {
            if (textareaRef.current) {
              textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 1;
              setCursorOffset(start + 1);
              scrollCursorIntoView();
            }
          });
          return;
        }

        // Don't auto-close single quote for apostrophe in words (e.g. don't, user's)
        if (openChar === "'" && /[a-zA-Z0-9]/.test(prevChar)) {
          return;
        }

        e.preventDefault();
        const newFullValue =
          domValue.substring(0, start) + openChar + matchingClose + domValue.substring(end);
        applyTextEdit(newFullValue, start + 1, start + 1);
        return;
      }

      // ─── 2. Skip over closing character if user types it directly ───
      if (CLOSING_CHARS.has(e.key)) {
        if (start === end && domValue[start] === e.key) {
          e.preventDefault();
          requestAnimationFrame(() => {
            if (textareaRef.current) {
              textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 1;
              setCursorOffset(start + 1);
              scrollCursorIntoView();
            }
          });
          return;
        }
      }

      // ─── 3. Smart Pair Deletion on Backspace ───
      if (e.key === "Backspace") {
        if (start === end && start > 0) {
          const prev = domValue[start - 1];
          const next = domValue[start];
          if (PAIR_MAP[prev] === next) {
            e.preventDefault();
            const newFullValue =
              domValue.substring(0, start - 1) + domValue.substring(start + 1);
            applyTextEdit(newFullValue, start - 1, start - 1);
            return;
          }
        }
        requestAnimationFrame(() => {
          syncCursorPos();
          scrollCursorIntoView();
        });
      }

      // ─── 4. Tab Indentation & Shift+Tab Dedent ───
      if (e.key === "Tab") {
        e.preventDefault();

        if (e.shiftKey) {
          // Shift+Tab: Dedent
          const selStartLine = domValue.lastIndexOf("\n", start - 1) + 1;
          const selEndLineIdx = domValue.indexOf("\n", end);
          const selEndLine = selEndLineIdx === -1 ? domValue.length : selEndLineIdx;

          const lineArr = domValue.substring(selStartLine, selEndLine).split("\n");
          let firstLineRemoved = 0;
          let totalRemoved = 0;

          const dedented = lineArr.map((line, idx) => {
            let removed = 0;
            if (line.startsWith("  ")) {
              removed = 2;
            } else if (line.startsWith(" ") || line.startsWith("\t")) {
              removed = 1;
            }
            if (idx === 0) firstLineRemoved = removed;
            totalRemoved += removed;
            return line.substring(removed);
          });

          if (totalRemoved > 0) {
            const newContent = dedented.join("\n");
            const newFullValue =
              domValue.substring(0, selStartLine) + newContent + domValue.substring(selEndLine);
            const newStart = Math.max(selStartLine, start - firstLineRemoved);
            const newEnd = Math.max(selStartLine, end - totalRemoved);
            applyTextEdit(newFullValue, newStart, newEnd);
          }
          return;
        }

        // Tab: Indent
        if (start !== end) {
          const selStartLine = domValue.lastIndexOf("\n", start - 1) + 1;
          const selEndLineIdx = domValue.indexOf("\n", end);
          const selEndLine = selEndLineIdx === -1 ? domValue.length : selEndLineIdx;

          const lineArr = domValue.substring(selStartLine, selEndLine).split("\n");
          const indented = lineArr.map((l) => "  " + l);
          const newContent = indented.join("\n");
          const newFullValue =
            domValue.substring(0, selStartLine) + newContent + domValue.substring(selEndLine);

          applyTextEdit(newFullValue, start + 2, end + 2 * lineArr.length);
        } else {
          const newFullValue =
            domValue.substring(0, start) + "  " + domValue.substring(end);
          applyTextEdit(newFullValue, start + 2, start + 2);
        }
        return;
      }

      // ─── 5. Smart Enter between Braces and Auto-Indent ───
      if (e.key === "Enter") {
        e.preventDefault();
        const currentLine = domValue.substring(0, start).split("\n").pop() || "";
        const indent = currentLine.match(/^\s*/)?.[0] || "";

        // Check if cursor is between { and } or ( and )
        const prevChar = start > 0 ? domValue[start - 1] : "";
        const nextChar = domValue[end] || "";

        if (prevChar === "{" && nextChar === "}") {
          const insertText = "\n" + indent + "  \n" + indent;
          const newFullValue =
            domValue.substring(0, start) + insertText + domValue.substring(end);
          const newPos = start + 1 + indent.length + 2;
          applyTextEdit(newFullValue, newPos, newPos);
          return;
        }

        // Standard Auto-indent
        const lastChar = currentLine.trimEnd().slice(-1);
        const extraIndent = lastChar === "{" || lastChar === "(" ? "  " : "";
        const insertText = "\n" + indent + extraIndent;
        const newFullValue =
          domValue.substring(0, start) + insertText + domValue.substring(end);
        const newPos = start + insertText.length;
        applyTextEdit(newFullValue, newPos, newPos);
        return;
      }
    },
    [
      readOnly,
      handleAutocompleteKeyDown,
      closeSuggestions,
      scrollCursorIntoView,
      syncCursorPos,
      applyTextEdit,
      handleFormatSelf,
      onFormat,
      toggleWordWrap,
      syncScrollLayers,
    ]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newVal = e.target.value;
      lastRecordedValueRef.current = newVal;
      onChange(newVal);

      requestAnimationFrame(() => {
        syncCursorPos();
        scrollCursorIntoView();
        syncScrollLayers();
      });
    },
    [onChange, scrollCursorIntoView, syncCursorPos, syncScrollLayers]
  );

  const handleKeyUp = useCallback(() => {
    syncCursorPos();
  }, [syncCursorPos]);

  const handleClick = useCallback(() => {
    closeSuggestions();
    syncCursorPos();
    scrollCursorIntoView();
  }, [closeSuggestions, scrollCursorIntoView, syncCursorPos]);

  const handleSelect = useCallback(() => {
    syncCursorPos();
    scrollCursorIntoView();
  }, [scrollCursorIntoView, syncCursorPos]);

  // Auto-scroll to error line when error occurs
  useEffect(() => {
    if (errorLine && errorLine > 0 && textareaRef.current) {
      const targetScroll = Math.max(0, (errorLine - 3) * LINE_HEIGHT_PX);
      textareaRef.current.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  }, [errorLine]);

  // Native scroll event listener for seamless high-fps synchronization
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleNativeScroll = () => {
      syncScrollLayers();
    };

    textarea.addEventListener("scroll", handleNativeScroll, { passive: true });
    return () => textarea.removeEventListener("scroll", handleNativeScroll);
  }, [syncScrollLayers]);

  return (
    <div
      className={`playground-editor-wrapper ${effectiveWordWrap ? "playground-editor-wrapper--word-wrap" : ""}`}
      style={{
        height: "100%",
        minHeight: isFullscreen ? "100%" : (minHeight || "240px"),
      }}
    >
      {/* Line Numbers Gutter */}
      <div
        ref={lineNumbersRef}
        className="playground-line-numbers"
        aria-hidden="true"
      >
        {Array.from({ length: lineCount }, (_, i) => {
          const lineNum = i + 1;
          const isErrorLine = errorLine === lineNum;
          return (
            <span
              key={i}
              className={`playground-line-number ${isErrorLine ? "playground-line-number--error" : ""}`}
              title={isErrorLine ? `Error on line ${lineNum}` : undefined}
            >
              {isErrorLine ? (
                <span className="playground-line-error-indicator">
                  <span className="playground-line-error-dot">●</span>
                  {lineNum}
                </span>
              ) : (
                lineNum
              )}
            </span>
          );
        })}
      </div>

      {/* Unified Editor Stage: shared bounds & coordinate origin for pre and textarea */}
      <div className="playground-editor-stage">
        {/* Error Line Highlight Background */}
        {errorLine && errorLine <= lineCount && (
          <div
            ref={errorHighlightRef}
            className="playground-error-line-highlight"
            style={{
              top: `${PADDING_TOP_PX + (errorLine - 1) * LINE_HEIGHT_PX}px`,
              height: `${LINE_HEIGHT_PX}px`,
            }}
            aria-hidden="true"
          >
            <span className="playground-error-line-pill">
              Line {errorLine} Error
            </span>
          </div>
        )}

        {/* Syntax Highlight Layer (z-index: 1, pointer-events: none) */}
        <pre
          ref={highlightRef}
          className="playground-highlight-layer"
          aria-hidden="true"
        >
          <code className="playground-code-content">
            {highlightCode(value, cursorOffset)}
          </code>
        </pre>

        {/* Interactive Textarea (z-index: 2, transparent text, caret & selection visible) */}
        <textarea
          ref={textareaRef}
          className="playground-textarea"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onSelect={handleSelect}
          onScroll={handleScroll}
          onClick={handleClick}
          readOnly={readOnly}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          data-gramm="false"
          placeholder={placeholder || `Write your ${language} code here...`}
          aria-label={`${language} code editor`}
        />

        {/* Autocomplete Suggestions Popover */}
        {isOpen && suggestions.length > 0 && (
          <AutocompletePopover
            suggestions={suggestions}
            selectedIndex={selectedIndex}
            onSelectIndex={setSelectedIndex}
            onApply={applySuggestion}
            caretCoords={caretCoords}
            filterText={tokenRange.prefix}
          />
        )}
      </div>
    </div>
  );
}
