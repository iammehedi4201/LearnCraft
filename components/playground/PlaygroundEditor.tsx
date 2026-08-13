"use client";

import { useRef, useCallback, useEffect, type ChangeEvent, type KeyboardEvent } from "react";

interface PlaygroundEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  minHeight?: string;
  readOnly?: boolean;
  isFullscreen?: boolean;
}

export function PlaygroundEditor({
  value,
  onChange,
  language,
  minHeight,
  readOnly = false,
  isFullscreen = false,
}: PlaygroundEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const lines = value.split("\n");
  const lineCount = Math.max(1, lines.length);

  // Calculate dynamic content height: 26px line height (1.625rem) + 28px vertical padding (0.875rem * 2)
  const dynamicHeightPx = lineCount * 26 + 28;

  // Sync scroll between textarea and line numbers (mainly in fullscreen mode)
  const handleScroll = useCallback(() => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  // Handle tab key (insert 2 spaces instead of changing focus)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (readOnly) return;

      if (e.key === "Tab") {
        e.preventDefault();
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const newValue = value.substring(0, start) + "  " + value.substring(end);
        onChange(newValue);

        // Restore cursor position after React re-render
        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        });
      }

      // Auto-indent on Enter
      if (e.key === "Enter") {
        e.preventDefault();
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const currentLine = value.substring(0, start).split("\n").pop() || "";
        const indent = currentLine.match(/^\s*/)?.[0] || "";
        // Extra indent after { or (
        const lastChar = currentLine.trimEnd().slice(-1);
        const extraIndent = lastChar === "{" || lastChar === "(" ? "  " : "";

        const newValue =
          value.substring(0, start) + "\n" + indent + extraIndent + value.substring(textarea.selectionEnd);
        onChange(newValue);

        requestAnimationFrame(() => {
          const newPos = start + 1 + indent.length + extraIndent.length;
          textarea.selectionStart = textarea.selectionEnd = newPos;
        });
      }
    },
    [value, onChange, readOnly]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  // Keep focus and sync scroll in fullscreen
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleWheel = () => {
      if (lineNumbersRef.current && textarea) {
        lineNumbersRef.current.scrollTop = textarea.scrollTop;
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
        {Array.from({ length: lineCount }, (_, i) => (
          <span key={i} className="playground-line-number">
            {i + 1}
          </span>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        className="playground-textarea"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        readOnly={readOnly}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        data-gramm="false"
        placeholder={`Write your ${language} code here...`}
        aria-label={`${language} code editor`}
        style={
          isFullscreen
            ? { height: "100%", overflowY: "auto" }
            : { height: `${dynamicHeightPx}px`, overflowY: "hidden" }
        }
      />
    </div>
  );
}
