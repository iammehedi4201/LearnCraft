"use client";

import { useState } from "react";

interface PlaygroundHintsProps {
  hints: string[];
  solutionCode?: string;
  onApplySolution?: (code: string) => void;
}

export function PlaygroundHints({
  hints,
  solutionCode,
  onApplySolution,
}: PlaygroundHintsProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const allHintsRevealed = revealedCount >= hints.length;

  const handleRevealNext = () => {
    if (revealedCount < hints.length) {
      setRevealedCount((prev) => prev + 1);
    }
  };

  return (
    <div className="playground-hints">
      <div className="playground-hints-header">
        <span className="playground-hints-title">💡 Hints</span>
        <span className="playground-hints-count">
          {revealedCount} / {hints.length} revealed
        </span>
      </div>

      {/* Revealed hints */}
      {hints.slice(0, revealedCount).map((hint, i) => (
        <div key={i} className="playground-hint">
          <div className="playground-hint-label">Hint {i + 1}</div>
          <div style={{ whiteSpace: "pre-line" }}>{hint}</div>
        </div>
      ))}

      {/* Reveal next button */}
      {!allHintsRevealed && (
        <button className="playground-hint-reveal-btn" onClick={handleRevealNext}>
          <span>💡</span>
          <span>
            {revealedCount === 0
              ? "Show First Hint"
              : `Show Hint ${revealedCount + 1}`}
          </span>
        </button>
      )}

      {/* Show Solution (only after all hints revealed) */}
      {allHintsRevealed && solutionCode && (
        <>
          {!showSolution ? (
            <button
              className="playground-hint-reveal-btn"
              onClick={() => setShowSolution(true)}
              style={{ marginTop: "0.375rem" }}
            >
              <span>👁️</span>
              <span>Show Solution</span>
            </button>
          ) : (
            <div className="playground-solution-card">
              <div className="playground-solution-label">Solution</div>
              <pre className="playground-solution-code">{solutionCode}</pre>
              {onApplySolution && (
                <button
                  className="playground-hint-reveal-btn"
                  onClick={() => onApplySolution(solutionCode)}
                  style={{ marginTop: "0.5rem" }}
                >
                  <span>📝</span>
                  <span>Apply Solution to Editor</span>
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
