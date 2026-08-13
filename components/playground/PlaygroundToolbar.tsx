"use client";

interface PlaygroundToolbarProps {
  onRun: () => void;
  onCheck?: () => void;
  onHint?: () => void;
  onReset: () => void;
  onCopy: () => void;
  onFullscreen: () => void;
  isRunning: boolean;
  hasExercise: boolean;
  hasHints: boolean;
  hintsUsed: number;
  totalHints: number;
  showCopyToast: boolean;
}

export function PlaygroundToolbar({
  onRun,
  onCheck,
  onHint,
  onReset,
  onCopy,
  onFullscreen,
  isRunning,
  hasExercise,
  hasHints,
  hintsUsed,
  totalHints,
  showCopyToast,
}: PlaygroundToolbarProps) {
  return (
    <div className="playground-toolbar">
      <div className="playground-toolbar-left">
        {/* Run */}
        <button
          className="playground-btn playground-btn--primary"
          onClick={onRun}
          disabled={isRunning}
          title="Run code (Ctrl+Enter)"
          id="playground-run-btn"
        >
          <span className="playground-btn-icon">{isRunning ? "⏳" : "▶"}</span>
          <span>{isRunning ? "Running" : "Run"}</span>
        </button>

        {/* Check Answer */}
        {hasExercise && onCheck && (
          <button
            className="playground-btn playground-btn--success"
            onClick={onCheck}
            disabled={isRunning}
            title="Check answer (Ctrl+Shift+Enter)"
            id="playground-check-btn"
          >
            <span className="playground-btn-icon">✓</span>
            <span>Check</span>
          </button>
        )}

        {/* Hint */}
        {hasHints && onHint && (
          <button
            className="playground-btn playground-btn--warning"
            onClick={onHint}
            disabled={isRunning}
            title={`Hint (${hintsUsed}/${totalHints})`}
            id="playground-hint-btn"
          >
            <span className="playground-btn-icon">💡</span>
            <span>Hint</span>
          </button>
        )}

        {/* Reset */}
        <button
          className="playground-btn playground-btn--ghost"
          onClick={onReset}
          disabled={isRunning}
          title="Reset to starter code"
          id="playground-reset-btn"
        >
          <span className="playground-btn-icon">↻</span>
          <span>Reset</span>
        </button>
      </div>

      <div className="playground-toolbar-right">
        {/* Copy */}
        <button
          className="playground-btn playground-btn--ghost"
          onClick={onCopy}
          title="Copy code"
          id="playground-copy-btn"
          style={{ position: "relative" }}
        >
          <span className="playground-btn-icon">📋</span>
          <span>Copy</span>
        </button>

        {/* Fullscreen */}
        <button
          className="playground-btn playground-btn--ghost"
          onClick={onFullscreen}
          title="Toggle fullscreen"
          id="playground-fullscreen-btn"
        >
          <span className="playground-btn-icon">⛶</span>
        </button>
      </div>

      {/* Copy Toast */}
      {showCopyToast && (
        <div className="playground-toast">✓ Copied!</div>
      )}
    </div>
  );
}
