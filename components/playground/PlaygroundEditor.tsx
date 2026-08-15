"use client";

import {
  useRef,
  useCallback,
  useEffect,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
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
  const errorHighlightRef = useRef<HTMLDivElement>(null);

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

  // Sync scroll between textarea, line numbers, highlight layer, and error marker
  const handleScroll = useCallback(() => {
    if (textareaRef.current) {
      const top = textareaRef.current.scrollTop;
      const left = textareaRef.current.scrollLeft;
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
    }
  }, []);

  // Automatically scrolls the textarea so the current cursor line & horizontal position remain comfortably visible
  const scrollCursorIntoView = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const textBefore = textarea.value.substring(0, cursorPos);
    const lineNumber = textBefore.split("\n").length; // 1-based line number

    const lineHeight = 26; // 1.625rem
    const paddingTop = 14; // 0.875rem (14px)
    const verticalBuffer = 52; // 2 lines breathing room buffer

    // ─── 1. Vertical Cursor Auto-Scrolling ───
    const cursorTop = paddingTop + (lineNumber - 1) * lineHeight;
    const cursorBottom = cursorTop + lineHeight;

    const clientHeight = textarea.clientHeight;
    if (clientHeight > 0) {
      const visibleTop = textarea.scrollTop;
      const visibleBottom = textarea.scrollTop + clientHeight;

      if (cursorBottom + verticalBuffer > visibleBottom) {
        textarea.scrollTop = cursorBottom + verticalBuffer - clientHeight;
      } else if (cursorTop - verticalBuffer < visibleTop) {
        textarea.scrollTop = Math.max(0, cursorTop - verticalBuffer);
      }
    }

    // ─── 2. Horizontal Cursor Auto-Scrolling ───
    const currentLineBeforeCursor = textBefore.split("\n").pop() || "";
    // Tab characters count as 2 spaces in our editor
    const visualCharCount = currentLineBeforeCursor.replace(/\t/g, "  ").length;
    
    // Monospace font character width ratio
    const fontSize = 13; // 0.8125rem base
    const charWidth = fontSize * 0.602; // approx 7.82px per character
    const paddingLeft = 16; // 1rem padding

    const cursorLeft = paddingLeft + visualCharCount * charWidth;
    const clientWidth = textarea.clientWidth;
    if (clientWidth > 0) {
      const currentScrollLeft = textarea.scrollLeft;
      const horizontalBuffer = 50; // 50px breathing room buffer

      if (cursorLeft + horizontalBuffer > currentScrollLeft + clientWidth) {
        textarea.scrollLeft = cursorLeft + horizontalBuffer - clientWidth;
      } else if (cursorLeft - horizontalBuffer < currentScrollLeft) {
        textarea.scrollLeft = Math.max(0, cursorLeft - horizontalBuffer);
      }
    }
  }, []);

  // Handle auto-closing pairs, tab key, arrow keys & autocomplete interactions
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (readOnly) return;

      // Autocomplete interception (Tab, Escape)
      const intercepted = handleAutocompleteKeyDown(e);
      if (intercepted) return;

      // Format code shortcut: Shift+Alt+F or Ctrl+Shift+F or Ctrl+Alt+F
      if (
        (e.shiftKey && e.altKey && (e.key === "f" || e.key === "F")) ||
        (e.ctrlKey &&
          e.shiftKey &&
          (e.key === "f" || e.key === "F" || e.key === "i" || e.key === "I"))
      ) {
        e.preventDefault();
        onFormat?.();
        return;
      }

      const textarea = e.currentTarget;
      const domValue = textarea.value;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // ─── 0. Cursor Horizontal & Vertical Navigation Rules ───
      // Left/right arrow keys navigate horizontally across the line and stop at line ends
      if (e.key === "ArrowLeft" && !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey) {
        closeSuggestions();
        if (start === end) {
          // If cursor is at the start of the line (index 0 or after \n), stop at line start
          if (start === 0 || domValue[start - 1] === "\n") {
            e.preventDefault();
            return;
          }
        }
        requestAnimationFrame(() => {
          scrollCursorIntoView();
        });
        return;
      }

      if (e.key === "ArrowRight" && !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey) {
        closeSuggestions();
        if (start === end) {
          // Only stop if cursor is directly in front of newline at line end
          if (start < domValue.length && (domValue[start] === "\n" || domValue[start] === "\r")) {
            e.preventDefault();
            return;
          }
        }
        requestAnimationFrame(() => {
          scrollCursorIntoView();
        });
        return;
      }

      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        closeSuggestions();
        requestAnimationFrame(() => {
          scrollCursorIntoView();
        });
        return;
      }

      // ─── 1. Auto-close Bracket and Quote Pairs (first, second, third brackets & quotes) ───
      const openChar = e.key;
      const matchingClose = PAIR_MAP[openChar];

      if (matchingClose) {
        // If user has selected text, wrap selection with the pair: e.g. "text", (text), {text}, [text]
        if (start !== end) {
          e.preventDefault();
          const selectedText = domValue.substring(start, end);
          const wrapped = openChar + selectedText + matchingClose;
          const newValue =
            domValue.substring(0, start) + wrapped + domValue.substring(end);
          onChange(newValue);
          requestAnimationFrame(() => {
            textarea.selectionStart = start + 1;
            textarea.selectionEnd = start + 1 + selectedText.length;
            scrollCursorIntoView();
          });
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
            textarea.selectionStart = textarea.selectionEnd = start + 1;
            scrollCursorIntoView();
          });
          return;
        }

        // Don't auto-close single quote for apostrophe in words (e.g. don't, user's)
        if (openChar === "'" && /[a-zA-Z0-9]/.test(prevChar)) {
          return;
        }

        // Insert opening + closing pair and position cursor between them
        e.preventDefault();
        const newValue =
          domValue.substring(0, start) +
          openChar +
          matchingClose +
          domValue.substring(end);
        onChange(newValue);
        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
          scrollCursorIntoView();
        });
        return;
      }

      // ─── 2. Skip over closing character if user types it directly ───
      if (CLOSING_CHARS.has(e.key)) {
        if (start === end && domValue[start] === e.key) {
          e.preventDefault();
          requestAnimationFrame(() => {
            textarea.selectionStart = textarea.selectionEnd = start + 1;
            scrollCursorIntoView();
          });
          return;
        }
      }

      // ─── 3. Smart Pair Deletion on Backspace (deletes matching pair together) ───
      if (e.key === "Backspace") {
        if (start === end && start > 0) {
          const prev = domValue[start - 1];
          const next = domValue[start];
          if (PAIR_MAP[prev] === next) {
            e.preventDefault();
            const newValue =
              domValue.substring(0, start - 1) + domValue.substring(start + 1);
            onChange(newValue);
            requestAnimationFrame(() => {
              textarea.selectionStart = textarea.selectionEnd = start - 1;
              scrollCursorIntoView();
            });
            return;
          }
        }
        requestAnimationFrame(() => {
          scrollCursorIntoView();
        });
      }

      // ─── 4. Tab Indentation ───
      if (e.key === "Tab") {
        e.preventDefault();
        const newValue =
          domValue.substring(0, start) + "  " + domValue.substring(end);
        onChange(newValue);

        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
          scrollCursorIntoView();
        });
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
          const newValue =
            domValue.substring(0, start) +
            "\n" +
            indent +
            "  \n" +
            indent +
            domValue.substring(end);
          onChange(newValue);
          requestAnimationFrame(() => {
            const newPos = start + 1 + indent.length + 2;
            textarea.selectionStart = textarea.selectionEnd = newPos;
            scrollCursorIntoView();
          });
          return;
        }

        // Standard Auto-indent
        const lastChar = currentLine.trimEnd().slice(-1);
        const extraIndent = lastChar === "{" || lastChar === "(" ? "  " : "";

        const newValue =
          domValue.substring(0, start) +
          "\n" +
          indent +
          extraIndent +
          domValue.substring(end);
        onChange(newValue);

        requestAnimationFrame(() => {
          const newPos = start + 1 + indent.length + extraIndent.length;
          textarea.selectionStart = textarea.selectionEnd = newPos;
          scrollCursorIntoView();
        });
        return;
      }
    },
    [onChange, readOnly, handleAutocompleteKeyDown, closeSuggestions, scrollCursorIntoView, onFormat],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
      requestAnimationFrame(() => {
        scrollCursorIntoView();
      });
    },
    [onChange, scrollCursorIntoView],
  );

  const handleKeyUp = useCallback(() => {
    scrollCursorIntoView();
  }, [scrollCursorIntoView]);

  const handleClick = useCallback(() => {
    closeSuggestions();
    scrollCursorIntoView();
  }, [closeSuggestions, scrollCursorIntoView]);

  const handleSelect = useCallback(() => {
    scrollCursorIntoView();
  }, [scrollCursorIntoView]);

  // Auto-scroll to error line when error occurs
  useEffect(() => {
    if (errorLine && errorLine > 0 && textareaRef.current) {
      const lineHeight = 26;
      const targetScroll = Math.max(0, (errorLine - 3) * lineHeight);
      textareaRef.current.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  }, [errorLine]);

  // Keep focus and sync scroll
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
      if (errorHighlightRef.current && textarea) {
        errorHighlightRef.current.style.transform = `translateY(-${textarea.scrollTop}px)`;
      }
    };

    textarea.addEventListener("scroll", handleWheel, { passive: true });
    return () => textarea.removeEventListener("scroll", handleWheel);
  }, []);

  return (
    <div
      className="playground-editor-wrapper"
      style={{
        height: "100%",
        minHeight: isFullscreen ? "100%" : (minHeight || "240px"),
      }}
    >
      {/* Line Numbers */}
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

      {/* Error Line Highlight Background */}
      {errorLine && errorLine <= lineCount && (
        <div
          ref={errorHighlightRef}
          className="playground-error-line-highlight"
          style={{
            top: `${14 + (errorLine - 1) * 26}px`, // 0.875rem (14px) vertical padding + line offset
            height: "26px",
          }}
          aria-hidden="true"
        >
          <span className="playground-error-line-pill">
            Line {errorLine} Error
          </span>
        </div>
      )}

      {/* Syntax Highlight Layer */}
      <pre
        ref={highlightRef}
        className="playground-highlight-layer"
        aria-hidden="true"
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
  );
}
