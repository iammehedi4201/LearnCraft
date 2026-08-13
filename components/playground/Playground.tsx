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
import { PlaygroundEditor } from "./PlaygroundEditor";
import { PlaygroundOutput } from "./PlaygroundOutput";
import { PlaygroundToolbar } from "./PlaygroundToolbar";
import { PlaygroundTests } from "./PlaygroundTests";
import { PlaygroundHints } from "./PlaygroundHints";
import { PlaygroundFullscreen } from "./PlaygroundFullscreen";
import "./playground.css";

export function Playground({
  runtime: runtimeType,
  language,
  starterCode,
  exercise,
  className = "",
  height = "240px",
}: PlaygroundProps) {
  // ─── State ───
  const [code, setCode] = useState<string>(exercise?.starterCode ?? starterCode ?? "");
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [error, setError] = useState<PlaygroundError | undefined>();
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState<number | undefined>();
  const [testResults, setTestResults] = useState<ValidationResult | undefined>();
  const [showHints, setShowHints] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);

  // ─── Split Resizer State (editor width percentage) ───
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

  // ─── Actions ───

  const handleRun = useCallback(async () => {
    if (isRunning) return;

    setIsRunning(true);
    setOutput([]);
    setError(undefined);
    setDuration(undefined);
    setTestResults(undefined);

    try {
      const rt = getRuntime();
      const result = await rt.run({
        code,
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
  }, [code, runtimeType, isRunning, getRuntime]);

  const handleCheck = useCallback(async () => {
    if (isRunning || !exercise) return;

    const tests = exercise.tests || [];
    const hiddenTests = exercise.hiddenTests || [];

    if (tests.length === 0 && hiddenTests.length === 0) {
      // No tests defined — just run
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
          { code, language: runtimeType },
          tests,
          hiddenTests
        );
        setTestResults(result);

        // Also run code once to show console output
        const runResult = await rt.run({ code, language: runtimeType });
        setOutput(runResult.output);
        setDuration(runResult.duration);
      } else {
        // Fallback: regular run
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
  }, [code, runtimeType, isRunning, exercise, getRuntime, handleRun]);

  const handleReset = useCallback(() => {
    const original = exercise?.starterCode ?? starterCode ?? "";
    setCode(original);
    setOutput([]);
    setError(undefined);
    setTestResults(undefined);
    setDuration(undefined);
    getRuntime().reset();
  }, [exercise, starterCode, getRuntime]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 1500);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 1500);
    }
  }, [code]);

  const handleHint = useCallback(() => {
    if (!exercise?.hints?.length) return;
    setShowHints(true);
    setHintsUsed((prev) => Math.min(prev + 1, exercise.hints!.length));
  }, [exercise]);

  const handleApplySolution = useCallback((solution: string) => {
    setCode(solution);
  }, []);

  const handleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  const handleClearOutput = useCallback(() => {
    setOutput([]);
    setError(undefined);
  }, []);

  // ─── Resizer Drag Handlers ───
  const startResizing = useCallback((_clientX: number) => {
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

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    startResizing(e.clientX);
  }, [startResizing]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches[0]) {
      startResizing(e.touches[0].clientX);
    }
  }, [startResizing]);

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

  const playgroundContent = (
    <div
      className={`playground ${className}`}
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
        </div>
        {exercise?.title && (
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

      {/* Exercise Instructions */}
      {exercise && (
        <div className="playground-exercise-instructions">
          <div className="playground-exercise-title">{exercise.title}</div>
          <div className="playground-exercise-text">
            {exercise.instructions}
          </div>
        </div>
      )}

      {/* Split: Editor + Resizer + Output (Dynamic Auto-Expanding Height & Resizable Widths) */}
      <div
        ref={bodyRef}
        className="playground-body"
        style={isFullscreen ? { flex: 1, minHeight: 0 } : { minHeight: height, height: "auto" }}
      >
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
          />
        </div>

        {/* Draggable Middle Resizer with Icon */}
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
          />
        </div>
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
