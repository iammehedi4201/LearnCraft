"use client";

// ═══════════════════════════════════════════════════════════
// Learning Craft — Universal Playground Component
// ═══════════════════════════════════════════════════════════
//
// Configuration-driven coding playground.
// Dynamic height auto-adjusts based on code line count and content.
// Draggable middle resizer allows adjusting editor vs console width.
//
// Usage:
//   <Playground runtime="typescript" starterCode={code} />
//   <Playground runtime="typescript" exercise={exercise} />

import { useState, useCallback, useRef, useEffect } from "react";
import type {
  PlaygroundProps,
  PlaygroundRuntime as IPlaygroundRuntime,
  OutputLine,
  PlaygroundError,
  ValidationResult,
} from "./types";
import { createRuntime, getRuntimeLabel } from "./runtimes/runtime-registry";
import { formatCode } from "./code-formatter";
import { PlaygroundEditor } from "./PlaygroundEditor";
import { PlaygroundOutput } from "./PlaygroundOutput";
import { PlaygroundToolbar } from "./PlaygroundToolbar";
import { PlaygroundTests } from "./PlaygroundTests";
import { PlaygroundHints } from "./PlaygroundHints";
import { PlaygroundFullscreen } from "./PlaygroundFullscreen";
import { PlaygroundExamplePanel } from "./PlaygroundExamplePanel";
import "./playground.css";

export function Playground({
  runtime: runtimeType,
  language,
  starterCode,
  exercise,
  className = "",
  height = "240px",
}: PlaygroundProps) {
  const exampleCode = exercise?.starterCode ?? starterCode ?? "";

  // ─── State ───
  const [code, setCode] = useState<string>(exampleCode);
  const [practiceCode, setPracticeCode] = useState<string>(""); // Starts empty in 3-pane expanded practice workspace!
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [error, setError] = useState<PlaygroundError | undefined>();
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState<number | undefined>();
  const [testResults, setTestResults] = useState<ValidationResult | undefined>();
  const [showHints, setShowHints] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);

  // ─── Expanded Mode Layout (3-pane: Example | Practice | Output) ───
  const [expandedLayoutMode, setExpandedLayoutMode] = useState<"3-pane" | "2-pane">("3-pane");
  const [ratio1, setRatio1] = useState(32); // Example panel %
  const [ratio2, setRatio2] = useState(38); // Practice panel %
  // Output panel % = 100 - ratio1 - ratio2 (30%)

  // ─── 2-Pane Split Resizer State (normal mode) ───
  const [splitRatio, setSplitRatio] = useState(55); // 55% editor, 45% console by default
  const [isDragging, setIsDragging] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // ─── Runtime instance (lazy init) ───
  const runtimeRef = useRef<IPlaygroundRuntime | null>(null);

  const getRuntime = useCallback((): IPlaygroundRuntime => {
    if (!runtimeRef.current) {
      runtimeRef.current = createRuntime(runtimeType);
    }
    return runtimeRef.current;
  }, [runtimeType]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      runtimeRef.current?.dispose?.();
    };
  }, []);

  // Recreate runtime if type changes
  useEffect(() => {
    runtimeRef.current?.dispose?.();
    runtimeRef.current = null;
  }, [runtimeType]);

  const displayLanguage = language || getRuntimeLabel(runtimeType);

  // ─── Code Formatting ───
  const handleFormat = useCallback(() => {
    const is3Pane = isFullscreen && expandedLayoutMode === "3-pane";
    const currentCode = is3Pane ? practiceCode : code;
    if (!currentCode.trim()) return;

    const formatted = formatCode(currentCode, displayLanguage);
    if (is3Pane) {
      setPracticeCode(formatted);
    } else {
      setCode(formatted);
    }
  }, [isFullscreen, expandedLayoutMode, practiceCode, code, displayLanguage]);

  // ─── Actions ───

  const handleRun = useCallback(async () => {
    if (isRunning) return;

    const is3Pane = isFullscreen && expandedLayoutMode === "3-pane";
    const rawCode = is3Pane ? practiceCode : code;

    // If practice workspace is empty, provide a gentle helpful notification
    if (!rawCode.trim()) {
      setOutput([
        {
          type: "info",
          content: "💡 Practice workspace is empty. Type your code or click '⚡ Copy to Practice' on the Example panel to get started!",
          timestamp: Date.now(),
        },
      ]);
      return;
    }

    // Auto-format code before running
    const formattedCode = formatCode(rawCode, displayLanguage);
    if (is3Pane) {
      setPracticeCode(formattedCode);
    } else {
      setCode(formattedCode);
    }

    const codeToRun = formattedCode;

    setIsRunning(true);
    setOutput([]);
    setError(undefined);
    setDuration(undefined);
    setTestResults(undefined);

    try {
      const rt = getRuntime();
      const result = await rt.run({
        code: codeToRun,
        language: runtimeType,
      });

      setOutput(result.output);
      setError(result.error);
      setDuration(result.duration);
    } catch (e) {
      setError({
        message: e instanceof Error ? e.message : "An unexpected error occurred.",
        technicalMessage: String(e),
        suggestion: "Try refreshing the page if this persists.",
      });
    } finally {
      setIsRunning(false);
    }
  }, [code, practiceCode, isFullscreen, expandedLayoutMode, runtimeType, isRunning, getRuntime, displayLanguage]);

  const handleCheck = useCallback(async () => {
    if (isRunning || !exercise) return;

    const is3Pane = isFullscreen && expandedLayoutMode === "3-pane";
    const codeToCheck = is3Pane ? practiceCode : code;

    if (!codeToCheck.trim()) {
      setOutput([
        {
          type: "info",
          content: "💡 Practice workspace is empty. Type your solution to solve the exercise!",
          timestamp: Date.now(),
        },
      ]);
      return;
    }

    const tests = exercise.tests || [];
    const hiddenTests = exercise.hiddenTests || [];

    if (tests.length === 0 && hiddenTests.length === 0) {
      handleRun();
      return;
    }

    setIsRunning(true);
    setOutput([]);
    setError(undefined);
    setDuration(undefined);

    try {
      const rt = getRuntime();
      if (rt.validate) {
        const result = await rt.validate(
          { code: codeToCheck, language: runtimeType },
          tests,
          hiddenTests
        );
        setTestResults(result);

        const runResult = await rt.run({ code: codeToCheck, language: runtimeType });
        setOutput(runResult.output);
        setDuration(runResult.duration);
      } else {
        await handleRun();
      }
    } catch (e) {
      setError({
        message: e instanceof Error ? e.message : "Validation error.",
        technicalMessage: String(e),
      });
    } finally {
      setIsRunning(false);
    }
  }, [code, practiceCode, isFullscreen, expandedLayoutMode, runtimeType, isRunning, exercise, getRuntime, handleRun]);

  const handleReset = useCallback(() => {
    if (isFullscreen && expandedLayoutMode === "3-pane") {
      setPracticeCode("");
    } else {
      setCode(exampleCode);
    }
    setOutput([]);
    setError(undefined);
    setTestResults(undefined);
    setDuration(undefined);
    getRuntime().reset();
  }, [isFullscreen, expandedLayoutMode, exampleCode, getRuntime]);

  const handleCopy = useCallback(async () => {
    const is3Pane = isFullscreen && expandedLayoutMode === "3-pane";
    const textToCopy = is3Pane ? (practiceCode || exampleCode) : code;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 1500);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = textToCopy;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 1500);
    }
  }, [code, practiceCode, isFullscreen, expandedLayoutMode, exampleCode]);

  const handleHint = useCallback(() => {
    if (!exercise?.hints?.length) return;
    setShowHints(true);
    setHintsUsed((prev) => Math.min(prev + 1, exercise.hints!.length));
  }, [exercise]);

  const handleApplySolution = useCallback((solution: string) => {
    if (isFullscreen && expandedLayoutMode === "3-pane") {
      setPracticeCode(solution);
    } else {
      setCode(solution);
    }
  }, [isFullscreen, expandedLayoutMode]);

  const handleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  const handleClearOutput = useCallback(() => {
    setOutput([]);
    setError(undefined);
  }, []);

  // ─── 2-Pane Resizer Drag Handlers (Normal Mode) ───
  const startResizing = useCallback(() => {
    isDraggingRef.current = true;
    setIsDragging(true);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const updateRatio = (currentClientX: number) => {
      if (!bodyRef.current) return;
      const rect = bodyRef.current.getBoundingClientRect();
      const offsetX = currentClientX - rect.left;
      const percentage = (offsetX / rect.width) * 100;
      // Clamp between 20% and 80%
      const clamped = Math.min(80, Math.max(20, percentage));
      setSplitRatio(clamped);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      updateRatio(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !e.touches[0]) return;
      updateRatio(e.touches[0].clientX);
    };

    const stopResizing = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopResizing);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", stopResizing);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", stopResizing);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      startResizing();
    },
    [startResizing]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches[0]) {
        startResizing();
      }
    },
    [startResizing]
  );

  // ─── 3-Pane Resizer Drag Handlers (Expanded Mode) ───
  const startResizing3Pane = useCallback(
    (resizerIndex: 1 | 2) => {
      isDraggingRef.current = true;
      setIsDragging(true);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDraggingRef.current || !bodyRef.current) return;
        const rect = bodyRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const percentage = (offsetX / rect.width) * 100;

        if (resizerIndex === 1) {
          // Dragging Resizer 1 (between Example and Practice)
          const newRatio1 = Math.min(50, Math.max(15, percentage));
          setRatio1(newRatio1);
        } else {
          // Dragging Resizer 2 (between Practice and Output)
          const newRatio2 = Math.min(100 - ratio1 - 15, Math.max(20, percentage - ratio1));
          setRatio2(newRatio2);
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!isDraggingRef.current || !e.touches[0] || !bodyRef.current) return;
        const rect = bodyRef.current.getBoundingClientRect();
        const offsetX = e.touches[0].clientX - rect.left;
        const percentage = (offsetX / rect.width) * 100;

        if (resizerIndex === 1) {
          const newRatio1 = Math.min(50, Math.max(15, percentage));
          setRatio1(newRatio1);
        } else {
          const newRatio2 = Math.min(100 - ratio1 - 15, Math.max(20, percentage - ratio1));
          setRatio2(newRatio2);
        }
      };

      const stopResizing = () => {
        isDraggingRef.current = false;
        setIsDragging(false);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", stopResizing);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", stopResizing);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", stopResizing);
      document.addEventListener("touchmove", handleTouchMove, { passive: true });
      document.addEventListener("touchend", stopResizing);
    },
    [ratio1]
  );

  // ─── Keyboard shortcuts ───
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Enter = Run
      if (e.ctrlKey && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleRun();
      }
      // Ctrl+Shift+Enter = Check
      if (e.ctrlKey && e.shiftKey && e.key === "Enter") {
        e.preventDefault();
        if (exercise) handleCheck();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleRun, handleCheck, exercise]);

  // ─── Render ───

  const hasExercise = !!exercise;
  const hasHints = !!exercise?.hints?.length;
  const totalHints = exercise?.hints?.length ?? 0;
  const is3PaneMode = isFullscreen && expandedLayoutMode === "3-pane";

  const playgroundContent = (
    <div
      className={`playground ${className} ${isFullscreen ? "playground--fullscreen" : ""}`}
      style={isFullscreen ? undefined : { minHeight: height }}
    >
      {/* Header */}
      <div className="playground-header">
        <div className="playground-header-left">
          <div className="playground-dots">
            <div className="playground-dot playground-dot--red" />
            <div className="playground-dot playground-dot--yellow" />
            <div className="playground-dot playground-dot--green" />
          </div>
          <span className="playground-runtime-badge">{displayLanguage}</span>

          {/* Mode Switcher in Fullscreen */}
          {isFullscreen && (
            <div className="playground-mode-toggle">
              <button
                className={`playground-mode-btn ${expandedLayoutMode === "3-pane" ? "playground-mode-btn--active" : ""}`}
                onClick={() => setExpandedLayoutMode("3-pane")}
                title="3-Section Workspace: Example | Practice | Output"
              >
                3 Panes (Example + Practice)
              </button>
              <button
                className={`playground-mode-btn ${expandedLayoutMode === "2-pane" ? "playground-mode-btn--active" : ""}`}
                onClick={() => setExpandedLayoutMode("2-pane")}
                title="2-Section Focus: Practice | Output"
              >
                2 Panes
              </button>
            </div>
          )}
        </div>

        {exercise?.title && !is3PaneMode && (
          <div className="playground-header-right">
            {exercise.difficulty && (
              <span
                className={`playground-exercise-difficulty playground-exercise-difficulty--${exercise.difficulty}`}
              >
                {exercise.difficulty === "beginner" && "🟢 Beginner"}
                {exercise.difficulty === "intermediate" && "🟡 Intermediate"}
                {exercise.difficulty === "advanced" && "🟣 Advanced"}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Exercise Instructions (in normal 2-pane mode) */}
      {exercise && !is3PaneMode && (
        <div className="playground-exercise-instructions">
          <div className="playground-exercise-title">{exercise.title}</div>
          <div className="playground-exercise-text">{exercise.instructions}</div>
        </div>
      )}

      {/* Split Body Container */}
      <div
        ref={bodyRef}
        className={`playground-body ${is3PaneMode ? "playground-3pane-body" : ""}`}
        style={isFullscreen ? { flex: 1, minHeight: 0 } : { height: height || "360px", minHeight: "240px" }}
      >
        {is3PaneMode ? (
          /* ══════════════════════════════════════════════ */
          /* 3-Section Expanded Workspace Layout            */
          /* 1. Example | 2. Practice Workspace | 3. Output */
          /* ══════════════════════════════════════════════ */
          <>
            {/* Section 1: Example & Reference Panel */}
            <div
              className="playground-example-panel"
              style={{ flex: `0 0 ${ratio1}%`, width: `${ratio1}%` }}
            >
              <PlaygroundExamplePanel
                code={exampleCode}
                language={displayLanguage}
                exercise={exercise}
                onCopyToPractice={() => setPracticeCode(exampleCode)}
              />
            </div>

            {/* Resizer 1 (Between Example and Practice) */}
            <div
              className={`playground-resizer ${isDragging ? "playground-resizer--dragging" : ""}`}
              onMouseDown={(e) => {
                e.preventDefault();
                startResizing3Pane(1);
              }}
              onTouchStart={() => startResizing3Pane(1)}
              onDoubleClick={() => {
                setRatio1(32);
                setRatio2(38);
              }}
              title="Drag to resize Example vs Practice width (Double-click to reset)"
              role="separator"
              aria-orientation="vertical"
            >
              <div className="playground-resizer-handle">
                <svg
                  width="8"
                  height="16"
                  viewBox="0 0 8 16"
                  fill="currentColor"
                  className="playground-resizer-icon"
                  aria-hidden="true"
                >
                  <circle cx="2" cy="2" r="1.2" />
                  <circle cx="6" cy="2" r="1.2" />
                  <circle cx="2" cy="8" r="1.2" />
                  <circle cx="6" cy="8" r="1.2" />
                  <circle cx="2" cy="14" r="1.2" />
                  <circle cx="6" cy="14" r="1.2" />
                </svg>
              </div>
            </div>

            {/* Section 2: Practice Workspace Panel (Starts Empty!) */}
            <div
              className="playground-editor-panel playground-practice-panel"
              style={{ flex: `0 0 ${ratio2}%`, width: `${ratio2}%` }}
            >
              <div className="playground-panel-header playground-practice-header">
                <div className="playground-panel-header-left">
                  <span className="playground-panel-icon">⚡</span>
                  <span className="playground-panel-title">Practice Workspace</span>
                  <span className="playground-panel-badge playground-panel-badge--editable">
                    Editable
                  </span>
                </div>
                <div className="playground-panel-header-right">
                  <button
                    className="playground-panel-action-btn"
                    onClick={handleReset}
                    title="Clear practice workspace"
                  >
                    ↻ Clear
                  </button>
                </div>
              </div>

              <PlaygroundEditor
                value={practiceCode}
                onChange={setPracticeCode}
                language={displayLanguage}
                minHeight={height}
                isFullscreen={isFullscreen}
                errorLine={error?.line}
                onFormat={handleFormat}
                placeholder={`// ⚡ Practice Workspace\n// Write your ${displayLanguage} code here from scratch...\n// (or click "⚡ Copy to Practice" on the Example panel to load starter code)`}
              />
            </div>

            {/* Resizer 2 (Between Practice and Output) */}
            <div
              className={`playground-resizer ${isDragging ? "playground-resizer--dragging" : ""}`}
              onMouseDown={(e) => {
                e.preventDefault();
                startResizing3Pane(2);
              }}
              onTouchStart={() => startResizing3Pane(2)}
              onDoubleClick={() => {
                setRatio1(32);
                setRatio2(38);
              }}
              title="Drag to resize Practice vs Output width (Double-click to reset)"
              role="separator"
              aria-orientation="vertical"
            >
              <div className="playground-resizer-handle">
                <svg
                  width="8"
                  height="16"
                  viewBox="0 0 8 16"
                  fill="currentColor"
                  className="playground-resizer-icon"
                  aria-hidden="true"
                >
                  <circle cx="2" cy="2" r="1.2" />
                  <circle cx="6" cy="2" r="1.2" />
                  <circle cx="2" cy="8" r="1.2" />
                  <circle cx="6" cy="8" r="1.2" />
                  <circle cx="2" cy="14" r="1.2" />
                  <circle cx="6" cy="14" r="1.2" />
                </svg>
              </div>
            </div>

            {/* Section 3: Output Show Panel */}
            <div
              className="playground-output-panel"
              style={{
                flex: `0 0 ${100 - ratio1 - ratio2}%`,
                width: `${100 - ratio1 - ratio2}%`,
              }}
            >
              <PlaygroundOutput
                lines={output}
                error={error}
                isRunning={isRunning}
                duration={duration}
                onClear={handleClearOutput}
                onJumpToLine={(line) => {
                  setError((prev) => (prev ? { ...prev, line } : undefined));
                }}
              />
            </div>
          </>
        ) : (
          /* ══════════════════════════════════════════════ */
          /* 2-Section Standard View (Editor | Output)       */
          /* ══════════════════════════════════════════════ */
          <>
            {/* Editor Panel */}
            <div
              className="playground-editor-panel"
              style={{ flex: `0 0 ${splitRatio}%`, width: `${splitRatio}%` }}
            >
              <PlaygroundEditor
                value={code}
                onChange={setCode}
                language={displayLanguage}
                minHeight={height}
                isFullscreen={isFullscreen}
                errorLine={error?.line}
                onFormat={handleFormat}
              />
            </div>

            {/* Draggable Middle Resizer */}
            <div
              className={`playground-resizer ${isDragging ? "playground-resizer--dragging" : ""}`}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onDoubleClick={() => setSplitRatio(55)}
              title="Drag to resize editor & console width (Double-click to reset)"
              role="separator"
              aria-orientation="vertical"
              aria-valuenow={Math.round(splitRatio)}
              aria-valuemin={20}
              aria-valuemax={80}
            >
              <div className="playground-resizer-handle">
                <svg
                  width="8"
                  height="16"
                  viewBox="0 0 8 16"
                  fill="currentColor"
                  className="playground-resizer-icon"
                  aria-hidden="true"
                >
                  <circle cx="2" cy="2" r="1.2" />
                  <circle cx="6" cy="2" r="1.2" />
                  <circle cx="2" cy="8" r="1.2" />
                  <circle cx="6" cy="8" r="1.2" />
                  <circle cx="2" cy="14" r="1.2" />
                  <circle cx="6" cy="14" r="1.2" />
                </svg>
              </div>
            </div>

            {/* Console Output Panel */}
            <div
              className="playground-output-panel"
              style={{ flex: `0 0 ${100 - splitRatio}%`, width: `${100 - splitRatio}%` }}
            >
              <PlaygroundOutput
                lines={output}
                error={error}
                isRunning={isRunning}
                duration={duration}
                onClear={handleClearOutput}
                onJumpToLine={(line) => {
                  setError((prev) => (prev ? { ...prev, line } : undefined));
                }}
              />
            </div>
          </>
        )}
      </div>

      {/* Test Results */}
      {testResults && <PlaygroundTests results={testResults} />}

      {/* Hints */}
      {showHints && hasHints && (
        <PlaygroundHints
          hints={exercise!.hints!}
          solutionCode={exercise!.solutionCode}
          onApplySolution={handleApplySolution}
        />
      )}

      {/* Toolbar */}
      <PlaygroundToolbar
        onRun={handleRun}
        onFormat={handleFormat}
        onCheck={hasExercise ? handleCheck : undefined}
        onHint={hasHints ? handleHint : undefined}
        onReset={handleReset}
        onCopy={handleCopy}
        onFullscreen={handleFullscreen}
        isRunning={isRunning}
        hasExercise={hasExercise}
        hasHints={hasHints}
        hintsUsed={hintsUsed}
        totalHints={totalHints}
        showCopyToast={showCopyToast}
      />
    </div>
  );

  return (
    <>
      {/* Normal view */}
      {!isFullscreen && playgroundContent}

      {/* Fullscreen overlay */}
      <PlaygroundFullscreen isOpen={isFullscreen} onClose={() => setIsFullscreen(false)}>
        {playgroundContent}
      </PlaygroundFullscreen>
    </>
  );
}

