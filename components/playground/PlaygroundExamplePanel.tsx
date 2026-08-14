"use client";

import { useState } from "react";
import { highlightCode } from "./syntax-highlighter";
import type { PlaygroundExercise } from "./types";

interface PlaygroundExamplePanelProps {
  code: string;
  language: string;
  exercise?: PlaygroundExercise;
  onCopyToPractice: () => void;
}

export function PlaygroundExamplePanel({
  code,
  language: _language,
  exercise,
  onCopyToPractice,
}: PlaygroundExamplePanelProps) {
  const [copied, setCopied] = useState(false);
  const [loadedToPractice, setLoadedToPractice] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleLoadToPractice = () => {
    onCopyToPractice();
    setLoadedToPractice(true);
    setTimeout(() => setLoadedToPractice(false), 1500);
  };

  const lines = code.split("\n");

  return (
    <div className="playground-example-panel">
      {/* Example Panel Sub-Header */}
      <div className="playground-panel-header playground-example-header">
        <div className="playground-panel-header-left">
          <span className="playground-panel-icon">📖</span>
          <span className="playground-panel-title">Example & Reference</span>
          <span className="playground-panel-badge playground-panel-badge--readonly">
            Read Only
          </span>
        </div>
        <div className="playground-panel-header-right">
          <button
            className="playground-panel-action-btn playground-panel-action-btn--primary"
            onClick={handleLoadToPractice}
            title="Load this example into your practice editor"
          >
            <span className="playground-panel-action-icon">{loadedToPractice ? "✓" : "⚡"}</span>
            <span>{loadedToPractice ? "Copied to Practice!" : "Copy to Practice"}</span>
          </button>
          <button
            className="playground-panel-action-btn"
            onClick={handleCopyCode}
            title="Copy example code"
          >
            <span>{copied ? "✓ Copied" : "📋 Copy"}</span>
          </button>
        </div>
      </div>

      {/* Exercise Instructions if present */}
      {exercise && (
        <div className="playground-example-exercise-box">
          <div className="playground-example-exercise-header">
            <span className="playground-example-exercise-badge">🎯 Task Objective</span>
            {exercise.difficulty && (
              <span className={`playground-exercise-difficulty playground-exercise-difficulty--${exercise.difficulty}`}>
                {exercise.difficulty === "beginner" && "🟢 Beginner"}
                {exercise.difficulty === "intermediate" && "🟡 Intermediate"}
                {exercise.difficulty === "advanced" && "🟣 Advanced"}
              </span>
            )}
          </div>
          <h4 className="playground-example-exercise-title">{exercise.title}</h4>
          <p className="playground-example-exercise-text">{exercise.instructions}</p>
        </div>
      )}

      {/* Example Code Viewer */}
      <div className="playground-example-code-wrapper">
        <div className="playground-line-numbers" aria-hidden="true">
          {lines.map((_, i) => (
            <div key={i} className="playground-line-number">
              {i + 1}
            </div>
          ))}
        </div>
        <pre className="playground-example-code">
          <code>{highlightCode(code)}</code>
        </pre>
      </div>
    </div>
  );
}
