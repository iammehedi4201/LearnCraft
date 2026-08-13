// ═══════════════════════════════════════════════════════════
// Learning Craft — Universal Playground Type System
// ═══════════════════════════════════════════════════════════

// ─── Supported Runtime Types ───
// Only "typescript" and "javascript" are implemented in V1.
// All others are declared for future extensibility.
export type PlaygroundRuntimeType =
  | "typescript"
  | "javascript"
  | "html"
  | "html-css"
  | "react"
  | "nextjs"
  | "nestjs"
  | "node"
  | "postgresql"
  | "sql"
  | "prisma";

// ─── Output Line (single console entry) ───
export interface OutputLine {
  type: "log" | "warn" | "error" | "info" | "clear";
  content: string;
  timestamp?: number;
}

// ─── Execution Input ───
export interface PlaygroundInput {
  code: string;
  language: PlaygroundRuntimeType;
  files?: PlaygroundFile[]; // For multi-file runtimes (NestJS, React, etc.)
}

// ─── Multi-file support (future) ───
export interface PlaygroundFile {
  path: string;
  content: string;
  language?: string;
}

// ─── Execution Result ───
export interface ExecutionResult {
  success: boolean;
  output: OutputLine[];
  error?: PlaygroundError;
  duration?: number; // Execution time in ms
}

// ─── Error with beginner-friendly transformation ───
export interface PlaygroundError {
  message: string;           // Beginner-friendly message
  technicalMessage: string;  // Raw compiler/runtime error
  line?: number;
  column?: number;
  suggestion?: string;       // "Try this instead…"
}

// ─── Test Case ───
export interface TestCase {
  name: string;
  code: string;    // JS assertion code to run after user code
  hidden?: boolean; // If true, test name is hidden from learner
}

// ─── Single Test Result ───
export interface TestResult {
  name: string;
  passed: boolean;
  hidden: boolean;
  error?: string;
}

// ─── Validation Result (after running tests) ───
export interface ValidationResult {
  passed: boolean;        // All tests passed
  results: TestResult[];
  totalPassed: number;
  totalTests: number;
}

// ─── Exercise Configuration ───
export interface PlaygroundExercise {
  id: string;
  title: string;
  instructions: string;
  starterCode: string;
  solutionCode?: string;
  hints?: string[];
  tests?: TestCase[];
  hiddenTests?: TestCase[];
  difficulty?: "beginner" | "intermediate" | "advanced";
  timeLimit?: number;  // Execution timeout in ms (default 5000)
}

// ─── Runtime Capability Interface ───
// Every runtime must implement this interface.
// The playground UI adapts based on capability flags.
export interface PlaygroundRuntime {
  /** Execute code and return output */
  run(input: PlaygroundInput): Promise<ExecutionResult>;

  /** Reset runtime state */
  reset(): void;

  /** Validate code against test cases */
  validate?(
    input: PlaygroundInput,
    tests: TestCase[],
    hiddenTests?: TestCase[]
  ): Promise<ValidationResult>;

  /** Cleanup resources (iframes, workers, etc.) */
  dispose?(): void;

  // Capability flags — the UI adapts based on these
  supportsPreview: boolean;        // Live preview panel (React, HTML)
  supportsConsole: boolean;        // Console output panel
  supportsTests: boolean;          // Test validation
  supportsMultipleFiles: boolean;  // Multi-file editor (NestJS, React)
}

// ─── Main Playground Component Props ───
export interface PlaygroundProps {
  runtime: PlaygroundRuntimeType;
  language?: string;               // Display label (e.g. "TypeScript")
  starterCode: string;
  exercise?: PlaygroundExercise;   // If provided, enables exercise mode
  className?: string;
  height?: string;                 // Minimum height (default: "240px", automatically expands to fit all code without scrolling)
  minHeight?: string;
}
