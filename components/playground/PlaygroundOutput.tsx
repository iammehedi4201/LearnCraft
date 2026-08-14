"use client";

import { useRef, useEffect, useState } from "react";
import type { OutputLine, PlaygroundError } from "./types";

interface PlaygroundOutputProps {
  lines: OutputLine[];
  error?: PlaygroundError;
  isRunning: boolean;
  duration?: number;
  onClear: () => void;
  onJumpToLine?: (line: number) => void;
}

export function PlaygroundOutput({
  lines,
  error,
  isRunning,
  duration,
  onClear,
  onJumpToLine,
}: PlaygroundOutputProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTechnical, setShowTechnical] = useState(false);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, error]);

  const hasContent = lines.length > 0 || error;

  return (
    <div className="playground-output-panel">
      {/* Header */}
      <div className="playground-output-header">
        <span className="playground-output-title">Console</span>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {duration !== undefined && (
            <span className="playground-duration">{duration}ms</span>
          )}
          {hasContent && (
            <button
              className="playground-output-clear-btn"
              onClick={onClear}
              aria-label="Clear output"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Output Area */}
      <div ref={scrollRef} className="playground-output-scroll">
        {isRunning ? (
          <div className="playground-spinner">
            <div className="playground-spinner-dot" />
            <div className="playground-spinner-dot" />
            <div className="playground-spinner-dot" />
            <span style={{ marginLeft: "0.5rem" }}>Running...</span>
          </div>
        ) : !hasContent ? (
          <div className="playground-output-placeholder">
            <span className="playground-output-placeholder-icon">▶</span>
            <span className="playground-output-placeholder-text">
              Click Run to see output
            </span>
            <span className="playground-output-placeholder-hint">
              or press Ctrl + Enter
            </span>
          </div>
        ) : (
          <>
            {/* Output Lines */}
            {lines.map((line, i) => (
              <div
                key={i}
                className={`playground-output-line playground-output-line--${line.type}`}
              >
                {line.content}
              </div>
            ))}

            {/* Error Card */}
            {error && (
              <div className="playground-error-card">
                <div className="playground-error-badge">
                  <span>❌</span>
                  <span>
                    {error.line ? `Error on Line ${error.line}` : "Error"}
                  </span>
                </div>
                <div className="playground-error-message">{error.message}</div>
                {error.suggestion && (
                  <div className="playground-error-suggestion">
                    💡 {error.suggestion}
                  </div>
                )}
                {error.line && onJumpToLine && (
                  <div>
                    <button
                      className="playground-jump-to-line-btn"
                      onClick={() => onJumpToLine(error.line!)}
                      title={`Scroll and focus Line ${error.line}`}
                    >
                      <span>🎯 Jump to Line {error.line}</span>
                      <span>→</span>
                    </button>
                  </div>
                )}
                {error.technicalMessage &&
                  error.technicalMessage !== error.message && (
                    <div className="playground-error-technical">
                      <button
                        className="playground-error-technical-toggle"
                        onClick={() => setShowTechnical(!showTechnical)}
                      >
                        {showTechnical
                          ? "▲ Hide technical error"
                          : "▼ Show technical error"}
                      </button>
                      {showTechnical && (
                        <div className="playground-error-technical-detail">
                          {error.technicalMessage}
                        </div>
                      )}
                    </div>
                  )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
