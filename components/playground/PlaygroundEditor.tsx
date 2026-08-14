"use client";

import { useRef, useCallback, useEffect, type ChangeEvent, type KeyboardEvent } from "react";
import { useAutocomplete } from "./autocomplete/use-autocomplete";
import { AutocompletePopover } from "./autocomplete/AutocompletePopover";
import { highlightCode } from "./syntax-highlighter";

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
}: PlaygroundEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);

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

  // Calculate dynamic content height: 26px line height (1.625rem) + 28px vertical padding (0.875rem * 2)
  const dynamicHeightPx = lineCount * 26 + 28;

  // Sync scroll between textarea, line numbers, and highlight layer
  const handleScroll = useCallback(() => {
    if (textareaRef.current) {
      if (lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
      }
      if (highlightRef.current) {
        highlightRef.current.scrollTop = textareaRef.current.scrollTop;
        highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
      }
    }
  }, []);

  // Handle auto-closing pairs, tab key & autocomplete keyboard interactions
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (readOnly) return;

      // Autocomplete interception (Tab, Enter, ArrowUp, ArrowDown, Escape)
      const intercepted = handleAutocompleteKeyDown(e);
      if (intercepted) return;

      // Format code shortcut: Shift+Alt+F or Ctrl+Shift+F or Ctrl+Alt+F
      if (
        (e.shiftKey && e.altKey && (e.key === "f" || e.key === "F")) ||
        (e.ctrlKey && e.shiftKey && (e.key === "f" || e.key === "F" || e.key === "i" || e.key === "I"))
      ) {
        e.preventDefault();
        onFormat?.();
        return;
      }

      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // ─── 1. Auto-close Bracket and Quote Pairs (first, second, third brackets & quotes) ───
      const openChar = e.key;
      const matchingClose = PAIR_MAP[openChar];

      if (matchingClose) {
        // If user has selected text, wrap selection with the pair: e.g. "text", (text), {text}, [text]
        if (start !== end) {
          e.preventDefault();
          const selectedText = value.substring(start, end);
          const wrapped = openChar + selectedText + matchingClose;
          const newValue = value.substring(0, start) + wrapped + value.substring(end);
          onChange(newValue);
          requestAnimationFrame(() => {
            textarea.selectionStart = start + 1;
            textarea.selectionEnd = start + 1 + selectedText.length;
          });
          return;
        }

        const prevChar = start > 0 ? value[start - 1] : "";
        const nextChar = value[start] || "";

        // Skip over quote if typed directly when already in front of closing quote
        if ((openChar === "'" || openChar === '"' || openChar === "`") && openChar === nextChar) {
          e.preventDefault();
          requestAnimationFrame(() => {
            textarea.selectionStart = textarea.selectionEnd = start + 1;
          });
          return;
        }

        // Don't auto-close single quote for apostrophe in words (e.g. don't, user's)
        if (openChar === "'" && /[a-zA-Z0-9]/.test(prevChar)) {
          return;
        }

        // Insert opening + closing pair and position cursor between them
        e.preventDefault();
        const newValue = value.substring(0, start) + openChar + matchingClose + value.substring(end);
        onChange(newValue);
        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        });
        return;
      }

      // ─── 2. Skip over closing character if user types it directly ───
      if (CLOSING_CHARS.has(e.key)) {
        if (start === end && value[start] === e.key) {
          e.preventDefault();
          requestAnimationFrame(() => {
            textarea.selectionStart = textarea.selectionEnd = start + 1;
          });
          return;
        }
      }

      // ─── 3. Smart Pair Deletion on Backspace (deletes matching pair together) ───
      if (e.key === "Backspace") {
        if (start === end && start > 0) {
          const prev = value[start - 1];
          const next = value[start];
          if (PAIR_MAP[prev] === next) {
            e.preventDefault();
            const newValue = value.substring(0, start - 1) + value.substring(start + 1);
            onChange(newValue);
            requestAnimationFrame(() => {
              textarea.selectionStart = textarea.selectionEnd = start - 1;
            });
            return;
          }
        }
      }

      // ─── 4. Tab Indentation ───
      if (e.key === "Tab") {
        e.preventDefault();
        const newValue = value.substring(0, start) + "  " + value.substring(end);
        onChange(newValue);

        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        });
        return;
      }

      // ─── 5. Smart Enter between Braces and Auto-Indent ───
      if (e.key === "Enter") {
        e.preventDefault();
        const currentLine = value.substring(0, start).split("\n").pop() || "";
        const indent = currentLine.match(/^\s*/)?.[0] || "";

        // Check if cursor is between { and } or ( and )
        const prevChar = start > 0 ? value[start - 1] : "";
        const nextChar = value[end] || "";

        if (prevChar === "{" && nextChar === "}") {
          const newValue =
            value.substring(0, start) +
            "\n" +
            indent +
            "  \n" +
            indent +
            value.substring(end);
          onChange(newValue);
          requestAnimationFrame(() => {
            const newPos = start + 1 + indent.length + 2;
            textarea.selectionStart = textarea.selectionEnd = newPos;
          });
          return;
        }

        // Standard Auto-indent
        const lastChar = currentLine.trimEnd().slice(-1);
        const extraIndent = lastChar === "{" || lastChar === "(" ? "  " : "";

        const newValue =
          value.substring(0, start) + "\n" + indent + extraIndent + value.substring(end);
        onChange(newValue);

        requestAnimationFrame(() => {
          const newPos = start + 1 + indent.length + extraIndent.length;
          textarea.selectionStart = textarea.selectionEnd = newPos;
        });
        return;
      }
    },
    [value, onChange, readOnly, handleAutocompleteKeyDown]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  // Auto-scroll to error line when error occurs
  useEffect(() => {
    if (errorLine && errorLine > 0 && textareaRef.current) {
      const lineHeight = 26;
      const targetScroll = Math.max(0, (errorLine - 3) * lineHeight);
      textareaRef.current.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  }, [errorLine]);

  // Keep focus and sync scroll in fullscreen
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleWheel = () => {
      if (lineNumbersRef.current && textarea) {
        lineNumbersRef.current.scrollTop = textarea.scrollTop;
      }
      if (highlightRef.current && textarea) {
        highlightRef.current.scrollTop = textarea.scrollTop;
        highlightRef.current.scrollLeft = textarea.scrollLeft;
      }
    };

    textarea.addEventListener("scroll", handleWheel, { passive: true });
    return () => textarea.removeEventListener("scroll", handleWheel);
  }, []);

  return (
    <div
      className="playground-editor-wrapper"
      style={
        isFullscreen
          ? { height: "100%", overflow: "hidden" }
          : {
              minHeight: minHeight ? `max(${minHeight}, ${dynamicHeightPx}px)` : `${dynamicHeightPx}px`,
              height: "auto",
            }
      }
    >
      {/* Line Numbers */}
      <div
        ref={lineNumbersRef}
        className="playground-line-numbers"
        aria-hidden="true"
        style={isFullscreen ? undefined : { height: "100%" }}
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

      {/* Error Line Highlight Background */}
      {errorLine && errorLine <= lineCount && (
        <div
          className="playground-error-line-highlight"
          style={{
            top: `${14 + (errorLine - 1) * 26}px`, // 0.875rem (14px) vertical padding + line offset
            height: "26px",
          }}
          aria-hidden="true"
        >
          <span className="playground-error-line-pill">Line {errorLine} Error</span>
        </div>
      )}

      {/* Syntax Highlight Layer */}
      <pre
        ref={highlightRef}
        className="playground-highlight-layer"
        aria-hidden="true"
        style={
          isFullscreen
            ? { height: "100%", overflow: "hidden" }
            : { height: `${dynamicHeightPx}px`, overflow: "hidden" }
        }
      >
        <code>{highlightCode(value)}</code>
      </pre>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        className="playground-textarea"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        onClick={closeSuggestions}
        readOnly={readOnly}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        data-gramm="false"
        placeholder={placeholder || `Write your ${language} code here...`}
        aria-label={`${language} code editor`}
        style={
          isFullscreen
            ? { height: "100%", overflowY: "auto" }
            : { height: `${dynamicHeightPx}px`, overflowY: "hidden" }
        }
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
  );
}
